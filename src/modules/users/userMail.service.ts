import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '../../shared/config/config.service';

@Injectable()
export class UserMailService {
  constructor(private readonly mailerService: MailerService) {}

  /**
   * @param  {} to
   * @param  {} tokenForgotPassword
   * @param  {} {returnthis.mailerService.sendMail({to
   * @param  {ConfigService.mailTo(} from
   */
  async sendMailForgotPassword(to, tokenForgotPassword) {
    return this.mailerService.sendMail({
      to,
      from: ConfigService.mailTo(),
      subject: 'Student document forgot password',
      template: 'templates/mails/forgotPassword',
      context: {
        clientUri: ConfigService.clientUri(),
        token: tokenForgotPassword,
      },
    });
  }

  /**
   * @param  {} to
   * @param  {} token
   * @param  {} {returnthis.mailerService.sendMail({to
   * @param  {ConfigService.mailTo(} from
   */
  async sendMailConfirmation(to, token) {
    return this.mailerService.sendMail({
      to,
      from: ConfigService.mailTo(),
      subject: 'Student document confirmation',
      template: 'templates/mails/confirmation',
      context: {
        clientUri: ConfigService.clientUri(),
        token: token,
      },
    });
  }
}
