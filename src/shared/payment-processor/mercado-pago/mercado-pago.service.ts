import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import MercadoPagoConfig, { Preference } from 'mercadopago';
import {
  PreferenceRequest,
  PreferenceResponse,
} from 'mercadopago/dist/clients/preference/commonTypes';
import { MPConfig } from 'src/config/configuration';

@Injectable()
export class MercadoPagoService {
  private client: MercadoPagoConfig;
  
  constructor(@Inject('CONFIG_OPTIONS') private options: MPConfig) {
    this.options && this.authorize(this.options);
  }

  private authorize(options: MPConfig) {
    // Adding credencials
    this.client = new MercadoPagoConfig({
      accessToken: options.accessToken,
    });
    console.info('MP Connection succesfully');
  }

  async createPreference(
    preferenceReq: PreferenceRequest,
  ): Promise<PreferenceResponse> {
    try {
      const preference = new Preference(this.client);

      const response = await preference.create({
        body: preferenceReq,
      });
      return response;
    } catch (e) {
      console.error('Error creating preference:', e);

      throw new HttpException(
        'Failed to create preference',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
