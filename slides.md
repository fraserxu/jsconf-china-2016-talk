class: center, middle

# Learning design patterns from modern frontend frameworks

---
class: center, middle

## Fraser Xu @fraserxu

### Front End Develoepr at [Envato](https://envato.com)

.logo[![envato](images/envato_logo.svg.png)]

---

## Introduction

> A design pattern is the re-usable form of a solution to a design problem. The idea was introduced by the architect Christopher Alexander[1] and has been adapted for various other disciplines, most notably "computer science".[2]

> https://en.wikipedia.org/wiki/Design_pattern

---

## Software design pattern

> In software engineering, a software design pattern is a general reusable solution to a commonly occurring problem within a given context in software design. It is not a finished design that can be transformed directly into source or machine code. It is a description or template for how to solve a problem that can be used in many different situations. Design patterns are formalized best practices that the programmer can use to solve common problems when designing an application or system.

> https://en.wikipedia.org/wiki/Software_design_pattern

---
class: center

![Design Patterns: Elements of Reusable Object-Oriented Software](https://img3.doubanio.com/lpic/s1074361.jpg)

---


## What is a pattern

* Patterns are proven solutions.
* Patterns can be easily reused.
* Patterns can be expressive.

---
class: center

## We Already Use Patterns Every Day

`$el.css(), $el.animate()`

---
class: center

## Prior art - MVC

> Model–view–controller (MVC) is a software architectural pattern for implementing user interfaces on computers. It divides a given software application into three interconnected parts, so as to separate internal representations of information from the ways that information is presented to or accepted from the user.[1][2]

![mvc](https://developer.chrome.com/static/images/mvc.png)

* [MVC Architecture](https://developer.chrome.com/apps/app_frameworks)

---
class: center

## Post MVC era - MV*

MVP/MVVM

[MVC Versus MVP Versus MVVM](https://www.safaribooksonline.com/library/view/learning-javascript-design/9781449334840/ch10s09.html)

---

### Design patterns popular in the current frontend framework world

* Functional programming
* Declarative and functional view rendering
* Unidirectional data flow
* Immutable data structure
* Type system

---

## Functional programming

* Good for unit test
* No side effect
* Pure functions without any side effect
* High order function

---

### Pure function

> A pure function is a function where the return value is only determined by its input values, without observable side effects. This is how functions in math work: Math.cos(x) will, for the same value of x , always return the same result. Computing it does not change x

---

### Not pure function

```JavaScript
const name = 'jsconf china'
function greeting () {
  // bad things could happen
  console.log('Welcome to ', name)
}

// if name updates, the function return different result
greeting()
```

**Hard to test.**

---

### Pure function

```JavaScript
const name = 'jsconf china'
function greeting (name) {
  console.log('Welcome to ', name)
}

// alwasy return the same result
greeting(name)
```

**Easy to test.**

---

### Test pure function

```JavaScript
function greeting (name) {
  return 'Welcome to ' + name
}

const test = require('tape')
test('greeting function', function (assert) {
  const expect = greeting('jsconf china')
  const actual = 'Welcome to jsconf china'

  assert.equal(expect, actual, 'should greeting to me.')
  assert.end()
})
```

---

### High order function

```JavaScript
function year (year) {
  // return a new function
  return function city (city) {
    console.log(`Welcome to ${year} JSConf China in ${city}.`)
  }
}

// time is a function
const time = year(2016)
// we can call time function
time('Nanjing')

year(2016)('Nanjing')

// 'Welcome to 2016 JSConf China in Nanjing.'
```

---

### Declarative and functional view rendering

Declarative rendering, view is a presentation of a state.

```elm
Fn: State -> DOM
View = Fn State
```

* Good for unit test
* No side effect(setState)
* Stateless/pure component
* High order component

---

### In [React](https://facebook.github.io/react/)

```JavaScript
var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(<HelloMessage name="John" />, mountNode);
```

**Stateless Functions in React**

```js
const HelloMessage = (props) => <div>Hello {props.name}</div>;
ReactDOM.render(<HelloMessage name="Sebastian" />, mountNode);
```

---

### In [yo-yo](https://github.com/maxogden/yo-yo)

```js
var yo = require('yo-yo')

var element = yo`<h1>hello world!</h1>`
document.body.appendChild(element)
```

---

### In [Elm](http://elm-lang.org/)

```elm
import Html exposing (span, text)
import Html.Attributes exposing (class)


main =
  span [class "welcome-message"] [text "Hello, NingJS!"]
```

---
class:center, middle

### Component based View is nice, but how do we manage data flow?

![component tree](https://cdn.css-tricks.com/wp-content/uploads/2016/03/redux-article-3-01.svg)

<small>Image from [Leveling Up with React: Redux](https://css-tricks.com/learning-react-redux/)</small>
---

### Unidirectional data flow

> Data down, actions up.

* [Flux](https://facebook.github.io/flux/)
* [Redux](https://facebook.github.io/flux/)
* [The Elm Architecture](http://guide.elm-lang.org/architecture/)
* [mobx](https://github.com/mobxjs/mobx)
* [send-action](https://github.com/mobxjs/mobx)
* [choo](https://github.com/yoshuawuyts/choo)

---

### With [Redux](http://redux.js.org/)

![redux flow](https://cdn.css-tricks.com/wp-content/uploads/2016/03/redux-article-3-03.svg)

<small>Image from [Leveling Up with React: Redux](https://css-tricks.com/learning-react-redux/)</small>

---

![redux flow](https://camo.githubusercontent.com/5aba89b6daab934631adffc1f301d17bb273268b/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6d656469612d702e736c69642e65732f75706c6f6164732f3336343831322f696d616765732f323438343535322f415243482d5265647578322d7265616c2e676966)

<small>[Redux flow](https://github.com/reactjs/redux/issues/653)</small>
---

### With [Choo](https://github.com/yoshuawuyts/choo#concepts)

```txt
 ┌─────────────────┐
 │  Subscriptions ─┤     User ───┐
 └─ Effects  ◀─────┤             ▼
 ┌─ Reducers ◀─────┴──Actions── DOM ◀┐
 │                                   │
 └▶ Router ─────State ───▶ Views ────┘
```

Note: ^ is from Choo.

---

### With [Elm](elm-lang.org)

* Model — the state of your application
* Update — a way to update your state
* View — a way to view your state as HTML

Note: ^ is from [The Elm Architecture](http://guide.elm-lang.org/architecture/index.html)

---

![elm_arc](./images/elm_arch.png)

---

### Code example with Elm

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

*When you are confused of the api design of Redux, go and check out the Elm architecture, it really helps.*

---

### Immutable data structure

The only way to make your app predicatable.

--
* `Array.map()` over `Array.forEach()` when iterating
--

* `Array.filter()` over `Array.forEach()` when filtering
--

* `[...items, newItem]` or `Array.concat()` over `Array.push()` when updating array
--

* `Object.assign({}, myObj, { name: 'fraserxu'})` or `Array.reduce()` over `myObj.name = 'fraserxu'` when updating object
--



[Mutator method in JavaScript Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Mutator_methods)

---

### Immutable in JavaScript resources

* mori from the ClojureScript community
* ramdajs
* Immutable.js in JavaScript
* seamless-immutable
* native support in Elm!

---

### Type system

* Flow
* TypeScript
* ClojureScript
* Elm

---

### Type Aannotations

```elm
answer : Int
answer =
  42

factorial : Int -> Int
factorial n =
  List.product [1..n]

distance : { x : Float, y : Float } -> Float
distance {x,y} =
  sqrt (x^2 + y^2)
```

---

### Type Aliases

```elm
type alias Name = String
type alias Age = Int

info : (Name,Age)
info =
  ("Steve", 28)

type alias Point = { x:Float, y:Float }

origin : Point
origin =
  { x = 0, y = 0 }
```

---
class: center, middle

## Conclusion

---
class: center, middle

## Thank you!
