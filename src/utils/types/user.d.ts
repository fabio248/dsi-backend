import { UserRole } from '../../db/entity/User.entity';
import { createPetEntry } from './pet';

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

export interface userWhitPetEntry {
  id: number;
  firstName: string;
  lastName: string;
  birthday?: Date;
  email: string;
  password?: string;
  recoveryToken?: string;
  role: UserRole;
  pets: createPetEntry;
}

type userEntryWithoutSensitiveInfo = Omit<
  userEntry,
  'password' | 'recoveryToken'
>;
