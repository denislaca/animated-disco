import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Header, Button, Table } from 'semantic-ui-react'
import { api } from '../../helpers/fetch'

class Jobs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetch: false,
      data: []
    }
  }

  componentWillMount = async() => {
    this.forceFetch(1)
  }

  forceFetch = from => {
    if(!this.state.fetch) {
      api.get(`/jobs/all`)
        .then(data => {
          this.setState({data: data})
        })
        .then(this.setState({fetch: true}))
    }
  }

  render() {
    const {
      data,
    } = this.state

    return (
      <div className='ui container'>
        <div className='page-header'>
          <Header>Jobs</Header>
          <Link to='/jobs/create' href='/jobs/create'>
            <Button content='Add' icon='plus' labelPosition='right'
                    size='small' color='green'/>
          </Link>
        </div>
        <Table celled selectable className='box-shadow' compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Number of works</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map(d => (

              <Table.Row key={`${d.id}`}>
                <Table.Cell>{d.name}</Table.Cell>
                <Table.Cell>{d.count}</Table.Cell>
                <Table.Cell>
                  <Link to={`/jobs/view/${d.id}`} href={`/jobs/view/${d.id}`}>View</Link>&nbsp;|&nbsp;
                  <Link to={`/jobs/edit/${d.id}`} href={`/jobs/edit/${d.id}`}>Edit</Link>
                </Table.Cell>
              </Table.Row>))
            }
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default connect(state => ({}))(Jobs)
