import { Stack, Typography } from '@suid/material';
import { Component, For, Match, Show, Switch, createResource } from 'solid-js';
import PlaceIcon from '@suid/icons-material/Place';
import { colors } from '~/constants';
import { calendarService } from '~/services';
import { dateUtils } from '~/utils';

interface Props {
  calendarUrl: string;
}

const ClubUpcomingEvent: Component<Props> = ({ calendarUrl }) => {
  const [events] = createResource(() =>
    calendarService.getCalendarEvents(calendarUrl, { upcomingOnly: true })
  );

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
      <Typography variant="h3">Upcoming Events</Typography>
      <Switch>
        <Match when={events.loading}>
          <Typography variant="body1">Loading...</Typography>
        </Match>
        <Match when={events.error}>
          <Typography variant="body1">Something went wrong</Typography>
        </Match>
        <Match when={events()}>
          <For each={events()}>
            {(event) => (
              <Stack
                direction="column"
                sx={{
                  borderRadius: '0.75rem',
                  boxShadow: colors.BOX_SHADOW,
                  padding: '1rem',
                  gap: '1.25rem'
                }}>
                <Typography variant="body2">{event.summary}</Typography>
                <Show when={event.location}>
                  <Stack
                    direction="row"
                    sx={{
                      gap: '0.5rem'
                    }}>
                    <PlaceIcon htmlColor={colors.RED} />
                    <Typography variant="body1">{event.location}</Typography>
                  </Stack>
                </Show>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: 'space-between'
                  }}>
                  <Typography variant="caption">
                    {dateUtils.toLocaleDateString(event.start.dateTime)}
                  </Typography>
                  <Typography variant="caption">
                    {dateUtils.toLocaleTimeString(event.start.dateTime)}
                    &nbsp;-&nbsp;
                    {dateUtils.toLocaleTimeString(event.end.dateTime)}
                  </Typography>
                </Stack>
              </Stack>
            )}
          </For>
        </Match>
      </Switch>
    </Stack>
  );
};

export default ClubUpcomingEvent;
