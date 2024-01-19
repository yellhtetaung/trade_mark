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
    AppMenuItem,
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
    AppMenuItem,
};

export interface User {
    id?: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    nrc: string;
    address: string;
    active?: boolean;
    role?: string;
}

export type SubmittionType = {
    Mark: boolean;
    OldMark: boolean;
    ReRegistration: boolean;
};

export interface TradeMark {
    id?: number | undefined;
    trademark: string;
    trademark_sample?: File | string;
    applicant?: string;
    address?: string;
    classes?: string;
    goods_services?: string;
    no_ent_reg_cer?: string;
    nonlatin_char_trans?: string;
    trans_mean?: string;
    color_claim?: string;
    supporting_docs?: string;
    re_filling_date?: Date;
    re_filling_WIPO_no?: string;
    app_no?: string;
    off_fill_date?: Date;
    payment_WIPO_no?: string;
    other_procedure?: string;
    granting_date?: Date;
    reg_no?: string;
    time_renewal?: string;
    renewal_date?: Date;
    renewal_no?: string;
    val_period?: Date;
    date_of_public?: Date;
    exp_date?: Date;
    reason_exp?: string;
    tm2?: string;
    submittion_type: SubmittionType;
    created_at?: Date;
    attachment?: File | string;
}

export type ChangeHandler = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export interface Category {
    name: string;
    key: string;
}
