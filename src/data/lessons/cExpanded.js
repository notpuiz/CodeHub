export const cExpanded = [
  // =========================================================================
  // 1. OPERATORS, TYPE CASTING & BITWISE LOGIC
  // =========================================================================
  {
    slug: 'c-operators-and-bitwise',
    level: 'beginner',
    insertAfter: 'c-basics',
    en: {
      title: 'Operators, Type Casting & Bitwise Logic',
      duration: '14 min',
      summary:
        'Master C arithmetic, relational, and logical operators, control integer-to-floating-point type conversions, and manipulate individual bits cleanly using bitwise operators and bitmasks.',
      objectives: [
        'Apply C arithmetic, compound assignment, relational, and short-circuit logical operators with accurate operator precedence.',
        'Avoid integer division truncation by using explicit type casts and understanding implicit numeric promotions.',
        'Set, clear, toggle, and inspect individual flag bits using &, |, ^, ~, <<, and >> on unsigned integers.',
      ],
      sections: [
        {
          id: 'arithmetic-relational-and-logical-operators',
          heading: 'Arithmetic, Relational & Logical Operators',
          body: [
            'Operators are the building blocks that combine variables and constants into expressions. C groups them into arithmetic (+, -, *, /, %), compound assignment (+=, -=, *=, /=, %=), increment/decrement (++, --), relational (==, !=, <, <=, >, >=), and logical (&&, ||, !) families. Unlike some higher-level languages, C has no built-in exponentiation operator—the caret ^ is bitwise XOR, not power.',
            'Every relational and logical expression in C evaluates to an int: 1 for true and 0 for false. Logical AND (&&) and logical OR (||) short-circuit from left to right, meaning the right-hand operand is skipped whenever the left-hand side already determines the final result. That guarantee lets you write safe guards like (count != 0 && total / count > 50) without risking division by zero.',
          ],
          points: [
            'The modulo operator (%) returns the division remainder and works only on integer types (not float or double).',
            'Prefix ++x increments x before producing its value; postfix x++ produces the old value and then increments x.',
            'Short-circuit evaluation in && and || protects against dividing by zero or dereferencing a NULL pointer on the right side.',
            'When mixing arithmetic, relational, and logical operators, use parentheses to make intent unmistakable.',
          ],
          table: {
            headers: ['Category', 'Operators', 'Example', 'Evaluates To'],
            rows: [
              ['Arithmetic', '+, -, *, /, %', '17 % 5', '2 (remainder)'],
              ['Compound assign', '+=, -=, *=, /=, %=', 'score += 10', 'Adds 10 to score'],
              ['Relational', '==, !=, <, <=, >, >=', 'age >= 18', '1 (true) or 0 (false)'],
              ['Logical', '&&, ||, !', 'n > 0 && 100 / n > 5', 'Short-circuits if n <= 0'],
              ['Ternary', 'cond ? a : b', 'x > y ? x : y', 'Larger of x and y'],
            ],
          },
          example: {
            title: 'Short-Circuit Guards, Modulo & Ternary Expressions',
            language: 'c',
            code: `#include <stdio.h>

int main(void) {
    int items = 17;
    int box_size = 5;
    int full_boxes = items / box_size;
    int leftover = items % box_size;

    printf("Boxes: %d, Leftover: %d\\n", full_boxes, leftover);

    int total_score = 420;
    int quizzes = 0;

    /* Safe: quizzes != 0 is false, so total_score / quizzes is never evaluated */
    if (quizzes != 0 && (total_score / quizzes) >= 80) {
        printf("Status: Honors\\n");
    } else {
        const char *label = (quizzes == 0) ? "No quizzes yet" : "Keep practicing";
        printf("Status: %s\\n", label);
    }

    return 0;
}`,
            output: `Boxes: 3, Leftover: 2
Status: No quizzes yet`,
          },
          tip: 'Avoid mutating the same variable twice inside one expression (such as a[i] = i++). The evaluation order of subexpressions is unsequenced in C and causes Undefined Behavior.',
        },
        {
          id: 'type-casting-and-integer-division',
          heading: 'Implicit Promotions, Explicit Casts & Integer vs Float Division',
          body: [
            'When an operator combines two different numeric types—such as an int and a double—C performs "usual arithmetic conversions", automatically promoting the narrower type to the wider type before computing. However, if both operands are integers, C performs integer arithmetic even when the destination variable is a double.',
            'This is why double avg = 7 / 2; stores 3.0 instead of 3.5: the division 7 / 2 truncates toward zero first, producing the integer 3, and only afterward widens 3 to 3.0. To compute floating-point division, explicitly cast at least one operand with (double) before dividing. Explicit casts also document narrowing conversions—such as converting a double to an int—so readers know truncation was intentional.',
          ],
          points: [
            '(double)a / b casts a first and performs floating-point division; (double)(a / b) divides as integers first and loses the fraction.',
            'Integer types smaller than int (char, short) are automatically promoted to int during arithmetic expressions.',
            'Mixing signed and unsigned integers in comparisons (like -1 < 1U) converts the signed value to a huge unsigned number—avoid mixing signedness.',
          ],
          example: {
            title: 'Integer Division vs Explicit (double) Type Casting',
            language: 'c',
            code: `#include <stdio.h>

int main(void) {
    int passed = 7;
    int total = 8;

    double wrong_rate = passed / total;            /* 7 / 8 == 0 -> 0.0 */
    double exact_rate = (double)passed / total;    /* 7.0 / 8 == 0.875 */
    int percent = (int)(exact_rate * 100.0 + 0.5); /* rounded to nearest int */

    printf("Wrong (int div): %.3f\\n", wrong_rate);
    printf("Exact (cast):    %.3f\\n", exact_rate);
    printf("Rounded percent: %d%%\\n", percent);

    return 0;
}`,
            output: `Wrong (int div): 0.000
Exact (cast):    0.875
Rounded percent: 88%`,
          },
          warning:
            'Be careful when comparing signed int with unsigned size_t (for example from sizeof or strlen). In C, -1 < sizeof(int) evaluates to FALSE because -1 converts to the maximum size_t value.',
        },
        {
          id: 'bitwise-operators-and-bitmasks',
          heading: 'Bitwise Operators (&, |, ^, ~, <<, >>) & Bitmasks',
          body: [
            'Bitwise operators act on every individual binary bit of an integer in parallel. They are indispensable in systems programming, embedded hardware registers, network packet headers, and compact permission flags where packing eight boolean settings into a single uint8_t byte saves memory and CPU cycles.',
            'A bitmask is an integer constant with specific bit positions set to 1 (usually written as 1U << bit_index). Combining a value with a mask follows four classic idioms: OR (flags |= MASK) sets a bit, AND with NOT (flags &= ~MASK) clears a bit, XOR (flags ^= MASK) toggles a bit, and AND ((flags & MASK) != 0) tests whether a bit is enabled.',
          ],
          points: [
            'Always use unsigned types (uint8_t, uint32_t, unsigned int) for bitwise shifts and masks to avoid sign-bit surprises.',
            'Do not confuse bitwise & / | with logical && / ||: 4 & 2 is 0 (no shared 1-bits), whereas 4 && 2 is 1 (both nonzero).',
            'Bitwise operators (&, |, ^) have LOWER precedence than == and !=, so always parenthesize: if ((flags & FLAG_WRITE) != 0).',
          ],
          table: {
            headers: ['Operator', 'Name', 'Idiom / Example', 'Effect'],
            rows: [
              ['&', 'Bitwise AND', '(flags & MASK) != 0', 'Tests if MASK bit is 1'],
              ['|', 'Bitwise OR', 'flags |= MASK', 'Sets MASK bit to 1'],
              ['^', 'Bitwise XOR', 'flags ^= MASK', 'Flips (toggles) MASK bit'],
              ['~', 'Bitwise NOT', 'flags &= ~MASK', 'Clears MASK bit to 0'],
              ['<<', 'Left shift', '1U << 3', 'Produces 8 (binary 1000)'],
              ['>>', 'Right shift', 'val >> 2', 'Divides unsigned val by 4'],
            ],
          },
          example: {
            title: 'Managing Permission Flags with Unsigned Bitmasks',
            language: 'c',
            code: `#include <stdint.h>
#include <stdio.h>

#define PERM_READ   (1U << 0)  /* 0001 = 1 */
#define PERM_WRITE  (1U << 1)  /* 0010 = 2 */
#define PERM_EXEC   (1U << 2)  /* 0100 = 4 */

int main(void) {
    uint8_t mode = 0;

    /* Set READ and WRITE */
    mode |= (PERM_READ | PERM_WRITE);
    printf("After set (R|W):    0x%02X\\n", mode);

    /* Toggle EXEC on */
    mode ^= PERM_EXEC;
    printf("After toggle EXEC:  0x%02X\\n", mode);

    /* Clear WRITE */
    mode &= (uint8_t)~PERM_WRITE;
    printf("After clear WRITE:  0x%02X\\n", mode);

    /* Test individual bits */
    printf("Can read?  %s\\n", (mode & PERM_READ)  ? "yes" : "no");
    printf("Can write? %s\\n", (mode & PERM_WRITE) ? "yes" : "no");
    printf("Can exec?  %s\\n", (mode & PERM_EXEC)  ? "yes" : "no");

    return 0;
}`,
            output: `After set (R|W):    0x03
After toggle EXEC:  0x07
After clear WRITE:  0x05
Can read?  yes
Can write? no
Can exec?  yes`,
          },
          warning:
            'Left-shifting a negative signed integer or shifting by a count greater than or equal to the type width (such as 1U << 32 on a 32-bit int) is Undefined Behavior. Stick to unsigned types and shift counts strictly less than bit width.',
        },
      ],
      challenge: {
        prompt:
          'Write a C program that defines four uint8_t device flag masks (POWER = 1U << 0, WIFI = 1U << 1, BLUETOOTH = 1U << 2, MUTED = 1U << 3). Start with status = POWER | WIFI, toggle MUTED on, clear WIFI, check whether POWER and WIFI are active, and compute the floating-point ratio of enabled bits out of 4 using an explicit (double) cast.',
        hint: 'Use |= to set, ^= to toggle, &= (uint8_t)~MASK to clear, and count active bits with ((status >> i) & 1U). Cast the bit count to (double) before dividing by 4.',
        language: 'c',
        solutionCode: `#include <stdint.h>
#include <stdio.h>

#define FLAG_POWER     (1U << 0)
#define FLAG_WIFI      (1U << 1)
#define FLAG_BLUETOOTH (1U << 2)
#define FLAG_MUTED     (1U << 3)

int main(void) {
    uint8_t status = FLAG_POWER | FLAG_WIFI;
    status ^= FLAG_MUTED;
    status &= (uint8_t)~FLAG_WIFI;

    int active = 0;
    for (unsigned i = 0; i < 4; i++) {
        if ((status >> i) & 1U) {
            active++;
        }
    }

    double ratio = (double)active / 4;
    printf("Status: 0x%02X | Power: %s | WiFi: %s | Active ratio: %.2f\\n",
           status,
           (status & FLAG_POWER) ? "ON" : "OFF",
           (status & FLAG_WIFI) ? "ON" : "OFF",
           ratio);
    return 0;
}`,
      },
      quiz: [
        {
          question: 'What value is stored in result by the C statement: double result = 9 / 4;',
          options: ['2.25', '2.0', '2.5', 'A compile-time error'],
          answer: 1,
          explanation:
            'Both 9 and 4 are int literals, so C performs integer division first (9 / 4 == 2) and then widens 2 to 2.0 when assigning to result. Use (double)9 / 4 to get 2.25.',
        },
        {
          question:
            'Given uint8_t flags = 0x07; and #define BIT1 (1U << 1), which expression clears ONLY bit 1 without modifying other bits?',
          options: ['flags |= ~BIT1;', 'flags &= ~BIT1;', 'flags ^= BIT1;', 'flags = !BIT1;'],
          answer: 1,
          explanation:
            '~BIT1 creates a mask with 0 at bit 1 and 1s everywhere else. Bitwise AND (&=) clears bit 1 while preserving all other bits.',
        },
      ],
    },
    km: {
      title: 'ប្រមាណវិធី ការបម្លែងប្រភេទ (Type Casting) និងតក្កវិទ្យាប៊ីត (Bitwise)',
      duration: '14 នាទី',
      summary:
        'ស្ទាត់ជំនាញប្រមាណវិធីនព្វន្ត ការប្រៀបធៀប និងតក្កវិទ្យាក្នុង C គ្រប់គ្រងការបម្លែងប្រភេទចំនួនគត់ទៅចំនួនទសភាគ និងប្រើប្រមាណវិធីប៊ីត (Bitwise) និង Bitmask យ៉ាងមានប្រសិទ្ធភាព។',
      objectives: [
        'ប្រើប្រមាណវិធីនព្វន្ត ការផ្ដល់តម្លៃបន្ថែម ការប្រៀបធៀប និងតក្កវិទ្យា short-circuit ដោយគោរពលំដាប់អាទិភាពត្រឹមត្រូវ។',
        'ជៀសវាងការកាត់ក្បៀសក្នុងការចែកចំនួនគត់ ដោយប្រើការបម្លែងប្រភេទដោយផ្ទាល់ (explicit cast) និងយល់ពីការបម្លែងស្វ័យប្រវត្តិ។',
        'បើក បិទ ត្រឡប់ និងពិនិត្យប៊ីតនីមួយៗដោយប្រើ &, |, ^, ~, << និង >> លើចំនួនគត់គ្មានសញ្ញា (unsigned)។',
      ],
      sections: [
        {
          id: 'arithmetic-relational-and-logical-operators',
          heading: 'ប្រមាណវិធីនព្វន្ត ការប្រៀបធៀប និងតក្កវិទ្យា',
          body: [
            'ប្រមាណវិធីគឺជាគ្រឹះសម្រាប់ផ្សំអថេរ និងតម្លៃថេរទៅជាកន្សោម។ ភាសា C ចែកប្រមាណវិធីជាក្រុមនព្វន្ត (+, -, *, /, %) ការផ្ដល់តម្លៃរួម (+=, -=, *=, /=, %=) ការបូក/ដកមួយ (++, --) ការប្រៀបធៀប (==, !=, <, <=, >, >=) និងតក្កវិទ្យា (&&, ||, !)។ ចំណាំថា C គ្មានសញ្ញាស្វ័យគុណស្រាប់ទេ—សញ្ញា ^ គឺជា bitwise XOR មិនមែនស្វ័យគុណឡើយ។',
            'កន្សោមប្រៀបធៀប និងតក្កវិទ្យាទាំងអស់ក្នុង C ផ្ដល់លទ្ធផលជា int៖ 1 សម្រាប់ពិត និង 0 សម្រាប់មិនពិត។ ប្រមាណវិធី && និង || ដំណើរការបែប short-circuit ពីឆ្វេងទៅស្ដាំ ដោយរំលងផ្នែកខាងស្ដាំភ្លាមបើផ្នែកខាងឆ្វេងកំណត់លទ្ធផលរួចហើយ។ លក្ខណៈនេះអនុញ្ញាតឱ្យសរសេរលក្ខខណ្ឌសុវត្ថិភាពដូចជា (count != 0 && total / count > 50) ដោយមិនភ័យចែកនឹងសូន្យ។',
          ],
          points: [
            'ប្រមាណវិធីសំណល់ (%) ត្រឡប់សំណល់នៃការចែក ហើយប្រើបានតែលើប្រភេទចំនួនគត់ប៉ុណ្ណោះ (មិនប្រើលើ float/double ទេ)។',
            '++x បូក 1 មុនពេលយកតម្លៃប្រើ ចំណែក x++ យកតម្លៃចាស់ប្រើសិនទើបបូក 1 តាមក្រោយ។',
            'Short-circuit របស់ && និង || ជួយការពារកុំឱ្យចែកនឹងសូន្យ ឬអាន pointer ដែលជា NULL។',
            'នៅពេលលាយប្រមាណវិធីច្រើនប្រភេទ សូមដាក់វង់ក្រចកដើម្បីបង្ហាញលំដាប់គណនាឱ្យច្បាស់។',
          ],
          table: {
            headers: ['ក្រុម', 'ប្រមាណវិធី', 'ឧទាហរណ៍', 'លទ្ធផល'],
            rows: [
              ['នព្វន្ត', '+, -, *, /, %', '17 % 5', '2 (សំណល់)'],
              ['ផ្ដល់តម្លៃរួម', '+=, -=, *=, /=, %=', 'score += 10', 'បូក 10 បញ្ចូលក្នុង score'],
              ['ប្រៀបធៀប', '==, !=, <, <=, >, >=', 'age >= 18', '1 (ពិត) ឬ 0 (មិនពិត)'],
              ['តក្កវិទ្យា', '&&, ||, !', 'n > 0 && 100 / n > 5', 'ឈប់ត្រឹមឆ្វេងបើ n <= 0'],
              ['Ternary', 'cond ? a : b', 'x > y ? x : y', 'តម្លៃធំជាងរវាង x និង y'],
            ],
          },
          exampleTitle: 'ការការពារដោយ Short-Circuit, សំណល់ (%) និង Ternary',
          tip: 'ជៀសវាងការកែប្រែអថេរតែមួយពីរដងក្នុងកន្សោមតែមួយ (ដូចជា a[i] = i++) ព្រោះលំដាប់គណនាមិនត្រូវបានកំណត់ក្នុង C ហើយបង្ក Undefined Behavior។',
        },
        {
          id: 'type-casting-and-integer-division',
          heading: 'ការបម្លែងស្វ័យប្រវត្តិ ការបម្លែងដោយផ្ទាល់ និងការចែកចំនួនគត់ទល់នឹងទសភាគ',
          body: [
            'នៅពេលប្រមាណវិធីផ្សំប្រភេទលេខពីរខុសគ្នា—ដូចជា int និង double—ភាសា C នឹងបង្កើនប្រភេទតូចជាងទៅជាប្រភេទធំជាងដោយស្វ័យប្រវត្តិមុនពេលគណនា។ ប៉ុន្តែបើអង្គទាំងពីរសុទ្ធតែជាចំនួនគត់ C នឹងគណនាតាមបែបចំនួនគត់ ទោះបីលទ្ធផលត្រូវរក្សាទុកក្នុង double ក៏ដោយ។',
            'នេះជាមូលហេតុដែល double avg = 7 / 2; រក្សាទុក 3.0 ជំនួសឱ្យ 3.5៖ ការចែក 7 / 2 កាត់ក្បៀសចោលបាន 3 សិន ទើបបម្លែងទៅ 3.0 តាមក្រោយ។ ដើម្បីបានលទ្ធផលទសភាគ ត្រូវបម្លែងអង្គយ៉ាងតិចមួយជា (double) មុនពេលចែក។ ការដាក់ cast ដោយផ្ទាល់ក៏ជួយបញ្ជាក់ផងដែរនៅពេលអ្នកមានចេតនាកាត់ទសភាគពី double មក int។',
          ],
          points: [
            '(double)a / b បម្លែង a សិនទើបចែកជាទសភាគ ចំណែក (double)(a / b) ចែកជាចំនួនគត់រួចបាត់ក្បៀសមុន។',
            'ប្រភេទចំនួនគត់តូចជាង int (char, short) ត្រូវបានបង្កើនជា int ដោយស្វ័យប្រវត្តិពេលគណនា។',
            'ការប្រៀបធៀបលេខមានសញ្ញា (signed) ជាមួយគ្មានសញ្ញា (unsigned) ដូចជា -1 < 1U បម្លែង -1 ទៅជាលេខ unsigned ធំមហិមា—សូមជៀសវាង។',
          ],
          exampleTitle: 'ការចែកចំនួនគត់ទល់នឹងការបម្លែង (double) ដោយផ្ទាល់',
          warning:
            'សូមប្រុងប្រយ័ត្នពេលប្រៀបធៀប int ជាមួយ size_t (ឧទាហរណ៍ពី sizeof ឬ strlen)។ ក្នុង C លក្ខខណ្ឌ -1 < sizeof(int) ផ្ដល់លទ្ធផលមិនពិត ព្រោះ -1 ត្រូវបម្លែងទៅជាតម្លៃអតិបរមារបស់ size_t។',
        },
        {
          id: 'bitwise-operators-and-bitmasks',
          heading: 'ប្រមាណវិធីប៊ីត (&, |, ^, ~, <<, >>) និង Bitmasks',
          body: [
            'ប្រមាណវិធីប៊ីត (Bitwise) ដំណើរការលើប៊ីតគោលពីរនីមួយៗនៃចំនួនគត់ក្នុងពេលតែមួយ។ វាមានសារៈសំខាន់ខ្លាំងក្នុងការសរសេរកម្មវិធីប្រព័ន្ធ (systems programming) ឧបករណ៍អេឡិចត្រូនិក ក្បាលកញ្ចប់បណ្ដាញ និងការផ្ទុកសិទ្ធិឬស្ថានភាព ៨ ក្នុងតែមួយបៃ uint8_t ដើម្បីសន្សំសំចៃអង្គចងចាំ និងល្បឿន CPU។',
            'Bitmask គឺជាតម្លៃថេរដែលមានប៊ីតជាក់លាក់ស្មើ 1 (ជាទូទៅសរសេរ 1U << ទីតាំងប៊ីត)។ មានទម្រង់សំខាន់បួន៖ OR (flags |= MASK) ដើម្បីបើកប៊ីត, AND ជាមួយ NOT (flags &= ~MASK) ដើម្បីបិទប៊ីត, XOR (flags ^= MASK) ដើម្បីត្រឡប់ប៊ីត និង AND ((flags & MASK) != 0) ដើម្បីពិនិត្យថាប៊ីតនោះបើកឬអត់។',
          ],
          points: [
            'ប្រើប្រភេទគ្មានសញ្ញា (uint8_t, uint32_t, unsigned int) ជានិច្ចសម្រាប់ bitwise ដើម្បីជៀសវាងបញ្ហាប៊ីតសញ្ញា។',
            'កុំច្រឡំ bitwise & / | ជាមួយតក្កវិទ្យា && / ||៖ 4 & 2 ស្មើ 0 តែ 4 && 2 ស្មើ 1។',
            'ប្រមាណវិធី &, |, ^ មានអាទិភាពទាបជាង == និង != ដូច្នេះត្រូវដាក់វង់ក្រចកជានិច្ច៖ if ((flags & FLAG_WRITE) != 0)។',
          ],
          table: {
            headers: ['ប្រមាណវិធី', 'ឈ្មោះ', 'ទម្រង់ប្រើប្រាស់', 'ឥទ្ធិពល'],
            rows: [
              ['&', 'Bitwise AND', '(flags & MASK) != 0', 'ពិនិត្យថាប៊ីត MASK ស្មើ 1 ឬអត់'],
              ['|', 'Bitwise OR', 'flags |= MASK', 'កំណត់ប៊ីត MASK ទៅជា 1'],
              ['^', 'Bitwise XOR', 'flags ^= MASK', 'ត្រឡប់ (toggle) ប៊ីត MASK'],
              ['~', 'Bitwise NOT', 'flags &= ~MASK', 'លុប (clear) ប៊ីត MASK ទៅជា 0'],
              ['<<', 'រំកិលឆ្វេង', '1U << 3', 'បង្កើតលេខ 8 (គោលពីរ 1000)'],
              ['>>', 'រំកិលស្ដាំ', 'val >> 2', 'ចែក val (unsigned) នឹង 4'],
            ],
          },
          exampleTitle: 'ការគ្រប់គ្រងសិទ្ធិប្រើប្រាស់ដោយ Unsigned Bitmasks',
          warning:
            'ការរំកិលឆ្វេង (<<) លើចំនួនអវិជ្ជមាន ឬរំកិលចំនួនដងធំជាងឬស្មើទំហំប៊ីតនៃប្រភេទ (ដូចជា 1U << 32 លើ 32-bit int) គឺជា Undefined Behavior។ សូមប្រើប្រភេទ unsigned និងចំនួនរំកិលតូចជាងទំហំប៊ីតជានិច្ច។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរកម្មវិធី C ដែលកំណត់ bitmask ប្រភេទ uint8_t ចំនួន ៤ (POWER = 1U << 0, WIFI = 1U << 1, BLUETOOTH = 1U << 2, MUTED = 1U << 3)។ ចាប់ផ្ដើមពី status = POWER | WIFI បន្ទាប់មក toggle ប៊ីត MUTED ឱ្យបើក, clear ប៊ីត WIFI, ពិនិត្យស្ថានភាព POWER និង WIFI រួចគណនាអត្រាទសភាគនៃប៊ីតដែលបើកធៀបនឹង 4 ដោយប្រើ (double) cast។',
        hint: 'ប្រើ |= ដើម្បីបើក, ^= ដើម្បីត្រឡប់, &= (uint8_t)~MASK ដើម្បីបិទ និងរាប់ប៊ីតដោយ ((status >> i) & 1U)។ បម្លែងចំនួនប៊ីតជា (double) មុនចែកនឹង 4។',
      },
      quiz: [
        {
          question: 'តើតម្លៃណាត្រូវបានរក្សាទុកក្នុង result ដោយឃ្លា C នេះ៖ double result = 9 / 4;',
          options: ['2.25', '2.0', '2.5', 'មានកំហុសពេល compile'],
          answer: 1,
          explanation:
            'ទាំង 9 និង 4 សុទ្ធតែជា int ដូច្នេះ C ចែកជាចំនួនគត់សិន (9 / 4 == 2) រួចទើបបម្លែង 2 ទៅជា 2.0 ពេលផ្ដល់តម្លៃឱ្យ result។ ត្រូវសរសេរ (double)9 / 4 ទើបបាន 2.25។',
        },
        {
          question:
            'បើមាន uint8_t flags = 0x07; និង #define BIT1 (1U << 1) តើកន្សោមណាលុបតែប៊ីតទី 1 ដោយមិនប៉ះពាល់ប៊ីតផ្សេង?',
          options: ['flags |= ~BIT1;', 'flags &= ~BIT1;', 'flags ^= BIT1;', 'flags = !BIT1;'],
          answer: 1,
          explanation:
            '~BIT1 បង្កើត mask ដែលមាន 0 ត្រង់ប៊ីតទី 1 និង 1 នៅគ្រប់ទីតាំងផ្សេង។ ការប្រើ &= នឹងបិទតែប៊ីតទី 1 ហើយរក្សាប៊ីតដទៃដដែល។',
        },
      ],
    },
  },

  // =========================================================================
  // 2. SWITCH, STORAGE CLASSES & VARIABLE SCOPE
  // =========================================================================
  {
    slug: 'c-switch-and-scope',
    level: 'beginner',
    insertAfter: 'c-control-flow-functions',
    en: {
      title: 'switch, Storage Classes & Variable Scope',
      duration: '13 min',
      summary:
        'Branch cleanly with C switch statements, understand lexical block scope and stack lifetimes, and control persistence, mutability, and multi-file linkage using static, const, and extern.',
      objectives: [
        'Write readable, safe switch statements using integer or character case labels, intentional grouping, break, and default.',
        'Trace variable visibility across nested blocks and avoid returning pointers to dead stack-allocated locals.',
        'Use static, const, and extern properly to control storage duration, read-only guarantees, and cross-file visibility.',
      ],
      sections: [
        {
          id: 'switch-statements-and-fallthrough',
          heading: 'Multi-Way Branching with switch',
          body: [
            'When a single integer, char, or enum expression needs to match against several constant values, a switch statement is clearer and often faster than a long chain of if / else if checks. Each case label must be a compile-time integer constant expression—C does not allow strings or runtime variables as case values.',
            "Once execution jumps to a matching case, C continues running sequentially downward until it hits a break, a return, or the closing brace of the switch. This behavior is called fall-through. Grouping empty cases intentionally (such as case 'y': case 'Y':) is idiomatic, while forgetting break after a non-empty case is one of the most common bugs in C.",
          ],
          points: [
            'Switch expressions must have an integer type (char, int, enum); strings require strcmp() with if / else if.',
            'Always include a default branch to handle unexpected inputs gracefully.',
            'If you need to declare a local variable inside a case branch, wrap that branch in curly braces { ... } to create a block scope.',
          ],
          example: {
            title: 'Menu Command Dispatch with Grouped switch Cases',
            language: 'c',
            code: `#include <stdio.h>

void handle_command(char cmd) {
    switch (cmd) {
        case 'r':
        case 'R':
            printf("Action: Reload configuration\\n");
            break;
        case 's':
        case 'S': {
            int saved_bytes = 2048;
            printf("Action: Saved %d bytes\\n", saved_bytes);
            break;
        }
        case 'q':
        case 'Q':
            printf("Action: Shutting down cleanly\\n");
            break;
        default:
            printf("Unknown command: '%c'\\n", cmd);
            break;
    }
}

int main(void) {
    handle_command('R');
    handle_command('s');
    handle_command('x');
    return 0;
}`,
            output: `Action: Reload configuration
Action: Saved 2048 bytes
Unknown command: 'x'`,
          },
          warning:
            'Forgetting break at the end of a non-empty case causes silent fall-through into the next case. Whenever fall-through IS intentional, add a clear /* fallthrough */ comment so compilers (-Wimplicit-fallthrough) and teammates know it is deliberate.',
        },
        {
          id: 'block-scope-and-stack-lifetimes',
          heading: 'Block Scope, Shadowing & Automatic Stack Lifetimes',
          body: [
            'Scope determines where an identifier can be named in source code, while storage duration (lifetime) determines how long its memory remains valid at runtime. Any variable declared inside curly braces { ... }—including function parameters and for-loop counters—has block scope and automatic storage duration: it is created on the call stack when execution enters the block and destroyed as soon as the block exits.',
            'Declaring a variable in an inner block with the same name as an outer variable hides ("shadows") the outer one until the inner block ends. While legal in C, shadowing makes bugs hard to spot and should generally be avoided. More critically, because automatic variables vanish when a function returns, you must never return the address (&local) of a local variable.',
          ],
          points: [
            'Keep variable scope as narrow as possible—declare loop indices inside for (int i = 0; i < n; i++).',
            'Automatic local variables are NOT zero-initialized by default; reading them before assignment yields indeterminate garbage.',
            'Enable -Wshadow in GCC/Clang to catch accidental variable shadowing at compile time.',
          ],
          example: {
            title: 'Tracing Block Scope & Safe Caller-Owned Buffers',
            language: 'c',
            code: `#include <stdio.h>

/* Safe pattern: caller passes destination buffer instead of returning local address */
void format_tag(char *out, size_t out_size, int id) {
    snprintf(out, out_size, "TASK-%03d", id);
}

int main(void) {
    int count = 10;
    printf("Outer count before block: %d\\n", count);

    {
        int temp = 42;
        count += temp;
        printf("Inside block -> count: %d, temp: %d\\n", count, temp);
    }
    /* temp is out of scope and its lifetime has ended here */

    char label[16];
    format_tag(label, sizeof(label), 7);
    printf("Outer count after block:  %d\\n", count);
    printf("Formatted label:          %s\\n", label);
    return 0;
}`,
            output: `Outer count before block: 10
Inside block -> count: 52, temp: 42
Outer count after block:  52
Formatted label:          TASK-007`,
          },
          warning:
            'Never return &local_var or a local array from a function! The stack frame is popped on return, leaving the caller with a dangling pointer whose memory will be overwritten by the next function call.',
        },
        {
          id: 'storage-classes-static-const-extern',
          heading: 'Storage Classes: static, const & extern',
          body: [
            'Storage-class specifiers and type qualifiers give you fine-grained control over lifetime, linkage across .c files, and mutability. The static keyword has two distinct meanings depending on placement: inside a function, a static local variable is initialized once and retains its value across calls (static storage duration); at file scope, static gives a variable or helper function internal linkage so it remains private to that .c file.',
            'The extern keyword declares a variable or function that is defined in another translation unit (.c file) without allocating new storage—it tells the compiler "the linker will find this symbol in another object file." Meanwhile, const marks a value or pointed-to data as read-only, catching accidental writes at compile time and documenting function contracts clearly.',
          ],
          points: [
            'Static and file-scope variables are automatically zero-initialized before main() runs.',
            'Mark internal helper functions static in .c files to prevent symbol-name collisions when linking large projects.',
            'Place extern declarations in .h header files and define the actual variable once in a single .c file.',
            'Prefer const parameters (like const char *msg) whenever a function only reads data through a pointer.',
          ],
          table: {
            headers: ['Keyword', 'Where Used', 'Lifetime', 'Visibility / Linkage'],
            rows: [
              ['(default local)', 'Inside function/block', 'Automatic (stack)', 'Block scope only'],
              ['static (local)', 'Inside function/block', 'Entire program run', 'Block scope only'],
              [
                'static (file)',
                'Top-level of .c file',
                'Entire program run',
                'Internal (this .c file only)',
              ],
              [
                'extern',
                'Header (.h) or .c file',
                'Entire program run',
                'External (shared across .c files)',
              ],
              ['const', 'Variables / parameters', 'Follows storage class', 'Read-only qualifier'],
            ],
          },
          example: {
            title: 'Persistent static Local Counter & Internal File Helpers',
            language: 'c',
            code: `#include <stdio.h>

/* Private to this .c file (internal linkage) */
static const int MAX_RETRIES = 3;

static int next_request_id(void) {
    /* Initialized once; persists across calls */
    static int counter = 1000;
    counter++;
    return counter;
}

/* Example declaration of a variable defined in another .c file:
   extern int global_debug_level; */

int main(void) {
    for (int attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        int id = next_request_id();
        printf("Attempt %d/%d -> Request ID #%d\\n", attempt, MAX_RETRIES, id);
    }
    return 0;
}`,
            output: `Attempt 1/3 -> Request ID #1001
Attempt 2/3 -> Request ID #1002
Attempt 3/3 -> Request ID #1003`,
          },
          tip: 'While static local variables are handy for simple counters or caches, remember they hold shared mutable state and are not thread-safe by default in multithreaded programs.',
        },
      ],
      challenge: {
        prompt:
          'Write a C program with a static helper function int track_http_status(int code) that uses a switch statement to print a category ("Success" for 200/201, "Client Error" for 400/404, "Server Error" for 500, and "Other" for default) and keeps a static local counter of how many total requests have been processed, returning the updated count.',
        hint: 'Group case 200: case 201: and case 400: case 404: without duplicating code, and declare static int total_calls = 0; inside track_http_status.',
        language: 'c',
        solutionCode: `#include <stdio.h>

static int track_http_status(int code) {
    static int total_calls = 0;
    total_calls++;

    const char *category;
    switch (code) {
        case 200:
        case 201:
            category = "Success";
            break;
        case 400:
        case 404:
            category = "Client Error";
            break;
        case 500:
            category = "Server Error";
            break;
        default:
            category = "Other";
            break;
    }

    printf("#%d -> HTTP %d (%s)\\n", total_calls, code, category);
    return total_calls;
}

int main(void) {
    track_http_status(200);
    track_http_status(404);
    track_http_status(500);
    int total = track_http_status(302);
    printf("Total tracked: %d\\n", total);
    return 0;
}`,
      },
      quiz: [
        {
          question:
            'What does placing the static keyword on a variable declared INSIDE a function do?',
          options: [
            'Makes the variable globally visible to every .c file in the project.',
            'Preserves the variable’s value across function calls while keeping its scope local to that function.',
            'Prevents the variable from ever being modified after initialization.',
            'Allocates the variable on the heap so you must call free() on it.',
          ],
          answer: 1,
          explanation:
            'A static local variable has static storage duration (initialized once, lives for the entire program) while keeping block scope inside the function.',
        },
        {
          question:
            'Why is it unsafe for a C function to return the address of a normal local variable (&x)?',
          options: [
            'Because local variables cannot have their address taken with &.',
            'Because automatic local variables are destroyed when the function returns, leaving a dangling pointer.',
            'Because C only allows returning pointers to int, not other types.',
            'Because the compiler automatically copies the variable to the heap and leaks memory.',
          ],
          answer: 1,
          explanation:
            'Automatic variables live in the function’s stack frame, which becomes invalid the moment the function returns. Dereferencing that address is Undefined Behavior.',
        },
      ],
    },
    km: {
      title: 'ឃ្លា switch, ប្រភេទផ្ទុក (Storage Classes) និងដែនកំណត់អថេរ (Scope)',
      duration: '13 នាទី',
      summary:
        'បំបែកលំហូរច្រើនជម្រើសដោយឃ្លា switch ស្វែងយល់ពី block scope និងអាយុកាលលើ stack ព្រមទាំងគ្រប់គ្រងភាពស្ថិតស្ថេរ ការអានតែម្យ៉ាង និងការចែករំលែកឆ្លងឯកសារដោយ static, const និង extern។',
      objectives: [
        'សរសេរឃ្លា switch ស្អាត និងសុវត្ថិភាពជាមួយ case ចំនួនគត់ ឬតួអក្សរ ការចងក្រុម case, break និង default។',
        'តាមដានដែនមើលឃើញអថេរក្នុងប្លុកត្រួតជាន់ និងជៀសវាងការត្រឡប់ pointer ទៅអថេរ stack ដែលផុតអាយុកាល។',
        'ប្រើ static, const និង extern ឱ្យត្រឹមត្រូវដើម្បីគ្រប់គ្រងអាយុកាលផ្ទុក សិទ្ធិអានតែម្យ៉ាង និងការភ្ជាប់ឆ្លងឯកសារ .c។',
      ],
      sections: [
        {
          id: 'switch-statements-and-fallthrough',
          heading: 'ការបំបែកលំហូរច្រើនជម្រើសដោយ switch',
          body: [
            'នៅពេលកន្សោមចំនួនគត់, char ឬ enum តែមួយត្រូវផ្ទៀងផ្ទាត់ជាមួយតម្លៃថេរច្រើន ឃ្លា switch ងាយអាន និងច្រើនតែលឿនជាងខ្សែ if / else if វែងៗ។ ស្លាក case នីមួយៗត្រូវតែជាតម្លៃថេរចំនួនគត់ពេល compile—ភាសា C មិនអនុញ្ញាតឱ្យប្រើ string ឬអថេរ runtime ក្នុង case ទេ។',
            "ពេលកម្មវិធីលោតចូល case ដែលត្រូវគ្នា វានឹងបន្តដំណើរការចុះក្រោមរហូតជួប break, return ឬចប់ switch ដែលហៅថា fall-through។ ការចងក្រុម case ទទេដោយចេតនា (ដូចជា case 'y': case 'Y':) ជាទម្លាប់ល្អ តែការភ្លេច break ក្រោយកូដក្នុង case ជាកំហុសញឹកញាប់បំផុតមួយក្នុង C។",
          ],
          points: [
            'កន្សោមក្នុង switch ត្រូវជាប្រភេទចំនួនគត់ (char, int, enum) ចំណែកអត្ថបទត្រូវប្រើ strcmp() ជាមួយ if / else if។',
            'ដាក់ផ្នែក default ជានិច្ចដើម្បីដោះស្រាយតម្លៃមិនរំពឹងទុកដោយសុវត្ថិភាព។',
            'បើត្រូវប្រកាសអថេរក្នុង case សូមព័ទ្ធករណីនោះដោយសញ្ញា { ... } ដើម្បីបង្កើត block scope ផ្ទាល់ខ្លួន។',
          ],
          exampleTitle: 'ការចែកចាយពាក្យបញ្ជាដោយ switch និងការចងក្រុម case',
          warning:
            'ការភ្លេចដាក់ break នៅចុង case ដែលមានកូដនឹងបង្កឱ្យកម្មវិធីរត់ធ្លាក់ចូល case បន្ទាប់ដោយស្ងាត់ៗ។ បើអ្នកពិតជាចង់ឱ្យ fall-through មែន សូមដាក់ comment /* fallthrough */ ឱ្យច្បាស់។',
        },
        {
          id: 'block-scope-and-stack-lifetimes',
          heading: 'Block Scope, ការបាំងឈ្មោះ (Shadowing) និងអាយុកាលលើ Stack',
          body: [
            'Scope កំណត់ថាឈ្មោះអថេរអាចប្រើនៅកន្លែងណាក្នុងកូដ ចំណែកអាយុកាលផ្ទុក (lifetime) កំណត់ថាអង្គចងចាំរបស់វានៅមានសុពលភាពយូរប៉ុណ្ណាពេលរត់។ អថេរដែលប្រកាសក្នុង { ... }—រួមទាំងប៉ារ៉ាម៉ែត្រអនុគមន៍ និងអថេរ loop—មាន block scope និងអាយុកាលស្វ័យប្រវត្តិលើ call stack៖ វាកើតឡើងពេលចូលប្លុក ហើយត្រូវបំផ្លាញភ្លាមពេលចេញពីប្លុក។',
            'ការប្រកាសអថេរក្នុងប្លុកខាងក្នុងដែលមានឈ្មោះដូចអថេរខាងក្រៅនឹងបាំងឈ្មោះ (shadow) អថេរខាងក្រៅរហូតចប់ប្លុក។ ទោះវាត្រឹមត្រូវតាមវេយ្យាករណ៍ ក៏វាងាយបង្កការភ័ន្តច្រឡំ។ សំខាន់ជាងនេះ ដោយសារអថេរ stack បាត់បង់សុពលភាពពេលអនុគមន៍ return អ្នកមិនត្រូវត្រឡប់អាសយដ្ឋាន (&local) របស់អថេរក្នុងស្រុកជាដាច់ខាត។',
          ],
          points: [
            'រក្សា scope អថេរឱ្យតូចបំផុតតាមដែលអាចធ្វើបាន ដូចជាប្រកាស i ក្នុង for (int i = 0; i < n; i++)។',
            'អថេរ automatic មិនត្រូវបានកំណត់ជា 0 ដោយស្វ័យប្រវត្តិទេ ការអានមុនផ្ដល់តម្លៃនឹងទទួលបានទិន្នន័យសំរាម។',
            'បើកទង់ -Wshadow ក្នុង GCC/Clang ដើម្បីចាប់ការបាំងឈ្មោះអថេរដោយអចេតនាពេល compile។',
          ],
          exampleTitle: 'ការតាមដាន Block Scope និងការប្រើ Buffer របស់អ្នកហៅដោយសុវត្ថិភាព',
          warning:
            'កុំត្រឡប់ &local_var ឬ array ក្នុងស្រុកចេញពីអនុគមន៍ឱ្យសោះ! Stack frame ត្រូវដកចេញភ្លាមពេល return ធ្វើឱ្យអ្នកហៅទទួលបាន dangling pointer ដែលអាចត្រូវសរសេរជាន់ដោយការហៅអនុគមន៍បន្ទាប់។',
        },
        {
          id: 'storage-classes-static-const-extern',
          heading: 'ប្រភេទផ្ទុក Storage Classes៖ static, const និង extern',
          body: [
            'ពាក្យគន្លឹះ storage class និង qualifier ផ្ដល់ការគ្រប់គ្រងលម្អិតលើអាយុកាល ការភ្ជាប់ឆ្លងឯកសារ .c និងសិទ្ធិកែប្រែ។ static មានន័យពីរតាមទីតាំង៖ នៅក្នុងអនុគមន៍ static local ត្រូវបានចាប់ផ្ដើមតម្លៃតែម្ដង និងរក្សាតម្លៃឆ្លងការហៅអនុគមន៍; ចំណែកនៅថ្នាក់ឯកសារ static កំណត់ internal linkage ឱ្យអថេរឬអនុគមន៍ជំនួយប្រើបានតែក្នុងឯកសារ .c នោះប៉ុណ្ណោះ។',
            'ពាក្យគន្លឹះ extern ប្រកាសអថេរ ឬអនុគមន៍ដែលត្រូវបានបង្កើតនៅឯកសារ .c ផ្សេងដោយមិនបែងចែកអង្គចងចាំថ្មីឡើយ—វាប្រាប់ compiler ថា linker នឹងរកឃើញវានៅ object file ផ្សេង។ ចំណែក const សម្គាល់ទិន្នន័យជាអានតែម្យ៉ាង ដើម្បីឱ្យ compiler ចាប់ការកែប្រែដោយអចេតនាភ្លាមៗ។',
          ],
          points: [
            'អថេរ static និងអថេរថ្នាក់ឯកសារត្រូវបានកំណត់តម្លៃ 0 ដោយស្វ័យប្រវត្តិមុនពេល main() ចាប់ផ្ដើម។',
            'ដាក់ static លើអនុគមន៍ជំនួយផ្ទៃក្នុងនៃឯកសារ .c ដើម្បីជៀសវាងការប៉ះទង្គិចឈ្មោះពេល link គម្រោងធំ។',
            'ដាក់ការប្រកាស extern ក្នុងឯកសារ .h ហើយកំណត់តម្លៃដើមពិតប្រាកដតែម្ដងគត់ក្នុងឯកសារ .c មួយ។',
            'ប្រើប៉ារ៉ាម៉ែត្រ const (ដូចជា const char *msg) ជានិច្ចនៅពេលអនុគមន៍គ្រាន់តែអានទិន្នន័យ។',
          ],
          table: {
            headers: ['ពាក្យគន្លឹះ', 'ទីតាំងប្រើ', 'អាយុកាល (Lifetime)', 'ការមើលឃើញ / Linkage'],
            rows: [
              [
                '(លំនាំដើមក្នុងប្លុក)',
                'ក្នុងអនុគមន៍/ប្លុក',
                'ស្វ័យប្រវត្តិ (stack)',
                'តែក្នុងប្លុកប៉ុណ្ណោះ',
              ],
              [
                'static (ក្នុងប្លុក)',
                'ក្នុងអនុគមន៍/ប្លុក',
                'ពេញមួយការរត់កម្មវិធី',
                'តែក្នុងប្លុកប៉ុណ្ណោះ',
              ],
              [
                'static (ថ្នាក់ឯកសារ)',
                'ផ្នែកខាងលើនៃ .c',
                'ពេញមួយការរត់កម្មវិធី',
                'ផ្ទៃក្នុង (តែឯកសារ .c នេះ)',
              ],
              ['extern', 'ឯកសារ .h ឬ .c', 'ពេញមួយការរត់កម្មវិធី', 'ខាងក្រៅ (ចែករំលែកឆ្លង .c)'],
              ['const', 'អថេរ / ប៉ារ៉ាម៉ែត្រ', 'តាម storage class', 'អានតែម្យ៉ាង (Read-only)'],
            ],
          },
          exampleTitle: 'អថេររាប់ static Local និងអនុគមន៍ជំនួយផ្ទៃក្នុងឯកសារ',
          tip: 'ទោះបី static local ងាយស្រួលសម្រាប់រាប់ចំនួនហៅក៏ដោយ សូមចាំថាវាផ្ទុកស្ថានភាពរួមដែលអាចផ្លាស់ប្ដូរបាន ហើយមិនមានសុវត្ថិភាពដោយស្វ័យប្រវត្តិក្នុងកម្មវិធី multithreaded ទេ។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរកម្មវិធី C ដែលមានអនុគមន៍ជំនួយ static int track_http_status(int code) ប្រើឃ្លា switch ដើម្បីបង្ហាញប្រភេទ ("Success" សម្រាប់ 200/201, "Client Error" សម្រាប់ 400/404, "Server Error" សម្រាប់ 500 និង "Other" សម្រាប់ default) ព្រមទាំងប្រើ static local counter រាប់ចំនួនសំណើសរុប និងត្រឡប់ចំនួនថ្មីនោះ។',
        hint: 'ចងក្រុម case 200: case 201: និង case 400: case 404: ដោយមិនចម្លងកូដ ហើយប្រកាស static int total_calls = 0; នៅក្នុង track_http_status។',
      },
      quiz: [
        {
          question: 'តើការដាក់ពាក្យគន្លឹះ static លើអថេរដែលប្រកាសនៅក្នុងអនុគមន៍មានឥទ្ធិពលអ្វី?',
          options: [
            'ធ្វើឱ្យអថេរនោះមើលឃើញទូទាំងគ្រប់ឯកសារ .c ក្នុងគម្រោង។',
            'រក្សាតម្លៃអថេរឆ្លងការហៅអនុគមន៍ច្រើនដង ដោយនៅតែរក្សា scope តែក្នុងអនុគមន៍នោះ។',
            'ហាមមិនឱ្យកែប្រែតម្លៃអថេរនោះបន្ទាប់ពីកំណត់ដំបូង។',
            'បែងចែកអថេរលើ heap ដូច្នេះត្រូវហៅ free() នៅពេលក្រោយ។',
          ],
          answer: 1,
          explanation:
            'អថេរ static ក្នុងអនុគមន៍មានអាយុកាលពេញមួយការរត់កម្មវិធី (ចាប់ផ្ដើមតម្លៃតែម្ដង) ប៉ុន្តែអាចប្រើឈ្មោះបានតែក្នុងអនុគមន៍នោះប៉ុណ្ណោះ។',
        },
        {
          question: 'ហេតុអ្វីបានជាអនុគមន៍ C មិនត្រូវត្រឡប់អាសយដ្ឋានរបស់អថេរ local ធម្មតា (&x)?',
          options: [
            'ព្រោះអថេរ local មិនអាចយកអាសយដ្ឋានដោយសញ្ញា & បានទេ។',
            'ព្រោះអថេរ automatic ត្រូវបំផ្លាញពេលអនុគមន៍ return ធ្វើឱ្យក្លាយជា dangling pointer។',
            'ព្រោះ C អនុញ្ញាតឱ្យត្រឡប់ pointer តែប្រភេទ int ប៉ុណ្ណោះ។',
            'ព្រោះ compiler ចម្លងវាទៅ heap ដោយស្វ័យប្រវត្តិហើយលេចធ្លាយអង្គចងចាំ។',
          ],
          answer: 1,
          explanation:
            'អថេរ automatic ស្ថិតក្នុង stack frame របស់អនុគមន៍ដែលផុតសុពលភាពភ្លាមពេល return។ ការអាន pointer នោះគឺជា Undefined Behavior។',
        },
      ],
    },
  },

  // =========================================================================
  // 3. ENUMS, UNIONS & TAGGED UNIONS
  // =========================================================================
  {
    slug: 'c-enums-and-unions',
    level: 'intermediate',
    insertAfter: 'arrays-and-strings',
    en: {
      title: 'Enums, Unions & Tagged Unions',
      duration: '14 min',
      summary:
        'Replace magic numbers with expressive enums, share memory across mutually exclusive fields using unions, and combine both into tagged unions for compact, type-safe state machines and protocol messages.',
      objectives: [
        'Define named integer constants with enum and create clean type aliases with typedef.',
        'Contrast struct and union memory layouts and explain how sizeof(union) is determined.',
        'Build a tagged union (struct containing an enum tag + union payload) to represent multi-type values safely.',
      ],
      sections: [
        {
          id: 'enumerations-and-typedef',
          heading: 'Named Constants with enum & Clean Aliases with typedef',
          body: [
            'Hardcoding raw integers like 0, 1, and 2 to represent order statuses or connection states makes C code brittle and hard to read. An enum defines a set of named integer constants—starting at 0 and incrementing by 1 automatically unless you assign explicit values—so your code reads like plain English while compiling down to zero-overhead integers.',
            'Pairing enum (or struct) with typedef removes the repetitive need to write the enum keyword before every declaration. Even better, modern compilers with -Wswitch warn you automatically whenever you add a new enumerator to an enum and forget to handle it in a switch statement.',
          ],
          points: [
            'Enumerators share the surrounding scope, so prefix names consistently (for example STATE_IDLE, STATE_RUNNING) to avoid collisions.',
            'You can assign explicit values (such as HTTP_OK = 200, HTTP_NOT_FOUND = 404) or bitmask powers of two.',
            'Combining typedef enum { ... } Name; gives you a concise, self-documenting type name.',
          ],
          example: {
            title: 'Connection State enum with typedef and switch',
            language: 'c',
            code: `#include <stdio.h>

typedef enum {
    CONN_DISCONNECTED = 0,
    CONN_CONNECTING,
    CONN_READY,
    CONN_ERROR = 99
} ConnState;

const char *state_to_str(ConnState state) {
    switch (state) {
        case CONN_DISCONNECTED: return "DISCONNECTED";
        case CONN_CONNECTING:   return "CONNECTING";
        case CONN_READY:        return "READY";
        case CONN_ERROR:        return "ERROR";
    }
    return "UNKNOWN";
}

int main(void) {
    ConnState current = CONN_READY;
    printf("State: %s (code %d)\\n", state_to_str(current), current);
    printf("Error enum code: %d\\n", CONN_ERROR);
    return 0;
}`,
            output: `State: READY (code 2)
Error enum code: 99`,
          },
          tip: 'Omit the default branch inside a switch over an enum (and return a fallback after the switch) when compiling with -Wswitch so GCC/Clang immediately flags any unhandled new enum value.',
        },
        {
          id: 'unions-and-shared-memory',
          heading: 'Unions: Shared Memory Layout & sizeof',
          body: [
            'In a struct, every field gets its own separate offset in memory, so sizeof(struct) is at least the sum of all its members plus alignment padding. In a union, every member starts at offset 0 and overlaps the EXACT same bytes in memory—meaning only one member holds a meaningful value at any given instant.',
            'Consequently, sizeof(union) equals the size of its largest member (rounded up for alignment). Unions are ideal when a data structure can hold one of several mutually exclusive payloads—such as an int, a double, or a short text buffer—without paying the memory cost of storing all of them simultaneously.',
          ],
          points: [
            'Writing to one union member overwrites the shared bytes used by all other members.',
            'Use unions for mutually exclusive variants or low-level memory savings, never to store multiple fields at once.',
            'Inspect sizeof(struct) vs sizeof(union) to see how much RAM overlap saves in large arrays of objects.',
          ],
          table: {
            headers: ['Property', 'struct', 'union'],
            rows: [
              ['Memory layout', 'Each member has its own address', 'All members share offset 0'],
              [
                'Total sizeof',
                '>= sum of all member sizes',
                'Size of largest member (+ alignment)',
              ],
              [
                'Active members',
                'All members valid simultaneously',
                'Only the last-written member is active',
              ],
              [
                'Best use case',
                'Grouping fields that exist together',
                'Mutually exclusive payload variants',
              ],
            ],
          },
          example: {
            title: 'Comparing struct vs union Sizes and Shared Storage',
            language: 'c',
            code: `#include <stdint.h>
#include <stdio.h>

struct SeparateData {
    int32_t i;
    double d;
    char label[16];
};

union SharedData {
    int32_t i;
    double d;
    char label[16];
};

int main(void) {
    printf("sizeof(struct SeparateData): %zu bytes\\n", sizeof(struct SeparateData));
    printf("sizeof(union SharedData):    %zu bytes\\n", sizeof(union SharedData));

    union SharedData box;
    box.i = 1024;
    printf("Active int:    %d\\n", box.i);

    /* Writing box.d overwrites the same memory previously holding box.i */
    box.d = 3.14159;
    printf("Active double: %.5f\\n", box.d);
    return 0;
}`,
            output: `sizeof(struct SeparateData): 32 bytes
sizeof(union SharedData):    16 bytes
Active int:    1024
Active double: 3.14159`,
          },
          warning:
            'A bare union does NOT remember which member was written last! Reading box.i after writing box.d interprets floating-point bits as an integer, producing meaningless garbage. Always track the active member explicitly.',
        },
        {
          id: 'tagged-unions-and-compact-state',
          heading: 'Tagged Unions (Discriminated Variants)',
          body: [
            'Because a plain union cannot tell you which field is currently active, idiomatic C wraps the union inside a struct alongside an enum "tag" (discriminant). This pattern—called a tagged union—is C’s equivalent of sum types or Rust/Swift enums with associated data, powering AST nodes, JSON values, UI events, and network packets.',
            'Every time you write to the union payload, you update the tag to match. Every time you read from the payload, you switch on the tag first and access only the matching union field. Combined with C99 designated initializers, tagged unions are concise, cache-friendly, and memory-safe.',
          ],
          points: [
            'Always keep the enum tag and union payload synchronized inside a helper constructor function.',
            'Switch on value.type before accessing value.data.* so you never read an inactive union member.',
            'C11 supports anonymous unions inside structs, allowing shorter access like v.as_int instead of v.data.as_int.',
          ],
          example: {
            title: 'Sensor Reading Tagged Union in Action',
            language: 'c',
            code: `#include <stdbool.h>
#include <stdio.h>

typedef enum {
    VAL_INT,
    VAL_DOUBLE,
    VAL_BOOL
} ValueKind;

typedef struct {
    ValueKind kind;
    union {
        int i;
        double d;
        bool b;
    } as;
} MetricValue;

void print_metric(const char *name, MetricValue v) {
    printf("%-12s = ", name);
    switch (v.kind) {
        case VAL_INT:    printf("%d\\n", v.as.i); break;
        case VAL_DOUBLE: printf("%.2f\\n", v.as.d); break;
        case VAL_BOOL:   printf("%s\\n", v.as.b ? "true" : "false"); break;
    }
}

int main(void) {
    MetricValue metrics[3] = {
        { .kind = VAL_INT,    .as.i = 42 },
        { .kind = VAL_DOUBLE, .as.d = 36.75 },
        { .kind = VAL_BOOL,   .as.b = true }
    };

    print_metric("RPM", metrics[0]);
    print_metric("Temp_C", metrics[1]);
    print_metric("Online", metrics[2]);
    printf("sizeof(MetricValue): %zu bytes\\n", sizeof(MetricValue));
    return 0;
}`,
            output: `RPM          = 42
Temp_C       = 36.75
Online       = true
sizeof(MetricValue): 16 bytes`,
          },
          tip: 'When designing arrays of thousands of tagged-union elements, order struct members cleanly and keep the union’s largest variant small (or store a pointer for rare large payloads) to maximize CPU cache locality.',
        },
      ],
      challenge: {
        prompt:
          'Define a tagged union named Shape with a ShapeKind enum (SHAPE_CIRCLE, SHAPE_RECT) and a union containing double radius for circles and a nested struct { double w, h; } rect for rectangles. Write a function double shape_area(Shape s) that switches on s.kind and returns the exact area, then test both shapes in main().',
        hint: 'Use 3.141592653589793 * s.data.radius * s.data.radius for SHAPE_CIRCLE and s.data.rect.w * s.data.rect.h for SHAPE_RECT.',
        language: 'c',
        solutionCode: `#include <stdio.h>

typedef enum {
    SHAPE_CIRCLE,
    SHAPE_RECT
} ShapeKind;

typedef struct {
    ShapeKind kind;
    union {
        double radius;
        struct {
            double w;
            double h;
        } rect;
    } data;
} Shape;

double shape_area(Shape s) {
    switch (s.kind) {
        case SHAPE_CIRCLE:
            return 3.141592653589793 * s.data.radius * s.data.radius;
        case SHAPE_RECT:
            return s.data.rect.w * s.data.rect.h;
    }
    return 0.0;
}

int main(void) {
    Shape c = { .kind = SHAPE_CIRCLE, .data.radius = 3.0 };
    Shape r = { .kind = SHAPE_RECT,   .data.rect = { 4.5, 2.0 } };

    printf("Circle area: %.2f\\n", shape_area(c));
    printf("Rect area:   %.2f\\n", shape_area(r));
    return 0;
}`,
      },
      quiz: [
        {
          question:
            'Assuming 4-byte int, 8-byte double, and 1-byte char, what is sizeof(union { int a; double b; char c[12]; }) on a standard 64-bit platform?',
          options: ['24 bytes', '16 bytes', '12 bytes', '8 bytes'],
          answer: 1,
          explanation:
            'The largest member is char c[12] (12 bytes), and the union must be aligned to its strictest member alignment (8 bytes for double), rounding 12 up to 16 bytes.',
        },
        {
          question: 'Why do C developers wrap a union inside a struct together with an enum field?',
          options: [
            'Because C forbids declaring a union without a struct around it.',
            'So all union members can hold independent values at the same time.',
            'To record which union member is currently active before reading it safely.',
            'To force the compiler to allocate the union on the heap automatically.',
          ],
          answer: 2,
          explanation:
            'A plain union does not track which field was last written. Adding an enum tag (a tagged union) lets code inspect the tag before reading the corresponding union field.',
        },
      ],
    },
    km: {
      title: 'Enums, Unions និង Tagged Unions',
      duration: '14 នាទី',
      summary:
        'ជំនួសលេខអាថ៌កំបាំងដោយ enum ដែលមានអត្ថន័យ ចែករំលែកអង្គចងចាំដោយ union និងផ្សំទាំងពីរជា Tagged Union ដើម្បីតំណាងស្ថានភាពកម្មវិធីយ៉ាងសន្សំសំចៃ និងសុវត្ថិភាព។',
      objectives: [
        'បង្កើតតម្លៃថេរចំនួនគត់ដែលមានឈ្មោះដោយ enum និងបង្កើតឈ្មោះប្រភេទខ្លីស្អាតដោយ typedef។',
        'ប្រៀបធៀបការរៀបចំអង្គចងចាំរវាង struct និង union និងពន្យល់របៀបកំណត់ sizeof(union)។',
        'សាងសង់ Tagged Union (struct មាន enum tag + union payload) ដើម្បីផ្ទុកទិន្នន័យច្រើនប្រភេទដោយសុវត្ថិភាព។',
      ],
      sections: [
        {
          id: 'enumerations-and-typedef',
          heading: 'តម្លៃថេរមានឈ្មោះដោយ enum និងឈ្មោះខ្លីដោយ typedef',
          body: [
            'ការសរសេរលេខឆៅដូចជា 0, 1, 2 ដើម្បីតំណាងស្ថានភាពបញ្ជាទិញ ឬការតភ្ជាប់ ធ្វើឱ្យកូដ C ពិបាកអាន និងងាយខុស។ ប្រភេទ enum បង្កើតសំណុំតម្លៃថេរចំនួនគត់ដែលមានឈ្មោះ—ចាប់ផ្ដើមពី 0 និងកើនម្ដង 1 ដោយស្វ័យប្រវត្តិលុះត្រាតែអ្នកកំណត់តម្លៃផ្ទាល់—ធ្វើឱ្យកូដអានច្បាស់ដូចភាសាធម្មតាដោយមិនបន្ថែមបន្ទុកល្បឿនឡើយ។',
            'ការផ្គូផ្គង enum (ឬ struct) ជាមួយ typedef ជួយកុំឱ្យសរសេរពាក្យ enum ដដែលៗគ្រប់ទីកន្លែង។ កាន់តែពិសេស compiler ទំនើបជាមួយ -Wswitch នឹងព្រមានភ្លាមបើអ្នកបន្ថែមតម្លៃ enum ថ្មីតែភ្លេចដោះស្រាយវាក្នុង switch។',
          ],
          points: [
            'ឈ្មោះសមាជិក enum ប្រើ scope រួមគ្នា ដូច្នេះសូមដាក់បុព្វបទ (ដូចជា STATE_IDLE, STATE_RUNNING) ដើម្បីកុំឱ្យជាន់ឈ្មោះ។',
            'អ្នកអាចកំណត់តម្លៃជាក់លាក់ (ដូចជា HTTP_OK = 200) ឬស្វ័យគុណនៃ 2 សម្រាប់ bitmask។',
            'ការប្រើ typedef enum { ... } Name; ផ្ដល់ឈ្មោះប្រភេទខ្លី និងច្បាស់លាស់។',
          ],
          exampleTitle: 'ការប្រើ enum ស្ថានភាពការតភ្ជាប់ជាមួយ typedef និង switch',
          tip: 'កុំដាក់ផ្នែក default ក្នុង switch លើ enum (ហើយត្រឡប់តម្លៃបម្រុងក្រោយ switch) ពេល compile ជាមួយ -Wswitch ដើម្បីឱ្យ GCC/Clang រាយការណ៍ភ្លាមបើខ្វះ case ណាមួយ។',
        },
        {
          id: 'unions-and-shared-memory',
          heading: 'Unions៖ អង្គចងចាំរួមគ្នា និងទំហំ sizeof',
          body: [
            'ក្នុង struct សមាជិកនីមួយៗមានទីតាំងអង្គចងចាំផ្ទាល់ខ្លួន ដូច្នេះ sizeof(struct) យ៉ាងតិចស្មើផលបូកទំហំសមាជិកទាំងអស់បូក padding។ ចំណែកក្នុង union សមាជិកទាំងអស់ចាប់ផ្ដើមពី offset 0 ហើយជាន់លើបៃអង្គចងចាំដូចគ្នាទាំងស្រុង—មានន័យថាមានតែសមាជិកមួយគត់ដែលផ្ទុកតម្លៃត្រឹមត្រូវក្នុងពេលតែមួយ។',
            'ហេតុនេះ sizeof(union) ស្មើនឹងទំហំសមាជិកធំបំផុត (បង្គត់ឡើងតាម alignment)។ Union ស័ក្ដិសមបំផុតនៅពេលទិន្នន័យមួយអាចផ្ទុកប្រភេទណាមួយក្នុងចំណោមច្រើនប្រភេទ—ដូចជា int, double ឬអត្ថបទខ្លី—ដោយមិនចាំបាច់ចំណាយអង្គចងចាំផ្ទុកទាំងអស់ព្រមគ្នា។',
          ],
          points: [
            'ការសរសេរតម្លៃទៅសមាជិក union មួយ នឹងសរសេរជាន់បៃរួមរបស់សមាជិកផ្សេងទាំងអស់។',
            'ប្រើ union សម្រាប់ទិន្នន័យដែលប្រើឆ្លាស់គ្នា (mutually exclusive) កុំប្រើដើម្បីផ្ទុកច្រើនវាលព្រមគ្នា។',
            'ពិនិត្យ sizeof(struct) ធៀបនឹង sizeof(union) ដើម្បីឃើញការសន្សំ RAM ក្នុង array ធំៗ។',
          ],
          table: {
            headers: ['លក្ខណៈ', 'struct', 'union'],
            rows: [
              [
                'ការរៀបចំអង្គចងចាំ',
                'សមាជិកនីមួយៗមានអាសយដ្ឋានផ្ទាល់ខ្លួន',
                'សមាជិកទាំងអស់ចែករំលែក offset 0',
              ],
              ['ទំហំ sizeof សរុប', '>= ផលបូកទំហំសមាជិកទាំងអស់', 'ទំហំសមាជិកធំបំផុត (+ alignment)'],
              ['សមាជិកសកម្ម', 'សមាជិកទាំងអស់មានសុពលភាពព្រមគ្នា', 'មានតែសមាជិកដែលសរសេរចុងក្រោយ'],
              [
                'ការប្រើល្អបំផុត',
                'ចងក្រុមទិន្នន័យដែលមានព្រមគ្នា',
                'ទិន្នន័យជម្រើសដែលប្រើម្ដងមួយប្រភេទ',
              ],
            ],
          },
          exampleTitle: 'ការប្រៀបធៀបទំហំ struct ទល់នឹង union និងអង្គចងចាំរួម',
          warning:
            'Union ទទេមិនចងចាំថាសមាជិកណាត្រូវបានសរសេរចុងក្រោយទេ! ការអាន box.i ក្រោយសរសេរ box.d នឹងបកស្រាយប៊ីតទសភាគជាចំនួនគត់ បង្កជាលទ្ធផលខុសឆ្គង។ ត្រូវតាមដានសមាជិកសកម្មជានិច្ច។',
        },
        {
          id: 'tagged-unions-and-compact-state',
          heading: 'Tagged Unions (ទិន្នន័យច្រើនទម្រង់មានស្លាកសម្គាល់)',
          body: [
            'ដោយសារ union ធម្មតាមិនប្រាប់ថាវាលណាកំពុងសកម្ម ទម្រង់ស្តង់ដារក្នុង C គឺរុំ union នៅក្នុង struct ជាមួយ enum "tag" មួយ។ លំនាំនេះហៅថា Tagged Union ដែលជាគូប្រៀបរបស់ sum types ក្នុងភាសាទំនើប សម្រាប់សាងសង់ AST, ទិន្នន័យ JSON, ព្រឹត្តិការណ៍ UI និងកញ្ចប់បណ្ដាញ។',
            'រាល់ពេលសរសេរទិន្នន័យចូល union អ្នកត្រូវកំណត់ tag ឱ្យត្រូវគ្នា។ រាល់ពេលអាន អ្នកត្រូវ switch លើ tag សិនទើបចូលអានវាល union ដែលត្រូវគ្នា។ ផ្សំជាមួយ designated initializers របស់ C99 វាជួយឱ្យកូដខ្លី លឿនលើ CPU cache និងសុវត្ថិភាព។',
          ],
          points: [
            'រក្សា enum tag និងទិន្នន័យក្នុង union ឱ្យត្រូវគ្នាជានិច្ចតាមរយៈអនុគមន៍បង្កើតជំនួយ។',
            'Switch លើ value.kind មុនអាន value.as.* ជានិច្ចដើម្បីកុំឱ្យអានវាលមិនសកម្ម។',
            'C11 គាំទ្រ anonymous union ក្នុង struct ដែលអាចសរសេរខ្លីជាងមុនដូចជា v.as_int ជំនួស v.data.as_int។',
          ],
          exampleTitle: 'ការប្រើ Tagged Union សម្រាប់តម្លៃសេនស័រ',
          tip: 'ពេលបង្កើត array នៃ Tagged Union រាប់ពាន់ធាតុ សូមរក្សាទំហំជម្រើសធំបំផុតក្នុង union ឱ្យតូច (ឬប្រើ pointer សម្រាប់ទិន្នន័យធំកម្រប្រើ) ដើម្បីបង្កើនប្រសិទ្ធភាព CPU cache។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើត Tagged Union ឈ្មោះ Shape ដែលមាន enum ShapeKind (SHAPE_CIRCLE, SHAPE_RECT) និង union ផ្ទុក double radius សម្រាប់រង្វង់ និង struct { double w, h; } rect សម្រាប់ចតុកោណកែង។ សរសេរអនុគមន៍ double shape_area(Shape s) ដែល switch លើ s.kind ដើម្បីគណនាក្រឡាផ្ទៃ រួចសាកល្បងរាងទាំងពីរក្នុង main()។',
        hint: 'ប្រើ 3.141592653589793 * s.data.radius * s.data.radius សម្រាប់ SHAPE_CIRCLE និង s.data.rect.w * s.data.rect.h សម្រាប់ SHAPE_RECT។',
      },
      quiz: [
        {
          question:
            'ឧបមាថា int មាន 4 បៃ, double មាន 8 បៃ និង char មាន 1 បៃ តើ sizeof(union { int a; double b; char c[12]; }) ស្មើប៉ុន្មានលើប្រព័ន្ធ 64-bit?',
          options: ['24 បៃ', '16 បៃ', '12 បៃ', '8 បៃ'],
          answer: 1,
          explanation:
            'សមាជិកធំបំផុតគឺ char c[12] (12 បៃ) ហើយ union ត្រូវតម្រឹមតាម alignment ធំបំផុត (8 បៃរបស់ double) ដូច្នេះ 12 ត្រូវបង្គត់ឡើងជា 16 បៃ។',
        },
        {
          question: 'ហេតុអ្វីអ្នកសរសេរ C ច្រើនដាក់ union នៅក្នុង struct រួមជាមួយវាល enum?',
          options: [
            'ព្រោះ C ហាមមិនឱ្យប្រកាស union នៅក្រៅ struct។',
            'ដើម្បីឱ្យសមាជិក union ទាំងអស់ផ្ទុកតម្លៃផ្សេងគ្នាក្នុងពេលតែមួយ។',
            'ដើម្បីកត់ត្រាថាសមាជិក union ណាកំពុងសកម្មមុននឹងអានវាដោយសុវត្ថិភាព។',
            'ដើម្បីបង្ខំ compiler ឱ្យបែងចែក union លើ heap ដោយស្វ័យប្រវត្តិ។',
          ],
          answer: 2,
          explanation:
            'Union ធម្មតាមិនចងចាំថាវាលណាត្រូវបានសរសេរចុងក្រោយទេ។ ការបន្ថែម enum tag (Tagged Union) ជួយឱ្យកម្មវិធីពិនិត្យ tag មុនអានទិន្នន័យត្រឹមត្រូវ។',
        },
      ],
    },
  },

  // =========================================================================
  // 4. FUNCTION POINTERS & CALLBACKS
  // =========================================================================
  {
    slug: 'c-function-pointers',
    level: 'intermediate',
    insertAfter: 'structs-and-malloc',
    en: {
      title: 'Function Pointers & Callbacks',
      duration: '15 min',
      summary:
        'Pass behavior as data in C by declaring clean function pointer types, writing safe comparator callbacks for qsort(), and building extensible dispatch tables.',
      objectives: [
        'Read, write, and simplify function pointer declarations using typedef aliases.',
        'Pass custom comparator callbacks into the C standard library qsort() function without signed overflow bugs.',
        'Replace sprawling switch or if/else chains with bounds-checked arrays of function pointers (dispatch tables).',
      ],
      sections: [
        {
          id: 'function-pointer-syntax-and-typedef',
          heading: 'Declaring, Assigning & Calling Function Pointers',
          body: [
            'In C, compiled functions live at concrete addresses in program memory just like data. A function pointer stores the address of a function whose parameter list and return type match its signature, allowing you to choose which algorithm to invoke at runtime or pass a function as an argument to another function.',
            'Raw function pointer syntax looks intimidating at first because parentheses around (*name) are mandatory: int (*op)(int, int) declares a pointer to a function returning int, whereas int *op(int, int) declares a function returning an int *. Creating a typedef alias immediately makes function pointer parameters and return types effortless to read.',
          ],
          points: [
            'Always wrap (*ptr_name) in parentheses so * binds to the pointer name instead of the return type.',
            'A function name automatically decays to its address—both op = add; and op = &add; are valid, and both op(3, 4) and (*op)(3, 4) invoke it.',
            'Always check for NULL before calling a nullable function pointer callback.',
          ],
          table: {
            headers: ['Declaration', 'Meaning'],
            rows: [
              ['int (*fn)(int, int);', 'Pointer to function taking (int, int) and returning int'],
              [
                'int *fn(int, int);',
                'Function taking (int, int) and returning int * (NOT a func ptr!)',
              ],
              [
                'typedef int (*BinaryOp)(int, int);',
                'Clean alias BinaryOp for the function pointer type',
              ],
              [
                'void (*handlers[4])(void);',
                'Array of 4 pointers to functions taking void, returning void',
              ],
            ],
          },
          example: {
            title: 'Using a typedef Function Pointer to Swap Operations',
            language: 'c',
            code: `#include <stdio.h>

typedef int (*MathOp)(int, int);

int add(int a, int b)      { return a + b; }
int multiply(int a, int b) { return a * b; }

int apply_op(int x, int y, MathOp op) {
    if (op == NULL) {
        return 0;
    }
    return op(x, y);
}

int main(void) {
    MathOp current = add;
    printf("add(6, 7)      = %d\\n", apply_op(6, 7, current));

    current = multiply;
    printf("multiply(6, 7) = %d\\n", apply_op(6, 7, current));
    return 0;
}`,
            output: `add(6, 7)      = 13
multiply(6, 7) = 42`,
          },
          warning:
            'Calling a NULL or uninitialized function pointer immediately crashes your program (segmentation fault), and casting a function pointer to an incompatible signature and calling it is Undefined Behavior.',
        },
        {
          id: 'callbacks-and-qsort-comparators',
          heading: 'Callbacks in Action: Generic Sorting with qsort()',
          body: [
            'A callback is a function pointer passed into another function so the callee can invoke your custom logic at the right moment. The C standard library’s qsort() in <stdlib.h> is the classic example: it sorts an array of ANY element type by accepting a base pointer, element count, element size, and a comparator callback with signature int cmp(const void *a, const void *b).',
            'Inside the comparator, cast the generic const void * pointers back to pointers to your actual element type, then return a negative int if *a < *b, 0 if equal, or a positive int if *a > *b. Using the comparison idiom (x > y) - (x < y) guarantees the exact sign without risking signed integer overflow.',
          ],
          points: [
            'qsort() receives pointers TO the elements in the array, not the elements themselves.',
            'Never return (a - b) in an integer comparator when values could span negative and positive extremes—subtraction can overflow.',
            'You can chain tie-breakers (for example sort by score descending, then by name ascending using strcmp).',
          ],
          example: {
            title: 'Sorting an Array of Structs with qsort() Comparator Callback',
            language: 'c',
            code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    const char *name;
    int score;
} Player;

int cmp_players(const void *lhs, const void *rhs) {
    const Player *a = (const Player *)lhs;
    const Player *b = (const Player *)rhs;

    /* Sort by score descending (overflow-safe) */
    if (a->score != b->score) {
        return (b->score > a->score) - (b->score < a->score);
    }
    /* Tie-break alphabetically by name */
    return strcmp(a->name, b->name);
}

int main(void) {
    Player board[] = {
        { "Sokha", 88 },
        { "Dara",  95 },
        { "Bopha", 95 },
        { "Vanna", 72 }
    };
    size_t count = sizeof(board) / sizeof(board[0]);

    qsort(board, count, sizeof(board[0]), cmp_players);

    for (size_t i = 0; i < count; i++) {
        printf("%zu. %-6s (%d)\\n", i + 1, board[i].name, board[i].score);
    }
    return 0;
}`,
            output: `1. Bopha  (95)
2. Dara   (95)
3. Sokha  (88)
4. Vanna  (72)`,
          },
          warning:
            'Avoid writing return a->score - b->score; inside comparators! If a->score is -2000000000 and b->score is 2000000000, the subtraction overflows 32-bit signed int and returns the wrong sign.',
        },
        {
          id: 'dispatch-tables-and-state-machines',
          heading: 'Dispatch Tables & Data-Driven Command Routing',
          body: [
            'When a program maps numeric opcodes, menu indices, or protocol commands to handler functions, storing function pointers in a const lookup array—a dispatch table—turns branching logic into a single O(1) array lookup. Adding a new operation becomes a matter of registering one entry in the table rather than editing multiple giant switch statements.',
            'Dispatch tables also work cleanly with arrays of structs pairing a command name string with its handler function pointer, forming the foundation of CLI routers, virtual machine instruction loops, and object-oriented vtables in C.',
          ],
          points: [
            'Always validate the index (index < table_len) before indexing into a function pointer table.',
            'Mark static dispatch tables const so they live in read-only memory and cannot be hijacked at runtime.',
            'Every handler in a single dispatch table must share the exact same function signature.',
          ],
          example: {
            title: 'Command Dispatch Table Using an Array of Function Pointers',
            language: 'c',
            code: `#include <stdio.h>

typedef double (*CalcFn)(double, double);

static double op_add(double a, double b) { return a + b; }
static double op_sub(double a, double b) { return a - b; }
static double op_mul(double a, double b) { return a * b; }
static double op_div(double a, double b) { return (b != 0.0) ? (a / b) : 0.0; }

typedef struct {
    const char *label;
    CalcFn fn;
} Operation;

int main(void) {
    static const Operation table[] = {
        { "ADD", op_add },
        { "SUB", op_sub },
        { "MUL", op_mul },
        { "DIV", op_div }
    };
    const size_t count = sizeof(table) / sizeof(table[0]);

    double x = 20.0, y = 4.0;
    for (size_t i = 0; i < count; i++) {
        printf("%s(%.0f, %.0f) = %.2f\\n", table[i].label, x, y, table[i].fn(x, y));
    }
    return 0;
}`,
            output: `ADD(20, 4) = 24.00
SUB(20, 4) = 16.00
MUL(20, 4) = 80.00
DIV(20, 4) = 5.00`,
          },
          tip: 'In C APIs that accept a callback, include an extra void *user_data parameter (like void (*cb)(int event, void *ctx)) so callers can pass state to their callback without resorting to global variables.',
        },
      ],
      challenge: {
        prompt:
          'Write a C program that defines typedef int (*TransformFn)(int); and a higher-order function void map_array(int *arr, size_t n, TransformFn fn) that updates each element in-place using fn. Implement two callbacks—double_val(int x) and square_val(int x)—apply them in sequence to { 1, 2, 3, 4 }, and print the resulting array.',
        hint: 'Check if (arr == NULL || fn == NULL) return; inside map_array, then loop i from 0 to n - 1 setting arr[i] = fn(arr[i]).',
        language: 'c',
        solutionCode: `#include <stdio.h>

typedef int (*TransformFn)(int);

static int double_val(int x) { return x * 2; }
static int square_val(int x) { return x * x; }

static void map_array(int *arr, size_t n, TransformFn fn) {
    if (arr == NULL || fn == NULL) {
        return;
    }
    for (size_t i = 0; i < n; i++) {
        arr[i] = fn(arr[i]);
    }
}

int main(void) {
    int nums[] = { 1, 2, 3, 4 };
    size_t n = sizeof(nums) / sizeof(nums[0]);

    map_array(nums, n, double_val);
    map_array(nums, n, square_val);

    for (size_t i = 0; i < n; i++) {
        printf("%d%s", nums[i], (i + 1 < n) ? ", " : "\\n");
    }
    return 0;
}`,
      },
      quiz: [
        {
          question:
            'Which declaration correctly defines fp as a pointer to a function taking a double and returning an int?',
          options: [
            'int *fp(double);',
            'int (*fp)(double);',
            'double (*fp)(int);',
            'int *(fp)(double);',
          ],
          answer: 1,
          explanation:
            'The parentheses around (*fp) bind the * to fp, making it a pointer to a function taking (double) and returning int. Without those parentheses, int *fp(double) declares a function returning int *.',
        },
        {
          question:
            'What must a qsort() comparator function return when the first element should be placed BEFORE the second element?',
          options: [
            'Always 0',
            'A positive integer (> 0)',
            'A negative integer (< 0)',
            'The byte size of the element',
          ],
          answer: 2,
          explanation:
            'qsort() orders a before b when cmp(a, b) returns a negative integer, treats them as equivalent on 0, and places a after b on a positive integer.',
        },
      ],
    },
    km: {
      title: 'Function Pointers និង Callbacks',
      duration: '15 នាទី',
      summary:
        'បញ្ជូនអាកប្បកិរិយាអនុគមន៍ដូចជាទិន្នន័យក្នុង C ដោយប្រកាស function pointer ស្អាត សរសេរ callback ប្រៀបធៀបសម្រាប់ qsort() និងបង្កើតតារាងចែកចាយ (dispatch table)។',
      objectives: [
        'អាន សរសេរ និងសម្រួលការប្រកាស function pointer ដោយប្រើ typedef។',
        'បញ្ជូនអនុគមន៍ប្រៀបធៀប (comparator callback) ទៅ qsort() ដោយជៀសវាងកំហុស signed overflow។',
        'ជំនួស switch ឬ if/else វែងៗដោយ array នៃ function pointer (dispatch table) ដែលមានការពិនិត្យដែនសុវត្ថិភាព។',
      ],
      sections: [
        {
          id: 'function-pointer-syntax-and-typedef',
          heading: 'ការប្រកាស ការផ្ដល់តម្លៃ និងការហៅ Function Pointers',
          body: [
            'ក្នុងភាសា C អនុគមន៍ដែលបាន compile ស្ថិតនៅអាសយដ្ឋានជាក់លាក់ក្នុងអង្គចងចាំដូចទិន្នន័យដែរ។ Function pointer រក្សាទុកអាសយដ្ឋាននៃអនុគមន៍ដែលមានប៉ារ៉ាម៉ែត្រ និងប្រភេទ return ត្រូវគ្នា ធ្វើឱ្យអ្នកអាចជ្រើសរើសក្បួនដោះស្រាយពេលរត់ ឬបញ្ជូនអនុគមន៍ជាប៉ារ៉ាម៉ែត្រទៅអនុគមន៍ផ្សេងបាន។',
            'វេយ្យាករណ៍ដើមរបស់ function pointer មើលទៅស្មុគស្មាញបន្តិច ព្រោះវង់ក្រចកជុំវិញ (*name) ចាំបាច់ណាស់៖ int (*op)(int, int) ជា pointer ទៅអនុគមន៍ត្រឡប់ int ចំណែក int *op(int, int) ជាអនុគមន៍ត្រឡប់ int *។ ការបង្កើតឈ្មោះកាត់ typedef ធ្វើឱ្យកូដងាយអានភ្លាមៗ។',
          ],
          points: [
            'ត្រូវដាក់វង់ក្រចកជុំវិញ (*ptr_name) ជានិច្ច ដើម្បីឱ្យ * ភ្ជាប់នឹងឈ្មោះ pointer មិនមែនប្រភេទ return ទេ។',
            'ឈ្មោះអនុគមន៍បម្លែងជាអាសយដ្ឋានដោយស្វ័យប្រវត្តិ៖ op = add; និង op = &add; ប្រើបានដូចគ្នា ហើយ op(3, 4) ឬ (*op)(3, 4) សុទ្ធតែហៅបាន។',
            'ពិនិត្យ NULL ជានិច្ចមុននឹងហៅ callback function pointer ដែលអាចទទេ។',
          ],
          table: {
            headers: ['ការប្រកាស', 'អត្ថន័យ'],
            rows: [
              ['int (*fn)(int, int);', 'Pointer ទៅអនុគមន៍ទទួល (int, int) ត្រឡប់ int'],
              ['int *fn(int, int);', 'អនុគមន៍ទទួល (int, int) ត្រឡប់ int * (មិនមែន func ptr!)'],
              [
                'typedef int (*BinaryOp)(int, int);',
                'ឈ្មោះខ្លី BinaryOp សម្រាប់ប្រភេទ function pointer',
              ],
              ['void (*handlers[4])(void);', 'Array នៃ 4 function pointers ទទួល void ត្រឡប់ void'],
            ],
          },
          exampleTitle: 'ការប្រើ typedef Function Pointer ដើម្បីប្ដូរប្រមាណវិធី',
          warning:
            'ការហៅ function pointer ដែលជា NULL ឬមិនទាន់កំណត់តម្លៃ នឹងធ្វើឱ្យកម្មវិធីគាំងភ្លាម (segmentation fault) ហើយការ cast ទៅ signature ខុសគ្នារួចហៅគឺជា Undefined Behavior។',
        },
        {
          id: 'callbacks-and-qsort-comparators',
          heading: 'Callbacks ជាក់ស្ដែង៖ ការតម្រៀបទូទៅដោយ qsort()',
          body: [
            'Callback គឺជា function pointer ដែលបញ្ជូនចូលអនុគមន៍មួយទៀត ដើម្បីឱ្យវាហៅតក្កវិទ្យារបស់អ្នកនៅពេលត្រូវការ។ អនុគមន៍ qsort() ក្នុង <stdlib.h> គឺជាឧទាហរណ៍ល្បីបំផុត៖ វាតម្រៀប array គ្រប់ប្រភេទបានដោយទទួល pointer ដើម ចំនួនធាតុ ទំហំធាតុនីមួយៗ និង comparator callback ដែលមានទម្រង់ int cmp(const void *a, const void *b)។',
            'នៅក្នុង comparator ត្រូវបម្លែង const void * ត្រឡប់ទៅជា pointer នៃប្រភេទទិន្នន័យពិត រួចត្រឡប់លេខអវិជ្ជមានបើ *a < *b, លេខ 0 បើស្មើគ្នា និងលេខវិជ្ជមានបើ *a > *b។ ការប្រើទម្រង់ (x > y) - (x < y) ធានាសញ្ញាត្រឹមត្រូវដោយមិនប្រថុយ overflow។',
          ],
          points: [
            'qsort() បញ្ជូន pointer ទៅកាន់ធាតុក្នុង array មិនមែនតម្លៃធាតុផ្ទាល់ទេ។',
            'កុំត្រឡប់ (a - b) ក្នុង comparator ចំនួនគត់ពេលលេខអាចធំខ្លាំង ព្រោះការដកអាច overflow។',
            'អ្នកអាចបន្ថែមលក្ខខណ្ឌតម្រៀបបន្ទាប់ (ដូចជាពិន្ទុចុះក្រោម រួចឈ្មោះតាមលំដាប់អក្សរដោយ strcmp)។',
          ],
          exampleTitle: 'ការតម្រៀប Array នៃ Structs ដោយ qsort() Comparator Callback',
          warning:
            'ជៀសវាងការសរសេរ return a->score - b->score; ក្នុង comparator! បើ a->score ជា -2000000000 និង b->score ជា 2000000000 ផលដកនឹងលើសដែន 32-bit int ហើយត្រឡប់សញ្ញាខុស។',
        },
        {
          id: 'dispatch-tables-and-state-machines',
          heading: 'តារាងចែកចាយ (Dispatch Tables) និងការបញ្ជូនពាក្យបញ្ជា',
          body: [
            'នៅពេលកម្មវិធីត្រូវផ្គូផ្គងលេខកូដបញ្ជា ឬជម្រើសម៉ឺនុយទៅអនុគមន៍ដោះស្រាយ ការផ្ទុក function pointer ក្នុង const lookup array—ហៅថា dispatch table—បម្លែងការបំបែកលំហូរវែងៗទៅជាការចូលដំណើរការ array ក្នុងល្បឿន O(1)។ ការបន្ថែមមុខងារថ្មីគ្រាន់តែបន្ថែមមួយជួរក្នុងតារាង មិនបាច់កែ switch ធំៗច្រើនកន្លែងឡើយ។',
            'Dispatch table ក៏អាចផ្សំជាមួយ array នៃ struct ដែលផ្គូផ្គងឈ្មោះពាក្យបញ្ជានិងអនុគមន៍ដោះស្រាយ ដែលជាមូលដ្ឋាននៃ CLI router, virtual machine និង vtable ក្នុង C។',
          ],
          points: [
            'ពិនិត្យលិបិក្រម (index < table_len) ជានិច្ចមុននឹងចូលអានតារាង function pointer។',
            'ដាក់ const លើ dispatch table ដើម្បីរក្សាវាក្នុងអង្គចងចាំអានតែម្យ៉ាង។',
            'អនុគមន៍ទាំងអស់ក្នុង dispatch table តែមួយត្រូវមាន signature ដូចគ្នាទាំងស្រុង។',
          ],
          exampleTitle: 'តារាងចែកចាយពាក្យបញ្ជាដោយ Array នៃ Function Pointers',
          tip: 'ពេលរចនា API ក្នុង C ដែលទទួល callback គួរបន្ថែមប៉ារ៉ាម៉ែត្រ void *user_data មួយទៀត (ដូចជា void (*cb)(int event, void *ctx)) ដើម្បីឱ្យអ្នកហៅបញ្ជូនស្ថានភាពចូល callback ដោយមិនចាំបាច់ប្រើអថេរសកល។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរកម្មវិធី C ដែលកំណត់ typedef int (*TransformFn)(int); និងអនុគមន៍ void map_array(int *arr, size_t n, TransformFn fn) ដើម្បីកែប្រែធាតុនីមួយៗក្នុង array ដោយប្រើ fn។ បង្កើត callback ពីរ—double_val(int x) និង square_val(int x)—អនុវត្តវាតាមលំដាប់លើ { 1, 2, 3, 4 } រួចបង្ហាញលទ្ធផល។',
        hint: 'ពិនិត្យ if (arr == NULL || fn == NULL) return; ក្នុង map_array រួចរត់ loop ពី 0 ដល់ n - 1 កំណត់ arr[i] = fn(arr[i])។',
      },
      quiz: [
        {
          question:
            'តើការប្រកាសណាត្រឹមត្រូវសម្រាប់ fp ជា pointer ទៅអនុគមន៍ទទួល double និងត្រឡប់ int?',
          options: [
            'int *fp(double);',
            'int (*fp)(double);',
            'double (*fp)(int);',
            'int *(fp)(double);',
          ],
          answer: 1,
          explanation:
            'វង់ក្រចកជុំវិញ (*fp) ភ្ជាប់ * ទៅ fp ធ្វើឱ្យវាក្លាយជា function pointer។ បើគ្មានវង់ក្រចកនោះ int *fp(double) ជាអនុគមន៍ត្រឡប់ int * វិញ។',
        },
        {
          question:
            'តើ comparator របស់ qsort() ត្រូវត្រឡប់អ្វីនៅពេលធាតុទីមួយត្រូវដាក់មុនធាតុទីពីរ?',
          options: [
            'លេខ 0 ជានិច្ច',
            'ចំនួនគត់វិជ្ជមាន (> 0)',
            'ចំនួនគត់អវិជ្ជមាន (< 0)',
            'ទំហំបៃរបស់ធាតុ',
          ],
          answer: 2,
          explanation:
            'qsort() ដាក់ a មុន b នៅពេល cmp(a, b) ត្រឡប់ចំនួនអវិជ្ជមាន, ចាត់ទុកស្មើគ្នាលើ 0 និងដាក់ a ក្រោយ b លើចំនួនវិជ្ជមាន។',
        },
      ],
    },
  },

  // =========================================================================
  // 5. FILE I/O
  // =========================================================================
  {
    slug: 'c-file-io',
    level: 'intermediate',
    insertAfter: 'c-function-pointers',
    en: {
      title: 'File I/O (fopen, fgets, fprintf & Binary Streams)',
      duration: '15 min',
      summary:
        'Read and write persistent text and binary files safely in C using FILE streams, proper fopen() modes, line-buffered fgets(), structured fread()/fwrite(), and thorough error handling.',
      objectives: [
        'Open and close FILE * streams with the right access mode and diagnose failures with perror() and fclose().',
        'Write formatted text with fprintf() and read arbitrary lines safely with fgets() without buffer overflows.',
        'Store and reload binary structs using fread(), fwrite(), and random-access positioning with fseek() and ftell().',
      ],
      sections: [
        {
          id: 'opening-modes-and-error-checking',
          heading: 'Opening Streams with fopen(), Modes & Error Checking',
          body: [
            'All standard C file operations work through an opaque FILE * stream handle declared in <stdio.h>. Calling fopen(path, mode) asks the operating system to open or create a file and returns a valid FILE * on success—or NULL if the file does not exist, permissions are denied, or the disk is full.',
            'Because file handles are limited OS resources and buffered writes may still sit in memory until flushed, every successful fopen() must be paired with fclose(fp). Checking the return value of fclose() on writable files is also good practice because final buffered data is flushed to disk at close time.',
          ],
          points: [
            'Always check if (fp == NULL) immediately after fopen() and print the OS error reason with perror().',
            'Append "b" to the mode ("rb", "wb") whenever reading or writing binary data so Windows does not translate \\n to \\r\\n.',
            'Three FILE * streams are opened automatically for every C program: stdin, stdout, and stderr.',
          ],
          table: {
            headers: ['Mode', 'Action', 'If File Exists', 'If File Missing'],
            rows: [
              ['"r"', 'Read text', 'Opens at beginning', 'Fails (returns NULL)'],
              ['"w"', 'Write text', 'Truncates to 0 bytes!', 'Creates new file'],
              ['"a"', 'Append text', 'Writes at end of file', 'Creates new file'],
              ['"r+"', 'Read & write text', 'Opens at beginning', 'Fails (returns NULL)'],
              [
                '"rb" / "wb"',
                'Read / write binary',
                'Same as r / w (no newline translation)',
                'Fails / creates new',
              ],
            ],
          },
          example: {
            title: 'Opening, Checking Errors with perror(), and Closing Safely',
            language: 'c',
            code: `#include <stdio.h>

int main(void) {
    const char *path = "missing_config.txt";
    FILE *fp = fopen(path, "r");

    if (fp == NULL) {
        perror("Failed to open config");
        printf("Falling back to default settings.\\n");
        return 0;
    }

    printf("Opened %s successfully.\\n", path);
    if (fclose(fp) != 0) {
        perror("fclose failed");
        return 1;
    }
    return 0;
}`,
            output: `Failed to open config: No such file or directory
Falling back to default settings.`,
          },
          warning:
            'Opening an existing file with mode "w" or "wb" IMMEDIATELY wipes its contents to zero bytes! Use "a" to append or check/back up before overwriting important files.',
        },
        {
          id: 'text-file-io-fprintf-fgets',
          heading: 'Safe Text I/O with fprintf() and fgets()',
          body: [
            'For human-readable files such as logs, CSV tables, or configuration files, fprintf() writes formatted output to any FILE * stream with the exact same format specifiers as printf(). When reading text back, fgets(buf, sizeof(buf), fp) is the gold-standard function because you pass the buffer size explicitly, preventing buffer overflow vulnerabilities.',
            "Note two important details about fgets(): it keeps the trailing newline character '\\n' if there was room in the buffer (which you can strip cleanly with buf[strcspn(buf, \"\\r\\n\")] = '\\0';), and it returns NULL at end-of-file or on read error—so drive your loop directly with while (fgets(...) != NULL).",
          ],
          points: [
            'Drive read loops with while (fgets(line, sizeof(line), fp) != NULL)—never with while (!feof(fp)).',
            'Strip trailing \\n or \\r\\n safely using strcspn(line, "\\r\\n") from <string.h>.',
            'After a read loop finishes, check ferror(fp) if you need to distinguish a real I/O error from normal EOF.',
          ],
          example: {
            title: 'Writing a Log File with fprintf() and Reading Lines with fgets()',
            language: 'c',
            code: `#include <stdio.h>
#include <string.h>

int main(void) {
    const char *filename = "server.log";

    /* 1. Write formatted text lines */
    FILE *out = fopen(filename, "w");
    if (!out) {
        perror("fopen write");
        return 1;
    }
    fprintf(out, "INFO  Server started on port %d\\n", 8080);
    fprintf(out, "WARN  High latency: %.1f ms\\n", 245.5);
    fclose(out);

    /* 2. Read back safely line by line */
    FILE *in = fopen(filename, "r");
    if (!in) {
        perror("fopen read");
        return 1;
    }

    char line[128];
    int line_no = 1;
    while (fgets(line, sizeof(line), in) != NULL) {
        line[strcspn(line, "\\r\\n")] = '\\0';
        printf("Line %d: %s\\n", line_no++, line);
    }

    fclose(in);
    return 0;
}`,
            output: `Line 1: INFO  Server started on port 8080
Line 2: WARN  High latency: 245.5 ms`,
          },
          warning:
            'Never write while (!feof(fp)) { fgets(...); }! The EOF indicator is only set AFTER a read attempt fails, so !feof(fp) causes your loop body to execute one extra time and duplicate the last line.',
        },
        {
          id: 'binary-io-fread-fwrite-fseek',
          heading: 'Binary I/O with fread(), fwrite() & Random Access',
          body: [
            'When storing raw numeric arrays, images, or fixed-size records, converting numbers to decimal text wastes space and parsing time. Binary streams opened with "wb" and "rb" let you transfer raw bytes directly between memory and disk using fwrite(ptr, elem_size, count, fp) and fread(ptr, elem_size, count, fp).',
            'Both functions return the number of COMPLETE elements actually transferred (not total bytes!), so always compare the return value against the requested count. For random access inside a binary file, fseek(fp, offset, SEEK_SET) jumps directly to any byte offset and ftell(fp) reports the current position.',
          ],
          points: [
            'Always verify fwrite(...) == count and fread(...) == count to catch short writes or truncated files.',
            'Use fixed-width types (uint32_t, int32_t) inside serialized binary records rather than platform-dependent long or int.',
            'fseek(fp, 0, SEEK_END) followed by ftell(fp) computes the byte size of an open binary file.',
          ],
          example: {
            title: 'Saving & Jumping to a Specific Binary Record with fwrite/fseek/fread',
            language: 'c',
            code: `#include <stdint.h>
#include <stdio.h>

typedef struct {
    uint32_t id;
    int32_t balance_cents;
} Account;

int main(void) {
    Account list[3] = {
        { 101, 25000 },
        { 102, 84500 },
        { 103, 12000 }
    };

    FILE *fp = fopen("accounts.bin", "wb");
    if (!fp) { perror("fopen wb"); return 1; }
    if (fwrite(list, sizeof(Account), 3, fp) != 3) {
        perror("fwrite");
        fclose(fp);
        return 1;
    }
    fclose(fp);

    /* Open binary file and jump directly to record index 1 (second record) */
    fp = fopen("accounts.bin", "rb");
    if (!fp) { perror("fopen rb"); return 1; }

    Account second = { 0, 0 };
    if (fseek(fp, (long)sizeof(Account) * 1, SEEK_SET) == 0 &&
        fread(&second, sizeof(Account), 1, fp) == 1) {
        printf("Record #1 -> ID: %u, Balance: $%.2f\\n",
               second.id, second.balance_cents / 100.0);
    }

    fclose(fp);
    return 0;
}`,
            output: `Record #1 -> ID: 102, Balance: $845.00`,
          },
          warning:
            'Writing raw C structs directly to disk is fast for local storage on the same machine, but struct padding and CPU endianness can vary across architectures. For cross-platform file formats, serialize fields explicitly byte by byte.',
        },
      ],
      challenge: {
        prompt:
          'Write a C program that creates a text file "scores.txt" with three lines of player scores ("Sokha 90", "Dara 85", "Bopha 95") using fprintf(), then reopens it for reading with fgets() + sscanf() to compute and print the total number of players and their floating-point average score.',
        hint: 'Check fopen() for NULL on both open calls, parse each line from fgets() using if (sscanf(line, "%31s %d", name, &score) == 2), and close each FILE * with fclose().',
        language: 'c',
        solutionCode: `#include <stdio.h>

int main(void) {
    const char *path = "scores.txt";

    FILE *out = fopen(path, "w");
    if (!out) {
        perror("fopen write");
        return 1;
    }
    fprintf(out, "Sokha 90\\nDara 85\\nBopha 95\\n");
    fclose(out);

    FILE *in = fopen(path, "r");
    if (!in) {
        perror("fopen read");
        return 1;
    }

    char line[64];
    char name[32];
    int score = 0;
    int count = 0;
    int sum = 0;

    while (fgets(line, sizeof(line), in) != NULL) {
        if (sscanf(line, "%31s %d", name, &score) == 2) {
            sum += score;
            count++;
        }
    }
    fclose(in);

    if (count > 0) {
        printf("Players: %d | Average: %.2f\\n", count, (double)sum / count);
    }
    return 0;
}`,
      },
      quiz: [
        {
          question:
            'Why should a text file reading loop be written as while (fgets(buf, sizeof(buf), fp) != NULL) instead of while (!feof(fp))?',
          options: [
            'feof() only works on binary files.',
            'feof() only becomes true AFTER a read fails, causing an extra iteration on the last line.',
            'fgets() automatically closes the file when it finishes.',
            'while (!feof(fp)) does not compile in standard C.',
          ],
          answer: 1,
          explanation:
            'The EOF flag is not set until a read operation actually hits the end of the file. Testing the return value of fgets() directly stops immediately with no duplicate final iteration.',
        },
        {
          question: 'What does fwrite(arr, sizeof(int), 10, fp) return on complete success?',
          options: [
            '40 (total bytes written)',
            '10 (number of elements written)',
            '0 (success code)',
            '1 (boolean true)',
          ],
          answer: 1,
          explanation:
            'Both fwrite() and fread() return the number of complete items (count), NOT the byte count. On success with count = 10, it returns 10.',
        },
      ],
    },
    km: {
      title: 'ការអាន និងសរសេរឯកសារ File I/O (fopen, fgets, fprintf & Binary)',
      duration: '15 នាទី',
      summary:
        'អាន និងសរសេរឯកសារអត្ថបទ និងឯកសារគោលពីរ (binary) ដោយសុវត្ថិភាពក្នុង C ដោយប្រើ FILE streams, របៀបបើក fopen(), fgets(), fread()/fwrite() និងការពិនិត្យកំហុសត្រឹមត្រូវ។',
      objectives: [
        'បើក និងបិទ FILE * streams ដោយជ្រើស mode ត្រឹមត្រូវ និងរាយការណ៍កំហុសដោយ perror() និង fclose()។',
        'សរសេរអត្ថបទមានទម្រង់ដោយ fprintf() និងអានមួយបន្ទាត់ម្ដងដោយសុវត្ថិភាពជាមួយ fgets() ដោយមិនបង្ក buffer overflow។',
        'រក្សាទុក និងអាន structs ជាគោលពីរដោយ fread(), fwrite() និងលោតទីតាំងដោយ fseek()/ftell()។',
      ],
      sections: [
        {
          id: 'opening-modes-and-error-checking',
          heading: 'ការបើក Stream ដោយ fopen(), របៀបបើក និងការពិនិត្យកំហុស',
          body: [
            'ប្រតិបត្តិការឯកសារស្តង់ដារទាំងអស់ក្នុង C ដំណើរការតាមរយៈ FILE * stream ដែលប្រកាសក្នុង <stdio.h>។ ការហៅ fopen(path, mode) ស្នើសុំប្រព័ន្ធប្រតិបត្តិការបើក ឬបង្កើតឯកសារ ហើយត្រឡប់ FILE * ដែលមានសុពលភាពបើជោគជ័យ—ឬត្រឡប់ NULL បើឯកសារគ្មាន គ្មានសិទ្ធិ ឬថាសពេញ។',
            'ដោយសារ file handle ជាធនធានមានកំណត់របស់ OS ហើយទិន្នន័យសរសេរអាចនៅសល់ក្នុង buffer រាល់ fopen() ដែលជោគជ័យត្រូវតែផ្គូផ្គងជាមួយ fclose(fp)។ ការពិនិត្យតម្លៃត្រឡប់របស់ fclose() ពេលសរសេរឯកសារក៏សំខាន់ដែរ ព្រោះទិន្នន័យចុងក្រោយត្រូវបាន flush ចុះថាសនៅពេលបិទ។',
          ],
          points: [
            'ពិនិត្យ if (fp == NULL) ភ្លាមក្រោយ fopen() រួចបង្ហាញមូលហេតុកំហុសពី OS ដោយ perror()។',
            'បន្ថែមអក្សរ "b" ("rb", "wb") ជានិច្ចសម្រាប់ឯកសារ binary ដើម្បីកុំឱ្យ Windows បម្លែង \\n ទៅ \\r\\n។',
            'គ្រប់កម្មវិធី C មាន stream បីបើកស្រាប់គឺ stdin, stdout និង stderr។',
          ],
          table: {
            headers: ['Mode', 'សកម្មភាព', 'បើឯកសារមានស្រាប់', 'បើគ្មានឯកសារ'],
            rows: [
              ['"r"', 'អានអត្ថបទ', 'បើកពីដើមឯកសារ', 'បរាជ័យ (ត្រឡប់ NULL)'],
              ['"w"', 'សរសេរអត្ថបទ', 'លុបទិន្នន័យចាស់សល់ 0 បៃ!', 'បង្កើតឯកសារថ្មី'],
              ['"a"', 'សរសេរបន្ថែមខាងចុង', 'សរសេរតពីចុងឯកសារ', 'បង្កើតឯកសារថ្មី'],
              ['"r+"', 'អាន និងសរសេរអត្ថបទ', 'បើកពីដើមឯកសារ', 'បរាជ័យ (ត្រឡប់ NULL)'],
              [
                '"rb" / "wb"',
                'អាន / សរសេរ binary',
                'ដូច r / w (មិនបម្លែង newline)',
                'បរាជ័យ / បង្កើតថ្មី',
              ],
            ],
          },
          exampleTitle: 'ការបើកឯកសារ ពិនិត្យកំហុសដោយ perror() និងបិទដោយសុវត្ថិភាព',
          warning:
            'ការបើកឯកសារដែលមានស្រាប់ដោយ mode "w" ឬ "wb" នឹងលុបទិន្នន័យចាស់ទាំងអស់ចោលភ្លាម! សូមប្រើ "a" ដើម្បីបន្ថែម ឬបម្រុងទុកឯកសារសំខាន់មុនសរសេរជាន់។',
        },
        {
          id: 'text-file-io-fprintf-fgets',
          heading: 'ការអាន និងសរសេរអត្ថបទដោយសុវត្ថិភាពជាមួយ fprintf() និង fgets()',
          body: [
            'សម្រាប់ឯកសារអត្ថបទដូចជា log, CSV ឬឯកសារកំណត់រចនាសម្ព័ន្ធ អនុគមន៍ fprintf() សរសេរទិន្នន័យមានទម្រង់ទៅ FILE * ណាមួយដោយប្រើ format specifier ដូច printf()។ ពេលអានអត្ថបទមកវិញ fgets(buf, sizeof(buf), fp) ជាជម្រើសល្អបំផុត ព្រោះអ្នកកំណត់ទំហំ buffer ច្បាស់លាស់ដើម្បីការពារ buffer overflow។',
            "ចំណាំចំណុចសំខាន់ពីរអំពី fgets()៖ វារក្សាតួអក្សរចុះបន្ទាត់ '\\n' នៅចុងខ្សែអក្សរ (ដែលអាចកាត់ចេញដោយ buf[strcspn(buf, \"\\r\\n\")] = '\\0';) ហើយវាត្រឡប់ NULL ពេលដល់ចុងឯកសារ ឬមានកំហុស—ដូច្នេះត្រូវគ្រប់គ្រង loop ផ្ទាល់ដោយ while (fgets(...) != NULL)។",
          ],
          points: [
            'គ្រប់គ្រង loop អានដោយ while (fgets(line, sizeof(line), fp) != NULL)—កុំប្រើ while (!feof(fp))។',
            'កាត់ \\n ឬ \\r\\n ចុងបន្ទាត់ដោយសុវត្ថិភាពជាមួយ strcspn(line, "\\r\\n") ពី <string.h>។',
            'ក្រោយចប់ loop អាន អាចពិនិត្យ ferror(fp) ដើម្បីញែកកំហុស I/O ពីការដល់ចុងឯកសារធម្មតា។',
          ],
          exampleTitle: 'ការសរសេរឯកសារ Log ដោយ fprintf() និងអានមួយបន្ទាត់ម្ដងដោយ fgets()',
          warning:
            'កុំសរសេរ while (!feof(fp)) { fgets(...); }! ទង់ EOF បើកលុះត្រាតែការអានបរាជ័យសិន ដូច្នេះ !feof(fp) នឹងធ្វើឱ្យ loop រត់លើសមួយជុំ ហើយបង្ហាញបន្ទាត់ចុងក្រោយពីរដង។',
        },
        {
          id: 'binary-io-fread-fwrite-fseek',
          heading: 'ឯកសារ Binary ដោយ fread(), fwrite() និងការចូលអានតាមទីតាំង',
          body: [
            'ពេលរក្សាទុក array លេខ រូបភាព ឬកំណត់ត្រាទំហំថេរ ការបម្លែងលេខទៅជាអត្ថបទខាតទំហំ និងពេលបម្លែង។ Binary stream ("wb" និង "rb") អនុញ្ញាតឱ្យផ្ទេរបៃផ្ទាល់រវាង RAM និងថាសដោយ fwrite(ptr, elem_size, count, fp) និង fread(ptr, elem_size, count, fp)។',
            'អនុគមន៍ទាំងពីរត្រឡប់ចំនួនធាតុពេញលេញដែលបានផ្ទេរ (មិនមែនចំនួនបៃទេ!) ដូច្នេះត្រូវប្រៀបធៀបលទ្ធផលជាមួយ count ជានិច្ច។ សម្រាប់លោតទៅទីតាំងជាក់លាក់ក្នុងឯកសារ binary ប្រើ fseek(fp, offset, SEEK_SET) និង ftell(fp) ដើម្បីដឹងទីតាំងបច្ចុប្បន្ន។',
          ],
          points: [
            'ផ្ទៀងផ្ទាត់ fwrite(...) == count និង fread(...) == count ជានិច្ចដើម្បីចាប់ការសរសេរ ឬអានមិនពេញ។',
            'ប្រើប្រភេទទំហំថេរ (uint32_t, int32_t) ក្នុងកំណត់ត្រា binary ជំនួសឱ្យ long ឬ int ដែលប្រែប្រួលតាមប្រព័ន្ធ។',
            'fseek(fp, 0, SEEK_END) បន្តដោយ ftell(fp) ប្រាប់ទំហំបៃសរុបនៃឯកសារ binary។',
          ],
          exampleTitle: 'ការរក្សាទុក និងលោតអានកំណត់ត្រា Binary ជាក់លាក់ដោយ fwrite/fseek/fread',
          warning:
            'ការសរសេរ C struct ផ្ទាល់ទៅថាសលឿនសម្រាប់ម៉ាស៊ីនតែមួយ តែ padding របស់ struct និងលំដាប់បៃ (endianness) អាចខុសគ្នារវាងស្ថាបត្យកម្ម CPU។ សម្រាប់ទម្រង់ឯកសារឆ្លងប្រព័ន្ធ គួរបម្លែងវាលនីមួយៗម្ដងមួយបៃ។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរកម្មវិធី C ដែលបង្កើតឯកសារអត្ថបទ "scores.txt" មាន ៣ បន្ទាត់ ("Sokha 90", "Dara 85", "Bopha 95") ដោយ fprintf() រួចបើកអានវិញដោយ fgets() + sscanf() ដើម្បីគណនា និងបង្ហាញចំនួនអ្នកលេងសរុប និងពិន្ទុមធ្យមជាចំនួនទសភាគ។',
        hint: 'ពិនិត្យ fopen() != NULL ទាំងពីរដង ញែកទិន្នន័យដោយ if (sscanf(line, "%31s %d", name, &score) == 2) រួចបិទ FILE * នីមួយៗដោយ fclose()។',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វីគួរសរសេរ loop អានឯកសារអត្ថបទជា while (fgets(buf, sizeof(buf), fp) != NULL) ជំនួស while (!feof(fp))?',
          options: [
            'feof() ប្រើបានតែលើឯកសារ binary ប៉ុណ្ណោះ។',
            'feof() ក្លាយជាពិតលុះត្រាតែការអានបរាជ័យសិន ធ្វើឱ្យ loop រត់លើសមួយជុំលើបន្ទាត់ចុងក្រោយ។',
            'fgets() បិទឯកសារដោយស្វ័យប្រវត្តិពេលអានចប់។',
            'while (!feof(fp)) មិនអាច compile បានក្នុងស្តង់ដារ C។',
          ],
          answer: 1,
          explanation:
            'ទង់ EOF មិនបើកទេរហូតការអានជួបចុងឯកសារពិតប្រាកដ។ ការពិនិត្យតម្លៃត្រឡប់របស់ fgets() ផ្ទាល់នឹងបញ្ឈប់ loop ភ្លាមដោយមិនស្ទួនបន្ទាត់ចុងក្រោយ។',
        },
        {
          question:
            'តើ fwrite(arr, sizeof(int), 10, fp) ត្រឡប់លេខប៉ុន្មាននៅពេលសរសេរជោគជ័យទាំងស្រុង?',
          options: [
            '40 (ចំនួនបៃសរុប)',
            '10 (ចំនួនធាតុដែលបានសរសេរ)',
            '0 (កូដជោគជ័យ)',
            '1 (តម្លៃពិត)',
          ],
          answer: 1,
          explanation:
            'ទាំង fwrite() និង fread() ត្រឡប់ចំនួនធាតុពេញលេញ (count) មិនមែនចំនួនបៃទេ។ ដូច្នេះពេល count = 10 វាត្រឡប់ 10។',
        },
      ],
    },
  },

  // =========================================================================
  // 6. PREPROCESSOR DIRECTIVES, SAFE MACROS & CONDITIONAL COMPILATION
  // =========================================================================
  {
    slug: 'c-preprocessor-and-macros',
    level: 'pro',
    insertAfter: 'c-file-io',
    en: {
      title: 'Preprocessor Directives, Safe Macros & Conditional Compilation',
      duration: '15 min',
      summary:
        'Understand how the C preprocessor transforms source code before compilation, write leak-free header guards and safe macros, choose static inline over function-like macros, and control builds with conditional compilation.',
      objectives: [
        'Explain how #include, include guards, and object-like #define macros operate as pure text transformations before compilation.',
        'Avoid classic function-like macro traps (missing parentheses and double evaluation) by preferring static inline functions.',
        'Use #ifdef, #if defined(...), stringification (#), and predefined macros (__FILE__, __LINE__) for portable builds and debug logging.',
      ],
      sections: [
        {
          id: 'directives-include-guards-and-defines',
          heading: 'The Preprocessor Pipeline, Header Guards & #define',
          body: [
            'Before the C compiler ever parses a single statement or checks a single type, the C preprocessor (cpp) scans every line beginning with # and performs pure token-level text substitution. When you write #include "math_utils.h", the preprocessor literally pastes the contents of that header into your .c file; when you define #define MAX_USERS 128, every occurrence of MAX_USERS is replaced with 128.',
            'Because multiple headers often include the same shared header indirectly, every .h file needs an include guard (#ifndef / #define / #endif) so its struct and type definitions are processed only once per translation unit. For multi-statement macros, wrapping statements in do { ... } while (0) makes the macro behave cleanly like a single C statement inside if/else blocks.',
          ],
          points: [
            'Include guards (#ifndef MY_HEADER_H / #define MY_HEADER_H ... #endif) are 100% portable standard C.',
            'Never put a trailing semicolon on an object-like constant macro (#define PORT 8080, NOT #define PORT 8080;).',
            'You can inspect exact preprocessor output with gcc -E main.c to debug tricky macro expansions.',
          ],
          table: {
            headers: ['Directive', 'Purpose', 'Example'],
            rows: [
              [
                '#include <...> / "..."',
                'Insert system or local header text',
                '#include "config.h"',
              ],
              [
                '#define NAME val',
                'Define macro constant or function macro',
                '#define BUF_LEN 256',
              ],
              ['#undef NAME', 'Remove an existing macro definition', '#undef DEBUG_MODE'],
              ['#ifdef / #ifndef', 'Compile block if macro is / is not defined', '#ifndef UTILS_H'],
              [
                '#if / #elif / #else / #endif',
                'Evaluate compile-time constant expression',
                '#if LOG_LEVEL >= 2',
              ],
              ['#error "msg"', 'Abort compilation with custom message', '#error "64-bit required"'],
            ],
          },
          example: {
            title: 'Standard Include Guard & Safe Multi-Statement do { ... } while (0) Macro',
            language: 'c',
            code: `#include <stdio.h>

/* Typical header guard pattern in a .h file:
   #ifndef APP_CONFIG_H
   #define APP_CONFIG_H
   ... declarations ...
   #endif */

#define APP_NAME "CodeHub-C"
#define SWAP_INT(a, b) do { int _tmp = (a); (a) = (b); (b) = _tmp; } while (0)

int main(void) {
    int x = 10;
    int y = 25;

    if (x < y)
        SWAP_INT(x, y);   /* Safe inside single-line if/else because of do/while(0) */
    else
        printf("No swap\\n");

    printf("%s -> x=%d, y=%d\\n", APP_NAME, x, y);
    return 0;
}`,
            output: `CodeHub-C -> x=25, y=10`,
          },
          tip: 'Use UPPER_SNAKE_CASE exclusively for macros so readers immediately recognize preprocessor symbols and know they do not follow normal C scoping or type rules.',
        },
        {
          id: 'function-like-macros-vs-static-inline',
          heading: 'Function-Like Macro Pitfalls vs Type-Safe static inline',
          body: [
            'Function-like macros such as #define SQUARE(x) x * x look like tiny helper functions, but because they perform blind text substitution they harbor two infamous traps. First, missing parentheses break operator precedence: SQUARE(2 + 3) expands to 2 + 3 * 2 + 3, evaluating to 11 instead of 25! Even if you add parentheses around every parameter and the whole body—#define SQUARE(x) ((x) * (x))—the second trap remains: multiple evaluation.',
            'Calling SQUARE(n++) expands to ((n++) * (n++)), incrementing n twice and triggering Undefined Behavior. In modern C (C99 and later), prefer static inline functions in header files: the compiler checks argument types, evaluates every argument exactly once, respects debugger symbols, and still inlines the machine code with zero call overhead.',
          ],
          points: [
            'If you MUST write a function-like macro, parenthesize every parameter AND the entire replacement expression: ((a) > (b) ? (a) : (b)).',
            'Never pass expressions with side effects (i++, func_call()) to a function-like macro.',
            'Use static inline functions whenever the logic works on concrete types—reserve macros for compile-time constants, token pasting, or __FILE__/__LINE__ metadata.',
          ],
          example: {
            title: 'Broken Macro vs Safe static inline Function',
            language: 'c',
            code: `#include <stdio.h>

/* Trap 1: missing parentheses -> BAD_SQUARE(2 + 3) becomes 2 + 3 * 2 + 3 == 11 */
#define BAD_SQUARE(x) x * x

/* Still vulnerable to double evaluation if passed n++ */
#define MACRO_SQUARE(x) ((x) * (x))

/* Preferred in modern C: type-safe, evaluates x exactly once, zero overhead */
static inline int square_int(int x) {
    return x * x;
}

int main(void) {
    printf("BAD_SQUARE(2 + 3)   = %d (BUG!)\\n", BAD_SQUARE(2 + 3));
    printf("MACRO_SQUARE(2 + 3) = %d\\n", MACRO_SQUARE(2 + 3));

    int n = 4;
    int result = square_int(n++);   /* Evaluates n++ once: squares 4, n becomes 5 */
    printf("square_int(n++)     = %d, n is now %d\\n", result, n);
    return 0;
}`,
            output: `BAD_SQUARE(2 + 3)   = 11 (BUG!)
MACRO_SQUARE(2 + 3) = 25
square_int(n++)     = 16, n is now 5`,
          },
          warning:
            'Never pass expressions with side effects like i++ or read_sensor() into macros like MAX(a, b) or SQUARE(x). Every time the parameter name appears in the macro body, the expression is executed again!',
        },
        {
          id: 'conditional-compilation-and-diagnostics',
          heading: 'Conditional Compilation, Stringification & Debug Logging',
          body: [
            'Conditional compilation directives (#ifdef, #if defined(...), #elif, #else, #endif) let you include or strip blocks of C code before compilation based on build flags passed from the command line (such as gcc -DDEBUG_LOG=1 main.c) or platform macros (_WIN32, __linux__, __APPLE__). Code inside a disabled branch produces zero bytes in the final release executable.',
            'The preprocessor also supplies special operators and built-in macros that ordinary functions cannot replicate: #param turns a macro argument into a string literal (stringification), ## pastes two tokens together, and __FILE__, __LINE__, and __func__ automatically inject the exact call-site location into diagnostic logs and assertions.',
          ],
          points: [
            'Pass build-time flags without editing source files using -DNAME or -DNAME=VALUE on GCC/Clang.',
            'Use #if defined(_WIN32) ... #elif defined(__linux__) ... #endif for clean cross-platform abstractions.',
            'Variadic macros (__VA_ARGS__) combined with __FILE__ and __LINE__ build lightweight debug loggers that compile away completely in release builds.',
          ],
          example: {
            title: 'Compile-Time Debug Logger with __FILE__, __LINE__ & Stringification',
            language: 'c',
            code: `#include <stdio.h>

#ifndef ENABLE_DEBUG
#define ENABLE_DEBUG 1
#endif

#if ENABLE_DEBUG
  #define LOG_DEBUG(fmt, ...) \\
      printf("[DEBUG %s:%d] " fmt "\\n", __FILE__, __LINE__, ##__VA_ARGS__)
#else
  #define LOG_DEBUG(fmt, ...) ((void)0)
#endif

/* Stringification (#x) prints the variable name alongside its value */
#define INSPECT_INT(expr) printf("%s = %d\\n", #expr, (expr))

int main(void) {
    int connections = 12;
    int max_pool = 32;

    LOG_DEBUG("Pool initialized");
    INSPECT_INT(connections);
    INSPECT_INT(max_pool - connections);
    return 0;
}`,
            output: `[DEBUG main.c:22] Pool initialized
connections = 12
max_pool - connections = 20`,
          },
          tip: 'Define disabled debug macros as ((void)0) instead of leaving them empty so statements like if (ok) LOG_DEBUG("done"); remain syntactically valid with zero compiler warnings.',
        },
      ],
      challenge: {
        prompt:
          'Write a C program that defines a compile-time flag #ifndef LOG_LEVEL (#define LOG_LEVEL 2), a static inline int clamp_int(int val, int lo, int hi) function (safe against side effects), and a macro ASSERT_EQ(actual, expected) that uses stringification (#actual) and __LINE__ to print PASS or FAIL with the expression text and line number.',
        hint: 'Implement clamp_int using two simple if checks; wrap ASSERT_EQ in do { int _a = (actual); int _e = (expected); ... } while (0) so arguments are evaluated only once.',
        language: 'c',
        solutionCode: `#include <stdio.h>

#ifndef LOG_LEVEL
#define LOG_LEVEL 2
#endif

static inline int clamp_int(int val, int lo, int hi) {
    if (val < lo) return lo;
    if (val > hi) return hi;
    return val;
}

#define ASSERT_EQ(actual, expected)                                             \\
    do {                                                                        \\
        int _a = (actual);                                                      \\
        int _e = (expected);                                                    \\
        if (_a == _e) {                                                         \\
            if (LOG_LEVEL >= 2)                                                 \\
                printf("PASS (line %d): %s == %d\\n", __LINE__, #actual, _e);    \\
        } else {                                                                \\
            printf("FAIL (line %d): %s was %d, expected %d\\n",                 \\
                   __LINE__, #actual, _a, _e);                                  \\
        }                                                                       \\
    } while (0)

int main(void) {
    int x = 150;
    ASSERT_EQ(clamp_int(x, 0, 100), 100);
    ASSERT_EQ(clamp_int(-5, 0, 100), 0);
    ASSERT_EQ(clamp_int(42, 0, 100), 42);
    return 0;
}`,
      },
      quiz: [
        {
          question: 'Given #define DOUBLE(x) x + x, what does 10 * DOUBLE(3) evaluate to?',
          options: ['60', '33', '30', '23'],
          answer: 1,
          explanation:
            'Because there are no parentheses around the macro body, 10 * DOUBLE(3) expands to 10 * 3 + 3, which computes (10 * 3) + 3 = 33 instead of 60.',
        },
        {
          question:
            'Why is a static inline function usually preferred over a function-like #define macro in modern C?',
          options: [
            'static inline functions can manipulate __FILE__ and __LINE__ of the caller automatically.',
            'static inline functions enforce type checking and evaluate each argument exactly once while still allowing zero-overhead inlining.',
            'Function-like macros were removed in C11.',
            'static inline functions run during the preprocessing phase.',
          ],
          answer: 1,
          explanation:
            'static inline functions give you full compiler type checking, single argument evaluation (no side-effect bugs like n++), and normal debugging support without sacrificing performance.',
        },
      ],
    },
    km: {
      title: 'Preprocessor Directives, Macros សុវត្ថិភាព និង Conditional Compilation',
      duration: '15 នាទី',
      summary:
        'ស្វែងយល់ពីរបៀបដែល C preprocessor បំប្លែងកូដមុនពេល compile សរសេរ header guard និង macro សុវត្ថិភាព ជ្រើសរើស static inline ជំនួស function-like macro និងគ្រប់គ្រង build ដោយ conditional compilation។',
      objectives: [
        'ពន្យល់ពីដំណើរការ #include, header guards និង #define ដែលជាការជំនួសអត្ថបទមុនពេល compile។',
        'ជៀសវាងអន្ទាក់ macro (ខ្វះវង់ក្រចក និងការគណនាអង្គពីរដង) ដោយប្រើអនុគមន៍ static inline ជំនួស។',
        'ប្រើ #ifdef, #if defined(...), stringification (#) និង __FILE__ / __LINE__ សម្រាប់ build ឆ្លងប្រព័ន្ធ និង debug logging។',
      ],
      sections: [
        {
          id: 'directives-include-guards-and-defines',
          heading: 'ដំណើរការ Preprocessor, Header Guards និង #define',
          body: [
            'មុនពេល C compiler វិភាគវេយ្យាករណ៍ ឬពិនិត្យប្រភេទទិន្នន័យ កម្មវិធី C preprocessor (cpp) ស្កេនគ្រប់បន្ទាត់ដែលចាប់ផ្ដើមដោយ # ហើយធ្វើការជំនួសអត្ថបទសុទ្ធសាធ។ ពេលអ្នកសរសេរ #include "math_utils.h" វាចម្លងមាតិកាឯកសារ .h នោះចូល .c ផ្ទាល់ ហើយពេលកំណត់ #define MAX_USERS 128 រាល់ពាក្យ MAX_USERS ត្រូវជំនួសដោយ 128។',
            'ដោយសារឯកសារ header ច្រើនអាច include header រួមគ្នាដោយប្រយោល រាល់ឯកសារ .h ត្រូវមាន include guard (#ifndef / #define / #endif) ដើម្បីកុំឱ្យប្រកាស struct ឬប្រភេទដដែលៗស្ទួនគ្នា។ ចំណែក macro ដែលមានច្រើនឃ្លា គួររុំដោយ do { ... } while (0) ដើម្បីឱ្យវាដំណើរការស្អាតដូចឃ្លាតែមួយក្នុង if/else។',
          ],
          points: [
            'Include guards (#ifndef MY_HEADER_H / #define MY_HEADER_H ... #endif) ជាស្តង់ដារ C ដែលដំណើរការលើគ្រប់ compiler 100%។',
            'កុំដាក់សញ្ញា ; នៅចុង macro តម្លៃថេរ (#define PORT 8080 មិនមែន #define PORT 8080; ទេ)។',
            'អ្នកអាចមើលលទ្ធផលក្រោយ preprocessing ដោយរត់ gcc -E main.c ដើម្បីពិនិត្យការពង្រីក macro។',
          ],
          table: {
            headers: ['Directive', 'មុខងារ', 'ឧទាហរណ៍'],
            rows: [
              [
                '#include <...> / "..."',
                'បញ្ចូលមាតិកា header ប្រព័ន្ធ ឬក្នុងគម្រោង',
                '#include "config.h"',
              ],
              [
                '#define NAME val',
                'កំណត់ macro តម្លៃថេរ ឬ macro ដូចអនុគមន៍',
                '#define BUF_LEN 256',
              ],
              ['#undef NAME', 'លុបការកំណត់ macro ដែលមានស្រាប់', '#undef DEBUG_MODE'],
              [
                '#ifdef / #ifndef',
                'Compile ប្លុកបើ macro ត្រូវបាន/មិនត្រូវបានកំណត់',
                '#ifndef UTILS_H',
              ],
              [
                '#if / #elif / #else / #endif',
                'ពិនិត្យលក្ខខណ្ឌថេរពេល compile',
                '#if LOG_LEVEL >= 2',
              ],
              [
                '#error "msg"',
                'បញ្ឈប់ការ compile ដោយបង្ហាញសារផ្ទាល់ខ្លួន',
                '#error "64-bit required"',
              ],
            ],
          },
          exampleTitle: 'Include Guard ស្តង់ដារ និង Macro ពហុឃ្លា do { ... } while (0)',
          tip: 'ប្រើអក្សរធំ UPPER_SNAKE_CASE សម្រាប់តែ macros ប៉ុណ្ណោះ ដើម្បីឱ្យអ្នកអានដឹងភ្លាមថាវាជានិមិត្តសញ្ញា preprocessor មិនមែនអថេរ ឬអនុគមន៍ C ធម្មតាទេ។',
        },
        {
          id: 'function-like-macros-vs-static-inline',
          heading: 'អន្ទាក់នៃ Function-Like Macros ទល់នឹង static inline ដែលមានសុវត្ថិភាព',
          body: [
            'Function-like macro ដូចជា #define SQUARE(x) x * x មើលទៅដូចអនុគមន៍ខ្លី ប៉ុន្តែដោយសារវាជំនួសអត្ថបទដោយមិនគិតប្រភេទ វាមានអន្ទាក់ល្បីពីរ។ ទីមួយ ខ្វះវង់ក្រចកធ្វើឱ្យខូចលំដាប់អាទិភាព៖ SQUARE(2 + 3) ពង្រីកជា 2 + 3 * 2 + 3 ដែលស្មើ 11 ជំនួសឱ្យ 25! ទោះអ្នកដាក់វង់ក្រចកគ្រប់កន្លែង (#define SQUARE(x) ((x) * (x))) ក៏នៅសល់អន្ទាក់ទីពីរគឺការគណនាអង្គលើសមួយដង។',
            'ការហៅ SQUARE(n++) ពង្រីកជា ((n++) * (n++)) បូក n ពីរដង និងបង្ក Undefined Behavior។ ក្នុង C ទំនើប (C99 ឡើង) សូមជ្រើសរើសអនុគមន៍ static inline ក្នុង header៖ compiler ពិនិត្យប្រភេទត្រឹមត្រូវ គណនាអង្គម្ដងគត់ ងាយ debug ហើយនៅតែ inline កូដម៉ាស៊ីនដោយគ្មានបន្ទុកហៅអនុគមន៍។',
          ],
          points: [
            'បើចាំបាច់ត្រូវសរសេរ function-like macro ត្រូវដាក់វង់ក្រចកលើគ្រប់ប៉ារ៉ាម៉ែត្រ និងលើកន្សោមទាំងមូល៖ ((a) > (b) ? (a) : (b))។',
            'កុំបញ្ជូនកន្សោមដែលមានផលប៉ះពាល់បន្ទាប់បន្សំ (i++, ការហៅអនុគមន៍) ចូល function-like macro ឱ្យសោះ។',
            'ប្រើ static inline ជានិច្ចពេលប្រភេទទិន្នន័យច្បាស់លាស់—ទុក macro សម្រាប់តម្លៃថេរ, token pasting ឬ __FILE__/__LINE__។',
          ],
          exampleTitle: 'ការប្រៀបធៀប Macro ដែលមានកំហុស ទល់នឹងអនុគមន៍ static inline',
          warning:
            'កុំបញ្ជូនកន្សោមដែលកែប្រែស្ថានភាពដូចជា i++ ឬ read_sensor() ចូលក្នុង macro ដូច MAX(a, b) ឬ SQUARE(x) ព្រោះរាល់កន្លែងដែលឈ្មោះប៉ារ៉ាម៉ែត្រលេចឡើងក្នុង macro កន្សោមនោះនឹងដំណើរការម្ដងទៀត!',
        },
        {
          id: 'conditional-compilation-and-diagnostics',
          heading: 'Conditional Compilation, Stringification និង Debug Logging',
          body: [
            'Directive លក្ខខណ្ឌពេល compile (#ifdef, #if defined(...), #elif, #else, #endif) អនុញ្ញាតឱ្យបញ្ចូល ឬដកប្លុកកូដ C មុនពេល compile តាមទង់ build ពី command line (ដូចជា gcc -DDEBUG_LOG=1 main.c) ឬតាមប្រព័ន្ធប្រតិបត្តិការ (_WIN32, __linux__, __APPLE__)។ កូដក្នុងផ្នែកដែលបិទនឹងមិនបង្កើតបៃណាមួយក្នុងឯកសារ release ឡើយ។',
            'Preprocessor ក៏មានឧបករណ៍ពិសេសដែលអនុគមន៍ធម្មតាមិនអាចធ្វើបានដែរ៖ សញ្ញា #param បម្លែងអង្គ macro ទៅជា string literal (stringification), ## ផ្សារ token ពីរបញ្ចូលគ្នា និង __FILE__, __LINE__, __func__ បញ្ចូលឈ្មោះឯកសារ និងលេខបន្ទាត់កូដដោយស្វ័យប្រវត្តិសម្រាប់ debug log។',
          ],
          points: [
            'បញ្ជូនទង់ build ដោយមិនបាច់កែកូដប្រភពតាមរយៈ -DNAME ឬ -DNAME=VALUE លើ GCC/Clang។',
            'ប្រើ #if defined(_WIN32) ... #elif defined(__linux__) ... #endif សម្រាប់កូដឆ្លងប្រព័ន្ធប្រតិបត្តិការ។',
            'Variadic macro (__VA_ARGS__) រួមជាមួយ __FILE__ និង __LINE__ បង្កើត debug logger ស្រាលដែលរលាយបាត់ទាំងស្រុងក្នុង release build។',
          ],
          exampleTitle: 'Debug Logger ពេល Compile ជាមួយ __FILE__, __LINE__ និង Stringification',
          tip: 'កំណត់ debug macro ដែលបិទឱ្យស្មើ ((void)0) ជំនួសឱ្យការទុកទទេ ដើម្បីឱ្យឃ្លាដូច if (ok) LOG_DEBUG("done"); នៅតែត្រឹមត្រូវតាមវេយ្យាករណ៍ដោយគ្មានការព្រមានពី compiler។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរកម្មវិធី C ដែលកំណត់ទង់ compile-time #ifndef LOG_LEVEL (#define LOG_LEVEL 2), អនុគមន៍ static inline int clamp_int(int val, int lo, int hi) និង macro ASSERT_EQ(actual, expected) ដែលប្រើ stringification (#actual) និង __LINE__ ដើម្បីបង្ហាញ PASS ឬ FAIL ជាមួយអត្ថបទកន្សោម និងលេខបន្ទាត់។',
        hint: 'សរសេរ clamp_int ដោយ if ពីរឃ្លា ហើយរុំ ASSERT_EQ ក្នុង do { int _a = (actual); int _e = (expected); ... } while (0) ដើម្បីគណនាអង្គតែម្ដងគត់។',
      },
      quiz: [
        {
          question: 'បើមាន #define DOUBLE(x) x + x តើកន្សោម 10 * DOUBLE(3) ផ្ដល់លទ្ធផលប៉ុន្មាន?',
          options: ['60', '33', '30', '23'],
          answer: 1,
          explanation:
            'ដោយសារគ្មានវង់ក្រចកព័ទ្ធជុំវិញតួ macro ដូច្នេះ 10 * DOUBLE(3) ពង្រីកជា 10 * 3 + 3 ដែលគណនា (10 * 3) + 3 = 33 ជំនួសឱ្យ 60។',
        },
        {
          question:
            'ហេតុអ្វីបានជាអនុគមន៍ static inline ត្រូវបានពេញនិយមជាង function-like #define macro ក្នុង C ទំនើប?',
          options: [
            'static inline អាចចាប់យក __FILE__ និង __LINE__ របស់អ្នកហៅដោយស្វ័យប្រវត្តិ។',
            'static inline ពិនិត្យប្រភេទទិន្នន័យត្រឹមត្រូវ និងគណនាអង្គនីមួយៗតែម្ដងគត់ ដោយនៅតែអាច inline បានលឿន។',
            'Function-like macros ត្រូវបានលុបចោលក្នុងស្តង់ដារ C11។',
            'អនុគមន៍ static inline ដំណើរការនៅដំណាក់កាល preprocessing។',
          ],
          answer: 1,
          explanation:
            'static inline ផ្ដល់ការពិនិត្យប្រភេទពេញលេញ ការគណនាអង្គតែម្ដង (គ្មានកំហុស n++) និងងាយស្រួល debug ដោយមិនបាត់បង់ល្បឿនឡើយ។',
        },
      ],
    },
  },
]
