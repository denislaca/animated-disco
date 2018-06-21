import React from 'react'

export const SampleComponent = ({ prop1, prop2, prop3 }) => (
  <div>
    <h3> {prop1} </h3>
    <h2> {prop2} </h2>
    <button onClick={prop3}> Click me </button>
  </div>
)
