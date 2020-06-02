import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

config();

@Injectable()
export class ConfigService {
  private static getEnv(key: string): string {
    return process.env[key];
  }

  static getJwtSecret(): string {
    return this.getEnv('JWT_SECRET');
  }

  static getAwsS3Config() {
    return {
      accessKeyId: this.getEnv('AWS_S3_ACCESS_KEY_ID'),
      secretAccessKey: this.getEnv('AWS_S3_SECRET_ACCESS_KEY'),
      bucketName: this.getEnv('AWS_S3_BUCKET_NAME'),
      region: this.getEnv('AWS_S3_REGION')
    };
  }

  static mailConfig(): MailerOptions {
    return {
      transport: {
        host: this.getEnv('SMTP_HOST'),
        port: this.getEnv('SMTP_PORT'),
        secure: this.getEnv('SMTP_SECURE'),
        auth: {
          user: this.getEnv('SMTP_AUTH_USER'),
          pass: this.getEnv('SMTP_AUTH_PASS'),
        },
      },
      template: {
        dir: `${process.cwd()}/templates/`,
        adapter: new HandlebarsAdapter(),
      },
    };
  }

  static clientUri(): string {
    return this.getEnv('CLIENT_URI');
  }

  static mailTo(): string {
    return this.getEnv('SMTP_AUTH_USER');
  }

  static redisConfig() {
    return {
      host: this.getEnv('REDIS_HOST'),
      post: this.getEnv('REDIS_HOST')
    };
  }
}
