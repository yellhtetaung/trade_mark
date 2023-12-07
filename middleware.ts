import axios from 'axios';

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.pathname;

    console.log(request);

    if (!request.cookies.get('token')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (request.cookies.get('token')) {
        const token = request.cookies.get('token')?.value as string;

        const response = await fetch('http://localhost:3000/api/auth', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Cookies: token,
            },
        });
        const data = await response.json();

        if (url !== '/' && url !== '/trade-mark' && url !== '/auth/login' && data.message !== 'Admin') {
            return NextResponse.redirect(new URL('/404', request.url));
        }
    }
}

export const config = {
    matcher: ['/auth', '/', '/users', '/users/create-users', '/trade-mark', '/trade-mark/create-trade-mark', '/trade-mark/create-trade-mark/:path*'],
};
