
function cat1 (parameter) {
  console.log('cat:', parameter)
}

const cat2 = function(parameter) {
  console.log('cat:', parameter)
}

const cat3 = (parameter) => {
  console.log('cat:', parameter)
}

console.log(cat1(hi));
console.log(cat2(hi));
console.log(cat3(hi));