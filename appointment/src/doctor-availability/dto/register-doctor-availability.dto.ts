import { IsEnum, IsIn, IsNotEmpty, IsNumber } from 'class-validator';
import { Day } from '../days.enum';

export class RegisterDoctorAvailabilityDto {
  @IsNotEmpty()
  // @IsEnum(Day, {
  //   message:
  //     'The day must be in the enum: [lundi,mardi,mercredi,jeudi,vendredi,samedi,dimanche]',
  // })
  day: number;

  @IsNotEmpty()
  @IsNumber()
  startHour: number;

  @IsNotEmpty()
  @IsNumber()
  endHour: number;

  @IsNotEmpty()
  @IsIn(['consultation', 'hopital du jour'])
  type: string; // (enum: ['consultation', 'hopital du jour'])

  @IsNotEmpty()
  @IsNumber()
  nbMaxAppointments: number;

  doctorId: string;
}
