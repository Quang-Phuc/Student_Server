import * as bcrypt from 'bcrypt';
import { isNil } from 'lodash';
import moment from 'moment';
import constants from '../constants';

export class UtilsService {
  /**
   * @param  {string} password
   * @returns string
   */
  static generateHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  /**
   * @param  {string} password
   * @param  {string} hash
   * @returns Promise
   */
  static validateHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash || '');
  }

  static convertMysqlDate(date) {
    if(isNil(date)) {
      return undefined;
    }

    try {
      return moment(date).format(constants.mysqlDateTimeFormat.date);
    } catch (error) {
      throw error;
    }
  }
}
