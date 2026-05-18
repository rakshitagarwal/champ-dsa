## React to Angular Transition Guide

---

## Table of Contents

1. [Angular vs React - Key Differences](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#angular-vs-react---key-differences)
2. [Angular Fundamentals](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#angular-fundamentals)
3. [Components](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#components)
4. [Data Binding](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#data-binding)
5. [Directives](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#directives)
6. [Services & Dependency Injection](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#services--dependency-injection)
7. [Routing](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#routing)
8. [Forms](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#forms)
9. [HTTP & API Calls](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#http--api-calls)
10. [State Management](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#state-management)
11. [RxJS & Observables](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#rxjs--observables)
12. [Lifecycle Hooks](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#lifecycle-hooks)
13. [Pipes](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#pipes)
14. [Interview Questions](https://claude.ai/chat/39cac185-493a-4b6e-bdb8-051a768d59d1#angular-interview-questions)

---

## Angular vs React - Key Differences

### Comparison Table

| Feature              | React                   | Angular                        |
| -------------------- | ----------------------- | ------------------------------ |
| **Type**             | Library                 | Full Framework                 |
| **Language**         | JavaScript/JSX          | TypeScript (mandatory)         |
| **Architecture**     | Component-based         | MVC/Component-based            |
| **Data Binding**     | One-way (mostly)        | Two-way binding                |
| **DOM**              | Virtual DOM             | Real DOM with change detection |
| **Learning Curve**   | Moderate                | Steep                          |
| **State Management** | Context/Redux/Zustand   | Services/NgRx                  |
| **Routing**          | React Router (separate) | Built-in Router                |
| **Forms**            | Controlled/Uncontrolled | Template-driven/Reactive       |
| **CLI**              | Create React App        | Angular CLI (powerful)         |
| **Mobile**           | React Native            | Ionic/NativeScript             |
| **Size**             | Smaller                 | Larger bundle                  |

### Philosophy Differences

**React:**

- "Just JavaScript" - minimal abstraction
- Composition over inheritance
- Flexible, choose your tools
- Functional programming focus

**Angular:**

- "Opinionated framework" - structured approach
- Everything included (routing, HTTP, forms)
- Dependency injection
- Object-oriented programming focus

---

## Angular Fundamentals

### 1. Project Structure

```
my-angular-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   ├── guards/
│   │   ├── pipes/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── assets/
│   ├── environments/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
└── tsconfig.json

```

### 2. Angular CLI Commands

```bash
# Install Angular CLI
npm install -g @angular/cli

# Create new project
ng new my-app

# Generate components
ng generate component user-list
# or shorthand
ng g c user-list

# Generate service
ng generate service user
ng g s user

# Generate module
ng generate module admin
ng g m admin

# Generate guard
ng generate guard auth
ng g g auth

# Generate pipe
ng generate pipe custom-date
ng g p custom-date

# Run development server
ng serve
ng serve --open  # opens browser automatically

# Build for production
ng build --prod

# Run tests
ng test

# Run e2e tests
ng e2e

```

### 3. TypeScript Basics for Angular

```tsx
// Type annotations
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let items: string[] = ["a", "b", "c"];
let user: { name: string; age: number } = { name: "John", age: 30 };

// Interface
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // optional
  readonly createdAt: Date; // readonly
}

const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com",
  createdAt: new Date(),
};

// Class
class Person {
  // Properties
  private id: number;
  public name: string;
  protected age: number;

  // Constructor shorthand
  constructor(
    public email: string,
    private password: string,
  ) {}

  // Method
  greet(): string {
    return `Hello, ${this.name}`;
  }

  // Getter
  get fullInfo(): string {
    return `${this.name} (${this.email})`;
  }

  // Setter
  set userAge(age: number) {
    if (age > 0) this.age = age;
  }
}

// Generics
function identity<T>(arg: T): T {
  return arg;
}

// Enum
enum UserRole {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}

// Union types
type Status = "active" | "inactive" | "pending";

// Type alias
type UserResponse = {
  data: User;
  message: string;
};
```

---

## Components

### Basic Component Structure

**React:**

```jsx
import { useState, useEffect } from "react";

function UserComponent({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  return (
    <div className="user">
      <h2>{user?.name}</h2>
    </div>
  );
}
```

**Angular:**

```tsx
// user.component.ts
import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  @Input() userId: number;
  user: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUser(this.userId)
      .subscribe((user) => (this.user = user));
  }
}
```

```html
<!-- user.component.html -->
<div class="user">
  <h2>{{ user?.name }}</h2>
</div>
```

```css
/* user.component.css */
.user {
  padding: 20px;
  border: 1px solid #ccc;
}
```

### Component Communication

### Parent to Child (Props vs @Input)

**React:**

```jsx
function Parent() {
  return <Child name="John" age={30} />;
}

function Child({ name, age }) {
  return (
    <div>
      {name} - {age}
    </div>
  );
}
```

**Angular:**

```tsx
// parent.component.ts
@Component({
  selector: "app-parent",
  template: '<app-child [name]="userName" [age]="userAge"></app-child>',
})
export class ParentComponent {
  userName = "John";
  userAge = 30;
}

// child.component.ts
@Component({
  selector: "app-child",
  template: "<div>{{ name }} - {{ age }}</div>",
})
export class ChildComponent {
  @Input() name: string;
  @Input() age: number;
}
```

### Child to Parent (Callbacks vs @Output)

**React:**

```jsx
function Parent() {
  const handleClick = (data) => console.log(data);
  return <Child onButtonClick={handleClick} />;
}

function Child({ onButtonClick }) {
  return <button onClick={() => onButtonClick("data")}>Click</button>;
}
```

**Angular:**

```tsx
// parent.component.ts
@Component({
  selector: "app-parent",
  template: '<app-child (buttonClick)="handleClick($event)"></app-child>',
})
export class ParentComponent {
  handleClick(data: string): void {
    console.log(data);
  }
}

// child.component.ts
import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-child",
  template: '<button (click)="onClick()">Click</button>',
})
export class ChildComponent {
  @Output() buttonClick = new EventEmitter<string>();

  onClick(): void {
    this.buttonClick.emit("data");
  }
}
```

### Component with Input/Output Example

```tsx
// counter.component.ts
import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-counter",
  template: `
    <div class="counter">
      <h3>{{ title }}</h3>
      <p>Count: {{ count }}</p>
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
      <button (click)="reset()">Reset</button>
    </div>
  `,
  styles: [
    `
      .counter {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
      }
      button {
        margin: 5px;
      }
    `,
  ],
})
export class CounterComponent {
  @Input() title: string = "Counter";
  @Input() initialValue: number = 0;
  @Output() countChange = new EventEmitter<number>();

  count: number = 0;

  ngOnInit() {
    this.count = this.initialValue;
  }

  increment(): void {
    this.count++;
    this.countChange.emit(this.count);
  }

  decrement(): void {
    this.count--;
    this.countChange.emit(this.count);
  }

  reset(): void {
    this.count = this.initialValue;
    this.countChange.emit(this.count);
  }
}
```

Usage:

```html
<app-counter
  [title]="'My Counter'"
  [initialValue]="10"
  (countChange)="onCountChange($event)"
>
</app-counter>
```

---

## Data Binding

### 1. Interpolation (One-way: Component → View)

```tsx
@Component({
  selector: "app-user",
  template: `
    <h1>{{ title }}</h1>
    <p>{{ user.name }}</p>
    <p>{{ getFullName() }}</p>
    <p>{{ 2 + 2 }}</p>
    <p>{{ isActive ? "Active" : "Inactive" }}</p>
  `,
})
export class UserComponent {
  title = "User Profile";
  user = { name: "John", lastName: "Doe" };
  isActive = true;

  getFullName(): string {
    return `${this.user.name} ${this.user.lastName}`;
  }
}
```

### 2. Property Binding (One-way: Component → View)

```html
<!-- Bind to element property -->
<img [src]="imageUrl" />
<button [disabled]="isDisabled">Click</button>
<div [class.active]="isActive">Content</div>
<div [style.color]="textColor">Colored text</div>

<!-- Multiple classes -->
<div [ngClass]="{ 'active': isActive, 'disabled': isDisabled }">Content</div>

<!-- Multiple styles -->
<div [ngStyle]="{ 'color': textColor, 'font-size': fontSize + 'px' }">Text</div>

<!-- Attribute binding (for attributes without corresponding DOM properties) -->
<button [attr.aria-label]="buttonLabel">Click</button>
```

```tsx
@Component({
  selector: "app-example",
  templateUrl: "./example.component.html",
})
export class ExampleComponent {
  imageUrl = "assets/logo.png";
  isDisabled = false;
  isActive = true;
  textColor = "blue";
  fontSize = 16;
  buttonLabel = "Submit form";
}
```

### 3. Event Binding (One-way: View → Component)

```html
<!-- Click event -->
<button (click)="handleClick()">Click</button>

<!-- With $event object -->
<button (click)="handleClick($event)">Click</button>

<!-- Input event -->
<input (input)="onInput($event)" />

<!-- Other events -->
<div (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">Hover me</div>

<form (submit)="onSubmit($event)">
  <input type="text" (focus)="onFocus()" (blur)="onBlur()" />
  <button type="submit">Submit</button>
</form>
```

```tsx
@Component({
  selector: "app-example",
  templateUrl: "./example.component.html",
})
export class ExampleComponent {
  handleClick(event?: MouseEvent): void {
    console.log("Button clicked", event);
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    console.log("Input value:", value);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log("Form submitted");
  }

  onFocus(): void {
    console.log("Input focused");
  }

  onBlur(): void {
    console.log("Input blurred");
  }
}
```

### 4. Two-Way Binding (Component ↔ View)

**React equivalent:**

```jsx
const [name, setName] = useState("");
<input value={name} onChange={(e) => setName(e.target.value)} />;
```

**Angular:**

```html
<!-- Two-way binding with ngModel -->
<input [(ngModel)]="name" />
<p>Hello, {{ name }}!</p>

<!-- Equivalent to: -->
<input [ngModel]="name" (ngModelChange)="name = $event" />

<!-- Multiple inputs -->
<form>
  <input [(ngModel)]="user.name" name="name" />
  <input [(ngModel)]="user.email" name="email" />
  <input type="number" [(ngModel)]="user.age" name="age" />
</form>

<pre>{{ user | json }}</pre>
```

```tsx
import { Component } from "@angular/core";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
})
export class FormComponent {
  name = "";
  user = {
    name: "",
    email: "",
    age: 0,
  };
}
```

**Note:** You need to import `FormsModule` in your module:

```tsx
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [FormsModule],
})
export class AppModule {}
```

---

## Directives

Directives are instructions to the DOM. Angular has three types:

### 1. Structural Directives (Change DOM structure)

### ngIf

**React:**

```jsx
{
  isLoggedIn && <Dashboard />;
}
{
  isLoggedIn ? <Dashboard /> : <Login />;
}
```

**Angular:**

```html
<!-- Simple condition -->
<div *ngIf="isLoggedIn">
  <h2>Welcome!</h2>
</div>

<!-- With else -->
<div *ngIf="isLoggedIn; else loginTemplate">
  <h2>Dashboard</h2>
</div>
<ng-template #loginTemplate>
  <h2>Please log in</h2>
</ng-template>

<!-- With then/else -->
<div *ngIf="user; then userTemplate else guestTemplate"></div>
<ng-template #userTemplate>
  <p>Welcome {{ user.name }}</p>
</ng-template>
<ng-template #guestTemplate>
  <p>Please sign in</p>
</ng-template>

<!-- With as (storing result) -->
<div *ngIf="user$ | async as user">{{ user.name }}</div>
```

### ngFor

**React:**

```jsx
{
  users.map((user) => <div key={user.id}>{user.name}</div>);
}
```

**Angular:**

```html
<!-- Basic loop -->
<div *ngFor="let user of users">{{ user.name }}</div>

<!-- With index -->
<div *ngFor="let user of users; let i = index">
  {{ i + 1 }}. {{ user.name }}
</div>

<!-- With trackBy (like React key) -->
<div *ngFor="let user of users; trackBy: trackByUserId">{{ user.name }}</div>

<!-- All available variables -->
<div
  *ngFor="let item of items;
             let i = index;
             let first = first;
             let last = last;
             let even = even;
             let odd = odd"
>
  {{ i }} - {{ item }} (First: {{ first }}, Last: {{ last }})
</div>
```

```tsx
@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
})
export class UserListComponent {
  users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
  ];

  trackByUserId(index: number, user: any): number {
    return user.id;
  }
}
```

### ngSwitch

**React:**

```jsx
{
  status === "loading" && <Spinner />;
}
{
  status === "success" && <Content />;
}
{
  status === "error" && <Error />;
}
```

**Angular:**

```html
<div [ngSwitch]="status">
  <div *ngSwitchCase="'loading'">Loading...</div>
  <div *ngSwitchCase="'success'">Content loaded!</div>
  <div *ngSwitchCase="'error'">Error occurred</div>
  <div *ngSwitchDefault>Unknown status</div>
</div>
```

### 2. Attribute Directives (Change appearance/behavior)

```html
<!-- ngClass -->
<div [ngClass]="'my-class'">Single class</div>
<div [ngClass]="['class1', 'class2']">Multiple classes</div>
<div [ngClass]="{ 'active': isActive, 'disabled': isDisabled }">
  Conditional classes
</div>

<!-- ngStyle -->
<div [ngStyle]="{ 'color': color, 'font-size': fontSize + 'px' }">
  Styled text
</div>

<!-- ngModel (two-way binding) -->
<input [(ngModel)]="name" />
```

### 3. Custom Directives

**Attribute Directive Example:**

```tsx
// highlight.directive.ts
import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  @Input() appHighlight = "yellow";
  @Input() defaultColor = "transparent";

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.backgroundColor = this.defaultColor;
  }

  @HostListener("mouseenter") onMouseEnter() {
    this.highlight(this.appHighlight);
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.highlight(this.defaultColor);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

Usage:

```html
<p appHighlight>Highlight me (default yellow)</p>
<p [appHighlight]="'lightblue'" defaultColor="white">Custom highlight</p>
```

**Structural Directive Example:**

```tsx
// unless.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appUnless]",
})
export class UnlessDirective {
  private hasView = false;

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {}
}
```

Usage:

```html
<div *appUnless="isLoggedIn">Please log in to continue</div>
```

---

## Services & Dependency Injection

**React Context equivalent:**

```jsx
const UserContext = createContext();
const { user } = useContext(UserContext);
```

**Angular Service:**

```tsx
// user.service.ts
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root", // Available app-wide (singleton)
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }

  setUser(user: User): void {
    this.userSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }
}
```

**Using Service in Component:**

```tsx
// user.component.ts
import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
})
export class UserComponent implements OnInit {
  user: User | null = null;

  // Dependency Injection via constructor
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser(1).subscribe(
      (user) => (this.user = user),
      (error) => console.error(error),
    );

    // Subscribe to user changes
    this.userService.user$.subscribe((user) => {
      console.log("User changed:", user);
    });
  }
}
```

### Service Scopes

```tsx
// App-wide singleton (recommended)
@Injectable({
  providedIn: "root",
})
export class AppService {}

// Module-level
@Injectable({
  providedIn: SomeModule,
})
export class ModuleService {}

// Component-level (new instance per component)
@Component({
  selector: "app-example",
  providers: [ComponentService], // Each component instance gets new service
})
export class ExampleComponent {}
```

### Common Service Patterns

```tsx
// data.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private apiUrl = "http://localhost:3000/api";
  private dataSubject = new BehaviorSubject<any[]>([]);
  public data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  // GET all
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/items`).pipe(
      tap((data) => this.dataSubject.next(data)),
      catchError(this.handleError),
    );
  }

  // GET by id
  getById(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/items/${id}`)
      .pipe(catchError(this.handleError));
  }

  // POST
  create(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/items`, item).pipe(
      tap((newItem) => {
        const current = this.dataSubject.value;
        this.dataSubject.next([...current, newItem]);
      }),
      catchError(this.handleError),
    );
  }

  // PUT
  update(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/items/${id}`, item).pipe(
      tap((updated) => {
        const current = this.dataSubject.value;
        const index = current.findIndex((i) => i.id === id);
        if (index !== -1) {
          current[index] = updated;
          this.dataSubject.next([...current]);
        }
      }),
      catchError(this.handleError),
    );
  }

  // DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/items/${id}`).pipe(
      tap(() => {
        const current = this.dataSubject.value;
        this.dataSubject.next(current.filter((i) => i.id !== id));
      }),
      catchError(this.handleError),
    );
  }

  private handleError(error: any) {
    console.error("An error occurred:", error);
    return throwError(() => new Error(error.message || "Server error"));
  }
}
```

---

## Routing

**React Router:**

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users/:id" element={<User />} />
  </Routes>
</BrowserRouter>
```

**Angular Router:**

### Setup

```tsx
// app-routing.module.ts
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "users", component: UserListComponent },
  { path: "users/:id", component: UserDetailComponent },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard], // Route guard
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule), // Lazy loading
  },
  { path: "**", component: NotFoundComponent }, // 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

```html
<!-- app.component.html -->
<nav>
  <a
    routerLink="/"
    routerLinkActive="active"
    [routerLinkActiveOptions]="{exact: true}"
    >Home</a
  >
  <a routerLink="/users" routerLinkActive="active">Users</a>
  <a routerLink="/admin" routerLinkActive="active">Admin</a>
</nav>

<!-- Outlet where routed components render -->
<router-outlet></router-outlet>
```

### Programmatic Navigation

```tsx
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-example",
  templateUrl: "./example.component.html",
})
export class ExampleComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  goToUser(id: number): void {
    // Navigate to route
    this.router.navigate(["/users", id]);
  }

  goToUserRelative(id: number): void {
    // Navigate relative to current route
    this.router.navigate(["../", id], { relativeTo: this.route });
  }

  goWithQueryParams(): void {
    // Navigate with query params
    this.router.navigate(["/users"], {
      queryParams: { page: 1, sort: "name" },
    });
    // Result: /users?page=1&sort=name
  }

  goBack(): void {
    // Go back in history
    window.history.back();
  }
}
```

### Reading Route Parameters

```tsx
// user-detail.component.ts
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-user-detail",
  template: `
    <div *ngIf="user">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>
  `,
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    // Option 1: Snapshot (non-reactive)
    const id = this.route.snapshot.paramMap.get("id");

    // Option 2: Observable (reactive - updates when params change)
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id = +params.get("id")!;
          return this.userService.getUser(id);
        }),
      )
      .subscribe((user) => (this.user = user));

    // Read query params
    this.route.queryParamMap.subscribe((params) => {
      const page = params.get("page");
      const sort = params.get("sort");
    });
  }
}
```

### Route Guards

```tsx
// auth.guard.ts
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Redirect to login
    return this.router.createUrlTree(["/login"], {
      queryParams: { returnUrl: state.url },
    });
  }
}

// Can also use CanActivateChild, CanDeactivate, CanLoad
```

### Child Routes

```tsx
const routes: Routes = [
  {
    path: "products",
    component: ProductsComponent,
    children: [
      { path: "", component: ProductListComponent },
      { path: ":id", component: ProductDetailComponent },
      { path: ":id/edit", component: ProductEditComponent },
    ],
  },
];
```

```html
<!-- products.component.html -->
<div class="products-layout">
  <aside>Sidebar</aside>
  <main>
    <router-outlet></router-outlet>
    <!-- Child routes render here -->
  </main>
</div>
```

---

## Forms

### 1. Template-Driven Forms (like React controlled components)

```tsx
// app.module.ts
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [FormsModule],
})
export class AppModule {}
```

```html
<!-- template-form.component.html -->
<form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">
  <div>
    <label>Name:</label>
    <input
      type="text"
      name="name"
      [(ngModel)]="user.name"
      required
      minlength="3"
      #name="ngModel"
    />
    <div *ngIf="name.invalid && (name.dirty || name.touched)">
      <small *ngIf="name.errors?.['required']">Name is required</small>
      <small *ngIf="name.errors?.['minlength']">Min 3 characters</small>
    </div>
  </div>

  <div>
    <label>Email:</label>
    <input
      type="email"
      name="email"
      [(ngModel)]="user.email"
      required
      email
      #email="ngModel"
    />
    <div *ngIf="email.invalid && email.touched">
      <small *ngIf="email.errors?.['required']">Email is required</small>
      <small *ngIf="email.errors?.['email']">Invalid email</small>
    </div>
  </div>

  <div>
    <label>Age:</label>
    <input type="number" name="age" [(ngModel)]="user.age" min="18" max="100" />
  </div>

  <button type="submit" [disabled]="userForm.invalid">Submit</button>
</form>

<pre>{{ user | json }}</pre>
<pre>Form Valid: {{ userForm.valid }}</pre>
```

```tsx
// template-form.component.ts
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-template-form",
  templateUrl: "./template-form.component.html",
})
export class TemplateFormComponent {
  user = {
    name: "",
    email: "",
    age: 0,
  };

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log("Form submitted:", this.user);
      // Make API call
    }
  }
}
```

### 2. Reactive Forms (recommended for complex forms)

```tsx
// app.module.ts
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [ReactiveFormsModule],
})
export class AppModule {}
```

```tsx
// reactive-form.component.ts
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-reactive-form",
  templateUrl: "./reactive-form.component.html",
})
export class ReactiveFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Method 1: Using FormBuilder (recommended)
    this.userForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      age: [0, [Validators.min(18), Validators.max(100)]],
      address: this.fb.group({
        street: [""],
        city: [""],
        zipcode: [""],
      }),
    });

    // Method 2: Using FormControl directly
    // this.userForm = new FormGroup({
    //   name: new FormControl('', [Validators.required]),
    //   email: new FormControl('', [Validators.required, Validators.email])
    // });

    // Listen to value changes
    this.userForm.valueChanges.subscribe((value) => {
      console.log("Form value changed:", value);
    });

    // Listen to specific field
    this.userForm.get("name")?.valueChanges.subscribe((value) => {
      console.log("Name changed:", value);
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log("Form submitted:", this.userForm.value);
      // API call
    } else {
      this.markFormGroupTouched(this.userForm);
    }
  }

  // Helper to mark all fields as touched (show all errors)
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Getters for easier template access
  get name() {
    return this.userForm.get("name");
  }
  get email() {
    return this.userForm.get("email");
  }
  get age() {
    return this.userForm.get("age");
  }
}
```

```html
<!-- reactive-form.component.html -->
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <div>
    <label>Name:</label>
    <input type="text" formControlName="name" />
    <div *ngIf="name?.invalid && (name?.dirty || name?.touched)">
      <small *ngIf="name?.errors?.['required']">Name is required</small>
      <small *ngIf="name?.errors?.['minlength']">
        Min {{ name?.errors?.['minlength'].requiredLength }} characters
      </small>
    </div>
  </div>

  <div>
    <label>Email:</label>
    <input type="email" formControlName="email" />
    <div *ngIf="email?.invalid && email?.touched">
      <small *ngIf="email?.errors?.['required']">Email is required</small>
      <small *ngIf="email?.errors?.['email']">Invalid email</small>
    </div>
  </div>

  <div>
    <label>Age:</label>
    <input type="number" formControlName="age" />
  </div>

  <!-- Nested form group -->
  <div formGroupName="address">
    <h3>Address</h3>
    <input type="text" formControlName="street" placeholder="Street" />
    <input type="text" formControlName="city" placeholder="City" />
    <input type="text" formControlName="zipcode" placeholder="Zipcode" />
  </div>

  <button type="submit" [disabled]="userForm.invalid">Submit</button>
</form>

<pre>{{ userForm.value | json }}</pre>
<pre>Form Valid: {{ userForm.valid }}</pre>
```

### Custom Validators

```tsx
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// Simple custom validator
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

// Password match validator
export function passwordMatchValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const password = control.get("password");
  const confirmPassword = control.get("confirmPassword");

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword.value
    ? null
    : { passwordMismatch: true };
}

// Usage
this.userForm = this.fb.group({
  username: ["", [Validators.required, forbiddenNameValidator(/admin/i)]],
  passwords: this.fb.group(
    {
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required],
    },
    { validators: passwordMatchValidator },
  ),
});
```

### Dynamic FormArray

```tsx
import { FormArray } from "@angular/forms";

@Component({
  selector: "app-dynamic-form",
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div formArrayName="skills">
        <div *ngFor="let skill of skills.controls; let i = index">
          <input [formControlName]="i" placeholder="Skill {{ i + 1 }}" />
          <button type="button" (click)="removeSkill(i)">Remove</button>
        </div>
      </div>
      <button type="button" (click)="addSkill()">Add Skill</button>
      <button type="submit">Submit</button>
    </form>
  `,
})
export class DynamicFormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      skills: this.fb.array([this.fb.control("JavaScript")]),
    });
  }

  get skills(): FormArray {
    return this.form.get("skills") as FormArray;
  }

  addSkill(): void {
    this.skills.push(this.fb.control(""));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
```

---

## HTTP & API Calls

```tsx
// app.module.ts
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [HttpClientModule],
})
export class AppModule {}
```

### Basic HTTP Service

```tsx
// api.service.ts
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry, tap, map } from "rxjs/operators";

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl = "http://localhost:3000/api";

  constructor(private http: HttpClient) {}

  // GET all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      retry(3), // Retry failed request 3 times
      tap((users) => console.log("Fetched users:", users)),
      catchError(this.handleError),
    );
  }

  // GET user by id
  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.apiUrl}/users/${id}`)
      .pipe(catchError(this.handleError));
  }

  // GET with query params
  searchUsers(query: string, page: number = 1): Observable<User[]> {
    const params = new HttpParams()
      .set("q", query)
      .set("page", page.toString())
      .set("limit", "10");

    return this.http.get<User[]>(`${this.apiUrl}/users/search`, { params });
  }

  // POST - create user
  createUser(user: Partial<User>): Observable<User> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    return this.http
      .post<User>(`${this.apiUrl}/users`, user, { headers })
      .pipe(catchError(this.handleError));
  }

  // PUT - update user
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http
      .put<User>(`${this.apiUrl}/users/${id}`, user)
      .pipe(catchError(this.handleError));
  }

  // PATCH - partial update
  patchUser(id: number, changes: Partial<User>): Observable<User> {
    return this.http
      .patch<User>(`${this.apiUrl}/users/${id}`, changes)
      .pipe(catchError(this.handleError));
  }

  // DELETE
  deleteUser(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/users/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = "An error occurred";

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
```

### HTTP Interceptor (like Axios interceptors)

```tsx
// auth.interceptor.ts
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // Add auth token to request
    const token = localStorage.getItem("token");

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirect to login
          this.router.navigate(["/login"]);
        }
        return throwError(() => error);
      }),
    );
  }
}

// Register interceptor in app.module.ts
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
```

### Using HTTP in Component

```tsx
// users.component.ts
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-users",
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error">{{ error }}</div>

    <ul *ngIf="!loading && !error">
      <li *ngFor="let user of users">
        {{ user.name }} - {{ user.email }}
        <button (click)="deleteUser(user.id)">Delete</button>
      </li>
    </ul>

    <button (click)="loadUsers()">Refresh</button>
  `,
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  loading = false;
  error: string | null = null;
  private subscription: Subscription;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;

    this.subscription = this.apiService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      },
    });
  }

  deleteUser(id: number): void {
    if (confirm("Are you sure?")) {
      this.apiService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter((u) => u.id !== id);
        },
        error: (error) => console.error(error),
      });
    }
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
```

---

## State Management

### 1. Services with BehaviorSubject (Simple state)

```tsx
// state.service.ts
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface AppState {
  user: User | null;
  theme: "light" | "dark";
  notifications: Notification[];
}

@Injectable({
  providedIn: "root",
})
export class StateService {
  private state: AppState = {
    user: null,
    theme: "light",
    notifications: [],
  };

  private stateSubject = new BehaviorSubject<AppState>(this.state);
  public state$ = this.stateSubject.asObservable();

  // User
  setUser(user: User | null): void {
    this.state = { ...this.state, user };
    this.stateSubject.next(this.state);
  }

  getUser(): User | null {
    return this.state.user;
  }

  // Theme
  setTheme(theme: "light" | "dark"): void {
    this.state = { ...this.state, theme };
    this.stateSubject.next(this.state);
  }

  // Notifications
  addNotification(notification: Notification): void {
    this.state = {
      ...this.state,
      notifications: [...this.state.notifications, notification],
    };
    this.stateSubject.next(this.state);
  }
}
```

### 2. NgRx (Redux for Angular)

**Install:**

```bash
npm install @ngrx/store @ngrx/effects @ngrx/store-devtools

```

**Actions:**

```tsx
// user.actions.ts
import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";

export const loadUsers = createAction("[User List] Load Users");
export const loadUsersSuccess = createAction(
  "[User List] Load Users Success",
  props<{ users: User[] }>(),
);
export const loadUsersFailure = createAction(
  "[User List] Load Users Failure",
  props<{ error: string }>(),
);
```

**Reducer:**

```tsx
// user.reducer.ts
import { createReducer, on } from "@ngrx/store";
import * as UserActions from "./user.actions";

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null,
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
```

**Selectors:**

```tsx
// user.selectors.ts
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

export const selectUserState = createFeatureSelector<UserState>("users");

export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users,
);

export const selectUsersLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading,
);

export const selectUsersError = createSelector(
  selectUserState,
  (state: UserState) => state.error,
);
```

**Component Usage:**

```tsx
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as UserActions from "./store/user.actions";
import * as UserSelectors from "./store/user.selectors";

@Component({
  selector: "app-users",
  template: `
    <div *ngIf="loading$ | async">Loading...</div>
    <div *ngIf="error$ | async as error">{{ error }}</div>
    <ul *ngIf="users$ | async as users">
      <li *ngFor="let user of users">{{ user.name }}</li>
    </ul>
  `,
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.users$ = this.store.select(UserSelectors.selectAllUsers);
    this.loading$ = this.store.select(UserSelectors.selectUsersLoading);
    this.error$ = this.store.select(UserSelectors.selectUsersError);

    // Dispatch action to load users
    this.store.dispatch(UserActions.loadUsers());
  }
}
```

---

## RxJS & Observables

RxJS is a library for reactive programming using Observables.

### Basic Observable

```tsx
import { Observable, of, from, interval } from "rxjs";
import { map, filter, take } from "rxjs/operators";

// Create observable from values
const numbers$ = of(1, 2, 3, 4, 5);

// Create observable from array
const array$ = from([1, 2, 3, 4, 5]);

// Create observable that emits every second
const timer$ = interval(1000);

// Subscribe to observable
numbers$.subscribe({
  next: (value) => console.log(value),
  error: (error) => console.error(error),
  complete: () => console.log("Complete"),
});
```

### Common Operators

```tsx
import { of } from "rxjs";
import {
  map,
  filter,
  tap,
  switchMap,
  mergeMap,
  debounceTime,
  distinctUntilChanged,
} from "rxjs/operators";

// map - transform values
of(1, 2, 3, 4, 5)
  .pipe(map((x) => x * 2))
  .subscribe(console.log); // 2, 4, 6, 8, 10

// filter - filter values
of(1, 2, 3, 4, 5)
  .pipe(filter((x) => x % 2 === 0))
  .subscribe(console.log); // 2, 4

// tap - side effects (like console.log)
of(1, 2, 3)
  .pipe(
    tap((x) => console.log("Before:", x)),
    map((x) => x * 2),
    tap((x) => console.log("After:", x)),
  )
  .subscribe();

// switchMap - switch to new observable (cancels previous)
// Good for search/autocomplete
searchInput$
  .pipe(
    debounceTime(300), // Wait 300ms after typing stops
    distinctUntilChanged(), // Only if value changed
    switchMap((query) => this.apiService.search(query)),
  )
  .subscribe((results) => console.log(results));

// mergeMap - merge multiple observables
of(1, 2, 3)
  .pipe(mergeMap((id) => this.apiService.getUser(id)))
  .subscribe((user) => console.log(user));
```

### Real-World Example: Search with Autocomplete

```tsx
// search.component.ts
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: "app-search",
  template: `
    <input [formControl]="searchControl" placeholder="Search users..." />
    <ul>
      <li *ngFor="let result of results">{{ result.name }}</li>
    </ul>
  `,
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl("");
  results: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Wait 300ms after user stops typing
        distinctUntilChanged(), // Only search if value changed
        switchMap((query) => {
          if (query && query.length >= 2) {
            return this.apiService.searchUsers(query);
          }
          return of([]);
        }),
      )
      .subscribe((results) => {
        this.results = results;
      });
  }
}
```

### Common Patterns

```tsx
// Combine multiple observables
import { combineLatest, forkJoin } from "rxjs";

// Wait for all to emit, then emit combined value
combineLatest([
  this.userService.getUser(1),
  this.postService.getPosts(1),
]).subscribe(([user, posts]) => {
  console.log("User:", user, "Posts:", posts);
});

// Wait for all to complete, then emit all values
forkJoin({
  user: this.userService.getUser(1),
  posts: this.postService.getPosts(1),
  comments: this.commentService.getComments(1),
}).subscribe(({ user, posts, comments }) => {
  console.log(user, posts, comments);
});
```

---

## Lifecycle Hooks

```tsx
import {
  Component,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "app-lifecycle",
  template: `<p>Lifecycle Demo</p>`,
})
export class LifecycleComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  // 1. Constructor - called first, before any lifecycle hook
  constructor() {
    console.log("Constructor");
  }

  // 2. OnChanges - called when @Input() properties change
  ngOnChanges(changes: SimpleChanges): void {
    console.log("OnChanges", changes);
  }

  // 3. OnInit - called once after first ngOnChanges
  // BEST PLACE for initialization logic
  ngOnInit(): void {
    console.log("OnInit");
    // Initialize component
    // Fetch data
    // Set up subscriptions
  }

  // 4. DoCheck - called during every change detection run
  ngDoCheck(): void {
    console.log("DoCheck");
    // Custom change detection
  }

  // 5. AfterContentInit - called after content (ng-content) is initialized
  ngAfterContentInit(): void {
    console.log("AfterContentInit");
  }

  // 6. AfterContentChecked - called after every check of content
  ngAfterContentChecked(): void {
    console.log("AfterContentChecked");
  }

  // 7. AfterViewInit - called after component's view is initialized
  ngAfterViewInit(): void {
    console.log("AfterViewInit");
    // Access @ViewChild here
  }

  // 8. AfterViewChecked - called after every check of component's view
  ngAfterViewChecked(): void {
    console.log("AfterViewChecked");
  }

  // 9. OnDestroy - called just before component is destroyed
  ngOnDestroy(): void {
    console.log("OnDestroy");
    // Cleanup
    // Unsubscribe from observables
    // Clear timers
  }
}
```

**React Equivalent:**

```tsx
// ngOnInit → useEffect with []
useEffect(() => {
  // Component mounted
}, []);

// ngOnDestroy → useEffect cleanup
useEffect(() => {
  return () => {
    // Component will unmount
  };
}, []);

// ngOnChanges → useEffect with dependencies
useEffect(() => {
  // Props changed
}, [props]);
```

---

## Pipes

Pipes transform data in templates (like React filters/formatters).

### Built-in Pipes

```html
<!-- Date pipe -->
<p>{{ today | date }}</p>
<p>{{ today | date:'short' }}</p>
<p>{{ today | date:'dd/MM/yyyy' }}</p>

<!-- Uppercase/Lowercase -->
<p>{{ name | uppercase }}</p>
<p>{{ name | lowercase }}</p>
<p>{{ name | titlecase }}</p>

<!-- Currency -->
<p>{{ price | currency }}</p>
<p>{{ price | currency:'EUR' }}</p>
<p>{{ price | currency:'USD':'symbol':'1.2-2' }}</p>

<!-- Number -->
<p>{{ number | number }}</p>
<p>{{ number | number:'1.2-4' }}</p>
<!-- min.min-max decimals -->

<!-- Percent -->
<p>{{ 0.25 | percent }}</p>

<!-- JSON (debugging) -->
<pre>{{ user | json }}</pre>

<!-- Slice (arrays/strings) -->
<p>{{ text | slice:0:10 }}</p>

<!-- Async (observables) -->
<p>{{ user$ | async }}</p>

<!-- Chaining pipes -->
<p>{{ today | date:'short' | uppercase }}</p>
```

### Custom Pipe

```tsx
// capitalize.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}

// Register in module
@NgModule({
  declarations: [CapitalizePipe]
})

```

Usage:

```html
<p>{{ 'hello world' | capitalize }}</p>
<!-- Hello world -->
```

### Pipe with Parameters

```tsx
// truncate.pipe.ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "truncate",
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 10, trail: string = "..."): string {
    if (!value) return "";
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
```

Usage:

```html
<p>{{ longText | truncate:20:'...' }}</p>
<p>{{ longText | truncate:50 }}</p>
```

### Filter Pipe (commonly needed)

```tsx
// filter.pipe.ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, field: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      if (field) {
        return item[field].toLowerCase().includes(searchText);
      }
      return JSON.stringify(item).toLowerCase().includes(searchText);
    });
  }
}
```

Usage:

```html
<input [(ngModel)]="searchText" placeholder="Search..." />
<ul>
  <li *ngFor="let user of users | filter:searchText:'name'">{{ user.name }}</li>
</ul>
```

---

## Angular Interview Questions

### Q1: What is Angular? How is it different from AngularJS?

**Answer:**
Angular is a TypeScript-based open-source web application framework developed by Google.

**Differences from AngularJS:**

- **Language:** Angular uses TypeScript, AngularJS uses JavaScript
- **Architecture:** Angular uses component-based architecture, AngularJS uses MVC
- **Mobile Support:** Angular has better mobile support
- **Performance:** Angular is faster due to better change detection
- **CLI:** Angular has powerful CLI, AngularJS doesn't
- **Dependency Injection:** Improved in Angular

---

### Q2: What is TypeScript and why does Angular use it?

**Answer:**
TypeScript is a superset of JavaScript that adds static typing and other features.

**Benefits:**

- **Type Safety:** Catch errors at compile time
- **Better IDE Support:** Autocomplete, refactoring
- **OOP Features:** Classes, interfaces, decorators
- **Latest JS Features:** ES6+ features compiled to ES5
- **Better Documentation:** Types serve as documentation

---

### Q3: What are decorators in Angular?

**Answer:**
Decorators are functions that modify classes and class members.

**Common Decorators:**

```tsx
// Class decorators
@Component({ selector: 'app-root', template: '<h1>Hello</h1>' })
@Injectable({ providedIn: 'root' })
@NgModule({ declarations: [AppComponent] })
@Pipe({ name: 'capitalize' })
@Directive({ selector: '[appHighlight]' })

// Property decorators
@Input() userId: number;
@Output() clicked = new EventEmitter();
@ViewChild('myDiv') myDiv: ElementRef;
@ViewChildren(ChildComponent) children: QueryList<ChildComponent>;
@ContentChild('content') content: ElementRef;
@HostBinding('class.active') isActive: boolean;
@HostListener('click', ['$event']) onClick(event: Event) {}

```

---

### Q4: What is dependency injection in Angular?

**Answer:**
Dependency Injection (DI) is a design pattern where classes receive their dependencies from external sources rather than creating them.

**Benefits:**

- Loose coupling
- Easier testing (mock dependencies)
- Code reusability
- Better organization

**Example:**

```tsx
@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}
}

@Component({ selector: "app-user" })
export class UserComponent {
  // Angular injects UserService
  constructor(private userService: UserService) {}
}
```

---

### Q5: What is change detection in Angular?

**Answer:**
Change detection is the mechanism by which Angular determines if the application state has changed and updates the view accordingly.

**Strategies:**

```tsx
// Default - checks entire component tree
@Component({
  changeDetection: ChangeDetectionStrategy.Default
})

// OnPush - only checks when:
// - Input property changes
// - Event triggered in component
// - Observable emits
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})

```

**Manual Change Detection:**

```tsx
import { ChangeDetectorRef } from '@angular/core';

constructor(private cdr: ChangeDetectorRef) {}

ngOnInit() {
  // Manually trigger change detection
  this.cdr.detectChanges();

  // Mark for check
  this.cdr.markForCheck();

  // Detach from change detection
  this.cdr.detach();
}

```

---

### Q6: What is the difference between constructor and ngOnInit?

**Answer:**

**Constructor:**

- Called when class is instantiated
- TypeScript feature, not Angular
- Dependency injection happens here
- Component not fully initialized
- Don't do heavy initialization

**ngOnInit:**

- Called after first ngOnChanges
- Angular lifecycle hook
- Component fully initialized
- @Input properties available
- BEST place for initialization logic

```tsx
@Component({ selector: "app-example" })
export class ExampleComponent implements OnInit {
  @Input() userId: number;

  // Constructor - DI only
  constructor(private userService: UserService) {
    console.log(this.userId); // undefined - Input not set yet
  }

  // ngOnInit - initialization logic
  ngOnInit(): void {
    console.log(this.userId); // Available now
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUser(this.userId).subscribe();
  }
}
```

---

### Q7: What are Angular modules (NgModule)?

**Answer:**
NgModules are containers for cohesive blocks of code dedicated to an application domain, workflow, or feature.

```tsx
@NgModule({
  declarations: [
    // Components, directives, pipes
    AppComponent,
    UserComponent,
  ],
  imports: [
    // Other modules
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    // Services
    UserService,
  ],
  bootstrap: [
    // Root component (app module only)
    AppComponent,
  ],
  exports: [
    // Make available to other modules
    UserComponent,
  ],
})
export class AppModule {}
```

**Types of Modules:**

- **Root Module:** AppModule (bootstrap)
- **Feature Modules:** Organize by feature
- **Shared Module:** Common components/pipes/directives
- **Core Module:** Singleton services

---

### Q8: What is lazy loading and why use it?

**Answer:**
Lazy loading loads feature modules only when needed, reducing initial bundle size.

```tsx
const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
];
```

**Benefits:**

- Faster initial load
- Smaller initial bundle
- Better performance
- Load features on demand

---

### Q9: What is the async pipe?

**Answer:**
The async pipe subscribes to Observables/Promises and returns the latest emitted value.

```tsx
// Without async pipe - manual subscription
ngOnInit() {
  this.userService.getUser(1).subscribe(user => {
    this.user = user;
  });
}
ngOnDestroy() {
  // Must unsubscribe
}

// With async pipe - automatic subscription/unsubscription
user$ = this.userService.getUser(1);

```

```html
<div *ngIf="user$ | async as user">{{ user.name }}</div>
```

**Benefits:**

- Automatic subscription
- Automatic unsubscription
- Cleaner code
- No memory leaks

---

### Q10: What are ViewChild and ContentChild?

**Answer:**

**ViewChild** - Access child component/element in template:

```tsx
@Component({
  template: "<app-child #childRef></app-child>",
})
export class ParentComponent implements AfterViewInit {
  @ViewChild("childRef") child: ChildComponent;

  ngAfterViewInit() {
    console.log(this.child); // Now available
  }
}
```

**ContentChild** - Access projected content (ng-content):

```tsx
// Child
@Component({
  selector: "app-wrapper",
  template: "<ng-content></ng-content>",
})
export class WrapperComponent implements AfterContentInit {
  @ContentChild("content") content: ElementRef;

  ngAfterContentInit() {
    console.log(this.content);
  }
}

// Parent usage
<app-wrapper>
  <div #content>Projected content</div>
</app-wrapper>;
```

---

## Additional Tips for MERN Developers

1. **Think in Components:** Similar to React, but more structured
2. **Embrace TypeScript:** Types make development easier
3. **Use RxJS:** Powerful but has learning curve
4. **Follow Style Guide:** Angular has official style guide
5. **Use CLI:** `ng generate` saves time
6. **Lazy Load:** Important for performance
7. **OnPush Strategy:** Use for better performance
8. **Unsubscribe:** Or use async pipe to prevent memory leaks
9. **Keep Components Dumb:** Logic in services
10. **Learn RxJS Operators:** Essential for Angular

---

## Resources

- **Official Docs:** https://angular.io/docs
- **Angular University:** https://angular-university.io
- **RxJS Docs:** https://rxjs.dev
- **Style Guide:** https://angular.io/guide/styleguide
- **CLI Docs:** https://angular.io/cli

---

**Good luck learning Angular! 🚀**
