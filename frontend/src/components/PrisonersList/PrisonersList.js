import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import { genderOptions } from '../../helpers/constants'

export default ({ data }) => (
  <div>
    <Table celled selectable className='box-shadow' compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Gender</Table.HeaderCell>
          <Table.HeaderCell>Date of birth</Table.HeaderCell>
          <Table.HeaderCell>Permanent residance</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map(d => (
          <Table.Row key={`${d.id}${d.first_name}${d.last_name}`}>
            <Table.Cell>{d.first_name} {d.last_name}</Table.Cell>
            <Table.Cell>{genderOptions[d.gender || 0].text}</Table.Cell>
            <Table.Cell>{new Date(Date.parse(d.date_of_birth)).toLocaleString('en-GB', { timeZone: 'UTC' })}</Table.Cell>
            <Table.Cell>{d.street} {d.street_number} {d.city}, {d.country}</Table.Cell>
            <Table.Cell>
              <Link to={`/prisoners/view/${d.id}`} href={`/prisoners/view/${d.id}`}>View</Link>&nbsp;|&nbsp;
              <Link to={`/prisoners/edit/${d.id}`} href={`/prisoners/edit/${d.id}`}>Edit</Link>
            </Table.Cell>
          </Table.Row>))
        }
      </Table.Body>
    </Table>
  </div>
)
