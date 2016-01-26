'use strict';

var watchIDIB = null;

app.agenciasInterbank = kendo.observable({
    beforeShowIB: function () {
        console.log("DFC >>> beforeShowIB TEST Interbank");
        msgWaitForMapIB();
    },
    onShowIB: function() {},
    afterShowIB: function() {},
    beforeHideIB: function () {
        console.log("DFC >>> beforeHideIB TEST Interbank");
        if (watchIDIB != null) {
            navigator.geolocation.clearWatch(watchIDIB);
        }
    }
});

// START_CUSTOM_CODE_agenciasInterbank
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function miPosYAgenciasIB(){
    console.log("DFC >>> Mi Pos Y Agencias Interbank");
    msgWaitForFosition("mapDondeEstoyIB");
    watchIDIB = navigator.geolocation.watchPosition(
        onSuccessMiPosYAgenciasIB, onErrorMiPosYAgenciasIB, {
            timeout: 2000,
            enableHighAccuracy: true
        }
    );
}

function onSuccessMiPosYAgenciasIB(position){
    $("#mapDondeEstoyIB").kendoMap({
        center: [position.coords.latitude, position.coords.longitude],
        zoom: 12,
        layers: [
            {
                type: "tile",
                urlTemplate: "http://#= subdomain #.tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png",
                subdomains: ["a", "b", "c"],
        },
            {
                //Layer for positions of interesting sites
                type: "marker",
                dataSource: {
                    transport: {
                        read: {
                            url: "http://54.213.238.161/geodata/interbank.json",
                            dataType: "json"
                        }
                    }
                },
                locationField: "latlng",
                titleField: "name",
                shape: "pin",
        },
            {
                //Layer for position of location's device
                type: "marker",
                dataSource: dsTarget,
                locationField: "latlng",
                titleField: "name",
                shape: "pinTarget",
        },

        ],
    });

    var map = $("#mapDondeEstoyIB").data("kendoMap");

    var dsTarget = new kendo.data.DataSource({
        data: [
            {
                latlng: [position.coords.latitude, position.coords.longitude],
                name: "Mi posicion"
            },
        ]
    });

    var layerTarget = map.layers[2];
    layerTarget.setDataSource(dsTarget);

    navigator.geolocation.clearWatch(watchIDIB);
    watchIDIB = null;
    
    selectIconsPinMarkers(
        "images/interbank_28.png",
        "images/interbank_56.png"
    );

    console.log("DFC >>> Mapping pin and pinTarget Interbank");
}

function onErrorMiPosYAgenciasIB(error){
    // TODO: implement here the managment of GPS error in general way; parametrized...
    openErrMsgGPS();
}

function msgWaitForMapIB(){
    var strHTML = "<div class=\"container-fluid\">";
    strHTML += "<div class=\"row\">";
    strHTML += "<div class=\"col-xs-12\">";
    strHTML += "<h3>";
    strHTML += "<br>";
    strHTML += "Haz click en el boton [MI POSICION Y AGENCIAS] para encontrart tu posicion y las agencias Interbank en el Mapa";
    strHTML += "</hr>";
    strHTML += "</div>";
    strHTML += "</div>";
    strHTML += "</div>";
    $("#mapDondeEstoyIB").html(strHTML);
}
// END_CUSTOM_CODE_agenciasInterbank