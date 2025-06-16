import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { JwtGuard } from './auth/jwt.guard';
import { LoggingService } from './logging/logging.service';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);
  app.useLogger(loggingService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalGuards(
    new (class extends JwtGuard {
      canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { url } = request;
        if (url === '/' || url.startsWith('/auth/') || url.startsWith('/doc')) {
          return true;
        }
        return super.canActivate(context);
      }
    })(),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('Home Library API')
    .setDescription('API documentation for Home Library')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(app.get(ConfigService).get<number>('PORT') || 4000);
  app.use((req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl, query, body } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      loggingService.log(
        `${method} ${originalUrl} ${JSON.stringify(query)} ${JSON.stringify(
          body,
        )} - ${statusCode}`,
      );
    });
    next();
  });

  process.on('uncaughtException', (error) => {
    loggingService.error(`Uncaught Exception: ${error.message}`, error.stack);
  });

  process.on('unhandledRejection', (reason, promise) => {
    loggingService.error(
      `Unhandled Rejection at: ${promise} reason: ${reason}`,
    );
  });
}
bootstrap();
