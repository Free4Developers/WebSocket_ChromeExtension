import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import Switch from '@mui/material/Switch';
import { onApplicationRun, onApplicationOff, onApplicationOn } from '../Background/index'
const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Popup = () => {
  const [isOn, setIsOn] = useState(false);
  useEffect(()=>{
    chrome.storage.sync.get(['applicationState'], function(result){
      setIsOn(result.applicationState);
      console.log(result)
  });
  },[]);
  const onSwitchChange = () =>{
    chrome.storage.sync.set({applicationState: !isOn}, function(){
      if(!isOn){
        onApplicationOn();
      }
      else onApplicationOff();
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
