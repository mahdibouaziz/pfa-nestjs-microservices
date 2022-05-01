import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { GetDoctorPatientInformationEventDto } from './dto/get-doctor-patient-information-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  // listen to the event coming from the appointments who want more information aboutthe doctor and patient
  @EventPattern('doctor_patient_information')
  async getDoctorAndPatientInformation(
    data: GetDoctorPatientInformationEventDto,
  ) {
    this.eventsService.getDoctorAndPatientInformation(data);
  }
}
