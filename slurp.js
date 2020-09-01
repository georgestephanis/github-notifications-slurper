#!/usr/bin/env node

const { Octokit } = require("@octokit/rest");
const notifier = require('node-notifier');
require('dotenv').config();

const octokit = new Octokit({
	auth: process.env.GITHUBPERSONALACCESSTOKEN
});

octokit.activity
	.listNotificationsForAuthenticatedUser()
	.then( ({ data }) => {
		data.forEach( note => {
			if ( note.unread ) {
				notifier.notify({
					title: note.reason,
					message: note.subject.title,
					icon: "/Applications/GitHub Desktop.app"
				});
			}
		} );
		console.log( data );
	});
