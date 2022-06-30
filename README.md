# Chrome Extension WebSocket Service

## Examples on Client & Server

---

Checkout Examples
Written with React [Client](https://github.com/Free4Developers/WebSocket_Frontend)  
Written with Kotlin [Server](https://github.com/Free4Developers/WebSocket_Backend)

## Built With

- JavaScript
- React.js
- Google Chrome Manifest V3
- [Manifest V3 Boiler Plate](https://github.com/lxieyang/chrome-extension-boilerplate-react)

## How To Implement

---

### Client Setting

Inorder to implement the service, you need to set event handlers on your client.

```javascript
// onMount

document.dispatchEvent(
  new CustomEvent('chrome_extension_available_app', {
    detail: { available: true },
  })
);
```

Event allows chrome extension code to inject

After implement of event handlers letting know your client uses this application, it requires server data infomations.

````javascript
// after chrome_extension_available_app event

  let data = {
    // Server JWT Token
    accessToken: '',
    // User Info with nickname and email
    userInfo: {
      nickname: '',
      email: '',
    },
    // Server URI
    serverUri: '',
    // stomp directions with roomID
    stomp: {
      subscribe: '',
      enter: '',
      send: '',
      roomId: '',
      },
    // debug lets stomp responses on client consoles
    debugMode: true,
  };
  // send data through a DOM event
  document.dispatchEvent(new CustomEvent('authListener', { detail: data }));
  ```
````

## How Application Work

---

1. Client Event Handler `chrome_extension_available_app` lets you know whether you use the application or not.
2. Chrome Extension injects script if you use the application. View is Rendered.
3. Client Event Handler `authListener` sends data to the application.
4. If the connection is available, chat room is open and you are good to go!
