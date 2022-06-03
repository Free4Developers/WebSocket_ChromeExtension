import React from "react";
import { render } from 'react-dom';
import Chatting from './component/Chatting'
export const createChatDiv = () => {
    const ele = document.createElement('div');
    ele.id = 'chatRoomDiv';
    ele.style.position = 'fixed';
    ele.style.display = 'none';
    ele.style.height = '700px';
    ele.style.width = '400px';
    ele.style.right = '100px';
    ele.style.top = '100px';
    ele.style.backgroundColor = 'white';
    ele.style.borderRadius = '20px';
    ele.style.background = 'linear-gradient(0.06deg, rgba(250, 250, 250, 1) 0%, rgba(246, 246, 246, 1) 29.62%, rgba(234, 234, 234, 1) 58.47%, rgba(215, 215, 215, 1) 86.92%, rgba(204, 204, 204, 1) 99.22%)';
    ele.style.boxShadow = ' 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 0px 0 #b9b9b9, 0 5px 0 rgba(125, 125, 125, 0.2), 0 6px 1px rgba(0, 0, 0, 0.2), 0 0 5px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.2), 0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.2), 0 0 4px white, 0 0px 3px white, 1px 1px 5px rgba(255, 155, 0, 0.37), 1px 1px 10px rgba(102, 60, 0, 0.5); '
    ele.style.zIndex = 9999;
    document.body.appendChild(ele);
    render(<Chatting />, window.document.querySelector('#chatRoomDiv'));
}

export const displayChatDiv = () => {
    const ele = document.getElementById('chatRoomDiv');
    console.log("show");
    ele.style.display = 'inline-block';
}

export const hideChatDiv = () => {
    const ele = document.getElementById('chatRoomDiv');
    console.log("hide");
    ele.style.display = 'none';
}