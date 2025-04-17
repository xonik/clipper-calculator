import React from 'react';
import './App.css';
import { LineChart } from "@mui/x-charts";
import { solveDiodeClipperForXRange, solveDiodeClipperForYRange, solveOpAmpGainForX } from "./logic/diodeClipperSolver";
import { Point } from "./logic/types";
import {
    findInvertingGainCombo,
    findNonInvertingGainCombo,
    findResistorDividerCombo
} from "./logic/resistorCalculator";
import { parseComponentValue, printComponentValue } from "./logic/valueParser";

function App() {

    //const points = calculatePoints(100)

    const points = solveDiodeClipperForYRange(0, 0.6, 0.02)
    const points1 = solveDiodeClipperForXRange(0, 0.11, 0.01)

    findResistorDividerCombo(10000, 100000, 0.21, 'E12')
    findNonInvertingGainCombo(500, 100000, 0.2, 'E12')

    const opampPoints = solveOpAmpGainForX(points)
    console.log(opampPoints)

    console.log(printComponentValue(1/1000000000000000))
    console.log(printComponentValue(1/1000000000000))
    console.log(printComponentValue(1/1000000000))
    console.log(printComponentValue(1/1000000))
    console.log(printComponentValue(1/1000))
    console.log(printComponentValue(0.9))
    console.log(printComponentValue(1))
    console.log(printComponentValue(1.1))
    console.log(printComponentValue(1500))
    console.log(printComponentValue(1000000))
    console.log(printComponentValue(1000000000))
    console.log(printComponentValue(1000000000000))

    console.log(parseComponentValue('0.01p'))
    console.log(parseComponentValue('1p1'))
    console.log(parseComponentValue('1.1n'))
    console.log(parseComponentValue('1.1u'))
    console.log(parseComponentValue('1.1m'))
    console.log(parseComponentValue('1.1'))
    console.log(parseComponentValue('1.1k'))
    console.log(parseComponentValue('1.1M'))
    console.log(parseComponentValue('11000M'))

    const five: Point[] = []
    for (let i = 0; i < 100; i += 10) {
        five.push({
            x: i, y: 1000
        })
    }

    return (
        <div className="app">
            <div className="params">
                <table>
                    <thead>
                    <tr>
                        <th>Constants</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>I_0</td>
                        <td><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td>V_t</td>
                        <td><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td>n</td>
                        <td><input type="text"></input></td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                    <tr>
                        <th>Components</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>R_gnd</td>
                        <td><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td>R_f</td>
                        <td><input type="text"></input></td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                    <tr>
                        <th>Voltages</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Max input</td>
                        <td><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td>Max clipper output</td>
                        <td><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td>Max circuit output</td>
                        <td><input type="text"></input></td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                    <tr>
                        <th>Calculations</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Input attenuation</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Attenuated input (max)</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Post clipper voltage (max)</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Post clipper gain</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Approximate clipping start</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <LineChart
                    xAxis={[{ data: points.map((point) => point.x) }]}
                    grid={{ vertical: true, horizontal: true }}
                    series={[
                        {
                            data: points.map((point) => point.y),
                            area: false,
                            showMark: false,
                        },/*
                        {
                            data: opampPoints.map((point) => point.y),
                            area: false,
                            showMark: false,
                        },
                        /*{
                            data: five.map((point) => point.y),
                            area: false,
                            showMark: false,
                        },*/
                    ]}
                    width={1000}
                    height={1000}
                />
            </div>
        </div>
    );
}

export default App;
