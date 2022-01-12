/**
 * Calculate the distance between the two points
 * @param {[number, number]} p1 First point's x and y position
 * @param {[number, number]} p2 Second point's x and y position
 * @returns number The distance between the two points
 */
export const distance = (p1, p2) => {
  const a = p1[0] - p2[0];
  const b = p1[1] - p2[1];
  return Math.sqrt(a * a + b * b);
};

/**
 * Linear interpolation of a Bézier curve.
 * Supports linear, quadratic and cubic Bézier curves.
 * @param {number} t Lerp value
 * @param  {{ x: number, y: number }[]} p Points with x and y coordinates
 */
export const lerp = (t, ...p) => {
  if (p.length < 2 || p.length > 4) {
    throw new Error('Expected 2, 3, or 4 points as input.');
  }

  switch (p.length) {
    // Linear
    case 2:
      return [(1 - t) * p[0][0] + t * p[1][0], (1 - t) * p[0][1] + t * p[1][1]];

    // Quadratic
    case 3:
      return [
        (1 - t) ** 2 * p[0][0] + 2 * t * (1 - t) * p[1][0] + t ** 2 * p[2][0],
        (1 - t) ** 2 * p[0][1] + 2 * t * (1 - t) * p[1][1] + t ** 2 * p[2][1],
      ];

    // Cubic
    case 4:
      return [
        (1 - t) ** 3 * p[0][0] +
          3 * t * (1 - t) ** 2 * p[1][0] +
          3 * t ** 2 * (1 - t) * p[2][0] +
          t ** 3 * p[3][0],
        (1 - t) ** 3 * p[0][1] +
          3 * t * (1 - t) ** 2 * p[1][1] +
          3 * t ** 2 * (1 - t) * p[2][1] +
          t ** 3 * p[3][1],
      ];
  }
};

/**
 * Generate points from a Bézier curve.
 * Assuming a quadratic curve as input.
 * @param {number[]} path The Bézier anchor and control points (quadratic).
 * @param {number} steps The number of points to lerp between each anchor point.
 */
export const bezierToPoints = (path, steps) => {
  // Group [p0, p1, p2, p3, p4] as [[p0, p1, p2], [p2, p3, p4]]
  const subPaths = path.reduce((groups, point, i) => {
    if (i % 2 === 0) {
      // Last point of previous group
      if (i !== 0) {
        groups[groups.length - 1].push(point);
      }

      // First point of next group
      if (i !== path.length - 1) {
        groups.push([point]);
      }
    } else {
      // Middle point
      groups[groups.length - 1].push(point);
    }

    return groups;
  }, []);

  // Lerp each subpath and join
  return subPaths.flatMap((group) =>
    [...new Array(steps - 1)].map((_, j) => lerp((j + 1) / steps, ...group))
  );
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
