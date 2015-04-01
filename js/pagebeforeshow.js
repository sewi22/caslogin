    
    $.mobile.document.on('pagebeforeshow', '#loginPage', function(e){
        e.preventDefault();
                
        //alert(window.location.href);
        //alert(document.URL);
        
        if(sessionStorage.authPage){
            console.log("es wird authentifizierung f�r folgende Seite angefordert: "+sessionStorage.authPage);
            var ticket = (QueryString.ticket) ? QueryString.ticket : '';
            validateTicket(ticket); 
        } else {
            console.log("es liegt keine Authentifizierungsweiterleitung vor.");            
        }       
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
        var homeurl = encodeURIComponent("http://localhost/caslogintest/");
        window.location = url+"?service="+homeurl;        
    } 
    
    function validateTicket(ticket){
        $.ajax({
            url: 'http://phylab.org/caslogin/proxy.php?ticket='+ticket,
            method: 'GET',
            success: function(result){
                //TODO: Userdata nicht im SessionStorage speichern, sondern direkt und einmalig an die neue Seite �bergeben
                //sessionStorage.setItem("userData", result);
                console.log(result);
                if(result.validate){
                    sessionStorage.setItem("validateData", JSON.stringify(result));
                    $(':mobile-pagecontainer').pagecontainer('change', sessionStorage.authPage, {});
                    sessionStorage.removeItem("authPage");    
                }               
            },
            error: function(err){
                console.log(err);
            }                    
        });       
    }
    