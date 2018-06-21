import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'
import { api } from '../../helpers/fetch'
import CellTypeForm from '../../components/CellTypeForm/CellTypeForm'
import RedirectBack from '../../components/RedirectBack/RedirectBack'

class CellTypeEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetch: false,
      cellTypeData: undefined
    }
  }

  componentWillMount = () => {
    this.forceFetch()
  }

  forceFetch = () => {
    if(!this.state.fetch) {
      api.get(`/cells/types/get/${this.props.id}`)
        .then(data => {
          this.setState({
            cellTypeData: data,
            fetch: true,
          })
          console.log(data)
        })
    }
  }

  submitUpdate = async data => {
    api.post('/cells/types/edit', data)
      .then(async () => {
        await this.setState({fetch: true})
        window.history.back()
      })
  }

  render() {
    const {
      cellTypeData,
    } = this.state

    return (
      <div className='form-container'>
        <div className='page-header'>
          <RedirectBack/>
          <Header>Edit cell type</Header>
        </div>
        <Segment>
          <CellTypeForm initialValues={cellTypeData} onSubmit={this.submitUpdate}/>
        </Segment>
      </div>
    )
  }
}

export default connect(state => ({}))(CellTypeEdit)

