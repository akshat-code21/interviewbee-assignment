import type { NextAuthOptions, Session } from "next-auth"
import type { JWT } from "next-auth/jwt"
import type { Account } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url.includes('/api/auth/callback')) {
                return `${baseUrl}/dashboard`
            }
            if (url.startsWith('/')) {
                return `${baseUrl}${url}`
            }
            return baseUrl
        },
        async session({ session, token }: { session: Session, token: JWT }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                    name: token.name,
                    email: token.email,
                    image: token.picture
                },
                accessToken: token.accessToken
            }
        },
        async jwt({ token, account }: { token: JWT, account: Account | null }) {
            if (account) {
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
            }
            return token
        },
    },
    pages: {
        signIn: '/',
    },
    debug: process.env.NODE_ENV === 'development'
} 