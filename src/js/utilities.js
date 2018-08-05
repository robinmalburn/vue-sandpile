export const coordToPixel = (x, y, width) => x + (y * width);

export const pixelToCoord = (pixel, width) => {
    return {
        x: pixel % width,
        y: Math.floor(pixel / width)
    }
};
