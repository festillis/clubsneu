import { useParams } from '@solidjs/router';
import { Box, Stack, Typography } from '@suid/material';
import {
  Component,
  Match,
  Switch,
  createResource,
  createSignal
} from 'solid-js';
import { clubClient } from '~/clients';
import LoadingPage from '~/components/LoadingPage';
import Navbar from '~/components/Navbar';
import ErrorPage from '~/components/ErrorPage';
import ClubProfile from '~/components/ClubProfile';
import ClubDescription from '~/components/ClubDescription';
import ClubFAQ from '~/components/ClubFAQ';
import ClubEboard from '~/components/ClubEboard';
import ClubInfo from '~/components/ClubInfo';
import ClubContact from '~/components/ClubContact';
import ClubUpcomingEvent from '~/components/ClubUpcomingEvent';
import Footer from '~/components/Footer';
import { JoinStatus, MembershipProcess } from '~/components/Sidebar/types';

interface Params extends Record<string, string> {
  id: string;
}

interface Props {}

const ClubPage: Component<Props> = () => {
  const params = useParams<Params>();
  const id = params.id;

  const [club] = createResource(() => clubClient.getClubById(id));

  const [searchValue, setSearchValue] = createSignal('');

  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <Switch>
      <Match when={club.loading}>
        <LoadingPage />
      </Match>
      <Match when={club.error}>
        <ErrorPage />
      </Match>
      <Match when={club() == null}>
        <Stack
          sx={{
            width: '100vw',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Typography>Club not found</Typography>
        </Stack>
      </Match>
      <Match when={club()}>
        <Stack
          direction="column"
          sx={{
            backgroundColor: '#FAF9F9'
          }}>
          <Navbar searchValue={searchValue} onSearchChange={onSearchChange} />
          <Stack direction="row">
            {/* Outer Left Column */}
            <Stack
              direction="column"
              sx={{
                flex: 0.65,
                alignItems: 'center',
                py: '2rem'
              }}>
              {/* Inner Left Column */}
              <Stack
                direction="column"
                sx={{
                  gap: '1.25rem',
                  maxWidth: '52.6875rem'
                }}>
                {/* Profile Box */}
                <ClubProfile name={club()!.name} logoUrl={club()!.logoUrl} />

                {/* Description */}
                <ClubDescription description={club()!.description} />

                {/* FAQ */}
                <ClubFAQ />

                {/* Eboard */}
                <ClubEboard />
              </Stack>
            </Stack>
            {/* Outer Right Column */}
            <Stack
              direction="column"
              sx={{
                py: '2rem',
                flex: 0.35
              }}>
              {/* Inner Right Column */}
              <Stack
                direction="column"
                sx={{
                  gap: '1.25rem',
                  maxWidth: '25.3125rem'
                }}>
                <ClubInfo
                  memberCount={club()!.memberCount}
                  joinStatus={club()!.joinStatus as JoinStatus}
                  membershipProcess={
                    club()!.membershipProcess as MembershipProcess
                  }
                />
                <ClubContact />
                <ClubUpcomingEvent />
              </Stack>
            </Stack>
          </Stack>
          <Footer />
        </Stack>
      </Match>
    </Switch>
  );
};

export default ClubPage;
