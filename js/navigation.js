
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
        //window.plugins.ChildBrowser.showWebPage(url,{showLocationBar: false, showAddress: false, showNavigationBar: false});
        //window.plugins.ChildBrowser.openExternal(url, true);
        //window.plugins.ChildBrowser.onLocationChange = function (url) {
        var ref = window.open(url, '_blank', 'location=no,hidden=no');
        ref.addEventListener('loadstart', refLoadStart);
        ref.addEventListener('loadstop', refLoadStop);
        ref.addEventListener('loaderror', refLoadError);
        ref.addEventListener('exit', refExit);
        
        function refLoadStart(event){
            //alert(event.type + ' - ' + event.url);     
        }
        function refLoadStop(event){
            //alert(event.type + ' - ' + event.url);
            ref.close();    
        }                           
        function refLoadError(event){
            //alert(event.type + ' - ' + event.message);    
        }
        function refExit(event){
            ref.removeEventListener('loadstart', refLoadStart);
            ref.removeEventListener('loadstop', refLoadStop);
            ref.removeEventListener('loaderror', refLoadError);
            ref.removeEventListener('exit', refExit);    
        }
      
        /*
        window.plugins.ChildBrowser.onOpenExternal = function () {
            //alert('childBrowser has loaded ' + url);
            window.plugins.ChildBrowser.close();
            alert("Erfolgreich ausgeloggt.");
        };
        */
        
        sessionStorage.removeItem("authPage");
        sessionStorage.removeItem("validateData");                
        return false;
    });
        
    var QueryString = function () {
        // This function is anonymous, is executed immediately and 
        // the return value is assigned to QueryString!
        var query_string = {};    
        //var query = (url) ? url : window.location.search.substring(1);
        var query = window.location.search.substring(1);
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
 