import { APIEvent, json } from 'solid-start';
import { ApiClient } from '~/api_client';

const CLIENT_ID = '6939495986099408';
const CLIENT_SECRET = 'MLY|6939495986099408|ee4ad6a58f11ac7ca80c77ca20bdaf14';

export const GET = async ({ request }: APIEvent) => {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const authCode = searchParams.get('code');

    if (!authCode) {
      console.log('No authorization code provided. Invalid login process.');
      return json(
        { error: 'No authorization code provided. Invalid login process.' },
        { status: 400 }
      );
    }

    console.log({ authCode });

    const tokenApi = new ApiClient('https://graph.mapillary.com/token');
    const tokenResult = await tokenApi.req<{
      access_token: string;
      expires_in: number;
      token_type: string;
    }>('POST', {
      headers: {
        Authorization: `OAuth ${CLIENT_SECRET}`
      },
      params: {
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        code: authCode
      }
    });

    const { access_token, expires_in, token_type } = tokenResult;

    console.log({ access_token, expires_in, token_type });
    return json({ access_token, expires_in, token_type });
  } catch (error) {
    console.log(error);
    return json({ error }, { status: 500 });
  }
};
