import { deleteDoc, doc } from "firebase/firestore";
import React, { Fragment, useState, useEffect } from "react";
import { db } from "../../../login/firebase";
import "./CustomAlert.css"

const CustomAlert = ({ val }) => {

    const deleted = async(e) => {
        e.preventDefault();
        try {
            await deleteDoc(doc(db, "buttons", val.name));
        } catch (e) {
            console.error("Error deleting button: ", e);
        }
    };

    return (
        <Fragment>
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${val.sid}`}>
                Delete
            </button>

            <div class="modal fade" id={`id${val.sid}`}>
                <div class="modal-dialog modal-confirm">
                    <div class="modal-content">
                        <div class="modal-header flex-column md-center">
                            <div class="icon-box">
                                <i class="material-icons">&#xE5CD;</i>
                            </div>
                            <h4 class="modal-title w-100">Are you sure?</h4>
                            {/* <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> */}
                        </div>
                        <div class="modal-body">
                            <p class="text-decoration-none">Do you really want to delete these records? This process cannot be undone.</p>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={e => deleted(e)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default CustomAlert;