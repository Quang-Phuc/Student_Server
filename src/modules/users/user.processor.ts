import { Process, Processor, OnQueueActive } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { UserMailService } from './userMail.service';
import _ from 'lodash';

@Processor('userProcessor')
export class UserProcessor {
  private readonly logger = new Logger(UserProcessor.name);

  constructor(private readonly userMailService: UserMailService) {}

  @Process('sendMailConfirmation')
  async sendMailConfirmation(job: Job) {
    try {
      this.logger.debug(job.data);
      const to = _.get(job, 'data.to');
      const token = _.get(job, 'data.token');

      if (_.isNull(to) || _.isNull(token)) {
        this.logger.debug(
          `send mail confirmation fail, to or token is null`,
        );
        return;
      }
      await this.userMailService.sendMailConfirmation(to, token);
      this.logger.debug(`send mail confirmation ${job.data.to} successed`);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Process('sendMailForgotPassword')
  async sendMailForgotPassword(job: Job) {
    try {
      this.logger.debug(job.data);
      const to = _.get(job, 'data.to');
      const token = _.get(job, 'data.token');

      if (_.isNull(to) || _.isNull(token)) {
        this.logger.debug(
          `send mail confirmation fail, to or token is null`,
        );
        return;
      }
      await this.userMailService.sendMailForgotPassword(to, token);
      this.logger.debug(`send mail forgot password ${job.data.to} successed`);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name}`,
    );
  }
}
