'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';

import { ChangeHandler, TradeMark, SubmittionType } from '../../../../../types/types';

import { axiosInstance } from '../../../../../utils/axiosInstance';
import { Toast } from 'primereact/toast';

const UpdateTradeMark = () => {
    const router = useRouter();
    const { slug } = useParams();
    const toastRef = useRef<Toast>(null);
    const fileUploadRef = useRef<FileUpload>(null);
    const attachmentRef = useRef<FileUpload>(null);
    const [tradeMark, setTradeMark] = useState<TradeMark>({
        trademark: '',
        trademark_sample: undefined,
        applicant: '',
        address: '',
        classes: '', // multiple choice
        goods_services: '', // multiple line
        no_ent_reg_cer: '',
        nonlatin_char_trans: '',
        trans_mean: '',
        color_claim: '',
        re_filling_date: new Date(),
        re_filling_WIPO_no: '',
        app_no: '',
        off_fill_date: new Date(),
        payment_WIPO_no: '',
        other_procedure: '',
        granting_date: new Date(),
        reg_no: '',
        time_renewal: '',
        renewal_date: new Date(),
        renewal_no: '',
        val_period: new Date(),
        date_of_public: new Date(),
        exp_date: new Date(),
        reason_exp: '',
        tm2: '',
        submittion_type: {
            Mark: false,
            OldMark: false,
            ReRegistration: false,
        },
        attachment: undefined,
    });

    const resetDefaultState = () => {
        setTradeMark({
            trademark: '',
            trademark_sample: undefined,
            applicant: '',
            address: '',
            classes: '', // multiple choice
            goods_services: '', // multiple line
            no_ent_reg_cer: '',
            nonlatin_char_trans: '',
            trans_mean: '',
            color_claim: '',
            re_filling_date: new Date(),
            re_filling_WIPO_no: '',
            app_no: '',
            off_fill_date: new Date(),
            payment_WIPO_no: '',
            other_procedure: '',
            granting_date: new Date(),
            reg_no: '',
            time_renewal: '',
            renewal_date: new Date(),
            renewal_no: '',
            val_period: new Date(),
            date_of_public: new Date(),
            exp_date: new Date(),
            reason_exp: '',
            tm2: '',
            submittion_type: {
                Mark: false,
                OldMark: false,
                ReRegistration: false,
            },
            attachment: undefined,
        });
        fileUploadRef.current?.clear();
    };

    const onChangeHandler = (e: ChangeHandler | CalendarChangeEvent) => {
        setTradeMark(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const onCheckBoxChangeHandler = (e: CheckboxChangeEvent) => {
        setTradeMark(prevState => ({
            ...prevState,
            submittion_type: {
                ...prevState.submittion_type,
                [e.target.name]: e.target.checked,
            } as SubmittionType,
        }));
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.put(`/api/trade-mark/${slug}`, tradeMark, { headers: { 'Content-Type': 'multipart/form-data' } });

            if (res.status === 201) {
                resetDefaultState();
                router.push('/trade-mark');
            }
        } catch (error: any) {
            toastRef.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response.data.message,
                life: 3000,
            });
        }
    };

    const fetchTradeMark = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/api/trade-mark/search?id=${slug}`);
            const { re_filling_date, off_fill_date, granting_date, renewal_date, val_period, date_of_public, exp_date, trademark_sample, attachment, submittion_type, ...data } = response.data as TradeMark;

            const fileType = typeof trademark_sample === 'string' && trademark_sample.split('.')[1];
            const imageFile = trademark_sample && new File([trademark_sample], `${trademark_sample}`, { type: `image/${fileType}` });
            const objectURL = trademark_sample && `${process.env.NEXT_PUBLIC_BACKEND_URL}/trademark_sample/${trademark_sample}`;

            const file =
                imageFile &&
                objectURL &&
                ({
                    name: imageFile.name,
                    type: imageFile.type,
                    size: imageFile.size,
                    lastModified: imageFile.lastModified,
                    webkitRelativePath: imageFile.webkitRelativePath,
                    objectURL,
                } as unknown as File);

            trademark_sample && fileUploadRef.current?.setFiles(file ? [file] : []);

            const attachmentFile = attachment !== undefined && new File([attachment], `${attachment}`);

            attachment && attachmentRef.current?.setFiles(attachmentFile ? [attachmentFile] : []);

            setTradeMark({
                ...data,
                trademark_sample: trademark_sample,
                attachment: attachment,
                re_filling_date: re_filling_date && new Date(re_filling_date),
                off_fill_date: off_fill_date && new Date(off_fill_date),
                granting_date: granting_date && new Date(granting_date),
                renewal_date: renewal_date && new Date(renewal_date),
                val_period: val_period && new Date(val_period),
                date_of_public: date_of_public && new Date(date_of_public),
                exp_date: exp_date && new Date(exp_date),
                submittion_type: submittion_type
                    ? submittion_type
                    : {
                          Mark: false,
                          OldMark: false,
                          ReRegistration: false,
                      },
            });
        } catch (error) {
            console.log(error);
        }
    }, [slug]);

    useEffect(() => {
        fetchTradeMark().catch(error => console.log(error));
    }, [fetchTradeMark]);

    return (
        <div>
            <Toast ref={toastRef} />
            <div className="flex-1 flex align-items-center gap-3 mb-5">
                <Button icon="pi pi-arrow-left" rounded onClick={() => router.back()} />
                <h1 className="text-4xl font-bold">Update Trade Mark</h1>
            </div>
            <form className="card" onSubmit={submitHandler}>
                <div className="p-fluid formgrid grid">
                    <div className="field col-12">
                        <label htmlFor="trademark">Trade Mark</label>
                        <InputText id="trademark" name="trademark" type="text" value={tradeMark.trademark} onChange={onChangeHandler} required />
                    </div>
                    <div className="field col-12">
                        <label>Trade Mark Sample</label>
                        <FileUpload
                            ref={fileUploadRef}
                            accept="image/png"
                            url="/api/upload"
                            id="trademark_sample"
                            name="trademark_sample"
                            onSelect={e =>
                                setTradeMark(prevState => ({
                                    ...prevState,
                                    trademark_sample: e.files[0],
                                }))
                            }
                            onClear={() =>
                                setTradeMark(prevState => ({
                                    ...prevState,
                                    trademark_sample: undefined,
                                }))
                            }
                            onRemove={() =>
                                setTradeMark(prevState => ({
                                    ...prevState,
                                    trademark_sample: undefined,
                                }))
                            }
                            withCredentials={true}
                            uploadOptions={{
                                style: { display: 'none' },
                            }}
                        />
                    </div>
                    <div className="field col-12">
                        <label htmlFor="applicant">Applicant</label>
                        <InputText value={tradeMark.applicant} id="applicant" name="applicant" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12">
                        <label htmlFor="address">Address</label>
                        <InputTextarea value={tradeMark.address} id="address" name="address" onChange={onChangeHandler} rows={5} style={{ resize: 'vertical' }} />
                    </div>
                    <div className="field col-12">
                        <label htmlFor="classes">Classes</label>
                        <InputText value={tradeMark.classes} id="classes" name="classes" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12">
                        <label htmlFor="goods_services">Goods/Services</label>
                        <InputTextarea value={tradeMark.goods_services} id="goods_services" name="goods_services" onChange={onChangeHandler} rows={5} style={{ resize: 'vertical' }} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="no_ent_reg_cer">Number of Enterprise Registration Certificate</label>
                        <InputText value={tradeMark.no_ent_reg_cer} id="no_ent_reg_cer" name="no_ent_reg_cer" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="nonlatin_char_trans">Non-Latin Characters and Transliteration</label>
                        <InputText value={tradeMark.nonlatin_char_trans} id="nonlatin_char_trans" name="nonlatin_char_trans" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="trans_mean">Translation / Meaning</label>
                        <InputText value={tradeMark.trans_mean} id="trans_mean" name="trans_mean" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="color_claim">Color Claim</label>
                        <InputText value={tradeMark.color_claim} id="color_claim" name="color_claim" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12">
                        <label htmlFor="supporting_docs">Supporting Docs</label>
                        <InputTextarea value={tradeMark.supporting_docs} id="supporting_docs" name="supporting_docs" onChange={onChangeHandler} rows={5} style={{ resize: 'vertical' }} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="re_filling_date">Re-filling Date</label>
                        <Calendar value={tradeMark.re_filling_date} inputId="re_filling_date" name="re_filling_date" dateFormat="mm/dd/yy" showIcon={true} onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="re_filling_WIPO_no">Re-filling WIPO No</label>
                        <InputText value={tradeMark.re_filling_WIPO_no} id="re_filling_WIPO_no" name="re_filling_WIPO_no" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="app_no">App No</label>
                        <InputText value={tradeMark.app_no} id="app_no" name="app_no" onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="off_fill_date">Offical Filling Date</label>
                        <Calendar value={tradeMark.off_fill_date} inputId="off_fill_date" name="off_fill_date" dateFormat="mm/dd/yy" showIcon={true} onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="payment_WIPO_no">Payment WIPO No</label>
                        <InputText value={tradeMark.payment_WIPO_no} id="payment_WIPO_no" name="payment_WIPO_no" onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="other_procedure">Other Procedure</label>
                        <InputText value={tradeMark.other_procedure} id="other_procedure" name="other_procedure" onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="granting_date">Granting Date</label>
                        <Calendar value={tradeMark.granting_date} inputId="granting_date" name="granting_date" dateFormat="mm/dd/yy" showIcon={true} onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="reg_no">Reg No</label>
                        <InputText value={tradeMark.reg_no} id="reg_no" name="reg_no" onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="time_renewal">Time Renewal</label>
                        <InputText value={tradeMark.time_renewal} id="time_renewal" name="time_renewal" onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="renewal_date">Renewal Date</label>
                        <Calendar value={tradeMark.renewal_date} inputId="renewal_date" name="renewal_date" dateFormat="mm/dd/yy" showIcon={true} onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="renewal_no">Renewal Number</label>
                        <InputText value={tradeMark.renewal_no} id="renewal_no" name="renewal_no" onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="val_period">Validity Period</label>
                        <Calendar value={tradeMark.val_period} inputId="val_period" name="val_period" dateFormat="mm/dd/yy" showIcon={true} onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="date_of_public">Date of publication</label>
                        <Calendar value={tradeMark.date_of_public} inputId="date_of_public" name="date_of_public" dateFormat="mm/dd/yy" showIcon={true} onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="exp_date">Expiration Date</label>
                        <Calendar value={tradeMark.exp_date} inputId="exp_date" name="exp_date" dateFormat="mm/dd/yy" showIcon={true} onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="reason_exp">Reason Expires</label>
                        <InputText value={tradeMark.reason_exp} id="reason_exp" name="reason_exp" onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="tm2">TM 2</label>
                        <InputText value={tradeMark.tm2} id="tm2" name="tm2" onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 mt-3">
                        <div className="flex flex-column md:flex-row gap-3">
                            <div className="flex align-items-center">
                                <Checkbox inputId="Mark" name="Mark" onChange={onCheckBoxChangeHandler} checked={tradeMark.submittion_type.Mark} />
                                <label htmlFor="Mark" className="ml-2">
                                    Mark
                                </label>
                            </div>
                            <div className="flex align-items-center">
                                <Checkbox inputId="OldMark" name="OldMark" onChange={onCheckBoxChangeHandler} checked={tradeMark.submittion_type.OldMark} />
                                <label htmlFor="OldMark" className="ml-2">
                                    Old Mark
                                </label>
                            </div>
                            <div className="flex align-items-center">
                                <Checkbox inputId="ReRegistration" name="ReRegistration" onChange={onCheckBoxChangeHandler} checked={tradeMark.submittion_type.ReRegistration} />
                                <label htmlFor="ReRegistration" className="ml-2">
                                    Re-Registration
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="field col-12 mt-3">
                        <label htmlFor="attachment">Attachment</label>
                        <FileUpload
                            ref={attachmentRef}
                            id="attachment"
                            name="attachment"
                            url="/api/upload"
                            accept="application/pdf"
                            uploadOptions={{ style: { display: 'none' } }}
                            onSelect={e =>
                                setTradeMark(prevState => ({
                                    ...prevState,
                                    attachment: e.files[0],
                                }))
                            }
                            onRemove={() => setTradeMark(prevState => ({ ...prevState, attachment: undefined }))}
                            onClear={() => setTradeMark(prevState => ({ ...prevState, attachment: undefined }))}
                            withCredentials={true}
                        />
                    </div>
                </div>

                <div className="flex justify-content-end">
                    <Button label="Update" type="submit" />
                </div>
            </form>
        </div>
    );
};

export default UpdateTradeMark;
