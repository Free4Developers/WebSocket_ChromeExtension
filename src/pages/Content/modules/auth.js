import { createChatDiv } from '../../Content/modules/chat'

export function addAuthEventListener(){
  document.addEventListener('authListener', function (event) {
    console.log('auth event',event)
    let data = event.detail;
    // console.log('웹 사용자 데이터 from extension', data);
    chrome.storage.sync.get(['CHROME_EXTENSION_AVAILABLE_STATE'], function(res){
      if(res.CHROME_EXTENSION_AVAILABLE_STATE){
        console.log("start available")
        chrome.storage.sync.set({ACCESS_TOKEN: data.accessToken, USER_INFO: data.userInfo}, function(){
          createChatDiv();
        });
      }
    })

  });
}
