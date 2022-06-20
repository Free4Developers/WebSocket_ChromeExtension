import React, { useEffect, useRef, useState } from "react";
import './Chatting.css'
import * as SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';  

const Chatting = () => {
    // chatting 토클 상태
    const [live, setLive] = useState(false);
    // 메세지 유저 및 내용
    const [message, setMessage] = useState('');
    // 서버로 부터 받아온 내용
    const [chat, setChat] = useState([]);

    // const [sockjs, setSockjs] = useState();
    const client = useRef({});
    const [receivedData, setReceivedData] = useState({});

    // 유저 정보
    const userInfo = useRef({ACCESS_TOKEN: '', USER_INFO: ''})
    const host = window.location.host;
    chrome.storage.sync.get([host], function(res){
        userInfo.current = {...userInfo.current, ACCESS_TOKEN: res[host].ACCESS_TOKEN, USER_INFO: res[host].USER_INFO};
    });

    // 초기 채팅 <-> 클라이언트 연결 확인
    useEffect(()=>{
        client.current = new StompJs.Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/stomp/chat"), // proxy를 통한 접속
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                setLive(true);
                client.current.subscribe(`/channel/chat/room/open`, function(chat){
                    const recieved = JSON.parse(chat.body);
                    if(recieved.writerId !== userInfo.current.USER_INFO.id) setReceivedData((prev)=> ({...prev, writerNickname: recieved.writerNickname ,message: recieved.message})); 
                })
            },
            onStompError: (frame) => {
                console.error(frame);
            },
        });
        client.current.activate();

        return () => {client.current.deactivate();}
    },[])


    // 채팅방 y스크롤 포커싱
    const messageEndRef = useRef(null);

    const scrollToBottom = () => {
        if(messageEndRef.current === null) return;
        messageEndRef.current.scrollIntoView({behavior: "smooth"})
    }

    // 채팅 정보 렌더링
    useEffect(()=>{
        scrollToBottom();
    },[chat])
    
    useEffect(()=>{
        if(Object.keys(receivedData).length === 0) return;
        setChat([...chat, {name: receivedData.writerNickname, message: receivedData.message}])
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
        setChat([...chat, {name: userInfo.current.USER_INFO.nickname, message: message}])
        client.current.publish({destination: "/publish/chat/message", body: JSON.stringify({ roomId: "open", writerId: userInfo.current.USER_INFO.id, message: message })})
        setMessage('');
    }
    const renderChat = () => {
        return chat.map(({name, message}, index) => (
            <div key={index} style={{ position: "relative" ,width: "100%" }}>
                {name !== userInfo.current.USER_INFO.nickname && <div className="recieved_chat" ref={messageEndRef}>{name}: <>{message}</></div>}
                {name === userInfo.current.USER_INFO.nickname && <div className="send_chat" ref={messageEndRef}>{message}</div>}
            </div>
        ));
    }
    return(
    <div className="chatting_container">
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