import React, { useEffect, useState } from 'react';
import './Popup.css';
import Switch from '@mui/material/Switch';
import { onApplicationRun, onApplicationOff, onApplicationOn } from '../Background/index'
const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Popup = () => {
  const [isOn, setIsOn] = useState(false);
  useEffect(()=>{
    chrome.storage.sync.get(['applicationState'], function(result){
      setIsOn(result.applicationState);
      onApplicationRun();
      console.log(result)
  });
  },[]);
  const onSwitchChange = () =>{
    chrome.storage.sync.set({applicationState: !isOn}, function(){
      console.log(isOn)
      if(!isOn){
        console.log("run")
        onApplicationOn();
      }
      else {
        console.log("off")
        onApplicationOff();
      }
      setIsOn(!isOn);
    });
    
  }
  return (
    <div className="App">
      <Switch {...label} checked={isOn} onChange={onSwitchChange} color="secondary" />
    </div>
  );
};

export default Popup;
