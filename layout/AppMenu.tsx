/* eslint-disable @next/next/no-img-element */

import React, { useContext, useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '../types/types';

import Cookies from 'js-cookie';
import { axiosInstance } from '../axiosInstance';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [role, setRole] = useState<'Admin' | 'User' | null>(null);

    const authentication = async () => {
        try {
            if (window.sessionStorage.getItem('token')) {
                const token = JSON.parse(window.sessionStorage.getItem('token') as string);

                if (token) {
                    const response = await axiosInstance.get('/api/auth/verify', {
                        headers: {
                            'Authorization': token,
                        },
                    });
                    const data = response.data;

                    if (data) {
                        setRole(data.message);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        authentication();
    }, []);

    const adminModel: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Search Image', icon: 'pi pi-fw pi-images', to: '/' }],
        },
        {
            label: 'User',
            items: [
                {
                    label: 'Create Users',
                    icon: 'pi pi-fw pi-user',
                    to: '/users/create-users',
                },
                {
                    label: 'User Lists',
                    icon: 'pi pi-fw pi-users',
                    to: '/users',
                },
            ],
        },
        {
            label: 'Trade Mark',
            items: [
                { label: 'Create Trade Mark', icon: 'pi pi-fw pi-image', to: '/trade-mark/create-trade-mark' },
                { label: 'Trade Mark List', icon: 'pi pi-fw pi-image', to: '/trade-mark' },
            ],
        },
    ];

    const userModel: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Search Image', icon: 'pi pi-fw pi-images', to: '/' }],
        },
        {
            label: 'Trade Mark',
            items: [{ label: 'Trade Mark List', icon: 'pi pi-fw pi-image', to: '/trade-mark' }],
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {role === 'Admin' &&
                    adminModel.map((item, i) => {
                        return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                    })}

                {role === 'User' &&
                    userModel.map((item, i) => {
                        return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                    })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
