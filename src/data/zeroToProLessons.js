export const lessonLevels = {
  // HTML
  'html/introduction': 'beginner',
  'html/semantic-text': 'beginner',
  'html/links-and-images': 'beginner',
  'html/lists-and-tables': 'intermediate',
  'html/forms-and-inputs': 'intermediate',
  'html/accessibility-and-seo': 'pro',

  // CSS
  'css/css-from-zero': 'beginner',
  'css/selectors-and-specificity': 'beginner',
  'css/box-model': 'beginner',
  'css/flexbox': 'intermediate',
  'css/css-grid': 'intermediate',
  'css/responsive-design': 'intermediate',
  'css/design-tokens-and-motion': 'pro',

  // JavaScript
  'javascript/js-from-zero': 'beginner',
  'javascript/variables-and-types': 'beginner',
  'javascript/functions-and-scope': 'beginner',
  'javascript/arrays-and-methods': 'intermediate',
  'javascript/dom-manipulation': 'intermediate',
  'javascript/events-and-interactivity': 'intermediate',
  'javascript/async-await-and-modules': 'pro',

  // Python
  'python/python-from-zero': 'beginner',
  'python/python-basics': 'beginner',
  'python/lists-and-dicts': 'intermediate',
  'python/functions-and-modules': 'intermediate',
  'python/oop-and-files': 'intermediate',
  'python/python-async-and-apis': 'pro',

  // C
  'c/c-basics': 'beginner',
  'c/c-control-flow-functions': 'beginner',
  'c/pointers-and-memory': 'intermediate',
  'c/arrays-and-strings': 'intermediate',
  'c/structs-and-malloc': 'intermediate',
  'c/c-headers-and-safety': 'pro',

  // C++
  'cpp/cpp-from-zero': 'beginner',
  'cpp/cpp-modern-basics': 'beginner',
  'cpp/stl-vectors-and-maps': 'intermediate',
  'cpp/classes-and-raii': 'intermediate',
  'cpp/templates-and-algorithms': 'intermediate',
  'cpp/cpp-move-and-concurrency': 'pro',

  // Java
  'java/java-basics': 'beginner',
  'java/java-control-flow-methods': 'beginner',
  'java/oop-classes-interfaces': 'intermediate',
  'java/collections-and-streams': 'intermediate',
  'java/exceptions-and-generics': 'intermediate',
  'java/java-concurrency-and-architecture': 'pro',

  // C#
  'csharp/csharp-basics': 'beginner',
  'csharp/csharp-control-flow-methods': 'beginner',
  'csharp/classes-records-properties': 'intermediate',
  'csharp/linq-and-collections': 'intermediate',
  'csharp/async-await-dotnet': 'intermediate',
  'csharp/csharp-di-and-apis': 'pro',

  // Software Engineering
  'software-engineering/how-software-is-built': 'beginner',
  'software-engineering/git-and-version-control': 'beginner',
  'software-engineering/data-structures-and-algorithms': 'intermediate',
  'software-engineering/clean-code-and-solid': 'intermediate',
  'software-engineering/testing-and-debugging': 'intermediate',
  'software-engineering/system-design-and-apis': 'pro',
}

export const trackLessonAdditions = {
  html: {
    append: [
      {
        slug: 'accessibility-and-seo',
        level: 'pro',
        title: 'Accessibility (ARIA), SEO & Performance',
        duration: '7 min',
        summary:
          'Ship production-grade HTML with ARIA live regions, keyboard focus support, SEO metadata, and lazy-loaded media.',
        sections: [
          {
            id: 'aria-and-metadata',
            heading: 'Accessible Landmarks, ARIA & Fast Media',
            body: [
              'Professional HTML goes beyond visual layout: use native interactive elements (<button>, <a href>), label icon-only buttons with aria-label, and announce dynamic status updates with aria-live="polite".',
              'For performance and SEO, include <meta name="description">, set width/height plus loading="lazy" on below-the-fold images to eliminate layout shift (CLS).',
            ],
            example: {
              title: 'Accessible Status Banner & Lazy Image',
              language: 'html',
              code: `<main>
  <button id="save-btn" type="button">Save Changes</button>
  <p id="live-status" role="status" aria-live="polite"></p>
  <img src="https://picsum.photos/400/180" width="400" height="180" loading="lazy" alt="Workspace preview" />
</main>`,
              playground: {
                html: `<main class="box">
  <button id="save-btn" type="button">Save Changes</button>
  <p id="live-status" role="status" aria-live="polite">No unsaved changes.</p>
</main>`,
                css: `body { font-family: system-ui, sans-serif; padding: 24px; color: #18181b; }
.box { display: grid; gap: 12px; max-width: 360px; }
button { padding: 10px 16px; border: none; border-radius: 8px; background: #18181b; color: white; font-weight: 500; cursor: pointer; }
button:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
#live-status { margin: 0; font-size: 14px; color: #059669; }`,
                js: `let count = 0;
document.getElementById('save-btn').addEventListener('click', () => {
  count += 1;
  const msg = \`Saved successfully (revision #\${count})\`;
  document.getElementById('live-status').textContent = msg;
  console.log('Announced to screen readers:', msg);
});`,
              },
            },
            tip: 'Use native HTML first—only add ARIA attributes when no native element expresses the same state or role.',
          },
        ],
      },
    ],
  },
  css: {
    prepend: [
      {
        slug: 'css-from-zero',
        level: 'beginner',
        title: 'How CSS Works',
        duration: '4 min',
        summary:
          'Never written CSS before? Learn what CSS rules are, how properties and values style HTML, and how to connect a stylesheet.',
        sections: [
          {
            id: 'first-css-rule',
            heading: 'Your First CSS Rule',
            body: [
              'CSS (Cascading Style Sheets) controls how HTML looks—colors, typography, spacing, and layout. Every rule has a selector (what to style) and declarations inside { } (property: value;).',
              'In real projects, place CSS in a separate styles.css file and connect it inside <head> with <link rel="stylesheet" href="styles.css" />.',
            ],
            example: {
              title: 'First Styled Card',
              language: 'css',
              code: `h1 {
  color: #1d4ed8;
  font-size: 28px;
}

p {
  color: #52525b;
  line-height: 1.6;
}`,
              playground: {
                html: `<h1>Hello, CSS!</h1>
<p>Change the color or font-size in the CSS tab to see instant styling updates.</p>`,
                css: `body {
  font-family: system-ui, sans-serif;
  padding: 24px;
}
h1 {
  color: #1d4ed8;
  font-size: 28px;
  margin-bottom: 8px;
}
p {
  color: #52525b;
  line-height: 1.6;
}`,
                js: '',
              },
            },
          },
        ],
      },
    ],
    append: [
      {
        slug: 'design-tokens-and-motion',
        level: 'pro',
        title: 'CSS Variables, Theming & Smooth Motion',
        duration: '7 min',
        summary:
          'Build scalable design systems with CSS custom properties, theme switching, and GPU-composited animations.',
        sections: [
          {
            id: 'tokens-and-composited-motion',
            heading: 'Design Tokens & 60fps Transitions',
            body: [
              'Define colors, radii, and easing curves as CSS custom properties (--surface, --accent, --ease-out) on :root so switching themes takes a single class toggle.',
              'For buttery-smooth animations, animate only transform and opacity—never width, height, top, or left—and respect prefers-reduced-motion.',
            ],
            example: {
              title: 'Themeable Card with Design Tokens',
              language: 'css',
              code: `:root {
  --surface: #ffffff;
  --ink: #18181b;
  --accent: #2563eb;
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
}

.cta {
  background: var(--accent);
  color: white;
  transition: transform 160ms var(--ease-out);
}
.cta:active { transform: scale(0.97); }`,
              playground: {
                html: `<div id="card" class="card">
  <h2>Design Tokens</h2>
  <p>CSS variables let you swap entire themes cleanly.</p>
  <button id="toggle" class="cta">Toggle Theme</button>
</div>`,
                css: `:root {
  --bg: #fafafa;
  --surface: #ffffff;
  --ink: #18181b;
  --muted: #52525b;
  --border: #e4e4e7;
  --accent: #18181b;
  --accent-ink: #ffffff;
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
}
.dark {
  --bg: #09090b;
  --surface: #18181b;
  --ink: #fafafa;
  --muted: #a1a1aa;
  --border: #27272a;
  --accent: #fafafa;
  --accent-ink: #09090b;
}
body { font-family: system-ui, sans-serif; margin: 0; padding: 24px; background: var(--bg); color: var(--ink); transition: background-color 180ms ease, color 180ms ease; }
.card { max-width: 360px; padding: 24px; border-radius: 14px; background: var(--surface); border: 1px solid var(--border); }
p { color: var(--muted); font-size: 14px; line-height: 1.6; }
.cta { padding: 9px 16px; border: none; border-radius: 8px; background: var(--accent); color: var(--accent-ink); font-weight: 500; cursor: pointer; transition: transform 160ms var(--ease-out); }
.cta:active { transform: scale(0.97); }`,
                js: `document.getElementById('toggle').addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  console.log('Dark theme:', document.documentElement.classList.contains('dark'));
});`,
              },
            },
          },
        ],
      },
    ],
  },
  javascript: {
    prepend: [
      {
        slug: 'js-from-zero',
        level: 'beginner',
        title: 'First JavaScript & Logic',
        duration: '5 min',
        summary:
          'Start with zero programming experience: print messages, make decisions with if/else, and repeat steps with loops.',
        sections: [
          {
            id: 'first-js-logic',
            heading: 'Output, Conditions & Loops',
            body: [
              'JavaScript is the programming language of the browser. Start by printing results with console.log(), choosing paths with if / else, and repeating tasks with a for loop.',
            ],
            example: {
              title: 'Conditions & Loops from Scratch',
              language: 'javascript',
              code: `const score = 88;

if (score >= 70) {
  console.log('Passed!');
} else {
  console.log('Keep practicing!');
}

for (let step = 1; step <= 3; step += 1) {
  console.log('Step', step);
}`,
              playground: {
                html: `<div id="out" style="font-family: monospace; padding: 20px; line-height: 1.8;"></div>`,
                css: '',
                js: `const lines = [];
const score = 88;

lines.push(score >= 70 ? 'Score ' + score + ': Passed!' : 'Keep practicing!');
for (let step = 1; step <= 3; step += 1) {
  lines.push('Completed step #' + step);
}

document.getElementById('out').innerHTML = lines.join('<br>');
lines.forEach((l) => console.log(l));`,
              },
            },
          },
        ],
      },
    ],
    append: [
      {
        slug: 'async-await-and-modules',
        level: 'pro',
        title: 'Async/Await, Promises & Error Handling',
        duration: '7 min',
        summary:
          'Master asynchronous JavaScript with async/await, Promise.all concurrency, and resilient try/catch error boundaries.',
        sections: [
          {
            id: 'async-patterns',
            heading: 'Concurrent Requests & Safe Error Handling',
            body: [
              'Real-world apps constantly wait on APIs and timers. Use async/await for readable asynchronous code, wrap awaited calls in try/catch, and run independent requests in parallel with Promise.all instead of sequentially.',
            ],
            example: {
              title: 'Parallel Async Fetch Pattern',
              language: 'javascript',
              code: `async function loadDashboard() {
  try {
    const [user, stats] = await Promise.all([
      fetchUser(),
      fetchStats()
    ]);
    return { user, stats };
  } catch (error) {
    console.error('Dashboard failed:', error.message);
  }
}`,
              playground: {
                html: `<div class="wrap">
  <button id="load">Load Dashboard Data</button>
  <pre id="out">Click to run Promise.all()</pre>
</div>`,
                css: `body { font-family: system-ui, sans-serif; padding: 24px; color: #18181b; }
button { padding: 9px 16px; border: none; border-radius: 8px; background: #18181b; color: white; font-weight: 500; cursor: pointer; }
pre { margin-top: 14px; padding: 14px; border-radius: 10px; background: #f4f4f5; font-size: 13px; }`,
                js: `const delay = (ms, data) => new Promise((resolve) => setTimeout(() => resolve(data), ms));

document.getElementById('load').addEventListener('click', async () => {
  const out = document.getElementById('out');
  out.textContent = 'Loading user & stats in parallel...';
  const start = performance.now();
  const [user, stats] = await Promise.all([
    delay(250, { name: 'Dara', level: 'Pro' }),
    delay(250, { completed: 56, streakDays: 14 })
  ]);
  const ms = Math.round(performance.now() - start);
  out.textContent = JSON.stringify({ elapsedMs: ms, user, stats }, null, 2);
  console.log('Loaded in', ms + 'ms');
});`,
              },
            },
            tip: 'Two 250ms calls awaited one after another take ~500ms; with Promise.all() they finish together in ~250ms.',
          },
        ],
      },
    ],
  },
  python: {
    prepend: [
      {
        slug: 'python-from-zero',
        level: 'beginner',
        title: 'First Script & Control Flow',
        duration: '5 min',
        summary:
          'Write your very first Python program with zero prior coding experience—print output, make decisions with if/else, and loop cleanly.',
        sections: [
          {
            id: 'first-python-script',
            heading: 'Your First Python Program',
            body: [
              'Python reads almost like plain English, making it one of the best languages to start from zero. Call print() to display output, use if / elif / else for decisions, and for ... in range() to repeat actions.',
            ],
            example: {
              title: 'Hello World, Conditions & Loops',
              language: 'python',
              code: `print("Hello from Python!")

score = 85
if score >= 80:
    print("Grade: A")
elif score >= 60:
    print("Grade: B")
else:
    print("Keep practicing!")

for i in range(1, 4):
    print("Step", i)`,
              output: `Hello from Python!
Grade: A
Step 1
Step 2
Step 3`,
            },
          },
        ],
      },
    ],
    append: [
      {
        slug: 'python-async-and-apis',
        level: 'pro',
        title: 'Asyncio, Protocols & Production Structure',
        duration: '7 min',
        summary:
          'Write high-concurrency Python services using asyncio.gather, structural typing (Protocol), and clean package boundaries.',
        sections: [
          {
            id: 'asyncio-concurrency',
            heading: 'Concurrent Tasks with asyncio',
            body: [
              'For I/O-heavy backends (HTTP APIs, database queries, scrapers), Python’s asyncio event loop runs hundreds of concurrent tasks cleanly on a single thread using async def, await, and asyncio.gather().',
            ],
            example: {
              title: 'Concurrent Service Calls with asyncio',
              language: 'python',
              code: `import asyncio

async def fetch_service(name: str, delay: float) -> str:
    await asyncio.sleep(delay)
    return f"{name}: ok"

async def main() -> None:
    results = await asyncio.gather(
        fetch_service("auth", 0.05),
        fetch_service("billing", 0.05),
    )
    print(" | ".join(results))

asyncio.run(main())`,
              output: `auth: ok | billing: ok`,
            },
            tip: 'Always isolate project dependencies with a virtual environment (python -m venv .venv) and pin versions in pyproject.toml.',
          },
        ],
      },
    ],
  },
  c: {
    insertAfterFirst: [
      {
        slug: 'c-control-flow-functions',
        level: 'beginner',
        title: 'Control Flow, Loops & Functions',
        duration: '5 min',
        summary:
          'Build logic in C using if/else, for/while loops, and clean reusable functions with prototypes.',
        sections: [
          {
            id: 'c-loops-and-functions',
            heading: 'Conditions, Loops & Function Prototypes',
            body: [
              'In C, declare helper functions above main() (or in a header file) so the compiler knows their parameter and return types before they are called.',
            ],
            example: {
              title: 'Loop & Helper Function in C',
              language: 'c',
              code: `#include <stdio.h>

int square(int n) {
    return n * n;
}

int main(void) {
    for (int i = 1; i <= 4; i++) {
        printf("%d^2 = %d\\n", i, square(i));
    }
    return 0;
}`,
              output: `1^2 = 1
2^2 = 4
3^2 = 9
4^2 = 16`,
            },
          },
        ],
      },
    ],
    append: [
      {
        slug: 'c-headers-and-safety',
        level: 'pro',
        title: 'Multi-File Headers, Error Codes & Sanitizers',
        duration: '7 min',
        summary:
          'Structure production C libraries with header guards, explicit status codes, and AddressSanitizer checks.',
        sections: [
          {
            id: 'production-c-habits',
            heading: 'Header Guards & Explicit Error Handling',
            body: [
              'Professional C projects separate public interfaces (.h files with include guards) from implementations (.c files), return explicit error codes instead of ignoring failures, and test with AddressSanitizer (-fsanitize=address,undefined) to catch leaks and out-of-bounds reads immediately.',
            ],
            example: {
              title: 'Safe Division API with Status Code',
              language: 'c',
              code: `#include <stdio.h>
#include <stdbool.h>

bool safe_divide(double a, double b, double *out) {
    if (b == 0.0 || out == NULL) return false;
    *out = a / b;
    return true;
}

int main(void) {
    double result = 0.0;
    if (safe_divide(20.0, 4.0, &result)) {
        printf("Result = %.2f\\n", result);
    }
    return 0;
}`,
              output: `Result = 5.00`,
            },
            tip: 'Run tests with gcc -Wall -Wextra -fsanitize=address,undefined to catch memory bugs before shipping.',
          },
        ],
      },
    ],
  },
  cpp: {
    prepend: [
      {
        slug: 'cpp-from-zero',
        level: 'beginner',
        title: 'First C++ Program & Loops',
        duration: '5 min',
        summary:
          'Begin C++ from scratch: print output with std::cout, store numbers, branch with if/else, and write loops.',
        sections: [
          {
            id: 'first-cpp-program',
            heading: 'Hello World, Types & Loops',
            body: [
              'Every C++ program starts in main(). Use <iostream> and std::cout to print text, declare typed variables like int and double, and use standard if/else and for loops to control flow.',
            ],
            example: {
              title: 'First C++ Program',
              language: 'cpp',
              code: `#include <iostream>

int main() {
    std::cout << "Welcome to C++!\\n";
    for (int i = 1; i <= 3; ++i) {
        std::cout << "Level " << i << "\\n";
    }
    return 0;
}`,
              output: `Welcome to C++!
Level 1
Level 2
Level 3`,
            },
          },
        ],
      },
    ],
    append: [
      {
        slug: 'cpp-move-and-concurrency',
        level: 'pro',
        title: 'Move Semantics, Views & Concurrency',
        duration: '7 min',
        summary:
          'Eliminate expensive copies with std::move and std::string_view, and coordinate threads safely with std::mutex.',
        sections: [
          {
            id: 'zero-copy-and-threads',
            heading: 'Zero-Copy Views & Thread-Safe Guards',
            body: [
              'In high-performance C++, accept std::string_view for read-only text to avoid heap allocations, transfer ownership with std::move, and protect shared state using RAII lock guards (std::scoped_lock) so mutexes always unlock even when exceptions occur.',
            ],
            example: {
              title: 'std::string_view & Scoped Lock Pattern',
              language: 'cpp',
              code: `#include <iostream>
#include <mutex>
#include <string_view>

std::mutex log_mutex;

void log_safe(std::string_view msg) {
    std::scoped_lock lock(log_mutex);
    std::cout << "[INFO] " << msg << "\\n";
}

int main() {
    log_safe("Zero-copy string_view message");
    return 0;
}`,
              output: `[INFO] Zero-copy string_view message`,
            },
          },
        ],
      },
    ],
  },
  java: {
    insertAfterFirst: [
      {
        slug: 'java-control-flow-methods',
        level: 'beginner',
        title: 'Control Flow, Loops & Methods',
        duration: '5 min',
        summary:
          'Write clean Java decisions, loops, and reusable methods with clear parameter and return types.',
        sections: [
          {
            id: 'java-methods-flow',
            heading: 'Switch Expressions, Loops & Methods',
            body: [
              'Break programs into small methods with descriptive names. Modern Java switch expressions return values cleanly without accidental fall-through bugs.',
            ],
            example: {
              title: 'Switch Expression & Loop',
              language: 'java',
              code: `public class FlowDemo {
    static String badge(int score) {
        return switch (score / 10) {
            case 10, 9 -> "Pro";
            case 8, 7 -> "Intermediate";
            default -> "Beginner";
        };
    }

    public static void main(String[] args) {
        System.out.println("92 -> " + badge(92));
        System.out.println("75 -> " + badge(75));
    }
}`,
              output: `92 -> Pro
75 -> Intermediate`,
            },
          },
        ],
      },
    ],
    append: [
      {
        slug: 'java-concurrency-and-architecture',
        level: 'pro',
        title: 'Virtual Threads & Clean Service Design',
        duration: '7 min',
        summary:
          'Scale concurrent workloads with Java 21 Virtual Threads and design testable services using constructor injection.',
        sections: [
          {
            id: 'virtual-threads-and-di',
            heading: 'Virtual Threads & Constructor Injection',
            body: [
              'Java 21 introduced lightweight Virtual Threads (Executors.newVirtualThreadPerTaskExecutor()), enabling thousands of concurrent I/O operations with simple blocking code.',
              'Combine virtual threads with constructor-injected interfaces so business logic stays decoupled from databases and HTTP clients.',
            ],
            example: {
              title: 'Running Tasks on Virtual Threads',
              language: 'java',
              code: `import java.util.concurrent.Executors;

public class VirtualThreadsDemo {
    public static void main(String[] args) throws Exception {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            var task = executor.submit(() -> "Handled on " + Thread.currentThread());
            System.out.println(task.get());
        }
    }
}`,
              output: `Handled on VirtualThread[#21]/runnable@ForkJoinPool-1-worker-1`,
            },
          },
        ],
      },
    ],
  },
  csharp: {
    insertAfterFirst: [
      {
        slug: 'csharp-control-flow-methods',
        level: 'beginner',
        title: 'Control Flow, Loops & Methods',
        duration: '5 min',
        summary:
          'Make decisions with if/else, iterate collections with foreach, and organize code into clean C# methods.',
        sections: [
          {
            id: 'csharp-loops-methods',
            heading: 'foreach Loops & Expression-Bodied Methods',
            body: [
              'Use foreach to iterate arrays and lists without off-by-one index errors, and use expression-bodied methods (=>) for short, pure helpers.',
            ],
            example: {
              title: 'foreach & Helper Method in C#',
              language: 'csharp',
              code: `static bool IsPassing(int score) => score >= 70;

int[] scores = { 65, 80, 94 };
foreach (var s in scores)
{
    Console.WriteLine($"{s}: {(IsPassing(s) ? "Pass" : "Retry")}");
}`,
              output: `65: Retry
80: Pass
94: Pass`,
            },
          },
        ],
      },
    ],
    append: [
      {
        slug: 'csharp-di-and-apis',
        level: 'pro',
        title: 'Dependency Injection & Minimal APIs',
        duration: '7 min',
        summary:
          'Build production .NET backends with built-in Dependency Injection, typed Minimal APIs, and CancellationToken support.',
        sections: [
          {
            id: 'dotnet-di-minimal-api',
            heading: 'Clean DI & Minimal HTTP Endpoints',
            body: [
              'ASP.NET Core ships with a first-class Dependency Injection container. Register interfaces once in Program.cs, inject them directly into Minimal API route handlers, and pass CancellationToken to cancel aborted requests cleanly.',
            ],
            example: {
              title: 'ASP.NET Core Minimal API with DI',
              language: 'csharp',
              code: `var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IGreeter, Greeter>();

var app = builder.Build();
app.MapGet("/hello/{name}", (string name, IGreeter greeter) =>
    Results.Ok(new { message = greeter.Greet(name) }));

app.Run();

interface IGreeter { string Greet(string name); }
class Greeter : IGreeter { public string Greet(string n) => $"Hello, {n}!"; }`,
              output: `GET /hello/CodeHub -> 200 OK { "message": "Hello, CodeHub!" }`,
            },
          },
        ],
      },
    ],
  },
  'software-engineering': {
    prepend: [
      {
        slug: 'how-software-is-built',
        level: 'beginner',
        title: 'How Software Is Built (SDLC)',
        duration: '5 min',
        summary:
          'Start your engineering journey from zero: understand how teams turn an idea into live software step by step.',
        sections: [
          {
            id: 'sdlc-from-zero',
            heading: 'From Idea to Production in 5 Stages',
            body: [
              'Software engineering is more than typing code—it is solving real problems reliably. Every feature moves through five core stages: Plan (clarify requirements), Design (data & architecture), Build (write clean code), Test (verify edge cases), and Ship & Monitor (deploy and watch logs/metrics).',
              'Breaking big problems into tiny, testable steps is the single habit that takes you from beginner to senior engineer.',
            ],
            example: {
              title: 'Interactive Engineering Workflow Checklist',
              language: 'javascript',
              code: `const stages = ['Plan', 'Design', 'Build', 'Test', 'Deploy'];
stages.forEach((stage, i) => {
  console.log(\`\${i + 1}. \${stage}\`);
});`,
              playground: {
                html: `<div class="wrap">
  <h2>Feature Release Checklist</h2>
  <div id="list"></div>
  <p id="status"></p>
</div>`,
                css: `body { font-family: system-ui, sans-serif; padding: 24px; color: #18181b; }
.wrap { max-width: 380px; }
h2 { margin: 0 0 12px; font-size: 18px; }
label { display: flex; align-items: center; gap: 8px; padding: 6px 0; font-size: 14px; cursor: pointer; }
#status { margin-top: 12px; font-weight: 600; font-size: 14px; color: #2563eb; }`,
                js: `const steps = ['1. Plan requirements', '2. Design architecture', '3. Implement clean code', '4. Write unit tests', '5. Deploy & monitor'];
const list = document.getElementById('list');
const status = document.getElementById('status');

steps.forEach((step) => {
  const label = document.createElement('label');
  label.innerHTML = \`<input type="checkbox" /> <span>\${step}</span>\`;
  list.appendChild(label);
});

function update() {
  const done = list.querySelectorAll('input:checked').length;
  status.textContent = done === steps.length ? 'Ready for production!' : \`Progress: \${done} / \${steps.length} stages complete\`;
  console.log('Stages done:', done);
}

list.addEventListener('change', update);
update();`,
              },
            },
          },
        ],
      },
    ],
  },
}
