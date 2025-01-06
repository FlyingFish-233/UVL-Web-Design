let runningTotal = 0;
let buffer = "0"; //屏幕上的数
let previousOperator;

const screen = document.querySelector('.screen');

function formatFloat(num) {
    if (Math.abs(num) >= 1e15) num = Infinity;
    num = Math.round(num * 1e6) / 1e6;
    let strNum = num.toString();
    if (strNum.includes('.')) strNum = strNum.replace(/\.?0+$/, ''); // 去掉末尾的 0 和小数点（如果小数点后没有数字）
    return strNum;
  }

function buttonClick(value)
{
    if (value.length != 1) return;
    if (isNaN(value)) handleSymbol(value);
    else handleNumber(value);
    screen.innerText = buffer;
    console.log("buffer:" + parseFloat(buffer) + ";" + parseFloat(runningTotal));
}

function handleSymbol(symbol)
{
    switch (symbol) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator == null)
                buffer = formatFloat(buffer);
            else {
                flushOperation(parseFloat(buffer));
                buffer = formatFloat(runningTotal);
                runningTotal = 0;
            }
            break;
        case '←':
            if (buffer.length == 1) buffer = "0";
            else buffer = buffer.slice(0, buffer.length - 1);
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
        case '.':
            if (!buffer.includes(".")) buffer += '.';
            break;
    }
}

function handleMath(symbol)
{
    let floatBuffer = parseFloat(buffer);
    if (previousOperator == null) runningTotal = floatBuffer; 
    else flushOperation(floatBuffer);
    previousOperator = symbol;
    buffer = "0";
}

function flushOperation(floatBuffer)
{
    switch (previousOperator) {
        case '+': runningTotal += floatBuffer; break;
        case '−': runningTotal -= floatBuffer; break;
        case '×': runningTotal *= floatBuffer; break;
        case '÷': runningTotal /= floatBuffer; break;
    }
    previousOperator = null;
}

function handleNumber(strNum)
{
    if (buffer == "0") buffer = strNum;
    else buffer += strNum;
}

function init()
{
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    });
}

init();