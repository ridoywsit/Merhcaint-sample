import { components } from 'generated/server.type';

import { S3File } from './util.type';

export type User = components['schemas']['UserDto'];

export interface UserWithToken extends User {
  token: string;
}

export interface LoggedInUser extends User {
  isLoggedIn: true;
}
export interface LoggedOutUser {
  isLoggedIn: false;
}

export type UserWithLoggedInStatus = LoggedInUser | LoggedOutUser;
