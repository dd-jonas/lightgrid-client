const distance = (p1, p2) => {
    const a = p1[0] - p2[0];
    const b = p1[1] - p2[1];
    return Math.sqrt(a*a + b*b);
}

export default distance;
