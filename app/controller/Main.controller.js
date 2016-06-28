sap.ui.define([
    'jquery.sap.global',
    'sap/m/MessageToast',
    'sap/ui/core/mvc/Controller'
], function (jQuery, MessageToast, Controller) {
    "use strict";

    var _myUtils;

    var _mainData;

    var _mainModel;

    var MainController = Controller.extend("myapp.controller.Main", {
        onInit: function () {
            _myUtils = this.getOwnerComponent().myUtils;
            var params = jQuery.sap.getUriParameters(window.location.href);
            console.log(params);
        },
        onBeforeRendering: function () {
            if (!_mainModel) {
                _mainModel = _myUtils.myModels.getMainModel();
                _mainData = _mainModel.getData();
                this.getView().setModel(_mainModel,
                        _myUtils.myModels.MODEL_NAMES.MAIN);
            }
        },
        onAfterRendering: function () {
        },
        onToTmpPage: function () {
            this.getOwnerComponent().getRouter().navTo("tmp");
        },
        onInputSubmit: function () {
            MessageToast.show(_mainData.input);
        }
    });

    return MainController;

});
