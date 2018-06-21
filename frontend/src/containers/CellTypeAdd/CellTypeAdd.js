import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'
import { api } from '../../helpers/fetch'
import CellTypeForm from '../../components/CellTypeForm/CellTypeForm'
import RedirectBack from '../../components/RedirectBack/RedirectBack'

class CellTypeAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetch: false,
    }
  }

  postCellTypeData = data => {
    if(!this.state.fetch) {
      api.post('/cells/types/add', data)
    }
    window.history.back()
  }

  render() {
    const {
      cellTypeData,
    } = this.props

    return (
      <div className='form-container'>
        <div className='page-header'>
          <RedirectBack/>
          <Header>Add cell type</Header>
        </div>
        <Segment>
          <CellTypeForm data={cellTypeData} onSubmit={this.postCellTypeData}/>
        </Segment>
      </div>
    )
  }
}

export default connect(state => ({
  cellTypeData: state.jobs,
}))(CellTypeAdd)

