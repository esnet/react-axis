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
            tickExtend: 0,
            angled: false
            //transitionTime: 200
        };
    },


    /**
     *   ___________   or __________
     *       |                |label
     *     label
     */
    renderLabel: function renderLabel(label, isTop, tickSize) {
        var _props = this.props,
            labelAlign = _props.labelAlign,
            angled = _props.angled;


        var textStyle = {
            fontSize: 11,
            textAnchor: "left",
            fill: "#b0b0b0",
            pointerEvents: "none"
        };

        var baseLine = isTop ? "baseline" : "hanging";
        var rotate = angled ? "rotate(-65)" : "rotate(0)";
        var dx = angled ? "-1.2em" : "0em";

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
                    transform: rotate,
                    x: x,
                    y: y,
                    dx: dx,
                    dy: "0em",
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
                    transform: rotate,
                    x: _x,
                    y: _y,
                    dx: dx,
                    dy: "0em",
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
        var rotate = this.props.angled ? "rotate(-65)" : "rotate(0)";
        var dx = this.props.angled ? "-1.2em" : "0em";

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
                    transform: rotate,
                    alignmentBaseline: "middle",
                    x: isLeft ? -size - 3 : size + 3,
                    y: 0,
                    dx: dx,
                    dy: "0em" },
                label
            )
        );
    },
    render: function render() {
        var _props2 = this.props,
            id = _props2.id,
            label = _props2.label,
            width = _props2.width,
            height = _props2.height,
            position = _props2.position,
            _props2$size = _props2.size,
            size = _props2$size === undefined ? 10 : _props2$size,
            _props2$extend = _props2.extend,
            extend = _props2$extend === undefined ? 0 : _props2$extend,
            _props2$align = _props2.align,
            align = _props2$align === undefined ? "top" : _props2$align;


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