'use client';

import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload, FileUploadHeaderTemplateOptions, FileUploadSelectEvent, ItemTemplateOptions } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { DataView } from 'primereact/dataview';
import { ProgressSpinner } from 'primereact/progressspinner';

import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';

import { useRouter } from 'next/navigation';

import { Category } from '../../types/types';
import { axiosInstance } from '../../axiosInstance';

interface Recognition {
    id: number;
    name: string;
    image: string;
    distance: number;
}

export default function SearchImage() {
    const toast = useRef<any | null>(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<FileUpload>(null);
    const [files, setFiles] = useState<File | null>(null);
    const [recognition, setRecognition] = useState<Recognition[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const onTemplateSelect = (e: FileUploadSelectEvent) => {
        let _totalSize = totalSize;
        let files = e.files;

        for (let i = 0; i < files.length; i++) {
            _totalSize += files[i].size || 0;
        }

        setTotalSize(_totalSize);
        setFiles(files[0]);
    };

    const onTemplateRemove = (file: File) => {
        setTotalSize(totalSize - file.size);
        fileUploadRef.current?.clear();
        setRecognition([]);
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const { className, chooseButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
        const file = inFile as any;

        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    const categories = [
        { name: 'Conceptual similarity (determined by AI to match similar concepts)', key: 'C' },
        { name: 'Shape similarity (similar lines with similar distribution - ignores colors)', key: 'S' },
    ];

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const submitHandler = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post(
                '/api/recognition',
                { files },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            if (response.status === 200 && response.data.length > 0) {
                setRecognition(response.data);

                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Success', life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'This image does not match', life: 3000 });
            }

            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Something Wrong!', life: 3000 });
        }
    };

    const imageListTemplate = (product: Recognition) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-column align-items-center gap-3 py-1">
                        <img className="w-10 h-15rem border-round" src={product.image} alt={product.name} />
                        <div className="text-xl font-bold">{product.name}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className=" font-semibold">ID: {product.id}</span>
                        <Tag value={product.distance} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <h1 className="text-4xl font-bold">Search Image</h1>
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <FileUpload
                ref={fileUploadRef}
                name="demo[]"
                url="/api/upload"
                accept="image/*"
                maxFileSize={1000000}
                onSelect={onTemplateSelect}
                onError={onTemplateClear}
                onClear={onTemplateClear}
                headerTemplate={headerTemplate}
                itemTemplate={itemTemplate}
                emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions}
                uploadOptions={uploadOptions}
                cancelOptions={cancelOptions}
            />

            {/* <div className="flex flex-column gap-3 mt-5">
                {files &&
                    categories.map((category: Category) => {
                        return (
                            <div key={category.key} className="flex align-items-center">
                                <RadioButton inputId={category.key} name="category" value={category} onChange={(e: RadioButtonChangeEvent) => setSelectedCategory(e.value)} checked={selectedCategory?.key === category.key} />
                                <label htmlFor={category.key} className="ml-2">
                                    {category.name}
                                </label>
                            </div>
                        );
                    })}
            </div> */}

            <div className="flex justify-content-end mt-5 gap-3">
                <Button label="Cancel" severity="danger" onClick={() => files && onTemplateRemove(files)} />
                <Button label="Search" onClick={submitHandler} />
            </div>

            {isLoading && (
                <div className="flex justify-content-center">
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                </div>
            )}

            {recognition?.length > 0 && (
                <div className="mt-5 card">
                    <DataView value={recognition.toSorted((a, b) => a.distance - b.distance)} layout="grid" itemTemplate={options => imageListTemplate(options)} />
                </div>
            )}
        </div>
    );
}
