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
exports.takePhoto = void 0;
var camera_1 = require("@capacitor/camera");
var filesystem_1 = require("@capacitor/filesystem");
function takePhoto() {
    return __awaiter(this, void 0, Promise, function () {
        var photo, savedPhoto;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, camera_1.Camera.getPhoto({
                        resultType: camera_1.CameraResultType.Uri,
                        source: camera_1.CameraSource.Camera,
                        quality: 100
                    })];
                case 1:
                    photo = _a.sent();
                    return [4 /*yield*/, savePhoto(photo)];
                case 2:
                    savedPhoto = _a.sent();
                    return [2 /*return*/, savedPhoto];
            }
        });
    });
}
exports.takePhoto = takePhoto;
function savePhoto(cameraPhoto) {
    return __awaiter(this, void 0, Promise, function () {
        var base64Data, fileName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readAsBase64(cameraPhoto)];
                case 1:
                    base64Data = _a.sent();
                    fileName = new Date().getTime() + ".jpeg";
                    return [4 /*yield*/, filesystem_1.Filesystem.writeFile({
                            path: fileName,
                            data: base64Data,
                            directory: filesystem_1.Directory.Data
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, {
                            filepath: fileName,
                            webviewPath: cameraPhoto.webPath
                        }];
            }
        });
    });
}
function readAsBase64(photo) {
    return __awaiter(this, void 0, Promise, function () {
        var response, blob;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(photo.webPath)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.blob()];
                case 2:
                    blob = _a.sent();
                    return [4 /*yield*/, convertBlobToBase64(blob)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function convertBlobToBase64(blob) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });
}
