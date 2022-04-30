import { IsEmail, IsIn, IsNotEmpty } from 'class-validator';

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
  @IsIn(['doctor', 'nurse'])
  type: string;

  isAdmin: boolean;
}
