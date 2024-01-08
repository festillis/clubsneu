import { ChecklistOption } from '../Checklist/types';
import { JoinStatus, MemberCount, MembershipProcess, SortBy } from './types';

// Values must be properties of the `Club` model
export const sortByOptions: ChecklistOption<SortBy>[] = [
  {
    label: 'Name',
    value: 'name'
  },
  {
    label: 'Date',
    value: 'createdAt'
  }
];

export const joinStatusOptions: ChecklistOption<JoinStatus>[] = [
  {
    label: 'Accepting Members',
    value: 'accepting-members'
  },
  {
    label: 'Not Accepting Members',
    value: 'not-accepting-members'
  }
];

export const membershipProcessOptions: ChecklistOption<MembershipProcess>[] = [
  {
    label: 'Open Membership',
    value: 'open-membership'
  },
  {
    label: 'Audition Required',
    value: 'audition-required'
  },
  {
    label: 'Application Required',
    value: 'application-required'
  }
];

export const memberCountOptions: ChecklistOption<MemberCount>[] = [
  {
    label: 'Less than 20',
    value: 'less-than-20'
  },
  {
    label: '20 - 50',
    value: '20-50'
  },
  {
    label: '50 - 100',
    value: '50-100'
  },
  {
    label: '100 - 150',
    value: '100-150'
  },
  {
    label: 'More than 150',
    value: 'more-than-150'
  }
];
