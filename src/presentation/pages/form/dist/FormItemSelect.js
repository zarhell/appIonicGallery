"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@ionic/react");
var FormItemSelect = function (_a) {
    var label = _a.label, name = _a.name, value = _a.value, options = _a.options, handleInputChange = _a.handleInputChange;
    return (react_1["default"].createElement(react_2.IonItem, null,
        react_1["default"].createElement(react_2.IonLabel, null, label),
        react_1["default"].createElement(react_2.IonSelect, { name: name, value: value, onIonChange: handleInputChange }, options.map(function (option) { return (react_1["default"].createElement(react_2.IonSelectOption, { key: option.value, value: option.value }, option.label)); }))));
};
exports["default"] = FormItemSelect;
