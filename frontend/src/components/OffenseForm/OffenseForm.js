import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Header, Form, Button } from 'semantic-ui-react'
import 'react-datepicker/dist/react-datepicker.css'
import { renderDatePicker, renderTextArea, renderInput } from '../../helpers/form'


const OffenseForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
  } = props
  return (
    <Form
      size='small'
      onSubmit={handleSubmit}
    >
      <Header as='h4' dividing>
        Time at sollitary
      </Header>
      <Field name='punishment_id' component={renderInput} label='Punishment ID' />
      <Form.Group widths='equal'>
        <Field name='from' component={renderDatePicker} label='From' />
        <Field name='to' component={renderDatePicker} label='To' />
      </Form.Group>
      <Header as='h4' dividing>
        Offense description
      </Header>
      <Field name='description' component={renderTextArea} label='About offense' placeholder='Tell us more about given offense...' />
      <Form.Field control={Button} color='green' disabled={pristine || submitting}>Submit</Form.Field>
    </Form>
  )
}


const validate = values => {
  const errors = {}
  const requiredFields = [
    'punishment_id',
    'from',
    'to',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (!Number.isInteger(parseInt(values.punishment_id, 10))) {
    errors.punishment_id = 'Not a number'
  }
  return errors
}

export default reduxForm({
  form: 'PrisonerForm',
  validate,
  enableReinitialize: true,
})(OffenseForm)
