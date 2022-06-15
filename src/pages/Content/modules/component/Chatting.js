import React, { useEffect, useRef, useState } from "react";
import './Chatting.css'
// import { onSocketConnection, sendSocketMessage } from '../../../Background/index'
import * as SockJS from 'sockjs-client';
// import * as StompJs from '@stomp/stompjs';  

const Chatting = () => {
    // 채팅 어플 연동 상태
    // const [isApproachable, setIsApproachable] = useState(false);
    // chatting 토클 상태
    const [live, setLive] = useState(false);
    // 메세지 유저 및 내용
    const [message, setMessage] = useState('');
    // 서버로 부터 받아온 내용
    const [chat, setChat] = useState([]);

    const [sockjs, setSockjs] = useState();
    const [receivedData, setReceivedData] = useState('');

    // 초기 채팅 <-> 클라이언트 연결 확인
    useEffect(()=>{
        // 소켓 연결
        const sock = new SockJS('http:localhost:9000/echo');
        console.log(sock.readyState)
        sock.onmessage = function (e){
            // 처음 연결 시 어떻게 보내주는지에 따라 수정 필요
            try {
                const data = JSON.parse(e.data);
                if(data.connection) setLive(true);
            } catch {
                console.log('a')
                setReceivedData(e.data)
            }
        }
        setSockjs(sock);
        setChat([...chat, {name: "isOK", message: "연결되었습니다"}])
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
        if(receivedData === '') return;
        setChat([...chat, {name: "Server", message: receivedData}])
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
        setChat([...chat, {name: "User", message: message}])
        console.log(message)
        console.log(sockjs)
        sockjs.send(message);
        setMessage('');
    }
    const renderChat = () => {
        console.log(chat)
        return chat.map(({name, message}, index) => (
            <div key={index} style={{ position: "relative" ,width: "100%" }}>
                {name === 'isOK' && <div>{message}</div>}
                {name !== 'isOK' && name !== 'User' && <div className="recieved_chat" ref={messageEndRef}>{name}: <>{message}</></div>}
                {name !== 'isOK' && name === 'User' && <div className="send_chat" ref={messageEndRef}>{message}</div>}
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