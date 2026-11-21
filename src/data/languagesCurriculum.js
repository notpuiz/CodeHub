export const languageTracks = [
  {
    id: 'python',
    group: 'languages',
    name: 'Python',
    fullName: 'Python Programming',
    tagline: 'Write readable, expressive code for scripting, automation, APIs, and data science.',
    accent: 'sky',
    badge: 'Python',
    lessons: [
      {
        slug: 'python-basics',
        title: 'Python Basics & Variables',
        duration: '5 min',
        summary: 'Learn Python indentation, dynamic typing, f-strings, and clean control flow.',
        sections: [
          {
            id: 'syntax-and-fstrings',
            heading: 'Clean Syntax & f-Strings',
            body: [
              'Python uses indentation instead of curly braces to define code blocks. Variables are created on assignment, and f-strings (f"...") let you embed expressions directly inside text.',
              'Follow snake_case for variable and function names to match PEP 8, Python’s official style guide.',
            ],
            example: {
              title: 'Variables, f-Strings & Loops',
              language: 'python',
              code: `language = "Python"
version = 3.13
topics = ["Automation", "Web APIs", "AI & Data"]

print(f"Welcome to {language} {version}!")
for index, topic in enumerate(topics, start=1):
    print(f"{index}. {topic}")`,
              output: `Welcome to Python 3.13!
1. Automation
2. Web APIs
3. AI & Data`,
            },
            tip: 'Use enumerate(items, start=1) instead of manually incrementing an index counter inside a loop.',
          },
        ],
      },
      {
        slug: 'lists-and-dicts',
        title: 'Lists, Dicts & Comprehensions',
        duration: '6 min',
        summary:
          'Work with Python’s core collections and transform data concisely with comprehensions.',
        sections: [
          {
            id: 'comprehensions',
            heading: 'List & Dictionary Comprehensions',
            body: [
              'Lists hold ordered items, while dictionaries map unique keys to values with O(1) average lookup speed. Comprehensions replace verbose filter-and-append loops with a single readable expression.',
            ],
            example: {
              title: 'Filtering Scores with Comprehensions',
              language: 'python',
              code: `scores = {"Dara": 92, "Sophea": 68, "Vichea": 85, "Nita": 95}

passed = {name: score for name, score in scores.items() if score >= 80}
top_names = [name.upper() for name in passed]

print("Passed:", passed)
print("Top students:", top_names)`,
              output: `Passed: {'Dara': 92, 'Vichea': 85, 'Nita': 95}
Top students: ['DARA', 'VICHEA', 'NITA']`,
            },
          },
        ],
      },
      {
        slug: 'functions-and-modules',
        title: 'Functions & Type Hints',
        duration: '6 min',
        summary:
          'Define reusable functions with default arguments, return values, and optional type annotations.',
        sections: [
          {
            id: 'typed-functions',
            heading: 'Functions with Type Annotations',
            body: [
              'Adding type hints (like price: float -> float) makes large Python codebases far easier to maintain and enables editors and linters to catch type mismatches before runtime.',
            ],
            example: {
              title: 'Typed Discount Calculator',
              language: 'python',
              code: `def apply_discount(price: float, percent: float = 10.0) -> float:
    """Return final price after percentage discount."""
    return round(price * (1 - percent / 100), 2)

print(apply_discount(50.0))
print(apply_discount(120.0, percent=25.0))`,
              output: `45.0
90.0`,
            },
            tip: 'Never use a mutable list or dict as a default parameter (e.g. def add(items=[]))—use None instead and initialize inside the function.',
          },
        ],
      },
      {
        slug: 'oop-and-files',
        title: 'Classes & Context Managers',
        duration: '6 min',
        summary:
          'Model structured data cleanly with dataclasses and safely manage files using with blocks.',
        sections: [
          {
            id: 'dataclasses-and-with',
            heading: 'Dataclasses & Safe Resource Handling',
            body: [
              'The @dataclass decorator automatically generates __init__, __repr__, and equality checks for data-holding classes. When reading or writing files, always use a with statement so resources close automatically even if an error occurs.',
            ],
            example: {
              title: 'Dataclass & Context Manager',
              language: 'python',
              code: `from dataclasses import dataclass

@dataclass
class Task:
    title: str
    done: bool = False

task = Task("Write unit tests", done=True)
print(task)

# Context manager ensures file closes automatically
with open("notes.txt", "w", encoding="utf-8") as file:
    file.write(f"[{'x' if task.done else ' '}] {task.title}\\n")`,
              output: `Task(title='Write unit tests', done=True)`,
            },
          },
        ],
      },
    ],
  },
  {
    id: 'c',
    group: 'languages',
    name: 'C',
    fullName: 'C Programming',
    tagline:
      'Master low-level memory, pointers, structs, and how computers execute code close to the metal.',
    accent: 'slate',
    badge: 'Systems',
    lessons: [
      {
        slug: 'c-basics',
        title: 'C Basics, Types & printf',
        duration: '5 min',
        summary:
          'Understand compilation, headers, statically typed variables, and formatted output with printf.',
        sections: [
          {
            id: 'hello-c',
            heading: 'Structure of a C Program',
            body: [
              'C is a compiled, statically typed systems language. Every standalone program starts executing in int main(void) and returns 0 to signal success to the operating system.',
              'Include <stdio.h> for standard input/output functions like printf, using format specifiers such as %d (int), %.2f (float/double), and %s (string).',
            ],
            example: {
              title: 'Variables & Formatted Output',
              language: 'c',
              code: `#include <stdio.h>

int main(void) {
    int lessons = 4;
    double hours = 1.5;
    const char *track = "C Programming";

    printf("%s: %d lessons (%.1f hrs)\\n", track, lessons, hours);
    return 0;
}`,
              output: `C Programming: 4 lessons (1.5 hrs)`,
            },
            tip: 'Compile with warnings enabled (gcc -Wall -Wextra -Werror main.c -o app) so the compiler catches subtle bugs early.',
          },
        ],
      },
      {
        slug: 'pointers-and-memory',
        title: 'Pointers & Memory Addresses',
        duration: '7 min',
        summary:
          'Read and mutate memory directly using address-of (&), dereference (*), and pass-by-pointer functions.',
        sections: [
          {
            id: 'pointer-fundamentals',
            heading: 'Address-Of (&) and Dereference (*)',
            body: [
              'A pointer stores the memory address of another variable. Passing a pointer to a function allows that function to modify the caller’s original value without copying large structures.',
            ],
            example: {
              title: 'Swapping Values with Pointers',
              language: 'c',
              code: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 10, y = 25;
    swap(&x, &y);
    printf("x = %d, y = %d\\n", x, y);
    return 0;
}`,
              output: `x = 25, y = 10`,
            },
            tip: 'Always initialize pointers to NULL if they do not yet point to valid memory, and check for NULL before dereferencing.',
          },
        ],
      },
      {
        slug: 'arrays-and-strings',
        title: 'Arrays & C Strings',
        duration: '6 min',
        summary:
          'Work safely with fixed-size arrays and null-terminated char arrays without buffer overflows.',
        sections: [
          {
            id: 'null-terminated-strings',
            heading: 'Null-Terminated Character Arrays',
            body: [
              "In C, a string is an array of char values ending with the null character '\\0'. Always pass the array length alongside array parameters so loops never read past the end of allocated memory.",
            ],
            example: {
              title: 'Summing an Array Safely',
              language: 'c',
              code: `#include <stdio.h>
#include <string.h>

int sum_array(const int *arr, size_t len) {
    int total = 0;
    for (size_t i = 0; i < len; i++) {
        total += arr[i];
    }
    return total;
}

int main(void) {
    int nums[] = {4, 8, 15, 16, 23};
    size_t count = sizeof(nums) / sizeof(nums[0]);
    const char *label = "CodeHub";

    printf("%s (%zu chars) | Sum = %d\\n", label, strlen(label), sum_array(nums, count));
    return 0;
}`,
              output: `CodeHub (7 chars) | Sum = 66`,
            },
          },
        ],
      },
      {
        slug: 'structs-and-malloc',
        title: 'Structs & Dynamic Memory',
        duration: '7 min',
        summary:
          'Group related fields with struct and allocate heap memory cleanly with malloc and free.',
        sections: [
          {
            id: 'heap-allocation',
            heading: 'Structs, malloc & free',
            body: [
              'Use typedef struct to model records, and malloc() from <stdlib.h> when size is only known at runtime. Every successful malloc() must be paired with exactly one free() to prevent memory leaks.',
            ],
            example: {
              title: 'Allocating & Freeing a Struct',
              language: 'c',
              code: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int id;
    double score;
} Student;

int main(void) {
    Student *s = malloc(sizeof(Student));
    if (s == NULL) return 1;

    s->id = 101;
    s->score = 94.5;
    printf("Student #%d -> %.1f\\n", s->id, s->score);

    free(s);
    s = NULL;
    return 0;
}`,
              output: `Student #101 -> 94.5`,
            },
          },
        ],
      },
    ],
  },
  {
    id: 'cpp',
    group: 'languages',
    name: 'C++',
    fullName: 'Modern C++',
    tagline:
      'Combine zero-overhead performance with STL containers, RAII, and generic programming.',
    accent: 'indigo',
    badge: 'Systems / OOP',
    lessons: [
      {
        slug: 'cpp-modern-basics',
        title: 'Modern C++ Basics',
        duration: '5 min',
        summary:
          'Write clean modern C++ using std::string, references, auto type deduction, and const correctness.',
        sections: [
          {
            id: 'references-and-auto',
            heading: 'References, auto & std::string',
            body: [
              'Modern C++ (C++17/C++20) favors std::string over raw char pointers and const references (const std::string&) to avoid unnecessary copies while keeping code safe and readable.',
            ],
            example: {
              title: 'Const References & auto',
              language: 'cpp',
              code: `#include <iostream>
#include <string>

void greet(const std::string& name) {
    std::cout << "Hello, " << name << "!\\n";
}

int main() {
    auto user = std::string{"Bopha"};
    greet(user);
    return 0;
}`,
              output: `Hello, Bopha!`,
            },
          },
        ],
      },
      {
        slug: 'stl-vectors-and-maps',
        title: 'STL Vectors & Hash Maps',
        duration: '6 min',
        summary:
          'Store dynamic collections with std::vector and index key-value pairs with std::unordered_map.',
        sections: [
          {
            id: 'stl-containers',
            heading: 'std::vector & Range-Based Loops',
            body: [
              'std::vector is the default dynamic array in C++: contiguous in memory, cache-friendly, and automatically resized. Pair it with range-based for loops and std::unordered_map for fast key lookups.',
            ],
            example: {
              title: 'Vector & Unordered Map',
              language: 'cpp',
              code: `#include <iostream>
#include <unordered_map>
#include <vector>

int main() {
    std::vector<int> values = {10, 20, 30};
    values.push_back(40);

    std::unordered_map<std::string, int> stock = {{"CPU", 5}, {"RAM", 12}};
    for (const auto& [item, qty] : stock) {
        std::cout << item << ": " << qty << "\\n";
    }
    std::cout << "Vector size: " << values.size() << "\\n";
}`,
              output: `RAM: 12
CPU: 5
Vector size: 4`,
            },
          },
        ],
      },
      {
        slug: 'classes-and-raii',
        title: 'Classes, RAII & Smart Pointers',
        duration: '7 min',
        summary:
          'Manage object lifetimes automatically using RAII and std::unique_ptr instead of raw new/delete.',
        sections: [
          {
            id: 'raii-smart-pointers',
            heading: 'RAII & std::unique_ptr',
            body: [
              'RAII (Resource Acquisition Is Initialization) ties resource ownership to object lifetime: resources are acquired in constructors and released automatically in destructors.',
              'Prefer std::make_unique over raw new and delete so memory is guaranteed to be freed when leaving scope.',
            ],
            example: {
              title: 'Encapsulated Class with unique_ptr',
              language: 'cpp',
              code: `#include <iostream>
#include <memory>
#include <string>

class Service {
    std::string name_;
public:
    explicit Service(std::string name) : name_(std::move(name)) {}
    void start() const { std::cout << "Started " << name_ << "\\n"; }
};

int main() {
    auto svc = std::make_unique<Service>("AuthService");
    svc->start();
    // Automatically destroyed here — zero leaks
}`,
              output: `Started AuthService`,
            },
            tip: 'Follow the Rule of Zero: rely on STL containers and smart pointers so you rarely need to write custom destructors.',
          },
        ],
      },
      {
        slug: 'templates-and-algorithms',
        title: 'Templates & STL Algorithms',
        duration: '6 min',
        summary:
          'Write type-generic code with templates and combine <algorithm> functions with lambdas.',
        sections: [
          {
            id: 'generic-algorithms',
            heading: 'Templates & std::sort with Lambdas',
            body: [
              'Templates let you write one function that compiles cleanly for any compatible type with zero runtime overhead. Standard algorithms like std::sort accept concise lambda comparators.',
            ],
            example: {
              title: 'Generic Max & Lambda Sort',
              language: 'cpp',
              code: `#include <algorithm>
#include <iostream>
#include <vector>

template <typename T>
T max_of(const T& a, const T& b) {
    return (a > b) ? a : b;
}

int main() {
    std::vector<int> nums = {5, 1, 9, 3};
    std::sort(nums.begin(), nums.end(), [](int a, int b) { return a > b; });

    std::cout << "Max: " << max_of(12, 27) << "\\n";
    std::cout << "Sorted desc: " << nums[0] << ", " << nums[1] << ", " << nums[2] << ", " << nums[3] << "\\n";
}`,
              output: `Max: 27
Sorted desc: 9, 5, 3, 1`,
            },
          },
        ],
      },
    ],
  },
  {
    id: 'java',
    group: 'languages',
    name: 'Java',
    fullName: 'Java Development',
    tagline:
      'Build portable, enterprise-grade backend services with strong typing, OOP, and the JVM.',
    accent: 'rose',
    badge: 'OOP / JVM',
    lessons: [
      {
        slug: 'java-basics',
        title: 'Java Basics & Strong Typing',
        duration: '5 min',
        summary:
          'Learn Java classes, static typing, primitives vs reference types, and var local inference.',
        sections: [
          {
            id: 'java-entry',
            heading: 'Classes, Types & main()',
            body: [
              'Java compiles source files into bytecode that runs on any platform with a Java Virtual Machine (JVM). Every piece of code belongs to a class, and modern Java supports var for concise local variable declarations.',
            ],
            example: {
              title: 'Basic Java Program',
              language: 'java',
              code: `public class Main {
    public static void main(String[] args) {
        var course = "Java Fundamentals";
        int modules = 4;
        boolean ready = true;

        System.out.printf("%s (%d modules) - Ready: %b%n", course, modules, ready);
    }
}`,
              output: `Java Fundamentals (4 modules) - Ready: true`,
            },
          },
        ],
      },
      {
        slug: 'oop-classes-interfaces',
        title: 'Interfaces & Java Records',
        duration: '6 min',
        summary:
          'Design clean contracts with interfaces and eliminate boilerplate data classes using Java records.',
        sections: [
          {
            id: 'records-and-interfaces',
            heading: 'Immutable Records & Polymorphism',
            body: [
              'Interfaces define a contract of behavior without tying callers to one concrete class. Java records create concise, immutable data carriers with automatic constructors, getters, equals, and toString.',
            ],
            example: {
              title: 'Interface & Record Example',
              language: 'java',
              code: `interface Notifier {
    void send(String message);
}

record EmailNotifier(String address) implements Notifier {
    public void send(String message) {
        System.out.println("Email to " + address + ": " + message);
    }
}

public class Demo {
    public static void main(String[] args) {
        Notifier notifier = new EmailNotifier("dev@codehub.dev");
        notifier.send("Build passed!");
    }
}`,
              output: `Email to dev@codehub.dev: Build passed!`,
            },
          },
        ],
      },
      {
        slug: 'collections-and-streams',
        title: 'Collections & Streams API',
        duration: '6 min',
        summary:
          'Filter, map, and aggregate Java Lists and Maps declaratively using the Streams API.',
        sections: [
          {
            id: 'java-streams',
            heading: 'Declarative Data Pipelines',
            body: [
              'Java’s List, Set, and Map interfaces power everyday data storage. Combine them with .stream() to express filtering, mapping, and sorting clearly without mutating the source list.',
            ],
            example: {
              title: 'Filtering & Transforming with Streams',
              language: 'java',
              code: `import java.util.List;

public class StreamDemo {
    public static void main(String[] args) {
        var prices = List.of(12, 45, 8, 60, 25);

        var featured = prices.stream()
            .filter(p -> p >= 20)
            .sorted()
            .map(p -> "$" + p)
            .toList();

        System.out.println(featured);
    }
}`,
              output: `[$25, $45, $60]`,
            },
          },
        ],
      },
      {
        slug: 'exceptions-and-generics',
        title: 'Exceptions & Optional<T>',
        duration: '6 min',
        summary:
          'Handle errors gracefully with try-catch and avoid NullPointerException using Optional<T>.',
        sections: [
          {
            id: 'optional-safety',
            heading: 'Safer Return Values with Optional',
            body: [
              'Returning Optional<T> explicitly signals to callers that a lookup might not find a value, encouraging safe fallback handling with orElse() instead of risky null checks.',
            ],
            example: {
              title: 'Using Optional & Try-Catch',
              language: 'java',
              code: `import java.util.Map;
import java.util.Optional;

public class Lookup {
    static Optional<String> findRole(String user) {
        var roles = Map.of("lina", "Backend Engineer", "kosal", "QA Lead");
        return Optional.ofNullable(roles.get(user));
    }

    public static void main(String[] args) {
        System.out.println(findRole("lina").orElse("Guest"));
        System.out.println(findRole("unknown").orElse("Guest"));
    }
}`,
              output: `Backend Engineer
Guest`,
            },
            tip: 'Use try-with-resources (try (var reader = ...)) for files, sockets, and database connections so they close automatically.',
          },
        ],
      },
    ],
  },
  {
    id: 'csharp',
    group: 'languages',
    name: 'C#',
    fullName: 'C# & .NET',
    tagline: 'Build web APIs, desktop apps, and Unity games with modern C#, LINQ, and async/await.',
    accent: 'purple',
    badge: '.NET / OOP',
    lessons: [
      {
        slug: 'csharp-basics',
        title: 'C# Basics & Nullable Types',
        duration: '5 min',
        summary:
          'Write concise C# with top-level statements, string interpolation, and nullable reference safety.',
        sections: [
          {
            id: 'modern-csharp',
            heading: 'Top-Level Statements & Null Safety',
            body: [
              'Modern C# removes ceremonial boilerplate with top-level statements and interpolated strings ($"..."). Nullable types (string?) and the null-coalescing operator (??) help eliminate null reference bugs at compile time.',
            ],
            example: {
              title: 'Interpolation & Null-Coalescing',
              language: 'csharp',
              code: `string? nickname = null;
string displayName = nickname ?? "Developer";
int year = 2026;

Console.WriteLine($"Welcome, {displayName}! Building with C# in {year}.");`,
              output: `Welcome, Developer! Building with C# in 2026.`,
            },
          },
        ],
      },
      {
        slug: 'classes-records-properties',
        title: 'Properties, Records & Pattern Matching',
        duration: '6 min',
        summary:
          'Model domain types cleanly with init-only properties, records, and expressive switch expressions.',
        sections: [
          {
            id: 'records-and-switch',
            heading: 'Records & Switch Expressions',
            body: [
              'C# records give you value-based equality and non-destructive copying via the with keyword. Combine them with switch expressions for clean, exhaustive branching logic.',
            ],
            example: {
              title: 'Record & Switch Expression',
              language: 'csharp',
              code: `record User(string Name, string Plan);

static string GetLimit(User user) => user.Plan switch
{
    "Pro" => "Unlimited projects",
    "Team" => "Shared workspaces",
    _ => "Up to 3 projects"
};

var u = new User("Rith", "Pro");
Console.WriteLine($"{u.Name}: {GetLimit(u)}");`,
              output: `Rith: Unlimited projects`,
            },
          },
        ],
      },
      {
        slug: 'linq-and-collections',
        title: 'LINQ & Generic Collections',
        duration: '6 min',
        summary:
          'Query, filter, sort, and project in-memory collections cleanly using LINQ extension methods.',
        sections: [
          {
            id: 'linq-queries',
            heading: 'Where, OrderBy & Select',
            body: [
              'LINQ (Language Integrated Query) gives C# a unified, type-safe way to transform collections, JSON data, and database queries using readable method chains.',
            ],
            example: {
              title: 'Chaining LINQ Methods',
              language: 'csharp',
              code: `using System.Linq;

var scores = new List<int> { 72, 91, 64, 88, 95 };

var honors = scores
    .Where(s => s >= 85)
    .OrderByDescending(s => s)
    .Select(s => $"{s}%");

Console.WriteLine(string.Join(", ", honors));`,
              output: `95%, 91%, 88%`,
            },
          },
        ],
      },
      {
        slug: 'async-await-dotnet',
        title: 'Async/Await & Tasks',
        duration: '6 min',
        summary:
          'Keep applications responsive and servers scalable using async Task<T>, await, and Task.WhenAll.',
        sections: [
          {
            id: 'tasks-concurrency',
            heading: 'Non-Blocking I/O with async & await',
            body: [
              'Mark I/O-bound methods as async Task<T> and await asynchronous operations so threads are freed to handle other work while waiting. Run independent tasks concurrently with Task.WhenAll.',
            ],
            example: {
              title: 'Running Tasks in Parallel',
              language: 'csharp',
              code: `async Task<string> FetchAsync(string endpoint)
{
    await Task.Delay(50);
    return $"OK:{endpoint}";
}

var results = await Task.WhenAll(
    FetchAsync("/users"),
    FetchAsync("/orders")
);

Console.WriteLine(string.Join(" | ", results));`,
              output: `OK:/users | OK:/orders`,
            },
            tip: 'Always await Tasks instead of calling .Result or .Wait(), which can cause thread-pool starvation and deadlocks.',
          },
        ],
      },
    ],
  },
]

export const languageResources = [
  {
    id: 'python-docs',
    title: 'Official Python 3 Tutorial',
    category: 'python',
    type: 'Guide',
    description:
      'Comprehensive official guide covering Python syntax, standard library, modules, and classes.',
    url: 'https://docs.python.org/3/tutorial/',
  },
  {
    id: 'cppreference-c',
    title: 'cppreference — C Standard Library',
    category: 'c',
    type: 'Reference',
    description:
      'Authoritative reference for C headers, memory functions, pointers, and language specifications.',
    url: 'https://en.cppreference.com/w/c',
  },
  {
    id: 'cppreference-cpp',
    title: 'learncpp.com & cppreference (C++)',
    category: 'cpp',
    type: 'Reference',
    description:
      'Complete modern C++ reference for STL containers, smart pointers, templates, and algorithms.',
    url: 'https://en.cppreference.com/w/cpp',
  },
  {
    id: 'dev-java',
    title: 'Dev.java — Learn Java',
    category: 'java',
    type: 'Guide',
    description:
      'Official Java learning portal covering OOP, records, streams, generics, and JVM tools.',
    url: 'https://dev.java/learn/',
  },
  {
    id: 'ms-learn-csharp',
    title: 'Microsoft Learn — C# Documentation',
    category: 'csharp',
    type: 'Reference',
    description:
      'Official C# and .NET guides covering LINQ, async/await, pattern matching, and ASP.NET Core.',
    url: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
  },
]
