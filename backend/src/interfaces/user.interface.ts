export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  phone_number: string;
}

interface IUserDetail extends IUser {
  id: number;
  user_id: number;
  role: userRole;
  birth_date: Date;
  created_at: Date;
  updated_at?: Date;

  gender?: string;
}

enum userRole {
  "user",
  "organizer",
}
export { IUserDetail, userRole };
