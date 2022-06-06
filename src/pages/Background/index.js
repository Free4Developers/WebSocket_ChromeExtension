import { createChatDiv, hideChatDiv, displayChatDiv } from '../Content/modules/chat'

console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.storage.sync.get(['applicationState'], function(result){
    if(result.applicationState === undefined || result.applicationState === null){
        chrome.storage.sync.set({applicationState: false});
    }
    else{
        if(result.applicationState === true){
            onApplicationRun();
            onApplicationOn();
        }
    }
});


async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    if(chrome.tabs === undefined){
        createChatDiv();
        chrome.storage.sync.get(['applicationState'], function(result){
            if(result.applicationState){
                // createChatDiv();
                displayChatDiv();
            }
        });

        return;
    }
    else{
        let [tab] = await chrome.tabs.query(queryOptions);
        return tab;
    }

}

export function onApplicationRun(){
    getCurrentTab().then(
        (res)=>{
            console.log(res)
            if(res === undefined){
                return;
            }
            else{
                chrome.scripting.executeScript({
                    target: {tabId: res.id},
                    func: createChatDiv,
                });
            }
        }
    )
}
export function onApplicationOn(){
    getCurrentTab().then(
        (res)=>{
            if(res === undefined){
                return;
            }
            else{
                chrome.scripting.executeScript({
                    target: {tabId: res.id},
                    func: displayChatDiv,
                });
            }
        }
    )
}
export function onApplicationOff(){
    getCurrentTab().then(
        (res)=>{
            if(res === undefined){
                return;
            }
            else{
                chrome.scripting.executeScript({
                    target: {tabId: res.id},
                    func: hideChatDiv,
                });
            }
        }
    )
}

export function onSocketConnection() {
    const ENDPOINT = "http://127.0.0.1:8080";

}

export function sendSocketMessage() {

}