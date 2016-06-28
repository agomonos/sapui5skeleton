sap.ui.define([
    'jquery.sap.global',
    'sap/ui/base/Object',
    'sap/ui/model/Sorter'
], function (jQuery, Object, Sorter) {
    "use strict";
    
    var _myUtils;
    
    var _view;
    
    var _dialogString;

    var DialogInvoice = Object.extend("myapp.controller.DialogString", {
        _dialogString: undefined,

        constructor: function (myUtils) {
            _myUtils = myUtils;
        },
        open: function (oView) {
            if (!_dialogString)
                _dialogString = sap.ui.xmlfragment("myapp.view.DialogString", this);
            _view = oView;
            _view.addDependent(_dialogString);
            _dialogString.open();
        },
        confirmDialog: function (oEvent) {
            var mParams = oEvent.getParameters(),
                    oBinding = _view.byId("stringTable").getBinding("items");

            var aSorters = [],
                    sPath,
                    bDescending;
            if (mParams.groupItem) {
                sPath = mParams.groupItem.getKey();
                bDescending = mParams.groupDescending;
                aSorters.push(new Sorter(sPath, bDescending, true));
            }
            sPath = mParams.sortItem.getKey();
            bDescending = mParams.sortDescending;

            aSorters.push(new Sorter(sPath, bDescending));
            oBinding.sort(aSorters);
            this.close();
        },
        close: function () {
            _view.removeDependent(_dialogString);
        },
        destroy: function () {
            this.close();
            _dialogString.destroy();
        }
    });

    return DialogInvoice;
});