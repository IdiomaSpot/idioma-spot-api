import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes';
import configuration from '../config/configuration';
import { GenericService } from '../generics/generic.service';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { MercadoPagoService } from '../shared/payment-processor/mercado-pago/mercado-pago.service';
import { PreferenceResponseDTO } from '../shared/payment-processor/mercado-pago/dtos/preference-response.dto';
import { PreferenceRequestDTO } from '../shared/payment-processor/mercado-pago/dtos/preference-request.dto';
import { randomBytes } from 'crypto';
import { ProcessPaymentParamsDTO } from './dtos/process-payment-params.dto';
import { StudentClassDTO } from '../student/classes/dtos/student-class.dto';
import { ClassesService } from '../student/classes/classes.service';

@Injectable()
export class PaymentService extends GenericService<Payment> {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly userService: UserService,
    private readonly classesService: ClassesService,
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
    const user = await this.userService.findOne({
      where: { email: preference.payer.email },
    });

    let payments: Payment[] = [];
    for (const item of preference.items) {
      let payment = new Payment();
      payment.description = item.title;
      payment.title = item.description;
      payment.classScheduleId = item.id;
      payment.quantity = item.quantity;
      payment.unitPrice = item.unit_price;
      payment.status = 'initial';
      payment.user = user;
      payment.externalReference = preference.externalReference;
      payments.push(payment);
    }

    return this.paymentRepository.save(payments);
  }

  async processPayment(params: ProcessPaymentParamsDTO) {
    try {
      let payment = await this.paymentRepository.findOne({
        where: { externalReference: params.external_reference },
        relations: { user: true },
      });
      if (!payment) {
        // Handle the case where the payment is not found
        throw new Error('Payment not found');
      }
      payment.paymentId = params.payment_id;
      payment.merchantOrderId = params.merchant_order_id;
      payment.status = params.status;

      payment = await this.paymentRepository.save(payment);

      if (payment.status === 'approved') {
        let studentClass = new StudentClassDTO();
        studentClass.classScheduleId = payment.classScheduleId;
        studentClass.classType = payment.description;
        studentClass.paymentId = payment.id;
        studentClass.studentId = payment.user.id;
        try {
          const created = await this.classesService.create(studentClass);
        } catch {
          throw new Error('EXPECTATION_FAILED');
        }
      }

      return payment;
    } catch (error) {
      if (error?.message === 'EXPECTATION_FAILED') {
        throw new HttpException(
          'ERROR ASIGNING STUDENT CLASS, PLEASE CONTACT US',
          HttpStatus.EXPECTATION_FAILED,
        );
      } else {
        console.log('ERROR', error);
        throw error;
      }
    }
  }

  async getPaymentsByUser(studentId: number) {
    const payments = await this.paymentRepository.find({
      where: { user: { id: studentId } },
    });

    return payments;
  }
}
