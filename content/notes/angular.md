# Angular Interview Notes

> Modern Angular (2+) for frontend interviews. AngularJS (1.x) is legacy — clarify which one they mean. Related: [TypeScript](/notes/typescript), [React](/notes/react), [Performance](/notes/performance).

---

## 1. Angular vs AngularJS

| | **AngularJS (1.x)** | **Angular (2+)** |
|---|---|---|
| Language | JavaScript | TypeScript |
| Architecture | MVC / two-way binding heavy | Component-based |
| Change detection | Digests / `$scope` | Zone.js + Ivy renderer |
| Mobile | Weak | First-class (PWA, Ionic) |
| Status | End of life (Dec 2021) | Active (current: 17/18+) |

Say **Angular** in interviews unless they explicitly ask about AngularJS. If they say "Angular JS," confirm: *Do you mean Angular 1.x or modern Angular?*

---

## 2. What is Angular?

Angular is a **TypeScript-based open-source framework** (Google) for building single-page applications (SPAs). It is a full framework — routing, forms, HTTP, DI, and testing are built in — unlike React, which is a UI library.

Key ideas:
- **Component-based** UI
- **Dependency Injection** as a first-class concept
- **RxJS** for async streams
- **AOT compilation** (templates compiled ahead of time)
- **Ivy** — current rendering & compilation pipeline

---

## 3. Architecture overview

```
AppModule / bootstrapApplication
  └── Root Component
        ├── Feature modules / standalone components
        ├── Services (injectable)
        ├── Routing
        └── Shared pipes / directives
```

**Building blocks:**
| Piece | Role |
|---|---|
| **Component** | UI + logic (template + class) |
| **Directive** | Behavior on DOM (`*ngIf`, custom) |
| **Pipe** | Transform display values (`date`, `async`) |
| **Service** | Shared logic / state / API calls |
| **Module** | Group related pieces (NgModules; less central with standalone) |
| **Decorator** | Metadata (`@Component`, `@Injectable`, `@Input`) |

---

## 4. Components

```ts
@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>{{ user.name }}</h2>
    <button (click)="select.emit(user.id)">Select</button>
  `,
  styles: [`h2 { font-weight: 600; }`],
})
export class UserCardComponent {
  @Input({ required: true }) user!: User;
  @Output() select = new EventEmitter<string>();
}
```

- **`@Input()`** — data in from parent
- **`@Output()`** — events out to parent
- One component ≈ one responsibility; keep templates thin

**Standalone components** (Angular 14+): no NgModule required — preferred in new apps.

---

## 5. Data binding

| Binding | Syntax | Direction |
|---|---|---|
| Interpolation | `{{ value }}` | Component → view |
| Property | `[href]="url"` | Component → view |
| Event | `(click)="onClick()"` | View → component |
| Two-way | `[(ngModel)]="name"` | Both (forms) |
| Attribute | `[attr.aria-label]="label"` | When no DOM property exists |
| Class / style | `[class.active]="isOn"` / `[style.color]="c"` | Conditional |

**Two-way binding** is sugar for:
```html
<input [ngModel]="name" (ngModelChange)="name = $event" />
```

---

## 6. Directives

**Structural** — change DOM shape (`*ngIf`, `*ngFor`, `*ngSwitch`, `@if` / `@for` control flow).

**Attribute** — change appearance/behavior (`ngClass`, `ngStyle`, custom).

```html
<!-- Classic -->
<div *ngIf="user">{{ user.name }}</div>
<li *ngFor="let item of items; trackBy: trackId">{{ item }}</li>

<!-- Built-in control flow (Angular 17+) -->
@if (user) {
  <div>{{ user.name }}</div>
}
@for (item of items; track item.id) {
  <li>{{ item.name }}</li>
}
```

**`trackBy` / `track`** — avoid destroying/recreating DOM when list identity is stable. Interview favorite.

**Custom attribute directive:**
```ts
@Directive({ selector: '[appHighlight]', standalone: true })
export class HighlightDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.background = 'yellow';
  }
}
```

---

## 7. Pipes

```html
{{ price | currency:'USD' }}
{{ createdAt | date:'medium' }}
{{ users | async }}
```

- **Pure pipes** (default) — re-run only when input reference changes
- **Impure pipes** — run every change detection cycle (expensive; avoid)
- Prefer **pure pipes** or transform in the component/service for heavy work

```ts
@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 50): string {
    return value.length > limit ? value.slice(0, limit) + '…' : value;
  }
}
```

---

## 8. Services & Dependency Injection

```ts
@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>('/api/users');
  }
}
```

- **`providedIn: 'root'`** — singleton for the app
- Provide at **component** level → new instance per component tree
- Angular DI resolves constructor / `inject()` dependencies from injectors

**Why DI?** Testability (mock services), loose coupling, single responsibility.

---

## 9. Change detection

Angular checks when to update the view. By default it runs often (Zone.js patches async APIs).

**Strategies:**
| Strategy | Behavior |
|---|---|
| **Default** | Check component and all children on most async events |
| **OnPush** | Check only when `@Input` reference changes, events fire on the component, or you mark for check / async pipe emits |

```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
```

**Interview answer:** Use **OnPush** + immutable inputs + `async` pipe for performance. Avoid mutating objects/arrays in place.

**Signals** (Angular 16+): fine-grained reactivity; reduce reliance on Zone.js over time.

```ts
count = signal(0);
double = computed(() => this.count() * 2);
increment() { this.count.update(v => v + 1); }
```

---

## 10. Lifecycle hooks

| Hook | When |
|---|---|
| `ngOnChanges` | Input bindings change |
| `ngOnInit` | After first `ngOnChanges` — init logic / fetch |
| `ngDoCheck` | Every CD cycle — custom checks (rare) |
| `ngAfterViewInit` | View (and child views) initialized |
| `ngOnDestroy` | Cleanup: unsubscribe, clear timers |

**Rule:** Fetch in `ngOnInit`, not the constructor. Unsubscribe in `ngOnDestroy` (or use `async` pipe / `takeUntilDestroyed`).

---

## 11. Routing

```ts
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users/:id', component: UserDetailComponent, canActivate: [authGuard] },
  {
    path: 'admin',
    loadChildren: () => import('./admin/routes').then(m => m.ADMIN_ROUTES),
  },
  { path: '**', component: NotFoundComponent },
];
```

- **Lazy loading** — split bundles; load feature on navigation
- **Guards** — `canActivate`, `canMatch`, `canDeactivate`
- **Resolvers** — prefetch data before activate (less common now; prefer in-component)
- **`routerLink` / `Router`** — navigate without full page reload

---

## 12. Forms

**Template-driven** — `ngModel`, logic in template. Fine for simple forms.

**Reactive forms** — preferred in interviews and large apps:

```ts
form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  age: new FormControl<number | null>(null, Validators.min(18)),
});

onSubmit() {
  if (this.form.invalid) return;
  console.log(this.form.value);
}
```

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <input formControlName="email" />
  @if (form.controls.email.touched && form.controls.email.errors?.['email']) {
    <span>Invalid email</span>
  }
</form>
```

**`FormBuilder`**, **`FormArray`**, custom validators, and async validators are common follow-ups.

---

## 13. HTTP & RxJS

```ts
this.http.get<User[]>('/api/users').pipe(
  retry(2),
  catchError(err => {
    console.error(err);
    return of([]);
  }),
);
```

Common operators: `map`, `switchMap`, `mergeMap`, `exhaustMap`, `debounceTime`, `distinctUntilChanged`, `catchError`, `shareReplay`.

**`switchMap` vs `mergeMap` vs `concatMap` vs `exhaustMap`:**
- **switchMap** — cancel previous (search typeahead)
- **mergeMap** — run in parallel (independent calls)
- **concatMap** — queue in order
- **exhaustMap** — ignore new until current finishes (login button)

**Unsubscribe:** `async` pipe, `takeUntilDestroyed()`, or explicit `unsubscribe()` in `ngOnDestroy`.

---

## 14. Modules vs standalone

**NgModules** group declarations, imports, exports, providers. Still in many codebases.

**Standalone** (modern default): components/directives/pipes declare their own `imports`. Simpler mental model, better tree-shaking.

Interview tip: know both; say you'd start new apps **standalone**.

---

## 15. State management

Options:
- **Services + RxJS BehaviorSubject / signals** — enough for many apps
- **NgRx** — Redux-style (actions, reducers, effects, selectors) for large teams
- **Component store / signal store** — lighter scoped state

When to use NgRx: complex shared state, many writers, strong audit/debug needs. Don't add it by default.

---

## 16. Performance checklist

- `OnPush` + immutable data
- `track` / `trackBy` in lists
- Lazy-loaded routes
- `*ngIf` / `@if` to destroy heavy UI when hidden (vs only hiding with CSS)
- Pure pipes; avoid heavy work in templates
- Virtual scroll for long lists (`cdk-virtual-scroll-viewport`)
- Avoid function calls in templates that allocate every CD cycle
- AOT on by default in production builds

---

## 17. Testing

- **Jasmine/Jest + Karma/Vitest** — unit tests
- **TestBed** — configure Angular testing module
- **HttpClientTestingModule** — mock HTTP
- **Cypress / Playwright** — e2e

```ts
it('renders name', () => {
  const fixture = TestBed.createComponent(UserCardComponent);
  fixture.componentInstance.user = { id: '1', name: 'Ada' };
  fixture.detectChanges();
  expect(fixture.nativeElement.textContent).toContain('Ada');
});
```

---

## 18. Angular vs React (common question)

| | Angular | React |
|---|---|---|
| Type | Full framework | UI library |
| Language | TypeScript-first | JS/TS optional |
| Templates | HTML + Angular syntax | JSX |
| DI | Built-in | DIY / context |
| Routing / forms | Official | React Router / form libs |
| Learning curve | Steeper, more structure | Gentler entry, more choices |
| Best fit | Large enterprise SPAs | Flexible UI across stacks |

Neither is "better" — pick based on team, ecosystem, and constraints.

---

## 19. Quick FAQ

**What is Ivy?**  
Angular's compilation and rendering pipeline — smaller bundles, faster builds, better debugging.

**What is Zone.js?**  
Patches async APIs so Angular knows when to run change detection. Signals / zoneless mode reduce dependence on it.

**AOT vs JIT?**  
AOT compiles templates at build time (prod default). JIT compiles in the browser (dev historically). AOT catches template errors earlier and ships less compiler code.

**Eager vs lazy modules/routes?**  
Eager loads at startup; lazy loads on demand. Prefer lazy for feature areas.

**How do you share data between components?**  
Parent→child `@Input`, child→parent `@Output`, siblings via shared service/signals/store, or router state for URL-driven data.

**ViewChild vs ContentChild?**  
`ViewChild` — element in the component's own template. `ContentChild` — projected content via `<ng-content>`.

---

## 20. One-minute closing pitch

"Angular is a batteries-included TypeScript framework: components, DI, RxJS, and routing. I default to standalone components, reactive forms, OnPush or signals for change detection, and lazy routes. For HTTP I lean on `async` pipe / `takeUntilDestroyed` so subscriptions don't leak. NgRx only when shared state gets complex enough to justify it."
