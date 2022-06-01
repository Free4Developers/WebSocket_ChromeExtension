console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.storage.sync.set({applicationState: false}, function(){
    console.log("first set")
    chrome.storage.sync.get(['applicationState'], function(result){
        console.log(result.applicationState)
    });
});


