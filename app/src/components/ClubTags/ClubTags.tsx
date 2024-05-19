import { Stack, Typography } from '@suid/material';
import { Component, For, Match, Switch, createResource } from 'solid-js';
import { colors } from '~/constants';
import TagChip from '../ClubCard/TagChip';
import { clubClient } from '~/clients';

interface Props {
  clubId: string;
}

const ClubTags: Component<Props> = ({ clubId }) => {
  const [tags] = createResource(() => clubClient.getTagsForClub(clubId));

  return (
    <Stack
      direction="column"
      sx={{
        gap: '1rem',
        borderRadius: '0.75rem',
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        boxShadow: colors.BOX_SHADOW
      }}>
      <Typography variant="h3">Tags</Typography>
      <Switch>
        <Match when={tags.loading}>
          <Typography variant="body1">Loading...</Typography>
        </Match>
        <Match when={tags.error}>
          <Typography variant="body1">Something went wrong</Typography>
        </Match>
        <Match when={tags()}>
          <Stack
            direction="row"
            sx={{
              gap: '0.625rem',
              flexWrap: 'wrap'
            }}>
            <For each={tags()!}>{(tag) => <TagChip label={tag.name} />}</For>
          </Stack>
        </Match>
      </Switch>
    </Stack>
  );
};

export default ClubTags;
