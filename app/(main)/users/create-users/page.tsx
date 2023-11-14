'use client';

import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

import { User, ChangeHandler } from '../../../../types/types';

const CreateUsers = () => {
    const [user, setUser] = useState<User>({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        nrc: '',
        address: ''
    });

    const onChangeHandler = (e: ChangeHandler) => {
        setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const submitHandler = () => {
        console.log(user);
    };

    return (
        <div className="col-12">
            <h1 className="text-4xl font-bold">Create User</h1>
            <div className="card">
                <div className="p-fluid formgrid grid">
                    <div className="field col-12">
                        <label htmlFor="username">Username</label>
                        <InputText id="username" name="username" value={user.username} type="text" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" name="email" value={user.email} type="email" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="password">Password</label>
                        <Password inputId="password" name="password" value={user.password} onChange={onChangeHandler} toggleMask={true} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <InputText id="phoneNumber" name="phoneNumber" value={user.phoneNumber} type="tel" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="nrc">NRC</label>
                        <InputText id="nrc" name="nrc" value={user.nrc} type="text" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12">
                        <label htmlFor="address">Address</label>
                        <InputTextarea id="address" name="address" value={user.address} rows={5} autoResize={true} onChange={onChangeHandler} />
                    </div>
                </div>

                <div className="flex justify-content-end">
                    <Button label="Submit" onClick={submitHandler} />
                </div>
            </div>
        </div>
    );
};

export default CreateUsers;
