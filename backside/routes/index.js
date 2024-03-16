const userRoute = require('./userRoute');

const handleRoutes = (app) => {
	app.use('/', userRoute);
  app.use('/api/v1/users', userRoute);
}

module.exports = handleRoutes;
