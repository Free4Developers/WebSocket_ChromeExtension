import { addAuthEventListener } from './modules/auth';
import { addAppRunEventListener } from '../Background/index'

// onApplicationRun();
addAppRunEventListener();
addAuthEventListener();
