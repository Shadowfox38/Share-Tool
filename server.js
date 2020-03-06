#!/usr/bin/env node
const express = require('express');
const fs = require('fs');
const url = require('url');
const path = require('path');
const ip = require('ip');
const zipper = require('zip-local');
const zip = require('express-zip');
console.log("Tell your friend to open browser and type this : " + ip.address() + ":8080/");
var app = express();
var root = "/home/shadowfox",curr_dir = "",whole_path;
app.use(express.static('public'));
app.use('/static', express.static('public'));
app.use(express.urlencoded({extended: true}));
app.get('*', function(req, res) {
	var q = url.parse(req.url, true);
	var filePath = q.pathname;
	q = q.search;
	filePath = unescape(filePath);
	filePath = filePath.split(" ").join("\ ");
	try
	{
		if(q == '?download')
		{
			var fpath = path.join(root,filePath);
			var filestozip = [];
			fs.readdir(fpath,function(err,data)
			{
				data = data.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
				for(var i=0;i<data.length;i++)
				{
					var stats = fs.statSync(path.join(fpath,data[i]));
					if(stats.isFile())
						filestozip.push({path : path.join(fpath,data[i]),name : data[i]});
				}
				res.zip(filestozip);
			});
		}
		else if (fs.statSync(path.join(root,filePath)).isFile())
			res.download(path.join(root,filePath));
		else
			res.sendFile(__dirname + '/src/index.html');
	}
	catch (err)
	{
		res.sendFile(__dirname + '/src/404.html');
	}
});
app.put('*', function(req, res)
{
	var dirs = [],files = [];
	curr_dir = req.url;
	curr_dir = unescape(curr_dir);
	var xx = curr_dir.split(" ");
	curr_dir = xx.join("\ ");
	whole_path = path.join(root, curr_dir);
	console.log("reading dir : " + whole_path);
	fs.readdir(whole_path, function(err, data)
	{
		data = data.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
		for (var i = 0; i < data.length; i++)
		{
			var stats = fs.statSync(path.join(whole_path,data[i]));
			if (stats.isDirectory())
				dirs.push(data[i]);
			if (stats.isFile())
				files.push(data[i]);
		}
		var myobj = {curr_dir,dirs,files};
		res.send(JSON.stringify(myobj));
	});
});
app.listen(8080);
