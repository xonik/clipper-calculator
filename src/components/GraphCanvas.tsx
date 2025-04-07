import React from 'react';
import './GraphCanvas.css';
import { Point } from "../logic/graphCalculator";


interface Props {
    x: number,
    y: number,
    height: number,
    width: number,
    points: Point[][]
}

function getMax(points: Point[], prop: 'x' | 'y') {
    let max = -1
    points.forEach((point) => {
        if (point[prop] > max) {
            max = point[prop]
        }
    })
    return max
}

const Line = ({ p1, p2 }: { p1: Point, p2: Point }) => <line
    x1={p1.x} y1={p1.y}
    x2={p2.x} y2={p2.y}
    className={'graph-line'}
/>

const GraphCanvas = React.forwardRef<SVGRectElement, Props>(({ x, y, height, width, points }, ref) => {

    const maxX = getMax(points[0], 'x')
    const maxY = getMax(points[0], 'y')

    const paddingLeft = 0.2
    const paddingRight = 0.1
    const paddingTop = 0.1
    const paddingBottom = 0.2

    const graphScaleX = (width - (paddingLeft + paddingRight)) / width
    const graphScaleY = (height - (paddingBottom + paddingTop)) / height

    const scale = (point: Point) => ({
        x: point.x * graphScaleX + paddingLeft,
        y: point.y * graphScaleY + paddingTop
    })

    const normalizedPoints = points
        .map((series: Point[]) => series
            .map((point) => ({
                x: point.x / maxX,
                y: 1 - (point.y / maxY),
            }))
            .map(scale)
        )

    const scaledPoints = normalizedPoints[0]

    const lineSegments = []
    for (let i = 1; i < scaledPoints.length; i++) {
        lineSegments.push({
            x1: scaledPoints[i - 1].x,
            x2: scaledPoints[i].x,
            y1: scaledPoints[i - 1].y,
            y2: scaledPoints[i].y
        })
    }

    const xAxis = [{ x: 0, y: 1 }, { x: 1, y: 1 }].map(scale)
    const yAxis = [{ x: 0, y: 0 }, { x: 0, y: 1 }].map(scale)

    return <>
        <div>
            <svg viewBox={`-0 0 1 1`} preserveAspectRatio="none" className="graph-canvas__svg">
                <>
                    <rect
                        ref={ref}
                        x={x}
                        y={y}
                        height={height}
                        width={width}
                        className="graph-canvas"
                    />
                    <Line p1={xAxis[0]} p2={xAxis[1]}/>
                    <Line p1={yAxis[0]} p2={yAxis[1]}/>

                    {lineSegments.map(({ x1, x2, y1, y2 }) => {
                        return <line
                            x1={x1} y1={y1}
                            x2={x2} y2={y2}
                            className={'graph-line'}
                        />
                    })}
                </>
            </svg>
        </div>
    </>
});


export default GraphCanvas;