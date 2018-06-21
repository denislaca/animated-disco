import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form, Button } from 'semantic-ui-react'
import 'react-datepicker/dist/react-datepicker.css'
import { renderDatePicker, renderSelect, renderTextArea } from '../../helpers/form'

const JobAttendanceForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    jobs
  } = props

  return (
    <Form size='small' onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Field name='date' component={renderDatePicker} label='Date'/>
      </Form.Group>
      <Form.Group widths='equal'>
        {jobs ?
          <Field name='job_id' component={renderSelect} options={jobs} label='Job'/>
          : ''}
      </Form.Group>
      <Form.Field control={Button} color='green' disabled={pristine || submitting}>Submit</Form.Field>
    </Form>
  )
}

const validate = values => {
  const errors = {}
  const requiredFields = [
    'date',
    'job_id'
  ]
  requiredFields.forEach(field => {
    if(!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

export default reduxForm({
  form: 'JobAttendanceForm',
  validate,
  enableReinitialize: true,
})(JobAttendanceForm)
