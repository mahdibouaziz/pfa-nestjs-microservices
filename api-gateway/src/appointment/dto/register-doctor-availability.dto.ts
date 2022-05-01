export class RegisterDoctorAvailabilityDto {
  day: string;
  startHour: number;
  endHour: number;
  type: string; // (enum: ['consultation', 'hopital du jours'])
  nbMaxAppointments: number;
  doctorId: string;
}
