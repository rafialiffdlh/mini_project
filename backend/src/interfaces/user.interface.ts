interface IUser {
  id: number;
  full_name: string;
  email: string;
  hashedPassword?: string;
  phone_number: string;
  gender?: string;
  birth_date: Date;
  created_at: Date;
  updated_at?: Date;
}

interface IUserDetail {
  id: number;
  user_id: number;
  role: userRole;
}

enum userRole {
  "user",
  "organizer",
}
export { IUser, IUserDetail, userRole };
