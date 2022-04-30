import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDoctorDto {
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  birthday: Date;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  type: string;

  isAdmin: boolean;
}
