import { createChatDiv } from '../../Content/modules/chat'

export function addAuthEventListener(){
  document.addEventListener('authListener', function (event) {
    let data = event.detail;
    chrome.storage.sync.get(['CHROME_EXTENSION_AVAILABLE_STATE'], function(res){
      if(res.CHROME_EXTENSION_AVAILABLE_STATE){
        const hostName = window.location.host;
        const info = {};
        info[hostName] = {SERVER_URI: data.serverUri, STOMP_PROP: data.stomp, ACCESS_TOKEN: data.accessToken, USER_INFO: data.userInfo, DEBUG: data.debugMode};
        chrome.storage.sync.set(info, function(){
          createChatDiv();
        });
      }
    })

  });
}
