function test() {
    var foo;
    return (foo = {props: 1})['state'] = {
            expanded: foo.props
        },
        foo.state.expanded;
}