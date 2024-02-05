import { Permissions } from './permissions'

export interface User {
  email: string;
  school: string;
  devices: [string, string];
  token: string;
  permissions: Permissions[];
}
