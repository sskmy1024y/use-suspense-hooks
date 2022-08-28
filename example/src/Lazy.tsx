import React from 'react'
import {Loading} from "./Loading";
import {ListItem} from "./ListItem";

interface Props {
  index: number
}

export const Lazy = ({index}: Props) => {
  return (
    <React.Suspense fallback={<Loading/>}>
      <ListItem index={index}/>
    </React.Suspense>
  );
}
