#!/usr/bin/env node
'use strict';

var commandLineArgs = require( 'command-line-args' );
var colors = require( 'colors' );
var _ = require( 'lodash' );
var QRS = require( 'qrs' );
var path = require('path');
var fs = require( 'fs' );
var cli = commandLineArgs( require('./cli-params') );
var os = require('os');
var clui = require('clui');
var Spinner = clui.Spinner;

try	{
	var options = cli.parse();
} catch( e ) {
	console.log(colors.red('One ore more parameters are invalid, please review your otpions.'));
	return;
}


function configValid () {
	if ( _.isEmpty( options.main.server ) ) {
		console.log( colors.red( 'Server is not defined, please define one.' ) );
		console.log( '' );
		console.log( '\t' + colors.yellow( 'Examples:' ).underline );
		console.log( '\t' + colors.yellow( '--server=192.168.0.2' ) );
		console.log( '\t' + colors.yellow( '--server=qsSingle' ) );
		return false;
	}
	if ( _.isEmpty( options.main.auth ) ) {
		console.log( colors.red( 'Please choose an authentication method: ' ) );
		console.log( '' );
		console.log( '\t' + colors.yellow( 'Examples:' ).underline );
		console.log( '\t' + colors.yellow( '--auth=certificates' ) );
		console.log( '\t' + colors.yellow( '--auth=header' ) );
		return false;
	}
	return true;
}

function run () {

	if ( options._all.help ) {
		return runHelp();
	}
	if (options._all.debug) {
		console.log(colors.cyan('Command line options:'));
		console.log(options._all);
	}
	if ( configValid() ) {
		if ( options.main.auth === 'c' || options.main.auth === 'certificates' ) {
			runWithCertificates();
		} else if ( options.main.auth === 'h' || options.main.auth === 'header' ) {
			runWithHeaders();
		}
	}
}

function checkFile () {
	if ( !_.isEmpty(options.main.file) ) {
		if ( fs.existsSync( options.main.file ) ) {
			return true;
		} else {
			console.log( colors.red( 'File does not exist ' + options.main.file ) );
			return false;
		}
	} else {
		// Use the default file
		options.main.file = path.resolve( path.join(__dirname, './../config/mime-types.txt'));
		return true;
	}
}
function checkCertificateOptions() {

	if (options.certFiles) {delete options.certFiles;}

	options.certFiles = {};

	// Default certificate files for localhost
	var defaultCertFiles = {
		cert: 'C:\\ProgramData\\Qlik\\Sense\\Repository\\Exported Certificates\\.Local Certificates\\client.pem',
		key: 'C:\\ProgramData\\Qlik\\Sense\\Repository\\Exported Certificates\\.Local Certificates\\client_key.pem',
		ca: 'C:\\ProgramData\\Qlik\\Sense\\Repository\\Exported Certificates\\.Local Certificates\\root.pem'
	};

	options.certFiles.cert = fs.existsSync(options.certificates.cert) ? options.certificates.cert : defaultCertFiles.cert;
	options.certFiles.key = fs.existsSync(options.certificates.key) ? options.certificates.key : defaultCertFiles.key;
	options.certFiles.ca = fs.existsSync(options.certificates.ca) ? options.certificates.ca : defaultCertFiles.ca;

	if ( _.isEmpty( options.certFiles.cert ) || !fs.existsSync(options.certFiles.cert) ) {
		console.log( colors.red( 'Using certificate-based authentication: Please define a valid cert file: ' ) );
		console.log( '' );
		console.log( '\t' + colors.yellow( 'Example:' ) );
		console.log( '\t' + colors.yellow( '--cert=C:\\CertStore\\client.pem' ) );
		console.log('');
		console.log('If you want to use another authentication method, have a look at the help (--help) or the online documentation.');
		return false;
	}

	if ( _.isEmpty( options.certFiles.key ) || !fs.existsSync(options.certFiles.key) ) {
		console.log( colors.red( 'Using certificate-based authentication: Please define a valid key file: ' ) );
		console.log( '' );
		console.log( '\t' + colors.yellow( 'Example:' ) );
		console.log( '\t' + colors.yellow( '--key=C:\\CertStore\\client_key.pem' ) );
		console.log('');
		console.log('If you want to use another authentication method, have a look at the help (--help) or the online documentation.');
		return false;
	}

	if ( _.isEmpty( options.certFiles.ca ) || !fs.existsSync(options.certFiles.ca)) {
		console.log( colors.red( 'Using certificate-based authentication: Please define a valid ca file: ' ) );
		console.log( '' );
		console.log( '\t' + colors.yellow( 'Example:' ) );
		console.log( '\t' + colors.yellow( '--ca=C:\\CertStore\\root.pem' ) );
		console.log('');
		console.log('If you want to use another authentication method, have a look at the help (--help) or the online documentation.');
		return false;
	}
	return true;
}
function runWithCertificates () {

	if (checkCertificateOptions() && checkFile()) {
		var config = {
			"authentication": 'certificates',
			"host": options.main.server,
			"useSSL": options.main.ssl,
			"virtualProxy": options.main['virtual-proxy'] || '',
			"xrfkey": 'ABCDEFG123456789',
			'port': options.main.port || 4242,
			'cert': options.certFiles.cert,
			'key': options.certFiles.key,
			'ca': options.certFiles.ca,
			'passphrase': options.certificates.passphrase
		};
		if (options.main['header-key'] && options.main['header-value']) {
			config.headerKey = options.main['header-key'];
			config.headerValue = options.main['header-value'];
		} else {
			config.headerKey = 'X-Qlik-User';
			config.headerValue =  'UserDirectory=Internal;UserId=sa_repository';
		}
		runWithOptions( config );
	}
}

function checkHeaderOptions () {

	if ( _.isEmpty( options.main['header-key'] ) ) {
		console.log( colors.red( 'Using header authentication: Please define a key for the header: ' ) );
		console.log( '' );
		console.log( '\t' + colors.yellow( 'Example:' ) );
		console.log( '\t' + colors.yellow( '--header-key=hdr-usr' ) );
		console.log('');
		console.log('If you want to use another authentication method, have a look at the help (--help) or the online documentation.')
		return false;
	}
	if ( _.isEmpty( options.main['header-value'] ) ) {
		console.log( colors.red( 'Using header authentication: Please define a value for the header-authentication: ' ) );
		console.log( '' );
		console.log( '\t' + colors.yellow( 'Example:' ) );
		console.log( '\t' + colors.yellow( '--header-value=qsSingle\\swr' ) );
		console.log('');
		console.log('If you want to use another authentication method, have a look at the help (--help) or the online documentation.')

		return false;
	}
	if ( _.isEmpty( options.main['virtual-proxy'] ) ) {
		console.log( colors.red( 'Using header authentication: Please define the virtual-proxy, which is typically not blank if you are using header authentication. ' ) );
		console.log( '' );
		console.log( '\t' + colors.yellow( 'Example:' ) );
		console.log( '\t' + colors.yellow( '--virtual-proxy=hdr' ) );
		console.log('');
		console.log('If you want to skip this validation rule, use ' + colors.yellow('--virtual-proxy=blank'));
		console.log('If you want to use another authentication method, have a look at the help (--help) or the online documentation.');
		return false;
	}
	return true;

}

function runWithHeaders () {

	if ( checkHeaderOptions() && checkFile() ) {
		var config = {
			"authentication": 'header',
			"host": options.main.server,
			"useSSL": options.main.ssl,
			"virtualProxy": options.main['virtual-proxy'] && options.main['virtual-proxy'] !== 'blank' ? options.main['virtual-proxy'] : null,
			"headerKey": options.main['header-key'] || null,
			"headerValue": options.main['header-value'] || null,
			"xrfkey": 'ABCDEFG123456789'
		};
		runWithOptions( config );
	}
}

function runWithOptions( config ) {

	var runningIndicator = new Spinner('Adding Mime-types ...');
	console.log('\n');
	runningIndicator.start();

	if (options.main.debug) {
		console.log('');
		console.log(colors.cyan('Config sent to qrs:'));
		console.log(config);
	}

	var qrs = new QRS( config );
	qrs.mime.addFromFile( options.main.file )
		.then( function ( data ) {
			runningIndicator.stop();
			console.log( colors.green(data.length + ' mime-types have been added or updated.'));
			console.log('');
		}, function ( err ) {

			runningIndicator.stop();
			console.log('');
			console.log( colors.red('An unexpected error occurred, please review your configuration.'));
			console.log('');
			if (err && err.error && err.error.code === 'ENOTFOUND') {
				console.log('\tServer ' + err.error.hostname + ' could not be found.');
			} else if (err && err.error && err.error.code === 'ETIMEDOUT') {
				console.log('\tTimeout trying to contact ' + options.main.server + '.');
			}

			console.log('');
			console.log('If you want to see the detailed error stack, use option ' + colors.yellow('--debug'));
			var errLogDest = saveErrorLog( err );
			if (errLogDest !== '') {
				console.log('A detailed error log has been saved to ' + errLogDest);
			}

			if (options.main.debug) {
				console.log('');
				console.log(colors.yellow('DETAILED ERROR STACK:'));
				console.log('');
				console.log( err );
			}
		});
}

function saveErrorLog( errLog ) {
	var tmpDir = os.tmpdir();
	var i = 1;
	var done = false;
	var filePath = '';
	while( !done && i < 100 /* safety-net*/) {
		filePath = path.join( tmpDir , 'qrs-mime-' + i + '.debug.log');
		if (!fs.existsSync(filePath)) {
			try {
				fs.writeFileSync( filePath, JSON.stringify(errLog), 'utf8' );
			} catch( e) {
				return '';
			}
			done = true;
			return filePath;
		}
		i++;
	}
	return '';
}



function runHelp () {

	// https://github.com/75lb/command-line-args/issues/8
	var usage = cli.getUsage( {
		title: "qrs-mime",
		description: "Add mime types to the Qlik Sense repository.",
		footer: "Project home: [underline]{https://github.com/stefanwalther/qrs-mime}",
		examples: [
			{
				desc: "Default configuration (using certificates):",
				example: "qrs-mime --server-192.0.2.10"
			},
			{
				desc: "Using certificates, defining location of certificates: ",
				example: "qrs-mime --auth=certificates --cert=C:\\CertStore\\client.pem --key=C:\\CertStore\\client_key.pem --ca=C:\\CertStore\\root.pem"
			},
			{
				desc: "Using certificates (using aliases): ",
				example: "qrs-mime -a=c"
			},
			{
				desc: "Using header authentication: ",
				example: "qrs-mime --auth=header --server=qsSingle --header-key=\"hdr-usr\" --header-value=\"qsSingle\\swr\" --ssl=false --file:C:\\mime_types.txt"
			},
			{
				desc: "Using header authentication (using aliases):",
				example: "qrs-mime --a=h"
			}
		]
	} );
	console.log( usage );
}

run();
