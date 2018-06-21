import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Dimmer,
  Loader,
  Button,
  Icon,
  Header as SemanticHeader,
  Container,
  Pagination,
  Grid,
  Statistic,
} from 'semantic-ui-react'
import { api } from '../../helpers/fetch'
import { DASHBOARD_FETCH } from './reducer'
import DashboardList from '../../components/DashboardList/DashboardList'

import './Dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetch: false,
      loading: false,
      pageNumbers: {
        releases: 1,
        captures: 1,
      },
      statistics: [
        {
          number: 0,
          name: 'Releases',
        },
        {
          number: 1,
          name: 'Free cells',
        },
        {
          number: 2,
          name: 'Captures',
        },
      ],
    }
  }

  componentDidMount = async () => {
    this.setState({ loading: true })
    await this.fetchStatistics()
    await this.initialFetch()
    this.setState({ loading: false })
  }

  fetchStatistics = async () => {
    await api.get('/dashboard/statistics')
      .then(data => this.setState({
        statistics: [
          {
            number: data.releases,
            name: 'Releases',
          },
          {
            number: data.freeCells,
            name: 'Free cells',
          },
          {
            number: data.captures,
            name: 'Captures',
          },
        ],
      }))
    console.log(this.state.statistics)
  }

  forceFetchDashboardCapturesData = async page => {
    await this.setState({ fetch: false })
    await this.fetchCaptures(page)
  }

  forceFetchDashboardReleasesData = async page => {
    await this.setState({ fetch: false })
    await this.fetchReleases(page)
  }

  initialFetch = async () => {
    await this.forceFetchDashboardReleasesData(1)
    await this.forceFetchDashboardCapturesData(1)
    await api.get('/dashboard/pagenumbers')
      .then(data => {
        this.setState({
          pageNumbers: { ...data },
        })
      })
      .then(this.setState({ fetch: true }))
  }

  fetchCaptures = page => {
    if (!this.state.fetch) {
      api.get(`/dashboard/${page}/captures`)
        .then(data => {
          this.props.dispatch({
            type: DASHBOARD_FETCH,
            payload: data,
          })
        })
        .then(this.setState({ fetch: true }))
    }
  }

  fetchReleases = page => {
    if (!this.state.fetch) {
      api.get(`/dashboard/${page}/releases`)
        .then(data => {
          this.props.dispatch({
            type: DASHBOARD_FETCH,
            payload: data,
          })
        })
        .then(this.setState({ fetch: true }))
    }
  }

  render() {
    const {
      releases: {
        releasesHeaders,
        releasesData,
        releasesDesc,
      },
      captures: {
        capturesHeaders,
        capturesData,
        capturesDesc,
      },
      last_active_page,
    } = this.props

    const {
      pageNumbers: {
        releases: releasesPages,
        captures: capturesPages,
      },
      statistics,
    } = this.state

    return (
      <div>
        {this.state.loading ?
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer> : null}
        <div className='dashboard'>
          <Container>
            <Grid celled='internally'>
              <Grid.Row textAlign='center'>
                <Grid.Column width={10}>
                  <Grid celled='internally'>
                    <Grid.Row columns={3}>
                      {statistics.map(statistic => (
                        <Grid.Column key={`${statistic.number} ${statistics.name}`}>
                          <Statistic>
                            <Statistic.Value>{statistic.number}</Statistic.Value>
                            <Statistic.Label>{statistic.name}</Statistic.Label>
                          </Statistic>
                        </Grid.Column>
                      ))}
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column width={5} verticalAlign='middle'>
                  <Button.Group vertical labeled icon>
                    <Button as={Link} to={`/punishments/add/${last_active_page}`} icon labelPosition='left' color='green'>
                      <Icon name='plus' />
                      Record punishment
                    </Button>
                    <Button as={Link} to='/prisoners' icon labelPosition='left' color='yellow'>
                      <Icon name='pause' />
                      Record job attendance
                    </Button>
                  </Button.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <SemanticHeader as='h2'>
                    Today releases
                  </SemanticHeader>
                  <DashboardList
                    headers={releasesHeaders}
                    data={releasesData}
                    translate={releasesDesc}
                  />
                  <div>
                    <Pagination
                      className='pagination'
                      defaultActivePage={1}
                      firstItem={null}
                      lastItem={null}
                      pointing
                      secondary
                      totalPages={releasesPages}
                      onPageChange={(e, data) => {
                        this.forceFetchDashboardReleasesData(data.activePage)
                      }}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <SemanticHeader as='h2'>
                    Today captures
                  </SemanticHeader>
                  <DashboardList
                    headers={capturesHeaders}
                    data={capturesData}
                    translate={capturesDesc}
                  />
                  <div>
                    <Pagination
                      className='pagination'
                      defaultActivePage={1}
                      firstItem={null}
                      lastItem={null}
                      pointing
                      secondary
                      totalPages={capturesPages}
                      onPageChange={(e, data) => {
                        this.forceFetchDashboardCapturesData(data.activePage)
                      }}
                    />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  captures: state.dashboard.captures,
  releases: state.dashboard.releases,
  last_active_page: state.punishment.active + 1,
}))(Dashboard)
