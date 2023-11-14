'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';

import { TradeMark } from '../../../../../types/types';
import { Button } from 'primereact/button';

const SearchRecord = () => {
    const router = useRouter();
    const [data, setData] = useState<TradeMark[]>([
        {
            id: 1,
            trademark: 'bravo',
            trademark_sample: 'https://www.echolive.ie/cms_media/module_img/6380/3190244_3_articlesmall_iStock-1368434985_1_.jpg',
            applicant: 'MA HOA TRADING COMPANY LIMITED',
            address: 'No.118 Lo Sieu Stree, Ward 12, District 11, Ho Chi Minh City',
            classes: '34',
            goods_services: 'Cigarette',
            no_ent_reg_cer: '0301127602',
            nonlatin_char_trans: undefined,
            trans_mean: undefined,
            color_claim: undefined,
            re_filling_date: new Date(),
            re_filling_WIPO_no: 'WTF2020000687',
            app_no: 'T/2020/02097',
            off_fill_date: new Date(),
            payment_WIPO_no: 'WFU20235425',
            other_procedure: undefined,
            granting_date: new Date(),
            reg_no: undefined,
            time_renewal: undefined,
            renewal_date: new Date(),
            renewal_no: undefined,
            val_period: new Date(),
            date_of_public: new Date(),
            exp_date: new Date(),
            reason_exp: undefined,
            tm2: undefined
        },
        {
            id: 2,
            trademark: 'bravo',
            trademark_sample: 'https://www.echolive.ie/cms_media/module_img/6380/3190244_3_articlesmall_iStock-1368434985_1_.jpg',
            applicant: 'MA HOA TRADING COMPANY LIMITED',
            address: 'No.118 Lo Sieu Stree, Ward 12, District 11, Ho Chi Minh City',
            classes: '34',
            goods_services: 'Cigarette',
            no_ent_reg_cer: '0301127602',
            nonlatin_char_trans: undefined,
            trans_mean: undefined,
            color_claim: undefined,
            re_filling_date: new Date(),
            re_filling_WIPO_no: 'WTF2020000687',
            app_no: 'T/2020/02097',
            off_fill_date: new Date(),
            payment_WIPO_no: 'WFU20235425',
            other_procedure: undefined,
            granting_date: new Date(),
            reg_no: undefined,
            time_renewal: undefined,
            renewal_date: new Date(),
            renewal_no: undefined,
            val_period: new Date(),
            date_of_public: new Date(),
            exp_date: new Date(),
            reason_exp: undefined,
            tm2: undefined
        },
        {
            id: 3,
            trademark: 'bravo',
            trademark_sample: 'https://www.echolive.ie/cms_media/module_img/6380/3190244_3_articlesmall_iStock-1368434985_1_.jpg',
            applicant: 'MA HOA TRADING COMPANY LIMITED',
            address: 'No.118 Lo Sieu Stree, Ward 12, District 11, Ho Chi Minh City',
            classes: '34',
            goods_services: 'Cigarette',
            no_ent_reg_cer: '0301127602',
            nonlatin_char_trans: undefined,
            trans_mean: undefined,
            color_claim: undefined,
            re_filling_date: new Date(),
            re_filling_WIPO_no: 'WTF2020000687',
            app_no: 'T/2020/02097',
            off_fill_date: new Date(),
            payment_WIPO_no: 'WFU20235425',
            other_procedure: undefined,
            granting_date: new Date(),
            reg_no: undefined,
            time_renewal: undefined,
            renewal_date: new Date(),
            renewal_no: undefined,
            val_period: new Date(),
            date_of_public: new Date(),
            exp_date: new Date(),
            reason_exp: undefined,
            tm2: undefined
        },
        {
            id: 4,
            trademark: 'bravo',
            trademark_sample: 'https://www.echolive.ie/cms_media/module_img/6380/3190244_3_articlesmall_iStock-1368434985_1_.jpg',
            applicant: 'MA HOA TRADING COMPANY LIMITED',
            address: 'No.118 Lo Sieu Stree, Ward 12, District 11, Ho Chi Minh City',
            classes: '34',
            goods_services: 'Cigarette',
            no_ent_reg_cer: '0301127602',
            nonlatin_char_trans: undefined,
            trans_mean: undefined,
            color_claim: undefined,
            re_filling_date: new Date(),
            re_filling_WIPO_no: 'WTF2020000687',
            app_no: 'T/2020/02097',
            off_fill_date: new Date(),
            payment_WIPO_no: 'WFU20235425',
            other_procedure: undefined,
            granting_date: new Date(),
            reg_no: undefined,
            time_renewal: undefined,
            renewal_date: new Date(),
            renewal_no: undefined,
            val_period: new Date(),
            date_of_public: new Date(),
            exp_date: new Date(),
            reason_exp: undefined,
            tm2: undefined
        }
    ]);

    const column = [
        { field: 'id', header: 'ID' },
        { field: 'trademark', header: 'Trade Mark' },
        { field: 'trademark_sample', header: 'Trade Mark Sample' },
        { field: 'applicant', header: 'Applicant' },
        { field: 'address', header: 'Address' },
        { field: 'classes', header: 'Classes' },
        { field: 'goods_services', header: 'Goods/Service' },
        { field: 'no_ent_reg_cer', header: 'Number of Entriprise Registration Certificate' },
        { field: 'nonlatin_char_trans', header: 'Non-Latin Characters and Transliteration' },
        { field: 'trans_mean', header: 'Translation / Meaning' },
        { field: 'color_claim', header: 'Color Claim' },
        { field: 're_filling_date', header: 'Re-Filling Date' },
        { field: 're_filling_WIPO_no', header: 'Re-Filling WIPO No' },
        { field: 'app_no', header: 'App No' },
        { field: 'off_fill_date', header: 'Offical Filling Date' },
        { field: 'payment_WIPO_no', header: 'Payment WIPO No' },
        { field: 'other_procedure', header: 'Other Procedure' },
        { field: 'granting_date', header: 'Granting Date' },
        { field: 'reg_no', header: 'Reg No' },
        { field: 'time_renewal', header: 'Time Renewal' },
        { field: 'renewal_date', header: 'Renewal Date' },
        { field: 'renewal_no', header: 'Renewal Date' },
        { field: 'val_period', header: 'Validity Period' },
        { field: 'date_of_public', header: 'Date of publication' },
        { field: 'exp_date', header: 'Expiration Date' },
        { field: 'reason_exp', header: 'Reason Expires' },
        { field: 'tm2', header: 'TM 2' }
    ];

    const imageBodyTemplate = (data: string) => <Image src={data} width={80} height={50} alt={data} className="shadow-2 border-round" />;

    const dateBodyTemplate = (data: Date) => <time suppressHydrationWarning={true}>{data.toLocaleDateString()}</time>;

    const customTemplate = (data: TradeMark, column: ColumnBodyOptions) => {
        const value = data[column.field as keyof TradeMark];

        if (value === undefined) {
            return <p>No data available</p>;
        } else if (typeof value === 'object') {
            return dateBodyTemplate(value);
        } else if (value === data.trademark_sample) {
            return imageBodyTemplate(data.trademark_sample);
        } else {
            return <span>{value}</span>;
        }
    };

    const renderHeader = () => {
        return (
            <div className="md:flex justify-content-end">
                <div className="flex align-items-center gap-3">
                    <Button icon="pi pi-fw pi-print" rounded={true} />
                    <Button icon="pi pi-fw pi-file-export" rounded={true} severity="warning" />
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="flex align-items-center gap-4 mb-5">
                <Button icon="pi pi-fw pi-arrow-left" rounded={true} onClick={() => router.back()} />
                <span className="text-4xl font-bold">Result Images</span>
            </div>

            <div className="card">
                <DataTable value={data} tableStyle={{ minWidth: '300rem' }} header={renderHeader} showGridlines={true}>
                    {column.map((col, index) => (
                        <Column field={col.field} key={index} header={col.header} body={(rowData, column) => customTemplate(rowData, column)} />
                    ))}
                </DataTable>
            </div>
        </div>
    );
};

export default SearchRecord;
