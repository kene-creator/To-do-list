import '../styles/style.css';
import icon from '../../img/icon.svg';

const list = [
  {
    description: 'Do the Laundry',
    completed: true,
    index: '',
  },
  {
    description: 'Read for my Exam',
    completed: true,
    index: '',
  },
  {
    description: 'Arrange my room',
    completed: true,
    index: '',
  },
  {
    description: 'Fix my telelvision',
    completed: true,
    index: '',
  },
];

for (let i = 0; i < list.length; i++) {
  list[i].index = i;
}

const generateMarkup = (list, i) => {
  return `<li class="task_item">
  <div class="item_name">
    <input type="checkbox" class="check" id='item-${i}' />
    <label for='item-${i}' class="task_name">${list.description}</label>
  </div>

  <svg class="icon">
    <use href="${icon}#icon-dots-horizontal-triple"></use>
  </svg>
</li>`;
};

const render = list.map(generateMarkup).join('');

document.querySelector('.task_list').innerHTML = render;

console.log(list);
