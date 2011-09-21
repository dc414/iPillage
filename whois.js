function whois()
{
 var url = document.getElementById("target").value;
 var par = url.replace("http://", "");
 if(par.indexOf("www") != -1)
 {
  var par = par.replace("www.", "");
 }
 if(par.indexOf("/") != -1)
 {
  var par2 = par.split("/");
  var rurl = par2[0];
 }else{
  var rurl = par;
 }
 chrome.tabs.create({url:"http://www.networksolutions.com/whois-search/"+rurl});
}

