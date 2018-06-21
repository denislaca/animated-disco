import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'
import { api } from '../../helpers/fetch'
import JobAttandanceForm from '../../components/JobAttandanceForm/JobAttendanceForm'
import RedirectBack from '../../components/RedirectBack/RedirectBack'
import moment from 'moment/moment'

class JobAttandanceAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetch: false,
    }
  }

  componentWillMount = async() => {
    await this.forceFetch()
    this.setState({fetch: true})
  }

  forceFetch = () => {
    if(!this.state.fetch) {
      api.get(`/prisoners/${this.props.id}/edit`)
        .then(data => {
          this.setState({
            prisoner: data[0],
          })
        })
      api.get('/jobs/all')
        .then(data => {
          this.setState({
            jobs: data.map(job => {
              return {
                key: job.id,
                text: job.name,
                value: job.id,
              }
            })
          })
        })
    }
  }

  postCellTypeData = data => {
    if(this.state.fetch) {
      const postData = {
        prisoner_id: this.props.id,
        ...data
      }
      api.post('/prisoners/jobAttendance/add', postData)
    }
    window.history.back()
  }

  render() {
    const {
      prisoner,
      jobs,
    } = this.state
    const {
      jobAttendanceData,
    } = this.props

    return (
      <div className='form-container'>
        <div className='page-header'>
          <RedirectBack/>
          <Header>Add job attandence to
            prisoner {prisoner !== undefined ? prisoner.first_name + ' ' + prisoner.last_name : ''}</Header>
        </div>
        <Segment>
          {this.state.fetch ?
            <JobAttandanceForm
              initialValues={{
                date: moment(),
              }}
              jobs={jobs}
              data={jobAttendanceData}
              onSubmit={this.postCellTypeData}/> : ''}
        </Segment>
      </div>
    )
  }
}

export default connect(state => ({
  jobAttendanceData: state.jobAttendance,
}))(JobAttandanceAdd)

