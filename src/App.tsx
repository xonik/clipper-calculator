import React from 'react';
import './App.css';
import { LineChart } from "@mui/x-charts";
import { solveDiodeClipperForXRange, solveDiodeClipperForYRange, solveOpAmpGainForX } from "./logic/diodeClipperSolver";
import { Point } from "./logic/types";
import { findResistorDividerCombo, resistorSeries } from "./logic/resistorCalculator";

function App() {

    //const points = calculatePoints(100)

    const points = solveDiodeClipperForYRange(0, 0.6, 0.02)
    const points1 = solveDiodeClipperForXRange(0, 0.11, 0.01)

    findResistorDividerCombo(10000, 100000, 0.21, 'E96')

    const opampPoints = solveOpAmpGainForX(points)
    console.log(opampPoints)

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
