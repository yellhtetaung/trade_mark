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
    id?: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    nrc: string;
    address: string;
    active?: boolean;
}

export type SubmittionType = {
    Mark: boolean;
    OldMark: boolean;
    ReRegistration: boolean;
};

export interface TradeMark {
    id?: number | undefined;
    trademark: string | undefined;
    trademark_sample: File | string | undefined;
    applicant: string | undefined;
    address: string | undefined;
    classes: string | undefined;
    goods_services: string | undefined;
    no_ent_reg_cer: string | undefined;
    nonlatin_char_trans: string | undefined;
    trans_mean: string | undefined;
    color_claim: string | undefined;
    re_filling_date: Date | undefined;
    re_filling_WIPO_no: string | undefined;
    app_no: string | undefined;
    off_fill_date: Date | undefined;
    payment_WIPO_no: string | undefined;
    other_procedure: string | undefined;
    granting_date: Date | undefined;
    reg_no: string | undefined;
    time_renewal: string | undefined;
    renewal_date: Date | undefined;
    renewal_no: string | undefined;
    val_period: Date | undefined;
    date_of_public: Date | undefined;
    exp_date: Date | undefined;
    reason_exp: string | undefined;
    tm2: string | undefined;
    submittion_type: SubmittionType;
}

export type ChangeHandler = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export interface Category {
    name: string;
    key: string;
}
