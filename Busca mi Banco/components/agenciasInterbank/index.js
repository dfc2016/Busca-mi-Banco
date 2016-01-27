'use strict';

var watchIDIB = null;

app.agenciasInterbank = kendo.observable({
    beforeShowIB: function () {
        // console.log("DFC >>> beforeShowIB TEST Interbank");
        msgWaitForMap(
            "mapDondeEstoyIB",
            "MI POSICION Y AGENCIAS",
            "VALMAR Y AGENCIAS",
            "Interbank"
        );
    },
    onShowIB: function() {},
    afterShowIB: function() {},
    beforeHideIB: function () {
        // console.log("DFC >>> beforeHideIB TEST Interbank");
        if (watchIDIB != null) {
            navigator.geolocation.clearWatch(watchIDIB);
        }
    }
});

// START_CUSTOM_CODE_agenciasInterbank
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function miPosYAgenciasIB(){
    // console.log("DFC >>> Mi Pos Y Agencias Interbank");
    msgWaitForFosition("mapDondeEstoyIB");
    watchIDIB = navigator.geolocation.watchPosition(
        onSuccessMiPosYAgenciasIB, onErrorMiPosYAgenciasIB, {enableHighAccuracy: true}
    );
}

function onSuccessMiPosYAgenciasIB(position){
    $("#mapDondeEstoyIB").kendoMap({
        center: [position.coords.latitude - 0.05, position.coords.longitude],
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

    // console.log("DFC >>> Mapping pin and pinTarget Interbank");
}

function onErrorMiPosYAgenciasIB(error){
    // TODO: implement here the managment of GPS error in general way; parametrized...
    openErrMsgGPS();
}

function posValmarOficinaYAgenciasIB(){
    // console.log("DFC >>> Valmar Oficina Y Agencias Interank Inicio");
    msgWaitForFosition("mapDondeEstoyIB");
    
    $("#mapDondeEstoyIB").kendoMap({
        // LAT, LNG oficina Valmar - S. Isidro
        center: [-12.10632 - 0.05, -77.03527],
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
                // LAT, LNG oficina Valmar - S. Isidro
                latlng: [-12.10632,-77.03527],
                name: "oficina Valmar - S. Isidro"
            },
        ]
    });

    var layerTarget = map.layers[2];
    layerTarget.setDataSource(dsTarget);

    selectIconsPinMarkers(
        "images/interbank_28.png",
        "images/interbank_56.png"
    );
    // console.log("DFC >>> Valmar Oficina Y Agencias Interbank Fin");
}

// END_CUSTOM_CODE_agenciasInterbank