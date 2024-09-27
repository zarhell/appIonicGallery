"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@ionic/react");
var react_router_dom_1 = require("react-router-dom");
var ReverseGeocodeService_1 = require("../../../application/services/ReverseGeocodeService");
var TransferDetails = function (_a) {
    var formData = _a.formData, handleInputChange = _a.handleInputChange, navigateToNext = _a.navigateToNext, navigateToPrev = _a.navigateToPrev;
    var _b = react_1.useState(false), showCalendar = _b[0], setShowCalendar = _b[1];
    var _c = react_1.useState(null), originAddress = _c[0], setOriginAddress = _c[1];
    var _d = react_1.useState(null), destinationAddress = _d[0], setDestinationAddress = _d[1];
    var _e = react_1.useState(0), latitude = _e[0], setLatitude = _e[1];
    var _f = react_1.useState(0), longitude = _f[0], setLongitude = _f[1];
    var history = react_router_dom_1.useHistory();
    var locationState = react_router_dom_1.useLocation();
    react_1.useEffect(function () {
        var _a;
        if ((_a = locationState.state) === null || _a === void 0 ? void 0 : _a.selectedLocation) {
            var _b = locationState.state.selectedLocation, latitude_1 = _b.latitude, longitude_1 = _b.longitude;
            setLatitude(latitude_1);
            setLongitude(longitude_1);
        }
    }, [locationState]);
    react_1.useEffect(function () {
        var fetchAddress = function () { return __awaiter(void 0, void 0, void 0, function () {
            var reverseGeocodeService, foundAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(latitude && longitude)) return [3 /*break*/, 2];
                        reverseGeocodeService = new ReverseGeocodeService_1.ReverseGeocodeService();
                        return [4 /*yield*/, reverseGeocodeService.getAddressFromCoordinates(latitude, longitude)];
                    case 1:
                        foundAddress = _a.sent();
                        setOriginAddress(foundAddress);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        fetchAddress();
    }, [latitude, longitude]);
    var handleOpenMapForOrigin = function () {
        history.push("/map?type=origin");
    };
    var handleOpenMapForDestination = function () {
        history.push("/map?type=destination");
    };
    var handleDateChange = function (e) {
        var selectedDate = e.detail.value;
        handleInputChange({ target: { name: "transferDate", value: selectedDate } });
        setShowCalendar(false);
    };
    return (react_1["default"].createElement(react_2.IonPage, null,
        react_1["default"].createElement(react_2.IonHeader, null,
            react_1["default"].createElement(react_2.IonToolbar, null,
                react_1["default"].createElement(react_2.IonTitle, null, "Detalles del Traslado"))),
        react_1["default"].createElement(react_2.IonContent, null,
            react_1["default"].createElement(react_2.IonItem, null,
                react_1["default"].createElement(react_2.IonLabel, null, "Fecha del Traslado"),
                react_1["default"].createElement(react_2.IonButton, { expand: "block", onClick: function () { return setShowCalendar(true); } }, formData.transferDate ? formData.transferDate : "Seleccionar Fecha")),
            react_1["default"].createElement(react_2.IonModal, { isOpen: showCalendar, onDidDismiss: function () { return setShowCalendar(false); } },
                react_1["default"].createElement(react_2.IonContent, null,
                    react_1["default"].createElement(react_2.IonDatetime, { presentation: "date", value: formData.transferDate, onIonChange: handleDateChange, showDefaultButtons: true }),
                    react_1["default"].createElement(react_2.IonButton, { onClick: function () { return setShowCalendar(false); } }, "Cerrar"))),
            react_1["default"].createElement(react_2.IonButton, { expand: "block", onClick: handleOpenMapForOrigin }, "Seleccionar Lugar de Origen en el Mapa"),
            originAddress && (react_1["default"].createElement(react_2.IonItem, null,
                react_1["default"].createElement(react_2.IonLabel, null,
                    "Lugar de Origen: ",
                    originAddress))),
            react_1["default"].createElement(react_2.IonButton, { expand: "block", onClick: handleOpenMapForDestination }, "Seleccionar Lugar de Destino en el Mapa"),
            destinationAddress && (react_1["default"].createElement(react_2.IonItem, null,
                react_1["default"].createElement(react_2.IonLabel, null,
                    "Lugar de Destino: ",
                    destinationAddress))),
            react_1["default"].createElement(react_2.IonItem, null,
                react_1["default"].createElement(react_2.IonLabel, null, "Raz\u00F3n del Traslado"),
                react_1["default"].createElement(react_2.IonSelect, { name: "transferReason", value: formData.transferReason, onIonChange: handleInputChange },
                    react_1["default"].createElement(react_2.IonSelectOption, { value: "Emergency" }, "Emergencia"),
                    react_1["default"].createElement(react_2.IonSelectOption, { value: "Specialized Consultation" }, "Consulta Especializada"),
                    react_1["default"].createElement(react_2.IonSelectOption, { value: "Referral" }, "Remisi\u00F3n"),
                    react_1["default"].createElement(react_2.IonSelectOption, { value: "Others" }, "Otros"))),
            react_1["default"].createElement(react_2.IonButton, { expand: "block", onClick: navigateToPrev }, "Atr\u00E1s"),
            react_1["default"].createElement(react_2.IonButton, { expand: "block", onClick: navigateToNext }, "Siguiente"))));
};
exports["default"] = TransferDetails;
