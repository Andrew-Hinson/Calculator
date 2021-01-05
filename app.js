const screen = document.querySelector('#screen');
const numbers =  document.querySelectorAll('.numbers');
const opperator = document.querySelectorAll('.opp');
const cleared = document.querySelector('#clearbtn');
const equals = document.querySelector('#equals');
const deleteBtn = document.querySelector('#deletebtn');
const decimal = document.querySelector('#dec');
const body = document.querySelector('body');
let hasPressed = false;
let currentOpp;  //+ - * / assigned unicode val
let opperand;
let numToBeEvaled = ''; //string that is eventually parsed into array and spit back out
let total = 0;
let decPress = false;
let keyVal;
//currently it just appends the value to the displayVal variable and shows that in the text
const evalObj = {
    add : (x, y) => x + y,
    sub : (x, y) => x - y,
    mult: (x, y) => x * y,
    div : (x, y) => x / y
};

let concatNum = (currentTotal) => currentTotal.length >= 19 ? Number.parseFloat(currentTotal).toFixed(2) : currentTotal;

let transform = (digit) => {
    let code = digit.charCodeAt()                          
    if((code >= 42 && code <= 45)||(code == 47)){
          code = 35     //something easy to filter
        return String.fromCharCode(code)
    } else {
        return String.fromCharCode(code)
    }
};
let evaluate = () => {
    let myArr = numToBeEvaled.split('')
            .map(i => transform(i))
            .join('')
    if (currentOpp == 43){
        opperand = evalObj.add
    } else if (currentOpp == 45){
        opperand = evalObj.sub
    } else if (currentOpp == 42){
        opperand = evalObj.mult
    } else if (currentOpp == 47){
        opperand = evalObj.div
    }
    let totalArr = myArr
            .split('#')
            .map(i => parseFloat(i))
            .reduce(opperand)
            .toString()
    total = concatNum(totalArr);
    screen.innerText = total;
    numToBeEvaled = total;
    decimal.disabled = false; 
}
let updateNum = () => {
    screen.innerText += keyVal
    numToBeEvaled += keyVal
};

let updateOpp = (element) => {
    if(hasPressed == true){
        evaluate()
    }
    hasPressed = true;
    decimal.disabled = false; 
    currentOpp = keyVal.charCodeAt(0);
    updateNum(element)
};
let deleteOpp = () => {
    let newStr = numToBeEvaled.slice(0, numToBeEvaled.length -1)
    numToBeEvaled = newStr
    total = newStr
    screen.innerText = newStr
}
equals.addEventListener('click', () => {
    evaluate() 
});

cleared.addEventListener('click', () => {
    screen.innerText = '';
    numToBeEvaled = ''
    total = 0;
    currentOpp = 0;
    hasPressed = false;
});

deleteBtn.addEventListener('click', () => {
    deleteOpp()
})

decimal.addEventListener('click', () => {
    decimal.disabled = true;
})

body.addEventListener('click', () => {
    if(numToBeEvaled.length >= 9){
        screen.style.fontSize = '3em';
    } else {
        screen.style.fontSize = '5em';
    }
})
body.addEventListener('keydown', () => {
    if(numToBeEvaled.length >= 9){
        screen.style.fontSize = '3em';
    } else {
        screen.style.fontSize = '5em';
    }
})

document.addEventListener('keydown', (e) => {
    if(e.key >= 0 && e.key <= 9){
        if(numToBeEvaled.length >= 19){
            numbers.attributes.disabled = true;
        }
    keyVal = e.key
    screen.innerText += e.key
    numToBeEvaled += e.key
    }
    if(e.key == 'Backspace'){
        deleteOpp()
    }
    if(e.key == 'Enter'){
        evaluate()
    }
    let oppPress = e.key.charCodeAt()
    if(oppPress >= 42 && oppPress <= 47){
        screen.innerText += e.key
        numToBeEvaled += e.key
        currentOpp = oppPress
    }
});

numbers.forEach((number) => number.addEventListener('click', (numPress) =>{
    if(numToBeEvaled.length >= 19){
        numbers.attributes.disabled = true;
    } 
    keyVal = numPress.target.value
    updateNum(keyVal)
}));

opperator.forEach((opp) => opp.addEventListener('click', (oppClick) => {
    keyVal = oppClick.target.value
    updateOpp(keyVal)
}));

