import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { GenericController } from '../generics/generic.controller';
import { Payment } from './entities/payment.entity';
import { PreferenceRequestDTO } from '../shared/payment-processor/mercado-pago/dtos/preference-request.dto';
import { PreferenceResponseDTO } from '../shared/payment-processor/mercado-pago/dtos/preference-response.dto';
import { ProcessPaymentParamsDTO } from './dtos/process-payment-params.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Response } from 'express';
import configuration from '../config/configuration';
import { PaymentDTO } from './dtos/payment.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/user-role.enum';
import {
  And,
  Equal,
  FindManyOptions,
  IsNull,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

@Controller('payment')
@ApiTags('Payment')
export class PaymentController extends GenericController<
  Payment,
  PaymentService,
  any
> {
  constructor(private readonly paymentService: PaymentService) {
    super(paymentService);
  }

  @Post('preference')
  @ApiBearerAuth()
  @ApiBody({ type: PreferenceRequestDTO, required: true })
  @ApiResponse({ type: PreferenceResponseDTO, status: HttpStatus.OK })
  async createPreference(
    @Body() preferenceRequest: PreferenceRequestDTO,
  ): Promise<PreferenceResponseDTO> {
    const preference =
      await this.paymentService.createPreference(preferenceRequest);

    await this.paymentService.createFromPreference(preference);
    return preference;
  }

  @Public()
  @Get('process-payment')
  @ApiQuery({ name: 'payment_id', type: String })
  @ApiQuery({
    name: 'status',
    description: 'Possible Values: initial, approved, pending, failed',
    type: String,
  })
  @ApiQuery({ name: 'external_reference', type: String })
  @ApiQuery({ name: 'merchant_order_id', type: String })
  async processPayment(
    @Query() queryParams: ProcessPaymentParamsDTO,
    @Res() res: Response,
  ) {
    try {
      const payment = await this.paymentService.processPayment(queryParams);
      console.log('PAYMENT PROCESSED');
      res.redirect(`${configuration().baseStatusPage}${payment.status}`);

      return payment;
    } catch (e) {
      res.redirect(`${configuration().baseStatusPage}error`);
    }
  }

  @Get(':studentId')
  @ApiBearerAuth()
  @ApiParam({ name: 'studentId', type: 'number' })
  @ApiResponse({ type: PaymentDTO, isArray: true, status: HttpStatus.OK })
  async getPaymentsByUser(@Param('studentId') studentId: number) {
    return await this.paymentService.getPaymentsByUser(studentId);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  @ApiBearerAuth()
  async find<ReturnType = Payment>(
    @Query() options?: FindManyOptions<Payment>,
  ): Promise<ReturnType[]> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setHours(0, 0, 0, 0);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    options = {
      where: {
        createdAt: MoreThanOrEqual(thirtyDaysAgo),
        description: And(Not(IsNull()), Not(Equal(''))),
        title: And(Not(IsNull()), Not(Equal(''))),
        classScheduleId: And(Not(IsNull()), Not(Equal(''))),
      },
      relations: { user: true },
    };

    return super.find<ReturnType>({ ...options });
  }
}
