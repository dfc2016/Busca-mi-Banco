'use strict';

var watchIDSB = null;

app.acenciasScotiabank = kendo.observable({
    beforeShowSB: function () {
        // console.log("DFC >>> beforeShowSB TEST Scotia Bank");
        msgWaitForMap(
            "mapDondeEstoySB",
            "MI POSICION Y AGENCIAS",
            "VALMAR Y AGENCIAS",
            "Scotia Bank"
        );
    },
    onShowSB: function() {},
    afterShowSB: function() {},
    beforeHideSB: function () {
        // console.log("DFC >>> beforeHideSB TEST Scotia Bank");
        if (watchIDSB != null) {
            navigator.geolocation.clearWatch(watchIDSB);
        }
    }
});

// START_CUSTOM_CODE_acenciasScotiabank
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function miPosYAgenciasSB(){
    // console.log("DFC >>> Mi Pos Y Agencias Scotia Bank");
    msgWaitForFosition("mapDondeEstoySB");
    watchIDSB = navigator.geolocation.watchPosition(
        onSuccessMiPosYAgenciasSB, onErrorMiPosYAgenciasSB, {enableHighAccuracy: true}
    );

}

function onSuccessMiPosYAgenciasSB(position){
    $("#mapDondeEstoySB").kendoMap({
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
    
    selectIconsPinMarkers(
        "images/scotiabank_28.png",
        "images/scotiabank_56.png"
    );

    // console.log("DFC >>> Mapping pin and pinTarget Scotia Bank");   
}

function onErrorMiPosYAgenciasSB(error){
    openErrMsgGPS();
}

function posValmarOficinaYAgenciasSB(){
    // console.log("DFC >>> Valmar Oficina Y Agencias Scotia Bank Inicio");
    msgWaitForFosition("mapDondeEstoySB");
    
    $("#mapDondeEstoySB").kendoMap({
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
                // LAT, LNG oficina Valmar - S. Isidro
                latlng: [-12.10632,-77.03527],
                name: "oficina Valmar - S. Isidro"
            },
        ]
    });

    var layerTarget = map.layers[2];
    layerTarget.setDataSource(dsTarget);

    selectIconsPinMarkers(
        "images/scotiabank_28.png",
        "images/scotiabank_56.png"
    );
    // console.log("DFC >>> Valmar Oficina Y Agencias Scotia Bank Fin");
}

// END_CUSTOM_CODE_acenciasScotiabank