const config = {
  name: 'DCTTOOL',
  baseAPIRoute: 'api',
  port: process.env.PORT || 2112,
  //messagebus: process.env.MESSAGE_BUS || 'amqp://rabbitmq',
  environment: process.env.ENVIRONMENT || 'dev',
  db: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/mydb',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
  },
  services: {
  },
  messageTimeout: 500,
  jwtsecret: 'DCTTOOL',
};

config.dcttoolStartMessage = `${config.name} is running on port ${config.port}/`;

module.exports = config;
