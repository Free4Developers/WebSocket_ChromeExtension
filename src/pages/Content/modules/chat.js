export const createChatDiv = () => {
    const ele = document.createElement('div');
    ele.id = 'chatRoomDiv';
    ele.style.position = 'fixed';
    ele.style.display = 'none';
    ele.style.height = '500px';
    ele.style.width = '200px';
    ele.style.right = '100px';
    ele.style.top = '100px';
    ele.style.backgroundColor = 'black';
    ele.style.zIndex = 9999;
    document.body.appendChild(ele);
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