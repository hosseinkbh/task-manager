import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import { I18nValidationExceptionFilter, I18nValidationPipe } from "nestjs-i18n";
import morgan from "morgan";
import { ConfigService } from "@nestjs/config";
import { NestExpressApplication } from "@nestjs/platform-express";
import EnvironmentVariables from "./envCheck";
import session from "express-session";
import { UserDocument } from "./models/user.model";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  const configService = app.get(ConfigService<EnvironmentVariables, true>);
  app.useBodyParser("raw");
  app.use(helmet({ xPoweredBy: false }));
  app.enableCors({ origin: "*" });
  app.use(
    session({
      secret: "my-secret",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.useGlobalPipes(
    new I18nValidationPipe({
      stopAtFirstError: false,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  app.use(
    morgan(function (tokens, req, res) {
      console.log(tokens["response-time"](req, res));
      return [
        tokens.method(req, res),
        tokens.url(req, res)?.split("?")[0],
        "-",
        "STATUS :",
        tokens.status(req, res),
        "-",
        "RESPONSE-TIME : ",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ");
    })
  );
  app.useGlobalFilters(new I18nValidationExceptionFilter());
  const PORT = configService.get<number>("PORT");
  app.listen(PORT, () => {
    console.log(`Nest server is running on port : ${PORT}`);
  });
}
bootstrap();

declare module "express-session" {
  interface SessionData {
    isLoggedIn: boolean;
    user: UserDocument;
  }
}
