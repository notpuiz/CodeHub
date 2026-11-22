export const javaExpanded = [
  // =========================================================================
  // 1. STRINGS, IMMUTABILITY & STRINGBUILDER
  // =========================================================================
  {
    slug: 'java-strings-and-stringbuilder',
    level: 'beginner',
    insertAfter: 'java-basics',
    en: {
      title: 'Strings, Immutability & StringBuilder',
      duration: '13 min',
      summary:
        'Understand how Java stores immutable Strings in the String Pool, compare text safely with .equals(), build large text efficiently using StringBuilder, and format multi-line templates with modern text blocks.',
      objectives: [
        'Explain String immutability and the String Pool, and compare text reliably with .equals() or Objects.equals() instead of ==.',
        'Avoid O(n^2) concatenation overhead inside loops by assembling text with StringBuilder and String.join().',
        'Write clean multi-line templates using Java 15+ text blocks (""") and .formatted().',
      ],
      sections: [
        {
          id: 'string-pool-immutability-equality',
          heading: 'String Immutability, the String Pool & .equals() vs ==',
          body: [
            'In Java, a String is an immutable object: once created, its characters can never be modified in place. Methods like toUpperCase(), strip(), and replace() always return a brand-new String object while leaving the original untouched. Immutability makes Strings thread-safe by default and safe to reuse as keys inside hash-based collections.',
            'To save memory, the JVM keeps a special String Pool for string literals such as "Java". Two identical literals often point to the exact same pooled object, which tricks beginners into thinking == compares text. However, strings built at runtime—such as user input, parsed JSON, or new String("Java")—live in distinct heap objects, so == returns false even when their characters match identically.',
          ],
          points: [
            'Always compare String content with .equals(), .equalsIgnoreCase(), or null-safe Objects.equals(a, b).',
            'Calling "ADMIN".equals(role) puts the non-null literal first, preventing NullPointerException when role is null.',
            'Prefer strip() over trim() in modern Java (11+) because strip() handles Unicode whitespace properly.',
            'Remember to assign the return value of String methods—calling name.toUpperCase(); on its own discards the result.',
          ],
          table: {
            headers: ['Method', 'Purpose', 'Example', 'Result'],
            rows: [
              ['length()', 'Number of UTF-16 code units', '"CodeHub".length()', '7'],
              [
                'equals(other)',
                'Exact case-sensitive content check',
                '"Java".equals("Java")',
                'true',
              ],
              [
                'equalsIgnoreCase(other)',
                'Case-insensitive content check',
                '"java".equalsIgnoreCase("JAVA")',
                'true',
              ],
              [
                'substring(start, end)',
                'Extract slice [start, end)',
                '"Backend".substring(0, 4)',
                '"Back"',
              ],
              ['strip()', 'Remove leading & trailing Unicode spaces', '"  hi  ".strip()', '"hi"'],
              ['isBlank()', 'True if empty or only whitespace', '"   ".isBlank()', 'true'],
              ['contains(seq)', 'Check if substring is present', '"java21".contains("21")', 'true'],
              [
                'split(regex)',
                'Split text into a String[] array',
                '"a,b,c".split(",")',
                '["a", "b", "c"]',
              ],
            ],
          },
          example: {
            title: 'Comparing Strings Safely & Proving Immutability',
            language: 'java',
            code: `import java.util.Objects;

public class StringEqualityDemo {
    public static void main(String[] args) {
        String literalA = "Java";
        String literalB = "Java";
        String heapCopy = new String("Java");

        System.out.println("literal == literal : " + (literalA == literalB));
        System.out.println("literal == heap    : " + (literalA == heapCopy));
        System.out.println("equals()           : " + literalA.equals(heapCopy));

        String role = null;
        System.out.println("Null-safe equals   : " + Objects.equals(role, "ADMIN"));

        String raw = "  codehub  ";
        raw.toUpperCase(); // Return value ignored — original stays unchanged
        String cleaned = raw.strip().toUpperCase();
        System.out.println("Original: '" + raw + "' | Cleaned: '" + cleaned + "'");
    }
}`,
            output: `literal == literal : true
literal == heap    : false
equals()           : true
Null-safe equals   : false
Original: '  codehub  ' | Cleaned: 'CODEHUB'`,
          },
          warning:
            'Never use == to compare String values in Java! It checks whether two references point to the exact same memory address, which breaks unpredictably whenever strings come from user input, files, or network responses.',
        },
        {
          id: 'stringbuilder-and-loop-performance',
          heading: 'Building Text Efficiently with StringBuilder',
          body: [
            'Because String is immutable, writing result += item inside a loop allocates a fresh String and copies all previous characters on every single iteration. For 10,000 iterations, that turns a simple linear task into O(n^2) memory copying and creates thousands of short-lived objects for the garbage collector to clean up.',
            'StringBuilder solves this by maintaining a single resizable internal character buffer. Calling append(), insert(), delete(), or reverse() mutates that buffer directly in O(1) amortized time, and you convert the final buffer into a normal immutable String once at the end with toString().',
          ],
          points: [
            'Use StringBuilder whenever assembling text dynamically inside loops or across multiple conditional branches.',
            'Chain calls cleanly (sb.append("ID:").append(id).append("\\n")) because append() returns the same StringBuilder.',
            'Pass an estimated initial capacity (new StringBuilder(256)) when building large outputs to minimize internal array resizing.',
            'For simply joining a list or array with a delimiter, String.join(", ", items) is even shorter and just as fast.',
          ],
          example: {
            title: 'Generating a CSV Report with StringBuilder & String.join',
            language: 'java',
            code: `import java.util.List;

public class ReportBuilder {
    public static void main(String[] args) {
        List<String> courses = List.of("Java", "Spring", "SQL");

        StringBuilder csv = new StringBuilder(64);
        csv.append("index,course\\n");
        for (int i = 0; i < courses.size(); i++) {
            csv.append(i + 1)
               .append(',')
               .append(courses.get(i))
               .append('\\n');
        }

        System.out.print(csv.toString());
        System.out.println("Summary: " + String.join(" | ", courses));

        String reversed = new StringBuilder("JAVA").reverse().toString();
        System.out.println("Reversed: " + reversed);
    }
}`,
            output: `index,course
1,Java
2,Spring
3,SQL
Summary: Java | Spring | SQL
Reversed: AVAJ`,
          },
          tip: 'You rarely need StringBuffer in modern code. StringBuilder is faster because it skips synchronization overhead, and local builders are never shared across threads.',
        },
        {
          id: 'text-blocks-and-string-formatting',
          heading: 'Multi-Line Text Blocks (""") & .formatted()',
          body: [
            'Prior to Java 15, writing multi-line JSON, SQL queries, or email templates required cluttered + operators, escaped quotes (\\"), and manual \\n line breaks. Java text blocks open with three double quotes (""") followed immediately by a newline and let you write natural multi-line text without escaping regular double quotes.',
            'The Java compiler automatically strips common leading indentation based on the position of the closing """ delimiter, keeping your source code neatly aligned without leaking extra spaces into the runtime string. Pair text blocks with .formatted(...) (Java 15+) to substitute placeholders cleanly.',
          ],
          points: [
            'The opening """ must be followed by a line terminator; content starts on the next line.',
            'Align the closing """ with the leftmost column you want preserved—shift it further left to keep intentional indentation.',
            'Use .formatted(arg1, arg2) with %s (string), %d (integer), and %.2f (two-decimal float) for readable interpolation.',
            'Use a trailing backslash (\\) at the end of a line inside a text block to suppress the newline for long wrapped prose.',
          ],
          example: {
            title: 'JSON Payload & Summary Template with Text Blocks',
            language: 'java',
            code: `public class TextBlockDemo {
    public static void main(String[] args) {
        String user = "Dara";
        int completed = 6;
        double score = 94.5;

        String payload = """
                {
                  "student": "%s",
                  "lessonsCompleted": %d,
                  "averageScore": %.1f
                }
                """.formatted(user, completed, score);

        System.out.print(payload);
    }
}`,
            output: `{
  "student": "Dara",
  "lessonsCompleted": 6,
  "averageScore": 94.5
}`,
          },
          tip: 'Place the closing """ on its own line rather than at the end of the last text line when you want a trailing newline and clean visual alignment.',
        },
      ],
      challenge: {
        prompt:
          'Write a static method toUrlSlug(String title) that strips leading/trailing spaces, converts the title to lowercase, uses a StringBuilder to keep only lowercase ASCII letters and digits while replacing runs of spaces with a single hyphen (-), and returns the resulting slug (e.g., "  Java  21  Strings! " -> "java-21-strings").',
        hint: 'Loop over title.strip().toLowerCase().toCharArray(). Append letters/digits directly, and when you see a space, append "-" only if the StringBuilder is non-empty and does not already end with "-".',
        language: 'java',
        solutionCode: `public class SlugGenerator {
    public static String toUrlSlug(String title) {
        if (title == null || title.isBlank()) {
            return "";
        }
        StringBuilder slug = new StringBuilder(title.length());
        String normalized = title.strip().toLowerCase();

        for (int i = 0; i < normalized.length(); i++) {
            char ch = normalized.charAt(i);
            if (Character.isLetterOrDigit(ch)) {
                slug.append(ch);
            } else if (Character.isWhitespace(ch) || ch == '-') {
                if (!slug.isEmpty() && slug.charAt(slug.length() - 1) != '-') {
                    slug.append('-');
                }
            }
        }
        if (!slug.isEmpty() && slug.charAt(slug.length() - 1) == '-') {
            slug.deleteCharAt(slug.length() - 1);
        }
        return slug.toString();
    }

    public static void main(String[] args) {
        System.out.println(toUrlSlug("  Java  21  Strings! "));
    }
}`,
      },
      quiz: [
        {
          question: 'Why does new String("hello") == "hello" evaluate to false in Java?',
          options: [
            'String literals are mutable while new String() objects are immutable.',
            '== compares object memory references, and new String() creates a distinct object outside the String Pool.',
            'Java does not allow comparing two Strings with == at compile time.',
            'The two strings have different character encodings.',
          ],
          answer: 1,
          explanation:
            'The == operator checks reference identity. A string literal lives in the String Pool, whereas new String("hello") forces a new heap object; always use .equals() to compare characters.',
        },
        {
          question: 'Why is StringBuilder preferred over using += on a String inside a large loop?',
          options: [
            'StringBuilder automatically encrypts text for security.',
            'String does not support the += operator inside for loops.',
            'StringBuilder mutates an internal buffer in place, avoiding O(n^2) temporary String allocations and copies.',
            'StringBuilder stores characters directly on the CPU stack.',
          ],
          answer: 2,
          explanation:
            'Because String is immutable, repeated += inside a loop copies the accumulated text into a brand-new String each iteration. StringBuilder appends into a single resizable buffer.',
        },
      ],
    },
    km: {
      title: 'Strings, ភាពមិនអាចកែប្រែបាន និង StringBuilder',
      duration: '13 នាទី',
      summary:
        'ស្វែងយល់ពីរបៀបដែល Java រក្សាទុក String មិនអាចកែប្រែបានក្នុង String Pool ការប្រៀបធៀបអត្ថបទដោយសុវត្ថិភាពជាមួយ .equals() ការផ្គុំអត្ថបទលឿនដោយ StringBuilder និងការប្រើ text blocks (""") សម្រាប់អត្ថបទច្រើនបន្ទាត់។',
      objectives: [
        'ពន្យល់ពីភាពមិនអាចកែប្រែបាន (immutability) នៃ String និង String Pool ព្រមទាំងប្រៀបធៀបអត្ថបទត្រឹមត្រូវដោយ .equals() ឬ Objects.equals() ជំនួស ==។',
        'ជៀសវាងការចំណាយអង្គចងចាំ O(n^2) ក្នុងរង្វិលជុំ ដោយប្រើ StringBuilder និង String.join()។',
        'សរសេរគំរូអត្ថបទច្រើនបន្ទាត់យ៉ាងស្អាតដោយ Java 15+ text blocks (""") និង .formatted()។',
      ],
      sections: [
        {
          id: 'string-pool-immutability-equality',
          heading: 'ភាពមិនអាចកែប្រែបាននៃ String, String Pool និង .equals() ទល់នឹង ==',
          body: [
            'ក្នុង Java វត្ថុ String គឺមិនអាចកែប្រែបានទេ (immutable)៖ ពេលបង្កើតរួច តួអក្សរខាងក្នុងមិនអាចផ្លាស់ប្ដូរនៅនឹងកន្លែងឡើយ។ Method ដូចជា toUpperCase(), strip() និង replace() តែងបង្កើត String ថ្មីមួយហើយទុក String ដើមនៅដដែល។ លក្ខណៈនេះធ្វើឱ្យ String មានសុវត្ថិភាពសម្រាប់ thread និងល្អឥតខ្ចោះសម្រាប់ធ្វើជា key ក្នុង HashMap។',
            'ដើម្បីសន្សំអង្គចងចាំ JVM រក្សា String Pool សម្រាប់អត្ថបទថេរ (literals) ដូចជា "Java"។ Literal ដូចគ្នាពីរច្រើនចង្អុលទៅទីតាំងអង្គចងចាំតែមួយ ដែលអាចបន្លំអ្នកចាប់ផ្ដើមថ្មីឱ្យស្មានថា == ប្រៀបធៀបខ្លឹមសារ។ ប៉ុន្តែ String ដែលបង្កើតពេលដំណើរការ—ដូចជាការបញ្ចូលពីអ្នកប្រើ ឬ new String("Java")—ស្ថិតក្នុងវត្ថុ heap ផ្សេងគ្នា ដូច្នេះ == ត្រឡប់ false ទោះតួអក្សរដូចគ្នាក៏ដោយ។',
          ],
          points: [
            'ប្រៀបធៀបខ្លឹមសារ String ជានិច្ចដោយ .equals(), .equalsIgnoreCase() ឬ Objects.equals(a, b) ដែលសុវត្ថិភាពពី null។',
            'ការសរសេរ "ADMIN".equals(role) ដាក់ literal មុន ជួយការពារកុំឱ្យកើត NullPointerException ពេល role ជា null។',
            'ប្រើ strip() ជំនួស trim() ក្នុង Java 11+ ព្រោះ strip() លុបចន្លោះទំនេរ Unicode បានត្រឹមត្រូវ។',
            'ចងចាំទទួលតម្លៃត្រឡប់ពី method របស់ String ព្រោះការហៅ name.toUpperCase(); ទទេមិនកែប្រែ name ឡើយ។',
          ],
          table: {
            headers: ['Method', 'តួនាទី', 'ឧទាហរណ៍', 'លទ្ធផល'],
            rows: [
              ['length()', 'រាប់ចំនួនតួអក្សរ UTF-16', '"CodeHub".length()', '7'],
              ['equals(other)', 'ប្រៀបធៀបខ្លឹមសារគិតអក្សរធំ-តូច', '"Java".equals("Java")', 'true'],
              [
                'equalsIgnoreCase(other)',
                'ប្រៀបធៀបមិនគិតអក្សរធំ-តូច',
                '"java".equalsIgnoreCase("JAVA")',
                'true',
              ],
              [
                'substring(start, end)',
                'កាត់យកផ្នែក [start, end)',
                '"Backend".substring(0, 4)',
                '"Back"',
              ],
              ['strip()', 'លុបចន្លោះក្បាលនិងចុង (Unicode)', '"  hi  ".strip()', '"hi"'],
              ['isBlank()', 'ពិតបើទទេ ឬមានតែចន្លោះ', '"   ".isBlank()', 'true'],
              ['contains(seq)', 'ពិនិត្យថាមានពាក្យរងឬអត់', '"java21".contains("21")', 'true'],
              ['split(regex)', 'បំបែកអត្ថបទជា String[]', '"a,b,c".split(",")', '["a", "b", "c"]'],
            ],
          },
          exampleTitle: 'ការប្រៀបធៀប String ដោយសុវត្ថិភាព និងការបង្ហាញភាពមិនអាចកែប្រែបាន',
          warning:
            'កុំប្រើ == ដើម្បីប្រៀបធៀបតម្លៃ String ក្នុង Java ឱ្យសោះ! វាពិនិត្យតែទីតាំងអង្គចងចាំប៉ុណ្ណោះ ហើយនឹងបរាជ័យភ្លាមពេលទិន្នន័យមកពីអ្នកប្រើ ឯកសារ ឬបណ្ដាញ។',
        },
        {
          id: 'stringbuilder-and-loop-performance',
          heading: 'ការផ្គុំអត្ថបទឱ្យមានប្រសិទ្ធភាពដោយ StringBuilder',
          body: [
            'ដោយសារ String មិនអាចកែប្រែបាន ការសរសេរ result += item ក្នុងរង្វិលជុំនឹងបង្កើត String ថ្មី និងចម្លងតួអក្សរចាស់ទាំងអស់រាល់ជុំ។ សម្រាប់ 10,000 ជុំ វាបម្លែងកិច្ចការសាមញ្ញទៅជាការចម្លងអង្គចងចាំ O(n^2) និងបន្ថែមបន្ទុកធ្ងន់ដល់ garbage collector។',
            'StringBuilder ដោះស្រាយបញ្ហានេះដោយរក្សា buffer តួអក្សរខាងក្នុងតែមួយដែលអាចពង្រីកបាន។ ការហៅ append(), insert(), delete() ឬ reverse() កែប្រែផ្ទាល់លើ buffer នោះក្នុងពេល O(1) ជាមធ្យម រួចបម្លែងជា String ធម្មតាតែម្ដងនៅចុងបញ្ចប់ដោយ toString()។',
          ],
          points: [
            'ប្រើ StringBuilder រាល់ពេលផ្គុំអត្ថបទក្នុងរង្វិលជុំ ឬឆ្លងកាត់លក្ខខណ្ឌច្រើន។',
            'អាចតភ្ជាប់ការហៅជាខ្សែ (sb.append("ID:").append(id)) ព្រោះ append() ត្រឡប់ StringBuilder ដដែល។',
            'កំណត់ទំហំដំបូង (new StringBuilder(256)) ពេលបង្កើតអត្ថបទធំ ដើម្បីកាត់បន្ថយការពង្រីក array ខាងក្នុង។',
            'បើគ្រាន់តែភ្ជាប់ធាតុក្នុង List ឬ array ដោយសញ្ញាខណ្ឌ ប្រើ String.join(", ", items) ខ្លី និងលឿនដូចគ្នា។',
          ],
          exampleTitle: 'ការបង្កើតរបាយការណ៍ CSV ដោយ StringBuilder និង String.join',
          tip: 'ក្នុងកូដទំនើបកម្រត្រូវការ StringBuffer ណាស់។ StringBuilder លឿនជាងព្រោះមិនមានបន្ទុក synchronization ហើយវាជាអថេរមូលដ្ឋានដែលមិនចែករំលែករវាង thread ទេ។',
        },
        {
          id: 'text-blocks-and-string-formatting',
          heading: 'Text Blocks ច្រើនបន្ទាត់ (""") និង .formatted()',
          body: [
            'មុន Java 15 ការសរសេរ JSON, SQL ឬគំរូអ៊ីមែលច្រើនបន្ទាត់ត្រូវការសញ្ញា + រញ៉េរញ៉ៃ ការគេចសញ្ញាសម្រង់ (\\") និង \\n គ្រប់បន្ទាត់។ Text blocks ចាប់ផ្ដើមដោយសញ្ញាសម្រង់បី (""") តាមដោយការចុះបន្ទាត់ ហើយអនុញ្ញាតឱ្យសរសេរអត្ថបទច្រើនបន្ទាត់ធម្មជាតិដោយមិនបាច់គេចសញ្ញាសម្រង់ទ្វេធម្មតាទេ។',
            'Compiler របស់ Java កាត់ចោលចន្លោះចូលបន្ទាត់រួមដោយស្វ័យប្រវត្តិផ្អែកតាមទីតាំង """ បិទ ដែលជួយឱ្យកូដស្អាតដោយមិនបន្ថែមចន្លោះលើសពេលដំណើរការ។ ផ្គួបជាមួយ .formatted(...) ដើម្បីជំនួសតម្លៃអថេរយ៉ាងងាយអាន។',
          ],
          points: [
            'សញ្ញាបើក """ ត្រូវតែតាមដោយការចុះបន្ទាត់ ហើយខ្លឹមសារចាប់ផ្ដើមនៅបន្ទាត់បន្ទាប់។',
            'តម្រឹម """ បិទតាមគែមខាងឆ្វេងដែលអ្នកចង់រក្សា។',
            'ប្រើ .formatted(arg1, arg2) ជាមួយ %s (អត្ថបទ), %d (ចំនួនគត់) និង %.2f (ទសភាគ ២ ខ្ទង់)។',
            'ប្រើសញ្ញា \\ នៅចុងបន្ទាត់ក្នុង text block ដើម្បីភ្ជាប់បន្ទាត់វែងដោយមិនដាក់ newline ថ្មី។',
          ],
          exampleTitle: 'គំរូ JSON ដោយ Text Blocks និង .formatted()',
          tip: 'ដាក់ """ បិទលើបន្ទាត់ផ្ទាល់ខ្លួននៅពេលអ្នកចង់បាន newline នៅចុងអត្ថបទ និងការតម្រឹមស្អាតងាយមើល។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ static method ឈ្មោះ toUrlSlug(String title) ដែលលុបចន្លោះក្បាល-ចុង បម្លែងជាអក្សរតូច ប្រើ StringBuilder រក្សាតែអក្សរនិងលេខ ហើយជំនួសចន្លោះជាប់គ្នាដោយសញ្ញាដក (-) តែមួយ (ឧ. "  Java  21  Strings! " -> "java-21-strings")។',
        hint: 'រត់រង្វិលជុំលើ title.strip().toLowerCase()។ បន្ថែមអក្សរ/លេខផ្ទាល់ ហើយពេលជួបចន្លោះ ទើបបន្ថែម "-" បើ StringBuilder មិនទទេ និងតួចុងក្រោយមិនទាន់ជា "-"។',
      },
      quiz: [
        {
          question: 'ហេតុអ្វីបានជា new String("hello") == "hello" ត្រឡប់លទ្ធផល false ក្នុង Java?',
          options: [
            'String literal អាចកែប្រែបាន ចំណែក new String() មិនអាចកែប្រែបានទេ។',
            '== ប្រៀបធៀបអាសយដ្ឋានអង្គចងចាំ ហើយ new String() បង្កើតវត្ថុថ្មីដាច់ដោយឡែកក្រៅ String Pool។',
            'Java មិនអនុញ្ញាតឱ្យប្រើ == ជាមួយ String ពេល compile ទេ។',
            'String ទាំងពីរមានការអ៊ិនកូដតួអក្សរខុសគ្នា។',
          ],
          answer: 1,
          explanation:
            'សញ្ញា == ពិនិត្យអត្តសញ្ញាណអាសយដ្ឋានវត្ថុ។ Literal ស្ថិតក្នុង String Pool រីឯ new String("hello") បង្កើតវត្ថុថ្មីលើ heap ដូច្នេះត្រូវប្រើ .equals() ជានិច្ច។',
        },
        {
          question: 'ហេតុអ្វីបានជាគេជ្រើសរើស StringBuilder ជំនួស += លើ String ក្នុងរង្វិលជុំធំ?',
          options: [
            'StringBuilder អ៊ិនគ្រីបអត្ថបទដោយស្វ័យប្រវត្តិ។',
            'String មិនស្គាល់សញ្ញា += ក្នុងរង្វិលជុំ for ទេ។',
            'StringBuilder កែប្រែ buffer ខាងក្នុងនៅនឹងកន្លែង ជៀសវាងការបង្កើតនិងចម្លង String ថ្មី O(n^2) ដង។',
            'StringBuilder រក្សាទុកតួអក្សរផ្ទាល់លើ CPU stack។',
          ],
          answer: 2,
          explanation:
            'ដោយសារ String មិនអាចកែប្រែបាន ការប្រើ += ក្នុងរង្វិលជុំចម្លងអត្ថបទចាស់ទៅវត្ថុថ្មីរាល់ជុំ។ StringBuilder បន្ថែមចូល buffer តែមួយបានយ៉ាងលឿន។',
        },
      ],
    },
  },

  // =========================================================================
  // 2. ARRAYS, ARRAYLIST & ENHANCED FOR LOOPS
  // =========================================================================
  {
    slug: 'java-arrays-and-arraylist',
    level: 'beginner',
    insertAfter: 'java-control-flow-methods',
    en: {
      title: 'Arrays, ArrayList & Enhanced for Loops',
      duration: '13 min',
      summary:
        'Work confidently with fixed-size Java arrays, utility methods in java.util.Arrays, dynamically resizable ArrayList<E> collections, and clean enhanced for-each iteration.',
      objectives: [
        'Declare, initialize, sort, and copy fixed-size arrays using java.util.Arrays without index-out-of-bounds bugs.',
        'Store and manipulate dynamic sequences with List<E> and ArrayList<E> using wrapper types where needed.',
        'Choose between classic indexed loops, enhanced for-each loops, and removeIf() for safe collection filtering.',
      ],
      sections: [
        {
          id: 'fixed-arrays-and-utilities',
          heading: 'Fixed-Size Arrays & java.util.Arrays',
          body: [
            'A Java array stores a fixed number of elements of the exact same type in contiguous memory, accessed by zero-based indices from 0 to arr.length - 1. Unlike collections, arrays can store raw primitives (int[], double[], boolean[]) directly with minimal memory overhead, making them fast for numeric grids, buffers, and performance-critical algorithms.',
            'Once an array is created, its length never changes—accessing arr.length reads a final field (with no parentheses). The java.util.Arrays helper class fills the gap with essential operations: Arrays.toString() for readable printing, Arrays.sort() for in-place sorting, Arrays.copyOf() for resizing into a new array, and Arrays.equals() for element-by-element comparison.',
          ],
          points: [
            'Array length is a field (scores.length), whereas String uses a method (str.length()) and List uses list.size().',
            'Uninitialized array slots receive default values: 0 for numbers, false for booleans, and null for object references.',
            'Use Arrays.toString(arr) for 1D arrays and Arrays.deepToString(matrix) for 2D arrays when printing.',
            'Arrays.binarySearch(arr, target) requires the array to be sorted first with Arrays.sort(arr).',
          ],
          table: {
            headers: ['Feature', 'Fixed Array (T[])', 'ArrayList<T>'],
            rows: [
              ['Size', 'Fixed at creation', 'Grows & shrinks dynamically'],
              [
                'Primitive support',
                'Direct (int[], double[])',
                'Wrapper types only (ArrayList<Integer>)',
              ],
              ['Length check', 'arr.length (field)', 'list.size() (method)'],
              ['Element access', 'arr[i] / arr[i] = val', 'list.get(i) / list.set(i, val)'],
              ['Sorting', 'Arrays.sort(arr)', 'list.sort(Comparator) or Collections.sort(list)'],
              ['Readable print', 'Arrays.toString(arr)', 'System.out.println(list) works directly'],
            ],
          },
          example: {
            title: 'Sorting, Slicing & Printing Arrays with java.util.Arrays',
            language: 'java',
            code: `import java.util.Arrays;

public class ArrayUtilitiesDemo {
    public static void main(String[] args) {
        int[] scores = {78, 95, 64, 88, 91};
        Arrays.sort(scores);

        System.out.println("Sorted scores : " + Arrays.toString(scores));
        System.out.println("Lowest / High : " + scores[0] + " / " + scores[scores.length - 1]);

        int[] topThree = Arrays.copyOfRange(scores, scores.length - 3, scores.length);
        System.out.println("Top 3 scores  : " + Arrays.toString(topThree));

        int idx = Arrays.binarySearch(scores, 88);
        System.out.println("Index of 88   : " + idx);
    }
}`,
            output: `Sorted scores : [64, 78, 88, 91, 95]
Lowest / High : 64 / 95
Top 3 scores  : [88, 91, 95]
Index of 88   : 2`,
          },
          warning:
            'Calling System.out.println(scores) directly on an array prints an unreadable type-and-hash string like [I@4517d9a3 instead of the elements. Always wrap arrays in Arrays.toString(scores), and never access index scores[scores.length]—the last valid index is scores.length - 1.',
        },
        {
          id: 'dynamic-arraylist-operations',
          heading: 'Dynamic Collections with ArrayList<E>',
          body: [
            'Most real-world lists grow and shrink as users add items, fetch API pages, or filter results. ArrayList<E> wraps a resizable internal array behind the List<E> interface, automatically doubling capacity when needed while keeping O(1) indexed reads via get(i) and O(1) amortized appends via add(item).',
            'Because Java generics work only with reference types, you declare List<Integer> rather than List<int>; Java autoboxes primitives when adding and unboxes them when reading. Declare variables using the List<E> interface on the left (List<String> tasks = new ArrayList<>();) so your code stays flexible and decoupled from one concrete list class.',
          ],
          points: [
            'Use new ArrayList<>(List.of("A", "B")) when you want a mutable copy seeded from an immutable List.of(...) literal.',
            'Be careful with remove() on List<Integer>: list.remove(1) removes index 1, whereas list.remove(Integer.valueOf(1)) removes the value 1.',
            'List.of(...) returns an unmodifiable list—calling add() or set() on it throws UnsupportedOperationException.',
            'Use list.sort(Comparator.naturalOrder()) or Comparator.reverseOrder() for clean in-place sorting.',
          ],
          example: {
            title: 'Managing Tasks Dynamically with List & ArrayList',
            language: 'java',
            code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class TaskListDemo {
    public static void main(String[] args) {
        List<String> tasks = new ArrayList<>();
        tasks.add("Write unit tests");
        tasks.add("Build REST API");
        tasks.add("Deploy staging");

        tasks.set(0, "Write integration tests");
        tasks.remove("Deploy staging");
        tasks.add("Add CI pipeline");
        tasks.sort(Comparator.naturalOrder());

        System.out.println("Tasks (" + tasks.size() + "): " + tasks);
        System.out.println("Has API task? " + tasks.contains("Build REST API"));
    }
}`,
            output: `Tasks (3): [Add CI pipeline, Build REST API, Write integration tests]
Has API task? true`,
          },
          tip: 'When you know the approximate number of elements ahead of time (for example, converting a 500-element array), pass the capacity to new ArrayList<>(500) to avoid repeated internal array copies.',
        },
        {
          id: 'enhanced-for-and-safe-iteration',
          heading: 'Enhanced for-each Loops & Safe Element Removal',
          body: [
            'The enhanced for loop—for (ElementType item : collectionOrArray)—eliminates off-by-one index bugs whenever you simply want to inspect every element in order. It works identically across arrays, ArrayList, Set, and any class implementing Iterable<T>.',
            'Keep a classic indexed for loop when you need the current index, want to traverse backwards, or must overwrite slots in an array. Most importantly, never add or remove elements from an ArrayList inside an enhanced for loop: doing so invalidates the hidden iterator and immediately throws ConcurrentModificationException. Use list.removeIf(...) or an explicit Iterator instead.',
          ],
          points: [
            'Enhanced for loops give you a read-only local variable reference to each element; reassigning the loop variable does not replace the slot in the array or list.',
            'Use list.removeIf(item -> condition) for concise, single-pass O(n) filtering without iterator errors.',
            'Classic indexed loops remain essential when comparing neighbors (arr[i] and arr[i + 1]) or mutating elements in place.',
          ],
          example: {
            title: 'Iterating with Enhanced for & Filtering Safely with removeIf',
            language: 'java',
            code: `import java.util.ArrayList;
import java.util.List;

public class IterationSafetyDemo {
    public static void main(String[] args) {
        double[] prices = {12.50, 8.00, 19.50};
        double total = 0.0;
        for (double price : prices) {
            total += price;
        }
        System.out.printf("Cart total: $%.2f%n", total);

        List<String> tags = new ArrayList<>(List.of("java", "", "backend", "  ", "nio"));
        tags.removeIf(String::isBlank);

        for (String tag : tags) {
            System.out.println("Tag: #" + tag);
        }
    }
}`,
            output: `Cart total: $40.00
Tag: #java
Tag: #backend
Tag: #nio`,
          },
          warning:
            'Calling tags.remove(tag) inside for (String tag : tags) throws ConcurrentModificationException at runtime. Always use tags.removeIf(...) or Iterator.remove() when deleting while traversing.',
        },
      ],
      challenge: {
        prompt:
          'Write a static method filterPassingScores(int[] scores, int threshold) that loops over the primitive array with an enhanced for loop, collects every score >= threshold into an ArrayList<Integer>, sorts the list in ascending order, and returns it.',
        hint: 'Create List<Integer> passing = new ArrayList<>();, loop for (int s : scores), add scores >= threshold, then call passing.sort(Comparator.naturalOrder()).',
        language: 'java',
        solutionCode: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class ScoreFilter {
    public static List<Integer> filterPassingScores(int[] scores, int threshold) {
        List<Integer> passing = new ArrayList<>();
        for (int score : scores) {
            if (score >= threshold) {
                passing.add(score);
            }
        }
        passing.sort(Comparator.naturalOrder());
        return passing;
    }

    public static void main(String[] args) {
        int[] raw = {55, 82, 49, 91, 70, 68};
        System.out.println(filterPassingScores(raw, 70));
    }
}`,
      },
      quiz: [
        {
          question: 'Why does ArrayList<int> fail to compile in Java?',
          options: [
            'ArrayList can only store Strings.',
            'Java generics require reference types, so you must use the wrapper class ArrayList<Integer>.',
            'int values cannot be sorted in collections.',
            'ArrayList has a fixed size for numeric types.',
          ],
          answer: 1,
          explanation:
            'Type arguments for Java generics must be reference types (objects). Use wrapper classes such as Integer, Double, or Boolean (e.g., List<Integer>).',
        },
        {
          question:
            'What happens if you call list.remove(item) directly inside an enhanced for-each loop over an ArrayList?',
          options: [
            'The item is removed silently with no side effects.',
            'The list automatically converts into a fixed array.',
            'Java throws ConcurrentModificationException because the list was structurally modified during iteration.',
            'Only the last element is removed.',
          ],
          answer: 2,
          explanation:
            'Modifying an ArrayList directly while iterating with an enhanced for loop invalidates its fail-fast iterator and throws ConcurrentModificationException. Use removeIf() or Iterator.remove() instead.',
        },
      ],
    },
    km: {
      title: 'Arrays, ArrayList និងរង្វិលជុំ Enhanced for',
      duration: '13 នាទី',
      summary:
        'ស្ទាត់ជំនាញការប្រើប្រាស់ array ទំហំថេរ, មុខងារជំនួយក្នុង java.util.Arrays, ការគ្រប់គ្រងបញ្ជីបត់បែន ArrayList<E> និងការរត់រង្វិលជុំ enhanced for ប្រកបដោយសុវត្ថិភាព។',
      objectives: [
        'ប្រកាស ចាប់ផ្ដើម តម្រៀប និងចម្លង array ទំហំថេរដោយ java.util.Arrays ដោយមិនឱ្យលើសព្រំដែនលិបិក្រម។',
        'រក្សាទុក និងកែប្រែបញ្ជីទិន្នន័យដែលផ្លាស់ប្ដូរទំហំបានជាមួយ List<E> និង ArrayList<E>។',
        'ជ្រើសរើសរវាងរង្វិលជុំលិបិក្រមធម្មតា enhanced for និង removeIf() ដើម្បីលុបធាតុដោយសុវត្ថិភាព។',
      ],
      sections: [
        {
          id: 'fixed-arrays-and-utilities',
          heading: 'Array ទំហំថេរ និង java.util.Arrays',
          body: [
            'Array ក្នុង Java រក្សាទុកធាតុប្រភេទដូចគ្នាចំនួនថេរក្នុងអង្គចងចាំជាប់គ្នា ដោយប្រើលិបិក្រមចាប់ពី 0 ដល់ arr.length - 1។ ខុសពី collections, array អាចផ្ទុក primitive (int[], double[], boolean[]) ដោយផ្ទាល់ ធ្វើឱ្យវាលឿន និងសន្សំអង្គចងចាំ។',
            'ពេលបង្កើតរួច ទំហំ array មិនអាចផ្លាស់ប្ដូរបានទេ ហើយ arr.length គឺជា field (មិនមានវង់ក្រចក)។ ថ្នាក់ជំនួយ java.util.Arrays ផ្ដល់មុខងារសំខាន់ៗដូចជា Arrays.toString() សម្រាប់បោះពុម្ព, Arrays.sort() សម្រាប់តម្រៀប, Arrays.copyOf() សម្រាប់ចម្លងពង្រីក និង Arrays.equals() សម្រាប់ប្រៀបធៀបធាតុម្ដងមួយៗ។',
          ],
          points: [
            'Array ប្រើ scores.length (field), String ប្រើ str.length() (method) និង List ប្រើ list.size()។',
            'ធាតុ array ដែលមិនទាន់ផ្ដល់តម្លៃទទួលតម្លៃលំនាំដើម៖ 0 សម្រាប់លេខ, false សម្រាប់ boolean និង null សម្រាប់ object។',
            'ប្រើ Arrays.toString(arr) សម្រាប់ array 1D និង Arrays.deepToString(matrix) សម្រាប់ array 2D។',
            'Arrays.binarySearch(arr, target) តម្រូវឱ្យតម្រៀប array ជាមុនសិនដោយ Arrays.sort(arr)។',
          ],
          table: {
            headers: ['លក្ខណៈ', 'Array ទំហំថេរ (T[])', 'ArrayList<T>'],
            rows: [
              ['ទំហំ', 'ថេរពេលបង្កើត', 'ពង្រីក និងបង្រួមដោយស្វ័យប្រវត្តិ'],
              [
                'គាំទ្រ Primitive',
                'ផ្ទាល់ (int[], double[])',
                'ប្រើ Wrapper ប៉ុណ្ណោះ (ArrayList<Integer>)',
              ],
              ['ពិនិត្យចំនួនធាតុ', 'arr.length (field)', 'list.size() (method)'],
              ['ចូលដំណើរការធាតុ', 'arr[i] / arr[i] = val', 'list.get(i) / list.set(i, val)'],
              ['ការតម្រៀប', 'Arrays.sort(arr)', 'list.sort(Comparator) ឬ Collections.sort(list)'],
              ['ការបោះពុម្ពងាយអាន', 'Arrays.toString(arr)', 'System.out.println(list) ផ្ទាល់បាន'],
            ],
          },
          exampleTitle: 'ការតម្រៀប កាត់យកផ្នែក និងបោះពុម្ព Array ដោយ java.util.Arrays',
          warning:
            'ការហៅ System.out.println(scores) ផ្ទាល់លើ array នឹងបង្ហាញអក្សរពិបាកអានដូច [I@4517d9a3 ជំនួសធាតុខាងក្នុង។ សូមប្រើ Arrays.toString(scores) ហើយកុំចូលលិបិក្រម scores[scores.length] ព្រោះលិបិក្រមចុងក្រោយគឺ scores.length - 1។',
        },
        {
          id: 'dynamic-arraylist-operations',
          heading: 'បញ្ជីបត់បែនទំហំជាមួយ ArrayList<E>',
          body: [
            'បញ្ជីទិន្នន័យពិតប្រាកដភាគច្រើនផ្លាស់ប្ដូរទំហំពេលអ្នកប្រើបន្ថែម ឬលុបធាតុ។ ArrayList<E> រុំ array ដែលពង្រីកខ្លួនឯងបាននៅក្រោយ interface List<E> ដោយរក្សាល្បឿនអានតាមលិបិក្រម O(1) តាម get(i) និងការបន្ថែមចុងបញ្ជី O(1) ជាមធ្យមតាម add(item)។',
            'ដោយសារ Java generics ទទួលតែប្រភេទ object អ្នកត្រូវសរសេរ List<Integer> ជំនួស List<int> ហើយ Java នឹងបម្លែង autoboxing/unboxing ដោយស្វ័យប្រវត្តិ។ គួរប្រកាសអថេរជា interface List<E> នៅខាងឆ្វេង ដើម្បីឱ្យកូដបត់បែនងាយប្ដូរការអនុវត្តនៅពេលក្រោយ។',
          ],
          points: [
            'ប្រើ new ArrayList<>(List.of("A", "B")) ដើម្បីបង្កើតបញ្ជីអាចកែប្រែបានពី List.of(...)។',
            'ប្រយ័ត្ន remove() លើ List<Integer>៖ list.remove(1) លុបលិបិក្រមទី 1 រីឯ list.remove(Integer.valueOf(1)) លុបតម្លៃ 1។',
            'List.of(...) ត្រឡប់បញ្ជីមិនអាចកែប្រែបាន ការហៅ add() ឬ set() នឹងបោះ UnsupportedOperationException។',
            'ប្រើ list.sort(Comparator.naturalOrder()) ឬ Comparator.reverseOrder() ដើម្បីតម្រៀបយ៉ាងស្អាត។',
          ],
          exampleTitle: 'ការគ្រប់គ្រងបញ្ជីការងារដោយ List និង ArrayList',
          tip: 'បើដឹងទំហំប្រហាក់ប្រហែលជាមុន (ឧ. 500 ធាតុ) សូមផ្ដល់ទំហំដំបូង new ArrayList<>(500) ដើម្បីជៀសវាងការចម្លង array ខាងក្នុងច្រើនដង។',
        },
        {
          id: 'enhanced-for-and-safe-iteration',
          heading: 'រង្វិលជុំ Enhanced for និងការលុបធាតុដោយសុវត្ថិភាព',
          body: [
            'រង្វិលជុំ enhanced for — for (ElementType item : collectionOrArray) — ជួយលុបបំបាត់កំហុសលិបិក្រមលើស-ខ្វះ នៅពេលអ្នកគ្រាន់តែចង់ពិនិត្យធាតុទាំងអស់តាមលំដាប់។ វាដំណើរការដូចគ្នាលើ arrays, ArrayList, Set និង Iterable<T> ទាំងអស់។',
            'ទុករង្វិលជុំ for មានលិបិក្រមនៅពេលអ្នកត្រូវការលេខលិបិក្រម រត់ថយក្រោយ ឬកែប្រែធាតុក្នុង array។ សំខាន់បំផុត កុំលុបឬបន្ថែមធាតុចូល ArrayList ផ្ទាល់ក្នុង enhanced for ព្រោះវានឹងបោះ ConcurrentModificationException ភ្លាមៗ—សូមប្រើ list.removeIf(...) ឬ Iterator ជំនួសវិញ។',
          ],
          points: [
            'អថេរក្នុង enhanced for គ្រាន់តែជាតម្លៃចម្លងក្នុងជុំនោះ ការប្ដូរតម្លៃវាមិនកែប្រែធាតុក្នុង array ឬ list ទេ។',
            'ប្រើ list.removeIf(item -> condition) ដើម្បីច្រោះលុបធាតុក្នុងមួយជុំ O(n) យ៉ាងខ្លី និងសុវត្ថិភាព។',
            'ប្រើរង្វិលជុំលិបិក្រមនៅពេលត្រូវប្រៀបធៀបធាតុជាប់គ្នា (arr[i] និង arr[i + 1])។',
          ],
          exampleTitle: 'ការរត់រង្វិលជុំ Enhanced for និងការច្រោះដោយ removeIf',
          warning:
            'ការហៅ tags.remove(tag) ក្នុង for (String tag : tags) នឹងបង្ក ConcurrentModificationException ពេលដំណើរការ។ ប្រើ tags.removeIf(...) ឬ Iterator.remove() ជានិច្ចពេលលុបធាតុអំឡុងពេលរត់រង្វិលជុំ។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ static method ឈ្មោះ filterPassingScores(int[] scores, int threshold) ដែលប្រើរង្វិលជុំ enhanced for ដើម្បីរើសយកពិន្ទុ >= threshold ចូលក្នុង ArrayList<Integer>, តម្រៀបពីតូចទៅធំ រួចត្រឡប់បញ្ជីនោះ។',
        hint: 'បង្កើត List<Integer> passing = new ArrayList<>(); រត់ for (int s : scores) បន្ថែមពិន្ទុ >= threshold ហើយហៅ passing.sort(Comparator.naturalOrder())។',
      },
      quiz: [
        {
          question: 'ហេតុអ្វីបានជា ArrayList<int> មិនអាច compile បានក្នុង Java?',
          options: [
            'ArrayList អាចរក្សាទុកតែ String ប៉ុណ្ណោះ។',
            'Java generics តម្រូវឱ្យប្រើប្រភេទ object ដូច្នេះត្រូវប្រើ wrapper class គឺ ArrayList<Integer>។',
            'តម្លៃ int មិនអាចតម្រៀបក្នុង collections បានទេ។',
            'ArrayList មានទំហំថេរសម្រាប់ប្រភេទលេខ។',
          ],
          answer: 1,
          explanation:
            'Type argument នៃ Java generics ត្រូវតែជា reference type។ សូមប្រើ wrapper class ដូចជា Integer, Double ឬ Boolean (ឧ. List<Integer>)។',
        },
        {
          question:
            'តើមានអ្វីកើតឡើងបើអ្នកហៅ list.remove(item) ផ្ទាល់ក្នុងរង្វិលជុំ enhanced for លើ ArrayList?',
          options: [
            'ធាតុត្រូវបានលុបដោយស្ងាត់ៗគ្មានបញ្ហា។',
            'List ត្រូវបានបម្លែងជា array ទំហំថេរដោយស្វ័យប្រវត្តិ។',
            'Java បោះ ConcurrentModificationException ព្រោះរចនាសម្ព័ន្ធ list ត្រូវបានកែប្រែអំឡុងពេលរត់ iterator។',
            'មានតែធាតុចុងក្រោយប៉ុណ្ណោះត្រូវបានលុប។',
          ],
          answer: 2,
          explanation:
            'ការកែប្រែ ArrayList ផ្ទាល់អំឡុងពេលរត់ enhanced for ធ្វើឱ្យ fail-fast iterator បោះ ConcurrentModificationException។ សូមប្រើ removeIf() ឬ Iterator.remove()។',
        },
      ],
    },
  },

  // =========================================================================
  // 3. INHERITANCE, ABSTRACT CLASSES & POLYMORPHISM
  // =========================================================================
  {
    slug: 'java-inheritance-and-polymorphism',
    level: 'intermediate',
    insertAfter: 'oop-classes-interfaces',
    en: {
      title: 'Inheritance, Abstract Classes & Polymorphism',
      duration: '14 min',
      summary:
        'Design extensible object hierarchies with extends, super, @Override, abstract classes, runtime polymorphism, and modern Java sealed classes for compiler-verified exhaustiveness.',
      objectives: [
        'Extend base classes safely using extends, constructor chaining with super(...), and compile-time checked @Override.',
        'Model shared state and required behavior with abstract classes and dispatch dynamically across subtypes.',
        'Restrict class hierarchies cleanly using Java 17+ sealed classes and exhaustive pattern-matching switch expressions.',
      ],
      sections: [
        {
          id: 'extends-super-and-override',
          heading: 'Single Inheritance with extends, super & @Override',
          body: [
            'Java supports single class inheritance: a subclass declares class EmailNotification extends Notification to inherit non-private fields and methods from one direct superclass (while still being able to implement multiple interfaces). Every subclass constructor must invoke a parent constructor via super(...) as its first statement so inherited state is properly initialized.',
            'Subclasses customize inherited behavior by overriding instance methods with the exact same signature. Placing @Override above the method tells the compiler to verify that a matching superclass method actually exists—turning accidental typos or mismatched parameter lists into immediate compile-time errors instead of silent runtime bugs.',
          ],
          points: [
            'Use protected fields or methods sparingly when only subclasses (and same-package types) need access; prefer private fields with protected/public getters.',
            'Call super.methodName() inside an overridden method when you want to extend—rather than completely replace—parent logic.',
            'Mark a class or method final when it must not be subclassed or overridden (for example, immutable value types like String).',
          ],
          table: {
            headers: ['Keyword / Annotation', 'Role in Hierarchy', 'Key Rule'],
            rows: [
              [
                'extends',
                'Inherit from one superclass',
                'Java allows only one direct superclass per class',
              ],
              [
                'super(...)',
                'Call superclass constructor or method',
                'Constructor call super(...) must be line 1 of subclass constructor',
              ],
              [
                '@Override',
                'Verify method overrides parent/interface',
                'Compiler fails fast if signature does not match',
              ],
              [
                'abstract',
                'Declare incomplete class or method',
                'Cannot instantiate an abstract class directly with new',
              ],
              [
                'final',
                'Prevent inheritance or overriding',
                'final class cannot be extended; final method cannot be overridden',
              ],
              [
                'sealed / permits',
                'Whitelist allowed direct subtypes',
                'Permitted subclasses must be final, sealed, or non-sealed',
              ],
            ],
          },
          example: {
            title: 'Extending a Base Class with super & @Override',
            language: 'java',
            code: `public class InheritanceDemo {
    static class Notification {
        private final String recipient;

        Notification(String recipient) {
            this.recipient = recipient;
        }

        public String getRecipient() {
            return recipient;
        }

        public String describe() {
            return "Notification to " + recipient;
        }
    }

    static class EmailNotification extends Notification {
        private final String subject;

        EmailNotification(String recipient, String subject) {
            super(recipient);
            this.subject = subject;
        }

        @Override
        public String describe() {
            return super.describe() + " [Email: " + subject + "]";
        }
    }

    public static void main(String[] args) {
        Notification note = new EmailNotification("dara@example.com", "Invoice #42");
        System.out.println(note.describe());
    }
}`,
            output: `Notification to dara@example.com [Email: Invoice #42]`,
          },
          warning:
            'Never omit @Override when overriding a method! Without it, a tiny typo or wrong parameter type compiles silently as a brand-new method, and callers holding a superclass reference will invoke the old parent implementation instead.',
        },
        {
          id: 'abstract-classes-and-polymorphism',
          heading: 'Abstract Classes & Runtime Polymorphism',
          body: [
            'When several related types share common fields, validation, or template logic but each subtype must supply its own core operation, declare an abstract class. An abstract class cannot be instantiated directly with new; it mixes concrete methods and fields with abstract methods that subclasses are forced to implement.',
            "Polymorphism lets you write code against the abstract base type—such as List<PaymentMethod>—while the JVM uses dynamic method dispatch at runtime to invoke each concrete object's overridden method. Adding a new payment type later requires zero changes to the checkout loop.",
          ],
          points: [
            'Choose an interface to define a capability contract across unrelated classes (e.g., Comparable, AutoCloseable); choose an abstract class to share state and base implementation across closely related types.',
            'Static methods and private methods are bound at compile time and cannot participate in runtime polymorphism.',
            'Keep inheritance hierarchies shallow (1–2 levels); when behavior varies independently, prefer composition over deep subclassing.',
          ],
          example: {
            title: 'Polymorphic Payment Processing with an Abstract Class',
            language: 'java',
            code: `import java.util.List;

public class PolymorphismDemo {
    static abstract class PaymentMethod {
        private final String label;

        protected PaymentMethod(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }

        public abstract double calculateFee(double amount);

        public String receiptLine(double amount) {
            double fee = calculateFee(amount);
            return "%s -> amount: $%.2f, fee: $%.2f".formatted(label, amount, fee);
        }
    }

    static class CardPayment extends PaymentMethod {
        CardPayment() { super("Card"); }

        @Override
        public double calculateFee(double amount) {
            return amount * 0.025;
        }
    }

    static class BankTransfer extends PaymentMethod {
        BankTransfer() { super("Bank Transfer"); }

        @Override
        public double calculateFee(double amount) {
            return 1.50;
        }
    }

    public static void main(String[] args) {
        List<PaymentMethod> methods = List.of(new CardPayment(), new BankTransfer());
        for (PaymentMethod method : methods) {
            System.out.println(method.receiptLine(100.00));
        }
    }
}`,
            output: `Card -> amount: $100.00, fee: $2.50
Bank Transfer -> amount: $100.00, fee: $1.50`,
          },
          tip: 'Notice how receiptLine() in the abstract class calls the abstract calculateFee() method—this is the Template Method pattern, keeping shared formatting in one place while letting subtypes vary only the fee rule.',
        },
        {
          id: 'sealed-classes-and-pattern-matching',
          heading: 'Sealed Hierarchies & Exhaustive Pattern Matching',
          body: [
            'Traditional inheritance is all-or-nothing: a class is either open to any subclass anywhere or completely closed with final. Java 17 introduced sealed classes and interfaces, letting you explicitly list the exact subtypes allowed via the permits clause. Every permitted subtype must declare itself final, sealed, or non-sealed.',
            'Because the compiler knows the complete, closed set of subtypes, Java 21 pattern-matching switch expressions can handle every case without a catch-all default branch. If you later add a new permitted subtype, the compiler flags every switch that forgot to handle it.',
          ],
          points: [
            'Combine sealed interfaces with Java records (which are implicitly final) to model algebraic data types like API results, AST nodes, or domain events.',
            'Pattern matching (case Success s -> ...) checks the type and binds a typed variable in one step—no manual casts required.',
            'Avoid adding an unnecessary default branch on sealed switches so the compiler alerts you whenever a new subtype is introduced.',
          ],
          example: {
            title: 'Sealed Result Hierarchy with Pattern-Matching switch',
            language: 'java',
            code: `import java.util.List;

public class SealedHierarchyDemo {
    sealed interface ApiResult permits Success, Failure {}

    record Success(int statusCode, String payload) implements ApiResult {}
    record Failure(int statusCode, String error) implements ApiResult {}

    static String formatResult(ApiResult result) {
        return switch (result) {
            case Success s -> "OK (" + s.statusCode() + "): " + s.payload();
            case Failure f -> "ERR (" + f.statusCode() + "): " + f.error();
        };
    }

    public static void main(String[] args) {
        List<ApiResult> responses = List.of(
                new Success(200, "3 items loaded"),
                new Failure(404, "Order not found")
        );
        for (ApiResult r : responses) {
            System.out.println(formatResult(r));
        }
    }
}`,
            output: `OK (200): 3 items loaded
ERR (404): Order not found`,
          },
          tip: 'When a record implements a sealed interface inside the same source file, you can even omit the permits clause—the compiler infers all subtypes declared in that file automatically.',
        },
      ],
      challenge: {
        prompt:
          'Create an abstract class Shape with a name field, an abstract double area() method, and a concrete describe() method returning "<name>: <area formatted to 2 decimals>". Implement Circle and Rectangle subclasses, place instances in a List<Shape>, and print each description plus the total area.',
        hint: 'Pass the shape name to super("Circle") / super("Rectangle"), override area() with @Override, and sum shape.area() inside an enhanced for loop.',
        language: 'java',
        solutionCode: `import java.util.List;

public class ShapeHierarchy {
    static abstract class Shape {
        private final String name;

        protected Shape(String name) {
            this.name = name;
        }

        public abstract double area();

        public String describe() {
            return "%s: %.2f".formatted(name, area());
        }
    }

    static final class Circle extends Shape {
        private final double radius;

        Circle(double radius) {
            super("Circle");
            this.radius = radius;
        }

        @Override
        public double area() {
            return Math.PI * radius * radius;
        }
    }

    static final class Rectangle extends Shape {
        private final double width;
        private final double height;

        Rectangle(double width, double height) {
            super("Rectangle");
            this.width = width;
            this.height = height;
        }

        @Override
        public double area() {
            return width * height;
        }
    }

    public static void main(String[] args) {
        List<Shape> shapes = List.of(new Circle(3.0), new Rectangle(4.0, 5.0));
        double total = 0.0;
        for (Shape s : shapes) {
            System.out.println(s.describe());
            total += s.area();
        }
        System.out.printf("Total area: %.2f%n", total);
    }
}`,
      },
      quiz: [
        {
          question: 'What is the primary benefit of annotating a subclass method with @Override?',
          options: [
            'It makes the method run twice as fast at runtime.',
            'It allows a class to extend multiple superclasses at once.',
            'It instructs the compiler to verify that the signature matches a superclass or interface method, catching typos early.',
            'It automatically calls super.method() before the subclass code runs.',
          ],
          answer: 2,
          explanation:
            '@Override is a compile-time safeguard: if you misspell the method name or change its parameter types, compilation fails immediately instead of silently creating an unrelated method.',
        },
        {
          question:
            'When declaring a direct subclass of a Java sealed class, which modifier must the subclass specify?',
          options: [
            'public, private, or protected',
            'final, sealed, or non-sealed',
            'static, abstract, or default',
            'synchronized, volatile, or transient',
          ],
          answer: 1,
          explanation:
            'Every permitted direct subtype of a sealed class or interface must explicitly state how further inheritance works by declaring itself final (or a record), sealed, or non-sealed.',
        },
      ],
    },
    km: {
      title: 'ការស្នងមរតក, Abstract Classes និង Polymorphism',
      duration: '14 នាទី',
      summary:
        'រចនាឋានានុក្រមវត្ថុដែលអាចពង្រីកបានដោយ extends, super, @Override, abstract classes, runtime polymorphism និង sealed classes ក្នុង Java ទំនើបសម្រាប់ការត្រួតពិនិត្យពេញលេញពេល compile។',
      objectives: [
        'ស្នងមរតកថ្នាក់មេដោយសុវត្ថិភាពជាមួយ extends, ការហៅ constructor មេ super(...) និង @Override។',
        'រៀបចំទិន្នន័យរួម និងកិច្ចសន្យា method ដោយ abstract classes ព្រមទាំងប្រើ dynamic dispatch នៃ polymorphism។',
        'កំណត់ព្រំដែនឋានានុក្រមថ្នាក់ដោយ Java 17+ sealed classes និង pattern-matching switch។',
      ],
      sections: [
        {
          id: 'extends-super-and-override',
          heading: 'ការស្នងមរតកទោលជាមួយ extends, super និង @Override',
          body: [
            'Java គាំទ្រការស្នងមរតកថ្នាក់តែមួយ (single class inheritance)៖ ថ្នាក់កូនសរសេរ class EmailNotification extends Notification ដើម្បីទទួលយក fields និង methods មិនមែន private ពីថ្នាក់មេមួយ (ខណៈនៅតែអាច implement interfaces ច្រើនបាន)។ Constructor របស់ថ្នាក់កូនត្រូវហៅ constructor ថ្នាក់មេតាម super(...) នៅបន្ទាត់ដំបូង ដើម្បីចាប់ផ្ដើមទិន្នន័យដែលស្នងមក។',
            'ថ្នាក់កូនអាចកែប្រែឥរិយាបថ method របស់ថ្នាក់មេដោយបង្កើត method មានហត្ថលេខាដូចគ្នា (override)។ ការដាក់ @Override ពីលើ method ប្រាប់ compiler ឱ្យផ្ទៀងផ្ទាត់ថា method នោះពិតជាមានក្នុងថ្នាក់មេ ដើម្បីចាប់កំហុសអក្ខរាវិរុទ្ធភ្លាមពេល compile។',
          ],
          points: [
            'ប្រើ protected ដោយប្រុងប្រយ័ត្នសម្រាប់តែអ្វីដែលថ្នាក់កូនត្រូវការ ហើយនិយមប្រើ private fields ជាមួយ getters។',
            'ហៅ super.methodName() ក្នុង method ដែល override ពេលចង់បន្ថែមលើលក្ខខណ្ឌថ្នាក់មេ មិនមែនជំនួសទាំងស្រុង។',
            'ដាក់ final លើថ្នាក់ ឬ method ដែលមិនត្រូវឱ្យគេស្នង ឬ override (ឧ. String)។',
          ],
          table: {
            headers: ['ពាក្យគន្លឹះ / Annotation', 'តួនាទីក្នុងឋានានុក្រម', 'ក្បួនសំខាន់'],
            rows: [
              [
                'extends',
                'ស្នងមរតកពីថ្នាក់មេមួយ',
                'ថ្នាក់ Java មួយអាច extends ថ្នាក់មេផ្ទាល់បានតែមួយ',
              ],
              [
                'super(...)',
                'ហៅ constructor ឬ method ថ្នាក់មេ',
                'super(...) ត្រូវនៅបន្ទាត់ទី ១ នៃ constructor កូន',
              ],
              [
                '@Override',
                'ផ្ទៀងផ្ទាត់ការ override ពីមេ/interface',
                'Compiler រាយការណ៍កំហុសភ្លាមបើហត្ថលេខាខុសគ្នា',
              ],
              [
                'abstract',
                'ប្រកាសថ្នាក់ ឬ method មិនទាន់ពេញលេញ',
                'មិនអាចបង្កើតវត្ថុ abstract class ផ្ទាល់ដោយ new ទេ',
              ],
              [
                'final',
                'ហាមការស្នង ឬការ override',
                'final class មិនអាច extends; final method មិនអាច override',
              ],
              [
                'sealed / permits',
                'កំណត់បញ្ជីថ្នាក់កូនដែលអនុញ្ញាត',
                'ថ្នាក់កូនត្រូវប្រកាស final, sealed ឬ non-sealed',
              ],
            ],
          },
          exampleTitle: 'ការស្នងមរតកថ្នាក់មេដោយ super និង @Override',
          warning:
            'កុំភ្លេចដាក់ @Override ពេល override method! បើគ្មានវា កំហុសអក្ខរាវិរុទ្ធបន្តិចបន្តួចនឹង compile ជាប់ជា method ថ្មីមួយដោយស្ងាត់ៗ ហើយអ្នកហៅតាមថ្នាក់មេនឹងនៅតែរត់កូដចាស់របស់ថ្នាក់មេ។',
        },
        {
          id: 'abstract-classes-and-polymorphism',
          heading: 'Abstract Classes និង Runtime Polymorphism',
          body: [
            'នៅពេលប្រភេទជាច្រើនមានទិន្នន័យរួម និងកូដជំនួយរួម ប៉ុន្តែប្រភេទកូននីមួយៗត្រូវអនុវត្តវិធីសាស្ត្រស្នូលផ្ទាល់ខ្លួន សូមប្រកាស abstract class។ អ្នកមិនអាចបង្កើតវត្ថុ abstract class ផ្ទាល់ដោយ new បានទេ ព្រោះវាផ្សំ method ពេញលេញជាមួយ abstract method ដែលតម្រូវឱ្យថ្នាក់កូនអនុវត្ត។',
            'Polymorphism អនុញ្ញាតឱ្យសរសេរកូដផ្អែកលើប្រភេទមេ—ដូចជា List<PaymentMethod>—ខណៈ JVM ប្រើ dynamic method dispatch ពេលដំណើរការ ដើម្បីហៅ method ដែល override របស់វត្ថុពិតនីមួយៗ។ ការបន្ថែមវិធីទូទាត់ថ្មីមិនចាំបាច់កែរង្វិលជុំទូទាត់ឡើយ។',
          ],
          points: [
            'ប្រើ interface សម្រាប់កិច្ចសន្យាសមត្ថភាពឆ្លងថ្នាក់មិនជាប់ទាក់ទងគ្នា និងប្រើ abstract class ដើម្បីចែករំលែកទិន្នន័យរួមក្នុងគ្រួសារថ្នាក់តែមួយ។',
            'static method និង private method ចងពេល compile មិនចូលរួមក្នុង runtime polymorphism ទេ។',
            'រក្សាជម្រៅឋានានុក្រមឱ្យរាក់ (1–2 ជាន់) ហើយនិយមប្រើ composition ជាជាងការស្នងមរតកជ្រៅ។',
          ],
          exampleTitle: 'ការដំណើរការការទូទាត់បែប Polymorphic ដោយ Abstract Class',
          tip: 'សង្កេតមើល receiptLine() ក្នុង abstract class ដែលហៅ abstract method calculateFee()—នេះជា Template Method pattern ដែលរក្សាទម្រង់រួមនៅកន្លែងតែមួយ ហើយទុកឱ្យថ្នាក់កូនប្ដូរតែរូបមន្តថ្លៃសេវា។',
        },
        {
          id: 'sealed-classes-and-pattern-matching',
          heading: 'Sealed Hierarchies និង Pattern Matching ពេញលេញ',
          body: [
            'ការស្នងមរតកប្រពៃណីមានតែពីរជម្រើស៖ បើកចំហទាំងស្រុង ឬបិទជិតដោយ final។ Java 17 នាំមកនូវ sealed classes និង interfaces ដែលអនុញ្ញាតឱ្យកំណត់បញ្ជីថ្នាក់កូនជាក់លាក់តាម permits ហើយថ្នាក់កូននីមួយៗត្រូវប្រកាសជា final, sealed ឬ non-sealed។',
            'ដោយសារ compiler ស្គាល់គ្រប់ថ្នាក់កូនទាំងអស់ Java 21 pattern-matching switch អាចដោះស្រាយគ្រប់ករណីដោយមិនបាច់មាន default ឡើយ។ បើអ្នកបន្ថែមថ្នាក់កូនថ្មីនៅពេលក្រោយ compiler នឹងរំលឹកភ្លាមលើ switch ណាដែលភ្លេចដោះស្រាយ។',
          ],
          points: [
            'ផ្គួប sealed interface ជាមួយ Java record (ដែលជា final ដោយស្វ័យប្រវត្តិ) ដើម្បីតំណាងលទ្ធផល API ឬព្រឹត្តិការណ៍ domain។',
            'Pattern matching (case Success s -> ...) ពិនិត្យប្រភេទ និងភ្ជាប់អថេរក្នុងជំហានតែមួយ មិនបាច់ cast ដោយដៃទេ។',
            'ជៀសវាងដាក់ default ដែលមិនចាំបាច់លើ sealed switch ដើម្បីឱ្យ compiler ជួយពិនិត្យពេលបន្ថែមប្រភេទថ្មី។',
          ],
          exampleTitle: 'Sealed Result Hierarchy ជាមួយ Pattern-Matching switch',
          tip: 'ពេល record អនុវត្ត sealed interface ក្នុងឯកសារតែមួយ អ្នកអាចលុបឃ្លា permits បាន—compiler នឹងស្គាល់ថ្នាក់កូនទាំងអស់ក្នុងឯកសារនោះដោយស្វ័យប្រវត្តិ។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើត abstract class Shape ដែលមាន field name, abstract double area() និង method describe() ត្រឡប់ "<name>: <ផ្ទៃក្រឡា 2 ខ្ទង់>"។ បង្កើតថ្នាក់កូន Circle និង Rectangle ដាក់ក្នុង List<Shape> រួចបោះពុម្ពការពិពណ៌នានីមួយៗ និងផ្ទៃក្រឡាសរុប។',
        hint: 'បញ្ជូនឈ្មោះរាងទៅ super("Circle") / super("Rectangle"), override area() ដោយ @Override ហើយបូកសរុប shape.area() ក្នុងរង្វិលជុំ enhanced for។',
      },
      quiz: [
        {
          question: 'តើអត្ថប្រយោជន៍ចម្បងនៃការដាក់ @Override លើ method របស់ថ្នាក់កូនគឺជាអ្វី?',
          options: [
            'ធ្វើឱ្យ method ដំណើរការលឿនជាងមុន ២ ដង។',
            'អនុញ្ញាតឱ្យថ្នាក់មួយ extends ថ្នាក់មេច្រើនក្នុងពេលតែមួយ។',
            'ប្រាប់ compiler ឱ្យផ្ទៀងផ្ទាត់ថាហត្ថលេខាត្រូវគ្នានឹង method ថ្នាក់មេ ឬ interface ដើម្បីចាប់កំហុសអក្ខរាវិរុទ្ធមុនពេលដំណើរការ។',
            'ហៅ super.method() ដោយស្វ័យប្រវត្តិមុនកូដថ្នាក់កូន។',
          ],
          answer: 2,
          explanation:
            '@Override ជាការការពារពេល compile៖ បើសរសេរឈ្មោះ method ខុស ឬខុសប្រភេទប៉ារ៉ាម៉ែត្រ compiler នឹងរាយការណ៍កំហុសភ្លាម។',
        },
        {
          question:
            'ពេលប្រកាសថ្នាក់កូនផ្ទាល់នៃ sealed class ក្នុង Java តើត្រូវបញ្ជាក់ modifier មួយណា?',
          options: [
            'public, private ឬ protected',
            'final, sealed ឬ non-sealed',
            'static, abstract ឬ default',
            'synchronized, volatile ឬ transient',
          ],
          answer: 1,
          explanation:
            'គ្រប់ថ្នាក់កូនផ្ទាល់នៃ sealed class ឬ interface ត្រូវបញ្ជាក់ច្បាស់ថាតើអនុញ្ញាតការស្នងបន្តឬអត់ ដោយប្រើ final (ឬ record), sealed ឬ non-sealed។',
        },
      ],
    },
  },

  // =========================================================================
  // 4. HASHMAP, HASHSET & EQUALS/HASHCODE CONTRACT
  // =========================================================================
  {
    slug: 'java-maps-and-sets',
    level: 'intermediate',
    insertAfter: 'collections-and-streams',
    en: {
      title: 'HashMap, HashSet & the equals/hashCode Contract',
      duration: '14 min',
      summary:
        'Master fast O(1) lookups with HashMap, modern Map helpers like getOrDefault and computeIfAbsent, uniqueness and set math with HashSet, and the equals()/hashCode() contract behind every hash-based collection.',
      objectives: [
        'Build frequency tables and grouped lookups cleanly using HashMap with getOrDefault(), merge(), and computeIfAbsent().',
        'Deduplicate data and compute union, intersection, and difference safely using HashSet.',
        'Implement equals() and hashCode() correctly (or leverage Java records) so custom keys never vanish inside hash buckets.',
      ],
      sections: [
        {
          id: 'hashmap-core-and-modern-methods',
          heading: 'Key-Value Lookups with HashMap & Modern Map Helpers',
          body: [
            'A HashMap<K, V> maps unique keys to values with average O(1) time for put, get, and containsKey. Instead of scanning a list linearly, HashMap hashes each key into a bucket array, making it the go-to structure for caches, ID indexes, configuration maps, and counters.',
            'Modern Java eliminates verbose null checks with expressive Map methods: getOrDefault(key, fallback) safely reads missing keys, merge(key, 1, Integer::sum) builds counters in a single line, and computeIfAbsent(key, k -> new ArrayList<>()) initializes nested collections only when a key is first seen.',
          ],
          points: [
            'HashMap makes no order guarantee; switch to LinkedHashMap to preserve insertion order or TreeMap to keep keys sorted.',
            'Iterate over both keys and values efficiently with for (var entry : map.entrySet()) instead of calling map.get(k) inside a keySet() loop.',
            'Map.of("k1", 1, "k2", 2) creates compact immutable maps, but rejects null keys and null values.',
          ],
          table: {
            headers: ['Type / Method', 'Behavior', 'Typical Use Case'],
            rows: [
              [
                'HashMap<K, V>',
                'Unordered, O(1) avg lookup',
                'General caches, counters, ID lookups',
              ],
              [
                'LinkedHashMap<K, V>',
                'Preserves insertion order, O(1) avg',
                'JSON fields, LRU caches, ordered reports',
              ],
              [
                'TreeMap<K, V>',
                'Sorted by key, O(log n)',
                'Range queries, leaderboards, sorted indices',
              ],
              [
                'HashSet<E>',
                'Unique elements, O(1) avg contains',
                'Deduplication, visited tracking, permissions',
              ],
              [
                'getOrDefault(k, def)',
                'Returns mapped value or fallback',
                'Safe reads without null checks',
              ],
              [
                'merge(k, val, fn)',
                'Inserts val or combines with existing',
                'Word/event frequency counters',
              ],
              [
                'computeIfAbsent(k, fn)',
                'Computes & stores value if key absent',
                'Grouping items into Map<K, List<V>>',
              ],
            ],
          },
          example: {
            title: 'Counting & Grouping with merge() and computeIfAbsent()',
            language: 'java',
            code: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HashMapHelpersDemo {
    public static void main(String[] args) {
        List<String> events = List.of("login", "view", "login", "purchase", "view", "login");
        Map<String, Integer> counts = new HashMap<>();

        for (String event : events) {
            counts.merge(event, 1, Integer::sum);
        }

        System.out.println("Login count  : " + counts.getOrDefault("login", 0));
        System.out.println("Logout count : " + counts.getOrDefault("logout", 0));

        Map<String, List<String>> byDept = new HashMap<>();
        byDept.computeIfAbsent("Engineering", k -> new ArrayList<>()).add("Sokha");
        byDept.computeIfAbsent("Engineering", k -> new ArrayList<>()).add("Vanna");
        byDept.computeIfAbsent("Design", k -> new ArrayList<>()).add("Nita");

        System.out.println("Engineering  : " + byDept.get("Engineering"));
        System.out.println("Design       : " + byDept.get("Design"));
    }
}`,
            output: `Login count  : 3
Logout count : 0
Engineering  : [Sokha, Vanna]
Design       : [Nita]`,
          },
          tip: 'Prefer merge(key, 1, Integer::sum) for counters—it handles both missing keys and existing counts cleanly without double lookups.',
        },
        {
          id: 'hashset-and-set-operations',
          heading: 'Enforcing Uniqueness & Set Math with HashSet',
          body: [
            'A HashSet<E> stores unique elements with O(1) average add, remove, and contains operations (internally, it is backed by a HashMap). Calling set.add(element) returns true if the element was newly inserted and false if an equal element already existed—making duplicate detection trivial.',
            'Sets also express membership math directly: union (addAll), intersection (retainAll), and difference (removeAll). Because those methods mutate the target set in place, always copy into a fresh HashSet first when you want to preserve the original sets unchanged.',
          ],
          points: [
            'Convert a list with duplicates into unique items in one line: Set<String> unique = new LinkedHashSet<>(list) (preserves original order).',
            'HashSet.contains() is O(1) compared to O(n) for ArrayList.contains()—always use a Set for repeated membership checks.',
            'Use TreeSet<E> when you need unique elements kept automatically in sorted order.',
          ],
          example: {
            title: 'Deduplicating Tags & Computing Role Permission Overlap',
            language: 'java',
            code: `import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class HashSetDemo {
    public static void main(String[] args) {
        List<String> rawTags = List.of("java", "api", "java", "sql", "api");
        Set<String> uniqueTags = new LinkedHashSet<>(rawTags);
        System.out.println("Unique (ordered): " + uniqueTags);

        Set<String> editorPerms = Set.of("read", "write", "publish");
        Set<String> reviewerPerms = Set.of("read", "comment", "publish");

        Set<String> shared = new TreeSet<>(editorPerms);
        shared.retainAll(reviewerPerms);

        Set<String> editorOnly = new HashSet<>(editorPerms);
        editorOnly.removeAll(reviewerPerms);

        System.out.println("Shared perms    : " + shared);
        System.out.println("Editor only     : " + editorOnly);
    }
}`,
            output: `Unique (ordered): [java, api, sql]
Shared perms    : [publish, read]
Editor only     : [write]`,
          },
          tip: 'Checking if (!seen.add(id)) inside a loop both records the ID and detects a duplicate in a single hash lookup.',
        },
        {
          id: 'equals-and-hashcode-contract',
          heading: 'The equals() and hashCode() Contract',
          body: [
            'When you look up a key in a HashMap or HashSet, Java performs a two-step search: first it calls key.hashCode() to jump directly to a bucket, and then it calls key.equals(candidate) on entries inside that bucket to confirm a match. If you override equals() without overriding hashCode(), two logically equal objects inherit different default Object hash codes, land in different buckets, and HashMap.get() returns null.',
            'The Java contract is strict: whenever a.equals(b) is true, a.hashCode() MUST equal b.hashCode(). The reverse is not required—two distinct objects may occasionally share a hash code (a hash collision), which equals() resolves safely. In Java 16+, records generate correct, immutable equals() and hashCode() implementations automatically.',
          ],
          points: [
            'Always override equals() and hashCode() together using the exact same immutable identifying fields.',
            'Use Objects.equals(fieldA, other.fieldA) and Objects.hash(fieldA, fieldB) to avoid NullPointerException.',
            'Prefer Java record types for composite map keys (e.g., record RouteKey(String method, String path) {})—zero boilerplate and guaranteed immutability.',
          ],
          example: {
            title: 'Custom Composite Keys with equals()/hashCode() & Records',
            language: 'java',
            code: `import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class ContractDemo {
    static final class SkuKey {
        private final String region;
        private final String code;

        SkuKey(String region, String code) {
            this.region = region;
            this.code = code;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof SkuKey other)) return false;
            return Objects.equals(region, other.region) && Objects.equals(code, other.code);
        }

        @Override
        public int hashCode() {
            return Objects.hash(region, code);
        }
    }

    record RouteKey(String method, String path) {}

    public static void main(String[] args) {
        Map<SkuKey, Integer> stock = new HashMap<>();
        stock.put(new SkuKey("KH", "LAP-01"), 14);
        System.out.println("KH LAP-01 stock : " + stock.get(new SkuKey("KH", "LAP-01")));

        Map<RouteKey, String> handlers = Map.of(
                new RouteKey("GET", "/users"), "UserController#list"
        );
        System.out.println("Route handler   : " + handlers.get(new RouteKey("GET", "/users")));
    }
}`,
            output: `KH LAP-01 stock : 14
Route handler   : UserController#list`,
          },
          warning:
            'Never mutate a field used in hashCode() after placing an object into a HashMap or HashSet! Its hash code changes, stranding the object in the old bucket so contains() and get() fail even though the entry is still stuck inside the map.',
        },
      ],
      challenge: {
        prompt:
          'Write a static method findDuplicateWords(List<String> lines) that splits each line on whitespace, normalizes tokens to lowercase, counts occurrences in a HashMap<String, Integer> using merge(), and returns a sorted TreeSet<String> containing every word that appeared 2 or more times.',
        hint: 'Loop over lines, split with line.strip().split("\\\\s+"), skip blank strings, call counts.merge(word, 1, Integer::sum), then iterate over counts.entrySet() to collect keys with entry.getValue() >= 2.',
        language: 'java',
        solutionCode: `import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

public class DuplicateWordFinder {
    public static Set<String> findDuplicateWords(List<String> lines) {
        Map<String, Integer> counts = new HashMap<>();
        for (String line : lines) {
            if (line == null || line.isBlank()) {
                continue;
            }
            for (String raw : line.strip().split("\\\\s+")) {
                String word = raw.toLowerCase();
                counts.merge(word, 1, Integer::sum);
            }
        }
        Set<String> duplicates = new TreeSet<>();
        for (Map.Entry<String, Integer> entry : counts.entrySet()) {
            if (entry.getValue() >= 2) {
                duplicates.add(entry.getKey());
            }
        }
        return duplicates;
    }

    public static void main(String[] args) {
        List<String> sample = List.of("Java maps and sets", "Sets and Java streams");
        System.out.println(findDuplicateWords(sample));
    }
}`,
      },
      quiz: [
        {
          question:
            'What happens if a custom class overrides equals() but forgets to override hashCode(), and is then used as a HashMap key?',
          options: [
            'The Java compiler refuses to compile the class.',
            'Two equal instances can produce different hash codes, causing map.get() to look in the wrong bucket and return null.',
            'HashMap automatically sorts the keys alphabetically instead.',
            'HashMap converts the key into a String automatically.',
          ],
          answer: 1,
          explanation:
            'HashMap locates the bucket via hashCode() before checking equals(). Violating the equals/hashCode contract sends logically equal keys to different buckets, breaking lookups and duplicate detection.',
        },
        {
          question:
            'Which Map method cleanly initializes a List for a missing key and returns it in one step?',
          options: [
            'map.getOrDefault(key, new ArrayList<>())',
            'map.computeIfAbsent(key, k -> new ArrayList<>())',
            'map.replace(key, new ArrayList<>())',
            'map.containsKey(key)',
          ],
          answer: 1,
          explanation:
            'computeIfAbsent inserts the newly created List into the map only when the key is absent and returns either the existing or newly stored List. getOrDefault does NOT store the fallback list in the map.',
        },
      ],
    },
    km: {
      title: 'HashMap, HashSet និងកិច្ចសន្យា equals/hashCode',
      duration: '14 នាទី',
      summary:
        'ស្ទាត់ជំនាញការស្វែងរក O(1) ជាមួយ HashMap, មុខងារទំនើបដូច getOrDefault និង computeIfAbsent, ភាពតែមួយគត់ជាមួយ HashSet និងកិច្ចសន្យា equals()/hashCode() នៅពីក្រោយរាល់ hash collections។',
      objectives: [
        'បង្កើតតារាងរាប់ភាពញឹកញាប់ និងការចងក្រុមទិន្នន័យយ៉ាងស្អាតដោយ HashMap ជាមួយ getOrDefault(), merge() និង computeIfAbsent()។',
        'លុបធាតុស្ទួន និងគណនាប្រជុំ ប្រសព្វ និងផលដកសំណុំដោយសុវត្ថិភាពជាមួយ HashSet។',
        'អនុវត្ត equals() និង hashCode() ឱ្យត្រឹមត្រូវ (ឬប្រើ Java records) ដើម្បីកុំឱ្យ key បាត់ក្នុង hash bucket។',
      ],
      sections: [
        {
          id: 'hashmap-core-and-modern-methods',
          heading: 'ការស្វែងរក Key-Value ជាមួយ HashMap និងមុខងារជំនួយទំនើប',
          body: [
            'HashMap<K, V> ផ្គូផ្គង key តែមួយគត់ទៅនឹងតម្លៃដោយល្បឿនជាមធ្យម O(1) សម្រាប់ put, get និង containsKey។ ជំនួសការស្កេនបញ្ជីពីដើមដល់ចប់ HashMap គណនា hash របស់ key ទៅកាន់ bucket ផ្ទាល់ ធ្វើឱ្យវាល្អសម្រាប់ cache, លិបិក្រម ID និងការរាប់ចំនួន។',
            'Java ទំនើបជួយកាត់បន្ថយការពិនិត្យ null វែងៗដោយ method ខ្លីៗ៖ getOrDefault(key, fallback) អានតម្លៃដោយសុវត្ថិភាព, merge(key, 1, Integer::sum) រាប់ចំនួនក្នុងមួយបន្ទាត់ និង computeIfAbsent(key, k -> new ArrayList<>()) បង្កើតបញ្ជីថ្មីតែពេលជួប key ដំបូង។',
          ],
          points: [
            'HashMap មិនធានាលំដាប់ទេ; ប្រើ LinkedHashMap ដើម្បីរក្សាលំដាប់បញ្ចូល ឬ TreeMap ដើម្បីតម្រៀបតាម key។',
            'រត់រង្វិលជុំលើទាំង key និង value ដោយ for (var entry : map.entrySet()) លឿនជាងហៅ map.get(k) ក្នុង keySet()។',
            'Map.of("k1", 1, "k2", 2) បង្កើត map មិនអាចកែប្រែបាន តែមិនទទួល key ឬ value ជា null ទេ។',
          ],
          table: {
            headers: ['ប្រភេទ / Method', 'ដំណើរការ', 'ការប្រើប្រាស់ទូទៅ'],
            rows: [
              [
                'HashMap<K, V>',
                'គ្មានលំដាប់, ស្វែងរក O(1) មធ្យម',
                'Cache, តារាងរាប់, ស្វែងរកតាម ID',
              ],
              [
                'LinkedHashMap<K, V>',
                'រក្សាលំដាប់បញ្ចូល, O(1) មធ្យម',
                'វាល JSON, LRU cache, របាយការណ៍មានលំដាប់',
              ],
              ['TreeMap<K, V>', 'តម្រៀបតាម key, O(log n)', 'ការស្វែងរកតាមជួរ, តារាងចំណាត់ថ្នាក់'],
              [
                'HashSet<E>',
                'ធាតុតែមួយគត់, contains() O(1)',
                'លុបភាពស្ទួន, តាមដានធាតុធ្លាប់ឃើញ, សិទ្ធិប្រើ',
              ],
              [
                'getOrDefault(k, def)',
                'ត្រឡប់តម្លៃ ឬតម្លៃជំនួស',
                'អានដោយសុវត្ថិភាពគ្មានការពិនិត្យ null',
              ],
              [
                'merge(k, val, fn)',
                'បញ្ចូល ឬផ្សំជាមួយតម្លៃចាស់',
                'រាប់ភាពញឹកញាប់ពាក្យ ឬព្រឹត្តិការណ៍',
              ],
              [
                'computeIfAbsent(k, fn)',
                'បង្កើតនិងរក្សាទុកតម្លៃបើខ្វះ key',
                'ចងក្រុមធាតុចូល Map<K, List<V>>',
              ],
            ],
          },
          exampleTitle: 'ការរាប់ និងចងក្រុមទិន្នន័យដោយ merge() និង computeIfAbsent()',
          tip: 'និយមប្រើ merge(key, 1, Integer::sum) សម្រាប់តារាងរាប់—វាដោះស្រាយទាំងករណីគ្មាន key និងមាន key រួចហើយក្នុងជំហានតែមួយ។',
        },
        {
          id: 'hashset-and-set-operations',
          heading: 'ការធានាភាពតែមួយគត់ និងប្រមាណវិធីសំណុំដោយ HashSet',
          body: [
            'HashSet<E> រក្សាទុកធាតុមិនស្ទួនដោយល្បឿន O(1) ជាមធ្យមសម្រាប់ add, remove និង contains (ខាងក្នុងប្រើ HashMap)។ ការហៅ set.add(element) ត្រឡប់ true បើបន្ថែមថ្មី និង false បើធាតុនោះមានរួចហើយ។',
            'Set ក៏គាំទ្រប្រមាណវិធីសំណុំផ្ទាល់ផងដែរ៖ ប្រជុំ (addAll), ប្រសព្វ (retainAll) និងផលដក (removeAll)។ ដោយសារ method ទាំងនេះកែប្រែ Set គោលដៅផ្ទាល់ សូមចម្លងចូល HashSet ថ្មីជាមុនដើម្បីរក្សា Set ដើមឱ្យនៅដដែល។',
          ],
          points: [
            'បម្លែង List មានធាតុស្ទួនទៅជាធាតុតែមួយគត់ដោយរក្សាលំដាប់៖ Set<String> unique = new LinkedHashSet<>(list)។',
            'HashSet.contains() មានល្បឿន O(1) លឿនជាង ArrayList.contains() O(n) ខ្លាំងណាស់។',
            'ប្រើ TreeSet<E> ពេលចង់បានធាតុមិនស្ទួនដែលតម្រៀបដោយស្វ័យប្រវត្តិ។',
          ],
          exampleTitle: 'ការលុប Tag ស្ទួន និងគណនាសិទ្ធិរួមដោយ HashSet',
          tip: 'ការពិនិត្យ if (!seen.add(id)) ក្នុងរង្វិលជុំ ជួយទាំងកត់ត្រា ID និងរកធាតុស្ទួនក្នុងការស្វែងរក hash តែមួយដង។',
        },
        {
          id: 'equals-and-hashcode-contract',
          heading: 'កិច្ចសន្យា equals() និង hashCode()',
          body: [
            'ពេលស្វែងរក key ក្នុង HashMap ឬ HashSet, Java ធ្វើពីរជំហាន៖ ដំបូងហៅ key.hashCode() ដើម្បីរក bucket ហើយបន្ទាប់មកហៅ key.equals(candidate) លើធាតុក្នុង bucket នោះ។ បើអ្នក override equals() តែភ្លេច override hashCode() វត្ថុពីរដែលស្មើគ្នានឹងមាន hash code ខុសគ្នា ចូល bucket ផ្សេងគ្នា ហើយ HashMap.get() នឹងត្រឡប់ null។',
            'កិច្ចសន្យារបស់ Java ច្បាស់លាស់ណាស់៖ បើ a.equals(b) ជា true នោះ a.hashCode() ត្រូវតែស្មើ b.hashCode() ដាច់ខាត។ ចំណែកវត្ថុមិនស្មើគ្នាអាចមាន hash code ដូចគ្នាម្តងម្កាល (hash collision) ដែល equals() នឹងបំបែកបានត្រឹមត្រូវ។ ក្នុង Java 16+ ប្រភេទ record បង្កើត equals() និង hashCode() ត្រឹមត្រូវដោយស្វ័យប្រវត្តិ។',
          ],
          points: [
            'Override equals() និង hashCode() រួមគ្នាជានិច្ច ដោយប្រើ fields សម្គាល់មិនអាចកែប្រែបានដូចគ្នា។',
            'ប្រើ Objects.equals(...) និង Objects.hash(...) ដើម្បីការពារ NullPointerException។',
            'និយមប្រើ Java record សម្រាប់ composite key (ឧ. record RouteKey(String method, String path) {}) ព្រោះខ្លី និងមិនអាចកែប្រែបាន។',
          ],
          exampleTitle: 'Composite Keys ជាមួយ equals()/hashCode() និង Records',
          warning:
            'កុំកែប្រែតម្លៃ field ដែលប្រើក្នុង hashCode() បន្ទាប់ពីដាក់វត្ថុចូល HashMap ឬ HashSet ឱ្យសោះ! ការប្ដូរនោះធ្វើឱ្យ hash code ផ្លាស់ប្ដូរ ហើយធាតុនោះនឹងជាប់គាំងក្នុង bucket ចាស់ ធ្វើឱ្យ get() និង contains() រកលែងឃើញ។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ static method ឈ្មោះ findDuplicateWords(List<String> lines) ដែលបំបែកពាក្យតាមចន្លោះ បម្លែងជាអក្សរតូច រាប់ចំនួនក្នុង HashMap<String, Integer> ដោយ merge() ហើយត្រឡប់ TreeSet<String> មានតែពាក្យដែលកើតឡើងចាប់ពី 2 ដងឡើងទៅ។',
        hint: 'បំបែកបន្ទាត់ដោយ line.strip().split("\\\\s+") រំលងបន្ទាត់ទទេ ហៅ counts.merge(word, 1, Integer::sum) រួចរត់ counts.entrySet() យកពាក្យមានតម្លៃ >= 2។',
      },
      quiz: [
        {
          question:
            'តើមានអ្វីកើតឡើងបើថ្នាក់មួយ override equals() តែភ្លេច override hashCode() រួចយកមកធ្វើជា key ក្នុង HashMap?',
          options: [
            'Java compiler មិនអនុញ្ញាតឱ្យ compile ថ្នាក់នោះទេ។',
            'វត្ថុពីរដែលស្មើគ្នាអាចបង្កើត hash code ខុសគ្នា ធ្វើឱ្យ map.get() រកខុស bucket ហើយត្រឡប់ null។',
            'HashMap នឹងតម្រៀប key តាមអក្ខរក្រមដោយស្វ័យប្រវត្តិ។',
            'HashMap បម្លែង key ជា String ដោយស្វ័យប្រវត្តិ។',
          ],
          answer: 1,
          explanation:
            'HashMap រក bucket តាម hashCode() មុនពេលផ្ទៀងផ្ទាត់ equals()។ ការបំពានកិច្ចសន្យានេះធ្វើឱ្យ key ស្មើគ្នាទៅ bucket ខុសគ្នា ហើយស្វែងរកមិនឃើញ។',
        },
        {
          question:
            'តើ method ណារបស់ Map ដែលបង្កើតនិងរក្សាទុក List ថ្មីពេលគ្មាន key រួចត្រឡប់ List នោះក្នុងជំហានតែមួយ?',
          options: [
            'map.getOrDefault(key, new ArrayList<>())',
            'map.computeIfAbsent(key, k -> new ArrayList<>())',
            'map.replace(key, new ArrayList<>())',
            'map.containsKey(key)',
          ],
          answer: 1,
          explanation:
            'computeIfAbsent បញ្ចូល List ថ្មីទៅក្នុង map តែពេលគ្មាន key ហើយត្រឡប់ List នោះ។ ចំណែក getOrDefault មិនបញ្ចូល List ទៅក្នុង map ឡើយ។',
        },
      ],
    },
  },

  // =========================================================================
  // 5. MODERN FILE I/O WITH JAVA.NIO.FILE
  // =========================================================================
  {
    slug: 'java-file-io-nio',
    level: 'intermediate',
    insertAfter: 'exceptions-and-generics',
    en: {
      title: 'Modern File I/O with java.nio.file',
      duration: '14 min',
      summary:
        "Read, write, stream, and organize files cleanly with Java's modern NIO.2 API—using Path, Files.readString(), Files.writeString(), try-with-resources streaming, and safe cross-platform directory traversal.",
      objectives: [
        'Build cross-platform file paths with Path.of() and perform clean UTF-8 reads/writes with Files.readString() and Files.writeString().',
        'Process large files with constant memory by combining Files.lines() and BufferedWriter inside try-with-resources blocks.',
        'Traverse directories safely and replace files cleanly using temporary files and Files.move().',
      ],
      sections: [
        {
          id: 'path-and-files-essentials',
          heading: 'Cross-Platform Paths & One-Line Reads/Writes',
          body: [
            'Modern Java replaces the legacy java.io.File class with java.nio.file.Path (representing a filesystem location) and java.nio.file.Files (static utility methods that throw clear IOExceptions instead of silently returning false). Build paths with Path.of("logs", "app.log") rather than hardcoding slashes so your code runs identically on Windows, macOS, and Linux.',
            'For small-to-medium configuration files, JSON payloads, or notes, Java 11+ gives you Files.readString(path) and Files.writeString(path, content)—both defaulting to UTF-8. Combine Path.resolve() to build child paths and Files.createDirectories(parent) to ensure parent folders exist before writing.',
          ],
          points: [
            'Always pass StandardOpenOption.CREATE and StandardOpenOption.APPEND when appending to an existing log file.',
            'Files.readString() and Files.writeString() default to UTF-8, eliminating OS-dependent character encoding surprises.',
            'Use path.normalize() to clean up redundant segments like "." or ".." before validating user-supplied paths.',
          ],
          table: {
            headers: ['Method', 'Purpose', 'Notes'],
            rows: [
              [
                'Path.of("a", "b.txt")',
                'Create platform-neutral Path',
                'Replaces Paths.get() since Java 11',
              ],
              [
                'dir.resolve("child.txt")',
                'Join child path onto parent',
                'Never concatenate "/" or "\\\\" manually',
              ],
              [
                'Files.createDirectories(dir)',
                'Create folder & missing parents',
                'No error if directory already exists',
              ],
              [
                'Files.readString(path)',
                'Read entire UTF-8 file to String',
                'Best for small/medium files',
              ],
              [
                'Files.writeString(path, text, opts...)',
                'Write/append UTF-8 text to file',
                'Supports CREATE, APPEND, TRUNCATE_EXISTING',
              ],
              [
                'Files.lines(path)',
                'Lazy Stream<String> line reader',
                'MUST close via try-with-resources',
              ],
              [
                'Files.move(src, dst, opts...)',
                'Move or rename file',
                'Use StandardCopyOption.REPLACE_EXISTING',
              ],
            ],
          },
          example: {
            title: 'Writing, Appending & Reading UTF-8 Files with NIO.2',
            language: 'java',
            code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class NioQuickReadWrite {
    public static void main(String[] args) throws IOException {
        Path workDir = Files.createTempDirectory("codehub-nio-");
        Path noteFile = workDir.resolve("notes.txt");

        Files.writeString(noteFile, "Line 1: Java NIO.2\\n");
        Files.writeString(
                noteFile,
                "Line 2: UTF-8 by default\\n",
                StandardOpenOption.APPEND
        );

        String content = Files.readString(noteFile);
        System.out.println("File: " + noteFile.getFileName());
        System.out.print(content);

        Files.deleteIfExists(noteFile);
        Files.deleteIfExists(workDir);
    }
}`,
            output: `File: notes.txt
Line 1: Java NIO.2
Line 2: UTF-8 by default`,
          },
          tip: 'Use Files.createTempDirectory(...) in unit tests so file I/O tests never collide or pollute your repository directory.',
        },
        {
          id: 'streaming-large-files-try-with-resources',
          heading: 'Streaming Large Files Safely with try-with-resources',
          body: [
            'Loading a 4 GB server log with Files.readString() or Files.readAllLines() pulls the entire file into heap memory and crashes your JVM with OutOfMemoryError. For large or unbounded files, stream one line at a time using Files.lines(path) or Files.newBufferedReader(path) so memory usage stays tiny and constant.',
            'Every open reader, writer, and file-backed Stream holds an underlying operating-system file descriptor. Wrap them in a try-with-resources statement—try (var reader = ...; var writer = ...)—so Java invokes close() automatically in reverse order even if an exception is thrown halfway through.',
          ],
          points: [
            'Files.lines(path) returns a lazy Stream<String>—lines are read on demand as the pipeline consumes them.',
            'Pair Files.lines(input) with Files.newBufferedWriter(output) to filter or transform huge files in a single streaming pass.',
            'Multiple resources can be declared inside one try (...) header separated by semicolons.',
          ],
          example: {
            title: 'Filtering a Log File with try-with-resources Streaming',
            language: 'java',
            code: `import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Stream;

public class StreamLogFilter {
    public static void main(String[] args) throws IOException {
        Path logFile = Files.createTempFile("app-", ".log");
        Path errFile = Files.createTempFile("errors-", ".log");

        Files.writeString(logFile, """
                [INFO] Server started on 8080
                [ERROR] Database timeout
                [INFO] Request /health 200
                [ERROR] Failed to send email
                """);

        long errorCount = 0;
        try (Stream<String> lines = Files.lines(logFile);
             BufferedWriter out = Files.newBufferedWriter(errFile)) {
            for (String line : (Iterable<String>) lines::iterator) {
                if (line.startsWith("[ERROR]")) {
                    out.write(line);
                    out.newLine();
                    errorCount++;
                }
            }
        }

        System.out.println("Errors found: " + errorCount);
        System.out.print(Files.readString(errFile));

        Files.deleteIfExists(logFile);
        Files.deleteIfExists(errFile);
    }
}`,
            output: `Errors found: 2
[ERROR] Database timeout
[ERROR] Failed to send email`,
          },
          warning:
            'Files.lines(path), Files.list(dir), and Files.walk(dir) all keep an open OS file handle until explicitly closed! Always place them inside a try-with-resources block—never leave them open in a standalone stream chain.',
        },
        {
          id: 'directory-traversal-and-safe-writes',
          heading: 'Inspecting Directories & Safe File Replacement',
          body: [
            'Java NIO.2 provides Files.list(dir) for immediate children of a folder and Files.walk(dir) for recursive directory trees. Both return a Stream<Path> that must be closed via try-with-resources, and you can inspect metadata cleanly using Files.isRegularFile(p), Files.size(p), and Files.getLastModifiedTime(p).',
            'When updating an important config or report file in production, overwriting the live file directly risks leaving a truncated file if the process crashes mid-write. A safer pattern is to write to a sibling temporary file first, then swap it into place with Files.move(tmp, target, StandardCopyOption.REPLACE_EXISTING).',
          ],
          points: [
            'Use Files.walk(dir, maxDepth) to cap recursion depth when scanning large folder trees.',
            'Write to a temp file in the same directory as the target so Files.move() stays on the same filesystem.',
            'Check Files.exists(path) before reading optional config files, or handle NoSuchFileException explicitly.',
          ],
          example: {
            title: 'Listing Directory Files & Replacing Safely via Temp File',
            language: 'java',
            code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Comparator;
import java.util.stream.Stream;

public class DirectorySafeWriteDemo {
    public static void main(String[] args) throws IOException {
        Path dir = Files.createTempDirectory("reports-");
        Path report = dir.resolve("summary.txt");
        Path temp = Files.createTempFile(dir, "summary-", ".tmp");

        Files.writeString(temp, "Total revenue: $1,250.00\\n");
        Files.move(temp, report, StandardCopyOption.REPLACE_EXISTING);
        Files.writeString(dir.resolve("notes.md"), "# Q4 Notes\\n");

        try (Stream<Path> entries = Files.list(dir)) {
            entries.filter(Files::isRegularFile)
                   .sorted(Comparator.comparing(p -> p.getFileName().toString()))
                   .forEach(p -> {
                       try {
                           System.out.printf("%s (%d bytes)%n", p.getFileName(), Files.size(p));
                       } catch (IOException e) {
                           throw new RuntimeException(e);
                       }
                   });
        }

        Files.deleteIfExists(report);
        Files.deleteIfExists(dir.resolve("notes.md"));
        Files.deleteIfExists(dir);
    }
}`,
            output: `notes.md (11 bytes)
summary.txt (25 bytes)`,
          },
          tip: 'Whenever you expose a file path derived from user input, resolve it against a base directory, call .normalize(), and assert resolved.startsWith(baseDir) to block path-traversal attacks (like ../../etc/passwd).',
        },
      ],
      challenge: {
        prompt:
          'Write a static method copyMatchingLines(Path source, Path target, String keyword) throws IOException that streams source using Files.newBufferedReader and writes every line containing keyword to target using Files.newBufferedWriter—both inside one try-with-resources block—and returns the number of lines copied.',
        hint: 'Declare try (BufferedReader in = Files.newBufferedReader(source); BufferedWriter out = Files.newBufferedWriter(target)), loop while ((line = in.readLine()) != null), check line.contains(keyword), write line + out.newLine(), and increment a counter.',
        language: 'java',
        solutionCode: `import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class LineCopier {
    public static long copyMatchingLines(Path source, Path target, String keyword) throws IOException {
        long matched = 0;
        try (BufferedReader in = Files.newBufferedReader(source);
             BufferedWriter out = Files.newBufferedWriter(target)) {
            String line;
            while ((line = in.readLine()) != null) {
                if (line.contains(keyword)) {
                    out.write(line);
                    out.newLine();
                    matched++;
                }
            }
        }
        return matched;
    }

    public static void main(String[] args) throws IOException {
        Path src = Files.createTempFile("src-", ".txt");
        Path dst = Files.createTempFile("dst-", ".txt");
        Files.writeString(src, "WARN disk slow\\nINFO ok\\nWARN retry\\n");
        System.out.println("Copied: " + copyMatchingLines(src, dst, "WARN"));
        System.out.print(Files.readString(dst));
        Files.deleteIfExists(src);
        Files.deleteIfExists(dst);
    }
}`,
      },
      quiz: [
        {
          question: 'Why must Files.lines(path) be wrapped inside a try-with-resources block?',
          options: [
            'Files.lines() refuses to return any lines unless inside a try block.',
            'It holds an open OS file descriptor that will leak unless the Stream is closed explicitly.',
            'try-with-resources makes the file read twice as fast.',
            'It automatically converts binary files into UTF-8 text.',
          ],
          answer: 1,
          explanation:
            'Streams backed by I/O channels (Files.lines, Files.list, Files.walk) keep an underlying OS file handle open until close() is called. try-with-resources guarantees closure even when exceptions occur.',
        },
        {
          question:
            'When should you prefer Files.newBufferedReader(path) or Files.lines(path) over Files.readString(path)?',
          options: [
            'Whenever the file is very large (hundreds of MB or GB) and loading it all into RAM could cause OutOfMemoryError.',
            'Whenever you want to create a new directory.',
            'Whenever the filename has no extension.',
            'Files.readString() cannot read UTF-8 files.',
          ],
          answer: 0,
          explanation:
            'Files.readString() loads the entire file into a single String on the heap. Streaming with BufferedReader or Files.lines() processes one line at a time using constant memory.',
        },
      ],
    },
    km: {
      title: 'File I/O ទំនើបជាមួយ java.nio.file',
      duration: '14 នាទី',
      summary:
        'អាន សរសេរ ស្ទ្រីម និងរៀបចំឯកសារយ៉ាងស្អាតដោយ NIO.2 API ទំនើបរបស់ Java—ប្រើ Path, Files.readString(), Files.writeString(), try-with-resources និងការដើរពិនិត្យថតឯកសារឆ្លងប្រព័ន្ធប្រតិបត្តិការ។',
      objectives: [
        'បង្កើតផ្លូវឯកសារឆ្លងប្រព័ន្ធដោយ Path.of() និងអាន-សរសេរ UTF-8 ដោយ Files.readString() និង Files.writeString()។',
        'ដំណើរការឯកសារធំដោយប្រើអង្គចងចាំថេរ តាមរយៈ Files.lines() និង BufferedWriter ក្នុង try-with-resources។',
        'ពិនិត្យថតឯកសារដោយសុវត្ថិភាព និងជំនួសឯកសារដោយប្រើឯកសារបណ្ដោះអាសន្នរួមជាមួយ Files.move()។',
      ],
      sections: [
        {
          id: 'path-and-files-essentials',
          heading: 'ផ្លូវឯកសារឆ្លងប្រព័ន្ធ និងការអាន-សរសេរមួយបន្ទាត់',
          body: [
            'Java ទំនើបជំនួសថ្នាក់ចាស់ java.io.File ដោយ java.nio.file.Path (តំណាងទីតាំងឯកសារ) និង java.nio.file.Files (មុខងារជំនួយដែលបោះ IOException ច្បាស់លាស់ជំនួសការត្រឡប់ false ដោយស្ងាត់ៗ)។ បង្កើតផ្លូវដោយ Path.of("logs", "app.log") ជំនួសការសរសេរ "/" ឬ "\\\\" ដោយដៃ ដើម្បីឱ្យដំណើរការដូចគ្នាលើ Windows, macOS និង Linux។',
            'សម្រាប់ឯកសារកំណត់រចនាសម្ព័ន្ធ JSON ឬអត្ថបទតូច-មធ្យម Java 11+ ផ្ដល់ Files.readString(path) និង Files.writeString(path, content) ដែលប្រើ UTF-8 ជាលំនាំដើម។ ប្រើ Path.resolve() ដើម្បីភ្ជាប់ឈ្មោះឯកសារកូន និង Files.createDirectories() ដើម្បីបង្កើតថតមេមុនពេលសរសេរ។',
          ],
          points: [
            'បញ្ជូន StandardOpenOption.CREATE និង StandardOpenOption.APPEND ពេលចង់សរសេរបន្ថែមចុងឯកសារ log។',
            'Files.readString() និង Files.writeString() ប្រើ UTF-8 ជាលំនាំដើម ជួយជៀសវាងបញ្ហាអក្សរខូចឆ្លង OS។',
            'ប្រើ path.normalize() ដើម្បីសម្អាតផ្នែក "." ឬ ".." មុនផ្ទៀងផ្ទាត់ផ្លូវពីអ្នកប្រើ។',
          ],
          table: {
            headers: ['Method', 'តួនាទី', 'កំណត់សម្គាល់'],
            rows: [
              [
                'Path.of("a", "b.txt")',
                'បង្កើត Path ឆ្លងប្រព័ន្ធ',
                'ជំនួស Paths.get() ចាប់ពី Java 11',
              ],
              ['dir.resolve("child.txt")', 'ភ្ជាប់ឯកសារកូនទៅថតមេ', 'កុំភ្ជាប់ "/" ឬ "\\\\" ដោយដៃ'],
              [
                'Files.createDirectories(dir)',
                'បង្កើតថត និងថតមេដែលខ្វះ',
                'មិនបង្កកំហុសបើថតមានរួចហើយ',
              ],
              [
                'Files.readString(path)',
                'អានឯកសារ UTF-8 ទាំងមូលជា String',
                'សមស្របសម្រាប់ឯកសារតូច-មធ្យម',
              ],
              [
                'Files.writeString(path, text, opts...)',
                'សរសេរ/បន្ថែមអត្ថបទ UTF-8',
                'គាំទ្រ CREATE, APPEND, TRUNCATE_EXISTING',
              ],
              [
                'Files.lines(path)',
                'អានម្ដងមួយបន្ទាត់ជា Stream<String>',
                'ត្រូវបិទដោយ try-with-resources ជានិច្ច',
              ],
              [
                'Files.move(src, dst, opts...)',
                'ផ្លាស់ទី ឬប្ដូរឈ្មោះឯកសារ',
                'ប្រើ StandardCopyOption.REPLACE_EXISTING',
              ],
            ],
          },
          exampleTitle: 'ការសរសេរ បន្ថែម និងអានឯកសារ UTF-8 ដោយ NIO.2',
          tip: 'ប្រើ Files.createTempDirectory(...) ក្នុង unit tests ដើម្បីកុំឱ្យឯកសារសាកល្បងប៉ះទង្គិចគ្នា ឬរញ៉េរញ៉ៃក្នុងគម្រោង។',
        },
        {
          id: 'streaming-large-files-try-with-resources',
          heading: 'ការស្ទ្រីមឯកសារធំដោយសុវត្ថិភាពជាមួយ try-with-resources',
          body: [
            'ការអានឯកសារ log ទំហំ 4 GB ដោយ Files.readString() ឬ Files.readAllLines() នឹងផ្ទុកឯកសារទាំងមូលចូល RAM ហើយធ្វើឱ្យ JVM គាំងដោយ OutOfMemoryError។ សម្រាប់ឯកសារធំ សូមស្ទ្រីមម្ដងមួយបន្ទាត់ដោយ Files.lines(path) ឬ Files.newBufferedReader(path) ដើម្បីរក្សាការប្រើ RAM ឱ្យតូច និងថេរ។',
            'គ្រប់ reader, writer និង Stream ដែលភ្ជាប់ឯកសារសុទ្ធតែកាន់ file descriptor របស់ OS។ រុំវាក្នុង try-with-resources — try (var reader = ...; var writer = ...) — ដើម្បីឱ្យ Java បិទធនធានដោយស្វ័យប្រវត្តិ ទោះមាន exception កើតឡើងក៏ដោយ។',
          ],
          points: [
            'Files.lines(path) ត្រឡប់ lazy Stream<String> ដែលអានបន្ទាត់តាមតម្រូវការ។',
            'ផ្គួប Files.lines(input) ជាមួយ Files.newBufferedWriter(output) ដើម្បីច្រោះឯកសារធំក្នុងមួយជុំ។',
            'អាចប្រកាសធនធានច្រើនក្នុងក្បាល try (...) តែមួយដោយខណ្ឌសញ្ញា ;។',
          ],
          exampleTitle: 'ការច្រោះឯកសារ Log ដោយ try-with-resources',
          warning:
            'Files.lines(path), Files.list(dir) និង Files.walk(dir) សុទ្ធតែបើក OS file handle រហូតដល់បិទ! ដាក់វាក្នុង try-with-resources ជានិច្ចដើម្បីការពារការលេចធ្លាយ file handle។',
        },
        {
          id: 'directory-traversal-and-safe-writes',
          heading: 'ការពិនិត្យថតឯកសារ និងការជំនួសឯកសារដោយសុវត្ថិភាព',
          body: [
            'NIO.2 ផ្ដល់ Files.list(dir) សម្រាប់មើលឯកសារកូនផ្ទាល់ និង Files.walk(dir) សម្រាប់ស្វែងរកគ្រប់ថតរង។ ទាំងពីរត្រឡប់ Stream<Path> ដែលត្រូវបិទដោយ try-with-resources ហើយអ្នកអាចពិនិត្យព័ត៌មានដោយ Files.isRegularFile(p) និង Files.size(p)។',
            'ពេលធ្វើបច្ចុប្បន្នភាពឯកសារសំខាន់ក្នុងប្រព័ន្ធពិត ការសរសេរជាន់លើផ្ទាល់អាចបន្សល់ឯកសារខូចបើកម្មវិធីគាំងពាក់កណ្ដាល។ វិធីសុវត្ថិភាពគឺសរសេរចូលឯកសារបណ្ដោះអាសន្នជាមុន រួចផ្លាស់ទីជំនួសដោយ Files.move(tmp, target, StandardCopyOption.REPLACE_EXISTING)។',
          ],
          points: [
            'ប្រើ Files.walk(dir, maxDepth) ដើម្បីកំណត់ជម្រៅស្កេនក្នុងថតធំៗ។',
            'បង្កើតឯកសារបណ្ដោះអាសន្នក្នុងថតតែមួយជាមួយគោលដៅ ដើម្បីឱ្យ Files.move() នៅលើ filesystem តែមួយ។',
            'ពិនិត្យ Files.exists(path) មុនអានឯកសារកំណត់រចនាសម្ព័ន្ធដែលអាចមិនមាន។',
          ],
          exampleTitle: 'ការរាយឈ្មោះឯកសារក្នុងថត និងជំនួសដោយសុវត្ថិភាពតាមឯកសារបណ្ដោះអាសន្ន',
          tip: 'រាល់ពេលទទួលផ្លូវឯកសារពីអ្នកប្រើ សូម resolve លើថតមូលដ្ឋាន ហៅ .normalize() ហើយផ្ទៀងផ្ទាត់ resolved.startsWith(baseDir) ដើម្បីទប់ស្កាត់ការវាយប្រហារ path-traversal (ដូច ../../etc/passwd)។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ static method ឈ្មោះ copyMatchingLines(Path source, Path target, String keyword) throws IOException ដែលអាន source ដោយ Files.newBufferedReader និងសរសេររាល់បន្ទាត់ដែលមាន keyword ចូល target ដោយ Files.newBufferedWriter ក្នុង try-with-resources តែមួយ រួចត្រឡប់ចំនួនបន្ទាត់ដែលបានចម្លង។',
        hint: 'ប្រកាស try (BufferedReader in = Files.newBufferedReader(source); BufferedWriter out = Files.newBufferedWriter(target)) រត់ while ((line = in.readLine()) != null) ពិនិត្យ line.contains(keyword) ហើយសរសេរ line + out.newLine()។',
      },
      quiz: [
        {
          question: 'ហេតុអ្វីបានជាត្រូវរុំ Files.lines(path) ក្នុងប្លុក try-with-resources?',
          options: [
            'Files.lines() មិនត្រឡប់បន្ទាត់ទេបើមិននៅក្នុង try។',
            'វាកាន់ OS file descriptor ដែលនឹងលេចធ្លាយបើមិនបិទ Stream ឱ្យច្បាស់លាស់។',
            'try-with-resources ធ្វើឱ្យការអានឯកសារលឿនជាងមុន ២ ដង។',
            'វាបម្លែងឯកសារ binary ទៅជា UTF-8 ដោយស្វ័យប្រវត្តិ។',
          ],
          answer: 1,
          explanation:
            'Stream ដែលភ្ជាប់ I/O (Files.lines, Files.list, Files.walk) បើក OS file handle រហូតដល់ close() ត្រូវបានហៅ។ try-with-resources ធានាការបិទទោះមាន exception កើតឡើង។',
        },
        {
          question:
            'តើពេលណាអ្នកគួរប្រើ Files.newBufferedReader(path) ឬ Files.lines(path) ជំនួស Files.readString(path)?',
          options: [
            'ពេលឯកសារមានទំហំធំខ្លាំង (រាប់រយ MB ឬ GB) ដែលការផ្ទុកទាំងមូលចូល RAM អាចបង្ក OutOfMemoryError។',
            'ពេលអ្នកចង់បង្កើតថតឯកសារថ្មី។',
            'ពេលឈ្មោះឯកសារគ្មាន extension។',
            'Files.readString() មិនអាចអានឯកសារ UTF-8 បានទេ។',
          ],
          answer: 0,
          explanation:
            'Files.readString() ផ្ទុកឯកសារទាំងមូលចូល String មួយលើ heap។ ការស្ទ្រីមដោយ BufferedReader ឬ Files.lines() ដំណើរការម្ដងមួយបន្ទាត់ដោយប្រើ RAM តិចនិងថេរ។',
        },
      ],
    },
  },

  // =========================================================================
  // 6. JAVA.TIME API, FUNCTIONAL INTERFACES & METHOD REFERENCES
  // =========================================================================
  {
    slug: 'java-dates-and-lambdas',
    level: 'pro',
    insertAfter: 'java-file-io-nio',
    en: {
      title: 'java.time API, Functional Interfaces & Method References',
      duration: '15 min',
      summary:
        'Handle dates, timezones, and timestamps accurately with the immutable java.time API, compose reusable behavior with java.util.function interfaces, and write crystal-clear Java using method references (::).',
      objectives: [
        'Choose the right java.time type (LocalDate, Instant, ZonedDateTime, Duration, Period) and format dates safely with DateTimeFormatter.',
        'Build and compose functional pipelines with Predicate<T>, Function<T, R>, Consumer<T>, and Supplier<T>.',
        'Simplify lambdas cleanly using all four forms of Java method references (::).',
      ],
      sections: [
        {
          id: 'java-time-immutable-dates',
          heading: 'Immutable Dates, Timestamps & Timezones with java.time',
          body: [
            'Legacy java.util.Date and Calendar were mutable, zero-indexed on months (January = 0), and notoriously unsafe across threads. Java 8 introduced java.time (ISO-8601 based), where every value is immutable, thread-safe, and modeled with exact intent: LocalDate for calendar dates without timezones, Instant for UTC machine timestamps, and ZonedDateTime for user-facing timezone conversions.',
            'Choose Period for human calendar spans (years, months, days—accounting for leap years and DST) and Duration for exact machine spans (hours, minutes, seconds, nanoseconds). Format and parse strings safely with thread-safe DateTimeFormatter instances.',
          ],
          points: [
            "Store audit logs and database timestamps as Instant (UTC), converting to a user's ZoneId only when formatting for display.",
            'DateTimeFormatter is immutable and thread-safe—reuse it freely as a static final constant (unlike legacy SimpleDateFormat).',
            'Every plus/minus/with method returns a brand-new object; always assign the returned value.',
          ],
          table: {
            headers: ['java.time Type', 'Represents', 'Example Creation'],
            rows: [
              ['LocalDate', 'Calendar date (no time/zone)', 'LocalDate.of(2026, 11, 22)'],
              ['LocalTime', 'Wall-clock time (no date/zone)', 'LocalTime.of(14, 30)'],
              [
                'LocalDateTime',
                'Date + time (no timezone)',
                'LocalDateTime.of(2026, 11, 22, 14, 30)',
              ],
              [
                'Instant',
                'UTC epoch timestamp (machine time)',
                'Instant.parse("2026-11-22T07:30:00Z")',
              ],
              [
                'ZonedDateTime',
                'Instant + IANA ZoneId',
                'instant.atZone(ZoneId.of("Asia/Phnom_Penh"))',
              ],
              ['Period', 'Calendar span (years/months/days)', 'Period.between(startDate, endDate)'],
              ['Duration', 'Exact time span (seconds/nanos)', 'Duration.ofMinutes(45)'],
              [
                'DateTimeFormatter',
                'Thread-safe format & parse pattern',
                'DateTimeFormatter.ofPattern("dd MMM yyyy")',
              ],
            ],
          },
          example: {
            title: 'Calculating Due Dates, Timezones & Durations with java.time',
            language: 'java',
            code: `import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class JavaTimeDemo {
    private static final DateTimeFormatter DATE_FMT =
            DateTimeFormatter.ofPattern("dd MMM yyyy", Locale.ENGLISH);

    public static void main(String[] args) {
        LocalDate invoiceDate = LocalDate.of(2026, 11, 1);
        LocalDate dueDate = invoiceDate.plusDays(14);
        System.out.println("Invoice due : " + dueDate.format(DATE_FMT));

        Instant deployUtc = Instant.parse("2026-11-22T08:15:00Z");
        ZonedDateTime phnomPenh = deployUtc.atZone(ZoneId.of("Asia/Phnom_Penh"));
        System.out.println("Deploy (KH) : " + phnomPenh.toLocalDateTime());

        Duration window = Duration.between(deployUtc, deployUtc.plusSeconds(5400));
        System.out.println("Maintenance : " + window.toMinutes() + " min");
    }
}`,
            output: `Invoice due : 15 Nov 2026
Deploy (KH) : 2026-11-22T15:15
Maintenance : 90 min`,
          },
          warning:
            'Every java.time object is immutable! Writing invoiceDate.plusDays(14); without assigning the result silently discards the new date. Also never store LocalDateTime for global events—it has no timezone offset; store Instant instead.',
        },
        {
          id: 'functional-interfaces-and-lambdas',
          heading: 'Functional Interfaces & Composing Lambdas',
          body: [
            'A functional interface is any interface with exactly one abstract method (optionally marked with @FunctionalInterface so the compiler enforces the rule). Lambdas implement that single abstract method inline without anonymous-class boilerplate, letting you pass behavior as data to sorting, filtering, caching, and callback APIs.',
            'The java.util.function package standardizes the building blocks you need daily: Predicate<T> tests conditions, Function<T, R> transforms values, Consumer<T> performs side effects, and Supplier<T> lazily produces values. Even better, default methods like andThen(), compose(), and(), and negate() let you assemble small reusable functions into readable pipelines.',
          ],
          points: [
            'Use primitive specializations (IntPredicate, LongSupplier, ToIntFunction<T>) in hot loops to avoid boxing overhead.',
            'Variables captured from an enclosing method inside a lambda must be final or effectively final.',
            'f.andThen(g) runs f first then g; f.compose(g) runs g first then f—prefer andThen() for left-to-right readability.',
          ],
          table: {
            headers: ['Interface', 'Abstract Method', 'Purpose'],
            rows: [
              ['Predicate<T>', 'boolean test(T t)', 'Filter or validate an input'],
              ['Function<T, R>', 'R apply(T t)', 'Transform T into R'],
              ['UnaryOperator<T>', 'T apply(T t)', 'Transform T into same type T'],
              ['BiFunction<T, U, R>', 'R apply(T t, U u)', 'Combine two inputs into R'],
              ['Consumer<T>', 'void accept(T t)', 'Perform side effect (log, print, save)'],
              ['Supplier<T>', 'T get()', 'Lazily compute or provide a value'],
            ],
          },
          example: {
            title: 'Composing Function & Predicate Pipelines',
            language: 'java',
            code: `import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

public class FunctionalComposeDemo {
    public static void main(String[] args) {
        Function<String, String> clean = s -> s.strip().toLowerCase();
        Function<String, String> toHandle = clean.andThen(s -> "@" + s.replace(" ", "_"));

        Predicate<Integer> isPositive = n -> n > 0;
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Predicate<Integer> validBatchSize = isPositive.and(isEven);

        Supplier<String> defaultHandle = () -> "@guest_user";

        System.out.println("Handle     : " + toHandle.apply("  Dara Sok  "));
        System.out.println("Batch 8 ok : " + validBatchSize.test(8));
        System.out.println("Batch -4 ok: " + validBatchSize.test(-4));
        System.out.println("Fallback   : " + defaultHandle.get());
    }
}`,
            output: `Handle     : @dara_sok
Batch 8 ok : true
Batch -4 ok: false
Fallback   : @guest_user`,
          },
          tip: 'Use Supplier<T> for lazy error messages or expensive defaults—for instance, optional.orElseGet(() -> buildFallback()) only builds the fallback when the Optional is actually empty.',
        },
        {
          id: 'method-references-four-forms',
          heading: 'Cleaner Pipelines with Method References (::)',
          body: [
            'Whenever a lambda does nothing more than forward its exact argument(s) straight into an existing method or constructor, a method reference (::) removes the parameter noise and highlights the operation itself. For example, s -> s.toUpperCase() becomes String::toUpperCase.',
            'Java supports four forms of method references: static methods (Integer::parseInt), bound instance methods on a specific object (System.out::println), unbound instance methods where the first lambda parameter becomes the receiver (String::strip), and constructors (User::new).',
          ],
          points: [
            'Static reference: ClassName::staticMethod (e.g., Integer::parseInt replaces s -> Integer.parseInt(s)).',
            'Bound instance reference: instance::method (e.g., prefix::concat or System.out::println).',
            'Unbound instance reference: ClassName::instanceMethod (e.g., User::name in Comparator.comparing(User::name)).',
            'Constructor reference: ClassName::new (e.g., User::new or String[]::new in stream.toArray(String[]::new)).',
          ],
          example: {
            title: 'Using All Four Forms of Method References (::)',
            language: 'java',
            code: `import java.util.Comparator;
import java.util.List;

public class MethodReferencesDemo {
    record Student(String name) {}

    public static void main(String[] args) {
        List<String> rawScores = List.of("85", "92", "78");
        // 1. Static method reference
        int sum = rawScores.stream().mapToInt(Integer::parseInt).sum();
        System.out.println("Score sum : " + sum);

        List<String> rawNames = List.of("  Vanna ", "Dara", " Sokha ");
        // 2. Unbound instance (String::strip), 3. Constructor (Student::new), 4. Bound instance (System.out::println)
        rawNames.stream()
                .map(String::strip)
                .map(Student::new)
                .sorted(Comparator.comparing(Student::name))
                .map(Student::name)
                .forEach(System.out::println);
    }
}`,
            output: `Score sum : 255
Dara
Sokha
Vanna`,
          },
          tip: 'Use method references when they make a pipeline easier to read at a glance, but keep a regular lambda whenever you need extra arguments, null guards, or multi-step logic.',
        },
      ],
      challenge: {
        prompt:
          'Write a static method formatUpcomingDeadlines(List<LocalDate> dates, LocalDate today, Function<LocalDate, String> formatter) that streams dates, keeps only dates strictly after today (d.isAfter(today)), sorts them chronologically, transforms each date with formatter, and returns the resulting List<String>.',
        hint: 'Use dates.stream().filter(d -> d.isAfter(today)).sorted().map(formatter).toList(). Test it by passing a DateTimeFormatter method reference or lambda.',
        language: 'java',
        solutionCode: `import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.function.Function;

public class DeadlineFormatter {
    public static List<String> formatUpcomingDeadlines(
            List<LocalDate> dates,
            LocalDate today,
            Function<LocalDate, String> formatter
    ) {
        return dates.stream()
                .filter(d -> d.isAfter(today))
                .sorted()
                .map(formatter)
                .toList();
    }

    public static void main(String[] args) {
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd (EEE)", Locale.ENGLISH);
        LocalDate today = LocalDate.of(2026, 11, 10);
        List<LocalDate> input = List.of(
                LocalDate.of(2026, 11, 20),
                LocalDate.of(2026, 11, 5),
                LocalDate.of(2026, 11, 12)
        );
        System.out.println(formatUpcomingDeadlines(input, today, fmt::format));
    }
}`,
      },
      quiz: [
        {
          question:
            'Which java.time class is best for storing a timezone-independent UTC event timestamp in a backend database?',
          options: ['LocalDate', 'LocalDateTime', 'Instant', 'Period'],
          answer: 2,
          explanation:
            'Instant represents an exact point on the UTC timeline with no ambiguity from daylight-saving changes or server locale. Convert an Instant to ZonedDateTime only when displaying to a user.',
        },
        {
          question:
            'Which lambda expression is equivalent to the method reference String::isBlank?',
          options: [
            '() -> String.isBlank()',
            's -> s.isBlank()',
            '(a, b) -> a.isBlank(b)',
            '() -> new String()',
          ],
          answer: 1,
          explanation:
            'String::isBlank is an unbound instance method reference: the single parameter s passed into the Predicate<String> becomes the receiver of s.isBlank().',
        },
      ],
    },
    km: {
      title: 'java.time API, Functional Interfaces និង Method References',
      duration: '15 នាទី',
      summary:
        'គ្រប់គ្រងកាលបរិច្ឆេទ តំបន់ពេលវេលា និង timestamp យ៉ាងត្រឹមត្រូវដោយ java.time API មិនអាចកែប្រែបាន, ផ្សំអនុគមន៍ដោយ java.util.function និងសរសេរកូដ Java យ៉ាងស្អាតជាមួយ method references (::)។',
      objectives: [
        'ជ្រើសរើសប្រភេទ java.time ត្រឹមត្រូវ (LocalDate, Instant, ZonedDateTime, Duration, Period) និងធ្វើទម្រង់ដោយ DateTimeFormatter។',
        'បង្កើតនិងផ្សំ pipeline អនុគមន៍ដោយ Predicate<T>, Function<T, R>, Consumer<T> និង Supplier<T>។',
        'បង្រួម lambda ឱ្យងាយអានដោយប្រើទម្រង់ទាំង ៤ នៃ method references (::)។',
      ],
      sections: [
        {
          id: 'java-time-immutable-dates',
          heading: 'កាលបរិច្ឆេទ Timestamp និងតំបន់ពេលវេលាដោយ java.time',
          body: [
            'ថ្នាក់ចាស់ java.util.Date និង Calendar អាចកែប្រែបាន រាប់ខែចាប់ពី 0 (មករា = 0) និងមិនមានសុវត្ថិភាពសម្រាប់ thread ទេ។ Java 8 ណែនាំ java.time (ផ្អែក ISO-8601) ដែលគ្រប់តម្លៃមិនអាចកែប្រែបាន មានសុវត្ថិភាព thread និងបែងចែកតួនាទីច្បាស់៖ LocalDate សម្រាប់ថ្ងៃខែប្រតិទិន, Instant សម្រាប់ UTC timestamp របស់ម៉ាស៊ីន និង ZonedDateTime សម្រាប់ការបម្លែងតាមតំបន់ពេលវេលា។',
            'ប្រើ Period សម្រាប់រយៈពេលប្រតិទិន (ឆ្នាំ ខែ ថ្ងៃ) និង Duration សម្រាប់រយៈពេលជាក់លាក់ (ម៉ោង នាទី វិនាទី)។ ប្រើ DateTimeFormatter ដែលមានសុវត្ថិភាព thread សម្រាប់បម្លែងរវាងកាលបរិច្ឆេទ និងអត្ថបទ។',
          ],
          points: [
            'រក្សាទុក timestamp ក្នុង database ជា Instant (UTC) ហើយបម្លែងទៅ ZoneId របស់អ្នកប្រើតែពេលបង្ហាញប៉ុណ្ណោះ។',
            'DateTimeFormatter មិនអាចកែប្រែបាន និងមានសុវត្ថិភាព thread ដូច្នេះអាចប្រើជា static final constant បាន។',
            'រាល់ method plus/minus/with ត្រឡប់វត្ថុថ្មី ត្រូវទទួលតម្លៃត្រឡប់ជានិច្ច។',
          ],
          table: {
            headers: ['ប្រភេទ java.time', 'តំណាងឱ្យ', 'ឧទាហរណ៍ការបង្កើត'],
            rows: [
              ['LocalDate', 'ថ្ងៃខែប្រតិទិន (គ្មានម៉ោង/តំបន់)', 'LocalDate.of(2026, 11, 22)'],
              ['LocalTime', 'ម៉ោងលើនាឡិកា (គ្មានថ្ងៃ/តំបន់)', 'LocalTime.of(14, 30)'],
              [
                'LocalDateTime',
                'ថ្ងៃ + ម៉ោង (គ្មានតំបន់ពេលវេលា)',
                'LocalDateTime.of(2026, 11, 22, 14, 30)',
              ],
              [
                'Instant',
                'UTC epoch timestamp (ពេលម៉ាស៊ីន)',
                'Instant.parse("2026-11-22T07:30:00Z")',
              ],
              [
                'ZonedDateTime',
                'Instant + IANA ZoneId',
                'instant.atZone(ZoneId.of("Asia/Phnom_Penh"))',
              ],
              ['Period', 'ចន្លោះប្រតិទិន (ឆ្នាំ/ខែ/ថ្ងៃ)', 'Period.between(startDate, endDate)'],
              ['Duration', 'ចន្លោះពេលជាក់លាក់ (វិនាទី/ណាណូ)', 'Duration.ofMinutes(45)'],
              [
                'DateTimeFormatter',
                'ទម្រង់អាន-សរសេរមានសុវត្ថិភាព thread',
                'DateTimeFormatter.ofPattern("dd MMM yyyy")',
              ],
            ],
          },
          exampleTitle: 'ការគណនាថ្ងៃផុតកំណត់ តំបន់ពេលវេលា និង Duration ដោយ java.time',
          warning:
            'គ្រប់វត្ថុ java.time មិនអាចកែប្រែបានទេ! ការសរសេរ invoiceDate.plusDays(14); ដោយមិនទទួលតម្លៃត្រឡប់នឹងបោះចោលលទ្ធផលដោយស្ងាត់ៗ។ ហើយកុំរក្សាទុក LocalDateTime សម្រាប់ព្រឹត្តិការណ៍សកលព្រោះវាគ្មានតំបន់ពេលវេលា—ប្រើ Instant វិញ។',
        },
        {
          id: 'functional-interfaces-and-lambdas',
          heading: 'Functional Interfaces និងការផ្សំ Lambdas',
          body: [
            'Functional interface គឺជា interface ដែលមាន abstract method តែមួយគត់ (គួរដាក់ @FunctionalInterface ដើម្បីឱ្យ compiler ផ្ទៀងផ្ទាត់)។ Lambda អនុវត្ត method នោះផ្ទាល់ដោយមិនបាច់សរសេរ anonymous class វែងៗ ដែលអនុញ្ញាតឱ្យបញ្ជូនឥរិយាបថជាទិន្នន័យទៅក្នុងការតម្រៀប ច្រោះ និង callback។',
            'កញ្ចប់ java.util.function ផ្ដល់ឧបករណ៍ស្តង់ដារ៖ Predicate<T> សម្រាប់ពិនិត្យលក្ខខណ្ឌ, Function<T, R> សម្រាប់បម្លែងតម្លៃ, Consumer<T> សម្រាប់អនុវត្តសកម្មភាព និង Supplier<T> សម្រាប់ផ្ដល់តម្លៃពេលត្រូវការ។ លើសពីនេះ method ដូចជា andThen(), compose(), and() និង negate() ជួយផ្សំអនុគមន៍តូចៗជា pipeline ងាយអាន។',
          ],
          points: [
            'ប្រើ primitive versions (IntPredicate, LongSupplier, ToIntFunction<T>) ក្នុងកូដរត់ញឹកញាប់ដើម្បីជៀសវាង autoboxing។',
            'អថេរមូលដ្ឋានដែលប្រើក្នុង lambda ត្រូវតែជា final ឬ effectively final។',
            'f.andThen(g) រត់ f មុនរួច g; f.compose(g) រត់ g មុនរួច f—និយមប្រើ andThen() ព្រោះងាយអានពីឆ្វេងទៅស្ដាំ។',
          ],
          table: {
            headers: ['Interface', 'Abstract Method', 'តួនាទី'],
            rows: [
              ['Predicate<T>', 'boolean test(T t)', 'ច្រោះ ឬផ្ទៀងផ្ទាត់តម្លៃ'],
              ['Function<T, R>', 'R apply(T t)', 'បម្លែង T ទៅជា R'],
              ['UnaryOperator<T>', 'T apply(T t)', 'បម្លែង T ទៅប្រភេទ T ដដែល'],
              ['BiFunction<T, U, R>', 'R apply(T t, U u)', 'ផ្សំតម្លៃពីរទៅជា R'],
              ['Consumer<T>', 'void accept(T t)', 'អនុវត្តសកម្មភាព (បោះពុម្ព រក្សាទុក)'],
              ['Supplier<T>', 'T get()', 'បង្កើត ឬផ្ដល់តម្លៃពេលត្រូវការ'],
            ],
          },
          exampleTitle: 'ការផ្សំ Pipeline ដោយ Function និង Predicate',
          tip: 'ប្រើ Supplier<T> សម្រាប់តម្លៃជំនួសដែលចំណាយធនធាន—ដូចជា optional.orElseGet(() -> buildFallback()) នឹងដំណើរការតែពេល Optional ទទេប៉ុណ្ណោះ។',
        },
        {
          id: 'method-references-four-forms',
          heading: 'Pipeline ស្អាតជាងមុនដោយ Method References (::)',
          body: [
            'នៅពេល lambda គ្រាន់តែបញ្ជូនប៉ារ៉ាម៉ែត្រផ្ទាល់ទៅហៅ method ឬ constructor ដែលមានស្រាប់, method reference (::) ជួយកាត់បន្ថយកូដលើស និងបង្ហាញចេតនាច្បាស់លាស់។ ឧទាហរណ៍ s -> s.toUpperCase() ក្លាយជា String::toUpperCase។',
            'Java គាំទ្រទម្រង់ method reference ចំនួន ៤៖ static method (Integer::parseInt), bound instance method លើវត្ថុជាក់លាក់ (System.out::println), unbound instance method ដែលប៉ារ៉ាម៉ែត្រទី ១ ជាវត្ថុទទួល (String::strip) និង constructor (User::new)។',
          ],
          points: [
            'Static reference៖ ClassName::staticMethod (ឧ. Integer::parseInt ជំនួស s -> Integer.parseInt(s))។',
            'Bound instance reference៖ instance::method (ឧ. System.out::println)។',
            'Unbound instance reference៖ ClassName::instanceMethod (ឧ. User::name ក្នុង Comparator.comparing(User::name))។',
            'Constructor reference៖ ClassName::new (ឧ. User::new ឬ String[]::new)។',
          ],
          exampleTitle: 'ការប្រើប្រាស់ទម្រង់ទាំង ៤ នៃ Method References (::)',
          tip: 'ប្រើ method reference ពេលវាធ្វើឱ្យ pipeline កាន់តែងាយអានភ្លាមៗ ប៉ុន្តែរក្សា lambda ធម្មតាពេលត្រូវការប៉ារ៉ាម៉ែត្របន្ថែម ឬលក្ខខណ្ឌច្រើនជំហាន។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ static method ឈ្មោះ formatUpcomingDeadlines(List<LocalDate> dates, LocalDate today, Function<LocalDate, String> formatter) ដែលស្ទ្រីម dates រក្សាតែថ្ងៃក្រោយ today (d.isAfter(today)) តម្រៀបតាមលំដាប់កាលបរិច្ឆេទ បម្លែងដោយ formatter រួចត្រឡប់ List<String>។',
        hint: 'ប្រើ dates.stream().filter(d -> d.isAfter(today)).sorted().map(formatter).toList() ហើយសាកល្បងដោយបញ្ជូន fmt::format។',
      },
      quiz: [
        {
          question:
            'តើថ្នាក់ java.time ណាដែលល្អបំផុតសម្រាប់រក្សាទុក UTC timestamp មិនអាស្រ័យតំបន់ពេលវេលាក្នុង database?',
          options: ['LocalDate', 'LocalDateTime', 'Instant', 'Period'],
          answer: 2,
          explanation:
            'Instant តំណាងចំណុចពេលវេលាជាក់លាក់លើ UTC ដោយគ្មានភាពស្រពិចស្រពិលពីតំបន់ពេលវេលា។ បម្លែង Instant ទៅ ZonedDateTime តែពេលបង្ហាញដល់អ្នកប្រើ។',
        },
        {
          question: 'តើ lambda ណាដែលមានន័យដូច method reference String::isBlank?',
          options: [
            '() -> String.isBlank()',
            's -> s.isBlank()',
            '(a, b) -> a.isBlank(b)',
            '() -> new String()',
          ],
          answer: 1,
          explanation:
            'String::isBlank គឺជា unbound instance method reference៖ ប៉ារ៉ាម៉ែត្រ s ដែលបញ្ជូនចូល Predicate<String> ក្លាយជាវត្ថុទទួលនៃ s.isBlank()។',
        },
      ],
    },
  },
]
