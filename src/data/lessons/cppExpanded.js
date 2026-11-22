export const cppExpanded = [
  // =========================================================================
  // 1. OPERATORS, SWITCH, CONSTEXPR & SCOPED ENUMS
  // =========================================================================
  {
    slug: 'cpp-operators-and-control',
    level: 'beginner',
    insertAfter: 'cpp-from-zero',
    en: {
      title: 'Operators, switch, constexpr & Scoped Enums',
      duration: '12 min',
      summary:
        'Write bug-free expressions and branches in modern C++ using explicit casts, compile-time constexpr values, structured if/switch control flow, and type-safe scoped enums (enum class).',
      objectives: [
        'Avoid silent integer truncation and legacy C-style casts by using static_cast<T> and explicit numeric types.',
        'Evaluate constants and helper functions at compile time with constexpr and scope branch variables cleanly with C++17 if-initializers.',
        'Replace legacy unscoped enums with enum class to prevent namespace pollution and implicit integer conversions inside switch statements.',
      ],
      sections: [
        {
          id: 'cpp-operators-and-conversions',
          heading: 'Arithmetic, Logical Operators & Safe Type Casting',
          body: [
            'C++ supports rich arithmetic (+, -, *, /, %), comparison (==, !=, <, <=, >, >=, and C++20 <=>), logical (&&, ||, !), and bitwise (&, |, ^, <<, >>) operators. One of the earliest traps for beginners is integer division: when both operands of / are integers, C++ discards the fractional remainder completely—so 7 / 2 evaluates to 3, not 3.5.',
            'To perform floating-point division or convert between numeric types intentionally, use static_cast<TargetType>(value). Unlike C-style casts such as (double)total, static_cast is checked by the compiler, visually stands out during code reviews, and refuses dangerous conversions like casting unrelated pointer types.',
          ],
          points: [
            'Logical && and || short-circuit from left to right—put cheap or safety guards (like count > 0 && sum / count > 50) on the left.',
            'Use static_cast<double>(sum) / count to convert before dividing, not static_cast<double>(sum / count).',
            'Compound assignment operators (+=, -=, *=, /=, %=) keep updates concise and avoid repeating variable names.',
            'Prefer prefix ++i over postfix i++ when the old value is unused—especially for iterators.',
          ],
          table: {
            headers: ['Syntax', 'Category', 'Example', 'Result / Behavior'],
            rows: [
              ['a / b (ints)', 'Integer division', '7 / 2', '3 (truncates toward zero)'],
              ['a % b', 'Modulo (remainder)', '7 % 2', '1 (integers only)'],
              ['static_cast<T>(x)', 'Explicit safe cast', 'static_cast<double>(7) / 2', '3.5'],
              [
                '&& / || / !',
                'Logical short-circuit',
                'n > 0 && total / n >= 10',
                'Skips division if n <= 0',
              ],
              [
                'cond ? a : b',
                'Ternary conditional',
                'score >= 60 ? "Pass" : "Fail"',
                'Both branches share a type',
              ],
              [
                'constexpr',
                'Compile-time constant',
                'constexpr int kMax{100};',
                'Evaluated at compile time',
              ],
              [
                'enum class',
                'Scoped enum',
                'enum class Role { User, Admin };',
                'No implicit int conversion',
              ],
            ],
          },
          example: {
            title: 'Integer Division vs static_cast & Short-Circuit Guards',
            language: 'cpp',
            code: `#include <iomanip>
#include <iostream>

int main() {
    int completed{7};
    int total_tasks{2};

    int truncated = completed / total_tasks;
    double exact = static_cast<double>(completed) / total_tasks;

    int divisor{0};
    bool safe_ratio = (divisor != 0) && (completed / divisor > 2);

    std::cout << "Integer division: " << truncated << "\\n";
    std::cout << std::fixed << std::setprecision(1);
    std::cout << "Exact division:   " << exact << "\\n";
    std::cout << "Safe ratio check: " << std::boolalpha << safe_ratio << "\\n";
    return 0;
}`,
            output: `Integer division: 3
Exact division:   3.5
Safe ratio check: false`,
          },
          warning:
            'Avoid C-style casts like (int)x or (double)ptr in C++. A C-style cast silently tries multiple unsafe conversions including removing const—always prefer static_cast<T>(x) so the compiler verifies your intent.',
        },
        {
          id: 'constexpr-and-if-init',
          heading: 'Compile-Time constexpr & Structured Control Flow',
          body: [
            'Marking a variable or small pure function as constexpr tells the compiler it can be evaluated during compilation rather than at runtime. Unlike const—which only promises that a variable will not be modified after runtime initialization—constexpr guarantees a true compile-time constant that can be used for array sizes, template arguments, and switch case labels.',
            'Modern C++ also sharpens control flow. C++17 introduced if and switch statements with an initializer—if (auto discount = compute_discount(total); discount > 0)—keeping temporary variables tightly scoped to the branch that needs them. Inside switch blocks, always end cases with break or return, or annotate intentional fall-through explicitly with [[fallthrough]]; so compilers do not warn.',
          ],
          points: [
            'A constexpr function runs at compile time when given constant inputs and normally at runtime when given dynamic inputs.',
            'if (init; condition) limits the lifetime of init to the if and its else branch, preventing accidental reuse later.',
            'In C++ switch statements, every case label must be an integral or enum compile-time constant (strings cannot be switched on directly).',
          ],
          example: {
            title: 'constexpr Helpers & C++17 if-Initializer',
            language: 'cpp',
            code: `#include <iostream>

constexpr int shipping_fee(int order_usd) {
    return order_usd >= 50 ? 0 : 6;
}

int main() {
    constexpr int kSmallOrderFee = shipping_fee(30); // Evaluated at compile time
    int cart_total{65};

    if (int fee = shipping_fee(cart_total); fee == 0) {
        std::cout << "Free shipping unlocked! (Small-order fee is $" << kSmallOrderFee << ")\\n";
    } else {
        std::cout << "Shipping fee: $" << fee << "\\n";
    }
    return 0;
}`,
            output: `Free shipping unlocked! (Small-order fee is $6)`,
          },
          tip: 'Use constexpr by default for math constants, lookup tables, and small pure helpers. It gives you zero runtime overhead and lets you verify invariants at compile time with static_assert.',
        },
        {
          id: 'scoped-enum-class',
          heading: 'Type-Safe Scoped Enums (enum class) with switch',
          body: [
            'Legacy C-style enums (enum Color { Red, Green };) leak their enumerator names into the surrounding scope and silently convert to integers. That means defining both enum Color { Red } and enum Alert { Red } causes a name collision, and comparing Color::Red == 0 compiles without complaint even though it makes no logical sense.',
            'C++11 solved both problems with scoped enums: enum class. Enumerators stay scoped inside their enum name (OrderStatus::Paid), never implicitly convert to int, and allow specifying an exact underlying integer type such as enum class OrderStatus : std::uint8_t. Pairing enum class with switch lets compilers warn you (via -Wswitch) whenever you forget to handle a new enum value.',
          ],
          points: [
            'Always qualify scoped enumerators (OrderStatus::Shipped), or use C++20 using enum OrderStatus; inside a narrow switch block.',
            'Specify a compact underlying type (: std::uint8_t) when storing thousands of enum values in structs or network packets.',
            'If you genuinely need the numeric value of an enum class, convert explicitly with static_cast<int>(status).',
          ],
          example: {
            title: 'Switching Cleanly Over an enum class',
            language: 'cpp',
            code: `#include <cstdint>
#include <iostream>
#include <string_view>

enum class OrderStatus : std::uint8_t {
    Pending,
    Paid,
    Shipped,
    Cancelled
};

constexpr std::string_view status_label(OrderStatus status) {
    switch (status) {
        case OrderStatus::Pending:   return "Awaiting payment";
        case OrderStatus::Paid:      return "Preparing shipment";
        case OrderStatus::Shipped:   return "On the way";
        case OrderStatus::Cancelled: return "Order cancelled";
    }
    return "Unknown";
}

int main() {
    OrderStatus current{OrderStatus::Paid};
    std::cout << "Status: " << status_label(current) << "\\n";
    std::cout << "Raw code: " << static_cast<int>(current) << "\\n";
    return 0;
}`,
            output: `Status: Preparing shipment
Raw code: 1`,
          },
          warning:
            'Never omit break or return inside a non-empty switch case unless fall-through is truly intended—and if it is intended, write [[fallthrough]]; on its own line so both teammates and compilers know it is not a bug.',
        },
      ],
      challenge: {
        prompt:
          'Define a scoped enum class TrafficLight with values Red, Yellow, and Green. Write a constexpr function seconds_for(TrafficLight light) using a switch statement (Red = 45, Yellow = 5, Green = 35), verify seconds_for(TrafficLight::Yellow) == 5 with static_assert, and print all three durations in main().',
        hint: 'Declare enum class TrafficLight { Red, Yellow, Green };, mark seconds_for as constexpr int, return inside each case, and place static_assert(seconds_for(TrafficLight::Yellow) == 5); inside main().',
        language: 'cpp',
        solutionCode: `#include <iostream>

enum class TrafficLight { Red, Yellow, Green };

constexpr int seconds_for(TrafficLight light) {
    switch (light) {
        case TrafficLight::Red:    return 45;
        case TrafficLight::Yellow: return 5;
        case TrafficLight::Green:  return 35;
    }
    return 0;
}

int main() {
    static_assert(seconds_for(TrafficLight::Yellow) == 5);
    std::cout << "Red: " << seconds_for(TrafficLight::Red) << "s\\n";
    std::cout << "Yellow: " << seconds_for(TrafficLight::Yellow) << "s\\n";
    std::cout << "Green: " << seconds_for(TrafficLight::Green) << "s\\n";
    return 0;
}`,
      },
      quiz: [
        {
          question: 'What does double ratio = 5 / 2; store in C++?',
          options: ['2.5', '2.0', '3.0', 'It fails to compile'],
          answer: 1,
          explanation:
            'Both 5 and 2 are int literals, so 5 / 2 performs integer division first and produces 2, which is then converted to 2.0. Use static_cast<double>(5) / 2 or 5.0 / 2 to get 2.5.',
        },
        {
          question: 'Why is enum class preferred over a traditional unscoped enum in modern C++?',
          options: [
            'enum class values automatically convert to std::string.',
            'enum class prevents enumerator name collisions and forbids accidental implicit conversion to int.',
            'enum class allows switching directly on std::string values.',
            'Traditional enum was removed from C++20.',
          ],
          answer: 1,
          explanation:
            'Scoped enums keep their enumerators inside the enum namespace (e.g., Role::Admin) and require an explicit static_cast to convert to an integer, preventing subtle type bugs.',
        },
      ],
    },
    km: {
      title: 'ប្រមាណវិធី ឃ្លា switch, constexpr និង Scoped Enums',
      duration: '12 នាទី',
      summary:
        'សរសេរកន្សោម និងលក្ខខណ្ឌគ្មានកំហុសក្នុង C++ ទំនើប ដោយប្រើ static_cast តម្លៃ compile-time constexpr លំហូរត្រួតពិនិត្យ if/switch និង scoped enums (enum class) ដែលមានសុវត្ថិភាពប្រភេទ។',
      objectives: [
        'ជៀសវាងការកាត់ក្បៀសលេខគត់ដោយស្ងាត់ៗ និង C-style cast ដោយប្រើ static_cast<T> យ៉ាងច្បាស់លាស់។',
        'គណនាតម្លៃថេរ និងអនុគមន៍តូចៗនៅពេល compile ដោយ constexpr និងកំណត់វិសាលភាពអថេរក្នុង if-initializer របស់ C++17។',
        'ជំនួស enum បែបចាស់ដោយ enum class ដើម្បីការពារការជាន់ឈ្មោះ និងការបម្លែងជា int ដោយអចេតនាក្នុងឃ្លា switch។',
      ],
      sections: [
        {
          id: 'cpp-operators-and-conversions',
          heading: 'ប្រមាណវិធីគណិត តក្កវិទ្យា និងការបម្លែងប្រភេទដោយសុវត្ថិភាព',
          body: [
            'C++ គាំទ្រប្រមាណវិធីគណិត (+, -, *, /, %), ប្រៀបធៀប (==, !=, <, <=, >, >=, និង <=>), តក្កវិទ្យា (&&, ||, !) និង bitwise (&, |, ^, <<, >>)។ អន្ទាក់ញឹកញាប់បំផុតសម្រាប់អ្នកចាប់ផ្ដើមគឺការចែកលេខគត់៖ ពេលភាគយក និងភាគបែងសុទ្ធតែជា int នោះ C++ កាត់ចោលផ្នែកទសភាគទាំងស្រុង ដូច្នេះ 7 / 2 ស្មើ 3 មិនមែន 3.5 ទេ។',
            'ដើម្បីចែកជាលេខទសភាគ ឬបម្លែងប្រភេទលេខដោយចេតនា សូមប្រើ static_cast<TargetType>(value)។ ខុសពី C-style cast ដូចជា (double)total ការប្រើ static_cast ត្រូវបាន compiler ផ្ទៀងផ្ទាត់ ងាយមើលឃើញពេលត្រួតពិនិត្យកូដ និងបដិសេធការបម្លែង pointer គ្រោះថ្នាក់។',
          ],
          points: [
            '&& និង || ដំណើរការបែប short-circuit ពីឆ្វេងទៅស្ដាំ—ដាក់លក្ខខណ្ឌការពារ (ដូចជា count > 0 && sum / count > 50) នៅខាងឆ្វេង។',
            'ប្រើ static_cast<double>(sum) / count ដើម្បីបម្លែងមុនចែក មិនមែន static_cast<double>(sum / count) ទេ។',
            'ប្រមាណវិធីផ្គួប (+=, -=, *=, /=, %=) ជួយឱ្យការកែប្រែតម្លៃខ្លី និងមិនសរសេរឈ្មោះអថេរម្ដងទៀត។',
            'គួរប្រើ ++i មុន i++ នៅពេលមិនត្រូវការតម្លៃចាស់ ជាពិសេសជាមួយ iterators។',
          ],
          table: {
            headers: ['វាក្យសម្ព័ន្ធ', 'ប្រភេទ', 'ឧទាហរណ៍', 'លទ្ធផល / ឥរិយាបថ'],
            rows: [
              ['a / b (ints)', 'ចែកលេខគត់', '7 / 2', '3 (កាត់ក្បៀសចោល)'],
              ['a % b', 'សំណល់ចែក (Modulo)', '7 % 2', '1 (សម្រាប់តែលេខគត់)'],
              ['static_cast<T>(x)', 'បម្លែងប្រភេទសុវត្ថិភាព', 'static_cast<double>(7) / 2', '3.5'],
              [
                '&& / || / !',
                'តក្កវិទ្យា short-circuit',
                'n > 0 && total / n >= 10',
                'រំលងការចែកបើ n <= 0',
              ],
              [
                'cond ? a : b',
                'Ternary លក្ខខណ្ឌខ្លី',
                'score >= 60 ? "Pass" : "Fail"',
                'មែកទាំងពីរមានប្រភេទដូចគ្នា',
              ],
              ['constexpr', 'តម្លៃថេរពេល compile', 'constexpr int kMax{100};', 'គណនាពេល compile'],
              [
                'enum class',
                'Scoped enum',
                'enum class Role { User, Admin };',
                'មិនបម្លែងជា int ស្វ័យប្រវត្តិ',
              ],
            ],
          },
          exampleTitle: 'ការចែកលេខគត់ ទល់នឹង static_cast និងលក្ខខណ្ឌការពារ Short-Circuit',
          warning:
            'ជៀសវាង C-style cast ដូចជា (int)x ឬ (double)ptr ក្នុង C++។ C-style cast អាចលួចលុប const ឬបម្លែងប្រភេទមិនមានសុវត្ថិភាព—សូមប្រើ static_cast<T>(x) ជានិច្ចដើម្បីឱ្យ compiler ផ្ទៀងផ្ទាត់។',
        },
        {
          id: 'constexpr-and-if-init',
          heading: 'constexpr ពេល Compile និងលំហូរត្រួតពិនិត្យមានរចនាសម្ព័ន្ធ',
          body: [
            'ការដាក់ constexpr លើអថេរ ឬអនុគមន៍សុទ្ធតូចៗ ប្រាប់ compiler ឱ្យគណនាលទ្ធផលនៅពេល compile ជំនួសឱ្យពេល runtime។ ខុសពី const ដែលគ្រាន់តែហាមមិនឱ្យកែតម្លៃក្រោយចាប់ផ្ដើម constexpr ធានាតម្លៃថេរពិតប្រាកដពេល compile ដែលប្រើបានជាទំហំ array ឬ case label ក្នុង switch។',
            'C++17 ក៏បានបន្ថែម if និង switch ដែលមាន initializer—ដូចជា if (auto discount = compute_discount(total); discount > 0)—ដើម្បីរក្សាអថេរបណ្ដោះអាសន្នឱ្យនៅតែក្នុងប្លុកលក្ខខណ្ឌនោះ។ ក្នុង switch សូមបញ្ចប់ case ដោយ break ឬ return ឬដាក់ [[fallthrough]]; បើអ្នកចង់ឱ្យវាធ្លាក់ឆ្លងដោយចេតនា។',
          ],
          points: [
            'អនុគមន៍ constexpr រត់នៅពេល compile ពេលផ្ដល់តម្លៃថេរ ហើយរត់ពេល runtime ពេលផ្ដល់ទិន្នន័យប្រែប្រួល។',
            'if (init; condition) កំណត់អាយុកាលអថេរ init ឱ្យនៅតែក្នុង if និង else ការពារការប្រើខុសនៅខាងក្រៅ។',
            'case នីមួយៗក្នុង C++ switch ត្រូវតែជាតម្លៃថេរលេខគត់ ឬ enum ពេល compile (មិនអាច switch លើ std::string ផ្ទាល់ទេ)។',
          ],
          exampleTitle: 'អនុគមន៍ constexpr និង if-Initializer ក្នុង C++17',
          tip: 'ប្រើ constexpr ជាលំនាំដើមសម្រាប់តម្លៃថេរគណិត តារាងផ្គូផ្គង និងអនុគមន៍តូចៗ ដើម្បីចំណេញល្បឿន និងអាចផ្ទៀងផ្ទាត់ពេល compile ដោយ static_assert។',
        },
        {
          id: 'scoped-enum-class',
          heading: 'Scoped Enums (enum class) មានសុវត្ថិភាពប្រភេទជាមួយ switch',
          body: [
            'enum បែបចាស់ពីភាសា C (enum Color { Red, Green };) បញ្ចេញឈ្មោះសមាជិកទៅវិសាលភាពខាងក្រៅ ហើយបម្លែងជាលេខគត់ដោយស្វ័យប្រវត្តិ។ នេះធ្វើឱ្យការបង្កើត enum ពីរដែលមានឈ្មោះ Red ដូចគ្នាបង្កកំហុសជាន់ឈ្មោះ និងអាចប្រៀបធៀបខុសប្រភេទដូចជា Color::Red == 0។',
            'C++11 ដោះស្រាយបញ្ហាទាំងពីរនេះដោយ enum class។ ឈ្មោះសមាជិកត្រូវនៅក្រោមឈ្មោះ enum ជានិច្ច (OrderStatus::Paid) មិនបម្លែងជា int ដោយស្វ័យប្រវត្តិ និងអាចកំណត់ប្រភេទផ្ទុកខាងក្នុងដូចជា : std::uint8_t។ ពេលប្រើ enum class ជាមួយ switch នោះ compiler នឹងព្រមានភ្លាម (ជាមួយ -Wswitch) បើអ្នកភ្លេចករណីណាមួយ។',
          ],
          points: [
            'សរសេរឈ្មោះ enum មុខសមាជិកជានិច្ច (OrderStatus::Shipped) ឬប្រើ C++20 using enum OrderStatus; ក្នុងប្លុក switch ខ្លី។',
            'កំណត់ប្រភេទផ្ទុកតូច (: std::uint8_t) នៅពេលផ្ទុកតម្លៃ enum រាប់ពាន់ក្នុង struct ឬកញ្ចប់ទិន្នន័យបណ្ដាញ។',
            'បើត្រូវការលេខគត់ពិតប្រាកដពី enum class សូមបម្លែងផ្ទាល់ដោយ static_cast<int>(status)។',
          ],
          exampleTitle: 'ការប្រើ switch យ៉ាងស្អាតជាមួយ enum class',
          warning:
            'កុំភ្លេចដាក់ break ឬ return ក្នុង case ដែលមានកូដ លើកលែងតែអ្នកចង់ឱ្យធ្លាក់ឆ្លងដោយចេតនា—ហើយបើមានចេតនា សូមសរសេរ [[fallthrough]]; ដើម្បីឱ្យ compiler និងមិត្តរួមក្រុមដឹងច្បាស់។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើត scoped enum class TrafficLight ដែលមាន Red, Yellow និង Green។ សរសេរអនុគមន៍ constexpr int seconds_for(TrafficLight light) ដោយប្រើ switch (Red = 45, Yellow = 5, Green = 35) ផ្ទៀងផ្ទាត់ seconds_for(TrafficLight::Yellow) == 5 ដោយ static_assert រួចបង្ហាញរយៈពេលទាំងបីក្នុង main()។',
        hint: 'ប្រកាស enum class TrafficLight { Red, Yellow, Green }; ដាក់ constexpr int លើ seconds_for ប្រើ return ក្នុង case នីមួយៗ រួចដាក់ static_assert(...) ក្នុង main()។',
      },
      quiz: [
        {
          question: 'តើ double ratio = 5 / 2; ផ្ទុកតម្លៃអ្វីក្នុង C++?',
          options: ['2.5', '2.0', '3.0', 'Compile មិនជាប់'],
          answer: 1,
          explanation:
            'ទាំង 5 និង 2 ជាលេខគត់ int ដូច្នេះ 5 / 2 ចែកលេខគត់មុនបាន 2 រួចទើបបម្លែងជា 2.0។ ត្រូវប្រើ static_cast<double>(5) / 2 ឬ 5.0 / 2 ដើម្បីបាន 2.5។',
        },
        {
          question: 'ហេតុអ្វី enum class ប្រសើរជាង enum បែបចាស់ក្នុង C++ ទំនើប?',
          options: [
            'តម្លៃ enum class បម្លែងជា std::string ដោយស្វ័យប្រវត្តិ។',
            'enum class ការពារការជាន់ឈ្មោះសមាជិក និងហាមការបម្លែងជា int ដោយស្វ័យប្រវត្តិ។',
            'enum class អនុញ្ញាតឱ្យ switch ផ្ទាល់លើ std::string។',
            'enum បែបចាស់ត្រូវបានលុបចោលក្នុង C++20។',
          ],
          answer: 1,
          explanation:
            'Scoped enums រក្សាឈ្មោះសមាជិកក្នុងវិសាលភាព enum (ដូចជា Role::Admin) ហើយតម្រូវឱ្យប្រើ static_cast ដើម្បីបម្លែងជាលេខគត់ ជួយការពារកំហុសប្រភេទទិន្នន័យ។',
        },
      ],
    },
  },

  // =========================================================================
  // 2. STRINGS, STRINGSTREAM & FILE STREAMS
  // =========================================================================
  {
    slug: 'cpp-strings-and-streams',
    level: 'beginner',
    insertAfter: 'cpp-modern-basics',
    en: {
      title: 'Strings, std::stringstream & File Streams',
      duration: '13 min',
      summary:
        'Process text efficiently with std::string and zero-copy std::string_view, parse structured lines with std::stringstream and std::getline, and read/write files safely using RAII file streams.',
      objectives: [
        'Search, slice, and inspect text with std::string methods while passing read-only strings cheaply via std::string_view.',
        'Parse delimited text and build formatted strings cleanly with std::istringstream, std::ostringstream, and std::getline.',
        'Read and write disk files safely with std::ifstream and std::ofstream without falling into the eof() loop bug.',
      ],
      sections: [
        {
          id: 'string-methods-and-string-view',
          heading: 'std::string Operations & Zero-Copy std::string_view',
          body: [
            'std::string manages a dynamic, growable character buffer automatically and gives you rich methods like .size(), .empty(), .find(), .substr(), .replace(), and C++20 .starts_with() / .ends_with(). When .find() fails to locate a substring, it returns the special sentinel constant std::string::npos, so always compare against npos rather than assuming -1.',
            'When a function only needs to inspect text without mutating or owning it, accept std::string_view (from <string_view>, C++17) by value instead of const std::string&. Passing a string literal like "hello" to const std::string& allocates a temporary std::string on the heap, whereas std::string_view simply wraps a pointer and length with zero heap allocations.',
          ],
          points: [
            'Check pos != std::string::npos before slicing with .substr(pos, len).',
            'Use std::string_view for read-only function parameters; it accepts std::string, string literals, and substrings without copying.',
            'C++20 adds .starts_with() and .ends_with() on both std::string and std::string_view for clear prefix/suffix checks.',
          ],
          table: {
            headers: ['API / Header', 'Purpose', 'Example'],
            rows: [
              [
                's.find(sub) (<string>)',
                'Locate substring or return npos',
                'auto pos = email.find("@");',
              ],
              ['s.substr(pos, len)', 'Extract a new std::string slice', 'email.substr(0, pos)'],
              ['s.starts_with(pre)', 'Check prefix (C++20)', 'url.starts_with("https://")'],
              [
                'std::string_view (<string_view>)',
                'Non-owning zero-copy view',
                'void log(std::string_view msg);',
              ],
              [
                'std::istringstream (<sstream>)',
                'Parse text as an input stream',
                "std::getline(iss, token, ',')",
              ],
              [
                'std::ostringstream (<sstream>)',
                'Build formatted string in memory',
                'oss << name << ": " << score;',
              ],
              [
                'std::ifstream / std::ofstream (<fstream>)',
                'RAII file input / output streams',
                'std::ifstream in{"data.txt"};',
              ],
            ],
          },
          example: {
            title: 'Inspecting Text with std::string_view & .substr()',
            language: 'cpp',
            code: `#include <iostream>
#include <string>
#include <string_view>

void inspect_email(std::string_view email) {
    auto at_pos = email.find('@');
    if (at_pos == std::string_view::npos) {
        std::cout << "Invalid email: " << email << "\\n";
        return;
    }
    std::string_view user = email.substr(0, at_pos);
    std::string_view domain = email.substr(at_pos + 1);
    std::cout << "User: " << user << " | Domain: " << domain << "\\n";
}

int main() {
    std::string account{"dara.sok@codehub.dev"};
    inspect_email(account);
    inspect_email("support@khmertech.org"); // No heap allocation!
    std::cout << "Dev domain? " << std::boolalpha
              << account.ends_with(".dev") << "\\n";
    return 0;
}`,
            output: `User: dara.sok | Domain: codehub.dev
User: support | Domain: khmertech.org
Dev domain? true`,
          },
          warning:
            'std::string_view does NOT own its characters! Never return a std::string_view pointing to a local std::string created inside a function—once the local string is destroyed, the view becomes a dangling pointer.',
        },
        {
          id: 'getline-and-stringstream',
          heading: 'Parsing Lines with std::getline & std::stringstream',
          body: [
            'The extraction operator (>>) stops at the first whitespace character, making it great for reading numbers or single words but unsuitable for full names or CSV rows. std::getline(stream, line) reads an entire line up to a newline—or up to any custom delimiter character you pass as the third argument, such as a comma.',
            'Combining std::getline with <sstream> unlocks lightweight in-memory parsing and formatting. std::istringstream turns any std::string into a stream you can split and convert into numbers with >> or std::stoi / std::stod, while std::ostringstream lets you compose formatted output using the exact same << manipulators you use with std::cout.',
          ],
          points: [
            'If you read with >> before calling std::getline on the same stream, consume the leftover newline with std::ws (std::getline(in >> std::ws, line)).',
            "Pass a custom delimiter to std::getline(iss, field, ',') to split CSV records cleanly.",
            'Check stream conversion success with if (iss >> value) instead of assuming input was valid.',
          ],
          example: {
            title: 'Splitting a CSV Record & Formatting with <sstream>',
            language: 'cpp',
            code: `#include <iomanip>
#include <iostream>
#include <sstream>
#include <string>

int main() {
    std::string csv_row{"Mechanical Keyboard,4,49.50"};
    std::istringstream iss{csv_row};

    std::string product;
    std::string qty_str;
    std::string price_str;

    std::getline(iss, product, ',');
    std::getline(iss, qty_str, ',');
    std::getline(iss, price_str, ',');

    int qty = std::stoi(qty_str);
    double price = std::stod(price_str);

    std::ostringstream report;
    report << std::fixed << std::setprecision(2)
           << product << " (" << qty << " pcs) = $" << (qty * price);

    std::cout << report.str() << "\\n";
    return 0;
}`,
            output: `Mechanical Keyboard (4 pcs) = $198.00`,
          },
          tip: 'Prefer std::istringstream when only reading and std::ostringstream when only writing—choosing the narrower type communicates intent clearly and avoids accidental misuse.',
        },
        {
          id: 'file-streams-raii',
          heading: 'RAII File Input & Output with std::ifstream and std::ofstream',
          body: [
            'The <fstream> header provides std::ofstream for writing files and std::ifstream for reading files. Because both classes follow RAII (Resource Acquisition Is Initialization), opening a file happens in the constructor and closing/flushing happens automatically in the destructor when the stream object goes out of scope—even if an early return or exception occurs.',
            'Always check whether a file opened successfully right after constructing the stream (if (!out) { ... }). By default, std::ofstream truncates an existing file; pass std::ios::app as the second argument when you want to append log entries instead of overwriting prior content.',
          ],
          points: [
            'Use std::ofstream out{"notes.txt", std::ios::app}; to append to the end of an existing file.',
            'Drive reading loops with the extraction itself: while (std::getline(in, line)) stops cleanly on EOF or read error.',
            'You rarely need to call .close() manually—rely on RAII scopes (like { std::ofstream out{...}; ... }) so files close reliably.',
          ],
          example: {
            title: 'Writing and Reading Back a Text File with RAII Scopes',
            language: 'cpp',
            code: `#include <fstream>
#include <iostream>
#include <string>

int main() {
    const std::string path{"session.log"};

    // 1. Write lines inside a tight scope so the file flushes & closes immediately
    {
        std::ofstream out{path};
        if (!out) {
            std::cerr << "Failed to open " << path << " for writing\\n";
            return 1;
        }
        out << "INFO: Server booted\\n";
        out << "WARN: High memory usage\\n";
    }

    // 2. Read lines back safely using while (std::getline(...))
    std::ifstream in{path};
    if (!in) {
        std::cerr << "Failed to open " << path << " for reading\\n";
        return 1;
    }

    std::string line;
    int line_no{0};
    while (std::getline(in, line)) {
        std::cout << ++line_no << ": " << line << "\\n";
    }
    return 0;
}`,
            output: `1: INFO: Server booted
2: WARN: High memory usage`,
          },
          warning:
            'Never write while (!in.eof()) to read a file! The EOF flag is only set AFTER a read attempt fails, so !in.eof() processes the last line twice or reads garbage. Always write while (std::getline(in, line)) or while (in >> value).',
        },
      ],
      challenge: {
        prompt:
          'Given the CSV string "Sovann,92,88,95", use std::istringstream and std::getline(..., \',\') to extract the student name and three integer scores, compute the average as a double, and build the formatted output "Sovann -> avg: 91.67" with std::ostringstream.',
        hint: "Read the name first with std::getline(iss, name, ','), then loop while (std::getline(iss, token, ',')) to sum std::stoi(token) and count the scores. Format with std::fixed << std::setprecision(2).",
        language: 'cpp',
        solutionCode: `#include <iomanip>
#include <iostream>
#include <sstream>
#include <string>

int main() {
    std::string record{"Sovann,92,88,95"};
    std::istringstream iss{record};

    std::string name;
    std::getline(iss, name, ',');

    std::string token;
    int sum{0};
    int count{0};
    while (std::getline(iss, token, ',')) {
        sum += std::stoi(token);
        ++count;
    }

    double avg = count > 0 ? static_cast<double>(sum) / count : 0.0;
    std::ostringstream oss;
    oss << std::fixed << std::setprecision(2)
        << name << " -> avg: " << avg;

    std::cout << oss.str() << "\\n";
    return 0;
}`,
      },
      quiz: [
        {
          question: 'Why is while (!in.eof()) considered a bug when reading from std::ifstream?',
          options: [
            'std::ifstream does not have an eof() member function.',
            'eof() only becomes true after a read fails, causing an extra iteration with stale or invalid data.',
            'eof() automatically deletes the file once reached.',
            'eof() stops before reading the very last line of the file.',
          ],
          answer: 1,
          explanation:
            'The EOF bit is set only when an extraction hits the end of the file and fails. Testing the read itself—such as while (std::getline(in, line))—exits immediately on EOF or any stream error.',
        },
        {
          question:
            'What is the main advantage of taking std::string_view instead of const std::string& for a read-only parameter?',
          options: [
            'std::string_view lets you mutate the caller’s characters directly.',
            'std::string_view avoids allocating a temporary std::string on the heap when passed a string literal or substring.',
            'std::string_view automatically owns and frees the memory when destroyed.',
            'std::string_view automatically converts strings to UTF-32.',
          ],
          answer: 1,
          explanation:
            'std::string_view is just a lightweight (pointer, length) pair. Passing "hello" or a slice creates zero heap allocations, whereas const std::string& must construct a temporary std::string from a C-string literal.',
        },
      ],
    },
    km: {
      title: 'អត្ថបទ std::string, std::stringstream និង File Streams',
      duration: '13 នាទី',
      summary:
        'ដំណើរការអត្ថបទប្រកបដោយប្រសិទ្ធភាពជាមួយ std::string និង std::string_view មិនចម្លងទិន្នន័យ បំបែកបន្ទាត់ដោយ std::stringstream និង std::getline ព្រមទាំងអាន/សរសេរឯកសារដោយសុវត្ថិភាពជាមួយ RAII file streams។',
      objectives: [
        'ស្វែងរក កាត់ និងពិនិត្យអត្ថបទដោយវិធីសាស្ត្រ std::string ព្រមទាំងបញ្ជូនអត្ថបទសម្រាប់អានដោយ std::string_view។',
        'បំបែកអត្ថបទមានសញ្ញាខណ្ឌ និងរៀបចំទម្រង់អត្ថបទដោយ std::istringstream, std::ostringstream និង std::getline។',
        'អាន និងសរសេរឯកសារដោយសុវត្ថិភាពជាមួយ std::ifstream និង std::ofstream ដោយជៀសវាងកំហុសរង្វិលជុំ eof()។',
      ],
      sections: [
        {
          id: 'string-methods-and-string-view',
          heading: 'ប្រតិបត្តិការ std::string និង std::string_view មិនចម្លងទិន្នន័យ',
          body: [
            'std::string គ្រប់គ្រងអង្គចងចាំអត្ថបទដោយស្វ័យប្រវត្តិ ហើយផ្ដល់វិធីសាស្ត្រសម្បូរបែបដូចជា .size(), .empty(), .find(), .substr(), .replace() និង .starts_with() / .ends_with() ក្នុង C++20។ ពេល .find() រកមិនឃើញ វាត្រឡប់ std::string::npos ដូច្នេះត្រូវប្រៀបធៀបជាមួយ npos ជានិច្ច។',
            'នៅពេលអនុគមន៍គ្រាន់តែអានអត្ថបទដោយមិនកែប្រែ សូមទទួលប៉ារ៉ាម៉ែត្រជា std::string_view (ពី <string_view>, C++17) ជំនួសឱ្យ const std::string&។ ការបញ្ជូនអត្ថបទថេរ "hello" ទៅ const std::string& ត្រូវបង្កើត std::string បណ្ដោះអាសន្នលើ heap តែ std::string_view គ្រាន់តែកាន់ pointer និងប្រវែងដោយមិនប្រើ heap ឡើយ។',
          ],
          points: [
            'ផ្ទៀងផ្ទាត់ pos != std::string::npos មុននឹងកាត់អត្ថបទដោយ .substr(pos, len)។',
            'ប្រើ std::string_view សម្រាប់ប៉ារ៉ាម៉ែត្រអានតែប៉ុណ្ណោះ ព្រោះវាទទួលទាំង std::string និង string literal ដោយគ្មានការចម្លង។',
            'C++20 បន្ថែម .starts_with() និង .ends_with() សម្រាប់ពិនិត្យបុព្វបទ និងបច្ច័យបទយ៉ាងងាយ។',
          ],
          table: {
            headers: ['API / Header', 'គោលបំណង', 'ឧទាហរណ៍'],
            rows: [
              [
                's.find(sub) (<string>)',
                'ស្វែងរកអត្ថបទរង ឬត្រឡប់ npos',
                'auto pos = email.find("@");',
              ],
              ['s.substr(pos, len)', 'កាត់យក std::string ថ្មី', 'email.substr(0, pos)'],
              [
                's.starts_with(pre)',
                'ពិនិត្យពាក្យចាប់ផ្ដើម (C++20)',
                'url.starts_with("https://")',
              ],
              [
                'std::string_view (<string_view>)',
                'មើលអត្ថបទមិនចម្លងទិន្នន័យ',
                'void log(std::string_view msg);',
              ],
              [
                'std::istringstream (<sstream>)',
                'បំបែកអត្ថបទជា input stream',
                "std::getline(iss, token, ',')",
              ],
              [
                'std::ostringstream (<sstream>)',
                'ផ្គុំអត្ថបទមានទម្រង់ក្នុងអង្គចងចាំ',
                'oss << name << ": " << score;',
              ],
              [
                'std::ifstream / std::ofstream (<fstream>)',
                'អាន / សរសេរឯកសារបែប RAII',
                'std::ifstream in{"data.txt"};',
              ],
            ],
          },
          exampleTitle: 'ការពិនិត្យអត្ថបទជាមួយ std::string_view និង .substr()',
          warning:
            'std::string_view មិនមែនជាម្ចាស់អង្គចងចាំទេ! កុំត្រឡប់ std::string_view ដែលចង្អុលទៅ std::string ក្នុងអនុគមន៍ ព្រោះពេលអថេរក្នុងអនុគមន៍រលាយ view នោះនឹងក្លាយជា dangling pointer។',
        },
        {
          id: 'getline-and-stringstream',
          heading: 'ការបំបែកបន្ទាត់ដោយ std::getline និង std::stringstream',
          body: [
            "សញ្ញា >> ឈប់ត្រឹមចន្លោះដកឃ្លាដំបូង ដូច្នេះវាពិបាកអានឈ្មោះពេញ ឬជួរ CSV។ ចំណែក std::getline(stream, line) អានមួយបន្ទាត់ពេញ ឬអានរហូតដល់តួអក្សរខណ្ឌដែលអ្នកកំណត់ជាប៉ារ៉ាម៉ែត្រទីបី ដូចជាសញ្ញាក្បៀស (',')។",
            'ការផ្សំ std::getline ជាមួយ <sstream> ជួយបំបែក និងរៀបចំអត្ថបទក្នុងអង្គចងចាំយ៉ាងងាយ។ std::istringstream បម្លែង std::string ទៅជា stream ដើម្បីអាន និងបម្លែងជាលេខ ខណៈ std::ostringstream ជួយផ្គុំអត្ថបទដោយប្រើ << និង manipulators ដូច std::cout ដែរ។',
          ],
          points: [
            'បើប្រើ >> មុនហៅ std::getline លើ stream ដូចគ្នា សូមសម្អាត newline សល់ដោយ std::ws (std::getline(in >> std::ws, line))។',
            "បញ្ជូនសញ្ញាខណ្ឌផ្ទាល់ខ្លួនទៅ std::getline(iss, field, ',') ដើម្បីបំបែកជួរ CSV យ៉ាងស្អាត។",
            'ពិនិត្យភាពជោគជ័យនៃការអានដោយ if (iss >> value) ជំនួសឱ្យការស្មានថាទិន្នន័យតែងត្រឹមត្រូវ។',
          ],
          exampleTitle: 'ការបំបែកជួរ CSV និងរៀបចំទម្រង់ដោយ <sstream>',
          tip: 'គួរប្រើ std::istringstream ពេលគ្រាន់តែអាន និង std::ostringstream ពេលគ្រាន់តែសរសេរ ដើម្បីឱ្យគោលបំណងកូដច្បាស់លាស់។',
        },
        {
          id: 'file-streams-raii',
          heading: 'ការអាន និងសរសេរឯកសារបែប RAII ជាមួយ std::ifstream និង std::ofstream',
          body: [
            'Header <fstream> ផ្ដល់ std::ofstream សម្រាប់សរសេរឯកសារ និង std::ifstream សម្រាប់អានឯកសារ។ ដោយសារថ្នាក់ទាំងពីរប្រើគោលការណ៍ RAII ឯកសារត្រូវបានបើកក្នុង constructor ហើយបិទ និង flush ដោយស្វ័យប្រវត្តិក្នុង destructor ពេលចាកចេញពី scope ទោះមាន return មុន ឬ exception ក៏ដោយ។',
            'ត្រូវផ្ទៀងផ្ទាត់ថាឯកសារបើកបានជោគជ័យភ្លាមក្រោយបង្កើត stream (if (!out) { ... })។ ជាលំនាំដើម std::ofstream លុបទិន្នន័យចាស់ចោល តែអ្នកអាចបញ្ជូន std::ios::app ជាប៉ារ៉ាម៉ែត្រទីពីរដើម្បីសរសេរបន្ថែមខាងក្រោយ។',
          ],
          points: [
            'ប្រើ std::ofstream out{"notes.txt", std::ios::app}; ដើម្បីសរសេរបន្ថែមនៅចុងឯកសារ។',
            'បញ្ជាក់លក្ខខណ្ឌរង្វិលជុំអានដោយប្រតិបត្តិការអានផ្ទាល់៖ while (std::getline(in, line)) ឈប់យ៉ាងស្អាតពេលដល់ EOF ឬមានកំហុស។',
            'កម្រចាំបាច់ហៅ .close() ដោយដៃណាស់—ប្រើប្លុក scope RAII ដើម្បីឱ្យឯកសារបិទដោយសុវត្ថិភាព។',
          ],
          exampleTitle: 'ការសរសេរ និងអានឯកសារត្រឡប់មកវិញដោយ RAII Scopes',
          warning:
            'កុំសរសេរ while (!in.eof()) ដើម្បីអានឯកសារ! ទង់ EOF ក្លាយជា true លុះត្រាតែការអានបរាជ័យរួចហើយ ដែលធ្វើឱ្យបន្ទាត់ចុងក្រោយរត់ពីរដង។ សូមប្រើ while (std::getline(in, line)) ជានិច្ច។',
        },
      ],
      challenge: {
        prompt:
          'ដោយមានអត្ថបទ CSV "Sovann,92,88,95" សូមប្រើ std::istringstream និង std::getline(..., \',\') ដើម្បីទាញឈ្មោះសិស្ស និងពិន្ទុលេខគត់ទាំងបី គណនាមធ្យមភាគជា double រួចរៀបចំអត្ថបទ "Sovann -> avg: 91.67" ដោយ std::ostringstream។',
        hint: "អានឈ្មោះមុនដោយ std::getline(iss, name, ',') រួចប្រើ while (std::getline(iss, token, ',')) បូកសរុប std::stoi(token) និងរាប់ចំនួនពិន្ទុ ហើយកំណត់ទម្រង់ដោយ std::fixed << std::setprecision(2)។",
      },
      quiz: [
        {
          question: 'ហេតុអ្វី while (!in.eof()) ត្រូវបានចាត់ទុកជាកំហុសពេលអាន std::ifstream?',
          options: [
            'std::ifstream មិនមានអនុគមន៍ eof() ទេ។',
            'eof() ក្លាយជា true លុះត្រាតែការអានបរាជ័យរួចហើយ ធ្វើឱ្យរង្វិលជុំរត់លើសមួយជុំជាមួយទិន្នន័យចាស់ ឬមិនត្រឹមត្រូវ។',
            'eof() លុបឯកសារចោលដោយស្វ័យប្រវត្តិ។',
            'eof() ឈប់មុនពេលអានបន្ទាត់ចុងក្រោយ។',
          ],
          answer: 1,
          explanation:
            'ទង់ EOF ត្រូវបានកំណត់លុះត្រាតែការអានប៉ះចុងឯកសារហើយបរាជ័យ។ ការពិនិត្យលទ្ធផលអានផ្ទាល់ដូចជា while (std::getline(in, line)) ឈប់ភ្លាមៗពេលដល់ EOF ឬមានកំហុស។',
        },
        {
          question:
            'តើអ្វីជាអត្ថប្រយោជន៍ចម្បងនៃការប្រើ std::string_view ជំនួស const std::string& សម្រាប់ប៉ារ៉ាម៉ែត្រអានតែប៉ុណ្ណោះ?',
          options: [
            'std::string_view អាចកែតួអក្សរដើមរបស់អ្នកហៅផ្ទាល់។',
            'std::string_view ជៀសវាងការបង្កើត std::string បណ្ដោះអាសន្នលើ heap ពេលបញ្ជូន string literal ឬ substring។',
            'std::string_view កាន់កាប់ និងលុបអង្គចងចាំដោយស្វ័យប្រវត្តិ។',
            'std::string_view បម្លែងអត្ថបទទៅ UTF-32 ដោយស្វ័យប្រវត្តិ។',
          ],
          answer: 1,
          explanation:
            'std::string_view គ្រាន់តែជាគូ (pointer, length) ស្រាលប៉ុណ្ណោះ។ ការបញ្ជូន "hello" មិនបង្កើតការបែងចែក heap ទេ ខណៈ const std::string& ត្រូវបង្កើត std::string បណ្ដោះអាសន្ន។',
        },
      ],
    },
  },

  // =========================================================================
  // 3. SETS, STACKS, QUEUES & PRIORITY QUEUES
  // =========================================================================
  {
    slug: 'cpp-sets-queues-stacks',
    level: 'intermediate',
    insertAfter: 'stl-vectors-and-maps',
    en: {
      title: 'Sets, Stacks, Queues & Priority Queues',
      duration: '14 min',
      summary:
        'Pick the right STL data structure for uniqueness, LIFO/FIFO workflows, and heap scheduling using std::set, std::unordered_set, std::stack, std::queue, and std::priority_queue.',
      objectives: [
        'Choose between ordered std::set (O(log n)) and hash-based std::unordered_set (average O(1)) for deduplication and membership checks.',
        'Model LIFO and FIFO workflows cleanly with std::stack and std::queue while guarding against empty-container undefined behavior.',
        'Build max-heaps, min-heaps, and custom-priority schedulers with std::priority_queue.',
      ],
      sections: [
        {
          id: 'ordered-and-unordered-sets',
          heading: 'Unique Collections with std::set & std::unordered_set',
          body: [
            'Whenever you need to track unique items and answer fast membership queries ("have we seen this ID before?"), the STL gives you two set containers. std::set (<set>) stores elements in a balanced binary search tree (red-black tree), keeping them automatically sorted in ascending order with O(log n) lookup, insertion, and deletion.',
            'std::unordered_set (<unordered_set>) stores elements in a hash table, trading sorted order for O(1) average lookup and insertion. In C++20, both containers support .contains(key), making membership tests far cleaner than the older .find(key) != .end() idiom.',
          ],
          points: [
            'Inserting a duplicate into a set is a safe no-op; .insert(x) returns a {iterator, bool inserted} pair.',
            'Use std::set when you need sorted iteration or range queries (.lower_bound() / .upper_bound()).',
            'Use std::unordered_set for fast deduplication and visited-node tracking when ordering does not matter.',
          ],
          table: {
            headers: [
              'Container',
              'Underlying Structure',
              'Ordering',
              'Key Operations & Complexity',
            ],
            rows: [
              [
                'std::set<T>',
                'Red-black tree',
                'Sorted ascending',
                'insert / erase / contains: O(log n)',
              ],
              [
                'std::unordered_set<T>',
                'Hash table',
                'Unordered',
                'insert / erase / contains: O(1) avg',
              ],
              [
                'std::stack<T>',
                'Adapter (std::deque)',
                'LIFO (last in, first out)',
                'push / pop / top: O(1)',
              ],
              [
                'std::queue<T>',
                'Adapter (std::deque)',
                'FIFO (first in, first out)',
                'push / pop / front: O(1)',
              ],
              [
                'std::priority_queue<T>',
                'Binary heap (std::vector)',
                'Highest priority on top',
                'push / pop: O(log n), top: O(1)',
              ],
            ],
          },
          example: {
            title: 'Deduplicating Tags with std::set & Fast Lookup with std::unordered_set',
            language: 'cpp',
            code: `#include <iostream>
#include <set>
#include <string>
#include <unordered_set>
#include <vector>

int main() {
    std::vector<std::string> raw_tags{"cpp", "stl", "cpp", "ranges", "stl"};

    // Sorted unique tags
    std::set<std::string> sorted_tags(raw_tags.begin(), raw_tags.end());
    std::cout << "Sorted unique:";
    for (const auto& tag : sorted_tags) {
        std::cout << ' ' << tag;
    }
    std::cout << "\\n";

    // O(1) average membership check (C++20 .contains)
    std::unordered_set<int> visited{101, 204, 309};
    auto [it, added] = visited.insert(204);
    std::cout << "Inserted 204 again? " << std::boolalpha << added << "\\n";
    std::cout << "Has 309? " << visited.contains(309) << "\\n";
    return 0;
}`,
            output: `Sorted unique: cpp ranges stl
Inserted 204 again? false
Has 309? true`,
          },
          tip: 'C++20 .contains(key) works on std::set, std::unordered_set, std::map, and std::unordered_map—use it whenever you only need a yes/no existence check.',
        },
        {
          id: 'stack-and-queue-adapters',
          heading: 'Container Adapters: std::stack (LIFO) & std::queue (FIFO)',
          body: [
            'std::stack (<stack>) and std::queue (<queue>) are container adapters: instead of implementing memory management from scratch, they wrap an underlying container (std::deque by default) and intentionally restrict its interface so you can only access elements in Last-In-First-Out (LIFO) or First-In-First-Out (FIFO) order.',
            'Notice a distinctive C++ design decision: .pop() removes the top/front element and returns void—it does NOT return the removed value. You read .top() (on a stack) or .front() (on a queue) first, then call .pop(). The C++ committee split these operations to guarantee strong exception safety if copying the returned object throws.',
          ],
          points: [
            'std::stack shines for undo/redo histories, DFS traversal, and matching nested brackets or tags.',
            'std::queue shines for Breadth-First Search (BFS), print/job queues, and producer-consumer buffers.',
            'Use .emplace(args...) to construct elements directly inside the adapter without extra copies.',
          ],
          example: {
            title: 'Undo Stack & Job Processing Queue',
            language: 'cpp',
            code: `#include <iostream>
#include <queue>
#include <stack>
#include <string>

int main() {
    std::stack<std::string> history;
    history.push("Type title");
    history.push("Insert image");
    history.push("Bold text");

    std::cout << "Undo: " << history.top() << "\\n";
    history.pop();
    std::cout << "Now on top: " << history.top() << "\\n";

    std::queue<std::string> jobs;
    jobs.push("render-video");
    jobs.push("send-email");

    while (!jobs.empty()) {
        std::cout << "Running job: " << jobs.front() << "\\n";
        jobs.pop();
    }
    return 0;
}`,
            output: `Undo: Bold text
Now on top: Insert image
Running job: render-video
Running job: send-email`,
          },
          warning:
            'Calling .top(), .front(), or .pop() on an empty std::stack, std::queue, or std::priority_queue is Undefined Behavior—it will NOT throw an exception. Always check if (!container.empty()) first.',
        },
        {
          id: 'priority-queue-heaps',
          heading: 'Heaps & Scheduling with std::priority_queue',
          body: [
            'std::priority_queue (<queue>) maintains a binary heap on top of a std::vector, giving you O(1) access to the highest-priority element via .top() and O(log n) insertion and removal. By default, it is a max-heap using std::less<T>, so the largest element sits on top.',
            'To create a min-heap (smallest element on top, ideal for Dijkstra shortest paths or earliest-deadline scheduling), pass three template arguments: std::priority_queue<T, std::vector<T>, std::greater<T>>. For custom structs, supply a comparator functor whose operator()(const Task& a, const Task& b) returns true when a has LOWER priority than b.',
          ],
          points: [
            'Default std::priority_queue<int> is a max-heap (largest value first).',
            'Min-heap syntax: std::priority_queue<int, std::vector<int>, std::greater<int>>.',
            'You cannot iterate directly over a std::priority_queue—pop elements in priority order to drain it.',
          ],
          example: {
            title: 'Min-Heap & Custom Task Priority Scheduler',
            language: 'cpp',
            code: `#include <functional>
#include <iostream>
#include <queue>
#include <string>
#include <vector>

struct Task {
    int urgency; // Higher number = higher urgency
    std::string title;
};

struct CompareTask {
    bool operator()(const Task& a, const Task& b) const {
        return a.urgency < b.urgency; // true => a sits BELOW b
    }
};

int main() {
    std::priority_queue<int, std::vector<int>, std::greater<int>> min_heap;
    for (int ms : {42, 15, 88, 7}) min_heap.push(ms);
    std::cout << "Fastest latency: " << min_heap.top() << "ms\\n";

    std::priority_queue<Task, std::vector<Task>, CompareTask> scheduler;
    scheduler.push({2, "Clean cache"});
    scheduler.push({9, "Fix payment outage"});
    scheduler.push({5, "Rotate API key"});

    while (!scheduler.empty()) {
        std::cout << "[P" << scheduler.top().urgency << "] "
                  << scheduler.top().title << "\\n";
        scheduler.pop();
    }
    return 0;
}`,
            output: `Fastest latency: 7ms
[P9] Fix payment outage
[P5] Rotate API key
[P2] Clean cache`,
          },
          tip: 'Remember the priority_queue comparator rule: think of comp(a, b) as "does a come BEFORE b in priority order, meaning b should be popped first?"—returning a.priority < b.priority puts larger priorities on top.',
        },
      ],
      challenge: {
        prompt:
          'Write a function bool is_balanced(std::string_view expr) using std::stack<char> that verifies whether (), [], and {} brackets are properly matched and nested. Test "(a + [b * {c}])" and "([)]" in main().',
        hint: 'Push opening brackets onto the stack. On a closing bracket, return false if the stack is empty or stack.top() is not the matching opener, then call stack.pop(). At the end, return stack.empty().',
        language: 'cpp',
        solutionCode: `#include <iostream>
#include <stack>
#include <string_view>

bool is_balanced(std::string_view expr) {
    std::stack<char> st;
    for (char ch : expr) {
        if (ch == '(' || ch == '[' || ch == '{') {
            st.push(ch);
        } else if (ch == ')' || ch == ']' || ch == '}') {
            if (st.empty()) return false;
            char open = st.top();
            if ((ch == ')' && open != '(') ||
                (ch == ']' && open != '[') ||
                (ch == '}' && open != '{')) {
                return false;
            }
            st.pop();
        }
    }
    return st.empty();
}

int main() {
    std::cout << std::boolalpha;
    std::cout << is_balanced("(a + [b * {c}])") << "\\n"; // true
    std::cout << is_balanced("([)]") << "\\n";            // false
    return 0;
}`,
      },
      quiz: [
        {
          question:
            'Why does std::stack<T>::pop() return void instead of returning the popped element?',
          options: [
            'C++ templates cannot return values of type T.',
            'Separating .top() from .pop() provides strong exception safety in case copying the returned T throws.',
            'std::stack only supports integer types.',
            'pop() deletes the entire stack at once.',
          ],
          answer: 1,
          explanation:
            'If pop() removed the element and then threw an exception while copying the return value, that element would be permanently lost. Reading .top() first and calling .pop() afterward avoids that loss.',
        },
        {
          question:
            'How do you declare a min-heap of ints (smallest element on top) using std::priority_queue?',
          options: [
            'std::priority_queue<int> pq;',
            'std::priority_queue<int, std::greater<int>> pq;',
            'std::priority_queue<int, std::vector<int>, std::greater<int>> pq;',
            'std::min_priority_queue<int> pq;',
          ],
          answer: 2,
          explanation:
            'std::priority_queue takes three template parameters: ValueType, Container (default std::vector<T>), and Compare (default std::less<T>). To supply std::greater<int>, you must specify the container argument too.',
        },
      ],
    },
    km: {
      title: 'Sets, Stacks, Queues និង Priority Queues',
      duration: '14 នាទី',
      summary:
        'ជ្រើសរើសរចនាសម្ព័ន្ធទិន្នន័យ STL ឱ្យត្រូវនឹងការងារសម្រាប់ធាតុគ្មានស្ទួន លំហូរ LIFO/FIFO និងការរៀបកាលវិភាគអាទិភាព ដោយប្រើ std::set, std::unordered_set, std::stack, std::queue និង std::priority_queue។',
      objectives: [
        'ជ្រើសរើសរវាង std::set (តម្រៀប O(log n)) និង std::unordered_set (Hash O(1) ជាមធ្យម) សម្រាប់លុបធាតុស្ទួន និងស្វែងរករហ័ស។',
        'សាងសង់លំហូរ LIFO និង FIFO យ៉ាងស្អាតជាមួយ std::stack និង std::queue ដោយការពារកំហុស Undefined Behavior ពេលទទេ។',
        'បង្កើត max-heap, min-heap និងប្រព័ន្ធរៀបអាទិភាពផ្ទាល់ខ្លួនដោយ std::priority_queue។',
      ],
      sections: [
        {
          id: 'ordered-and-unordered-sets',
          heading: 'បណ្ដុំធាតុគ្មានស្ទួនជាមួយ std::set និង std::unordered_set',
          body: [
            'នៅពេលអ្នកត្រូវការផ្ទុកធាតុមិនស្ទួន និងពិនិត្យវត្តមានធាតុរហ័ស STL ផ្ដល់ជម្រើសពីរ។ std::set (<set>) ផ្ទុកធាតុក្នុងដើមឈើស្វែងរកមានតុល្យភាព (red-black tree) ដែលតម្រៀបតាមលំដាប់កើនដោយស្វ័យប្រវត្តិ ជាមួយល្បឿន O(log n) សម្រាប់ស្វែងរក បញ្ចូល និងលុប។',
            'ចំណែក std::unordered_set (<unordered_set>) ប្រើតារាង hash ដែលមិនរក្សាលំដាប់ តែផ្ដល់ល្បឿន O(1) ជាមធ្យម។ ក្នុង C++20 ទាំងពីរគាំទ្រ .contains(key) ដែលធ្វើឱ្យការពិនិត្យវត្តមានងាយអានជាង .find(key) != .end()។',
          ],
          points: [
            'ការបញ្ចូលធាតុស្ទួនទៅក្នុង set មិនបង្កកំហុសទេ ហើយ .insert(x) ត្រឡប់គូ {iterator, bool inserted}។',
            'ប្រើ std::set ពេលត្រូវការលំដាប់តម្រៀប ឬការស្វែងរកតាមជួរ (.lower_bound() / .upper_bound())។',
            'ប្រើ std::unordered_set សម្រាប់លុបធាតុស្ទួន និងតាមដាន node ដែលបានឆ្លងកាត់នៅពេលមិនត្រូវការលំដាប់។',
          ],
          table: {
            headers: [
              'Container',
              'រចនាសម្ព័ន្ធខាងក្នុង',
              'លំដាប់',
              'ប្រតិបត្តិការសំខាន់ និងល្បឿន',
            ],
            rows: [
              [
                'std::set<T>',
                'Red-black tree',
                'តម្រៀបពីតូចទៅធំ',
                'insert / erase / contains: O(log n)',
              ],
              [
                'std::unordered_set<T>',
                'តារាង Hash',
                'គ្មានលំដាប់',
                'insert / erase / contains: O(1) មធ្យម',
              ],
              [
                'std::stack<T>',
                'Adapter (std::deque)',
                'LIFO (ចូលក្រោយ ចេញមុន)',
                'push / pop / top: O(1)',
              ],
              [
                'std::queue<T>',
                'Adapter (std::deque)',
                'FIFO (ចូលមុន ចេញមុន)',
                'push / pop / front: O(1)',
              ],
              [
                'std::priority_queue<T>',
                'Binary heap (std::vector)',
                'អាទិភាពខ្ពស់បំផុតនៅលើ',
                'push / pop: O(log n), top: O(1)',
              ],
            ],
          },
          exampleTitle: 'លុប Tag ស្ទួនដោយ std::set និងពិនិត្យរហ័សដោយ std::unordered_set',
          tip: 'វិធីសាស្ត្រ .contains(key) ក្នុង C++20 ដំណើរការលើ std::set, std::unordered_set, std::map និង std::unordered_map—សូមប្រើវាពេលគ្រាន់តែចង់ដឹងថាមាន ឬអត់។',
        },
        {
          id: 'stack-and-queue-adapters',
          heading: 'Container Adapters៖ std::stack (LIFO) និង std::queue (FIFO)',
          body: [
            'std::stack (<stack>) និង std::queue (<queue>) គឺជា container adapters ដែលរុំ container ខាងក្នុង (std::deque ជាលំនាំដើម) ហើយកំណត់ចំណុចប្រទាក់ឱ្យចូលប្រើបានតែតាមលំដាប់ LIFO (ចូលក្រោយ ចេញមុន) ឬ FIFO (ចូលមុន ចេញមុន)។',
            'ចំណុចពិសេសក្នុង C++ គឺ .pop() លុបធាតុហើយត្រឡប់ void មិនត្រឡប់តម្លៃធាតុទេ។ អ្នកត្រូវអាន .top() (លើ stack) ឬ .front() (លើ queue) មុន រួចទើបហៅ .pop() ដើម្បីធានាសុវត្ថិភាព exception បើការចម្លងតម្លៃត្រឡប់បង្កកំហុស។',
          ],
          points: [
            'std::stack ស័ក្ដិសមសម្រាប់ប្រវត្តិ Undo/Redo ការរុករក DFS និងការផ្ទៀងផ្ទាត់វង់ក្រចក។',
            'std::queue ស័ក្ដិសមសម្រាប់ Breadth-First Search (BFS) និងជួររង់ចាំដំណើរការការងារ។',
            'ប្រើ .emplace(args...) ដើម្បីបង្កើតធាតុផ្ទាល់ខាងក្នុងដោយមិនចាំបាច់ចម្លងបន្ថែម។',
          ],
          exampleTitle: 'Undo Stack និងជួរដំណើរការការងារ Queue',
          warning:
            'ការហៅ .top(), .front() ឬ .pop() លើ std::stack, std::queue ឬ std::priority_queue ដែលទទេ គឺជា Undefined Behavior (វាមិនបោះ exception ទេ)។ ត្រូវពិនិត្យ if (!container.empty()) មុនជានិច្ច។',
        },
        {
          id: 'priority-queue-heaps',
          heading: 'Heaps និងការរៀបអាទិភាពដោយ std::priority_queue',
          body: [
            'std::priority_queue (<queue>) រក្សារចនាសម្ព័ន្ធ binary heap លើ std::vector ដែលអាចមើលធាតុអាទិភាពខ្ពស់បំផុតក្នុង O(1) តាម .top() និងបញ្ចូល/លុបក្នុង O(log n)។ ជាលំនាំដើម វាជា max-heap ដោយប្រើ std::less<T> ដូច្នេះលេខធំបំផុតនៅលើគេ។',
            'ដើម្បីបង្កើត min-heap (តម្លៃតូចបំផុតនៅលើគេ) ត្រូវផ្ដល់ប៉ារ៉ាម៉ែត្រ template ទាំងបី៖ std::priority_queue<T, std::vector<T>, std::greater<T>>។ សម្រាប់ struct ផ្ទាល់ខ្លួន សូមសរសេរ comparator ដែលត្រឡប់ true នៅពេល a មានអាទិភាពទាបជាង b។',
          ],
          points: [
            'std::priority_queue<int> លំនាំដើមគឺ max-heap (តម្លៃធំបំផុតចេញមុន)។',
            'វាក្យសម្ព័ន្ធ min-heap៖ std::priority_queue<int, std::vector<int>, std::greater<int>>។',
            'អ្នកមិនអាចរត់រង្វិលជុំ for-range ផ្ទាល់លើ priority_queue បានទេ—ត្រូវដកតាម .top() និង .pop()។',
          ],
          exampleTitle: 'Min-Heap និងប្រព័ន្ធរៀបអាទិភាពការងារផ្ទាល់ខ្លួន',
          tip: 'ចងចាំច្បាប់ comparator របស់ priority_queue៖ ប្រសិនបើ comp(a, b) ត្រឡប់ true មានន័យថា b មានអាទិភាពខ្ពស់ជាង ហើយនឹងត្រូវដកចេញមុន a។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរអនុគមន៍ bool is_balanced(std::string_view expr) ដោយប្រើ std::stack<char> ដើម្បីផ្ទៀងផ្ទាត់ថាវង់ក្រចក (), [] និង {} បិទបើកត្រឹមត្រូវ។ សាកល្បង "(a + [b * {c}])" និង "([)]" ក្នុង main()។',
        hint: 'រុញវង់ក្រចកបើកចូល stack។ ពេលជួបវង់ក្រចកបិទ បើ stack ទទេ ឬ stack.top() មិនត្រូវគូ សូមត្រឡប់ false បើត្រូវសូមហៅ st.pop()។ ចុងក្រោយត្រឡប់ st.empty()។',
      },
      quiz: [
        {
          question: 'ហេតុអ្វី std::stack<T>::pop() ត្រឡប់ void ជំនួសឱ្យការត្រឡប់ធាតុដែលបានដក?',
          options: [
            'C++ templates មិនអាចត្រឡប់ប្រភេទ T បានទេ។',
            'ការបំបែក .top() និង .pop() ធានាសុវត្ថិភាព exception ក្នុងករណីការចម្លងតម្លៃត្រឡប់បោះ exception។',
            'std::stack គាំទ្រតែលេខគត់ប៉ុណ្ណោះ។',
            'pop() លុបធាតុទាំងអស់ក្នុង stack តែម្ដង។',
          ],
          answer: 1,
          explanation:
            'បើ pop() លុបធាតុហើយមាន exception ពេលចម្លងតម្លៃត្រឡប់ ធាតុនោះនឹងបាត់បង់ជារៀងរហូត។ ការអាន .top() មុន រួចហៅ .pop() ការពារការបាត់បង់ទិន្នន័យនេះ។',
        },
        {
          question:
            'តើត្រូវប្រកាស min-heap នៃ int (លេខតូចបំផុតនៅលើគេ) ដោយ std::priority_queue ដូចម្ដេច?',
          options: [
            'std::priority_queue<int> pq;',
            'std::priority_queue<int, std::greater<int>> pq;',
            'std::priority_queue<int, std::vector<int>, std::greater<int>> pq;',
            'std::min_priority_queue<int> pq;',
          ],
          answer: 2,
          explanation:
            'std::priority_queue ទទួលប៉ារ៉ាម៉ែត្រ template បីគឺ ValueType, Container និង Compare ដូច្នេះពេលកំណត់ std::greater<int> អ្នកត្រូវបញ្ជាក់ std::vector<int> ជាប៉ារ៉ាម៉ែត្រទីពីរដែរ។',
        },
      ],
    },
  },

  // =========================================================================
  // 4. INHERITANCE, VIRTUAL FUNCTIONS & OVERRIDE
  // =========================================================================
  {
    slug: 'cpp-inheritance-and-polymorphism',
    level: 'intermediate',
    insertAfter: 'classes-and-raii',
    en: {
      title: 'Inheritance, virtual Functions & override',
      duration: '15 min',
      summary:
        'Design clean polymorphic hierarchies in modern C++ using public inheritance, virtual dispatch, override safety checks, abstract interfaces (= 0), and virtual destructors.',
      objectives: [
        'Enable runtime polymorphism with virtual functions and catch signature mismatches at compile time using override.',
        'Define abstract base interfaces with pure virtual functions (= 0) and avoid object slicing by storing std::unique_ptr<Base>.',
        'Prevent undefined behavior and resource leaks by declaring virtual destructors on polymorphic base classes.',
      ],
      sections: [
        {
          id: 'public-inheritance-and-virtual',
          heading: 'Public Inheritance, virtual Dispatch & override',
          body: [
            'Public inheritance (class Dog : public Animal) models an "is-a" relationship: a derived class inherits the base class interface and can specialize behavior. By default in C++, member functions use static (compile-time) binding based on the variable’s declared type. To enable dynamic (runtime) dispatch through a base pointer or reference, mark the base method virtual.',
            'In every derived class, always append the override specifier (introduced in C++11) to overridden methods. Without override, a tiny mistake—such as forgetting const or mistyping a parameter type—silently creates a brand-new unrelated function instead of overriding the base method. You can also mark a method or class final to prohibit further overriding.',
          ],
          points: [
            'Runtime polymorphism only activates through pointers (Base*, std::unique_ptr<Base>) or references (Base&, const Base&).',
            'Always write override on derived virtual methods; omit repeating virtual on the derived line for cleaner style.',
            'Keep base data members private rather than protected whenever possible to preserve encapsulation.',
          ],
          table: {
            headers: ['Keyword / Syntax', 'Meaning', 'Usage Rule'],
            rows: [
              [
                'class D : public B',
                'Public ("is-a") inheritance',
                'Default inheritance mode for interfaces',
              ],
              [
                'virtual void f() const;',
                'Enables dynamic dispatch',
                'Place on the base class declaration',
              ],
              [
                'void f() const override;',
                'Compiler-verified override',
                'Use on every overriding derived method',
              ],
              [
                'virtual void f() = 0;',
                'Pure virtual (abstract)',
                'Forces derived classes to implement f()',
              ],
              [
                'final',
                'Forbids further override/subclass',
                'Use on leaf classes or sealed methods',
              ],
              [
                'virtual ~Base() = default;',
                'Virtual destructor',
                'Mandatory on every polymorphic base class',
              ],
            ],
          },
          example: {
            title: 'Dynamic Dispatch with virtual and override',
            language: 'cpp',
            code: `#include <iostream>
#include <string>

class Logger {
public:
    virtual ~Logger() = default;
    virtual void write(const std::string& msg) const {
        std::cout << "[PLAIN] " << msg << "\\n";
    }
};

class JsonLogger final : public Logger {
public:
    void write(const std::string& msg) const override {
        std::cout << "{\\"message\\": \\"" << msg << "\\"}\\n";
    }
};

void record_event(const Logger& logger) {
    logger.write("Deployment succeeded");
}

int main() {
    Logger plain;
    JsonLogger json;
    record_event(plain);
    record_event(json);
    return 0;
}`,
            output: `[PLAIN] Deployment succeeded
{"message": "Deployment succeeded"}`,
          },
          tip: 'Marking a leaf derived class as final allows modern C++ compilers to devirtualize calls when the concrete type is known, eliminating vtable lookup overhead.',
        },
        {
          id: 'abstract-classes-and-interfaces',
          heading: 'Abstract Base Classes (= 0) & Avoiding Object Slicing',
          body: [
            'Often a base class represents a pure contract—like Shape or PaymentGateway—where no generic implementation makes sense. Adding = 0 to a virtual method makes it a pure virtual function and turns the class into an abstract class. Abstract classes cannot be instantiated directly; any concrete subclass must implement every pure virtual method.',
            'To store a heterogeneous collection of derived objects (circles, rectangles, triangles) together, store smart pointers such as std::vector<std::unique_ptr<Shape>>. If you try to store derived objects by value in a container of a concrete base class (std::vector<Base>), C++ performs object slicing: it copies only the Base portion and silently chops off all derived fields and behavior.',
          ],
          points: [
            'An interface in C++ is simply a class with only pure virtual methods (= 0), a virtual destructor, and no data members.',
            'Use std::make_unique<Derived>(...) to push polymorphic objects into std::vector<std::unique_ptr<Base>> safely.',
            'Pass polymorphic objects to functions by const Base& or Base& when ownership is not being transferred.',
          ],
          example: {
            title: 'Abstract Shape Interface & std::vector<std::unique_ptr<Shape>>',
            language: 'cpp',
            code: `#include <iomanip>
#include <iostream>
#include <memory>
#include <vector>

class Shape {
public:
    virtual ~Shape() = default;
    virtual double area() const = 0;
    virtual const char* name() const = 0;
};

class Circle : public Shape {
    double r_;
public:
    explicit Circle(double r) : r_{r} {}
    double area() const override { return 3.14159 * r_ * r_; }
    const char* name() const override { return "Circle"; }
};

class Rectangle : public Shape {
    double w_, h_;
public:
    Rectangle(double w, double h) : w_{w}, h_{h} {}
    double area() const override { return w_ * h_; }
    const char* name() const override { return "Rectangle"; }
};

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>(3.0));
    shapes.push_back(std::make_unique<Rectangle>(4.0, 5.0));

    std::cout << std::fixed << std::setprecision(2);
    for (const auto& s : shapes) {
        std::cout << s->name() << " area = " << s->area() << "\\n";
    }
    return 0;
}`,
            output: `Circle area = 28.27
Rectangle area = 20.00`,
          },
          warning:
            'Never pass or store polymorphic derived objects by value as Base (e.g., void draw(Base b) or std::vector<Base>)! Object slicing strips away the derived subobject and breaks dynamic dispatch silently.',
        },
        {
          id: 'virtual-destructors-and-composition',
          heading: 'Virtual Destructors & Composition Over Inheritance',
          body: [
            'Whenever a derived object is owned through a base pointer (such as std::unique_ptr<Base>), destroying that pointer invokes ~Base(). If ~Base() is NOT virtual, C++ skips ~Derived() completely—triggering Undefined Behavior and leaking any resources held by the derived class. Declaring virtual ~Base() = default; guarantees the derived destructor runs first, followed by the base destructor.',
            'At the same time, modern C++ favors composition ("has-a") over deep inheritance chains. Inheritance tightly couples subclasses to base internals and forces heap allocation for heterogeneous collections. Use inheritance for clean interface contracts, and embed member objects directly when you simply want to reuse functionality.',
          ],
          points: [
            'Rule of thumb: a base class destructor should be either public and virtual, or protected and non-virtual.',
            'When declaring a virtual destructor on a base class, consider = delete on copy operations (or making them protected) to prevent accidental slicing.',
            'Prefer composition (a Car has an Engine member) over inheritance (Car inherits from Engine) whenever reusing implementation.',
          ],
          example: {
            title: 'Destruction Order with a Virtual Destructor',
            language: 'cpp',
            code: `#include <iostream>
#include <memory>

class Connection {
public:
    virtual ~Connection() {
        std::cout << "1. ~Connection base cleanup\\n";
    }
    virtual void ping() const = 0;
};

class TlsConnection : public Connection {
public:
    ~TlsConnection() override {
        std::cout << "0. ~TlsConnection closing TLS session\\n";
    }
    void ping() const override {
        std::cout << "TLS ping OK\\n";
    }
};

int main() {
    std::unique_ptr<Connection> conn = std::make_unique<TlsConnection>();
    conn->ping();
    // Exiting main invokes ~TlsConnection() THEN ~Connection()
    return 0;
}`,
            output: `TLS ping OK
0. ~TlsConnection closing TLS session
1. ~Connection base cleanup`,
          },
          warning:
            'Deleting a derived object through a base pointer whose destructor is non-virtual is Undefined Behavior in C++. Always add virtual ~Base() = default; to any class with virtual functions.',
        },
      ],
      challenge: {
        prompt:
          'Create an abstract Notification base class with a virtual destructor and pure virtual method void send(std::string_view msg) const = 0;. Implement EmailNotification and SmsNotification using override, store both in std::vector<std::unique_ptr<Notification>>, and send "Build passed!" to all channels.',
        hint: 'Include <memory>, <vector>, <string_view>, and <iostream>. Push items with std::make_unique<EmailNotification>() and loop with for (const auto& ch : channels) ch->send("Build passed!");.',
        language: 'cpp',
        solutionCode: `#include <iostream>
#include <memory>
#include <string_view>
#include <vector>

class Notification {
public:
    virtual ~Notification() = default;
    virtual void send(std::string_view msg) const = 0;
};

class EmailNotification : public Notification {
public:
    void send(std::string_view msg) const override {
        std::cout << "[Email] " << msg << "\\n";
    }
};

class SmsNotification : public Notification {
public:
    void send(std::string_view msg) const override {
        std::cout << "[SMS] " << msg << "\\n";
    }
};

int main() {
    std::vector<std::unique_ptr<Notification>> channels;
    channels.push_back(std::make_unique<EmailNotification>());
    channels.push_back(std::make_unique<SmsNotification>());

    for (const auto& ch : channels) {
        ch->send("Build passed!");
    }
    return 0;
}`,
      },
      quiz: [
        {
          question:
            'What happens if you delete a Derived object through a Base* pointer when ~Base() is NOT virtual?',
          options: [
            'The compiler automatically adds virtual to ~Base().',
            'Both destructors still run safely in reverse order.',
            'It causes Undefined Behavior—~Derived() may never run, leaking derived resources.',
            'C++ throws a std::bad_cast exception.',
          ],
          answer: 2,
          explanation:
            'Deleting a derived object through a pointer to a base class without a virtual destructor is Undefined Behavior. Always declare virtual ~Base() = default; on polymorphic bases.',
        },
        {
          question: 'What is "object slicing" in C++?',
          options: [
            'Splitting a std::string with .substr().',
            'Copying a Derived object into a Base object by value, discarding all derived members and polymorphic behavior.',
            'Using std::unique_ptr to manage derived objects.',
            'Declaring a class as final.',
          ],
          answer: 1,
          explanation:
            'When a Derived object is copied by value into a Base variable or std::vector<Base>, only the Base subobject fits, slicing off the derived state and resetting the vtable to Base.',
        },
      ],
    },
    km: {
      title: 'ការស្នងមរតក (Inheritance), អនុគមន៍ virtual និង override',
      duration: '15 នាទី',
      summary:
        'រចនាឋានានុក្រម polymorphism ស្អាតក្នុង C++ ទំនើប ដោយប្រើ public inheritance, virtual dispatch, ការផ្ទៀងផ្ទាត់ override, abstract interfaces (= 0) និង virtual destructors។',
      objectives: [
        'បើកដំណើរការ runtime polymorphism ជាមួយអនុគមន៍ virtual និងចាប់កំហុសខុស signature នៅពេល compile ដោយ override។',
        'បង្កើត abstract base interfaces ជាមួយ pure virtual (= 0) និងជៀសវាង object slicing ដោយផ្ទុក std::unique_ptr<Base>។',
        'ការពារ Undefined Behavior និងការលេចធ្លាយធនធានដោយប្រកាស virtual destructor លើ base class។',
      ],
      sections: [
        {
          id: 'public-inheritance-and-virtual',
          heading: 'Public Inheritance, ការបញ្ជូន virtual និង override',
          body: [
            'Public inheritance (class Dog : public Animal) បង្ហាញទំនាក់ទំនង "is-a" ដែលថ្នាក់កូនស្នងចំណុចប្រទាក់ពីថ្នាក់មេ ហើយអាចប្ដូរឥរិយាបថផ្ទាល់ខ្លួន។ ជាលំនាំដើមក្នុង C++ ការហៅអនុគមន៍ប្រើ static binding តាមប្រភេទប្រកាស។ ដើម្បីឱ្យហៅត្រូវតាមប្រភេទពិតពេល runtime តាម pointer ឬ reference នៃថ្នាក់មេ ត្រូវដាក់ពាក្យ virtual លើអនុគមន៍ថ្នាក់មេ។',
            'ក្នុងថ្នាក់កូន សូមដាក់ពាក្យ override (C++11) លើអនុគមន៍ដែលសរសេរជាន់ជានិច្ច។ បើគ្មាន override កំហុសតូចមួយដូចជាភ្លេច const នឹងបង្កើតអនុគមន៍ថ្មីដោយស្ងាត់ៗជំនួសឱ្យការជាន់ថ្នាក់មេ។ អ្នកក៏អាចដាក់ final ដើម្បីហាមការសរសេរជាន់ ឬស្នងបន្ត។',
          ],
          points: [
            'Runtime polymorphism ដំណើរការតែតាម pointers (Base*, std::unique_ptr<Base>) ឬ references (Base&, const Base&) ប៉ុណ្ណោះ។',
            'សរសេរ override ជានិច្ចលើអនុគមន៍ថ្នាក់កូនដែលជាន់ virtual របស់ថ្នាក់មេ។',
            'រក្សាអថេរទិន្នន័យថ្នាក់មេជា private ជាជាង protected តាមដែលអាចធ្វើបានដើម្បីរក្សា encapsulation។',
          ],
          table: {
            headers: ['ពាក្យគន្លឹះ / វាក្យសម្ព័ន្ធ', 'អត្ថន័យ', 'ច្បាប់ប្រើប្រាស់'],
            rows: [
              [
                'class D : public B',
                'Public ("is-a") inheritance',
                'ទម្រង់លំនាំដើមសម្រាប់ interfaces',
              ],
              ['virtual void f() const;', 'បើក dynamic dispatch', 'ដាក់លើការប្រកាសក្នុងថ្នាក់មេ'],
              [
                'void f() const override;',
                'ឱ្យ compiler ផ្ទៀងផ្ទាត់ការជាន់',
                'ប្រើលើគ្រប់អនុគមន៍ជាន់ក្នុងថ្នាក់កូន',
              ],
              ['virtual void f() = 0;', 'Pure virtual (abstract)', 'បង្ខំថ្នាក់កូនឱ្យអនុវត្ត f()'],
              ['final', 'ហាមការជាន់ ឬស្នងបន្ត', 'ប្រើលើថ្នាក់ចុងក្រោយ ឬអនុគមន៍បិទ'],
              [
                'virtual ~Base() = default;',
                'Virtual destructor',
                'ចាំបាច់លើគ្រប់ polymorphic base class',
              ],
            ],
          },
          exampleTitle: 'Dynamic Dispatch ជាមួយ virtual និង override',
          tip: 'ការដាក់ final លើថ្នាក់កូនចុងក្រោយជួយឱ្យ compiler ទំនើបអាចបង្កើនល្បឿន (devirtualize) ដោយមិនបាច់រកក្នុង vtable ពេលដឹងប្រភេទជាក់លាក់។',
        },
        {
          id: 'abstract-classes-and-interfaces',
          heading: 'Abstract Base Classes (= 0) និងការជៀសវាង Object Slicing',
          body: [
            'ជារឿយៗថ្នាក់មេគ្រាន់តែជាកិច្ចសន្យាសុទ្ធ—ដូចជា Shape ឬ PaymentGateway—ដែលមិនមានការអនុវត្តទូទៅទេ។ ការបន្ថែម = 0 លើអនុគមន៍ virtual ធ្វើឱ្យវាក្លាយជា pure virtual និងធ្វើឱ្យថ្នាក់ក្លាយជា abstract class ដែលមិនអាចបង្កើត object ផ្ទាល់បានទេ ហើយថ្នាក់កូនត្រូវតែអនុវត្តវាទាំងអស់។',
            'ដើម្បីផ្ទុកថ្នាក់កូនចម្រុះក្នុងបញ្ជីតែមួយ សូមប្រើ smart pointers ដូចជា std::vector<std::unique_ptr<Shape>>។ បើផ្ទុកតាមតម្លៃក្នុង std::vector<Base> នោះ C++ នឹងធ្វើ object slicing ដែលចម្លងតែផ្នែក Base ហើយកាត់ចោលទិន្នន័យ និងឥរិយាបថថ្នាក់កូនទាំងអស់។',
          ],
          points: [
            'Interface ក្នុង C++ គឺជាថ្នាក់ដែលមានតែ pure virtual methods (= 0) និង virtual destructor ដោយគ្មានអថេរទិន្នន័យ។',
            'ប្រើ std::make_unique<Derived>(...) ដើម្បីដាក់ object ចូល std::vector<std::unique_ptr<Base>> ដោយសុវត្ថិភាព។',
            'បញ្ជូន object ទៅអនុគមន៍ដោយ const Base& ឬ Base& ពេលមិនផ្ទេរកម្មសិទ្ធិ។',
          ],
          exampleTitle: 'Abstract Shape Interface និង std::vector<std::unique_ptr<Shape>>',
          warning:
            'កុំបញ្ជូន ឬផ្ទុកថ្នាក់កូន polymorphic តាមតម្លៃជា Base (ដូចជា void draw(Base b) ឬ std::vector<Base>)! Object slicing នឹងកាត់ចោលផ្នែកថ្នាក់កូន ហើយបំផ្លាញ dynamic dispatch ដោយស្ងាត់ៗ។',
        },
        {
          id: 'virtual-destructors-and-composition',
          heading: 'Virtual Destructors និងការប្រើ Composition មុន Inheritance',
          body: [
            'នៅពេល object ថ្នាក់កូនត្រូវបានកាន់កាប់តាម base pointer (ដូចជា std::unique_ptr<Base>) ការលុបវានឹងហៅ ~Base()។ បើ ~Base() មិនមែនជា virtual ទេ C++ នឹងរំលង ~Derived() ទាំងស្រុង—បង្ក Undefined Behavior និងលេចធ្លាយធនធាន។ ការប្រកាស virtual ~Base() = default; ធានាថា ~Derived() រត់មុន រួចទើប ~Base() រត់តាមក្រោយ។',
            'ទន្ទឹមនឹងនេះ C++ ទំនើបលើកទឹកចិត្តឱ្យប្រើ composition ("has-a") ជំនួសឱ្យការស្នងមរតកជ្រៅច្រើនជាន់។ ប្រើ inheritance សម្រាប់កិច្ចសន្យា interface ស្អាត ហើយដាក់ object ជាសមាជិកផ្ទាល់ពេលគ្រាន់តែចង់ប្រើមុខងារឡើងវិញ។',
          ],
          points: [
            'ច្បាប់មាស៖ destructor របស់ថ្នាក់មេត្រូវតែជា public និង virtual ឬ protected និង non-virtual។',
            'ពេលប្រកាស virtual destructor លើថ្នាក់មេ គួរពិចារណា = delete លើការចម្លង ដើម្បីការពារ slicing។',
            'ប្រើ composition (Car មាន Engine ជាសមាជិក) ប្រសើរជាង inheritance ពេលគ្រាន់តែប្រើកូដឡើងវិញ។',
          ],
          exampleTitle: 'លំដាប់នៃការរំលាយ Object ជាមួយ Virtual Destructor',
          warning:
            'ការលុប object ថ្នាក់កូនតាម base pointer ដែលគ្មាន virtual destructor គឺជា Undefined Behavior ក្នុង C++។ សូមដាក់ virtual ~Base() = default; លើគ្រប់ថ្នាក់ដែលមានអនុគមន៍ virtual។',
        },
      ],
      challenge: {
        prompt:
          'បង្កើត abstract base class Notification ដែលមាន virtual destructor និង pure virtual void send(std::string_view msg) const = 0;។ អនុវត្ត EmailNotification និង SmsNotification ដោយប្រើ override ផ្ទុកទាំងពីរក្នុង std::vector<std::unique_ptr<Notification>> រួចផ្ញើ "Build passed!" ទៅគ្រប់ប៉ុស្តិ៍។',
        hint: 'បញ្ចូល <memory>, <vector>, <string_view> និង <iostream>។ ប្រើ std::make_unique<EmailNotification>() រួចរត់រង្វិលជុំហៅ ch->send("Build passed!");។',
      },
      quiz: [
        {
          question:
            'តើមានអ្វីកើតឡើងប្រសិនបើអ្នកលុប Derived object តាម Base* pointer នៅពេល ~Base() មិនមែនជា virtual?',
          options: [
            'Compiler បន្ថែម virtual ឱ្យ ~Base() ដោយស្វ័យប្រវត្តិ។',
            'Destructor ទាំងពីរនៅតែរត់ដោយសុវត្ថិភាព។',
            'វាបង្ក Undefined Behavior—~Derived() អាចមិនរត់សោះ ធ្វើឱ្យលេចធ្លាយធនធានរបស់ថ្នាក់កូន។',
            'C++ បោះ exception std::bad_cast។',
          ],
          answer: 2,
          explanation:
            'ការលុប object ថ្នាក់កូនតាម pointer ថ្នាក់មេដែលគ្មាន virtual destructor គឺជា Undefined Behavior។ ត្រូវប្រកាស virtual ~Base() = default; លើគ្រប់ polymorphic base class។',
        },
        {
          question: 'តើ "object slicing" ក្នុង C++ ជាអ្វី?',
          options: [
            'ការកាត់ std::string ដោយ .substr()។',
            'ការចម្លង Derived object ចូល Base object តាមតម្លៃ ដែលកាត់ចោលសមាជិក និងឥរិយាបថថ្នាក់កូន។',
            'ការប្រើ std::unique_ptr គ្រប់គ្រងថ្នាក់កូន។',
            'ការប្រកាសថ្នាក់ជា final។',
          ],
          answer: 1,
          explanation:
            'ពេលចម្លង Derived ចូលអថេរ Base ឬ std::vector<Base> តាមតម្លៃ មានតែផ្នែក Base ប៉ុណ្ណោះដែលចម្លងចូល ចំណែកទិន្នន័យ និង vtable របស់ថ្នាក់កូនត្រូវបាត់បង់។',
        },
      ],
    },
  },

  // =========================================================================
  // 5. EXCEPTIONS, STD::OPTIONAL & STD::VARIANT
  // =========================================================================
  {
    slug: 'cpp-exceptions-and-optional',
    level: 'intermediate',
    insertAfter: 'cpp-inheritance-and-polymorphism',
    en: {
      title: 'Exceptions, std::optional & std::variant',
      duration: '14 min',
      summary:
        'Handle errors and missing values cleanly in modern C++ using RAII-safe exceptions, value-based std::optional<T>, and type-safe sum types with std::variant and std::visit.',
      objectives: [
        'Throw standard exceptions by value, catch by const reference, and leverage RAII stack unwinding for automatic cleanup.',
        'Replace ambiguous sentinel values (-1, nullptr, "") with std::optional<T> and .value_or().',
        'Model multi-type states or typed errors without heap allocation using std::variant and std::visit.',
      ],
      sections: [
        {
          id: 'exceptions-and-raii-safety',
          heading: 'Exceptions, Stack Unwinding & RAII Safety',
          body: [
            'When an unexpected failure occurs—such as an invalid configuration, out-of-range index, or broken network precondition—C++ lets you signal it by throwing a standard exception from <stdexcept> (like std::invalid_argument or std::runtime_error). Execution jumps straight to the nearest matching catch handler, unwinding every stack frame along the way.',
            'C++ does not need a finally keyword because stack unwinding automatically runs the destructors of every local RAII object (std::unique_ptr, std::ifstream, std::lock_guard, std::vector) as scopes exit. Always follow the golden rule: throw by value, catch by const reference (catch (const std::exception& e)), and mark non-throwing functions noexcept.',
          ],
          points: [
            'Standard hierarchy: std::exception -> std::runtime_error / std::logic_error -> std::invalid_argument, std::out_of_range.',
            'Catch more specific exception types before general std::exception& handlers.',
            'Mark move constructors, swaps, and destructors noexcept so STL containers can optimize safely.',
          ],
          table: {
            headers: ['Tool / Header', 'Best For', 'Example'],
            rows: [
              [
                'throw / try / catch (<stdexcept>)',
                'Truly exceptional failures & invariants',
                'throw std::invalid_argument{"negative qty"};',
              ],
              [
                'noexcept',
                'Functions guaranteed never to throw',
                'int id() const noexcept { return id_; }',
              ],
              [
                'std::optional<T> (<optional>)',
                'Value that may legitimately be absent',
                'std::optional<User> find_user(int id);',
              ],
              ['std::nullopt', 'Empty std::optional literal', 'return std::nullopt;'],
              [
                'std::variant<A, B> (<variant>)',
                'One value from a fixed set of types',
                'std::variant<int, std::string> res;',
              ],
              [
                'std::visit(fn, var)',
                'Exhaustive type-safe dispatch on variant',
                'std::visit([](const auto& v){ ... }, res);',
              ],
            ],
          },
          example: {
            title: 'RAII Stack Unwinding & Catching by const Reference',
            language: 'cpp',
            code: `#include <iostream>
#include <stdexcept>
#include <string>

struct ScopeGuard {
    std::string name;
    ~ScopeGuard() {
        std::cout << "Cleaning up: " << name << "\\n";
    }
};

double withdraw(double balance, double amount) {
    ScopeGuard tx{"bank-transaction"};
    if (amount <= 0.0) {
        throw std::invalid_argument{"Withdrawal must be positive"};
    }
    if (amount > balance) {
        throw std::runtime_error{"Insufficient funds"};
    }
    return balance - amount;
}

int main() {
    try {
        double left = withdraw(100.0, 250.0);
        std::cout << "Remaining: " << left << "\\n";
    } catch (const std::exception& e) {
        std::cout << "Caught error: " << e.what() << "\\n";
    }
    return 0;
}`,
            output: `Cleaning up: bank-transaction
Caught error: Insufficient funds`,
          },
          warning:
            'Never catch exceptions by value (catch (std::exception e))—that slices derived exceptions like std::runtime_error and loses their message! Also never allow an exception to escape a destructor, or std::terminate() will immediately abort your program.',
        },
        {
          id: 'std-optional-nullable-values',
          heading: 'Value-Based Absence with std::optional<T>',
          body: [
            'Not every failure is "exceptional." Looking up a user by ID, parsing an optional CLI flag, or finding a substring may routinely return "no result." Historically, C++ code returned magic numbers like -1, empty strings, or raw nullptr—all easy for callers to forget to check.',
            'C++17 introduced std::optional<T> (<optional>) to make absence explicit right in the return type, stored directly on the stack with zero heap allocation. Callers test if (result) (or result.has_value()), access the value with *result or result->member, or supply a fallback cleanly with result.value_or(default_val).',
          ],
          points: [
            'Return std::nullopt (or {}) to indicate an empty optional.',
            'Dereferencing an empty optional with *opt is Undefined Behavior; calling opt.value() throws std::bad_optional_access.',
            'Use opt.value_or(fallback) whenever a sensible default exists.',
          ],
          example: {
            title: 'Returning std::optional Instead of Magic Sentinel Values',
            language: 'cpp',
            code: `#include <iostream>
#include <optional>
#include <string>
#include <unordered_map>

std::optional<int> find_port(const std::unordered_map<std::string, int>& cfg,
                             const std::string& service) {
    if (auto it = cfg.find(service); it != cfg.end()) {
        return it->second;
    }
    return std::nullopt;
}

int main() {
    std::unordered_map<std::string, int> ports{{"http", 8080}, {"db", 5432}};

    if (auto db_port = find_port(ports, "db")) {
        std::cout << "DB port: " << *db_port << "\\n";
    }

    int cache_port = find_port(ports, "redis").value_or(6379);
    std::cout << "Cache port (with default): " << cache_port << "\\n";
    return 0;
}`,
            output: `DB port: 5432
Cache port (with default): 6379`,
          },
          tip: 'Use std::optional for expected "might not exist" outcomes and reserve exceptions for unexpected errors that cannot be handled locally.',
        },
        {
          id: 'std-variant-and-visit',
          heading: 'Type-Safe Tagged Unions with std::variant & std::visit',
          body: [
            'Traditional C unions are notorious sources of memory bugs because they do not remember which type is currently stored. C++17’s std::variant<Ts...> (<variant>) is a type-safe discriminated union that tracks its active alternative automatically, stores everything inline on the stack (no heap allocation), and properly runs constructors and destructors when switching types.',
            'You can check the active type with std::holds_alternative<T>(v) or extract safely with std::get_if<T>(&v) (which returns nullptr on mismatch). Even better, std::visit dispatches a visitor lambda over the active alternative and guarantees at compile time that every possible type in the variant is handled.',
          ],
          points: [
            'std::variant is ideal for parser tokens, finite state machines, or returning either a Value or a structured Error.',
            'Prefer std::get_if<T>(&v) or std::visit over std::get<T>(v), because std::get throws std::bad_variant_access on type mismatch.',
            'A generic lambda using if constexpr (std::is_same_v<T, ...>) lets std::visit handle each alternative cleanly in one place.',
          ],
          example: {
            title: 'Handling Typed Results with std::variant and std::visit',
            language: 'cpp',
            code: `#include <iostream>
#include <string>
#include <type_traits>
#include <variant>

struct ParseError {
    std::string reason;
};

using ParseResult = std::variant<int, ParseError>;

ParseResult parse_positive(const std::string& text) {
    try {
        int val = std::stoi(text);
        if (val <= 0) return ParseError{"Number must be > 0"};
        return val;
    } catch (...) {
        return ParseError{"Not a valid integer"};
    }
}

void print_result(const ParseResult& res) {
    std::visit([](const auto& item) {
        using T = std::decay_t<decltype(item)>;
        if constexpr (std::is_same_v<T, int>) {
            std::cout << "Parsed value: " << item << "\\n";
        } else {
            std::cout << "Error: " << item.reason << "\\n";
        }
    }, res);
}

int main() {
    print_result(parse_positive("42"));
    print_result(parse_positive("-5"));
    print_result(parse_positive("abc"));
    return 0;
}`,
            output: `Parsed value: 42
Error: Number must be > 0
Error: Not a valid integer`,
          },
          tip: 'Because std::variant knows the full set of types at compile time, it often outperforms virtual inheritance for closed sets of states or AST nodes.',
        },
      ],
      challenge: {
        prompt:
          'Write std::optional<double> safe_divide(double a, double b) that returns std::nullopt when b == 0.0, and a helper using std::variant<double, std::string> that prints either the numeric answer or an error message via std::visit. Test both 15.0 / 4.0 and 15.0 / 0.0 in main().',
        hint: 'Check if (b == 0.0) return std::nullopt; in safe_divide. Convert the optional into std::variant<double, std::string> and pass it to std::visit with an if constexpr lambda.',
        language: 'cpp',
        solutionCode: `#include <iostream>
#include <optional>
#include <string>
#include <type_traits>
#include <variant>

std::optional<double> safe_divide(double a, double b) {
    if (b == 0.0) return std::nullopt;
    return a / b;
}

int main() {
    auto format_div = [](double a, double b) -> std::variant<double, std::string> {
        if (auto q = safe_divide(a, b)) return *q;
        return std::string{"Division by zero"};
    };

    auto display = [](const std::variant<double, std::string>& res) {
        std::visit([](const auto& v) {
            using T = std::decay_t<decltype(v)>;
            if constexpr (std::is_same_v<T, double>) {
                std::cout << "Result: " << v << "\\n";
            } else {
                std::cout << "Error: " << v << "\\n";
            }
        }, res);
    };

    display(format_div(15.0, 4.0));
    display(format_div(15.0, 0.0));
    return 0;
}`,
      },
      quiz: [
        {
          question: 'What is the recommended way to throw and catch exceptions in C++?',
          options: [
            'Throw by pointer (new std::runtime_error) and catch by pointer.',
            'Throw by value and catch by const reference (const std::exception&).',
            'Throw by value and catch by value (std::exception e).',
            'Throw integers and catch with catch (int).',
          ],
          answer: 1,
          explanation:
            'Throwing by value avoids heap leaks, and catching by const reference prevents object slicing so derived exception details (.what()) remain intact.',
        },
        {
          question: 'What happens if you call opt.value_or(99) on an empty std::optional<int>?',
          options: [
            'It causes Undefined Behavior.',
            'It throws std::bad_optional_access.',
            'It safely returns 99 without throwing.',
            'It mutates opt to store 99 permanently.',
          ],
          answer: 2,
          explanation:
            'value_or(default_value) returns the contained value if present, or returns the provided fallback (99) without throwing or modifying the optional.',
        },
      ],
    },
    km: {
      title: 'Exceptions, std::optional និង std::variant',
      duration: '14 នាទី',
      summary:
        'ដោះស្រាយកំហុស និងតម្លៃអវត្តមានយ៉ាងស្អាតក្នុង C++ ទំនើប ដោយប្រើ exceptions សុវត្ថិភាព RAII, std::optional<T> និងប្រភេទចម្រុះសុវត្ថិភាព std::variant ជាមួយ std::visit។',
      objectives: [
        'បោះ exception តាមតម្លៃ ចាប់តាម const reference និងប្រើ RAII stack unwinding សម្រាប់សម្អាតធនធានស្វ័យប្រវត្តិ។',
        'ជំនួសតម្លៃសញ្ញា (-1, nullptr, "") ដោយ std::optional<T> និង .value_or()។',
        'តំណាងស្ថានភាពច្រើនប្រភេទ ឬកំហុសមានរចនាសម្ព័ន្ធដោយមិនប្រើ heap ជាមួយ std::variant និង std::visit។',
      ],
      sections: [
        {
          id: 'exceptions-and-raii-safety',
          heading: 'Exceptions, Stack Unwinding និងសុវត្ថិភាព RAII',
          body: [
            'នៅពេលមានបញ្ហាមិនរំពឹងទុក—ដូចជាប៉ារ៉ាម៉ែត្រមិនត្រឹមត្រូវ ឬលិបិក្រមលើសដែន—C++ អនុញ្ញាតឱ្យបោះ exception ស្តង់ដារពី <stdexcept> (ដូចជា std::invalid_argument ឬ std::runtime_error)។ កូដនឹងលោតទៅប្លុក catch ដែលត្រូវគ្នាជិតបំផុត ហើយរំលាយ stack frames តាមផ្លូវ។',
            'C++ មិនត្រូវការពាក្យ finally ទេ ព្រោះដំណើរការ stack unwinding ហៅ destructors របស់គ្រប់ RAII object (std::unique_ptr, std::ifstream, std::lock_guard) ដោយស្វ័យប្រវត្តិ។ សូមអនុវត្តច្បាប់មាស៖ បោះតាមតម្លៃ (throw by value), ចាប់តាម const reference (catch (const std::exception& e)) និងដាក់ noexcept លើអនុគមន៍ដែលមិនបោះ exception។',
          ],
          points: [
            'ឋានានុក្រមស្តង់ដារ៖ std::exception -> std::runtime_error / std::logic_error -> std::invalid_argument, std::out_of_range។',
            'ចាប់ exception ជាក់លាក់មុន catch (const std::exception& e) ទូទៅ។',
            'ដាក់ noexcept លើ move constructor, swap និង destructor ដើម្បីឱ្យ STL container បង្កើនល្បឿនដោយសុវត្ថិភាព។',
          ],
          table: {
            headers: ['ឧបករណ៍ / Header', 'ស័ក្ដិសមបំផុតសម្រាប់', 'ឧទាហរណ៍'],
            rows: [
              [
                'throw / try / catch (<stdexcept>)',
                'កំហុសមិនរំពឹងទុកធ្ងន់ធ្ងរ',
                'throw std::invalid_argument{"negative qty"};',
              ],
              [
                'noexcept',
                'អនុគមន៍ធានាមិនបោះ exception',
                'int id() const noexcept { return id_; }',
              ],
              [
                'std::optional<T> (<optional>)',
                'តម្លៃដែលអាចមាន ឬគ្មាន',
                'std::optional<User> find_user(int id);',
              ],
              ['std::nullopt', 'តម្លៃទទេសម្រាប់ std::optional', 'return std::nullopt;'],
              [
                'std::variant<A, B> (<variant>)',
                'ផ្ទុកមួយក្នុងចំណោមប្រភេទកំណត់',
                'std::variant<int, std::string> res;',
              ],
              [
                'std::visit(fn, var)',
                'ដោះស្រាយគ្រប់ប្រភេទក្នុង variant',
                'std::visit([](const auto& v){ ... }, res);',
              ],
            ],
          },
          exampleTitle: 'RAII Stack Unwinding និងការចាប់ Exception តាម const Reference',
          warning:
            'កុំចាប់ exception តាមតម្លៃ (catch (std::exception e)) ព្រោះវាកាត់ចោលប្រភេទកូន (slicing) ហើយបាត់សារកំហុស! ហើយកុំឱ្យ exception លេចចេញពី destructor ឡើយ បើមិនដូច្នេះកម្មវិធីនឹងឈប់ភ្លាម (std::terminate)។',
        },
        {
          id: 'std-optional-nullable-values',
          heading: 'តំណាងតម្លៃអវត្តមានជាមួយ std::optional<T>',
          body: [
            'មិនមែនរាល់ការរកមិនឃើញសុទ្ធតែជាកំហុសធ្ងន់ធ្ងរទេ។ ការស្វែងរកអ្នកប្រើតាម ID ឬអានការកំណត់បន្ថែមអាចគ្មានលទ្ធផលជាធម្មតា។ កាលពីមុន គេតែងត្រឡប់ -1, អត្ថបទទទេ ឬ nullptr ដែលអ្នកហៅងាយភ្លេចពិនិត្យ។',
            'C++17 បានបន្ថែម std::optional<T> (<optional>) ដើម្បីបង្ហាញលទ្ធភាពអវត្តមានច្បាស់ក្នុងប្រភេទត្រឡប់ ហើយផ្ទុកលើ stack ដោយមិនប្រើ heap។ អ្នកហៅពិនិត្យដោយ if (result) ទាញតម្លៃដោយ *result ឬផ្ដល់តម្លៃជំនួសយ៉ាងស្អាតដោយ result.value_or(default_val)។',
          ],
          points: [
            'ត្រឡប់ std::nullopt (ឬ {}) ដើម្បីបង្ហាញថា optional ទទេ។',
            'ការប្រើ *opt លើ optional ទទេគឺជា Undefined Behavior ចំណែក opt.value() បោះ std::bad_optional_access។',
            'ប្រើ opt.value_or(fallback) នៅពេលមានតម្លៃលំនាំដើមសមរម្យ។',
          ],
          exampleTitle: 'ការត្រឡប់ std::optional ជំនួសតម្លៃសញ្ញាបែបចាស់',
          tip: 'ប្រើ std::optional សម្រាប់ករណី "អាចរកមិនឃើញ" ជាធម្មតា ហើយទុក exceptions សម្រាប់កំហុសមិនរំពឹងទុកដែលមិនអាចដោះស្រាយនៅកន្លែងនោះបាន។',
        },
        {
          id: 'std-variant-and-visit',
          heading: 'Tagged Unions សុវត្ថិភាពប្រភេទជាមួយ std::variant និង std::visit',
          body: [
            'Union បែបចាស់ក្នុងភាសា C ងាយបង្កកំហុសអង្គចងចាំ ព្រោះវាមិនចាំថាប្រភេទណាកំពុងផ្ទុកទេ។ std::variant<Ts...> (<variant>) ក្នុង C++17 គឺជា union សុវត្ថិភាពប្រភេទដែលតាមដានប្រភេទសកម្មដោយស្វ័យប្រវត្តិ ផ្ទុកលើ stack (គ្មាន heap) និងហៅ constructor/destructor ត្រឹមត្រូវពេលប្ដូរប្រភេទ។',
            'អ្នកអាចពិនិត្យប្រភេទដោយ std::holds_alternative<T>(v) ឬទាញដោយសុវត្ថិភាពតាម std::get_if<T>(&v)។ កាន់តែប្រសើរ std::visit អនុញ្ញាតឱ្យដំណើរការ lambda លើប្រភេទសកម្ម ហើយ compiler ធានាថាគ្រប់ប្រភេទក្នុង variant ត្រូវបានដោះស្រាយអស់។',
          ],
          points: [
            'std::variant ល្អបំផុតសម្រាប់ parser tokens, state machines ឬលទ្ធផលដែលត្រឡប់តម្លៃ ឬ struct កំហុស។',
            'ប្រើ std::get_if<T>(&v) ឬ std::visit ជាជាង std::get<T>(v) ព្រោះ std::get បោះ exception បើខុសប្រភេទ។',
            'Generic lambda ជាមួយ if constexpr (std::is_same_v<T, ...>) ជួយដោះស្រាយគ្រប់ជម្រើសក្នុង std::visit យ៉ាងស្អាត។',
          ],
          exampleTitle: 'ការដោះស្រាយលទ្ធផលច្រើនប្រភេទដោយ std::variant និង std::visit',
          tip: 'ដោយសារ std::variant ដឹងប្រភេទទាំងអស់នៅពេល compile វាច្រើនតែលឿនជាង virtual inheritance សម្រាប់សំណុំស្ថានភាពកំណត់ជាក់លាក់។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ std::optional<double> safe_divide(double a, double b) ដែលត្រឡប់ std::nullopt ពេល b == 0.0 រួចប្រើ std::variant<double, std::string> និង std::visit ដើម្បីបង្ហាញលទ្ធផលលេខ ឬសារកំហុស។ សាកល្បងទាំង 15.0 / 4.0 និង 15.0 / 0.0 ក្នុង main()។',
        hint: 'ពិនិត្យ if (b == 0.0) return std::nullopt; ក្នុង safe_divide។ បម្លែង optional ជា std::variant<double, std::string> រួចបញ្ជូនទៅ std::visit ជាមួយ if constexpr lambda។',
      },
      quiz: [
        {
          question: 'តើវិធីណាដែលត្រូវបានណែនាំសម្រាប់ការបោះ និងចាប់ exception ក្នុង C++?',
          options: [
            'បោះជា pointer (new std::runtime_error) ហើយចាប់ជា pointer។',
            'បោះតាមតម្លៃ (by value) ហើយចាប់តាម const reference (const std::exception&)។',
            'បោះតាមតម្លៃ ហើយចាប់តាមតម្លៃ (std::exception e)។',
            'បោះលេខគត់ ហើយចាប់ដោយ catch (int)។',
          ],
          answer: 1,
          explanation:
            'ការបោះតាមតម្លៃជៀសវាងការលេចធ្លាយ heap ហើយការចាប់តាម const reference ការពារ object slicing ដើម្បីរក្សាសារកំហុស (.what()) របស់ប្រភេទកូន។',
        },
        {
          question: 'តើមានអ្វីកើតឡើងបើហៅ opt.value_or(99) លើ std::optional<int> ដែលទទេ?',
          options: [
            'វាបង្ក Undefined Behavior។',
            'វាបោះ exception std::bad_optional_access។',
            'វាត្រឡប់តម្លៃ 99 ដោយសុវត្ថិភាព និងមិនបោះ exception ទេ។',
            'វាកែ opt ឱ្យផ្ទុកលេខ 99 ជារៀងរហូត។',
          ],
          answer: 2,
          explanation:
            'value_or(default_value) ត្រឡប់តម្លៃខាងក្នុងបើមាន ឬត្រឡប់តម្លៃជំនួស (99) ដោយសុវត្ថិភាព មិនបោះ exception និងមិនកែប្រែ optional ដើមទេ។',
        },
      ],
    },
  },

  // =========================================================================
  // 6. LAMBDAS, CAPTURES & C++20 RANGES
  // =========================================================================
  {
    slug: 'cpp-lambdas-and-ranges',
    level: 'pro',
    insertAfter: 'templates-and-algorithms',
    en: {
      title: 'Lambdas, Captures & C++20 Ranges',
      duration: '15 min',
      summary:
        'Write expressive functional C++ with lambda capture lists, zero-overhead STL predicates and projections, and composable lazy data pipelines powered by C++20 std::ranges and std::views.',
      objectives: [
        'Control variable lifetimes accurately with explicit lambda captures ([x], [&x], [y = expr]) and avoid dangling reference bugs.',
        'Pass inline lambdas and C++20 projections to STL algorithms without unnecessary std::function overhead.',
        'Compose zero-allocation lazy pipelines using std::views::filter, std::views::transform, and std::views::take with the pipe operator (|).',
      ],
      sections: [
        {
          id: 'lambda-syntax-and-captures',
          heading: 'Lambda Expressions, Capture Lists & mutable',
          body: [
            'A C++ lambda expression—[captures](parameters) { body }—is syntactic sugar for an unnamed compiler-generated function object (closure). The square-bracket capture list controls which outer variables the lambda can see: [x] copies x by value, [&x] binds a reference to x, [=] copies any referenced local by value, and [&] captures any referenced local by reference.',
            'By default, a lambda’s call operator is const, meaning values captured by copy cannot be mutated inside the body unless you add the mutable keyword. C++14 also added generalized init-captures such as [limit = max_val * 2] or [ptr = std::move(uptr)], letting you compute values or move move-only objects directly into the lambda.',
          ],
          points: [
            'Prefer explicit captures ([threshold, &count]) over blanket [=] or [&] so dependencies are obvious at a glance.',
            'Use generic lambdas ([](const auto& item) { ... }) when a short callback works across multiple types.',
            'Every lambda expression has its own unique compiler-generated type—store it in auto whenever possible.',
          ],
          table: {
            headers: ['Capture Syntax', 'Meaning', 'Lifetime / Safety Note'],
            rows: [
              ['[]', 'Capture nothing', 'Safest; converts to a raw function pointer'],
              ['[x]', 'Capture x by value (copy)', 'Independent copy; const unless mutable'],
              ['[&x]', 'Capture x by reference', 'Must NOT outlive x'],
              [
                '[=]',
                'Default capture used locals by value',
                'Can accidentally copy large containers',
              ],
              [
                '[&]',
                'Default capture used locals by reference',
                'Dangerous if lambda escapes current scope',
              ],
              ['[k = expr]', 'Init-capture (C++14)', 'Supports std::move(unique_ptr) into lambda'],
              [
                '[*this]',
                'Capture copy of enclosing object (C++17)',
                'Safe for async callbacks outliving this',
              ],
            ],
          },
          example: {
            title: 'Explicit Captures, Init-Captures & mutable Lambdas',
            language: 'cpp',
            code: `#include <iostream>
#include <string>

int main() {
    double tax_rate{0.10};
    int calls{0};

    // Explicit value capture + reference capture + init-capture
    auto price_with_tax = [tax_rate, &calls, currency = std::string{"USD"}](double base) {
        ++calls;
        double total = base * (1.0 + tax_rate);
        std::cout << total << ' ' << currency << "\\n";
    };

    price_with_tax(50.0);
    price_with_tax(120.0);
    std::cout << "Total invocations: " << calls << "\\n";

    // mutable lets a value-captured counter increment internally
    auto next_id = [id = 100]() mutable { return ++id; };
    std::cout << "IDs: " << next_id() << ", " << next_id() << "\\n";
    return 0;
}`,
            output: `55 USD
132 USD
Total invocations: 2
IDs: 101, 102`,
          },
          warning:
            'Never return a lambda or pass it to an asynchronous thread/callback if it captures local variables by reference ([&] or [&x]). Once the enclosing function returns, those references dangle and invoke Undefined Behavior.',
        },
        {
          id: 'lambdas-with-stl-algorithms',
          heading: 'Lambdas with STL Algorithms & C++20 Projections',
          body: [
            'Lambdas pair naturally with <algorithm> functions like std::sort, std::count_if, and std::find_if. Because each lambda has a unique concrete type, template algorithms inline the lambda body directly into the loop—matching hand-written C loops in speed with zero function-pointer indirection.',
            'C++20’s std::ranges algorithms elevate this further: you can pass containers directly (no .begin(), .end() boilerplate) and supply a projection—such as a pointer-to-member &Product::price—so std::ranges::sort or std::ranges::max_element automatically compares by that field without even writing a custom comparator lambda.',
          ],
          points: [
            'Write std::ranges::sort(items, {}, &Product::price) to sort ascending by price in one readable line.',
            'Use std::ranges::greater{} as the second argument to sort descending.',
            'Reserve std::function<Ret(Args...)> for cases where you must store heterogeneous callables at runtime (e.g., an event callback map).',
          ],
          example: {
            title: 'std::ranges::sort with Projections & std::ranges::count_if',
            language: 'cpp',
            code: `#include <algorithm>
#include <functional>
#include <iostream>
#include <string>
#include <vector>

struct Product {
    std::string name;
    int price;
};

int main() {
    std::vector<Product> catalog{
        {"USB-C Cable", 12},
        {"NVMe SSD", 89},
        {"Mouse Pad", 18},
        {"4K Monitor", 320}
    };

    // Sort descending by price using a C++20 projection (&Product::price)
    std::ranges::sort(catalog, std::ranges::greater{}, &Product::price);

    auto premium_count = std::ranges::count_if(catalog, [](const Product& p) {
        return p.price >= 50;
    });

    std::cout << "Top item: " << catalog.front().name
              << " ($" << catalog.front().price << ")\\n";
    std::cout << "Items >= $50: " << premium_count << "\\n";
    return 0;
}`,
            output: `Top item: 4K Monitor ($320)
Items >= $50: 2`,
          },
          tip: 'When writing your own higher-order function that takes a callback, prefer template <typename Pred> void filter(Pred pred) over std::function so the compiler can inline the lambda with zero heap allocation.',
        },
        {
          id: 'cpp20-ranges-and-views',
          heading: 'Lazy Zero-Allocation Pipelines with C++20 Ranges & Views',
          body: [
            'Chaining traditional STL algorithms forced you to allocate temporary std::vector buffers between every filter and transform step. C++20 <ranges> introduces range adaptors (views) such as std::views::filter, std::views::transform, std::views::take, and std::views::reverse that compose cleanly left-to-right with the pipe operator (|).',
            'The magic of views is lazy evaluation: creating a pipeline does almost no work and allocates zero intermediate containers. Elements flow through the filter and transform stages one at a time only when you iterate over the view—and std::views::take(n) stops pulling upstream elements the moment n matches have been produced.',
          ],
          points: [
            'Common views in <ranges>: views::filter, views::transform, views::take, views::drop, views::reverse, views::iota.',
            'Lazy pipelines short-circuit: combining filter | transform | take(3) stops scanning as soon as 3 matching elements are found.',
            'Views are lightweight, O(1)-copyable, non-owning descriptors over an underlying range.',
          ],
          example: {
            title: 'Composable C++20 View Pipeline (filter | transform | take)',
            language: 'cpp',
            code: `#include <iostream>
#include <ranges>
#include <vector>

int main() {
    namespace views = std::views;
    std::vector<int> scores{42, 78, 91, 55, 84, 96, 63, 88};

    // Zero temporary vectors allocated; stops after 3 passing scores!
    auto curved_top3 = scores
        | views::filter([](int s) { return s >= 70; })
        | views::transform([](int s) { return s + 5; })
        | views::take(3);

    std::cout << "First 3 curved passing scores:";
    for (int s : curved_top3) {
        std::cout << ' ' << s;
    }
    std::cout << "\\n";
    return 0;
}`,
            output: `First 3 curved passing scores: 83 96 89`,
          },
          warning:
            'Because C++20 views are non-owning references, never return a view built over a local std::vector that is destroyed when the function exits—materialize the results into a new container before returning.',
        },
      ],
      challenge: {
        prompt:
          'Given std::vector<int> celsius{18, 25, 30, 12, 28, 35, 26}, build a C++20 ranges pipeline using std::views::filter (keep temps >= 25), std::views::transform (convert to Fahrenheit via c * 9 / 5 + 32), and std::views::take(3), then print each Fahrenheit value.',
        hint: 'Include <ranges>, <vector>, and <iostream>. Pipe celsius | std::views::filter(...) | std::views::transform(...) | std::views::take(3) and iterate with a range-based for loop.',
        language: 'cpp',
        solutionCode: `#include <iostream>
#include <ranges>
#include <vector>

int main() {
    namespace views = std::views;
    std::vector<int> celsius{18, 25, 30, 12, 28, 35, 26};

    auto hot_f = celsius
        | views::filter([](int c) { return c >= 25; })
        | views::transform([](int c) { return c * 9 / 5 + 32; })
        | views::take(3);

    for (int f : hot_f) {
        std::cout << f << "F\\n";
    }
    return 0;
}`,
      },
      quiz: [
        {
          question:
            'Why can capturing local variables with [&] be dangerous if the lambda is returned from a function?',
          options: [
            '[&] makes a deep copy of every variable in memory.',
            'The local variables are destroyed when the function returns, leaving the lambda with dangling references (Undefined Behavior).',
            '[&] forbids calling the lambda more than once.',
            'C++20 removed reference captures from lambdas.',
          ],
          answer: 1,
          explanation:
            'Reference captures do not extend the lifetime of local variables. If a lambda escapes the scope of variables it captured by reference, invoking it reads destroyed stack memory.',
        },
        {
          question:
            'How do C++20 range views (like std::views::filter | std::views::transform) execute?',
          options: [
            'Each stage eagerly allocates a brand-new std::vector in memory.',
            'They execute lazily on demand during iteration without allocating intermediate containers.',
            'They automatically spawn multiple CPU threads for every pipe operator.',
            'They modify the original std::vector in place.',
          ],
          answer: 1,
          explanation:
            'Views are lightweight, non-owning lazy adaptors. Elements are filtered and transformed on the fly as you iterate, allocating zero temporary vectors and stopping early with views::take.',
        },
      ],
    },
    km: {
      title: 'Lambdas, Captures និង C++20 Ranges',
      duration: '15 នាទី',
      summary:
        'សរសេរ C++ បែប functional ដ៏មានឥទ្ធិពលជាមួយ lambda capture lists, STL predicates និង projections គ្មានចំណាយបន្ថែម ព្រមទាំង lazy pipelines នៃ C++20 std::ranges និង std::views។',
      objectives: [
        'គ្រប់គ្រងអាយុកាលអថេរយ៉ាងត្រឹមត្រូវដោយ explicit captures ([x], [&x], [y = expr]) និងជៀសវាងកំហុស dangling reference។',
        'ប្រើ inline lambdas និង C++20 projections ជាមួយ STL algorithms ដោយមិនប្រើ std::function ដែលមានចំណាយបន្ថែម។',
        'ផ្គុំ lazy pipelines មិនបែងចែកអង្គចងចាំបណ្ដោះអាសន្នដោយ std::views::filter, std::views::transform និង std::views::take ជាមួយសញ្ញា |។',
      ],
      sections: [
        {
          id: 'lambda-syntax-and-captures',
          heading: 'កន្សោម Lambda, បញ្ជី Capture និង mutable',
          body: [
            'កន្សោម lambda ក្នុង C++—[captures](parameters) { body }—គឺជាអនុគមន៍គ្មានឈ្មោះ (closure) ដែល compiler បង្កើតជា object ឱ្យ។ វង់ក្រចកជ្រុង capture list កំណត់ថា lambda អាចប្រើអថេរខាងក្រៅណាខ្លះ៖ [x] ចម្លង x តាមតម្លៃ, [&x] ចាប់យក reference ទៅ x, [=] ចម្លងអថេរដែលប្រើតាមតម្លៃ និង [&] ចាប់យកតាម reference។',
            'ជាលំនាំដើម lambda ជា const ដូច្នេះអថេរដែលចម្លងតាមតម្លៃមិនអាចកែប្រែបានទេ លុះត្រាតែដាក់ពាក្យ mutable។ C++14 ក៏បានបន្ថែម init-capture ដូចជា [limit = max_val * 2] ឬ [ptr = std::move(uptr)] ដើម្បីគណនាតម្លៃ ឬផ្លាស់ទី move-only object ចូលក្នុង lambda ផ្ទាល់។',
          ],
          points: [
            'ប្រើ explicit captures ([threshold, &count]) ជាជាង [=] ឬ [&] ដើម្បីឱ្យដឹងច្បាស់ថា lambda ពឹងផ្អែកលើអ្វីខ្លះ។',
            'ប្រើ generic lambdas ([](const auto& item) { ... }) ពេល callback ខ្លីត្រូវប្រើជាមួយច្រើនប្រភេទ។',
            'lambda នីមួយៗមានប្រភេទផ្ទាល់ខ្លួនប្លែកពីគេ—សូមផ្ទុកវាក្នុង auto តាមដែលអាចធ្វើបាន។',
          ],
          table: {
            headers: ['វាក្យសម្ព័ន្ធ Capture', 'អត្ថន័យ', 'ចំណាំអាយុកាល / សុវត្ថិភាព'],
            rows: [
              ['[]', 'មិនចាប់យកអថេរខាងក្រៅទេ', 'សុវត្ថិភាពបំផុត បម្លែងជា function pointer បាន'],
              [
                '[x]',
                'ចាប់យក x តាមតម្លៃ (ចម្លង)',
                'ច្បាប់ចម្លងឯករាជ្យ ជា const លើកលែងដាក់ mutable',
              ],
              ['[&x]', 'ចាប់យក x តាម reference', 'មិនត្រូវរស់យូរជាង x ឡើយ'],
              ['[=]', 'ចម្លងអថេរដែលប្រើតាមតម្លៃ', 'អាចច្រឡំចម្លង container ធំដោយអចេតនា'],
              [
                '[&]',
                'ចាប់យកអថេរដែលប្រើតាម reference',
                'គ្រោះថ្នាក់បើ lambda ចាកចេញពី scope បច្ចុប្បន្ន',
              ],
              ['[k = expr]', 'Init-capture (C++14)', 'គាំទ្រ std::move(unique_ptr) ចូល lambda'],
              [
                '[*this]',
                'ចម្លង object ខាងក្រៅទាំងមូល (C++17)',
                'សុវត្ថិភាពសម្រាប់ async callbacks',
              ],
            ],
          },
          exampleTitle: 'Explicit Captures, Init-Captures និង mutable Lambdas',
          warning:
            'កុំត្រឡប់ lambda ឬបញ្ជូនវាទៅ async thread/callback ប្រសិនបើវាចាប់យកអថេរក្នុងអនុគមន៍តាម reference ([&] ឬ [&x])។ ពេលអនុគមន៍បញ្ចប់ reference ទាំងនោះនឹងក្លាយជា dangling ហើយបង្ក Undefined Behavior។',
        },
        {
          id: 'lambdas-with-stl-algorithms',
          heading: 'Lambdas ជាមួយ STL Algorithms និង C++20 Projections',
          body: [
            'Lambdas ស៊ីគ្នាយ៉ាងល្អជាមួយ <algorithm> ដូចជា std::sort, std::count_if និង std::find_if។ ដោយសារ lambda នីមួយៗមានប្រភេទជាក់លាក់ compiler អាច inline កូដ lambda ផ្ទាល់ចូលក្នុងរង្វិលជុំ ធ្វើឱ្យល្បឿនស្មើកូដ C សរសេរដោយដៃ។',
            'std::ranges algorithms ក្នុង C++20 កាន់តែងាយស្រួលទៀត៖ អ្នកអាចបញ្ជូន container ផ្ទាល់ (មិនបាច់ .begin(), .end()) និងផ្ដល់ projection ដូចជា &Product::price ដើម្បីឱ្យ std::ranges::sort ប្រៀបធៀបតាមវាលនោះភ្លាមដោយមិនបាច់សរសេរ comparator វែងទេ។',
          ],
          points: [
            'សរសេរ std::ranges::sort(items, {}, &Product::price) ដើម្បីតម្រៀបតាមតម្លៃពីតូចទៅធំក្នុងមួយបន្ទាត់។',
            'ប្រើ std::ranges::greater{} ជាប៉ារ៉ាម៉ែត្រទីពីរដើម្បីតម្រៀបពីធំទៅតូច។',
            'ទុក std::function<Ret(Args...)> សម្រាប់ករណីត្រូវផ្ទុក callbacks ចម្រុះប្រភេទនៅពេល runtime (ដូចជាតារាង event handlers)។',
          ],
          exampleTitle: 'std::ranges::sort ជាមួយ Projections និង std::ranges::count_if',
          tip: 'ពេលសរសេរអនុគមន៍ទទួល callback ផ្ទាល់ខ្លួន គួរប្រើ template <typename Pred> ជំនួស std::function ដើម្បីឱ្យ compiler អាច inline lambda ដោយមិនប្រើ heap។',
        },
        {
          id: 'cpp20-ranges-and-views',
          heading: 'Lazy Pipelines មិនបែងចែកអង្គចងចាំជាមួយ C++20 Ranges និង Views',
          body: [
            'ការភ្ជាប់ STL algorithms បែបចាស់តម្រូវឱ្យបង្កើត std::vector បណ្ដោះអាសន្នរវាងជំហាន filter និង transform នីមួយៗ។ C++20 <ranges> បាននាំយក range adaptors (views) ដូចជា std::views::filter, std::views::transform, std::views::take និង std::views::reverse ដែលភ្ជាប់គ្នាពីឆ្វេងទៅស្ដាំដោយសញ្ញាបំពង់ (|)។',
            'ចំណុចអស្ចារ្យរបស់ views គឺ lazy evaluation៖ ការបង្កើត pipeline មិនទាន់ដំណើរការ និងមិនបង្កើត container បណ្ដោះអាសន្នណាមួយឡើយ។ ធាតុនីមួយៗរត់ឆ្លងកាត់ filter និង transform ម្ដងមួយៗតែពេលអ្នករត់រង្វិលជុំ ហើយ std::views::take(n) ឈប់ភ្លាមពេលបានគ្រប់ n ធាតុ។',
          ],
          points: [
            'Views ពេញនិយមក្នុង <ranges>៖ views::filter, views::transform, views::take, views::drop, views::reverse, views::iota។',
            'Lazy pipelines ឈប់មុនពេលកំណត់៖ filter | transform | take(3) ឈប់ស្វែងរកភ្លាមក្រោយរកបាន 3 ធាតុ។',
            'Views មានទំហំស្រាល ចម្លងក្នុង O(1) និងមិនកាន់កាប់កម្មសិទ្ធិទិន្នន័យដើមទេ។',
          ],
          exampleTitle: 'C++20 View Pipeline (filter | transform | take)',
          warning:
            'ដោយសារ C++20 views មិនកាន់កាប់ទិន្នន័យដើម កុំត្រឡប់ view ដែលសាងលើ std::vector ក្នុងអនុគមន៍ដែលនឹងរលាយពេលចាកចេញ—ត្រូវប្រមូលលទ្ធផលចូល container ថ្មីមុននឹងត្រឡប់។',
        },
      ],
      challenge: {
        prompt:
          'ដោយមាន std::vector<int> celsius{18, 25, 30, 12, 28, 35, 26} សូមបង្កើត C++20 ranges pipeline ដោយប្រើ std::views::filter (រក្សាទុក >= 25), std::views::transform (បម្លែងជា Fahrenheit តាម c * 9 / 5 + 32) និង std::views::take(3) រួចបង្ហាញតម្លៃ Fahrenheit នីមួយៗ។',
        hint: 'បញ្ចូល <ranges>, <vector> និង <iostream>។ ភ្ជាប់ celsius | std::views::filter(...) | std::views::transform(...) | std::views::take(3) រួចរត់រង្វិលជុំ for-range។',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វីការចាប់យកអថេរក្នុងអនុគមន៍ដោយ [&] មានគ្រោះថ្នាក់ប្រសិនបើ lambda ត្រូវបានត្រឡប់ចេញពីអនុគមន៍?',
          options: [
            '[&] ធ្វើការចម្លងជ្រៅគ្រប់អថេរក្នុងអង្គចងចាំ។',
            'អថេរក្នុងអនុគមន៍ត្រូវបានរំលាយពេលអនុគមន៍បញ្ចប់ ធ្វើឱ្យ lambda កាន់ dangling references (Undefined Behavior)។',
            '[&] ហាមមិនឱ្យហៅ lambda លើសពីមួយដង។',
            'C++20 បានលុប reference captures ចោល។',
          ],
          answer: 1,
          explanation:
            'Reference captures មិនពន្យារអាយុកាលអថេរក្នុងអនុគមន៍ទេ។ បើ lambda ត្រូវបានហៅក្រោយអនុគមន៍បញ្ចប់ វានឹងអានអង្គចងចាំ stack ដែលរលាយរួចហើយ។',
        },
        {
          question:
            'តើ C++20 range views (ដូចជា std::views::filter | std::views::transform) ដំណើរការយ៉ាងដូចម្ដេច?',
          options: [
            'ជំហាននីមួយៗបង្កើត std::vector ថ្មីភ្លាមៗក្នុងអង្គចងចាំ។',
            'ពួកវាដំណើរការបែប lazy តាមតម្រូវការពេលរត់រង្វិលជុំ ដោយមិនបង្កើត container បណ្ដោះអាសន្នទេ។',
            'ពួកវាបង្កើត CPU threads ច្រើនដោយស្វ័យប្រវត្តិសម្រាប់សញ្ញា | នីមួយៗ។',
            'ពួកវាកែប្រែ std::vector ដើមផ្ទាល់។',
          ],
          answer: 1,
          explanation:
            'Views គឺជា lazy adaptors ស្រាលដែលមិនកាន់កាប់ទិន្នន័យ។ ធាតុត្រូវបានចម្រាញ់ និងបម្លែងភ្លាមៗពេលរត់រង្វិលជុំ ដោយមិនប្រើ vector បណ្ដោះអាសន្ន និងឈប់ឆាប់ជាមួយ views::take។',
        },
      ],
    },
  },
]
