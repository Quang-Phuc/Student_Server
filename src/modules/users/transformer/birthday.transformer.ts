import { ValueTransformer } from 'typeorm';
import moment from 'moment';
import constants from '../../../constants';

export class BirthdayTransformer implements ValueTransformer {
  /**
   * @param  {string} value
   * @returns string
   */
  from(birthday: string): string {
    return birthday;
  }

  /**
   * @param  {string} value
   * @returns string
   */
  async to(birthday: string) {
    try {
      return await moment(birthday).format(constants.mysqlDateTimeFormat.date);
    } catch (error) {
      throw error;
    }
  }
}
