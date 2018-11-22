#!/usr/bin/env node

var flybase = require('flybase'),
	optimist = require('optimist'),
	ProgressBar = require('progress'),
	assert = require('assert'),
	path = require('path'),
	fs = require('fs'),
	util = require('util');

// We try to write data in ~1MB chunks (in reality this often ends up being much smaller, due to the JSON structure).
var CHUNK_SIZE = 1024*1024;

// Keep ~50 writes outstanding at a time (this increases throughput, so we're not delayed by server round-trips).
var OUTSTANDING_WRITE_COUNT = 50;

var argv = require('optimist')
	.usage('Usage: $0')

	.demand('flybase_key')
	.describe('flybase_key', 'Flybase API Key.')
	.alias('k', 'flybase_key')

	.demand('flybase_app')
	.describe('flybase_app', 'Flybase App Name.')
	.alias('a', 'flybase_app')

	.demand('flybase_collection')
	.describe('flybase_collection', 'Flybase Collection Name.')
	.alias('c', 'flybase_collection')

	.demand('json')
	.describe('json', 'The JSON file to export to.')
	.alias('j', 'json')

	.argv;

async function main() {
	const file = path.resolve(argv.json);
	let data = [];
	const flybaseRef = flybase.init(argv.flybase_app, argv.flybase_collection, argv.flybase_key );
	try {
		const snapshot = await flybaseRef.once('value');
		await snapshot.forEach( function (row){
			data.push( row.value() );
		});
		console.log("done");
		fs.writeFile (file, JSON.stringify(data), function(err) {
			if (err) throw err;
			console.log('export completed');
			process.exit();
		});
	} catch(error) {
		console.error(error);
	}
}

main();
