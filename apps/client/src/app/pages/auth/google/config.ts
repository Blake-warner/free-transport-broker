import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  issuer: 'https://accounts.google.com/o/oauth2/auth',

  redirectUri: 'http://localhost:4200/join-network',

  clientId: '205076023932-u2d2emt78ae0n656ot931ik11v51u336.apps.googleusercontent.com',
  
  scope: 'openid profile email',

  strictDiscoveryDocumentValidation: false,

  requireHttps: false,
}