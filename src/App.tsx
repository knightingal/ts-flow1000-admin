import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createElement } from 'react';
import * as React from 'react';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <MdOutlinedButton body={<i>Back</i>}/>
      <MdFilledButton body={<b>Back</b>}/>
    </>
  )
}

function MdOutlinedButton({body}: {body: React.JSX.Element}) {
  return createElement('md-outlined-button', {}, body);
}

function MdFilledButton({body}: {body: React.JSX.Element}) {
  return createElement('md-filled-button', {}, body);
}

export default App
