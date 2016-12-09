/**
 *  Copyright (c) 2016, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";

export default React.createClass({

    displayName: "Tick",

    renderLabel(align, t, fmt, isTop) {

        const textStyle = {
            fontSize: 11,
            textAnchor: "left",
            fill: "#b0b0b0",
            pointerEvents: "none"
        };

        if (align === "adjacent") {
            return (
                <text
                    className="tick-label"
                    key={`label-${t}`}
                    style={textStyle}
                    y={5}
                    x={2}
                    alignmentBaseline={isTop ? "baseline" : "hanging"}
                    textAnchor="left">
                    {fmt(t)}
                </text>
            );
        } else if (align === "center") {
            return (
                <text
                    className="tick-label"
                    key={`label-${t}`}
                    style={textStyle}
                    y={isTop ? -this.props.tickSize - 3 : this.props.tickSize + 3}
                    alignmentBaseline={isTop ? "baseline" : "hanging"}
                    textAnchor="middle">
                    {fmt(t)}
                </text>
            );
        } else {
            return (
                <g />
            )
        }
    },

    renderVerticalTick(i, t, x, fmt, isTop) {
        const { tickSize, tickExtend } = this.props;
        const dir = isTop ? -1 : 1;

        const line = {
            x1: 0,
            y1: -dir * tickExtend,
            x2: 0,
            y2: dir * tickSize,
        };

        return (
            <g
                className="tick-grp"
                style={{
                    transform: `translate(${x}px, ${isTop ? this.props.height : 0}px)`
                }}
                key={`marker-${fmt(t)}`}>
                <line
                    className="tick-mark"
                    key={`tick-${t}`}
                    style={{stroke: "#AAA", strokeWidth: 1}}
                    {...line} />
                {this.renderLabel(this.props.labelAlign, t, fmt)}
            </g>
        );
    },

    renderHorizontalTick(i, t, y, fmt, isLeft) {
        const { tickSize, tickExtend } = this.props;
        const dir = isLeft ? -1 : 1;

        const textStyle = {
            fontSize: 11,
            textAnchor: "left",
            fill: "#b0b0b0",
            pointerEvents: "none"
        };

        const line = {
            x1: -dir * tickExtend,
            y1: 0,
            x2: dir * tickSize,
            y2: 0
        };

        return (
            <g
                className="tick-grp"
                style={{
                    transform: `translate(${isLeft ? this.props.width : 0}px,${y}px)`
                }}
                key={`marker-${fmt(t)}`}>
                <line
                    className="tick-mark"
                    key={`tick-${t}`}
                    style={{stroke: "#AAA", strokeWidth: 0.5}}
                    {...line} />
                <text
                    className="tick-label"
                    key={`label-${t}`}
                    style={textStyle}
                    x={isLeft ? -this.props.tickSize - 3 : this.props.tickSize + 3}
                    alignmentBaseline="middle"
                    textAnchor={isLeft ? "end" : "start"}>
                    {fmt(t)}
                </text>
            </g>
        );
    },

    render() {
        const {
            tickFormat,
            tickValue,
            tickPosition,
            tickIndex,
            align
        } = this.props;

        if (align === "top" || align === "bottom") {
            return this.renderVerticalTick(
                tickIndex, tickValue, tickPosition, tickFormat, align === "top");
        } else {
            return this.renderHorizontalTick(
                tickIndex, tickValue, tickPosition, tickFormat, align === "left");
        }
    }
});
