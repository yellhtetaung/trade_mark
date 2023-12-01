'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { ChangeHandler, SubmittionType, TradeMark } from '../../../../types/types';
import { axiosInstance } from '../../../../axiosInstance';
import { Skeleton } from 'primereact/skeleton';
import { Tag } from 'primereact/tag';

interface SearchValue {
    trademark?: string;
    applicant?: string;
    created_at?: Date | undefined;
}

type FilteredValue = 'trademark' | 'applicant' | 'created_at' | 'null';

const SearchRecord = () => {
    const router = useRouter();
    const [data, setData] = useState<TradeMark[] | undefined>();
    const [totalData, setTotalData] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toastRef = useRef<any | null>(null);

    const [rows, setRows] = useState<number>(10);
    const [first, setFirst] = useState<number>(0);
    const [page, setPage] = useState<number>(0);

    const [searchField, setSearchField] = useState<string | Date | undefined>('');
    const [filteredValue, setFilteredValue] = useState<FilteredValue>('null');

    const column = [
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
        { field: 'tm2', header: 'TM 2' },
        { field: 'submittion_type', header: 'Submittion Type' },
    ];

    const imageBodyTemplate = (data: string) => <Image src={data} width={80} height={50} alt={data} className="shadow-2 border-round" quality={75} priority={true} />;

    const dateBodyTemplate = (data: Date) => <time suppressHydrationWarning={true}>{new Intl.DateTimeFormat(['en-US', 'id']).format(data)}</time>;

    const submittionTypeTemplate = (data: SubmittionType) => {
        const submittionTypes: { [key: string]: string } = {
            Mark: 'Mark',
            OldMark: 'Old-Mark',
            ReRegistration: 'Re-Registration',
        };

        return Object.keys(data)
            .filter(value => data[value as keyof SubmittionType] && submittionTypes[value])
            .map(value => (
                <Tag key={value} className="mx-1" severity="info">
                    {submittionTypes[value]}
                </Tag>
            ));
    };

    const customTemplate = (data: TradeMark, column: ColumnBodyOptions) => {
        const value = data[column.field as keyof TradeMark];

        if (value === undefined) {
            return <p>No data available</p>;
        }

        if (value instanceof Date) {
            return dateBodyTemplate(value as Date);
        }

        if (typeof value === 'object') {
            const { Mark, OldMark, ReRegistration } = value;

            if (Mark === false && OldMark === false && ReRegistration === false) {
                return <span>No Data</span>;
            }

            return submittionTypeTemplate(value as SubmittionType);
        }

        if (value === data.trademark_sample) {
            return imageBodyTemplate(`http://192.168.100.29:8000/${data.trademark_sample}`);
        }

        return <span>{value as string}</span>;
    };

    const onFilterHandler = useCallback(async (page: number, pageSize: number, searchField: string | Date | undefined, filteredValue: FilteredValue) => {
        setIsLoading(true);
        try {
            // Make a GET request to the '/api/users/search' endpoint
            const response = await axiosInstance.get('/api/trade-mark/search', {
                params: {
                    page,
                    pageSize,
                    searchField:
                        typeof searchField === 'object' && searchField instanceof Date
                            ? searchField.toLocaleDateString() // create a new Date object for the timestamp
                            : searchField,
                    filteredValue,
                },
            });
            const { data: trademark, totalTradeMark } = response.data;

            // Update the users state with the retrieved user data
            setData(trademark);

            // Update the totalRecord state with the total number of users
            setTotalData(totalTradeMark);

            setIsLoading(false);
        } catch (error: any) {
            // Handle any errors that occur during the API request
            setData(undefined);

            // Show an error toast notification with the error message
            toastRef.current.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response.data.message,
                life: 3000,
            });
        }
    }, []);

    console.log(searchField);

    const dataTableHeader: React.FC = () => {
        const dropdownOptions = [
            { name: 'Select Field', code: 'null' },
            { name: 'name/trademark', code: 'trademark' },
            { name: 'applicant', code: 'applicant' },
            { name: 'register date', code: 'created_at' },
        ];

        const value = dropdownOptions.find(dropdown => dropdown.code === filteredValue);

        return (
            <div className="flex gap-3">
                <Dropdown
                    value={value}
                    options={dropdownOptions}
                    optionLabel="name"
                    onChange={e => {
                        setFilteredValue(e.value.code);
                    }}
                />
                {filteredValue === 'created_at' && (
                    <Calendar
                        id="search"
                        name="search"
                        value={searchField}
                        onChange={e => {
                            if (e.target.value === '') {
                                setPage(0);
                                setFirst(0);
                            }

                            setSearchField(e.target.value as Date);
                        }}
                        showIcon
                        placeholder="Search Date"
                    />
                )}
                {filteredValue !== 'created_at' && (
                    <InputText
                        id="search"
                        name="search"
                        onChange={e => {
                            if (e.target.value === '') {
                                setPage(0);
                                setFirst(0);
                            }

                            e.target.value !== '' && setPage(0);
                            setSearchField(e.target.value);
                        }}
                        type="search"
                        placeholder="Search..."
                    />
                )}
                <Button label="Search" icon="pi pi-search" onClick={() => onFilterHandler(page, rows, searchField, filteredValue)} />
                <Button
                    label="Clear"
                    icon="pi pi-filter-slash"
                    severity="danger"
                    onClick={() => {
                        if (filteredValue !== 'null' || searchField !== '') {
                            setFilteredValue('null');
                            setPage(0);
                            setFirst(0);
                            setSearchField('');
                        }
                    }}
                />
            </div>
        );
    };

    const fetchTradeMark = useCallback(async (page: number, pageSize: number) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/api/trade-mark', { params: { page, pageSize } });
            const { data: tradeMarks, totalTradeMark } = response.data;

            const newTradeMark = tradeMarks.map(({ re_filling_date, off_fill_date, granting_date, renewal_date, val_period, date_of_public, exp_date, ...tradeMark }: TradeMark) => ({
                ...tradeMark,
                re_filling_date: re_filling_date && new Date(re_filling_date),
                off_fill_date: off_fill_date && new Date(off_fill_date),
                granting_date: granting_date && new Date(granting_date),
                renewal_date: renewal_date && new Date(renewal_date),
                val_period: val_period && new Date(val_period),
                date_of_public: date_of_public && new Date(date_of_public),
                exp_date: exp_date && new Date(exp_date),
            }));

            setData(newTradeMark);
            setTotalData(totalTradeMark);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useLayoutEffect(() => {
        // Memoize the fetchUsers and onFilterHandler functions

        if (searchField === '' && filteredValue === 'null') {
            fetchTradeMark(page, rows).catch(error => console.log(error));
        }

        // Call the memoized function
    }, [fetchTradeMark, page, rows, searchField, filteredValue]);

    useEffect(() => {
        router.prefetch('/trade-mark/create-trade-mark/[slug]');
    }, [router]);

    return (
        <div>
            <Toast ref={toastRef} />
            <h1 className="text-4xl font-bold">Search Record</h1>

            <div className="card">
                <DataTable
                    value={data}
                    rows={rows}
                    first={first}
                    totalRecords={totalData}
                    rowsPerPageOptions={[10, 30, 50, 100]}
                    lazy={true}
                    paginator={true}
                    tableStyle={{ minWidth: '400rem' }}
                    header={dataTableHeader}
                    showGridlines={true}
                    onPage={e => {
                        setFirst(e.first);
                        setRows(e.rows);
                        setPage(e.page as number);
                    }}
                    editMode="row"
                    sortMode="multiple"
                    removableSort
                    onRowEditChange={e => router.push(`/trade-mark/create-trade-mark/${e.data[0].id}`)}
                >
                    <Column rowEditor />
                    <Column field="id" header="ID" alignHeader="center" align="center" body={(_, context) => (!isLoading ? context.rowIndex + 1 : <Skeleton />)} />
                    {column.map((col, index) => (
                        <Column alignHeader="center" align="center" field={col.field} key={index} header={col.header} body={(rowData, column) => (!isLoading ? customTemplate(rowData, column) : <Skeleton />)} />
                    ))}
                </DataTable>
            </div>
        </div>
    );
};

export default SearchRecord;
