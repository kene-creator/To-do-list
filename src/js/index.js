import '../styles/style.css';
import icon from '../../img/icon.svg';
import * as add from './add';
import * as store from './store';

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const container = document.querySelector('.task_list');

const list = [];

for (let i = 0; i < list.length; i++) {
  list[i].index = i;
}

const generateMarkup = (list, i) => {
  return `
  <li class="task_item">
  <div class="task_contianer">
  <div class="item_name">
  <input type="checkbox" class="check" id='item-${i}' />
  <label for='item-${i}' class="task_name">${list.name}</label>
</div>

<svg class="icon dot">
  <use href="${icon}#icon-dots-horizontal-triple"></use>
</svg>
  </div>
 
</li>`;
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const listName = input.value;
  if (listName === null || listName === '') return;

  let obj = {
    name: listName,
    description: true,
    id: list.length,
  };

  input.value = null;
  list.push(obj);

  add.addToLocale(list);

  const render = list.map(generateMarkup).join('');
  container.innerHTML = render;
});

window.addEventListener('load', (e) => {
  const locale = store.getList();
  list.push(...locale);
  const renderLocale = list.map(generateMarkup).join('');
  container.innerHTML = renderLocale;
  // const remove = document.querySelectorAll('.dot');

  // remove.forEach((i) => {
  //   i.addEventListener('click', function (e) {
  //     // document.querySelector('.task_item').classList.toggle('yellow-1');
  //     const item = document.querySelectorAll('.task_item');
  //     item.forEach((i) => {
  //       i.classList.toggle('yellow-1');
  //     });
  //   });
  // });

  document.addEventListener('click', (e) => {
    const clicked = e.target.closest('.task_contianer');
    const itemContainer = clicked.parentElement;
    const listContaniner = clicked.firstElementChild;
    const inputEle = clicked.firstElementChild.firstElementChild;
    const labelEle = clicked.firstElementChild.lastElementChild;
    const markupCheck = () => {
      return ` <svg class="icon-2">
<use href="${icon}#icon-check"></use>
</svg>`;
    };

    console.log(inputEle);

    if (e.target.classList.contains('check')) {
      e.target.classList.add('hidden');
      // labelEle.classList.toggle('strike');
    }

    if (e.target.classList.contains('icon-2')) {
      e.target.classList.add('hidden');
    }

    listContaniner.insertAdjacentHTML('afterbegin', markupCheck());

    const svgEle = clicked.firstElementChild.firstElementChild;

    svgEle.addEventListener('click', (e) => {
      inputEle.checked = false;

      svgEle.classList.toggle('hidden');
      inputEle.classList.toggle('hidden');

      labelEle.classList.toggle('strike');
    });

    labelEle.addEventListener('click', function (e) {
      inputEle.checked = false;
      // e.target.classList.toggle('strike');
    });

    const class4 = clicked.lastElementChild;
    class4.addEventListener('click', () => {
      itemContainer.classList.toggle('yellow-1');
    });
  });
});
