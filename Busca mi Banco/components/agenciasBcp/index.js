'use strict';

var watchIDBCP = null;

app.agenciasBcp = kendo.observable({
    beforeShowBCP: function () {
        // console.log("DFC >>> beforeShowBCP TEST BCP");
        msgWaitForMap(
            "mapDondeEstoyBCP",
            "MI POSICION Y AGENCIAS",
            "VALMAR Y AGENCIAS",
            "BCP"
        );
    },
    onShowBCP: function () {},
    afterShowBCP: function () {},
    beforeHideBCP: function () {
        // console.log("DFC >>> beforeHideBCP TEST BCP");
        if (watchIDBCP != null) {
            navigator.geolocation.clearWatch(watchIDBCP);
        }
    }
});

// START_CUSTOM_CODE_agenciasBcp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function miPosYAgenciasBCP() {
    // console.log("DFC >>> Mi Pos Y Agencias BCP");
    msgWaitForFosition("mapDondeEstoyBCP");
    watchIDBCP = navigator.geolocation.watchPosition(
        onSuccessMiPosYAgenciasBCP, onErrorMiPosYAgenciasBCP, {
            enableHighAccuracy: true
        }
    );
}

function onSuccessMiPosYAgenciasBCP(position) {
    $("#mapDondeEstoyBCP").kendoMap({
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
                            url: "http://54.213.238.161/geodata/bcp.json",
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

    var map = $("#mapDondeEstoyBCP").data("kendoMap");

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

    navigator.geolocation.clearWatch(watchIDBCP);
    watchIDBCP = null;

    selectIconsPinMarkers(
        "images/bcp_28.png",
        "images/bcp_56.png"
    );

    // console.log("DFC >>> Mapping pin and pinTarget BCP");
}

function onErrorMiPosYAgenciasBCP(error) {
    openErrMsgGPS(error);
}

function posValmarOficinaYAgenciasBCP() {
    // console.log("DFC >>> Valmar Oficina Y Agencias BCP Inicio");
    msgWaitForFosition("mapDondeEstoyBCP");
    
    $("#mapDondeEstoyBCP").kendoMap({
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
                            url: "http://54.213.238.161/geodata/bcp.json",
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

    var map = $("#mapDondeEstoyBCP").data("kendoMap");

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
        "images/bcp_28.png",
        "images/bcp_56.png"
    );

    // console.log("DFC >>> Valmar Oficina Y Agencias BCP Fin");
}

// END_CUSTOM_CODE_agenciasBcp