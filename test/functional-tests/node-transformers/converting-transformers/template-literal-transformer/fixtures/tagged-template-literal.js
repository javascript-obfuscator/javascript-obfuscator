function tag(strings) {
    console.log(strings.raw[0]);
}

tag`foo ${1 + 1} bar`;