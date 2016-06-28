sap.ui.define(['jquery.sap.global',
    "sap/ui/core/util/MockServer"
], function (jQuery, MockServer) {
    "use strict";

    return {
        init: function () {

            // create
            var oMockServer = new MockServer({
                rootUri: "/sap/opu/odata/sap/Myapp/"
            });

            var oUriParameters = jQuery.sap.getUriParameters();

            // configure mock server with a delay
            MockServer.config({
                autoRespond: true,
                autoRespondAfter: oUriParameters.get("serverDelay") || 1000
            });

            // simulate
            var sPath = jQuery.sap.getModulePath("myapp.localService");
            oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");

            // start
            oMockServer.start();
        }
    };

});
