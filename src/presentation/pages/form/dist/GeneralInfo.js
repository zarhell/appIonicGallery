"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@ionic/react");
var FormItemInput_1 = require("./FormItemInput");
var FormItemSelect_1 = require("./FormItemSelect");
var GeneralInfo = function (_a) {
    var formData = _a.formData, handleInputChange = _a.handleInputChange, navigateToNext = _a.navigateToNext;
    return (react_1["default"].createElement(react_2.IonPage, null,
        react_1["default"].createElement(react_2.IonHeader, null,
            react_1["default"].createElement(react_2.IonToolbar, null,
                react_1["default"].createElement(react_2.IonTitle, null, "Informaci\u00F3n General"))),
        react_1["default"].createElement(react_2.IonContent, null,
            react_1["default"].createElement(FormItemInput_1["default"], { label: "Nombre Completo", name: "fullName", value: formData.fullName, handleInputChange: handleInputChange }),
            react_1["default"].createElement(FormItemInput_1["default"], { label: "N\u00FAmero de Identificaci\u00F3n", name: "idNumber", value: formData.idNumber, handleInputChange: handleInputChange }),
            react_1["default"].createElement(FormItemInput_1["default"], { label: "Edad", name: "age", value: formData.age, type: "number", handleInputChange: handleInputChange }),
            react_1["default"].createElement(FormItemSelect_1["default"], { label: "G\u00E9nero", name: "gender", value: formData.gender, options: [
                    { value: "Male", label: "Masculino" },
                    { value: "Female", label: "Femenino" },
                    { value: "Other", label: "Otro" },
                ], handleInputChange: handleInputChange }),
            react_1["default"].createElement(react_2.IonButton, { expand: "block", onClick: navigateToNext }, "Siguiente"))));
};
exports["default"] = GeneralInfo;
