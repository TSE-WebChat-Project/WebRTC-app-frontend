import React, { useState } from 'react'
let variants = ["Click me!", "Click me too!", "Pls click me!"];

export default function MyButton() {
  const [textId, setTextId] = useState(0);
  return (
    <button onClick={()=>{setTextId((textId) => Math.floor(Math.random() * variants.length))}}>{variants[textId]}</button>
  )
}
