export interface userEntry {
  id: number;
  firstName: string;
  lastName: string;
  birthday: Date;
  email: string;
  password: string;
  recoveryToken?: string;
}

type userEntryWithoutSensitiveInfo = Omit<
  userEntry,
  'password' | 'recoveryToken'
>;
