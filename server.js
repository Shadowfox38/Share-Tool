const express = require('express');
const fs = require('fs');
const url = require('url');
const path = require('path');
const ip = require('ip');
console.log("Tell your friend to open browser and type this : " + ip.address() + ":8080/");
console.log("Note :You and your friend need to be connected to same wifi network, internet is not required");
console.log("If you weren't connected, restart this app to refresh your ip address (press ctrl+c to quit, then run again with node server.js)");
var app = express();
var root = "/home/shadowfox",curr_dir = "",whole_path;
app.use(express.static('public'));
app.use('/static',express.static('public'));
app.use(express.urlencoded({extended :true}));
app.get('*',function(req,res)
{
  var q = url.parse(req.url,true);
  var filePath = q.pathname;
  filePath = unescape(filePath);
  filePath = filePath.split(" ").join("\ ");
  try {
  if(fs.statSync(root + "/" + filePath).isFile())
    res.download(root + "/" + filePath);
  else
    res.sendFile(__dirname + '/src/index.html');
  }
  catch(err){res.sendFile(__dirname + '/src/404.html');}
});
app.put('*',function(req,res)
{
  var dirs = [],files = [],temp;
  curr_dir = req.url;
  curr_dir = unescape(curr_dir);
  var xx = curr_dir.split(" ");
  curr_dir = xx.join("\ ");
  whole_path = path.join(root,curr_dir);
  console.log("reading dir : " + whole_path);
  fs.readdir(whole_path,function(err,data)
  {
    data = data.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
    for(var i = 0;i < data.length;i++)
    {
      var stats = fs.statSync(whole_path + "/" + data[i]);
      if(stats.isDirectory())
        dirs.push(data[i]);
      if(stats.isFile())
        files.push(data[i]);
    }
    var myobj = {curr_dir,dirs,files};
    res.send(JSON.stringify(myobj));
  });
});
app.listen(8080);
