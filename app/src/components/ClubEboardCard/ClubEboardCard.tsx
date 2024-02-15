import { Box, Stack, Typography } from '@suid/material';
import { Component, Match, Show, Switch, createResource } from 'solid-js';
import GroupsIcon from '@suid/icons-material/Groups';
import { colors } from '~/constants';
import ClubEboardCardSkeleton from './ClubEboardCardSkeleton';
import { profileClient } from '~/clients/profile';
import { clubClient } from '~/clients';

interface Props {
  clubId: string;
  userId: string;
}

const ClubEboardCard: Component<Props> = ({ clubId, userId }) => {
  const [profile] = createResource(() =>
    profileClient.getProfileByUserId(userId)
  );

  const [clubOwner] = createResource(() =>
    clubClient.getClubOwnerById(clubId, userId)
  );

  return (
    <Switch>
      <Match
        when={
          profile.loading ||
          profile.error ||
          clubOwner.loading ||
          clubOwner.error
        }>
        <ClubEboardCardSkeleton />
      </Match>
      <Match when={profile() && clubOwner()}>
        <Stack
          direction="column"
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '1rem',
            width: '15rem',
            borderRadius: '0.75rem',
            boxShadow: colors.BOX_SHADOW
          }}>
          <Box
            sx={{
              borderRadius: '100%',
              height: '6rem',
              width: '6rem',
              backgroundColor: '#FAF9F9'
            }}>
            <Show
              when={profile()!.avatarUrl}
              fallback={
                <GroupsIcon
                  sx={{
                    color: '#00000095',
                    transform: 'scale(0.75)',
                    height: '100%',
                    width: '100%'
                  }}
                />
              }>
              <img
                src={profile()!.avatarUrl!}
                style={{
                  height: '100%',
                  width: '100%'
                }}
              />
            </Show>
          </Box>
          <Typography variant="h4">{profile()!.name}</Typography>
          <Show when={profile()!.pronouns}>
            <Typography variant="caption">{profile()!.pronouns}</Typography>
          </Show>
          <Typography variant="body1">{clubOwner()!.role}</Typography>
        </Stack>
      </Match>
    </Switch>
  );
};

export default ClubEboardCard;
