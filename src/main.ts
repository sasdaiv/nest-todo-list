import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
//You should uncomment commented code to use logger globally
// import { CustomLoggerModule } from './custom-logger/custom-logger.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(
    AppModule,
    // { bufferLogs: true}
  );
  // app.useLogger(app.get(CustomLoggerModule));
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(PORT, () =>
    console.log(`Server is listening on ${PORT} port`),
  );
}
bootstrap();
