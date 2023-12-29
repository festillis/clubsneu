import { Stack, Typography } from '@suid/material';
import { Component, createSignal } from 'solid-js';
import Select from '../Select';
import { ChecklistOption } from '../Checklist/Checklist';
import Checklist from '../Checklist';
import TagSelect from '../TagSelect';

const joinStatusOptions: ChecklistOption[] = [
  {
    label: 'Accepting Members',
    value: 'Accepting Members',
    checked: false
  },
  {
    label: 'Not Accepting Members',
    value: 'Not Accepting Members',
    checked: false
  }
];

const membershipProcessOptions: ChecklistOption[] = [
  {
    label: 'Open Membership',
    value: 'Open Membership',
    checked: false
  },
  {
    label: 'Audition Required',
    value: 'Audition Required',
    checked: false
  },
  {
    label: 'Application Required',
    value: 'Application Required',
    checked: false
  }
];

const memberCountOptions: ChecklistOption[] = [
  {
    label: 'Less than 20',
    value: 'Less than 20',
    checked: false
  },
  {
    label: '20 - 50',
    value: '20 - 50',
    checked: false
  },
  {
    label: '50 - 100',
    value: '50 - 100',
    checked: false
  },
  {
    label: '100 - 150',
    value: '100 - 150',
    checked: false
  },
  {
    label: 'More than 150',
    value: 'More than 150',
    checked: false
  }
];

const Sidebar: Component = () => {
  const [selectedTags, setSelectedTags] = createSignal<string[]>([]);
  const [selectedSortValue, setSelectedSortValue] = createSignal('');
  const [selectedJoinStatus, setSelectedJoinStatus] =
    createSignal(joinStatusOptions);
  const [selectedMembershipProcess, setSelectedMembershipProcess] =
    createSignal(membershipProcessOptions);
  const [selectedMemberCount, setSelectedMemberCount] =
    createSignal(memberCountOptions);

  const onSortChange = (value: string) => {
    setSelectedSortValue(value);
  };

  const onJoinStatusChange = (value: string, checked: boolean) => {
    setSelectedJoinStatus((prev) =>
      prev.map((option) => {
        if (option.value === value) {
          return {
            ...option,
            checked
          };
        }

        return option;
      })
    );
  };

  const onMembershipProcessChange = (value: string, checked: boolean) => {
    setSelectedMembershipProcess((prev) =>
      prev.map((option) => {
        if (option.value === value) {
          return {
            ...option,
            checked
          };
        }

        return option;
      })
    );
  };

  const onMemberCountChange = (value: string, checked: boolean) => {
    setSelectedMemberCount((prev) =>
      prev.map((option) => {
        if (option.value === value) {
          return {
            ...option,
            checked
          };
        }

        return option;
      })
    );
  };

  return (
    <Stack
      direction="column"
      sx={{
        gap: '3.75rem',
        backgroundColor: '#ffffff',
        padding: '3.5rem 1.5rem',
        width: '25rem'
      }}>
      {/* Results */}
      <Stack direction="row">
        <Typography fontWeight={600} fontSize="1.125rem">
          554
        </Typography>
        &nbsp;
        <Typography fontWeight={500} fontSize="1.125rem">
          Results
        </Typography>
      </Stack>

      {/* Tags */}
      <Stack direction="column" gap="1rem">
        <Typography fontWeight={600} fontSize="1.125rem">
          Tags
        </Typography>
        <TagSelect
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </Stack>

      {/* Sort by */}
      <Stack direction="column" gap="1rem">
        <Typography fontWeight={600} fontSize="1.125rem">
          Sort
        </Typography>
        <Select
          value={selectedSortValue}
          onChange={onSortChange}
          options={['Name', 'Date']}
          placeholder="None selected"
        />
      </Stack>

      {/* Join Status */}
      <Stack direction="column" gap="1rem">
        <Typography fontWeight={600} fontSize="1.125rem">
          Join Status
        </Typography>
        <Checklist options={selectedJoinStatus} onChange={onJoinStatusChange} />
      </Stack>

      {/* Membership Process */}
      <Stack direction="column" gap="1rem">
        <Typography fontWeight={600} fontSize="1.125rem">
          Membership Process
        </Typography>
        <Checklist
          options={selectedMembershipProcess}
          onChange={onMembershipProcessChange}
        />
      </Stack>

      {/* Member Count */}
      <Stack direction="column" gap="1rem">
        <Typography fontWeight={600} fontSize="1.125rem">
          Member Count
        </Typography>
        <Checklist
          options={selectedMemberCount}
          onChange={onMemberCountChange}
        />
      </Stack>
    </Stack>
  );
};

export default Sidebar;
