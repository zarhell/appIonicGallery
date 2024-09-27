"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@ionic/react");
var FormItemInput = function (_a) {
    var label = _a.label, name = _a.name, value = _a.value, _b = _a.type, type = _b === void 0 ? "text" : _b, handleInputChange = _a.handleInputChange;
    return (react_1["default"].createElement(react_2.IonItem, null,
        react_1["default"].createElement(react_2.IonLabel, { position: "floating" }, label),
        react_1["default"].createElement(react_2.IonInput, { name: name, type: type, value: value, onIonChange: handleInputChange })));
};
exports["default"] = FormItemInput;
