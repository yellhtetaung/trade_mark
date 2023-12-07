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

        if (response.status === 200) {
            return NextResponse.json({ message: data.message });
        }
    } catch (err: any) {
        return NextResponse.json({ error: 'Something Wrong' }, { status: 500 });
    }
}
