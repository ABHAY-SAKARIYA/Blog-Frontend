import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import Customerror from './Customerror';
import URL_CONFIG from './Configs/Config';

export default function Post() {
    // Param from the link/url
    const params = useParams();

    const [data, setData] = useState();
    const [loader,setLoader] = useState(false);
    const [errorMsg,setErrorMsg] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        getDetail();// eslint-disable-next-line
    }, [])

    const getDetail = async () => {

        try {
            setLoader(true);
            // Create search link for data
            const link = `${URL_CONFIG.BASE_URL}/data/${params.id}`

            const res = await axios({
                url: link,
                method: "GET"
            });
            console.log(res.data.type)
            if(res.data.type === "success"){
                setLoader(false);
                setData(res.data.data);
                setErrorMsg();
            }else{
                setLoader(false);
                setErrorMsg("Connection Error! Try Again Later")
            }
            
        } catch (err) {
            setLoader(false);
            setErrorMsg("Internal Server Error! Try Again Later")
            console.log(err);
        }
    }


    const DeletePost = async () => {

        const confirmation = window.confirm("Are You Sure u Want To Delete!!");

        if (confirmation === true) {
            const res = await axios({
                url: `${URL_CONFIG.BASE_URL}/data/del/${params.id}`,
                method: "DELETE"
            });


            if (res.data.type === "Success") {
                navigate("/");
            }

        }

    };

    // To Copy the Link Of the Post..
    const copyPostLink = () => {
        const copyLink = window.location;
        navigator.clipboard.writeText(copyLink);
        alert("Link Copied to ClipBoard")
    }

    return (
        <>

            {/* Loader Screen */}
            {loader && <div className="loaderScreen">
                <div className="load">
                    <span className='loader'></span>
                </div>
            </div>}



            {/* Showing Error Screen if Any Error accured */}
            {
                errorMsg && <Customerror errMsg={errorMsg} />
            }

            {
                data &&
                <>
                    <div className="container mt-5 ">
                        <nav className='breadcrumb' aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{data.title}</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="container my-5 d-flex justify-content-center text-white">
                        <div className="card border-dark" style={{ width: "50rem" }}>
                            <div className="card-body">
                                <h5 className="card-title mb-2" style={{ fontSize: "3rem", fontWeight: "900" }}>{data.title}</h5>
                                <h5 className="card-title text-secondary" style={{ fontSize: "2rem", fontWeight: "900" }}>{data.author}</h5>
                                <h5 className="card-title mb-5 text-secondary" style={{ fontSize: "1rem", fontWeight: "900" }}>{data.date.slice(8, 10) + "/" + data.date.slice(5, 7) + "/" + data.date.slice(0, 4)}</h5>
                                <p className="card-text mb-5" dangerouslySetInnerHTML={{ __html: data.desc }} />
                                <button className='btn btn-warning' onClick={DeletePost}>Delete</button>
                                <button className='btn btn-success mx-2' onClick={copyPostLink}>Copy Link</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
