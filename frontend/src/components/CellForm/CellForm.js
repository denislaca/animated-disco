import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'
import { renderInput, renderSelect } from '../../helpers/form'

const CellForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    cellTypes
  } = props

  return (
    <Form size='small' onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Field name='type' options={cellTypes} component={renderSelect} label='Type' />
        <Field name='capacity' component={renderInput} label='Capacity' />
      </Form.Group>
      <Form.Field control={Button} color='green' disabled={pristine || submitting}>Submit</Form.Field>
    </Form>
  )
}


const validate = values => {
  const errors = {}
  const requiredFields = [
    'type',
    'capacity',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (!Number.isInteger(parseInt(values.capacity, 10))) {
    errors.capacity = 'Not a number'
  }
  return errors
}

export default reduxForm({
  form: 'CellForm',
  validate,
  enableReinitialize: true,
})(CellForm)
