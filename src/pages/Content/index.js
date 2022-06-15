import { addAuthEventListener } from './modules/auth';
import { onApplicationRun, addAppRunEventListener } from '../Background/index'

// onApplicationRun();
addAppRunEventListener();
addAuthEventListener();
