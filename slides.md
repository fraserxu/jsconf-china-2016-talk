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

???
Q: What do you know about design patterns?

A: It's about his experience in solving *design issues* and how they related to buildings and towns.

In collaboration with Sara Ishikawa and Murray Silverstein, Alexander produced a pattern language that would help empower anyone wishing to design and build at any scale. This was published back in 1977 in a paper titled “A Pattern Language,” which was later released as a complete hardcover book.

---

## Software design pattern

In software engineering, a software design pattern is

* a general reusable solution to a commonly occurring problem within a given context in software design
* It is a description or template for how to solve a problem that can be used in many different situations.


> https://en.wikipedia.org/wiki/Software_design_pattern

???
Some 30 years ago, software engineers began to incorporate the principles Alexander had written about into the first documentation about design patterns, which was to be a guide for novice developers looking to improve their coding skills.

* It is **not** a finished design that can be transformed directly into source or machine code.
* Design patterns are formalized best practices that the programmer can use to solve common problems when designing an application or system.

---
class: center

![Design Patterns: Elements of Reusable Object-Oriented Software](https://img3.doubanio.com/lpic/s1074361.jpg)

???
What is the first time I heard about design patterns?

GOF 四人帮

---

## We Already Use Patterns Every Day

Object oriented programming

```JavaScript
class Conference {
  constructor(name, location, year) {
    this.name = name
    this.location = location
    this.year = year
  }

  sayHi() {
    console.log(`欢迎来到${this.year} ${this.location} ${this.name}.`)
  }
}

const ningjs = new Conference('JavaScritp中国开发者大会', '南京', '2016年')

ningjs.sayHi()
// 欢迎来到2016年 南京 JavaScritp中国开发者大会.
```

???
Enough about concept, let's check some common patterns we already know and used everyday.

---

### With jQuery

DOM Traversal and Manipulation

```JavaScript
$( "button.continue" ).html( "Next Step..." )
```

Event Handling

```JavaScript
var hiddenBox = $( "#banner-message" );
$( "#button-container button" ).on( "click", function( event ) {
  hiddenBox.show();
});
```

???
jQuery is great. Without jQuery I would not be a front-end developer.

---
class: center

## Prior art - JavaScript MV* Patterns

> Model–view–controller (MVC) is a software architectural pattern for implementing user interfaces on computers. It divides a given software application into three interconnected parts, so as to separate internal representations of information from the ways that information is presented to or accepted from the user.[1][2]

![mvc](./images/mvc.png)

Source: https://addyosmani.com/resources/essentialjsdesignpatterns/book/

???

MVC (Model-View-Controller)

MVP (Model-View-Presenter)

MVVM (Model-View-ViewModel)

---

### Design patterns popular in the current frontend framework world

* Functional style programming
* Declarative and functional view rendering
* Unidirectional data flow
* Immutable data structure
* Type system

???
Enough about history, let's go back to the modern world.

---

## Functional style programming

> Functional programming is about writing pure functions, about removing hidden inputs and outputs as far as we can, so that as much of our code as possible just describes a relationship between inputs and outputs.

* Pure functions without any side effect
* First-class and higher-order functions

source: http://blog.jenkster.com/2015/12/what-is-functional-programming.html

???
What is functional programming?

What is side effect?

---

### Pure function

> A pure function is a function where the return value is only determined by its input values, without observable side effects. This is how functions in math work: Math.cos(x) will, for the same value of x , always return the same result. Computing it does not change x

???
Example of non-pure function and pure function

---

### Not pure function

Given same input, the return value is different, not pure.

```JavaScript
let name = 'jsconf china'
function greeting () {
  // bad things could happen
  return 'Welcome to ' + name + '.'
}

function updateName () {
  name = 'phpconf china'
}

// accidentally called updateName()
updateName()

// if name updates, the function return different result
greeting()
// 'Welcome to phpconf china.'
```

**Hard to test.**

---

### Pure function

Given same input, always return same value.

```JavaScript
const name = 'jsconf china'
function greeting (name) {
  return 'Welcome to ' + name
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

> a function that does at least one of the following: takes one or more functions as arguments (i.e., procedural parameters), returns a function as its result.

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

// or
year(2016)('Nanjing')
// 'Welcome to 2016 JSConf China in Nanjing.'
```

???
How does this related to building user interface?

---

### Declarative and functional view rendering

Declarative rendering, view is a presentation of a state.

```elm
Fn: State -> DOM
View = Fn State
```

* No side effect, return same HTML given same state
* Stateless/pure component, easy to test
* High order component, make composition easy

---

### In [React](https://facebook.github.io/react/)

```JavaScript
const HelloMessage = (props) => <div>Hello {props.name}</div>;
ReactDOM.render(<HelloMessage name="JSConf China" />, mountNode);
```

---

### In [yo-yo](https://github.com/maxogden/yo-yo)

```js
const yo = require('yo-yo')

const HelloMessage = (props) => {
  return yo`<div>hello ${props.name}!</div>`
}
const element = HelloMessage({
  name: 'JSConf China'
})

document.body.appendChild(element)
```

---

### In [Elm](http://elm-lang.org/)

```elm
import Html exposing (div, text)
import Html.Attributes exposing (class)


model = {
  name = "JSConf China"
}


main model =
  div [class "welcome-message"] [text ("Hello, " ++ model.name)]
```

???
Things started to out of control.

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

### Code example with Elm

```elm
import Html exposing (div, button, text)
import Html.App exposing (beginnerProgram)
import Html.Events exposing (onClick)


main =
  beginnerProgram { model = 0, view = view, update = update }


view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (toString model) ]
    , button [ onClick Increment ] [ text "+" ]
    ]


type Msg = Increment | Decrement


update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1

```

???
When you are confused of the api design of Redux, go and check out the Elm architecture, it really helps.

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
