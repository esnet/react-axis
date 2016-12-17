"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  Copyright (c) 2016, The Regents of the University of California,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  through Lawrence Berkeley National Laboratory (subject to receipt
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  of any required approvals from the U.S. Dept. of Energy).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *  Modified from from https://github.com/jsmreese/moment-duration-format
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

exports.default = function (duration, template, precision) {

    var tokenizer = void 0;
    var tokens = void 0;
    var types = void 0;
    var typeMap = void 0;
    var momentTypes = void 0;
    var foundFirst = void 0;

    var settings = extend({}, defaults);

    // keep a shadow copy of this moment for calculating remainders
    var remainder = _moment2.default.duration(duration);

    // add a reference to this duration object to the settings for use
    // in a template function
    settings.duration = duration;

    // args
    if (template) {
        settings.template = template;
    }
    if (precision) {
        settings.precision = precision;
    }

    // types
    types = settings.types = _underscore2.default.isArray(settings.types) ? settings.types : settings.types.split(" ");

    // template
    if (_underscore2.default.isFunction(settings.template)) {
        settings.template = settings.template.apply(settings);
    }

    // tokenizer regexp
    tokenizer = new RegExp(_underscore2.default.map(types, function (type) {
        return settings[type].source;
    }).join("|"), "g");

    // token type map function
    typeMap = function typeMap(token) {
        return find(types, function (type) {
            return settings[type].test(token);
        });
    };

    // tokens array
    tokens = _underscore2.default.map(settings.template.match(tokenizer), function (token, index) {
        var type = typeMap(token);
        var length = token.length;
        return {
            index: index,
            length: length,
            token: type === "escape" ? token.replace(settings.escape, "$1") : token,
            type: type === "escape" || type === "general" ? null : type
        };
    });

    // unique moment token types in the template (in order of descending magnitude)
    momentTypes = intersection(types, unique(compact(pluck(tokens, "type"))));

    // exit early if there are no momentTypes
    if (!momentTypes.length) {
        return pluck(tokens, "token").join("");
    }

    // calculate values for each token type in the template
    _underscore2.default.each(momentTypes, function (momentType, index) {
        var value = void 0,
            wholeValue = void 0,
            decimalValue = void 0,
            isLeast = void 0,
            isMost = void 0;

        // calculate integer and decimal value portions
        value = remainder.as(momentType);

        wholeValue = value > 0 ? Math.floor(value) : Math.ceil(value);
        decimalValue = value - wholeValue;

        // is this the least-significant moment token found?
        isLeast = index + 1 === momentTypes.length;

        // is this the most-significant moment token found?
        isMost = !index;

        // update tokens array
        // using this algorithm to not assume anything about
        // the order or frequency of any tokens
        _underscore2.default.each(tokens, function (token) {
            if (token.type === momentType) {
                extend(token, {
                    value: value,
                    wholeValue: wholeValue,
                    decimalValue: decimalValue,
                    isLeast: isLeast,
                    isMost: isMost
                });

                if (isMost) {
                    // note the length of the most-significant moment token:
                    // if it is greater than one and forceLength is not set, default forceLength to `true`
                    if (settings.forceLength == null && token.length > 1) {
                        settings.forceLength = true;
                    }

                    // rationale is this:
                    //  - if the template is "h:mm:ss" and the moment value
                    //    is 5 minutes, the user-friendly output is "5:00", not "05:00"
                    //    shouldn't pad the `minutes` token even though it has length of two
                    //  - if the template is "hh:mm:ss", the user clearly wanted
                    //    everything padded so we should output "05:00"
                    //  - if the user wanted the full padded output, they can set
                    //    `{ trim: false }` to get "00:05:00"
                }
            }
        });

        // update remainder
        remainder.subtract(wholeValue, momentType);
    });

    //
    // trim tokens array
    //

    if (settings.trim) {
        tokens = (settings.trim === "left" ? rest : initial)(tokens, function (token) {
            // return `true` if:
            //  - the token is not the least moment token
            //    (don't trim the least moment token)
            //  - the token is a moment token that does not
            //    have a value (don't trim moment tokens that
            //    have a whole value)
            return !(token.isLeast || token.type != null && token.wholeValue);
        });
    }

    //
    // build output
    //

    // the first moment token can have special handling
    foundFirst = false;

    // run the map in reverse order if trimming from the right
    if (settings.trim === "right") {
        tokens.reverse();
    }

    //
    // token:
    //   - type
    //   - token
    //   - wholeValue
    //   - length
    //   - isLeast
    //   - isMost
    //   - value
    //
    tokens = _underscore2.default.map(tokens, function (token) {
        var val = void 0;
        var decVal = void 0;

        if (!token.type) {
            // if it is not a moment token, use the token as its own value
            return token.token;
        }

        // apply negative precision formatting to the least-significant moment token
        if (token.isLeast && settings.precision < 0) {
            val = (Math.floor(token.wholeValue * Math.pow(10, settings.precision)) * Math.pow(10, -settings.precision)).toString();
        } else {
            val = token.wholeValue.toString();
        }

        // remove negative sign from the beginning
        val = val.replace(/^\-/, "");

        // apply token length formatting
        // special handling for the first moment token that is not
        // the most significant in a trimmed template
        if (token.length > 1 && (foundFirst || token.isMost || settings.forceLength)) {
            val = padZero(val, token.length);
        }

        // add decimal value if precision > 0
        if (token.isLeast && settings.precision > 0) {
            decVal = token.decimalValue.toString().replace(/^\-/, "").split(/\.|e\-/);
            switch (decVal.length) {
                case 1:
                    val += "." + padZero(decVal[0], settings.precision, true).slice(0, settings.precision);
                    break;

                case 2:
                    val += "." + padZero(decVal[1], settings.precision, true).slice(0, settings.precision);
                    break;

                case 3:
                    val += "." + padZero(repeatZero(+decVal[2] - 1) + (decVal[0] || "0") + decVal[1], settings.precision, true).slice(0, settings.precision);
                    break;

                default:
                    throw new Error("Moment Duration Format: unable to parse token decimal value.");
            }
        }

        // add a negative sign if the value is negative and token is most significant
        if (token.isMost && token.value < 0) {
            val = "-" + val;
        }

        foundFirst = true;

        return val;
    });

    // undo the reverse if trimming from the right
    if (settings.trim === "right") {
        tokens.reverse();
    }

    return tokens.join("");
};

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 */

/**
 * returns "0" repeated qty times
 */
function repeatZero(qty) {
    var result = "";

    // exit early
    // if qty is 0 or a negative number
    // or doesn't coerce to an integer
    qty = parseInt(qty, 10);
    if (!qty || qty < 1) {
        return result;
    }

    while (qty) {
        result += "0";
        qty -= 1;
    }

    return result;
}

/**
 * pads a string with zeros up to a specified length
 * greater than or equal to the specified length
 * default output pads with zeros on the left
 * set isRight to `true` to pad with zeros on the right
 */
function padZero(str, len, isRight) {
    if (str == null) {
        str = "";
    }
    str = "" + str;

    return (isRight ? str : "") + repeatZero(len - str.length) + (isRight ? "" : str);
}

// pluck
function pluck(array, prop) {
    return _underscore2.default.map(array, function (item) {
        return item[prop];
    });
}

// compact
function compact(array) {
    var ret = [];

    _underscore2.default.each(array, function (item) {
        if (item) {
            ret.push(item);
        }
    });

    return ret;
}

// unique
function unique(array) {
    var ret = [];

    _underscore2.default.each(array, function (_a) {
        if (!find(ret, _a)) {
            ret.push(_a);
        }
    });

    return ret;
}

// intersection
function intersection(a, b) {
    var ret = [];

    _underscore2.default.each(a, function (_a) {
        _underscore2.default.each(b, function (_b) {
            if (_a === _b) {
                ret.push(_a);
            }
        });
    });

    return unique(ret);
}

// rest
function rest(array, callback) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = array.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                index = _step$value[0],
                item = _step$value[1];

            if (!callback(item)) {
                return array.slice(index);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return array;
}

// initial
function initial(array, callback) {
    var reversed = array.slice().reverse();
    return rest(reversed, callback).reverse();
}

// extend
function extend(a, b) {
    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }

    return a;
}

// findLast
function findLast(array, callback) {
    var index = array.length;

    while (index -= 1) {
        if (callback(array[index])) {
            return array[index];
        }
    }
}

// find
function find(array, callback) {
    var index = 0,
        max = array.length,
        match;

    if (typeof callback !== "function") {
        match = callback;
        callback = function callback(item) {
            return item === match;
        };
    }

    while (index < max) {
        if (callback(array[index])) {
            return array[index];
        }
        index += 1;
    }
}

var defaults = {
    // token definitions
    escape: /\[(.+?)\]/,
    years: /[Yy]+/,
    months: /M+/,
    weeks: /[Ww]+/,
    days: /[Dd]+/,
    hours: /[Hh]+/,
    minutes: /m+/,
    seconds: /s+/,
    milliseconds: /S+/,
    general: /.+?/,

    // token type names
    // in order of descending magnitude
    // can be a space-separated token name list or an array of token names
    types: "escape years months weeks days hours minutes seconds milliseconds general",

    // format options

    // trim
    // "left" - template tokens are trimmed from the left until the first moment token that has a value >= 1
    // "right" - template tokens are trimmed from the right until the first moment token that has a value >= 1
    // (the final moment token is not trimmed, regardless of value)
    // `false` - template tokens are not trimmed
    trim: "left",

    // precision
    // number of decimal digits to include after (to the right of) the decimal point (positive integer)
    // or the number of digits to truncate to 0 before (to the left of) the decimal point (negative integer)
    precision: 0,

    // force first moment token with a value to render at full length even when template is trimmed and first moment token has length of 1
    forceLength: null,

    // template used to format duration
    // may be a function or a string
    // template functions are executed with the `this` binding of the settings object
    // so that template strings may be dynamically generated based on the duration object
    // (accessible via `this.duration`)
    // or any of the other settings
    template: function template() {
        var settings = this;
        var types = settings.types;
        var lastType = findLast(types, function (type) {
            return settings.duration._data[type];
        });

        // default template strings for each duration dimension type
        switch (lastType) {
            case "seconds":
                return "h:mm:ss";
            case "minutes":
                return "d[d] h:mm";
            case "hours":
                return "d[d] h[h]";
            case "days":
                return "M[m] d[d]";
            case "weeks":
                return "y[y] w[w]";
            case "months":
                return "y[y] M[m]";
            case "years":
                return "y[y]";
            default:
                return "y[y] M[m] d[d] h:mm:ss";
        }
    }
};

;