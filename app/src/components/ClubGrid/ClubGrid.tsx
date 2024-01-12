import { Grid } from '@suid/material';
import {
  Accessor,
  Component,
  For,
  Match,
  Switch,
  createEffect,
  createResource,
  on
} from 'solid-js';
import ClubCard from '../ClubCard';
import { clubClient } from '~/clients';
import ClubCardSkeleton from '../ClubCard/ClubCardSkeleton';
import {
  JoinStatus,
  MemberCount,
  MembershipProcess,
  SortBy
} from '../Sidebar/types';
import { ChecklistOption } from '../Checklist/types';
import { arrayUtils } from '~/utils';

const NUMBER_OF_CLUB_SKELETONS = 8;

interface Props {
  searchValue: Accessor<string>;
  tags: Accessor<string[]>;
  sortBy: Accessor<ChecklistOption<SortBy>>;
  joinStatuses: Accessor<JoinStatus[]>;
  membershipProcesses: Accessor<MembershipProcess[]>;
  memberCounts: Accessor<MemberCount[]>;
}

const ClubGrid: Component<Props> = ({
  searchValue,
  tags,
  sortBy,
  joinStatuses,
  membershipProcesses,
  memberCounts
}) => {
  const [clubIds, { refetch: refetchClubIds }] = createResource(() =>
    clubClient.getClubIdsByFilter(
      {
        name: searchValue() ? searchValue() : undefined,
        tagNames: arrayUtils.undefinedIfEmpty(tags()),
        joinStatuses: arrayUtils.undefinedIfEmpty(joinStatuses()),
        membershipProcesses: arrayUtils.undefinedIfEmpty(membershipProcesses()),
        memberCounts: arrayUtils.undefinedIfEmpty(memberCounts())
      },
      sortBy().value
    )
  );

  createEffect(
    on(
      [
        searchValue,
        tags,
        sortBy,
        joinStatuses,
        membershipProcesses,
        memberCounts
      ],
      () => {
        refetchClubIds();
      }
    )
  );

  return (
    <Grid
      container
      sx={{
        width: '58.13rem', // Width of 2 ClubCards + 1rem gap + some box shadow
        gap: '1rem',
        justifyContent: 'flex-start'
      }}>
      <Switch>
        <Match when={clubIds.loading || clubIds.error}>
          <For each={Array(NUMBER_OF_CLUB_SKELETONS)}>
            {() => (
              <Grid item>
                <ClubCardSkeleton />
              </Grid>
            )}
          </For>
        </Match>
        <Match when={clubIds()}>
          <For each={clubIds()}>
            {(clubId) => (
              <Grid item>
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
