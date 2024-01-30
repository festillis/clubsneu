import { Stack, Typography } from '@suid/material';
import { Component, Match, Switch } from 'solid-js';
import GroupOutlinedIcon from '@suid/icons-material/GroupOutlined';
import CancelOutlinedIcon from '@suid/icons-material/CancelOutlined';
import CheckCircleOutlinedIcon from '@suid/icons-material/CheckCircleOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@suid/icons-material/DriveFileRenameOutlineOutlined';
import MeetingRoomOutlinedIcon from '@suid/icons-material/MeetingRoomOutlined';
import AccessibilityNewOutlinedIcon from '@suid/icons-material/AccessibilityNewOutlined';
import { colors } from '~/constants';
import { JoinStatus, MembershipProcess } from '../Sidebar/types';
import { conversionUtils, countUtils } from '~/utils';

interface Props {
  memberCount: number;
  joinStatus: JoinStatus;
  membershipProcess: MembershipProcess;
}

const ClubInfo: Component<Props> = ({
  memberCount,
  joinStatus,
  membershipProcess
}) => {
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
      <Typography variant="h3">Club Info</Typography>
      <Stack
        direction="row"
        sx={{
          gap: '1rem'
        }}>
        <GroupOutlinedIcon />
        <Typography>
          {countUtils.memberCountToRangeString(memberCount)} Members
        </Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          gap: '1rem'
        }}>
        <Switch>
          <Match when={joinStatus === 'accepting-members'}>
            <CheckCircleOutlinedIcon />
          </Match>
          <Match when={joinStatus === 'not-accepting-members'}>
            <CancelOutlinedIcon />
          </Match>
        </Switch>
        <Typography>
          {conversionUtils.joinStatusToString(joinStatus)}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          gap: '1rem'
        }}>
        <Switch>
          <Match when={membershipProcess === 'application-required'}>
            <DriveFileRenameOutlineOutlinedIcon />
          </Match>
          <Match when={membershipProcess === 'audition-required'}>
            <AccessibilityNewOutlinedIcon />
          </Match>
          <Match when={membershipProcess === 'open-membership'}>
            <MeetingRoomOutlinedIcon />
          </Match>
        </Switch>
        <Typography>
          {conversionUtils.membershipProcessToString(membershipProcess)}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ClubInfo;
