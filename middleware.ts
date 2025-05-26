import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const isAuthenticated = !!token

    const publicPaths = ['/', '/api/auth']
    const isPublicPath = publicPaths.some(path =>
        request.nextUrl.pathname.startsWith(path)
    )

    if (isPublicPath) {
        if (isAuthenticated && request.nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        return NextResponse.next()
    }

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
} 