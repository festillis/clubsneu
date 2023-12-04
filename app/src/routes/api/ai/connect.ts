import { APIEvent, json } from 'solid-start';
import { ApiClient } from '~/api_client';

const CLIENT_ID = '6939495986099408';

export const GET = async ({ request }: APIEvent) => {
  try {
    const connectApi = new ApiClient('https://www.mapillary.com/connect');
    const connectResult = await connectApi.req('GET', {
      params: {
        client_id: CLIENT_ID,
        redirect_uri: 'http://localhost:3000/api/ai/redirect',
        response_type: 'code',
        scope: 'read'
      }
    });

    console.log({ connectResult });
    return json(connectResult);
  } catch (e) {
    console.log(e);
    return json({ error: e }, { status: 500 });
  }
};
