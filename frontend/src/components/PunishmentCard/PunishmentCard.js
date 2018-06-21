import React from 'react'
import moment from 'moment'
import { Card, Modal, Button, Label, Feed, Divider } from 'semantic-ui-react'
import OffenseForm from '../OffenseForm/OffenseForm'
import './PunishmentCard.css'

export default ({
  data,
  active,
  offenseFormOnSubmit,
  punishmentId,
  deleteOffense,
}) => {
  const punishment = data
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {moment(punishment.from)
            .format('DD.MM.YYYY') + ' - ' +
            moment(punishment.to)
              .format('DD.MM.YYYY')}

          <Label style={{ 'float': 'right' }}>{punishment.offenses_count} offenses</Label>
        </Card.Header>
        <Card.Meta>
          {active ? moment(punishment.to)
            .fromNow() : 'Realesed'}
        </Card.Meta>
        <Card.Description>
          {punishment.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Modal trigger={<Button basic color='teal'>Show more</Button>}>
            <Modal.Header>Offenses taken during given punishment</Modal.Header>
            <Modal.Content scrolling>
              <Feed>
                {punishment.offenses && punishment.offenses.map(x => (
                  <Feed.Event
                    icon='protect'
                    date={moment(x.to).fromNow()}
                    summary={x.description || 'No description found for related offense'}
                  >
                    <Feed.Meta>
                      <Button
                        color='red'
                        onClick={() => deleteOffense(x.id)}
                      >
                        Delete offense
                      </Button>
                    </Feed.Meta>
                  </Feed.Event>
                ))}
              </Feed>
            </Modal.Content>
          </Modal>
          {(active && (
            <Modal trigger={<Button basic color='yellow'>Add offense</Button>}>
              <Modal.Content>
                <OffenseForm
                  onSubmit={offenseFormOnSubmit}
                  initialValues={{
                    from: moment(),
                    to: moment(),
                    punishment_id: punishmentId,
                  }}
                />
              </Modal.Content>
            </Modal>
          )) || null
          }
        </div>
      </Card.Content>
    </Card>

  )
}
