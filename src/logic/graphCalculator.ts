export type Point = {x: number, y: number}
export function calculatePoints(numberOfPoints: number) {
    const points: Point[] = []
    for(let i=0; i<numberOfPoints; i++){
        points.push({
            x: i, y: i*i
        })
    }
    return points
}