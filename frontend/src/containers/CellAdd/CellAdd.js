import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'
import { api } from '../../helpers/fetch'
import CellForm from '../../components/CellForm/CellForm'
import RedirectBack from '../../components/RedirectBack/RedirectBack'

class CellAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cellTypes: undefined,
      fetch: false,
    }
  }

  componentDidMount = () => {
    this.forceFetch()
  }

  forceFetch = () => {
    api.get('/cells/types/getAll')
      .then(data => {
        this.setState({
          cellTypes: data.map(type => ({
            key: type.id,
            text: type.name,
            value: type.id,
          })),
        })
      })
  }

  postCellData = data => {
    api.post('/cells/add', data)
    window.history.back()
  }

  render() {
    const {
      cellData,
      cellTypes,
    } = this.state

    return (
      <div className='form-container'>
        <div className='page-header'>
          <RedirectBack />
          <Header>Add cell</Header>
        </div>
        <Segment>
          {cellTypes !== undefined ? <CellForm data={cellData} cellTypes={cellTypes} onSubmit={this.postCellData}/> : ''}
        </Segment>
      </div>
    )
  }
}

export default connect(state => ({
  cellData: state.jobs,
}))(CellAdd)

