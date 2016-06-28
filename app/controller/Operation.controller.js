sap.ui.define([
    'jquery.sap.global',
    'sap/ui/core/mvc/Controller'
], function (jQuery, Controller) {
    "use strict";
    var _myUtils;

    var _operationData;

    var _operationModel;

    var OperationController = Controller.extend("myapp.controller.Operation", {
        onInit: function () {
            _myUtils = this.getOwnerComponent().myUtils;
        },
        onBeforeRendering: function () {
            if (!_operationModel) {
                _operationModel = _myUtils.myModels.getOperationModel();
                _operationData = _operationModel.getData();
                this.getView().setModel(_operationModel,
                        _myUtils.myModels.MODEL_NAMES.OPERATION);
            }
        },
        onAfterRendering: function () {
        },
        onSubmitOperation: function () {
            if (_operationData.inputVal === undefined ||
                    _operationData.inputVal2 === undefined)
                return;
            switch (_operationData.selected) {
                case 0:
                    _operationData.result = _operationData.inputVal *
                            _operationData.inputVal2;
                    break;
                case 1:
                    _operationData.result = _operationData.inputVal /
                            _operationData.inputVal2;
                    break;
                default:
                    _operationData.result = undefined;
                    break;
            }
            _operationModel.refresh(true);
        }
    });

    return OperationController;

});
