import { addAuthEventListener } from './modules/auth';
import { onApplicationRun, addAvailableAppEventListener } from '../Background/index'
onApplicationRun();
addAvailableAppEventListener();
addAuthEventListener();
