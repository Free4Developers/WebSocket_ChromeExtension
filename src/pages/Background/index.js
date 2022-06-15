import { createChatDiv } from '../Content/modules/chat'

export function onApplicationRun(){
    console.log("first app run")
    createChatDiv();
}

export function addAppRunEventListener(){
    document.addEventListener('chrome_extension_available_app', function (event) {
      let data = event.detail;
      console.log(data)
      if(data.available){
          console.log("available")
          createChatDiv();
      }
    });
  }