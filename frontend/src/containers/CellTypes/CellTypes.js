import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dimmer, Loader, Header, Button, Table } from 'semantic-ui-react'
import { api } from '../../helpers/fetch'
import { CELL_TYPES_FETCH } from './reducer'
import { cellTypesSelector } from './selector'

class CellTypes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetch: false,
      totalPages: 0,
      activePage: 1,
      type: 'all',
    }
  }

  componentWillMount = async() => {
    this.forceFetch(1)
  }

  forceFetch = async from => {
    await this.setState({fetch: false})
    if(!this.state.fetch) {
      api.get(`/cells/types/list`)
        .then(data => {
          this.props.dispatch({
            type: CELL_TYPES_FETCH,
            payload: data,
          })
          this.setState({fetch: true})
        })
    }
  }

  render() {
    const {
      cellTypesData,
    } = this.props

    return (
      <div className='ui container'>
        {!this.state.fetch ?
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer> : ''}
        <div className='page-header'>
          <Header>Cells</Header>
          <Button.Group size='small' floated='left'>
            <Button as={Link} to='/cells'>List</Button>
            <Button className='active'>Types</Button>
          </Button.Group>
          <Link to='/cells/types/create' href='/cell/types/create'>
            <Button
              content='Add'
              icon='plus'
              labelPosition='right'
              size='small'
              color='green'
            />
          </Link>
        </div>
        <Table celled selectable className='box-shadow' compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Cell count</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cellTypesData !== undefined ? cellTypesData.map(d => (
              <Table.Row key={`${d.id}`}>
                <Table.Cell>{d.name}</Table.Cell>
                <Table.Cell>{d.count}</Table.Cell>
                <Table.Cell>
                  <Link to={`/cells/types/edit/${d.id}`} href={`/cells/types/edit/${d.id}`}>Edit</Link>
                </Table.Cell>
              </Table.Row>)) : ''
            }
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default connect(state => ({
  cellTypesData: cellTypesSelector(state),
}))(CellTypes)
