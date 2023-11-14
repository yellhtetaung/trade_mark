import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    if (!request.cookies.get('token')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
}

export const config = {
    matcher: ['/auth', '/', '/users', '/users/create-users', '/trade-mark', '/trade-mark/create-trade-mark', '/record', '/record/search-record', '/record/search-image', '/record/search-image/:path*']
};
