export const environment = {
  production: false,
  apiBaseUrl: 'https://localhost:5001/api',
  identityServer: {
    authority: 'https://localhost:5005',
    clientId: 'eswatiniemployeeangularclient'
  }
} as const;
