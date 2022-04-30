import { IsNotEmpty } from 'class-validator';

export class RegisterPatientDto {
  @IsNotEmpty()
  cin: string;
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  birthday: Date;
  @IsNotEmpty()
  governorate: string;
  @IsNotEmpty()
  treatingDay: string;
  @IsNotEmpty()
  associatedDoctor: string;
}
