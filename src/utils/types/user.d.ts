import { UserRole } from '../../db/entity/User';

export interface userEntry {
  id: number;
  firstName: string;
  lastName: string;
  birthday: Date;
  email: string;
  password?: string;
  recoveryToken?: string;
  role: UserRole;
}

type userEntryWithoutSensitiveInfo = Omit<
  userEntry,
  'password' | 'recoveryToken'
>;
