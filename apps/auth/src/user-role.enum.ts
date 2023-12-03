export enum UserRole {
  Reader = 'reader',
  Admin = 'admin',
}

export const UserRolePrivileges = {
  [UserRole.Reader]: 0,
  [UserRole.Admin]: 1,
};
