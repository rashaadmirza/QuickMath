let string = '';
let stringBuffer = '';
let exp = document.querySelector('.calc-exp');
let display = document.querySelector('.calc-dsp');
let buttons = document.querySelectorAll('.calc-btn');

Array.from(buttons).forEach(function(button) {
    button.addEventListener('click', (e) => {
        const value = e.target.innerText;
        if (value === 'C') {
            string = '';            
            exp.value = '';
            display.value = '0';
        }
        else if (value === '←') {
            string = string.slice(0, -1);
            exp.value = string;
            display.value = eval(string);
        }
        else {
            string += value;
            exp.value = string;
            display.value = eval(string);
        }
    });
});
