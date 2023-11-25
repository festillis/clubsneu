import { Prisma } from '@prisma/client';
import { APIEvent, json } from 'solid-start';
import { prisma } from '~/prisma';

const accessPermitted = (
  request: Request,
  dbAccessToken: string,
  dbAccessTokenExpiry: Date
) => {
  const token = request.headers
    .get('Authorization')
    ?.replace('Bearer', '')
    .trim();
  if (!token) {
    return false;
  }

  const requestTimeRaw = request.headers.get('X-timestamp');
  if (!requestTimeRaw) {
    return false;
  }

  // https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=<access_token>
  // # Microsoft token validation endpoint
  //   microsoft_token_verify_url = 'https://graph.microsoft.com/v1.0/me'

  //   # Set the authorization header with the access token
  //   headers = {'Authorization': f'Bearer {access_token}'}

  //   # Make a request to the Microsoft token validation endpoint
  //   response = requests.get(microsoft_token_verify_url, headers=headers)

  //   if response.status_code == 200:
  //       # Token is valid, you can parse the response for user information
  //       user_info = response.json()
  //       return user_info
  //   else:
  //       # Token validation failed
  //       print(f"Token validation failed. Status code: {response.status_code}")
  //       return None

  return (
    token == dbAccessToken &&
    parseInt(requestTimeRaw) < dbAccessTokenExpiry.getTime()
  );
};

export const GET = async ({ request, params }: APIEvent) => {
  // Check if user exists in prisma
  // If not, we don't need access token, return null
  // If so, we need access token to return the user object

  const { id } = params;
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return json(null);
    }

    const { accessToken, accessTokenExpiry } = user;
    if (!accessPermitted(request, accessToken, accessTokenExpiry)) {
      return new Response('Unauthorized', { status: 401 });
    }

    return json(user);
  } catch (e) {
    return new Response((e as Error).message, { status: 500 });
  }
};

export const POST = async ({ request, params }: APIEvent) => {
  try {
    const { id } = params;
    const data = (await new Response(
      request.body
    ).json()) as Prisma.UserCreateInput;
    const user = await prisma.user.create({
      data: {
        ...data,
        id
      }
    });
    return json(user);
  } catch (e) {
    return new Response((e as Error).message, { status: 500 });
  }
};

export const PATCH = async ({ request, params }: APIEvent) => {
  try {
    const { id } = params;
    const body = await new Response(request.body).json();
    const user = await prisma.user.update({
      where: { id },
      data: body as Prisma.UserUpdateInput
    });
    return json(user);
  } catch (e) {
    return new Response((e as Error).message, { status: 500 });
  }
};

export const DELETE = async ({ request, params }: APIEvent) => {
  try {
    const { id } = params;
    const user = await prisma.user.delete({
      where: { id }
    });
    return json(user);
  } catch (e) {
    return new Response((e as Error).message, { status: 500 });
  }
};
