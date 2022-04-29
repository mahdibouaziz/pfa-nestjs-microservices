import { RegisterDoctorDto } from 'src/doctor/dto/register-doctor.dto';
import { RegisterPatientDto } from 'src/patient/dto/register-patient.dto';

export const patientStub = (): RegisterPatientDto => {
  return {
    cin: '11111111',
    firstname: 'doctorTest1',
    lastname: 'doctorTest1',
    phone: '20400417',
    birthday: new Date(2000, 1, 4),
  };
};

export const doctorAdminStub = (): RegisterDoctorDto => {
  return {
    firstname: 'doctorAdminTest',
    lastname: 'doctorAdminTest',
    phone: '20400417',
    birthday: new Date(2000, 1, 4),
    email: 'test@test.com',
    password: 'doctorAdminTest',
    type: 'doctor',
    isAdmin: true,
  };
};
