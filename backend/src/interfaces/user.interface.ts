export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  phone_number: string;
  user_role?: userRole | undefined;
  image_src?: string | undefined;
}

interface IUserModel {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  phone_number?: string;
  birthDate?: Date;
  gender?: userGender;
  image_src?: string | undefined;
  user_roles?: UserRoles | string;
}

interface UserRoles {
  id: number;
  user_id: number;
  role: userRole;
}

interface IUserDetail extends IUser {
  image?: string;
  birth_date: Date;
  created_at: Date;
  gender?: userGender;
}
enum userRole {
  "user",
  "organizer",
}

enum userGender {
  "pria",
  "wanita",
}
export { IUserDetail, IUserModel, userRole };
