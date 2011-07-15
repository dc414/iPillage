function con(url)
{
 try{
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  var x=setTimeout("xhr.abort()", 2000);
  xhr.send();
  ret_data = xhr.responseText;
  return xhr.responseText;
 }catch(e){
  return "Error";
 }
}
function showMesa(mes)
{
 document.getElementById("data").innerHTML=mes;
 alert(mes);
}
function showMes(mes)
{
 document.getElementById("data").innerHTML=mes;
}
function linklist(data, url)
{
 var phost = url.split("//");
 var phost2 = phost[1].split("/");
 var host = "http://"+phost2[0];
 var data = con(url);
 if(data.indexOf("HREF=\"") != -1)
 {
  var par = data.split("HREF=\"");
 }else{
  var par = data.split("href=\"");
 }
 par.shift();
 par.pop();
 par.shift();
 var links = Array();
 for(link in par)
 {
  var par2 = par[link].split('"');
  if(par2[0].indexOf("http") != 0)
  {
   var pus = host+"/"+par2[0];
  }else{
   var pus = par2[0];
  }
  links.push(pus);
 }
 return links;
}
