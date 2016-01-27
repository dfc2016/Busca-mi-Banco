'use strict';

(function () {
    var app = {
        data: {}
    };

    var bootstrap = function () {
        $(function () {
            app.mobileApp = new kendo.mobile.Application(document.body, {
                transition: 'slide',
                skin: 'flat',
                initial: 'components/home/view.html'
            });
        });
    };

    if (window.cordova) {
        document.addEventListener('deviceready', function () {
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }
            bootstrap();
        }, false);
    } else {
        bootstrap();
    }

    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $('#navigation-container li a.active').removeClass('active');
        currentItem.addClass('active');
    };

    window.app = app;

    app.isOnline = function () {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };
}());

// START_CUSTOM_CODE_kendoUiMobileApp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

function msgWaitForFosition(idMapName) {
    var strHTML = "<div class=\"container-fluid\">";
    strHTML += "<div class=\"row\">";
    strHTML += "<div class=\"col-xs-12\">";
    strHTML += "<h2>";
    strHTML += "<br>";
    strHTML += "Espera un momento por favor, buscando tu posicion...";
    strHTML += "</h2>";
    strHTML += "</div>";
    strHTML += "</div>";
    strHTML += "</div>";
    $("#" + idMapName).html(strHTML);
}

// TO DO: implement here the generic fx msgWaitForMap(idMapName,cmd1,cmd2) {...}

function selectIconsPinMarkers(icons_family, icons_family_2x) {
    $("#IconsMarker").text("");

    var strCSSIcons = "";

    strCSSIcons += ".k-map .k-marker { ";
    strCSSIcons += " background-image: url(" + icons_family + ") !important; ";
    strCSSIcons += "}";

    strCSSIcons += " @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) { ";
    strCSSIcons += " .k-map .k-marker { ";
    strCSSIcons += " background-image: url(" + icons_family_2x + ") !important; ";
    strCSSIcons += "}";
    strCSSIcons += " }";
    $("#IconsMarker").text(strCSSIcons);
}

function openErrMsgGPS(error) {
    $("#errMsgGPS").data("kendoMobileModalView").open();
    if (error != null) {
        //IMPORTANT error.code == 3 TIMEOUT ERROR
        if (error.code == 3){
            $("#errCodeAndMsg").html("SISTEMA GPS CONGESTIONADO...");
        }
        //Capture all other error
        if (error.code != 3) {
            var strMsg = "";
            strMsg += 'Code: ' + error.code + '<br>';
            strMsg += 'Message: ' + error.message;
            $("#errCodeAndMsg").html(strMsg);
        }
    }
}

function closeErrMsgGPS() {
    $("#errMsgGPS").data("kendoMobileModalView").close();
}


// END_CUSTOM_CODE_kendoUiMobileApp