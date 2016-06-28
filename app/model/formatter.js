sap.ui.define([],
        function () {
            "use strict";
            return {
                statusText: function (sStatus, bundle) {
                    var resourceBundle;
                    if (!bundle) {
                        resourceBundle = this.getOwnerComponent().getModel("locale").getResourceBundle();
                    } else {
                        resourceBundle = bundle;
                    }
                    switch (sStatus) {
                        case "A":
                            return resourceBundle.getText("myapp.invoiceStatusA");
                        case "B":
                            return resourceBundle.getText("myapp.invoiceStatusB");
                        case "C":
                            return resourceBundle.getText("myapp.invoiceStatusC");
                        default:
                            return sStatus;
                    }
                }};
        });