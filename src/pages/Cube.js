import React, {useEffect, useRef} from 'react';

function Cube(){
    const output = useRef(null)

    let A = 0, B = 0, C = 0;

    let cubeWidth = 20;
    const width = 160, height = 44;
    let buffer = [];
    let zBuffer = [];
    for (let i = 0; i < width * height; i++){
        buffer[i] = ' ';
        zBuffer[i] = 0;
    }

    const backgroundASCIICode = ' ';
    let distanceFromCam = 100;
    let horizontalOffset;
    let K1 = 40;

    let incrementSpeed = 0.6;

    let x, y, z;
    let ooz;
    let xp, yp;
    let idx;

    function calculateX(i, j, k) {
        return j * Math.sin(A) * Math.sin(B) * Math.cos(C) - k * Math.cos(A) * Math.sin(B) * Math.cos(C) +
            j * Math.cos(A) * Math.sin(C) + k * Math.sin(A) * Math.sin(C) + i * Math.cos(B) * Math.cos(C);
    }

    function calculateY(i, j, k) {
        return j * Math.cos(A) * Math.cos(C) + k * Math.sin(A) * Math.cos(C) -
            j * Math.sin(A) * Math.sin(B) * Math.sin(C) + k * Math.cos(A) * Math.sin(B) * Math.sin(C) -
            i * Math.cos(B) * Math.sin(C);
    }

    function calculateZ(i, j, k) {
        return k * Math.cos(A) * Math.cos(B) - j * Math.sin(A) * Math.cos(B) + i * Math.sin(B);
    }

    function calculateForSurface(cubeX, cubeY, cubeZ, ch) {
        x = calculateX(cubeX, cubeY, cubeZ);
        y = calculateY(cubeX, cubeY, cubeZ);
        z = calculateZ(cubeX, cubeY, cubeZ) + distanceFromCam;

        ooz = 1 / z;

        xp = (width / 2 + horizontalOffset + K1 * ooz * x * 2);
        yp = (height / 2 + K1 * ooz * y);

        idx = Math.floor(xp) + Math.floor(yp) * width;
        if (idx >= 0 && idx < width * height) {
            if (ooz > zBuffer[idx]) {
                zBuffer[idx] = ooz;
                buffer[idx] = ch;
            }
        }
    }

    function putchar(char) {
        output.textContent += char;
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function getCube() {
        output.textContent = ''; // Clear the previous output
        for (let i = 0; i < width * height; i++){
            buffer[i] = backgroundASCIICode;
            zBuffer[i] = 0;
        }
        cubeWidth = 10;
        horizontalOffset = cubeWidth;

        for (let cubeX = -cubeWidth; cubeX < cubeWidth; cubeX += incrementSpeed) {
            for (let cubeY = -cubeWidth; cubeY < cubeWidth; cubeY += incrementSpeed) {
                calculateForSurface(cubeX, cubeY, -cubeWidth, '@');
                calculateForSurface(cubeWidth, cubeY, cubeX, '$');
                calculateForSurface(-cubeWidth, cubeY, -cubeX, '~');
                calculateForSurface(-cubeX, cubeY, cubeWidth, '#');
                calculateForSurface(cubeX, -cubeWidth, -cubeY, ';');
                calculateForSurface(cubeX, cubeWidth, cubeY, '+');
            }
        }
        for (let k = 0; k < width * height; k++) {
            putchar(k % width ? buffer[k] : '\n');
        }

        A += 0.05;
        B += 0.05;
        C += 0.01;

        // Delay for 16 milliseconds (equivalent to ~60 frames per second)
        await delay(16);

        getCube();

    }

    useEffect(() => {
        getCube();
    }, []);

    return(
        <pre ref={output}></pre>
    )
}

export default Cube;