import { createSelector } from 'reselect'
import moment from 'moment'

export const editSelector = createSelector(
  state => state.edit,
  prisoners => {
    if (!prisoners) {
      return null
    }
    const obj = Object.values(prisoners).map(data => data)[0]
    return {
      ...obj,
      date_of_birth: moment(new Date(obj.date_of_birth)).locale('en'),
    }
  },
)
