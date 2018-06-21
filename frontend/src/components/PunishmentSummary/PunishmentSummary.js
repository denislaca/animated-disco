import React from 'react'
import { Segment, Header, Table, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

import './PunishmentSummary.css'

const PunishmentSummary = props => {
  if (props.data.active !== 3) {
    props.historyPush(`/punishments/add/${props.data.active + 1}`)
    return null
  }
  const {
    data: {
      prisoner_info,
      punishment_info,
      cell_info,
    },
    handleSubmit,
  } = props
  return (
    <div>
      <Header as='h3'>Prisoner</Header>
      <Segment>
        <Table basic='very' celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={3}>
                Name
              </Table.Cell>
              <Table.Cell>
                <strong>{`${prisoner_info.first_name || ''} ${prisoner_info.last_name || ''}`}</strong>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
      <Header as='h3'>Punishment</Header>
      <Segment>
        <Table basic='very' celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={3}>
                From
              </Table.Cell>
              <Table.Cell>
                <strong>{punishment_info.from.toString()}</strong>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={3}>
                To
              </Table.Cell>
              <Table.Cell>
                <strong>{punishment_info.to.toString()}</strong>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell width={3}>
                Description
              </Table.Cell>
              <Table.Cell>
                <strong>{punishment_info.description || 'No description for given punishment'}</strong>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
      <Header as='h3'>Cell</Header>
      <Segment>
        <Table basic='very' celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={3}>
                Cell ID
              </Table.Cell>
              <Table.Cell>
                <strong>{`${cell_info || 'No cell info'}`}</strong>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
      <Button color='green' onClick={handleSubmit}>
        Save punishment
      </Button>
    </div>
  )
}

export default connect(state => ({
  data: state.punishment,
}))(PunishmentSummary)
