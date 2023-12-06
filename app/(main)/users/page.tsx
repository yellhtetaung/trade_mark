'use client';

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { DataTable, DataTableRowEditCompleteEvent, DataTableStateEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { axiosInstance } from '../../../axiosInstance';
import { InputText } from 'primereact/inputtext';
import { User } from '../../../types/types';
import { Button } from 'primereact/button';

type FilteredValue = 'username' | 'email' | 'null';

interface FetchedUser {
    id: string;
    username: string;
    email: string;
    phone_no: string;
    nrc: string;
    address: string;
    active: boolean;
}

const Users = () => {
    const [users, setUsers] = useState<User[] | undefined>();
    const [totalRecord, setTotalRecord] = useState<number>(0);
    const toastRef = useRef<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const datatableRef = useRef<DataTable<any>>(null);

    const [rows, setRows] = useState<number>(10);
    const [first, setFirst] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [sortField, setSortField] = useState<string>('created_at');
    const [sortOrder, setSortOrder] = useState<1 | -1>(-1);
    const [filteredValue, setFilteredValue] = useState<FilteredValue>('null');
    const [searchField, setSearchField] = useState<string>('');

    const activeBodyTemplate = (options: any): React.JSX.Element => {
        // Check if the body should be active
        if (options.active === true || options.value === true) {
            // Return a tag with "Active" value and "success" severity
            return <Tag value="Active" severity="success" />;
        }
        // Return a tag with "Inactive" value and "danger" severity
        return <Tag value="Inactive" severity="danger" />;
    };

    const inputEditor = (options: ColumnEditorOptions) => {
        // Create an input text component with the provided value and onChange callback.
        return <InputText value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback?.(e.target.value)} />;
    };

    const dropDownEditor = (options: ColumnEditorOptions) => {
        // Define the active options for the dropdown
        const active = [
            { name: 'Active', value: true },
            { name: 'Inactive', value: false },
        ];

        const role = [
            { name: 'Admin', value: 'Admin' },
            { name: 'User', value: 'User' },
        ];

        if (options.field === 'role') {
            // Return the dropdown editor component
            return <Dropdown value={options.value} onChange={(e: any) => options.editorCallback?.(e.value)} options={role} optionLabel="name" />;
        }

        // Template function to render each dropdown item
        const activeTemplate = ({ active, value }: any) => {
            return <Tag value={active || value ? 'Active' : 'Inactive'} severity={active || value ? 'success' : 'danger'} />;
        };

        // Return the dropdown editor component
        return <Dropdown value={options.value} onChange={(e: any) => options.editorCallback?.(e.value)} options={active} optionLabel="name" itemTemplate={activeTemplate} valueTemplate={activeTemplate} />;
    };

    const onEditHandler = useCallback(
        async (e: DataTableRowEditCompleteEvent) => {
            try {
                const updateUser: User[] = [];

                // Loop through the users and update the edited user
                users?.map((user: User) => {
                    if (user.id === e.newData.id) {
                        updateUser.push(e.newData as User);
                    } else {
                        updateUser.push(user);
                    }
                });

                setUsers(updateUser);

                // Send a PUT request to update the user in the API
                const res = await axiosInstance.put(`/api/users/${e.newData.id}`, e.newData);

                // Show a success toast message
                toastRef.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: res.data.message,
                    life: 3000,
                });
            } catch (error: any) {
                // Show an error toast message
                toastRef.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.response.data.message,
                    life: 3000,
                });
            }
        },
        [users],
    );

    const onFilterHandler = useCallback(async (page: number, pageSize: number, searchField: string, filteredValue: FilteredValue) => {
        setIsLoading(true);
        try {
            // Make a GET request to the '/api/users/search' endpoint
            const response = await axiosInstance.get('/api/users/search', {
                params: {
                    page,
                    pageSize,
                    searchField,
                    filteredValue,
                },
            });
            const { data: users, totalUsers } = response.data;

            // Update the users state with the retrieved user data
            setUsers(users);

            // Update the totalRecord state with the total number of users
            setTotalRecord(totalUsers);

            setIsLoading(false);
        } catch (error: any) {
            // Handle any errors that occur during the API request
            setUsers(undefined);

            // Show an error toast notification with the error message
            toastRef.current.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response.data.message,
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
                const response = await axiosInstance.get('/api/users');
                const { data: users } = response.data;

                const newUsers = users.map((user: FetchedUser, index: number) => ({
                    id: index + 1,
                    username: user?.username,
                    email: user?.email,
                    phone_no: user?.phone_no,
                    nrc: user?.nrc,
                    address: user?.address,
                    active: user?.active,
                }));

                const worksheet = xlsx.utils.json_to_sheet(newUsers);
                const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
                const excelBuffer = xlsx.write(workbook, {
                    bookType: 'xlsx',
                    type: 'array',
                });

                saveAsExcelFile(excelBuffer, 'users');
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
            { name: 'name', code: 'username' },
            { name: 'email', code: 'email' },
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
                        setSearchField('');
                    }}
                />
                <InputText
                    id="search"
                    name="search"
                    value={searchField}
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
                <Button label="Search" icon="pi pi-fw pi-search" onClick={() => onFilterHandler(page, rows, searchField, filteredValue)} />
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
                        {/* <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" /> */}
                    </div>
                </div>
            </div>
        );
    };

    const fetchUsers = async (page: number, pageSize: number, sortField: string, sortOrder: 1 | -1) => {
        setIsLoading(true);
        try {
            // Make a GET request to the '/api/users' endpoint with the page, pageSize, sortField, and sortOrder as query parameters
            const response = await axiosInstance.get('/api/users', {
                params: {
                    page,
                    pageSize,
                    sortField,
                    sortOrder,
                },
            });
            const { data: users, totalUsers } = response.data;

            // Update the state with the fetched users and total number of users
            setUsers(users);
            setTotalRecord(totalUsers);
            setIsLoading(false);
        } catch (error) {
            if (page > 0) {
                setPage(page - 1);
            }
            setUsers(undefined);
            setIsLoading(false);
            // Log any errors that occur during the API request
            console.log(error);
        }
    };

    const deleteHandler = async (id: number) => {
        try {
            const response = await axiosInstance.delete(`/api/users/${id}`);
            const data = response.data;

            if (response.status === 200) {
                toastRef.current.show({ severity: 'success', summary: 'Delete', detail: data.message, life: 3000 });
                fetchUsers(page, rows, sortField, sortOrder);
            }
        } catch (error: any) {
            toastRef.current.show({ severity: 'error', summary: 'Error', detail: error.response.message, life: 3000 });
        }
    };

    useLayoutEffect(() => {
        // Memoize the fetchUsers and onFilterHandler functions

        if (searchField === '' && filteredValue === 'null') {
            fetchUsers(page, rows, sortField, sortOrder).catch(error => console.log(error));
        }

        // Call the memoized function
    }, [page, rows, sortField, sortOrder, searchField, filteredValue]);

    return (
        <div>
            <Toast ref={toastRef} />
            <ConfirmDialog />
            <h1 className="text-4xl font-bold">User Lists</h1>

            <div className="card">
                <DataTable
                    ref={datatableRef}
                    value={users}
                    editMode="row"
                    onRowEditComplete={onEditHandler}
                    lazy={true}
                    first={first}
                    totalRecords={totalRecord}
                    rowsPerPageOptions={[10, 30, 50, 100]}
                    rows={rows}
                    paginator
                    header={dataTableHeader}
                    onPage={(e: DataTableStateEvent) => {
                        setRows(e.rows);
                        setFirst(e.first);
                        setPage(e.page as number);
                    }}
                    showGridlines={true}
                    sortMode="multiple"
                    onSort={e => {
                        const { field, order } = e.multiSortMeta && (e.multiSortMeta[0] as any);

                        setSortField(field);
                        setSortOrder(order === 1 ? -1 : 1);
                    }}
                    defaultSortOrder={sortOrder}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    removableSort
                >
                    <Column field="created_at" header="No" body={(_, context) => (!isLoading ? context.rowIndex + 1 : <Skeleton />)} sortable />

                    <Column field="username" header="Name" editor={options => inputEditor(options)} body={option => (!isLoading ? <span>{option.username}</span> : <Skeleton />)} sortable />

                    <Column field="email" header="Email" editor={options => inputEditor(options)} body={option => (!isLoading ? <span>{option.email}</span> : <Skeleton />)} />

                    <Column field="phone_no" header="Phone Number" editor={options => inputEditor(options)} body={option => (!isLoading ? <span>{option.phone_no}</span> : <Skeleton />)} />

                    <Column field="nrc" header="NRC" editor={options => inputEditor(options)} body={option => (!isLoading ? <span>{option.nrc}</span> : <Skeleton />)} />

                    <Column field="address" header="Address" editor={options => inputEditor(options)} body={option => (!isLoading ? <span>{option.address}</span> : <Skeleton />)} />

                    <Column field="active" header="Active" body={option => (!isLoading ? activeBodyTemplate(option) : <Skeleton />)} editor={dropDownEditor} />

                    <Column field="role" header="role" editor={dropDownEditor} body={option => (!isLoading ? <span>{option.role}</span> : <Skeleton />)} />
                    <Column rowEditor align="center" body={isLoading && <Skeleton />} />
                    <Column
                        align="center"
                        body={(option, content) =>
                            !isLoading ? (
                                <Button
                                    icon="pi pi-trash"
                                    text
                                    severity="danger"
                                    rounded
                                    onClick={() => {
                                        confirmDialog({
                                            message: 'Are you sure you want to delete this user?',
                                            header: 'Confirmation',
                                            icon: 'pi  pi-exclamation-triangle',
                                            acceptClassName: 'p-button-danger',
                                            accept: () => deleteHandler(option.id),
                                            reject: () => {},
                                        });
                                    }}
                                />
                            ) : (
                                <Skeleton />
                            )
                        }
                    />
                </DataTable>
            </div>
        </div>
    );
};

export default Users;
