# Contributing to JavaScript Obfuscator

## Setup

1 Clone your fork of the repository
```
$ git clone https://github.com/YOUR_USERNAME/javascript-obfuscator.git
```

2 Install npm dependencies
```
$ yarn
```

3 Run Dev process
```
$ yarn run watch
```

4 Run Build process
```
$ yarn run build
```

## Guidelines

- Please try to [combine multiple commits before pushing](http://stackoverflow.com/questions/6934752/combining-multiple-commits-before-pushing-in-git)

- Please use `TDD` when fixing bugs. This means that you should write a unit test that fails because it reproduces the issue, 
then fix the issue and finally run the test to ensure that the issue has been resolved. This helps us prevent fixed bugs from 
happening again in the future

- Please keep the test coverage at 95+%. Write additional unit tests if necessary

- Please keep code style consistent

- Please create an issue before sending a PR if it is going to change the public interface of JavaScript Obfuscator or includes significant architecture changes

