/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [isEmailError, setIsEmailError] = useState(false);
    const [isActiveError, setIsActiveError] = useState(false);
    const [password, setPassword] = useState('');
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const signIn = async () => {
        setIsEmailError(false);
        setIsPasswordError(false);
        setIsActiveError(false);
        try {
            const res = await axios.post('/api/login', { email, password }, { withCredentials: true });

            if (res.status === 200) {
                window.sessionStorage.setItem('token', JSON.stringify(res.data.token));
                router.replace('/');
            }
        } catch (error: any) {
            const errorMessage: string = error.response.data.error;

            if (errorMessage === 'This email does not registered') {
                setIsEmailError(true);
            }

            if (errorMessage === 'Incorrect password') {
                setIsPasswordError(true);
            }

            if (errorMessage === 'This user is inactive') {
                setIsActiveError(true);
            }

            console.log(error);
        }
    };

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
                                    className={`w-full md:w-30rem ${isEmailError && 'p-invalid'}`}
                                    style={{ padding: '1rem' }}
                                    onChange={e => setEmail(e.target.value)}
                                    aria-describedby="email-help"
                                />
                                {isEmailError && <small className="email-help text-red-500">This email does not registered.</small>}
                                {isActiveError && <small className="email-help text-red-500">This email is inactive.</small>}
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
                                    className={`w-full ${isPasswordError && 'p-invalid'}`}
                                    inputClassName="w-full p-3 md:w-30rem"
                                    aria-describedby="password-help"
                                ></Password>
                                {isPasswordError && <small className="password-help text-red-500">Incorrect password.</small>}
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
                            <Button label="Sign In" className="w-full p-3 text-xl" onClick={() => signIn()}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
