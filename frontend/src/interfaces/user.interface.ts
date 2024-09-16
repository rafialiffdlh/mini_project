export interface User {
  id: number | undefined;
  phone_number: string | undefined;
  gender: "pria" | "wanita" | undefined;
  email: string | undefined;
  name: string | undefined;
  image?: string;
  user_role?: string | undefined;
  access_token?: string;
}

export enum UserRoles {
  User,
  Organizer,
}
