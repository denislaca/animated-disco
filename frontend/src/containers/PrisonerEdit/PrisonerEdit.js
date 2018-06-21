import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'
import { api } from '../../helpers/fetch'
import { EDIT_PRISONER_FETCH } from './reducer'
import PrisonerForm from '../../components/PrisonerForm/PrisonerForm'
import RedirectBack from '../../components/RedirectBack/RedirectBack'
import { editSelector } from './selector'

class PrisonerEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetch: false,
    }
  }

  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.forceFetch()
    }
  }

  forceFetch = () => {
    if (!this.state.fetch) {
      api.get(`/prisoners/${this.props.match.params.id}/edit`)
        .then(data => this.props.dispatch({
          type: EDIT_PRISONER_FETCH,
          payload: data,
        }))
        .then(this.setState({ fetch: true }))
    }
  }

  submitUpdate = data => {
    api.post('/prisoners/edit', data)
      .then(() => this.setState({ fetch: true }))
    window.history.back()
  }

  forceFetchPrisoners = () => {
    this.setState({ fetch: false })
    this.forceFetch()
  }

  render() {
    const {
      prisonerData,
    } = this.props
    return (
      <div className='form-container'>
        <div className='page-header'>
          <RedirectBack />
          <Header>Edit prisoner</Header>
        </div>
        <Segment>
          <PrisonerForm initialValues={prisonerData} onSubmit={this.submitUpdate} />
        </Segment>
      </div>
    )
  }
}


export default connect(state => ({
  prisonerData: editSelector(state),
}))(PrisonerEdit)

