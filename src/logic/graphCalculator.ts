import { Point } from "./types";

export function calculatePoints(numberOfPoints: number) {
    const points: Point[] = []
    for(let i=0; i<numberOfPoints; i+=10){
        points.push({
            x: i, y: i*i
        })
    }
    return points
}