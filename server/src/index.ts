import ExpressServer from './expressServer';
import logger from './logger';
import config from './config';
import networks, { setNetworks } from './networks';

const launchServer = async () => {
  await setNetworks();
  const expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
  try {
    expressServer.launch();
    logger.info('Express server running');
  } catch (error) {
    console.log(error);
    logger.error('Express Server failure', error.message);
    await expressServer.close();
  }
};

launchServer().catch((e) => logger.error(e));