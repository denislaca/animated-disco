import React from 'react'
import { Grid, Header } from 'semantic-ui-react'
import PunishmentCard from '../PunishmentCard/PunishmentCard'

export default ({ data, offenseFormOnSubmit, deleteOffense }) => {
  const punishments = data
  return (
    <div>
      <Header as='h3' dividing>
        Current
      </Header>
      {punishments.active.map(punishment => (
        <PunishmentCard
          deleteOffense={deleteOffense}
          offenseFormOnSubmit={offenseFormOnSubmit}
          key={punishment.id}
          punishmentId={punishment.id}
          data={punishment}
          active='true'
        />
      ))}
      <Header as='h3' dividing>
        History
      </Header>
      <Grid>
        {punishments.history.map(punishment => (
          <Grid.Column width={8}>
            <PunishmentCard
              data={punishment}
              punishmentId={punishment.id}
            />
          </Grid.Column>
        ))}
        {punishments.history.length === 0 ? 'No data' : ''}
      </Grid>
    </div>
  )
}
