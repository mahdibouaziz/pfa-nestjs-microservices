import { RegisterDoctorDto } from 'src/doctor/dto/register-doctor.dto';
import { RegisterPatientDto } from 'src/patient/dto/register-patient.dto';

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

export const doctorStub1 = (): RegisterDoctorDto => {
  return {
    firstname: 'doctorTest1',
    lastname: 'doctorTest1',
    phone: '20400417',
    birthday: new Date(2000, 1, 4),
    email: 'doctorTest1@test.com',
    password: 'doctorTest',
    type: 'doctor',
    isAdmin: false,
  };
};

export const patientStub = (): RegisterPatientDto => {
  return {
    cin: '11111111',
    firstname: 'doctorTest1',
    lastname: 'doctorTest1',
    phone: '20400417',
    birthday: new Date(2000, 1, 4),
    governorate: 'Sfax',
    treatingDay: 'Monday',
    associatedDoctor: '11111111',
  };
};
