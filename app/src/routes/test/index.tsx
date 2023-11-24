import { Button, Stack } from '@suid/material';
import { Component } from 'solid-js';
import server$ from 'solid-start/server';
import { prisma } from '~/prisma';
import { toSafe } from '~/utils/safe';

const Test: Component = () => {
  const onTestServer = server$(async () => {
    return await toSafe(async () => {
      return await prisma.user.create({
        data: {
          id: '1',
          name: 'test',
          email: 'test@test.com',
          accessToken: 'testAccessToken',
          refreshToken: 'testRefreshToken',
          accessTokenExpiry: new Date()
        }
      });
    });
  });

  const onTest = async () => {
    const result = await onTestServer();
    console.log('result', result);
  };

  return (
    <Stack>
      <Button onClick={onTest}>Test</Button>
    </Stack>
  );
};

export default Test;
