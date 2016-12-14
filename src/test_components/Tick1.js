
import React from "react";
import Tick from "../components/Tick";

export default ({ test }) => {

    const tests = [
        {label: 1.2},
        {label: 1.4, position: 50},
        {label: 1.6, labelAlign: "center", position: 50},
        {label: 1.6, labelAlign: "center", position: 80, size: 20},
        {label: 1.6, labelAlign: "adjacent", position: 80, size: 20},
        {align: "top", label: 1.2},
        {align: "top", label: 1.4, labelAlign: "center", position: 50},
        {align: "top", label: 1.6, labelAlign: "adjacent", position: 50},
        {align: "top", label: 1.6, labelAlign: "center", position: 80, size: 20},
        {align: "top", label: 1.6, labelAlign: "adjacent", position: 80, size: 20}
    ];

    const { label, position, labelAlign, size, align } = tests[test];

    return (
        <Tick
            key="k"
            align={align}
            label={label}
            size={size}
            position={position}
            index={0}
            labelAlign={labelAlign}
            width={500}
            height={40} />
    );
};
