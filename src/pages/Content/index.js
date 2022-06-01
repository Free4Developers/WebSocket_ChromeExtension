import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

let ele = document.createElement('div');

ele.style.position = 'fixed';
// ele.style.display = 'inline-block';
ele.style.height = '500px';
ele.style.width = '200px';
ele.style.right = '100px';
ele.style.top = '100px';
ele.style.backgroundColor = 'black';
ele.style.zIndex = 9999;
document.body.appendChild(ele);