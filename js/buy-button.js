const buyButton = document.querySelector('.cart__button');

const handleButtonClick = ()=> buyButton.addEventListener('click', ()=>{
    console.log(buyButton)
    window.location.href = "https://lavka.yandex.ru/";
});

export const showButton = ()=> {
    buyButton.classList.remove('hidden');
    handleButtonClick();
};


