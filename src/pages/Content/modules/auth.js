// export const addAuthEventListener = () => {
//   console.log('add Auth Event Listner');
//   document.addEventListener('authListener', function (event) {
//     let data = event.detail;

//     console.log(data);
// });
// };
export function addAuthEventListener(){
  document.addEventListener('authListener', function (event) {
    console.log('auth event',event)
    let data = event.detail;
    // console.log('웹 사용자 데이터 from extension', data);
    chrome.storage.sync.set({ACCESS_TOKEN: data.accessToken, USER_INFO: data.userInfo}, function(){
      console.log('웹 사용자 데이터 from extension', data);
    });
  });
}
