let text = document.querySelector('.textarea');
let buttons = document.querySelectorAll('.btn');

let expression = '';

buttons.forEach((button) => {

    button.addEventListener('click', () => {

        let value = button.textContent;

        // Numbers and decimal
        if ((value >= '0' && value <= '9') || value === '.') {
            expression += value;
            text.value = expression;
        }

        // Operators
        if (value === '+' || value === '-' || value === '*' || value === '/') {

            expression += value;
            text.value = expression;
        }

        // Equal
        if (value === '=') {

            try {
                let answer = eval(expression);

                text.value = answer;
                expression = String(answer);

            } catch (error) {

                text.value = 'Error';
                expression = '';

            }
        }

        // Clear
        if (value === 'ce') {

            expression = '';
            text.value = '';

        }

    });

});