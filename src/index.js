const Provider = require('oidc-provider')

const configuration = {
  features: {
    clientCredentials: { enabled: true },
    request: { enabled: true },
    requestUri: { enabled: false }
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
