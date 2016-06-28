sap.ui.define([
    'jquery.sap.global',
    "myapp/model/formatter",
    'sap/ui/core/mvc/Controller',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "./DialogInvoice",
    "sap/m/MessageBox"
], function (jQuery, formatter, Controller, Filter, FilterOperator, DialogInvoice, MessageBox) {
    "use strict";

    var _myUtils;

    var _resourceModel;
    var _dialogAddRowModel;
    var _invoiceModel;

    var _dialogInvoice;
    var _dialogAddRow;

    var InvoicesController = Controller.extend("myapp.controller.Invoices", {
        formatter: formatter,
        onInit: function () {
            _myUtils = this.getOwnerComponent().myUtils;
            this.typeStatus = _myUtils.typeStatus;
        },
        onBeforeRendering: function () {
            if (!_resourceModel) {
                var myModels = _myUtils.myModels;
                _dialogAddRowModel = myModels.getDialogAddRowModel();
                _resourceModel = myModels.getResourceModel();
                _invoiceModel = myModels.getInvoiceModel();

                var items = _invoiceModel.getData().statusItems;

                for (var x in items) {
                    items[x].statusText = formatter.statusText(items[x].status,
                            _myUtils.resourceBundle);
                }

                this.getView().setModel(_resourceModel);
                this.getView().setModel(_invoiceModel,
                        myModels.MODEL_NAMES.INVOICES);
                this.getView().setModel(_dialogAddRowModel,
                        myModels.MODEL_NAMES.DIALOG_INVOICES);
            }
        },
        onAfterRendering: function () {
        },
        onPushRefreshInvoice: function () {
            _resourceModel.submitChanges();
            _resourceModel.refresh();
        },
        onPushSubmitChanges: function () {
            _resourceModel.submitChanges();
        },
        onFilterInvoices: function (oEvent) {
            // build filter array
            var aFilter = [];
            var sQuery = oEvent.getParameter("query").toLowerCase();
            if (sQuery) {
                aFilter.push(new Filter("ProductName",
                        FilterOperator.Contains, sQuery));
            }

            // filter binding
            var oBinding = this.getView().byId("invoicesTable").getBinding("items");
            oBinding.filter(aFilter);
        },
        onPushSortDialog: function () {
            if (!_dialogInvoice) {
                _dialogInvoice = new DialogInvoice(_myUtils);
            }
            _dialogInvoice.open(this.getView());
        },
        onPushAddRow: function () {
            if (!_dialogAddRow) {
                _dialogAddRow = sap.ui.xmlfragment("myapp.view.DialogAddRowInvoice", this);
                this.getView().addDependent(_dialogAddRow);
            }
            _dialogAddRow.open();
        },
        onPushDeleteRow: function () {
            var aContexts = this.getView().byId("invoicesTable").getSelectedContexts();
            if (aContexts.length > 0) {
                var sMessage;
                if (aContexts.length === 1) {
                    sMessage = _myUtils.resourceBundle.getText("myapp.invoices.confirmDeletion");
                } else {
                    sMessage = _myUtils.resourceBundle.getText("myapp.invoices.confirmDeletions");
                }
                MessageBox.confirm(sMessage,
                        {onClose: function (oAction) {
                                if (oAction === MessageBox.Action.OK) {
                                    _resourceModel.setDeferredGroups(["REMOVEGROUP"]);
                                    for (var i in aContexts) {
                                        _resourceModel.remove(aContexts[i].getPath(), {groupId: "REMOVEGROUP"});
                                    }
                                    _resourceModel.submitChanges({groupId: "REMOVEGROUP"});
                                }
                            }});
            }

        },
        onPushSaveAddRow: function () {
            var oGridContents = sap.ui.getCore().byId("gridDialogRow").getContent();
            var bContinue = true;
            jQuery.each(oGridContents, function (index, oContent) {
                if (oContent.getMetadata().getName() === "sap.m.Input") {
                    if (!oContent.getValue()) {
                        oContent.setValueState("Error");
                        bContinue = false;
                    }
                    if (bContinue && "Error" === oContent.getValueState()) {
                        bContinue = false;
                    }
                }
            });

            if (!bContinue) {
                MessageBox.alert(_myUtils.resourceBundle.getText("myapp.invoices.dialogComplete"));
                return;
            }

            _resourceModel.create(_myUtils.myModels.MODEL_NAMES.REMOTE_INVOICES,
                    _dialogAddRowModel.getData());
            _resourceModel.updateBindings(true);
            _dialogAddRowModel.setProperty("/", {});
            _dialogAddRow.close();
        },
        onInputError: function (oEvent) {
            _myUtils.onInputError(oEvent);
        },
        onInputSuccess: function (oEvent) {
            _myUtils.onInputSuccess(oEvent);
        },
        onParseError: function (oEvent) {
            _myUtils.onParseError(oEvent);
        },
        onFormatError: function (oEvent) {
            _myUtils.onFormatError(oEvent);
        },
        typeStatus: undefined,
        onExit: function () {
            if (_dialogInvoice) {
                _dialogInvoice.destroy();
                _dialogInvoice = undefined;
            }
            if (_dialogAddRow) {
                _dialogAddRow.destroy();
                this.getView().removeDependent(_dialogAddRow);
                _dialogAddRow = undefined;
            }
        }
    });

    return InvoicesController;

});
