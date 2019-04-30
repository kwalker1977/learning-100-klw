
import './styles.css';
import { add, subtract, multiply } from './math';


const num1 = document.getElementById('num1') as HTMLInputElement;
const num2 = document.getElementById('num2') as HTMLInputElement;
const addButton = document.getElementById('add') as HTMLInputElement;
const answer = document.getElementById('answer');
const subAnswer = document.getElementById('subAnswer');
const multAnswer = document.getElementById('multAnswer');

function doMath() {
    const n1 = num1.valueAsNumber;
    const n2 = num2.valueAsNumber;

    answer.innerText = ("Add: " + add(n1, n2)).toString();
    subAnswer.innerText = ("Subtract: " + subtract(n1, n2)).toString();
    multAnswer.innerText = ("Multiply: " + multiply(n1, n2)).toString();
}

addButton.addEventListener('click', doMath);
