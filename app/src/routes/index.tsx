import { Box, Stack } from '@suid/material';
import { Component, createSignal } from 'solid-js';
import ClubTypesNavbar from '~/components/CategoryNavbar';
import ClubGrid from '~/components/ClubGrid';
import Footer from '~/components/Footer';
import Navbar from '~/components/Navbar';
import Sidebar from '~/components/Sidebar';

const Home: Component = () => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = createSignal(0);

  const onSelectedChange = (idx: number) => {
    setSelectedCategoryIdx(idx);
  };

  return (
    <>
      <Navbar />
      <Stack direction="row">
        <Sidebar />
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
              selected={selectedCategoryIdx}
              onSelectedChange={onSelectedChange}
            />
          </Box>
          <Box
            sx={{
              maxWidth: '60rem' // Width of two club cards
            }}>
            <ClubGrid />
          </Box>
        </Stack>
      </Stack>
      <Footer />
    </>
  );
};

export default Home;
