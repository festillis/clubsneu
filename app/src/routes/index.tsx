import { Box, Grid, Stack, useTheme } from '@suid/material';
import { Component, For, Show, createSignal } from 'solid-js';
import ClubCard from '~/components/ClubCard';
import ClubTypesNavbar from '~/components/ClubTypesNavbar';
import Footer from '~/components/Footer';
import Navbar from '~/components/Navbar';
import Sidebar from '~/components/Sidebar';
import sandboxIcon from '~/icons/sandbox-icon.jpeg';

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
            <Grid
              container
              spacing={2}
              sx={{
                flexWrap: 'wrap'
              }}>
              <For each={Array(9)}>
                {() => (
                  <Grid item md={12} lg={6}>
                    <ClubCard
                      icon={
                        <img
                          src={sandboxIcon}
                          style={{
                            height: '100%',
                            width: '100%'
                          }}
                        />
                      }
                    />
                  </Grid>
                )}
              </For>
            </Grid>
          </Box>
        </Stack>
      </Stack>
      <Footer />
    </>
  );
};

export default Home;
