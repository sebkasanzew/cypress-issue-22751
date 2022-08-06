import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak"

const KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID || 'myclient'
const KEYCLOAK_CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET || ''
const KEYCLOAK_ISSUER = process.env.KEYCLOAK_ISSUER || 'http://localhost:8080/realms/myrealm'

console.log(JSON.stringify({
    KEYCLOAK_CLIENT_ID,
    KEYCLOAK_CLIENT_SECRET,
    KEYCLOAK_ISSUER
}, null, 2))

export default NextAuth({
    providers: [
        KeycloakProvider({
            clientId: KEYCLOAK_CLIENT_ID,
            clientSecret: KEYCLOAK_CLIENT_SECRET,
            issuer: KEYCLOAK_ISSUER,
        }),
    ],
})
