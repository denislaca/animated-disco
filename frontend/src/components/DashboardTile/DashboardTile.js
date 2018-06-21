import React from 'react'
import { Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const style = {
  fontSize: '16px',
  color: 'black',
  padding: '30px',
  margin: '-15px',
  display: 'flex',
}

export default props => (
  <Segment className={`${props.className} tile`}>
    <Link style={style} to={props.to} href={props.href}>
      {props.children}
    </Link>
  </Segment>

)
