'use strict';

var watchIDBCP = null;

app.agenciasBcp = kendo.observable({
    beforeShowBCP: function () {
        console.log("DFC >>> beforeShowBCP TEST BCP");
        msgWaitForMapBCP();
    },
    onShowBCP: function () {},
    afterShowBCP: function () {},
    beforeHideBCP: function () {
        console.log("DFC >>> beforeHideBCP TEST BCP");
        if (watchIDBCP != null) {
            navigator.geolocation.clearWatch(watchIDBCP);
        }
    }
});

// START_CUSTOM_CODE_agenciasBcp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
function miPosYAgenciasBCP() {
    console.log("DFC >>> Mi Pos Y Agencias BCP");
    msgWaitForFosition("mapDondeEstoyBCP");
    watchIDBCP = navigator.geolocation.watchPosition(
        onSuccessMiPosYAgenciasBCP, onErrorMiPosYAgenciasBCP, {enableHighAccuracy: true}
    );
}

function onSuccessMiPosYAgenciasBCP(position) {
    $("#mapDondeEstoyBCP").kendoMap({
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

    console.log("DFC >>> Mapping pin and pinTarget BCP");
}

function onErrorMiPosYAgenciasBCP(error) {
    // TODO: implement here the managment of GPS error in general way; parametrized...
    openErrMsgGPS(error);
}

function msgWaitForMapBCP() {
    var strHTML = "<div class=\"container-fluid\">";
    strHTML += "<div class=\"row\">";
    strHTML += "<div class=\"col-xs-12\">";
    strHTML += "<h3>";
    strHTML += "<br>";
    strHTML += "Haz click en el boton [MI POSICION Y AGENCIAS] para encontrart tu posicion y las agencias BCP en el Mapa";
    strHTML += "</hr>";
    strHTML += "</div>";
    strHTML += "</div>";
    strHTML += "</div>";
    $("#mapDondeEstoyBCP").html(strHTML);
}

// END_CUSTOM_CODE_agenciasBcp