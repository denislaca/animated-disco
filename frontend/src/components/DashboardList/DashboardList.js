import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

import './DashboardList.css'

export default props => (
  <div className={props.className}>
    <Table selectable className='box-shadow' size='small' sortable>
      <Table.Header>
        <Table.Row >
          {props.headers && props.headers.map(header => <Table.HeaderCell key={header}>{header}</Table.HeaderCell>)}
        </Table.Row>
      </Table.Header>
      <Table.Body collapsing='true'>
        {props.data && props.data.map(data => (
          <Table.Row key={`${data[props.translate[0]]}${data[props.translate[1]]}`}>
            {props.translate && props.translate.map(desc => (
              <Table.Cell key={data[desc]}>{data[desc]}</Table.Cell>
            ))}
            <Table.Cell>
              <Link to={`/prisoners/view/${data.id}`} href={`/prisoners/view/${data.id}`}>View</Link>
            </Table.Cell>
          </Table.Row>
          ))
        }
      </Table.Body>
    </Table>
  </div>
)
