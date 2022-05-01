import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import * as mongoose from 'mongoose';

export type DoctorAvailabilityDocument = DoctorAvailability & Document;

// startHour: Time;
// endHour: Time
// type: string; (enum: ['pending', 'canceled', 'done'])
// nbMaxAppointments : int

@Schema()
export class DoctorAvailability {
  @Prop({
    enum: [
      'lundi',
      'mardi',
      'mercredi',
      'jeudi',
      'vendredi',
      'samedi',
      'dimanche',
    ],
  })
  day: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  doctorId: string;
  // needed some data about the doctor

  @Prop()
  startHour: number;

  @Prop()
  endHour: number;

  @Prop({
    enum: ['consultation', 'hopital du jours'],
  })
  type: string;

  @Prop()
  nbMaxAppointments: number;
}

export const DoctorAvailabilitySchema =
  SchemaFactory.createForClass(DoctorAvailability);
