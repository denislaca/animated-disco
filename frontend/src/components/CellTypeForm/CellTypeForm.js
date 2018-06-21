import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'
import 'react-datepicker/dist/react-datepicker.css'
import { renderInput } from '../../helpers/form'

const CellTypeForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
  } = props

  return (
    <Form size='small' onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Field name='name' component={renderInput} label='Name' />
      </Form.Group>
      <Form.Field control={Button} color='green' disabled={pristine || submitting}>Submit</Form.Field>
    </Form>
  )
}


const validate = values => {
  const errors = {}
  const requiredFields = [
    'name',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (!Number.isInteger(parseInt(values.street_number, 10))) {
    errors.street_number = 'Not a number'
  }
  return errors
}

export default reduxForm({
  form: 'CellTypeForm',
  validate,
  enableReinitialize: true,
})(CellTypeForm)
