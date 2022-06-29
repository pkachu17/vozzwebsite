import React from 'react'
import Header from '../Header'
import deviceImg from "./androidtablet.png"

const GetApk = () => {
    return (
        <div><Header text="Get Apk" />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src={deviceImg} style={{ height:'400px' }}></img>
                <button type="button" class="btn btn-success">Download for Android</button>
            </div>
        </div>
    )
}

export default GetApk