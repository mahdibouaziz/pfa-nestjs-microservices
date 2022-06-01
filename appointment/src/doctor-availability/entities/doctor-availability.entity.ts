import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import * as mongoose from 'mongoose';

export type DoctorAvailabilityDocument = DoctorAvailability & Document;

@Schema()
export class DoctorAvailability {
  @Prop()
  day: number;

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
    enum: ['consultation', 'hopital du jour'],
  })
  type: string;

  @Prop()
  nbMaxAppointments: number;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;
}

export const DoctorAvailabilitySchema =
  SchemaFactory.createForClass(DoctorAvailability);
