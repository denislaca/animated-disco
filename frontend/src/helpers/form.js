import React from 'react'
import moment from 'moment'
import { Form, Input, Select, TextArea } from 'semantic-ui-react'
import DatePicker from 'react-datepicker/lib/index'


export const renderInput = ({ input, label, meta: { touched, error } }) => (
  <Form.Field
    control={Input}
    label={label}
    placeholder={label}
    error={touched && error}
    {...input}
  />
)

export const renderDatePicker = ({ input, label, meta: { touched, error } }) => (
  <Form.Field
    control={DatePicker}
    selected={moment(input.value)}
    placeholderText={label}
    onChange={data => {
      input.onChange(data)
    }}
    dateFormat='LLL'
    label={label}
    error={touched && error}
  />
)

export const renderSelect = ({ input, options, label, meta: { touched, error } }) => (
  <Form.Field
    control={Select}
    label={label}
    options={options}
    error={touched && error}
    onChange={(e, { value }) => {
      input.onChange(value)
    }}
    value={input.value}
  />
)

export const renderTextArea = ({ input, label, placeholder }) => (
  <Form.Field
    control={TextArea}
    label={label}
    placeholder={placeholder}
    {...input}
  />
)
