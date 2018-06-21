import React from 'react'
import moment from 'moment'
import { reduxForm, Field } from 'redux-form'
import { Segment, Header, Form, Button } from 'semantic-ui-react'
import 'react-datepicker/dist/react-datepicker.css'
import { renderDatePicker, renderTextArea } from '../../helpers/form'
import './PunishmentForm.css'

const PunishmentForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
  } = props
  if (props.active !== 1) {
    props.historyPush(`/punishments/add/${props.active + 1}`)
    return null
  }
  return (
    <Form
      size='small'
      onSubmit={handleSubmit}
    >
      <Header as='h3'>Punishment</Header>
      <Segment>
        <Header as='h4' dividing>
          Duration of the sentence
        </Header>
        <Form.Group widths='equal'>
          <Field name='from' component={renderDatePicker} label='From' />
          <Field name='to' component={renderDatePicker} label='To' />
        </Form.Group>
        <Header as='h4' dividing>
          Information
        </Header>
        <Field name='description' component={renderTextArea} label='Description' placeholder='Sentence description...'/>
      </Segment>
      <Form.Field control={Button} color='green' disabled={pristine || submitting}>Continue</Form.Field>
    </Form>
  )
}

const validate = values => {
  const errors = {}
  const requiredFields = [
    'from',
    'to',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

export default reduxForm({
  form: 'PunishmentForm',
  validate,
  enableReinitialize: true,
})(PunishmentForm)
