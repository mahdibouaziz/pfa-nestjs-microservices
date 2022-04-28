import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetAuthorization = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['authorization'];
  },
);
