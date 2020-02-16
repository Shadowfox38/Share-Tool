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
      dirs = myobj.dirs;
      files = myobj.files;
      curr_dir = myobj.curr_dir;
      if(curr_dir == "/"){curr_dir = "";}
      $(".list1").empty();
      dirs.forEach(function(item)
      {
        $(".list1").append('<li><a href = "' + curr_dir + '/'  + item  + '">' + item + '</a></li>');
      });
      $(".list2").empty();
      files.forEach(function(item)
      {
        $(".list2").append('<li><a href = "' + curr_dir + '/'  + item + '?download' + '">' + item + '</a></li>');
      });
    }
  }
}
$(document).ready(function()
{
  var x = $(location).attr('pathname');
  getdata(x);
});
