'use strict';

var watchIDDondeEstoy = null;

app.home = kendo.observable({
    beforeShow: function () {
        console.log("DFC >>> beforeShow");
        $("#IconsMarker").text("");
        msgWaitForMap();
    },
    onShow: function () {
        $("#startSegPosDondeEstoy").prop("disabled", false);
        $("#stopSegPosDondeEstoy").prop("disabled", true);
    },
    afterShow: function () {},
    beforeHide: function () {
        console.log("DFC >>> beforeHide");
        $("#startSegPosDondeEstoy").prop("disabled", false);
        $("#stopSegPosDondeEstoy").prop("disabled", true);
        if (watchIDDondeEstoy != null){
            navigator.geolocation.clearWatch(watchIDDondeEstoy);
        }
        
    },
    onHide: function () {
        console.log("DFC >>> onHide");
    }
});

// START_CUSTOM_CODE_home
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

function onSuccessDondeEstoy(position) {
    console.log("DFC >>> onSuccessDondeEstoy >>> Renderizar el Mapa de mi posicion");
    console.log("DFC >>> Coordinadas iniciales: ");
    console.log("DFC >>> [LAT]: " + position.coords.latitude);
    console.log("DFC >>> [LNG]: " + position.coords.longitude);
    $("#mapDondeEstoy").kendoMap({
        center: [position.coords.latitude, position.coords.longitude],
        zoom: 12,
        layers: [{
            type: "tile",
            urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
            subdomains: ["a", "b", "c"],
                    }],
        markers: [{
            location: [position.coords.latitude, position.coords.longitude],
            shape: "pinTarget",
            tooltip: {
                content: "Mi posicion"
            }
                    }]
    });

}

function onErrorDondeEstoy(error) {
    openErrMsgGPS(error);
}

function startSegPOS() {
    $("#startSegPosDondeEstoy").prop("disabled", true);
    $("#stopSegPosDondeEstoy").prop("disabled", false);
    msgWaitForFosition("mapDondeEstoy");
    watchIDDondeEstoy = navigator.geolocation.watchPosition(
        onSuccessDondeEstoy, onErrorDondeEstoy, {
            timeout: 10000,
            enableHighAccuracy: true
        }
    );

}

function stopSeguPOS() {
        $("#startSegPosDondeEstoy").prop("disabled", false);
        $("#stopSegPosDondeEstoy").prop("disabled", true);
        navigator.geolocation.clearWatch(watchIDDondeEstoy);
    	watchIDDondeEstoy = null;
}

function msgWaitForMap() {
    var strHTML = "<div class=\"container-fluid\">";
    strHTML += "<div class=\"row\">";
    strHTML += "<div class=\"col-xs-12\">";
    strHTML += "<h2>";
    strHTML += "<br>";
    strHTML += "Haz click en el boton [BUSCA MI POSICION] para que tu posicion en el Mapa se visualize acqui";
    strHTML += "</h2>";
    strHTML += "</div>";
    strHTML += "</div>";
    strHTML += "</div>";
    $("#mapDondeEstoy").html(strHTML);    
}

//     // END_CUSTOM_CODE_home