import React from 'react'
import moment from 'moment'
import { Card, Header } from 'semantic-ui-react'

export default ({reports}) => {
  return (
    <div>
      {reports.map(report =>
        <div key={report.id}>
          <Header as='h3' style={{'margin': '15px 0 5px'}}>
            {moment(report.date)
              .format('DD.MM.YYYY')}
          </Header>
          <Card fluid>
            <Card.Content>
              <Card.Meta>
                {moment(report.date)
                  .fromNow()}
              </Card.Meta>
              <Card.Description>
                {report.description}
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
      )}
    </div>
  )
}
