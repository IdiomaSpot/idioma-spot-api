import { Injectable } from '@nestjs/common';
import { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes';
import configuration from 'src/config/configuration';
import { GenericService } from 'src/generics/generic.service';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { MercadoPagoService } from 'src/shared/payment-processor/mercado-pago/mercado-pago.service';
import { PreferenceResponseDTO } from 'src/shared/payment-processor/mercado-pago/dtos/preference-response.dto';
import { PreferenceRequestDTO } from 'src/shared/payment-processor/mercado-pago/dtos/preference-request.dto';
import { randomBytes } from 'crypto';
import { ProcessPaymentParams } from './dtos/process-payment-params.dto';

@Injectable()
export class PaymentService extends GenericService<Payment> {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly userService: UserService,
  ) {
    super(paymentRepository);
  }

  async createPreference(
    preferenceRequest: PreferenceRequestDTO,
  ): Promise<PreferenceResponseDTO> {
    let fullPreference: PreferenceRequest;

    fullPreference = {
      external_reference: randomBytes(16).toString('hex'),
      items: preferenceRequest.items,
      payer: preferenceRequest.payer,
      binary_mode: true,
      payment_methods: {
        installments: 1,
      },
      auto_return: 'approved',
      back_urls: {
        success: `${configuration().mercadoPagoConfig.backUrl}`,
        failure: `${configuration().mercadoPagoConfig.backUrl}`,
      },
    };

    try {
      let response =
        await this.mercadoPagoService.createPreference(fullPreference);
      console.log(response);
      return <PreferenceResponseDTO>{
        preferenceId: response.id,
        externalReference: response.external_reference,
        items: response.items,
        payer: response.payer,
      };
    } catch (e: any) {
      throw e;
    }
  }

  async createFromPreference(preference: PreferenceResponseDTO) {
    const user = await this.userService.findOneById(preference.payer.userId);

    let payments: Payment[] = [];
    for (const item of preference.items) {
      let payment = new Payment();
      payment.description = item.title;
      payment.title = item.description;
      payment.quantity = item.quantity;
      payment.unitPrice = item.unit_price;
      payment.status = 'initial';
      payment.user = user;
      payment.externalReference = preference.externalReference;
      payments.push(payment);
    }

    return this.paymentRepository.save(payments);
  }

  async processPayment(params: ProcessPaymentParams) {
    let payment = await this.paymentRepository.findOne({
      where: { externalReference: params.external_reference },
    });
    payment.paymentId = params.payment_id;
    payment.merchantOrderId = params.merchant_order_id;
    payment.status = params.status;

    payment = await this.paymentRepository.save(payment);
    return payment;
  }
}
