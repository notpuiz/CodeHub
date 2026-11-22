export const csharpExpanded = [
  // =========================================================================
  // 1. STRINGS, RAW STRING LITERALS & STRINGBUILDER
  // =========================================================================
  {
    slug: 'csharp-strings-and-formatting',
    level: 'beginner',
    insertAfter: 'csharp-basics',
    en: {
      title: 'Strings, Raw String Literals & StringBuilder',
      duration: '12 min',
      summary:
        'Work confidently with immutable C# strings, validate text safely with string.IsNullOrWhiteSpace, format numbers and dates with interpolation and raw string literals, and build high-volume text without allocation overhead using StringBuilder.',
      objectives: [
        'Explain why C# strings are immutable and manipulate text cleanly with Trim, Split, Join, and OrdinalIgnoreCase comparisons.',
        'Format numbers, currency, dates, and multi-line JSON or SQL with string interpolation ($"") and C# 11 raw string literals ("""...""").',
        'Avoid O(n^2) memory allocations inside loops by using System.Text.StringBuilder.',
      ],
      sections: [
        {
          id: 'string-immutability-and-methods',
          heading: 'String Immutability, Validation & Core Text Methods',
          body: [
            'In C#, every string is an immutable sequence of UTF-16 characters stored on the managed heap. Calling methods like Trim(), ToUpperInvariant(), or Replace() never edits the original text—instead, each call returns a brand-new string object while leaving the original untouched.',
            'Because user input from forms, APIs, and CSV files can be null, empty (""), or contain only spaces ("   "), C# provides string.IsNullOrWhiteSpace(text) as a single safe guard. For case-insensitive matching of emails, codes, or headers, always specify StringComparison.OrdinalIgnoreCase instead of calling ToLower() on both sides, which avoids extra allocations and locale-dependent surprises.',
          ],
          points: [
            'Always assign the return value of string methods (clean = raw.Trim();)—ignoring the return value discards the change.',
            'Prefer string.IsNullOrWhiteSpace(s) over s == null || s == "" so whitespace-only inputs are caught too.',
            'Use StringComparison.OrdinalIgnoreCase for technical identifiers (emails, routes, SKUs) so Turkish-I or locale rules never break comparisons.',
            'Split and string.Join pair cleanly for parsing CSV lines or building comma-separated tags.',
          ],
          table: {
            headers: ['Method / Member', 'Purpose', 'Example', 'Result'],
            rows: [
              [
                'string.IsNullOrWhiteSpace(s)',
                'True if null, "", or whitespace',
                'string.IsNullOrWhiteSpace("  ")',
                'true',
              ],
              [
                'Trim() / TrimStart()',
                'Remove leading & trailing spaces',
                '"  Ada  ".Trim()',
                '"Ada"',
              ],
              [
                'Contains(sub, cmp)',
                'Check substring with comparison rule',
                '"C# 12".Contains("c#", OrdinalIgnoreCase)',
                'true',
              ],
              [
                'Replace(old, next)',
                'Return copy with replacements',
                '"a_b_c".Replace("_", "-")',
                '"a-b-c"',
              ],
              [
                'Split(sep, options)',
                'Break string into array of parts',
                '"a, b".Split(",", TrimEntries)',
                '["a", "b"]',
              ],
              [
                'string.Join(sep, items)',
                'Combine items with separator',
                'string.Join(" | ", tags)',
                '"api | dotnet"',
              ],
            ],
          },
          example: {
            title: 'Cleaning, Validating & Comparing User Input',
            language: 'csharp',
            code: `string? rawEmail = "   Sokha.Dev@Example.COM  ";

if (string.IsNullOrWhiteSpace(rawEmail))
{
    Console.WriteLine("Email is required.");
    return;
}

string normalized = rawEmail.Trim();
bool isCompanyDomain = normalized.EndsWith("@example.com", StringComparison.OrdinalIgnoreCase);

string rawTags = " csharp, , dotnet ,  web ";
string[] tags = rawTags.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

Console.WriteLine($"Normalized: {normalized}");
Console.WriteLine($"Company domain: {isCompanyDomain}");
Console.WriteLine($"Tags ({tags.Length}): {string.Join(" | ", tags)}");`,
            output: `Normalized: Sokha.Dev@Example.COM
Company domain: True
Tags (3): csharp | dotnet | web`,
          },
          warning:
            'Calling rawEmail.Trim(); without storing the result is a silent bug: because strings are immutable, rawEmail still has all its leading and trailing spaces.',
        },
        {
          id: 'interpolation-formatting-raw-strings',
          heading: 'String Interpolation, Format Specifiers & Raw String Literals',
          body: [
            'String interpolation ($"...") embeds C# expressions directly inside curly braces {expr} and supports inline format specifiers after a colon—such as {amount:F2} for two decimal places, {count:N0} for thousand separators, and {date:yyyy-MM-dd} for ISO dates. You can also set column alignment with a comma, like {label,-12} for left-aligned 12-character columns.',
            'For multi-line JSON, SQL, or HTML snippets, C# 11 introduced raw string literals delimited by at least three double quotes ("""..."""). Inside a raw string literal, quotes and backslashes require zero escaping, and the indentation of the closing """ automatically strips matching leading whitespace from every line. Prefix with $ (or $$ when the text itself contains single braces like JSON) to combine raw literals with interpolation.',
          ],
          points: [
            'Common format specifiers: F2 (fixed 2 decimals), N0 (grouped integer), P1 (percentage with 1 decimal), yyyy-MM-dd (ISO date).',
            'Use FormattableString.Invariant($"...") or CultureInfo.InvariantCulture when formatting machine-readable numbers for logs or APIs.',
            'Prefix raw string literals with $$""" so single { } stay literal JSON braces while {{expr}} performs interpolation.',
            'Verbatim strings (@"C:\\logs\\app.txt") are still handy for single-line Windows paths without escaping backslashes.',
          ],
          example: {
            title: 'Format Specifiers and Interpolated Raw JSON Literals',
            language: 'csharp',
            code: `using System.Globalization;

string product = "Mechanical Keyboard";
decimal unitPrice = 89.5m;
int stock = 1420;
DateOnly restockDate = new(2026, 6, 15);

string summary = string.Create(
    CultureInfo.InvariantCulture,
    $"{product,-22} | \${unitPrice,6:F2} | Stock: {stock:N0} | Restock: {restockDate:yyyy-MM-dd}");

string jsonPayload = $$"""
    {
      "product": "{{product}}",
      "price": {{unitPrice.ToString("F2", CultureInfo.InvariantCulture)}},
      "inStock": {{(stock > 0 ? "true" : "false")}}
    }
    """;

Console.WriteLine(summary);
Console.WriteLine(jsonPayload);`,
            output: `Mechanical Keyboard    | $ 89.50 | Stock: 1,420 | Restock: 2026-06-15
{
  "product": "Mechanical Keyboard",
  "price": 89.50,
  "inStock": true
}`,
          },
          tip: 'With $$"""...""", every double brace {{value}} is evaluated as C# while single braces { and } remain untouched—making JSON and CSS templates completely escape-free.',
        },
        {
          id: 'stringbuilder-high-volume-text',
          heading: 'Building Large Text Efficiently with StringBuilder',
          body: [
            'Concatenating a few strings with + or $"..." is fast because the C# compiler optimizes single-statement concatenations into one allocation. However, using += inside a loop over hundreds or thousands of items allocates a brand-new, progressively larger string on every iteration—copying all previous characters repeatedly in O(n^2) time and pressuring the garbage collector.',
            'System.Text.StringBuilder solves this with a mutable internal character buffer that grows automatically as you append. Chain Append, AppendLine, and AppendJoin inside your loop, and call ToString() once at the end to materialize the final immutable string.',
          ],
          points: [
            'Use + or $"..." for 2–5 known pieces in one expression; switch to StringBuilder whenever concatenating inside a loop.',
            'Pass an estimated initial capacity (new StringBuilder(capacity: 512)) when you roughly know the output size to minimize buffer resizes.',
            'Reuse a single StringBuilder across repeated batches by calling sb.Clear() instead of allocating a new builder each time.',
          ],
          example: {
            title: 'Generating a Formatted Receipt Report with StringBuilder',
            language: 'csharp',
            code: `using System.Text;

var items = new (string Name, decimal Price)[]
{
    ("USB-C Hub", 29.99m),
    ("Laptop Stand", 44.50m),
    ("Braided Cable", 12.00m),
};

var sb = new StringBuilder(capacity: 256);
sb.AppendLine("=== Order Receipt ===");

decimal total = 0m;
for (int i = 0; i < items.Length; i++)
{
    total += items[i].Price;
    sb.Append(i + 1)
      .Append(". ")
      .Append(items[i].Name.PadRight(15))
      .Append(" $")
      .AppendLine(items[i].Price.ToString("F2"));
}

sb.AppendLine("---------------------");
sb.Append($"Total: \${total:F2}");

Console.WriteLine(sb.ToString());`,
            output: `=== Order Receipt ===
1. USB-C Hub       $29.99
2. Laptop Stand    $44.50
3. Braided Cable   $12.00
---------------------
Total: $86.49`,
          },
          tip: 'When joining an existing collection with a single separator (such as CSV columns), string.Join(",", values) is even cleaner and faster than manually looping with StringBuilder.',
        },
      ],
      challenge: {
        prompt:
          'Write a C# method static string BuildCsvReport(string[] rawNames) that trims each entry, skips any null or whitespace-only names, numbers the remaining names starting at 1, and builds lines formatted as "1,Alice" using StringBuilder.',
        hint: 'Check string.IsNullOrWhiteSpace(name) inside the loop, increment a counter only for valid names, and use sb.AppendLine($"{index},{name.Trim()}").',
        language: 'csharp',
        solutionCode: `using System.Text;

static string BuildCsvReport(string[] rawNames)
{
    var sb = new StringBuilder();
    int index = 1;

    foreach (string raw in rawNames)
    {
        if (string.IsNullOrWhiteSpace(raw))
            continue;

        sb.Append(index++)
          .Append(',')
          .AppendLine(raw.Trim());
    }

    return sb.ToString();
}

string[] input = ["  Dara ", "", "   ", "Malis", "  Vibol  "];
Console.Write(BuildCsvReport(input));`,
      },
      quiz: [
        {
          question:
            'Why should you use StringBuilder instead of += inside a loop of 10,000 iterations?',
          options: [
            'C# forbids the += operator on string variables inside for loops.',
            'Strings are immutable, so += allocates and copies the entire growing string on every iteration.',
            'StringBuilder automatically compresses text to half its UTF-16 size.',
            'StringBuilder is the only way to include newline characters in C#.',
          ],
          answer: 1,
          explanation:
            'Because C# strings are immutable, each += inside a loop allocates a new string and copies all existing characters. StringBuilder mutates a resizable buffer and allocates the final string once on ToString().',
        },
        {
          question: 'What does $$""" prefix do on a C# 11 raw string literal?',
          options: [
            'Formats every number inside the string as US dollars.',
            'Disables interpolation completely.',
            'Treats single { } as literal characters and requires {{expr}} for interpolation.',
            'Converts the string into a StringBuilder automatically.',
          ],
          answer: 2,
          explanation:
            'The number of $ signs before a raw string literal sets how many braces trigger interpolation. With $$, single { and } stay literal (ideal for JSON) while {{expr}} interpolates C# expressions.',
        },
      ],
    },
    km: {
      title: 'Strings, Raw String Literals និង StringBuilder',
      duration: '12 នាទី',
      summary:
        'ធ្វើការយ៉ាងជឿជាក់ជាមួយ string ដែលមិនអាចកែផ្ទាល់ (immutable) ក្នុង C# ពិនិត្យអត្ថបទដោយសុវត្ថិភាពជាមួយ string.IsNullOrWhiteSpace រៀបចំទម្រង់លេខ និងកាលបរិច្ឆេទដោយ interpolation និង raw string literals ព្រមទាំងបង្កើតអត្ថបទធំៗយ៉ាងលឿនដោយប្រើ StringBuilder។',
      objectives: [
        'ពន្យល់មូលហេតុដែល string ក្នុង C# ជា immutable និងគ្រប់គ្រងអត្ថបទបានស្អាតជាមួយ Trim, Split, Join និងការប្រៀបធៀប OrdinalIgnoreCase។',
        'រៀបចំទម្រង់លេខ រូបិយប័ណ្ណ កាលបរិច្ឆេទ និង JSON/SQL ច្រើនបន្ទាត់ដោយ string interpolation ($"") និង raw string literals ("""...""")។',
        'ជៀសវាងការបង្កើតអង្គចងចាំខ្ជះខ្ជាយ O(n^2) ក្នុងរង្វិលជុំ ដោយប្រើ System.Text.StringBuilder។',
      ],
      sections: [
        {
          id: 'string-immutability-and-methods',
          heading: 'ភាពមិនអាចកែផ្ទាល់នៃ String ការផ្ទៀងផ្ទាត់ និងវិធីសាស្ត្រស្នូល',
          body: [
            'ក្នុង C# រាល់ string គឺជាស៊េរីតួអក្សរ UTF-16 ដែលមិនអាចកែប្រែផ្ទាល់ (immutable) នៅលើ managed heap។ ការហៅវិធីសាស្ត្រដូចជា Trim(), ToUpperInvariant() ឬ Replace() មិនដែលកែអត្ថបទដើមទេ—វាបង្កើត និងត្រឡប់ string ថ្មីមួយ ដោយរក្សាអត្ថបទដើមនៅដដែល។',
            'ដោយសារទិន្នន័យបញ្ចូលពីទម្រង់ API ឬឯកសារ CSV អាចជា null ទទេ ("") ឬមានតែដកឃ្លា ("   ") C# ផ្ដល់ string.IsNullOrWhiteSpace(text) ដើម្បីពិនិត្យទាំងបីករណីក្នុងពេលតែមួយ។ សម្រាប់ការប្រៀបធៀបអ៊ីមែល ឬកូដដោយមិនប្រកាន់អក្សរតូចធំ សូមប្រើ StringComparison.OrdinalIgnoreCase ជំនួសការហៅ ToLower() ទាំងសងខាង។',
          ],
          points: [
            'ត្រូវរក្សាទុកតម្លៃដែលត្រឡប់មកពីវិធីសាស្ត្រ string (clean = raw.Trim();) ជានិច្ច ព្រោះការហៅទទេមិនកែអថេរដើមឡើយ។',
            'ប្រើ string.IsNullOrWhiteSpace(s) ជំនួស s == null || s == "" ដើម្បីចាប់ទាំងអត្ថបទដែលមានតែដកឃ្លា។',
            'ប្រើ StringComparison.OrdinalIgnoreCase សម្រាប់អ៊ីមែល ផ្លូវ URL ឬលេខកូដ ដើម្បីជៀសវាងកំហុសតាមតំបន់ភាសា។',
            'ប្រើ Split និង string.Join រួមគ្នាសម្រាប់បំបែកទិន្នន័យ CSV ឬផ្គុំស្លាកអត្ថបទ។',
          ],
          table: {
            headers: ['វិធីសាស្ត្រ / សមាជិក', 'តួនាទី', 'ឧទាហរណ៍', 'លទ្ធផល'],
            rows: [
              [
                'string.IsNullOrWhiteSpace(s)',
                'ពិតបើ null, "" ឬមានតែដកឃ្លា',
                'string.IsNullOrWhiteSpace("  ")',
                'true',
              ],
              ['Trim() / TrimStart()', 'លុបដកឃ្លាខាងមុខ និងខាងក្រោយ', '"  Ada  ".Trim()', '"Ada"'],
              [
                'Contains(sub, cmp)',
                'ពិនិត្យអត្ថបទរងតាមច្បាប់ប្រៀបធៀប',
                '"C# 12".Contains("c#", OrdinalIgnoreCase)',
                'true',
              ],
              [
                'Replace(old, next)',
                'ត្រឡប់ច្បាប់ចម្លងដែលជំនួសអក្សរ',
                '"a_b_c".Replace("_", "-")',
                '"a-b-c"',
              ],
              [
                'Split(sep, options)',
                'បំបែកអត្ថបទជាអារេនៃផ្នែកតូចៗ',
                '"a, b".Split(",", TrimEntries)',
                '["a", "b"]',
              ],
              [
                'string.Join(sep, items)',
                'ផ្គុំធាតុទាំងអស់ដោយសញ្ញាខណ្ឌ',
                'string.Join(" | ", tags)',
                '"api | dotnet"',
              ],
            ],
          },
          exampleTitle: 'ការសម្អាត ផ្ទៀងផ្ទាត់ និងប្រៀបធៀបទិន្នន័យបញ្ចូលពីអ្នកប្រើ',
          warning:
            'ការហៅ rawEmail.Trim(); ដោយមិនរក្សាតម្លៃត្រឡប់គឺជាកំហុសស្ងាត់ៗ៖ ដោយសារ string ជា immutable អថេរ rawEmail នៅតែមានដកឃ្លាខាងមុខ និងខាងក្រោយដដែល។',
        },
        {
          id: 'interpolation-formatting-raw-strings',
          heading: 'String Interpolation, ទម្រង់បង្ហាញ និង Raw String Literals',
          body: [
            'String interpolation ($"...") អនុញ្ញាតឱ្យបញ្ចូលកន្សោម C# ផ្ទាល់ក្នុងសញ្ញា {expr} ព្រមទាំងកំណត់ទម្រង់បង្ហាញក្រោយសញ្ញាចុចពីរ—ដូចជា {amount:F2} សម្រាប់ទសភាគ 2 ខ្ទង់, {count:N0} សម្រាប់សញ្ញាក្បៀសខ្ទង់ពាន់ និង {date:yyyy-MM-dd} សម្រាប់កាលបរិច្ឆេទ ISO។ អ្នកក៏អាចតម្រឹមជួរឈរជាមួយសញ្ញាក្បៀសដូចជា {label,-12} ផងដែរ។',
            'សម្រាប់ JSON, SQL ឬ HTML ច្រើនបន្ទាត់ C# 11 បានបន្ថែម raw string literals ដែលចាប់ផ្ដើម និងបញ្ចប់ដោយសញ្ញាសម្រង់យ៉ាងតិចបី ("""...""")។ ខាងក្នុងវាមិនចាំបាច់ escape សញ្ញាសម្រង់ ឬសញ្ញា \\ ទេ ហើយទីតាំងចូលបន្ទាត់នៃ """ បិទនឹងលុបដកឃ្លាខាងមុខដោយស្វ័យប្រវត្តិ។ ដាក់ $ ឬ $$ ខាងមុខដើម្បីប្រើ interpolation ជាមួយ JSON បានយ៉ាងស្អាត។',
          ],
          points: [
            'ទម្រង់ទូទៅ៖ F2 (ទសភាគ 2 ខ្ទង់), N0 (លេខគត់មានក្បៀសពាន់), P1 (ភាគរយ 1 ខ្ទង់), yyyy-MM-dd (កាលបរិច្ឆេទ ISO)។',
            'ប្រើ CultureInfo.InvariantCulture ពេលបម្លែងលេខសម្រាប់ API ឬ log ដើម្បីកុំឱ្យប្រែប្រួលតាមតំបន់ម៉ាស៊ីន។',
            'ដាក់ $$""" ខាងមុខដើម្បីឱ្យ { } តែមួយនៅជាអក្សរ JSON ធម្មតា ហើយ {{expr}} ជាកន្លែងបញ្ចូលតម្លៃ C#។',
            'Verbatim string (@"C:\\logs\\app.txt") នៅតែងាយប្រើសម្រាប់ផ្លូវឯកសារ Windows មួយបន្ទាត់។',
          ],
          exampleTitle: 'ទម្រង់បង្ហាញលេខ និង Raw JSON Literal ជាមួយ Interpolation',
          tip: 'ជាមួយ $$"""...""" រាល់សញ្ញាដង្កៀបទ្វេ {{value}} ត្រូវបានគណនាជា C# ចំណែកដង្កៀបទោល { និង } នៅរក្សាដដែល—ធ្វើឱ្យគំរូ JSON ឬ CSS ស្អាតគ្មានសញ្ញា escape។',
        },
        {
          id: 'stringbuilder-high-volume-text',
          heading: 'ការបង្កើតអត្ថបទទំហំធំយ៉ាងមានប្រសិទ្ធភាពជាមួយ StringBuilder',
          body: [
            'ការភ្ជាប់ string ពីរបីផ្នែកដោយ + ឬ $"..." មានល្បឿនលឿនព្រោះ compiler បញ្ចូលវាជាការកក់អង្គចងចាំតែម្ដង។ ប៉ុន្តែការប្រើ += ក្នុងរង្វិលជុំរាប់រយ ឬរាប់ពាន់ដងនឹងបង្កើត string ថ្មីកាន់តែធំឡើងៗគ្រប់ជុំ ដោយចម្លងតួអក្សរចាស់ឡើងវិញជានិច្ចក្នុងល្បឿន O(n^2) និងបង្កបន្ទុកធ្ងន់ដល់ garbage collector។',
            'System.Text.StringBuilder ដោះស្រាយបញ្ហានេះដោយប្រើបណ្ដុំតួអក្សរដែលអាចកែប្រែបាន (mutable buffer) និងពង្រីកទំហំដោយស្វ័យប្រវត្តិ។ អ្នកអាចតភ្ជាប់ Append, AppendLine និង AppendJoin ក្នុងរង្វិលជុំ រួចហៅ ToString() តែម្ដងគត់នៅចុងបញ្ចប់។',
          ],
          points: [
            'ប្រើ + ឬ $"..." សម្រាប់ផ្នែកតិចតួចក្នុងមួយឃ្លា ហើយប្ដូរទៅ StringBuilder រាល់ពេលភ្ជាប់អត្ថបទក្នុងរង្វិលជុំ។',
            'ផ្ដល់ទំហំដំបូងប៉ាន់ស្មាន (new StringBuilder(capacity: 512)) ដើម្បីកាត់បន្ថយការពង្រីក buffer ច្រើនដង។',
            'ប្រើ sb.Clear() ដើម្បីប្រើ StringBuilder ដដែលឡើងវិញជំនួសការបង្កើតអង្គថ្មីរាល់លើក។',
          ],
          exampleTitle: 'ការបង្កើតវិក្កយបត្រដោយប្រើ StringBuilder',
          tip: 'ពេលចង់ផ្គុំបញ្ជីដែលមានស្រាប់ដោយសញ្ញាខណ្ឌតែមួយ (ដូចជាជួរឈរ CSV) string.Join(",", values) កាន់តែខ្លី និងលឿនជាងការសរសេររង្វិលជុំ StringBuilder ដោយផ្ទាល់។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ C# static string BuildCsvReport(string[] rawNames) ដែល Trim ធាតុនីមួយៗ រំលងឈ្មោះដែលជា null ឬមានតែដកឃ្លា ដាក់លេខរៀងចាប់ពី 1 និងបង្កើតបន្ទាត់ទម្រង់ "1,Alice" ដោយប្រើ StringBuilder។',
        hint: 'ពិនិត្យ string.IsNullOrWhiteSpace(raw) ក្នុងរង្វិលជុំ បង្កើនលេខរៀងតែពេលឈ្មោះត្រឹមត្រូវ រួចប្រើ sb.AppendLine($"{index},{raw.Trim()}")។',
      },
      quiz: [
        {
          question: 'ហេតុអ្វីគួរប្រើ StringBuilder ជំនួស += នៅក្នុងរង្វិលជុំ 10,000 ដង?',
          options: [
            'C# ហាមប្រើសញ្ញា += លើអថេរ string ក្នុងរង្វិលជុំ for។',
            'ដោយសារ string ជា immutable ការប្រើ += បង្កើតអង្គចងចាំថ្មី និងចម្លងអត្ថបទទាំងមូលឡើងវិញគ្រប់ជុំ។',
            'StringBuilder បង្ហាប់ទំហំអត្ថបទ UTF-16 មកសល់ពាក់កណ្ដាលដោយស្វ័យប្រវត្តិ។',
            'StringBuilder ជាវិធីតែមួយគត់ដើម្បីបន្ថែមបន្ទាត់ថ្មីក្នុង C#។',
          ],
          answer: 1,
          explanation:
            'ដោយសារ string ក្នុង C# មិនអាចកែផ្ទាល់បាន ការប្រើ += ក្នុងរង្វិលជុំបង្កើត string ថ្មីរាល់ជុំ។ StringBuilder កែប្រែលើ buffer តែមួយ រួចបង្កើត string ចុងក្រោយតែម្ដងពេលហៅ ToString()។',
        },
        {
          question: 'តើសញ្ញា $$""" នៅខាងមុខ C# 11 raw string literal មានតួនាទីអ្វី?',
          options: [
            'បង្ហាញលេខទាំងអស់ក្នុងអត្ថបទជារូបិយប័ណ្ណដុល្លារអាមេរិក។',
            'បិទមុខងារ string interpolation ទាំងស្រុង។',
            'ទុក { } ទោលជាតួអក្សរធម្មតា ហើយប្រើ {{expr}} សម្រាប់បញ្ចូលតម្លៃ C#។',
            'បម្លែង string ទៅជា StringBuilder ដោយស្វ័យប្រវត្តិ។',
          ],
          answer: 2,
          explanation:
            'ចំនួនសញ្ញា $ កំណត់ចំនួនដង្កៀបដែលបើក interpolation។ ជាមួយ $$ សញ្ញា { និង } តែមួយនៅជាអក្សរ JSON ធម្មតា ចំណែក {{expr}} គណនាកន្សោម C#។',
        },
      ],
    },
  },

  // =========================================================================
  // 2. ARRAYS, LIST<T> & DICTIONARY<TKEY, TVALUE>
  // =========================================================================
  {
    slug: 'csharp-arrays-lists-dictionaries',
    level: 'beginner',
    insertAfter: 'csharp-control-flow-methods',
    en: {
      title: 'Arrays, List<T> & Dictionary<TKey, TValue>',
      duration: '13 min',
      summary:
        'Store and query structured data efficiently with fixed-size arrays, C# 12 collection expressions, resizable List<T> collections, and O(1) Dictionary<TKey, TValue> lookups using TryGetValue.',
      objectives: [
        'Initialize arrays and collections concisely with C# 12 collection expressions ([...]) and slice ranges using ^1 and start..end.',
        'Add, remove, filter, and sort dynamically sized sequences with List<T> without mutating during foreach.',
        'Perform fast, exception-free key lookups with Dictionary<TKey, TValue> and TryGetValue.',
      ],
      sections: [
        {
          id: 'arrays-and-collection-expressions',
          heading: 'Arrays, Index/Range Slicing & Collection Expressions',
          body: [
            'An array (T[]) holds a fixed number of elements of the same type in contiguous memory, giving instant O(1) indexed access via items[i] and low memory overhead. Once created, an array cannot change length—which makes arrays ideal for fixed tables, buffers, and performance-critical numerical data.',
            'Modern C# makes array handling expressive with from-end indices (^1 means the last element), range slices (scores[1..4] copies indices 1, 2, and 3), and C# 12 collection expressions ([10, 20, 30]). Collection expressions unify array and list initialization and support the spread element (..) to merge multiple collections cleanly.',
          ],
          points: [
            'Array indices are zero-based; accessing index == arr.Length throws IndexOutOfRangeException.',
            'Use ^1 for the last element and ^2 for the second-to-last instead of verbose arr[arr.Length - 1].',
            'Range slicing (arr[1..^1]) creates a shallow copy of the slice for arrays; use Span<T> (arr.AsSpan(1..^1)) for zero-allocation slicing.',
            'C# 12 collection expressions like int[] combined = [..first, 99, ..second]; work for arrays, List<T>, and Span<T>.',
          ],
          table: {
            headers: ['Collection Type', 'Size', 'Lookup / Access', 'Best Use Case'],
            rows: [
              [
                'T[] (Array)',
                'Fixed at creation',
                'O(1) by index',
                'Fixed-size sets, buffers, interop',
              ],
              [
                'List<T>',
                'Dynamic (auto-grows)',
                'O(1) index, O(n) search',
                'Ordered items that grow or shrink',
              ],
              [
                'Dictionary<K, V>',
                'Dynamic (hash table)',
                'O(1) avg by key',
                'Fast lookup by ID, code, or name',
              ],
              [
                'HashSet<T>',
                'Dynamic (unique set)',
                'O(1) avg membership',
                'Deduplication and set math',
              ],
            ],
          },
          example: {
            title: 'Collection Expressions, Spread (..) and Range Slicing',
            language: 'csharp',
            code: `int[] q1 = [120, 145, 160];
int[] q2 = [155, 180, 210];

// Combine arrays using C# 12 collection expressions and spread (..)
int[] halfYear = [..q1, ..q2];

int latest = halfYear[^1];       // Last element (210)
int[] middle = halfYear[1..4];   // Indices 1, 2, 3

Console.WriteLine($"Months: {halfYear.Length} | Latest: {latest}");
Console.WriteLine($"Middle slice: {string.Join(", ", middle)}");`,
            output: `Months: 6 | Latest: 210
Middle slice: 145, 160, 155`,
          },
          tip: 'Use [] as an empty collection expression for arrays, List<T>, or IEnumerable<T>—for example: List<string> errors = [];',
        },
        {
          id: 'dynamic-lists-in-csharp',
          heading: 'Working with Resizable List<T> Collections',
          body: [
            'When you do not know the final number of items upfront—such as shopping cart items, API search results, or chat messages—reach for List<T> in System.Collections.Generic. Internally, List<T> wraps a backing array and doubles its capacity whenever it fills up, providing amortized O(1) Add() performance alongside O(1) index access.',
            'List<T> includes practical methods such as AddRange, Insert, Remove, RemoveAll, Exists, Find, and Sort. Remember that exposing a raw List<T> directly from a class lets external callers mutate your internal state; return IReadOnlyList<T> or call AsReadOnly() when callers should only read.',
          ],
          points: [
            'Check Count (property), not Length, to get the number of elements in a List<T>.',
            'Pass an initial capacity (new List<Order>(100)) if you know roughly how many items you will add.',
            'Use RemoveAll(predicate) to delete matching elements cleanly in one pass instead of removing inside foreach.',
            'Sort in-place with list.Sort((a, b) => a.CompareTo(b)) or produce a new sorted sequence with LINQ OrderBy.',
          ],
          example: {
            title: 'Managing Tasks Dynamically with List<T>',
            language: 'csharp',
            code: `List<string> tasks = ["Write tests", "Deploy staging"];
tasks.Add("Update docs");
tasks.Insert(0, "Review PR");

// Remove all entries containing "staging"
int removed = tasks.RemoveAll(t => t.Contains("staging", StringComparison.OrdinalIgnoreCase));
tasks.Sort(StringComparer.Ordinal);

Console.WriteLine($"Removed: {removed} | Remaining: {tasks.Count}");
foreach (string task in tasks)
{
    Console.WriteLine($"- {task}");
}`,
            output: `Removed: 1 | Remaining: 3
- Review PR
- Update docs
- Write tests`,
          },
          warning:
            'Never call list.Add() or list.Remove() while iterating over that same list with foreach—.NET throws InvalidOperationException ("Collection was modified"). Use RemoveAll(), iterate backward with a for loop, or build a new list instead.',
        },
        {
          id: 'dictionaries-and-trygetvalue',
          heading: 'Fast Key-Value Lookups with Dictionary<TKey, TValue>',
          body: [
            'Searching a List<T> by ID or username scans item by item in O(n) time, which slows down quickly as data grows. Dictionary<TKey, TValue> maps unique keys to values in a hash table, giving average O(1) lookups regardless of whether it holds 50 or 500,000 entries.',
            'Always read optional keys with TryGetValue(key, out var value) rather than checking ContainsKey(key) followed by dict[key]. TryGetValue computes the hash only once, avoids double lookups, and never throws KeyNotFoundException when a key is missing. For string keys like HTTP headers or country codes, pass StringComparer.OrdinalIgnoreCase to the constructor.',
          ],
          points: [
            'Indexer assignment dict[key] = val adds a new entry or overwrites an existing one; dict.Add(key, val) throws ArgumentException on duplicate keys.',
            'Use TryAdd(key, val) when you want to insert only if the key does not already exist.',
            'Use TryGetValue(key, out var value) for safe, single-lookup reads without exceptions.',
            'Pass StringComparer.OrdinalIgnoreCase when keys should match regardless of letter casing.',
          ],
          example: {
            title: 'Counting Frequencies & Case-Insensitive Lookups',
            language: 'csharp',
            code: `var inventory = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase)
{
    ["SKU-100"] = 14,
    ["SKU-200"] = 5,
};

// Safe lookup using TryGetValue (case-insensitive!)
if (inventory.TryGetValue("sku-100", out int qty))
{
    Console.WriteLine($"SKU-100 in stock: {qty}");
}

// Counting occurrences cleanly
string[] orders = ["SKU-200", "SKU-300", "sku-200"];
foreach (string sku in orders)
{
    inventory[sku] = inventory.GetValueOrDefault(sku) + 1;
}

foreach (var (sku, count) in inventory)
{
    Console.WriteLine($"{sku}: {count}");
}`,
            output: `SKU-100 in stock: 14
SKU-100: 14
SKU-200: 7
SKU-300: 1`,
          },
          warning:
            'Reading inventory["MISSING"] with the square-bracket indexer immediately throws KeyNotFoundException. Use TryGetValue or GetValueOrDefault whenever a key might not exist.',
        },
      ],
      challenge: {
        prompt:
          'Write a C# method static Dictionary<string, int> CountWordFrequency(string[] words) that returns a case-insensitive Dictionary<string, int> counting how many times each non-whitespace word appears (trimmed).',
        hint: 'Create new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase), skip string.IsNullOrWhiteSpace(w), trim it, and increment via counts[clean] = counts.GetValueOrDefault(clean) + 1.',
        language: 'csharp',
        solutionCode: `static Dictionary<string, int> CountWordFrequency(string[] words)
{
    var counts = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);

    foreach (string raw in words)
    {
        if (string.IsNullOrWhiteSpace(raw))
            continue;

        string word = raw.Trim();
        counts[word] = counts.GetValueOrDefault(word) + 1;
    }

    return counts;
}

string[] sample = ["CSharp", "dotnet", " csharp ", "", "DOTNET", "csharp"];
var freq = CountWordFrequency(sample);
foreach (var (word, count) in freq)
{
    Console.WriteLine($"{word}: {count}");
}`,
      },
      quiz: [
        {
          question:
            'Why is dict.TryGetValue(key, out var val) preferred over ContainsKey(key) + dict[key]?',
          options: [
            'ContainsKey is obsolete in .NET 8.',
            'TryGetValue performs only a single hash lookup and safely returns false if the key is absent.',
            'TryGetValue automatically inserts a default value into the dictionary when missing.',
            'dict[key] always returns null instead of throwing an exception.',
          ],
          answer: 1,
          explanation:
            'Calling ContainsKey followed by dict[key] hashes and probes the table twice. TryGetValue does the lookup once and cleanly signals absence with false instead of throwing KeyNotFoundException.',
        },
        {
          question: 'What does scores[^1] return for int[] scores = [10, 20, 30, 40];?',
          options: ['Throws IndexOutOfRangeException', '10', '30', '40'],
          answer: 3,
          explanation:
            'The hat operator (^1) indexes from the end of a collection, so ^1 refers to the last element (scores[scores.Length - 1]), which is 40.',
        },
      ],
    },
    km: {
      title: 'Arrays, List<T> និង Dictionary<TKey, TValue>',
      duration: '13 នាទី',
      summary:
        'រក្សាទុក និងស្វែងរកទិន្នន័យយ៉ាងមានប្រសិទ្ធភាពដោយប្រើ array ទំហំថេរ, C# 12 collection expressions ([...]), List<T> ដែលបត់បែនទំហំបាន និង Dictionary<TKey, TValue> ល្បឿន O(1) ជាមួយ TryGetValue។',
      objectives: [
        'បង្កើត array និងបញ្ជីយ៉ាងខ្លីស្អាតដោយ C# 12 collection expressions ([...]) និងកាត់ផ្នែកដោយ ^1 និង start..end។',
        'បន្ថែម លុប ត្រង និងតម្រៀបទិន្នន័យទំហំប្រែប្រួលជាមួយ List<T> ដោយមិនកែប្រែបញ្ជីខណៈកំពុង foreach។',
        'ស្វែងរកទិន្នន័យតាម key យ៉ាងលឿន និងគ្មាន exception ជាមួយ Dictionary<TKey, TValue> និង TryGetValue។',
      ],
      sections: [
        {
          id: 'arrays-and-collection-expressions',
          heading: 'Arrays, ការកាត់ជួរ (Index/Range) និង Collection Expressions',
          body: [
            'Array (T[]) ផ្ទុកធាតុចំនួនថេរដែលមានប្រភេទដូចគ្នានៅជាប់ៗគ្នាក្នុងអង្គចងចាំ ផ្ដល់ល្បឿនចូលប្រើតាមលេខរៀង O(1) និងសន្សំសំចៃអង្គចងចាំ។ ពេលបង្កើតរួច ប្រវែងរបស់ array មិនអាចផ្លាស់ប្ដូរបានទេ—ស័ក្តិសមសម្រាប់តារាងថេរ buffer និងការគណនាលេខល្បឿនលឿន។',
            'C# សម័យទំនើបធ្វើឱ្យការប្រើ array ងាយស្រួលដោយមានលេខរៀងពីចុង (^1 មានន័យថាធាតុចុងក្រោយ), ការកាត់ជួរ (scores[1..4] យកលេខរៀង 1, 2, 3) និង C# 12 collection expressions ([10, 20, 30])។ វាក៏គាំទ្រសញ្ញា spread (..) ដើម្បីរួមបញ្ចូលបញ្ជីច្រើនចូលគ្នាយ៉ាងស្អាតផងដែរ។',
          ],
          points: [
            'លេខរៀង array ចាប់ផ្ដើមពី 0 ហើយការចូលប្រើ arr[arr.Length] នឹងបោះ IndexOutOfRangeException។',
            'ប្រើ ^1 សម្រាប់ធាតុចុងក្រោយ និង ^2 សម្រាប់ធាតុទីពីរពីចុង ជំនួសការសរសេរ arr[arr.Length - 1]។',
            'ការកាត់ជួរ arr[1..^1] បង្កើតច្បាប់ចម្លងថ្មីសម្រាប់ array តែបើចង់កាត់ដោយមិនបង្កើតអង្គចងចាំថ្មី សូមប្រើ arr.AsSpan(1..^1)។',
            'C# 12 collection expressions ដូចជា int[] combined = [..first, 99, ..second]; ប្រើបានទាំង array, List<T> និង Span<T>។',
          ],
          table: {
            headers: ['ប្រភេទបញ្ជី', 'ទំហំ', 'ល្បឿនស្វែងរក / ចូលប្រើ', 'ករណីប្រើប្រាស់សមស្រប'],
            rows: [
              ['T[] (Array)', 'ថេរពេលបង្កើត', 'O(1) តាមលេខរៀង', 'សំណុំទំហំថេរ buffer និងគណនាលឿន'],
              [
                'List<T>',
                'បត់បែន (ពង្រីកស្វ័យប្រវត្តិ)',
                'O(1) តាមលេខរៀង, O(n) ស្វែងរក',
                'បញ្ជីមានលំដាប់ដែលបន្ថែម ឬលុបញឹក',
              ],
              [
                'Dictionary<K, V>',
                'បត់បែន (hash table)',
                'O(1) មធ្យមតាម key',
                'ស្វែងរកលឿនតាម ID កូដ ឬឈ្មោះ',
              ],
              [
                'HashSet<T>',
                'បត់បែន (តម្លៃមិនស្ទួន)',
                'O(1) មធ្យមពិនិត្យវត្តមាន',
                'លុបភាពស្ទួន និងប្រមាណវិធីសំណុំ',
              ],
            ],
          },
          exampleTitle: 'Collection Expressions, សញ្ញា Spread (..) និងការកាត់ជួរ',
          tip: 'ប្រើ [] ជា collection expression ទទេសម្រាប់ array, List<T> ឬ IEnumerable<T>—ឧទាហរណ៍៖ List<string> errors = [];',
        },
        {
          id: 'dynamic-lists-in-csharp',
          heading: 'ការប្រើប្រាស់ List<T> ដែលបត់បែនទំហំបាន',
          body: [
            'នៅពេលអ្នកមិនដឹងចំនួនធាតុចុងក្រោយជាមុន—ដូចជាទំនិញក្នុងកន្ត្រក លទ្ធផលស្វែងរកពី API ឬសារជជែក—សូមប្រើ List<T> ក្នុង System.Collections.Generic។ ខាងក្នុង List<T> ប្រើ array ជំនួយហើយបង្កើនទំហំទ្វេដងដោយស្វ័យប្រវត្តិពេលពេញ ដែលផ្ដល់ល្បឿន Add() មធ្យម O(1) និងចូលប្រើតាមលេខរៀង O(1)។',
            'List<T> មានវិធីសាស្ត្រងាយប្រើដូចជា AddRange, Insert, Remove, RemoveAll, Exists, Find និង Sort។ ចងចាំថាការបង្ហាញ List<T> ផ្ទាល់ចេញពី class អនុញ្ញាតឱ្យកូដខាងក្រៅកែប្រែទិន្នន័យខាងក្នុងបាន—សូមត្រឡប់ IReadOnlyList<T> ឬ AsReadOnly() បើចង់ឱ្យអានតែប៉ុណ្ណោះ។',
          ],
          points: [
            'ប្រើលក្ខណៈសម្បត្តិ Count (មិនមែន Length) ដើម្បីដឹងចំនួនធាតុក្នុង List<T>។',
            'ផ្ដល់ទំហំដំបូង (new List<Order>(100)) ប្រសិនបើដឹងចំនួនប៉ាន់ស្មានជាមុន ដើម្បីកាត់បន្ថយការពង្រីក array។',
            'ប្រើ RemoveAll(predicate) ដើម្បីលុបធាតុដែលត្រូវលក្ខខណ្ឌក្នុងមួយជុំ ជំនួសការលុបក្នុង foreach។',
            'តម្រៀបផ្ទាល់លើបញ្ជីដោយ list.Sort(...) ឬបង្កើតបញ្ជីតម្រៀបថ្មីដោយ LINQ OrderBy។',
          ],
          exampleTitle: 'ការគ្រប់គ្រងភារកិច្ចដោយបត់បែនជាមួយ List<T>',
          warning:
            'កុំហៅ list.Add() ឬ list.Remove() ខណៈកំពុងរត់ foreach លើ list ដដែលនោះ—.NET នឹងបោះ InvalidOperationException ("Collection was modified")។ ត្រូវប្រើ RemoveAll() ឬរត់ for បញ្ច្រាសវិញ។',
        },
        {
          id: 'dictionaries-and-trygetvalue',
          heading: 'ការស្វែងរកតាម Key យ៉ាងលឿនជាមួយ Dictionary<TKey, TValue>',
          body: [
            'ការស្វែងរកតាម ID ឬឈ្មោះក្នុង List<T> ត្រូវពិនិត្យធាតុម្ដងមួយៗក្នុងល្បឿន O(n) ដែលយឺតពេលទិន្នន័យធំ។ Dictionary<TKey, TValue> ភ្ជាប់ key មិនស្ទួនទៅតម្លៃក្នុងតារាង hash ផ្ដល់ល្បឿនស្វែងរកមធ្យម O(1) មិនថាមាន 50 ឬ 500,000 ធាតុទេ។',
            'ត្រូវអាន key ដែលអាចគ្មានដោយ TryGetValue(key, out var value) ជំនួសការពិនិត្យ ContainsKey(key) រួចអាន dict[key]។ TryGetValue គណនា hash តែម្ដងគត់ និងមិនដែលបោះ KeyNotFoundException ឡើយ។ សម្រាប់ key ជាអត្ថបទមិនប្រកាន់អក្សរតូចធំ សូមផ្ដល់ StringComparer.OrdinalIgnoreCase ពេលបង្កើត Dictionary។',
          ],
          points: [
            'ការកំណត់ dict[key] = val បន្ថែមធាតុថ្មី ឬកែតម្លៃចាស់ ចំណែក dict.Add(key, val) បោះ ArgumentException បើ key មានរួចហើយ។',
            'ប្រើ TryAdd(key, val) នៅពេលចង់បន្ថែមតែបើ key មិនទាន់មាន។',
            'ប្រើ TryGetValue(key, out var value) ដើម្បីអានដោយសុវត្ថិភាព និងរកតែម្ដងគត់។',
            'ផ្ដល់ StringComparer.OrdinalIgnoreCase សម្រាប់ key អត្ថបទដូចជា SKU ឬ HTTP header។',
          ],
          exampleTitle: 'ការរាប់ចំនួនដង និងការស្វែងរកដោយមិនប្រកាន់អក្សរតូចធំ',
          warning:
            'ការអាន inventory["MISSING"] ដោយដង្កៀបជ្រុងនឹងបោះ KeyNotFoundException ភ្លាមៗ។ ត្រូវប្រើ TryGetValue ឬ GetValueOrDefault រាល់ពេល key អាចគ្មានក្នុងតារាង។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ C# static Dictionary<string, int> CountWordFrequency(string[] words) ដែលត្រឡប់ Dictionary<string, int> មិនប្រកាន់អក្សរតូចធំ ដើម្បីរាប់ចំនួនដងនៃពាក្យនីមួយៗ (ដោយ Trim និងរំលងអត្ថបទទទេ)។',
        hint: 'បង្កើត new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase) រំលង string.IsNullOrWhiteSpace(raw) រួចបូកចំនួនតាម counts[word] = counts.GetValueOrDefault(word) + 1។',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វី dict.TryGetValue(key, out var val) ល្អជាងការហៅ ContainsKey(key) រួច dict[key]?',
          options: [
            'ContainsKey ត្រូវបានឈប់ប្រើក្នុង .NET 8។',
            'TryGetValue ស្វែងរកក្នុងតារាង hash តែម្ដងគត់ ហើយត្រឡប់ false ដោយសុវត្ថិភាពពេលគ្មាន key។',
            'TryGetValue បញ្ចូលតម្លៃលំនាំដើមចូល Dictionary ដោយស្វ័យប្រវត្តិពេលគ្មាន key។',
            'dict[key] តែងត្រឡប់ null ជំនួសការបោះ exception។',
          ],
          answer: 1,
          explanation:
            'ការហៅ ContainsKey ហើយ dict[key] ត្រូវគណនា hash និងរកពីរដង។ TryGetValue រកតែម្ដង ហើយបង្ហាញថាគ្មានដោយត្រឡប់ false ដោយមិនបោះ KeyNotFoundException។',
        },
        {
          question: 'តើ scores[^1] ត្រឡប់តម្លៃអ្វីសម្រាប់ int[] scores = [10, 20, 30, 40];?',
          options: ['បោះកំហុស IndexOutOfRangeException', '10', '30', '40'],
          answer: 3,
          explanation:
            'សញ្ញា ^1 រាប់លេខរៀងពីចុងបញ្ជី ដូច្នេះ ^1 សំដៅលើធាតុចុងក្រោយ (scores[scores.Length - 1]) គឺ 40។',
        },
      ],
    },
  },

  // =========================================================================
  // 3. INHERITANCE, INTERFACES & POLYMORPHISM
  // =========================================================================
  {
    slug: 'csharp-inheritance-and-interfaces',
    level: 'intermediate',
    insertAfter: 'classes-records-properties',
    en: {
      title: 'Inheritance, Interfaces & Polymorphism',
      duration: '14 min',
      summary:
        'Model extensible .NET architectures using single-class inheritance, virtual and override dispatch, abstract base classes, multiple interface contracts, and runtime polymorphism.',
      objectives: [
        'Extend base classes safely with virtual, override, base constructors, and sealed classes.',
        'Decide cleanly between an abstract class (shared state and partial implementation) and an interface (pure capability contract).',
        'Write decoupled, testable services using interface polymorphism and composition over deep inheritance trees.',
      ],
      sections: [
        {
          id: 'inheritance-virtual-override',
          heading: 'Class Inheritance, virtual/override & base',
          body: [
            'C# supports single implementation inheritance: a derived class can inherit from one base class using the colon syntax (class SavingsAccount : BankAccount). The derived class inherits public and protected members, and passes required arguments to the base constructor using : base(...).',
            'By default, C# methods are non-virtual—subclasses cannot override them unless the base class explicitly marks a method virtual (or abstract). Subclasses then opt in with the override keyword, guaranteeing dynamic dispatch at runtime. Marking a leaf class sealed prevents further subclassing and enables extra .NET JIT devirtualization optimizations.',
          ],
          points: [
            'Use protected for helper members that subclasses need but external callers should not access.',
            'Always pair virtual in the base class with override in the derived class to enable polymorphic dispatch.',
            'Call base.MethodName() inside an override when you want to extend rather than completely replace base behavior.',
            'Mark concrete classes sealed unless you intentionally designed and documented them to be inherited.',
          ],
          table: {
            headers: ['Keyword', 'Where Used', 'Behavior'],
            rows: [
              [
                'virtual',
                'Base class member',
                'Provides default implementation that subclasses may override',
              ],
              [
                'override',
                'Derived class member',
                'Replaces a virtual or abstract base implementation polymorphically',
              ],
              [
                'abstract',
                'Class or member',
                'Cannot be instantiated directly; subclasses must implement abstract members',
              ],
              [
                'sealed',
                'Class or override',
                'Prevents further inheritance or overriding; aids JIT performance',
              ],
              [
                'interface',
                'Contract type',
                'Defines capabilities; a class or struct can implement many interfaces',
              ],
              ['base', 'Derived class', 'Calls the base constructor or base class implementation'],
            ],
          },
          example: {
            title: 'Extending Base Behavior with virtual, override and base',
            language: 'csharp',
            code: `public class Notification
{
    public string Recipient { get; }
    public Notification(string recipient) => Recipient = recipient;

    public virtual string FormatMessage(string body) => $"To {Recipient}: {body}";
}

public sealed class UrgentNotification : Notification
{
    public UrgentNotification(string recipient) : base(recipient) { }

    public override string FormatMessage(string body) =>
        $"[URGENT] {base.FormatMessage(body).ToUpperInvariant()}";
}

Notification standard = new("ops@company.com");
Notification alert = new UrgentNotification("oncall@company.com");

Console.WriteLine(standard.FormatMessage("Backup completed"));
Console.WriteLine(alert.FormatMessage("Database CPU at 98%"));`,
            output: `To ops@company.com: Backup completed
[URGENT] TO ONCALL@COMPANY.COM: DATABASE CPU AT 98%`,
          },
          warning:
            'If a derived method shares a name with a non-virtual base method without override (or uses the new keyword), it hides the base method instead of overriding it—calling through a base-type variable will silently run the base version!',
        },
        {
          id: 'abstract-classes-vs-interfaces',
          heading: 'Abstract Classes vs Interface Contracts',
          body: [
            'Both abstract classes and interfaces define contracts that other types must fulfill, but they serve different design roles. An abstract class represents an "is-a" family that shares fields, constructor validation, and common helper logic while leaving specific steps abstract for subclasses to implement.',
            'An interface (conventionally prefixed with I, like IPaymentGateway or IClock) represents a "can-do" capability with no instance fields. Because a C# class can inherit only one base class yet implement any number of interfaces, interfaces are the backbone of .NET dependency injection, unit-test mocking, and cross-cutting abstractions like IDisposable and IComparable<T>.',
          ],
          points: [
            'Choose an abstract class when subclasses share real state (fields/properties) and common template workflow.',
            'Choose an interface when unrelated classes share a behavior contract (e.g., StripeGateway and FakeGateway both implement IPaymentGateway).',
            'Keep interfaces focused and small (Interface Segregation Principle) instead of creating bloated "god interfaces".',
            'C# 8+ supports default interface methods, primarily for evolving published libraries without breaking existing implementers.',
          ],
          example: {
            title: 'Combining an Abstract Base Class with Multiple Interfaces',
            language: 'csharp',
            code: `public interface IAuditable
{
    string AuditSummary();
}

public abstract class PaymentMethod : IAuditable
{
    public string Owner { get; }
    protected PaymentMethod(string owner) => Owner = owner;

    public abstract decimal CalculateFee(decimal amount);

    public string AuditSummary() => $"{GetType().Name} owned by {Owner}";
}

public sealed class CardPayment : PaymentMethod
{
    public CardPayment(string owner) : base(owner) { }
    public override decimal CalculateFee(decimal amount) => Math.Round(amount * 0.029m + 0.30m, 2);
}

public sealed class BankTransfer : PaymentMethod
{
    public BankTransfer(string owner) : base(owner) { }
    public override decimal CalculateFee(decimal amount) => 1.50m;
}

PaymentMethod[] methods = [new CardPayment("Sopheak"), new BankTransfer("Bora")];
foreach (PaymentMethod m in methods)
{
    Console.WriteLine($"{m.AuditSummary()} -> Fee on $100: \${m.CalculateFee(100m):F2}");
}`,
            output: `CardPayment owned by Sopheak -> Fee on $100: $3.20
BankTransfer owned by Bora -> Fee on $100: $1.50`,
          },
          tip: 'In ASP.NET Core and modern .NET, program your services against interfaces (IEmailSender, IOrderRepository) so you can swap real cloud adapters for fast in-memory fakes during tests.',
        },
        {
          id: 'polymorphism-and-pattern-dispatch',
          heading: 'Polymorphism & Composition Over Deep Inheritance',
          body: [
            'Polymorphism lets a caller operate on a collection of base types or interfaces—such as IEnumerable<INotifier>—without if/else chains checking concrete types. Adding a new implementation (like SlackNotifier) requires zero edits to the orchestrator class, directly satisfying the Open/Closed Principle.',
            'Experienced C# engineers favor composition (injecting small interface collaborators into a class constructor) over deep 4- or 5-level inheritance hierarchies. Deep inheritance couples every child to base-class internals, whereas composition lets you mix and match behaviors freely and test each piece in isolation.',
          ],
          points: [
            'Inject dependencies through the constructor (primary constructors in C# 12 make this concise: class CheckoutService(ITaxCalculator tax)).',
            'If you find yourself writing if (item is ConcreteA) ... else if (item is ConcreteB) inside core business loops, consider moving that behavior onto an interface method.',
            'Keep inheritance trees shallow (at most 1–2 levels) and seal leaf classes.',
          ],
          example: {
            title: 'Decoupled Dispatch with Constructor-Injected Interfaces',
            language: 'csharp',
            code: `public interface IDiscountPolicy
{
    decimal Apply(decimal subtotal);
}

public sealed class PercentageDiscount(decimal rate) : IDiscountPolicy
{
    public decimal Apply(decimal subtotal) => Math.Round(subtotal * (1m - rate), 2);
}

public sealed class FlatDiscount(decimal off) : IDiscountPolicy
{
    public decimal Apply(decimal subtotal) => Math.Max(0m, subtotal - off);
}

public sealed class CheckoutCalculator(IDiscountPolicy policy)
{
    public decimal FinalTotal(decimal subtotal) => policy.Apply(subtotal);
}

var holidayCheckout = new CheckoutCalculator(new PercentageDiscount(0.15m));
var couponCheckout = new CheckoutCalculator(new FlatDiscount(25m));

Console.WriteLine($"Holiday 15% off $200: \${holidayCheckout.FinalTotal(200m):F2}");
Console.WriteLine($"Coupon $25 off $200:  \${couponCheckout.FinalTotal(200m):F2}");`,
            output: `Holiday 15% off $200: $170.00
Coupon $25 off $200:  $175.00`,
          },
          tip: 'C# 12 primary constructors (public sealed class CheckoutCalculator(IDiscountPolicy policy)) eliminate boilerplate private readonly fields when wiring interface dependencies.',
        },
      ],
      challenge: {
        prompt:
          'Define an interface IShape with a double Area() method, then implement two sealed classes Circle(double radius) and Rectangle(double width, double height). Write a static method TotalArea(IEnumerable<IShape> shapes) that sums all areas polymorphically.',
        hint: 'Use Math.PI * radius * radius for Circle, width * height for Rectangle, and sum shape.Area() in a loop or shapes.Sum(s => s.Area()).',
        language: 'csharp',
        solutionCode: `public interface IShape
{
    double Area();
}

public sealed class Circle(double radius) : IShape
{
    public double Area() => Math.PI * radius * radius;
}

public sealed class Rectangle(double width, double height) : IShape
{
    public double Area() => width * height;
}

static double TotalArea(IEnumerable<IShape> shapes)
{
    double sum = 0;
    foreach (IShape shape in shapes)
        sum += shape.Area();
    return sum;
}

IShape[] shapes = [new Circle(3), new Rectangle(4, 5)];
Console.WriteLine($"Total area: {TotalArea(shapes):F2}");`,
      },
      quiz: [
        {
          question:
            'Which pair of keywords is required for runtime polymorphic overriding between a base class and a derived class in C#?',
          options: [
            'static in base and new in derived',
            'virtual (or abstract) in base and override in derived',
            'sealed in base and virtual in derived',
            'protected in base and public in derived',
          ],
          answer: 1,
          explanation:
            'C# methods are non-virtual by default. The base class must opt in with virtual or abstract, and the subclass must explicitly use override for runtime polymorphic dispatch.',
        },
        {
          question: 'When should you prefer an interface over an abstract class in C#?',
          options: [
            'When you need to store shared private fields across all subclasses.',
            'When unrelated types need to fulfill the same capability contract or a type must implement multiple contracts.',
            'When you want to prevent any class from being mocked in unit tests.',
            'When you want a constructor with shared validation logic.',
          ],
          answer: 1,
          explanation:
            'A C# class can inherit from only one base class, but it can implement multiple interfaces. Interfaces cleanly express shared capabilities across unrelated types and make dependency injection and testing easy.',
        },
      ],
    },
    km: {
      title: 'Inheritance, Interfaces និង Polymorphism',
      duration: '14 នាទី',
      summary:
        'រចនាស្ថាបត្យកម្ម .NET ដែលងាយពង្រីកដោយប្រើ single-class inheritance, ការបញ្ជូន virtual/override, abstract base classes, interface contracts ច្រើន និង runtime polymorphism។',
      objectives: [
        'ពង្រីក base class ដោយសុវត្ថិភាពជាមួយ virtual, override, base constructor និង sealed class។',
        'ជ្រើសរើសបានត្រឹមត្រូវរវាង abstract class (ចែករំលែកទិន្នន័យ និងកូដរួម) និង interface (កិច្ចសន្យាសមត្ថភាពសុទ្ធ)។',
        'សរសេរសេវាកម្មដែលងាយតេស្ត និងបត់បែនដោយប្រើ interface polymorphism និង composition ជំនួស inheritance ជ្រៅៗ។',
      ],
      sections: [
        {
          id: 'inheritance-virtual-override',
          heading: 'Class Inheritance, virtual/override និង base',
          body: [
            'C# គាំទ្រ single implementation inheritance៖ class កូនអាចទទួលមរតកពី base class តែមួយគត់ដោយប្រើសញ្ញាចុចពីរ (class SavingsAccount : BankAccount)។ class កូនទទួលបានសមាជិក public និង protected ហើយបញ្ជូនតម្លៃទៅ constructor របស់មេតាមរយៈ : base(...)។',
            'ជាលំនាំដើម វិធីសាស្ត្រក្នុង C# មិនមែន virtual ទេ—class កូនមិនអាច override បានឡើយ លុះត្រាតែ base class ដាក់ពាក្យ virtual (ឬ abstract)។ class កូនត្រូវប្រើពាក្យ override ដើម្បីធានាការជ្រើសរើសវិធីសាស្ត្រតាមប្រភេទពិតនៅពេលរត់។ ការដាក់ sealed លើ class ចុងក្រោយការពារការបន្ត inheritance និងជួយឱ្យ .NET JIT បង្កើនល្បឿន។',
          ],
          points: [
            'ប្រើ protected សម្រាប់សមាជិកជំនួយដែល class កូនត្រូវការ តែមិនបង្ហាញទៅកូដខាងក្រៅ។',
            'តែងផ្គូផ្គង virtual ក្នុង base class ជាមួយ override ក្នុង derived class ដើម្បីឱ្យ polymorphism ដំណើរការ។',
            'ហៅ base.MethodName() ក្នុង override ពេលចង់បន្ថែមលើឥរិយាបថដើម ជំនួសការជំនួសទាំងស្រុង។',
            'ដាក់ sealed លើ class ជាក់ស្ដែង លុះត្រាតែអ្នកមានបំណងរចនាវាសម្រាប់ឱ្យគេ inherit។',
          ],
          table: {
            headers: ['ពាក្យគន្លឹះ', 'ទីតាំងប្រើ', 'ឥរិយាបថ'],
            rows: [
              ['virtual', 'សមាជិក base class', 'ផ្ដល់កូដលំនាំដើមដែល class កូនអាច override បាន'],
              [
                'override',
                'សមាជិក derived class',
                'ជំនួសវិធីសាស្ត្រ virtual ឬ abstract ដោយគាំទ្រ polymorphism',
              ],
              [
                'abstract',
                'Class ឬសមាជិក',
                'មិនអាចបង្កើត object ផ្ទាល់; class កូនត្រូវតែសរសេរកូដបំពេញ',
              ],
              [
                'sealed',
                'Class ឬ override',
                'បិទមិនឱ្យ inherit ឬ override បន្ត និងជួយបង្កើនល្បឿន JIT',
              ],
              [
                'interface',
                'ប្រភេទកិច្ចសន្យា',
                'កំណត់សមត្ថភាព; class ឬ struct អាចអនុវត្ត interface បានច្រើន',
              ],
              ['base', 'Derived class', 'ហៅ constructor ឬវិធីសាស្ត្ររបស់ base class'],
            ],
          },
          exampleTitle: 'ការពង្រីកឥរិយាបថដើមជាមួយ virtual, override និង base',
          warning:
            'ប្រសិនបើវិធីសាស្ត្រក្នុង class កូនមានឈ្មោះដូច base class ដោយមិនដាក់ override (ឬប្រើ new) វាគ្រាន់តែលាក់ (hide) វិធីសាស្ត្រដើមប៉ុណ្ណោះ—ការហៅតាមអថេរប្រភេទ base នឹងរត់កូដមេដោយស្ងាត់ៗ!',
        },
        {
          id: 'abstract-classes-vs-interfaces',
          heading: 'Abstract Classes ទល់នឹង Interface Contracts',
          body: [
            'ទាំង abstract class និង interface សុទ្ធតែកំណត់កិច្ចសន្យាដែលប្រភេទដទៃត្រូវអនុវត្ត ប៉ុន្តែមានតួនាទីរចនាខុសគ្នា។ Abstract class តំណាងឱ្យគ្រួសារ "is-a" ដែលចែករំលែក fields ការផ្ទៀងផ្ទាត់ constructor និងកូដរួម ដោយទុកជំហានជាក់លាក់ជា abstract ឱ្យ class កូនបំពេញ។',
            'ចំណែក interface (និយមដាក់អក្សរ I ពីមុខ ដូចជា IPaymentGateway ឬ IClock) តំណាងឱ្យសមត្ថភាព "can-do" ដោយគ្មាន instance fields។ ដោយសារ class មួយក្នុង C# អាច inherit បានតែ base class មួយ តែអាចអនុវត្ត interface ច្រើន interface គឺជាឆ្អឹងខ្នងនៃ dependency injection និង unit testing ក្នុង .NET។',
          ],
          points: [
            'ជ្រើសរើស abstract class ពេល class កូនចែករំលែកទិន្នន័យ (fields/properties) និងលំហូរការងាររួម។',
            'ជ្រើសរើស interface ពេល class មិនជាប់ពូជគ្នាចែករំលែកសមត្ថភាពដូចគ្នា (ឧ. StripeGateway និង FakeGateway អនុវត្ត IPaymentGateway)។',
            'រក្សា interface ឱ្យតូច និងផ្ដោតលើមុខងារច្បាស់លាស់ (Interface Segregation Principle)។',
            'C# 8+ គាំទ្រ default interface methods ជាចម្បងសម្រាប់ពង្រីក library ដោយមិនបំបែកកូដចាស់។',
          ],
          exampleTitle: 'ការផ្សំ Abstract Base Class ជាមួយ Interfaces',
          tip: 'ក្នុង ASP.NET Core និង .NET ទំនើប សូមសរសេរសេវាកម្មពឹងលើ interfaces (IEmailSender, IOrderRepository) ដើម្បីងាយប្ដូររវាងសេវាពិត និង fake ពេលធ្វើតេស្ត។',
        },
        {
          id: 'polymorphism-and-pattern-dispatch',
          heading: 'Polymorphism និង Composition ជំនួស Inheritance ជ្រៅ',
          body: [
            'Polymorphism អនុញ្ញាតឱ្យកូដដំណើរការលើបញ្ជីនៃ base type ឬ interface—ដូចជា IEnumerable<INotifier>—ដោយមិនបាច់សរសេរ if/else ពិនិត្យប្រភេទជាក់ស្ដែង។ ការបន្ថែមប្រភេទថ្មី (ដូចជា SlackNotifier) មិនចាំបាច់កែកូដចាស់ទេ ដែលស្របតាមគោលការណ៍ Open/Closed។',
            'វិស្វករ C# ជំនាញចូលចិត្តប្រើ composition (បញ្ជូន interface តូចៗតាម constructor) ជាជាងបង្កើត inheritance ជ្រៅ 4 ឬ 5 ជាន់។ Inheritance ជ្រៅធ្វើឱ្យ class កូនជាប់ជំពាក់ខ្លាំងនឹងកូដមេ ចំណែក composition ផ្ដល់ភាពបត់បែន និងងាយតេស្តដាច់ដោយឡែក។',
          ],
          points: [
            'បញ្ជូន dependencies តាម constructor (C# 12 primary constructors ធ្វើឱ្យខ្លីស្អាត៖ class CheckoutService(ITaxCalculator tax))។',
            'ប្រសិនបើអ្នកឧស្សាហ៍សរសេរ if (item is ConcreteA) ... else if (item is ConcreteB) សូមពិចារណាបម្លែងឥរិយាបថនោះជាវិធីសាស្ត្រលើ interface។',
            'រក្សាជម្រៅ inheritance ត្រឹម 1–2 ជាន់ និងដាក់ sealed លើ class ចុងក្រោយ។',
          ],
          exampleTitle: 'ការបញ្ជូនតាម Interface ដោយ Constructor Injection',
          tip: 'C# 12 primary constructors (public sealed class CheckoutCalculator(IDiscountPolicy policy)) កាត់បន្ថយកូដប្រកាស private readonly fields ដដែលៗពេលភ្ជាប់ interface។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើត interface IShape ដែលមានវិធីសាស្ត្រ double Area() រួចអនុវត្ត sealed class ពីរគឺ Circle(double radius) និង Rectangle(double width, double height)។ សរសេរ static method TotalArea(IEnumerable<IShape> shapes) ដើម្បីបូកផ្ទៃក្រឡាទាំងអស់តាម polymorphism។',
        hint: 'ប្រើ Math.PI * radius * radius សម្រាប់ Circle, width * height សម្រាប់ Rectangle រួចបូក shape.Area() ក្នុងរង្វិលជុំ ឬ shapes.Sum(s => s.Area())។',
      },
      quiz: [
        {
          question:
            'តើពាក្យគន្លឹះមួយគូណាដែលចាំបាច់សម្រាប់ការ override បែប polymorphic រវាង base class និង derived class ក្នុង C#?',
          options: [
            'static ក្នុង base និង new ក្នុង derived',
            'virtual (ឬ abstract) ក្នុង base និង override ក្នុង derived',
            'sealed ក្នុង base និង virtual ក្នុង derived',
            'protected ក្នុង base និង public ក្នុង derived',
          ],
          answer: 1,
          explanation:
            'វិធីសាស្ត្រ C# មិនមែន virtual ជាលំនាំដើមទេ។ Base class ត្រូវដាក់ virtual ឬ abstract ហើយ class កូនត្រូវប្រើ override ដើម្បីដំណើរការ dynamic dispatch។',
        },
        {
          question: 'តើពេលណាអ្នកគួរជ្រើសរើស interface ជាជាង abstract class ក្នុង C#?',
          options: [
            'ពេលត្រូវរក្សាទុក private fields រួមសម្រាប់គ្រប់ class កូន។',
            'ពេលប្រភេទមិនជាប់ពូជគ្នាត្រូវអនុវត្តកិច្ចសន្យាសមត្ថភាពដូចគ្នា ឬ class មួយត្រូវអនុវត្តកិច្ចសន្យាច្រើន។',
            'ពេលចង់ហាមមិនឱ្យធ្វើ mock ក្នុង unit tests។',
            'ពេលត្រូវការ constructor រួមសម្រាប់ពិនិត្យទិន្នន័យ។',
          ],
          answer: 1,
          explanation:
            'Class មួយក្នុង C# អាច inherit បានតែ base class មួយ តែអាចអនុវត្ត interface ច្រើន ដែលល្អបំផុតសម្រាប់កិច្ចសន្យាសមត្ថភាព dependency injection និងការតេស្ត។',
        },
      ],
    },
  },

  // =========================================================================
  // 4. EXCEPTIONS, CUSTOM ERRORS & USING DISPOSAL
  // =========================================================================
  {
    slug: 'csharp-exceptions-and-using',
    level: 'intermediate',
    insertAfter: 'linq-and-collections',
    en: {
      title: 'Exceptions, Custom Errors & using Disposal',
      duration: '13 min',
      summary:
        'Handle runtime failures cleanly with targeted try/catch/finally blocks, exception filters, modern guard clauses, custom domain exceptions, and deterministic IDisposable cleanup via using var.',
      objectives: [
        'Catch specific exceptions cleanly, filter with when, and re-throw with throw; without erasing stack traces.',
        'Validate inputs using modern .NET guard helpers (ArgumentNullException.ThrowIfNull) and design meaningful custom exception types.',
        'Prevent file, socket, and database leaks with IDisposable, using var declarations, and await using.',
      ],
      sections: [
        {
          id: 'try-catch-finally-and-filters',
          heading: 'Structured try / catch / finally & Exception Filters',
          body: [
            'Exceptions represent unexpected runtime failures—such as a missing file, network timeout, or broken invariant—rather than routine control flow. Wrap only the operation that can fail inside try, catch specific exception types from most specific to most general, and place guaranteed cleanup in finally (which runs whether an exception occurred or not).',
            'C# also supports exception filters via the when clause (catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.TooManyRequests)). Filters inspect the exception without unwinding the stack, making diagnostics and debugging dramatically clearer than catching everything and re-throwing inside an if block.',
          ],
          points: [
            'Never use empty catch { } blocks—swallowing errors silently hides root causes in production.',
            'Order catch blocks from most specific (FileNotFoundException) to general (IOException).',
            'Use bare throw; to re-throw an exception and preserve its original stack trace; never write throw ex;.',
            'Reserve exceptions for truly exceptional failures; use TryParse or TryGetValue for expected invalid inputs.',
          ],
          table: {
            headers: ['Construct', 'Role', 'Best Practice'],
            rows: [
              [
                'try { ... }',
                'Guarded operation',
                'Keep scope narrow around risky I/O or external calls',
              ],
              [
                'catch (SpecificEx ex)',
                'Targeted recovery',
                'Handle only errors you can meaningfully recover from or log',
              ],
              [
                'catch (Ex ex) when (...)',
                'Conditional filter',
                'Match error codes/properties without unwinding stack',
              ],
              [
                'finally { ... }',
                'Guaranteed cleanup',
                'Runs on success or failure (prefer using var for IDisposable)',
              ],
              ['throw;', 'Re-throw safely', 'Preserves original line numbers and stack trace'],
              [
                'using var res = ...;',
                'Auto-disposal',
                'Calls Dispose() automatically at the end of the enclosing scope',
              ],
            ],
          },
          example: {
            title: 'Targeted Catch, Exception Filters & Safe Re-Throw',
            language: 'csharp',
            code: `static decimal DivideBudget(decimal total, int teamCount)
{
    try
    {
        if (teamCount < 0)
            throw new ArgumentOutOfRangeException(nameof(teamCount), "Team count cannot be negative.");

        return total / teamCount;
    }
    catch (DivideByZeroException)
    {
        Console.WriteLine("Warning: zero teams provided; defaulting share to 0.");
        return 0m;
    }
    catch (ArgumentOutOfRangeException ex) when (ex.ParamName == nameof(teamCount))
    {
        Console.WriteLine($"Validation error: {ex.Message}");
        throw; // Preserves original stack trace!
    }
    finally
    {
        Console.WriteLine("Budget calculation attempt logged.");
    }
}

Console.WriteLine($"Share: {DivideBudget(1000m, 0)}");`,
            output: `Warning: zero teams provided; defaulting share to 0.
Budget calculation attempt logged.
Share: 0`,
          },
          warning:
            'Writing throw ex; inside a catch block resets the exception stack trace to the catch line, destroying the real failure location. Always use bare throw; when re-throwing.',
        },
        {
          id: 'custom-domain-exceptions',
          heading: 'Guard Clauses & Custom Domain Exceptions',
          body: [
            'Modern .NET (6/7/8+) eliminates verbose parameter validation boilerplate with built-in static guard methods such as ArgumentNullException.ThrowIfNull(value), ArgumentException.ThrowIfNullOrWhiteSpace(name), and ArgumentOutOfRangeException.ThrowIfNegativeOrZero(amount). They automatically capture the parameter name via CallerArgumentExpression.',
            'When your business domain has a specific failure mode that callers need to catch and respond to—like insufficient wallet balance or an expired voucher—define a focused custom exception class inheriting from Exception, carrying structured context properties alongside a clear message.',
          ],
          points: [
            'Use ArgumentNullException.ThrowIfNull and ArgumentException.ThrowIfNullOrWhiteSpace at public method boundaries.',
            'Name custom exception classes ending with Exception (e.g., InsufficientFundsException).',
            'Attach domain properties (like Balance and RequestedAmount) and support an optional inner Exception constructor for wrapping lower-level failures.',
          ],
          example: {
            title: 'Guard Clauses and a Structured Custom Exception',
            language: 'csharp',
            code: `public sealed class InsufficientFundsException : Exception
{
    public decimal Balance { get; }
    public decimal Requested { get; }

    public InsufficientFundsException(decimal balance, decimal requested)
        : base($"Cannot withdraw \${requested:F2}; current balance is \${balance:F2}.")
    {
        Balance = balance;
        Requested = requested;
    }
}

public sealed class Wallet(decimal initialBalance)
{
    public decimal Balance { get; private set; } = initialBalance;

    public void Withdraw(decimal amount)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(amount);
        if (amount > Balance)
            throw new InsufficientFundsException(Balance, amount);

        Balance -= amount;
    }
}

var wallet = new Wallet(50m);
try
{
    wallet.Withdraw(80m);
}
catch (InsufficientFundsException ex)
{
    Console.WriteLine($"Declined: {ex.Message} (Short by \${ex.Requested - ex.Balance:F2})");
}`,
            output: `Declined: Cannot withdraw $80.00; current balance is $50.00. (Short by $30.00)`,
          },
          tip: 'Reuse standard .NET exceptions (ArgumentException, InvalidOperationException, KeyNotFoundException) for common errors—only create a custom exception when callers need to catch that specific business condition.',
        },
        {
          id: 'idisposable-and-using-declarations',
          heading: 'Deterministic Resource Cleanup with IDisposable & using var',
          body: [
            'The .NET garbage collector frees managed memory automatically, but it does not immediately release unmanaged OS resources like open file handles, database connections, network sockets, or timers. Types holding such resources implement IDisposable (with Dispose()) or IAsyncDisposable (with DisposeAsync()).',
            'Instead of manually writing try/finally blocks everywhere, declare disposable objects with C# 8+ using var (or await using var for async resources). The compiler translates using var into a guaranteed try/finally that calls Dispose() automatically when the variable leaves scope—even if an exception is thrown midway.',
          ],
          points: [
            'Always wrap FileStream, StreamReader, SqlConnection, HttpResponseMessage, and custom IDisposable types in using var.',
            'Use await using var for types implementing IAsyncDisposable so async buffers flush cleanly.',
            'Keep using var declarations scoped cleanly; if you need earlier disposal inside a long method, use a braced using (var x = ...) { ... } block.',
            'Make custom Dispose() methods idempotent (safe to call more than once without throwing).',
          ],
          example: {
            title: 'Implementing IDisposable and Automatic Cleanup with using var',
            language: 'csharp',
            code: `public sealed class ScopedTimer(string label) : IDisposable
{
    private readonly long _start = Environment.TickCount64;
    private bool _disposed;

    public void Dispose()
    {
        if (_disposed) return;
        _disposed = true;
        long elapsedMs = Environment.TickCount64 - _start;
        Console.WriteLine($"[{label}] Disposed after {elapsedMs} ms");
    }
}

static void RunJob()
{
    using var timer = new ScopedTimer("ImportBatch");
    Console.WriteLine("Processing records...");
    // timer.Dispose() is guaranteed to run right here, even if an exception occurs!
}

RunJob();
Console.WriteLine("After RunJob");`,
            output: `Processing records...
[ImportBatch] Disposed after 0 ms
After RunJob`,
          },
          warning:
            'Forgetting using on FileStream or database connections leaks OS handles under load, causing "The process cannot access the file" or connection-pool exhaustion errors.',
        },
      ],
      challenge: {
        prompt:
          'Write a sealed class TempLock(string resource) implementing IDisposable that prints "Acquired: <resource>" in its constructor and "Released: <resource>" in Dispose() (only once even if Dispose is called twice). Demonstrate it with using var inside a try/catch block.',
        hint: 'Track a private bool _released field so Dispose() returns early if already released, and use using var lk = new TempLock("orders.db"); inside a helper method or block.',
        language: 'csharp',
        solutionCode: `public sealed class TempLock : IDisposable
{
    private readonly string _resource;
    private bool _released;

    public TempLock(string resource)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(resource);
        _resource = resource;
        Console.WriteLine($"Acquired: {_resource}");
    }

    public void Dispose()
    {
        if (_released) return;
        _released = true;
        Console.WriteLine($"Released: {_resource}");
    }
}

try
{
    using var fileLock = new TempLock("orders.db");
    throw new InvalidOperationException("Simulated write error");
}
catch (InvalidOperationException ex)
{
    Console.WriteLine($"Handled: {ex.Message}");
}`,
      },
      quiz: [
        {
          question: 'What is the difference between throw; and throw ex; inside a catch block?',
          options: [
            'throw ex; is faster because it skips logging.',
            'throw; preserves the original exception stack trace, whereas throw ex; resets the stack trace to the catch line.',
            'throw; creates a new System.Exception instance.',
            'There is no difference in modern .NET.',
          ],
          answer: 1,
          explanation:
            'Bare throw; re-throws the active exception with its full original stack trace intact. Writing throw ex; overwrites the stack trace starting at the catch block, hiding where the failure actually happened.',
        },
        {
          question:
            'When does Dispose() run for a variable declared with using var stream = File.OpenRead(path);?',
          options: [
            'Only when the .NET garbage collector runs later.',
            'Only if no exception is thrown.',
            'Automatically at the end of the enclosing scope, even if an exception is thrown.',
            'Immediately on the next line after declaration.',
          ],
          answer: 2,
          explanation:
            'The C# compiler lowers using var into a try/finally block spanning the rest of the enclosing scope, guaranteeing Dispose() executes on both normal exit and exception exit.',
        },
      ],
    },
    km: {
      title: 'Exceptions, កំហុសផ្ទាល់ខ្លួន និងការសម្អាតដោយ using',
      duration: '13 នាទី',
      summary:
        'ដោះស្រាយកំហុសពេលរត់យ៉ាងស្អាតដោយ try/catch/finally ជាក់លាក់, exception filters, guard clauses ទំនើប, custom domain exceptions និងការបិទធនធាន IDisposable ដោយស្វ័យប្រវត្តិតាម using var។',
      objectives: [
        'ចាប់ exception ជាក់លាក់បានត្រឹមត្រូវ ត្រងលក្ខខណ្ឌដោយ when និងបោះឡើងវិញដោយ throw; ដោយមិនបាត់ stack trace។',
        'ផ្ទៀងផ្ទាត់តម្លៃបញ្ចូលដោយ guard helpers ទំនើប (ArgumentNullException.ThrowIfNull) និងរចនា custom exception ដែលមានន័យ។',
        'ការពារការលេចធ្លាយឯកសារ socket និងការភ្ជាប់មូលដ្ឋានទិន្នន័យដោយ IDisposable, using var និង await using។',
      ],
      sections: [
        {
          id: 'try-catch-finally-and-filters',
          heading: 'រចនាសម្ព័ន្ធ try / catch / finally និង Exception Filters',
          body: [
            'Exceptions តំណាងឱ្យកំហុសមិនរំពឹងទុកពេលរត់—ដូចជាឯកសារបាត់ អស់ម៉ោងបណ្ដាញ ឬទិន្នន័យខូច—មិនមែនសម្រាប់គ្រប់គ្រងលំហូរធម្មតាទេ។ រុំតែកូដដែលអាចមានបញ្ហាក្នុង try ចាប់ប្រភេទ exception ពីជាក់លាក់ទៅទូទៅ និងដាក់កូដសម្អាតចាំបាច់ក្នុង finally (ដែលតែងរត់មិនថាជោគជ័យ ឬមានកំហុស)។',
            'C# ក៏គាំទ្រ exception filters តាមឃ្លា when (catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.TooManyRequests))។ វាពិនិត្យលក្ខខណ្ឌដោយមិនរំលាយ stack ធ្វើឱ្យការរកកំហុសកាន់តែច្បាស់ជាងការចាប់ទាំងអស់រួចពិនិត្យ if។',
          ],
          points: [
            'កុំសរសេរ catch { } ទទេ—ការលេបកំហុសស្ងាត់ៗលាក់បាំងមូលហេតុពិតក្នុងប្រព័ន្ធផលិតកម្ម។',
            'តម្រៀបប្លុក catch ពីជាក់លាក់បំផុត (FileNotFoundException) ទៅទូទៅ (IOException)។',
            'ប្រើ throw; ទទេដើម្បីបោះ exception បន្តដោយរក្សា stack trace ដើម កុំសរសេរ throw ex;។',
            'ទុក exceptions សម្រាប់កំហុសពិតប្រាកដ ហើយប្រើ TryParse ឬ TryGetValue សម្រាប់ទិន្នន័យបញ្ចូលដែលអាចខុសជាធម្មតា។',
          ],
          table: {
            headers: ['រចនាសម្ព័ន្ធ', 'តួនាទី', 'វិធីអនុវត្តល្អបំផុត'],
            rows: [
              [
                'try { ... }',
                'ប្លុកប្រតិបត្តិការប្រថុយ',
                'រក្សាដែនឱ្យតូចជុំវិញការហៅ I/O ឬសេវាខាងក្រៅ',
              ],
              [
                'catch (SpecificEx ex)',
                'ចាប់កំហុសជាក់លាក់',
                'ដោះស្រាយតែកំហុសដែលអ្នកអាចសង្គ្រោះ ឬកត់ត្រាបាន',
              ],
              ['catch (Ex ex) when (...)', 'តម្រងតាមលក្ខខណ្ឌ', 'ផ្គូផ្គងកូដកំហុសដោយមិនរំលាយ stack'],
              [
                'finally { ... }',
                'សម្អាតដែលធានាជានិច្ច',
                'រត់ទាំងពេលជោគជ័យ និងបរាជ័យ (ប្រើ using var សម្រាប់ IDisposable)',
              ],
              ['throw;', 'បោះបន្តដោយសុវត្ថិភាព', 'រក្សាលេខបន្ទាត់ និង stack trace ដើម'],
              [
                'using var res = ...;',
                'បិទធនធានស្វ័យប្រវត្តិ',
                'ហៅ Dispose() ដោយស្វ័យប្រវត្តិពេលចប់ scope',
              ],
            ],
          },
          exampleTitle: 'ការចាប់ជាក់លាក់, Exception Filters និងការបោះបន្តដោយសុវត្ថិភាព',
          warning:
            'ការសរសេរ throw ex; ក្នុងប្លុក catch នឹងកំណត់ stack trace ឡើងវិញត្រឹមបន្ទាត់ catch ធ្វើឱ្យបាត់ទីតាំងកំហុសពិត។ ត្រូវប្រើ throw; ទទេជានិច្ចពេលបោះបន្ត។',
        },
        {
          id: 'custom-domain-exceptions',
          heading: 'Guard Clauses និង Custom Domain Exceptions',
          body: [
            '.NET សម័យទំនើប (6/7/8+) កាត់បន្ថយកូដផ្ទៀងផ្ទាត់ប៉ារ៉ាម៉ែត្រវែងៗដោយមានវិធីសាស្ត្រ guard ស្រាប់ដូចជា ArgumentNullException.ThrowIfNull(value), ArgumentException.ThrowIfNullOrWhiteSpace(name) និង ArgumentOutOfRangeException.ThrowIfNegativeOrZero(amount) ដែលចាប់ឈ្មោះប៉ារ៉ាម៉ែត្រដោយស្វ័យប្រវត្តិ។',
            'នៅពេលកម្មវិធីរបស់អ្នកមានករណីបរាជ័យអាជីវកម្មជាក់លាក់ដែលអ្នកហៅត្រូវដោះស្រាយ—ដូចជាសមតុល្យកាបូបមិនគ្រប់គ្រាន់ ឬប័ណ្ណផុតកំណត់—សូមបង្កើត custom exception class ដែល inherit ពី Exception ព្រមទាំងភ្ជាប់លក្ខណៈសម្បត្តិបរិបទច្បាស់លាស់។',
          ],
          points: [
            'ប្រើ ArgumentNullException.ThrowIfNull និង ArgumentException.ThrowIfNullOrWhiteSpace នៅដើមវិធីសាស្ត្រ public។',
            'ដាក់ឈ្មោះ custom exception បញ្ចប់ដោយ Exception (ឧ. InsufficientFundsException)។',
            'ភ្ជាប់ properties មានប្រយោជន៍ (ដូចជា Balance, Requested) និងគាំទ្រ inner Exception ពេលរុំកំហុសថ្នាក់ក្រោម។',
          ],
          exampleTitle: 'Guard Clauses និង Custom Exception មានរចនាសម្ព័ន្ធ',
          tip: 'ប្រើ exceptions ស្តង់ដាររបស់ .NET (ArgumentException, InvalidOperationException, KeyNotFoundException) សម្រាប់កំហុសទូទៅ ហើយបង្កើត custom exception តែពេលអ្នកហៅត្រូវចាប់លក្ខខណ្ឌអាជីវកម្មជាក់លាក់នោះ។',
        },
        {
          id: 'idisposable-and-using-declarations',
          heading: 'ការសម្អាតធនធានជាក់លាក់ជាមួយ IDisposable និង using var',
          body: [
            'Garbage collector របស់ .NET សម្អាតអង្គចងចាំ managed ដោយស្វ័យប្រវត្តិ ប៉ុន្តែវាមិនបិទធនធានប្រព័ន្ធប្រតិបត្តិការភ្លាមៗទេ ដូចជា file handles ការភ្ជាប់មូលដ្ឋានទិន្នន័យ ឬ network sockets។ ប្រភេទដែលកាន់ធនធានទាំងនេះអនុវត្ត IDisposable (Dispose()) ឬ IAsyncDisposable (DisposeAsync())។',
            'ជំនួសការសរសេរ try/finally ដោយដៃគ្រប់កន្លែង សូមប្រកាសដោយ C# 8+ using var (ឬ await using var សម្រាប់ធនធាន async)។ Compiler បម្លែង using var ទៅជា try/finally ដែលធានាហៅ Dispose() ដោយស្វ័យប្រវត្តិពេលអថេរចេញពី scope—ទោះមាន exception កើតឡើងក៏ដោយ។',
          ],
          points: [
            'តែងប្រើ using var ជាមួយ FileStream, StreamReader, SqlConnection, HttpResponseMessage និង IDisposable ផ្ទាល់ខ្លួន។',
            'ប្រើ await using var សម្រាប់ប្រភេទ IAsyncDisposable ដើម្បីឱ្យ buffer async បញ្ចប់ការសរសេរបានស្អាត។',
            'បើចង់បិទធនធានមុនចប់វិធីសាស្ត្រ សូមប្រើប្លុក using (var x = ...) { ... }។',
            'សរសេរ Dispose() ផ្ទាល់ខ្លួនឱ្យមានសុវត្ថិភាពទោះត្រូវបានហៅលើសពីម្ដង (idempotent)។',
          ],
          exampleTitle: 'ការអនុវត្ត IDisposable និងការសម្អាតស្វ័យប្រវត្តិដោយ using var',
          warning:
            'ការភ្លេចប្រើ using លើ FileStream ឬការភ្ជាប់មូលដ្ឋានទិន្នន័យបង្កការលេចធ្លាយ OS handles នាំឱ្យមានកំហុស "The process cannot access the file" ឬអស់ការភ្ជាប់ក្នុង pool។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ sealed class TempLock(string resource) ដែលអនុវត្ត IDisposable បោះពុម្ព "Acquired: <resource>" ក្នុង constructor និង "Released: <resource>" ក្នុង Dispose() (តែម្ដងគត់ទោះហៅ Dispose ពីរដង)។ បង្ហាញការប្រើវាជាមួយ using var ក្នុងប្លុក try/catch។',
        hint: 'រក្សាអថេរ private bool _released ដើម្បីឱ្យ Dispose() ត្រឡប់ភ្លាមបើបានបិទរួចហើយ រួចប្រើ using var fileLock = new TempLock("orders.db"); ក្នុងប្លុក try។',
      },
      quiz: [
        {
          question: 'តើ throw; និង throw ex; ខុសគ្នាដូចម្ដេចនៅក្នុងប្លុក catch?',
          options: [
            'throw ex; លឿនជាងព្រោះវាមិនកត់ត្រា log។',
            'throw; រក្សា stack trace ដើមទាំងស្រុង ចំណែក throw ex; កំណត់ stack trace ឡើងវិញត្រឹមបន្ទាត់ catch។',
            'throw; បង្កើត System.Exception ថ្មីមួយ។',
            'គ្មានភាពខុសគ្នាទេក្នុង .NET ទំនើប។',
          ],
          answer: 1,
          explanation:
            'throw; ទទេបោះ exception ដើមបន្តដោយរក្សា stack trace ពិត។ ចំណែក throw ex; លុបដានដើមហើយចាប់ផ្ដើម stack trace ថ្មីពីប្លុក catch ធ្វើឱ្យពិបាករកកំហុស។',
        },
        {
          question: 'តើ Dispose() រត់នៅពេលណាសម្រាប់អថេរ using var stream = File.OpenRead(path);?',
          options: [
            'លុះត្រាតែ .NET garbage collector រត់នៅពេលក្រោយ។',
            'លុះត្រាតែគ្មាន exception កើតឡើង។',
            'រត់ដោយស្វ័យប្រវត្តិនៅចុងបញ្ចប់នៃ scope ទោះមាន exception កើតឡើងក៏ដោយ។',
            'រត់ភ្លាមៗនៅបន្ទាត់បន្ទាប់ពីការប្រកាស។',
          ],
          answer: 2,
          explanation:
            'Compiler បម្លែង using var ជាប្លុក try/finally រហូតចប់ scope ដូច្នេះ Dispose() ត្រូវបានធានាហៅទាំងពេលចេញធម្មតា និងពេលមាន exception។',
        },
      ],
    },
  },

  // =========================================================================
  // 5. FILE I/O & SYSTEM.TEXT.JSON SERIALIZATION
  // =========================================================================
  {
    slug: 'csharp-file-io-json',
    level: 'intermediate',
    insertAfter: 'csharp-exceptions-and-using',
    en: {
      title: 'File I/O & System.Text.Json Serialization',
      duration: '13 min',
      summary:
        'Build portable file paths with Path.Combine, read and write files asynchronously without blocking threads, and serialize or deserialize strongly typed C# records cleanly using System.Text.Json.',
      objectives: [
        'Construct cross-platform paths with Path.Combine and choose between File.ReadAllTextAsync and streaming StreamReader.',
        'Serialize and deserialize C# objects and records with System.Text.Json and reusable JsonSerializerOptions.',
        'Customize JSON field names, enum formatting, and ignored properties with attributes while handling malformed JSON safely.',
      ],
      sections: [
        {
          id: 'safe-paths-and-file-io',
          heading: 'Cross-Platform Paths, Async File Helpers & Streaming',
          body: [
            'Hardcoding Windows backslashes like "data\\\\users.json" breaks on Linux and macOS containers. Always compose file paths with Path.Combine(baseDir, "data", "users.json"), create parent folders safely with Directory.CreateDirectory(dir), and inspect extensions or filenames with Path.GetExtension and Path.GetFileNameWithoutExtension.',
            'For small configuration files or JSON documents, File.ReadAllTextAsync and File.WriteAllTextAsync handle opening, UTF-8 encoding, and closing in a single non-blocking call. When processing huge log or CSV files (tens or hundreds of megabytes), stream line-by-line with using var reader = new StreamReader(path) and await reader.ReadLineAsync() so memory stays flat.',
          ],
          points: [
            'Use Path.Combine instead of string concatenation so separators match the host OS automatically.',
            'Prefer async File methods (ReadAllTextAsync, WriteAllTextAsync) in web APIs and UI apps so threads are never blocked.',
            'Switch to StreamReader / File.ReadLinesAsync for large files to avoid loading the entire file into RAM at once.',
            'Always wrap streams in using var or await using var so file locks are released immediately.',
          ],
          table: {
            headers: ['API', 'Behavior', 'When to Use'],
            rows: [
              [
                'Path.Combine(a, b)',
                'Joins path segments safely',
                'Every file or folder path across Windows/Linux/macOS',
              ],
              [
                'Directory.CreateDirectory(dir)',
                'Creates folder tree (idempotent)',
                'Before writing files into a possibly new folder',
              ],
              [
                'File.ReadAllTextAsync(path)',
                'Reads entire file as UTF-8 string',
                'Small configs, templates, and JSON files (< few MB)',
              ],
              [
                'File.WriteAllTextAsync(path, s)',
                'Creates or overwrites file',
                'Saving complete JSON/text snapshots',
              ],
              [
                'File.ReadLinesAsync(path)',
                'Streams one line at a time',
                'Large CSVs, NDJSON, or gigabyte log files',
              ],
              [
                'JsonSerializer.Serialize(obj)',
                'Converts C# object to JSON',
                'APIs, persistence, and structured payloads',
              ],
            ],
          },
          example: {
            title: 'Writing & Streaming Files Asynchronously with Path.Combine',
            language: 'csharp',
            code: `string tempDir = Path.Combine(Path.GetTempPath(), "codehub-demo");
Directory.CreateDirectory(tempDir);

string logPath = Path.Combine(tempDir, "events.log");
string[] lines = ["INFO  App started", "WARN  Cache miss", "INFO  Order saved"];

await File.WriteAllLinesAsync(logPath, lines);

int warningCount = 0;
await foreach (string line in File.ReadLinesAsync(logPath))
{
    if (line.StartsWith("WARN", StringComparison.Ordinal))
        warningCount++;
}

Console.WriteLine($"Saved: {Path.GetFileName(logPath)}");
Console.WriteLine($"Warnings found: {warningCount}");`,
            output: `Saved: events.log
Warnings found: 1`,
          },
          warning:
            'Never call File.ReadAllTextAsync on multi-gigabyte log files—loading the entire file into one string can trigger OutOfMemoryException. Stream line-by-line with File.ReadLinesAsync or StreamReader instead.',
        },
        {
          id: 'system-text-json-basics',
          heading: 'Serializing & Deserializing with System.Text.Json',
          body: [
            'System.Text.Json is .NET’s built-in, high-performance JSON library—no third-party packages required. It works seamlessly with C# classes and records, converting PascalCase C# properties into standard camelCase JSON when configured with JsonNamingPolicy.CamelCase.',
            'Always configure a shared static readonly JsonSerializerOptions instance (or JsonSerializerOptions.Web in .NET 9+) with PropertyNamingPolicy = JsonNamingPolicy.CamelCase and PropertyNameCaseInsensitive = true. Reusing a single options instance lets System.Text.Json cache type metadata instead of rebuilding reflection caches on every call.',
          ],
          points: [
            'C# positional records serialize and deserialize out of the box with zero boilerplate.',
            'Set WriteIndented = true for human-readable config files; keep it false for compact API responses.',
            'Enable PropertyNameCaseInsensitive = true when reading external API JSON whose casing may vary.',
            'Deserialize<T> returns T? (nullable) because JSON input "null" deserializes to null—always handle the null case.',
          ],
          example: {
            title: 'Round-Tripping C# Records with Reusable JsonSerializerOptions',
            language: 'csharp',
            code: `using System.Text.Json;

public sealed record Course(int Id, string Title, decimal Price, string[] Tags);

JsonSerializerOptions jsonOptions = new()
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    PropertyNameCaseInsensitive = true,
    WriteIndented = true,
};

var original = new Course(101, "C# Essentials", 29.99m, ["dotnet", "backend"]);
string json = JsonSerializer.Serialize(original, jsonOptions);

Course? restored = JsonSerializer.Deserialize<Course>(json, jsonOptions);

Console.WriteLine(json);
Console.WriteLine($"Restored: {restored?.Title} (\${restored?.Price:F2})");`,
            output: `{
  "id": 101,
  "title": "C# Essentials",
  "price": 29.99,
  "tags": [
    "dotnet",
    "backend"
  ]
}
Restored: C# Essentials ($29.99)`,
          },
          tip: 'When reading or writing JSON directly to a file, use JsonSerializer.SerializeAsync(stream, data, options) and DeserializeAsync<T>(stream, options) with a FileStream to avoid allocating an intermediate JSON string in memory.',
        },
        {
          id: 'json-attributes-and-validation',
          heading: 'JSON Attributes, Enum Strings & Error Handling',
          body: [
            'Real-world APIs often use snake_case keys (like created_at), string enums ("Paid" instead of 1), or internal fields that must never leave your server (like PasswordHash). System.Text.Json provides attributes in System.Text.Json.Serialization—such as [JsonPropertyName("created_at")], [JsonIgnore], and [JsonConverter(typeof(JsonStringEnumConverter))]—to control the wire contract declaratively.',
            'External JSON should always be treated as untrusted input. Wrap deserialization in a targeted catch (JsonException ex) block so truncated or invalid payloads return a clean validation error instead of crashing your service.',
          ],
          points: [
            'Use [JsonPropertyName("snake_key")] to map cleanly between C# PascalCase and external JSON names.',
            'Apply [JsonIgnore] to secrets, tokens, or computed helper properties you never want serialized.',
            'Add new JsonStringEnumConverter() to options (or via attribute) to serialize enums as readable strings instead of magic integers.',
            'Catch JsonException when parsing untrusted JSON from users, webhooks, or editable config files.',
          ],
          example: {
            title: 'Custom JSON Contracts & Catching Malformed JSON',
            language: 'csharp',
            code: `using System.Text.Json;
using System.Text.Json.Serialization;

public enum OrderStatus { Pending, Paid, Shipped }

public sealed class OrderDto
{
    [JsonPropertyName("order_id")]
    public string OrderId { get; init; } = "";

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public OrderStatus Status { get; init; }

    [JsonIgnore]
    public string InternalSecret { get; init; } = "never-expose";
}

var dto = new OrderDto { OrderId = "ORD-77", Status = OrderStatus.Paid };
Console.WriteLine(JsonSerializer.Serialize(dto));

try
{
    JsonSerializer.Deserialize<OrderDto>("{ broken json");
}
catch (JsonException ex)
{
    Console.WriteLine($"Invalid JSON caught: {ex.Message.Split('.')[0]}");
}`,
            output: `{"order_id":"ORD-77","Status":"Paid"}
Invalid JSON caught: 'b' is an invalid start of a property name`,
          },
          warning:
            'Never instantiate new JsonSerializerOptions() inside a tight loop or per HTTP request—each fresh instance rebuilds metadata caches and degrades throughput. Store one static readonly JsonSerializerOptions instance and reuse it.',
        },
      ],
      challenge: {
        prompt:
          'Define a record AppSettings(string Theme, int MaxRetries, bool TelemetryEnabled) and write an async method SaveAndLoadAsync(string path, AppSettings settings) that writes indented camelCase JSON to path using File.WriteAllTextAsync and reads it back with JsonSerializer.Deserialize<AppSettings>.',
        hint: 'Create a static readonly JsonSerializerOptions with PropertyNamingPolicy = JsonNamingPolicy.CamelCase, PropertyNameCaseInsensitive = true, and WriteIndented = true.',
        language: 'csharp',
        solutionCode: `using System.Text.Json;

public sealed record AppSettings(string Theme, int MaxRetries, bool TelemetryEnabled);

static class SettingsStore
{
    private static readonly JsonSerializerOptions Options = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        PropertyNameCaseInsensitive = true,
        WriteIndented = true,
    };

    public static async Task<AppSettings?> SaveAndLoadAsync(string path, AppSettings settings)
    {
        string? dir = Path.GetDirectoryName(path);
        if (!string.IsNullOrEmpty(dir))
            Directory.CreateDirectory(dir);

        string json = JsonSerializer.Serialize(settings, Options);
        await File.WriteAllTextAsync(path, json);

        string loaded = await File.ReadAllTextAsync(path);
        return JsonSerializer.Deserialize<AppSettings>(loaded, Options);
    }
}

string file = Path.Combine(Path.GetTempPath(), "app-settings.json");
AppSettings? result = await SettingsStore.SaveAndLoadAsync(file, new("dark", 3, false));
Console.WriteLine(result);`,
      },
      quiz: [
        {
          question:
            'Why should you reuse a single static readonly JsonSerializerOptions instance across calls?',
          options: [
            'System.Text.Json throws an exception if more than one JsonSerializerOptions is created.',
            'Each JsonSerializerOptions caches reflection/type metadata; recreating it per call wastes CPU and memory.',
            'Only static options support camelCase property naming.',
            'Non-static options ignore [JsonIgnore] attributes.',
          ],
          answer: 1,
          explanation:
            'JsonSerializerOptions stores internal metadata caches for every serialized type. Reusing a single static readonly instance avoids repeatedly computing that metadata.',
        },
        {
          question:
            'Which approach is safest for reading a 2 GB server log file line by line in C#?',
          options: [
            'File.ReadAllTextAsync(path) followed by .Split("\\n")',
            'File.ReadAllBytesAsync(path)',
            'File.ReadLinesAsync(path) or a using StreamReader loop',
            'JsonSerializer.Deserialize<string[]>(path)',
          ],
          answer: 2,
          explanation:
            'File.ReadLinesAsync and StreamReader stream one line at a time with minimal constant memory, whereas ReadAllTextAsync loads the entire 2 GB file into RAM at once.',
        },
      ],
    },
    km: {
      title: 'ការអាន/សរសេរឯកសារ (File I/O) និង System.Text.Json',
      duration: '13 នាទី',
      summary:
        'បង្កើតផ្លូវឯកសារឆ្លងប្រព័ន្ធប្រតិបត្តិការដោយ Path.Combine អាន និងសរសេរឯកសារបែប async ដោយមិនបាំង thread និងបម្លែង C# records ទៅ/មកពី JSON យ៉ាងស្អាតជាមួយ System.Text.Json។',
      objectives: [
        'បង្កើតផ្លូវឯកសារឆ្លង OS ដោយ Path.Combine និងជ្រើសរើសរវាង File.ReadAllTextAsync និងការអានម្ដងមួយបន្ទាត់ជាមួយ StreamReader។',
        'បម្លែង C# objects និង records ទៅ/មកពី JSON ដោយប្រើ System.Text.Json និង JsonSerializerOptions ដែលប្រើឡើងវិញ។',
        'កំណត់ឈ្មោះ JSON, ទម្រង់ enum និងលាក់ទិន្នន័យសម្ងាត់ដោយ attributes ព្រមទាំងចាប់កំហុស JSON មិនត្រឹមត្រូវដោយសុវត្ថិភាព។',
      ],
      sections: [
        {
          id: 'safe-paths-and-file-io',
          heading: 'ផ្លូវឯកសារឆ្លង OS, វិធីសាស្ត្រ Async File និងការអានបែប Stream',
          body: [
            'ការសរសេរសញ្ញា \\ ថេរសម្រាប់ Windows ដូចជា "data\\\\users.json" នឹងបង្កបញ្ហាលើ Linux និង macOS។ ត្រូវផ្គុំផ្លូវឯកសារដោយ Path.Combine(baseDir, "data", "users.json"), បង្កើតថតដោយ Directory.CreateDirectory(dir) និងពិនិត្យកន្ទុយឯកសារដោយ Path.GetExtension។',
            'សម្រាប់ឯកសារកំណត់រចនាសម្ព័ន្ធ ឬ JSON ទំហំតូច File.ReadAllTextAsync និង File.WriteAllTextAsync បើក អាន/សរសេរ UTF-8 និងបិទឯកសារក្នុងការហៅតែមួយដោយមិនបាំង thread។ ចំណែកឯកសារ log ឬ CSV ទំហំធំ សូមអានម្ដងមួយបន្ទាត់ដោយ File.ReadLinesAsync ឬ using var reader = new StreamReader(path) ដើម្បីកុំឱ្យពេញ RAM។',
          ],
          points: [
            'ប្រើ Path.Combine ជំនួសការភ្ជាប់អត្ថបទ ដើម្បីឱ្យសញ្ញាខណ្ឌផ្លូវត្រូវតាមប្រព័ន្ធប្រតិបត្តិការដោយស្វ័យប្រវត្តិ។',
            'ប្រើវិធីសាស្ត្រ File បែប async (ReadAllTextAsync, WriteAllTextAsync) ក្នុង Web API និង UI apps។',
            'ប្រើ File.ReadLinesAsync ឬ StreamReader សម្រាប់ឯកសារធំៗ ដើម្បីជៀសវាងការផ្ទុកឯកសារទាំងមូលចូល RAM។',
            'តែងរុំ streams ក្នុង using var ឬ await using var ដើម្បីដោះលែង file lock ភ្លាមៗ។',
          ],
          table: {
            headers: ['API', 'ឥរិយាបថ', 'ពេលណាគួរប្រើ'],
            rows: [
              [
                'Path.Combine(a, b)',
                'ផ្គុំផ្នែកផ្លូវឯកសារដោយសុវត្ថិភាព',
                'គ្រប់ផ្លូវឯកសារលើ Windows/Linux/macOS',
              ],
              [
                'Directory.CreateDirectory(dir)',
                'បង្កើតថត (មានស្រាប់មិនបោះកំហុស)',
                'មុនពេលសរសេរឯកសារចូលថតថ្មី',
              ],
              [
                'File.ReadAllTextAsync(path)',
                'អានឯកសារទាំងមូលជា UTF-8 string',
                'ឯកសារ config ឬ JSON តូច (< ពីរបី MB)',
              ],
              [
                'File.WriteAllTextAsync(path, s)',
                'បង្កើត ឬសរសេរជាន់លើឯកសារ',
                'រក្សាទុកអត្ថបទ ឬ JSON ទាំងមូល',
              ],
              [
                'File.ReadLinesAsync(path)',
                'អានបែប stream ម្ដងមួយបន្ទាត់',
                'ឯកសារ CSV, NDJSON ឬ log ទំហំធំ',
              ],
              [
                'JsonSerializer.Serialize(obj)',
                'បម្លែង C# object ទៅជា JSON',
                'API, ការរក្សាទុកទិន្នន័យ និង payload',
              ],
            ],
          },
          exampleTitle: 'ការសរសេរ និងអានឯកសារបែប Async Stream ជាមួយ Path.Combine',
          warning:
            'កុំហៅ File.ReadAllTextAsync លើឯកសារ log ទំហំរាប់ជីហ្គាបៃ—ការផ្ទុកទាំងមូលចូល string តែមួយអាចបង្ក OutOfMemoryException។ ត្រូវអានម្ដងមួយបន្ទាត់ដោយ File.ReadLinesAsync ឬ StreamReader។',
        },
        {
          id: 'system-text-json-basics',
          heading: 'ការ Serialize និង Deserialize ជាមួយ System.Text.Json',
          body: [
            'System.Text.Json គឺជា library JSON ស្រាប់ក្នុង .NET ដែលមានល្បឿនលឿនដោយមិនចាំបាច់ដំឡើងកញ្ចប់បន្ថែម។ វាដំណើរការយ៉ាងរលូនជាមួយ C# classes និង records ដោយបម្លែងឈ្មោះ PascalCase ទៅជា camelCase JSON តាមស្តង់ដារ ពេលកំណត់ JsonNamingPolicy.CamelCase។',
            'ត្រូវបង្កើត static readonly JsonSerializerOptions តែមួយដើម្បីប្រើរួមគ្នា ដោយកំណត់ PropertyNamingPolicy = JsonNamingPolicy.CamelCase និង PropertyNameCaseInsensitive = true។ ការប្រើអង្គដដែលឡើងវិញអនុញ្ញាតឱ្យ System.Text.Json រក្សា cache metadata បានលឿន។',
          ],
          points: [
            'C# positional records គាំទ្រការ serialize និង deserialize ភ្លាមៗដោយមិនបាច់សរសេរកូដបន្ថែម។',
            'បើក WriteIndented = true សម្រាប់ឯកសារ config ដែលមនុស្សអាន ហើយបិទវាសម្រាប់ API response តូចលឿន។',
            'បើក PropertyNameCaseInsensitive = true ពេលអាន JSON ពីសេវាខាងក្រៅដែលអាចខុសអក្សរតូចធំ។',
            'Deserialize<T> ត្រឡប់ T? (អាច null) ព្រោះ JSON "null" បម្លែងជា null—ត្រូវពិនិត្យ null ជានិច្ច។',
          ],
          exampleTitle: 'ការបម្លែង C# Records ទៅ/មកពី JSON ដោយ JsonSerializerOptions',
          tip: 'ពេលអាន ឬសរសេរ JSON ផ្ទាល់ជាមួយឯកសារ សូមប្រើ JsonSerializer.SerializeAsync(stream, data, options) និង DeserializeAsync<T>(stream, options) ជាមួយ FileStream ដើម្បីកុំឱ្យបង្កើត JSON string កណ្ដាលក្នុង RAM។',
        },
        {
          id: 'json-attributes-and-validation',
          heading: 'JSON Attributes, Enum ជាអត្ថបទ និងការដោះស្រាយកំហុស',
          body: [
            'API ជាក់ស្ដែងតែងប្រើឈ្មោះ snake_case (ដូចជា created_at), enum ជាអត្ថបទ ("Paid" ជំនួសលេខ 1) ឬទិន្នន័យសម្ងាត់ដែលមិនត្រូវបញ្ជូនចេញ (ដូចជា PasswordHash)។ System.Text.Json.Serialization ផ្ដល់ attributes ដូចជា [JsonPropertyName("created_at")], [JsonIgnore] និង [JsonConverter(typeof(JsonStringEnumConverter))] ដើម្បីគ្រប់គ្រងទម្រង់ JSON យ៉ាងច្បាស់។',
            'JSON ពីប្រភពខាងក្រៅត្រូវតែចាត់ទុកជាទិន្នន័យមិនទាន់ជឿជាក់។ រុំការ deserialize ក្នុង catch (JsonException ex) ដើម្បីបង្ហាញសារផ្ទៀងផ្ទាត់ស្អាត ជំនួសការគាំងសេវាកម្ម។',
          ],
          points: [
            'ប្រើ [JsonPropertyName("snake_key")] ដើម្បីផ្គូផ្គងរវាង PascalCase ក្នុង C# និងឈ្មោះ JSON ខាងក្រៅ។',
            'ដាក់ [JsonIgnore] លើពាក្យសម្ងាត់ តូខឹន ឬលក្ខណៈសម្បត្តិផ្ទៃក្នុងដែលមិនត្រូវបង្ហាញ។',
            'ប្រើ JsonStringEnumConverter ដើម្បីបង្ហាញ enum ជាអត្ថបទងាយអានជំនួសលេខគត់។',
            'ចាប់ JsonException ពេលបម្លែង JSON ពីអ្នកប្រើ webhooks ឬឯកសារដែលអាចខូចទម្រង់។',
          ],
          exampleTitle: 'ការកំណត់ទម្រង់ JSON ផ្ទាល់ខ្លួន និងការចាប់ JSON ខូច',
          warning:
            'កុំបង្កើត new JsonSerializerOptions() ថ្មីក្នុងរង្វិលជុំ ឬគ្រប់ HTTP request—រាល់អង្គថ្មីត្រូវគណនា metadata cache ឡើងវិញធ្វើឱ្យធ្លាក់ល្បឿន។ ត្រូវរក្សាទុក static readonly JsonSerializerOptions តែមួយហើយប្រើឡើងវិញ។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើត record AppSettings(string Theme, int MaxRetries, bool TelemetryEnabled) និងសរសេរ async method SaveAndLoadAsync(string path, AppSettings settings) ដែលសរសេរ JSON បែប camelCase មានចូលបន្ទាត់ទៅ path ដោយ File.WriteAllTextAsync រួចអានត្រឡប់មកជា AppSettings វិញ។',
        hint: 'បង្កើត static readonly JsonSerializerOptions ដោយដាក់ PropertyNamingPolicy = JsonNamingPolicy.CamelCase, PropertyNameCaseInsensitive = true និង WriteIndented = true។',
      },
      quiz: [
        {
          question: 'ហេតុអ្វីគួរប្រើ static readonly JsonSerializerOptions តែមួយឡើងវិញរាល់ការហៅ?',
          options: [
            'System.Text.Json បោះ exception បើបង្កើត JsonSerializerOptions លើសពីមួយ។',
            'JsonSerializerOptions នីមួយៗរក្សា cache metadata នៃប្រភេទទិន្នន័យ ដូច្នេះការបង្កើតថ្មីញឹកញាប់ខ្ជះខ្ជាយ CPU និង RAM។',
            'មានតែ static options ទេដែលគាំទ្រ camelCase។',
            'Non-static options មិនអើពើនឹង [JsonIgnore]។',
          ],
          answer: 1,
          explanation:
            'JsonSerializerOptions រក្សា metadata cache សម្រាប់ប្រភេទទិន្នន័យដែល serialize។ ការប្រើ static readonly តែមួយជៀសវាងការគណនា cache ដដែលៗ។',
        },
        {
          question:
            'តើវិធីណាមានសុវត្ថិភាពបំផុតសម្រាប់អានឯកសារ log ទំហំ 2 GB ម្ដងមួយបន្ទាត់ក្នុង C#?',
          options: [
            'File.ReadAllTextAsync(path) រួចហៅ .Split("\\n")',
            'File.ReadAllBytesAsync(path)',
            'File.ReadLinesAsync(path) ឬប្រើ using StreamReader',
            'JsonSerializer.Deserialize<string[]>(path)',
          ],
          answer: 2,
          explanation:
            'File.ReadLinesAsync និង StreamReader អានម្ដងមួយបន្ទាត់ដោយប្រើ RAM តិចបំផុត ខុសពី ReadAllTextAsync ដែលផ្ទុកឯកសារ 2 GB ទាំងមូលចូល RAM ក្នុងពេលតែមួយ។',
        },
      ],
    },
  },

  // =========================================================================
  // 6. GENERICS, FUNC<T>/ACTION<T> & EVENTS
  // =========================================================================
  {
    slug: 'csharp-delegates-events-generics',
    level: 'pro',
    insertAfter: 'async-await-dotnet',
    en: {
      title: 'Generics, Func<T>/Action<T> & Events',
      duration: '15 min',
      summary:
        'Design reusable, type-safe C# abstractions using generic types and where constraints, pass behavior cleanly with Action<T> and Func<T, TResult> delegates, and decouple publishers from subscribers with EventHandler<TEventArgs>.',
      objectives: [
        'Write generic classes and methods with compile-time type constraints (where T : class, IComparable<T>, new()).',
        'Pass composable callbacks and pipeline stages using built-in Action, Func, and Predicate delegates.',
        'Publish and subscribe to domain notifications safely using event EventHandler<TEventArgs> while avoiding listener memory leaks.',
      ],
      sections: [
        {
          id: 'generics-and-type-constraints',
          heading: 'Generic Types, Methods & where T : Constraints',
          body: [
            'Generics let you write algorithms and data structures—like Result<T>, Repository<TEntity>, or Clamp<T>—once and reuse them for any type with full compile-time type safety and zero boxing overhead for value types. Unlike casting through object, generic errors are caught immediately by the compiler.',
            'By default, a generic parameter T only knows the members of System.Object. Adding where constraints (such as where T : IComparable<T>, where T : class, or where T : notnull) tells the compiler what capabilities T guarantees, unlocking comparison operators, interface methods, or parameterless construction (new()) right inside your generic code.',
          ],
          points: [
            'Value types (int, decimal, structs) used in generics are JIT-specialized with zero boxing allocations.',
            'Combine multiple constraints cleanly: where T : class, IEntity, new() (class/struct first, interfaces next, new() last).',
            'Use where T : notnull for generic dictionary keys or caches that forbid null values.',
            'C# 11+ generic math interfaces (INumber<T>) allow writing a single numeric algorithm for int, double, and decimal.',
          ],
          table: {
            headers: ['Constraint', 'Meaning', 'Unlocks Inside Generic Code'],
            rows: [
              [
                'where T : class',
                'Reference type only',
                'Allows null checks and reference semantics',
              ],
              [
                'where T : struct',
                'Non-nullable value type',
                'Guaranteed value semantics, never null',
              ],
              [
                'where T : notnull',
                'Non-nullable reference or value',
                'Safe dictionary keys and non-null contracts',
              ],
              ['where T : IComparable<T>', 'Implements interface', 'Calling a.CompareTo(b) safely'],
              [
                'where T : new()',
                'Has public parameterless ctor',
                'Creating instances via new T()',
              ],
              [
                'where T : INumber<T>',
                'Numeric type (.NET 7+)',
                'Arithmetic +, -, *, / across int/decimal/double',
              ],
            ],
          },
          example: {
            title: 'Generic Result<T> Wrapper and Constrained Max Method',
            language: 'csharp',
            code: `public sealed record Result<T>(bool IsSuccess, T? Value, string? Error)
{
    public static Result<T> Ok(T value) => new(true, value, null);
    public static Result<T> Fail(string error) => new(false, default, error);
}

static T Clamp<T>(T value, T min, T max) where T : IComparable<T>
{
    if (value.CompareTo(min) < 0) return min;
    if (value.CompareTo(max) > 0) return max;
    return value;
}

var parsed = Result<int>.Ok(Clamp(140, 0, 100));
var failed = Result<int>.Fail("Timeout reached");

Console.WriteLine($"Parsed: ok={parsed.IsSuccess}, val={parsed.Value}");
Console.WriteLine($"Failed: ok={failed.IsSuccess}, err={failed.Error}");`,
            output: `Parsed: ok=True, val=100
Failed: ok=False, err=Timeout reached`,
          },
          tip: 'Use default(T) (or simply default) inside generic methods when returning an empty placeholder that works for both reference types (null) and value types (0, false).',
        },
        {
          id: 'delegates-func-action-predicate',
          heading: 'Delegates, Action<T> & Func<T, TResult> Pipelines',
          body: [
            'A delegate is a type-safe reference to a method or lambda expression. While you can declare custom delegate signatures, modern C# relies almost exclusively on built-in generic delegates: Action<...> for callbacks that return void, and Func<..., TResult> for functions that return a value (the last type parameter is always the return type).',
            'Passing Func and Action parameters lets you build reusable retry loops, middleware pipelines, caching wrappers, and custom filters without creating a separate interface for every one-method callback.',
          ],
          points: [
            'Action takes 0–16 inputs and returns void (e.g., Action<string> log).',
            'Func takes 0–16 inputs and returns the final type parameter (e.g., Func<decimal, decimal> applyTax).',
            'Predicate<T> is equivalent to Func<T, bool> and is used by List<T>.Find and List<T>.RemoveAll.',
            'Prefer static lambdas (static x => x * 2) when no outer variables are captured to prevent accidental closure allocations.',
          ],
          example: {
            title: 'Reusable Retry Helper with Func<T> and Action<string>',
            language: 'csharp',
            code: `static T Retry<T>(int maxAttempts, Func<T> operation, Action<string> log)
{
    for (int attempt = 1; attempt <= maxAttempts; attempt++)
    {
        try
        {
            return operation();
        }
        catch (Exception ex) when (attempt < maxAttempts)
        {
            log($"Attempt {attempt} failed ({ex.Message}); retrying...");
        }
    }

    throw new InvalidOperationException("Unreachable");
}

int calls = 0;
string data = Retry(
    maxAttempts: 3,
    operation: () => ++calls < 3 ? throw new TimeoutException("Slow upstream") : "Payload OK",
    log: message => Console.WriteLine(message));

Console.WriteLine($"Result: {data}");`,
            output: `Attempt 1 failed (Slow upstream); retrying...
Attempt 2 failed (Slow upstream); retrying...
Result: Payload OK`,
          },
          warning:
            'Be careful when capturing a classic for-loop index variable inside a lambda stored for later execution—all lambdas share the same variable! Copy the loop variable into a local (int idx = i;) inside the loop body before capturing it.',
        },
        {
          id: 'events-and-eventhandler',
          heading: 'Publisher-Subscriber Events with EventHandler<TEventArgs>',
          body: [
            'An event wraps a multicast delegate with encapsulation: outside subscribers can only attach (+=) or detach (-=) handlers, while only the owning publisher class can invoke or clear the event. This prevents external code from accidentally wiping out other subscribers or spoofing notifications.',
            'Follow the standard .NET event convention: define an immutable payload inheriting from EventArgs (or a record/class paired with EventHandler<TEventArgs>), declare public event EventHandler<OrderPlacedEventArgs>? OrderPlaced;, and raise it safely with the null-conditional call OrderPlaced?.Invoke(this, args).',
          ],
          points: [
            'Always invoke events using EventName?.Invoke(this, args) to stay thread-safe and avoid NullReferenceException when there are zero subscribers.',
            'Never expose a raw public Action field as a substitute for an event—any caller could overwrite it with = null.',
            'Unsubscribe with -= when a short-lived subscriber (such as a UI component or scoped handler) is disposed to prevent memory leaks.',
          ],
          example: {
            title: 'Decoupled Order Events with EventHandler<TEventArgs>',
            language: 'csharp',
            code: `public sealed class StockAlertEventArgs(string sku, int remaining) : EventArgs
{
    public string Sku { get; } = sku;
    public int Remaining { get; } = remaining;
}

public sealed class Warehouse(int lowThreshold)
{
    public event EventHandler<StockAlertEventArgs>? LowStockReached;

    public void Reserve(string sku, int currentQty, int take)
    {
        int remaining = currentQty - take;
        if (remaining <= lowThreshold)
        {
            LowStockReached?.Invoke(this, new StockAlertEventArgs(sku, remaining));
        }
    }
}

var warehouse = new Warehouse(lowThreshold: 5);
EventHandler<StockAlertEventArgs> onLowStock = (_, e) =>
    Console.WriteLine($"ALERT: {e.Sku} down to {e.Remaining} units!");

warehouse.LowStockReached += onLowStock;
warehouse.Reserve("SKU-900", currentQty: 8, take: 5);
warehouse.LowStockReached -= onLowStock; // Clean unsubscribe!
warehouse.Reserve("SKU-900", currentQty: 3, take: 1);`,
            output: `ALERT: SKU-900 down to 3 units!`,
          },
          warning:
            'Because a long-lived publisher holds strong references to every subscribed handler, forgetting to unsubscribe (-=) a short-lived listener prevents the garbage collector from freeing it—a classic .NET memory leak.',
        },
      ],
      challenge: {
        prompt:
          'Write a generic method static List<TOut> MapAndFilter<TIn, TOut>(IEnumerable<TIn> source, Func<TIn, bool> predicate, Func<TIn, TOut> selector) that filters elements matching predicate and projects them with selector without using LINQ.',
        hint: 'Loop over source with foreach, check if (predicate(item)), and add selector(item) to a List<TOut>. Validate arguments with ArgumentNullException.ThrowIfNull.',
        language: 'csharp',
        solutionCode: `static List<TOut> MapAndFilter<TIn, TOut>(
    IEnumerable<TIn> source,
    Func<TIn, bool> predicate,
    Func<TIn, TOut> selector)
{
    ArgumentNullException.ThrowIfNull(source);
    ArgumentNullException.ThrowIfNull(predicate);
    ArgumentNullException.ThrowIfNull(selector);

    List<TOut> results = [];
    foreach (TIn item in source)
    {
        if (predicate(item))
            results.Add(selector(item));
    }

    return results;
}

int[] numbers = [1, 2, 3, 4, 5, 6];
List<string> labels = MapAndFilter(numbers, n => n % 2 == 0, n => $"Even:{n * 10}");
Console.WriteLine(string.Join(", ", labels));`,
      },
      quiz: [
        {
          question: 'What does Func<string, int, bool> represent in C#?',
          options: [
            'A delegate taking bool and int and returning string.',
            'A delegate taking string and int and returning bool.',
            'A delegate taking three parameters and returning void.',
            'An event handler for string and int payloads.',
          ],
          answer: 1,
          explanation:
            'In Func<T1, T2, ..., TResult>, the final type argument is always the return type. Therefore Func<string, int, bool> accepts (string, int) and returns bool.',
        },
        {
          question:
            'Why does C# wrap delegate fields with the event keyword for publisher-subscriber notifications?',
          options: [
            'Events run automatically on a background thread.',
            'The event keyword restricts external callers to += and -= so they cannot overwrite subscribers or invoke the event directly.',
            'Delegates cannot have more than one subscriber without event.',
            'Events automatically unsubscribe listeners after one call.',
          ],
          answer: 1,
          explanation:
            'Without the event keyword, any external code could assign = null (erasing all listeners) or call Invoke directly. Adding event enforces proper publisher-subscriber encapsulation.',
        },
      ],
    },
    km: {
      title: 'Generics, Func<T>/Action<T> និង Events',
      duration: '15 នាទី',
      summary:
        'រចនាអរូបីកម្ម C# ដែលប្រើឡើងវិញបាន និងមានសុវត្ថិភាពប្រភេទដោយ generics និងលក្ខខណ្ឌ where, បញ្ជូនឥរិយាបថយ៉ាងស្អាតដោយ Action<T> និង Func<T, TResult> ព្រមទាំងបំបែកអ្នកផ្សាយ និងអ្នកទទួលដោយ EventHandler<TEventArgs>។',
      objectives: [
        'សរសេរ generic classes និង methods ដោយដាក់លក្ខខណ្ឌប្រភេទពេល compile (where T : class, IComparable<T>, new())។',
        'បញ្ជូន callbacks និងជំហានដំណើរការដោយ delegates ស្រាប់ Action, Func និង Predicate។',
        'ផ្សាយ និងជាវការជូនដំណឹងដោយសុវត្ថិភាពជាមួយ event EventHandler<TEventArgs> ដោយជៀសវាងការលេចធ្លាយអង្គចងចាំ។',
      ],
      sections: [
        {
          id: 'generics-and-type-constraints',
          heading: 'Generic Types, Methods និងលក្ខខណ្ឌ where T :',
          body: [
            'Generics អនុញ្ញាតឱ្យអ្នកសរសេររចនាសម្ព័ន្ធទិន្នន័យ និងក្បួនដោះស្រាយ—ដូចជា Result<T>, Repository<TEntity> ឬ Clamp<T>—តែម្ដង រួចប្រើឡើងវិញសម្រាប់គ្រប់ប្រភេទដោយមានសុវត្ថិភាពប្រភេទពេល compile និងគ្មានបន្ទុក boxing សម្រាប់ value types។ ខុសពីការ cast តាម object កំហុសប្រភេទត្រូវបានចាប់ភ្លាមៗដោយ compiler។',
            'ជាលំនាំដើម ប៉ារ៉ាម៉ែត្រ generic T ស្គាល់តែសមាជិករបស់ System.Object ប៉ុណ្ណោះ។ ការបន្ថែមលក្ខខណ្ឌ where (ដូចជា where T : IComparable<T>, where T : class ឬ where T : notnull) ប្រាប់ compiler ពីសមត្ថភាពដែល T ធានា ធ្វើឱ្យអ្នកអាចហៅ CompareTo វិធីសាស្ត្រ interface ឬ new T() ក្នុងកូដ generic បាន។',
          ],
          points: [
            'Value types (int, decimal, structs) ក្នុង generics ត្រូវបាន JIT បង្កើតកូដជាក់លាក់ដោយគ្មាន boxing។',
            'ផ្សំលក្ខខណ្ឌច្រើនតាមលំដាប់៖ where T : class, IEntity, new() (class/struct មុន, interfaces បន្ទាប់, new() ចុងក្រោយ)។',
            'ប្រើ where T : notnull សម្រាប់ generic dictionary keys ឬ cache ដែលមិនអនុញ្ញាត null។',
            'C# 11+ generic math (INumber<T>) អនុញ្ញាតឱ្យសរសេរក្បួនគណិតតែមួយសម្រាប់ int, double និង decimal។',
          ],
          table: {
            headers: ['លក្ខខណ្ឌ', 'អត្ថន័យ', 'អ្វីដែលអាចប្រើបានក្នុងកូដ Generic'],
            rows: [
              [
                'where T : class',
                'Reference type ប៉ុណ្ណោះ',
                'អាចពិនិត្យ null និងប្រើលក្ខណៈ reference',
              ],
              ['where T : struct', 'Value type មិនអាច null', 'ធានាតម្លៃមិនមែន null'],
              ['where T : notnull', 'ប្រភេទមិនអាច null', 'សុវត្ថិភាពសម្រាប់ key ក្នុង Dictionary'],
              [
                'where T : IComparable<T>',
                'អនុវត្ត interface ប្រៀបធៀប',
                'អាចហៅ a.CompareTo(b) ដោយសុវត្ថិភាព',
              ],
              [
                'where T : new()',
                'មាន constructor គ្មានប៉ារ៉ាម៉ែត្រ',
                'អាចបង្កើតអង្គថ្មីដោយ new T()',
              ],
              [
                'where T : INumber<T>',
                'ប្រភេទលេខ (.NET 7+)',
                'ប្រើប្រមាណវិធី +, -, *, / លើ int/decimal/double',
              ],
            ],
          },
          exampleTitle: 'Result<T> Generic និងវិធីសាស្ត្រ Clamp ដែលមានលក្ខខណ្ឌ',
          tip: 'ប្រើ default(T) (ឬ default) ក្នុងវិធីសាស្ត្រ generic ពេលត្រូវត្រឡប់តម្លៃទទេដែលដំណើរការទាំង reference types (null) និង value types (0, false)។',
        },
        {
          id: 'delegates-func-action-predicate',
          heading: 'Delegates, Action<T> និង Func<T, TResult>',
          body: [
            'Delegate គឺជាការយោងមានសុវត្ថិភាពប្រភេទទៅកាន់វិធីសាស្ត្រ ឬ lambda expression។ ទោះបីអ្នកអាចប្រកាស delegate ផ្ទាល់ខ្លួនបាន ក៏ C# ទំនើបពឹងផ្អែកស្ទើរទាំងស្រុងលើ generic delegates ស្រាប់គឺ Action<...> សម្រាប់ callback ដែលមិនត្រឡប់តម្លៃ (void) និង Func<..., TResult> សម្រាប់អនុគមន៍ដែលត្រឡប់តម្លៃ (ប្រភេទចុងក្រោយជាប្រភេទតម្លៃត្រឡប់ជានិច្ច)។',
            'ការបញ្ជូន Func និង Action អនុញ្ញាតឱ្យអ្នកសរសេរ retry helpers, middleware pipelines និងតម្រងផ្ទាល់ខ្លួនដោយមិនចាំបាច់បង្កើត interface ថ្មីសម្រាប់រាល់ callback មួយវិធីសាស្ត្រទេ។',
          ],
          points: [
            'Action ទទួលប៉ារ៉ាម៉ែត្រ 0–16 ហើយត្រឡប់ void (ឧ. Action<string> log)។',
            'Func ទទួលប៉ារ៉ាម៉ែត្រ 0–16 ហើយត្រឡប់ប្រភេទចុងក្រោយ (ឧ. Func<decimal, decimal> applyTax)។',
            'Predicate<T> ស្មើនឹង Func<T, bool> ហើយត្រូវប្រើក្នុង List<T>.Find និង List<T>.RemoveAll។',
            'ប្រើ static lambda (static x => x * 2) ពេលមិនចាប់អថេរខាងក្រៅ ដើម្បីកុំឱ្យមានការកក់អង្គចងចាំ closure។',
          ],
          exampleTitle: 'Retry Helper ដែលប្រើឡើងវិញបានជាមួយ Func<T> និង Action<string>',
          warning:
            'ប្រយ័ត្នពេលចាប់អថេរលេខរៀងក្នុងរង្វិលជុំ for ចូលក្នុង lambda ដែលរក្សាទុកប្រើពេលក្រោយ—lambda ទាំងអស់នឹងចែករំលែកអថេរតែមួយ! ត្រូវចម្លងទៅអថេរក្នុងប្លុក (int idx = i;) ជាមុនសិន។',
        },
        {
          id: 'events-and-eventhandler',
          heading: 'ប្រព័ន្ធ Publisher-Subscriber ដោយ EventHandler<TEventArgs>',
          body: [
            'Event រុំ multicast delegate ដោយផ្ដល់ការការពារ (encapsulation)៖ អ្នកជាវខាងក្រៅអាចត្រឹមតែភ្ជាប់ (+=) ឬផ្ដាច់ (-=) handler ប៉ុណ្ណោះ ចំណែកមានតែ publisher class ផ្ទាល់ទេដែលអាចហៅ (invoke) ឬសម្អាត event បាន។ នេះការពារកូដខាងក្រៅមិនឱ្យលុបអ្នកជាវដទៃ ឬបន្លំផ្សាយការជូនដំណឹង។',
            'អនុវត្តតាមស្តង់ដារ .NET៖ បង្កើត class ទិន្នន័យដែល inherit ពី EventArgs ប្រកាស public event EventHandler<StockAlertEventArgs>? LowStockReached; រួចផ្សាយដោយសុវត្ថិភាពតាម LowStockReached?.Invoke(this, args)។',
          ],
          points: [
            'តែងផ្សាយ event ដោយ EventName?.Invoke(this, args) ដើម្បីមានសុវត្ថិភាព thread និងជៀសវាង NullReferenceException ពេលគ្មានអ្នកជាវ។',
            'កុំប្រើ public Action field ទទេជំនួស event ព្រោះកូដខាងក្រៅអាចកំណត់ = null លុបអ្នកជាវទាំងអស់បាន។',
            'ត្រូវផ្ដាច់ការជាវដោយ -= ពេលអ្នកជាវអាយុខ្លី (ដូចជា UI component) ត្រូវបានបិទ ដើម្បីការពារការលេចធ្លាយអង្គចងចាំ។',
          ],
          exampleTitle: 'ការផ្សាយព្រឹត្តិការណ៍ស្តុកទំនិញជាមួយ EventHandler<TEventArgs>',
          warning:
            'ដោយសារ publisher អាយុវែងកាន់ការយោង (strong reference) ទៅកាន់គ្រប់ handler ដែលបានជាវ ការភ្លេចផ្ដាច់ (-=) អ្នកជាវអាយុខ្លីនឹងរារាំង garbage collector មិនឱ្យសម្អាតវា—បង្កការលេចធ្លាយអង្គចងចាំក្នុង .NET។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ generic method static List<TOut> MapAndFilter<TIn, TOut>(IEnumerable<TIn> source, Func<TIn, bool> predicate, Func<TIn, TOut> selector) ដែលត្រងធាតុតាម predicate និងបម្លែងតាម selector ដោយមិនប្រើ LINQ។',
        hint: 'រត់ foreach លើ source ពិនិត្យ if (predicate(item)) រួចបន្ថែម selector(item) ចូល List<TOut>។ ផ្ទៀងផ្ទាត់ប៉ារ៉ាម៉ែត្រដោយ ArgumentNullException.ThrowIfNull។',
      },
      quiz: [
        {
          question: 'តើ Func<string, int, bool> តំណាងឱ្យអ្វីក្នុង C#?',
          options: [
            'Delegate ដែលទទួល bool និង int ហើយត្រឡប់ string។',
            'Delegate ដែលទទួល string និង int ហើយត្រឡប់ bool។',
            'Delegate ដែលទទួលប៉ារ៉ាម៉ែត្របី ហើយត្រឡប់ void។',
            'Event handler សម្រាប់ទិន្នន័យ string និង int។',
          ],
          answer: 1,
          explanation:
            'ក្នុង Func<T1, T2, ..., TResult> ប្រភេទចុងក្រោយតែងជាប្រភេទតម្លៃត្រឡប់។ ដូច្នេះ Func<string, int, bool> ទទួល (string, int) និងត្រឡប់ bool។',
        },
        {
          question:
            'ហេតុអ្វី C# ប្រើពាក្យគន្លឹះ event រុំ delegate សម្រាប់ប្រព័ន្ធ publisher-subscriber?',
          options: [
            'Events រត់លើ background thread ដោយស្វ័យប្រវត្តិ។',
            'ពាក្យ event កំណត់កូដខាងក្រៅឱ្យប្រើបានតែ += និង -= ដើម្បីកុំឱ្យលុបអ្នកជាវផ្សេង ឬហៅ Invoke ផ្ទាល់។',
            'Delegate ធម្មតាមិនអាចមានអ្នកជាវលើសពីមួយទេ។',
            'Events ផ្ដាច់ការជាវដោយស្វ័យប្រវត្តិក្រោយហៅម្ដង។',
          ],
          answer: 1,
          explanation:
            'បើគ្មានពាក្យ event កូដខាងក្រៅអាចកំណត់ = null (លុបអ្នកជាវទាំងអស់) ឬហៅ Invoke ផ្ទាល់។ ការប្រើ event ធានាការការពារតាមគំរូ publisher-subscriber។',
        },
      ],
    },
  },
]
