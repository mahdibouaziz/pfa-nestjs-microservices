import { IsIn, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  patientId: string;

  @IsNotEmpty()
  doctorId: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  time: string;

  @IsIn(['consultation', 'hopital du jours'])
  type: string;
}
