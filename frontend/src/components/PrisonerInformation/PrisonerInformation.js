import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Segment, Table, Header, Button } from 'semantic-ui-react'

export default ({ data }) => {
  const prisoner = data
  console.log(prisoner)
  prisoner.gender_name = prisoner.gender ? 'Male' : 'Female'
  prisoner.date_of_birth = moment(prisoner.date_of_birth)
    .format('MM.DD.YYYY')
  const basicAttrs = [
    {
      name: 'First name',
      index: 'first_name',
    },
    {
      name: 'Last name',
      index: 'last_name',
    },
    {
      name: 'Gender',
      index: 'gender_name',
    },
    {
      name: 'Date of birth',
      index: 'date_of_birth',
    },
    {
      name: 'Street',
      index: 'street',
    },
    {
      name: 'Street number',
      index: 'street_number',
    },
    {
      name: 'City',
      index: 'city',
    },
    {
      name: 'Country',
      index: 'country',
    },
  ]
  return (
    <div>
      <Header as='h3' dividing>Basic information</Header>
      <Segment>
        <Table basic='very' celled>
          <Table.Body>
            {basicAttrs.map(attr => (
              <Table.Row key={`${prisoner.id}${prisoner[attr.index]}`}>
                <Table.Cell width={3}>
                  {attr.name}
                </Table.Cell>
                <Table.Cell>
                  <strong>{prisoner[attr.index]}</strong>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
      <Header as='h3' dividing>More details</Header>
      <Segment>
        <Table basic='very' celled>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={3}>
                Description
              </Table.Cell>
              <Table.Cell>
                {prisoner.about}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
      <Link to={'/prisoners/edit/' + prisoner.id}>
        <Button color='green'>Edit</Button>
      </Link>
    </div>
  )
}
