import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid, Container, Tab, Dimmer, Loader, Divider, Button, Icon } from 'semantic-ui-react'
import RedirectBack from '../../components/RedirectBack/RedirectBack'
import { api } from '../../helpers/fetch'
import { PRISONER_FETCH, PRISONER_PUNISHMENTS_FETCH } from './reducer'
import { prisonerSelector } from './selector'
import PrisonerCard from '../../components/PrisonerCard/PrisonerCard'
import PrisonerInformation from '../../components/PrisonerInformation/PrisonerInformation'
import PunishmentList from '../../components/PunishmentList/PunishmentList'
import JobAttendanceList from '../../components/JobAttendanceList/JobAttendanceList'
import HealtcareReportsList from '../../components/HealthcareReportsList/HealthcareReportsList'

import './prisonerDetail.css'

class PrisonerDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prisoner: undefined,
    }
  }

  componentDidMount = async () => {
    api.get(`/prisoners/${this.props.id}/detail`)
      .then(data => {
        this.props.dispatch({
          type: PRISONER_FETCH,
          payload: data[0],
        })
        this.setState({ prisoner: data[0] })
        this.fetchPunishments(this.state.prisoner.id)
      })
  }

  fetchPunishments = id => {
    api.get(`/prisoners/${id}/punishments`)
      .then(data => {
        this.props.dispatch({
          type: PRISONER_PUNISHMENTS_FETCH,
          payload: data,
        })
        this.setState({
          prisoner: {
            ...this.state.prisoner,
            punishments: data,
          },
        })
      })
  }

  deleteOffense = id => {
    api.delete(`/prisoners/offenses/delete/${id}`)
      .then(() => setTimeout(
        () => window.location.reload(), 200))
  }

  offenseFormOnSubmit = values => {
    api.post('/prisoners/offenses/add', {
      ...values,
    }).then(setTimeout(() => window.location.reload(), 200))
  }

  fetchJobAttendance = id => {
    api.get(`/prisoners/${id}/jobAttendance`)
      .then(data => {
        this.props.dispatch({
          type: PRISONER_PUNISHMENTS_FETCH,
          payload: data,
        })
        this.setState({
          prisoner: {
            ...this.state.prisoner,
            job_attendance: data,
          },
        })
      })
  }

  fetchHealthcateReports = id => {
    api.get(`/prisoners/${id}/healthcareReports`)
      .then(data => {
        this.setState({
          prisoner: {
            ...this.state.prisoner,
            healthcareReports: data,
          },
        })
      })
  }

  tabChange = (event, data) => {
    if (data.activeIndex === 1) {
      this.fetchPunishments(this.state.prisoner.id)
    }
    if (data.activeIndex === 2) {
      this.fetchJobAttendance(this.state.prisoner.id)
    }
    if (data.activeIndex === 3) {
      this.fetchHealthcateReports(this.state.prisoner.id)
    }
  }

  render() {
    const panes = [
      {
        menuItem: 'Personal information',
        render: () => <PrisonerInformation data={this.state.prisoner} />,
      },
      {
        menuItem: 'Punishments',
        render: () => (
          <div>
            {(this.state.prisoner && this.state.prisoner.punishments &&
              <PunishmentList
                data={this.state.prisoner.punishments}
                offenseFormOnSubmit={this.offenseFormOnSubmit}
                deleteOffense={this.deleteOffense}
              />) || null}
          </div>
        ),
      },
      {
        menuItem: 'Jobs attendance',
        render: () => (
          <div>
            <Button
              as={Link}
              to={`/jobs/attendance/add/${this.state.prisoner.id}`}
              color='green'
              icon
              labelPosition='left'
            >
              <Icon name='plus' />
              Add job attendance
            </Button>
            <Divider />
            {(this.state.prisoner && this.state.prisoner.job_attendance &&
              <JobAttendanceList data={this.state.prisoner.job_attendance} />) || ''}
          </div>
        ),
      },
      {
        menuItem: 'Healthcare reports',
        render: () => (
          <div>
            <Button as={Link} to={'/healthcare/add/' + this.state.prisoner.id} color='green' icon labelPosition='left'>
              <Icon name='plus' />
              Add healthcare reports
            </Button>
            <Divider />
            {(this.state.prisoner && this.state.prisoner.healthcareReports &&
              <HealtcareReportsList reports={this.state.prisoner.healthcareReports} />) || ''}
          </div>
        ),
      },
    ]
    const {
      prisoner,
    } = this.state
    console.log(this.state.prisoner && this.state.prisoner.punishments)
    return (
      <Container>
        {/* {!this.state.fetch ? (
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer>
        ) : ''} */}
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              {prisoner ? <PrisonerCard data={prisoner} /> : ''}
              <Divider />
              <RedirectBack />
            </Grid.Column>
            <Grid.Column width={12}>
              <Tab
                menu={{
                  attached: false,
                  tabular: false,
                }}
                defaultActiveIndex={1}
                panes={panes}
                onTabChange={this.tabChange}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default connect(state => ({
  prisoner: prisonerSelector(state),
}))(PrisonerDetail)
