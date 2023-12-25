// UI re-render not needed, so stored as a normal variable
let accessToken: string | null = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (newAccessToken: string | null) => {
  accessToken = newAccessToken;
};
