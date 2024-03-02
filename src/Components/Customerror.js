import React from 'react'
import { Link } from 'react-router-dom'

export default function Customerror( props ) {
    return (
        <>
            <div className="d-flex flex-column align-items-center" style={{ height: "100vh" }}>
                <h1 className='text-danger error-text mt-5'>Error</h1>
                <p className='text-secondary error-msg'>{props.errMsg}</p>
                <Link to={"/"} className='btn btn-outline-secondary text-white error-btn d-flex justify-content-between'><span className='left-arrow'>&#11114;</span> Go Back</Link>
            </div>
        </>
      )
}
