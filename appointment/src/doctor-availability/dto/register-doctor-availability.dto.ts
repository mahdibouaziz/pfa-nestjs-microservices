import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterDoctorAvailabilityDto {
  @IsNotEmpty()
  @IsIn([
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
    'dimanche',
  ])
  day: string;

  @IsNotEmpty()
  @IsNumber()
  startHour: number;

  @IsNotEmpty()
  @IsNumber()
  endHour: number;

  @IsNotEmpty()
  @IsIn(['consultation', 'hopital du jours'])
  type: string; // (enum: ['consultation', 'hopital du jours'])

  @IsNotEmpty()
  @IsNumber()
  nbMaxAppointments: number;

  doctorId: string;
}
