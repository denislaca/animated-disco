import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Header, Input, Button, Pagination, Dimmer, Loader } from 'semantic-ui-react'
import { api } from '../../helpers/fetch'
import { PRISONERS_FETCH, REMOVE_ALL_PRISONERS } from './reducer'
import { prisonersSelector } from './selector'
import PrisonersList from '../../components/PrisonersList/PrisonersList'

import './prisoners.css'

class Prisoners extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetch: false,
      loading: true,
      totalPages: 0,
      activePage: 1,
      type: 'all',
    }
  }

  componentDidMount = async () => {
    this.setState({ loading: true })
    await this.fetchTotalPages()
    this.forceFetch(1)
    this.setState({ loading: false })
  }

  fetchTotalPages = async () => {
    await api.get(`/prisoners_pages/${this.state.type}`)
      .then(data => this.setState({
        totalPages: data,
      }))
  }

  forceFetch = from => {
    if (!this.state.fetch) {
      api.get(`/prisoners/${from}/${this.state.type}`)
        .then(data => this.props.dispatch({
          type: PRISONERS_FETCH,
          payload: data,
        }))
        .then(this.setState({ fetch: true }))
    }
  }

  forceFetchPrisoners = async from => {
    await this.setState({ fetch: false })
    this.forceFetch(from)
  }

  changeData = async type => {
    this.props.dispatch({
      type: REMOVE_ALL_PRISONERS,
      payload: {},
    })
    await this.setState({
      type,
      activePage: 1,
    })
    this.fetchTotalPages()
    this.forceFetchPrisoners(1)
  }

  searchOnChange = async event => {
    if (event.key !== 'Enter') {
      return
    }
    event.persist()
    if (event.target.value !== '') {
      this.setState({
        fetch: false,
        loading: true,
        totalPages: 1,
      })
      console.log(this.state.loading)
      api.get(`/prisoners_search/${event.target.value}`)
        .then(data => this.props.dispatch({
          type: PRISONERS_FETCH,
          payload: data,
        }))
        .then(this.setState({
          fetch: true,
          loading: false,
        }))
    } else {
      await this.forceFetch(1)
      await this.fetchTotalPages()
    }
  }

  isActive(type) {
    if (this.state.type === type) {
      return 'active'
    }
    return ''
  }

  render() {
    const {
      prisonersData,
    } = this.props

    return (
      <div className='ui container'>
        {this.state.loading ?
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer> : null}
        <div className='page-header'>
          <Header>Prisoners</Header>
          <Button.Group size='small' floated='left'>
            <Button onClick={() => this.changeData('all')} className={this.isActive('all')}>All</Button>
            <Button onClick={() => this.changeData('current')} className={this.isActive('current')}>Current</Button>
          </Button.Group>
          <Link to='/prisoners/create' href='/prisoners/create'>
            <Button
              content='Add'
              icon='plus'
              labelPosition='right'
              size='small'
              color='green'
            />
          </Link>
          <Input
            className='pull-right'
            icon='search'
            placeholder='Search prisoners...'
            size='small'
            onKeyPress={this.searchOnChange}
          />
        </div>
        <PrisonersList data={prisonersData} />
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
              this.setState({ activePage: data.activePage })
              this.forceFetchPrisoners(data.activePage)
            }}
          />
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  prisonersData: prisonersSelector(state),
}))(Prisoners)
