import React from "react";
import { render } from 'react-dom';
import Chatting from './component/Chatting'

export const createChatDiv = () => {
    const ele = document.createElement('div');
    ele.id = 'chatRoomDiv';
    ele.style.position = 'fixed';
    ele.style.display = 'none';
    ele.style.height = '800px';
    ele.style.width = '400px';
    ele.style.right = '50px';
    ele.style.top = '50px';
    ele.style.backgroundColor = 'white';
    ele.style.border = '1px solid #eef2f4';
    ele.style.zIndex = 9999;
    ele.style.display = 'inline-block';
    document.body.appendChild(ele);
    render(<Chatting />, window.document.querySelector('#chatRoomDiv'));
}



  