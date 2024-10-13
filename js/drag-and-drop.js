import { showButton } from './buy-button.js';
const draggableItems = document.querySelectorAll('.shelf__item');
const dropZone = document.querySelector('.cart__drop-area');
const container = document.querySelector('.cart__content');

let itemId = undefined;
let isDragging = false;
let bagItemCount = 0;
function dragStart(event) {
  itemId = event.target.id;
}

function dragEnter(event) {
  event.preventDefault();
}

function dragOver(event) {
  event.preventDefault();
}

function touchStart(event) {
  event.preventDefault();
  dragStart(event.changedTouches[0]);
  isDragging = true;
}
function touchEnd(event) {
  event.preventDefault();
  isDragging = false;
  const draggedItem = document.getElementById(itemId);
  if (draggedItem) {
    createNewDragged(draggedItem);
    bagItemCount++;
    itemId = undefined;
    draggedItem.style.opacity=0;
  }
  if (bagItemCount === 3) {
    removeDraggable();
    showButton();
  }
}

function touchMove() {
  if (isDragging) {
    const draggedItem = document.getElementById(itemId);
    draggedItem.style.opacity = 0.25;
  }
}

const removeDraggable = () => {
  draggableItems.forEach((item) => {
    item.removeEventListener('dragstart', dragStart);
    item.removeEventListener('touchstart', touchStart);
    item.addEventListener('touchmove', touchMove);
    item.removeEventListener('touchend', touchEnd);
  });
  dropZone.removeEventListener('dragenter', dragEnter);
  dropZone.removeEventListener('dragover', dragOver);
  dropZone.removeEventListener('drop', drop);
};

export const setDraggableElements = () => {
  draggableItems.forEach((item) => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('touchstart', touchStart);
    item.addEventListener('touchmove', touchMove);
    item.addEventListener('touchend', touchEnd);
    item.addEventListener('click', touchStart);
  });
  dropZone.addEventListener('dragenter', dragEnter);
  dropZone.addEventListener('dragover', dragOver);
  dropZone.addEventListener('drop', drop);
};

const createNewDragged = (draggedItem) => {
  const copyItem = draggedItem.cloneNode(true);
  copyItem.style.opacity = 1;
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
