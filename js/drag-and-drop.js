import { showButton } from './buy-button.js';
const draggableItems = document.querySelectorAll('.shelf__item');
const dropZone = document.querySelector('.cart__content-field');
const container = document.querySelector('.cart__content');

let itemId = undefined;
let bagItemCount = 0;
function dragStart(event) {
    itemId = event.target.id;
}

function dragEnd(event) {
  event.target.classList.remove('dragging');
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
  }
const removeDraggable = ()=>{
    draggableItems.forEach((item) => {
        item.removeEventListener('dragstart', dragStart);
        item.removeEventListener('dragend', dragEnd);
        item.removeEventListener('touchstart', touchStart);
      });
      dropZone.removeEventListener('dragenter', dragEnter);
      dropZone.removeEventListener('dragover', dragOver);
      dropZone.removeEventListener('drop', drop);
}
export const setDraggableElements = () => {
  draggableItems.forEach((item) => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
    item.addEventListener('touchstart', touchStart);
    item.addEventListener('click', touchStart);
  });
  dropZone.addEventListener('dragenter', dragEnter);
  dropZone.addEventListener('dragover', dragOver);
  dropZone.addEventListener('drop', drop);
};

function drop(event) {
  event.preventDefault();
  const draggedItem = document.getElementById(itemId);
  if (draggedItem) {
    const item = document.createElement('li');
    item.classList.add('shelf__item-wrapper')
    item.appendChild(draggedItem)
    container.appendChild(item);
    bagItemCount++;
    itemId = undefined;
  }

  if(bagItemCount===3){
    removeDraggable();
    showButton();
  }
}

