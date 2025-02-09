export default {
  routes: [
    {
     method: 'GET',
     path: '/cv',
     handler: 'cv.handleFetchCVS',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],

};
