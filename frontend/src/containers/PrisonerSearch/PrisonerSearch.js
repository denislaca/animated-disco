import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import {
  Container,
  Dimmer,
  Loader,
  Button,
  Header,
  Form,
  Segment,
  Accordion,
  Icon,
  Card,
  Image,
  Grid,
} from 'semantic-ui-react'
import { api } from '../../helpers/fetch'
import { SET_COMPLETED } from '../PunishmentAdd/reducer'
import './PrisonerSearch.css'

class PrisonerSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetch: true,
      activeAccordionIndex: 2,
      searchData: {
        first_name: '',
        last_name: '',
        city: '',
        country: '',
      },
      selectedPrisoner: -1,
      prisoners: [],
    }
  }

  handleAccordion = (e, titleProps) => {
    const { index } = titleProps
    const { activeAccordionIndex } = this.state
    const newIndex = activeAccordionIndex === index ? -1 : index

    this.setState({ activeAccordionIndex: newIndex })
  }

  changeData = (index, value) => {
    const data = this.state.searchData
    data[index] = value
    this.setState({ searchData: data })
  }

  searchPrisoners = async () => {
    await this.setState({
      fetch: false,
      selectedPrisoner: -1,
    })
    const data = this.state.searchData
    await api.post('/prisoners_search_advanced', data)
      .then(async data => {
        await this.setState({
          prisoners: data,
          fetch: true,
        })
      })
  }

  selectPrisoner = id => {
    this.setState({ selectedPrisoner: id })
  }

  redirect = () => {
    this.props.dispatch({
      type: SET_COMPLETED,
      payload: {
        completed: [true, false, false, false],
        active: 1,
        prisoner_info: this.state.prisoners.filter(prisoner => prisoner.id === this.state.selectedPrisoner)[0],
      },
    })
    this.props.history.push('/punishments/add/2')
  }

  render() {
    const {
      prisoners,
    } = this.state

    return (
      <div>
        {!this.state.fetch ?
          <Dimmer active inverted>
            <Loader inverted content='Loading' />
          </Dimmer> : ''}
        <Header>Search prisoner</Header>
        <Segment>
          <Form size='small' onSubmit={this.searchPrisoners}>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                label='First name'
                placeholder='First name'
                onChange={e => this.changeData('first_name', e.target.value)}
              />
              <Form.Input
                fluid
                label='Last name'
                placeholder='Last name'
                onChange={e => this.changeData('last_name', e.target.value)}
              />
            </Form.Group>
            <Accordion style={{ marginBottom: '15px' }}>
              <Accordion.Title
                active={this.state.activeAccordionIndex === 0}
                index={0}
                onClick={this.handleAccordion}
              >
                <Icon name='dropdown' />
                Advanced search
              </Accordion.Title>
              <Accordion.Content active={this.state.activeAccordionIndex === 0}>
                <Form.Group widths='equal'>
                  <Form.Input
                    fluid
                    label='City'
                    placeholder='City'
                    onChange={e => this.changeData('city', e.target.value)}
                  />
                  <Form.Input
                    fluid
                    label='Country'
                    placeholder='Country'
                    onChange={e => this.changeData('country', e.target.value)}
                  />
                </Form.Group>
              </Accordion.Content>
            </Accordion>
            <Button type='submit'>Search prisoners</Button>
          </Form>
        </Segment>
        <Header>Results:</Header>
        <Grid>
          <Grid.Row>
            {prisoners.map(prisoner => (
              <Grid.Column width={4} key={prisoner.id}>
                <Card
                  fluid
                  className={`prison-card ${(Number(prisoner.id) === Number(this.state.selectedPrisoner) && 'active')}`}
                  onClick={() => this.selectPrisoner(prisoner.id)}
                >
                  <Image src='/prisoner.png' />
                  <Card.Content>
                    <Card.Header>
                      {`${prisoner.first_name} ${prisoner.last_name}`}
                    </Card.Header>
                    <Card.Meta>
                      {moment(prisoner.date_of_birth).format('d.M.YYYY')}
                    </Card.Meta>
                    <Card.Description>
                      {`${prisoner.city}, ${prisoner.country}`}
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
            {(prisoners.length === 0 && <Grid.Column width={16}>No data</Grid.Column>) || null}
          </Grid.Row>
        </Grid>
        {this.state.selectedPrisoner !== -1 ?
          <div className='bottom-confirm'>
            <div className='background'>
              <Button color='green' onClick={this.redirect}>Select prisoner</Button>
            </div>
          </div> : ''}
      </div>
    )
  }
}

export default connect(state => ({
  prisonerData: state.prisoners,
}))(PrisonerSearch)

