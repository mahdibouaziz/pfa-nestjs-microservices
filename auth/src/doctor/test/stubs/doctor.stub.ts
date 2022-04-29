import { RegisterDoctorDto } from 'src/doctor/dto/register-doctor.dto';

export const doctorAdminStub = (): RegisterDoctorDto => {
  return {
    firstname: 'doctorAdminTest',
    lastname: 'doctorAdminTest',
    phone: '20400417',
    birthday: new Date(2000, 1, 4),
    email: 'doctorAdminTest@test.com',
    password: 'doctorAdminTest',
    type: 'doctor',
    isAdmin: true,
  };
};

export const doctorStub = (): RegisterDoctorDto => {
  return {
    firstname: 'doctorTest',
    lastname: 'doctorTest',
    phone: '20400417',
    birthday: new Date(2000, 1, 4),
    email: 'doctorTest@test.com',
    password: 'doctorTest',
    type: 'doctor',
    isAdmin: false,
  };
};
