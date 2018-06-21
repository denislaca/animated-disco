import { combineReducers } from 'redux'
import { reducer as reduxReducer } from 'redux-form'
import prisoners from './containers/Prisoners/reducer'
import edit from './containers/PrisonerEdit/reducer'
import dashboard from './containers/Dashboard/reducer'
import prisonerDetail from './containers/PrisonerDetail/reducer'
import punishment from './containers/PunishmentAdd/reducer'
import cells from './containers/Cells/reducer'
import cellTypes from './containers/CellTypes/reducer'

export default combineReducers({
  prisoners,
  edit,
  dashboard,
  punishment,
  form: reduxReducer,
  prisonerDetail,
  cells,
  cellTypes
})
