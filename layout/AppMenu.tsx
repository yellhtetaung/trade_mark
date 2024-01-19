/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '../types/types';

import { axiosInstance } from '../utils/axiosInstance';
import { useSession } from 'next-auth/react';

const AppMenu = () => {
    const [role, setRole] = useState<'Admin' | 'User' | null>(null);

    const { data } = useSession();

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

    useEffect(() => {
        if (data?.user) {
            // @ts-ignore
            setRole(data.user.role);
        }
    }, [data?.user]);

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
