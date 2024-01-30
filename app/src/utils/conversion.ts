import { JoinStatus, MembershipProcess } from '~/components/Sidebar/types';

export const joinStatusToString = (joinStatus: JoinStatus) => {
  switch (joinStatus) {
    case 'accepting-members':
      return 'Accepting Members';
    case 'not-accepting-members':
      return 'Not Accepting Members';
  }
};

export const membershipProcessToString = (
  membershipProcess: MembershipProcess
) => {
  switch (membershipProcess) {
    case 'application-required':
      return 'Application Required';
    case 'audition-required':
      return 'Audition Required';
    case 'open-membership':
      return 'Open Membership';
  }
};
