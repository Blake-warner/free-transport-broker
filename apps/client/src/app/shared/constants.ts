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
export const SIGNUP_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + AUTH_SIGNUP;
export const SIGNIN_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + AUTH_SIGNIN;
export const VALIDATED_USER_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + VALIDATED_USER;
export const REFRESH_TOKENS_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + REFRESH_TOKENS;

// Mailer
export const VERIFY_EMAIL = '/verify-email';
export const EMAIL_VERIFIED = '/email-verified';
export const EMAIL_VERIFIED_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + EMAIL_VERIFIED;
export const VERIFY_EMAIL_ENDPOINT = HOST + ':' + API_PORT + API_PREFIX + VERSION + VERIFY_EMAIL;
