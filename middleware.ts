import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    if (!request.cookies.get('token')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
}

export const config = {
    matcher: ['/auth', '/', '/users/create-users', '/users', '/trade-mark', '/trade-mark/create-trade-mark', '/record']
};
