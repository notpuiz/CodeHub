export const webDeep = {
  // =========================================================================
  // HTML TRACK (6 Lessons)
  // =========================================================================

  'html/introduction': {
    en: {
      duration: '10 min',
      objectives: [
        'Explain the anatomy of an HTML element: opening tag, attributes, content, and closing tag.',
        'Distinguish void (self-closing) elements from container elements and avoid invalid nesting.',
        'Configure essential <head> metadata including charset, viewport, title, and page description.',
        'Recognize how block-level and inline elements flow differently in a browser.',
      ],
      extraSections: [
        {
          id: 'elements-attributes-nesting',
          heading: 'Elements, Attributes & Clean Nesting',
          body: [
            'Most HTML elements wrap content between an opening tag and a matching closing tag, such as <p>Hello</p>. Attributes live inside the opening tag as name="value" pairs (like lang="en" or id="hero") to configure behavior, identity, or accessibility without changing visible text.',
            'A small set of elements—called void elements—never wrap content and have no closing tag, including <meta>, <link>, <img>, <input>, <br>, and <hr>. Whenever you nest elements inside one another, always close the innermost tag first (Last-In, First-Out) so the browser builds a clean DOM tree.',
          ],
          points: [
            'Boolean attributes like disabled, required, or hidden are true simply by being present—no ="true" needed.',
            'Always wrap attribute values in double quotes ("...") to prevent parsing bugs when values contain spaces.',
            'Never place block elements like <div> or <p> inside an inline <p> tag; the browser will prematurely close the <p>.',
          ],
          table: {
            headers: ['Element', 'Category', 'Purpose'],
            rows: [
              [
                '<!DOCTYPE html>',
                'Declaration',
                'Triggers modern HTML5 standards mode in every browser.',
              ],
              [
                '<meta charset="UTF-8">',
                'Void / Head',
                'Supports English, Khmer, emojis, and all Unicode characters.',
              ],
              [
                '<meta name="viewport" ...>',
                'Void / Head',
                'Matches page width to mobile screens instead of zooming out.',
              ],
              [
                '<div> / <p>',
                'Block',
                'Starts on a new line and stretches across available width.',
              ],
              [
                '<span> / <a> / <strong>',
                'Inline',
                'Flows horizontally inside text and wraps only its content.',
              ],
            ],
          },
          warning:
            'Avoid overlapping tags like <p><strong>Important</p></strong>. Browsers try to auto-repair broken HTML, which produces unpredictable DOM trees and breaks CSS selectors or JavaScript queries.',
        },
        {
          id: 'block-vs-inline-and-head',
          heading: 'Block vs Inline Flow & Production <head> Setup',
          body: [
            'Before you write a single line of CSS, HTML elements already follow two default flow rules. Block-level elements (<h1>, <p>, <section>, <ul>) stack vertically from top to bottom, while inline elements (<a>, <strong>, <span>, <code>) sit side-by-side inside a line of text.',
            'Inside <head>, three tags belong on virtually every real website: <meta charset="UTF-8">, <meta name="viewport" content="width=device-width, initial-scale=1.0">, and a concise, unique <title>. Skipping the viewport tag makes mobile browsers render your page tiny and zoomed out.',
          ],
          example: {
            title: 'Production Boilerplate & Block vs Inline Flow',
            language: 'html',
            code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Learn HTML fundamentals step by step." />
    <title>HTML Boilerplate — CodeHub</title>
  </head>
  <body>
    <header>
      <h1>CodeHub Profile Card</h1>
      <p>Built with <strong>semantic HTML</strong> and <code>UTF-8</code> text.</p>
    </header>
  </body>
</html>`,
            playground: {
              html: `<section class="demo">
  <h2>Block Elements (Stack Vertically)</h2>
  <div class="block-item">Block 1: &lt;div&gt; takes full width</div>
  <p class="block-item">Block 2: &lt;p&gt; starts on a new line</p>

  <h2>Inline Elements (Flow Side-by-Side)</h2>
  <p>
    Inline tags like <span class="pill">HTML</span>,
    <strong class="pill">CSS</strong>, and
    <code class="pill">JS</code> stay on the same line.
  </p>
</section>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.04em; color: #52525b; margin: 16px 0 8px; }
.block-item { padding: 10px 12px; margin: 0 0 8px; border-radius: 8px; background: #eff6ff; border: 1px solid #bfdbfe; font-size: 14px; }
.pill { padding: 2px 8px; border-radius: 6px; background: #fef3c7; border: 1px solid #fde68a; font-size: 13px; }`,
              js: '',
            },
          },
          tip: 'In VS Code and most editors, typing ! and pressing Tab generates a complete HTML5 boilerplate with charset and viewport tags automatically.',
        },
      ],
      challenge: {
        prompt:
          'Write a complete HTML5 boilerplate document for a personal portfolio page. Set lang="en", include UTF-8 charset, a mobile viewport meta tag, a descriptive <title>, and a <body> containing an <h1> with your name and a <p> introducing yourself with one <strong> word.',
        hint: 'Start with <!DOCTYPE html> and make sure <meta charset="UTF-8"> and <meta name="viewport" content="width=device-width, initial-scale=1.0"> sit inside <head>.',
        language: 'html',
        solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sokha Dev — Portfolio</title>
  </head>
  <body>
    <h1>Sokha Chan</h1>
    <p>I am a <strong>web developer</strong> building fast, accessible websites.</p>
  </body>
</html>`,
      },
      quiz: [
        {
          question:
            'Why must every modern responsive web page include <meta name="viewport" content="width=device-width, initial-scale=1.0">?',
          options: [
            'It downloads mobile CSS files automatically',
            'It tells mobile browsers to match the page width to the device screen at 100% scale',
            'It enables JavaScript touch events on smartphones',
            'It is required before the <h1> tag can render',
          ],
          answer: 1,
          explanation:
            'Without the viewport meta tag, mobile browsers simulate a ~980px desktop screen and shrink the page down, making text tiny and hard to read.',
        },
        {
          question: 'Which of the following HTML snippets uses valid nesting?',
          options: [
            '<p>Welcome to <strong>CodeHub</p></strong>',
            '<p><div>Hello world</div></p>',
            '<p>Welcome to <strong>CodeHub</strong>!</p>',
            '<img src="logo.png">Logo</img>',
          ],
          answer: 2,
          explanation:
            'Tags must close in reverse order (LIFO), <div> cannot live inside <p>, and <img> is a void element that never takes a closing tag.',
        },
      ],
    },
    km: {
      duration: '10 នាទី',
      objectives: [
        'ពន្យល់ពីរចនាសម្ព័ន្ធធាតុ HTML៖ ស្លាកបើក គុណលក្ខណៈ មាតិកា និងស្លាកបិទ។',
        'បែងចែករវាងធាតុទទេ (void elements) និងធាតុផ្ទុក ព្រមទាំងជៀសវាងការដាក់ស្លាកត្រួតខុសលំដាប់។',
        'កំណត់ទិន្នន័យមេតាសំខាន់ៗក្នុង <head> ដូចជា charset, viewport, title និង description។',
        'ស្គាល់ភាពខុសគ្នានៃលំហូរបង្ហាញរវាងធាតុ Block និងធាតុ Inline ក្នុងកម្មវិធីរុករក។',
      ],
      extraSections: [
        {
          id: 'elements-attributes-nesting',
          heading: 'ធាតុ គុណលក្ខណៈ និងការដាក់ស្លាកត្រួតគ្នាឱ្យត្រឹមត្រូវ',
          body: [
            'ធាតុ HTML ភាគច្រើនរុំមាតិកានៅចន្លោះស្លាកបើក និងស្លាកបិទដែលត្រូវគ្នា ឧទាហរណ៍ <p>Hello</p>។ គុណលក្ខណៈ (attributes) ស្ថិតនៅក្នុងស្លាកបើកជាទម្រង់ name="value" (ដូចជា lang="km" ឬ id="hero") ដើម្បីកំណត់ឥរិយាបថ អត្តសញ្ញាណ ឬភាពងាយស្រួលប្រើប្រាស់។',
            'ធាតុមួយចំនួនតូច—ហៅថា void elements—មិនរុំមាតិកា និងគ្មានស្លាកបិទឡើយ ដូចជា <meta>, <link>, <img>, <input>, <br> និង <hr>។ រាល់ពេលដាក់ធាតុមួយក្នុងធាតុមួយទៀត ត្រូវបិទស្លាកខាងក្នុងបង្អស់មុនគេជានិច្ច ដើម្បីឱ្យកម្មវិធីរុករកបង្កើត DOM tree បានត្រឹមត្រូវ។',
          ],
          points: [
            'គុណលក្ខណៈ Boolean ដូចជា disabled, required ឬ hidden មានតម្លៃពិតគ្រាន់តែសរសេរឈ្មោះវា—មិនចាំបាច់ ="true" ទេ។',
            'តែងតែប្រើសញ្ញាដកស្រង់ពីរ ("...") ជុំវិញតម្លៃគុណលក្ខណៈ ដើម្បីជៀសវាងកំហុសពេលតម្លៃមានដកឃ្លា។',
            'កុំដាក់ធាតុ Block ដូចជា <div> ឬ <p> នៅខាងក្នុង <p> ព្រោះកម្មវិធីរុករកនឹងបិទ <p> មុនកំណត់ដោយស្វ័យប្រវត្តិ។',
          ],
          table: {
            headers: ['ធាតុ (Element)', 'ប្រភេទ', 'តួនាទី'],
            rows: [
              [
                '<!DOCTYPE html>',
                'ប្រកាសឯកសារ',
                'បើកម៉ូដស្តង់ដារ HTML5 ទំនើបក្នុងកម្មវិធីរុករកទាំងអស់។',
              ],
              [
                '<meta charset="UTF-8">',
                'Void / Head',
                'គាំទ្រអក្សរខ្មែរ អង់គ្លេស Emoji និងតួអក្សរ Unicode ទាំងអស់។',
              ],
              [
                '<meta name="viewport" ...>',
                'Void / Head',
                'កំណត់ទទឹងទំព័រឱ្យត្រូវតាមអេក្រង់ទូរស័ព្ទជំនួសឱ្យការបង្រួមតូច។',
              ],
              ['<div> / <p>', 'Block', 'ចាប់ផ្ដើមលើបន្ទាត់ថ្មី និងលាតពេញទទឹងដែលមាន។'],
              [
                '<span> / <a> / <strong>',
                'Inline',
                'រៀបជាជួរដេកក្នុងអត្ថបទ និងយកទំហំត្រឹមមាតិការបស់វា។',
              ],
            ],
          },
          warning:
            'ជៀសវាងការបិទស្លាកឆ្លាស់គ្នាដូចជា <p><strong>សំខាន់</p></strong>។ កម្មវិធីរុករកនឹងព្យាយាមជួសជុលដោយស្វ័យប្រវត្តិ ដែលធ្វើឱ្យរចនាសម្ព័ន្ធ DOM ខុសពីការរំពឹងទុក និងប៉ះពាល់ដល់ CSS ឬ JavaScript។',
        },
        {
          id: 'block-vs-inline-and-head',
          heading: 'លំហូរ Block vs Inline និងការរៀបចំ <head> ស្តង់ដារ',
          body: [
            'មុនពេលអ្នកសរសេរ CSS សូម្បីតែមួយបន្ទាត់ ធាតុ HTML មានក្បួនលំហូរលំនាំដើមពីររួចហើយ។ ធាតុ Block (<h1>, <p>, <section>, <ul>) តម្រៀបបញ្ឈរពីលើចុះក្រោម ចំណែកធាតុ Inline (<a>, <strong>, <span>, <code>) ស្ថិតនៅក្បែរគ្នាតាមជួរអត្ថបទ។',
            'នៅក្នុង <head> មានស្លាកបីដែលគេហទំព័រពិតប្រាកដស្ទើរតែទាំងអស់ត្រូវការ៖ <meta charset="UTF-8">, <meta name="viewport" content="width=device-width, initial-scale=1.0"> និង <title> ដែលខ្លីច្បាស់។ ការភ្លេចស្លាក viewport ធ្វើឱ្យទំព័រមើលទៅតូចខ្លាំងនៅលើទូរស័ព្ទ។',
          ],
          exampleTitle: 'គំរូ HTML5 ស្តង់ដារ និងលំហូរ Block vs Inline',
          tip: 'នៅក្នុង VS Code គ្រាន់តែវាយសញ្ញា ! រួចចុច Tab វានឹងបង្កើតគ្រោង HTML5 ពេញលេញជាមួយ charset និង viewport ដោយស្វ័យប្រវត្តិ។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរឯកសារ HTML5 ពេញលេញសម្រាប់ទំព័រផតហ្វូលីយ៉ូផ្ទាល់ខ្លួន។ កំណត់ lang="en", បញ្ចូល UTF-8 charset, ស្លាក meta viewport សម្រាប់ទូរស័ព្ទ, <title> ច្បាស់លាស់ និង <body> ដែលមាន <h1> ជាឈ្មោះរបស់អ្នក និង <p> ណែនាំខ្លួនដោយមានពាក្យ <strong> មួយ។',
        hint: 'ចាប់ផ្ដើមដោយ <!DOCTYPE html> ហើយដាក់ <meta charset="UTF-8"> និង <meta name="viewport" content="width=device-width, initial-scale=1.0"> នៅខាងក្នុង <head>។',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វីបានជាគេហទំព័រទំនើបត្រូវតែមាន <meta name="viewport" content="width=device-width, initial-scale=1.0">?',
          options: [
            'ដើម្បីទាញយកឯកសារ CSS ទូរស័ព្ទដោយស្វ័យប្រវត្តិ',
            'ដើម្បីប្រាប់កម្មវិធីរុករកទូរស័ព្ទឱ្យកំណត់ទទឹងទំព័រតាមអេក្រង់ឧបករណ៍នៅមាត្រដ្ឋាន 100%',
            'ដើម្បីបើកដំណើរការព្រឹត្តិការណ៍ប៉ះអេក្រង់ក្នុង JavaScript',
            'ដើម្បីអនុញ្ញាតឱ្យស្លាក <h1> អាចបង្ហាញបាន',
          ],
          answer: 1,
          explanation:
            'បើគ្មានស្លាក viewport ទេ កម្មវិធីរុករកទូរស័ព្ទនឹងបង្ហាញទំព័រដូចអេក្រង់កុំព្យូទ័រ ~980px រួចបង្រួមឱ្យតូច ដែលធ្វើឱ្យអក្សរពិបាកអាន។',
        },
        {
          question: 'តើកូដ HTML មួយណាដាក់ស្លាកត្រួតគ្នាបានត្រឹមត្រូវ?',
          options: [
            '<p>Welcome to <strong>CodeHub</p></strong>',
            '<p><div>Hello world</div></p>',
            '<p>Welcome to <strong>CodeHub</strong>!</p>',
            '<img src="logo.png">Logo</img>',
          ],
          answer: 2,
          explanation:
            'ស្លាកត្រូវបិទតាមលំដាប់បញ្ច្រាស (ខាងក្នុងមុន), <div> មិនអាចនៅក្នុង <p> បានទេ ហើយ <img> ជា void element ដែលគ្មានស្លាកបិទ។',
        },
      ],
    },
  },

  'html/semantic-text': {
    en: {
      duration: '10 min',
      objectives: [
        'Structure full pages with semantic landmarks (<header>, <nav>, <main>, <article>, <aside>, <footer>).',
        'Choose the right inline text tag (<strong>, <em>, <time>, <code>, <blockquote>) based on meaning rather than style.',
        'Avoid "div soup" so screen readers, browser reader modes, and search engines understand your document outline.',
      ],
      extraSections: [
        {
          id: 'page-landmarks',
          heading: 'Semantic Page Landmarks',
          body: [
            'Replacing generic <div class="header"> wrappers with semantic landmarks like <header>, <nav>, <main>, <article>, <aside>, and <footer> transforms a flat page into a navigable map. Screen-reader users can jump straight to <main> or <nav> with a single keyboard shortcut.',
            'Each landmark carries a clear architectural role: a page should contain only one visible <main>, while <article> represents self-contained content (like a blog post or product card) that still makes sense if syndicated elsewhere.',
          ],
          table: {
            headers: ['Landmark', 'Role on Page', 'Common Use Case'],
            rows: [
              [
                '<header>',
                'Introductory area',
                'Site logo/topbar or an article title + author byline.',
              ],
              [
                '<nav>',
                'Major navigation links',
                'Primary navbar, sidebar menu, or breadcrumb trail.',
              ],
              [
                '<main>',
                'Unique primary content',
                'Main article or dashboard content (one per page).',
              ],
              [
                '<article>',
                'Self-contained item',
                'Blog post, news story, forum comment, or lesson card.',
              ],
              [
                '<aside> / <footer>',
                'Tangential / Closing info',
                'Table of contents sidebar, copyright, and legal links.',
              ],
            ],
          },
          warning:
            'Do not pick heading levels (<h1>–<h6>) for their font size. Skipping from <h1> directly to <h4> confuses screen-reader outline navigation—use sequential heading levels and control visual size with CSS.',
        },
        {
          id: 'inline-text-semantics',
          heading: 'Rich Inline Semantics for Real Content',
          body: [
            'HTML includes dedicated text elements that convey machine-readable meaning. Use <time datetime="2026-05-01"> for publication dates, <code> for inline code identifiers, <kbd> for keyboard shortcuts, and <blockquote> paired with <cite> for quoted material.',
            'Similarly, prefer <strong> (strong importance) and <em> (stressed emphasis) over purely visual <b> and <i> tags. Assistive technologies adjust vocal tone on <em> and <strong>, whereas generic styling tags carry no semantic weight.',
          ],
          points: [
            'Pair <section> with a heading (<h2>–<h6>); if a wrapper is purely for styling or layout, a plain <div> is the right choice.',
            'Use <time datetime="YYYY-MM-DD"> so browsers and search crawlers can parse exact dates regardless of human formatting.',
            'Wrap abbreviations on first use with <abbr title="HyperText Markup Language">HTML</abbr>.',
          ],
          example: {
            title: 'Semantic Article Layout with Inline Metadata',
            language: 'html',
            code: `<article>
  <header>
    <h1>Why Semantic HTML Ages Well</h1>
    <p>Published <time datetime="2026-03-14">March 14, 2026</time></p>
  </header>
  <p>Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to open search and inspect <code>&lt;main&gt;</code>.</p>
  <blockquote>
    <p>Good markup communicates structure before a single pixel of CSS loads.</p>
    <footer>— <cite>Web Standards Guide</cite></footer>
  </blockquote>
</article>`,
            playground: {
              html: `<article class="post">
  <header class="post-head">
    <h1>Why Semantic HTML Ages Well</h1>
    <p class="meta">Published <time datetime="2026-03-14">March 14, 2026</time></p>
  </header>
  <p>Use <kbd>Ctrl</kbd> + <kbd>K</kbd> to jump across sections, and wrap code like <code>&lt;article&gt;</code> clearly.</p>
  <blockquote>
    <p>Good markup communicates structure before a single pixel of CSS loads.</p>
    <footer>— <cite>Web Standards Guide</cite></footer>
  </blockquote>
</article>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.post { max-width: 58ch; line-height: 1.65; }
.post-head h1 { margin: 0; font-size: 24px; letter-spacing: -0.02em; }
.meta { margin: 4px 0 16px; font-size: 13px; color: #71717a; }
kbd { padding: 2px 6px; border: 1px solid #d4d4d8; border-bottom-width: 2px; border-radius: 5px; font-size: 12px; background: #fafafa; }
code { padding: 2px 5px; border-radius: 4px; background: #f4f4f5; font-size: 13px; }
blockquote { margin: 16px 0; padding: 12px 16px; border-left: 3px solid #2563eb; background: #eff6ff; border-radius: 0 8px 8px 0; }
blockquote p { margin: 0 0 6px; }
blockquote footer { font-size: 13px; color: #52525b; }`,
              js: '',
            },
          },
          tip: 'Use <div class="..."> without guilt when you only need a visual layout container (like a flex wrapper). Semantics should describe meaning, not add unnecessary landmarks.',
        },
      ],
      challenge: {
        prompt:
          'Refactor a news article snippet using semantic HTML: wrap the whole piece in <article>, put the <h1> title and a <time datetime="2026-06-01"> publication date inside <header>, add one body <p> with <em> emphasis, and include a <blockquote> with a <cite> source.',
        hint: 'Use <article> as the outer tag, nest <header> at the top, and place <cite> inside the <blockquote> footer or paragraph.',
        language: 'html',
        solutionCode: `<article>
  <header>
    <h1>Web Accessibility Matters</h1>
    <p>Posted on <time datetime="2026-06-01">June 1, 2026</time></p>
  </header>
  <p>Semantic elements make content <em>immediately</em> understandable to assistive tools.</p>
  <blockquote>
    <p>The power of the Web is in its universality.</p>
    <footer>— <cite>Tim Berners-Lee</cite></footer>
  </blockquote>
</article>`,
      },
      quiz: [
        {
          question: 'When should you use <article> instead of <section>?',
          options: [
            'Whenever you want bold text inside a container',
            'When the content is self-contained and makes sense independently (like a blog post or comment)',
            'Only for the navigation bar at the top of the page',
            'Whenever you need a CSS Grid container',
          ],
          answer: 1,
          explanation:
            '<article> denotes independent, reusable content (blog post, news item, product card), whereas <section> groups thematically related parts inside a larger document.',
        },
        {
          question:
            'Why is <time datetime="2026-03-14">March 14, 2026</time> better than plain text?',
          options: [
            'It automatically converts the date to the user’s local timezone',
            'It renders a built-in calendar date picker',
            'It provides a standardized machine-readable date for search engines and assistive tools',
            'It is required inside every <header> tag',
          ],
          answer: 2,
          explanation:
            'The datetime attribute encodes an ISO-8601 timestamp that crawlers, browsers, and calendar tools can parse reliably regardless of how the visible text is formatted.',
        },
      ],
    },
    km: {
      duration: '10 នាទី',
      objectives: [
        'រៀបចំរចនាសម្ព័ន្ធទំព័រពេញលេញដោយប្រើ semantic landmarks (<header>, <nav>, <main>, <article>, <aside>, <footer>)។',
        'ជ្រើសរើសស្លាកអត្ថបទក្នុងជួរ (<strong>, <em>, <time>, <code>, <blockquote>) តាមអត្ថន័យ មិនមែនតាមរូបរាងឡើយ។',
        'ជៀសវាងការប្រើ <div> គ្រប់កន្លែង ដើម្បីឱ្យកម្មវិធីអានអេក្រង់ និងម៉ាស៊ីនស្វែងរកយល់ពីរចនាសម្ព័ន្ធឯកសារ។',
      ],
      extraSections: [
        {
          id: 'page-landmarks',
          heading: 'ស្លាកតំបន់មានន័យ (Semantic Page Landmarks)',
          body: [
            'ការជំនួស <div class="header"> ធម្មតាដោយស្លាកមានន័យដូចជា <header>, <nav>, <main>, <article>, <aside> និង <footer> ប្រែក្លាយទំព័រធម្មតាទៅជាផែនទីច្បាស់លាស់។ អ្នកប្រើកម្មវិធីអានអេក្រង់អាចលោតទៅកាន់ <main> ឬ <nav> ភ្លាមៗដោយប្រើផ្លូវកាត់ក្ដារចុច។',
            'តំបន់នីមួយៗមានតួនាទីស្ថាបត្យកម្មច្បាស់លាស់៖ ទំព័រមួយគួរមាន <main> ដែលមើលឃើញតែមួយគត់ ចំណែក <article> តំណាងឱ្យមាតិកាឯករាជ្យ (ដូចជាអត្ថបទប្លុក ឬកាតផលិតផល) ដែលនៅតែមានន័យពេញលេញទោះបង្ហាញដាច់ដោយឡែកក៏ដោយ។',
          ],
          table: {
            headers: ['Landmark', 'តួនាទីលើទំព័រ', 'ការប្រើប្រាស់ទូទៅ'],
            rows: [
              ['<header>', 'ផ្នែកណែនាំ', 'ឡូហ្គោ/របារខាងលើ ឬចំណងជើងអត្ថបទ និងឈ្មោះអ្នកនិពន្ធ។'],
              ['<nav>', 'តំណភ្ជាប់រុករកសំខាន់ៗ', 'របារម៉ឺនុយចម្បង ម៉ឺនុយចំហៀង ឬ breadcrumb។'],
              [
                '<main>',
                'មាតិកាចម្បងតែមួយគត់',
                'អត្ថបទសំខាន់ ឬផ្ទាំងគ្រប់គ្រង (មួយក្នុងមួយទំព័រ)។',
              ],
              ['<article>', 'មាតិកាឯករាជ្យ', 'អត្ថបទប្លុក ព័ត៌មាន មតិយោបល់ ឬកាតមេរៀន។'],
              [
                '<aside> / <footer>',
                'ព័ត៌មានបន្ទាប់បន្សំ / ផ្នែកបាត',
                'មាតិកាចំហៀង សិទ្ធិអ្នកនិពន្ធ និងតំណភ្ជាប់ផ្លូវច្បាប់។',
              ],
            ],
          },
          warning:
            'កុំជ្រើសរើសកម្រិតចំណងជើង (<h1>–<h6>) ដោយសារតែទំហំអក្សរ។ ការរំលងពី <h1> ទៅ <h4> ធ្វើឱ្យកម្មវិធីអានអេក្រង់ច្រឡំលំដាប់មាតិកា—ប្រើលំដាប់ត្រឹមត្រូវ ហើយកែទំហំអក្សរដោយប្រើ CSS។',
        },
        {
          id: 'inline-text-semantics',
          heading: 'ស្លាកអត្ថបទក្នុងជួរសម្រាប់មាតិកាពិត',
          body: [
            'HTML មានធាតុអត្ថបទពិសេសៗដែលផ្ដល់អត្ថន័យច្បាស់ដល់ម៉ាស៊ីន។ ប្រើ <time datetime="2026-05-01"> សម្រាប់កាលបរិច្ឆេទផ្សាយ <code> សម្រាប់ឈ្មោះកូដ <kbd> សម្រាប់គ្រាប់ចុចក្ដារចុច និង <blockquote> ជាមួយ <cite> សម្រាប់សម្រង់សម្ដី។',
            'ដូចគ្នាដែរ គួរប្រើ <strong> (សំខាន់ខ្លាំង) និង <em> (សង្កត់ន័យ) ជំនួសឱ្យ <b> និង <i> ដែលគ្រាន់តែប្ដូររូបរាង។ បច្ចេកវិទ្យាជំនួយនឹងកែសំឡេងអានលើ <em> និង <strong> ដើម្បីបង្ហាញការសង្កត់ធ្ងន់។',
          ],
          points: [
            'គួរដាក់ចំណងជើង (<h2>–<h6>) ក្នុង <section> នីមួយៗ; បើគ្រាន់តែរុំសម្រាប់តុបតែងប្លង់ ប្រើ <div> ធម្មតាគឺត្រឹមត្រូវជាង។',
            'ប្រើ <time datetime="YYYY-MM-DD"> ដើម្បីឱ្យកម្មវិធីរុករក និងម៉ាស៊ីនស្វែងរកអាចអានកាលបរិច្ឆេទបានច្បាស់លាស់។',
            'ប្រើ <abbr title="HyperText Markup Language">HTML</abbr> សម្រាប់ពាក្យកាត់នៅពេលបង្ហាញលើកដំបូង។',
          ],
          exampleTitle: 'ប្លង់អត្ថបទមានន័យជាមួយស្លាកក្នុងជួរ',
          tip: 'អ្នកអាចប្រើ <div class="..."> ដោយគ្មានបញ្ហានៅពេលគ្រាន់តែត្រូវការប្រអប់រៀបប្លង់ CSS។ ស្លាកមានន័យគួរប្រើដើម្បីបង្ហាញអត្ថន័យពិត មិនមែនបន្ថែមឱ្យលើសកំណត់ឡើយ។',
        },
      ],
      challenge: {
        prompt:
          'កែសម្រួលអត្ថបទព័ត៌មានមួយដោយប្រើ Semantic HTML៖ រុំទាំងមូលក្នុង <article>, ដាក់ចំណងជើង <h1> និងកាលបរិច្ឆេទ <time datetime="2026-06-01"> ក្នុង <header>, បន្ថែមកថាខណ្ឌ <p> មួយដែលមាន <em> និងដាក់ <blockquote> មួយដែលមានប្រភព <cite>។',
        hint: 'ប្រើ <article> ជាស្លាកខាងក្រៅ ដាក់ <header> នៅខាងលើ ហើយដាក់ <cite> នៅក្នុង <footer> នៃ <blockquote>។',
      },
      quiz: [
        {
          question: 'តើពេលណាអ្នកគួរប្រើ <article> ជំនួសឱ្យ <section>?',
          options: [
            'នៅពេលអ្នកចង់ឱ្យអក្សរខាងក្នុងដិត',
            'នៅពេលមាតិកានោះឯករាជ្យ និងមានន័យពេញលេញដោយខ្លួនឯង (ដូចជាអត្ថបទប្លុក ឬមតិយោបល់)',
            'សម្រាប់តែរបារម៉ឺនុយនៅផ្នែកខាងលើនៃទំព័រ',
            'នៅពេលអ្នកត្រូវការប្រអប់ CSS Grid',
          ],
          answer: 1,
          explanation:
            '<article> បង្ហាញពីមាតិកាឯករាជ្យដែលអាចយកទៅចែករំលែកដាច់ដោយឡែកបាន ចំណែក <section> ប្រើសម្រាប់ចែកក្រុមមាតិកាដែលពាក់ព័ន្ធគ្នាក្នុងឯកសារតែមួយ។',
        },
        {
          question:
            'ហេតុអ្វីបានជា <time datetime="2026-03-14">March 14, 2026</time> ល្អជាងអត្ថបទធម្មតា?',
          options: [
            'វាប្ដូរកាលបរិច្ឆេទតាមតំបន់ម៉ោងអ្នកប្រើដោយស្វ័យប្រវត្តិ',
            'វាបង្ហាញប្រតិទិនជ្រើសរើសថ្ងៃភ្ជាប់មកស្រាប់',
            'វាផ្ដល់ទម្រង់កាលបរិច្ឆេទស្តង់ដារដែលម៉ាស៊ីនស្វែងរក និងឧបករណ៍ជំនួយអាចអានបានច្បាស់',
            'វាជាតម្រូវការដាច់ខាតនៅក្នុង <header> ទាំងអស់',
          ],
          answer: 2,
          explanation:
            'គុណលក្ខណៈ datetime ផ្ទុកកាលបរិច្ឆេទតាមស្តង់ដារ ISO-8601 ដែលម៉ាស៊ីនស្វែងរក និងកម្មវិធីអាចវិភាគបានយ៉ាងត្រឹមត្រូវ។',
        },
      ],
    },
  },

  'html/links-and-images': {
    en: {
      duration: '11 min',
      objectives: [
        'Write relative, root-relative, absolute, fragment (#id), and mailto/tel links correctly.',
        'Author meaningful alt text—and know when an empty alt="" is required for decorative images.',
        'Optimize images for every viewport using width/height, loading="lazy", srcset, and <picture>.',
      ],
      extraSections: [
        {
          id: 'url-paths-and-anchors',
          heading: 'URL Paths, Page Anchors & Accessible Link Text',
          body: [
            'Links do far more than navigate between websites. Relative paths (./about.html) resolve from the current folder, root-relative paths (/docs/html) resolve from the site domain, fragment links (#pricing) scroll directly to an element with id="pricing", and protocol links (mailto:, tel:) launch email or phone apps.',
            'Link text should describe the destination on its own. Screen-reader users frequently skim a list of all links on a page—seeing five links labeled "Click here" or "Read more" gives zero context compared to "Read the CSS Flexbox guide".',
          ],
          points: [
            'Use the download attribute (<a href="/guide.pdf" download>) to prompt saving a same-origin file instead of opening it.',
            'Never nest a <button> inside an <a> or an <a> inside a <button>—use <a> for navigation and <button> for actions.',
            'Add target="_blank" sparingly; when you do, pair it with rel="noopener noreferrer" to protect window.opener.',
          ],
          table: {
            headers: ['href Pattern', 'Type', 'Where It Goes'],
            rows: [
              ['https://example.com/docs', 'Absolute URL', 'External website on another domain.'],
              ['/learn/html', 'Root-relative', 'Path starting from your own site root.'],
              ['../images/hero.webp', 'Relative', 'Moves up one folder, then into images/.'],
              ['#faq', 'Fragment', 'Jumps smoothly to <section id="faq"> on the same page.'],
              ['mailto:hi@codehub.dev', 'Protocol', 'Opens the user’s default email client.'],
            ],
          },
          warning:
            'Never omit the alt attribute on <img>. If an image is purely decorative (like a background swirl), explicitly write alt="" so screen readers skip it instead of reading the ugly filename aloud.',
        },
        {
          id: 'responsive-images-picture',
          heading: 'Responsive Images, Intrinsic Sizing & Modern Formats',
          body: [
            'Serving a 2400px desktop hero photo to a 390px phone wastes megabytes of data and slows down Largest Contentful Paint (LCP). The srcset and sizes attributes let the browser choose the smallest crisp image for the current screen width and pixel density.',
            'Always include intrinsic width and height attributes on <img> (even when styled with width: 100%; height: auto in CSS). The browser calculates the aspect ratio immediately and reserves space before the image downloads, preventing jarring layout shift.',
          ],
          example: {
            title: 'Responsive <picture> & Aspect-Ratio Safe Image',
            language: 'html',
            code: `<picture>
  <source srcset="hero-800.avif 800w, hero-400.avif 400w" type="image/avif" />
  <img
    src="hero-800.jpg"
    srcset="hero-400.jpg 400w, hero-800.jpg 800w"
    sizes="(max-width: 600px) 100vw, 560px"
    width="800"
    height="450"
    loading="lazy"
    decoding="async"
    alt="Developer coding a responsive web app on a laptop"
  />
</picture>`,
            playground: {
              html: `<article class="card">
  <figure class="media">
    <img
      src="https://picsum.photos/id/180/640/360"
      width="640"
      height="360"
      loading="lazy"
      alt="Workspace desk with a laptop and notebook"
    />
    <figcaption>Intrinsic width &amp; height reserve layout space before download.</figcaption>
  </figure>
  <div class="actions">
    <a href="#details" class="btn-link">Jump to image checklist ↓</a>
    <a href="mailto:hello@codehub.dev" class="muted-link">Email support</a>
  </div>
  <p id="details" class="note">Checklist: descriptive alt text, modern WebP/AVIF format, and max-width: 100%.</p>
</article>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.card { max-width: 480px; }
.media { margin: 0; }
.media img { width: 100%; height: auto; display: block; border-radius: 12px; background: #f4f4f5; }
figcaption { margin-top: 8px; font-size: 13px; color: #52525b; }
.actions { display: flex; gap: 16px; align-items: center; margin-top: 14px; }
.btn-link { color: #2563eb; font-weight: 600; text-decoration: none; font-size: 14px; }
.btn-link:hover { text-decoration: underline; }
.muted-link { color: #52525b; font-size: 14px; }
.note { margin-top: 16px; padding: 12px; border-radius: 8px; background: #f4f4f5; font-size: 13px; color: #3f3f46; }`,
              js: '',
            },
          },
          tip: 'Never put loading="lazy" on your main above-the-fold hero image—use fetchpriority="high" instead so the browser loads it immediately.',
        },
      ],
      challenge: {
        prompt:
          'Create a <figure> containing a responsive <img> with src="https://picsum.photos/600/320", explicit width="600" and height="320", loading="lazy", a clear alt description, a <figcaption>, and an external link opening in a new tab safely.',
        hint: 'Pair target="_blank" with rel="noopener noreferrer", and put the caption inside <figcaption> as a child of <figure>.',
        language: 'html',
        solutionCode: `<figure>
  <img
    src="https://picsum.photos/600/320"
    width="600"
    height="320"
    loading="lazy"
    alt="Scenic mountain lake at sunrise"
  />
  <figcaption>
    Photo via
    <a href="https://picsum.photos" target="_blank" rel="noopener noreferrer">
      Lorem Picsum gallery
    </a>.
  </figcaption>
</figure>`,
      },
      quiz: [
        {
          question:
            'How should you write the alt attribute for a purely decorative icon next to a text label?',
          options: [
            'Omit the alt attribute completely',
            'Set alt="" (empty string) so screen readers skip it',
            'Set alt="decorative icon image"',
            'Set alt="none"',
          ],
          answer: 1,
          explanation:
            'An empty alt="" marks an image as presentational so screen readers ignore it; omitting alt altogether often causes screen readers to announce the image file URL.',
        },
        {
          question:
            'Why should you add width and height HTML attributes on <img> even when CSS sets width: 100%; height: auto?',
          options: [
            'It crops the image file on the server automatically',
            'It prevents browsers from caching the image',
            'It lets the browser compute the aspect ratio and reserve space before download, avoiding layout shift',
            'It forces the image to stay fixed at pixel dimensions',
          ],
          answer: 2,
          explanation:
            'Modern browsers derive the intrinsic aspect ratio from width and height attributes so the surrounding text does not jump when the image finishes loading.',
        },
      ],
    },
    km: {
      duration: '11 នាទី',
      objectives: [
        'សរសេរតំណភ្ជាប់ relative, root-relative, absolute, fragment (#id) និង mailto/tel បានត្រឹមត្រូវ។',
        'សរសេរអត្ថបទ alt ដែលមានន័យ និងដឹងថាពេលណាត្រូវប្រើ alt="" សម្រាប់រូបភាពតុបតែង។',
        'បង្កើនល្បឿនរូបភាពសម្រាប់គ្រប់អេក្រង់ដោយប្រើ width/height, loading="lazy", srcset និង <picture>។',
      ],
      extraSections: [
        {
          id: 'url-paths-and-anchors',
          heading: 'ផ្លូវ URL តំណភ្ជាប់ក្នុងទំព័រ និងអត្ថបទតំណភ្ជាប់ច្បាស់លាស់',
          body: [
            'តំណភ្ជាប់មិនត្រឹមតែបើកគេហទំព័រផ្សេងប៉ុណ្ណោះទេ។ Relative path (./about.html) យោងពីថតបច្ចុប្បន្ន, root-relative path (/docs/html) យោងពីឫសគេហទំព័រ, fragment link (#pricing) រំកិលទៅកាន់ធាតុដែលមាន id="pricing" និង protocol link (mailto:, tel:) បើកកម្មវិធីអ៊ីមែល ឬទូរស័ព្ទ។',
            'អត្ថបទក្នុងតំណភ្ជាប់គួរពណ៌នាគោលដៅដោយខ្លួនឯង។ អ្នកប្រើកម្មវិធីអានអេក្រង់តែងតែអានបញ្ជីតំណភ្ជាប់ទាំងអស់—ការដាក់ "ចុចទីនេះ" ឬ "អានបន្ថែម" ច្រើនដងមិនផ្ដល់បរិបទច្បាស់ដូច "អានមគ្គុទ្ទេសក៍ CSS Flexbox" ឡើយ។',
          ],
          points: [
            'ប្រើគុណលក្ខណៈ download (<a href="/guide.pdf" download>) ដើម្បីទាញយកឯកសារជំនួសឱ្យការបើកមើល។',
            'កុំដាក់ <button> ក្នុង <a> ឬ <a> ក្នុង <button>—ប្រើ <a> សម្រាប់ប្ដូរទំព័រ និង <button> សម្រាប់សកម្មភាព។',
            'ប្រើ target="_blank" តែពេលចាំបាច់ ហើយត្រូវដាក់ rel="noopener noreferrer" ជានិច្ចដើម្បីសុវត្ថិភាព។',
          ],
          table: {
            headers: ['ទម្រង់ href', 'ប្រភេទ', 'គោលដៅ'],
            rows: [
              ['https://example.com/docs', 'Absolute URL', 'គេហទំព័រខាងក្រៅនៅលើដែនផ្សេង។'],
              ['/learn/html', 'Root-relative', 'ផ្លូវចាប់ផ្ដើមពីឫសនៃគេហទំព័រខ្លួនឯង។'],
              ['../images/hero.webp', 'Relative', 'ឡើងលើមួយថត រួចចូលទៅក្នុងថត images/។'],
              ['#faq', 'Fragment', 'រំកិលទៅកាន់ <section id="faq"> លើទំព័រដដែល។'],
              ['mailto:hi@codehub.dev', 'Protocol', 'បើកកម្មវិធីអ៊ីមែលលំនាំដើមរបស់អ្នកប្រើ។'],
            ],
          },
          warning:
            'កុំភ្លេចគុណលក្ខណៈ alt លើ <img>។ បើរូបភាពគ្រាន់តែសម្រាប់តុបតែង ត្រូវសរសេរ alt="" ដើម្បីឱ្យកម្មវិធីអានអេក្រង់រំលង ជំនួសឱ្យការអានឈ្មោះឯកសាររូបភាព។',
        },
        {
          id: 'responsive-images-picture',
          heading: 'រូបភាពឆ្លើយតប ទំហំដើម និងទម្រង់រូបភាពទំនើប',
          body: [
            'ការផ្ញើរូបភាពទទឹង 2400px ទៅកាន់ទូរស័ព្ទទទឹង 390px ខ្ជះខ្ជាយទិន្នន័យ និងធ្វើឱ្យទំព័រផ្ទុកយឺត។ គុណលក្ខណៈ srcset និង sizes អនុញ្ញាតឱ្យកម្មវិធីរុករកជ្រើសរើសរូបភាពតូចបំផុតដែលនៅតែច្បាស់សម្រាប់អេក្រង់នីមួយៗ។',
            'ត្រូវដាក់គុណលក្ខណៈ width និង height លើ <img> ជានិច្ច (ទោះជា CSS កំណត់ width: 100%; height: auto ក៏ដោយ)។ កម្មវិធីរុករកនឹងគណនាសមាមាត្រភ្លាមៗ ហើយទុកចន្លោះជាមុន ការពារកុំឱ្យទំព័រលោត (layout shift) ពេលរូបភាពផ្ទុករួច។',
          ],
          exampleTitle: 'រូបភាពឆ្លើយតប <picture> និងការរក្សាសមាមាត្រ',
          tip: 'កុំដាក់ loading="lazy" លើរូបភាពធំខាងលើបង្អស់នៃទំព័រ (above-the-fold hero)—គួរប្រើ fetchpriority="high" វិញដើម្បីឱ្យវាផ្ទុកភ្លាមៗ។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើត <figure> ដែលមាន <img> ប្រើ src="https://picsum.photos/600/320", កំណត់ width="600" និង height="320", loading="lazy", អត្ថបទ alt ច្បាស់លាស់, <figcaption> និងតំណភ្ជាប់ខាងក្រៅដែលបើកក្នុងផ្ទាំងថ្មីដោយសុវត្ថិភាព។',
        hint: 'ភ្ជាប់ target="_blank" ជាមួយ rel="noopener noreferrer" ហើយដាក់ចំណងជើងរូបភាពក្នុង <figcaption> ខាងក្នុង <figure>។',
      },
      quiz: [
        {
          question:
            'តើអ្នកគួរសរសេរគុណលក្ខណៈ alt យ៉ាងដូចម្ដេចសម្រាប់រូបតំណាងតុបតែងសុទ្ធដែលនៅក្បែរអក្សរ?',
          options: [
            'មិនបាច់ដាក់គុណលក្ខណៈ alt ទេ',
            'កំណត់ alt="" (អត្ថបទទទេ) ដើម្បីឱ្យកម្មវិធីអានអេក្រង់រំលង',
            'កំណត់ alt="decorative icon image"',
            'កំណត់ alt="none"',
          ],
          answer: 1,
          explanation:
            'ការដាក់ alt="" ប្រាប់កម្មវិធីអានអេក្រង់ថារូបភាពនេះគ្រាន់តែសម្រាប់តុបតែង រីឯការមិនដាក់ alt សោះអាចធ្វើឱ្យវាអានឈ្មោះឯកសារជំនួស។',
        },
        {
          question:
            'ហេតុអ្វីគួរដាក់ width និង height ក្នុង HTML លើ <img> ទោះជា CSS មាន width: 100%; height: auto ហើយក៏ដោយ?',
          options: [
            'ដើម្បីកាត់រូបភាពលើម៉ាស៊ីនមេដោយស្វ័យប្រវត្តិ',
            'ដើម្បីកុំឱ្យកម្មវិធីរុករករក្សាទុករូបភាពក្នុង cache',
            'ដើម្បីឱ្យកម្មវិធីរុករកគណនាសមាមាត្រ និងទុកចន្លោះជាមុន ការពារទំព័រកុំឱ្យលោត',
            'ដើម្បីចាក់សោរូបភាពឱ្យមានទំហំភីកសែលថេរ',
          ],
          answer: 2,
          explanation:
            'កម្មវិធីរុករកទំនើបប្រើ width និង height ដើម្បីដឹងសមាមាត្ររូបភាពជាមុន ជួយកុំឱ្យអត្ថបទខាងក្រោមលោតចុះឡើងពេលរូបភាពផ្ទុករួច។',
        },
      ],
    },
  },

  'html/lists-and-tables': {
    en: {
      duration: '11 min',
      objectives: [
        'Choose between <ul>, <ol>, and description lists (<dl>, <dt>, <dd>) for different data structures.',
        'Nest sub-lists inside <li> elements properly without breaking HTML validity.',
        'Build accessible data tables using <caption>, <thead>, <tbody>, <tfoot>, and scope attributes.',
      ],
      extraSections: [
        {
          id: 'nested-and-description-lists',
          heading: 'Nested Lists & Description Lists (<dl>)',
          body: [
            'Beyond bulleted (<ul>) and numbered (<ol>) lists, HTML provides description lists (<dl>) for name–value pairs such as glossaries, product specifications, and FAQ items. Each term sits in <dt> and its explanation sits in one or more <dd> elements.',
            'When building multi-level outlines or dropdown navigation menus, remember one strict HTML rule: only <li> elements can be direct children of <ul> or <ol>. A nested sub-list must live inside its parent <li>, never directly between two <li> tags.',
          ],
          points: [
            'Control ordered lists with start="5" or reversed when displaying countdowns or paginated rankings.',
            'Use <dl> for metadata blocks (Author, Reading Time, License) instead of unrelated <div> rows.',
            'Always keep navigation links inside <nav><ul><li><a>...</a></li></ul></nav> so screen readers announce item counts.',
          ],
          example: {
            title: 'Description List & Properly Nested Steps',
            language: 'html',
            code: `<h3>Glossary</h3>
<dl>
  <dt>DOM</dt>
  <dd>Document Object Model — the browser’s live tree of HTML nodes.</dd>
  <dt>ARIA</dt>
  <dd>Accessible Rich Internet Applications attributes for assistive tech.</dd>
</dl>

<h3>Deployment Checklist</h3>
<ol>
  <li>Run tests
    <ul>
      <li>Unit tests</li>
      <li>Accessibility audit</li>
    </ul>
  </li>
  <li>Deploy build</li>
</ol>`,
            playground: {
              html: `<section class="wrap">
  <h2>Key Terms (&lt;dl&gt;)</h2>
  <dl class="glossary">
    <dt>DOM</dt>
    <dd>The browser’s live object tree created from your HTML markup.</dd>
    <dt>Semantic Table</dt>
    <dd>Tabular data paired with caption, thead, tbody, and scoped headers.</dd>
  </dl>

  <h2>Release Steps (Nested &lt;ol&gt; + &lt;ul&gt;)</h2>
  <ol class="steps">
    <li>Verify build
      <ul>
        <li>Check HTML validation</li>
        <li>Test mobile layout</li>
      </ul>
    </li>
    <li>Publish to production</li>
  </ol>
</section>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.wrap { max-width: 52ch; }
h2 { font-size: 16px; margin: 16px 0 8px; }
.glossary { margin: 0; padding: 12px 16px; border-radius: 10px; background: #fafafa; border: 1px solid #e4e4e7; }
dt { font-weight: 700; font-size: 14px; margin-top: 8px; }
dt:first-child { margin-top: 0; }
dd { margin: 2px 0 0; font-size: 14px; color: #52525b; }
.steps { padding-left: 20px; line-height: 1.7; font-size: 14px; }`,
              js: '',
            },
          },
          tip: 'Wrap wide data tables in a container with overflow-x: auto so mobile users can horizontally scroll the table without breaking the entire page layout.',
        },
        {
          id: 'accessible-data-tables',
          heading: 'Accessible Data Tables: <caption>, scope & <tfoot>',
          body: [
            'Visual readers scan columns and rows at a glance, but screen-reader users move cell by cell. Adding a <caption> gives the table an accessible title, while adding scope="col" on column headers and scope="row" on row headers explicitly announces which header belongs to every <td> cell.',
            'For financial summaries or score totals, use <tfoot> at the bottom of the table, and use colspan or rowspan sparingly to merge summary cells. Keep numeric values right-aligned with font-variant-numeric: tabular-nums in CSS so decimal points line up cleanly.',
          ],
          table: {
            headers: ['Tag / Attribute', 'Where Used', 'Purpose'],
            rows: [
              [
                '<caption>',
                'First child of <table>',
                'Provides an accessible title describing the table’s data.',
              ],
              [
                '<th scope="col">',
                'Inside <thead>',
                'Marks a column header associated with cells below it.',
              ],
              [
                '<th scope="row">',
                'First cell in <tbody> <tr>',
                'Marks a row header associated with cells to its right.',
              ],
              [
                '<tfoot>',
                'Inside <table>',
                'Groups summary or total rows separately from body rows.',
              ],
              [
                'colspan / rowspan',
                'On <th> or <td>',
                'Merges a cell across multiple columns or rows.',
              ],
            ],
          },
          warning:
            'Never use <table> for page layouts or card grids, and never place a nested <ul> directly inside another <ul> outside an <li>. Both break accessibility semantics and HTML validation.',
        },
      ],
      challenge: {
        prompt:
          'Build an accessible expense table with a <caption>, a <thead> containing Item and Cost (<th scope="col">), a <tbody> with 2 rows (using <th scope="row"> for the item name), and a <tfoot> displaying the Total row.',
        hint: 'Place <caption> as the very first element inside <table>, and use scope="col" in <thead> and scope="row" in <tbody> and <tfoot>.',
        language: 'html',
        solutionCode: `<table>
  <caption>Monthly Hosting Costs</caption>
  <thead>
    <tr>
      <th scope="col">Service</th>
      <th scope="col">Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Domain</th>
      <td>$12</td>
    </tr>
    <tr>
      <th scope="row">Cloud Server</th>
      <td>$20</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>$32</td>
    </tr>
  </tfoot>
</table>`,
      },
      quiz: [
        {
          question: 'Where must a nested <ul> sub-list be placed inside a parent <ul>?',
          options: [
            'Directly between two <li> elements',
            'Inside the parent <li> element that owns the sub-list',
            'Inside a <div> wrapper right after the closing </ul>',
            'Inside the <head> section',
          ],
          answer: 1,
          explanation:
            'Only <li> elements are valid direct children of <ul> or <ol>, so any sub-list must be nested inside its parent <li>.',
        },
        {
          question: 'What does <th scope="col"> communicate to assistive technologies?',
          options: [
            'It makes the column sortable on click',
            'It fixes the column width in pixels',
            'It explicitly links that header cell to all data cells in the same column',
            'It merges the header across every column in the table',
          ],
          answer: 2,
          explanation:
            'The scope="col" attribute tells screen readers which column header applies as a user navigates horizontally and vertically through data cells.',
        },
      ],
    },
    km: {
      duration: '11 នាទី',
      objectives: [
        'ជ្រើសរើសរវាង <ul>, <ol> និងបញ្ជីពណ៌នា (<dl>, <dt>, <dd>) ឱ្យត្រូវតាមប្រភេទទិន្នន័យ។',
        'ដាក់បញ្ជីរងត្រួតនៅក្នុង <li> បានត្រឹមត្រូវតាមស្តង់ដារ HTML។',
        'បង្កើតតារាងទិន្នន័យងាយស្រួលប្រើប្រាស់ដោយប្រើ <caption>, <thead>, <tbody>, <tfoot> និងគុណលក្ខណៈ scope។',
      ],
      extraSections: [
        {
          id: 'nested-and-description-lists',
          heading: 'បញ្ជីត្រួតគ្នា និងបញ្ជីពណ៌នា (<dl>)',
          body: [
            'ក្រៅពីបញ្ជីចំណុច (<ul>) និងបញ្ជីលេខរៀង (<ol>) HTML ក៏មានបញ្ជីពណ៌នា (<dl>) សម្រាប់គូពាក្យ-តម្លៃ ដូចជាវចនានុក្រម លក្ខណៈបច្ចេកទេសផលិតផល ឬសំណួរញឹកញាប់។ ពាក្យនីមួយៗដាក់ក្នុង <dt> ហើយការពន្យល់ដាក់ក្នុង <dd>។',
            'នៅពេលបង្កើតបញ្ជីច្រើនកម្រិត ឬម៉ឺនុយរង ត្រូវចងចាំច្បាប់តឹងរ៉ឹងមួយ៖ មានតែ <li> ប៉ុណ្ណោះដែលអាចជាកូនផ្ទាល់របស់ <ul> ឬ <ol>។ បញ្ជីរងត្រូវតែដាក់នៅខាងក្នុង <li> មេរបស់វា មិនមែននៅចន្លោះ <li> ពីរឡើយ។',
          ],
          points: [
            'ប្រើគុណលក្ខណៈ start="5" ឬ reversed លើ <ol> សម្រាប់រាប់ថយក្រោយ ឬបន្តលេខរៀងតាមទំព័រ។',
            'ប្រើ <dl> សម្រាប់ទិន្នន័យមេតា (អ្នកនិពន្ធ រយៈពេលអាន អាជ្ញាប័ណ្ណ) ជំនួសឱ្យជួរ <div> ធម្មតា។',
            'រុំតំណភ្ជាប់ម៉ឺនុយក្នុង <nav><ul><li><a>...</a></li></ul></nav> ដើម្បីឱ្យកម្មវិធីអានអេក្រង់ប្រាប់ចំនួនធាតុបានត្រឹមត្រូវ។',
          ],
          exampleTitle: 'បញ្ជីពណ៌នា និងបញ្ជីជំហានត្រួតគ្នាត្រឹមត្រូវ',
          tip: 'រុំតារាងទិន្នន័យធំៗក្នុងប្រអប់ដែលមាន overflow-x: auto ដើម្បីឱ្យអ្នកប្រើទូរស័ព្ទអាចរំកិលឆ្វេង-ស្ដាំលើតារាងដោយមិនបែកប្លង់ទំព័រ។',
        },
        {
          id: 'accessible-data-tables',
          heading: 'តារាងទិន្នន័យងាយស្រួលប្រើប្រាស់៖ <caption>, scope និង <tfoot>',
          body: [
            'អ្នកអានធម្មតាអាចមើលជួរឈរ និងជួរដេកបានភ្លាមៗ ប៉ុន្តែអ្នកប្រើកម្មវិធីអានអេក្រង់ផ្លាស់ទីតាមប្រអប់មួយៗ។ ការបន្ថែម <caption> ផ្ដល់ចំណងជើងដល់តារាង ចំណែក scope="col" លើក្បាលជួរឈរ និង scope="row" លើក្បាលជួរដេក ប្រាប់ច្បាស់ថាក្បាលណាជារបស់ប្រអប់ <td> នីមួយៗ។',
            'សម្រាប់ជួរសរុបតម្លៃ ឬពិន្ទុ សូមប្រើ <tfoot> នៅផ្នែកខាងក្រោមនៃតារាង និងប្រើ colspan ឬ rowspan តែពេលចាំបាច់។ ដាក់លេខតម្រឹមស្ដាំជាមួយ font-variant-numeric: tabular-nums ក្នុង CSS ដើម្បីឱ្យខ្ទង់លេខត្រង់ជួរគ្នាស្អាត។',
          ],
          table: {
            headers: ['ស្លាក / គុណលក្ខណៈ', 'ទីតាំងប្រើ', 'តួនាទី'],
            rows: [
              ['<caption>', 'កូនដំបូងក្នុង <table>', 'ផ្ដល់ចំណងជើងច្បាស់លាស់ពណ៌នាទិន្នន័យតារាង។'],
              [
                '<th scope="col">',
                'ខាងក្នុង <thead>',
                'សម្គាល់ក្បាលជួរឈរសម្រាប់ប្រអប់ទិន្នន័យខាងក្រោម។',
              ],
              [
                '<th scope="row">',
                'ប្រអប់ដំបូងក្នុង <tbody> <tr>',
                'សម្គាល់ក្បាលជួរដេកសម្រាប់ទិន្នន័យនៅខាងស្ដាំ។',
              ],
              ['<tfoot>', 'ខាងក្នុង <table>', 'ផ្ដុំជួរសរុបដាច់ដោយឡែកពីជួរទិន្នន័យធម្មតា។'],
              ['colspan / rowspan', 'លើ <th> ឬ <td>', 'បញ្ចូលប្រអប់ច្រើនជួរឈរ ឬច្រើនជួរដេកតែមួយ។'],
            ],
          },
          warning:
            'កុំប្រើ <table> សម្រាប់រៀបប្លង់គេហទំព័រ ហើយកុំដាក់ <ul> រងដោយផ្ទាល់ក្នុង <ul> មេនៅខាងក្រៅ <li> ព្រោះវាបំពានស្តង់ដារ HTML និងភាពងាយស្រួលប្រើប្រាស់។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើតតារាងចំណាយងាយស្រួលប្រើប្រាស់ដែលមាន <caption>, <thead> មាន Service និង Cost (<th scope="col">), <tbody> មាន 2 ជួរ (ប្រើ <th scope="row"> សម្រាប់ឈ្មោះសេវាកម្ម) និង <tfoot> បង្ហាញជួរ Total។',
        hint: 'ដាក់ <caption> ជាធាតុដំបូងគេក្នុង <table> ហើយប្រើ scope="col" ក្នុង <thead> និង scope="row" ក្នុង <tbody> និង <tfoot>។',
      },
      quiz: [
        {
          question: 'តើបញ្ជីរង <ul> ត្រូវដាក់នៅទីណានៅក្នុង <ul> មេ?',
          options: [
            'ដាក់ផ្ទាល់នៅចន្លោះ <li> ពីរ',
            'ដាក់នៅខាងក្នុងធាតុ <li> មេដែលជាម្ចាស់បញ្ជីរងនោះ',
            'ដាក់ក្នុង <div> បន្ទាប់ពីស្លាកបិទ </ul>',
            'ដាក់ក្នុងផ្នែក <head>',
          ],
          answer: 1,
          explanation:
            'មានតែ <li> ប៉ុណ្ណោះដែលអាចជាកូនផ្ទាល់របស់ <ul> ឬ <ol> ដូច្នេះបញ្ជីរងត្រូវតែដាក់ខាងក្នុង <li> មេ។',
        },
        {
          question: 'តើ <th scope="col"> ប្រាប់អ្វីដល់បច្ចេកវិទ្យាជំនួយ?',
          options: [
            'ធ្វើឱ្យជួរឈរអាចតម្រៀបបានពេលចុច',
            'កំណត់ទទឹងជួរឈរជាភីកសែលថេរ',
            'ភ្ជាប់ក្បាលជួរឈរនោះយ៉ាងច្បាស់ទៅនឹងប្រអប់ទិន្នន័យទាំងអស់ក្នុងជួរឈរតែមួយ',
            'បញ្ចូលក្បាលជួរឈរទាំងអស់ក្នុងតារាងជាមួយគ្នា',
          ],
          answer: 2,
          explanation:
            'គុណលក្ខណៈ scope="col" ជួយឱ្យកម្មវិធីអានអេក្រង់ដឹងច្បាស់ថាក្បាលជួរឈរណាត្រូវនឹងប្រអប់ទិន្នន័យនីមួយៗពេលអ្នកប្រើផ្លាស់ទី។',
        },
      ],
    },
  },

  'html/forms-and-inputs': {
    en: {
      duration: '12 min',
      objectives: [
        'Choose specialized HTML5 input types (email, tel, url, number, date, checkbox, radio) to trigger the right mobile keyboard.',
        'Group related controls accessibly with <fieldset>, <legend>, and matching name attributes.',
        'Apply built-in constraint validation (required, minlength, pattern) and autocomplete tokens.',
      ],
      extraSections: [
        {
          id: 'input-types-and-grouping',
          heading: 'Input Types, Name Attributes & Fieldset Grouping',
          body: [
            'Every form field submitted to a server or read via FormData needs a name attribute—without name, the browser excludes that field from the form payload. Radio buttons belong to the same group exclusively because they share the same name while carrying distinct value attributes.',
            'When you present a group of radio buttons or checkboxes, wrap them inside a <fieldset> with a <legend> describing the question (e.g., "Preferred Track"). Screen readers announce the legend automatically whenever the user tabs into any option in the group.',
          ],
          table: {
            headers: ['Control / Attribute', 'Purpose', 'UX Benefit'],
            rows: [
              [
                'type="email" / "tel"',
                'Email or phone field',
                'Opens @ or numeric keypad automatically on phones.',
              ],
              [
                'type="radio"',
                'Single choice in a group',
                'Sharing one name enforces mutually exclusive selection.',
              ],
              [
                '<select> + <option>',
                'Dropdown choice list',
                'Compact way to pick from 5+ predefined options.',
              ],
              [
                '<fieldset> + <legend>',
                'Accessible group wrapper',
                'Gives screen readers context for radio/checkbox groups.',
              ],
              [
                'autocomplete="email"',
                'Autofill hint',
                'Lets password managers and browsers fill forms in 1 tap.',
              ],
            ],
          },
          warning:
            'Never use placeholder as a replacement for <label>. Placeholders vanish the moment a user starts typing, have poor contrast by default, and fail accessibility audits.',
        },
        {
          id: 'native-validation-and-ux',
          heading: 'Native Validation, FormData & Accessible Feedback',
          body: [
            'HTML5 gives you declarative validation attributes before writing a single line of JavaScript: required, minlength, maxlength, min, max, step, and pattern (regex). Browsers also expose :valid, :invalid, and :user-invalid CSS pseudo-classes so you can style errors only after the user interacts with a field.',
            'On submit, reading inputs with new FormData(form) is cleaner and less brittle than querying every input by ID. Always validate on the server too—client-side HTML validation improves UX, never security.',
          ],
          points: [
            'Set explicit type="button" on secondary buttons inside a <form>; otherwise a plain <button> defaults to type="submit".',
            'Use aria-describedby="pw-hint" on an input to connect helper text (like password rules) directly to screen readers.',
            'Pair <input> with <datalist> when you want autocomplete suggestions while still allowing free-form input.',
          ],
          example: {
            title: 'Structured Course Enrollment Form with FormData',
            language: 'html',
            code: `<form id="enroll-form">
  <label for="full-name">Full name</label>
  <input id="full-name" name="fullName" type="text" required minlength="2" autocomplete="name" />

  <fieldset>
    <legend>Experience level</legend>
    <label><input type="radio" name="level" value="beginner" checked /> Beginner</label>
    <label><input type="radio" name="level" value="pro" /> Pro</label>
  </fieldset>

  <button type="submit">Enroll Now</button>
</form>`,
            playground: {
              html: `<form id="enroll-form" class="form">
  <div class="field">
    <label for="full-name">Full name</label>
    <input id="full-name" name="fullName" type="text" required minlength="2" autocomplete="name" placeholder="Dara Sok" />
  </div>
  <div class="field">
    <label for="track">Primary track</label>
    <select id="track" name="track">
      <option value="html">HTML Fundamentals</option>
      <option value="css">CSS Styling &amp; Layout</option>
      <option value="javascript">JavaScript Essentials</option>
    </select>
  </div>
  <fieldset class="group">
    <legend>Experience level</legend>
    <label class="choice"><input type="radio" name="level" value="beginner" checked /> Beginner</label>
    <label class="choice"><input type="radio" name="level" value="intermediate" /> Intermediate</label>
  </fieldset>
  <button type="submit">Enroll Now</button>
  <pre id="output" aria-live="polite">Submit the form to inspect FormData.</pre>
</form>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.form { display: grid; gap: 12px; max-width: 340px; }
.field { display: grid; gap: 4px; }
label { font-size: 13px; font-weight: 600; }
input[type="text"], select { padding: 8px 10px; border: 1px solid #d4d4d8; border-radius: 8px; font-size: 14px; }
.group { border: 1px solid #e4e4e7; border-radius: 10px; padding: 10px 12px; display: flex; gap: 14px; }
legend { font-size: 12px; font-weight: 600; color: #52525b; padding: 0 4px; }
.choice { font-weight: 500; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; }
button { padding: 10px 14px; border: none; border-radius: 8px; background: #2563eb; color: white; font-weight: 600; cursor: pointer; }
pre { margin: 0; padding: 10px; border-radius: 8px; background: #f4f4f5; font-size: 12px; }`,
              js: `const form = document.getElementById('enroll-form');
const output = document.getElementById('output');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  output.textContent = JSON.stringify(data, null, 2);
  console.log('Submitted:', data);
});`,
            },
          },
          tip: 'Use inputmode="numeric" on credit-card or OTP fields instead of type="number" so you get a mobile number pad without unwanted up/down spinner arrows or dropped leading zeros.',
        },
      ],
      challenge: {
        prompt:
          'Build an accessible feedback form containing a required username input (minlength="3", name="username"), a <fieldset> with two radio buttons sharing name="rating" (values "great" and "needs-work"), a <textarea name="comment">, and a submit button.',
        hint: 'Give every input a matching <label for="..."> and id, and put a <legend> as the first child of <fieldset>.',
        language: 'html',
        solutionCode: `<form>
  <label for="user">Username</label>
  <input id="user" name="username" type="text" required minlength="3" />

  <fieldset>
    <legend>How was this lesson?</legend>
    <label><input type="radio" name="rating" value="great" required /> Great</label>
    <label><input type="radio" name="rating" value="needs-work" /> Needs work</label>
  </fieldset>

  <label for="comment">Comment</label>
  <textarea id="comment" name="comment" rows="3"></textarea>

  <button type="submit">Send Feedback</button>
</form>`,
      },
      quiz: [
        {
          question:
            'Why does a button inside a <form> accidentally submit the form when clicked if you omit the type attribute?',
          options: [
            'Because browsers treat all buttons on a page as submit triggers',
            'Because the default type of <button> inside a <form> is "submit"',
            'Because JavaScript automatically adds a submit handler',
            'Because forms only allow one button element',
          ],
          answer: 1,
          explanation:
            'A <button> without a type attribute defaults to type="submit". Always write type="button" for non-submitting actions like Cancel or Show Password.',
        },
        {
          question:
            'What happens if an <input> inside a <form> has an id attribute but no name attribute?',
          options: [
            'The browser throws a syntax error and hides the input',
            'The input cannot receive keyboard focus',
            'The input’s value is omitted from FormData and native form submissions',
            'The label cannot connect to the input',
          ],
          answer: 2,
          explanation:
            'id connects <label for="..."> and CSS/JS selectors, while name is the key used when serializing form data for FormData or HTTP submission.',
        },
      ],
    },
    km: {
      duration: '12 នាទី',
      objectives: [
        'ជ្រើសរើសប្រភេទ input របស់ HTML5 (email, tel, url, number, date, checkbox, radio) ឱ្យត្រូវតាមក្ដារចុចទូរស័ព្ទ។',
        'ផ្ដុំធាតុទម្រង់ដែលពាក់ព័ន្ធគ្នាដោយប្រើ <fieldset>, <legend> និងគុណលក្ខណៈ name ឱ្យត្រឹមត្រូវ។',
        'ប្រើការផ្ទៀងផ្ទាត់ភ្ជាប់មកស្រាប់ (required, minlength, pattern) និង autocomplete។',
      ],
      extraSections: [
        {
          id: 'input-types-and-grouping',
          heading: 'ប្រភេទ Input, គុណលក្ខណៈ name និងការផ្ដុំដោយ Fieldset',
          body: [
            'ប្រអប់បញ្ចូលនីមួយៗដែលត្រូវផ្ញើទៅម៉ាស៊ីនមេ ឬអានតាម FormData ត្រូវតែមានគុណលក្ខណៈ name—បើគ្មាន name ទេ កម្មវិធីរុករកនឹងមិនបញ្ចូលទិន្នន័យនោះទៅក្នុងលទ្ធផលទម្រង់ឡើយ។ ប៊ូតុង radio ស្ថិតក្នុងក្រុមតែមួយបានដោយសារវាប្រើ name ដូចគ្នា តែមាន value ខុសគ្នា។',
            'នៅពេលបង្ហាញក្រុមប៊ូតុង radio ឬ checkbox សូមរុំវាក្នុង <fieldset> រួចដាក់ <legend> ពណ៌នាសំណួរ (ឧ. "កម្រិតបទពិសោធន៍")។ កម្មវិធីអានអេក្រង់នឹងអាន legend ដោយស្វ័យប្រវត្តិពេលអ្នកប្រើចុច Tab ចូលជម្រើសនីមួយៗ។',
          ],
          table: {
            headers: ['ធាតុ / គុណលក្ខណៈ', 'តួនាទី', 'អត្ថប្រយោជន៍ UX'],
            rows: [
              [
                'type="email" / "tel"',
                'ប្រអប់អ៊ីមែល ឬទូរស័ព្ទ',
                'បើកក្ដារចុចមាន @ ឬលេខដោយស្វ័យប្រវត្តិលើទូរស័ព្ទ។',
              ],
              [
                'type="radio"',
                'ជម្រើសតែមួយក្នុងក្រុម',
                'ការប្រើ name ដូចគ្នាអនុញ្ញាតឱ្យជ្រើសបានតែមួយគត់។',
              ],
              [
                '<select> + <option>',
                'បញ្ជីជម្រើសទម្លាក់ចុះ',
                'សន្សំទំហំសម្រាប់ជម្រើសដែលមានច្រើនជាង 5។',
              ],
              [
                '<fieldset> + <legend>',
                'ប្រអប់ផ្ដុំក្រុមមានន័យ',
                'ផ្ដល់បរិបទដល់កម្មវិធីអានអេក្រង់សម្រាប់ radio/checkbox។',
              ],
              [
                'autocomplete="email"',
                'ជំនួយបំពេញស្វ័យប្រវត្តិ',
                'អនុញ្ញាតឱ្យកម្មវិធីរុករកបំពេញទិន្នន័យដោយចុចតែម្ដង។',
              ],
            ],
          },
          warning:
            'កុំប្រើ placeholder ជំនួស <label> ឡើយ។ Placeholder បាត់ទៅវិញភ្លាមពេលអ្នកប្រើចាប់ផ្ដើមវាយ មានពណ៌ស្រាលពិបាកមើល និងមិនឆ្លងកាត់ការត្រួតពិនិត្យភាពងាយស្រួលប្រើប្រាស់ទេ។',
        },
        {
          id: 'native-validation-and-ux',
          heading: 'ការផ្ទៀងផ្ទាត់ភ្ជាប់មកស្រាប់ FormData និងការឆ្លើយតប',
          body: [
            'HTML5 ផ្ដល់គុណលក្ខណៈផ្ទៀងផ្ទាត់ជាស្រេចមុនពេលសរសេរ JavaScript ដូចជា required, minlength, maxlength, min, max, step និង pattern។ កម្មវិធីរុករកក៏មាន CSS pseudo-classes ដូចជា :valid, :invalid និង :user-invalid សម្រាប់បង្ហាញស្ទីលកំហុសបន្ទាប់ពីអ្នកប្រើបានបំពេញ។',
            'ពេលដាក់ស្នើទម្រង់ ការអានទិន្នន័យដោយ new FormData(form) ស្អាត និងងាយថែទាំជាងការហៅប្រអប់នីមួយៗតាម ID។ កុំភ្លេចផ្ទៀងផ្ទាត់លើម៉ាស៊ីនមេផងដែរ—ការផ្ទៀងផ្ទាត់ក្នុង HTML ជួយបទពិសោធន៍អ្នកប្រើ មិនមែនជំនួសសុវត្ថិភាពឡើយ។',
          ],
          points: [
            'តែងតែដាក់ type="button" លើប៊ូតុងបន្ទាប់បន្សំក្នុង <form> បើមិនដូច្នោះទេ <button> ធម្មតានឹងក្លាយជា type="submit" ដោយស្វ័យប្រវត្តិ។',
            'ប្រើ aria-describedby="pw-hint" ដើម្បីភ្ជាប់អត្ថបទណែនាំ (ដូចជាច្បាប់ពាក្យសម្ងាត់) ទៅនឹងប្រអប់បញ្ចូល។',
            'ប្រើ <input> ជាមួយ <datalist> ពេលចង់ផ្ដល់ជម្រើសណែនាំ តែនៅតែអនុញ្ញាតឱ្យវាយអក្សរដោយសេរី។',
          ],
          exampleTitle: 'ទម្រង់ចុះឈ្មោះសិក្សាជាមួយ FormData',
          tip: 'ប្រើ inputmode="numeric" សម្រាប់លេខកូដ OTP ឬលេខកាត ជំនួសឱ្យ type="number" ដើម្បីបានក្ដារចុចលេខលើទូរស័ព្ទដោយគ្មានព្រួញឡើងចុះ ឬបាត់លេខ 0 ខាងមុខ។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើតទម្រង់ផ្ដល់មតិងាយស្រួលប្រើប្រាស់ដែលមានប្រអប់ username (required, minlength="3", name="username"), <fieldset> មានប៊ូតុង radio ពីរប្រើ name="rating" (តម្លៃ "great" និង "needs-work"), <textarea name="comment"> និងប៊ូតុង submit។',
        hint: 'ភ្ជាប់ប្រអប់នីមួយៗជាមួយ <label for="..."> និង id ឱ្យត្រូវគ្នា ហើយដាក់ <legend> ជាកូនដំបូងក្នុង <fieldset>។',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វីបានជា <button> នៅក្នុង <form> ច្រឡំដាក់ស្នើទម្រង់ពេលចុច បើអ្នកភ្លេចដាក់គុណលក្ខណៈ type?',
          options: [
            'ព្រោះកម្មវិធីរុករកចាត់ទុកគ្រប់ប៊ូតុងលើទំព័រជាប៊ូតុង submit',
            'ព្រោះតម្លៃលំនាំដើមរបស់ <button> នៅក្នុង <form> គឺ type="submit"',
            'ព្រោះ JavaScript បន្ថែម submit handler ដោយស្វ័យប្រវត្តិ',
            'ព្រោះទម្រង់អនុញ្ញាតឱ្យមានប៊ូតុងតែមួយប៉ុណ្ណោះ',
          ],
          answer: 1,
          explanation:
            '<button> ដែលគ្មាន type នៅក្នុង <form> មានតម្លៃលំនាំដើមជា type="submit"។ គួរសរសេរ type="button" សម្រាប់ប៊ូតុងដូចជា បោះបង់ ឬ បង្ហាញពាក្យសម្ងាត់។',
        },
        {
          question:
            'តើនឹងមានអ្វីកើតឡើងប្រសិនបើ <input> ក្នុង <form> មាន id ប៉ុន្តែគ្មានគុណលក្ខណៈ name?',
          options: [
            'កម្មវិធីរុករកបង្ហាញកំហុស ហើយលាក់ប្រអប់បញ្ចូលនោះ',
            'ប្រអប់បញ្ចូលមិនអាចចុច Tab ចូលបានទេ',
            'តម្លៃរបស់ប្រអប់នោះនឹងមិនត្រូវបានបញ្ចូលក្នុង FormData ឬការដាក់ស្នើទម្រង់ឡើយ',
            '<label> មិនអាចភ្ជាប់ទៅប្រអប់បញ្ចូលនោះបានទេ',
          ],
          answer: 2,
          explanation:
            'id ប្រើសម្រាប់ភ្ជាប់ <label for="..."> និង CSS/JS រីឯ name គឺជាឈ្មោះគន្លឹះសម្រាប់ប្រមូលទិន្នន័យក្នុង FormData ឬការផ្ញើទម្រង់ HTTP។',
        },
      ],
    },
  },

  'html/accessibility-and-seo': {
    en: {
      duration: '13 min',
      objectives: [
        'Apply the First Rule of ARIA: use native HTML controls first, and add ARIA states only for custom widgets.',
        'Guarantee full keyboard operability with visible :focus-visible rings and a skip-to-content link.',
        'Configure production SEO & social metadata (canonical, description, Open Graph) and protect Core Web Vitals.',
      ],
      extraSections: [
        {
          id: 'keyboard-focus-and-aria',
          heading: 'Keyboard Navigation, Focus Order & Core ARIA States',
          body: [
            'Try navigating your own site using only Tab, Shift+Tab, Enter, Space, and Escape. Every interactive element must be reachable in logical visual order, display a clear :focus-visible outline, and work without a mouse. Adding a "Skip to main content" link as the first child of <body> saves keyboard users from tabbing through the entire navbar on every page load.',
            'ARIA attributes bridge the gap when building custom components like tabs, accordions, or icon-only buttons. Attributes like aria-expanded, aria-controls, and aria-current="page" expose dynamic state to assistive technologies that visual CSS classes alone cannot communicate.',
          ],
          table: {
            headers: ['Attribute / Pattern', 'Use Case', 'What It Announces'],
            rows: [
              [
                'aria-label="Close"',
                'Icon-only <button>',
                'Gives an accessible name when there is no visible text.',
              ],
              [
                'aria-expanded="false"',
                'Accordion / dropdown trigger',
                'Tells screen readers whether the panel is open or closed.',
              ],
              [
                'aria-live="polite"',
                'Toast / status message',
                'Reads dynamic updates once the user finishes current speech.',
              ],
              [
                'aria-current="page"',
                'Active link in <nav>',
                'Identifies which navigation link matches the current page.',
              ],
              [
                'aria-hidden="true"',
                'Decorative SVG icons',
                'Hides purely visual icons from the accessibility tree.',
              ],
            ],
          },
          warning:
            'Never build a clickable <div onclick="..."> instead of a <button>, and never set tabindex greater than 0 (like tabindex="5"). Positive tabindex scrambles natural focus order and creates a maintenance nightmare.',
        },
        {
          id: 'seo-open-graph-and-cwv',
          heading: 'SEO Metadata, Open Graph & Core Web Vitals',
          body: [
            'Search engines and social platforms read your <head> before anything else. A unique <title> (50–60 chars), a clear <meta name="description"> (120–155 chars), a canonical <link rel="canonical">, and Open Graph tags (og:title, og:description, og:image) control how your page looks in Google search and chat link previews.',
            'HTML structure directly impacts Core Web Vitals: prioritize your hero image with fetchpriority="high" (LCP), set width and height on media (CLS), and defer non-critical scripts with <script defer> so the main thread stays responsive (INP).',
          ],
          points: [
            'Use native <details> and <summary> for accessible accordions with zero JavaScript required.',
            'Maintain at least a 4.5:1 color contrast ratio for normal body text and 3:1 for large text and UI borders (WCAG AA).',
            'Always provide a single descriptive <h1> matching the page topic; it anchors both SEO and screen-reader hierarchy.',
          ],
          example: {
            title: 'Accessible Accordion & Production SEO Head Tags',
            language: 'html',
            code: `<!-- Essential SEO + Social Preview Metadata -->
<link rel="canonical" href="https://codehub.dev/learn/html/accessibility-and-seo" />
<meta name="description" content="Master ARIA, keyboard focus, and SEO metadata." />
<meta property="og:title" content="HTML Accessibility & SEO — CodeHub" />
<meta property="og:type" content="article" />

<!-- Accessible Toggle Widget with aria-expanded -->
<button id="faq-btn" type="button" aria-expanded="false" aria-controls="faq-panel">
  What is the First Rule of ARIA?
</button>
<div id="faq-panel" hidden>
  Use native HTML elements whenever a built-in element already exists.
</div>`,
            playground: {
              html: `<a class="skip-link" href="#content">Skip to main content</a>
<main id="content" class="card">
  <button id="faq-btn" type="button" class="trigger" aria-expanded="false" aria-controls="faq-panel">
    <span>What is the First Rule of ARIA?</span>
    <span id="chev" aria-hidden="true">+</span>
  </button>
  <div id="faq-panel" class="panel" hidden>
    Use native HTML elements like &lt;button&gt;, &lt;a&gt;, and &lt;details&gt; first—only add ARIA when native semantics are not enough.
  </div>
</main>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.skip-link { position: absolute; left: -9999px; }
.skip-link:focus { position: static; display: inline-block; margin-bottom: 12px; padding: 6px 10px; background: #18181b; color: white; border-radius: 6px; font-size: 13px; }
.card { max-width: 440px; border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; }
.trigger { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; background: #fafafa; border: none; font-size: 14px; font-weight: 600; cursor: pointer; text-align: left; }
.trigger:focus-visible { outline: 2px solid #2563eb; outline-offset: -2px; }
.panel { padding: 14px 16px; font-size: 14px; line-height: 1.6; color: #52525b; border-top: 1px solid #e4e4e7; }`,
              js: `const btn = document.getElementById('faq-btn');
const panel = document.getElementById('faq-panel');
const chev = document.getElementById('chev');

btn.addEventListener('click', () => {
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!expanded));
  panel.hidden = expanded;
  chev.textContent = expanded ? '+' : '−';
  console.log('aria-expanded:', !expanded);
});`,
            },
          },
          tip: 'Test every page with Chrome DevTools Lighthouse (Accessibility + SEO tabs) and try tabbing through all buttons with your mouse unplugged.',
        },
      ],
      challenge: {
        prompt:
          'Write an accessible navigation bar inside <nav aria-label="Primary"> with two links (mark the first one active with aria-current="page") and an icon-only search <button> that uses aria-label="Search docs" while hiding its decorative SVG with aria-hidden="true".',
        hint: 'Set type="button" on the search button and add aria-hidden="true" directly on the <svg> tag.',
        language: 'html',
        solutionCode: `<nav aria-label="Primary">
  <ul>
    <li><a href="/learn" aria-current="page">Learn</a></li>
    <li><a href="/playground">Playground</a></li>
  </ul>
  <button type="button" aria-label="Search docs">
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24"></svg>
  </button>
</nav>`,
      },
      quiz: [
        {
          question:
            'Which approach follows the First Rule of ARIA for an interactive action button?',
          options: [
            '<div role="button" tabindex="0" onclick="save()">Save</div>',
            '<span role="button" aria-clickable="true">Save</span>',
            '<button type="button">Save</button>',
            '<a href="#" role="button">Save</a>',
          ],
          answer: 2,
          explanation:
            'A native <button type="button"> automatically gives you keyboard focus, Enter/Space activation, disabled behavior, and screen-reader role without extra ARIA or JS.',
        },
        {
          question:
            'Why should an icon-only <button> include aria-label and mark its inner <svg> with aria-hidden="true"?',
          options: [
            'To make the SVG render faster on mobile GPUs',
            'So screen readers announce a clear button name instead of an unlabeled button or raw SVG noise',
            'Because browsers hide buttons that contain SVG tags',
            'To enable hover tooltips in all browsers',
          ],
          answer: 1,
          explanation:
            'Without aria-label, an icon-only button has no accessible name ("button"), while aria-hidden="true" keeps purely decorative vector markup out of the accessibility tree.',
        },
      ],
    },
    km: {
      duration: '13 នាទី',
      objectives: [
        'អនុវត្តច្បាប់ទីមួយនៃ ARIA៖ ប្រើធាតុ HTML ដើមជាមុន ហើយបន្ថែម ARIA តែសម្រាប់សមាសធាតុផ្ទាល់ខ្លួន។',
        'ធានាការប្រើប្រាស់ពេញលេញតាមក្ដារចុចជាមួយស៊ុម :focus-visible ច្បាស់ និងតំណភ្ជាប់រំលងទៅមាតិកាចម្បង។',
        'កំណត់ SEO និងទិន្នន័យមេតាសង្គម (canonical, description, Open Graph) និងថែរក្សា Core Web Vitals។',
      ],
      extraSections: [
        {
          id: 'keyboard-focus-and-aria',
          heading: 'ការប្រើក្ដារចុច លំដាប់ Focus និងស្ថានភាព ARIA សំខាន់ៗ',
          body: [
            'សាកល្បងរុករកគេហទំព័ររបស់អ្នកដោយប្រើតែគ្រាប់ចុច Tab, Shift+Tab, Enter, Space និង Escape។ គ្រប់ធាតុអន្តរកម្មត្រូវតែអាចឈានដល់តាមលំដាប់សមហេតុផល បង្ហាញស៊ុម :focus-visible ច្បាស់ និងដំណើរការដោយមិនបាច់ប្រើកណ្ដុរ។ ការបន្ថែមតំណភ្ជាប់ "រំលងទៅមាតិកាចម្បង" ជួយសន្សំពេលអ្នកប្រើក្ដារចុចបានច្រើន។',
            'គុណលក្ខណៈ ARIA ជួយបំពេញចន្លោះពេលបង្កើតសមាសធាតុផ្ទាល់ខ្លួនដូចជា tabs, accordion ឬប៊ូតុងមានតែរូបតំណាង។ គុណលក្ខណៈដូចជា aria-expanded, aria-controls និង aria-current="page" ប្រាប់ស្ថានភាពបច្ចុប្បន្នទៅកាន់កម្មវិធីអានអេក្រង់។',
          ],
          table: {
            headers: ['គុណលក្ខណៈ / គំរូ', 'ករណីប្រើប្រាស់', 'អ្វីដែលវាប្រាប់កម្មវិធីអាន'],
            rows: [
              [
                'aria-label="Close"',
                'ប៊ូតុងមានតែរូបតំណាង',
                'ផ្ដល់ឈ្មោះច្បាស់លាស់នៅពេលគ្មានអក្សរមើលឃើញ។',
              ],
              [
                'aria-expanded="false"',
                'ប៊ូតុងបើក/បិទ Accordion',
                'ប្រាប់ថាផ្ទាំងខាងក្រោមកំពុងបើក ឬបិទ។',
              ],
              [
                'aria-live="polite"',
                'សារជូនដំណឹង / Toast',
                'អានការផ្លាស់ប្ដូរថ្មីៗដោយមិនកាត់ផ្ដាច់ការអានបច្ចុប្បន្ន។',
              ],
              [
                'aria-current="page"',
                'តំណភ្ជាប់ទំព័របច្ចុប្បន្នក្នុង <nav>',
                'សម្គាល់ថាតំណភ្ជាប់ណាត្រូវនឹងទំព័រដែលកំពុងបើក។',
              ],
              [
                'aria-hidden="true"',
                'រូបតំណាង SVG តុបតែង',
                'លាក់រូបតំណាងតុបតែងចេញពីកម្មវិធីអានអេក្រង់។',
              ],
            ],
          },
          warning:
            'កុំប្រើ <div onclick="..."> ជំនួស <button> ហើយកុំកំណត់ tabindex ធំជាង 0 (ដូចជា tabindex="5") ព្រោះវាធ្វើឱ្យលំដាប់ Tab រញ៉េរញ៉ៃ និងពិបាកថែទាំ។',
        },
        {
          id: 'seo-open-graph-and-cwv',
          heading: 'ទិន្នន័យមេតា SEO, Open Graph និង Core Web Vitals',
          body: [
            'ម៉ាស៊ីនស្វែងរក និងបណ្ដាញសង្គមអាន <head> របស់អ្នកមុនគេ។ <title> តែមួយគត់ (50–60 តួអក្សរ), <meta name="description"> ច្បាស់លាស់, <link rel="canonical"> និងស្លាក Open Graph (og:title, og:description, og:image) កំណត់រូបរាងតំណភ្ជាប់របស់អ្នកលើ Google និងកម្មវិធីជជែក។',
            'រចនាសម្ព័ន្ធ HTML ប៉ះពាល់ផ្ទាល់ដល់ Core Web Vitals៖ ផ្ដល់អាទិភាពដល់រូបភាពធំខាងលើដោយ fetchpriority="high" (LCP), កំណត់ width/height លើរូបភាព (CLS) និងប្រើ <script defer> ដើម្បីកុំឱ្យរាំងស្ទះការផ្ទុកទំព័រ (INP)។',
          ],
          points: [
            'ប្រើ <details> និង <summary> ដើមរបស់ HTML សម្រាប់ accordion ដែលងាយប្រើដោយមិនបាច់សរសេរ JavaScript។',
            'រក្សាកម្រិតកម្រិតពណ៌ (contrast) យ៉ាងតិច 4.5:1 សម្រាប់អត្ថបទធម្មតា និង 3:1 សម្រាប់អក្សរធំ (WCAG AA)។',
            'ដាក់ <h1> តែមួយដែលឆ្លុះបញ្ចាំងប្រធានបទទំព័រ ដើម្បីជួយទាំង SEO និងរចនាសម្ព័ន្ធកម្មវិធីអានអេក្រង់។',
          ],
          exampleTitle: 'Accordion ងាយស្រួលប្រើប្រាស់ និងស្លាក SEO ក្នុង <head>',
          tip: 'សាកល្បងទំព័ររបស់អ្នកជាមួយ Lighthouse ក្នុង Chrome DevTools (ផ្នែក Accessibility និង SEO) ហើយសាកចុច Tab ឆ្លងកាត់ប៊ូតុងទាំងអស់ដោយមិនប្រើកណ្ដុរ។',
        },
      ],
      challenge: {
        prompt:
          'សរសេររបាររុករកងាយស្រួលប្រើប្រាស់ក្នុង <nav aria-label="Primary"> ដែលមានតំណភ្ជាប់ពីរ (សម្គាល់តំណដំបូងដោយ aria-current="page") និងប៊ូតុងស្វែងរកមានតែរូបតំណាងដែលប្រើ aria-label="Search docs" ហើយលាក់ SVG ដោយ aria-hidden="true"។',
        hint: 'កំណត់ type="button" លើប៊ូតុងស្វែងរក និងដាក់ aria-hidden="true" ដោយផ្ទាល់លើស្លាក <svg>។',
      },
      quiz: [
        {
          question: 'តើវិធីមួយណាគោរពតាមច្បាប់ទីមួយនៃ ARIA សម្រាប់ប៊ូតុងសកម្មភាព?',
          options: [
            '<div role="button" tabindex="0" onclick="save()">Save</div>',
            '<span role="button" aria-clickable="true">Save</span>',
            '<button type="button">Save</button>',
            '<a href="#" role="button">Save</a>',
          ],
          answer: 2,
          explanation:
            '<button type="button"> ដើមរបស់ HTML ផ្ដល់ keyboard focus, ការចុច Enter/Space, ស្ថានភាព disabled និង role ដោយស្វ័យប្រវត្តិ។',
        },
        {
          question:
            'ហេតុអ្វីប៊ូតុងដែលមានតែរូបតំណាងត្រូវការ aria-label ហើយដាក់ aria-hidden="true" លើ <svg>?',
          options: [
            'ដើម្បីឱ្យ SVG បង្ហាញលឿនជាងមុនលើ GPU ទូរស័ព្ទ',
            'ដើម្បីឱ្យកម្មវិធីអានអេក្រង់អានឈ្មោះប៊ូតុងបានច្បាស់ ជំនួសឱ្យការអានកូដ SVG រញ៉េរញ៉ៃ',
            'ព្រោះកម្មវិធីរុករកលាក់ប៊ូតុងដែលមាន SVG ខាងក្នុង',
            'ដើម្បីបើក tooltip ពេលដាក់កណ្ដុរលើប៊ូតុង',
          ],
          answer: 1,
          explanation:
            'បើគ្មាន aria-label ទេ ប៊ូតុងរូបតំណាងគ្មានឈ្មោះសម្រាប់អ្នកអានអេក្រង់ឡើយ រីឯ aria-hidden="true" លាក់ក្រាហ្វិកតុបតែងចេញពី accessibility tree។',
        },
      ],
    },
  },

  // =========================================================================
  // CSS TRACK (7 Lessons)
  // =========================================================================

  'css/css-from-zero': {
    en: {
      duration: '10 min',
      objectives: [
        'Compare external stylesheets, internal <style> blocks, and inline style attributes—and know why external CSS wins.',
        'Choose the right CSS units (px, rem, em, %, ch) for typography, spacing, and container widths.',
        'Format colors with hex, rgb(), and hsl() while keeping body typography clean and readable.',
      ],
      extraSections: [
        {
          id: 'how-css-attaches-and-units',
          heading: 'Connecting Stylesheets & Everyday CSS Units',
          body: [
            'CSS can attach to HTML in three ways: an external file (<link rel="stylesheet" href="styles.css">), an internal <style> tag in <head>, or an inline style="..." attribute. Real projects overwhelmingly use external stylesheets because browsers cache them across pages and one edit updates the entire site.',
            'Picking the right unit makes your layout resilient. Use rem for font sizes and spacing so everything scales if a user increases their browser’s default font size; use px for crisp 1px borders; and use ch (character width) to cap body paragraphs around 60–65ch for effortless reading.',
          ],
          table: {
            headers: ['Unit', 'Relative To', 'Best Used For'],
            rows: [
              ['px', 'CSS pixel (fixed)', '1px hairlines, subtle shadows, and border-radius.'],
              [
                'rem',
                'Root <html> font-size (16px default)',
                'Font sizes, padding, margins, and scalable spacing.',
              ],
              [
                'em',
                'Current element’s font-size',
                'Icon spacing or button padding scaling with text size.',
              ],
              [
                '%',
                'Parent element’s dimension',
                'Fluid image widths (max-width: 100%) and column splits.',
              ],
              [
                'ch',
                'Width of the "0" glyph',
                'Readable line length (max-width: 65ch) on articles.',
              ],
            ],
          },
          warning:
            'Avoid setting font-size: 10px on <html> or overriding body text with tiny fixed px values—it overrides user accessibility font-size preferences in the browser.',
        },
        {
          id: 'colors-and-typography-basics',
          heading: 'Colors (Hex, RGB, HSL) & Readable Typography',
          body: [
            'Modern CSS supports hex (#2563eb), rgb(37 99 235 / 0.15), and hsl(221 83% 53%). HSL (Hue, Saturation, Lightness) is especially intuitive when designing UI states: keep the hue identical and lower lightness by 8% to create a natural hover shade.',
            'Great typography does 80% of the visual work on any web page. Pair a clean system font stack with generous body line-height (1.5–1.7), slightly tighter letter-spacing (-0.02em) on large headings, and a clear color contrast between primary ink and muted secondary text.',
          ],
          points: [
            'Use unitless line-height (e.g. line-height: 1.6 instead of 24px) so nested headings inherit proportional spacing.',
            'Prefer system-ui, -apple-system, sans-serif as a fast zero-download fallback font stack.',
            'Notice CSS ignores unrecognized properties silently—always check DevTools Styles tab for yellow warning icons on typos.',
          ],
          example: {
            title: 'Readable Typography & HSL Palette Card',
            language: 'css',
            code: `.article-card {
  max-width: 60ch;
  padding: 1.5rem;
  border: 1px solid hsl(240 6% 90%);
  border-radius: 12px;
  background: hsl(0 0% 100%);
}
.article-card h1 {
  font-size: 1.75rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: hsl(240 10% 10%);
}
.article-card p {
  line-height: 1.65;
  color: hsl(240 5% 34%);
}`,
            playground: {
              html: `<article class="article-card">
  <span class="eyebrow">CSS Basics</span>
  <h1>Typography sets the tone of your entire site</h1>
  <p>Keeping body copy near 60ch with a unitless line-height of 1.65 makes long tutorials effortless to scan on both phones and wide monitors.</p>
  <button class="btn">Read Next Lesson</button>
</article>`,
              css: `body { font-family: system-ui, -apple-system, sans-serif; padding: 20px; background: hsl(240 10% 97%); }
.article-card { max-width: 60ch; padding: 1.5rem; border: 1px solid hsl(240 6% 88%); border-radius: 14px; background: white; }
.eyebrow { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: hsl(221 83% 53%); }
h1 { margin: 0.4rem 0 0.75rem; font-size: 1.6rem; letter-spacing: -0.02em; line-height: 1.2; color: hsl(240 10% 10%); }
p { margin: 0 0 1.25rem; font-size: 0.95rem; line-height: 1.65; color: hsl(240 5% 36%); }
.btn { padding: 0.55rem 1rem; border: none; border-radius: 8px; background: hsl(221 83% 53%); color: white; font-weight: 600; cursor: pointer; }
.btn:hover { background: hsl(221 83% 45%); }`,
              js: '',
            },
          },
          tip: 'Open Browser DevTools (F12) and inspect any element to toggle individual CSS declarations on and off live without editing your source file.',
        },
      ],
      challenge: {
        prompt:
          'Write CSS rules for a .notice card using rem units: set max-width to 55ch, padding to 1.25rem, a 1px solid border, rounded corners of 10px, a dark heading with letter-spacing: -0.02em, and body text with unitless line-height: 1.6.',
        hint: 'Use rem for padding and font-size, ch for max-width, and keep line-height unitless.',
        language: 'css',
        solutionCode: `.notice {
  max-width: 55ch;
  padding: 1.25rem;
  border: 1px solid hsl(240 6% 88%);
  border-radius: 10px;
  background: #ffffff;
}

.notice h2 {
  font-size: 1.25rem;
  letter-spacing: -0.02em;
  color: #18181b;
  margin-bottom: 0.5rem;
}

.notice p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #52525b;
}`,
      },
      quiz: [
        {
          question: 'Why is rem generally preferred over px for font-size in modern CSS?',
          options: [
            'px is deprecated in CSS3',
            'rem scales automatically when a user changes their browser’s default font size for accessibility',
            'rem renders sharper text on Retina screens',
            'px cannot be used inside media queries',
          ],
          answer: 1,
          explanation:
            'Because 1rem equals the root browser font size (usually 16px, or larger if the user prefers larger text), rem preserves user accessibility settings across the entire UI.',
        },
        {
          question: 'What advantage does a unitless line-height: 1.6 have over line-height: 24px?',
          options: [
            'It locks every heading and paragraph to 24px tall',
            'It disables line wrapping on narrow screens',
            'Child elements with larger or smaller font sizes inherit the 1.6 multiplier proportionally instead of colliding lines',
            'It is the only syntax supported by mobile Safari',
          ],
          answer: 2,
          explanation:
            'A fixed line-height like 24px inherits literally, causing a 36px child heading to overlap its own lines; unitless 1.6 multiplies cleanly against each element’s font-size.',
        },
      ],
    },
    km: {
      duration: '10 នាទី',
      objectives: [
        'ប្រៀបធៀប external stylesheet, <style> ខាងក្នុង និង inline style—ហើយយល់មូលហេតុដែល external CSS ល្អបំផុត។',
        'ជ្រើសរើសខ្នាត CSS ត្រឹមត្រូវ (px, rem, em, %, ch) សម្រាប់អក្សរ ចន្លោះ និងទទឹងប្រអប់។',
        'ប្រើពណ៌ជាទម្រង់ hex, rgb() និង hsl() រួមជាមួយការរៀបអក្សរដែលងាយអាន។',
      ],
      extraSections: [
        {
          id: 'how-css-attaches-and-units',
          heading: 'ការភ្ជាប់ Stylesheet និងខ្នាត CSS ប្រើប្រាស់ប្រចាំថ្ងៃ',
          body: [
            'CSS អាចភ្ជាប់ទៅ HTML បានបីរបៀប៖ ឯកសារខាងក្រៅ (<link rel="stylesheet" href="styles.css">), ស្លាក <style> ក្នុង <head> ឬគុណលក្ខណៈ style="..."។ គម្រោងពិតប្រាកដប្រើឯកសារខាងក្រៅ ព្រោះកម្មវិធីរុករកអាចរក្សាទុកក្នុង cache ហើយកែម្ដងប៉ះពាល់ទូទាំងគេហទំព័រ។',
            'ការជ្រើសរើសខ្នាតត្រឹមត្រូវធ្វើឱ្យប្លង់មានភាពបត់បែន។ ប្រើ rem សម្រាប់ទំហំអក្សរ និងចន្លោះដើម្បីឱ្យវាពង្រីកតាមការកំណត់អ្នកប្រើ ប្រើ px សម្រាប់ស៊ុម 1px និងប្រើ ch ដើម្បីកំណត់ប្រវែងជួរអត្ថបទត្រឹម 60–65ch ងាយស្រួលអាន។',
          ],
          table: {
            headers: ['ខ្នាត (Unit)', 'យោងតាម', 'ស័ក្តិសមបំផុតសម្រាប់'],
            rows: [
              ['px', 'ភីកសែលថេរ', 'ស៊ុម 1px ស្រមោលស្រាល និង border-radius។'],
              [
                'rem',
                'ទំហំអក្សរ <html> (លំនាំដើម 16px)',
                'ទំហំអក្សរ padding, margin និងគម្លាតប្លង់។',
              ],
              [
                'em',
                'ទំហំអក្សរនៃធាតុបច្ចុប្បន្ន',
                'គម្លាតរូបតំណាង ឬ padding ប៊ូតុងដែលប្រែតាមអក្សរ។',
              ],
              ['%', 'ទំហំធាតុមេ', 'ទទឹងរូបភាពឆ្លើយតប (max-width: 100%) និងជួរឈរ។'],
              ['ch', 'ទទឹងតួអក្សរ "0"', 'កម្រិតប្រវែងជួរអត្ថបទងាយអាន (max-width: 65ch)។'],
            ],
          },
          warning:
            'ជៀសវាងការកំណត់ font-size: 10px លើ <html> ឬប្រើ px តូចពេកលើអត្ថបទ ព្រោះវាបិទការកំណត់ទំហំអក្សរសម្រាប់ភាពងាយស្រួលអានរបស់អ្នកប្រើក្នុងកម្មវិធីរុករក។',
        },
        {
          id: 'colors-and-typography-basics',
          heading: 'ពណ៌ (Hex, RGB, HSL) និងការរៀបអក្សរងាយអាន',
          body: [
            'CSS ទំនើបគាំទ្រ hex (#2563eb), rgb(37 99 235 / 0.15) និង hsl(221 83% 53%)។ ទម្រង់ HSL (Hue, Saturation, Lightness) ងាយស្រួលប្រើខ្លាំងសម្រាប់រចនាស្ថានភាព UI៖ រក្សា Hue ដដែល ហើយបន្ថយ Lightness 8% ដើម្បីបានពណ៌ hover ដ៏សមរម្យ។',
            'ការរៀបអក្សរល្អជួយលើកសម្រស់គេហទំព័រដល់ទៅ 80%។ ប្រើ system font stack ជាមួយ line-height សមរម្យ (1.5–1.7), បង្រួម letter-spacing បន្តិច (-0.02em) លើចំណងជើងធំ និងបង្កើតកម្រិតពណ៌ច្បាស់រវាងអត្ថបទចម្បង និងអត្ថបទបន្ទាប់បន្សំ។',
          ],
          points: [
            'ប្រើ line-height គ្មានខ្នាត (ឧ. line-height: 1.6 ជំនួសឱ្យ 24px) ដើម្បីឱ្យធាតុកូនទទួលសមាមាត្រកម្ពស់ជួរត្រឹមត្រូវ។',
            'ប្រើ system-ui, -apple-system, sans-serif ជាពុម្ពអក្សរលឿនដោយមិនបាច់ទាញយកបន្ថែម។',
            'CSS រំលងលក្ខណៈសម្បត្តិដែលសរសេរខុសដោយស្ងៀមស្ងាត់—ពិនិត្យផ្ទាំង Styles ក្នុង DevTools ជានិច្ចដើម្បីរកកំហុសអក្ខរាវិរុទ្ធ។',
          ],
          exampleTitle: 'កាតអត្ថបទងាយអាន និងពណ៌ HSL',
          tip: 'បើក Browser DevTools (F12) ហើយចុច Inspect លើធាតុណាមួយ ដើម្បីបើក/បិទស្ទីល CSS សាកល្បងផ្ទាល់ភ្លាមៗ។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរច្បាប់ CSS សម្រាប់កាត .notice ដោយប្រើខ្នាត rem៖ កំណត់ max-width ជា 55ch, padding 1.25rem, ស៊ុម 1px solid, ជ្រុងមូល 10px, ចំណងជើងពណ៌ងងឹតមាន letter-spacing: -0.02em និងកថាខណ្ឌមាន line-height: 1.6 គ្មានខ្នាត។',
        hint: 'ប្រើ rem សម្រាប់ padding និង font-size, ប្រើ ch សម្រាប់ max-width និងរក្សា line-height គ្មានខ្នាត។',
      },
      quiz: [
        {
          question: 'ហេតុអ្វីបានជា rem ត្រូវបានពេញនិយមជាង px សម្រាប់ font-size ក្នុង CSS ទំនើប?',
          options: [
            'ព្រោះ px លែងប្រើក្នុង CSS3 ហើយ',
            'ព្រោះ rem ពង្រីក/បង្រួមដោយស្វ័យប្រវត្តិពេលអ្នកប្រើប្ដូរទំហំអក្សរលំនាំដើមក្នុងកម្មវិធីរុករក',
            'ព្រោះ rem បង្ហាញអក្សរច្បាស់ជាងលើអេក្រង់ Retina',
            'ព្រោះ px មិនអាចប្រើក្នុង media query បានទេ',
          ],
          answer: 1,
          explanation:
            'ដោយសារ 1rem ស្មើនឹងទំហំអក្សរឫសរបស់កម្មវិធីរុករក ការប្រើ rem គោរពតាមការកំណត់ភាពងាយស្រួលអានរបស់អ្នកប្រើទូទាំងគេហទំព័រ។',
        },
        {
          question: 'តើ line-height: 1.6 គ្មានខ្នាតមានគុណសម្បត្តិអ្វីលើសពី line-height: 24px?',
          options: [
            'វាចាក់សោគ្រប់ចំណងជើង និងកថាខណ្ឌឱ្យមានកម្ពស់ 24px ដូចគ្នា',
            'វាបិទការបំបែកជួរអត្ថបទលើអេក្រង់តូច',
            'ធាតុកូនដែលមានទំហំអក្សរធំ ឬតូចជាងទទួលយកមេគុណ 1.6 តាមសមាមាត្រដោយមិនត្រួតជួរគ្នា',
            'វាជាទម្រង់តែមួយគត់ដែល Safari គាំទ្រ',
          ],
          answer: 2,
          explanation:
            'line-height ជាលេខថេរដូច 24px ត្រូវបានស្នងត្រង់ៗ ដែលអាចធ្វើឱ្យចំណងជើង 36px ត្រួតជួរគ្នា; ចំណែក 1.6 គុណតាមទំហំអក្សរនៃធាតុនីមួយៗ។',
        },
      ],
    },
  },

  'css/selectors-and-specificity': {
    en: {
      duration: '12 min',
      objectives: [
        'Target elements precisely with combinators (> + ~), attribute selectors, pseudo-classes, and pseudo-elements.',
        'Calculate CSS specificity tuples (ID, Class/Attr/Pseudo-class, Element) accurately to debug overriding rules.',
        'Keep stylesheets maintainable using low-specificity selectors, :where(), and CSS Cascade Layers (@layer).',
      ],
      extraSections: [
        {
          id: 'combinators-and-pseudo-selectors',
          heading: 'Combinators, Attribute Selectors & Pseudo-Elements',
          body: [
            'Combinators express relationships in the DOM tree: a space (.card p) selects any descendant, > (.nav > li) targets direct children only, + (h2 + p) targets the immediately following sibling, and ~ selects all subsequent siblings. Direct child selectors (>) prevent styles from accidentally leaking into deeply nested components.',
            'Attribute selectors like input[type="email"] or a[href^="https"] let you style elements by HTML state without adding redundant classes. Pseudo-elements (::before, ::after, ::placeholder) style virtual parts of an element, while pseudo-classes (:hover, :focus-visible, :nth-child(2n), :has()) style dynamic state.',
          ],
          points: [
            'Always pair :focus-visible (keyboard focus) instead of removing outline on :focus, keeping mouse clicks clean and keyboard users safe.',
            'Modern :has() lets a parent react to its children—for example, .field:has(input:invalid) highlights the entire wrapper.',
            'Double colons (::before) denote pseudo-elements; single colons (:hover) denote pseudo-classes.',
          ],
          table: {
            headers: ['Selector', 'Specificity', 'What It Matches'],
            rows: [
              ['p / ::before', '(0, 0, 1)', 'Element type or pseudo-element.'],
              [
                '.btn / [disabled] / :hover',
                '(0, 1, 0)',
                'Class, attribute selector, or pseudo-class.',
              ],
              ['.card > h2', '(0, 1, 1)', 'Direct <h2> child inside .card.'],
              ['#main-nav a', '(1, 0, 1)', 'Any <a> inside #main-nav (high specificity!).'],
              [':where(.card h2)', '(0, 0, 0)', 'Zero-specificity wrapper for easy overrides.'],
            ],
          },
          tip: 'Hover over any selector in VS Code to see its exact (ID, Class, Element) specificity score right inside the tooltip.',
        },
        {
          id: 'cascade-specificity-layers',
          heading: 'Specificity Math, Inheritance & @layer',
          body: [
            'When two rules target the same property on one element, the browser resolves the conflict using the Cascade in order: Importance (!important), Origin & Cascade Layers (@layer), Specificity score (ID > Class > Element), and finally Source Order (the last rule wins on a tie).',
            'Notice that specificity is compared column-by-column, never carried over like base-10 numbers: one ID selector (1, 0, 0) always beats eleven chained class selectors (0, 11, 0). To avoid specificity wars in large apps, stick to single-class selectors and group resets/utilities with @layer base, components, utilities.',
          ],
          example: {
            title: 'Specificity Comparison & Zero-Specificity :where()',
            language: 'css',
            code: `@layer base, components;

@layer base {
  /* Easily overridden by any rule in @layer components */
  :where(button) {
    background: #e4e4e7;
    color: #18181b;
  }
}

@layer components {
  .btn { background: #18181b; color: white; }
  .btn.primary { background: #2563eb; }
}`,
            playground: {
              html: `<div class="stack">
  <button class="btn">Default .btn (0,1,0)</button>
  <button class="btn primary">Override .btn.primary (0,2,0)</button>
  <button id="special" class="btn primary">ID #special (1,0,0) wins</button>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; }
.stack { display: flex; flex-wrap: wrap; gap: 10px; }
:where(button) { padding: 9px 14px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
#special { background: #059669; color: white; }
.btn.primary { background: #2563eb; color: white; }
.btn { background: #18181b; color: white; }`,
              js: '',
            },
          },
          warning:
            'Resist reaching for !important to "fix" a style that is not applying. Using !important creates an arms race where every future override also needs !important—fix the selector specificity instead.',
        },
      ],
      challenge: {
        prompt:
          'Write CSS rules for a .menu list so that: (1) direct child links (.menu > li > a) are dark gray, (2) any link with [aria-current="page"] turns blue and bold, and (3) every item after the first (.menu > li + li) gets a 1px top border.',
        hint: 'Use the direct child combinator (>), attribute selector ([aria-current="page"]), and adjacent sibling combinator (+).',
        language: 'css',
        solutionCode: `.menu > li > a {
  color: #3f3f46;
  text-decoration: none;
}

.menu a[aria-current="page"] {
  color: #2563eb;
  font-weight: 600;
}

.menu > li + li {
  border-top: 1px solid #e4e4e7;
}`,
      },
      quiz: [
        {
          question:
            'Which selector wins if all four apply to the same <a id="cta" class="btn primary"> element?',
          options: [
            'a.btn.primary.active (0, 3, 1)',
            '#cta (1, 0, 0)',
            'nav ul li a.btn (0, 1, 4)',
            ':where(#cta) (0, 0, 0)',
          ],
          answer: 1,
          explanation:
            'Specificity compares IDs first, then classes/attributes/pseudo-classes, then elements. A single ID (1, 0, 0) beats any number of classes or elements, while :where() always contributes 0.',
        },
        {
          question: 'What does the selector h2 + p target?',
          options: [
            'All <p> tags anywhere inside an <h2>',
            'Every <p> tag that appears anywhere after an <h2>',
            'Only a <p> element that immediately follows an <h2> as the very next sibling',
            'Both <h2> and <p> elements together',
          ],
          answer: 2,
          explanation:
            'The adjacent sibling combinator (+) matches only the immediately following sibling element; ~ matches all following siblings, and a comma (,) groups separate selectors.',
        },
      ],
    },
    km: {
      duration: '12 នាទី',
      objectives: [
        'កំណត់គោលដៅធាតុយ៉ាងជាក់លាក់ដោយប្រើ combinators (> + ~), attribute selectors, pseudo-classes និង pseudo-elements។',
        'គណនាពិន្ទុ specificity (ID, Class/Attr/Pseudo-class, Element) បានត្រឹមត្រូវដើម្បីដោះស្រាយបញ្ហាស្ទីលជាន់គ្នា។',
        'រក្សាកូដ CSS ឱ្យងាយថែទាំដោយប្រើ specificity ទាប, :where() និង CSS Cascade Layers (@layer)។',
      ],
      extraSections: [
        {
          id: 'combinators-and-pseudo-selectors',
          heading: 'Combinators, Attribute Selectors និង Pseudo-Elements',
          body: [
            'Combinators បង្ហាញទំនាក់ទំនងក្នុង DOM៖ ដកឃ្លា (.card p) ជ្រើសកូនចៅទាំងអស់, > (.nav > li) ជ្រើសតែកូនផ្ទាល់, + (h2 + p) ជ្រើសបងប្អូនជាប់បន្ទាប់ភ្លាមៗ និង ~ ជ្រើសបងប្អូនបន្ទាប់ទាំងអស់។ ការប្រើ > ការពារកុំឱ្យស្ទីលហៀរចូលធាតុខាងក្នុងជ្រៅៗដោយអចេតនា។',
            'Attribute selectors ដូចជា input[type="email"] ឬ a[href^="https"] អនុញ្ញាតឱ្យកំណត់ស្ទីលតាមស្ថានភាព HTML ដោយមិនបាច់បន្ថែម class ច្រើន។ Pseudo-elements (::before, ::after) កំណត់ស្ទីលផ្នែកនិម្មិត ចំណែក pseudo-classes (:hover, :focus-visible, :has()) កំណត់ស្ទីលតាមស្ថានភាពអន្តរកម្ម។',
          ],
          points: [
            'ប្រើ :focus-visible សម្រាប់ស៊ុម focus តាមក្ដារចុច ជំនួសឱ្យការលុប outline ទាំងស្រុងលើ :focus។',
            ':has() ទំនើបអនុញ្ញាតឱ្យធាតុមេប្រែប្រួលតាមធាតុកូន—ឧទាហរណ៍ .field:has(input:invalid)។',
            'សញ្ញាចុចពីរពីរដង (::before) ជា pseudo-element ចំណែកមួយដង (:hover) ជា pseudo-class។',
          ],
          table: {
            headers: ['Selector', 'ពិន្ទុ Specificity', 'អ្វីដែលវាជ្រើស'],
            rows: [
              ['p / ::before', '(0, 0, 1)', 'ប្រភេទធាតុ ឬ pseudo-element។'],
              [
                '.btn / [disabled] / :hover',
                '(0, 1, 0)',
                'Class, attribute selector ឬ pseudo-class។',
              ],
              ['.card > h2', '(0, 1, 1)', '<h2> ដែលជាកូនផ្ទាល់ក្នុង .card។'],
              ['#main-nav a', '(1, 0, 1)', '<a> ណាមួយក្នុង #main-nav (specificity ខ្ពស់!)។'],
              [':where(.card h2)', '(0, 0, 0)', 'សូន្យ specificity ងាយស្រួលបំពានស្ទីលនៅពេលក្រោយ។'],
            ],
          },
          tip: 'ដាក់កណ្ដុរលើ selector ណាមួយក្នុង VS Code ដើម្បីមើលពិន្ទុ specificity (ID, Class, Element) របស់វាភ្លាមៗ។',
        },
        {
          id: 'cascade-specificity-layers',
          heading: 'ការគណនា Specificity, ការស្នង (Inheritance) និង @layer',
          body: [
            'នៅពេលច្បាប់ពីរកំណត់លក្ខណៈសម្បត្តិដូចគ្នាលើធាតុតែមួយ កម្មវិធីរុករកសម្រេចតាមលំដាប់ Cascade៖ Importance (!important), Origin និង @layer, ពិន្ទុ Specificity (ID > Class > Element) និងចុងក្រោយលំដាប់សរសេរ (ច្បាប់ក្រោយឈ្នះបើស្មើគ្នា)។',
            'សូមចំណាំថា specificity ប្រៀបធៀបតាមជួរឈរ មិនមែនបូកបញ្ចូលគ្នាដូចលេខធម្មតាទេ៖ ID តែមួយ (1, 0, 0) តែងតែឈ្នះ class ដប់មួយតគ្នា (0, 11, 0)។ ដើម្បីជៀសវាងជម្លោះស្ទីលក្នុងគម្រោងធំ គួរប្រើ single-class និងរៀបចំដោយ @layer base, components, utilities។',
          ],
          exampleTitle: 'ការប្រៀបធៀប Specificity និង :where() សូន្យ specificity',
          warning:
            'ជៀសវាងការប្រើ !important ដើម្បី "ជួសជុល" ស្ទីលដែលមិនដំណើរការ។ ការប្រើ !important ធ្វើឱ្យរាល់ការកែពេលក្រោយត្រូវប្រើ !important ដែរ—គួរកែ specificity នៃ selector វិញ។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរច្បាប់ CSS សម្រាប់បញ្ជី .menu ដើម្បីឱ្យ៖ (1) តំណភ្ជាប់កូនផ្ទាល់ (.menu > li > a) មានពណ៌ប្រផេះងងឹត, (2) តំណភ្ជាប់ដែលមាន [aria-current="page"] ប្ដូរជាពណ៌ខៀវ និងដិត និង (3) គ្រប់ធាតុបន្ទាប់ពីធាតុដំបូង (.menu > li + li) មានស៊ុមខាងលើ 1px។',
        hint: 'ប្រើ direct child combinator (>), attribute selector ([aria-current="page"]) និង adjacent sibling combinator (+)។',
      },
      quiz: [
        {
          question:
            'តើ selector មួយណាឈ្នះ ប្រសិនបើទាំងបួនត្រូវគ្នានឹង <a id="cta" class="btn primary"> តែមួយ?',
          options: [
            'a.btn.primary.active (0, 3, 1)',
            '#cta (1, 0, 0)',
            'nav ul li a.btn (0, 1, 4)',
            ':where(#cta) (0, 0, 0)',
          ],
          answer: 1,
          explanation:
            'Specificity ប្រៀបធៀប ID មុន បន្ទាប់មក class/attribute/pseudo-class រួចធាតុ។ ID មួយ (1, 0, 0) ឈ្នះ class ឬធាតុច្រើនណាក៏ដោយ រីឯ :where() តែងតែស្មើ 0។',
        },
        {
          question: 'តើ selector h2 + p កំណត់គោលដៅលើអ្វី?',
          options: [
            'គ្រប់ <p> ដែលនៅខាងក្នុង <h2>',
            'គ្រប់ <p> ដែលនៅខាងក្រោយ <h2> ទាំងអស់',
            'មានតែធាតុ <p> ដែលនៅជាប់បន្ទាប់ពី <h2> ភ្លាមៗជាបងប្អូននឹងគ្នា',
            'ទាំងធាតុ <h2> និង <p> ជាមួយគ្នា',
          ],
          answer: 2,
          explanation:
            'Combinator + ជ្រើសតែបងប្អូនដែលនៅជាប់បន្ទាប់ភ្លាមៗប៉ុណ្ណោះ ចំណែក ~ ជ្រើសបងប្អូនបន្ទាប់ទាំងអស់។',
        },
      ],
    },
  },

  'css/box-model': {
    en: {
      duration: '11 min',
      objectives: [
        'Predict exact rendered element dimensions under content-box vs border-box.',
        'Explain vertical margin collapsing, inline vs inline-block sizing, and overflow clipping.',
        'Use modern CSS logical properties (padding-inline, margin-block) and outline without shifting layout.',
      ],
      extraSections: [
        {
          id: 'margin-collapse-and-overflow',
          heading: 'Margin Collapsing, Display Modes & Overflow',
          body: [
            'Two behaviors trip up almost every CSS beginner: vertical margin collapsing and inline sizing. When two stacked block elements have margin-bottom: 24px and margin-top: 16px, their margins do not add to 40px—they collapse to the larger value (24px). Flex and Grid containers disable margin collapsing between their children, which is one reason gap feels so predictable.',
            'Inline elements like <span> ignore width, height, and vertical margins (margin-top/bottom). Switch to display: inline-block (or display: inline-flex) when an inline pill or button needs explicit vertical spacing. Likewise, avoid setting fixed height on text containers—use min-height and manage constrained panes with overflow: auto.',
          ],
          table: {
            headers: ['Property / Value', 'Behavior', 'When To Use'],
            rows: [
              [
                'box-sizing: border-box',
                'width includes padding & border',
                'Global reset on *, *::before, *::after.',
              ],
              [
                'display: inline-block',
                'Flows inline, accepts width/height',
                'Badges, inline buttons, and icon chips.',
              ],
              [
                'overflow: hidden / clip',
                'Cuts overflowing children',
                'Rounding image corners or clipping decorative blur.',
              ],
              [
                'overflow-x: auto',
                'Adds horizontal scrollbar only when needed',
                'Wide data tables and code blocks on mobile.',
              ],
              [
                'outline: 2px solid ...',
                'Draws outside border without changing box size',
                'Focus rings that never cause layout jitter.',
              ],
            ],
          },
          warning:
            'Putting overflow: hidden on an ancestor breaks position: sticky inside it! If you only need to clip overflowing visuals without breaking sticky headers, use overflow: clip instead.',
        },
        {
          id: 'centering-spacing-and-shadows',
          heading: 'Logical Properties & Visual Border-Box Comparison',
          body: [
            'Modern CSS favors logical properties like padding-inline (left + right in horizontal languages), padding-block (top + bottom), and margin-inline: auto for horizontal centering. Logical properties are shorter to write than four-value shorthands and automatically adapt for right-to-left (RTL) locales.',
            'Notice how outline and box-shadow sit outside the box model and take zero layout space, whereas adding a 2px border on :hover shifts adjacent elements by 2px unless you reserve a transparent border upfront.',
          ],
          points: [
            'Center any block container horizontally with max-width: 720px; margin-inline: auto;.',
            'Reserve border: 2px solid transparent in the resting state if a card gains a colored border on hover, avoiding layout shift.',
            'Use gap inside Flex/Grid containers instead of juggling margin-right and :last-child resets.',
          ],
          example: {
            title: 'content-box vs border-box Live Comparison',
            language: 'css',
            code: `.box {
  width: 240px;
  padding: 20px;
  border: 4px solid #2563eb;
}
.content-box { box-sizing: content-box; } /* Total = 288px! */
.border-box  { box-sizing: border-box; }  /* Total = 240px */`,
            playground: {
              html: `<div class="ruler">240px reference width</div>
<div class="box content-box"><strong>content-box</strong>: renders 288px wide (240 + 40 padding + 8 border)</div>
<div class="box border-box"><strong>border-box</strong>: stays exactly 240px wide!</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; display: grid; gap: 12px; }
.ruler { width: 240px; padding-block: 4px; background: #18181b; color: white; font-size: 12px; text-align: center; border-radius: 6px; }
.box { width: 240px; padding: 20px; border: 4px solid #2563eb; border-radius: 10px; font-size: 13px; line-height: 1.5; background: #eff6ff; }
.content-box { box-sizing: content-box; border-color: #dc2626; background: #fef2f2; }
.border-box { box-sizing: border-box; }`,
              js: '',
            },
          },
          tip: 'Use the Box Model diagram at the bottom of DevTools Computed tab to inspect exact pixel values of content, padding, border, and margin on any element.',
        },
      ],
      challenge: {
        prompt:
          'Write CSS for a centered .container (max-width: 680px, horizontally centered with margin-inline: auto, horizontal padding of 1.5rem using padding-inline) and a .card inside it using box-sizing: border-box, 1rem padding, and a focus outline that does not shift layout.',
        hint: 'Use margin-inline: auto for horizontal centering and padding-inline: 1.5rem for left/right padding.',
        language: 'css',
        solutionCode: `*, *::before, *::after {
  box-sizing: border-box;
}

.container {
  max-width: 680px;
  margin-inline: auto;
  padding-inline: 1.5rem;
}

.card {
  padding: 1rem;
  border: 1px solid #e4e4e7;
  border-radius: 12px;
}

.card:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}`,
      },
      quiz: [
        {
          question:
            'An element has box-sizing: content-box, width: 200px, padding: 16px, and border: 2px solid black. What is its total rendered width?',
          options: ['200px', '218px', '232px', '236px'],
          answer: 3,
          explanation:
            'Under content-box, padding and border add to both left and right sides: 200 + (16 × 2) + (2 × 2) = 236px.',
        },
        {
          question:
            'Two stacked <p> elements have margin-bottom: 20px (top) and margin-top: 12px (bottom) inside a normal block <div>. What is the vertical space between them?',
          options: ['32px', '20px', '12px', '8px'],
          answer: 1,
          explanation:
            'Adjacent vertical margins in normal block flow collapse to the larger of the two values (max(20px, 12px) = 20px).',
        },
      ],
    },
    km: {
      duration: '11 នាទី',
      objectives: [
        'គណនាទំហំបង្ហាញពិតប្រាកដនៃធាតុក្រោម content-box និង border-box។',
        'ពន្យល់ពីការរួមបញ្ចូល margin បញ្ឈរ (margin collapsing), ភាពខុសគ្នារវាង inline និង inline-block និង overflow។',
        'ប្រើ CSS logical properties (padding-inline, margin-block) និង outline ដោយមិនធ្វើឱ្យប្លង់លោត។',
      ],
      extraSections: [
        {
          id: 'margin-collapse-and-overflow',
          heading: 'ការរួមបញ្ចូល Margin, ម៉ូដ Display និង Overflow',
          body: [
            'អាកប្បកិរិយាពីរដែលតែងតែធ្វើឱ្យអ្នកចាប់ផ្ដើម CSS ភាន់ច្រឡំគឺ margin collapsing បញ្ឈរ និងទំហំធាតុ inline។ ពេលធាតុ block ពីរតម្រៀបលើគ្នាមាន margin-bottom: 24px និង margin-top: 16px គម្លាតរបស់វាមិនបូកឡើង 40px ទេ—វារួមមកត្រឹមតម្លៃធំជាងគេ (24px)។ ប្រអប់ Flex និង Grid មិនមាន margin collapse ទេ ដែលធ្វើឱ្យ gap ងាយស្មានជាង។',
            'ធាតុ inline ដូចជា <span> មិនទទួលយក width, height ឬ margin ខាងលើ/ក្រោមឡើយ។ ប្ដូរទៅ display: inline-block (ឬ inline-flex) នៅពេលត្រូវការកំណត់កម្ពស់ ឬគម្លាតបញ្ឈរ។ ជៀសវាងកំណត់ height ថេរលើប្រអប់អត្ថបទ—ប្រើ min-height ជំនួសវិញ។',
          ],
          table: {
            headers: ['លក្ខណៈសម្បត្តិ / តម្លៃ', 'ឥរិយាបថ', 'ពេលណាគួរប្រើ'],
            rows: [
              [
                'box-sizing: border-box',
                'width រាប់បញ្ចូល padding និង border',
                'កំណត់ទូទាំងគេហទំព័រលើ *, *::before, *::after។',
              ],
              [
                'display: inline-block',
                'រៀបក្នុងជួរ តែទទួល width/height',
                'ស្លាក badge ប៊ូតុងក្នុងជួរ និង chip រូបតំណាង។',
              ],
              [
                'overflow: hidden / clip',
                'កាត់ផ្នែកកូនដែលហៀរចេញក្រៅ',
                'ធ្វើជ្រុងរូបភាពមូល ឬកាត់ផ្ទៃតុបតែង។',
              ],
              [
                'overflow-x: auto',
                'បង្ហាញរបាររំកិលផ្ដេកតែពេលចាំបាច់',
                'តារាងទិន្នន័យធំៗ និងប្លុកកូដលើទូរស័ព្ទ។',
              ],
              [
                'outline: 2px solid ...',
                'គូរក្រៅស៊ុមដោយមិនប្ដូរទំហំប្រអប់',
                'ស៊ុម focus ដែលមិនធ្វើឱ្យប្លង់លោត។',
              ],
            ],
          },
          warning:
            'ការដាក់ overflow: hidden លើធាតុមេធ្វើឱ្យ position: sticky ខាងក្នុងលែងដំណើរការ! បើគ្រាន់តែចង់កាត់ផ្នែកហៀរចេញ សូមប្រើ overflow: clip ជំនួសវិញ។',
        },
        {
          id: 'centering-spacing-and-shadows',
          heading: 'Logical Properties និងការប្រៀបធៀប Border-Box ផ្ទាល់',
          body: [
            'CSS ទំនើបនិយមប្រើ logical properties ដូចជា padding-inline (ឆ្វេង+ស្ដាំ), padding-block (លើ+ក្រោម) និង margin-inline: auto សម្រាប់ដាក់ប្រអប់ចំកណ្ដាលផ្ដេក។ វាខ្លីងាយអាន និងបត់បែនដោយស្វ័យប្រវត្តិសម្រាប់ភាសា RTL។',
            'សូមចំណាំថា outline និង box-shadow ស្ថិតនៅក្រៅ box model ដោយមិនយកទំហំប្លង់ទេ ចំណែកការបន្ថែម border 2px ពេល :hover នឹងរុញធាតុជិតខាងបើអ្នកមិនទុក border: 2px solid transparent ជាមុន។',
          ],
          points: [
            'ដាក់ប្រអប់ block ចំកណ្ដាលផ្ដេកដោយ max-width: 720px; margin-inline: auto;។',
            'ដាក់ border: 2px solid transparent ជាស្រេច បើចង់ឱ្យកាតបង្ហាញស៊ុមពណ៌ពេល hover ដោយមិនលោតប្លង់។',
            'ប្រើ gap ក្នុង Flex/Grid ជំនួសឱ្យការប្រើ margin-right និងលុបលើ :last-child។',
          ],
          exampleTitle: 'ប្រៀបធៀប content-box និង border-box ផ្ទាល់',
          tip: 'ប្រើដ្យាក្រាម Box Model នៅផ្នែកខាងក្រោមនៃផ្ទាំង Computed ក្នុង DevTools ដើម្បីមើលតម្លៃភីកសែលពិតនៃ content, padding, border និង margin។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ CSS សម្រាប់ .container ចំកណ្ដាល (max-width: 680px, margin-inline: auto, padding-inline: 1.5rem) និង .card ខាងក្នុងដែលប្រើ box-sizing: border-box, padding 1rem និងស៊ុម :focus-visible ដោយ outline ដែលមិនធ្វើឱ្យប្លង់លោត។',
        hint: 'ប្រើ margin-inline: auto សម្រាប់តម្រឹមកណ្ដាលផ្ដេក និង padding-inline: 1.5rem សម្រាប់គម្លាតឆ្វេង-ស្ដាំ។',
      },
      quiz: [
        {
          question:
            'ធាតុមួយមាន box-sizing: content-box, width: 200px, padding: 16px និង border: 2px solid black។ តើទទឹងបង្ហាញសរុបប៉ុន្មាន?',
          options: ['200px', '218px', '232px', '236px'],
          answer: 3,
          explanation:
            'ក្រោម content-box ទាំង padding និង border បូកបន្ថែមទាំងឆ្វេង និងស្ដាំ៖ 200 + (16 × 2) + (2 × 2) = 236px។',
        },
        {
          question:
            'ធាតុ <p> ពីរតម្រៀបលើគ្នាមាន margin-bottom: 20px (ខាងលើ) និង margin-top: 12px (ខាងក្រោម) ក្នុង <div> ធម្មតា។ តើចន្លោះបញ្ឈររវាងវាប៉ុន្មាន?',
          options: ['32px', '20px', '12px', '8px'],
          answer: 1,
          explanation:
            'Margin បញ្ឈរជាប់គ្នាក្នុងលំហូរ block ធម្មតារួមបញ្ចូលមកត្រឹមតម្លៃធំជាងគេ (max(20px, 12px) = 20px)។',
        },
      ],
    },
  },

  'css/flexbox': {
    en: {
      duration: '12 min',
      objectives: [
        'Control how flex items grow, shrink, and size with the flex shorthand (flex-grow, flex-shrink, flex-basis).',
        'Prevent squished icons and overflowing text in flex rows using flex-shrink: 0 and min-width: 0.',
        'Build real-world UI patterns: split headers, wrapped tag clouds, and equal-height cards with bottom-aligned CTAs.',
      ],
      extraSections: [
        {
          id: 'flex-grow-shrink-basis',
          heading: 'Mastering flex-grow, flex-shrink & Wrapping',
          body: [
            'When you set display: flex on a container, its direct children become flex items with default flex: 0 1 auto—they do not grow, they can shrink to prevent overflow, and they start from their content width. Adding flex-wrap: wrap allows items to flow onto new rows on narrow screens instead of squishing endlessly.',
            'Understanding the flex shorthand unlocks almost every layout: flex: 1 (same as 1 1 0%) divides available space equally, while flex: none (0 0 auto) locks an item at its natural size. When flex-direction flips to column, remember the axes swap too: justify-content now aligns vertically and align-items aligns horizontally.',
          ],
          table: {
            headers: ['Property', 'Applies To', 'Effect'],
            rows: [
              [
                'flex-direction: row | column',
                'Container',
                'Sets main axis direction (horizontal vs vertical).',
              ],
              [
                'flex-wrap: wrap',
                'Container',
                'Lets overflowing items wrap onto additional lines.',
              ],
              ['gap: 12px', 'Container', 'Clean spacing between items without outer edge margins.'],
              ['flex: 1', 'Flex Item', 'Item grows to fill remaining space equally with siblings.'],
              [
                'flex-shrink: 0',
                'Flex Item',
                'Prevents avatars, icons, and badges from squishing.',
              ],
            ],
          },
          warning:
            'Two classic Flexbox bugs: (1) icons and avatars get squished when sibling text is long—always put flex-shrink: 0 on icons/avatars; (2) long unbroken strings inside a flex: 1 column overflow the container unless you set min-width: 0 on that flex item.',
        },
        {
          id: 'real-world-flex-patterns',
          heading: 'Real-World Patterns: Auto Margins & Equal-Height Cards',
          body: [
            'One of Flexbox’s best tricks is combining flex-direction: column with margin-top: auto on the last child. Inside a row of cards with different paragraph lengths, giving the CTA button margin-top: auto pushes every button neatly to the bottom edge of its card.',
            'Similarly, inside a horizontal toolbar or navbar, margin-left: auto on one item pushes it and everything after it to the far right without needing extra wrapper divs.',
          ],
          points: [
            'Use align-self: flex-start on a single item when you want to override the container’s align-items: stretch.',
            'Combine flex: 1 1 200px with flex-wrap: wrap for responsive cards that wrap smoothly below 200px.',
            'Reach for Flexbox for 1D alignment (navbars, button rows, card internals) and CSS Grid for 2D page layouts.',
          ],
          example: {
            title: 'Equal-Height Cards with Bottom-Aligned Actions',
            language: 'css',
            code: `.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}
.card {
  flex: 1 1 180px;
  display: flex;
  flex-direction: column;
  padding: 16px;
}
.card .cta {
  margin-top: auto; /* Pushes button to card bottom */
}`,
            playground: {
              html: `<div class="cards">
  <article class="card">
    <div class="head"><span class="icon">★</span><h3>Starter</h3></div>
    <p>Short description.</p>
    <button class="cta">Choose Starter</button>
  </article>
  <article class="card">
    <div class="head"><span class="icon">⚡</span><h3>Pro Track</h3></div>
    <p>Includes deep-dive projects, code reviews, interactive challenges, and certificates.</p>
    <button class="cta primary">Choose Pro</button>
  </article>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; color: #18181b; }
.cards { display: flex; flex-wrap: wrap; gap: 12px; }
.card { flex: 1 1 180px; display: flex; flex-direction: column; gap: 10px; padding: 16px; border: 1px solid #e4e4e7; border-radius: 12px; background: #fafafa; }
.head { display: flex; align-items: center; gap: 8px; }
.icon { width: 28px; height: 28px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border-radius: 8px; background: #dbeafe; color: #1d4ed8; font-size: 14px; }
h3 { margin: 0; font-size: 15px; }
p { margin: 0; font-size: 13px; color: #52525b; line-height: 1.5; }
.cta { margin-top: auto; padding: 8px 12px; border: 1px solid #d4d4d8; border-radius: 8px; background: white; font-weight: 600; font-size: 13px; cursor: pointer; }
.cta.primary { background: #2563eb; border-color: #2563eb; color: white; }`,
              js: '',
            },
          },
          tip: 'Click the small "flex" badge next to any display: flex element in Chrome/Firefox DevTools to visualize main/cross axes, gaps, and free space directly on the page.',
        },
      ],
      challenge: {
        prompt:
          'Write CSS for a horizontal .user-row flex item containing a 40×40 .avatar (must never squish), a .user-info text column that grows to fill remaining space without overflowing long emails, and a right-aligned .action-btn.',
        hint: 'Give .avatar flex-shrink: 0, and give .user-info flex: 1; min-width: 0; so text truncation works properly.',
        language: 'css',
        solutionCode: `.user-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.action-btn {
  flex-shrink: 0;
}`,
      },
      quiz: [
        {
          question:
            'When flex-direction is set to column, which property controls vertical spacing/distribution along the column?',
          options: ['align-items', 'justify-content', 'align-self', 'flex-wrap'],
          answer: 1,
          explanation:
            'justify-content ALWAYS acts along the main axis. When flex-direction: column makes the main axis vertical, justify-content distributes items vertically.',
        },
        {
          question:
            'Why should icons and avatars inside a horizontal flex container always have flex-shrink: 0?',
          options: [
            'So they grow to fill empty space',
            'Because flex items default to flex-shrink: 1 and will squash narrow icons when sibling text is wide',
            'To center them vertically',
            'Because SVG elements are hidden without flex-shrink: 0',
          ],
          answer: 1,
          explanation:
            'By default, flex items shrink when space gets tight, turning circular avatars into ovals; flex-shrink: 0 locks their intrinsic dimensions.',
        },
      ],
    },
    km: {
      duration: '12 នាទី',
      objectives: [
        'គ្រប់គ្រងការពង្រីក បង្រួម និងទំហំដំបូងនៃធាតុ flex ដោយប្រើ flex shorthand (flex-grow, flex-shrink, flex-basis)។',
        'ការពារកុំឱ្យរូបតំណាងកំប៉ិត និងអត្ថបទហៀរចេញក្នុងជួរ flex ដោយប្រើ flex-shrink: 0 និង min-width: 0។',
        'បង្កើតគំរូ UI ជាក់ស្ដែង៖ របារក្បាលបំបែកឆ្វេង-ស្ដាំ និងកាតកម្ពស់ស្មើគ្នាដែលប៊ូតុងតម្រឹមខាងក្រោមស្មើគ្នា។',
      ],
      extraSections: [
        {
          id: 'flex-grow-shrink-basis',
          heading: 'ការគ្រប់គ្រង flex-grow, flex-shrink និង flex-wrap',
          body: [
            'ពេលអ្នកដាក់ display: flex លើប្រអប់មេ កូនផ្ទាល់របស់វាក្លាយជា flex items ដែលមានតម្លៃលំនាំដើម flex: 0 1 auto—ពួកវាមិនពង្រីកខ្លួនទេ អាចបង្រួមបាន និងចាប់ផ្ដើមតាមទំហំមាតិកា។ ការបន្ថែម flex-wrap: wrap អនុញ្ញាតឱ្យធាតុធ្លាក់ទៅជួរថ្មីលើអេក្រង់តូច ជំនួសឱ្យការចង្អៀតជាប់គ្នា។',
            'ការយល់ពី flex shorthand ជួយដោះស្រាយប្លង់ស្ទើរតែគ្រប់យ៉ាង៖ flex: 1 បែងចែកទំហំទំនេរស្មើៗគ្នា រីឯ flex: none ចាក់សោធាតុតាមទំហំដើម។ ពេល flex-direction ប្ដូរជា column អ័ក្សក៏ប្ដូរដែរ៖ justify-content តម្រឹមបញ្ឈរ ចំណែក align-items តម្រឹមផ្ដេក។',
          ],
          table: {
            headers: ['លក្ខណៈសម្បត្តិ', 'ប្រើលើ', 'ឥទ្ធិពល'],
            rows: [
              ['flex-direction: row | column', 'ប្រអប់មេ', 'កំណត់ទិសអ័ក្សចម្បង (ផ្ដេក ឬ បញ្ឈរ)។'],
              ['flex-wrap: wrap', 'ប្រអប់មេ', 'ឱ្យធាតុដែលលើសទទឹងធ្លាក់ទៅជួរបន្ទាប់។'],
              ['gap: 12px', 'ប្រអប់មេ', 'បង្កើតគម្លាតស្អាតរវាងធាតុដោយមិនប៉ះគែមខាងក្រៅ។'],
              ['flex: 1', 'ធាតុកូន', 'ពង្រីកធាតុឱ្យពេញទំហំទំនេរស្មើគ្នា។'],
              ['flex-shrink: 0', 'ធាតុកូន', 'ការពាររូប avatar រូបតំណាង និង badge កុំឱ្យកំប៉ិត។'],
            ],
          },
          warning:
            'កំហុស Flexbox ញឹកញាប់ពីរ៖ (1) រូបតំណាង និង avatar កំប៉ិតពេលអត្ថបទក្បែរវែង—ត្រូវដាក់ flex-shrink: 0 ជានិច្ច; (2) អត្ថបទវែងគ្មានដកឃ្លាក្នុងជួរ flex: 1 ហៀរចេញក្រៅប្រអប់ លុះត្រាដាក់ min-width: 0 លើធាតុនោះ។',
        },
        {
          id: 'real-world-flex-patterns',
          heading: 'គំរូប្រើប្រាស់ពិត៖ Auto Margin និងកាតកម្ពស់ស្មើគ្នា',
          body: [
            'តិចនិកដ៏មានប្រយោជន៍បំផុតមួយនៃ Flexbox គឺការរួមបញ្ចូល flex-direction: column ជាមួយ margin-top: auto លើធាតុកូនចុងក្រោយ។ ក្នុងជួរកាតដែលមានប្រវែងអត្ថបទខុសគ្នា ការដាក់ margin-top: auto លើប៊ូតុងនឹងរុញប៊ូតុងទាំងអស់ទៅគែមក្រោមស្មើគ្នា។',
            'ដូចគ្នាដែរ ក្នុងរបារម៉ឺនុយផ្ដេក ការដាក់ margin-left: auto លើធាតុមួយនឹងរុញវា និងធាតុបន្ទាប់ទាំងអស់ទៅខាងស្ដាំបំផុតដោយមិនបាច់បង្កើត div រុំបន្ថែម។',
          ],
          points: [
            'ប្រើ align-self: flex-start លើធាតុតែមួយ ពេលចង់បំពាន align-items: stretch របស់ប្រអប់មេ។',
            'ប្រើ flex: 1 1 200px ជាមួយ flex-wrap: wrap សម្រាប់កាតដែលធ្លាក់ជួរដោយស្វ័យប្រវត្តិក្រោម 200px។',
            'ប្រើ Flexbox សម្រាប់ការតម្រឹម 1 វិមាត្រ (navbar, ជួរប៊ូតុង) និងប្រើ CSS Grid សម្រាប់ប្លង់ 2 វិមាត្រ។',
          ],
          exampleTitle: 'កាតកម្ពស់ស្មើគ្នាជាមួយប៊ូតុងតម្រឹមខាងក្រោម',
          tip: 'ចុចលើស្លាក "flex" តូចក្បែរធាតុ display: flex ក្នុង Chrome/Firefox DevTools ដើម្បីមើលបន្ទាត់អ័ក្ស និងគម្លាតផ្ទាល់លើទំព័រ។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ CSS សម្រាប់ជួរផ្ដេក .user-row ដែលមាន .avatar ទំហំ 40×40 (មិនត្រូវឱ្យកំប៉ិត), ជួរអត្ថបទ .user-info ដែលពង្រីកពេញចន្លោះទំនេរដោយមិនហៀរអ៊ីមែលវែង និងប៊ូតុង .action-btn នៅខាងស្ដាំ។',
        hint: 'ដាក់ flex-shrink: 0 លើ .avatar ហើយដាក់ flex: 1; min-width: 0; លើ .user-info។',
      },
      quiz: [
        {
          question:
            'នៅពេល flex-direction កំណត់ជា column តើលក្ខណៈសម្បត្តិណាគ្រប់គ្រងការតម្រឹមបញ្ឈរតាមជួរឈរ?',
          options: ['align-items', 'justify-content', 'align-self', 'flex-wrap'],
          answer: 1,
          explanation:
            'justify-content តែងតែធ្វើការលើអ័ក្សចម្បងជានិច្ច។ ពេល flex-direction: column ធ្វើឱ្យអ័ក្សចម្បងជាអ័ក្សបញ្ឈរ justify-content នឹងតម្រឹមបញ្ឈរ។',
        },
        {
          question:
            'ហេតុអ្វីបានជារូបតំណាង និង avatar ក្នុងប្រអប់ flex ផ្ដេកគួរតែមាន flex-shrink: 0?',
          options: [
            'ដើម្បីឱ្យពួកវាពង្រីកពេញទំហំទំនេរ',
            'ព្រោះធាតុ flex មានលំនាំដើម flex-shrink: 1 ហើយនឹងកំប៉ិតពេលអត្ថបទក្បែរវែង',
            'ដើម្បីតម្រឹមពួកវាចំកណ្ដាលបញ្ឈរ',
            'ព្រោះធាតុ SVG ត្រូវលាក់បើគ្មាន flex-shrink: 0',
          ],
          answer: 1,
          explanation:
            'តាមលំនាំដើម ធាតុ flex អាចបង្រួមពេលចង្អៀត ដែលធ្វើឱ្យ avatar មូលក្លាយជាពងក្រពើ; flex-shrink: 0 រក្សាទំហំដើមរបស់វា។',
        },
      ],
    },
  },

  'css/css-grid': {
    en: {
      duration: '12 min',
      objectives: [
        'Define explicit columns and rows with fr units, repeat(), minmax(), and grid-template-areas.',
        'Place and span items across grid tracks using grid-column: span 2 and line numbers.',
        'Avoid grid blowout with minmax(0, 1fr) and center elements cleanly with place-items.',
      ],
      extraSections: [
        {
          id: 'grid-tracks-and-areas',
          heading: 'Tracks, Named Areas & Avoiding Grid Blowout',
          body: [
            'CSS Grid lets you design rows and columns simultaneously from the parent container. The fr unit distributes remaining free space proportionally (e.g., 240px 1fr creates a fixed sidebar next to a fluid main area), while grid-template-areas lets you draw an ASCII map of your page layout directly in CSS.',
            'Items can span multiple columns or rows using grid-column: span 2 or exact line numbers like grid-column: 1 / -1 (full width from the first grid line to the last). Even centering a single modal or empty state takes just two lines: display: grid; place-items: center;.',
          ],
          points: [
            'Use minmax(0, 1fr) instead of bare 1fr when a grid column holds code blocks or long URLs—1fr secretly defaults to minmax(auto, 1fr) and can stretch wider than the viewport.',
            'Understand auto-fit vs auto-fill: auto-fit collapses empty tracks so cards stretch to fill the row, while auto-fill preserves empty column slots.',
            'Combine row-gap and column-gap (or shorthand gap: 16px 24px) for independent vertical and horizontal rhythm.',
          ],
          table: {
            headers: ['Property / Value', 'Applies To', 'What It Does'],
            rows: [
              [
                'grid-template-columns',
                'Container',
                'Defines explicit column track widths (e.g. 220px minmax(0, 1fr)).',
              ],
              [
                'grid-template-areas',
                'Container',
                'Names visual layout regions like "nav main" for readable shells.',
              ],
              [
                'grid-column: span 2',
                'Grid Item',
                'Makes a featured card or banner span across 2 columns.',
              ],
              [
                'grid-column: 1 / -1',
                'Grid Item',
                'Spans an item across the entire explicit grid width.',
              ],
              [
                'place-items: center',
                'Container',
                'Shorthand for align-items + justify-items centering.',
              ],
            ],
          },
          warning:
            'Writing grid-template-columns: 240px 1fr is a frequent cause of horizontal page overflow when the 1fr column contains a wide <pre> or table. Always write minmax(0, 1fr) for resilient layouts.',
        },
        {
          id: 'dashboard-and-subgrid',
          heading: 'Building a Real Dashboard Bento Grid',
          body: [
            'Modern dashboards and bento grids combine a multi-column track template with selective spanning items. Because placement lives entirely in CSS, you can rearrange an entire dashboard between mobile and desktop without touching your HTML source order.',
            'When nested cards need their internal titles or footers to line up across adjacent grid columns, modern browsers also support grid-template-rows: subgrid so child elements align to the parent grid’s tracks.',
          ],
          example: {
            title: 'Bento Dashboard with Full-Width Header & Spanning Hero',
            language: 'css',
            code: `.dashboard {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.topbar { grid-column: 1 / -1; }
.chart  { grid-column: span 2; }`,
            playground: {
              html: `<div class="dashboard">
  <header class="tile topbar">Analytics Dashboard (1 / -1)</header>
  <section class="tile chart">Revenue Chart (span 2)</section>
  <aside class="tile stat">Active Users<br><strong>1,428</strong></aside>
  <div class="tile">Conversion<br><strong>4.8%</strong></div>
  <div class="tile">Avg. Time<br><strong>6m 12s</strong></div>
  <div class="tile">Uptime<br><strong>99.98%</strong></div>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 16px; color: #18181b; }
.dashboard { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.tile { padding: 14px; border-radius: 10px; border: 1px solid #e4e4e7; background: #fafafa; font-size: 13px; }
.tile strong { display: inline-block; margin-top: 4px; font-size: 20px; font-variant-numeric: tabular-nums; }
.topbar { grid-column: 1 / -1; background: #18181b; color: white; font-weight: 600; border-color: #18181b; }
.chart { grid-column: span 2; background: #eff6ff; border-color: #bfdbfe; color: #1e40af; font-weight: 600; min-height: 76px; }
.stat { background: #ecfdf5; border-color: #a7f3d0; }`,
              js: '',
            },
          },
          tip: 'Use grid-column: 1 / -1 whenever you want a section divider or alert banner to span every column regardless of how many columns exist at the current breakpoint.',
        },
      ],
      challenge: {
        prompt:
          'Create a 2-column app shell layout using CSS Grid with grid-template-areas: a full-width "header" across the top, a 200px "sidebar" on the left, a fluid "main" column using minmax(0, 1fr) on the right, and a 16px gap.',
        hint: 'Define grid-template-columns: 200px minmax(0, 1fr); and grid-template-areas: "header header" "sidebar main"; then assign grid-area on each child.',
        language: 'css',
        solutionCode: `.shell {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  grid-template-areas:
    "header header"
    "sidebar main";
  gap: 16px;
}

.shell-header { grid-area: header; }
.shell-sidebar { grid-area: sidebar; }
.shell-main { grid-area: main; }`,
      },
      quiz: [
        {
          question: 'Why is minmax(0, 1fr) safer than plain 1fr for a fluid CSS Grid column?',
          options: [
            '1fr is not supported in Firefox',
            '1fr defaults to minmax(auto, 1fr), which lets wide unbreakable content push the column past its container width',
            'minmax(0, 1fr) automatically hides overflowing text with ellipsis',
            '1fr only works when combined with Flexbox',
          ],
          answer: 1,
          explanation:
            'Plain 1fr sets a minimum size of auto, so wide code blocks or tables can blow out the layout; minmax(0, 1fr) lets the column shrink cleanly to fit the container.',
        },
        {
          question: 'What does grid-column: 1 / -1 do on a grid item?',
          options: [
            'Hides the item off-screen',
            'Places the item in the first column only',
            'Makes the item span from the first explicit grid line to the very last explicit grid line',
            'Reverses the order of all columns',
          ],
          answer: 2,
          explanation:
            'Negative line numbers count backward from the end of the explicit grid, so 1 / -1 always spans the full row width.',
        },
      ],
    },
    km: {
      duration: '12 នាទី',
      objectives: [
        'កំណត់ជួរឈរ និងជួរដេកដោយប្រើខ្នាត fr, repeat(), minmax() និង grid-template-areas។',
        'ដាក់ទីតាំង និងពង្រីកធាតុឆ្លងជួរឈរដោយ grid-column: span 2 និងលេខបន្ទាត់ grid។',
        'ការពារការហៀរប្លង់ដោយ minmax(0, 1fr) និងតម្រឹមចំកណ្ដាលដោយ place-items។',
      ],
      extraSections: [
        {
          id: 'grid-tracks-and-areas',
          heading: 'Grid Tracks, តំបន់មានឈ្មោះ និងការការពារ Grid Blowout',
          body: [
            'CSS Grid អនុញ្ញាតឱ្យអ្នករចនាជួរដេក និងជួរឈរព្រមគ្នាពីប្រអប់មេ។ ខ្នាត fr បែងចែកទំហំទំនេរតាមសមាមាត្រ (ឧ. 240px 1fr បង្កើត sidebar ថេរជាប់ផ្នែកមាតិកាបត់បែន) ចំណែក grid-template-areas អនុញ្ញាតឱ្យគូរផែនទីប្លង់ដោយឈ្មោះតំបន់យ៉ាងងាយអានក្នុង CSS។',
            'ធាតុនីមួយៗអាចលាតឆ្លងច្រើនជួរឈរដោយ grid-column: span 2 ឬប្រើលេខបន្ទាត់ដូច grid-column: 1 / -1 (ពេញទទឹងពីបន្ទាត់ដំបូងដល់បន្ទាត់ចុងក្រោយ)។ សូម្បីតែការតម្រឹមធាតុមួយចំកណ្ដាលក៏ត្រូវការតែពីរបន្ទាត់៖ display: grid; place-items: center;។',
          ],
          points: [
            'ប្រើ minmax(0, 1fr) ជំនួស 1fr ធម្មតាពេលជួរឈរមានប្លុកកូដ ឬ URL វែង—ព្រោះ 1fr មានតម្លៃអប្បបរមា auto ដែលអាចរុញប្លង់ហៀរអេក្រង់។',
            'យល់ភាពខុសគ្នា auto-fit vs auto-fill៖ auto-fit បង្រួមជួរឈរទទេឱ្យកាតលាតពេញ រីឯ auto-fill រក្សាជួរឈរទទេទុក។',
            'ប្រើ gap: 16px 24px ដើម្បីកំណត់គម្លាតជួរដេក និងជួរឈរដាច់ដោយឡែកពីគ្នា។',
          ],
          table: {
            headers: ['លក្ខណៈសម្បត្តិ / តម្លៃ', 'ប្រើលើ', 'មុខងារ'],
            rows: [
              ['grid-template-columns', 'ប្រអប់មេ', 'កំណត់ទទឹងជួរឈរ (ឧ. 220px minmax(0, 1fr))។'],
              ['grid-template-areas', 'ប្រអប់មេ', 'ដាក់ឈ្មោះតំបន់ប្លង់ដូច "nav main" ងាយអាន។'],
              ['grid-column: span 2', 'ធាតុកូន', 'ឱ្យកាតពិសេសលាតឆ្លង 2 ជួរឈរ។'],
              ['grid-column: 1 / -1', 'ធាតុកូន', 'លាតធាតុពេញទទឹងគ្រប់ជួរឈរនៃ grid។'],
              [
                'place-items: center',
                'ប្រអប់មេ',
                'តម្រឹមចំកណ្ដាលទាំងផ្ដេក និងបញ្ឈរក្នុងបន្ទាត់តែមួយ។',
              ],
            ],
          },
          warning:
            'ការសរសេរ grid-template-columns: 240px 1fr ងាយធ្វើឱ្យទំព័រហៀរផ្ដេកពេលជួរ 1fr មាន <pre> ឬតារាងវែង។ គួរប្រើ minmax(0, 1fr) ជានិច្ចដើម្បីភាពរឹងមាំ។',
        },
        {
          id: 'dashboard-and-subgrid',
          heading: 'ការបង្កើតផ្ទាំងគ្រប់គ្រង Bento Grid ជាក់ស្ដែង',
          body: [
            'ផ្ទាំងគ្រប់គ្រងទំនើប និងប្លង់ bento រួមបញ្ចូលជួរឈរច្រើនជាមួយកាតដែលលាតឆ្លងជួរឈរ។ ដោយសារទីតាំងទាំងអស់គ្រប់គ្រងក្នុង CSS អ្នកអាចរៀបប្លង់ឡើងវិញរវាងទូរស័ព្ទ និងកុំព្យូទ័រដោយមិនបាច់ប្ដូរលំដាប់ HTML។',
            'នៅពេលកាតជិតគ្នាត្រូវការឱ្យចំណងជើង ឬបាតកាតត្រង់ជួរគ្នា កម្មវិធីរុករកទំនើបក៏គាំទ្រ grid-template-rows: subgrid ដើម្បីឱ្យធាតុខាងក្នុងតម្រឹមតាមជួរ grid មេដែរ។',
          ],
          exampleTitle: 'ផ្ទាំងគ្រប់គ្រង Bento ជាមួយ Header ពេញទទឹង និងកាត Span 2',
          tip: 'ប្រើ grid-column: 1 / -1 រាល់ពេលចង់ឱ្យបដា ឬចំណងជើងលាតពេញគ្រប់ជួរឈរ មិនថាអេក្រង់បង្ហាញ 2 ឬ 4 ជួរឈរឡើយ។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើតប្លង់កម្មវិធី 2 ជួរឈរដោយ CSS Grid ប្រើ grid-template-areas៖ "header" ពេញទទឹងខាងលើ, "sidebar" ទទឹង 200px ខាងឆ្វេង, ជួរឈរ "main" បត់បែនប្រើ minmax(0, 1fr) ខាងស្ដាំ និង gap 16px។',
        hint: 'កំណត់ grid-template-columns: 200px minmax(0, 1fr); និង grid-template-areas: "header header" "sidebar main"; រួចដាក់ grid-area លើធាតុកូននីមួយៗ។',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វីបានជា minmax(0, 1fr) មានសុវត្ថិភាពជាង 1fr ធម្មតាសម្រាប់ជួរឈរ CSS Grid បត់បែន?',
          options: [
            'ព្រោះ Firefox មិនគាំទ្រ 1fr ទេ',
            'ព្រោះ 1fr មានលំនាំដើម minmax(auto, 1fr) ដែលអាចឱ្យមាតិកាវែងរុញជួរឈរហៀរប្រអប់មេ',
            'ព្រោះ minmax(0, 1fr) លាក់អត្ថបទហៀរដោយសញ្ញាចុចៗស្វ័យប្រវត្តិ',
            'ព្រោះ 1fr ប្រើបានតែជាមួយ Flexbox',
          ],
          answer: 1,
          explanation:
            '1fr ធម្មតាមានទំហំអប្បបរមា auto ដែលធ្វើឱ្យប្លុកកូដ ឬតារាងវែងរុញប្លង់ហៀរ; minmax(0, 1fr) អនុញ្ញាតឱ្យជួរឈរបង្រួមត្រឹមទំហំប្រអប់។',
        },
        {
          question: 'តើ grid-column: 1 / -1 ធ្វើអ្វីលើធាតុ grid មួយ?',
          options: [
            'លាក់ធាតុនោះចេញក្រៅអេក្រង់',
            'ដាក់ធាតុនោះក្នុងជួរឈរដំបូងតែមួយ',
            'ឱ្យធាតុនោះលាតពីបន្ទាត់ grid ដំបូងដល់បន្ទាត់ចុងក្រោយបំផុតពេញជួរ',
            'ត្រឡប់លំដាប់ជួរឈរទាំងអស់',
          ],
          answer: 2,
          explanation:
            'លេខបន្ទាត់អវិជ្ជមានរាប់ថយក្រោយពីចុងបញ្ចប់នៃ grid ដូច្នេះ 1 / -1 តែងតែលាតពេញទទឹងជួរទាំងមូល។',
        },
      ],
    },
  },

  'css/responsive-design': {
    en: {
      duration: '12 min',
      objectives: [
        'Scale typography and spacing fluidly across viewports using clamp(), min(), and max().',
        'Avoid mobile browser viewport bugs by using 100dvh instead of 100vh and designing mobile-first breakpoints.',
        'Build self-adapting UI components with CSS Container Queries (@container) and aspect-ratio.',
      ],
      extraSections: [
        {
          id: 'fluid-typography-and-clamp',
          heading: 'Fluid Sizing with clamp() & Dynamic Viewport Units (dvh)',
          body: [
            'Instead of writing four separate media queries just to step a heading’s font size down for mobile, CSS math functions let values scale continuously. clamp(min, preferred, max)—such as font-size: clamp(1.5rem, 4vw + 0.5rem, 2.75rem)—grows smoothly with the screen while staying strictly within your readable minimum and maximum bounds.',
            'On mobile phones, the browser address bar expands and collapses as users scroll, causing height: 100vh hero sections to clip bottom buttons off-screen. Modern CSS solves this with 100dvh (dynamic viewport height) and 100svh (small viewport height), which always reflect the actually visible screen height.',
          ],
          table: {
            headers: ['Feature', 'Example', 'Why It Beats Old Hacks'],
            rows: [
              [
                'clamp(min, val, max)',
                'clamp(1.25rem, 3vw, 2.25rem)',
                'Fluid headings with zero breakpoint jumps.',
              ],
              [
                'min(100% - 2rem, 720px)',
                'width: min(100% - 2rem, 720px)',
                'Centered responsive wrapper in one line.',
              ],
              [
                'min-height: 100dvh',
                'Full-screen hero / app shell',
                'Prevents mobile browser chrome from clipping bottom UI.',
              ],
              [
                'aspect-ratio: 16 / 9',
                'Video / thumbnail frames',
                'Locks media ratio cleanly without padding-bottom hacks.',
              ],
              [
                '@container (min-width: ...)',
                'Component-level layout switch',
                'Card adapts to its parent slot, not just the window width.',
              ],
            ],
          },
          warning:
            'When using clamp() for font-size, always mix a rem offset into the middle value (e.g. 2vw + 1rem instead of pure 4vw). Pure viewport units like 4vw ignore browser zoom (Ctrl/Cmd +), which breaks accessibility.',
        },
        {
          id: 'container-queries-and-media',
          heading: 'Container Queries (@container) & Responsive Media',
          body: [
            'Traditional @media queries only inspect the browser window width. That breaks down when the same card component lives both in a wide main column and inside a narrow 280px sidebar on a 1440px desktop monitor.',
            'CSS Container Queries solve this permanently: mark the wrapper with container-type: inline-size, and write @container (min-width: 360px) to switch the card from stacked vertical layout to horizontal split layout automatically whenever its parent container has room.',
          ],
          points: [
            'Choose breakpoints based on where your content actually starts feeling cramped—not specific phone model widths.',
            'Protect touch users by keeping interactive targets at least 44×44px and gating hover-only effects inside @media (hover: hover) and (pointer: fine).',
            'Add padding-bottom: env(safe-area-inset-bottom) on fixed mobile bottom bars so content never sits underneath the iOS home indicator.',
          ],
          example: {
            title: 'Self-Adapting Component with @container & clamp()',
            language: 'css',
            code: `.slot {
  container-type: inline-size;
}
.promo {
  display: grid;
  gap: 12px;
}
.promo h2 {
  font-size: clamp(1.1rem, 2.5vw + 0.7rem, 1.6rem);
}
@container (min-width: 380px) {
  .promo {
    grid-template-columns: 140px 1fr;
    align-items: center;
  }
}`,
            playground: {
              html: `<div class="slot">
  <article class="promo">
    <div class="thumb">16:9 Media</div>
    <div>
      <h2>Container-Aware Card</h2>
      <p>Resize the preview pane: this card flips between stacked and horizontal based on its own container width.</p>
    </div>
  </article>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; color: #18181b; }
.slot { container-type: inline-size; }
.promo { display: grid; gap: 14px; padding: 14px; border: 1px solid #e4e4e7; border-radius: 14px; background: #fafafa; }
.thumb { aspect-ratio: 16 / 9; border-radius: 10px; background: linear-gradient(135deg, #2563eb, #60a5fa); color: white; display: grid; place-items: center; font-weight: 600; font-size: 13px; }
h2 { margin: 0 0 6px; font-size: clamp(1.05rem, 2.5vw + 0.65rem, 1.45rem); letter-spacing: -0.02em; }
p { margin: 0; font-size: 13px; line-height: 1.55; color: #52525b; }
@container (min-width: 360px) {
  .promo { grid-template-columns: 150px 1fr; align-items: center; }
}`,
              js: '',
            },
          },
          tip: 'Use @media (hover: hover) around hover animations so mobile touch users never get stuck with a lingering "sticky hover" state after tapping a button.',
        },
      ],
      challenge: {
        prompt:
          'Write CSS for a responsive .hero section that fills the visible mobile screen safely (min-height: 100dvh), centers a .hero-inner container with width: min(100% - 2rem, 640px), and sets a fluid <h1> font-size using clamp() between 1.75rem and 3rem.',
        hint: 'Combine 100dvh, margin-inline: auto, width: min(100% - 2rem, 640px), and clamp(1.75rem, 4vw + 1rem, 3rem).',
        language: 'css',
        solutionCode: `.hero {
  min-height: 100dvh;
  display: grid;
  place-items: center;
}

.hero-inner {
  width: min(100% - 2rem, 640px);
  margin-inline: auto;
}

.hero h1 {
  font-size: clamp(1.75rem, 4vw + 1rem, 3rem);
  letter-spacing: -0.02em;
  line-height: 1.15;
}`,
      },
      quiz: [
        {
          question:
            'Why does min-height: 100dvh work better than 100vh for full-screen sections on mobile browsers?',
          options: [
            '100dvh loads images faster on 4G networks',
            '100dvh dynamically adjusts as the mobile browser’s address bar shows or hides, preventing clipped bottom content',
            '100vh is only valid for width properties',
            '100dvh disables pinch-to-zoom on iOS',
          ],
          answer: 1,
          explanation:
            'On mobile Safari and Chrome, 100vh uses the largest viewport (ignoring the visible address bar), often pushing bottom CTAs below the screen; 100dvh tracks the live visible viewport.',
        },
        {
          question:
            'What is the key advantage of @container queries over @media queries for reusable components?',
          options: [
            '@container queries do not require a viewport meta tag',
            '@container queries let a component adapt to the width of its parent container regardless of the overall screen size',
            '@container queries work only on CSS Grid layouts',
            '@container queries automatically optimize image file sizes',
          ],
          answer: 1,
          explanation:
            'A card inside a narrow desktop sidebar can stay stacked while the exact same card inside the wide main column switches to a horizontal layout.',
        },
      ],
    },
    km: {
      duration: '12 នាទី',
      objectives: [
        'កំណត់ទំហំអក្សរ និងគម្លាតបត់បែនរលូនតាមអេក្រង់ដោយប្រើ clamp(), min() និង max()។',
        'ជៀសវាងបញ្ហាអេក្រង់ទូរស័ព្ទដោយប្រើ 100dvh ជំនួស 100vh និងរចនា breakpoint បែប mobile-first។',
        'បង្កើតសមាសធាតុ UI ដែលសម្របខ្លួនឯងដោយប្រើ CSS Container Queries (@container) និង aspect-ratio។',
      ],
      extraSections: [
        {
          id: 'fluid-typography-and-clamp',
          heading: 'ទំហំបត់បែនដោយ clamp() និងខ្នាត Viewport ទំនើប (dvh)',
          body: [
            'ជំនួសឱ្យការសរសេរ media query បួនផ្សេងគ្នាដើម្បីប្ដូរទំហំចំណងជើង អនុគមន៍គណិតវិទ្យា CSS ឱ្យតម្លៃប្រែប្រួលរលូន។ clamp(min, preferred, max)—ឧទាហរណ៍ font-size: clamp(1.5rem, 4vw + 0.5rem, 2.75rem)—ពង្រីករលូនតាមអេក្រង់ តែមិនតូចជាងតម្លៃអប្បបរមា ឬធំជាងតម្លៃអតិបរមាឡើយ។',
            'នៅលើទូរស័ព្ទ របារអាសយដ្ឋានកម្មវិធីរុករកបង្ហាញ និងលាក់ពេលអូសចុះឡើង ដែលធ្វើឱ្យ height: 100vh កាត់ប៊ូតុងខាងក្រោមចេញក្រៅអេក្រង់។ CSS ទំនើបដោះស្រាយដោយប្រើ 100dvh (dynamic viewport height) ដែលតែងតែឆ្លុះបញ្ចាំងកម្ពស់អេក្រង់ពិតដែលមើលឃើញ។',
          ],
          table: {
            headers: ['មុខងារ', 'ឧទាហរណ៍', 'មូលហេតុដែលល្អជាងវិធីចាស់'],
            rows: [
              [
                'clamp(min, val, max)',
                'clamp(1.25rem, 3vw, 2.25rem)',
                'ចំណងជើងប្រែទំហំរលូនដោយគ្មានការលោត breakpoint។',
              ],
              [
                'min(100% - 2rem, 720px)',
                'width: min(100% - 2rem, 720px)',
                'ប្រអប់កណ្ដាលឆ្លើយតបក្នុងមួយបន្ទាត់។',
              ],
              [
                'min-height: 100dvh',
                'ផ្នែក Hero ពេញអេក្រង់',
                'ការពាររបារកម្មវិធីរុករកទូរស័ព្ទកុំឱ្យកាត់បាតទំព័រ។',
              ],
              [
                'aspect-ratio: 16 / 9',
                'ស៊ុមវីដេអូ ឬរូបភាព',
                'រក្សាសមាមាត្រដោយមិនបាច់ប្រើល្បិច padding-bottom។',
              ],
              [
                '@container (min-width: ...)',
                'ប្ដូរប្លង់កម្រិតសមាសធាតុ',
                'កាតសម្របតាមទទឹងប្រអប់មេ មិនមែនតែទទឹងអេក្រង់ទេ។',
              ],
            ],
          },
          warning:
            'ពេលប្រើ clamp() សម្រាប់ font-size ត្រូវបូកបន្ថែម rem ក្នុងតម្លៃកណ្ដាលជានិច្ច (ឧ. 2vw + 1rem ជំនួស 4vw សុទ្ធ) ព្រោះ vw សុទ្ធមិនពង្រីកតាមការ Zoom របស់កម្មវិធីរុករកឡើយ។',
        },
        {
          id: 'container-queries-and-media',
          heading: 'Container Queries (@container) និងមេឌៀឆ្លើយតប',
          body: [
            '@media queries បែបបុរាណមើលតែទទឹងបង្អួចកម្មវិធីរុករកប៉ុណ្ណោះ។ វាបង្កបញ្ហាពេលកាតដូចគ្នាត្រូវដាក់ទាំងក្នុងផ្នែកកណ្ដាលធំ និងក្នុង sidebar ទទឹង 280px លើអេក្រង់កុំព្យូទ័រ។',
            'CSS Container Queries ដោះស្រាយបញ្ហានេះបានយ៉ាងស្អាត៖ កំណត់ container-type: inline-size លើប្រអប់មេ ហើយសរសេរ @container (min-width: 360px) ដើម្បីឱ្យកាតប្ដូរពីប្លង់បញ្ឈរទៅផ្ដេកដោយស្វ័យប្រវត្តិពេលប្រអប់មេមានទំហំគ្រប់គ្រាន់។',
          ],
          points: [
            'ជ្រើសរើស breakpoint តាមចំណុចដែលមាតិកាចាប់ផ្ដើមចង្អៀត—មិនមែនតាមទំហំម៉ូដែលទូរស័ព្ទជាក់លាក់ទេ។',
            'រក្សាទំហំប៊ូតុងយ៉ាងតិច 44×44px សម្រាប់ការប៉ះលើទូរស័ព្ទ និងដាក់ស្ទីល hover ក្នុង @media (hover: hover) and (pointer: fine)។',
            'បន្ថែម padding-bottom: env(safe-area-inset-bottom) លើរបារខាងក្រោមទូរស័ព្ទ ដើម្បីកុំឱ្យជាប់ក្រោមបន្ទាត់ home របស់ iOS។',
          ],
          exampleTitle: 'សមាសធាតុសម្របខ្លួនឯងជាមួយ @container និង clamp()',
          tip: 'ប្រើ @media (hover: hover) ជុំវិញចលនា hover ដើម្បីកុំឱ្យអ្នកប្រើទូរស័ព្ទជាប់ស្ថានភាព hover បន្ទាប់ពីចុចប៊ូតុង។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ CSS សម្រាប់ផ្នែក .hero ដែលពេញអេក្រង់ទូរស័ព្ទដោយសុវត្ថិភាព (min-height: 100dvh), តម្រឹម .hero-inner ចំកណ្ដាលជាមួយ width: min(100% - 2rem, 640px) និងកំណត់ font-size របស់ <h1> ដោយ clamp() ចន្លោះ 1.75rem និង 3rem។',
        hint: 'ប្រើ 100dvh, margin-inline: auto, width: min(100% - 2rem, 640px) និង clamp(1.75rem, 4vw + 1rem, 3rem)។',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វីបានជា min-height: 100dvh ល្អជាង 100vh សម្រាប់ផ្នែកពេញអេក្រង់លើកម្មវិធីរុករកទូរស័ព្ទ?',
          options: [
            '100dvh ផ្ទុករូបភាពលឿនជាងលើបណ្ដាញ 4G',
            '100dvh ប្រែប្រួលតាមរបារអាសយដ្ឋានទូរស័ព្ទដែលបង្ហាញ ឬលាក់ ការពារកុំឱ្យកាត់មាតិកាខាងក្រោម',
            '100vh ប្រើបានតែសម្រាប់ width ប៉ុណ្ណោះ',
            '100dvh បិទការពង្រីកអេក្រង់លើ iOS',
          ],
          answer: 1,
          explanation:
            'លើទូរស័ព្ទ 100vh មិនដកកម្ពស់របារអាសយដ្ឋានចេញទេ ដែលធ្វើឱ្យប៊ូតុងខាងក្រោមធ្លាក់ផុតអេក្រង់; 100dvh គិតតាមកម្ពស់ជាក់ស្ដែង។',
        },
        {
          question:
            'តើ @container queries មានគុណសម្បត្តិសំខាន់អ្វីលើសពី @media queries សម្រាប់សមាសធាតុប្រើឡើងវិញ?',
          options: [
            '@container queries មិនត្រូវការ viewport meta tag ទេ',
            '@container queries អនុញ្ញាតឱ្យសមាសធាតុសម្របតាមទទឹងប្រអប់មេរបស់វា មិនអាស្រ័យលើទំហំអេក្រង់ទាំងមូល',
            '@container queries ដំណើរការតែលើ CSS Grid ប៉ុណ្ណោះ',
            '@container queries បង្រួមទំហំឯកសាររូបភាពស្វ័យប្រវត្តិ',
          ],
          answer: 1,
          explanation:
            'កាតដូចគ្នាអាចបង្ហាញបញ្ឈរពេលដាក់ក្នុង sidebar តូច ហើយប្ដូរជាផ្ដេកពេលដាក់ក្នុងផ្នែកកណ្ដាលធំលើអេក្រង់កុំព្យូទ័រដូចគ្នា។',
        },
      ],
    },
  },

  'css/design-tokens-and-motion': {
    en: {
      duration: '13 min',
      objectives: [
        'Structure scalable two-tier CSS custom properties (primitive palette tokens + semantic UI tokens) with dark mode.',
        'Keep UI animations locked at 60fps by transitioning only GPU-composited properties (transform and opacity).',
        'Choose crisp ease-out curves for entering UI, tactile :active feedback, and honor prefers-reduced-motion.',
      ],
      extraSections: [
        {
          id: 'token-architecture-and-theming',
          heading: 'Two-Tier Design Tokens & color-scheme',
          body: [
            'Production design systems split CSS custom properties into two layers: primitive tokens (--blue-600, --zinc-900) hold raw values, while semantic tokens (--surface, --text-primary, --accent) describe intent. Components only reference semantic tokens, so adding dark mode or a high-contrast theme re-maps just a handful of variables without touching component CSS.',
            'Pair your dark theme class with color-scheme: dark so native browser scrollbars, checkboxes, and date pickers automatically switch to dark styling instead of flashing bright white boxes.',
          ],
          points: [
            'Supply a fallback inside var(--accent, #2563eb) when building portable components shared across apps.',
            'Never write transition: all—explicitly list properties like transition: transform 180ms var(--ease-out), opacity 180ms ease; to prevent accidental layout animations.',
            'Keep interactive UI transitions brisk (150ms–250ms); animations slower than 300ms make tools feel sluggish.',
          ],
          table: {
            headers: ['Property / Rule', 'Performance / UX Role', 'Guideline'],
            rows: [
              [
                'transform, opacity',
                'GPU-composited (no layout)',
                'Animate these for 60fps drawers, popovers, and presses.',
              ],
              [
                'width, height, top, left',
                'Triggers Layout + Paint',
                'Never animate these—use transform: translate/scale instead.',
              ],
              [
                'cubic-bezier(0.23, 1, 0.32, 1)',
                'Snappy ease-out curve',
                'Ideal for menus, toasts, and UI entering the screen.',
              ],
              [
                'transform: scale(0.97)',
                'Tactile :active press',
                'Gives buttons immediate physical feedback on click/tap.',
              ],
              [
                '@media (prefers-reduced-motion: reduce)',
                'Accessibility rule',
                'Disables or softens motion for motion-sensitive users.',
              ],
            ],
          },
          warning:
            'Animating width, height, margin, or top forces the browser to recalculate layout on every single frame (60 times/sec), causing jank on phones. Always replace top/left transitions with transform: translateY() / translateX().',
        },
        {
          id: 'easing-curves-and-reduced-motion',
          heading: 'Physics-Inspired Easing, Popover Origins & Reduced Motion',
          body: [
            'Great UI motion feels responsive, never theatrical. Elements entering the screen (popovers, modals, toasts) should use an ease-out curve so they start fast and settle gently—and scale from 0.95 to 1 with opacity, never from scale(0). For dropdowns and popovers, set transform-origin toward the trigger button so the menu visually emerges from what you clicked.',
            'Always include a @media (prefers-reduced-motion: reduce) fallback that removes movement or replaces slides with a subtle instant swap. Respecting user OS accessibility settings is non-negotiable in professional front-end engineering.',
          ],
          example: {
            title: '60fps Popover Entrance with Reduced-Motion Support',
            language: 'css',
            code: `:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
}
.popover {
  transform-origin: top left;
  opacity: 0;
  transform: scale(0.95) translateY(-4px);
  transition: opacity 180ms var(--ease-out), transform 180ms var(--ease-out);
}
.popover.open {
  opacity: 1;
  transform: scale(1) translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .popover { transition: none; transform: none; }
}`,
            playground: {
              html: `<div class="wrap">
  <button id="btn" class="trigger" type="button" aria-expanded="false">Open Actions ▾</button>
  <div id="menu" class="popover" role="menu">
    <button type="button" class="item">Duplicate lesson</button>
    <button type="button" class="item">Copy markdown link</button>
    <button type="button" class="item danger">Archive draft</button>
  </div>
</div>`,
              css: `:root { --ease-out: cubic-bezier(0.23, 1, 0.32, 1); }
body { font-family: system-ui, sans-serif; padding: 24px; color: #18181b; }
.wrap { position: relative; display: inline-block; }
.trigger { padding: 9px 14px; border-radius: 8px; border: 1px solid #d4d4d8; background: white; font-weight: 600; font-size: 14px; cursor: pointer; transition: transform 140ms var(--ease-out), background-color 140ms ease; }
.trigger:hover { background: #f4f4f5; }
.trigger:active { transform: scale(0.97); }
.popover { position: absolute; top: calc(100% + 6px); left: 0; min-width: 190px; padding: 6px; border-radius: 12px; border: 1px solid #e4e4e7; background: white; box-shadow: 0 10px 24px rgba(0,0,0,0.08); transform-origin: top left; opacity: 0; pointer-events: none; transform: scale(0.95) translateY(-4px); transition: opacity 180ms var(--ease-out), transform 180ms var(--ease-out); }
.popover.open { opacity: 1; pointer-events: auto; transform: scale(1) translateY(0); }
.item { width: 100%; text-align: left; padding: 8px 10px; border: none; border-radius: 7px; background: transparent; font-size: 13px; cursor: pointer; }
.item:hover { background: #f4f4f5; }
.item.danger { color: #dc2626; }
@media (prefers-reduced-motion: reduce) {
  .trigger, .popover { transition: none; transform: none; }
}`,
              js: `const btn = document.getElementById('btn');
const menu = document.getElementById('menu');
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(open));
  console.log('Popover open:', open);
});`,
            },
          },
          tip: 'Use will-change: transform sparingly only on elements actively animating when you see subpixel jitter—putting will-change on dozens of elements wastes GPU memory.',
        },
      ],
      challenge: {
        prompt:
          'Define :root semantic tokens (--surface, --ink, --accent, --ease-out), override them inside a .dark class with color-scheme: dark, style a .primary-btn with a 160ms transform transition and scale(0.97) on :active, and disable transitions inside @media (prefers-reduced-motion: reduce).',
        hint: 'Specify transition: transform 160ms var(--ease-out) rather than transition: all.',
        language: 'css',
        solutionCode: `:root {
  color-scheme: light;
  --surface: #ffffff;
  --ink: #18181b;
  --accent: #2563eb;
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
}

.dark {
  color-scheme: dark;
  --surface: #18181b;
  --ink: #fafafa;
  --accent: #3b82f6;
}

.primary-btn {
  background: var(--accent);
  color: white;
  transition: transform 160ms var(--ease-out);
}

.primary-btn:active {
  transform: scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .primary-btn {
    transition: none;
  }
}`,
      },
      quiz: [
        {
          question:
            'Which pair of CSS properties can the browser animate on the GPU compositor thread without triggering layout recalculation?',
          options: [
            'width and height',
            'top and left',
            'transform and opacity',
            'margin and padding',
          ],
          answer: 2,
          explanation:
            'Animating transform and opacity skips Layout and Paint stages, keeping animations smooth at 60fps+ even on low-end mobile devices.',
        },
        {
          question:
            'Why should dropdowns and popovers enter with ease-out from scale(0.95) rather than ease-in from scale(0)?',
          options: [
            'scale(0) causes a JavaScript exception',
            'ease-out starts responsive and settles naturally, while scale(0.95) avoids an overly bouncy, cartoonish pop',
            'ease-in is not supported in CSS transitions',
            'scale(0.95) reduces CSS file size',
          ],
          answer: 1,
          explanation:
            'ease-in starts sluggish and ends abruptly, making UI feel unresponsive; ease-out paired with subtle scale(0.95) -> 1 feels crisp and immediate.',
        },
      ],
    },
    km: {
      duration: '13 នាទី',
      objectives: [
        'រៀបចំ CSS custom properties ជាពីរជាន់ (primitive tokens + semantic UI tokens) សម្រាប់ប្ដូរ theme និង dark mode។',
        'រក្សាចលនា UI រលូន 60fps ដោយធ្វើចលនាតែលើ transform និង opacity។',
        'ជ្រើសរើសខ្សែកោង ease-out សមរម្យ ប្រតិកម្មចុច :active និងគោរព prefers-reduced-motion។',
      ],
      extraSections: [
        {
          id: 'token-architecture-and-theming',
          heading: 'ស្ថាបត្យកម្ម Design Tokens ពីរជាន់ និង color-scheme',
          body: [
            'ប្រព័ន្ធរចនាកម្រិតផលិតកម្មបែងចែកអថេរ CSS ជាពីរជាន់៖ primitive tokens (--blue-600, --zinc-900) ផ្ទុកតម្លៃពណ៌ដើម រីឯ semantic tokens (--surface, --text-primary, --accent) បញ្ជាក់តួនាទីប្រើប្រាស់។ សមាសធាតុយោងតែ semantic tokens ប៉ុណ្ណោះ ដូច្នេះការប្ដូរទៅ dark mode គ្រាន់តែកែតម្លៃអថេរមួយចំនួនតូច។',
            'ភ្ជាប់ថ្នាក់ .dark ជាមួយ color-scheme: dark ដើម្បីឱ្យរបាររំកិល checkbox និងប្រតិទិនដើមរបស់កម្មវិធីរុករកប្ដូរជាពណ៌ងងឹតដោយស្វ័យប្រវត្តិ។',
          ],
          points: [
            'ដាក់តម្លៃបម្រុងក្នុង var(--accent, #2563eb) ពេលសរសេរសមាសធាតុដែលចែករំលែកឆ្លងគម្រោង។',
            'កុំសរសេរ transition: all—ត្រូវបញ្ជាក់លក្ខណៈសម្បត្តិជាក់លាក់ដូច transition: transform 180ms var(--ease-out), opacity 180ms ease;។',
            'រក្សារយៈពេលចលនា UI ឱ្យខ្លីរហ័ស (150ms–250ms); យឺតជាង 300ms ធ្វើឱ្យកម្មវិធីមានអារម្មណ៍យឺត។',
          ],
          table: {
            headers: ['លក្ខណៈសម្បត្តិ / ច្បាប់', 'តួនាទីល្បឿន / UX', 'ការណែនាំ'],
            rows: [
              [
                'transform, opacity',
                'GPU-composited (គ្មាន layout)',
                'ប្រើសម្រាប់ចលនា 60fps លើ drawer, popover និងប៊ូតុង។',
              ],
              [
                'width, height, top, left',
                'បង្ក Layout + Paint រាល់ហ្វ្រេម',
                'កុំធ្វើចលនាលើវា—ប្រើ transform: translate/scale វិញ។',
              ],
              [
                'cubic-bezier(0.23, 1, 0.32, 1)',
                'ខ្សែកោង ease-out រហ័ស',
                'ល្អបំផុតសម្រាប់ម៉ឺនុយ toast និងធាតុបង្ហាញចូល។',
              ],
              [
                'transform: scale(0.97)',
                'ប្រតិកម្មចុច :active',
                'ផ្ដល់អារម្មណ៍ឆ្លើយតបភ្លាមៗពេលចុចប៊ូតុង។',
              ],
              [
                '@media (prefers-reduced-motion: reduce)',
                'ច្បាប់ភាពងាយស្រួលប្រើប្រាស់',
                'បិទ ឬបន្ថយចលនាសម្រាប់អ្នកប្រើដែលងាយវិលមុខ។',
              ],
            ],
          },
          warning:
            'ការធ្វើចលនាលើ width, height, margin ឬ top បង្ខំឱ្យកម្មវិធីរុករកគណនាប្លង់ឡើងវិញ 60 ដងក្នុងមួយវិនាទី ដែលធ្វើឱ្យទាក់លើទូរស័ព្ទ។ តែងតែជំនួស top/left ដោយ transform: translateY() / translateX()។',
        },
        {
          id: 'easing-curves-and-reduced-motion',
          heading: 'ខ្សែកោង Easing, ចំណុចផ្ដើម Popover និង Reduced Motion',
          body: [
            'ចលនា UI ល្អមានអារម្មណ៍រហ័សទាន់ចិត្ត មិនមែនលេងសើចហួសហេតុទេ។ ធាតុដែលលេចចេញ (popover, modal, toast) គួរប្រើ ease-out និងចាប់ផ្ដើមពី scale(0.95) ទៅ 1 ជាមួយ opacity—កុំចាប់ផ្ដើមពី scale(0)។ សម្រាប់ម៉ឺនុយទម្លាក់ចុះ កំណត់ transform-origin នៅទីតាំងប៊ូតុងចុច។',
            'ត្រូវដាក់ @media (prefers-reduced-motion: reduce) ជានិច្ច ដើម្បីលុបចលនាផ្លាស់ទីសម្រាប់អ្នកប្រើដែលបានបើកការកំណត់បន្ថយចលនាក្នុងប្រព័ន្ធប្រតិបត្តិការ។',
          ],
          exampleTitle: 'ចលនា Popover 60fps ជាមួយការគាំទ្រ Reduced Motion',
          tip: 'ប្រើ will-change: transform តែពេលចាំបាច់លើធាតុដែលមានបញ្ហារង្គើ subpixel ប៉ុណ្ណោះ—ការដាក់លើគ្រប់ធាតុខ្ជះខ្ជាយអង្គចងចាំ GPU។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើត semantic tokens ក្នុង :root (--surface, --ink, --accent, --ease-out), កែតម្លៃក្នុង .dark ជាមួយ color-scheme: dark, រចនា .primary-btn ដោយប្រើ transition លើ transform 160ms និង scale(0.97) ពេល :active ព្រមទាំងបិទ transition ក្នុង @media (prefers-reduced-motion: reduce)។',
        hint: 'សរសេរ transition: transform 160ms var(--ease-out) ជំនួសឱ្យ transition: all។',
      },
      quiz: [
        {
          question:
            'តើគូលក្ខណៈសម្បត្តិ CSS មួយណាដែលកម្មវិធីរុករកអាចធ្វើចលនាលើ GPU ដោយមិនគណនាប្លង់ឡើងវិញ?',
          options: [
            'width និង height',
            'top និង left',
            'transform និង opacity',
            'margin និង padding',
          ],
          answer: 2,
          explanation:
            'ការធ្វើចលនាលើ transform និង opacity រំលងដំណាក់កាល Layout និង Paint ធ្វើឱ្យរលូន 60fps សូម្បីលើទូរស័ព្ទកម្រិតមធ្យម។',
        },
        {
          question:
            'ហេតុអ្វីបានជាម៉ឺនុយ និង popover គួរចូលដោយ ease-out ពី scale(0.95) ជំនួសឱ្យ ease-in ពី scale(0)?',
          options: [
            'ព្រោះ scale(0) បង្កកំហុសក្នុង JavaScript',
            'ព្រោះ ease-out ចាប់ផ្ដើមរហ័ស និងឈប់រលូន ហើយ scale(0.95) មើលទៅស្ងប់ស្អាតមិនលោតហួសហេតុ',
            'ព្រោះ CSS transition មិនគាំទ្រ ease-in ទេ',
            'ព្រោះ scale(0.95) បន្ថយទំហំឯកសារ CSS',
          ],
          answer: 1,
          explanation:
            'ease-in ចាប់ផ្ដើមយឺតធ្វើឱ្យ UI មានអារម្មណ៍យឺតយ៉ាវ រីឯ ease-out រួមជាមួយ scale(0.95) ទៅ 1 ឆ្លើយតបភ្លាមៗ និងទំនើប។',
        },
      ],
    },
  },

  // =========================================================================
  // JAVASCRIPT TRACK (7 Lessons)
  // =========================================================================

  'javascript/js-from-zero': {
    en: {
      duration: '10 min',
      objectives: [
        'Compare values reliably with strict equality (=== / !==) and combine logic with &&, ||, and !.',
        'Identify all JavaScript falsy values so conditional checks never surprise you.',
        'Choose the right loop (for, for...of, while) and use break/continue and console debugging effectively.',
      ],
      extraSections: [
        {
          id: 'operators-and-truthy-falsy',
          heading: 'Strict Equality (===), Logic & Truthy/Falsy Values',
          body: [
            'JavaScript has two equality operators: loose equality (==) silently converts types before comparing, so 0 == "" and "5" == 5 evaluate to true. Strict equality (===) checks both value AND type, eliminating an entire class of subtle bugs—use === and !== everywhere by default.',
            'Inside an if (...) condition, JavaScript converts any value to a boolean. Only seven values are falsy: false, 0, -0, 0n, "", null, undefined, and NaN. Everything else—including "0", "false", empty arrays [], and empty objects {}—is truthy.',
          ],
          table: {
            headers: ['Operator / Value', 'Meaning', 'Example Result'],
            rows: [
              ['=== / !==', 'Strict equality / inequality', '"5" === 5 -> false; 5 === 5 -> true.'],
              ['&& (AND)', 'True only if both sides are truthy', 'isLoggedIn && isAdmin.'],
              ['|| (OR)', 'Returns first truthy value', 'userRole || "guest".'],
              ['cond ? a : b', 'Ternary conditional expression', 'score >= 70 ? "Pass" : "Retry".'],
              [
                'Falsy values',
                'false, 0, "", null, undefined, NaN',
                'if ("") is false; if ([]) is true!',
              ],
            ],
          },
          warning:
            'Never rely on == for comparisons, and be careful when checking numbers like if (count): when count is 0, 0 is falsy! Check count !== undefined or Number.isFinite(count) instead.',
        },
        {
          id: 'loops-and-debugging',
          heading: 'for...of Loops, switch & Everyday Debugging',
          body: [
            'Use a classic for (let i = 0; i < n; i++) loop when you need numeric indices, a for (const item of list) loop when reading every item in an array cleanly, and a while loop when repeating until a condition changes (like reading input until valid).',
            'When code behaves unexpectedly, console.log({ score, grade }) prints labeled variables, console.table(items) formats arrays of objects as a clean table in DevTools, and writing debugger; pauses execution so you can step line-by-line.',
          ],
          points: [
            'Use break to exit a loop early once you find a match, and continue to skip only the current iteration.',
            'Always verify loop termination conditions in while loops so you never accidentally create an infinite loop.',
            'Prefer early returns inside functions over deeply nested if / else chains to keep logic flat and readable.',
          ],
          example: {
            title: 'Grade Calculator with for...of & switch',
            language: 'javascript',
            code: `const scores = [95, 82, 68, 54];

function letterGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  return 'Retry';
}

for (const score of scores) {
  console.log(\`\${score} -> \${letterGrade(score)}\`);
}`,
            playground: {
              html: `<div class="wrap">
  <h3>Exam Results</h3>
  <ul id="results"></ul>
  <p id="summary"></p>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
h3 { margin: 0 0 10px; font-size: 16px; }
ul { margin: 0; padding-left: 20px; line-height: 1.8; font-size: 14px; }
#summary { margin-top: 12px; font-weight: 600; font-size: 14px; color: #2563eb; }`,
              js: `const scores = [95, 82, 68, 74, 54];
let passed = 0;
const list = document.getElementById('results');

for (const score of scores) {
  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'Retry';
  if (score >= 70) passed += 1;
  const li = document.createElement('li');
  li.textContent = \`Score \${score}: \${grade}\`;
  list.appendChild(li);
}

document.getElementById('summary').textContent = \`Passed: \${passed} / \${scores.length}\`;
console.log({ total: scores.length, passed });`,
            },
          },
          tip: 'Wrap values in curly braces when logging—console.log({ score, passed })—so DevTools prints both the variable name and value automatically.',
        },
      ],
      challenge: {
        prompt:
          'Write a JavaScript function sumPassing(scores) that loops over an array of numbers with for...of, skips any score below 70 using continue, and returns the sum of all passing scores.',
        hint: 'Initialize let total = 0; inside the function, use if (score < 70) continue;, then add total += score.',
        language: 'javascript',
        solutionCode: `function sumPassing(scores) {
  let total = 0;
  for (const score of scores) {
    if (score < 70) continue;
    total += score;
  }
  return total;
}

console.log(sumPassing([60, 80, 95, 50, 70])); // 245`,
      },
      quiz: [
        {
          question: 'Which expression evaluates to true in JavaScript?',
          options: ['"10" === 10', 'Boolean([])', 'Boolean("")', 'Boolean(NaN)'],
          answer: 1,
          explanation:
            'Empty arrays [] and empty objects {} are truthy in JavaScript, whereas "", 0, null, undefined, and NaN are falsy, and "10" === 10 is false due to different types.',
        },
        {
          question: 'Why should you default to === instead of == in JavaScript?',
          options: [
            '== does not work on strings',
            '=== checks both value and type without unpredictable implicit type coercion',
            '== is only valid inside while loops',
            '=== converts numbers to strings before comparing',
          ],
          answer: 1,
          explanation:
            'Loose equality (==) coerces operands (so 0 == "" is true), which frequently hides bugs; strict equality (===) compares value and type directly.',
        },
      ],
    },
    km: {
      duration: '10 នាទី',
      objectives: [
        'ប្រៀបធៀបតម្លៃយ៉ាងត្រឹមត្រូវដោយប្រើ strict equality (=== / !==) និងភ្ជាប់លក្ខខណ្ឌដោយ &&, || និង !។',
        'ស្គាល់តម្លៃ falsy ទាំងអស់ក្នុង JavaScript ដើម្បីកុំឱ្យលក្ខខណ្ឌ if ផ្ដល់លទ្ធផលខុសការរំពឹងទុក។',
        'ជ្រើសរើសរង្វិលជុំសមរម្យ (for, for...of, while), ប្រើ break/continue និង debug ដោយ console។',
      ],
      extraSections: [
        {
          id: 'operators-and-truthy-falsy',
          heading: 'ការប្រៀបធៀបតឹងរ៉ឹង (===), តក្កវិជ្ជា និងតម្លៃ Truthy/Falsy',
          body: [
            'JavaScript មានសញ្ញាប្រៀបធៀបពីរ៖ == បម្លែងប្រភេទទិន្នន័យដោយស្ងៀមស្ងាត់មុនប្រៀបធៀប ធ្វើឱ្យ 0 == "" និង "5" == 5 ក្លាយជា true។ ចំណែក === ពិនិត្យទាំងតម្លៃ និងប្រភេទទិន្នន័យ ជួយលុបបំបាត់កំហុសលាក់កំបាំង—គួរប្រើ === និង !== គ្រប់ទីកន្លែង។',
            'នៅក្នុងលក្ខខណ្ឌ if (...) JavaScript បម្លែងតម្លៃណាមួយទៅជា boolean។ មានតម្លៃ falsy តែប៉ុន្មានប៉ុណ្ណោះគឺ៖ false, 0, -0, 0n, "", null, undefined និង NaN។ ក្រៅពីនោះ—រួមទាំង "0", "false", អារេទទេ [] និង object ទទេ {}—សុទ្ធតែជា truthy។',
          ],
          table: {
            headers: ['ប្រមាណវិធី / តម្លៃ', 'អត្ថន័យ', 'លទ្ធផលឧទាហរណ៍'],
            rows: [
              ['=== / !==', 'ស្មើ / មិនស្មើតឹងរ៉ឹង', '"5" === 5 -> false; 5 === 5 -> true។'],
              ['&& (AND)', 'ពិតលុះត្រាទាំងសងខាង truthy', 'isLoggedIn && isAdmin។'],
              ['|| (OR)', 'ត្រឡប់តម្លៃ truthy ដំបូង', 'userRole || "guest"។'],
              ['cond ? a : b', 'ប្រមាណវិធី Ternary ខ្លី', 'score >= 70 ? "Pass" : "Retry"។'],
              [
                'តម្លៃ Falsy',
                'false, 0, "", null, undefined, NaN',
                'if ("") ជា false; if ([]) ជា true!',
              ],
            ],
          },
          warning:
            'កុំប្រើ == សម្រាប់ប្រៀបធៀប ហើយត្រូវប្រយ័ត្នពេលពិនិត្យលេខដូច if (count)៖ ពេល count ស្មើ 0 លេខ 0 ជា falsy! គួរពិនិត្យ count !== undefined វិញ។',
        },
        {
          id: 'loops-and-debugging',
          heading: 'រង្វិលជុំ for...of, switch និងការ Debug ប្រចាំថ្ងៃ',
          body: [
            'ប្រើ for (let i = 0; i < n; i++) ពេលត្រូវការលេខសន្ទស្សន៍ ប្រើ for (const item of list) ពេលអានធាតុនីមួយៗក្នុងអារេយ៉ាងស្អាត និងប្រើ while ពេលចង់រត់រហូតដល់លក្ខខណ្ឌប្រែប្រួល។',
            'ពេលកូដដំណើរការខុសពីការរំពឹងទុក console.log({ score, grade }) បង្ហាញឈ្មោះអថេរជាមួយតម្លៃ, console.table(items) បង្ហាញអារេជាតារាងស្អាតក្នុង DevTools ហើយការសរសេរ debugger; ផ្អាកកូដដើម្បីពិនិត្យម្ដងមួយបន្ទាត់។',
          ],
          points: [
            'ប្រើ break ដើម្បីចេញពីរង្វិលជុំភ្លាមពេលរកឃើញ និង continue ដើម្បីរំលងតែជុំបច្ចុប្បន្ន។',
            'ពិនិត្យលក្ខខណ្ឌឈប់ក្នុង while loop ជានិច្ច ដើម្បីកុំឱ្យកើតរង្វិលជុំគ្មានទីបញ្ចប់។',
            'គួរប្រើ early return ក្នុងអនុគមន៍ជំនួសឱ្យ if / else ត្រួតគ្នាច្រើនជាន់។',
          ],
          exampleTitle: 'កម្មវិធីគណនានិទ្ទេសដោយ for...of',
          tip: 'រុំអថេរក្នុងវង់ក្រចកកោងពេល log—console.log({ score, passed })—ដើម្បីឱ្យ DevTools បង្ហាញទាំងឈ្មោះ និងតម្លៃដោយស្វ័យប្រវត្តិ។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ JavaScript ឈ្មោះ sumPassing(scores) ដែលរត់ឆ្លងកាត់អារេលេខដោយ for...of រំលងពិន្ទុក្រោម 70 ដោយប្រើ continue ហើយត្រឡប់ផលបូកនៃពិន្ទុជាប់ទាំងអស់។',
        hint: 'បង្កើត let total = 0; ក្នុងអនុគមន៍ ប្រើ if (score < 70) continue; រួចបូក total += score។',
      },
      quiz: [
        {
          question: 'តើកន្សោមមួយណាផ្ដល់តម្លៃ true ក្នុង JavaScript?',
          options: ['"10" === 10', 'Boolean([])', 'Boolean("")', 'Boolean(NaN)'],
          answer: 1,
          explanation:
            'អារេទទេ [] និង object ទទេ {} សុទ្ធតែជា truthy ក្នុង JavaScript ចំណែក "", 0, null, undefined និង NaN ជា falsy ហើយ "10" === 10 ជា false។',
        },
        {
          question: 'ហេតុអ្វីបានជាអ្នកគួរប្រើ === ជំនួស == ក្នុង JavaScript?',
          options: [
            '== មិនដំណើរការលើអត្ថបទ (string) ទេ',
            '=== ពិនិត្យទាំងតម្លៃ និងប្រភេទទិន្នន័យដោយមិនបម្លែងប្រភេទដោយស្វ័យប្រវត្តិ',
            '== ប្រើបានតែក្នុង while loop',
            '=== បម្លែងលេខជាអត្ថបទមុនប្រៀបធៀប',
          ],
          answer: 1,
          explanation:
            '== បម្លែងប្រភេទដោយស្ងៀមស្ងាត់ (ដូចជា 0 == "" ក្លាយជា true) ដែលបង្កកំហុសងាយ ចំណែក === ប្រៀបធៀបទាំងតម្លៃ និងប្រភេទដោយត្រង់។',
        },
      ],
    },
  },

  'javascript/variables-and-types': {
    en: {
      duration: '12 min',
      objectives: [
        'Distinguish JavaScript primitives (copied by value) from objects/arrays (copied by reference).',
        'Explain why const prevents reassignment, not mutation of an object’s properties.',
        'Unpack data cleanly with destructuring, spread/rest (...), optional chaining (?.), and nullish coalescing (??).',
      ],
      extraSections: [
        {
          id: 'primitives-vs-references',
          heading: 'Primitives vs References & const Mutation',
          body: [
            'JavaScript has seven primitive types (string, number, boolean, undefined, null, symbol, bigint) and one structural type: object (which includes plain objects, arrays, and functions). Primitives are copied by value—changing a copy never affects the original. Objects are copied by reference—assigning const b = a points both variables at the exact same object in memory.',
            'This explains a huge beginner surprise: const user = { name: "Dara" }; user.name = "Sora"; is completely valid! const locks the variable binding (you cannot reassign user = {}), not the internal properties inside the object. When you need an independent copy, clone with spread ({ ...user }) or structuredClone(user) for nested objects.',
          ],
          table: {
            headers: ['Type / Check', 'Example', 'Gotcha / Key Fact'],
            rows: [
              [
                'string / number / boolean',
                '"hi", 42, true',
                'Immutable primitives copied by value.',
              ],
              [
                'undefined vs null',
                'let x; / const y = null',
                'undefined = not set yet; null = intentionally empty.',
              ],
              [
                'typeof null',
                '"object" (historical bug)',
                'Check value === null directly, never typeof.',
              ],
              [
                'Array.isArray(x)',
                'Array.isArray([1, 2]) -> true',
                'typeof [1, 2] returns "object", so use Array.isArray().',
              ],
              [
                'structuredClone(obj)',
                'Deep clone nested data',
                'Clones nested arrays/objects safely without shared refs.',
              ],
            ],
          },
          warning:
            'Shallow copying with { ...obj } only copies top-level keys! If obj has a nested object (like user.address.city), mutating copy.address.city will still mutate the original unless you copy that nested level or use structuredClone().',
        },
        {
          id: 'destructuring-spread-and-optional',
          heading: 'Destructuring, Optional Chaining (?.) & Nullish Coalescing (??)',
          body: [
            'Modern JavaScript lets you extract object properties and array items concisely with destructuring: const { name, role = "student" } = user;. Combined with the spread operator (...), you can produce updated objects without mutating originals: const nextUser = { ...user, active: true };.',
            'When working with API responses where nested fields might be missing, optional chaining (user?.profile?.avatar) safely returns undefined instead of throwing a TypeError crash. Pair it with nullish coalescing (??) to supply defaults only when a value is null or undefined—preserving legitimate 0 or "" values that || would mistakenly overwrite.',
          ],
          points: [
            'Prefer ?? over || for default numbers or strings so 0 ?? 10 stays 0 instead of jumping to 10.',
            'Use Number("42") or Number.parseInt("42px", 10) for explicit conversions instead of relying on + tricks.',
            'Check invalid math results with Number.isNaN(val) instead of val === NaN (because NaN !== NaN is always true!).',
          ],
          example: {
            title: 'Safe Profile Reader with Destructuring, ?. and ??',
            language: 'javascript',
            code: `const user = {
  name: 'Vanna',
  stats: { streak: 0 },
};

const { name, role = 'learner' } = user;
const streak = user.stats?.streak ?? 1;   // Keeps 0!
const city = user.address?.city ?? 'Phnom Penh';

const promoted = { ...user, role: 'mentor' };
console.log({ name, role, streak, city, promoted });`,
            playground: {
              html: `<pre id="out" style="font-family: monospace; padding: 18px; line-height: 1.6;"></pre>`,
              css: `body { margin: 0; background: #fafafa; color: #18181b; }`,
              js: `const user = { name: 'Vanna', stats: { streak: 0 } };

const { name, role = 'learner' } = user;
const withNullish = user.stats?.streak ?? 10; // 0 (correct!)
const withOr = user.stats?.streak || 10;      // 10 (bug: overwrote 0!)
const city = user.address?.city ?? 'Unknown city';

const updated = { ...user, role: 'pro' };

const report = { name, role, withNullish, withOr, city, originalHasRole: 'role' in user, updatedRole: updated.role };
document.getElementById('out').textContent = JSON.stringify(report, null, 2);
console.log(report);`,
            },
          },
          tip: 'Use Object.freeze(config) during development if you want JavaScript to prevent accidental property mutations on a shared constant object.',
        },
      ],
      challenge: {
        prompt:
          'Given const settings = { theme: "dark", retries: 0 }, destructure theme and retries, create a new object nextSettings using spread with retries set to 3 (without mutating settings), and read settings.notifications?.email ?? false.',
        hint: 'Use const { theme, retries } = settings; and const nextSettings = { ...settings, retries: 3 };.',
        language: 'javascript',
        solutionCode: `const settings = { theme: 'dark', retries: 0 };

const { theme, retries } = settings;
const nextSettings = { ...settings, retries: 3 };
const emailAlerts = settings.notifications?.email ?? false;

console.log({ theme, retries, nextSettings, emailAlerts });`,
      },
      quiz: [
        {
          question: 'What is the value of const count = 0; const result = count ?? 5;?',
          options: ['5', '0', 'undefined', 'false'],
          answer: 1,
          explanation:
            'The nullish coalescing operator (??) falls back to the right-hand value ONLY when the left side is null or undefined—so 0 is preserved.',
        },
        {
          question: 'Why does const a = { x: 1 }; const b = a; b.x = 9; change a.x to 9?',
          options: [
            'Because const variables are global',
            'Because objects are assigned by reference, so a and b point to the same object in memory',
            'Because numbers inside objects cannot be copied',
            'Because b was not declared with let',
          ],
          answer: 1,
          explanation:
            'Assigning an object copies its memory reference, not its properties. Use { ...a } or structuredClone(a) to create an independent copy.',
        },
      ],
    },
    km: {
      duration: '12 នាទី',
      objectives: [
        'បែងចែករវាង primitives (ចម្លងតាមតម្លៃ) និង objects/arrays (ចម្លងតាមទីតាំងយោង reference)។',
        'ពន្យល់ពីមូលហេតុដែល const ហាមឃាត់ការកំណត់តម្លៃថ្មីឱ្យអថេរ តែមិនហាមការកែលក្ខណៈសម្បត្តិខាងក្នុង object ទេ។',
        'ទាញយកទិន្នន័យយ៉ាងស្អាតដោយ destructuring, spread (...), optional chaining (?.) និង nullish coalescing (??)។',
      ],
      extraSections: [
        {
          id: 'primitives-vs-references',
          heading: 'Primitives ទល់នឹង References និងការកែប្រែក្នុង const',
          body: [
            'JavaScript មានប្រភេទ primitive ប្រាំពីរ (string, number, boolean, undefined, null, symbol, bigint) និងប្រភេទ object (រួមទាំង plain object, array និង function)។ Primitive ត្រូវបានចម្លងតាមតម្លៃ—ការកែច្បាប់ចម្លងមិនប៉ះពាល់ដើមឡើយ។ ចំណែក object ចម្លងតាម reference—ការសរសេរ const b = a ធ្វើឱ្យអថេរទាំងពីរចង្អុលទៅ object តែមួយក្នុងអង្គចងចាំ។',
            'នេះពន្យល់ពីអ្វីដែលអ្នកថ្មីតែងឆ្ងល់៖ const user = { name: "Dara" }; user.name = "Sora"; ដំណើរការធម្មតា! const ចាក់សោតែការភ្ជាប់ឈ្មោះអថេរ (មិនអាចសរសេរ user = {}) មិនមែនលក្ខណៈសម្បត្តិខាងក្នុងទេ។ បើចង់បានច្បាប់ចម្លងឯករាជ្យ សូមប្រើ { ...user } ឬ structuredClone(user) សម្រាប់ object ត្រួតជាន់។',
          ],
          table: {
            headers: ['ប្រភេទ / ការពិនិត្យ', 'ឧទាហរណ៍', 'ចំណុចសំខាន់គួរចាំ'],
            rows: [
              [
                'string / number / boolean',
                '"hi", 42, true',
                'Primitives មិនផ្លាស់ប្ដូរ ចម្លងតាមតម្លៃ។',
              ],
              [
                'undefined vs null',
                'let x; / const y = null',
                'undefined = មិនទាន់ផ្ដល់តម្លៃ; null = ទទេដោយចេតនា។',
              ],
              [
                'typeof null',
                '"object" (កំហុសប្រវត្តិសាស្ត្រ)',
                'ពិនិត្យ value === null ផ្ទាល់ កុំប្រើ typeof។',
              ],
              [
                'Array.isArray(x)',
                'Array.isArray([1, 2]) -> true',
                'typeof [1, 2] ត្រឡប់ "object" ដូច្នេះត្រូវប្រើ Array.isArray()។',
              ],
              [
                'structuredClone(obj)',
                'ចម្លងជ្រៅគ្រប់ជាន់',
                'ចម្លង object/array ត្រួតជាន់ដោយសុវត្ថិភាព។',
              ],
            ],
          },
          warning:
            'ការចម្លងដោយ { ...obj } ចម្លងតែជាន់លើបំផុតប៉ុណ្ណោះ! បើមាន object ខាងក្នុង (ដូចជា user.address.city) ការកែ copy.address.city នឹងប៉ះពាល់ដើមដែរ លុះត្រាប្រើ structuredClone()។',
        },
        {
          id: 'destructuring-spread-and-optional',
          heading: 'Destructuring, Optional Chaining (?.) និង Nullish Coalescing (??)',
          body: [
            'JavaScript ទំនើបអនុញ្ញាតឱ្យទាញយកតម្លៃពី object និង array យ៉ាងខ្លីដោយ destructuring៖ const { name, role = "student" } = user;។ រួមជាមួយ spread (...) អ្នកអាចបង្កើត object ថ្មីដែលបានកែដោយមិនប៉ះពាល់ object ដើម៖ const nextUser = { ...user, active: true };។',
            'ពេលអានទិន្នន័យ API ដែលអាចខ្វះជួរខ្លះ optional chaining (user?.profile?.avatar) ត្រឡប់ undefined ដោយសុវត្ថិភាពជំនួសឱ្យការគាំងកម្មវិធី។ ភ្ជាប់វាជាមួយ ?? ដើម្បីផ្ដល់តម្លៃលំនាំដើមតែពេលជា null ឬ undefined—រក្សាតម្លៃ 0 ឬ "" ឱ្យនៅដដែល។',
          ],
          points: [
            'ប្រើ ?? ជំនួស || សម្រាប់លេខ ឬអត្ថបទលំនាំដើម ដើម្បីឱ្យ 0 ?? 10 នៅតែជា 0។',
            'ប្រើ Number("42") ឬ Number.parseInt("42px", 10) សម្រាប់ការបម្លែងប្រភេទឱ្យច្បាស់លាស់។',
            'ពិនិត្យតម្លៃ NaN ដោយ Number.isNaN(val) ជំនួសឱ្យ val === NaN (ព្រោះ NaN === NaN តែងតែជា false)។',
          ],
          exampleTitle: 'ការអាន Profile ដោយសុវត្ថិភាពជាមួយ Destructuring, ?. និង ??',
          tip: 'ប្រើ Object.freeze(config) ពេលអភិវឌ្ឍ ដើម្បីការពារការកែប្រែលក្ខណៈសម្បត្តិដោយអចេតនាលើ object កំណត់រចនាសម្ព័ន្ធថេរ។',
        },
      ],
      challenge: {
        prompt:
          'ដោយមាន const settings = { theme: "dark", retries: 0 } ចូរ destructure យក theme និង retries, បង្កើត object ថ្មីឈ្មោះ nextSettings ដោយ spread កំណត់ retries ជា 3 (មិនត្រូវកែ settings ដើមទេ) និងអាន settings.notifications?.email ?? false។',
        hint: 'ប្រើ const { theme, retries } = settings; និង const nextSettings = { ...settings, retries: 3 };។',
      },
      quiz: [
        {
          question: 'តើតម្លៃរបស់ result គឺជាអ្វីក្នុង const count = 0; const result = count ?? 5;?',
          options: ['5', '0', 'undefined', 'false'],
          answer: 1,
          explanation:
            'ប្រមាណវិធី ?? ប្រើតម្លៃខាងស្ដាំលុះត្រាតែខាងឆ្វេងជា null ឬ undefined ប៉ុណ្ណោះ—ដូច្នេះលេខ 0 ត្រូវបានរក្សាទុក។',
        },
        {
          question:
            'ហេតុអ្វីបានជា const a = { x: 1 }; const b = a; b.x = 9; ធ្វើឱ្យ a.x ប្ដូរជា 9 ដែរ?',
          options: [
            'ព្រោះអថេរ const ជាអថេរសកល',
            'ព្រោះ object ត្រូវបានផ្ទេរតាម reference ធ្វើឱ្យ a និង b ចង្អុលទៅ object តែមួយក្នុងអង្គចងចាំ',
            'ព្រោះលេខក្នុង object មិនអាចចម្លងបានទេ',
            'ព្រោះ b មិនបានប្រកាសដោយ let',
          ],
          answer: 1,
          explanation:
            'ការកំណត់ b = a ចម្លងតែអាសយដ្ឋានយោង មិនមែនបង្កើត object ថ្មីទេ។ ប្រើ { ...a } ឬ structuredClone(a) ដើម្បីបង្កើតច្បាប់ចម្លងឯករាជ្យ។',
        },
      ],
    },
  },

  'javascript/functions-and-scope': {
    en: {
      duration: '12 min',
      objectives: [
        'Compare function declarations, function expressions, and arrow functions (including hoisting and lexical this).',
        'Understand block scope vs function scope and explain how closures preserve private state across calls.',
        'Write cleaner, easier-to-test code using pure functions, rest parameters (...args), and higher-order callbacks.',
      ],
      extraSections: [
        {
          id: 'lexical-scope-and-closures',
          heading: 'Lexical Scope, Hoisting & Closures in Practice',
          body: [
            'Variables declared with let and const are block-scoped—they exist only inside the nearest { ... } block (if, for, or function). Function declarations (function add() {}) are hoisted to the top of their scope so they can be called before their definition, whereas arrow functions stored in const follow the Temporal Dead Zone and must be declared before use.',
            'A closure happens whenever an inner function remembers variables from its outer function even after the outer function has finished running. Closures power real-world patterns every day: event handlers, React/Vue composables, private counters, and memoized caches.',
          ],
          table: {
            headers: ['Form', 'Hoisted?', 'Own `this`?', 'Best For'],
            rows: [
              [
                'function calc(x) {}',
                'Yes',
                'Yes (dynamic)',
                'Top-level named helpers and recursive functions.',
              ],
              [
                'const f = (x) => x * 2',
                'No',
                'No (lexical)',
                'Short callbacks (.map, .filter, event listeners).',
              ],
              [
                '(...nums) => ...',
                'No',
                'No',
                'Rest parameters collecting variable argument counts.',
              ],
              [
                'Closure factory',
                'N/A',
                'Captures outer scope',
                'Encapsulating private state without global variables.',
              ],
            ],
          },
          warning:
            'Avoid var in loops! Because var is function-scoped (not block-scoped), async callbacks created inside for (var i = 0; i < 3; i++) all share the final value 3 instead of 0, 1, 2. Using let fixes this automatically.',
        },
        {
          id: 'higher-order-and-pure-functions',
          heading: 'Higher-Order Functions & Pure Function Design',
          body: [
            'In JavaScript, functions are first-class values: you can store them in variables, pass them as callbacks to other functions, or return a newly configured function from a factory (a higher-order function).',
            'Whenever possible, design core business logic as pure functions: given the same inputs, a pure function always returns the same output and causes zero side effects (no mutating external globals or DOM). Pure functions are trivial to reuse, debug, and unit test.',
          ],
          points: [
            'Use implicit return carefully when returning an object literal from an arrow function: wrap it in parentheses like (name) => ({ name, active: true }).',
            'Combine object destructuring with default parameters for self-documenting options: function formatPrice({ amount = 0, currency = "USD" } = {}) {}.',
            'Keep functions focused on a single job; when a function grows past ~30 lines, extract a descriptive helper.',
          ],
          example: {
            title: 'Private Counter Factory Using a Closure',
            language: 'javascript',
            code: `function createCounter(initial = 0) {
  let count = initial; // Private via closure

  return {
    inc: (step = 1) => (count += step),
    reset: () => (count = initial),
    value: () => count,
  };
}

const likes = createCounter(10);
console.log(likes.inc());    // 11
console.log(likes.inc(5));   // 16`,
            playground: {
              html: `<div class="box">
  <p>Closure-protected count: <strong id="val">10</strong></p>
  <div class="row">
    <button id="inc1">+1</button>
    <button id="inc5">+5</button>
    <button id="reset">Reset</button>
  </div>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.box { display: grid; gap: 10px; max-width: 280px; }
p { margin: 0; font-size: 15px; }
strong { font-variant-numeric: tabular-nums; font-size: 20px; color: #2563eb; }
.row { display: flex; gap: 8px; }
button { padding: 7px 14px; border: 1px solid #d4d4d8; border-radius: 8px; background: white; font-weight: 600; cursor: pointer; }
button:hover { background: #f4f4f5; }`,
              js: `function createCounter(initial = 0) {
  let count = initial;
  return {
    inc: (step = 1) => (count += step),
    reset: () => (count = initial),
    value: () => count,
  };
}

const counter = createCounter(10);
const val = document.getElementById('val');
const render = () => { val.textContent = counter.value(); console.log('Count:', counter.value()); };

document.getElementById('inc1').addEventListener('click', () => { counter.inc(1); render(); });
document.getElementById('inc5').addEventListener('click', () => { counter.inc(5); render(); });
document.getElementById('reset').addEventListener('click', () => { counter.reset(); render(); });`,
            },
          },
          tip: 'When returning an object directly from a one-line arrow function, always wrap the braces in parentheses: const makeUser = (id) => ({ id }); — without parentheses JS treats { } as a function body!',
        },
      ],
      challenge: {
        prompt:
          'Write a higher-order function createMultiplier(factor) that returns a new arrow function taking a number n and returning n * factor. Then create double = createMultiplier(2) and triple = createMultiplier(3) and log double(7) and triple(7).',
        hint: 'Return (n) => n * factor from inside createMultiplier(factor); the inner function closes over factor.',
        language: 'javascript',
        solutionCode: `function createMultiplier(factor) {
  return (n) => n * factor;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(7)); // 14
console.log(triple(7)); // 21`,
      },
      quiz: [
        {
          question:
            'Why does const makeItem = (id) => { id }; return undefined instead of an object?',
          options: [
            'Arrow functions cannot return objects',
            'JavaScript interprets the curly braces { } as a function block body rather than an object literal unless wrapped in parentheses ({ id })',
            'id is a reserved keyword',
            'const functions must use the new keyword',
          ],
          answer: 1,
          explanation:
            'In concise arrow syntax, { ... } starts a block body; wrapping the object in parentheses—(id) => ({ id })—tells the parser to return an object literal.',
        },
        {
          question: 'What is a JavaScript closure?',
          options: [
            'A syntax error caused by a missing closing brace',
            'A function bundled together with references to variables from its enclosing lexical scope even after the outer function returns',
            'A built-in method that closes browser tabs',
            'A way to make variables globally accessible everywhere',
          ],
          answer: 1,
          explanation:
            'A closure retains live access to its outer function’s local variables, enabling private state, factories, and stateful callbacks.',
        },
      ],
    },
    km: {
      duration: '12 នាទី',
      objectives: [
        'ប្រៀបធៀប function declaration, function expression និង arrow function (រួមទាំង hoisting និង lexical this)។',
        'យល់ពី block scope ទល់នឹង function scope និងរបៀបដែល closure រក្សាទិន្នន័យឯកជនឆ្លងការហៅ។',
        'សរសេរកូដស្អាតងាយតេស្តដោយប្រើ pure function, rest parameter (...args) និង higher-order function។',
      ],
      extraSections: [
        {
          id: 'lexical-scope-and-closures',
          heading: 'Lexical Scope, Hoisting និង Closure ក្នុងការអនុវត្តពិត',
          body: [
            'អថេរដែលប្រកាសដោយ let និង const មានដែន block scope—វាមានជីវិតតែក្នុងប្លុក { ... } ជិតបំផុត (if, for ឬ function)។ Function declaration (function add() {}) ត្រូវបាន hoist ឡើងលើ ដូច្នេះអាចហៅមុនបន្ទាត់ប្រកាសបាន ចំណែក arrow function ក្នុង const ត្រូវប្រកាសមុនពេលប្រើ។',
            'Closure កើតឡើងនៅពេលអនុគមន៍ខាងក្នុងចងចាំអថេរពីអនុគមន៍ខាងក្រៅ សូម្បីតែអនុគមន៍ខាងក្រៅបានបញ្ចប់ការរត់រួចហើយក៏ដោយ។ Closure ជាមូលដ្ឋាននៃ event handler, Vue/React composables, counter ឯកជន និង cache។',
          ],
          table: {
            headers: ['ទម្រង់', 'Hoisted?', 'មាន `this` ផ្ទាល់?', 'ស័ក្តិសមសម្រាប់'],
            rows: [
              [
                'function calc(x) {}',
                'បាទ/ចាស',
                'មាន (dynamic)',
                'អនុគមន៍ជំនួយកម្រិតលើ និងអនុគមន៍ហៅខ្លួនឯង។',
              ],
              [
                'const f = (x) => x * 2',
                'ទេ',
                'គ្មាន (lexical)',
                'Callback ខ្លីៗ (.map, .filter, event listeners)។',
              ],
              ['(...nums) => ...', 'ទេ', 'គ្មាន', 'Rest parameter ប្រមូលចំនួនអាគុយម៉ង់មិនកំណត់។'],
              [
                'Closure factory',
                'N/A',
                'ចាប់យក scope ខាងក្រៅ',
                'រក្សាទិន្នន័យឯកជនដោយមិនប្រើអថេរសកល។',
              ],
            ],
          },
          warning:
            'ជៀសវាងប្រើ var ក្នុងរង្វិលជុំ! ព្រោះ var មានដែន function scope មិនមែន block scope ទេ ធ្វើឱ្យ async callback ក្នុង for (var i = 0; i < 3; i++) ឃើញតែលេខ 3 ទាំងអស់។ ការប្រើ let ដោះស្រាយបញ្ហានេះដោយស្វ័យប្រវត្តិ។',
        },
        {
          id: 'higher-order-and-pure-functions',
          heading: 'Higher-Order Functions និងការរចនា Pure Function',
          body: [
            'ក្នុង JavaScript អនុគមន៍គឺជាតម្លៃ first-class៖ អ្នកអាចរក្សាវាក្នុងអថេរ បញ្ជូនវាជា callback ទៅអនុគមន៍ផ្សេង ឬត្រឡប់អនុគមន៍ថ្មីចេញពីអនុគមន៍មួយទៀត (higher-order function)។',
            'ពេលណាអាចធ្វើបាន គួររចនាតក្កវិជ្ជាសំខាន់ៗជា pure function៖ ធាតុចូលដូចគ្នាតែងផ្ដល់លទ្ធផលដូចគ្នា ហើយមិនបង្កផលប៉ះពាល់ក្រៅ (side effects)។ Pure function ងាយប្រើឡើងវិញ ងាយ debug និងងាយសរសេរ unit test។',
          ],
          points: [
            'ប្រយ័ត្នពេលត្រឡប់ object ពី arrow function មួយបន្ទាត់៖ ត្រូវរុំក្នុងវង់ក្រចក (name) => ({ name, active: true })។',
            'ភ្ជាប់ object destructuring ជាមួយតម្លៃលំនាំដើមសម្រាប់ជម្រើសច្បាស់លាស់៖ function formatPrice({ amount = 0, currency = "USD" } = {}) {}។',
            'រក្សាអនុគមន៍នីមួយៗឱ្យធ្វើការងារតែមួយច្បាស់លាស់; បើវែងលើស ~30 បន្ទាត់ គួរបំបែកជាអនុគមន៍ជំនួយ។',
          ],
          exampleTitle: 'Counter ឯកជនដែលបង្កើតដោយ Closure',
          tip: 'ពេលត្រឡប់ object ផ្ទាល់ពី arrow function មួយបន្ទាត់ ត្រូវដាក់វង់ក្រចកជុំវិញជានិច្ច៖ const makeUser = (id) => ({ id }); — បើគ្មានវង់ក្រចក JavaScript គិតថា { } ជាតួអនុគមន៍!',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ higher-order function ឈ្មោះ createMultiplier(factor) ដែលត្រឡប់ arrow function ថ្មីទទួលលេខ n ហើយត្រឡប់ n * factor។ បន្ទាប់មកបង្កើត double = createMultiplier(2) និង triple = createMultiplier(3) រួច log double(7) និង triple(7)។',
        hint: 'ត្រឡប់ (n) => n * factor ពីខាងក្នុង createMultiplier(factor) ដើម្បីឱ្យអនុគមន៍ខាងក្នុងចងចាំ factor តាមរយៈ closure។',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វីបានជា const makeItem = (id) => { id }; ត្រឡប់ undefined ជំនួសឱ្យ object?',
          options: [
            'Arrow function មិនអាចត្រឡប់ object បានទេ',
            'JavaScript ចាត់ទុក { } ជាតួប្លុកអនុគមន៍ មិនមែន object ទេ លុះត្រាដាក់វង់ក្រចក ({ id })',
            'id ជាពាក្យបម្រុងរបស់ភាសា',
            'អនុគមន៍ const ត្រូវការពាក្យ new',
          ],
          answer: 1,
          explanation:
            'ក្នុង arrow function ខ្លី { ... } ចាប់ផ្ដើមតួប្លុកកូដ; ការរុំក្នុងវង់ក្រចក (id) => ({ id }) ប្រាប់កម្មវិធីបកប្រែឱ្យត្រឡប់ object literal។',
        },
        {
          question: 'តើ Closure ក្នុង JavaScript គឺជាអ្វី?',
          options: [
            'កំហុសវេយ្យាករណ៍ដោយសារភ្លេចបិទវង់ក្រចក',
            'អនុគមន៍ដែលរក្សាសិទ្ធិចូលប្រើអថេរពី lexical scope ខាងក្រៅរបស់វា សូម្បីអនុគមន៍ខាងក្រៅបានបញ្ចប់ហើយក៏ដោយ',
            'វិធីសាស្ត្រភ្ជាប់មកស្រាប់សម្រាប់បិទផ្ទាំងកម្មវិធីរុករក',
            'វិធីធ្វើឱ្យអថេរទាំងអស់ក្លាយជាអថេរសកល',
          ],
          answer: 1,
          explanation:
            'Closure រក្សាការចងចាំអថេរមូលដ្ឋានរបស់អនុគមន៍មេ ជួយបង្កើតទិន្នន័យឯកជន, factory function និង callback មានស្ថានភាព។',
        },
      ],
    },
  },

  'javascript/arrays-and-methods': {
    en: {
      duration: '12 min',
      objectives: [
        'Use reduce(), find(), some(), every(), and flatMap() to answer real data questions cleanly.',
        'Avoid mutating original state arrays by using modern immutable methods like toSorted() and spread copies.',
        'Chain filter -> map -> reduce pipelines clearly for totals, grouping, and search filtering.',
      ],
      extraSections: [
        {
          id: 'reduce-find-some-every',
          heading: 'Beyond map & filter: reduce, find, some & every',
          body: [
            'While map() transforms every element and filter() keeps matching elements, real apps constantly need single answers from a list. Use find() to locate the first matching object (or undefined), some() to check whether at least one item matches a rule, and every() to verify that all items pass a check.',
            'reduce((acc, item) => ..., initialValue) folds an entire array into one value—such as a cart total, average score, or lookup map grouped by ID. Always pass an explicit initialValue (like 0 or {}) so reduce() never throws on an empty array.',
          ],
          table: {
            headers: ['Method', 'Returns', 'Mutates Original?'],
            rows: [
              ['arr.find(fn)', 'First matching item or undefined', 'No'],
              ['arr.some(fn) / every(fn)', 'Boolean (short-circuits early)', 'No'],
              ['arr.reduce(fn, init)', 'Single accumulated value (number/object)', 'No'],
              ['arr.flatMap(fn)', 'Mapped + flattened 1-level array', 'No'],
              ['arr.toSorted(cmp)', 'New sorted copy (ES2023)', 'No (unlike .sort()!)'],
            ],
          },
          warning:
            'Array.prototype.sort() has two classic traps: (1) it mutates the original array in place, and (2) without a comparator it sorts numbers alphabetically ([10, 2, 1].sort() -> [1, 10, 2]). Always pass (a, b) => a - b and use .toSorted() or [...arr].sort()!',
        },
        {
          id: 'immutability-and-chaining',
          heading: 'Immutable Pipelines & Real-World Cart Calculation',
          body: [
            'In modern UI frameworks (Vue, React, Svelte), mutating an array in place with push(), splice(), or sort() can skip reactivity or create hard-to-trace state bugs. Prefer creating new arrays with [...items, next], items.filter(i => i.id !== id), and items.toSorted().',
            'Chaining pure array methods reads like plain English from top to bottom: filter out-of-stock items, sort by price, then reduce to compute the subtotal. Keep each callback short and readable so every step’s intent is obvious at a glance.',
          ],
          points: [
            'Use Set (new Set(items)) to deduplicate primitive arrays in one line: const unique = [...new Set(tags)];.',
            'Reach for find() instead of filter()[0]—find() stops iterating the instant it locates the first match.',
            'Use Object.groupBy(items, item => item.category) in modern JS or reduce() to bucket records by key.',
          ],
          example: {
            title: 'Immutable E-Commerce Cart Pipeline',
            language: 'javascript',
            code: `const cart = [
  { name: 'Keyboard', price: 79, qty: 1, inStock: true },
  { name: 'Mouse', price: 45, qty: 2, inStock: true },
  { name: 'Monitor', price: 299, qty: 1, inStock: false },
];

const available = cart.filter((item) => item.inStock);
const sorted = available.toSorted((a, b) => a.price - b.price);
const total = sorted.reduce((sum, item) => sum + item.price * item.qty, 0);

console.log({ items: sorted.map((i) => i.name), total }); // total: 169`,
            playground: {
              html: `<div class="wrap">
  <h3>In-Stock Cart (Sorted by Price)</h3>
  <ul id="items"></ul>
  <p id="total"></p>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
h3 { margin: 0 0 10px; font-size: 16px; }
ul { margin: 0; padding-left: 20px; line-height: 1.8; font-size: 14px; }
#total { margin-top: 12px; font-weight: 700; font-size: 16px; color: #059669; font-variant-numeric: tabular-nums; }`,
              js: `const cart = [
  { name: 'Mechanical Keyboard', price: 79, qty: 1, inStock: true },
  { name: 'USB-C Hub', price: 32, qty: 2, inStock: true },
  { name: '4K Monitor', price: 320, qty: 1, inStock: false },
  { name: 'Desk Mat', price: 24, qty: 1, inStock: true },
];

const inStockSorted = cart
  .filter((item) => item.inStock)
  .toSorted((a, b) => a.price - b.price);

const subtotal = inStockSorted.reduce((sum, item) => sum + item.price * item.qty, 0);

const ul = document.getElementById('items');
for (const item of inStockSorted) {
  const li = document.createElement('li');
  li.textContent = \`\${item.name} — $\${item.price} × \${item.qty}\`;
  ul.appendChild(li);
}
document.getElementById('total').textContent = \`Subtotal: $\${subtotal}\`;
console.log('Original cart untouched:', cart.length, 'Subtotal:', subtotal);`,
            },
          },
          tip: 'Need to remove an item at index i without mutating? Use items.toSpliced(i, 1) or items.filter((_, idx) => idx !== i).',
        },
      ],
      challenge: {
        prompt:
          'Given const lessons = [{ title: "HTML", mins: 10, done: true }, { title: "CSS", mins: 15, done: false }, { title: "JS", mins: 20, done: true }], compute: (1) totalDoneMins using filter + reduce, and (2) allDone using every().',
        hint: 'Chain lessons.filter(l => l.done).reduce((sum, l) => sum + l.mins, 0) and use lessons.every(l => l.done).',
        language: 'javascript',
        solutionCode: `const lessons = [
  { title: 'HTML', mins: 10, done: true },
  { title: 'CSS', mins: 15, done: false },
  { title: 'JS', mins: 20, done: true },
];

const totalDoneMins = lessons
  .filter((l) => l.done)
  .reduce((sum, l) => sum + l.mins, 0);

const allDone = lessons.every((l) => l.done);

console.log({ totalDoneMins, allDone }); // { totalDoneMins: 30, allDone: false }`,
      },
      quiz: [
        {
          question: 'What does [10, 2, 1, 20].sort() return without a compare function?',
          options: ['[1, 2, 10, 20]', '[1, 10, 2, 20]', '[20, 10, 2, 1]', 'It throws a TypeError'],
          answer: 1,
          explanation:
            'By default, .sort() converts elements to strings and sorts alphabetically ("1", "10", "2", "20"). Always pass (a, b) => a - b for numeric sorting.',
        },
        {
          question:
            'Which array method returns true if AT LEAST ONE item passes a test and stops checking immediately upon finding it?',
          options: ['filter()', 'every()', 'some()', 'map()'],
          answer: 2,
          explanation:
            'some() returns a boolean and short-circuits on the first truthy match, making it faster and clearer than checking filter().length > 0.',
        },
      ],
    },
    km: {
      duration: '12 នាទី',
      objectives: [
        'ប្រើ reduce(), find(), some(), every() និង flatMap() ដើម្បីវិភាគ និងគណនាទិន្នន័យបញ្ជីយ៉ាងស្អាត។',
        'ជៀសវាងការកែប្រែអារេដើមផ្ទាល់ ដោយប្រើវិធីសាស្ត្រមិនកែដើមដូច toSorted() និង spread copy។',
        'តភ្ជាប់ filter -> map -> reduce សម្រាប់គណនាសរុប តម្រៀប និងច្រោះទិន្នន័យជាក់ស្ដែង។',
      ],
      extraSections: [
        {
          id: 'reduce-find-some-every',
          heading: 'លើសពី map & filter៖ reduce, find, some និង every',
          body: [
            'ខណៈ map() បម្លែងធាតុទាំងអស់ ហើយ filter() រក្សាធាតុត្រូវលក្ខខណ្ឌ កម្មវិធីពិតត្រូវការចម្លើយតែមួយពីបញ្ជី។ ប្រើ find() ដើម្បីរក object ត្រូវដំបូង (ឬ undefined), ប្រើ some() ដើម្បីពិនិត្យថាតើមានយ៉ាងតិចមួយធាតុត្រូវលក្ខខណ្ឌ និង every() ដើម្បីពិនិត្យថាគ្រប់ធាតុទាំងអស់ត្រូវលក្ខខណ្ឌ។',
            'reduce((acc, item) => ..., initialValue) បង្រួមអារេទាំងមូលទៅជាតម្លៃតែមួយ—ដូចជាតម្លៃសរុបកន្ត្រកទំនិញ ឬពិន្ទុមធ្យម។ តែងតែដាក់ initialValue (ដូច 0 ឬ {}) ដើម្បីកុំឱ្យ reduce() បង្កកំហុសលើអារេទទេ។',
          ],
          table: {
            headers: ['វិធីសាស្ត្រ', 'តម្លៃត្រឡប់', 'កែប្រែអារេដើម?'],
            rows: [
              ['arr.find(fn)', 'ធាតុត្រូវដំបូង ឬ undefined', 'ទេ'],
              ['arr.some(fn) / every(fn)', 'Boolean (ឈប់ភ្លាមពេលដឹងចម្លើយ)', 'ទេ'],
              ['arr.reduce(fn, init)', 'តម្លៃបូកសរុបតែមួយ (លេខ/object)', 'ទេ'],
              ['arr.flatMap(fn)', 'អារេដែលបម្លែង និងរាបស្មើ 1 កម្រិត', 'ទេ'],
              ['arr.toSorted(cmp)', 'ច្បាប់ចម្លងថ្មីដែលតម្រៀបរួច (ES2023)', 'ទេ (ខុសពី .sort()!)'],
            ],
          },
          warning:
            'Array.prototype.sort() មានអន្ទាក់ពីរ៖ (1) វាកែប្រែអារេដើមផ្ទាល់ និង (2) បើគ្មាន compare function វាតម្រៀបលេខតាមអក្ខរក្រម ([10, 2, 1].sort() -> [1, 10, 2])។ ត្រូវប្រើ (a, b) => a - b និង .toSorted() ឬ [...arr].sort() ជានិច្ច!',
        },
        {
          id: 'immutability-and-chaining',
          heading: 'ការតភ្ជាប់ដោយមិនកែទិន្នន័យដើម និងការគណនាកន្ត្រកទំនិញ',
          body: [
            'ក្នុងក្របខ័ណ្ឌ UI ទំនើប (Vue, React, Svelte) ការកែអារេផ្ទាល់ដោយ push(), splice() ឬ sort() អាចបង្កកំហុសស្ថានភាពពិបាករក។ គួរបង្កើតអារេថ្មីដោយ [...items, next], items.filter(i => i.id !== id) និង items.toSorted()។',
            'ការតភ្ជាប់វិធីសាស្ត្រអារេអានងាយយល់ពីលើចុះក្រោម៖ ច្រោះទំនិញដែលមានក្នុងស្ដុក តម្រៀបតាមតម្លៃ រួច reduce ដើម្បីគណនាសរុប។',
          ],
          points: [
            'ប្រើ Set (new Set(items)) ដើម្បីលុបធាតុស្ទួនក្នុងមួយបន្ទាត់៖ const unique = [...new Set(tags)];។',
            'ប្រើ find() ជំនួស filter()[0] ព្រោះ find() ឈប់ភ្លាមពេលរកឃើញធាតុដំបូង។',
            'ប្រើ Object.groupBy() ឬ reduce() ដើម្បីចែកក្រុមទិន្នន័យតាមប្រភេទ។',
          ],
          exampleTitle: 'ការគណនាកន្ត្រកទំនិញដោយមិនកែអារេដើម',
          tip: 'ចង់លុបធាតុត្រង់សន្ទស្សន៍ i ដោយមិនកែអារេដើម? ប្រើ items.toSpliced(i, 1) ឬ items.filter((_, idx) => idx !== i)។',
        },
      ],
      challenge: {
        prompt:
          'ដោយមាន const lessons = [{ title: "HTML", mins: 10, done: true }, { title: "CSS", mins: 15, done: false }, { title: "JS", mins: 20, done: true }] ចូរគណនា៖ (1) totalDoneMins ដោយប្រើ filter + reduce និង (2) allDone ដោយប្រើ every()។',
        hint: 'តភ្ជាប់ lessons.filter(l => l.done).reduce((sum, l) => sum + l.mins, 0) និងប្រើ lessons.every(l => l.done)។',
      },
      quiz: [
        {
          question: 'តើ [10, 2, 1, 20].sort() ត្រឡប់អ្វី ប្រសិនបើមិនដាក់ compare function?',
          options: ['[1, 2, 10, 20]', '[1, 10, 2, 20]', '[20, 10, 2, 1]', 'វាបង្ក TypeError'],
          answer: 1,
          explanation:
            'តាមលំនាំដើម .sort() បម្លែងធាតុជាអក្សរ រួចតម្រៀបតាមអក្ខរក្រម ("1", "10", "2", "20")។ ត្រូវដាក់ (a, b) => a - b សម្រាប់តម្រៀបលេខ។',
        },
        {
          question:
            'តើវិធីសាស្ត្រអារេមួយណាត្រឡប់ true បើយ៉ាងតិចមានធាតុមួយត្រូវលក្ខខណ្ឌ ហើយឈប់ពិនិត្យភ្លាម?',
          options: ['filter()', 'every()', 'some()', 'map()'],
          answer: 2,
          explanation:
            'some() ត្រឡប់ boolean ហើយឈប់ភ្លាមពេលរកឃើញធាតុដំបូងដែលត្រូវ ដែលលឿន និងច្បាស់ជាង filter().length > 0។',
        },
      ],
    },
  },

  'javascript/dom-manipulation': {
    en: {
      duration: '12 min',
      objectives: [
        'Query single and multiple elements with querySelector / querySelectorAll and traverse safely with closest().',
        'Create and insert DOM nodes safely using createElement(), textContent, DocumentFragment, and replaceChildren().',
        'Prevent Cross-Site Scripting (XSS) vulnerabilities by never injecting untrusted user text into innerHTML.',
      ],
      extraSections: [
        {
          id: 'safe-dom-creation',
          heading: 'Safe DOM Creation, dataset & XSS Prevention',
          body: [
            'When rendering user-supplied text (like a comment, username, or search query), always write to element.textContent instead of element.innerHTML. Setting innerHTML parses raw HTML tags—if a user types <img src=x onerror="alert(1)">, innerHTML executes attacker JavaScript right inside your page (Cross-Site Scripting / XSS).',
            'To build new elements cleanly and safely, use document.createElement(), set textContent and className/dataset properties, and batch multiple insertions inside a DocumentFragment (or container.replaceChildren(...nodes)) so the browser updates layout only once instead of thrashing on every loop iteration.',
          ],
          table: {
            headers: ['DOM API', 'Returns / Does', 'Best Practice'],
            rows: [
              [
                'document.querySelector(sel)',
                'First matching Element or null',
                'Always guard for null before accessing properties.',
              ],
              [
                'el.closest(".card")',
                'Nearest matching ancestor',
                'Walk up from a clicked button to its parent card.',
              ],
              [
                'el.textContent = str',
                'Sets plain text safely',
                'Default choice for all dynamic text—immune to XSS.',
              ],
              [
                'el.dataset.userId',
                'Reads/writes data-user-id',
                'Store lightweight IDs/state in HTML data-* attributes.',
              ],
              [
                'el.replaceChildren(...nodes)',
                'Replaces all children in 1 step',
                'Cleaner and faster than innerHTML = "" + append loops.',
              ],
            ],
          },
          warning:
            'Never interpolate user input into innerHTML (e.g. list.innerHTML += `<li>${userInput}</li>`). Beyond opening a serious XSS security hole, += innerHTML destroys and recreates every existing child node and wipes out their attached event listeners!',
        },
        {
          id: 'rendering-lists-from-state',
          heading: 'State-Driven Rendering & Avoiding Layout Thrashing',
          body: [
            'Instead of storing application data scattered inside HTML text nodes, keep your source of truth in a plain JavaScript array or object, and write a small render() function that reflects that state into the DOM. That single pattern is the foundation behind Vue, React, and every maintainable vanilla-JS widget.',
            'For smooth performance, avoid interleaving DOM writes (el.style.width = ...) and layout reads (el.offsetHeight) inside a loop—called layout thrashing. Batch reads first, then batch DOM writes or toggle a single CSS class via el.classList.toggle("active", condition).',
          ],
          points: [
            'Pass a second boolean argument to classList.toggle("is-done", task.done) to sync a class deterministically with state.',
            'Use NodeList from querySelectorAll directly with for...of or convert with [...nodes] when you need .map() or .filter().',
            'Store references to static DOM elements once at startup instead of re-querying the document inside rapid mouse/scroll handlers.',
          ],
          example: {
            title: 'XSS-Safe State-Driven List Renderer',
            language: 'javascript',
            code: `function renderTasks(container, tasks) {
  const nodes = tasks.map((task) => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.classList.toggle('done', task.done);
    li.textContent = task.title; // Safe even for "<script>" text!
    return li;
  });
  container.replaceChildren(...nodes);
}`,
            playground: {
              html: `<div class="wrap">
  <div class="controls">
    <input id="task-input" placeholder="Try typing <b>hello</b>" />
    <button id="add-btn" type="button">Add Task</button>
  </div>
  <ul id="task-list"></ul>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.wrap { max-width: 380px; display: grid; gap: 12px; }
.controls { display: flex; gap: 8px; }
input { flex: 1; padding: 8px 10px; border: 1px solid #d4d4d8; border-radius: 8px; font-size: 14px; }
button { padding: 8px 14px; border: none; border-radius: 8px; background: #2563eb; color: white; font-weight: 600; cursor: pointer; }
ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; }
li { padding: 9px 12px; border: 1px solid #e4e4e7; border-radius: 8px; font-size: 14px; background: #fafafa; }`,
              js: `const tasks = [
  { id: 1, title: 'Use textContent to block XSS' },
  { id: 2, title: 'Batch updates with replaceChildren()' },
];
const list = document.getElementById('task-list');
const input = document.getElementById('task-input');

function render() {
  const nodes = tasks.map((task) => {
    const li = document.createElement('li');
    li.dataset.id = String(task.id);
    li.textContent = task.title;
    return li;
  });
  list.replaceChildren(...nodes);
}

document.getElementById('add-btn').addEventListener('click', () => {
  const title = input.value.trim();
  if (!title) return;
  tasks.push({ id: Date.now(), title });
  input.value = '';
  render();
  console.log('Rendered tasks:', tasks.length);
});

render();`,
            },
          },
          tip: 'Use <template> elements in HTML when creating complex repeated cards in vanilla JS: clone template.content.cloneNode(true), fill textContent fields safely, and append.',
        },
      ],
      challenge: {
        prompt:
          'Write a function renderBadges(container, tags) that safely creates a <span class="badge"> for each string in tags using createElement() and textContent, sets data-tag on each badge via dataset, and inserts them all in one call using container.replaceChildren(...nodes).',
        hint: 'Map over tags to create each <span>, set span.className = "badge", span.dataset.tag = tag, and span.textContent = tag.',
        language: 'javascript',
        solutionCode: `function renderBadges(container, tags) {
  const nodes = tags.map((tag) => {
    const span = document.createElement('span');
    span.className = 'badge';
    span.dataset.tag = tag;
    span.textContent = tag;
    return span;
  });
  container.replaceChildren(...nodes);
}`,
      },
      quiz: [
        {
          question:
            'Why should you use element.textContent instead of element.innerHTML when displaying user-typed text?',
          options: [
            'textContent automatically translates text into Khmer',
            'textContent treats input strictly as plain text, preventing malicious HTML/script injection (XSS)',
            'innerHTML does not work inside <li> elements',
            'textContent makes text bold automatically',
          ],
          answer: 1,
          explanation:
            'innerHTML parses and executes embedded markup/event handlers, creating XSS vulnerabilities; textContent inserts raw characters safely without HTML parsing.',
        },
        {
          question:
            'What is the cleanest way to read a custom HTML attribute data-lesson-id="42" in JavaScript?',
          options: [
            'el.data.lessonId',
            'el.dataset.lessonId',
            'el.attributes.lessonId',
            'el.getData("lesson-id")',
          ],
          answer: 1,
          explanation:
            'The DOM dataset API automatically converts hyphenated data-* attributes (data-lesson-id) into camelCase properties (el.dataset.lessonId).',
        },
      ],
    },
    km: {
      duration: '12 នាទី',
      objectives: [
        'ស្វែងរកធាតុមួយ ឬច្រើនដោយ querySelector / querySelectorAll និងរកធាតុមេដោយ closest()។',
        'បង្កើត និងបញ្ចូលធាតុ DOM ដោយសុវត្ថិភាពដោយប្រើ createElement(), textContent, DocumentFragment និង replaceChildren()។',
        'ការពារការវាយប្រហារ Cross-Site Scripting (XSS) ដោយមិនដាក់អត្ថបទអ្នកប្រើចូល innerHTML ឡើយ។',
      ],
      extraSections: [
        {
          id: 'safe-dom-creation',
          heading: 'ការបង្កើត DOM ដោយសុវត្ថិភាព dataset និងការការពារ XSS',
          body: [
            'ពេលបង្ហាញអត្ថបទដែលអ្នកប្រើវាយបញ្ចូល (ដូចជាមតិយោបល់ ឈ្មោះ ឬពាក្យស្វែងរក) ត្រូវសរសេរទៅ element.textContent ជានិច្ច ជំនួសឱ្យ element.innerHTML។ innerHTML បកប្រែស្លាក HTML—បើអ្នកប្រើវាយ <img src=x onerror="alert(1)"> វានឹងដំណើរការកូដ JavaScript វាយប្រហារ (XSS) លើទំព័ររបស់អ្នក។',
            'ដើម្បីបង្កើតធាតុថ្មីដោយស្អាត និងសុវត្ថិភាព ប្រើ document.createElement() កំណត់ textContent និង dataset រួចបញ្ចូលទាំងអស់ម្ដងដោយ container.replaceChildren(...nodes) ដើម្បីឱ្យកម្មវិធីរុករកគូរប្លង់ឡើងវិញតែម្ដងគត់។',
          ],
          table: {
            headers: ['DOM API', 'តួនាទី', 'ការអនុវត្តល្អបំផុត'],
            rows: [
              [
                'document.querySelector(sel)',
                'ធាតុត្រូវដំបូង ឬ null',
                'ពិនិត្យ null មុនប្រើលក្ខណៈសម្បត្តិជានិច្ច។',
              ],
              [
                'el.closest(".card")',
                'ធាតុមេជិតបំផុតដែលត្រូវ',
                'ឡើងពីប៊ូតុងដែលចុចទៅរកកាតមេរបស់វា។',
              ],
              [
                'el.textContent = str',
                'កំណត់អត្ថបទធម្មតាដោយសុវត្ថិភាព',
                'ជម្រើសលំនាំដើមសម្រាប់អត្ថបទថាមវន្ត—ការពារ XSS។',
              ],
              [
                'el.dataset.userId',
                'អាន/សរសេរ data-user-id',
                'រក្សា ID ឬស្ថានភាពស្រាលៗក្នុងគុណលក្ខណៈ data-*។',
              ],
              [
                'el.replaceChildren(...nodes)',
                'ជំនួសកូនទាំងអស់ក្នុងជំហានតែមួយ',
                'ស្អាត និងលឿនជាង innerHTML = "" + append ក្នុងរង្វិលជុំ។',
              ],
            ],
          },
          warning:
            'កុំដាក់អត្ថបទអ្នកប្រើក្នុង innerHTML (ដូច list.innerHTML += `<li>${userInput}</li>`)។ ក្រៅពីបង្កចន្លោះប្រហោង XSS ការប្រើ += innerHTML បំផ្លាញ និងបង្កើតធាតុកូនចាស់ទាំងអស់ឡើងវិញ ធ្វើឱ្យបាត់ event listener ដែលបានភ្ជាប់!',
        },
        {
          id: 'rendering-lists-from-state',
          heading: 'ការបង្ហាញតាមស្ថានភាពទិន្នន័យ និងការជៀសវាង Layout Thrashing',
          body: [
            'ជំនួសឱ្យការរក្សាទិន្នន័យរាយប៉ាយក្នុង HTML ចូររក្សាទិន្នន័យដើមក្នុងអារេ ឬ object របស់ JavaScript ហើយសរសេរអនុគមន៍ render() តូចមួយដើម្បីបង្ហាញវាលើ DOM។ គំរូនេះជាមូលដ្ឋានគ្រឹះនៃ Vue, React និងកម្មវិធី vanilla JS ល្អៗ។',
            'ដើម្បីល្បឿនរលូន ជៀសវាងការឆ្លាស់គ្នារវាងការសរសេរ DOM និងការអានទំហំប្លង់ (el.offsetHeight) ក្នុងរង្វិលជុំ—ប្រមូលការអានមុន រួចសរសេរតាមក្រោយ ឬប្រើ el.classList.toggle("active", condition)។',
          ],
          points: [
            'បញ្ជូនអាគុយម៉ង់ boolean ទីពីរទៅ classList.toggle("is-done", task.done) ដើម្បីឱ្យ class ត្រូវនឹងស្ថានភាពជានិច្ច។',
            'ប្រើ for...of ផ្ទាល់លើ NodeList ពី querySelectorAll ឬបម្លែងជា [...nodes] ពេលត្រូវការ .map() ឬ .filter()។',
            'រក្សាទុកការយោងទៅធាតុ DOM ថេរម្ដងពេលចាប់ផ្ដើម ជំនួសឱ្យការហៅ querySelector ដដែលៗពេលរំកិលទំព័រ។',
          ],
          exampleTitle: 'ការបង្ហាញបញ្ជីតាមស្ថានភាពដែលការពារ XSS',
          tip: 'ប្រើស្លាក <template> ក្នុង HTML ពេលបង្កើតកាតដដែលៗស្មុគស្មាញក្នុង vanilla JS ដោយ cloneNode(true) រួចបំពេញ textContent ដោយសុវត្ថិភាព។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ renderBadges(container, tags) ដែលបង្កើត <span class="badge"> ដោយសុវត្ថិភាពសម្រាប់អត្ថបទនីមួយៗក្នុង tags ដោយប្រើ createElement() និង textContent កំណត់ data-tag តាម dataset រួចបញ្ចូលទាំងអស់ម្ដងដោយ container.replaceChildren(...nodes)។',
        hint: 'ប្រើ tags.map(...) បង្កើត <span>, កំណត់ span.className = "badge", span.dataset.tag = tag និង span.textContent = tag។',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វីបានជាអ្នកគួរប្រើ element.textContent ជំនួស element.innerHTML ពេលបង្ហាញអត្ថបទអ្នកប្រើវាយ?',
          options: [
            'textContent បកប្រែអត្ថបទជាភាសាខ្មែរស្វ័យប្រវត្តិ',
            'textContent ចាត់ទុកអត្ថបទជាតួអក្សរធម្មតា ការពារការចាក់បញ្ចូល HTML/script វាយប្រហារ (XSS)',
            'innerHTML មិនដំណើរការក្នុង <li> ទេ',
            'textContent ធ្វើឱ្យអក្សរដិតស្វ័យប្រវត្តិ',
          ],
          answer: 1,
          explanation:
            'innerHTML បកប្រែ និងដំណើរការកូដ HTML/script ដែលបង្កចន្លោះប្រហោង XSS រីឯ textContent បង្ហាញអក្សរត្រង់ៗដោយសុវត្ថិភាព។',
        },
        {
          question:
            'តើវិធីស្អាតបំផុតដើម្បីអានគុណលក្ខណៈ HTML data-lesson-id="42" ក្នុង JavaScript គឺជាអ្វី?',
          options: [
            'el.data.lessonId',
            'el.dataset.lessonId',
            'el.attributes.lessonId',
            'el.getData("lesson-id")',
          ],
          answer: 1,
          explanation:
            'DOM dataset API បម្លែងគុណលក្ខណៈ data-* ដែលមានសញ្ញាត្រេ (data-lesson-id) ទៅជា camelCase (el.dataset.lessonId) ដោយស្វ័យប្រវត្តិ។',
        },
      ],
    },
  },

  'javascript/events-and-interactivity': {
    en: {
      duration: '12 min',
      objectives: [
        'Explain event bubbling and use event delegation to handle clicks on dynamic lists with a single listener.',
        'Control default browser actions with event.preventDefault() and distinguish event.target from event.currentTarget.',
        'Build responsive keyboard shortcuts and debounce high-frequency input events cleanly.',
      ],
      extraSections: [
        {
          id: 'bubbling-and-delegation',
          heading: 'Event Bubbling, preventDefault() & Event Delegation',
          body: [
            'When you click a button inside an <li> inside a <ul>, the click event fires on the button and then bubbles upward through <li>, <ul>, <body>, and document. Event delegation uses this bubbling to your advantage: attach ONE listener on the parent <ul> and check event.target.closest("button") to know which item was clicked—even for items added dynamically later.',
            'Know the difference between event.target (the deepest element actually clicked, such as an icon inside a button) and event.currentTarget (the element that owns the listener). Calling event.preventDefault() cancels native browser defaults like page reload on form submit, while leaving bubbling intact.',
          ],
          table: {
            headers: ['Event / Property', 'Fires When / Means', 'Common Usage'],
            rows: [
              [
                'click / submit',
                'Activation or form submission',
                'Buttons, delegated lists, forms (with e.preventDefault()).',
              ],
              [
                'input / change',
                'Every keystroke / committed value',
                'Live search filtering vs select dropdown changes.',
              ],
              [
                'keydown',
                'Key pressed (check e.key)',
                'Shortcuts like Escape to close modals or "/" to focus search.',
              ],
              [
                'e.target.closest(sel)',
                'Safely finds clicked control',
                'Handles clicks on nested SVG/<span> inside a button.',
              ],
              [
                '{ once: true } / AbortController',
                'Listener cleanup options',
                'Prevents memory leaks when removing dynamic UI views.',
              ],
            ],
          },
          warning:
            'Never check if (e.target.matches("button")) when buttons contain icons or <span> labels—clicking the icon makes e.target the <span>, not the <button>! Always use const btn = e.target.closest("button") instead.',
        },
        {
          id: 'keyboard-forms-and-debouncing',
          heading: 'Keyboard Shortcuts & Debouncing Live Search',
          body: [
            'High-frequency events like input, scroll, and resize can fire dozens of times per second. If every keystroke triggers a network API search, your app wastes bandwidth and flickers. Wrapping the handler in a tiny debounce(fn, 250) helper waits until the user pauses typing for 250ms before running the expensive search.',
            'For keyboard UX, inspect event.key (e.g., "Escape", "Enter", "ArrowDown") rather than deprecated keyCode numbers, and remember to ignore shortcut keys when the user is currently typing inside an <input> or <textarea>.',
          ],
          points: [
            'Attach form handlers to the form’s "submit" event (not the submit button’s "click") so pressing Enter in an input also triggers it.',
            'Pass { passive: true } on scroll and touchstart listeners when you never call preventDefault(), keeping scrolling silky smooth.',
            'Clean up global window listeners with removeEventListener or an AbortController signal when tearing down a component.',
          ],
          example: {
            title: 'Delegated Click List + Debounced Search Filter',
            language: 'javascript',
            code: `function debounce(fn, delay = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

list.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-remove]');
  if (!btn) return;
  console.log('Remove item:', btn.dataset.remove);
});`,
            playground: {
              html: `<div class="wrap">
  <input id="search" type="search" placeholder="Search lessons (debounced 200ms)..." />
  <ul id="list"></ul>
  <p id="status">Click any × button — handled by 1 delegated listener.</p>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.wrap { max-width: 380px; display: grid; gap: 10px; }
input { padding: 8px 12px; border: 1px solid #d4d4d8; border-radius: 8px; font-size: 14px; }
ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; }
li { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border: 1px solid #e4e4e7; border-radius: 8px; font-size: 14px; }
li button { border: none; background: #fee2e2; color: #b91c1c; border-radius: 6px; padding: 2px 8px; font-weight: 700; cursor: pointer; }
#status { margin: 0; font-size: 13px; color: #52525b; }`,
              js: `let items = [
  { id: '1', name: 'HTML Forms & Validation' },
  { id: '2', name: 'CSS Flexbox & Grid' },
  { id: '3', name: 'JS Event Delegation' },
];
let query = '';
const list = document.getElementById('list');
const status = document.getElementById('status');

function debounce(fn, ms = 200) {
  let id;
  return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), ms); };
}

function render() {
  const filtered = items.filter((i) => i.name.toLowerCase().includes(query));
  const nodes = filtered.map((item) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = item.name;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.remove = item.id;
    btn.textContent = '×';
    li.append(span, btn);
    return li;
  });
  list.replaceChildren(...nodes);
}

list.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-remove]');
  if (!btn) return;
  items = items.filter((i) => i.id !== btn.dataset.remove);
  status.textContent = \`Removed item #\${btn.dataset.remove}\`;
  render();
});

document.getElementById('search').addEventListener('input', debounce((e) => {
  query = e.target.value.trim().toLowerCase();
  status.textContent = query ? \`Filtered by "\${query}"\` : 'Showing all items';
  render();
}, 200));

render();`,
            },
          },
          tip: 'You can cancel multiple event listeners at once with one AbortController: pass { signal: controller.signal } to every addEventListener, then call controller.abort() on cleanup.',
        },
      ],
      challenge: {
        prompt:
          'Write an event-delegation click listener on #tab-bar that finds the clicked button via e.target.closest("button[data-tab]"), ignores clicks outside buttons, removes "active" from all buttons inside #tab-bar, adds "active" to the clicked button, and logs btn.dataset.tab.',
        hint: 'Use e.target.closest("button[data-tab]") and loop over tabBar.querySelectorAll("button") to toggle the "active" class.',
        language: 'javascript',
        solutionCode: `const tabBar = document.querySelector('#tab-bar');

tabBar.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-tab]');
  if (!btn || !tabBar.contains(btn)) return;

  for (const tab of tabBar.querySelectorAll('button[data-tab]')) {
    tab.classList.toggle('active', tab === btn);
  }
  console.log('Selected tab:', btn.dataset.tab);
});`,
      },
      quiz: [
        {
          question:
            'Why is event delegation (one listener on a parent <ul>) better than attaching click listeners to every <li>?',
          options: [
            '<li> elements do not support click events',
            'It uses less memory and automatically handles new <li> items inserted dynamically later',
            'It prevents the page from scrolling',
            'It bypasses event.preventDefault()',
          ],
          answer: 1,
          explanation:
            'Because clicks bubble up to the parent container, one delegated listener handles hundreds of existing and future items without re-binding listeners on every render.',
        },
        {
          question:
            'Why should you listen to a <form>’s "submit" event instead of the submit <button>’s "click" event?',
          options: [
            'Buttons inside forms do not emit click events',
            'The "submit" event handles both clicking the button and pressing Enter inside an input, and runs native HTML5 validation first',
            'Click events cannot call event.preventDefault()',
            'Submit events run asynchronously on a background thread',
          ],
          answer: 1,
          explanation:
            'Listening to "submit" catches keyboard Enter submissions and triggers HTML5 constraint validation before your handler runs.',
        },
      ],
    },
    km: {
      duration: '12 នាទី',
      objectives: [
        'ពន្យល់ពី event bubbling និងប្រើ event delegation ដើម្បីគ្រប់គ្រងការចុចលើបញ្ជីថាមវន្តដោយប្រើ listener តែមួយ។',
        'គ្រប់គ្រងសកម្មភាពលំនាំដើមរបស់កម្មវិធីរុករកដោយ event.preventDefault() និងបែងចែក event.target ពី event.currentTarget។',
        'បង្កើតផ្លូវកាត់ក្ដារចុច និងប្រើ debounce សម្រាប់ព្រឹត្តិការណ៍ input ដែលកើតញឹកញាប់។',
      ],
      extraSections: [
        {
          id: 'bubbling-and-delegation',
          heading: 'Event Bubbling, preventDefault() និង Event Delegation',
          body: [
            'ពេលអ្នកចុចប៊ូតុងក្នុង <li> ក្នុង <ul> ព្រឹត្តិការណ៍ click កើតលើប៊ូតុង រួចឡើងតាមលំដាប់ (bubble) ទៅ <li>, <ul>, <body> និង document។ Event delegation ប្រើលក្ខណៈនេះដោយភ្ជាប់ listener តែមួយលើ <ul> មេ ហើយពិនិត្យ event.target.closest("button") ដើម្បីដឹងថាធាតុណាត្រូវបានចុច—សូម្បីធាតុដែលបន្ថែមថ្មីពេលក្រោយក៏ដំណើរការដែរ។',
            'ត្រូវដឹងភាពខុសគ្នារវាង event.target (ធាតុខាងក្នុងបង្អស់ដែលត្រូវចុចពិត ដូចជារូបតំណាងក្នុងប៊ូតុង) និង event.currentTarget (ធាតុដែលភ្ជាប់ listener)។ ការហៅ event.preventDefault() បញ្ឈប់សកម្មភាពលំនាំដើមដូចជាការផ្ទុកទំព័រឡើងវិញពេល submit ទម្រង់។',
          ],
          table: {
            headers: ['ព្រឹត្តិការណ៍ / លក្ខណៈសម្បត្តិ', 'កើតឡើងពេល / មានន័យ', 'ការប្រើប្រាស់ទូទៅ'],
            rows: [
              [
                'click / submit',
                'ចុច ឬដាក់ស្នើទម្រង់',
                'ប៊ូតុង បញ្ជី delegation ទម្រង់ (ជាមួយ e.preventDefault())។',
              ],
              [
                'input / change',
                'រាល់ការវាយ / ពេលប្ដូរតម្លៃរួច',
                'ស្វែងរកភ្លាមៗ ទល់នឹងការជ្រើស <select>។',
              ],
              [
                'keydown',
                'ពេលចុចគ្រាប់ចុច (ពិនិត្យ e.key)',
                'ផ្លូវកាត់ដូច Escape បិទ modal ឬ "/" ស្វែងរក។',
              ],
              [
                'e.target.closest(sel)',
                'រកប៊ូតុងដែលចុចដោយសុវត្ថិភាព',
                'ដោះស្រាយពេលចុចចំ SVG/<span> ខាងក្នុងប៊ូតុង។',
              ],
              [
                '{ once: true } / AbortController',
                'ជម្រើសសម្អាត listener',
                'ការពារការលេចធ្លាយអង្គចងចាំពេលលុបសមាសធាតុ UI។',
              ],
            ],
          },
          warning:
            'កុំពិនិត្យ if (e.target.matches("button")) ពេលប៊ូតុងមានរូបតំណាង ឬ <span> ខាងក្នុង—ពេលចុចចំរូបតំណាង e.target គឺជា <span> មិនមែន <button> ទេ! ត្រូវប្រើ e.target.closest("button") ជានិច្ច។',
        },
        {
          id: 'keyboard-forms-and-debouncing',
          heading: 'ផ្លូវកាត់ក្ដារចុច និងការប្រើ Debounce លើការស្វែងរកផ្ទាល់',
          body: [
            'ព្រឹត្តិការណ៍ដែលកើតញឹកញាប់ដូច input, scroll និង resize អាចដំណើរការរាប់សិបដងក្នុងមួយវិនាទី។ បើរាល់តួអក្សរវាយហៅ API ស្វែងរក កម្មវិធីនឹងខ្ជះខ្ជាយបណ្ដាញ។ ការរុំ handler ក្នុងអនុគមន៍ debounce(fn, 250) រង់ចាំរហូតអ្នកប្រើឈប់វាយ 250ms សិនទើបដំណើរការការស្វែងរក។',
            'សម្រាប់ក្ដារចុច សូមពិនិត្យ event.key (ដូច "Escape", "Enter", "ArrowDown") ជំនួសលេខ keyCode ចាស់ ហើយកុំភ្លេចរំលងផ្លូវកាត់ពេលអ្នកប្រើកំពុងវាយក្នុង <input> ឬ <textarea>។',
          ],
          points: [
            'ភ្ជាប់ handler លើព្រឹត្តិការណ៍ "submit" របស់ <form> (មិនមែន "click" លើប៊ូតុង) ដើម្បីឱ្យការចុច Enter ក្នុងប្រអប់បញ្ចូលក៏ដំណើរការដែរ។',
            'បញ្ជូន { passive: true } លើ scroll និង touchstart listener ពេលមិនប្រើ preventDefault() ដើម្បីឱ្យការអូសរលូន។',
            'សម្អាត window listener ដោយ removeEventListener ឬ AbortController ពេលបិទសមាសធាតុ។',
          ],
          exampleTitle: 'បញ្ជីប្រើ Event Delegation + ការស្វែងរកមាន Debounce',
          tip: 'អ្នកអាចបិទ event listener ច្រើនព្រមគ្នាដោយ AbortController តែមួយ៖ បញ្ជូន { signal: controller.signal } ទៅ addEventListener នីមួយៗ រួចហៅ controller.abort() ពេលសម្អាត។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ click listener បែប event delegation លើ #tab-bar ដែលរកប៊ូតុងដែលចុចដោយ e.target.closest("button[data-tab]"), រំលងការចុចក្រៅប៊ូតុង, កំណត់ class "active" តែលើប៊ូតុងដែលចុច និង log តម្លៃ btn.dataset.tab។',
        hint: 'ប្រើ e.target.closest("button[data-tab]") ហើយរត់រង្វិលជុំលើ tabBar.querySelectorAll("button[data-tab]") ដោយប្រើ classList.toggle("active", tab === btn)។',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វីបានជា event delegation (listener តែមួយលើ <ul> មេ) ល្អជាងការភ្ជាប់ click listener លើគ្រប់ <li>?',
          options: [
            'ធាតុ <li> មិនគាំទ្រព្រឹត្តិការណ៍ click ទេ',
            'វាសន្សំអង្គចងចាំ និងគ្រប់គ្រង <li> ថ្មីៗដែលបន្ថែមពេលក្រោយបានដោយស្វ័យប្រវត្តិ',
            'វាការពារទំព័រកុំឱ្យរំកិល',
            'វារំលង event.preventDefault()',
          ],
          answer: 1,
          explanation:
            'ដោយសារការចុចឡើង (bubble) ទៅប្រអប់មេ listener តែមួយអាចគ្រប់គ្រងធាតុចាស់ និងថ្មីរាប់រយដោយមិនបាច់ភ្ជាប់ឡើងវិញរាល់ពេល render។',
        },
        {
          question:
            'ហេតុអ្វីគួរស្ដាប់ព្រឹត្តិការណ៍ "submit" របស់ <form> ជំនួស "click" របស់ប៊ូតុង submit?',
          options: [
            'ប៊ូតុងក្នុងទម្រង់មិនបង្កើតព្រឹត្តិការណ៍ click ទេ',
            'ព្រឹត្តិការណ៍ "submit" គ្រប់គ្រងទាំងការចុចប៊ូតុង និងការចុច Enter ក្នុងប្រអប់បញ្ចូល ព្រមទាំងដំណើរការការផ្ទៀងផ្ទាត់ HTML5 ជាមុន',
            'ព្រឹត្តិការណ៍ click មិនអាចហៅ event.preventDefault() បានទេ',
            'ព្រឹត្តិការណ៍ submit ដំណើរការលើ background thread',
          ],
          answer: 1,
          explanation:
            'ការស្ដាប់ "submit" ធានាថាការចុច Enter លើក្ដារចុច និងការផ្ទៀងផ្ទាត់ HTML5 (ដូច required, email) ដំណើរការត្រឹមត្រូវ។',
        },
      ],
    },
  },

  'javascript/async-await-and-modules': {
    en: {
      duration: '14 min',
      objectives: [
        'Handle real HTTP failures properly with fetch() by checking response.ok, timeouts via AbortSignal.timeout(), and try/catch/finally.',
        'Choose between Promise.all, Promise.allSettled, and Promise.race for concurrent async workflows.',
        'Organize scalable codebases with ES Modules (named vs default exports, dynamic import(), and clean module boundaries).',
      ],
      extraSections: [
        {
          id: 'fetch-api-and-http-errors',
          heading: 'Real-World fetch(), HTTP Errors & Promise Combinators',
          body: [
            'One of the biggest production traps in JavaScript is assuming fetch() rejects when a server returns HTTP 404 Not Found or 500 Internal Server Error. It does NOT—fetch() only rejects on network failure or aborted requests. Always inspect if (!response.ok) throw new Error(`HTTP ${response.status}`); before calling await response.json().',
            'When running multiple async operations concurrently, pick the right combinator: Promise.all() fails fast if any single request fails (great when every piece is required), while Promise.allSettled() waits for all promises and returns each item’s { status: "fulfilled" | "rejected" } so one slow or failing widget never crashes your entire dashboard.',
          ],
          table: {
            headers: ['API / Combinator', 'Behavior', 'When To Use'],
            rows: [
              [
                'response.ok',
                'true for HTTP 200–299',
                'Always check before parsing response.json().',
              ],
              [
                'AbortSignal.timeout(5000)',
                'Auto-cancels stalled fetch after 5s',
                'Prevents UI loaders from hanging forever on slow networks.',
              ],
              [
                'Promise.all([a, b])',
                'Parallel; rejects if ANY fails',
                'Loading required data needed together to render.',
              ],
              [
                'Promise.allSettled([a, b])',
                'Parallel; never rejects, reports all outcomes',
                'Independent dashboard widgets or batch notifications.',
              ],
              [
                'finally { ... }',
                'Runs on both success and error',
                'Always turn off loading spinners reliably.',
              ],
            ],
          },
          warning:
            'Never write await inside a forEach() callback (items.forEach(async item => await save(item)))—forEach ignores returned Promises and finishes immediately before any work completes! Use for...of for sequential awaits or Promise.all(items.map(...)) for parallel awaits.',
        },
        {
          id: 'es-modules-and-architecture',
          heading: 'ES Modules (import / export) & Resilient API Clients',
          body: [
            'Modern JavaScript splits applications into ES Modules (<script type="module"> in browsers, native in Vite/Node). Prefer named exports (export async function fetchUser() {}) over default exports because editors autocomplete exact names, catch typos at build time, and make refactoring painless across dozens of files.',
            'For heavy features like chart libraries or PDF exporters that most visitors never open, use dynamic import("./charts.js") inside a click handler so the browser downloads that module only on demand, keeping initial page load fast.',
          ],
          points: [
            'ES Modules automatically run in strict mode ("use strict") and have their own module scope—no accidental window globals.',
            'Centralize base URL, auth headers, response.ok checks, and AbortSignal timeouts in one small apiClient.js module.',
            'Always clear loading state inside a finally block so buttons never remain permanently stuck on "Loading..." after an error.',
          ],
          example: {
            title: 'Resilient fetchJson Helper & Promise.allSettled Dashboard',
            language: 'javascript',
            code: `// apiClient.js (ES Module)
export async function fetchJson(url, { timeoutMs = 5000 } = {}) {
  const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) {
    throw new Error(\`Request failed with HTTP \${res.status}\`);
  }
  return res.json();
}

// dashboard.js
import { fetchJson } from './apiClient.js';

const results = await Promise.allSettled([
  fetchJson('/api/profile'),
  fetchJson('/api/notifications'),
]);`,
            playground: {
              html: `<div class="wrap">
  <button id="run" type="button">Load Widgets (Promise.allSettled)</button>
  <pre id="log">Click to simulate 2 successful APIs + 1 failed API without crashing the page.</pre>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
button { padding: 9px 14px; border: none; border-radius: 8px; background: #2563eb; color: white; font-weight: 600; cursor: pointer; }
button:disabled { opacity: 0.6; cursor: wait; }
pre { margin-top: 12px; padding: 14px; border-radius: 10px; background: #f4f4f5; font-size: 12px; line-height: 1.6; overflow-x: auto; }`,
              js: `const mockFetch = (name, ms, shouldFail = false) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (shouldFail) reject(new Error(\`\${name}: HTTP 503 Service Unavailable\`));
      else resolve({ service: name, ok: true });
    }, ms)
  );

const btn = document.getElementById('run');
const log = document.getElementById('log');

btn.addEventListener('click', async () => {
  btn.disabled = true;
  log.textContent = 'Fetching 3 widgets in parallel...';
  try {
    const outcomes = await Promise.allSettled([
      mockFetch('profile', 200),
      mockFetch('analytics', 250, true),
      mockFetch('lessons', 180),
    ]);
    const summary = outcomes.map((o) =>
      o.status === 'fulfilled' ? { ok: true, data: o.value } : { ok: false, error: o.reason.message }
    );
    log.textContent = JSON.stringify(summary, null, 2);
    console.log('Settled:', summary);
  } finally {
    btn.disabled = false;
  }
});`,
            },
          },
          tip: 'Use Promise.all(ids.map((id) => fetchItem(id))) when requests are independent—running 5 sequential 200ms awaits takes 1000ms, while running them in parallel takes ~200ms.',
        },
      ],
      challenge: {
        prompt:
          'Write an exported async ES Module function getUser(id) that calls fetch(`/api/users/${id}`), throws an Error if !res.ok (including res.status), and returns await res.json(). Wrap a sample call in try / catch / finally.',
        hint: 'Check if (!res.ok) throw new Error(`HTTP ${res.status}`); before returning res.json().',
        language: 'javascript',
        solutionCode: `export async function getUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) {
    throw new Error(\`Failed to load user \${id}: HTTP \${res.status}\`);
  }
  return res.json();
}

async function run() {
  try {
    const user = await getUser(42);
    console.log('Loaded:', user);
  } catch (err) {
    console.error(err.message);
  } finally {
    console.log('Request complete');
  }
}`,
      },
      quiz: [
        {
          question:
            'What happens when fetch("/api/missing") receives an HTTP 404 Not Found response?',
          options: [
            'The fetch() promise automatically rejects into the catch block',
            'The fetch() promise resolves normally with response.ok === false and response.status === 404',
            'JavaScript automatically retries the request three times',
            'response.json() returns null without error',
          ],
          answer: 1,
          explanation:
            'fetch() only rejects on network errors or aborts, not HTTP 4xx/5xx statuses. You must check if (!response.ok) and throw explicitly.',
        },
        {
          question:
            'Why does items.forEach(async (item) => { await save(item); }) cause unexpected bugs?',
          options: [
            'forEach does not accept arrow functions',
            'forEach does not await the promises returned by its callback, so code after forEach runs before the saves finish',
            'await is forbidden inside arrays',
            'forEach automatically cancels async calls after 100ms',
          ],
          answer: 1,
          explanation:
            'forEach discards callback return values; use for...of for sequential awaits or await Promise.all(items.map(...)) for parallel execution.',
        },
      ],
    },
    km: {
      duration: '14 នាទី',
      objectives: [
        'គ្រប់គ្រងកំហុស HTTP ពិតប្រាកដជាមួយ fetch() ដោយពិនិត្យ response.ok, ពេលកំណត់ AbortSignal.timeout() និង try/catch/finally។',
        'ជ្រើសរើសរវាង Promise.all, Promise.allSettled និង Promise.race សម្រាប់ការងារស្របគ្នា។',
        'រៀបចំកូដខ្នាតធំដោយ ES Modules (named vs default export, dynamic import() និង API client ស្អាត)។',
      ],
      extraSections: [
        {
          id: 'fetch-api-and-http-errors',
          heading: 'fetch() ក្នុងការប្រើពិត, កំហុស HTTP និង Promise Combinators',
          body: [
            'កំហុសធំបំផុតមួយក្នុង JavaScript គឺការគិតថា fetch() នឹង reject ពេលម៉ាស៊ីនមេឆ្លើយ HTTP 404 ឬ 500។ ការពិតវាមិន reject ទេ—fetch() reject តែពេលដាច់អ៊ីនធឺណិត ឬត្រូវបានបោះបង់ (abort) ប៉ុណ្ណោះ។ ត្រូវពិនិត្យ if (!response.ok) throw new Error(`HTTP ${response.status}`); ជានិច្ចមុនហៅ await response.json()។',
            'ពេលដំណើរការសំណើស្របគ្នា ត្រូវជ្រើស combinator ឱ្យត្រូវ៖ Promise.all() បរាជ័យភ្លាមបើមានសំណើណាមួយខុស (ស័ក្តិសមពេលត្រូវការទិន្នន័យទាំងអស់) ចំណែក Promise.allSettled() រង់ចាំគ្រប់សំណើ ហើយផ្ដល់លទ្ធផលនីមួយៗ ដើម្បីកុំឱ្យផ្នែកមួយខូចធ្វើឱ្យគាំងផ្ទាំងគ្រប់គ្រងទាំងមូល។',
          ],
          table: {
            headers: ['API / Combinator', 'ឥរិយាបថ', 'ពេលណាគួរប្រើ'],
            rows: [
              [
                'response.ok',
                'true សម្រាប់ HTTP 200–299',
                'ពិនិត្យជានិច្ចមុនបម្លែង response.json()។',
              ],
              [
                'AbortSignal.timeout(5000)',
                'បោះបង់ fetch ស្វ័យប្រវត្តិក្រោយ 5 វិនាទី',
                'ការពារ UI កុំឱ្យជាប់ Loading រហូតពេលបណ្ដាញយឺត។',
              ],
              [
                'Promise.all([a, b])',
                'ស្របគ្នា; reject បើមានមួយបរាជ័យ',
                'ផ្ទុកទិន្នន័យចាំបាច់ដែលត្រូវការព្រមគ្នា។',
              ],
              [
                'Promise.allSettled([a, b])',
                'ស្របគ្នា; មិន reject ទេ បង្ហាញគ្រប់លទ្ធផល',
                'ផ្ទាំង widget ឯករាជ្យ ឬការផ្ញើសារជាបាច់។',
              ],
              [
                'finally { ... }',
                'ដំណើរការទាំងពេលជោគជ័យ និងកំហុស',
                'បិទស្ថានភាព loading spinner ដោយប្រាកដ។',
              ],
            ],
          },
          warning:
            'កុំសរសេរ await ក្នុង callback របស់ forEach() (items.forEach(async item => await save(item)))—ព្រោះ forEach មិនរង់ចាំ Promise ទេ! ប្រើ for...of សម្រាប់រង់ចាំតាមលំដាប់ ឬ Promise.all(items.map(...)) សម្រាប់រត់ស្របគ្នា។',
        },
        {
          id: 'es-modules-and-architecture',
          heading: 'ES Modules (import / export) និងការបង្កើត API Client រឹងមាំ',
          body: [
            'JavaScript ទំនើបបំបែកកម្មវិធីជា ES Modules (<script type="module"> ក្នុងកម្មវិធីរុករក និង Vite/Node)។ គួរប្រើ named exports (export async function fetchUser() {}) ជាជាង default export ព្រោះ editor អាចណែនាំឈ្មោះត្រឹមត្រូវ និងចាប់កំហុសអក្ខរាវិរុទ្ធភ្លាមៗ។',
            'សម្រាប់មុខងារធ្ងន់ៗដូចជាបណ្ណាល័យក្រាហ្វ ឬបង្កើត PDF ដែលអ្នកប្រើភាគច្រើនមិនបើក ប្រើ dynamic import("./charts.js") ក្នុង click handler ដើម្បីទាញយកតែពេលត្រូវការ ជួយឱ្យទំព័រផ្ទុកដំបូងលឿន។',
          ],
          points: [
            'ES Modules រត់ក្នុង strict mode ដោយស្វ័យប្រវត្តិ និងមាន scope ផ្ទាល់ខ្លួន មិនបំពុល window global ឡើយ។',
            'ប្រមូល base URL, headers, ការពិនិត្យ response.ok និង timeout ទុកក្នុងឯកសារ apiClient.js តែមួយ។',
            'តែងតែបិទស្ថានភាព loading ក្នុងប្លុក finally ដើម្បីកុំឱ្យប៊ូតុងជាប់គាំងនៅ "Loading..." ពេលមានកំហុស។',
          ],
          exampleTitle: 'អនុគមន៍ fetchJson រឹងមាំ និង Promise.allSettled',
          tip: 'ប្រើ Promise.all(ids.map((id) => fetchItem(id))) ពេលសំណើឯករាជ្យពីគ្នា—សំណើ 5 ដែលចំណាយ 200ms ម្នាក់ ត្រូវការ 1000ms បើរង់ចាំម្ដងមួយ តែត្រូវការត្រឹម ~200ms បើរត់ស្របគ្នា។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ ES Module async function ឈ្មោះ getUser(id) (ប្រើ export) ដែលហៅ fetch(`/api/users/${id}`), បោះ Error ប្រសិនបើ !res.ok (រួមទាំង res.status) និងត្រឡប់ await res.json()។ រួចហៅសាកល្បងក្នុង try / catch / finally។',
        hint: 'ពិនិត្យ if (!res.ok) throw new Error(`HTTP ${res.status}`); មុនត្រឡប់ res.json()។',
      },
      quiz: [
        {
          question: 'តើមានអ្វីកើតឡើងនៅពេល fetch("/api/missing") ទទួលបានចម្លើយ HTTP 404 Not Found?',
          options: [
            'fetch() promise នឹង reject ចូលទៅប្លុក catch ដោយស្វ័យប្រវត្តិ',
            'fetch() promise resolve ធម្មតាដោយមាន response.ok === false និង response.status === 404',
            'JavaScript ព្យាយាមហៅម្ដងទៀត 3 ដងដោយស្វ័យប្រវត្តិ',
            'response.json() ត្រឡប់ null ដោយគ្មានកំហុស',
          ],
          answer: 1,
          explanation:
            'fetch() reject តែពេលមានបញ្ហាបណ្ដាញ ឬ abort ប៉ុណ្ណោះ មិនមែនលេខ HTTP 4xx/5xx ទេ។ អ្នកត្រូវពិនិត្យ if (!response.ok) ហើយ throw កំហុសដោយខ្លួនឯង។',
        },
        {
          question:
            'ហេតុអ្វីបានជា items.forEach(async (item) => { await save(item); }) បង្កកំហុសមិនរំពឹងទុក?',
          options: [
            'forEach មិនទទួលយក arrow function ទេ',
            'forEach មិនរង់ចាំ Promise ដែល callback ត្រឡប់ទេ ធ្វើឱ្យកូដបន្ទាប់ដំណើរការមុនពេល save ចប់',
            'await ត្រូវបានហាមឃាត់ក្នុងអារេ',
            'forEach បោះបង់ async ក្រោយ 100ms',
          ],
          answer: 1,
          explanation:
            'forEach មិនអើពើនឹងតម្លៃត្រឡប់របស់ callback ឡើយ; ប្រើ for...of សម្រាប់រង់ចាំតាមលំដាប់ ឬ await Promise.all(items.map(...)) សម្រាប់រត់ស្របគ្នា។',
        },
      ],
    },
  },
}
