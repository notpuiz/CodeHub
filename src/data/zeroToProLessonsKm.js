export const zeroToProLessonsKm = {
  html: {
    'accessibility-and-seo': {
      title: 'ភាពងាយស្រួលប្រើប្រាស់ (ARIA), SEO និងល្បឿន',
      duration: '7 នាទី',
      summary:
        'សរសេរ HTML កម្រិតផលិតកម្មជាមួយ ARIA live regions ការគាំទ្រក្ដារចុច SEO metadata និងរូបភាព lazy-load។',
      sections: {
        'aria-and-metadata': {
          heading: 'Landmarks, ARIA និងរូបភាពដំណើរការលឿន',
          body: [
            'HTML កម្រិតជំនាញមិនមែនត្រឹមតែរូបរាងប៉ុណ្ណោះទេ៖ ត្រូវប្រើធាតុដើម (<button>, <a href>) ដាក់ aria-label លើប៊ូតុងដែលមានតែរូបតំណាង និងប្រើ aria-live="polite" ដើម្បីប្រកាសការផ្លាស់ប្ដូរស្ថានភាព។',
            'សម្រាប់ SEO និងល្បឿន សូមបន្ថែម <meta name="description"> ហើយកំណត់ width/height និង loading="lazy" លើរូបភាពដើម្បីការពារការរង្គើប្លង់ (CLS)។',
          ],
          exampleTitle: 'ស្ថានភាពងាយស្រួលប្រើប្រាស់ និងរូបភាព Lazy',
          tip: 'ប្រើធាតុ HTML ដើមជាមុនជានិច្ច—ប្រើ ARIA តែនៅពេលគ្មានធាតុដើមណាអាចបង្ហាញតួនាទីនោះបាន។',
        },
      },
    },
  },
  css: {
    'css-from-zero': {
      title: 'របៀបដែល CSS ដំណើរការ',
      duration: '4 នាទី',
      summary:
        'មិនធ្លាប់សរសេរ CSS ពីមុនមែនទេ? ស្វែងយល់ពីច្បាប់ CSS លក្ខណៈសម្បត្តិ តម្លៃ និងការភ្ជាប់ឯកសារស្ទីល។',
      sections: {
        'first-css-rule': {
          heading: 'ច្បាប់ CSS ដំបូងរបស់អ្នក',
          body: [
            'CSS (Cascading Style Sheets) គ្រប់គ្រងរូបរាងរបស់ HTML ដូចជាពណ៌ ពុម្ពអក្សរ គម្លាត និងប្លង់។ រាល់ច្បាប់មាន selector (ធាតុគោលដៅ) និងការប្រកាសស្ទីលនៅក្នុង { } (property: value;)។',
            'ក្នុងគម្រោងពិត សូមដាក់ CSS ក្នុងឯកសារ styles.css ដាច់ដោយឡែក ហើយភ្ជាប់ក្នុង <head> ដោយប្រើ <link rel="stylesheet" href="styles.css" />។',
          ],
          exampleTitle: 'កាតរចនាស្ទីលដំបូង',
        },
      },
    },
    'design-tokens-and-motion': {
      title: 'CSS Variables, Theming និងចលនារលូន',
      duration: '7 នាទី',
      summary:
        'បង្កើតប្រព័ន្ធរចនាដែលអាចពង្រីកបានជាមួយ CSS custom properties ការប្ដូរ Theme និងចលនា 60fps។',
      sections: {
        'tokens-and-composited-motion': {
          heading: 'Design Tokens និងចលនា 60fps',
          body: [
            'កំណត់ពណ៌ គម្លាត និងខ្សែកោងចលនាជា CSS custom properties (--surface, --accent, --ease-out) នៅលើ :root ដើម្បីប្ដូរ Theme ដោយគ្រាន់តែប្ដូរ class មួយ។',
            'ដើម្បីឱ្យចលនារលូន ត្រូវធ្វើចលនាតែលើ transform និង opacity—កុំធ្វើចលនាលើ width, height, top ឬ left ហើយត្រូវគោរព prefers-reduced-motion។',
          ],
          exampleTitle: 'កាតប្ដូរ Theme ជាមួយ Design Tokens',
        },
      },
    },
  },
  javascript: {
    'js-from-zero': {
      title: 'JavaScript ដំបូង និងតក្កវិជ្ជា',
      duration: '5 នាទី',
      summary:
        'ចាប់ផ្ដើមពីសូន្យដោយគ្មានបទពិសោធន៍៖ បង្ហាញលទ្ធផល សម្រេចចិត្តជាមួយ if/else និងប្រើរង្វិលជុំ។',
      sections: {
        'first-js-logic': {
          heading: 'ការបង្ហាញលទ្ធផល លក្ខខណ្ឌ និងរង្វិលជុំ',
          body: [
            'JavaScript គឺជាភាសាសរសេរកម្មវិធីរបស់កម្មវិធីរុករក។ ចាប់ផ្ដើមដោយបង្ហាញលទ្ធផលជាមួយ console.log() ជ្រើសរើសផ្លូវជាមួយ if / else និងធ្វើសកម្មភាពដដែលៗជាមួយរង្វិលជុំ for។',
          ],
          exampleTitle: 'លក្ខខណ្ឌ និងរង្វិលជុំពីមូលដ្ឋាន',
        },
      },
    },
    'async-await-and-modules': {
      title: 'Async/Await, Promises និងការគ្រប់គ្រងកំហុស',
      duration: '7 នាទី',
      summary:
        'ស្ទាត់ជំនាញ JavaScript បែប asynchronous ជាមួយ async/await, Promise.all និង try/catch។',
      sections: {
        'async-patterns': {
          heading: 'សំណើព្រមគ្នា និងការចាប់កំហុសដោយសុវត្ថិភាព',
          body: [
            'កម្មវិធីពិតប្រាកដតែងតែរង់ចាំទិន្នន័យពី API។ ប្រើ async/await ដើម្បីឱ្យកូដងាយអាន គ្របដោយ try/catch និងប្រើ Promise.all ដើម្បីដំណើរការសំណើឯករាជ្យព្រមគ្នា។',
          ],
          exampleTitle: 'គំរូទាញទិន្នន័យព្រមគ្នាជាមួយ Promise.all',
          tip: 'សំណើ 250ms ពីរដែលរង់ចាំម្ដងមួយចំណាយ ~500ms ប៉ុន្តែជាមួយ Promise.all() វាបញ្ចប់ព្រមគ្នាក្នុង ~250ms។',
        },
      },
    },
  },
  python: {
    'python-from-zero': {
      title: 'កម្មវិធីដំបូង និងលំហូរគ្រប់គ្រង',
      duration: '5 នាទី',
      summary:
        'សរសេរកម្មវិធី Python ដំបូងរបស់អ្នកពីសូន្យ—បង្ហាញអត្ថបទ សម្រេចចិត្តជាមួយ if/elif/else និងប្រើរង្វិលជុំ។',
      sections: {
        'first-python-script': {
          heading: 'កម្មវិធី Python ដំបូងរបស់អ្នក',
          body: [
            'Python ងាយអានស្រដៀងភាសាអង់គ្លេសធម្មតា ដែលជាភាសាដ៏ល្អបំផុតសម្រាប់ចាប់ផ្ដើមពី 0។ ប្រើ print() ដើម្បីបង្ហាញលទ្ធផល ប្រើ if / elif / else សម្រាប់លក្ខខណ្ឌ និង for ... in range() សម្រាប់រង្វិលជុំ។',
          ],
          exampleTitle: 'Hello World លក្ខខណ្ឌ និងរង្វិលជុំ',
        },
      },
    },
    'python-async-and-apis': {
      title: 'Asyncio និងរចនាសម្ព័ន្ធកម្រិតផលិតកម្ម',
      duration: '7 នាទី',
      summary:
        'សរសេរសេវាកម្ម Python ល្បឿនលឿនដោយប្រើ asyncio.gather, type safety និងបរិយាកាស virtual environment។',
      sections: {
        'asyncio-concurrency': {
          heading: 'ការងារព្រមគ្នាជាមួយ asyncio',
          body: [
            'សម្រាប់ប្រព័ន្ធ Backend ដែលមានសំណើច្រើន (HTTP APIs, មូលដ្ឋានទិន្នន័យ) event loop របស់ asyncio អាចដំណើរការកិច្ចការរាប់រយព្រមគ្នាយ៉ាងរលូនដោយប្រើ async def, await និង asyncio.gather()។',
          ],
          exampleTitle: 'ការហៅសេវាកម្មព្រមគ្នាជាមួយ asyncio',
          tip: 'បំបែកបណ្ណាល័យគម្រោងជានិច្ចដោយប្រើ virtual environment (python -m venv .venv)។',
        },
      },
    },
  },
  c: {
    'c-control-flow-functions': {
      title: 'លំហូរគ្រប់គ្រង រង្វិលជុំ និងអនុគមន៍',
      duration: '5 នាទី',
      summary:
        'បង្កើតតក្កវិជ្ជាក្នុងភាសា C ដោយប្រើ if/else, for/while និងអនុគមន៍ដែលអាចប្រើឡើងវិញបាន។',
      sections: {
        'c-loops-and-functions': {
          heading: 'លក្ខខណ្ឌ រង្វិលជុំ និងអនុគមន៍',
          body: [
            'ក្នុងភាសា C សូមប្រកាសអនុគមន៍ជំនួយនៅពីលើ main() (ឬក្នុងឯកសារ header) ដើម្បីឱ្យ compiler ស្គាល់ប្រភេទទិន្នន័យមុនពេលហៅប្រើ។',
          ],
          exampleTitle: 'រង្វិលជុំ និងអនុគមន៍ជំនួយក្នុង C',
        },
      },
    },
    'c-headers-and-safety': {
      title: 'ឯកសារ Header កូដកំហុស និងសុវត្ថិភាពអង្គចងចាំ',
      duration: '7 នាទី',
      summary:
        'រៀបចំគម្រោង C កម្រិតផលិតកម្មជាមួយ header guards ការត្រឡប់ស្ថានភាពកំហុស និង AddressSanitizer។',
      sections: {
        'production-c-habits': {
          heading: 'Header Guards និងការគ្រប់គ្រងកំហុសច្បាស់លាស់',
          body: [
            'គម្រោង C កម្រិតជំនាញបំបែកឯកសារ .h និង .c ត្រឡប់ស្ថានភាពកំហុសច្បាស់លាស់ និងធ្វើតេស្តជាមួយ AddressSanitizer (-fsanitize=address,undefined) ដើម្បីចាប់បញ្ហាអង្គចងចាំភ្លាមៗ។',
          ],
          exampleTitle: 'អនុគមន៍ចែកលេខមានសុវត្ថិភាពជាមួយ Status Code',
          tip: 'ធ្វើតេស្តដោយប្រើ gcc -Wall -Wextra -fsanitize=address,undefined មុនពេលដាក់ប្រើប្រាស់។',
        },
      },
    },
  },
  cpp: {
    'cpp-from-zero': {
      title: 'កម្មវិធី C++ ដំបូង និងរង្វិលជុំ',
      duration: '5 នាទី',
      summary:
        'ចាប់ផ្ដើម C++ ពីសូន្យ៖ បង្ហាញលទ្ធផលជាមួយ std::cout ប្រើអថេរ លក្ខខណ្ឌ if/else និងរង្វិលជុំ។',
      sections: {
        'first-cpp-program': {
          heading: 'Hello World ប្រភេទទិន្នន័យ និងរង្វិលជុំ',
          body: [
            'រាល់កម្មវិធី C++ ចាប់ផ្ដើមនៅក្នុង main()។ ប្រើ <iostream> និង std::cout ដើម្បីបង្ហាញអត្ថបទ ប្រកាសអថេរ int ឬ double និងប្រើរង្វិលជុំ for។',
          ],
          exampleTitle: 'កម្មវិធី C++ ដំបូង',
        },
      },
    },
    'cpp-move-and-concurrency': {
      title: 'Move Semantics, Views និង Concurrency',
      duration: '7 នាទី',
      summary:
        'លុបបំបាត់ការចម្លងទិន្នន័យឥតប្រយោជន៍ជាមួយ std::move និង std::string_view និងការពារ thread ជាមួយ std::scoped_lock។',
      sections: {
        'zero-copy-and-threads': {
          heading: 'Zero-Copy Views និងសុវត្ថិភាព Thread',
          body: [
            'ក្នុង C++ ល្បឿនខ្ពស់ សូមប្រើ std::string_view សម្រាប់អានអត្ថបទដោយមិនចាំបាច់ចម្លង និងប្រើ std::scoped_lock ដើម្បីការពារទិន្នន័យរួមរវាង threads ដោយស្វ័យប្រវត្តិ។',
          ],
          exampleTitle: 'គំរូ std::string_view និង Scoped Lock',
        },
      },
    },
  },
  java: {
    'java-control-flow-methods': {
      title: 'លំហូរគ្រប់គ្រង រង្វិលជុំ និង Methods',
      duration: '5 នាទី',
      summary: 'សរសេរលក្ខខណ្ឌ រង្វិលជុំ និង methods ដែលអាចប្រើឡើងវិញបានយ៉ាងស្អាតក្នុង Java។',
      sections: {
        'java-methods-flow': {
          heading: 'Switch Expressions រង្វិលជុំ និង Methods',
          body: [
            'បំបែកកម្មវិធីជា methods តូចៗដែលមានឈ្មោះច្បាស់លាស់។ Switch expressions ក្នុង Java ទំនើបត្រឡប់តម្លៃយ៉ាងស្អាតដោយគ្មានកំហុស fall-through។',
          ],
          exampleTitle: 'Switch Expression និង Method ក្នុង Java',
        },
      },
    },
    'java-concurrency-and-architecture': {
      title: 'Virtual Threads និងស្ថាបត្យកម្មសេវាកម្មស្អាត',
      duration: '7 នាទី',
      summary:
        'ពង្រីកសមត្ថភាពដំណើរការព្រមគ្នាជាមួយ Java 21 Virtual Threads និងការរចនាសេវាកម្មងាយធ្វើតេស្ត។',
      sections: {
        'virtual-threads-and-di': {
          heading: 'Virtual Threads និង Constructor Injection',
          body: [
            'Java 21 ផ្ដល់ Virtual Threads ទម្ងន់ស្រាល ដែលអាចដំណើរការសំណើ I/O រាប់ពាន់ព្រមគ្នាបានយ៉ាងងាយ។ ផ្សំវាជាមួយ constructor injection ដើម្បីឱ្យតក្កវិជ្ជាអាជីវកម្មងាយធ្វើតេស្ត។',
          ],
          exampleTitle: 'ការដំណើរការកិច្ចការលើ Virtual Threads',
        },
      },
    },
  },
  csharp: {
    'csharp-control-flow-methods': {
      title: 'លំហូរគ្រប់គ្រង រង្វិលជុំ និង Methods',
      duration: '5 នាទី',
      summary: 'សម្រេចចិត្តជាមួយ if/else ដើរលើបញ្ជីដោយ foreach និងរៀបចំកូដជា C# methods យ៉ាងស្អាត។',
      sections: {
        'csharp-loops-methods': {
          heading: 'រង្វិលជុំ foreach និង Expression-Bodied Methods',
          body: [
            'ប្រើ foreach ដើម្បីដើរលើ array និង list ដោយគ្មានកំហុសលេខរៀង និងប្រើសញ្ញា => សម្រាប់អនុគមន៍ខ្លីៗ។',
          ],
          exampleTitle: 'foreach និង Helper Method ក្នុង C#',
        },
      },
    },
    'csharp-di-and-apis': {
      title: 'Dependency Injection និង Minimal APIs',
      duration: '7 នាទី',
      summary:
        'បង្កើត .NET Backend កម្រិតផលិតកម្មជាមួយ Dependency Injection និង ASP.NET Core Minimal APIs។',
      sections: {
        'dotnet-di-minimal-api': {
          heading: 'DI ស្អាត និង Minimal HTTP Endpoints',
          body: [
            'ASP.NET Core ភ្ជាប់មកស្រាប់ជាមួយ Dependency Injection container។ ចុះឈ្មោះ interface ម្ដងក្នុង Program.cs ហើយបញ្ចូលវាផ្ទាល់ទៅក្នុង Minimal API route handlers។',
          ],
          exampleTitle: 'ASP.NET Core Minimal API ជាមួយ DI',
        },
      },
    },
  },
  'software-engineering': {
    'how-software-is-built': {
      title: 'របៀបបង្កើតកម្មវិធី (SDLC)',
      duration: '5 នាទី',
      summary:
        'ចាប់ផ្ដើមដំណើរវិស្វកម្មកម្មវិធីពីសូន្យ៖ ស្វែងយល់ពីរបៀបដែលក្រុមវិស្វករបំប្លែងគំនិតទៅជាកម្មវិធីពិតជាជំហានៗ។',
      sections: {
        'sdlc-from-zero': {
          heading: 'ពីគំនិតដល់ការដាក់ដំណើរការជា 5 ដំណាក់កាល',
          body: [
            'វិស្វកម្មកម្មវិធីមិនមែនត្រឹមតែសរសេរកូដទេ—គឺការដោះស្រាយបញ្ហាពិតប្រកបដោយភាពជឿជាក់។ រាល់មុខងារឆ្លងកាត់ 5 ដំណាក់កាល៖ រៀបផែនការ (Plan) រចនា (Design) សរសេរកូដ (Build) ធ្វើតេស្ត (Test) និងដាក់ដំណើរការ/តាមដាន (Deploy & Monitor)។',
            'ការបំបែកបញ្ហាធំជាជំហានតូចៗដែលងាយធ្វើតេស្ត គឺជាទម្លាប់សំខាន់បំផុតដែលនាំអ្នកពីកម្រិតដំបូងទៅកម្រិត Pro។',
          ],
          exampleTitle: 'បញ្ជីត្រួតពិនិត្យលំហូរការងារវិស្វកម្មអន្តរកម្ម',
        },
      },
    },
  },
}
