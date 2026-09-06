import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload =
      exception instanceof HttpException ? exception.getResponse() : { message: "Internal server error" };
    const message =
      typeof payload === "string"
        ? payload
        : Array.isArray((payload as { message?: unknown }).message)
          ? (payload as { message: string[] }).message.join(", ")
          : ((payload as { message?: string }).message ?? "Error");
    res.status(status).json({ success: false, data: null, message });
  }
}
