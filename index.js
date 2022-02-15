#!/usr/bin/env node

/**
 * Opens a google app presentation and script execution log page based on clasp scriptId and fileId
 * settings.  Will take the .clasp.json file from the current run directory.
 *
 * Usage: open-app-script-execute-log
 *
 * @author Jeremy.Schulz@noaa.gov
 */

'use strict';
const fs = require('fs');
const open = require("open");

let pwd = process.env.PWD;
let claspConfig = `${pwd}/.clasp.json`

let rawData;
try { rawData = fs.readFileSync(claspConfig); }
catch { throw new Error(`Unable to open file: ${claspConfig}`) }

let json = JSON.parse(rawData);
let scriptId = json?.scriptId;
let fileId = json?.fileId;
let openOnDev = json?.openOnDev;
if (openOnDev){
	if (fileId) {
		console.log(`Opening up Presentation: ${fileId}`)
		open(`https://docs.google.com/presentation/d/${fileId}`);
	}
	else { throw new Error("File Id does not exist in .clasp.json file"); }

	if (scriptId) {
		console.log(`Opening up Execution Log for App Script Project: ${scriptId}`)
		open(`https://script.google.com/home/projects/${scriptId}/executions`);
	}
	else { throw new Error("Script Id does not exist in .clasp.json file"); }
}