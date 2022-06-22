import React, { useEffect, useRef, useState } from "react";
import './index.css'
import * as SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';  

const Chatting = ({viewState}) => {
    const [live, setLive] = useState(false);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [receivedData, setReceivedData] = useState({});

    const client = useRef({});
    const userInfo = useRef({SERVER_URI: '', ACCESS_TOKEN: '', USER_INFO: ''})
    const messageEndRef = useRef(null);

    const host = window.location.host;
    
    chrome.storage.sync.get([host], function(res){
        userInfo.current = {...userInfo.current, SERVER_URI: res[host].SERVER_URI, STOMP_PROP: res[host].STOMP_PROP, ACCESS_TOKEN: res[host].ACCESS_TOKEN, USER_INFO: res[host].USER_INFO, DEBUG: res[host].DEBUG};
    });

    useEffect(()=>{
        client.current = new StompJs.Client({
            webSocketFactory: () => new SockJS(userInfo.current.SERVER_URI), // proxy를 통한 접속
            debug: function (str) {
                if(userInfo.current.DEBUG) console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                setLive(true);
                client.current.subscribe(userInfo.current.STOMP_PROP.subscribe, function(chat){
                    const recieved = JSON.parse(chat.body);
                    console.log(recieved)
                    if(recieved.writerId !== userInfo.current.USER_INFO.id) setReceivedData((prev)=> ({...prev, writerId: recieved.writerId, writerNickname: recieved.writerNickname ,message: recieved.message})); 
                });
                client.current.publish({destination: userInfo.current.STOMP_PROP.enter, body: JSON.stringify({ roomId: userInfo.current.STOMP_PROP.roomId, writerId: userInfo.current.USER_INFO.id })})
            },
            onStompError: (frame) => {
                console.error(frame);
            },
        });
        client.current.activate();

        return () => {client.current.deactivate();}
    },[])

    const scrollToBottom = () => {
        if(messageEndRef.current === null) return;
        messageEndRef.current.scrollIntoView({behavior: "smooth"})
    }

    useEffect(()=>{
        scrollToBottom();
    },[chat])
    
    useEffect(()=>{
        if(Object.keys(receivedData).length === 0) return;
        console.log(receivedData)
        setChat([...chat, {name: receivedData.writerNickname, id: receivedData.writerId, message: receivedData.message}])
    },[receivedData])
    
    const inputMessage = (e) => {
        setMessage(e.target.value);
    }
    const onEnter = (e) => {
        if(e.keyCode === 13) {
            sendMessage();
        }
    }
    const sendMessage = () => {
        if(message === '') return;
        setChat([...chat, {name: userInfo.current.USER_INFO.nickname, id: userInfo.current.USER_INFO.id, message: message}])
        client.current.publish({destination: userInfo.current.STOMP_PROP.send, body: JSON.stringify({ roomId: userInfo.current.STOMP_PROP.roomId, writerId: userInfo.current.USER_INFO.id, message: message })})
        setMessage('');
    }
    const renderChat = () => {
        console.log(chat)
        return chat.map(({name, id, message}, index) => (
            <div key={index} style={{ position: "relative" ,width: "100%" }}>
                {id === -1 && <div className="entering_message">{message}</div>}
                {id !== -1 && id !== userInfo.current.USER_INFO.id && 
                    <>
                        <div className='recieved_chat_name'>{name}</div>
                        <div className="recieved_chat" ref={messageEndRef}>{message}</div>
                    </>
                }
                {id !== -1 && id === userInfo.current.USER_INFO.id && <div className="send_chat" ref={messageEndRef}>{message}</div>}
            </div>
        ));
    }
    return(
    <div className={viewState}>
        { !live && 
            <>
                서버 연결 중 입니다.
            </>
        }
        {
            live &&
            <>
                <div className="chatting_Room">
                    {renderChat()}
                </div>
                <input className="chatting_messageInput" type='text' placeholder='메세지를 입력해주세요' onChange={inputMessage} onKeyDown={onEnter} value={message}/>
                <button className="chatting_sendMessage" onClick={sendMessage}>전송</button>
                <br />
                
            </>
        }
    </div>)
}

export default Chatting