import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  // listen to the event coming from the appointments who want more information aboutthe doctor and patient
  @EventPattern('doctor_patient_information')
  async listEvent(data) {
    this.eventsService.getDoctorAndPatientInformation(data);
  }
}
