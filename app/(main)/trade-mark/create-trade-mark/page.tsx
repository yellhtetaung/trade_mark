'use client';

import React, { useState } from 'react';

import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';

import { Button } from 'primereact/button';

import { ChangeHandler, TradeMark } from '../../../../types/types';

const CreateTradeMark = () => {
    const [tradeMark, setTradeMark] = useState<TradeMark>({
        trademark: '',
        trademark_sample: '',
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
        tm2: ''
    });

    const onChangeHandler = (e: ChangeHandler) => {};

    const submitHandler = () => {};

    return (
        <div>
            <h1 className="text-4xl font-bold">Create Trade Mark</h1>
            <div className="card">
                <div className="p-fluid formgrid grid">
                    <div className="field col-12">
                        <label htmlFor="trademark">Trade Mark</label>
                        <InputText id="trademark" name="trademark" type="text" value={tradeMark.trademark} onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12">
                        <label htmlFor="trademark_sample">Trade Mark Sample</label>
                        <FileUpload accept="image/*" id="trademark_sample" name="trademark_sample" />
                    </div>
                    <div className="field col-12">
                        <label htmlFor="applicant">Applicant</label>
                        <InputText id="applicant" name="applicant" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12">
                        <label htmlFor="address">Address</label>
                        <InputTextarea id="address" name="address" onChange={onChangeHandler} rows={3} autoResize={true} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="classes">Classes</label>
                        <InputText id="classes" name="classes" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="goods_services">Goods/Services</label>
                        <InputText id="goods_services" name="goods_services" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="no_ent_reg_cer">Number of Enterprise Registration Certificate</label>
                        <InputText id="no_ent_reg_cer" name="no_ent_reg_cer" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="nonlatin_char_trans">Non-Latin Characters and Transliteration</label>
                        <InputText id="nonlatin_char_trans" name="nonlatin_char_trans" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="trans_mean">Translation / Meaning</label>
                        <InputText id="trans_mean" name="trans_mean" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="color_claim">Color Claim</label>
                        <InputText id="color_claim" name="color_claim" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="re_filling_date">Re-filling Date</label>
                        <Calendar id="re_filling_date" name="re_filling_date" dateFormat="mm/dd/yy" showIcon={true} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="re_filling_WIPO_no">Re-filling WIPO No</label>
                        <InputText id="re_filling_WIPO_no" name="re_filling_WIPO_no" onChange={onChangeHandler} />
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="app_no">App No</label>
                        <InputText id="app_no" name="app_no" onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="off_fill_date">Offical Filling Date</label>
                        <Calendar id="off_fill_date" name="off_fill_date" dateFormat="mm/dd/yyyy" showIcon={true} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="payment_WIPO_no">Payment WIPO No</label>
                        <InputText id="payment_WIPO_no" name="payment_WIPO_no" onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="other_procedure">Other Procedure</label>
                        <InputText id="other_procedure" name="other_procedure" onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="granting_date">Granting Date</label>
                        <Calendar id="granting_date" name="granting_date" dateFormat="mm/dd/yyyy" showIcon={true} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="reg_no">Reg No</label>
                        <InputText id="reg_no" name="reg_no" onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="time_renewal">Time Renewal</label>
                        <InputText id="time_renewal" name="time_renewal" onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="renewal_date">Renewal Date</label>
                        <Calendar id="renewal_date" name="renewal_date" dateFormat="mm/dd/yyyy" showIcon={true} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="renewal_no">Renewal Number</label>
                        <InputText id="renewal_no" name="renewal_no" onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="val_period">Validity Period</label>
                        <Calendar id="val_period" name="val_period" dateFormat="mm/dd/yyyy" showIcon={true} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="date_of_public">Date of publication</label>
                        <Calendar id="date_of_public" name="date_of_public" dateFormat="mm/dd/yyyy" showIcon={true} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="exp_date">Expiration Date</label>
                        <Calendar id="exp_date" name="exp_date" dateFormat="mm/dd/yyyy" showIcon={true} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="reason_exp">Reason Expires</label>
                        <InputText id="reason_exp" name="reason_exp" onChange={onChangeHandler} />
                    </div>

                    <div className="field col-12 md:col-6">
                        <label htmlFor="tm2">TM 2</label>
                        <InputText id="tm2" name="tm2" onChange={onChangeHandler} />
                    </div>
                </div>

                <div className="flex justify-content-end">
                    <Button label="Submit" onClick={submitHandler} />
                </div>
            </div>
        </div>
    );
};

export default CreateTradeMark;
