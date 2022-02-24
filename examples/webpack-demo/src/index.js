import './main.css';

function render() {
  const rootEle = document.getElementById('root');
  const div = document.createElement('div');

  div.innerHTML = 'Hello World2!';
  rootEle.appendChild(div);
}

render();
