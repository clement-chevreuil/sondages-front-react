import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/domain/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Poll } from './modules/poll/domain/entities/poll.entity';
import { PollModule } from './modules/poll/poll.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        entities: [User],
        synchronize: true, // à désactiver en prod
        autoLoadEntities: true,
      }),
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    AuthModule,
    UserModule,
    PollModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }
