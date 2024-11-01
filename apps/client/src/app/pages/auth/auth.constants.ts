import * as API from '../../shared/constants';

const AUTH_SIGNUP = '/signup';
const AUTH_SIGNIN = '/signin';
const VALIDATED_USER = '/validate-user';
const REFRESH_TOKENS = '/refresh-tokens'
export const SIGNUP_ENDPOINT = API + AUTH_SIGNUP;
export const SIGNIN_ENDPOINT = API + AUTH_SIGNIN;
export const VALIDATED_USER_ENDPOINT = API + VALIDATED_USER;
export const REFRESH_TOKENS_ENDPOINT = API + REFRESH_TOKENS;
