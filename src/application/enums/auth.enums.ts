export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&_*-]).{8,}$/;

export const HASH_ROUNDS = 10;
export const JWT_EXPIRATION_FORMAT = 'd';
export const JWT_EXPIRATION_TIME = '1';
