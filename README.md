# cds-auth-server

This is a reference implementation of Auth Server that is conforming to [CDS Security Profile](https://consumerdatastandardsaustralia.github.io/standards/#security-profile).

It is based on [node-oidc-provider](https://github.com/panva/node-oidc-provider), which is one of the [OpenID Certified providers](https://openid.net/developers/certified/)

It uses [koa](https://koajs.com/) as HTTP handler

####Software requirements:

* [node v12 or above](https://nodejs.org/en/)
* [yarn](https://yarnpkg.com/en/)

####Get started

* `yarn start` to start the server
* `yarn watch` to start the server with automatic reload when files change,
   which useful for development. [nodemon](https://www.npmjs.com/package/nodemon) is required

####License

* MIT

