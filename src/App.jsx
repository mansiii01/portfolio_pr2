import React from 'react'
import { Provider } from "react-redux";
import { store } from './app/Store';
import Redux from './redux/Redux';


export default function App() {
  return (
    <div>
      <Provider store={store}>
        <Redux/>
      </Provider>
    </div>
  )
}