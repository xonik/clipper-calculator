import React, { useState } from 'react';
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

    const [I0, setI0] = useState(printComponentValue(2 / 1000000000))
    const [Vt, setVt] = useState(printComponentValue(25/1000))
    const [n, setN] = useState(printComponentValue(1.9))

    const [Rg, setRg] = useState('1k')
    const [Rf, setRf] = useState('10k')


    const solverParams = {
        I0: parseComponentValue(I0),
        Vt: parseComponentValue(Vt),
        n: parseComponentValue(n),
        Rg: parseComponentValue(Rg),
        Rf: parseComponentValue(Rf),
    }

    const points = solveDiodeClipperForYRange(0, 0.6, 0.02, solverParams)
    const points1 = solveDiodeClipperForXRange(0, 0.11, 0.01, solverParams)

    findResistorDividerCombo(10000, 100000, 0.21, 'E12')
    findNonInvertingGainCombo(500, 100000, 0.2, 'E12')

    //const opampPoints = solveOpAmpGainForX(points)
    //console.log(opampPoints)

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
                        <td><input type="text" value={I0} onChange={(event) => setI0(event.target.value)}></input></td>
                    </tr>
                    <tr>
                        <td>V_t</td>
                        <td><input type="text" value={Vt} onChange={(event) => setVt(event.target.value)}></input></td>
                    </tr>
                    <tr>
                        <td>n</td>
                        <td><input type="text" value={n} onChange={(event) => setN(event.target.value)}></input></td>
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
                        <td><input type="text" value={Rg} onChange={(event) => setRg(event.target.value)}></input></td>
                    </tr>
                    <tr>
                        <td>R_f</td>
                        <td><input type="text" value={Rf} onChange={(event) => setRf(event.target.value)}></input></td>
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
