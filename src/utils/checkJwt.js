const dotenv = require('dotenv')
const { auth } = require('express-oauth2-jwt-bearer')

dotenv.config({ path: '.env' })

exports.checkJwt = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256',
})
