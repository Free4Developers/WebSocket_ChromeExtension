import React, { useState } from "react";
import './index.css'
import Chatting from '../Chatting/index'
const openBtn = chrome.runtime.getURL("plus_sign_button.png");
const closeBtn = chrome.runtime.getURL("minus.png");

const ViewButton = () => {
    const [viewState, setViewState] = useState(false);
    const [cssPropName, setCssPropName] = useState('chatting_container_none')
    const changeViewState = () =>{
        if(viewState) setCssPropName('chatting_container_none');
        else setCssPropName('chatting_container');
        setViewState(!viewState);
    }

    return (
        <>
            <Chatting viewState={cssPropName} />
            {!viewState && <button className="view_btn" onClick={changeViewState}><img className="view_img" alt="openViewBtn" src={openBtn} /></button>}
            {viewState && <button className="view_btn" onClick={changeViewState}><img className="view_img" alt="closeViewBtn" src={closeBtn} /></button>}
        </>
    );
}

export default ViewButton