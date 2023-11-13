'use client';

import React from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Users = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold">User Lists</h1>

            <div>
                <DataTable>
                    <Column />
                </DataTable>
            </div>
        </div>
    );
};

export default Users;
