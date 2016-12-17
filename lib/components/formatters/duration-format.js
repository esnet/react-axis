"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return function (v) {
        return {
            label: (0, _duration2.default)(_moment2.default.duration(+v)),
            size: 15,
            labelAlign: "adjacent"
        };
    };
};

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _duration = require("./duration");

var _duration2 = _interopRequireDefault(_duration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

; /**
   *  Copyright (c) 2016, The Regents of the University of California,
   *  through Lawrence Berkeley National Laboratory (subject to receipt
   *  of any required approvals from the U.S. Dept. of Energy).
   *  All rights reserved.
   *
   *  This source code is licensed under the BSD-style license found in the
   *  LICENSE file in the root directory of this source tree.
   */