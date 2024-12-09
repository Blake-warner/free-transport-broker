const HOST = 'http://localhost';
const VERSION = '/v1';
const API_PORT = 3000;
const API_PREFIX = '/api';

export const API = HOST + ':' + API_PORT + API_PREFIX + VERSION;

// Auth
export const AUTH_SIGNUP = '/signup';
export const AUTH_SIGNIN = '/signin';
export const VALIDATED_USER = '/validate-user';
export const REFRESH_TOKENS = '/refresh-tokens'
export const SIGNUP_ENDPOINT = API + AUTH_SIGNUP;
export const SIGNIN_ENDPOINT = API + AUTH_SIGNIN;
export const VALIDATED_USER_ENDPOINT = API + VALIDATED_USER;
export const REFRESH_TOKENS_ENDPOINT = API + REFRESH_TOKENS;

// Google Auth
export const GOOGLE_AUTH = '/authentication/google';
export const GOOGLE_AUTH_ENDPOINT = API + GOOGLE_AUTH;

// User
export const UPDATE_USER = '/update-user';
export const UPDATE_USER_ENDPOINT = API + UPDATE_USER;

// Mailer
export const VERIFY_EMAIL = '/verify-email';
export const EMAIL_VERIFIED = '/email-verified';
export const EMAIL_VERIFIED_ENDPOINT = API + EMAIL_VERIFIED;
export const VERIFY_EMAIL_ENDPOINT = API + VERIFY_EMAIL;
