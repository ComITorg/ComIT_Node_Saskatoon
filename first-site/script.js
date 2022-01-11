window.onload = function() {
  var button = document.querySelector('button');
  var button2 = document.querySelector('.other');

  button.addEventListener('click', function() {
    alert("Let's Rock!!");
  });
  
  button2 .addEventListener('click', function() {
    alert("Let's Rock again!!!!!");
  });
}