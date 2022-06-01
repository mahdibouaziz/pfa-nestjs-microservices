import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDoctorAvailabilityDto } from './dto/register-doctor-availability.dto';
import { Model } from 'mongoose';
import {
  DoctorAvailability,
  DoctorAvailabilityDocument,
} from './entities/doctor-availability.entity';
import { Day } from './days.enum';
import { paginationFuntion } from '../pagination-utils/paginationFunction';
import { ClientProxy } from '@nestjs/microservices';
import { GetDoctorInformationEventDto } from './dto/get-doctor-information-event.dto';
import { ReturnDoctorInformationEventDto } from './dto/return-doctor-information-event.dto';

@Injectable()
export class DoctorAvailabilityService {
  constructor(
    @InjectModel(DoctorAvailability.name)
    private doctorAvailabilityModel: Model<DoctorAvailabilityDocument>,
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
  ) {}

  async registerDoctorAvailability(
    registerDoctorAvailabilityDto: RegisterDoctorAvailabilityDto,
    payload,
  ) {
    registerDoctorAvailabilityDto.doctorId = payload.doctorId;
    const doctorAvailability = new this.doctorAvailabilityModel(
      registerDoctorAvailabilityDto,
    );
    await doctorAvailability.save();

    // rabbit MQ here must be

    const getDoctorInformationEventDto: GetDoctorInformationEventDto = {
      doctorId: registerDoctorAvailabilityDto.doctorId,
      doctorAvailabilityId: doctorAvailability._id,
    };

    this.authClient.emit('doctor_information', getDoctorInformationEventDto);

    return {
      message: 'Doctor availability created',
      doctorAvailability,
    };
  }

  async updateRegistredDoctorAvailability(
    data: ReturnDoctorInformationEventDto,
  ) {
    const doctorAvailability = await this.doctorAvailabilityModel.findById(
      data.doctorAvailabilityId,
    );
    // update the appointment
    doctorAvailability.firstname = data.doctorFirstname;
    doctorAvailability.lastname = data.doctorLastname;

    await doctorAvailability.save();
  }

  async getAllDoctorAvailabilitiesPerWeekDay(payload, day: number) {
    try {
      return await this.doctorAvailabilityModel.find({ day });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // async getMyDoctorAvailability(
  //   payload,
  //   day: Day,
  //   pagesToSkip = 0,
  //   limitOfDocuments = 15,
  //   filter = '',
  // ) {
  //   let doctorQuery: any = { doctorId: payload.doctorId };
  //   if (day) {
  //     doctorQuery = { ...doctorQuery, day };
  //   }

  //   // return await this.doctorAvailabilityModel.find(query);
  //   const searchCriteria = ['type'];

  //   // console.log('doctorquery', doctorQuery);
  //   return await paginationFuntion(
  //     pagesToSkip,
  //     limitOfDocuments,
  //     filter,
  //     searchCriteria,
  //     this.doctorAvailabilityModel,
  //     doctorQuery,
  //   );
  // }

  // async deleteDoctorAvailabilityById(availabilityId, payload) {
  //   let availability;
  //   try {
  //     // get the availability
  //     availability = await this.doctorAvailabilityModel.findById(
  //       availabilityId,
  //     );
  //   } catch (error) {
  //     throw new NotFoundException('Invalid Availability ID');
  //   }

  //   if (!availability) {
  //     throw new NotFoundException('Doctor Availability not found');
  //   }

  //   // verify the doctorId = availability.doctorId / or the doctor is an admin
  //   console.log(
  //     availability.doctorId.toString(),
  //     ' = ',
  //     payload.doctorId.toString(),
  //   );
  //   if (
  //     !payload.isAdmin &&
  //     availability.doctorId.toString() != payload.doctorId
  //   ) {
  //     throw new UnauthorizedException(
  //       'You are not authorized to delete this availability',
  //     );
  //   }

  //   // delete it
  //   await this.doctorAvailabilityModel.deleteOne({
  //     _id: availability._id,
  //   });

  //   return { message: 'Doctor Availability deleted' };
  // }
}
