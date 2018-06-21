import React from 'react'
import { Button } from 'semantic-ui-react'

export const redirectBack = () => {
  window.history.back()
}

export default () => (
  <Button color='yellow' size='small' onClick={redirectBack}>Go back</Button>
)
