import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { Container, Step, Icon, Button } from 'semantic-ui-react'
import moment from 'moment'
import PrisonerSearch from '../PrisonerSearch/PrisonerSearch'
import PunishmentForm from '../../components/PunishmentForm/PunishmentForm'
import CellSearch from '../CellSearch/CellSearch'
import PunishmentSummary from '../../components/PunishmentSummary/PunishmentSummary'
import { SET_COMPLETED } from '../../containers/PunishmentAdd/reducer'
import { api } from '../../helpers/fetch'
import './PunishmentsAdd.css'

class PunishmentAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetch: false,
    }
  }

  ResetPunishmentForms = () => {
    this.props.dispatch({
      type: SET_COMPLETED,
      payload: {
        completed: [false, false, false, false],
        active: 0,
        punishment_info: null,
        prisoner_info: null,
        cell_info: null,
      },
    })
  }
  
  PunishmentFormOnSubmit = data => {
    this.props.dispatch({
      type: SET_COMPLETED,
      payload: {
        completed: [true, true, false, false],
        active: 2,
        punishment_info: data,
      },
    })
    this.props.history.push('/punishments/add/3')
  }

  PunishmentSummaryOnSubmit = () => {
    const {
      punishment_info,
      prisoner_info,
      cell_info,
    } = this.props.punishment
    api.post('/prisoners/punishment', {
      punishment: punishment_info,
      prisoner_id: prisoner_info.id,
      cell_id: cell_info,
    })
    this.ResetPunishmentForms()
  }

  render() {
    const {
      punishment,
    } = this.props
    return (
      <Container className='punishmentAdd'>
        <div className='prisoner-step'>
          <Step.Group vertical fluid>
            <Step completed={!!punishment.completed[0]} active={punishment.active === 0}>
              <Icon name='id badge' />
              <Step.Content>
                <Step.Title>Prisoner</Step.Title>
                <Step.Description>Select prisoner</Step.Description>
              </Step.Content>
            </Step>

            <Step completed={!!punishment.completed[1]} active={punishment.active === 1}>
              <Icon name='book' />
              <Step.Content>
                <Step.Title>Punishment</Step.Title>
                <Step.Description>Enter punishment information</Step.Description>
              </Step.Content>
            </Step>

            <Step completed={!!punishment.completed[2]} active={punishment.active === 2}>
              <Icon name='content' rotated={(!punishment.completed[2] && 'clockwise') || null} />
              <Step.Content>
                <Step.Title>Cell</Step.Title>
                <Step.Description>Attach cell</Step.Description>
              </Step.Content>
            </Step>

            <Step completed={!!punishment.completed[3]} active={punishment.active === 3}>
              <Icon name='info' />
              <Step.Content>
                <Step.Title>Confirm punishment</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
          <Button
            fluid
            color='yellow'
            onClick={this.ResetPunishmentForms}
          >
            Reset Punishment Creation
          </Button>

        </div>
        <div className='content'>
          <Switch>
            <Route exact path='/punishments/add/1' component={PrisonerSearch} />
            <Route
              exact
              path='/punishments/add/2'
              render={() => (
                <PunishmentForm
                  initialValues={{
                    from: moment(),
                    to: moment(),
                  }}
                  onSubmit={this.PunishmentFormOnSubmit}
                  historyPush={this.props.history.push}
                  active={this.props.punishment.active}
                />)}
            />
            <Route exact path='/punishments/add/3' component={CellSearch} />
            <Route
              exact
              path='/punishments/add/4'
              render={() => (
                <PunishmentSummary
                  handleSubmit={this.PunishmentSummaryOnSubmit}
                  historyPush={this.props.history.push}
                />)
              }
            />
          </Switch>
        </div>
      </Container>
    )
  }
}

export default connect(state => ({
  punishment: state.punishment,
}))(PunishmentAdd)

