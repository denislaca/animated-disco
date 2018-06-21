import React from 'react'
import { SampleComponent } from './sampleComponent'

export const SampleContainer = props => {
  // Some computing being derived from passed props etc.
  const computing = () => props

  return (
    <div>
      <SampleComponent props={computing()} />
    </div>
  )
}
