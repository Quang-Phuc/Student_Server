import { UserInfo } from '../../users/user.interface';

export interface ILoginResponse {
  user: UserInfo;
  accessToken: string;
}
