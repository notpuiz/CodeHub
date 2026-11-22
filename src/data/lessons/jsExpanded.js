export const jsExpanded = [
  // =========================================================================
  // 1. OPERATORS, TRUTHINESS & SWITCH STATEMENTS
  // =========================================================================
  {
    slug: 'js-operators-and-conditionals',
    level: 'beginner',
    insertAfter: 'variables-and-types',
    en: {
      title: 'Operators, Truthiness & switch Statements',
      duration: '13 min',
      summary:
        'Master strict equality, truthy and falsy evaluation, logical short-circuiting, ternary expressions, and switch statements to control every branch of your JavaScript programs.',
      objectives: [
        'Compare values safely with strict equality (===) and explain why loose equality (==) causes hidden coercion bugs.',
        'Use logical operators (&&, ||, ??) and the ternary operator (? :) for concise, bug-free defaults and conditions.',
        'Structure multi-branch logic cleanly with if/else if/else and switch statements without accidental fall-through.',
      ],
      sections: [
        {
          id: 'strict-equality-and-comparisons',
          heading: 'Strict Equality (===) vs Loose Equality (==)',
          body: [
            'Every decision in JavaScript starts with a comparison that evaluates to a boolean (true or false). JavaScript provides two equality operators: strict equality (===) and loose equality (==). Strict equality checks both the value and the data type without converting anything, so 5 === "5" is immediately false.',
            'Loose equality (==) silently converts operands to matching types before comparing—a process called type coercion. While that sounds convenient, coercion creates notorious surprises: 0 == "" is true, false == "0" is true, and [] == false is true. In modern JavaScript, default to === and !== everywhere so your conditions mean exactly what they say.',
          ],
          points: [
            'Use === and !== by default; they are predictable, self-documenting, and never coerce types.',
            'Relational operators (<, <=, >, >=) compare numbers numerically and strings lexicographically (alphabetical UTF-16 order).',
            'Checking value == null is the only widely accepted loose check, because it matches both null and undefined—though value === null || value === undefined is even clearer.',
          ],
          table: {
            headers: ['Operator', 'Name', 'Example', 'Result'],
            rows: [
              ['===', 'Strict equal', '5 === "5"', 'false (different types)'],
              ['!==', 'Strict not equal', '5 !== "5"', 'true'],
              ['==', 'Loose equal (coerces)', '0 == ""', 'true (avoid!)'],
              ['>= / <=', 'Greater / Less or equal', '18 >= 18', 'true'],
              ['&&', 'Logical AND', 'true && "ready"', '"ready"'],
              ['||', 'Logical OR', '"" || "Guest"', '"Guest"'],
              ['??', 'Nullish coalescing', '0 ?? 10', '0 (keeps 0 and "")'],
              ['? :', 'Ternary conditional', 'age >= 18 ? "Adult" : "Minor"', '"Adult" or "Minor"'],
            ],
          },
          example: {
            title: 'Comparing === vs == in Action',
            language: 'javascript',
            code: `const inputAge = '18';
const requiredAge = 18;

console.log('Loose == :', inputAge == requiredAge);   // true (coerced string -> number)
console.log('Strict ===:', inputAge === requiredAge); // false (string !== number)

// Convert explicitly first, then compare strictly
const parsedAge = Number(inputAge);
console.log('Converted ===:', parsedAge === requiredAge); // true`,
            playground: {
              html: `<div class="panel">
  <h3>Strict (===) vs Loose (==) Explorer</h3>
  <div id="rows" class="rows"></div>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; background: #f8fafc; color: #0f172a; margin: 0; }
.panel { max-width: 520px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
h3 { margin: 0 0 12px; font-size: 16px; }
.rows { display: grid; gap: 8px; }
.row { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 8px; padding: 8px 10px; border-radius: 8px; background: #f1f5f9; font-family: monospace; font-size: 13px; }
.row.head { background: #0f172a; color: #fff; font-weight: 600; }
.true { color: #15803d; font-weight: 700; }
.false { color: #b91c1c; font-weight: 700; }`,
              js: `const pairs = [
  ['5', 5],
  [0, false],
  ['', false],
  [null, undefined],
  [42, 42],
];

const rowsEl = document.getElementById('rows');
rowsEl.innerHTML =
  '<div class="row head"><span>Pair</span><span>== (Loose)</span><span>=== (Strict)</span></div>' +
  pairs
    .map(([a, b]) => {
      const loose = a == b;
      const strict = a === b;
      const label = \`\${JSON.stringify(a)} vs \${JSON.stringify(b)}\`;
      return \`<div class="row">
        <span>\${label}</span>
        <span class="\${loose}">\${loose}</span>
        <span class="\${strict}">\${strict}</span>
      </div>\`;
    })
    .join('');`,
            },
          },
          warning:
            'Never rely on == to compare user input from HTML forms! Form inputs always return strings—explicitly convert with Number(value) and compare with ===.',
        },
        {
          id: 'truthiness-logical-and-ternary',
          heading: 'Truthiness, Short-Circuiting (&&, ||, ??) & Ternary (? :)',
          body: [
            'In JavaScript, any value can sit inside an if (...) condition because the engine converts it to a boolean behind the scenes. Only eight values are falsy: false, 0, -0, 0n, "" (empty string), null, undefined, and NaN. Everything else—including empty arrays [], empty objects {}, and the string "0"—is truthy.',
            'Logical operators also short-circuit and return one of their actual operands rather than forcing true or false. AND (&&) stops at the first falsy value, OR (||) stops at the first truthy value, and Nullish Coalescing (??) falls back to the right side ONLY when the left side is null or undefined. For inline two-way choices, the ternary operator (condition ? whenTrue : whenFalse) produces a value cleanly in a single expression.',
          ],
          points: [
            'Memorize the falsy values: false, 0, -0, 0n, "", null, undefined, NaN. Every other value—even [] and {}—is truthy.',
            'Use ?? instead of || when 0, false, or "" are valid user values that should not trigger the default.',
            'Keep ternary expressions single-level; avoid nesting multiple ? : operators because deeply nested ternaries are hard to read.',
          ],
          example: {
            title: 'Defaults with ?? vs || and Clean Ternary Expressions',
            language: 'javascript',
            code: `const unreadCount = 0;
const nickname = '';

// || treats 0 and "" as falsy and overwrites them
const badgeOr = unreadCount || 1;       // 1 (bug!)
// ?? only falls back on null or undefined
const badgeNullish = unreadCount ?? 1;  // 0 (correct!)

const displayName = nickname.trim() ? nickname : 'Anonymous';
const statusLabel = badgeNullish > 0 ? \`\${badgeNullish} new\` : 'All caught up';

console.log({ badgeOr, badgeNullish, displayName, statusLabel });`,
          },
          tip: 'When chaining ?? with && or || in the same expression, JavaScript requires parentheses—such as (a || b) ?? c—to make precedence unambiguous.',
        },
        {
          id: 'conditionals-and-switch',
          heading: 'Branching with if / else if and switch Statements',
          body: [
            'Use if / else if / else when conditions involve ranges, compound checks, or different variables (such as score >= 90 or isAdmin && isVerified). Keep the happy path clear and return early inside functions to avoid deeply nested pyramids of braces.',
            'When you are matching a single expression against several exact, discrete values—like user roles, HTTP methods, or keyboard shortcuts—a switch statement communicates intent cleanly. switch always compares cases using strict equality (===), and you must end each non-empty case with break (or return) so execution does not fall through into the next case.',
          ],
          points: [
            'Always include a default branch in switch statements to handle unexpected or future values safely.',
            'You can intentionally stack empty cases (case "sat": case "sun":) to share one block of logic.',
            'If a switch only maps keys to simple strings or numbers, a plain lookup object (const labels = { ... }) is often even shorter.',
          ],
          example: {
            title: 'Plan Access Checker with switch and Grouped Cases',
            language: 'javascript',
            code: `function getPlanPerks(plan) {
  switch (plan) {
    case 'enterprise':
    case 'team':
      return 'Unlimited projects + Priority SLA + SSO';
    case 'pro':
      return 'Unlimited projects + Analytics';
    case 'free':
      return 'Up to 3 projects';
    default:
      return 'Unknown plan — contact support';
  }
}

console.log(getPlanPerks('pro'));
console.log(getPlanPerks('team'));`,
            playground: {
              html: `<div class="card">
  <h3>Membership Tier Inspector</h3>
  <label for="tier">Choose a tier:</label>
  <select id="tier">
    <option value="free">free</option>
    <option value="pro" selected>pro</option>
    <option value="team">team</option>
    <option value="enterprise">enterprise</option>
    <option value="legacy">legacy (unknown)</option>
  </select>
  <label class="check"><input id="annual" type="checkbox" checked /> Annual billing (20% off)</label>
  <div id="result" class="result"></div>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; background: #f8fafc; color: #0f172a; margin: 0; }
.card { max-width: 440px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; display: grid; gap: 12px; }
h3 { margin: 0; font-size: 16px; }
select { padding: 8px 10px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 14px; }
.check { display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer; }
.result { padding: 12px; border-radius: 10px; background: #eff6ff; border: 1px solid #bfdbfe; font-size: 14px; line-height: 1.5; }`,
              js: `const tierEl = document.getElementById('tier');
const annualEl = document.getElementById('annual');
const resultEl = document.getElementById('result');

function evaluatePlan() {
  const tier = tierEl.value;
  let monthlyPrice;
  let perks;

  switch (tier) {
    case 'enterprise':
    case 'team':
      monthlyPrice = tier === 'enterprise' ? 99 : 49;
      perks = 'Unlimited seats, audit logs, priority support';
      break;
    case 'pro':
      monthlyPrice = 19;
      perks = 'Unlimited repos, custom domains, analytics';
      break;
    case 'free':
      monthlyPrice = 0;
      perks = 'Up to 3 projects, community forum';
      break;
    default:
      monthlyPrice = null;
      perks = 'Unrecognized tier — please choose a valid plan.';
  }

  const finalPrice = monthlyPrice === null
    ? 'N/A'
    : \`$\${(annualEl.checked ? monthlyPrice * 0.8 : monthlyPrice).toFixed(2)}/mo\`;

  resultEl.innerHTML = \`<strong>Price:</strong> \${finalPrice}<br /><strong>Perks:</strong> \${perks}\`;
}

tierEl.addEventListener('change', evaluatePlan);
annualEl.addEventListener('change', evaluatePlan);
evaluatePlan();`,
            },
          },
          warning:
            'Forgetting break inside a switch case causes silent fall-through: JavaScript keeps executing every following case until it hits a break, return, or the end of the switch.',
        },
      ],
      challenge: {
        prompt:
          'Write a function calculateShipping(tier, orderTotal) that uses ?? to default orderTotal to 0, a switch statement on tier ("gold" = $0, "silver" = $4, "bronze" = $7, default = $10), and a ternary expression so any order of $50 or more gets free shipping ($0).',
        hint: 'First normalize const total = orderTotal ?? 0;, check total >= 50 with a ternary or if, and use switch (tier) with a default case.',
        language: 'javascript',
        solutionCode: `function calculateShipping(tier, orderTotal) {
  const total = orderTotal ?? 0;
  let baseFee;

  switch (tier) {
    case 'gold':
      baseFee = 0;
      break;
    case 'silver':
      baseFee = 4;
      break;
    case 'bronze':
      baseFee = 7;
      break;
    default:
      baseFee = 10;
  }

  return total >= 50 ? 0 : baseFee;
}

console.log(calculateShipping('silver', 30)); // 4
console.log(calculateShipping('bronze', 65)); // 0
console.log(calculateShipping('guest', null)); // 10`,
      },
      quiz: [
        {
          question: 'Which expression evaluates to true in JavaScript?',
          options: ['0 === false', '"" === false', 'Boolean([])', 'Boolean(NaN)'],
          answer: 2,
          explanation:
            'An empty array [] is an object, and all objects are truthy in JavaScript—so Boolean([]) is true. The strict comparisons 0 === false and "" === false are both false, and NaN is falsy.',
        },
        {
          question: 'What happens if you omit break at the end of a matching switch case?',
          options: [
            'JavaScript throws a SyntaxError immediately.',
            'Execution falls through and runs the next case block(s) until a break, return, or closing brace.',
            'JavaScript automatically stops after the matching case.',
            'Only the default block runs afterward.',
          ],
          answer: 1,
          explanation:
            'Without break or return, switch statements fall through into subsequent case bodies regardless of whether their case values match.',
        },
      ],
    },
    km: {
      title: 'ប្រមាណវិធី Truthiness និងឃ្លា switch',
      duration: '13 នាទី',
      summary:
        'ស្ទាត់ជំនាញការប្រៀបធៀបតឹងរ៉ឹង (===) តម្លៃ truthy/falsy ប្រមាណវិធីតក្កវិទ្យា (&&, ||, ??) កន្សោម ternary (? :) និងឃ្លា switch ដើម្បីគ្រប់គ្រងគ្រប់លំហូរលក្ខខណ្ឌក្នុង JavaScript។',
      objectives: [
        'ប្រៀបធៀបតម្លៃដោយសុវត្ថិភាពជាមួយ === និងពន្យល់មូលហេតុដែល == បង្កកំហុសលាក់កំបាំងពីការបម្លែងប្រភេទ។',
        'ប្រើប្រមាណវិធីតក្កវិទ្យា (&&, ||, ??) និង ternary (? :) សម្រាប់លក្ខខណ្ឌខ្លី និងតម្លៃលំនាំដើមត្រឹមត្រូវ។',
        'រៀបចំលក្ខខណ្ឌច្រើនជម្រើសយ៉ាងស្អាតដោយ if/else if/else និង switch ដោយមិនឱ្យធ្លាក់ឆ្លងករណី (fall-through)។',
      ],
      sections: [
        {
          id: 'strict-equality-and-comparisons',
          heading: 'ការប្រៀបធៀបតឹងរ៉ឹង (===) ទល់នឹងការប្រៀបធៀបធូររលុង (==)',
          body: [
            'រាល់ការសម្រេចចិត្តក្នុង JavaScript ចាប់ផ្ដើមពីការប្រៀបធៀបដែលផ្ដល់លទ្ធផល boolean (true ឬ false)។ JavaScript មានសញ្ញាស្មើពីរប្រភេទគឺ === (តឹងរ៉ឹង) និង == (ធូររលុង)។ សញ្ញា === ពិនិត្យទាំងតម្លៃ និងប្រភេទទិន្នន័យដោយមិនបម្លែងអ្វីទាំងអស់ ដូច្នេះ 5 === "5" ត្រឡប់ false ភ្លាម។',
            'ចំណែក == លួចបម្លែងប្រភេទទិន្នន័យឱ្យដូចគ្នាមុនពេលប្រៀបធៀប (type coercion) ដែលបង្កការភ្ញាក់ផ្អើលជាញឹកញាប់ ដូចជា 0 == "" ជា true និង false == "0" ជា true។ ក្នុង JavaScript ទំនើប សូមប្រើ === និង !== ជានិច្ចដើម្បីឱ្យលក្ខខណ្ឌច្បាស់លាស់។',
          ],
          points: [
            'ប្រើ === និង !== ជាលំនាំដើម ព្រោះវាទាយទុកជាមុនបាន និងមិនបម្លែងប្រភេទដោយស្ងាត់ៗទេ។',
            'សញ្ញា <, <=, >, >= ប្រៀបធៀបលេខតាមតម្លៃគណិត និងអត្ថបទតាមលំដាប់តួអក្សរ UTF-16។',
            'value == null ជាករណីតែមួយគត់ដែលគេទទួលស្គាល់ខ្លះ ព្រោះវាផ្គូផ្គងទាំង null និង undefined តែការសរសេរផ្ទាល់កាន់តែច្បាស់។',
          ],
          table: {
            headers: ['ប្រមាណវិធី', 'ឈ្មោះ', 'ឧទាហរណ៍', 'លទ្ធផល'],
            rows: [
              ['===', 'ស្មើតឹងរ៉ឹង', '5 === "5"', 'false (ខុសប្រភេទ)'],
              ['!==', 'មិនស្មើតឹងរ៉ឹង', '5 !== "5"', 'true'],
              ['==', 'ស្មើធូររលុង (បម្លែងប្រភេទ)', '0 == ""', 'true (គួរជៀសវាង!)'],
              ['>= / <=', 'ធំជាង ឬ តូចជាង ឬ ស្មើ', '18 >= 18', 'true'],
              ['&&', 'តក្កវិទ្យា AND', 'true && "ready"', '"ready"'],
              ['||', 'តក្កវិទ្យា OR', '"" || "Guest"', '"Guest"'],
              ['??', 'Nullish coalescing', '0 ?? 10', '0 (រក្សា 0 និង "")'],
              ['? :', 'Ternary លក្ខខណ្ឌខ្លី', 'age >= 18 ? "Adult" : "Minor"', '"Adult" ឬ "Minor"'],
            ],
          },
          exampleTitle: 'ការប្រៀបធៀប === ទល់នឹង == ជាក់ស្ដែង',
          warning:
            'កុំពឹងលើ == ដើម្បីប្រៀបធៀបទិន្នន័យពីទម្រង់ HTML ព្រោះ input តែងត្រឡប់ជា string—សូមបម្លែងដោយ Number(value) រួចប្រៀបធៀបជាមួយ ===។',
        },
        {
          id: 'truthiness-logical-and-ternary',
          heading: 'Truthiness, ការឈប់ខ្លី (&&, ||, ??) និង Ternary (? :)',
          body: [
            'ក្នុង JavaScript តម្លៃណាមួយក៏អាចដាក់ក្នុង if (...) បានដែរ ព្រោះម៉ាស៊ីនបម្លែងវាជា boolean ដោយស្វ័យប្រវត្តិ។ មានតម្លៃតែប្រាំបីប៉ុណ្ណោះដែលជា falsy៖ false, 0, -0, 0n, "", null, undefined និង NaN។ ក្រៅពីនេះទាំងអស់—រួមទាំង [] ទទេ, {} ទទេ និងអត្ថបទ "0"—សុទ្ធតែជា truthy។',
            'ប្រមាណវិធីតក្កវិទ្យាដំណើរការបែប short-circuit ហើយត្រឡប់តម្លៃដើមរបស់អង្គប្រមាណវិធី៖ && ឈប់ត្រឹមតម្លៃ falsy ដំបូង, || ឈប់ត្រឹមតម្លៃ truthy ដំបូង និង ?? យកតម្លៃខាងស្ដាំលុះត្រាតែខាងឆ្វេងជា null ឬ undefined។ ចំណែក ternary (condition ? whenTrue : whenFalse) ជួយជ្រើសរើសតម្លៃពីរជម្រើសក្នុងមួយបន្ទាត់។',
          ],
          points: [
            'ចងចាំតម្លៃ falsy ទាំង ៨៖ false, 0, -0, 0n, "", null, undefined, NaN។ ក្រៅពីនោះសុទ្ធតែ truthy។',
            'ប្រើ ?? ជំនួស || នៅពេល 0, false ឬ "" ជាតម្លៃត្រឹមត្រូវដែលមិនត្រូវជំនួសដោយតម្លៃលំនាំដើម។',
            'រក្សា ternary ឱ្យមានតែមួយកម្រិត ជៀសវាងការត្រួតជាន់គ្នាច្រើនជាន់ដែលពិបាកអាន។',
          ],
          exampleTitle: 'តម្លៃលំនាំដើមជាមួយ ?? ទល់នឹង || និង Ternary ស្អាត',
          tip: 'ពេលប្រើ ?? ជាមួយ && ឬ || ក្នុងកន្សោមតែមួយ JavaScript តម្រូវឱ្យដាក់វង់ក្រចក ដូចជា (a || b) ?? c ដើម្បីកំណត់លំដាប់អាទិភាពឱ្យច្បាស់។',
        },
        {
          id: 'conditionals-and-switch',
          heading: 'ការបំបែកលំហូរដោយ if / else if និងឃ្លា switch',
          body: [
            'ប្រើ if / else if / else នៅពេលលក្ខខណ្ឌពាក់ព័ន្ធនឹងជួរលេខ ឬអថេរច្រើន (ដូចជា score >= 90 ឬ isAdmin && isVerified)។ ព្យាយាមត្រឡប់លទ្ធផលមុន (early return) ក្នុងអនុគមន៍ដើម្បីកុំឱ្យកូដត្រួតជាន់ជ្រៅ។',
            'នៅពេលអ្នកផ្ទៀងផ្ទាត់តម្លៃតែមួយជាមួយជម្រើសជាក់លាក់ច្រើន—ដូចជាតួនាទីអ្នកប្រើ ឬកម្រិតកញ្ចប់សេវា—ឃ្លា switch ជួយឱ្យកូដអានងាយ។ switch តែងប្រៀបធៀបដោយ === ហើយអ្នកត្រូវបញ្ចប់ case នីមួយៗដោយ break (ឬ return) ដើម្បីកុំឱ្យវារត់ឆ្លងទៅ case បន្ទាប់។',
          ],
          points: [
            'ដាក់ផ្នែក default ជានិច្ចក្នុង switch ដើម្បីដោះស្រាយតម្លៃមិនរំពឹងទុកដោយសុវត្ថិភាព។',
            'អ្នកអាចដាក់ case ទទេតម្រៀបគ្នា (case "sat": case "sun":) ដើម្បីចែករំលែកប្លុកកូដតែមួយ។',
            'បើ switch គ្រាន់តែបម្លែងពាក្យគន្លឹះទៅជាអត្ថបទខ្លី Object ផ្គូផ្គង (lookup table) អាចខ្លីជាងទៀត។',
          ],
          exampleTitle: 'កម្មវិធីពិនិត្យកញ្ចប់សេវាជាមួយ switch និងការចងក្រុម case',
          warning:
            'ការភ្លេចដាក់ break ក្នុង case នៃ switch នឹងបង្ក fall-through ដោយស្ងាត់ៗ៖ JavaScript នឹងបន្តដំណើរការ case ខាងក្រោមទាំងអស់រហូតជួប break, return ឬចប់ switch។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ calculateShipping(tier, orderTotal) ដែលប្រើ ?? កំណត់តម្លៃលំនាំដើមឱ្យ orderTotal ជា 0, ប្រើ switch លើ tier ("gold" = $0, "silver" = $4, "bronze" = $7, default = $10) និងប្រើ ternary ដើម្បីឱ្យការបញ្ជាទិញចាប់ពី $50 ឡើងទៅដឹកជញ្ជូនឥតគិតថ្លៃ ($0)។',
        hint: 'ដំបូងសរសេរ const total = orderTotal ?? 0; បន្ទាប់មកប្រើ switch (tier) រកថ្លៃមូលដ្ឋាន រួចប្រើ total >= 50 ? 0 : baseFee។',
      },
      quiz: [
        {
          question: 'តើកន្សោមណាមួយផ្ដល់លទ្ធផលជា true ក្នុង JavaScript?',
          options: ['0 === false', '"" === false', 'Boolean([])', 'Boolean(NaN)'],
          answer: 2,
          explanation:
            'Array ទទេ [] គឺជា object ហើយគ្រប់ object ទាំងអស់ជា truthy ដូច្នេះ Boolean([]) ស្មើ true។ ចំណែក 0 === false, "" === false ជា false និង NaN ជា falsy។',
        },
        {
          question:
            'តើមានអ្វីកើតឡើងប្រសិនបើអ្នកភ្លេចសរសេរ break នៅចុងបញ្ចប់នៃ case ដែលត្រូវគ្នាក្នុង switch?',
          options: [
            'JavaScript បង្ហាញកំហុស SyntaxError ភ្លាមៗ។',
            'កូដនឹងធ្លាក់ឆ្លង (fall through) ហើយរត់ប្លុក case បន្ទាប់ៗរហូតជួប break, return ឬចប់ switch។',
            'JavaScript ឈប់ដោយស្វ័យប្រវត្តិក្រោយចប់ case នោះ។',
            'មានតែប្លុក default ប៉ុណ្ណោះដែលរត់បន្ទាប់។',
          ],
          answer: 1,
          explanation:
            'បើគ្មាន break ឬ return ទេ ឃ្លា switch នឹងបន្តដំណើរការប្លុក case ខាងក្រោមទាំងអស់ ទោះតម្លៃ case មិនត្រូវគ្នាក៏ដោយ។',
        },
      ],
    },
  },

  // =========================================================================
  // 2. LOOPS & ITERATION PATTERNS
  // =========================================================================
  {
    slug: 'js-loops-and-iteration',
    level: 'beginner',
    insertAfter: 'js-operators-and-conditionals',
    en: {
      title: 'Loops & Iteration Patterns',
      duration: '14 min',
      summary:
        'Repeat work cleanly and predictably with for, while, do...while, for...of, and for...in loops—and control iteration flow with break and continue.',
      objectives: [
        'Write classic counter-based for loops and condition-driven while / do...while loops without creating infinite loops.',
        'Choose for...of for arrays and strings versus for...in for plain object keys.',
        'Control loop execution cleanly using continue to skip items and break to exit early.',
      ],
      sections: [
        {
          id: 'for-and-while-loops',
          heading: 'Counter Loops (for) & Condition Loops (while / do...while)',
          body: [
            'Loops let your program repeat an action dozens or millions of times without duplicating code. A classic for loop combines three parts in one header: initialization (let i = 0), a keep-going condition (i < 5), and an update step (i++). It is ideal whenever you know the exact count or need the numeric index.',
            'When you do not know ahead of time how many repetitions you need—such as rolling dice until you hit a 6 or consuming items from a queue—use a while loop, which keeps running as long as its condition stays truthy. A do...while loop works the same way, except it checks the condition at the end so the body always runs at least once.',
          ],
          points: [
            'Declare the for-loop counter with let (never var) so each iteration gets its own block-scoped index.',
            'Use while when the stop condition depends on runtime state rather than a fixed counter.',
            'Prefer do...while only when the body genuinely must execute at least once before testing the condition.',
          ],
          table: {
            headers: ['Loop Type', 'Best For', 'Yields / Tracks', 'Key Note'],
            rows: [
              [
                'for (let i = 0; ...)',
                'Fixed counts, numeric indices',
                'Index number (i)',
                'Full control over start, step, direction',
              ],
              [
                'while (cond)',
                'Unknown iteration count',
                'Condition state',
                'May run 0 times if condition starts false',
              ],
              [
                'do { ... } while (cond)',
                'Run at least once',
                'Condition state',
                'Checks condition after the first pass',
              ],
              [
                'for (const x of iter)',
                'Arrays, strings, Maps, Sets',
                'Actual values',
                'Cleanest loop for ordered collections',
              ],
              [
                'for (const k in obj)',
                'Plain object property names',
                'String keys',
                'Avoid on arrays; includes inherited keys',
              ],
            ],
          },
          example: {
            title: 'Summing Ranges with for and Retrying with while',
            language: 'javascript',
            code: `// 1. Classic for loop: sum even numbers from 2 to 10
let evenSum = 0;
for (let n = 2; n <= 10; n += 2) {
  evenSum += n;
}

// 2. while loop: double a value until it exceeds 100
let value = 3;
let steps = 0;
while (value <= 100) {
  value *= 2;
  steps++;
}

console.log({ evenSum, value, steps });`,
            playground: {
              html: `<div class="panel">
  <h3>Interactive Step & Sum Loop</h3>
  <div class="controls">
    <label>Limit: <input id="limit" type="number" value="10" min="1" max="50" /></label>
    <label>Step: <input id="step" type="number" value="2" min="1" max="10" /></label>
    <button id="run">Run Loop</button>
  </div>
  <pre id="out"></pre>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; background: #f8fafc; color: #0f172a; margin: 0; }
.panel { max-width: 480px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
h3 { margin: 0 0 12px; font-size: 16px; }
.controls { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 12px; font-size: 14px; }
input { width: 62px; padding: 6px; border: 1px solid #cbd5e1; border-radius: 6px; }
button { padding: 7px 14px; border: none; border-radius: 8px; background: #2563eb; color: #fff; font-weight: 600; cursor: pointer; }
pre { margin: 0; padding: 12px; background: #0f172a; color: #e2e8f0; border-radius: 8px; font-size: 13px; line-height: 1.5; }`,
              js: `const limitEl = document.getElementById('limit');
const stepEl = document.getElementById('step');
const outEl = document.getElementById('out');

function runLoop() {
  const limit = Math.min(50, Math.max(1, Number(limitEl.value) || 10));
  const step = Math.min(10, Math.max(1, Number(stepEl.value) || 1));
  const visited = [];
  let sum = 0;

  for (let i = step; i <= limit; i += step) {
    visited.push(i);
    sum += i;
  }

  outEl.textContent =
    \`Visited (\${visited.length} steps): \${visited.join(' + ')}\\n\` +
    \`Total sum: \${sum}\`;
}

document.getElementById('run').addEventListener('click', runLoop);
runLoop();`,
            },
          },
          warning:
            'Every while loop must move closer to making its condition false! If you forget to update the loop variable (or write i-- instead of i++), you create an infinite loop that freezes the browser tab.',
        },
        {
          id: 'for-of-vs-for-in',
          heading: 'for...of vs for...in: Iterating Values vs Keys',
          body: [
            'Modern JavaScript introduced for...of as the cleanest way to walk through any iterable collection: arrays, strings, Maps, Sets, and NodeLists. Each pass gives you the value directly—no manual index counter or array[i] boilerplate—and you can still use break, continue, and await inside it.',
            'for...in looks deceptively similar, but it iterates over enumerable string property names (keys) of an object, including inherited properties on the prototype chain. Because array indices come back as strings ("0", "1") and iteration order can include custom properties, never use for...in on arrays—use for...of for arrays and Object.entries(obj) with for...of for objects.',
          ],
          points: [
            'Use for (const item of items) when you want each element of an array or character of a string.',
            'Need both the index and value in a for...of loop? Iterate over items.entries(): for (const [index, item] of items.entries()).',
            'For objects, for (const [key, val] of Object.entries(obj)) avoids prototype pitfalls that for...in can hit.',
          ],
          example: {
            title: 'Iterating Arrays with for...of and Objects with Object.entries()',
            language: 'javascript',
            code: `const languages = ['HTML', 'CSS', 'JavaScript'];

for (const [index, lang] of languages.entries()) {
  console.log(\`\${index + 1}. \${lang}\`);
}

const scores = { dara: 92, sophea: 88, vanna: 95 };

for (const key in scores) {
  if (Object.hasOwn(scores, key)) {
    console.log(\`\${key}: \${scores[key]}\`);
  }
}`,
          },
          tip: 'When iterating an object with for...in, guard with Object.hasOwn(obj, key) or simply switch to for (const [k, v] of Object.entries(obj)) to read only the object’s own keys.',
        },
        {
          id: 'break-continue-and-loop-control',
          heading: 'Controlling Flow with break, continue & Nested Loops',
          body: [
            'Sometimes you do not want to process every single element in a loop. The continue keyword skips the rest of the current iteration and jumps straight to the next pass—great for filtering out invalid, empty, or inactive items without wrapping your whole loop body in an if block.',
            'The break keyword exits the innermost loop immediately—essential when you are searching for the first matching record or stopping on a critical error. When you work with grids or multiplication tables using nested loops, remember that break only exits the inner loop unless you extract the search into a function and use return.',
          ],
          points: [
            'Use continue early at the top of a loop body as a guard clause to keep logic flat and readable.',
            'Use break to stop scanning as soon as you find your match—saving wasted CPU work on large lists.',
            'Inside a function, return exits all nested loops at once, which is usually cleaner than labeled breaks.',
          ],
          example: {
            title: 'Scanning Inventory with continue and break',
            language: 'javascript',
            code: `const products = [
  { name: 'USB-C Hub', stock: 0, price: 25 },
  { name: 'Mechanical Keyboard', stock: 4, price: 79 },
  { name: 'Monitor Stand', stock: 2, price: 45 },
  { name: 'Webcam HD', stock: 5, price: 60 },
];

let firstAffordable = null;

for (const item of products) {
  if (item.stock === 0) continue; // Skip out-of-stock items
  if (item.price <= 50) {
    firstAffordable = item.name;
    break; // Found our match — stop scanning!
  }
}

console.log('Picked:', firstAffordable); // "Monitor Stand"`,
            playground: {
              html: `<div class="panel">
  <h3>Inventory Scanner (continue &amp; break)</h3>
  <label>Max budget ($): <input id="budget" type="number" value="50" min="10" max="150" /></label>
  <button id="scan">Scan Products</button>
  <pre id="log"></pre>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; background: #f8fafc; color: #0f172a; margin: 0; }
.panel { max-width: 500px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; display: grid; gap: 10px; }
h3 { margin: 0; font-size: 16px; }
input { width: 70px; padding: 6px; border: 1px solid #cbd5e1; border-radius: 6px; }
button { width: fit-content; padding: 7px 14px; border: none; border-radius: 8px; background: #0f172a; color: #fff; font-weight: 600; cursor: pointer; }
pre { margin: 0; padding: 12px; background: #0f172a; color: #e2e8f0; border-radius: 8px; font-size: 12.5px; line-height: 1.6; white-space: pre-wrap; }`,
              js: `const products = [
  { name: 'USB-C Hub', stock: 0, price: 25 },
  { name: 'Mechanical Keyboard', stock: 4, price: 79 },
  { name: 'Monitor Stand', stock: 2, price: 45 },
  { name: 'Webcam HD', stock: 5, price: 60 },
];

const budgetEl = document.getElementById('budget');
const logEl = document.getElementById('log');

function scan() {
  const maxBudget = Number(budgetEl.value) || 50;
  const trace = [];
  let match = null;

  for (const item of products) {
    if (item.stock === 0) {
      trace.push(\`SKIP (continue): \${item.name} — out of stock\`);
      continue;
    }
    trace.push(\`CHECK: \${item.name} ($\${item.price})\`);
    if (item.price <= maxBudget) {
      match = item.name;
      trace.push(\`MATCH (break): Picked \${item.name}!\`);
      break;
    }
  }

  if (!match) trace.push('No in-stock item fits that budget.');
  logEl.textContent = trace.join('\\n');
}

document.getElementById('scan').addEventListener('click', scan);
scan();`,
            },
          },
          tip: 'Array methods like .forEach() cannot be stopped with break or continue—whenever you need early exit, a for...of loop is the right tool.',
        },
      ],
      challenge: {
        prompt:
          'Write a function averageValidTemps(readings) that loops through an array using for...of. Skip any null or undefined entries with continue, stop scanning immediately with break if a sensor error code (-999) appears, and return the average of the valid readings processed before stopping (or 0 if none).',
        hint: 'Track let sum = 0; let count = 0;. Inside for (const t of readings), check if (t === -999) break; and if (t == null) continue;.',
        language: 'javascript',
        solutionCode: `function averageValidTemps(readings) {
  let sum = 0;
  let count = 0;

  for (const temp of readings) {
    if (temp === -999) break;
    if (temp === null || temp === undefined) continue;
    sum += temp;
    count++;
  }

  return count === 0 ? 0 : sum / count;
}

console.log(averageValidTemps([28, null, 32, 30, -999, 100])); // 30`,
      },
      quiz: [
        {
          question:
            'Which loop is best for iterating over the values of an array in modern JavaScript?',
          options: ['for...in', 'for...of', 'switch...case', 'do...in'],
          answer: 1,
          explanation:
            'for...of iterates directly over iterable values (arrays, strings, Maps, Sets). for...in iterates over string property keys and is meant for plain objects, not arrays.',
        },
        {
          question: 'What is the difference between continue and break inside a loop?',
          options: [
            'continue exits the entire function; break exits only the loop.',
            'continue skips only the current iteration and moves to the next pass; break exits the loop immediately.',
            'break skips one iteration; continue terminates the program.',
            'They behave identically inside for...of loops.',
          ],
          answer: 1,
          explanation:
            'continue jumps to the next iteration of the loop, whereas break immediately terminates the innermost enclosing loop.',
        },
      ],
    },
    km: {
      title: 'រង្វិលជុំ (Loops) និងលំនាំការធ្វើឡើងវិញ',
      duration: '14 នាទី',
      summary:
        'អនុវត្តការងារដដែលៗយ៉ាងស្អាត និងមានប្រសិទ្ធភាពដោយរង្វិលជុំ for, while, do...while, for...of និង for...in ព្រមទាំងគ្រប់គ្រងលំហូរដោយ break និង continue។',
      objectives: [
        'សរសេររង្វិលជុំ for តាមលេខរៀង និងរង្វិលជុំ while / do...while តាមលក្ខខណ្ឌ ដោយមិនបង្ករង្វិលជុំគ្មានទីបញ្ចប់។',
        'ជ្រើសរើស for...of សម្រាប់ array និង string ទល់នឹង for...in សម្រាប់ឈ្មោះគន្លឹះ (keys) នៃ object។',
        'គ្រប់គ្រងដំណើរការរង្វិលជុំយ៉ាងស្អាតដោយប្រើ continue ដើម្បីរំលងធាតុ និង break ដើម្បីចាកចេញភ្លាម។',
      ],
      sections: [
        {
          id: 'for-and-while-loops',
          heading: 'រង្វិលជុំរាប់លេខ (for) និងរង្វិលជុំលក្ខខណ្ឌ (while / do...while)',
          body: [
            'រង្វិលជុំអនុញ្ញាតឱ្យកម្មវិធីធ្វើសកម្មភាពដដែលៗរាប់សិប ឬរាប់លានដងដោយមិនបាច់ចម្លងកូដ។ រង្វិលជុំ for បែបបុរាណរួមបញ្ចូលបីផ្នែកក្នុងក្បាលតែមួយ៖ ការកំណត់តម្លៃដំបូង (let i = 0), លក្ខខណ្ឌបន្ត (i < 5) និងជំហានបន្ទាប់ (i++) ដែលស័ក្ដិសមពេលអ្នកដឹងចំនួនជុំច្បាស់ ឬត្រូវការលេខសន្ទស្សន៍។',
            'នៅពេលអ្នកមិនដឹងជាមុនថាត្រូវរត់ប៉ុន្មានដង—ដូចជាការបោះគ្រាប់ឡុកឡាក់រហូតចេញលេខ ៦—សូមប្រើ while ដែលបន្តរត់ដរាបណាលក្ខខណ្ឌនៅតែ truthy។ ចំណែក do...while ពិនិត្យលក្ខខណ្ឌនៅចុងបញ្ចប់ ដូច្នេះប្លុកកូដតែងតែរត់យ៉ាងហោចណាស់ម្ដងជានិច្ច។',
          ],
          points: [
            'ប្រកាសអថេររាប់ជុំក្នុង for ដោយ let (កុំប្រើ var) ដើម្បីឱ្យជុំនីមួយៗមានដែនកំណត់ឯករាជ្យ។',
            'ប្រើ while នៅពេលលក្ខខណ្ឌឈប់អាស្រ័យលើស្ថានភាពពេលដំណើរការ មិនមែនចំនួនជុំថេរ។',
            'ប្រើ do...while តែពេលកូដខាងក្នុងពិតជាត្រូវដំណើរការយ៉ាងហោចណាស់ម្ដងមុនពិនិត្យលក្ខខណ្ឌ។',
          ],
          table: {
            headers: ['ប្រភេទរង្វិលជុំ', 'ស័ក្ដិសមសម្រាប់', 'ផ្ដល់តម្លៃ / តាមដាន', 'ចំណុចសំខាន់'],
            rows: [
              [
                'for (let i = 0; ...)',
                'ចំនួនជុំជាក់លាក់, លេខសន្ទស្សន៍',
                'លេខសន្ទស្សន៍ (i)',
                'គ្រប់គ្រងចំណុចចាប់ផ្ដើម ជំហាន និងទិសដៅពេញលេញ',
              ],
              [
                'while (cond)',
                'មិនដឹងចំនួនជុំជាមុន',
                'ស្ថានភាពលក្ខខណ្ឌ',
                'អាចរត់ 0 ដងបើលក្ខខណ្ឌចាប់ផ្ដើមជា false',
              ],
              [
                'do { ... } while (cond)',
                'ត្រូវរត់យ៉ាងហោច ១ ដង',
                'ស្ថានភាពលក្ខខណ្ឌ',
                'ពិនិត្យលក្ខខណ្ឌក្រោយជុំទីមួយ',
              ],
              [
                'for (const x of iter)',
                'Arrays, strings, Maps, Sets',
                'តម្លៃផ្ទាល់',
                'រង្វិលជុំស្អាតបំផុតសម្រាប់បណ្ដុំទិន្នន័យមានលំដាប់',
              ],
              [
                'for (const k in obj)',
                'ឈ្មោះលក្ខណៈសម្បត្តិ object',
                'ឈ្មោះគន្លឹះ (string)',
                'កុំប្រើលើ array; អាចរាប់បញ្ចូលគន្លឹះស្នងមរតក',
              ],
            ],
          },
          exampleTitle: 'ការបូកជួរលេខដោយ for និងការគុណឡើងដោយ while',
          warning:
            'រាល់រង្វិលជុំ while ត្រូវតែខិតជិតទៅរកលក្ខខណ្ឌ false! បើអ្នកភ្លេចកែតម្លៃអថេរលក្ខខណ្ឌ វានឹងបង្ករង្វិលជុំគ្មានទីបញ្ចប់ (infinite loop) ធ្វើឱ្យផ្ទាំងកម្មវិធីគាំង។',
        },
        {
          id: 'for-of-vs-for-in',
          heading: 'for...of ទល់នឹង for...in៖ ការអានតម្លៃ ទល់នឹង គន្លឹះ',
          body: [
            'JavaScript ទំនើបនាំមកនូវ for...of ជាវិធីស្អាតបំផុតដើម្បីឆ្លងកាត់គ្រប់បណ្ដុំ iterable ដូចជា array, string, Map, Set និង NodeList។ ជុំនីមួយៗផ្ដល់តម្លៃផ្ទាល់ដោយមិនបាច់សរសេរ array[i] ហើយអាចប្រើ break, continue និង await បានពេញលេញ។',
            'for...in មើលទៅស្រដៀងគ្នា ប៉ុន្តែវាឆ្លងកាត់ឈ្មោះគន្លឹះ (string keys) របស់ object រួមទាំងគន្លឹះស្នងពី prototype ផង។ ដោយសារសន្ទស្សន៍ array ត្រូវបានផ្ដល់ជា string ("0", "1") សូមកុំប្រើ for...in លើ array—ប្រើ for...of សម្រាប់ array និង Object.entries(obj) ជាមួយ for...of សម្រាប់ object។',
          ],
          points: [
            'ប្រើ for (const item of items) ពេលអ្នកចង់បានធាតុនីមួយៗនៃ array ឬតួអក្សរនៃ string។',
            'ត្រូវការទាំងសន្ទស្សន៍ និងតម្លៃ? ប្រើ items.entries()៖ for (const [index, item] of items.entries())។',
            'សម្រាប់ object ការប្រើ for (const [key, val] of Object.entries(obj)) ជៀសវាងបញ្ហា prototype របស់ for...in។',
          ],
          exampleTitle: 'ការឆ្លងកាត់ Array ដោយ for...of និង Object ដោយ Object.entries()',
          tip: 'ពេលប្រើ for...in លើ object សូមពិនិត្យដោយ Object.hasOwn(obj, key) ឬប្ដូរទៅប្រើ Object.entries(obj) ដើម្បីអានតែគន្លឹះផ្ទាល់របស់ object ប៉ុណ្ណោះ។',
        },
        {
          id: 'break-continue-and-loop-control',
          heading: 'ការគ្រប់គ្រងលំហូរដោយ break, continue និងរង្វិលជុំត្រួតជាន់',
          body: [
            'ពេលខ្លះអ្នកមិនចង់ដំណើរការគ្រប់ធាតុទាំងអស់ក្នុងរង្វិលជុំទេ។ ពាក្យគន្លឹះ continue រំលងផ្នែកដែលនៅសល់នៃជុំបច្ចុប្បន្ន រួចលោតទៅជុំបន្ទាប់ភ្លាម—ល្អណាស់សម្រាប់រំលងទិន្នន័យទទេ ឬទំនិញអស់ស្តុក ដោយមិនបាច់រុំកូដទាំងមូលក្នុង if ជ្រៅ។',
            'ចំណែក break បញ្ឈប់រង្វិលជុំដែលនៅខាងក្នុងបំផុតភ្លាមៗ—សំខាន់ពេលស្វែងរកធាតុត្រូវគ្នាដំបូង ឬឈប់ពេលជួបកំហុសធ្ងន់ធ្ងរ។ ក្នុងរង្វិលជុំត្រួតជាន់ (nested loops) សូមចាំថា break ចាកចេញតែរង្វិលជុំខាងក្នុងប៉ុណ្ណោះ លុះត្រាអ្នកដាក់ក្នុងអនុគមន៍ហើយប្រើ return។',
          ],
          points: [
            'ប្រើ continue នៅផ្នែកខាងលើនៃរង្វិលជុំជាលក្ខខណ្ឌការពារ (guard clause) ដើម្បីឱ្យកូដរាបស្មើ និងងាយអាន។',
            'ប្រើ break ដើម្បីឈប់ស្វែងរកភ្លាមពេលរកឃើញគោលដៅ ជួយសន្សំពេលវេលា CPU លើបញ្ជីធំ។',
            'ក្នុងអនុគមន៍ ការប្រើ return អាចចាកចេញពីរង្វិលជុំត្រួតជាន់ទាំងអស់ក្នុងពេលតែមួយ។',
          ],
          exampleTitle: 'ការស្កេនស្តុកទំនិញជាមួយ continue និង break',
          tip: 'វិធី .forEach() របស់ array មិនអាចបញ្ឈប់ដោយ break ឬ continue បានទេ—រាល់ពេលត្រូវការចាកចេញមុន សូមប្រើរង្វិលជុំ for...of។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ averageValidTemps(readings) ដែលប្រើ for...of ឆ្លងកាត់ array សីតុណ្ហភាព។ រំលងតម្លៃ null ឬ undefined ដោយ continue, ឈប់ស្កេនភ្លាមដោយ break ប្រសិនបើជួបកូដកំហុសឧបករណ៍ (-999) រួចត្រឡប់មធ្យមភាគនៃតម្លៃត្រឹមត្រូវមុនពេលឈប់ (ឬ 0 បើគ្មាន)។',
        hint: 'បង្កើត let sum = 0; let count = 0;។ ក្នុង for (const temp of readings) ពិនិត្យ if (temp === -999) break; និង if (temp == null) continue;។',
      },
      quiz: [
        {
          question:
            'តើរង្វិលជុំណាមួយល្អបំផុតសម្រាប់អានតម្លៃធាតុនីមួយៗនៃ array ក្នុង JavaScript ទំនើប?',
          options: ['for...in', 'for...of', 'switch...case', 'do...in'],
          answer: 1,
          explanation:
            'for...of អានតម្លៃផ្ទាល់ពីបណ្ដុំ iterable (arrays, strings, Maps, Sets)។ ចំណែក for...in អានឈ្មោះគន្លឹះ (keys) ហើយស័ក្ដិសមសម្រាប់ object មិនមែន array ទេ។',
        },
        {
          question: 'តើ continue និង break ខុសគ្នាដូចម្ដេចនៅក្នុងរង្វិលជុំ?',
          options: [
            'continue ចាកចេញពីអនុគមន៍ទាំងមូល; break ចាកចេញតែពីរង្វិលជុំ។',
            'continue រំលងតែជុំបច្ចុប្បន្នហើយបន្តទៅជុំបន្ទាប់; break បញ្ឈប់រង្វិលជុំភ្លាមៗ។',
            'break រំលងមួយជុំ; continue បិទកម្មវិធី។',
            'ពួកវាដំណើរការដូចគ្នាទាំងស្រុងក្នុង for...of។',
          ],
          answer: 1,
          explanation:
            'continue លោតទៅជុំបន្ទាប់នៃរង្វិលជុំ ចំណែក break បញ្ឈប់រង្វិលជុំខាងក្នុងបំផុតភ្លាមៗ។',
        },
      ],
    },
  },

  // =========================================================================
  // 3. STRINGS, NUMBERS, MATH & DATES
  // =========================================================================
  {
    slug: 'js-strings-numbers-math',
    level: 'beginner',
    insertAfter: 'functions-and-scope',
    en: {
      title: 'Strings, Numbers, Math & Dates',
      duration: '14 min',
      summary:
        'Transform text with modern string methods, avoid floating-point traps, generate random numbers with Math, and format international dates and currencies with Intl.',
      objectives: [
        'Clean, search, slice, and split strings cleanly using immutable built-in String methods.',
        'Format decimal numbers with .toFixed(), validate with Number.isNaN(), and compute ranges with Math.random() and Math.floor().',
        'Create Date instances safely and format localized dates and currencies with Intl.DateTimeFormat and Intl.NumberFormat.',
      ],
      sections: [
        {
          id: 'string-methods-and-parsing',
          heading: 'Essential String Methods & Immutability',
          body: [
            'Strings in JavaScript are immutable primitives—methods like .trim(), .toLowerCase(), .slice(), and .replaceAll() never alter the original string; they always return a brand-new string. Because they return strings, you can chain them cleanly to normalize user input, build URL slugs, or parse CSV lines.',
            'Modern JavaScript also makes searching and slicing readable: use .includes(), .startsWith(), and .endsWith() for boolean checks instead of cryptic .indexOf(...) !== -1 comparisons, and use .slice(start, end) with negative indices (like str.slice(-4)) to grab characters from the end.',
          ],
          points: [
            'Use .split(",") to turn a delimited string into an array, and .join("-") to reassemble it.',
            'Use .padStart(2, "0") to format clock digits like "09:05" or invoice numbers like "INV-0042".',
            'Template literals (`Hello, ${name}!`) support multi-line text and embedded expressions without awkward + concatenation.',
          ],
          table: {
            headers: ['Method', 'Example', 'Returns'],
            rows: [
              ['.trim()', '"  hi  ".trim()', '"hi" (removes outer whitespace)'],
              [
                '.slice(start, end)',
                '"JavaScript".slice(0, 4)',
                '"Java" (negative counts from end)',
              ],
              ['.includes(sub)', '"codehub.dev".includes("hub")', 'true'],
              ['.split(sep)', '"a,b,c".split(",")', '["a", "b", "c"]'],
              ['.replaceAll(a, b)', '"a b c".replaceAll(" ", "-")', '"a-b-c"'],
              ['.padStart(len, ch)', '"7".padStart(3, "0")', '"007"'],
            ],
          },
          example: {
            title: 'Normalizing User Input into a Clean URL Slug',
            language: 'javascript',
            code: `function toSlug(title) {
  return title
    .trim()
    .toLowerCase()
    .replaceAll(' ', '-')
    .slice(0, 40);
}

const raw = '  Learn JavaScript Strings Today  ';
console.log(toSlug(raw));              // "learn-javascript-strings-today"
console.log(raw.includes('Strings'));  // true
console.log('a,b,c'.split(','));       // ["a", "b", "c"]`,
            playground: {
              html: `<div class="panel">
  <h3>Live URL Slug &amp; Word Inspector</h3>
  <input id="title" type="text" value="  Master JS Strings & Math!  " />
  <pre id="out"></pre>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; background: #f8fafc; color: #0f172a; margin: 0; }
.panel { max-width: 480px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; display: grid; gap: 10px; }
h3 { margin: 0; font-size: 16px; }
input { padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; }
pre { margin: 0; padding: 12px; background: #0f172a; color: #e2e8f0; border-radius: 8px; font-size: 13px; line-height: 1.6; }`,
              js: `const inputEl = document.getElementById('title');
const outEl = document.getElementById('out');

function update() {
  const cleaned = inputEl.value.trim();
  const words = cleaned ? cleaned.split(/\\s+/) : [];
  const slug = cleaned
    .toLowerCase()
    .replace(/[^a-z0-9\\s-]/g, '')
    .replaceAll(' ', '-');

  outEl.textContent =
    \`Trimmed: "\${cleaned}"\\n\` +
    \`Length : \${cleaned.length} chars (\${words.length} words)\\n\` +
    \`Slug   : /\${slug}\\n\` +
    \`Has JS?: \${cleaned.toLowerCase().includes('js')}\`;
}

inputEl.addEventListener('input', update);
update();`,
            },
          },
          tip: 'Because strings are immutable, writing str.trim(); without assigning the result throws the trimmed string away—always save it with const clean = str.trim();.',
        },
        {
          id: 'numbers-and-math-utilities',
          heading: 'Numbers, Floating-Point Precision & the Math Object',
          body: [
            'JavaScript stores all standard numbers as 64-bit IEEE-754 floating-point values. That covers integers cleanly up to Number.MAX_SAFE_INTEGER (about 9 quadrillion), but decimal fractions like 0.1 + 0.2 produce 0.30000000000000004 in binary floating point. To display decimals cleanly, use num.toFixed(2)—just remember it returns a string, not a number.',
            'The built-in Math object supplies rounding helpers (Math.round, Math.floor, Math.ceil, Math.trunc), bounds (Math.min, Math.max), powers (Math.pow, Math.sqrt), and pseudorandom decimals via Math.random() (which returns a float in [0, 1), never reaching 1). To roll an integer from min to max inclusive, use Math.floor(Math.random() * (max - min + 1)) + min.',
          ],
          points: [
            'Always pass radix 10 to Number.parseInt("42px", 10) and validate unknown numeric inputs with Number.isFinite(n).',
            'Math.max(...scores) spreads an array into arguments to find the highest value in one line.',
            'For financial math, store prices as integer cents (e.g., 1999 instead of 19.99) and divide by 100 only when formatting for display.',
          ],
          example: {
            title: 'Random Integer Helper, Cents Math & .toFixed()',
            language: 'javascript',
            code: `function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const diceRoll = randomInt(1, 6);

// Avoid 0.1 + 0.2 floating-point drift by computing in cents
const totalCents = 10 + 20;
const formattedPrice = \`$\${(totalCents / 100).toFixed(2)}\`;

console.log({ diceRoll, formattedPrice, maxScore: Math.max(72, 95, 88) });`,
            playground: {
              html: `<div class="panel">
  <h3>Dice Roller &amp; Cents Calculator</h3>
  <button id="roll">Roll 2 Dice</button>
  <pre id="out"></pre>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; background: #f8fafc; color: #0f172a; margin: 0; }
.panel { max-width: 440px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; display: grid; gap: 10px; }
h3 { margin: 0; font-size: 16px; }
button { width: fit-content; padding: 8px 14px; border: none; border-radius: 8px; background: #2563eb; color: #fff; font-weight: 600; cursor: pointer; }
pre { margin: 0; padding: 12px; background: #0f172a; color: #e2e8f0; border-radius: 8px; font-size: 13px; line-height: 1.6; }`,
              js: `const outEl = document.getElementById('out');
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function roll() {
  const d1 = randomInt(1, 6);
  const d2 = randomInt(1, 6);
  const rewardCents = (d1 + d2) * 15;
  outEl.textContent =
    \`Die 1: \${d1} | Die 2: \${d2} | Sum: \${d1 + d2}\\n\` +
    \`Float bug check (0.1 + 0.2): \${0.1 + 0.2}\\n\` +
    \`Safe cents reward: $\${(rewardCents / 100).toFixed(2)}\`;
}

document.getElementById('roll').addEventListener('click', roll);
roll();`,
            },
          },
          warning:
            'Never compare decimal floats with === (0.1 + 0.2 === 0.3 is false!), and never use Math.random() for passwords, tokens, or security—use crypto.getRandomValues() or crypto.randomUUID() instead.',
        },
        {
          id: 'dates-and-intl-formatting',
          heading: 'Dates, Timestamps & Intl.DateTimeFormat',
          body: [
            'The Date object represents a single instant in time as milliseconds since January 1, 1970 UTC (the Unix epoch). Use Date.now() when you only need a fast numeric timestamp to measure elapsed duration, and pass standard ISO-8601 strings like "2026-11-22T09:30:00Z" to new Date(...) so every browser parses the same moment reliably.',
            'Instead of manually stitching getDate(), getMonth() + 1, and getFullYear() with error-prone string math, reach for the built-in Intl.DateTimeFormat and Intl.NumberFormat APIs. They handle locales (such as "en-US" or "km-KH"), time zones, month names, and currency symbols accurately with zero external libraries.',
          ],
          points: [
            'ISO-8601 format (YYYY-MM-DDTHH:mm:ssZ) is the universal standard for storing and exchanging dates in JSON APIs.',
            'Intl.DateTimeFormat lets you specify dateStyle ("short", "medium", "long") and timeZone ("Asia/Phnom_Penh").',
            'Intl.NumberFormat(locale, { style: "currency", currency: "USD" }) formats prices with proper commas and symbols.',
          ],
          example: {
            title: 'Formatting Dates & Currency Across Locales with Intl',
            language: 'javascript',
            code: `const launchDate = new Date('2026-11-22T14:30:00Z');

const enFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeStyle: 'short',
  timeZone: 'Asia/Phnom_Penh',
});

const kmFormatter = new Intl.DateTimeFormat('km-KH', {
  dateStyle: 'long',
  timeZone: 'Asia/Phnom_Penh',
});

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

console.log('EN:', enFormatter.format(launchDate));
console.log('KM:', kmFormatter.format(launchDate));
console.log('Price:', usd.format(1499.5));`,
          },
          warning:
            'In JavaScript Date, months are 0-indexed (0 = January, 11 = December)! Passing new Date(2026, 11, 1) creates December 1, not November 1.',
        },
      ],
      challenge: {
        prompt:
          'Write a function formatReceipt(rawName, priceCents, isoDate) that trims rawName and capitalizes its first character using .trim() and .slice(), converts priceCents to a dollar string using .toFixed(2), and formats isoDate with Intl.DateTimeFormat("en-US", { dateStyle: "medium" }). Return a single summary string.',
        hint: 'Use const clean = rawName.trim(); const name = clean.slice(0, 1).toUpperCase() + clean.slice(1).toLowerCase(); and (priceCents / 100).toFixed(2).',
        language: 'javascript',
        solutionCode: `function formatReceipt(rawName, priceCents, isoDate) {
  const clean = rawName.trim();
  const name = clean.slice(0, 1).toUpperCase() + clean.slice(1).toLowerCase();
  const price = \`$\${(priceCents / 100).toFixed(2)}\`;
  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(new Date(isoDate));

  return \`\${name} paid \${price} on \${date}\`;
}

console.log(formatReceipt('  sOKHA ', 2450, '2026-11-22T00:00:00Z'));`,
      },
      quiz: [
        {
          question: 'What data type does (19.5).toFixed(2) return?',
          options: ['number (19.50)', 'string ("19.50")', 'bigint', 'object'],
          answer: 1,
          explanation:
            '.toFixed() always returns a formatted string so trailing zeroes (like "19.50") are preserved for display.',
        },
        {
          question: 'Which expression generates a random integer from 1 to 6 inclusive?',
          options: [
            'Math.floor(Math.random() * 6)',
            'Math.floor(Math.random() * 6) + 1',
            'Math.round(Math.random() * 6)',
            'Math.ceil(Math.random() * 5)',
          ],
          answer: 1,
          explanation:
            'Math.random() * 6 produces a float in [0, 6). Taking Math.floor() gives an integer 0..5, and adding 1 shifts the range uniformly to 1..6.',
        },
      ],
    },
    km: {
      title: 'អត្ថបទ (Strings) លេខ (Numbers) Math និងកាលបរិច្ឆេទ',
      duration: '14 នាទី',
      summary:
        'កែច្នៃអត្ថបទដោយវិធី String ទំនើប ជៀសវាងកំហុសលេខទសភាគ បង្កើតលេខចៃដន្យដោយ Math និងរៀបចំទម្រង់កាលបរិច្ឆេទ និងរូបិយបណ្ណអន្តរជាតិដោយ Intl។',
      objectives: [
        'សម្អាត ស្វែងរក កាត់ (.slice) និងបំបែក (.split) អត្ថបទដោយវិធី String ដែលមិនកែប្រែតម្លៃដើម។',
        'រៀបចំទសភាគដោយ .toFixed(), ពិនិត្យលេខដោយ Number.isNaN() និងគណនាជួរលេខចៃដន្យដោយ Math.random() និង Math.floor()។',
        'បង្កើត Date ដោយសុវត្ថិភាព និងរៀបចំទម្រង់កាលបរិច្ឆេទ និងប្រាក់តាមតំបន់ដោយ Intl.DateTimeFormat និង Intl.NumberFormat។',
      ],
      sections: [
        {
          id: 'string-methods-and-parsing',
          heading: 'វិធីសំខាន់ៗរបស់ String និងភាពមិនផ្លាស់ប្ដូរ (Immutability)',
          body: [
            'អត្ថបទ (Strings) ក្នុង JavaScript ជា primitive ដែលមិនផ្លាស់ប្ដូរ—វិធីដូចជា .trim(), .toLowerCase(), .slice() និង .replaceAll() មិនដែលកែប្រែអត្ថបទដើមទេ ប៉ុន្តែតែងត្រឡប់អត្ថបទថ្មីជានិច្ច។ ដូច្នេះអ្នកអាចតភ្ជាប់វិធីទាំងនោះជាខ្សែ (chain) ដើម្បីសម្អាតទិន្នន័យអ្នកប្រើ ឬបង្កើត URL slug។',
            'JavaScript ទំនើបក៏ជួយឱ្យការស្វែងរក និងកាត់អត្ថបទងាយអានដែរ៖ ប្រើ .includes(), .startsWith() និង .endsWith() ដើម្បីពិនិត្យ true/false និងប្រើ .slice(start, end) ជាមួយលេខអវិជ្ជមាន (ដូចជា str.slice(-4)) ដើម្បីយកតួអក្សរពីខាងចុង។',
          ],
          points: [
            'ប្រើ .split(",") ដើម្បីបំបែកអត្ថបទទៅជា array និងប្រើ .join("-") ដើម្បីផ្គុំត្រឡប់មកវិញ។',
            'ប្រើ .padStart(2, "0") ដើម្បីបំពេញលេខសូន្យខាងមុខ ដូចជា "09:05" ឬ "INV-0042"។',
            'Template literals (`Hello, ${name}!`) គាំទ្រច្រើនបន្ទាត់ និងការបញ្ចូលកន្សោមដោយមិនបាច់ប្រើសញ្ញា + ស្មុគស្មាញ។',
          ],
          table: {
            headers: ['វិធី (Method)', 'ឧទាហរណ៍', 'តម្លៃត្រឡប់'],
            rows: [
              ['.trim()', '"  hi  ".trim()', '"hi" (លុបដកឃ្លាខាងដើម និងចុង)'],
              ['.slice(start, end)', '"JavaScript".slice(0, 4)', '"Java" (លេខអវិជ្ជមានរាប់ពីចុង)'],
              ['.includes(sub)', '"codehub.dev".includes("hub")', 'true'],
              ['.split(sep)', '"a,b,c".split(",")', '["a", "b", "c"]'],
              ['.replaceAll(a, b)', '"a b c".replaceAll(" ", "-")', '"a-b-c"'],
              ['.padStart(len, ch)', '"7".padStart(3, "0")', '"007"'],
            ],
          },
          exampleTitle: 'ការបម្លែងចំណងជើងអ្នកប្រើទៅជា URL Slug ស្អាត',
          tip: 'ដោយសារ String មិនកែតម្លៃដើម ការសរសេរ str.trim(); ទទេដោយមិនរក្សាទុកលទ្ធផលនឹងគ្មានប្រសិទ្ធភាពទេ—ត្រូវសរសេរ const clean = str.trim();។',
        },
        {
          id: 'numbers-and-math-utilities',
          heading: 'លេខ ភាពត្រឹមត្រូវនៃទសភាគ និងអង្គ Math',
          body: [
            'JavaScript រក្សាទុកលេខធម្មតាទាំងអស់ជា 64-bit IEEE-754 floating-point។ វាដំណើរការល្អសម្រាប់ចំនួនគត់ធំ ប៉ុន្តែប្រភាគទសភាគដូចជា 0.1 + 0.2 ផ្ដល់លទ្ធផល 0.30000000000000004។ ដើម្បីបង្ហាញទសភាគឱ្យស្អាត សូមប្រើ num.toFixed(2)—ដោយចាំថាវាត្រឡប់ជា string មិនមែន number ទេ។',
            'អង្គ Math ផ្ដល់អនុគមន៍បង្គត់ (Math.round, Math.floor, Math.ceil, Math.trunc), តម្លៃអតិបរមា/អប្បបរមា (Math.max, Math.min) និងលេខចៃដន្យតាម Math.random() (ចន្លោះ [0, 1))។ ដើម្បីបង្កើតចំនួនគត់ចៃដន្យពី min ដល់ max សូមប្រើ Math.floor(Math.random() * (max - min + 1)) + min។',
          ],
          points: [
            'ផ្ដល់លេខគោល 10 ជានិច្ចក្នុង Number.parseInt("42px", 10) និងពិនិត្យលេខត្រឹមត្រូវដោយ Number.isFinite(n)។',
            'Math.max(...scores) ជួយរកពិន្ទុខ្ពស់បំផុតក្នុង array តែមួយបន្ទាត់។',
            'សម្រាប់ការគណនាប្រាក់ សូមរក្សាទុកជាចំនួនគត់សេន (ដូចជា 1999 ជំនួស 19.99) រួចចែកនឹង 100 តែពេលបង្ហាញ។',
          ],
          exampleTitle: 'អនុគមន៍លេខចៃដន្យ ការគណនាប្រាក់ជាសេន និង .toFixed()',
          warning:
            'កុំប្រៀបធៀបលេខទសភាគដោយ === (0.1 + 0.2 === 0.3 គឺ false!) និងកុំប្រើ Math.random() សម្រាប់ពាក្យសម្ងាត់ ឬសុវត្ថិភាព—សូមប្រើ crypto.randomUUID() ជំនួស។',
        },
        {
          id: 'dates-and-intl-formatting',
          heading: 'កាលបរិច្ឆេទ (Date) Timestamp និង Intl.DateTimeFormat',
          body: [
            'Object Date តំណាងឱ្យខណៈពេលជាក់លាក់មួយគិតជាមិល្លីវិនាទីចាប់ពីថ្ងៃទី ១ មករា ១៩៧០ UTC។ ប្រើ Date.now() ពេលអ្នកត្រូវការតែលេខ timestamp ដើម្បីវាស់រយៈពេល ហើយបញ្ជូនអត្ថបទស្ដង់ដារ ISO-8601 ដូចជា "2026-11-22T09:30:00Z" ទៅ new Date(...) ដើម្បីឱ្យគ្រប់កម្មវិធីរុករកអានបានដូចគ្នា។',
            'ជំនួសឱ្យការតភ្ជាប់ getDate(), getMonth() + 1 និង getFullYear() ដោយដៃ សូមប្រើ Intl.DateTimeFormat និង Intl.NumberFormat ដែលភ្ជាប់មកស្រាប់។ វាគាំទ្រភាសា និងតំបន់ (ដូចជា "en-US" ឬ "km-KH") ល្វែងម៉ោង និងសញ្ញារូបិយបណ្ណយ៉ាងត្រឹមត្រូវដោយមិនបាច់ដំឡើងបណ្ណាល័យបន្ថែម។',
          ],
          points: [
            'ទម្រង់ ISO-8601 (YYYY-MM-DDTHH:mm:ssZ) ជាស្ដង់ដារសកលសម្រាប់រក្សាទុក និងផ្ញើកាលបរិច្ឆេទក្នុង JSON API។',
            'Intl.DateTimeFormat អនុញ្ញាតឱ្យកំណត់ dateStyle ("short", "medium", "long") និង timeZone ("Asia/Phnom_Penh")។',
            'Intl.NumberFormat(locale, { style: "currency", currency: "USD" }) រៀបចំតម្លៃប្រាក់មានក្បៀស និងនិមិត្តសញ្ញាស្អាត។',
          ],
          exampleTitle: 'ការបង្ហាញកាលបរិច្ឆេទ និងប្រាក់តាមភាសាផ្សេងៗដោយ Intl',
          warning:
            'ក្នុង Date របស់ JavaScript ខែរាប់ចាប់ពីលេខ 0 (0 = មករា, 11 = ធ្នូ)! ការសរសេរ new Date(2026, 11, 1) បង្កើតថ្ងៃទី ១ ធ្នូ មិនមែនវិច្ឆិកាទេ។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ formatReceipt(rawName, priceCents, isoDate) ដែលសម្អាតដកឃ្លា rawName និងធ្វើតួអក្សរទីមួយជាអក្សរធំដោយ .trim() និង .slice(), បម្លែង priceCents ជាប្រាក់ដុល្លារដោយ .toFixed(2) និងបង្ហាញ isoDate ដោយ Intl.DateTimeFormat("en-US", { dateStyle: "medium" }) រួចត្រឡប់ជាអត្ថបទសង្ខេបមួយ។',
        hint: 'ប្រើ const clean = rawName.trim(); const name = clean.slice(0, 1).toUpperCase() + clean.slice(1).toLowerCase(); និង (priceCents / 100).toFixed(2)។',
      },
      quiz: [
        {
          question: 'តើ (19.5).toFixed(2) ត្រឡប់ទិន្នន័យប្រភេទអ្វី?',
          options: ['number (19.50)', 'string ("19.50")', 'bigint', 'object'],
          answer: 1,
          explanation:
            '.toFixed() តែងតែត្រឡប់ជា string ដើម្បីរក្សាលេខសូន្យខាងចុង (ដូចជា "19.50") សម្រាប់ការបង្ហាញ។',
        },
        {
          question: 'តើកន្សោមណាមួយបង្កើតចំនួនគត់ចៃដន្យពី 1 ដល់ 6 រួមទាំង 1 និង 6?',
          options: [
            'Math.floor(Math.random() * 6)',
            'Math.floor(Math.random() * 6) + 1',
            'Math.round(Math.random() * 6)',
            'Math.ceil(Math.random() * 5)',
          ],
          answer: 1,
          explanation:
            'Math.random() * 6 ផ្ដល់លេខទសភាគចន្លោះ [0, 6)។ Math.floor() ផ្ដល់ចំនួនគត់ 0..5 ហើយការបូក 1 រំកិលទៅជា 1..6 ស្មើភាពគ្នា។',
        },
      ],
    },
  },

  // =========================================================================
  // 4. OBJECTS, DESTRUCTURING & SPREAD/REST
  // =========================================================================
  {
    slug: 'js-objects-and-destructuring',
    level: 'intermediate',
    insertAfter: 'arrays-and-methods',
    en: {
      title: 'Objects, Destructuring & Spread/Rest',
      duration: '15 min',
      summary:
        'Model structured data with modern object syntax, optional chaining (?.), destructuring with renaming and defaults, immutable spread/rest updates, and Object.entries() pipelines.',
      objectives: [
        'Write concise object literals using property shorthand, computed keys, methods with this, and safe optional chaining (?.).',
        'Unpack nested objects with destructuring, apply defaults or aliases, and clone/omit properties immutably using spread and rest (...).',
        'Convert between objects and key-value arrays using Object.keys(), Object.values(), Object.entries(), and Object.fromEntries().',
      ],
      sections: [
        {
          id: 'object-methods-shorthand-and-chaining',
          heading: 'Object Shorthand, Methods & Optional Chaining (?.)',
          body: [
            'Objects are JavaScript’s primary way to group related data and behavior as key-value pairs. Modern ES6+ syntax keeps objects crisp: when a variable name matches the property name, write { name, role } instead of { name: name, role: role }. You can also compute dynamic property keys with square brackets ([field]: value) and define methods directly as greet() { ... }.',
            'Real-world data from APIs often has optional nested fields. Optional chaining (?.) stops evaluating and returns undefined the moment a link in the chain is null or undefined—working across properties (user?.profile?.avatar), array indices (items?.[0]), and optional callbacks (config.onSave?.(data)).',
          ],
          points: [
            'Inside a regular object method (method() {}), this refers to the object the method was called on.',
            'Use bracket notation obj[dynamicKey] whenever the key is stored in a variable or contains spaces/hyphens.',
            'Combine optional chaining with nullish coalescing: user?.settings?.language ?? "en".',
          ],
          table: {
            headers: ['Feature', 'Syntax', 'Purpose'],
            rows: [
              ['Property shorthand', 'const u = { name, age }', 'Avoids repeating name: name'],
              ['Computed key', '{ [keyName]: 100 }', 'Uses a runtime expression as the key'],
              [
                'Optional chaining',
                'user?.address?.city',
                'Safely reads nested fields without throwing',
              ],
              [
                'Destructuring',
                'const { id, name: title } = post',
                'Extracts and optionally renames properties',
              ],
              ['Spread copy', '{ ...base, active: true }', 'Creates a shallow copy with overrides'],
              [
                'Rest omit',
                'const { secret, ...safe } = obj',
                'Collects all remaining properties into safe',
              ],
            ],
          },
          example: {
            title: 'Concise Object Methods, Computed Keys & Optional Chaining',
            language: 'javascript',
            code: `const metricKey = 'completedLessons';
const name = 'Dara';

const learner = {
  name,
  [metricKey]: 12,
  describe() {
    return \`\${this.name} completed \${this.completedLessons} lessons.\`;
  },
};

console.log(learner.describe());
console.log('City:', learner.profile?.city ?? 'Not provided');
console.log('Optional callback:', learner.onCelebrate?.()); // undefined, no crash`,
          },
          warning:
            'Do not use arrow functions for object methods that rely on this! Arrow functions inherit this from the surrounding scope, so this.name inside an arrow method will be undefined.',
        },
        {
          id: 'destructuring-and-spread-rest',
          heading: 'Destructuring, Defaults, Spread ({ ...copy }) & Rest',
          body: [
            'Object destructuring pulls properties directly into local variables in one line: const { name, role = "student" } = user;. You can rename a property on the fly with { name: displayName }, destructure nested objects, and even destructure directly inside function parameters so callers can pass named options in any order.',
            'The three-dot syntax (...) plays two complementary roles. In an object literal, spread ({ ...user, role: "mentor" }) copies enumerable own properties into a brand-new object—later keys override earlier ones. In a destructuring pattern, rest (const { password, ...publicProfile } = user) gathers every remaining key into a new object, making it effortless to strip sensitive fields without mutating the original.',
          ],
          points: [
            'Default values in destructuring only trigger when the property is undefined (not null or 0).',
            'Key order matters when spreading: { role: "guest", ...user } sets a fallback, while { ...user, role: "admin" } forces an override.',
            'Rest destructuring is cleaner and safer than delete obj.password because it leaves the original object untouched.',
          ],
          example: {
            title: 'Renaming, Defaults, Spread Override & Rest Omission',
            language: 'javascript',
            code: `const account = {
  id: 42,
  name: 'Sophea',
  passwordHash: 'sha256_secret',
  plan: 'free',
};

// Strip passwordHash using rest, rename name -> fullName, add default
const { passwordHash, name: fullName, role = 'member', ...rest } = account;

// Immutable upgrade with spread
const upgraded = { ...rest, fullName, role, plan: 'pro' };

console.log('Public upgraded:', upgraded);
console.log('Original plan still:', account.plan); // "free"`,
            playground: {
              html: `<div class="panel">
  <h3>Immutable Profile Updater (Spread &amp; Rest)</h3>
  <div class="row">
    <button id="upgrade">Upgrade to Pro</button>
    <button id="toggle">Toggle Verified</button>
  </div>
  <pre id="out"></pre>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; background: #f8fafc; color: #0f172a; margin: 0; }
.panel { max-width: 500px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; display: grid; gap: 10px; }
h3 { margin: 0; font-size: 16px; }
.row { display: flex; gap: 8px; }
button { padding: 7px 12px; border: none; border-radius: 8px; background: #2563eb; color: #fff; font-weight: 600; cursor: pointer; }
pre { margin: 0; padding: 12px; background: #0f172a; color: #e2e8f0; border-radius: 8px; font-size: 12.5px; line-height: 1.5; }`,
              js: `let user = {
  id: 7,
  name: 'Vanna',
  secretToken: 'tok_live_9821',
  plan: 'free',
  verified: false,
};

const outEl = document.getElementById('out');

function render() {
  const { secretToken, ...publicUser } = user;
  outEl.textContent =
    \`Public payload (secretToken stripped via rest):\\n\` +
    JSON.stringify(publicUser, null, 2);
}

document.getElementById('upgrade').addEventListener('click', () => {
  user = { ...user, plan: user.plan === 'free' ? 'pro' : 'free' };
  render();
});

document.getElementById('toggle').addEventListener('click', () => {
  user = { ...user, verified: !user.verified };
  render();
});

render();`,
            },
          },
          tip: 'Destructuring function parameters—like function createCard({ title, theme = "light" } = {})—gives you self-documenting named arguments with safe defaults even when called with no arguments.',
        },
        {
          id: 'iterating-and-transforming-objects',
          heading: 'Transforming Objects with Object.entries() & Object.fromEntries()',
          body: [
            'Plain objects do not have .map() or .filter() methods like arrays do, yet you often need to filter keys or adjust every value in a dictionary. JavaScript solves this cleanly with four static helpers: Object.keys(obj) returns an array of keys, Object.values(obj) returns an array of values, Object.entries(obj) returns an array of [key, value] pairs, and Object.fromEntries(pairs) turns [key, value] pairs right back into a new object.',
            'Chaining Object.entries() -> array methods (.filter(), .map()) -> Object.fromEntries() gives you expressive, immutable object transformations in just a few lines.',
          ],
          points: [
            'Object.entries(obj) pairs cleanly with destructuring: .filter(([key, val]) => val > 0).',
            'Object.fromEntries() also accepts a Map or URLSearchParams directly to build a plain object.',
            'Remember that { ...obj } performs a shallow copy; use structuredClone(obj) when nested objects must be isolated.',
          ],
          example: {
            title: 'Applying a 20% Discount Across a Price Map',
            language: 'javascript',
            code: `const menuPrices = {
  espresso: 2.5,
  latte: 3.75,
  matcha: 4.5,
  water: 1.0,
};

const discounted = Object.fromEntries(
  Object.entries(menuPrices)
    .filter(([, price]) => price >= 2.5)
    .map(([drink, price]) => [drink, Number((price * 0.8).toFixed(2))])
);

console.log(discounted); // { espresso: 2, latte: 3, matcha: 3.6 }`,
            playground: {
              html: `<div class="panel">
  <h3>Object.entries() Discount Pipeline</h3>
  <label>Discount (%): <input id="pct" type="range" min="0" max="50" value="20" /> <span id="pctVal">20%</span></label>
  <pre id="out"></pre>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; background: #f8fafc; color: #0f172a; margin: 0; }
.panel { max-width: 480px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; display: grid; gap: 10px; }
h3 { margin: 0; font-size: 16px; }
label { display: flex; align-items: center; gap: 10px; font-size: 14px; }
pre { margin: 0; padding: 12px; background: #0f172a; color: #e2e8f0; border-radius: 8px; font-size: 13px; line-height: 1.5; }`,
              js: `const prices = { espresso: 2.5, latte: 3.75, matcha: 4.5, croissant: 3.25 };
const pctEl = document.getElementById('pct');
const pctValEl = document.getElementById('pctVal');
const outEl = document.getElementById('out');

function update() {
  const pct = Number(pctEl.value);
  pctValEl.textContent = \`\${pct}%\`;

  const updated = Object.fromEntries(
    Object.entries(prices).map(([item, price]) => [
      item,
      Number((price * (1 - pct / 100)).toFixed(2)),
    ])
  );

  outEl.textContent = JSON.stringify(updated, null, 2);
}

pctEl.addEventListener('input', update);
update();`,
            },
          },
          warning:
            'Spread copying ({ ...obj }) only copies top-level keys. If obj contains nested objects or arrays, mutating copy.nested.x still changes the original—use structuredClone(obj) for a true deep clone.',
        },
      ],
      challenge: {
        prompt:
          'Given const product = { name: "Laptop", internalCost: 600, pricing: { usd: 999 } } and const stock = { phnomPenh: 4, siemReap: 0, battambang: 2 }, use rest destructuring to create publicProduct without internalCost, read product.pricing?.discount ?? 0, and use Object.entries() + Object.fromEntries() to create activeStock containing only branches with stock > 0, doubled.',
        hint: 'Use const { internalCost, ...publicProduct } = product; and Object.fromEntries(Object.entries(stock).filter(([, qty]) => qty > 0).map(([city, qty]) => [city, qty * 2])).',
        language: 'javascript',
        solutionCode: `const product = { name: 'Laptop', internalCost: 600, pricing: { usd: 999 } };
const stock = { phnomPenh: 4, siemReap: 0, battambang: 2 };

const { internalCost, ...publicProduct } = product;
const discount = product.pricing?.discount ?? 0;

const activeStock = Object.fromEntries(
  Object.entries(stock)
    .filter(([, qty]) => qty > 0)
    .map(([city, qty]) => [city, qty * 2])
);

console.log({ publicProduct, discount, activeStock });`,
      },
      quiz: [
        {
          question: 'What does const { name: title } = { name: "CodeHub" }; create?',
          options: [
            'A variable called name with value "title"',
            'A variable called title with value "CodeHub"',
            'Two variables: name and title',
            'A SyntaxError because colons are invalid in destructuring',
          ],
          answer: 1,
          explanation:
            'In object destructuring, { propertyKey: localVariableName } extracts propertyKey and binds it to localVariableName—so title is "CodeHub" and name is not declared.',
        },
        {
          question: 'What does Object.entries({ a: 1, b: 2 }) return?',
          options: ['["a", "b"]', '[1, 2]', '[["a", 1], ["b", 2]]', '{ a: [1], b: [2] }'],
          answer: 2,
          explanation:
            'Object.entries() returns an array of [key, value] two-element tuples for each own enumerable property, which pairs directly with .map(), .filter(), and Object.fromEntries().',
        },
      ],
    },
    km: {
      title: 'Objects, Destructuring និង Spread/Rest',
      duration: '15 នាទី',
      summary:
        'រៀបចំទិន្នន័យមានរចនាសម្ព័ន្ធដោយវាក្យសម្ព័ន្ធ Object ទំនើប ការអានដោយសុវត្ថិភាព (?.) ការទាញតម្លៃ destructuring ការចម្លងមិនកែដើមដោយ spread/rest និងការបម្លែងតាម Object.entries()។',
      objectives: [
        'សរសេរ object ខ្លីស្អាតដោយ property shorthand, គន្លឹះគណនា ([key]), វិធីប្រើ this និង optional chaining (?.)។',
        'ទាញយកតម្លៃពី object ដោយ destructuring ប្ដូរឈ្មោះ ផ្ដល់តម្លៃលំនាំដើម និងចម្លង ឬដកគន្លឹះចេញដោយ spread/rest (...)។',
        'បម្លែងទៅវិញទៅមករវាង object និង array ដោយ Object.keys(), Object.values(), Object.entries() និង Object.fromEntries()។',
      ],
      sections: [
        {
          id: 'object-methods-shorthand-and-chaining',
          heading: 'ទម្រង់ខ្លីនៃ Object, វិធី (Methods) និង Optional Chaining (?.)',
          body: [
            'Object ជាវិធីចម្បងក្នុង JavaScript សម្រាប់ចងក្រុមទិន្នន័យ និងមុខងារជាគូ key-value។ វាក្យសម្ព័ន្ធ ES6+ ជួយឱ្យកូដខ្លីស្អាត៖ ពេលឈ្មោះអថេរដូចឈ្មោះលក្ខណៈសម្បត្តិ សរសេរ { name, role } ជំនួស { name: name, role: role }។ អ្នកក៏អាចប្រើគន្លឹះគណនា ([field]: value) និងកំណត់ method ផ្ទាល់ជា greet() { ... }។',
            'ទិន្នន័យពី API ជាក់ស្ដែងតែងអាចខ្វះជួរខាងក្នុងខ្លះ។ Optional chaining (?.) ឈប់អានហើយត្រឡប់ undefined ភ្លាមពេលផ្នែកណាមួយជា null ឬ undefined—ប្រើបានទាំងលើ property (user?.profile?.avatar), សន្ទស្សន៍ array (items?.[0]) និងការហៅអនុគមន៍ (config.onSave?.(data))។',
          ],
          points: [
            'ក្នុង method ធម្មតារបស់ object (method() {}) ពាក្យ this សំដៅលើ object ដែលហៅ method នោះ។',
            'ប្រើវង់ក្រចកជ្រុង obj[dynamicKey] ពេលឈ្មោះគន្លឹះស្ថិតក្នុងអថេរ ឬមានដកឃ្លា/សញ្ញាដក។',
            'ភ្ជាប់ ?. ជាមួយ ?? ដើម្បីផ្ដល់តម្លៃលំនាំដើមដោយសុវត្ថិភាព៖ user?.settings?.language ?? "en"។',
          ],
          table: {
            headers: ['លក្ខណៈពិសេស', 'វាក្យសម្ព័ន្ធ', 'គោលបំណង'],
            rows: [
              ['Property shorthand', 'const u = { name, age }', 'ជៀសវាងការសរសេរ name: name ដដែលៗ'],
              ['Computed key', '{ [keyName]: 100 }', 'ប្រើតម្លៃអថេរជាឈ្មោះគន្លឹះ'],
              [
                'Optional chaining',
                'user?.address?.city',
                'អានជួរត្រួតជាន់ដោយសុវត្ថិភាពមិនឱ្យគាំង',
              ],
              ['Destructuring', 'const { id, name: title } = post', 'ទាញយក និងអាចប្ដូរឈ្មោះអថេរ'],
              ['Spread copy', '{ ...base, active: true }', 'បង្កើតច្បាប់ចម្លងថ្មីហើយកែតម្លៃខ្លះ'],
              ['Rest omit', 'const { secret, ...safe } = obj', 'ប្រមូលគន្លឹះនៅសល់ទាំងអស់ចូល safe'],
            ],
          },
          exampleTitle: 'Object Methods ខ្លី គន្លឹះគណនា និង Optional Chaining',
          warning:
            'កុំប្រើ arrow function សម្រាប់ method របស់ object ដែលត្រូវការ this! Arrow function ស្នង this ពីដែនខាងក្រៅ ធ្វើឱ្យ this.name ក្លាយជា undefined។',
        },
        {
          id: 'destructuring-and-spread-rest',
          heading: 'Destructuring, តម្លៃលំនាំដើម, Spread ({ ...copy }) និង Rest',
          body: [
            'Object destructuring ទាញយកលក្ខណៈសម្បត្តិទៅជាអថេរក្នុងមួយបន្ទាត់៖ const { name, role = "student" } = user;។ អ្នកអាចប្ដូរឈ្មោះដោយ { name: displayName }, ទាញពីជាន់ខាងក្នុង និងដាក់ក្នុងប៉ារ៉ាម៉ែត្រអនុគមន៍ដើម្បីទទួលជម្រើសតាមឈ្មោះដោយមិនគិតលំដាប់។',
            'សញ្ញាចុចបី (...) មានតួនាទីពីរ។ ក្នុង object ថ្មី spread ({ ...user, role: "mentor" }) ចម្លងគន្លឹះទាំងអស់ទៅ object ថ្មីដោយគន្លឹះខាងក្រោយសរសេរជាន់គន្លឹះខាងមុខ។ ក្នុង destructuring វិញ rest (const { password, ...publicProfile } = user) ប្រមូលគន្លឹះនៅសល់ទាំងអស់ ជួយដកទិន្នន័យសម្ងាត់ចេញដោយមិនកែ object ដើម។',
          ],
          points: [
            'តម្លៃលំនាំដើមក្នុង destructuring ដំណើរការតែពេលគន្លឹះនោះជា undefined ប៉ុណ្ណោះ (មិនមែន null ឬ 0 ទេ)។',
            'លំដាប់សំខាន់ក្នុង spread៖ { role: "guest", ...user } ជាតម្លៃលំនាំដើម ចំណែក { ...user, role: "admin" } ជាការបង្ខំកែជាន់។',
            'ការដកគន្លឹះដោយ rest ស្អាត និងសុវត្ថិភាពជាង delete obj.password ព្រោះវាមិនប៉ះពាល់ object ដើម។',
          ],
          exampleTitle: 'ការប្ដូរឈ្មោះ តម្លៃលំនាំដើម ការកែដោយ Spread និងដកចេញដោយ Rest',
          tip: 'ការប្រើ destructuring ក្នុងប៉ារ៉ាម៉ែត្រអនុគមន៍ ដូចជា function createCard({ title, theme = "light" } = {}) ធ្វើឱ្យការហៅអនុគមន៍ច្បាស់លាស់ និងមិនគាំងទោះមិនបញ្ជូនអាគុយម៉ង់ក៏ដោយ។',
        },
        {
          id: 'iterating-and-transforming-objects',
          heading: 'ការបម្លែង Object ដោយ Object.entries() និង Object.fromEntries()',
          body: [
            'Object ធម្មតាមិនមានវិធី .map() ឬ .filter() ដូច array ទេ ប៉ុន្តែ JavaScript ផ្ដល់វិធីជំនួយបួន៖ Object.keys(obj) ត្រឡប់ array នៃគន្លឹះ, Object.values(obj) ត្រឡប់ array នៃតម្លៃ, Object.entries(obj) ត្រឡប់ array នៃគូ [key, value] និង Object.fromEntries(pairs) បម្លែងគូ [key, value] ត្រឡប់ជា object ថ្មី។',
            'ការតភ្ជាប់ Object.entries() -> .filter() / .map() -> Object.fromEntries() ជួយឱ្យអ្នកបម្លែង object ដោយមិនកែដើមក្នុងកូដតែប៉ុន្មានបន្ទាត់។',
          ],
          points: [
            'Object.entries(obj) ផ្គូផ្គងល្អជាមួយ destructuring៖ .filter(([key, val]) => val > 0)។',
            'Object.fromEntries() ក៏ទទួល Map ឬ URLSearchParams ផ្ទាល់ដើម្បីបង្កើតជា object ធម្មតាដែរ។',
            'សូមចាំថា { ...obj } ចម្លងតែជាន់លើបំផុត (shallow copy) ចំណែក structuredClone(obj) ចម្លងជ្រៅគ្រប់ជាន់។',
          ],
          exampleTitle: 'ការបញ្ចុះតម្លៃ 20% លើបញ្ជីតម្លៃភេសជ្ជៈ',
          warning:
            'ការចម្លងដោយ { ...obj } ចម្លងតែជាន់លើបំផុតប៉ុណ្ណោះ។ បើមាន object ឬ array ខាងក្នុង ការកែ copy.nested.x នឹងប៉ះពាល់ដើមដែរ—ប្រើ structuredClone(obj) សម្រាប់ការចម្លងជ្រៅពិតប្រាកដ។',
        },
      ],
      challenge: {
        prompt:
          'ដោយមាន const product = { name: "Laptop", internalCost: 600, pricing: { usd: 999 } } និង const stock = { phnomPenh: 4, siemReap: 0, battambang: 2 } ចូរប្រើ rest destructuring បង្កើត publicProduct ដោយគ្មាន internalCost, អាន product.pricing?.discount ?? 0 និងប្រើ Object.entries() + Object.fromEntries() បង្កើត activeStock ដែលយកតែសាខាមាន stock > 0 ហើយគុណចំនួននឹង 2។',
        hint: 'ប្រើ const { internalCost, ...publicProduct } = product; និង Object.fromEntries(Object.entries(stock).filter(([, qty]) => qty > 0).map(([city, qty]) => [city, qty * 2]))។',
      },
      quiz: [
        {
          question: 'តើ const { name: title } = { name: "CodeHub" }; បង្កើតអ្វី?',
          options: [
            'អថេរឈ្មោះ name ដែលមានតម្លៃ "title"',
            'អថេរឈ្មោះ title ដែលមានតម្លៃ "CodeHub"',
            'អថេរពីរគឺ name និង title',
            'កំហុស SyntaxError ព្រោះមិនអាចប្រើសញ្ញាចុចពីរក្នុង destructuring',
          ],
          answer: 1,
          explanation:
            'ក្នុង object destructuring ទម្រង់ { propertyKey: localVariableName } ទាញតម្លៃពី propertyKey ហើយដាក់ឈ្មោះអថេរថ្មីជា localVariableName—ដូច្នេះ title ស្មើ "CodeHub"។',
        },
        {
          question: 'តើ Object.entries({ a: 1, b: 2 }) ត្រឡប់លទ្ធផលអ្វី?',
          options: ['["a", "b"]', '[1, 2]', '[["a", 1], ["b", 2]]', '{ a: [1], b: [2] }'],
          answer: 2,
          explanation:
            'Object.entries() ត្រឡប់ array នៃគូ [key, value] សម្រាប់លក្ខណៈសម្បត្តិផ្ទាល់នីមួយៗ ដែលងាយតភ្ជាប់ជាមួយ .map(), .filter() និង Object.fromEntries()។',
        },
      ],
    },
  },

  // =========================================================================
  // 5. CLASSES, ENCAPSULATION & INHERITANCE
  // =========================================================================
  {
    slug: 'js-classes-and-oop',
    level: 'intermediate',
    insertAfter: 'js-objects-and-destructuring',
    en: {
      title: 'Classes, Encapsulation & Inheritance',
      duration: '15 min',
      summary:
        'Organize complex state and behavior with ES classes, protect internal invariants using #privateFields and getters, and extend shared blueprints with extends and super.',
      objectives: [
        'Define reusable blueprints with class, constructor(), instance methods, static helpers, and get/set accessors.',
        'Enforce real encapsulation with #privateFields and #privateMethods so external code cannot corrupt internal state.',
        'Share and specialize behavior across subclasses using extends, super(), method overriding, and instanceof.',
      ],
      sections: [
        {
          id: 'class-syntax-and-constructors',
          heading: 'Class Blueprints, Constructors, Getters & Static Methods',
          body: [
            'A JavaScript class is a clean blueprint for creating objects that share the same properties and methods. Inside a class body, the special constructor() method runs automatically whenever you create an instance with new ClassName(...), setting up the object’s initial state on this.',
            'Beyond regular instance methods (stored efficiently on the shared prototype), classes support static methods—utilities attached to the class itself rather than individual instances (like User.fromJSON(str))—and get/set accessors that compute or validate values while looking like plain properties to callers.',
          ],
          points: [
            'Always name classes in PascalCase (e.g., CourseCard, BankAccount) to signal that they must be called with new.',
            'Methods declared inside a class live on the prototype, so 1,000 instances share one copy of each method in memory.',
            'Code inside a class body automatically runs in strict mode ("use strict").',
          ],
          table: {
            headers: ['Member', 'Syntax', 'Belongs To / Visibility'],
            rows: [
              [
                'Constructor',
                'constructor(name) { ... }',
                'Runs on new MyClass() to initialize instance',
              ],
              [
                'Instance method',
                'greet() { ... }',
                'Shared on prototype; accesses instance via this',
              ],
              [
                'Static method',
                'static create() { ... }',
                'Called on the class itself (MyClass.create())',
              ],
              [
                'Getter / Setter',
                'get total() { ... }',
                'Computed property access / guarded assignment',
              ],
              ['Private field', '#balance = 0;', 'Accessible ONLY inside the declaring class body'],
              [
                'Inheritance',
                'class Dog extends Animal',
                'Inherits methods; child calls super() first',
              ],
            ],
          },
          example: {
            title: 'Class with Constructor, Computed Getter & Static Factory',
            language: 'javascript',
            code: `class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }

  describe() {
    return \`\${this.width}x\${this.height} (area: \${this.area})\`;
  }

  static square(size) {
    return new Rectangle(size, size);
  }
}

const box = Rectangle.square(8);
console.log(box.describe()); // "8x8 (area: 64)"`,
          },
          warning:
            'Unlike function declarations, class declarations are not hoisted for early use—and calling a class without new throws a TypeError.',
        },
        {
          id: 'encapsulation-with-private-fields',
          heading: 'True Encapsulation with #privateFields',
          body: [
            'In older JavaScript, developers prefixed properties with an underscore (like _balance) as a polite hint meaning "please do not touch this," but nothing stopped external code from writing account._balance = -999999. Modern JavaScript solves this at the language level with hash-prefixed private fields (#balance) and private methods (#log).',
            'Private fields must be declared at the top of the class body. Any code outside the class that attempts to read or modify account.#balance triggers an immediate SyntaxError. By keeping state private and exposing validated methods (deposit, withdraw) plus a read-only getter (get balance()), your class guarantees its rules can never be bypassed.',
          ],
          points: [
            'Private fields are truly hidden—they do not show up in Object.keys(), JSON.stringify(), or for...in.',
            'Expose read-only views of private data through getters (get balance() { return this.#balance; }).',
            'Validate arguments inside methods and throw descriptive Error messages before mutating private state.',
          ],
          example: {
            title: 'Guarded BankAccount Using #balance Private Field',
            language: 'javascript',
            code: `class BankAccount {
  #balance = 0;

  constructor(owner, initialDeposit = 0) {
    this.owner = owner;
    if (initialDeposit > 0) this.deposit(initialDeposit);
  }

  get balance() {
    return this.#balance;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error('Deposit must be positive.');
    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount <= 0) throw new Error('Withdrawal must be positive.');
    if (amount > this.#balance) throw new Error('Insufficient funds.');
    this.#balance -= amount;
  }
}

const acct = new BankAccount('Sokha', 100);
acct.withdraw(35);
console.log(acct.owner, acct.balance); // "Sokha" 65`,
            playground: {
              html: `<div class="panel">
  <h3>Encapsulated BankAccount (#balance)</h3>
  <div class="bal">Balance: <strong id="bal">$100.00</strong></div>
  <div class="row">
    <input id="amt" type="number" value="25" min="1" />
    <button id="dep">Deposit</button>
    <button id="wd" class="alt">Withdraw</button>
  </div>
  <div id="msg" class="msg">Ready. Internal #balance cannot be mutated directly.</div>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; background: #f8fafc; color: #0f172a; margin: 0; }
.panel { max-width: 440px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; display: grid; gap: 12px; }
h3 { margin: 0; font-size: 16px; }
.bal { font-size: 18px; font-variant-numeric: tabular-nums; }
.row { display: flex; gap: 8px; }
input { width: 90px; padding: 7px 10px; border: 1px solid #cbd5e1; border-radius: 8px; }
button { padding: 7px 12px; border: none; border-radius: 8px; background: #16a34a; color: #fff; font-weight: 600; cursor: pointer; }
button.alt { background: #dc2626; }
.msg { font-size: 13px; padding: 10px; border-radius: 8px; background: #f1f5f9; }`,
              js: `class BankAccount {
  #balance = 0;
  constructor(initial = 0) { this.#balance = initial; }
  get balance() { return this.#balance; }
  deposit(amount) {
    if (amount <= 0) throw new Error('Deposit must be greater than $0.');
    this.#balance += amount;
  }
  withdraw(amount) {
    if (amount <= 0) throw new Error('Withdrawal must be greater than $0.');
    if (amount > this.#balance) throw new Error('Insufficient funds!');
    this.#balance -= amount;
  }
}

const account = new BankAccount(100);
const balEl = document.getElementById('bal');
const amtEl = document.getElementById('amt');
const msgEl = document.getElementById('msg');

function update(text) {
  balEl.textContent = \`$\${account.balance.toFixed(2)}\`;
  msgEl.textContent = text;
}

document.getElementById('dep').addEventListener('click', () => {
  try {
    const val = Number(amtEl.value);
    account.deposit(val);
    update(\`Deposited $\${val.toFixed(2)}.\`);
  } catch (err) {
    update(\`Blocked: \${err.message}\`);
  }
});

document.getElementById('wd').addEventListener('click', () => {
  try {
    const val = Number(amtEl.value);
    account.withdraw(val);
    update(\`Withdrew $\${val.toFixed(2)}.\`);
  } catch (err) {
    update(\`Blocked: \${err.message}\`);
  }
});`,
            },
          },
          tip: 'Keep fields private by default and add a getter only when callers need to read them—this makes refactoring internal representations painless later.',
        },
        {
          id: 'inheritance-with-extends-and-super',
          heading: 'Inheritance with extends, super & Method Overriding',
          body: [
            'When a specialized type shares core behavior with a broader base type (an "is-a" relationship), use extends to inherit its constructor and methods. Inside the subclass constructor, you must invoke super(...) first to run the parent constructor and initialize this before setting any child-specific properties.',
            'Subclasses can override parent methods with specialized logic—and still reuse the parent’s implementation by calling super.methodName(). You can also check an object’s class lineage at runtime with obj instanceof ParentClass.',
          ],
          points: [
            'If a subclass omits its own constructor, JavaScript automatically forwards all arguments to super(...args).',
            'Subclasses cannot directly access a parent’s #privateFields; communicate through protected-style methods or getters.',
            'Keep inheritance hierarchies shallow (1–2 levels). For complex features, prefer composing smaller helper objects over deep chains of extends.',
          ],
          example: {
            title: 'Extending Vehicle into ElectricCar with super',
            language: 'javascript',
            code: `class Vehicle {
  constructor(brand, speed = 0) {
    this.brand = brand;
    this.speed = speed;
  }

  accelerate(delta) {
    this.speed += delta;
    return \`\${this.brand} cruising at \${this.speed} km/h\`;
  }
}

class ElectricCar extends Vehicle {
  constructor(brand, batteryKwh) {
    super(brand); // Must run before accessing 'this'
    this.batteryKwh = batteryKwh;
  }

  accelerate(delta) {
    const status = super.accelerate(delta);
    return \`\${status} [EV • \${this.batteryKwh} kWh]\`;
  }
}

const ev = new ElectricCar('BYD', 75);
console.log(ev.accelerate(40));
console.log(ev instanceof Vehicle); // true`,
            playground: {
              html: `<div class="panel">
  <h3>Vehicle &amp; ElectricCar Subclass Demo</h3>
  <div class="row">
    <button id="boost">Accelerate +20 km/h</button>
    <button id="reset" class="alt">Stop (0 km/h)</button>
  </div>
  <pre id="out"></pre>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; background: #f8fafc; color: #0f172a; margin: 0; }
.panel { max-width: 460px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; display: grid; gap: 10px; }
h3 { margin: 0; font-size: 16px; }
.row { display: flex; gap: 8px; }
button { padding: 7px 12px; border: none; border-radius: 8px; background: #2563eb; color: #fff; font-weight: 600; cursor: pointer; }
button.alt { background: #64748b; }
pre { margin: 0; padding: 12px; background: #0f172a; color: #e2e8f0; border-radius: 8px; font-size: 13px; line-height: 1.6; }`,
              js: `class Vehicle {
  constructor(brand) {
    this.brand = brand;
    this.speed = 0;
  }
  accelerate(delta) {
    this.speed = Math.max(0, this.speed + delta);
    return \`\${this.brand}: \${this.speed} km/h\`;
  }
}

class ElectricCar extends Vehicle {
  constructor(brand, batteryPercent) {
    super(brand);
    this.batteryPercent = batteryPercent;
  }
  accelerate(delta) {
    if (delta > 0) this.batteryPercent = Math.max(0, this.batteryPercent - 2);
    return \`\${super.accelerate(delta)} | Battery: \${this.batteryPercent}%\`;
  }
}

const car = new ElectricCar('Rivian', 100);
const outEl = document.getElementById('out');

function show(line) {
  outEl.textContent =
    \`\${line}\\n\` +
    \`car instanceof ElectricCar: \${car instanceof ElectricCar}\\n\` +
    \`car instanceof Vehicle    : \${car instanceof Vehicle}\`;
}

document.getElementById('boost').addEventListener('click', () => show(car.accelerate(20)));
document.getElementById('reset').addEventListener('click', () => {
  car.speed = 0;
  show(car.accelerate(0));
});

show(car.accelerate(0));`,
            },
          },
          warning:
            'Touching this before calling super(...) inside a subclass constructor throws a ReferenceError! Always call super() first.',
        },
      ],
      challenge: {
        prompt:
          'Create a Notification class with a private #createdAt timestamp (set to Date.now() in constructor), a message property, a getter createdAt, and a send() method returning "Sending: <message>". Then create an EmailNotification subclass using extends and super that also accepts a subject and overrides send() to return "[<subject>] " + super.send().',
        hint: 'Declare #createdAt; inside Notification, call super(message) first inside EmailNotification’s constructor, and reuse super.send().',
        language: 'javascript',
        solutionCode: `class Notification {
  #createdAt;

  constructor(message) {
    this.message = message;
    this.#createdAt = Date.now();
  }

  get createdAt() {
    return this.#createdAt;
  }

  send() {
    return \`Sending: \${this.message}\`;
  }
}

class EmailNotification extends Notification {
  constructor(subject, message) {
    super(message);
    this.subject = subject;
  }

  send() {
    return \`[\${this.subject}] \${super.send()}\`;
  }
}

const mail = new EmailNotification('Welcome', 'Your CodeHub account is live!');
console.log(mail.send(), mail.createdAt);`,
      },
      quiz: [
        {
          question: 'What happens if external code tries to access account.#balance directly?',
          options: [
            'It returns undefined silently.',
            'It returns the value because # is only a naming convention.',
            'JavaScript throws a SyntaxError because #privateFields are enforced by the language.',
            'It converts #balance into a public string.',
          ],
          answer: 2,
          explanation:
            'Hash-prefixed fields (#balance) are genuine language-enforced private fields—accessing them outside the class body is a SyntaxError.',
        },
        {
          question:
            'Inside a subclass constructor (class Child extends Parent), what must happen before you access this?',
          options: [
            'You must call super(...).',
            'You must call Object.freeze(this).',
            'You must declare a static method.',
            'Nothing—this is immediately available before super().',
          ],
          answer: 0,
          explanation:
            'In derived classes, the parent constructor initializes the instance; reading or assigning to this before calling super() throws a ReferenceError.',
        },
      ],
    },
    km: {
      title: 'Classes, ការលាក់ទិន្នន័យ (Encapsulation) និងការស្នងមរតក (Inheritance)',
      duration: '15 នាទី',
      summary:
        'រៀបចំស្ថានភាព និងមុខងារស្មុគស្មាញដោយ ES classes, ការពារទិន្នន័យខាងក្នុងដោយ #privateFields និង getters ព្រមទាំងចែករំលែកកូដរវាងថ្នាក់ដោយ extends និង super។',
      objectives: [
        'បង្កើតគំរូប្រើឡើងវិញដោយ class, constructor(), instance methods, static helpers និង get/set។',
        'ការពារស្ថានភាពខាងក្នុងពិតប្រាកដដោយ #privateFields ដើម្បីកុំឱ្យកូដខាងក្រៅកែខូចច្បាប់ទិន្នន័យ។',
        'ស្នង និងបន្ថែមមុខងារលើថ្នាក់កូនដោយ extends, super(), ការសរសេរជាន់ method និង instanceof។',
      ],
      sections: [
        {
          id: 'class-syntax-and-constructors',
          heading: 'គំរូ Class, Constructor, Getters និង Static Methods',
          body: [
            'Class ក្នុង JavaScript ជាគំរូស្អាតសម្រាប់បង្កើត object ច្រើនដែលមានលក្ខណៈសម្បត្តិ និងមុខងារដូចគ្នា។ ក្នុង class វិធីពិសេស constructor() រត់ដោយស្វ័យប្រវត្តិពេលអ្នកបង្កើត instance ដោយ new ClassName(...) ដើម្បីកំណត់តម្លៃដំបូងលើ this។',
            'ក្រៅពី instance methods ធម្មតា (ដែលចែករំលែកលើ prototype) class ក៏គាំទ្រ static methods ដែលភ្ជាប់ជាមួយ class ផ្ទាល់ (ដូចជា User.fromJSON(str)) និង get/set accessors សម្រាប់គណនា ឬផ្ទៀងផ្ទាត់តម្លៃដូចជា property ធម្មតា។',
          ],
          points: [
            'ដាក់ឈ្មោះ class ជា PascalCase ជានិច្ច (ដូចជា CourseCard, BankAccount) ដើម្បីបង្ហាញថាត្រូវហៅដោយ new។',
            'Method ក្នុង class ស្ថិតលើ prototype ដូច្នេះ instance ១,០០០ ចែករំលែកកូដ method តែមួយក្នុងអង្គចងចាំ។',
            'កូដខាងក្នុង class តែងដំណើរការក្នុង strict mode ("use strict") ដោយស្វ័យប្រវត្តិ។',
          ],
          table: {
            headers: ['សមាជិក (Member)', 'វាក្យសម្ព័ន្ធ', 'កម្មសិទ្ធិ / ដែនប្រើប្រាស់'],
            rows: [
              [
                'Constructor',
                'constructor(name) { ... }',
                'រត់ពេល new MyClass() ដើម្បីកំណត់តម្លៃដំបូង',
              ],
              ['Instance method', 'greet() { ... }', 'ចែករំលែកលើ prototype ប្រើ this អាន instance'],
              ['Static method', 'static create() { ... }', 'ហៅផ្ទាល់លើ class (MyClass.create())'],
              ['Getter / Setter', 'get total() { ... }', 'អានតម្លៃគណនា ឬត្រួតពិនិត្យពេលកំណត់តម្លៃ'],
              ['Private field', '#balance = 0;', 'អាចប្រើបានតែខាងក្នុង class នោះប៉ុណ្ណោះ'],
              [
                'Inheritance',
                'class Dog extends Animal',
                'ស្នង methods; ថ្នាក់កូនត្រូវហៅ super() មុន',
              ],
            ],
          },
          exampleTitle: 'Class ជាមួយ Constructor, Getter និង Static Factory',
          warning:
            'ខុសពី function declaration ការប្រកាស class មិនអាចហៅមុនបន្ទាត់ប្រកាសទេ—ហើយការហៅ class ដោយគ្មាន new នឹងបង្ក TypeError។',
        },
        {
          id: 'encapsulation-with-private-fields',
          heading: 'ការលាក់ទិន្នន័យពិតប្រាកដដោយ #privateFields',
          body: [
            'កាលពីមុន អ្នកអភិវឌ្ឍន៍ដាក់សញ្ញា _ ខាងមុខឈ្មោះ (ដូចជា _balance) គ្រាន់ជាសញ្ញាប្រាប់ថាកុំប៉ះ ប៉ុន្តែកូដខាងក្រៅនៅតែអាចកែ account._balance = -999999 បាន។ JavaScript ទំនើបដោះស្រាយបញ្ហានេះដោយវាក្យសម្ព័ន្ធ #privateFields (#balance) និង #privateMethods (#log)។',
            'Private fields ត្រូវប្រកាសនៅខាងលើនៃ class។ កូដណាមួយនៅខាងក្រៅ class ដែលព្យាយាមអាន ឬកែ account.#balance នឹងជួបកំហុស SyntaxError ភ្លាម។ ការលាក់ទិន្នន័យហើយបើកតែ method ដែលមានការផ្ទៀងផ្ទាត់ (deposit, withdraw) និង getter (get balance()) ធានាថាច្បាប់ទិន្នន័យមិនអាចត្រូវបានរំលោភ។',
          ],
          points: [
            'Private fields ត្រូវបានលាក់ពិតប្រាកដ—មិនបង្ហាញក្នុង Object.keys(), JSON.stringify() ឬ for...in ទេ។',
            'បង្ហាញតម្លៃសម្រាប់តែអានតាម getter (get balance() { return this.#balance; })។',
            'ផ្ទៀងផ្ទាត់អាគុយម៉ង់ក្នុង method ហើយ throw Error ច្បាស់លាស់មុនពេលកែប្រែស្ថានភាពឯកជន។',
          ],
          exampleTitle: 'BankAccount ដែលការពារដោយ #balance Private Field',
          tip: 'លាក់វាលទិន្នន័យជា private ជាលំនាំដើម ហើយបន្ថែម getter តែពេលកូដខាងក្រៅត្រូវការអាន—ធ្វើឱ្យងាយកែសម្រួលរចនាសម្ព័ន្ធខាងក្នុងនៅពេលក្រោយ។',
        },
        {
          id: 'inheritance-with-extends-and-super',
          heading: 'ការស្នងមរតកដោយ extends, super និងការសរសេរជាន់ Method',
          body: [
            'នៅពេលប្រភេទជាក់លាក់មួយចែករំលែកមុខងារមូលដ្ឋានជាមួយថ្នាក់មេ (ទំនាក់ទំនង "is-a") សូមប្រើ extends ដើម្បីស្នង constructor និង methods។ ក្នុង constructor នៃថ្នាក់កូន អ្នកត្រូវតែហៅ super(...) មុនគេដើម្បីដំណើរការ constructor ថ្នាក់មេ និងបង្កើត this មុនពេលកំណត់លក្ខណៈសម្បត្តិថ្នាក់កូន។',
            'ថ្នាក់កូនអាចសរសេរជាន់ (override) method របស់ថ្នាក់មេ—ហើយនៅតែអាចហៅប្រើតក្កវិទ្យារបស់ថ្នាក់មេឡើងវិញតាម super.methodName()។ អ្នកក៏អាចពិនិត្យដើមកំណើតថ្នាក់នៅពេលដំណើរការដោយ obj instanceof ParentClass ផងដែរ។',
          ],
          points: [
            'បើថ្នាក់កូនមិនសរសេរ constructor ផ្ទាល់ខ្លួនទេ JavaScript នឹងបញ្ជូនអាគុយម៉ង់ទៅ super(...args) ដោយស្វ័យប្រវត្តិ។',
            'ថ្នាក់កូនមិនអាចអាន #privateFields របស់ថ្នាក់មេផ្ទាល់បានទេ ត្រូវទាក់ទងតាម method ឬ getter។',
            'រក្សាកម្រិត extends ឱ្យរាក់ (១–២ ជាន់)។ សម្រាប់មុខងារស្មុគស្មាញ គួរផ្សំ object តូចៗ (composition) ជំនួស។',
          ],
          exampleTitle: 'ការស្នងពី Vehicle ទៅ ElectricCar ដោយប្រើ super',
          warning:
            'ការប៉ះពាល់ this មុនពេលហៅ super(...) ក្នុង constructor នៃថ្នាក់កូន នឹងបង្កកំហុស ReferenceError! ត្រូវហៅ super() មុនគេជានិច្ច។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើត class ឈ្មោះ Notification ដែលមាន private field #createdAt (កំណត់ជា Date.now() ក្នុង constructor), លក្ខណៈសម្បត្តិ message, getter ឈ្មោះ createdAt និង method send() ត្រឡប់ "Sending: <message>"។ បន្ទាប់មកបង្កើតថ្នាក់កូន EmailNotification ដោយ extends និង super ដែលទទួល subject ផង ហើយសរសេរជាន់ send() ត្រឡប់ "[<subject>] " + super.send()។',
        hint: 'ប្រកាស #createdAt; ក្នុង Notification, ហៅ super(message) មុនគេក្នុង constructor របស់ EmailNotification និងហៅប្រើ super.send() ឡើងវិញ។',
      },
      quiz: [
        {
          question: 'តើមានអ្វីកើតឡើងបើកូដខាងក្រៅព្យាយាមអាន account.#balance ដោយផ្ទាល់?',
          options: [
            'វាត្រឡប់ undefined ដោយស្ងាត់ៗ។',
            'វាត្រឡប់តម្លៃធម្មតា ព្រោះ # គ្រាន់ជាទម្លាប់ដាក់ឈ្មោះ។',
            'JavaScript បង្ហាញកំហុស SyntaxError ព្រោះ #privateFields ត្រូវបានការពារដោយភាសាផ្ទាល់។',
            'វាបម្លែង #balance ទៅជា string សាធារណៈ។',
          ],
          answer: 2,
          explanation:
            'វាលដែលមានសញ្ញា # ខាងមុខ (#balance) ជា private field ពិតប្រាកដដែលភាសាបង្ខំ—ការអានពីខាងក្រៅ class បង្ក SyntaxError។',
        },
        {
          question:
            'ក្នុង constructor នៃថ្នាក់កូន (class Child extends Parent) តើត្រូវធ្វើអ្វីមុនពេលប្រើ this?',
          options: [
            'ត្រូវតែហៅ super(...) មុនគេ។',
            'ត្រូវហៅ Object.freeze(this)។',
            'ត្រូវប្រកាស static method។',
            'មិនបាច់ធ្វើអ្វីទេ—this អាចប្រើបានភ្លាមមុន super()។',
          ],
          answer: 0,
          explanation:
            'ក្នុងថ្នាក់កូន constructor ថ្នាក់មេជាអ្នកបង្កើត this; ការអាន ឬកំណត់តម្លៃលើ this មុនពេលហៅ super() នឹងបង្ក ReferenceError។',
        },
      ],
    },
  },

  // =========================================================================
  // 6. JSON, FETCH API & TRY/CATCH ERROR HANDLING
  // =========================================================================
  {
    slug: 'js-json-fetch-errors',
    level: 'pro',
    insertAfter: 'events-and-interactivity',
    en: {
      title: 'JSON, Fetch API & Error Handling',
      duration: '16 min',
      summary:
        'Serialize data safely with JSON, call HTTP APIs reliably with fetch() and response.ok checks, and build resilient error handling using try/catch/finally, custom Error classes, and AbortController.',
      objectives: [
        'Parse and serialize JSON safely with JSON.parse() and JSON.stringify(), avoiding strict-syntax and data-loss pitfalls.',
        'Send GET and POST requests with fetch() and async/await while explicitly verifying response.ok for HTTP 4xx/5xx errors.',
        'Handle failures cleanly using try/catch/finally, custom Error subclasses, and request cancellation via AbortController.',
      ],
      sections: [
        {
          id: 'json-parse-and-stringify',
          heading: 'JSON Serialization: JSON.stringify() & JSON.parse()',
          body: [
            'JSON (JavaScript Object Notation) is the universal text format used to exchange data between browsers, servers, and localStorage. Although JSON looks like a JavaScript object literal, its syntax is much stricter: all property names and strings must use double quotes ("..."), trailing commas and comments are forbidden, and only plain data types (objects, arrays, strings, numbers, booleans, null) are valid.',
            'Use JSON.stringify(value, null, 2) to turn JavaScript data into readable JSON text, and JSON.parse(text) to turn JSON text back into live JavaScript values. Because untrusted or corrupted text makes JSON.parse() throw a SyntaxError, always wrap parsing in a try/catch block.',
          ],
          points: [
            'JSON.stringify() silently drops properties whose value is undefined, a function, or a Symbol, and turns Date objects into ISO strings.',
            'Pass (data, null, 2) to JSON.stringify() for clean 2-space pretty-printed output in logs or debug views.',
            'Always validate parsed JSON before assuming nested properties exist (especially from localStorage or third-party APIs).',
          ],
          table: {
            headers: ['Feature', 'JavaScript Object', 'Strict JSON Text'],
            rows: [
              [
                'Property keys',
                'Unquoted or single/double quotes',
                'Must use double quotes ("key")',
              ],
              ['Strings', 'Single, double, or backticks', 'Must use double quotes ("value")'],
              ['Trailing commas', 'Allowed ({ a: 1, })', 'Forbidden (throws SyntaxError)'],
              ['Functions / undefined', 'Allowed', 'Not supported (dropped by stringify)'],
              ['Comments', '// and /* */ allowed', 'Forbidden'],
            ],
          },
          example: {
            title: 'Safe JSON Parser Helper for localStorage or API Payloads',
            language: 'javascript',
            code: `function safeJsonParse(rawText, fallback = null) {
  try {
    return JSON.parse(rawText);
  } catch {
    return fallback;
  }
}

const payload = { user: 'Dara', score: 98, tempFn: () => {}, empty: undefined };
const serialized = JSON.stringify(payload, null, 2);

console.log('Serialized:\\n' + serialized); // tempFn and empty are omitted!
console.log('Valid parse:', safeJsonParse(serialized));
console.log('Broken parse:', safeJsonParse('{ bad json }', { error: true }));`,
            playground: {
              html: `<div class="panel">
  <h3>Live JSON Validator &amp; Formatter</h3>
  <textarea id="input" rows="5">{"course": "JavaScript", "lessons": 13, "active": true}</textarea>
  <button id="format">Parse &amp; Pretty-Print</button>
  <pre id="out"></pre>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; background: #f8fafc; color: #0f172a; margin: 0; }
.panel { max-width: 500px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; display: grid; gap: 10px; }
h3 { margin: 0; font-size: 16px; }
textarea { font-family: monospace; font-size: 13px; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; }
button { width: fit-content; padding: 7px 14px; border: none; border-radius: 8px; background: #2563eb; color: #fff; font-weight: 600; cursor: pointer; }
pre { margin: 0; padding: 12px; background: #0f172a; color: #e2e8f0; border-radius: 8px; font-size: 12.5px; line-height: 1.5; white-space: pre-wrap; }`,
              js: `const inputEl = document.getElementById('input');
const outEl = document.getElementById('out');

function validate() {
  try {
    const parsed = JSON.parse(inputEl.value);
    outEl.style.color = '#86efac';
    outEl.textContent = 'VALID JSON:\\n' + JSON.stringify(parsed, null, 2);
  } catch (err) {
    outEl.style.color = '#fca5a5';
    outEl.textContent = \`SyntaxError: \${err.message}\\nTip: Check for single quotes or trailing commas.\`;
  }
}

document.getElementById('format').addEventListener('click', validate);
validate();`,
            },
          },
          warning:
            'Calling JSON.parse() on malformed input without try/catch immediately crashes your script! Always guard JSON.parse() when reading external strings or localStorage.',
        },
        {
          id: 'fetch-api-and-response-ok',
          heading: 'Calling HTTP APIs with fetch() & Checking response.ok',
          body: [
            'The browser’s built-in fetch(url, options) function returns a Promise that resolves to a Response object. Reading the body is a second async step—usually await response.json() for JSON APIs or await response.text() for plain text. When sending data with POST or PATCH, specify the method, set the Content-Type: application/json header, and serialize the body with JSON.stringify().',
            'Here is the #1 bug in beginner fetch() code: fetch() ONLY rejects its Promise on network failures (offline, DNS error, CORS block) or aborts. An HTTP 404 Not Found or 500 Internal Server Error still resolves normally! Always check if (!response.ok) before calling response.json() so server errors are caught and handled properly.',
          ],
          points: [
            'response.ok is true for HTTP status codes 200–299 and false for 4xx/5xx error responses.',
            'For POST/PUT requests sending JSON, always set headers: { "Content-Type": "application/json" } and body: JSON.stringify(data).',
            'A Response body stream can only be consumed once—do not call response.json() twice on the same Response.',
          ],
          example: {
            title: 'Production GET & POST Requests with response.ok Guard',
            language: 'javascript',
            code: `async function createTask(title) {
  const response = await fetch('https://api.example.com/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, completed: false }),
  });

  if (!response.ok) {
    throw new Error(\`Request failed with HTTP \${response.status}\`);
  }

  return await response.json();
}`,
          },
          warning:
            'fetch() does NOT throw on HTTP 404 or 500! If you skip if (!response.ok), your code will silently treat an error page as valid data or crash while parsing HTML as JSON.',
        },
        {
          id: 'try-catch-custom-errors-and-abort',
          heading: 'try / catch / finally, Custom Errors & AbortController',
          body: [
            'Robust async applications separate expected HTTP failures from unexpected crashes. By subclassing the built-in Error class (for example, class HttpError extends Error), you can attach structured metadata like status codes while keeping stack traces and instanceof checks intact. Use finally for guaranteed cleanup—such as hiding a loading spinner or clearing a timeout—whether the try block succeeded or failed.',
            'Real users navigate away, type new search queries, or sit on flaky connections. AbortController lets you cancel an in-flight fetch() cleanly by passing controller.signal to fetch(url, { signal }) and calling controller.abort() (or using AbortSignal.timeout(5000) for automatic timeouts). When aborted, fetch() rejects with an error whose name is "AbortError", which you can ignore rather than displaying an alarming error banner.',
          ],
          points: [
            'Always throw real Error instances (throw new HttpError(...)), never plain strings, so stack traces are preserved.',
            'Use finally to clear timers (clearTimeout) and reset loading UI state regardless of success or failure.',
            'Check error.name === "AbortError" in catch blocks so intentional cancellations are handled gracefully.',
          ],
          example: {
            title: 'Custom HttpError + Timeout Cancellation with AbortController',
            language: 'javascript',
            code: `class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

async function fetchProfile(url, timeoutMs = 4000) {
  const controller = new AbortController();
  const timerId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new HttpError(res.status, \`HTTP \${res.status} error\`);
    return await res.json();
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Request timed out — please retry.');
    }
    throw err;
  } finally {
    clearTimeout(timerId);
  }
}`,
            playground: {
              html: `<div class="panel">
  <h3>Resilient Fetch + AbortController Demo</h3>
  <div class="row">
    <button id="ok">Simulate 200 OK</button>
    <button id="err" class="warn">Simulate 404</button>
    <button id="cancel" class="alt" disabled>Cancel In-Flight</button>
  </div>
  <pre id="out">Click a button to test try/catch/finally and AbortController.</pre>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; background: #f8fafc; color: #0f172a; margin: 0; }
.panel { max-width: 500px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; display: grid; gap: 10px; }
h3 { margin: 0; font-size: 16px; }
.row { display: flex; flex-wrap: wrap; gap: 8px; }
button { padding: 7px 12px; border: none; border-radius: 8px; background: #2563eb; color: #fff; font-weight: 600; cursor: pointer; }
button.warn { background: #d97706; }
button.alt { background: #dc2626; }
button:disabled { opacity: 0.45; cursor: not-allowed; }
pre { margin: 0; padding: 12px; background: #0f172a; color: #e2e8f0; border-radius: 8px; font-size: 12.5px; line-height: 1.6; white-space: pre-wrap; }`,
              js: `class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

// Simulates a 1.4s network request that respects AbortSignal
function mockFetch(status, { signal }) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      resolve({
        ok: status >= 200 && status < 300,
        status,
        json: async () => ({ status, user: 'Vanna', track: 'JavaScript Pro' }),
      });
    }, 1400);

    signal.addEventListener('abort', () => {
      clearTimeout(timer);
      const abortErr = new Error('Request aborted by user');
      abortErr.name = 'AbortError';
      reject(abortErr);
    });
  });
}

let activeController = null;
const outEl = document.getElementById('out');
const cancelBtn = document.getElementById('cancel');

async function runRequest(status) {
  if (activeController) activeController.abort();
  activeController = new AbortController();
  cancelBtn.disabled = false;
  outEl.textContent = \`Loading (simulating HTTP \${status})... click "Cancel In-Flight" to abort.\`;

  try {
    const res = await mockFetch(status, { signal: activeController.signal });
    if (!res.ok) throw new HttpError(res.status, \`Server returned HTTP \${res.status}\`);
    const data = await res.json();
    outEl.textContent = 'SUCCESS:\\n' + JSON.stringify(data, null, 2);
  } catch (err) {
    if (err.name === 'AbortError') {
      outEl.textContent = 'CANCELLED: AbortController stopped the request cleanly.';
    } else if (err instanceof HttpError) {
      outEl.textContent = \`HTTP ERROR (\${err.status}): \${err.message}\`;
    } else {
      outEl.textContent = \`UNEXPECTED ERROR: \${err.message}\`;
    }
  } finally {
    cancelBtn.disabled = true;
    activeController = null;
  }
}

document.getElementById('ok').addEventListener('click', () => runRequest(200));
document.getElementById('err').addEventListener('click', () => runRequest(404));
cancelBtn.addEventListener('click', () => activeController?.abort());`,
            },
          },
          tip: 'In modern browsers and Node 18+, AbortSignal.timeout(5000) creates a self-cancelling signal in one line without manually managing setTimeout and clearTimeout.',
        },
      ],
      challenge: {
        prompt:
          'Define a custom HttpError class extending Error (storing status), then write an async function fetchJsonWithTimeout(url, ms = 4000) that uses AbortController to cancel slow requests, checks response.ok (throwing HttpError on failure), returns await response.json(), and always clears its timeout inside finally.',
        hint: 'Create const controller = new AbortController(); const id = setTimeout(() => controller.abort(), ms);, pass { signal: controller.signal } to fetch, and call clearTimeout(id) in finally.',
        language: 'javascript',
        solutionCode: `class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

async function fetchJsonWithTimeout(url, ms = 4000) {
  const controller = new AbortController();
  const timerId = setTimeout(() => controller.abort(), ms);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new HttpError(response.status, \`HTTP error \${response.status}\`);
    }
    return await response.json();
  } finally {
    clearTimeout(timerId);
  }
}`,
      },
      quiz: [
        {
          question: 'When a server responds with HTTP 404 Not Found, what does fetch(url) do?',
          options: [
            'It immediately rejects the Promise and jumps into catch.',
            'It resolves normally with response.ok set to false and response.status equal to 404.',
            'It retries the request three times automatically.',
            'It returns null instead of a Response object.',
          ],
          answer: 1,
          explanation:
            'fetch() only rejects on network failures or aborts. HTTP 4xx and 5xx responses resolve with response.ok === false, so you must explicitly check if (!response.ok).',
        },
        {
          question:
            'Why should cleanup logic like clearTimeout(timerId) or hiding a loading spinner go inside a finally block?',
          options: [
            'Because finally runs only when an error is thrown.',
            'Because finally runs faster than try.',
            'Because finally always executes whether the try block succeeds or throws an error.',
            'Because catch blocks cannot access outer variables.',
          ],
          answer: 2,
          explanation:
            'A finally block runs unconditionally after try/catch finishes, guaranteeing timers are cleared and loading indicators are never stuck on screen.',
        },
      ],
    },
    km: {
      title: 'JSON, Fetch API និងការដោះស្រាយកំហុស (try/catch)',
      duration: '16 នាទី',
      summary:
        'បម្លែងទិន្នន័យដោយសុវត្ថិភាពជាមួយ JSON, ហៅ HTTP API យ៉ាងរឹងមាំជាមួយ fetch() និងការពិនិត្យ response.ok ព្រមទាំងដោះស្រាយកំហុសដោយ try/catch/finally, Custom Error និង AbortController។',
      objectives: [
        'បម្លែង JSON ទៅវិញទៅមកដោយសុវត្ថិភាពជាមួយ JSON.parse() និង JSON.stringify() ដោយជៀសវាងកំហុសវាក្យសម្ព័ន្ធ និងការបាត់ទិន្នន័យ។',
        'ផ្ញើសំណើ GET និង POST ដោយ fetch() និង async/await ព្រមទាំងពិនិត្យ response.ok សម្រាប់កំហុស HTTP 4xx/5xx។',
        'គ្រប់គ្រងកំហុសយ៉ាងស្អាតដោយ try/catch/finally, ថ្នាក់ Error ផ្ទាល់ខ្លួន និងការបោះបង់សំណើតាម AbortController។',
      ],
      sections: [
        {
          id: 'json-parse-and-stringify',
          heading: 'ការបម្លែង JSON៖ JSON.stringify() និង JSON.parse()',
          body: [
            'JSON (JavaScript Object Notation) ជាទម្រង់អត្ថបទសកលសម្រាប់ផ្លាស់ប្ដូរទិន្នន័យរវាងកម្មវិធីរុករក ម៉ាស៊ីនមេ និង localStorage។ ទោះមើលទៅស្រដៀង object របស់ JavaScript តែ JSON មានច្បាប់តឹងរ៉ឹងជាង៖ គ្រប់ឈ្មោះគន្លឹះ និងអត្ថបទត្រូវប្រើសញ្ញាដកស្រង់ពីរ ("..."), ហាមដាក់ក្បៀសចុងក្រោយ ឬ comment និងគាំទ្រតែទិន្នន័យធម្មតា (objects, arrays, strings, numbers, booleans, null)។',
            'ប្រើ JSON.stringify(value, null, 2) ដើម្បីបម្លែងទិន្នន័យ JavaScript ជាអត្ថបទ JSON និង JSON.parse(text) ដើម្បីបម្លែងត្រឡប់មកវិញ។ ដោយសារអត្ថបទខូចធ្វើឱ្យ JSON.parse() បង្ក SyntaxError សូមរុំវាក្នុង try/catch ជានិច្ច។',
          ],
          points: [
            'JSON.stringify() លុបចោលដោយស្ងាត់ៗនូវគន្លឹះដែលមានតម្លៃ undefined, function ឬ Symbol ហើយបម្លែង Date ជាអត្ថបទ ISO។',
            'បញ្ជូន (data, null, 2) ទៅ JSON.stringify() ដើម្បីបង្ហាញកូដ JSON មានរបៀបរៀបរយងាយអាន។',
            'ផ្ទៀងផ្ទាត់ទិន្នន័យក្រោយ JSON.parse() មុននឹងសន្មតថាគន្លឹះខាងក្នុងមានពិត។',
          ],
          table: {
            headers: ['លក្ខណៈ', 'JavaScript Object', 'អត្ថបទ JSON តឹងរ៉ឹង'],
            rows: [
              [
                'ឈ្មោះគន្លឹះ (Keys)',
                'មិនដាក់ ឬដាក់សញ្ញាដកស្រង់មួយ/ពីរ',
                'ត្រូវតែដាក់សញ្ញាដកស្រង់ពីរ ("key")',
              ],
              [
                'អត្ថបទ (Strings)',
                'សញ្ញាដកស្រង់មួយ ពីរ ឬ backtick',
                'ត្រូវតែដាក់សញ្ញាដកស្រង់ពីរ ("value")',
              ],
              ['ក្បៀសចុងក្រោយ', 'អនុញ្ញាត ({ a: 1, })', 'ហាមឃាត់ (បង្ក SyntaxError)'],
              ['Functions / undefined', 'អនុញ្ញាត', 'មិនគាំទ្រ (ត្រូវលុបដោយ stringify)'],
              ['Comments', 'អនុញ្ញាត // និង /* */', 'ហាមឃាត់'],
            ],
          },
          exampleTitle: 'អនុគមន៍អាន JSON ដោយសុវត្ថិភាពសម្រាប់ localStorage ឬ API',
          warning:
            'ការហៅ JSON.parse() លើអត្ថបទខូចទម្រង់ដោយគ្មាន try/catch នឹងធ្វើឱ្យស្គ្រីបគាំងភ្លាម! ត្រូវការពារ JSON.parse() ជានិច្ចពេលអានទិន្នន័យពីខាងក្រៅ ឬ localStorage។',
        },
        {
          id: 'fetch-api-and-response-ok',
          heading: 'ការហៅ HTTP API ដោយ fetch() និងការពិនិត្យ response.ok',
          body: [
            'អនុគមន៍ fetch(url, options) ដែលភ្ជាប់មកស្រាប់ក្នុងកម្មវិធីរុករក ត្រឡប់ Promise ដែលផ្ដល់ Response object។ ការអានខ្លឹមសារជាជំហាន async ទីពីរ—ជាទូទៅ await response.json() សម្រាប់ JSON API ឬ await response.text() សម្រាប់អត្ថបទធម្មតា។ ពេលផ្ញើទិន្នន័យដោយ POST ឬ PATCH ត្រូវកំណត់ method, header Content-Type: application/json និងបម្លែង body ដោយ JSON.stringify()។',
            'កំហុសលេខ ១ របស់អ្នកថ្មីក្នុងការប្រើ fetch() គឺ៖ fetch() បដិសេធ (reject) តែពេលដាច់បណ្ដាញ ឬត្រូវបោះបង់ប៉ុណ្ណោះ! កំហុស HTTP 404 ឬ 500 នៅតែ resolve ធម្មតា។ ដូច្នេះត្រូវពិនិត្យ if (!response.ok) ជានិច្ចមុនពេលហៅ response.json()។',
          ],
          points: [
            'response.ok ស្មើ true សម្រាប់លេខកូដ HTTP 200–299 និង false សម្រាប់កំហុស 4xx/5xx។',
            'សម្រាប់សំណើ POST/PUT ដែលផ្ញើ JSON ត្រូវកំណត់ headers: { "Content-Type": "application/json" } និង body: JSON.stringify(data)។',
            'Response body អាចអានបានតែម្ដងគត់—កុំហៅ response.json() ពីរដងលើ Response តែមួយ។',
          ],
          exampleTitle: 'សំណើ POST ប្រើប្រាស់ពិតដោយមានការពិនិត្យ response.ok',
          warning:
            'fetch() មិន throw កំហុសលើ HTTP 404 ឬ 500 ទេ! បើអ្នករំលង if (!response.ok) កូដរបស់អ្នកនឹងច្រឡំទំព័រកំហុសថាជាទិន្នន័យត្រឹមត្រូវ ឬគាំងពេលអាន HTML ជា JSON។',
        },
        {
          id: 'try-catch-custom-errors-and-abort',
          heading: 'try / catch / finally, Custom Errors និង AbortController',
          body: [
            'កម្មវិធី async រឹងមាំត្រូវបែងចែករវាងកំហុស HTTP ដែលរំពឹងទុក និងកំហុសគាំងផ្សេងៗ។ ការបង្កើតថ្នាក់កូនពី Error (ដូចជា class HttpError extends Error) អនុញ្ញាតឱ្យអ្នកភ្ជាប់ព័ត៌មានបន្ថែមដូចជា status code ដោយរក្សា stack trace និង instanceof ឱ្យនៅដដែល។ ប្រើ finally សម្រាប់ការសម្អាតចាំបាច់—ដូចជាបិទសញ្ញា loading ឬលុប timer—មិនថាសំណើជោគជ័យ ឬបរាជ័យឡើយ។',
            'អ្នកប្រើប្រាស់អាចប្ដូរទំព័រ វាយពាក្យស្វែងរកថ្មី ឬជួបបណ្ដាញយឺត។ AbortController អនុញ្ញាតឱ្យអ្នកបោះបង់សំណើ fetch() កំពុងរត់យ៉ាងស្អាតដោយបញ្ជូន controller.signal ទៅ fetch(url, { signal }) ហើយហៅ controller.abort()។ ពេលត្រូវបោះបង់ fetch() នឹង reject ជាមួយ error.name === "AbortError" ដែលអ្នកអាចដោះស្រាយដោយមិនបាច់បង្ហាញផ្ទាំងកំហុសគួរឱ្យភ័យ។',
          ],
          points: [
            'ត្រូវ throw object ប្រភេទ Error ជានិច្ច (throw new HttpError(...)) កុំ throw អត្ថបទធម្មតា ដើម្បីរក្សា stack trace។',
            'ប្រើ finally ដើម្បី clearTimeout និងបិទស្ថានភាព loading មិនថា try ជោគជ័យ ឬចូល catch។',
            'ពិនិត្យ error.name === "AbortError" ក្នុង catch ដើម្បីបែងចែកការបោះបង់ដោយចេតនាពីកំហុសបណ្ដាញ។',
          ],
          exampleTitle: 'Custom HttpError និងការកំណត់ Timeout ដោយ AbortController',
          tip: 'ក្នុងកម្មវិធីរុករកទំនើប និង Node 18+ អ្នកអាចប្រើ AbortSignal.timeout(5000) ក្នុងមួយបន្ទាត់ដោយមិនបាច់គ្រប់គ្រង setTimeout និង clearTimeout ដោយដៃទេ។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើត class HttpError ដែល extends Error (រក្សាទុក status) បន្ទាប់មកសរសេរអនុគមន៍ async function fetchJsonWithTimeout(url, ms = 4000) ដែលប្រើ AbortController ដើម្បីបោះបង់សំណើយឺត, ពិនិត្យ response.ok (throw HttpError បើបរាជ័យ), ត្រឡប់ await response.json() និងលុប timeout ក្នុង finally ជានិច្ច។',
        hint: 'បង្កើត const controller = new AbortController(); const timerId = setTimeout(() => controller.abort(), ms); បញ្ជូន { signal: controller.signal } ទៅ fetch រួចហៅ clearTimeout(timerId) ក្នុង finally។',
      },
      quiz: [
        {
          question: 'នៅពេលម៉ាស៊ីនមេឆ្លើយតបជាមួយ HTTP 404 Not Found តើ fetch(url) ធ្វើដូចម្ដេច?',
          options: [
            'វា reject Promise ភ្លាមៗហើយលោតចូល catch។',
            'វា resolve ធម្មតាដោយ response.ok ស្មើ false និង response.status ស្មើ 404។',
            'វាព្យាយាមហៅម្ដងទៀតបីដងដោយស្វ័យប្រវត្តិ។',
            'វាត្រឡប់ null ជំនួសឱ្យ Response object។',
          ],
          answer: 1,
          explanation:
            'fetch() reject តែពេលដាច់បណ្ដាញ ឬត្រូវបោះបង់។ ចម្លើយ HTTP 4xx/5xx resolve ជាមួយ response.ok === false ដូច្នេះត្រូវពិនិត្យ if (!response.ok) ដោយខ្លួនឯង។',
        },
        {
          question:
            'ហេតុអ្វីបានជាការសម្អាតដូចជា clearTimeout(timerId) ឬការបិទ loading spinner គួរដាក់ក្នុងប្លុក finally?',
          options: [
            'ព្រោះ finally រត់តែពេលមានកំហុសប៉ុណ្ណោះ។',
            'ព្រោះ finally រត់លឿនជាង try។',
            'ព្រោះ finally តែងតែដំណើរការជានិច្ច មិនថាប្លុក try ជោគជ័យ ឬបង្កកំហុសទេ។',
            'ព្រោះប្លុក catch មិនអាចប្រើអថេរខាងក្រៅបានទេ។',
          ],
          answer: 2,
          explanation:
            'ប្លុក finally ដំណើរការជានិច្ចក្រោយចប់ try/catch ដោយធានាថា timer ត្រូវបានលុប និងសញ្ញា loading មិនជាប់គាំងលើអេក្រង់ឡើយ។',
        },
      ],
    },
  },
]
