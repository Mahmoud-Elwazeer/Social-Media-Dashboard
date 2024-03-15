

const handleRoutes = (app) => {
  app.get('/', (_, res) => {
		res.status(200).send('Hello World');
	});
}

module.exports = handleRoutes;
