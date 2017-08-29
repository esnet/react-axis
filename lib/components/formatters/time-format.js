"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (type, timezone) {
    return function (date) {
        var t = type;
        while (t !== "year") {
            if (timezone) {
                if ((0, _moment2.default)(date).tz(timezone).startOf(majors[t]).isSame((0, _moment2.default)(date).tz(timezone))) {
                    t = majors[t];
                } else {
                    break;
                }
            } else {
                if (!timezone && (0, _moment2.default)(date).startOf(majors[t]).isSame((0, _moment2.default)(date))) {
                    t = majors[t];
                } else {
                    break;
                }
            }
        }

        var labelType = t !== type ? t : type;
        var label = timezone ? (0, _moment2.default)(date).tz(timezone).format(formatterMap[labelType]) : (0, _moment2.default)(date).format(formatterMap[labelType]);
        var size = t !== type ? 25 : 15;
        var labelAlign = "adjacent";

        return { label: label, size: size, labelAlign: labelAlign };
    };
};

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatterMap = {
    second: ":ss",
    minute: "h:mm a",
    hour: "h a",
    day: "ddd DD",
    week: "MMM DD",
    month: "MMM",
    year: "Y"
}; /**
    *  Copyright (c) 2016, The Regents of the University of California,
    *  through Lawrence Berkeley National Laboratory (subject to receipt
    *  of any required approvals from the U.S. Dept. of Energy).
    *  All rights reserved.
    *
    *  This source code is licensed under the BSD-style license found in the
    *  LICENSE file in the root directory of this source tree.
    */

var majors = {
    "second": "minute",
    "minute": "hour",
    "hour": "day",
    "day": "month",
    "week": "month",
    "month": "year",
    "decade": "year"
};