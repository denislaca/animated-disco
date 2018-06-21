import { createSelector } from 'reselect'

export const prisonersSelector = createSelector(
  state => state.prisoners,
  prisoners => {
    if (!prisoners) {
      return null
    }
    return Object.values(prisoners).map(data => data)
  },
)
