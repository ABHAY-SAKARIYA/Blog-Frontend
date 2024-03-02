import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";

export default function Cards(props) {

    // This Code is to show desc html code in card view in home page and if is there any h tag available replace them with p because h1 tag increase the size of desc.
    const desc_html = {
        __html: props.desc.slice(0, 3).includes("h") ? props.desc.replace("h", "p") : props.desc,
    }

    const navigate = useNavigate();

    const HandleVisit = ( e ) => {
        e.preventDefault();
        if (props.ctype === "paid"){
            if (props.paidUser){
                navigate(`/post/${props.postId}`);
            }else{

                alert("This Content is Paid SignUp To Get Access!");
            }
        }else{
            navigate(`/post/${props.postId}`);
        }
    }

    return (
        <>
            <Link className='Card-Link' onClick={HandleVisit}>
                <div className="card my-2 border-dark text-white Home-Card" style={{ maxWidth: "25rem", height: "15rem" }}>
                    {
                        props.ctype && props.ctype === "paid" && <span className="position-absolute top-0 start-100 translate-middle p-2 bg-warning border border-dark rounded-circle"></span>
                    }
                   
                    <div className="card-body">
                        <h5 className="card-title" style={{ fontWeight: "900" }}>{props.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted" style={{ fontWeight: "700" }}>{props.author}</h6>
                        <p className="card-text text-secondary my-2 desc" dangerouslySetInnerHTML={desc_html} />
                        {/* <Link to={`/post/${props.postId}`} className="card-link my-2 mx-2">Read More</Link> */}
                    </div>
                    <div className={`card-footer ${ props.ctype === "paid" ? "text-warning" : "text-muted"} d-flex justify-content-center`}>
                        {props.date.slice(8, 10) + "/" + props.date.slice(5, 7) + "/" + props.date.slice(0, 4)}
                    </div>
                </div>
            </Link>
        </>
    )
}
