## What is C#? {#what-is-csharp}
difficulty: beginner

C# is a modern, object-oriented, type-safe programming language developed by Microsoft. It is used to build web apps, APIs, desktop apps, games and enterprise software on the .NET platform.

### How it works

1. You write source code in C#.
2. The C# compiler converts it into Intermediate Language (IL).
3. The .NET runtime (CLR) compiles the IL into machine code and runs it.

```csharp
using System;

class Program
{
    static void Main()
    {
        // Prints a message to the console
        Console.WriteLine("Hello World");
    }
}
```

> [!NOTE]
> C# is the language. .NET is the platform that runs it. They are related but not the same thing.

### How to Answer in an Interview

C# is a modern, object-oriented and type-safe programming language developed by Microsoft. It compiles to Intermediate Language and runs on the .NET platform, and I use it to build things like ASP.NET Core Web APIs.

## What is the difference between const and readonly? {#const-vs-readonly}
difficulty: beginner

Both keywords create values that cannot change after they are set. The difference is **when** the value is set.

### Comparison

| Feature | const | readonly |
|---|---|---|
| Value is set | At compile time | At runtime |
| Assigned in | Declaration only | Declaration or constructor |
| Allowed types | Primitives, string, enum | Any type |
| Implicitly static | Yes | No |

```csharp
public class Circle
{
    public const double Pi = 3.14159;      // fixed at compile time
    public readonly DateTime CreatedAt;    // fixed at runtime

    public Circle()
    {
        CreatedAt = DateTime.Now;          // allowed inside the constructor
        // Pi = 3.14;                      // compile error
    }
}
```

> [!WARNING]
> A const value is copied into every project that uses it. If you change a const in a shared library, the projects using it must be recompiled, or they keep the old value. Prefer readonly for values that may change.

### How to Answer in an Interview

Both create values that can't be modified later. A const is a compile-time constant, so it must be assigned at declaration and is implicitly static. A readonly field is set at runtime, either at declaration or in the constructor, so each instance can have a different value. I use const for true constants like Pi and readonly for values that are only known at runtime.

## What is boxing and unboxing? {#boxing-unboxing}
difficulty: intermediate

**Boxing** converts a value type (like `int`) into an `object`, which stores it on the heap. **Unboxing** converts it back to the value type.

```csharp
int number = 42;

object boxed = number;      // boxing: value copied to the heap
int back = (int)boxed;      // unboxing: value copied back out
```

Boxing and unboxing cost memory and CPU time, so avoid them in performance-sensitive code such as loops. Generic collections like `List<int>` avoid boxing, while the old `ArrayList` does not.

> [!WARNING]
> You must unbox to the exact original type. `long wrong = (long)boxed;` throws an InvalidCastException, even though int fits into long.

### How to Answer in an Interview

Boxing is converting a value type to object, which allocates it on the heap. Unboxing is the reverse and needs an explicit cast to the exact original type. Both have a performance cost, so I use generics like List of T instead of ArrayList to avoid them.