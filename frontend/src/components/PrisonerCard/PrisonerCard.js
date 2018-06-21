import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

export default ({data}) => {
  const prisoner = data
  return (
    <Card fluid>
      <Image src='/prisoner.png'/>
      <Card.Content>
        <Card.Header>
          {prisoner.first_name + ' ' + prisoner.last_name}
        </Card.Header>
        <Card.Meta>
        <span className='date'>
          {prisoner.gender === 0 ? 'Male' : 'Female'}
        </span>
        </Card.Meta>
        <Card.Description>
          {prisoner.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='bug'/>
          {prisoner.punishments_count} Punishments
        </a>
      </Card.Content>
    </Card>
  )
}
