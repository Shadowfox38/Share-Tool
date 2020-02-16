const express = require('express');
const fs = require('fs');
const url = require('url');
var app = express();
var root = "/home/shadowfox",curr_dir = "",whole_path;
app.use(express.static('public'));
app.use('/static',express.static('public'));
app.get('*',function(req,res)
{
  var q = url.parse(req.url,true);
  var path = q.pathname;
  console.log(path);
  q = q.search;
  if(q == '?download')
    res.download(root + "/" + path);
  else
    res.sendFile(__dirname + '/src/index.html')
});
app.put('*',function(req,res)
{
  var dirs = [],files = [],temp;
  curr_dir = req.url;
  whole_path = root + curr_dir
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
