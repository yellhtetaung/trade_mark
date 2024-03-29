'use client';

import React, { useState, useRef, useCallback } from 'react';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { User, ChangeHandler } from '../../../../types/types';

import { axiosInstance } from '../../../../utils/axiosInstance';
import { Dropdown } from 'primereact/dropdown';

const CreateUsers = () => {
    const toastRef = useRef<any | null>(null);
    const [role, setRole] = useState([
        { name: 'User', code: 'User' },
        { name: 'Admin', code: 'Admin' },
    ]);

    const [user, setUser] = useState<User>({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        nrc: '',
        address: '',
        role: role[0].code,
    });

    const roleValue = role.find(item => item.code === user.role);

    const defaultState = () => {
        setUser({
            username: '',
            email: '',
            password: '',
            phoneNumber: '',
            nrc: '',
            address: '',
            role: role[0].code,
        });
    };

    const onChangeHandler = useCallback((e: ChangeHandler) => {
        setUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }, []);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.post('/api/users', user);

            if (res.status === 201) {
                defaultState();
                toastRef.current.show({ severity: 'success', summary: 'Success', detail: res.data.message, life: 3000 });
            }
        } catch (error: any) {
            console.log(error);
            const errorMessage = error?.response?.data?.message;
            toastRef.current.show({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        }
    };

    return (
        <div className="col-12">
            <Toast ref={toastRef} />
            <h1 className="text-4xl font-bold">Create User</h1>
            <form className="card" onSubmit={submitHandler}>
                <div className="p-fluid formgrid grid">
                    <div className="field col-12">
                        <label htmlFor="username">Username</label>
                        <InputText id="username" name="username" value={user.username} type="text" onChange={onChangeHandler} required />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" name="email" value={user.email} type="email" onChange={onChangeHandler} required />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="password">Password</label>
                        <Password inputId="password" name="password" value={user.password} onChange={onChangeHandler} toggleMask={true} required />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <InputText id="phoneNumber" name="phoneNumber" value={user.phoneNumber} type="tel" onChange={onChangeHandler} required />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="nrc">NRC</label>
                        <InputText id="nrc" name="nrc" value={user.nrc} type="text" onChange={onChangeHandler} required />
                    </div>
                    <div className="field col-12">
                        <label htmlFor="address">Address</label>
                        <InputTextarea id="address" name="address" value={user.address} rows={5} autoResize={true} onChange={onChangeHandler} required />
                    </div>
                    <div className="field col-12">
                        <label htmlFor="role">Role</label>
                        <Dropdown value={roleValue} options={role} optionLabel="name" onChange={e => setUser(prevState => ({ ...prevState, role: e.target.value.code }))} />
                    </div>
                </div>

                <div className="flex justify-content-end">
                    <Button label="Submit" type="submit" />
                </div>
            </form>
        </div>
    );
};

export default CreateUsers;
