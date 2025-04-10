import { Point } from "./types";

export const a = 'get out of here!'
const { exp } = Math;

/*
               ,------|<------,
               |              |
   ,--[ Rg ] --+----[ Rf ]----+
   |           |   ,______    |
  ---          `---| neg  \   |
                   |       \---+-- Output
        Input -----| pos   /
                   |______/

Yes, That's supposed to be an op amp. I am not entirely sure about
the orientation of the diode but I think this would be correct.

 */

// circuit parameters
// Ground resistor
const Rg = 1000
const Rf = 10000
const I0 = 2 / 1000000000
const Vt = 25/1000
const n = 1

// intermediate
const g = (1+Rf/Rg)
const T = Vt * n;
const k = Rf * I0;

function solveForX(y: number, tol = 1e-6, maxIter = 100) {

    let x = y / g; // Initial guess

    for (let i = 0; i < maxIter; i++) {
        let f_x = g * x - k * exp((y - x) / T) - y;
        let df_x = g + (k / T) * exp((y - x) / T); // Derivative

        let x_new = x - f_x / df_x;

        if (Math.abs(x_new - x) < tol) {
            return x_new;
        }
        x = x_new;
    }
    console.log(`Solution did not converge for y=${y}`);
    return 0
}

function testForXY(x: number, y: number) {
    return g*x - k * Math.exp((y-x)/T)
}

function generateList(v1: number, v2: number, interval: number){
    const values: number[] = []
    let v= v1;
    while(v < v2) {
        values.push(v)
        v += interval;
    }
    values.push(v2)
    return values
}

export function solveDiodeClipperForYRange(y0: number, y1: number, interval: number) {
    const yValues = generateList(y0, y1, interval)

    const points = yValues.map((y) => ({
        x: solveForX(y),
        y,
    }))

    return points
}

export function solveOpAmpGainForX(points: Point[]) {

    const opAmpPoints = points.map(({x}) => ({
        x,
        y: x * g,
    }))

    return opAmpPoints
}

/*
let y_value = 0.2;

console.log(`Finding input voltage that will give an output of ${y_value}V:`)
const x_solution = solveForX(y_value)

console.log(`  input = ${x_solution}V`);
console.log(`  output test: ${y_value} = ${testForXY(x_solution, y_value)} (requested vs found)`)
console.log('\n')
console.log('Gains:')
console.log(`  Linear........: ${g}`)
console.log(`  For this input: ${(y_value/x_solution).toFixed(2)}`)
 */