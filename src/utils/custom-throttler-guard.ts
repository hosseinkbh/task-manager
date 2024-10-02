import { ForbiddenException, HttpException, Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";
import { constants } from "http2";

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>) {
    if (req.headers && req.headers["x-forwarded-for"]) {
      return req.headers["x-forwarded-for"];
    }
    throw new ForbiddenException(
      "Request Dropped for invalid x-forwarded-for !!!"
    );
  }

  protected async throwThrottlingException() {
    throw new HttpException(
      "TOO_MANY_REQUESTS",
      constants.HTTP_STATUS_TOO_MANY_REQUESTS
    );
  }
}
