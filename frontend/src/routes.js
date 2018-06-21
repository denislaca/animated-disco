import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import NotFound from './components/NotFound/NotFound'
import Menu from './components/Menu/Menu'
import Dashboard from './containers/Dashboard/Dashboard'
import Prisoners from './containers/Prisoners/Prisoners'
import PrisonerEdit from './containers/PrisonerEdit/PrisonerEdit'
import PrisonerAdd from './containers/PrisonerAdd/PrisonerAdd'
import PrisonerDetail from './containers/PrisonerDetail/PrisonerDetail'
import PunishmentAdd from './containers/PunishmentAdd/PunishmentAdd'
import Cells from './containers/Cells/Cells'
import CellAdd from './containers/CellAdd/CellAdd'
import CellEdit from './containers/CellEdit/CellEdit'
import CellTypes from './containers/CellTypes/CellTypes'
import CellTypeAdd from './containers/CellTypeAdd/CellTypeAdd'
import CellTypeEdit from './containers/CellTypeEdit/CellTypeEdit'
import Jobs from './containers/Jobs/Jobs'
import JobAdd from './containers/JobAdd/JobAdd'
import JobEdit from './containers/JobEdit/JobEdit'
import JobDetail from './containers/JobDetail/JobDetail'
import JobAttendanceAdd from './containers/JobAttandanceAdd/JobAttandanceAdd'
import HealthcareReportAdd from './containers/HealthcareReportAdd/HealthcareReportAdd'

const Routes = () => (
  <Router>
    <div>
      <Route path='/' component={Menu} />
      <div className='ui container-fluid'>
        <Route exact path='/' render={() => <Redirect to='/home' component={Dashboard} />} />
        <Switch>
          <Route exact path='/home' component={Dashboard} />
          <Route exact path='/sample' component={Menu} />
          <Route exact path='/prisoners' component={Prisoners} />
          <Route exact path='/prisoners/create' component={PrisonerAdd} />
          <Route exact path='/prisoners/edit/:id' component={PrisonerEdit} />
          <Route exact path='/prisoners/view/:id' render={props => <PrisonerDetail id={props.match.params.id} />} />
          <Route exact path='/punishments/add*' component={PunishmentAdd} />
          <Route exact path='/cells' component={Cells} />
          <Route exact path='/cells/create' component={CellAdd} />
          <Route exact path='/cells/edit/:id' render={props => <CellEdit id={props.match.params.id} />} />
          <Route exact path='/cells/types' component={CellTypes} />
          <Route exact path='/cells/types/create' component={CellTypeAdd} />
          <Route exact path='/cells/types/edit/:id' render={props => <CellTypeEdit id={props.match.params.id} />} />
          <Route exact path='/jobs' component={Jobs} />
          <Route exact path='/jobs/create' component={JobAdd} />
          <Route exact path='/jobs/edit/:id' render={props => <JobEdit id={props.match.params.id} />} />
          <Route exact path='/jobs/view/:id' render={props => <JobDetail id={props.match.params.id} />} />
          <Route exact path='/jobs/attendance/add/:id' render={props => <JobAttendanceAdd id={props.match.params.id} />} />
          <Route exact path='/healthcare/add/:id' render={props => <HealthcareReportAdd id={props.match.params.id} />} />
          <Route exact path='*' component={NotFound} />
        </Switch>
      </div>
    </div>
  </Router>
)

export default Routes
