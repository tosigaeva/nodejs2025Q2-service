import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { JwtGuard } from './auth/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
}
bootstrap();
