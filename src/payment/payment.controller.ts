import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
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
import configuration from 'src/config/configuration';

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

      res.redirect(`${configuration().baseStatusPage}${payment.status}`);

      return payment;
    } catch (e) {
      res.redirect(`${configuration().baseStatusPage}error`);
      console.error(e);
    }
  }
}
