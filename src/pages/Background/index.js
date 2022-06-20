export function addAppRunEventListener(){
    document.addEventListener('chrome_extension_available_app', function (event) {
      let data = event.detail;
      if(data.available){
          chrome.storage.sync.set({CHROME_EXTENSION_AVAILABLE_STATE: true });
      }
    });
  }