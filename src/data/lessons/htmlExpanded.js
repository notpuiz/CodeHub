export const htmlExpanded = [
  // =========================================================================
  // 1. HTML Attributes, Classes & IDs
  // =========================================================================
  {
    slug: 'html-attributes-and-styles',
    level: 'beginner',
    insertAfter: 'introduction',
    en: {
      title: 'HTML Attributes, Classes & IDs',
      duration: '11 min',
      summary:
        'Master global attributes, reusable CSS classes, unique document IDs, and custom data-* attributes to wire HTML cleanly to CSS and JavaScript.',
      objectives: [
        'Write valid HTML attributes including key-value pairs, boolean attributes, and global attributes like title, hidden, and tabindex.',
        'Decide accurately when to use reusable class names versus unique id identifiers in real layouts.',
        'Attach and read custom data-* attributes using CSS attribute selectors and the JavaScript element.dataset API.',
      ],
      sections: [
        {
          id: 'attribute-syntax-and-global-attrs',
          heading: 'Attribute Anatomy & Global Attributes',
          body: [
            'Attributes live inside an element’s opening tag and supply extra configuration—such as an element’s identity, tooltip text, language, or interactive state—without cluttering the visible content. Most attributes follow the name="value" pattern, while boolean attributes such as hidden, disabled, or readonly take effect simply by being present on the tag.',
            'HTML defines a core set of global attributes that work on virtually every element in the document, from headings and paragraphs to buttons and sections. Learning these global attributes lets you control accessibility, keyboard focus order, tooltips, and visibility consistently across your entire site.',
          ],
          table: {
            headers: ['Global Attribute', 'Example', 'What It Does'],
            rows: [
              [
                'id',
                'id="checkout-summary"',
                'Assigns a single unique identifier for anchors, labels, CSS, and JavaScript.',
              ],
              [
                'class',
                'class="card featured"',
                'Applies one or more space-separated reusable style or behavior hooks.',
              ],
              [
                'title',
                'title="Keyboard shortcut: Ctrl+S"',
                'Displays advisory tooltip text on pointer hover (not a replacement for visible labels).',
              ],
              [
                'hidden',
                '<p hidden>Draft note</p>',
                'Boolean attribute that hides an element visually and removes it from assistive trees.',
              ],
              [
                'data-*',
                'data-plan="pro"',
                'Stores custom application metadata readable via CSS selectors and element.dataset.',
              ],
              [
                'tabindex',
                'tabindex="0"',
                'Controls whether and in what order an element can receive keyboard focus.',
              ],
              [
                'lang / dir',
                'lang="km" dir="ltr"',
                'Declares text language and reading direction for screen readers and spellcheckers.',
              ],
            ],
          },
          example: {
            title: 'Global Attributes in Action',
            language: 'html',
            code: `<section lang="en" class="note-box">
  <h2 title="Hovering shows this browser tooltip">Workspace Notes</h2>
  <p contenteditable="true" tabindex="0">
    Click here and type directly inside this editable paragraph.
  </p>
  <p id="secret-tip" hidden>
    Hidden elements stay in the DOM until you remove the hidden attribute.
  </p>
</section>`,
            playground: {
              html: `<section class="panel">
  <h2 title="Tooltip provided by the HTML title attribute">Global Attributes Demo</h2>
  <p class="editable" contenteditable="true" tabindex="0">
    Click inside this box and edit the text right in the browser.
  </p>
  <button id="toggle-btn" type="button">Reveal Hidden Notice</button>
  <p id="notice" class="notice" hidden>
    The <code>hidden</code> attribute was removed! Screen readers and visitors can now see this message.
  </p>
</section>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.panel { max-width: 52ch; display: grid; gap: 12px; }
h2 { margin: 0; font-size: 18px; cursor: help; }
.editable { margin: 0; padding: 12px; border: 1px dashed #94a3b8; border-radius: 8px; background: #f8fafc; line-height: 1.5; }
.editable:focus { outline: 2px solid #2563eb; border-color: transparent; background: #ffffff; }
button { justify-self: start; padding: 8px 14px; border: none; border-radius: 8px; background: #2563eb; color: #fff; font-weight: 600; cursor: pointer; }
.notice { margin: 0; padding: 10px 12px; border-radius: 8px; background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; font-size: 14px; }`,
              js: `const btn = document.getElementById('toggle-btn');
const notice = document.getElementById('notice');

btn.addEventListener('click', () => {
  notice.hidden = !notice.hidden;
  btn.textContent = notice.hidden ? 'Reveal Hidden Notice' : 'Hide Notice Again';
});`,
            },
          },
          tip: 'Although the inline style="..." attribute is global, reserve it for rare dynamic values (such as a progress bar width set by JavaScript). Keeping styles in CSS classes makes your markup cleaner and easier to maintain.',
        },
        {
          id: 'classes-vs-ids',
          heading: 'Choosing Between class and id',
          body: [
            'The class attribute is designed for reuse. Any number of elements on a page can share the same class, and a single element can combine multiple space-separated classes—for example class="btn btn-primary btn-lg"—so you can compose base styles with modifier variants cleanly.',
            'By contrast, an id must be completely unique across the entire HTML document. Besides styling a singular landmark, IDs power real browser features: in-page anchor links (<a href="#pricing">), form label bindings (<label for="email">), ARIA relationships (aria-describedby="hint-1"), and fast JavaScript lookups via document.getElementById().',
          ],
          points: [
            'Use class for styling components, cards, buttons, and repeated layout patterns.',
            'Use id for unique document landmarks, form field bindings, jump-to-section anchors, and ARIA pointers.',
            'Prefer lowercase kebab-case names (e.g., user-card, nav-toggle) and never put spaces inside an id value.',
            'Avoid using #id selectors for routine CSS styling; their high specificity makes overrides painful later.',
          ],
          example: {
            title: 'Reusable Classes vs a Unique Document ID',
            language: 'html',
            code: `<nav aria-label="Page jump">
  <a href="#featured-mentor">Jump to Featured Mentor</a>
</nav>

<article class="profile-card">
  <h3>Dara Sok</h3>
  <span class="badge">HTML</span>
</article>

<article id="featured-mentor" class="profile-card is-featured">
  <h3>Sophea Lim</h3>
  <span class="badge">Mentor</span>
  <span class="badge">Accessibility</span>
</article>`,
          },
          warning:
            'Never assign the same id to two elements on the same page. Duplicate IDs break fragment links, cause <label> clicks to focus the wrong input, and make document.getElementById() silently ignore every match after the first one.',
        },
        {
          id: 'custom-data-attributes',
          heading: 'Custom data-* Attributes & the dataset API',
          body: [
            'Sometimes your interface needs to store extra state or metadata on an element—like a course difficulty level, a product price, or an item ID—without inventing invalid HTML tags or packing data into CSS class names. Any attribute starting with data- followed by lowercase letters, numbers, or hyphens is 100% valid HTML5.',
            'Both CSS and JavaScript have first-class support for data-* attributes. CSS can target them with attribute selectors such as [data-active="true"], while JavaScript exposes them on element.dataset by converting hyphenated names to camelCase automatically (for example, data-unit-price becomes element.dataset.unitPrice).',
          ],
          points: [
            'HTML attribute data-course-level="beginner" maps to JS element.dataset.courseLevel.',
            'CSS selectors like .course[data-selected="true"] let state attributes drive visual feedback cleanly.',
            'All dataset values are stored as strings—convert numbers with Number(el.dataset.price) before doing math.',
          ],
          example: {
            title: 'Interactive Course Picker Powered by data-* Attributes',
            language: 'html',
            code: `<button
  class="track-btn"
  data-track-name="HTML Fundamentals"
  data-lesson-count="12"
  data-selected="false"
>
  HTML Fundamentals
</button>`,
            playground: {
              html: `<div class="picker">
  <p class="hint">Click courses to toggle <code>data-selected</code> and sum lessons via <code>dataset</code>:</p>
  <div class="grid">
    <button class="course" type="button" data-course-name="HTML Core" data-lessons="12" data-selected="true">
      <strong>HTML Core</strong><span>12 lessons</span>
    </button>
    <button class="course" type="button" data-course-name="CSS Layout" data-lessons="10" data-selected="false">
      <strong>CSS Layout</strong><span>10 lessons</span>
    </button>
    <button class="course" type="button" data-course-name="JavaScript DOM" data-lessons="14" data-selected="false">
      <strong>JavaScript DOM</strong><span>14 lessons</span>
    </button>
  </div>
  <output id="summary" class="summary"></output>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.picker { max-width: 560px; display: grid; gap: 12px; }
.hint { margin: 0; font-size: 14px; color: #52525b; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
.course { display: grid; gap: 4px; text-align: left; padding: 12px; border-radius: 10px; border: 1px solid #d4d4d8; background: #fff; cursor: pointer; }
.course span { font-size: 13px; color: #52525b; }
.course[data-selected="true"] { border-color: #2563eb; background: #eff6ff; box-shadow: 0 0 0 2px rgba(37,99,235,0.18); }
.summary { padding: 10px 12px; border-radius: 8px; background: #f4f4f5; font-size: 14px; font-weight: 500; }`,
              js: `const buttons = document.querySelectorAll('.course');
const summary = document.getElementById('summary');

function updateSummary() {
  const active = [...buttons].filter((b) => b.dataset.selected === 'true');
  const total = active.reduce((sum, b) => sum + Number(b.dataset.lessons), 0);
  const names = active.map((b) => b.dataset.courseName).join(', ') || 'None';
  summary.textContent = 'Selected: ' + names + ' (' + total + ' total lessons)';
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.dataset.selected = btn.dataset.selected === 'true' ? 'false' : 'true';
    updateSummary();
  });
});

updateSummary();`,
            },
          },
          tip: 'Never place sensitive secrets or private user tokens inside data-* attributes—anyone can read them immediately in browser DevTools.',
        },
      ],
      challenge: {
        prompt:
          'Write an HTML product card using <article> with a unique id="starter-kit", two reusable classes ("product-card" and "featured"), a helpful title tooltip, custom data attributes data-sku="CH-101" and data-price="29", a visible heading and description, and a <p> promo message that starts hidden using the hidden boolean attribute.',
        hint: 'Place multiple classes inside one class="..." attribute separated by a space, use data-sku and data-price on the <article>, and write hidden without ="true".',
        language: 'html',
        solutionCode: `<article
  id="starter-kit"
  class="product-card featured"
  title="Best value bundle for beginners"
  data-sku="CH-101"
  data-price="29"
>
  <h2>Web Starter Kit</h2>
  <p>Includes interactive HTML, CSS, and JavaScript practice worksheets.</p>
  <p hidden>Use code LAUNCH20 for 20% off during checkout.</p>
</article>`,
      },
      quiz: [
        {
          question:
            'If an element has the attribute data-max-retries="5", how do you read its value in JavaScript via dataset?',
          options: [
            'element.dataset["data-max-retries"]',
            'element.dataset.maxRetries',
            'element.data.max_retries',
            'element.attributes.maxRetries',
          ],
          answer: 1,
          explanation:
            'The dataset API strips the data- prefix and converts kebab-case hyphens into camelCase, so data-max-retries becomes element.dataset.maxRetries.',
        },
        {
          question:
            'Which statement accurately describes the difference between id and class in HTML?',
          options: [
            'An element can have multiple space-separated IDs, but only one class',
            'class is only for JavaScript while id is only for CSS',
            'An id must be unique per document, whereas a class can be reused on many elements',
            'id values are allowed to contain spaces as long as they are wrapped in quotes',
          ],
          answer: 2,
          explanation:
            'IDs identify a single unique element in the document (for anchors, labels, ARIA, and getElementById), while classes are reusable and can be combined with spaces.',
        },
      ],
    },
    km: {
      title: 'គុណលក្ខណៈ Class និង ID ក្នុង HTML',
      duration: '11 នាទី',
      summary:
        'ស្ទាត់ជំនាញលើគុណលក្ខណៈសកល (global attributes), class ដែលប្រើឡើងវិញបាន, id តែមួយគត់ និង data-* ដើម្បីភ្ជាប់ HTML ជាមួយ CSS និង JavaScript យ៉ាងស្អាត។',
      objectives: [
        'សរសេរគុណលក្ខណៈ HTML បានត្រឹមត្រូវ រួមទាំងទម្រង់ name="value", boolean attributes និងគុណលក្ខណៈសកលដូចជា title, hidden និង tabindex។',
        'សម្រេចចិត្តបានត្រឹមត្រូវថាពេលណាត្រូវប្រើ class ដែលប្រើឡើងវិញបាន និងពេលណាត្រូវប្រើ id តែមួយគត់។',
        'រក្សាទុក និងអានទិន្នន័យផ្ទាល់ខ្លួនតាម data-* ដោយប្រើ CSS attribute selectors និង element.dataset ក្នុង JavaScript។',
      ],
      sections: [
        {
          id: 'attribute-syntax-and-global-attrs',
          heading: 'រចនាសម្ព័ន្ធគុណលក្ខណៈ និងគុណលក្ខណៈសកល (Global Attributes)',
          body: [
            'គុណលក្ខណៈ (Attributes) ស្ថិតនៅខាងក្នុងស្លាកបើករបស់ធាតុ ហើយផ្តល់ការកំណត់បន្ថែម—ដូចជាអត្តសញ្ញាណ អត្ថបទជំនួយ (tooltip) ភាសា ឬស្ថានភាពអន្តរកម្ម—ដោយមិនធ្វើឱ្យមាតិកាដែលបង្ហាញរញ៉េរញ៉ៃឡើយ។ គុណលក្ខណៈភាគច្រើនមានទម្រង់ name="value" ចំណែក boolean attributes ដូចជា hidden, disabled ឬ readonly មានប្រសិទ្ធភាពភ្លាមៗគ្រាន់តែដាក់ឈ្មោះវានៅលើស្លាក។',
            'HTML ផ្តល់នូវសំណុំគុណលក្ខណៈសកល (global attributes) ដែលអាចប្រើបានលើស្ទើរតែគ្រប់ធាតុទាំងអស់ក្នុងឯកសារ។ ការយល់ដឹងពីគុណលក្ខណៈទាំងនេះជួយឱ្យអ្នកគ្រប់គ្រងភាពងាយស្រួលប្រើប្រាស់ លំដាប់ focus តាមក្តារចុច tooltip និងការបង្ហាញឬលាក់ធាតុបានយ៉ាងស៊ីសង្វាក់គ្នា។',
          ],
          table: {
            headers: ['គុណលក្ខណៈសកល', 'ឧទាហរណ៍', 'តួនាទី'],
            rows: [
              [
                'id',
                'id="checkout-summary"',
                'កំណត់អត្តសញ្ញាណតែមួយគត់សម្រាប់តំណភ្ជាប់ក្នុងទំព័រ label, CSS និង JavaScript។',
              ],
              [
                'class',
                'class="card featured"',
                'ដាក់ឈ្មោះក្រុមមួយ ឬច្រើនដាច់ដោយដកឃ្លា ដើម្បីប្រើរចនាប័ទ្មឡើងវិញ។',
              ],
              [
                'title',
                'title="Keyboard shortcut: Ctrl+S"',
                'បង្ហាញអត្ថបទជំនួយ (tooltip) ពេលយកកណ្ដុរទៅដាក់ពីលើ។',
              ],
              [
                'hidden',
                '<p hidden>Draft note</p>',
                'គុណលក្ខណៈ Boolean ដែលលាក់ធាតុពីអេក្រង់ និងកម្មវិធីអានអេក្រង់។',
              ],
              [
                'data-*',
                'data-plan="pro"',
                'រក្សាទុកទិន្នន័យបន្ថែមផ្ទាល់ខ្លួន ដែលអាចអានបានដោយ CSS និង element.dataset។',
              ],
              [
                'tabindex',
                'tabindex="0"',
                'កំណត់ថាតើធាតុអាចទទួល focus តាមគ្រាប់ចុច Tab បានឬទេ និងតាមលំដាប់ណា។',
              ],
              [
                'lang / dir',
                'lang="km" dir="ltr"',
                'ប្រកាសភាសា និងទិសដៅអានសម្រាប់កម្មវិធីអានអេក្រង់ និងការពិនិត្យអក្ខរាវិរុទ្ធ។',
              ],
            ],
          },
          exampleTitle: 'ការប្រើប្រាស់គុណលក្ខណៈសកលជាក់ស្ដែង',
          tip: 'ទោះបីគុណលក្ខណៈ style="..." ជាគុណលក្ខណៈសកលក៏ដោយ គួរប្រើវាតែសម្រាប់តម្លៃថាមវន្តកម្រប៉ុណ្ណោះ (ដូចជាទទឹងរបារដំណើរការពី JavaScript)។ ការរក្សាស្ទីលក្នុង CSS class ធ្វើឱ្យកូដងាយថែទាំជាង។',
        },
        {
          id: 'classes-vs-ids',
          heading: 'ការជ្រើសរើសរវាង class និង id',
          body: [
            'គុណលក្ខណៈ class ត្រូវបានបង្កើតឡើងសម្រាប់ប្រើឡើងវិញ។ ធាតុច្រើននៅលើទំព័រអាចប្រើ class ដូចគ្នា ហើយធាតុមួយក៏អាចផ្សំ class ច្រើនដាច់ដោយដកឃ្លាផងដែរ—ឧទាហរណ៍ class="btn btn-primary btn-lg"—ដើម្បីផ្គុំរចនាប័ទ្មមូលដ្ឋានជាមួយទម្រង់ផ្សេងៗបានយ៉ាងស្រួល។',
            'ផ្ទុយទៅវិញ id ត្រូវតែមានតែមួយគត់នៅក្នុងឯកសារ HTML ទាំងមូល។ ក្រៅពីសម្គាល់ទីតាំងសំខាន់ៗ វាដំណើរការមុខងារសំខាន់ៗរបស់កម្មវិធីរុករកដូចជា តំណលោតក្នុងទំព័រ (<a href="#pricing">), ការភ្ជាប់ <label for="email">, ទំនាក់ទំនង ARIA (aria-describedby) និងការស្វែងរកធាតុរហ័សតាម document.getElementById()។',
          ],
          points: [
            'ប្រើ class សម្រាប់តុបតែងសមាសភាគ កាត ប៊ូតុង និងប្លង់ដែលប្រើឡើងវិញច្រើនដង។',
            'ប្រើ id សម្រាប់ចំណុចសម្គាល់តែមួយគត់ ការភ្ជាប់ស្លាកទម្រង់ តំណលោតក្នុងទំព័រ និង ARIA។',
            'ប្រើឈ្មោះអក្សរតូចបំបែកដោយសញ្ញាដក (kebab-case ដូចជា user-card) ហើយកុំដាក់ដកឃ្លាក្នុងតម្លៃ id។',
            'ជៀសវាងការប្រើ #id សម្រាប់សរសេរ CSS ទូទៅ ព្រោះវាមានអាទិភាព (specificity) ខ្ពស់ពេកពិបាកកែប្រែពេលក្រោយ។',
          ],
          exampleTitle: 'ការប្រៀបធៀប Class ប្រើឡើងវិញ និង ID តែមួយគត់',
          warning:
            'កុំដាក់ id ដូចគ្នាលើធាតុពីរក្នុងទំព័រតែមួយ។ ID ស្ទួនធ្វើឱ្យតំណលោតខុសទីតាំង ការចុច <label> ទៅប៉ះប្រអប់បញ្ចូលខុស ហើយ document.getElementById() នឹងរំលងធាតុបន្ទាប់ទាំងអស់ដោយស្ងាត់ៗ។',
        },
        {
          id: 'custom-data-attributes',
          heading: 'គុណលក្ខណៈ data-* ផ្ទាល់ខ្លួន និង dataset API',
          body: [
            'ពេលខ្លះចំណុចប្រទាក់ត្រូវការរក្សាទុកស្ថានភាព ឬទិន្នន័យបន្ថែមលើធាតុផ្ទាល់—ដូចជាកម្រិតមេរៀន តម្លៃទំនិញ ឬលេខសម្គាល់—ដោយមិនចាំបាច់បង្កើតស្លាកខុសស្តង់ដារឡើយ។ គុណលក្ខណៈណាដែលចាប់ផ្ដើមដោយ data- តាមដោយអក្សរតូច លេខ ឬសញ្ញាដក គឺត្រឹមត្រូវ 100% តាមស្តង់ដារ HTML5។',
            'ទាំង CSS និង JavaScript គាំទ្រ data-* យ៉ាងពេញលេញ។ CSS អាចជ្រើសរើសវាតាម [data-active="true"] ចំណែក JavaScript អានវាតាម element.dataset ដោយបម្លែងឈ្មោះមានសញ្ញាដកទៅជា camelCase ដោយស្វ័យប្រវត្តិ (ឧទាហរណ៍ data-unit-price ក្លាយជា element.dataset.unitPrice)។',
          ],
          points: [
            'គុណលក្ខណៈ data-course-level="beginner" ត្រូវគ្នានឹង element.dataset.courseLevel ក្នុង JavaScript។',
            'CSS selector ដូចជា .course[data-selected="true"] ជួយបង្ហាញស្ថានភាពអន្តរកម្មបានយ៉ាងស្អាត។',
            'តម្លៃក្នុង dataset ទាំងអស់ជាអក្សរ (string)—ត្រូវបម្លែងជាលេខដោយ Number(el.dataset.price) មុនគណនា។',
          ],
          exampleTitle: 'កម្មវិធីជ្រើសរើសវគ្គសិក្សាដោយប្រើ data-* Attributes',
          tip: 'កុំដាក់ព័ត៌មានសម្ងាត់ ឬ token ឯកជនក្នុង data-* ព្រោះអ្នកណាក៏អាចបើកមើលវាបានភ្លាមៗក្នុង DevTools។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរកាតផលិតផល HTML ដោយប្រើ <article> ដែលមាន id="starter-kit" តែមួយគត់, class ពីរ ("product-card" និង "featured"), tooltip តាម title, គុណលក្ខណៈ data-sku="CH-101" និង data-price="29", ចំណងជើង និងការពិពណ៌នា និងសារប្រូម៉ូសិន <p> ដែលលាក់ទុកជាមុនដោយប្រើ boolean attribute hidden។',
        hint: 'ដាក់ class ច្រើនក្នុង class="..." តែមួយដោយដកឃ្លា ប្រើ data-sku និង data-price លើ <article> ហើយសរសេរ hidden ដោយមិនចាំបាច់ ="true"។',
      },
      quiz: [
        {
          question:
            'បើធាតុមួយមានគុណលក្ខណៈ data-max-retries="5" តើត្រូវអានតម្លៃវាដូចម្ដេចតាម dataset ក្នុង JavaScript?',
          options: [
            'element.dataset["data-max-retries"]',
            'element.dataset.maxRetries',
            'element.data.max_retries',
            'element.attributes.maxRetries',
          ],
          answer: 1,
          explanation:
            'dataset API ដកបុព្វបទ data- ចេញ រួចបម្លែងឈ្មោះមានសញ្ញាដក (kebab-case) ទៅជា camelCase ដូច្នេះ data-max-retries ក្លាយជា element.dataset.maxRetries។',
        },
        {
          question: 'តើប្រយោគមួយណាពណ៌នាភាពខុសគ្នារវាង id និង class បានត្រឹមត្រូវ?',
          options: [
            'ធាតុមួយអាចមាន id ច្រើនដាច់ដោយដកឃ្លា ប៉ុន្តែមាន class តែមួយ',
            'class ប្រើសម្រាប់តែ JavaScript ចំណែក id ប្រើសម្រាប់តែ CSS',
            'id ត្រូវតែមានតែមួយគត់ក្នុងឯកសារ ចំណែក class អាចប្រើឡើងវិញលើធាតុច្រើនបាន',
            'តម្លៃ id អាចមានដកឃ្លាបាន ឱ្យតែដាក់ក្នុងសញ្ញាដកស្រង់',
          ],
          answer: 2,
          explanation:
            'ID សម្គាល់ធាតុតែមួយគត់ក្នុងទំព័រ (សម្រាប់តំណលោត label, ARIA និង getElementById) ចំណែក class អាចប្រើឡើងវិញ និងផ្គុំច្រើនដោយដកឃ្លាបាន។',
        },
      ],
    },
  },

  // =========================================================================
  // 2. Block vs Inline Elements
  // =========================================================================
  {
    slug: 'html-block-and-inline',
    level: 'beginner',
    insertAfter: 'semantic-text',
    en: {
      title: 'Block vs Inline Elements',
      duration: '10 min',
      summary:
        'Understand how block and inline elements flow on the page, when to reach for <div> and <span> versus <section> and <article>, and how HTML5 nesting rules prevent broken layouts.',
      objectives: [
        'Predict how block, inline, and inline-block elements handle line breaks, width, height, and margins.',
        'Choose between semantic containers (<section>, <article>) and generic hooks (<div>, <span>).',
        'Avoid invalid HTML nesting patterns that trigger automatic browser repair and broken DOM trees.',
      ],
      sections: [
        {
          id: 'block-vs-inline-behavior',
          heading: 'How Block & Inline Elements Flow',
          body: [
            'Every HTML element participates in normal document flow with a default display behavior. Block-level elements—such as <div>, <p>, <section>, <article>, <ul>, and <h1> through <h6>—always begin on a new line, stretch across 100% of their parent container’s width, and respect explicit width, height, and margins on all four sides.',
            'Inline elements—such as <span>, <a>, <strong>, <em>, and <code>—flow side-by-side inside a line of text and wrap cleanly across lines when space runs out. Because they live inside text lines, browsers ignore explicit width, height, margin-top, and margin-bottom on pure inline elements.',
          ],
          table: {
            headers: [
              'Property',
              'Block (<div>, <p>)',
              'Inline (<span>, <a>)',
              'Inline-Block (CSS)',
            ],
            rows: [
              ['Starts on a new line?', 'Yes', 'No', 'No'],
              ['Default width', '100% of parent', 'Shrinks to content', 'Shrinks to content'],
              ['Respects width & height?', 'Yes', 'No (ignored)', 'Yes'],
              ['Vertical margin (top/bottom)?', 'Yes', 'No (ignored)', 'Yes'],
              [
                'Common HTML tags',
                '<div>, <p>, <section>, <article>, <ul>',
                '<span>, <a>, <strong>, <code>',
                '<img>, <button>, <input>',
              ],
            ],
          },
          example: {
            title: 'Inspecting Block, Inline, and Inline-Block Behavior',
            language: 'html',
            code: `<div class="block-box">Block: takes full width and starts on a new line</div>
<p>
  This sentence contains an
  <span class="inline-tag">inline span</span>
  that flows smoothly with surrounding words.
</p>`,
            playground: {
              html: `<div class="demo">
  <div class="controls">
    <button type="button" data-mode="inline">display: inline</button>
    <button type="button" data-mode="inline-block">display: inline-block</button>
    <button type="button" data-mode="block">display: block</button>
  </div>

  <p class="sample">
    Before text —
    <span id="target" class="chip">Target &lt;span&gt; (width: 200px; margin: 16px)</span>
    — After text continues here.
  </p>
  <p id="caption" class="caption"></p>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.demo { max-width: 560px; display: grid; gap: 14px; }
.controls { display: flex; flex-wrap: wrap; gap: 8px; }
button { padding: 7px 12px; border: 1px solid #d4d4d8; border-radius: 8px; background: #fff; font-weight: 600; cursor: pointer; }
button.active { background: #2563eb; border-color: #2563eb; color: #fff; }
.sample { margin: 0; padding: 14px; border: 1px solid #e4e4e7; border-radius: 10px; line-height: 1.7; background: #fafafa; }
.chip { width: 200px; margin: 16px 6px; padding: 4px 10px; border-radius: 6px; background: #dbeafe; border: 1px solid #60a5fa; color: #1e3a8a; font-weight: 600; }
.caption { margin: 0; font-size: 13px; color: #52525b; }`,
              js: `const target = document.getElementById('target');
const caption = document.getElementById('caption');
const buttons = document.querySelectorAll('.controls button');
const notes = {
  inline: 'Pure inline: width: 200px and vertical margin: 16px are ignored by the browser.',
  'inline-block': 'inline-block: stays on the line, yet honors width: 200px and vertical margins.',
  block: 'block: breaks onto its own line and honors width: 200px and vertical margins.',
};

function setMode(mode) {
  target.style.display = mode;
  caption.textContent = notes[mode];
  buttons.forEach((b) => b.classList.toggle('active', b.dataset.mode === mode));
}

buttons.forEach((b) => b.addEventListener('click', () => setMode(b.dataset.mode)));
setMode('inline');`,
            },
          },
          tip: 'When padding or margins on a link (<a>) look strange or overlap adjacent lines, switch it to display: inline-block or display: inline-flex in CSS.',
        },
        {
          id: 'semantic-containers-vs-div-span',
          heading: 'Semantic Containers (<section>, <article>) vs <div> & <span>',
          body: [
            '<div> (generic block) and <span> (generic inline) carry zero semantic meaning. They are indispensable when you simply need a styling wrapper for a Flexbox row, a grid layout container, or an inline highlight inside a sentence.',
            'Whenever a region has a meaningful structural role, choose a semantic block element instead. Use <section> to group thematically related content that normally carries its own heading, and use <article> for a self-contained item—like a blog post, news card, forum reply, or course card—that still makes complete sense if shared on its own.',
          ],
          points: [
            'Use <article> when the content can stand alone (a news story, product card, or user comment).',
            'Use <section> to divide a page or an <article> into titled thematic chapters or panels.',
            'Use <div> strictly as a layout/styling container when no semantic landmark applies.',
            'Use <span> for inline styling or JavaScript hooks inside text when tags like <strong>, <em>, <mark>, or <time> do not fit.',
          ],
          example: {
            title: 'Structured Feed Using <section>, <article>, <div> & <span>',
            language: 'html',
            code: `<section aria-labelledby="latest-heading">
  <h2 id="latest-heading">Latest Engineering Notes</h2>

  <article class="post-card">
    <h3>Why Semantic Landmarks Speed Up Navigation</h3>
    <p>
      Screen readers let visitors jump straight to
      <span class="tag-pill">Landmarks</span> without tabbing through every link.
    </p>
    <div class="meta-row">
      <span>5 min read</span>
      <span>Updated today</span>
    </div>
  </article>
</section>`,
            playground: {
              html: `<section class="feed" aria-labelledby="feed-title">
  <h2 id="feed-title">Latest Notes</h2>

  <article class="post">
    <div class="post-top">
      <span class="pill">HTML5</span>
      <span class="read-time">4 min read</span>
    </div>
    <h3>Clean Landmarks Beat Div Soup</h3>
    <p>Reach for <span class="hl">&lt;article&gt;</span> for standalone cards and <span class="hl">&lt;section&gt;</span> for titled groups.</p>
  </article>

  <article class="post">
    <div class="post-top">
      <span class="pill">Layout</span>
      <span class="read-time">6 min read</span>
    </div>
    <h3>Inline vs Block Rhythm</h3>
    <p>Use <span class="hl">&lt;div&gt;</span> for Flexbox/Grid wrappers and <span class="hl">&lt;span&gt;</span> for subtle inline accents.</p>
  </article>
</section>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.feed { max-width: 520px; display: grid; gap: 12px; }
h2 { margin: 0; font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em; color: #52525b; }
.post { padding: 14px 16px; border: 1px solid #e4e4e7; border-radius: 10px; background: #fff; }
.post-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.pill { font-size: 12px; font-weight: 600; padding: 2px 8px; border-radius: 999px; background: #eff6ff; color: #1d4ed8; }
.read-time { font-size: 12px; color: #71717a; }
h3 { margin: 0 0 6px; font-size: 16px; }
p { margin: 0; font-size: 14px; color: #3f3f46; line-height: 1.55; }
.hl { padding: 1px 5px; border-radius: 4px; background: #fef3c7; font-family: ui-monospace, monospace; font-size: 13px; }`,
              js: '',
            },
          },
        },
        {
          id: 'html-nesting-rules',
          heading: 'HTML Content Models & Valid Nesting Rules',
          body: [
            'Modern HTML replaces the old “block vs inline” validation rule with formal content models—chiefly Flow Content (most body elements), Phrasing Content (inline text-level elements), and Interactive Content (links, buttons, inputs). As a reliable rule, phrasing elements such as <span> or <strong> must never wrap flow containers like <div>, <section>, or <ul>.',
            'HTML5 introduced one famous exception: the anchor tag <a> uses a transparent content model, meaning you can legally wrap an entire card (<div>, <h3>, <p>) inside a single <a href="..."> link—provided you never place another interactive element like a nested <a> or <button> inside it.',
          ],
          points: [
            'Never nest block elements (<div>, <ul>, <table>, <p>) inside a <p> tag—paragraphs only accept phrasing content.',
            'Never nest interactive controls inside each other (no <button> inside <a>, and no <a> inside <button>).',
            'Direct children of <ul> and <ol> should only be <li> items (plus optional <script>/<template>).',
            'Wrapping a whole card inside <a href="..."> is valid in HTML5 as long as there are no nested buttons or links inside.',
          ],
          example: {
            title: 'Valid vs Invalid HTML Nesting',
            language: 'html',
            code: `<!-- INVALID: <div> inside <p> forces the browser to close <p> early -->
<!-- <p>Summary <div class="box">Details</div></p> -->

<!-- VALID: sibling blocks inside a container -->
<div class="summary-block">
  <p>Summary</p>
  <div class="box">Details</div>
</div>

<!-- VALID HTML5: <a> wrapping block elements (no nested button/link inside) -->
<a class="card-link" href="/lessons/html-block-and-inline">
  <article>
    <h3>Block vs Inline</h3>
    <p>Read the full guide</p>
  </article>
</a>`,
          },
          warning:
            'If you place a <div>, <section>, or <ul> inside a <p> element, the HTML parser automatically closes the <p> right before the block element—producing unexpected empty <p></p> tags in the DOM and breaking parent-child CSS selectors.',
        },
      ],
      challenge: {
        prompt:
          'Refactor a generic layout into clean semantic HTML: create a <section> with an <h2> heading, containing one <article> card. Inside the <article>, include an <h3> title, a <p> paragraph with one inline <span class="highlight"> term, and a valid clickable <a href="/guide"> link without nesting a <button> inside the <a>.',
        hint: 'Keep <span class="highlight"> inside <p>, place the <article> inside <section>, and style the <a> directly rather than placing a <button> inside it.',
        language: 'html',
        solutionCode: `<section aria-labelledby="guides-title">
  <h2 id="guides-title">Featured HTML Guides</h2>
  <article class="guide-card">
    <h3>Understanding Document Flow</h3>
    <p>
      Learn how <span class="highlight">block</span> and inline elements arrange content naturally.
    </p>
    <a class="cta-link" href="/guide">Read the Guide</a>
  </article>
</section>`,
      },
      quiz: [
        {
          question:
            'Why do width: 240px and margin-top: 24px have no visual effect on a default <span> element?',
          options: [
            '<span> elements cannot be styled with CSS at all',
            'Inline elements shrink to their content and ignore explicit width, height, and vertical margins',
            'Only elements with an id attribute accept width and margin',
            'Browsers require <span> to be wrapped in a <div> before CSS applies',
          ],
          answer: 1,
          explanation:
            'By default, <span> has display: inline. Pure inline elements ignore width, height, margin-top, and margin-bottom unless changed to inline-block or block.',
        },
        {
          question:
            'What does a browser’s HTML parser do when it encounters <p>Intro <div>Box</div></p>?',
          options: [
            'It refuses to render the entire page',
            'It turns the <div> into an inline <span> automatically',
            'It automatically closes the <p> right before <div>, breaking the intended nesting',
            'It deletes the <div> from the DOM completely',
          ],
          answer: 2,
          explanation:
            'Because <p> can only contain phrasing (inline) content, encountering a block tag like <div> forces the parser to auto-close <p> immediately before <div>.',
        },
      ],
    },
    km: {
      title: 'ធាតុ Block និង Inline ក្នុង HTML',
      duration: '10 នាទី',
      summary:
        'ស្វែងយល់ពីលំហូរធាតុ Block និង Inline, ពេលណាគួរប្រើ <div> និង <span> ធៀបនឹង <section> និង <article> និងក្បួនដាក់ស្លាកត្រួតគ្នាក្នុង HTML5។',
      objectives: [
        'ព្យាករណ៍បានថាធាតុ block, inline និង inline-block គ្រប់គ្រងការចុះបន្ទាត់ ទទឹង កម្ពស់ និង margin ដូចម្ដេច។',
        'ជ្រើសរើសបានត្រឹមត្រូវរវាងធាតុផ្ទុកមានន័យ (<section>, <article>) និងធាតុទូទៅ (<div>, <span>)។',
        'ជៀសវាងការដាក់ស្លាកត្រួតគ្នាខុសក្បួន HTML ដែលបង្ខំឱ្យកម្មវិធីរុករកជួសជុលខុសប្លង់។',
      ],
      sections: [
        {
          id: 'block-vs-inline-behavior',
          heading: 'របៀបដែលធាតុ Block និង Inline រៀបលំហូរ',
          body: [
            'ធាតុ HTML នីមួយៗមានឥរិយាបថបង្ហាញលំនាំដើមក្នុងលំហូរឯកសារ។ ធាតុ Block—ដូចជា <div>, <p>, <section>, <article>, <ul> និង <h1> ដល់ <h6>—តែងតែចាប់ផ្ដើមលើបន្ទាត់ថ្មី លាតពេញទទឹង 100% នៃធាតុមេ ហើយទទួលយក width, height និង margin គ្រប់ជ្រុងទាំងបួន។',
            'ធាតុ Inline—ដូចជា <span>, <a>, <strong>, <em> និង <code>—រៀបក្បែរគ្នាតាមជួរអត្ថបទ ហើយចុះបន្ទាត់ដោយស្វ័យប្រវត្តិពេលអស់កន្លែង។ ដោយសារវានៅក្នុងជួរអត្ថបទ កម្មវិធីរុករកមិនអនុវត្ត width, height, margin-top និង margin-bottom លើធាតុ inline សុទ្ធឡើយ។',
          ],
          table: {
            headers: [
              'លក្ខណៈសម្បត្តិ',
              'Block (<div>, <p>)',
              'Inline (<span>, <a>)',
              'Inline-Block (CSS)',
            ],
            rows: [
              ['ចាប់ផ្ដើមលើបន្ទាត់ថ្មី?', 'បាទ/ចាស', 'ទេ', 'ទេ'],
              ['ទទឹងលំនាំដើម', 'ពេញ 100% នៃធាតុមេ', 'តាមទំហំមាតិកា', 'តាមទំហំមាតិកា'],
              ['ទទួលយក width & height?', 'បាទ/ចាស', 'ទេ (មិនអនុវត្ត)', 'បាទ/ចាស'],
              ['ទទួលយក margin លើ/ក្រោម?', 'បាទ/ចាស', 'ទេ (មិនអនុវត្ត)', 'បាទ/ចាស'],
              [
                'ស្លាក HTML ទូទៅ',
                '<div>, <p>, <section>, <article>, <ul>',
                '<span>, <a>, <strong>, <code>',
                '<img>, <button>, <input>',
              ],
            ],
          },
          exampleTitle: 'ការសាកល្បងឥរិយាបថ Block, Inline និង Inline-Block',
          tip: 'ពេល padding ឬ margin លើតំណភ្ជាប់ (<a>) មើលទៅខុសប្រក្រតី ឬត្រួតលើជួរក្បែរ សូមប្ដូរវាទៅជា display: inline-block ឬ display: inline-flex ក្នុង CSS។',
        },
        {
          id: 'semantic-containers-vs-div-span',
          heading: 'ធាតុផ្ទុកមានន័យ (<section>, <article>) ធៀបនឹង <div> & <span>',
          body: [
            '<div> (block ទូទៅ) និង <span> (inline ទូទៅ) មិនមានន័យអត្ថន័យពិសេសឡើយ។ ពួកវាស័ក្ដិសមបំផុតពេលអ្នកគ្រាន់តែត្រូវការធាតុរុំសម្រាប់ប្លង់ Flexbox/Grid ឬសម្រាប់រំលេចពាក្យមួយផ្នែកក្នុងប្រយោគ។',
            'រាល់ពេលផ្នែកមួយមានតួនាទីរចនាសម្ព័ន្ធច្បាស់លាស់ សូមជ្រើសរើសធាតុ block មានន័យជំនួសវិញ។ ប្រើ <section> ដើម្បីចងក្រងមាតិកាប្រធានបទតែមួយដែលមានចំណងជើងផ្ទាល់ខ្លួន និងប្រើ <article> សម្រាប់មាតិកាឯករាជ្យ—ដូចជាអត្ថបទប្លក់ កាតព័ត៌មាន ឬមតិយោបល់—ដែលនៅតែមានន័យពេញលេញបើចែករំលែកដាច់ដោយឡែក។',
          ],
          points: [
            'ប្រើ <article> ពេលមាតិកាអាចឈរឯករាជ្យបាន (អត្ថបទ កាតផលិតផល ឬមតិអ្នកប្រើ)។',
            'ប្រើ <section> ដើម្បីបែងចែកទំព័រ ឬ <article> ជាផ្នែកប្រធានបទដែលមានចំណងជើង។',
            'ប្រើ <div> សម្រាប់តែរុំប្លង់/រចនាប័ទ្ម ពេលគ្មានធាតុមានន័យណាត្រូវគ្នា។',
            'ប្រើ <span> សម្រាប់រចនាប័ទ្មក្នុងជួរ ឬភ្ជាប់ JavaScript ពេល <strong>, <em>, <mark> ឬ <time> មិនសមស្រប។',
          ],
          exampleTitle: 'ប្លង់បញ្ជីអត្ថបទដោយប្រើ <section>, <article>, <div> និង <span>',
        },
        {
          id: 'html-nesting-rules',
          heading: 'គំរូមាតិកា HTML និងក្បួនដាក់ស្លាកត្រួតគ្នាឱ្យត្រឹមត្រូវ',
          body: [
            'HTML ទំនើបប្រើគំរូមាតិកា (content models) ផ្លូវការ—ជាពិសេស Flow Content (ធាតុផ្ទុកភាគច្រើន), Phrasing Content (ធាតុអត្ថបទក្នុងជួរ) និង Interactive Content (តំណ ប៊ូតុង ប្រអប់បញ្ចូល)។ ជាក្បួនសុវត្ថិភាព ធាតុ phrasing ដូចជា <span> ឬ <strong> មិនត្រូវរុំធាតុផ្ទុក block ដូចជា <div>, <section> ឬ <ul> ឡើយ។',
            'HTML5 មានករណីលើកលែងសំខាន់មួយ៖ ស្លាក <a> មានគំរូមាតិកាថ្លា (transparent) ដែលអនុញ្ញាតឱ្យអ្នករុំកាតទាំងមូល (<div>, <h3>, <p>) ក្នុង <a href="..."> តែមួយបាន—ឱ្យតែអ្នកមិនដាក់ធាតុអន្តរកម្មមួយទៀតដូចជា <a> ឬ <button> នៅខាងក្នុងវា។',
          ],
          points: [
            'កុំដាក់ធាតុ block (<div>, <ul>, <table>, <p>) នៅខាងក្នុង <p> ព្រោះកថាខណ្ឌទទួលយកតែ phrasing content ប៉ុណ្ណោះ។',
            'កុំដាក់ធាតុអន្តរកម្មត្រួតក្នុងគ្នា (ហាមដាក់ <button> ក្នុង <a> ឬ <a> ក្នុង <button>)។',
            'ធាតុកូនផ្ទាល់របស់ <ul> និង <ol> គួរតែជា <li> ប៉ុណ្ណោះ។',
            'ការរុំកាតទាំងមូលក្នុង <a href="..."> ត្រឹមត្រូវតាម HTML5 ឱ្យតែគ្មានប៊ូតុង ឬតំណភ្ជាប់នៅខាងក្នុង។',
          ],
          exampleTitle: 'ការប្រៀបធៀបការដាក់ស្លាកត្រួតគ្នាត្រឹមត្រូវ និងមិនត្រឹមត្រូវ',
          warning:
            'បើអ្នកដាក់ <div>, <section> ឬ <ul> នៅខាងក្នុង <p> កម្មវិធីរុករកនឹងបិទ <p> ដោយស្វ័យប្រវត្តិមុនស្លាក block នោះ—បង្កើតស្លាក <p></p> ទទេក្នុង DOM និងធ្វើឱ្យ CSS selector ខូច។',
        },
      ],
      challenge: {
        prompt:
          'កែសម្រួលប្លង់ធម្មតាទៅជា HTML មានន័យស្អាត៖ បង្កើត <section> ដែលមានចំណងជើង <h2> និងផ្ទុក <article> មួយ។ ក្នុង <article> ត្រូវមាន <h3>, កថាខណ្ឌ <p> ដែលមានពាក្យរំលេច <span class="highlight"> មួយ និងតំណ <a href="/guide"> ត្រឹមត្រូវដោយមិនដាក់ <button> ក្នុង <a>។',
        hint: 'ដាក់ <span class="highlight"> ក្នុង <p>, ដាក់ <article> ក្នុង <section> ហើយតុបតែង <a> ផ្ទាល់ជំនួសឱ្យការដាក់ <button> នៅខាងក្នុង។',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វីបានជា width: 240px និង margin-top: 24px មិនមានប្រសិទ្ធភាពលើធាតុ <span> លំនាំដើម?',
          options: [
            'ធាតុ <span> មិនអាចតុបតែងដោយ CSS បានទេ',
            'ធាតុ inline រួមតាមមាតិកា ហើយមិនអនុវត្ត width, height និង margin លើ/ក្រោមឡើយ',
            'មានតែធាតុដែលមាន id ប៉ុណ្ណោះទើបទទួលយក width និង margin',
            'កម្មវិធីរុករកទាមទារឱ្យរុំ <span> ក្នុង <div> មុនទើប CSS ដើរ',
          ],
          answer: 1,
          explanation:
            'តាមលំនាំដើម <span> មាន display: inline។ ធាតុ inline សុទ្ធមិនអនុវត្ត width, height, margin-top និង margin-bottom ទេ លុះត្រាប្ដូរទៅ inline-block ឬ block។',
        },
        {
          question: 'តើកម្មវិធីរុករកធ្វើអ្វីពេលជួបកូដ <p>Intro <div>Box</div></p>?',
          options: [
            'វាបដិសេធមិនបង្ហាញទំព័រទាំងមូល',
            'វាបម្លែង <div> ទៅជា <span> ដោយស្វ័យប្រវត្តិ',
            'វាបិទ <p> ដោយស្វ័យប្រវត្តិភ្លាមៗមុន <div> ដែលធ្វើឱ្យការដាក់ស្លាកខុសពីបំណង',
            'វាលុប <div> ចេញពី DOM ទាំងស្រុង',
          ],
          answer: 2,
          explanation:
            'ដោយសារ <p> អាចផ្ទុកបានតែ phrasing content ពេលជួបស្លាក block ដូចជា <div> កម្មវិធីរុករកនឹងបិទ <p> ភ្លាមៗមុន <div>។',
        },
      ],
    },
  },

  // =========================================================================
  // 3. Iframes, Audio & Video Media
  // =========================================================================
  {
    slug: 'html-iframes-and-embeds',
    level: 'intermediate',
    insertAfter: 'links-and-images',
    en: {
      title: 'Iframes, Audio & Video Media',
      duration: '12 min',
      summary:
        'Embed native HTML5 audio and video with multi-codec fallbacks and captions, control playback with JavaScript, and isolate embedded pages safely with sandboxed iframes.',
      objectives: [
        'Embed accessible <video> and <audio> players using <source> fallbacks, poster frames, and <track> captions.',
        'Control HTML5 media elements programmatically using HTMLMediaElement methods and events.',
        'Embed external or inline documents securely using <iframe> with sandbox, title, and loading="lazy".',
      ],
      sections: [
        {
          id: 'native-video-and-audio',
          heading: 'Native <video>, <audio> & Multi-Format <source>',
          body: [
            'HTML5 plays audio and video natively in every modern browser without third-party plugins. Placing the controls attribute on <video> or <audio> renders built-in play/pause, scrubbing, volume, and fullscreen UI, while poster displays a preview thumbnail before playback begins.',
            'Because browsers vary in codec support and compression efficiency, nest multiple <source> elements inside <video> or <audio>—listing smaller modern formats like WebM first and universal MP4/MP3 fallbacks second. Always add a <track kind="captions"> element pointing to a WebVTT (.vtt) file so deaf, hard-of-hearing, and muted viewers can follow along.',
          ],
          table: {
            headers: ['Element / Attribute', 'Applies To', 'Purpose'],
            rows: [
              [
                'controls',
                '<video>, <audio>',
                'Displays the browser’s native playback controls and keyboard shortcuts.',
              ],
              [
                '<source src type>',
                'Inside media tags',
                'Provides multiple codec formats so the browser picks the first it supports.',
              ],
              [
                '<track kind="captions">',
                'Inside <video>',
                'Attaches timed WebVTT captions or subtitles for accessibility.',
              ],
              [
                'poster="thumb.jpg"',
                '<video>',
                'Shows a crisp preview image before the user starts playback.',
              ],
              [
                'preload="metadata"',
                '<video>, <audio>',
                'Fetches duration/dimensions without downloading the whole media file upfront.',
              ],
              [
                'muted playsinline',
                '<video>',
                'Required alongside autoplay for silent background videos on desktop and mobile.',
              ],
            ],
          },
          example: {
            title: 'Production <video> & <audio> With Fallbacks and Captions',
            language: 'html',
            code: `<video controls preload="metadata" poster="/media/lesson-poster.jpg" width="640">
  <source src="/media/html-intro.webm" type="video/webm" />
  <source src="/media/html-intro.mp4" type="video/mp4" />
  <track
    kind="captions"
    src="/media/html-intro-en.vtt"
    srclang="en"
    label="English"
    default
  />
  Your browser does not support HTML5 video.
  <a href="/media/html-intro.mp4">Download the MP4</a>.
</video>

<audio controls preload="metadata">
  <source src="/media/podcast-ep1.ogg" type="audio/ogg" />
  <source src="/media/podcast-ep1.mp3" type="audio/mpeg" />
  Your browser does not support HTML5 audio.
</audio>`,
          },
          warning:
            'Modern browsers block autoplay with sound to prevent jarring audio spam. If you truly need an autoplaying hero background video, you must include both muted and playsinline attributes.',
        },
        {
          id: 'media-javascript-controls',
          heading: 'Controlling Media Programmatically via HTMLMediaElement',
          body: [
            'Both <audio> and <video> share the JavaScript HTMLMediaElement interface. That gives you clean, predictable control over play(), pause(), currentTime, duration, volume, and playbackRate—plus lifecycle events like loadedmetadata, timeupdate, and ended.',
            'Combining native HTML media markup with lightweight JavaScript lets you build chapter jump buttons, playback speed selectors (1×, 1.25×, 1.5×), and custom progress readouts while still keeping full browser accessibility.',
          ],
          points: [
            'Call audio.play() inside a user click handler and handle its returned Promise gracefully.',
            'Adjust audio.playbackRate (e.g. 1.5) to give learners faster review speeds without re-encoding files.',
            'Listen to the timeupdate event to keep custom progress bars and timestamps synchronized.',
          ],
          example: {
            title: 'Interactive HTML5 <audio> Player & Speed Controller',
            language: 'html',
            code: `<audio id="player" controls preload="metadata"></audio>
<button id="speed-btn" type="button">Speed: 1x</button>`,
            playground: {
              html: `<div class="media-card">
  <h3>Interactive HTML5 &lt;audio&gt; Demo</h3>
  <p class="sub">Generates a real WAV chord right in the browser and binds it to a native <code>&lt;audio&gt;</code> tag.</p>
  <audio id="player" controls></audio>
  <div class="bar">
    <button id="play-btn" type="button">Play / Pause</button>
    <button id="speed-btn" type="button">Speed: 1x</button>
    <button id="restart-btn" type="button">Restart</button>
    <span id="time-readout" class="time">0.0s / 0.0s</span>
  </div>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.media-card { max-width: 520px; padding: 16px; border: 1px solid #e4e4e7; border-radius: 12px; display: grid; gap: 12px; }
h3 { margin: 0; font-size: 16px; }
.sub { margin: 0; font-size: 13px; color: #52525b; }
audio { width: 100%; }
.bar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
button { padding: 7px 12px; border: 1px solid #d4d4d8; border-radius: 8px; background: #fff; font-weight: 600; cursor: pointer; }
button:hover { background: #f4f4f5; }
.time { margin-left: auto; font-size: 13px; font-variant-numeric: tabular-nums; color: #3f3f46; }`,
              js: `// Synthesize a short 2.4-second pleasant C-major arpeggio WAV file in memory
function createMelodyBlobUrl() {
  const sampleRate = 22050;
  const duration = 2.4;
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);
  const writeStr = (off, s) => { for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i)); };
  writeStr(0, 'RIFF'); view.setUint32(4, 36 + numSamples * 2, true); writeStr(8, 'WAVE');
  writeStr(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true); view.setUint32(28, sampleRate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true);
  writeStr(36, 'data'); view.setUint32(40, numSamples * 2, true);
  const notes = [261.63, 329.63, 392.0, 523.25];
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const note = notes[Math.min(notes.length - 1, Math.floor(t / 0.6))];
    const env = Math.sin(Math.PI * ((t % 0.6) / 0.6));
    const sample = Math.sin(2 * Math.PI * note * t) * 0.25 * env;
    view.setInt16(44 + i * 2, Math.max(-1, Math.min(1, sample)) * 32767, true);
  }
  return URL.createObjectURL(new Blob([buffer], { type: 'audio/wav' }));
}

const player = document.getElementById('player');
const playBtn = document.getElementById('play-btn');
const speedBtn = document.getElementById('speed-btn');
const restartBtn = document.getElementById('restart-btn');
const readout = document.getElementById('time-readout');
const speeds = [1, 1.25, 1.5, 2];
let speedIdx = 0;

player.src = createMelodyBlobUrl();

function renderTime() {
  const cur = player.currentTime.toFixed(1);
  const dur = (Number.isFinite(player.duration) ? player.duration : 0).toFixed(1);
  readout.textContent = cur + 's / ' + dur + 's';
}

player.addEventListener('loadedmetadata', renderTime);
player.addEventListener('timeupdate', renderTime);
playBtn.addEventListener('click', () => (player.paused ? player.play() : player.pause()));
restartBtn.addEventListener('click', () => { player.currentTime = 0; player.play(); });
speedBtn.addEventListener('click', () => {
  speedIdx = (speedIdx + 1) % speeds.length;
  player.playbackRate = speeds[speedIdx];
  speedBtn.textContent = 'Speed: ' + speeds[speedIdx] + 'x';
});`,
            },
          },
          tip: 'Set preload="metadata" on media players that do not play immediately—it loads track duration and video dimensions while saving megabytes of mobile data.',
        },
        {
          id: 'iframes-and-sandboxing',
          heading: 'Embedding Pages Safely with <iframe> & sandbox',
          body: [
            'The <iframe> element embeds another complete HTML document inside your page—commonly used for interactive maps, YouTube/Vimeo players, payment widgets, or live code sandboxes. Always provide a descriptive title attribute for screen reader users and loading="lazy" so off-screen embeds do not slow down initial page load.',
            'Because embedded third-party pages can execute scripts, open popups, or hijack top-level navigation, always lock untrusted iframes down with the sandbox attribute. An empty sandbox="" blocks scripts, forms, popups, and same-origin access; you then opt back into only the exact capabilities needed, such as sandbox="allow-scripts". You can also use srcdoc to embed inline HTML previews directly.',
          ],
          points: [
            'Always include a clear title="..." attribute on every <iframe> so assistive tech announces what is embedded.',
            'Add loading="lazy" and referrerpolicy="no-referrer" to improve performance and user privacy.',
            'Use sandbox="allow-scripts" (or empty sandbox="") to isolate untrusted HTML previews cleanly.',
          ],
          example: {
            title: 'Live <iframe> Sandbox Isolation Tester (srcdoc)',
            language: 'html',
            code: `<iframe
  title="Interactive Phnom Penh Map"
  src="https://example.com/embed/map"
  width="600"
  height="360"
  loading="lazy"
  referrerpolicy="no-referrer"
  sandbox="allow-scripts"
></iframe>`,
            playground: {
              html: `<div class="wrap">
  <div class="controls">
    <button id="strict-btn" type="button">Strict: sandbox="" (Scripts Blocked)</button>
    <button id="scripts-btn" type="button">sandbox="allow-scripts"</button>
  </div>
  <p id="mode-label" class="label"></p>
  <iframe id="preview" title="Sandboxed widget preview" class="frame"></iframe>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.wrap { max-width: 540px; display: grid; gap: 10px; }
.controls { display: flex; flex-wrap: wrap; gap: 8px; }
button { padding: 8px 12px; border: 1px solid #d4d4d8; border-radius: 8px; background: #fff; font-weight: 600; cursor: pointer; }
button.active { background: #2563eb; border-color: #2563eb; color: #fff; }
.label { margin: 0; font-size: 13px; color: #52525b; }
.frame { width: 100%; height: 150px; border: 1px solid #cbd5e1; border-radius: 10px; background: #f8fafc; }`,
              js: `const frame = document.getElementById('preview');
const label = document.getElementById('mode-label');
const strictBtn = document.getElementById('strict-btn');
const scriptsBtn = document.getElementById('scripts-btn');

const widgetHtml = \`<!DOCTYPE html>
<html>
<body style="font-family:system-ui,sans-serif;padding:16px;margin:0;color:#0f172a">
  <p style="margin:0 0 10px;font-size:14px">Embedded <strong>srcdoc</strong> iframe document</p>
  <button id="ping" style="padding:6px 12px;border-radius:6px;border:1px solid #94a3b8;cursor:pointer">Run Embedded Script</button>
  <p id="out" style="margin:10px 0 0;font-size:13px;color:#047857">Waiting for click...</p>
  <script>
    document.getElementById('ping').addEventListener('click', function () {
      document.getElementById('out').textContent = 'Script executed safely inside sandbox!';
    });
  </script>
</body>
</html>\`;

function loadMode(allowScripts) {
  frame.setAttribute('sandbox', allowScripts ? 'allow-scripts' : '');
  frame.srcdoc = widgetHtml;
  strictBtn.classList.toggle('active', !allowScripts);
  scriptsBtn.classList.toggle('active', allowScripts);
  label.textContent = allowScripts
    ? 'Current attribute: sandbox="allow-scripts" — clicking the button inside the iframe works.'
    : 'Current attribute: sandbox="" — JavaScript inside the iframe is completely blocked.';
}

strictBtn.addEventListener('click', () => loadMode(false));
scriptsBtn.addEventListener('click', () => loadMode(true));
loadMode(false);`,
            },
          },
          warning:
            'Never combine allow-scripts and allow-same-origin on an untrusted <iframe>. Together, those two permissions allow the embedded script to remove its own sandbox attribute and break out of isolation.',
        },
      ],
      challenge: {
        prompt:
          'Write an HTML snippet with two media elements: (1) a <video> with controls, preload="metadata", poster="cover.jpg", two <source> options (intro.webm and intro.mp4), and a default English <track kind="captions"> pointing to intro.vtt; (2) a lazy-loaded, sandboxed <iframe> with a descriptive title and sandbox="allow-scripts".',
        hint: 'Put both <source> tags and the <track> tag inside <video>...</video>, and set loading="lazy" and title="..." on <iframe>.',
        language: 'html',
        solutionCode: `<video controls preload="metadata" poster="cover.jpg" width="640">
  <source src="intro.webm" type="video/webm" />
  <source src="intro.mp4" type="video/mp4" />
  <track kind="captions" src="intro.vtt" srclang="en" label="English" default />
  Your browser does not support HTML5 video.
</video>

<iframe
  title="Interactive Code Demo"
  src="https://example.com/embed/demo"
  width="640"
  height="360"
  loading="lazy"
  sandbox="allow-scripts"
></iframe>`,
      },
      quiz: [
        {
          question:
            'Why does <video autoplay src="hero.mp4"></video> fail to start automatically in most modern browsers?',
          options: [
            'The autoplay attribute was removed in HTML5',
            'Browsers block unmuted autoplay; you must also include the muted attribute',
            'Autoplay only works with <audio> elements, not <video>',
            'You must specify preload="auto" before autoplay is allowed',
          ],
          answer: 1,
          explanation:
            'Browsers block unexpected sound on page load. Adding muted (and playsinline for mobile) allows silent background videos to autoplay reliably.',
        },
        {
          question:
            'Why is combining sandbox="allow-scripts allow-same-origin" dangerous for untrusted embedded content?',
          options: [
            'It disables the browser’s HTML parser inside the iframe',
            'It prevents the iframe from loading CSS stylesheets',
            'The embedded script can access its own iframe element and remove the sandbox attribute',
            'It forces the iframe to ignore loading="lazy"',
          ],
          answer: 2,
          explanation:
            'When an iframe shares the host origin and can run scripts, it can reach the parent DOM and strip its own sandbox restrictions.',
        },
      ],
    },
    km: {
      title: 'Iframes សំឡេង និងវីដេអូក្នុង HTML',
      duration: '12 នាទី',
      summary:
        'បង្កប់សំឡេង និងវីដេអូ HTML5 ផ្ទាល់ដោយមាន <source> បម្រុង និងអក្សររត់ គ្រប់គ្រងការចាក់ដោយ JavaScript និងការពារ <iframe> ដោយសុវត្ថិភាពជាមួយ sandbox។',
      objectives: [
        'បង្កប់កម្មវិធីចាក់ <video> និង <audio> ងាយស្រួលប្រើប្រាស់ ដោយប្រើ <source>, រូបគម្រប poster និងអក្សររត់ <track>។',
        'គ្រប់គ្រងធាតុមេឌៀតាម JavaScript ដោយប្រើវិធីសាស្ត្រ និងព្រឹត្តិការណ៍របស់ HTMLMediaElement។',
        'បង្កប់ទំព័រខាងក្រៅ ឬកូដផ្ទាល់ដោយសុវត្ថិភាពតាម <iframe> ជាមួយ sandbox, title និង loading="lazy"។',
      ],
      sections: [
        {
          id: 'native-video-and-audio',
          heading: 'ធាតុ <video>, <audio> និង <source> ច្រើនទម្រង់',
          body: [
            'HTML5 អាចចាក់សំឡេង និងវីដេអូដោយផ្ទាល់ក្នុងកម្មវិធីរុករកទំនើបទាំងអស់ ដោយមិនចាំបាច់មានកម្មវិធីបន្ថែមទេ។ ការដាក់គុណលក្ខណៈ controls លើ <video> ឬ <audio> នឹងបង្ហាញប៊ូតុងចាក់/ផ្អាក កម្រិតសំឡេង និងពេញអេក្រង់ស្រាប់ ចំណែក poster បង្ហាញរូបភាពគម្របមុនពេលចាក់វីដេអូ។',
            'ដោយសារកម្មវិធីរុករកគាំទ្រ codec ខុសៗគ្នា អ្នកគួរដាក់ <source> ច្រើននៅក្នុង <video> ឬ <audio>—ដាក់ទម្រង់ទំនើបទំហំតូចដូច WebM មុនគេ ហើយដាក់ MP4/MP3 ជាជម្រើសបម្រុង។ គួរតែបន្ថែម <track kind="captions"> ភ្ជាប់ឯកសារ WebVTT (.vtt) ដើម្បីឱ្យអ្នកមើលបិទសំឡេង ឬអ្នកមានបញ្ហាការស្ដាប់អាចតាមដានបាន។',
          ],
          table: {
            headers: ['ធាតុ / គុណលក្ខណៈ', 'ប្រើជាមួយ', 'តួនាទី'],
            rows: [
              ['controls', '<video>, <audio>', 'បង្ហាញប៊ូតុងគ្រប់គ្រងការចាក់ដើមរបស់កម្មវិធីរុករក។'],
              [
                '<source src type>',
                'ខាងក្នុងស្លាកមេឌៀ',
                'ផ្ដល់ទម្រង់ codec ច្រើនដើម្បីឱ្យកម្មវិធីរុករករើសទម្រង់ដំបូងដែលវាគាំទ្រ។',
              ],
              [
                '<track kind="captions">',
                'ខាងក្នុង <video>',
                'ភ្ជាប់អក្សររត់ WebVTT ឬចំណងជើងរងសម្រាប់ភាពងាយស្រួលប្រើប្រាស់។',
              ],
              ['poster="thumb.jpg"', '<video>', 'បង្ហាញរូបភាពគម្របស្អាតមុនពេលអ្នកប្រើចុចចាក់។'],
              [
                'preload="metadata"',
                '<video>, <audio>',
                'ទាញយកតែរយៈពេល និងទំហំ ដោយមិនទាញយកឯកសារទាំងមូលជាមុនឡើយ។',
              ],
              [
                'muted playsinline',
                '<video>',
                'ចាំបាច់ត្រូវប្រើគូជាមួយ autoplay សម្រាប់វីដេអូផ្ទៃខាងក្រោយគ្មានសំឡេង។',
              ],
            ],
          },
          exampleTitle: 'ឧទាហរណ៍ <video> និង <audio> ស្តង់ដារដោយមាន Source បម្រុង និងអក្សររត់',
          warning:
            'កម្មវិធីរុករកទំនើបរារាំងការចាក់ autoplay ដែលមានសំឡេង ដើម្បីការពារការរំខានដល់អ្នកប្រើ។ បើអ្នកត្រូវការវីដេអូផ្ទៃខាងក្រោយលេងស្វ័យប្រវត្តិ ត្រូវតែដាក់ muted និង playsinline ជាមួយ autoplay។',
        },
        {
          id: 'media-javascript-controls',
          heading: 'ការគ្រប់គ្រងមេឌៀតាម JavaScript (HTMLMediaElement)',
          body: [
            'ទាំង <audio> និង <video> ប្រើចំណុចប្រទាក់ HTMLMediaElement ដូចគ្នាក្នុង JavaScript។ វាផ្ដល់ការគ្រប់គ្រងពេញលេញលើ play(), pause(), currentTime, duration, volume និង playbackRate ព្រមទាំងព្រឹត្តិការណ៍ដូចជា loadedmetadata, timeupdate និង ended។',
            'ការផ្សំស្លាកមេឌៀ HTML ដើមជាមួយ JavaScript ខ្លីៗ អនុញ្ញាតឱ្យអ្នកបង្កើតប៊ូតុងលោតវគ្គ ការប្ដូរល្បឿនចាក់ (1×, 1.25×, 1.5×) និងការបង្ហាញនាទីចាក់ផ្ទាល់ខ្លួន ខណៈរក្សាភាពងាយស្រួលប្រើប្រាស់ពេញលេញ។',
          ],
          points: [
            'ហៅ audio.play() នៅក្នុងព្រឹត្តិការណ៍ចុចរបស់អ្នកប្រើ ដើម្បីឱ្យស្របតាមគោលការណ៍កម្មវិធីរុករក។',
            'កែតម្រូវ audio.playbackRate (ឧទាហរណ៍ 1.5) ដើម្បីឱ្យអ្នកសិក្សាស្តាប់រំលឹកបានលឿនជាងមុន។',
            'ស្តាប់ព្រឹត្តិការណ៍ timeupdate ដើម្បីធ្វើបច្ចុប្បន្នភាពរបារដំណើរការ និងនាទីចាក់ឱ្យទាន់ពេល។',
          ],
          exampleTitle: 'កម្មវិធីចាក់ <audio> HTML5 អន្តរកម្ម និងការប្ដូរល្បឿន',
          tip: 'ប្រើ preload="metadata" លើកម្មវិធីចាក់មេឌៀដែលមិនចាក់ភ្លាមៗ—វាទាញយករយៈពេល និងទំហំវីដេអូ ដោយជួយសន្សំទិន្នន័យអ៊ីនធឺណិតទូរស័ព្ទ។',
        },
        {
          id: 'iframes-and-sandboxing',
          heading: 'ការបង្កប់ទំព័រដោយសុវត្ថិភាពជាមួយ <iframe> និង sandbox',
          body: [
            'ធាតុ <iframe> បង្កប់ឯកសារ HTML ពេញលេញមួយទៀតនៅក្នុងទំព័ររបស់អ្នក—និយមប្រើសម្រាប់ផែនទី វីដេអូ YouTube ទម្រង់ទូទាត់ ឬប្រអប់សាកល្បងកូដ។ តែងតែដាក់ title ច្បាស់លាស់សម្រាប់កម្មវិធីអានអេក្រង់ និង loading="lazy" ដើម្បីកុំឱ្យការបង្កប់ខាងក្រោមពន្យឺតការបើកទំព័រ។',
            'ដោយសារទំព័រភាគីទីបីអាចដំណើរការស្គ្រីប ឬបើកផ្ទាំងថ្មី ត្រូវតែចាក់សោ <iframe> ដែលមិនទុកចិត្តដោយគុណលក្ខណៈ sandbox។ ការដាក់ sandbox="" ទទេនឹងបិទស្គ្រីប ទម្រង់ និង popups ទាំងអស់ រួចអ្នកអាចបើកតែសិទ្ធិចាំបាច់ដូចជា sandbox="allow-scripts"។ អ្នកក៏អាចប្រើ srcdoc សម្រាប់បង្កប់ HTML ផ្ទាល់ផងដែរ។',
          ],
          points: [
            'តែងតែដាក់ title="..." ច្បាស់លាស់លើគ្រប់ <iframe> ដើម្បីឱ្យកម្មវិធីអានអេក្រង់ប្រាប់អ្នកប្រើបានត្រឹមត្រូវ។',
            'បន្ថែម loading="lazy" និង referrerpolicy="no-referrer" ដើម្បីបង្កើនល្បឿន និងភាពឯកជន។',
            'ប្រើ sandbox="allow-scripts" ឬ sandbox="" ដើម្បីញែកមាតិកាបង្កប់ឱ្យមានសុវត្ថិភាព។',
          ],
          exampleTitle: 'ការសាកល្បងញែកសុវត្ថិភាព <iframe> Sandbox ផ្ទាល់ (srcdoc)',
          warning:
            'កុំផ្សំ allow-scripts និង allow-same-origin ជាមួយគ្នាលើ <iframe> ដែលមិនទុកចិត្ត។ ការផ្សំសិទ្ធិទាំងពីរនេះអាចឱ្យស្គ្រីបខាងក្នុងលុបគុណលក្ខណៈ sandbox របស់ខ្លួនឯងចោលបាន។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរកូដ HTML ដែលមានធាតុមេឌៀពីរ៖ (1) <video> ដែលមាន controls, preload="metadata", poster="cover.jpg", <source> ពីរ (intro.webm និង intro.mp4) និង <track kind="captions"> ភាសាអង់គ្លេសលំនាំដើមភ្ជាប់ទៅ intro.vtt; (2) <iframe> ដែលមាន loading="lazy", title ច្បាស់លាស់ និង sandbox="allow-scripts"។',
        hint: 'ដាក់ <source> ទាំងពីរ និង <track> នៅខាងក្នុង <video>...</video> ហើយកំណត់ loading="lazy" និង title="..." លើ <iframe>។',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វីបានជា <video autoplay src="hero.mp4"></video> មិនលេងដោយស្វ័យប្រវត្តិក្នុងកម្មវិធីរុករកទំនើបភាគច្រើន?',
          options: [
            'គុណលក្ខណៈ autoplay ត្រូវបានលុបចោលក្នុង HTML5',
            'កម្មវិធីរុករករារាំង autoplay ដែលមានសំឡេង; អ្នកត្រូវតែបន្ថែមគុណលក្ខណៈ muted',
            'autoplay ដំណើរការតែជាមួយ <audio> ប៉ុណ្ណោះ មិនមែន <video> ទេ',
            'អ្នកត្រូវកំណត់ preload="auto" មុនទើប autoplay ដំណើរការ',
          ],
          answer: 1,
          explanation:
            'កម្មវិធីរុករករារាំងសំឡេងលេងស្វ័យប្រវត្តិពេលបើកទំព័រ។ ការបន្ថែម muted (និង playsinline លើទូរស័ព្ទ) អនុញ្ញាតឱ្យវីដេអូគ្មានសំឡេងលេងដោយស្វ័យប្រវត្តិបាន។',
        },
        {
          question:
            'ហេតុអ្វីបានជាការផ្សំ sandbox="allow-scripts allow-same-origin" គ្រោះថ្នាក់សម្រាប់មាតិកាមិនទុកចិត្ត?',
          options: [
            'វាបិទ HTML parser ក្នុង iframe',
            'វារារាំង iframe មិនឱ្យផ្ទុក CSS stylesheets',
            'ស្គ្រីបខាងក្នុងអាចចូលទៅដល់ធាតុ iframe របស់វា ហើយដកគុណលក្ខណៈ sandbox ចេញ',
            'វាបង្ខំឱ្យ iframe មិនអនុវត្ត loading="lazy"',
          ],
          answer: 2,
          explanation:
            'ពេល iframe មាន origin ដូចទំព័រមេ និងអាចដំណើរការស្គ្រីបបាន វាអាចចូលទៅកែ DOM មេ ហើយដោះសោ sandbox របស់វាចេញ។',
        },
      ],
    },
  },

  // =========================================================================
  // 4. SVG Vector Graphics & HTML Canvas
  // =========================================================================
  {
    slug: 'html-canvas-and-svg',
    level: 'intermediate',
    insertAfter: 'lists-and-tables',
    en: {
      title: 'SVG Vector Graphics & HTML Canvas',
      duration: '13 min',
      summary:
        'Create crisp resolution-independent vector art with inline <svg>, draw dynamic 2D pixel graphics with the <canvas> API, and know exactly when to choose each.',
      objectives: [
        'Build scalable inline <svg> graphics using viewBox, basic vector shapes (<rect>, <circle>, <path>), and CSS styling.',
        'Draw interactive 2D graphics on an HTML <canvas> using getContext("2d"), paths, fills, and pointer events.',
        'Compare SVG and Canvas trade-offs across scalability, DOM interactivity, accessibility, and high-object-count performance.',
      ],
      sections: [
        {
          id: 'inline-svg-fundamentals',
          heading: 'Inline <svg> & Scalable Vector Shapes',
          body: [
            'SVG (Scalable Vector Graphics) defines artwork with mathematical primitives—rectangles (<rect>), circles (<circle>), lines (<line>), polygons (<polygon>), and Bézier curves (<path>). Because shapes are recalculated mathematically at display time, an inline <svg> stays razor-sharp at 16px, 400px, or on a 4K Retina screen with tiny file sizes.',
            'Even better, inline <svg> nodes live directly inside the HTML DOM. You can change their fill and stroke colors with CSS variables, animate individual shapes on hover, attach JavaScript click listeners to a single chart bar, and provide accessible descriptions using role="img" and a nested <title> element.',
          ],
          points: [
            'Always set viewBox="0 0 width height" to define the internal coordinate grid so your SVG scales cleanly.',
            'Use currentColor for stroke or fill on UI icons so they automatically inherit their parent button’s text color.',
            'For standalone meaningful graphics, add role="img" and <title>...</title>; for decorative icons, add aria-hidden="true".',
          ],
          example: {
            title: 'Interactive Inline <svg> Mini Bar Chart',
            language: 'html',
            code: `<svg viewBox="0 0 260 120" width="260" height="120" role="img" aria-labelledby="chart-title">
  <title id="chart-title">Weekly HTML Practice Hours</title>
  <rect x="20" y="55" width="44" height="55" rx="6" fill="#93c5fd" />
  <rect x="82" y="30" width="44" height="80" rx="6" fill="#3b82f6" />
  <rect x="144" y="18" width="44" height="92" rx="6" fill="#2563eb" />
  <circle cx="224" cy="36" r="16" fill="#f59e0b" />
</svg>`,
            playground: {
              html: `<div class="svg-demo">
  <p class="hint">Hover or click any SVG bar—each shape is a live DOM node:</p>
  <svg id="chart" viewBox="0 0 320 150" role="img" aria-labelledby="svg-title">
    <title id="svg-title">Lesson Completion by Topic</title>
    <line x1="16" y1="126" x2="304" y2="126" stroke="#cbd5e1" stroke-width="2" />
    <rect class="bar" data-topic="HTML Attributes (92%)" x="30" y="34" width="52" height="92" rx="8" />
    <rect class="bar" data-topic="Block & Inline (78%)" x="102" y="48" width="52" height="78" rx="8" />
    <rect class="bar" data-topic="Media & Iframes (64%)" x="174" y="62" width="52" height="64" rx="8" />
    <rect class="bar" data-topic="SVG & Canvas (86%)" x="246" y="40" width="52" height="86" rx="8" />
    <text x="56" y="143" text-anchor="middle" font-size="11" fill="#52525b">Attrs</text>
    <text x="128" y="143" text-anchor="middle" font-size="11" fill="#52525b">Flow</text>
    <text x="200" y="143" text-anchor="middle" font-size="11" fill="#52525b">Media</text>
    <text x="272" y="143" text-anchor="middle" font-size="11" fill="#52525b">SVG</text>
  </svg>
  <output id="status" class="status">Click a bar to inspect its value.</output>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.svg-demo { max-width: 360px; display: grid; gap: 10px; }
.hint { margin: 0; font-size: 13px; color: #52525b; }
svg { width: 100%; height: auto; border: 1px solid #e4e4e7; border-radius: 12px; background: #f8fafc; }
.bar { fill: #3b82f6; cursor: pointer; transition: fill 160ms ease-out, opacity 160ms ease-out; }
.bar:hover { fill: #1d4ed8; }
.bar.selected { fill: #059669; }
.status { padding: 8px 10px; border-radius: 8px; background: #f4f4f5; font-size: 13px; font-weight: 600; }`,
              js: `const bars = document.querySelectorAll('.bar');
const status = document.getElementById('status');

bars.forEach((bar) => {
  bar.addEventListener('click', () => {
    bars.forEach((b) => b.classList.remove('selected'));
    bar.classList.add('selected');
    status.textContent = 'Selected: ' + bar.dataset.topic;
  });
});`,
            },
          },
          tip: 'Keep a viewBox on every inline <svg> even when you set width and height in CSS—without viewBox, resizing the SVG clips the artwork instead of scaling it.',
        },
        {
          id: 'html-canvas-2d-api',
          heading: 'Drawing Pixels with <canvas> & the 2D Context API',
          body: [
            'The <canvas> element reserves a rectangular bitmap surface that you paint imperatively with JavaScript. Calling canvas.getContext("2d") returns a drawing context equipped with methods for rectangles (fillRect), paths (beginPath, moveTo, lineTo, arc), gradients, text (fillText), and raw pixel buffers.',
            'Unlike SVG, shapes painted onto a <canvas> immediately become pixels and do not create DOM nodes. That "fire-and-forget" bitmap model lets <canvas> render thousands of moving particles, real-time video filters, signature pads, or 60fps 2D games without slowing down the browser’s DOM engine.',
          ],
          points: [
            'Always provide fallback text inside <canvas>...</canvas> for environments where scripting is unavailable.',
            'Call ctx.beginPath() before starting a new shape so previous paths do not accidentally re-stroke.',
            'Clear the drawing area between animation frames with ctx.clearRect(0, 0, canvas.width, canvas.height).',
          ],
          example: {
            title: 'Interactive <canvas> 2D Sketch & Shape Painter',
            language: 'html',
            code: `<canvas id="board" width="420" height="200">
  Your browser does not support the HTML5 Canvas element.
</canvas>

<script>
  const ctx = document.getElementById('board').getContext('2d');
  ctx.fillStyle = '#2563eb';
  ctx.beginPath();
  ctx.arc(100, 100, 40, 0, Math.PI * 2);
  ctx.fill();
</script>`,
            playground: {
              html: `<div class="canvas-app">
  <div class="toolbar">
    <button type="button" data-color="#2563eb" class="swatch active">Blue</button>
    <button type="button" data-color="#10b981" class="swatch">Green</button>
    <button type="button" data-color="#f97316" class="swatch">Orange</button>
    <button type="button" id="clear-btn">Clear Canvas</button>
  </div>
  <canvas id="pad" width="460" height="190">Interactive drawing canvas</canvas>
  <p class="hint">Click or drag on the canvas to paint vector-free 2D bitmap strokes.</p>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.canvas-app { max-width: 480px; display: grid; gap: 10px; }
.toolbar { display: flex; flex-wrap: wrap; gap: 8px; }
button { padding: 6px 12px; border: 1px solid #d4d4d8; border-radius: 8px; background: #fff; font-weight: 600; cursor: pointer; }
.swatch.active { background: #18181b; border-color: #18181b; color: #fff; }
canvas { width: 460px; max-width: 100%; height: auto; border: 1px solid #cbd5e1; border-radius: 12px; background: #ffffff; cursor: crosshair; touch-action: none; }
.hint { margin: 0; font-size: 13px; color: #52525b; }`,
              js: `const canvas = document.getElementById('pad');
const ctx = canvas.getContext('2d');
let color = '#2563eb';
let drawing = false;

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#f1f5f9';
  ctx.lineWidth = 1;
  for (let x = 20; x < canvas.width; x += 20) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 20; y < canvas.height; y += 20) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }
}

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((e.clientX - rect.left) / rect.width) * canvas.width,
    y: ((e.clientY - rect.top) / rect.height) * canvas.height,
  };
}

function paintDot(e) {
  const { x, y } = getPos(e);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 7, 0, Math.PI * 2);
  ctx.fill();
}

canvas.addEventListener('pointerdown', (e) => { drawing = true; paintDot(e); });
canvas.addEventListener('pointermove', (e) => { if (drawing) paintDot(e); });
window.addEventListener('pointerup', () => { drawing = false; });

document.querySelectorAll('.swatch').forEach((btn) => {
  btn.addEventListener('click', () => {
    color = btn.dataset.color;
    document.querySelectorAll('.swatch').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

document.getElementById('clear-btn').addEventListener('click', drawGrid);
drawGrid();`,
            },
          },
          warning:
            'Do not resize a <canvas> solely with CSS width and height while leaving its HTML width and height attributes at the default 300×150. Stretching a small internal bitmap with CSS makes lines and text visibly blurry.',
        },
        {
          id: 'choosing-svg-vs-canvas',
          heading: 'Choosing Between SVG and Canvas',
          body: [
            'SVG and Canvas are complementary tools, not competitors. When your graphic consists of clean geometric UI icons, logos, interactive maps, or small-to-medium data charts that need crisp scaling, CSS theming, and screen-reader accessibility, inline <svg> is almost always the better choice.',
            'Reach for <canvas> when you need direct pixel manipulation (photo filters, signature capture), high-frame-rate 2D games, physics simulations, or scatter plots displaying tens of thousands of points where creating a DOM node per shape would overwhelm browser layout.',
          ],
          table: {
            headers: ['Dimension', 'Inline <svg>', 'HTML <canvas>'],
            rows: [
              ['Rendering model', 'Vector (retained DOM nodes)', 'Bitmap pixels (immediate mode)'],
              [
                'Zoom / Retina clarity',
                'Infinitely sharp automatically',
                'Requires explicit pixel dimensions / DPR scaling',
              ],
              [
                'CSS & DOM events',
                'Full CSS styling + per-shape listeners',
                'No individual shape DOM nodes; manual hit testing',
              ],
              [
                'Accessibility',
                'Supports <title>, <desc>, ARIA, selectable text',
                'Requires fallback content or separate ARIA overlays',
              ],
              ['10,000+ moving objects', 'Slow (heavy DOM tree)', 'Fast (single bitmap surface)'],
              [
                'Best fit',
                'Icons, logos, diagrams, UI charts',
                'Games, drawing apps, image filters, huge datasets',
              ],
            ],
          },
          example: {
            title: 'Accessible Inline SVG Icon Inside a Button',
            language: 'html',
            code: `<button type="button" class="icon-btn">
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 5v14M5 12h14" stroke-linecap="round" />
  </svg>
  <span>Create Project</span>
</button>`,
          },
        },
      ],
      challenge: {
        prompt:
          'Write an HTML snippet containing: (1) an accessible inline <svg viewBox="0 0 200 120" width="200" height="120" role="img"> with a <title>, a rounded background <rect>, and a centered <circle>; and (2) a <canvas id="sparkline" width="320" height="120"> with helpful fallback text inside it.',
        hint: 'Give <rect> attributes x="0" y="0" width="200" height="120" rx="16" and place <circle cx="100" cy="60" r="32" /> right in the center.',
        language: 'html',
        solutionCode: `<svg viewBox="0 0 200 120" width="200" height="120" role="img" aria-labelledby="badge-title">
  <title id="badge-title">Blue Circle Emblem</title>
  <rect x="0" y="0" width="200" height="120" rx="16" fill="#eff6ff" />
  <circle cx="100" cy="60" r="32" fill="#2563eb" />
</svg>

<canvas id="sparkline" width="320" height="120">
  Your browser does not support the HTML5 Canvas element.
</canvas>`,
      },
      quiz: [
        {
          question:
            'You are building a real-time 2D particle simulation with 8,000 animated dots updating at 60 frames per second. Which technology is the better fit?',
          options: [
            'Inline <svg> with 8,000 <circle> elements',
            'HTML <canvas> because it draws pixels directly without creating 8,000 DOM nodes',
            'A <table> with 8,000 cells',
            'An <iframe> pointing to 8,000 images',
          ],
          answer: 1,
          explanation:
            'SVG creates a live DOM node for every shape, which slows down dramatically with thousands of animated objects. Canvas paints directly to a single bitmap buffer at high frame rates.',
        },
        {
          question:
            'Why can graphics drawn on a <canvas> appear stretched and blurry even on a sharp monitor?',
          options: [
            'Canvas only supports black-and-white pixels',
            'The canvas was resized with CSS width/height without updating its HTML width and height attributes',
            'You forgot to add viewBox to the <canvas> tag',
            'Canvas cannot draw curved paths like arcs',
          ],
          answer: 1,
          explanation:
            'A <canvas> defaults to a 300×150 internal pixel buffer. Enlarging it only via CSS scales up those 300×150 pixels instead of increasing the drawing resolution.',
        },
      ],
    },
    km: {
      title: 'ក្រាហ្វិកវ៉ិចទ័រ SVG និង HTML Canvas',
      duration: '13 នាទី',
      summary:
        'បង្កើតក្រាហ្វិកវ៉ិចទ័រច្បាស់គ្មានព្រាលដោយ inline <svg>, គូរក្រាហ្វិក 2D តាម <canvas> API និងដឹងច្បាស់ថាពេលណាត្រូវជ្រើសរើសមួយណា។',
      objectives: [
        'បង្កើតក្រាហ្វិក inline <svg> ដែលពង្រីកបង្រួមបានច្បាស់ដោយប្រើ viewBox, រូបរាងវ៉ិចទ័រ (<rect>, <circle>, <path>) និង CSS។',
        'គូរក្រាហ្វិក 2D អន្តរកម្មលើ <canvas> ដោយប្រើ getContext("2d"), paths, fills និងព្រឹត្តិការណ៍ pointer។',
        'ប្រៀបធៀបភាពខុសគ្នារវាង SVG និង Canvas លើភាពច្បាស់ អន្តរកម្ម DOM ភាពងាយស្រួលប្រើប្រាស់ និងល្បឿនដំណើរការ។',
      ],
      sections: [
        {
          id: 'inline-svg-fundamentals',
          heading: 'Inline <svg> និងរូបរាងវ៉ិចទ័រពង្រីកបង្រួមបាន',
          body: [
            'SVG (Scalable Vector Graphics) បង្កើតរូបភាពតាមរូបមន្តគណិតវិទ្យា—ចតុកោណ (<rect>), រង្វង់ (<circle>), បន្ទាត់ (<line>), ពហុកោណ (<polygon>) និងខ្សែកោង (<path>)។ ដោយសារវាគណនារូបរាងឡើងវិញតាមទំហំបង្ហាញ inline <svg> តែងតែច្បាស់មុតមិនថានៅទំហំ 16px, 400px ឬអេក្រង់ 4K Retina ឡើយ។',
            'ពិសេសជាងនេះ ធាតុ inline <svg> ស្ថិតនៅក្នុង HTML DOM ដោយផ្ទាល់។ អ្នកអាចប្ដូរពណ៌ fill និង stroke ដោយ CSS, បន្ថែមចលនាពេល hover, ភ្ជាប់ព្រឹត្តិការណ៍ចុចលើសសរក្រាហ្វិកនីមួយៗ និងបន្ថែមការពិពណ៌នាសម្រាប់កម្មវិធីអានអេក្រង់តាម role="img" និង <title>។',
          ],
          points: [
            'តែងតែដាក់ viewBox="0 0 width height" ដើម្បីកំណត់ប្រព័ន្ធកូអរដោនេខាងក្នុងឱ្យ SVG ពង្រីកបង្រួមបានសមាមាត្រ។',
            'ប្រើ currentColor សម្រាប់ stroke ឬ fill លើរូបតំណាង UI ដើម្បីឱ្យវាទទួលពណ៌អក្សរពីប៊ូតុងមេដោយស្វ័យប្រវត្តិ។',
            'សម្រាប់ក្រាហ្វិកមានអត្ថន័យ បន្ថែម role="img" និង <title>...</title>; សម្រាប់រូបតំណាងតុបតែង បន្ថែម aria-hidden="true"។',
          ],
          exampleTitle: 'ក្រាហ្វិកសសរ inline <svg> អន្តរកម្ម',
          tip: 'រក្សា viewBox លើគ្រប់ inline <svg> ទោះបីអ្នកកំណត់ width និង height ក្នុង CSS ក៏ដោយ—បើគ្មាន viewBox ការប្ដូរទំហំនឹងកាត់រូបចោលជំនួសឱ្យការបង្រួមពង្រីក។',
        },
        {
          id: 'html-canvas-2d-api',
          heading: 'ការគូរភីកសែលជាមួយ <canvas> និង 2D Context API',
          body: [
            'ធាតុ <canvas> បម្រុងផ្ទៃរូបភាពភីកសែល (bitmap) រាងចតុកោណដែលអ្នកគូរតាម JavaScript។ ការហៅ canvas.getContext("2d") ផ្ដល់ឧបករណ៍គូរពេញលេញសម្រាប់ចតុកោណ (fillRect), ខ្សែផ្លូវ (beginPath, moveTo, lineTo, arc), ជម្រាលពណ៌, អក្សរ (fillText) និងទិន្នន័យភីកសែលផ្ទាល់។',
            'ខុសពី SVG រូបរាងដែលគូរលើ <canvas> ក្លាយជាភីកសែលភ្លាមៗដោយមិនបង្កើតធាតុ DOM ទេ។ លក្ខណៈនេះធ្វើឱ្យ <canvas> មានល្បឿនលឿនខ្លាំងសម្រាប់ហ្គេម 2D 60fps កម្មវិធីគូរហត្ថលេខា ឬចលនាភាគល្អិតរាប់ពាន់។',
          ],
          points: [
            'តែងតែដាក់អត្ថបទបម្រុងនៅក្នុង <canvas>...</canvas> សម្រាប់បរិស្ថានដែលមិនគាំទ្រស្គ្រីប។',
            'ហៅ ctx.beginPath() មុនគូររូបរាងថ្មីជានិច្ច ដើម្បីកុំឱ្យខ្សែផ្លូវចាស់គូរជាន់គ្នា។',
            'សម្អាតផ្ទៃគូរនៅចន្លោះស៊ុមចលនាដោយប្រើ ctx.clearRect(0, 0, canvas.width, canvas.height)។',
          ],
          exampleTitle: 'ផ្ទាំងគូរ <canvas> 2D អន្តរកម្ម',
          warning:
            'កុំប្ដូរទំហំ <canvas> ដោយប្រើតែ CSS width/height ខណៈទុកគុណលក្ខណៈ HTML width និង height នៅលំនាំដើម 300×150 ព្រោះការពង្រីកភីកសែលតូចដោយ CSS នឹងធ្វើឱ្យរូប និងអក្សរព្រាល។',
        },
        {
          id: 'choosing-svg-vs-canvas',
          heading: 'ការជ្រើសរើសរវាង SVG និង Canvas',
          body: [
            'SVG និង Canvas បំពេញគ្នាទៅវិញទៅមក។ ពេលអ្នកត្រូវការរូបតំណាង UI ឡូហ្គោ ផែនទីអន្តរកម្ម ឬក្រាហ្វិកទិន្នន័យតូចទៅមធ្យមដែលត្រូវការភាពច្បាស់គ្រប់ទំហំ ការតុបតែងដោយ CSS និងភាពងាយស្រួលប្រើប្រាស់ សូមជ្រើសរើស inline <svg>។',
            'ប្រើ <canvas> ពេលអ្នកត្រូវការកែសម្រួលភីកសែលផ្ទាល់ (តម្រងរូបភាព ផ្ទាំងគូរ) ហ្គេម 2D ល្បឿនលឿន ការក្លែងធ្វើរូបវិទ្យា ឬក្រាហ្វិកដែលមានចំណុចទិន្នន័យរាប់ម៉ឺន ដែលការបង្កើតធាតុ DOM ច្រើនពេកនឹងធ្វើឱ្យកម្មវិធីរុករកយឺត។',
          ],
          table: {
            headers: ['ចំណុចប្រៀបធៀប', 'Inline <svg>', 'HTML <canvas>'],
            rows: [
              ['គំរូបង្ហាញ', 'វ៉ិចទ័រ (មានធាតុ DOM)', 'ភីកសែល Bitmap (គូរភ្លាមៗ)'],
              [
                'ភាពច្បាស់ពេលពង្រីក / Retina',
                'ច្បាស់គ្មានកំណត់ដោយស្វ័យប្រវត្តិ',
                'ត្រូវកំណត់ទំហំភីកសែល / DPR ច្បាស់',
              ],
              [
                'CSS និងព្រឹត្តិការណ៍ DOM',
                'គាំទ្រ CSS និង listener លើរូបនីមួយៗ',
                'គ្មាន DOM សម្រាប់រូបនីមួយៗ',
              ],
              [
                'ភាពងាយស្រួលប្រើប្រាស់',
                'គាំទ្រ <title>, <desc>, ARIA, អក្សរចម្លងបាន',
                'ត្រូវការអត្ថបទបម្រុង ឬ ARIA បន្ថែម',
              ],
              ['វត្ថុមានចលនា 10,000+', 'យឺត (DOM ធ្ងន់ពេក)', 'លឿន (ផ្ទៃភីកសែលតែមួយ)'],
              [
                'ស័ក្ដិសមបំផុតសម្រាប់',
                'រូបតំណាង ឡូហ្គោ ដ្យាក្រាម ក្រាហ្វិក UI',
                'ហ្គេម កម្មវិធីគូរ តម្រងរូបភាព ទិន្នន័យធំ',
              ],
            ],
          },
          exampleTitle: 'រូបតំណាង SVG ងាយស្រួលប្រើប្រាស់នៅក្នុងប៊ូតុង',
        },
      ],
      challenge: {
        prompt:
          'សរសេរកូដ HTML ដែលមាន៖ (1) inline <svg viewBox="0 0 200 120" width="200" height="120" role="img"> ដែលមាន <title>, ចតុកោណកែងជ្រុងមូល <rect> ជាផ្ទៃខាងក្រោយ និងរង្វង់ <circle> នៅចំកណ្ដាល; និង (2) <canvas id="sparkline" width="320" height="120"> ដែលមានអត្ថបទបម្រុងនៅខាងក្នុង។',
        hint: 'ដាក់ x="0" y="0" width="200" height="120" rx="16" លើ <rect> ហើយដាក់ <circle cx="100" cy="60" r="32" /> នៅចំកណ្ដាល។',
      },
      quiz: [
        {
          question:
            'អ្នកកំពុងបង្កើតចលនាភាគល្អិត 2D មាន 8,000 ចំណុចផ្លាស់ទីនៅ 60fps។ តើបច្ចេកវិទ្យាមួយណាស័ក្ដិសមជាង?',
          options: [
            'Inline <svg> ដែលមាន <circle> ចំនួន 8,000',
            'HTML <canvas> ព្រោះវាគូរភីកសែលផ្ទាល់ដោយមិនបង្កើតធាតុ DOM 8,000 ឡើយ',
            'តារាង <table> ដែលមាន 8,000 ក្រឡា',
            '<iframe> ដែលភ្ជាប់ទៅរូបភាព 8,000',
          ],
          answer: 1,
          explanation:
            'SVG បង្កើតធាតុ DOM មួយសម្រាប់រូបនីមួយៗ ដែលធ្វើឱ្យយឺតខ្លាំងពេលមានវត្ថុមានចលនារាប់ពាន់។ Canvas គូរផ្ទាល់លើផ្ទៃ bitmap តែមួយបានយ៉ាងលឿន។',
        },
        {
          question: 'ហេតុអ្វីបានជារូបគូរលើ <canvas> អាចមើលទៅយឺត និងព្រាល សូម្បីតែលើអេក្រង់ច្បាស់?',
          options: [
            'Canvas គាំទ្រតែពណ៌ស-ខ្មៅប៉ុណ្ណោះ',
            'Canvas ត្រូវបានពង្រីកដោយ CSS width/height ដោយមិនកែគុណលក្ខណៈ HTML width និង height',
            'អ្នកភ្លេចដាក់ viewBox លើស្លាក <canvas>',
            'Canvas មិនអាចគូរខ្សែកោងដូចរង្វង់បានទេ',
          ],
          answer: 1,
          explanation:
            'តាមលំនាំដើម <canvas> មានផ្ទៃភីកសែល 300×150។ ការពង្រីកតែតាម CSS នឹងទាញភីកសែលតូចនោះឱ្យធំ ធ្វើឱ្យរូបព្រាល។',
        },
      ],
    },
  },

  // =========================================================================
  // 5. The <head> Element & Meta Tags
  // =========================================================================
  {
    slug: 'html-head-and-meta',
    level: 'intermediate',
    insertAfter: 'forms-and-inputs',
    en: {
      title: 'The <head> Element & Meta Tags',
      duration: '11 min',
      summary:
        'Configure a production-ready <head> with UTF-8 encoding, accessible viewport settings, SEO & Open Graph social previews, favicons, and non-blocking <script defer> loading.',
      objectives: [
        'Configure core <head> metadata including charset, accessible viewport, page title, description, and canonical URLs.',
        'Build rich link preview cards for messaging and social platforms using Open Graph (og:*) and <link> icon tags.',
        'Prevent render-blocking delays by choosing correctly between default <script>, <script defer>, and <script async>.',
      ],
      sections: [
        {
          id: 'essential-head-metadata',
          heading: 'Core Metadata: Charset, Viewport, Title & SEO',
          body: [
            'Although nothing inside <head> appears directly inside the visible page body, the <head> element is the command center for every web page. It tells the browser how to decode characters, how to size the page on phones, what label to show in browser tabs, and how search engines should index your document.',
            'Always place <meta charset="UTF-8"> as the very first tag inside <head> so the browser decodes English, Khmer, accents, and symbols correctly within the first 1024 bytes. Pair it with a responsive viewport meta tag, a unique <title>, a concise <meta name="description"> (around 140–160 characters), and a <link rel="canonical"> URL to prevent duplicate-page indexing.',
          ],
          table: {
            headers: ['Tag in <head>', 'Primary Purpose', 'Best Practice'],
            rows: [
              [
                '<meta charset="UTF-8">',
                'Character encoding',
                'Place as the first tag inside <head>.',
              ],
              [
                '<meta name="viewport" ...>',
                'Mobile layout scaling',
                'Use width=device-width, initial-scale=1.0 without blocking zoom.',
              ],
              [
                '<title>...</title>',
                'Tab title & SEO headline',
                'Keep unique per page, concise (~50–60 chars).',
              ],
              [
                '<meta name="description">',
                'Search snippet summary',
                'Summarize the page clearly in 140–160 characters.',
              ],
              [
                '<link rel="canonical">',
                'Preferred URL for SEO',
                'Point to the clean HTTPS URL without tracking params.',
              ],
              [
                '<meta name="theme-color">',
                'Mobile browser chrome tint',
                'Match your site’s header/brand color (e.g. #2563eb).',
              ],
            ],
          },
          example: {
            title: 'Production Core <head> Metadata',
            language: 'html',
            code: `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTML Meta Tags Guide — CodeHub</title>
  <meta
    name="description"
    content="Learn how charset, viewport, Open Graph, and deferred scripts power fast, shareable web pages."
  />
  <meta name="theme-color" content="#2563eb" />
  <link rel="canonical" href="https://codehub.dev/lessons/html-head-and-meta" />
</head>`,
          },
          warning:
            'Never add user-scalable=no or maximum-scale=1.0 to your viewport meta tag. Disabling pinch-to-zoom violates accessibility guidelines and prevents users with low vision from reading small text.',
        },
        {
          id: 'open-graph-and-social-cards',
          heading: 'Open Graph Social Previews & <link> Icons',
          body: [
            'When someone pastes your link into Telegram, Facebook, Discord, Slack, or X, those platforms crawl your <head> for Open Graph (<meta property="og:...">) and Twitter Card tags to generate an eye-catching preview card with a title, summary, and banner image.',
            'Alongside social metadata, <link> tags connect external resources to the document: stylesheets (rel="stylesheet"), browser tab favicons (rel="icon"), iOS home screen icons (rel="apple-touch-icon"), and network warmup hints like rel="preconnect" for font hosts.',
          ],
          points: [
            'Core Open Graph tags: og:title, og:description, og:image (1200×630 px recommended), og:url, and og:type.',
            'Add twitter:card="summary_large_image" so X and messaging apps display a large banner preview.',
            'Provide an SVG or PNG favicon with <link rel="icon" type="image/svg+xml" href="/favicon.svg">.',
          ],
          example: {
            title: 'Interactive Open Graph Social Card & Meta Tag Builder',
            language: 'html',
            code: `<meta property="og:type" content="article" />
<meta property="og:title" content="Master HTML Meta Tags" />
<meta property="og:description" content="A practical guide to SEO, social previews, and fast script loading." />
<meta property="og:image" content="https://codehub.dev/og/html-meta.png" />
<meta property="og:url" content="https://codehub.dev/lessons/html-head-and-meta" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`,
            playground: {
              html: `<div class="og-builder">
  <div class="inputs">
    <label>og:title <input id="og-title" value="CodeHub — Interactive HTML Guide" /></label>
    <label>og:description <input id="og-desc" value="Learn modern HTML, CSS, and JavaScript with live playgrounds." /></label>
    <label>og:url <input id="og-url" value="https://codehub.dev/html" /></label>
  </div>

  <div class="card-preview">
    <div class="banner">1200 × 630 Preview Banner</div>
    <div class="meta">
      <div id="p-host" class="host">CODEHUB.DEV</div>
      <div id="p-title" class="p-title"></div>
      <div id="p-desc" class="p-desc"></div>
    </div>
  </div>

  <pre id="code-out" class="code"></pre>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; color: #18181b; }
.og-builder { max-width: 540px; display: grid; gap: 14px; }
.inputs { display: grid; gap: 8px; }
label { display: grid; gap: 4px; font-size: 12px; font-weight: 600; color: #3f3f46; }
input { padding: 7px 10px; border: 1px solid #d4d4d8; border-radius: 8px; font-size: 13px; }
.card-preview { border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; background: #fff; }
.banner { height: 84px; background: linear-gradient(135deg, #2563eb, #0ea5e9); color: #fff; display: grid; place-items: center; font-weight: 700; font-size: 14px; letter-spacing: 0.02em; }
.meta { padding: 12px 14px; display: grid; gap: 4px; }
.host { font-size: 11px; font-weight: 700; color: #71717a; text-transform: uppercase; }
.p-title { font-size: 15px; font-weight: 700; color: #09090b; }
.p-desc { font-size: 13px; color: #52525b; }
.code { margin: 0; padding: 12px; border-radius: 10px; background: #0f172a; color: #e2e8f0; font-size: 12px; overflow-x: auto; line-height: 1.5; }`,
              js: `const titleIn = document.getElementById('og-title');
const descIn = document.getElementById('og-desc');
const urlIn = document.getElementById('og-url');
const pHost = document.getElementById('p-host');
const pTitle = document.getElementById('p-title');
const pDesc = document.getElementById('p-desc');
const codeOut = document.getElementById('code-out');

function esc(str) {
  return str.replace(/"/g, '&quot;');
}

function render() {
  const t = titleIn.value.trim() || 'Untitled Page';
  const d = descIn.value.trim() || 'Page summary...';
  const u = urlIn.value.trim() || 'https://example.com';
  let host = 'EXAMPLE.COM';
  try { host = new URL(u).hostname.toUpperCase(); } catch {}
  pHost.textContent = host;
  pTitle.textContent = t;
  pDesc.textContent = d;
  codeOut.textContent =
    '<meta property="og:title" content="' + esc(t) + '" />\\n' +
    '<meta property="og:description" content="' + esc(d) + '" />\\n' +
    '<meta property="og:url" content="' + esc(u) + '" />\\n' +
    '<meta property="og:image" content="https://codehub.dev/og-cover.png" />';
}

[titleIn, descIn, urlIn].forEach((el) => el.addEventListener('input', render));
render();`,
            },
          },
          tip: 'Always use a full absolute HTTPS URL for og:image (for example https://codehub.dev/og-cover.png). Relative paths like /og-cover.png are ignored by most social link scrapers.',
        },
        {
          id: 'loading-scripts-and-stylesheets',
          heading: 'Loading Scripts Without Blocking Render (defer vs async)',
          body: [
            'When the browser encounters a plain <script src="app.js"></script> inside <head>, it stops parsing HTML completely until the script finishes downloading and running. That delays the page from appearing and causes null errors if app.js tries to query elements in <body> that do not exist yet.',
            'Adding the defer attribute solves both problems: the browser downloads the script in parallel while parsing HTML, and executes deferred scripts in exact document order once HTML parsing completes (right before DOMContentLoaded). By contrast, async downloads in parallel and executes the instant it finishes—making async ideal for independent analytics snippets, while defer (or <script type="module">, which defers automatically) is the best default for your application code.',
          ],
          points: [
            '<script src="app.js" defer>: non-blocking download, runs in order after DOM is parsed — best default.',
            '<script src="stats.js" async>: non-blocking download, runs immediately when ready (order not guaranteed) — best for standalone analytics.',
            '<script type="module" src="main.js">: modern ES module syntax with defer behavior built in automatically.',
          ],
          example: {
            title: 'Comparing Blocking, defer, and async Script Loading',
            language: 'html',
            code: `<head>
  <link rel="stylesheet" href="/styles.css" />
  <!-- Recommended for application code -->
  <script src="/vendor.js" defer></script>
  <script src="/app.js" defer></script>
  <!-- Independent third-party analytics -->
  <script src="https://analytics.example/tag.js" async></script>
</head>`,
            playground: {
              html: `<div class="timeline">
  <div class="tabs">
    <button type="button" data-kind="blocking">Plain &lt;script&gt;</button>
    <button type="button" data-kind="defer" class="active">&lt;script defer&gt;</button>
    <button type="button" data-kind="async">&lt;script async&gt;</button>
  </div>
  <div id="bars" class="bars"></div>
  <p id="note" class="note"></p>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; color: #18181b; }
.timeline { max-width: 540px; display: grid; gap: 12px; }
.tabs { display: flex; flex-wrap: wrap; gap: 8px; }
button { padding: 7px 12px; border: 1px solid #d4d4d8; border-radius: 8px; background: #fff; font-weight: 600; cursor: pointer; }
button.active { background: #2563eb; border-color: #2563eb; color: #fff; }
.bars { display: grid; gap: 8px; padding: 14px; border: 1px solid #e4e4e7; border-radius: 10px; background: #f8fafc; }
.row { display: grid; grid-template-columns: 92px 1fr; align-items: center; gap: 10px; font-size: 12px; font-weight: 600; }
.track { position: relative; height: 22px; background: #e2e8f0; border-radius: 6px; overflow: hidden; }
.seg { position: absolute; top: 0; bottom: 0; border-radius: 4px; display: grid; place-items: center; color: #fff; font-size: 11px; }
.parse { background: #10b981; }
.fetch { background: #3b82f6; }
.exec { background: #f59e0b; }
.note { margin: 0; font-size: 13px; color: #3f3f46; line-height: 1.5; }`,
              js: `const data = {
  blocking: {
    rows: [
      ['HTML Parse', [{ cls: 'parse', l: 0, w: 25, t: 'Parse' }, { cls: 'parse', l: 68, w: 32, t: 'Resume' }]],
      ['JS Network', [{ cls: 'fetch', l: 25, w: 28, t: 'Download' }]],
      ['JS Execute', [{ cls: 'exec', l: 53, w: 15, t: 'Run' }]],
    ],
    note: 'Blocking: HTML parsing freezes while the browser downloads and executes the script, delaying page display.',
  },
  defer: {
    rows: [
      ['HTML Parse', [{ cls: 'parse', l: 0, w: 68, t: 'Continuous Parse (Unblocked)' }]],
      ['JS Network', [{ cls: 'fetch', l: 14, w: 30, t: 'Parallel Download' }]],
      ['JS Execute', [{ cls: 'exec', l: 68, w: 18, t: 'Run in Order' }]],
    ],
    note: 'defer: Script downloads in parallel and executes in order only after the HTML DOM is ready. Best default for app code!',
  },
  async: {
    rows: [
      ['HTML Parse', [{ cls: 'parse', l: 0, w: 42, t: 'Parse' }, { cls: 'parse', l: 58, w: 30, t: 'Resume' }]],
      ['JS Network', [{ cls: 'fetch', l: 12, w: 30, t: 'Parallel' }]],
      ['JS Execute', [{ cls: 'exec', l: 42, w: 16, t: 'Run Now' }]],
    ],
    note: 'async: Downloads in parallel, then pauses parsing immediately when ready. Execution order is unpredictable—great for independent analytics.',
  },
};

const bars = document.getElementById('bars');
const note = document.getElementById('note');
const tabs = document.querySelectorAll('.tabs button');

function render(kind) {
  const item = data[kind];
  bars.innerHTML = item.rows.map(([label, segs]) =>
    '<div class="row"><span>' + label + '</span><div class="track">' +
    segs.map((s) => '<div class="seg ' + s.cls + '" style="left:' + s.l + '%;width:' + s.w + '%">' + s.t + '</div>').join('') +
    '</div></div>'
  ).join('');
  note.textContent = item.note;
  tabs.forEach((b) => b.classList.toggle('active', b.dataset.kind === kind));
}

tabs.forEach((b) => b.addEventListener('click', () => render(b.dataset.kind)));
render('defer');`,
            },
          },
        },
      ],
      challenge: {
        prompt:
          'Write a complete, production-ready <head> section for an article page. Include UTF-8 charset, an accessible responsive viewport tag, a <title>, a <meta name="description">, a canonical <link>, Open Graph tags (og:title, og:description, og:image with an HTTPS URL, og:type), a favicon <link>, a CSS stylesheet <link>, and a deferred <script src="/app.js" defer>.',
        hint: 'Put <meta charset="UTF-8" /> first, avoid user-scalable=no in viewport, and use property="og:..." for Open Graph tags.',
        language: 'html',
        solutionCode: `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Clean HTML Architecture — CodeHub</title>
  <meta
    name="description"
    content="Practical patterns for semantic HTML, metadata, and fast page rendering."
  />
  <link rel="canonical" href="https://codehub.dev/articles/clean-html" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="Clean HTML Architecture — CodeHub" />
  <meta
    property="og:description"
    content="Practical patterns for semantic HTML, metadata, and fast page rendering."
  />
  <meta property="og:image" content="https://codehub.dev/images/clean-html-og.png" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="stylesheet" href="/styles.css" />
  <script src="/app.js" defer></script>
</head>`,
      },
      quiz: [
        {
          question:
            'Why is <script src="app.js" defer></script> usually preferred over <script src="app.js" async></script> for main application scripts?',
          options: [
            'defer downloads scripts synchronously so they finish faster',
            'defer guarantees scripts run in document order after HTML parsing completes, so DOM elements are ready',
            'async does not work inside the <head> element',
            'defer automatically minifies JavaScript files in the browser',
          ],
          answer: 1,
          explanation:
            'Both async and defer download without blocking HTML parsing, but defer waits until parsing finishes and preserves script order—preventing missing DOM errors and dependency races.',
        },
        {
          question:
            'Which viewport meta tag configuration follows modern mobile accessibility best practices?',
          options: [
            '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">',
            '<meta name="viewport" content="width=980, maximum-scale=1.0">',
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
            '<meta name="viewport" content="zoom=disabled">',
          ],
          answer: 2,
          explanation:
            'Setting width=device-width, initial-scale=1.0 matches the device screen cleanly while still allowing users with low vision to pinch-zoom.',
        },
      ],
    },
    km: {
      title: 'ធាតុ <head> និងស្លាក Meta ក្នុង HTML',
      duration: '11 នាទី',
      summary:
        'កំណត់ <head> ស្តង់ដារផលិតកម្មជាមួយ UTF-8, viewport ងាយស្រួលប្រើប្រាស់, SEO និងកាតចែករំលែក Open Graph, favicon និងការផ្ទុក <script defer> មិនឱ្យរាំងស្ទះទំព័រ។',
      objectives: [
        'កំណត់ទិន្នន័យមេតាស្នូលក្នុង <head> រួមមាន charset, viewport, title, description និងតំណ canonical។',
        'បង្កើតកាតមើលជាមុនស្អាតពេលចែករំលែកលើបណ្ដាញសង្គមដោយប្រើ Open Graph (og:*) និង <link> favicon។',
        'ជៀសវាងការពន្យឺតការបង្ហាញទំព័រ ដោយជ្រើសរើសបានត្រឹមត្រូវរវាង <script> ធម្មតា, <script defer> និង <script async>។',
      ],
      sections: [
        {
          id: 'essential-head-metadata',
          heading: 'ទិន្នន័យមេតាស្នូល៖ Charset, Viewport, Title និង SEO',
          body: [
            'ទោះបីមាតិកាក្នុង <head> មិនបង្ហាញផ្ទាល់លើផ្ទៃទំព័រក៏ដោយ វាជាមជ្ឈមណ្ឌលបញ្ជារបស់គេហទំព័រទាំងមូល។ វាប្រាប់កម្មវិធីរុករកពីរបៀបបកប្រែតួអក្សរ របៀបកំណត់ទំហំលើទូរស័ព្ទ ចំណងជើងលើផ្ទាំង tab និងរបៀបដែលម៉ាស៊ីនស្វែងរកគួរចាត់ថ្នាក់ទំព័រ។',
            'តែងតែដាក់ <meta charset="UTF-8"> ជាស្លាកដំបូងបំផុតក្នុង <head> ដើម្បីឱ្យកម្មវិធីរុករកបង្ហាញអក្សរខ្មែរ អង់គ្លេស និងនិមិត្តសញ្ញាបានត្រឹមត្រូវក្នុង 1024 បៃដំបូង។ គួបផ្សំវាជាមួយ viewport, <title> តែមួយគត់, <meta name="description"> ខ្លីច្បាស់ (ប្រហែល 140–160 តួអក្សរ) និង <link rel="canonical"> ដើម្បីការពារបញ្ហា SEO ទំព័រស្ទួន។',
          ],
          table: {
            headers: ['ស្លាកក្នុង <head>', 'តួនាទីសំខាន់', 'ការអនុវត្តល្អបំផុត'],
            rows: [
              [
                '<meta charset="UTF-8">',
                'ការអ៊ិនកូដតួអក្សរ',
                'ដាក់ជាស្លាកដំបូងបំផុតនៅខាងក្នុង <head>។',
              ],
              [
                '<meta name="viewport" ...>',
                'មាត្រដ្ឋានលើទូរស័ព្ទ',
                'ប្រើ width=device-width, initial-scale=1.0 ដោយមិនបិទការពង្រីក។',
              ],
              [
                '<title>...</title>',
                'ចំណងជើង Tab និង SEO',
                'ដាក់ឱ្យខុសគ្នាតាមទំព័រ និងខ្លីច្បាស់ (~50–60 តួអក្សរ)។',
              ],
              [
                '<meta name="description">',
                'សេចក្ដីសង្ខេបលើ Google',
                'សង្ខេបខ្លឹមសារទំព័រច្បាស់លាស់ក្នុង 140–160 តួអក្សរ។',
              ],
              [
                '<link rel="canonical">',
                'URL ផ្លូវការសម្រាប់ SEO',
                'ចង្អុលទៅ URL HTTPS ស្អាតដោយគ្មានប៉ារ៉ាម៉ែត្រតាមដាន។',
              ],
              [
                '<meta name="theme-color">',
                'ពណ៌របារកម្មវិធីរុករកទូរស័ព្ទ',
                'ដាក់ពណ៌ឱ្យស៊ីជាមួយម៉ាកគេហទំព័រ (ឧ. #2563eb)។',
              ],
            ],
          },
          exampleTitle: 'គំរូទិន្នន័យមេតាស្នូលក្នុង <head>',
          warning:
            'កុំដាក់ user-scalable=no ឬ maximum-scale=1.0 ក្នុងស្លាក viewport ឡើយ។ ការបិទការពង្រីកអេក្រង់ដោយម្រាមដៃបំពានស្តង់ដារភាពងាយស្រួលប្រើប្រាស់ និងរារាំងអ្នកមានភ្នែកខ្សោយមិនឱ្យអានអក្សរតូចបាន។',
        },
        {
          id: 'open-graph-and-social-cards',
          heading: 'កាតចែករំលែក Open Graph និងរូបតំណាង <link>',
          body: [
            'ពេលអ្នកណាម្នាក់ផ្ញើតំណគេហទំព័ររបស់អ្នកក្នុង Telegram, Facebook, Discord, Slack ឬ X វេទិកាទាំងនោះនឹងអានស្លាក Open Graph (<meta property="og:...">) និង Twitter Card ក្នុង <head> ដើម្បីបង្កើតកាតមើលជាមុនដែលមានចំណងជើង សេចក្ដីសង្ខេប និងរូបភាពគម្រប។',
            'ទន្ទឹមនឹងនេះ ស្លាក <link> ភ្ជាប់ធនធានខាងក្រៅមកឯកសារដូចជា CSS (rel="stylesheet"), រូបតំណាង tab (rel="icon"), រូបតំណាងអេក្រង់ដើម iOS (rel="apple-touch-icon") និងការភ្ជាប់ទុកជាមុនដូចជា rel="preconnect"។',
          ],
          points: [
            'ស្លាក Open Graph ស្នូល៖ og:title, og:description, og:image (ណែនាំទំហំ 1200×630 px), og:url និង og:type។',
            'បន្ថែម twitter:card="summary_large_image" ដើម្បីបង្ហាញរូបភាពគម្របធំស្អាតពេលចែករំលែក។',
            'ផ្ដល់ favicon ជា SVG ឬ PNG តាម <link rel="icon" type="image/svg+xml" href="/favicon.svg">។',
          ],
          exampleTitle: 'ឧបករណ៍បង្កើតកាត Open Graph និងស្លាក Meta ផ្ទាល់',
          tip: 'តែងតែប្រើ URL HTTPS ពេញលេញសម្រាប់ og:image (ឧទាហរណ៍ https://codehub.dev/og-cover.png)។ ផ្លូវខ្លីដូច /og-cover.png ត្រូវបានម៉ាស៊ីនស្កេនបណ្ដាញសង្គមភាគច្រើនរំលងចោល។',
        },
        {
          id: 'loading-scripts-and-stylesheets',
          heading: 'ការផ្ទុកស្គ្រីបមិនឱ្យរាំងស្ទះការបង្ហាញ (defer vs async)',
          body: [
            'ពេលកម្មវិធីរុករកជួប <script src="app.js"></script> ធម្មតានៅក្នុង <head> វានឹងផ្អាកការអាន HTML ទាំងស្រុងរហូតទាល់តែទាញយក និងដំណើរការស្គ្រីបចប់។ នេះធ្វើឱ្យទំព័រយឺតក្នុងការបង្ហាញ ហើយបង្កកំហុស null បើស្គ្រីបព្យាយាមស្វែងរកធាតុក្នុង <body> ដែលមិនទាន់បានអាន។',
            'ការបន្ថែម defer ដោះស្រាយបញ្ហាទាំងពីរ៖ កម្មវិធីរុករកទាញយកស្គ្រីបស្របគ្នាពេលអាន HTML ហើយដំណើរការស្គ្រីបតាមលំដាប់ឯកសារបន្ទាប់ពីអាន HTML ចប់ (មុន DOMContentLoaded)។ ចំណែក async ទាញយកស្របគ្នា តែដំណើរការភ្លាមពេលទាញចប់ដោយគ្មានលំដាប់—ល្អសម្រាប់ស្គ្រីបវិភាគឯករាជ្យ ចំណែក defer (ឬ type="module") ជាជម្រើសល្អបំផុតសម្រាប់កូដកម្មវិធី។',
          ],
          points: [
            '<script src="app.js" defer>៖ ទាញយកមិនរាំងស្ទះ ដំណើរការតាមលំដាប់ក្រោយ DOM រួចរាល់ — ល្អបំផុតជាលំនាំដើម។',
            '<script src="stats.js" async>៖ ទាញយកមិនរាំងស្ទះ ដំណើរការភ្លាមពេលរួច (គ្មានលំដាប់ច្បាស់) — ល្អសម្រាប់ analytics ឯករាជ្យ។',
            '<script type="module" src="main.js">៖ ទម្រង់ ES module ទំនើបដែលមានឥរិយាបថ defer ដោយស្វ័យប្រវត្តិ។',
          ],
          exampleTitle: 'ការប្រៀបធៀបលំដាប់ផ្ទុក Blocking, defer និង async',
        },
      ],
      challenge: {
        prompt:
          'សរសេរផ្នែក <head> ពេញលេញសម្រាប់ទំព័រអត្ថបទមួយ៖ រួមមាន UTF-8 charset, viewport ងាយស្រួលប្រើប្រាស់, <title>, <meta name="description">, <link rel="canonical">, ស្លាក Open Graph (og:title, og:description, og:image ជា HTTPS URL, og:type), <link> favicon, CSS stylesheet និង <script src="/app.js" defer>។',
        hint: 'ដាក់ <meta charset="UTF-8" /> មុនគេ ជៀសវាង user-scalable=no ក្នុង viewport ហើយប្រើ property="og:..." សម្រាប់ស្លាក Open Graph។',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វីបានជា <script src="app.js" defer></script> ភាគច្រើនល្អជាង <script src="app.js" async></script> សម្រាប់កូដកម្មវិធីស្នូល?',
          options: [
            'defer ទាញយកស្គ្រីបបែប synchronous ដើម្បីឱ្យលឿនជាង',
            'defer ធានាថាស្គ្រីបដំណើរការតាមលំដាប់ក្រោយពេលអាន HTML ចប់ ដូច្នេះធាតុ DOM រួចរាល់ហើយ',
            'async មិនដំណើរការនៅក្នុងធាតុ <head> ទេ',
            'defer បង្រួមកូដ JavaScript ដោយស្វ័យប្រវត្តិក្នុងកម្មវិធីរុករក',
          ],
          answer: 1,
          explanation:
            'ទាំង async និង defer ទាញយកមិនរាំងស្ទះ HTML ទេ ប៉ុន្តែ defer រង់ចាំដល់ការអាន HTML ចប់ និងរក្សាលំដាប់ស្គ្រីប ជៀសវាងកំហុសរក DOM មិនឃើញ។',
        },
        {
          question:
            'តើការកំណត់ស្លាក meta viewport មួយណាស្របតាមការអនុវត្តល្អបំផុតសម្រាប់ភាពងាយស្រួលប្រើប្រាស់លើទូរស័ព្ទ?',
          options: [
            '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">',
            '<meta name="viewport" content="width=980, maximum-scale=1.0">',
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
            '<meta name="viewport" content="zoom=disabled">',
          ],
          answer: 2,
          explanation:
            'width=device-width, initial-scale=1.0 កំណត់ទទឹងទំព័រតាមអេក្រង់ឧបករណ៍យ៉ាងស្អាត ខណៈនៅតែអនុញ្ញាតឱ្យអ្នកប្រើពង្រីកអេក្រង់មើលបាន។',
        },
      ],
    },
  },

  // =========================================================================
  // 6. HTML Web Storage APIs
  // =========================================================================
  {
    slug: 'html-web-storage-apis',
    level: 'pro',
    insertAfter: 'html-head-and-meta',
    en: {
      title: 'HTML Web Storage APIs',
      duration: '14 min',
      summary:
        'Persist client-side state cleanly with localStorage and sessionStorage, serialize structured data safely with JSON, and build a complete interactive notes app.',
      objectives: [
        'Differentiate localStorage, sessionStorage, and cookies by lifespan, tab scope, capacity, and security.',
        'Serialize and parse JavaScript objects and arrays safely using JSON.stringify(), JSON.parse(), and try/catch guards.',
        'Build a persistent, XSS-safe interactive notes application that syncs HTML form state to Web Storage.',
      ],
      sections: [
        {
          id: 'localstorage-vs-sessionstorage',
          heading: 'localStorage vs sessionStorage & Same-Origin Scope',
          body: [
            'The HTML Web Storage API gives web applications simple, synchronous key-value storage directly inside the user’s browser—typically 5 to 10 MB per origin—without attaching that payload to every outgoing HTTP request header the way cookies do. Both storage objects are strictly scoped by origin (protocol + domain + port), so code on one website can never read another site’s stored keys.',
            'Choose localStorage for preferences and offline drafts that should survive browser restarts and stay shared across open tabs of your site (for example, dark mode theme, selected language, or saved notes). Choose sessionStorage for temporary per-tab state—such as a multi-step checkout wizard or unsaved filter inputs—that should wipe automatically the moment the user closes that tab.',
          ],
          table: {
            headers: ['Feature', 'localStorage', 'sessionStorage', 'HTTP Cookies'],
            rows: [
              [
                'Lifespan',
                'Persists until cleared',
                'Cleared when tab closes',
                'Expires on date / max-age',
              ],
              [
                'Tab scope',
                'Shared across same-origin tabs',
                'Isolated to a single tab',
                'Shared across same-origin tabs',
              ],
              [
                'Typical capacity',
                '~5–10 MB per origin',
                '~5–10 MB per origin',
                '~4 KB per cookie',
              ],
              [
                'Sent to server automatically?',
                'No (client-only)',
                'No (client-only)',
                'Yes (on matching HTTP requests)',
              ],
              [
                'Core JS API',
                'setItem / getItem / removeItem',
                'setItem / getItem / removeItem',
                'document.cookie / Set-Cookie',
              ],
            ],
          },
          example: {
            title: 'Core Web Storage CRUD & Cross-Tab Sync Event',
            language: 'html',
            code: `<script>
  // Save, read, and remove keys in localStorage
  localStorage.setItem('codehub:lang', 'km');
  const lang = localStorage.getItem('codehub:lang'); // 'km'
  localStorage.removeItem('codehub:lang');

  // Store temporary per-tab state in sessionStorage
  sessionStorage.setItem('wizard:step', '2');

  // React when another open tab updates localStorage
  window.addEventListener('storage', (event) => {
    if (event.key === 'codehub:theme') {
      console.log('Theme changed in another tab:', event.newValue);
    }
  });
</script>`,
          },
          warning:
            'Never store passwords, credit card numbers, or sensitive authentication tokens in localStorage or sessionStorage. Any script running on the page—including a compromised third-party library or XSS injection—can read every key in Web Storage.',
        },
        {
          id: 'json-serialization-and-safety',
          heading: 'Storing Objects Safely with JSON & try/catch Guards',
          body: [
            'Web Storage stores strings only. If you pass a JavaScript object or array directly to localStorage.setItem("prefs", { theme: "dark" }), the browser coerces it into the useless string "[object Object]". Always convert structured data with JSON.stringify() before saving, and restore it with JSON.parse() after reading.',
            'In production, wrap every storage call inside a try/catch helper. Private browsing restrictions, embedded sandboxed iframes, exceeded storage quotas (QuotaExceededError), or manually edited corrupt JSON strings can all throw runtime exceptions that would crash an unguarded app.',
          ],
          points: [
            'Write small loadJSON(key, fallback) and saveJSON(key, value) helpers to centralize parsing and error recovery.',
            'Namespace keys with your app name and schema version (e.g. codehub:v1:prefs) to avoid localhost collisions.',
            'Always handle null returns from getItem() gracefully for first-time visitors.',
          ],
          example: {
            title: 'Safe JSON Preferences Persistence Panel',
            language: 'html',
            code: `<script>
  function saveJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn('Storage unavailable:', err.message);
    }
  }

  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }
</script>`,
            playground: {
              html: `<div class="prefs">
  <h3>Workspace Preferences (JSON Storage)</h3>
  <div class="row">
    <label>Theme
      <select id="theme">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
    <label>Font Size
      <select id="size">
        <option value="14">14px</option>
        <option value="16">16px</option>
        <option value="18">18px</option>
      </select>
    </label>
    <button id="reset" type="button">Reset Defaults</button>
  </div>
  <div id="preview" class="preview">Live preview reflects your serialized JSON preferences.</div>
  <pre id="raw" class="raw"></pre>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; color: #18181b; }
.prefs { max-width: 520px; display: grid; gap: 12px; }
h3 { margin: 0; font-size: 16px; }
.row { display: flex; flex-wrap: wrap; align-items: end; gap: 10px; }
label { display: grid; gap: 4px; font-size: 12px; font-weight: 600; color: #52525b; }
select, button { padding: 7px 10px; border: 1px solid #d4d4d8; border-radius: 8px; background: #fff; font-size: 13px; }
button { font-weight: 600; cursor: pointer; }
.preview { padding: 14px; border-radius: 10px; border: 1px solid #e4e4e7; transition: background 180ms ease, color 180ms ease; }
.preview.dark { background: #0f172a; color: #f8fafc; border-color: #1e293b; }
.raw { margin: 0; padding: 10px 12px; border-radius: 8px; background: #f4f4f5; font-size: 12px; overflow-x: auto; }`,
              js: `const KEY = 'codehub:v1:demo-prefs';
const defaults = { theme: 'light', fontSize: 16 };
const memory = {};

function savePrefs(obj) {
  const serialized = JSON.stringify(obj);
  memory[KEY] = serialized;
  try { localStorage.setItem(KEY, serialized); } catch {}
}

function loadPrefs() {
  try {
    const raw = localStorage.getItem(KEY) || memory[KEY];
    return raw ? { ...defaults, ...JSON.parse(raw) } : { ...defaults };
  } catch {
    return { ...defaults };
  }
}

const themeEl = document.getElementById('theme');
const sizeEl = document.getElementById('size');
const preview = document.getElementById('preview');
const rawEl = document.getElementById('raw');

function apply(prefs) {
  themeEl.value = prefs.theme;
  sizeEl.value = String(prefs.fontSize);
  preview.classList.toggle('dark', prefs.theme === 'dark');
  preview.style.fontSize = prefs.fontSize + 'px';
  rawEl.textContent = KEY + ' = ' + JSON.stringify(prefs);
}

function onChange() {
  const next = { theme: themeEl.value, fontSize: Number(sizeEl.value) };
  savePrefs(next);
  apply(next);
}

themeEl.addEventListener('change', onChange);
sizeEl.addEventListener('change', onChange);
document.getElementById('reset').addEventListener('click', () => {
  try { localStorage.removeItem(KEY); } catch {}
  delete memory[KEY];
  apply({ ...defaults });
});

apply(loadPrefs());`,
            },
          },
          tip: 'Prefix your keys with an app namespace such as codehub:v1:notes so multiple projects running on localhost never overwrite each other’s data.',
        },
        {
          id: 'interactive-notes-app',
          heading: 'Project: Building a Persistent Interactive Notes App',
          body: [
            'A clean client-side notes app follows a simple three-step state loop: (1) load the array of notes from localStorage on startup, (2) whenever the user adds, toggles, or deletes a note, update the array and persist it with JSON.stringify(), and (3) re-render the list from that single source of truth.',
            'Pay close attention to rendering security: always insert user-written note text with element.textContent rather than innerHTML. Using textContent guarantees that HTML characters such as <script> or <img onerror=...> display harmlessly as plain text instead of executing.',
          ],
          points: [
            'Store each note as an object with a unique id, text, and done boolean inside a JSON array.',
            'Handle the form submit event with event.preventDefault() so Enter key submission works naturally.',
            'Render user text with textContent to keep the app completely immune to DOM-based XSS.',
          ],
          example: {
            title: 'Complete Interactive Quick-Notes App (Web Storage + JSON)',
            language: 'html',
            code: `<form id="note-form">
  <input id="note-input" type="text" placeholder="Write a quick note..." required />
  <button type="submit">Add</button>
</form>
<ul id="note-list"></ul>`,
            playground: {
              html: `<section class="notes-app">
  <header class="head">
    <h3>Quick Notes</h3>
    <span id="count" class="count">0 notes</span>
  </header>

  <form id="note-form" class="form">
    <input id="note-input" type="text" placeholder="Add a study reminder..." maxlength="80" required />
    <button type="submit">Save Note</button>
  </form>

  <ul id="note-list" class="list"></ul>

  <div class="footer">
    <button id="clear-all" type="button" class="ghost">Clear All</button>
    <code id="storage-peek" class="peek"></code>
  </div>
</section>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; color: #18181b; }
.notes-app { max-width: 520px; display: grid; gap: 12px; }
.head { display: flex; justify-content: space-between; align-items: center; }
h3 { margin: 0; font-size: 16px; }
.count { font-size: 12px; font-weight: 600; color: #52525b; font-variant-numeric: tabular-nums; }
.form { display: flex; gap: 8px; }
input { flex: 1; padding: 8px 10px; border: 1px solid #d4d4d8; border-radius: 8px; font-size: 14px; }
button { padding: 8px 14px; border: none; border-radius: 8px; background: #2563eb; color: #fff; font-weight: 600; cursor: pointer; }
.ghost { background: #f4f4f5; color: #3f3f46; padding: 6px 10px; font-size: 12px; }
.list { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
.item { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border: 1px solid #e4e4e7; border-radius: 8px; background: #fff; }
.item.done .text { text-decoration: line-through; color: #71717a; }
.text { flex: 1; font-size: 14px; cursor: pointer; }
.del { background: transparent; color: #dc2626; padding: 4px 8px; font-size: 12px; }
.footer { display: flex; align-items: center; gap: 10px; }
.peek { flex: 1; font-size: 11px; color: #52525b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }`,
              js: `const STORAGE_KEY = 'codehub:v1:quick-notes';
let fallbackStore = JSON.stringify([
  { id: 1, text: 'Practice semantic HTML landmarks', done: true },
  { id: 2, text: 'Build a JSON localStorage helper', done: false },
]);

function readNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || fallbackStore;
    return JSON.parse(raw);
  } catch {
    return JSON.parse(fallbackStore);
  }
}

function writeNotes(list) {
  fallbackStore = JSON.stringify(list);
  try { localStorage.setItem(STORAGE_KEY, fallbackStore); } catch {}
}

let notes = readNotes();
const form = document.getElementById('note-form');
const input = document.getElementById('note-input');
const listEl = document.getElementById('note-list');
const countEl = document.getElementById('count');
const peekEl = document.getElementById('storage-peek');

function render() {
  listEl.innerHTML = '';
  notes.forEach((note) => {
    const li = document.createElement('li');
    li.className = 'item' + (note.done ? ' done' : '');

    const span = document.createElement('span');
    span.className = 'text';
    span.textContent = note.text; // XSS-safe text rendering
    span.addEventListener('click', () => {
      notes = notes.map((n) => (n.id === note.id ? { ...n, done: !n.done } : n));
      writeNotes(notes);
      render();
    });

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'del';
    del.textContent = 'Delete';
    del.addEventListener('click', () => {
      notes = notes.filter((n) => n.id !== note.id);
      writeNotes(notes);
      render();
    });

    li.append(span, del);
    listEl.appendChild(li);
  });

  countEl.textContent = notes.length + (notes.length === 1 ? ' note' : ' notes');
  peekEl.textContent = 'Stored JSON: ' + JSON.stringify(notes);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  notes = [{ id: Date.now(), text, done: false }, ...notes];
  writeNotes(notes);
  input.value = '';
  render();
});

document.getElementById('clear-all').addEventListener('click', () => {
  notes = [];
  writeNotes(notes);
  render();
});

render();`,
            },
          },
          tip: 'Always insert user-generated note content using textContent instead of innerHTML so special characters never turn into executable HTML.',
        },
      ],
      challenge: {
        prompt:
          'Create an HTML + JavaScript bookmark saver with a <form id="bm-form"> containing title and URL inputs, a <ul id="bm-list"> list, and helper functions loadBookmarks() and saveBookmarks(items) that safely use JSON.parse / JSON.stringify with localStorage key "codehub:bookmarks" inside try/catch blocks.',
        hint: 'Return [] from loadBookmarks() when localStorage.getItem() returns null or throws, and render bookmark titles with textContent.',
        language: 'html',
        solutionCode: `<form id="bm-form">
  <input id="bm-title" type="text" placeholder="Title" required />
  <input id="bm-url" type="url" placeholder="https://example.com" required />
  <button type="submit">Save Bookmark</button>
</form>
<ul id="bm-list"></ul>

<script>
  const KEY = 'codehub:bookmarks';

  function loadBookmarks() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveBookmarks(items) {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch (err) {
      console.warn('Could not persist bookmarks:', err);
    }
  }

  const listEl = document.getElementById('bm-list');
  let bookmarks = loadBookmarks();

  function render() {
    listEl.innerHTML = '';
    bookmarks.forEach(({ title, url }) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = url;
      a.textContent = title;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      li.appendChild(a);
      listEl.appendChild(li);
    });
  }

  document.getElementById('bm-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('bm-title').value.trim();
    const url = document.getElementById('bm-url').value.trim();
    if (!title || !url) return;
    bookmarks.push({ title, url });
    saveBookmarks(bookmarks);
    e.target.reset();
    render();
  });

  render();
</script>`,
      },
      quiz: [
        {
          question:
            'What gets saved if you run localStorage.setItem("profile", { name: "Nita" }) without calling JSON.stringify()?',
          options: [
            'The browser automatically converts it into valid JSON',
            'The string "[object Object]" because Web Storage only stores strings',
            'The browser throws a SyntaxError immediately',
            'Only the name property "Nita" is stored',
          ],
          answer: 1,
          explanation:
            'Web Storage converts every value to a string. Calling String({ name: "Nita" }) yields "[object Object]", so you must wrap objects in JSON.stringify().',
        },
        {
          question:
            'How does sessionStorage differ from localStorage, and what should NEVER be stored in either?',
          options: [
            'sessionStorage survives browser restarts; never store CSS theme names',
            'sessionStorage is cleared when the tab closes; never store passwords or sensitive secrets in Web Storage',
            'sessionStorage is sent automatically with every HTTP request; never store arrays',
            'sessionStorage is shared across different websites; never store plain text',
          ],
          answer: 1,
          explanation:
            'sessionStorage lasts only for the lifetime of one browser tab, whereas localStorage persists across restarts. Because any JS on the page can read Web Storage, never store passwords or sensitive secrets in it.',
        },
      ],
    },
    km: {
      title: 'HTML Web Storage API (localStorage និង sessionStorage)',
      duration: '14 នាទី',
      summary:
        'រក្សាទុកស្ថានភាពខាងកម្មវិធីរុករកដោយប្រើ localStorage និង sessionStorage, បម្លែងទិន្នន័យដោយសុវត្ថិភាពជាមួយ JSON និងបង្កើតកម្មវិធីកត់ចំណាំអន្តរកម្មពេញលេញ។',
      objectives: [
        'បែងចែកភាពខុសគ្នារវាង localStorage, sessionStorage និង Cookies តាមអាយុកាល វិសាលភាព tab ទំហំផ្ទុក និងសុវត្ថិភាព។',
        'រក្សាទុក និងអាន object និង array ដោយសុវត្ថិភាពដោយប្រើ JSON.stringify(), JSON.parse() និង try/catch។',
        'បង្កើតកម្មវិធីកត់ចំណាំអន្តរកម្មដែលរក្សាទិន្នន័យក្នុង Web Storage និងការពារ XSS។',
      ],
      sections: [
        {
          id: 'localstorage-vs-sessionstorage',
          heading: 'localStorage ធៀបនឹង sessionStorage និងវិសាលភាព Same-Origin',
          body: [
            'HTML Web Storage API ផ្ដល់កន្លែងផ្ទុកទិន្នន័យបែប key-value ដ៏សាមញ្ញនៅក្នុងកម្មវិធីរុករក—ជាទូទៅ 5 ទៅ 10 MB ក្នុងមួយ origin—ដោយមិនបញ្ជូនទិន្នន័យនោះភ្ជាប់តាមគ្រប់សំណើ HTTP ដូច Cookies ឡើយ។ កន្លែងផ្ទុកទាំងពីរត្រូវបានញែកដាច់តាម origin (protocol + domain + port) ដូច្នេះគេហទំព័រមួយមិនអាចអានទិន្នន័យរបស់គេហទំព័រមួយទៀតបានទេ។',
            'ជ្រើសរើស localStorage សម្រាប់ការកំណត់ និងព្រាងទុកដែលត្រូវរក្សាទុកក្រោយបិទបើកកម្មវិធីរុករក និងចែករំលែកគ្រប់ tab នៃគេហទំព័រតែមួយ (ដូចជា theme, ភាសា ឬកំណត់ត្រា)។ ជ្រើសរើស sessionStorage សម្រាប់ទិន្នន័យបណ្ដោះអាសន្នក្នុង tab តែមួយ—ដូចជាជំហានទូទាត់ប្រាក់—ដែលត្រូវលុបដោយស្វ័យប្រវត្តិពេលបិទ tab។',
          ],
          table: {
            headers: ['លក្ខណៈ', 'localStorage', 'sessionStorage', 'HTTP Cookies'],
            rows: [
              [
                'អាយុកាល',
                'រក្សាទុករហូតទាល់តែលុប',
                'លុបចោលពេលបិទ tab',
                'ផុតកំណត់តាមកាលបរិច្ឆេទ / max-age',
              ],
              [
                'វិសាលភាព Tab',
                'ចែករំលែកគ្រប់ tab origin ដូចគ្នា',
                'ដាច់ដោយឡែកក្នុង tab តែមួយ',
                'ចែករំលែកគ្រប់ tab origin ដូចគ្នា',
              ],
              [
                'ទំហំផ្ទុកទូទៅ',
                '~5–10 MB ក្នុងមួយ origin',
                '~5–10 MB ក្នុងមួយ origin',
                '~4 KB ក្នុងមួយ cookie',
              ],
              [
                'ផ្ញើទៅម៉ាស៊ីនមេស្វ័យប្រវត្តិ?',
                'ទេ (នៅតែខាងអតិថិជន)',
                'ទេ (នៅតែខាងអតិថិជន)',
                'បាទ/ចាស (តាមសំណើ HTTP)',
              ],
              [
                'API ស្នូលក្នុង JS',
                'setItem / getItem / removeItem',
                'setItem / getItem / removeItem',
                'document.cookie / Set-Cookie',
              ],
            ],
          },
          exampleTitle: 'ការប្រើប្រាស់ Web Storage CRUD និងព្រឹត្តិការណ៍ Sync រវាង Tab',
          warning:
            'កុំរក្សាទុកពាក្យសម្ងាត់ លេខកាតឥណទាន ឬ token សម្ងាត់ក្នុង localStorage ឬ sessionStorage ឡើយ។ ស្គ្រីបណាមួយដែលដំណើរការលើទំព័រ—រួមទាំងបណ្ណាល័យភាគីទីបី ឬការវាយប្រហារ XSS—អាចអានទិន្នន័យទាំងអស់ក្នុង Web Storage បាន។',
        },
        {
          id: 'json-serialization-and-safety',
          heading: 'ការរក្សាទុក Object ដោយសុវត្ថិភាពជាមួយ JSON និង try/catch',
          body: [
            'Web Storage រក្សាទុកបានតែអក្សរ (strings) ប៉ុណ្ណោះ។ បើអ្នកបញ្ជូន object ឬ array ផ្ទាល់ទៅ localStorage.setItem("prefs", { theme: "dark" }) កម្មវិធីរុករកនឹងបម្លែងវាទៅជាអក្សរ "[object Object]" ដែលប្រើការមិនបាន។ ត្រូវតែបម្លែងទិន្នន័យដោយ JSON.stringify() មុនរក្សាទុក ហើយបកប្រែវិញដោយ JSON.parse() ពេលអាន។',
            'ក្នុងកម្មវិធីពិតប្រាកដ ត្រូវរុំការហៅ storage ទាំងអស់ក្នុងអនុគមន៍ជំនួយ try/catch។ ការកម្រិតក្នុងម៉ូដឯកជន (Private mode), iframe ដែលមាន sandbox, ការពេញទំហំផ្ទុក (QuotaExceededError) ឬអក្សរ JSON ខូច អាចបង្កកំហុសពេលដំណើរការបើមិនមានការការពារ។',
          ],
          points: [
            'សរសេរអនុគមន៍ជំនួយ loadJSON(key, fallback) និង saveJSON(key, value) ដើម្បីគ្រប់គ្រងកំហុសនៅកន្លែងតែមួយ។',
            'ដាក់បុព្វបទឈ្មោះកម្មវិធី និងជំនាន់លើ key (ឧ. codehub:v1:prefs) ដើម្បីកុំឱ្យជាន់ឈ្មោះគ្នាលើ localhost។',
            'តែងតែផ្ដល់តម្លៃលំនាំដើមពេល getItem() ត្រឡប់ null សម្រាប់អ្នកប្រើលើកដំបូង។',
          ],
          exampleTitle: 'ផ្ទាំងកំណត់ការចូលចិត្តដោយប្រើ JSON Storage ប្រកបដោយសុវត្ថិភាព',
          tip: 'ដាក់បុព្វបទឈ្មោះកម្មវិធីលើ key ដូចជា codehub:v1:notes ដើម្បីកុំឱ្យគម្រោងផ្សេងៗដែលដំណើរការលើ localhost សរសេរជាន់ទិន្នន័យគ្នា។',
        },
        {
          id: 'interactive-notes-app',
          heading: 'គម្រោង៖ បង្កើតកម្មវិធីកត់ចំណាំអន្តរកម្មដែលរក្សាទិន្នន័យទុក',
          body: [
            'កម្មវិធីកត់ចំណាំដ៏ស្អាតមួយដើរតាមវដ្ត ៣ ជំហានងាយស្រួល៖ (1) ផ្ទុកអារ៉េកំណត់ត្រាពី localStorage ពេលបើកទំព័រ, (2) រាល់ពេលអ្នកប្រើបន្ថែម ធីកបញ្ចប់ ឬលុប ត្រូវកែអារ៉េរួចរក្សាទុកដោយ JSON.stringify() និង (3) គូរបញ្ជីឡើងវិញពីប្រភពទិន្នន័យតែមួយនោះ។',
            'ត្រូវយកចិត្តទុកដាក់លើសុវត្ថិភាពពេលបង្ហាញទិន្នន័យ៖ តែងតែដាក់អត្ថបទដែលអ្នកប្រើវាយតាម element.textContent ជំនួសឱ្យ innerHTML។ ការប្រើ textContent ធានាថាស្លាក HTML ដូច <script> ឬ <img onerror=...> នឹងបង្ហាញជាអត្ថបទធម្មតាដោយមិនដំណើរការកូដព្យាបាទឡើយ។',
          ],
          points: [
            'រក្សាទុកកំណត់ត្រានីមួយៗជា object ដែលមាន id, text និង done នៅក្នុងអារ៉េ JSON។',
            'ប្រើ event.preventDefault() ក្នុងព្រឹត្តិការណ៍ submit របស់ form ដើម្បីឱ្យការចុច Enter ដំណើរការយ៉ាងរលូន។',
            'បង្ហាញអត្ថបទអ្នកប្រើតាម textContent ដើម្បីការពារកម្មវិធីពីការវាយប្រហារ DOM XSS។',
          ],
          exampleTitle: 'កម្មវិធីកត់ចំណាំរហ័សអន្តរកម្មពេញលេញ (Web Storage + JSON)',
          tip: 'តែងតែបញ្ចូលអត្ថបទដែលអ្នកប្រើវាយតាម textContent ជំនួសឱ្យ innerHTML ដើម្បីកុំឱ្យតួអក្សរពិសេសក្លាយជាកូដ HTML ដែលអាចដំណើរការបាន។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើតកម្មវិធីរក្សាទុកតំណចំណាំ (Bookmark Saver) ជាមួយ <form id="bm-form"> ដែលមានប្រអប់ចំណងជើង និង URL, បញ្ជី <ul id="bm-list"> និងអនុគមន៍ loadBookmarks() និង saveBookmarks(items) ដែលប្រើ JSON.parse / JSON.stringify ជាមួយ key "codehub:bookmarks" ក្នុង try/catch។',
        hint: 'ត្រឡប់ [] ពី loadBookmarks() ពេល localStorage.getItem() ជា null ឬមានកំហុស ហើយបង្ហាញចំណងជើងតាម textContent។',
      },
      quiz: [
        {
          question:
            'តើអ្វីនឹងត្រូវបានរក្សាទុក បើអ្នកដំណើរការ localStorage.setItem("profile", { name: "Nita" }) ដោយមិនប្រើ JSON.stringify()?',
          options: [
            'កម្មវិធីរុករកបម្លែងវាទៅជា JSON ត្រឹមត្រូវដោយស្វ័យប្រវត្តិ',
            'អក្សរ "[object Object]" ព្រោះ Web Storage រក្សាទុកបានតែអក្សរ (strings)',
            'កម្មវិធីរុករកបង្ហាញកំហុស SyntaxError ភ្លាមៗ',
            'រក្សាទុកតែតម្លៃ "Nita" ប៉ុណ្ណោះ',
          ],
          answer: 1,
          explanation:
            'Web Storage បម្លែងគ្រប់តម្លៃទាំងអស់ទៅជាអក្សរ។ String({ name: "Nita" }) ផ្ដល់លទ្ធផល "[object Object]" ដូច្នេះត្រូវប្រើ JSON.stringify()។',
        },
        {
          question:
            'តើ sessionStorage ខុសពី localStorage ដូចម្ដេច ហើយអ្វីដែលមិនគួររក្សាទុកក្នុងកន្លែងទាំងពីរនេះឡើយ?',
          options: [
            'sessionStorage រក្សាទុកក្រោយបិទបើកកម្មវិធីរុករក; កុំរក្សាទុកឈ្មោះ CSS theme',
            'sessionStorage ត្រូវលុបពេលបិទ tab; កុំរក្សាទុកពាក្យសម្ងាត់ ឬព័ត៌មានសម្ងាត់ក្នុង Web Storage',
            'sessionStorage ផ្ញើទៅម៉ាស៊ីនមេគ្រប់សំណើ HTTP; កុំរក្សាទុក array',
            'sessionStorage ចែករំលែកឆ្លងគេហទំព័រផ្សេងៗ; កុំរក្សាទុកអត្ថបទធម្មតា',
          ],
          answer: 1,
          explanation:
            'sessionStorage មានអាយុកាលត្រឹម tab មួយប៉ុណ្ណោះ ចំណែក localStorage រក្សាទុកបានយូរ។ ដោយសារ JS ណាក៏អាចអាន Web Storage បាន កុំដាក់ពាក្យសម្ងាត់ ឬទិន្នន័យសម្ងាត់ក្នុងវាឡើយ។',
        },
      ],
    },
  },
]
