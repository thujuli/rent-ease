import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { ResponseMessage } from '~/common/decorators/response-message.decorator';

export interface NewResponse<T> {
  data: T;
  statusCode: number;
  message: string;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, NewResponse<T>>
{
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<NewResponse<T>> {
    const response = context.switchToHttp().getResponse<Response>();
    const statusCode = response.statusCode;
    const responseMessage =
      this.reflector.get(ResponseMessage, context.getHandler()) || 'Success';

    return next.handle().pipe(
      map((data) => ({
        data,
        statusCode: statusCode,
        message: responseMessage,
      })),
    );
  }
}
