sap.ui.define([
    'jquery.sap.global',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/core/format/DateFormat',
    'sap/ui/model/odata/v2/ODataModel',
    './MyRequestUtil'
], function (jQuery, JSONModel, MessageBox, MessageToast, DateFormat, ODataModel, MyRequestUtil) {
    "use strict";

    var MyUtils = {
        
        oDataModel: undefined,
        
        requestUtil: new MyRequestUtil(),
        
        getODataModel: function () {
            if (!this.oDataModel) {
                this.oDataModel = new ODataModel("/sap/opu/odata/sap/openui5skeleton/");
            }
            return this.oDataModel;
        },
        
        getProductFromServer: function () {
            this.requestUtil.getProductFromServer(this.getODataModel());
        },

        oDateFormat: DateFormat.getDateTimeInstance({
            pattern: "dd/MM/yyyy"
        })

    };

    return MyUtils;

}, /* bExport= */ true);
