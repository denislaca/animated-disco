import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Container, Dimmer, Loader, Tab, Divider, Card, Icon, Button } from 'semantic-ui-react'
import RedirectBack from '../../components/RedirectBack/RedirectBack'
import { api } from '../../helpers/fetch'
import { jobSelector } from './selector'
import JobBestPrisoners from '../../components/JobBestPrisoners/JobBestPrisoners'
import JobAttendanceList from '../../components/JobAttendanceList/JobAttendanceList'

class JobDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      job: undefined,
      loading: false,
    }
  }

  componentDidMount = async () => {
    await this.setState({ loading: true })
    api.get(`/jobs/get/${this.props.id}`)
      .then(async data => {
        await this.setState({
          job: {
            ...data,
            attendances: undefined,
          },
          loading: false,
        })
        this.fetchJobAttendancesBestPrisoners()
      })
  }

  fetchJobAttendancesBestPrisoners = async () => {
    await this.setState({ loading: true })
    api.get(`/jobs/attendances_best_prisoners/${this.state.job.id}`)
      .then(data => {
        this.setState({
          job: {
            ...this.state.job,
            bestPrisoners: data,
          },
          loading: false,
        })
      })
  }

  fetchJobAttendances = async () => {
    await this.setState({ loading: true })
    api.get(`/jobs/attendances/${this.state.job.id}`)
      .then(data => {
        this.setState({
          job: {
            ...this.state.job,
            attendances: data,
          },
          loading: false,
        })
      })
  }

  tabChange = (event, data) => {
    if (data.activeIndex === 0) {
      this.fetchJobAttendances()
    }
    if (data.activeIndex === 1) {
      this.fetchJobAttendancesBestPrisoners()
    }
  }

  render() {
    const {
      job,
    } = this.state
    const panes = [
      {
        menuItem: 'Lattest attendance',
        render: () => (
          <div>
            <Button color='green' icon labelPosition='left'>
              <Icon name='plus' />
              Add job attendance
            </Button>
            <Divider />
            {(job && job.attendances &&
              <JobAttendanceList data={job.attendances} type='job' />) || null}
          </div>
        ),
      },
      {
        menuItem: 'Best attendance this year',
        render: () => (
          <div>
            {(job && job.bestPrisoners &&
              <JobBestPrisoners prisoners={job.bestPrisoners} />) || null}
          </div>
        ),
      },
    ]

    return (
      <Container>
        {this.state.loading ? (
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer>
        ) : null}
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Card fluid className='ui center aligned'>
                <div className='center aligned' style={{ padding: '20px' }}>
                  <Icon name='wrench' size='huge' />
                </div>
                <Card.Content>
                  <Card.Header className='center aligned'>
                    {(job && job.name) || null}
                  </Card.Header>
                </Card.Content>
              </Card>
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
  job: jobSelector(state),
}))(JobDetail)
