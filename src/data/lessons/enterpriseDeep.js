export const enterpriseDeep = {
  // =========================================================================
  // JAVA (6 lessons)
  // =========================================================================
  'java/java-basics': {
    en: {
      duration: '10 min',
      objectives: [
        'Distinguish Java primitive types from reference types and wrapper classes',
        'Avoid reference-equality bugs by comparing strings and objects with .equals() or Objects.equals()',
        'Use BigDecimal for exact monetary arithmetic and StringBuilder for efficient string assembly',
        'Write clean modern Java with var, final constants, and text blocks',
      ],
      extraSections: [
        {
          id: 'primitives-vs-references',
          heading: 'Primitives, Wrapper Classes & Value Equality',
          body: [
            'Java separates data into eight stack-friendly primitive types (int, long, double, boolean, char, byte, short, float) and heap-allocated reference types (String, arrays, records, and classes). Primitives hold raw values directly and can never be null, whereas reference variables store pointers to objects on the heap.',
            'Every primitive has a corresponding wrapper class (Integer, Long, Double, Boolean) needed for generics like List<Integer>. Because wrappers and Strings are objects, comparing them with == checks whether two variables point to the exact same memory address rather than whether their values match.',
          ],
          points: [
            'Use primitives (int, long, double, boolean) for local math and counters to avoid boxing overhead.',
            'Always compare Strings and wrapper objects with .equals() or null-safe Objects.equals(a, b).',
            'Use BigDecimal with string constructors (new BigDecimal("19.99")) instead of double for money.',
            'Mark constants and non-reassigned references as final to communicate intent clearly.',
          ],
          table: {
            headers: ['Primitive', 'Size', 'Wrapper', 'Default (Field)', 'Typical Use'],
            rows: [
              ['int', '32-bit', 'Integer', '0', 'Counters, array indices, whole numbers'],
              ['long', '64-bit', 'Long', '0L', 'Timestamps, database IDs (use L suffix)'],
              ['double', '64-bit', 'Double', '0.0d', 'Scientific/geometry floats (never currency)'],
              ['boolean', '1-bit*', 'Boolean', 'false', 'Flags, conditions, feature toggles'],
              ['char', '16-bit', 'Character', "'\\u0000'", 'Single UTF-16 code unit'],
            ],
          },
          example: {
            title: 'Safe Equality, BigDecimal & Text Blocks',
            language: 'java',
            code: `import java.math.BigDecimal;
import java.util.Objects;

public class BillingBasics {
    public static void main(String[] args) {
        String a = new String("PAID");
        String b = "PAID";
        System.out.println("== check: " + (a == b));
        System.out.println("equals(): " + Objects.equals(a, b));

        BigDecimal unitPrice = new BigDecimal("19.99");
        BigDecimal qty = BigDecimal.valueOf(3);
        BigDecimal total = unitPrice.multiply(qty);

        String receipt = """
                Status : %s
                Total  : $%s
                """.formatted(b, total);
        System.out.print(receipt);
    }
}`,
            output: `== check: false
equals(): true
Status : PAID
Total  : $59.97`,
          },
          warning:
            'Never compare Strings or boxed Integers with ==. Java caches Integer values from -128 to 127, so Integer.valueOf(127) == Integer.valueOf(127) evaluates to true while 128 == 128 silently evaluates to false in production.',
        },
        {
          id: 'strings-immutability-formatting',
          heading: 'String Immutability, StringBuilder & var',
          body: [
            'In Java, String objects are immutable: every concatenation with + allocates a new String object. For a single line of logging the compiler optimizes this automatically, but concatenating inside a loop creates O(n^2) temporary objects and increases garbage-collection pressure.',
            'Use StringBuilder when assembling text inside loops, and prefer Java 15+ text blocks (triple quotes """) with .formatted(...) for readable multi-line SQL, JSON, or email templates. Use var only when the right-hand side makes the inferred type obvious to a reader.',
          ],
          points: [
            'String immutability makes strings thread-safe and safe to use as HashMap keys.',
            'Reach for StringBuilder (or String.join) whenever building text across loop iterations.',
            'Text blocks preserve indentation relative to the closing delimiter, keeping templates clean.',
            'var is strictly compile-time static typing—Java never becomes dynamically typed.',
          ],
          tip: 'When parsing numeric text from users or configs, prefer Integer.parseInt(str) for primitives rather than Integer.valueOf(str), and always validate or handle NumberFormatException.',
        },
      ],
      challenge: {
        prompt:
          'Write a Java method formatInvoice(String item, int qty, String unitPrice) that calculates the exact total using BigDecimal, validates that item is not null/blank and qty > 0, and returns a string like "Keyboard x2 = $159.98".',
        hint: 'Use new BigDecimal(unitPrice).multiply(BigDecimal.valueOf(qty)) and Objects.requireNonNull or item.isBlank().',
        language: 'java',
        solutionCode: `import java.math.BigDecimal;

public class InvoiceFormatter {
    public static String formatInvoice(String item, int qty, String unitPrice) {
        if (item == null || item.isBlank()) {
            throw new IllegalArgumentException("Item name is required");
        }
        if (qty <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }
        BigDecimal total = new BigDecimal(unitPrice).multiply(BigDecimal.valueOf(qty));
        return "%s x%d = $%s".formatted(item.trim(), qty, total.toPlainString());
    }

    public static void main(String[] args) {
        System.out.println(formatInvoice("Keyboard", 2, "79.99"));
    }
}`,
      },
      quiz: [
        {
          question: 'Why does Integer.valueOf(200) == Integer.valueOf(200) return false in Java?',
          options: [
            'Integer objects cannot be compared in Java',
            '== compares object references, and 200 is outside the cached -128..127 Integer pool',
            'Integer.valueOf() always returns a random hash code',
            'Java automatically converts Integer to double during ==',
          ],
          answer: 1,
          explanation:
            'The == operator checks reference identity on objects. Java caches Integer instances only for -128..127 by default, so two 200 wrappers are distinct heap objects; always use .equals() or Objects.equals().',
        },
        {
          question:
            'Which type should you use to store product prices and calculate invoice totals in Java?',
          options: [
            'float because it uses less memory',
            'double because it has 64-bit precision',
            'BigDecimal constructed from a String or valueOf',
            'long divided by a double tax rate',
          ],
          answer: 2,
          explanation:
            'Binary floating-point types (float and double) cannot represent base-10 decimals like 0.10 exactly, leading to rounding errors in financial calculations. BigDecimal provides exact decimal arithmetic.',
        },
      ],
    },
    km: {
      duration: '10 នាទី',
      objectives: [
        'បែងចែកឱ្យច្បាស់រវាងប្រភេទ Primitive ប្រភេទ Reference និង Wrapper Classes ក្នុង Java',
        'ជៀសវាងកំហុសប្រៀបធៀបអាសយដ្ឋានដោយប្រើ .equals() ឬ Objects.equals()',
        'ប្រើ BigDecimal សម្រាប់ការគណនាប្រាក់ជាក់លាក់ និង StringBuilder សម្រាប់ភ្ជាប់អត្ថបទក្នុងរង្វិលជុំ',
        'សរសេរ Java សម័យទំនើបយ៉ាងស្អាតជាមួយ var, final និង text blocks',
      ],
      extraSections: [
        {
          id: 'primitives-vs-references',
          heading: 'ប្រភេទ Primitive, Wrapper Classes និងការប្រៀបធៀបតម្លៃ',
          body: [
            'Java បែងចែកទិន្នន័យជាប្រភេទ primitive ចំនួន ៨ (int, long, double, boolean, char, byte, short, float) និងប្រភេទ reference ដែលរក្សាទុកលើ heap (String, arrays, records និង classes)។ Primitive ផ្ទុកតម្លៃផ្ទាល់ហើយមិនអាចជា null បានទេ ចំណែកអថេរ reference ផ្ទុកអាសយដ្ឋានចង្អុលទៅ object លើ heap។',
            'រាល់ primitive មាន wrapper class ផ្គូផ្គង (Integer, Long, Double, Boolean) សម្រាប់ប្រើក្នុង generics ដូចជា List<Integer>។ ដោយសារ wrapper និង String គឺជា object ការប្រៀបធៀបដោយ == ពិនិត្យមើលថាវាចង្អុលទៅទីតាំងអង្គចងចាំតែមួយឬអត់ មិនមែនពិនិត្យតម្លៃខាងក្នុងឡើយ។',
          ],
          points: [
            'ប្រើ primitive (int, long, double, boolean) សម្រាប់ការគណនា និងរាប់ចំនួន ដើម្បីកាត់បន្ថយបន្ទុក boxing។',
            'ប្រៀបធៀប String និង wrapper objects ដោយប្រើ .equals() ឬ Objects.equals(a, b) ជានិច្ច។',
            'ប្រើ BigDecimal ដោយបញ្ចូល String (new BigDecimal("19.99")) ជំនួស double សម្រាប់ការគណនាប្រាក់។',
            'ប្រើ final សម្រាប់តម្លៃថេរ និងអថេរដែលមិនប្ដូរតម្លៃ ដើម្បីបង្ហាញបំណងកូដឱ្យច្បាស់។',
          ],
          table: {
            headers: ['Primitive', 'ទំហំ', 'Wrapper', 'តម្លៃដើម (Field)', 'ការប្រើប្រាស់ទូទៅ'],
            rows: [
              ['int', '32-bit', 'Integer', '0', 'អថេររាប់ លេខរៀង array ចំនួនគត់'],
              ['long', '64-bit', 'Long', '0L', 'Timestamp, ID មូលដ្ឋានទិន្នន័យ (ដាក់ L)'],
              ['double', '64-bit', 'Double', '0.0d', 'គណនាវិទ្យាសាស្ត្រ (ហាមប្រើសម្រាប់ប្រាក់)'],
              ['boolean', '1-bit*', 'Boolean', 'false', 'លក្ខខណ្ឌ ទង់សម្គាល់ feature flags'],
              ['char', '16-bit', 'Character', "'\\u0000'", 'តួអក្សរ UTF-16 មួយតួ'],
            ],
          },
          exampleTitle: 'ការប្រៀបធៀបដោយសុវត្ថិភាព BigDecimal និង Text Blocks',
          warning:
            'កុំប្រៀបធៀប String ឬ Integer ដោយប្រើ ==។ Java រក្សា cache សម្រាប់ Integer ពី -128 ដល់ 127 ដូច្នេះ 127 == 127 ផ្ដល់ true ប៉ុន្តែ 128 == 128 ផ្ដល់ false ដែលបង្កកំហុសស្ងាត់ៗក្នុងប្រព័ន្ធពិត។',
        },
        {
          id: 'strings-immutability-formatting',
          heading: 'ភាពមិនអាចកែប្រែរបស់ String, StringBuilder និង var',
          body: [
            'ក្នុង Java តម្លៃ String មិនអាចកែប្រែបានទេ (immutable)៖ រាល់ការភ្ជាប់ដោយ + បង្កើត String object ថ្មី។ ការភ្ជាប់អត្ថបទនៅក្នុងរង្វិលជុំបង្កើត object បណ្ដោះអាសន្នច្រើនកម្រិត O(n^2) និងបង្កើនបន្ទុកដល់ garbage collector។',
            'ប្រើ StringBuilder នៅពេលផ្គុំអត្ថបទក្នុងរង្វិលជុំ ហើយប្រើ text blocks (""") ភ្ជាប់ជាមួយ .formatted(...) សម្រាប់ទម្រង់ SQL ឬ JSON ច្រើនបន្ទាត់។ ប្រើ var តែពេលផ្នែកខាងស្ដាំបង្ហាញប្រភេទទិន្នន័យយ៉ាងច្បាស់ប៉ុណ្ណោះ។',
          ],
          points: [
            'ភាពមិនអាចកែប្រែរបស់ String ធ្វើឱ្យវាមានសុវត្ថិភាពក្នុង multi-threading និងស័ក្តិសមជា key ក្នុង HashMap។',
            'ប្រើ StringBuilder (ឬ String.join) រាល់ពេលផ្គុំអត្ថបទឆ្លងកាត់រង្វិលជុំ។',
            'Text blocks រក្សាការចូលបន្ទាត់បានស្អាត ងាយអានសម្រាប់គំរូអត្ថបទវែងៗ។',
            'var នៅតែជាប្រភេទទិន្នន័យថេរពេល compile មិនមែនប្រភេទថាមវន្តទេ។',
          ],
          tip: 'ពេលបម្លែងអត្ថបទជាលេខ ប្រើ Integer.parseInt(str) សម្រាប់ primitive ជំនួស Integer.valueOf(str) ហើយត្រៀមចាប់កំហុស NumberFormatException ជានិច្ច។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ Java formatInvoice(String item, int qty, String unitPrice) ដែលគណនាតម្លៃសរុបជាក់លាក់ដោយប្រើ BigDecimal ផ្ទៀងផ្ទាត់ថា item មិនមែន null/ទទេ និង qty > 0 រួចត្រឡប់អត្ថបទដូចជា "Keyboard x2 = $159.98"។',
        hint: 'ប្រើ new BigDecimal(unitPrice).multiply(BigDecimal.valueOf(qty)) និង item.isBlank()។',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វីបានជា Integer.valueOf(200) == Integer.valueOf(200) ត្រឡប់ false ក្នុង Java?',
          options: [
            'មិនអាចប្រៀបធៀប Integer objects ក្នុង Java បានទេ',
            '== ប្រៀបធៀបអាសយដ្ឋានអង្គចងចាំ ហើយ 200 ស្ថិតនៅក្រៅដែន cache -128..127 របស់ Integer',
            'Integer.valueOf() បង្កើត hash code ចៃដន្យជានិច្ច',
            'Java បម្លែង Integer ទៅ double ដោយស្វ័យប្រវត្តិពេលប្រើ ==',
          ],
          answer: 1,
          explanation:
            'សញ្ញា == ពិនិត្យអត្តសញ្ញាណអាសយដ្ឋានលើ object។ Java cache តែតម្លៃ -128..127 ដូច្នេះ 200 ទាំងពីរជា object ផ្សេងគ្នា ត្រូវប្រើ .equals() ឬ Objects.equals()។',
        },
        {
          question: 'តើគួរប្រើប្រភេទទិន្នន័យណាដើម្បីរក្សាតម្លៃទំនិញ និងគណនាវិក្កយបត្រក្នុង Java?',
          options: [
            'float ព្រោះវាប្រើអង្គចងចាំតិច',
            'double ព្រោះវាមានភាពលម្អិត 64-bit',
            'BigDecimal ដែលបង្កើតពី String ឬ valueOf',
            'long ចែកនឹងអត្រាពន្ធ double',
          ],
          answer: 2,
          explanation:
            'ប្រភេទទសភាគគោលពីរ (float/double) មិនអាចតំណាងលេខគោលដប់ដូច 0.10 បានជាក់លាក់ទេ ដែលបង្កកំហុសបង្គត់លេខប្រាក់។ BigDecimal ផ្ដល់ការគណនាទសភាគជាក់លាក់។',
        },
      ],
    },
  },

  'java/java-control-flow-methods': {
    en: {
      duration: '11 min',
      objectives: [
        'Flatten deeply nested conditionals using guard clauses and early returns',
        'Choose the right Java loop construct and avoid ConcurrentModificationException',
        'Understand Java pass-by-value semantics for both primitives and object references',
        'Design clean overloaded methods and varargs helpers',
      ],
      extraSections: [
        {
          id: 'guard-clauses-and-loops',
          heading: 'Guard Clauses, Loops & Safe Iteration',
          body: [
            'Deeply nested if/else pyramids hide the main logic of a method. Professional Java engineers validate invalid inputs at the top of a method and return or throw immediately—a pattern called guard clauses—leaving the happy path flat and readable.',
            'When iterating collections, the enhanced for-each loop prevents off-by-one index bugs. Reach for a classic indexed for loop only when you genuinely need the numeric index, and use while loops when the stopping condition depends on external state rather than collection size.',
          ],
          points: [
            'Place guard clauses at the top of methods to reject null, empty, or out-of-range inputs early.',
            'Use enhanced for-each loops for read-only traversal of arrays, Lists, and Sets.',
            'Modern arrow switch expressions (->) never fall through accidentally and force exhaustive handling when returning a value.',
            'Use continue to skip irrelevant items cleanly instead of wrapping the entire loop body in an if block.',
          ],
          table: {
            headers: ['Loop Construct', 'Best Used For', 'Common Pitfall'],
            rows: [
              [
                'for (T item : list)',
                'Reading every element in a collection/array',
                'Mutating list structure throws ConcurrentModificationException',
              ],
              [
                'for (int i = 0; i < n; i++)',
                'Index-sensitive logic or parallel arrays',
                'Off-by-one errors (<= instead of <)',
              ],
              [
                'while (condition)',
                'Reading streams/queues until a sentinel state',
                'Forgetting to advance state causes infinite loop',
              ],
              [
                'do { ... } while (cond)',
                'Prompting or retrying at least once',
                'Runs once even if initial condition is false',
              ],
            ],
          },
          example: {
            title: 'Guard Clauses & Filtered Loop Aggregation',
            language: 'java',
            code: `import java.util.List;

public class OrderCalculator {
    record LineItem(String name, double price, boolean cancelled) {}

    static double activeSubtotal(List<LineItem> items) {
        if (items == null || items.isEmpty()) {
            return 0.0;
        }
        double total = 0.0;
        for (LineItem item : items) {
            if (item.cancelled() || item.price() < 0) {
                continue;
            }
            total += item.price();
        }
        return total;
    }

    public static void main(String[] args) {
        var cart = List.of(
            new LineItem("Mouse", 25.0, false),
            new LineItem("Hub", 40.0, true),
            new LineItem("Stand", 35.0, false)
        );
        System.out.println("Subtotal: $" + activeSubtotal(cart));
    }
}`,
            output: `Subtotal: $60.0`,
          },
          warning:
            'Removing elements from an ArrayList inside an enhanced for-each loop throws ConcurrentModificationException at runtime. Use list.removeIf(predicate), an explicit Iterator.remove(), or create a new filtered list instead.',
        },
        {
          id: 'method-overloading-varargs',
          heading: 'Pass-by-Value, Method Overloading & Varargs',
          body: [
            'Java is strictly pass-by-value—always. For primitives, the method receives a copy of the number; for objects, the method receives a copy of the reference pointing to the same heap object. Reassigning a parameter inside a method never changes the caller’s variable, although calling mutating methods on a mutable object (like list.add()) does affect the shared instance.',
            'Method overloading lets you provide convenient defaults with the same method name and different parameter lists (for example, formatPrice(double) delegating to formatPrice(double, String)). Varargs (int... scores) accept zero or more arguments as an array and must always be the final parameter in the signature.',
          ],
          points: [
            'Delegate overloaded methods to one canonical overload so validation logic lives in a single place.',
            'Never mutate a caller-supplied List or array unless the method name explicitly states it (e.g., sortInPlace).',
            'Varargs (T... args) can receive an empty array—always guard against args.length == 0.',
            'Keep method parameter lists short; once a method exceeds 4 parameters, group them into a record.',
          ],
          tip: 'Prefer returning immutable views or new values from helper methods instead of relying on side effects through mutated parameters—it makes methods drastically easier to test and reason about.',
        },
      ],
      challenge: {
        prompt:
          'Write a static method averagePositive(int... values) that ignores zero and negative numbers and returns 0.0 if no positive values are provided.',
        hint: 'Track both sum (as double or long) and count of positive numbers, then return count == 0 ? 0.0 : (double) sum / count.',
        language: 'java',
        solutionCode: `public class StatsHelper {
    static double averagePositive(int... values) {
        if (values == null || values.length == 0) {
            return 0.0;
        }
        long sum = 0;
        int count = 0;
        for (int v : values) {
            if (v <= 0) continue;
            sum += v;
            count++;
        }
        return count == 0 ? 0.0 : (double) sum / count;
    }

    public static void main(String[] args) {
        System.out.println(averagePositive(-5, 10, 0, 20, 30));
        System.out.println(averagePositive(-2, -8));
    }
}`,
      },
      quiz: [
        {
          question:
            'What happens if you call list.remove(item) directly inside an enhanced for (String item : list) loop?',
          options: [
            'The item is silently skipped without error',
            'The compiler refuses to compile the loop',
            'Java throws a ConcurrentModificationException at runtime',
            'The loop restarts automatically from index 0',
          ],
          answer: 2,
          explanation:
            'Enhanced for-each uses a fail-fast Iterator under the hood. Structurally modifying the list directly invalidates the iterator and throws ConcurrentModificationException; use list.removeIf() or Iterator.remove() instead.',
        },
        {
          question: 'Which statement accurately describes how Java passes arguments to methods?',
          options: [
            'Primitives are passed by value, and objects are passed by reference',
            'Everything in Java is passed by value (object arguments pass a copy of the reference)',
            'Strings are passed by reference while numbers are passed by value',
            'Only final parameters are passed by value',
          ],
          answer: 1,
          explanation:
            'Java is always pass-by-value. Passing an object copies its reference value, so mutating fields on the object is visible to the caller, but reassigning the parameter variable itself never affects the caller.',
        },
      ],
    },
    km: {
      duration: '11 នាទី',
      objectives: [
        'កាត់បន្ថយការជាន់ if/else ជ្រៅៗដោយប្រើ guard clauses និង early returns',
        'ជ្រើសរើសរង្វិលជុំ Java ឱ្យត្រឹមត្រូវ និងជៀសវាង ConcurrentModificationException',
        'យល់ច្បាស់ពីគោលការណ៍ pass-by-value របស់ Java សម្រាប់ទាំង primitive និង object reference',
        'រចនា overloaded methods និងអនុគមន៍ varargs ឱ្យស្អាតងាយប្រើ',
      ],
      extraSections: [
        {
          id: 'guard-clauses-and-loops',
          heading: 'Guard Clauses រង្វិលជុំ និងការដើរកាត់ទិន្នន័យដោយសុវត្ថិភាព',
          body: [
            'ការសរសេរ if/else ជាន់គ្នាជ្រៅៗធ្វើឱ្យតក្កវិជ្ជាស្នូលរបស់អនុគមន៍ពិបាកអាន។ វិស្វករ Java អាជីពផ្ទៀងផ្ទាត់ទិន្នន័យមិនត្រឹមត្រូវនៅផ្នែកខាងលើនៃអនុគមន៍ ហើយ return ឬ throw ភ្លាមៗ (ហៅថា guard clauses) ដើម្បីឱ្យកូដសំខាន់ស្ថិតនៅកម្រិតស្មើគ្នា និងងាយអាន។',
            'ពេលដើរកាត់ collection រង្វិលជុំ enhanced for-each ជួយការពារកំហុសលេខរៀង (off-by-one)។ ប្រើ for មាន index តែពេលអ្នកពិតជាត្រូវការលេខរៀងប៉ុណ្ណោះ ហើយប្រើ while ពេលលក្ខខណ្ឌបញ្ឈប់អាស្រ័យលើស្ថានភាពខាងក្រៅ។',
          ],
          points: [
            'ដាក់ guard clauses នៅដើមអនុគមន៍ ដើម្បីបដិសេធទិន្នន័យ null ទទេ ឬខុសដែនកំណត់ជាមុន។',
            'ប្រើ enhanced for-each សម្រាប់អានទិន្នន័យក្នុង array, List និង Set។',
            'Switch expression សម័យទំនើប (->) មិនធ្លាក់ករណីដោយអចេតនា ហើយបង្ខំឱ្យគ្របដណ្ដប់គ្រប់លទ្ធភាពពេលត្រឡប់តម្លៃ។',
            'ប្រើ continue ដើម្បីរំលងធាតុមិនពាក់ព័ន្ធ ជំនួសឱ្យការរុំកូដរង្វិលជុំទាំងមូលក្នុង if។',
          ],
          table: {
            headers: ['ប្រភេទរង្វិលជុំ', 'ស័ក្តិសមបំផុតសម្រាប់', 'កំហុសដែលកើតញឹកញាប់'],
            rows: [
              [
                'for (T item : list)',
                'អានធាតុទាំងអស់ក្នុង collection ឬ array',
                'កែប្រែរចនាសម្ព័ន្ធ list បង្ក ConcurrentModificationException',
              ],
              [
                'for (int i = 0; i < n; i++)',
                'តក្កវិជ្ជាដែលត្រូវការ index ឬ array ពីរស្របគ្នា',
                'កំហុសលើសមួយជំហាន (<= ជំនួស <)',
              ],
              [
                'while (condition)',
                'អាន stream ឬ queue រហូតដល់ស្ថានភាពបញ្ឈប់',
                'ភ្លេចកែប្រែលក្ខខណ្ឌបង្ករង្វិលជុំគ្មានទីបញ្ចប់',
              ],
              [
                'do { ... } while (cond)',
                'សួរអ្នកប្រើ ឬសាកល្បងឡើងវិញយ៉ាងតិចម្ដង',
                'ដំណើរការម្ដងទោះលក្ខខណ្ឌដំបូងជា false',
              ],
            ],
          },
          exampleTitle: 'Guard Clauses និងការបូកសរុបទិន្នន័យដែលបានត្រង',
          warning:
            'ការលុបធាតុចេញពី ArrayList ដោយផ្ទាល់ក្នុងរង្វិលជុំ enhanced for-each នឹងបោះកំហុស ConcurrentModificationException ពេលដំណើរការ។ ត្រូវប្រើ list.removeIf(...) ឬ Iterator.remove() ជំនួសវិញ។',
        },
        {
          id: 'method-overloading-varargs',
          heading: 'Pass-by-Value, Method Overloading និង Varargs',
          body: [
            'Java ប្រើគោលការណ៍ pass-by-value ជានិច្ច។ សម្រាប់ primitive អនុគមន៍ទទួលច្បាប់ចម្លងនៃលេខ ចំណែកសម្រាប់ object អនុគមន៍ទទួលច្បាប់ចម្លងនៃ reference ដែលចង្អុលទៅ object តែមួយលើ heap។ ការផ្ដល់តម្លៃថ្មីឱ្យប៉ារ៉ាម៉ែត្រមិនផ្លាស់ប្ដូរអថេរដើមរបស់អ្នកហៅទេ ប៉ុន្តែការកែប្រែទិន្នន័យខាងក្នុង object (ដូចជា list.add()) នឹងប៉ះពាល់ដល់ object រួមនោះ។',
            'Method overloading អនុញ្ញាតឱ្យបង្កើតអនុគមន៍ឈ្មោះដូចគ្នាដែលមានប៉ារ៉ាម៉ែត្រខុសគ្នា ដើម្បីផ្ដល់តម្លៃលំនាំដើមងាយស្រួលប្រើ។ Varargs (int... scores) អាចទទួលតម្លៃពី ០ ឡើងទៅជា array ហើយត្រូវតែជាប៉ារ៉ាម៉ែត្រចុងក្រោយគេជានិច្ច។',
          ],
          points: [
            'ឱ្យ overloaded methods ហៅបន្តទៅកាន់អនុគមន៍មេតែមួយ ដើម្បីកុំឱ្យសរសេរកូដផ្ទៀងផ្ទាត់ស្ទួនគ្នា។',
            'កុំកែប្រែ List ឬ array ដែលអ្នកហៅបញ្ជូនមក លើកលែងតែឈ្មោះអនុគមន៍បញ្ជាក់ច្បាស់។',
            'Varargs (T... args) អាចជា array ទទេ — ត្រូវពិនិត្យ args.length == 0 ជានិច្ច។',
            'រក្សាចំនួនប៉ារ៉ាម៉ែត្រឱ្យខ្លី (<= 4) បើលើសពីនេះគួរផ្ដុំវាជា record មួយ។',
          ],
          tip: 'គួរត្រឡប់តម្លៃថ្មី ឬបញ្ជីមិនអាចកែប្រែបានពីអនុគមន៍ជំនួយ ជំនួសឱ្យការកែប្រែប៉ារ៉ាម៉ែត្រដោយប្រយោល ដើម្បីឱ្យកូដងាយតេស្ត និងងាយតាមដាន។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ static method ឈ្មោះ averagePositive(int... values) ដែលរំលងលេខសូន្យ និងលេខអវិជ្ជមាន ហើយត្រឡប់ 0.0 ប្រសិនបើគ្មានលេខវិជ្ជមានណាមួយឡើយ។',
        hint: 'រក្សាទាំងផលបូក sum និងចំនួនលេខវិជ្ជមាន count រួចត្រឡប់ count == 0 ? 0.0 : (double) sum / count។',
      },
      quiz: [
        {
          question:
            'តើមានអ្វីកើតឡើងប្រសិនបើអ្នកហៅ list.remove(item) ដោយផ្ទាល់នៅក្នុង for (String item : list)?',
          options: [
            'ធាតុនោះត្រូវបានរំលងដោយគ្មានកំហុស',
            'Compiler មិនអនុញ្ញាតឱ្យ compile កូដទេ',
            'Java បោះកំហុស ConcurrentModificationException ពេលដំណើរការ',
            'រង្វិលជុំចាប់ផ្ដើមឡើងវិញពី index 0 ដោយស្វ័យប្រវត្តិ',
          ],
          answer: 2,
          explanation:
            'Enhanced for-each ប្រើ fail-fast Iterator នៅខាងក្រោយ។ ការកែប្រែរចនាសម្ព័ន្ធ list ដោយផ្ទាល់បង្ក ConcurrentModificationException ដូច្នេះត្រូវប្រើ list.removeIf() ឬ Iterator.remove()។',
        },
        {
          question: 'តើឃ្លាណាមួយពណ៌នាត្រឹមត្រូវពីរបៀបដែល Java បញ្ជូនអាគុយម៉ង់ទៅអនុគមន៍?',
          options: [
            'Primitive បញ្ជូនតាម value ហើយ object បញ្ជូនតាម reference',
            'អ្វីៗទាំងអស់ក្នុង Java បញ្ជូនតាម value (object បញ្ជូនច្បាប់ចម្លងនៃ reference)',
            'String បញ្ជូនតាម reference ចំណែកលេខបញ្ជូនតាម value',
            'មានតែប៉ារ៉ាម៉ែត្រ final ប៉ុណ្ណោះដែលបញ្ជូនតាម value',
          ],
          answer: 1,
          explanation:
            'Java ប្រើ pass-by-value ជានិច្ច។ ការបញ្ជូន object គឺចម្លងតម្លៃ reference ដូច្នេះការកែ field ខាងក្នុង object អាចមើលឃើញពីខាងក្រៅ ប៉ុន្តែការផ្ដល់តម្លៃថ្មីឱ្យអថេរប៉ារ៉ាម៉ែត្រមិនប៉ះពាល់អ្នកហៅទេ។',
        },
      ],
    },
  },

  'java/oop-classes-interfaces': {
    en: {
      duration: '13 min',
      objectives: [
        'Model closed domain hierarchies safely using Java 21 sealed interfaces and pattern matching',
        'Prefer composition over inheritance to avoid fragile superclass coupling',
        'Enforce invariants inside record compact constructors and protect mutable fields',
        'Respect the equals() and hashCode() contract for HashMap and HashSet correctness',
      ],
      extraSections: [
        {
          id: 'composition-and-sealed',
          heading: 'Composition Over Inheritance & Sealed Hierarchies',
          body: [
            'Classic OOP tutorials overuse class inheritance (extends), which tightly couples subclasses to superclass internals. In production Java, prefer composition: hold interfaces as private final fields and delegate work to them. Composition lets you swap behavior cleanly at runtime and keeps unit tests simple.',
            'When a domain concept has a fixed set of valid variants—such as payment results or domain events—use a sealed interface paired with records. The Java compiler knows every permitted subtype, allowing exhaustive pattern-matching switch expressions with zero default catch-all hacks.',
          ],
          points: [
            'Use interfaces for behavioral contracts and records for immutable data carriers.',
            'Use sealed interfaces (permits A, B, C) to model algebraic data types with compile-time exhaustiveness.',
            'Keep fields private final whenever possible so objects cannot enter half-initialized states.',
            'Default to package-private or private visibility; expose only what callers genuinely need.',
          ],
          table: {
            headers: ['Modifier / Keyword', 'Visibility / Role', 'Best Practice'],
            rows: [
              [
                'private',
                'Inside declaring class only',
                'Default for all fields and internal helpers',
              ],
              ['(package-private)', 'Same package only', 'Great for module-internal collaborators'],
              ['protected', 'Same package + subclasses', 'Use sparingly; forms part of public API'],
              ['public', 'Accessible everywhere', 'Expose narrow, stable interfaces and records'],
              [
                'sealed ... permits',
                'Restricts allowed subtypes',
                'Pair with records for exhaustive switch matching',
              ],
            ],
          },
          example: {
            title: 'Sealed Interface with Records & Pattern Matching',
            language: 'java',
            code: `public class PaymentDemo {
    sealed interface PaymentResult permits Approved, Declined {}
    record Approved(String txId, double amount) implements PaymentResult {}
    record Declined(String reason) implements PaymentResult {}

    static String describe(PaymentResult result) {
        return switch (result) {
            case Approved(var id, var amt) -> "Approved #" + id + " ($" + amt + ")";
            case Declined(var reason) -> "Declined: " + reason;
        };
    }

    public static void main(String[] args) {
        System.out.println(describe(new Approved("TX-901", 49.50)));
        System.out.println(describe(new Declined("Insufficient funds")));
    }
}`,
            output: `Approved #TX-901 ($49.5)
Declined: Insufficient funds`,
          },
          warning:
            'Deep inheritance chains (A extends B extends C) create fragile base classes where a small change in a parent method silently breaks overridden behavior in subclasses. Reach for composition and interfaces first.',
        },
        {
          id: 'equals-hashcode-encapsulation',
          heading: 'Compact Constructors, Defensive Copies & equals/hashCode',
          body: [
            'Java records let you add a compact constructor to validate invariants before fields are assigned, ensuring invalid objects can never exist in your system. If a record or class holds a List or Date, make a defensive copy (List.copyOf(items)) so outside code cannot mutate internal state behind your back.',
            'Whenever you override equals() in a regular class, you MUST also override hashCode() using the same fields. HashMap and HashSet use hashCode() to locate buckets first; two logically equal objects with different hash codes will never be found in a hash collection.',
          ],
          points: [
            'Validate preconditions inside record compact constructors (e.g., non-negative amounts, non-blank IDs).',
            'Wrap incoming collections with List.copyOf() or Set.copyOf() to guarantee true immutability.',
            'Contract rule: if a.equals(b) is true, a.hashCode() == b.hashCode() must always be true.',
            'Records automatically generate consistent equals(), hashCode(), and toString() from all components.',
          ],
          tip: 'Never use mutable fields inside equals() or hashCode() for objects stored as HashMap keys—mutating a key after insertion makes it permanently unreachable in the map.',
        },
      ],
      challenge: {
        prompt:
          'Create a Java record Money(BigDecimal amount, String currency) with a compact constructor that rejects null/negative amount or blank currency (normalizing currency to uppercase), plus an add(Money other) method that verifies currencies match.',
        hint: 'In a compact constructor, reassigning currency = currency.trim().toUpperCase() automatically initializes the record component.',
        language: 'java',
        solutionCode: `import java.math.BigDecimal;
import java.util.Objects;

public record Money(BigDecimal amount, String currency) {
    public Money {
        Objects.requireNonNull(amount, "amount is required");
        if (amount.signum() < 0) {
            throw new IllegalArgumentException("amount cannot be negative");
        }
        if (currency == null || currency.isBlank()) {
            throw new IllegalArgumentException("currency is required");
        }
        currency = currency.trim().toUpperCase();
    }

    public Money add(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException("Currency mismatch: " + currency + " vs " + other.currency);
        }
        return new Money(this.amount.add(other.amount), this.currency);
    }
}`,
      },
      quiz: [
        {
          question:
            'What goes wrong if a regular class overrides equals() but forgets to override hashCode()?',
          options: [
            'The Java compiler refuses to compile the class',
            'Two equal instances can produce different hash codes and fail lookups in HashMap/HashSet',
            'toString() will throw a NullPointerException',
            'The class can no longer implement interfaces',
          ],
          answer: 1,
          explanation:
            'Hash-based collections check hashCode() first to pick a bucket. Without a matching hashCode() override, equal objects inherit Object.hashCode() (memory-based) and will not match inside HashMap or HashSet.',
        },
        {
          question:
            'Why are sealed interfaces especially effective when combined with Java 21 switch pattern matching?',
          options: [
            'They make all fields public automatically',
            'They disable garbage collection for permitted subclasses',
            'The compiler knows all permitted subtypes and enforces exhaustive case handling without a default branch',
            'They allow multiple class inheritance in Java',
          ],
          answer: 2,
          explanation:
            'Because a sealed interface explicitly lists every permitted subtype, the compiler verifies that a switch covers all variants—if you add a new variant later, every unhandled switch becomes a compile-time error.',
        },
      ],
    },
    km: {
      duration: '13 នាទី',
      objectives: [
        'រចនាប្រភេទទិន្នន័យបិទជិតដោយសុវត្ថិភាពជាមួយ sealed interfaces និង pattern matching ក្នុង Java 21',
        'អនុវត្ត Composition ជំនួស Inheritance ដើម្បីកាត់បន្ថយការពឹងផ្អែកគ្នាស្មុគស្មាញ',
        'ផ្ទៀងផ្ទាត់លក្ខខណ្ឌទិន្នន័យក្នុង compact constructor របស់ record និងការពារ mutable fields',
        'គោរពកិច្ចសន្យា equals() និង hashCode() ដើម្បីឱ្យ HashMap និង HashSet ដំណើរការត្រឹមត្រូវ',
      ],
      extraSections: [
        {
          id: 'composition-and-sealed',
          heading: 'Composition ជំនួស Inheritance និង Sealed Hierarchies',
          body: [
            'ការប្រើ class inheritance (extends) ហួសហេតុធ្វើឱ្យ subclass ពឹងផ្អែកខ្លាំងលើកូដខាងក្នុងរបស់ superclass។ ក្នុងការសរសេរ Java អាជីព គួរប្រើ composition៖ រក្សា interface ជា private final field រួចបញ្ជូនភារកិច្ចទៅវា ដែលជួយឱ្យងាយប្ដូរឥរិយាបថ និងងាយសរសេរ unit tests។',
            'នៅពេលទិន្នន័យក្នុងប្រព័ន្ធមានប្រភេទកំណត់ជាក់លាក់ (ដូចជាលទ្ធផលទូទាត់ប្រាក់ Approved ឬ Declined) ត្រូវប្រើ sealed interface រួមជាមួយ records។ Compiler ដឹងគ្រប់ប្រភេទកូនទាំងអស់ ហើយអនុញ្ញាតឱ្យ switch ផ្ទៀងផ្ទាត់គ្រប់ករណីដោយមិនចាំបាច់មាន default ទេ។',
          ],
          points: [
            'ប្រើ interfaces សម្រាប់កិច្ចសន្យាឥរិយាបថ និង records សម្រាប់ផ្ទុកទិន្នន័យមិនអាចកែប្រែបាន។',
            'ប្រើ sealed interfaces (permits A, B) ដើម្បីឱ្យ compiler ធានាការគ្របដណ្ដប់គ្រប់ករណីក្នុង switch។',
            'កំណត់ field ជា private final តាមដែលអាចធ្វើបាន ដើម្បីការពារស្ថានភាពទិន្នន័យមិនពេញលេញ។',
            'ចាប់ផ្ដើមពីកម្រិតចូលប្រើ private ឬ package-private ហើយបើក public តែអ្វីដែលចាំបាច់ប៉ុណ្ណោះ។',
          ],
          table: {
            headers: ['Modifier / ពាក្យគន្លឹះ', 'ដែនចូលប្រើ / តួនាទី', 'ការអនុវត្តល្អបំផុត'],
            rows: [
              [
                'private',
                'តែក្នុង class ផ្ទាល់ប៉ុណ្ណោះ',
                'លំនាំដើមសម្រាប់ field និងអនុគមន៍ជំនួយខាងក្នុង',
              ],
              [
                '(package-private)',
                'តែក្នុង package ដូចគ្នា',
                'ល្អសម្រាប់ class សហការផ្ទៃក្នុង module',
              ],
              [
                'protected',
                'package ដូចគ្នា + subclasses',
                'ប្រើដោយប្រយ័ត្ន ព្រោះវាក្លាយជាផ្នែកនៃ API',
              ],
              ['public', 'ចូលប្រើបានពីគ្រប់ទីកន្លែង', 'បើកតែ interface និង record ដែលមានស្ថិរភាព'],
              [
                'sealed ... permits',
                'កំណត់ប្រភេទកូនដែលអនុញ្ញាត',
                'ផ្គូផ្គងជាមួយ record សម្រាប់ switch គ្រប់ជ្រុងជ្រោយ',
              ],
            ],
          },
          exampleTitle: 'Sealed Interface ជាមួយ Records និង Pattern Matching',
          warning:
            'ខ្សែសង្វាក់ inheritance ជ្រៅៗ (A extends B extends C) បង្កើត superclass ដែលងាយបែកបាក់៖ ការកែប្រែតូចមួយលើ class មេអាចធ្វើឱ្យ subclass ខាងក្រោមខូចដោយស្ងាត់ៗ។ ត្រូវជ្រើសរើស composition និង interfaces មុនជានិច្ច។',
        },
        {
          id: 'equals-hashcode-encapsulation',
          heading: 'Compact Constructors, Defensive Copies និង equals/hashCode',
          body: [
            'Java records អនុញ្ញាតឱ្យបន្ថែម compact constructor ដើម្បីពិនិត្យលក្ខខណ្ឌទិន្នន័យមុនពេលផ្ដល់តម្លៃឱ្យ field ធានាថា object មិនត្រឹមត្រូវមិនអាចត្រូវបានបង្កើតឡើយ។ ប្រសិនបើ record ឬ class ផ្ទុក List ត្រូវចម្លងការពារដោយ List.copyOf(items) ដើម្បីកុំឱ្យកូដខាងក្រៅកែប្រែទិន្នន័យខាងក្នុងបាន។',
            'រាល់ពេលអ្នក override equals() ក្នុង class ធម្មតា អ្នកត្រូវតែ override hashCode() ដោយប្រើ field ដូចគ្នាដែរ។ HashMap និង HashSet ប្រើ hashCode() ដើម្បីរក bucket ជាមុន ដូច្នេះ object ពីរដែលស្មើគ្នាតែមាន hashCode ខុសគ្នានឹងរកមិនឃើញឡើយ។',
          ],
          points: [
            'ផ្ទៀងផ្ទាត់លក្ខខណ្ឌក្នុង compact constructor របស់ record (ឧ. តម្លៃមិនអវិជ្ជមាន ID មិនទទេ)។',
            'រុំ collection ដែលទទួលចូលដោយ List.copyOf() ឬ Set.copyOf() ដើម្បីធានាភាពមិនអាចកែប្រែបានពិតប្រាកដ។',
            'ច្បាប់កិច្ចសន្យា៖ បើ a.equals(b) ជា true នោះ a.hashCode() == b.hashCode() ត្រូវតែជា true ជានិច្ច។',
            'Records បង្កើត equals(), hashCode() និង toString() យ៉ាងស៊ីសង្វាក់គ្នាដោយស្វ័យប្រវត្តិ។',
          ],
          tip: 'កុំប្រើ field ដែលអាចកែប្រែបានក្នុង equals() ឬ hashCode() សម្រាប់ object ដែលដាក់ជា key ក្នុង HashMap — ការកែ key ក្រោយពេលបញ្ចូលធ្វើឱ្យរកវាមិនឃើញជារៀងរហូត។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើត Java record Money(BigDecimal amount, String currency) ដែលមាន compact constructor បដិសេធ amount ជា null/អវិជ្ជមាន ឬ currency ទទេ (បម្លែង currency ជាអក្សរធំ) និងមានអនុគមន៍ add(Money other) ផ្ទៀងផ្ទាត់រូបិយប័ណ្ណដូចគ្នា។',
        hint: 'ក្នុង compact constructor ការផ្ដល់តម្លៃ currency = currency.trim().toUpperCase() នឹងកំណត់តម្លៃ component របស់ record ដោយស្វ័យប្រវត្តិ។',
      },
      quiz: [
        {
          question:
            'តើមានបញ្ហាអ្វីកើតឡើងបើ class ធម្មតា override equals() ប៉ុន្តែភ្លេច override hashCode()?',
          options: [
            'Java compiler បដិសេធមិន compile class នោះទេ',
            'Instance ពីរដែលមានតម្លៃស្មើគ្នាអាចមាន hashCode ខុសគ្នា ធ្វើឱ្យរកមិនឃើញក្នុង HashMap/HashSet',
            'toString() នឹងបោះ NullPointerException',
            'Class នោះមិនអាច implement interface បានទៀតទេ',
          ],
          answer: 1,
          explanation:
            'HashMap និង HashSet ពិនិត្យ hashCode() ជាមុនដើម្បីរកទីតាំង bucket។ បើមិន override hashCode() ទេ object ស្មើគ្នានឹងមាន hash ផ្សេងគ្នា ហើយស្វែងរកមិនឃើញឡើយ។',
        },
        {
          question:
            'ហេតុអ្វី sealed interfaces មានប្រសិទ្ធភាពខ្លាំងពេលប្រើជាមួយ switch pattern matching ក្នុង Java 21?',
          options: [
            'វាធ្វើឱ្យ field ទាំងអស់ក្លាយជា public ដោយស្វ័យប្រវត្តិ',
            'វាបិទ garbage collection សម្រាប់ subclass',
            'Compiler ដឹងគ្រប់ប្រភេទកូនដែលអនុញ្ញាត និងធានាថា switch គ្របដណ្ដប់គ្រប់ករណីដោយមិនបាច់មាន default',
            'វាអនុញ្ញាតឱ្យ class មួយ inherit ពីច្រើន class ព្រមគ្នា',
          ],
          answer: 2,
          explanation:
            'ដោយសារ sealed interface រាយឈ្មោះប្រភេទកូនទាំងអស់ច្បាស់លាស់ compiler អាចផ្ទៀងផ្ទាត់ថា switch គ្របដណ្ដប់គ្រប់ប្រភេទ — បើបន្ថែមប្រភេទថ្មីពេលក្រោយ compiler នឹងព្រមានគ្រប់កន្លែងដែលភ្លេចដោះស្រាយ។',
        },
      ],
    },
  },

  'java/collections-and-streams': {
    en: {
      duration: '13 min',
      objectives: [
        'Select the optimal Java collection (ArrayList, HashSet, HashMap, ArrayDeque, LinkedHashMap) by access pattern',
        'Distinguish lazy intermediate stream operations from eager terminal operations',
        'Aggregate and group domain objects with Collectors.groupingBy, summingDouble, and flatMap',
        'Avoid UnsupportedOperationException when working with unmodifiable collections',
      ],
      extraSections: [
        {
          id: 'choosing-collections',
          heading: 'Choosing the Right Java Collection',
          body: [
            'Program against collection interfaces (List, Set, Map, Deque) in method signatures, and pick the concrete implementation based on lookup speed, ordering, and mutation patterns. ArrayList is the default List because contiguous arrays are CPU-cache-friendly; LinkedList is almost never faster in practice.',
            'Use HashSet when uniqueness and O(1) membership checks matter, HashMap for O(1) key-value indexing, LinkedHashMap when you need predictable insertion order, and ArrayDeque for fast stacks and queues (replacing legacy Stack).',
          ],
          points: [
            'Prefer ArrayList over LinkedList—CPU cache locality beats pointer chasing in nearly all workloads.',
            'Use ArrayDeque for queues (offer/poll) and stacks (push/pop) instead of synchronized legacy Stack.',
            'Use map.getOrDefault(k, 0) or map.merge(k, 1, Integer::sum) for clean frequency counting.',
            'Program to interfaces (List<User>) in parameters and return types rather than concrete ArrayList<User>.',
          ],
          table: {
            headers: ['Collection', 'Ordering', 'Typical Lookup', 'Best Use Case'],
            rows: [
              [
                'ArrayList',
                'Insertion / Index',
                'O(1) by index, O(n) search',
                'General-purpose ordered lists',
              ],
              [
                'HashSet',
                'Unordered',
                'O(1) average contains()',
                'Deduplication & fast membership checks',
              ],
              [
                'HashMap',
                'Unordered',
                'O(1) average get/put',
                'Indexing entities by unique key/ID',
              ],
              [
                'LinkedHashMap',
                'Insertion or Access',
                'O(1) average get/put',
                'Ordered maps & simple LRU caches',
              ],
              [
                'ArrayDeque',
                'FIFO / LIFO',
                'O(1) head/tail ops',
                'Queues, BFS traversal, undo stacks',
              ],
            ],
          },
          warning:
            'List.of(...), Set.of(...), Map.of(...), and Stream.toList() return unmodifiable collections—calling .add(), .remove(), or .sort() throws UnsupportedOperationException. Copy into new ArrayList<>(items) when mutation is genuinely needed.',
        },
        {
          id: 'collectors-and-grouping',
          heading: 'Lazy Pipelines, flatMap & Collectors.groupingBy',
          body: [
            'Java Streams are lazy: intermediate operations like filter(), map(), and flatMap() do zero work until a terminal operation (toList(), collect(), count(), findFirst()) executes. This allows short-circuiting—findFirst() stops scanning the instant it finds a match.',
            'For real backend analytics and reporting, Collectors.groupingBy() and Collectors.toMap() replace dozens of lines of nested map-initialization boilerplate with declarative, bug-resistant pipelines.',
          ],
          points: [
            'Streams can only be consumed once; attempting to reuse a closed stream throws IllegalStateException.',
            'Use flatMap() to flatten nested collections (e.g., List<Order> -> Stream<LineItem>).',
            'Provide a merge function in Collectors.toMap(k, v, (a, b) -> a) to prevent duplicate-key crashes.',
            'Keep stream lambdas pure—never mutate external lists or counters inside .forEach() or .map().',
          ],
          example: {
            title: 'Grouping Revenue & Flattening Tags with Streams',
            language: 'java',
            code: `import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class SalesAnalytics {
    record Order(String region, double amount, List<String> tags) {}

    public static void main(String[] args) {
        var orders = List.of(
            new Order("APAC", 120.0, List.of("vip", "web")),
            new Order("EU", 85.0, List.of("mobile")),
            new Order("APAC", 60.0, List.of("web", "promo"))
        );

        Map<String, Double> revenueByRegion = orders.stream()
            .collect(Collectors.groupingBy(
                Order::region,
                Collectors.summingDouble(Order::amount)
            ));

        List<String> uniqueTags = orders.stream()
            .flatMap(o -> o.tags().stream())
            .distinct()
            .sorted()
            .toList();

        System.out.println("Revenue: " + revenueByRegion);
        System.out.println("Tags: " + uniqueTags);
    }
}`,
            output: `Revenue: {EU=85.0, APAC=180.0}
Tags: [mobile, promo, vip, web]`,
          },
          tip: 'Avoid calling .parallelStream() for small collections or blocking I/O—it shares the global ForkJoinPool.commonPool() across the whole JVM and can actually slow down your service.',
        },
      ],
      challenge: {
        prompt:
          'Given a List<Sale> where record Sale(String category, double amount), write a Stream pipeline that ignores sales below 20.0 and returns a Map<String, Double> of total revenue per category.',
        hint: 'Chain .filter(s -> s.amount() >= 20.0) followed by .collect(Collectors.groupingBy(Sale::category, Collectors.summingDouble(Sale::amount))).',
        language: 'java',
        solutionCode: `import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class RevenueReport {
    record Sale(String category, double amount) {}

    static Map<String, Double> revenueByCategory(List<Sale> sales) {
        return sales.stream()
            .filter(s -> s.amount() >= 20.0)
            .collect(Collectors.groupingBy(
                Sale::category,
                Collectors.summingDouble(Sale::amount)
            ));
    }

    public static void main(String[] args) {
        var data = List.of(
            new Sale("Books", 15.0),
            new Sale("Books", 32.0),
            new Sale("Tech", 120.0),
            new Sale("Tech", 45.0)
        );
        System.out.println(revenueByCategory(data));
    }
}`,
      },
      quiz: [
        {
          question:
            'What happens if you call .add("X") on a list created by List.of("A", "B") or stream.toList()?',
          options: [
            'The list automatically resizes and appends "X"',
            'Java throws UnsupportedOperationException at runtime',
            'It returns false without modifying the list',
            'It silently replaces the last element',
          ],
          answer: 1,
          explanation:
            'Both List.of(...) and Java 16+ Stream.toList() produce unmodifiable lists. Any structural mutation throws UnsupportedOperationException.',
        },
        {
          question: 'When should you use flatMap() instead of map() in a Java Stream?',
          options: [
            'When you want to sort elements in descending order',
            'When each input element maps to a Stream/collection and you want a single flattened stream',
            'When you want to execute the stream on multiple CPU cores',
            'When you need to mutate elements in place',
          ],
          answer: 1,
          explanation:
            'map() transforms each item 1-to-1 (producing Stream<List<T>> for nested lists), whereas flatMap() maps each item to a Stream<T> and flattens all inner streams into one continuous Stream<T>.',
        },
      ],
    },
    km: {
      duration: '13 នាទី',
      objectives: [
        'ជ្រើសរើស Java collection ឱ្យសមស្របតាមរបៀបស្វែងរកទិន្នន័យ (ArrayList, HashSet, HashMap, ArrayDeque, LinkedHashMap)',
        'បែងចែកប្រតិបត្តិការ stream កណ្ដាល (lazy) និងប្រតិបត្តិការបញ្ចប់ (terminal)',
        'ផ្ដុំ និងគណនាទិន្នន័យជាមួយ Collectors.groupingBy, summingDouble និង flatMap',
        'ជៀសវាងកំហុស UnsupportedOperationException ពេលប្រើ unmodifiable collections',
      ],
      extraSections: [
        {
          id: 'choosing-collections',
          heading: 'ការជ្រើសរើស Java Collection ឱ្យត្រូវតាមការងារ',
          body: [
            'ត្រូវសរសេរប្រភេទប៉ារ៉ាម៉ែត្រជា interface (List, Set, Map, Deque) ហើយជ្រើសរើស class ជាក់ស្ដែងផ្អែកលើល្បឿនស្វែងរក លំដាប់ និងការកែប្រែ។ ArrayList ជាជម្រើសលំនាំដើមព្រោះវាដាក់ទិន្នន័យជាប់គ្នាក្នុងអង្គចងចាំដែលលឿនសម្រាប់ CPU cache ចំណែក LinkedList កម្រលឿនជាងក្នុងការអនុវត្តពិតណាស់។',
            'ប្រើ HashSet ពេលត្រូវការភាពមិនស្ទួន និងការពិនិត្យ O(1) ប្រើ HashMap សម្រាប់ការរកតាម key កម្រិត O(1) ប្រើ LinkedHashMap ពេលចង់រក្សាលំដាប់បញ្ចូល និងប្រើ ArrayDeque សម្រាប់ stack និង queue ដែលលឿនជាង Stack ចាស់។',
          ],
          points: [
            'ជ្រើស ArrayList ជាជាង LinkedList ព្រោះល្បឿន CPU cache locality ខ្ពស់ជាងច្រើន។',
            'ប្រើ ArrayDeque សម្រាប់ queue (offer/poll) និង stack (push/pop) ជំនួស Stack ចាស់។',
            'ប្រើ map.getOrDefault(k, 0) ឬ map.merge(k, 1, Integer::sum) សម្រាប់ការរាប់ចំនួនដងយ៉ាងខ្លីស្អាត។',
            'ប្រើ interface (List<User>) ក្នុងប៉ារ៉ាម៉ែត្រ និងតម្លៃត្រឡប់ជំនួស class ជាក់ស្ដែង ArrayList<User>។',
          ],
          table: {
            headers: ['Collection', 'លំដាប់', 'ល្បឿនស្វែងរកទូទៅ', 'ការប្រើប្រាស់ស័ក្តិសមបំផុត'],
            rows: [
              [
                'ArrayList',
                'តាមលំដាប់បញ្ចូល / Index',
                'O(1) តាម index, O(n) ស្វែងរក',
                'បញ្ជីទិន្នន័យទូទៅមានលំដាប់',
              ],
              [
                'HashSet',
                'គ្មានលំដាប់',
                'O(1) ជាមធ្យម contains()',
                'លុបទិន្នន័យស្ទួន និងពិនិត្យវត្តមានលឿន',
              ],
              [
                'HashMap',
                'គ្មានលំដាប់',
                'O(1) ជាមធ្យម get/put',
                'ស្វែងរកទិន្នន័យតាម ID ឬ key តែមួយគត់',
              ],
              [
                'LinkedHashMap',
                'តាមលំដាប់បញ្ចូល ឬប្រើ',
                'O(1) ជាមធ្យម get/put',
                'Map រក្សាលំដាប់ និង LRU cache សាមញ្ញ',
              ],
              ['ArrayDeque', 'FIFO / LIFO', 'O(1) ក្បាល/កន្ទុយ', 'Queues, BFS និង undo stacks'],
            ],
          },
          warning:
            'List.of(...), Set.of(...), Map.of(...) និង Stream.toList() ត្រឡប់បញ្ជីដែលមិនអាចកែប្រែបាន — ការហៅ .add(), .remove() ឬ .sort() នឹងបោះ UnsupportedOperationException។ ត្រូវចម្លងចូល new ArrayList<>(items) ប្រសិនបើត្រូវការកែប្រែ។',
        },
        {
          id: 'collectors-and-grouping',
          heading: 'Lazy Pipelines, flatMap និង Collectors.groupingBy',
          body: [
            'Java Streams ដំណើរការបែប lazy៖ ប្រតិបត្តិការកណ្ដាលដូច filter(), map() និង flatMap() មិនទាន់ដំណើរការទេ រហូតដល់មានប្រតិបត្តិការបញ្ចប់ (toList(), collect(), count(), findFirst())។ នេះអនុញ្ញាតឱ្យបញ្ឈប់ភ្លាមពេលរកឃើញដូច findFirst()។',
            'សម្រាប់របាយការណ៍ backend ពិតប្រាកដ Collectors.groupingBy() និង Collectors.toMap() ជំនួសរង្វិលជុំបង្កើត Map រញ៉េរញ៉ៃដោយកូដខ្លីស្អាត និងកាត់បន្ថយកំហុស។',
          ],
          points: [
            'Stream អាចប្រើបានតែម្ដងប៉ុណ្ណោះ ការប្រើឡើងវិញនឹងបោះ IllegalStateException។',
            'ប្រើ flatMap() ដើម្បីពន្លាតបញ្ជីជាន់គ្នា (ឧ. List<Order> ទៅជា Stream<LineItem>)។',
            'ផ្ដល់ merge function ក្នុង Collectors.toMap(k, v, (a, b) -> a) ដើម្បីការពារកំហុសពេលមាន key ស្ទួន។',
            'រក្សា lambda ក្នុង stream ឱ្យបរិសុទ្ធ — កុំកែប្រែ list ឬអថេរខាងក្រៅក្នុង .map() ឬ .forEach()។',
          ],
          exampleTitle: 'ការផ្ដុំចំណូលតាមតំបន់ និងពន្លាត Tags ដោយ Streams',
          tip: 'ជៀសវាងការហៅ .parallelStream() សម្រាប់ទិន្នន័យតិច ឬកិច្ចការ blocking I/O ព្រោះវាប្រើ ForkJoinPool.commonPool() រួមគ្នាពេញ JVM ហើយអាចធ្វើឱ្យសេវាកម្មយឺតទៅវិញ។',
        },
      ],
      challenge: {
        prompt:
          'មាន List<Sale> ដែល record Sale(String category, double amount) — សូមសរសេរ Stream pipeline ដែលរំលងការលក់ក្រោម 20.0 ហើយត្រឡប់ Map<String, Double> នៃចំណូលសរុបតាមប្រភេទទំនិញនីមួយៗ។',
        hint: 'ភ្ជាប់ .filter(s -> s.amount() >= 20.0) បន្តដោយ .collect(Collectors.groupingBy(Sale::category, Collectors.summingDouble(Sale::amount)))។',
      },
      quiz: [
        {
          question:
            'តើមានអ្វីកើតឡើងប្រសិនបើអ្នកហៅ .add("X") លើ list ដែលបង្កើតដោយ List.of("A", "B") ឬ stream.toList()?',
          options: [
            'List ពង្រីកទំហំដោយស្វ័យប្រវត្តិហើយបន្ថែម "X"',
            'Java បោះកំហុស UnsupportedOperationException ពេលដំណើរការ',
            'វាត្រឡប់ false ដោយមិនកែប្រែ list',
            'វាជំនួសធាតុចុងក្រោយដោយស្ងាត់ៗ',
          ],
          answer: 1,
          explanation:
            'ទាំង List.of(...) និង Stream.toList() បង្កើត unmodifiable list។ រាល់ការកែប្រែរចនាសម្ព័ន្ធនឹងបោះ UnsupportedOperationException។',
        },
        {
          question: 'តើពេលណាអ្នកគួរប្រើ flatMap() ជំនួស map() ក្នុង Java Stream?',
          options: [
            'ពេលអ្នកចង់តម្រៀបធាតុពីធំទៅតូច',
            'ពេលធាតុនីមួយៗបង្កើតជា Stream ឬ collection រង ហើយអ្នកចង់ពន្លាតវាជា stream តែមួយ',
            'ពេលអ្នកចង់ដំណើរការ stream លើ CPU ច្រើន core',
            'ពេលអ្នកចង់កែប្រែធាតុនៅនឹងកន្លែង',
          ],
          answer: 1,
          explanation:
            'map() បម្លែង 1-ទៅ-1 (បង្កើត Stream<List<T>>) ចំណែក flatMap() បម្លែងធាតុនីមួយៗជា Stream<T> រួចពន្លាតបញ្ចូលគ្នាជា Stream<T> តែមួយ។',
        },
      ],
    },
  },

  'java/exceptions-and-generics': {
    en: {
      duration: '13 min',
      objectives: [
        'Choose appropriately between checked exceptions, unchecked domain exceptions, and Optional<T>',
        'Manage files, sockets, and database resources safely with try-with-resources',
        'Write type-safe generic classes and bounded generic methods (<T extends Comparable<T>>)',
        'Apply the PECS rule (Producer Extends, Consumer Super) for generic wildcards',
      ],
      extraSections: [
        {
          id: 'checked-vs-unchecked-resources',
          heading: 'Checked vs Unchecked Exceptions & try-with-resources',
          body: [
            'Java divides throwables into Errors (JVM failures like OutOfMemoryError—never catch these), Checked Exceptions (subclasses of Exception like IOException that the compiler forces callers to handle or declare), and Unchecked Exceptions (RuntimeException subclasses like IllegalArgumentException for programming bugs or unrecoverable domain errors).',
            'Always wrap AutoCloseable resources (BufferedReader, Connection, InputStream) inside try-with-resources. Even if both the try block and .close() throw exceptions, Java closes the resource deterministically and preserves the primary exception while attaching the close failure as a suppressed exception.',
          ],
          points: [
            'Throw specific unchecked exceptions (IllegalArgumentException, IllegalStateException) for invalid inputs or violated preconditions.',
            'Preserve the root cause when wrapping exceptions: throw new StorageException("Failed to load user", ioEx).',
            'Use try-with-resources instead of manual finally { close(); } blocks to prevent leaked file descriptors.',
            'Keep try blocks small so it is obvious which exact call can fail.',
          ],
          table: {
            headers: ['Category', 'Base Class', 'Compiler Check', 'How to Handle'],
            rows: [
              [
                'Checked Exception',
                'Exception (non-Runtime)',
                'Required (catch or throws)',
                'Recoverable external failures (I/O, parsing)',
              ],
              [
                'Unchecked Exception',
                'RuntimeException',
                'Optional',
                'Validation errors, domain rules, bugs',
              ],
              ['Error', 'Error', 'Optional', 'JVM-level crashes (OOM)—do not catch'],
            ],
          },
          warning:
            'Never write an empty catch (Exception e) {} block! Swallowing exceptions hides silent data corruption and turns 5-minute fixes into multi-day production outages. Always handle meaningfully, log with context, or rethrow.',
        },
        {
          id: 'generics-wildcards-pecs',
          heading: 'Generics, Bounded Types & the PECS Rule',
          body: [
            'Generics give you compile-time type safety without duplicating code for every type. Because Java implements generics via type erasure at runtime, you cannot do new T() or instanceof List<String>, so APIs use bounded type parameters (<T extends Comparable<T>>) and wildcards (?) for flexibility.',
            'Java generics are invariant: List<Integer> is NOT a subtype of List<Number>. To make generic methods accept subtypes safely, follow Joshua Bloch’s PECS mnemonic—Producer Extends (List<? extends T> when you only read T out) and Consumer Super (List<? super T> when you write T in).',
          ],
          points: [
            'Use <T extends Comparable<T>> when generic code needs ordering or comparison capabilities.',
            'Producer Extends: use List<? extends Number> if a method only reads Numbers from the list.',
            'Consumer Super: use List<? super Integer> if a method adds Integers into the list.',
            'Reserve Optional<T> for method return values—never use Optional as a field or parameter type.',
          ],
          example: {
            title: 'Bounded Generics, PECS Wildcards & try-with-resources',
            language: 'java',
            code: `import java.io.BufferedReader;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

public class GenericsAndResources {
    // PECS: src produces T (extends), dst consumes T (super)
    static <T> void copyAll(List<? extends T> src, List<? super T> dst) {
        for (T item : src) {
            dst.add(item);
        }
    }

    static long countLines(String text) throws Exception {
        try (var reader = new BufferedReader(new StringReader(text))) {
            return reader.lines().count();
        }
    }

    public static void main(String[] args) throws Exception {
        List<Integer> ints = List.of(10, 20, 30);
        List<Number> numbers = new ArrayList<>();
        copyAll(ints, numbers);

        System.out.println("Copied: " + numbers);
        System.out.println("Lines: " + countLines("a\\nb\\nc"));
    }
}`,
            output: `Copied: [10, 20, 30]
Lines: 3`,
          },
          tip: 'When an Optional is empty and computing the fallback is expensive (like a database query), use .orElseGet(() -> loadDefault()) instead of .orElse(loadDefault()), because .orElse() always evaluates its argument eagerly.',
        },
      ],
      challenge: {
        prompt:
          'Write a generic method static <T extends Comparable<T>> Optional<T> maxOf(List<? extends T> items) that returns Optional.empty() for null or empty lists, and Optional.of(max) otherwise.',
        hint: 'Initialize T best = items.get(0), loop through the remaining items, and update best whenever item.compareTo(best) > 0.',
        language: 'java',
        solutionCode: `import java.util.List;
import java.util.Optional;

public class GenericMax {
    static <T extends Comparable<T>> Optional<T> maxOf(List<? extends T> items) {
        if (items == null || items.isEmpty()) {
            return Optional.empty();
        }
        T best = items.get(0);
        for (int i = 1; i < items.size(); i++) {
            T current = items.get(i);
            if (current.compareTo(best) > 0) {
                best = current;
            }
        }
        return Optional.of(best);
    }

    public static void main(String[] args) {
        System.out.println(maxOf(List.of(14, 92, 37)).orElse(-1));
        System.out.println(maxOf(List.<String>of()).orElse("none"));
    }
}`,
      },
      quiz: [
        {
          question:
            'According to the PECS rule, which parameter type should a method accept if it only READS Numbers from a List?',
          options: [
            'List<Number>',
            'List<? extends Number>',
            'List<? super Number>',
            'List<Object>',
          ],
          answer: 1,
          explanation:
            'PECS stands for Producer Extends, Consumer Super. A list you read Numbers from is a producer, so List<? extends Number> safely accepts List<Integer>, List<Double>, or List<Number>.',
        },
        {
          question:
            'What is the key performance difference between optional.orElse(fetch()) and optional.orElseGet(() -> fetch())?',
          options: [
            'orElseGet() throws an exception if the Optional is present',
            'orElse() always invokes fetch() even when the Optional already contains a value, whereas orElseGet() is lazy',
            'orElse() only works with primitive types',
            'There is no difference; they compile to identical bytecode',
          ],
          answer: 1,
          explanation:
            'Because Java evaluates method arguments before calling orElse(), fetch() runs unconditionally. Passing a Supplier lambda to orElseGet() executes fetch() only when the Optional is empty.',
        },
      ],
    },
    km: {
      duration: '13 នាទី',
      objectives: [
        'ជ្រើសរើសឱ្យត្រឹមត្រូវរវាង checked exceptions, unchecked domain exceptions និង Optional<T>',
        'គ្រប់គ្រងឯកសារ socket និងមូលដ្ឋានទិន្នន័យដោយសុវត្ថិភាពជាមួយ try-with-resources',
        'សរសេរ generic classes និង bounded generic methods (<T extends Comparable<T>>) មានសុវត្ថិភាពប្រភេទទិន្នន័យ',
        'អនុវត្តច្បាប់ PECS (Producer Extends, Consumer Super) សម្រាប់ generic wildcards',
      ],
      extraSections: [
        {
          id: 'checked-vs-unchecked-resources',
          heading: 'Checked vs Unchecked Exceptions និង try-with-resources',
          body: [
            'Java បែងចែកកំហុសជា ៣ ប្រភេទ៖ Error (បញ្ហាកម្រិត JVM ដូច OutOfMemoryError — កុំ catch), Checked Exception (កូនរបស់ Exception ដូច IOException ដែល compiler បង្ខំឱ្យដោះស្រាយ ឬប្រកាស throws) និង Unchecked Exception (កូនរបស់ RuntimeException ដូច IllegalArgumentException សម្រាប់កំហុសតក្កវិជ្ជា ឬទិន្នន័យមិនត្រឹមត្រូវ)។',
            'ត្រូវដាក់ធនធាន AutoCloseable (BufferedReader, Connection, InputStream) ក្នុង try-with-resources ជានិច្ច។ ទោះជាទាំងប្លុក try និង .close() បោះកំហុសក៏ដោយ Java នឹងបិទធនធានដោយស្វ័យប្រវត្តិ និងរក្សាកំហុសដើមមិនឱ្យបាត់បង់ឡើយ។',
          ],
          points: [
            'បោះ unchecked exception ជាក់លាក់ (IllegalArgumentException, IllegalStateException) ពេលទិន្នន័យបញ្ចូលខុសលក្ខខណ្ឌ។',
            'រក្សាមូលហេតុដើមពេលរុំ exception ថ្មី៖ throw new StorageException("Failed", ioEx)។',
            'ប្រើ try-with-resources ជំនួស finally { close(); } ដើម្បីការពារការលេចធ្លាយធនធាន។',
            'រក្សាប្លុក try ឱ្យខ្លី ដើម្បីដឹងច្បាស់ថាបន្ទាត់កូដណាដែលអាចបង្កកំហុស។',
          ],
          table: {
            headers: ['ប្រភេទ', 'Class មេ', 'ការត្រួតពិនិត្យ Compiler', 'របៀបដោះស្រាយ'],
            rows: [
              [
                'Checked Exception',
                'Exception (មិនមែន Runtime)',
                'បង្ខំ (catch ឬ throws)',
                'កំហុសខាងក្រៅដែលអាចស្ដារបាន (I/O, parsing)',
              ],
              [
                'Unchecked Exception',
                'RuntimeException',
                'មិនបង្ខំ',
                'កំហុសផ្ទៀងផ្ទាត់ទិន្នន័យ ច្បាប់អាជីវកម្ម កំហុសកូដ',
              ],
              ['Error', 'Error', 'មិនបង្ខំ', 'បញ្ហាធ្ងន់ធ្ងររបស់ JVM (OOM) — មិនត្រូវ catch'],
            ],
          },
          warning:
            'កុំសរសេរប្លុក catch (Exception e) {} ទទេ! ការលេបកំហុសដោយស្ងាត់ៗលាក់បាំងការខូចទិន្នន័យ និងធ្វើឱ្យបញ្ហាដែលអាចជួសជុលក្នុង ៥ នាទីក្លាយជាបញ្ហារាប់ថ្ងៃ។ ត្រូវដោះស្រាយ កត់ត្រា log ឬបោះបន្តជានិច្ច។',
        },
        {
          id: 'generics-wildcards-pecs',
          heading: 'Generics, Bounded Types និងច្បាប់ PECS',
          body: [
            'Generics ផ្ដល់សុវត្ថិភាពប្រភេទទិន្នន័យពេល compile ដោយមិនចាំបាច់សរសេរកូដដដែលៗសម្រាប់គ្រប់ប្រភេទ។ ដោយសារ Java ប្រើ type erasure ពេលដំណើរការ អ្នកមិនអាចសរសេរ new T() ទេ ដូច្នេះ API ប្រើ bounded type parameters (<T extends Comparable<T>>) និង wildcards (?) ដើម្បីបត់បែន។',
            'Java generics មានលក្ខណៈ invariant៖ List<Integer> មិនមែនជាកូនរបស់ List<Number> ទេ។ ដើម្បីទទួលប្រភេទកូនដោយសុវត្ថិភាព អនុវត្តច្បាប់ PECS — Producer Extends (List<? extends T> ពេលអានចេញ) និង Consumer Super (List<? super T> ពេលបញ្ចូលក្នុង)។',
          ],
          points: [
            'ប្រើ <T extends Comparable<T>> នៅពេលកូដ generic ត្រូវការប្រៀបធៀបលំដាប់ធាតុ។',
            'Producer Extends៖ ប្រើ List<? extends Number> ប្រសិនបើអនុគមន៍គ្រាន់តែអានលេខចេញពី list។',
            'Consumer Super៖ ប្រើ List<? super Integer> ប្រសិនបើអនុគមន៍បន្ថែម Integer ចូលទៅក្នុង list។',
            'ប្រើ Optional<T> តែសម្រាប់តម្លៃត្រឡប់ពីអនុគមន៍ — កុំប្រើជា field ឬប៉ារ៉ាម៉ែត្រ។',
          ],
          exampleTitle: 'Bounded Generics, PECS Wildcards និង try-with-resources',
          tip: 'ពេល Optional ទទេ ហើយការបង្កើតតម្លៃជំនួសត្រូវការធនធានច្រើន (ដូចសួរ database) ត្រូវប្រើ .orElseGet(() -> loadDefault()) ជំនួស .orElse(loadDefault()) ព្រោះ .orElse() ដំណើរការអាគុយម៉ង់ជានិច្ចទោះមានតម្លៃរួចហើយក៏ដោយ។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ generic method ឈ្មោះ static <T extends Comparable<T>> Optional<T> maxOf(List<? extends T> items) ដែលត្រឡប់ Optional.empty() សម្រាប់ list null ឬទទេ និងត្រឡប់ Optional.of(max) សម្រាប់ករណីផ្សេង។',
        hint: 'កំណត់ T best = items.get(0) រួចដើរកាត់ធាតុនៅសល់ និងប្ដូរ best រាល់ពេល item.compareTo(best) > 0។',
      },
      quiz: [
        {
          question:
            'តាមច្បាប់ PECS តើអនុគមន៍ដែលគ្រាន់តែអានលេខ Number ចេញពី List គួរទទួលប៉ារ៉ាម៉ែត្រប្រភេទណា?',
          options: [
            'List<Number>',
            'List<? extends Number>',
            'List<? super Number>',
            'List<Object>',
          ],
          answer: 1,
          explanation:
            'PECS មានន័យថា Producer Extends, Consumer Super។ List ដែលយើងអានទិន្នន័យចេញគឺជា producer ដូច្នេះ List<? extends Number> អាចទទួល List<Integer>, List<Double> និង List<Number> ដោយសុវត្ថិភាព។',
        },
        {
          question:
            'តើភាពខុសគ្នាសំខាន់ខាងល្បឿនរវាង optional.orElse(fetch()) និង optional.orElseGet(() -> fetch()) គឺជាអ្វី?',
          options: [
            'orElseGet() បោះកំហុសពេល Optional មានតម្លៃ',
            'orElse() ហៅ fetch() ជានិច្ចទោះ Optional មានតម្លៃរួចហើយ ចំណែក orElseGet() ដំណើរការតែពេលទទេប៉ុណ្ណោះ',
            'orElse() ប្រើបានតែជាមួយ primitive types',
            'គ្មានភាពខុសគ្នាទេ',
          ],
          answer: 1,
          explanation:
            'Java គណនាអាគុយម៉ង់មុនពេលហៅ orElse() ដូច្នេះ fetch() ដំណើរការជានិច្ច។ ការប្រើ lambda ក្នុង orElseGet() ហៅ fetch() តែពេល Optional ទទេប៉ុណ្ណោះ។',
        },
      ],
    },
  },

  'java/java-concurrency-and-architecture': {
    en: {
      duration: '15 min',
      objectives: [
        'Prevent race conditions using immutability, ConcurrentHashMap, Atomic types, and ReentrantLock',
        'Avoid carrier-thread pinning when using Java 21 Virtual Threads with blocking I/O',
        'Structure enterprise Java services cleanly with interfaces and constructor injection',
        'Coordinate parallel asynchronous tasks with CompletableFuture and Executors',
      ],
      extraSections: [
        {
          id: 'thread-safety-and-pinning',
          heading: 'Thread Safety, Atomic Primitives & Virtual Thread Pinning',
          body: [
            'Concurrency bugs happen when multiple threads read and mutate shared state without synchronization. The cleanest defense is sharing only immutable objects (records, List.copyOf()). When shared mutable state is unavoidable, use dedicated concurrent primitives such as ConcurrentHashMap and AtomicLong rather than wrapping plain HashMaps in ad-hoc locks.',
            'Java 21 Virtual Threads scale blocking I/O cheaply because the JVM unmounts a virtual thread from its underlying OS carrier thread whenever it blocks on network or database calls. However, blocking inside a synchronized block on Java 21 pins the virtual thread to its carrier OS thread, reducing throughput—prefer ReentrantLock for critical sections that perform I/O.',
          ],
          points: [
            'Never share an unsynchronized HashMap or ArrayList across threads for writes—use ConcurrentHashMap.',
            'Use AtomicInteger / AtomicLong or LongAdder for lock-free thread-safe counters.',
            'Prefer ReentrantLock over synchronized around blocking I/O on Java 21 virtual threads.',
            'Never pool virtual threads—create a fresh virtual thread per task via Executors.newVirtualThreadPerTaskExecutor().',
          ],
          table: {
            headers: ['Concurrency Tool', 'Mechanism', 'Best Fit'],
            rows: [
              [
                'Virtual Threads',
                'JVM-scheduled lightweight threads',
                'High-concurrency blocking I/O (HTTP, SQL)',
              ],
              [
                'ConcurrentHashMap',
                'Fine-grained lock striping / CAS',
                'Thread-safe caches & shared registries',
              ],
              [
                'AtomicLong / LongAdder',
                'Lock-free CPU compare-and-swap',
                'Metrics, request counters, sequence IDs',
              ],
              [
                'ReentrantLock',
                'Explicit lock (virtual-thread friendly)',
                'Critical sections needing fairness or timeouts',
              ],
              [
                'CompletableFuture',
                'Composable async pipelines',
                'Fan-out/fan-in calls with timeouts & fallbacks',
              ],
            ],
          },
          warning:
            'Sharing a plain HashMap across concurrent writer threads can corrupt internal buckets or trigger infinite loops under load. Likewise, never use synchronized around network/DB calls on Java 21 virtual threads, as it pins the carrier OS thread.',
        },
        {
          id: 'layered-service-architecture',
          heading: 'Clean Service Architecture & Constructor Injection',
          body: [
            'Enterprise Java services stay maintainable for years when business logic is decoupled from frameworks and infrastructure. Organize each feature into thin API controllers, pure domain services, and small repository/gateway interfaces. Inject dependencies through the constructor into private final fields.',
            'Constructor injection makes dependencies explicit, guarantees objects are valid upon creation, and allows lightning-fast unit tests using simple in-memory fakes—no Spring context startup or live database needed to verify core business rules.',
          ],
          points: [
            'Depend on small interfaces (OrderRepository, PaymentGateway) rather than concrete JDBC or HTTP classes.',
            'Favor constructor injection over field injection (@Autowired on private fields) for immutability and easy testing.',
            'Keep HTTP DTOs separate from database entities so API changes do not force schema migrations.',
            'Apply timeouts to every external call (Future.get(2, TimeUnit.SECONDS)) to prevent cascading outages.',
          ],
          example: {
            title: 'Constructor-Injected Service with Concurrent Fan-Out',
            language: 'java',
            code: `import java.util.concurrent.Executors;

public class ArchitectureDemo {
    interface InventoryPort { int stockFor(String sku); }
    interface PricingPort { double priceFor(String sku); }
    record ProductView(String sku, int stock, double price) {}

    static final class CatalogService {
        private final InventoryPort inventory;
        private final PricingPort pricing;

        CatalogService(InventoryPort inventory, PricingPort pricing) {
            this.inventory = inventory;
            this.pricing = pricing;
        }

        ProductView loadProduct(String sku) throws Exception {
            try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {
                var stockTask = exec.submit(() -> inventory.stockFor(sku));
                var priceTask = exec.submit(() -> pricing.priceFor(sku));
                return new ProductView(sku, stockTask.get(), priceTask.get());
            }
        }
    }

    public static void main(String[] args) throws Exception {
        var service = new CatalogService(sku -> 42, sku -> 19.99);
        System.out.println(service.loadProduct("KB-100"));
    }
}`,
            output: `ProductView[sku=KB-100, stock=42, price=19.99]`,
          },
          tip: 'If a service constructor grows beyond 5–6 dependencies, it is a strong design signal that the class is doing too much and should be split along domain boundaries.',
        },
      ],
      challenge: {
        prompt:
          'Write a thread-safe RateCounter class using ConcurrentHashMap<String, AtomicInteger> with a method int recordHit(String clientId) that atomically increments and returns the client’s hit count.',
        hint: 'Use counts.computeIfAbsent(clientId, k -> new AtomicInteger()).incrementAndGet().',
        language: 'java',
        solutionCode: `import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

public class RateCounter {
    private final ConcurrentHashMap<String, AtomicInteger> counts = new ConcurrentHashMap<>();

    public int recordHit(String clientId) {
        return counts
            .computeIfAbsent(clientId, k -> new AtomicInteger(0))
            .incrementAndGet();
    }

    public static void main(String[] args) {
        var counter = new RateCounter();
        System.out.println("alice: " + counter.recordHit("alice"));
        System.out.println("alice: " + counter.recordHit("alice"));
        System.out.println("bob: " + counter.recordHit("bob"));
    }
}`,
      },
      quiz: [
        {
          question:
            'Why should you prefer ReentrantLock over synchronized around blocking I/O when using Java 21 Virtual Threads?',
          options: [
            'synchronized does not compile in Java 21',
            'Blocking inside synchronized on Java 21 pins the virtual thread to its carrier OS thread, hurting scalability',
            'ReentrantLock runs code on the GPU automatically',
            'synchronized only works on static methods',
          ],
          answer: 1,
          explanation:
            'On Java 21, holding a synchronized monitor during blocking I/O prevents the JVM from unmounting the virtual thread from its carrier platform thread (pinning). ReentrantLock avoids pinning.',
        },
        {
          question:
            'What is the main advantage of constructor injection over field injection in Java services?',
          options: [
            'It eliminates the need for interfaces',
            'Dependencies can be private final, required at creation time, and trivially faked in plain unit tests',
            'It automatically makes all methods asynchronous',
            'It skips JVM bytecode verification',
          ],
          answer: 1,
          explanation:
            'Constructor injection enforces that a service cannot be instantiated without its required collaborators, supports immutable final fields, and lets tests pass lightweight fakes without a DI framework.',
        },
      ],
    },
    km: {
      duration: '15 នាទី',
      objectives: [
        'ការពារ race conditions ដោយប្រើ immutability, ConcurrentHashMap, Atomic types និង ReentrantLock',
        'ជៀសវាងការជាប់ carrier thread (pinning) ពេលប្រើ Java 21 Virtual Threads ជាមួយ blocking I/O',
        'រៀបចំរចនាសម្ព័ន្ធសេវាកម្ម Java យ៉ាងស្អាតជាមួយ interfaces និង constructor injection',
        'សម្របសម្រួលកិច្ចការស្របគ្នាជាមួយ CompletableFuture និង Executors',
      ],
      extraSections: [
        {
          id: 'thread-safety-and-pinning',
          heading: 'សុវត្ថិភាព Thread, Atomic Primitives និង Virtual Thread Pinning',
          body: [
            'កំហុស concurrency កើតឡើងពេល thread ច្រើនអាន និងកែប្រែទិន្នន័យរួមគ្នាដោយគ្មានការគ្រប់គ្រង។ វិធីការពារស្អាតបំផុតគឺចែករំលែកតែ object ដែលមិនអាចកែប្រែបាន (records, List.copyOf())។ ពេលចាំបាច់ត្រូវកែប្រែទិន្នន័យរួម ត្រូវប្រើ ConcurrentHashMap និង AtomicLong ជំនួស HashMap ធម្មតា។',
            'Java 21 Virtual Threads ជួយពង្រីកការងារ blocking I/O បានយ៉ាងស្រាល ព្រោះ JVM ដក virtual thread ចេញពី carrier OS thread ពេលវារង់ចាំបណ្ដាញ ឬមូលដ្ឋានទិន្នន័យ។ ប៉ុន្តែការដំណើរការ blocking I/O ក្នុងប្លុក synchronized លើ Java 21 នឹងធ្វើឱ្យជាប់ carrier thread (pinning) — គួរប្រើ ReentrantLock ជំនួសវិញ។',
          ],
          points: [
            'កុំចែករំលែក HashMap ឬ ArrayList ធម្មតាឆ្លងកាត់ thread ច្រើនសម្រាប់សរសេរ — ត្រូវប្រើ ConcurrentHashMap។',
            'ប្រើ AtomicInteger / AtomicLong ឬ LongAdder សម្រាប់អថេររាប់មានសុវត្ថិភាពដោយមិនបាច់ lock។',
            'ប្រើ ReentrantLock ជំនួស synchronized ជុំវិញ blocking I/O លើ Java 21 virtual threads។',
            'កុំដាក់ virtual threads ក្នុង thread pool — បង្កើតថ្មីតាមកិច្ចការនីមួយៗដោយ Executors.newVirtualThreadPerTaskExecutor()។',
          ],
          table: {
            headers: ['ឧបករណ៍ Concurrency', 'យន្តការ', 'ស័ក្តិសមបំផុតសម្រាប់'],
            rows: [
              [
                'Virtual Threads',
                'Thread ស្រាលគ្រប់គ្រងដោយ JVM',
                'ការងារ blocking I/O ច្រើនស្របគ្នា (HTTP, SQL)',
              ],
              [
                'ConcurrentHashMap',
                'Lock កម្រិតតូច / CAS',
                'Cache និងតារាងទិន្នន័យរួមមានសុវត្ថិភាព',
              ],
              [
                'AtomicLong / LongAdder',
                'CPU compare-and-swap គ្មាន lock',
                'Metrics អថេររាប់សំណើ និងលេខរៀង ID',
              ],
              [
                'ReentrantLock',
                'Lock ច្បាស់លាស់ (ស័ក្តិសមនឹង Virtual Threads)',
                'តំបន់កូដត្រូវការ timeout ឬការចូលតាមលំដាប់',
              ],
              [
                'CompletableFuture',
                'ខ្សែសង្វាក់ async អាចភ្ជាប់គ្នាបាន',
                'ហៅសេវាច្រើនព្រមគ្នា មាន timeout និង fallback',
              ],
            ],
          },
          warning:
            'ការសរសេរចូល HashMap ធម្មតាព្រមគ្នាពី thread ច្រើនអាចធ្វើឱ្យខូចទិន្នន័យខាងក្នុង ឬគាំងរង្វិលជុំគ្មានទីបញ្ចប់។ ម្យ៉ាងទៀត កុំប្រើ synchronized ជុំវិញការហៅបណ្ដាញ/DB លើ Java 21 virtual threads ព្រោះវាបង្ក pinning។',
        },
        {
          id: 'layered-service-architecture',
          heading: 'ស្ថាបត្យកម្មសេវាកម្មស្អាត និង Constructor Injection',
          body: [
            'សេវាកម្ម Java កម្រិតសហគ្រាសងាយថែទាំរយៈពេលយូរ នៅពេលតក្កវិជ្ជាអាជីវកម្មត្រូវបានបំបែកចេញពី framework និងហេដ្ឋារចនាសម្ព័ន្ធ។ រៀបចំតាមស្រទាប់ controller ស្ដើង, domain service បរិសុទ្ធ និង interface តូចៗសម្រាប់ repository/gateway ដោយបញ្ជូនតាម constructor ចូល private final fields។',
            'Constructor injection បង្ហាញភាពពឹងផ្អែកទាំងអស់យ៉ាងច្បាស់ ធានាថា object ពេញលេញពេលបង្កើត និងអនុញ្ញាតឱ្យសរសេរ unit tests លឿនដោយប្រើ fake ក្នុងអង្គចងចាំ មិនចាំបាច់បើក Spring ឬមូលដ្ឋានទិន្នន័យពិតឡើយ។',
          ],
          points: [
            'ពឹងផ្អែកលើ interface តូចៗ (OrderRepository, PaymentGateway) ជាជាង class JDBC ឬ HTTP ផ្ទាល់។',
            'ប្រើ constructor injection ជំនួស field injection ដើម្បីរក្សា immutability និងងាយតេស្ត។',
            'បំបែក HTTP DTOs ចេញពី database entities ដើម្បីកុំឱ្យការកែ API ប៉ះពាល់តារាងមូលដ្ឋានទិន្នន័យ។',
            'កំណត់ timeout លើរាល់ការហៅសេវាខាងក្រៅ ដើម្បីការពារការគាំងរីករាលដាលពេញប្រព័ន្ធ។',
          ],
          exampleTitle: 'សេវាកម្មប្រើ Constructor Injection និងការហៅស្របគ្នា',
          tip: 'ប្រសិនបើ constructor របស់ service មួយមានប៉ារ៉ាម៉ែត្រពឹងផ្អែកលើសពី ៥–៦ វាជាសញ្ញាថា class នោះធ្វើការច្រើនពេក ហើយគួរបំបែកតាមតួនាទីអាជីវកម្ម។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ class RateCounter ដែលមានសុវត្ថិភាព thread ដោយប្រើ ConcurrentHashMap<String, AtomicInteger> និងអនុគមន៍ int recordHit(String clientId) ដែលបូកបន្ថែម ១ ដោយ atomic រួចត្រឡប់ចំនួនដងថ្មី។',
        hint: 'ប្រើ counts.computeIfAbsent(clientId, k -> new AtomicInteger()).incrementAndGet()។',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វីគួរប្រើ ReentrantLock ជំនួស synchronized ជុំវិញ blocking I/O ពេលប្រើ Java 21 Virtual Threads?',
          options: [
            'synchronized មិនអាច compile ក្នុង Java 21 បានទេ',
            'Blocking I/O ក្នុង synchronized លើ Java 21 ធ្វើឱ្យ virtual thread ជាប់នឹង carrier OS thread (pinning) កាត់បន្ថយលទ្ធភាពពង្រីក',
            'ReentrantLock ដំណើរការលើ GPU ដោយស្វ័យប្រវត្តិ',
            'synchronized ប្រើបានតែលើ static methods ប៉ុណ្ណោះ',
          ],
          answer: 1,
          explanation:
            'លើ Java 21 ការកាន់ monitor របស់ synchronized ពេល blocking I/O រារាំង JVM មិនឱ្យដក virtual thread ចេញពី carrier OS thread ទេ។ ReentrantLock ជៀសវាងបញ្ហានេះ។',
        },
        {
          question:
            'តើអ្វីជាអត្ថប្រយោជន៍សំខាន់នៃ constructor injection ធៀបនឹង field injection ក្នុង Java services?',
          options: [
            'វាលុបបំបាត់តម្រូវការប្រើ interface',
            'អាចកំណត់ភាពពឹងផ្អែកជា private final បង្ខំឱ្យបញ្ជូនពេលបង្កើត និងងាយដាក់ fake ក្នុង unit tests',
            'វាធ្វើឱ្យអនុគមន៍ទាំងអស់ក្លាយជា asynchronous ដោយស្វ័យប្រវត្តិ',
            'វារំលងការផ្ទៀងផ្ទាត់ bytecode របស់ JVM',
          ],
          answer: 1,
          explanation:
            'Constructor injection ធានាថាសេវាកម្មមិនអាចបង្កើតដោយខ្វះភាពពឹងផ្អែកទេ អនុញ្ញាតឱ្យប្រើ final fields និងជួយឱ្យតេស្តដោយផ្ទាល់មិនបាច់បើក DI container។',
        },
      ],
    },
  },

  // =========================================================================
  // C# (6 lessons)
  // =========================================================================
  'csharp/csharp-basics': {
    en: {
      duration: '10 min',
      objectives: [
        'Distinguish C# value types (structs, int, decimal) from reference types (classes, strings)',
        'Use decimal instead of double for exact financial and currency calculations',
        'Eliminate NullReferenceException bugs with nullable reference types, ?. and ??/??=',
        'Parse untrusted user input safely with TryParse instead of throwing exceptions',
      ],
      extraSections: [
        {
          id: 'value-vs-reference-types',
          heading: 'Value Types, Reference Types & Financial Precision',
          body: [
            'In C# and .NET, types fall into two primary categories: value types (int, long, decimal, bool, DateOnly, structs) that store data inline and copy by value, and reference types (string, arrays, classes, records) allocated on the managed heap and accessed via references.',
            'For currency, invoices, and percentages, C# provides a first-class 128-bit base-10 decimal type (using the m suffix, e.g., 19.99m). Unlike binary double, decimal represents base-10 fractions without rounding drift.',
          ],
          points: [
            'Use decimal (12.50m) for all money and tax math; reserve double for physics, graphics, and statistics.',
            'Value types cannot be null unless explicitly wrapped as Nullable<T> (written int? or DateOnly?).',
            'C# string equality (== and !=) compares text values directly, unlike Java where == compares references.',
            'Use DateOnly, TimeOnly, and DateTimeOffset (UTC) instead of ambiguous local DateTime.',
          ],
          table: {
            headers: ['C# Type', 'Category', 'Precision / Range', 'Typical Use'],
            rows: [
              ['int', 'Value (32-bit)', '-2.1B to +2.1B', 'Counters, loop indices, counts'],
              ['long', 'Value (64-bit)', '±9.2 quintillion', 'Database IDs, byte sizes, ticks'],
              [
                'decimal',
                'Value (128-bit)',
                '28–29 decimal digits',
                'Money, prices, accounting (suffix m)',
              ],
              ['double', 'Value (64-bit)', '~15–17 binary digits', 'Scientific math, coordinates'],
              ['string', 'Reference (immutable)', 'UTF-16 text', 'Names, messages, JSON payloads'],
            ],
          },
          example: {
            title: 'decimal Precision, TryParse & Null-Safety Operators',
            language: 'csharp',
            code: `using System.Globalization;

decimal price = 19.99m;
decimal taxRate = 0.10m;
decimal total = Math.Round(price * (1 + taxRate), 2);

string? rawCoupon = null;
string coupon = rawCoupon?.Trim().ToUpperInvariant() ?? "NONE";

string input = "42";
int qty = int.TryParse(input, NumberStyles.Integer, CultureInfo.InvariantCulture, out var parsed)
    ? parsed
    : 1;

Console.WriteLine($"Total: \${total:F2} | Coupon: {coupon} | Qty: {qty}");`,
            output: `Total: $21.99 | Coupon: NONE | Qty: 42`,
          },
          warning:
            'Never store prices in double or float in C#—0.1 + 0.2 evaluates to 0.30000000000000004, causing silent penny discrepancies across invoices. Always use decimal with the m suffix.',
        },
        {
          id: 'nullable-reference-safety',
          heading: 'Nullable Reference Types & Safe Input Parsing',
          body: [
            'Modern .NET projects enable <Nullable>enable</Nullable> by default. With nullable annotations active, string means "never null" while string? means "may be null"—and the compiler warns you immediately if you dereference a string? without checking it first.',
            'Combine null-conditional access (user?.Profile?.City), null-coalescing fallback (??), and null-coalescing assignment (cache ??= LoadDefaults()) to keep null checks crisp. When converting user strings to numbers or dates, always prefer TryParse over Parse so invalid input flows cleanly without expensive exception overhead.',
          ],
          points: [
            'Keep <Nullable>enable</Nullable> turned on in every .csproj to catch null bugs at compile time.',
            'Use TryParse with CultureInfo.InvariantCulture when parsing API/CSV numbers so locale commas do not break parsing.',
            'Avoid abusing the null-forgiving operator (!) to silence compiler warnings—fix the check instead.',
            'Use raw string literals ("""...""") in C# 11+ for clean multi-line JSON and SQL without escape clutter.',
          ],
          tip: 'Use string.IsNullOrWhiteSpace(value) instead of value == null || value == "" so whitespace-only inputs like "   " are also caught cleanly.',
        },
      ],
      challenge: {
        prompt:
          'Write a C# method static decimal ParsePriceOrDefault(string? raw, decimal fallback = 0m) that safely parses raw using decimal.TryParse with CultureInfo.InvariantCulture and returns fallback if raw is null, invalid, or negative.',
        hint: 'Check decimal.TryParse(raw, NumberStyles.Number, CultureInfo.InvariantCulture, out var value) && value >= 0m.',
        language: 'csharp',
        solutionCode: `using System.Globalization;

static decimal ParsePriceOrDefault(string? raw, decimal fallback = 0m)
{
    if (string.IsNullOrWhiteSpace(raw))
        return fallback;

    return decimal.TryParse(raw, NumberStyles.Number, CultureInfo.InvariantCulture, out var value) && value >= 0m
        ? value
        : fallback;
}

Console.WriteLine(ParsePriceOrDefault("24.50"));
Console.WriteLine(ParsePriceOrDefault("-10", 5.00m));
Console.WriteLine(ParsePriceOrDefault("abc", 9.99m));`,
      },
      quiz: [
        {
          question: 'Why should financial prices in C# use decimal instead of double?',
          options: [
            'double cannot hold numbers larger than 1000',
            'decimal is a 128-bit base-10 floating-point type that avoids binary rounding drift like 0.1 + 0.2 != 0.3',
            'decimal automatically formats currency symbols for every country',
            'double is deprecated in .NET 8 and newer',
          ],
          answer: 1,
          explanation:
            'Binary floating-point types (float/double) cannot represent exact base-10 decimals like 0.1. C# decimal stores base-10 digits precisely, making it essential for financial calculations.',
        },
        {
          question:
            'What does string name = input?.Trim() ?? "Anonymous"; evaluate to when input is null?',
          options: [
            'Throws a NullReferenceException',
            'Evaluates to null',
            'Evaluates to "Anonymous"',
            'Evaluates to an empty string ""',
          ],
          answer: 2,
          explanation:
            'The null-conditional operator (?.) short-circuits and produces null instead of throwing, and the null-coalescing operator (??) supplies the fallback "Anonymous".',
        },
      ],
    },
    km: {
      duration: '10 នាទី',
      objectives: [
        'បែងចែកប្រភេទ Value Types (structs, int, decimal) និង Reference Types (classes, strings) ក្នុង C#',
        'ប្រើ decimal ជំនួស double សម្រាប់ការគណនាប្រាក់ និងវិក្កយបត្រជាក់លាក់',
        'លុបបំបាត់ NullReferenceException ដោយប្រើ nullable reference types, ?. និង ??/??=',
        'បម្លែងទិន្នន័យបញ្ចូលពីអ្នកប្រើដោយសុវត្ថិភាពជាមួយ TryParse ជំនួសការបោះ exception',
      ],
      extraSections: [
        {
          id: 'value-vs-reference-types',
          heading: 'Value Types, Reference Types និងភាពជាក់លាក់ផ្នែកហិរញ្ញវត្ថុ',
          body: [
            'ក្នុង C# និង .NET ប្រភេទទិន្នន័យចែកជាពីរក្រុមសំខាន់៖ value types (int, long, decimal, bool, DateOnly, structs) ដែលផ្ទុកទិន្នន័យផ្ទាល់ និងចម្លងតាមតម្លៃ និង reference types (string, arrays, classes, records) ដែលរក្សាទុកលើ managed heap ហើយចូលប្រើតាមរយៈ reference។',
            'សម្រាប់រូបិយប័ណ្ណ និងពន្ធ C# ផ្ដល់ប្រភេទ decimal ទំហំ 128-bit គោលដប់ (ដាក់អក្សរ m ពីក្រោយ ឧ. 19.99m)។ ខុសពី double គោលពីរ decimal តំណាងចំនួនទសភាគគោលដប់ដោយគ្មានកំហុសលម្អៀងឡើយ។',
          ],
          points: [
            'ប្រើ decimal (12.50m) សម្រាប់ការគណនាប្រាក់ទាំងអស់ ហើយទុក double សម្រាប់គណិតវិទ្យាវិទ្យាសាស្ត្រ ឬក្រាហ្វិក។',
            'Value types មិនអាចជា null ទេ លុះត្រាតែដាក់សញ្ញា ? (ឧ. int? ឬ DateOnly?)។',
            'សញ្ញា == លើ string ក្នុង C# ប្រៀបធៀបតម្លៃអត្ថបទផ្ទាល់ ខុសពី Java ដែល == ប្រៀបធៀបអាសយដ្ឋាន។',
            'ប្រើ DateOnly, TimeOnly និង DateTimeOffset (UTC) ជំនួស DateTime ក្នុងតំបន់ម៉ោងមិនច្បាស់។',
          ],
          table: {
            headers: ['ប្រភេទ C#', 'ក្រុម', 'ភាពលម្អិត / ដែនតម្លៃ', 'ការប្រើប្រាស់ទូទៅ'],
            rows: [
              ['int', 'Value (32-bit)', '-2.1B ដល់ +2.1B', 'អថេររាប់ លេខរៀង ចំនួនគត់'],
              ['long', 'Value (64-bit)', '±9.2 quintillion', 'ID មូលដ្ឋានទិន្នន័យ ទំហំបៃ ticks'],
              [
                'decimal',
                'Value (128-bit)',
                '28–29 ខ្ទង់គោលដប់',
                'ប្រាក់ តម្លៃទំនិញ គណនេយ្យ (ដាក់ m)',
              ],
              ['double', 'Value (64-bit)', '~15–17 ខ្ទង់គោលពីរ', 'គណនាវិទ្យាសាស្ត្រ កូអរដោនេ'],
              ['string', 'Reference (immutable)', 'អត្ថបទ UTF-16', 'ឈ្មោះ សារ ទិន្នន័យ JSON'],
            ],
          },
          exampleTitle: 'ភាពជាក់លាក់ decimal, TryParse និងឧបករណ៍សុវត្ថិភាព Null',
          warning:
            'កុំរក្សាតម្លៃប្រាក់ក្នុង double ឬ float ក្នុង C# — 0.1 + 0.2 ផ្ដល់លទ្ធផល 0.30000000000000004 ដែលបង្កការលម្អៀងលុយលើវិក្កយបត្រ។ ត្រូវប្រើ decimal ភ្ជាប់អក្សរ m ជានិច្ច។',
        },
        {
          id: 'nullable-reference-safety',
          heading: 'Nullable Reference Types និងការបម្លែងទិន្នន័យដោយសុវត្ថិភាព',
          body: [
            'គម្រោង .NET សម័យទំនើបបើក <Nullable>enable</Nullable> ជាលំនាំដើម។ ពេលបើកវា string មានន័យថា "មិនអាច null" ចំណែក string? មានន័យថា "អាច null" — ហើយ compiler នឹងព្រមានភ្លាមប្រសិនបើអ្នកប្រើ string? ដោយមិនទាន់ពិនិត្យ null ជាមុន។',
            'ផ្សំការប្រើ ?. (null-conditional), ?? (fallback) និង ??= (កំណត់តម្លៃពេល null) ដើម្បីឱ្យកូដខ្លីស្អាត។ ពេលបម្លែងអត្ថបទពីអ្នកប្រើទៅជាលេខ ឬកាលបរិច្ឆេទ ត្រូវប្រើ TryParse ជំនួស Parse ដើម្បីជៀសវាងការបោះ exception ដែលយឺត។',
          ],
          points: [
            'បើក <Nullable>enable</Nullable> ក្នុងគ្រប់ឯកសារ .csproj ដើម្បីចាប់កំហុស null ពេល compile។',
            'ប្រើ TryParse ជាមួយ CultureInfo.InvariantCulture ពេលអានលេខពី API/CSV កុំឱ្យសញ្ញាក្បៀសតាមតំបន់បង្កកំហុស។',
            'កុំប្រើសញ្ញា ! (null-forgiving) ដើម្បីបំបិទការព្រមាន compiler ដោយមិនបានពិនិត្យពិតប្រាកដ។',
            'ប្រើ raw string literals ("""...""") ក្នុង C# 11+ សម្រាប់ JSON ឬ SQL ច្រើនបន្ទាត់ងាយអាន។',
          ],
          tip: 'ប្រើ string.IsNullOrWhiteSpace(value) ជំនួស value == null || value == "" ដើម្បីចាប់ទាំងអត្ថបទដែលមានតែដកឃ្លា "   " ផងដែរ។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ C# static decimal ParsePriceOrDefault(string? raw, decimal fallback = 0m) ដែលបម្លែង raw ដោយសុវត្ថិភាពជាមួយ decimal.TryParse និង CultureInfo.InvariantCulture រួចត្រឡប់ fallback បើ raw ជា null មិនត្រឹមត្រូវ ឬអវិជ្ជមាន។',
        hint: 'ពិនិត្យ decimal.TryParse(raw, NumberStyles.Number, CultureInfo.InvariantCulture, out var value) && value >= 0m។',
      },
      quiz: [
        {
          question: 'ហេតុអ្វីតម្លៃហិរញ្ញវត្ថុក្នុង C# គួរប្រើ decimal ជំនួស double?',
          options: [
            'double មិនអាចផ្ទុកលេខធំជាង 1000 បានទេ',
            'decimal ជាប្រភេទទសភាគគោលដប់ 128-bit ដែលជៀសវាងកំហុសលម្អៀងគោលពីរដូច 0.1 + 0.2 != 0.3',
            'decimal បន្ថែមនិមិត្តសញ្ញារូបិយប័ណ្ណដោយស្វ័យប្រវត្តិ',
            'double ត្រូវបានឈប់ប្រើក្នុង .NET 8 ឡើងទៅ',
          ],
          answer: 1,
          explanation:
            'ប្រភេទគោលពីរ (float/double) មិនអាចតំណាង 0.1 ជាក់លាក់ទេ។ C# decimal រក្សាខ្ទង់គោលដប់យ៉ាងជាក់លាក់ ស័ក្តិសមសម្រាប់ហិរញ្ញវត្ថុ។',
        },
        {
          question:
            'តើ string name = input?.Trim() ?? "Anonymous"; ផ្ដល់លទ្ធផលអ្វីនៅពេល input ជា null?',
          options: [
            'បោះកំហុស NullReferenceException',
            'ផ្ដល់លទ្ធផល null',
            'ផ្ដល់លទ្ធផល "Anonymous"',
            'ផ្ដល់លទ្ធផលអត្ថបទទទេ ""',
          ],
          answer: 2,
          explanation:
            'សញ្ញា ?. បញ្ឈប់ការហៅ .Trim() ហើយផ្ដល់ null ដោយមិនបោះកំហុស រួច ?? ផ្ដល់តម្លៃជំនួស "Anonymous"។',
        },
      ],
    },
  },

  'csharp/csharp-control-flow-methods': {
    en: {
      duration: '11 min',
      objectives: [
        'Use modern C# relational, logical, and property pattern matching in switch expressions',
        'Choose appropriately between return tuples, out, ref, in, and params parameters',
        'Validate method arguments concisely with ArgumentNullException.ThrowIfNull and guard clauses',
        'Avoid integer-division traps and InvalidOperationException when modifying collections during foreach',
      ],
      extraSections: [
        {
          id: 'pattern-matching-and-tuples',
          heading: 'Pattern Matching, Value Tuples & Parameter Modifiers',
          body: [
            'C# pattern matching turns complex range checks and branching rules into declarative switch expressions. You can combine relational patterns (>= 90), logical combinators (and, or, not), and property patterns ({ Status: "Active", Age: >= 18 }) while the compiler warns you if any case is missing.',
            'When a method needs to return multiple related values—such as min, max, and average—named value tuples like (int Min, int Max, double Avg) are stack-allocated and far cleaner than multiple out parameters. Reserve out primarily for the idiomatic Try... pattern (bool TryGet(key, out value)).',
          ],
          points: [
            'Use relational patterns (>= 0 and <= 100) in switch expressions instead of chained if/else-if ladders.',
            'Prefer named tuples or small records over multiple out parameters for multi-value returns.',
            'Use params for flexible helper methods that accept either individual values or an array.',
            'Use in on large readonly structs to avoid copying overhead without allowing mutation.',
          ],
          table: {
            headers: ['Modifier', 'Behavior', 'Common Use Case'],
            rows: [
              [
                '(default)',
                'Passed by value (copy of value or reference)',
                '95% of all C# method parameters',
              ],
              [
                'out',
                'Callee MUST assign before returning',
                'TryParse / TryGetValue lookup patterns',
              ],
              [
                'ref',
                'Two-way alias to caller variable',
                'Low-level swaps or in-place struct mutation',
              ],
              ['in', 'Read-only reference (no copy)', 'Passing large structs in hot loops'],
              [
                'params',
                'Packs trailing arguments into array/span',
                'Variadic helpers like Sum(1, 2, 3)',
              ],
            ],
          },
          example: {
            title: 'Relational Pattern Matching & Named Tuple Returns',
            language: 'csharp',
            code: `static string ClassifyLatency(int ms) => ms switch
{
    < 0 => "Invalid",
    <= 100 => "Fast",
    > 100 and <= 350 => "Acceptable",
    _ => "Slow"
};

static (int Min, int Max, double Avg) Analyze(params int[] samples)
{
    ArgumentOutOfRangeException.ThrowIfZero(samples.Length);
    int min = samples[0], max = samples[0], sum = 0;
    foreach (var s in samples)
    {
        if (s < min) min = s;
        if (s > max) max = s;
        sum += s;
    }
    return (min, max, (double)sum / samples.Length);
}

var stats = Analyze(80, 140, 290, 90);
Console.WriteLine($"Min={stats.Min}, Max={stats.Max}, Avg={stats.Avg:F1} ({ClassifyLatency((int)stats.Avg)})");`,
            output: `Min=80, Max=290, Avg=150.0 (Acceptable)`,
          },
          warning:
            'Modifying a List<T> (calling .Add() or .Remove()) while iterating over it with foreach throws InvalidOperationException. Also watch out for integer division: 5 / 2 evaluates to 2 unless you cast one operand to double or decimal.',
        },
        {
          id: 'local-functions-and-guards',
          heading: 'Built-In Guard Helpers, Local Functions & Optional Arguments',
          body: [
            '.NET 8+ ships with concise static guard methods—ArgumentNullException.ThrowIfNull(arg), ArgumentException.ThrowIfNullOrWhiteSpace(str), and ArgumentOutOfRangeException.ThrowIfNegative(n)—that automatically capture the exact parameter name via [CallerArgumentExpression] with zero boilerplate.',
            'When a helper function is only meaningful inside one parent method (such as a recursive tree walk or loop helper), declare it as a static local function inside the method to keep the class API clean and avoid accidental closures allocating on the heap.',
          ],
          points: [
            'Use ArgumentNullException.ThrowIfNull(x) at the top of public methods for clear diagnostics.',
            'Mark inner helpers static (static int Step(int x) => ...) so they do not silently capture local variables.',
            'Use named arguments (SendEmail(to: addr, retry: true)) when boolean flags would otherwise be cryptic.',
            'Expression-bodied methods (=>) are ideal for single-expression logic; switch to block syntax once branching grows.',
          ],
          tip: 'When filtering items out of a List<T> in-place, use list.RemoveAll(item => item.IsExpired) instead of a manual loop—it is O(n) and never throws InvalidOperationException.',
        },
      ],
      challenge: {
        prompt:
          'Write a C# method static (int Passed, int Failed, double PassRate) EvaluateScores(params int[] scores) that validates scores is non-empty, counts passing scores (>= 70), and returns the percentage pass rate as a double.',
        hint: 'Use (double)passed / scores.Length * 100.0 to avoid integer division.',
        language: 'csharp',
        solutionCode: `static (int Passed, int Failed, double PassRate) EvaluateScores(params int[] scores)
{
    ArgumentOutOfRangeException.ThrowIfZero(scores.Length);

    int passed = 0;
    foreach (var score in scores)
    {
        if (score >= 70) passed++;
    }
    int failed = scores.Length - passed;
    double rate = (double)passed / scores.Length * 100.0;
    return (passed, failed, rate);
}

var report = EvaluateScores(85, 62, 91, 70, 55);
Console.WriteLine($"Passed: {report.Passed}, Failed: {report.Failed}, Rate: {report.PassRate:F1}%");`,
      },
      quiz: [
        {
          question:
            'What happens if you call list.Remove(item) inside a foreach (var item in list) loop in C#?',
          options: [
            'C# adjusts the iterator automatically',
            'The loop exits early with no error',
            'It throws an InvalidOperationException because the collection was modified during enumeration',
            'It skips the next two elements silently',
          ],
          answer: 2,
          explanation:
            'List<T> tracks a version counter during foreach enumeration. Modifying the list inside the loop invalidates the enumerator and throws InvalidOperationException; use RemoveAll() or iterate over a copy/reverse index.',
        },
        {
          question: 'What does 7 / 2 evaluate to in C#, and how do you get 3.5?',
          options: [
            'It evaluates to 3.5 automatically',
            'It evaluates to 3 (integer division); cast at least one operand such as 7.0 / 2 or (double)7 / 2',
            'It throws ArithmeticException',
            'It evaluates to 4 due to banker’s rounding',
          ],
          answer: 1,
          explanation:
            'Dividing two int values truncates the fractional remainder in C#, producing 3. Converting either operand to double or decimal performs floating/decimal division.',
        },
      ],
    },
    km: {
      duration: '11 នាទី',
      objectives: [
        'ប្រើប្រាស់ relational, logical និង property pattern matching ក្នុង switch expressions របស់ C#',
        'ជ្រើសរើសឱ្យត្រឹមត្រូវរវាង value tuples, out, ref, in និង params',
        'ផ្ទៀងផ្ទាត់អាគុយម៉ង់យ៉ាងខ្លីស្អាតជាមួយ ArgumentNullException.ThrowIfNull និង guard clauses',
        'ជៀសវាងកំហុសចែកចំនួនគត់ និង InvalidOperationException ពេលកែប្រែ collection ក្នុង foreach',
      ],
      extraSections: [
        {
          id: 'pattern-matching-and-tuples',
          heading: 'Pattern Matching, Value Tuples និង Parameter Modifiers',
          body: [
            'Pattern matching ក្នុង C# បម្លែងលក្ខខណ្ឌប្រៀបធៀបស្មុគស្មាញទៅជា switch expressions ដែលងាយអាន។ អ្នកអាចផ្សំ relational patterns (>= 90), logical combinators (and, or, not) និង property patterns ({ Status: "Active", Age: >= 18 }) ហើយ compiler នឹងព្រមានបើខ្វះករណីណាមួយ។',
            'ពេលអនុគមន៍ត្រូវត្រឡប់តម្លៃពាក់ព័ន្ធច្រើន (ដូច min, max, avg) ការប្រើ named value tuples ដូច (int Min, int Max, double Avg) ស្អាតជាងការប្រើ out parameter ច្រើន។ ទុក out សម្រាប់គំរូ Try... ដូច TryParse ឬ TryGetValue។',
          ],
          points: [
            'ប្រើ relational patterns (>= 0 and <= 100) ក្នុង switch expressions ជំនួស if/else-if វែងៗ។',
            'ជ្រើស named tuples ឬ record តូចមួយ ជំនួស out parameters ច្រើនពេលត្រឡប់តម្លៃលើសពីមួយ។',
            'ប្រើ params សម្រាប់អនុគមន៍ជំនួយដែលអាចទទួលតម្លៃដាច់ដោយឡែក ឬ array ក៏បាន។',
            'ប្រើ in លើ struct ធំៗដែលមិនកែប្រែ ដើម្បីកុំឱ្យចម្លងទិន្នន័យច្រើនក្នុងរង្វិលជុំលឿន។',
          ],
          table: {
            headers: ['Modifier', 'ឥរិយាបថ', 'ការប្រើប្រាស់ទូទៅ'],
            rows: [
              [
                '(លំនាំដើម)',
                'បញ្ជូនតាមតម្លៃ (ចម្លង value ឬ reference)',
                '95% នៃប៉ារ៉ាម៉ែត្រ C# ទាំងអស់',
              ],
              ['out', 'អនុគមន៍ត្រូវតែផ្ដល់តម្លៃមុន return', 'គំរូ TryParse / TryGetValue'],
              ['ref', 'ភ្ជាប់ផ្ទាល់ពីរទិសទៅអថេរអ្នកហៅ', 'ប្ដូរតម្លៃគ្នា ឬកែ struct នៅនឹងកន្លែង'],
              [
                'in',
                'Reference សម្រាប់អានតែប៉ុណ្ណោះ (មិនចម្លង)',
                'បញ្ជូន struct ធំៗក្នុងកូដត្រូវការល្បឿន',
              ],
              ['params', 'ប្រមូលអាគុយម៉ង់ខាងក្រោយជា array/span', 'អនុគមន៍ដូច Sum(1, 2, 3)'],
            ],
          },
          exampleTitle: 'Relational Pattern Matching និងការត្រឡប់ Named Tuple',
          warning:
            'ការហៅ list.Add() ឬ list.Remove() ពេលកំពុងដើរកាត់ដោយ foreach បោះកំហុស InvalidOperationException។ ម្យ៉ាងទៀត ត្រូវប្រយ័ត្នការចែកចំនួនគត់៖ 5 / 2 ផ្ដល់លទ្ធផល 2 លុះត្រាតែបម្លែងតួណាមួយជា double ឬ decimal។',
        },
        {
          id: 'local-functions-and-guards',
          heading: 'Guard Helpers, Local Functions និងអាគុយម៉ង់ស្រេចចិត្ត',
          body: [
            '.NET 8+ មាន guard methods ស្រាប់ដូច ArgumentNullException.ThrowIfNull(arg), ArgumentException.ThrowIfNullOrWhiteSpace(str) និង ArgumentOutOfRangeException.ThrowIfNegative(n) ដែលចាប់ឈ្មោះប៉ារ៉ាម៉ែត្រដោយស្វ័យប្រវត្តិដោយមិនបាច់សរសេរ if វែងៗ។',
            'ពេលអនុគមន៍ជំនួយប្រើតែក្នុងអនុគមន៍មេមួយ សូមប្រកាសវាជា static local function ខាងក្នុងអនុគមន៍នោះ ដើម្បីរក្សា class ឱ្យស្អាត និងជៀសវាងការបង្កើត closure លើ heap ដោយអចេតនា។',
          ],
          points: [
            'ប្រើ ArgumentNullException.ThrowIfNull(x) នៅដើម public methods ដើម្បីផ្ដល់សារកំហុសច្បាស់លាស់។',
            'ដាក់ static លើ local functions (static int Step(int x) => ...) កុំឱ្យវាចាប់អថេរជុំវិញដោយស្ងាត់ៗ។',
            'ប្រើ named arguments (SendEmail(to: addr, retry: true)) ដើម្បីឱ្យប៉ារ៉ាម៉ែត្រ boolean ងាយយល់។',
            'ប្រើ expression-bodied methods (=>) សម្រាប់កន្សោមខ្លីមួយបន្ទាត់ ហើយប្រើប្លុក {} ពេលមានលក្ខខណ្ឌច្រើន។',
          ],
          tip: 'ពេលចង់លុបធាតុតាមលក្ខខណ្ឌចេញពី List<T> សូមប្រើ list.RemoveAll(item => item.IsExpired) ជំនួសរង្វិលជុំដោយដៃ — វាមានល្បឿន O(n) និងមិនបោះ InvalidOperationException ឡើយ។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ C# static (int Passed, int Failed, double PassRate) EvaluateScores(params int[] scores) ដែលពិនិត្យថា scores មិនទទេ រាប់ពិន្ទុជាប់ (>= 70) និងត្រឡប់ភាគរយជាប់ជា double។',
        hint: 'ប្រើ (double)passed / scores.Length * 100.0 ដើម្បីជៀសវាងការចែកចំនួនគត់។',
      },
      quiz: [
        {
          question:
            'តើមានអ្វីកើតឡើងបើអ្នកហៅ list.Remove(item) ក្នុងរង្វិលជុំ foreach (var item in list) ក្នុង C#?',
          options: [
            'C# កែសម្រួល iterator ដោយស្វ័យប្រវត្តិ',
            'រង្វិលជុំចាកចេញមុនដោយគ្មានកំហុស',
            'វាបោះកំហុស InvalidOperationException ព្រោះ collection ត្រូវបានកែប្រែពេលកំពុងអាន',
            'វារំលងធាតុបន្ទាប់ពីរដោយស្ងាត់ៗ',
          ],
          answer: 2,
          explanation:
            'List<T> តាមដាន version ពេលដើរកាត់ foreach។ ការកែប្រែ list ខាងក្នុងរង្វិលជុំបោះ InvalidOperationException ដូច្នេះត្រូវប្រើ RemoveAll() ឬដើរកាត់លើច្បាប់ចម្លង។',
        },
        {
          question: 'តើ 7 / 2 ផ្ដល់លទ្ធផលអ្វីក្នុង C# ហើយត្រូវធ្វើយ៉ាងណាដើម្បីបាន 3.5?',
          options: [
            'ផ្ដល់លទ្ធផល 3.5 ដោយស្វ័យប្រវត្តិ',
            'ផ្ដល់លទ្ធផល 3 (ការចែកចំនួនគត់) ត្រូវបម្លែងតួណាមួយដូច 7.0 / 2 ឬ (double)7 / 2',
            'បោះកំហុស ArithmeticException',
            'ផ្ដល់លទ្ធផល 4 ដោយការបង្គត់',
          ],
          answer: 1,
          explanation:
            'ការចែក int និង int កាត់ចោលផ្នែកទសភាគផ្ដល់ 3។ ការបម្លែងតួណាមួយទៅ double ឬ decimal នឹងផ្ដល់ 3.5។',
        },
      ],
    },
  },

  'csharp/classes-records-properties': {
    en: {
      duration: '13 min',
      objectives: [
        'Choose correctly among class, record class, struct, and record struct based on identity and allocation',
        'Enforce compile-time object initialization with required and init-only properties',
        'Simplify service and entity declarations with C# 12 primary constructors',
        'Avoid reference-equality pitfalls when placing mutable collections inside records',
      ],
      extraSections: [
        {
          id: 'class-record-struct',
          heading: 'Choosing Between class, record, and record struct',
          body: [
            'Modern C# gives you precise control over both memory layout and equality semantics. Use a regular class for stateful services and entities with lifecycle identity (such as a BankAccount identified by its ID). Use a record (reference type) for immutable DTOs, API payloads, and domain events where two objects with the same values should be considered equal.',
            'For tiny, short-lived value objects like Point(double X, double Y) or Money(decimal Amount, string Currency), a readonly record struct avoids heap allocations completely while still giving you value equality, deconstruction, and non-destructive with expressions.',
          ],
          points: [
            'Records compare property values automatically (new User("A") == new User("A") is true).',
            'Classes compare reference identity by default unless you explicitly override Equals and GetHashCode.',
            'Use readonly record struct for small (<= 16–24 bytes), immutable value objects in hot paths.',
            'Use the with keyword (var updated = order with { Status = "Shipped" }) for clean immutable updates.',
          ],
          table: {
            headers: ['Type Kind', 'Allocation', 'Equality Default', 'Best Use Case'],
            rows: [
              [
                'class',
                'Heap (reference)',
                'Reference identity',
                'Services, mutable entities with lifecycle',
              ],
              [
                'record class',
                'Heap (reference)',
                'Value-based (all props)',
                'API DTOs, domain events, config snapshots',
              ],
              [
                'struct',
                'Stack / inline',
                'Value (reflection slow)',
                'Low-level perf types (prefer readonly)',
              ],
              [
                'readonly record struct',
                'Stack / inline',
                'Fast generated value',
                'Small immutable values (Money, Coordinate)',
              ],
            ],
          },
          example: {
            title: 'required + init Properties, Records & Primary Constructors',
            language: 'csharp',
            code: `public readonly record struct Money(decimal Amount, string Currency);

public sealed class Invoice
{
    public required string Id { get; init; }
    public required Money Total { get; init; }
    public string Status { get; private set; } = "Draft";

    public void MarkPaid() => Status = "Paid";
}

var inv = new Invoice { Id = "INV-101", Total = new Money(120.00m, "USD") };
var discounted = inv.Total with { Amount = 108.00m };
inv.MarkPaid();

Console.WriteLine($"{inv.Id}: {inv.Status}, Original={inv.Total.Amount}, Discounted={discounted.Amount}");`,
            output: `INV-101: Paid, Original=120.00, Discounted=108.00`,
          },
          warning:
            'Putting a mutable List<T> property inside a C# record breaks structural equality! Generated record equality compares List<T> by reference—two records with identical list elements will return false for ==. Use ImmutableArray<T> or custom Equals() when comparing sequences.',
        },
        {
          id: 'encapsulation-and-interfaces',
          heading: 'Encapsulation, Primary Constructors & Read-Only Collections',
          body: [
            'Combining the required modifier with init-only setters ({ get; init; }) guarantees at compile time that callers populate every mandatory field during object creation and cannot mutate those fields afterward—eliminating dozens of boilerplate constructor overloads.',
            'C# 12 primary constructors let you declare constructor parameters directly on the class header (public sealed class OrderService(IOrderRepo repo)), cutting repetition dramatically. Expose internal collections as IReadOnlyList<T> so external callers cannot bypass domain rules by calling .Add() or .Clear().',
          ],
          points: [
            'Mark classes sealed by default unless designed for inheritance—it communicates intent and enables JIT devirtualization.',
            'Use private set on domain state properties and change them only through explicit methods like MarkPaid().',
            'Expose IReadOnlyList<T> instead of List<T> on public properties to protect class invariants.',
            'Use primary constructors for clean dependency injection in ASP.NET Core services and handlers.',
          ],
          tip: 'If you expose a backing List<T> via a public property, return _items.AsReadOnly() or IReadOnlyList<T> so callers can iterate safely without mutating your entity’s internal state.',
        },
      ],
      challenge: {
        prompt:
          'Define a C# record OrderLine(string Sku, int Quantity, decimal UnitPrice) with a computed property decimal Subtotal => Quantity * UnitPrice and a method OrderLine WithQuantity(int newQty) that throws ArgumentOutOfRangeException if newQty <= 0 and otherwise returns a copied record using the with expression.',
        hint: 'Use ArgumentOutOfRangeException.ThrowIfNegativeOrZero(newQty); return this with { Quantity = newQty };',
        language: 'csharp',
        solutionCode: `public record OrderLine(string Sku, int Quantity, decimal UnitPrice)
{
    public decimal Subtotal => Quantity * UnitPrice;

    public OrderLine WithQuantity(int newQty)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(newQty);
        return this with { Quantity = newQty };
    }
}

var line = new OrderLine("KB-01", 2, 49.50m);
var updated = line.WithQuantity(3);
Console.WriteLine($"{line.Sku}: {line.Subtotal:F2} -> {updated.Subtotal:F2}");`,
      },
      quiz: [
        {
          question:
            'Why might two instances of record Cart(List<string> Items) with identical items ("Book") return false when compared with ==?',
          options: [
            'Records do not support the == operator',
            'Record equality compares each property with its default equality, and List<string> uses reference equality rather than element-by-element comparison',
            'Strings inside lists are always case-sensitive',
            'Records only compare numeric properties',
          ],
          answer: 1,
          explanation:
            'Auto-generated record equality checks EqualityComparer<T>.Default for each property. Since List<string> uses reference equality, two separate List instances with identical items are not considered equal.',
        },
        {
          question:
            'What does declaring a property as public required string Email { get; init; } enforce?',
          options: [
            'Email can be changed at any time after construction',
            'Callers must set Email during object initialization, and it cannot be reassigned afterward',
            'Email is automatically encrypted in memory',
            'Email must be a static field shared by all instances',
          ],
          answer: 1,
          explanation:
            'required makes the compiler enforce setting the property in the object initializer, while init ensures the property is immutable after construction completes.',
        },
      ],
    },
    km: {
      duration: '13 នាទី',
      objectives: [
        'ជ្រើសរើសឱ្យត្រឹមត្រូវរវាង class, record class, struct និង readonly record struct តាមតម្រូវការអត្តសញ្ញាណ និងអង្គចងចាំ',
        'បង្ខំការកំណត់តម្លៃពេលបង្កើត object ជាមួយ required និង init-only properties',
        'កាត់បន្ថយកូដដដែលៗជាមួយ C# 12 primary constructors',
        'ជៀសវាងកំហុស reference equality ពេលដាក់ mutable collection ក្នុង record',
      ],
      extraSections: [
        {
          id: 'class-record-struct',
          heading: 'ការជ្រើសរើសរវាង class, record និង record struct',
          body: [
            'C# សម័យទំនើបផ្ដល់ការគ្រប់គ្រងច្បាស់លាស់លើទាំងទីតាំងអង្គចងចាំ និងការប្រៀបធៀបស្មើគ្នា។ ប្រើ class ធម្មតាសម្រាប់ services និង entities ដែលមានស្ថានភាពផ្លាស់ប្ដូរ។ ប្រើ record (reference type) សម្រាប់ API DTOs និង domain events ដែលត្រូវការប្រៀបធៀបតាមតម្លៃ។',
            'សម្រាប់ value objects តូចៗដូច Point ឬ Money(decimal Amount, string Currency) ការប្រើ readonly record struct ជៀសវាងការកក់អង្គចងចាំលើ heap ហើយនៅតែផ្ដល់ការប្រៀបធៀបតាមតម្លៃ និងពាក្យគន្លឹះ with។',
          ],
          points: [
            'Records ប្រៀបធៀបតម្លៃ property ដោយស្វ័យប្រវត្តិ (new User("A") == new User("A") គឺ true)។',
            'Classes ប្រៀបធៀបអាសយដ្ឋានជាលំនាំដើម លុះត្រាតែ override Equals និង GetHashCode។',
            'ប្រើ readonly record struct សម្រាប់ value objects តូចៗ (<= 16–24 បៃ) ដែលមិនកែប្រែ។',
            'ប្រើ with (var updated = order with { Status = "Shipped" }) ដើម្បីចម្លង និងកែប្រែដោយមិនប៉ះទិន្នន័យដើម។',
          ],
          table: {
            headers: ['ប្រភេទ Type', 'អង្គចងចាំ', 'ការប្រៀបធៀបលំនាំដើម', 'ស័ក្តិសមបំផុតសម្រាប់'],
            rows: [
              [
                'class',
                'Heap (reference)',
                'តាមអាសយដ្ឋាន',
                'Services និង entities ដែលមានវដ្ដជីវិតកែប្រែ',
              ],
              [
                'record class',
                'Heap (reference)',
                'តាមតម្លៃគ្រប់ property',
                'API DTOs, domain events, config snapshots',
              ],
              [
                'struct',
                'Stack / inline',
                'តាមតម្លៃ (reflection យឺត)',
                'ប្រភេទល្បឿនខ្ពស់ (គួរដាក់ readonly)',
              ],
              [
                'readonly record struct',
                'Stack / inline',
                'តាមតម្លៃបង្កើតដោយ compiler (លឿន)',
                'តម្លៃតូចមិនកែប្រែ (Money, Coordinate)',
              ],
            ],
          },
          exampleTitle: 'required + init Properties, Records និងការកែដោយ with',
          warning:
            'ការដាក់ List<T> ដែលអាចកែប្រែបានក្នុង C# record ធ្វើឱ្យការប្រៀបធៀបតាមតម្លៃខុស! Record ប្រៀបធៀប List<T> តាមអាសយដ្ឋាន មិនមែនតាមធាតុខាងក្នុងទេ — ដូច្នេះ record ពីរដែលមានធាតុដូចគ្នានឹងផ្ដល់ false ពេលប្រៀបធៀប ==។',
        },
        {
          id: 'encapsulation-and-interfaces',
          heading: 'Encapsulation, Primary Constructors និង Read-Only Collections',
          body: [
            'ការផ្សំ required ជាមួយ init ({ get; init; }) ធានាពេល compile ថាអ្នកហៅត្រូវតែបញ្ចូលគ្រប់ field ចាំបាច់ពេលបង្កើត object ហើយមិនអាចកែប្រែវានៅពេលក្រោយបានឡើយ ជួយលុបបំបាត់ constructor វែងៗ។',
            'C# 12 primary constructors អនុញ្ញាតឱ្យប្រកាសប៉ារ៉ាម៉ែត្រ constructor ផ្ទាល់លើក្បាល class (public sealed class OrderService(IOrderRepo repo))។ គួរបើក collection ជា IReadOnlyList<T> ដើម្បីកុំឱ្យកូដខាងក្រៅហៅ .Add() ឬ .Clear() បំពានច្បាប់អាជីវកម្ម។',
          ],
          points: [
            'ដាក់ sealed លើ class ជាលំនាំដើមបើមិនមានគម្រោង inherit — វាជួយឱ្យ JIT បង្កើនល្បឿនផងដែរ។',
            'ប្រើ private set លើ property ស្ថានភាព ហើយផ្លាស់ប្ដូរវាតែតាមអនុគមន៍ច្បាស់លាស់ដូច MarkPaid()។',
            'បង្ហាញ IReadOnlyList<T> ជំនួស List<T> លើ public properties ដើម្បីការពារស្ថានភាពខាងក្នុង។',
            'ប្រើ primary constructors សម្រាប់ dependency injection យ៉ាងស្អាតក្នុង ASP.NET Core services។',
          ],
          tip: 'ពេលចង់បង្ហាញ List<T> ខាងក្នុងតាម public property ត្រូវត្រឡប់ _items.AsReadOnly() ឬប្រភេទ IReadOnlyList<T> ដើម្បីឱ្យអ្នកហៅអានបានដោយមិនអាចកែប្រែបញ្ជីដើម។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើត C# record OrderLine(string Sku, int Quantity, decimal UnitPrice) ដែលមាន computed property decimal Subtotal => Quantity * UnitPrice និងអនុគមន៍ OrderLine WithQuantity(int newQty) ដែលបោះ ArgumentOutOfRangeException បើ newQty <= 0 ហើយត្រឡប់ record ថ្មីដោយប្រើ with។',
        hint: 'ប្រើ ArgumentOutOfRangeException.ThrowIfNegativeOrZero(newQty); return this with { Quantity = newQty };',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វី instance ពីរនៃ record Cart(List<string> Items) ដែលមានធាតុដូចគ្នា ("Book") ត្រឡប់ false ពេលប្រៀបធៀប ==?',
          options: [
            'Record មិនគាំទ្រសញ្ញា == ទេ',
            'Record ប្រៀបធៀប property នីមួយៗតាមលំនាំដើម ហើយ List<string> ប្រើការប្រៀបធៀបតាមអាសយដ្ឋាន មិនមែនតាមធាតុខាងក្នុងទេ',
            'String ក្នុង list តែងខុសអក្សរតូចធំ',
            'Record ប្រៀបធៀបតែ property ជាលេខប៉ុណ្ណោះ',
          ],
          answer: 1,
          explanation:
            'ការប្រៀបធៀបស្វ័យប្រវត្តិរបស់ record ប្រើ EqualityComparer<T>.Default។ ដោយសារ List<string> ប្រៀបធៀបតាមអាសយដ្ឋាន List ពីរដាច់ដោយឡែកមិនស្មើគ្នាឡើយ។',
        },
        {
          question: 'តើ public required string Email { get; init; } បង្ខំលក្ខខណ្ឌអ្វីខ្លះ?',
          options: [
            'Email អាចប្ដូរតម្លៃបានគ្រប់ពេលក្រោយបង្កើត',
            'អ្នកហៅត្រូវតែកំណត់ Email ពេលបង្កើត object ហើយមិនអាចប្ដូរតម្លៃវិញនៅពេលក្រោយបានទេ',
            'Email ត្រូវបានអ៊ិនគ្រីបដោយស្វ័យប្រវត្តិក្នុងអង្គចងចាំ',
            'Email ក្លាយជា static field រួមគ្នា',
          ],
          answer: 1,
          explanation:
            'required បង្ខំពេល compile ឱ្យកំណត់តម្លៃពេលបង្កើត ចំណែក init ធានាថា property មិនអាចកែប្រែបានក្រោយពេលបង្កើតរួច។',
        },
      ],
    },
  },

  'csharp/linq-and-collections': {
    en: {
      duration: '13 min',
      objectives: [
        'Understand LINQ deferred execution vs immediate materialization to avoid double queries',
        'Group, aggregate, and flatten collections using GroupBy, SelectMany, and ToDictionary',
        'Eliminate O(n^2) lookups with Dictionary.TryGetValue and HashSet<T>',
        'Distinguish in-memory IEnumerable<T> from database-translated IQueryable<T> in EF Core',
      ],
      extraSections: [
        {
          id: 'deferred-execution-and-materialization',
          heading: 'Deferred Execution, Grouping & Materialization',
          body: [
            'Most LINQ query operators (Where, Select, OrderBy, SelectMany, GroupBy) use deferred execution: building the query only defines a lazy pipeline without processing a single element. Execution happens only when you iterate with foreach or call an immediate materializer like ToList(), ToArray(), ToDictionary(), Count(), or FirstOrDefault().',
            'Understanding this distinction is crucial in production .NET apps. If you hold an unmaterialized IEnumerable<T> and check .Any() followed by .Count() and foreach, the entire filter—or underlying database query—runs three separate times!',
          ],
          points: [
            'Materialize once with .ToList() or .ToArray() whenever you will iterate a query result more than once.',
            'Use .Any() instead of .Count() > 0 to test if a sequence is non-empty—Any() stops at the first element in O(1).',
            'Use GroupBy() with projection (.Select(g => new { ... })) to compute sums, averages, and counts cleanly.',
            'Use FirstOrDefault() when zero matches is valid and SingleOrDefault() when >1 match indicates corrupted data.',
          ],
          table: {
            headers: ['LINQ Operator', 'Execution', 'Purpose'],
            rows: [
              ['Where / Select', 'Deferred', 'Filter elements & project into new shapes'],
              ['SelectMany', 'Deferred', 'Flatten nested collections (1-to-many)'],
              ['GroupBy', 'Deferred', 'Partition items by key for aggregation'],
              [
                'Any / FirstOrDefault',
                'Immediate (short-circuit)',
                'Stop as soon as first match is found',
              ],
              [
                'ToList / ToDictionary',
                'Immediate (full scan)',
                'Materialize into memory or O(1) lookup map',
              ],
            ],
          },
          example: {
            title: 'Grouping Sales & Indexing with ToDictionary',
            language: 'csharp',
            code: `using System.Linq;

record Sale(string Dept, decimal Amount);

var sales = new List<Sale>
{
    new("Cloud", 450m),
    new("Mobile", 220m),
    new("Cloud", 310m),
    new("Mobile", 180m)
};

var totalsByDept = sales
    .GroupBy(s => s.Dept)
    .Select(g => new { Dept = g.Key, Total = g.Sum(x => x.Amount), Count = g.Count() })
    .OrderByDescending(x => x.Total)
    .ToDictionary(x => x.Dept);

if (totalsByDept.TryGetValue("Cloud", out var cloud))
{
    Console.WriteLine($"{cloud.Dept}: \${cloud.Total:F2} across {cloud.Count} orders");
}`,
            output: `Cloud: $760.00 across 2 orders`,
          },
          warning:
            'Enumerating the same deferred IEnumerable<T> multiple times re-runs all upstream work (and can trigger duplicate SQL queries or inconsistent snapshots). Materialize once with .ToList() before inspecting .Count and looping.',
        },
        {
          id: 'collections-lookup-performance',
          heading: 'Dictionary, HashSet & IQueryable Performance Traps',
          body: [
            'Calling list.Contains() or list.FirstOrDefault(x => x.Id == id) inside a loop turns a simple join into O(n * m) quadratic slowness. Index the lookup collection once with ToDictionary(x => x.Id) or HashSet<string>(StringComparer.OrdinalIgnoreCase) so every lookup drops to O(1).',
            'When using Entity Framework Core, keep .Where(), .OrderBy(), and .Take() on IQueryable<T> before calling .ToListAsync(). Calling .ToList() or .AsEnumerable() too early pulls an entire million-row database table into application RAM before filtering.',
          ],
          points: [
            'Use dict.TryGetValue(key, out var val) instead of ContainsKey(key) + dict[key] to hash the key only once.',
            'Pass StringComparer.OrdinalIgnoreCase to HashSet/Dictionary constructors for fast case-insensitive keys.',
            'Use DistinctBy(x => x.Email) and Chunk(100) (.NET 6+) for clean deduplication and batch processing.',
            'Filter and project on IQueryable<T> before materializing so SQL does the heavy lifting.',
          ],
          tip: 'Prefer .Any(x => x.IsActive) over .Where(x => x.IsActive).Count() > 0—both in memory and in SQL, Any translates to EXISTS and halts on the very first match.',
        },
      ],
      challenge: {
        prompt:
          'Given a List<Employee> (record Employee(string Name, string Dept, decimal Salary, bool Active)), write a LINQ pipeline returning the top departments of active employees with their average salary, sorted highest average first.',
        hint: 'Chain .Where(e => e.Active).GroupBy(e => e.Dept).Select(g => (Dept: g.Key, Avg: g.Average(x => x.Salary))).OrderByDescending(x => x.Avg).ToList().',
        language: 'csharp',
        solutionCode: `using System.Linq;

record Employee(string Name, string Dept, decimal Salary, bool Active);

var staff = new List<Employee>
{
    new("Sokha", "Engineering", 4200m, true),
    new("Dara", "Engineering", 4800m, true),
    new("Nita", "Design", 3600m, true),
    new("Vibol", "Design", 9000m, false)
};

var deptSummary = staff
    .Where(e => e.Active)
    .GroupBy(e => e.Dept)
    .Select(g => (Dept: g.Key, AvgSalary: g.Average(x => x.Salary)))
    .OrderByDescending(x => x.AvgSalary)
    .ToList();

foreach (var row in deptSummary)
{
    Console.WriteLine($"{row.Dept}: \${row.AvgSalary:F2}");
}`,
      },
      quiz: [
        {
          question: 'Why is items.Any() preferred over items.Count() > 0 on an IEnumerable<T>?',
          options: [
            'Count() does not work on List<T>',
            'Any() stops after checking the very first element, whereas Count() may scan the entire sequence',
            'Any() sorts the collection first',
            'Count() throws an exception if the sequence is empty',
          ],
          answer: 1,
          explanation:
            'Any() short-circuits as soon as one element exists (and translates to SQL EXISTS in EF Core), while Count() iterates all elements if the underlying source does not expose a fast count.',
        },
        {
          question:
            'What happens if you call dbContext.Orders.ToList().Where(o => o.Total > 100) in EF Core?',
          options: [
            'EF Core still runs the WHERE clause in SQL automatically',
            'It downloads the entire Orders table into server memory first, then filters in C#',
            'It causes a compile-time error',
            'It returns only the first 100 rows',
          ],
          answer: 1,
          explanation:
            'Calling ToList() immediately executes SELECT * FROM Orders and loads every row into RAM. Always apply .Where() on the IQueryable<T> before calling ToList() or ToListAsync().',
        },
      ],
    },
    km: {
      duration: '13 នាទី',
      objectives: [
        'យល់ច្បាស់ពី LINQ deferred execution និង immediate materialization ដើម្បីកុំឱ្យសួរទិន្នន័យស្ទួនគ្នា',
        'ផ្ដុំ គណនា និងពន្លាតទិន្នន័យជាមួយ GroupBy, SelectMany និង ToDictionary',
        'លុបបំបាត់ការស្វែងរកយឺត O(n^2) ដោយប្រើ Dictionary.TryGetValue និង HashSet<T>',
        'បែងចែក IEnumerable<T> ក្នុងអង្គចងចាំ និង IQueryable<T> ដែលបកប្រែជា SQL ក្នុង EF Core',
      ],
      extraSections: [
        {
          id: 'deferred-execution-and-materialization',
          heading: 'Deferred Execution, ការផ្ដុំទិន្នន័យ និង Materialization',
          body: [
            'ប្រតិបត្តិការ LINQ ភាគច្រើន (Where, Select, OrderBy, SelectMany, GroupBy) ដំណើរការបែប deferred៖ ការសរសេរ query គ្រាន់តែកំណត់ផែនការប៉ុណ្ណោះ មិនទាន់ដំណើរការលើធាតុណាមួយឡើយ។ វាដំណើរការតែពេលអ្នកដើរកាត់ដោយ foreach ឬហៅ materializer ដូច ToList(), ToArray(), ToDictionary(), Count() ឬ FirstOrDefault()។',
            'ការយល់ចំណុចនេះសំខាន់ណាស់ក្នុងកម្មវិធី .NET ពិតប្រាកដ។ ប្រសិនបើអ្នកហៅ .Any() រួច .Count() រួច foreach លើ IEnumerable<T> តែមួយ query ទាំងមូល (ឬសំណួរ database) នឹងដំណើរការ ៣ ដងផ្សេងគ្នា!',
          ],
          points: [
            'ហៅ .ToList() ឬ .ToArray() តែម្ដងនៅពេលត្រូវការប្រើលទ្ធផល query លើសពីមួយដង។',
            'ប្រើ .Any() ជំនួស .Count() > 0 ដើម្បីពិនិត្យថាមានទិន្នន័យឬអត់ — Any() ឈប់ភ្លាមនៅធាតុទីមួយក្នុង O(1)។',
            'ប្រើ GroupBy() រួមជាមួយ Select ដើម្បីគណនាផលបូក មធ្យមភាគ និងចំនួនធាតុតាមក្រុមយ៉ាងស្អាត។',
            'ប្រើ FirstOrDefault() ពេលអាចរកមិនឃើញ និង SingleOrDefault() ពេលការមានលើស ១ ជាកំហុសទិន្នន័យ។',
          ],
          table: {
            headers: ['ប្រតិបត្តិការ LINQ', 'ការដំណើរការ', 'គោលបំណង'],
            rows: [
              ['Where / Select', 'Deferred (រង់ចាំ)', 'ត្រងធាតុ និងបម្លែងរូបរាងទិន្នន័យ'],
              ['SelectMany', 'Deferred (រង់ចាំ)', 'ពន្លាតបញ្ជីជាន់គ្នា (1-ទៅ-ច្រើន)'],
              ['GroupBy', 'Deferred (រង់ចាំ)', 'បែងចែកធាតុជាក្រុមតាម key ដើម្បីសង្ខេប'],
              ['Any / FirstOrDefault', 'Immediate (ឈប់ឆាប់)', 'ឈប់ភ្លាមពេលរកឃើញធាតុដំបូង'],
              [
                'ToList / ToDictionary',
                'Immediate (អានទាំងអស់)',
                'ទាញចូលអង្គចងចាំ ឬបង្កើតតារាង O(1)',
              ],
            ],
          },
          exampleTitle: 'ការផ្ដុំទិន្នន័យលក់តាមផ្នែក និងបង្កើតសន្ទស្សន៍ ToDictionary',
          warning:
            'ការដើរកាត់ IEnumerable<T> ដែលមាន deferred execution ច្រើនដង នឹងដំណើរការកូដខាងលើឡើងវិញគ្រប់ដង (ឬបាញ់ SQL query ស្ទួនគ្នា)។ ត្រូវហៅ .ToList() ម្ដងមុនពិនិត្យ Count និងរង្វិលជុំ។',
        },
        {
          id: 'collections-lookup-performance',
          heading: 'Dictionary, HashSet និងអន្ទាក់ល្បឿន IQueryable',
          body: [
            'ការហៅ list.Contains() ឬ list.FirstOrDefault(x => x.Id == id) នៅក្នុងរង្វិលជុំធ្វើឱ្យល្បឿនធ្លាក់ចុះដល់ O(n * m)។ ត្រូវបង្កើតសន្ទស្សន៍ម្ដងដោយ ToDictionary(x => x.Id) ឬ HashSet<string>(StringComparer.OrdinalIgnoreCase) ដើម្បីឱ្យរាល់ការស្វែងរកមានល្បឿន O(1)។',
            'នៅពេលប្រើ Entity Framework Core ត្រូវដាក់ .Where(), .OrderBy() និង .Take() លើ IQueryable<T> មុនពេលហៅ .ToListAsync()។ ការហៅ .ToList() មុនពេកនឹងទាញទិន្នន័យទាំងមូលរាប់លានជួរពី database ចូល RAM របស់ server។',
          ],
          points: [
            'ប្រើ dict.TryGetValue(key, out var val) ជំនួស ContainsKey(key) + dict[key] ដើម្បីគណនា hash តែម្ដង។',
            'បញ្ជូន StringComparer.OrdinalIgnoreCase ទៅ HashSet/Dictionary សម្រាប់ key មិនប្រកាន់អក្សរតូចធំ។',
            'ប្រើ DistinctBy(x => x.Email) និង Chunk(100) (.NET 6+) សម្រាប់លុបស្ទួន និងដំណើរការជាក្រុម។',
            'ត្រង និងជ្រើសជួរឈរលើ IQueryable<T> មុនពេលហៅ ToListAsync() ដើម្បីឱ្យ SQL ធ្វើការងារធ្ងន់។',
          ],
          tip: 'ប្រើ .Any(x => x.IsActive) ជំនួស .Where(x => x.IsActive).Count() > 0 — ទាំងក្នុង RAM និង SQL វាបកប្រែជា EXISTS ហើយបញ្ឈប់ភ្លាមពេលឃើញធាតុដំបូង។',
        },
      ],
      challenge: {
        prompt:
          'មាន List<Employee> (record Employee(string Name, string Dept, decimal Salary, bool Active)) — សរសេរ LINQ pipeline ដែលត្រងតែបុគ្គលិកសកម្ម ផ្ដុំតាម Dept គណនាប្រាក់ខែមធ្យមតាមផ្នែក និងតម្រៀបពីមធ្យមភាគខ្ពស់ទៅទាប។',
        hint: 'ភ្ជាប់ .Where(e => e.Active).GroupBy(e => e.Dept).Select(g => (Dept: g.Key, Avg: g.Average(x => x.Salary))).OrderByDescending(x => x.Avg).ToList()។',
      },
      quiz: [
        {
          question: 'ហេតុអ្វី items.Any() ល្អជាង items.Count() > 0 លើ IEnumerable<T>?',
          options: [
            'Count() មិនដំណើរការលើ List<T> ទេ',
            'Any() ឈប់ភ្លាមក្រោយពិនិត្យធាតុទីមួយ ចំណែក Count() អាចរាប់ធាតុទាំងអស់ក្នុង sequence',
            'Any() តម្រៀប collection ជាមុន',
            'Count() បោះកំហុសបើ sequence ទទេ',
          ],
          answer: 1,
          explanation:
            'Any() បញ្ឈប់ភ្លាមពេលឃើញធាតុដំបូង (និងបកប្រែជា SQL EXISTS ក្នុង EF Core) ចំណែក Count() ត្រូវដើរកាត់ធាតុទាំងអស់។',
        },
        {
          question:
            'តើមានអ្វីកើតឡើងប្រសិនបើអ្នកសរសេរ dbContext.Orders.ToList().Where(o => o.Total > 100) ក្នុង EF Core?',
          options: [
            'EF Core នៅតែដំណើរការ WHERE ក្នុង SQL ដោយស្វ័យប្រវត្តិ',
            'វាទាញតារាង Orders ទាំងមូលចូលអង្គចងចាំ server សិន រួចទើបត្រងក្នុង C#',
            'វាបង្កកំហុសពេល compile',
            'វាត្រឡប់តែ 100 ជួរដំបូង',
          ],
          answer: 1,
          explanation:
            'ការហៅ ToList() ដំណើរការ SELECT * FROM Orders ភ្លាមៗ ទាញគ្រប់ជួរចូល RAM។ ត្រូវហៅ .Where() លើ IQueryable<T> មុន ToList() ឬ ToListAsync() ជានិច្ច។',
        },
      ],
    },
  },

  'csharp/async-await-dotnet': {
    en: {
      duration: '14 min',
      objectives: [
        'Prevent deadlocks and thread-pool starvation by going async all the way down',
        'Propagate CancellationToken through HTTP, database, and delay operations cleanly',
        'Bound concurrent async workloads safely using Parallel.ForEachAsync or SemaphoreSlim',
        'Avoid async void crashes and handle exceptions properly across Task.WhenAll',
      ],
      extraSections: [
        {
          id: 'deadlocks-and-cancellation',
          heading: 'Preventing .Result Deadlocks & Cooperative Cancellation',
          body: [
            'In .NET, async/await is designed for non-blocking I/O—releasing the worker thread back to the thread pool while waiting on sockets or disk. Calling .Result or .Wait() defeats that entire mechanism: it synchronously blocks a thread waiting for a Task that may need that very same synchronization context to finish, causing a permanent deadlock in desktop/UI apps and thread-pool starvation under ASP.NET Core load.',
            'Every production async method should accept a CancellationToken (defaulting to default) and forward it downstream. When an HTTP client disconnects or a timeout elapses via CancellationTokenSource(TimeSpan.FromSeconds(2)), cooperative cancellation aborts work immediately instead of wasting database and CPU capacity.',
          ],
          points: [
            'Go "async all the way"—never block on async code with .Result, .Wait(), or .GetAwaiter().GetResult().',
            'Never write async void outside UI event handlers—exceptions in async void bypass try/catch and crash the process.',
            'Accept CancellationToken ct = default in async methods and pass it to HttpClient, EF Core, and Task.Delay.',
            'Use Task.WhenAll for concurrent independent I/O, and Task.WhenAny for timeouts or fastest-mirror racing.',
          ],
          table: {
            headers: ['Async Tool / Pattern', 'Purpose', 'Production Note'],
            rows: [
              [
                'await task',
                'Suspend method without blocking thread',
                'Always prefer over .Result / .Wait()',
              ],
              [
                'Task.WhenAll(tasks)',
                'Run independent I/O concurrently',
                'Bound concurrency for large lists',
              ],
              [
                'Task.WhenAny(tasks)',
                'React to whichever task finishes first',
                'Cancel losing tasks with a CancellationToken',
              ],
              [
                'CancellationToken',
                'Cooperative cancellation & timeouts',
                'Forward to every downstream async API',
              ],
              [
                'IAsyncEnumerable<T>',
                'Stream async results one by one',
                'Consume with await foreach (...)',
              ],
            ],
          },
          example: {
            title: 'Timeouts with CancellationTokenSource & Bounded Parallelism',
            language: 'csharp',
            code: `using System.Collections.Concurrent;

static async Task<string> FetchEndpointAsync(string path, CancellationToken ct)
{
    await Task.Delay(60, ct); // Simulates non-blocking HTTP call
    return $"200:{path}";
}

using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(2));
var endpoints = new[] { "/users", "/orders", "/billing", "/inventory" };
var results = new ConcurrentBag<string>();

await Parallel.ForEachAsync(
    endpoints,
    new ParallelOptions { MaxDegreeOfParallelism = 2, CancellationToken = cts.Token },
    async (path, token) => results.Add(await FetchEndpointAsync(path, token))
);

Console.WriteLine($"Completed {results.Count} requests with max concurrency 2.");`,
            output: `Completed 4 requests with max concurrency 2.`,
          },
          warning:
            'Calling .Result or .Wait() on an incomplete Task causes classic deadlocks in UI/SynchronizationContext apps and severe thread-pool starvation in ASP.NET Core APIs. Equally dangerous is async void: any exception thrown inside it cannot be caught by callers and crashes the entire .NET process.',
        },
        {
          id: 'throughput-and-throttling',
          heading: 'Bounded Concurrency, SemaphoreSlim & ValueTask',
          body: [
            'Passing 5,000 URLs directly into Task.WhenAll fires 5,000 simultaneous network calls at once—exhausting sockets, tripping rate limits, and knocking over downstream databases. Use Parallel.ForEachAsync (with MaxDegreeOfParallelism) or SemaphoreSlim to cap how many operations run in flight at any instant.',
            'For reusable NuGet libraries that do not touch UI controls, library authors call .ConfigureAwait(false) to avoid unnecessary context captures. In hot paths where a method usually returns synchronously from cache, ValueTask<T> avoids allocating a Task object on every cache hit—though you must never await a ValueTask<T> twice.',
          ],
          points: [
            'Bound fan-out concurrency with Parallel.ForEachAsync or SemaphoreSlim instead of unbounded Task.WhenAll.',
            'Use OperationCanceledException handling to distinguish normal client aborts from true 500 server errors.',
            'Avoid Task.Run() inside ASP.NET Core controllers for I/O—it just steals another thread-pool thread.',
            'Never await a ValueTask<T> more than once or call .GetAwaiter().GetResult() before it completes.',
          ],
          tip: 'When a method only returns a single inner Task with no try/catch or using block around it, you can keep async/await anyway in most business code—the tiny state-machine cost buys far clearer exception stack traces.',
        },
      ],
      challenge: {
        prompt:
          'Write an async C# method static async Task<List<string>> FetchAllLimitedAsync(IEnumerable<string> items, int maxConcurrency, CancellationToken ct) using SemaphoreSlim that processes each item with an async delay (simulating I/O), guarantees semaphore release in finally, and preserves order.',
        hint: 'Create tasks with items.Select(async item => { await gate.WaitAsync(ct); try { ... } finally { gate.Release(); } }) and await Task.WhenAll(tasks).',
        language: 'csharp',
        solutionCode: `static async Task<string[]> FetchAllLimitedAsync(
    IEnumerable<string> items,
    int maxConcurrency,
    CancellationToken ct = default)
{
    using var gate = new SemaphoreSlim(maxConcurrency);
    var tasks = items.Select(async item =>
    {
        await gate.WaitAsync(ct);
        try
        {
            await Task.Delay(40, ct);
            return $"OK:{item}";
        }
        finally
        {
            gate.Release();
        }
    });
    return await Task.WhenAll(tasks);
}

var output = await FetchAllLimitedAsync(new[] { "A", "B", "C", "D" }, maxConcurrency: 2);
Console.WriteLine(string.Join(", ", output));`,
      },
      quiz: [
        {
          question:
            'Why should you avoid calling task.Result or task.Wait() inside C# applications?',
          options: [
            'They only work on .NET Framework 4',
            'They synchronously block the calling thread, risking deadlocks and ASP.NET Core thread-pool starvation',
            'They cancel the underlying Task automatically',
            'They convert the Task return value to null',
          ],
          answer: 1,
          explanation:
            'Blocking a thread with .Result or .Wait() prevents it from handling other work and causes deadlocks when the awaited continuation requires the blocked SynchronizationContext.',
        },
        {
          question:
            'Why is async void dangerous for regular C# methods (outside UI event handlers)?',
          options: [
            'It cannot use the await keyword inside the body',
            'Callers cannot await it, and any unhandled exception escapes directly to crash the process',
            'It runs 100x slower than async Task',
            'It prevents CancellationToken from compiling',
          ],
          answer: 1,
          explanation:
            'Because async void returns no Task object, callers cannot track completion or catch exceptions with try/catch—unhandled exceptions propagate to the SynchronizationContext/ThreadPool and terminate the process.',
        },
      ],
    },
    km: {
      duration: '14 នាទី',
      objectives: [
        'ការពារ deadlocks និង thread-pool starvation ដោយប្រើ async ពេញខ្សែសង្វាក់',
        'បញ្ជូនបន្ត CancellationToken ទៅគ្រប់ប្រតិបត្តិការ HTTP, database និង delay',
        'កំណត់ដែនចំនួនកិច្ចការ async ស្របគ្នាដោយសុវត្ថិភាពជាមួយ Parallel.ForEachAsync ឬ SemaphoreSlim',
        'ជៀសវាងការគាំងកម្មវិធីពី async void និងដោះស្រាយ exception លើ Task.WhenAll',
      ],
      extraSections: [
        {
          id: 'deadlocks-and-cancellation',
          heading: 'ការជៀសវាង .Result Deadlocks និងការបញ្ជូន CancellationToken',
          body: [
            'ក្នុង .NET ប្រព័ន្ធ async/await ត្រូវបានរចនាសម្រាប់ non-blocking I/O ដើម្បីដោះលែង thread ត្រឡប់ទៅ thread pool ខណៈពេលរង់ចាំបណ្ដាញ ឬថាសរឹង។ ការហៅ .Result ឬ .Wait() បំផ្លាញយន្តការនេះទាំងស្រុង ដោយបង្កក thread រង់ចាំ រហូតបង្ក deadlock ក្នុងកម្មវិធី UI ឬធ្វើឱ្យ ASP.NET Core ខ្វះ thread ក្រោមបន្ទុកខ្ពស់។',
            'រាល់ async method ក្នុងប្រព័ន្ធពិតគួរទទួល CancellationToken (លំនាំដើម default) ហើយបញ្ជូនវាបន្ត។ ពេលអ្នកប្រើបិទ browser ឬផុត timeout ពី CancellationTokenSource ការងារនឹងឈប់ភ្លាមៗដោយមិនខ្ជះខ្ជាយ CPU ឬ database ឡើយ។',
          ],
          points: [
            'ប្រើ "async ពេញខ្សែសង្វាក់" — កុំបង្កក thread ដោយ .Result, .Wait() ឬ .GetAwaiter().GetResult()។',
            'កុំសរសេរ async void ក្រៅពី UI event handlers ព្រោះកំហុសក្នុង async void មិនអាច catch បានហើយធ្វើឱ្យកម្មវិធីគាំងទាំងមូល។',
            'ទទួល CancellationToken ct = default ក្នុង async methods ហើយបញ្ជូនបន្តទៅ HttpClient, EF Core និង Task.Delay។',
            'ប្រើ Task.WhenAll សម្រាប់ I/O ឯករាជ្យស្របគ្នា និង Task.WhenAny សម្រាប់ការប្រណាំងលឿនបំផុត ឬ timeout។',
          ],
          table: {
            headers: ['ឧបករណ៍ / គំរូ Async', 'គោលបំណង', 'ចំណាំសម្រាប់ប្រព័ន្ធពិត'],
            rows: [
              [
                'await task',
                'ផ្អាកអនុគមន៍ដោយមិនបង្កក thread',
                'ប្រើជំនួស .Result / .Wait() ជានិច្ច',
              ],
              [
                'Task.WhenAll(tasks)',
                'ដំណើរការ I/O ឯករាជ្យព្រមគ្នា',
                'កំណត់ដែនស្របគ្នាសម្រាប់បញ្ជីធំៗ',
              ],
              [
                'Task.WhenAny(tasks)',
                'ឆ្លើយតបនឹង task ដែលចប់មុនគេ',
                'បោះបង់ task ដែលនៅសល់ដោយ CancellationToken',
              ],
              [
                'CancellationToken',
                'បញ្ឈប់កិច្ចការ និងកំណត់ timeout',
                'បញ្ជូនបន្តទៅគ្រប់ async API ខាងក្រោម',
              ],
              [
                'IAsyncEnumerable<T>',
                'បញ្ជូនទិន្នន័យ async ម្ដងមួយៗ',
                'អានដោយ await foreach (...)',
              ],
            ],
          },
          exampleTitle: 'Timeout ជាមួយ CancellationTokenSource និង Parallel.ForEachAsync',
          warning:
            'ការហៅ .Result ឬ .Wait() លើ Task ដែលមិនទាន់ចប់ បង្ក deadlock ក្នុងកម្មវិធី UI និងធ្វើឱ្យខ្វះ thread ក្នុង ASP.NET Core។ ដូចគ្នានេះដែរ async void គ្រោះថ្នាក់ខ្លាំងព្រោះ exception ដែលមិនបាន catch នឹងបិទកម្មវិធី .NET ទាំងមូលភ្លាមៗ។',
        },
        {
          id: 'throughput-and-throttling',
          heading: 'ការកំណត់ដែនស្របគ្នា SemaphoreSlim និង ValueTask',
          body: [
            'ការបញ្ជូន URL 5,000 ចូល Task.WhenAll ម្ដងទាំងអស់នឹងបាញ់សំណើបណ្ដាញ 5,000 ព្រមគ្នា ធ្វើឱ្យអស់ socket និងបង្កការគាំងដល់ database ឬ API ខាងក្រៅ។ ត្រូវប្រើ Parallel.ForEachAsync (ជាមួយ MaxDegreeOfParallelism) ឬ SemaphoreSlim ដើម្បីកំណត់ចំនួនសំណើអតិបរមាដែលដំណើរការព្រមគ្នា។',
            'សម្រាប់ library ដែលមិនប៉ះ UI អ្នកអភិវឌ្ឍប្រើ .ConfigureAwait(false) ដើម្បីជៀសវាងការចាប់ context មិនចាំបាច់។ ក្នុងកូដដែលភាគច្រើនត្រឡប់តម្លៃភ្លាមពី cache ប្រភេទ ValueTask<T> ជួយសន្សំអង្គចងចាំ ប៉ុន្តែហាម await លើ ValueTask<T> តែមួយលើសពីម្ដង។',
          ],
          points: [
            'កំណត់ដែនចំនួនកិច្ចការស្របគ្នាដោយ Parallel.ForEachAsync ឬ SemaphoreSlim ជំនួស Task.WhenAll គ្មានដែនកំណត់។',
            'ចាប់ OperationCanceledException ដាច់ដោយឡែក ដើម្បីបែងចែកការបោះបង់របស់ client ពីកំហុស server 500។',
            'ជៀសវាងការហៅ Task.Run() សម្រាប់ I/O ក្នុង ASP.NET Core controllers ព្រោះវាខ្ជះខ្ជាយ thread។',
            'ហាម await លើ ValueTask<T> លើសពីម្ដង ឬហៅ .GetAwaiter().GetResult() មុនវាចប់។',
          ],
          tip: 'សម្រាប់កូដអាជីវកម្មទូទៅ ការរក្សា async/await ទោះបីគ្រាន់តែ return task មួយក៏ដោយ ផ្ដល់ stack trace ច្បាស់លាស់ជាងពេលមាន exception កើតឡើង។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ async C# method static async Task<string[]> FetchAllLimitedAsync(IEnumerable<string> items, int maxConcurrency, CancellationToken ct) ដោយប្រើ SemaphoreSlim ដើម្បីកំណត់ចំនួនដំណើរការព្រមគ្នា ធានាការហៅ gate.Release() ក្នុង finally និងរក្សាលំដាប់លទ្ធផល។',
        hint: 'បង្កើត tasks ដោយ items.Select(async item => { await gate.WaitAsync(ct); try { ... } finally { gate.Release(); } }) រួច await Task.WhenAll(tasks)។',
      },
      quiz: [
        {
          question: 'ហេតុអ្វីគួរជៀសវាងការហៅ task.Result ឬ task.Wait() ក្នុងកម្មវិធី C#?',
          options: [
            'វាប្រើបានតែលើ .NET Framework 4',
            'វាបង្កក thread ដែលហៅ បង្កហានិភ័យ deadlock និងខ្វះ thread ក្នុង ASP.NET Core',
            'វាបោះបង់ Task ដោយស្វ័យប្រវត្តិ',
            'វាបម្លែងលទ្ធផល Task ទៅជា null',
          ],
          answer: 1,
          explanation:
            'ការបង្កក thread ដោយ .Result ឬ .Wait() រារាំងវាមិនឱ្យធ្វើការងារផ្សេង និងបង្ក deadlock ពេល continuation ត្រូវការ SynchronizationContext ដែលកំពុងជាប់គាំង។',
        },
        {
          question:
            'ហេតុអ្វី async void គ្រោះថ្នាក់សម្រាប់អនុគមន៍ C# ទូទៅ (ក្រៅពី UI event handlers)?',
          options: [
            'វាមិនអាចប្រើ await ខាងក្នុងបានទេ',
            'អ្នកហៅមិនអាច await វាបាន ហើយកំហុសដែលមិនបាន catch នឹងធ្វើឱ្យកម្មវិធីគាំងទាំងមូល',
            'វាដំណើរការយឺតជាង async Task 100 ដង',
            'វាមិនអនុញ្ញាតឱ្យប្រើ CancellationToken',
          ],
          answer: 1,
          explanation:
            'ដោយសារ async void មិនត្រឡប់ Task អ្នកហៅមិនអាចតាមដាន ឬ catch exception បានទេ — កំហុសនឹងបញ្ចប់ដំណើរការ process ទាំងមូល។',
        },
      ],
    },
  },

  'csharp/csharp-di-and-apis': {
    en: {
      duration: '15 min',
      objectives: [
        'Choose correctly among Transient, Scoped, and Singleton DI service lifetimes in ASP.NET Core',
        'Prevent captive dependency bugs and socket exhaustion with ValidateScopes and IHttpClientFactory',
        'Build strongly typed ASP.NET Core Minimal APIs with TypedResults and RFC 9457 ProblemDetails',
        'Organize HTTP routes cleanly with MapGroup, validation, and CancellationToken propagation',
      ],
      extraSections: [
        {
          id: 'di-service-lifetimes',
          heading: 'DI Service Lifetimes & Captive Dependencies',
          body: [
            'ASP.NET Core’s built-in Dependency Injection container manages object creation and disposal automatically using three lifetimes: Transient (new instance every time it is requested), Scoped (one instance per HTTP request—the standard lifetime for EF Core DbContext and unit-of-work repositories), and Singleton (one instance shared for the entire application lifetime).',
            'The #1 DI bug in production .NET apps is a captive dependency: injecting a Scoped service (such as DbContext) into a Singleton service. Because the Singleton lives forever, it traps the Scoped instance permanently, leaking memory and causing thread-safety crashes when concurrent requests hit the same DbContext.',
          ],
          points: [
            'Register EF Core DbContext and database repositories as Scoped (never Singleton).',
            'Register thread-safe caches, configuration options, and stateless formatters as Singleton.',
            'Register lightweight, stateless helpers or validators as Transient.',
            'Enable ValidateScopes and ValidateOnBuild in Program.cs so miswired lifetimes fail fast at startup.',
          ],
          table: {
            headers: ['Lifetime', 'Instance Created', 'Typical Services', 'Main Risk'],
            rows: [
              [
                'Transient',
                'Every injection',
                'Lightweight stateless helpers, validators',
                'Allocates frequently; do not hold shared state',
              ],
              [
                'Scoped',
                'Once per HTTP request',
                'EF Core DbContext, repositories, user context',
                'Never inject into a Singleton (captive dependency)',
              ],
              [
                'Singleton',
                'Once per app lifetime',
                'IMemoryCache, config, stateless clients',
                'Must be 100% thread-safe for concurrent requests',
              ],
            ],
          },
          warning:
            'Injecting a Scoped DbContext into a Singleton service creates a captive dependency that crashes under concurrent traffic. Also never instantiate new HttpClient() per request inside a using block—it exhausts OS sockets in TIME_WAIT; always register typed clients with builder.Services.AddHttpClient<T>().',
        },
        {
          id: 'minimal-apis-problem-details',
          heading: 'Typed Minimal APIs, MapGroup & ProblemDetails',
          body: [
            'ASP.NET Core Minimal APIs combine high throughput with clean, low-ceremony routing. Group related endpoints under app.MapGroup("/api/orders") so prefixes, authorization, and filters apply consistently in one place.',
            'Prefer TypedResults (Results<Ok<OrderDto>, NotFound, ValidationProblem>) over untyped IResult: the compiler verifies every branch matches your OpenAPI contract, and returning RFC 9457 ProblemDetails (builder.Services.AddProblemDetails()) ensures every client receives consistent, machine-readable error payloads.',
          ],
          points: [
            'Use TypedResults so endpoints are self-documenting for Swagger/OpenAPI and easy to unit test directly.',
            'Enable AddProblemDetails() and UseExceptionHandler() so unhandled exceptions never leak raw stack traces.',
            'Always inject CancellationToken into route handlers and forward it to async database/HTTP calls.',
            'Use AddHttpClient<TPaymentClient>() to pool HttpMessageHandlers cleanly and avoid DNS/socket bugs.',
          ],
          example: {
            title: 'Grouped Minimal API with Scoped Repo & TypedResults',
            language: 'csharp',
            code: `using Microsoft.AspNetCore.Http.HttpResults;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddProblemDetails();
builder.Services.AddScoped<ITaskRepo, InMemoryTaskRepo>();

var app = builder.Build();
app.UseExceptionHandler();

var tasks = app.MapGroup("/api/tasks");
tasks.MapGet("/{id:int}", async Task<Results<Ok<TaskItem>, NotFound>> (
    int id, ITaskRepo repo, CancellationToken ct) =>
{
    var item = await repo.FindAsync(id, ct);
    return item is not null ? TypedResults.Ok(item) : TypedResults.NotFound();
});

app.Run();

record TaskItem(int Id, string Title);
interface ITaskRepo { Task<TaskItem?> FindAsync(int id, CancellationToken ct); }
class InMemoryTaskRepo : ITaskRepo
{
    public Task<TaskItem?> FindAsync(int id, CancellationToken ct) =>
        Task.FromResult(id == 1 ? new TaskItem(1, "Ship API") : null);
}`,
            output: `GET /api/tasks/1  -> 200 OK { "id": 1, "title": "Ship API" }
GET /api/tasks/99 -> 404 Not Found`,
          },
          tip: 'Unit test Minimal API handlers directly as plain C# methods—when handlers return TypedResults, you can assert on result.Result is Ok<TaskItem> without spinning up an HTTP server.',
        },
      ],
      challenge: {
        prompt:
          'Write a Minimal API POST /api/notes handler method accepting CreateNoteRequest(string Title), an INoteStore service, and CancellationToken ct. Return TypedResults.ValidationProblem if Title is blank, otherwise save via store.AddAsync and return TypedResults.Created($"/api/notes/{note.Id}", note).',
        hint: 'Use return type Task<Results<Created<Note>, ValidationProblem>> and Dictionary<string, string[]> for validation errors.',
        language: 'csharp',
        solutionCode: `using Microsoft.AspNetCore.Http.HttpResults;

record CreateNoteRequest(string? Title);
record Note(int Id, string Title);
interface INoteStore { Task<Note> AddAsync(string title, CancellationToken ct); }

static async Task<Results<Created<Note>, ValidationProblem>> CreateNoteHandler(
    CreateNoteRequest req,
    INoteStore store,
    CancellationToken ct)
{
    if (string.IsNullOrWhiteSpace(req.Title))
    {
        return TypedResults.ValidationProblem(new Dictionary<string, string[]>
        {
            ["title"] = ["Title is required."]
        });
    }

    var note = await store.AddAsync(req.Title.Trim(), ct);
    return TypedResults.Created($"/api/notes/{note.Id}", note);
}`,
      },
      quiz: [
        {
          question:
            'What happens if you inject a Scoped service (like EF Core DbContext) into a Singleton service in ASP.NET Core?',
          options: [
            'ASP.NET Core creates a fresh DbContext automatically on every method call',
            'It causes a captive dependency bug: the Scoped service lives forever inside the Singleton and fails under concurrent requests',
            'The Singleton automatically downgrades to Transient',
            'Nothing—Scoped and Singleton behave identically',
          ],
          answer: 1,
          explanation:
            'A Singleton is constructed once for the app lifetime, trapping any Scoped dependency inside it forever. In Development, ASP.NET Core’s ValidateScopes throws an InvalidOperationException at startup to prevent this bug.',
        },
        {
          question:
            'Why should .NET backends use IHttpClientFactory (AddHttpClient) instead of creating new HttpClient() inside each request?',
          options: [
            'HttpClient does not support HTTPS without IHttpClientFactory',
            'Repeatedly creating and disposing HttpClient exhausts OS sockets in TIME_WAIT; IHttpClientFactory pools handlers and respects DNS changes',
            'new HttpClient() only supports GET requests',
            'IHttpClientFactory disables async/await overhead',
          ],
          answer: 1,
          explanation:
            'Disposing HttpClient leaves underlying TCP sockets in TIME_WAIT, leading to SocketException under load. IHttpClientFactory pools and rotates HttpMessageHandler instances safely.',
        },
      ],
    },
    km: {
      duration: '15 នាទី',
      objectives: [
        'ជ្រើសរើស DI service lifetimes ឱ្យត្រឹមត្រូវរវាង Transient, Scoped និង Singleton ក្នុង ASP.NET Core',
        'ការពារកំហុស captive dependency និងការអស់ socket ជាមួយ ValidateScopes និង IHttpClientFactory',
        'បង្កើត ASP.NET Core Minimal APIs មានប្រភេទច្បាស់ជាមួយ TypedResults និង ProblemDetails (RFC 9457)',
        'រៀបចំផ្លូវ HTTP ឱ្យស្អាតជាមួយ MapGroup ការផ្ទៀងផ្ទាត់ និងការបញ្ជូន CancellationToken',
      ],
      extraSections: [
        {
          id: 'di-service-lifetimes',
          heading: 'DI Service Lifetimes និងបញ្ហា Captive Dependencies',
          body: [
            'ប្រព័ន្ធ Dependency Injection របស់ ASP.NET Core គ្រប់គ្រងវដ្ដជីវិត object តាម ៣ កម្រិត៖ Transient (បង្កើតថ្មីរាល់ពេលស្នើ), Scoped (បង្កើតម្ដងក្នុងមួយសំណើ HTTP — ជាស្តង់ដារសម្រាប់ EF Core DbContext និង repositories) និង Singleton (បង្កើតតែម្ដងប្រើពេញអាយុកាលកម្មវិធី)។',
            'កំហុស DI លេខ ១ ក្នុងប្រព័ន្ធ .NET ពិតប្រាកដគឺ captive dependency៖ ការបញ្ចូល Scoped service (ដូច DbContext) ទៅក្នុង Singleton service។ ដោយសារ Singleton រស់រហូត វាចាប់ Scoped ទុកជារៀងរហូត បង្កការលេចធ្លាយអង្គចងចាំ និងកំហុស thread-safety ពេលមានសំណើច្រើនព្រមគ្នា។',
          ],
          points: [
            'ចុះឈ្មោះ EF Core DbContext និង database repositories ជា Scoped (ហាមដាក់ Singleton)។',
            'ចុះឈ្មោះ cache ដែលមានសុវត្ថិភាព thread និងការកំណត់ config ជា Singleton។',
            'ចុះឈ្មោះ helper ស្រាលៗគ្មានស្ថានភាព ឬ validators ជា Transient។',
            'បើក ValidateScopes និង ValidateOnBuild ដើម្បីចាប់កំហុសភ្ជាប់ lifetime ខុសភ្លាមពេលចាប់ផ្ដើម server។',
          ],
          table: {
            headers: ['Lifetime', 'ពេលបង្កើត Instance', 'សេវាកម្មទូទៅ', 'ហានិភ័យសំខាន់'],
            rows: [
              [
                'Transient',
                'រាល់ពេល inject',
                'Helpers ស្រាលគ្មានស្ថានភាព validators',
                'បង្កើត object ញឹកញាប់ មិនរក្សាស្ថានភាពរួម',
              ],
              [
                'Scoped',
                'ម្ដងក្នុងមួយសំណើ HTTP',
                'EF Core DbContext, repositories, user context',
                'ហាម inject ចូល Singleton (captive dependency)',
              ],
              [
                'Singleton',
                'ម្ដងពេញអាយុកាល app',
                'IMemoryCache, config, stateless clients',
                'ត្រូវមានសុវត្ថិភាព thread 100% សម្រាប់សំណើស្របគ្នា',
              ],
            ],
          },
          warning:
            'ការ inject Scoped DbContext ចូល Singleton បង្ក captive dependency ដែលធ្វើឱ្យ API គាំងក្រោមចរាចរណ៍ស្របគ្នា។ ម្យ៉ាងទៀត កុំបង្កើត new HttpClient() រាល់សំណើ — វាធ្វើឱ្យអស់ OS sockets (TIME_WAIT) ត្រូវប្រើ builder.Services.AddHttpClient<T>() ជានិច្ច។',
        },
        {
          id: 'minimal-apis-problem-details',
          heading: 'Typed Minimal APIs, MapGroup និង ProblemDetails',
          body: [
            'ASP.NET Core Minimal APIs ផ្ដល់ល្បឿនខ្ពស់ និងកូដខ្លីស្អាត។ ផ្ដុំផ្លូវដែលពាក់ព័ន្ធក្រោម app.MapGroup("/api/orders") ដើម្បីអនុវត្ត prefix, សិទ្ធិចូលប្រើ និង filters នៅកន្លែងតែមួយ។',
            'គួរប្រើ TypedResults (Results<Ok<OrderDto>, NotFound, ValidationProblem>) ជំនួស IResult ធម្មតា ដើម្បីឱ្យ compiler ផ្ទៀងផ្ទាត់ OpenAPI ហើយបើក AddProblemDetails() (RFC 9457) ដើម្បីឱ្យសារកំហុសទាំងអស់មានទម្រង់ JSON ស្តង់ដារដូចគ្នា។',
          ],
          points: [
            'ប្រើ TypedResults ដើម្បីបង្កើតឯកសារ Swagger/OpenAPI ត្រឹមត្រូវ និងងាយសរសេរ unit tests ផ្ទាល់។',
            'បើក AddProblemDetails() និង UseExceptionHandler() ដើម្បីកុំឱ្យលេចធ្លាយ stack trace ទៅអ្នកប្រើ។',
            'បញ្ជូន CancellationToken ក្នុងគ្រប់ route handler ហើយបន្តវាទៅ database និង HTTP calls។',
            'ប្រើ AddHttpClient<T>() ដើម្បីគ្រប់គ្រង connection pool និង DNS rotation ដោយសុវត្ថិភាព។',
          ],
          exampleTitle: 'Minimal API ប្រើ MapGroup, Scoped Repo និង TypedResults',
          tip: 'អ្នកអាចធ្វើ unit test លើ Minimal API handler ដូចអនុគមន៍ C# ធម្មតាដោយផ្ទាល់ (ពិនិត្យ result.Result is Ok<TaskItem>) ដោយមិនចាំបាច់បើក HTTP server ឡើយ។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ Minimal API handler សម្រាប់ POST /api/notes ដែលទទួល CreateNoteRequest(string? Title), INoteStore និង CancellationToken ct។ ត្រឡប់ TypedResults.ValidationProblem បើ Title ទទេ បើមិនដូច្នោះទេរក្សាទុកតាម store.AddAsync រួចត្រឡប់ TypedResults.Created($"/api/notes/{note.Id}", note)។',
        hint: 'ប្រើប្រភេទត្រឡប់ Task<Results<Created<Note>, ValidationProblem>> និង Dictionary<string, string[]> សម្រាប់កំហុស validation។',
      },
      quiz: [
        {
          question:
            'តើមានអ្វីកើតឡើងប្រសិនបើអ្នក inject Scoped service (ដូច EF Core DbContext) ចូល Singleton service ក្នុង ASP.NET Core?',
          options: [
            'ASP.NET Core បង្កើត DbContext ថ្មីរាល់ពេលហៅអនុគមន៍',
            'បង្កកំហុស captive dependency៖ Scoped service ជាប់រហូតក្នុង Singleton ហើយគាំងពេលមានសំណើស្របគ្នា',
            'Singleton ធ្លាក់កម្រិតទៅ Transient ដោយស្វ័យប្រវត្តិ',
            'គ្មានបញ្ហាទេ Scoped និង Singleton ដូចគ្នា',
          ],
          answer: 1,
          explanation:
            'Singleton បង្កើតតែម្ដងពេញអាយុកាល app ធ្វើឱ្យ Scoped dependency ជាប់នៅខាងក្នុងជារៀងរហូត។ ValidateScopes ក្នុង Development នឹងបោះកំហុសភ្លាមពេលបើក app ដើម្បីការពារបញ្ហានេះ។',
        },
        {
          question:
            'ហេតុអ្វី backend .NET គួរប្រើ IHttpClientFactory (AddHttpClient) ជំនួសការបង្កើត new HttpClient() ក្នុងរាល់សំណើ?',
          options: [
            'HttpClient មិនគាំទ្រ HTTPS បើគ្មាន IHttpClientFactory',
            'ការបង្កើត និង dispose HttpClient ញឹកញាប់ធ្វើឱ្យអស់ OS sockets (TIME_WAIT) ចំណែក IHttpClientFactory ប្រើឡើងវិញ handler ដោយសុវត្ថិភាព',
            'new HttpClient() គាំទ្រតែ GET requests',
            'IHttpClientFactory បិទ async/await',
          ],
          answer: 1,
          explanation:
            'ការ dispose HttpClient ទុក TCP sockets ក្នុងស្ថានភាព TIME_WAIT ដែលបង្ក SocketException ក្រោមបន្ទុកខ្ពស់។ IHttpClientFactory គ្រប់គ្រង pool និងប្ដូរ HttpMessageHandler ដោយស្វ័យប្រវត្តិ។',
        },
      ],
    },
  },

  // =========================================================================
  // SOFTWARE ENGINEERING (6 lessons)
  // =========================================================================
  'software-engineering/how-software-is-built': {
    en: {
      duration: '10 min',
      objectives: [
        'Understand how Local, CI, Staging, and Production environments protect users from broken releases',
        'Design automated CI/CD quality gates (lint, tests, build, deploy) before merging code',
        'Deliver features as small vertical slices instead of risky big-bang releases',
        'Use logs, metrics, and traces (observability) to keep production software healthy',
      ],
      extraSections: [
        {
          id: 'environments-and-ci-cd',
          heading: 'Environments & Automated CI/CD Pipelines',
          body: [
            'Modern engineering teams never upload code manually from a laptop straight to real users. Instead, every change flows through isolated environments: Local (fast iteration on your machine), CI (automated linting, tests, and builds on every Pull Request), Staging (a production-like mirror for final verification), and Production (live customer traffic).',
            'Continuous Integration (CI) runs your automated checks on every commit so regressions are caught within minutes. Continuous Delivery/Deployment (CD) packages the exact same verified build artifact and rolls it out safely with quick rollback capability if error rates spike.',
          ],
          points: [
            'Build once and promote the exact same immutable artifact from Staging to Production.',
            'Treat broken builds on main as top priority—never merge with failing required checks.',
            'Keep environment-specific secrets and URLs in environment variables, never hardcoded in source.',
            'Use feature flags or canary rollouts (5% -> 25% -> 100%) to limit blast radius on risky launches.',
          ],
          table: {
            headers: ['Environment', 'Purpose', 'Data Source', 'Triggered By'],
            rows: [
              [
                'Local',
                'Rapid coding & unit testing',
                'Seeded / mocked data',
                'Developer saving & running locally',
              ],
              [
                'CI',
                'Automated lint, tests & build gate',
                'Ephemeral test DBs',
                'Every git push & Pull Request',
              ],
              [
                'Staging',
                'Pre-release QA & integration checks',
                'Anonymized prod-like data',
                'Merge to main / release branch',
              ],
              [
                'Production',
                'Serving real end users reliably',
                'Live customer database',
                'Approved release / CD pipeline',
              ],
            ],
          },
          example: {
            title: 'Interactive CI/CD Release Gate Simulator',
            language: 'javascript',
            code: `function evaluatePipeline(checks) {
  const blockers = checks.filter((c) => c.required && !c.passed).map((c) => c.name);
  return {
    canDeploy: blockers.length === 0,
    blockers,
  };
}

console.log(evaluatePipeline([
  { name: 'ESLint', required: true, passed: true },
  { name: 'Unit Tests', required: true, passed: false },
  { name: 'Bundle Report', required: false, passed: false },
]));`,
            output: `{ canDeploy: false, blockers: ['Unit Tests'] }`,
            playground: {
              html: `<div class="wrap">
  <h2>CI/CD Release Gate Simulator</h2>
  <div id="checks"></div>
  <p id="verdict"></p>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.wrap { max-width: 420px; }
h2 { margin: 0 0 12px; font-size: 17px; }
label { display: flex; align-items: center; gap: 8px; padding: 6px 0; font-size: 14px; cursor: pointer; }
.tag { font-size: 11px; padding: 2px 6px; border-radius: 999px; background: #e4e4e7; }
#verdict { margin-top: 14px; font-weight: 600; font-size: 14px; padding: 10px 12px; border-radius: 8px; }`,
              js: `const checks = [
  { name: 'Lint & Format', required: true, passed: true },
  { name: 'Unit Tests', required: true, passed: true },
  { name: 'Production Build', required: true, passed: true },
  { name: 'Docs Spellcheck', required: false, passed: false }
];
const box = document.getElementById('checks');
const verdict = document.getElementById('verdict');

function render() {
  const blockers = checks.filter((c) => c.required && !c.passed).map((c) => c.name);
  if (blockers.length === 0) {
    verdict.textContent = 'READY TO DEPLOY: All required CI gates passed.';
    verdict.style.background = '#ecfdf5';
    verdict.style.color = '#065f46';
  } else {
    verdict.textContent = 'DEPLOY BLOCKED by: ' + blockers.join(', ');
    verdict.style.background = '#fef2f2';
    verdict.style.color = '#991b1b';
  }
}

checks.forEach((c) => {
  const label = document.createElement('label');
  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.checked = c.passed;
  cb.addEventListener('change', () => { c.passed = cb.checked; render(); });
  label.append(cb, document.createTextNode(c.name + ' '));
  const tag = document.createElement('span');
  tag.className = 'tag';
  tag.textContent = c.required ? 'required' : 'optional';
  label.append(tag);
  box.append(label);
});
render();`,
            },
          },
          warning:
            'Deploying directly from a developer laptop ("it works on my machine") without reproducible CI builds and automated tests leads to missing dependencies, unreviewed code, and stressful production outages.',
        },
        {
          id: 'requirements-and-observability',
          heading: 'Small Vertical Slices & Production Observability',
          body: [
            'One of the biggest differences between junior and senior engineers is scope management. Instead of building the entire database layer for 3 weeks before testing a single screen, ship thin vertical slices—a tiny working feature end-to-end (UI -> API -> DB -> test)—so stakeholders give feedback early and integration surprises disappear.',
            'Once software is live, you need observability to know if it is actually working: structured Logs (what happened on a specific request), Metrics (request rate, error rate, p95 latency), and Traces (how a single request flowed across services). When incidents happen, run blameless postmortems focused on strengthening systems, not blaming individuals.',
          ],
          points: [
            'Write a short 5-line design note (inputs, outputs, edge cases, verification plan) before coding.',
            'Deliver small vertical slices that can be reviewed, tested, and deployed safely in 1–2 days.',
            'Track the "Four Golden Signals": Latency, Traffic, Errors, and Saturation.',
            'Use blameless postmortems to turn every outage into concrete tests, alerts, or guardrails.',
          ],
          tip: 'Before closing a ticket, ask yourself: "If this breaks at 2 AM next month, will our logs and error messages tell an on-call engineer exactly why it failed?"',
        },
      ],
      challenge: {
        prompt:
          'Write a JavaScript function evaluateRelease(checks) that receives an array of { name, required, passed } objects and returns { canDeploy, blockers, warnings }, where blockers lists failed required checks and warnings lists failed optional checks.',
        hint: 'Use .filter() and .map() twice—once for c.required && !c.passed, and once for !c.required && !c.passed.',
        language: 'javascript',
        solutionCode: `function evaluateRelease(checks) {
  const blockers = checks
    .filter((c) => c.required && !c.passed)
    .map((c) => c.name);
  const warnings = checks
    .filter((c) => !c.required && !c.passed)
    .map((c) => c.name);

  return {
    canDeploy: blockers.length === 0,
    blockers,
    warnings,
  };
}

console.log(evaluateRelease([
  { name: 'Unit Tests', required: true, passed: true },
  { name: 'Security Scan', required: true, passed: false },
  { name: 'Bundle Size', required: false, passed: false },
]));`,
      },
      quiz: [
        {
          question:
            'Why do engineering teams use a Staging environment before deploying to Production?',
          options: [
            'Staging replaces the need for automated unit tests',
            'Staging mirrors production configuration so teams can verify migrations, integrations, and builds before real users are affected',
            'Staging stores live customer credit cards permanently',
            'Staging allows developers to bypass Git version control',
          ],
          answer: 1,
          explanation:
            'Staging validates that the built artifact, environment config, database migrations, and service integrations work together safely before exposing changes to live customers.',
        },
        {
          question: 'What is a "vertical slice" in software delivery?',
          options: [
            'Building the entire database schema before writing any API or UI code',
            'A small, complete end-to-end increment of user value (UI, logic, data, and tests) that can ship independently',
            'Deploying only CSS changes once a year',
            'Assigning every developer to a separate programming language',
          ],
          answer: 1,
          explanation:
            'Vertical slices deliver working, testable functionality end-to-end in small increments, reducing integration risk and accelerating real user feedback.',
        },
      ],
    },
    km: {
      duration: '10 នាទី',
      objectives: [
        'យល់ពីតួនាទីរបស់បរិស្ថាន Local, CI, Staging និង Production ក្នុងការការពារអ្នកប្រើពីកំហុស',
        'រៀបចំ automated CI/CD quality gates (lint, tests, build, deploy) មុនពេល merge កូដ',
        'បំបែកមុខងារជា vertical slices តូចៗ ជំនួសការបញ្ចេញកូដធំម្ដងទាំងអស់ដែលមានហានិភ័យខ្ពស់',
        'ប្រើ logs, metrics និង traces (observability) ដើម្បីតាមដានសុខភាពប្រព័ន្ធពិត',
      ],
      extraSections: [
        {
          id: 'environments-and-ci-cd',
          heading: 'បរិស្ថានដំណើរការ និងប្រព័ន្ធ CI/CD ស្វ័យប្រវត្តិ',
          body: [
            'ក្រុមវិស្វកម្មសម័យទំនើបមិនដែលផ្ទុកកូដដោយដៃពីកុំព្យូទ័រយួរដៃផ្ទាល់ទៅអ្នកប្រើទេ។ កូដត្រូវឆ្លងកាត់បរិស្ថានដាច់ដោយឡែក៖ Local (សរសេរ និងតេស្តលឿនលើម៉ាស៊ីនផ្ទាល់), CI (រត់ lint, tests និង build ស្វ័យប្រវត្តិលើគ្រប់ Pull Request), Staging (បរិស្ថានស្រដៀងប្រព័ន្ធពិតសម្រាប់ផ្ទៀងផ្ទាត់ចុងក្រោយ) និង Production (សេវាកម្មពិតសម្រាប់អ្នកប្រើ)។',
            'Continuous Integration (CI) ដំណើរការការត្រួតពិនិត្យស្វ័យប្រវត្តិលើគ្រប់ commit ដើម្បីចាប់កំហុសក្នុងរយៈពេលប៉ុន្មាននាទី។ Continuous Delivery/Deployment (CD) យកកញ្ចប់ build ដែលបានផ្ទៀងផ្ទាត់ដូចគ្នាទៅដាក់ឱ្យដំណើរការដោយមានផ្លូវ rollback លឿនប្រសិនបើអត្រាកំហុសកើនឡើង។',
          ],
          points: [
            'Build តែម្ដង រួចបញ្ជូន artifact ដូចគ្នាពី Staging ទៅ Production ដោយមិន rebuild ឡើងវិញ។',
            'ចាត់ទុកការខូច build លើ main ជាអាទិភាពខ្ពស់បំផុត — កុំ merge កូដដែលជាប់កំហុស CI។',
            'រក្សា API keys និង URLs ក្នុង environment variables កុំសរសេរផ្ទាល់ក្នុងកូដ។',
            'ប្រើ feature flags ឬ canary rollouts (5% -> 25% -> 100%) ដើម្បីកាត់បន្ថយផលប៉ះពាល់ពេលបើកមុខងារថ្មី។',
          ],
          table: {
            headers: ['បរិស្ថាន', 'គោលបំណង', 'ប្រភពទិន្នន័យ', 'ពេលដំណើរការ'],
            rows: [
              [
                'Local',
                'សរសេរកូដ និងតេស្តលឿន',
                'ទិន្នន័យគំរូ / mock',
                'ពេលអ្នកអភិវឌ្ឍកែ និងរត់លើម៉ាស៊ីនផ្ទាល់',
              ],
              [
                'CI',
                'ត្រួតពិនិត្យ lint, tests និង build ស្វ័យប្រវត្តិ',
                'DB តេស្តបណ្ដោះអាសន្ន',
                'រាល់ git push និង Pull Request',
              ],
              [
                'Staging',
                'ផ្ទៀងផ្ទាត់ QA និង integration មុនបញ្ចេញ',
                'ទិន្នន័យស្រដៀង prod (លាក់ព័ត៌មានឯកជន)',
                'ពេល merge ចូល main ឬ release branch',
              ],
              [
                'Production',
                'បម្រើអ្នកប្រើប្រាស់ពិតប្រាកដ',
                'មូលដ្ឋានទិន្នន័យអតិថិជនពិត',
                'ពេលអនុម័ត release / CD pipeline',
              ],
            ],
          },
          exampleTitle: 'កម្មវិធីសាកល្បង CI/CD Release Gate អន្តរកម្ម',
          warning:
            'ការ deploy ផ្ទាល់ពីម៉ាស៊ីនអ្នកអភិវឌ្ឍ ("លើម៉ាស៊ីនខ្ញុំដើរធម្មតា") ដោយគ្មាន CI build និងតេស្តស្វ័យប្រវត្តិ តែងបង្កការខ្វះ dependency កូដមិនបានពិនិត្យ និងការដាច់សេវាកម្មក្នុង production។',
        },
        {
          id: 'requirements-and-observability',
          heading: 'Vertical Slices តូចៗ និង Production Observability',
          body: [
            'ភាពខុសគ្នាដ៏ធំមួយរវាងអ្នកចាប់ផ្ដើម និងវិស្វករជាន់ខ្ពស់គឺការគ្រប់គ្រងទំហំការងារ។ ជំនួសឱ្យការចំណាយ ៣ សប្ដាហ៍ធ្វើតែ database មុនតេស្តអេក្រង់ណាមួយ ត្រូវបញ្ចេញ vertical slices តូចៗ (UI -> API -> DB -> test) ដើម្បីទទួលមតិឆាប់រហ័ស និងកាត់បន្ថយបញ្ហាពេលភ្ជាប់ប្រព័ន្ធ។',
            'ពេលកម្មវិធីដំណើរការពិត អ្នកត្រូវការ observability ៣ សសរស្ដម្ភ៖ Logs (កំណត់ត្រាព្រឹត្តិការណ៍លម្អិត), Metrics (ចំនួនសំណើ អត្រាកំហុស ល្បឿន p95) និង Traces (ដំណើរសំណើឆ្លងកាត់សេវាកម្ម)។ ពេលមានបញ្ហា ត្រូវធ្វើ blameless postmortem ដើម្បីកែលម្អប្រព័ន្ធ មិនមែនបន្ទោសបុគ្គលឡើយ។',
          ],
          points: [
            'សរសេរកំណត់ចំណាំរចនាខ្លី ៥ បន្ទាត់ (ទិន្នន័យចូល ចេញ ករណីកំហុស និងវិធីតេស្ត) មុនសរសេរកូដ។',
            'បំបែកការងារជា vertical slices តូចៗដែលអាច review តេស្ត និង deploy បានក្នុង ១–២ ថ្ងៃ។',
            'តាមដានសញ្ញាមាសទាំង ៤៖ Latency, Traffic, Errors និង Saturation។',
            'ប្រើ blameless postmortems ដើម្បីបម្លែងរាល់បញ្ហាទៅជាតេស្ត ការជូនដំណឹង និងប្រព័ន្ធការពារថ្មី។',
          ],
          tip: 'មុនបិទកិច្ចការមួយ សួរខ្លួនឯងថា៖ "ប្រសិនបើកូដនេះខូចនៅម៉ោង ២ ទៀបភ្លឺខែក្រោយ តើ log និងសារកំហុសរបស់យើងប្រាប់វិស្វករច្បាស់ថាហេតុអ្វីវាខូចឬទេ?"',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ JavaScript evaluateRelease(checks) ដែលទទួល array នៃ { name, required, passed } ហើយត្រឡប់ { canDeploy, blockers, warnings } ដែល blockers ជាបញ្ជី required checks ដែលធ្លាក់ និង warnings ជា optional checks ដែលធ្លាក់។',
        hint: 'ប្រើ .filter() និង .map() ពីរដង — ម្ដងសម្រាប់ c.required && !c.passed និងម្ដងសម្រាប់ !c.required && !c.passed។',
      },
      quiz: [
        {
          question: 'ហេតុអ្វីក្រុមវិស្វកម្មប្រើបរិស្ថាន Staging មុនពេល deploy ទៅ Production?',
          options: [
            'Staging ជំនួសតម្រូវការសរសេរ unit tests ទាំងស្រុង',
            'Staging ដូច Production ដើម្បីឱ្យក្រុមផ្ទៀងផ្ទាត់ migrations, integrations និង build មុនប៉ះពាល់អ្នកប្រើពិត',
            'Staging រក្សាទុកទិន្នន័យកាតឥណទានអតិថិជនជាអចិន្ត្រៃយ៍',
            'Staging អនុញ្ញាតឱ្យរំលង Git version control',
          ],
          answer: 1,
          explanation:
            'Staging ផ្ទៀងផ្ទាត់ថា artifact, config, database migrations និងការភ្ជាប់សេវាកម្មដំណើរការជាមួយគ្នាដោយសុវត្ថិភាពមុនបញ្ចេញដល់អតិថិជនពិត។',
        },
        {
          question: 'តើ "vertical slice" ក្នុងការអភិវឌ្ឍកម្មវិធីមានន័យដូចម្ដេច?',
          options: [
            'សាងសង់ database schema ទាំងមូលមុនសរសេរ API ឬ UI ណាមួយ',
            'ការបំបែកមុខងារជាផ្នែកតូចពេញលេញពីដើមដល់ចប់ (UI, logic, data និង tests) ដែលអាចបញ្ចេញប្រើបានឯករាជ្យ',
            'បញ្ចេញតែការកែ CSS ម្ដងក្នុងមួយឆ្នាំ',
            'ឱ្យអ្នកអភិវឌ្ឍម្នាក់ៗប្រើភាសាសរសេរកូដខុសគ្នា',
          ],
          answer: 1,
          explanation:
            'Vertical slices ផ្ដល់មុខងារពេញលេញដែលអាចតេស្ត និងប្រើបានក្នុងជំហានតូចៗ កាត់បន្ថយហានិភ័យ និងទទួលមតិយោបល់បានឆាប់។',
        },
      ],
    },
  },

  'software-engineering/git-and-version-control': {
    en: {
      duration: '12 min',
      objectives: [
        'Choose safely between git merge, git rebase, git revert, and git reset',
        'Avoid destroying teammate history by using --force-with-lease instead of --force',
        'Resolve merge conflict markers confidently and keep Pull Requests small and reviewable',
        'Locate regression commits in O(log n) steps using git bisect',
      ],
      extraSections: [
        {
          id: 'merge-rebase-cherrypick',
          heading: 'Merge vs Rebase & Safe Ways to Undo Mistakes',
          body: [
            'Git offers two primary ways to combine branches: git merge preserves exact branching history with a merge commit, while git rebase replays your local feature commits neatly on top of the latest main for a clean linear history. Both are great—the golden rule is to rebase only your own unshared/feature branch, never shared branches like main.',
            'Knowing how to undo mistakes safely separates calm engineers from panicked ones. On commits already pushed to main, always use git revert <hash>, which creates a new inverse commit without altering history. Reserve git reset --hard strictly for discarding uncommitted local experiments—and remember git reflog can recover almost any accidentally reset local commit for 30+ days.',
          ],
          points: [
            'Use git revert <sha> to undo commits already on main—it preserves a clean audit trail.',
            'Use git rebase main on your personal feature branch to resolve conflicts early before opening a PR.',
            'Use git stash push -m "wip: nav" to park half-finished edits when switching branches urgently.',
            'Use git reflog as your safety net to recover lost local commits after an accidental reset.',
          ],
          table: {
            headers: ['Git Command', 'Rewrites History?', 'Safe on Shared main?', 'Best Use Case'],
            rows: [
              ['git merge', 'No', 'Yes', 'Integrating completed PRs with full context'],
              [
                'git rebase',
                'Yes (new SHAs)',
                'NO (local/PR only)',
                'Updating a private feature branch onto main',
              ],
              [
                'git revert <sha>',
                'No (adds commit)',
                'Yes',
                'Safely rolling back a bad production commit',
              ],
              [
                'git reset --hard',
                'Yes (moves HEAD)',
                'NO (local only)',
                'Discarding local unpushed work completely',
              ],
              [
                'git bisect',
                'No (read-only)',
                'Yes',
                'Binary-searching history to find a bug commit',
              ],
            ],
          },
          warning:
            'NEVER run git push --force on main or any branch shared with other developers—it overwrites teammates’ commits and causes severe history divergence. When updating your own PR branch after a rebase, always use git push --force-with-lease so Git aborts if someone else pushed commits you haven’t seen.',
        },
        {
          id: 'pull-requests-and-conflicts',
          heading: 'Resolving Merge Conflicts & High-Signal Pull Requests',
          body: [
            'Merge conflicts are not errors—they simply mean two branches edited the same lines and Git asks a human to decide the right combined result. Git marks conflicts with <<<<<<< HEAD (your current branch), ======= (separator), and >>>>>>> incoming-branch. Edit the file to keep the desired final code, remove all three marker lines, run your tests, and commit.',
            'Great teams treat Pull Requests as a communication tool. Keep PRs focused and small (ideally under 250–300 changed lines), include a clear "Why" and "How tested" summary, and review your own diff before requesting teammates’ time.',
          ],
          points: [
            'Always run your test suite after resolving a merge conflict—semantic bugs hide even after markers are removed.',
            'Keep PRs small and single-purpose: a 150-line PR gets thorough feedback; a 2,000-line PR gets rubber-stamped.',
            'Use git bisect start / bad / good to pinpoint which of 1,000 commits broke a test in at most 10 checks.',
            'Add a .gitignore and pre-commit secret scanner so API keys and node_modules never enter Git history.',
          ],
          example: {
            title: 'Interactive Merge Conflict Resolver',
            language: 'javascript',
            code: `function resolveConflict(text, strategy) {
  const regex = /<<<<<<< HEAD\\n([\\s\\S]*?)=======\\n([\\s\\S]*?)>>>>>>> [^\\n]+/g;
  return text.replace(regex, (_, ours, theirs) => {
    if (strategy === 'ours') return ours.trimEnd();
    if (strategy === 'theirs') return theirs.trimEnd();
    return ours.trimEnd() + '\\n' + theirs.trimEnd();
  });
}

const sample = \`const timeout = 3000;
<<<<<<< HEAD
const retries = 3;
=======
const retries = 5;
>>>>>>> feat/retry-tuning\`;

console.log(resolveConflict(sample, 'theirs'));`,
            output: `const timeout = 3000;
const retries = 5;`,
            playground: {
              html: `<div class="wrap">
  <h2>Git Conflict Resolver</h2>
  <pre id="raw"></pre>
  <div class="btns">
    <button data-mode="ours">Keep Current (HEAD)</button>
    <button data-mode="theirs">Keep Incoming (feat)</button>
    <button data-mode="both">Keep Both</button>
  </div>
  <h3>Resolved Output</h3>
  <pre id="out"></pre>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; color: #18181b; }
.wrap { max-width: 480px; }
h2, h3 { margin: 0 0 8px; font-size: 15px; }
pre { background: #f4f4f5; padding: 10px 12px; border-radius: 8px; font-size: 12px; overflow-x: auto; }
.btns { display: flex; gap: 8px; margin: 10px 0 14px; flex-wrap: wrap; }
button { padding: 6px 10px; border: 1px solid #d4d4d8; border-radius: 6px; background: white; cursor: pointer; font-size: 12px; font-weight: 500; }
button:active { transform: scale(0.97); }`,
              js: `const conflict = \`const apiUrl = '/v1';
<<<<<<< HEAD
const timeoutMs = 3000;
=======
const timeoutMs = 8000;
const maxRetries = 3;
>>>>>>> feat/resilient-http\`;

document.getElementById('raw').textContent = conflict;
const out = document.getElementById('out');

function resolve(mode) {
  const re = /<<<<<<< HEAD\\n([\\s\\S]*?)=======\\n([\\s\\S]*?)>>>>>>> [^\\n]+/g;
  out.textContent = conflict.replace(re, (_, ours, theirs) => {
    if (mode === 'ours') return ours.trimEnd();
    if (mode === 'theirs') return theirs.trimEnd();
    return ours.trimEnd() + '\\n' + theirs.trimEnd();
  });
}

document.querySelectorAll('button').forEach((btn) => {
  btn.addEventListener('click', () => resolve(btn.dataset.mode));
});
resolve('theirs');`,
            },
          },
          tip: 'Use git log --oneline --graph --decorate -n 15 to visualize branch topology clearly right in your terminal.',
        },
      ],
      challenge: {
        prompt:
          'Write a JavaScript function summarizeCommits(messages) that takes an array of commit subject lines (e.g. "feat(api): add pagination", "fix: null check", "wip temp") and returns an object counting commits by conventional type (feat, fix, refactor, test, docs, other).',
        hint: 'Match /^(feat|fix|refactor|test|docs)(\\([^)]+\\))?:/ and increment counts[match ? match[1] : "other"].',
        language: 'javascript',
        solutionCode: `function summarizeCommits(messages) {
  const counts = { feat: 0, fix: 0, refactor: 0, test: 0, docs: 0, other: 0 };
  const pattern = /^(feat|fix|refactor|test|docs)(\\([a-z0-9-]+\\))?:/;

  for (const msg of messages) {
    const match = msg.trim().match(pattern);
    const key = match ? match[1] : 'other';
    counts[key] += 1;
  }
  return counts;
}

console.log(summarizeCommits([
  'feat(auth): add OAuth login',
  'fix: handle empty cart',
  'docs: update setup steps',
  'quick tweak',
]));`,
      },
      quiz: [
        {
          question:
            'A faulty commit was already merged and pushed to the shared main branch. What is the safest Git command to undo it?',
          options: [
            'git reset --hard HEAD~1 && git push --force',
            'git revert <commit-hash> and push the new revert commit',
            'Delete the .git folder and re-initialize',
            'git rebase -i HEAD~5 && git push --force',
          ],
          answer: 1,
          explanation:
            'git revert creates a brand-new commit that cleanly reverses the faulty commit without rewriting shared history, keeping every teammate’s clone in sync.',
        },
        {
          question:
            'Why is git push --force-with-lease safer than git push --force on a feature branch after rebasing?',
          options: [
            'It skips running server-side Git hooks',
            'It refuses to overwrite the remote branch if someone else pushed new commits you have not fetched yet',
            'It automatically merges main into your branch',
            'It compresses binary files before pushing',
          ],
          answer: 1,
          explanation:
            '--force-with-lease checks that the remote ref matches your local tracking ref before updating, preventing you from accidentally wiping out a collaborator’s unpulled commits.',
        },
      ],
    },
    km: {
      duration: '12 នាទី',
      objectives: [
        'ជ្រើសរើសប្រើប្រាស់ដោយសុវត្ថិភាពរវាង git merge, git rebase, git revert និង git reset',
        'ជៀសវាងការបំផ្លាញប្រវត្តិកូដក្រុមដោយប្រើ --force-with-lease ជំនួស --force',
        'ដោះស្រាយ merge conflict markers ដោយទំនុកចិត្ត និងរៀបចំ Pull Request តូចងាយពិនិត្យ',
        'រក commit ដែលបង្កកំហុសក្នុងល្បឿន O(log n) ដោយប្រើ git bisect',
      ],
      extraSections: [
        {
          id: 'merge-rebase-cherrypick',
          heading: 'Merge ធៀបនឹង Rebase និងវិធីត្រឡប់ក្រោយដោយសុវត្ថិភាព',
          body: [
            'Git មានវិធីសំខាន់ពីរដើម្បីបញ្ចូល branch៖ git merge រក្សាប្រវត្តិបែកមែកដើមទាំងស្រុងជាមួយ merge commit ចំណែក git rebase យក commit លើ feature branch របស់អ្នកមកដាក់បន្តលើ main ថ្មីបំផុតឱ្យប្រវត្តិត្រង់ស្អាត។ ច្បាប់មាសគឺ៖ ប្រើ rebase តែលើ feature branch ផ្ទាល់ខ្លួនប៉ុណ្ណោះ ហាម rebase branch រួមដូច main។',
            'ការចេះដកថយកំហុសដោយសុវត្ថិភាពជួយសង្គ្រោះក្រុមទាំងមូល។ ចំពោះ commit ដែលបាន push ចូល main រួចហើយ ត្រូវប្រើ git revert <hash> ជានិច្ច ព្រោះវាបង្កើត commit ថ្មីដើម្បីបញ្ច្រាសការកែប្រែដោយមិនលុបប្រវត្តិ។ ទុក git reset --hard សម្រាប់បោះចោលការសាកល្បងក្នុងម៉ាស៊ីនផ្ទាល់ប៉ុណ្ណោះ ហើយចាំថា git reflog អាចសង្គ្រោះ commit ក្នុងម៉ាស៊ីនដែលលុបច្រឡំបាន។',
          ],
          points: [
            'ប្រើ git revert <sha> ដើម្បីដក commit ចេញពី main ដោយរក្សាប្រវត្តិត្រួតពិនិត្យស្អាត។',
            'ប្រើ git rebase main លើ feature branch ផ្ទាល់ខ្លួន ដើម្បីដោះស្រាយ conflict មុនបើក PR។',
            'ប្រើ git stash push -m "wip: nav" ដើម្បីផ្អាកការងារមិនទាន់ចប់ពេលត្រូវប្ដូរ branch បន្ទាន់។',
            'ប្រើ git reflog ជាសំណាញ់សុវត្ថិភាព ដើម្បីទាញយក commit មកវិញក្រោយ reset ច្រឡំ។',
          ],
          table: {
            headers: [
              'ពាក្យបញ្ជា Git',
              'សរសេរប្រវត្តិឡើងវិញ?',
              'សុវត្ថិភាពលើ main រួម?',
              'ការប្រើប្រាស់ស័ក្តិសមបំផុត',
            ],
            rows: [
              ['git merge', 'ទេ', 'បាទ/ចាស', 'បញ្ចូល PR ដែលចប់រួចរាល់ដោយរក្សាបរិបទពេញ'],
              [
                'git rebase',
                'បាទ/ចាស (SHA ថ្មី)',
                'ទេ (តែ local/PR)',
                'ធ្វើបច្ចុប្បន្នភាព feature branch ផ្ទាល់ខ្លួនលើ main',
              ],
              [
                'git revert <sha>',
                'ទេ (បន្ថែម commit)',
                'បាទ/ចាស',
                'ដក commit ដែលខូចចេញពី production ដោយសុវត្ថិភាព',
              ],
              [
                'git reset --hard',
                'បាទ/ចាស (រំកិល HEAD)',
                'ទេ (តែក្នុងម៉ាស៊ីន)',
                'បោះចោលការកែក្នុងម៉ាស៊ីនដែលមិនទាន់ push',
              ],
              [
                'git bisect',
                'ទេ (អានប៉ុណ្ណោះ)',
                'បាទ/ចាស',
                'ស្វែងរក commit បង្ក bug តាមបែប binary search',
              ],
            ],
          },
          warning:
            'ហាមដាច់ខាតរត់ git push --force លើ main ឬ branch ដែលប្រើរួមជាមួយមិត្តរួមក្រុម — វានឹងលុប commit របស់អ្នកដទៃ និងបង្កភាពរញ៉េរញ៉ៃធ្ងន់ធ្ងរ។ ពេល push លើ PR branch ផ្ទាល់ខ្លួនក្រោយ rebase ត្រូវប្រើ git push --force-with-lease ជានិច្ច។',
        },
        {
          id: 'pull-requests-and-conflicts',
          heading: 'ការដោះស្រាយ Merge Conflicts និង Pull Requests គុណភាពខ្ពស់',
          body: [
            'Merge conflict មិនមែនជាកំហុសទេ — វាគ្រាន់តែមានន័យថា branch ពីរបានកែបន្ទាត់ដូចគ្នា ហើយ Git សុំឱ្យមនុស្សសម្រេចជ្រើសរើសលទ្ធផលត្រឹមត្រូវ។ Git សម្គាល់ដោយ <<<<<<< HEAD (branch បច្ចុប្បន្ន), ======= (បន្ទាត់ខណ្ឌ) និង >>>>>>> branch-ថ្មី។ កែទុកកូដត្រឹមត្រូវ លុបបន្ទាត់សម្គាល់ទាំង ៣ រួចរត់តេស្ត និង commit។',
            'ក្រុមល្អចាត់ទុក Pull Request ជាឧបករណ៍ទំនាក់ទំនង។ រក្សា PR ឱ្យតូច និងផ្ដោតលើគោលដៅតែមួយ (ក្រោម 250–300 បន្ទាត់) សរសេរពន្យល់ "ហេតុអ្វី" និង "វិធីតេស្ត" ឱ្យច្បាស់ រួចពិនិត្យ diff ខ្លួនឯងមុនសុំក្រុម review។',
          ],
          points: [
            'រត់តេស្តជានិច្ចក្រោយដោះស្រាយ merge conflict ព្រោះកំហុសតក្កវិជ្ជាអាចលាក់ខ្លួនទោះលុបសញ្ញា conflict អស់ក៏ដោយ។',
            'រក្សា PR ឱ្យតូច៖ PR 150 បន្ទាត់ទទួលបានការ review ល្អិតល្អន់ ចំណែក PR 2,000 បន្ទាត់ងាយរបូតកំហុស។',
            'ប្រើ git bisect start / bad / good ដើម្បីរក commit បង្កកំហុសក្នុងចំណោម 1,000 commits ដោយប្រើតែ <= 10 ជំហាន។',
            'ប្រើ .gitignore និងឧបករណ៍ស្កេនសម្ងាត់ ដើម្បីកុំឱ្យ API keys និង node_modules ចូលក្នុងប្រវត្តិ Git។',
          ],
          exampleTitle: 'ឧបករណ៍ដោះស្រាយ Git Merge Conflict អន្តរកម្ម',
          tip: 'ប្រើ git log --oneline --graph --decorate -n 15 ដើម្បីមើលរូបភាពបែកមែក branch យ៉ាងច្បាស់ក្នុង terminal។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ JavaScript summarizeCommits(messages) ដែលទទួល array នៃចំណងជើង commit (ឧ. "feat(api): add pagination", "fix: null check", "wip temp") ហើយត្រឡប់ object រាប់ចំនួនតាមប្រភេទ conventional (feat, fix, refactor, test, docs, other)។',
        hint: 'ផ្គូផ្គងដោយ /^(feat|fix|refactor|test|docs)(\\([a-z0-9-]+\\))?:/ រួចបូកចំនួនចូល counts[match ? match[1] : "other"]។',
      },
      quiz: [
        {
          question:
            'មាន commit ខូចមួយត្រូវបាន merge និង push ទៅ main រួមរួចហើយ។ តើពាក្យបញ្ជា Git ណាសុវត្ថិភាពបំផុតដើម្បីដកវាចេញ?',
          options: [
            'git reset --hard HEAD~1 && git push --force',
            'git revert <commit-hash> ហើយ push commit ថ្មីនោះ',
            'លុបថត .git រួចចាប់ផ្ដើមថ្មី',
            'git rebase -i HEAD~5 && git push --force',
          ],
          answer: 1,
          explanation:
            'git revert បង្កើត commit ថ្មីដែលបញ្ច្រាស commit ខូចដោយមិនសរសេរប្រវត្តិរួមឡើងវិញ ធ្វើឱ្យម៉ាស៊ីនមិត្តរួមក្រុមទាំងអស់ស៊ីសង្វាក់គ្នា។',
        },
        {
          question:
            'ហេតុអ្វី git push --force-with-lease សុវត្ថិភាពជាង git push --force លើ feature branch ក្រោយ rebase?',
          options: [
            'វារំលង Git hooks លើ server',
            'វាបដិសេធមិនសរសេរជាន់លើ remote branch បើមានអ្នកផ្សេង push commit ថ្មីដែលអ្នកមិនទាន់បាន fetch',
            'វា merge main ចូល branch របស់អ្នកដោយស្វ័យប្រវត្តិ',
            'វាបង្ហាប់ឯកសារ binary មុន push',
          ],
          answer: 1,
          explanation:
            '--force-with-lease ផ្ទៀងផ្ទាត់ថា remote branch មិនទាន់មាន commit ថ្មីពីអ្នកដទៃមុនពេលជំនួស ការពារការលុបកូដមិត្តរួមក្រុមដោយច្រឡំ។',
        },
      ],
    },
  },

  'software-engineering/data-structures-and-algorithms': {
    en: {
      duration: '13 min',
      objectives: [
        'Compare O(1), O(log n), O(n), O(n log n), and O(n^2) growth rates on realistic dataset sizes',
        'Spot hidden O(n^2) traps such as calling array.includes() or array.find() inside loops',
        'Apply core algorithmic patterns: hash indexing (Map/Set), two pointers, sliding window, and BFS/DFS',
        'Balance time complexity against space complexity without falling into premature micro-optimization',
      ],
      extraSections: [
        {
          id: 'big-o-cheatsheet',
          heading: 'Big-O Growth Rates & Time-Space Tradeoffs',
          body: [
            'Big-O notation measures how operation count or memory scales as input size n grows—dropping constant multipliers so you focus on the dominant growth curve. An O(n^2) algorithm feels instant on 50 sample rows during local development, yet takes 100,000,000 operations when production grows to 10,000 records.',
            'Many real-world optimizations are simple time-space tradeoffs: investing O(n) extra memory in a HashMap or HashSet turns repeated O(n) scans into O(1) lookups, reducing total runtime from O(n^2) down to O(n).',
          ],
          points: [
            'Always account for hidden loops: array.includes(), indexOf(), shift(), and splice() are O(n), not O(1).',
            'Sorting with built-in TimSort/MergeSort runs in O(n log n)—often a great first step when data is not hashed.',
            'Space complexity counts extra memory you allocate (hash tables, recursion call stacks), not just runtime.',
            'Measure on realistic data sizes before optimizing—clean O(n) code beats unreadable micro-tweaks.',
          ],
          table: {
            headers: ['Big-O Class', 'Ops at n = 10,000', 'Typical Example'],
            rows: [
              ['O(1)', '1', 'Map.get(key), Set.has(x), array[i]'],
              ['O(log n)', '~14', 'Binary search on sorted array, balanced BST lookup'],
              ['O(n)', '10,000', 'Single loop scan, array.filter(), Map construction'],
              ['O(n log n)', '~133,000', 'Array.sort(), MergeSort, heap-based top-K'],
              ['O(n^2)', '100,000,000', 'Nested loops, calling .find() inside .map()'],
            ],
          },
          warning:
            'Premature micro-optimization (obfuscating code to save 2 nanoseconds) wastes engineering time, but ignoring algorithmic complexity (shipping an accidental O(n^2) nested .find() inside .map()) causes real production timeouts once data grows 100x. Profile first, and fix algorithmic bottlenecks first.',
        },
        {
          id: 'essential-patterns',
          heading: 'Four High-Leverage Patterns: Hash Index, Two Pointers, Sliding Window & BFS',
          body: [
            'You do not need to memorize hundreds of obscure puzzles to excel at day-to-day engineering or interviews—four foundational patterns solve the vast majority of real problems. Hash Indexing builds a Map/Set once to join datasets or find complement pairs (like Two Sum) in O(n). Two Pointers and Sliding Window process sorted arrays or contiguous subarrays/rate-limit windows in a single O(n) pass.',
            'For hierarchical or networked data (org charts, dependency graphs, shortest paths), use a Stack or recursion for Depth-First Search (DFS) and a Queue for Breadth-First Search (BFS), which naturally finds the shortest unweighted path first.',
          ],
          points: [
            'Hash Index (Map/Set): replace nested lookups when joining users, orders, permissions, or finding duplicates.',
            'Two Pointers: move left/right inward on sorted arrays in O(n) time and O(1) extra space.',
            'Sliding Window: maintain a rolling sum or count over the last k items or last t seconds without rescanning.',
            'BFS (Queue) finds shortest hops in unweighted graphs; DFS (Stack/Recursion) explores full branches and cycles.',
          ],
          example: {
            title: 'O(n^2) Nested Scan vs O(n) Map Index Join',
            language: 'javascript',
            code: `function joinSlow(orders, users) {
  let ops = 0;
  const result = orders.map((o) => {
    const user = users.find((u) => { ops += 1; return u.id === o.userId; });
    return { orderId: o.id, userName: user?.name ?? 'Unknown' };
  });
  return { count: result.length, ops };
}

function joinFast(orders, users) {
  let ops = 0;
  const userById = new Map();
  for (const u of users) { ops += 1; userById.set(u.id, u.name); }
  const result = orders.map((o) => {
    ops += 1;
    return { orderId: o.id, userName: userById.get(o.userId) ?? 'Unknown' };
  });
  return { count: result.length, ops };
}

const users = Array.from({ length: 500 }, (_, i) => ({ id: i, name: \`User \${i}\` }));
const orders = Array.from({ length: 500 }, (_, i) => ({ id: i, userId: 499 - i }));
console.log('Slow O(n^2):', joinSlow(orders, users));
console.log('Fast O(n)  :', joinFast(orders, users));`,
            output: `Slow O(n^2): { count: 500, ops: 125250 }
Fast O(n)  : { count: 500, ops: 1000 }`,
            playground: {
              html: `<div class="wrap">
  <h2>O(n²) Scan vs O(n) Map Join</h2>
  <label>Records (n): <input id="size" type="range" min="100" max="2000" step="100" value="500" /> <strong id="val">500</strong></label>
  <div id="out" class="card"></div>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.wrap { max-width: 440px; }
h2 { margin: 0 0 12px; font-size: 17px; }
label { display: flex; align-items: center; gap: 10px; font-size: 14px; }
.card { margin-top: 14px; padding: 12px 14px; border: 1px solid #e4e4e7; border-radius: 10px; font-family: monospace; font-size: 13px; line-height: 1.8; }`,
              js: `const slider = document.getElementById('size');
const val = document.getElementById('val');
const out = document.getElementById('out');

function run() {
  const n = Number(slider.value);
  val.textContent = n;
  const users = Array.from({ length: n }, (_, i) => ({ id: i, name: 'U' + i }));
  const orders = Array.from({ length: n }, (_, i) => ({ id: i, userId: n - 1 - i }));

  let slowOps = 0;
  orders.forEach((o) => users.find((u) => { slowOps += 1; return u.id === o.userId; }));

  let fastOps = 0;
  const map = new Map();
  users.forEach((u) => { fastOps += 1; map.set(u.id, u.name); });
  orders.forEach((o) => { fastOps += 1; map.get(o.userId); });

  const speedup = (slowOps / fastOps).toFixed(1);
  out.innerHTML = \`O(n²) nested .find(): <strong>\${slowOps.toLocaleString()}</strong> ops<br>O(n) Map index join : <strong>\${fastOps.toLocaleString()}</strong> ops<br>Reduction           : <strong>\${speedup}x fewer ops</strong>\`;
}
slider.addEventListener('input', run);
run();`,
            },
          },
          tip: 'In JavaScript, avoid array.shift() inside a BFS queue loop on large graphs—shift() is O(n) because it re-indexes every remaining element. Track a head index pointer (queue[head++]) instead for true O(1) dequeue.',
        },
      ],
      challenge: {
        prompt:
          'Implement findPairWithSum(nums, target) in O(n) time using a Map so it returns the two indices [i, j] whose values add up to target, or null if no pair exists.',
        hint: 'As you iterate i from 0 to nums.length - 1, compute needed = target - nums[i]. If seen.has(needed), return [seen.get(needed), i]; otherwise store seen.set(nums[i], i).',
        language: 'javascript',
        solutionCode: `function findPairWithSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i += 1) {
    const needed = target - nums[i];
    if (seen.has(needed)) {
      return [seen.get(needed), i];
    }
    seen.set(nums[i], i);
  }
  return null;
}

console.log(findPairWithSum([2, 11, 7, 15], 9));
console.log(findPairWithSum([1, 2, 3], 10));`,
      },
      quiz: [
        {
          question:
            'What is the time complexity of filtering an array of size n by checking bannedList.includes(item) where bannedList also has size n?',
          options: [
            'O(1)',
            'O(log n)',
            'O(n)',
            'O(n^2) because Array.prototype.includes() performs an O(n) linear scan on every iteration',
          ],
          answer: 3,
          explanation:
            'Calling an O(n) scan (.includes / .find / .indexOf) inside an O(n) loop multiplies to O(n^2). Converting bannedList into a Set once drops membership checks to O(1) and total time to O(n).',
        },
        {
          question:
            'Which traversal algorithm is best suited for finding the shortest path (fewest hops) in an unweighted graph?',
          options: [
            'Depth-First Search (DFS) using recursion',
            'Breadth-First Search (BFS) using a FIFO queue',
            'Bubble Sort',
            'Binary Search',
          ],
          answer: 1,
          explanation:
            'BFS explores nodes level-by-level in order of distance from the start node, guaranteeing the first time it reaches the target is via a shortest unweighted path.',
        },
      ],
    },
    km: {
      duration: '13 នាទី',
      objectives: [
        'ប្រៀបធៀបល្បឿនកំណើន O(1), O(log n), O(n), O(n log n) និង O(n^2) លើទំហំទិន្នន័យពិត',
        'មើលឃើញអន្ទាក់ O(n^2) លាក់កំបាំងដូចការហៅ array.includes() ឬ array.find() ក្នុងរង្វិលជុំ',
        'អនុវត្តលំនាំដោះស្រាយស្នូល៖ Hash Indexing (Map/Set), Two Pointers, Sliding Window និង BFS/DFS',
        'ថ្លឹងថ្លែងរវាងល្បឿន (time) និងអង្គចងចាំ (space) ដោយមិនបង្កើនភាពស្មុគស្មាញមុនពេលចាំបាច់',
      ],
      extraSections: [
        {
          id: 'big-o-cheatsheet',
          heading: 'ល្បឿនកំណើន Big-O និងការដោះដូរ Time-Space',
          body: [
            'Big-O notation វាស់ពីរបៀបដែលចំនួនប្រតិបត្តិការ ឬអង្គចងចាំកើនឡើងពេលទំហំទិន្នន័យ n កើនឡើង។ ក្បួនដោះស្រាយ O(n^2) ដើរលឿនពេលតេស្តលើទិន្នន័យ 50 ជួរលើម៉ាស៊ីនផ្ទាល់ ប៉ុន្តែត្រូវការ 100,000,000 ប្រតិបត្តិការពេលទិន្នន័យក្នុងប្រព័ន្ធពិតកើនដល់ 10,000 ជួរ។',
            'ការបង្កើនល្បឿនភាគច្រើនជាការដោះដូររវាងពេលវេលា និងអង្គចងចាំ៖ ការប្រើអង្គចងចាំបន្ថែម O(n) សម្រាប់ HashMap ឬ HashSet បម្លែងការស្វែងរក O(n) ដដែលៗទៅជា O(1) កាត់បន្ថយពេលសរុបពី O(n^2) មកត្រឹម O(n)។',
          ],
          points: [
            'ពិនិត្យរង្វិលជុំលាក់កំបាំងជានិច្ច៖ array.includes(), indexOf(), shift() និង splice() គឺ O(n) មិនមែន O(1) ទេ។',
            'ការតម្រៀបដោយ Array.sort() / MergeSort មានល្បឿន O(n log n)។',
            'Space complexity រាប់បញ្ចូលអង្គចងចាំបន្ថែមដែលអ្នកបង្កើត (Map, Set, recursion stack)។',
            'វាស់ល្បឿនលើទំហំទិន្នន័យពិតមុនកែលម្អ — កូដ O(n) ងាយអានល្អជាងកូដស្មុគស្មាញដែលសន្សំបានបន្តិចបន្តួច។',
          ],
          table: {
            headers: ['កម្រិត Big-O', 'ប្រតិបត្តិការពេល n = 10,000', 'ឧទាហរណ៍ទូទៅ'],
            rows: [
              ['O(1)', '1', 'Map.get(key), Set.has(x), array[i]'],
              ['O(log n)', '~14', 'Binary search លើ array តម្រៀបរួច, balanced BST'],
              ['O(n)', '10,000', 'រង្វិលជុំមួយជាន់, array.filter(), បង្កើត Map'],
              ['O(n log n)', '~133,000', 'Array.sort(), MergeSort, ស្វែងរក top-K ដោយ heap'],
              ['O(n^2)', '100,000,000', 'រង្វិលជុំពីរជាន់, ហៅ .find() ក្នុង .map()'],
            ],
          },
          warning:
            'ការបង្កើនល្បឿនមុនពេលចាំបាច់ (premature micro-optimization) ខាតពេលវេលា ប៉ុន្តែការព្រងើយកន្តើយនឹង algorithmic complexity (ដូចដាក់ .find() ក្នុង .map() ក្លាយជា O(n^2)) បង្កការគាំង timeout ពេលទិន្នន័យកើន 100 ដង។ ត្រូវវាស់ និងដោះស្រាយបញ្ហាកម្រិត Big-O ជាមុន។',
        },
        {
          id: 'essential-patterns',
          heading: 'លំនាំដោះស្រាយសំខាន់ទាំង ៤៖ Hash Index, Two Pointers, Sliding Window និង BFS',
          body: [
            'អ្នកមិនចាំបាច់ទន្ទេញលំហាត់រាប់រយទេ — លំនាំមូលដ្ឋាន ៤ ដោះស្រាយបញ្ហាភាគច្រើនក្នុងការងារពិត។ Hash Indexing បង្កើត Map/Set ម្ដងដើម្បីភ្ជាប់តារាង ឬរកគូផលបូក (Two Sum) ក្នុង O(n)។ Two Pointers និង Sliding Window ដំណើរការលើ array តម្រៀប ឬបង្អួចទិន្នន័យជាប់គ្នាក្នុងមួយជុំ O(n)។',
            'សម្រាប់ទិន្នន័យដើមឈើ ឬក្រាហ្វ (org chart, dependency graph) ប្រើ Stack/Recursion សម្រាប់ Depth-First Search (DFS) និង Queue សម្រាប់ Breadth-First Search (BFS) ដែលរកផ្លូវខ្លីបំផុតតាមជំហានបានដោយធម្មជាតិ។',
          ],
          points: [
            'Hash Index (Map/Set)៖ ជំនួសរង្វិលជុំជាន់គ្នាពេលភ្ជាប់ users ជាមួយ orders ឬរកទិន្នន័យស្ទួន។',
            'Two Pointers៖ រំកិលសន្ទស្សន៍ឆ្វេង/ស្ដាំលើ array តម្រៀបរួចក្នុងពេល O(n) និងអង្គចងចាំ O(1)។',
            'Sliding Window៖ គណនាផលបូក ឬចំនួនសំណើក្នុងចន្លោះ k ធាតុចុងក្រោយដោយមិនស្កេនឡើងវិញ។',
            'BFS (Queue) រកផ្លូវខ្លីបំផុតក្នុងក្រាហ្វគ្មានទម្ងន់ ចំណែក DFS (Stack/Recursion) រុករកជ្រៅតាមមែក។',
          ],
          exampleTitle: 'ប្រៀបធៀប O(n²) Nested Scan ធៀបនឹង O(n) Map Index Join',
          tip: 'ក្នុង JavaScript ជៀសវាងការហៅ array.shift() ក្នុងរង្វិលជុំ BFS លើក្រាហ្វធំ ព្រោះ shift() មានល្បឿន O(n)។ ត្រូវប្រើអថេរចង្អុលក្បាល queue[head++] ជំនួសដើម្បីបាន O(1) ពិតប្រាកដ។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ findPairWithSum(nums, target) ក្នុងល្បឿន O(n) ដោយប្រើ Map ដើម្បីត្រឡប់លេខរៀង [i, j] នៃធាតុពីរដែលបូកគ្នាស្មើ target ឬ null ប្រសិនបើគ្មាន។',
        hint: 'ពេលដើរកាត់ i គណនា needed = target - nums[i]។ បើ seen.has(needed) ត្រឡប់ [seen.get(needed), i] បើមិនដូច្នោះទេរក្សាទុក seen.set(nums[i], i)។',
      },
      quiz: [
        {
          question:
            'តើ time complexity នៃការត្រង array ទំហំ n ដោយពិនិត្យ bannedList.includes(item) ដែល bannedList ក៏មានទំហំ n ដែរ គឺប៉ុន្មាន?',
          options: [
            'O(1)',
            'O(log n)',
            'O(n)',
            'O(n^2) ព្រោះ Array.prototype.includes() ស្កេនបែប O(n) ក្នុងគ្រប់ជុំ',
          ],
          answer: 3,
          explanation:
            'ការហៅប្រតិបត្តិការ O(n) (.includes / .find) នៅក្នុងរង្វិលជុំ O(n) ផ្ដល់ O(n^2)។ បម្លែង bannedList ជា Set ម្ដងដើម្បីឱ្យការពិនិត្យចុះមក O(1) និងពេលសរុបជា O(n)។',
        },
        {
          question:
            'តើក្បួនដោះស្រាយណាស័ក្តិសមបំផុតដើម្បីរកផ្លូវខ្លីបំផុត (ជំហានតិចបំផុត) ក្នុងក្រាហ្វគ្មានទម្ងន់?',
          options: [
            'Depth-First Search (DFS) ដោយ recursion',
            'Breadth-First Search (BFS) ដោយ FIFO queue',
            'Bubble Sort',
            'Binary Search',
          ],
          answer: 1,
          explanation:
            'BFS រុករកតាមស្រទាប់ចម្ងាយពីចំណុចចាប់ផ្ដើម ដូច្នេះពេលជួបគោលដៅលើកដំបូងគឺធានាថាជាផ្លូវខ្លីបំផុត។',
        },
      ],
    },
  },

  'software-engineering/clean-code-and-solid': {
    en: {
      duration: '13 min',
      objectives: [
        'Apply all five SOLID principles pragmatically to keep modules adaptable and decoupled',
        'Refactor deep conditional pyramids and magic numbers using guard clauses and strategy maps',
        'Avoid over-engineering by applying the Rule of Three before creating abstractions',
        'Write self-documenting names and concise comments that explain "why" rather than "what"',
      ],
      extraSections: [
        {
          id: 'solid-in-practice',
          heading: 'The 5 SOLID Principles Without Over-Engineering',
          body: [
            'SOLID is a set of five object-oriented and modular design principles that prevent software from calcifying as requirements evolve. Together they encourage small cohesive modules (SRP), extending behavior via plugins or strategy tables instead of editing fragile central switch blocks (OCP), honoring subtype contracts (LSP), keeping interfaces focused (ISP), and depending on abstractions rather than concrete infrastructure (DIP).',
            'The key to senior-level design is restraint. Creating five layers of abstract factories for a single 30-line script makes code harder to navigate than a simple function. Follow the Rule of Three: tolerate slight duplication twice, and extract a shared abstraction only when a clear third use case proves the right boundary.',
          ],
          points: [
            'SRP: A module should have one cohesive responsibility and one primary stakeholder reason to change.',
            'OCP: Add new pricing rules or notification channels by registering a new handler, not modifying core checkout code.',
            'ISP: Prefer two 2-method interfaces (Readable, Writable) over one bloated 20-method god interface.',
            'DIP: Inject gateways/clocks/repositories as parameters so core logic works independently of databases and HTTP.',
          ],
          table: {
            headers: ['Principle', 'Core Idea', 'Practical Signal'],
            rows: [
              [
                'S — Single Responsibility',
                'One clear reason to change',
                'Split billing math from PDF rendering & email',
              ],
              [
                'O — Open / Closed',
                'Open to extend, closed to modify',
                'Strategy map/plugins instead of growing if/else',
              ],
              [
                'L — Liskov Substitution',
                'Subtypes honor parent contract',
                'Never throw NotImplemented in a subclass method',
              ],
              [
                'I — Interface Segregation',
                'Small, focused contracts',
                'Callers only depend on methods they actually use',
              ],
              [
                'D — Dependency Inversion',
                'Depend on abstractions, not concretions',
                'Pass PaymentGateway interface, not StripeClient',
              ],
            ],
          },
          warning:
            'Premature abstraction is a real engineering trap: wrong abstractions are far more expensive to untangle than simple duplicated code. Wait for concrete patterns (Rule of Three) before introducing indirection layers.',
        },
        {
          id: 'refactoring-smells',
          heading: 'Eliminating Code Smells: Guard Clauses & Strategy Maps',
          body: [
            'Most messy codebases share the same handful of "code smells": deeply nested conditionals, unexplained magic numbers (if (status === 4 && days > 14)), boolean flag parameters (render(data, true, false)), and giant functions mixing validation, calculation, and I/O.',
            'Replacing growing if/else chains with a strategy object (Open/Closed Principle) and flattening validation with guard clauses immediately lowers cognitive load—new teammates can understand and extend the code safely in seconds.',
          ],
          points: [
            'Replace magic numbers with named constants (const MAX_RETRY_ATTEMPTS = 3;).',
            'Name booleans as clear predicates (isVerified, hasAccess, canPublish) and functions as verb-noun phrases.',
            'Use strategy maps ({ standard: ..., vip: ... }) to eliminate repetitive branching chains.',
            'Write comments to explain non-obvious business rules or constraints ("why"), never to restate syntax ("what").',
          ],
          example: {
            title: 'Open/Closed Strategy Map vs Rigid if/else Chain',
            language: 'javascript',
            code: `const DISCOUNT_STRATEGIES = {
  standard: (amount) => amount,
  student: (amount) => amount * 0.85,
  vip: (amount) => amount * 0.75,
};

function calculatePrice(amount, tier = 'standard', strategies = DISCOUNT_STRATEGIES) {
  if (amount < 0) throw new Error('Amount cannot be negative');
  const apply = strategies[tier] ?? strategies.standard;
  return Number(apply(amount).toFixed(2));
}

console.log('Standard:', calculatePrice(100, 'standard'));
console.log('VIP     :', calculatePrice(100, 'vip'));`,
            output: `Standard: 100
VIP     : 75`,
            playground: {
              html: `<div class="wrap">
  <h2>Open/Closed Pricing Calculator</h2>
  <label>Price ($): <input id="amt" type="number" value="120" min="0" /></label>
  <label>Tier:
    <select id="tier">
      <option value="standard">Standard (0% off)</option>
      <option value="student">Student (15% off)</option>
      <option value="vip">VIP (25% off)</option>
      <option value="partner">Partner (30% off — extended!)</option>
    </select>
  </label>
  <p id="out"></p>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.wrap { max-width: 380px; display: grid; gap: 10px; }
h2 { margin: 0 0 4px; font-size: 17px; }
label { display: flex; justify-content: space-between; align-items: center; font-size: 14px; }
input, select { padding: 6px 10px; border: 1px solid #d4d4d8; border-radius: 6px; font-size: 14px; }
#out { margin: 6px 0 0; font-weight: 600; font-size: 15px; color: #065f46; }`,
              js: `const STRATEGIES = {
  standard: (p) => p,
  student: (p) => p * 0.85,
  vip: (p) => p * 0.75,
  partner: (p) => p * 0.70
};
const amt = document.getElementById('amt');
const tier = document.getElementById('tier');
const out = document.getElementById('out');

function update() {
  const base = Math.max(0, Number(amt.value) || 0);
  const finalPrice = (STRATEGIES[tier.value] ?? STRATEGIES.standard)(base);
  out.textContent = \`Final total: $\${finalPrice.toFixed(2)} (saved $\${(base - finalPrice).toFixed(2)})\`;
}
amt.addEventListener('input', update);
tier.addEventListener('change', update);
update();`,
            },
          },
          tip: 'Follow the Boy Scout Rule: whenever you touch a file to fix a bug or add a feature, leave it slightly cleaner (one clearer variable name, one extracted guard clause) without mixing unrelated massive rewrites into your PR.',
        },
      ],
      challenge: {
        prompt:
          'Refactor a deeply nested permission check into a clean function canPublish(user, article) using flat guard clauses: return false if !user, !user.isActive, !article, article.wordCount < 50, or if user.role !== "admin" && article.authorId !== user.id; otherwise return true.',
        hint: 'Write each rejection condition as its own single-line if (...) return false; statement at the top of the function.',
        language: 'javascript',
        solutionCode: `const MIN_WORD_COUNT = 50;

function canPublish(user, article) {
  if (!user || !user.isActive) return false;
  if (!article || article.wordCount < MIN_WORD_COUNT) return false;

  const isAdmin = user.role === 'admin';
  const isAuthor = article.authorId === user.id;
  return isAdmin || isAuthor;
}

console.log(canPublish({ id: 1, role: 'writer', isActive: true }, { authorId: 1, wordCount: 120 }));
console.log(canPublish({ id: 2, role: 'writer', isActive: true }, { authorId: 1, wordCount: 120 }));`,
      },
      quiz: [
        {
          question:
            'Which SOLID principle is demonstrated when you replace a growing if/else chain of payment providers with an extensible registry/interface?',
          options: [
            'Liskov Substitution Principle only',
            'Open/Closed Principle (open for extension with new providers, closed for modifying core checkout logic)',
            'Don’t Repeat Yourself (DRY) only',
            'Premature Optimization Principle',
          ],
          answer: 1,
          explanation:
            'Using a strategy map or interface lets you add new payment providers without editing and risking bugs in the existing checkout function—the essence of the Open/Closed Principle.',
        },
        {
          question:
            'What does the "Rule of Three" advise regarding creating reusable abstractions?',
          options: [
            'Every function must have at least three parameters',
            'Wait until you observe three concrete occurrences of a pattern before extracting a shared abstraction, avoiding wrong premature abstractions',
            'Always create three interfaces for every class',
            'Never write more than three files per repository',
          ],
          answer: 1,
          explanation:
            'Abstracting too early often locks in the wrong boundary. Waiting until a third real use case clarifies what truly varies versus what stays common.',
        },
      ],
    },
    km: {
      duration: '13 នាទី',
      objectives: [
        'អនុវត្តគោលការណ៍ SOLID ទាំង ៥ ដោយជាក់ស្ដែង ដើម្បីឱ្យ module ងាយពង្រីក និងមិនចងភ្ជាប់គ្នាខ្លាំង',
        'កែលម្អកូដ if/else ជាន់គ្នាជ្រៅៗ និង magic numbers ដោយប្រើ guard clauses និង strategy maps',
        'ជៀសវាងការរចនាស្មុគស្មាញហួសហេតុដោយអនុវត្តច្បាប់ Rule of Three មុនបង្កើត abstraction',
        'ដាក់ឈ្មោះអថេរ និងអនុគមន៍ឱ្យងាយយល់ និងសរសេរ comment ពន្យល់ "ហេតុអ្វី" ជំនួស "ធ្វើអ្វី"',
      ],
      extraSections: [
        {
          id: 'solid-in-practice',
          heading: 'គោលការណ៍ SOLID ទាំង ៥ ដោយមិនធ្វើឱ្យស្មុគស្មាញហួសហេតុ',
          body: [
            'SOLID គឺជាគោលការណ៍រចនាទាំង ៥ ដែលការពារកូដមិនឱ្យរឹងកំព្រឹសពេលតម្រូវការផ្លាស់ប្ដូរ។ វាលើកទឹកចិត្តឱ្យបង្កើត module តូចមានតួនាទីច្បាស់ (SRP), ពង្រីកឥរិយាបថថ្មីតាម strategy/interface ជំនួសការកែ switch កណ្ដាល (OCP), គោរពកិច្ចសន្យា class មេ (LSP), បង្កើត interface តូចច្បាស់ (ISP) និងពឹងផ្អែកលើ abstraction ជំនួសហេដ្ឋារចនាសម្ព័ន្ធផ្ទាល់ (DIP)។',
            'ចំណុចសំខាន់នៃការរចនាកម្រិតខ្ពស់គឺតុល្យភាព។ ការបង្កើត interface ៥ ស្រទាប់សម្រាប់ស្គ្រីបខ្លី ៣០ បន្ទាត់ធ្វើឱ្យកូដពិបាកអានជាងមុន។ អនុវត្តច្បាប់ Rule of Three៖ ទទួលយកកូដស្រដៀងគ្នាពីរដងសិន ហើយបំបែកជា abstraction ពេលជួបករណីទី ៣ ដែលបង្ហាញព្រំដែនច្បាស់លាស់។',
          ],
          points: [
            'SRP៖ Module មួយមានទំនួលខុសត្រូវច្បាស់មួយ និងមូលហេតុផ្លាស់ប្ដូរសំខាន់មួយ។',
            'OCP៖ បន្ថែមច្បាប់បញ្ចុះតម្លៃ ឬបណ្ដាញជូនដំណឹងថ្មីដោយចុះឈ្មោះ handler ថ្មី មិនបាច់កែកូដស្នូល។',
            'ISP៖ ជ្រើស interface តូចពីរ (Readable, Writable) ជាជាង interface ធំមួយមាន ២០ methods។',
            'DIP៖ បញ្ជូន gateway/clock/repository ជាប៉ារ៉ាម៉ែត្រ ដើម្បីឱ្យតក្កវិជ្ជាស្នូលឯករាជ្យពី database និង HTTP។',
          ],
          table: {
            headers: ['គោលការណ៍', 'ខ្លឹមសារស្នូល', 'ឧទាហរណ៍ជាក់ស្ដែង'],
            rows: [
              [
                'S — Single Responsibility',
                'មានមូលហេតុផ្លាស់ប្ដូរច្បាស់តែមួយ',
                'បំបែកការគណនាវិក្កយបត្រចេញពីការបង្កើត PDF និងផ្ញើអ៊ីមែល',
              ],
              [
                'O — Open / Closed',
                'បើកសម្រាប់ពង្រីក បិទសម្រាប់កែប្រែ',
                'ប្រើ strategy map/plugin ជំនួស if/else ដែលរីកវែង',
              ],
              [
                'L — Liskov Substitution',
                'ប្រភេទកូនគោរពកិច្ចសន្យាប្រភេទមេ',
                'កុំបោះ NotImplemented ក្នុង method របស់ subclass',
              ],
              [
                'I — Interface Segregation',
                'កិច្ចសន្យាតូច និងផ្ដោតច្បាស់',
                'អ្នកហៅពឹងផ្អែកតែលើ methods ដែលខ្លួនពិតជាប្រើ',
              ],
              [
                'D — Dependency Inversion',
                'ពឹងលើ abstraction មិនមែន class ផ្ទាល់',
                'បញ្ជូន PaymentGateway interface ជំនួស StripeClient',
              ],
            ],
          },
          warning:
            'ការបង្កើត abstraction មុនពេលចាំបាច់ (premature abstraction) គឺជាអន្ទាក់ពិតប្រាកដ៖ abstraction ដែលខុសពិបាកជួសជុលជាងកូដស្ទួនធម្មតាឆ្ងាយណាស់។ រង់ចាំលំនាំច្បាស់លាស់ (Rule of Three) មុនបន្ថែមស្រទាប់ថ្មី។',
        },
        {
          id: 'refactoring-smells',
          heading: 'ការកម្ចាត់ Code Smells៖ Guard Clauses និង Strategy Maps',
          body: [
            'កូដរញ៉េរញ៉ៃភាគច្រើនមានសញ្ញាដូចគ្នា៖ if/else ជាន់គ្នាជ្រៅៗ, លេខអាថ៌កំបាំងគ្មានឈ្មោះ (magic numbers ដូច if (status === 4 && days > 14)), ប៉ារ៉ាម៉ែត្រ boolean ច្រើន និងអនុគមន៍ធំៗដែលលាយការផ្ទៀងផ្ទាត់ ការគណនា និង I/O ចូលគ្នា។',
            'ការជំនួសខ្សែ if/else វែងៗដោយ strategy object (Open/Closed Principle) និងការដាក់ guard clauses នៅដើមអនុគមន៍ ជួយបន្ថយបន្ទុកខួរក្បាលភ្លាមៗ ធ្វើឱ្យមិត្តរួមក្រុមថ្មីអាន និងពង្រីកកូដបានយ៉ាងសុវត្ថិភាព។',
          ],
          points: [
            'ជំនួស magic numbers ដោយឈ្មោះថេរច្បាស់លាស់ (const MAX_RETRY_ATTEMPTS = 3;)។',
            'ដាក់ឈ្មោះ boolean ជាសំណួរ (isVerified, hasAccess, canPublish) និងអនុគមន៍ជាកិរិយាស័ព្ទ-នាម។',
            'ប្រើ strategy maps ({ standard: ..., vip: ... }) ដើម្បីលុបខ្សែ if/else ដដែលៗ។',
            'សរសេរ comment ពន្យល់ច្បាប់អាជីវកម្ម ឬមូលហេតុ ("ហេតុអ្វី") កុំសរសេរបកប្រែវាក្យសម្ព័ន្ធកូដវិញ។',
          ],
          exampleTitle: 'Open/Closed Strategy Map ជំនួស if/else វែងៗ',
          tip: 'អនុវត្តច្បាប់ Boy Scout៖ រាល់ពេលកែឯកសារមួយដើម្បីជួសជុល bug ឬបន្ថែមមុខងារ សូមទុកវាឱ្យស្អាតជាងមុនបន្តិច (ឈ្មោះអថេរច្បាស់ជាងមុន ឬ guard clause ស្អាតជាងមុន) ដោយមិនលាយការសរសេរឡើងវិញធំដុំដែលមិនពាក់ព័ន្ធចូល PR។',
        },
      ],
      challenge: {
        prompt:
          'កែលម្អការពិនិត្យសិទ្ធិជាន់គ្នាទៅជាអនុគមន៍ស្អាត canPublish(user, article) ដោយប្រើ guard clauses៖ ត្រឡប់ false បើ !user, !user.isActive, !article, article.wordCount < 50 ឬបើ user.role !== "admin" && article.authorId !== user.id បើមិនដូច្នោះទេត្រឡប់ true។',
        hint: 'សរសេរលក្ខខណ្ឌបដិសេធនីមួយៗជាបន្ទាត់ if (...) return false; ដាច់ដោយឡែកនៅផ្នែកខាងលើនៃអនុគមន៍។',
      },
      quiz: [
        {
          question:
            'តើគោលការណ៍ SOLID មួយណាត្រូវបានបង្ហាញពេលអ្នកជំនួសខ្សែ if/else នៃប្រព័ន្ធទូទាត់ប្រាក់ដោយ strategy map ឬ interface ដែលអាចបន្ថែមថ្មីបាន?',
          options: [
            'Liskov Substitution Principle តែប៉ុណ្ណោះ',
            'Open/Closed Principle (បើកសម្រាប់ពង្រីកប្រព័ន្ធថ្មី បិទសម្រាប់ការកែកូដស្នូល)',
            'DRY តែប៉ុណ្ណោះ',
            'Premature Optimization Principle',
          ],
          answer: 1,
          explanation:
            'ការប្រើ strategy map ឬ interface អនុញ្ញាតឱ្យបន្ថែមប្រព័ន្ធទូទាត់ថ្មីដោយមិនចាំបាច់កែអនុគមន៍ checkout ដើម — នេះជាខ្លឹមសារនៃ Open/Closed Principle។',
        },
        {
          question: 'តើច្បាប់ "Rule of Three" ណែនាំអ្វីអំពីការបង្កើត abstraction ដែលប្រើឡើងវិញ?',
          options: [
            'គ្រប់អនុគមន៍ត្រូវមានប៉ារ៉ាម៉ែត្រយ៉ាងតិច ៣',
            'រង់ចាំរហូតឃើញលំនាំដូចគ្នា ៣ ករណីជាក់ស្ដែងសិន មុនបំបែកជា abstraction រួម ដើម្បីជៀសវាង abstraction ខុសមុនពេលចាំបាច់',
            'ត្រូវបង្កើត interface ៣ សម្រាប់គ្រប់ class',
            'ហាមសរសេរលើសពី ៣ ឯកសារក្នុង repository មួយ',
          ],
          answer: 1,
          explanation:
            'ការបង្កើត abstraction លឿនពេកតែងជ្រើសព្រំដែនខុស។ ការរង់ចាំដល់ករណីទី ៣ ជួយឱ្យឃើញច្បាស់ថាអ្វីដែលដូចគ្នា និងអ្វីដែលផ្លាស់ប្ដូរ។',
        },
      ],
    },
  },

  'software-engineering/testing-and-debugging': {
    en: {
      duration: '13 min',
      objectives: [
        'Balance unit, integration, and end-to-end tests using the Testing Pyramid',
        'Eliminate flaky tests by injecting deterministic clocks, random seeds, and network fakes',
        'Follow the 4-step scientific debugging workflow instead of random trial-and-error edits',
        'Test edge cases and lock down every bug fix with a regression test',
      ],
      extraSections: [
        {
          id: 'testing-pyramid-and-doubles',
          heading: 'The Testing Pyramid, Test Doubles & Killing Flaky Tests',
          body: [
            'A healthy test suite combines layers with different speed and confidence tradeoffs. Static analysis (types and linters) catches syntax and contract bugs instantly as you type. Unit tests verify pure domain logic in milliseconds. Integration tests verify that your code talks properly to real databases, routers, and serializers. A small set of End-to-End (E2E) tests confirms critical user journeys like signup and checkout.',
            'Nothing erodes engineering velocity faster than flaky tests—tests that pass or fail randomly without code changes. Flakiness almost always comes from hidden nondeterminism: calling Date.now(), Math.random(), real external APIs, arbitrary setTimeout waits, or sharing mutable global state between test cases.',
          ],
          points: [
            'Write many fast unit tests for business rules, solid integration tests for DB/API boundaries, and a few critical E2E tests.',
            'Inject clocks (now = Date.now) and HTTP clients so tests stay 100% deterministic and run offline in milliseconds.',
            'Test observable outputs and edge cases (empty arrays, boundary dates, invalid input) rather than private helper internals.',
            'Avoid over-mocking: mocking every collaborator couples tests to implementation details and hides real integration bugs.',
          ],
          table: {
            headers: ['Test Layer', 'Speed', 'Scope', 'What It Catches Best'],
            rows: [
              [
                'Static / Types',
                'Instant (<1s)',
                'Single file / module',
                'Null access, typos, mismatched types',
              ],
              [
                'Unit Tests',
                'Milliseconds',
                'Single function / class',
                'Business rules, edge cases, math, branching',
              ],
              [
                'Integration Tests',
                'Seconds',
                'API + DB / multiple modules',
                'SQL queries, serialization, DI wiring, auth',
              ],
              [
                'End-to-End (E2E)',
                'Tens of seconds',
                'Full browser + live backend',
                'Critical user flows (login, checkout)',
              ],
            ],
          },
          warning:
            'Tests that call real third-party APIs, rely on wall-clock Date.now(), or sleep with arbitrary setTimeout(500) become flaky. Once teammates learn to ignore red CI builds and click "re-run", real production bugs slip straight through.',
        },
        {
          id: 'scientific-debugging',
          heading: 'Scientific Debugging & Regression-Proofing',
          body: [
            'Guessing and randomly changing lines until a bug "seems gone" wastes hours and often introduces two new bugs. Instead, debug scientifically in four steps: (1) Reproduce the failure reliably with the smallest possible input; (2) Form a specific, falsifiable hypothesis ("the cache key ignores currency"); (3) Test the hypothesis using a debugger breakpoint, structured logging, or git bisect; (4) Write a failing automated test proving the bug, then apply the minimal clean fix.',
            'Read the full stack trace from the root cause first—not just the top wrapper line—and inspect the exact values of inputs right before the failing branch.',
          ],
          points: [
            'Step 1: Create a minimal, deterministic reproduction before touching production code.',
            'Step 2: Read the root-cause exception message and line number completely before guessing.',
            'Step 3: Narrow the search space in halves (breakpoints, input slicing, or git bisect).',
            'Step 4: Keep the reproduction as a permanent regression test so the bug never returns.',
          ],
          example: {
            title: 'Deterministic Clock Injection & Edge-Case Test Runner',
            language: 'javascript',
            code: `function isCouponValid(coupon, nowMs = Date.now()) {
  if (!coupon || coupon.used) return false;
  return nowMs <= coupon.expiresAtMs;
}

// Deterministic tests — never depend on real wall clock!
const expiry = Date.UTC(2026, 5, 1, 12, 0, 0);
const coupon = { code: 'SAVE20', used: false, expiresAtMs: expiry };

console.log('Before expiry:', isCouponValid(coupon, expiry - 1000));
console.log('Exact boundary:', isCouponValid(coupon, expiry));
console.log('After expiry :', isCouponValid(coupon, expiry + 1));`,
            output: `Before expiry: true
Exact boundary: true
After expiry : false`,
            playground: {
              html: `<div class="wrap">
  <h2>Deterministic Edge-Case Suite</h2>
  <ul id="results"></ul>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
h2 { margin: 0 0 10px; font-size: 17px; }
ul { list-style: none; padding: 0; margin: 0; font-family: monospace; font-size: 13px; display: grid; gap: 6px; }
li { padding: 8px 10px; border-radius: 8px; }
.pass { background: #ecfdf5; color: #065f46; }
.fail { background: #fef2f2; color: #991b1b; }`,
              js: `function isCouponValid(coupon, nowMs = Date.now()) {
  if (!coupon || coupon.used) return false;
  return nowMs <= coupon.expiresAtMs;
}

const expiry = Date.UTC(2026, 5, 1, 12, 0, 0);
const cases = [
  ['valid before expiry', isCouponValid({ used: false, expiresAtMs: expiry }, expiry - 5000), true],
  ['valid at exact boundary', isCouponValid({ used: false, expiresAtMs: expiry }, expiry), true],
  ['invalid 1ms after expiry', isCouponValid({ used: false, expiresAtMs: expiry }, expiry + 1), false],
  ['invalid when already used', isCouponValid({ used: true, expiresAtMs: expiry }, expiry - 5000), false],
  ['handles null safely', isCouponValid(null, expiry), false]
];

const ul = document.getElementById('results');
cases.forEach(([name, actual, expected]) => {
  const ok = actual === expected;
  const li = document.createElement('li');
  li.className = ok ? 'pass' : 'fail';
  li.textContent = \`\${ok ? 'PASS' : 'FAIL'} — \${name} (got \${actual})\`;
  ul.append(li);
});`,
            },
          },
          tip: 'When a complex bug resists every hypothesis, explain the code line-by-line out loud (or in a scratch note)—"rubber duck debugging" forces your brain to verify assumptions instead of skimming past them.',
        },
      ],
      challenge: {
        prompt:
          'Write a deterministic function isSessionActive(session, nowMs = Date.now()) that returns false if session is null, revoked, or expired (nowMs >= session.expiresAtMs), and write 4 unit assertions testing active, exact-expiration, revoked, and null cases.',
        hint: 'Pass explicit integer timestamps like 1000, 2000, and 2001 as nowMs so the tests never flake regardless of when they run.',
        language: 'javascript',
        solutionCode: `function isSessionActive(session, nowMs = Date.now()) {
  if (!session || session.revoked) return false;
  return nowMs < session.expiresAtMs;
}

function assertEqual(label, actual, expected) {
  if (actual !== expected) {
    throw new Error(\`\${label}: expected \${expected}, got \${actual}\`);
  }
  console.log('PASS:', label);
}

const s = { revoked: false, expiresAtMs: 5000 };
assertEqual('active before expiry', isSessionActive(s, 4999), true);
assertEqual('inactive at exact expiry', isSessionActive(s, 5000), false);
assertEqual('inactive when revoked', isSessionActive({ revoked: true, expiresAtMs: 9000 }, 1000), false);
assertEqual('inactive when null', isSessionActive(null, 1000), false);`,
      },
      quiz: [
        {
          question:
            'What is the most effective way to prevent a time-sensitive unit test from becoming flaky?',
          options: [
            'Add a 5-second setTimeout before every assertion',
            'Inject the current timestamp/clock as a parameter so tests pass fixed deterministic timestamps',
            'Skip the test automatically on weekends',
            'Re-run failing tests 10 times until one passes',
          ],
          answer: 1,
          explanation:
            'Passing an explicit clock/timestamp (nowMs = Date.now()) decouples business logic from real wall-clock time, making boundary tests instant and 100% repeatable.',
        },
        {
          question:
            'Why are integration tests still essential even if your codebase has 100% unit test coverage?',
          options: [
            'Unit tests cannot test math functions',
            'Integration tests verify real boundaries—like SQL queries, JSON serialization, HTTP routing, and DI wiring—that mocked unit tests cannot catch',
            'Integration tests run faster than static type checks',
            'Integration tests replace version control',
          ],
          answer: 1,
          explanation:
            'Two units can each pass isolated unit tests yet fail when wired together (wrong SQL column name, bad route param, mismatched JSON key). Integration tests verify real boundaries.',
        },
      ],
    },
    km: {
      duration: '13 នាទី',
      objectives: [
        'ថ្លឹងថ្លែង unit, integration និង end-to-end tests តាមគំរូ Testing Pyramid',
        'លុបបំបាត់ flaky tests ដោយបញ្ជូននាឡិកាថេរ (deterministic clocks) និង fakes សម្រាប់បណ្ដាញ',
        'អនុវត្តវិធីសាស្ត្រ debug តាមបែបវិទ្យាសាស្ត្រ ៤ ជំហាន ជំនួសការកែស្មានដោយចៃដន្យ',
        'តេស្តករណីគែម (edge cases) និងចងជាប់រាល់ការជួសជុល bug ដោយ regression test',
      ],
      extraSections: [
        {
          id: 'testing-pyramid-and-doubles',
          heading: 'Testing Pyramid, Test Doubles និងការកម្ចាត់ Flaky Tests',
          body: [
            'ឈុតតេស្តដែលរឹងមាំរួមបញ្ចូលស្រទាប់ច្រើនដែលមានល្បឿន និងទំនុកចិត្តខុសគ្នា។ Static analysis (types និង linters) ចាប់កំហុសភ្លាមពេលសរសេរ។ Unit tests ផ្ទៀងផ្ទាត់តក្កវិជ្ជាស្នូលក្នុងរយៈពេលមិល្លីវិនាទី។ Integration tests ផ្ទៀងផ្ទាត់ការភ្ជាប់ពិតជាមួយ database, router និង serializer។ ចំណែក E2E tests មួយចំនួនតូចផ្ទៀងផ្ទាត់លំហូរអ្នកប្រើសំខាន់ៗដូចការចុះឈ្មោះ និងទូទាត់ប្រាក់។',
            'គ្មានអ្វីបំផ្លាញល្បឿនក្រុមលឿនជាង flaky tests (តេស្តដែលម្ដងជាប់ម្ដងធ្លាក់ដោយមិនបានកែកូដ) ឡើយ។ មូលហេតុភាគច្រើនមកពីការពឹងផ្អែកលើ Date.now(), Math.random(), API ពិតខាងក្រៅ, setTimeout ឬស្ថានភាព global រួមគ្នារវាងតេស្ត។',
          ],
          points: [
            'សរសេរ unit tests លឿនឱ្យច្រើនសម្រាប់តក្កវិជ្ជាអាជីវកម្ម integration tests សម្រាប់ព្រំដែន DB/API និង E2E តែលំហូរសំខាន់។',
            'បញ្ជូននាឡិកា (now = Date.now) និង HTTP client ជាប៉ារ៉ាម៉ែត្រ ដើម្បីឱ្យតេស្តផ្ដល់លទ្ធផលដូចគ្នា 100% គ្រប់ពេល។',
            'តេស្តលទ្ធផល និងករណីគែម (array ទទេ ថ្ងៃផុតកំណត់ ទិន្នន័យខុស) ជាជាងតេស្តព័ត៌មានលម្អិតខាងក្នុង។',
            'កុំ mock គ្រប់យ៉ាងហួសហេតុ — ការ mock ជ្រុលធ្វើឱ្យតេស្តបែកងាយពេល refactor និងលាក់កំហុសភ្ជាប់ពិត។',
          ],
          table: {
            headers: ['ស្រទាប់តេស្ត', 'ល្បឿន', 'វិសាលភាព', 'ចាប់កំហុសបានល្អបំផុតលើ'],
            rows: [
              [
                'Static / Types',
                'ភ្លាមៗ (<1 វិនាទី)',
                'ឯកសារ / module មួយ',
                'Null access, សរសេរឈ្មោះខុស ប្រភេទទិន្នន័យខុស',
              ],
              [
                'Unit Tests',
                'មិល្លីវិនាទី',
                'អនុគមន៍ / class មួយ',
                'ច្បាប់អាជីវកម្ម ករណីគែម ការគណនា',
              ],
              [
                'Integration Tests',
                'ប៉ុន្មានវិនាទី',
                'API + DB / ច្រើន module',
                'SQL queries, JSON serialization, DI, auth',
              ],
              [
                'End-to-End (E2E)',
                'រាប់សិបវិនាទី',
                'Browser ពេញ + backend ពិត',
                'លំហូរសំខាន់របស់អ្នកប្រើ (login, checkout)',
              ],
            ],
          },
          warning:
            'តេស្តដែលហៅ API ខាងក្រៅពិត ពឹងលើ Date.now() ឬរង់ចាំ setTimeout(500) នឹងក្លាយជា flaky។ ពេលមិត្តរួមក្រុមទម្លាប់មិនជឿ CI ហើយចុច "re-run" រហូត កំហុសពិតប្រាកដនឹងរបូតចូល production ដោយស្ងាត់ៗ។',
        },
        {
          id: 'scientific-debugging',
          heading: 'ការ Debug តាមបែបវិទ្យាសាស្ត្រ និងការការពារកុំឱ្យកំហុសត្រឡប់មកវិញ',
          body: [
            'ការកែកូដស្មានៗរហូតដល់ "មើលទៅដូចជាបាត់" ខាតពេលច្រើន ហើយជារឿយៗបង្កើត bug ថ្មីពីរទៀត។ ត្រូវ debug តាម ៤ ជំហានវិទ្យាសាស្ត្រ៖ (១) បង្កើតកំហុសឡើងវិញឱ្យបានជាក់លាក់ដោយទិន្នន័យតូចបំផុត (២) បង្កើតសម្មតិកម្មច្បាស់លាស់ (៣) ផ្ទៀងផ្ទាត់ដោយ breakpoint, structured log ឬ git bisect (៤) សរសេរតេស្តធ្លាក់ជាមុន រួចទើបជួសជុលកូដឱ្យជាប់។',
            'អាន stack trace ពីមូលហេតុដើមជាមុន (មិនមែនត្រឹមបន្ទាត់លើគេទេ) ហើយពិនិត្យតម្លៃអថេរជាក់ស្ដែងមុនពេលចូលបន្ទាត់ដែលបរាជ័យ។',
          ],
          points: [
            'ជំហានទី ១៖ បង្កើតការបង្ហាញកំហុសឡើងវិញតូច និងជាក់លាក់មុនកែកូដ។',
            'ជំហានទី ២៖ អានសារកំហុស និងលេខបន្ទាត់ដើមឱ្យចប់សព្វគ្រប់មុនទស្សន៍ទាយ។',
            'ជំហានទី ៣៖ បង្រួមដែនស្វែងរកពាក់កណ្ដាលម្ដងៗ (breakpoints ឬ git bisect)។',
            'ជំហានទី ៤៖ រក្សាតេស្តដែលចាប់ bug នោះទុកជា regression test អចិន្ត្រៃយ៍។',
          ],
          exampleTitle: 'ការបញ្ជូននាឡិកាថេរ និងឈុតតេស្តករណីគែម',
          tip: 'ពេល bug ស្មុគស្មាញពិបាករក សូមពន្យល់កូដមួយបន្ទាត់ម្ដងៗឱ្យឮ ឬសរសេរចេញ ("rubber duck debugging") — វាបង្ខំខួរក្បាលឱ្យផ្ទៀងផ្ទាត់ការសន្មត់ជំនួសការអានរំលង។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ isSessionActive(session, nowMs = Date.now()) ដែលត្រឡប់ false បើ session ជា null, revoked ឬផុតកំណត់ (nowMs >= session.expiresAtMs) រួចសរសេរការផ្ទៀងផ្ទាត់ ៤ ករណី (សកម្ម ផុតកំណត់ចំម៉ោង ត្រូវបានលុប និង null) ដោយមិនពឹងនាឡិកាពិត។',
        hint: 'បញ្ជូន timestamp លេខគត់ច្បាស់លាស់ដូច 4999, 5000 ជា nowMs ដើម្បីឱ្យតេស្តដើរដូចគ្នាជានិច្ច។',
      },
      quiz: [
        {
          question:
            'តើវិធីណាមានប្រសិទ្ធភាពបំផុតដើម្បីកុំឱ្យ unit test ដែលពាក់ព័ន្ធពេលវេលាក្លាយជា flaky?',
          options: [
            'បន្ថែម setTimeout 5 វិនាទីមុនគ្រប់ការផ្ទៀងផ្ទាត់',
            'បញ្ជូន timestamp/នាឡិកាជាប៉ារ៉ាម៉ែត្រ ដើម្បីឱ្យតេស្តប្រើពេលវេលាថេរជាក់លាក់',
            'រំលងតេស្តនោះដោយស្វ័យប្រវត្តិនៅថ្ងៃចុងសប្ដាហ៍',
            'រត់តេស្តឡើងវិញ 10 ដងរហូតជាប់ម្ដង',
          ],
          answer: 1,
          explanation:
            'ការបញ្ជូននាឡិកា (nowMs = Date.now()) ផ្ដាច់តក្កវិជ្ជាចេញពីម៉ោងពិត ធ្វើឱ្យតេស្តករណីផុតកំណត់លឿន និងផ្ដល់លទ្ធផលដូចគ្នា 100% គ្រប់ពេល។',
        },
        {
          question:
            'ហេតុអ្វី integration tests នៅតែចាំបាច់ ទោះបីកូដមាន unit test coverage 100% ក៏ដោយ?',
          options: [
            'Unit tests មិនអាចតេស្តអនុគមន៍គណិតវិទ្យាបានទេ',
            'Integration tests ផ្ទៀងផ្ទាត់ព្រំដែនពិតដូច SQL queries, JSON serialization, HTTP routing និង DI ដែល unit test ប្រើ mock មិនអាចរកឃើញ',
            'Integration tests ដើរលឿនជាង static type checks',
            'Integration tests ជំនួស version control',
          ],
          answer: 1,
          explanation:
            'Unit ពីរអាចជាប់ unit tests ដាច់ដោយឡែក ប៉ុន្តែបរាជ័យពេលភ្ជាប់គ្នា (ខុសឈ្មោះជួរឈរ SQL ឬខុស JSON key)។ Integration tests ផ្ទៀងផ្ទាត់ការភ្ជាប់ពិតប្រាកដ។',
        },
      ],
    },
  },

  'software-engineering/system-design-and-apis': {
    en: {
      duration: '15 min',
      objectives: [
        'Use accurate HTTP status codes (200, 201, 400/422, 401 vs 403, 409, 429, 503) in REST APIs',
        'Prevent duplicate charges and writes on network retries using Idempotency-Key headers',
        'Protect backend services with token-bucket rate limiting, timeouts, and cursor pagination',
        'Design stateless horizontally scalable services backed by caching and database indexes',
      ],
      extraSections: [
        {
          id: 'http-semantics-idempotency',
          heading: 'REST Semantics, HTTP Status Codes & Idempotency',
          body: [
            'Predictable HTTP status codes let API clients handle failures automatically without parsing brittle error strings. Distinguish 401 Unauthorized (missing or expired authentication—prompt login) from 403 Forbidden (authenticated, but lacks permission), 409 Conflict (version or duplicate resource clash), and 429 Too Many Requests (back off and retry after Retry-After).',
            'Networks fail constantly: a mobile client may send POST /payments, succeed on the server, lose Wi-Fi before receiving the 201 response, and retry. GET, PUT, and DELETE are naturally idempotent, while POST is not. Requiring an Idempotency-Key header lets the server store and replay the first response safely instead of charging the customer twice.',
          ],
          points: [
            '401 means "who are you?" (unauthenticated); 403 means "I know who you are, and you are not allowed".',
            'Require an Idempotency-Key header on payment, order, and other non-idempotent POST endpoints.',
            'Return consistent JSON error envelopes (code, message, details, requestId) across every endpoint.',
            'Version breaking API changes cleanly (/v1/orders -> /v2/orders) while keeping additive fields backward-compatible.',
          ],
          table: {
            headers: ['Status Code', 'Meaning', 'Client Action'],
            rows: [
              [
                '200 OK / 201 Created',
                'Success / New resource created',
                'Process response body (read Location on 201)',
              ],
              [
                '400 / 422',
                'Malformed JSON / Validation failed',
                'Do NOT retry; show field errors to user',
              ],
              [
                '401 vs 403',
                'Unauthenticated vs Forbidden',
                '401: refresh token/login; 403: show access denied',
              ],
              [
                '409 Conflict',
                'Duplicate key or stale version clash',
                'Reload latest state or use idempotency key',
              ],
              [
                '429 / 503',
                'Rate limited / Temporarily unavailable',
                'Retry with exponential backoff + jitter',
              ],
            ],
          },
          warning:
            'Retrying a non-idempotent POST /payments request after a network timeout can double-charge customers! Always require an Idempotency-Key header on state-creating endpoints and enforce a unique constraint in your database.',
        },
        {
          id: 'scaling-caching-rate-limiting',
          heading: 'Rate Limiting, Cursor Pagination & Horizontal Scaling',
          body: [
            'To scale beyond a single server, keep application instances stateless—store sessions and shared caches in Redis rather than local server RAM—so a load balancer can route traffic across N instances freely. Add database indexes on columns used in WHERE, JOIN, and ORDER BY clauses, and prefer cursor pagination (?cursor=eyJpZCI6NTB9&limit=20) over OFFSET 50000, which forces the database to scan and discard 50,000 rows on every request.',
            'Protect your API from traffic spikes and abusive bots using rate limiting (such as Token Bucket or Sliding Window), explicit timeouts on every downstream call, and bounded retries with exponential backoff + random jitter so thousands of clients do not retry in lockstep ("thundering herd").',
          ],
          points: [
            'Keep web/API servers stateless so you can scale horizontally behind a load balancer.',
            'Use cursor pagination with a strict max limit (e.g., limit <= 100) instead of deep OFFSET pagination.',
            'Enforce rate limits per client/API key and return 429 Too Many Requests with a Retry-After header.',
            'Combine timeouts + exponential backoff + jitter on retries to prevent cascading thundering-herd outages.',
          ],
          example: {
            title: 'Interactive Token Bucket Rate Limiter & Idempotency Simulator',
            language: 'javascript',
            code: `class TokenBucket {
  constructor(capacity, refillPerSec) {
    this.capacity = capacity;
    this.refillPerSec = refillPerSec;
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }
  allow(now = Date.now()) {
    const elapsedSec = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsedSec * this.refillPerSec);
    this.lastRefill = now;
    if (this.tokens < 1) return { status: 429, remaining: 0 };
    this.tokens -= 1;
    return { status: 200, remaining: Math.floor(this.tokens) };
  }
}

const limiter = new TokenBucket(2, 0.5);
const t0 = 10000;
console.log(limiter.allow(t0));
console.log(limiter.allow(t0));
console.log(limiter.allow(t0));
console.log(limiter.allow(t0 + 2500));`,
            output: `{ status: 200, remaining: 1 }
{ status: 200, remaining: 0 }
{ status: 429, remaining: 0 }
{ status: 200, remaining: 0 }`,
            playground: {
              html: `<div class="wrap">
  <h2>API Rate Limiter (3 req capacity, +1 / 2s)</h2>
  <button id="send">Send API Request</button>
  <p id="meta"></p>
  <ul id="log"></ul>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; color: #18181b; }
.wrap { max-width: 440px; }
h2 { margin: 0 0 10px; font-size: 16px; }
button { padding: 8px 14px; border: none; border-radius: 8px; background: #18181b; color: white; font-weight: 500; cursor: pointer; }
button:active { transform: scale(0.97); }
#meta { font-size: 13px; color: #52525b; margin: 10px 0; font-variant-numeric: tabular-nums; }
ul { list-style: none; padding: 0; margin: 0; font-family: monospace; font-size: 12px; display: grid; gap: 4px; }
.ok { color: #065f46; } .limited { color: #dc2626; font-weight: 600; }`,
              js: `let tokens = 3;
const capacity = 3;
let lastRefill = Date.now();
let reqNum = 0;

const meta = document.getElementById('meta');
const log = document.getElementById('log');

function refill() {
  const now = Date.now();
  tokens = Math.min(capacity, tokens + ((now - lastRefill) / 1000) * 0.5);
  lastRefill = now;
  meta.textContent = \`Available tokens: \${tokens.toFixed(1)} / \${capacity}\`;
}

document.getElementById('send').addEventListener('click', () => {
  refill();
  reqNum += 1;
  const li = document.createElement('li');
  if (tokens >= 1) {
    tokens -= 1;
    li.className = 'ok';
    li.textContent = \`#\${reqNum} -> 200 OK (tokens left: \${Math.floor(tokens)})\`;
  } else {
    li.className = 'limited';
    li.textContent = \`#\${reqNum} -> 429 Too Many Requests (wait 2s)\`;
  }
  log.prepend(li);
  if (log.children.length > 6) log.lastChild.remove();
  refill();
});
setInterval(refill, 400);
refill();`,
            },
          },
          tip: 'When designing a new API or system in an interview or RFC, start by estimating read/write ratio, payload size, and peak requests per second—back-of-the-envelope numbers immediately tell you whether you need caching, read replicas, or async queues.',
        },
      ],
      challenge: {
        prompt:
          'Implement a FixedWindowRateLimiter class with constructor(maxRequests, windowMs) and method allow(clientId, nowMs = Date.now()) that tracks per-client counts in a Map, resets when nowMs - entry.windowStart >= windowMs, and returns { allowed, remaining }.',
        hint: 'Store { count, windowStart } per clientId in this.clients = new Map(). If !entry || nowMs - entry.windowStart >= this.windowMs, reset entry to { count: 1, windowStart: nowMs }.',
        language: 'javascript',
        solutionCode: `class FixedWindowRateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.clients = new Map();
  }

  allow(clientId, nowMs = Date.now()) {
    const entry = this.clients.get(clientId);
    if (!entry || nowMs - entry.windowStart >= this.windowMs) {
      this.clients.set(clientId, { count: 1, windowStart: nowMs });
      return { allowed: true, remaining: this.maxRequests - 1 };
    }
    if (entry.count >= this.maxRequests) {
      return { allowed: false, remaining: 0 };
    }
    entry.count += 1;
    return { allowed: true, remaining: this.maxRequests - entry.count };
  }
}

const rl = new FixedWindowRateLimiter(2, 1000);
console.log(rl.allow('u1', 100));
console.log(rl.allow('u1', 200));
console.log(rl.allow('u1', 300));
console.log(rl.allow('u1', 1200));`,
      },
      quiz: [
        {
          question:
            'What is the difference between HTTP status codes 401 Unauthorized and 403 Forbidden?',
          options: [
            '401 means the server crashed; 403 means the URL does not exist',
            '401 means the client is not authenticated (missing/invalid credentials); 403 means the client is authenticated but lacks permission',
            '401 is for GET requests and 403 is for POST requests',
            'They are interchangeable aliases with identical meaning',
          ],
          answer: 1,
          explanation:
            '401 indicates missing or invalid authentication (prompting login or token refresh), whereas 403 indicates the server knows who you are, but your role/permissions forbid the action.',
        },
        {
          question: 'How does an Idempotency-Key header protect a POST /payments endpoint?',
          options: [
            'It encrypts the HTTP body without TLS',
            'It lets the server recognize retried requests with the same key and return the original result instead of charging the user twice',
            'It bypasses rate limiting for VIP users',
            'It automatically converts POST into GET',
          ],
          answer: 1,
          explanation:
            'If a client retries a timed-out POST /payments with the same Idempotency-Key, the server detects the existing key and safely replays the stored result rather than executing a second charge.',
        },
      ],
    },
    km: {
      duration: '15 នាទី',
      objectives: [
        'ប្រើ HTTP status codes ឱ្យត្រឹមត្រូវ (200, 201, 400/422, 401 vs 403, 409, 429, 503) ក្នុង REST APIs',
        'ការពារការកាត់ប្រាក់ ឬបង្កើតទិន្នន័យស្ទួនពេលសាកល្បងម្ដងទៀតដោយប្រើ Idempotency-Key',
        'ការពារសេវាកម្ម backend ជាមួយ token-bucket rate limiting, timeouts និង cursor pagination',
        'រចនាសេវាកម្មគ្មានស្ថានភាព (stateless) ដែលអាចពង្រីកផ្ដេក (horizontal scaling) រួមជាមួយ cache និង database indexes',
      ],
      extraSections: [
        {
          id: 'http-semantics-idempotency',
          heading: 'REST Semantics, HTTP Status Codes និង Idempotency',
          body: [
            'ការប្រើ HTTP status codes ត្រឹមត្រូវជួយឱ្យ API clients ដោះស្រាយកំហុសដោយស្វ័យប្រវត្តិដោយមិនបាច់កាត់អត្ថបទសារកំហុស។ បែងចែកឱ្យច្បាស់រវាង 401 Unauthorized (មិនទាន់ចូលគណនី ឬ token ផុតកំណត់), 403 Forbidden (ចូលគណនីរួចតែគ្មានសិទ្ធិ), 409 Conflict (ជាន់ទិន្នន័យ ឬ version) និង 429 Too Many Requests (ផ្ញើសំណើញឹកពេក ត្រូវរង់ចាំ)។',
            'បណ្ដាញតែងដាច់ជារឿយៗ៖ ទូរស័ព្ទអាចផ្ញើ POST /payments ជោគជ័យលើ server ប៉ុន្តែដាច់ Wi-Fi មុនទទួលចម្លើយ 201 រួចព្យាយាមផ្ញើម្ដងទៀត។ GET, PUT និង DELETE មានលក្ខណៈ idempotent ពីធម្មជាតិ តែ POST មិនមានទេ។ ការតម្រូវឱ្យមាន header Idempotency-Key អនុញ្ញាតឱ្យ server ត្រឡប់លទ្ធផលដើមវិញដោយសុវត្ថិភាព មិនកាត់ប្រាក់អតិថិជនពីរដងឡើយ។',
          ],
          points: [
            '401 មានន័យថា "អ្នកជានរណា?" (មិនទាន់ផ្ទៀងផ្ទាត់អត្តសញ្ញាណ) ចំណែក 403 មានន័យថា "ស្គាល់អ្នកហើយ តែអ្នកគ្មានសិទ្ធិ"។',
            'តម្រូវឱ្យមាន header Idempotency-Key លើ endpoint បង្កើតការទូទាត់ ឬការបញ្ជាទិញ (POST)។',
            'ត្រឡប់ទម្រង់ JSON កំហុសដូចគ្នា (code, message, details, requestId) នៅគ្រប់ endpoint។',
            'កំណត់ version API (/v1/orders -> /v2/orders) ពេលមានការផ្លាស់ប្ដូរដែលបំបែកភាពឆបគ្នា។',
          ],
          table: {
            headers: ['Status Code', 'អត្ថន័យ', 'សកម្មភាពរបស់ Client'],
            rows: [
              [
                '200 OK / 201 Created',
                'ជោគជ័យ / បង្កើតធនធានថ្មីរួចរាល់',
                'ដំណើរការទិន្នន័យឆ្លើយតប (អាន Location លើ 201)',
              ],
              [
                '400 / 422',
                'JSON ខុសទម្រង់ / Validation បរាជ័យ',
                'ហាម retry — បង្ហាញកំហុសលើប្រអប់បញ្ចូលដល់អ្នកប្រើ',
              ],
              [
                '401 vs 403',
                'មិនទាន់ login ធៀបនឹងគ្មានសិទ្ធិ',
                '401៖ ប្ដូរ token/login; 403៖ បង្ហាញគ្មានសិទ្ធិ',
              ],
              [
                '409 Conflict',
                'ជាន់ key ស្ទួន ឬ version ចាស់',
                'ទាញស្ថានភាពថ្មីបំផុត ឬប្រើ idempotency key',
              ],
              [
                '429 / 503',
                'ជាប់ rate limit / សេវាផ្អាកបណ្ដោះអាសន្ន',
                'Retry ដោយប្រើ exponential backoff + jitter',
              ],
            ],
          },
          warning:
            'ការ retry សំណើ POST /payments ដែលគ្មាន idempotency ក្រោយបណ្ដាញ timeout អាចកាត់ប្រាក់អតិថិជនពីរដង! ត្រូវតម្រូវឱ្យមាន header Idempotency-Key និងចង unique constraint ក្នុងមូលដ្ឋានទិន្នន័យជានិច្ច។',
        },
        {
          id: 'scaling-caching-rate-limiting',
          heading: 'Rate Limiting, Cursor Pagination និង Horizontal Scaling',
          body: [
            'ដើម្បីពង្រីកប្រព័ន្ធលើសពី server មួយ ត្រូវរក្សា application servers ឱ្យគ្មានស្ថានភាព (stateless) — ផ្ទុក session និង cache រួមក្នុង Redis ជំនួស RAM របស់ server នីមួយៗ — ដើម្បីឱ្យ load balancer បែងចែកចរាចរណ៍ទៅ N servers ដោយសេរី។ បន្ថែម database indexes លើជួរឈរក្នុង WHERE/JOIN/ORDER BY ហើយប្រើ cursor pagination (?cursor=...&limit=20) ជំនួស OFFSET 50000 ដែលបង្ខំ database អានចោល 50,000 ជួររាល់សំណើ។',
            'ការពារ API ពីចរាចរណ៍កើនភ្លាមៗ និង bot ដោយប្រើ rate limiting (Token Bucket ឬ Sliding Window), កំណត់ timeout ច្បាស់លើគ្រប់ការហៅសេវា និងប្រើ exponential backoff + random jitter ពេល retry ដើម្បីកុំឱ្យ client រាប់ពាន់បាញ់សំណើព្រមគ្នា ("thundering herd")។',
          ],
          points: [
            'រក្សា API servers ជា stateless ដើម្បីងាយបន្ថែមម៉ាស៊ីនផ្ដេក (horizontal scaling) ក្រោយ load balancer។',
            'ប្រើ cursor pagination ជាមួយដែនកំណត់អតិបរមា (limit <= 100) ជំនួស OFFSET ជ្រៅៗ។',
            'អនុវត្ត rate limit តាម client/API key ហើយត្រឡប់ 429 Too Many Requests រួមជាមួយ Retry-After។',
            'ផ្សំ timeouts + exponential backoff + jitter លើការ retry ដើម្បីការពារការគាំងរីករាលដាល។',
          ],
          exampleTitle: 'កម្មវិធីសាកល្បង Token Bucket Rate Limiter អន្តរកម្ម',
          tip: 'ពេលរចនា API ឬប្រព័ន្ធថ្មី ចាប់ផ្ដើមដោយប៉ាន់ស្មានសមាមាត្រ read/write, ទំហំទិន្នន័យ និងចំនួនសំណើក្នុងមួយវិនាទី — តួលេខទាំងនេះប្រាប់ភ្លាមថាអ្នកត្រូវការ cache, read replicas ឬ message queue។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើត class FixedWindowRateLimiter មាន constructor(maxRequests, windowMs) និងអនុគមន៍ allow(clientId, nowMs = Date.now()) ដែលតាមដានចំនួនសំណើតាម client ក្នុង Map កំណត់ឡើងវិញពេល nowMs - entry.windowStart >= windowMs និងត្រឡប់ { allowed, remaining }។',
        hint: 'រក្សា { count, windowStart } តាម clientId ក្នុង this.clients = new Map()។ បើ !entry || nowMs - entry.windowStart >= this.windowMs កំណត់ថ្មីជា { count: 1, windowStart: nowMs }។',
      },
      quiz: [
        {
          question:
            'តើភាពខុសគ្នារវាង HTTP status code 401 Unauthorized និង 403 Forbidden គឺជាអ្វី?',
          options: [
            '401 មានន័យថា server គាំង ហើយ 403 មានន័យថារក URL មិនឃើញ',
            '401 មានន័យថា client មិនទាន់ផ្ទៀងផ្ទាត់អត្តសញ្ញាណ (ខ្វះ/ខុស credentials) ចំណែក 403 មានន័យថាផ្ទៀងផ្ទាត់រួចតែគ្មានសិទ្ធិប្រើ',
            '401 សម្រាប់ GET ហើយ 403 សម្រាប់ POST',
            'វាមានន័យដូចគ្នាទាំងស្រុង',
          ],
          answer: 1,
          explanation:
            '401 បង្ហាញថាអ្នកប្រើមិនទាន់ login ឬ token ផុតកំណត់ ចំណែក 403 បង្ហាញថា server ស្គាល់អត្តសញ្ញាណហើយ តែតួនាទីគ្មានសិទ្ធិអនុវត្តសកម្មភាពនោះ។',
        },
        {
          question: 'តើ header Idempotency-Key ការពារ endpoint POST /payments ដោយរបៀបណា?',
          options: [
            'វាអ៊ិនគ្រីបទិន្នន័យ HTTP ដោយមិនបាច់ TLS',
            'វាអនុញ្ញាតឱ្យ server ស្គាល់សំណើដែល retry ដោយ key ដូចគ្នា ហើយត្រឡប់លទ្ធផលដើមវិញដោយមិនកាត់ប្រាក់ពីរដង',
            'វារំលង rate limiting សម្រាប់អ្នកប្រើ VIP',
            'វាបម្លែង POST ទៅជា GET ដោយស្វ័យប្រវត្តិ',
          ],
          answer: 1,
          explanation:
            'ប្រសិនបើ client សាកល្បងផ្ញើ POST /payments ម្ដងទៀតក្រោយ timeout ដោយប្រើ Idempotency-Key ដូចគ្នា server នឹងរកឃើញ key នោះហើយត្រឡប់លទ្ធផលដើមដោយមិនកាត់ប្រាក់ស្ទួនឡើយ។',
        },
      ],
    },
  },
}
