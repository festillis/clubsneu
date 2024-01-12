import { Box, Stack } from '@suid/material';
import { Component, createEffect, createSignal, on } from 'solid-js';
import ClubTypesNavbar from '~/components/CategoryNavbar';
import { categories } from '~/components/CategoryNavbar/categories';
import { ChecklistOption } from '~/components/Checklist/types';
import ClubGrid from '~/components/ClubGrid';
import Footer from '~/components/Footer';
import Navbar from '~/components/Navbar';
import Sidebar from '~/components/Sidebar';
import { sortByOptions } from '~/components/Sidebar/options';
import {
  JoinStatus,
  MemberCount,
  MembershipProcess,
  SortBy
} from '~/components/Sidebar/types';

const Home: Component = () => {
  const [searchValue, setSearchValue] = createSignal<string>('');
  const [selectedCategory, setSelectedCategory] = createSignal<string>(
    categories[0]
  );
  const [selectedTags, setSelectedTags] = createSignal<string[]>([]);
  const [selectedSortBy, setSelectedSortBy] = createSignal<
    ChecklistOption<SortBy>
  >(sortByOptions[0]);
  const [selectedJoinStatuses, setSelectedJoinStatuses] = createSignal<
    JoinStatus[]
  >([]);
  const [selectedMembershipProcesses, setSelectedMembershipProcesses] =
    createSignal<MembershipProcess[]>([]);
  const [selectedMemberCounts, setSelectedMemberCounts] = createSignal<
    MemberCount[]
  >([]);

  // Clear all filters when category changes
  createEffect(
    on(selectedCategory, () => {
      // TODO: Find cleaner way to do this
      if (selectedCategory() === categories[0]) {
        setSelectedTags([]);
      } else {
        setSelectedTags([selectedCategory()]);
      }

      setSelectedSortBy(sortByOptions[0]);
      setSelectedJoinStatuses([]);
      setSelectedMembershipProcesses([]);
      setSelectedMemberCounts([]);
    })
  );

  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const onSelectedCategoryChange = (tagName: string) => {
    setSelectedCategory(tagName);
  };

  const onSelectedTagsChange = (tags: string[]) => {
    if (selectedCategory() !== categories[0] && tags.length !== 1) {
      setSelectedCategory(categories[0]);
    }
    setSelectedTags(tags);
  };

  const onSortChange = (option: ChecklistOption<SortBy>) => {
    setSelectedSortBy(option);
  };

  const onJoinStatusChange = (value: JoinStatus, checked: boolean) => {
    if (checked) {
      setSelectedJoinStatuses((prev) => [...prev, value]);
    } else {
      setSelectedJoinStatuses((prev) =>
        prev.filter((option) => option !== value)
      );
    }
  };

  const onMembershipProcessChange = (
    value: MembershipProcess,
    checked: boolean
  ) => {
    if (checked) {
      setSelectedMembershipProcesses((prev) => [...prev, value]);
    } else {
      setSelectedMembershipProcesses((prev) =>
        prev.filter((option) => option !== value)
      );
    }
  };

  const onMemberCountChange = (value: MemberCount, checked: boolean) => {
    if (checked) {
      setSelectedMemberCounts((prev) => [...prev, value]);
    } else {
      setSelectedMemberCounts((prev) =>
        prev.filter((option) => option !== value)
      );
    }
  };

  return (
    <>
      <Navbar searchValue={searchValue} onSearchChange={onSearchChange} />
      <Stack direction="row">
        <Sidebar
          selectedTags={selectedTags}
          onSelectedTagsChange={onSelectedTagsChange}
          selectedSortBy={selectedSortBy}
          onSortChange={onSortChange}
          selectedJoinStatuses={selectedJoinStatuses}
          onJoinStatusChange={onJoinStatusChange}
          selectedMembershipProcesses={selectedMembershipProcesses}
          onMembershipProcessChange={onMembershipProcessChange}
          selectedMemberCounts={selectedMemberCounts}
          onMemberCountChange={onMemberCountChange}
        />
        <Stack
          direction="column"
          sx={{
            width: '100%',
            alignItems: 'center',
            padding: '2rem',
            backgroundColor: '#FAF9F9'
          }}>
          <Box
            sx={{
              paddingBottom: '2rem'
            }}>
            <ClubTypesNavbar
              selected={selectedCategory}
              onSelectedChange={onSelectedCategoryChange}
            />
          </Box>
          <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <ClubGrid
              searchValue={searchValue}
              tags={selectedTags}
              sortBy={selectedSortBy}
              joinStatuses={selectedJoinStatuses}
              membershipProcesses={selectedMembershipProcesses}
              memberCounts={selectedMemberCounts}
            />
          </Stack>
        </Stack>
      </Stack>
      <Footer />
    </>
  );
};

export default Home;
