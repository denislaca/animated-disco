import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'
import { api } from '../../helpers/fetch'
import HealthcareReportForm from '../../components/HealthcareReportForm/HealthcareReportForm'
import RedirectBack from '../../components/RedirectBack/RedirectBack'
import moment from 'moment/moment'

class HealthcareReportAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetch: false,
    }
  }

  componentWillMount = () => {
    this.forceFetch()
  }

  forceFetch = () => {
    if(!this.state.fetch) {
      api.get(`/prisoners/${this.props.id}/edit`)
        .then(data => {
          this.setState({
            prisoner: data[0],
            fetch: true,
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
      api.post('/prisoners/healthcareReport/add', postData)
    }
    window.history.back()
  }

  render() {
    const {
      prisoner,
    } = this.state
    const {
      healtcareReportData,
    } = this.props

    return (
      <div className='form-container'>
        <div className='page-header'>
          <RedirectBack/>
          <Header>Add healtcare report to
            prisoner {prisoner !== undefined ? prisoner.first_name + ' ' + prisoner.last_name : ''}</Header>
        </div>
        <Segment>
          <HealthcareReportForm
            initialValues={{
              date: moment(),
            }}
            data={healtcareReportData}
            onSubmit={this.postCellTypeData}/>
        </Segment>
      </div>
    )
  }
}

export default connect(state => ({
  healtcareReportData: state.healtcareReport,
}))(HealthcareReportAdd)

