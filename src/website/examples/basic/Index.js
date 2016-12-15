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
import Axis from "../../../components/Axis";

const basic = React.createClass({

    getInitialState() {
        return {
            type: "linear",
            position: "left",
            ymax: 10
        };
    },

    renderAxis() {
        if (this.state.position === "left") {
            return (
                <div className="row">
                    <div className="col-md-3">
                        <div style={{float: "right"}}>
                        <Axis
                            tickExtend={400}
                            label="Left axis"
                            format="d"
                            standalone={true}
                            type={this.state.type}
                            position={this.state.position}
                            max={this.state.ymax} min={1}
                            labelPosition={30}
                            width={80} height={500} />
                        </div>
                    </div>
                    <div className="col-md-9" style={{background: "#EEE", color: "#AAA", height: 500}}>
                        chart
                    </div>
                </div>
            );
        } else if (this.state.position === "right") {
            return (
                <div className="row">
                    <div className="col-md-9" style={{background: "#EEE", color: "#AAA", height: 500}}>
                        chart
                    </div>
                    <div className="col-md-3">
                        <div style={{float: "left"}}>
                        <Axis
                            label="Right axis"
                            format="d"
                            standalone={true}
                            type={this.state.type}
                            position={this.state.position}
                            max={this.state.ymax} min={1}
                            labelPosition={35}
                            width={80} height={500} />
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.position === "top") {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <Axis
                            label="Top axis"
                            format="d"
                            standalone={true}
                            type={this.state.type}
                            position={this.state.position}
                            min={1} max={this.state.ymax}
                            labelPosition={20}
                            width={800} height={50} />
                    </div>
                    <div className="col-md-12">
                        <div style={{background: "#EEE", color: "#AAA", width: 800, height: 500}}>
                        chart
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.position === "bottom") {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <div style={{
                            background: "#EEE",
                            color: "#AAA",
                            width: 800,
                            height: 500,
                            marginBottom: 5
                        }}>
                        chart
                        </div>
                    </div>
                    <div className="col-md-12">
                        <Axis
                            label="Bottom axis"
                            format="d"
                            standalone={true}
                            type={this.state.type}
                            position={this.state.position}
                            min={1} max={this.state.ymax}
                            labelPosition={30}
                            width={800} height={50} />
                    </div>
                </div>
            );
        }
    },

    render() {
        const linkStyle = {
            fontWeight: 600,
            color: "grey",
            cursor: "default"
        };

        const linkStyleActive = {
            color: "steelblue",
            cursor: "pointer"
        };

        return (
            <div>
            <div className="row">
                <div className="col-md-12" style={{fontSize: 14, color: "#777"}}>
                    <span
                        style={this.state.type !== "linear" ? linkStyleActive : linkStyle}
                        onClick={() => this.setState({type: "linear"})}>
                            Linear scale
                    </span>
                    <span> | </span>
                    <span
                        style={this.state.type !== "power" ? linkStyleActive : linkStyle}
                        onClick={() => this.setState({type: "power"})}>
                            Power scale
                    </span>
                    <span> | </span>
                    <span
                        style={this.state.type !== "log" ? linkStyleActive : linkStyle}
                        onClick={() => this.setState({type: "log"})}>
                            Log scale
                    </span>
                    <span style={{marginLeft: 50}}>{" "}</span>

                    <span
                        style={this.state.position === "left" ? linkStyle : linkStyleActive }
                        onClick={() => this.setState({position: "left"})}>
                            Left
                    </span>
                    <span> | </span>
                    <span
                        style={this.state.position === "right" ? linkStyle : linkStyleActive }
                        onClick={() => this.setState({position: "right"})}>
                            Right
                    </span>
                    
                    <span> | </span>

                    <span
                        style={this.state.position === "top" ? linkStyle : linkStyleActive }
                        onClick={() => this.setState({position: "top"})}>
                            Top
                    </span>

                    <span> | </span>
                    
                    <span
                        style={this.state.position === "bottom" ? linkStyle : linkStyleActive }
                        onClick={() => this.setState({position: "bottom"})}>
                            Bottom
                    </span>

                    <span style={{marginLeft: 50}}>{" "}</span>

                    <span
                        style={this.state.ymax !== 10 ? linkStyleActive : linkStyle}
                        onClick={() => this.setState({ymax: 10})}>
                            10
                    </span>

                    <span> | </span>

                    <span
                        style={this.state.ymax !== 20 ? linkStyleActive : linkStyle}
                        onClick={() => this.setState({ymax: 20})}>
                            20
                    </span>

                    <span> | </span>

                    <span
                        style={this.state.ymax !== 100 ? linkStyleActive : linkStyle}
                        onClick={() => this.setState({ymax: 100})}>
                            100
                    </span>
                </div>
            </div>

            <hr />

            <div className="row">
                <div className="col-md-12">
                    {this.renderAxis()}
                </div>
            </div>

            </div>
        );
    }
});

// Export example
import basic_docs from "./basic_docs.md";
export default {basic, basic_docs};
