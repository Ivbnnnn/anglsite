const wordProjection = (() => {
  function dot(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
    return sum;
  }

  function unit(vector) {
    const norm = Math.sqrt(dot(vector, vector));
    return norm > 1e-10 ? vector.map((value) => value / norm) : null;
  }

  function principalAxis(rows, previous) {
    // A fixed starting vector keeps the layout repeatable for the same collection.
    let seed = previous ? 2027 : 42;
    let axis = Float64Array.from(rows[0], () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296 - 0.5;
    });
    for (let step = 0; step < 60; step++) {
      // Apply the covariance operator without allocating a square matrix.
      const next = new Float64Array(axis.length);
      for (const row of rows) {
        const weight = dot(row, axis);
        for (let i = 0; i < axis.length; i++) next[i] += row[i] * weight;
      }
      if (previous) {
        const overlap = dot(next, previous);
        for (let i = 0; i < axis.length; i++) next[i] -= overlap * previous[i];
      }
      axis = unit(next);
      if (!axis) {
        if (step !== 0) return null;
        // The start can lie in the null space, or along the first component.
        // In that case start from the longest residual row.
        let best = 0;
        for (const row of rows) {
          const overlap = previous ? dot(row, previous) : 0;
          const residual = previous ? row.map((value, i) => value - overlap * previous[i]) : row;
          const length = dot(residual, residual);
          if (length > best) {
            best = length;
            axis = unit(residual);
          }
        }
        if (!axis) return null;
      }
    }
    // Fix the arbitrary sign using the largest loading.
    const pivot = axis.reduce((best, value, i) => Math.abs(value) > Math.abs(axis[best]) ? i : best, 0);
    return axis[pivot] < 0 ? axis.map((value) => -value) : axis;
  }

  function build(vectors) {
    if (!vectors.length) return [];
    const dimension = vectors[0].length;
    const rows = vectors.map((vector) => {
      if (!dimension || vector.length !== dimension || !vector.every(Number.isFinite)) {
        throw new Error('Invalid embedding dimensions');
      }
      const normalized = unit(vector);
      if (!normalized) throw new Error('Empty embedding');
      return normalized;
    });
    const mean = new Float64Array(dimension);
    for (const row of rows) {
      for (let i = 0; i < dimension; i++) mean[i] += row[i] / rows.length;
    }
    const centered = rows.map((row) => Float64Array.from(row, (value, i) => value - mean[i]));
    const xAxis = principalAxis(centered);
    const yAxis = xAxis ? principalAxis(centered, xAxis) : null;
    return centered.map((row, index) => ({
      x: xAxis ? dot(row, xAxis) : 0,
      y: yAxis ? dot(row, yAxis) : 0,
      // Neighbours are computed in the original vector space, before projection.
      neighbors: rows.map((other, i) => ({ i, similarity: dot(rows[index], other) }))
        .filter(({ i }) => i !== index)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 3)
        .map(({ i }) => i),
    }));
  }

  return { build };
})();
