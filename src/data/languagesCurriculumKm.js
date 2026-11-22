export const languageTracksKm = {
  python: {
    fullName: 'ការសរសេរកម្មវិធី Python',
    tagline: 'សរសេរកូដងាយអាន និងខ្លីស្អាតសម្រាប់ស្វ័យប្រវត្តិកម្ម API និងវិទ្យាសាស្ត្រទិន្នន័យ។',
    badge: 'Python',
    lessons: {
      'python-basics': {
        title: 'មូលដ្ឋានគ្រឹះ Python និងអថេរ',
        duration: '5 នាទី',
        summary:
          'ស្វែងយល់ពីការចូលបន្ទាត់ (indentation) ប្រភេទទិន្នន័យថាមវន្ត f-strings និងរចនាសម្ព័ន្ធគ្រប់គ្រងក្នុង Python។',
        sections: {
          'syntax-and-fstrings': {
            heading: 'វាក្យសម្ព័ន្ធស្អាត និង f-Strings',
            body: [
              'Python ប្រើការចូលបន្ទាត់ (indentation) ជំនួសឱ្យដង្កៀប {} ដើម្បីកំណត់ប្លុកកូដ។ អថេរត្រូវបានបង្កើតពេលផ្ដល់តម្លៃ ហើយ f-strings (f"...") អនុញ្ញាតឱ្យបញ្ចូលអថេរដោយផ្ទាល់ក្នុងអត្ថបទ។',
              'ប្រើទម្រង់ snake_case សម្រាប់ឈ្មោះអថេរ និងអនុគមន៍ ដើម្បីអនុវត្តតាមស្តង់ដារ PEP 8 របស់ Python។',
            ],
            exampleTitle: 'អថេរ f-Strings និងរង្វិលជុំ',
            tip: 'ប្រើ enumerate(items, start=1) ជំនួសឱ្យការបង្កើតអថេររាប់លេខរៀងដោយដៃក្នុងរង្វិលជុំ។',
          },
        },
      },
      'lists-and-dicts': {
        title: 'Lists, Dicts និង Comprehensions',
        duration: '6 នាទី',
        summary:
          'ប្រើប្រាស់បណ្ដុំទិន្នន័យស្នូលរបស់ Python និងបំប្លែងទិន្នន័យយ៉ាងខ្លីស្អាតដោយប្រើ comprehensions។',
        sections: {
          comprehensions: {
            heading: 'List និង Dictionary Comprehensions',
            body: [
              'List រក្សាទុកទិន្នន័យតាមលំដាប់ ចំណែក Dictionary ផ្គូផ្គង key ជាមួយតម្លៃដោយមានល្បឿនស្វែងរក O(1) ជាមធ្យម។ Comprehensions ជំនួសរង្វិលជុំវែងៗដោយកន្សោមមួយបន្ទាត់ដែលងាយអាន។',
            ],
            exampleTitle: 'ការត្រងពិន្ទុដោយប្រើ Comprehensions',
          },
        },
      },
      'functions-and-modules': {
        title: 'អនុគមន៍ និង Type Hints',
        duration: '6 នាទី',
        summary:
          'បង្កើតអនុគមន៍ដែលអាចប្រើឡើងវិញបាន ជាមួយតម្លៃលំនាំដើម តម្លៃត្រឡប់ និងការបញ្ជាក់ប្រភេទទិន្នន័យ (type hints)។',
        sections: {
          'typed-functions': {
            heading: 'អនុគមន៍មាន Type Annotations',
            body: [
              'ការបន្ថែម type hints (ដូចជា price: float -> float) ជួយឱ្យគម្រោង Python ធំៗងាយថែទាំ និងជួយឱ្យកម្មវិធីកែសម្រួលកូដរកឃើញកំហុសប្រភេទទិន្នន័យមុនពេលដំណើរការ។',
            ],
            exampleTitle: 'អនុគមន៍គណនាការបញ្ចុះតម្លៃមាន Type Hints',
            tip: 'កុំប្រើ list ឬ dict ទទេជាតម្លៃលំនាំដើមក្នុងប៉ារ៉ាម៉ែត្រ (ឧ. def add(items=[]))—ត្រូវប្រើ None រួចបង្កើតថ្មីនៅខាងក្នុងអនុគមន៍។',
          },
        },
      },
      'oop-and-files': {
        title: 'Classes និង Context Managers',
        duration: '6 នាទី',
        summary:
          'បង្កើតគំរូទិន្នន័យយ៉ាងស្អាតដោយប្រើ dataclasses និងគ្រប់គ្រងឯកសារដោយសុវត្ថិភាពជាមួយប្លុក with។',
        sections: {
          'dataclasses-and-with': {
            heading: 'Dataclasses និងការគ្រប់គ្រងធនធានដោយសុវត្ថិភាព',
            body: [
              'Decorator @dataclass បង្កើត __init__, __repr__ និងការប្រៀបធៀបស្មើគ្នាដោយស្វ័យប្រវត្តិ។ នៅពេលអាន ឬសរសេរឯកសារ ត្រូវប្រើពាក្យ with ជានិច្ច ដើម្បីឱ្យឯកសារបិទដោយស្វ័យប្រវត្តិទោះមានកំហុសកើតឡើងក៏ដោយ។',
            ],
            exampleTitle: 'Dataclass និង Context Manager',
          },
        },
      },
    },
  },
  c: {
    fullName: 'ការសរសេរកម្មវិធី C',
    tagline:
      'យល់ច្បាស់ពីអង្គចងចាំកម្រិតទាប pointers, structs និងរបៀបដែលកុំព្យូទ័រដំណើរការកូដផ្ទាល់។',
    badge: 'ប្រព័ន្ធ',
    lessons: {
      'c-basics': {
        title: 'មូលដ្ឋានគ្រឹះ C ប្រភេទទិន្នន័យ និង printf',
        duration: '5 នាទី',
        summary:
          'ស្វែងយល់ពីការបំប្លែងកូដ (compilation) ឯកសារ header អថេរមានប្រភេទថេរ និងការបង្ហាញលទ្ធផលជាមួយ printf។',
        sections: {
          'hello-c': {
            heading: 'រចនាសម្ព័ន្ធកម្មវិធី C',
            body: [
              'C គឺជាភាសាប្រព័ន្ធដែលត្រូវ compile និងមានប្រភេទទិន្នន័យច្បាស់លាស់។ រាល់កម្មវិធីចាប់ផ្ដើមដំណើរការនៅក្នុង int main(void) ហើយត្រឡប់តម្លៃ 0 ដើម្បីបង្ហាញថាដំណើរការជោគជ័យ។',
              'បញ្ចូល <stdio.h> សម្រាប់អនុគមន៍បញ្ចូល/បង្ហាញដូចជា printf ដោយប្រើ %d (int), %.2f (float/double) និង %s (string)។',
            ],
            exampleTitle: 'អថេរ និងការបង្ហាញទម្រង់ printf',
            tip: 'Compile ដោយបើកការព្រមានទាំងអស់ (gcc -Wall -Wextra -Werror main.c -o app) ដើម្បីឱ្យ compiler ចាប់កំហុសលាក់កំបាំងបានឆាប់។',
          },
        },
      },
      'pointers-and-memory': {
        title: 'Pointers និងអាសយដ្ឋានអង្គចងចាំ',
        duration: '7 នាទី',
        summary:
          'អាន និងកែប្រែអង្គចងចាំដោយផ្ទាល់ដោយប្រើ address-of (&), dereference (*) និងការបញ្ជូន pointer ទៅអនុគមន៍។',
        sections: {
          'pointer-fundamentals': {
            heading: 'Address-Of (&) និង Dereference (*)',
            body: [
              'Pointer រក្សាទុកអាសយដ្ឋានអង្គចងចាំរបស់អថេរមួយទៀត។ ការបញ្ជូន pointer ទៅអនុគមន៍អនុញ្ញាតឱ្យអនុគមន៍នោះកែប្រែតម្លៃដើមដោយផ្ទាល់ ដោយមិនចាំបាច់ចម្លងទិន្នន័យធំៗឡើយ។',
            ],
            exampleTitle: 'ការប្ដូរតម្លៃគ្នាដោយប្រើ Pointers',
            tip: 'កំណត់តម្លៃដំបូងរបស់ pointer ជា NULL ជានិច្ចប្រសិនបើវាមិនទាន់ចង្អុលទៅអង្គចងចាំត្រឹមត្រូវ ហើយពិនិត្យ NULL មុនពេលប្រើ។',
          },
        },
      },
      'arrays-and-strings': {
        title: 'Arrays និង C Strings',
        duration: '6 នាទី',
        summary:
          'ធ្វើការដោយសុវត្ថិភាពជាមួយ array ទំហំថេរ និង char arrays ដែលបញ្ចប់ដោយ null ដោយជៀសវាង buffer overflow។',
        sections: {
          'null-terminated-strings': {
            heading: 'Array តួអក្សរដែលបញ្ចប់ដោយ Null',
            body: [
              "ក្នុងភាសា C អត្ថបទ (string) គឺជា array នៃ char ដែលបញ្ចប់ដោយតួអក្សរ null '\\0'។ ត្រូវបញ្ជូនប្រវែង array ទៅជាមួយប៉ារ៉ាម៉ែត្រ array ជានិច្ច ដើម្បីកុំឱ្យរង្វិលជុំអានលើសដែនកំណត់អង្គចងចាំ។",
            ],
            exampleTitle: 'ការបូកសរុប Array ដោយសុវត្ថិភាព',
          },
        },
      },
      'structs-and-malloc': {
        title: 'Structs និងអង្គចងចាំថាមវន្ត (malloc)',
        duration: '7 នាទី',
        summary:
          'ផ្ដុំទិន្នន័យពាក់ព័ន្ធជាមួយ struct និងកក់អង្គចងចាំលើ heap ដោយប្រើ malloc និង free។',
        sections: {
          'heap-allocation': {
            heading: 'Structs, malloc និង free',
            body: [
              'ប្រើ typedef struct ដើម្បីបង្កើតកំណត់ត្រាទិន្នន័យ និងប្រើ malloc() ពី <stdlib.h> នៅពេលទំហំដឹងតែពេលដំណើរការ។ រាល់ malloc() ត្រូវតែមាន free() គូនឹងវាដើម្បីការពារការលេចធ្លាយអង្គចងចាំ (memory leak)។',
            ],
            exampleTitle: 'ការកក់ និងដោះលែងអង្គចងចាំ Struct',
          },
        },
      },
    },
  },
  cpp: {
    fullName: 'C++ ទំនើប (Modern C++)',
    tagline: 'ផ្សំល្បឿនខ្ពស់បំផុតជាមួយ STL containers, RAII និងការសរសេរកម្មវិធីបែប Generic។',
    badge: 'ប្រព័ន្ធ / OOP',
    lessons: {
      'cpp-modern-basics': {
        title: 'មូលដ្ឋានគ្រឹះ C++ ទំនើប',
        duration: '5 នាទី',
        summary: 'សរសេរ C++ ទំនើបយ៉ាងស្អាតដោយប្រើ std::string, references, auto និង const។',
        sections: {
          'references-and-auto': {
            heading: 'References, auto និង std::string',
            body: [
              'C++ ទំនើប (C++17/C++20) ផ្ដល់អាទិភាពលើ std::string ជំនួសឱ្យ char pointer ដើម និងប្រើ const reference (const std::string&) ដើម្បីជៀសវាងការចម្លងទិន្នន័យមិនចាំបាច់។',
            ],
            exampleTitle: 'ការប្រើ Const References និង auto',
          },
        },
      },
      'stl-vectors-and-maps': {
        title: 'STL Vectors និង Hash Maps',
        duration: '6 នាទី',
        summary:
          'រក្សាទុកបញ្ជីទិន្នន័យថាមវន្តជាមួយ std::vector និងស្វែងរកតាម key រហ័សជាមួយ std::unordered_map។',
        sections: {
          'stl-containers': {
            heading: 'std::vector និង Range-Based Loops',
            body: [
              'std::vector គឺជា dynamic array លំនាំដើមក្នុង C++ ដែលរក្សាទិន្នន័យជាប់គ្នាក្នុងអង្គចងចាំ និងបង្កើនទំហំដោយស្វ័យប្រវត្តិ។ ផ្សំវាជាមួយ range-based for និង std::unordered_map សម្រាប់ការស្វែងរកលឿន។',
            ],
            exampleTitle: 'Vector និង Unordered Map',
          },
        },
      },
      'classes-and-raii': {
        title: 'Classes, RAII និង Smart Pointers',
        duration: '7 នាទី',
        summary:
          'គ្រប់គ្រងអាយុកាលអង្គចងចាំដោយស្វ័យប្រវត្តិជាមួយ RAII និង std::unique_ptr ជំនួសឱ្យ new/delete ដោយដៃ។',
        sections: {
          'raii-smart-pointers': {
            heading: 'RAII និង std::unique_ptr',
            body: [
              'RAII (Resource Acquisition Is Initialization) ភ្ជាប់កម្មសិទ្ធិធនធានជាមួយអាយុកាលរបស់ object៖ កក់ធនធានក្នុង constructor ហើយដោះលែងដោយស្វ័យប្រវត្តិក្នុង destructor។',
              'គួរប្រើ std::make_unique ជំនួសឱ្យ new និង delete ដើម្បីធានាថាអង្គចងចាំត្រូវបានដោះលែងពេលចាកចេញពី scope។',
            ],
            exampleTitle: 'Class ជាមួយ std::unique_ptr',
            tip: 'អនុវត្តតាម Rule of Zero៖ ប្រើ STL containers និង smart pointers ដើម្បីកាត់បន្ថយការសរសេរ destructor ដោយដៃ។',
          },
        },
      },
      'templates-and-algorithms': {
        title: 'Templates និង STL Algorithms',
        duration: '6 នាទី',
        summary:
          'សរសេរកូដប្រើបានគ្រប់ប្រភេទទិន្នន័យជាមួយ templates និងផ្សំ <algorithm> ជាមួយ lambdas។',
        sections: {
          'generic-algorithms': {
            heading: 'Templates និង std::sort ជាមួយ Lambdas',
            body: [
              'Templates អនុញ្ញាតឱ្យសរសេរអនុគមន៍តែមួយដែលអាចដំណើរការជាមួយប្រភេទទិន្នន័យណាក៏បានដោយគ្មានការធ្លាក់ចុះល្បឿន។ ក្បួនដោះស្រាយស្តង់ដារដូចជា std::sort អាចទទួល lambda បានយ៉ាងងាយ។',
            ],
            exampleTitle: 'Generic Max និងការតម្រៀបដោយ Lambda',
          },
        },
      },
    },
  },
  java: {
    fullName: 'ការអភិវឌ្ឍន៍ជាមួយ Java',
    tagline:
      'បង្កើតសេវាកម្ម Backend កម្រិតសហគ្រាសដែលរឹងមាំ ជាមួយប្រភេទទិន្នន័យច្បាស់លាស់ OOP និង JVM។',
    badge: 'OOP / JVM',
    lessons: {
      'java-basics': {
        title: 'មូលដ្ឋានគ្រឹះ Java និង Strong Typing',
        duration: '5 នាទី',
        summary:
          'ស្វែងយល់ពី Java classes ប្រភេទទិន្នន័យតឹងរ៉ឹង primitives ធៀបនឹង objects និងការប្រើ var។',
        sections: {
          'java-entry': {
            heading: 'Classes ប្រភេទទិន្នន័យ និង main()',
            body: [
              'Java បំប្លែងកូដទៅជា bytecode ដែលអាចដំណើរការលើគ្រប់ប្រព័ន្ធដែលមាន Java Virtual Machine (JVM)។ រាល់កូដស្ថិតនៅក្នុង class ហើយ Java ទំនើបគាំទ្រ var សម្រាប់អថេរក្នុងអនុគមន៍។',
            ],
            exampleTitle: 'កម្មវិធី Java មូលដ្ឋាន',
          },
        },
      },
      'oop-classes-interfaces': {
        title: 'Interfaces និង Java Records',
        duration: '6 នាទី',
        summary: 'រចនាកិច្ចសន្យាកូដស្អាតជាមួយ interfaces និងកាត់បន្ថយកូដដដែលៗដោយប្រើ Java records។',
        sections: {
          'records-and-interfaces': {
            heading: 'Records មិនអាចកែប្រែ និង Polymorphism',
            body: [
              'Interface កំណត់កិច្ចសន្យានៃសកម្មភាពដោយមិនចងភ្ជាប់អ្នកហៅទៅនឹង class ជាក់លាក់មួយឡើយ។ Java record បង្កើត class ផ្ទុកទិន្នន័យដែលមិនអាចកែប្រែបាន ដោយមាន constructor, getters, equals និង toString ស្វ័យប្រវត្តិ។',
            ],
            exampleTitle: 'ឧទាហរណ៍ Interface និង Record',
          },
        },
      },
      'collections-and-streams': {
        title: 'Collections និង Streams API',
        duration: '6 នាទី',
        summary: 'ត្រង បំប្លែង និងសរុបទិន្នន័យក្នុង List និង Map យ៉ាងស្អាតដោយប្រើ Streams API។',
        sections: {
          'java-streams': {
            heading: 'បំពង់បំប្លែងទិន្នន័យបែប Declarative',
            body: [
              'List, Set និង Map ជាគ្រឹះសម្រាប់ផ្ទុកទិន្នន័យប្រចាំថ្ងៃក្នុង Java។ ផ្សំវាជាមួយ .stream() ដើម្បីត្រង បំប្លែង និងតម្រៀបទិន្នន័យយ៉ាងច្បាស់លាស់ដោយមិនកែប្រែបញ្ជីដើម។',
            ],
            exampleTitle: 'ការត្រង និងបំប្លែងទិន្នន័យជាមួយ Streams',
          },
        },
      },
      'exceptions-and-generics': {
        title: 'Exceptions និង Optional<T>',
        duration: '6 នាទី',
        summary:
          'គ្រប់គ្រងកំហុសដោយប្រើ try-catch និងជៀសវាង NullPointerException ដោយប្រើ Optional<T>។',
        sections: {
          'optional-safety': {
            heading: 'តម្លៃត្រឡប់សុវត្ថិភាពជាមួយ Optional',
            body: [
              'ការត្រឡប់ Optional<T> បញ្ជាក់យ៉ាងច្បាស់ថាការស្វែងរកអាចរកមិនឃើញតម្លៃ ដែលជំរុញឱ្យប្រើតម្លៃជំនួសដោយសុវត្ថិភាពជាមួយ orElse() ជំនួសឱ្យការពិនិត្យ null ដែលងាយភ្លេច។',
            ],
            exampleTitle: 'ការប្រើប្រាស់ Optional និង Try-Catch',
            tip: 'ប្រើ try-with-resources (try (var reader = ...)) សម្រាប់ឯកសារ និងការភ្ជាប់មូលដ្ឋានទិន្នន័យ ដើម្បីឱ្យវាបិទដោយស្វ័យប្រវត្តិ។',
          },
        },
      },
    },
  },
  csharp: {
    fullName: 'C# និង .NET',
    tagline:
      'បង្កើត Web APIs កម្មវិធីកុំព្យូទ័រ និងហ្គេម Unity ជាមួយ C# ទំនើប LINQ និង async/await។',
    badge: '.NET / OOP',
    lessons: {
      'csharp-basics': {
        title: 'មូលដ្ឋានគ្រឹះ C# និង Nullable Types',
        duration: '5 នាទី',
        summary:
          'សរសេរ C# ខ្លីស្អាតជាមួយ top-level statements, string interpolation និងសុវត្ថិភាព nullable។',
        sections: {
          'modern-csharp': {
            heading: 'Top-Level Statements និងសុវត្ថិភាព Null',
            body: [
              'C# ទំនើបកាត់បន្ថយកូដដដែលៗជាមួយ top-level statements និង interpolated strings ($"...")។ ប្រភេទ nullable (string?) និងប្រមាណវិធី ?? ជួយការពារកំហុស null មុនពេលដំណើរការ។',
            ],
            exampleTitle: 'String Interpolation និង Null-Coalescing',
          },
        },
      },
      'classes-records-properties': {
        title: 'Properties, Records និង Pattern Matching',
        duration: '6 នាទី',
        summary: 'រចនាគំរូទិន្នន័យស្អាតជាមួយ properties, records និង switch expressions។',
        sections: {
          'records-and-switch': {
            heading: 'Records និង Switch Expressions',
            body: [
              'C# records ផ្ដល់ការប្រៀបធៀបតាមតម្លៃ និងការចម្លងដោយមិនកែដើមតាមពាក្យ with។ ផ្សំវាជាមួយ switch expressions ដើម្បីសរសេរលក្ខខណ្ឌច្បាស់លាស់ និងពេញលេញ។',
            ],
            exampleTitle: 'Record និង Switch Expression',
          },
        },
      },
      'linq-and-collections': {
        title: 'LINQ និង Generic Collections',
        duration: '6 នាទី',
        summary: 'សួរ ត្រង តម្រៀប និងបំប្លែងទិន្នន័យក្នុង collections យ៉ាងស្អាតជាមួយ LINQ។',
        sections: {
          'linq-queries': {
            heading: 'ការប្រើ Where, OrderBy និង Select',
            body: [
              'LINQ (Language Integrated Query) ផ្ដល់វិធីសាស្ត្ររួម និងមានសុវត្ថិភាពប្រភេទទិន្នន័យសម្រាប់បំប្លែង collections, JSON និងមូលដ្ឋានទិន្នន័យដោយប្រើខ្សែសង្វាក់អនុគមន៍ដែលងាយអាន។',
            ],
            exampleTitle: 'ការភ្ជាប់អនុគមន៍ LINQ',
          },
        },
      },
      'async-await-dotnet': {
        title: 'Async/Await និង Tasks',
        duration: '6 នាទី',
        summary:
          'រក្សាកម្មវិធីឱ្យដើរលឿន និងម៉ាស៊ីនមេទទួលសំណើបានច្រើនជាមួយ async Task<T>, await និង Task.WhenAll។',
        sections: {
          'tasks-concurrency': {
            heading: 'ប្រតិបត្តិការមិនរាំងស្ទះជាមួយ async និង await',
            body: [
              'ដាក់ async Task<T> និង await លើប្រតិបត្តិការ I/O ដើម្បីដោះលែង thread ឱ្យធ្វើការងារផ្សេងពេលកំពុងរង់ចាំ។ ដំណើរការកិច្ចការឯករាជ្យព្រមគ្នាដោយប្រើ Task.WhenAll។',
            ],
            exampleTitle: 'ការដំណើរការ Tasks ព្រមគ្នា',
            tip: 'ត្រូវប្រើ await លើ Task ជានិច្ច ជំនួសឱ្យការហៅ .Result ឬ .Wait() ដែលអាចបង្កឱ្យកម្មវិធីគាំង (deadlock)។',
          },
        },
      },
    },
  },
}

export const languageResourcesKm = {
  'python-docs': {
    title: 'មេរៀនផ្លូវការ Python 3',
    type: 'មគ្គុទ្ទេសក៍',
    description:
      'មគ្គុទ្ទេសក៍ផ្លូវការពេញលេញ គ្របដណ្ដប់លើវាក្យសម្ព័ន្ធ Python បណ្ណាល័យស្តង់ដារ ម៉ូឌុល និង classes។',
  },
  'cppreference-c': {
    title: 'cppreference — បណ្ណាល័យស្តង់ដារ C',
    type: 'ឯកសារយោង',
    description:
      'ឯកសារយោងផ្លូវការសម្រាប់ C headers អនុគមន៍អង្គចងចាំ pointers និងលក្ខណៈបច្ចេកទេសភាសា C។',
  },
  'cppreference-cpp': {
    title: 'cppreference — ឯកសារយោង C++ ទំនើប',
    type: 'ឯកសារយោង',
    description:
      'ឯកសារយោងពេញលេញសម្រាប់ C++ STL containers, smart pointers, templates និង algorithms។',
  },
  'dev-java': {
    title: 'Dev.java — រៀនភាសា Java',
    type: 'មគ្គុទ្ទេសក៍',
    description:
      'គេហទំព័រសិក្សា Java ផ្លូវការ គ្របដណ្ដប់លើ OOP, records, streams, generics និងឧបករណ៍ JVM។',
  },
  'ms-learn-csharp': {
    title: 'Microsoft Learn — ឯកសារ C# និង .NET',
    type: 'ឯកសារយោង',
    description:
      'មគ្គុទ្ទេសក៍ផ្លូវការសម្រាប់ C# និង .NET គ្របដណ្ដប់លើ LINQ, async/await, pattern matching និង ASP.NET Core។',
  },
  'w3schools-python': {
    title: 'មេរៀន Python របស់ W3Schools',
    type: 'មគ្គុទ្ទេសក៍',
    description:
      'ឯកសារយោង Python ងាយយល់សម្រាប់អ្នកចាប់ផ្ដើម គ្របដណ្ដប់លើវាក្យសម្ព័ន្ធ បញ្ជី អនុគមន៍ និង classes។',
  },
  'w3schools-c': {
    title: 'មេរៀន C របស់ W3Schools',
    type: 'មគ្គុទ្ទេសក៍',
    description: 'ឯកសារយោងភាសា C ជាជំហានៗ គ្របដណ្ដប់លើអថេរ រង្វិលជុំ arrays, pointers និង structs។',
  },
  'w3schools-cpp': {
    title: 'មេរៀន C++ របស់ W3Schools',
    type: 'មគ្គុទ្ទេសក៍',
    description:
      'ឯកសារយោង C++ មានរចនាសម្ព័ន្ធ គ្របដណ្ដប់លើ OOP, classes, references និង STL containers។',
  },
  'w3schools-java': {
    title: 'មេរៀន Java របស់ W3Schools',
    type: 'មគ្គុទ្ទេសក៍',
    description:
      'មគ្គុទ្ទេសក៍ Java អនុវត្តផ្ទាល់ គ្របដណ្ដប់លើ methods, OOP, ArrayList, HashMap និង exceptions។',
  },
  'w3schools-csharp': {
    title: 'មេរៀន C# របស់ W3Schools',
    type: 'មគ្គុទ្ទេសក៍',
    description:
      'មេរៀន C# ច្បាស់លាស់ គ្របដណ្ដប់លើប្រភេទទិន្នន័យ methods, OOP, properties និង interfaces។',
  },
}
