export class RegisterDoctorAvailabilityDto {
  day: number;
  startHour: number;
  endHour: number;
  type: string; // (enum: ['consultation', 'hopital du jour'])
  nbMaxAppointments: number;
}
