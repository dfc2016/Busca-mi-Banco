'use strict';

var watchIDSB = null;

app.acenciasScotiabank = kendo.observable({
    beforeShowSB: function () {
        console.log("DFC >>> beforeShowSB TEST Scotia Bank");
        selectIconsPinMarkers("images/scotiabank_28.png");
        msgWaitForMapSB();
    },
    onShowSB: function() {},
    afterShowSB: function() {},
    beforeHideSB: function () {
        console.log("DFC >>> beforeHideSB TEST Scotia Bank");
        if (watchIDSB != null) {
            navigator.geolocation.clearWatch(watchIDSB);
        }
    }
});

// START_CUSTOM_CODE_acenciasScotiabank
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function miPosYAgenciasSB(){
    console.log("DFC >>> Mi Pos Y Agencias Scotia Bank");
    msgWaitForFosition("mapDondeEstoySB");
    watchIDSB = navigator.geolocation.watchPosition(
        onSuccessMiPosYAgenciasSB, onErrorMiPosYAgenciasSB, {
            timeout: 2000,
            enableHighAccuracy: true
        }
    );
}

function onSuccessMiPosYAgenciasSB(position){
    $("#mapDondeEstoySB").kendoMap({
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
                            url: "http://54.213.238.161/geodata/scotiabank.json",
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

    var map = $("#mapDondeEstoySB").data("kendoMap");

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

    navigator.geolocation.clearWatch(watchIDSB);
    watchIDSB = null;

    console.log("DFC >>> Mapping pin and pinTarget Scotia Bank");   
}

function onErrorMiPosYAgenciasSB(error){
    // TODO: implement here the managment of GPS error in general way; parametrized...
}

function msgWaitForMapSB() {
    var strHTML = "<div class=\"container-fluid\">";
    strHTML += "<div class=\"row\">";
    strHTML += "<div class=\"col-xs-12\">";
    strHTML += "<h3>";
    strHTML += "<br>";
    strHTML += "Haz click en el boton [MI POSICION Y AGENCIAS] para encontrart tu posicion y las agencias Scotia Bank en el Mapa";
    strHTML += "</hr>";
    strHTML += "</div>";
    strHTML += "</div>";
    strHTML += "</div>";
    $("#mapDondeEstoySB").html(strHTML);
}


// END_CUSTOM_CODE_acenciasScotiabank