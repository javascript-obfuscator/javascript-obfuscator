function test() {
    return (this.foo = {props: 1})['state'] = {
            expanded: this.foo.props
        },
        this.foo.state.expanded;
}