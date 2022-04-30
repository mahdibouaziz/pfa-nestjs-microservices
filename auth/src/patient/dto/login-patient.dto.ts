import { IsNotEmpty } from 'class-validator';

export class LoginPatientDto {
  @IsNotEmpty()
  cin: string;
  @IsNotEmpty()
  birthday: Date;
}
