Complete solutions with explanations for hands-on practice.

---

## JavaScript Problems

### Problem 1: Debounce Function (Medium)

**Question:** Implement a debounce function that delays the execution of a function until after a specified wait time has elapsed since the last time it was invoked.

```jsx
// Usage example:
const debouncedSearch = debounce(search, 300);
input.addEventListener("input", debouncedSearch);
```

**Solution:**

```jsx
function debounce(func, wait) {
  let timeoutId;

  return function executedFunction(...args) {
    // Clear the previous timeout
    clearTimeout(timeoutId);

    // Set a new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// Example usage:
function search(query) {
  console.log("Searching for:", query);
}

const debouncedSearch = debounce(search, 300);
debouncedSearch("h");
debouncedSearch("he");
debouncedSearch("hel");
debouncedSearch("hello"); // Only this will execute after 300ms
```

**Key Points:**

- Clears previous timeout on each call
- Preserves `this` context with `apply`
- Uses rest parameters and spread syntax

---

### Problem 2: Deep Clone Object (Medium)

**Question:** Create a function that deep clones an object, including nested objects and arrays.

**Solution:**

```jsx
function deepClone(obj) {
  // Handle null and non-objects
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  // Handle Array
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  // Handle Object
  const clonedObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj;
}

// Modern alternative using structuredClone (if available):
const cloned = structuredClone(original);

// Test:
const original = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    country: "USA",
  },
  hobbies: ["reading", "coding"],
};

const cloned = deepClone(original);
cloned.address.city = "Boston";
console.log(original.address.city); // 'New York' (unchanged)
```

---

### Problem 3: Flatten Nested Array (Medium)

**Question:** Flatten a deeply nested array.

**Solution:**

```jsx
// Method 1: Recursive
function flattenRecursive(arr) {
  const result = [];

  for (let item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenRecursive(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

// Method 2: Using reduce
function flattenReduce(arr) {
  return arr.reduce((acc, item) => {
    return acc.concat(Array.isArray(item) ? flattenReduce(item) : item);
  }, []);
}

// Method 3: Modern approach
function flattenModern(arr, depth = Infinity) {
  return arr.flat(depth);
}

// Test:
const nested = [1, [2, [3, [4, 5]], 6], 7, [8]];
console.log(flattenRecursive(nested)); // [1, 2, 3, 4, 5, 6, 7, 8]
```

---

### Problem 4: Array Grouping (Medium)

**Question:** Group an array of objects by a specific property.

**Solution:**

```jsx
function groupBy(array, key) {
  return array.reduce((result, item) => {
    const groupKey = item[key];

    if (!result[groupKey]) {
      result[groupKey] = [];
    }

    result[groupKey].push(item);
    return result;
  }, {});
}

// Alternative with function as key
function groupByFn(array, fn) {
  return array.reduce((result, item) => {
    const groupKey = fn(item);

    if (!result[groupKey]) {
      result[groupKey] = [];
    }

    result[groupKey].push(item);
    return result;
  }, {});
}

// Test:
const users = [
  { name: "Alice", age: 25, department: "Engineering" },
  { name: "Bob", age: 30, department: "Sales" },
  { name: "Charlie", age: 25, department: "Engineering" },
  { name: "David", age: 30, department: "Sales" },
];

console.log(groupBy(users, "department"));
// {
//   Engineering: [{ name: 'Alice', ... }, { name: 'Charlie', ... }],
//   Sales: [{ name: 'Bob', ... }, { name: 'David', ... }]
// }

console.log(groupByFn(users, (user) => user.age));
// Groups by age
```

---

### Problem 5: Throttle Function (Medium)

**Question:** Implement a throttle function that ensures a function is called at most once in a specified time period.

**Solution:**

```jsx
function throttle(func, limit) {
  let inThrottle;
  let lastResult;

  return function (...args) {
    if (!inThrottle) {
      lastResult = func.apply(this, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }

    return lastResult;
  };
}

// Example usage:
function handleScroll() {
  console.log("Scroll event:", new Date().toLocaleTimeString());
}

const throttledScroll = throttle(handleScroll, 1000);
window.addEventListener("scroll", throttledScroll);
// Will only fire once per second maximum
```

---

### Problem 6: Promise.all Implementation (Hard)

**Question:** Implement your own version of Promise.all.

**Solution:**

```jsx
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Arguments must be an array"));
    }

    const results = [];
    let completedPromises = 0;

    if (promises.length === 0) {
      return resolve(results);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completedPromises++;

          if (completedPromises === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

// Test:
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve) => setTimeout(() => resolve(42), 100));
const promise3 = Promise.resolve("foo");

promiseAll([promise1, promise2, promise3]).then((values) =>
  console.log(values),
); // [3, 42, 'foo']
```

---

### Problem 7: Memoization (Medium)

**Question:** Create a memoization function to cache expensive function results.

**Solution:**

```jsx
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("Returning from cache");
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Example: Fibonacci
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFib = memoize(fibonacci);

console.log(memoizedFib(40)); // Calculated
console.log(memoizedFib(40)); // From cache (instant)

// Advanced: With cache limit
function memoizeWithLimit(fn, limit = 100) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);

    if (cache.size >= limit) {
      // Remove oldest entry (first key)
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }

    cache.set(key, result);
    return result;
  };
}
```

---

### Problem 8: Event Emitter (Hard)

**Question:** Implement a simple event emitter with on, off, and emit methods.

**Solution:**

```jsx
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);

    // Return unsubscribe function
    return () => this.off(eventName, callback);
  }

  off(eventName, callback) {
    if (!this.events[eventName]) return;

    this.events[eventName] = this.events[eventName].filter(
      (cb) => cb !== callback,
    );
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) return;

    this.events[eventName].forEach((callback) => {
      callback(...args);
    });
  }

  once(eventName, callback) {
    const onceWrapper = (...args) => {
      callback(...args);
      this.off(eventName, onceWrapper);
    };

    this.on(eventName, onceWrapper);
  }
}

// Test:
const emitter = new EventEmitter();

const unsubscribe = emitter.on("userLoggedIn", (user) => {
  console.log("User logged in:", user.name);
});

emitter.emit("userLoggedIn", { name: "Alice" }); // Logs: User logged in: Alice
unsubscribe();
emitter.emit("userLoggedIn", { name: "Bob" }); // Nothing logged

emitter.once("dataLoaded", () => {
  console.log("Data loaded (only once)");
});

emitter.emit("dataLoaded"); // Logs
emitter.emit("dataLoaded"); // Nothing (was removed)
```

---

## React Problems

### Problem 9: Custom useLocalStorage Hook (Medium)

**Question:** Create a hook that syncs state with localStorage.

**Solution:**

```jsx
import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  // Get from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value) => {
    try {
      // Allow value to be a function like useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage:
function App() {
  const [name, setName] = useLocalStorage("name", "Anonymous");

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello, {name}!</p>
    </div>
  );
}
```

---

### Problem 10: Custom useFetch Hook (Medium)

**Question:** Create a reusable hook for API calls with loading and error states.

**Solution:**

```jsx
import { useState, useEffect } from "react";

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();

        if (!cancelled) {
          setData(json);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      cancelled = true;
    };
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
}

// Enhanced version with refetch
function useFetchAdvanced(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = () => setRefetchIndex((prev) => prev + 1);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();

        if (!cancelled) {
          setData(json);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url, JSON.stringify(options), refetchIndex]);

  return { data, loading, error, refetch };
}

// Usage:
function UserList() {
  const {
    data: users,
    loading,
    error,
    refetch,
  } = useFetchAdvanced("https://api.example.com/users");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### Problem 11: Infinite Scroll Component (Hard)

**Question:** Implement infinite scroll with intersection observer.

**Solution:**

```jsx
import { useState, useEffect, useRef, useCallback } from "react";

function useInfiniteScroll(fetchData) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const observerRef = useRef();

  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [loading, hasMore],
  );

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);

      try {
        const newItems = await fetchData(page);

        if (newItems.length === 0) {
          setHasMore(false);
        } else {
          setItems((prev) => [...prev, ...newItems]);
        }
      } catch (error) {
        console.error("Error loading items:", error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [page, fetchData]);

  return { items, loading, hasMore, lastItemRef };
}

// Usage:
function InfiniteScrollList() {
  const fetchData = async (page) => {
    const response = await fetch(
      `https://api.example.com/items?page=${page}&limit=20`,
    );
    const data = await response.json();
    return data.items;
  };

  const { items, loading, hasMore, lastItemRef } = useInfiniteScroll(fetchData);

  return (
    <div>
      {items.map((item, index) => {
        // Attach ref to last item
        if (items.length === index + 1) {
          return (
            <div ref={lastItemRef} key={item.id}>
              {item.title}
            </div>
          );
        }

        return <div key={item.id}>{item.title}</div>;
      })}

      {loading && <div>Loading more items...</div>}
      {!hasMore && <div>No more items to load</div>}
    </div>
  );
}
```

---

### Problem 12: Form with Validation (Medium)

**Question:** Create a reusable form component with validation.

**Solution:**

```jsx
import { useState } from "react";

function useForm(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (name, value) => {
    const rules = validationRules[name];

    if (!rules) return "";

    for (let rule of rules) {
      const error = rule(value, values);
      if (error) return error;
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validate(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validate(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(validationRules).forEach((name) => {
      const error = validate(name, values[name]);
      if (error) {
        newErrors[name] = error;
      }
    });

    setErrors(newErrors);

    // If no errors, call callback
    if (Object.keys(newErrors).length === 0) {
      callback(values);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}

// Validation helper functions
const required = (value) => {
  return value ? "" : "This field is required";
};

const minLength = (min) => (value) => {
  return value.length >= min ? "" : `Minimum ${min} characters required`;
};

const email = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? "" : "Invalid email address";
};

const match = (fieldName, errorMessage) => (value, allValues) => {
  return value === allValues[fieldName] ? "" : errorMessage;
};

// Usage:
function RegistrationForm() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationRules = {
    username: [required, minLength(3)],
    email: [required, email],
    password: [required, minLength(8)],
    confirmPassword: [required, match("password", "Passwords must match")],
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  } = useForm(initialValues, validationRules);

  const onSubmit = (formValues) => {
    console.log("Form submitted:", formValues);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.username && touched.username ? "border-red-500" : ""
          }
        />
        {errors.username && touched.username && (
          <p className="text-red-500 text-sm">{errors.username}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && touched.email ? "border-red-500" : ""}
        />
        {errors.email && touched.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.password && touched.password ? "border-red-500" : ""
          }
        />
        {errors.password && touched.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.confirmPassword && touched.confirmPassword
              ? "border-red-500"
              : ""
          }
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Register
      </button>
    </form>
  );
}
```

---

### Problem 13: Modal Component (Medium)

**Question:** Create a reusable, accessible modal component.

**Solution:**

```jsx
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Store previously focused element
      previousActiveElement.current = document.activeElement;

      // Focus the modal
      modalRef.current?.focus();

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      // Restore body scroll
      document.body.style.overflow = "unset";

      // Return focus to previously focused element
      previousActiveElement.current?.focus();
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Trap focus inside modal
  const handleTabKey = (e) => {
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            handleTabKey(e);
          }
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 id="modal-title" className="text-xl font-bold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>,
    document.body,
  );
}

// Usage:
function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
      >
        <p className="mb-4">Are you sure you want to proceed?</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Confirmed");
              setIsOpen(false);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
}
```

---

### Problem 14: Autocomplete Search (Hard)

**Question:** Build an autocomplete component with debouncing and keyboard navigation.

**Solution:**

```jsx
import { useState, useEffect, useRef } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function Autocomplete({ fetchSuggestions, onSelect, placeholder }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const debouncedQuery = useDebounce(query, 300);

  // Fetch suggestions when debounced query changes
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const loadSuggestions = async () => {
      setIsLoading(true);

      try {
        const results = await fetchSuggestions(debouncedQuery);
        setSuggestions(results);
        setIsOpen(results.length > 0);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSuggestions();
  }, [debouncedQuery, fetchSuggestions]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex];
      selectedElement?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;

      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelect(suggestions[selectedIndex]);
        }
        break;

      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;

      default:
        break;
    }
  };

  const handleSelect = (item) => {
    setQuery(item.name);
    setIsOpen(false);
    setSelectedIndex(-1);
    onSelect(item);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (suggestions.length > 0) {
            setIsOpen(true);
          }
        }}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading && (
        <div className="absolute right-3 top-3">
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
        </div>
      )}

      {isOpen && suggestions.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((item, index) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`px-4 py-2 cursor-pointer ${
                index === selectedIndex
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Usage:
function App() {
  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://api.example.com/search?q=${encodeURIComponent(query)}`,
    );
    const data = await response.json();
    return data.results;
  };

  const handleSelect = (item) => {
    console.log("Selected:", item);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <Autocomplete
        fetchSuggestions={fetchSuggestions}
        onSelect={handleSelect}
        placeholder="Type to search..."
      />
    </div>
  );
}
```

---

## Quick Challenges

### Challenge 1: Array Manipulation

```jsx
// Remove duplicates from array
const removeDuplicates = (arr) => [...new Set(arr)];

// Find intersection of two arrays
const intersection = (arr1, arr2) => arr1.filter((item) => arr2.includes(item));

// Chunk array into groups
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );

// Shuffle array
const shuffle = (arr) => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};
```

### Challenge 2: String Manipulation

```jsx
// Capitalize first letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Reverse string
const reverse = (str) => str.split("").reverse().join("");

// Check palindrome
const isPalindrome = (str) => {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
};

// Count character occurrences
const countChars = (str) => {
  return str.split("").reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});
};
```

### Challenge 3: Object Manipulation

```jsx
// Deep merge objects
const deepMerge = (target, source) => {
  const result = { ...target };

  for (let key in source) {
    if (source[key] instanceof Object && key in target) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
};

// Pick specific properties
const pick = (obj, keys) => {
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

// Omit specific properties
const omit = (obj, keys) => {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
};
```

---

## Practice Tips

1. **Time yourself** - Try to solve each problem within 20-30 minutes
2. **Think out loud** - Practice explaining your approach
3. **Consider edge cases** - Empty arrays, null values, etc.
4. **Optimize** - After getting it working, think about performance
5. **Code review** - Review your solutions next day with fresh eyes

## Common Mistakes to Avoid

- ❌ Not handling loading/error states
- ❌ Forgetting cleanup in useEffect
- ❌ Mutating state directly
- ❌ Incorrect dependency arrays
- ❌ Not considering accessibility
- ❌ Ignoring edge cases
- ❌ Over-engineering simple solutions
- ❌ Not asking clarifying questions

Good luck with your practice! 🚀
