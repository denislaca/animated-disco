import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dimmer, Loader, Header, Button, Pagination } from 'semantic-ui-react'
import { api } from '../../helpers/fetch'
import { CELLS_FETCH } from './reducer'
import { cellsSelector } from './selector'
import CellsList from '../../components/CellsList/CellsList'

class Cells extends Component {
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
    await this.fetchTotalPages()
    this.forceFetch(1)
  }

  fetchTotalPages = async() => {
    await api.get(`/cells/pages/`)
      .then(data => this.setState({
        totalPages: data,
      }))
  }

  forceFetch = from => {
    if(!this.state.fetch) {
      api.get(`/cells/list/${from}`)
        .then(data => {
          this.props.dispatch({
            type: CELLS_FETCH,
            payload: data,
          })
          this.setState({fetch: true})
        })
    }
  }

  forceFetchCells = async from => {
    await this.setState({fetch: false})
    this.forceFetch(from)
  }

  render() {
    const {
      cellsData,
    } = this.props

    return (
      <div>
        {!this.state.fetch ?
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer> : ''}
        <div className='ui container'>
          <div className='page-header'>
            <Header>Cells</Header>
            <Button.Group size='small' floated='left'>
              <Button className='active'>List</Button>
              <Button as={Link} to='cells/types'>Types</Button>
            </Button.Group>
            <Link to='/cells/create' href='/cells/create'>
              <Button
                content='Add'
                icon='plus'
                labelPosition='right'
                size='small'
                color='green'
              />
            </Link>
          </div>
          <CellsList data={cellsData}/>
          <div className='pagination-div'>
            <Pagination
              className='pagination'
              activePage={this.state.activePage}
              firstItem={null}
              lastItem={null}
              pointing
              secondary
              totalPages={this.state.totalPages}
              onPageChange={(e, data) => {
                this.setState({activePage: data.activePage})
                this.forceFetchCells(data.activePage)
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  cellsData: cellsSelector(state),
}))(Cells)
