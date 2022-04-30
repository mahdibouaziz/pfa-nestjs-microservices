import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Doctor } from '../../doctor/entities/doctor.entity';

import * as mongoose from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema()
export class Patient {
  @Prop()
  cin: string;
  @Prop()
  firstname: string;
  @Prop()
  lastname: string;
  @Prop()
  phone: string;
  @Prop()
  birthday: Date;
  @Prop()
  governorate: string;
  @Prop()
  treatingDay: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' })
  associatedDoctor: Doctor;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
