import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from 'src/doctor/entities/doctor.entity';
import { Patient, PatientSchema } from 'src/patient/entities/patient.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]),
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
    ClientsModule.register([
      {
        name: 'APPOINTMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
          ],
          queue: process.env.RABBITMQ_APPOINTMENT_QUEUE_NAME,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
