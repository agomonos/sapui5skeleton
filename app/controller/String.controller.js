sap.ui.define([
    'jquery.sap.global',
    'sap/ui/core/mvc/Controller',
    "./DialogString"
], function (jQuery, Controller, DialogString) {
    "use strict";

    var _myUtils;

    var _stringData;

    var _stringModel;

    var _dialogString;

    var StringController = Controller.extend("myapp.controller.String", {
        onInit: function () {
            _myUtils = this.getOwnerComponent().myUtils;
        },
        onBeforeRendering: function () {
            if (!_stringModel) {
                _stringModel = _myUtils.myModels.getStringModel();
                _stringData = _stringModel.getData();
                this.getView().setModel(_stringModel,
                        _myUtils.myModels.MODEL_NAMES.STRING);
            }
        },
        onAfterRendering: function () {
        },
        onSubmitString: function () {
            var strArray = _stringData.str.split("");
            _stringData.result = "";
            var pos;
            for (var x in strArray) {
                pos = _stringData.result.search(strArray[x]);
                if (pos !== -1) {
                    _stringData.table[pos].occurrences++;
                } else {
                    _stringData.result += strArray[x];
                    _stringData.table.push({character: strArray[x],
                        occurrences: 1
                    });
                }
            }
            _stringModel.refresh(true);
        },
        onPushDialog: function () {
            if (!_dialogString) {
                _dialogString = new DialogString(_myUtils);
            }
            _dialogString.open(this.getView());
        },
        onExit: function () {
            if (_dialogString) {
                _dialogString.destroy();
                _dialogString = undefined;
            }
        }
    });

    return StringController;

});
