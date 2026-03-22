function compErr(ys) {
    let min = Infinity;

    function aux(y) {
        if (y < min) min = y;
    }

    return (aux(ys), { min });
}
