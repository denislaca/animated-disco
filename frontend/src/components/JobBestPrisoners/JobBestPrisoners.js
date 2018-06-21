import React from 'react'
import { Table } from 'semantic-ui-react'

export default ({ prisoners }) => (
  <div>
    <Table singleLine celled selectable className='box-shadow' compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>First name</Table.HeaderCell>
          <Table.HeaderCell>Count</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {prisoners.map(prisoner =>
          <Table.Row key={prisoner.id}>
            <Table.Cell>{prisoner.first_name}</Table.Cell>
            <Table.Cell>{prisoner.last_name}</Table.Cell>
            <Table.Cell>{prisoner.attendance}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  </div>
)
