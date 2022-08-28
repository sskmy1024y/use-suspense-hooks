import React, {useMemo, useState} from 'react';
import {Lazy} from "./Lazy";

function App() {
  const [count, setCount] = useState(1)

  const list = useMemo(() => ([...(new Array(count))].fill("")),[count])


  return (
    <div>
      {list.map((_, index) => (
        <Lazy key={index} index={index} />
      ))}
      <button onClick={() => setCount(p => p + 1)}>{"Add item"}</button>
    </div>
  )
}

export default App;
