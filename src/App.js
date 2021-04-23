import logo from './logo.svg';
import './App.css';
import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Store } from './store/store';

function App() {

  const history = useHistory();
  const [data, SetData] = useContext(Store)
  
  if(localStorage.getItem('logged') === 'false' || data.logged !== true){
    console.log('error de autenticacion')
    history.replace('/login')
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
