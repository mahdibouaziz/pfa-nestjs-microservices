import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import * as mongoose from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  patientId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  doctorId: string;

  @Prop()
  date: string;

  @Prop()
  time: string;

  @Prop({
    enum: ['consultation', 'hopital du jours'],
  })
  type: string;

  @Prop({
    enum: ['pending', 'canceled', 'done'],
  })
  status: string;

  // replicated data
  @Prop()
  doctorLastname: string;
  @Prop()
  patientCIN: string;
  @Prop()
  patientBirthday: string;
  @Prop()
  patientName: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
