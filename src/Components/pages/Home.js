import React, { useEffect, useState } from 'react'
import Cards from '../Cards'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Customerror from '../Customerror';
import URL_CONFIG from '../Configs/Config';

export default function Home() {
    const [data, setData] = useState();
    const [loader, setLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    // Created an user state only for testing purpose for paid content view and created an function to toggle paidUser to true and false
    const [paidUser, setPaidUser] = useState(false);

    const testPaidUserbtnOnClick = () => {
        if (paidUser === true) {
            setPaidUser(false);
        } else {
            setPaidUser(true);
        }
    }


    useEffect(() => {
        FetchData();// eslint-disable-next-line
        // localStorage.setItem("UserDetail",JSON.stringify({Name:"abhay",paid:true}))

    }, [])

    const FetchData = async () => {
        try {
            setLoader(true);
            const res = await axios({
                url: `${URL_CONFIG.BASE_URL}/data`,
                method: "GET"
            });

            if (res.data.type === "Success") {
                setLoader(false);
                setData(res.data.data);
                setErrorMsg();
            } else {
                setLoader(false);
                setErrorMsg(res.data.msg || "Connect To DB error");
            }

        } catch (err) {
            setLoader(false);
            setErrorMsg("Internal Server Error!");
            console.log(err);
        }
    }


    
    // Keyboard Key Press
    // const addBtn = useRef(null); // add "ref={addBtn}" to add Post button.

    // useEffect(() => {
    //     document.addEventListener("keydown", (e) => {
    //         if (e.key === "="){
    //             addBtn.current.click()
    //         }
    //     });
    // }, [])

    return (
        <>

            {/* Loader Screen */}
            {loader && <div className="loaderScreen">
                <div className="load">
                    <span className='loader'></span>
                </div>
            </div>}


            <div className="container my-4">
                {/* NAV */}
                <div className="container">
                    <div className="d-flex justify-content-between" style={{ marginBottom: "2rem" }}>
                        <h1 className='text-white'>Home</h1>
                        <Link to={"/add"} className="btn btn-primary" style={{ height: "2.5rem" }}>ADD POST</Link>
                        <button className='btn btn-outline-warning' onClick={testPaidUserbtnOnClick} style={{ height: "2.5rem", width: "150px" }}>Paid User : {paidUser ? "True" : "False"}</button>
                    </div>
                </div>

                {/* Showing Error Screen if Any Error accured */}
                {
                    errorMsg && <Customerror errMsg={errorMsg} />
                }

                {/* Main Content row */}
                <div className="row">
                    {
                        data && data.map((i) => {
                            return (
                                <div className="col" key={i._id}>
                                    <Cards title={i.title} desc={i.desc.length <= 100 ? i.desc : i.desc.slice(0, 100) + ".."} author={i.author} postId={i._id} date={i.date.slice(0, 10)} ctype={i.ctype} paidUser={paidUser} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
