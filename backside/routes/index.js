const userRoute = require('./userRoute');
const authRoute = require('./authRoute');
const postRoute = require('./postRoute');
const friendshipRoute = require('./friendRoute');
const ApiError = require('../utils/apiError');
const globalError = require('../middlewares/errorMiddleware');

const handleRoutes = (app) => {
	app.get('/', (_, res) => res.status(200).send('Hello World'));
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/posts', postRoute);
  app.use('/api/v1/friendships', friendshipRoute);


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
