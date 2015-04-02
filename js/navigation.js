
    // Variable refers to InAppBrowser Instance
    var iab = null;

    $.mobile.document.on('touchend click', '#casloginbutton', function(e){
        e.preventDefault();
        console.log("Wechsel zum THM CAS Login Formular");        
        authenticateUser("#casPage");
        return false;        
    });
    
    $.mobile.document.on('touchend click', '#caslogoutbutton', function(e){
        e.preventDefault();
        console.log("Logout from CAS");
        var url = "https://cas.thm.de/cas/logout";
        //var url = "http://google.com";
        var homeurl = encodeURIComponent("http://phylab.org/app/");        
        //window.location = url+"?url="+homeurl;
        //window.plugins.ChildBrowser.showWebPage(url,{showLocationBar: false, showAddress: false, showNavigationBar: false});
        //window.plugins.ChildBrowser.openExternal(url, true);
        //window.plugins.ChildBrowser.onLocationChange = function (url) {
        //alert("test");
        iab = window.open(url,'_blank','location=yes,hidden=no');
        setTimeout(function() {
             //iab.close();
        }, 2000);
        //iab.addEventListener('loadstart', iabLoadStart);
        iab.addEventListener('loadstop', iabLoadStop);
        iab.addEventListener('loaderror', iabLoadError);
        iab.addEventListener('exit', iabExit);
        
        //function iabLoadStart(event){
            //alert(event.type + ' - ' + event.url);
            //iab.close();     
        //}
        
        function iabLoadStop(event){
            //alert(randomIntFromInterval(1,99)+': '+event.type + ' - ' + event.url);
            //var urlSuccessPage = "https://cas.thm.de/cas/logout";
            //if(event.url.match(urlSuccessPage)){
                //iab.removeEventListener('loadstop', iabLoadStop);                
                iab.close();    
            //}                
        }                           

        function randomIntFromInterval(min,max){
            return Math.floor(Math.random()*(max-min+1)+min);
        }

        function iabLoadError(event){
            alert(event.type + ' - ' + event.message);    
        }
        function iabExit(event){
            //alert(event.type);
            //iab.removeEventListener('loadstart', iabLoadStart);
            iab.removeEventListener('loadstop', iabLoadStop);
            iab.removeEventListener('loaderror', iabLoadError);
            iab.removeEventListener('exit', iabExit);    
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
 