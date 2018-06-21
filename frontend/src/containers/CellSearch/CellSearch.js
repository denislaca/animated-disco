import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Dimmer,
  Loader,
  Button,
  Header,
  Form,
  Segment,
  Card,
  Grid,
} from 'semantic-ui-react'
import { api } from '../../helpers/fetch'
import { SET_COMPLETED } from '../PunishmentAdd/reducer'

import './CellSearch.css'

const capacities = [
  {
    key: '0',
    text: '1',
    value: '1',
  },
  {
    key: '1',
    text: '3',
    value: '3',
  },
]

const guards = [
  {
    key: 0,
    text: 'Male',
    value: 'male',
  },
  {
    key: 1,
    text: 'Combined',
    value: 'combined',
  },
  {
    key: 2,
    text: 'Female',
    value: 'female',
  },
]

class CellSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetch: true,
      searchData: {
        capacity: '',
        guard_type: '',
      },
      selectedCell: -1,
      cells: [],
    }
  }

  componentWillMount = () => {
    if (this.props.punishment.active !== 2) {
      this.props.history.push(`/punishments/add/${this.props.punishment.active + 1}`)
    }
  }

  changeData = (index, value) => {
    const data = this.state.searchData
    data[index] = value
    this.setState({ searchData: data })
  }

  searchCells = async () => {
    await this.setState({
      fetch: false,
      selectedCell: -1,
    })
    const data = this.state.searchData
    await api.post('/cells/search', data)
      .then(data => {
        this.setState({
          cells: data,
          fetch: true,
        })
      })
  }

  selectCell = id => {
    this.setState({ selectedCell: id })
  }

  redirect = () => {
    this.props.dispatch({
      type: SET_COMPLETED,
      payload: {
        completed: [true, true, true, false],
        active: 3,
        cell_info: this.state.selectedCell,
      },
    })
    this.props.history.push('/punishments/add/4')
  }

  render() {
    const {
      cells,
    } = this.state
    return (
      <div>
        {!this.state.fetch ?
          <Dimmer active inverted>
            <Loader inverted content='Loading' />
          </Dimmer> : ''}
        <Header>Search prisoner</Header>
        <Segment>
          <Form size='small' onSubmit={this.searchCells}>
            <Form.Group widths='equal'>
              <Form.Select
                options={capacities}
                fluid
                label='Capacity'
                placeholder='Capacity'
                onChange={e => this.changeData('capacity', e.target.value)}
              />
              <Form.Select
                options={guards}
                fluid
                label='Guard type'
                placeholder='Guard type'
                onChange={e => this.changeData('guard_type', e.target.value)}
              />
            </Form.Group>
            <Button type='submit'>Search cells</Button>
          </Form>
        </Segment>
        <Header>Results:</Header>
        <Grid>
          <Grid.Row>
            {cells.map(cell => (
              <Grid.Column
                width={4}
                key={`${cell.id}a`}
              >
                <Card
                  fluid
                  key={`${cell.id}a`}
                  className={`prison-card ${(Number(cell.id) === Number(this.state.selectedCell) && 'active') || ''}`}
                  onClick={() => this.selectCell(cell.id)}
                >
                  <Card.Content>
                    <Card.Header>{cell.id}</Card.Header>
                    <Card.Meta>{cell.capacity}</Card.Meta>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
            {cells.length === 0 ? <Grid.Column width={16}>No data</Grid.Column> : ''}
          </Grid.Row>
        </Grid>
        {this.state.selectedCell !== -1 ?
          <div className='bottom-menu'>
            <Button color='green' onClick={() => this.redirect()}>Select cell</Button>
          </div> : ''}
      </div>
    )
  }
}

export default connect(state => ({
  prisonerData: state.prisoners,
  punishment: state.punishment,
}))(CellSearch)

