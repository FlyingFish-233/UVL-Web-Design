let runningTotal = 0; // 目前缓存的总和
let buffer = "0"; // 屏幕上的数
let previousOperator; // 上一个运算符

const screen = document.querySelector('.screen');

// 格式化浮点数为字符串
function formatFloat(num) {
    if (Math.abs(num) >= 1e15) num = Infinity; // 防止数字过大
    num = Math.round(num * 1e6) / 1e6; // 最多保留6位小数
    let strNum = num.toString();
    if (strNum.includes('.')) strNum = strNum.replace(/\.?0+$/, ''); // 去掉末尾的0和小数点（正则表达式中$确保匹配的内容在字符串结尾）
    return strNum;
  }

function buttonClick(value)
{
    if (value.length != 1) return;
    if (isNaN(value)) handleSymbol(value);
    else handleNumber(value);
    screen.innerText = buffer;
    // console.log("buffer=" + parseFloat(buffer) + ";runningTotal=" + parseFloat(runningTotal));
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

// 点击加减乘除和等于时，将buffer与runningTotal运算
function flushOperation(floatBuffer)
{
    switch (previousOperator) {
        case '+': runningTotal += floatBuffer; break;
        case '−': runningTotal -= floatBuffer; break;
        case '×': runningTotal *= floatBuffer; break;
        case '÷': runningTotal /= floatBuffer; break; // 0÷0=NaN
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
        buttonClick(event.target.innerText); // event.target为用户实际点击的元素
    }); // 为.calc-buttons添加点击事件监听器，在被点击时触发回调函数
}

init();