'use strict';

var watchIDDondeEstoy = null;

app.home = kendo.observable({
    onShow: function () {
        watchIDDondeEstoy = navigator.geolocation.watchPosition(
            onSuccessDondeEstoy, onErrorDondeEstoy, {
                timeout: 10000,
                enableHighAccuracy: true
            }
        );
    },
    afterShow: function () {},
    beforeHide: function () {
        console.log("DFC >>> beforeHide");
        $("#startSegPosDondeEstoy").prop("disabled", false);
        $("#stopSegPosDondeEstoy").prop("disabled", true);
        navigator.geolocation.clearWatch(watchIDDondeEstoy);
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
    //alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    $("#errMsgDondeEstoy").data("kendoMobileModalView").open();
}

function closeErrMsgDondeEstoy() {
    $("#errMsgDondeEstoy").data("kendoMobileModalView").close();
}

function startSegPOS() {
    $("#startSegPosDondeEstoy").prop("disabled", true);
    $("#stopSegPosDondeEstoy").prop("disabled", false);
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
    }
    // END_CUSTOM_CODE_home