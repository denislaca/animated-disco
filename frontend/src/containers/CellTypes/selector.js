import { createSelector } from 'reselect'

export const cellTypesSelector = createSelector(
  state => state.cellTypes,
  cellTypes => {
    if (!cellTypes) {
      return null
    }
    return Object.values(cellTypes).map(data => data)
  },
)
