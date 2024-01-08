import { Stack, Typography } from '@suid/material';
import { Accessor, Component } from 'solid-js';
import Select from '../Select';
import TagSelect from '../TagSelect';
import { JoinStatus, MemberCount, MembershipProcess, SortBy } from './types';
import Checklist from '../Checklist';
import {
  joinStatusOptions,
  memberCountOptions,
  membershipProcessOptions,
  sortByOptions
} from './options';
import { ChecklistOption } from '../Checklist/types';

interface Props {
  selectedTags: Accessor<string[]>;
  onSelectedTagsChange: (tags: string[]) => void;

  selectedSortBy: Accessor<ChecklistOption<SortBy>>;
  onSortChange: (value: ChecklistOption<SortBy>) => void;

  selectedJoinStatuses: Accessor<JoinStatus[]>;
  onJoinStatusChange: (value: JoinStatus, checked: boolean) => void;

  selectedMembershipProcesses: Accessor<MembershipProcess[]>;
  onMembershipProcessChange: (
    value: MembershipProcess,
    checked: boolean
  ) => void;

  selectedMemberCounts: Accessor<MemberCount[]>;
  onMemberCountChange: (value: MemberCount, checked: boolean) => void;
}

const Sidebar: Component<Props> = ({
  selectedTags,
  onSelectedTagsChange,
  selectedSortBy,
  onSortChange,
  selectedJoinStatuses,
  onJoinStatusChange,
  selectedMembershipProcesses,
  onMembershipProcessChange,
  selectedMemberCounts,
  onMemberCountChange
}) => {
  return (
    <Stack
      direction="column"
      sx={{
        gap: '3.75rem',
        backgroundColor: '#ffffff',
        padding: '3.5rem 1.5rem',
        width: '28.5rem'
      }}>
      {/* Results */}
      {/* <Stack direction="row"> */}
      {/* <Typography fontWeight={600} fontSize="1.125rem">
          554
        </Typography>
        &nbsp;
        <Typography fontWeight={500} fontSize="1.125rem">
          Results
        </Typography> */}
      {/* </Stack> */}

      {/* Tags */}
      <Stack direction="column" gap="1rem">
        <Typography fontWeight={600} fontSize="1.125rem">
          Tags
        </Typography>
        <TagSelect
          selectedTags={selectedTags}
          onSelectedTagsChange={onSelectedTagsChange}
        />
      </Stack>

      {/* Sort by */}
      <Stack direction="column" gap="1rem">
        <Typography fontWeight={600} fontSize="1.125rem">
          Sort
        </Typography>
        <Select
          value={selectedSortBy}
          onChange={onSortChange}
          options={sortByOptions}
          placeholder="None selected"
        />
      </Stack>

      {/* Join Status */}
      <Stack direction="column" gap="1rem">
        <Typography fontWeight={600} fontSize="1.125rem">
          Join Status
        </Typography>
        <Checklist
          selectedValues={selectedJoinStatuses}
          options={joinStatusOptions}
          onChange={onJoinStatusChange}
        />
      </Stack>

      {/* Membership Process */}
      <Stack direction="column" gap="1rem">
        <Typography fontWeight={600} fontSize="1.125rem">
          Membership Process
        </Typography>
        <Checklist
          selectedValues={selectedMembershipProcesses}
          options={membershipProcessOptions}
          onChange={onMembershipProcessChange}
        />
      </Stack>

      {/* Member Count */}
      <Stack direction="column" gap="1rem">
        <Typography fontWeight={600} fontSize="1.125rem">
          Member Count
        </Typography>
        <Checklist
          selectedValues={selectedMemberCounts}
          options={memberCountOptions}
          onChange={onMemberCountChange}
        />
      </Stack>
    </Stack>
  );
};

export default Sidebar;
