---
date: '2024-05-31'
title: '[Javscript-Study] Lexical Scope와 Closure - 2'
categories: ['자바스크립트 기본기']
summary: '렉시컬 스코프, 클로저에 대해 알아보는 글'
thumbnail: { publicURL: './images/JavaScript.jpeg' }
---

## 1. 이번에는 Closure에 대해서 알아보자.

Closure 는 아마도 함수형 프로그래밍 언어라면은 가지고 있는 문법으로써 Javascript 만이 가지는 특징이라고 보기에는 어려울 것이다.

Closure는 *함수와 그 함수가 선언된 Lexical 환경과의 조합이다.* 라고 되어있다.(https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)

우리는 자바스크립트에서 함수를 객체로 다룬다는 것을 알고 있다. 그렇다면 어떤 함수 f 가 존재한다고 하였을 때, f라는 함수 객체는
어떠한 프로퍼티들을 가지고 있을 거라고 생각할 수 있다.

```javascript

var a = "A";

function f() {
  var b = "B";
  function g() {
    var c = "C";
    console.log(a + b + c); // -> ABC 출력
  }
}

```

위와 같은 코드가 있다고 할 때, g를 중첩 함수, 또는 내부 함수라고 하고 f를 g의 외부 함수라고 부른다. 그러면 
f, g의 렉시컬 환경 컴포넌트는 아래처럼 나타낼 수 있다.

![image](https://github.com/boxak/boxak.github.io/assets/38724041/751e58e2-80b3-4149-839f-37b3abf3faf1)

즉, 위 이미지에서 처럼 함수 g가 선언이 될 때, g는 외부 함수인 f의 렉시컬 환경을 참조하게 된다.

이처럼 클로저라는 개념에서 함수 g가 어떤 변수에 할당이 되어서 
