export const languagesDeep = {
  'python/python-from-zero': {
    en: {
      duration: '10 min',
      objectives: [
        'Convert text input safely into numbers using int(), float(), and str()',
        'Combine comparison and logical operators (and, or, not) to build multi-branch decisions',
        'Use while loops with break and continue without creating infinite loops',
        'Trace range(start, stop, step) bounds accurately on your first try',
      ],
      extraSections: [
        {
          id: 'types-and-conversions',
          heading: 'Input, Type Conversion & Truthiness',
          body: [
            'Every value in Python has a concrete runtime type—even though you do not declare types upfront. Numbers without decimals are int, decimal numbers are float, text is str, and True/False values are bool. Whenever you read data from a user via input(), Python always gives you a str, even if the user typed digits like "42".',
            'Before doing arithmetic or numeric comparisons, convert strings explicitly with int() or float(). Python also treats empty values (0, 0.0, "", [], None) as falsy in if conditions, which lets you write clean guard clauses like if not username: instead of checking len(username) == 0.',
          ],
          points: [
            'Use type(value) when debugging to inspect what type an expression actually produced.',
            'Chain comparisons naturally in Python: 18 <= age < 65 reads cleanly and evaluates age once.',
            'Combine conditions with English keywords (and, or, not) rather than &&, ||, or !.',
            'Empty strings, zero, and None evaluate to False in boolean contexts; non-empty values are True.',
          ],
          table: {
            headers: ['Constructor / Check', 'Converts / Tests', 'Example', 'Result'],
            rows: [
              ['int(x)', 'Whole number', 'int("42")', '42'],
              ['float(x)', 'Decimal number', 'float("19.5")', '19.5'],
              ['str(x)', 'Text representation', 'str(100)', '"100"'],
              ['bool(x)', 'Truthiness check', 'bool("") / bool("hi")', 'False / True'],
            ],
          },
          example: {
            title: 'Parsing Input & Chained Comparisons',
            language: 'python',
            code: `raw_age = "21"
has_student_id = True

age = int(raw_age)
if age < 12:
    ticket_price = 4.0
elif 12 <= age <= 25 and has_student_id:
    ticket_price = 6.5
else:
    ticket_price = 10.0

print(f"Age: {age} ({type(age).__name__})")
print(f"Ticket price: \${ticket_price:.2f}")`,
            output: `Age: 21 (int)
Ticket price: $6.50`,
          },
          warning:
            'Because input() always returns a str, adding raw_a + raw_b concatenates text ("10" + "5" -> "105") and comparing "20" >= 18 raises TypeError. Always convert with int() or float() first.',
        },
        {
          id: 'while-loops-and-control',
          heading: 'while Loops, break, continue & range()',
          body: [
            'Use a for loop with range() when you know how many steps to run, and a while loop when you need to keep repeating until a condition changes—such as retrying a failed connection or processing items until a budget runs out. Remember that range(start, stop, step) always stops one step BEFORE stop.',
            'Inside any loop, continue skips straight to the next iteration (ideal for ignoring bad records), while break exits the loop immediately once you find what you need. Always make sure every path through a while loop moves closer to its exit condition.',
          ],
          points: [
            'range(5) produces 0, 1, 2, 3, 4; range(10, 0, -2) counts down: 10, 8, 6, 4, 2.',
            'Use continue early to skip invalid values and keep the main loop body flat.',
            'Use break to stop scanning as soon as a target condition is met.',
          ],
          example: {
            title: 'Filtering Sensor Readings with continue & break',
            language: 'python',
            code: `readings = [22, -999, 25, 29, 105, 24]
valid_count = 0
index = 0

while index < len(readings):
    temp = readings[index]
    index += 1
    if temp == -999:
        continue  # Skip broken sensor reading
    if temp >= 100:
        print(f"Overheat alert at {temp}C! Stopping.")
        break
    valid_count += 1
    print(f"OK reading #{valid_count}: {temp}C")`,
            output: `OK reading #1: 22C
OK reading #2: 25C
OK reading #3: 29C
Overheat alert at 105C! Stopping.`,
          },
          tip: 'When iterating with while, increment your counter BEFORE any continue statement, or your loop will inspect the same element forever.',
        },
      ],
      challenge: {
        prompt:
          'Write a Python loop from 1 to 15 (inclusive) that prints "VIP" for numbers divisible by both 3 and 5, "Priority" for multiples of 3, "Express" for multiples of 5, and the number itself otherwise.',
        hint: 'Check the combined condition (n % 3 == 0 and n % 5 == 0) FIRST inside if/elif/else, otherwise the single-divisor branch will match 15 first.',
        language: 'python',
        solutionCode: `for n in range(1, 16):
    if n % 3 == 0 and n % 5 == 0:
        print("VIP")
    elif n % 3 == 0:
        print("Priority")
    elif n % 5 == 0:
        print("Express")
    else:
        print(n)`,
      },
      quiz: [
        {
          question: 'Which numbers does range(2, 10, 3) generate in Python?',
          options: ['2, 5, 8', '2, 5, 8, 10', '3, 6, 9', '2, 4, 6, 8'],
          answer: 0,
          explanation:
            'range(start, stop, step) starts at 2, adds 3 each step (2, 5, 8), and stops before reaching 10 (the next value 11 is >= 10).',
        },
        {
          question: 'What happens if you run age = input("Age: "); print(age + 1) and the user types 20?',
          options: [
            'It prints 21',
            'It prints "201"',
            'It raises a TypeError because age is a str, not an int',
            'It converts age to int automatically',
          ],
          answer: 2,
          explanation:
            'input() always returns a str, and Python does not implicitly coerce strings to integers during +, so "20" + 1 raises TypeError.',
        },
      ],
    },
    km: {
      duration: '10 នាទី',
      objectives: [
        'បំប្លែងអត្ថបទដែលបញ្ចូលទៅជាលេខដោយសុវត្ថិភាពតាមរយៈ int(), float() និង str()',
        'ផ្សំប្រមាណវិធីប្រៀបធៀប និងតក្កវិជ្ជា (and, or, not) ដើម្បីបង្កើតលក្ខខណ្ឌច្រើនផ្លូវ',
        'ប្រើរង្វិលជុំ while ជាមួយ break និង continue ដោយមិនឱ្យជាប់រង្វិលជុំគ្មានទីបញ្ចប់',
        'កំណត់ដែនកំណត់នៃ range(start, stop, step) បានត្រឹមត្រូវតាំងពីដំបូង',
      ],
      extraSections: [
        {
          id: 'types-and-conversions',
          heading: 'ការបញ្ចូលទិន្នន័យ ការបំប្លែងប្រភេទ និង Truthiness',
          body: [
            'គ្រប់តម្លៃក្នុង Python សុទ្ធតែមានប្រភេទទិន្នន័យច្បាស់លាស់ ទោះបីអ្នកមិនចាំបាច់ប្រកាសប្រភេទទុកមុនក៏ដោយ។ លេខគត់គឺ int លេខទសភាគគឺ float អត្ថបទគឺ str និងតម្លៃពិត/មិនពិតគឺ bool។ ពេលអ្នកអានទិន្នន័យពីអ្នកប្រើប្រាស់តាម input() Python តែងតែត្រឡប់ជា str ជានិច្ច ទោះបីគេវាយលេខ "42" ក៏ដោយ។',
            'មុនពេលគណនា ឬប្រៀបធៀបលេខ ត្រូវបំប្លែងអត្ថបទជាមុនដោយប្រើ int() ឬ float()។ លើសពីនេះ Python ចាត់ទុកតម្លៃទទេ (0, 0.0, "", [], None) ថាជា False ក្នុងលក្ខខណ្ឌ if ដែលជួយឱ្យអ្នកសរសេរលក្ខខណ្ឌខ្លីស្អាតដូចជា if not username:។',
          ],
          points: [
            'ប្រើ type(value) ពេលស្វែងរកកំហុស ដើម្បីពិនិត្យប្រភេទទិន្នន័យពិតប្រាកដនៃអថេរ។',
            'អាចភ្ជាប់ការប្រៀបធៀបជាប់គ្នាបានយ៉ាងស្អាត៖ 18 <= age < 65។',
            'ផ្សំលក្ខខណ្ឌដោយពាក្យ and, or, not ជំនួសឱ្យ &&, || ឬ !។',
            'អត្ថបទទទេ លេខសូន្យ និង None មានតម្លៃ False ចំណែកតម្លៃមិនទទេមានតម្លៃ True។',
          ],
          table: {
            headers: ['អនុគមន៍បំប្លែង', 'ប្រភេទគោលដៅ', 'ឧទាហរណ៍', 'លទ្ធផល'],
            rows: [
              ['int(x)', 'លេខគត់', 'int("42")', '42'],
              ['float(x)', 'លេខទសភាគ', 'float("19.5")', '19.5'],
              ['str(x)', 'អត្ថបទ', 'str(100)', '"100"'],
              ['bool(x)', 'តម្លៃពិត/មិនពិត', 'bool("") / bool("hi")', 'False / True'],
            ],
          },
          exampleTitle: 'ការបំប្លែងទិន្នន័យបញ្ចូល និងការប្រៀបធៀបជាប់គ្នា',
          warning:
            'ដោយសារ input() តែងតែត្រឡប់ជា str ការបូក raw_a + raw_b នឹងភ្ជាប់អត្ថបទ ("10" + "5" -> "105") ហើយការប្រៀបធៀប "20" >= 18 នឹងបង្ក TypeError។ ត្រូវបំប្លែងជាមួយ int() ឬ float() ជាមុនជានិច្ច។',
        },
        {
          id: 'while-loops-and-control',
          heading: 'រង្វិលជុំ while, break, continue និង range()',
          body: [
            'ប្រើរង្វិលជុំ for ជាមួយ range() នៅពេលដឹងចំនួនជុំច្បាស់លាស់ និងប្រើ while នៅពេលត្រូវធ្វើម្ដងទៀតរហូតដល់លក្ខខណ្ឌផ្លាស់ប្ដូរ ដូចជាការព្យាយាមភ្ជាប់ម្ដងទៀត។ សូមចាំថា range(start, stop, step) តែងតែឈប់មុនតម្លៃ stop មួយជំហាន។',
            'នៅក្នុងរង្វិលជុំ continue នឹងរំលងទៅជុំបន្ទាប់ភ្លាមៗ (ល្អសម្រាប់រំលងទិន្នន័យខូច) ចំណែក break នឹងបញ្ឈប់រង្វិលជុំទាំងមូលភ្លាមៗ។ ត្រូវប្រាកដថាគ្រប់ផ្លូវក្នុង while សុទ្ធតែនាំទៅរកលក្ខខណ្ឌបញ្ចប់។',
          ],
          points: [
            'range(5) បង្កើត 0, 1, 2, 3, 4 ចំណែក range(10, 0, -2) រាប់ថយក្រោយ៖ 10, 8, 6, 4, 2។',
            'ប្រើ continue ដើម្បីរំលងទិន្នន័យមិនត្រឹមត្រូវ និងរក្សាកូដឱ្យស្អាត។',
            'ប្រើ break ដើម្បីឈប់ស្វែងរកភ្លាមៗពេលរកឃើញលក្ខខណ្ឌគោលដៅ។',
          ],
          exampleTitle: 'ការត្រងទិន្នន័យសិនស័រជាមួយ continue និង break',
          tip: 'ពេលប្រើ while ត្រូវបង្កើនអថេររាប់ (index += 1) មុនពាក្យ continue ដើម្បីកុំឱ្យកម្មវិធីជាប់រង្វិលជុំគ្មានទីបញ្ចប់។',
        },
      ],
      challenge: {
        prompt:
          'សរសេររង្វិលជុំ Python ពី 1 ដល់ 15 (រួមទាំង 15) ដែលបង្ហាញ "VIP" សម្រាប់លេខចែកដាច់នឹង 3 និង 5, "Priority" សម្រាប់ពហុគុណនៃ 3, "Express" សម្រាប់ពហុគុណនៃ 5 និងបង្ហាញលេខនោះផ្ទាល់សម្រាប់ករណីផ្សេងទៀត។',
        hint: 'ត្រូវពិនិត្យលក្ខខណ្ឌរួម (n % 3 == 0 and n % 5 == 0) មុនគេក្នុង if/elif/else បើមិនដូច្នោះទេលេខ 15 នឹងជាប់ក្នុងលក្ខខណ្ឌចែកដាច់នឹង 3 មុន។',
      },
      quiz: [
        {
          question: 'តើ range(2, 10, 3) បង្កើតលេខអ្វីខ្លះក្នុង Python?',
          options: ['2, 5, 8', '2, 5, 8, 10', '3, 6, 9', '2, 4, 6, 8'],
          answer: 0,
          explanation:
            'range(start, stop, step) ចាប់ផ្ដើមពី 2 បូកថែម 3 ក្នុងមួយជុំ (2, 5, 8) ហើយឈប់មុន 10 ព្រោះជំហានបន្ទាប់គឺ 11។',
        },
        {
          question: 'តើមានអ្វីកើតឡើងបើដំណើរការ age = input("Age: "); print(age + 1) ហើយអ្នកប្រើវាយលេខ 20?',
          options: [
            'បង្ហាញ 21',
            'បង្ហាញ "201"',
            'កើតកំហុស TypeError ព្រោះ age ជា str មិនមែន int',
            'បំប្លែង age ជា int ដោយស្វ័យប្រវត្តិ',
          ],
          answer: 2,
          explanation:
            'input() តែងតែត្រឡប់ជា str ហើយ Python មិនបំប្លែង str ទៅ int ដោយស្វ័យប្រវត្តិពេលប្រើ + ឡើយ ដូច្នេះ "20" + 1 នឹងបង្ក TypeError។',
        },
      ],
    },
  },

  'python/python-basics': {
    en: {
      duration: '12 min',
      objectives: [
        'Distinguish true division (/), floor division (//), modulo (%), and exponentiation (**)',
        'Format currency, alignment, and decimals cleanly with f-string format specifiers',
        'Manipulate immutable strings using slicing, strip(), split(), and join()',
        'Understand object identity (is) vs equality (==) and avoid list aliasing bugs',
      ],
      extraSections: [
        {
          id: 'numbers-strings-and-slicing',
          heading: 'Arithmetic Operators, String Methods & Slicing',
          body: [
            'Python separates true division (7 / 2 == 3.5) from floor division (7 // 2 == 3), which rounds toward negative infinity. Pair // with modulo (%) for pagination, time conversions, and bucketing—or call divmod(total_seconds, 60) to get both in one step.',
            'Strings in Python are immutable sequences: methods like .strip(), .lower(), and .replace() always return a brand-new string rather than modifying the original in place. Slice notation text[start:stop:step] extracts substrings without raising an error if stop exceeds the string length.',
          ],
          points: [
            'Format numbers inline with f"{amount:,.2f}" (thousands comma + 2 decimals) or f"{code:04d}" (zero-padded).',
            'Use sep.join(words) instead of concatenating strings inside a loop with +=.',
            'Negative indices count from the end: text[-1] is the last character and text[::-1] reverses text.',
            'Strings are immutable—you must assign the returned string (name = name.strip()).',
          ],
          table: {
            headers: ['Expression', 'Meaning', 'Example', 'Output'],
            rows: [
              ['a / b', 'True (float) division', '7 / 2', '3.5'],
              ['a // b', 'Floor (integer) division', '7 // 2', '3'],
              ['a % b', 'Remainder (modulo)', '7 % 2', '1'],
              ['f"{x:,.2f}"', 'Comma + 2 decimal places', 'f"{1250.5:,.2f}"', '1,250.50'],
              ['s[a:b:step]', 'Slice from a up to b', '"Python"[::-1]', '"nohtyP"'],
            ],
          },
          example: {
            title: 'Cleaning Input & Formatting an Invoice Line',
            language: 'python',
            code: `raw_record = "  sophea chann | 1250.5 | 3  "
parts = [p.strip() for p in raw_record.split("|")]

customer = parts[0].title()
unit_price = float(parts[1])
qty = int(parts[2])
subtotal = unit_price * qty

print(f"{customer:<16} {qty:>2} x \${unit_price:>8,.2f} = \${subtotal:>10,.2f}")`,
            output: `Sophea Chann      3 x $1,250.50 = $  3,751.50`,
          },
          warning:
            'Binary floating-point math cannot represent every base-10 decimal exactly (0.1 + 0.2 == 0.30000000000000004). For financial calculations, use decimal.Decimal("0.1") or store amounts in integer cents.',
        },
        {
          id: 'mutability-identity-and-none',
          heading: 'Object Identity (is vs ==), None & Unpacking',
          body: [
            'In Python, variables are labels pointing to objects in memory, not boxes holding raw bytes. Two variables can hold equal values (==) while pointing to different objects in memory, or point to the exact same mutable object (is). Assigning b = a on a list creates an alias—mutating b also mutates a.',
            'Sequence unpacking lets you pull values out cleanly without fragile index lookups: swap variables in one line with a, b = b, a, or capture variable-length tails with first, *middle, last = items.',
          ],
          points: [
            'Always check for None with is None or is not None (PEP 8 rule), never == None.',
            'Use a.copy() or list(a) when you need an independent shallow copy of a list.',
            'Starred unpacking (head, *rest = data) works on any iterable, not just lists.',
          ],
          example: {
            title: 'Aliasing vs Copying & Starred Unpacking',
            language: 'python',
            code: `original = [10, 20, 30]
alias = original
clone = original.copy()

alias.append(40)
print("original:", original, "| same object?", original is alias)
print("clone:   ", clone, "| same object?", original is clone)

host, *segments, endpoint = ["api", "v2", "users", "profile"]
print(f"host={host}, segments={segments}, endpoint={endpoint}")`,
            output: `original: [10, 20, 30, 40] | same object? True
clone:    [10, 20, 30] | same object? False
host=api, segments=['v2', 'users'], endpoint=profile`,
          },
          tip: 'Use _ as a throwaway name when unpacking fields you intentionally ignore, e.g., user_id, _, role = row.',
        },
      ],
      challenge: {
        prompt:
          'Given raw = "  dara , 1250.5 , usd ", split by comma, strip whitespace, format the name in title case, the amount with a thousands separator and 2 decimals, and the currency in uppercase so it prints: "Dara: 1,250.50 USD".',
        hint: 'Use raw.split(","), unpack into three variables, call .strip() on each, convert the middle value with float(), and format with f"{amount:,.2f}".',
        language: 'python',
        solutionCode: `raw = "  dara , 1250.5 , usd "
name, amount_str, currency = [part.strip() for part in raw.split(",")]
amount = float(amount_str)
print(f"{name.title()}: {amount:,.2f} {currency.upper()}")`,
      },
      quiz: [
        {
          question: 'What is the result of 9 / 2 and 9 // 2 in Python 3?',
          options: ['4 and 4', '4.5 and 4', '4.5 and 5', '4.0 and 4.5'],
          answer: 1,
          explanation:
            'Single slash / always performs true floating-point division (4.5), whereas // performs floor division returning the integer quotient 4.',
        },
        {
          question: 'Why does mutating b after b = a change a when a = [1, 2, 3]?',
          options: [
            'Lists are global by default in Python',
            'Both a and b reference the exact same list object in memory',
            'The = operator always performs a deep copy',
            'Python lists cannot be copied',
          ],
          answer: 1,
          explanation:
            'Assignment binds a new name to the existing object without copying it. Use a.copy() to create an independent list.',
        },
      ],
    },
    km: {
      duration: '12 នាទី',
      objectives: [
        'ញែកឱ្យដាច់រវាងការចែកពិត (/), ការចែកយកផលគត់ (//), សំណល់ (%) និងស្វ័យគុណ (**)',
        'រៀបចំទម្រង់រូបិយប័ណ្ណ ការតម្រឹម និងក្បៀសទសភាគយ៉ាងស្អាតដោយប្រើ f-string format specifiers',
        'កែច្នៃអត្ថបទ (immutable strings) ដោយប្រើ slicing, strip(), split() និង join()',
        'យល់ពីភាពខុសគ្នារវាង object identity (is) និងភាពស្មើគ្នា (==) ព្រមទាំងជៀសវាងកំហុស aliasing លើ list',
      ],
      extraSections: [
        {
          id: 'numbers-strings-and-slicing',
          heading: 'ប្រមាណវិធីគណិតវិទ្យា String Methods និង Slicing',
          body: [
            'Python បំបែកការចែកពិត (7 / 2 == 3.5) ពីការចែកយកផលគត់ (7 // 2 == 3)។ ផ្សំ // ជាមួយសំណល់ (%) សម្រាប់ការបែងចែកទំព័រ ឬបំប្លែងពេលវេលា ឬហៅ divmod(total_seconds, 60) ដើម្បីទទួលបានទាំងពីរក្នុងពេលតែមួយ។',
            'អត្ថបទក្នុង Python មិនអាចកែប្រែផ្ទាល់បានទេ (immutable)៖ អនុគមន៍ដូចជា .strip(), .lower() និង .replace() តែងតែត្រឡប់អត្ថបទថ្មីជានិច្ច។ ការកាត់អត្ថបទ text[start:stop:step] ងាយស្រួល និងមិនបង្កកំហុសឡើយទោះ stop លើសប្រវែងអត្ថបទក៏ដោយ។',
          ],
          points: [
            'កំណត់ទម្រង់លេខក្នុង f-string ដោយ f"{amount:,.2f}" (មានក្បៀសពាន់ និងទសភាគ 2 ខ្ទង់) ឬ f"{code:04d}"។',
            'ប្រើ sep.join(words) ជំនួសឱ្យការភ្ជាប់អត្ថបទដោយ += ក្នុងរង្វិលជុំ។',
            'សន្ទស្សន៍អវិជ្ជមានរាប់ពីខាងចុង៖ text[-1] ជាតួអក្សរចុងក្រោយ ហើយ text[::-1] បញ្ច្រាសអត្ថបទ។',
            'ដោយសារ str ជា immutable ត្រូវរក្សាទុកលទ្ធផលត្រឡប់មកវិញ (name = name.strip())។',
          ],
          table: {
            headers: ['កន្សោម', 'អត្ថន័យ', 'ឧទាហរណ៍', 'លទ្ធផល'],
            rows: [
              ['a / b', 'ការចែកពិត (float)', '7 / 2', '3.5'],
              ['a // b', 'ការចែកយកផលគត់', '7 // 2', '3'],
              ['a % b', 'សំណល់នៃការចែក', '7 % 2', '1'],
              ['f"{x:,.2f}"', 'ក្បៀសពាន់ + ទសភាគ 2 ខ្ទង់', 'f"{1250.5:,.2f}"', '1,250.50'],
              ['s[a:b:step]', 'កាត់អត្ថបទពី a ដល់មុន b', '"Python"[::-1]', '"nohtyP"'],
            ],
          },
          exampleTitle: 'ការសម្អាតទិន្នន័យ និងរៀបចំបន្ទាត់វិក្កយបត្រ',
          warning:
            'លេខទសភាគគោលពីរមិនអាចតំណាងទសភាគគោលដប់ទាំងអស់បានត្រឹមត្រូវឥតខ្ចោះឡើយ (0.1 + 0.2 == 0.30000000000000004)។ សម្រាប់ប្រព័ន្ធហិរញ្ញវត្ថុ សូមប្រើ decimal.Decimal("0.1") ឬគិតជាសេន (int)។',
        },
        {
          id: 'mutability-identity-and-none',
          heading: 'Object Identity (is ធៀបនឹង ==), None និង Unpacking',
          body: [
            'ក្នុង Python អថេរគឺជាឈ្មោះចង្អុលទៅ object ក្នុងអង្គចងចាំ។ អថេរពីរអាចមានតម្លៃស្មើគ្នា (==) ប៉ុន្តែជា object ផ្សេងគ្នា ឬចង្អុលទៅ object តែមួយ (is)។ ការសរសេរ b = a លើ list បង្កើតត្រឹមឈ្មោះជំនួស (alias)—ការកែ b នឹងកែ a ផងដែរ។',
            'Sequence unpacking ជួយទាញតម្លៃចេញយ៉ាងស្អាតដោយមិនបាច់ប្រើលេខសន្ទស្សន៍ច្រើន៖ ប្ដូរតម្លៃគ្នាក្នុងមួយបន្ទាត់ជាមួយ a, b = b, a ឬចាប់ធាតុនៅកណ្ដាលដោយ first, *middle, last = items។',
          ],
          points: [
            'ត្រូវពិនិត្យ None ដោយប្រើ is None ឬ is not None ជានិច្ច (ច្បាប់ PEP 8) កុំប្រើ == None។',
            'ប្រើ a.copy() ឬ list(a) នៅពេលចង់បានច្បាប់ចម្លងដាច់ដោយឡែកនៃ list។',
            'Starred unpacking (head, *rest = data) ដំណើរការលើគ្រប់ iterable ទាំងអស់។',
          ],
          exampleTitle: 'Aliasing ធៀបនឹងការចម្លង និង Starred Unpacking',
          tip: 'ប្រើសញ្ញា _ សម្រាប់តម្លៃដែលអ្នកមិនត្រូវការពេលធ្វើ unpacking ឧ. user_id, _, role = row។',
        },
      ],
      challenge: {
        prompt:
          'ដោយមាន raw = "  dara , 1250.5 , usd " សូមបំបែកតាមក្បៀស សម្អាតដកឃ្លា ដាក់អក្សរធំដើមពាក្យលើឈ្មោះ កំណត់ចំនួនទឹកប្រាក់មានក្បៀសពាន់ និងទសភាគ 2 ខ្ទង់ និងរូបិយប័ណ្ណជាអក្សរធំ ដើម្បីបង្ហាញ៖ "Dara: 1,250.50 USD"។',
        hint: 'ប្រើ raw.split(",") រួចធ្វើ unpacking ជា 3 អថេរ ហៅ .strip() បំប្លែងទឹកប្រាក់ដោយ float() និងដាក់ទម្រង់ f"{amount:,.2f}"។',
      },
      quiz: [
        {
          question: 'តើលទ្ធផលនៃ 9 / 2 និង 9 // 2 ក្នុង Python 3 គឺជាអ្វី?',
          options: ['4 និង 4', '4.5 និង 4', '4.5 និង 5', '4.0 និង 4.5'],
          answer: 1,
          explanation:
            'សញ្ញា / តែងតែចែកជាទសភាគ (4.5) ចំណែក // ចែកយកផលគត់ (4)។',
        },
        {
          question: 'ហេតុអ្វីបានជាការកែ b បន្ទាប់ពី b = a ធ្វើឱ្យ a ផ្លាស់ប្ដូរដែរពេល a = [1, 2, 3]?',
          options: [
            'Lists ជា global ដោយស្វ័យប្រវត្តិក្នុង Python',
            'ទាំង a និង b ចង្អុលទៅ list object តែមួយក្នុងអង្គចងចាំ',
            'សញ្ញា = តែងតែធ្វើ deep copy',
            'Python lists មិនអាចចម្លងបានទេ',
          ],
          answer: 1,
          explanation:
            'ការផ្ដល់តម្លៃ b = a គ្រាន់តែភ្ជាប់ឈ្មោះថ្មីទៅ object ដើមប៉ុណ្ណោះ មិនមែនចម្លងទេ។ ត្រូវប្រើ a.copy() ដើម្បីបង្កើត list ថ្មីដាច់ដោយឡែក។',
        },
      ],
    },
  },

  'python/lists-and-dicts': {
    en: {
      duration: '12 min',
      objectives: [
        'Choose the right collection among list, tuple, set, and dict based on mutability and lookup speed',
        'Access and aggregate dictionary data safely using .get(), Counter, and the merge operator (|)',
        'Sort complex records with custom key lambdas without mutating original lists',
        'Process large streams memory-efficiently with generator expressions, any(), and all()',
      ],
      extraSections: [
        {
          id: 'tuples-sets-and-safe-dicts',
          heading: 'Choosing Collections & Safe Dictionary Patterns',
          body: [
            'Lists are great for ordered, changing sequences, but reaching for a list everywhere creates hidden O(n) scans. Use a tuple for fixed records (coordinates, RGB colors) that should never be mutated, a set for uniqueness and fast membership checks (x in seen), and a dict when mapping unique keys to values.',
            'Indexing a missing key with dict[key] crashes with KeyError. In production code, prefer .get(key, default) for reads, collections.Counter for frequency maps, and the | operator (Python 3.9+) to merge configuration dictionaries cleanly without mutating the inputs.',
          ],
          points: [
            'Membership checks (item in collection) are O(1) average on set and dict, but O(n) on list and tuple.',
            'Set operations (& intersection, | union, - difference) solve deduplication and diff tasks in one expression.',
            'Merge two dicts non-destructively with merged = defaults | overrides.',
            'Tuples are hashable (if their elements are hashable), so they can be used as dict keys.',
          ],
          table: {
            headers: ['Collection', 'Ordered', 'Mutable', 'Unique Items / Keys', 'Lookup (in)'],
            rows: [
              ['list [1, 2]', 'Yes', 'Yes', 'Duplicates allowed', 'O(n)'],
              ['tuple (1, 2)', 'Yes', 'No', 'Duplicates allowed', 'O(n)'],
              ['set {1, 2}', 'No', 'Yes', 'Unique items only', 'O(1) avg'],
              ['dict {"a": 1}', 'Yes (3.7+)', 'Yes', 'Unique keys only', 'O(1) avg'],
            ],
          },
          example: {
            title: 'Set Operations, Safe .get() & Dict Merge',
            language: 'python',
            code: `defaults = {"theme": "light", "timeout": 30}
user_prefs = {"theme": "dark"}
config = defaults | user_prefs

required_roles = {"read", "write", "deploy"}
user_roles = {"read", "write"}
missing = required_roles - user_roles

counts = {}
for status in [200, 404, 200, 500, 200]:
    counts[status] = counts.get(status, 0) + 1

print("Config:", config)
print("Missing roles:", missing)
print("Status counts:", counts)`,
            output: `Config: {'theme': 'dark', 'timeout': 30}
Missing roles: {'deploy'}
Status counts: {200: 3, 404: 1, 500: 1}`,
          },
          warning:
            'Never add or remove keys from a dict (or items from a list) while iterating directly over it—Python raises RuntimeError on dicts and silently skips elements on lists. Build a new collection with a comprehension instead.',
        },
        {
          id: 'sorting-and-generators',
          heading: 'Sorting with key=, Deep Copies & Generators',
          body: [
            'Python provides two sorting tools: list.sort() mutates the list in place and returns None, while sorted(iterable, key=...) returns a brand-new sorted list and works on any iterable. Passing a key lambda lets you sort dictionaries or tuples by multiple criteria (e.g., highest score first, then alphabetical name).',
            'When chaining transformations over thousands of records, replace square brackets [ ] with parentheses ( ) to create a generator expression. Generators compute one item at a time lazily, pairing naturally with sum(), max(), any(), and all() without allocating intermediate lists in memory.',
          ],
          points: [
            'sorted() is Timsort (stable O(n log n)): equal keys preserve their original relative order.',
            'Use key=lambda item: (-item["score"], item["name"]) for multi-key sorting.',
            'copy.copy() only copies the outer list; use copy.deepcopy() for nested lists or dicts.',
          ],
          example: {
            title: 'Multi-Key Sorting & Lazy Generator Aggregation',
            language: 'python',
            code: `orders = [
    {"id": "A1", "total": 120.0, "paid": True},
    {"id": "A2", "total": 85.0, "paid": False},
    {"id": "A3", "total": 240.0, "paid": True},
]

ranked = sorted(orders, key=lambda o: o["total"], reverse=True)
paid_revenue = sum(o["total"] for o in orders if o["paid"])
has_unpaid = any(not o["paid"] for o in orders)

print("Top order:", ranked[0]["id"], ranked[0]["total"])
print(f"Paid revenue: \${paid_revenue:.2f} | Unpaid exists? {has_unpaid}")`,
            output: `Top order: A3 240.0
Paid revenue: $360.00 | Unpaid exists? True`,
          },
          tip: 'Remember that list.sort() returns None! Writing items = items.sort() overwrites your variable with None—use items = sorted(items) when assigning.',
        },
      ],
      challenge: {
        prompt:
          'Given sales = [("books", 25), ("tech", 140), ("books", 45), ("food", 30), ("tech", 60)], aggregate total revenue per category into a dictionary and print the categories sorted from highest total to lowest.',
        hint: 'Loop over (cat, amount) in sales using totals[cat] = totals.get(cat, 0) + amount, then sort totals.items() with key=lambda kv: kv[1], reverse=True.',
        language: 'python',
        solutionCode: `sales = [("books", 25), ("tech", 140), ("books", 45), ("food", 30), ("tech", 60)]
totals = {}
for category, amount in sales:
    totals[category] = totals.get(category, 0) + amount

ranked = sorted(totals.items(), key=lambda kv: kv[1], reverse=True)
for category, total in ranked:
    print(f"{category}: \${total}")`,
      },
      quiz: [
        {
          question: 'What does user.get("role", "guest") return when "role" is not in user?',
          options: [
            'Raises KeyError',
            'Returns None',
            'Returns "guest" without raising an error',
            'Inserts "role": "guest" into user',
          ],
          answer: 2,
          explanation:
            'dict.get(key, default) returns the fallback value ("guest") safely without mutating the dictionary or raising KeyError.',
        },
        {
          question: 'Which collection gives O(1) average time for checking if an item exists (x in col)?',
          options: ['list', 'tuple', 'set', 'str'],
          answer: 2,
          explanation:
            'Sets (and dict keys) use hash tables for O(1) average membership checks, while list and tuple require O(n) linear scans.',
        },
      ],
    },
    km: {
      duration: '12 នាទី',
      objectives: [
        'ជ្រើសរើសប្រភេទទិន្នន័យសមស្របរវាង list, tuple, set និង dict តាមល្បឿនស្វែងរក និងភាពអាចកែប្រែបាន',
        'ទាញ និងបូកសរុបទិន្នន័យក្នុង dict ដោយសុវត្ថិភាពជាមួយ .get(), Counter និងប្រមាណវិធីបញ្ចូលគ្នា (|)',
        'តម្រៀបទិន្នន័យស្មុគស្មាញជាមួយ key lambda ដោយមិនកែប្រែបញ្ជីដើម',
        'ដំណើរការទិន្នន័យច្រើនដោយសន្សំសំចៃអង្គចងចាំជាមួយ generator expressions, any() និង all()',
      ],
      extraSections: [
        {
          id: 'tuples-sets-and-safe-dicts',
          heading: 'ការជ្រើសរើស Collection និងការប្រើ Dictionary ដោយសុវត្ថិភាព',
          body: [
            'List ល្អសម្រាប់បញ្ជីតាមលំដាប់ដែលអាចកែប្រែបាន ប៉ុន្តែការស្វែងរកក្នុង list ចំណាយពេល O(n)។ គួរប្រើ tuple សម្រាប់កំណត់ត្រាថេរមិនកែប្រែ ប្រើ set ដើម្បីលុបតម្លៃស្ទួន និងពិនិត្យវត្តមានលឿន (x in seen) និងប្រើ dict ដើម្បីផ្គូផ្គង key និង value។',
            'ការហៅ dict[key] លើ key ដែលគ្មាននឹងបង្ក KeyError។ ក្នុងកូដផលិតកម្ម សូមប្រើ .get(key, default) សម្រាប់អាន ប្រើ collections.Counter សម្រាប់រាប់ចំនួន និងប្រើប្រមាណវិធី | (Python 3.9+) ដើម្បីបញ្ចូល dict ពីរចូលគ្នាដោយមិនកែដើម។',
          ],
          points: [
            'ការពិនិត្យវត្តមាន (item in collection) ចំណាយ O(1) ជាមធ្យមលើ set និង dict ប៉ុន្តែ O(n) លើ list និង tuple។',
            'ប្រមាណវិធីលើ set (& ប្រសព្វ, | ប្រជុំ, - ផលដក) ដោះស្រាយការប្រៀបធៀបសិទ្ធិ ឬលុបស្ទួនក្នុងមួយបន្ទាត់។',
            'បញ្ចូល dict ពីរដោយសុវត្ថិភាព៖ merged = defaults | overrides។',
            'Tuple អាចធ្វើជា key របស់ dict បាន ព្រោះវាជា immutable (ប្រសិនបើធាតុខាងក្នុងក៏ជា immutable)។',
          ],
          table: {
            headers: ['ប្រភេទ Collection', 'មានលំដាប់', 'អាចកែប្រែ', 'តម្លៃ/Key មិនស្ទួន', 'ល្បឿនស្វែងរក (in)'],
            rows: [
              ['list [1, 2]', 'មាន', 'បាន', 'អនុញ្ញាតស្ទួន', 'O(n)'],
              ['tuple (1, 2)', 'មាន', 'មិនបាន', 'អនុញ្ញាតស្ទួន', 'O(n)'],
              ['set {1, 2}', 'គ្មាន', 'បាន', 'ធាតុមិនស្ទួន', 'O(1) មធ្យម'],
              ['dict {"a": 1}', 'មាន (3.7+)', 'បាន', 'Key មិនស្ទួន', 'O(1) មធ្យម'],
            ],
          },
          exampleTitle: 'ប្រមាណវិធី Set, .get() និងការបញ្ចូល Dict',
          warning:
            'កុំបន្ថែម ឬលុប key ពី dict (ឬធាតុពី list) ពេលកំពុងរត់រង្វិលជុំលើវាផ្ទាល់—Python នឹងបង្ក RuntimeError លើ dict ឬរំលងធាតុដោយស្ងាត់ៗលើ list។ សូមបង្កើត collection ថ្មីជំនួស។',
        },
        {
          id: 'sorting-and-generators',
          heading: 'ការតម្រៀបជាមួយ key=, Deep Copy និង Generators',
          body: [
            'Python មានវិធីតម្រៀបពីរ៖ list.sort() កែប្រែ list ដើមផ្ទាល់ហើយត្រឡប់ None ចំណែក sorted(iterable, key=...) ត្រឡប់ list ថ្មីដែលតម្រៀបរួច។ ការផ្ដល់ key lambda អនុញ្ញាតឱ្យតម្រៀប dict ឬ tuple តាមលក្ខខណ្ឌច្រើនយ៉ាងងាយ។',
            'ពេលដំណើរការទិន្នន័យរាប់ពាន់ សូមប្ដូរដង្កៀប [ ] ទៅជា ( ) ដើម្បីបង្កើត generator expression។ Generator គណនាម្ដងមួយធាតុដោយមិនបង្កើត list ធំក្នុងអង្គចងចាំ ហើយស៊ីគ្នាខ្លាំងជាមួយ sum(), max(), any() និង all()។',
          ],
          points: [
            'sorted() ប្រើ Timsort (stable O(n log n)) ដែលរក្សាលំដាប់ដើមសម្រាប់ធាតុមានតម្លៃស្មើគ្នា។',
            'ប្រើ key=lambda item: (-item["score"], item["name"]) ដើម្បីតម្រៀបតាមលក្ខខណ្ឌច្រើន។',
            'copy.copy() ចម្លងតែស្រទាប់ក្រៅ ត្រូវប្រើ copy.deepcopy() សម្រាប់ list/dict ត្រួតគ្នា។',
          ],
          exampleTitle: 'ការតម្រៀបតាម Key និងការបូកសរុបដោយ Generator',
          tip: 'សូមចាំថា list.sort() ត្រឡប់ None! ការសរសេរ items = items.sort() នឹងធ្វើឱ្យ items ក្លាយជា None—ត្រូវប្រើ items = sorted(items) ជំនួស។',
        },
      ],
      challenge: {
        prompt:
          'ដោយមាន sales = [("books", 25), ("tech", 140), ("books", 45), ("food", 30), ("tech", 60)] សូមបូកសរុបចំណូលតាមប្រភេទទំនិញក្នុង dictionary រួចបង្ហាញប្រភេទទំនិញតម្រៀបពីចំណូលខ្ពស់ទៅទាប។',
        hint: 'ដើរលើ (category, amount) ក្នុង sales ដោយប្រើ totals[category] = totals.get(category, 0) + amount រួចតម្រៀប totals.items() ជាមួយ key=lambda kv: kv[1], reverse=True។',
      },
      quiz: [
        {
          question: 'តើ user.get("role", "guest") ត្រឡប់អ្វី នៅពេលគ្មាន key "role" ក្នុង user?',
          options: [
            'បង្កកំហុស KeyError',
            'ត្រឡប់ None',
            'ត្រឡប់ "guest" ដោយគ្មានកំហុស',
            'បន្ថែម "role": "guest" ចូលក្នុង user',
          ],
          answer: 2,
          explanation:
            'dict.get(key, default) ត្រឡប់តម្លៃជំនួស ("guest") ដោយសុវត្ថិភាព ដោយមិនកែប្រែ dictionary ឬបង្ក KeyError ឡើយ។',
        },
        {
          question: 'តើប្រភេទទិន្នន័យណាដែលមានល្បឿនមធ្យម O(1) សម្រាប់ការពិនិត្យវត្តមាន (x in col)?',
          options: ['list', 'tuple', 'set', 'str'],
          answer: 2,
          explanation:
            'Set (និង keys របស់ dict) ប្រើ hash table សម្រាប់ល្បឿន O(1) ជាមធ្យម ខណៈ list និង tuple ត្រូវស្កេន O(n)។',
        },
      ],
    },
  },

  'python/functions-and-modules': {
    en: {
      duration: '13 min',
      objectives: [
        'Write flexible function signatures using *args, **kwargs, and keyword-only parameters (*)',
        'Avoid the mutable default argument trap by defaulting to None',
        'Build reusable decorators cleanly with closures and @functools.wraps',
        'Structure multi-file Python code using modules, imports, and if __name__ == "__main__":',
      ],
      extraSections: [
        {
          id: 'args-kwargs-and-decorators',
          heading: '*args, **kwargs, Closures & Decorators',
          body: [
            'Python functions are first-class objects: you can pass them as arguments, return them from other functions, and wrap them with extra behavior. Placing a bare * in a parameter list forces everything after it to be passed by keyword—preventing bugs when a function has several boolean or numeric flags.',
            'Decorators use closures plus *args and **kwargs to wrap any function without changing its core logic (for logging, caching, retries, or auth checks). Always decorate the inner wrapper with @functools.wraps(fn) so the wrapped function keeps its original __name__ and docstring.',
          ],
          points: [
            '*args packs extra positional arguments into a tuple; **kwargs packs extra keyword arguments into a dict.',
            'Keyword-only parameters (def export(data, *, indent=2, sort_keys=False)) make call sites self-documenting.',
            'Use @functools.wraps(fn) inside every decorator to preserve metadata and stack traces.',
            'Use @functools.lru_cache(maxsize=128) to memoize expensive pure functions effortlessly.',
          ],
          table: {
            headers: ['Signature Syntax', 'What It Accepts', 'Typical Use Case'],
            rows: [
              ['def f(a, b=10)', 'Positional or keyword, optional b', 'Standard defaults'],
              ['def f(a, *, debug=False)', 'debug must be passed by name', 'Prevent flag mix-ups'],
              ['def f(*args)', 'Any count of positional args (tuple)', 'Variadic helpers, wrappers'],
              ['def f(**kwargs)', 'Any count of keyword args (dict)', 'Config forwarding, decorators'],
            ],
          },
          example: {
            title: 'Reusable Audit Decorator with functools.wraps',
            language: 'python',
            code: `from functools import wraps

def log_call(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        result = fn(*args, **kwargs)
        print(f"[LOG] {fn.__name__}{args} -> {result}")
        return result
    return wrapper

@log_call
def compute_tax(amount: float, *, rate: float = 0.1) -> float:
    return round(amount * rate, 2)

compute_tax(250.0, rate=0.08)
print("Function name preserved:", compute_tax.__name__)`,
            output: `[LOG] compute_tax(250.0,) -> 20.0
Function name preserved: compute_tax`,
          },
          warning:
            'Default parameter values are evaluated ONCE when def executes, not on each call. Writing def add_tag(tag, tags=[]) shares the exact same list across every call! Always write tags: list[str] | None = None and initialize if tags is None: tags = [].',
        },
        {
          id: 'modules-and-name-main',
          heading: 'Modules, Imports & if __name__ == "__main__":',
          body: [
            'Every .py file is a module, and any folder of modules is a package. When Python imports a module, it executes all top-level statements inside that file once and caches the module object in sys.modules. That means putting runnable script code at the top level would accidentally run whenever another file imports a helper from it.',
            'Guard script entry points with if __name__ == "__main__":. Python sets __name__ to "__main__" only when the file is executed directly (python app.py), and sets it to the module name when imported—allowing every file to be cleanly imported by unit tests.',
          ],
          points: [
            'Group imports in three blocks (PEP 8): standard library, third-party packages, then local app modules.',
            'Avoid wildcard imports (from math import *)—they hide where names come from and risk shadowing.',
            'Keep reusable logic inside functions and invoke main() inside if __name__ == "__main__":.',
          ],
          example: {
            title: 'Testable Module with Memoization & Entry Guard',
            language: 'python',
            code: `from functools import lru_cache

@lru_cache(maxsize=64)
def fib(n: int) -> int:
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

def main() -> None:
    print("fib(10) =", fib(10))
    print("fib(30) =", fib(30))
    print("Cache hits:", fib.cache_info().hits)

if __name__ == "__main__":
    main()`,
            output: `fib(10) = 55
fib(30) = 832040
Cache hits: 28`,
          },
          tip: 'Use modern union type syntax (int | None, list[str]) available since Python 3.10 instead of verbose typing.Optional and typing.List.',
        },
      ],
      challenge: {
        prompt:
          'Write a decorator retry_once(fn) using @wraps(fn) that calls fn(*args, **kwargs) and, if it raises ValueError, retries the call one more time before letting any error propagate.',
        hint: 'Inside wrapper(*args, **kwargs), wrap return fn(*args, **kwargs) in a try block, catch ValueError, and return fn(*args, **kwargs) inside the except block.',
        language: 'python',
        solutionCode: `from functools import wraps

def retry_once(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            return fn(*args, **kwargs)
        except ValueError:
            return fn(*args, **kwargs)
    return wrapper

attempts = 0

@retry_once
def flaky_parse() -> int:
    global attempts
    attempts += 1
    if attempts == 1:
        raise ValueError("temporary glitch")
    return 42

print(flaky_parse(), "after", attempts, "attempts")`,
      },
      quiz: [
        {
          question: 'What is printed if you call add(1) then add(2) on: def add(x, buf=[]): buf.append(x); return buf?',
          options: ['[1] then [2]', '[1] then [1, 2]', '[] then [2]', 'Raises TypeError'],
          answer: 1,
          explanation:
            'The default list [] is created once when the function is defined and reused across calls, so the second call appends to [1] and returns [1, 2].',
        },
        {
          question: 'Why should runnable script code be placed inside if __name__ == "__main__":?',
          options: [
            'Python refuses to run any file without it',
            'It prevents script code from executing automatically when the file is imported by another module or test',
            'It makes the script run on multiple CPU cores',
            'It enables type checking at runtime',
          ],
          answer: 1,
          explanation:
            'When a file is imported, __name__ equals the module name instead of "__main__", so guarding main() keeps imports side-effect free.',
        },
      ],
    },
    km: {
      duration: '13 នាទី',
      objectives: [
        'សរសេរហត្ថលេខាអនុគមន៍បត់បែនជាមួយ *args, **kwargs និង keyword-only parameters (*)',
        'ជៀសវាងកំហុស mutable default argument ដោយកំណត់តម្លៃលំនាំដើមជា None',
        'បង្កើត decorators ដែលអាចប្រើឡើងវិញបានយ៉ាងស្អាតជាមួយ closures និង @functools.wraps',
        'រៀបចំកូដច្រើនឯកសារដោយប្រើ modules, imports និង if __name__ == "__main__":',
      ],
      extraSections: [
        {
          id: 'args-kwargs-and-decorators',
          heading: '*args, **kwargs, Closures និង Decorators',
          body: [
            'អនុគមន៍ក្នុង Python គឺជា first-class objects៖ អ្នកអាចបញ្ជូនវាជាប៉ារ៉ាម៉ែត្រ ត្រឡប់វាពីអនុគមន៍ផ្សេង ឬរុំវាដើម្បីបន្ថែមមុខងារ។ ការដាក់សញ្ញា * ទទេក្នុងបញ្ជីប៉ារ៉ាម៉ែត្របង្ខំឱ្យប៉ារ៉ាម៉ែត្របន្ទាប់ត្រូវហៅដោយឈ្មោះ (keyword-only) ដើម្បីការពារការច្រឡំលំដាប់។',
            'Decorators ប្រើ closures ជាមួយ *args និង **kwargs ដើម្បីបន្ថែមមុខងារដូចជា logging, caching ឬ retry ដោយមិនប៉ះពាល់តក្កវិជ្ជាដើម។ ត្រូវដាក់ @functools.wraps(fn) លើ wrapper ជានិច្ច ដើម្បីរក្សា __name__ និង docstring ដើម។',
          ],
          points: [
            '*args ប្រមូលប៉ារ៉ាម៉ែត្រតាមលំដាប់ជា tuple ចំណែក **kwargs ប្រមូលប៉ារ៉ាម៉ែត្រតាមឈ្មោះជា dict។',
            'ប៉ារ៉ាម៉ែត្រ keyword-only (def export(data, *, indent=2)) ធ្វើឱ្យការហៅអនុគមន៍ច្បាស់លាស់ងាយអាន។',
            'ប្រើ @functools.wraps(fn) ក្នុងគ្រប់ decorator ដើម្បីរក្សាឈ្មោះអនុគមន៍ដើម។',
            'ប្រើ @functools.lru_cache(maxsize=128) ដើម្បីរក្សាទុកលទ្ធផលអនុគមន៍គណនាដដែលៗដោយស្វ័យប្រវត្តិ។',
          ],
          table: {
            headers: ['វាក្យសម្ព័ន្ធប៉ារ៉ាម៉ែត្រ', 'អ្វីដែលវាទទួល', 'ការប្រើប្រាស់ទូទៅ'],
            rows: [
              ['def f(a, b=10)', 'តាមលំដាប់ ឬតាមឈ្មោះ (b មានតម្លៃលំនាំដើម)', 'តម្លៃលំនាំដើមទូទៅ'],
              ['def f(a, *, debug=False)', 'debug ត្រូវតែបញ្ជូនតាមឈ្មោះ', 'ការពារការច្រឡំ flag'],
              ['def f(*args)', 'ប៉ារ៉ាម៉ែត្រតាមលំដាប់ច្រើន (tuple)', 'អនុគមន៍ទទួលធាតុច្រើន, wrappers'],
              ['def f(**kwargs)', 'ប៉ារ៉ាម៉ែត្រតាមឈ្មោះច្រើន (dict)', 'បញ្ជូនការកំណត់បន្ត, decorators'],
            ],
          },
          exampleTitle: 'Decorator កត់ត្រាការហៅអនុគមន៍ជាមួយ functools.wraps',
          warning:
            'តម្លៃលំនាំដើមរបស់ប៉ារ៉ាម៉ែត្រត្រូវបានបង្កើតតែម្ដងគត់ពេល def ដំណើរការ មិនមែនរាល់ពេលហៅឡើយ! ការសរសេរ def add_tag(tag, tags=[]) ធ្វើឱ្យរាល់ការហៅចែករំលែក list តែមួយ។ ត្រូវប្រើ tags: list[str] | None = None រួចបង្កើត list ថ្មីក្នុងអនុគមន៍។',
        },
        {
          id: 'modules-and-name-main',
          heading: 'Modules, Imports និង if __name__ == "__main__":',
          body: [
            'រាល់ឯកសារ .py គឺជា module ហើយថតឯកសារដែលផ្ទុក modules គឺជា package។ នៅពេល Python ធ្វើ import ឯកសារមួយ វានឹងដំណើរការកូដកម្រិតលើទាំងអស់ក្នុងឯកសារនោះ។ ដូច្នេះបើដាក់កូដដំណើរការផ្ទាល់នៅកម្រិតលើ វានឹងរត់ដោយអចេតនាពេលឯកសារផ្សេង import វា។',
            'ត្រូវការពារចំណុចចាប់ផ្ដើមកម្មវិធីដោយ if __name__ == "__main__":។ Python កំណត់ __name__ ជា "__main__" តែនៅពេលឯកសារត្រូវបានដំណើរការផ្ទាល់ប៉ុណ្ណោះ ដែលធ្វើឱ្យឯកសារអាច import ទៅធ្វើតេស្តបានយ៉ាងស្អាត។',
          ],
          points: [
            'រៀបចំ imports ជា 3 ក្រុមតាម PEP 8៖ standard library, កញ្ចប់ភាគីទីបី និង modules ក្នុងគម្រោង។',
            'ជៀសវាង from math import * ព្រោះវាធ្វើឱ្យពិបាកដឹងប្រភពឈ្មោះ និងងាយជាន់ឈ្មោះគ្នា។',
            'ដាក់តក្កវិជ្ជាក្នុងអនុគមន៍ ហើយហៅ main() តែនៅខាងក្នុង if __name__ == "__main__":។',
          ],
          exampleTitle: 'Module ងាយធ្វើតេស្តជាមួយ Memoization និង Entry Guard',
          tip: 'ប្រើវាក្យសម្ព័ន្ធ type hint ទំនើប (int | None, list[str]) ចាប់ពី Python 3.10 ជំនួសឱ្យ typing.Optional និង typing.List។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ decorator ឈ្មោះ retry_once(fn) ដោយប្រើ @wraps(fn) ដែលហៅ fn(*args, **kwargs) ហើយប្រសិនបើកើត ValueError វានឹងសាកល្បងហៅម្ដងទៀត មុននឹងអនុញ្ញាតឱ្យកំហុសបន្តចេញ។',
        hint: 'នៅក្នុង wrapper(*args, **kwargs) សូមដាក់ return fn(*args, **kwargs) ក្នុង try រួចចាប់ except ValueError: ហើយហៅ return fn(*args, **kwargs) ម្ដងទៀត។',
      },
      quiz: [
        {
          question: 'តើអ្វីនឹងត្រឡប់មកវិញបើហៅ add(1) រួច add(2) លើ៖ def add(x, buf=[]): buf.append(x); return buf?',
          options: ['[1] រួច [2]', '[1] រួច [1, 2]', '[] រួច [2]', 'កើតកំហុស TypeError'],
          answer: 1,
          explanation:
            'list ទទេ [] ត្រូវបានបង្កើតតែម្ដងពេលកំណត់អនុគមន៍ និងប្រើរួមគ្នាគ្រប់ការហៅ ដូច្នេះការហៅលើកទី 2 បន្ថែមចូល [1] ក្លាយជា [1, 2]។',
        },
        {
          question: 'ហេតុអ្វីគួរដាក់កូដដំណើរការកម្មវិធីនៅក្នុង if __name__ == "__main__":?',
          options: [
            'Python មិនព្រមដំណើរការឯកសារណាដែលគ្មានវាទេ',
            'ដើម្បីការពារកុំឱ្យកូដដំណើរការដោយស្វ័យប្រវត្តិនៅពេលឯកសារត្រូវបាន import ដោយ module ឬ test ផ្សេង',
            'ដើម្បីឱ្យកម្មវិធីដើរលើ CPU ច្រើនគ្រាប់',
            'ដើម្បីបើកការត្រួតពិនិត្យ type ពេលដំណើរការ',
          ],
          answer: 1,
          explanation:
            'នៅពេលឯកសារត្រូវបាន import, __name__ មានតម្លៃជាឈ្មោះ module មិនមែន "__main__" ទេ ដូច្នេះកូដក្នុងប្លុកនោះនឹងមិនរត់ឡើយ។',
        },
      ],
    },
  },

  'python/oop-and-files': {
    en: {
      duration: '13 min',
      objectives: [
        'Validate class invariants cleanly using @property, __post_init__, and @classmethod constructors',
        'Implement key dunder methods (__repr__, __eq__, __len__) and frozen dataclasses',
        'Handle file paths and JSON safely across operating systems with pathlib.Path and utf-8 encoding',
        'Design custom exception hierarchies and structured try / except / else / finally blocks',
      ],
      extraSections: [
        {
          id: 'properties-dunders-and-dataclasses',
          heading: 'Properties, Dunder Methods & Immutable Dataclasses',
          body: [
            'Good object-oriented Python starts with protecting invariants: use @property to validate or compute attributes without breaking callers that read account.balance, and use @classmethod alternative constructors (like from_dict) to keep __init__ focused and clean.',
            'Python integrates your classes seamlessly with built-in syntax via dunder ("double underscore") methods: __repr__ powers debugging output, __len__ powers len(obj), and __enter__/__exit__ power the with statement. For value objects that should never mutate after creation, add @dataclass(frozen=True, slots=True).',
          ],
          points: [
            'Use @property setters or dataclass __post_init__() to reject invalid state immediately on creation.',
            'Prefer composition ("has-a") over deep inheritance chains ("is-a") to keep classes easy to test.',
            '@dataclass(frozen=True) makes instances immutable and hashable (usable in sets and dict keys).',
            'Adding slots=True (Python 3.10+) cuts memory usage and prevents accidental typos in attribute names.',
          ],
          table: {
            headers: ['Dunder Method', 'Triggered By', 'Purpose'],
            rows: [
              ['__repr__(self)', 'repr(x), debugger', 'Unambiguous developer representation'],
              ['__eq__(self, other)', 'a == b', 'Value-based equality comparison'],
              ['__len__(self)', 'len(x), bool(x)', 'Container item count'],
              ['__enter__ / __exit__', 'with obj as x:', 'Setup & guaranteed resource cleanup'],
            ],
          },
          example: {
            title: 'Validated Class with @property & @classmethod',
            language: 'python',
            code: `class BankAccount:
    def __init__(self, owner: str, balance: float = 0.0) -> None:
        self.owner = owner
        self.balance = balance  # Calls setter below

    @property
    def balance(self) -> float:
        return self._balance

    @balance.setter
    def balance(self, value: float) -> None:
        if value < 0:
            raise ValueError("Balance cannot be negative")
        self._balance = round(value, 2)

    @classmethod
    def from_cents(cls, owner: str, cents: int) -> "BankAccount":
        return cls(owner, cents / 100)

    def __repr__(self) -> str:
        return f"BankAccount(owner={self.owner!r}, balance={self.balance:.2f})"

acct = BankAccount.from_cents("Dara", 12550)
print(acct)`,
            output: `BankAccount(owner='Dara', balance=125.50)`,
          },
          warning:
            'If you define a custom __eq__ on a normal class without __hash__, Python sets __hash__ = None and raises TypeError if you put instances in a set or dict. Use @dataclass(frozen=True) for hashable value objects.',
        },
        {
          id: 'pathlib-json-and-exceptions',
          heading: 'pathlib, JSON Serialization & Exception Handling',
          body: [
            'Modern Python uses pathlib.Path instead of manual string concatenation for file paths: Path("data") / "users.json" works identically on Windows, macOS, and Linux, and provides .exists(), .mkdir(parents=True, exist_ok=True), and .read_text(encoding="utf-8").',
            'When catching errors, catch the narrowest exception type you can actually recover from—never a bare except: that swallows KeyboardInterrupt or bugs. Put success-path code in else: (so you do not accidentally catch unrelated exceptions) and cleanup in finally: or a context manager.',
          ],
          points: [
            'Always pass encoding="utf-8" to open(), read_text(), and write_text() so Khmer/Unicode text never fails on Windows.',
            'Use json.dumps(data, ensure_ascii=False, indent=2) to preserve Unicode characters cleanly.',
            'Create custom domain exceptions (class ConfigError(Exception): pass) so callers can handle them explicitly.',
          ],
          example: {
            title: 'Structured JSON Parsing & Custom Context Manager',
            language: 'python',
            code: `from contextlib import contextmanager
import json

class ConfigError(ValueError):
    pass

@contextmanager
def managed_step(label: str):
    print(f"-> Start: {label}")
    try:
        yield
    finally:
        print(f"<- Done:  {label}")

def parse_config(raw_json: str) -> dict:
    try:
        data = json.loads(raw_json)
    except json.JSONDecodeError as exc:
        raise ConfigError(f"Invalid JSON: {exc.msg}") from exc
    if "port" not in data:
        raise ConfigError("Missing required key: port")
    return data

with managed_step("load settings"):
    cfg = parse_config('{"host": "localhost", "port": 8080}')
    print("Loaded port:", cfg["port"])`,
            output: `-> Start: load settings
Loaded port: 8080
<- Done:  load settings`,
          },
          tip: 'Use raise NewError("...") from exc to chain exceptions—this keeps the original root cause visible in tracebacks.',
        },
      ],
      challenge: {
        prompt:
          'Create a @dataclass named Product with fields name: str and price: float. Validate in __post_init__ that price >= 0 (raising ValueError otherwise), and add a to_json() method returning a JSON string.',
        hint: 'Import dataclass from dataclasses and asdict + json. Inside __post_init__(self), check if self.price < 0: raise ValueError(...).',
        language: 'python',
        solutionCode: `from dataclasses import asdict, dataclass
import json

@dataclass
class Product:
    name: str
    price: float

    def __post_init__(self) -> None:
        if self.price < 0:
            raise ValueError("price must be non-negative")

    def to_json(self) -> str:
        return json.dumps(asdict(self))

item = Product("Mechanical Keyboard", 89.5)
print(item.to_json())`,
      },
      quiz: [
        {
          question: 'When does the else: block run in a try / except / else / finally statement?',
          options: [
            'Only when an exception was raised and caught',
            'Only when the try block finishes with no exception raised',
            'Always, just like finally',
            'Only when finally does not exist',
          ],
          answer: 1,
          explanation:
            'else runs strictly if the try block succeeded without raising an exception, while finally runs unconditionally.',
        },
        {
          question: 'Why should you always pass encoding="utf-8" when opening text files in Python?',
          options: [
            'Without it, Python opens files in binary mode',
            'Default system encodings vary by OS (e.g., cp1252 on Windows), causing UnicodeDecodeError on non-ASCII text',
            'It compresses the file automatically',
            'It is required for the with statement to close the file',
          ],
          answer: 1,
          explanation:
            'Explicitly setting encoding="utf-8" guarantees consistent Unicode handling across Windows, macOS, and Linux.',
        },
      ],
    },
    km: {
      duration: '13 នាទី',
      objectives: [
        'ផ្ទៀងផ្ទាត់ទិន្នន័យ class យ៉ាងស្អាតដោយប្រើ @property, __post_init__ និង @classmethod constructors',
        'ប្រើប្រាស់ dunder methods សំខាន់ៗ (__repr__, __eq__, __len__) និង frozen dataclasses',
        'គ្រប់គ្រងផ្លូវឯកសារ និង JSON ដោយសុវត្ថិភាពលើគ្រប់ប្រព័ន្ធប្រតិបត្តិការជាមួយ pathlib.Path និង encoding="utf-8"',
        'រចនា custom exceptions និងរចនាសម្ព័ន្ធ try / except / else / finally យ៉ាងត្រឹមត្រូវ',
      ],
      extraSections: [
        {
          id: 'properties-dunders-and-dataclasses',
          heading: 'Properties, Dunder Methods និង Immutable Dataclasses',
          body: [
            'ការសរសេរ OOP ល្អក្នុង Python ចាប់ផ្ដើមពីការការពារភាពត្រឹមត្រូវនៃទិន្នន័យ៖ ប្រើ @property ដើម្បីផ្ទៀងផ្ទាត់ ឬគណនាតម្លៃដោយមិនប៉ះពាល់ដល់អ្នកហៅ account.balance និងប្រើ @classmethod (ដូចជា from_dict) ជា constructor ជំនួស។',
            'Python ភ្ជាប់ class របស់អ្នកជាមួយវាក្យសម្ព័ន្ធស្តង់ដារតាម dunder methods៖ __repr__ សម្រាប់បង្ហាញពេល debug, __len__ សម្រាប់ len(obj) និង __enter__/__exit__ សម្រាប់ប្លុក with។ សម្រាប់ទិន្នន័យមិនអាចកែប្រែ សូមប្រើ @dataclass(frozen=True, slots=True)។',
          ],
          points: [
            'ប្រើ @property setter ឬ __post_init__() ដើម្បីបដិសេធទិន្នន័យមិនត្រឹមត្រូវភ្លាមៗពេលបង្កើត object។',
            'ផ្ដល់អាទិភាពលើ composition ("មាន") ជាងការស្នងមរតកជ្រៅពេក (inheritance) ដើម្បីឱ្យងាយធ្វើតេស្ត។',
            '@dataclass(frozen=True) ធ្វើឱ្យ object មិនអាចកែប្រែបាន និងអាចប្រើក្នុង set ឬជា key របស់ dict។',
            'ការបន្ថែម slots=True (Python 3.10+) ជួយកាត់បន្ថយការប្រើអង្គចងចាំ និងការពារការវាយឈ្មោះ attribute ខុស។',
          ],
          table: {
            headers: ['Dunder Method', 'ដំណើរការពេលហៅ', 'តួនាទី'],
            rows: [
              ['__repr__(self)', 'repr(x), debugger', 'បង្ហាញទម្រង់ច្បាស់លាស់សម្រាប់អ្នកអភិវឌ្ឍ'],
              ['__eq__(self, other)', 'a == b', 'ប្រៀបធៀបភាពស្មើគ្នាតាមតម្លៃ'],
              ['__len__(self)', 'len(x), bool(x)', 'រាប់ចំនួនធាតុខាងក្នុង'],
              ['__enter__ / __exit__', 'with obj as x:', 'រៀបចំ និងបិទធនធានដោយស្វ័យប្រវត្តិ'],
            ],
          },
          exampleTitle: 'Class មានការផ្ទៀងផ្ទាត់ដោយ @property និង @classmethod',
          warning:
            'ប្រសិនបើអ្នកកំណត់ __eq__ ដោយគ្មាន __hash__ លើ class ធម្មតា Python នឹងកំណត់ __hash__ = None ហើយបង្ក TypeError ពេលដាក់ object ក្នុង set ឬ dict។ ប្រើ @dataclass(frozen=True) សម្រាប់ value objects ដែលត្រូវការ hash។',
        },
        {
          id: 'pathlib-json-and-exceptions',
          heading: 'pathlib, ការបំប្លែង JSON និងការគ្រប់គ្រង Exceptions',
          body: [
            'Python ទំនើបប្រើ pathlib.Path ជំនួសឱ្យការភ្ជាប់អត្ថបទផ្លូវឯកសារដោយដៃ៖ Path("data") / "users.json" ដំណើរការដូចគ្នាលើ Windows, macOS និង Linux ហើយមានអនុគមន៍ងាយស្រួលដូចជា .exists(), .mkdir(parents=True, exist_ok=True) និង .read_text(encoding="utf-8")។',
            'ពេលចាប់កំហុស ត្រូវចាប់តែប្រភេទ exception ជាក់លាក់ដែលអ្នកអាចដោះស្រាយបាន—កុំប្រើ except: ទទេ។ ដាក់កូដដែលដំណើរការពេលជោគជ័យក្នុង else: និងដាក់ការសម្អាតធនធានក្នុង finally: ឬ context manager។',
          ],
          points: [
            'បញ្ជាក់ encoding="utf-8" ជានិច្ចក្នុង open(), read_text() និង write_text() ដើម្បីឱ្យអក្សរខ្មែរ/Unicode ដំណើរការត្រឹមត្រូវលើ Windows។',
            'ប្រើ json.dumps(data, ensure_ascii=False, indent=2) ដើម្បីរក្សាអក្សរ Unicode ដោយមិនបំប្លែងជា \\uXXXX។',
            'បង្កើត custom exceptions (class ConfigError(Exception): pass) ដើម្បីឱ្យអ្នកហៅអាចចាប់កំហុសច្បាស់លាស់។',
          ],
          exampleTitle: 'ការអាន JSON និង Custom Context Manager',
          tip: 'ប្រើ raise NewError("...") from exc ដើម្បីភ្ជាប់ប្រភពកំហុសដើមឱ្យនៅឃើញច្បាស់ក្នុង traceback។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើត @dataclass ឈ្មោះ Product ដែលមាន fields name: str និង price: float។ ផ្ទៀងផ្ទាត់ក្នុង __post_init__ ថា price >= 0 (បើតូចជាង 0 ត្រូវបង្ក ValueError) និងបន្ថែម method to_json() ដែលត្រឡប់អត្ថបទ JSON។',
        hint: 'Import dataclass និង asdict ពី dataclasses និង import json។ ក្នុង __post_init__(self) ពិនិត្យ if self.price < 0: raise ValueError(...)។',
      },
      quiz: [
        {
          question: 'តើប្លុក else: ដំណើរការនៅពេលណាក្នុង try / except / else / finally?',
          options: [
            'តែនៅពេលមាន exception កើតឡើង និងត្រូវបានចាប់',
            'តែនៅពេលប្លុក try បញ្ចប់ដោយគ្មាន exception កើតឡើង',
            'ដំណើរការជានិច្ចដូច finally',
            'តែនៅពេលគ្មានប្លុក finally',
          ],
          answer: 1,
          explanation:
            'else ដំណើរការតែនៅពេលប្លុក try ជោគជ័យដោយគ្មានកំហុស ចំណែក finally ដំណើរការជានិច្ចមិនថាមានកំហុសឬអត់។',
        },
        {
          question: 'ហេតុអ្វីគួរដាក់ encoding="utf-8" ជានិច្ចពេលបើកឯកសារអត្ថបទក្នុង Python?',
          options: [
            'បើមិនដាក់ Python នឹងបើកជា binary mode',
            'encoding លំនាំដើមខុសគ្នាតាមប្រព័ន្ធប្រតិបត្តិការ (ឧ. cp1252 លើ Windows) ដែលអាចបង្ក UnicodeDecodeError លើអក្សរ Unicode',
            'វាជួយបង្រួមទំហំឯកសារដោយស្វ័យប្រវត្តិ',
            'ចាំបាច់សម្រាប់ឱ្យប្លុក with បិទឯកសារ',
          ],
          answer: 1,
          explanation:
            'ការកំណត់ encoding="utf-8" ធានាថាការអាន និងសរសេរអក្សរ Unicode (រួមទាំងភាសាខ្មែរ) ដំណើរការដូចគ្នាលើគ្រប់ OS។',
        },
      ],
    },
  },

  'python/python-async-and-apis': {
    en: {
      duration: '15 min',
      objectives: [
        'Control concurrency safely with asyncio.Semaphore, asyncio.wait_for / timeout, and TaskGroup',
        'Avoid blocking the asyncio event loop with synchronous I/O or CPU-bound calls',
        'Decouple services for clean unit testing using typing.Protocol (structural typing)',
        'Organize production Python projects with src/ layouts, pyproject.toml, and isolated virtual environments',
      ],
      extraSections: [
        {
          id: 'bounded-concurrency-and-timeouts',
          heading: 'Bounded Concurrency, Timeouts & TaskGroup',
          body: [
            'Firing 5,000 unbounded requests at once with asyncio.gather() can exhaust sockets or trigger API rate limits. Wrap external calls in an asyncio.Semaphore(limit) to cap how many coroutines run simultaneously, and protect every network call with asyncio.wait_for() or asyncio.timeout() so a hanging server never stalls your service forever.',
            'Python 3.11+ introduced asyncio.TaskGroup for structured concurrency: if one child task fails with an unexpected exception, the group automatically cancels sibling tasks and raises an ExceptionGroup—eliminating leaked background tasks.',
          ],
          points: [
            'Use asyncio.Semaphore(N) to limit concurrent HTTP/DB calls without complex thread pools.',
            'Always set explicit timeouts on external I/O using asyncio.wait_for(coro, timeout=5.0).',
            'Pass return_exceptions=True to asyncio.gather() when you want partial results even if one call fails.',
            'Offload unavoidable blocking library calls with await asyncio.to_thread(sync_fn, arg).',
          ],
          table: {
            headers: ['asyncio Tool', 'Role', 'When to Use'],
            rows: [
              ['asyncio.gather()', 'Run coroutines concurrently', 'Collecting fixed set of results'],
              ['asyncio.TaskGroup', 'Structured task lifecycle (3.11+)', 'Auto-cancel siblings on failure'],
              ['asyncio.Semaphore(n)', 'Limit active concurrent tasks', 'Respecting API/DB rate limits'],
              ['asyncio.wait_for()', 'Enforce max wait time', 'Preventing hung network requests'],
              ['asyncio.to_thread()', 'Run blocking func in worker thread', 'Bridging legacy sync libraries'],
            ],
          },
          example: {
            title: 'Rate-Limited Concurrent Calls with Semaphore & Timeout',
            language: 'python',
            code: `import asyncio

async def call_api(sem: asyncio.Semaphore, endpoint: str, delay: float) -> str:
    async with sem:
        await asyncio.sleep(delay)
        return f"200 {endpoint}"

async def main() -> None:
    sem = asyncio.Semaphore(2)  # Max 2 in-flight requests
    endpoints = [("/users", 0.03), ("/orders", 0.03), ("/metrics", 0.03)]

    tasks = [
        asyncio.wait_for(call_api(sem, ep, d), timeout=1.0)
        for ep, d in endpoints
    ]
    results = await asyncio.gather(*tasks)
    print(" | ".join(results))

asyncio.run(main())`,
            output: `200 /users | 200 /orders | 200 /metrics`,
          },
          warning:
            'Calling synchronous blocking functions like time.sleep() or requests.get() directly inside an async def freezes the single-threaded event loop—all other concurrent requests pause until it finishes. Use async clients (httpx.AsyncClient) or asyncio.to_thread().',
        },
        {
          id: 'protocols-and-production-structure',
          heading: 'typing.Protocol & Production Package Architecture',
          body: [
            'Large Python backends stay testable by depending on interfaces rather than concrete database or HTTP clients. With typing.Protocol (PEP 544), any class that implements the matching method signatures satisfies the contract automatically—without needing inheritance ("static duck typing").',
            'Package production services using a pyproject.toml file (PEP 621), a src/ package directory (so tests always test the installed package), and strict tooling like ruff (lint/format) and mypy/pyright (static type checks).',
          ],
          points: [
            'typing.Protocol decouples domain logic from infrastructure without boilerplate abstract base classes.',
            'Inject dependencies via __init__ so unit tests can pass fast in-memory fakes.',
            'Keep pure business rules synchronous; wrap async I/O at the service edges.',
          ],
          example: {
            title: 'Decoupled Async Service Using typing.Protocol',
            language: 'python',
            code: `import asyncio
from typing import Protocol

class UserRepo(Protocol):
    async def get_name(self, user_id: int) -> str | None: ...

class FakeUserRepo:
    async def get_name(self, user_id: int) -> str | None:
        return {1: "Bopha", 2: "Vichea"}.get(user_id)

async def welcome_message(repo: UserRepo, user_id: int) -> str:
    name = await repo.get_name(user_id)
    return f"Welcome back, {name}!" if name else "Welcome, guest!"

async def main() -> None:
    repo = FakeUserRepo()
    print(await welcome_message(repo, 1))
    print(await welcome_message(repo, 99))

asyncio.run(main())`,
            output: `Welcome back, Bopha!
Welcome, guest!`,
          },
          tip: 'For CPU-bound workloads (video encoding, heavy numerical loops), asyncio alone does not parallelize across CPU cores—use ProcessPoolExecutor or native extensions like NumPy.',
        },
      ],
      challenge: {
        prompt:
          'Write an async function fetch_all(urls: list[str], limit: int = 2) -> list[str] that uses asyncio.Semaphore(limit) to simulate fetching each URL (await asyncio.sleep(0.02)) and returns ["OK:" + url, ...] concurrently.',
        hint: 'Define an inner async helper fetch_one(url) that uses async with sem:, sleeps 0.02s, and returns f"OK:{url}", then await asyncio.gather(*(fetch_one(u) for u in urls)).',
        language: 'python',
        solutionCode: `import asyncio

async def fetch_all(urls: list[str], limit: int = 2) -> list[str]:
    sem = asyncio.Semaphore(limit)

    async def fetch_one(url: str) -> str:
        async with sem:
            await asyncio.sleep(0.02)
            return f"OK:{url}"

    return list(await asyncio.gather(*(fetch_one(u) for u in urls)))

async def main() -> None:
    res = await fetch_all(["/a", "/b", "/c", "/d"], limit=2)
    print(res)

asyncio.run(main())`,
      },
      quiz: [
        {
          question: 'What happens if you call time.sleep(2) inside an async def coroutine?',
          options: [
            'Only that coroutine pauses while other coroutines keep running',
            'It blocks the entire event loop for 2 seconds, freezing all concurrent tasks',
            'Python automatically converts it to await asyncio.sleep(2)',
            'It raises SyntaxError',
          ],
          answer: 1,
          explanation:
            'time.sleep() blocks the OS thread running the asyncio event loop. Always use await asyncio.sleep() or asyncio.to_thread() for blocking calls.',
        },
        {
          question: 'How does typing.Protocol differ from inheriting an Abstract Base Class (ABC)?',
          options: [
            'Protocol requires explicit inheritance from every implementing class',
            'Protocol uses structural typing—any class with matching method signatures satisfies it without inheriting',
            'Protocol only works with async functions',
            'Protocol disables static type checkers like mypy',
          ],
          answer: 1,
          explanation:
            'typing.Protocol enables static duck typing: classes satisfy the protocol simply by implementing the required methods/attributes.',
        },
      ],
    },
    km: {
      duration: '15 នាទី',
      objectives: [
        'គ្រប់គ្រងចំនួនការងារព្រមគ្នាដោយសុវត្ថិភាពជាមួយ asyncio.Semaphore, asyncio.wait_for និង TaskGroup',
        'ជៀសវាងការបង្កក asyncio event loop ដោយការហៅ I/O បែប synchronous',
        'បំបែកសេវាកម្មឱ្យងាយធ្វើតេស្តដោយប្រើ typing.Protocol (structural typing)',
        'រៀបចំគម្រោង Python កម្រិតផលិតកម្មជាមួយរចនាសម្ព័ន្ធ src/, pyproject.toml និង virtual environment',
      ],
      extraSections: [
        {
          id: 'bounded-concurrency-and-timeouts',
          heading: 'ការកំណត់ដែន Concurrency, Timeouts និង TaskGroup',
          body: [
            'ការបាញ់សំណើ 5,000 ព្រមគ្នាដោយគ្មានដែនកំណត់ជាមួយ asyncio.gather() អាចធ្វើឱ្យអស់ socket ឬជាប់ rate limit របស់ API។ សូមគ្របការហៅខាងក្រៅដោយ asyncio.Semaphore(limit) ដើម្បីកំណត់ចំនួនការងារព្រមគ្នា និងការពាររាល់ការហៅបណ្ដាញដោយ asyncio.wait_for() ឬ asyncio.timeout()។',
            'Python 3.11+ បានបន្ថែម asyncio.TaskGroup សម្រាប់ structured concurrency៖ ប្រសិនបើកិច្ចការមួយបរាជ័យ TaskGroup នឹងបោះបង់កិច្ចការផ្សេងទៀតដោយស្វ័យប្រវត្តិ និងការពារកុំឱ្យមាន task លេចធ្លាយក្នុងផ្ទៃខាងក្រោយ។',
          ],
          points: [
            'ប្រើ asyncio.Semaphore(N) ដើម្បីកំណត់ចំនួនសំណើ HTTP/DB ដែលដំណើរការព្រមគ្នា។',
            'កំណត់ timeout ច្បាស់លាស់ជានិច្ចលើ I/O ខាងក្រៅជាមួយ asyncio.wait_for(coro, timeout=5.0)។',
            'បញ្ជូន return_exceptions=True ទៅ asyncio.gather() ពេលចង់បានលទ្ធផលខ្លះទោះមានសំណើមួយបរាជ័យ។',
            'ផ្ទេរការហៅ synchronous ដែលមិនអាចជៀសបានទៅ thread ផ្សេងដោយ await asyncio.to_thread(sync_fn, arg)។',
          ],
          table: {
            headers: ['ឧបករណ៍ asyncio', 'តួនាទី', 'ពេលណាគួរប្រើ'],
            rows: [
              ['asyncio.gather()', 'ដំណើរការ coroutines ព្រមគ្នា', 'ប្រមូលលទ្ធផលពីកិច្ចការមួយក្រុម'],
              ['asyncio.TaskGroup', 'គ្រប់គ្រងអាយុកាល task (3.11+)', 'បោះបង់ task ផ្សេងស្វ័យប្រវត្តិពេលមានកំហុស'],
              ['asyncio.Semaphore(n)', 'កំណត់ចំនួន task សកម្មព្រមគ្នា', 'គោរព rate limit របស់ API/DB'],
              ['asyncio.wait_for()', 'កំណត់ពេលរង់ចាំអតិបរមា', 'ការពារសំណើបណ្ដាញដែលគាំងយូរ'],
              ['asyncio.to_thread()', 'ដំណើរការកូដ blocking ក្នុង thread ផ្សេង', 'ភ្ជាប់ជាមួយបណ្ណាល័យ sync ចាស់ៗ'],
            ],
          },
          exampleTitle: 'ការហៅ API មានកំណត់ចំនួនជាមួយ Semaphore និង Timeout',
          warning:
            'ការហៅអនុគមន៍ blocking ដូចជា time.sleep() ឬ requests.get() ផ្ទាល់ក្នុង async def នឹងបង្កក event loop ទាំងមូល—គ្រប់សំណើផ្សេងទៀតនឹងឈប់ដំណើរការរហូតដល់វាចប់។ ត្រូវប្រើ async client (httpx.AsyncClient) ឬ asyncio.to_thread()។',
        },
        {
          id: 'protocols-and-production-structure',
          heading: 'typing.Protocol និងស្ថាបត្យកម្មគម្រោងផលិតកម្ម',
          body: [
            'ប្រព័ន្ធ Python Backend ធំៗងាយធ្វើតេស្តនៅពេលវាពឹងផ្អែកលើ interface ជំនួសឱ្យ database ឬ HTTP client ជាក់លាក់។ ជាមួយ typing.Protocol (PEP 544) រាល់ class ដែលមាន methods ត្រូវគ្នានឹងគោរពកិច្ចសន្យាដោយស្វ័យប្រវត្តិដោយមិនបាច់ស្នងមរតកឡើយ។',
            'រៀបចំសេវាកម្មកម្រិតផលិតកម្មដោយប្រើ pyproject.toml (PEP 621), ថតឯកសារ src/ និងឧបករណ៍ត្រួតពិនិត្យដូចជា ruff និង mypy/pyright ដើម្បីចាប់កំហុសមុនពេលដាក់ដំណើរការ។',
          ],
          points: [
            'typing.Protocol បំបែកតក្កវិជ្ជាអាជីវកម្មពីហេដ្ឋារចនាសម្ព័ន្ធដោយមិនបាច់សរសេរ abstract base class វែងៗ។',
            'បញ្ចូល dependencies តាម __init__ ដើម្បីឱ្យ unit tests អាចប្រើ fake repository ក្នុងអង្គចងចាំបានលឿន។',
            'រក្សាតក្កវិជ្ជាគណនាសុទ្ធជា synchronous ហើយប្រើ async សម្រាប់តែស្រទាប់ I/O។',
          ],
          exampleTitle: 'សេវាកម្ម Async បំបែកឯករាជ្យដោយប្រើ typing.Protocol',
          tip: 'សម្រាប់ការងារប្រើ CPU ធ្ងន់ (ដូចជាការបំប្លែងវីដេអូ ឬគណនាធំៗ) asyncio តែឯងមិនដើរស្របលើ CPU ច្រើនគ្រាប់ទេ—ត្រូវប្រើ ProcessPoolExecutor ឬបណ្ណាល័យដូចជា NumPy។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ async ឈ្មោះ fetch_all(urls: list[str], limit: int = 2) -> list[str] ដែលប្រើ asyncio.Semaphore(limit) ដើម្បីក្លែងធ្វើការទាញ URL នីមួយៗ (await asyncio.sleep(0.02)) ហើយត្រឡប់ ["OK:" + url, ...] ព្រមគ្នា។',
        hint: 'បង្កើតអនុគមន៍ជំនួយ fetch_one(url) នៅខាងក្នុងដោយប្រើ async with sem:, await asyncio.sleep(0.02) និងត្រឡប់ f"OK:{url}" រួចហៅ await asyncio.gather(...)។',
      },
      quiz: [
        {
          question: 'តើមានអ្វីកើតឡើងប្រសិនបើហៅ time.sleep(2) នៅខាងក្នុង async def coroutine?',
          options: [
            'ផ្អាកតែ coroutine នោះឯង ខណៈ coroutines ផ្សេងនៅតែដើរ',
            'បង្កក event loop ទាំងមូលរយៈពេល 2 វិនាទី ធ្វើឱ្យរាល់កិច្ចការព្រមគ្នាឈប់ទាំងអស់',
            'Python បំប្លែងវាទៅ await asyncio.sleep(2) ដោយស្វ័យប្រវត្តិ',
            'បង្កកំហុស SyntaxError',
          ],
          answer: 1,
          explanation:
            'time.sleep() បង្កក OS thread ដែលដំណើរការ event loop។ ត្រូវប្រើ await asyncio.sleep() ឬ asyncio.to_thread() ជំនួស។',
        },
        {
          question: 'តើ typing.Protocol ខុសពីការស្នងមរតក Abstract Base Class (ABC) ដូចម្ដេច?',
          options: [
            'Protocol តម្រូវឱ្យ class ទាំងអស់ស្នងមរតកពីវាដោយផ្ទាល់',
            'Protocol ប្រើ structural typing—រាល់ class ដែលមាន methods ត្រូវគ្នាសុទ្ធតែប្រើបានដោយមិនបាច់ស្នងមរតក',
            'Protocol ប្រើបានតែជាមួយ async functions ប៉ុណ្ណោះ',
            'Protocol បិទការត្រួតពិនិត្យប្រភេទទិន្នន័យរបស់ mypy',
          ],
          answer: 1,
          explanation:
            'typing.Protocol គាំទ្រ static duck typing៖ ឱ្យតែ class មាន methods និងហត្ថលេខាត្រឹមត្រូវ វាត្រូវបានទទួលស្គាល់ភ្លាមដោយមិនបាច់ស្នងមរតក។',
        },
      ],
    },
  },

  'c/c-basics': {
    en: {
      duration: '11 min',
      objectives: [
        'Trace the four C build stages: preprocessing, compilation, assembly, and linking',
        'Choose exact-width integer types (<stdint.h>) and match printf format specifiers accurately',
        'Prevent silent integer division truncation and signed overflow bugs',
        'Parse numeric input safely using strtol() instead of unchecked scanf()',
      ],
      extraSections: [
        {
          id: 'fixed-width-types-and-sizeof',
          heading: 'Compilation Pipeline, <stdint.h> Types & sizeof',
          body: [
            'When you run gcc main.c -o app, four distinct stages happen under the hood: the Preprocessor expands #include and #define directives, the Compiler translates C into assembly, the Assembler emits machine-code object files (.o), and the Linker resolves library calls like printf into an executable binary.',
            'Because the byte size of plain int and long can vary across 32-bit and 64-bit platforms, systems programmers include <stdint.h> for guaranteed widths (int32_t, uint64_t) and use size_t for object sizes and array indices. Use the compile-time sizeof operator with %zu to inspect exact byte sizes.',
          ],
          points: [
            'sizeof returns a size_t value; print it with the %zu format specifier.',
            'Include <stdbool.h> for clean bool, true, and false keywords instead of raw 0/1 ints.',
            'Prefer const variables over #define macros for typed constants so the compiler checks types.',
            'Always initialize local variables in C—uninitialized stack variables contain indeterminate garbage bytes.',
          ],
          table: {
            headers: ['C Type', 'Typical Size (64-bit)', 'printf Specifier', 'Best For'],
            rows: [
              ['char', '1 byte', '%c', 'Single ASCII byte / character'],
              ['int / int32_t', '4 bytes', '%d', 'General signed integers'],
              ['size_t', '8 bytes (unsigned)', '%zu', 'Array lengths, sizeof results'],
              ['double', '8 bytes', '%.2f', 'Standard floating-point math'],
              ['const char *', '8 bytes (pointer)', '%s', 'Null-terminated C strings'],
            ],
          },
          example: {
            title: 'Fixed-Width Types & sizeof Inspection',
            language: 'c',
            code: `#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>

int main(void) {
    uint32_t port = 8080;
    double latency_ms = 14.375;
    bool tls_enabled = true;

    printf("Port: %u | Latency: %.2f ms | TLS: %s\\n",
           port, latency_ms, tls_enabled ? "ON" : "OFF");
    printf("Sizes -> int32_t: %zuB, double: %zuB, size_t: %zuB\\n",
           sizeof(int32_t), sizeof(double), sizeof(size_t));
    return 0;
}`,
            output: `Port: 8080 | Latency: 14.38 ms | TLS: ON
Sizes -> int32_t: 4B, double: 8B, size_t: 8B`,
          },
          warning:
            'Passing the wrong printf format specifier (such as printing a double or size_t with %d) triggers Undefined Behavior and corrupts output. Always compile with -Wall -Wextra so GCC/Clang validates every format string at compile time.',
        },
        {
          id: 'integer-division-and-safe-parsing',
          heading: 'Integer Division, Casts & Safe Parsing with strtol',
          body: [
            'Dividing two integers in C truncates toward zero: 5 / 2 evaluates to 2, not 2.5—even if you assign the result to a double! To get floating-point division, cast at least one operand before dividing: (double)sum / count.',
            'Signed integer overflow (exceeding INT_MAX) is Undefined Behavior in C, meaning the compiler is legally allowed to optimize away your overflow checks. When converting strings to integers, avoid atoi() (which silently returns 0 on errors) and use strtol() with an endptr check so invalid input is caught explicitly.',
          ],
          points: [
            'Cast before dividing: (double)a / b yields 2.5, whereas (double)(a / b) yields 2.0.',
            'Avoid scanf("%s", buf) without a width limit—it can overflow buf if input is too long.',
            'Use strtol(text, &end, 10) to validate that the entire string was parsed as a valid base-10 integer.',
          ],
          example: {
            title: 'Explicit Cast & Safe Integer Parsing with strtol',
            language: 'c',
            code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int total = 7, count = 2;
    printf("Int div: %d | Float div: %.2f\\n", total / count, (double)total / count);

    const char *raw = "42";
    char *end = NULL;
    long value = strtol(raw, &end, 10);
    if (end != raw && *end == '\\0') {
        printf("Parsed safely: %ld\\n", value);
    }
    return 0;
}`,
            output: `Int div: 3 | Float div: 3.50
Parsed safely: 42`,
          },
          tip: 'When dividing constants, write 9.0 / 5.0 instead of 9 / 5 so the expression is evaluated in double precision from the start.',
        },
      ],
      challenge: {
        prompt:
          'Write a C program that converts double celsius = 36.6 to Fahrenheit (celsius * 9.0 / 5.0 + 32.0) and prints both temperatures to 1 decimal place along with sizeof(double) using %zu.',
        hint: 'Include <stdio.h>, declare double celsius = 36.6; double fahrenheit = celsius * 9.0 / 5.0 + 32.0; and use %.1f and %zu in printf.',
        language: 'c',
        solutionCode: `#include <stdio.h>

int main(void) {
    double celsius = 36.6;
    double fahrenheit = celsius * 9.0 / 5.0 + 32.0;

    printf("%.1f C = %.1f F (double is %zu bytes)\\n",
           celsius, fahrenheit, sizeof(double));
    return 0;
}`,
      },
      quiz: [
        {
          question: 'What does double ratio = 5 / 2; store in ratio in C?',
          options: ['2.5', '2.0', '3.0', 'Compile error'],
          answer: 1,
          explanation:
            'Both 5 and 2 are int, so integer division happens first (producing 2), and only then is 2 converted to double 2.0. Write 5.0 / 2.0 or (double)5 / 2 for 2.5.',
        },
        {
          question: 'Which printf format specifier is standard for printing the result of sizeof(int)?',
          options: ['%d', '%ld', '%zu', '%p'],
          answer: 2,
          explanation:
            'sizeof yields a size_t (unsigned integer type), whose portable C99+ format specifier is %zu.',
        },
      ],
    },
    km: {
      duration: '11 នាទី',
      objectives: [
        'យល់ពីដំណាក់កាលទាំង 4 នៃការ build ភាសា C៖ preprocessing, compilation, assembly និង linking',
        'ជ្រើសរើសប្រភេទលេខទំហំច្បាស់លាស់ (<stdint.h>) និងផ្គូផ្គង printf format specifiers បានត្រឹមត្រូវ',
        'ការពារកំហុសការចែកលេខគត់កាត់ក្បៀស និង signed integer overflow',
        'បំប្លែងអត្ថបទទៅលេខដោយសុវត្ថិភាពជាមួយ strtol() ជំនួសឱ្យ atoi() ឬ scanf() ដែលគ្មានដែនកំណត់',
      ],
      extraSections: [
        {
          id: 'fixed-width-types-and-sizeof',
          heading: 'ដំណើរការ Compilation, ប្រភេទ <stdint.h> និង sizeof',
          body: [
            'នៅពេលអ្នកដំណើរការ gcc main.c -o app មាន 4 ដំណាក់កាលកើតឡើង៖ Preprocessor ពង្រីក #include និង #define, Compiler បំប្លែង C ទៅ assembly, Assembler បង្កើតឯកសារ object (.o) និង Linker ភ្ជាប់អនុគមន៍បណ្ណាល័យដូចជា printf ទៅជាកម្មវិធីដំណើរការ។',
            'ដោយសារទំហំបៃនៃ int និង long អាចខុសគ្នាតាមប្រព័ន្ធ 32-bit និង 64-bit អ្នកសរសេរ C ប្រើ <stdint.h> សម្រាប់ទំហំថេរ (int32_t, uint64_t) និងប្រើ size_t សម្រាប់ទំហំអង្គចងចាំ និងសន្ទស្សន៍ array។ ប្រើ sizeof ជាមួយ %zu ដើម្បីពិនិត្យទំហំបៃពិតប្រាកដ។',
          ],
          points: [
            'sizeof ត្រឡប់ប្រភេទ size_t ហើយត្រូវបង្ហាញជាមួយ %zu ក្នុង printf។',
            'បញ្ចូល <stdbool.h> ដើម្បីប្រើ bool, true និង false យ៉ាងស្អាតជំនួសឱ្យលេខ 0/1។',
            'ផ្ដល់អាទិភាពលើអថេរ const ជាង #define សម្រាប់តម្លៃថេរ ដើម្បីឱ្យ compiler ពិនិត្យប្រភេទទិន្នន័យ។',
            'ត្រូវផ្ដល់តម្លៃដំបូងឱ្យអថេរក្នុងអនុគមន៍ជានិច្ច—អថេរមិនកំណត់តម្លៃដំបូងផ្ទុកទិន្នន័យសំរាម។',
          ],
          table: {
            headers: ['ប្រភេទទិន្នន័យ C', 'ទំហំធម្មតា (64-bit)', 'printf Specifier', 'ប្រើសម្រាប់'],
            rows: [
              ['char', '1 byte', '%c', 'តួអក្សរ ASCII / 1 បៃ'],
              ['int / int32_t', '4 bytes', '%d', 'លេខគត់មានសញ្ញាទូទៅ'],
              ['size_t', '8 bytes (គ្មានសញ្ញា)', '%zu', 'ប្រវែង array, លទ្ធផល sizeof'],
              ['double', '8 bytes', '%.2f', 'លេខទសភាគស្តង់ដារ'],
              ['const char *', '8 bytes (pointer)', '%s', 'C strings ដែលបញ្ចប់ដោយ \\0'],
            ],
          },
          exampleTitle: 'ប្រភេទទំហំថេរ និងការពិនិត្យ sizeof',
          warning:
            'ការប្រើ printf format specifier ខុសប្រភេទ (ឧ. ប្រើ %d សម្រាប់ double ឬ size_t) បង្កឱ្យមាន Undefined Behavior និងលទ្ធផលខូច។ ត្រូវ compile ជាមួយ -Wall -Wextra ជានិច្ចដើម្បីឱ្យ compiler ពិនិត្យ។',
        },
        {
          id: 'integer-division-and-safe-parsing',
          heading: 'ការចែកលេខគត់, Casts និងការបំប្លែងសុវត្ថិភាពដោយ strtol',
          body: [
            'ការចែកលេខគត់ពីរក្នុង C នឹងកាត់ផ្នែកទសភាគចោល៖ 5 / 2 ស្មើ 2 មិនមែន 2.5 ឡើយ ទោះបីអ្នករក្សាទុកក្នុង double ក៏ដោយ! ដើម្បីចែកជាទសភាគ ត្រូវ cast អថេរយ៉ាងតិចមួយជាមុន៖ (double)sum / count។',
            'Signed integer overflow គឺជា Undefined Behavior ក្នុង C។ នៅពេលបំប្លែងអត្ថបទទៅលេខគត់ គួរជៀសវាង atoi() (ដែលត្រឡប់ 0 ដោយស្ងាត់ៗពេលខុស) ហើយប្រើ strtol() ជាមួយការពិនិត្យ endptr ដើម្បីចាប់កំហុសបញ្ចូលបានច្បាស់លាស់។',
          ],
          points: [
            'Cast មុនពេលចែក៖ (double)a / b ផ្ដល់ 2.5 ចំណែក (double)(a / b) ផ្ដល់ 2.0។',
            'ជៀសវាង scanf("%s", buf) ដោយគ្មានដែនកំណត់ប្រវែង ព្រោះងាយបង្ក buffer overflow។',
            'ប្រើ strtol(text, &end, 10) ដើម្បីផ្ទៀងផ្ទាត់ថាអត្ថបទទាំងមូលជាលេខគត់ត្រឹមត្រូវ។',
          ],
          exampleTitle: 'Explicit Cast និងការបំប្លែងលេខដោយសុវត្ថិភាពជាមួយ strtol',
          tip: 'ពេលចែកលេខថេរ សូមសរសេរ 9.0 / 5.0 ជំនួសឱ្យ 9 / 5 ដើម្បីធានាការគណនាជា double តាំងពីដំបូង។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរកម្មវិធី C បំប្លែង double celsius = 36.6 ទៅជា Fahrenheit (celsius * 9.0 / 5.0 + 32.0) រួចបង្ហាញសីតុណ្ហភាពទាំងពីរមានទសភាគ 1 ខ្ទង់ ព្រមជាមួយ sizeof(double) ដោយប្រើ %zu។',
        hint: 'បញ្ចូល <stdio.h> ប្រកាស double celsius = 36.6; double fahrenheit = celsius * 9.0 / 5.0 + 32.0; រួចប្រើ %.1f និង %zu ក្នុង printf។',
      },
      quiz: [
        {
          question: 'តើ double ratio = 5 / 2; រក្សាទុកតម្លៃអ្វីក្នុង ratio ក្នុងភាសា C?',
          options: ['2.5', '2.0', '3.0', 'កំហុស Compile error'],
          answer: 1,
          explanation:
            'ទាំង 5 និង 2 ជា int ដូច្នេះវាចែកលេខគត់មុន (បាន 2) ទើបបំប្លែងជា double 2.0។ ត្រូវសរសេរ 5.0 / 2.0 ឬ (double)5 / 2 ដើម្បីបាន 2.5។',
        },
        {
          question: 'តើ printf format specifier ណាមួយដែលត្រឹមត្រូវតាមស្តង់ដារសម្រាប់បង្ហាញ sizeof(int)?',
          options: ['%d', '%ld', '%zu', '%p'],
          answer: 2,
          explanation:
            'sizeof ត្រឡប់ប្រភេទ size_t ដែលមាន format specifier ស្តង់ដារគឺ %zu។',
        },
      ],
    },
  },

  'c/c-control-flow-functions': {
    en: {
      duration: '12 min',
      objectives: [
        'Use switch statements, while/do-while loops, and short-circuit boolean guards cleanly',
        'Prevent accidental switch case fall-through bugs with explicit break or return statements',
        'Separate function prototypes from definitions and understand C pass-by-value semantics',
        'Control symbol visibility and lifetime using the static keyword',
      ],
      extraSections: [
        {
          id: 'switch-short-circuit-and-loops',
          heading: 'switch, do-while & Short-Circuit Guards',
          body: [
            'When branching on discrete integer or character values (menu commands, state machines, HTTP status codes), switch is clearer and often compiles to a fast jump table. Always include a default: branch to handle unexpected inputs defensively.',
            'C evaluates logical && and || from left to right and stops as soon as the outcome is decided (short-circuit evaluation). This is crucial for safety in C: writing if (divisor != 0 && total / divisor > 5) guarantees division by zero never executes when divisor is 0.',
          ],
          points: [
            'Use while when the loop body may run zero times; use do { ... } while (cond); when it must run at least once.',
            'Logical && skips the right operand if the left is false; || skips the right if the left is true.',
            'Use break to exit the innermost loop or switch; use continue to jump to the next loop iteration.',
            'Keep loop counters scoped to the for header (for (int i = 0; i < n; i++)) so they do not leak into outer blocks.',
          ],
          table: {
            headers: ['Construct', 'When Evaluated', 'Best Use Case'],
            rows: [
              ['if / else if', 'Before each branch', 'Ranges, compound boolean checks'],
              ['switch / case', 'Jump on int/char/enum', 'State machines, command dispatch'],
              ['for (init; cond; step)', 'Before each iteration', 'Counted loops and array scans'],
              ['while (cond)', 'Before each iteration', 'Sentinel loops, GCD, stream reads'],
              ['do { } while (cond);', 'After each iteration', 'Prompt/retry loops running >= 1 time'],
            ],
          },
          example: {
            title: 'switch Command Dispatcher & Euclid GCD Loop',
            language: 'c',
            code: `#include <stdio.h>

int gcd(int a, int b) {
    while (b != 0) {
        int rem = a % b;
        a = b;
        b = rem;
    }
    return a;
}

void handle_code(char cmd) {
    switch (cmd) {
        case 'r':
            printf("Action: Read\\n");
            break;
        case 'w':
            printf("Action: Write\\n");
            break;
        default:
            printf("Action: Unknown (%c)\\n", cmd);
            break;
    }
}

int main(void) {
    handle_code('w');
    printf("gcd(48, 18) = %d\\n", gcd(48, 18));
    return 0;
}`,
            output: `Action: Write
gcd(48, 18) = 6`,
          },
          warning:
            'Omitting break; at the end of a switch case causes execution to fall straight into the next case silently! Always end each case with break; or return;, and compile with -Wimplicit-fallthrough.',
        },
        {
          id: 'prototypes-pass-by-value-and-static',
          heading: 'Prototypes, Pass-by-Value & the static Keyword',
          body: [
            'Every argument in C is passed strictly by value: the function receives a copy of the argument, so modifying a parameter inside the function never alters the caller’s original variable (until you explicitly pass a pointer, covered next). Declaring a function prototype above main() lets you place full definitions cleanly below main() or in separate .c files.',
            'The static keyword serves two distinct, essential roles in C: on a top-level function or global variable, static restricts visibility to the current .c file (internal linkage, like "private" in OOP); inside a function, a static local variable retains its value across calls instead of being reset on each stack frame.',
          ],
          points: [
            'Always write int main(void) (not int main()) in C to explicitly state the function takes zero parameters.',
            'Mark internal helper functions static so they cannot collide with symbols in other .c files at link time.',
            'Avoid mutable static local state in multithreaded code—it is shared across all callers and not thread-safe.',
          ],
          example: {
            title: 'Function Prototype, Pass-by-Value & static Helper',
            language: 'c',
            code: `#include <stdio.h>

static int clamp(int value, int low, int high);

static void try_double(int x) {
    x *= 2;  // Modifies local copy only
}

int main(void) {
    int score = 40;
    try_double(score);
    printf("After pass-by-value: %d\\n", score);
    printf("Clamped 130 -> %d\\n", clamp(130, 0, 100));
    return 0;
}

static int clamp(int value, int low, int high) {
    if (value < low) return low;
    if (value > high) return high;
    return value;
}`,
            output: `After pass-by-value: 40
Clamped 130 -> 100`,
          },
          tip: 'Keep functions short and single-purpose—returning early on invalid inputs avoids deeply nested if/else pyramids.',
        },
      ],
      challenge: {
        prompt:
          'Declare a prototype int is_prime(int n); above main(), implement it below main() (returning 1 if prime, 0 otherwise), and print all prime numbers from 2 to 20.',
        hint: 'Return 0 if n < 2. Loop for (int d = 2; d * d <= n; d++) and return 0 if n % d == 0; otherwise return 1.',
        language: 'c',
        solutionCode: `#include <stdio.h>

int is_prime(int n);

int main(void) {
    for (int n = 2; n <= 20; n++) {
        if (is_prime(n)) {
            printf("%d ", n);
        }
    }
    printf("\\n");
    return 0;
}

int is_prime(int n) {
    if (n < 2) return 0;
    for (int d = 2; d * d <= n; d++) {
        if (n % d == 0) return 0;
    }
    return 1;
}`,
      },
      quiz: [
        {
          question: 'What happens in C if a switch case omits break; before the next case?',
          options: [
            'The compiler always rejects the code as a syntax error',
            'Execution automatically exits the switch block',
            'Execution falls through and runs the next case block as well',
            'Execution jumps to default:',
          ],
          answer: 2,
          explanation:
            'C switch cases fall through by default until a break;, return;, or the closing brace of switch is reached.',
        },
        {
          question: 'What does putting static in front of a helper function definition in a .c file do?',
          options: [
            'Makes the function run faster on the heap',
            'Restricts the function’s visibility (linkage) to that single .c translation unit',
            'Prevents the function from taking arguments',
            'Automatically caches the function’s return value',
          ],
          answer: 1,
          explanation:
            'File-scope static gives a function internal linkage, hiding it from other .c files and preventing linker name collisions.',
        },
      ],
    },
    km: {
      duration: '12 នាទី',
      objectives: [
        'ប្រើ switch, រង្វិលជុំ while/do-while និង short-circuit boolean guards យ៉ាងស្អាត',
        'ការពារកំហុស fall-through ក្នុង switch ដោយដាក់ break ឬ return ច្បាស់លាស់',
        'បំបែក function prototype ពីនិយមន័យអនុគមន៍ និងយល់ពីគោលការណ៍ pass-by-value ក្នុង C',
        'គ្រប់គ្រងវិសាលភាព និងអាយុកាលអថេរ/អនុគមន៍ដោយប្រើពាក្យ static',
      ],
      extraSections: [
        {
          id: 'switch-short-circuit-and-loops',
          heading: 'switch, do-while និង Short-Circuit Guards',
          body: [
            'នៅពេលជ្រើសរើសផ្លូវតាមតម្លៃលេខគត់ ឬតួអក្សរជាក់លាក់ (ដូចជា command ឬ state machine) switch ងាយអានជាង if/else វែងៗ និងច្រើនតែ compile ទៅជា jump table ដែលលឿន។ ត្រូវដាក់ default: ជានិច្ចដើម្បីគ្រប់គ្រងតម្លៃមិនរំពឹងទុក។',
            'C វាយតម្លៃ && និង || ពីឆ្វេងទៅស្ដាំ ហើយឈប់ភ្លាមៗពេលដឹងលទ្ធផល (short-circuit)។ នេះមានសារៈសំខាន់ខ្លាំងសម្រាប់សុវត្ថិភាព៖ if (divisor != 0 && total / divisor > 5) ធានាថាការចែកនឹងសូន្យមិនកើតឡើងឡើយ។',
          ],
          points: [
            'ប្រើ while ពេលរង្វិលជុំអាចមិនដំណើរការសោះ និងប្រើ do { ... } while (cond); ពេលត្រូវការដំណើរការយ៉ាងតិចម្ដង។',
            '&& រំលងផ្នែកស្ដាំបើផ្នែកឆ្វេងមិនពិត ចំណែក || រំលងផ្នែកស្ដាំបើផ្នែកឆ្វេងពិត។',
            'ប្រើ break ដើម្បីចេញពីរង្វិលជុំ ឬ switch ខាងក្នុងបំផុត និង continue ដើម្បីរំលងទៅជុំបន្ទាប់។',
            'ប្រកាសអថេររាប់ក្នុងក្បាល for (for (int i = 0; i < n; i++)) ដើម្បីកុំឱ្យវាលេចចេញក្រៅប្លុក។',
          ],
          table: {
            headers: ['រចនាសម្ព័ន្ធ', 'ពេលពិនិត្យលក្ខខណ្ឌ', 'ការប្រើប្រាស់ល្អបំផុត'],
            rows: [
              ['if / else if', 'មុនផ្លូវនីមួយៗ', 'ដែនតម្លៃ និងលក្ខខណ្ឌតក្កវិជ្ជាចម្រុះ'],
              ['switch / case', 'លោតតាម int/char/enum', 'State machines, ការបែងចែក command'],
              ['for (init; cond; step)', 'មុនជុំនីមួយៗ', 'រង្វិលជុំដឹងចំនួន និងការដើរលើ array'],
              ['while (cond)', 'មុនជុំនីមួយៗ', 'រង្វិលជុំតាមលក្ខខណ្ឌ, GCD, ការអានទិន្នន័យ'],
              ['do { } while (cond);', 'ក្រោយជុំនីមួយៗ', 'ការសួរ/ព្យាយាមម្ដងទៀតយ៉ាងតិច 1 ដង'],
            ],
          },
          exampleTitle: 'ការបែងចែក Command ដោយ switch និងរង្វិលជុំគណនា GCD',
          warning:
            'ការភ្លេចដាក់ break; នៅចុង case នៃ switch ធ្វើឱ្យកម្មវិធីធ្លាក់បន្តទៅដំណើរការ case បន្ទាប់ដោយស្ងាត់ៗ! ត្រូវបញ្ចប់រាល់ case ដោយ break; ឬ return; ជានិច្ច។',
        },
        {
          id: 'prototypes-pass-by-value-and-static',
          heading: 'Prototypes, Pass-by-Value និងពាក្យគន្លឹះ static',
          body: [
            'រាល់ប៉ារ៉ាម៉ែត្រក្នុង C ត្រូវបានបញ្ជូនតាមតម្លៃ (pass-by-value)៖ អនុគមន៍ទទួលបានច្បាប់ចម្លងប៉ុណ្ណោះ ដូច្នេះការកែប៉ារ៉ាម៉ែត្រខាងក្នុងមិនប៉ះពាល់អថេរដើមរបស់អ្នកហៅឡើយ (លុះត្រាតែបញ្ជូន pointer)។ ការប្រកាស prototype លើ main() អនុញ្ញាតឱ្យអ្នកសរសេរកូដអនុគមន៍នៅខាងក្រោម main() យ៉ាងមានរបៀប។',
            'ពាក្យ static មានតួនាទីសំខាន់ពីរ៖ នៅលើអនុគមន៍កម្រិតឯកសារ វាកំណត់ឱ្យអនុគមន៍នោះប្រើបានតែក្នុងឯកសារ .c តែមួយ (internal linkage) ចំណែកនៅលើអថេរក្នុងអនុគមន៍ វារក្សាតម្លៃទុកឆ្លងការហៅអនុគមន៍។',
          ],
          points: [
            'សរសេរ int main(void) (មិនមែន int main()) ក្នុង C ដើម្បីបញ្ជាក់ច្បាស់ថាគ្មានប៉ារ៉ាម៉ែត្រ។',
            'ដាក់ static លើអនុគមន៍ជំនួយផ្ទៃក្នុង ដើម្បីកុំឱ្យជាន់ឈ្មោះជាមួយឯកសារ .c ផ្សេងពេល link។',
            'ជៀសវាងអថេរ static ក្នុងអនុគមន៍ដែលអាចកែប្រែបានក្នុងកម្មវិធី multithreaded ព្រោះវាមិន thread-safe ទេ។',
          ],
          exampleTitle: 'Prototype, Pass-by-Value និងអនុគមន៍ជំនួយ static',
          tip: 'រក្សាអនុគមន៍ឱ្យខ្លី និងធ្វើការងារតែមួយ—ការ return ឆាប់ពេលជួបទិន្នន័យមិនត្រឹមត្រូវជួយជៀសវាង if/else ត្រួតគ្នាជ្រៅពេក។',
        },
      ],
      challenge: {
        prompt:
          'ប្រកាស prototype int is_prime(int n); នៅពីលើ main() សរសេរកូដវានៅក្រោម main() (ត្រឡប់ 1 បើជាលេខបឋម និង 0 បើមិនមែន) រួចបង្ហាញលេខបឋមទាំងអស់ពី 2 ដល់ 20។',
        hint: 'ត្រឡប់ 0 បើ n < 2។ ប្រើរង្វិលជុំ for (int d = 2; d * d <= n; d++) ហើយត្រឡប់ 0 បើ n % d == 0 បើមិនដូច្នោះត្រឡប់ 1។',
      },
      quiz: [
        {
          question: 'តើមានអ្វីកើតឡើងក្នុង C ប្រសិនបើ case ក្នុង switch ភ្លេចដាក់ break; មុន case បន្ទាប់?',
          options: [
            'Compiler តែងតែបដិសេធកូដជា syntax error',
            'កម្មវិធីចេញពីប្លុក switch ដោយស្វ័យប្រវត្តិ',
            'កម្មវិធីធ្លាក់បន្តទៅដំណើរការកូដក្នុង case បន្ទាប់ផងដែរ (fall-through)',
            'កម្មវិធីលោតទៅ default:',
          ],
          answer: 2,
          explanation:
            'ក្នុងភាសា C ប្លុក case នឹងបន្តដំណើរការចុះក្រោម (fall-through) រហូតដល់ជួប break;, return; ឬចុងបញ្ចប់នៃ switch។',
        },
        {
          question: 'តើការដាក់ពាក្យ static នៅពីមុខអនុគមន៍ជំនួយក្នុងឯកសារ .c មានតួនាទីអ្វី?',
          options: [
            'ធ្វើឱ្យអនុគមន៍ដើរលឿនជាងមុនលើ heap',
            'កំណត់វិសាលភាពឱ្យអនុគមន៍នោះមើលឃើញ និងហៅបានតែក្នុងឯកសារ .c តែមួយនោះប៉ុណ្ណោះ',
            'ហាមមិនឱ្យអនុគមន៍ទទួលប៉ារ៉ាម៉ែត្រ',
            'រក្សាទុកលទ្ធផល cache ដោយស្វ័យប្រវត្តិ',
          ],
          answer: 1,
          explanation:
            'static កម្រិតឯកសារផ្ដល់ internal linkage លាក់អនុគមន៍នោះពីឯកសារ .c ផ្សេង និងការពារការជាន់ឈ្មោះពេល link។',
        },
      ],
    },
  },

  'c/pointers-and-memory': {
    en: {
      duration: '14 min',
      objectives: [
        'Use pointer arithmetic accurately knowing each increment scales by sizeof(*ptr)',
        'Distinguish const int *p (read-only data) from int *const p (fixed pointer)',
        'Avoid dangling pointers by never returning the address of local stack variables',
        'Pass generic callbacks via function pointers (such as qsort comparators)',
      ],
      extraSections: [
        {
          id: 'pointer-arithmetic-and-const',
          heading: 'Pointer Arithmetic & const Correctness',
          body: [
            'Pointer arithmetic is type-aware: if p is an int * pointing to address 0x1000 on a system where sizeof(int) == 4, then p + 1 points to 0x1004—the very next int in memory, NOT one byte forward. In fact, C defines array indexing arr[i] strictly as *(arr + i).',
            'Adding const to pointers documents intent and lets the compiler prevent accidental writes. Read declarations from right to left: const int *p is a mutable pointer to a constant int (you cannot do *p = 5), while int *const p is a constant pointer to a mutable int (you cannot reassign p itself).',
          ],
          points: [
            'Pointer subtraction (end - start) returns ptrdiff_t: the number of elements (not bytes) between two pointers into the same array.',
            'Print raw pointer addresses with %p and cast to (const void *) for strict standard compliance.',
            'Use const T * on every read-only pointer parameter so callers know your function will not mutate their data.',
            'void * can hold any object address, but you must cast it back to a typed pointer before dereferencing.',
          ],
          table: {
            headers: ['Declaration', 'Read Right-to-Left', 'Can Mutate *p?', 'Can Reassign p?'],
            rows: [
              ['int *p', 'Pointer to int', 'Yes', 'Yes'],
              ['const int *p', 'Pointer to const int', 'No', 'Yes'],
              ['int *const p', 'Const pointer to int', 'Yes', 'No'],
              ['const int *const p', 'Const pointer to const int', 'No', 'No'],
            ],
          },
          example: {
            title: 'Traversing Memory with Pointer Arithmetic',
            language: 'c',
            code: `#include <stdio.h>

int main(void) {
    int vals[] = {10, 20, 30, 40};
    const int *p = vals;
    const int *end = vals + 4;

    while (p < end) {
        printf("index=%td value=%d\\n", p - vals, *p);
        p++;  // Advances by sizeof(int) = 4 bytes
    }
    return 0;
}`,
            output: `index=0 value=10
index=1 value=20
index=2 value=30
index=3 value=40`,
          },
          warning:
            'Never return the address of a local variable (int x = 5; return &x;). Local variables live on the function’s stack frame, which is reclaimed the moment the function returns—dereferencing that dangling pointer is Undefined Behavior.',
        },
        {
          id: 'out-params-and-function-pointers',
          heading: 'Stack vs Heap Layout, Out-Parameters & Function Pointers',
          body: [
            'A running C process divides memory into segments: code (text), globals/statics (data/BSS), the heap (growing dynamically via malloc/free), and the stack (fast automatic storage for local variables and function calls). Passing pointers to stack variables lets a function return multiple results cleanly through out-parameters.',
            'Pointers can also point to executable functions! Function pointers power pluggable callbacks and standard library algorithms like qsort(), where you supply a comparator matching int (*cmp)(const void *, const void *).',
          ],
          points: [
            'Check out-pointer parameters for NULL before writing to them in public APIs.',
            'In qsort comparators, avoid returning a - b directly—large signed differences can overflow int. Use (va > vb) - (va < vb) instead.',
            'Stack allocation is fast and automatic, but limited in size (~1–8 MB); use the heap for large or runtime-sized buffers.',
          ],
          example: {
            title: 'Sorting with Function Pointer Callback (qsort)',
            language: 'c',
            code: `#include <stdio.h>
#include <stdlib.h>

static int cmp_int_asc(const void *a, const void *b) {
    int lhs = *(const int *)a;
    int rhs = *(const int *)b;
    return (lhs > rhs) - (lhs < rhs);
}

int main(void) {
    int nums[] = {42, 7, 19, 3, 25};
    size_t n = sizeof(nums) / sizeof(nums[0]);

    qsort(nums, n, sizeof(int), cmp_int_asc);
    for (size_t i = 0; i < n; i++) {
        printf("%d ", nums[i]);
    }
    printf("\\n");
    return 0;
}`,
            output: `3 7 19 25 42 `,
          },
          tip: 'Use typedef for complex function pointer types (typedef int (*Comparator)(const void *, const void *);) so signatures stay readable.',
        },
      ],
      challenge: {
        prompt:
          'Write void min_max(const int *arr, size_t len, int *out_min, int *out_max) that finds both the smallest and largest value in arr in a single pass and stores them through the out-pointers.',
        hint: 'Guard against len == 0 || arr == NULL || out_min == NULL || out_max == NULL. Initialize *out_min = *out_max = arr[0]; then loop from i = 1 to len - 1.',
        language: 'c',
        solutionCode: `#include <stdio.h>

void min_max(const int *arr, size_t len, int *out_min, int *out_max) {
    if (arr == NULL || len == 0 || out_min == NULL || out_max == NULL) return;
    int lo = arr[0], hi = arr[0];
    for (size_t i = 1; i < len; i++) {
        if (arr[i] < lo) lo = arr[i];
        if (arr[i] > hi) hi = arr[i];
    }
    *out_min = lo;
    *out_max = hi;
}

int main(void) {
    int data[] = {14, -3, 29, 8, 2};
    int lo = 0, hi = 0;
    min_max(data, 5, &lo, &hi);
    printf("min=%d, max=%d\\n", lo, hi);
    return 0;
}`,
      },
      quiz: [
        {
          question: 'If int *p points to address 0x1000 and sizeof(int) is 4, what address does p + 2 represent?',
          options: ['0x1002', '0x1004', '0x1008', '0x1010'],
          answer: 2,
          explanation:
            'Pointer arithmetic scales by sizeof(*p): 2 * 4 bytes = 8 bytes, so 0x1000 + 8 = 0x1008.',
        },
        {
          question: 'Why is returning &local_var from a C function dangerous?',
          options: [
            'It causes a compile-time syntax error',
            'The local variable’s stack frame is destroyed on return, leaving a dangling pointer and Undefined Behavior',
            'Stack variables cannot have their address taken with &',
            'It leaks heap memory',
          ],
          answer: 1,
          explanation:
            'Automatic local variables only live until the function returns; pointing to reclaimed stack memory creates a dangling pointer.',
        },
      ],
    },
    km: {
      duration: '14 នាទី',
      objectives: [
        'ប្រើ pointer arithmetic បានត្រឹមត្រូវដោយយល់ថាការបូក 1 លោតតាមទំហំ sizeof(*ptr)',
        'ញែកឱ្យដាច់រវាង const int *p (ទិន្នន័យអានតែប៉ុណ្ណោះ) និង int *const p (pointer ថេរ)',
        'ជៀសវាង dangling pointers ដោយមិនត្រឡប់អាសយដ្ឋានរបស់អថេរក្នុង stack',
        'បញ្ជូន callback តាម function pointers (ដូចជា comparator សម្រាប់ qsort)',
      ],
      extraSections: [
        {
          id: 'pointer-arithmetic-and-const',
          heading: 'Pointer Arithmetic និងការប្រើ const ត្រឹមត្រូវ',
          body: [
            'Pointer arithmetic ស្គាល់ទំហំប្រភេទទិន្នន័យ៖ ប្រសិនបើ p ជា int * ចង្អុលទៅ 0x1000 ហើយ sizeof(int) == 4 នោះ p + 1 នឹងចង្អុលទៅ 0x1004 (ធាតុ int បន្ទាប់) មិនមែនលោតតែ 1 បៃឡើយ។ តាមពិត arr[i] ក្នុង C មានន័យដូចគ្នាបេះបិទនឹង *(arr + i)។',
            'ការបន្ថែម const លើ pointer ជួយឱ្យ compiler ការពារការកែទិន្នន័យដោយអចេតនា។ អានការប្រកាសពីស្ដាំទៅឆ្វេង៖ const int *p ជា pointer ចង្អុលទៅ const int (មិនអាចកែ *p) ចំណែក int *const p ជា const pointer ចង្អុលទៅ int (មិនអាចប្ដូរ p ទៅចង្អុលកន្លែងផ្សេង)។',
          ],
          points: [
            'ផលដក pointer (end - start) ត្រឡប់ ptrdiff_t ជាចំនួនធាតុ (មិនមែនចំនួនបៃ) រវាង pointer ទាំងពីរក្នុង array តែមួយ។',
            'បង្ហាញអាសយដ្ឋាន pointer ដោយ %p ហើយ cast ទៅ (const void *)។',
            'ប្រើ const T * សម្រាប់ប៉ារ៉ាម៉ែត្រ pointer ដែលអានតែប៉ុណ្ណោះ ដើម្បីការពារទិន្នន័យអ្នកហៅ។',
            'void * អាចផ្ទុកអាសយដ្ឋានគ្រប់ប្រភេទ ប៉ុន្តែត្រូវ cast ត្រឡប់ទៅប្រភេទដើមមុនពេល dereference។',
          ],
          table: {
            headers: ['ការប្រកាស', 'អានពីស្ដាំទៅឆ្វេង', 'អាចកែ *p?', 'អាចប្ដូរ p?'],
            rows: [
              ['int *p', 'Pointer ទៅ int', 'បាន', 'បាន'],
              ['const int *p', 'Pointer ទៅ const int', 'មិនបាន', 'បាន'],
              ['int *const p', 'Const pointer ទៅ int', 'បាន', 'មិនបាន'],
              ['const int *const p', 'Const pointer ទៅ const int', 'មិនបាន', 'មិនបាន'],
            ],
          },
          exampleTitle: 'ការដើរលើអង្គចងចាំដោយ Pointer Arithmetic',
          warning:
            'កុំត្រឡប់អាសយដ្ឋានរបស់អថេរក្នុងអនុគមន៍ (int x = 5; return &x;) ជាដាច់ខាត! អថេរក្នុងអនុគមន៍ស្ថិតលើ stack ដែលត្រូវបានលុបភ្លាមៗពេលអនុគមន៍បញ្ចប់—ការប្រើ dangling pointer នោះគឺជា Undefined Behavior។',
        },
        {
          id: 'out-params-and-function-pointers',
          heading: 'Stack ធៀបនឹង Heap, Out-Parameters និង Function Pointers',
          body: [
            'កម្មវិធី C បែងចែកអង្គចងចាំជាផ្នែក៖ កូដ (text), អថេរសកល/static (data/BSS), heap (malloc/free) និង stack (អថេរក្នុងអនុគមន៍)។ ការបញ្ជូន pointer ជា out-parameter អនុញ្ញាតឱ្យអនុគមន៍ត្រឡប់លទ្ធផលច្រើនក្នុងពេលតែមួយយ៉ាងស្អាត។',
            'Pointer ក៏អាចចង្អុលទៅអនុគមន៍ផងដែរ! Function pointers ប្រើសម្រាប់ callback និងអនុគមន៍ស្តង់ដារដូចជា qsort() ដែលទទួល comparator ទម្រង់ int (*cmp)(const void *, const void *)។',
          ],
          points: [
            'ពិនិត្យ NULL លើប៉ារ៉ាម៉ែត្រ out-pointer មុនពេលសរសេរតម្លៃចូល។',
            'ក្នុង comparator របស់ qsort កុំប្រើ return a - b ផ្ទាល់ ព្រោះលេខធំអាច overflow—ត្រូវប្រើ (lhs > rhs) - (lhs < rhs) ជំនួស។',
            'Stack លឿន និងស្វ័យប្រវត្តិ ប៉ុន្តែមានទំហំកំណត់ (~1–8 MB); ប្រើ heap សម្រាប់ទិន្នន័យធំ ឬទំហំប្រែប្រួល។',
          ],
          exampleTitle: 'ការតម្រៀបដោយ Function Pointer Callback (qsort)',
          tip: 'ប្រើ typedef សម្រាប់ប្រភេទ function pointer ស្មុគស្មាញ ដើម្បីឱ្យហត្ថលេខាអនុគមន៍ងាយអាន។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ void min_max(const int *arr, size_t len, int *out_min, int *out_max) ដែលរកតម្លៃតូចបំផុត និងធំបំផុតក្នុង arr ក្នុងរង្វិលជុំតែមួយ ហើយរក្សាទុកតាមរយៈ out-pointers។',
        hint: 'ពិនិត្យលក្ខខណ្ឌ arr == NULL || len == 0 || out_min == NULL || out_max == NULL មុន។ កំណត់ lo = hi = arr[0]; រួចរត់រង្វិលជុំពី i = 1 ដល់ len - 1។',
      },
      quiz: [
        {
          question: 'ប្រសិនបើ int *p ចង្អុលទៅអាសយដ្ឋាន 0x1000 ហើយ sizeof(int) ស្មើ 4 តើ p + 2 ចង្អុលទៅអាសយដ្ឋានណា?',
          options: ['0x1002', '0x1004', '0x1008', '0x1010'],
          answer: 2,
          explanation:
            'Pointer arithmetic គុណនឹង sizeof(*p)៖ 2 * 4 bytes = 8 bytes ដូច្នេះ 0x1000 + 8 = 0x1008។',
        },
        {
          question: 'ហេតុអ្វីបានជាការត្រឡប់ &local_var ពីអនុគមន៍ C មានគ្រោះថ្នាក់?',
          options: [
            'វាបង្កកំហុស syntax ពេល compile',
            'Stack frame របស់អថេរនោះត្រូវបានលុបពេលអនុគមន៍បញ្ចប់ បន្សល់ទុក dangling pointer និង Undefined Behavior',
            'អថេរលើ stack មិនអាចយកអាសយដ្ឋានដោយ & បានទេ',
            'វាបង្ក memory leak លើ heap',
          ],
          answer: 1,
          explanation:
            'អថេរក្នុងអនុគមន៍មានជីវិតតែរហូតដល់អនុគមន៍ return ប៉ុណ្ណោះ ដូច្នេះការចង្អុលទៅអង្គចងចាំ stack ដែលត្រូវបានដោះលែងគឺជា dangling pointer។',
        },
      ],
    },
  },

  'c/arrays-and-strings': {
    en: {
      duration: '13 min',
      objectives: [
        'Explain array-to-pointer decay and why sizeof(arr) fails inside function parameters',
        'Compare and copy C strings safely with strcmp(), snprintf(), and memcpy()',
        'Prevent buffer overflows and off-by-one null-terminator (\\0) mistakes',
        'Distinguish read-only string literals (const char *) from mutable char arrays',
      ],
      extraSections: [
        {
          id: 'array-decay-and-string-functions',
          heading: 'Array Decay, sizeof Trap & Safe <string.h>',
          body: [
            'When you pass a C array to a function, it decays into a pointer to its first element—the function receives only an address, NOT the array length! That is why sizeof(arr) / sizeof(arr[0]) works in the scope where the array was declared, but inside a function parameter int arr[], sizeof(arr) returns sizeof(int *) (8 bytes on 64-bit), causing silent truncation bugs.',
            'C strings have no built-in == or + operators. Writing s1 == s2 compares two pointer addresses rather than the characters inside them. Always use strcmp(s1, s2) == 0 for equality, and remember strlen(s) scans linearly in O(n) up to the terminating \\0 (not counting \\0 itself).',
          ],
          points: [
            'Always pass (const T *arr, size_t len) together whenever a function accepts an array.',
            'Avoid gets() (removed from C11) and raw strcpy()/strcat()—they ignore destination buffer bounds.',
            'snprintf(dst, sizeof(dst), "%s", src) always null-terminates and never writes past dst.',
            'strcmp(a, b) returns 0 when equal, < 0 if a < b, and > 0 if a > b.',
          ],
          table: {
            headers: ['Function (<string.h> / <stdio.h>)', 'Purpose', 'Safety Note'],
            rows: [
              ['strlen(s)', 'Length excluding \\0', 'O(n) scan; s must be null-terminated'],
              ['strcmp(a, b)', 'Lexicographical compare', 'Returns 0 on exact match'],
              ['snprintf(buf, n, fmt, ...)', 'Bounded formatted string', 'Always writes \\0 when n > 0'],
              ['memcpy(dst, src, n)', 'Copy n raw bytes', 'Buffers must not overlap (else memmove)'],
              ['strchr(s, ch)', 'Find first occurrence of ch', 'Returns pointer or NULL'],
            ],
          },
          example: {
            title: 'Array Decay Check & Safe String Comparison',
            language: 'c',
            code: `#include <stdio.h>
#include <string.h>

void show_param_size(const int arr[]) {
    printf("Inside function sizeof(arr) = %zu (pointer size!)\\n", sizeof(arr));
}

int main(void) {
    int scores[5] = {10, 20, 30, 40, 50};
    printf("In main sizeof(scores)      = %zu (%zu elements)\\n",
           sizeof(scores), sizeof(scores) / sizeof(scores[0]));
    show_param_size(scores);

    char input[] = "admin";
    if (strcmp(input, "admin") == 0) {
        printf("Role matched with strcmp!\\n");
    }
    return 0;
}`,
            output: `In main sizeof(scores)      = 20 (5 elements)
Inside function sizeof(arr) = 8 (pointer size!)
Role matched with strcmp!`,
          },
          warning:
            'Comparing two C strings with if (a == b) compares memory addresses—two identical strings in different buffers will evaluate to false! Always use strcmp(a, b) == 0. Also reserve len + 1 bytes whenever storing a string so \\0 fits inside the buffer.',
        },
        {
          id: 'safe-buffers-and-string-literals',
          heading: 'Mutable Buffers vs Read-Only String Literals',
          body: [
            'There is a critical memory difference between const char *s = "hello"; and char buf[] = "hello";. The pointer s points into read-only static memory—attempting s[0] = \'H\' triggers Undefined Behavior (usually an instant segmentation fault). In contrast, char buf[] allocates a writable 6-byte copy on the stack (5 letters + \\0).',
            'When formatting or concatenating text into fixed buffers, snprintf() is your safest Swiss Army knife: pass sizeof(buf) as the limit and check the return value to detect whether the output was truncated.',
          ],
          points: [
            'Always type string-literal pointers as const char * so the compiler catches illegal writes.',
            'Buffer size for N characters must be at least N + 1 bytes to hold the trailing \\0.',
            '2D arrays (int grid[ROWS][COLS]) are laid out contiguously in row-major order—loop rows in the outer loop and columns in the inner loop for best CPU cache performance.',
          ],
          example: {
            title: 'Bounded Formatting with snprintf & Truncation Check',
            language: 'c',
            code: `#include <stdio.h>

int main(void) {
    char msg[24];
    const char *user = "Sokha";
    int score = 95;

    int needed = snprintf(msg, sizeof(msg), "%s scored %d/100", user, score);
    printf("Buffer: \\"%s\\" (needed=%d, cap=%zu)\\n", msg, needed, sizeof(msg));
    if (needed >= (int)sizeof(msg)) {
        printf("Warning: output was truncated!\\n");
    }
    return 0;
}`,
            output: `Buffer: "Sokha scored 95/100" (needed=19, cap=24)`,
          },
          tip: 'Prefer snprintf() over strncpy()—strncpy() does NOT guarantee a null terminator when the source fills the buffer, whereas snprintf() always null-terminates.',
        },
      ],
      challenge: {
        prompt:
          'Write void reverse_str(char *s) that reverses a mutable null-terminated C string in place (without allocating another buffer), and test it on char word[] = "CodeHub";.',
        hint: 'Check if (s == NULL) return;. Use size_t left = 0, right = strlen(s); if (right == 0) return; right--; then swap s[left++] and s[right--] while left < right.',
        language: 'c',
        solutionCode: `#include <stdio.h>
#include <string.h>

void reverse_str(char *s) {
    if (s == NULL) return;
    size_t len = strlen(s);
    if (len < 2) return;
    for (size_t i = 0, j = len - 1; i < j; i++, j--) {
        char tmp = s[i];
        s[i] = s[j];
        s[j] = tmp;
    }
}

int main(void) {
    char word[] = "CodeHub";
    reverse_str(word);
    printf("Reversed: %s\\n", word);
    return 0;
}`,
      },
      quiz: [
        {
          question: 'Why does sizeof(arr) / sizeof(arr[0]) give the wrong count inside void process(int arr[])?',
          options: [
            'sizeof cannot be used inside helper functions',
            'Array parameters decay to a pointer (int *), so sizeof(arr) returns the pointer size (e.g., 8 bytes) instead of the array’s total size',
            'C arrays lose their elements when passed to a function',
            'sizeof only works on char arrays',
          ],
          answer: 1,
          explanation:
            'In function parameter lists, int arr[] is identical to int *arr. Always pass the element count as a separate size_t len parameter.',
        },
        {
          question: 'How should you check if two C strings a and b contain identical characters?',
          options: ['a == b', 'strcmp(a, b) == 0', 'strcmp(a, b) == 1', 'strlen(a) == strlen(b)'],
          answer: 1,
          explanation:
            'strcmp(a, b) compares characters lexicographically and returns 0 when both strings are identical.',
        },
      ],
    },
    km: {
      duration: '13 នាទី',
      objectives: [
        'ពន្យល់ពី array-to-pointer decay និងមូលហេតុដែល sizeof(arr) មិនដំណើរការត្រឹមត្រូវក្នុងប៉ារ៉ាម៉ែត្រអនុគមន៍',
        'ប្រៀបធៀប និងចម្លង C strings ដោយសុវត្ថិភាពជាមួយ strcmp(), snprintf() និង memcpy()',
        'ការពារ buffer overflow និងកំហុសភ្លេចបន្ថែម 1 បៃសម្រាប់ null terminator (\\0)',
        'ញែកឱ្យដាច់រវាង string literals អានតែប៉ុណ្ណោះ (const char *) និង mutable char arrays',
      ],
      extraSections: [
        {
          id: 'array-decay-and-string-functions',
          heading: 'Array Decay, អន្ទាក់ sizeof និង <string.h> សុវត្ថិភាព',
          body: [
            'នៅពេលអ្នកបញ្ជូន array ទៅអនុគមន៍ វានឹងបំប្លែង (decay) ទៅជា pointer ចង្អុលទៅធាតុដំបូងប៉ុណ្ណោះ—អនុគមន៍មិនដឹងប្រវែង array ឡើយ! ដូច្នេះ sizeof(arr) / sizeof(arr[0]) ប្រើបានតែក្នុង scope ដែលប្រកាស array ប៉ុន្តែនៅក្នុងអនុគមន៍ sizeof(arr) ត្រឡប់ទំហំ pointer (8 bytes លើ 64-bit)។',
            'C strings គ្មានប្រមាណវិធី == ឬ + សម្រាប់អត្ថបទទេ។ ការសរសេរ s1 == s2 ប្រៀបធៀបតែអាសយដ្ឋានអង្គចងចាំ មិនមែនតួអក្សរឡើយ។ ត្រូវប្រើ strcmp(s1, s2) == 0 ជានិច្ច ហើយចាំថា strlen(s) ដើររាប់ O(n) រហូតដល់ \\0។',
          ],
          points: [
            'បញ្ជូន (const T *arr, size_t len) ជាគូជានិច្ចនៅពេលអនុគមន៍ទទួល array។',
            'ជៀសវាង gets() និង strcpy()/strcat() ដែលគ្មានដែនកំណត់ទំហំ buffer។',
            'snprintf(dst, sizeof(dst), "%s", src) តែងតែដាក់ \\0 នៅចុង និងមិនសរសេរលើសទំហំ dst ឡើយ។',
            'strcmp(a, b) ត្រឡប់ 0 ពេលដូចគ្នា, < 0 បើ a < b និង > 0 បើ a > b។',
          ],
          table: {
            headers: ['អនុគមន៍ (<string.h> / <stdio.h>)', 'តួនាទី', 'កំណត់ចំណាំសុវត្ថិភាព'],
            rows: [
              ['strlen(s)', 'ប្រវែងមិនរាប់ \\0', 'ស្កេន O(n); s ត្រូវតែមាន \\0'],
              ['strcmp(a, b)', 'ប្រៀបធៀបអត្ថបទ', 'ត្រឡប់ 0 ពេលដូចគ្នាបេះបិទ'],
              ['snprintf(buf, n, fmt, ...)', 'បង្កើតអត្ថបទមានដែនកំណត់', 'តែងតែដាក់ \\0 ពេល n > 0'],
              ['memcpy(dst, src, n)', 'ចម្លងទិន្នន័យ n បៃ', 'អង្គចងចាំមិនត្រូវត្រួតគ្នា (បើត្រួតប្រើ memmove)'],
              ['strchr(s, ch)', 'ស្វែងរកតួអក្សរ ch ដំបូង', 'ត្រឡប់ pointer ឬ NULL'],
            ],
          },
          exampleTitle: 'ការពិនិត្យ Array Decay និងការប្រៀបធៀប String ដោយ strcmp',
          warning:
            'ការប្រៀបធៀប C strings ដោយ if (a == b) ប្រៀបធៀបតែអាសយដ្ឋានអង្គចងចាំ—អត្ថបទដូចគ្នាក្នុង buffer ពីរផ្សេងគ្នានឹងផ្ដល់លទ្ធផល false! ត្រូវប្រើ strcmp(a, b) == 0 ជានិច្ច ហើយទុក +1 បៃសម្រាប់ \\0។',
        },
        {
          id: 'safe-buffers-and-string-literals',
          heading: 'Mutable Buffers ធៀបនឹង Read-Only String Literals',
          body: [
            'មានភាពខុសគ្នាសំខាន់រវាង const char *s = "hello"; និង char buf[] = "hello";។ Pointer s ចង្អុលទៅអង្គចងចាំអានតែប៉ុណ្ណោះ—ការព្យាយាមកែ s[0] = \'H\' បង្ក Undefined Behavior (ច្រើនតែ crash segmentation fault)។ ចំណែក char buf[] ចម្លង 6 បៃ (5 អក្សរ + \\0) លើ stack ដែលអាចកែប្រែបាន។',
            'ពេលរៀបចំអត្ថបទចូល buffer ទំហំថេរ snprintf() ជាឧបករណ៍សុវត្ថិភាពបំផុត៖ បញ្ជូន sizeof(buf) ជាដែនកំណត់ និងពិនិត្យតម្លៃត្រឡប់ដើម្បីដឹងថាអត្ថបទត្រូវបានកាត់ខ្លីឬអត់។',
          ],
          points: [
            'ប្រកាស pointer ទៅ string literal ជា const char * ជានិច្ច ដើម្បីឱ្យ compiler រារាំងការសរសេរខុស។',
            'ទំហំ buffer សម្រាប់ N តួអក្សរត្រូវមានយ៉ាងតិច N + 1 បៃ ដើម្បីផ្ទុក \\0។',
            'Array 2D (int grid[ROWS][COLS]) រក្សាទុកតាមជួរដេក (row-major) ដូច្នេះរត់រង្វិលជុំ row ខាងក្រៅ និង col ខាងក្នុងដើម្បីល្បឿន CPU cache ល្អបំផុត។',
          ],
          exampleTitle: 'ការរៀបចំអត្ថបទមានសុវត្ថិភាពជាមួយ snprintf',
          tip: 'ប្រើ snprintf() ជំនួស strncpy()—strncpy() មិនធានាការដាក់ \\0 ពេលអត្ថបទពេញ buffer ឡើយ ប៉ុន្តែ snprintf() តែងតែដាក់ \\0។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ void reverse_str(char *s) ដែលបញ្ច្រាស mutable C string នៅនឹងកន្លែង (ដោយមិនបង្កើត buffer ថ្មី) ហើយសាកល្បងលើ char word[] = "CodeHub";។',
        hint: 'ពិនិត្យ if (s == NULL) return; រកប្រវែងដោយ strlen(s) រួចប្រើសន្ទស្សន៍ពីរដើរពីឆ្វេង និងស្ដាំចូលកណ្ដាលដើម្បីប្ដូរតួអក្សរគ្នា។',
      },
      quiz: [
        {
          question: 'ហេតុអ្វី sizeof(arr) / sizeof(arr[0]) ផ្ដល់ចំនួនខុសនៅខាងក្នុង void process(int arr[])?',
          options: [
            'sizeof មិនអាចប្រើក្នុងអនុគមន៍ជំនួយបានទេ',
            'ប៉ារ៉ាម៉ែត្រ array ត្រូវបាន decay ជា pointer (int *) ដូច្នេះ sizeof(arr) ត្រឡប់ទំហំ pointer (ឧ. 8 bytes) ជំនួសឱ្យទំហំ array ទាំងមូល',
            'Array បាត់បង់ធាតុពេលបញ្ជូនទៅអនុគមន៍',
            'sizeof ប្រើបានតែលើ char array',
          ],
          answer: 1,
          explanation:
            'ក្នុងបញ្ជីប៉ារ៉ាម៉ែត្រ int arr[] ដូចគ្នានឹង int *arr។ ត្រូវបញ្ជូនប្រវែង array ជាប៉ារ៉ាម៉ែត្រ size_t len ដាច់ដោយឡែកជានិច្ច។',
        },
        {
          question: 'តើត្រូវពិនិត្យយ៉ាងដូចម្ដេចថា C strings a និង b មានតួអក្សរដូចគ្នា?',
          options: ['a == b', 'strcmp(a, b) == 0', 'strcmp(a, b) == 1', 'strlen(a) == strlen(b)'],
          answer: 1,
          explanation:
            'strcmp(a, b) ប្រៀបធៀបតួអក្សរម្ដងមួយៗ ហើយត្រឡប់ 0 នៅពេលអត្ថបទទាំងពីរដូចគ្នាបេះបិទ។',
        },
      ],
    },
  },

  'c/structs-and-malloc': {
    en: {
      duration: '14 min',
      objectives: [
        'Choose properly between malloc(), calloc(), and realloc() for heap buffers',
        'Resize heap memory safely with realloc() using a temporary pointer to avoid memory leaks',
        'Prevent use-after-free, double-free, and leaked heap allocations',
        'Understand struct memory alignment/padding and pass structs efficiently by const pointer',
      ],
      extraSections: [
        {
          id: 'calloc-realloc-and-dynamic-arrays',
          heading: 'malloc vs calloc vs Safe realloc()',
          body: [
            'malloc(bytes) allocates uninitialized heap memory—fast, but reading it before writing is Undefined Behavior. calloc(count, elem_size) both zeroes every byte and checks for multiplication overflow (count * elem_size), making it safer for zero-initialized arrays of structs or counters.',
            'When a dynamic array runs out of capacity, realloc(ptr, new_bytes) grows (or relocates) the block while preserving existing contents. However, if the OS is out of memory, realloc() returns NULL while leaving the original block allocated—so assigning directly back to ptr overwrites your only reference to the original memory, leaking it permanently.',
          ],
          points: [
            'Write sizeof(*ptr) instead of sizeof(Type) in malloc(n * sizeof(*ptr)) so refactoring the type cannot break allocation size.',
            'Always store realloc() in a temporary pointer (int *tmp = realloc(...)) and only overwrite ptr after confirming tmp != NULL.',
            'Set pointers to NULL immediately after free(ptr); calling free(NULL) is a guaranteed safe no-op.',
            'Build growable containers as a struct holding { T *data; size_t len; size_t cap; } and double capacity on growth.',
          ],
          table: {
            headers: ['Function (<stdlib.h>)', 'Memory Initialized?', 'On Failure', 'Typical Use'],
            rows: [
              ['malloc(bytes)', 'No (garbage)', 'Returns NULL', 'Buffers you overwrite immediately'],
              ['calloc(n, size)', 'Yes (all zero)', 'Returns NULL', 'Arrays/structs needing zero state'],
              ['realloc(ptr, bytes)', 'Old kept, new raw', 'Returns NULL (old intact)', 'Growing dynamic arrays'],
              ['free(ptr)', 'Releases to heap', 'No return (void)', 'Exactly once per allocation'],
            ],
          },
          example: {
            title: 'Growable IntVec Using Safe Temporary-Pointer realloc',
            language: 'c',
            code: `#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    size_t len;
    size_t cap;
} IntVec;

bool vec_push(IntVec *v, int value) {
    if (v->len == v->cap) {
        size_t new_cap = (v->cap == 0) ? 4 : v->cap * 2;
        int *tmp = realloc(v->data, new_cap * sizeof(*tmp));
        if (tmp == NULL) return false;  // Original v->data stays intact!
        v->data = tmp;
        v->cap = new_cap;
    }
    v->data[v->len++] = value;
    return true;
}

int main(void) {
    IntVec v = {0};
    for (int i = 1; i <= 5; i++) vec_push(&v, i * 10);
    printf("len=%zu cap=%zu last=%d\\n", v.len, v.cap, v.data[v.len - 1]);
    free(v.data);
    v.data = NULL;
    return 0;
}`,
            output: `len=5 cap=8 last=50`,
          },
          warning:
            'Writing ptr = realloc(ptr, new_size) directly leaks the original memory block if realloc returns NULL! Also never call free() twice on the same non-NULL address (double free) or dereference memory after free() (use-after-free)—both are critical security vulnerabilities.',
        },
        {
          id: 'struct-alignment-and-ownership',
          heading: 'Struct Padding, Alignment & Ownership Conventions',
          body: [
            'CPUs read multi-byte values fastest at aligned memory addresses (e.g., an 8-byte double on an 8-byte boundary), so the C compiler inserts invisible padding bytes between struct fields. Ordering fields from largest alignment to smallest (double/pointers first, then int, then char) shrinks struct size with zero code changes.',
            'Pass structs larger than a couple of machine words as const Struct * instead of copying them by value. Whenever a struct owns internal heap allocations (such as a dynamically allocated name or array), provide paired create_*() and destroy_*() functions that free inner fields before freeing the struct itself.',
          ],
          points: [
            'Order struct members largest-to-smallest to minimize wasted padding bytes in large arrays of structs.',
            'Use designated initializers (Order o = { .id = 10, .total = 49.5 };) so omitted fields are cleanly zero-initialized.',
            'Document ownership clearly: who allocates memory and who is responsible for calling free().',
          ],
          example: {
            title: 'Struct Padding Comparison & Const Pointer Passing',
            language: 'c',
            code: `#include <stdio.h>

typedef struct {
    char tag;      // 1 byte + 7 bytes padding
    double price;  // 8 bytes
    char flag;     // 1 byte + 7 bytes trailing padding -> 24 bytes
} PaddedItem;

typedef struct {
    double price;  // 8 bytes
    char tag;      // 1 byte
    char flag;     // 1 byte + 6 bytes padding -> 16 bytes
} CompactItem;

void print_item(const CompactItem *item) {
    printf("Tag %c: $%.2f (flag=%c)\\n", item->tag, item->price, item->flag);
}

int main(void) {
    CompactItem item = { .price = 19.99, .tag = 'A', .flag = 'Y' };
    print_item(&item);
    printf("sizeof Padded=%zu vs Compact=%zu\\n", sizeof(PaddedItem), sizeof(CompactItem));
    return 0;
}`,
            output: `Tag A: $19.99 (flag=Y)
sizeof Padded=24 vs Compact=16`,
          },
          tip: 'In C, initializing with Type obj = {0}; zeroes every field reliably, preventing uninitialized-read bugs across the whole struct.',
        },
      ],
      challenge: {
        prompt:
          'Write int *create_range(size_t n) that allocates an array of n ints on the heap using malloc, checks for NULL, fills it with 0, 1, ..., n-1, and returns it. In main(), print the elements and free the memory cleanly.',
        hint: 'Check if (n == 0) return NULL; allocate with int *arr = malloc(n * sizeof(*arr)); if (!arr) return NULL; fill in a loop and return arr.',
        language: 'c',
        solutionCode: `#include <stdio.h>
#include <stdlib.h>

int *create_range(size_t n) {
    if (n == 0) return NULL;
    int *arr = malloc(n * sizeof(*arr));
    if (arr == NULL) return NULL;
    for (size_t i = 0; i < n; i++) {
        arr[i] = (int)i;
    }
    return arr;
}

int main(void) {
    size_t n = 5;
    int *nums = create_range(n);
    if (nums == NULL) return 1;

    for (size_t i = 0; i < n; i++) printf("%d ", nums[i]);
    printf("\\n");

    free(nums);
    nums = NULL;
    return 0;
}`,
      },
      quiz: [
        {
          question: 'Why is ptr = realloc(ptr, new_size); considered a bug in C?',
          options: [
            'realloc() cannot shrink memory',
            'If realloc() fails and returns NULL, overwriting ptr loses the address of the original block, causing a memory leak',
            'realloc() automatically frees ptr even on failure',
            'realloc() only works on structs',
          ],
          answer: 1,
          explanation:
            'When realloc() fails, it returns NULL and leaves the old allocation untouched. Always assign to a temporary pointer first.',
        },
        {
          question: 'What is the main difference between malloc(10 * sizeof(int)) and calloc(10, sizeof(int))?',
          options: [
            'calloc allocates on the stack while malloc uses the heap',
            'calloc initializes all allocated bytes to zero, while malloc leaves memory uninitialized',
            'calloc does not need free()',
            'malloc is only for char buffers',
          ],
          answer: 1,
          explanation:
            'calloc zeroes every allocated byte (and guards count * size overflow), whereas malloc returns uninitialized memory.',
        },
      ],
    },
    km: {
      duration: '14 នាទី',
      objectives: [
        'ជ្រើសរើសប្រើប្រាស់ត្រឹមត្រូវរវាង malloc(), calloc() និង realloc() សម្រាប់ heap buffers',
        'ពង្រីកទំហំអង្គចងចាំដោយសុវត្ថិភាពជាមួយ realloc() តាមរយៈ pointer បណ្ដោះអាសន្ន ដើម្បីការពារ memory leak',
        'ការពារកំហុស use-after-free, double-free និងការលេចធ្លាយអង្គចងចាំ',
        'យល់ពី struct padding/alignment និងការបញ្ជូន struct ដោយប្រើ const pointer',
      ],
      extraSections: [
        {
          id: 'calloc-realloc-and-dynamic-arrays',
          heading: 'malloc ធៀបនឹង calloc និង realloc() សុវត្ថិភាព',
          body: [
            'malloc(bytes) កក់អង្គចងចាំលើ heap ដោយមិនលុបសម្អាតតម្លៃចាស់ (លឿន ប៉ុន្តែអានមុនសរសេរគឺ Undefined Behavior)។ ចំណែក calloc(count, elem_size) កំណត់គ្រប់បៃជា 0 និងពិនិត្យ overflow នៃផលគុណ ដែលសុវត្ថិភាពជាងសម្រាប់ array ឬ struct ដែលត្រូវការតម្លៃសូន្យដំបូង។',
            'ពេល dynamic array អស់ទំហំ realloc(ptr, new_bytes) ពង្រីកប្លុកអង្គចងចាំដោយរក្សាទិន្នន័យចាស់។ ប៉ុន្តែបើអស់ RAM, realloc() ត្រឡប់ NULL ហើយទុកប្លុកចាស់នៅដដែល—ដូច្នេះការសរសេរ ptr = realloc(ptr, ...) ផ្ទាល់នឹងបាត់អាសយដ្ឋានប្លុកចាស់ បង្ក memory leak ភ្លាម។',
          ],
          points: [
            'សរសេរ malloc(n * sizeof(*ptr)) ជំនួស sizeof(Type) ដើម្បីកុំឱ្យខុសទំហំពេលប្ដូរប្រភេទទិន្នន័យ។',
            'រក្សាលទ្ធផល realloc() ក្នុង pointer បណ្ដោះអាសន្ន (int *tmp = realloc(...)) រួចពិនិត្យ tmp != NULL មុនផ្ដល់ឱ្យ ptr។',
            'កំណត់ ptr = NULL ភ្លាមៗបន្ទាប់ពី free(ptr); ការហៅ free(NULL) គឺមានសុវត្ថិភាពជានិច្ច។',
            'បង្កើត dynamic array ជា struct មាន { T *data; size_t len; size_t cap; } ហើយគុណ cap នឹង 2 ពេលពេញ។',
          ],
          table: {
            headers: ['អនុគមន៍ (<stdlib.h>)', 'កំណត់តម្លៃដំបូង?', 'ពេលបរាជ័យ', 'ការប្រើប្រាស់ទូទៅ'],
            rows: [
              ['malloc(bytes)', 'ទេ (ទិន្នន័យសំរាម)', 'ត្រឡប់ NULL', 'Buffer ដែលសរសេរចូលភ្លាម'],
              ['calloc(n, size)', 'បាទ (សូន្យទាំងអស់)', 'ត្រឡប់ NULL', 'Array/Struct ត្រូវការតម្លៃ 0'],
              ['realloc(ptr, bytes)', 'រក្សាចាស់, ថ្មីមិនសម្អាត', 'ត្រឡប់ NULL (ចាស់នៅដដែល)', 'ពង្រីកទំហំ dynamic array'],
              ['free(ptr)', 'ដោះលែងទៅ heap', 'គ្មានតម្លៃត្រឡប់ (void)', 'ហៅតែម្ដងគត់ក្នុងមួយការកក់'],
            ],
          },
          exampleTitle: 'Dynamic Array (IntVec) ដោយប្រើ realloc មានសុវត្ថិភាព',
          warning:
            'ការសរសេរ ptr = realloc(ptr, new_size) ផ្ទាល់នឹងបង្ក memory leak បើ realloc ត្រឡប់ NULL! ម្យ៉ាងទៀត កុំហៅ free() ពីរដងលើអាសយដ្ឋានតែមួយ (double free) ឬប្រើអង្គចងចាំក្រោយ free() (use-after-free)។',
        },
        {
          id: 'struct-alignment-and-ownership',
          heading: 'Struct Padding, Alignment និងកម្មសិទ្ធិអង្គចងចាំ',
          body: [
            'CPU អានទិន្នន័យលឿនបំផុតលើអាសយដ្ឋានដែលតម្រឹមត្រឹមត្រូវ (aligned) ដូច្នេះ compiler បន្ថែមបៃទទេ (padding) នៅចន្លោះ fields របស់ struct។ ការរៀប fields ពីធំទៅតូច (double/pointer មុន បន្ទាប់មក int រួច char) ជួយកាត់បន្ថយទំហំ struct ដោយមិនប្ដូរតក្កវិជ្ជាកូដឡើយ។',
            'បញ្ជូន struct ធំៗជា const Struct * ជំនួសឱ្យការចម្លងតាមតម្លៃ។ ប្រសិនបើ struct មាន field កក់លើ heap ត្រូវបង្កើតគូអនុគមន៍ create_*() និង destroy_*() ដែលដោះលែង field ខាងក្នុងមុនដោះលែង struct។',
          ],
          points: [
            'រៀបសមាជិក struct ពីទំហំធំទៅតូច ដើម្បីកាត់បន្ថយ padding ឥតប្រយោជន៍។',
            'ប្រើ designated initializers (Order o = { .id = 10, .total = 49.5 };) ដើម្បីឱ្យ field ដែលមិនបញ្ជាក់ក្លាយជា 0។',
            'កំណត់កម្មសិទ្ធិអង្គចងចាំឱ្យច្បាស់៖ អ្នកណាកក់ អ្នកណាទទួលខុសត្រូវ free()។',
          ],
          exampleTitle: 'ការប្រៀបធៀប Struct Padding និងការបញ្ជូន Const Pointer',
          tip: 'ក្នុង C ការសរសេរ Type obj = {0}; កំណត់គ្រប់ field ទាំងអស់ជាសូន្យដោយសុវត្ថិភាព ការពារការអានទិន្នន័យមិនទាន់កំណត់តម្លៃ។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ int *create_range(size_t n) ដែលកក់ array នៃ int ចំនួន n លើ heap ដោយ malloc ពិនិត្យ NULL បំពេញតម្លៃ 0, 1, ..., n-1 ហើយត្រឡប់ pointer នោះ។ ក្នុង main() សូមបង្ហាញធាតុ និង free() អង្គចងចាំឱ្យស្អាត។',
        hint: 'ពិនិត្យ if (n == 0) return NULL; កក់ដោយ int *arr = malloc(n * sizeof(*arr)); ពិនិត្យ NULL រួចបំពេញក្នុងរង្វិលជុំ និងត្រឡប់ arr។',
      },
      quiz: [
        {
          question: 'ហេតុអ្វីបានជា ptr = realloc(ptr, new_size); ត្រូវបានចាត់ទុកថាជាកំហុសក្នុង C?',
          options: [
            'realloc() មិនអាចបង្រួមទំហំអង្គចងចាំបានទេ',
            'ប្រសិនបើ realloc() បរាជ័យហើយត្រឡប់ NULL ការសរសេរជាន់លើ ptr នឹងបាត់អាសយដ្ឋានប្លុកចាស់ បង្ក memory leak',
            'realloc() ដោះលែង ptr ដោយស្វ័យប្រវត្តិទោះបរាជ័យក៏ដោយ',
            'realloc() ប្រើបានតែលើ struct ប៉ុណ្ណោះ',
          ],
          answer: 1,
          explanation:
            'ពេល realloc() បរាជ័យ វាត្រឡប់ NULL ហើយទុកប្លុកអង្គចងចាំដើមនៅដដែល។ ត្រូវរក្សាលទ្ធផលក្នុង pointer បណ្ដោះអាសន្នជាមុនជានិច្ច។',
        },
        {
          question: 'តើអ្វីជាភាពខុសគ្នាសំខាន់រវាង malloc(10 * sizeof(int)) និង calloc(10, sizeof(int))?',
          options: [
            'calloc កក់លើ stack ចំណែក malloc កក់លើ heap',
            'calloc កំណត់គ្រប់បៃជាសូន្យទាំងអស់ ចំណែក malloc ទុកអង្គចងចាំមិនសម្អាត',
            'calloc មិនចាំបាច់ហៅ free() ទេ',
            'malloc ប្រើបានតែសម្រាប់ char buffer',
          ],
          answer: 1,
          explanation:
            'calloc កំណត់គ្រប់បៃជាសូន្យ (និងពិនិត្យ overflow នៃផលគុណ) ចំណែក malloc ផ្ដល់អង្គចងចាំដែលមានទិន្នន័យសំរាម។',
        },
      ],
    },
  },

  'c/c-headers-and-safety': {
    en: {
      duration: '15 min',
      objectives: [
        'Structure multi-file C libraries with include guards (.h) and encapsulated implementations (.c)',
        'Avoid multiple-definition linker errors by separating declarations from definitions',
        'Handle multi-resource teardown cleanly using the idiomatic C goto cleanup pattern',
        'Catch memory leaks, out-of-bounds accesses, and undefined behavior automatically with sanitizers',
      ],
      extraSections: [
        {
          id: 'headers-guards-and-flags',
          heading: 'Header Guards, Translation Units & Compiler Hardening',
          body: [
            'Large C codebases split every module into a public header (math_utils.h) declaring types and function prototypes, and a source file (math_utils.c) holding the actual implementation and static private helpers. Wrap every header in include guards (#ifndef MODULE_H / #define MODULE_H / #endif) so including the same header twice in one translation unit never causes redefinition errors.',
            'Modern C development leans heavily on compiler diagnostics and runtime sanitizers. Compiling your test builds with -Wall -Wextra -Werror -Wshadow -fsanitize=address,undefined turns silent memory corruption, buffer overflows, leaks, and signed overflows into immediate, pinpointed crash reports with exact line numbers.',
          ],
          points: [
            'Put declarations (prototypes, typedefs, enums) in .h files and definitions (function bodies, global storage) in .c files.',
            'Use opaque pointers (typedef struct Buffer Buffer; in .h, full struct in .c) to achieve real encapsulation in C.',
            'Always include a module’s own .h file FIRST in its .c file to verify the header is self-contained.',
            'Run AddressSanitizer + UBSan on every test run in CI before shipping release builds.',
          ],
          table: {
            headers: ['GCC / Clang Flag', 'What It Catches'],
            rows: [
              ['-Wall -Wextra', 'Unused vars, format mismatches, missing returns'],
              ['-Werror', 'Promotes all warnings to hard build errors'],
              ['-Wshadow -Wconversion', 'Variable shadowing & narrowing integer conversions'],
              ['-fsanitize=address', 'Heap/stack overflows, use-after-free, memory leaks'],
              ['-fsanitize=undefined', 'Signed overflow, null dereference, bad shifts'],
            ],
          },
          example: {
            title: 'Self-Contained Header Guard & Explicit Status Enum',
            language: 'c',
            code: `/* --- parser.h --- */
#ifndef PARSER_H
#define PARSER_H

#include <stdint.h>

typedef enum {
    STATUS_OK = 0,
    STATUS_ERR_NULL,
    STATUS_ERR_RANGE
} Status;

Status parse_percent(int raw, uint8_t *out_pct);

#endif /* PARSER_H */

/* --- main.c --- */
#include <stdio.h>

Status parse_percent(int raw, uint8_t *out_pct) {
    if (out_pct == NULL) return STATUS_ERR_NULL;
    if (raw < 0 || raw > 100) return STATUS_ERR_RANGE;
    *out_pct = (uint8_t)raw;
    return STATUS_OK;
}

int main(void) {
    uint8_t pct = 0;
    if (parse_percent(85, &pct) == STATUS_OK) {
        printf("Validated percent: %u%%\\n", pct);
    }
    return 0;
}`,
            output: `Validated percent: 85%`,
          },
          warning:
            'Never place non-static function definitions or global variable definitions (like int counter = 0;) inside a .h header file! Including that header in two .c files causes a "multiple definition" linker error. Use extern int counter; in .h and int counter = 0; in exactly one .c file.',
        },
        {
          id: 'defensive-c-and-goto-cleanup',
          heading: 'Assertions, errno & the goto cleanup Pattern',
          body: [
            'Separate programmer bugs from runtime failures: use assert(ptr != NULL) from <assert.h> to verify internal invariants during development (never for untrusted user input, because asserts disappear when compiled with -DNDEBUG), and return explicit status codes or inspect errno for recoverable runtime errors like missing files or failed allocations.',
            'Because C has no destructors or try/finally blocks, functions that acquire multiple resources (two buffers plus a FILE *) quickly accumulate duplicate free() calls on every error path. Production C code—including the Linux kernel—solves this with the single-exit goto cleanup; pattern: initialize pointers to NULL, jump forward to cleanup: on any error, and free everything in one place.',
          ],
          points: [
            'Never put side effects inside assert() (like assert(save() == 0))—they vanish in release (-DNDEBUG) builds.',
            'Always initialize resource pointers to NULL before the first allocation so goto cleanup can safely free all of them.',
            'Check the return value of every fallible C library call: malloc, fopen, fread, fwrite, and fclose.',
          ],
          example: {
            title: 'Single-Exit Resource Cleanup Using goto cleanup',
            language: 'c',
            code: `#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

bool process_pair(size_t n) {
    bool ok = false;
    int *buf_a = NULL;
    int *buf_b = NULL;

    buf_a = calloc(n, sizeof(*buf_a));
    if (buf_a == NULL) goto cleanup;

    buf_b = calloc(n, sizeof(*buf_b));
    if (buf_b == NULL) goto cleanup;

    buf_a[0] = 15;
    buf_b[0] = 27;
    printf("Combined sum = %d\\n", buf_a[0] + buf_b[0]);
    ok = true;

cleanup:
    free(buf_b);
    free(buf_a);
    return ok;
}

int main(void) {
    printf("Success: %s\\n", process_pair(4) ? "true" : "false");
    return 0;
}`,
            output: `Combined sum = 42
Success: true`,
          },
          tip: 'Only jump FORWARD to a cleanup label with goto—never jump backward or skip over variable initializations.',
        },
      ],
      challenge: {
        prompt:
          'Write a C function Status parse_port(const char *text, uint16_t *out_port) using enum Status { OK, ERR_NULL, ERR_FORMAT, ERR_RANGE } that parses text with strtol and validates that the port is between 1 and 65535.',
        hint: 'Check if (text == NULL || out_port == NULL) return ERR_NULL;. Call long val = strtol(text, &end, 10); verify end != text && *end == \'\\0\' (else ERR_FORMAT) and 1 <= val && val <= 65535 (else ERR_RANGE).',
        language: 'c',
        solutionCode: `#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

typedef enum { OK = 0, ERR_NULL, ERR_FORMAT, ERR_RANGE } Status;

Status parse_port(const char *text, uint16_t *out_port) {
    if (text == NULL || out_port == NULL) return ERR_NULL;
    char *end = NULL;
    long val = strtol(text, &end, 10);
    if (end == text || *end != '\\0') return ERR_FORMAT;
    if (val < 1 || val > 65535) return ERR_RANGE;
    *out_port = (uint16_t)val;
    return OK;
}

int main(void) {
    uint16_t port = 0;
    printf("8080 -> status=%d, port=%u\\n", parse_port("8080", &port), port);
    printf("99999 -> status=%d\\n", parse_port("99999", &port));
    return 0;
}`,
      },
      quiz: [
        {
          question: 'What linker error occurs if you define int global_count = 0; directly inside a .h file included by two .c files?',
          options: [
            'Undefined reference',
            'Multiple definition of global_count',
            'Stack overflow',
            'Include guard syntax error',
          ],
          answer: 1,
          explanation:
            'Each .c file is compiled as a separate translation unit, so both emit a definition of global_count and the linker fails with multiple definition. Declare extern int global_count; in .h and define it in one .c file.',
        },
        {
          question: 'Why must all resource pointers be initialized to NULL when using the goto cleanup; pattern?',
          options: [
            'C forbids uninitialized pointers from compiling',
            'So that jumping to cleanup after an early failure can safely call free(ptr) on unallocated pointers (free(NULL) is a no-op)',
            'Because goto automatically zeroes NULL pointers',
            'It prevents AddressSanitizer from running',
          ],
          answer: 1,
          explanation:
            'Calling free() on an uninitialized garbage pointer is Undefined Behavior, whereas free(NULL) is guaranteed safe and does nothing.',
        },
      ],
    },
    km: {
      duration: '15 នាទី',
      objectives: [
        'រៀបចំបណ្ណាល័យ C ច្រើនឯកសារជាមួយ include guards (.h) និងកូដអនុវត្តដាច់ដោយឡែក (.c)',
        'ជៀសវាងកំហុស linker (multiple definition) ដោយបំបែកការប្រកាស (.h) និងនិយមន័យ (.c)',
        'ដោះលែងធនធានច្រើនយ៉ាងស្អាតដោយប្រើលំនាំ goto cleanup របស់ភាសា C',
        'ចាប់កំហុសអង្គចងចាំ memory leaks និង undefined behavior ដោយស្វ័យប្រវត្តិជាមួយ sanitizers',
      ],
      extraSections: [
        {
          id: 'headers-guards-and-flags',
          heading: 'Header Guards, Translation Units និង Compiler Flags សុវត្ថិភាព',
          body: [
            'គម្រោង C ធំៗបំបែករាល់ module ជាឯកសារ header (.h) សម្រាប់ប្រកាសប្រភេទទិន្នន័យ និង prototype និងឯកសារប្រភព (.c) សម្រាប់កូដអនុវត្ត និងអនុគមន៍ static ផ្ទៃក្នុង។ ត្រូវរុំគ្រប់ header ដោយ include guards (#ifndef MODULE_H / #define MODULE_H / #endif) ដើម្បីកុំឱ្យកើតកំហុសប្រកាសជាន់គ្នា។',
            'ការអភិវឌ្ឍន៍ C ទំនើបពឹងផ្អែកខ្លាំងលើ compiler warnings និង sanitizers។ ការ compile តេស្តដោយ -Wall -Wextra -Werror -Wshadow -fsanitize=address,undefined បំប្លែងកំហុសអង្គចងចាំលាក់កំបាំងទៅជារបាយការណ៍កំហុសច្បាស់លាស់ភ្លាមៗ។',
          ],
          points: [
            'ដាក់ការប្រកាស (prototypes, typedefs, enums) ក្នុង .h និងដាក់កូដអនុវត្តក្នុង .c។',
            'ប្រើ opaque pointers (typedef struct Buffer Buffer; ក្នុង .h ហើយនិយមន័យពេញក្នុង .c) ដើម្បីលាក់ព័ត៌មានផ្ទៃក្នុង។',
            'បញ្ចូល .h ផ្ទាល់ខ្លួនរបស់ module មុនគេក្នុង .c ដើម្បីផ្ទៀងផ្ទាត់ថា header អាចប្រើឯករាជ្យបាន។',
            'ដំណើរការ AddressSanitizer + UBSan លើគ្រប់ test ក្នុង CI មុនដាក់ប្រើប្រាស់។',
          ],
          table: {
            headers: ['Flag របស់ GCC / Clang', 'កំហុសដែលវាចាប់បាន'],
            rows: [
              ['-Wall -Wextra', 'អថេរមិនប្រើ, format printf ខុស, ភ្លេច return'],
              ['-Werror', 'បំប្លែងការព្រមានទាំងអស់ទៅជាកំហុស build'],
              ['-Wshadow -Wconversion', 'អថេរជាន់ឈ្មោះ និងការបំប្លែងលេខបាត់ទិន្នន័យ'],
              ['-fsanitize=address', 'Heap/stack overflow, use-after-free, memory leaks'],
              ['-fsanitize=undefined', 'Signed overflow, null dereference, shift ខុស'],
            ],
          },
          exampleTitle: 'Header Guard និងការត្រឡប់ Status Enum ច្បាស់លាស់',
          warning:
            'កុំសរសេរនិយមន័យអនុគមន៍មិនមែន static ឬអថេរសកល (ដូចជា int counter = 0;) ផ្ទាល់ក្នុងឯកសារ .h! ការ include ក្នុងឯកសារ .c ពីរផ្សេងគ្នានឹងបង្កកំហុស linker "multiple definition"។ ត្រូវប្រើ extern int counter; ក្នុង .h និង int counter = 0; ក្នុង .c តែមួយ។',
        },
        {
          id: 'defensive-c-and-goto-cleanup',
          heading: 'Assertions, errno និងលំនាំ goto cleanup',
          body: [
            'បែងចែកកំហុសកម្មវិធីពីកំហុសពេលដំណើរការ៖ ប្រើ assert() ពី <assert.h> ដើម្បីផ្ទៀងផ្ទាត់លក្ខខណ្ឌផ្ទៃក្នុងពេលអភិវឌ្ឍន៍ (កុំប្រើសម្រាប់ទិន្នន័យអ្នកប្រើ ព្រោះ assert បាត់ពេល compile ជាមួយ -DNDEBUG) និងត្រឡប់ status code ឬពិនិត្យ errno សម្រាប់កំហុសពេលដំណើរការ។',
            'ដោយសារ C គ្មាន destructor ឬ try/finally អនុគមន៍ដែលកក់ធនធានច្រើនងាយភ្លេច free() លើផ្លូវកំហុស។ កូដ C កម្រិតផលិតកម្ម (រួមទាំង Linux kernel) ប្រើលំនាំ goto cleanup;៖ កំណត់ pointer ទាំងអស់ជា NULL លោតទៅ cleanup: ពេលមានកំហុស និង free() រួមគ្នានៅកន្លែងតែមួយ។',
          ],
          points: [
            'កុំដាក់កូដដែលមានផលប៉ះពាល់ក្នុង assert() (ឧ. assert(save() == 0)) ព្រោះវាត្រូវបានដកចេញក្នុង release build (-DNDEBUG)។',
            'កំណត់ pointer ធនធានទាំងអស់ជា NULL មុនពេលកក់ ដើម្បីឱ្យ cleanup អាចហៅ free() ដោយសុវត្ថិភាព។',
            'ពិនិត្យតម្លៃត្រឡប់នៃរាល់អនុគមន៍ដែលអាចបរាជ័យ៖ malloc, fopen, fread, fwrite និង fclose។',
          ],
          exampleTitle: 'ការដោះលែងធនធានច្រើនដោយលំនាំ goto cleanup',
          tip: 'ប្រើ goto ដើម្បីលោតទៅមុខទៅកាន់ cleanup label ប៉ុណ្ណោះ—កុំលោតថយក្រោយ ឬរំលងការកំណត់តម្លៃដំបូងនៃអថេរ។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ Status parse_port(const char *text, uint16_t *out_port) ដោយប្រើ enum Status { OK, ERR_NULL, ERR_FORMAT, ERR_RANGE } ដែលបំប្លែង text ដោយ strtol និងផ្ទៀងផ្ទាត់ថា port ស្ថិតក្នុងចន្លោះ 1 ដល់ 65535។',
        hint: 'ពិនិត្យ text == NULL || out_port == NULL (ត្រឡប់ ERR_NULL)។ ហៅ strtol(text, &end, 10) ផ្ទៀងផ្ទាត់ end != text && *end == \'\\0\' (ERR_FORMAT) និង 1 <= val && val <= 65535 (ERR_RANGE)។',
      },
      quiz: [
        {
          question: 'តើកំហុស linker អ្វីនឹងកើតឡើងប្រសិនបើកំណត់ int global_count = 0; ផ្ទាល់ក្នុងឯកសារ .h ដែលត្រូវបាន include ដោយឯកសារ .c ពីរ?',
          options: [
            'Undefined reference',
            'Multiple definition of global_count',
            'Stack overflow',
            'Include guard syntax error',
          ],
          answer: 1,
          explanation:
            'ឯកសារ .c នីមួយៗ compile ដាច់ដោយឡែក ដូច្នេះទាំងពីរសុទ្ធតែបង្កើត global_count ធ្វើឱ្យ linker រាយការណ៍ multiple definition។ ត្រូវប្រើ extern ក្នុង .h និងកំណត់តម្លៃក្នុង .c តែមួយ។',
        },
        {
          question: 'ហេតុអ្វីត្រូវកំណត់ pointer ធនធានទាំងអស់ជា NULL មុនពេលប្រើលំនាំ goto cleanup;?',
          options: [
            'C មិនអនុញ្ញាតឱ្យ compile pointer មិនកំណត់តម្លៃទេ',
            'ដើម្បីឱ្យពេលលោតទៅ cleanup ក្រោយកំហុសដំបូង ការហៅ free(ptr) លើ pointer ដែលមិនទាន់កក់មានសុវត្ថិភាព (free(NULL) មិនធ្វើអ្វីទេ)',
            'ព្រោះ goto កំណត់ NULL ដោយស្វ័យប្រវត្តិ',
            'ដើម្បីបិទ AddressSanitizer',
          ],
          answer: 1,
          explanation:
            'ការហៅ free() លើ pointer ដែលមានទិន្នន័យសំរាមគឺជា Undefined Behavior ចំណែក free(NULL) ត្រូវបានធានាថាសុវត្ថិភាពជានិច្ច។',
        },
      ],
    },
  },

  'cpp/cpp-from-zero': {
    en: {
      duration: '10 min',
      objectives: [
        'Initialize variables safely with uniform brace initialization {} to block narrowing bugs',
        'Use std::cout with "\\n", std::cin, and std::getline cleanly without flushing overhead',
        'Avoid namespace pollution from using namespace std; in headers and larger files',
        'Write overloaded functions and mutate caller variables cleanly with references (T&)',
      ],
      extraSections: [
        {
          id: 'brace-init-and-io',
          heading: 'Types, Uniform Brace Initialization & Fast I/O',
          body: [
            'Modern C++ encourages uniform brace initialization (int count{10}; double price{19.5};) over legacy = assignment for one big reason: braces forbid silent narrowing conversions. Writing int x = 3.9; silently truncates to 3, whereas int x{3.9}; triggers an immediate compiler error.',
            'For terminal output, prefer "\\n" over std::endl—especially inside loops. While both print a newline, std::endl also forces an expensive OS buffer flush on every line. When reading full lines containing spaces from std::cin, use std::getline(std::cin, line) instead of >>, which stops at whitespace.',
          ],
          points: [
            'Use constexpr for compile-time constants (constexpr double kTaxRate{0.10};) instead of #define.',
            'Prefer "\\n" over std::endl unless you specifically need to flush output before a crash or prompt.',
            'Explicitly qualify std::cout and std::string rather than dumping the whole std namespace into global scope.',
            'Compile with C++20 and strict warnings: g++ -std=c++20 -Wall -Wextra main.cpp -o app.',
          ],
          table: {
            headers: ['C++ Syntax', 'Purpose', 'Example'],
            rows: [
              ['int n{42};', 'Brace init (blocks narrowing)', 'int n{3.9}; // Compile error!'],
              ['constexpr double kPi{3.14};', 'Compile-time typed constant', 'Zero runtime cost, type-checked'],
              ['std::string s{"CodeHub"};', 'Safe dynamic text (<string>)', 's.size() == 7'],
              ['std::cout << x << "\\n";', 'Fast buffered newline output', 'Avoids extra flush of std::endl'],
            ],
          },
          example: {
            title: 'Brace Initialization, constexpr & Branching',
            language: 'cpp',
            code: `#include <iomanip>
#include <iostream>
#include <string>

int main() {
    constexpr double kTaxRate{0.10};
    std::string item{"USB-C Hub"};
    int qty{3};
    double unit_price{18.50};

    double subtotal = qty * unit_price;
    double total = subtotal * (1.0 + kTaxRate);

    std::cout << std::fixed << std::setprecision(2);
    std::cout << item << " x" << qty << " -> $" << total << "\\n";
    return 0;
}`,
            output: `USB-C Hub x3 -> $61.05`,
          },
          warning:
            'Never put using namespace std; in a header file—and avoid it even in .cpp files. The std namespace defines common names like count, data, min, max, and move that silently collide with your own variables and functions.',
        },
        {
          id: 'functions-overloading-and-refs',
          heading: 'Functions, Overloading & References (T&)',
          body: [
            'Unlike C, C++ lets you overload functions: two functions can share the same name as long as their parameter types or counts differ (for example, area(double radius) and area(double w, double h)). You can also supply default parameter values from right to left.',
            'When a function needs to modify an argument directly, C++ provides references (int& score). A reference is a safe, non-null alias to an existing variable—callers pass score naturally without pointer syntax (& or *), and the function mutates the original variable directly.',
          ],
          points: [
            'References must be initialized when declared and cannot be rebound to another variable later.',
            'Pass small primitives (int, double, bool) by value; use T& only when the function intentionally mutates the caller’s variable.',
            'Overloaded functions must differ in parameter list—differing only by return type is a compile error.',
          ],
          example: {
            title: 'Function Overloading & Pass-by-Reference',
            language: 'cpp',
            code: `#include <iostream>

double area(double side) { return side * side; }
double area(double w, double h) { return w * h; }

void add_bonus(int& score, int bonus = 5) {
    score += bonus;
}

int main() {
    int points{80};
    add_bonus(points, 12);
    std::cout << "Square: " << area(4.0) << ", Rect: " << area(4.0, 6.0) << "\\n";
    std::cout << "Updated points: " << points << "\\n";
    return 0;
}`,
            output: `Square: 16, Rect: 24
Updated points: 92`,
          },
          tip: 'Use range-based for loops (for (double t : temps)) whenever you iterate over an entire array or container—zero off-by-one errors.',
        },
      ],
      challenge: {
        prompt:
          'Write a C++ program with a function double to_celsius(double f) that returns (f - 32.0) * 5.0 / 9.0, and use a range-based for loop over {32.0, 68.0, 98.6, 212.0} to print each Fahrenheit value and its Celsius result to 1 decimal place.',
        hint: 'Include <iostream> and <iomanip>. Use std::cout << std::fixed << std::setprecision(1); and iterate with for (double f : {32.0, 68.0, 98.6, 212.0}).',
        language: 'cpp',
        solutionCode: `#include <iomanip>
#include <iostream>

double to_celsius(double f) {
    return (f - 32.0) * 5.0 / 9.0;
}

int main() {
    std::cout << std::fixed << std::setprecision(1);
    for (double f : {32.0, 68.0, 98.6, 212.0}) {
        std::cout << f << " F -> " << to_celsius(f) << " C\\n";
    }
    return 0;
}`,
      },
      quiz: [
        {
          question: 'Why is "\\n" generally preferred over std::endl inside C++ loops?',
          options: [
            'std::endl does not work on Windows',
            'std::endl flushes the output stream buffer on every call, hurting performance in tight loops',
            '"\\n" automatically formats numbers to two decimal places',
            'std::endl is deprecated in C++20',
          ],
          answer: 1,
          explanation:
            'std::endl writes a newline AND flushes the buffer immediately. Using "\\n" lets the stream buffer output efficiently.',
        },
        {
          question: 'What advantage does int count{3.9}; have over int count = 3.9;?',
          options: [
            'It rounds 3.9 up to 4 automatically',
            'Brace initialization rejects narrowing conversions at compile time instead of silently truncating',
            'It allocates count on the heap',
            'It turns count into a double',
          ],
          answer: 1,
          explanation:
            'Uniform brace initialization {} catches narrowing conversions (double -> int) as compile errors rather than silently losing data.',
        },
      ],
    },
    km: {
      duration: '10 នាទី',
      objectives: [
        'កំណត់តម្លៃអថេរដោយសុវត្ថិភាពជាមួយ uniform brace initialization {} ដើម្បីការពារការកាត់បាត់ទិន្នន័យ',
        'ប្រើ std::cout ជាមួយ "\\n", std::cin និង std::getline ដោយគ្មានការចំណាយ flush ឥតប្រយោជន៍',
        'ជៀសវាងការបំពុល namespace ពី using namespace std; ក្នុង headers និងឯកសារធំៗ',
        'សរសេរ function overloading និងកែប្រែអថេរអ្នកហៅយ៉ាងស្អាតជាមួយ references (T&)',
      ],
      extraSections: [
        {
          id: 'brace-init-and-io',
          heading: 'ប្រភេទទិន្នន័យ, Brace Initialization និង I/O លឿន',
          body: [
            'C++ ទំនើបលើកទឹកចិត្តឱ្យប្រើ brace initialization (int count{10}; double price{19.5};) ជំនួសឱ្យ = ព្រោះដង្កៀប {} រារាំងការបំប្លែងបាត់ទិន្នន័យដោយស្ងាត់ៗ (narrowing)។ ការសរសេរ int x = 3.9; កាត់ចោល .9 ស្ងាត់ៗ ចំណែក int x{3.9}; បង្កកំហុសពេល compile ភ្លាម។',
            'សម្រាប់ការបង្ហាញលើអេក្រង់ គួរប្រើ "\\n" ជំនួស std::endl ជាពិសេសក្នុងរង្វិលជុំ ព្រោះ std::endl បង្ខំឱ្យ flush buffer រាល់បន្ទាត់ដែលធ្វើឱ្យយឺត។ ពេលអានមួយបន្ទាត់ពេញមានដកឃ្លាពី std::cin សូមប្រើ std::getline(std::cin, line)។',
          ],
          points: [
            'ប្រើ constexpr សម្រាប់តម្លៃថេរពេល compile (constexpr double kTaxRate{0.10};) ជំនួស #define។',
            'ប្រើ "\\n" ជំនួស std::endl លើកលែងតែពេលត្រូវការ flush ភ្លាមៗ។',
            'សរសេរ std::cout និង std::string ច្បាស់លាស់ ជៀសវាង using namespace std; កម្រិតសកល។',
            'Compile ជាមួយ C++20 និងការព្រមានតឹងរ៉ឹង៖ g++ -std=c++20 -Wall -Wextra main.cpp -o app។',
          ],
          table: {
            headers: ['វាក្យសម្ព័ន្ធ C++', 'តួនាទី', 'ឧទាហរណ៍'],
            rows: [
              ['int n{42};', 'Brace init (រារាំង narrowing)', 'int n{3.9}; // កំហុសពេល compile!'],
              ['constexpr double kPi{3.14};', 'តម្លៃថេរពេល compile', 'គ្មានការចំណាយពេលដំណើរការ'],
              ['std::string s{"CodeHub"};', 'អត្ថបទសុវត្ថិភាព (<string>)', 's.size() == 7'],
              ['std::cout << x << "\\n";', 'ចុះបន្ទាត់លឿន', 'ជៀសវាង flush បន្ថែមរបស់ std::endl'],
            ],
          },
          exampleTitle: 'Brace Initialization, constexpr និងការគណនា',
          warning:
            'កុំដាក់ using namespace std; ក្នុងឯកសារ header ហើយគួរជៀសវាងក្នុង .cpp ផងដែរ។ std មានឈ្មោះទូទៅដូចជា count, data, min, max និង move ដែលងាយជាន់ឈ្មោះជាមួយអថេរ និងអនុគមន៍របស់អ្នក។',
        },
        {
          id: 'functions-overloading-and-refs',
          heading: 'អនុគមន៍, Overloading និង References (T&)',
          body: [
            'ខុសពី C ភាសា C++ អនុញ្ញាតឱ្យធ្វើ function overloading៖ អនុគមន៍ពីរអាចមានឈ្មោះដូចគ្នា ឱ្យតែប្រភេទ ឬចំនួនប៉ារ៉ាម៉ែត្រខុសគ្នា (ឧ. area(double side) និង area(double w, double h)) ហើយអាចដាក់តម្លៃលំនាំដើមលើប៉ារ៉ាម៉ែត្រពីស្ដាំទៅឆ្វេង។',
            'នៅពេលអនុគមន៍ត្រូវកែប្រែអថេររបស់អ្នកហៅដោយផ្ទាល់ C++ ផ្ដល់ reference (int& score)។ Reference ជាឈ្មោះជំនួសដែលមិនអាច NULL និងមានសុវត្ថិភាពជាង raw pointer។',
          ],
          points: [
            'Reference ត្រូវតែភ្ជាប់ទៅអថេរពេលប្រកាស ហើយមិនអាចប្ដូរទៅភ្ជាប់អថេរផ្សេងទៀតបានឡើយ។',
            'បញ្ជូនប្រភេទតូចៗ (int, double, bool) តាមតម្លៃ ហើយប្រើ T& តែពេលចង់កែប្រែអថេរដើម។',
            'អនុគមន៍ overload ត្រូវខុសគ្នាត្រង់បញ្ជីប៉ារ៉ាម៉ែត្រ មិនអាចខុសតែប្រភេទត្រឡប់ (return type) ឡើយ។',
          ],
          exampleTitle: 'Function Overloading និង Pass-by-Reference',
          tip: 'ប្រើ range-based for (for (double t : temps)) ពេលដើរលើធាតុទាំងអស់នៃ array ឬ container ដើម្បីកុំឱ្យខុសលេខសន្ទស្សន៍។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរកម្មវិធី C++ ដែលមានអនុគមន៍ double to_celsius(double f) ត្រឡប់ (f - 32.0) * 5.0 / 9.0 រួចប្រើ range-based for លើ {32.0, 68.0, 98.6, 212.0} ដើម្បីបង្ហាញ Fahrenheit និង Celsius មានទសភាគ 1 ខ្ទង់។',
        hint: 'បញ្ចូល <iostream> និង <iomanip> ប្រើ std::cout << std::fixed << std::setprecision(1); និងដើរលើ {32.0, 68.0, 98.6, 212.0}។',
      },
      quiz: [
        {
          question: 'ហេតុអ្វី "\\n" ត្រូវបានណែនាំជាង std::endl នៅក្នុងរង្វិលជុំ C++?',
          options: [
            'std::endl មិនដំណើរការលើ Windows',
            'std::endl ធ្វើការ flush output buffer រាល់ពេលហៅ ដែលធ្វើឱ្យយឺតក្នុងរង្វិលជុំច្រើនជុំ',
            '"\\n" រៀបចំទសភាគ 2 ខ្ទង់ដោយស្វ័យប្រវត្តិ',
            'std::endl ត្រូវបានលុបចោលក្នុង C++20',
          ],
          answer: 1,
          explanation:
            'std::endl ចុះបន្ទាត់ផង និង flush buffer ភ្លាមៗផង។ ការប្រើ "\\n" អនុញ្ញាតឱ្យ stream buffer ដំណើរការបានលឿន។',
        },
        {
          question: 'តើ int count{3.9}; មានអត្ថប្រយោជន៍អ្វីជាង int count = 3.9;?',
          options: [
            'បង្គត់ 3.9 ទៅ 4 ដោយស្វ័យប្រវត្តិ',
            'Brace initialization បដិសេធ narrowing conversion ពេល compile ជំនួសឱ្យការកាត់ចោលទិន្នន័យដោយស្ងាត់ៗ',
            'កក់ count លើ heap',
            'បំប្លែង count ទៅជា double',
          ],
          answer: 1,
          explanation:
            'Uniform brace initialization {} ចាប់ narrowing conversions (double -> int) ជាកំហុសពេល compile ដើម្បីការពារការបាត់ទិន្នន័យ។',
        },
      ],
    },
  },

  'cpp/cpp-modern-basics': {
    en: {
      duration: '12 min',
      objectives: [
        'Choose optimal parameter passing modes (value, const T&, T&, std::string_view)',
        'Represent optional results cleanly using C++17 std::optional<T> instead of magic sentinel values',
        'Avoid accidental copies when using auto by explicitly writing const auto&',
        'Model type-safe states using scoped enum class and namespaces',
      ],
      extraSections: [
        {
          id: 'optional-const-and-auto',
          heading: 'std::optional, const Correctness & auto Pitfalls',
          body: [
            'Historically, C and older C++ functions returned magic numbers like -1 or empty strings to signal "not found", forcing callers to guess whether -1 was valid data or an error. C++17 solved this with std::optional<T>: a stack-allocated wrapper that either holds a value or std::nullopt, with clean helpers like .has_value() and .value_or(fallback).',
            'Type deduction with auto removes noisy type repetition, but remember one golden rule: plain auto strips references and top-level const! Writing auto name = get_user_name(); copies the std::string even if the function returns const std::string&. Write const auto& whenever you want to borrow without copying.',
          ],
          points: [
            'Use std::optional<T> for lookups or parsers that may legitimately return "no result".',
            'Pair C++17 if-init statements (if (auto id = find_id(key); id.has_value())) to keep temporary variables tightly scoped.',
            'Write const auto& in range-based for loops over strings or structs to avoid copying every element.',
            'Mark compile-time pure functions constexpr so they can be evaluated during compilation.',
          ],
          table: {
            headers: ['Parameter Style', 'Copies?', 'Mutates Caller?', 'Use When'],
            rows: [
              ['int / double (by value)', 'Cheap register copy', 'No', 'Built-in scalars & tiny types (<= 16B)'],
              ['const T&', 'No', 'No', 'Read-only structs, vectors, strings'],
              ['T&', 'No', 'Yes', 'In-place mutation / out-parameters'],
              ['std::string_view', 'No (ptr + len)', 'No', 'Read-only text from string or literal'],
            ],
          },
          example: {
            title: 'Safe Lookup with std::optional & if-init (C++17)',
            language: 'cpp',
            code: `#include <iostream>
#include <optional>
#include <string_view>

std::optional<int> port_for(std::string_view protocol) {
    if (protocol == "http") return 80;
    if (protocol == "https") return 443;
    return std::nullopt;
}

int main() {
    if (auto p = port_for("https"); p) {
        std::cout << "HTTPS port: " << *p << "\\n";
    }
    int fallback = port_for("ftp").value_or(8080);
    std::cout << "Fallback port: " << fallback << "\\n";
    return 0;
}`,
            output: `HTTPS port: 443
Fallback port: 8080`,
          },
          warning:
            'Never return a reference (const std::string&) to a local variable created inside a function! The local object is destroyed on return, leaving a dangling reference and Undefined Behavior. Return std::string by value—the compiler eliminates the copy via Return Value Optimization (RVO).',
        },
        {
          id: 'enum-class-and-namespaces',
          heading: 'Scoped enum class, Namespaces & std::string Utilities',
          body: [
            'Old C-style enums leak their enumerators into the surrounding scope and implicitly convert to int, allowing nonsensical comparisons like Color::Red == Status::Error. Modern C++ replaces them with scoped enum class: values stay inside the enum’s scope (OrderState::Paid) and never implicitly convert to integers.',
            'Group related types and functions inside namespaces (namespace billing { ... }) to prevent symbol collisions across libraries, and use std::string methods like .empty(), .starts_with() (C++20), .find(), and .substr() instead of raw C string functions.',
          ],
          points: [
            'Always check .find() against std::string::npos (not -1 or 0) because string positions are unsigned size_t.',
            'Use nested namespaces cleanly in C++17: namespace app::billing { ... }.',
            'Prefer enum class over unscoped enum in all new C++ code.',
          ],
          example: {
            title: 'enum class State Helper Inside a Namespace',
            language: 'cpp',
            code: `#include <iostream>
#include <string>
#include <string_view>

namespace shop {
enum class OrderState { Pending, Paid, Shipped };

std::string_view label(OrderState state) {
    switch (state) {
        case OrderState::Pending: return "Pending";
        case OrderState::Paid:    return "Paid";
        case OrderState::Shipped: return "Shipped";
    }
    return "Unknown";
}
}  // namespace shop

int main() {
    std::string email{"dev@codehub.dev"};
    auto at = email.find('@');
    if (at != std::string::npos) {
        std::cout << "Domain: " << email.substr(at + 1) << "\\n";
    }
    std::cout << "State: " << shop::label(shop::OrderState::Paid) << "\\n";
    return 0;
}`,
            output: `Domain: codehub.dev
State: Paid`,
          },
          tip: 'Never dereference an empty std::optional (*opt) without checking if (opt) first—use opt.value_or(default) whenever a sensible fallback exists.',
        },
      ],
      challenge: {
        prompt:
          'Write std::optional<double> parse_positive(double x) that returns x if x > 0.0 and std::nullopt otherwise. In main(), test it with 42.5 and -5.0, printing the result using .value_or(0.0).',
        hint: 'Include <iostream> and <optional>. Inside parse_positive, write if (x > 0.0) return x; return std::nullopt;.',
        language: 'cpp',
        solutionCode: `#include <iostream>
#include <optional>

std::optional<double> parse_positive(double x) {
    if (x > 0.0) return x;
    return std::nullopt;
}

int main() {
    std::cout << "Valid:   " << parse_positive(42.5).value_or(0.0) << "\\n";
    std::cout << "Invalid: " << parse_positive(-5.0).value_or(0.0) << "\\n";
    return 0;
}`,
      },
      quiz: [
        {
          question: 'What happens when you write for (auto s : names) where names is a std::vector<std::string>?',
          options: [
            's is automatically a const reference with zero copies',
            'Each std::string element is copied by value because plain auto drops references and const',
            'It fails to compile without &',
            'It moves elements out of names',
          ],
          answer: 1,
          explanation:
            'Plain auto deduces std::string by value and makes a copy on every iteration. Use for (const auto& s : names) to avoid copying.',
        },
        {
          question: 'Why is enum class preferred over plain enum in Modern C++?',
          options: [
            'enum class uses less CPU during switch statements',
            'enum class keeps enumerator names scoped and forbids implicit conversion to int',
            'Plain enum was removed in C++17',
            'enum class automatically converts to std::string',
          ],
          answer: 1,
          explanation:
            'Scoped enums prevent name collisions in the enclosing scope and catch accidental comparisons with integers or unrelated enums at compile time.',
        },
      ],
    },
    km: {
      duration: '12 នាទី',
      objectives: [
        'ជ្រើសរើសរបៀបបញ្ជូនប៉ារ៉ាម៉ែត្រល្អបំផុត (value, const T&, T&, std::string_view)',
        'តំណាងលទ្ធផលដែលអាចគ្មានតម្លៃយ៉ាងស្អាតដោយប្រើ C++17 std::optional<T>',
        'ជៀសវាងការចម្លងទិន្នន័យដោយអចេតនាពេលប្រើ auto ដោយសរសេរ const auto&',
        'បង្កើតស្ថានភាពមានសុវត្ថិភាពប្រភេទទិន្នន័យជាមួយ enum class និង namespaces',
      ],
      extraSections: [
        {
          id: 'optional-const-and-auto',
          heading: 'std::optional, const Correctness និងអន្ទាក់ auto',
          body: [
            'ពីមុន អនុគមន៍ C/C++ ច្រើនត្រឡប់ -1 ឬអត្ថបទទទេដើម្បីបង្ហាញថា "រកមិនឃើញ"។ C++17 ដោះស្រាយបញ្ហានេះដោយ std::optional<T>៖ ជាប្រអប់លើ stack ដែលអាចផ្ទុកតម្លៃពិត ឬ std::nullopt ព្រមទាំងមាន .has_value() និង .value_or(fallback) ងាយស្រួលប្រើ។',
            'auto ជួយកាត់បន្ថយការសរសេរប្រភេទដដែលៗ ប៉ុន្តែត្រូវចាំច្បាប់សំខាន់មួយ៖ auto ទទេនឹងដក reference (&) និង const ចេញ! ការសរសេរ auto name = get_name(); នឹងចម្លង std::string ថ្មី។ ត្រូវសរសេរ const auto& ជានិច្ចពេលចង់ខ្ចីប្រើដោយមិនចម្លង។',
          ],
          points: [
            'ប្រើ std::optional<T> សម្រាប់ការស្វែងរក ឬការបំប្លែងដែលអាចគ្មានលទ្ធផល។',
            'ប្រើ C++17 if-init (if (auto p = port_for("https"); p)) ដើម្បីរក្សាវិសាលភាពអថេរឱ្យតូច។',
            'សរសេរ const auto& ក្នុង range-based for លើ string ឬ struct ដើម្បីកុំឱ្យចម្លងគ្រប់ធាតុ។',
            'ដាក់ constexpr លើអនុគមន៍គណនាថេរ ដើម្បីអាចគណនាតាំងពីពេល compile។',
          ],
          table: {
            headers: ['របៀបបញ្ជូនប៉ារ៉ាម៉ែត្រ', 'មានការចម្លង?', 'កែអថេរអ្នកហៅ?', 'ប្រើនៅពេលណា'],
            rows: [
              ['int / double (by value)', 'ចម្លងតូចលឿន', 'ទេ', 'ប្រភេទតូចៗ (<= 16 bytes)'],
              ['const T&', 'ទេ', 'ទេ', 'អានតែប៉ុណ្ណោះលើ structs, vectors, strings'],
              ['T&', 'ទេ', 'បាទ', 'កែប្រែអថេរដើមផ្ទាល់'],
              ['std::string_view', 'ទេ (ptr + len)', 'ទេ', 'អានអត្ថបទពី std::string ឬ literal'],
            ],
          },
          exampleTitle: 'ការស្វែងរកសុវត្ថិភាពជាមួយ std::optional និង if-init',
          warning:
            'កុំត្រឡប់ reference (const std::string&) ទៅអថេរក្នុងអនុគមន៍! អថេរនោះត្រូវបានបំផ្លាញពេលអនុគមន៍ return បន្សល់ទុក dangling reference និង Undefined Behavior។ ត្រូវត្រឡប់ std::string តាមតម្លៃ (compiler នឹងបង្កើនល្បឿនដោយ RVO)។',
        },
        {
          id: 'enum-class-and-namespaces',
          heading: 'Scoped enum class, Namespaces និង std::string',
          body: [
            'enum ចាស់បែប C បញ្ចេញឈ្មោះចូល scope ជុំវិញ និងបំប្លែងទៅជា int ដោយស្វ័យប្រវត្តិ ដែលងាយបង្កកំហុសប្រៀបធៀបខុសប្រភេទ។ C++ ទំនើបប្រើ enum class ដើម្បីរក្សាឈ្មោះក្នុង scope (OrderState::Paid) និងហាមការបំប្លែងស្ងាត់ៗទៅ int។',
            'ផ្ដុំកូដពាក់ព័ន្ធក្នុង namespace (namespace shop { ... }) ដើម្បីកុំឱ្យជាន់ឈ្មោះគ្នា និងប្រើ methods របស់ std::string ដូចជា .empty(), .find() និង .substr() ជំនួសឱ្យអនុគមន៍ C string ចាស់ៗ។',
          ],
          points: [
            'ពិនិត្យលទ្ធផល .find() ជាមួយ std::string::npos ជានិច្ច (មិនមែន -1 ឬ 0 ទេ)។',
            'C++17 អនុញ្ញាតឱ្យសរសេរ nested namespace ខ្លីស្អាត៖ namespace app::billing { ... }។',
            'ប្រើ enum class ជានិច្ចជំនួស enum ធម្មតាក្នុងកូដ C++ ថ្មីទាំងអស់។',
          ],
          exampleTitle: 'enum class ក្នុង Namespace និងការកាត់ std::string',
          tip: 'កុំ dereference std::optional (*opt) ដោយមិនបានពិនិត្យ if (opt) ជាមុន—ប្រើ opt.value_or(default) នៅពេលមានតម្លៃជំនួស។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ std::optional<double> parse_positive(double x) ដែលត្រឡប់ x ប្រសិនបើ x > 0.0 និងត្រឡប់ std::nullopt បើមិនដូច្នោះ។ ក្នុង main() សាកល្បងជាមួយ 42.5 និង -5.0 ហើយបង្ហាញលទ្ធផលដោយប្រើ .value_or(0.0)។',
        hint: 'បញ្ចូល <iostream> និង <optional>។ ក្នុង parse_positive ពិនិត្យ if (x > 0.0) return x; ផ្សេងពីនេះ return std::nullopt;។',
      },
      quiz: [
        {
          question: 'តើមានអ្វីកើតឡើងពេលសរសេរ for (auto s : names) ដែល names ជា std::vector<std::string>?',
          options: [
            's ជា const reference ដោយស្វ័យប្រវត្តិគ្មានការចម្លង',
            'រាល់ធាតុ std::string ត្រូវបានចម្លងថ្មីទាំងអស់ ព្រោះ auto ទទេដក reference និង const ចេញ',
            'Compile មិនជាប់បើគ្មាន &',
            'វាផ្លាស់ទីធាតុចេញពី names',
          ],
          answer: 1,
          explanation:
            'auto ទទេកាត់ & និង const ចេញ ដូច្នេះវាចម្លង std::string គ្រប់ជុំ។ ត្រូវសរសេរ for (const auto& s : names) ដើម្បីជៀសវាងការចម្លង។',
        },
        {
          question: 'ហេតុអ្វី enum class ល្អជាង enum ធម្មតាក្នុង Modern C++?',
          options: [
            'enum class ប្រើ CPU តិចជាងក្នុង switch',
            'enum class រក្សាឈ្មោះក្នុង scope ខ្លួនឯង និងហាមការបំប្លែងស្វ័យប្រវត្តិទៅជា int',
            'enum ធម្មតាត្រូវបានលុបចោលក្នុង C++17',
            'enum class បំប្លែងទៅជា std::string ដោយស្វ័យប្រវត្តិ',
          ],
          answer: 1,
          explanation:
            'Scoped enums ការពារការជាន់ឈ្មោះក្នុង scope ជុំវិញ និងចាប់កំហុសការប្រៀបធៀបខុសប្រភេទជាមួយ int តាំងពីពេល compile។',
        },
      ],
    },
  },

  'cpp/stl-vectors-and-maps': {
    en: {
      duration: '13 min',
      objectives: [
        'Use std::vector::reserve() and emplace_back() to avoid repeated heap reallocations',
        'Prevent iterator and reference invalidation bugs when mutating vectors',
        'Choose between std::vector, std::array, std::map, and std::unordered_map by complexity',
        'Avoid silent insertion from map[key] by using .find() or .contains() for read-only lookups',
      ],
      extraSections: [
        {
          id: 'vector-capacity-and-invalidation',
          heading: 'std::vector Growth, reserve() & Iterator Invalidation',
          body: [
            'A std::vector manages two counts: size() (active elements) and capacity() (allocated slots). When push_back() hits capacity, the vector allocates a larger contiguous block (typically 1.5x–2x), moves all existing elements over, and frees the old buffer. If you know roughly how many items you will insert, calling v.reserve(n) once upfront eliminates every intermediate reallocation.',
            'Index with v[i] when bounds are already guaranteed (zero overhead), or v.at(i) when you want a std::out_of_range exception on invalid indices. Prefer emplace_back(args...) over push_back(Obj(args...)) when constructing non-trivial objects directly inside the vector’s buffer.',
          ],
          points: [
            'Always default to std::vector—contiguous memory maximizes CPU cache locality and beats std::list in almost every real benchmark.',
            'Use std::array<T, N> when size N is fixed at compile time (zero heap allocation).',
            'Call v.reserve(expected) before large push_back loops; reserve() changes capacity(), NOT size().',
            'Use C++20 std::erase_if(vec, pred) to remove matching items cleanly in O(n).',
          ],
          table: {
            headers: ['STL Container', 'Memory Layout', 'Lookup / Access', 'Best Use Case'],
            rows: [
              ['std::vector<T>', 'Contiguous heap', 'O(1) index', 'Default dynamic list (90% of cases)'],
              ['std::array<T, N>', 'Contiguous stack', 'O(1) index', 'Fixed compile-time size buffers'],
              ['std::unordered_map', 'Hash table', 'O(1) avg key', 'Fast key-value lookup, no order needed'],
              ['std::map', 'Red-black tree', 'O(log n) key', 'Sorted keys, range queries (lower_bound)'],
              ['std::unordered_set', 'Hash table', 'O(1) avg', 'Deduplication & fast membership tests'],
            ],
          },
          example: {
            title: 'Pre-Allocating Capacity with reserve() & Safe .at()',
            language: 'cpp',
            code: `#include <iostream>
#include <stdexcept>
#include <vector>

int main() {
    std::vector<int> nums;
    nums.reserve(8);
    for (int i = 1; i <= 5; ++i) {
        nums.push_back(i * 10);
    }
    std::cout << "size=" << nums.size() << " capacity=" << nums.capacity() << "\\n";

    try {
        std::cout << "valid at(2)=" << nums.at(2) << "\\n";
        std::cout << nums.at(99) << "\\n";
    } catch (const std::out_of_range& ex) {
        std::cout << "Caught bounds error safely\\n";
    }
    return 0;
}`,
            output: `size=5 capacity=8
valid at(2)=30
Caught bounds error safely`,
          },
          warning:
            'When push_back() triggers reallocation, EVERY existing iterator, pointer, and reference into that std::vector becomes invalid (dangling)! Never store int& first = v[0]; and keep using first after pushing more elements.',
        },
        {
          id: 'safe-map-lookups-and-spans',
          heading: 'Safe Map Lookups (.find / .contains) & Zero-Copy Views',
          body: [
            'One of the sneakiest C++ bugs comes from reading a map with operator[]: if "debug" is not in counts, evaluating counts["debug"] silently INSERTS {"debug", 0} into the map—mutating it and failing to compile on const maps! Use .find(key) (or C++20 .contains(key)) whenever you only want to read.',
            'Choose std::unordered_map when you need O(1) average lookup speed and order does not matter, and std::map when you need keys kept in sorted order or want prefix/range queries via lower_bound(). For passing a read-only slice of a vector or C array into a helper function, C++20 std::span<const int> works with zero copies.',
          ],
          points: [
            'Use counts[key]++ intentionally when building a frequency table (default 0 is convenient there).',
            'Use if (auto it = m.find(key); it != m.end()) for read-only lookups without accidental insertions.',
            'Prefer .try_emplace(key, args...) (C++17) to insert only if absent without constructing a wasted temporary.',
          ],
          example: {
            title: 'Frequency Counting & Non-Mutating .find() Lookup',
            language: 'cpp',
            code: `#include <iostream>
#include <map>
#include <string>
#include <vector>

int main() {
    std::vector<std::string> events = {"ok", "err", "ok", "warn", "ok"};
    std::map<std::string, int> counts;
    for (const auto& ev : events) {
        counts[ev]++;  // Intentional default-insert to 0, then increment
    }

    if (auto it = counts.find("critical"); it != counts.end()) {
        std::cout << "critical: " << it->second << "\\n";
    } else {
        std::cout << "critical: 0 (not inserted, map size=" << counts.size() << ")\\n";
    }

    for (const auto& [name, total] : counts) {
        std::cout << name << "=" << total << " ";
    }
    std::cout << "\\n";
    return 0;
}`,
            output: `critical: 0 (not inserted, map size=3)
err=1 ok=3 warn=1 `,
          },
          tip: 'Structured bindings (for (const auto& [k, v] : map)) work cleanly on std::map and std::unordered_map and avoid writing it->first / it->second everywhere.',
        },
      ],
      challenge: {
        prompt:
          'Given std::vector<std::string> logs = {"info", "err", "info", "warn", "err", "err"}; count each log level in a std::unordered_map<std::string, int>, then look up "debug" WITHOUT inserting it into the map and print both the "err" count and the final map size (should be 3).',
        hint: 'Count with counts[level]++, then use auto it = counts.find("debug"); int debug_count = (it != counts.end()) ? it->second : 0;.',
        language: 'cpp',
        solutionCode: `#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>

int main() {
    std::vector<std::string> logs = {"info", "err", "info", "warn", "err", "err"};
    std::unordered_map<std::string, int> counts;
    for (const auto& level : logs) {
        counts[level]++;
    }

    auto it = counts.find("debug");
    int debug_count = (it != counts.end()) ? it->second : 0;
    std::cout << "err=" << counts.at("err")
              << " | debug=" << debug_count
              << " | map size=" << counts.size() << "\\n";
    return 0;
}`,
      },
      quiz: [
        {
          question: 'What happens when you evaluate prices["missing"] on a std::unordered_map<std::string, int>?',
          options: [
            'It throws std::out_of_range',
            'It returns std::nullopt',
            'It silently inserts "missing" with value 0 into the map and returns a reference to it',
            'It fails to compile',
          ],
          answer: 2,
          explanation:
            'operator[] on maps creates a default-initialized entry if the key does not exist. Use .find() or .at() for non-mutating reads.',
        },
        {
          question: 'Why is holding a reference int& r = v[0]; across v.push_back(99); dangerous?',
          options: [
            'std::vector forbids taking references to elements',
            'push_back may reallocate the internal buffer to a new memory address, invalidating r into a dangling reference',
            'push_back always overwrites index 0',
            'It causes a compile error',
          ],
          answer: 1,
          explanation:
            'When a vector exceeds capacity, it allocates a new buffer and frees the old one, invalidating all pointers, iterators, and references to its elements.',
        },
      ],
    },
    km: {
      duration: '13 នាទី',
      objectives: [
        'ប្រើ std::vector::reserve() និង emplace_back() ដើម្បីកាត់បន្ថយការកក់អង្គចងចាំដដែលៗ',
        'ការពារកំហុស iterator និង reference invalidation ពេលបន្ថែមធាតុចូល vector',
        'ជ្រើសរើសរវាង std::vector, std::array, std::map និង std::unordered_map តាមល្បឿន និងតម្រូវការ',
        'ជៀសវាងការបញ្ចូល key ដោយស្ងាត់ៗពី map[key] ដោយប្រើ .find() ឬ .contains()',
      ],
      extraSections: [
        {
          id: 'vector-capacity-and-invalidation',
          heading: 'ការពង្រីក std::vector, reserve() និង Iterator Invalidation',
          body: [
            'std::vector គ្រប់គ្រងចំនួនពីរ៖ size() (ធាតុដែលកំពុងមាន) និង capacity() (ទំហំដែលបានកក់ទុក)។ ពេល push_back() ពេញ capacity វានឹងកក់ប្លុកថ្មីធំជាងមុន (ជាធម្មតា 1.5x–2x) ផ្លាស់ទីធាតុចាស់ទាំងអស់ ហើយដោះលែងប្លុកចាស់។ ការហៅ v.reserve(n) ទុកមុនលុបបំបាត់ការកក់ឡើងវិញទាំងនេះ។',
            'ប្រើ v[i] ពេលប្រាកដថាសន្ទស្សន៍ត្រឹមត្រូវ (លឿនបំផុត) ឬប្រើ v.at(i) ដើម្បីឱ្យបោះ exception std::out_of_range ពេលលើសដែន។ ប្រើ emplace_back(args...) ដើម្បីបង្កើត object ផ្ទាល់ក្នុងអង្គចងចាំរបស់ vector។',
          ],
          points: [
            'ជ្រើសរើស std::vector ជាជម្រើសលំនាំដើម—អង្គចងចាំជាប់គ្នាផ្ដល់ល្បឿន CPU cache ល្អជាង std::list ឆ្ងាយ។',
            'ប្រើ std::array<T, N> នៅពេលទំហំ N ថេរតាំងពីពេល compile (មិនប្រើ heap)។',
            'ហៅ v.reserve(expected) មុនរង្វិលជុំ push_back ធំៗ (reserve ប្ដូរតែ capacity មិនប្ដូរ size ទេ)។',
            'ប្រើ C++20 std::erase_if(vec, pred) ដើម្បីលុបធាតុតាមលក្ខខណ្ឌយ៉ាងស្អាតក្នុង O(n)។',
          ],
          table: {
            headers: ['STL Container', 'រចនាសម្ព័ន្ធអង្គចងចាំ', 'ល្បឿនស្វែងរក', 'ការប្រើប្រាស់ល្អបំផុត'],
            rows: [
              ['std::vector<T>', 'ជាប់គ្នាលើ heap', 'O(1) តាមសន្ទស្សន៍', 'បញ្ជីលំនាំដើម (90% នៃករណី)'],
              ['std::array<T, N>', 'ជាប់គ្នាលើ stack', 'O(1) តាមសន្ទស្សន៍', 'Buffer ទំហំថេរពេល compile'],
              ['std::unordered_map', 'Hash table', 'O(1) មធ្យម', 'ស្វែងរក key-value លឿន មិនត្រូវការលំដាប់'],
              ['std::map', 'Red-black tree', 'O(log n)', 'Key តម្រៀបតាមលំដាប់ និង range queries'],
              ['std::unordered_set', 'Hash table', 'O(1) មធ្យម', 'លុបតម្លៃស្ទួន និងពិនិត្យវត្តមានលឿន'],
            ],
          },
          exampleTitle: 'ការកក់ Capacity ទុកមុនជាមួយ reserve() និង .at()',
          warning:
            'នៅពេល push_back() បង្កឱ្យមាន reallocation រាល់ iterator, pointer និង reference ចាស់ទាំងអស់ទៅកាន់ std::vector នោះនឹងខូច (dangling) ភ្លាម! កុំរក្សា int& first = v[0]; ហើយប្រើវាបន្តក្រោយពេល push_back។',
        },
        {
          id: 'safe-map-lookups-and-spans',
          heading: 'ការស្វែងរកសុវត្ថិភាពលើ Map (.find / .contains)',
          body: [
            'កំហុសលាក់កំបាំងមួយក្នុង C++ គឺការអាន map ដោយ operator[]៖ បើ "debug" មិនមានក្នុង counts ការសរសេរ counts["debug"] នឹងបញ្ចូល {"debug", 0} ចូលក្នុង map ដោយស្ងាត់ៗ! ត្រូវប្រើ .find(key) (ឬ C++20 .contains(key)) ជានិច្ចសម្រាប់ការអានដោយមិនកែប្រែ។',
            'ជ្រើសរើស std::unordered_map ពេលត្រូវការល្បឿន O(1) ជាមធ្យម និងជ្រើស std::map ពេលត្រូវការ key តម្រៀបតាមលំដាប់ ឬប្រើ lower_bound()។',
          ],
          points: [
            'ប្រើ counts[key]++ ដោយចេតនាពេលរាប់ភាពញឹកញាប់ (ព្រោះតម្លៃដំបូង 0 មានប្រយោជន៍)។',
            'ប្រើ if (auto it = m.find(key); it != m.end()) សម្រាប់ការអានដោយមិនបញ្ចូល key ថ្មី។',
            'ប្រើ .try_emplace(key, args...) (C++17) ដើម្បីបញ្ចូលតែពេលគ្មាន key ដោយមិនបង្កើត object ឥតប្រយោជន៍។',
          ],
          exampleTitle: 'ការរាប់ភាពញឹកញាប់ និងការស្វែងរកដោយ .find()',
          tip: 'ប្រើ structured bindings (for (const auto& [k, v] : map)) ដើម្បីអាន key និង value យ៉ាងស្អាតជំនួសឱ្យ it->first និង it->second។',
        },
      ],
      challenge: {
        prompt:
          'ដោយមាន std::vector<std::string> logs = {"info", "err", "info", "warn", "err", "err"}; សូមរាប់កម្រិត log នីមួយៗក្នុង std::unordered_map<std::string, int> រួចស្វែងរក "debug" ដោយមិនបញ្ចូលវាចូល map ហើយបង្ហាញចំនួន "err" និងទំហំ map (ត្រូវតែជា 3)។',
        hint: 'រាប់ដោយ counts[level]++ រួចប្រើ auto it = counts.find("debug"); ដើម្បីយកតម្លៃ ឬ 0 ដោយមិនបង្កើត key ថ្មី។',
      },
      quiz: [
        {
          question: 'តើមានអ្វីកើតឡើងពេលដំណើរការ prices["missing"] លើ std::unordered_map<std::string, int>?',
          options: [
            'បោះ exception std::out_of_range',
            'ត្រឡប់ std::nullopt',
            'បញ្ចូល "missing" ជាមួយតម្លៃ 0 ចូលក្នុង map ដោយស្ងាត់ៗ ហើយត្រឡប់ reference ទៅវា',
            'Compile មិនជាប់',
          ],
          answer: 2,
          explanation:
            'operator[] លើ map បង្កើតធាតុថ្មីដែលមានតម្លៃលំនាំដើម (0) ប្រសិនបើគ្មាន key នោះ។ ត្រូវប្រើ .find() ឬ .at() សម្រាប់ការអាន។',
        },
        {
          question: 'ហេតុអ្វីការរក្សា reference int& r = v[0]; ឆ្លងកាត់ v.push_back(99); មានគ្រោះថ្នាក់?',
          options: [
            'std::vector ហាមមិនឱ្យយក reference ទៅធាតុ',
            'push_back អាចកក់ buffer ថ្មីនៅអាសយដ្ឋានផ្សេង ធ្វើឱ្យ r ក្លាយជា dangling reference',
            'push_back តែងតែសរសេរជាន់លើសន្ទស្សន៍ 0',
            'វាបង្កកំហុស compile error',
          ],
          answer: 1,
          explanation:
            'ពេល vector ពេញ capacity វាកក់អង្គចងចាំថ្មី និងដោះលែងអង្គចងចាំចាស់ ធ្វើឱ្យ pointer, iterator និង reference ចាស់ទាំងអស់ខូច។',
        },
      ],
    },
  },

  'cpp/classes-and-raii': {
    en: {
      duration: '14 min',
      objectives: [
        'Write idiomatic classes using member initializer lists, explicit constructors, and const methods',
        'Choose properly among std::unique_ptr, std::shared_ptr, std::weak_ptr, and non-owning raw pointers',
        'Prevent memory leaks from std::shared_ptr reference cycles using std::weak_ptr',
        'Design safe polymorphic base classes with virtual destructors and override specifiers',
      ],
      extraSections: [
        {
          id: 'constructors-and-smart-pointers',
          heading: 'Member Initializers, Smart Pointers & Reference Cycles',
          body: [
            'Always initialize class members using a member initializer list (: name_(std::move(name)), id_(id)) rather than assigning inside the constructor body—initializer lists construct members directly in one step and are required for const and reference members. Mark single-argument constructors explicit so the compiler cannot perform surprising implicit conversions, and mark read-only methods const.',
            'Modern C++ models ownership directly in the type system: std::unique_ptr expresses exclusive ownership with zero runtime overhead (move-only via std::move), std::shared_ptr expresses shared ownership via an atomic reference count, and std::weak_ptr observes a shared_ptr without keeping it alive—breaking ownership cycles cleanly.',
          ],
          points: [
            'Default to stack objects and std::unique_ptr; reach for std::shared_ptr only when ownership is genuinely shared.',
            'Use std::make_unique<T>() and std::make_shared<T>()—never bare new or delete in application code.',
            'Non-owning raw pointers (T*) or references (T&) are still idiomatic in C++ when a function merely borrows an object without owning its lifetime.',
            'Follow the Rule of Zero: if your class only owns STL containers and smart pointers, write NO custom destructor, copy, or move operations.',
          ],
          table: {
            headers: ['Pointer Type', 'Ownership', 'Overhead', 'When to Use'],
            rows: [
              ['std::unique_ptr<T>', 'Exclusive (move-only)', 'Zero vs raw T*', 'Default heap ownership, factories, PIMPL'],
              ['std::shared_ptr<T>', 'Shared (ref-counted)', 'Control block + atomic', 'Multiple owners with unclear last survivor'],
              ['std::weak_ptr<T>', 'Non-owning observer', 'Locks to shared_ptr', 'Breaking shared_ptr cycles, caches'],
              ['T* / T& (raw)', 'Non-owning borrow', 'Zero', 'Passing/observing objects owned elsewhere'],
            ],
          },
          example: {
            title: 'RAII Scope Guard & unique_ptr Ownership Transfer',
            language: 'cpp',
            code: `#include <iostream>
#include <memory>
#include <string>
#include <utility>

class ScopeTrace {
    std::string label_;
public:
    explicit ScopeTrace(std::string label) : label_(std::move(label)) {
        std::cout << "[enter] " << label_ << "\\n";
    }
    ~ScopeTrace() { std::cout << "[exit]  " << label_ << "\\n"; }
};

void consume(std::unique_ptr<int> ptr) {
    std::cout << "Consumed value: " << *ptr << "\\n";
}

int main() {
    ScopeTrace guard{"transaction"};
    auto data = std::make_unique<int>(99);
    consume(std::move(data));  // Transfers ownership cleanly
    std::cout << "Moved-from is null? " << (data == nullptr ? "yes" : "no") << "\\n";
    return 0;
}`,
            output: `[enter] transaction
Consumed value: 99
Moved-from is null? yes
[exit]  transaction`,
          },
          warning:
            'If object A holds a std::shared_ptr<B> and object B holds a std::shared_ptr<A>, their reference counts stay at 1 forever and NEITHER destructor ever runs (a classic memory leak). Change the back-reference (e.g., child -> parent) to std::weak_ptr.',
        },
        {
          id: 'polymorphism-and-virtual-destructors',
          heading: 'Polymorphism, override & Virtual Destructors',
          body: [
            'To define an interface in C++, declare pure virtual methods ending with = 0 (virtual double area() const = 0;). In every derived class, always append the override keyword: if you accidentally mistype the method name or forget const, the compiler flags an immediate error instead of silently creating a brand-new non-virtual method.',
            'One rule is non-negotiable for polymorphic hierarchies: any base class deleted through a base pointer (like std::unique_ptr<Shape>) MUST declare virtual ~Shape() = default;. Without virtual on the destructor, deleting a Circle via a Shape* invokes only ~Shape() and triggers Undefined Behavior, leaking all derived resources.',
          ],
          points: [
            'Always declare virtual ~Base() = default; on every polymorphic base class.',
            'Always mark derived implementations override (and leaf classes final if not meant to be subclassed).',
            'Store polymorphic objects in std::vector<std::unique_ptr<Base>>, never std::vector<Base> (which causes object slicing!).',
          ],
          example: {
            title: 'Polymorphic Interface with virtual Destructor & override',
            language: 'cpp',
            code: `#include <iostream>
#include <memory>
#include <vector>

class Shape {
public:
    virtual ~Shape() = default;
    virtual double area() const = 0;
};

class Rect final : public Shape {
    double w_, h_;
public:
    Rect(double w, double h) : w_(w), h_(h) {}
    double area() const override { return w_ * h_; }
};

class Circle final : public Shape {
    double r_;
public:
    explicit Circle(double r) : r_(r) {}
    double area() const override { return 3.14159 * r_ * r_; }
};

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Rect>(4.0, 5.0));
    shapes.push_back(std::make_unique<Circle>(2.0));

    for (const auto& s : shapes) {
        std::cout << "Area = " << s->area() << "\\n";
    }
    return 0;
}`,
            output: `Area = 20
Area = 12.5664`,
          },
          tip: 'Never store derived objects by value inside std::vector<Base>—C++ slices off the derived part! Use std::vector<std::unique_ptr<Base>> or std::variant for closed sets of types.',
        },
      ],
      challenge: {
        prompt:
          'Create an abstract base class Notifier with virtual ~Notifier() = default; and virtual void send(const std::string& msg) const = 0;. Implement ConsoleNotifier with override and invoke it through std::unique_ptr<Notifier>.',
        hint: 'Include <iostream>, <memory>, and <string>. Construct it with std::unique_ptr<Notifier> n = std::make_unique<ConsoleNotifier>(); and call n->send("Deploy complete");.',
        language: 'cpp',
        solutionCode: `#include <iostream>
#include <memory>
#include <string>

class Notifier {
public:
    virtual ~Notifier() = default;
    virtual void send(const std::string& msg) const = 0;
};

class ConsoleNotifier final : public Notifier {
public:
    void send(const std::string& msg) const override {
        std::cout << "[NOTIFY] " << msg << "\\n";
    }
};

int main() {
    std::unique_ptr<Notifier> notifier = std::make_unique<ConsoleNotifier>();
    notifier->send("Build succeeded!");
    return 0;
}`,
      },
      quiz: [
        {
          question: 'What happens if you delete a Derived object through a Base* (or std::unique_ptr<Base>) when ~Base() is NOT virtual?',
          options: [
            'Both ~Derived() and ~Base() run normally',
            'Undefined Behavior—Derived’s destructor is skipped and its resources may leak',
            'C++ automatically adds virtual to all destructors',
            'It throws std::bad_cast',
          ],
          answer: 1,
          explanation:
            'Deleting a derived object via a base pointer without a virtual base destructor is Undefined Behavior. Always write virtual ~Base() = default;.',
        },
        {
          question: 'Which smart pointer breaks circular ownership cycles between two std::shared_ptr objects?',
          options: ['std::unique_ptr', 'std::weak_ptr', 'std::auto_ptr', 'std::span'],
          answer: 1,
          explanation:
            'std::weak_ptr observes a managed object without incrementing its strong reference count, preventing cyclic leaks.',
        },
      ],
    },
    km: {
      duration: '14 នាទី',
      objectives: [
        'សរសេរ class តាមស្តង់ដារដោយប្រើ member initializer lists, explicit constructors និង const methods',
        'ជ្រើសរើសត្រឹមត្រូវរវាង std::unique_ptr, std::shared_ptr, std::weak_ptr និង non-owning raw pointers',
        'ការពារ memory leak ពីវដ្ដយោង std::shared_ptr ដោយប្រើ std::weak_ptr',
        'រចនា polymorphic base classes ដោយសុវត្ថិភាពជាមួយ virtual destructor និងពាក្យ override',
      ],
      extraSections: [
        {
          id: 'constructors-and-smart-pointers',
          heading: 'Member Initializers, Smart Pointers និង Reference Cycles',
          body: [
            'ត្រូវកំណត់តម្លៃដំបូងឱ្យសមាជិក class តាម member initializer list (: name_(std::move(name)), id_(id)) ជំនួសឱ្យការសរសេរក្នុងតួ constructor ព្រោះវាបង្កើតសមាជិកផ្ទាល់ក្នុងមួយជំហាន។ ដាក់ explicit លើ constructor ដែលមានប៉ារ៉ាម៉ែត្រ 1 ដើម្បីការពារការបំប្លែងស្ងាត់ៗ និងដាក់ const លើ method ដែលអានតែប៉ុណ្ណោះ។',
            'C++ ទំនើបបង្ហាញកម្មសិទ្ធិអង្គចងចាំតាមប្រភេទទិន្នន័យ៖ std::unique_ptr សម្រាប់កម្មសិទ្ធិផ្ដាច់មុខគ្មានការចំណាយបន្ថែម (ផ្ទេរដោយ std::move), std::shared_ptr សម្រាប់កម្មសិទ្ធិរួម និង std::weak_ptr សម្រាប់តាមដានដោយមិនបង្កើន reference count។',
          ],
          points: [
            'ប្រើ stack objects និង std::unique_ptr ជាជម្រើសលំនាំដើម ហើយប្រើ std::shared_ptr តែពេលមានម្ចាស់ច្រើនពិតប្រាកដ។',
            'ប្រើ std::make_unique<T>() និង std::make_shared<T>()—កុំប្រើ new និង delete ដោយដៃ។',
            'Raw pointer (T*) ឬ reference (T&) នៅតែប្រើបានល្អសម្រាប់ការខ្ចីប្រើដោយគ្មានកម្មសិទ្ធិ។',
            'អនុវត្ត Rule of Zero៖ បើ class មានតែ STL containers និង smart pointers មិនចាំបាច់សរសេរ destructor ផ្ទាល់ខ្លួនទេ។',
          ],
          table: {
            headers: ['ប្រភេទ Pointer', 'កម្មសិទ្ធិ', 'ការចំណាយបន្ថែម', 'ពេលណាគួរប្រើ'],
            rows: [
              ['std::unique_ptr<T>', 'ផ្ដាច់មុខ (move-only)', 'គ្មាន (ស្មើ raw T*)', 'កម្មសិទ្ធិលើ heap លំនាំដើម, factories'],
              ['std::shared_ptr<T>', 'កម្មសិទ្ធិរួម (ref-count)', 'Control block + atomic', 'ម្ចាស់ច្រើនដែលមិនដឹងអ្នកណាចប់ក្រោយគេ'],
              ['std::weak_ptr<T>', 'តាមដានគ្មានកម្មសិទ្ធិ', 'Lock ទៅ shared_ptr', 'បំបែកវដ្ដ shared_ptr, caches'],
              ['T* / T& (raw)', 'ខ្ចីប្រើគ្មានកម្មសិទ្ធិ', 'គ្មាន', 'បញ្ជូន object ដែលមានម្ចាស់រួចហើយ'],
            ],
          },
          exampleTitle: 'RAII Scope Guard និងការផ្ទេរកម្មសិទ្ធិ unique_ptr',
          warning:
            'ប្រសិនបើ object A កាន់ std::shared_ptr<B> ហើយ B កាន់ std::shared_ptr<A> ចំនួនយោងនឹងនៅជាប់ 1 ជារៀងរហូត ហើយ destructor មិនដំណើរការឡើយ (memory leak)។ ត្រូវប្ដូរការយោងត្រឡប់ទៅជា std::weak_ptr។',
        },
        {
          id: 'polymorphism-and-virtual-destructors',
          heading: 'Polymorphism, override និង Virtual Destructors',
          body: [
            'ដើម្បីបង្កើត interface ក្នុង C++ សូមប្រកាស pure virtual methods ដែលបញ្ចប់ដោយ = 0។ ក្នុង derived class ត្រូវដាក់ពាក្យ override ជានិច្ច ដើម្បីឱ្យ compiler ចាប់កំហុសភ្លាមៗបើអ្នកវាយឈ្មោះ method ឬ const ខុស។',
            'ច្បាប់ដាច់ខាតសម្រាប់ polymorphic base class៖ គ្រប់ base class ដែលត្រូវបានលុបតាម base pointer (ដូចជា std::unique_ptr<Shape>) ត្រូវតែមាន virtual ~Shape() = default;។ បើគ្មាន virtual ការលុបនឹងបង្ក Undefined Behavior និងលេចធ្លាយធនធានរបស់ derived class។',
          ],
          points: [
            'ប្រកាស virtual ~Base() = default; លើគ្រប់ polymorphic base class ជានិច្ច។',
            'ដាក់ override លើគ្រប់ method ដែលបំពេញបន្ថែម (និង final លើ class ដែលមិនចង់ឱ្យស្នងបន្ត)។',
            'រក្សាទុក polymorphic objects ក្នុង std::vector<std::unique_ptr<Base>> កុំប្រើ std::vector<Base> (បង្ក object slicing)។',
          ],
          exampleTitle: 'Polymorphic Interface ជាមួយ virtual Destructor និង override',
          tip: 'កុំរក្សា derived objects តាមតម្លៃក្នុង std::vector<Base> ព្រោះ C++ នឹងកាត់ផ្នែក derived ចោល (object slicing)។ ប្រើ std::vector<std::unique_ptr<Base>> ជំនួស។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើត abstract base class ឈ្មោះ Notifier ដែលមាន virtual ~Notifier() = default; និង virtual void send(const std::string& msg) const = 0;។ បង្កើត ConsoleNotifier ជាមួយ override រួចហៅវាតាម std::unique_ptr<Notifier>។',
        hint: 'បញ្ចូល <iostream>, <memory>, <string>។ បង្កើតដោយ std::unique_ptr<Notifier> n = std::make_unique<ConsoleNotifier>(); ហើយហៅ n->send("Build succeeded!");។',
      },
      quiz: [
        {
          question: 'តើមានអ្វីកើតឡើងប្រសិនបើលុប Derived object តាមរយៈ Base* (ឬ std::unique_ptr<Base>) នៅពេល ~Base() មិនមែនជា virtual?',
          options: [
            'ទាំង ~Derived() និង ~Base() ដំណើរការធម្មតា',
            'Undefined Behavior—destructor របស់ Derived មិនដំណើរការ ហើយធនធានរបស់វាអាចលេចធ្លាយ',
            'C++ បន្ថែម virtual លើគ្រប់ destructor ដោយស្វ័យប្រវត្តិ',
            'បោះ exception std::bad_cast',
          ],
          answer: 1,
          explanation:
            'ការលុប derived object តាម base pointer ដោយគ្មាន virtual destructor គឺជា Undefined Behavior។ ត្រូវប្រកាស virtual ~Base() = default; ជានិច្ច។',
        },
        {
          question: 'តើ smart pointer ណាមួយប្រើសម្រាប់បំបែកវដ្ដកម្មសិទ្ធិ (circular cycle) រវាង std::shared_ptr ពីរ?',
          options: ['std::unique_ptr', 'std::weak_ptr', 'std::auto_ptr', 'std::span'],
          answer: 1,
          explanation:
            'std::weak_ptr តាមដាន object ដោយមិនបង្កើន strong reference count ដែលជួយការពារ memory leak ពីវដ្ដយោង។',
        },
      ],
    },
  },

  'cpp/templates-and-algorithms': {
    en: {
      duration: '14 min',
      objectives: [
        'Replace error-prone raw loops with <algorithm> and <numeric> primitives (find_if, count_if, transform, accumulate)',
        'Control lambda capture lists safely ([], [x], [&total]) and avoid dangling reference captures',
        'Write reusable class templates and understand why template definitions live in headers',
        'Constrain generic templates cleanly with C++20 concepts for crystal-clear compiler errors',
      ],
      extraSections: [
        {
          id: 'lambdas-and-stl-algorithms',
          heading: 'STL Algorithms & Lambda Capture Rules',
          body: [
            'Sean Parent’s famous C++ guideline is "No raw loops": whenever you are searching, counting, transforming, partitioning, or folding a range, the C++ standard library (<algorithm> and <numeric>) already ships a heavily tested, self-documenting building block. Algorithms work on iterator pairs (begin, end)—or directly on whole containers with C++20 std::ranges.',
            'Lambdas ([captures](params) { body }) supply inline predicates and projections right where you need them. Always be deliberate about captures: [] captures nothing, [limit] copies limit by value, and [&sum] borrows sum by reference. Explicit captures tell readers immediately which outer variables the lambda touches.',
          ],
          points: [
            'Use std::find_if, std::any_of, and std::all_of to express intent directly instead of manual bool found = false loops.',
            'Include <numeric> for std::accumulate (ensure the initial value type matches, e.g., 0.0 for double, not 0!).',
            'Prefer explicit capture lists ([threshold, &count]) over blanket [=] or [&] in non-trivial lambdas.',
            'Remember: std::sort requires random-access iterators (vector, array, deque); std::list has its own .sort() method.',
          ],
          table: {
            headers: ['Algorithm', 'Header', 'Replaces Raw Loop That...'],
            rows: [
              ['std::find_if', '<algorithm>', 'Finds first element matching a predicate'],
              ['std::count_if', '<algorithm>', 'Counts elements matching a predicate'],
              ['std::transform', '<algorithm>', 'Maps each element into an output range'],
              ['std::accumulate', '<numeric>', 'Folds/sums elements into one aggregate value'],
              ['std::erase_if', '<vector> (C++20)', 'Removes matching items in-place in O(n)'],
            ],
          },
          example: {
            title: 'Counting, Filtering & Accumulating with Lambdas',
            language: 'cpp',
            code: `#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>

int main() {
    std::vector<double> prices = {12.5, 45.0, 8.0, 62.5, 29.0};
    double threshold = 25.0;

    auto premium_count = std::count_if(prices.begin(), prices.end(),
        [threshold](double p) { return p >= threshold; });

    double total = std::accumulate(prices.begin(), prices.end(), 0.0);

    std::cout << "Premium items (>=" << threshold << "): " << premium_count << "\\n";
    std::cout << "Total cart: $" << total << "\\n";
    return 0;
}`,
            output: `Premium items (>=25): 3
Total cart: $157`,
          },
          warning:
            'Capturing local variables by reference ([&] or [&x]) in a lambda that escapes the current function (e.g., returned as a std::function or dispatched to another thread) creates dangling references and Undefined Behavior! Capture by value ([x]) whenever a lambda outlives its creating scope.',
        },
        {
          id: 'class-templates-and-concepts',
          heading: 'Class Templates & C++20 Concepts',
          body: [
            'Class templates let you parameterize entire data structures on types (like Stack<T> or Result<T, E>). Because the compiler instantiates concrete machine code for each distinct type T at compile time, template definitions must normally live in header files (.h / .hpp) where callers can see them—otherwise you will hit unresolved linker errors.',
            'Historically, passing an incompatible type to a template produced pages of cryptic compiler errors. C++20 Concepts (<concepts>) fix this cleanly: constraining a template with template <std::totally_ordered T> or requires std::integral<T> validates the type right at the call site with a single, readable error message.',
          ],
          points: [
            'C++17 CTAD (Class Template Argument Deduction) lets you write Stack s{10}; when constructor arguments reveal T.',
            'Use C++20 concepts (std::integral, std::floating_point, std::totally_ordered) to express type requirements directly in code.',
            'Keep template headers focused to avoid unnecessary compile-time bloat across large projects.',
          ],
          example: {
            title: 'Generic Stack<T> Class Template & Constrained Function',
            language: 'cpp',
            code: `#include <concepts>
#include <iostream>
#include <vector>

template <typename T>
class Stack {
    std::vector<T> items_;
public:
    void push(T value) { items_.push_back(std::move(value)); }
    const T& top() const { return items_.back(); }
    void pop() { items_.pop_back(); }
    bool empty() const { return items_.empty(); }
};

template <std::totally_ordered T>
T clamp_val(const T& val, const T& lo, const T& hi) {
    return (val < lo) ? lo : (val > hi) ? hi : val;
}

int main() {
    Stack<int> st;
    st.push(10);
    st.push(clamp_val(150, 0, 100));
    std::cout << "Top of stack: " << st.top() << "\\n";
    return 0;
}`,
            output: `Top of stack: 100`,
          },
          tip: 'Watch the third argument to std::accumulate: passing integer 0 instead of 0.0 when summing a std::vector<double> silently truncates every addition to int!',
        },
      ],
      challenge: {
        prompt:
          'Using <algorithm> and <numeric> on std::vector<int> scores = {55, 82, 91, 68, 95}; compute how many scores are >= 80 with std::count_if and compute the sum with std::accumulate, then print the count and floating-point average.',
        hint: 'Pass a lambda [](int s) { return s >= 80; } to std::count_if, sum with std::accumulate(scores.begin(), scores.end(), 0), and cast total to double before dividing by scores.size().',
        language: 'cpp',
        solutionCode: `#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>

int main() {
    std::vector<int> scores = {55, 82, 91, 68, 95};
    auto high = std::count_if(scores.begin(), scores.end(),
                              [](int s) { return s >= 80; });
    int sum = std::accumulate(scores.begin(), scores.end(), 0);
    double avg = static_cast<double>(sum) / scores.size();

    std::cout << "Scores >= 80: " << high << " | Average: " << avg << "\\n";
    return 0;
}`,
      },
      quiz: [
        {
          question: 'When is capturing by reference ([&]) in a C++ lambda dangerous?',
          options: [
            'Inside std::sort on a local std::vector',
            'When the lambda is stored or returned and invoked after the captured local variables have been destroyed',
            'When reading an int variable inside the same function',
            'Lambdas in C++ cannot capture by reference',
          ],
          answer: 1,
          explanation:
            'If a lambda outlives the scope where its [&]-captured local variables live, calling it accesses dangling references (Undefined Behavior).',
        },
        {
          question: 'Why are C++ template definitions normally placed in header files (.h / .hpp) instead of .cpp files?',
          options: [
            'The preprocessor deletes templates inside .cpp files',
            'The compiler must see the full template definition at each call site to instantiate code for each concrete type T',
            'Templates only work with inline functions',
            'C++ forbids template classes in .cpp files',
          ],
          answer: 1,
          explanation:
            'Templates are blueprints, not compiled functions; the compiler generates type-specific machine code whenever it sees an instantiation like Stack<int>.',
        },
      ],
    },
    km: {
      duration: '14 នាទី',
      objectives: [
        'ជំនួសរង្វិលជុំដោយដៃជាមួយអនុគមន៍ <algorithm> និង <numeric> (find_if, count_if, transform, accumulate)',
        'គ្រប់គ្រង lambda capture lists ([], [x], [&total]) ដោយសុវត្ថិភាព និងជៀសវាង dangling reference',
        'សរសេរ class templates និងយល់មូលហេតុដែលនិយមន័យ template ត្រូវដាក់ក្នុង header files',
        'កំណត់លក្ខខណ្ឌប្រភេទទិន្នន័យលើ template យ៉ាងស្អាតដោយប្រើ C++20 concepts',
      ],
      extraSections: [
        {
          id: 'lambdas-and-stl-algorithms',
          heading: 'STL Algorithms និងច្បាប់ Lambda Capture',
          body: [
            'គោលការណ៍ល្បីក្នុង C++ គឺ "ជៀសវាង raw loops"៖ នៅពេលអ្នកចង់ស្វែងរក រាប់ បំប្លែង ឬបូកសរុប បណ្ណាល័យ <algorithm> និង <numeric> មានអនុគមន៍ស្តង់ដារដែលបានធ្វើតេស្តរួចស្រេច និងងាយអានគោលបំណងភ្លាមៗ។',
            'Lambdas ([captures](params) { body }) អនុញ្ញាតឱ្យសរសេរលក្ខខណ្ឌខ្លីៗនៅនឹងកន្លែង។ ត្រូវប្រយ័ត្នចំពោះ capture list៖ [] មិនចាប់អ្វីទេ, [limit] ចម្លងតាមតម្លៃ និង [&sum] ខ្ចីតាម reference។ ការសរសេរ capture ច្បាស់លាស់ជួយឱ្យអ្នកអានដឹងភ្លាមថា lambda ប្រើអថេរខាងក្រៅណាខ្លះ។',
          ],
          points: [
            'ប្រើ std::find_if, std::any_of និង std::all_of ជំនួសឱ្យរង្វិលជុំ bool found = false ដោយដៃ។',
            'បញ្ចូល <numeric> សម្រាប់ std::accumulate (ប្រយ័ត្នតម្លៃដំបូង 0.0 សម្រាប់ double មិនមែន 0 ទេ!)។',
            'ប្រើ capture ច្បាស់លាស់ ([threshold, &count]) ជាជាងប្រើ [=] ឬ [&] ទូទៅ។',
            'std::sort ត្រូវការ random-access iterator (vector, array, deque) ចំណែក std::list មាន .sort() ផ្ទាល់ខ្លួន។',
          ],
          table: {
            headers: ['Algorithm', 'Header', 'ជំនួសរង្វិលជុំដោយដៃដែល...'],
            rows: [
              ['std::find_if', '<algorithm>', 'ស្វែងរកធាតុដំបូងដែលត្រូវលក្ខខណ្ឌ'],
              ['std::count_if', '<algorithm>', 'រាប់ចំនួនធាតុដែលត្រូវលក្ខខណ្ឌ'],
              ['std::transform', '<algorithm>', 'បំប្លែងគ្រប់ធាតុទៅជាលទ្ធផលថ្មី'],
              ['std::accumulate', '<numeric>', 'បូកសរុប/បង្រួមធាតុទាំងអស់ជាតម្លៃតែមួយ'],
              ['std::erase_if', '<vector> (C++20)', 'លុបធាតុដែលត្រូវលក្ខខណ្ឌក្នុង O(n)'],
            ],
          },
          exampleTitle: 'ការរាប់ និងបូកសរុបដោយ STL Algorithms និង Lambdas',
          warning:
            'ការចាប់អថេរក្នុងអនុគមន៍តាម reference ([&] ឬ [&x]) ក្នុង lambda ដែលត្រូវបានរក្សាទុក ឬ return ទៅប្រើក្រោយអនុគមន៍បញ្ចប់ នឹងបង្ក dangling reference និង Undefined Behavior! ត្រូវចាប់តាមតម្លៃ ([x]) ពេល lambda រស់យូរជាង scope ដើម។',
        },
        {
          id: 'class-templates-and-concepts',
          heading: 'Class Templates និង C++20 Concepts',
          body: [
            'Class templates អនុញ្ញាតឱ្យបង្កើតរចនាសម្ព័ន្ធទិន្នន័យទូទៅដូចជា Stack<T> ឬ Result<T, E>។ ដោយសារ compiler ត្រូវបង្កើតកូដម៉ាស៊ីនសម្រាប់ប្រភេទ T ជាក់លាក់នីមួយៗពេល compile និយមន័យ template ជាទូទៅត្រូវតែដាក់ក្នុងឯកសារ header (.h / .hpp)។',
            'C++20 Concepts (<concepts>) ជួយដាក់លក្ខខណ្ឌលើប្រភេទ T (ដូចជា template <std::totally_ordered T> ឬ std::integral) ដើម្បីឱ្យ compiler បង្ហាញសារកំហុសខ្លីច្បាស់លាស់ភ្លាមៗនៅកន្លែងហៅប្រើ។',
          ],
          points: [
            'C++17 CTAD អនុញ្ញាតឱ្យ compiler ទាយប្រភេទ T ដោយស្វ័យប្រវត្តិពីប៉ារ៉ាម៉ែត្រ constructor។',
            'ប្រើ C++20 concepts (std::integral, std::floating_point, std::totally_ordered) ដើម្បីបញ្ជាក់លក្ខខណ្ឌប្រភេទទិន្នន័យ។',
            'រក្សា template headers ឱ្យស្អាត និងខ្លី ដើម្បីកុំឱ្យពេល compile យឺត។',
          ],
          exampleTitle: 'Class Template Stack<T> និងអនុគមន៍មាន C++20 Concept',
          tip: 'ប្រយ័ត្នប៉ារ៉ាម៉ែត្រទី 3 របស់ std::accumulate៖ ការដាក់ 0 ជំនួស 0.0 ពេលបូក std::vector<double> នឹងកាត់ផ្នែកទសភាគចោលគ្រប់ជំហាន!',
        },
      ],
      challenge: {
        prompt:
          'ដោយប្រើ <algorithm> និង <numeric> លើ std::vector<int> scores = {55, 82, 91, 68, 95}; សូមរាប់ចំនួនពិន្ទុ >= 80 ដោយ std::count_if គណនាផលបូកដោយ std::accumulate រួចបង្ហាញចំនួន និងមធ្យមភាគជាលេខទសភាគ។',
        hint: 'បញ្ជូន lambda [](int s) { return s >= 80; } ទៅ std::count_if បូកដោយ std::accumulate(scores.begin(), scores.end(), 0) ហើយ cast ទៅ double មុនចែកនឹង scores.size()។',
      },
      quiz: [
        {
          question: 'តើពេលណាដែលការចាប់អថេរតាម reference ([&]) ក្នុង C++ lambda មានគ្រោះថ្នាក់?',
          options: [
            'នៅក្នុង std::sort លើ std::vector ក្នុងអនុគមន៍តែមួយ',
            'នៅពេល lambda ត្រូវបានរក្សាទុក ឬ return ហើយហៅប្រើក្រោយពេលអថេរក្នុងអនុគមន៍ត្រូវបានបំផ្លាញ',
            'ពេលអានអថេរ int ក្នុងអនុគមន៍តែមួយ',
            'C++ lambdas មិនអាចចាប់តាម reference បានទេ',
          ],
          answer: 1,
          explanation:
            'ប្រសិនបើ lambda ត្រូវបានហៅប្រើបន្ទាប់ពី scope របស់អថេរ [&] បានបញ្ចប់ វានឹងអាន dangling reference (Undefined Behavior)។',
        },
        {
          question: 'ហេតុអ្វីនិយមន័យ C++ template ជាទូទៅត្រូវដាក់ក្នុងឯកសារ header (.h / .hpp) ជំនួសឱ្យ .cpp?',
          options: [
            'Preprocessor លុប templates ក្នុងឯកសារ .cpp',
            'Compiler ត្រូវការឃើញនិយមន័យ template ពេញលេញនៅកន្លែងហៅប្រើ ដើម្បីបង្កើតកូដសម្រាប់ប្រភេទ T ជាក់លាក់នីមួយៗ',
            'Templates ដំណើរការតែជាមួយ inline functions',
            'C++ ហាមមិនឱ្យដាក់ template class ក្នុង .cpp',
          ],
          answer: 1,
          explanation:
            'Template គឺជាគំរូកូដ មិនមែនអនុគមន៍ដែល compile រួចទេ—compiler ត្រូវការនិយមន័យពេញលេញពេលឃើញការប្រើប្រាស់ដូចជា Stack<int>។',
        },
      ],
    },
  },

  'cpp/cpp-move-and-concurrency': {
    en: {
      duration: '15 min',
      objectives: [
        'Explain lvalues, rvalues (T&&), and how move semantics transfer heap buffers in O(1)',
        'Avoid dangling std::string_view references and RVO-blocking return std::move(local)',
        'Prevent data races using std::atomic<T> for lock-free counters and std::scoped_lock for shared state',
        'Manage thread lifetimes safely with .join() or C++20 std::jthread to avoid std::terminate()',
      ],
      extraSections: [
        {
          id: 'move-semantics-and-views',
          heading: 'Value Categories, Move Semantics & Non-Owning Views',
          body: [
            'Copying a 10-million-element std::vector allocates a brand-new heap buffer and copies every byte in O(n). Moving it steals the internal pointer, size, and capacity in O(1) and leaves the source empty! Crucially, std::move(x) does not move a single byte by itself—it is simply a compile-time cast telling the compiler "treat x as an rvalue (T&&) so the move constructor or move assignment can take its resources."',
            'For read-only parameters, modern C++ adds lightweight non-owning views: std::string_view (a pointer + length pair) accepts std::string, string literals, and substrings with zero heap allocation, and C++20 std::span<T> does the same for contiguous arrays and vectors.',
          ],
          points: [
            'A moved-from standard library object is in a "valid but unspecified" state: safe to destroy or reassign, not safe to assume old contents.',
            'Never write return std::move(local_var);—plain return local_var; enables Copy Elision / NRVO and falls back to moving automatically.',
            'Pass std::string_view and std::span by VALUE (they are just 16 bytes: pointer + length).',
            'Mark custom move constructors and move assignment operators noexcept so std::vector moves instead of copying during reallocation.',
          ],
          table: {
            headers: ['Mechanism', 'Cost', 'Ownership', 'Watch Out For'],
            rows: [
              ['Copy (T a = b;)', 'O(n) deep copy', 'Both own separate data', 'Expensive for big strings/vectors'],
              ['Move (T a = std::move(b);)', 'O(1) pointer steal', 'Transferred to a', 'Do not read moved-from b’s old value'],
              ['std::string_view', 'O(1) (16 bytes)', 'Non-owning view', 'Must not outlive underlying string!'],
              ['std::span<const T>', 'O(1) (16 bytes)', 'Non-owning slice', 'Must not outlive underlying buffer!'],
            ],
          },
          example: {
            title: 'Zero-Copy Ownership Transfer with std::move',
            language: 'cpp',
            code: `#include <iostream>
#include <utility>
#include <vector>

int main() {
    std::vector<int> src = {10, 20, 30, 40, 50};
    const int* original_addr = src.data();

    std::vector<int> dst = std::move(src);  // O(1) pointer steal

    std::cout << "Same heap buffer? " << (dst.data() == original_addr ? "yes" : "no") << "\\n";
    std::cout << "dst size=" << dst.size() << ", src size=" << src.size() << "\\n";
    return 0;
}`,
            output: `Same heap buffer? yes
dst size=5, src size=0`,
          },
          warning:
            'Never bind a std::string_view to a temporary std::string (e.g., std::string_view sv = std::string("temp") + "!";) or return a std::string_view to a local string. The temporary is destroyed at the semicolon, leaving sv pointing at freed memory (dangling view)!',
        },
        {
          id: 'threads-atomics-and-mutexes',
          heading: 'Threads, std::atomic & Deadlock-Free Locking',
          body: [
            'When two threads access the same memory concurrently and at least one writes without synchronization, C++ defines that as a data race—which is Undefined Behavior (not merely a "slightly wrong number"). For single numeric counters or flags, use std::atomic<int> for fast, lock-free thread safety.',
            'For multi-field invariants or STL containers (which are NOT thread-safe for concurrent writes), guard every access with a std::mutex and RAII std::scoped_lock (C++17). Unlike manually calling lock()/unlock(), std::scoped_lock unlocks automatically even on exceptions and locks multiple mutexes atomically using a deadlock-avoidance algorithm.',
          ],
          points: [
            'Always join() (or detach()) every std::thread before its destructor runs—destroying a joinable std::thread calls std::terminate() and aborts the process!',
            'Prefer C++20 std::jthread, which joins automatically in its destructor and supports cooperative stop tokens.',
            'Keep critical sections inside std::scoped_lock as short as possible—never do slow network or file I/O while holding a mutex.',
          ],
          example: {
            title: 'Lock-Free std::atomic Counter Across Worker Threads',
            language: 'cpp',
            code: `#include <atomic>
#include <iostream>
#include <thread>

int main() {
    std::atomic<int> hits{0};

    auto worker = [&hits]() {
        for (int i = 0; i < 5000; ++i) {
            hits.fetch_add(1, std::memory_order_relaxed);
        }
    };

    std::thread t1(worker);
    std::thread t2(worker);
    t1.join();
    t2.join();

    std::cout << "Exact atomic hits: " << hits.load() << "\\n";
    return 0;
}`,
            output: `Exact atomic hits: 10000`,
          },
          tip: 'Use std::async(std::launch::async, fn) + std::future<T> when you simply want to run a task on a background thread and retrieve its return value (or rethrow its exception) cleanly.',
        },
      ],
      challenge: {
        prompt:
          'Write a C++ program that spawns two std::thread workers, each incrementing a shared std::atomic<int> counter 10,000 times, joins both threads cleanly, and prints the final count (20000).',
        hint: 'Include <atomic>, <iostream>, and <thread>. Capture &counter by reference in a lambda, launch std::thread t1(work); std::thread t2(work); call t1.join(); t2.join(); and print counter.load().',
        language: 'cpp',
        solutionCode: `#include <atomic>
#include <iostream>
#include <thread>

int main() {
    std::atomic<int> counter{0};

    auto increment = [&counter]() {
        for (int i = 0; i < 10000; ++i) {
            counter.fetch_add(1, std::memory_order_relaxed);
        }
    };

    std::thread t1(increment);
    std::thread t2(increment);
    t1.join();
    t2.join();

    std::cout << "Final counter: " << counter.load() << "\\n";
    return 0;
}`,
      },
      quiz: [
        {
          question: 'Why is std::string_view sv = std::string("hello") + "!"; a serious bug?',
          options: [
            'std::string_view cannot hold exclamation marks',
            'The temporary concatenated std::string is destroyed at the semicolon, leaving sv dangling over freed memory',
            'std::string cannot be concatenated with +',
            'std::string_view always copies the string onto the heap',
          ],
          answer: 1,
          explanation:
            'std::string_view does not own the characters it points to. Binding it to a temporary std::string creates a dangling view immediately after the statement ends.',
        },
        {
          question: 'What happens when a joinable std::thread object goes out of scope without .join() or .detach() being called?',
          options: [
            'It automatically joins and waits for the thread to finish',
            'It detaches the thread cleanly in the background',
            'The destructor calls std::terminate(), crashing the entire program immediately',
            'The compiler always refuses to compile the code',
          ],
          answer: 2,
          explanation:
            'Destroying a joinable std::thread invokes std::terminate(). Always call .join() before scope exit, or use C++20 std::jthread which joins automatically.',
        },
      ],
    },
    km: {
      duration: '15 នាទី',
      objectives: [
        'ពន្យល់ពី lvalues, rvalues (T&&) និងរបៀបដែល move semantics ផ្ទេរ heap buffer ក្នុង O(1)',
        'ជៀសវាង dangling std::string_view និងការសរសេរ return std::move(local) ដែលរារាំង RVO',
        'ការពារ data race ដោយប្រើ std::atomic<T> សម្រាប់លេខរាប់ និង std::scoped_lock សម្រាប់ទិន្នន័យរួម',
        'គ្រប់គ្រងអាយុកាល thread ដោយសុវត្ថិភាពជាមួយ .join() ឬ C++20 std::jthread ដើម្បីកុំឱ្យកើត std::terminate()',
      ],
      extraSections: [
        {
          id: 'move-semantics-and-views',
          heading: 'Value Categories, Move Semantics និង Non-Owning Views',
          body: [
            'ការចម្លង std::vector មាន 10 លានធាតុត្រូវកក់អង្គចងចាំថ្មី និងចម្លងគ្រប់បៃក្នុង O(n)។ ចំណែក move គ្រាន់តែលួចផ្ទេរ pointer, size និង capacity ខាងក្នុងក្នុង O(1) ហើយទុកប្រភពដើមទទេ! សំខាន់គឺ std::move(x) មិនផ្លាស់ទីទិន្នន័យដោយខ្លួនឯងទេ—វាគ្រាន់តែជា cast ប្រាប់ compiler ឱ្យចាត់ទុក x ជា rvalue (T&&)។',
            'សម្រាប់ប៉ារ៉ាម៉ែត្រអានតែប៉ុណ្ណោះ C++ ទំនើបផ្ដល់ non-owning views៖ std::string_view (pointer + ប្រវែង) ទទួលទាំង std::string និង string literal ដោយគ្មានការកក់ heap ហើយ C++20 std::span<T> ធ្វើដូចគ្នាសម្រាប់ array និង vector។',
          ],
          points: [
            'Object ដែលត្រូវបាន move រួចស្ថិតក្នុងស្ថានភាព "valid but unspecified"៖ អាចលុប ឬផ្ដល់តម្លៃថ្មីបាន ប៉ុន្តែកុំរំពឹងតម្លៃចាស់។',
            'កុំសរសេរ return std::move(local_var);—សរសេរ return local_var; ធម្មតាដើម្បីឱ្យ compiler ប្រើ RVO/NRVO។',
            'បញ្ជូន std::string_view និង std::span តាមតម្លៃ (វាមានទំហំតែ 16 bytes)។',
            'ដាក់ noexcept លើ move constructor ផ្ទាល់ខ្លួន ដើម្បីឱ្យ std::vector ជ្រើសរើស move ជំនួស copy ពេលពង្រីកទំហំ។',
          ],
          table: {
            headers: ['យន្តការ', 'ល្បឿន/ការចំណាយ', 'កម្មសិទ្ធិ', 'ចំណុចត្រូវប្រយ័ត្ន'],
            rows: [
              ['Copy (T a = b;)', 'O(n) deep copy', 'ទាំងពីរមានទិន្នន័យដាច់ដោយឡែក', 'យឺតសម្រាប់ string/vector ធំៗ'],
              ['Move (T a = std::move(b);)', 'O(1) ផ្ទេរ pointer', 'ផ្ទេរកម្មសិទ្ធិទៅ a', 'កុំអានតម្លៃចាស់ពី b ដែល move រួច'],
              ['std::string_view', 'O(1) (16 bytes)', 'View គ្មានកម្មសិទ្ធិ', 'មិនត្រូវរស់យូរជាង string ដើម!'],
              ['std::span<const T>', 'O(1) (16 bytes)', 'Slice គ្មានកម្មសិទ្ធិ', 'មិនត្រូវរស់យូរជាង buffer ដើម!'],
            ],
          },
          exampleTitle: 'ការផ្ទេរកម្មសិទ្ធិ O(1) ដោយ std::move',
          warning:
            'កុំភ្ជាប់ std::string_view ទៅនឹង temporary std::string (ឧ. std::string_view sv = std::string("temp") + "!";) ឬ return std::string_view ទៅអថេរក្នុងអនុគមន៍! Temporary string ត្រូវបានបំផ្លាញត្រង់សញ្ញា ; ធ្វើឱ្យ sv ក្លាយជា dangling view ភ្លាម។',
        },
        {
          id: 'threads-atomics-and-mutexes',
          heading: 'Threads, std::atomic និងការចាក់សោការពារ Deadlock',
          body: [
            'នៅពេល thread ពីរចូលប្រើអង្គចងចាំតែមួយព្រមគ្នា ហើយយ៉ាងតិចមួយសរសេរដោយគ្មាន synchronization នោះគឺជា data race (Undefined Behavior ក្នុង C++)។ សម្រាប់លេខរាប់ ឬ flag តែមួយ សូមប្រើ std::atomic<int> ដែលលឿន និងសុវត្ថិភាពដោយមិនបាច់ប្រើ mutex។',
            'សម្រាប់ទិន្នន័យច្រើន field ឬ STL containers (ដែលមិន thread-safe ពេលសរសេរព្រមគ្នា) សូមការពារដោយ std::mutex និង std::scoped_lock (C++17) ដែលដោះសោដោយស្វ័យប្រវត្តិពេលចាកចេញពី scope និងអាចចាក់សោ mutex ច្រើនព្រមគ្នាដោយគ្មាន deadlock។',
          ],
          points: [
            'ត្រូវហៅ .join() (ឬ .detach()) លើគ្រប់ std::thread មុនពេល destructor ដំណើរការ—បើមិនដូច្នោះទេ std::terminate() នឹងបញ្ឈប់កម្មវិធីភ្លាមៗ!',
            'ផ្ដល់អាទិភាពលើ C++20 std::jthread ដែលធ្វើ join ដោយស្វ័យប្រវត្តិក្នុង destructor។',
            'រក្សាប្លុកកូដក្នុង std::scoped_lock ឱ្យខ្លីបំផុត—កុំធ្វើ I/O បណ្ដាញ ឬឯកសារពេលកំពុងកាន់ mutex។',
          ],
          exampleTitle: 'លេខរាប់ Lock-Free ជាមួយ std::atomic ឆ្លងកាត់ Threads',
          tip: 'ប្រើ std::async(std::launch::async, fn) ជាមួយ std::future<T> នៅពេលអ្នកចង់ដំណើរការកិច្ចការលើ thread ផ្សេង និងទទួលតម្លៃត្រឡប់ (ឬ exception) យ៉ាងងាយស្រួល។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរកម្មវិធី C++ ដែលបង្កើត std::thread ពីរ ដោយ thread នីមួយៗបូកបន្ថែម 1 លើ std::atomic<int> counter រួមគ្នាចំនួន 10,000 ដង រួចហៅ join() ទាំងពីរ និងបង្ហាញលទ្ធផលចុងក្រោយ (20000)។',
        hint: 'បញ្ចូល <atomic>, <iostream>, <thread>។ ចាប់ &counter ក្នុង lambda បង្កើត std::thread t1, t2 ហៅ t1.join(); t2.join(); ហើយបង្ហាញ counter.load()។',
      },
      quiz: [
        {
          question: 'ហេតុអ្វីបានជា std::string_view sv = std::string("hello") + "!"; ជាកំហុសធ្ងន់ធ្ងរ?',
          options: [
            'std::string_view មិនអាចផ្ទុកសញ្ញាឧទាន !',
            'Temporary std::string ត្រូវបានបំផ្លាញត្រង់សញ្ញា ; ធ្វើឱ្យ sv ចង្អុលទៅអង្គចងចាំដែលត្រូវបានដោះលែង (dangling view)',
            'std::string មិនអាចភ្ជាប់ដោយសញ្ញា + បានទេ',
            'std::string_view តែងតែចម្លងអត្ថបទលើ heap',
          ],
          answer: 1,
          explanation:
            'std::string_view មិនមែនជាម្ចាស់ទិន្នន័យទេ ដូច្នេះការភ្ជាប់វាទៅ temporary std::string បន្សល់ទុក dangling view ភ្លាមក្រោយបញ្ចប់បន្ទាត់។',
        },
        {
          question: 'តើមានអ្វីកើតឡើងនៅពេល std::thread ដែល joinable ចាកចេញពី scope ដោយមិនបានហៅ .join() ឬ .detach()?',
          options: [
            'វាធ្វើ join ដោយស្វ័យប្រវត្តិ និងរង់ចាំ thread បញ្ចប់',
            'វា detach ដោយស្វ័យប្រវត្តិ',
            'Destructor ហៅ std::terminate() ធ្វើឱ្យកម្មវិធីទាំងមូលបិទ/crash ភ្លាមៗ',
            'Compiler តែងតែបដិសេធមិនឱ្យ compile',
          ],
          answer: 2,
          explanation:
            'ការបំផ្លាញ std::thread ដែលនៅ joinable នឹងហៅ std::terminate()។ ត្រូវហៅ .join() ជានិច្ច ឬប្រើ C++20 std::jthread។',
        },
      ],
    },
  },
}
