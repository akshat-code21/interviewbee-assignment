import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicPaths = ['/', '/api/auth']

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const { pathname } = request.nextUrl

    const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

    if (isPublicPath && token && pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (isPublicPath) {
        return NextResponse.next()
    }

    if (!token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
} 