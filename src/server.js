const mongoose = require('mongoose')
const app = require('./app');
const config = require('./config/index');

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});

let server;

async function bootstrap() {
  try {

    await mongoose.connect(config.database_url);
    console.log(`🛢 Database is connected successfully`);

    server = app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});