import React, { useEffect, useRef } from 'react';

class Canvas {
    constructor(canvas, width, height, id, blockn, imageArray, indexArray, heightArray, callback) {
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
                let x = event.offsetX * (canvas.width / bbox.width);
                let y = event.offsetY * (canvas.height / bbox.height);
                this.setCorner(x, y);
                this.clicktimes++;
                if (this.clicktimes === 4) {
                    callback(this.corner)
                }
            }
        });
        this.blockn = blockn;
        this.imageArray = imageArray;
        this.indexArray = indexArray;
        this.heightArray = heightArray;
        //document.body.appendChild(this.canvas);

        this.corner = [];

    }

    state = {
        corner: this.corner,
    }

    startCalibrate() {
        this.clicktimes = 0;
    }

    setCorner(x, y) {
        if (this.corner.length === 4) {
            this.reset();
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
        console.log("Set Corner");
        // let alphabet = ['A', 'B', 'C', 'D'];
        // ctx.fillText(alphabet[this.corner.length], x+4, y+4)
        this.corner.push([x, y]);
        if (this.corner.length === 4) {
            this.checkQuadrangle();
        }
    }

    drawCorner() {
        let ctx = this.canvas.getContext('2d');
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        for (let i = 0; i < this.corner.length; i++) {
            let x = this.corner[i][0];
            let y = this.corner[i][1];
            ctx.beginPath();
            ctx.moveTo(x - 4, y);
            ctx.lineTo(x + 4, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y - 4);
            ctx.lineTo(x, y + 4);
            ctx.stroke();
        }
    }

    checkQuadrangle() {
        let temp = [];
        for (let i = 0; i < this.corner.length; i++) {
            if (temp.length && this.corner[i][0] + this.corner[i][1] < temp[0][0] + temp[0][1]) temp.unshift(this.corner[i]);
            else temp.push(this.corner[i]);
        }
        this.corner = temp;
        const v = (p1, p2) => { return [p2[0] - p1[0], p2[1] - p1[1]] };
        const cp = (v1, v2) => { return (v1[0] * v2[1]) - (v1[1] * v2[0]) };
        let A = [...this.corner[0]],
            B = [...this.corner[1]],
            C = [...this.corner[2]],
            D = [...this.corner[3]];
        if (cp(v(A, B), v(A, C)) === 0) this.reset();
        if (cp(v(A, B), v(A, D)) === 0) this.reset();
        if (cp(v(A, C), v(A, D)) === 0) this.reset();
        if (cp(v(B, C), v(B, D)) === 0) this.reset();

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
                this.reset();
            }
            else if (cp(v(B, D), v(B, C)) > 0) {
                // console.log(2);
                this.reset();
            }
            else {
                // console.log(3);
                this.corner = [A, D, B, C];
                this.drawBroder();
            }
        }
        else if (cp(v(A, D), v(A, C)) < 0) {
            if (cp(v(C, D), v(C, B)) < 0) {
                // console.log(4);
                this.reset();
            }
            else {
                // console.log(5);
                this.corner = [A, B, C, D];
                this.drawBroder();
            }
        }
        else if (cp(v(B, D), v(B, C)) < 0) {
            // console.log(6);
            this.reset();
        }
        else {
            // console.log(7);
            this.corner = [A, B, D, C];
            this.drawBroder();
        }

    }

    drawBroder() {
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
        this.drawGrid();
    }

    reset() {
        // console.log('Reset');
        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.corner = [];
    }

    refresh() {
        if (this.corner.length !== 4) return;
        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawCorner();
        this.drawBroder();
        this.drawGrid();
        this.drawLogo();
    }

    getPos(i, j) {
        let A = [...this.corner[0]],
            B = [...this.corner[1]],
            C = [...this.corner[2]],
            D = [...this.corner[3]];
        const v = (p1, p2) => { return [p2[0] - p1[0], p2[1] - p1[1]] };
        const mul = (p, l) => { return [p[0] * l, p[1] * l] };
        const add = (p1, p2) => { return [p1[0] + p2[0], p1[1] + p2[1]] };
        let hs = add(A, mul(v(A, D), i / this.blockn));
        let he = add(B, mul(v(B, C), i / this.blockn));
        let co = add(hs, mul(v(hs, he), j / this.blockn));
        return co;
    }

    drawGrid() {
        let ctx = this.canvas.getContext('2d');
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'blue';
        for (let i = 1; i < this.blockn; i++) {
            // Horizontal
            let start = this.getPos(i, 0);
            let end = this.getPos(i, 8);
            ctx.moveTo(start[0], start[1]);
            ctx.lineTo(end[0], end[1]);
            ctx.stroke();
        }
        for (let i = 1; i < this.blockn; i++) {
            // Vertical
            let start = this.getPos(0, i);
            let end = this.getPos(this.blockn, i);
            ctx.moveTo(start[0], start[1]);
            ctx.lineTo(end[0], end[1]);
            ctx.stroke();
        }
        this.drawLogo();
    }

    drawLogo() {
        let A = [...this.corner[0]],
            B = [...this.corner[1]],
            C = [...this.corner[2]],
            D = [...this.corner[3]];
        const v = (p1, p2) => { return [p2[0] - p1[0], p2[1] - p1[1]] };
        let ctx = this.canvas.getContext('2d');
        let a, width, height;

        for (let i = 0; i < this.blockn; i++) {
           width = parseInt(((this.blockn - i) * Math.abs(v(A, B)[0]) + i * Math.abs(v(D, C)[0])) / this.blockn / this.blockn);
            for (let j = 0; j < this.blockn; j++) {
                let index = i * this.blockn + j
                let coord = this.getPos(i+0.5, j+0.5);
                height = parseInt(((this.blockn - j) * Math.abs(v(A, D)[1]) + j * Math.abs(v(B, C)[1])) / this.blockn / this.blockn);
                a = Math.min(width, height) * 0.75;
                ctx.globalCompositeOperation = "destination-over";
                let imgIndex = this.indexArray[index];
                if (imgIndex !== -1)
                    ctx.drawImage(this.imageArray[imgIndex], coord[0] - a / 2, coord[1] - a / 2, a, a);
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
                ctx.fillStyle = 'red';
                let bar = Math.max(this.heightArray[index] - 4, 0);
                for (let k=0; k<bar; k++) {
                    ctx.moveTo(this.getPos(i, j+0.25*k)[0], this.getPos(i, j+0.25*k)[1]);
                    ctx.lineTo(this.getPos(i+0.2, j+0.25*k)[0], this.getPos(i+0.2, j+0.25*k)[1]);
                    ctx.lineTo(this.getPos(i+0.2, j+0.25*(k+1))[0], this.getPos(i+0.2, j+0.25*(k+1))[1]);
                    ctx.lineTo(this.getPos(i, j+0.25*(k+1))[0], this.getPos(i, j+0.25*(k+1))[1]);
                    ctx.fill();
                    ctx.stroke();
                }
                ctx.fillStyle = 'green';
                bar = Math.min(this.heightArray[index], 4);
                for (let k=0; k<bar; k++) {
                    ctx.moveTo(this.getPos(i+1, j+0.25*k)[0], this.getPos(i+1, j+0.25*k)[1]);
                    ctx.lineTo(this.getPos(i+0.8, j+0.25*k)[0], this.getPos(i+0.8, j+0.25*k)[1]);
                    ctx.lineTo(this.getPos(i+0.8, j+0.25*(k+1))[0], this.getPos(i+0.8, j+0.25*(k+1))[1]);
                    ctx.lineTo(this.getPos(i+1, j+0.25*(k+1))[0], this.getPos(i+1, j+0.25*(k+1))[1]);
                    ctx.fill();
                    ctx.stroke();
                }
            }
        }
    }
}

const GridCanvas = ({ calibrating, finishCalibrateCallback, mines, chunks , homePosition1, playerPosition1, homePosition2, playerPosition2 }) => {
    const canvasRef = useRef(null);
    
    let num = 8;
    let width = 600;
    let imageArray = [];
    let loadNum = 0;
    let srcArray = ["assets/iron_ingot.png", "assets/gold_ingot.png", "assets/diamond.png", "assets/steve.png", "assets/alex.png", "assets/red_bed.png", "assets/blue_bed.png"];
    let imageNum = srcArray.length;

    const indexArrayRef = useRef([...Array(num * num)].map(() => -1));
    const heightArrayRef = useRef([...Array(num * num)].map(() => 0));

    const gridCanvas = useRef(null);
    const tmpload = () => {
        loadNum += 1;
        if (loadNum === imageNum) {
            gridCanvas.current = new Canvas(
                canvasRef.current,
                width, width * 0.75, 'c1',
                num,
                imageArray,
                [...Array(num * num)].map(() => -1),
                [...Array(num * num)].map(() => 0),
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
            if (gridCanvas.current) {
                let indexArray = indexArrayRef.current;
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

                indexArray[parseInt(homePosition1.y) * num + parseInt(homePosition1.x)] = 5;
                indexArray[parseInt(homePosition2.y) * num + parseInt(homePosition2.x)] = 6;
                indexArray[parseInt(playerPosition1.y) * num + parseInt(playerPosition1.x)] = 3;
                indexArray[parseInt(playerPosition2.y) * num + parseInt(playerPosition2.x)] = 4;

                if (!(indexArrayRef.current.every((v, i) => v === gridCanvas.current.indexArray[i]))) {
                    gridCanvas.current.refresh();
                    indexArrayRef.current.forEach((v, i) => gridCanvas.current.indexArray[i] = v);
                }
            }
        },
        [mines]
    );
    useEffect(
        () => {
            if (gridCanvas.current) {
                let heightArray = heightArrayRef.current;
                chunks.forEach(chunk => {
                    heightArray[chunk.position.y * num + chunk.position.x] = chunk.height;
                    // heightArray[chunk.position.y * num + chunk.position.x] = parseInt(Math.random()*8);
                });
                if (!(heightArrayRef.current.every((v, i) => v === gridCanvas.current.heightArray[i]))) {
                    gridCanvas.current.refresh();
                    heightArrayRef.current.forEach((v, i) => gridCanvas.current.heightArray[i] = v);
                }
            }
        },
        [chunks]
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
        <canvas ref={canvasRef} className='grid-canvas' />
    )
}

export default GridCanvas;