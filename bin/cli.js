#!/usr/bin/env node
'use strict';

var commandLineArgs = require( 'command-line-args' );
var colors = require( 'colors' );
var _ = require( 'lodash' );
var QRS = require( 'qrs' );
var path = require('path');
var fs = require( 'fs' );
var cli = commandLineArgs( require('./cli-params') );
var options = cli.parse();

function configValid () {
	if ( _.isEmpty( options.main.server ) ) {
		console.log( colors.red( 'Server is not defined, please define one.' ) );
		console.log( '' );
		console.log( '\t' + colors.yellow( 'Examples:' ).underline );
		console.log( '\t' + colors.yellow( '--server=192.168.0.2' ) );
		console.log( '\t' + colors.yellow( '--server=qsSingle' ) );
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
		console.log('DEBUG INFO:');
		console.log('');
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

function runWithCertificates () {

}

function checkHeaderOptions () {

	if ( _.isEmpty( options.header['header-key'] ) ) {
		console.log( colors.red( 'Please define a key for the header: ' ) );
		console.log( '' );
		console.log( '\t' + colors.yellow( 'Example:' ) );
		console.log( '\t' + colors.yellow( '--header-key=hdr-usr' ) );
		return false;
	}
	if ( _.isEmpty( options.header['header-value'] ) ) {
		console.log( colors.red( 'Please define a value for the header-authentication: ' ) );
		console.log( '' );
		console.log( '\t' + colors.yellow( 'Example:' ) );
		console.log( '\t' + colors.yellow( '--header-value=qsSingle\\swr' ) );
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
			"virtualProxy": options.main['virtual-proxy'],
			"headerKey": options.header['header-key'],
			"headerValue": options.header['header-value'],
			"xrfkey": 'ABCDEFG123456789'
		};
		var qrs = new QRS( config );
		qrs.mime.addFromFile( options.main.file )
			.then( function ( data ) {
				console.log( colors.green(data.length + ' mime-types have been added or updated.'));
			}, function ( err ) {
				console.log( colors.red('An error occurred: '));
				console.log('');
				console.log( err );
			});
	}
}

function runHelp () {

	// https://github.com/75lb/command-line-args/issues/8
	var usage = cli.getUsage( {
		title: "qrs-mime",
		description: "Add mime types to the Qlik Sense repository.",
		footer: "Project home: [underline]{https://github.com/stefanwalther/qrs-mime}",
		examples: [
			{
				desc: "Using certificates: ",
				example: "qrs-mime --auth=certificates"
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
