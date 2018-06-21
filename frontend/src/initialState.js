import { setInitialState as getPrisonersInitialState } from './containers/Prisoners/initialState'
import { setInitialState as getEditPrisonersInitialState } from './containers/PrisonerEdit/initialState'

export default () => ({
  prisoners: getPrisonersInitialState(),
  edit: getEditPrisonersInitialState(),
  form: null,
})
