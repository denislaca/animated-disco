import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'
import { api } from '../../helpers/fetch'
import JobForm from '../../components/JobForm/JobForm'
import RedirectBack from '../../components/RedirectBack/RedirectBack'

class JobEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetch: false,
      jobData: undefined
    }
  }

  componentWillMount = () => {
    this.forceFetch()
  }

  forceFetch = () => {
    if(!this.state.fetch) {
      api.get(`/jobs/get/${this.props.id}`)
        .then(data => this.setState({jobData: data}))
        .then(this.setState({fetch: true}))
    }
  }

  submitUpdate = async data => {
    api.post('/jobs/edit', data)
      .then(async () => {
        await this.setState({fetch: true})
        window.history.back()
      })
  }

  render() {
    const {
      jobData,
    } = this.state

    return (
      <div className='form-container'>
        <div className='page-header'>
          <RedirectBack/>
          <Header>Edit job</Header>
        </div>
        <Segment>
          <JobForm initialValues={jobData} onSubmit={this.submitUpdate}/>
        </Segment>
      </div>
    )
  }
}

export default connect(state => ({}))(JobEdit)

