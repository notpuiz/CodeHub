export const pythonExpanded = [
  // =========================================================================
  // 1. STRINGS, SLICING & FORMATTING
  // =========================================================================
  {
    slug: 'python-strings-and-slicing',
    level: 'beginner',
    insertAfter: 'python-basics',
    en: {
      title: 'Strings, Slicing & Formatting',
      duration: '12 min',
      summary:
        'Master Python string indexing, [start:stop:step] slicing, text-cleaning methods (.strip(), .split(), .join()), and modern f-string format specifiers to parse and format text cleanly.',
      objectives: [
        'Extract substrings, skip characters, and reverse text using positive/negative indices and [start:stop:step] slices.',
        'Clean, split, transform, and reassemble real-world text with .strip(), .split(), .join(), and .replace().',
        'Format numbers, currencies, percentages, and aligned columns using f-string format specifiers.',
      ],
      sections: [
        {
          id: 'string-indexing-and-slicing',
          heading: 'Indexing, Negative Indices & Slicing ([start:stop:step])',
          body: [
            'In Python, a string (str) is an immutable sequence of Unicode characters. Every character has two positions: a zero-based positive index from the left (0, 1, 2, ...) and a negative index from the right (-1 for the last character, -2 for the second-to-last). Negative indexing lets you grab file extensions or trailing symbols without computing len(text) - 1.',
            'Slicing uses the syntax text[start:stop:step] to return a brand-new substring starting at start and stopping just BEFORE stop. Omitting start defaults to the beginning, omitting stop defaults to the end, and a negative step walks backward—making text[::-1] the idiomatic way to reverse a string.',
          ],
          points: [
            'The stop index is always exclusive: "Python"[0:4] returns "Pyth" (indices 0, 1, 2, 3).',
            'Out-of-range slices never raise IndexError—they clamp safely to the string boundaries, whereas single indexing like text[99] raises IndexError.',
            'Strings are immutable: you cannot assign text[0] = "J"; instead, construct a new string via slicing or methods.',
          ],
          table: {
            headers: ['Slice Expression', 'Meaning', 'Example on "CODEHUB"', 'Result'],
            rows: [
              ['s[0] / s[-1]', 'First / last character', '"CODEHUB"[0] / [-1]', '"C" / "B"'],
              ['s[start:stop]', 'Substring from start to stop - 1', '"CODEHUB"[0:4]', '"CODE"'],
              ['s[start:]', 'From start through the end', '"CODEHUB"[4:]', '"HUB"'],
              ['s[:stop]', 'From beginning up to stop - 1', '"CODEHUB"[:4]', '"CODE"'],
              ['s[::step]', 'Every step-th character', '"CODEHUB"[::2]', '"CDHB"'],
              ['s[::-1]', 'Full string reversed', '"CODEHUB"[::-1]', '"BUHEDOC"'],
            ],
          },
          example: {
            title: 'Extracting Structured Fields with Slicing',
            language: 'python',
            code: `sku = "KH-2026-LAPTOP-09"

country = sku[:2]
year = sku[3:7]
last_two = sku[-2:]
every_second = sku[::3]
reversed_code = country[::-1]

print("Country:", country)
print("Year:", year)
print("Batch:", last_two)
print("Sampled:", every_second)
print("Reversed country:", reversed_code)`,
            output: `Country: KH
Year: 2026
Batch: 09
Sampled: K26AO0
Reversed country: HK`,
          },
          warning:
            'Trying to mutate a character in place—such as name[0] = "A"—raises TypeError: "str" object does not support item assignment. Always build a new string instead (e.g. "A" + name[1:]).',
        },
        {
          id: 'string-methods-split-join-strip',
          heading: 'Cleaning & Transforming Text (.strip(), .split(), .join())',
          body: [
            'Real-world input from forms, CSV files, and terminal prompts is almost always messy: extra whitespace, inconsistent casing, or delimiter-separated values. Because strings are immutable, every string method returns a new string (or list) without modifying the original variable, making method chaining clean and predictable.',
            'Use .strip() to remove leading and trailing whitespace (or specific edge characters), .split(sep) to break a string into a list of tokens, and separator.join(items) to glue an iterable of strings back together efficiently. Calling .split() with no arguments splits on any run of whitespace and automatically discards extra spaces and newlines.',
          ],
          points: [
            'Use .lstrip() or .rstrip() when you only want to trim one side of a string (for example, trailing "\\n" from file lines).',
            'Prefer separator.join(parts) over concatenating strings inside a loop with +=, because join() allocates memory once.',
            'Use .casefold() or .lower() before comparing user input so "Admin" and "admin" match reliably.',
            'Check prefixes and suffixes safely with .startswith() and .endswith()—both even accept a tuple of options like (".png", ".jpg").',
          ],
          example: {
            title: 'Normalizing User Tags with .strip(), .split() & .join()',
            language: 'python',
            code: `raw_line = "  Python ,  data-science,  WEB APIs , python  \\n"

cleaned_tags = []
for part in raw_line.strip().split(","):
    tag = part.strip().lower().replace(" ", "-")
    if tag and tag not in cleaned_tags:
        cleaned_tags.append(tag)

slug_header = " | ".join(cleaned_tags)
print("Parsed list:", cleaned_tags)
print("Formatted:", slug_header)
print("Starts with python?", slug_header.startswith("python"))`,
            output: `Parsed list: ['python', 'data-science', 'web-apis']
Formatted: python | data-science | web-apis
Starts with python? True`,
          },
          tip: 'Remember that .join() only accepts strings. If your list contains integers, convert them first with ", ".join(str(n) for n in numbers) to avoid a TypeError.',
        },
        {
          id: 'f-strings-and-format-specs',
          heading: 'f-Strings & Format Specifiers',
          body: [
            'Formatted string literals—known as f-strings (introduced in Python 3.6)—let you embed any Python expression directly inside curly braces {expr}. They are faster, shorter, and far easier to read than older % formatting or .format() calls.',
            'After a colon inside the braces ({value:spec}), you can apply Python mini-language format specifiers to control decimal places (:.2f), thousands separators (:,), percentages (:.1%), column alignment (<, >, ^), and zero-padding (:04d). Adding an equals sign ({total=}) prints both the expression name and its value, which is great for quick debugging.',
          ],
          points: [
            'Combine separators and decimals together: f"{amount:,.2f}" formats 12500.5 as "12,500.50".',
            'Use alignment widths (< left, > right, ^ center) to build crisp terminal tables without external libraries.',
            'Use {variable=} during development to inspect variable names and values in one line.',
          ],
          table: {
            headers: ['Format Spec', 'Purpose', 'Example', 'Output'],
            rows: [
              [':.2f', 'Fixed-point with 2 decimals', 'f"{49.5:.2f}"', '"49.50"'],
              [':,', 'Thousands comma separator', 'f"{1250000:,}"', '"1,250,000"'],
              [':.1%', 'Multiply by 100 & add %', 'f"{0.874:.1%}"', '"87.4%"'],
              [':04d', 'Zero-pad integer to width 4', 'f"{7:04d}"', '"0007"'],
              [':>10 / :<10', 'Right / left align in 10 chars', 'f"{\'Hi\':>5}"', '"   Hi"'],
              ['{x=}', 'Debug name + value print', 'f"{score=}"', '"score=95"'],
            ],
          },
          example: {
            title: 'Building an Aligned Receipt with f-String Specifiers',
            language: 'python',
            code: `items = [
    ("Mechanical Keyboard", 2, 74.5),
    ("USB-C Hub", 1, 29.0),
    ("Desk Mat", 3, 12.75),
]
tax_rate = 0.10

print(f"{'Item':<22}{'Qty':>4}{'Subtotal':>12}")
print("-" * 38)
subtotal = 0.0
for name, qty, price in items:
    line_total = qty * price
    subtotal += line_total
    print(f"{name:<22}{qty:>4}\${line_total:>11,.2f}")

grand_total = subtotal * (1 + tax_rate)
print("-" * 38)
print(f"Tax ({tax_rate:.0%}): \${subtotal * tax_rate:,.2f}")
print(f"Grand Total: \${grand_total:,.2f}")`,
            output: `Item                   Qty    Subtotal
--------------------------------------
Mechanical Keyboard      2$     149.00
USB-C Hub                1$      29.00
Desk Mat                 3$      38.25
--------------------------------------
Tax (10%): $21.62
Grand Total: $237.88`,
          },
          tip: 'To put the currency sign flush against the digits inside an aligned column, format the money string first (f"${line_total:,.2f}") and align the resulting string: f"{money:>12}".',
        },
      ],
      challenge: {
        prompt:
          'Write a function format_invoice_code(raw_name, invoice_num, total) that trims whitespace from raw_name, takes the first 3 letters in uppercase, pads invoice_num to 5 digits with leading zeros, and returns a string like "KHM-00042 ($1,250.50)".',
        hint: 'Use raw_name.strip()[:3].upper() for the prefix, {invoice_num:05d} for zero-padding, and {total:,.2f} for the formatted currency.',
        language: 'python',
        solutionCode: `def format_invoice_code(raw_name, invoice_num, total):
    prefix = raw_name.strip()[:3].upper()
    return f"{prefix}-{invoice_num:05d} (\${total:,.2f})"

print(format_invoice_code("  khmer-tech ", 42, 1250.5))
print(format_invoice_code("CodeHub", 7, 99))`,
      },
      quiz: [
        {
          question: 'What does "ALGORITHM"[1:6:2] evaluate to in Python?',
          options: ['"LGR"', '"LOI"', '"AGO"', '"GOR"'],
          answer: 1,
          explanation:
            'Index 1 is "L", step +2 goes to index 3 ("O"), and step +2 goes to index 5 ("I"). Index 7 is past the stop index 6, so the result is "LOI".',
        },
        {
          question:
            'Which expression correctly joins the list words = ["api", "v2", "users"] with "/"?',
          options: ['words.join("/")', '"/".join(words)', 'join("/", words)', 'words.split("/")'],
          answer: 1,
          explanation:
            'In Python, .join() is a method on the separator string, not on the list—so "/".join(words) returns "api/v2/users".',
        },
      ],
    },
    km: {
      title: 'ខ្សែអក្សរ ការកាត់ Slicing និងការរៀបចំទម្រង់',
      duration: '12 នាទី',
      summary:
        'ស្ទាត់ជំនាញលិបិក្រមខ្សែអក្សរ ការកាត់ [start:stop:step] វិធីសាស្ត្រសម្អាតអត្ថបទ (.strip(), .split(), .join()) និង f-string format specifiers ដើម្បីញែក និងបង្ហាញអត្ថបទយ៉ាងស្អាត។',
      objectives: [
        'ដកស្រង់ផ្នែកអត្ថបទ រំលងតួអក្សរ និងត្រឡប់អត្ថបទដោយប្រើលិបិក្រមវិជ្ជមាន អវិជ្ជមាន និង [start:stop:step]។',
        'សម្អាត បំបែក ប្ដូរ និងភ្ជាប់អត្ថបទជាក់ស្ដែងដោយប្រើ .strip(), .split(), .join() និង .replace()។',
        'រៀបចំទម្រង់លេខ រូបិយប័ណ្ណ ភាគរយ និងជួរឈរតម្រឹមយ៉ាងស្អាតដោយ f-string format specifiers។',
      ],
      sections: [
        {
          id: 'string-indexing-and-slicing',
          heading: 'លិបិក្រម លិបិក្រមអវិជ្ជមាន និងការកាត់ ([start:stop:step])',
          body: [
            'ក្នុង Python ខ្សែអក្សរ (str) គឺជាលំដាប់តួអក្សរ Unicode ដែលមិនអាចកែប្រែផ្ទាល់បាន (immutable)។ តួអក្សរនីមួយៗមានទីតាំងពីរ៖ លិបិក្រមវិជ្ជមានចាប់ពី 0 ពីឆ្វេងទៅស្ដាំ (0, 1, 2, ...) និងលិបិក្រមអវិជ្ជមានពីស្ដាំទៅឆ្វេង (-1 ជាតួអក្សរចុងក្រោយ, -2 ជាតួបន្ទាប់ពីចុងក្រោយ)។ លិបិក្រមអវិជ្ជមានជួយឱ្យអ្នកទាញយកផ្នែកចុងក្រោយដោយមិនបាច់គណនា len(text) - 1។',
            'ការកាត់ (Slicing) ប្រើទម្រង់ text[start:stop:step] ដើម្បីបង្កើតខ្សែអក្សរថ្មីចាប់ពី start រហូតដល់មុន stop មួយជំហាន។ បើមិនដាក់ start វាចាប់ពីដើម បើមិនដាក់ stop វាទៅដល់ចុង ហើយបើ step អវិជ្ជមាន វាដើរថយក្រោយ—ដូច្នេះ text[::-1] ជាវិធីស្តង់ដារសម្រាប់ត្រឡប់ខ្សែអក្សរ។',
          ],
          points: [
            'លិបិក្រម stop តែងតែមិនរាប់បញ្ចូល៖ "Python"[0:4] ផ្ដល់ "Pyth" (លិបិក្រម 0, 1, 2, 3)។',
            'ការកាត់ដែលលើសប្រវែងមិនបង្ក IndexError ទេ តែការចូលប្រើតួអក្សរតែមួយលើសប្រវែងដូច text[99] នឹងបង្ក IndexError។',
            'ខ្សែអក្សរជា immutable៖ មិនអាចសរសេរ text[0] = "J" បានទេ ត្រូវបង្កើតខ្សែអក្សរថ្មីជំនួស។',
          ],
          table: {
            headers: ['កន្សោមកាត់', 'អត្ថន័យ', 'ឧទាហរណ៍លើ "CODEHUB"', 'លទ្ធផល'],
            rows: [
              ['s[0] / s[-1]', 'តួអក្សរដំបូង / ចុងក្រោយ', '"CODEHUB"[0] / [-1]', '"C" / "B"'],
              ['s[start:stop]', 'ពី start ដល់ stop - 1', '"CODEHUB"[0:4]', '"CODE"'],
              ['s[start:]', 'ពី start ដល់ចុងបញ្ចប់', '"CODEHUB"[4:]', '"HUB"'],
              ['s[:stop]', 'ពីដើមដល់ stop - 1', '"CODEHUB"[:4]', '"CODE"'],
              ['s[::step]', 'យករាល់ step តួអក្សរ', '"CODEHUB"[::2]', '"CDHB"'],
              ['s[::-1]', 'ត្រឡប់ខ្សែអក្សរទាំងមូល', '"CODEHUB"[::-1]', '"BUHEDOC"'],
            ],
          },
          exampleTitle: 'ការដកស្រង់ទិន្នន័យមានរចនាសម្ព័ន្ធដោយ Slicing',
          warning:
            'ការព្យាយាមកែតួអក្សរផ្ទាល់ដូចជា name[0] = "A" នឹងបង្ក TypeError ព្រោះ str ជា immutable។ ត្រូវបង្កើតខ្សែអក្សរថ្មីជំនួស (ឧទាហរណ៍ "A" + name[1:])។',
        },
        {
          id: 'string-methods-split-join-strip',
          heading: 'ការសម្អាត និងបម្លែងអត្ថបទ (.strip(), .split(), .join())',
          body: [
            'ទិន្នន័យអត្ថបទពីទម្រង់បញ្ចូល ឯកសារ CSV ឬស្ថានីយតែងតែមានដកឃ្លាលើស អក្សរធំតូចមិនស្មើ ឬសញ្ញាបំបែក។ ដោយសារ str ជា immutable គ្រប់វិធីសាស្ត្រទាំងអស់សុទ្ធតែត្រឡប់ខ្សែអក្សរ ឬបញ្ជីថ្មីដោយមិនប៉ះពាល់អថេរដើមឡើយ។',
            'ប្រើ .strip() ដើម្បីលុបដកឃ្លាដើម និងចុង, .split(sep) ដើម្បីបំបែកអត្ថបទជាបញ្ជីពាក្យ និង separator.join(items) ដើម្បីភ្ជាប់ធាតុខ្សែអក្សរមកវិញយ៉ាងលឿន។ ការហៅ .split() ដោយគ្មានប៉ារ៉ាម៉ែត្រនឹងបំបែកតាមដកឃ្លាគ្រប់ប្រភេទ និងលុបដកឃ្លាទំនេរដោយស្វ័យប្រវត្តិ។',
          ],
          points: [
            'ប្រើ .lstrip() ឬ .rstrip() ពេលចង់កាត់ដកឃ្លាតែម្ខាង (ដូចជាលុប "\\n" នៅចុងបន្ទាត់)។',
            'គួរប្រើ separator.join(parts) ជំនួសការបូកខ្សែអក្សរ += ក្នុងរង្វិលជុំ ព្រោះ join() ប្រើអង្គចងចាំមានប្រសិទ្ធភាពជាង។',
            'ប្រើ .lower() ឬ .casefold() មុនប្រៀបធៀបអត្ថបទអ្នកប្រើ ដើម្បីឱ្យ "Admin" និង "admin" ស្មើគ្នា។',
            'ពិនិត្យផ្នែកដើម និងចុងដោយ .startswith() និង .endswith() ដែលទទួល tuple ជម្រើសបានផងដែរ។',
          ],
          exampleTitle: 'ការសម្អាតស្លាកអ្នកប្រើដោយ .strip(), .split() និង .join()',
          tip: 'សូមចងចាំថា .join() ទទួលតែខ្សែអក្សរប៉ុណ្ណោះ។ បើបញ្ជីមានលេខ ត្រូវបម្លែងជាមុនដោយ ", ".join(str(n) for n in numbers) ដើម្បីកុំឱ្យកើត TypeError។',
        },
        {
          id: 'f-strings-and-format-specs',
          heading: 'f-Strings និង Format Specifiers',
          body: [
            'f-strings (Formatted string literals) អនុញ្ញាតឱ្យអ្នកដាក់កន្សោម Python ផ្ទាល់ក្នុងវង់ក្រចក {expr}។ វាលឿន ខ្លី និងងាយអានជាងវិធី % ឬ .format() ចាស់ៗឆ្ងាយណាស់។',
            'នៅក្រោយសញ្ញាចុចពីរ ({value:spec}) អ្នកអាចកំណត់ចំនួនខ្ទង់ទសភាគ (:.2f), សញ្ញាក្បៀសពាន់ (:,), ភាគរយ (:.1%), ការតម្រឹមជួរ (<, >, ^) និងការបំពេញសូន្យខាងមុខ (:04d)។ ការបន្ថែមសញ្ញាស្មើ ({total=}) បង្ហាញទាំងឈ្មោះ និងតម្លៃអថេរ សម្រាប់ការពិនិត្យកំហុសរហ័ស។',
          ],
          points: [
            'អាចផ្សំក្បៀសពាន់ និងទសភាគរួមគ្នា៖ f"{amount:,.2f}" បម្លែង 12500.5 ទៅជា "12,500.50"។',
            'ប្រើការតម្រឹម (< ឆ្វេង, > ស្ដាំ, ^ កណ្ដាល) ដើម្បីបង្កើតតារាងស្អាតលើស្ថានីយ។',
            'ប្រើ {variable=} ពេល debug ដើម្បីមើលទាំងឈ្មោះអថេរ និងតម្លៃក្នុងមួយបន្ទាត់។',
          ],
          table: {
            headers: ['Format Spec', 'មុខងារ', 'ឧទាហរណ៍', 'លទ្ធផល'],
            rows: [
              [':.2f', 'ទសភាគ 2 ខ្ទង់', 'f"{49.5:.2f}"', '"49.50"'],
              [':,', 'ដាក់ក្បៀសខ្ទង់ពាន់', 'f"{1250000:,}"', '"1,250,000"'],
              [':.1%', 'គុណ 100 និងដាក់ %', 'f"{0.874:.1%}"', '"87.4%"'],
              [':04d', 'បំពេញលេខ 0 ឱ្យគ្រប់ 4 ខ្ទង់', 'f"{7:04d}"', '"0007"'],
              [':>10 / :<10', 'តម្រឹមស្ដាំ / ឆ្វេង 10 តួ', 'f"{\'Hi\':>5}"', '"   Hi"'],
              ['{x=}', 'បង្ហាញឈ្មោះ និងតម្លៃ debug', 'f"{score=}"', '"score=95"'],
            ],
          },
          exampleTitle: 'ការបង្កើតវិក្កយបត្រតម្រឹមជួរដោយ f-String Specifiers',
          tip: 'ដើម្បីឱ្យសញ្ញា $ ជាប់នឹងលេខក្នុងជួរតម្រឹមស្ដាំ សូមបង្កើតអត្ថបទប្រាក់ជាមុន (f"${line_total:,.2f}") រួចសឹមតម្រឹមវា៖ f"{money:>12}"។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ format_invoice_code(raw_name, invoice_num, total) ដែលលុបដកឃ្លាដើម/ចុងពី raw_name, យកអក្សរ 3 តួដំបូងជាអក្សរធំ, បំពេញសូន្យឱ្យ invoice_num គ្រប់ 5 ខ្ទង់ និងត្រឡប់អត្ថបទដូចជា "KHM-00042 ($1,250.50)"។',
        hint: 'ប្រើ raw_name.strip()[:3].upper() សម្រាប់បុព្វបទ, {invoice_num:05d} សម្រាប់បំពេញសូន្យ និង {total:,.2f} សម្រាប់ទម្រង់ប្រាក់។',
      },
      quiz: [
        {
          question: 'តើ "ALGORITHM"[1:6:2] ផ្ដល់លទ្ធផលអ្វីក្នុង Python?',
          options: ['"LGR"', '"LOI"', '"AGO"', '"GOR"'],
          answer: 1,
          explanation:
            'លិបិក្រម 1 គឺ "L", បូក 2 បានលិបិក្រម 3 ("O") និងបូក 2 បានលិបិក្រម 5 ("I")។ លិបិក្រម 7 លើស stop 6 ដូច្នេះលទ្ធផលគឺ "LOI"។',
        },
        {
          question:
            'តើកន្សោមណាភ្ជាប់បញ្ជី words = ["api", "v2", "users"] ដោយសញ្ញា "/" បានត្រឹមត្រូវ?',
          options: ['words.join("/")', '"/".join(words)', 'join("/", words)', 'words.split("/")'],
          answer: 1,
          explanation:
            'ក្នុង Python វិធីសាស្ត្រ .join() ជារបស់ខ្សែអក្សរសញ្ញាបំបែក មិនមែនជារបស់បញ្ជីទេ—ដូច្នេះ "/".join(words) ត្រឡប់ "api/v2/users"។',
        },
      ],
    },
  },

  // =========================================================================
  // 2. TUPLES, SETS & UNPACKING
  // =========================================================================
  {
    slug: 'python-tuples-and-sets',
    level: 'beginner',
    insertAfter: 'lists-and-dicts',
    en: {
      title: 'Tuples, Sets & Unpacking',
      duration: '12 min',
      summary:
        'Learn how immutable tuples protect fixed records, how starred unpacking (*rest) simplifies variable assignment, and how sets provide O(1) lookups plus union, intersection, and difference operations.',
      objectives: [
        'Create and unpack tuples cleanly—including single-element tuples and extended *rest unpacking.',
        'Use sets to eliminate duplicates, check membership in O(1) time, and combine collections with |, &, -, and ^.',
        'Choose the right built-in collection (list vs tuple vs set) for safety, clarity, and performance.',
      ],
      sections: [
        {
          id: 'tuples-immutability-and-unpacking',
          heading: 'Immutable Tuples & Starred Unpacking (*rest)',
          body: [
            'A tuple is an ordered, immutable sequence written with commas—typically wrapped in parentheses like (11.5564, 104.9282). Because a tuple cannot be resized or mutated after creation, Python uses less memory for it, protects fixed-structure data (like coordinates, RGB colors, or database rows), and allows tuples containing immutable elements to serve as dictionary keys or set items.',
            'Tuple unpacking lets you assign every element to named variables in a single statement, swap two variables without a temporary holder (a, b = b, a), and capture multiple return values from a function. With extended unpacking (*middle or *rest), one starred target collects any remaining elements into a list.',
          ],
          points: [
            'A one-item tuple MUST include a trailing comma: ("solo",). Without the comma, ("solo") is just a string in parentheses.',
            'Functions that return multiple values—like return min_val, max_val—actually return a single tuple that callers unpack directly.',
            'Use _ as a throwaway variable when unpacking fields you do not need, e.g. name, _, role = record.',
          ],
          example: {
            title: 'Tuple Unpacking, Swapping & *rest Capture',
            language: 'python',
            code: `def analyze_scores(scores):
    return min(scores), max(scores), sum(scores) / len(scores)

low, high, avg = analyze_scores([78, 92, 85, 96, 88])
print(f"Min: {low}, Max: {high}, Avg: {avg:.1f}")

# Extended unpacking with *rest
header, *rows, footer = ["START", "row-1", "row-2", "row-3", "END"]
print("Header:", header)
print("Rows:", rows)
print("Footer:", footer)

# Single-element tuple gotcha
not_a_tuple = ("Python")
real_tuple = ("Python",)
print(type(not_a_tuple).__name__, "vs", type(real_tuple).__name__)`,
            output: `Min: 78, Max: 96, Avg: 87.8
Header: START
Rows: ['row-1', 'row-2', 'row-3']
Footer: END
str vs tuple`,
          },
          warning:
            'Parentheses alone do not create a 1-element tuple: (42) evaluates to the integer 42, not a tuple. Always add a trailing comma: (42,). Also remember that if a tuple holds a mutable list inside it, the list itself can still be modified.',
        },
        {
          id: 'sets-uniqueness-and-operations',
          heading: 'Sets, Fast Membership & Set Operations (|, &, -, ^)',
          body: [
            'A set is an unordered collection of unique, hashable elements. Whenever you add a duplicate item, the set ignores it automatically. Because sets are backed by a hash table, checking x in my_set runs in O(1) average time—making sets dramatically faster than scanning a large list with x in my_list (O(n)).',
            'Sets shine when comparing groups of data using mathematical operators: union (|) combines all unique items from both sets, intersection (&) finds items present in both, difference (-) keeps items only in the left set, and symmetric difference (^) keeps items in either set but not both.',
          ],
          points: [
            'Create an empty set with set()—never {}, because {} creates an empty dictionary!',
            'Use .discard(item) instead of .remove(item) when the element might already be absent; .discard() never raises KeyError.',
            'Set elements must be hashable (int, str, tuple of immutables); lists and dicts cannot be placed inside a set.',
          ],
          table: {
            headers: ['Operator', 'Method Equivalent', 'Meaning', 'Example ({1,2,3} op {3,4})'],
            rows: [
              ['a | b', 'a.union(b)', 'All unique items in a or b', '{1, 2, 3, 4}'],
              ['a & b', 'a.intersection(b)', 'Items common to both a and b', '{3}'],
              ['a - b', 'a.difference(b)', 'Items in a but not in b', '{1, 2}'],
              ['a ^ b', 'a.symmetric_difference(b)', 'Items in a or b, not both', '{1, 2, 4}'],
              ['a <= b', 'a.issubset(b)', 'True if every item of a is in b', 'False'],
              ['x in a', 'Membership test', 'O(1) average lookup', '2 in {1, 2, 3} -> True'],
            ],
          },
          example: {
            title: 'Comparing User Permissions with Set Operations',
            language: 'python',
            code: `editor_perms = {"read", "write", "comment", "upload"}
viewer_perms = {"read", "comment", "export"}

shared = editor_perms & viewer_perms
editor_only = editor_perms - viewer_perms
all_perms = editor_perms | viewer_perms
exclusive = editor_perms ^ viewer_perms

print("Shared:", sorted(shared))
print("Editor only:", sorted(editor_only))
print("Combined:", sorted(all_perms))
print("Exclusive:", sorted(exclusive))
print("Can editor upload?", "upload" in editor_perms)`,
            output: `Shared: ['comment', 'read']
Editor only: ['upload', 'write']
Combined: ['comment', 'export', 'read', 'upload', 'write']
Exclusive: ['export', 'upload', 'write']
Can editor upload? True`,
          },
          warning:
            'Writing empty = {} creates an empty dict, NOT an empty set! Always call set() when initializing an empty set, and never depend on set iteration order when predictable output is required (wrap with sorted() for display).',
        },
        {
          id: 'choosing-tuples-sets-lists',
          heading: 'Choosing Between Lists, Tuples & Sets in Practice',
          body: [
            'Picking the right container communicates intent to every reader of your code. Use a list when you have a homogeneous collection that grows, shrinks, or gets reordered (like a queue of tasks). Use a tuple when position carries meaning and the record should stay fixed (like (city, lat, lon) or composite dict keys).',
            'Use a set when uniqueness and fast lookup matter more than position (like visited URLs, allowed tags, or blocked IDs). When you need to deduplicate a list while preserving its original first-seen order, combine a seen set with a loop or use dict.fromkeys(items).',
          ],
          points: [
            'Tuples can be used as dictionary keys—ideal for 2D grid coordinates like board[(row, col)] = "X".',
            'Use frozenset when you need an immutable set (for example, as a dictionary key or an element inside another set).',
            'list(dict.fromkeys(items)) removes duplicates in O(n) time while preserving insertion order.',
          ],
          example: {
            title: 'Order-Preserving Deduplication & Tuple Dict Keys',
            language: 'python',
            code: `visited_cities = ["Phnom Penh", "Siem Reap", "Kampot", "Phnom Penh", "Siem Reap"]
unique_in_order = list(dict.fromkeys(visited_cities))
print("Route:", unique_in_order)

# Tuples as composite dictionary keys
seat_map = {
    (1, "A"): "Dara",
    (1, "B"): "Sokha",
    (2, "A"): "Nita",
}
for (row, col), passenger in seat_map.items():
    print(f"Row {row} Seat {col}: {passenger}")`,
            output: `Route: ['Phnom Penh', 'Siem Reap', 'Kampot']
Row 1 Seat A: Dara
Row 1 Seat B: Sokha
Row 2 Seat A: Nita`,
          },
          tip: 'You can unpack nested tuples directly in a for loop—like for (row, col), passenger in seat_map.items():—keeping your loop body readable and bug-free.',
        },
      ],
      challenge: {
        prompt:
          'Given required_skills = {"python", "sql", "git", "docker"} and candidate_skills = ["python", "git", "html", "python"], convert candidate_skills to a set, compute (1) matched skills and (2) missing skills as sorted lists, and return them as a tuple (matched, missing).',
        hint: 'Convert the list with cand = set(candidate_skills), then use required & cand for matched skills and required - cand for missing skills.',
        language: 'python',
        solutionCode: `def evaluate_skills(required_skills, candidate_skills):
    cand = set(candidate_skills)
    matched = sorted(required_skills & cand)
    missing = sorted(required_skills - cand)
    return matched, missing

req = {"python", "sql", "git", "docker"}
cand_list = ["python", "git", "html", "python"]
matched, missing = evaluate_skills(req, cand_list)
print("Matched:", matched)
print("Missing:", missing)`,
      },
      quiz: [
        {
          question:
            'After running first, *middle, last = [10, 20, 30, 40, 50], what is the value and type of middle?',
          options: [
            '(20, 30, 40) (tuple)',
            '[20, 30, 40] (list)',
            '{20, 30, 40} (set)',
            '20 (int)',
          ],
          answer: 1,
          explanation:
            'Starred unpacking (*middle) always produces a list containing all remaining elements—even when unpacking a tuple or string.',
        },
        {
          question:
            'Which statement correctly creates an empty set and checks elements unique to set a (not in set b)?',
          options: [
            's = {} and a | b',
            's = set() and a - b',
            's = () and a & b',
            's = set() and a ^ b',
          ],
          answer: 1,
          explanation:
            'set() creates an empty set (whereas {} creates an empty dict), and a - b returns elements present in a that are not in b.',
        },
      ],
    },
    km: {
      title: 'Tuples, Sets និងការស្រាយតម្លៃ (Unpacking)',
      duration: '12 នាទី',
      summary:
        'ស្វែងយល់ពីរបៀបដែល tuple ការពារទិន្នន័យថេរ ការស្រាយតម្លៃដោយ *rest និងរបៀបដែល set ផ្ដល់ការស្វែងរកលឿន O(1) ព្រមទាំងប្រមាណវិធីសំណុំ |, &, -, ^។',
      objectives: [
        'បង្កើត និងស្រាយតម្លៃ tuple យ៉ាងស្អាត រួមទាំង tuple មួយធាតុ និងការស្រាយ *rest។',
        'ប្រើ set ដើម្បីលុបទិន្នន័យស្ទួន ពិនិត្យសមាជិកក្នុងពេល O(1) និងធ្វើប្រមាណវិធី |, &, -, ^។',
        'ជ្រើសរើសរចនាសម្ព័ន្ធទិន្នន័យត្រឹមត្រូវ (list ទល់នឹង tuple ទល់នឹង set) ដើម្បីសុវត្ថិភាព និងល្បឿន។',
      ],
      sections: [
        {
          id: 'tuples-immutability-and-unpacking',
          heading: 'Tuple មិនអាចកែប្រែបាន និងការស្រាយតម្លៃ (*rest)',
          body: [
            'Tuple គឺជាលំដាប់ទិន្នន័យដែលមានលំដាប់ និងមិនអាចកែប្រែបាន (immutable) សរសេរដោយសញ្ញាក្បៀស និងវង់ក្រចក ដូចជា (11.5564, 104.9282)។ ដោយសារមិនអាចប្ដូរទំហំ ឬតម្លៃក្រោយបង្កើត Python ប្រើអង្គចងចាំតិច ការពារកំណត់ត្រាថេរ (ដូចកូអរដោនេ ឬពណ៌ RGB) ហើយអាចប្រើ tuple ជា key ក្នុង dictionary បានទៀតផង។',
            'Tuple unpacking អនុញ្ញាតឱ្យអ្នកផ្ដល់តម្លៃទៅអថេរច្រើនក្នុងមួយបន្ទាត់ ប្ដូរតម្លៃអថេរពីរដោយមិនបាច់មានអថេរជំនួយ (a, b = b, a) និងទទួលលទ្ធផលច្រើនពីអនុគមន៍។ ជាមួយ *rest អ្នកអាចចាប់យកធាតុដែលនៅសល់ទាំងអស់ដាក់ក្នុងបញ្ជីតែមួយ។',
          ],
          points: [
            'Tuple ដែលមានធាតុតែមួយត្រូវតែមានក្បៀសនៅចុង៖ ("solo",)។ បើគ្មានក្បៀស ("solo") គ្រាន់តែជា str ធម្មតា។',
            'អនុគមន៍ដែល return តម្លៃច្រើនដូច return min_val, max_val ពិតជាត្រឡប់ tuple តែមួយដែលអ្នកហៅអាចស្រាយយកភ្លាម។',
            'ប្រើ _ សម្រាប់ធាតុដែលអ្នកមិនត្រូវការប្រើ ដូចជា name, _, role = record។',
          ],
          exampleTitle: 'ការស្រាយ Tuple, ការប្ដូរតម្លៃ និងការចាប់យកដោយ *rest',
          warning:
            'វង់ក្រចកតែឯងមិនបង្កើត tuple មួយធាតុទេ៖ (42) គឺជាលេខ int 42 ប៉ុណ្ណោះ។ ត្រូវដាក់ក្បៀសជានិច្ច៖ (42,)។ ម្យ៉ាងទៀត បើ tuple មាន list ខាងក្នុង ធាតុក្នុង list នោះនៅតែអាចកែប្រែបាន។',
        },
        {
          id: 'sets-uniqueness-and-operations',
          heading: 'Sets ការស្វែងរកលឿន និងប្រមាណវិធីសំណុំ (|, &, -, ^)',
          body: [
            'Set គឺជាបណ្ដុំធាតុដែលគ្មានលំដាប់ និងមិនស្ទួន (unique) ហើយធាតុត្រូវតែ hashable។ ពេលអ្នកបន្ថែមធាតុស្ទួន set នឹងរំលងដោយស្វ័យប្រវត្តិ។ ដោយសារ set ប្រើ hash table ការពិនិត្យ x in my_set ប្រើពេលមធ្យមត្រឹម O(1)—លឿនជាងការរកក្នុង list (O(n)) ឆ្ងាយណាស់។',
            'Set ល្អបំផុតសម្រាប់ប្រៀបធៀបក្រុមទិន្នន័យដោយប្រមាណវិធីគណិត៖ សហភាព (|) ផ្ដុំធាតុទាំងអស់, ប្រសព្វ (&) រកធាតុដូចគ្នា, ផលដក (-) រកធាតុមានតែខាងឆ្វេង និងផលដកស៊ីមេទ្រី (^) រកធាតុមានតែម្ខាងៗ។',
          ],
          points: [
            'បង្កើត set ទទេដោយ set()—កុំប្រើ {} ព្រោះ {} បង្កើត dictionary ទទេ!',
            'ប្រើ .discard(item) ជំនួស .remove(item) ពេលធាតុអាចនឹងគ្មានក្នុង set ព្រោះ .discard() មិនបង្ក KeyError ទេ។',
            'ធាតុក្នុង set ត្រូវតែ hashable (int, str, tuple) មិនអាចដាក់ list ឬ dict ចូលក្នុង set បានទេ។',
          ],
          table: {
            headers: ['ប្រមាណវិធី', 'វិធីសាស្ត្រសមមូល', 'អត្ថន័យ', 'ឧទាហរណ៍ ({1,2,3} op {3,4})'],
            rows: [
              ['a | b', 'a.union(b)', 'ធាតុទាំងអស់ក្នុង a ឬ b', '{1, 2, 3, 4}'],
              ['a & b', 'a.intersection(b)', 'ធាតុដែលមានទាំងក្នុង a និង b', '{3}'],
              ['a - b', 'a.difference(b)', 'ធាតុមានក្នុង a តែគ្មានក្នុង b', '{1, 2}'],
              ['a ^ b', 'a.symmetric_difference(b)', 'ធាតុមានតែក្នុង a ឬតែក្នុង b', '{1, 2, 4}'],
              ['a <= b', 'a.issubset(b)', 'True បើគ្រប់ធាតុនៃ a នៅក្នុង b', 'False'],
              ['x in a', 'ពិនិត្យសមាជិក', 'ស្វែងរកលឿនមធ្យម O(1)', '2 in {1, 2, 3} -> True'],
            ],
          },
          exampleTitle: 'ការប្រៀបធៀបសិទ្ធិអ្នកប្រើដោយប្រមាណវិធី Set',
          warning:
            'ការសរសេរ empty = {} បង្កើត dict ទទេ មិនមែន set ទទេទេ! ត្រូវហៅ set() ជានិច្ច ហើយកុំពឹងលើលំដាប់របស់ set ពេលបង្ហាញលទ្ធផល (ប្រើ sorted() បើត្រូវការលំដាប់ច្បាស់)។',
        },
        {
          id: 'choosing-tuples-sets-lists',
          heading: 'ការជ្រើសរើសរវាង List, Tuple និង Set ក្នុងការងារជាក់ស្ដែង',
          body: [
            'ការជ្រើសរើសរចនាសម្ព័ន្ធទិន្នន័យសមស្របជួយបង្ហាញបំណងកូដយ៉ាងច្បាស់។ ប្រើ list ពេលទិន្នន័យអាចបន្ថែម លុប ឬរៀបលំដាប់ឡើងវិញ។ ប្រើ tuple ពេលទីតាំងមានន័យជាក់លាក់ និងកំណត់ត្រាមិនគួរប្រែប្រួល (ដូចកូអរដោនេ ឬ key ផ្សំក្នុង dict)។',
            'ប្រើ set ពេលភាពមិនស្ទួន និងល្បឿនពិនិត្យសមាជិកសំខាន់ជាងលំដាប់ (ដូចជា URL ដែលបានចូលមើល ឬ ID ដែលត្រូវហាមឃាត់)។ បើចង់លុបធាតុស្ទួនពី list ដោយនៅរក្សាលំដាប់ដើម សូមប្រើ list(dict.fromkeys(items))។',
          ],
          points: [
            'Tuple អាចធ្វើជា key ក្នុង dict បាន—ស័ក្ដិសមបំផុតសម្រាប់កូអរដោនេតារាង 2D ដូច board[(row, col)] = "X"។',
            'ប្រើ frozenset ពេលអ្នកត្រូវការ set ដែលមិនអាចកែប្រែបាន (ដើម្បីដាក់ជា key ក្នុង dict)។',
            'list(dict.fromkeys(items)) លុបធាតុស្ទួនក្នុងពេល O(n) ដោយរក្សាលំដាប់ដំបូង។',
          ],
          exampleTitle: 'ការលុបធាតុស្ទួនរក្សាលំដាប់ និងការប្រើ Tuple ជា Key ក្នុង Dict',
          tip: 'អ្នកអាចស្រាយ tuple ត្រួតគ្នាផ្ទាល់ក្នុងរង្វិលជុំ for ដូចជា for (row, col), passenger in seat_map.items(): ដើម្បីឱ្យកូដខ្លី និងងាយអាន។',
        },
      ],
      challenge: {
        prompt:
          'មាន required_skills = {"python", "sql", "git", "docker"} និង candidate_skills = ["python", "git", "html", "python"]។ បម្លែង candidate_skills ជា set រួចគណនា (1) ជំនាញដែលត្រូវគ្នា និង (2) ជំនាញដែលខ្វះ ជាបញ្ជីតម្រៀប (sorted) ហើយត្រឡប់ជា tuple (matched, missing)។',
        hint: 'បម្លែងបញ្ជីដោយ cand = set(candidate_skills) រួចប្រើ required & cand សម្រាប់ជំនាញត្រូវគ្នា និង required - cand សម្រាប់ជំនាញខ្វះ។',
      },
      quiz: [
        {
          question:
            'បន្ទាប់ពីរត់ first, *middle, last = [10, 20, 30, 40, 50] តើ middle មានតម្លៃ និងប្រភេទអ្វី?',
          options: [
            '(20, 30, 40) (tuple)',
            '[20, 30, 40] (list)',
            '{20, 30, 40} (set)',
            '20 (int)',
          ],
          answer: 1,
          explanation:
            'ការស្រាយដោយសញ្ញាផ្កាយ (*middle) តែងតែបង្កើត list ជានិច្ច ទោះបីប្រភពដើមជា tuple ឬ string ក៏ដោយ។',
        },
        {
          question: 'តើឃ្លាណាបង្កើត set ទទេបានត្រឹមត្រូវ និងរកធាតុមានតែក្នុង a (គ្មានក្នុង b)?',
          options: [
            's = {} និង a | b',
            's = set() និង a - b',
            's = () និង a & b',
            's = set() និង a ^ b',
          ],
          answer: 1,
          explanation:
            'set() បង្កើត set ទទេ (ចំណែក {} បង្កើត dict ទទេ) ហើយ a - b ត្រឡប់ធាតុមានក្នុង a តែមិនមានក្នុង b។',
        },
      ],
    },
  },

  // =========================================================================
  // 3. LOOPS, ZIP, ENUMERATE & GENERATORS
  // =========================================================================
  {
    slug: 'python-loops-and-iterators',
    level: 'intermediate',
    insertAfter: 'python-tuples-and-sets',
    en: {
      title: 'Loops, zip, enumerate & Generators',
      duration: '14 min',
      summary:
        'Write idiomatic Python loops with enumerate() and zip(), understand the iterator protocol under the hood, and build memory-efficient lazy pipelines using yield and generator expressions.',
      objectives: [
        'Replace manual index counters with enumerate(), zip(..., strict=True), and for...else search loops.',
        'Explain how iter() and next() drive Python loops and write custom generator functions with yield.',
        'Build lazy data pipelines with generator expressions that process huge streams without exhausting RAM.',
      ],
      sections: [
        {
          id: 'enumerate-zip-and-loop-else',
          heading: 'Pythonic Loops: enumerate(), zip() & for...else',
          body: [
            'Beginners coming from C or Java often write for i in range(len(items)): to track an index or walk two lists side by side. In Python, built-in iterator helpers make those loops shorter, clearer, and less error-prone: enumerate(items, start=1) yields (index, value) pairs, while zip(a, b) pairs up corresponding elements across multiple iterables.',
            'Python loops also support an optional else: clause that runs ONLY if the loop finished normally without hitting a break statement. That makes search-and-fallback loops clean without needing a separate found = False flag variable.',
          ],
          points: [
            'Pass start=1 to enumerate() whenever displaying human-friendly 1-based numbering.',
            'Pass strict=True to zip(names, scores, strict=True) (Python 3.10+) so mismatched lengths raise ValueError instead of silently truncating data.',
            'Combine sorted() or reversed() directly in a for header to iterate without mutating the original list.',
          ],
          table: {
            headers: ['Helper / Pattern', 'Purpose', 'Example', 'Yields'],
            rows: [
              [
                'enumerate(seq, start=0)',
                'Index + value pairs',
                'enumerate(["a", "b"], 1)',
                '(1, "a"), (2, "b")',
              ],
              [
                'zip(a, b)',
                'Pair items in parallel',
                'zip(["x", "y"], [1, 2])',
                '("x", 1), ("y", 2)',
              ],
              [
                'zip(a, b, strict=True)',
                'Pair & assert equal length',
                'zip([1], [1, 2], strict=True)',
                'Raises ValueError',
              ],
              ['reversed(seq)', 'Lazy backward iteration', 'reversed([1, 2, 3])', '3, 2, 1'],
              [
                'for ... else:',
                'Run else if no break hit',
                'Search loop without flag',
                'Clean fallback',
              ],
            ],
          },
          example: {
            title: 'Ranking Students with zip(), enumerate() & for...else',
            language: 'python',
            code: `students = ["Bopha", "Vichea", "Rith"]
scores = [91, 84, 97]

ranked = sorted(zip(scores, students), reverse=True)
for rank, (score, name) in enumerate(ranked, start=1):
    print(f"#{rank} {name}: {score}")

target = "Kosal"
for name in students:
    if name == target:
        print(f"Found {target}!")
        break
else:
    print(f"{target} is not enrolled.")`,
            output: `#1 Rith: 97
#2 Bopha: 91
#3 Vichea: 84
Kosal is not enrolled.`,
          },
          tip: 'Think of the else on a for loop as "if no break happened." If you break early, Python skips the else block completely.',
        },
        {
          id: 'iterator-protocol-and-yield',
          heading: 'Iterators & Generator Functions with yield',
          body: [
            'Every Python for loop works through the iterator protocol: it calls iter(collection) once to get an iterator object, then repeatedly calls next(iterator) until StopIteration is raised. Lists, tuples, dicts, files, and ranges are iterables—objects you can pass to iter().',
            'A generator function is any function that contains the yield keyword. Instead of computing all results upfront and returning a giant list, a generator pauses at each yield, hands one value to the caller, keeps its local variables alive, and resumes right after yield on the next step. This is called lazy evaluation.',
          ],
          points: [
            'Generators compute each value on demand, so you can even model infinite sequences like ID counters or live log streams.',
            'Because a generator yields one item at a time, memory usage stays O(1) even across millions of records.',
            'Use yield from sub_iterable to delegate cleanly to another iterable or sub-generator.',
          ],
          example: {
            title: 'Streaming Log Errors with a Generator Function',
            language: 'python',
            code: `def error_lines(log_entries):
    for line_no, line in enumerate(log_entries, start=1):
        if line.startswith("ERROR"):
            yield line_no, line.removeprefix("ERROR: ")

sample_logs = [
    "INFO: Server started",
    "ERROR: Database timeout",
    "WARN: High memory usage",
    "ERROR: Payment gateway 502",
]

stream = error_lines(sample_logs)
print("First error via next():", next(stream))
for num, msg in stream:
    print(f"Remaining error on line {num}: {msg}")`,
            output: `First error via next(): (2, 'Database timeout')
Remaining error on line 4: Payment gateway 502`,
          },
          warning:
            'Generators are single-pass iterators: once exhausted, iterating over the same generator object a second time yields nothing! If you need to loop multiple times, either call the generator function again or materialize it with list(gen) when the data fits in memory.',
        },
        {
          id: 'generator-expressions-and-memory',
          heading: 'Generator Expressions & Lazy Pipelines',
          body: [
            'Just as list comprehensions use square brackets [expr for x in seq], a generator expression uses parentheses (expr for x in seq). The syntax is nearly identical, yet the behavior is dramatically different: a list comprehension builds the entire list in memory immediately, while a generator expression creates a lightweight lazy iterator.',
            'Whenever you pass a sequence straight into an aggregating function like sum(), any(), all(), max(), or min(), you can drop the extra parentheses and write sum(x * x for x in nums). You can also chain multiple generator stages together—filter, transform, aggregate—so each record flows through the pipeline one at a time.',
          ],
          points: [
            'Use any(cond for x in seq) and all(cond for x in seq) for short-circuiting checks that stop the instant the answer is known.',
            'Chain generator expressions to process gigabyte-sized CSV or log files with constant memory.',
            'Use list comprehensions only when you need indexing, len(), or multiple passes over the result.',
          ],
          example: {
            title: 'Chained Lazy Pipeline with Generator Expressions',
            language: 'python',
            code: `raw_orders = [" 120.50 ", "invalid", " -5 ", "89.00", "240.25"]

# Stage 1: parse numeric strings lazily
parsed = (float(x) for x in raw_orders if x.strip().replace(".", "", 1).isdigit())
# Stage 2: apply 10% discount lazily
discounted = (amount * 0.9 for amount in parsed if amount > 0)

total_revenue = sum(discounted)
has_big_order = any(float(x) >= 200 for x in raw_orders if x.strip().replace(".", "", 1).isdigit())

print(f"Discounted revenue: \${total_revenue:,.2f}")
print("Has order >= $200?", has_big_order)`,
            output: `Discounted revenue: $404.77
Has order >= $200? True`,
          },
          tip: 'Reach for Python’s built-in itertools module (islice, chain, groupby, batched) whenever you need to slice, merge, or batch lazy iterators without converting them to lists.',
        },
      ],
      challenge: {
        prompt:
          'Write a generator function chunked(items, size) that yields consecutive slices (lists) of length size from items (with the final chunk possibly shorter). For example, list(chunked([1, 2, 3, 4, 5], 2)) should produce [[1, 2], [3, 4], [5]].',
        hint: 'Loop with for i in range(0, len(items), size): and yield items[i:i + size]. Validate that size > 0 first.',
        language: 'python',
        solutionCode: `def chunked(items, size):
    if size <= 0:
        raise ValueError("size must be positive")
    for i in range(0, len(items), size):
        yield items[i : i + size]

for batch in chunked(["a", "b", "c", "d", "e"], 2):
    print(batch)`,
      },
      quiz: [
        {
          question: 'When does the else block of a Python for...else loop execute?',
          options: [
            'Only when the loop executes a break statement.',
            'Only when the loop completes normally without hitting a break statement.',
            'Always after the loop ends, like finally.',
            'Only when the iterable is empty.',
          ],
          answer: 1,
          explanation:
            'The else clause on a for (or while) loop runs if and only if the loop finishes naturally without being interrupted by break.',
        },
        {
          question:
            'What is the main advantage of sum(x * x for x in range(1_000_000)) over sum([x * x for x in range(1_000_000)])?',
          options: [
            'The generator expression returns a different mathematical result.',
            'The generator expression computes values lazily one at a time using O(1) memory instead of allocating a 1,000,000-item list.',
            'List comprehensions cannot be passed to sum().',
            'Generator expressions can be indexed with [0] and reused infinitely.',
          ],
          answer: 1,
          explanation:
            'A generator expression streams one value at a time directly into sum(), avoiding the memory allocation of a million-element temporary list.',
        },
      ],
    },
    km: {
      title: 'រង្វិលជុំ zip, enumerate និង Generators',
      duration: '14 នាទី',
      summary:
        'សរសេររង្វិលជុំបែប Pythonic ដោយប្រើ enumerate() និង zip() យល់ពីយន្តការ iterator និងបង្កើតលំហូរទិន្នន័យសន្សំអង្គចងចាំដោយ yield និង generator expressions។',
      objectives: [
        'ជំនួសអថេររាប់លេខដោយ enumerate(), zip(..., strict=True) និងរង្វិលជុំស្វែងរក for...else។',
        'ពន្យល់របៀបដែល iter() និង next() ដំណើរការរង្វិលជុំ និងសរសេរអនុគមន៍ generator ដោយ yield។',
        'បង្កើតលំហូរទិន្នន័យ lazy ដោយ generator expressions ដើម្បីដំណើរការទិន្នន័យធំដោយមិនពេញ RAM។',
      ],
      sections: [
        {
          id: 'enumerate-zip-and-loop-else',
          heading: 'រង្វិលជុំបែប Pythonic៖ enumerate(), zip() និង for...else',
          body: [
            'អ្នកចាប់ផ្ដើមថ្មីតែងសរសេរ for i in range(len(items)): ដើម្បីតាមដានលិបិក្រម ឬដើរលើបញ្ជីពីរព្រមគ្នា។ ក្នុង Python ឧបករណ៍ជំនួយដូច enumerate(items, start=1) ផ្ដល់គូ (លិបិក្រម, តម្លៃ) ហើយ zip(a, b) ផ្គូផ្គងធាតុតាមទីតាំងនៃបញ្ជីច្រើនព្រមគ្នាយ៉ាងស្អាត។',
            'រង្វិលជុំ Python ក៏មានផ្នែក else: ជាជម្រើសផងដែរ ដែលដំណើរការតែពេលរង្វិលជុំចប់ធម្មតាដោយមិនជួប break។ វាជួយឱ្យការស្វែងរកទិន្នន័យកាន់តែខ្លីដោយមិនបាច់បង្កើតអថេរ found = False ឡើយ។',
          ],
          points: [
            'ដាក់ start=1 ក្នុង enumerate() ពេលបង្ហាញលេខរៀងចាប់ពី 1 សម្រាប់អ្នកប្រើប្រាស់។',
            'ប្រើ strict=True ក្នុង zip(names, scores, strict=True) (Python 3.10+) ដើម្បីឱ្យលោត ValueError បើប្រវែងបញ្ជីមិនស្មើគ្នា។',
            'ប្រើ sorted() ឬ reversed() ផ្ទាល់ក្នុងក្បាល for ដើម្បីដើរលើទិន្នន័យដោយមិនប៉ះពាល់បញ្ជីដើម។',
          ],
          table: {
            headers: ['ឧបករណ៍ / ទម្រង់', 'មុខងារ', 'ឧទាហរណ៍', 'លទ្ធផល'],
            rows: [
              [
                'enumerate(seq, start=0)',
                'គូលិបិក្រម + តម្លៃ',
                'enumerate(["a", "b"], 1)',
                '(1, "a"), (2, "b")',
              ],
              [
                'zip(a, b)',
                'ផ្គូផ្គងធាតុស្របគ្នា',
                'zip(["x", "y"], [1, 2])',
                '("x", 1), ("y", 2)',
              ],
              [
                'zip(a, b, strict=True)',
                'ផ្គូផ្គង និងពិនិត្យប្រវែងស្មើ',
                'zip([1], [1, 2], strict=True)',
                'បង្ក ValueError',
              ],
              ['reversed(seq)', 'ដើរថយក្រោយបែប lazy', 'reversed([1, 2, 3])', '3, 2, 1'],
              [
                'for ... else:',
                'រត់ else បើមិនជួប break',
                'រង្វិលជុំស្វែងរកគ្មាន flag',
                'ជម្រើសជំនួសស្អាត',
              ],
            ],
          },
          exampleTitle: 'ការចាត់ចំណាត់ថ្នាក់សិស្សដោយ zip(), enumerate() និង for...else',
          tip: 'សូមគិតថា else លើរង្វិលជុំ for មានន័យថា "បើគ្មាន break កើតឡើង"។ បើរង្វិលជុំឈប់ដោយ break ផ្នែក else នឹងត្រូវរំលងទាំងស្រុង។',
        },
        {
          id: 'iterator-protocol-and-yield',
          heading: 'Iterators និងអនុគមន៍ Generator ជាមួយ yield',
          body: [
            'គ្រប់រង្វិលជុំ for ក្នុង Python ដំណើរការតាមពិធីការ iterator៖ វាហៅ iter(collection) ម្ដងដើម្បីយក iterator រួចហៅ next(iterator) ម្ដងហើយម្ដងទៀតរហូតដល់ StopIteration។',
            'អនុគមន៍ generator គឺជាអនុគមន៍ដែលប្រើពាក្យគន្លឹះ yield។ ជំនួសឱ្យការគណនាលទ្ធផលទាំងអស់ទុកក្នុងបញ្ជីធំមួយ វាផ្អាកត្រង់ yield បញ្ជូនតម្លៃម្ដងមួយទៅអ្នកហៅ រក្សាស្ថានភាពអថេរក្នុងស្រុក ហើយបន្តពីកន្លែងនោះនៅជំហានបន្ទាប់ (lazy evaluation)។',
          ],
          points: [
            'Generator គណនាតម្លៃតែពេលត្រូវការ ដូច្នេះអ្នកអាចបង្កើតលំដាប់គ្មានដែនកំណត់ ឬអានកំណត់ហេតុផ្ទាល់បាន។',
            'ការប្រើអង្គចងចាំនៅថេរ O(1) ទោះបីដំណើរការទិន្នន័យរាប់លានជួរក៏ដោយ។',
            'ប្រើ yield from sub_iterable ដើម្បីបញ្ជូនបន្តពី iterable ឬ sub-generator ផ្សេងយ៉ាងខ្លី។',
          ],
          exampleTitle: 'ការច្រោះកំហុសកំណត់ហេតុបែបស្ទ្រីមដោយ Generator',
          warning:
            'Generator ប្រើបានតែម្ដងគត់ (single-pass)៖ ពេលដើរដល់ចប់ហើយ បើអ្នក loop ម្ដងទៀតវានឹងគ្មានទិន្នន័យទេ! បើត្រូវប្រើច្រើនដង ត្រូវហៅអនុគមន៍ generator ម្ដងទៀត ឬបម្លែងជា list(gen)។',
        },
        {
          id: 'generator-expressions-and-memory',
          heading: 'Generator Expressions និងលំហូរទិន្នន័យ Lazy',
          body: [
            'ខណៈ list comprehension ប្រើវង់ក្រចកជ្រុង [expr for x in seq], generator expression ប្រើវង់ក្រចកមូល (expr for x in seq)។ វាមានវេយ្យាករណ៍ស្ទើរដូចគ្នា តែ generator expression មិនបង្កើតបញ្ជីទាំងមូលក្នុង RAM ទេ វាបង្កើត iterator ស្រាលមួយប៉ុណ្ណោះ។',
            'ពេលអ្នកបញ្ជូនចូលអនុគមន៍បូកសរុបដូច sum(), any(), all(), max() ឬ min() អ្នកអាចសរសេរផ្ទាល់ដូច sum(x * x for x in nums)។ អ្នកក៏អាចតភ្ជាប់ generator ជាច្រើនដំណាក់កាល—ច្រោះ បម្លែង និងបូកសរុប—ដោយទិន្នន័យហូរម្ដងមួយជួរ។',
          ],
          points: [
            'ប្រើ any(...) និង all(...) ដើម្បីឈប់ពិនិត្យភ្លាមៗ (short-circuit) ពេលដឹងចម្លើយ។',
            'តភ្ជាប់ generator expressions ដើម្បីដំណើរការឯកសារ CSV ឬ log ទំហំជីហ្គាបៃដោយប្រើ RAM តិចបំផុត។',
            'ប្រើ list comprehension តែពេលអ្នកត្រូវការ indexing, len() ឬដើរច្រើនដងលើលទ្ធផល។',
          ],
          exampleTitle: 'ការតភ្ជាប់លំហូរទិន្នន័យ Lazy ដោយ Generator Expressions',
          tip: 'សូមប្រើម៉ូឌុល itertools (ដូចជា islice, chain, groupby, batched) ពេលអ្នកចង់កាត់ បញ្ចូលគ្នា ឬបែងចែក iterator ជាក្រុមដោយមិនបាច់បម្លែងជា list។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ generator ឈ្មោះ chunked(items, size) ដែល yield ផ្នែកតូចៗ (list) មានប្រវែង size ពី items (ផ្នែកចុងក្រោយអាចខ្លីជាង)។ ឧទាហរណ៍ list(chunked([1, 2, 3, 4, 5], 2)) ផ្ដល់ [[1, 2], [3, 4], [5]]។',
        hint: 'ប្រើរង្វិលជុំ for i in range(0, len(items), size): រួច yield items[i:i + size]។ កុំភ្លេចពិនិត្យថា size > 0 ជាមុន។',
      },
      quiz: [
        {
          question: 'តើផ្នែក else នៃរង្វិលជុំ for...else ក្នុង Python ដំណើរការនៅពេលណា?',
          options: [
            'លុះត្រាតែរង្វិលជុំជួបឃ្លា break។',
            'លុះត្រាតែរង្វិលជុំចប់ធម្មតាដោយមិនបានជួបឃ្លា break។',
            'ដំណើរការជានិច្ចក្រោយចប់រង្វិលជុំ ដូច finally។',
            'លុះត្រាតែបញ្ជីទិន្នន័យទទេ។',
          ],
          answer: 1,
          explanation:
            'ផ្នែក else លើ for (ឬ while) ដំណើរការតែពេលរង្វិលជុំបញ្ចប់ធម្មតាដោយគ្មានការផ្ដាច់ដោយ break ឡើយ។',
        },
        {
          question:
            'តើអ្វីជាគុណសម្បត្តិចម្បងនៃ sum(x * x for x in range(1_000_000)) ធៀបនឹង sum([x * x for x in range(1_000_000)])?',
          options: [
            'Generator expression ផ្ដល់លទ្ធផលគណិតវិទ្យាខុសគ្នា។',
            'Generator expression គណនាម្តងមួយតម្លៃដោយប្រើអង្គចងចាំ O(1) ជំនួសឱ្យការបង្កើត list មួយលានធាតុ។',
            'List comprehension មិនអាចបញ្ជូនចូល sum() បានទេ។',
            'Generator expression អាចប្រើ index [0] និងប្រើឡើងវិញគ្មានដែនកំណត់។',
          ],
          answer: 1,
          explanation:
            'Generator expression បញ្ជូនតម្លៃម្ដងមួយទៅឱ្យ sum() ផ្ទាល់ ដោយជៀសវាងការចំណាយអង្គចងចាំបង្កើត list បណ្ដោះអាសន្នមួយលានធាតុ។',
        },
      ],
    },
  },

  // =========================================================================
  // 4. ERROR HANDLING, CUSTOM EXCEPTIONS & PYTEST BASICS
  // =========================================================================
  {
    slug: 'python-exceptions-and-testing',
    level: 'intermediate',
    insertAfter: 'functions-and-modules',
    en: {
      title: 'Error Handling, Custom Exceptions & pytest Basics',
      duration: '14 min',
      summary:
        'Write resilient Python code with try/except/else/finally blocks, raise meaningful custom exceptions with proper chaining, and verify edge cases automatically using pytest.',
      objectives: [
        'Handle runtime failures safely with specific except clauses, else success blocks, and finally cleanup.',
        'Design domain-specific custom exception classes and preserve root causes with raise ... from err.',
        'Write clean unit tests with pytest using plain assert statements, pytest.raises(), and parametrized test cases.',
      ],
      sections: [
        {
          id: 'try-except-else-finally',
          heading: 'Structured Error Handling (try / except / else / finally)',
          body: [
            'Even well-written programs encounter bad user input, missing files, or flaky networks. Instead of letting your script crash with an unhandled traceback, wrap the risky operation in a try block and catch specific exception types with except SomeError as err:.',
            'Python gives you two more precision clauses: else runs ONLY when the try block raised no exception (keeping non-risky success logic outside try so you do not accidentally catch unrelated bugs), and finally ALWAYS runs—whether an error occurred or not—making it ideal for closing connections or releasing locks.',
          ],
          points: [
            'Keep try blocks as narrow as possible: wrap only the line(s) that can raise the expected exception.',
            'Catch multiple specific exceptions in one clause using a tuple: except (ValueError, KeyError) as err:.',
            'Prefer EAFP ("Easier to Ask for Forgiveness than Permission") in Python: attempt the conversion or lookup and catch the specific error.',
          ],
          table: {
            headers: ['Built-in Exception', 'Common Cause', 'Example Trigger'],
            rows: [
              ['ValueError', 'Right type, invalid value', 'int("abc") or math.sqrt(-1)'],
              ['TypeError', 'Operation on incompatible types', '"age: " + 25'],
              ['KeyError', 'Missing key in a dictionary', 'user["missing_key"]'],
              ['IndexError', 'Sequence index out of range', '[1, 2][5]'],
              ['ZeroDivisionError', 'Division or modulo by zero', '100 / 0'],
              ['FileNotFoundError', 'Reading a file path that does not exist', 'open("nope.txt")'],
            ],
          },
          example: {
            title: 'Full try / except / else / finally Lifecycle',
            language: 'python',
            code: `def parse_unit_price(raw_total, raw_qty):
    try:
        total = float(raw_total)
        qty = int(raw_qty)
        unit = total / qty
    except ValueError as err:
        print(f"Invalid number format: {err}")
        return None
    except ZeroDivisionError:
        print("Quantity must be greater than zero.")
        return None
    else:
        print(f"Calculated unit price: \${unit:.2f}")
        return unit
    finally:
        print("--- parse attempt finished ---")

parse_unit_price("150.0", "3")
parse_unit_price("150.0", "0")`,
            output: `Calculated unit price: $50.00
--- parse attempt finished ---
Quantity must be greater than zero.
--- parse attempt finished ---`,
          },
          warning:
            'Never write a bare except: (or except Exception: pass) that silently swallows every error. Bare except: even catches KeyboardInterrupt (Ctrl+C) and SystemExit, hiding real bugs and making programs impossible to stop cleanly.',
        },
        {
          id: 'raising-and-custom-exceptions',
          heading: 'Raising Exceptions, Chaining & Custom Exception Classes',
          body: [
            'When your own functions detect invalid state—like a negative withdrawal amount or insufficient balance—signal the caller explicitly with raise ValueError("..."). Failing fast with a descriptive message prevents corrupt data from traveling deeper into your system.',
            'For larger applications, define custom exception classes by inheriting from Exception (or a shared base like AppError). Custom exceptions let callers distinguish domain errors (InsufficientFundsError) from programming bugs. When converting a low-level error into a domain error, use raise DomainError(...) from err so Python preserves the original traceback cause.',
          ],
          points: [
            'Inherit custom exceptions from Exception—never directly from BaseException.',
            'Attach structured attributes (such as err.balance or err.requested) to custom exceptions for clean logging and API responses.',
            'Use raise CustomError("message") from original_err to chain exceptions and keep debugging context intact.',
          ],
          example: {
            title: 'Custom Domain Exception with Structured Context',
            language: 'python',
            code: `class WalletError(Exception):
    """Base error for wallet operations."""

class InsufficientFundsError(WalletError):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(f"Cannot withdraw \${amount:.2f}; balance is \${balance:.2f}")

def withdraw(balance, amount):
    if amount <= 0:
        raise ValueError("Withdrawal amount must be positive")
    if amount > balance:
        raise InsufficientFundsError(balance, amount)
    return balance - amount

try:
    new_bal = withdraw(40.0, 75.0)
except InsufficientFundsError as err:
    print("Caught:", err)
    print(f"Shortfall: \${err.amount - err.balance:.2f}")`,
            output: `Caught: Cannot withdraw $75.00; balance is $40.00
Shortfall: $35.00`,
          },
          tip: 'Create one module-level base exception (e.g. class WalletError(Exception):) and inherit all specific errors from it so callers can catch either one specific failure or any WalletError at once.',
        },
        {
          id: 'pytest-basics-and-assertions',
          heading: 'Automated Testing with pytest Basics',
          body: [
            'Manual print() debugging stops scaling as soon as your code grows past a few functions. pytest is Python’s most popular testing framework because it requires almost zero boilerplate: name your files test_*.py, name your functions test_*(), and use Python’s standard assert keyword.',
            'When an assertion fails, pytest automatically introspects the expression and shows the exact left and right values. Use with pytest.raises(SomeError): to verify that bad inputs trigger the right exception, and @pytest.mark.parametrize to run one test function across many input/expected pairs without duplicating code.',
          ],
          points: [
            'Run pytest from your project root to discover and execute every test_*.py file automatically.',
            'Use pytest.approx(0.3) when comparing floating-point numbers (since 0.1 + 0.2 == 0.30000000000000004).',
            'Use with pytest.raises(ValueError, match="positive"): to check both the exception type and message text.',
            'Use @pytest.fixture to share clean setup objects (like sample carts or temp directories via tmp_path) across tests.',
          ],
          example: {
            title: 'Testing Edge Cases & Exceptions with pytest',
            language: 'python',
            code: `# test_wallet.py  (run with: pytest -v)
import pytest

def apply_discount(price, percent):
    if not 0 <= percent <= 100:
        raise ValueError("percent must be between 0 and 100")
    return round(price * (1 - percent / 100), 2)

@pytest.mark.parametrize(
    "price, percent, expected",
    [
        (100.0, 0, 100.0),
        (100.0, 25, 75.0),
        (49.99, 10, 44.99),
    ],
)
def test_apply_discount_valid(price, percent, expected):
    assert apply_discount(price, percent) == expected

def test_apply_discount_invalid_percent():
    with pytest.raises(ValueError, match="between 0 and 100"):
        apply_discount(100.0, 120)`,
            output: `collected 4 items

test_wallet.py::test_apply_discount_valid[100.0-0-100.0] PASSED   [ 25%]
test_wallet.py::test_apply_discount_valid[100.0-25-75.0] PASSED   [ 50%]
test_wallet.py::test_apply_discount_valid[49.99-10-44.99] PASSED  [ 75%]
test_wallet.py::test_apply_discount_invalid_percent PASSED        [100%]

======================== 4 passed in 0.03s ========================`,
          },
          tip: 'Follow the Arrange-Act-Assert structure in every test: set up inputs, call the function once, and assert the result or expected exception. Keep each test focused on a single behavior.',
        },
      ],
      challenge: {
        prompt:
          'Define a custom exception InvalidAgeError(Exception) and a function register_voter(name, raw_age) that converts raw_age to int (raising InvalidAgeError from ValueError if non-numeric) and raises InvalidAgeError if age < 18. Write a pytest test checking both a valid registration and an invalid age with pytest.raises.',
        hint: 'Catch ValueError around int(raw_age) and re-raise with raise InvalidAgeError("Age must be a number") from err. Then check if age < 18.',
        language: 'python',
        solutionCode: `import pytest

class InvalidAgeError(Exception):
    pass

def register_voter(name, raw_age):
    try:
        age = int(raw_age)
    except ValueError as err:
        raise InvalidAgeError(f"Invalid age value: {raw_age!r}") from err
    if age < 18:
        raise InvalidAgeError(f"{name} must be at least 18 (got {age})")
    return {"name": name, "age": age}

def test_register_voter_success():
    assert register_voter("Sovann", "22") == {"name": "Sovann", "age": 22}

def test_register_voter_rejects_underage_and_text():
    with pytest.raises(InvalidAgeError, match="at least 18"):
        register_voter("Lina", "16")
    with pytest.raises(InvalidAgeError):
        register_voter("Lina", "twenty")`,
      },
      quiz: [
        {
          question: 'Why should you avoid writing a bare `except:` block in Python?',
          options: [
            'Bare except: is a SyntaxError in Python 3.',
            'It catches everything—including KeyboardInterrupt and SystemExit—hiding bugs and preventing normal interruption.',
            'It prevents the finally block from running.',
            'It only catches ValueError and TypeError.',
          ],
          answer: 1,
          explanation:
            'A bare except: inherits from BaseException and catches system signals like Ctrl+C (KeyboardInterrupt) and sys.exit() (SystemExit) alongside bugs.',
        },
        {
          question:
            'How do you verify in pytest that calling divide(10, 0) raises ZeroDivisionError?',
          options: [
            'assert raises(ZeroDivisionError, divide(10, 0))',
            'with pytest.raises(ZeroDivisionError): divide(10, 0)',
            'pytest.catch(ZeroDivisionError, divide, 10, 0)',
            'try: divide(10, 0) except: pass',
          ],
          answer: 1,
          explanation:
            'pytest.raises(ExceptionType) is a context manager that passes ONLY if the indented block raises the specified exception.',
        },
      ],
    },
    km: {
      title: 'ការគ្រប់គ្រងកំហុស Custom Exceptions និងមូលដ្ឋាន pytest',
      duration: '14 នាទី',
      summary:
        'សរសេរកូដ Python ដែលរឹងមាំដោយ try/except/else/finally បង្កើត custom exceptions ដែលមានអត្ថន័យច្បាស់ និងសរសេរការធ្វើតេស្តស្វ័យប្រវត្តិដោយ pytest។',
      objectives: [
        'គ្រប់គ្រងកំហុសពេលដំណើរការដោយ except ជាក់លាក់, ផ្នែកជោគជ័យ else និងការសម្អាត finally។',
        'បង្កើតថ្នាក់ custom exception តាមដែនការងារ និងរក្សាមូលហេតុដើមដោយ raise ... from err។',
        'សរសេរ unit tests ស្អាតជាមួយ pytest ដោយប្រើ assert, pytest.raises() និង @pytest.mark.parametrize។',
      ],
      sections: [
        {
          id: 'try-except-else-finally',
          heading: 'ការគ្រប់គ្រងកំហុសមានរចនាសម្ព័ន្ធ (try / except / else / finally)',
          body: [
            'ទោះបីកម្មវិធីសរសេរបានល្អក៏ដោយ វានៅតែអាចជួបទិន្នន័យខុស ឯកសារបាត់ ឬបណ្ដាញដាច់។ ជំនួសឱ្យការឱ្យកម្មវិធីគាំងទាំងស្រុង សូមរុំផ្នែកដែលអាចមានហានិភ័យក្នុង try ហើយចាប់ប្រភេទកំហុសជាក់លាក់ដោយ except SomeError as err:។',
            'Python មានផ្នែកជំនួយពីរទៀត៖ else ដំណើរការតែពេល try មិនមានកំហុសអ្វីឡើយ (ជួយញែកកូដជោគជ័យចេញពី try) និង finally ដំណើរការជានិច្ច—ទោះមានកំហុស ឬគ្មានក៏ដោយ—ស័ក្ដិសមសម្រាប់បិទឯកសារ ឬផ្ដាច់ការតភ្ជាប់។',
          ],
          points: [
            'រក្សាប្លុក try ឱ្យខ្លីបំផុត៖ រុំតែបន្ទាត់ដែលអាចបង្កកំហុសដែលរំពឹងទុក។',
            'ចាប់កំហុសច្រើនប្រភេទក្នុងឃ្លាតែមួយដោយ tuple៖ except (ValueError, KeyError) as err:។',
            'Python និយមរចនាប័ទ្ម EAFP៖ សាកល្បងបម្លែង ឬទាញទិន្នន័យ រួចចាប់កំហុសជាក់លាក់។',
          ],
          table: {
            headers: ['Exception ស្រាប់', 'មូលហេតុទូទៅ', 'ឧទាហរណ៍ដែលបង្ក'],
            rows: [
              ['ValueError', 'ប្រភេទត្រូវ តែតម្លៃមិនត្រឹមត្រូវ', 'int("abc") ឬ math.sqrt(-1)'],
              ['TypeError', 'ប្រមាណវិធីលើប្រភេទមិនស៊ីគ្នា', '"age: " + 25'],
              ['KeyError', 'រកមិនឃើញ key ក្នុង dictionary', 'user["missing_key"]'],
              ['IndexError', 'លិបិក្រមលើសដែនកំណត់', '[1, 2][5]'],
              ['ZeroDivisionError', 'ការចែក ឬ modulo នឹងសូន្យ', '100 / 0'],
              ['FileNotFoundError', 'បើកឯកសារដែលមិនមាន', 'open("nope.txt")'],
            ],
          },
          exampleTitle: 'វដ្ដពេញលេញនៃ try / except / else / finally',
          warning:
            'កុំសរសេរ except: ទទេ (ឬ except Exception: pass) ដែលលាក់កំហុសស្ងាត់ៗ។ except: ទទេថែមទាំងចាប់ KeyboardInterrupt (Ctrl+C) និង SystemExit ធ្វើឱ្យលាក់កំហុសពិត និងពិបាកបញ្ឈប់កម្មវិធី។',
        },
        {
          id: 'raising-and-custom-exceptions',
          heading: 'ការបោះ Exception ការតភ្ជាប់មូលហេតុ និង Custom Exceptions',
          body: [
            'ពេលអនុគមន៍របស់អ្នករកឃើញស្ថានភាពមិនត្រឹមត្រូវ—ដូចជាការដកប្រាក់អវិជ្ជមាន ឬសមតុល្យមិនគ្រប់—សូមជូនដំណឹងភ្លាមដោយ raise ValueError("...") ដើម្បីកុំឱ្យទិន្នន័យខូចរាលដាលបន្ត។',
            'ក្នុងកម្មវិធីធំ សូមបង្កើតថ្នាក់ custom exception ដោយស្នងពី Exception (ឬថ្នាក់មេដូច AppError)។ ពេលបម្លែងកំហុសថ្នាក់ក្រោមទៅជាកំហុសដែនការងារ ត្រូវប្រើ raise DomainError(...) from err ដើម្បីរក្សាមូលហេតុដើមក្នុង traceback។',
          ],
          points: [
            'ស្នង custom exception ពី Exception—កុំស្នងផ្ទាល់ពី BaseException ឡើយ។',
            'អ្នកអាចភ្ជាប់ទិន្នន័យបន្ថែម (ដូច err.balance ឬ err.amount) លើ custom exception ដើម្បីងាយស្រួលកត់ត្រា log។',
            'ប្រើ raise CustomError("...") from original_err ដើម្បីរក្សាប្រវត្តិកំហុសដើម។',
          ],
          exampleTitle: 'ការបង្កើត Custom Domain Exception ដែលមានព័ត៌មានបន្ថែម',
          tip: 'បង្កើតថ្នាក់មេមួយសម្រាប់ម៉ូឌុល (ឧ. class WalletError(Exception):) ហើយឱ្យកំហុសជាក់លាក់ទាំងអស់ស្នងពីវា ដើម្បីឱ្យអ្នកហៅអាចចាប់ទាំងកំហុសជាក់លាក់ ឬចាប់ WalletError ទាំងមូលបាន។',
        },
        {
          id: 'pytest-basics-and-assertions',
          heading: 'មូលដ្ឋានការធ្វើតេស្តស្វ័យប្រវត្តិដោយ pytest',
          body: [
            'ការពិនិត្យកំហុសដោយ print() នឹងពិបាកគ្រប់គ្រងពេលកូដកាន់តែធំ។ pytest ជាក្របខ័ណ្ឌធ្វើតេស្តដ៏ពេញនិយមបំផុតក្នុង Python ព្រោះវាត្រូវការកូដតិចបំផុត៖ ដាក់ឈ្មោះឯកសារ test_*.py, ឈ្មោះអនុគមន៍ test_*() ហើយប្រើពាក្យគន្លឹះ assert ធម្មតា។',
            'ពេល assert បរាជ័យ pytest បង្ហាញតម្លៃខាងឆ្វេង និងខាងស្ដាំយ៉ាងលម្អិតដោយស្វ័យប្រវត្តិ។ ប្រើ with pytest.raises(SomeError): ដើម្បីផ្ទៀងផ្ទាត់ថាទិន្នន័យខុសបង្ក exception ត្រឹមត្រូវ និងប្រើ @pytest.mark.parametrize ដើម្បីសាកល្បងករណីច្រើនលើអនុគមន៍តេស្តតែមួយ។',
          ],
          points: [
            'រត់ពាក្យបញ្ជា pytest ពីថតដើមគម្រោង ដើម្បីរក និងដំណើរការឯកសារ test_*.py ទាំងអស់ដោយស្វ័យប្រវត្តិ។',
            'ប្រើ pytest.approx(0.3) ពេលប្រៀបធៀបលេខទសភាគ float។',
            'ប្រើ with pytest.raises(ValueError, match="..."): ដើម្បីពិនិត្យទាំងប្រភេទ exception និងសារកំហុស។',
            'ប្រើ @pytest.fixture ដើម្បីចែករំលែកទិន្នន័យរៀបចំរួមគ្នារវាងតេស្តច្រើន។',
          ],
          exampleTitle: 'ការធ្វើតេស្តករណីពិសេស និង Exceptions ជាមួយ pytest',
          tip: 'ប្រកាន់ខ្ជាប់រចនាសម្ព័ន្ធ Arrange-Act-Assert ក្នុងគ្រប់តេស្ត៖ រៀបចំទិន្នន័យ, ហៅអនុគមន៍ម្ដង រួច assert លទ្ធផល ឬ exception ដែលរំពឹងទុក។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើត custom exception ឈ្មោះ InvalidAgeError(Exception) និងអនុគមន៍ register_voter(name, raw_age) ដែលបម្លែង raw_age ជា int (បោះ InvalidAgeError from ValueError បើមិនមែនលេខ) និងបោះ InvalidAgeError បើ age < 18។ សរសេរតេស្ត pytest ពិនិត្យទាំងករណីត្រឹមត្រូវ និងករណីខុសដោយ pytest.raises។',
        hint: 'ចាប់ ValueError ជុំវិញ int(raw_age) រួចបោះ raise InvalidAgeError("...") from err បន្ទាប់មកពិនិត្យ if age < 18។',
      },
      quiz: [
        {
          question: 'ហេតុអ្វីអ្នកគួរជៀសវាងការសរសេរ `except:` ទទេក្នុង Python?',
          options: [
            'except: ទទេជា SyntaxError ក្នុង Python 3។',
            'វាចាប់អ្វីៗទាំងអស់—រួមទាំង KeyboardInterrupt និង SystemExit—ធ្វើឱ្យលាក់កំហុស និងរំខានការបញ្ឈប់កម្មវិធី។',
            'វារារាំងមិនឱ្យប្លុក finally ដំណើរការ។',
            'វាចាប់តែ ValueError និង TypeError ប៉ុណ្ណោះ។',
          ],
          answer: 1,
          explanation:
            'except: ទទេចាប់ដល់ BaseException រួមទាំងសញ្ញាបញ្ឈប់ Ctrl+C (KeyboardInterrupt) និង sys.exit() ផងដែរ។',
        },
        {
          question: 'តើផ្ទៀងផ្ទាត់យ៉ាងណាក្នុង pytest ថាការហៅ divide(10, 0) បង្ក ZeroDivisionError?',
          options: [
            'assert raises(ZeroDivisionError, divide(10, 0))',
            'with pytest.raises(ZeroDivisionError): divide(10, 0)',
            'pytest.catch(ZeroDivisionError, divide, 10, 0)',
            'try: divide(10, 0) except: pass',
          ],
          answer: 1,
          explanation:
            'pytest.raises(ExceptionType) ជា context manager ដែលជាប់តេស្តលុះត្រាតែប្លុកកូដខាងក្នុងបង្ក exception ប្រភេទនោះ។',
        },
      ],
    },
  },

  // =========================================================================
  // 5. INHERITANCE, POLYMORPHISM & DUNDER METHODS
  // =========================================================================
  {
    slug: 'python-inheritance-and-dunder',
    level: 'intermediate',
    insertAfter: 'oop-and-files',
    en: {
      title: 'Inheritance, Polymorphism & Dunder Methods',
      duration: '15 min',
      summary:
        'Extend classes cleanly with inheritance and super(), validate attributes with @property, harness duck typing and polymorphism, and customize Python operators using dunder methods like __repr__, __str__, and __eq__.',
      objectives: [
        'Build subclass hierarchies that reuse and extend parent behavior safely via super().',
        'Design polymorphic interfaces using duck typing and guard object state with @property getters and setters.',
        'Implement core dunder methods (__repr__, __str__, __eq__, __len__, __add__) so custom classes feel native to Python.',
      ],
      sections: [
        {
          id: 'inheritance-and-super',
          heading: 'Class Inheritance, Method Overriding & super()',
          body: [
            'Inheritance lets a child class (subclass) reuse attributes and methods from a parent class (base class) while adding specialized fields or overriding specific methods. You declare it by placing the parent class in parentheses: class SavingsAccount(BankAccount):.',
            'Inside an overridden method—especially __init__—always call super().__init__(...) rather than hardcoding the parent class name. super() follows Python’s Method Resolution Order (MRO) automatically, ensuring parent initialization runs cleanly and avoiding duplicate work if multiple inheritance is ever introduced.',
          ],
          points: [
            'Use inheritance only when a genuine "is-a" relationship holds (a SavingsAccount is a BankAccount); otherwise prefer composition ("has-a").',
            'Inspect class hierarchy checks with isinstance(obj, Parent) and issubclass(Child, Parent).',
            'Inspect any class’s lookup chain with Child.__mro__ when debugging inherited methods.',
          ],
          example: {
            title: 'Extending a Base Class with super() & Method Overriding',
            language: 'python',
            code: `class Account:
    def __init__(self, owner, balance=0.0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def summary(self):
        return f"{self.owner}: \${self.balance:,.2f}"

class SavingsAccount(Account):
    def __init__(self, owner, balance=0.0, interest_rate=0.04):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    def apply_interest(self):
        interest = self.balance * self.interest_rate
        self.deposit(interest)
        return interest

    def summary(self):
        base = super().summary()
        return f"{base} (APY {self.interest_rate:.0%})"

acct = SavingsAccount("Sokha", 1000.0, 0.05)
earned = acct.apply_interest()
print(f"Earned: \${earned:.2f}")
print(acct.summary())
print("Is Account?", isinstance(acct, Account))`,
            output: `Earned: $50.00
Sokha: $1,050.00 (APY 5%)
Is Account? True`,
          },
          warning:
            'If a subclass defines its own __init__ and forgets to call super().__init__(...), the parent’s attributes (like self.owner and self.balance) will never be created, causing AttributeError later.',
        },
        {
          id: 'polymorphism-and-properties',
          heading: 'Polymorphism, Duck Typing & @property Attributes',
          body: [
            'Polymorphism means different classes can share the same method interface so one function works seamlessly across all of them. Python embraces duck typing: a function does not care what class an object inherits from as long as it implements the required method (e.g. .send(message)).',
            'Instead of writing verbose Java-style get_price() and set_price() methods upfront, Python lets you start with plain attributes and upgrade to @property whenever you need computed values or validation—without breaking any caller code that reads or writes obj.price.',
          ],
          points: [
            'Store the internal value behind a leading underscore (self._price) inside a @property to prevent infinite recursion.',
            'Omit the @prop.setter decorator to create a clean read-only computed attribute (like area or full_name).',
            'Use abc.ABC and @abstractmethod when you want to enforce that every subclass implements a required interface.',
          ],
          example: {
            title: 'Validated @property & Polymorphic Notifiers',
            language: 'python',
            code: `class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price  # Calls the @price.setter automatically!

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        if value < 0:
            raise ValueError("Price cannot be negative")
        self._price = float(value)

class EmailNotifier:
    def send(self, msg):
        return f"[EMAIL] {msg}"

class SmsNotifier:
    def send(self, msg):
        return f"[SMS] {msg}"

def broadcast(channels, message):
    return [ch.send(message) for ch in channels]

item = Product("Router", 59)
print(f"{item.name}: \${item.price:.2f}")
for line in broadcast([EmailNotifier(), SmsNotifier()], "Order shipped!"):
    print(line)`,
            output: `Router: $59.00
[EMAIL] Order shipped!
[SMS] Order shipped!`,
          },
          tip: 'Assigning self.price = price inside __init__ routes initial values through your @price.setter too—guaranteeing invalid negative prices are rejected from the very first moment.',
        },
        {
          id: 'dunder-magic-methods',
          heading: 'Dunder (Magic) Methods (__repr__, __str__, __eq__, __add__)',
          body: [
            'Double-underscore methods—nicknamed "dunder" methods—let your custom objects plug directly into Python’s built-in syntax: print(), ==, +, len(), <, and with statements. You almost never call obj.__len__() directly; Python invokes it automatically when you call len(obj).',
            'Two string methods deserve special care: __repr__ is for developers and debugging (aim for unambiguous output like Money(10.0, "USD")), while __str__ is for end-user display (like "$10.00 USD"). If you only implement one, implement __repr__, because Python falls back to __repr__ whenever __str__ is absent.',
          ],
          points: [
            'Implement __eq__ so two objects with identical values compare equal with == (by default, == compares memory identity).',
            'Return NotImplemented (not False) from __eq__ or __add__ when given an unsupported type so Python can try the other operand’s reflected method.',
            'For simple data containers, Python’s @dataclass decorator automatically generates __init__, __repr__, and __eq__ for you.',
          ],
          table: {
            headers: ['Dunder Method', 'Triggered By', 'Typical Role'],
            rows: [
              [
                '__repr__(self)',
                'repr(obj), debugger, lists',
                'Unambiguous developer representation',
              ],
              ['__str__(self)', 'str(obj), print(obj)', 'Friendly human-readable string'],
              ['__eq__(self, other)', 'a == b', 'Value-based equality check'],
              ['__lt__(self, other)', 'a < b, sorted()', 'Ordering comparison'],
              ['__len__(self)', 'len(obj)', 'Number of items in container'],
              ['__add__(self, other)', 'a + b', 'Custom addition / merging'],
            ],
          },
          example: {
            title: 'Making a Money Value Object Feel Built-In',
            language: 'python',
            code: `class Money:
    def __init__(self, amount, currency="USD"):
        self.amount = round(float(amount), 2)
        self.currency = currency

    def __repr__(self):
        return f"Money({self.amount!r}, {self.currency!r})"

    def __str__(self):
        return f"\${self.amount:,.2f} {self.currency}"

    def __eq__(self, other):
        if not isinstance(other, Money):
            return NotImplemented
        return self.amount == other.amount and self.currency == other.currency

    def __add__(self, other):
        if not isinstance(other, Money):
            return NotImplemented
        if self.currency != other.currency:
            raise ValueError("Cannot add different currencies")
        return Money(self.amount + other.amount, self.currency)

a = Money(12.50)
b = Money(7.50)
total = a + b
print("str:", total)
print("repr:", repr(total))
print("Equal to Money(20)?", total == Money(20.0))`,
            output: `str: $20.00 USD
repr: Money(20.0, 'USD')
Equal to Money(20)? True`,
          },
          warning:
            'In __eq__ and binary operator dunders like __add__, return NotImplemented (never raise TypeError directly) when other is an unrelated type—and remember that defining __eq__ without __hash__ makes instances unhashable (unable to be placed in sets or dict keys).',
        },
      ],
      challenge: {
        prompt:
          'Create a class Vector2D(x, y) with __repr__, __str__ (e.g. "(3, 4)"), __eq__, __add__ (adding components into a new Vector2D), and a read-only @property named length that returns (x**2 + y**2) ** 0.5.',
        hint: 'Return NotImplemented inside __eq__ and __add__ if not isinstance(other, Vector2D). Decorate def length(self): with @property.',
        language: 'python',
        solutionCode: `class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    @property
    def length(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

    def __repr__(self):
        return f"Vector2D({self.x!r}, {self.y!r})"

    def __str__(self):
        return f"({self.x}, {self.y})"

    def __eq__(self, other):
        if not isinstance(other, Vector2D):
            return NotImplemented
        return self.x == other.x and self.y == other.y

    def __add__(self, other):
        if not isinstance(other, Vector2D):
            return NotImplemented
        return Vector2D(self.x + other.x, self.y + other.y)

v1 = Vector2D(1, 2)
v2 = Vector2D(2, 2)
v3 = v1 + v2
print(v3, "length:", v3.length, "equal?", v3 == Vector2D(3, 4))`,
      },
      quiz: [
        {
          question: 'What is the key difference between __repr__ and __str__ in Python?',
          options: [
            '__str__ is only used inside lists, while __repr__ is used by print().',
            '__repr__ provides an unambiguous developer/debug string (and acts as fallback), while __str__ provides a human-friendly display string.',
            '__repr__ must return an integer, while __str__ returns a string.',
            'There is no difference; they are exact aliases.',
          ],
          answer: 1,
          explanation:
            'print() and str() prefer __str__ and fall back to __repr__ if __str__ is not defined. Debuggers, REPL output, and container prints use __repr__.',
        },
        {
          question:
            'Why do we store self._price (with a leading underscore) inside a @property named price?',
          options: [
            'Python forbids property names shorter than 6 characters.',
            'Assigning self.price = value inside the price setter would call the setter recursively forever (RecursionError).',
            'Leading underscores automatically encrypt the value in memory.',
            'Without an underscore, @property becomes a class method.',
          ],
          answer: 1,
          explanation:
            'Inside @price.setter, writing self.price = value triggers the setter again infinitely; storing the backing value in self._price avoids recursion.',
        },
      ],
    },
    km: {
      title: 'ការស្នងមរតក Polymorphism និង Dunder Methods',
      duration: '15 នាទី',
      summary:
        'ពង្រីកថ្នាក់យ៉ាងស្អាតដោយ inheritance និង super(), ផ្ទៀងផ្ទាត់តម្លៃដោយ @property, ប្រើ duck typing/polymorphism និងកែសម្រួលប្រមាណវិធី Python ដោយ dunder methods ដូច __repr__, __str__ និង __eq__។',
      objectives: [
        'បង្កើតឋានានុក្រមថ្នាក់កូនដែលប្រើឡើងវិញ និងពង្រីកឥរិយាបថថ្នាក់មេដោយសុវត្ថិភាពតាម super()។',
        'រចនាចំណុចប្រទាក់ polymorphic ដោយ duck typing និងការពារស្ថានភាពវត្ថុដោយ @property getter/setter។',
        'អនុវត្ត dunder methods ស្នូល (__repr__, __str__, __eq__, __len__, __add__) ឱ្យថ្នាក់ផ្ទាល់ខ្លួនដំណើរការដូចប្រភេទស្រាប់របស់ Python។',
      ],
      sections: [
        {
          id: 'inheritance-and-super',
          heading: 'ការស្នងមរតកថ្នាក់ ការបដិសេធវិធីសាស្ត្រ និង super()',
          body: [
            'ការស្នងមរតក (Inheritance) អនុញ្ញាតឱ្យថ្នាក់កូន (subclass) ប្រើឡើងវិញនូវគុណលក្ខណៈ និងវិធីសាស្ត្រពីថ្នាក់មេ (base class) ខណៈបន្ថែមមុខងារថ្មី ឬកែប្រែវិធីសាស្ត្រជាក់លាក់ (override)។ អ្នកប្រកាសវាដោយដាក់ឈ្មោះថ្នាក់មេក្នុងវង់ក្រចក ដូចជា class SavingsAccount(BankAccount):។',
            'នៅក្នុងវិធីសាស្ត្រដែលបាន override—ជាពិសេស __init__—ត្រូវហៅ super().__init__(...) ជានិច្ច ជំនួសឱ្យការសរសេរឈ្មោះថ្នាក់មេផ្ទាល់។ super() ដើរតាមលំដាប់ MRO (Method Resolution Order) របស់ Python ដោយស្វ័យប្រវត្តិ។',
          ],
          points: [
            'ប្រើការស្នងមរតកតែពេលមានទំនាក់ទំនង "is-a" ពិតប្រាកដ (SavingsAccount គឺជា BankAccount); បើមិនដូច្នោះសូមប្រើ composition ("has-a")។',
            'ពិនិត្យឋានានុក្រមថ្នាក់ដោយ isinstance(obj, Parent) និង issubclass(Child, Parent)។',
            'មើលលំដាប់ស្វែងរកវិធីសាស្ត្រដោយ Child.__mro__ ពេលពិនិត្យកំហុស។',
          ],
          exampleTitle: 'ការពង្រីកថ្នាក់មេដោយ super() និងការ Override វិធីសាស្ត្រ',
          warning:
            'បើថ្នាក់កូនបង្កើត __init__ ផ្ទាល់ខ្លួន ហើយភ្លេចហៅ super().__init__(...) នោះគុណលក្ខណៈរបស់ថ្នាក់មេ (ដូច self.owner និង self.balance) នឹងមិនត្រូវបានបង្កើតឡើយ ហើយបង្ក AttributeError នៅពេលក្រោយ។',
        },
        {
          id: 'polymorphism-and-properties',
          heading: 'Polymorphism, Duck Typing និងគុណលក្ខណៈ @property',
          body: [
            'Polymorphism មានន័យថាថ្នាក់ផ្សេងគ្នាអាចមានវិធីសាស្ត្រឈ្មោះដូចគ្នា ដើម្បីឱ្យអនុគមន៍តែមួយធ្វើការជាមួយពួកវាទាំងអស់បាន។ Python ប្រើគោលការណ៍ duck typing៖ អនុគមន៍មិនខ្វល់ថាវត្ថុស្នងពីថ្នាក់ណាទេ ឱ្យតែវាមានវិធីសាស្ត្រដែលត្រូវការ (ដូច .send(message))។',
            'ជំនួសឱ្យការសរសេរ get_price() និង set_price() វែងៗ Python អនុញ្ញាតឱ្យអ្នកប្រើ @property ដើម្បីបន្ថែមការផ្ទៀងផ្ទាត់ ឬគណនាតម្លៃ ដោយមិនប៉ះពាល់កូដអ្នកហៅដែលប្រើ obj.price ឡើយ។',
          ],
          points: [
            'រក្សាតម្លៃខាងក្នុងដោយដាក់សញ្ញាបន្ទាត់ក្រោម (self._price) ក្នុង @property ដើម្បីកុំឱ្យហៅខ្លួនឯងគ្មានទីបញ្ចប់។',
            'មិនដាក់ @prop.setter ដើម្បីបង្កើតគុណលក្ខណៈ read-only (ដូច area ឬ full_name)។',
            'ប្រើ abc.ABC និង @abstractmethod ពេលចង់បង្ខំឱ្យគ្រប់ថ្នាក់កូនអនុវត្តវិធីសាស្ត្រចាំបាច់។',
          ],
          exampleTitle: 'ការផ្ទៀងផ្ទាត់តម្លៃដោយ @property និង Polymorphic Notifiers',
          tip: 'ការសរសេរ self.price = price ក្នុង __init__ នឹងរត់ឆ្លងកាត់ @price.setter ដោយស្វ័យប្រវត្តិ—ធានាថាតម្លៃអវិជ្ជមានត្រូវបានបដិសេធតាំងពីពេលបង្កើតវត្ថុដំបូង។',
        },
        {
          id: 'dunder-magic-methods',
          heading: 'Dunder (Magic) Methods (__repr__, __str__, __eq__, __add__)',
          body: [
            'វិធីសាស្ត្រដែលមានសញ្ញាបន្ទាត់ក្រោមពីរ (dunder methods) ភ្ជាប់វត្ថុផ្ទាល់ខ្លួនរបស់អ្នកទៅនឹងវេយ្យាករណ៍ស្រាប់របស់ Python ដូចជា print(), ==, +, len() និង <។ អ្នកមិនហៅ obj.__len__() ផ្ទាល់ទេ តែ Python ហៅវាស្វ័យប្រវត្តិពេលអ្នកប្រើ len(obj)។',
            'វិធីសាស្ត្រអត្ថបទពីរសំខាន់គឺ៖ __repr__ សម្រាប់អ្នកអភិវឌ្ឍ និងការ debug (ច្បាស់លាស់ ដូច Money(10.0, "USD")) ចំណែក __str__ សម្រាប់បង្ហាញអ្នកប្រើ (ដូច "$10.00 USD")។ បើអ្នកសរសេរតែមួយ សូមសរសេរ __repr__ ព្រោះ Python ប្រើវាជាជំនួសពេលគ្មាន __str__។',
          ],
          points: [
            'អនុវត្ត __eq__ ដើម្បីប្រៀបធៀបវត្ថុពីរតាមតម្លៃដោយ == (លំនាំដើមប្រៀបធៀបតែអាសយដ្ឋានអង្គចងចាំ)។',
            'ត្រឡប់ NotImplemented (មិនមែន False) ក្នុង __eq__ ឬ __add__ ពេលប្រភេទផ្សេងមិនគាំទ្រ។',
            'សម្រាប់ថ្នាក់ផ្ទុកទិន្នន័យសាមញ្ញ @dataclass បង្កើត __init__, __repr__ និង __eq__ ឱ្យដោយស្វ័យប្រវត្តិ។',
          ],
          table: {
            headers: ['Dunder Method', 'ហៅដោយស្វ័យប្រវត្តិពេលប្រើ', 'តួនាទីទូទៅ'],
            rows: [
              ['__repr__(self)', 'repr(obj), debugger, lists', 'តំណាងច្បាស់សម្រាប់អ្នកអភិវឌ្ឍ'],
              ['__str__(self)', 'str(obj), print(obj)', 'អត្ថបទងាយអានសម្រាប់អ្នកប្រើ'],
              ['__eq__(self, other)', 'a == b', 'ប្រៀបធៀបភាពស្មើគ្នាតាមតម្លៃ'],
              ['__lt__(self, other)', 'a < b, sorted()', 'ការប្រៀបធៀបលំដាប់តូចជាង'],
              ['__len__(self)', 'len(obj)', 'ចំនួនធាតុក្នុងវត្ថុ'],
              ['__add__(self, other)', 'a + b', 'ការបូក ឬបញ្ចូលគ្នាផ្ទាល់ខ្លួន'],
            ],
          },
          exampleTitle: 'ការបង្កើតថ្នាក់ Money ឱ្យប្រើបានដូចប្រភេទស្រាប់',
          warning:
            'ក្នុង __eq__ និង __add__ ត្រូវត្រឡប់ NotImplemented ពេល other ជាប្រភេទមិនពាក់ព័ន្ធ—ហើយសូមចងចាំថាការបង្កើត __eq__ ដោយមិនកំណត់ __hash__ ធ្វើឱ្យវត្ថុមិនអាចដាក់ក្នុង set ឬធ្វើជា dict key បានទេ។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើតថ្នាក់ Vector2D(x, y) ដែលមាន __repr__, __str__ (ឧ. "(3, 4)"), __eq__, __add__ (បូកកូអរដោនេបង្កើត Vector2D ថ្មី) និង @property ប្រភេទ read-only ឈ្មោះ length ដែលត្រឡប់ (x**2 + y**2) ** 0.5។',
        hint: 'ត្រឡប់ NotImplemented ក្នុង __eq__ និង __add__ បើ not isinstance(other, Vector2D) ហើយដាក់ @property លើ def length(self):។',
      },
      quiz: [
        {
          question: 'តើអ្វីជាភាពខុសគ្នាសំខាន់រវាង __repr__ និង __str__ ក្នុង Python?',
          options: [
            '__str__ ប្រើតែក្នុង list ចំណែក __repr__ ប្រើដោយ print()។',
            '__repr__ ផ្ដល់អត្ថបទច្បាស់សម្រាប់អ្នកអភិវឌ្ឍ/debug (និងជាជំនួស) ចំណែក __str__ ផ្ដល់អត្ថបទងាយអានសម្រាប់អ្នកប្រើ។',
            '__repr__ ត្រូវត្រឡប់លេខ int ចំណែក __str__ ត្រឡប់ str។',
            'គ្មានភាពខុសគ្នាទេ ពួកវាដូចគ្នាទាំងស្រុង។',
          ],
          answer: 1,
          explanation:
            'print() និង str() ប្រើ __str__ ជាមុន ហើយបើគ្មានទើបប្រើ __repr__។ ចំណែក debugger និងការបង្ហាញក្នុង list ប្រើ __repr__។',
        },
        {
          question:
            'ហេតុអ្វីយើងរក្សា self._price (មានសញ្ញាបន្ទាត់ក្រោម) នៅខាងក្នុង @property ឈ្មោះ price?',
          options: [
            'Python ហាមឈ្មោះ property ខ្លីជាង 6 តួអក្សរ។',
            'ការសរសេរ self.price = value ក្នុង setter នឹងហៅ setter ខ្លួនឯងឡើងវិញគ្មានទីបញ្ចប់ (RecursionError)។',
            'សញ្ញាបន្ទាត់ក្រោមអ៊ិនគ្រីបតម្លៃដោយស្វ័យប្រវត្តិ។',
            'បើគ្មានសញ្ញាបន្ទាត់ក្រោម @property នឹងក្លាយជា class method។',
          ],
          answer: 1,
          explanation:
            'នៅក្នុង @price.setter ការផ្ដល់តម្លៃឱ្យ self.price នឹងហៅ setter ម្ដងទៀតឥតឈប់; ការប្រើ self._price ជួយជៀសវាង recursion នោះ។',
        },
      ],
    },
  },

  // =========================================================================
  // 6. JSON, REGULAR EXPRESSIONS & WORKING WITH APIS
  // =========================================================================
  {
    slug: 'python-json-regex-http',
    level: 'pro',
    insertAfter: 'python-inheritance-and-dunder',
    en: {
      title: 'JSON, Regular Expressions (re) & Working with APIs',
      duration: '15 min',
      summary:
        'Serialize and validate JSON payloads with the json module, extract structured text using compiled regular expressions (re), and consume HTTP JSON APIs cleanly with defensive parsing and timeouts.',
      objectives: [
        'Parse and serialize JSON strings and files with json.loads(), json.dumps(), json.load(), and json.dump().',
        'Match, extract, and sanitize text patterns reliably using raw strings, named groups, and re.compile().',
        'Fetch and normalize HTTP JSON API responses safely using timeouts, status checks, and defensive .get() lookups.',
      ],
      sections: [
        {
          id: 'json-serialization-and-parsing',
          heading: 'Parsing & Serializing JSON with the json Module',
          body: [
            'JSON (JavaScript Object Notation) is the universal data format for web APIs, configuration files, and microservices. Python’s standard json module provides two pairs of functions: loads() / dumps() work on strings ("s" for string), while load() / dump() read from and write directly to file objects.',
            'When converting Python structures to JSON, pass indent=2 for readable output, sort_keys=True for deterministic diffs, and ensure_ascii=False when preserving Khmer or other Unicode scripts cleanly instead of escaping them as \\uXXXX sequences. Always guard json.loads() with except json.JSONDecodeError when handling untrusted input.',
          ],
          points: [
            'Remember the naming rule: loads/dumps = string; load/dump = file.',
            'JSON object keys are ALWAYS strings: dumping {1: "a"} turns key 1 into "1" when loaded back.',
            'Python sets, tuples, and datetime objects are not native JSON types—convert them first or pass a custom default= serializer function.',
          ],
          table: {
            headers: ['Python Type', 'JSON Equivalent', 'Notes'],
            rows: [
              ['dict', 'object {...}', 'Keys are converted to strings'],
              ['list, tuple', 'array [...]', 'Both load back as Python list'],
              ['str', 'string "..."', 'Use ensure_ascii=False for Khmer/Unicode'],
              ['int, float', 'number', 'Avoid NaN/Infinity for strict JSON'],
              ['True / False', 'true / false', 'Lowercase booleans in JSON'],
              ['None', 'null', 'Mapped cleanly both ways'],
            ],
          },
          example: {
            title: 'Round-Tripping Unicode JSON & Handling Malformed Input',
            language: 'python',
            code: `import json

payload = {
    "course": "Python Pro",
    "city": "Phnom Penh",
    "khmer_title": "មេរៀន Python",
    "active": True,
    "modules": 12,
    "deprecated": None,
}

encoded = json.dumps(payload, indent=2, ensure_ascii=False)
print(encoded)

decoded = json.loads(encoded)
print("Loaded course:", decoded["course"], "| Active:", decoded["active"])

try:
    json.loads('{"broken": }')
except json.JSONDecodeError as err:
    print(f"Bad JSON at col {err.colno}: {err.msg}")`,
            output: `{
  "course": "Python Pro",
  "city": "Phnom Penh",
  "khmer_title": "មេរៀន Python",
  "active": true,
  "modules": 12,
  "deprecated": null
}
Loaded course: Python Pro | Active: True
Bad JSON at col 12: Expecting value`,
          },
          warning:
            'JSON does not preserve Python tuples or integer dictionary keys: tuples become lists and int keys like {200: "OK"} reload as {"200": "OK"}. Never parse untrusted JSON without catching json.JSONDecodeError.',
        },
        {
          id: 'regex-with-re-module',
          heading: 'Pattern Matching & Extraction with re',
          body: [
            'When simple .split() or .replace() is not expressive enough—such as validating invoice numbers, pulling log timestamps, or redacting emails—Python’s re module lets you describe text patterns precisely. Always write regex patterns as raw strings (r"\\d{4}-\\d{2}-\\d{2}") so Python passes backslashes straight to the regex engine instead of interpreting them as string escapes.',
            'Know the core re functions: re.search() finds the first match anywhere in a string, re.fullmatch() verifies that the ENTIRE string matches a pattern (ideal for validation), re.findall() returns every match, and re.sub() replaces matched text. Named capture groups (?P<name>...) turn cryptic m.group(2) lookups into readable m.group("code") dictionaries.',
          ],
          points: [
            'Compile patterns reused inside loops with pattern = re.compile(r"...") for clarity and speed.',
            'Prefer re.fullmatch() over re.match() for input validation, because re.match() only anchors the start and ignores trailing junk.',
            'Use non-greedy quantifiers (*?, +?) when matching between delimiters so a regex does not swallow everything up to the last delimiter.',
          ],
          table: {
            headers: ['Token / Function', 'Matches / Behavior', 'Example'],
            rows: [
              ['\\d / \\w / \\s', 'Digit / word char / whitespace', 'r"\\d{4}" matches "2026"'],
              ['+ / * / ? / {m,n}', '1+, 0+, optional, m..n repeats', 'r"[A-Z]{2,3}"'],
              ['^ / $', 'Start / end of string (or line)', 'r"^ERR"'],
              ['(?P<name>...)', 'Named capture group', 'm.group("id")'],
              ['re.search(pat, s)', 'First match anywhere or None', 'Returns Match object'],
              ['re.sub(pat, repl, s)', 'Replace all matches', 'Mask emails or tokens'],
            ],
          },
          example: {
            title: 'Extracting Structured Fields with Named Groups & re.sub()',
            language: 'python',
            code: `import re

LOG_PATTERN = re.compile(
    r"\\[(?P<date>\\d{4}-\\d{2}-\\d{2})\\]\\s+(?P<level>INFO|WARN|ERROR)\\s+user=(?P<user>\\w+)\\s+ms=(?P<ms>\\d+)"
)

log_line = "[2026-11-22] ERROR user=dara_99 ms=482"
match = LOG_PATTERN.search(log_line)
if match:
    record = match.groupdict()
    record["ms"] = int(record["ms"])
    print("Parsed log:", record)

note = "Contact billing@codehub.dev or ops@codehub.dev for keys."
redacted = re.sub(r"[\\w.+-]+@[\\w-]+\\.[\\w.-]+", "[REDACTED]", note)
print("Sanitized:", redacted)`,
            output: `Parsed log: {'date': '2026-11-22', 'level': 'ERROR', 'user': 'dara_99', 'ms': 482}
Sanitized: Contact [REDACTED] or [REDACTED] for keys.`,
          },
          warning:
            'Always prefix regex literals with r"..."—forgetting the r turns "\\b" into a backspace character instead of a word boundary! Also avoid parsing nested HTML or JSON with regex; use dedicated parsers instead.',
        },
        {
          id: 'working-with-http-apis',
          heading: 'Working with HTTP JSON APIs Cleanly',
          body: [
            'Most real-world Python services talk to REST APIs over HTTP—using the built-in urllib.request module (zero dependencies) or the popular third-party requests / httpx libraries. Regardless of which HTTP client you pick, production-ready API calls always set an explicit timeout, send clear headers (Accept: application/json and a User-Agent), and inspect the HTTP status code before decoding JSON.',
            'Once you decode the response body, never assume every nested key exists. Build a small parser function that normalizes raw API payloads into clean internal dictionaries using .get() defaults, converts types explicitly, and isolates the rest of your app from upstream API schema changes.',
          ],
          points: [
            'ALWAYS pass timeout=5 (or similar) to every HTTP request; without a timeout, a stalled server can hang your script indefinitely.',
            'Check HTTP status codes (response.raise_for_status() in requests, or status == 200 in urllib) before calling json.loads().',
            'Separate network fetching from response parsing so you can unit-test your parser with offline JSON fixtures.',
          ],
          example: {
            title: 'Clean API Client & Defensive Response Normalization',
            language: 'python',
            code: `import json
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

def parse_repo_summary(raw_json):
    """Pure parser: easy to unit-test without hitting the network."""
    data = json.loads(raw_json)
    owner = data.get("owner") or {}
    return {
        "name": data.get("full_name", "unknown/repo"),
        "owner": owner.get("login", "unknown"),
        "stars": int(data.get("stargazers_count", 0)),
        "language": data.get("language") or "Unspecified",
        "topics": list(data.get("topics") or []),
    }

def fetch_json(url, timeout=5):
    req = Request(url, headers={"Accept": "application/json", "User-Agent": "CodeHub-App/1.0"})
    try:
        with urlopen(req, timeout=timeout) as resp:
            if resp.status != 200:
                raise RuntimeError(f"Unexpected status: {resp.status}")
            return resp.read().decode("utf-8")
    except (HTTPError, URLError) as err:
        raise RuntimeError(f"API request failed: {err}") from err

# Offline demo of the parser using a realistic GitHub API payload
sample_api_response = json.dumps({
    "full_name": "codehub/python-starter",
    "owner": {"login": "codehub"},
    "stargazers_count": 340,
    "language": "Python",
    "topics": ["education", "khmer", "python"],
})

summary = parse_repo_summary(sample_api_response)
print(f"{summary['name']} by {summary['owner']}")
print(f"Stars: {summary['stars']} | Lang: {summary['language']}")
print("Topics:", ", ".join(summary["topics"]))`,
            output: `codehub/python-starter by codehub
Stars: 340 | Lang: Python
Topics: education, khmer, python`,
          },
          tip: 'In production scripts that make multiple requests to the same API, use requests.Session() or httpx.Client() to reuse TCP/TLS connections, share authorization headers, and respect rate-limit headers like Retry-After.',
        },
      ],
      challenge: {
        prompt:
          'Write a function extract_valid_orders(api_json) that parses a JSON string representing an API response {"orders": [{"id": "ORD-1024", "amount": 45.5}, ...]}, filters only orders whose id matches r"^ORD-\\d{4}$" and whose amount is a positive number, and returns a dict with keys "valid_ids" (list) and "total" (rounded to 2 decimals).',
        hint: 'Parse with json.loads(api_json), use re.fullmatch(r"ORD-\\d{4}", str(order.get("id", ""))), check isinstance(amount, (int, float)) and amount > 0, and return the summary dict.',
        language: 'python',
        solutionCode: `import json
import re

ORDER_ID_RE = re.compile(r"ORD-\\d{4}")

def extract_valid_orders(api_json):
    payload = json.loads(api_json)
    valid_ids = []
    total = 0.0

    for order in payload.get("orders", []):
        oid = str(order.get("id", ""))
        amount = order.get("amount")
        if ORDER_ID_RE.fullmatch(oid) and isinstance(amount, (int, float)) and amount > 0:
            valid_ids.append(oid)
            total += amount

    return {"valid_ids": valid_ids, "total": round(total, 2)}

sample = json.dumps({
    "orders": [
        {"id": "ORD-1024", "amount": 45.5},
        {"id": "BAD-99", "amount": 100},
        {"id": "ORD-2048", "amount": -10},
        {"id": "ORD-3099", "amount": 19.25},
    ]
})
print(extract_valid_orders(sample))`,
      },
      quiz: [
        {
          question:
            'Which json module functions convert between a Python dictionary and a JSON-formatted string in memory?',
          options: [
            'json.load() and json.dump()',
            'json.loads() and json.dumps()',
            'json.parse() and json.stringify()',
            'json.read() and json.write()',
          ],
          answer: 1,
          explanation:
            'The "s" suffix stands for string: json.loads() parses a JSON string into Python objects, and json.dumps() serializes Python objects to a JSON string.',
        },
        {
          question:
            'Why should you prefer re.fullmatch(r"\\d{4}", text) over re.match(r"\\d{4}", text) when validating a 4-digit PIN?',
          options: [
            're.match() is deprecated in Python 3.',
            're.match() only checks the start of the string, so "1234abc" would pass, whereas re.fullmatch() requires the entire string to match.',
            're.fullmatch() ignores case automatically.',
            're.fullmatch() returns a list of all matches.',
          ],
          answer: 1,
          explanation:
            're.match() anchors only at position 0, allowing trailing characters. re.fullmatch() succeeds only when the entire input string conforms to the pattern.',
        },
      ],
    },
    km: {
      title: 'JSON, Regular Expressions (re) និងការធ្វើការជាមួយ APIs',
      duration: '15 នាទី',
      summary:
        'បម្លែង និងផ្ទៀងផ្ទាត់ទិន្នន័យ JSON ដោយម៉ូឌុល json, ដកស្រង់អត្ថបទតាមលំនាំដោយ re និងទាញយកទិន្នន័យពី HTTP JSON APIs យ៉ាងស្អាតដោយមាន timeout និងការញែកការពារកំហុស។',
      objectives: [
        'ញែក និងបម្លែង JSON ជាខ្សែអក្សរ និងឯកសារដោយ json.loads(), json.dumps(), json.load() និង json.dump()។',
        'ផ្គូផ្គង ដកស្រង់ និងសម្អាតអត្ថបទតាមលំនាំដោយ raw strings, named groups និង re.compile()។',
        'ទាញ និងរៀបចំលទ្ធផល HTTP JSON API ដោយសុវត្ថិភាពជាមួយ timeout, ការពិនិត្យ status និង .get()។',
      ],
      sections: [
        {
          id: 'json-serialization-and-parsing',
          heading: 'ការញែក និងបម្លែង JSON ដោយម៉ូឌុល json',
          body: [
            'JSON (JavaScript Object Notation) ជាទម្រង់ទិន្នន័យស្តង់ដារសម្រាប់ Web APIs និងឯកសារកំណត់រចនាសម្ព័ន្ធ។ ម៉ូឌុល json របស់ Python មានអនុគមន៍ពីរគូ៖ loads() / dumps() ធ្វើការលើខ្សែអក្សរ ("s" = string) ចំណែក load() / dump() អាន និងសរសេរផ្ទាល់លើឯកសារ។',
            'ពេលបម្លែងទិន្នន័យ Python ជា JSON សូមដាក់ indent=2 ដើម្បីឱ្យស្អាតងាយអាន និង ensure_ascii=False ដើម្បីរក្សាអក្សរខ្មែរ ឬ Unicode ឱ្យត្រឹមត្រូវជំនួសឱ្យកូដ \\uXXXX។ ត្រូវចាប់ except json.JSONDecodeError ជានិច្ចពេលអាន JSON ពីខាងក្រៅ។',
          ],
          points: [
            'ចងចាំច្បាប់ឈ្មោះ៖ loads/dumps = ខ្សែអក្សរ; load/dump = ឯកសារ។',
            'Key ក្នុង JSON object តែងតែជា string៖ ការបម្លែង {1: "a"} នឹងក្លាយជា {"1": "a"} ពេលអានមកវិញ។',
            'ប្រភេទ set, tuple និង datetime មិនមែនជាប្រភេទដើមរបស់ JSON ទេ—ត្រូវបម្លែងជាមុន ឬប្រើអនុគមន៍ default=។',
          ],
          table: {
            headers: ['ប្រភេទ Python', 'ប្រភេទ JSON សមមូល', 'ចំណាំ'],
            rows: [
              ['dict', 'object {...}', 'Key ទាំងអស់ត្រូវបម្លែងជា string'],
              ['list, tuple', 'array [...]', 'ពេលអានមកវិញទាំងពីរក្លាយជា list'],
              ['str', 'string "..."', 'ប្រើ ensure_ascii=False សម្រាប់អក្សរខ្មែរ'],
              ['int, float', 'number', 'ជៀសវាង NaN/Infinity សម្រាប់ JSON ស្តង់ដារ'],
              ['True / False', 'true / false', 'Boolean អក្សរតូចក្នុង JSON'],
              ['None', 'null', 'បម្លែងទៅវិញទៅមកដោយស្វ័យប្រវត្តិ'],
            ],
          },
          exampleTitle: 'ការបម្លែង JSON អក្សរខ្មែរ/Unicode និងការចាប់កំហុស JSON ខូច',
          warning:
            'JSON មិនរក្សាប្រភេទ tuple ឬ key ជាលេខ int ទេ៖ tuple ក្លាយជា list ហើយ {200: "OK"} អានមកវិញជា {"200": "OK"}។ កុំភ្លេចចាប់ json.JSONDecodeError ពេលញែក JSON ពីអ្នកប្រើ ឬបណ្ដាញ។',
        },
        {
          id: 'regex-with-re-module',
          heading: 'ការផ្គូផ្គង និងដកស្រង់លំនាំអត្ថបទដោយ re',
          body: [
            'ពេល .split() ឬ .replace() មិនគ្រប់គ្រាន់—ដូចជាការផ្ទៀងផ្ទាត់លេខវិក្កយបត្រ ទាញយកកាលបរិច្ឆេទពី log ឬលាក់អ៊ីមែល—ម៉ូឌុល re ជួយពិពណ៌នាលំនាំអត្ថបទយ៉ាងច្បាស់។ ត្រូវសរសេរលំនាំជា raw string (r"\\d{4}-\\d{2}-\\d{2}") ជានិច្ច ដើម្បីឱ្យ Python បញ្ជូនសញ្ញា \\ ផ្ទាល់ទៅម៉ាស៊ីន regex។',
            'អនុគមន៍សំខាន់ៗរួមមាន៖ re.search() រកលទ្ធផលដំបូងនៅទីណាក៏បាន, re.fullmatch() ផ្ទៀងផ្ទាត់ខ្សែអក្សរទាំងមូល (ល្អបំផុតសម្រាប់ validation), re.findall() រកគ្រប់ទីតាំង និង re.sub() ជំនួសអត្ថបទ។ ក្រុមដាក់ឈ្មោះ (?P<name>...) ជួយទាញទិន្នន័យជា dictionary យ៉ាងងាយអាន។',
          ],
          points: [
            'Compile លំនាំដែលប្រើច្រើនដងក្នុងរង្វិលជុំដោយ pattern = re.compile(r"...") ដើម្បីល្បឿន និងភាពស្អាត។',
            'ប្រើ re.fullmatch() ជំនួស re.match() សម្រាប់ផ្ទៀងផ្ទាត់ទិន្នន័យ ព្រោះ re.match() ពិនិត្យតែផ្នែកដើមប៉ុណ្ណោះ។',
            'ប្រើ quantifier បែប non-greedy (*?, +?) ពេលចាប់អត្ថបទចន្លោះសញ្ញាបើកបិទ ដើម្បីកុំឱ្យលេបអត្ថបទលើស។',
          ],
          table: {
            headers: ['និមិត្តសញ្ញា / អនុគមន៍', 'អត្ថន័យ', 'ឧទាហរណ៍'],
            rows: [
              ['\\d / \\w / \\s', 'លេខ / តួអក្សរពាក្យ / ដកឃ្លា', 'r"\\d{4}" ផ្គូផ្គង "2026"'],
              ['+ / * / ? / {m,n}', '1+, 0+, មានឬគ្មាន, ចំនួន m..n', 'r"[A-Z]{2,3}"'],
              ['^ / $', 'ដើម / ចុងខ្សែអក្សរ', 'r"^ERR"'],
              ['(?P<name>...)', 'ក្រុមចាប់យកមានឈ្មោះ', 'm.group("id")'],
              ['re.search(pat, s)', 'រកការផ្គូផ្គងដំបូង ឬ None', 'ត្រឡប់វត្ថុ Match'],
              ['re.sub(pat, repl, s)', 'ជំនួសគ្រប់កន្លែងដែលត្រូវ', 'លាក់អ៊ីមែល ឬលេខសម្ងាត់'],
            ],
          },
          exampleTitle: 'ការដកស្រង់ Log ដោយ Named Groups និងការលាក់អ៊ីមែលដោយ re.sub()',
          warning:
            'ត្រូវដាក់បុព្វបទ r"..." ជានិច្ចលើ regex—ការភ្លេច r ធ្វើឱ្យ "\\b" ក្លាយជាតួអក្សរ backspace ជំនួសព្រំដែនពាក្យ! កុំប្រើ regex ដើម្បីញែក HTML ឬ JSON ត្រួតជាន់ជ្រៅ។',
        },
        {
          id: 'working-with-http-apis',
          heading: 'ការធ្វើការជាមួយ HTTP JSON APIs យ៉ាងស្អាត',
          body: [
            'កម្មវិធី Python ភាគច្រើនទាក់ទងជាមួយ REST APIs តាម HTTP—ដោយប្រើ urllib.request ដែលមានស្រាប់ (មិនបាច់ដំឡើងកញ្ចប់បន្ថែម) ឬបណ្ណាល័យពេញនិយមដូច requests / httpx។ ទោះប្រើឧបករណ៍ណាក៏ដោយ ត្រូវកំណត់ timeout ឱ្យច្បាស់ ផ្ញើ header ត្រឹមត្រូវ និងពិនិត្យ HTTP status code មុនពេលញែក JSON។',
            'ក្រោយញែក JSON រួច កុំសន្មតថាគ្រប់ key សុទ្ធតែមានជានិច្ច។ សូមសរសេរអនុគមន៍ញែកដាច់ដោយឡែកដែលប្រើ .get() មានតម្លៃលំនាំដើម ដើម្បីការពារកម្មវិធីពីការផ្លាស់ប្ដូរទម្រង់ API និងងាយស្រួលធ្វើតេស្តដោយមិនបាច់ភ្ជាប់អ៊ីនធឺណិត។',
          ],
          points: [
            'កំណត់ timeout=5 (ឬសមស្រប) លើគ្រប់សំណើ HTTP ដើម្បីកុំឱ្យកម្មវិធីគាំងរង់ចាំម៉ាស៊ីនមេគ្មានទីបញ្ចប់។',
            'ពិនិត្យ status code (response.raise_for_status() ឬ resp.status == 200) មុនហៅ json.loads()។',
            'បំបែកអនុគមន៍ទាញបណ្ដាញចេញពីអនុគមន៍ញែកទិន្នន័យ ដើម្បីអាចធ្វើ unit test ដោយទិន្នន័យ JSON គំរូ។',
          ],
          exampleTitle: 'ការសរសេរ API Client និងអនុគមន៍ញែកទិន្នន័យការពារកំហុស',
          tip: 'ក្នុងកម្មវិធីផលិតកម្មដែលហៅ API ដដែលច្រើនដង សូមប្រើ requests.Session() ឬ httpx.Client() ដើម្បីប្រើការតភ្ជាប់ TCP/TLS ឡើងវិញ និងចែករំលែក header រួមគ្នា។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ extract_valid_orders(api_json) ដែលញែក JSON ទម្រង់ {"orders": [{"id": "ORD-1024", "amount": 45.5}, ...]} ច្រោះយកតែការបញ្ជាទិញដែល id ត្រូវនឹង r"^ORD-\\d{4}$" និង amount ជាលេខវិជ្ជមាន រួចត្រឡប់ dict មាន key "valid_ids" (list) និង "total" (បង្គត់ 2 ខ្ទង់ទសភាគ)។',
        hint: 'ញែកដោយ json.loads(api_json), ផ្ទៀងផ្ទាត់ដោយ re.fullmatch(r"ORD-\\d{4}", ...), ពិនិត្យ isinstance(amount, (int, float)) and amount > 0 រួចបូកសរុប។',
      },
      quiz: [
        {
          question:
            'តើអនុគមន៍ណានៃម៉ូឌុល json បម្លែងទៅវិញទៅមករវាង Python dict និងខ្សែអក្សរ JSON ក្នុងអង្គចងចាំ?',
          options: [
            'json.load() និង json.dump()',
            'json.loads() និង json.dumps()',
            'json.parse() និង json.stringify()',
            'json.read() និង json.write()',
          ],
          answer: 1,
          explanation:
            'អក្សរ "s" នៅខាងចុងតំណាងឱ្យ string៖ json.loads() អានពីខ្សែអក្សរ JSON ហើយ json.dumps() បម្លែងទៅជាខ្សែអក្សរ JSON។',
        },
        {
          question:
            'ហេតុអ្វីគួរប្រើ re.fullmatch(r"\\d{4}", text) ជំនួស re.match(r"\\d{4}", text) ពេលផ្ទៀងផ្ទាត់លេខកូដ PIN 4 ខ្ទង់?',
          options: [
            're.match() លែងប្រើក្នុង Python 3 ហើយ។',
            're.match() ពិនិត្យតែផ្នែកដើមប៉ុណ្ណោះ (ដូច្នេះ "1234abc" ក៏ជាប់ដែរ) ចំណែក re.fullmatch() តម្រូវឱ្យខ្សែអក្សរទាំងមូលត្រូវតាមលំនាំ។',
            're.fullmatch() មិនប្រកាន់អក្សរធំតូចដោយស្វ័យប្រវត្តិ។',
            're.fullmatch() ត្រឡប់ list នៃលទ្ធផលទាំងអស់។',
          ],
          answer: 1,
          explanation:
            're.match() ផ្ទៀងផ្ទាត់តែចាប់ពីតួអក្សរដំបូង ដោយអនុញ្ញាតឱ្យមានតួអក្សរលើសខាងក្រោយ ចំណែក re.fullmatch() តម្រូវឱ្យត្រូវទាំងស្រុង។',
        },
      ],
    },
  },
]
