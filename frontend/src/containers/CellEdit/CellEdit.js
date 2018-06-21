import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'
import { api } from '../../helpers/fetch'
import CellForm from '../../components/CellForm/CellForm'
import RedirectBack from '../../components/RedirectBack/RedirectBack'

class CellEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetch: false,
      cellData: undefined,
      cellTypes: undefined,
    }
  }

  componentWillMount = async() => {
    await this.forceFetch()
    this.setState({fetch: true})
  }

  forceFetch = () => {
    api.get(`/cells/get/${this.props.id}`)
      .then(async data => {
        await this.setState({
          cellData: data,
        })
        console.log(data)
      })
    api.get(`/cells/types/getAll`)
      .then(async data => {
        await this.setState({
          cellTypes: data.map(type => {
            return {
              key: type.id,
              text: type.name,
              value: type.id,
            }
          }),
        })
      })
  }

  submitUpdate = async data => {
    api.post('/cells/edit', data)
      .then(async() => {
        await this.setState({fetch: true})
        window.history.back()
      })
  }

  render() {
    const {
      cellData,
      cellTypes,
    } = this.state

    return (
      <div className='form-container'>
        <div className='page-header'>
          <RedirectBack/>
          <Header>Edit cell</Header>
        </div>
        <Segment>
          {this.state.fetch ?
            <CellForm cellTypes={cellTypes} initialValues={cellData} onSubmit={this.submitUpdate}/> : ''}
        </Segment>
      </div>
    )
  }
}

export default connect(state => ({}))(CellEdit)

