import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Header, Form, Button } from 'semantic-ui-react'
import 'react-datepicker/dist/react-datepicker.css'
import { renderInput, renderSelect, renderDatePicker, renderTextArea } from '../../helpers/form'
import { genderOptions } from '../../helpers/constants'

import './PrisonerForm.css'

const PrisonerForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
  } = props

  return (
    <Form size='small' onSubmit={handleSubmit}>
      <Header as='h4' dividing>
        Basic information
      </Header>
      <Form.Group widths='equal'>
        <Field name='first_name' component={renderInput} label='First Name'/>
        <Field name='last_name' component={renderInput} label='Last Name'/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field name='date_of_birth' component={renderDatePicker} label='Date of Birth'/>
        <Field name='gender' component={renderSelect} options={genderOptions} label='Gender'/>
      </Form.Group>
      <Header as='h4' dividing>
        Place of permanent residence
      </Header>
      <Form.Group widths='equal'>
        <Field name='street' component={renderInput} label='Street'/>
        <Field name='street_number' component={renderInput} label='Street number'/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field name='city' component={renderInput} label='City'/>
        <Field name='country' component={renderInput} label='Country'/>
      </Form.Group>
      <Header as='h4' dividing>
        Further information
      </Header>
      <Field name='about' component={renderTextArea} label='About' placeholder='Tell us more about prisoner...'/>
      <Form.Field control={Button} color='green' disabled={pristine || submitting}>Submit</Form.Field>
    </Form>
  )
}

const validate = values => {
  const errors = {}
  const requiredFields = [
    'first_name',
    'last_name',
  ]
  requiredFields.forEach(field => {
    if(!values[field]) {
      errors[field] = 'Required'
    }
  })
  if(!Number.isInteger(parseInt(values.street_number, 10))) {
    errors.street_number = 'Not a number'
  }
  return errors
}

export default reduxForm({
  form: 'PrisonerForm',
  validate,
  enableReinitialize: true,
})(PrisonerForm)
