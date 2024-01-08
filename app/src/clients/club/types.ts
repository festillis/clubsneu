import {
  JoinStatus,
  MemberCount,
  MembershipProcess
} from '~/components/Sidebar/types';

export interface ClubFilters {
  tagNames?: string[];
  joinStatuses?: JoinStatus[];
  membershipProcesses?: MembershipProcess[];
  memberCounts?: MemberCount[];
}
