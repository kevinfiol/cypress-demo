# Features
Cypress comes fully baked, batteries included. Here is a list of things it can do that no other testing framework can:

* Time Travel: Cypress takes snapshots as your tests run. Hover over commands in the Command Log to see exactly what happened at each step.

* Debuggability: Stop guessing why your tests are failing. Debug directly from familiar tools like Developer Tools. Our readable errors and stack traces make debugging lightning fast.

* Automatic Waiting: Never add waits or sleeps to your tests. Cypress automatically waits for commands and assertions before moving on. No more async hell.

* Spies, Stubs, and Clocks: Verify and control the behavior of functions, server responses, or timers. The same functionality you love from unit testing is right at your fingertips.

* Network Traffic Control: Easily control, stub, and test edge cases without involving your server. You can stub network traffic however you like.
* Consistent Results: Our architecture doesn’t use Selenium or WebDriver. Say hello to fast, consistent and reliable tests that are flake-free.

* Screenshots and Videos: View screenshots taken automatically on failure, or videos of your entire test suite when run from the CLI.

* Cross browser Testing: Run tests within Firefox and Chrome-family browsers (including Edge and Electron) locally and optimally in a Continuous Integration pipeline.

## Cypress is Like jQuery

If you've used {% url 'jQuery' https://jquery.com/ %} before, you may be used to querying for elements like this:

```js
$('.my-selector')
```

In Cypress, querying elements is the same:

```js
cy.get('.my-selector')
```

In fact, Cypress {% url 'bundles jQuery' bundled-tools#Other-Library-Utilities %} and exposes many of its DOM traversal methods to you so you can work with complex HTML structures with ease using APIs you're already familiar with.

```js
// Each method is equivalent to its jQuery counterpart. Use what you know!
cy.get('#main-content')
  .find('.article')
  .children('img[src^="/static"]')
  .first()
```

{% note success Core Concept %}
Cypress leverages jQuery's powerful selector engine to help make tests familiar and readable for modern web developers.

Interested in the best practices for selecting elements? {% url 'Read here' best-practices#Selecting-Elements %}.
{% endnote %}

Accessing the DOM elements returned from the query works differently, however:

```js
// This is fine, jQuery returns the element synchronously.
const $jqElement = $('.element')

// This will not work! Cypress does not return the element synchronously.
const $cyElement = cy.get('.element')
```

Let's look at why this is...

## Cypress is _Not_ Like jQuery

**Question:** What happens when jQuery can't find any matching DOM elements from its selector?

**Answer:** *Oops!* It returns an empty jQuery collection. We've got a real object to work with, but it doesn't contain the element we wanted. So we start adding conditional checks and retrying our queries manually.

```js
// $() returns immediately with an empty collection.
const $myElement = $('.element').first()

// Leads to ugly conditional checks
// and worse - flaky tests!
if ($myElement.length) {
  doSomething($myElement)
}
```

**Question:** What happens when Cypress can't find any matching DOM elements from its selector?

**Answer:** *No big deal!* Cypress automatically retries the query until either:

### 1. The element is found

```js
cy
  // cy.get() looks for '#element', repeating the query until...
  .get('#element')

  // ...it finds the element!
  // You can now work with it by using .then
  .then(($myElement) => {
    doSomething($myElement)
  })
```

### 2. A set timeout is reached

```js
cy
  // cy.get() looks for '#element-does-not-exist', repeating the query until...
  // ...it doesn't find the element before its timeout.
  // Cypress halts and fails the test.
  .get('#element-does-not-exist')

  // ...this code is never run...
  .then(($myElement) => {
    doSomething($myElement)
  })
```

This makes Cypress robust and immune to dozens of common problems that occur in other testing tools. Consider all the circumstances that could cause querying a DOM element to fail:

- The DOM has not loaded yet.
- Your framework hasn't finished bootstrapping.
- An XHR request hasn't responded.
- An animation hasn't completed.
- and on and on...

Before, you'd be forced to write custom code to protect against any and all of these issues: a nasty mashup of arbitrary waits, conditional retries, and null checks littering your tests. Not in Cypress! With built-in retrying and {% url 'customizable timeouts' configuration#Timeouts %}, Cypress sidesteps all of these flaky issues.
