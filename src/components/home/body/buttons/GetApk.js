import React from 'react'
import Header from '../Header'
// import deviceImg from "./androidtablet.png"
import GetApkQR from "../images/GetApkQR.jpeg";


const GetApk = () => {
    return (
        <div><Header text="Get Apk" />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {/* <img src={deviceImg} style={{ height:'400px' }}></img> */}
                <img src={GetApkQR} style={{ height: '350px' }} alt=""></img><br/><br/>
                <button type="button" class="btn btn-success">Download for Android</button>
            </div>
        </div>
    )
}

export default GetApk