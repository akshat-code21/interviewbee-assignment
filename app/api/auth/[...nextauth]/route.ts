import NextAuth, { getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/"
    },
    callbacks: {
        async session({ session, token }: { session: any, token: any }) {
            session.user.id = token.sub
            session.user.name = token.name
            session.user.email = token.email
            session.user.image = token.image
            return session
        }
    },
    useSecureCookies: process.env.NODE_ENV === "production",
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === "production"
            }
        }
    }
} as const

export const getAuth = () => getServerSession(authOptions as any)

const handler = NextAuth(authOptions as any)

export { handler as GET, handler as POST }