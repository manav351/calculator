const inputF = document.getElementById('inputField');
const myLabel = document.getElementById('history');
inputF.value = '0';
let firstValue;
let operator;
let secondValue;
let ansFlag = 0;

function inputFunction(value) {
    const currValue = inputF.value;
    if (ansFlag == 1) {
        ansFlag = 0;
        inputFunction('clearall');
        inputFunction(value);
    }
    else if (value == 'clearall') {
        inputF.value = '0';
        firstValue = undefined;
        secondValue = undefined;
        operator = undefined;
        ansFlag = 0;
        myLabel.innerHTML = '0';
        inputF.style.border = "none";
    }
    else if (value == 'backspace') {
        if (currValue.length == 1 || currValue == '0')
            inputF.value = '0';
        else
            inputF.value = currValue.substr(0, currValue.length - 1);

        if (ansFlag == 1)
            firstValue = parseInt(inputF.value, 10);
    }
    else if (value == 0 && currValue == "0")
        5 + 5;
    else if (value != 0 && currValue == '0')
        inputF.value = value;
    else
        inputF.value = currValue + value;
}

function operators(value) {
    if (firstValue == undefined) {
        firstValue = parseInt(inputF.value, 10);
        inputF.value = '0';
        operator = value;
        myLabel.innerHTML = '' + firstValue + ' ' + operator;
        ansFlag = 0;
        inputF.style.border = "none";
    }
    else if (value == '=') {
        if (secondValue == undefined){
            secondValue = parseInt(inputF.value, 10);
            myLabel.innerHTML = myLabel.innerHTML + ' ' + secondValue;
        }
        else{
            myLabel.innerHTML = myLabel.innerHTML + ' ' + operator + ' ' + secondValue;
        }
        calculate();
        inputF.value = firstValue;
        ansFlag = 1;
        inputF.style.border = "1px solid green";
    }
    else {
        // if(secondValue == undefined) 
        if (ansFlag == 0) {
            secondValue = parseInt(inputF.value, 10);
            myLabel.innerHTML = myLabel.innerHTML + ' ' + secondValue + ' ' + value;
            calculate();
        }
        else{
            myLabel.innerHTML = myLabel.innerHTML + ' ' + value;
        }
        operator = value;
        secondValue = undefined;
        inputF.value = '0';
        ansFlag = 0;
        inputF.style.border = "none";
    }
}
function calculate(value) {
    switch (operator) {
        case '+': firstValue += secondValue; break;
        case '-': firstValue -= secondValue; break;
        case '*': firstValue *= secondValue; break;
        case '/': firstValue /= secondValue; break;
        case '%': firstValue %= secondValue; break;
        default: firstValue += secondValue;
    }
}
document.onkeyup = function (e) {
    const value = e.which;
    if (47 < value && value < 58)
        inputFunction(value - 48);
    else if (value > 95 && value < 106)
        inputFunction(value - 96);
    else if (value == 8)
        inputFunction('backspace');
    else if (value == 13)
        operators('=');
    else if (value == 107 || value == 187)
        operators('+');
    else if (value == 109 || value == 189)
        operators('-');
    else if (value == 106 || value == 56)
        operators('*');
    else if (value == 111 || value == 191)
        operators('/');
    else if (value == 53)
        operators('%');
    else if (value == 46 || value == 110)
        inputFunction('clearall');
};