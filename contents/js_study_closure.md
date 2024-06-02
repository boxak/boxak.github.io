---
date: '2024-05-31'
title: '[Javscript-Study] Lexical Scope와 Closure - 2'
categories: ['자바스크립트 기본기']
summary: '렉시컬 스코프, 클로저에 대해 알아보는 글'
thumbnail: { publicURL: './images/JavaScript.jpeg' }
---

## 1. 이번에는 Closure에 대해서 알아보자.

Closure 는 아마도 함수형 프로그래밍 언어라면은 가지고 있는 문법으로써 Javascript 만이 가지는 특징이라고 보기에는 어려울 것이다.

Closure는 _함수와 그 함수가 선언된 Lexical 환경과의 조합이다._ 라고 되어있다.(https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)

우리는 자바스크립트에서 함수를 객체로 다룬다는 것을 알고 있다. 그렇다면 어떤 함수 f 가 존재한다고 하였을 때, f라는 함수 객체는
어떠한 프로퍼티들을 가지고 있을 거라고 생각할 수 있다.

```javascript
var a = 'A'

function f() {
  var b = 'B'
  function g() {
    var c = 'C'
    console.log(a + b + c) // -> ABC 출력
  }
}
```

위와 같은 코드가 있다고 할 때, g를 중첩 함수, 또는 내부 함수라고 하고 f를 g의 외부 함수라고 부른다. 그러면
f, g의 렉시컬 환경 컴포넌트는 아래처럼 나타낼 수 있다.

![image](https://github.com/boxak/boxak.github.io/assets/38724041/751e58e2-80b3-4149-839f-37b3abf3faf1)

즉, 위 이미지에서 처럼 함수 g가 선언이 될 때, g는 외부 함수인 f의 렉시컬 환경을 참조하게 된다.

이처럼 클로저라는 개념에서 함수 g가 어떤 변수에 할당이 되어서 사용되게 되면 함수 g가 참조하는 렉시컬 환경 즉, 함수 f의 클로저가 메모리에서 지워지지 않고 그대로 남게 되는 것이다. 그래서 아래와 같이 counter 함수를 3번 호출하게 되면 count라는 변수가 3번 증가하게 되어 count = 3 이라는 결과를 얻을 수 있다.

```javascript

function makeCounter() {
  var count = 0;
  return funtion() {
    return ++count;
  };
}

var counter = makeCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

```

#

#### -> 요약

1. 외부 함수를 호출하면 이 함수의 렉시컬 환경 컴포넌트가 생성된다.
   그리고 그 안에 중첩된 함수의 함수 객체를 생성해서 반환한다. 즉, 외부 함수는 클로저를 생성하는 팩토리 함수라고 할 수 있다.

2. 외부 함수가 속한 렉시컬 환경 컴포넌트는 클로저 내부 상태 그 자체이다. 따라서 외부 함수가 호출될 때마다 클로저는 새로 생성된다.

3. 중첩 함수의 함수 객체가 살아있으면 외부 함수의 렉시컬 환경 컴포넌트는 지워지지 않는다.

4. 클로저 내부 상태(외부 함수의 지역 변수, 선언전 환경 레코드)는 외부로부터 은폐되어 중첩 함수를 통해서만 읽고 쓸 수 있다.

## 2. 클로저의 활용

### 1. 여러 개의 내부 상태, 메서드를 가진 클로저

```javascript
function Person(name, age) {
  var _name = name
  var _age = age

  return {
    getName: function () {
      return _name
    },
    getAge: function () {
      return _age
    },
    setAge: function (x) {
      _age = x
    },
  }
}

var person = Person('Tom', 18)
console.log(person.getName()) // Tom
console.log(person.getAge()) // 18
person.setAge(19)
console.log(person.getAge()) // 19
```

#

### 2. 함수 팩토리

클로저를 활용하면 다양한 매개변수를 받는 함수를 여러 개 생성할 수 있다.

```javascript
function makeMultiplier(x) {
  return function (y) {
    return x * y
  }
}

var multi2 = makeMultiplier(2)
var multi10 = makeMultiplier(10)

console.log(multi2(3)) // 6
console.log(multi10(3)) // 30
```

#

### 3. 초기화 기능이 추가된 함수 생성하기

가령, 에라토스테네스의 체 원리로 소수 목록을 구하고 그 중 여거 개 소수를 무작위로 선택해 그 곱을 반환하는 함수를 만드려 한다고 하자. 그런데 매번 소수 목록을 구하는 작업을 매번 실행하게 만들면 그 만큼 계산 시간이 길어진다. 그래서 클로저를 생성할 때 이것을 한 번만 실행시켜서 그 이후에는 결과만 처리하게 할 수 있다.

```javascript
function Primes(n) {
  var p = []

  for (var i = 2; i <= n; i++) {
    p[i] = true
  }

  var max = Math.floor(Math.sqrt(n))

  for (var x = 2; x <= max; x++) {
    for (var i = x * 2; i <= n; i += x) {
      p[i] = false
    }

    while (p[++x]);
  }

  var primes = [],
    nprimes = 0
  for (var i = 2; i <= n; i++) {
    if (p[i]) {
      primes[nprimes++] = i
    }
  }

  p = null

  return function (m) {
    for (var i = 0, product = 1; i < m; i++) {
      product *= primes[Math.floor(Math.random() * nprimes)]
    }

    return product
  }
}

var primeProduct = Primes(100000)
console.log(primeProduct(2))
console.log(primeProduct(2))
```
