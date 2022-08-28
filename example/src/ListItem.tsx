// package could be installed by `yarn artifact` in project root
import React from 'react'
import {useSuspenseState} from "use-suspense";

interface Props {
  index: number
}

export const ListItem = ({index}: Props) => {
  const [suspenseText, resetCache] = useSuspenseState(`lazy-component-${index}`, async () => new Promise<string>((resolve) => {
    setTimeout(() => resolve(`hello, ${index}`), 1000)
  }))

  return (
    <div>
      <div>{suspenseText}</div>
      <button onClick={resetCache}>{"Cache clear"}</button>
    </div>
  )
}
