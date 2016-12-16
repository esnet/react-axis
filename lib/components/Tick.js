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

/**
 * Builds an axis tick mark with associated label
 */
exports.default = _react2.default.createClass({

    displayName: "Tick",

    getDefaultProps: function getDefaultProps() {
        return {
            position: 0,
            size: 15,
            align: "bottom",
            labelAlign: "adjacent",
            tickSize: 15,
            tickExtend: 0
            //transitionTime: 200
        };
    },


    /**
     *   ___________   or __________
     *       |                |label
     *     label
     */
    renderLabel: function renderLabel(label, isTop, tickSize) {
        var labelAlign = this.props.labelAlign;


        var textStyle = {
            fontSize: 11,
            textAnchor: "left",
            fill: "#b0b0b0",
            pointerEvents: "none"
        };

        var baseLine = isTop ? "baseline" : "hanging";

        if (labelAlign === "adjacent") {
            var x = 2;
            var y = isTop ? -6 : 6;
            return _react2.default.createElement(
                "text",
                {
                    key: "label-" + label,
                    className: "tick-label",
                    style: textStyle,
                    textAnchor: "left",
                    x: x,
                    y: y,
                    alignmentBaseline: baseLine },
                label
            );
        } else if (labelAlign === "center") {
            var _x = 0;
            var _y = isTop ? -tickSize - 3 : tickSize + 3;
            return _react2.default.createElement(
                "text",
                {
                    key: "label-" + label,
                    className: "tick-label",
                    style: textStyle,
                    textAnchor: "middle",
                    x: _x,
                    y: _y,
                    alignmentBaseline: baseLine },
                label
            );
        }
    },
    renderVerticalTick: function renderVerticalTick(id, label, labelPosition, size, extend, isTop) {
        var dir = isTop ? -1 : 1;
        var line = {
            x1: 0,
            y1: -dir * extend,
            x2: 0,
            y2: dir * size
        };

        var style = { stroke: "#AAA", strokeWidth: 1 };
        var groupKey = "grp-" + id + "}";
        var tickKey = "tick-" + id;

        return _react2.default.createElement(
            "g",
            {
                className: "tick-grp",
                key: groupKey },
            _react2.default.createElement("line", _extends({
                key: tickKey,
                className: "tick-line",
                style: style
            }, line)),
            this.renderLabel(label, isTop, size)
        );
    },
    renderHorizontalTick: function renderHorizontalTick(id, label, labelPosition, size, extend, isLeft) {
        var dir = isLeft ? -1 : 1;
        var line = {
            x1: -dir * extend,
            y1: 0,
            x2: dir * size,
            y2: 0
        };

        var textStyle = {
            fontSize: 11,
            textAnchor: "left",
            fill: "#b0b0b0",
            pointerEvents: "none"
        };
        var style = { stroke: "#AAA", strokeWidth: 1 };
        var groupKey = "grp-" + id + "}";
        var tickKey = "tick-" + id;

        return _react2.default.createElement(
            "g",
            {
                className: "tick-grp",
                key: groupKey },
            _react2.default.createElement("line", _extends({
                key: tickKey,
                className: "tick-line",
                style: style
            }, line)),
            _react2.default.createElement(
                "text",
                {
                    key: "label-" + label,
                    className: "tick-label",
                    style: textStyle,
                    textAnchor: isLeft ? "end" : "begin",
                    alignmentBaseline: "middle",
                    x: isLeft ? -size - 3 : size + 3,
                    y: 0 },
                label
            )
        );
    },
    render: function render() {
        var _props = this.props,
            id = _props.id,
            label = _props.label,
            width = _props.width,
            height = _props.height,
            position = _props.position,
            _props$size = _props.size,
            size = _props$size === undefined ? 10 : _props$size,
            _props$extend = _props.extend,
            extend = _props$extend === undefined ? 0 : _props$extend,
            _props$align = _props.align,
            align = _props$align === undefined ? "top" : _props$align;


        if (align === "top" || align === "bottom") {
            var transform = "translate(" + position + "px, " + (align === "top" ? height : 0) + "px)";
            //const transition = `transform ${transitionTime}ms`;
            return _react2.default.createElement(
                "g",
                { className: "tick-grp", style: { transform: transform } },
                this.renderVerticalTick(id, label, position, size, extend, align === "top")
            );
        } else {
            var _transform = "translate(" + (align === "left" ? width : 0) + "px," + position + "px)";
            //const transition = `transform ${transitionTime}ms`;
            return _react2.default.createElement(
                "g",
                { className: "tick-grp", style: { transform: _transform } },
                this.renderHorizontalTick(id, label, position, size, extend, align === "left")
            );
        }
    }
});