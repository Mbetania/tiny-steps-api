import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'process';
import { MongoDBModule } from './infrastructure/config/mongodb';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get('RATE_LIMIT_TTL'),
          limit: config.get('RATE_LIMIT_COUT'),
        },
      ],
    }),
    MongoDBModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
