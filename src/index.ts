import debug from 'debug';
import app from './app';

const logger = debug('log');

app.listen(4000, () => {
  logger('Magic happening at port 4000');
});
