import { createSelector } from 'reselect'

export const prisonerSelector = createSelector(
  state => state.prisonerDetail,
  prisoner => {
    // TODO-SELECTOR
    if (!prisoner) {
      return null
    }
    return prisoner
    //return Object.values(prisonerDetail)
  },
)
