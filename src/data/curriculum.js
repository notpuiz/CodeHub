export const tracks = [
  {
    id: 'html',
    group: 'web',
    name: 'HTML',
    fullName: 'HTML Fundamentals',
    tagline: 'Structure the web with clean, semantic markup.',
    accent: 'orange',
    badge: 'Markup',
    lessons: [
      {
        slug: 'introduction',
        title: 'HTML Introduction',
        duration: '4 min',
        summary:
          'Learn what HTML is, how elements and tags work, and how every web page is structured from top to bottom.',
        sections: [
          {
            id: 'what-is-html',
            heading: 'What is HTML?',
            body: [
              'HTML (HyperText Markup Language) is the standard language used to create and structure content on the web. Every heading, paragraph, link, button, and form you see in a browser starts as an HTML element.',
              'An HTML element usually consists of an opening tag, content, and a closing tag—for example, <h1>Hello</h1>.',
            ],
          },
          {
            id: 'document-structure',
            heading: 'Basic Document Structure',
            body: [
              'Every modern HTML document starts with <!DOCTYPE html>, followed by the <html> root element containing <head> (metadata, title, styles) and <body> (visible page content).',
            ],
            example: {
              title: 'Basic HTML Page',
              language: 'html',
              code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My First Page</title>
  </head>
  <body>
    <h1>Welcome to CodeHub</h1>
    <p>This is your first HTML document.</p>
  </body>
</html>`,
              playground: {
                html: `<h1>Welcome to CodeHub</h1>
<p>Edit this HTML and see the preview update live!</p>
<button onclick="alert('You clicked the button!')">Say Hello</button>`,
                css: `body {
  font-family: system-ui, sans-serif;
  padding: 24px;
  line-height: 1.6;
  color: #18181b;
}
button {
  margin-top: 12px;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: #2563eb;
  color: white;
  font-weight: 500;
  cursor: pointer;
}`,
                js: '',
              },
            },
            tip: 'Always include the lang attribute on <html> (e.g. lang="en") so screen readers and search engines know the document language.',
          },
        ],
      },
      {
        slug: 'semantic-text',
        title: 'Headings & Semantic Text',
        duration: '5 min',
        summary:
          'Use headings, paragraphs, emphasis, and semantic landmarks to make pages readable for both humans and assistive technologies.',
        sections: [
          {
            id: 'headings-hierarchy',
            heading: 'Heading Hierarchy',
            body: [
              'HTML provides six levels of headings from <h1> (most important) to <h6> (least important). Use only one <h1> per page for the main title, and avoid skipping heading levels.',
            ],
            example: {
              title: 'Headings & Inline Semantics',
              language: 'html',
              code: `<article>
  <h1>Learning Semantic HTML</h1>
  <p>Use <strong>strong</strong> for importance and <em>em</em> for emphasis.</p>
  <h2>Why Semantics Matter</h2>
  <p>Semantic tags like <mark>&lt;header&gt;</mark>, <mark>&lt;main&gt;</mark>, and <mark>&lt;footer&gt;</mark> describe meaning, not just appearance.</p>
</article>`,
              playground: {
                html: `<article class="card">
  <h1>Learning Semantic HTML</h1>
  <p>Use <strong>strong</strong> for importance and <em>em</em> for emphasis.</p>
  <h2>Why Semantics Matter</h2>
  <p>Semantic tags like <mark>&lt;header&gt;</mark>, <mark>&lt;main&gt;</mark>, and <mark>&lt;footer&gt;</mark> give structure and accessibility.</p>
</article>`,
                css: `body {
  font-family: system-ui, sans-serif;
  padding: 24px;
  color: #18181b;
}
.card {
  max-width: 52ch;
  line-height: 1.65;
}
mark {
  background: #fef08a;
  padding: 2px 6px;
  border-radius: 4px;
}`,
                js: '',
              },
            },
          },
        ],
      },
      {
        slug: 'links-and-images',
        title: 'Links & Images',
        duration: '5 min',
        summary: 'Connect pages together with anchor tags and embed accessible, responsive images.',
        sections: [
          {
            id: 'anchors-and-media',
            heading: 'Anchors & Alt Text',
            body: [
              'The <a> element creates hyperlinks using the href attribute. The <img> element embeds an image using src and should always include a descriptive alt attribute for accessibility and fallback text.',
            ],
            example: {
              title: 'Links & Accessible Images',
              language: 'html',
              code: `<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
  Visit MDN Web Docs
</a>

<figure>
  <img src="https://picsum.photos/480/220" alt="Random scenic landscape" />
  <figcaption>Always pair figures with a helpful caption.</figcaption>
</figure>`,
              playground: {
                html: `<div class="wrap">
  <a class="link" href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
    Explore MDN Web Docs →
  </a>
  <figure>
    <img src="https://picsum.photos/480/220" alt="Random scenic landscape" />
    <figcaption>Images scale cleanly when given max-width: 100%.</figcaption>
  </figure>
</div>`,
                css: `body { font-family: system-ui, sans-serif; padding: 24px; color: #18181b; }
.link { color: #2563eb; font-weight: 600; text-decoration: none; }
.link:hover { text-decoration: underline; }
figure { margin: 20px 0 0; }
img { max-width: 100%; border-radius: 10px; display: block; }
figcaption { margin-top: 8px; font-size: 14px; color: #52525b; }`,
                js: '',
              },
            },
            tip: 'When using target="_blank", add rel="noopener noreferrer" for security and performance.',
          },
        ],
      },
      {
        slug: 'lists-and-tables',
        title: 'Lists & Tables',
        duration: '5 min',
        summary:
          'Organize items with ordered and unordered lists, and display structured tabular data cleanly.',
        sections: [
          {
            id: 'lists-tables',
            heading: 'Unordered Lists & Data Tables',
            body: [
              'Use <ul> for bulleted lists, <ol> for numbered steps, and <table> with <thead> and <tbody> exclusively for tabular data—never for page layout.',
            ],
            example: {
              title: 'Structured Data Table',
              language: 'html',
              code: `<table>
  <thead>
    <tr>
      <th>Language</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTML</td>
      <td>Structure</td>
    </tr>
    <tr>
      <td>CSS</td>
      <td>Presentation</td>
    </tr>
    <tr>
      <td>JavaScript</td>
      <td>Interactivity</td>
    </tr>
  </tbody>
</table>`,
              playground: {
                html: `<h2>Web Stack</h2>
<table>
  <thead>
    <tr><th>Language</th><th>Role</th></tr>
  </thead>
  <tbody>
    <tr><td>HTML</td><td>Structure</td></tr>
    <tr><td>CSS</td><td>Presentation</td></tr>
    <tr><td>JavaScript</td><td>Interactivity</td></tr>
  </tbody>
</table>`,
                css: `body { font-family: system-ui, sans-serif; padding: 24px; color: #18181b; }
table { width: 100%; border-collapse: collapse; margin-top: 12px; }
th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #e4e4e7; }
th { font-size: 13px; text-transform: uppercase; letter-spacing: 0.04em; color: #52525b; }`,
                js: '',
              },
            },
          },
        ],
      },
      {
        slug: 'forms-and-inputs',
        title: 'Forms & Inputs',
        duration: '6 min',
        summary:
          'Collect user input with labels, input types, validation attributes, and accessible submit buttons.',
        sections: [
          {
            id: 'accessible-forms',
            heading: 'Labels & Native Validation',
            body: [
              'Every form control should be paired with a <label> using matching for and id attributes. HTML5 input types like email, number, and attributes like required give you free browser validation.',
            ],
            example: {
              title: 'Accessible Sign-Up Form',
              language: 'html',
              code: `<form id="signup">
  <label for="email">Email address</label>
  <input id="email" type="email" required placeholder="student@codehub.dev" />
  <button type="submit">Join Track</button>
</form>`,
              playground: {
                html: `<form id="signup" class="form">
  <label for="email">Email address</label>
  <input id="email" type="email" required placeholder="student@codehub.dev" />
  <button type="submit">Join Track</button>
  <p id="status"></p>
</form>`,
                css: `body { font-family: system-ui, sans-serif; padding: 24px; color: #18181b; }
.form { display: grid; gap: 10px; max-width: 320px; }
label { font-size: 14px; font-weight: 500; }
input { padding: 8px 12px; border: 1px solid #d4d4d8; border-radius: 8px; font-size: 14px; }
button { padding: 9px 14px; border: none; border-radius: 8px; background: #18181b; color: white; font-weight: 500; cursor: pointer; }
#status { font-size: 14px; color: #16a34a; margin: 4px 0 0; }`,
                js: `document.getElementById('signup').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  document.getElementById('status').textContent = 'Enrolled ' + email + '!';
});`,
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css',
    group: 'web',
    name: 'CSS',
    fullName: 'CSS Styling & Layout',
    tagline: 'Design responsive, polished interfaces with modern CSS.',
    accent: 'blue',
    badge: 'Styling',
    lessons: [
      {
        slug: 'selectors-and-specificity',
        title: 'Selectors & Specificity',
        duration: '5 min',
        summary: 'Understand how CSS targets elements and how the cascade decides which rule wins.',
        sections: [
          {
            id: 'targeting-elements',
            heading: 'Common Selectors',
            body: [
              'CSS rules pair a selector with a declaration block. Prefer class selectors (.card) over ID selectors (#header) to keep specificity low and styles easy to reuse.',
            ],
            example: {
              title: 'Class & Pseudo-Class Selectors',
              language: 'css',
              code: `.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 500;
}

.badge:hover {
  background: #dbeafe;
}`,
              playground: {
                html: `<span class="badge">HTML</span>
<span class="badge">CSS</span>
<span class="badge">JavaScript</span>`,
                css: `body { font-family: system-ui, sans-serif; padding: 24px; display: flex; gap: 8px; }
.badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 600;
  font-size: 14px;
  transition: background-color 150ms ease, transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
}
.badge:hover { background: #dbeafe; }
.badge:active { transform: scale(0.97); }`,
                js: '',
              },
            },
          },
        ],
      },
      {
        slug: 'box-model',
        title: 'The Box Model',
        duration: '5 min',
        summary:
          'Master content, padding, border, margin, and why box-sizing: border-box saves hours of layout math.',
        sections: [
          {
            id: 'border-box',
            heading: 'Content, Padding, Border & Margin',
            body: [
              'Every element in CSS is a rectangular box. Setting box-sizing: border-box ensures that width and height include padding and border, preventing unexpected overflow.',
            ],
            example: {
              title: 'Border-Box Layout',
              language: 'css',
              code: `*,
*::before,
*::after {
  box-sizing: border-box;
}

.panel {
  width: 280px;
  padding: 20px;
  border: 1px solid #e4e4e7;
  border-radius: 12px;
}`,
              playground: {
                html: `<div class="panel">
  <strong>border-box</strong>
  <p>Total width stays exactly 280px including 20px padding and 1px border.</p>
</div>`,
                css: `*, *::before, *::after { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; padding: 24px; color: #18181b; }
.panel {
  width: 280px;
  padding: 20px;
  border: 1px solid #d4d4d8;
  border-radius: 12px;
  background: #fafafa;
}
.panel p { margin: 8px 0 0; font-size: 14px; color: #52525b; line-height: 1.5; }`,
                js: '',
              },
            },
          },
        ],
      },
      {
        slug: 'flexbox',
        title: 'Flexbox Layout',
        duration: '6 min',
        summary:
          'Align and distribute items along a single row or column effortlessly with Flexbox.',
        sections: [
          {
            id: 'flex-basics',
            heading: 'Main Axis & Cross Axis',
            body: [
              'Apply display: flex to a container to control item alignment with justify-content (main axis), align-items (cross axis), and gap (spacing between items).',
            ],
            example: {
              title: 'Navbar with Flexbox',
              language: 'css',
              code: `.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 20px;
  border-bottom: 1px solid #e4e4e7;
}`,
              playground: {
                html: `<nav class="navbar">
  <span class="brand">CodeHub</span>
  <div class="links">
    <a href="#">HTML</a>
    <a href="#">CSS</a>
    <a href="#">JS</a>
  </div>
</nav>`,
                css: `body { font-family: system-ui, sans-serif; margin: 0; color: #18181b; }
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom: 1px solid #e4e4e7;
}
.brand { font-weight: 700; letter-spacing: -0.02em; }
.links { display: flex; gap: 16px; }
.links a { text-decoration: none; color: #52525b; font-size: 14px; font-weight: 500; }
.links a:hover { color: #18181b; }`,
                js: '',
              },
            },
          },
        ],
      },
      {
        slug: 'css-grid',
        title: 'CSS Grid Layout',
        duration: '6 min',
        summary:
          'Build two-dimensional responsive card grids and dashboards in just a few lines of CSS.',
        sections: [
          {
            id: 'responsive-grid',
            heading: 'Auto-Fit Responsive Grid',
            body: [
              'CSS Grid shines for two-dimensional layouts. Combine repeat(auto-fit, minmax(160px, 1fr)) with gap to build responsive grids without writing a single media query.',
            ],
            example: {
              title: 'Auto-Fit Card Grid',
              language: 'css',
              code: `.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 14px;
}`,
              playground: {
                html: `<div class="grid">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
</div>`,
                css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}
.card {
  padding: 24px 16px;
  border-radius: 10px;
  border: 1px solid #e4e4e7;
  background: #fafafa;
  font-weight: 600;
  text-align: center;
}`,
                js: '',
              },
            },
          },
        ],
      },
      {
        slug: 'responsive-design',
        title: 'Responsive Design',
        duration: '5 min',
        summary:
          'Adapt layouts smoothly across phones, tablets, and desktops with mobile-first media queries.',
        sections: [
          {
            id: 'mobile-first',
            heading: 'Mobile-First Media Queries',
            body: [
              'Start with single-column styles for small screens, then layer min-width media queries as viewport space grows.',
            ],
            example: {
              title: 'Mobile-First Two-Column Breakpoint',
              language: 'css',
              code: `.layout {
  display: grid;
  gap: 16px;
}

@media (min-width: 640px) {
  .layout {
    grid-template-columns: 220px 1fr;
  }
}`,
              playground: {
                html: `<div class="layout">
  <aside class="box">Sidebar</aside>
  <main class="box">Main Content</main>
</div>`,
                css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.layout { display: grid; gap: 12px; }
@media (min-width: 480px) {
  .layout { grid-template-columns: 160px 1fr; }
}
.box {
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #e4e4e7;
  background: #f4f4f5;
  font-weight: 500;
}`,
                js: '',
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: 'javascript',
    group: 'web',
    name: 'JavaScript',
    fullName: 'JavaScript Essentials',
    tagline: 'Bring pages to life with logic, state, and interactivity.',
    accent: 'amber',
    badge: 'Logic',
    lessons: [
      {
        slug: 'variables-and-types',
        title: 'Variables & Data Types',
        duration: '5 min',
        summary:
          'Store values with const and let, and understand strings, numbers, booleans, arrays, and objects.',
        sections: [
          {
            id: 'const-and-let',
            heading: 'Prefer const, use let when reassigning',
            body: [
              'Use const by default for values that will not be reassigned. Use let when a variable needs to change, such as a counter. Avoid var in modern JavaScript.',
            ],
            example: {
              title: 'Variables & Template Literals',
              language: 'javascript',
              code: `const siteName = 'CodeHub';
let completedLessons = 1;
completedLessons += 1;

console.log(\`Welcome to \${siteName}! Completed: \${completedLessons}\`);`,
              playground: {
                html: `<p id="out" style="font-family: system-ui; padding: 20px; font-size: 16px;"></p>`,
                css: '',
                js: `const siteName = 'CodeHub';
let completedLessons = 1;
completedLessons += 1;

const message = \`Welcome to \${siteName}! Completed lessons: \${completedLessons}\`;
document.getElementById('out').textContent = message;
console.log(message);`,
              },
            },
          },
        ],
      },
      {
        slug: 'functions-and-scope',
        title: 'Functions & Arrow Syntax',
        duration: '5 min',
        summary:
          'Write reusable logic with function declarations, arrow functions, and default parameters.',
        sections: [
          {
            id: 'arrow-functions',
            heading: 'Arrow Functions & Defaults',
            body: [
              'Arrow functions provide a concise syntax for short transformations and callbacks. Default parameters keep functions safe when optional arguments are omitted.',
            ],
            example: {
              title: 'Arrow Function Example',
              language: 'javascript',
              code: `const greet = (name = 'Learner') => \`Hello, \${name}!\`;

console.log(greet('Ada'));
console.log(greet());`,
              playground: {
                html: `<div id="log" style="font-family: monospace; padding: 20px; line-height: 1.8;"></div>`,
                css: '',
                js: `const greet = (name = 'Learner') => \`Hello, \${name}!\`;
const results = [greet('Ada'), greet('Grace'), greet()];

document.getElementById('log').innerHTML = results.join('<br>');
results.forEach((line) => console.log(line));`,
              },
            },
          },
        ],
      },
      {
        slug: 'arrays-and-methods',
        title: 'Arrays & Modern Methods',
        duration: '6 min',
        summary: 'Transform and filter collections cleanly using map, filter, and reduce.',
        sections: [
          {
            id: 'map-and-filter',
            heading: 'Transforming Data with map & filter',
            body: [
              'Instead of mutating arrays in-place, use filter() to select matching items and map() to transform each item into a new array.',
            ],
            example: {
              title: 'Filter & Map Lessons',
              language: 'javascript',
              code: `const scores = [65, 82, 91, 48, 95];
const passing = scores.filter((s) => s >= 70);
const labels = passing.map((s) => \`\${s}%\`);

console.log('Passing scores:', labels);`,
              playground: {
                html: `<ul id="list" style="font-family: system-ui; padding: 20px 36px; line-height: 1.8;"></ul>`,
                css: '',
                js: `const scores = [65, 82, 91, 48, 95];
const passing = scores.filter((s) => s >= 70);
const labels = passing.map((s) => \`Score: \${s}%\`);

document.getElementById('list').innerHTML = labels.map((l) => \`<li>\${l}</li>\`).join('');
console.log('Passing:', labels);`,
              },
            },
          },
        ],
      },
      {
        slug: 'dom-manipulation',
        title: 'DOM Manipulation',
        duration: '6 min',
        summary: 'Select elements, update text and classes, and render dynamic HTML safely.',
        sections: [
          {
            id: 'query-and-update',
            heading: 'Selecting & Updating Elements',
            body: [
              'Use document.querySelector() to grab elements using standard CSS selectors, then update textContent or classList to reflect new state.',
            ],
            example: {
              title: 'Toggle Active Class',
              language: 'javascript',
              code: `const box = document.querySelector('#status-box');
box.textContent = 'Ready to code!';
box.classList.add('active');`,
              playground: {
                html: `<div id="status-box" class="box">Loading...</div>`,
                css: `body { font-family: system-ui; padding: 24px; }
.box { padding: 14px 18px; border-radius: 10px; border: 1px solid #d4d4d8; display: inline-block; }
.box.active { background: #ecfdf5; border-color: #10b981; color: #065f46; font-weight: 600; }`,
                js: `const box = document.querySelector('#status-box');
box.textContent = 'DOM updated successfully!';
box.classList.add('active');
console.log('Updated #status-box');`,
              },
            },
          },
        ],
      },
      {
        slug: 'events-and-interactivity',
        title: 'Events & Interactivity',
        duration: '6 min',
        summary:
          'Listen for clicks, keyboard input, and form submissions to build responsive web apps.',
        sections: [
          {
            id: 'event-listeners',
            heading: 'addEventListener',
            body: [
              'Attach behavior with element.addEventListener("click", handler). Keep UI state in a variable and update the DOM whenever an event fires.',
            ],
            example: {
              title: 'Interactive Counter',
              language: 'javascript',
              code: `let count = 0;
const btn = document.querySelector('#inc');
const value = document.querySelector('#count');

btn.addEventListener('click', () => {
  count += 1;
  value.textContent = count;
});`,
              playground: {
                html: `<div class="counter">
  <span id="count">0</span>
  <button id="inc">+1 Increment</button>
</div>`,
                css: `body { font-family: system-ui; padding: 24px; }
.counter { display: flex; align-items: center; gap: 14px; }
#count { font-size: 28px; font-weight: 700; font-variant-numeric: tabular-nums; min-width: 2ch; }
button {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: #2563eb;
  color: white;
  font-weight: 500;
  cursor: pointer;
}
button:active { transform: scale(0.97); }`,
                js: `let count = 0;
const btn = document.querySelector('#inc');
const value = document.querySelector('#count');

btn.addEventListener('click', () => {
  count += 1;
  value.textContent = count;
  console.log('Count is now:', count);
});`,
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: 'software-engineering',
    group: 'engineering',
    name: 'Software Eng',
    fullName: 'Software Engineering',
    tagline:
      'Build maintainable, reliable systems with Git, algorithms, clean code, testing, and system design.',
    accent: 'emerald',
    badge: 'Engineering',
    lessons: [
      {
        slug: 'git-and-version-control',
        title: 'Git & Version Control',
        duration: '6 min',
        summary:
          'Track history safely, collaborate using feature branches, and write clear conventional commit messages.',
        sections: [
          {
            id: 'branching-and-commits',
            heading: 'Feature Branches & Atomic Commits',
            body: [
              'Every production codebase relies on version control. Keep the main branch always deployable, isolate new work on focused feature branches, and group related edits into small, atomic commits.',
              'Conventional commit prefixes like feat:, fix:, refactor:, and test: make release notes, code reviews, and git bisect debugging dramatically faster.',
            ],
            example: {
              title: 'Standard Feature Branch Workflow',
              language: 'bash',
              code: `# Create a focused branch from latest main
git checkout main
git pull origin main
git checkout -b feat/user-profile

# Stage and commit an atomic change
git add src/profile.js
git commit -m "feat(profile): add avatar upload validation"

# Push branch and open a Pull Request
git push -u origin feat/user-profile`,
              playground: {
                html: `<div class="wrap">
  <h2>Conventional Commit Validator</h2>
  <input id="msg" value="feat(auth): add password reset flow" />
  <p id="result"></p>
</div>`,
                css: `body { font-family: system-ui, sans-serif; padding: 24px; color: #18181b; }
.wrap { max-width: 460px; display: grid; gap: 10px; }
h2 { margin: 0; font-size: 18px; }
input { padding: 10px 12px; border: 1px solid #d4d4d8; border-radius: 8px; font-family: monospace; font-size: 13px; }
#result { margin: 0; font-size: 14px; font-weight: 500; }`,
                js: `const pattern = /^(feat|fix|docs|refactor|test|chore)(\\([a-z0-9-]+\\))?: .{5,}/;
const input = document.getElementById('msg');
const result = document.getElementById('result');

function validate() {
  const valid = pattern.test(input.value.trim());
  result.textContent = valid
    ? 'Valid conventional commit message'
    : 'Use format: type(scope): short description';
  result.style.color = valid ? '#16a34a' : '#dc2626';
  console.log('Checked:', input.value, '->', valid);
}

input.addEventListener('input', validate);
validate();`,
              },
            },
            tip: 'Never commit secrets, API keys, or .env files—add them to .gitignore before your first commit.',
          },
        ],
      },
      {
        slug: 'data-structures-and-algorithms',
        title: 'Data Structures & Big-O',
        duration: '7 min',
        summary:
          'Choose the right data structure for the job and analyze time complexity with Big-O notation.',
        sections: [
          {
            id: 'complexity-and-lookup',
            heading: 'O(1) Hash Lookups vs O(n) Scans',
            body: [
              'Big-O notation describes how runtime or memory grows as input size scales. Scanning an array with .find() is O(n) linear time, while looking up a key in a Map or Set is O(1) constant time on average.',
              'When data is sorted, binary search halves the search space each step—running in O(log n) time so 1,000,000 items take at most 20 comparisons.',
            ],
            example: {
              title: 'Binary Search in O(log n)',
              language: 'javascript',
              code: `function binarySearch(sorted, target) {
  let left = 0;
  let right = sorted.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (sorted[mid] === target) return mid;
    if (sorted[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
              playground: {
                html: `<div class="box">
  <h2>O(log n) Binary Search Demo</h2>
  <p id="out"></p>
</div>`,
                css: `body { font-family: system-ui, sans-serif; padding: 24px; color: #18181b; }
.box { padding: 18px; border: 1px solid #e4e4e7; border-radius: 12px; max-width: 440px; }
h2 { margin: 0 0 8px; font-size: 18px; }
p { margin: 0; font-size: 14px; line-height: 1.6; color: #3f3f46; }`,
                js: `const nums = Array.from({ length: 100000 }, (_, i) => i * 2);
const target = 148292;

let left = 0, right = nums.length - 1, steps = 0, found = -1;
while (left <= right) {
  steps += 1;
  const mid = Math.floor((left + right) / 2);
  if (nums[mid] === target) { found = mid; break; }
  if (nums[mid] < target) left = mid + 1;
  else right = mid - 1;
}

const msg = \`Found \${target} at index \${found} out of 100,000 items in only \${steps} steps!\`;
document.getElementById('out').textContent = msg;
console.log(msg);`,
              },
            },
            tip: 'Reach for Set when checking membership frequently and Map when indexing records by ID—avoid nested loops over large arrays.',
          },
        ],
      },
      {
        slug: 'clean-code-and-solid',
        title: 'Clean Code & SOLID Principles',
        duration: '7 min',
        summary:
          'Write readable, modular code using single responsibility, pure functions, and clear boundaries.',
        sections: [
          {
            id: 'single-responsibility',
            heading: 'Single Responsibility & Pure Functions',
            body: [
              'Code is read far more often than it is written. Following the Single Responsibility Principle (SRP) means each function or module has one clear reason to change.',
              'Separate pure business logic (easy to test and reuse) from side effects like network requests, database writes, or DOM updates.',
            ],
            example: {
              title: 'Separating Pricing Logic from Formatting',
              language: 'javascript',
              code: `// Pure calculation — zero side effects, trivial to test
function calculateOrderTotal(items, taxRate = 0.1) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * taxRate;
  return { subtotal, tax, total: subtotal + tax };
}

// Separate presentation concern
function formatCurrency(amount) {
  return \`$\${amount.toFixed(2)}\`;
}`,
              playground: {
                html: `<div id="receipt" style="font-family: monospace; padding: 24px; line-height: 1.8;"></div>`,
                css: '',
                js: `const cart = [
  { name: 'Keyboard', price: 79, qty: 1 },
  { name: 'USB-C Cable', price: 12.5, qty: 2 }
];

function calculateOrderTotal(items, taxRate = 0.1) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * taxRate;
  return { subtotal, tax, total: subtotal + tax };
}

const fmt = (n) => \`$\${n.toFixed(2)}\`;
const summary = calculateOrderTotal(cart);

document.getElementById('receipt').innerHTML = [
  \`Subtotal: \${fmt(summary.subtotal)}\`,
  \`Tax (10%): \${fmt(summary.tax)}\`,
  \`<strong>Total: \${fmt(summary.total)}</strong>\`
].join('<br>');
console.log('Order summary:', summary);`,
              },
            },
          },
        ],
      },
      {
        slug: 'testing-and-debugging',
        title: 'Testing & Debugging',
        duration: '6 min',
        summary:
          'Catch regressions early with unit tests using Arrange-Act-Assert and systematic debugging.',
        sections: [
          {
            id: 'unit-testing-aaa',
            heading: 'Arrange, Act, Assert (AAA)',
            body: [
              'Automated unit tests verify behavior before code reaches users. Structure each test in three parts: Arrange the inputs, Act by calling the unit under test, and Assert the expected outcome.',
              'Focus tests on behavior and edge cases (empty lists, negative numbers, invalid inputs) rather than internal implementation details.',
            ],
            example: {
              title: 'Mini Unit Test Suite',
              language: 'javascript',
              code: `function test(name, fn) {
  try {
    fn();
    console.log('PASS:', name);
  } catch (err) {
    console.error('FAIL:', name, '-', err.message);
  }
}

function assertEqual(actual, expected) {
  if (actual !== expected) {
    throw new Error(\`Expected \${expected}, got \${actual}\`);
  }
}`,
              playground: {
                html: `<ul id="tests" style="font-family: monospace; padding: 20px 36px; line-height: 1.9;"></ul>`,
                css: `.pass { color: #16a34a; } .fail { color: #dc2626; }`,
                js: `const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
const list = document.getElementById('tests');

function test(name, fn) {
  const li = document.createElement('li');
  try {
    fn();
    li.className = 'pass';
    li.textContent = 'PASS — ' + name;
    console.log('PASS:', name);
  } catch (err) {
    li.className = 'fail';
    li.textContent = 'FAIL — ' + name + ' (' + err.message + ')';
    console.error('FAIL:', name, err.message);
  }
  list.appendChild(li);
}

const expect = (actual, expected) => {
  if (actual !== expected) throw new Error(\`got \${actual}, expected \${expected}\`);
};

test('keeps value inside range', () => expect(clamp(5, 0, 10), 5));
test('clamps below minimum', () => expect(clamp(-3, 0, 10), 0));
test('clamps above maximum', () => expect(clamp(42, 0, 10), 10));`,
              },
            },
            tip: 'When fixing a bug, write a failing test that reproduces it first—then fix the code so the bug can never silently return.',
          },
        ],
      },
      {
        slug: 'system-design-and-apis',
        title: 'APIs & System Design Basics',
        duration: '7 min',
        summary:
          'Design predictable REST APIs, use proper HTTP status codes, and apply caching to keep services fast.',
        sections: [
          {
            id: 'rest-and-caching',
            heading: 'REST Conventions & In-Memory Caching',
            body: [
              'Well-designed APIs use nouns for resources (/users, /orders/42), standard HTTP verbs (GET, POST, PUT, DELETE), and accurate status codes (200 OK, 201 Created, 400 Bad Request, 404 Not Found, 429 Too Many Requests).',
              'Caching frequently read data in memory with a Time-To-Live (TTL) drastically reduces database load and lowers response latency.',
            ],
            example: {
              title: 'Simple TTL Cache',
              language: 'javascript',
              code: `class TTLCache {
  constructor(ttlMs = 5000) {
    this.ttlMs = ttlMs;
    this.store = new Map();
  }
  set(key, value) {
    this.store.set(key, { value, expiresAt: Date.now() + this.ttlMs });
  }
  get(key) {
    const entry = this.store.get(key);
    if (!entry || Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }
}`,
              playground: {
                html: `<div class="wrap">
  <button id="fetch-btn">Fetch User Profile</button>
  <p id="status">Click to test cache hit vs cache miss (3s TTL)</p>
</div>`,
                css: `body { font-family: system-ui, sans-serif; padding: 24px; color: #18181b; }
button { padding: 9px 16px; border: none; border-radius: 8px; background: #18181b; color: white; font-weight: 500; cursor: pointer; }
button:active { transform: scale(0.97); }
#status { margin-top: 12px; font-size: 14px; color: #3f3f46; }`,
                js: `const cache = new Map();
const TTL = 3000;

function fetchUser(id) {
  const entry = cache.get(id);
  if (entry && Date.now() < entry.expiresAt) {
    return { source: 'CACHE HIT (fast)', data: entry.value };
  }
  const fresh = { id, name: 'Sokha', role: 'Software Engineer' };
  cache.set(id, { value: fresh, expiresAt: Date.now() + TTL });
  return { source: 'DATABASE MISS (cached for 3s)', data: fresh };
}

document.getElementById('fetch-btn').addEventListener('click', () => {
  const res = fetchUser(42);
  document.getElementById('status').textContent = \`\${res.source} — \${res.data.name} (\${res.data.role})\`;
  console.log(res.source, res.data);
});`,
              },
            },
          },
        ],
      },
    ],
  },
]

export const resources = [
  {
    id: 'mdn-html',
    title: 'MDN HTML Elements Reference',
    category: 'html',
    type: 'Reference',
    description:
      'Complete catalog of every standard HTML element, its attributes, and accessibility notes.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
  },
  {
    id: 'w3schools-html',
    title: 'W3Schools HTML Tutorial',
    category: 'html',
    type: 'Guide',
    description:
      'Step-by-step beginner HTML reference with tag catalogs, attribute examples, and interactive sandboxes.',
    url: 'https://www.w3schools.com/html/',
  },
  {
    id: 'html-semantics',
    title: 'Web.dev Learn HTML',
    category: 'html',
    type: 'Guide',
    description:
      'Structured deep dive into semantic structure, forms, and modern HTML best practices.',
    url: 'https://web.dev/learn/html',
  },
  {
    id: 'css-flexbox-guide',
    title: 'CSS-Tricks Complete Guide to Flexbox',
    category: 'css',
    type: 'Cheat Sheet',
    description: 'Visual reference for every Flexbox container and item property with diagrams.',
    url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
  },
  {
    id: 'css-grid-guide',
    title: 'CSS-Tricks Complete Guide to Grid',
    category: 'css',
    type: 'Cheat Sheet',
    description:
      'Visual cheat sheet for CSS Grid tracks, areas, alignment, and responsive patterns.',
    url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
  },
  {
    id: 'caniuse',
    title: 'Can I Use',
    category: 'css',
    type: 'Tool',
    description: 'Check up-to-date browser support tables for HTML, CSS, and JavaScript features.',
    url: 'https://caniuse.com/',
  },
  {
    id: 'w3schools-css',
    title: 'W3Schools CSS Tutorial',
    category: 'css',
    type: 'Guide',
    description:
      'Quick CSS property lookup, layout examples, selectors reference, and interactive try-it demos.',
    url: 'https://www.w3schools.com/css/',
  },
  {
    id: 'javascript-info',
    title: 'The Modern JavaScript Tutorial',
    category: 'javascript',
    type: 'Guide',
    description: 'From fundamentals to closures, async/await, and DOM APIs with interactive tasks.',
    url: 'https://javascript.info/',
  },
  {
    id: 'mdn-js',
    title: 'MDN JavaScript Reference',
    category: 'javascript',
    type: 'Reference',
    description: 'Authoritative docs for built-in objects, Array methods, Promises, and Web APIs.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference',
  },
  {
    id: 'w3schools-js',
    title: 'W3Schools JavaScript Tutorial',
    category: 'javascript',
    type: 'Guide',
    description:
      'Accessible JavaScript syntax reference covering operators, loops, DOM APIs, JSON, and ES6 features.',
    url: 'https://www.w3schools.com/js/',
  },
  {
    id: 'pro-git',
    title: 'Pro Git Book',
    category: 'software-engineering',
    type: 'Guide',
    description:
      'Free official book covering Git internals, branching workflows, rebasing, and collaboration.',
    url: 'https://git-scm.com/book/en/v2',
  },
  {
    id: 'refactoring-guru',
    title: 'Refactoring.Guru — Design Patterns',
    category: 'software-engineering',
    type: 'Reference',
    description:
      'Visual explanations of software design patterns, code smells, and refactoring techniques.',
    url: 'https://refactoring.guru/design-patterns',
  },
  {
    id: 'system-design-primer',
    title: 'The System Design Primer',
    category: 'software-engineering',
    type: 'Guide',
    description:
      'Open-source handbook on scalable architecture, load balancing, caching, and databases.',
    url: 'https://github.com/donnemartin/system-design-primer',
  },
  {
    id: 'roadmap-sh',
    title: 'Developer Roadmaps (roadmap.sh)',
    category: 'software-engineering',
    type: 'Tool',
    description: 'Interactive career roadmaps for Frontend, Backend, DevOps, and Computer Science.',
    url: 'https://roadmap.sh/',
  },
]
