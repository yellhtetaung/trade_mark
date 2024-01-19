/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { axiosInstance } from '../../../../utils/axiosInstance';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const { data: session, status } = useSession();

    const onLoginHandler = async () => {
        setIsError(false);

        const result = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false,
        });

        if (!result?.ok) {
            setIsError(true);
        }
    };

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/');
        }
    }, [status, router]);

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <div>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Welcome</div>
                            <div className="text-xl mb-3 font-medium">HAVIP(MYANMAR) IP SERVICES Co.,Ltd</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <div className="flex flex-column mb-5">
                                <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                    Email
                                </label>
                                <InputText
                                    id="email1"
                                    value={email}
                                    type="email"
                                    placeholder="Email address"
                                    className={`w-full md:w-30rem ${isError && 'p-invalid'}`}
                                    style={{ padding: '1rem' }}
                                    onChange={e => setEmail(e.target.value)}
                                    aria-describedby="email-help"
                                />
                            </div>

                            <div className="flex flex-column mb-5">
                                <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                    Password
                                </label>
                                <Password
                                    inputId="password1"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Password"
                                    toggleMask
                                    className={`w-full md:w-30rem ${isError && 'p-invalid'}`}
                                    inputClassName="w-full p-3 md:w-30rem"
                                    aria-describedby="password-help"
                                ></Password>
                            </div>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" checked={checked} onChange={e => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Remember me</label>
                                </div>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Forgot password?
                                </a>
                            </div>
                            <Button label="Sign In" className="w-full p-3 text-xl" onClick={() => onLoginHandler()}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
