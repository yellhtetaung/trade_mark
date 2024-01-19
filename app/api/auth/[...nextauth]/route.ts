import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { axiosInstance } from '../../../../utils/axiosInstance';

const handler = NextAuth({
    secret: 'trademark',
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    const response = await axiosInstance.post('/api/auth/login', {
                        email: credentials?.email,
                        password: credentials?.password,
                    });

                    const { token } = response.data;

                    if (response.status === 200) {
                        return token;
                    }
                } catch (error: any) {
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const response = await axiosInstance.get('/api/auth/verify', {
                    headers: {
                        'Authorization': `${user}`,
                    },
                });

                if (response.status === 200) {
                    return {
                        ...token,
                        role: response.data.message,
                    };
                }
            }

            return token;
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...user,
                    role: token.role,
                },
            };
        },
    },
    pages: {
        signIn: '/auth/login',
    },
});

export { handler as GET, handler as POST };
