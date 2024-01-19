'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { SubmittionType, TradeMark } from '../../../types/types';
import { axiosInstance } from '../../../axiosInstance';
import { Skeleton } from 'primereact/skeleton';
import { Tag } from 'primereact/tag';

type FilteredValue = 'trademark' | 'applicant' | 'created_at' | 'submittion_type' | 'null';

interface SearchDate {
    start_date: Date;
    end_date: Date;
}

const TradeMarkList = () => {
    const router = useRouter();
    const [data, setData] = useState<TradeMark[] | undefined>();
    const [totalData, setTotalData] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const toastRef = useRef<any | null>(null);
    const datatableRef = useRef<DataTable<any>>(null);
    const [role, setRole] = useState<'Admin' | 'User' | null>();

    const [rows, setRows] = useState<number>(10);
    const [first, setFirst] = useState<number>(0);
    const [page, setPage] = useState<number>(0);

    const [searchField, setSearchField] = useState<string | undefined>('');
    const [searchDate, setSearchDate] = useState<SearchDate>({
        start_date: new Date(),
        end_date: new Date(),
    });

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
        { field: 'attachment', header: 'Atachment' },
    ];

    const imageBodyTemplate = (data: string) => <Image src={data} width={80} height={50} alt={data} className="shadow-2 border-round" quality={75} priority={true} />;

    const dateBodyTemplate = (data: Date) => <time suppressHydrationWarning={true}>{data.toLocaleDateString()}</time>;

    const submittionTypeTemplate = (data: SubmittionType) => {
        const submittionTypes: { [key: string]: string } = {
            Mark: 'Mark',
            OldMark: 'Old-Mark',
            ReRegistration: 'Re-Registration',
        };

        const tags: JSX.Element[] = [];

        for (const value in data) {
            if (data[value as keyof SubmittionType] && submittionTypes[value]) {
                tags.push(
                    <Tag key={value} className="mx-1" severity="success">
                        {submittionTypes[value]}
                    </Tag>,
                );
            }
        }

        return tags;
    };

    const customTemplate = (data: TradeMark, column: ColumnBodyOptions) => {
        const value = data[column.field as keyof TradeMark];

        if (value === undefined) {
            return <p>No data available</p>;
        }

        if (value instanceof Date) {
            return dateBodyTemplate(value as Date);
        }

        if (typeof value === 'object' && value !== null) {
            const { Mark, OldMark, ReRegistration } = value;

            if (Mark === false && OldMark === false && ReRegistration === false) {
                return <span>No Data</span>;
            }
            return submittionTypeTemplate(value as SubmittionType);
        }

        if (value === data.trademark_sample) {
            return imageBodyTemplate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/trademark_sample/${data.trademark_sample}`);
        }

        if (value === data.attachment) {
            if (data.attachment === 'undefined') {
                return <span>No Data</span>;
            }

            return (
                <a href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/attachment/${value}`} target="_blank">
                    Download
                </a>
            );
        }

        return <span>{value as string}</span>;
    };

    const onFilterHandler = useCallback(async (page: number, pageSize: number, searchField: string | undefined | SearchDate, filteredValue: FilteredValue) => {
        setIsLoading(true);
        try {
            // Make a GET request to the '/api/users/search' endpoint
            const response = await axiosInstance.get('/api/trade-mark/search', {
                params: {
                    page,
                    pageSize,
                    searchField:
                        typeof searchField === 'object' && searchField.start_date instanceof Date && searchField.end_date instanceof Date
                            ? { start_date: searchField.start_date.toLocaleDateString(), end_date: searchField.end_date.toLocaleDateString() } // create a new Date object for the timestamp
                            : searchField,
                    filteredValue,
                },
            });
            const { data: tradeMarks, totalTradeMark } = response.data;

            const newTradeMark = tradeMarks.map(({ re_filling_date, off_fill_date, granting_date, renewal_date, val_period, date_of_public, exp_date, created_at, ...tradeMark }: TradeMark) => ({
                ...tradeMark,
                re_filling_date: re_filling_date && new Date(re_filling_date),
                off_fill_date: off_fill_date && new Date(off_fill_date),
                granting_date: granting_date && new Date(granting_date),
                renewal_date: renewal_date && new Date(renewal_date),
                val_period: val_period && new Date(val_period),
                date_of_public: date_of_public && new Date(date_of_public),
                exp_date: exp_date && new Date(exp_date),
                created_at: created_at && new Date(created_at),
            }));

            // Update the users state with the retrieved user data
            setData(newTradeMark);

            // Update the totalRecord state with the total number of users
            setTotalData(totalTradeMark);

            setIsLoading(false);
        } catch (error: any) {
            // Handle any errors that occur during the API request
            setData(undefined);

            console.log(error);

            // Show an error toast notification with the error message
            toastRef.current.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response?.data.message,
                life: 3000,
            });
        }
    }, []);

    const exportCSV = (selectionOnly: boolean) => {
        datatableRef.current?.exportCSV({ selectionOnly });
    };

    const exportExcel = () => {
        import('xlsx').then(async xlsx => {
            try {
                const response = await axiosInstance.get('/api/trade-mark');
                const { data: trademarks } = response.data;

                const submittionTypeValue = (data: SubmittionType) => {
                    const submittionTypes: { [key: string]: string } = {
                        Mark: 'Mark',
                        OldMark: 'Old-Mark',
                        ReRegistration: 'Re-Registration',
                    };

                    let result: string = '';

                    for (const value in data) {
                        if (data[value as keyof SubmittionType] && submittionTypes[value]) {
                            result += submittionTypes[value] + ', ';
                        }
                    }

                    return result;
                };

                const newTradeMark = trademarks.map((tm: TradeMark) => ({
                    id: tm?.id,
                    trademark: tm?.trademark,
                    applicant: tm?.applicant,
                    address: tm?.address,
                    classes: tm?.classes,
                    goods_services: tm?.goods_services,
                    no_ent_reg_cer: tm?.no_ent_reg_cer,
                    nonlatin_char_trans: tm?.nonlatin_char_trans,
                    trans_mean: tm?.trans_mean,
                    color_claim: tm?.color_claim,
                    re_filling_date: tm.re_filling_date && new Date(tm.re_filling_date).toLocaleDateString(),
                    re_filling_WIPO_no: tm?.re_filling_WIPO_no,
                    app_no: tm?.app_no,
                    off_fill_date: tm.off_fill_date && new Date(tm.off_fill_date).toLocaleDateString(),
                    payment_WIPO_no: tm?.payment_WIPO_no,
                    other_procedure: tm?.other_procedure,
                    granting_date: tm.granting_date && new Date(tm.granting_date).toLocaleDateString(),
                    reg_no: tm?.reg_no,
                    time_renewal: tm?.time_renewal,
                    renewal_date: tm.renewal_date && new Date(tm.renewal_date).toLocaleDateString(),
                    renewal_no: tm?.renewal_no,
                    val_period: tm.val_period && new Date(tm.val_period).toLocaleDateString(),
                    date_of_public: tm.date_of_public && new Date(tm.date_of_public).toLocaleDateString(),
                    exp_date: tm.exp_date && new Date(tm.exp_date).toLocaleDateString(),
                    reason_exp: tm?.reason_exp,
                    tm2: tm?.tm2,
                    submittion_type: tm.submittion_type && submittionTypeValue(tm.submittion_type),
                    created_at: tm.created_at && new Date(tm.created_at).toLocaleDateString(),
                }));

                const worksheet = xlsx.utils.json_to_sheet(newTradeMark);
                const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
                const excelBuffer = xlsx.write(workbook, {
                    bookType: 'xlsx',
                    type: 'array',
                });

                saveAsExcelFile(excelBuffer, 'trademark');
            } catch (error) {
                console.log(error);
            }
        });
    };

    const saveAsExcelFile = (buffer: any, fileName: string) => {
        import('file-saver').then(module => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE,
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

    const dataTableHeader: React.FC = () => {
        const dropdownOptions = [
            { name: 'Select Field', code: 'null' },
            { name: 'Name/Trade Mark', code: 'trademark' },
            { name: 'Applicant', code: 'applicant' },
            { name: 'Register Date', code: 'created_at' },
            { name: 'Submittion Type', code: 'submittion_type' },
        ];

        const submittionDropdownOptions = [
            { name: 'Mark', code: 'Mark' },
            { name: 'Old-Mark', code: 'OldMark' },
            { name: 'Re-Registration', code: 'ReRegistration' },
        ];

        let submittionValue;

        if (filteredValue === 'submittion_type') {
            submittionValue = submittionDropdownOptions.find(value => value.code === searchField);
        }

        const value = dropdownOptions.find(dropdown => dropdown.code === filteredValue);

        return (
            <div className="flex flex-wrap gap-3">
                <Dropdown
                    value={value}
                    options={dropdownOptions}
                    optionLabel="name"
                    onChange={e => {
                        setFilteredValue(e.value.code);
                        setSearchField('');
                    }}
                />
                {filteredValue === 'created_at' && (
                    <div className="flex gap-3">
                        <Calendar
                            id="start_date"
                            name="start_date"
                            value={searchDate.start_date}
                            onChange={e => {
                                if (e.target.value === '') {
                                    setPage(0);
                                    setFirst(0);
                                }

                                setSearchDate((prevState: SearchDate) => ({ ...prevState, start_date: e.target.value as Date }));
                            }}
                            showIcon
                            placeholder="Start Date"
                        />

                        <Calendar
                            id="end_date"
                            name="end_date"
                            value={searchDate.end_date}
                            onChange={e => {
                                if (e.target.value === '') {
                                    setPage(0);
                                    setFirst(0);
                                }

                                setSearchDate((prevState: SearchDate) => ({
                                    ...prevState,
                                    end_date: e.target.value as Date,
                                }));
                            }}
                            showIcon
                            placeholder="End Date"
                            minDate={searchDate.start_date}
                        />
                    </div>
                )}
                {filteredValue === 'submittion_type' && (
                    <Dropdown
                        value={submittionValue}
                        options={submittionDropdownOptions}
                        optionLabel="name"
                        placeholder="Choose"
                        onChange={e => {
                            setSearchField(e.target.value.code);
                        }}
                    />
                )}
                {filteredValue !== 'created_at' && filteredValue !== 'submittion_type' && (
                    <InputText
                        id="search"
                        name="search"
                        value={searchField as string}
                        onChange={e => {
                            if (e.target.value === '') {
                                setPage(0);
                                setFirst(0);
                            }

                            e.target.value !== '' && setPage(0);
                            setSearchField(e.target.value);
                        }}
                        placeholder="Search..."
                    />
                )}
                <Button
                    label="Search"
                    icon="pi pi-search"
                    onClick={() => {
                        if (filteredValue !== 'created_at' || searchField !== '') {
                            onFilterHandler(page, rows, searchField, filteredValue);
                        }

                        if (filteredValue === 'created_at') {
                            onFilterHandler(page, rows, searchDate, filteredValue);
                        }
                    }}
                />
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

                <div className="ml-auto">
                    <div className="flex align-items-center justify-content-end gap-2">
                        <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
                        <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                    </div>
                </div>
            </div>
        );
    };

    const fetchTradeMark = async (page: number, pageSize: number) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/api/trade-mark', { params: { page, pageSize } });
            const { data: tradeMarks, totalTradeMark } = response.data;

            const newTradeMark = tradeMarks.map(({ re_filling_date, off_fill_date, granting_date, renewal_date, val_period, date_of_public, exp_date, created_at, ...tradeMark }: TradeMark) => ({
                ...tradeMark,
                re_filling_date: re_filling_date && new Date(re_filling_date),
                off_fill_date: off_fill_date && new Date(off_fill_date),
                granting_date: granting_date && new Date(granting_date),
                renewal_date: renewal_date && new Date(renewal_date),
                val_period: val_period && new Date(val_period),
                date_of_public: date_of_public && new Date(date_of_public),
                exp_date: exp_date && new Date(exp_date),
                created_at: created_at && new Date(created_at),
            }));

            setData(newTradeMark);
            setTotalData(totalTradeMark);
            setIsLoading(false);
        } catch (error) {
            if (page > 0) {
                setPage(page - 1);
            }
            setData(undefined);
            setIsLoading(false);
            console.log(error);
        }
    };

    const deleteHandler = async (id: number) => {
        try {
            const res = await axiosInstance.delete(`/api/trade-mark/${id}`);
            const data = res.data;

            if (res.status === 200) {
                toastRef.current.show({ severity: 'success', summary: 'Delete', detail: data.message, life: 3000 });
                fetchTradeMark(page, rows);
            }
        } catch (error: any) {
            toastRef.current.show({ severity: 'error', summary: 'Error', detail: error.response.data.message, life: 3000 });
        }
    };

    useLayoutEffect(() => {
        // Memoize the fetchUsers and onFilterHandler functions

        if (searchField === '' && filteredValue === 'null') {
            fetchTradeMark(page, rows);
        }

        // Call the memoized function
    }, [page, rows, searchField, filteredValue]);

    useEffect(() => {
        router.prefetch('/trade-mark/create-trade-mark/[slug]');
    }, [router]);

    const authentication = async () => {
        try {
            if (window.localStorage.getItem('token')) {
                const token = JSON.parse(window.localStorage.getItem('token') as string);

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

    return (
        <div>
            <Toast ref={toastRef} />
            <ConfirmDialog />
            <h1 className="text-4xl font-bold">Search Record</h1>

            <div className="card">
                <DataTable
                    ref={datatableRef}
                    value={data}
                    rows={rows}
                    first={first}
                    totalRecords={totalData}
                    rowsPerPageOptions={[10, 30, 50, 100]}
                    lazy={true}
                    paginator={true}
                    tableStyle={{ minWidth: '350rem' }}
                    header={dataTableHeader}
                    showGridlines={true}
                    onPage={e => {
                        setFirst(e.first);
                        setRows(e.rows);
                        setPage(e.page as number);
                    }}
                >
                    {role === 'Admin' && <Column rowEditor body={options => <Button icon="pi pi-fw pi-pencil" severity="warning" rounded text onClick={() => router.push(`/trade-mark/create-trade-mark/${options.id}`)} />} />}
                    {role === 'Admin' && (
                        <Column
                            body={options => (
                                <Button
                                    icon="pi pi-fw pi-trash"
                                    severity="danger"
                                    rounded
                                    text
                                    onClick={() => {
                                        confirmDialog({
                                            message: 'Are you sure you want to delete this record?',
                                            header: 'Delete Confirmation',
                                            icon: 'pi pi-info-circle',
                                            accept: () => deleteHandler(options.id),
                                            acceptClassName: 'p-button-danger',
                                            reject: () => {},
                                        });
                                    }}
                                />
                            )}
                        />
                    )}
                    <Column field="id" header="No" alignHeader="center" align="center" body={(_, context) => (!isLoading ? context.rowIndex + 1 : <Skeleton />)} />
                    {column.map((col, index) => (
                        <Column alignHeader="center" align="center" field={col.field} key={index} header={col.header} body={(rowData, column) => (!isLoading ? customTemplate(rowData, column) : <Skeleton />)} />
                    ))}
                </DataTable>
            </div>
        </div>
    );
};

export default TradeMarkList;
