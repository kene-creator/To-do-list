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
  <div class="item_name">
    <input type="checkbox" class="check" id='item-${i}' />
    <label for='item-${i}' class="task_name">${list.name}</label>
  </div>

  <svg class="icon dot">
    <use href="${icon}#icon-dots-horizontal-triple"></use>
  </svg>
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
    const clicked = e.target.closest('.task_item');
    const listContaniner = clicked.firstElementChild;
    const class1 = clicked.firstElementChild.firstElementChild;
    const class2 = clicked.firstElementChild.lastElementChild;
    const markupCheck = () => {
      return ` <svg class="icon-2">
<use href="${icon}#icon-check"></use>
</svg>`;
    };

    if (e.target.classList.contains('check')) {
      e.target.classList.toggle('hidden');
      class2.classList.toggle('strike');
      listContaniner.insertAdjacentHTML('afterbegin', markupCheck());
    }

    const class3 = clicked.firstElementChild.firstElementChild;

    class3.addEventListener('click', (e) => {
      class1.checked = false;
      class3.classList.toggle('hidden');
      class1.classList.toggle('hidden');
      class2.classList.toggle('strike');
    });

    const class4 = clicked.lastElementChild;
    class4.addEventListener('click', () => {
      clicked.classList.toggle('yellow-1');
    });
  });
});
