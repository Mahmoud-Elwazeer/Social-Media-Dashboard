const userRoute = require('./userRoute');

const handleRoutes = (app) => {
	app.get('/', (_, res) => res.status(200).send('Hello World'));
  app.use('/api/v1/users', userRoute);
}

module.exports = handleRoutes;
