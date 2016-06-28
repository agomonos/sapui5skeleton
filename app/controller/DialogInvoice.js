sap.ui.define([
    'jquery.sap.global',
    'sap/ui/base/Object',
    'sap/ui/model/Sorter'
], function (jQuery, Object, Sorter) {
    "use strict";

    var _myUtils;

    var _view;

    var _dialogInvoice;

    var DialogInvoice = Object.extend("myapp.controller.DialogInvoice", {
        constructor: function (myUtils) {
            _myUtils = myUtils;
        },
        open: function (oView) {
            if (!_dialogInvoice)
                _dialogInvoice = sap.ui.xmlfragment("myapp.view.DialogInvoice", this);
            _view = oView;
            _view.addDependent(_dialogInvoice);
            
            _dialogInvoice.open();
        },
        confirmDialog: function (oEvent) {
            var mParams = oEvent.getParameters(),
                    oBinding = _view.byId("invoicesTable").getBinding("items");

            var aSorters = [],
                    sPath,
                    bDescending;
            if (mParams.groupItem) {
                sPath = mParams.groupItem.getKey();
                bDescending = mParams.groupDescending;
                var vGroup = this.mGroupFunctions[sPath];
                aSorters.push(new Sorter(sPath, bDescending, vGroup));
            }
            sPath = mParams.sortItem.getKey();
            bDescending = mParams.sortDescending;

            aSorters.push(new Sorter(sPath, bDescending));
            oBinding.sort(aSorters);
            _view.removeDependent(_dialogInvoice);
        },
        destroy: function () {
            _view.removeDependent(_dialogInvoice);
            _dialogInvoice.destroy();
        },
        mGroupFunctions: {
            ShipperName: function (oContext) {
                var shipper = oContext.getProperty("ShipperName");
                return {
                    key: shipper,
                    text: shipper
                };
            },
            ProductName: function (oContext) {
                var product = oContext.getProperty("ProductName");
                return {
                    key: product,
                    text: product
                };
            },
            ExtendedPrice: function (oContext) {
                var price = oContext.getProperty("ExtendedPrice"),
                        key,
                        text,
                        currencyCode = oContext.getProperty("/InvoiceCurrency");
                if (price <= 10) {
                    key = "LE10";
                    text = _myUtils.resourceBundle.getText(
                            "myapp.dialogInvoice.le10",
                            [currencyCode]
                            );
                } else if (price <= 100) {
                    key = "BE10-100";
                    text = _myUtils.resourceBundle.getText(
                            "myapp.dialogInvoice.be10-100",
                            [currencyCode]
                            );
                } else if (price <= 1000) {
                    key = "GT100";
                    text = _myUtils.resourceBundle.getText(
                            "myapp.dialogInvoice.gt100",
                            [currencyCode]
                            );
                }
                return {
                    key: key,
                    text: text
                };
            }
        }
    });

    return DialogInvoice;
});