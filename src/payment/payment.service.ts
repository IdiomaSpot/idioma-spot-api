import { Injectable } from '@nestjs/common';
import { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes';
import { MercadoPagoService } from './payment-processor/mercado-pago/mercado-pago.service';
import { PrefenceRequestDTO } from './payment-processor/mercado-pago/dtos/preference-request.dto';
import { PreferenceResponseDTO } from './payment-processor/mercado-pago/dtos/preference-response.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  async createPreference(
    preferenceRequest: PrefenceRequestDTO,
  ): Promise<PreferenceResponseDTO> {
    let fullPreference: PreferenceRequest;

    fullPreference = {
      items: preferenceRequest.items,
      payer: preferenceRequest.payer,
      binary_mode: true,
      payment_methods: {
        installments: 1,
      },
    };

    try {
      let response =
        await this.mercadoPagoService.createPreference(fullPreference);
      return { preferenceId: response.id };
    } catch (e: any) {
      throw e;
    }
  }
}
