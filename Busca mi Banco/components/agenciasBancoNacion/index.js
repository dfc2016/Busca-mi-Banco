'use strict';

var watchIDBN = null;

app.agenciasBancoNacion = kendo.observable({
    beforeShowBN: function () {
        console.log("DFC >>> beforeShowBN TEST Banco Nación");
        msgWaitForMapBN();
    },
    onShowBN: function() {},
    afterShowBN: function() {},
    beforeHideBN: function () {
        console.log("DFC >>> beforeHideBN TEST Banco Nación");
        if (watchIDBN != null) {
            navigator.geolocation.clearWatch(watchIDBN);
        }
    }
});

// START_CUSTOM_CODE_agenciasBancoNacion
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function miPosYAgenciasBN(){
    console.log("DFC >>> Mi Pos Y Agencias Banco Nación");
    msgWaitForFosition("mapDondeEstoyBN");
    watchIDBN = navigator.geolocation.watchPosition(
        onSuccessMiPosYAgenciasBN, onErrorMiPosYAgenciasBN, {
            timeout: 2000,
            enableHighAccuracy: true
        }
    );    
}

function onSuccessMiPosYAgenciasBN(position){
    $("#mapDondeEstoyBN").kendoMap({
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
                            url: "http://54.213.238.161/geodata/banconacion.json",
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

    var map = $("#mapDondeEstoyBN").data("kendoMap");

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

    navigator.geolocation.clearWatch(watchIDBN);
    watchIDBN = null;
    
    selectIconsPinMarkers(
        "images/banco_nac_28.png",
        "images/banco_nac_56.png"
    );

    console.log("DFC >>> Mapping pin and pinTarget Banco Nación");
}

function onErrorMiPosYAgenciasBN(error){
    // TODO: implement here the managment of GPS error in general way; parametrized...    
    openErrMsgGPS();
}

function msgWaitForMapBN(){
    var strHTML = "<div class=\"container-fluid\">";
    strHTML += "<div class=\"row\">";
    strHTML += "<div class=\"col-xs-12\">";
    strHTML += "<h3>";
    strHTML += "<br>";
    strHTML += "Haz click en el boton [MI POSICION Y AGENCIAS] para encontrart tu posicion y las agencias Banco de la Nación en el Mapa";
    strHTML += "</hr>";
    strHTML += "</div>";
    strHTML += "</div>";
    strHTML += "</div>";
    $("#mapDondeEstoyBN").html(strHTML);
}
// END_CUSTOM_CODE_agenciasBancoNacion