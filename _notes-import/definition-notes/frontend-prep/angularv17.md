

# Angular 17 Complete Tutorial Notes (Traditional Syntax)

> **Scope:** Angular v17.2.13 — using `ngIf`, `ngFor`, Pipes, Observables (NO `@if`, `@for`, Signals)

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Modules](#2-modules)
3. [Components](#3-components)
4. [Data Binding](#4-data-binding)
5. [Directives](#5-directives)
6. [Pipes](#6-pipes)
7. [Component Communication](#7-component-communication)
8. [Lifecycle Hooks](#8-lifecycle-hooks)
9. [Services & Dependency Injection](#9-services--dependency-injection)
10. [HTTP Client](#10-http-client)
11. [Routing](#11-routing)
12. [Guards](#12-guards)
13. [Interceptors](#13-interceptors)
14. [Forms — Template-Driven](#14-forms--template-driven)
15. [Forms — Reactive](#15-forms--reactive)
16. [Observables & RxJS](#16-observables--rxjs)
17. [ViewChild & ContentChild](#17-viewchild--contentchild)
18. [ng-content (Content Projection)](#18-ng-content-content-projection)
19. [ng-template, ng-container, ng-templateoutlet](#19-ng-template-ng-container-ng-templateoutlet)
20. [Custom Directives](#20-custom-directives)
21. [Modules — Lazy Loading & Feature Modules](#21-lazy-loading--feature-modules)
22. [Error Handling Patterns](#22-error-handling-patterns)
23. [Best Practices & Cheat Sheet](#23-best-practices--cheat-sheet)

---

## 1. Project Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable / feature components
│   │   ├── services/            # Business logic & API calls
│   │   ├── models/              # Interfaces & types
│   │   ├── guards/              # Route guards
│   │   ├── interceptors/        # HTTP interceptors
│   │   ├── pipes/               # Custom pipes
│   │   ├── directives/          # Custom directives
│   │   ├── modules/             # Feature modules
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.module.ts        # Root module
│   │   └── app-routing.module.ts
│   ├── assets/                  # Static files (images, fonts)
│   ├── environments/            # Environment configs
│   ├── index.html
│   ├── main.ts                  # Entry point (bootstraps AppModule)
│   └── styles.css               # Global styles
├── angular.json                 # CLI configuration
├── package.json
└── tsconfig.json
```

### `main.ts` — Entry Point
```typescript
// Angular bootstraps the ROOT MODULE here
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

> **Flow:** `main.ts` → boots `AppModule` → `AppModule` declares `AppComponent` as bootstrap → Angular renders `<app-root>` in `index.html`

---

## 2. Modules

### What is a Module?
A **container** that groups related components, directives, pipes, and services together.

### Root Module — `app.module.ts`
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HighlightDirective } from './directives/highlight.directive';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  // Components, Directives, Pipes that BELONG to this module
  declarations: [
    AppComponent,
    HeaderComponent,
    UserListComponent,
    HighlightDirective,
    TruncatePipe
  ],

  // Other modules whose exported classes are needed HERE
  imports: [
    BrowserModule,       // Gives us ngIf, ngFor, etc.
    FormsModule,         // Template-driven forms (ngModel)
    ReactiveFormsModule, // Reactive forms
    HttpClientModule,    // HTTP calls
    AppRoutingModule     // Routing
  ],

  // Services available APPLICATION-WIDE (older pattern)
  providers: [],

  // The ROOT component that Angular creates and inserts into index.html
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Key Points:
| Property       | Purpose |
|----------------|---------|
| `declarations` | Register components, directives, pipes that belong to this module |
| `imports`      | Import other modules to use their exported features |
| `providers`    | Register services (prefer `providedIn: 'root'` in service itself) |
| `exports`      | Make declarations available to other modules that import this one |
| `bootstrap`    | The root component (only in root module) |

> ⚠️ **Rule:** Every component/directive/pipe must be declared in **exactly one** module.

---

## 3. Components

### Generate a Component
```bash
ng generate component components/user-card
# shorthand: ng g c components/user-card
```

This creates 4 files:
```
user-card/
├── user-card.component.ts      # Logic
├── user-card.component.html    # Template
├── user-card.component.css     # Styles (scoped to this component)
└── user-card.component.spec.ts # Unit tests
```

### Component Anatomy

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  // The HTML tag: <app-user-card></app-user-card>
  selector: 'app-user-card',

  // Points to the template file
  templateUrl: './user-card.component.html',

  // Points to the styles file (scoped — won't leak to other components)
  styleUrls: ['./user-card.component.css']

  // --- Alternatives ---
  // Inline template (for very small components):
  // template: `<h1>Hello</h1>`,

  // Inline styles:
  // styles: [`h1 { color: red; }`]
})
export class UserCardComponent implements OnInit {
  // PROPERTIES — available in template
  title: string = 'User Card';
  isActive: boolean = true;
  users: string[] = ['Alice', 'Bob', 'Charlie'];

  // CONSTRUCTOR — used for Dependency Injection
  constructor() { }

  // LIFECYCLE HOOK — runs after component is initialized
  ngOnInit(): void {
    console.log('Component initialized!');
  }

  // METHODS — can be called from template
  toggleActive(): void {
    this.isActive = !this.isActive;
  }
}
```

### Using a Component
```html
<!-- In any parent template (e.g. app.component.html) -->
<app-user-card></app-user-card>
```

### Component Metadata Cheat Sheet
```typescript
@Component({
  selector: 'app-example',        // CSS selector
  templateUrl: './example.html',   // External template
  // template: `<p>inline</p>`,   // Inline template
  styleUrls: ['./example.css'],   // External styles array
  // styles: ['p { color: red }'], // Inline styles
  // encapsulation: ViewEncapsulation.None  // Disable style scoping
})
```

---

## 4. Data Binding

Data binding is the **bridge between the TypeScript class and the HTML template**.

### 4.1 Interpolation — `{{ }}` — (Component → View)
Display component data in the template.

```typescript
// component.ts
export class AppComponent {
  name: string = 'Angular';
  price: number = 99.5;
  getGreeting(): string {
    return 'Hello World!';
  }
}
```
```html
<!-- component.html -->
<h1>Welcome to {{ name }}</h1>
<p>Price: {{ price }}</p>
<p>{{ getGreeting() }}</p>
<p>{{ 2 + 2 }}</p>                      <!-- Expressions work -->
<p>{{ name.toUpperCase() }}</p>          <!-- Methods on values -->
<p>{{ isActive ? 'Yes' : 'No' }}</p>    <!-- Ternary -->
```

> ⚠️ Cannot use: assignments (`=`), `new`, chaining (`;`), `++`, `--`

---

### 4.2 Property Binding — `[property]` — (Component → View)
Bind a **DOM property** to a component value.

```typescript
imageUrl: string = 'https://example.com/photo.jpg';
isDisabled: boolean = true;
inputType: string = 'password';
```
```html
<img [src]="imageUrl" [alt]="name">
<button [disabled]="isDisabled">Click Me</button>
<input [type]="inputType">
<div [hidden]="!isActive">I am visible</div>

<!-- Equivalent to interpolation for string attributes: -->
<img src="{{ imageUrl }}">  <!-- works but property binding preferred -->
```

### When to use `[property]` vs `{{ }}`?
- **Non-string values** (boolean, objects) → always use `[property]`
- **String values** → either works, but `[property]` is preferred

---

### 4.3 Event Binding — `(event)` — (View → Component)
Listen to user events and call methods.

```html
<button (click)="onClick()">Click Me</button>
<button (click)="onSave('draft')">Save Draft</button>
<input (input)="onInput($event)">
<input (keyup.enter)="onSearch()">
<form (submit)="onSubmit()">
<div (mouseover)="onHover()" (mouseleave)="onLeave()">Hover me</div>
```

```typescript
onClick(): void {
  console.log('Button clicked!');
}

onSave(type: string): void {
  console.log('Saving as:', type);
}

onInput(event: Event): void {
  const target = event.target as HTMLInputElement;
  console.log('Value:', target.value);
}

onSearch(): void {
  console.log('Enter pressed!');
}
```

### Common Events
| Event | Trigger |
|-------|---------|
| `(click)` | Mouse click |
| `(dblclick)` | Double click |
| `(input)` | Value changes (real-time) |
| `(change)` | Value changes (on blur) |
| `(keyup)` | Key released |
| `(keyup.enter)` | Enter key |
| `(keydown)` | Key pressed |
| `(submit)` | Form submit |
| `(mouseover)` | Mouse enters |
| `(mouseleave)` | Mouse leaves |
| `(focus)` | Input focused |
| `(blur)` | Input blurred |

---

### 4.4 Two-Way Binding — `[(ngModel)]` — (Component ↔ View)
Data flows **both directions**. When the user types, the property updates. When the property changes, the input updates.

> ⚠️ **Requires `FormsModule`** imported in your module!

```typescript
// app.module.ts
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [FormsModule]  // MUST import this
})
```

```typescript
// component.ts
searchTerm: string = '';
volume: number = 50;
selectedColor: string = 'red';
isSubscribed: boolean = false;
```

```html
<input [(ngModel)]="searchTerm" placeholder="Search...">
<p>You typed: {{ searchTerm }}</p>

<input type="range" [(ngModel)]="volume">
<p>Volume: {{ volume }}</p>

<select [(ngModel)]="selectedColor">
  <option value="red">Red</option>
  <option value="blue">Blue</option>
  <option value="green">Green</option>
</select>

<input type="checkbox" [(ngModel)]="isSubscribed">
<p>Subscribed: {{ isSubscribed }}</p>
```

### How `[(ngModel)]` actually works (Banana in a Box)
`[(ngModel)]` is shorthand for:
```html
<!-- These two lines are equivalent: -->
<input [(ngModel)]="name">
<input [ngModel]="name" (ngModelChange)="name = $event">
```

### Custom Two-Way Binding Pattern
```html
<!-- On any component with an @Input + @Output pair: -->
<app-counter [(value)]="counterValue"></app-counter>
<!-- Expands to: -->
<app-counter [value]="counterValue" (valueChange)="counterValue = $event"></app-counter>
```

---

### 4.5 Attribute Binding — `[attr.X]`
For HTML **attributes** (not DOM properties):
```html
<td [attr.colspan]="columnSpan">Content</td>
<div [attr.role]="role">Accessible</div>
<div [attr.aria-label]="label">Screen reader</div>
<input [attr.data-id]="userId">
```

---

### 4.6 Class Binding — `[class.X]` and `[ngClass]`
```html
<!-- Single class toggle -->
<div [class.active]="isActive">Toggle one class</div>
<div [class.text-danger]="hasError">Red if error</div>

<!-- Multiple classes with ngClass -->
<div [ngClass]="{
  'active': isActive,
  'disabled': isDisabled,
  'highlight': isSelected
}">Multiple classes</div>

<!-- ngClass with different formats -->
<div [ngClass]="'class1 class2'">String format</div>
<div [ngClass]="['class1', 'class2']">Array format</div>
<div [ngClass]="getClasses()">Method returning object/string/array</div>
```

---

### 4.7 Style Binding — `[style.X]` and `[ngStyle]`
```html
<!-- Single style -->
<div [style.color]="isActive ? 'green' : 'red'">Colored text</div>
<div [style.font-size.px]="fontSize">Sized text</div>
<div [style.width.%]="progress">Progress bar</div>

<!-- Multiple styles with ngStyle -->
<div [ngStyle]="{
  'color': textColor,
  'font-size': fontSize + 'px',
  'background-color': isActive ? '#eee' : 'transparent'
}">Styled div</div>
```

---

### 4.8 Summary Table

| Type | Syntax | Direction | Example |
|------|--------|-----------|---------|
| Interpolation | `{{ value }}` | Component → View | `{{ title }}` |
| Property Binding | `[property]="value"` | Component → View | `[src]="imageUrl"` |
| Event Binding | `(event)="handler()"` | View → Component | `(click)="save()"` |
| Two-Way Binding | `[(ngModel)]="value"` | Both ↔ | `[(ngModel)]="name"` |
| Attribute Binding | `[attr.X]="value"` | Component → View | `[attr.colspan]="2"` |
| Class Binding | `[class.X]="condition"` | Component → View | `[class.active]="on"` |
| Style Binding | `[style.X]="value"` | Component → View | `[style.color]="c"` |

---

## 5. Directives

Directives are **instructions that tell Angular to modify the DOM**.

### Three Types:
1. **Component Directives** — Components are directives with templates
2. **Structural Directives** — Change DOM layout (add/remove elements): `*ngIf`, `*ngFor`, `*ngSwitch`
3. **Attribute Directives** — Change appearance/behavior: `ngClass`, `ngStyle`, `ngModel`

---

### 5.1 `*ngIf` — Conditionally Add/Remove Elements

> **Key:** `*ngIf` **adds or removes the element from the DOM entirely**. It does NOT hide it with CSS.

```html
<!-- Basic -->
<div *ngIf="isLoggedIn">Welcome back!</div>

<!-- With else -->
<div *ngIf="isLoggedIn; else loginTemplate">
  Welcome, {{ username }}!
</div>
<ng-template #loginTemplate>
  <p>Please log in.</p>
</ng-template>

<!-- With then and else -->
<div *ngIf="isLoggedIn; then loggedInTmpl; else loggedOutTmpl"></div>
<ng-template #loggedInTmpl>
  <p>Welcome back!</p>
</ng-template>
<ng-template #loggedOutTmpl>
  <p>Please log in.</p>
</ng-template>

<!-- With async pipe (very common for Observables) -->
<div *ngIf="user$ | async as user">
  <p>Name: {{ user.name }}</p>
  <p>Email: {{ user.email }}</p>
</div>

<!-- Multiple conditions -->
<div *ngIf="isLoaded && !hasError">Content loaded!</div>
<div *ngIf="role === 'admin' || role === 'superadmin'">Admin panel</div>
```

> **Common mistake:** Don't put two structural directives on the same element. Use `<ng-container>` instead:
```html
<!-- ❌ WRONG — Cannot have *ngIf and *ngFor on same element -->
<div *ngIf="isVisible" *ngFor="let item of items">{{ item }}</div>

<!-- ✅ CORRECT — Wrap with ng-container -->
<ng-container *ngIf="isVisible">
  <div *ngFor="let item of items">{{ item }}</div>
</ng-container>
```

---

### 5.2 `*ngFor` — Loop Over Arrays

```typescript
users = [
  { id: 1, name: 'Alice', age: 25, active: true },
  { id: 2, name: 'Bob', age: 30, active: false },
  { id: 3, name: 'Charlie', age: 35, active: true }
];
colors: string[] = ['Red', 'Green', 'Blue'];
```

```html
<!-- Basic -->
<ul>
  <li *ngFor="let user of users">{{ user.name }}</li>
</ul>

<!-- With index -->
<div *ngFor="let user of users; let i = index">
  {{ i + 1 }}. {{ user.name }}
</div>

<!-- All exported variables -->
<div *ngFor="let user of users;
             let i = index;
             let first = first;
             let last = last;
             let even = even;
             let odd = odd;
             let count = count">
  <span>{{ i }}/{{ count }}: {{ user.name }}</span>
  <span *ngIf="first"> (FIRST)</span>
  <span *ngIf="last"> (LAST)</span>
  <span [class.even-row]="even">{{ even ? 'Even' : 'Odd' }}</span>
</div>

<!-- With trackBy (IMPORTANT for performance) -->
<div *ngFor="let user of users; trackBy: trackByUserId">
  {{ user.name }}
</div>
```

```typescript
// trackBy function — tells Angular how to identify each item
// Without trackBy, Angular destroys and recreates ALL DOM elements on change
// With trackBy, Angular only updates what changed
trackByUserId(index: number, user: any): number {
  return user.id;   // unique identifier
}
```

### `*ngFor` Exported Variables Reference:
| Variable | Type | Description |
|----------|------|-------------|
| `index` | `number` | Zero-based index of current item |
| `first` | `boolean` | `true` if first item |
| `last` | `boolean` | `true` if last item |
| `even` | `boolean` | `true` if even index |
| `odd` | `boolean` | `true` if odd index |
| `count` | `number` | Total number of items |

---

### 5.3 `ngSwitch` — Multiple Conditions

```typescript
currentTab: string = 'profile';
```

```html
<div [ngSwitch]="currentTab">
  <div *ngSwitchCase="'profile'">
    <h2>Profile Content</h2>
  </div>
  <div *ngSwitchCase="'settings'">
    <h2>Settings Content</h2>
  </div>
  <div *ngSwitchCase="'notifications'">
    <h2>Notifications Content</h2>
  </div>
  <div *ngSwitchDefault>
    <h2>Select a tab</h2>
  </div>
</div>

<button (click)="currentTab = 'profile'">Profile</button>
<button (click)="currentTab = 'settings'">Settings</button>
<button (click)="currentTab = 'notifications'">Notifications</button>
```

> **Note:** `[ngSwitch]` is an attribute directive. `*ngSwitchCase` and `*ngSwitchDefault` are structural directives.

---

### 5.4 `ngClass` — Dynamic CSS Classes

```typescript
isActive = true;
hasError = false;
currentStatus = 'warning'; // 'success' | 'warning' | 'danger'
```

```html
<!-- Object syntax (most common) -->
<div [ngClass]="{
  'active': isActive,
  'error': hasError,
  'disabled': !isActive
}">Styled box</div>

<!-- String syntax -->
<div [ngClass]="'class-one class-two'">Two classes</div>

<!-- Array syntax -->
<div [ngClass]="['class-one', 'class-two']">Two classes</div>

<!-- Method that returns object/string/array -->
<div [ngClass]="getStatusClasses()">Dynamic</div>
```

```typescript
getStatusClasses(): object {
  return {
    'alert-success': this.currentStatus === 'success',
    'alert-warning': this.currentStatus === 'warning',
    'alert-danger': this.currentStatus === 'danger'
  };
}
```

---

### 5.5 `ngStyle` — Dynamic Inline Styles

```html
<div [ngStyle]="{
  'background-color': isActive ? 'green' : 'gray',
  'font-size': fontSize + 'px',
  'padding': '10px',
  'border-radius': '5px'
}">
  Styled content
</div>

<!-- Alternative: camelCase property names -->
<div [ngStyle]="{
  backgroundColor: bgColor,
  fontSize: size + 'px'
}">Content</div>
```

> **Tip:** Prefer `[ngClass]` with CSS classes over `[ngStyle]` for maintainability.

---

## 6. Pipes

Pipes **transform displayed data** in the template without changing the underlying data.

**Syntax:** `{{ value | pipeName }}` or `{{ value | pipeName:arg1:arg2 }}`

---

### 6.1 Built-in Pipes

#### String Pipes
```html
{{ 'hello world' | uppercase }}        <!-- HELLO WORLD -->
{{ 'HELLO WORLD' | lowercase }}        <!-- hello world -->
{{ 'hello world' | titlecase }}        <!-- Hello World -->
```

#### Number Pipes
```html
<!-- DecimalPipe: {{ value | number:'minIntDigits.minFracDigits-maxFracDigits' }} -->
{{ 3.14159 | number }}                 <!-- 3.142 -->
{{ 3.14159 | number:'1.2-4' }}         <!-- 3.1416 -->
{{ 3.14159 | number:'3.1-1' }}         <!-- 003.1 -->
{{ 42 | number:'4.0-0' }}              <!-- 0042 -->
{{ 1234567 | number }}                 <!-- 1,234,567 -->
```

#### Currency Pipe
```html
{{ 99.99 | currency }}                        <!-- $99.99 -->
{{ 99.99 | currency:'EUR' }}                  <!-- €99.99 -->
{{ 99.99 | currency:'GBP':'symbol':'1.0-0' }} <!-- £100 -->
{{ 1234 | currency:'INR':'symbol' }}          <!-- ₹1,234.00 -->
{{ 99.99 | currency:'USD':'code' }}           <!-- USD99.99 -->
```

#### Percent Pipe
```html
{{ 0.85 | percent }}                   <!-- 85% -->
{{ 0.8567 | percent:'1.1-2' }}         <!-- 85.67% -->
```

#### Date Pipe
```typescript
today = new Date();  // e.g., 2024-03-15T10:30:00
```
```html
{{ today | date }}                     <!-- Mar 15, 2024 -->
{{ today | date:'short' }}             <!-- 3/15/24, 10:30 AM -->
{{ today | date:'medium' }}            <!-- Mar 15, 2024, 10:30:00 AM -->
{{ today | date:'long' }}              <!-- March 15, 2024 at 10:30:00 AM GMT+5 -->
{{ today | date:'full' }}              <!-- Friday, March 15, 2024 at 10:30:00 AM -->
{{ today | date:'shortDate' }}         <!-- 3/15/24 -->
{{ today | date:'longDate' }}          <!-- March 15, 2024 -->
{{ today | date:'shortTime' }}         <!-- 10:30 AM -->

<!-- Custom formats -->
{{ today | date:'dd/MM/yyyy' }}        <!-- 15/03/2024 -->
{{ today | date:'yyyy-MM-dd' }}        <!-- 2024-03-15 -->
{{ today | date:'dd MMM yyyy' }}       <!-- 15 Mar 2024 -->
{{ today | date:'EEEE, MMMM d' }}     <!-- Friday, March 15 -->
{{ today | date:'hh:mm a' }}           <!-- 10:30 AM -->
{{ today | date:'HH:mm:ss' }}         <!-- 10:30:00 -->
```

#### JSON Pipe (great for debugging)
```html
<pre>{{ userData | json }}</pre>
<!-- Output:
{
  "name": "Alice",
  "age": 25,
  "active": true
}
-->
```

#### Slice Pipe (like Array.slice or String.slice)
```html
{{ 'Hello World' | slice:0:5 }}        <!-- Hello -->
{{ 'Hello World' | slice:6 }}          <!-- World -->

<div *ngFor="let item of items | slice:0:5">   <!-- First 5 items -->
  {{ item }}
</div>
```

#### KeyValue Pipe (iterate over objects)
```typescript
user = { name: 'Alice', age: 25, city: 'NYC' };
```
```html
<div *ngFor="let entry of user | keyvalue">
  {{ entry.key }}: {{ entry.value }}
</div>
<!-- Output:
  age: 25
  city: NYC
  name: Alice  (sorted alphabetically by key)
-->
```

#### Async Pipe ⭐ (Very Important)
```typescript
import { Observable, of } from 'rxjs';

// In component:
user$: Observable<User> = this.userService.getUser(1);
items$: Observable<string[]> = of(['A', 'B', 'C']);
```
```html
<!-- Subscribes automatically, unsubscribes on destroy — NO memory leaks! -->
<div *ngIf="user$ | async as user">
  <h2>{{ user.name }}</h2>
  <p>{{ user.email }}</p>
</div>

<ul>
  <li *ngFor="let item of items$ | async">{{ item }}</li>
</ul>
```

> ⭐ **The `async` pipe is your best friend.** It handles subscription AND unsubscription automatically.

---

### 6.2 Chaining Pipes
```html
{{ today | date:'fullDate' | uppercase }}
<!-- FRIDAY, MARCH 15, 2024 -->

{{ user.name | lowercase | titlecase }}
```

---

### 6.3 Creating Custom Pipes

```bash
ng generate pipe pipes/truncate
# shorthand: ng g p pipes/truncate
```

#### Example: Truncate Pipe
```typescript
// pipes/truncate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'   // This is the name used in templates
})
export class TruncatePipe implements PipeTransform {

  // value = the data being piped
  // limit = first argument
  // trail = second argument (with default)
  transform(value: string, limit: number = 50, trail: string = '...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + trail;
  }
}
```

```html
{{ 'This is a very long description text' | truncate:20 }}
<!-- Output: This is a very long ... -->

{{ 'This is a very long description text' | truncate:10:'---' }}
<!-- Output: This is a ---  -->
```

> ⚠️ Don't forget to add it to `declarations` in your module (CLI does this automatically).

#### Example: Filter Pipe
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], field: string, searchTerm: string): any[] {
    if (!items || !searchTerm) return items;
    searchTerm = searchTerm.toLowerCase();
    return items.filter(item =>
      item[field]?.toLowerCase().includes(searchTerm)
    );
  }
}
```

```html
<input [(ngModel)]="searchText" placeholder="Search users...">
<div *ngFor="let user of users | filter:'name':searchText">
  {{ user.name }}
</div>
```

> ⚠️ **Performance Warning:** Angular re-runs **impure** pipes on every change detection cycle. The default is **pure** (only runs when input reference changes). For filtering, consider doing it in the component instead.

#### Pure vs Impure Pipes
```typescript
// PURE (default) — only runs when input REFERENCE changes
@Pipe({ name: 'myPipe', pure: true })

// IMPURE — runs on EVERY change detection cycle (expensive!)
@Pipe({ name: 'myPipe', pure: false })
```

---

## 7. Component Communication

### 7.1 Parent → Child: `@Input()`

**Parent Component:**
```typescript
// parent.component.ts
export class ParentComponent {
  parentMessage = 'Hello from parent!';
  userData = { name: 'Alice', age: 25 };
  items = ['A', 'B', 'C'];
}
```

```html
<!-- parent.component.html -->
<app-child
  [message]="parentMessage"
  [user]="userData"
  [items]="items"
  [count]="42"
  title="Static String">    <!-- No brackets = static string -->
</app-child>
```

**Child Component:**
```typescript
// child.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export class ChildComponent implements OnChanges {
  @Input() message: string = '';           // Required with default
  @Input() user!: { name: string, age: number }; // ! = definitely assigned
  @Input() items: string[] = [];
  @Input() count: number = 0;
  @Input() title: string = '';

  // Alias — parent uses [msg], child property is message
  // @Input('msg') message: string = '';

  // Detect changes to inputs
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message']) {
      console.log('Old:', changes['message'].previousValue);
      console.log('New:', changes['message'].currentValue);
      console.log('First change?', changes['message'].firstChange);
    }
  }
}
```

```html
<!-- child.component.html -->
<h2>{{ title }}</h2>
<p>{{ message }}</p>
<p>User: {{ user.name }}, Age: {{ user.age }}</p>
<p>Count: {{ count }}</p>
```

---

### 7.2 Child → Parent: `@Output()` with `EventEmitter`

**Child Component:**
```typescript
// child.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

export class ChildComponent {
  @Output() notify = new EventEmitter<string>();
  @Output() itemSelected = new EventEmitter<{ id: number, name: string }>();
  @Output() closed = new EventEmitter<void>();  // No data

  onButtonClick(): void {
    this.notify.emit('Button was clicked!');
  }

  selectItem(item: any): void {
    this.itemSelected.emit({ id: item.id, name: item.name });
  }

  close(): void {
    this.closed.emit();
  }
}
```

```html
<!-- child.component.html -->
<button (click)="onButtonClick()">Notify Parent</button>
<button (click)="close()">Close</button>
```

**Parent Component:**
```typescript
// parent.component.ts
export class ParentComponent {
  onNotified(message: string): void {
    console.log('Received from child:', message);
  }

  onItemSelected(item: { id: number, name: string }): void {
    console.log('Selected:', item);
  }

  onClose(): void {
    console.log('Child closed');
  }
}
```

```html
<!-- parent.component.html -->
<app-child
  (notify)="onNotified($event)"
  (itemSelected)="onItemSelected($event)"
  (closed)="onClose()">
</app-child>
```

> `$event` contains the data passed to `emit()`.

---

### 7.3 Sibling Communication — Via Shared Service

```typescript
// services/communication.service.ts
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommunicationService {
  // Subject — no initial value, subscribers only get NEW values
  private messageSource = new Subject<string>();
  message$ = this.messageSource.asObservable();

  // BehaviorSubject — has initial value, new subscribers get LATEST value
  private counterSource = new BehaviorSubject<number>(0);
  counter$ = this.counterSource.asObservable();

  sendMessage(msg: string): void {
    this.messageSource.next(msg);
  }

  updateCounter(value: number): void {
    this.counterSource.next(value);
  }
}
```

```typescript
// Component A — Sends
export class SenderComponent {
  constructor(private commService: CommunicationService) {}

  send(): void {
    this.commService.sendMessage('Hello from Sender!');
    this.commService.updateCounter(42);
  }
}

// Component B — Receives
export class ReceiverComponent implements OnInit, OnDestroy {
  message = '';
  private subscription!: Subscription;

  constructor(private commService: CommunicationService) {}

  ngOnInit(): void {
    this.subscription = this.commService.message$.subscribe(msg => {
      this.message = msg;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // IMPORTANT: Prevent memory leaks!
  }
}

// OR use async pipe (preferred — no manual unsubscribe needed):
```
```html
<p>{{ commService.message$ | async }}</p>
<p>Counter: {{ commService.counter$ | async }}</p>
```

---

### 7.4 Summary of Communication

| Scenario | Method |
|----------|--------|
| Parent → Child | `@Input()` |
| Child → Parent | `@Output()` + `EventEmitter` |
| Sibling ↔ Sibling | Shared Service with `Subject`/`BehaviorSubject` |
| Any ↔ Any | Shared Service |
| Parent → Deep Child | Service (or pass `@Input()` down each level) |

---

## 8. Lifecycle Hooks

Angular calls these methods at specific moments in a component's life.

```typescript
import {
  OnInit, OnChanges, DoCheck, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterViewChecked,
  OnDestroy, SimpleChanges
} from '@angular/core';

export class LifecycleComponent implements
  OnChanges, OnInit, DoCheck, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy
{
  @Input() data: string = '';

  // 1️⃣ Called BEFORE ngOnInit, whenever @Input() properties change
  ngOnChanges(changes: SimpleChanges): void {
    console.log('1. ngOnChanges', changes);
  }

  // 2️⃣ Called ONCE after first ngOnChanges — Component is initialized
  // ⭐ MOST USED — Put initialization logic here (API calls, setup)
  ngOnInit(): void {
    console.log('2. ngOnInit');
  }

  // 3️⃣ Called on every change detection run
  // ⚠️ Use carefully — runs very often
  ngDoCheck(): void {
    console.log('3. ngDoCheck');
  }

  // 4️⃣ Called after ng-content is projected into the component
  ngAfterContentInit(): void {
    console.log('4. ngAfterContentInit');
  }

  // 5️⃣ Called after every check of projected content
  ngAfterContentChecked(): void {
    console.log('5. ngAfterContentChecked');
  }

  // 6️⃣ Called after the component's view (and child views) are initialized
  // ⭐ Access @ViewChild here
  ngAfterViewInit(): void {
    console.log('6. ngAfterViewInit');
  }

  // 7️⃣ Called after every check of the component's view
  ngAfterViewChecked(): void {
    console.log('7. ngAfterViewChecked');
  }

  // 8️⃣ Called ONCE just before Angular destroys the component
  // ⭐ CLEANUP — Unsubscribe observables, detach event listeners, clear timers
  ngOnDestroy(): void {
    console.log('8. ngOnDestroy');
    // this.subscription.unsubscribe();
    // clearInterval(this.timer);
  }
}
```

### Lifecycle Hooks You'll Use Most:

| Hook | When | Use For |
|------|------|---------|
| `ngOnInit` | After first `@Input` set | API calls, initialization logic |
| `ngOnChanges` | When `@Input` values change | React to input changes |
| `ngOnDestroy` | Before component is removed | Cleanup (unsubscribe, timers) |
| `ngAfterViewInit` | After view renders | Access DOM elements, `@ViewChild` |

### Execution Order
```
Constructor → ngOnChanges → ngOnInit → ngDoCheck →
ngAfterContentInit → ngAfterContentChecked →
ngAfterViewInit → ngAfterViewChecked →
(... change detection cycles: ngDoCheck → ngAfterContentChecked → ngAfterViewChecked ...) →
ngOnDestroy
```

> ⚠️ **Don't put logic in the constructor.** Use `ngOnInit` instead. The constructor is for dependency injection only.

---

## 9. Services & Dependency Injection

### What is a Service?
A **class** that encapsulates business logic, API calls, or shared state — keeping components lean.

### Creating a Service
```bash
ng generate service services/user
# shorthand: ng g s services/user
```

```typescript
// services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Interface for type safety
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'  // ← Singleton — available everywhere, no need to add to providers[]
})
export class UserService {

  private apiUrl = 'https://api.example.com/users';

  // Shared state using BehaviorSubject
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  // GET all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // GET single user
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // POST — Create user
  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // PUT — Update user
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  // DELETE
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Business logic
  getAdmins(): Observable<User[]> {
    return this.getUsers().pipe(
      map(users => users.filter(u => u.role === 'admin'))
    );
  }

  // Update shared state
  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  // Non-HTTP utility methods
  isAdmin(user: User): boolean {
    return user.role === 'admin';
  }
}
```

### Injecting a Service into a Component
```typescript
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = '';

  // Inject the service via constructor
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.loading = false;
        console.error(err);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
      },
      error: (err) => console.error(err)
    });
  }
}
```

### `providedIn` Options
```typescript
// Application-wide singleton (RECOMMENDED)
@Injectable({ providedIn: 'root' })

// Provided in a specific module (new instance per module)
@Injectable({ providedIn: SomeModule })

// Not provided anywhere — must add to providers[] manually
@Injectable()
// Then in module: providers: [MyService]
// Or in component: providers: [MyService]  ← new instance per component
```

### Injecting Service into Another Service
```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private userService: UserService,  // Service into service!
    private router: Router
  ) { }
}
```

---

## 10. HTTP Client

### Setup
```typescript
// app.module.ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule]  // Import once in root module
})
```

### All HTTP Methods

```typescript
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {}

  // ─── GET ──────────────────────────────────────
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getOne(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  // GET with query params
  search(term: string, page: number): Observable<User[]> {
    const params = new HttpParams()
      .set('q', term)
      .set('page', page.toString())
      .set('limit', '10');
    // Produces: /users?q=term&page=1&limit=10

    return this.http.get<User[]>(`${this.baseUrl}/users`, { params });
  }

  // GET with custom headers
  getWithAuth(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer my-token',
      'Content-Type': 'application/json'
    });

    return this.http.get<User[]>(`${this.baseUrl}/users`, { headers });
  }

  // ─── POST ─────────────────────────────────────
  create(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  // ─── PUT (full update) ────────────────────────
  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${id}`, user);
  }

  // ─── PATCH (partial update) ───────────────────
  partialUpdate(id: number, changes: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/users/${id}`, changes);
  }

  // ─── DELETE ───────────────────────────────────
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`);
  }

  // ─── GET full response (headers, status code) ─
  getFullResponse(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`, { observe: 'response' });
    // response.headers, response.status, response.body
  }
}
```

### Using HTTP in Components (Two Patterns)

#### Pattern 1: Subscribe in Component
```typescript
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}
```
```html
<div *ngIf="loading">Loading...</div>
<div *ngIf="error" class="error">{{ error }}</div>
<div *ngIf="!loading && !error">
  <div *ngFor="let user of users">{{ user.name }}</div>
</div>
```

#### Pattern 2: Async Pipe (PREFERRED ⭐)
```typescript
export class UserListComponent implements OnInit {
  users$!: Observable<User[]>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }
}
```
```html
<div *ngIf="users$ | async as users; else loading">
  <div *ngFor="let user of users">{{ user.name }}</div>
</div>
<ng-template #loading>
  <p>Loading...</p>
</ng-template>
```

> ⭐ **Why `async` pipe is preferred:** No manual subscribe/unsubscribe. No memory leaks. Cleaner code.

---

### Error Handling in Services with RxJS
```typescript
import { catchError, retry, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.apiUrl).pipe(
    retry(2),                        // Retry failed request up to 2 times
    tap(data => console.log('Fetched users:', data)),  // Side effect (logging)
    catchError(this.handleError)     // Handle errors
  );
}

private handleError(error: any): Observable<never> {
  let errorMessage = 'An error occurred';
  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = error.error.message;
  } else {
    // Server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.error(errorMessage);
  return throwError(() => new Error(errorMessage));
}
```

---

## 11. Routing

### Setup

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // Basic routes
  { path: '', component: HomeComponent },                      // localhost:4200/
  { path: 'about', component: AboutComponent },                // localhost:4200/about

  // Route with parameter
  { path: 'users', component: UserListComponent },             // localhost:4200/users
  { path: 'users/:id', component: UserDetailComponent },       // localhost:4200/users/42

  // Route with guard
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },

  // Route with data
  { path: 'help', component: HelpComponent, data: { title: 'Help Page' } },

  // Redirect
  { path: 'home', redirectTo: '', pathMatch: 'full' },

  // Child routes (nested)
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileSettingsComponent },
      { path: 'security', component: SecuritySettingsComponent },
      { path: 'notifications', component: NotifSettingsComponent }
    ]
  },

  // Lazy loaded module
  {
    path: 'products',
    loadChildren: () => import('./modules/products/products.module')
      .then(m => m.ProductsModule)
  },

  // Wildcard — MUST be last
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### Template — `router-outlet` and Navigation

```html
<!-- app.component.html -->
<nav>
  <!-- routerLink for navigation (don't use href — it causes full reload!) -->
  <a routerLink="/" routerLinkActive="active"
     [routerLinkActiveOptions]="{ exact: true }">Home</a>
  <a routerLink="/about" routerLinkActive="active">About</a>
  <a routerLink="/users" routerLinkActive="active">Users</a>
  <a [routerLink]="['/users', userId]" routerLinkActive="active">User Detail</a>
</nav>

<!-- This is where routed components are rendered -->
<router-outlet></router-outlet>

<!-- For child routes (in settings.component.html): -->
<nav>
  <a routerLink="profile" routerLinkActive="active">Profile</a>
  <a routerLink="security" routerLinkActive="active">Security</a>
</nav>
<router-outlet></router-outlet>  <!-- Nested outlet for child routes -->
```

### Programmatic Navigation

```typescript
import { Router, ActivatedRoute } from '@angular/router';

export class SomeComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  goToHome(): void {
    this.router.navigate(['/']);
  }

  goToUser(id: number): void {
    this.router.navigate(['/users', id]);
    // navigates to: /users/42
  }

  goToUserWithQuery(): void {
    this.router.navigate(['/users'], {
      queryParams: { page: 1, sort: 'name' }
    });
    // navigates to: /users?page=1&sort=name
  }

  goRelative(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // If current route is /users/42, navigates to /users/42/edit
  }

  // Navigate and replace history (can't go back)
  goAndReplace(): void {
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
```

### Reading Route Parameters

```typescript
// For route: { path: 'users/:id', component: UserDetailComponent }
// URL: /users/42?tab=profile#section1

import { ActivatedRoute, ParamMap } from '@angular/router';

export class UserDetailComponent implements OnInit {
  userId!: number;
  tab!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // ─── Option 1: Snapshot (one-time read) ───
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.tab = this.route.snapshot.queryParamMap.get('tab') || 'default';

    // ─── Option 2: Observable (reacts to changes — use when same component
    //     can be navigated to with different params) ───
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = Number(params.get('id'));
      this.loadUser(this.userId);
    });

    this.route.queryParamMap.subscribe(params => {
      this.tab = params.get('tab') || 'default';
    });

    // ─── Read static route data ───
    this.route.data.subscribe(data => {
      console.log('Page title:', data['title']);
    });

    // ─── Read fragment (#section1) ───
    this.route.fragment.subscribe(fragment => {
      console.log('Fragment:', fragment);
    });
  }
}
```

### `routerLinkActive` — Highlight Active Links

```html
<a routerLink="/home"
   routerLinkActive="active-link"
   [routerLinkActiveOptions]="{ exact: true }">
  Home
</a>
```
```css
.active-link {
  color: blue;
  font-weight: bold;
  border-bottom: 2px solid blue;
}
```

---

## 12. Guards

Guards **control access** to routes.

### Types of Guards:
| Guard | Purpose |
|-------|---------|
| `CanActivate` | Can the user navigate TO this route? |
| `CanDeactivate` | Can the user navigate AWAY from this route? |
| `CanActivateChild` | Can the user access child routes? |
| `Resolve` | Pre-fetch data before route activates |
| `CanLoad` | Should the lazy module even be downloaded? |

### `CanActivate` Guard Example

```bash
ng generate guard guards/auth
```

```typescript
// guards/auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> {

    if (this.authService.isLoggedIn()) {
      return true;  // Allow navigation
    }

    // Redirect to login with return URL
    return this.router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }
}
```

### Role-Based Guard
```typescript
@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as string[];
    const userRole = this.authService.getUserRole();

    if (expectedRoles.includes(userRole)) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}

// Usage in routes:
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: ['admin', 'superadmin'] }
}
```

### `CanDeactivate` Guard (Unsaved Changes)
```typescript
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({ providedIn: 'root' })
export class UnsavedChangesGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate): boolean | Observable<boolean> {
    return component.canDeactivate
      ? component.canDeactivate()
      : true;
  }
}

// In component:
export class EditFormComponent implements CanComponentDeactivate {
  formDirty = false;

  canDeactivate(): boolean {
    if (this.formDirty) {
      return confirm('You have unsaved changes. Leave anyway?');
    }
    return true;
  }
}

// In routes:
{ path: 'edit', component: EditFormComponent, canDeactivate: [UnsavedChangesGuard] }
```

### `Resolve` Guard (Pre-fetch Data)
```typescript
@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {
  constructor(private userService: UserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const id = Number(route.paramMap.get('id'));
    return this.userService.getUserById(id).pipe(
      catchError(() => {
        this.router.navigate(['/users']);
        return EMPTY;
      })
    );
  }
}

// In routes:
{
  path: 'users/:id',
  component: UserDetailComponent,
  resolve: { user: UserResolver }
}

// In component — data is already loaded!
export class UserDetailComponent implements OnInit {
  user!: User;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.user = this.route.snapshot.data['user'];
    // OR reactive:
    // this.route.data.subscribe(data => this.user = data['user']);
  }
}
```

---

## 13. Interceptors

Interceptors **modify every HTTP request/response** globally. Perfect for adding auth tokens, logging, error handling.

### Creating an Interceptor

```bash
ng generate interceptor interceptors/auth
```

```typescript
// interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // Get the auth token
    const token = this.authService.getToken();

    // Clone the request and add the token (requests are immutable)
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Pass the modified request to the next handler
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired — logout and redirect
          this.authService.logout();
        }
        return throwError(() => error);
      })
    );
  }
}
```

### Loading Interceptor
```typescript
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();

    return next.handle(req).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
}
```

### Logging Interceptor
```typescript
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    console.log(`→ ${req.method} ${req.url}`);

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          console.log(`← ${req.method} ${req.url} [${event.status}] ${elapsed}ms`);
        }
      })
    );
  }
}
```

### Registering Interceptors

```typescript
// app.module.ts
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [
    // Interceptors run in the ORDER they are provided
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true  // multi: true allows multiple interceptors
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
```

> **Flow:** Request → AuthInterceptor → LoadingInterceptor → LoggingInterceptor → Server
> **Flow:** Response → LoggingInterceptor → LoadingInterceptor → AuthInterceptor → Component

---

## 14. Forms — Template-Driven

Simple forms with logic in the **template** using directives.

> ⚠️ **Requires `FormsModule`** imported in your module.

### Basic Template-Driven Form

```typescript
// component.ts
export class ContactFormComponent {
  user = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    country: '',
    message: '',
    agree: false
  };

  countries = ['USA', 'UK', 'India', 'Germany', 'France'];

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Form data:', this.user);
      console.log('Form value:', form.value);
      // API call here
      form.reset();  // Reset the form
    }
  }
}
```

```html
<!-- component.html -->
<!-- #contactForm="ngForm" creates a template reference to the NgForm instance -->
<form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">

  <!-- TEXT INPUT -->
  <div class="form-group">
    <label for="name">Name</label>
    <input
      type="text"
      id="name"
      name="name"
      [(ngModel)]="user.name"
      #nameField="ngModel"
      required
      minlength="3"
      maxlength="50"
      class="form-control"
      [ngClass]="{ 'is-invalid': nameField.invalid && nameField.touched }">

    <!-- Validation messages -->
    <div *ngIf="nameField.invalid && nameField.touched" class="error">
      <span *ngIf="nameField.errors?.['required']">Name is required.</span>
      <span *ngIf="nameField.errors?.['minlength']">
        Name must be at least {{ nameField.errors?.['minlength'].requiredLength }} characters.
      </span>
    </div>
  </div>

  <!-- EMAIL INPUT -->
  <div class="form-group">
    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      [(ngModel)]="user.email"
      #emailField="ngModel"
      required
      email>

    <div *ngIf="emailField.invalid && emailField.touched" class="error">
      <span *ngIf="emailField.errors?.['required']">Email is required.</span>
      <span *ngIf="emailField.errors?.['email']">Invalid email format.</span>
    </div>
  </div>

  <!-- SELECT / DROPDOWN -->
  <div class="form-group">
    <label for="country">Country</label>
    <select
      id="country"
      name="country"
      [(ngModel)]="user.country"
      #countryField="ngModel"
      required>
      <option value="" disabled>Select a country</option>
      <option *ngFor="let c of countries" [value]="c">{{ c }}</option>
    </select>
  </div>

  <!-- RADIO BUTTONS -->
  <div class="form-group">
    <label>Gender:</label>
    <label>
      <input type="radio" name="gender" [(ngModel)]="user.gender" value="male"> Male
    </label>
    <label>
      <input type="radio" name="gender" [(ngModel)]="user.gender" value="female"> Female
    </label>
  </div>

  <!-- TEXTAREA -->
  <div class="form-group">
    <label for="message">Message</label>
    <textarea
      id="message"
      name="message"
      [(ngModel)]="user.message"
      rows="4"
      required>
    </textarea>
  </div>

  <!-- CHECKBOX -->
  <div class="form-group">
    <label>
      <input type="checkbox" name="agree" [(ngModel)]="user.agree" required>
      I agree to the terms
    </label>
  </div>

  <!-- SUBMIT BUTTON — disabled until form is valid -->
  <button type="submit" [disabled]="contactForm.invalid">Submit</button>

  <!-- Debug (remove in production) -->
  <pre>Form valid: {{ contactForm.valid }}</pre>
  <pre>Form value: {{ contactForm.value | json }}</pre>

</form>
```

### Form & Field States

| State | CSS Class (true) | CSS Class (false) | Meaning |
|-------|-------------------|---------------------|---------|
| Touched | `ng-touched` | `ng-untouched` | User has focused and left the field |
| Dirty | `ng-dirty` | `ng-pristine` | User has changed the value |
| Valid | `ng-valid` | `ng-invalid` | Current value passes all validators |

```css
/* Style invalid + touched fields */
input.ng-invalid.ng-touched {
  border: 2px solid red;
}

input.ng-valid.ng-touched {
  border: 2px solid green;
}
```

### Built-in Validators (Template-Driven)
| Validator | Usage |
|-----------|-------|
| `required` | `<input required>` |
| `minlength` | `<input minlength="3">` |
| `maxlength` | `<input maxlength="100">` |
| `pattern` | `<input pattern="[0-9]{10}">` |
| `email` | `<input email>` |
| `min` | `<input type="number" min="0">` |
| `max` | `<input type="number" max="100">` |

---

## 15. Forms — Reactive

More **scalable**, **testable** approach. Form logic lives in the **TypeScript** class.

> ⚠️ **Requires `ReactiveFormsModule`** imported in your module.

```typescript
// app.module.ts
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [ReactiveFormsModule]
})
```

### Building Blocks
| Class | Usage |
|-------|-------|
| `FormControl` | Single input field |
| `FormGroup` | Group of controls |
| `FormArray` | Dynamic array of controls |
| `FormBuilder` | Helper to create forms (less verbose) |

---

### Basic Reactive Form

```typescript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // ─── Method 1: Without FormBuilder (verbose) ───
    /*
    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
    */

    // ─── Method 2: With FormBuilder (PREFERRED ⭐) ───
    this.registrationForm = this.fb.group({
      // Each field: [defaultValue, [syncValidators], [asyncValidators]]
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      age: [null, [Validators.required, Validators.min(18), Validators.max(120)]],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      agree: [false, Validators.requiredTrue],

      // Nested FormGroup
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zip: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]]
      }),

      // FormArray (dynamic fields)
      hobbies: this.fb.array([])
    });
  }

  // ─── Convenience getters (access in template) ───
  get name() { return this.registrationForm.get('name'); }
  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }
  get address() { return this.registrationForm.get('address') as FormGroup; }
  get hobbies() { return this.registrationForm.get('hobbies') as FormArray; }

  // ─── FormArray methods ───
  addHobby(): void {
    this.hobbies.push(this.fb.control('', Validators.required));
  }

  removeHobby(index: number): void {
    this.hobbies.removeAt(index);
  }

  // ─── Submit ───
  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      // this.registrationForm.reset();
    } else {
      // Mark all fields as touched to show validation errors
      this.registrationForm.markAllAsTouched();
    }
  }

  // ─── Programmatic control ───
  populateForm(): void {
    // setValue — must provide ALL fields
    this.registrationForm.setValue({
      name: 'Alice', email: 'alice@mail.com', password: '12345678',
      confirmPassword: '12345678', age: 25, gender: 'female',
      country: 'USA', agree: true,
      address: { street: '123 Main St', city: 'NYC', zip: '10001' },
      hobbies: []
    });

    // patchValue — can provide PARTIAL fields
    this.registrationForm.patchValue({
      name: 'Bob',
      email: 'bob@mail.com'
    });
  }

  resetForm(): void {
    this.registrationForm.reset();
  }
}
```

### Reactive Form Template

```html
<form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">

  <!-- TEXT INPUT -->
  <div class="form-group">
    <label>Name</label>
    <input type="text" formControlName="name"
           [ngClass]="{ 'is-invalid': name?.invalid && name?.touched }">
    <div *ngIf="name?.invalid && name?.touched" class="error">
      <span *ngIf="name?.errors?.['required']">Name is required.</span>
      <span *ngIf="name?.errors?.['minlength']">
        Minimum {{ name?.errors?.['minlength'].requiredLength }} characters.
      </span>
    </div>
  </div>

  <!-- EMAIL -->
  <div class="form-group">
    <label>Email</label>
    <input type="email" formControlName="email">
    <div *ngIf="email?.invalid && email?.touched" class="error">
      <span *ngIf="email?.errors?.['required']">Email is required.</span>
      <span *ngIf="email?.errors?.['email']">Invalid email.</span>
    </div>
  </div>

  <!-- PASSWORD -->
  <div class="form-group">
    <label>Password</label>
    <input type="password" formControlName="password">
  </div>

  <!-- NUMBER -->
  <div class="form-group">
    <label>Age</label>
    <input type="number" formControlName="age">
  </div>

  <!-- RADIO -->
  <div class="form-group">
    <label><input type="radio" formControlName="gender" value="male"> Male</label>
    <label><input type="radio" formControlName="gender" value="female"> Female</label>
  </div>

  <!-- SELECT -->
  <div class="form-group">
    <label>Country</label>
    <select formControlName="country">
      <option value="">Select...</option>
      <option value="USA">USA</option>
      <option value="UK">UK</option>
      <option value="India">India</option>
    </select>
  </div>

  <!-- CHECKBOX -->
  <div class="form-group">
    <label>
      <input type="checkbox" formControlName="agree"> I agree to terms
    </label>
  </div>

  <!-- NESTED FormGroup -->
  <div formGroupName="address">
    <h3>Address</h3>
    <input type="text" formControlName="street" placeholder="Street">
    <input type="text" formControlName="city" placeholder="City">
    <input type="text" formControlName="zip" placeholder="ZIP Code">
  </div>

  <!-- DYNAMIC FormArray -->
  <div>
    <h3>Hobbies</h3>
    <div formArrayName="hobbies">
      <div *ngFor="let hobby of hobbies.controls; let i = index">
        <input [formControlName]="i" placeholder="Hobby {{ i + 1 }}">
        <button type="button" (click)="removeHobby(i)">Remove</button>
      </div>
    </div>
    <button type="button" (click)="addHobby()">Add Hobby</button>
  </div>

  <button type="submit" [disabled]="registrationForm.invalid">Register</button>

  <!-- Debug -->
  <pre>{{ registrationForm.value | json }}</pre>
  <pre>Valid: {{ registrationForm.valid }}</pre>
</form>
```

### Custom Validators

```typescript
// validators/custom.validators.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// ─── Sync Validator (function) ───
export function noWhitespace(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const hasWhitespace = control.value.trim().length === 0;
    return hasWhitespace ? { whitespace: true } : null;
  };
}

// ─── Password Strength Validator ───
export function strongPassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*]/.test(value);

    const valid = hasUpper && hasLower && hasNumber && hasSpecial;
    return valid ? null : {
      strongPassword: {
        hasUpper, hasLower, hasNumber, hasSpecial
      }
    };
  };
}

// ─── Cross-field Validator (on FormGroup) ───
export function passwordMatch(passwordField: string, confirmField: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordField)?.value;
    const confirm = group.get(confirmField)?.value;
    return password === confirm ? null : { passwordMismatch: true };
  };
}
```

```typescript
// Usage:
this.form = this.fb.group({
  name: ['', [Validators.required, noWhitespace()]],
  password: ['', [Validators.required, strongPassword()]],
  confirmPassword: ['', Validators.required]
}, {
  validators: passwordMatch('password', 'confirmPassword')
});
```

```html
<div *ngIf="form.errors?.['passwordMismatch'] && form.get('confirmPassword')?.touched">
  Passwords do not match!
</div>
```

### Async Validators
```typescript
// Check if email already exists (API call)
export function emailExists(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return userService.checkEmail(control.value).pipe(
      map(exists => exists ? { emailTaken: true } : null),
      catchError(() => of(null))
    );
  };
}

// Usage:
email: ['', [Validators.required, Validators.email], [emailExists(this.userService)]]
//                                                     ↑ Third argument = async validators
```

### Reactive Forms — Useful Methods

```typescript
// Get a control
this.form.get('name')
this.form.get('address.city')           // Nested path

// Set/patch values
this.form.setValue({...})               // Must provide ALL fields
this.form.patchValue({...})             // Can provide partial

// Reset
this.form.reset()
this.form.reset({ name: 'Default' })   // Reset with specific values

// Enable/Disable
this.form.get('email')?.disable()
this.form.get('email')?.enable()

// Mark states
this.form.markAllAsTouched()
this.form.markAsPristine()
this.form.markAsDirty()

// Listen to value changes (returns Observable)
this.form.valueChanges.subscribe(value => console.log(value))
this.form.get('name')?.valueChanges.subscribe(v => console.log('Name:', v))

// Listen to status changes
this.form.statusChanges.subscribe(status => console.log(status))
// status = 'VALID' | 'INVALID' | 'PENDING' (async validation) | 'DISABLED'
```

### Template-Driven vs Reactive — When to Use

| | Template-Driven | Reactive |
|---|---|---|
| **Complexity** | Simple forms (login, contact) | Complex forms (registration, multi-step) |
| **Logic location** | Template (HTML) | Component (TypeScript) |
| **Validation** | Directives in template | Functions in TypeScript |
| **Testing** | Harder | Easier |
| **Dynamic fields** | Difficult | Easy with `FormArray` |
| **Module needed** | `FormsModule` | `ReactiveFormsModule` |
| **Binding** | `[(ngModel)]` | `formControlName` |

---

## 16. Observables & RxJS

### What is an Observable?
An Observable is a **stream of data over time**. Think of it like a Promise, but for **multiple values**.

| | Promise | Observable |
|---|---|---|
| Values | Single | Multiple |
| Lazy? | No (executes immediately) | Yes (only executes when subscribed) |
| Cancelable? | No | Yes (unsubscribe) |
| Operators | `.then()` / `.catch()` | Dozens of operators (map, filter, etc.) |

### Creating Observables

```typescript
import { Observable, of, from, interval, timer, Subject, BehaviorSubject, forkJoin, combineLatest } from 'rxjs';

// ─── of() — emit a set of values ───
const numbers$ = of(1, 2, 3, 4, 5);
const data$ = of({ name: 'Alice' });

// ─── from() — convert array, promise, iterable to Observable ───
const array$ = from([10, 20, 30]);
const promise$ = from(fetch('/api/users'));

// ─── interval() — emit numbers every X ms ───
const counter$ = interval(1000); // 0, 1, 2, 3... every second

// ─── timer() — wait, then emit ───
const delayed$ = timer(3000);          // Emit once after 3 seconds
const repeating$ = timer(0, 1000);     // Emit immediately, then every second

// ─── Custom Observable ───
const custom$ = new Observable(observer => {
  observer.next('Hello');
  observer.next('World');
  setTimeout(() => observer.next('Delayed'), 2000);
  // observer.error(new Error('Something went wrong'));
  // observer.complete();
});
```

### Subscribing to Observables

```typescript
// ─── Modern syntax (Angular 17) ───
this.userService.getUsers().subscribe({
  next: (data) => console.log('Data:', data),
  error: (err) => console.error('Error:', err),
  complete: () => console.log('Complete!')
});

// ─── Store subscription to unsubscribe later ───
import { Subscription } from 'rxjs';

export class MyComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.userService.getUsers().subscribe({
      next: (data) => this.users = data
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();  // PREVENT MEMORY LEAK!
  }
}
```

### Unsubscribe Patterns

```typescript
// ─── Pattern 1: Store individual subscriptions ───
private sub1!: Subscription;
private sub2!: Subscription;

ngOnInit() {
  this.sub1 = this.service.getData().subscribe(...);
  this.sub2 = this.service.getOther().subscribe(...);
}

ngOnDestroy() {
  this.sub1.unsubscribe();
  this.sub2.unsubscribe();
}

// ─── Pattern 2: Subscription.add() ───
private subscriptions = new Subscription();

ngOnInit() {
  this.subscriptions.add(this.service.getData().subscribe(...));
  this.subscriptions.add(this.service.getOther().subscribe(...));
}

ngOnDestroy() {
  this.subscriptions.unsubscribe(); // Unsubscribes ALL at once
}

// ─── Pattern 3: takeUntil() (POPULAR ⭐) ───
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

private destroy$ = new Subject<void>();

ngOnInit() {
  this.service.getData()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => this.data = data);

  this.service.getOther()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => this.other = data);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

// ─── Pattern 4: async pipe (BEST ⭐⭐⭐) ───
// No subscribe needed! No unsubscribe needed!
// data$: Observable<Data> = this.service.getData();
// In template: <div *ngIf="data$ | async as data">{{ data.name }}</div>
```

> **Rule of thumb:**
> - Use `async` pipe whenever possible
> - Use `takeUntil` when you need to subscribe in TypeScript
> - HTTP calls complete automatically after response — technically don't need to unsubscribe, but it's good practice

---

### Key RxJS Operators

#### Transformation Operators

```typescript
import { map, switchMap, mergeMap, concatMap, exhaustMap } from 'rxjs/operators';

// ─── map — transform each emitted value ───
this.userService.getUsers().pipe(
  map(users => users.filter(u => u.active)),
  map(activeUsers => activeUsers.length)
).subscribe(count => console.log('Active users:', count));

// ─── switchMap — map to inner Observable, CANCEL previous ⭐ ───
// Use for: Search typeahead, route param changes
this.route.paramMap.pipe(
  switchMap(params => {
    const id = Number(params.get('id'));
    return this.userService.getUserById(id);
  })
).subscribe(user => this.user = user);

// ─── mergeMap (flatMap) — map to inner Observable, run in PARALLEL ───
// Use for: Actions that can run concurrently (like multiple file uploads)
this.ids$.pipe(
  mergeMap(id => this.http.get(`/api/items/${id}`))
).subscribe(item => console.log(item));

// ─── concatMap — map to inner Observable, run in SEQUENCE ───
// Use for: Order matters (like sequential API calls)
this.actions$.pipe(
  concatMap(action => this.http.post('/api/actions', action))
).subscribe();

// ─── exhaustMap — IGNORE new values while inner Observable is active ───
// Use for: Prevent duplicate form submissions
this.submitClick$.pipe(
  exhaustMap(() => this.http.post('/api/submit', this.formData))
).subscribe();
```

#### Filtering Operators

```typescript
import { filter, first, take, takeUntil, takeWhile, debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';

// ─── filter — only pass values that meet condition ───
numbers$.pipe(
  filter(n => n > 5)
);

// ─── first — take only the first emission ───
this.data$.pipe(first()).subscribe();

// ─── take — take first N emissions then complete ───
counter$.pipe(take(5)).subscribe(); // 0, 1, 2, 3, 4 then completes

// ─── debounceTime — wait for pause in emissions (SEARCH!) ⭐ ───
this.searchControl.valueChanges.pipe(
  debounceTime(300),              // Wait 300ms after user stops typing
  distinctUntilChanged(),         // Only emit if value actually changed
  switchMap(term => this.searchService.search(term))
).subscribe(results => this.results = results);

// ─── skip — skip first N values ───
this.form.valueChanges.pipe(skip(1)).subscribe();  // Skip initial value
```

#### Combination Operators

```typescript
import { forkJoin, combineLatest, merge, zip } from 'rxjs';

// ─── forkJoin — wait for ALL Observables to complete, emit last values ⭐ ───
// Like Promise.all() — perfect for multiple API calls
forkJoin({
  users: this.userService.getUsers(),
  products: this.productService.getProducts(),
  categories: this.categoryService.getCategories()
}).subscribe(({ users, products, categories }) => {
  this.users = users;
  this.products = products;
  this.categories = categories;
  this.loading = false;
});

// ─── combineLatest — emit latest from ALL when ANY emits ───
combineLatest([
  this.filter$,
  this.sort$,
  this.page$
]).pipe(
  switchMap(([filter, sort, page]) =>
    this.api.getItems({ filter, sort, page })
  )
).subscribe(items => this.items = items);

// ─── merge — merge multiple Observables into one ───
merge(
  this.clickStream$,
  this.keyStream$,
  this.touchStream$
).subscribe(event => this.handleInteraction(event));
```

#### Error Handling Operators

```typescript
import { catchError, retry, retryWhen } from 'rxjs/operators';
import { throwError, of, EMPTY } from 'rxjs';

// ─── catchError — handle errors ───
this.http.get('/api/data').pipe(
  catchError(error => {
    console.error('Error:', error);
    return of([]);  // Return fallback value
    // OR: return throwError(() => error);  // Re-throw
    // OR: return EMPTY;  // Complete without emitting
  })
).subscribe(data => this.data = data);

// ─── retry — retry N times on error ───
this.http.get('/api/data').pipe(
  retry(3),
  catchError(err => of('Failed after 3 retries'))
).subscribe();
```

#### Utility Operators

```typescript
import { tap, delay, finalize, startWith, shareReplay } from 'rxjs/operators';

// ─── tap — side effects without modifying stream (logging, debugging) ───
this.http.get('/api/users').pipe(
  tap(data => console.log('Raw data:', data)),
  map(users => users.filter(u => u.active)),
  tap(active => console.log('Active:', active))
).subscribe();

// ─── delay — delay emissions ───
of('Hello').pipe(delay(2000)).subscribe();  // Emits after 2 seconds

// ─── finalize — run code when Observable completes or errors ───
this.http.get('/api/data').pipe(
  finalize(() => this.loading = false)  // Runs whether success or error
).subscribe();

// ─── startWith — prepend a value ───
this.searchResults$.pipe(
  startWith([])  // Start with empty array while loading
);

// ─── shareReplay — cache and replay last N emissions ───
// Prevents multiple HTTP calls when multiple subscribers
this.users$ = this.http.get<User[]>('/api/users').pipe(
  shareReplay(1)  // Cache the last emission
);
```

---

### Subject vs BehaviorSubject vs ReplaySubject

```typescript
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

// ─── Subject — no initial value, no replay ───
const subject = new Subject<string>();
subject.subscribe(v => console.log('A:', v));  // Gets nothing yet
subject.next('Hello');  // A: Hello
subject.subscribe(v => console.log('B:', v));  // Gets nothing (missed 'Hello')
subject.next('World');  // A: World, B: World

// ─── BehaviorSubject — has initial value, replays LATEST to new subscribers ⭐ ───
const behavior = new BehaviorSubject<string>('Initial');
behavior.subscribe(v => console.log('A:', v));  // A: Initial (gets current value)
behavior.next('Hello');  // A: Hello
behavior.subscribe(v => console.log('B:', v));  // B: Hello (gets latest)
behavior.next('World');  // A: World, B: World
console.log(behavior.getValue());  // 'World' (synchronous access)

// ─── ReplaySubject — replays N last values to new subscribers ───
const replay = new ReplaySubject<string>(2);  // Buffer size = 2
replay.next('A');
replay.next('B');
replay.next('C');
replay.subscribe(v => console.log(v));  // B, C (replays last 2)
```

| Type | Initial Value | New Subscriber Gets |
|------|---------------|---------------------|
| `Subject` | No | Nothing (only future values) |
| `BehaviorSubject` | **Yes** (required) | Latest value + future values |
| `ReplaySubject(n)` | No | Last N values + future values |

---

## 17. ViewChild & ContentChild

### `@ViewChild` — Access Child Component / DOM Element

```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  template: `
    <!-- Reference to a DOM element -->
    <input #searchInput type="text">

    <!-- Reference to a child component -->
    <app-child #childComp></app-child>

    <button (click)="focusInput()">Focus</button>
  `
})
export class ParentComponent implements AfterViewInit {
  // Access DOM element
  @ViewChild('searchInput') searchInput!: ElementRef;

  // Access child component instance
  @ViewChild('childComp') childComponent!: ChildComponent;

  // Alternative: access by component type
  @ViewChild(ChildComponent) childByType!: ChildComponent;

  // ⚠️ ViewChild is available from ngAfterViewInit, NOT ngOnInit!
  ngAfterViewInit(): void {
    this.searchInput.nativeElement.focus();
    console.log(this.childComponent.someProperty);
  }

  focusInput(): void {
    this.searchInput.nativeElement.focus();
    this.searchInput.nativeElement.value = 'Focused!';
  }

  callChildMethod(): void {
    this.childComponent.doSomething();  // Call child's public method
  }
}
```

### `@ViewChildren` — Access Multiple Elements
```typescript
import { ViewChildren, QueryList } from '@angular/core';

@ViewChildren('listItem') listItems!: QueryList<ElementRef>;
@ViewChildren(ChildComponent) children!: QueryList<ChildComponent>;

ngAfterViewInit(): void {
  this.listItems.forEach(item => console.log(item.nativeElement.textContent));
  console.log('Total children:', this.children.length);
}
```

### `@ContentChild` — Access Projected Content
```typescript
// Used in a component that uses <ng-content>
@ContentChild('projectedItem') projectedItem!: ElementRef;
@ContentChild(SomeComponent) projectedComponent!: SomeComponent;

ngAfterContentInit(): void {
  // Available after projected content is initialized
  console.log(this.projectedItem);
}
```

---

## 18. ng-content (Content Projection)

Content projection lets you **pass HTML content into a component** from the parent.

### Basic Content Projection
```typescript
// card.component.ts
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <ng-content></ng-content>   <!-- Projected content goes here -->
    </div>
  `,
  styles: [`.card { border: 1px solid #ccc; padding: 16px; border-radius: 8px; }`]
})
export class CardComponent {}
```

```html
<!-- Parent template -->
<app-card>
  <h2>Card Title</h2>
  <p>This content is PROJECTED into the card component.</p>
  <button>Action</button>
</app-card>
```

### Multi-Slot Content Projection
```typescript
// card.component.ts
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <div class="card-header">
        <ng-content select="[card-header]"></ng-content>
      </div>
      <div class="card-body">
        <ng-content select="[card-body]"></ng-content>
      </div>
      <div class="card-footer">
        <ng-content select="[card-footer]"></ng-content>
      </div>
      <!-- Default slot: content that doesn't match any selector -->
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {}
```

```html
<!-- Parent template -->
<app-card>
  <div card-header>
    <h2>My Card Title</h2>
  </div>
  <div card-body>
    <p>Card content goes here.</p>
  </div>
  <div card-footer>
    <button>Save</button>
    <button>Cancel</button>
  </div>
</app-card>
```

### Select Options for `ng-content`
```html
<!-- By attribute -->
<ng-content select="[header]"></ng-content>

<!-- By CSS class -->
<ng-content select=".header"></ng-content>

<!-- By element/component -->
<ng-content select="app-header"></ng-content>
<ng-content select="h2"></ng-content>

<!-- By directive -->
<ng-content select="[appHighlight]"></ng-content>
```

---

## 19. ng-template, ng-container, ng-templateOutlet

### `<ng-template>` — Define Template Without Rendering

`ng-template` content is **NOT rendered by default**. It's a blueprint.

```html
<!-- This will NOT show up in the DOM -->
<ng-template>
  <p>I'm hidden!</p>
</ng-template>

<!-- Used with *ngIf else -->
<div *ngIf="isLoaded; else loadingTmpl">
  Content loaded!
</div>
<ng-template #loadingTmpl>
  <p>Loading...</p>
</ng-template>

<!-- Used with *ngIf then/else -->
<ng-container *ngIf="isLogged; then loggedIn; else loggedOut"></ng-container>
<ng-template #loggedIn><p>Welcome!</p></ng-template>
<ng-template #loggedOut><p>Please log in.</p></ng-template>
```

### `<ng-container>` — Invisible Grouping Element

`ng-container` **does NOT render any DOM element**. It's used to:
1. Apply structural directives without adding extra HTML elements
2. Group elements without a wrapper div

```html
<!-- ❌ Problem: Extra <div> in DOM -->
<div *ngIf="isVisible">
  <span>Hello</span>
</div>

<!-- ✅ Solution: No extra element -->
<ng-container *ngIf="isVisible">
  <span>Hello</span>
</ng-container>

<!-- ✅ Combine *ngIf and *ngFor (can't put both on same element) -->
<ng-container *ngIf="users.length > 0">
  <div *ngFor="let user of users">
    {{ user.name }}
  </div>
</ng-container>

<!-- ✅ Use in tables (where extra divs break structure) -->
<table>
  <tr *ngFor="let user of users">
    <ng-container *ngIf="user.active">
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
    </ng-container>
  </tr>
</table>
```

### `*ngTemplateOutlet` — Render a Template Dynamically

```html
<!-- Define templates -->
<ng-template #greetingTemplate let-name="name" let-age="age">
  <p>Hello, {{ name }}! You are {{ age }} years old.</p>
</ng-template>

<!-- Render the template with context -->
<ng-container *ngTemplateOutlet="greetingTemplate; context: { name: 'Alice', age: 25 }">
</ng-container>
<ng-container *ngTemplateOutlet="greetingTemplate; context: { name: 'Bob', age: 30 }">
</ng-container>
```

### Dynamic Template Selection
```typescript
// component.ts
currentLayout = 'grid';
```

```html
<!-- Define different layouts -->
<ng-template #gridLayout>
  <div class="grid">Grid View Content</div>
</ng-template>

<ng-template #listLayout>
  <div class="list">List View Content</div>
</ng-template>

<!-- Dynamically select template -->
<ng-container *ngTemplateOutlet="currentLayout === 'grid' ? gridLayout : listLayout">
</ng-container>

<button (click)="currentLayout = 'grid'">Grid</button>
<button (click)="currentLayout = 'list'">List</button>
```

### Passing Templates to Components
```typescript
// tab.component.ts
@Component({
  selector: 'app-tab',
  template: `
    <div class="tab-content">
      <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
    </div>
  `
})
export class TabComponent {
  @Input() contentTemplate!: TemplateRef<any>;
}
```

```html
<!-- Parent usage -->
<ng-template #myContent>
  <p>This is tab content!</p>
</ng-template>

<app-tab [contentTemplate]="myContent"></app-tab>
```

---

## 20. Custom Directives

### Attribute Directive — Modify Element Behavior/Appearance

```bash
ng generate directive directives/highlight
```

```typescript
// directives/highlight.directive.ts
import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'   // Used as an attribute
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: string = 'yellow';     // Same name as selector
  @Input() textColor: string = 'black';

  constructor(
    private el: ElementRef,      // Reference to the host element
    private renderer: Renderer2  // Safe way to modify DOM
  ) {}

  ngOnInit(): void {
    // Set default background
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.appHighlight);
  }

  // Listen to host element events
  @HostListener('mouseenter') onMouseEnter(): void {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.appHighlight || 'yellow');
    this.renderer.setStyle(this.el.nativeElement, 'color', this.textColor);
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
    this.renderer.removeStyle(this.el.nativeElement, 'color');
  }

  // Access the event object
  @HostListener('click', ['$event']) onClick(event: MouseEvent): void {
    console.log('Clicked at:', event.clientX, event.clientY);
  }
}
```

```html
<!-- Usage -->
<p appHighlight>Default yellow highlight</p>
<p [appHighlight]="'lightblue'" textColor="white">Blue highlight</p>
<p [appHighlight]="highlightColor">Dynamic color</p>
```

### Structural Directive — Custom *ngIf-like

```typescript
// directives/unless.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'  // Opposite of *ngIf
})
export class UnlessDirective {
  private hasView = false;

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      // Create (show) the template
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      // Remove (hide) the template
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}
```

```html
<!-- Shows when condition is FALSE (opposite of *ngIf) -->
<div *appUnless="isLoggedIn">
  Please log in to continue.
</div>
```

### More Directive Examples

#### Auto-Focus Directive
```typescript
@Directive({ selector: '[appAutoFocus]' })
export class AutoFocusDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
  }
}
```
```html
<input appAutoFocus placeholder="I'm auto-focused!">
```

#### Debounce Click Directive
```typescript
@Directive({ selector: '[appDebounceClick]' })
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input() debounceTime = 500;
  @Output() debounceClick = new EventEmitter();
  private clicks = new Subject();
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.clicks.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(e => this.debounceClick.emit(e));
  }

  @HostListener('click', ['$event'])
  clickEvent(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
```
```html
<button appDebounceClick (debounceClick)="save()" [debounceTime]="300">
  Save
</button>
```

---

## 21. Lazy Loading & Feature Modules

### Feature Module

```bash
ng generate module modules/products --routing
ng generate component modules/products/product-list
ng generate component modules/products/product-detail
```

```typescript
// modules/products/products.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';   // NOT BrowserModule!
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,           // Provides ngIf, ngFor, pipes in feature modules
    ProductsRoutingModule   // Feature routing
  ]
})
export class ProductsModule { }
```

```typescript
// modules/products/products-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProductListComponent },      // /products
  { path: ':id', component: ProductDetailComponent }   // /products/42
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // forChild, NOT forRoot!
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
```

### Lazy Loading in App Routing

```typescript
// app-routing.module.ts
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products',
    loadChildren: () => import('./modules/products/products.module')
      .then(m => m.ProductsModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module')
      .then(m => m.AdminModule),
    canLoad: [AuthGuard]   // Guard before even downloading the module
  }
];
```

> **Benefit:** The products module JS bundle is only downloaded when the user navigates to `/products`. Faster initial load!

### `CommonModule` vs `BrowserModule`

| | `BrowserModule` | `CommonModule` |
|---|---|---|
| Import in | Root module ONLY | Feature modules |
| Provides | `CommonModule` + browser-specific bootstrapping | `ngIf`, `ngFor`, pipes, etc. |
| Import more than once? | ❌ NO | ✅ YES |

### Shared Module Pattern
```typescript
// shared/shared.module.ts
@NgModule({
  declarations: [
    TruncatePipe,
    HighlightDirective,
    CardComponent,
    LoadingSpinnerComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    // Re-export everything that feature modules need
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TruncatePipe,
    HighlightDirective,
    CardComponent,
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }

// Then in feature modules:
@NgModule({
  imports: [SharedModule]  // Gets everything!
})
export class ProductsModule { }
```

---

## 22. Error Handling Patterns

### Global Error Handler
```typescript
// error-handler.ts
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('Global Error:', error);
    // Send to error tracking service (Sentry, etc.)
    // Show user-friendly notification
  }
}

// app.module.ts
@NgModule({
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
})
```

### Loading / Error Pattern in Components
```typescript
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users. Please try again.';
        this.loading = false;
      }
    });
  }
}
```

```html
<!-- Loading state -->
<div *ngIf="loading" class="spinner">Loading...</div>

<!-- Error state -->
<div *ngIf="error" class="error-message">
  <p>{{ error }}</p>
  <button (click)="loadUsers()">Retry</button>
</div>

<!-- Success state -->
<div *ngIf="!loading && !error">
  <div *ngIf="users.length === 0">No users found.</div>
  <div *ngFor="let user of users">{{ user.name }}</div>
</div>
```

---

## 23. Best Practices & Cheat Sheet

### CLI Commands Reference
```bash
# Generate
ng g c components/user-list       # Component
ng g s services/user              # Service
ng g p pipes/truncate             # Pipe
ng g d directives/highlight       # Directive
ng g g guards/auth                # Guard
ng g i models/user                # Interface
ng g m modules/products --routing # Module with routing
ng g interceptor interceptors/auth # Interceptor

# Build & Serve
ng serve                          # Dev server (localhost:4200)
ng serve --port 3000              # Custom port
ng build                          # Production build
ng build --configuration=production

# Other
ng test                           # Run unit tests
ng lint                           # Lint the project
ng update                         # Update Angular
```

### Best Practices Summary

```
1. COMPONENTS
   ✅ Keep components small and focused (single responsibility)
   ✅ Use OnPush change detection for performance-critical components
   ✅ Use trackBy with *ngFor
   ❌ Don't put business logic in components — use services

2. SERVICES
   ✅ Use providedIn: 'root' for singletons
   ✅ Keep HTTP calls in services, NOT components
   ✅ Return Observables from services, let consumers subscribe

3. SUBSCRIPTIONS
   ✅ Use async pipe whenever possible
   ✅ Use takeUntil pattern when subscribing in TypeScript
   ❌ Don't forget to unsubscribe — memory leaks!

4. FORMS
   ✅ Use Reactive Forms for complex forms
   ✅ Use Template-Driven for simple forms
   ✅ Create reusable custom validators

5. TEMPLATES
   ✅ Use ng-container to avoid extra DOM elements
   ✅ Use ng-content for reusable components
   ❌ Don't call methods in templates that do heavy work
      (they run on every change detection cycle)

6. MODULES
   ✅ Create a SharedModule for common components/pipes/directives
   ✅ Use lazy loading for feature modules
   ✅ Import CommonModule (not BrowserModule) in feature modules

7. TYPING
   ✅ Define interfaces for all data models
   ✅ Avoid 'any' — use proper types
   ✅ Use strict TypeScript settings
```

### Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `Can't bind to 'ngModel'` | Import `FormsModule` in your module |
| `Can't bind to 'formGroup'` | Import `ReactiveFormsModule` |
| `Can't bind to 'ngForOf'` | Import `CommonModule` or `BrowserModule` |
| `No provider for HttpClient` | Import `HttpClientModule` |
| `Component is not part of any NgModule` | Add to `declarations` in a module |
| `ExpressionChangedAfterItHasBeenCheckedError` | Move logic to `ngAfterViewInit` or use `setTimeout` |
| `Two structural directives on one element` | Use `ng-container` to separate them |

### Template Syntax Quick Reference

```html
<!-- INTERPOLATION -->
{{ expression }}

<!-- PROPERTY BINDING -->
[property]="expression"

<!-- EVENT BINDING -->
(event)="handler($event)"

<!-- TWO-WAY BINDING -->
[(ngModel)]="property"

<!-- STRUCTURAL DIRECTIVES -->
*ngIf="condition"
*ngIf="condition; else elseBlock"
*ngFor="let item of items; let i = index; trackBy: trackFn"
[ngSwitch]="value"  *ngSwitchCase="'x'"  *ngSwitchDefault

<!-- ATTRIBUTE DIRECTIVES -->
[ngClass]="{ 'class': condition }"
[ngStyle]="{ 'prop': value }"

<!-- PIPES -->
{{ value | pipe }}
{{ value | pipe:arg1:arg2 }}

<!-- TEMPLATE REFERENCES -->
#refName
@ViewChild('refName')

<!-- CONTENT PROJECTION -->
<ng-content></ng-content>
<ng-content select="[slot]"></ng-content>

<!-- TEMPLATE + CONTAINER -->
<ng-template #name>...</ng-template>
<ng-container *ngTemplateOutlet="name; context: obj"></ng-container>
```

---

> **🎯 Learning Path:**
> 1. Components + Data Binding
> 2. Directives (`*ngIf`, `*ngFor`)
> 3. Services + Dependency Injection
> 4. HTTP Client + Pipes
> 5. Routing
> 6. Forms
> 7. Component Communication (@Input/@Output)
> 8. Observables & RxJS
> 9. Guards & Interceptors
> 10. Lazy Loading & Feature Modules
> 11. Advanced (ng-content, ng-template, custom directives)
