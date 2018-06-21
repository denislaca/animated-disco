import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Header, Segment } from 'semantic-ui-react'
import { api } from '../../helpers/fetch'
import PrisonerForm from '../../components/PrisonerForm/PrisonerForm'
import RedirectBack from '../../components/RedirectBack/RedirectBack'

class PrisonerAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetch: false,
    }
  }

  postPrisonerData = data => {
    if (!this.state.fetch) {
      api.post('/prisoners/add', data)
    }
    window.history.back()
  }

  render() {
    const {
      prisonerData,
    } = this.props
    prisonerData.date_of_birth = moment()
    return (
      <div className='form-container'>
        <div className='page-header'>
          <RedirectBack />
          <Header>Add prisoner</Header>
        </div>
        <Segment>
          <PrisonerForm initialValues={{ date_of_birth: moment() }} onSubmit={this.postPrisonerData} />
        </Segment>
      </div>
    )
  }
}


export default connect(state => ({
  prisonerData: state.prisoners,
}))(PrisonerAdd)

