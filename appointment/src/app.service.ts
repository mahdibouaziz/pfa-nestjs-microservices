import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

  getHello(): string {
    return 'Hello World!';
  }

  async testAuth(body) {
    return body;
  }

  getAppointment() {
    this.authClient
      .send({ cmd: 'is_user_auth' }, { userId: 'No User' })
      .subscribe((result: boolean) => {
        console.log(result);
        // emit some data to the auth service
        if (result === true) {
          this.authClient.emit('auth_event', {
            name: 'This user is auth in the auth service',
          });
        } else {
          this.authClient.emit('auth_event', {
            name: 'This user is not auth in the auth service',
          });
        }
      });
  }
}
