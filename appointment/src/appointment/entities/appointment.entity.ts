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
    default: 'pending',
  })
  status: string;

  // replicated data
  @Prop({ default: '' })
  doctorLastname: string;
  @Prop({ default: '' })
  patientCIN: string;
  @Prop({ default: '' })
  patientBirthday: Date;
  @Prop({ default: '' })
  patientName: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
