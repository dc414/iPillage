function whois() {
    var url = document.getElementById("target").value;
    var par = url.replace("http://", "");
    par = par.replace("https://", "");
    if (par.indexOf("www") != -1) {
        var par = par.replace("www.", "");
    }
    if (par.indexOf("/") != -1) {
        var par2 = par.split("/");
        var rurl = par2[0];
    } else {
        var rurl = par;
    }
    var res = confirm("you want to do a whois on " + rurl + "?\n\nNOTE: You can not do a whois on a subdomain only the root domain it self. So mail.google.com will not work but google.com will.\n\nClicking Cancel will give you the opportunity to input a domain by hand.");
    if (res == true) {
        chrome.tabs.create({
            url: "http://www.networksolutions.com/whois-search/" + rurl
        });
    } else {
        var fed = prompt("Edit this domains URL or use another that will work for whois.\n\ni.e. doamin.com not sub.domain.com\n\nDomain:", rurl)
        if (fed != null && fed != "") {
            chrome.tabs.create({
                url: "http://www.networksolutions.com/whois-search/" + fed
            });
        }
    }

}
