sap.ui.define([
    'jquery.sap.global',
    'sap/ui/model/json/JSONModel',
    'sap/ui/base/Object',
    'sap/ui/model/odata/v2/ODataModel'
], function (jQuery, JSONModel, Object, ODataModel) {
    "use strict";

    var _resourceModel;

    var _mainModel;

    var _operationModel;

    var _stringModel;

    var _invoiceModel;

    var _dialogAddRowModel;

    var MyModels = Object.extend("myapp.controller.MyModels", {
        remoteDsURI: undefined,
        resourceBundle: undefined,
        MODEL_NAMES: {
            OPERATION: "operation",
            STRING: "string",
            MAIN: "main",
            INVOICES: "invoices",
            DIALOG_INVOICES: "dialogInvoices",
            REMOTE_INVOICES: "/Invoices"
        },
        constructor: function () {
            Object.constructor.call(this);
        },
        getMainModel: function () {
            if (!_mainModel) {
                _mainModel = new JSONModel({
                    input: "ma lo0l"
                });
            }
            return _mainModel;
        },
        getOperationModel: function () {
            if (!_operationModel) {
                _operationModel = new JSONModel({
                    inputVal: undefined,
                    inputVal2: undefined,
                    result: undefined,
                    selected: 1
                });
            }
            return _operationModel;
        },
        getStringModel: function () {
            if (!_stringModel) {
                _stringModel = new JSONModel({
                    str: "thequickbrownfoxjumpsoverthelazydog",
                    result: undefined,
                    table: []
                });
            }
            return _stringModel;
        },
        getInvoiceModel: function () {
            if (!_invoiceModel) {
                _invoiceModel = new JSONModel({
                    InvoiceCurrency: "EURO",
                    statusItems: [{status: "A", statusText: ""},
                        {status: "B", statusText: ""},
                        {status: "C", statusText: ""}]
                });
            }
            return _invoiceModel;
        },
        getResourceModel: function () {
            if (!_resourceModel) {
                _resourceModel = new ODataModel(this.remoteDsURI,
                        {
                            defaultBindingMode: "TwoWay"
                        });
            }
            return _resourceModel;
        },
        getDialogAddRowModel: function () {
            if (!_dialogAddRowModel) {
                _dialogAddRowModel = new JSONModel();
            }
            return _dialogAddRowModel;
        }
    });

    return MyModels;
});