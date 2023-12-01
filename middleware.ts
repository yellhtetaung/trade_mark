import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    if (!request.cookies.get('token')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
}

export const config = {
    matcher: ['/auth', '/', '/users', '/users/create-users', '/trade-mark', '/trade-mark/create-trade-mark', '/trade-mark/create-trade-mark/:path*', '/record', '/record/search-record', '/record/search-image', '/record/search-image/:path*'],
};
