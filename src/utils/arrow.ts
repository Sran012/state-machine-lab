type circle = {
    x: number;
    y: number;
    radius: number;
}


export function getArrowPoints(from: circle, to: circle) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.sqrt(dy*dy + dx*dx);

    if(distance === 0) {
        return {
            startX: from.x,
            startY: from.y,
            endX: to.x,
            endY: to.y
        };
    }

    const ux = dx / distance;
    const uy = dy / distance;

    const startX = from.x + ux * from.radius;
    const startY = from.y + uy * from.radius;

    const endX = to.x - ux * to.radius;
    const endY = to.y - uy * to.radius;

    return { startX, startY, endX, endY };

}