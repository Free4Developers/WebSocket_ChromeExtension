import { createChatDiv, hideChatDiv, displayChatDiv } from '../Content/modules/chat'

console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.storage.sync.get(['applicationState'], function(result){
    console.log("start")
    if(result.applicationState === undefined || result.applicationState === null){
        chrome.storage.sync.set({applicationState: false});
    }
    else{
        if(result.applicationState === true){
            // onApplicationRun();
            onApplicationOn();
        }
    }
});

// 채팅 가능 여부
export function addAvailableAppEventListener(){
    document.addEventListener('chrome_extension_available_app', function (event) {
      let data = event.detail.available;
      console.log(data)
    });
}
export async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    if(chrome.tabs === undefined){
        console.log("don't know tab")
        createChatDiv();
        chrome.storage.sync.get(['applicationState'], function(result){
            if(result.applicationState){
                console.log("getCurrentTab")
                // createChatDiv();
                displayChatDiv();
            }
        });

        return;
    }
    else{
        console.log("know tab")
        let [tab] = await chrome.tabs.query(queryOptions);
        console.log(tab)
        return tab;
    }

}

export function onApplicationRun(){
    console.log("first app run")
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
                console.log(res)
            }
        }
    )
}
export function onApplicationOn(){
    console.log("어플리케이션 구동")
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
