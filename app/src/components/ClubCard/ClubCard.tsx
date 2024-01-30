import { Box, Divider, Skeleton, Stack, Typography } from '@suid/material';
import { Component, For, Match, Show, Switch, createResource } from 'solid-js';
import TagChip from './TagChip';
import GroupsIcon from '@suid/icons-material/Groups';
import { clubClient } from '~/clients';
import ClubCardSkeleton from './ClubCardSkeleton';
import { useNavigate } from '@solidjs/router';
import { colors } from '~/constants';

interface Props {
  clubId: string;
}

const ClubCard: Component<Props> = ({ clubId }) => {
  const navigate = useNavigate();

  const [club] = createResource(() => clubClient.getClubById(clubId));
  const [tags] = createResource(() => clubClient.getTagsForClub(clubId));

  const onCardClick = () => {
    navigate(`/club/${clubId}`);
  };

  return (
    <Switch>
      <Match when={club.loading || club.error || tags.loading || tags.error}>
        <ClubCardSkeleton />
      </Match>
      <Match when={club() && tags()}>
        <Stack
          onClick={onCardClick}
          direction="column"
          sx={{
            cursor: 'pointer',
            height: '18rem',
            // minWidth: '28.5rem',
            width: '28.5rem',
            borderRadius: '0.75rem',
            backgroundColor: '#FFFFFF',
            boxShadow: colors.BOX_SHADOW
          }}>
          <Stack
            direction="row"
            sx={{
              gap: '1rem',
              padding: '1.25rem',
              alignItems: 'center'
            }}>
            <Box
              width="2.5rem"
              height="2.5rem"
              sx={{
                backgroundColor: '#FAF9F9',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Show when={club()?.logoUrl} fallback={<GroupsIcon />}>
                <img
                  src={club()!.logoUrl!}
                  style={{
                    height: '100%',
                    width: '100%'
                  }}
                />
              </Show>
            </Box>
            <Typography variant="h3">{club()!.name}</Typography>
          </Stack>
          <Divider />
          <Stack
            direction="column"
            sx={{
              gap: '1.25rem',
              padding: '1.25rem',
              justifyContent: 'space-evenly'
            }}>
            <Typography variant="body1">{club()!.description}</Typography>
            <Stack
              direction="row"
              sx={{
                gap: '0.625rem',
                flexWrap: 'wrap'
              }}>
              <Switch>
                <Match when={tags.loading || tags.error}>
                  <For each={Array(6)}>
                    {() => (
                      <Skeleton
                        width={50}
                        height={10}
                        sx={{
                          borderRadius: '0.5rem'
                        }}
                      />
                    )}
                  </For>
                </Match>
                <Match when={tags()}>
                  <For each={tags()!}>
                    {(tag) => <TagChip label={tag.name} />}
                  </For>
                </Match>
              </Switch>
            </Stack>
          </Stack>
        </Stack>
      </Match>
    </Switch>
  );
};

export default ClubCard;
