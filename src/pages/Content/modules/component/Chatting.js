import React, { useState } from "react";
import './Chatting.css'
const Chatting = () => {
    const [live, setLive] = useState(false);
    const [message, setMessage] = useState('');
    const onClickConnectBtn = () => {
        setLive(!live);
    }
    const inputMessage = (e) => {
        setMessage(e.target.value);
    }
    const onEnter = (e) => {
        if(e.keyCode === 13) {
            sendMessage();
            setMessage('');
        }
    }
    const sendMessage = () => {
        if(message === '') return;
        console.log(message);
        setMessage('');
    }
    return(
    <div className="container">
        { !live && 
            <>
                <h1>Chrome Extension Chatting Application</h1>
                <input className="urlInput" type='text' placeholder="URL을 입력해주세요" />
                <button className="connectBtn" onClick={onClickConnectBtn}>연결</button>
            </>
        }
        {
            live &&
            <>
                <div className="chattingRoom">
                    채팅창입니다.
                </div>
                <input className="messageInput" type='text' placeholder='메세지를 입력해주세요' onChange={inputMessage} onKeyDown={onEnter} value={message}/>
                <button className="sendMessage" onClick={sendMessage}>전송</button>
                <br />
                <button className="disConnectBtn" onClick={onClickConnectBtn}>연결 끊기</button>
            </>
        }
    </div>)
}

export default Chatting