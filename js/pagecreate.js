
    $.mobile.document.on('pagecreate', '#loginPage', function(e){
        e.preventDefault();
        $("#loginHeadline").html("CAS Login");
        var loginform = "";
        //loginform += '<form id="casloginform" action="https://cas.thm.de/cas/login" method="post">';
        //loginform += '<form id="casloginform">';
        //loginform += '<label for="username">Benutzername:</label>';
        //loginform += '<input type="text" id="username" />';
        //loginform += '<label for="password">Passwort:</label>';
        //loginform += '<input type="password" id="password" />';
        loginform += '<a href="#" class="ui-btn" id="casloginbutton">Zeige streng geheime Benutzerdaten an</a>';
        loginform += '<a href="#" class="ui-btn" id="caslogoutbutton">Logout</a>';
        //loginform += '<a href="#" class="ui-btn" id="casvalidatebutton">Validate Ticket</a>';
        //loginform += '<form>';
        $("#loginContent").append(loginform);
        $("#loginContent").enhanceWithin();
       
    });
    
    $.mobile.document.on('pagecreate', '#casPage', function(e){
        e.preventDefault();
        $("#casHeadline").html("CAS Page");
    });