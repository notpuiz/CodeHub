export const tracksKm = {
  html: {
    fullName: 'មូលដ្ឋានគ្រឹះ HTML',
    tagline: 'បង្កើតរចនាសម្ព័ន្ធគេហទំព័រដោយប្រើកូដស្អាត និងមានន័យច្បាស់លាស់។',
    badge: 'រចនាសម្ព័ន្ធ',
    lessons: {
      introduction: {
        title: 'សេចក្ដីផ្ដើមអំពី HTML',
        duration: '4 នាទី',
        summary:
          'ស្វែងយល់ថា HTML គឺជាអ្វី របៀបដែលធាតុ (elements) និងស្លាក (tags) ដំណើរការ និងរចនាសម្ព័ន្ធមូលដ្ឋានរបស់ទំព័រគេហទំព័រនីមួយៗ។',
        sections: {
          'what-is-html': {
            heading: 'តើ HTML គឺជាអ្វី?',
            body: [
              'HTML (HyperText Markup Language) គឺជាភាសាស្តង់ដារសម្រាប់បង្កើត និងរៀបចំរចនាសម្ព័ន្ធមាតិកានៅលើគេហទំព័រ។ រាល់ចំណងជើង កថាខណ្ឌ តំណភ្ជាប់ ប៊ូតុង និងទម្រង់បំពេញដែលអ្នកឃើញក្នុងកម្មវិធីរុករក សុទ្ធតែចាប់ផ្ដើមពីធាតុ HTML។',
              'ធាតុ HTML ជាទូទៅមានស្លាកបើក មាតិកា និងស្លាកបិទ—ឧទាហរណ៍ <h1>Hello</h1>។',
            ],
          },
          'document-structure': {
            heading: 'រចនាសម្ព័ន្ធឯកសារមូលដ្ឋាន',
            body: [
              'រាល់ឯកសារ HTML ទំនើបចាប់ផ្ដើមដោយ <!DOCTYPE html> បន្ទាប់មកធាតុឫស <html> ដែលមាន <head> (ទិន្នន័យមេតា ចំណងជើង ស្ទីល) និង <body> (មាតិកាដែលបង្ហាញលើទំព័រ)។',
            ],
            exampleTitle: 'ទំព័រ HTML មូលដ្ឋាន',
            tip: 'ត្រូវដាក់គុណលក្ខណៈ lang នៅលើ <html> ជានិច្ច (ឧទាហរណ៍ lang="km" ឬ lang="en") ដើម្បីឱ្យកម្មវិធីអានអេក្រង់ និងម៉ាស៊ីនស្វែងរកដឹងអំពីភាសារបស់ឯកសារ។',
          },
        },
      },
      'semantic-text': {
        title: 'ចំណងជើង និងអត្ថបទមានន័យ',
        duration: '5 នាទី',
        summary:
          'ប្រើចំណងជើង កថាខណ្ឌ ការសង្កត់ធ្ងន់ និងស្លាកមានន័យ (semantic landmarks) ដើម្បីឱ្យទំព័រងាយអានទាំងសម្រាប់មនុស្ស និងបច្ចេកវិទ្យាជំនួយ។',
        sections: {
          'headings-hierarchy': {
            heading: 'ឋានានុក្រមចំណងជើង',
            body: [
              'HTML ផ្ដល់ចំណងជើង 6 កម្រិត ចាប់ពី <h1> (សំខាន់បំផុត) ដល់ <h6> (សំខាន់តិចបំផុត)។ ប្រើ <h1> តែមួយគត់ក្នុងមួយទំព័រសម្រាប់ចំណងជើងធំ និងជៀសវាងការរំលងកម្រិតចំណងជើង។',
            ],
            exampleTitle: 'ចំណងជើង និងស្លាកមានន័យក្នុងជួរ',
          },
        },
      },
      'links-and-images': {
        title: 'តំណភ្ជាប់ និងរូបភាព',
        duration: '5 នាទី',
        summary:
          'ភ្ជាប់ទំព័រជាមួយគ្នាដោយប្រើស្លាក <a> និងបង្ហាញរូបភាពដែលងាយស្រួលចូលប្រើ និងឆ្លើយតបតាមទំហំអេក្រង់។',
        sections: {
          'anchors-and-media': {
            heading: 'តំណភ្ជាប់ និងអត្ថបទជំនួស (Alt Text)',
            body: [
              'ធាតុ <a> បង្កើតតំណភ្ជាប់ដោយប្រើគុណលក្ខណៈ href។ ធាតុ <img> បង្ហាញរូបភាពដោយប្រើ src ហើយគួរតែមានគុណលក្ខណៈ alt ដែលពណ៌នាច្បាស់លាស់ជានិច្ចសម្រាប់ភាពងាយស្រួលប្រើប្រាស់ និងបង្ហាញពេលរូបភាពផ្ទុកមិនបាន។',
            ],
            exampleTitle: 'តំណភ្ជាប់ និងរូបភាពងាយស្រួលប្រើប្រាស់',
            tip: 'នៅពេលប្រើ target="_blank" សូមបន្ថែម rel="noopener noreferrer" ដើម្បីសុវត្ថិភាព និងដំណើរការលឿនជាងមុន។',
          },
        },
      },
      'lists-and-tables': {
        title: 'បញ្ជី និងតារាង',
        duration: '5 នាទី',
        summary:
          'រៀបចំធាតុជាបញ្ជីមានលំដាប់ និងគ្មានលំដាប់ ព្រមទាំងបង្ហាញទិន្នន័យជាតារាងយ៉ាងមានរបៀបរៀបរយ។',
        sections: {
          'lists-tables': {
            heading: 'បញ្ជីគ្មានលំដាប់ និងតារាងទិន្នន័យ',
            body: [
              'ប្រើ <ul> សម្រាប់បញ្ជីចំណុច <ol> សម្រាប់ជំហានមានលេខរៀង និង <table> រួមជាមួយ <thead> និង <tbody> សម្រាប់ទិន្នន័យជាតារាងតែប៉ុណ្ណោះ—កុំប្រើតារាងសម្រាប់រៀបប្លង់ទំព័រឡើយ។',
            ],
            exampleTitle: 'តារាងទិន្នន័យមានរចនាសម្ព័ន្ធ',
          },
        },
      },
      'forms-and-inputs': {
        title: 'ទម្រង់បំពេញ និងប្រអប់បញ្ចូល',
        duration: '6 នាទី',
        summary:
          'ប្រមូលទិន្នន័យពីអ្នកប្រើប្រាស់ដោយប្រើ <label> ប្រភេទ input គុណលក្ខណៈផ្ទៀងផ្ទាត់ និងប៊ូតុងដាក់ស្នើ។',
        sections: {
          'accessible-forms': {
            heading: 'ស្លាកឈ្មោះ និងការផ្ទៀងផ្ទាត់ភ្ជាប់មកស្រាប់',
            body: [
              'ប្រអប់បញ្ចូលនីមួយៗគួរតែភ្ជាប់ជាមួយ <label> ដោយប្រើគុណលក្ខណៈ for និង id ឱ្យត្រូវគ្នា។ ប្រភេទ input របស់ HTML5 ដូចជា email, number និងគុណលក្ខណៈ required ជួយផ្ទៀងផ្ទាត់ទិន្នន័យដោយស្វ័យប្រវត្តិក្នុងកម្មវិធីរុករក។',
            ],
            exampleTitle: 'ទម្រង់ចុះឈ្មោះងាយស្រួលប្រើប្រាស់',
          },
        },
      },
    },
  },
  css: {
    fullName: 'ការរចនាស្ទីល និងប្លង់ CSS',
    tagline: 'រចនាចំណុចប្រទាក់ស្អាត និងឆ្លើយតបតាមគ្រប់អេក្រង់ជាមួយ CSS ទំនើប។',
    badge: 'ការរចនា',
    lessons: {
      'selectors-and-specificity': {
        title: 'Selectors និងកម្រិតអាទិភាព (Specificity)',
        duration: '5 នាទី',
        summary:
          'ស្វែងយល់ពីរបៀបដែល CSS កំណត់គោលដៅលើធាតុ និងរបៀបដែលលំដាប់ Cascade សម្រេចថាច្បាប់ណាត្រូវបានប្រើ។',
        sections: {
          'targeting-elements': {
            heading: 'Selectors ដែលប្រើញឹកញាប់',
            body: [
              'ច្បាប់ CSS ភ្ជាប់ selector ជាមួយប្លុកប្រកាសស្ទីល។ គួរប្រើ class selector (.card) ជាជាង ID selector (#header) ដើម្បីរក្សា specificity ឱ្យទាប និងងាយស្រួលប្រើឡើងវិញ។',
            ],
            exampleTitle: 'Class និង Pseudo-Class Selectors',
          },
        },
      },
      'box-model': {
        title: 'គំរូប្រអប់ (The Box Model)',
        duration: '5 នាទី',
        summary:
          'យល់ច្បាស់ពី content, padding, border, margin និងមូលហេតុដែល box-sizing: border-box ជួយសម្រួលការគណនាប្លង់។',
        sections: {
          'border-box': {
            heading: 'Content, Padding, Border និង Margin',
            body: [
              'គ្រប់ធាតុទាំងអស់ក្នុង CSS គឺជាប្រអប់រាងចតុកោណ។ ការកំណត់ box-sizing: border-box ធានាថា width និង height រួមបញ្ចូលទាំង padding និង border ដើម្បីការពារការលៀនចេញក្រៅដោយមិនរំពឹងទុក។',
            ],
            exampleTitle: 'ប្លង់ Border-Box',
          },
        },
      },
      flexbox: {
        title: 'ប្លង់ Flexbox',
        duration: '6 នាទី',
        summary: 'តម្រឹម និងចែកចាយធាតុតាមជួរដេក ឬជួរឈរយ៉ាងងាយស្រួលជាមួយ Flexbox។',
        sections: {
          'flex-basics': {
            heading: 'អ័ក្សមេ (Main Axis) និងអ័ក្សកាត់ (Cross Axis)',
            body: [
              'ប្រើ display: flex លើធាតុផ្ទុក ដើម្បីគ្រប់គ្រងការតម្រឹមដោយប្រើ justify-content (អ័ក្សមេ) align-items (អ័ក្សកាត់) និង gap (គម្លាតរវាងធាតុ)។',
            ],
            exampleTitle: 'របាររុករក (Navbar) ជាមួយ Flexbox',
          },
        },
      },
      'css-grid': {
        title: 'ប្លង់ CSS Grid',
        duration: '6 នាទី',
        summary:
          'បង្កើតក្រឡាកាត និងផ្ទាំងគ្រប់គ្រងពីរវិមាត្រដែលឆ្លើយតបតាមអេក្រង់ ដោយប្រើកូដ CSS តែប៉ុន្មានបន្ទាត់។',
        sections: {
          'responsive-grid': {
            heading: 'Grid ឆ្លើយតបស្វ័យប្រវត្តិ (Auto-Fit)',
            body: [
              'CSS Grid ពូកែខ្លាំងសម្រាប់ប្លង់ពីរវិមាត្រ។ ផ្សំ repeat(auto-fit, minmax(160px, 1fr)) ជាមួយ gap ដើម្បីបង្កើតក្រឡាឆ្លើយតបតាមអេក្រង់ដោយមិនបាច់សរសេរ media query សូម្បីមួយ។',
            ],
            exampleTitle: 'ក្រឡាកាត Auto-Fit',
          },
        },
      },
      'responsive-design': {
        title: 'ការរចនាឆ្លើយតបតាមអេក្រង់ (Responsive Design)',
        duration: '5 នាទី',
        summary:
          'សម្របប្លង់យ៉ាងរលូនលើទូរសព្ទ ថេប្លេត និងកុំព្យូទ័រដោយប្រើ mobile-first media queries។',
        sections: {
          'mobile-first': {
            heading: 'Media Queries បែប Mobile-First',
            body: [
              'ចាប់ផ្ដើមដោយរចនាប្លង់មួយជួរឈរសម្រាប់អេក្រង់តូចជាមុន បន្ទាប់មកបន្ថែម min-width media queries នៅពេលទំហំអេក្រង់ធំឡើង។',
            ],
            exampleTitle: 'ប្លង់ពីរជួរឈរបែប Mobile-First',
          },
        },
      },
    },
  },
  javascript: {
    fullName: 'មូលដ្ឋានសំខាន់ៗនៃ JavaScript',
    tagline: 'ធ្វើឱ្យគេហទំព័រមានជីវិតដោយប្រើតក្កវិជ្ជា ស្ថានភាព និងអន្តរកម្ម។',
    badge: 'តក្កវិជ្ជា',
    lessons: {
      'variables-and-types': {
        title: 'អថេរ និងប្រភេទទិន្នន័យ',
        duration: '5 នាទី',
        summary:
          'រក្សាទុកតម្លៃដោយប្រើ const និង let និងស្វែងយល់ពី strings, numbers, booleans, arrays និង objects។',
        sections: {
          'const-and-let': {
            heading: 'គួរប្រើ const ជាមុន និងប្រើ let ពេលត្រូវប្ដូរតម្លៃ',
            body: [
              'ប្រើ const ជាលំនាំដើមសម្រាប់តម្លៃដែលមិនប្ដូរ។ ប្រើ let នៅពេលអថេរត្រូវផ្លាស់ប្ដូរតម្លៃ ដូចជាតួរាប់។ ជៀសវាងការប្រើ var ក្នុង JavaScript ទំនើប។',
            ],
            exampleTitle: 'អថេរ និង Template Literals',
          },
        },
      },
      'functions-and-scope': {
        title: 'អនុគមន៍ និង Arrow Functions',
        duration: '5 នាទី',
        summary:
          'សរសេរតក្កវិជ្ជាដែលអាចប្រើឡើងវិញបានដោយប្រើ function declarations, arrow functions និង default parameters។',
        sections: {
          'arrow-functions': {
            heading: 'Arrow Functions និងតម្លៃលំនាំដើម',
            body: [
              'Arrow functions ផ្ដល់ទម្រង់សរសេរខ្លី និងស្អាតសម្រាប់ការបំប្លែងទិន្នន័យ និង callbacks។ Default parameters ជួយការពារអនុគមន៍មិនឱ្យមានបញ្ហានៅពេលមិនបានផ្ដល់អាគុយម៉ង់។',
            ],
            exampleTitle: 'ឧទាហរណ៍ Arrow Function',
          },
        },
      },
      'arrays-and-methods': {
        title: 'Arrays និងវិធីសាស្ត្រទំនើប',
        duration: '6 នាទី',
        summary: 'បំប្លែង និងត្រងបញ្ជីទិន្នន័យយ៉ាងស្អាតដោយប្រើ map, filter និង reduce។',
        sections: {
          'map-and-filter': {
            heading: 'ការបំប្លែងទិន្នន័យជាមួយ map និង filter',
            body: [
              'ជំនួសឱ្យការកែប្រែ array ដើមដោយផ្ទាល់ សូមប្រើ filter() ដើម្បីជ្រើសរើសធាតុដែលត្រូវលក្ខខណ្ឌ និង map() ដើម្បីបំប្លែងធាតុនីមួយៗទៅជា array ថ្មី។',
            ],
            exampleTitle: 'ត្រង និងបំប្លែងទិន្នន័យជាមួយ Filter & Map',
          },
        },
      },
      'dom-manipulation': {
        title: 'ការគ្រប់គ្រង DOM',
        duration: '6 នាទី',
        summary: 'ជ្រើសរើសធាតុ HTML កែប្រែអត្ថបទ និង class និងបង្ហាញមាតិកាថាមវន្តដោយសុវត្ថិភាព។',
        sections: {
          'query-and-update': {
            heading: 'ការជ្រើសរើស និងកែប្រែធាតុ',
            body: [
              'ប្រើ document.querySelector() ដើម្បីចាប់យកធាតុដោយប្រើ CSS selector ស្តង់ដារ បន្ទាប់មកកែប្រែ textContent ឬ classList ដើម្បីឆ្លុះបញ្ចាំងស្ថានភាពថ្មី។',
            ],
            exampleTitle: 'បន្ថែម Class សកម្ម (Active)',
          },
        },
      },
      'events-and-interactivity': {
        title: 'ព្រឹត្តិការណ៍ និងអន្តរកម្ម',
        duration: '6 នាទី',
        summary:
          'ស្ដាប់ការចុច ការវាយក្ដារចុច និងការដាក់ស្នើទម្រង់ ដើម្បីបង្កើតកម្មវិធីគេហទំព័រដែលមានអន្តរកម្ម។',
        sections: {
          'event-listeners': {
            heading: 'ការប្រើប្រាស់ addEventListener',
            body: [
              'ភ្ជាប់សកម្មភាពដោយប្រើ element.addEventListener("click", handler)។ រក្សាស្ថានភាព UI ក្នុងអថេរ ហើយធ្វើបច្ចុប្បន្នភាព DOM រាល់ពេលព្រឹត្តិការណ៍កើតឡើង។',
            ],
            exampleTitle: 'ឧបករណ៍រាប់ចំនួនអន្តរកម្ម',
          },
        },
      },
    },
  },
  'software-engineering': {
    name: 'វិស្វកម្មកម្មវិធី',
    fullName: 'វិស្វកម្មកម្មវិធី (Software Engineering)',
    tagline:
      'បង្កើតប្រព័ន្ធដែលងាយថែទាំ និងមានភាពជឿជាក់ខ្ពស់ជាមួយ Git ក្បួនដោះស្រាយ កូដស្អាត ការធ្វើតេស្ត និងស្ថាបត្យកម្មប្រព័ន្ធ។',
    badge: 'វិស្វកម្ម',
    lessons: {
      'git-and-version-control': {
        title: 'Git និងការគ្រប់គ្រងកំណែ (Version Control)',
        duration: '6 នាទី',
        summary:
          'តាមដានប្រវត្តិកូដដោយសុវត្ថិភាព សហការគ្នាដោយប្រើ feature branches និងសរសេរសារ commit តាមស្តង់ដារ។',
        sections: {
          'branching-and-commits': {
            heading: 'Feature Branches និង Atomic Commits',
            body: [
              'រាល់គម្រោងកម្មវិធីជំនាញទាំងអស់ពឹងផ្អែកលើប្រព័ន្ធគ្រប់គ្រងកំណែ។ រក្សា branch main ឱ្យអាចដាក់ដំណើរការបានជានិច្ច បំបែកការងារថ្មីលើ feature branch ដាច់ដោយឡែក និងបែងចែកការកែប្រែជា commit តូចៗដែលច្បាស់លាស់។',
              'ការប្រើពាក្យផ្ដើមស្តង់ដារដូចជា feat:, fix:, refactor: និង test: ជួយឱ្យការពិនិត្យកូដ (code review) និងការស្វែងរកកំហុសកាន់តែលឿន។',
            ],
            exampleTitle: 'លំហូរការងារ Feature Branch ស្តង់ដារ',
            tip: 'កុំ commit ពាក្យសម្ងាត់ API keys ឬឯកសារ .env ឡើយ—ត្រូវបញ្ចូលវាទៅក្នុង .gitignore មុនពេល commit ដំបូង។',
          },
        },
      },
      'data-structures-and-algorithms': {
        title: 'រចនាសម្ព័ន្ធទិន្នន័យ និង Big-O',
        duration: '7 នាទី',
        summary:
          'ជ្រើសរើសរចនាសម្ព័ន្ធទិន្នន័យឱ្យត្រូវនឹងការងារ និងវិភាគភាពស្មុគស្មាញពេលវេលាដោយប្រើ Big-O notation។',
        sections: {
          'complexity-and-lookup': {
            heading: 'ការស្វែងរក O(1) ធៀបនឹងការរកមើល O(n)',
            body: [
              'Big-O notation ពណ៌នាអំពីរបៀបដែលពេលវេលាដំណើរការ ឬអង្គចងចាំកើនឡើងនៅពេលទិន្នន័យធំឡើង។ ការស្វែងរកក្នុង array ដោយ .find() មានកម្រិត O(n) ចំណែកការទាញទិន្នន័យតាម key ក្នុង Map ឬ Set មានកម្រិត O(1) ជាមធ្យម។',
              'នៅពេលទិន្នន័យត្រូវបានតម្រៀបរួច Binary Search បែងចែកទំហំស្វែងរកជាពាក់កណ្ដាលរាល់ជំហាន—ដំណើរការក្នុងកម្រិត O(log n) ដែលទិន្នន័យ 1,000,000 ត្រូវការការប្រៀបធៀបមិនដល់ 20 ដងផង។',
            ],
            exampleTitle: 'ក្បួនដោះស្រាយ Binary Search កម្រិត O(log n)',
            tip: 'ប្រើ Set ពេលត្រូវពិនិត្យវត្តមានទិន្នន័យញឹកញាប់ និងប្រើ Map ពេលត្រូវរកទិន្នន័យតាម ID—ជៀសវាងរង្វិលជុំជាន់គ្នាលើទិន្នន័យធំៗ។',
          },
        },
      },
      'clean-code-and-solid': {
        title: 'កូដស្អាត និងគោលការណ៍ SOLID',
        duration: '7 នាទី',
        summary:
          'សរសេរកូដងាយអាន និងបែងចែកជាផ្នែកៗដោយប្រើ Single Responsibility, pure functions និងព្រំដែនច្បាស់លាស់។',
        sections: {
          'single-responsibility': {
            heading: 'ទំនួលខុសត្រូវតែមួយ (SRP) និង Pure Functions',
            body: [
              'កូដត្រូវបានអានច្រើនដងជាងការសរសេរ។ គោលការណ៍ Single Responsibility Principle (SRP) មានន័យថា អនុគមន៍ ឬម៉ូឌុលនីមួយៗគួរមានមូលហេតុតែមួយគត់ដើម្បីផ្លាស់ប្ដូរ។',
              'បំបែកតក្កវិជ្ជាគណនាសុទ្ធ (pure logic ដែលងាយធ្វើតេស្ត) ចេញពីផលប៉ះពាល់ក្រៅ (side effects) ដូចជាការហៅបណ្ដាញ ការសរសេរមូលដ្ឋានទិន្នន័យ ឬការកែប្រែ DOM។',
            ],
            exampleTitle: 'ការបំបែកតក្កវិជ្ជាគណនាតម្លៃចេញពីការបង្ហាញ',
          },
        },
      },
      'testing-and-debugging': {
        title: 'ការធ្វើតេស្ត និងការកែកំហុស (Testing & Debugging)',
        duration: '6 នាទី',
        summary:
          'ចាប់កំហុសបានមុនពេលដាក់ប្រើប្រាស់ជាមួយ unit tests តាមទម្រង់ Arrange-Act-Assert និងវិធីសាស្ត្រកែកំហុសជាប្រព័ន្ធ។',
        sections: {
          'unit-testing-aaa': {
            heading: 'ទម្រង់ Arrange, Act, Assert (AAA)',
            body: [
              'Unit tests ស្វ័យប្រវត្តិជួយផ្ទៀងផ្ទាត់ដំណើរការកូដមុនដល់ដៃអ្នកប្រើប្រាស់។ រៀបចំតេស្តនីមួយៗជា 3 ផ្នែក៖ Arrange (រៀបចំទិន្នន័យចូល) Act (ហៅអនុគមន៍ដែលត្រូវតេស្ត) និង Assert (ផ្ទៀងផ្ទាត់លទ្ធផលរំពឹងទុក)។',
              'ផ្ដោតតេស្តលើឥរិយាបថ និងករណីពិសេស (បញ្ជីទទេ លេខអវិជ្ជមាន ទិន្នន័យមិនត្រឹមត្រូវ) ជាជាងព័ត៌មានលម្អិតខាងក្នុង។',
            ],
            exampleTitle: 'ឈុតតេស្ត Unit Test ខ្នាតតូច',
            tip: 'នៅពេលជួសជុលកំហុស (bug) សូមសរសេរតេស្តដែលបរាជ័យដើម្បីបង្ហាញកំហុសនោះជាមុន—បន្ទាប់មកទើបកែកូដ ដើម្បីធានាថាកំហុសនោះនឹងមិនកើតឡើងម្ដងទៀត។',
          },
        },
      },
      'system-design-and-apis': {
        title: 'API និងមូលដ្ឋានគ្រឹះស្ថាបត្យកម្មប្រព័ន្ធ',
        duration: '7 នាទី',
        summary:
          'រចនា REST API ដែលងាយយល់ ប្រើលេខកូដស្ថានភាព HTTP ឱ្យត្រឹមត្រូវ និងប្រើ Caching ដើម្បីឱ្យសេវាកម្មដំណើរការលឿន។',
        sections: {
          'rest-and-caching': {
            heading: 'ស្តង់ដារ REST និង In-Memory Caching',
            body: [
              'API ដែលរចនាបានល្អប្រើនាមសម្រាប់ធនធាន (/users, /orders/42) ប្រើវិធីសាស្ត្រ HTTP ស្តង់ដារ (GET, POST, PUT, DELETE) និងលេខកូដស្ថានភាពត្រឹមត្រូវ (200 OK, 201 Created, 400 Bad Request, 404 Not Found, 429 Too Many Requests)។',
              'ការរក្សាទុកទិន្នន័យដែលអានញឹកញាប់ក្នុងអង្គចងចាំ (Caching) ដោយមានរយៈពេលផុតកំណត់ (TTL) ជួយកាត់បន្ថយបន្ទុកមូលដ្ឋានទិន្នន័យ និងបង្កើនល្បឿនឆ្លើយតបយ៉ាងខ្លាំង។',
            ],
            exampleTitle: 'ប្រព័ន្ធ TTL Cache សាមញ្ញ',
          },
        },
      },
    },
  },
}

export const resourcesKm = {
  'mdn-html': {
    title: 'ឯកសារយោងធាតុ HTML របស់ MDN',
    type: 'ឯកសារយោង',
    description:
      'បញ្ជីពេញលេញនៃធាតុ HTML ស្តង់ដារទាំងអស់ គុណលក្ខណៈ និងកំណត់ចំណាំភាពងាយស្រួលប្រើប្រាស់។',
  },
  'w3schools-html': {
    title: 'មេរៀន HTML របស់ W3Schools',
    type: 'មគ្គុទ្ទេសក៍',
    description:
      'ឯកសារយោង HTML ជាជំហានៗសម្រាប់អ្នកចាប់ផ្ដើម ជាមួយបញ្ជីស្លាក គុណលក្ខណៈ និងឧទាហរណ៍អន្តរកម្ម។',
  },
  'html-semantics': {
    title: 'រៀន HTML នៅលើ Web.dev',
    type: 'មគ្គុទ្ទេសក៍',
    description:
      'មេរៀនស៊ីជម្រៅអំពីរចនាសម្ព័ន្ធមានន័យ ទម្រង់បំពេញ និងការអនុវត្តល្អបំផុតនៃ HTML ទំនើប។',
  },
  'css-flexbox-guide': {
    title: 'មគ្គុទ្ទេសក៍ពេញលេញអំពី Flexbox ពី CSS-Tricks',
    type: 'តារាងសង្ខេប',
    description: 'ឯកសារយោងមានរូបភាពសម្រាប់រាល់លក្ខណៈសម្បត្តិរបស់ Flexbox container និង item។',
  },
  'css-grid-guide': {
    title: 'មគ្គុទ្ទេសក៍ពេញលេញអំពី Grid ពី CSS-Tricks',
    type: 'តារាងសង្ខេប',
    description:
      'តារាងសង្ខេបមានរូបភាពសម្រាប់ CSS Grid tracks, areas, ការតម្រឹម និងគំរូឆ្លើយតបតាមអេក្រង់។',
  },
  caniuse: {
    title: 'Can I Use',
    type: 'ឧបករណ៍',
    description: 'ពិនិត្យតារាងគាំទ្រកម្មវិធីរុករកថ្មីៗបំផុតសម្រាប់មុខងារ HTML, CSS និង JavaScript។',
  },
  'w3schools-css': {
    title: 'មេរៀន CSS របស់ W3Schools',
    type: 'មគ្គុទ្ទេសក៍',
    description: 'ឯកសាររហ័សសម្រាប់លក្ខណៈសម្បត្តិ CSS ឧទាហរណ៍ប្លង់ selectors និងការសាកល្បងផ្ទាល់។',
  },
  'javascript-info': {
    title: 'មេរៀន JavaScript ទំនើប (JavaScript.info)',
    type: 'មគ្គុទ្ទេសក៍',
    description:
      'ចាប់ពីមូលដ្ឋានគ្រឹះដល់ closures, async/await និង DOM APIs ជាមួយលំហាត់អនុវត្តផ្ទាល់។',
  },
  'mdn-js': {
    title: 'ឯកសារយោង JavaScript របស់ MDN',
    type: 'ឯកសារយោង',
    description: 'ឯកសារផ្លូវការសម្រាប់ built-in objects, Array methods, Promises និង Web APIs។',
  },
  'w3schools-js': {
    title: 'មេរៀន JavaScript របស់ W3Schools',
    type: 'មគ្គុទ្ទេសក៍',
    description: 'ឯកសារយោង JavaScript ងាយយល់ គ្របដណ្ដប់លើប្រមាណវិធី រង្វិលជុំ DOM, JSON និង ES6។',
  },
  'pro-git': {
    title: 'សៀវភៅ Pro Git',
    type: 'មគ្គុទ្ទេសក៍',
    description:
      'សៀវភៅផ្លូវការឥតគិតថ្លៃ គ្របដណ្ដប់លើដំណើរការខាងក្នុងរបស់ Git, branching, rebasing និងការងារជាក្រុម។',
  },
  'refactoring-guru': {
    title: 'Refactoring.Guru — គំរូរចនាកម្មវិធី (Design Patterns)',
    type: 'ឯកសារយោង',
    description:
      'ការពន្យល់មានរូបភាពអំពី Design Patterns បញ្ហាកូដ (code smells) និងបច្ចេកទេស Refactoring។',
  },
  'system-design-primer': {
    title: 'សៀវភៅមូលដ្ឋានស្ថាបត្យកម្មប្រព័ន្ធ (System Design Primer)',
    type: 'មគ្គុទ្ទេសក៍',
    description:
      'មគ្គុទ្ទេសក៍កូដចំហអំពីស្ថាបត្យកម្មប្រព័ន្ធខ្នាតធំ load balancing, caching និងមូលដ្ឋានទិន្នន័យ។',
  },
  'roadmap-sh': {
    title: 'ផែនទីសិក្សាសម្រាប់អ្នកអភិវឌ្ឍន៍ (roadmap.sh)',
    type: 'ឧបករណ៍',
    description:
      'ផែនទីសិក្សាអន្តរកម្មសម្រាប់ Frontend, Backend, DevOps និងវិទ្យាសាស្ត្រកុំព្យូទ័រ។',
  },
}
