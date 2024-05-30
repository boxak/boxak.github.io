---
date: '2024-05-27'
title: '[Javscript-Study] Lexical Scope와 Closure'
categories: ['자바스크립트 기본기']
summary: '렉시컬 스코프, 클로저에 대해 알아보는 글'
thumbnail: { publicURL: './images/JavaScript.jpeg' }
---

## 1. Scope에 대해 먼저 알아보자.

변수에 접근할 수 있는 범위를 그 변수의 **유효범위**(scope)라고 한다. 유효 범위를 결정하는 방법이 두 가지가 존재한다.

1. 어휘적 범위(Lexical Scope) : 프로그램의 구문만으로 유효 범위를 정하는 방법
2. 동적 범위(Dynamic Scope) : 프로그램 실행 중에 유효 범위를 정하는 방법

#

## 2. Lexical Scope는 무엇일까.

자바스크립트는 **Lexical Scope**를 채택하고 있다.

Lexical Scope는 다른 말로 표현하면 정적 스코프(Static Scope)라고 표현할 수 있다. 이는 C, JAVA 등의 프로그래밍 언어에서도 채택하고 있으므로 그리 낯선 개념은 아니다. 그런데 굳이 렉시컬 스코프라고 표현하는 이유가 무엇이고 자바스크립트에서는 어떤 현상을 발생시키는 것일까?

아래의 코드를 보자.

```javascript
var x = 1

function first() {
  var x = 10
  second()
}

function second() {
  console.log(x)
}

first()
second()

// 출력 결과
// 1
// 1
```

언뜻 보기에 맨 첫줄에서 var x = 1 로 값이 할당되었고 first 함수 내부에서 다시 var x = 10으로 재선언 및 재할당되었다. 자바스크립트는 var로 선언된 변수는 재선언을 허용하므로 x = 10으로 업데이트된 상황에서 second 함수를 호출하였으니 첫번째 출력 결과는 10. second 함수를 직접 호출하였을 때는 첫번째에 first 함수를 호출하면서 x의 값이 10으로 바뀌었으니 역시나 10이 출력되어야 할 것처럼 보인다.

하지만 Lexical Scope에 의해 함수 내부 변수의 스코프는 프로그램 실행시에 결정되는 것이 아니라 코드 자체의 해석에 의해 결정된다.

무슨 말이냐면, second 함수는 first 함수 내에서 호출된다. 하지만 이것과는 상관없이 **함수 선언**이 어느 스코프에서 되어있는지를 봐야한다. first, second 두 함수 모두 전역 스코프에서 정의되었기 때문에 함수 호출이 어디에서 일어나는 지에 상관없이 전역 스코프를 가진다는 의미이다. 따라서 first 함수 내에 지역적으로 정의된 var x = 10은 second 함수에서 console.log(x) 코드를 실행할 때 영향을 주지 못하는 것이다.

--> 사실 여기서 느끼는 부분인데, 만일에 var 가 아니라 let으로 변수 선언을 했다면은 코드를 보고 어떤 값이 출력될 지 추측하는 것이 어렵지 않았을 것이다. let 으로 선언해도 1이 두 번 출력되는 것은 마찬가지지만 우리는 let이 블록 스코프 변수 선언자라는 것을 알기 때문에 first 안의 let x = 10이 함수 바깥에 영향을 주지 않는다는 것을 알고 있으므로 어떤 결과가 출력될 지에 대해 헷갈리지 않았을 것이다.

#

# 3. Scope Chain과 Execution Context(실행 컨텍스트)

- 만일 second 함수가 first 함수 내부에 선언되어 있었다면?

```javascript
var x = 1

function first() {
  var x = 10
  function second() {
    console.log(x)
  }
  second()
}

first()
```

#

위의 코드를 실행하면 10이 출력된다. 그 이유는 무엇일까? 당연히 second 함수 바로 위에 var x = 10; 이라는 코드가 있기 때문에 예상되는 출력 결과이다. 하지만 여기서 스코프 체인과 실행 컨텍스트를 이해하고 원리를 알아보자.

- Scope Chain

스코프 체인은
