sap.ui.define([
    'sap/ui/core/UIComponent',
    './controller/MyUtils'], function (UIComponent, MyUtils) {
    "use strict";

    return UIComponent.extend("myapp.Component", {
        myUtils: new MyUtils(),
        metadata: {
            manifest: "json"
        },
        init: function () {
            UIComponent.prototype.init.apply(this, arguments);

            //var logLevel = jQuery.sap.log.Level.INFO;
            //jQuery.sap.log.setLevel(logLevel);
            //initialize resources
            var sapuiconf = this.getMetadata().getManifestEntry("sap.ui5");
            this.myUtils.myModels.remoteDsURI = sapuiconf.config.remoteDsURI;
            this.myUtils.resourceBundle = this.getModel("locale").getResourceBundle();

            // Parse the current url and display the targets of the route that matches the hash
            this.getRouter().initialize();
        }

    });
}, /* bExport= */ true);
