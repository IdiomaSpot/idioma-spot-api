import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PreferenceResponseDTO } from './payment-processor/mercado-pago/dtos/preference-response.dto';
import { PaymentService } from './payment.service';
import { PrefenceRequestDTO } from './payment-processor/mercado-pago/dtos/preference-request.dto';

@Controller('payment')
@ApiTags('Payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('preference')
  @ApiBearerAuth()
  @ApiBody({ type: PrefenceRequestDTO, required: true })
  @ApiResponse({ type: PreferenceResponseDTO, status: HttpStatus.OK })
  async createPreference(
    @Body() preferenceRequest: PrefenceRequestDTO,
  ): Promise<PreferenceResponseDTO> {
    return await this.paymentService.createPreference(preferenceRequest);
  }
}
