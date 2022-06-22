import React from "react";
import { render } from 'react-dom';
import ViewButton from './component/ViewButton/index'

export const createChatDiv = () => {
    const ele = document.createElement('div');
    ele.id = 'chatRoomDiv';
    document.body.appendChild(ele);
    render(<ViewButton />, window.document.querySelector('#chatRoomDiv'));
}



  