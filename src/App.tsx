import React from 'react';
import logo from './logo.svg';
import './App.css';
import GraphCanvas from "./components/GraphCanvas";
import { calculatePoints, Point } from "./logic/graphCalculator";
import { LineChart } from "@mui/x-charts";

function App() {

    const points = calculatePoints(100)

    const five: Point[] = []
    for(let i=0; i<100; i++){
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
                        },
                        {
                            data: five.map((point) => point.y),
                            area: false,
                            showMark: false,
                        },
                    ]}
                    width={1000}
                    height={1000}
                />
            </div>
        </div>
    );
}

export default App;
