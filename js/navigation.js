
    $.mobile.document.on('touchend click', '#casloginbutton', function(e){
        e.preventDefault();
        console.log("Wechsel zum THM CAS Login Formular");        
        authenticateUser("#casPage");
        return false;        
    });
    
    $.mobile.document.on('touchend click', '#caslogoutbutton', function(e){
        e.preventDefault();
        console.log("Logout from CAS");
        var url = "https://cas.thm.de/cas/logout"
        var homeurl = encodeURIComponent("http://phylab.org/app/");        
        //window.location = url+"?url="+homeurl;
        window.plugins.ChildBrowser.showWebPage(url+"?url="+homeurl,{showLocationBar: false, showAddress: false, showNavigationBar: false});
        window.plugins.ChildBrowser.onLocationChange = function (url) {
            //alert('childBrowser has loaded ' + url);
            window.plugins.ChildBrowser.close();
            alert("Erfolgreich ausgeloggt.");
        };
        
        sessionStorage.removeItem("authPage");
        sessionStorage.removeItem("validateData");                
        return false;
    });
        
    var QueryString = function () {
        // This function is anonymous, is executed immediately and 
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = (url) ? url : window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = pair[1];
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [ query_string[pair[0]], pair[1] ];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(pair[1]);
            }
        } 
        return query_string;
    }();
 