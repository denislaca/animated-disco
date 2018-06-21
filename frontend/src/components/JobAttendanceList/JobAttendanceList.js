import React from 'react'
import moment from 'moment'
import { Feed, Icon } from 'semantic-ui-react'

export default ({ data, type }) => {
  const attendances = data
  return (
    <Feed>
      {attendances.map(attendance => (
        <Feed.Event key={attendance.id}>
          <Feed.Label>
            <Icon name='plug' size='huge' />
          </Feed.Label>
          <Feed.Content>
            <Feed.Date>
              {moment(attendance.date)
                .fromNow()}
            </Feed.Date>
            <Feed.Summary>
              {(type && type === 'job' && `${attendance.first_name} ${attendance.last_name} worked here.`) || `Prisoner worked as ${attendance.name}`}

            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      ))}
    </Feed>
  )
}
