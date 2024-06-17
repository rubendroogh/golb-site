import { GoogleAuthProvider, signInWithRedirect } from '@firebase/auth';
import { auth } from '@/firebase/clientApp'
import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: '/dashboard/:path*',
}

// Middleware for firebase authentication
export async function middleware(req: NextRequest) {
    if (auth.currentUser != null) {
        return NextResponse.next();
    }

    const provider = new GoogleAuthProvider();
    try {
        await signInWithRedirect(auth, provider);
        return NextResponse.next();
    }
    catch(error) {
        console.log(error);
        return NextResponse.redirect(new URL('/', req.url));
    }
};
