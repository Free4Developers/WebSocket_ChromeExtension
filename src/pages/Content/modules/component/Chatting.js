import React, { useEffect, useRef, useState } from "react";
import './Chatting.css'
// import { onSocketConnection, sendSocketMessage } from '../../../Background/index'
import * as SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';  

const roomId = 'open';

const Chatting = () => {
    // 채팅 어플 연동 상태
    // const [isApproachable, setIsApproachable] = useState(false);
    // chatting 토클 상태
    const [live, setLive] = useState(false);
    // 메세지 유저 및 내용
    const [message, setMessage] = useState('');
    // 서버로 부터 받아온 내용
    const [chat, setChat] = useState([]);

    // const [sockjs, setSockjs] = useState();
    const client = useRef({});
    const [receivedData, setReceivedData] = useState('');

    // 초기 채팅 <-> 클라이언트 연결 확인
    useEffect(()=>{

        client.current = new StompJs.Client({
            // brokerURL: "ws://localhost:8080/stomp/chat", // 웹소켓 서버로 직접 접속
            webSocketFactory: () => new SockJS("http://localhost:8080/stomp/chat"), // proxy를 통한 접속
            // connectHeaders: {
            //     "auth-token": "spring-chat-auth-token",
            // },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                client.current.subscribe(`/channel/chat/room`, function(chat){
                    client.current.send('/publish/chat/enter', {}, JSON.stringify({roomId: roomId, writer: 'USERNAME', }))
                    console.log(chat);
                })
            },
            onStompError: (frame) => {
                console.error(frame);
            },
        });
      
        client.current.activate();

        // // 1. 소켓 연결
        // const sock = new SockJS('http:localhost:8080/stomp/chat');
        // console.log(sock.readyState)
        // // 2. SockJS를 stomp 내어줌
        // const stompjs = StompJs.Client(sock);
        
        // // 3. connection 될 때 실행
        // stompjs.connect({}, function(){
        //     console.log("STOMP Connection");

        //     // 4. subscribe (path, callback)으로 메세지 주고 받음
            
        //     stompjs.subscribe("/channel/chat/room" + roomId, function(chat){
        //         stompjs.send('/publish/chat/enter', {}, JSON.stringify({roomId: roomId, writer: 'USERNAME', }))
        //         console.log(chat);
        //     })
        // })

        // sock.onmessage = function (e){
        //     // 처음 연결 시 어떻게 보내주는지에 따라 수정 필요
        //     try {
        //         const data = JSON.parse(e.data);
        //         if(data.connection) setLive(true);
        //     } catch {
        //         console.log('a')
        //         setReceivedData(e.data)
        //     }
        // }
        // setSockjs(sock);
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
        // console.log(sockjs)
        // sockjs.send(message);
        client.current.publish({destination: "/publish/chat/message", body: JSON.stringify({ roomId: "open", writerId: "USER_ID", message: message })})
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