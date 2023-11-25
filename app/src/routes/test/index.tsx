import { Button, Stack } from '@suid/material';
import { Component } from 'solid-js';
import server$ from 'solid-start/server';
import { prisma } from '~/prisma';

const Test: Component = () => {
  const serverDeleteAllUsers = server$(async () => {
    try {
      const result = await prisma.user.deleteMany();
      return `Deleted ${result.count} users`;
    } catch (e) {
      return e;
    }
  });

  const onDeleteAllUsers = async () => {
    const result = await serverDeleteAllUsers();
    console.log(result);
  };

  return (
    <Stack>
      <Button onClick={onDeleteAllUsers}>Delete All Users</Button>
    </Stack>
  );
};

export default Test;
