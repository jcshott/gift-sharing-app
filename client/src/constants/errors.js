// User Errors

export const PASSWORD_ERROR = 'PASSWORD_ERROR';
export const USER_EXISTS_ERROR = 'USER_EXISTS_ERROR';
export const ERROR_MESSAGES = {
    [PASSWORD_ERROR]: "Passwords do not match, please try again",
    [USER_EXISTS_ERROR]: "That Username already exists, please try another",
};
export const ERROR_CODES = {
    400: PASSWORD_ERROR,
    409: USER_EXISTS_ERROR,
};