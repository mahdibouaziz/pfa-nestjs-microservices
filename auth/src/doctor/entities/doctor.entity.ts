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
  @Prop()
  password: string;
  @Prop()
  salt: string;
  // nurse = infirmière
  @Prop({
    enum: ['doctor', 'nurse'],
  })
  type: string;

  @Prop({
    default: false,
  })
  isAdmin: boolean;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
