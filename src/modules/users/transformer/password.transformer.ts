import { ValueTransformer } from 'typeorm';
import { UtilsService } from '../../../providers/utils.service';

export class PasswordTransformer implements ValueTransformer {
  /**
   * @param  {string} value
   * @returns string
   */
  from(value: string): string {
    return value;
  }

  /**
   * @param  {string} value
   * @returns string
   */
  to(value: string): string {
    return UtilsService.generateHash(value);
  }
}
