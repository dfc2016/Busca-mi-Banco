'use strict';

(function() {
    var app = {
        data: {}
    };

    var bootstrap = function() {
        $(function() {
            app.mobileApp = new kendo.mobile.Application(document.body, {
                transition: 'slide',
                skin: 'flat',
                initial: 'components/home/view.html'
            });
        });
    };

    if (window.cordova) {
        document.addEventListener('deviceready', function() {
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

    app.isOnline = function() {
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
    //$("#mapDondeEstoy").html(strHTML);
    $("#"+idMapName).html(strHTML);
}

function selectIconsPinMarkers(icons_family){
    	$("#IconsMarker").text("");
    
        var strCSSIcons = "";
        strCSSIcons += ".k-map .k-marker { ";
        strCSSIcons += " background-image: url("+ icons_family +") !important; ";
        strCSSIcons += "}";
        $("#IconsMarker").text(strCSSIcons);
}

// END_CUSTOM_CODE_kendoUiMobileApp