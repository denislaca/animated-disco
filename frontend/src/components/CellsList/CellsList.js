import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

export default ({data}) => {
  const getAvailabilityStatus = (d) => {
    const availability = d.current_occupation / d.capacity
    if(availability > 0.67) {
      return 'negative'
    }
    if(availability > 0.34) {
      return 'warning'
    }
    return 'positive'
  }

  return (
    <div>
      <Table celled selectable className='box-shadow' compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell width='5'>Type</Table.HeaderCell>
            <Table.HeaderCell width='3'>Capacity</Table.HeaderCell>
            <Table.HeaderCell width='3'>Current occupation</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map(d => (
            <Table.Row key={`${d.id}-${d.capacity}`}>
              <Table.Cell>{d.id}</Table.Cell>
              <Table.Cell>{d.name}</Table.Cell>
              <Table.Cell>{d.capacity}</Table.Cell>
              <Table.Cell className={getAvailabilityStatus(d)}>{d.current_occupation}</Table.Cell>
              <Table.Cell>
                { /*<Link to={`/cells/view/${d.id}`} href={`/cells/view/${d.id}`}>View</Link>&nbsp;|&nbsp;*/}
                <Link to={`/cells/edit/${d.id}`} href={`/cells/edit/${d.id}`}>Edit</Link>
              </Table.Cell>
            </Table.Row>))
          }
        </Table.Body>
      </Table>
    </div>
  )
}

