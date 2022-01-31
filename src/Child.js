import style from './Child.module.scss'
import { useEffect } from 'react';
import axios from 'axios'

function App() {
  useEffect(() => {
    // 
    axios.get("/springTravel/citys?key=f8baa3af96c6fa70c9082538a6dbfd70").then(res => {
      console.log(res);
    })
  })

  return <div className={style.test}>
    Child
  </div>
}

export default App