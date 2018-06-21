import { createSelector } from 'reselect'

export const cellsSelector = createSelector(
  state => state.cells,
  cells => {
    if (!cells) {
      return null
    }
    return Object.values(cells).map(data => data)
  },
)
