window.onload = function () {
  console.log('Loaded site')
  const button = document.getElementById('delete');
  const pathname = window.location.pathname;
  button.onclick = async function() {
    await axios.delete(`http://localhost:8000${pathname}`);
    return window.open('http://localhost:8000');
  }
}
