'use client';

import React, { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';

import { TradeMark } from '../../../../types/types';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { axiosInstance } from '../../../../axiosInstance';

const SearchRecord = () => {
    const [data, setData] = useState<TradeMark[] | undefined>();
    const [totalData, setTotalData] = useState<number>(0);

    const [rows, setRows] = useState<number>(10);
    const [first, setFirst] = useState<number>(0);
    const [page, setPage] = useState<number>(0);

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

    const imageBodyTemplate = (data: string) => <Image src={data} width={80} height={50} alt={data} className="shadow-2 border-round" objectFit="contain" />;

    const dateBodyTemplate = (data: Date) => <time suppressHydrationWarning={true}>{data.toLocaleDateString()}</time>;

    const customTemplate = (data: TradeMark, column: ColumnBodyOptions) => {
        const value = data[column.field as keyof TradeMark];

        if (value === undefined) {
            return <p>No data available</p>;
        } else if (typeof value === 'object') {
            return dateBodyTemplate(value as Date);
        } else if (value === data.trademark_sample) {
            return imageBodyTemplate(`http://192.168.1.5:8000/${data.trademark_sample}`);
        } else {
            return <span>{value as string}</span>;
        }
    };

    const renderHeader = () => {
        return (
            <div className="md:flex justify-content-between">
                <div className="flex flex-wrap gap-5">
                    <InputText placeholder="Name / Trade Mark" />
                    <InputText placeholder="Applicant" />
                    <Calendar dateFormat="mm/dd/yy" showIcon={true} placeholder="Register Date" />
                    <div className="flex justify-content-end align-items-center">
                        <Button label="Search" icon="pi pi-fw pi-search" />
                    </div>
                </div>

                <div className="flex align-items-center gap-3">
                    <Button icon="pi pi-fw pi-print" rounded={true} />
                    <Button icon="pi pi-fw pi-file-export" rounded={true} severity="warning" />
                </div>
            </div>
        );
    };

    const fetchTradeMark = useCallback(async (page: number, pageSize: number) => {
        try {
            // Make a GET request to the '/api/users' endpoint with the page, pageSize, sortField, and sortOrder as query parameters
            const response = await axiosInstance.get('/api/trade-mark', { params: { page, pageSize } });
            const { data: tradeMark, totalTradeMark } = response.data;

            console.log(tradeMark);

            // Update the state with the fetched users and total number of users
            setData(tradeMark);
            setTotalData(totalTradeMark);
        } catch (error) {
            // Log any errors that occur during the API request
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchTradeMark(page, rows);
    }, [fetchTradeMark, page, rows]);

    return (
        <div>
            <h1 className="text-4xl font-bold">Search Record</h1>

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
