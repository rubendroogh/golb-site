import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/firebase/adminApp';

export const config = {
    matcher: '/dashboard/:path*',
}

// Middleware for firebase authentication
export async function middleware(req: NextRequest, res: NextResponse) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    
    try {
        // const decodedToken = await auth.verifyIdToken(token);
        const response = NextResponse.next();

        // Pass the user's info through headers
        // response.headers.set('X-User-Id', decodedToken.uid);
        // response.headers.set('X-User-Email', decodedToken.email || '');

        return response;
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
};