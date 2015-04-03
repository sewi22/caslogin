    
    $.mobile.document.on('pagebeforeshow', '#loginPage', function(e){
        e.preventDefault();
                
        //alert(window.location.href);
        //alert(document.URL);
        /*
        if(sessionStorage.authPage){
            console.log("es wird authentifizierung für folgende Seite angefordert: "+sessionStorage.authPage);
            var ticket = (QueryString.ticket) ? QueryString.ticket : '';
            validateTicket(ticket); 
        } else {
            console.log("es liegt keine Authentifizierungsweiterleitung vor.");            
        }
        */      
    });
    
    $.mobile.document.on('pagebeforeshow', '#casPage', function(e){
        e.preventDefault(); 
        $("#casContent").empty();
        $("#casContent").append(sessionStorage.validateData);
        var loginform = "";
        loginform += '<a href="#" class="ui-btn" id="caslogoutbutton">Logout</a>';
        $("#casContent").append(loginform);
        $("#casContent").enhanceWithin();                      
    });
    
    function authenticateUser(page){
        sessionStorage.setItem("authPage", page);
        var url = "https://cas.thm.de/cas/login"
        //var homeurl = encodeURIComponent("http://phylab.org/app/");
        var homeurl = encodeURIComponent("PhyLab");
        
        var iab = window.open(url+"?service="+homeurl, '_blank', 'location=no,hidden=no');
        
        iab.addEventListener('loadstart', function(evt){
            var ticket = evt.url.split("ticket=", 2);
            if(ticket[1]){
                iab.close();
                validateTicket(ticket[1]);
            }
        });
        iab.addEventListener('loadstop', function(evt){
            /*
            iab.executeScript({
                code: 'document.getElementsByName("abort")[0].onclick = function(){sessionStorage.setItem("abort","yes");}'
            }, function(){
                
            });
            */
            iab.executeScript({
                code: 'document.getElementsByName("abort")[0].onclick = function(){document.getElementById("username").value = "";document.getElementById("password").value = "";}'
            }, function(){

            });
                                                                                //close();
            /*
            iab.executeScript({
                code: 'document.getElementsByName("abort")[0].onclick = function(){sessionStorage.setItem("abort","yes");var loop = setInterval(function(){return sessionStorage.abort;})}'
            }, function(values){
                
            });
            */
            /*
            var loop = setInterval(function(){
                //if(!cordova.plugins.Keyboard.isVisible){
                  //  cordova.plugins.Keyboard.show();
                //}
                iab.executeScript({
                    code:'sessionStorage.getItem("abort");'                    
                },function(values){
                    if(!cordova.plugins.Keyboard.isVisible){
                        cordova.plugins.Keyboard.show();
                    }
                    var abort = values[0];
                    if(abort){                        
                        clearInterval(loop);
                        iab.close();
                    } 
                });
            });
            */                            
        });    
        iab.addEventListener('loaderror', function(){
            alert(event.type + ' - ' + event.message);
        });
        iab.addEventListener('exit', function(){
            if (iab){iab = null;}
        });      
    } 
    
    function validateTicket(ticket){
        $.ajax({
            url: 'http://phylab.org/caslogin/proxy.php?ticket='+ticket,
            method: 'GET',
            success: function(result){
                //TODO: Userdata nicht im SessionStorage speichern, sondern direkt und einmalig an die neue Seite übergeben
                //sessionStorage.setItem("userData", result);
                console.log(result);
                if(result.validate){
                    sessionStorage.setItem("validateData", JSON.stringify(result));
                    $(':mobile-pagecontainer').pagecontainer('change', sessionStorage.authPage, {});
                    sessionStorage.removeItem("authPage");    
                } else {
                    alert("Benutzer Ticket konnte nicht validiert werden.");
                }               
            },
            error: function(err){
                console.log(err);
            }                    
        });       
    }
    