require('../env');

let CONFIG = {};

// CONSTANTS

// ENV VARIABLES
// Application
CONFIG.app_name = process.env.APP_NAME || 'Express API ES6 Starter';
CONFIG.app_version = process.env.APP_VERSION || '1.0.0';
CONFIG.app_port = process.env.APP_PORT || '8848';
CONFIG.app_host = process.env.APP_HOST || '0.0.0.0';

// Database
CONFIG.db_client = process.env.DB_CLIENT || 'mysql';
CONFIG.db_port = process.env.DB_PORT || '3306';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_name = process.env.DB_NAME || 'api';
CONFIG.db_user = process.env.DB_USER || 'api';
CONFIG.db_password = process.env.DB_PASSWORD || 'api';

// Log
CONFIG.logging_dir = process.env.LOGGING_DIR || 'logs';
CONFIG.logging_level = process.env.LOGGING_LEVEL || 'debug';

// Redis
CONFIG.redis_host = process.env.REDIS_HOST || 'localhost';
CONFIG.redis_port = process.env.REDIS_PORT || '6379';

// Test Environment
CONFIG.test_app_port = process.env.TEST_APP_PORT || '9949';
CONFIG.test_db_name = process.env.TEST_DB_NAME || 'express_test';

// JWT
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'mysecret';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '3600';

module.exports = CONFIG;
