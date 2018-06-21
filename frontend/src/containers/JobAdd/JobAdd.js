import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'
import { api } from '../../helpers/fetch'
import JobForm from '../../components/JobForm/JobForm'
import RedirectBack from '../../components/RedirectBack/RedirectBack'

class JobAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetch: false,
    }
  }

  postJobData = data => {
    if(!this.state.fetch) {
      api.post('/jobs/add', data)
    }
    window.history.back()
  }

  render() {
    const {
      jobData,
    } = this.props

    return (
      <div className='form-container'>
        <div className='page-header'>
          <RedirectBack/>
          <Header>Add job</Header>
        </div>
        <Segment>
          <JobForm data={jobData} onSubmit={this.postJobData}/>
        </Segment>
      </div>
    )
  }
}

export default connect(state => ({
  jobData: state.jobs,
}))(JobAdd)

