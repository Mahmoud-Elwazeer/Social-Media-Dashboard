const userRoute = require('./userRoute');
const authRoute = require('./authRoute');
const postRoute = require('./postRoute');
const groupRoute = require('./groupRoute');
const friendshipRoute = require('./friendRoute');
const pageRoute = require('./pageRoute')
const ApiError = require('../utils/apiError');
const globalError = require('../middlewares/errorMiddleware');

const handleRoutes = (app) => {
	app.get('/', (_, res) => res.status(200).send('Hello World'));
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/posts', postRoute);
  app.use('/api/v1/friendships', friendshipRoute);
  app.use('/api/v1/groups', groupRoute);
  app.use('/api/v1/pages', pageRoute);


  // Handle Error Not fount route from above
  app.all('*', (req, res, next) => {
    // const err = new Error(`Can;t find this route ${req.originalUrl}`);
    // next(err.message);
    next(new ApiError(`Can't find this route ${req.originalUrl}`, 400))
  })
  // Global error Handling middleware
  app.use(globalError);
}

module.exports = handleRoutes;
