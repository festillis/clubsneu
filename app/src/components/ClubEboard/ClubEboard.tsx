import { Stack, Typography } from '@suid/material';
import { Component, For, Match, Switch, createResource } from 'solid-js';
import { colors } from '~/constants';
import ClubEboardCard from '../ClubEboardCard';
import { clubClient } from '~/clients';

interface Props {
  clubId: string;
}

const ClubEboard: Component<Props> = ({ clubId }) => {
  const [ownerIds] = createResource(() =>
    clubClient.getOwnerIdsForClub(clubId)
  );

  return (
    <Switch>
      <Match when={ownerIds.loading}>
        <Typography>Loading...</Typography>
      </Match>
      <Match when={ownerIds.error}>
        <Typography>Error</Typography>
      </Match>
      <Match when={ownerIds()}>
        <Stack
          direction="column"
          sx={{
            padding: '2rem',
            borderRadius: '0.75rem',
            backgroundColor: '#FFFFFF',
            boxShadow: colors.BOX_SHADOW,
            gap: '1rem'
          }}>
          <Typography variant="h3">Eboard</Typography>
          <Stack
            direction="row"
            sx={{
              gap: '1.5rem',
              flexWrap: 'wrap'
              // overflowX: 'scroll'
            }}>
            <For each={ownerIds()}>
              {(ownerId) => <ClubEboardCard clubId={clubId} userId={ownerId} />}
            </For>
          </Stack>
        </Stack>
      </Match>
    </Switch>
  );
};

export default ClubEboard;
