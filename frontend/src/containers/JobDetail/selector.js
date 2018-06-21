import { createSelector } from 'reselect'

export const jobSelector = createSelector(
  state => state.jobDetail,
  job => {
    if (!job) {
      return null
    }
    return job
  },
)
