// Import required dependencies for react, react components, firebase, images and style sheet
import React from 'react'
import Header from '../Header'
// import deviceImg from "./androidtablet.png"
import GetApkQR from "../images/GetApkQR.jpeg";


// GetApk as react component
const GetApk = () => {
    return (
        // Header
        <div><Header text="Get Apk" />
        {/* Contents */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {/* <img src={deviceImg} style={{ height: '400px' }} alt=""></img> */}
                <img src={GetApkQR} style={{ height: '350px' }} alt=""></img><br/><br/>
                <button type="button" class="btn btn-success">Download for Android</button>
            </div>
        </div>
    )
}
// export GetApk as react component
export default GetApk