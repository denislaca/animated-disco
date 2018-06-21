import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'
import 'react-datepicker/dist/react-datepicker.css'
import { renderDatePicker, renderTextArea } from '../../helpers/form'

const HealthcareReportForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
  } = props

  return (
    <Form size='small' onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Field name='date' component={renderDatePicker} label='Date' />
      </Form.Group>
      <Form.Group widths='equal'>
        <Field name='description' component={renderTextArea} label='Description' />
      </Form.Group>
      <Form.Field control={Button} color='green' disabled={pristine || submitting}>Submit</Form.Field>
    </Form>
  )
}


const validate = values => {
  const errors = {}
  const requiredFields = [
    'date',
    'description'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

export default reduxForm({
  form: 'HealthcareReportForm',
  validate,
  enableReinitialize: true,
})(HealthcareReportForm)
