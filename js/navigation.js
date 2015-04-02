   
    $.mobile.document.on('click', '#casloginbutton', function(e){
        e.preventDefault();               
        authenticateUser("#casPage");
        return false;        
    });
    
    $.mobile.document.on('click', '#caslogoutbutton', function(e){
        e.preventDefault();        
        var url = "https://cas.thm.de/cas/logout";                    
        
        var iab = window.open(url,'_blank','location=no,hidden=yes');
        iab.addEventListener('loadstop', function(event){
            iab.close();
        });
        iab.addEventListener('loaderror', function(event){
            alert(event.type + ' - ' + event.message);
        });
        iab.addEventListener('exit', function(event){
            if (iab){iab = null;}
            alert("Logout erfolgreich.");
        });        
        
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
 