import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { axiosInstance } from '../../../axiosInstance';

export async function GET(request: NextRequest) {
    try {
        const token = request.headers.get('cookies');

        const response = await axiosInstance.get('/api/auth/verify', {
            headers: {
                'Authorization': token,
            },
        });
        const data = response.data;

        return NextResponse.json({ message: data.message });
    } catch (err: any) {
        return NextResponse.json({ error: err.response.data.message }, { status: 500 });
    }
}
