import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { axiosInstance } from '../../../axiosInstance';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        const response = await axiosInstance.post('/api/auth/login', { email, password });
        const data = response.data;

        console.log('response => ', response);

        if (response.status === 200) {
            const nextResponse = NextResponse.json({ message: data.message, token: data.token }, { status: 200 });
            nextResponse.cookies.set({ name: 'token', value: data.token, httpOnly: true, sameSite: 'strict', expires: new Date(Date.now() + 60 * 60 * 24 * 1000) });

            return nextResponse;
        }

        if (response.status === 500) {
            return null;
        }
    } catch (err: any) {
        return NextResponse.json({ error: err.response.data.message }, { status: 500 });
    }
}
