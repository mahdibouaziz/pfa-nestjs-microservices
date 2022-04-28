import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
