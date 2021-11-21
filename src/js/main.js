import 'core-js/stable';

const darkModeBtn = document.querySelector('.calculator__result--darkmode');
const calcContainer = document.querySelector('.calculator');
const calcReultView = document.querySelector('.calculator__result');
const circle = document.querySelectorAll('.circle');
const darkModeIcon = document.querySelector('.calculator__result--darkmode');

let numberOperation = '';
let equalPressed = false;

const number = document.querySelectorAll('.number');
const operation = document.querySelectorAll('.operation');

const clear = document.querySelector('.clear');
const remove = document.querySelector('.remove');
const equal = document.querySelector('.equal');

const operationView = document.querySelector('.calculator__result--operation');
const resultView = document.querySelector('.calculator__result--answer');

const calculatorHeading = document.querySelector(
  '.calculator__result--heading'
);

const calcChange = {
  '÷': '/',
  '×': '*',
  '%': '*1/100*',
};

const calcOperation = ['÷', '×', '+', '-', '%'];

const replaceOperation = numberOperation =>
  numberOperation.replace(/÷|×|%/gi, function (matched) {
    return calcChange[matched];
  });

const addRemoveClass = (selector, add, className) =>
  add === 'add'
    ? selector.classList.add(`${className}`)
    : selector.classList.remove(`${className}`);

const textContent = (selector, value) => (selector.textContent = value);

clear.addEventListener('click', function () {
  numberOperation = '';
  textContent(operationView, '');
  textContent(resultView, '');
  if (darkModeBtn.children[0].classList.contains('fa-sun')) {
    addRemoveClass(operationView, 'remove', 'result-view');
    addRemoveClass(resultView, 'remove', 'operation-view');
  } else {
    addRemoveClass(operationView, 'remove', 'light-result-view');
    addRemoveClass(resultView, 'remove', 'light-operation-view');
  }
  calculatorHeading.classList.remove('heading-hidden');
});

equal.addEventListener('click', function () {
  if (!resultView.textContent) return;
  equalPressed = true;

  if (darkModeBtn.children[0].classList.contains('fa-sun')) {
    addRemoveClass(operationView, 'remove', 'light-result-view');
    addRemoveClass(resultView, 'remove', 'light-operation-view');
    addRemoveClass(operationView, 'add', 'result-view');
    addRemoveClass(resultView, 'add', 'operation-view');
  } else {
    addRemoveClass(operationView, 'add', 'light-result-view');
    addRemoveClass(resultView, 'add', 'light-operation-view');
    addRemoveClass(operationView, 'remove', 'result-view');
    addRemoveClass(operationView, 'remove', 'operation-view');
  }
});

remove.addEventListener('click', function () {
  if (numberOperation.length === 1)
    calculatorHeading.classList.remove('heading-hidden');

  if (equalPressed) equalPressed = false;
  const numberResult = [...numberOperation];
  numberResult.splice(-1);
  numberOperation = numberResult.join('');
  textContent(operationView, numberResult.join(''));

  const percentage = numberResult.slice(-1).join('') !== '%';

  while (
    calcOperation.includes(...numberResult.slice(-1)) &&
    numberResult.slice(-1).join('') !== '%'
  )
    numberResult.splice(-1);

  let numberReplace = replaceOperation(numberResult.join(''));

  numberReplace =
    [...numberReplace].slice(-1).join('') === '*'
      ? [...numberReplace].slice(0, -1).join('')
      : numberReplace;

  if (darkModeBtn.children[0].classList.contains('fa-sun')) {
    addRemoveClass(operationView, 'remove', 'result-view');
    addRemoveClass(resultView, 'remove', 'operation-view');
  } else {
    addRemoveClass(operationView, 'remove', 'light-result-view');
    addRemoveClass(resultView, 'remove', 'light-operation-view');
  }

  if (!isNaN(+numberReplace) && percentage) {
    textContent(resultView, '');
    return;
  }

  textContent(resultView, Number(eval(numberReplace).toFixed(10)));
});

number.forEach(number =>
  number.addEventListener('click', function (e) {
    calculatorHeading.classList.add('heading-hidden');
    if (equalPressed) {
      equalPressed = false;
      numberOperation = '';
      textContent(resultView, '');
      addRemoveClass(operationView, 'remove', 'result-view');
      addRemoveClass(resultView, 'remove', 'operation-view');
    }
    numberOperation += e.target.textContent;

    const numberReplace = replaceOperation(numberOperation);

    textContent(operationView, numberOperation);

    if (!isNaN(+numberReplace)) {
      textContent(resultView, '');
      return;
    }

    textContent(resultView, Number(eval(numberReplace).toFixed(10)));
  })
);

operation.forEach(operation =>
  operation.addEventListener('click', function (e) {
    if (equalPressed) {
      equalPressed = false;
      numberOperation = resultView.textContent + e.target.textContent;
      textContent(resultView, '');
      addRemoveClass(operationView, 'remove', 'result-view');
      addRemoveClass(resultView, 'remove', 'operation-view');
    }
    if (
      (numberOperation.length < 1 || numberOperation.slice(0) === '-') &&
      calcOperation.includes(e.target.textContent) &&
      e.target.textContent !== '-'
    )
      return;

    const numberResult = [...numberOperation];

    while (
      calcOperation.includes(...numberResult.slice(-1)) &&
      numberResult.length > 1 &&
      (e.target.textContent != '-' ||
        numberResult.slice(-1).join('') === '-' ||
        numberResult.slice(-1).join('') === '+')
    )
      numberResult.splice(-1);
    numberOperation = numberResult.join('');
    numberOperation += e.target.textContent;
    textContent(operationView, numberOperation);

    if ([...numberOperation].slice(-1).join('') === '%') {
      let numberReplace = replaceOperation(numberOperation);
      numberReplace =
        [...numberReplace].slice(-1).join('') === '*'
          ? [...numberReplace].slice(0, -1).join('')
          : numberReplace;
      textContent(resultView, Number(eval(numberReplace).toFixed(10)));
    }
  })
);

darkModeBtn.addEventListener('click', function (e) {
  const target = e.target.closest('.fa-sun') || e.target.closest('.fa-moon');
  const markUp = target.classList.contains('fa-sun')
    ? '<i class="fas fa-moon"></i>'
    : '<i class="fas fa-sun"></i> ';
  if (!target) return;
  if (darkModeBtn.children[0].classList.contains('fa-moon') && equalPressed) {
    addRemoveClass(operationView, 'remove', 'light-result-view');
    addRemoveClass(resultView, 'remove', 'light-operation-view');
    addRemoveClass(operationView, 'add', 'result-view');
    addRemoveClass(resultView, 'add', 'operation-view');
  }
  if (darkModeBtn.children[0].classList.contains('fa-sun') && equalPressed) {
    addRemoveClass(operationView, 'add', 'light-result-view');
    addRemoveClass(resultView, 'add', 'light-operation-view');
    addRemoveClass(operationView, 'remove', 'result-view');
    addRemoveClass(operationView, 'remove', 'operation-view');
  }

  calcContainer.classList.toggle('dark-mode');
  calcReultView.classList.toggle('dark-mode-result');

  circle.forEach(circle => circle.classList.toggle('dark-mode-result'));
  darkModeIcon.innerHTML = '';
  darkModeIcon.insertAdjacentHTML('afterbegin', markUp);
});
