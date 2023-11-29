import { Button, Stack } from '@suid/material';
import { Component } from 'solid-js';
import server$ from 'solid-start/server';

import { clubService, userService } from '~/services';
import { toSafe } from '~/utils/safe';

const serverCreateUser = server$(userService.createUser);
const serverCreateClub = server$(clubService.createClub);
const serverAddOwnerToClub = server$(clubService.addOwnerToClub);
const serverFixRoles = server$(userService.fixRoles);

const Test: Component = () => {
  const onFixDbConstraints = async () => {
    const result = await toSafe(serverFixRoles);

    console.log(result);
  };

  const onCreateUser = async () => {
    const result = await toSafe(() =>
      serverCreateUser({
        id: 'user1',
        email: 'user1@gmail.com',
        name: 'user1',
        accessToken: 'fake_access_token',
        refreshToken: 'fake_refresh_token',
        accessTokenExpiry: new Date(),
        role: 'exec',
        provider: 'google'
      })
    );

    console.log(result);
  };

  const onCreateClub = async () => {
    const result = await toSafe(() =>
      serverCreateClub({
        name: 'club 1'
      })
    );

    console.log(result);
  };

  const onAddOwnerToClub = async () => {
    const club1Id = '08f41813-50e4-4fc4-a289-a866304a6132';
    const result = await toSafe(() => serverAddOwnerToClub(club1Id, 'user1'));

    console.log(result);
  };

  return (
    <Stack>
      <Button onClick={onFixDbConstraints}>Fix Db Constraints</Button>
      <Button onClick={onCreateClub}>Create Club</Button>
      <Button onClick={onCreateUser}>Create User</Button>
      <Button onClick={onAddOwnerToClub}>Add Owner To Club</Button>
    </Stack>
  );
};

export default Test;
