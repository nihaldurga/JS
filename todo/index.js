let i=document.getElementById('li');
let main=document.getElementById('main');
let button=document.getElementById('btn');
let input=document.getElementById('text');
let count = 0;
let di=document.createElement('div');
main.appendChild(di);
let p1=document.createElement('p');
di.appendChild(p1);

function addItem() {

    if (input.value.trim() !== '') {

        let listt = document.createElement('li');
        listt.textContent = input.value;

        let btn = document.createElement('button');
        btn.textContent = 'remove';

        btn.className = 'btnn';
        btn.classList.add('space');

        btn.addEventListener('click', () => {
            listt.remove();
        });

        listt.appendChild(btn);
        i.appendChild(listt);

        input.value = '';
    }
}

button.addEventListener('click', addItem);

input.addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {
        addItem();
    }

});