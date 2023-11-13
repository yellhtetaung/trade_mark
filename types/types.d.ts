import React, { ReactNode } from 'react';
import {
    Page,
    AppBreadcrumbProps,
    Breadcrumb,
    BreadcrumbItem,
    MenuProps,
    MenuModel,
    AppSubMenuProps,
    LayoutConfig,
    LayoutState,
    AppBreadcrumbState,
    Breadcrumb,
    LayoutContextProps,
    MailContextProps,
    MenuContextProps,
    ChatContextProps,
    TaskContextProps,
    AppConfigProps,
    NodeRef,
    AppTopbarRef,
    MenuModelItem,
    AppMenuItemProps,
    AppMenuItem
} from './layout';
import { Demo, LayoutType, SortOrderType, CustomEvent, ChartDataState, ChartOptionsState, AppMailSidebarItem, AppMailReplyProps, AppMailProps } from './demo';

type ChildContainerProps = {
    children: ReactNode;
};

export type {
    Page,
    AppBreadcrumbProps,
    Breadcrumb,
    BreadcrumbItem,
    MenuProps,
    MenuModel,
    LayoutConfig,
    LayoutState,
    Breadcrumb,
    LayoutContextProps,
    MailContextProps,
    MenuContextProps,
    ChatContextProps,
    TaskContextProps,
    AppConfigProps,
    NodeRef,
    AppTopbarRef,
    AppMenuItemProps,
    ChildContainerProps,
    Demo,
    LayoutType,
    SortOrderType,
    CustomEvent,
    ChartDataState,
    ChartOptionsState,
    AppMailSidebarItem,
    AppMailReplyProps,
    AppMailProps,
    AppMenuItem
};

export interface User {
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    nrc: string;
    address: string;
}

export interface TradeMark {
    id?: number | null;
    trademark: string | null;
    trademark_sample: string | null;
    applicant: string | null;
    address: string | null;
    classes: string | null;
    goods_services: string | null;
    no_ent_reg_cer: string | null;
    nonlatin_char_trans: string | null;
    trans_mean: string | null;
    color_claim: string | null;
    re_filling_date: Date | null;
    re_filling_WIPO_no: string | null;
    app_no: string | null;
    off_fill_date: Date | null;
    payment_WIPO_no: string | null;
    other_procedure: string | null;
    granting_date: Date | null;
    reg_no: string | null;
    time_renewal: string | null;
    renewal_date: Date | null;
    renewal_no: string | null;
    val_period: Date | null;
    date_of_public: Date | null;
    exp_date: Date | null;
    reason_exp: string | null;
    tm2: string | null;
}

export type ChangeHandler = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
