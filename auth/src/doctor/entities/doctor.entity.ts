import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorDocument = Doctor & Document;

@Schema()
export class Doctor {
  @Prop()
  firstname: string;
  @Prop()
  lastname: string;
  @Prop()
  phone: string;
  @Prop()
  birthday: Date;
  @Prop()
  email: string;
  // nurse = infirmière
  @Prop({
    enum: ['doctor', 'nurse'],
  })
  type: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
