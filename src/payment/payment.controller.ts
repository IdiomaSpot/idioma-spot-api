import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
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
import { ProcessPaymentParams } from './dtos/process-payment-params.dto';
import { Public } from '../auth/decorators/public.decorator';

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
  @ApiQuery({ name: 'status', type: String })
  @ApiQuery({ name: 'external_reference', type: String })
  @ApiQuery({ name: 'merchant_order_id', type: String })
  processPayment(@Query() queryParams: ProcessPaymentParams) {
    return this.paymentService.processPayment(queryParams);
  }
}
