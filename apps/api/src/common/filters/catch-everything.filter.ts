import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';

interface ErrorResponse {
  message: string[] | string;
}

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let responseBody: { statusCode: number; data: null; message: string[] };
    let httpStatus: number;

    if (exception instanceof HttpException) {
      const message = (exception.getResponse() as ErrorResponse).message;
      httpStatus = exception.getStatus();
      responseBody = {
        data: null,
        statusCode: httpStatus,
        message: typeof message === 'string' ? [message] : message,
      };
    } else if (exception instanceof PrismaClientKnownRequestError) {
      const message = exception.message.replace(/\n/g, '');
      httpStatus = HttpStatus.BAD_REQUEST;
      responseBody = {
        data: null,
        statusCode: HttpStatus.BAD_REQUEST,
        message: [message],
      };
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody = {
        data: null,
        statusCode: httpStatus,
        message: ['internal server error'],
      };
    }

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
