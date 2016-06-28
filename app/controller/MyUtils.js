sap.ui.define([
    'jquery.sap.global',
    './MyModels',
    './MyRequestUtil',
    'sap/ui/base/Object',
    'sap/ui/model/SimpleType',
    'sap/ui/model/ValidateException'
], function (jQuery, MyModels, MyRequestUtil, Object, SimpleType, ValidateException) {
    "use strict";

    var that = this;
    
    var MyUtils = Object.extend("myapp.controller.MyModels", {
        myModels: new MyModels(),
        myRequestUtil: new MyRequestUtil(),
        resourceBundle: undefined,
        constructor: function () {
            Object.constructor.call(this);
            that = this;
        },
        getInvoiceFromServer: function () {
            this.myRequestUtil.getInvoiceFromServer(this.myModels);
        },
        refreshInvoiceFromServer: function () {
            this.myRequestUtil.refreshInvoiceFromServer(this.myModels);
        },
        onInputError: function (oEvent) {
            var oElement = oEvent.getParameter("element");
            if (oElement && oElement.setValueState) {
                oElement.setValueState("Error");
                if (oElement.setValueStateText) {
                    oElement.setValueStateText(oEvent.getParameter("message"));
                }
            }
        },
        onParseError: function (oEvent) {
            var oSource = oEvent.getSource();
            if (oSource && oSource.setValueState) {
                oSource.setValueState("Error");
                if (oSource.setValueStateText) {
                    oSource.setValueStateText(oEvent.getParameter("message"));
                }
            }
        },
        onInputSuccess: function (oEvent) {
            var oElement = oEvent.getParameter("element");
            if (oElement && oElement.setValueState) {
                oElement.setValueState("None");
            }
        },
        onFormatError: function (oEvent) {
            var oSource = oEvent.getSource();
            if (oSource && oSource.setValueState) {
                oSource.setValueState("Error");
            }
        },
        typeStatus: SimpleType.extend("string", {
            formatValue: function (oValue) {
                if (oValue && oValue.toUpperCase)
                    return oValue.toUpperCase();
            },
            parseValue: function (oValue) {
                return oValue;
            },
            validateValue: function (oValue) {
                var bPresent = false;
                var invoiceModel = that.myModels.getInvoiceModel();
                if (oValue && oValue.toUpperCase) {
                    $.each(invoiceModel.getData().statusItems,
                            function (index, oElement) {
                                if (oElement.status === oValue.toUpperCase()) {
                                    bPresent = true;
                                    return;
                                }
                            });
                }
                if (!bPresent) {
                    throw new ValidateException(
                            that.resourceBundle.getText("myapp.status.wrongStatus")
                            );
                }
            }
        })

    });

    return MyUtils;
}, /* bExport= */ true);
