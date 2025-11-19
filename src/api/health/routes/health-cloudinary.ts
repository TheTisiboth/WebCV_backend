export default {
  routes: [
    {
      method: 'GET',
      path: '/health/cloudinary',
      handler: 'health.cloudinary',
      config: {
        auth: false,
      },
    },
  ],
};
