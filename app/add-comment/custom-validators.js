"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function categoryValidator(control) {
    var errorValue = control.value;
    var value = control.value.toUpperCase();
    if (value !== "ALL PRODUCTS") {
        return null;
    }
    else {
        return { "categoryValidator": { errorValue: errorValue } };
    }
}
exports.categoryValidator = categoryValidator;
function emailValidator(control) {
    var emailRegex = /[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i;
    var value = control.value;
    var result = emailRegex.test(value);
    if (result) {
        return null;
    }
    else {
        return { "emailValidator": { value: value } };
    }
}
exports.emailValidator = emailValidator;
function rangeValidator(minValue, maxValue) {
    return function (control) {
        var value = control.value;
        var numValue = +value;
        if (isNaN(numValue)) {
            return { "rangeValidator": { value: value } };
        }
        else if (numValue < minValue || numValue > maxValue) {
            return { "rangeValidator": { value: value } };
        }
        else {
            return null;
        }
    };
}
exports.rangeValidator = rangeValidator;
//# sourceMappingURL=custom-validators.js.map