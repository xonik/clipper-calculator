import React from 'react';
import './App.css';
import { LineChart } from "@mui/x-charts";
import { solveDiodeClipperForXRange, solveDiodeClipperForYRange, solveOpAmpGainForX } from "./logic/diodeClipperSolver";
import { Point } from "./logic/types";
import { findResistorDividerCombo } from "./logic/resistorCalculator";
import { parseComponentValue, printComponentValue } from "./logic/valueParser";

function App() {

    //const points = calculatePoints(100)

    const points = solveDiodeClipperForYRange(0, 0.6, 0.02)
    const points1 = solveDiodeClipperForXRange(0, 0.11, 0.01)

    findResistorDividerCombo(10000, 100000, 0.21, 'E12')

    const opampPoints = solveOpAmpGainForX(points)
    console.log(opampPoints)

    console.log(parseComponentValue('1k5'))
    console.log(parseComponentValue('1.5k'))
    console.log(parseComponentValue('1.5M'))
    console.log(parseComponentValue('1.5897234M'))
    console.log(parseComponentValue('1.5M5'))
    console.log(parseComponentValue('15000.5'))
    console.log(parseComponentValue('15000'))
    console.log(parseComponentValue('15000m'))

    console.log(printComponentValue(parseComponentValue('1k5')))
    console.log(printComponentValue(parseComponentValue('1.5k')))
    console.log(printComponentValue(parseComponentValue('1.5M')))
    console.log(printComponentValue(parseComponentValue('1.5897234M')))
    console.log(printComponentValue(parseComponentValue('1.5M5')))
    console.log(printComponentValue(parseComponentValue('15000.5')))
    console.log(printComponentValue(parseComponentValue('15000')))
    console.log(printComponentValue(parseComponentValue('15000m')))

    const five: Point[] = []
    for(let i=0; i<100; i+=10){
        five.push({
            x: i, y: 1000
        })
    }

    return (
        <div className="app">
            <div className="params">
                <table>
                    <th>
                        <td>Constants</td>
                    </th>
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
                </table>
                <table>
                    <th>
                        <td>Components</td>
                    </th>
                    <tr>
                        <td>R_gnd</td>
                        <td><input type="text"></input></td>
                    </tr>
                    <tr>
                        <td>R_f</td>
                        <td><input type="text"></input></td>
                    </tr>
                </table>
                <table>
                    <th>
                        <td>Voltages</td>
                    </th>
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
                </table>
                <table>
                    <th>
                        <td>Calculations</td>
                    </th>
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
