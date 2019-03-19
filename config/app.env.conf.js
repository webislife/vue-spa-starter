/* eslint-disable no-console */
"use strict";
/**
 * @module Configuration app variables by process.env
 */
const ENV = process.env;

/**
 * Application envoirment config
 * @type {Object}
 * @property {String} ENV app env mode development\production\staging etc..
 * @property {String} NODE_ENV env mode development\production
 * @property {String} DIST dir path folder for webpack dist 
 * @property {String} PUBLIC_PATH webpack public path
 * @property {String} API_HOST host path for main biglion api
 */
const appConf = {
	ENV: ENV.NODE_ENV || 'development',
	NODE_ENV: ENV.NODE_ENV || 'development',
	DIST: ENV.DIST || './../dist',
    PUBLIC_PATH: ENV.PUBLIC_PATH || '/',
	API_HOST: ENV.API_HOST || 'localhost',
	FOO: ENV.FOO
};

/**
 * Validate config fields
 * @param  {Object} config application
 * @return {void}
 */
function validateConf(config) {
	for(let key in config) {
		if(config[key] === undefined || config[key].includes('undefined') === true ) {
			console.error(`ERROR: Undefined ${key} in application config. Build stopped.`);
			process.exit(1);
		}
	}
}

validateConf(appConf);

console.info('App Configuration:');
console.dir(appConf);

module.exports = appConf;
