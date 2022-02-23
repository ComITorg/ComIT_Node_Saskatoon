window.onload = function () {
  console.log('Loaded site')
  const plusButton = document.getElementsByClassName('plus');
  const minusButton = document.getElementsByClassName('minus');
  console.log(plusButton, minusButton)
  const number = document.getElementsByClassName('number');
  const itemPrice = document.getElementsByClassName('itemPrice');
  const total = document.getElementsByClassName('total');
  const plusButtonClickHandler = function() {
    const result = parseInt(number[0].innerHTML) + 1
    const totalResult = parseFloat(itemPrice[0].innerHTML) * result
    number[0].innerHTML = result; 
    total[0].innerHTML = totalResult;
  }
  const minusButtonClickHandler = function() {
    const result = parseInt(number[0].innerHTML) - 1
    const totalResult = parseFloat(itemPrice[0].innerHTML) * result
    number[0].innerHTML = result; 
    total[0].innerHTML = totalResult;
  }
  plusButton[0].addEventListener('click', plusButtonClickHandler);
  minusButton[0].addEventListener('click', minusButtonClickHandler);
}
