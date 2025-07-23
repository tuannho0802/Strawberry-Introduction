export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export class User {
  id: string;
  username: string;
  password: string;
  role: Role;
}
