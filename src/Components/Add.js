import axios from 'axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import Customerror from './Customerror';
import URL_CONFIG from './Configs/Config';

export default function Add() {
    // For Description
    const [value, setValue] = useState();

    // for title and author 
    const [data, setData] = useState({
        title: "",
        author: ""
    });

    // For Error Msg in Alert
    const [errors, setError] = useState({
        msg: null,
        type: null
    });

    // For loader
    const [loader, setLoader] = useState(false);

    // For Error Screen
    const [errorMsg, setErrorMsg] = useState(null);

    // Handle Radio Button
    const [ctype, setctype] = useState("free");

    // Onchange Radio Button
    const radioOnChange = (e) => {
        setctype(e.target.value);
    }


    // Submit add data
    const OnChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
    }


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoader(true);


            const d = {
                title: data.title,
                author: data.author,
                desc: value,
                ctype: ctype
            }

            const res = await axios({
                url: `${URL_CONFIG.BASE_URL}/data/add`,
                method: "POST",
                data: d
            });

            if (res.data.type === "Success") {
                setError({
                    msg: res.data.msg,
                    type: res.data.type
                });
                setData({
                    title: "",
                    author: ""
                });
                setValue("");
                setctype("free");
                setLoader(false);
                setErrorMsg();
            } else {
                setLoader(false);
                setError({
                    msg: res.data.msg,
                    type: res.data.type
                });
            }
        } catch {
            setLoader(false);
            setErrorMsg("Connection Error!");
        }

    }

    // For React-Quill Text Editor....
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]



    return (
        <>

            {/* Loader Screen */}
            {
                loader && <div className="loaderScreen">
                    <div className="load">
                        <span className='loader'></span>
                    </div>
                </div>
            }

            {/* Showing Error Screen if Any Error accured */}
            {
                errorMsg && <Customerror errMsg={errorMsg} />
            }



            {/* Alert to show error and success msg */}
            {
                errors.type !== null && errors.type !== "Success" ?
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {errors.msg} All Feilds Are Required!
                        <button type="button" className="btn-close" onClick={() => setError({ msg: null, type: null })} data-bs-dismiss="alert" aria-label="Close"></button>
                    </div> : errors.type === "Success" && <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {errors.msg}
                        <button type="button" className="btn-close" onClick={() => setError({ msg: null, type: null })} data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
            }



            <div className="container mt-5">
                <nav className='breadcrumb' aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Post</li>
                    </ol>
                </nav>
            </div>

            <div className="container d-flex justify-content-center my-5 text-white">
                <div className="card border-dark px-4 py-4" style={{ width: "70rem" }}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Enter Title</label>
                            <input type="text" className="form-control" id="title" placeholder="Enter Title" value={data.title} name='title' onChange={OnChange} minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="author" className="form-label">Enter Author Name</label>
                            <input type="text" className="form-control" id="author" placeholder="Enter Author Name" value={data.author} name='author' onChange={OnChange} minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">Enter Content</label>
                            <ReactQuill theme='snow' value={value} onChange={setValue} className='text-editor' modules={modules} formats={formats} />
                            {/* <textarea className="form-control" id="desc" rows="3" value={data.desc} name='desc' onChange={OnChange}></textarea> */}
                        </div>
                        <label className='fs-3 my-2 fw-bold' htmlFor='flexCheckDefault'>Content Type</label>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="examplectype" id="examplectype1" value="free" onChange={radioOnChange} checked={ctype === "free"} />
                            <label id='free' className="form-check-label" htmlFor="examplectype1">
                                Free
                            </label>
                        </div>
                        <div className="form-check my-2 mb-4">
                            <input className="form-check-input" type="radio" name="examplectype" id="examplectype2" value="paid" onChange={radioOnChange} checked={ctype === "paid"} />
                            <label id='paid' className="form-check-label" htmlFor="examplectype2">
                                Paid
                            </label>
                        </div>
                        <button className='btn btn-primary'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}
