import { Grid } from '@suid/material';
import { Component, For, Match, Switch, createResource } from 'solid-js';
import ClubCard from '../ClubCard';
import { clubClient } from '~/api_client';
import ClubCardSkeleton from '../ClubCardSkeleton';

const NUMBER_OF_CLUB_SKELETONS = 8;

interface Props {}

const ClubGrid: Component<Props> = () => {
  const [clubIds] = createResource(clubClient.getAllClubIds);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        flexWrap: 'wrap'
      }}>
      <Switch>
        <Match when={clubIds.loading || clubIds.error}>
          <For each={Array(NUMBER_OF_CLUB_SKELETONS)}>
            {() => (
              <Grid item md={12} lg={6}>
                <ClubCardSkeleton />
              </Grid>
            )}
          </For>
        </Match>
        <Match when={clubIds()}>
          <For each={Array(NUMBER_OF_CLUB_SKELETONS).fill(clubIds()).flat()}>
            {(clubId) => (
              <Grid item md={12} lg={6}>
                <ClubCard clubId={clubId} />
              </Grid>
            )}
          </For>
        </Match>
      </Switch>
    </Grid>
  );
};

export default ClubGrid;
