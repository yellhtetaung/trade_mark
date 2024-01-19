import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const response = NextResponse.json(
            {
                message: 'Logout Successfully',
            },
            { status: 200 },
        );
        response.cookies.delete('token');

        return response;
    } catch (err: any) {
        return NextResponse.json({ message: err.message, error: err }, { status: 500 });
    }
}
