import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const response = NextResponse.json({
            message: 'Login Successfully',
            success: true
        });
        response.cookies.delete('token');

        return response;
    } catch (err: any) {
        return NextResponse.json({ message: err.message });
    }
}
