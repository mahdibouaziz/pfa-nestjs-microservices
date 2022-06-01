import { IsIn, IsNotEmpty } from 'class-validator';

export class RegisterAppointmentDto {
  @IsNotEmpty()
  patientId: string;

  @IsNotEmpty()
  doctorId: string;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  time: string;

  @IsNotEmpty()
  @IsIn(['consultation', 'hopital du jours'])
  type: string;
}
