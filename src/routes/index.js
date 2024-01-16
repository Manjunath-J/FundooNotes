import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import noteRoute from './note.route';

const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/User', userRoute);
  router.use('/Notes', noteRoute);

  return router;
};

export default routes;
