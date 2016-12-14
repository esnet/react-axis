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

/**
 * Builds an axis tick mark with associated label
 */
export default React.createClass({

    displayName: "Tick",

    getDefaultProps() {
        return {
            position: 0,
            size: 15,
            align: "bottom",
            labelAlign: "adjacent",
            tickSize: 15,
            tickExtend: 0,
            transitionTime: 200
        };
    },

    /**
     *   ___________   or __________
     *       |                |label
     *     label
     */
    renderLabel(label, isTop, tickSize) {

        const { labelAlign } = this.props;

        const textStyle = {
            fontSize: 11,
            textAnchor: "left",
            fill: "#b0b0b0",
            pointerEvents: "none"
        };

        const baseLine = isTop ? "baseline" : "hanging";

        if (labelAlign === "adjacent") {
            const x = 2;
            const y = isTop ? - tickSize + 8 : tickSize - 8;
            return (
                <text
                    className="tick-label"
                    key={`label-${label}`}
                    textAnchor="left"
                    style={textStyle}
                    x={x}
                    y={y}
                    alignmentBaseline={baseLine}>
                    {label}
                </text>
            );
        } else if (labelAlign === "center") {
            const x = 0;
            const y = isTop ? -tickSize - 3 : tickSize + 3;
            return (
                <text
                    className="tick-label"
                    key={`label-${label}`}
                    style={textStyle}
                    textAnchor="middle"
                    x={x}
                    y={y}
                    alignmentBaseline={baseLine}>
                    {label}
                </text>
            );
        } else {
            return (
                <g />
            )
        }
    },

    renderVerticalTick(i, label, labelPosition, size, extend, isTop) {
        const dir = isTop ? -1 : 1;
        const line = {
            x1: 0,
            y1: - dir * extend,
            x2: 0,
            y2: dir * size,
        };

        const style = {stroke: "#AAA", strokeWidth: 1};
        const groupKey = `grp-${i}}`;
        const tickKey = `tick-${i}`;

        return (
            <g
                className="tick-grp"
                key={groupKey}>
                <line
                    key={tickKey}
                    className="tick-line"
                    style={style}
                    {...line}
                />
                {this.renderLabel(label, isTop, size)}
            </g>
        );
    },

    renderHorizontalTick(i, t, y, fmt, isLeft) {
        const {
            tickSize,
            tickExtend
        } = this.props;
        
        const textStyle = this.props.style || {
            fontSize: 11,
            textAnchor: "left",
            fill: "#b0b0b0",
            pointerEvents: "none"
        };

        const dir = isLeft ? -1 : 1;
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
            index,
            label,
            height,
            position,
            size = 10,
            extend = 0,
            align = "top",
            transitionTime
        } = this.props;

        if (align === "top" || align === "bottom") {
            const transform = `translate(${position}px, ${align === "top" ? height : 0}px)`;
            const transition = `transform ${transitionTime}ms`;
            return (
                <g className="tick-grp" style={{transform, transition}}>
                    {this.renderVerticalTick(index, label, position, size, extend, align === "top")}
                </g>
            );
        } else {
            return this.renderHorizontalTick(
                index, label, position, align === "left"
            );
        }
    }
});
