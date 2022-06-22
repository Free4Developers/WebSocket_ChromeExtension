import { addAuthEventListener } from './modules/auth';
import { addAppRunEventListener } from '../Background/index'

addAppRunEventListener();
addAuthEventListener();
