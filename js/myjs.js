//----open and close menu-burger-----------
const navOpen = document.querySelector('.nav-open');
const burgerMenu = document.querySelector('.burger-menu');
const logoBurgerMenu = document.querySelector('.burger-menu .logo')
const navClose = document.querySelector('.nav-close');
const navItem = document.querySelectorAll('.nav__burger a');


navOpen.addEventListener('click', function () {
   burgerMenu.classList.add('burger-menu--active');
   docScroll();
})

logoBurgerMenu.addEventListener('click', function () {
   burgerMenu.classList.remove('burger-menu--active');
   this.parentElement.setAttribute('href', '#');
   docScroll();
})

navClose.addEventListener('click', function () {
   burgerMenu.classList.remove('burger-menu--active');
   docScroll();
})


//------active menu-item-----hover эффект-------
// navItem.forEach(function (item) {
//    item.addEventListener('click', function () {
//       this.classList.add('nav--active');

//    })
//    item.addEventListener('mouseover', function () {
//       this.classList.add('nav--active');
//    })
//    item.addEventListener('mouseout', function () {
//       this.classList.remove('nav--active');
//    })
// })


//выбираем каждую ссылку
navItem.forEach(function (item) {
   //задаем ей событие клик
   item.addEventListener('click', function (event) {
      //проходим по массиву ссылок уже при клике и убираем класс nav--active, 
      //а ссылке, по которой происходит событие клик, добавляем класс nav--active и закрываем меню
      navItem.forEach(function (i) {
         i.classList.remove('nav--active');
         event.target.classList.add('nav--active');
         burgerMenu.classList.remove('burger-menu--active');
         docScroll();
      })

   })

})

//--------запрещаем/разрешаем скролл страницы при переключкнии меню------------------
function docScroll() {
   if (burgerMenu.classList.contains('burger-menu--active')) {
      document.body.style.cssText = 'overflow:hidden;'
      document.querySelector('html').style.cssText = 'overflow:hidden;'
   } else {
      document.body.style.cssText = 'overflow:scroll;'
      document.querySelector('html').style.cssText = 'overflow:scroll;'
      //document.querySelector('html').style.cssText = 'scroll-behavior:smooth;'
   }
}


//-----------форма заказа-------------

const btnProduct = document.querySelectorAll('.product__btn');
const formWindow = document.querySelector('.formoforder__inner');
const btnWindowClose = document.querySelector('.nav-close--black');
const formImg = document.querySelector('.formoforder__img')
const plusBtn = document.getElementById('plus')
const minusBtn = document.getElementById('minus')
const num = document.getElementById('num')
let price = document.getElementById('price')
const formPrice = document.querySelectorAll('.p-price')
const formTitle = document.querySelector('.formoforder__title')

function scrollTop() {
   const scrollY = document.body.style.top;
   document.body.style.position = '';
   document.body.style.top = '';
   window.scrollTo(0, parseInt(scrollY || '0') * -1);
}
//-------закрыаем окно по щелчку на крестике запоминая позицию по скроллу--------
btnWindowClose.onclick = () => {
   formWindow.classList.remove('formoforder__inner--open');
   scrollTop();
   price.innerHTML = `0₴`
   formImg.setAttribute('src', '');
   num.innerText = '1';
}


btnProduct.forEach(function (item) {
   item.addEventListener('click', function (e) {
      //----открытие модального окна с запретом прокрутки основного документа, запоминаем на каком месте открываем(скролл по у)----
      e.stopPropagation();
      const windowScroll = window.scrollY;
      formWindow.classList.add('formoforder__inner--open');
      document.body.style.position = 'fixed';
      document.body.style.top = `-${windowScroll}px`;

      //-----работа с ценой и количеством товара------------
      if (item.contains(e.target)) {
         price.innerHTML = `${parseInt(e.target.parentElement.querySelector('.p-price').innerHTML)}₴`
         formImg.setAttribute('src', `${e.target.parentElement.querySelector('.product-img').getAttribute('src')}`);
         formImg.setAttribute('srcset', `${e.target.parentElement.querySelector('.product-img').getAttribute('srcset')}`)
         formTitle.innerHTML = `${e.target.parentElement.querySelector('.product__title').innerHTML}`;
      }

      const priceStart = parseInt(price.innerHTML);
      let numValue = +num.innerText; //плюс переводит в число значение после него
      num.innerText = '1';


      plusBtn.addEventListener('click', function () {
         numValue++;
         const totalPrice = priceStart * numValue;
         price.innerHTML = `${totalPrice}₴`;
         num.innerText = `${numValue}`;
      })
      minusBtn.addEventListener('click', function () {
         if (numValue > 0) {
            numValue--;
            const totalPrice = priceStart * numValue;
            price.innerHTML = `${totalPrice}₴`;
            num.innerText = `${numValue}`;
         } else {
            numValue = 0
         }
      })
   })
})

//-------------закрываем окно по щелчку на пустом месте при этом остаемся на том же уровне по скроллу
document.onclick = function (event) {
   if (!formWindow.contains(event.target)) {
      formWindow.classList.remove('formoforder__inner--open');
      scrollTop();
      price.innerHTML = `0₴`
      formImg.setAttribute('src', '');
      num.innerText = '1';
   }
}








