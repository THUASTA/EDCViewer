import React, { useEffect, useRef } from 'react';

class Canvas {
    constructor(canvas, width, height, id, blockn, imageArray, indexArray, callback) {
        this.id = id;
        this.canvas = canvas;
        this.canvas.id = 'canvas_' + id;
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.border = 'solid';
        this.canvas.style.borderColor = 'Black';
        this.canvas.style.borderWidth = '1px';
        this.canvas.style.display = 'block';
        this.clicktimes = 4;
        this.callback = callback;
        this.canvas.addEventListener('click', event => {
            if (this.clicktimes < 4) {

                let bbox = canvas.getBoundingClientRect();
                // let x = event.clientX - bbox.left*(canvas.width/bbox.width);
                // let y = event.clientY - bbox.top*(canvas.height/bbox.height);
                let x = event.offsetX*(canvas.width/bbox.width);
                let y = event.offsetY*(canvas.height/bbox.height);
                this.draw_corner(x, y);
                this.clicktimes++;
                if (this.clicktimes === 4) {
                    callback(this.corner)
                }
            }
        });
        this.blockn = blockn;
        this.imageArray = imageArray;
        this.indexArray = indexArray;
        //document.body.appendChild(this.canvas);

        this.corner = [];

    }
    state = {
        corner: this.corner,
    }
    startCalibrate() {
        this.clicktimes = 0;
    }

    getIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
        let a = y1 - y2;
        let b = x2 - x1;
        let x = x2 * y1 - x1 * y2;
        let c = y3 - y4;
        let d = x4 - x3;
        let y = x4 * y3 - x3 * y4;
        return (this.solveEquation(a, b, c, d, x, y));
    }



    solveEquation(a, b, c, d, x, y) {
        let inv = (a * d - b * c);
        return ([(d * x - b * y) / inv, (a * y - c * x) / inv]);
    }


    draw_corner(x, y) {
        if (this.corner.length === 4) {
            this.reset_calibrate();
        }
        let ctx = this.canvas.getContext('2d');
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(x - 4, y);
        ctx.lineTo(x + 4, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y - 4);
        ctx.lineTo(x, y + 4);
        ctx.stroke();
        // let alphabet = ['A', 'B', 'C', 'D'];
        // ctx.fillText(alphabet[this.corner.length], x+4, y+4)
        this.corner.push([x, y]);
        if (this.corner.length === 4) {
            this.check_quadrangle();
        }
    }

    check_quadrangle() {
        let temp = [];
        for (let i = 0; i < this.corner.length; i++) {
            if (temp.length && this.corner[i][0] + this.corner[i][1] < temp[0][0] + temp[0][1]) temp.unshift(this.corner[i]);
            else temp.push(this.corner[i]);
        }
        this.corner = temp
        // 
        const v = (p1, p2) => { return [p2[0] - p1[0], p2[1] - p1[1]] };
        const cp = (v1, v2) => { return (v1[0] * v2[1]) - (v1[1] * v2[0]) };
        let A = [...this.corner[0]],
            B = [...this.corner[1]],
            C = [...this.corner[2]],
            D = [...this.corner[3]];
        if (cp(v(A, B), v(A, C)) === 0) this.reset_calibrate();
        if (cp(v(A, B), v(A, D)) === 0) this.reset_calibrate();
        if (cp(v(A, C), v(A, D)) === 0) this.reset_calibrate();
        if (cp(v(B, C), v(B, D)) === 0) this.reset_calibrate();

        if (cp(v(A, B), v(A, C)) < 0) {
            // console.log(0);
            this.corner = [A, C, B, D];
            A = [...this.corner[0]];
            B = [...this.corner[1]];
            C = [...this.corner[2]];
            D = [...this.corner[3]];
        }

        if (cp(v(A, D), v(A, B)) > 0) {
            if (cp(v(A, D), v(A, C)) < 0) {
                // console.log(1);
                this.reset_calibrate();
            }
            else if (cp(v(B, D), v(B, C)) > 0) {
                // console.log(2);
                this.reset_calibrate();
            }
            else {
                // console.log(3);
                this.corner = [A, D, B, C];
                this.draw_broder();
            }
        }
        else if (cp(v(A, D), v(A, C)) < 0) {
            if (cp(v(C, D), v(C, B)) < 0) {
                // console.log(4);
                this.reset_calibrate();
            }
            else {
                // console.log(5);
                this.corner = [A, B, C, D];
                this.draw_broder();
            }
        }
        else if (cp(v(B, D), v(B, C)) < 0) {
            // console.log(6);
            this.reset_calibrate();
        }
        else {
            // console.log(7);
            this.corner = [A, B, D, C];
            this.draw_broder();
        }

    }


    draw_broder() {
        // console.log('Draw');
        let ctx = this.canvas.getContext('2d');
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'blue';
        for (let i = 1; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(this.corner[i - 1][0], this.corner[i - 1][1]);
            ctx.lineTo(this.corner[i][0], this.corner[i][1]);
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.moveTo(this.corner[0][0], this.corner[0][1]);
        ctx.lineTo(this.corner[3][0], this.corner[3][1]);
        ctx.stroke();
        this.draw_grid();
    }

    reset_calibrate() {
        // console.log('Reset');
        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.corner = [];
    }

    draw_grid() {
        const v = (p1, p2) => { return [p2[0] - p1[0], p2[1] - p1[1]] };
        const mul = (p, l) => { return [p[0] * l, p[1] * l] };
        const add = (p1, p2) => { return [p1[0] + p2[0], p1[1] + p2[1]] };
        let A = [...this.corner[0]],
            B = [...this.corner[1]],
            C = [...this.corner[2]],
            D = [...this.corner[3]];
        let ctx = this.canvas.getContext('2d');
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'blue';
        for (let i = 1; i < this.blockn; i++) {
            let start = add(A, mul(v(A, D), i / this.blockn));
            let end = add(B, mul(v(B, C), i / this.blockn));
            ctx.moveTo(start[0], start[1]);
            ctx.lineTo(end[0], end[1]);
            ctx.stroke();
        }
        for (let i = 1; i < this.blockn; i++) {
            let start = add(A, mul(v(A, B), i / this.blockn));
            let end = add(D, mul(v(D, C), i / this.blockn));
            ctx.moveTo(start[0], start[1]);
            ctx.lineTo(end[0], end[1]);
            ctx.stroke();
        }
        this.draw_logo();
    }

    draw_logo() {
        const v = (p1, p2) => { return [p2[0] - p1[0], p2[1] - p1[1]] };
        const mul = (p, l) => { return [p[0] * l, p[1] * l] };
        const add = (p1, p2) => { return [p1[0] + p2[0], p1[1] + p2[1]] };
        let A = [...this.corner[0]],
            B = [...this.corner[1]],
            C = [...this.corner[2]],
            D = [...this.corner[3]];
        let ctx = this.canvas.getContext('2d');
        let hStart;
        let hEnd;
        let vStart;
        let vEnd;
        let coord;
        let a;
        let width;
        let height;

        for (let i = 0; i < this.blockn; i++) {
            hStart = add(A, mul(v(A, D), (i + 0.5) / this.blockn));
            hEnd = add(B, mul(v(B, C), (i + 0.5) / this.blockn));
            width = parseInt(((this.blockn - i) * Math.abs(v(A, B)[0]) + i * Math.abs(v(D, C)[0])) / this.blockn / this.blockn);
            for (let j = 0; j < this.blockn; j++) {
                vStart = add(A, mul(v(A, B), (j + 0.5) / this.blockn));
                vEnd = add(D, mul(v(D, C), (j + 0.5) / this.blockn));
                height = parseInt(((this.blockn - j) * Math.abs(v(A, D)[1]) + j * Math.abs(v(B, C)[1])) / this.blockn / this.blockn);
                coord = this.getIntersection(hStart[0], hStart[1], hEnd[0], hEnd[1], vStart[0], vStart[1], vEnd[0], vEnd[1]);
                a = Math.min(width, height) * 0.8;
                ctx.globalCompositeOperation = "destination-over";
                let index = this.indexArray[i * this.blockn + j];
                if (index !== -1)
                    ctx.drawImage(this.imageArray[index], coord[0] - a / 2, coord[1] - a / 2, a, a);
            }
        }
    }
}

const GridCanvas = ({ calibrating, finishCalibrateCallback, mines }) => {
    const canvasRef = useRef(null);

    let num = 8;
    let width = 800;
    let imageNum = 3;
    let imageArray = [];
    let loadNum = 0;
    let srcArray = ["assets/iron_ingot.png", "assets/gold_ingot.png", "assets/diamond.png"];

    const gridCanvas = useRef(null);
    const tmpload = () => {
        loadNum += 1;
        if (loadNum === imageNum) {
            gridCanvas.current = new Canvas(
                canvasRef.current,
                width, width*0.75, 'c1',
                num,
                imageArray, [...Array(num * num)].map(x => -1),
                finishCalibrateCallback
            );
        }
    }
    useEffect(
        () => {
            for (let i = 0; i < imageNum; i++) {
                let temp = new Image();
                temp.src = srcArray[i];
                temp.onload = tmpload;
                imageArray.push(temp);
            }
        }, []
    );
    useEffect(
        () => {
            //for (let i = 0; i < 81; i++) {
            //    indexArray.push(i % 3)
            //}
            if (gridCanvas.current) {
                let indexArray = gridCanvas.current.indexArray;
                indexArray.fill(-1);
                mines.forEach(mine => {
                    let x = parseInt(mine.position.x);
                    let y = parseInt(mine.position.y);
                    if (mine.oreType === 1)
                        indexArray[y * num + x] = 0;
                    else if (mine.oreType === 0)
                        indexArray[y * num + x] = 1;
                    else if (mine.oreType === 2)
                        indexArray[y * num + x] = 2;
                });
            }
        },
        [mines]
    );

    useEffect(
        () => {
            if (calibrating) {
                gridCanvas.current.startCalibrate();
            }
        }
        , [calibrating]
    );

    return (
        <canvas ref={canvasRef} className='grid-canvas'/>
    )
}

export default GridCanvas;