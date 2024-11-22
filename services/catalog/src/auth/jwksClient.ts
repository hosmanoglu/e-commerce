import jwksRsa from 'jwks-rsa';


const JWKS_URI = process.env.JWKS_URI as string;

// JWKS Client
const jwksClient = jwksRsa({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: JWKS_URI, // JWKS endpoint URL
});

export {jwksClient}