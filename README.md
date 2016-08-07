## Learning from design patterns from modern frontend frameworks

### Introduction

> A design pattern is the re-usable form of a solution to a design problem. The idea was introduced by the architect Christopher Alexander[1] and has been adapted for various other disciplines, most notably "computer science".[2]

> https://en.wikipedia.org/wiki/Design_pattern

### Software design pattern

> In software engineering, a software design pattern is a general reusable solution to a commonly occurring problem within a given context in software design. It is not a finished design that can be transformed directly into source or machine code. It is a description or template for how to solve a problem that can be used in many different situations. Design patterns are formalized best practices that the programmer can use to solve common problems when designing an application or system.

> https://en.wikipedia.org/wiki/Software_design_pattern

[Design Patterns: Elements of Reusable Object-Oriented Software](https://img3.doubanio.com/lpic/s1074361.jpg)

### What is a pattern

* Patterns are proven solutions.
* Patterns can be easily reused.
* Patterns can be expressive.

### We Already Use Patterns Every Day

_Facade_ pattern in jQuery

`$el.css(), $el.animate()`

### Prior art - MVC

> Model–view–controller (MVC) is a software architectural pattern for implementing user interfaces on computers. It divides a given software application into three interconnected parts, so as to separate internal representations of information from the ways that information is presented to or accepted from the user.[1][2]

https://developer.chrome.com/static/images/mvc.png
https://developer.chrome.com/apps/app_frameworks

### Post MVC era - MV*

MVP/MVVM

[MVC Versus MVP Versus MVVM](https://www.safaribooksonline.com/library/view/learning-javascript-design/9781449334840/ch10s09.html)

### Design patterns popular in the current frontend framework world

#### View is a presentation of a state.

```
View = Fn(State)
```

In React

```js
var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(<HelloMessage name="John" />, mountNode);
```

Stateless Functions in React

```js
const HelloMessage = (props) => <div>Hello {props.name}</div>;
ReactDOM.render(<HelloMessage name="Sebastian" />, mountNode);
```

In [yo-yo](https://github.com/maxogden/yo-yo)

```js
var yo = require('yo-yo')

var element = yo`<h1>hello world!</h1>`
document.body.appendChild(element)
```

In [Elm](http://elm-lang.org/)

```elm
import Html exposing (button, text)
import Html.App exposing (beginnerProgram)
import Html.Events exposing (onClick)

main =
  beginnerProgram { model = "打招呼", view = view, update = update }

view model =
  button [ onClick SayHello ] [ text model ]

type Msg = SayHello

update msg model =
  case msg of
    SayHello ->
      "你好"

```

#### Flux, unidirectional data flow

* [Flux](https://facebook.github.io/flux/)
* [Redux](https://facebook.github.io/flux/)
* [The Elm Architecture](http://guide.elm-lang.org/architecture/)
* [mobx](https://github.com/mobxjs/mobx)
* [send-action](https://github.com/mobxjs/mobx)
* [choo](https://github.com/yoshuawuyts/choo)
