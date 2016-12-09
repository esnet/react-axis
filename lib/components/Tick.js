"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   *  Copyright (c) 2016, The Regents of the University of California,
                                                                                                                                                                                                                                                                   *  through Lawrence Berkeley National Laboratory (subject to receipt
                                                                                                                                                                                                                                                                   *  of any required approvals from the U.S. Dept. of Energy).
                                                                                                                                                                                                                                                                   *  All rights reserved.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   *  This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                   *  LICENSE file in the root directory of this source tree.
                                                                                                                                                                                                                                                                   */

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({

    displayName: "Tick",

    renderLabel: function renderLabel(align, t, fmt, isTop) {

        var textStyle = {
            fontSize: 11,
            textAnchor: "left",
            fill: "#b0b0b0",
            pointerEvents: "none"
        };

        if (align === "adjacent") {
            return _react2.default.createElement(
                "text",
                {
                    className: "tick-label",
                    key: "label-" + t,
                    style: textStyle,
                    y: 5,
                    x: 2,
                    alignmentBaseline: isTop ? "baseline" : "hanging",
                    textAnchor: "left" },
                fmt(t)
            );
        } else if (align === "center") {
            return _react2.default.createElement(
                "text",
                {
                    className: "tick-label",
                    key: "label-" + t,
                    style: textStyle,
                    y: isTop ? -this.props.tickSize - 3 : this.props.tickSize + 3,
                    alignmentBaseline: isTop ? "baseline" : "hanging",
                    textAnchor: "middle" },
                fmt(t)
            );
        } else {
            return _react2.default.createElement("g", null);
        }
    },
    renderVerticalTick: function renderVerticalTick(i, t, x, fmt, isTop) {
        var _props = this.props,
            tickSize = _props.tickSize,
            tickExtend = _props.tickExtend;

        var dir = isTop ? -1 : 1;

        var line = {
            x1: 0,
            y1: -dir * tickExtend,
            x2: 0,
            y2: dir * tickSize
        };

        return _react2.default.createElement(
            "g",
            {
                className: "tick-grp",
                style: {
                    transform: "translate(" + x + "px, " + (isTop ? this.props.height : 0) + "px)"
                },
                key: "marker-" + fmt(t) },
            _react2.default.createElement("line", _extends({
                className: "tick-mark",
                key: "tick-" + t,
                style: { stroke: "#AAA", strokeWidth: 1 }
            }, line)),
            this.renderLabel(this.props.labelAlign, t, fmt)
        );
    },
    renderHorizontalTick: function renderHorizontalTick(i, t, y, fmt, isLeft) {
        var _props2 = this.props,
            tickSize = _props2.tickSize,
            tickExtend = _props2.tickExtend;

        var dir = isLeft ? -1 : 1;

        var textStyle = {
            fontSize: 11,
            textAnchor: "left",
            fill: "#b0b0b0",
            pointerEvents: "none"
        };

        var line = {
            x1: -dir * tickExtend,
            y1: 0,
            x2: dir * tickSize,
            y2: 0
        };

        return _react2.default.createElement(
            "g",
            {
                className: "tick-grp",
                style: {
                    transform: "translate(" + (isLeft ? this.props.width : 0) + "px," + y + "px)"
                },
                key: "marker-" + fmt(t) },
            _react2.default.createElement("line", _extends({
                className: "tick-mark",
                key: "tick-" + t,
                style: { stroke: "#AAA", strokeWidth: 0.5 }
            }, line)),
            _react2.default.createElement(
                "text",
                {
                    className: "tick-label",
                    key: "label-" + t,
                    style: textStyle,
                    x: isLeft ? -this.props.tickSize - 3 : this.props.tickSize + 3,
                    alignmentBaseline: "middle",
                    textAnchor: isLeft ? "end" : "start" },
                fmt(t)
            )
        );
    },
    render: function render() {
        var _props3 = this.props,
            tickFormat = _props3.tickFormat,
            tickValue = _props3.tickValue,
            tickPosition = _props3.tickPosition,
            tickIndex = _props3.tickIndex,
            align = _props3.align;


        if (align === "top" || align === "bottom") {
            return this.renderVerticalTick(tickIndex, tickValue, tickPosition, tickFormat, align === "top");
        } else {
            return this.renderHorizontalTick(tickIndex, tickValue, tickPosition, tickFormat, align === "left");
        }
    }
});