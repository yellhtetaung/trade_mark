/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import { AppMenuItem } from '../types/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'User',
            items: [
                {
                    label: 'Create Users',
                    icon: 'pi pi-fw pi-user',
                    to: '/users/create-users'
                },
                {
                    label: 'User Lists',
                    icon: 'pi pi-fw pi-users',
                    to: '/users'
                }
            ]
        },
        {
            label: 'Trade Mark',
            items: [{ label: 'Create Trade Mark', icon: 'pi pi-fw pi-image', to: '/trade-mark/create-trade-mark' }]
        },
        {
            label: 'Record',
            items: [{ label: 'Search Record Form', icon: 'pi pi-fw pi-search', to: '/record/search-record' }]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
