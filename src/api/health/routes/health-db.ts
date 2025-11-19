export default {
  routes: [
    {
      method: 'GET',
      path: '/health/db',
      handler: 'health.db',
      config: {
        auth: false,
      },
    },
  ],
};
