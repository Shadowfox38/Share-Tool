var curr_dir;
function getdata(path)
{
  var xhr = new XMLHttpRequest();
  var dirs,files;
  xhr.open("PUT",path,true);
  xhr.send()
  xhr.onreadystatechange = function()
  {
    if(xhr.readyState == 4 && xhr.status == 200)
    {
      var myobj = JSON.parse(this.responseText);
      var path;
      dirs = myobj.dirs;
      files = myobj.files;
      curr_dir = myobj.curr_dir;
      if(curr_dir == "/"){curr_dir = "";}
      $(".list1").empty();
      console.log("encodeURIComponent('test?download') = " + encodeURIComponent('test?download'));
      dirs.forEach(function(item)
      {
        path = curr_dir + item;
        path = encodeURIComponent(path);
        $(".list1").append('<li><a href = "' + path + '">' + item + '</a> &nbsp &nbsp' + '<a href = "' + path + '?download">' + '<img src = "/static/folder.gif"></img>' + '</a>' +'</li>');
      });
      $(".list2").empty();
      files.forEach(function(item)
      {
        path = curr_dir + item;
        path = encodeURIComponent(path);
        $(".list2").append('<li><a href = "' + path + '">' + item + '</a></li>');
      });
      /*if(myobj.mode == 1)
      {
        console.log("mode is = 1");
        console.log("length is = " + files.length);
        var ul = document.getElementsByClassName("list2")[0];
        var items = ul.getElementsByTagName("a");
        for(var i=0;i<files.length;i++)
        {
          console.log(i);
          $(items[i]).click();
        }
      }
      */
    }
  }
}
$(document).ready(function()
{
  var x = $(location).attr('pathname');
  if(x != '/')
    x = x + '/';
  getdata(x);
});
