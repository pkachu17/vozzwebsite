// Import required dependencies for react, react components, firebase, images and style sheet
import React from 'react';
import Header from '../Header';
import GetApkQR from "../images/GetApkQR.jpeg";
import vozzzapk from "./vozzz.apk";

// GetApk as react component
const GetApk = () => {
    return (
        // Header
        <div><Header text="Get Apk" />
        {/* Contents */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src={GetApkQR} style={{ height: '350px' }} alt=""></img><br/><br/>
                <h4>or,</h4><br/>
                <a download="vozzz" class="btn btn-success" href={vozzzapk}>Download for Android</a>
            </div>
        </div>
    )
}
// export GetApk as react component
export default GetApk