import { printLine } from './modules/print';
import { onApplicationRun } from '../Background/index'
console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

// 페이지 로드 시 div 생성
onApplicationRun();