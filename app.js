const screen = document.querySelector('#screen');
const numbers =  document.querySelectorAll('.numbers');
const opperator = document.querySelectorAll('.opp');
const cleared = document.querySelector('#clearbtn');
const equals = document.querySelector('#equals');

let currentOpp;
let opperand;
let numToBeEvaled = ''; //string that is eventually parsed into array and spit back out
let total = 0;
//currently it just appends the value to the displayVal variable and shows that in the text
const evalObj = {
    add : (x, y) =>  x + y,
    sub : (x, y) => x - y,
    mult: (x, y) => x * y,
    div : (x, y) => x / y
}

let updateNum = (element) => {
      //add evaluation to this function (ongoing evaluation)    
    screen.innerText += parseInt(element.target.value);
    numToBeEvaled += element.target.value
    console.log(numToBeEvaled)
}
let updateOpp = (element) => {
    screen.innerText += element.target.value
    currentOpp = element.target.value.charCodeAt(0)
    numToBeEvaled += element.target.value
}

equals.addEventListener('click', () => {
    let numArr = numToBeEvaled.split(/[^\w\s]|_/g)
    if (currentOpp == 43){
        opperand = evalObj.add
    } else if (currentOpp == 45){
        opperand = evalObj.sub
    } else if (currentOpp == 42){
        opperand = evalObj.mult
    } else if (currentOpp == 47){
        opperand = evalObj.div
    }
    let totalArr = numArr
        .map(i => parseInt(i))
        .reduce(opperand);

    total = totalArr;
    screen.innerText = totalArr;
    numToBeEvaled = total   //needs to be 
})

cleared.addEventListener('click', () => {
    screen.innerText = '';
    numToBeEvaled = ''
    total = 0;
});
//

numbers.forEach((number) => number.addEventListener('click', updateNum));

opperator.forEach((opp) => opp.addEventListener('click', updateOpp));




// switch(currentOpp){
//     case 43: (x, y) =>  x + y; //add
//     break; 
//     case 45: (x, y) => x - y; //subtract
//     break; 
//     case 42: (x, y) => x * y; //multiply
//     break; 
//     case 47: (x, y) => x / y; //divide
// }

