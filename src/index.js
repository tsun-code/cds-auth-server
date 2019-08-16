const Provider = require('oidc-provider')

const configuration = {
  features: {
    clientCredentials: { enabled: true },
    request: { enabled: true },
    requestUri: { enabled: false },
    encryption: { enabled: true }, // enable encrypting ID token
  },
  introspectionEndpointAuthMethods: ['private_key_jwt'],
  tokenEndpointAuthMethods: ['private_key_jwt'],
  subjectTypes: ['pairwise'],
  responseTypes: ['code id_token'],
  scopes: [
    'openid',
    'profile',
    'offline_access',
    'bank:accounts.basic:read',
    'bank:accounts.detail:read',
    'bank:payees:read',
    'bank:regular_payments:read',
    'bank:transactions:read',
    'common:customer.basic:read',
    'common:customer.detail:read'
  ],
  claims: {
    acr: null,
    auth_time: null,
    iss: null,
    openid: [
      'sub', 'name', 'given_name', 'family_name', 'updated_at'
    ],
    sid: null,
    vot: null,
    vtm: null,
    sharing_expires_at: null,
    refresh_token_expires_at: null
  },
  async findAccount(ctx, sub, token) {
    // @param ctx - koa request context
    // @param sub {string} - account identifier (subject)
    // @param token - is a reference to the token used for which a given account is being loaded,
    //   is undefined in scenarios where claims are returned from authorization endpoint
    return {
      accountId: sub,
      // @param use {string} - can either be "id_token" or "userinfo", depending on
      //   where the specific claims are intended to be put in
      // @param scope {string} - the intended scope, while oidc-provider will mask
      //   claims depending on the scope automatically you might want to skip
      //   loading some claims from external resources or through db projection etc. based on this
      //   detail or not return them in ID Tokens but only UserInfo and so on
      // @param claims {object} - the part of the claims authorization parameter for either
      //   "id_token" or "userinfo" (depends on the "use" param)
      // @param rejected {Array[String]} - claim names that were rejected by the end-user, you might
      //   want to skip loading some claims from external resources or through db projection
      async claims(use, scope, claims, rejected) {
        // TODO implement me, see https://consumerdatastandardsaustralia.github.io/standards/#tokens
        return { sub };
      },
    };
  },
  clients: [{
    client_id: 'foo',
    client_secret: 'bar',
    redirect_uris: ['http://localhost:8080/cb'],
  }],
}

const oidc = new Provider('http://localhost:3000', configuration)

const server = oidc.listen(3000, () => {
  console.log('oidc-provider listening on port 3000, check http://localhost:3000/.well-known/openid-configuration')
})
