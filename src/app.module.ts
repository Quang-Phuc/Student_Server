// lib
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { RouterModule } from 'nest-router';

// module
import { UserMoudle } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DocumentModule } from './modules/documents/document.module';
import { CategoryModule } from './modules/categories/category.module';

import { TypeOrmConfigService } from './shared/config/typeOrmConfig.service';
import { ValidatorsModule } from './validator/validator.module';
import { SharedModule } from './shared/shared.moduel';
import { ConfigService } from './shared/config/config.service';
import { EventsModule } from './events/events.module';
import routes from './routes';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MailerModule.forRoot(ConfigService.mailConfig()),
    RouterModule.forRoutes(routes),
    ValidatorsModule,
    AuthModule,
    UserMoudle,
    DocumentModule,
    SharedModule,
    CategoryModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
