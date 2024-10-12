import { showButton } from './buy-button.js';
const draggableItems = document.querySelectorAll('.shelf__item');
const dropZone = document.querySelector('.cart__drop-area');
const container = document.querySelector('.cart__content');

let itemId = undefined;
let bagItemCount = 0;
function dragStart(event) {
  itemId = event.target.id;
}

function touchStart(event) {
  event.preventDefault();
  dragStart(event.changedTouches[0]);
}

const removeDraggable = () => {
  draggableItems.forEach((item) => {
    item.removeEventListener('dragstart', dragStart);
    item.removeEventListener('touchstart', touchStart);
  });
  dropZone.removeEventListener('drop', drop);
};

export const setDraggableElements = () => {
  draggableItems.forEach((item) => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('touchstart', touchStart);
    item.addEventListener('click', touchStart);
  });
  dropZone.addEventListener('drop', drop);
};

const createNewDragged = (draggedItem) => {
  const copyItem = draggedItem.cloneNode(true);
  const newLiElement = document.createElement('li');
  newLiElement.classList.add('shelf__item-wrapper');
  newLiElement.appendChild(copyItem);
  container.appendChild(newLiElement);
};

function drop(event) {
  event.preventDefault();
  const draggedItem = document.getElementById(itemId);
  if (draggedItem) {
    createNewDragged(draggedItem);
    bagItemCount++;
    itemId = undefined;
    draggedItem.classList.add('visually-hidden');
  }

  if (bagItemCount === 3) {
    removeDraggable();
    showButton();
  }
}
