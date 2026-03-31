const config = {
  API_URL: process.env.REACT_APP_API_URL || '',
  GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
};

export const getApiUrl = (path: string): string => {
  return `${config.API_URL}${path}`;
};

export default config;
