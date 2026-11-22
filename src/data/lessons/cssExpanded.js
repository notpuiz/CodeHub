export const cssExpanded = [
  // =========================================================================
  // 1. COLORS, BACKGROUNDS & GRADIENTS
  // =========================================================================
  {
    slug: 'css-colors-and-backgrounds',
    level: 'beginner',
    insertAfter: 'css-from-zero',
    en: {
      title: 'Colors, Backgrounds & Gradients',
      duration: '12 min',
      summary:
        'Master Hex, RGB/RGBA, and HSL color systems, responsive background image sizing with cover, and smooth eased multi-stop gradients.',
      objectives: [
        'Choose between Hex, RGB/RGBA, and HSL color notations for solid colors and alpha transparency.',
        'Configure background images cleanly with background-size: cover, background-position, and dark gradient scrims.',
        'Build linear, radial, and eased multi-stop gradients without harsh visible edges.',
      ],
      sections: [
        {
          id: 'color-formats-hex-rgb-hsl',
          heading: 'Color Formats: Hex, RGB/RGBA & HSL',
          body: [
            'CSS gives you several ways to describe the exact same color. Hexadecimal codes like #2563eb pack red, green, and blue channels into six hex digits (or three when pairs repeat, like #fff, and eight when adding alpha transparency such as #0f172acc). RGB uses decimal 0–255 channels—written either in classic rgba(37, 99, 235, 0.15) form or modern space-separated rgb(37 99 235 / 0.15) syntax.',
            'For designing UI themes, HSL—Hue (0–360°), Saturation (0–100%), and Lightness (0–100%)—is often the clearest system for humans. Because hue stays constant while you tweak lightness or saturation, generating a darker hover state, a soft tinted surface, and a matching border from a single brand color becomes effortless.',
          ],
          points: [
            'Modern CSS supports space-separated alpha syntax across both rgb(15 23 42 / 0.8) and hsl(221 83% 53% / 0.15).',
            'Use currentColor to inherit an element’s active text color into borders or inline SVG icons automatically.',
            'Keep one Hue value in HSL and step Lightness up or down to build cohesive light and dark palettes.',
          ],
          table: {
            headers: ['Format', 'Example Syntax', 'Alpha Support', 'Best Use Case'],
            rows: [
              [
                'Named Color',
                'rebeccapurple, transparent',
                'No (except transparent)',
                'Quick prototypes and resets',
              ],
              [
                'Hex (6 / 8 digit)',
                '#2563eb / #2563eb33',
                'Yes (8-digit #RRGGBBAA)',
                'Compact design tokens and copy-pasting from design tools',
              ],
              [
                'RGB / RGBA',
                'rgb(37 99 235 / 0.2)',
                'Yes (/ alpha or rgba())',
                'Dynamic channel overlays and shadows',
              ],
              [
                'HSL / HSLA',
                'hsl(221 83% 53% / 0.9)',
                'Yes (/ alpha or hsla())',
                'Human-readable tints, hover states, and theme palettes',
              ],
            ],
          },
          example: {
            title: 'Comparing Hex, RGB Alpha & HSL Palette Steps',
            language: 'css',
            code: `:root {
  /* Same brand blue written three ways */
  --brand-hex: #2563eb;
  --brand-rgb: rgb(37 99 235 / 0.14);
  --brand-hsl: hsl(221 83% 53%);
  --brand-hsl-hover: hsl(221 83% 45%);
}

.badge {
  color: var(--brand-hsl);
  background-color: var(--brand-rgb);
  border: 1px solid hsl(221 83% 53% / 0.35);
}

.btn-primary {
  background-color: var(--brand-hsl);
  color: #ffffff;
  transition: background-color 180ms ease-out;
}

.btn-primary:hover {
  background-color: var(--brand-hsl-hover);
}`,
            playground: {
              html: `<div class="palette-demo">
  <div class="controls">
    <label for="hue">Brand Hue: <strong id="hueVal">221°</strong></label>
    <input id="hue" type="range" min="0" max="360" value="221" />
  </div>
  <div class="swatches">
    <div class="swatch surface">Tinted Surface<br><code>L: 94%</code></div>
    <div class="swatch base">Primary HSL<br><code>L: 52%</code></div>
    <div class="swatch dark">Hover State<br><code>L: 42%</code></div>
    <div class="swatch alpha">Alpha Glass<br><code>/ 0.18</code></div>
  </div>
</div>`,
              css: `:root { --h: 221; }
body { font-family: system-ui, sans-serif; padding: 18px; color: #0f172a; margin: 0; }
.controls { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; font-size: 14px; }
.controls strong { font-variant-numeric: tabular-nums; min-width: 4ch; display: inline-block; }
.swatches { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.swatch { padding: 14px; border-radius: 10px; font-size: 13px; font-weight: 600; line-height: 1.4; }
.swatch code { font-weight: 400; opacity: 0.85; }
.surface { background: hsl(var(--h) 85% 94%); color: hsl(var(--h) 75% 30%); border: 1px solid hsl(var(--h) 70% 82%); }
.base { background: hsl(var(--h) 83% 52%); color: #fff; }
.dark { background: hsl(var(--h) 83% 42%); color: #fff; }
.alpha { background: hsl(var(--h) 83% 52% / 0.18); color: hsl(var(--h) 80% 35%); border: 1px dashed hsl(var(--h) 80% 50% / 0.5); }`,
              js: `const slider = document.getElementById('hue');
const label = document.getElementById('hueVal');
slider.addEventListener('input', () => {
  document.documentElement.style.setProperty('--h', slider.value);
  label.textContent = slider.value + '°';
});`,
            },
          },
          tip: 'When tweaking a color for dark mode, slightly lower its Saturation (by 5–15%) along with adjusting Lightness so neon colors do not vibrate harshly against dark surfaces.',
        },
        {
          id: 'background-images-and-cover',
          heading: 'Background Images, Sizing & Scrim Overlays',
          body: [
            'The background-image property can paint photos, SVG patterns, or CSS gradients behind an element’s content. By default, browsers tile a background image horizontally and vertically, so real layouts almost always pair it with background-repeat: no-repeat and background-position: center.',
            'To make an image fill a responsive banner without stretching or distorting its aspect ratio, use background-size: cover (fills the entire box and crops overflow edges) or background-size: contain (shows the full image inside the box, leaving empty space if aspect ratios differ). You can also stack comma-separated background layers—the first layer sits on top—making it easy to place a dark gradient scrim directly over a photo for readable white text.',
          ],
          points: [
            'background-size: cover guarantees zero empty gaps in hero banners and cards, even as viewport width changes.',
            'Always pair background-image with a solid fallback background-color so text stays readable before the image downloads.',
            'Comma-separated background-image layers paint front-to-back: put your gradient scrim first and the image URL second.',
          ],
          example: {
            title: 'Comparing background-size: cover vs contain with a Text Scrim',
            language: 'css',
            code: `.hero-card {
  background-color: #0f172a; /* Fallback while image loads */
  background-image:
    linear-gradient(to top, rgb(15 23 42 / 0.85), rgb(15 23 42 / 0.15)),
    url("campus-aerial.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #f8fafc;
}`,
            playground: {
              html: `<div class="bg-demo">
  <div class="bar">
    <button id="btnCover" class="active">cover</button>
    <button id="btnContain">contain</button>
  </div>
  <div id="stage" class="hero">
    <div class="caption">
      <h3>Phnom Penh Skyline</h3>
      <p>Layered gradient scrim keeps white text legible at any screen size.</p>
    </div>
  </div>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 16px; margin: 0; color: #0f172a; }
.bar { display: flex; gap: 8px; margin-bottom: 12px; }
button { padding: 6px 12px; border-radius: 8px; border: 1px solid #cbd5e1; background: #fff; cursor: pointer; font-weight: 600; transition: transform 140ms ease-out, background-color 140ms ease-out; }
button:active { transform: scale(0.97); }
button.active { background: #0f172a; color: #fff; border-color: #0f172a; }
.hero {
  height: 180px; border-radius: 14px; overflow: hidden; display: flex; align-items: flex-end; padding: 18px;
  background-color: #1e293b;
  background-image:
    linear-gradient(to top, rgb(15 23 42 / 0.88) 0%, rgb(15 23 42 / 0.45) 45%, rgb(15 23 42 / 0) 100%),
    radial-gradient(circle at 75% 25%, #f59e0b 0 28px, transparent 29px),
    linear-gradient(135deg, #0ea5e9 0%, #6366f1 55%, #1e1b4b 100%);
  background-size: cover, 160px 160px, cover;
  background-repeat: no-repeat;
  background-position: center;
  color: #fff;
}
.hero.is-contain { background-size: cover, 160px 160px, 55% 65%; }
.caption h3 { margin: 0 0 4px; font-size: 18px; letter-spacing: -0.02em; }
.caption p { margin: 0; font-size: 13px; color: #e2e8f0; }`,
              js: `const stage = document.getElementById('stage');
const btnCover = document.getElementById('btnCover');
const btnContain = document.getElementById('btnContain');
btnCover.onclick = () => { stage.classList.remove('is-contain'); btnCover.classList.add('active'); btnContain.classList.remove('active'); };
btnContain.onclick = () => { stage.classList.add('is-contain'); btnContain.classList.add('active'); btnCover.classList.remove('active'); };`,
            },
          },
          warning:
            'Never place white text directly on top of an un-darkened photo without a gradient scrim or fallback background-color. Bright regions in the image—or a failed image load—will make your text unreadable.',
        },
        {
          id: 'eased-multi-stop-gradients',
          heading: 'Linear, Radial & Eased Multi-Stop Gradients',
          body: [
            'CSS gradients are generated mathematically by the browser, meaning they scale crisply to any display resolution with zero network requests. Linear gradients sweep colors along an axis (such as 135deg or to bottom), while radial gradients radiate outward from a center point (radial-gradient(circle at top right, ...)).',
            'A common visual flaw with simple two-stop fades—like linear-gradient(to top, rgb(0 0 0 / 0.8), rgb(0 0 0 / 0))—is a noticeable hard line where the gradient starts and ends. Using an eased multi-stop gradient distributes 5–6 intermediate opacity stops along a smooth curve, creating soft, natural fades with zero harsh edges.',
          ],
          points: [
            'Use rgb(0 0 0 / 0) instead of transparent when fading to clear black so browsers never interpolate through muddy gray.',
            'Eased multi-stop curves pack gentle opacity changes near the transparent edge and steepen smoothly near the dark edge.',
            'Subtle radial-gradient glows behind hero headlines add depth without adding extra DOM elements.',
          ],
          example: {
            title: 'Harsh 2-Stop Fade vs Eased Multi-Stop Scrim',
            language: 'css',
            code: `/* Basic 2-stop fade (can show a visible top edge) */
.scrim-basic {
  background-image: linear-gradient(
    to top,
    rgb(15 23 42 / 0.85) 0%,
    rgb(15 23 42 / 0) 100%
  );
}

/* Eased multi-stop gradient (smooth, edge-free transition) */
.scrim-eased {
  background-image: linear-gradient(
    to top,
    rgb(15 23 42 / 0.85) 0%,
    rgb(15 23 42 / 0.62) 24%,
    rgb(15 23 42 / 0.34) 48%,
    rgb(15 23 42 / 0.12) 72%,
    rgb(15 23 42 / 0.02) 88%,
    rgb(15 23 42 / 0) 100%
  );
}`,
          },
          tip: 'You can layer a faint radial-gradient spotlight over a solid dark background to create premium SaaS hero depth using only two lines of CSS.',
        },
      ],
      challenge: {
        prompt:
          'Style a .course-banner element with a dark slate fallback color (#0f172a), an eased 4-stop vertical dark scrim layered over url("banner.jpg"), background-size set to cover, background-position centered, and no background repetition.',
        hint: 'List the linear-gradient() before url("banner.jpg") inside background-image, separated by a comma, and use rgb(15 23 42 / ...) stops.',
        language: 'css',
        solutionCode: `.course-banner {
  background-color: #0f172a;
  background-image:
    linear-gradient(
      to top,
      rgb(15 23 42 / 0.88) 0%,
      rgb(15 23 42 / 0.52) 35%,
      rgb(15 23 42 / 0.14) 70%,
      rgb(15 23 42 / 0) 100%
    ),
    url("banner.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #f8fafc;
}`,
      },
      quiz: [
        {
          question:
            'Why is HSL often preferred over Hex when creating hover states and tinted surfaces from a brand color?',
          options: [
            'HSL renders faster on the GPU than Hex colors',
            'HSL separates Hue, Saturation, and Lightness so you can adjust brightness while keeping the same hue',
            'Hex colors do not support any form of transparency in modern CSS',
            'HSL automatically adjusts contrast ratios for accessibility',
          ],
          answer: 1,
          explanation:
            'With HSL you keep the Hue angle fixed and simply raise or lower the Lightness percentage to produce harmonious tints and hover shades.',
        },
        {
          question:
            'What does background-size: cover do when an image has a different aspect ratio than its container?',
          options: [
            'Stretches the image unevenly until both edges fit',
            'Repeats the image as tiles to fill empty gaps',
            'Scales the image proportionally to fill the entire container, cropping any overflowing edges',
            'Shrinks the image so the entire picture fits inside with empty bars around it',
          ],
          answer: 2,
          explanation:
            'background-size: cover preserves aspect ratio while guaranteeing the entire box is covered—cropping overflow cleanly instead of distorting or leaving empty gaps.',
        },
      ],
    },
    km: {
      title: 'ពណ៌ ផ្ទៃខាងក្រោយ និងពណ៌ជម្រាល (Gradients)',
      duration: '12 នាទី',
      summary:
        'ស្វែងយល់ពីប្រព័ន្ធពណ៌ Hex, RGB/RGBA និង HSL ការកំណត់រូបភាពផ្ទៃខាងក្រោយដោយប្រើ cover និងការបង្កើតពណ៌ជម្រាលច្រើនដំណាក់កាលយ៉ាងរលូន។',
      objectives: [
        'ជ្រើសរើសរវាង Hex, RGB/RGBA និង HSL សម្រាប់ពណ៌ធម្មតា និងពណ៌ថ្លា (alpha transparency)។',
        'កំណត់រូបភាពផ្ទៃខាងក្រោយឱ្យស្អាតជាមួយ background-size: cover, background-position និងស្រទាប់ scrim ងងឹត។',
        'បង្កើតពណ៌ជម្រាល linear, radial និង eased multi-stop ដោយគ្មានគែមដាច់រឹង។',
      ],
      sections: [
        {
          id: 'color-formats-hex-rgb-hsl',
          heading: 'ទម្រង់ពណ៌៖ Hex, RGB/RGBA និង HSL',
          body: [
            'CSS ផ្តល់វិធីច្រើនដើម្បីកំណត់ពណ៌តែមួយ។ កូដ Hexadecimal ដូចជា #2563eb ផ្ទុកឆានែលក្រហម បៃតង និងខៀវក្នុងខ្ទង់ប្រាំមួយ (ឬបីខ្ទង់ដូចជា #fff និងប្រាំបីខ្ទង់ពេលបន្ថែមភាពថ្លាដូចជា #0f172acc)។ ចំណែក RGB ប្រើលេខ 0–255 ដោយអាចសរសេរជា rgba(37, 99, 235, 0.15) ឬទម្រង់ទំនើប rgb(37 99 235 / 0.15)។',
            'សម្រាប់ការរចនាប្រព័ន្ធពណ៌ UI វិញ HSL—Hue (0–360°), Saturation (0–100%) និង Lightness (0–100%)—ងាយយល់បំផុតសម្រាប់មនុស្ស។ ដោយរក្សា Hue ឱ្យនៅដដែល ហើយប្តូរតែ Lightness ឬ Saturation អ្នកអាចបង្កើតពណ៌ hover ផ្ទៃស្រាល និងស៊ុមស៊ីគ្នាបានយ៉ាងឆាប់រហ័ស។',
          ],
          points: [
            'CSS ទំនើបគាំទ្រការសរសេរ alpha ដោយដកឃ្លាទាំង rgb(15 23 42 / 0.8) និង hsl(221 83% 53% / 0.15)។',
            'ប្រើ currentColor ដើម្បីឱ្យស៊ុម ឬរូបតំណាង SVG ទទួលយកពណ៌អក្សរបច្ចុប្បន្នដោយស្វ័យប្រវត្តិ។',
            'រក្សាតម្លៃ Hue តែមួយក្នុង HSL រួចបង្កើន ឬបន្ថយ Lightness ដើម្បីបង្កើតពណ៌ theme ឱ្យស៊ីសង្វាក់គ្នា។',
          ],
          table: {
            headers: ['ទម្រង់', 'ឧទាហរណ៍កូដ', 'គាំទ្រ Alpha', 'ករណីប្រើល្អបំផុត'],
            rows: [
              [
                'Named Color',
                'rebeccapurple, transparent',
                'ទេ (លើកលែង transparent)',
                'សាកល្បងរហ័ស និង reset',
              ],
              [
                'Hex (6 / 8 ខ្ទង់)',
                '#2563eb / #2563eb33',
                'បាទ/ចាស (8 ខ្ទង់ #RRGGBBAA)',
                'Design tokens និងចម្លងពីកម្មវិធីរចនា',
              ],
              [
                'RGB / RGBA',
                'rgb(37 99 235 / 0.2)',
                'បាទ/ចាស (/ alpha ឬ rgba())',
                'ស្រទាប់ថ្លា និងស្រមោល',
              ],
              [
                'HSL / HSLA',
                'hsl(221 83% 53% / 0.9)',
                'បាទ/ចាស (/ alpha ឬ hsla())',
                'ពណ៌ hover និងការបង្កើត palette',
              ],
            ],
          },
          exampleTitle: 'ការប្រៀបធៀប Hex, RGB Alpha និងកម្រិតពណ៌ HSL',
          tip: 'ពេលកែពណ៌សម្រាប់ dark mode គួរបន្ថយ Saturation បន្តិច (5–15%) រួមជាមួយការកែ Lightness ដើម្បីកុំឱ្យពណ៌ភ្លឺឆ្លុះចាក់ភ្នែកលើផ្ទៃងងឹត។',
        },
        {
          id: 'background-images-and-cover',
          heading: 'រូបភាពផ្ទៃខាងក្រោយ ការកំណត់ទំហំ និងស្រទាប់ Scrim',
          body: [
            'គុណលក្ខណៈ background-image អាចបង្ហាញរូបភាព លំនាំ SVG ឬពណ៌ជម្រាលនៅខាងក្រោយមាតិកា។ តាមលំនាំដើម កម្មវិធីរុករកនឹងដាក់រូបភាពដដែលៗពេញផ្ទៃ ដូច្នេះក្នុងគេហទំព័រជាក់ស្តែងគេតែងផ្គូផ្គងវាជាមួយ background-repeat: no-repeat និង background-position: center។',
            'ដើម្បីឱ្យរូបភាពពេញប្រអប់ banner ដោយមិនខូចសមាមាត្រ សូមប្រើ background-size: cover (ពេញប្រអប់ទាំងមូល ហើយកាត់គែមលើស) ឬ background-size: contain (បង្ហាញរូបភាពទាំងស្រុងក្នុងប្រអប់)។ អ្នកក៏អាចដាក់ស្រទាប់ background-image ជាច្រើនញែកដោយសញ្ញាក្បៀស ដោយស្រទាប់ដំបូងនៅខាងលើគេ ដើម្បីដាក់ស្រទាប់ scrim ងងឹតពីលើរូបភាពឱ្យអក្សរពណ៌សងាយអាន។',
          ],
          points: [
            'background-size: cover ធានាថាគ្មានចន្លោះទទេនៅក្នុង hero banner ទោះទទឹងអេក្រង់ប្តូរក៏ដោយ។',
            'តែងតែដាក់ background-color បម្រុង ដើម្បីឱ្យអក្សរនៅតែអានបានមុនពេលរូបភាពទាញយកចប់។',
            'ស្រទាប់ក្នុង background-image លាបពីលើចុះក្រោម៖ ដាក់ linear-gradient() មុន រួចដាក់ url() តាមក្រោយ។',
          ],
          exampleTitle: 'ប្រៀបធៀប background-size: cover និង contain ជាមួយស្រទាប់ Scrim',
          warning:
            'កុំដាក់អក្សរពណ៌សផ្ទាល់លើរូបភាពដោយគ្មាន gradient scrim ឬ background-color បម្រុង។ ផ្នែកភ្លឺនៃរូបភាព ឬពេលអ៊ីនធឺណិតយឺត នឹងធ្វើឱ្យអក្សរពិបាកអានខ្លាំង។',
        },
        {
          id: 'eased-multi-stop-gradients',
          heading: 'ពណ៌ជម្រាល Linear, Radial និង Eased Multi-Stop',
          body: [
            'ពណ៌ជម្រាល CSS ត្រូវបានគណនាដោយកម្មវិធីរុករកផ្ទាល់ ដូច្នេះវាច្បាស់ល្អគ្រប់កម្រិតអេក្រង់ដោយមិនបាច់ទាញយករូបភាព។ Linear gradients បង្ហាញពណ៌តាមបន្ទាត់ត្រង់ (ដូចជា 135deg ឬ to bottom) ចំណែក radial gradients រីកចេញពីចំណុចកណ្តាល។',
            'បញ្ហាញឹកញាប់នៃពណ៌ជម្រាល 2-stop ធម្មតា (ដូចជា rgb(0 0 0 / 0.8) ទៅ rgb(0 0 0 / 0)) គឺវាបង្កើតគែមដាច់មើលឃើញច្បាស់។ ការប្រើ eased multi-stop gradient ដោយបន្ថែមចំណុចកណ្តាល 5–6 កម្រិត ធ្វើឱ្យការរលាយពណ៌មើលទៅធម្មជាតិ និងរលូនគ្មានគែមរឹង។',
          ],
          points: [
            'ប្រើ rgb(0 0 0 / 0) ជំនួសឱ្យ transparent ពេលរលាយពីពណ៌ខ្មៅ ដើម្បីកុំឱ្យចេញពណ៌ប្រផេះស្រអាប់នៅកណ្តាល។',
            'ការចែក stop ច្រើនដំណាក់កាលជួយឱ្យការផ្លាស់ប្តូរភាពថ្លារលូនស្អាតនៅលើរូបភាព។',
            'radial-gradient ស្រាលៗនៅពីក្រោយចំណងជើង hero ជួយបន្ថែមជម្រៅដោយមិនបន្ថែមធាតុ HTML។',
          ],
          exampleTitle: 'ប្រៀបធៀប Scrim 2-Stop និង Eased Multi-Stop Scrim',
          tip: 'អ្នកអាចដាក់ radial-gradient ពន្លឺស្រាលមួយស្រទាប់លើផ្ទៃងងឹត ដើម្បីបង្កើតអារម្មណ៍ជម្រៅបែបគេហទំព័រទំនើបដោយប្រើតែ CSS ប៉ុន្មានបន្ទាត់។',
        },
      ],
      challenge: {
        prompt:
          'រចនាធាតុ .course-banner ដោយដាក់ពណ៌ផ្ទៃបម្រុង #0f172a ស្រទាប់ scrim ងងឹត 4-stop ពីក្រោមឡើងលើនៅពីលើ url("banner.jpg") កំណត់ background-size: cover ដាក់ទីតាំងនៅកណ្តាល និងមិនឱ្យរូបភាពត្រួតដដែលៗ។',
        hint: 'សរសេរ linear-gradient() នៅខាងមុខ url("banner.jpg") ក្នុង background-image ដោយញែកនឹងសញ្ញាក្បៀស រួចប្រើតម្លៃ rgb(15 23 42 / ...)។',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វីបានជា HSL ត្រូវបានពេញនិយមជាង Hex ពេលបង្កើតពណ៌ hover និងពណ៌ផ្ទៃស្រាលពីពណ៌ម៉ាកតែមួយ?',
          options: [
            'HSL ដំណើរការលឿនជាង Hex នៅលើ GPU',
            'HSL បំបែក Hue, Saturation និង Lightness ដាច់ពីគ្នា ធ្វើឱ្យងាយប្តូរភាពភ្លឺងងឹតដោយរក្សា Hue ដដែល',
            'កូដ Hex មិនគាំទ្រភាពថ្លា (transparency) ក្នុង CSS ទំនើបទេ',
            'HSL កែសម្រួលកម្រិតពណ៌កម្រិត contrast ដោយស្វ័យប្រវត្តិ',
          ],
          answer: 1,
          explanation:
            'ក្នុង HSL អ្នកគ្រាន់តែរក្សាមុំ Hue ឱ្យដដែល ហើយបង្កើន ឬបន្ថយ Lightness ដើម្បីទទួលបានពណ៌ស្រាល និងពណ៌ hover ស៊ីគ្នា។',
        },
        {
          question: 'តើ background-size: cover ធ្វើអ្វីពេលរូបភាពមានសមាមាត្រខុសពីប្រអប់ផ្ទុក?',
          options: [
            'ទាញរូបភាពឱ្យយឺតខូចទ្រង់ទ្រាយរហូតពេញប្រអប់',
            'ដាក់រូបភាពតម្រៀបដដែលៗដើម្បីបំពេញចន្លោះទទេ',
            'ពង្រីករូបភាពតាមសមាមាត្រដើមរហូតពេញប្រអប់ទាំងមូល ហើយកាត់គែមលើសចេញ',
            'បង្រួមរូបភាពឱ្យឃើញពេញទាំងមូលដោយទុកចន្លោះទទេជុំវិញ',
          ],
          answer: 2,
          explanation:
            'background-size: cover រក្សាសមាមាត្រដើមនៃរូបភាព ហើយបំពេញប្រអប់ទាំងមូលដោយគ្មានចន្លោះទទេ ដោយកាត់តែផ្នែកលើសគែម។',
        },
      ],
    },
  },

  // =========================================================================
  // 2. TYPOGRAPHY & CSS UNITS
  // =========================================================================
  {
    slug: 'css-typography-and-units',
    level: 'beginner',
    insertAfter: 'selectors-and-specificity',
    en: {
      title: 'Typography & CSS Units',
      duration: '14 min',
      summary:
        'Choose the right CSS unit (px, rem, em, %, dvh, ch), craft comfortable reading rhythm with line-height and measure, and eliminate number jitter with tabular-nums.',
      objectives: [
        'Pick between px, rem, em, %, ch, and dvh based on accessibility and responsive layout needs.',
        'Build readable typography with unitless line-height, 65ch line length limits, and tight heading tracking.',
        'Prevent horizontal layout jitter in counters, prices, and tables using font-variant-numeric: tabular-nums.',
      ],
      sections: [
        {
          id: 'absolute-vs-relative-units',
          heading: 'Mastering CSS Units: px, rem, em, %, dvh & ch',
          body: [
            'Choosing the right unit determines whether your UI scales gracefully across phones, ultrawide monitors, and custom browser font settings. Pixels (px) represent fixed visual units—ideal for hairline borders and subtle shadows—whereas rem scales relative to the root <html> font size (16px by default), respecting every user’s accessibility zoom settings.',
            'Other relative units solve specialized problems: em scales relative to the element’s own font size (handy for button padding that grows with text), ch equals the width of the "0" glyph (perfect for capping paragraph measure), and dvh (dynamic viewport height) tracks the real visible mobile screen height as browser toolbars expand or collapse—fixing the classic 100vh mobile cutoff bug.',
          ],
          points: [
            'Use rem for font sizes and major spacing so user browser font preferences are always respected.',
            'Prefer min-height: 100dvh over 100vh for full-screen mobile layouts so bottom buttons are never hidden behind browser bars.',
            'Use em for spacing tied tightly to text size (like icon-to-label gaps), and avoid stacking nested em font sizes which multiply unexpectedly.',
          ],
          table: {
            headers: ['Unit', 'Relative To', 'Recommended Use'],
            rows: [
              ['px', 'CSS reference pixel (fixed)', '1px borders, fine shadows, hairline dividers'],
              [
                'rem',
                'Root <html> font-size (default 16px)',
                'Typography scale, layout margins, section padding',
              ],
              ['em', 'Current element font-size', 'Button padding, icon gaps, badge spacing'],
              ['%', 'Parent element dimension', 'Fluid container widths and responsive columns'],
              ['ch', 'Width of the "0" character', 'Readable paragraph widths (max-width: 65ch)'],
              [
                'dvh',
                'Dynamic visible viewport height',
                'Full-screen hero sections and mobile app shells',
              ],
            ],
          },
          warning:
            'Avoid locking html { font-size: 14px; } in pixels. Hard-coding a pixel root size overrides a user’s browser accessibility font setting; leave html at its default 100% and scale components with rem.',
          tip: 'Combine clamp(1.75rem, 3vw, 2.75rem) for fluid display headings that scale smoothly between mobile and desktop without media queries.',
        },
        {
          id: 'readable-typography-hierarchy',
          heading: 'Readable Hierarchy: line-height, Measure (ch) & Tracking',
          body: [
            'Great web typography is invisible: readers scan effortlessly without noticing CSS rules. Three quiet details create that polish: unitless line-height (such as 1.6 for body copy and 1.15 for large headings), capping paragraph width around 60–65ch so eyes never lose their place jumping back to the next line, and tightening letter-spacing (e.g., -0.02em) on big headings so letters feel cohesive instead of loose.',
            'Always write line-height as a unitless number rather than pixels or em. When a parent sets line-height: 1.5, every child inherits the 1.5 multiplier and multiplies it by its own font-size; if you write line-height: 1.5em, children inherit the computed pixel height of the parent, causing giant headings to overlap vertically.',
          ],
          points: [
            'Body text reads best at 1rem–1.125rem with unitless line-height: 1.6 and max-width: 65ch.',
            'Large headings (2rem+) look sharper with tight tracking (letter-spacing: -0.02em) and compact line-height (1.1–1.2).',
            'Use text-wrap: balance on headings to prevent awkward single-word last lines.',
          ],
          example: {
            title: 'Editorial Typography Scale with ch Measure & Tight Heading Tracking',
            language: 'css',
            code: `.article {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  max-width: 65ch;
  color: #18181b;
}

.article h1 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-wrap: balance;
  margin-bottom: 0.75rem;
}

.article p {
  font-size: 1rem;
  line-height: 1.65;
  color: #3f3f46;
}`,
            playground: {
              html: `<article class="article">
  <span class="eyebrow">Design Engineering</span>
  <h1>Why 65 Characters Makes Long-Form Copy Effortless to Read</h1>
  <p>
    When lines stretch across a wide monitor, your eyes travel too far when returning
    to the left margin. Capping prose at <strong>65ch</strong> with a unitless
    <strong>1.65 line-height</strong> keeps every paragraph calm, scannable, and balanced.
  </p>
</article>`,
              css: `body { font-family: system-ui, -apple-system, sans-serif; padding: 20px; margin: 0; background: #fafafa; }
.article { max-width: 65ch; background: #fff; padding: 24px; border-radius: 14px; border: 1px solid #e4e4e7; }
.eyebrow { display: inline-block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #2563eb; margin-bottom: 8px; }
.article h1 { margin: 0 0 12px; font-size: 1.65rem; line-height: 1.15; letter-spacing: -0.02em; text-wrap: balance; color: #09090b; }
.article p { margin: 0; font-size: 0.98rem; line-height: 1.65; color: #3f3f46; }`,
              js: '',
            },
          },
        },
        {
          id: 'tabular-nums-and-text-craft',
          heading: 'Preventing Number Jitter with tabular-nums & Text Truncation',
          body: [
            'Most modern sans-serif fonts use proportional numerals by default: the digit "1" is much narrower than "8". In static prose that looks natural, but inside live timers, dashboards, cart totals, or aligned financial tables, changing digits cause the entire line to wiggle left and right on every update.',
            'Adding font-variant-numeric: tabular-nums tells the font to render every digit in an equal-width cell, eliminating layout jitter completely. Pair this with clean single-line truncation (overflow: hidden; white-space: nowrap; text-overflow: ellipsis) when displaying dynamic user names or file paths inside tight cards.',
          ],
          points: [
            'Apply font-variant-numeric: tabular-nums to timers, price tags, progress percentages, and data tables.',
            'text-overflow: ellipsis only works when paired with overflow: hidden and white-space: nowrap on a constrained container.',
            'Never hide critical button text with ellipsis when wrapping to two lines would keep it understandable.',
          ],
          example: {
            title: 'Live Timer: Proportional Digits vs tabular-nums',
            language: 'css',
            code: `.timer-value {
  font-size: 2rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.truncate-label {
  max-width: 22ch;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}`,
            playground: {
              html: `<div class="demo">
  <div class="row">
    <div>
      <span class="tag bad">Default (Jitters)</span>
      <div id="t1" class="clock">00:00.00</div>
    </div>
    <div>
      <span class="tag good">tabular-nums (Steady)</span>
      <div id="t2" class="clock tabular">00:00.00</div>
    </div>
  </div>
  <button id="toggle">Pause Timer</button>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; margin: 0; color: #0f172a; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
.row > div { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; text-align: center; }
.tag { display: inline-block; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 999px; margin-bottom: 8px; }
.bad { background: #fee2e2; color: #b91c1c; }
.good { background: #dcfce7; color: #15803d; }
.clock { font-size: 26px; font-weight: 700; letter-spacing: -0.02em; }
.tabular { font-variant-numeric: tabular-nums; }
button { padding: 8px 14px; border-radius: 8px; border: 1px solid #cbd5e1; background: #0f172a; color: #fff; font-weight: 600; cursor: pointer; transition: transform 140ms ease-out; }
button:active { transform: scale(0.97); }`,
              js: `let running = true, ms = 11080;
const t1 = document.getElementById('t1'), t2 = document.getElementById('t2'), btn = document.getElementById('toggle');
const fmt = (n) => {
  const m = String(Math.floor(n / 60000)).padStart(2, '0');
  const s = String(Math.floor((n % 60000) / 1000)).padStart(2, '0');
  const cs = String(Math.floor((n % 1000) / 10)).padStart(2, '0');
  return m + ':' + s + '.' + cs;
};
setInterval(() => {
  if (!running) return;
  ms += 37;
  const text = fmt(ms);
  t1.textContent = text;
  t2.textContent = text;
}, 40);
btn.onclick = () => { running = !running; btn.textContent = running ? 'Pause Timer' : 'Resume Timer'; };`,
            },
          },
          tip: 'You can inspect whether a font supports tabular numerals right in browser DevTools—all major system UI fonts (Inter, Segoe UI, SF Pro, Roboto) support it natively.',
        },
      ],
      challenge: {
        prompt:
          'Write CSS for a .summary-card that caps text width at 65ch, styles .summary-title at 2rem with line-height: 1.15 and letter-spacing: -0.02em, styles .summary-body at 1rem with unitless line-height: 1.6, and styles .kpi-number with font-variant-numeric: tabular-nums.',
        hint: 'Keep line-height unitless (1.15 and 1.6) and apply max-width: 65ch on the container or paragraph.',
        language: 'css',
        solutionCode: `.summary-card {
  max-width: 65ch;
}

.summary-title {
  font-size: 2rem;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.summary-body {
  font-size: 1rem;
  line-height: 1.6;
}

.kpi-number {
  font-size: 1.75rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}`,
      },
      quiz: [
        {
          question: 'Why is min-height: 100dvh better than 100vh for full-screen mobile layouts?',
          options: [
            '100dvh loads fonts faster on mobile connections',
            '100dvh dynamically adjusts to the visible viewport as mobile browser address bars show or hide',
            '100vh only works on desktop Chrome and Safari',
            '100dvh automatically centers child elements vertically',
          ],
          answer: 1,
          explanation:
            'On mobile browsers, 100vh often reflects the tall screen with the URL bar hidden, pushing bottom buttons off-screen. 100dvh dynamically tracks the actual visible viewport height.',
        },
        {
          question: 'What problem does font-variant-numeric: tabular-nums solve?',
          options: [
            'It converts Arabic numerals into Khmer numerals',
            'It gives every digit the same width so live counters and price columns do not jitter horizontally',
            'It forces numbers to use a bold font weight',
            'It wraps long numbers onto a second line automatically',
          ],
          answer: 1,
          explanation:
            'Tabular numerals give every digit (0–9) equal horizontal advance width, preventing timers, counters, and tables from shifting left and right as values update.',
        },
      ],
    },
    km: {
      title: 'អក្សរសាស្ត្រ (Typography) និងឯកតា CSS',
      duration: '14 នាទី',
      summary:
        'ជ្រើសរើសឯកតា CSS ឱ្យត្រូវ (px, rem, em, %, dvh, ch) រចនាចង្វាក់អានងាយស្រួលដោយប្រើ line-height និង ch ព្រមទាំងបំបាត់ការញ័រលេខដោយប្រើ tabular-nums។',
      objectives: [
        'ជ្រើសរើសរវាង px, rem, em, %, ch និង dvh ឱ្យសមនឹងតម្រូវការ responsive និង accessibility។',
        'បង្កើតអក្សរងាយអានជាមួយ unitless line-height ប្រវែងជួរ 65ch និង tracking តឹងសម្រាប់ចំណងជើងធំ។',
        'ការពារកុំឱ្យលេខញ័រក្នុងនាឡិកា តម្លៃទំនិញ និងតារាងដោយប្រើ font-variant-numeric: tabular-nums។',
      ],
      sections: [
        {
          id: 'absolute-vs-relative-units',
          heading: 'ស្វែងយល់ពីឯកតា CSS៖ px, rem, em, %, dvh និង ch',
          body: [
            'ការជ្រើសរើសឯកតាត្រឹមត្រូវកំណត់ថាតើ UI របស់អ្នកអាចសម្របខ្លួនបានល្អលើទូរស័ព្ទ អេក្រង់ធំ និងការកំណត់ទំហំអក្សររបស់អ្នកប្រើឬទេ។ ភីកសែល (px) ជាតម្លៃថេរ សមសម្រាប់ស៊ុម 1px និងស្រមោលតូចៗ ចំណែក rem គណនាធៀបនឹងទំហំអក្សរឫស <html> (16px តាមលំនាំដើម) ដូច្នេះវាគោរពការពង្រីកអក្សររបស់អ្នកប្រើជានិច្ច។',
            'ឯកតាធៀបផ្សេងទៀតដោះស្រាយបញ្ហាជាក់លាក់៖ em ធៀបនឹងទំហំអក្សរនៃធាតុខ្លួនឯង ch ស្មើទទឹងតួអក្សរ "0" (ល្អសម្រាប់កំណត់ប្រវែងកថាខណ្ឌ) ហើយ dvh (dynamic viewport height) តាមដានកម្ពស់អេក្រង់ទូរស័ព្ទពិតប្រាកដពេលរបារ URL បង្ហាញ ឬលាក់—ដោះស្រាយបញ្ហា 100vh លើទូរស័ព្ទ។',
          ],
          points: [
            'ប្រើ rem សម្រាប់ទំហំអក្សរ និងគម្លាតធំៗ ដើម្បីគោរពការកំណត់អក្សរក្នុងកម្មវិធីរុករករបស់អ្នកប្រើ។',
            'ប្រើ min-height: 100dvh ជំនួស 100vh សម្រាប់ទំព័រពេញអេក្រង់លើទូរស័ព្ទ កុំឱ្យប៊ូតុងខាងក្រោមត្រូវរបារអាសយដ្ឋានបាំង។',
            'ប្រើ em សម្រាប់ padding ប៊ូតុង ឬគម្លាតរូបតំណាងដែលគួរពង្រីកតាមអក្សរ ហើយជៀសវាងការដាក់ em ត្រួតគ្នាច្រើនជាន់។',
          ],
          table: {
            headers: ['ឯកតា', 'ធៀបជាមួយ', 'ការប្រើប្រាស់សមស្រប'],
            rows: [
              ['px', 'ភីកសែល CSS ថេរ', 'ស៊ុម 1px ស្រមោល និងបន្ទាត់បំបែក'],
              ['rem', 'ទំហំអក្សរ <html> (លំនាំដើម 16px)', 'ទំហំអក្សរ គម្លាត margin និង padding'],
              ['em', 'ទំហំអក្សរនៃធាតុបច្ចុប្បន្ន', 'padding ប៊ូតុង គម្លាតអាយខុន និង badge'],
              ['%', 'ទំហំធាតុមេ (parent)', 'ទទឹងប្រអប់បត់បែន និងជួរឈរ responsive'],
              ['ch', 'ទទឹងតួអក្សរ "0"', 'កំណត់ប្រវែងជួរកថាខណ្ឌ (max-width: 65ch)'],
              ['dvh', 'កម្ពស់ viewport ជាក់ស្តែង', 'Hero ពេញអេក្រង់ និងកម្មវិធីលើទូរស័ព្ទ'],
            ],
          },
          warning:
            'ជៀសវាងការកំណត់ html { font-size: 14px; } ជាភីកសែលថេរ ព្រោះវាបំបាត់សិទ្ធិពង្រីកអក្សរ accessibility របស់អ្នកប្រើ។ ទុក <html> នៅ 100% ហើយប្រើ rem វិញ។',
          tip: 'ប្រើ clamp(1.75rem, 3vw, 2.75rem) សម្រាប់ចំណងជើងធំដែលរីករួមដោយរលូនរវាងទូរស័ព្ទ និងកុំព្យូទ័រដោយមិនចាំបាច់សរសេរ media query។',
        },
        {
          id: 'readable-typography-hierarchy',
          heading: 'លំដាប់អក្សរងាយអាន៖ line-height, ប្រវែងជួរ (ch) និង Tracking',
          body: [
            'អក្សរសាស្ត្រគេហទំព័រល្អជួយឱ្យអ្នកអានអានបានរលូនដោយមិនហត់ភ្នែក។ កត្តាសំខាន់បីគឺ៖ line-height គ្មានឯកតា (ដូចជា 1.6 សម្រាប់អត្ថបទ និង 1.15 សម្រាប់ចំណងជើងធំ) កំណត់ប្រវែងកថាខណ្ឌត្រឹម 60–65ch កុំឱ្យជួរវែងពេក និងបង្រួម letter-spacing បន្តិច (-0.02em) លើចំណងជើងធំៗ។',
            'តែងតែសរសេរ line-height ជាលេខសុទ្ធគ្មានឯកតា (ឧ. 1.5)។ ពេលធាតុមេកំណត់ line-height: 1.5 ធាតុកូននឹងទទួលមេគុណ 1.5 ទៅគុណនឹងទំហំអក្សរផ្ទាល់ខ្លួន ប៉ុន្តែបើសរសេរ 1.5em ធាតុកូននឹងទទួលកម្ពស់ភីកសែលថេរ ដែលធ្វើឱ្យចំណងជើងធំត្រួតគ្នា។',
          ],
          points: [
            'អត្ថបទធម្មតាងាយអានបំផុតនៅទំហំ 1rem–1.125rem ជាមួយ line-height: 1.6 និង max-width: 65ch។',
            'ចំណងជើងធំ (2rem ឡើង) មើលទៅមុតស្អាតពេលប្រើ letter-spacing: -0.02em និង line-height 1.1–1.2។',
            'ប្រើ text-wrap: balance លើចំណងជើង ដើម្បីកុំឱ្យសល់ពាក្យតែមួយឯកោនៅជួរចុងក្រោយ។',
          ],
          exampleTitle: 'រចនាអត្ថបទជាមួយប្រវែង 65ch និង Tracking តឹងសម្រាប់ចំណងជើង',
        },
        {
          id: 'tabular-nums-and-text-craft',
          heading: 'ការពារការញ័រលេខដោយ tabular-nums និងការកាត់អក្សរលើស',
          body: [
            'ពុម្ពអក្សរ sans-serif ទំនើបភាគច្រើនប្រើលេខដែលមានទទឹងខុសគ្នា (proportional numerals)៖ លេខ "1" តូចចង្អៀតជាងលេខ "8"។ នៅក្នុងនាឡិកា តម្លៃសរុប ឬតារាងទិន្នន័យដែលផ្លាស់ប្តូរលឿន លេខទាំងនោះនឹងញ័រឆ្វេងស្តាំរាល់វិនាទី។',
            'ការបន្ថែម font-variant-numeric: tabular-nums កំណត់ឱ្យគ្រប់ខ្ទង់លេខមានទទឹងស្មើគ្នា ធ្វើឱ្យលេខឈរនឹងល្អគ្មានការញ័រ។ សម្រាប់អក្សរវែងក្នុងកាតតូច អ្នកអាចផ្គូផ្គង overflow: hidden, white-space: nowrap និង text-overflow: ellipsis ដើម្បីបង្ហាញសញ្ញា (...) យ៉ាងស្អាត។',
          ],
          points: [
            'ប្រើ font-variant-numeric: tabular-nums លើនាឡិកា តម្លៃ ភាគរយ និងតារាងទិន្នន័យ។',
            'text-overflow: ellipsis ដំណើរការលុះត្រាតែប្រើរួមជាមួយ overflow: hidden និង white-space: nowrap។',
            'កុំកាត់អក្សរប៊ូតុងសំខាន់ៗដោយ ellipsis បើអាចឱ្យវាចុះជួរបានយ៉ាងស្រួល។',
          ],
          exampleTitle: 'នាឡិកាផ្ទាល់៖ ប្រៀបធៀបលេខធម្មតា និង tabular-nums',
          tip: 'ពុម្ពអក្សរប្រព័ន្ធទំនើបទាំងអស់ (Inter, Segoe UI, SF Pro, Roboto) គាំទ្រ font-variant-numeric: tabular-nums ស្រាប់។',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ CSS សម្រាប់ .summary-card ដោយកំណត់ max-width: 65ch រចនា .summary-title ទំហំ 2rem ជាមួយ line-height: 1.15 និង letter-spacing: -0.02em រចនា .summary-body ទំហំ 1rem ជាមួយ line-height: 1.6 និងដាក់ font-variant-numeric: tabular-nums លើ .kpi-number។',
        hint: 'សរសេរ line-height ជាលេខគ្មានឯកតា (1.15 និង 1.6) ហើយដាក់ max-width: 65ch លើធាតុផ្ទុក។',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វីបានជា min-height: 100dvh ល្អជាង 100vh សម្រាប់ទំព័រពេញអេក្រង់លើទូរស័ព្ទ?',
          options: [
            '100dvh ជួយទាញយកពុម្ពអក្សរលឿនជាងលើទូរស័ព្ទ',
            '100dvh កែសម្រួលកម្ពស់តាមអេក្រង់ជាក់ស្តែងពេលរបារ URL លើទូរស័ព្ទបង្ហាញ ឬលាក់',
            '100vh ដំណើរការតែលើកុំព្យូទ័រប៉ុណ្ណោះ',
            '100dvh ដាក់ធាតុកូននៅកណ្តាលបញ្ឈរដោយស្វ័យប្រវត្តិ',
          ],
          answer: 1,
          explanation:
            'លើទូរស័ព្ទ 100vh តែងតែវែងជាងអេក្រង់ដែលមើលឃើញពេលរបារអាសយដ្ឋានបើក ប៉ុន្តែ 100dvh សម្របតាមកម្ពស់ជាក់ស្តែងដោយស្វ័យប្រវត្តិ។',
        },
        {
          question: 'តើ font-variant-numeric: tabular-nums ដោះស្រាយបញ្ហាអ្វី?',
          options: [
            'បម្លែងលេខអារ៉ាប់ទៅជាលេខខ្មែរ',
            'ផ្តល់ទទឹងស្មើគ្នាដល់គ្រប់ខ្ទង់លេខ ដើម្បីកុំឱ្យលេខរាប់ ឬតារាងតម្លៃញ័រឆ្វេងស្តាំ',
            'បង្ខំឱ្យលេខមានទម្ងន់ដិត (bold) ជានិច្ច',
            'ឱ្យលេខវែងចុះជួរថ្មីដោយស្វ័យប្រវត្តិ',
          ],
          answer: 1,
          explanation:
            'Tabular numerals ធ្វើឱ្យខ្ទង់លេខ 0–9 មានទទឹងស្មើគ្នា ដូច្នេះនាឡិកា លេខរាប់ និងតារាងតម្លៃមិនញ័រពេលលេខផ្លាស់ប្តូរឡើយ។',
        },
      ],
    },
  },

  // =========================================================================
  // 3. OVERFLOW, BORDERS, SHADOWS & BORDER-RADIUS
  // =========================================================================
  {
    slug: 'css-overflow-and-borders',
    level: 'intermediate',
    insertAfter: 'box-model',
    en: {
      title: 'Overflow, Borders, Shadows & Border Radius',
      duration: '12 min',
      summary:
        'Control overflowing content without breaking sticky positioning, distinguish outline from border to eliminate layout jump, and layer subtle modern shadows.',
      objectives: [
        'Select the right overflow mode (visible, hidden, clip, auto, scroll) for cards, modals, and horizontal strips.',
        'Explain the layout difference between border and outline, and calculate concentric border-radius curves.',
        'Craft realistic depth with subtle multi-layered box-shadow values instead of muddy single shadows.',
      ],
      sections: [
        {
          id: 'controlling-overflow',
          heading: 'Controlling Overflow: visible, hidden, clip, auto & scroll',
          body: [
            'Every HTML element lives inside a rectangular box. When its inner content is taller or wider than fixed dimensions allow, CSS lets you choose how the browser responds via overflow (or per-axis with overflow-x and overflow-y). By default, overflow: visible lets content spill outside the box so nothing is accidentally erased.',
            'Setting overflow: auto adds scrollbars only when content actually overflows—ideal for code blocks, chat logs, and horizontal pill bars—whereas overflow: hidden cuts off excess pixels cleanly (such as clipping a photo to match a card’s border-radius). Modern CSS also offers overflow: clip, which clips visuals without turning the box into a scroll container.',
          ],
          points: [
            'Use overflow-x: auto on wide tables or tag bars so small screens can scroll horizontally without breaking page width.',
            'Prefer overflow: auto over overflow: scroll so desktop platforms do not show empty disabled scrollbar tracks.',
            'Use overflow: clip when you only want clean visual clipping around rounded corners without blocking sticky descendants.',
          ],
          table: {
            headers: ['Value', 'Clips Content?', 'Scrollable?', 'Best Use Case'],
            rows: [
              [
                'visible',
                'No (default)',
                'No',
                'Normal flow and popovers that need to escape a box',
              ],
              ['hidden', 'Yes', 'Programmatically only', 'Cropping media inside fixed frames'],
              [
                'clip',
                'Yes',
                'No (not a scroll container)',
                'Rounded cards containing position: sticky headers',
              ],
              [
                'auto',
                'Yes',
                'Only when overflowing',
                'Code snippets, modals, sidebars, wide tables',
              ],
              [
                'scroll',
                'Yes',
                'Always shows track',
                'Rare; only when fixed scrollbar gutter is required',
              ],
            ],
          },
          example: {
            title: 'Interactive Overflow Mode Switcher',
            language: 'css',
            code: `.code-window {
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid #e4e4e7;
  border-radius: 12px;
}

.media-card {
  border-radius: 16px;
  overflow: clip; /* Clips corners without breaking sticky children */
}`,
            playground: {
              html: `<div class="ov-demo">
  <div class="btns">
    <button data-mode="visible">visible</button>
    <button data-mode="hidden">hidden</button>
    <button data-mode="auto" class="active">auto</button>
    <button data-mode="scroll">scroll</button>
  </div>
  <div id="box" class="box">
    <strong>Release Notes v2.4</strong>
    <p>Added CSS subgrid support, faster hot module reloads, and smoother spring-like cubic-bezier easing across drawers and tooltips.</p>
    <p>Fixed mobile 100dvh viewport sizing and improved keyboard focus-visible rings on dark surfaces.</p>
  </div>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 16px; margin: 0; color: #0f172a; }
.btns { display: flex; gap: 6px; margin-bottom: 12px; flex-wrap: wrap; }
button { padding: 5px 11px; border-radius: 8px; border: 1px solid #cbd5e1; background: #fff; font-weight: 600; font-size: 13px; cursor: pointer; transition: transform 140ms ease-out, background-color 140ms ease-out; }
button:active { transform: scale(0.97); }
button.active { background: #2563eb; color: #fff; border-color: #2563eb; }
.box { height: 96px; padding: 12px 14px; border-radius: 12px; border: 2px solid #94a3b8; background: #f8fafc; overflow: auto; font-size: 13px; line-height: 1.5; }
.box p { margin: 6px 0 0; color: #475569; }`,
              js: `const box = document.getElementById('box');
const btns = document.querySelectorAll('button[data-mode]');
btns.forEach((b) => {
  b.onclick = () => {
    box.style.overflow = b.dataset.mode;
    btns.forEach((x) => x.classList.remove('active'));
    b.classList.add('active');
  };
});`,
            },
          },
          warning:
            'Setting overflow: hidden or overflow: auto on any ancestor element silently disables position: sticky on elements inside it. Use overflow: clip whenever you only need visual cropping.',
        },
        {
          id: 'borders-vs-outlines',
          heading: 'Borders, Concentric border-radius & Outline vs Border',
          body: [
            'A border is part of an element’s box model: changing border-width from 1px to 2px on hover or focus grows the element and nudges surrounding UI by a pixel. An outline, by contrast, paints strictly outside the border edge without taking up any layout space, making outline + outline-offset the gold standard for focus rings and selection highlights.',
            'For rounded corners, border-radius accepts pixels, rem, or percentages—use 9999px for pill badges and 50% on a square avatar for a perfect circle. When nesting a rounded child inside a padded rounded container, match their curvature optically using the concentric radius formula: innerRadius = outerRadius - padding.',
          ],
          points: [
            'Never thicken a border on :hover or :focus—use outline or box-shadow so layout stays 100% still.',
            'outline follows border-radius automatically in all modern browsers and supports outline-offset for breathing room.',
            'If a card has border-radius: 16px and padding: 8px, give its inner image border-radius: 8px (16 - 8) for crisp concentric corners.',
          ],
          example: {
            title: 'Concentric Rounded Card & Zero-Shift Outline Focus Ring',
            language: 'css',
            code: `.outer-card {
  padding: 8px;
  border-radius: 16px;
  border: 1px solid #e4e4e7;
}

.outer-card img {
  display: block;
  width: 100%;
  border-radius: 8px; /* 16px outer - 8px padding = concentric! */
}

.interactive-tile {
  border: 1px solid #d4d4d8;
  border-radius: 12px;
}

.interactive-tile:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 3px; /* Zero layout shift */
}`,
          },
          tip: 'Use border-radius: 9999px instead of 50% for pill buttons—50% turns wide rectangles into ovals, whereas 9999px always draws clean half-circle ends.',
        },
        {
          id: 'subtle-layered-shadows',
          heading: 'Subtle Multi-Layered box-shadow Craft',
          body: [
            'The box-shadow property takes offset-x, offset-y, blur-radius, optional spread-radius, and color (plus optional inset for inner shadows). Beginners often apply a single dark shadow like 0 10px 25px rgba(0,0,0,0.35), which looks heavy and artificial on clean interfaces.',
            'Polished UI surfaces instead combine two or three ultra-low-opacity layers: a tight 1px crisp ring (0 0 0 1px rgb(15 23 42 / 0.06)) that defines the edge even over images, paired with a close ambient shadow and a soft downward drop shadow. Because shadows are comma-separated, you can stack them cleanly inside a single declaration.',
          ],
          points: [
            'A 1px translucent shadow ring (0 0 0 1px rgb(0 0 0 / 0.06)) blends more naturally over colorful backgrounds than an opaque gray border.',
            'Keep shadow opacity low (4%–12%) on light backgrounds and increase vertical offset gently as elevation rises.',
            'An inset top highlight (inset 0 1px 0 rgb(255 255 255 / 0.2)) adds subtle tactile sheen to dark buttons.',
          ],
          example: {
            title: 'Three-Tier Layered Elevation Cards',
            language: 'css',
            code: `.elevation-sm {
  box-shadow:
    0 0 0 1px rgb(15 23 42 / 0.06),
    0 1px 2px rgb(15 23 42 / 0.05);
}

.elevation-md {
  box-shadow:
    0 0 0 1px rgb(15 23 42 / 0.06),
    0 4px 12px -2px rgb(15 23 42 / 0.08),
    0 2px 4px -1px rgb(15 23 42 / 0.04);
}

.elevation-lg {
  box-shadow:
    0 0 0 1px rgb(15 23 42 / 0.06),
    0 18px 36px -8px rgb(15 23 42 / 0.14),
    0 6px 14px -4px rgb(15 23 42 / 0.06);
}`,
            playground: {
              html: `<div class="grid">
  <div class="card sm"><strong>Level 1</strong><span>Subtle ring + crisp rest</span></div>
  <div class="card md"><strong>Level 2</strong><span>Hoverable content card</span></div>
  <div class="card lg"><strong>Level 3</strong><span>Floating menu / popover</span></div>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 24px 16px; margin: 0; background: #f8fafc; color: #0f172a; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.card { background: #fff; padding: 16px; border-radius: 14px; display: flex; flex-direction: column; gap: 4px; transition: transform 180ms cubic-bezier(0.23, 1, 0.32, 1); }
.card:hover { transform: translateY(-2px); }
.card strong { font-size: 14px; }
.card span { font-size: 12px; color: #64748b; }
.sm { box-shadow: 0 0 0 1px rgb(15 23 42 / 0.07), 0 1px 2px rgb(15 23 42 / 0.05); }
.md { box-shadow: 0 0 0 1px rgb(15 23 42 / 0.06), 0 6px 14px -3px rgb(15 23 42 / 0.09), 0 2px 4px -1px rgb(15 23 42 / 0.04); }
.lg { box-shadow: 0 0 0 1px rgb(15 23 42 / 0.06), 0 18px 34px -8px rgb(15 23 42 / 0.15), 0 6px 12px -4px rgb(15 23 42 / 0.06); }`,
              js: '',
            },
          },
        },
      ],
      challenge: {
        prompt:
          'Style a .card-panel with border-radius: 16px, overflow: clip, a two-layer subtle box-shadow (a 1px 6% dark ring plus a soft 12px downward shadow), and a :focus-visible state using a 2px solid #2563eb outline with 3px outline-offset.',
        hint: 'Separate the two shadow layers with a comma inside box-shadow, and use outline instead of border inside :focus-visible.',
        language: 'css',
        solutionCode: `.card-panel {
  border-radius: 16px;
  overflow: clip;
  background-color: #ffffff;
  box-shadow:
    0 0 0 1px rgb(15 23 42 / 0.06),
    0 6px 16px -4px rgb(15 23 42 / 0.1);
}

.card-panel:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 3px;
}`,
      },
      quiz: [
        {
          question: 'Why should focus rings use outline instead of increasing border-width?',
          options: [
            'outline supports colors while border only supports black and gray',
            'outline does not occupy box-model space, so it never shifts surrounding layout',
            'border cannot be used on buttons or links',
            'outline automatically fades in with a CSS animation',
          ],
          answer: 1,
          explanation:
            'Because outline paints outside the border edge without changing element dimensions, toggling it on focus or hover causes zero layout shift.',
        },
        {
          question:
            'When a rounded card contains a position: sticky header inside it, which overflow value clips the card corners without breaking sticky behavior?',
          options: ['overflow: hidden', 'overflow: scroll', 'overflow: auto', 'overflow: clip'],
          answer: 3,
          explanation:
            'overflow: clip visually crops overflowing pixels without creating a scroll container, allowing position: sticky descendants to keep working normally.',
        },
      ],
    },
    km: {
      title: 'ការហៀរមាតិកា (Overflow) ស៊ុម ស្រមោល និងជ្រុងមូល',
      duration: '12 នាទី',
      summary:
        'គ្រប់គ្រងមាតិកាហៀរដោយមិនបំផ្លាញ position: sticky បែងចែក outline និង border ដើម្បីកុំឱ្យ layout លោត និងបង្កើតស្រមោលច្រើនស្រទាប់ដ៏ស្រទន់។',
      objectives: [
        'ជ្រើសរើសតម្លៃ overflow (visible, hidden, clip, auto, scroll) ឱ្យត្រូវសម្រាប់កាត modal និងរបារអូស។',
        'ពន្យល់ភាពខុសគ្នារវាង border និង outline ព្រមទាំងគណនាជ្រុងមូលស្របគ្នា (concentric border-radius)។',
        'បង្កើតជម្រៅស្អាតដោយប្រើ box-shadow ច្រើនស្រទាប់ស្រាលៗជំនួសស្រមោលងងឹតធ្ងន់តែមួយ។',
      ],
      sections: [
        {
          id: 'controlling-overflow',
          heading: 'ការគ្រប់គ្រង Overflow៖ visible, hidden, clip, auto និង scroll',
          body: [
            'ធាតុ HTML ទាំងអស់ស្ថិតក្នុងប្រអប់ចតុកោណ។ ពេលមាតិកាខាងក្នុងធំជាងទទឹង ឬកម្ពស់ប្រអប់ CSS អនុញ្ញាតឱ្យអ្នកកំណត់ឥរិយាបថតាមរយៈ overflow (ឬញែកអ័ក្ស overflow-x និង overflow-y)។ តាមលំនាំដើម overflow: visible អនុញ្ញាតឱ្យមាតិកាហៀរចេញក្រៅប្រអប់។',
            'overflow: auto បង្ហាញរបារអូសតែពេលមាតិកាពិតជាហៀរ—ល្អសម្រាប់ប្រអប់កូដ និងតារាងធំ—ចំណែក overflow: hidden កាត់ផ្នែកហៀរចេញ។ CSS ទំនើបក៏មាន overflow: clip ដែលកាត់រូបភាពហៀរដោយមិនបង្កើត scroll container ឡើយ។',
          ],
          points: [
            'ប្រើ overflow-x: auto លើតារាងធំ ឬរបារ tag ដើម្បីឱ្យអេក្រង់តូចអូសផ្តេកបានដោយមិនបែកទំព័រ។',
            'ប្រើ overflow: auto ជំនួស scroll ដើម្បីកុំឱ្យបង្ហាញផ្លូវ scrollbar ទទេលើកុំព្យូទ័រ។',
            'ប្រើ overflow: clip ពេលចង់កាត់ជ្រុងមូលឱ្យស្អាតដោយមិនបិទដំណើរការ position: sticky របស់ធាតុកូន។',
          ],
          table: {
            headers: ['តម្លៃ', 'កាត់មាតិកា?', 'អូសបាន?', 'ករណីប្រើល្អបំផុត'],
            rows: [
              ['visible', 'ទេ (លំនាំដើម)', 'ទេ', 'លំហូរធម្មតា និង popover ដែលត្រូវលៀនចេញ'],
              ['hidden', 'បាទ/ចាស', 'តាម JS ប៉ុណ្ណោះ', 'កាត់រូបភាពក្នុងស៊ុមទំហំថេរ'],
              [
                'clip',
                'បាទ/ចាស',
                'ទេ (មិនបង្កើត scroll box)',
                'កាតជ្រុងមូលដែលមានក្បាល sticky ខាងក្នុង',
              ],
              ['auto', 'បាទ/ចាស', 'តែពេលហៀរ', 'ប្រអប់កូដ modal និងតារាងទិន្នន័យ'],
              [
                'scroll',
                'បាទ/ចាស',
                'បង្ហាញផ្លូវអូសជានិច្ច',
                'ករណីកម្រដែលត្រូវការចន្លោះ scrollbar ថេរ',
              ],
            ],
          },
          exampleTitle: 'សាកល្បងផ្លាស់ប្តូររបៀប Overflow ផ្ទាល់',
          warning:
            'ការដាក់ overflow: hidden ឬ overflow: auto លើធាតុមេណាមួយ នឹងធ្វើឱ្យ position: sticky របស់ធាតុកូនលែងដំណើរការ។ ប្រើ overflow: clip វិញពេលត្រូវការតែការកាត់រូបភាព។',
        },
        {
          id: 'borders-vs-outlines',
          heading: 'Borders, ជ្រុងមូលស្របគ្នា និងភាពខុសគ្នារវាង Outline និង Border',
          body: [
            'Border ជាផ្នែកមួយនៃ box model៖ ការប្តូរកម្រាស់ border ពី 1px ទៅ 2px ពេល hover ឬ focus នឹងធ្វើឱ្យធាតុរីក ហើយរុញធាតុជុំវិញឱ្យលោត។ ចំណែក outline គូរនៅខាងក្រៅ border ដោយមិនស៊ីទំហំ layout ឡើយ ធ្វើឱ្យ outline និង outline-offset ល្អបំផុតសម្រាប់រង្វង់ focus។',
            'សម្រាប់ជ្រុងមូល border-radius ទទួលភីកសែល rem ឬភាគរយ—ប្រើ 9999px សម្រាប់រាងគ្រាប់ថ្នាំ (pill) និង 50% លើប្រអប់ការ៉េសម្រាប់រង្វង់មូល។ ពេលដាក់ធាតុជ្រុងមូលមួយនៅក្នុងប្រអប់មាន padding សូមគណនា៖ innerRadius = outerRadius - padding ដើម្បីឱ្យជ្រុងកោងស្របគ្នាស្អាត។',
          ],
          points: [
            'កុំបង្កើនកម្រាស់ border ពេល :hover ឬ :focus—ប្រើ outline ឬ box-shadow កុំឱ្យ layout លោត។',
            'outline តាមដានជ្រុង border-radius ដោយស្វ័យប្រវត្តិ និងអាចបន្ថែមគម្លាតដោយ outline-offset។',
            'បើកាតមាន border-radius: 16px និង padding: 8px សូមដាក់រូបភាពខាងក្នុង border-radius: 8px (16 - 8)។',
          ],
          exampleTitle: 'កាតជ្រុងកោងស្របគ្នា និងរង្វង់ Focus ដោយប្រើ Outline',
          tip: 'ប្រើ border-radius: 9999px ជំនួស 50% សម្រាប់ប៊ូតុងរាងគ្រាប់ថ្នាំ ព្រោះ 50% ធ្វើឱ្យប្រអប់វែងក្លាយជារាងពងក្រពើ។',
        },
        {
          id: 'subtle-layered-shadows',
          heading: 'ការរចនាស្រមោល box-shadow ច្រើនស្រទាប់ដ៏ស្រទន់',
          body: [
            'box-shadow ទទួលតម្លៃ offset-x, offset-y, blur-radius, spread-radius និងពណ៌ (ព្រមទាំង inset សម្រាប់ស្រមោលខាងក្នុង)។ ស្រមោលខ្មៅដិតតែមួយជាន់ច្រើនមើលទៅធ្ងន់ និងចាស់គំរិល។',
            'UI ទំនើបប្រើស្រមោលថ្លាៗ ២ ទៅ ៣ ស្រទាប់ផ្សំគ្នា៖ ស្រទាប់ស៊ុម 1px ស្រាល (0 0 0 1px rgb(15 23 42 / 0.06)) ដើម្បីច្បាស់គែម ផ្សំជាមួយស្រមោលជិត និងស្រមោលធ្លាក់ចុះក្រោមស្រទន់។ អ្នកអាចសរសេរស្រទាប់ទាំងអស់ញែកដោយសញ្ញាក្បៀស។',
          ],
          points: [
            'ស្រមោលរង្វង់ 1px ថ្លា (0 0 0 1px rgb(0 0 0 / 0.06)) ស៊ីគ្នាល្អជាង border ពណ៌ប្រផេះរឹងលើផ្ទៃចម្រុះពណ៌។',
            'រក្សាភាពថ្លានៃស្រមោលឱ្យទាប (4%–12%) លើផ្ទៃភ្លឺ ហើយបង្កើន offset-y បន្តិចម្តងៗតាមកម្ពស់។',
            'ស្រមោល inset ខាងលើ (inset 0 1px 0 rgb(255 255 255 / 0.2)) បន្ថែមពន្លឺគែមស្អាតលើប៊ូតុងងងឹត។',
          ],
          exampleTitle: 'កាតបង្ហាញកម្រិតកម្ពស់ស្រមោល ៣ ថ្នាក់',
        },
      ],
      challenge: {
        prompt:
          'រចនា .card-panel ដោយដាក់ border-radius: 16px, overflow: clip, ស្រមោល box-shadow ២ ស្រទាប់ (រង្វង់ 1px ភាពថ្លា 6% និងស្រមោលទន់ចុះក្រោម) ព្រមទាំងស្ថានភាព :focus-visible ប្រើ outline: 2px solid #2563eb និង outline-offset: 3px។',
        hint: 'ញែកស្រទាប់ box-shadow ទាំងពីរដោយសញ្ញាក្បៀស ហើយប្រើ outline ជំនួស border ក្នុង :focus-visible។',
      },
      quiz: [
        {
          question: 'ហេតុអ្វីបានជារង្វង់ focus គួរប្រើ outline ជំនួសឱ្យការបង្កើន border-width?',
          options: [
            'outline គាំទ្រពណ៌ ចំណែក border គាំទ្រតែខ្មៅ និងប្រផេះ',
            'outline មិនស៊ីទំហំ box model ដូច្នេះវាមិនធ្វើឱ្យ layout ជុំវិញលោតទេ',
            'border មិនអាចប្រើលើប៊ូតុង ឬតំណភ្ជាប់បានទេ',
            'outline បង្កើតចលនា fade-in ដោយស្វ័យប្រវត្តិ',
          ],
          answer: 1,
          explanation:
            'outline គូរនៅខាងក្រៅគែម border ដោយមិនផ្លាស់ប្តូរទំហំធាតុ ដូច្នេះវាមិនបង្កឱ្យមានការលោត layout ឡើយ។',
        },
        {
          question:
            'ពេលកាតជ្រុងមូលមានក្បាល position: sticky នៅខាងក្នុង តើតម្លៃ overflow មួយណាដែលកាត់ជ្រុងកាតដោយមិនធ្វើឱ្យ sticky ខូច?',
          options: ['overflow: hidden', 'overflow: scroll', 'overflow: auto', 'overflow: clip'],
          answer: 3,
          explanation:
            'overflow: clip កាត់ផ្នែកហៀរចេញដោយមិនបង្កើត scroll container ធ្វើឱ្យ position: sticky នៅខាងក្នុងដំណើរការធម្មតា។',
        },
      ],
    },
  },

  // =========================================================================
  // 4. DISPLAY, POSITIONING & Z-INDEX
  // =========================================================================
  {
    slug: 'css-display-and-positioning',
    level: 'intermediate',
    insertAfter: 'css-overflow-and-borders',
    en: {
      title: 'Display, Positioning & z-index',
      duration: '15 min',
      summary:
        'Control element flow with display modes, build pinned badges and sticky headers using relative, absolute, fixed, and sticky positioning, and demystify z-index stacking contexts.',
      objectives: [
        'Differentiate block, inline, inline-block, display: none, and visibility: hidden.',
        'Position badges, sticky section headers, and floating bars with relative, absolute, fixed, and sticky.',
        'Predict and control front-to-back layering with z-index and CSS stacking contexts.',
      ],
      sections: [
        {
          id: 'display-modes-fundamentals',
          heading: 'Display Modes: block, inline, inline-block & none',
          body: [
            'The display property controls how an element participates in normal document flow. Block elements (<div>, <p>, <section>) start on a new line, fill available horizontal width, and respect width, height, and all four margins. Inline elements (<span>, <a>, <strong>) sit side-by-side inside a line of text, wrap naturally across lines, and ignore width, height, and vertical margins.',
            'When you want a badge or button to sit inline beside text while still respecting explicit width, height, and top/bottom padding, use display: inline-block (or inline-flex for icon + label alignment). To hide an element completely from both layout and assistive technology, set display: none; if you want to hide pixels while keeping the empty space reserved in the layout, use visibility: hidden instead.',
          ],
          points: [
            'Inline elements ignore width, height, margin-top, and margin-bottom—switch to inline-block or inline-flex when you need box sizing.',
            'display: none removes the element from flow and screen readers; visibility: hidden preserves its empty footprint.',
            'Always set flex-shrink: 0 on avatars and icons inside flex layouts so adjacent text never squashes them.',
          ],
          table: {
            headers: ['Declaration', 'Starts New Line?', 'Honors width/height?', 'Typical Use'],
            rows: [
              ['display: block', 'Yes', 'Yes', 'Paragraphs, cards, page sections'],
              ['display: inline', 'No', 'No', 'Links, highlighted words inside sentences'],
              ['display: inline-block', 'No', 'Yes', 'Pills, badges, inline buttons'],
              ['display: none', 'Removed from flow', 'N/A', 'Closed dropdowns, inactive tabs'],
              [
                'visibility: hidden',
                'Keeps space',
                'Yes',
                'Hidden placeholders without layout shift',
              ],
            ],
          },
          tip: 'For buttons containing an icon and text label, display: inline-flex; align-items: center; gap: 0.5rem aligns both pieces effortlessly.',
        },
        {
          id: 'css-positioning-modes',
          heading: 'Positioning: relative, absolute, fixed & sticky',
          body: [
            'By default, every element uses position: static and ignores top, right, bottom, left, and z-index. Switching to position: relative keeps the element in normal flow (reserving its original slot) while allowing subtle visual offsets—and, most importantly, turns that element into the positioning anchor for any position: absolute children inside it.',
            'An element with position: absolute leaves normal flow completely and anchors itself to its nearest positioned ancestor (any ancestor whose position is not static). Use position: fixed to pin navbars or floating action buttons to the browser viewport during scroll, and position: sticky (paired with an offset like top: 0) to keep table or section headers pinned until their parent container scrolls away.',
          ],
          points: [
            'Pinned badge pattern: put position: relative on the card or icon wrapper, and position: absolute; top: -6px; right: -6px on the badge.',
            'Use inset: 0 as a clean shorthand for top: 0; right: 0; bottom: 0; left: 0 when stretching an overlay across a card.',
            'position: sticky stays pinned only within its parent container—once the parent scrolls out of view, the sticky element travels with it.',
          ],
          example: {
            title: 'Sticky Header + Relative/Absolute Pinned Badge in Action',
            language: 'css',
            code: `.sticky-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgb(255 255 255 / 0.92);
  backdrop-filter: blur(8px);
}

.icon-wrap {
  position: relative; /* Positioning anchor */
  display: inline-flex;
}

.unread-dot {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  border-radius: 9999px;
}`,
            playground: {
              html: `<div class="viewport">
  <header class="sticky-bar">
    <strong>Inbox</strong>
    <div class="bell-wrap">
      <span class="bell">🔔</span>
      <span class="badge">3</span>
    </div>
  </header>
  <div class="feed">
    <div class="item">Scroll this panel to watch the header stick to top: 0!</div>
    <div class="item">The red badge uses <code>position: absolute</code> anchored to the <code>position: relative</code> bell container.</div>
    <div class="item">Message #3 — Design review approved.</div>
    <div class="item">Message #4 — New CSS chapter published.</div>
    <div class="item">Message #5 — Weekly summary ready.</div>
    <div class="item">Message #6 — Keep scrolling to test sticky flow.</div>
  </div>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 14px; margin: 0; background: #f1f5f9; color: #0f172a; }
.viewport { height: 210px; overflow-y: auto; background: #fff; border-radius: 14px; border: 1px solid #cbd5e1; }
.sticky-bar { position: sticky; top: 0; z-index: 10; display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: rgb(255 255 255 / 0.9); backdrop-filter: blur(8px); border-bottom: 1px solid #e2e8f0; }
.bell-wrap { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; background: #f1f5f9; }
.badge { position: absolute; top: -5px; right: -5px; min-width: 18px; height: 18px; padding: 0 5px; border-radius: 9999px; background: #ef4444; color: #fff; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; font-variant-numeric: tabular-nums; }
.feed { padding: 12px 16px; display: flex; flex-direction: column; gap: 10px; }
.item { padding: 12px; border-radius: 10px; background: #f8fafc; border: 1px solid #e2e8f0; font-size: 13px; line-height: 1.45; }`,
              js: '',
            },
          },
          warning:
            'position: sticky does nothing unless you declare at least one threshold (such as top: 0), and any ancestor with overflow: hidden or overflow: auto will prevent it from sticking.',
        },
        {
          id: 'z-index-and-stacking-contexts',
          heading: 'z-index & Stacking Contexts Explained',
          body: [
            'When positioned elements overlap, z-index decides which element paints in front—higher integers appear above lower ones. However, z-index is NOT a single global number line across the entire page. Many CSS properties create a local stacking context: a positioned element with a numeric z-index, opacity below 1, transform, filter, or isolation: isolate.',
            'Once an element creates a stacking context, all of its descendants are layered strictly inside it. That is why a dropdown with z-index: 9999 sitting inside a header with z-index: 1 will still render BEHIND a sibling section that has z-index: 2. Understanding stacking contexts solves 95% of frustrating z-index bugs immediately.',
          ],
          points: [
            'z-index has no effect on position: static elements unless they are direct flex or grid children.',
            'Add isolation: isolate to a card or component root to safely contain its internal z-index layers without touching z-index numbers.',
            'Maintain a small semantic z-index scale (e.g., sticky: 10, dropdown: 20, modal: 40, toast: 50) instead of escalating to 99999.',
          ],
          example: {
            title: 'Stacking Contexts: Why z-index: 999 Can Still Lose to z-index: 2',
            language: 'css',
            code: `.panel-a {
  position: relative;
  z-index: 1; /* Creates stacking context #1 */
}

.panel-a .tooltip {
  position: absolute;
  z-index: 999; /* Trapped inside panel-a (z-index: 1)! */
}

.panel-b {
  position: relative;
  z-index: 2; /* Beats panel-a AND everything inside panel-a */
}`,
            playground: {
              html: `<div class="stack-demo">
  <button id="fixBtn">Raise Panel A z-index from 1 → 3</button>
  <div class="arena">
    <div id="panelA" class="panel a">
      Panel A (<code>z-index: <span id="zA">1</span></code>)
      <div class="pop">Child Tooltip (<code>z-index: 999</code>)</div>
    </div>
    <div class="panel b">
      Panel B (<code>z-index: 2</code>)
    </div>
  </div>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 16px; margin: 0; color: #0f172a; }
button { margin-bottom: 14px; padding: 7px 12px; border-radius: 8px; border: none; background: #2563eb; color: #fff; font-weight: 600; cursor: pointer; transition: transform 140ms ease-out; }
button:active { transform: scale(0.97); }
.arena { position: relative; height: 150px; }
.panel { position: relative; padding: 14px; border-radius: 12px; font-size: 13px; font-weight: 600; }
.a { z-index: 1; background: #dbeafe; border: 1px solid #93c5fd; width: 72%; }
.pop { position: absolute; top: 38px; left: 24px; z-index: 999; background: #0f172a; color: #fff; padding: 10px 14px; border-radius: 10px; box-shadow: 0 10px 20px rgb(15 23 42 / 0.25); }
.b { z-index: 2; background: #fef3c7; border: 1px solid #fcd34d; width: 72%; margin-top: 14px; margin-left: auto; padding-top: 26px; }`,
              js: `let raised = false;
const panelA = document.getElementById('panelA');
const zA = document.getElementById('zA');
const btn = document.getElementById('fixBtn');
btn.onclick = () => {
  raised = !raised;
  panelA.style.zIndex = raised ? '3' : '1';
  zA.textContent = raised ? '3' : '1';
  btn.textContent = raised ? 'Reset Panel A z-index back to 1' : 'Raise Panel A z-index from 1 → 3';
};`,
            },
          },
        },
      ],
      challenge: {
        prompt:
          'Write CSS for a .product-card anchor (position: relative), a .sale-badge pinned to its top-right corner (top: -8px; right: -8px; z-index: 2), and a .section-bar that sticks to the top of the scroll container at top: 0 with z-index: 10.',
        hint: 'Give .product-card position: relative so .sale-badge (position: absolute) anchors to the card instead of the page.',
        language: 'css',
        solutionCode: `.product-card {
  position: relative;
  border-radius: 14px;
  padding: 16px;
}

.sale-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  z-index: 2;
}

.section-bar {
  position: sticky;
  top: 0;
  z-index: 10;
}`,
      },
      quiz: [
        {
          question:
            'What does an element with position: absolute anchor its top/right/bottom/left offsets against?',
          options: [
            'Always the browser viewport',
            'Its immediate parent element, regardless of the parent’s position value',
            'Its nearest ancestor with a position value other than static (or the initial containing block if none exists)',
            'The nearest sibling element above it',
          ],
          answer: 2,
          explanation:
            'position: absolute walks up the DOM tree until it finds an ancestor with position: relative, absolute, fixed, or sticky; otherwise it falls back to the initial containing block.',
        },
        {
          question:
            'A tooltip with z-index: 9999 sits inside Card A (position: relative; z-index: 1). Why does it still appear behind Card B (position: relative; z-index: 2)?',
          options: [
            'z-index only accepts values up to 100',
            'Card A creates a stacking context at z-index: 1, so its children cannot paint above Card B’s z-index: 2 context',
            'Tooltips must use position: fixed for z-index to work',
            'Card B comes later in CSS so its color overrides z-index',
          ],
          answer: 1,
          explanation:
            'Because Card A establishes a stacking context with z-index: 1, every child inside Card A is painted as part of layer 1—below Card B’s sibling context at layer 2.',
        },
      ],
    },
    km: {
      title: 'Display ការកំណត់ទីតាំង (Positioning) និង z-index',
      duration: '15 នាទី',
      summary:
        'គ្រប់គ្រងលំហូរធាតុដោយប្រើ display បង្កើត badge ជាប់ជ្រុង និងក្បាល sticky ដោយប្រើ relative, absolute, fixed និង sticky ព្រមទាំងយល់ច្បាស់ពី z-index stacking contexts។',
      objectives: [
        'បែងចែកភាពខុសគ្នារវាង block, inline, inline-block, display: none និង visibility: hidden។',
        'កំណត់ទីតាំង badge ក្បាល sticky និងរបារអណ្តែតដោយប្រើ relative, absolute, fixed និង sticky។',
        'ទស្សន៍ទាយ និងគ្រប់គ្រងលំដាប់ជាន់លើក្រោមដោយប្រើ z-index និង CSS stacking contexts។',
      ],
      sections: [
        {
          id: 'display-modes-fundamentals',
          heading: 'របៀប Display៖ block, inline, inline-block និង none',
          body: [
            'គុណលក្ខណៈ display កំណត់ពីរបៀបដែលធាតុហូរក្នុងទំព័រ។ ធាតុ block (<div>, <p>, <section>) ចាប់ផ្តើមលើជួរថ្មី លាតពេញទទឹងដែលមាន ហើយគោរព width, height និង margin ទាំងបួនជ្រុង។ ធាតុ inline (<span>, <a>, <strong>) អង្គុយជាប់គ្នាក្នុងជួរអក្សរ ប៉ុន្តែមិនគោរព width, height ឬ margin លើក្រោមឡើយ។',
            'ពេលអ្នកចង់ឱ្យ badge ឬប៊ូតុងអង្គុយជាប់អក្សរផង និងអាចកំណត់ width, height និង padding លើក្រោមបានផង សូមប្រើ display: inline-block (ឬ inline-flex)។ display: none លុបធាតុចេញពី layout និង screen reader ទាំងស្រុង ចំណែក visibility: hidden លាក់រូបភាពតែរក្សាទំហំទទេនៅដដែល។',
          ],
          points: [
            'ធាតុ inline មិនគោរព width, height, margin-top និង margin-bottom ទេ—ប្តូរទៅ inline-block ឬ inline-flex ពេលត្រូវការទំហំ។',
            'display: none ដកធាតុចេញពីលំហូរទំព័រ ចំណែក visibility: hidden រក្សាចន្លោះទទេនៅដដែល។',
            'តែងតែដាក់ flex-shrink: 0 លើរូបតំណាង និង avatar ក្នុង flex ដើម្បីកុំឱ្យវារួញខូចរូបរាងពេលអក្សរវែង។',
          ],
          table: {
            headers: ['កូដ CSS', 'ចាប់ផ្តើមជួរថ្មី?', 'គោរព width/height?', 'ការប្រើប្រាស់ទូទៅ'],
            rows: [
              ['display: block', 'បាទ/ចាស', 'បាទ/ចាស', 'កថាខណ្ឌ កាត និងផ្នែកទំព័រ'],
              ['display: inline', 'ទេ', 'ទេ', 'តំណភ្ជាប់ និងពាក្យគូសបញ្ជាក់ក្នុងប្រយោគ'],
              ['display: inline-block', 'ទេ', 'បាទ/ចាស', 'Pill, badge និងប៊ូតុងក្នុងជួរ'],
              ['display: none', 'ដកចេញពីលំហូរ', 'មិនអនុវត្ត', 'ម៉ឺនុយបិទ និងផ្ទាំង tab មិនសកម្ម'],
              ['visibility: hidden', 'រក្សាចន្លោះដដែល', 'បាទ/ចាស', 'លាក់ធាតុដោយមិនឱ្យ layout លោត'],
            ],
          },
          tip: 'សម្រាប់ប៊ូតុងដែលមានអាយខុន និងអក្សរ display: inline-flex; align-items: center; gap: 0.5rem តម្រឹមបានយ៉ាងស្អាត។',
        },
        {
          id: 'css-positioning-modes',
          heading: 'ការកំណត់ទីតាំង៖ relative, absolute, fixed និង sticky',
          body: [
            'តាមលំនាំដើម ធាតុទាំងអស់មាន position: static ហើយមិនអើពើនឹង top, right, bottom, left និង z-index ទេ។ ការប្តូរទៅ position: relative រក្សាធាតុក្នុងលំហូរដើម ប៉ុន្តែអនុញ្ញាតឱ្យរំកិលបន្តិច និងសំខាន់បំផុតគឺធ្វើជាចំណុចយោងសម្រាប់ធាតុកូន position: absolute។',
            'ធាតុ position: absolute ចេញពីលំហូរធម្មតាទាំងស្រុង ហើយតោងជាប់នឹងធាតុមេដែលជិតបំផុតមាន position ផ្សេងពី static។ ប្រើ position: fixed ដើម្បីបិទភ្ជាប់របារនឹងអេក្រង់ viewport ពេលអូស ហើយប្រើ position: sticky (ជាមួយ top: 0) ដើម្បីឱ្យក្បាលតារាង ឬក្បាលផ្នែកនៅជាប់កំពូលរហូតដល់ធាតុមេអូសផុត។',
          ],
          points: [
            'លំនាំ badge ជាប់ជ្រុង៖ ដាក់ position: relative លើកាត ឬប្រអប់អាយខុន រួចដាក់ position: absolute; top: -6px; right: -6px លើ badge។',
            'ប្រើ inset: 0 ជាទម្រង់ខ្លីជំនួស top: 0; right: 0; bottom: 0; left: 0 សម្រាប់ស្រទាប់ overlay ពេញកាត។',
            'position: sticky ជាប់តែក្នុងដែនធាតុមេរបស់វាប៉ុណ្ណោះ—ពេលធាតុមេអូសផុត វានឹងរំកិលតាមទៅជាមួយ។',
          ],
          exampleTitle: 'ក្បាល Sticky និង Badge ជាប់ជ្រុងដោយប្រើ Relative + Absolute',
          warning:
            'position: sticky នឹងមិនដំណើរការទេ បើអ្នកភ្លេចកំណត់តម្លៃដូចជា top: 0 ឬបើមានធាតុមេណាមួយដាក់ overflow: hidden ឬ overflow: auto។',
        },
        {
          id: 'z-index-and-stacking-contexts',
          heading: 'ពន្យល់ពី z-index និង Stacking Contexts',
          body: [
            'ពេលធាតុដែលកំណត់ទីតាំងត្រួតលើគ្នា z-index សម្រេចថាធាតុណានៅខាងលើ—លេខធំជាងនៅពីលើលេខតូចជាង។ ទោះយ៉ាងណា z-index មិនមែនជាបន្ទាត់លេខសកលតែមួយទូទាំងទំព័រទេ។ គុណលក្ខណៈដូចជា position + z-index, opacity តិចជាង 1, transform, filter ឬ isolation: isolate បង្កើត stacking context ផ្ទាល់ខ្លួន។',
            'ពេលធាតុមួយបង្កើត stacking context ធាតុកូនទាំងអស់ត្រូវបានតម្រៀបជាន់នៅខាងក្នុងវាប៉ុណ្ណោះ។ ហេតុនេះហើយបានជា tooltip ដែលមាន z-index: 9999 ក្នុងប្រអប់ z-index: 1 នៅតែស្ថិតនៅពីក្រោយប្រអប់ជាប់គ្នាដែលមាន z-index: 2។',
          ],
          points: [
            'z-index មិនដំណើរការលើ position: static ទេ លើកលែងតែវាជាធាតុកូនផ្ទាល់នៃ flex ឬ grid។',
            'ប្រើ isolation: isolate លើធាតុឫសនៃកាត ដើម្បីឃុំជាន់ z-index ខាងក្នុងកុំឱ្យជ្រៀតជ្រែកខាងក្រៅ។',
            'ប្រើមាត្រដ្ឋាន z-index តូច និងមានន័យ (ឧ. sticky: 10, dropdown: 20, modal: 40, toast: 50) ជំនួសលេខ 99999។',
          ],
          exampleTitle: 'Stacking Contexts៖ ហេតុអ្វី z-index: 999 អាចចាញ់ z-index: 2',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ CSS សម្រាប់ .product-card ជាចំណុចយោង (position: relative), .sale-badge ភ្ជាប់ជ្រុងលើស្តាំ (top: -8px; right: -8px; z-index: 2) និង .section-bar ដែលជាប់កំពូលពេលអូសនៅ top: 0 ជាមួយ z-index: 10។',
        hint: 'ដាក់ position: relative លើ .product-card ដើម្បីឱ្យ .sale-badge (position: absolute) តោងនឹងកាត មិនមែនទំព័រទាំងមូល។',
      },
      quiz: [
        {
          question:
            'តើធាតុដែលមាន position: absolute វាស់ទីតាំង top/right/bottom/left ធៀបជាមួយអ្វី?',
          options: [
            'អេក្រង់ viewport ជានិច្ច',
            'ធាតុមេភ្លាមៗដោយមិនគិតពីតម្លៃ position របស់វា',
            'ធាតុមេជិតបំផុតដែលមាន position ផ្សេងពី static (ឬ initial containing block បើគ្មាន)',
            'ធាតុបងប្អូនដែលនៅពីលើវា',
          ],
          answer: 2,
          explanation:
            'position: absolute រកមើលឡើងលើរហូតជួបធាតុមេដែលមាន position: relative, absolute, fixed ឬ sticky ដើម្បីធ្វើជាចំណុចយោង។',
        },
        {
          question:
            'Tooltip មាន z-index: 9999 ស្ថិតក្នុង Card A (position: relative; z-index: 1)។ ហេតុអ្វីវានៅតែស្ថិតនៅពីក្រោយ Card B (position: relative; z-index: 2)?',
          options: [
            'z-index ទទួលតម្លៃអតិបរមាត្រឹម 100',
            'Card A បង្កើត stacking context នៅ z-index: 1 ដូច្នេះធាតុកូនវាមិនអាចឡើងលើ context z-index: 2 របស់ Card B បានទេ',
            'Tooltip ត្រូវប្រើ position: fixed ទើប z-index ដំណើរការ',
            'Card B សរសេរក្រោយក្នុង CSS ទើបលុប z-index',
          ],
          answer: 1,
          explanation:
            'Card A បង្កើត stacking context នៅជាន់ទី 1 ដូច្នេះធាតុកូនទាំងអស់ក្នុង Card A ត្រូវបានគូរក្នុងជាន់ទី 1 នៅក្រោមជាន់ទី 2 របស់ Card B។',
        },
      ],
    },
  },

  // =========================================================================
  // 5. PSEUDO-CLASSES & PSEUDO-ELEMENTS
  // =========================================================================
  {
    slug: 'css-pseudo-classes-elements',
    level: 'intermediate',
    insertAfter: 'responsive-design',
    en: {
      title: 'Pseudo-Classes & Pseudo-Elements',
      duration: '14 min',
      summary:
        'Style interactive states with :hover, :active, and :focus-visible, target structure and parent state with :nth-child() and :has(), and craft decorative layers with ::before and ::after.',
      objectives: [
        'Style accessible, tactile interactive states using :hover, :active, :focus-visible, and :disabled.',
        'Target repeating patterns and parent-state rules with :nth-child(), :not(), and the modern :has() selector.',
        'Generate purely decorative accents with ::before, ::after, ::placeholder, and ::selection.',
      ],
      sections: [
        {
          id: 'interactive-pseudo-classes',
          heading: 'Interactive States: :hover, :active & :focus-visible',
          body: [
            'Pseudo-classes use a single colon (:) to style an element only when it enters a specific state—no JavaScript required. While :hover highlights pointer intent, :active responds the instant a user presses down; pairing :active with a subtle transform: scale(0.97) makes buttons feel crisp and physical.',
            'For keyboard accessibility, prefer :focus-visible over plain :focus. Browsers trigger :focus-visible when navigating with Tab or keyboard shortcuts, showing a clear focus ring without flashing an unwanted outline after ordinary mouse clicks. On touchscreens, wrapping hover-only flourishes inside @media (hover: hover) prevents "sticky hover" states after a tap.',
          ],
          points: [
            'Include :active { transform: scale(0.97); } on buttons for responsive physical press feedback.',
            'Use :focus-visible for clear keyboard outlines instead of removing outlines globally.',
            'Guard non-essential hover animations with @media (hover: hover) so mobile taps never stay stuck in hover state.',
          ],
          example: {
            title: 'Tactile Button States with :hover, :active & :focus-visible',
            language: 'css',
            code: `.action-btn {
  background: #0f172a;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  cursor: pointer;
  transition: transform 140ms ease-out, background-color 160ms ease-out;
}

@media (hover: hover) {
  .action-btn:hover:not(:disabled) {
    background: #1e293b;
  }
}

.action-btn:active:not(:disabled) {
  transform: scale(0.97);
}

.action-btn:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 3px;
}

.action-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}`,
            playground: {
              html: `<div class="states">
  <button class="btn primary">Press or Tab to Me</button>
  <button class="btn ghost">Secondary Action</button>
  <button class="btn primary" disabled>Disabled</button>
  <p class="hint">Try clicking (feel the :active scale), then press Tab on your keyboard to see :focus-visible.</p>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; margin: 0; color: #0f172a; }
.states { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.btn { padding: 10px 16px; border-radius: 10px; font-weight: 600; font-size: 14px; cursor: pointer; transition: transform 140ms ease-out, background-color 150ms ease-out; }
.primary { background: #2563eb; color: #fff; border: 1px solid #2563eb; }
.ghost { background: #fff; color: #0f172a; border: 1px solid #cbd5e1; }
@media (hover: hover) {
  .primary:hover:not(:disabled) { background: #1d4ed8; }
  .ghost:hover:not(:disabled) { background: #f8fafc; }
}
.btn:active:not(:disabled) { transform: scale(0.97); }
.btn:focus-visible { outline: 2px solid #2563eb; outline-offset: 3px; }
.btn:disabled { opacity: 0.45; cursor: not-allowed; }
.hint { flex-basis: 100%; margin: 6px 0 0; font-size: 13px; color: #64748b; }`,
              js: '',
            },
          },
          warning:
            'Never write *:focus { outline: none; } without providing a high-contrast :focus-visible style. Removing focus indicators makes your site unusable for keyboard and assistive-tech users.',
        },
        {
          id: 'structural-and-has-selectors',
          heading: 'Structural Selectors & The :has() Parent Selector',
          body: [
            'Structural pseudo-classes target elements based on their position among siblings. Use :first-child and :last-child to clean up edge borders, :nth-child(even) for zebra-striped tables, and :nth-child(3n + 1) to accent every third grid item. Combine them with :not() to exclude special cases cleanly.',
            'Modern CSS also ships :has()—the long-awaited parent selector. A rule like .task-row:has(input:checked) styles the entire parent row whenever its nested checkbox is ticked, and .field:has(input:invalid) highlights a form group automatically, replacing dozens of lines of JavaScript class-toggling code.',
          ],
          points: [
            ':nth-child() is 1-indexed—the first child is 1, not 0.',
            ':has() lets a parent react to child state (:checked, :focus, :invalid) or child presence (.card:has(img)) in pure CSS.',
            'Combine :not(:last-child) to add dividers between list items without adding an extra line under the final item.',
          ],
          table: {
            headers: ['Selector', 'Type', 'What It Matches'],
            rows: [
              [
                ':focus-visible',
                'Interactive pseudo-class',
                'Element focused via keyboard navigation',
              ],
              [':active', 'Interactive pseudo-class', 'Element currently being pressed/clicked'],
              [':nth-child(even)', 'Structural pseudo-class', '2nd, 4th, 6th… sibling elements'],
              [
                ':not(.disabled)',
                'Negation pseudo-class',
                'Elements that do not match the inner selector',
              ],
              [
                ':has(input:checked)',
                'Relational pseudo-class',
                'Any container holding a checked input',
              ],
              [
                '::before / ::after',
                'Pseudo-element',
                'Virtual first/last child inside an element',
              ],
            ],
          },
          example: {
            title: 'Zero-JS Interactive Checklist with :has() & :nth-child()',
            language: 'css',
            code: `.task-item:nth-child(even) {
  background-color: #f8fafc;
}

.task-item:not(:last-child) {
  border-bottom: 1px solid #e2e8f0;
}

/* Parent reacts to checked child with ZERO JavaScript */
.task-item:has(input:checked) {
  background-color: #ecfdf5;
  color: #065f46;
}

.task-item:has(input:checked) span {
  text-decoration: line-through;
  opacity: 0.75;
}`,
            playground: {
              html: `<div class="list">
  <label class="task"><input type="checkbox" checked /><span>Learn :focus-visible rings</span></label>
  <label class="task"><input type="checkbox" /><span>Try :nth-child(even) striping</span></label>
  <label class="task"><input type="checkbox" /><span>Style parents with :has()</span></label>
  <label class="task"><input type="checkbox" /><span>Add ::before status dots</span></label>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 16px; margin: 0; color: #0f172a; }
.list { border: 1px solid #e2e8f0; border-radius: 12px; overflow: clip; background: #fff; }
.task { display: flex; align-items: center; gap: 10px; padding: 12px 14px; font-size: 14px; cursor: pointer; transition: background-color 160ms ease-out; }
.task:nth-child(even) { background: #f8fafc; }
.task:not(:last-child) { border-bottom: 1px solid #e2e8f0; }
.task:has(input:checked) { background: #ecfdf5; color: #065f46; }
.task:has(input:checked) span { text-decoration: line-through; opacity: 0.75; }
.task input { accent-color: #10b981; width: 16px; height: 16px; }`,
              js: '',
            },
          },
          tip: 'Check browser support—:has() is Baseline Newly Available across all modern evergreen browsers (Chrome, Edge, Safari, and Firefox).',
        },
        {
          id: 'pseudo-elements-before-after',
          heading: 'Pseudo-Elements: ::before, ::after, ::placeholder & ::selection',
          body: [
            'Unlike pseudo-classes (which select an existing element’s state), pseudo-elements use a double colon (::) to style virtual sub-parts of an element. The two most versatile are ::before and ::after, which inject virtual decorative boxes as the first or last child inside a container—great for live status dots, accent bars, or custom quote marks without cluttering your HTML.',
            'Remember the golden rule: ::before and ::after will NOT appear at all unless you declare the content property—even an empty string (content: "") for purely visual shapes. Also remember that void elements like <img> and <input> have no inner children, so ::before and ::after do not render inside them.',
          ],
          points: [
            'Always include content: "" on decorative ::before and ::after shapes, otherwise the browser skips rendering them.',
            'Never put important meaningful copy inside CSS content—screen readers handle generated text inconsistently.',
            'Use ::placeholder to soften input hint text and ::selection to brand highlighted text color.',
          ],
          example: {
            title: 'Live Status Indicator Dot, ::placeholder & ::selection',
            language: 'css',
            code: `.status-live {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.status-live::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background-color: #10b981;
  flex-shrink: 0;
}

input::placeholder {
  color: #94a3b8;
}

::selection {
  background-color: #bfdbfe;
  color: #1e3a8a;
}`,
          },
        },
      ],
      challenge: {
        prompt:
          'Write CSS rules that: (1) give even .row items a #f8fafc background with :nth-child(even), (2) highlight .row in #eff6ff when it contains a checked input using :has(input:checked), (3) give .chip-btn an :active transform of scale(0.97), and (4) render an 8px green circle before .online-tag::before using content: "".',
        hint: 'Use single colons for pseudo-classes (:nth-child, :has, :active) and double colons for pseudo-elements (::before).',
        language: 'css',
        solutionCode: `.row:nth-child(even) {
  background-color: #f8fafc;
}

.row:has(input:checked) {
  background-color: #eff6ff;
}

.chip-btn:active {
  transform: scale(0.97);
}

.online-tag::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background-color: #10b981;
  margin-right: 8px;
}`,
      },
      quiz: [
        {
          question:
            'Why does a decorative .badge::before rule with width, height, and background-color fail to appear on screen?',
          options: [
            '::before only works on <div> elements',
            'The required content property (such as content: "") was omitted',
            '::before requires position: fixed to be visible',
            'Pseudo-elements must use a single colon instead of two',
          ],
          answer: 1,
          explanation:
            'Browsers do not generate a ::before or ::after box unless the content property is explicitly set—use content: "" for purely decorative shapes.',
        },
        {
          question: 'What does the selector .card:has(input:checked) target?',
          options: [
            'Every checked <input> inside .card',
            'Any .card element that currently contains a checked <input>',
            'The sibling immediately after a checked <input>',
            'All .card elements that have no inputs',
          ],
          answer: 1,
          explanation:
            ':has() evaluates a condition against descendants (or siblings) and applies the styles to the outer .card element itself.',
        },
      ],
    },
    km: {
      title: 'Pseudo-Classes និង Pseudo-Elements',
      duration: '14 នាទី',
      summary:
        'រចនាស្ថានភាពអន្តរកម្មដោយ :hover, :active និង :focus-visible ជ្រើសរើសតាមរចនាសម្ព័ន្ធ និងធាតុមេដោយ :nth-child() និង :has() ព្រមទាំងបន្ថែមលម្អដោយ ::before និង ::after។',
      objectives: [
        'រចនាស្ថានភាពអន្តរកម្មងាយប្រើដោយ :hover, :active, :focus-visible និង :disabled។',
        'ជ្រើសរើសធាតុតាមលំដាប់ និងធាតុមេដោយប្រើ :nth-child(), :not() និង :has()។',
        'បង្កើតធាតុលម្អដោយ CSS សុទ្ធជាមួយ ::before, ::after, ::placeholder និង ::selection។',
      ],
      sections: [
        {
          id: 'interactive-pseudo-classes',
          heading: 'ស្ថានភាពអន្តរកម្ម៖ :hover, :active និង :focus-visible',
          body: [
            'Pseudo-classes ប្រើសញ្ញាចុចពីរមួយ (:) ដើម្បីរចនាធាតុពេលវាចូលស្ថានភាពជាក់លាក់ដោយមិនបាច់ប្រើ JavaScript។ ខណៈ :hover ឆ្លើយតបពេលដាក់កណ្តុរពីលើ :active ឆ្លើយតបភ្លាមពេលអ្នកប្រើចុច—ការដាក់ transform: scale(0.97) ក្នុង :active ធ្វើឱ្យប៊ូតុងមានអារម្មណ៍ឆ្លើយតបពិតៗ។',
            'សម្រាប់ការប្រើក្តារចុច accessibility សូមប្រើ :focus-visible ជំនួស :focus ធម្មតា។ វាបង្ហាញរង្វង់ focus ច្បាស់ពេលចុច Tab ដោយមិនបង្ហាញស៊ុមរំខានពេលចុចដោយកណ្តុរ។ លើទូរស័ព្ទ ការរុំ :hover ក្នុង @media (hover: hover) ជួយការពារកុំឱ្យ hover ជាប់គាំងក្រោយពេលប៉ះ។',
          ],
          points: [
            'ដាក់ :active { transform: scale(0.97); } លើប៊ូតុង ដើម្បីឱ្យមានអារម្មណ៍ចុចភ្លាមៗ។',
            'ប្រើ :focus-visible សម្រាប់រង្វង់ focus ក្តារចុច ជំនួសឱ្យការលុប outline ចោលទាំងអស់។',
            'រុំស្ទីល :hover ក្នុង @media (hover: hover) ដើម្បីឱ្យការប៉ះលើទូរស័ព្ទស្អាតមិនជាប់ hover។',
          ],
          exampleTitle: 'ស្ថានភាពប៊ូតុង :hover, :active និង :focus-visible',
          warning:
            'កុំសរសេរ *:focus { outline: none; } ដោយគ្មានស្ទីល :focus-visible ជំនួស។ ការលុបសញ្ញា focus ធ្វើឱ្យអ្នកប្រើក្តារចុចមិនអាចដឹងថាខ្លួនកំពុងឈរលើប៊ូតុងណាឡើយ។',
        },
        {
          id: 'structural-and-has-selectors',
          heading: 'Structural Selectors និង :has() Parent Selector',
          body: [
            'Structural pseudo-classes ជ្រើសរើសធាតុតាមលំដាប់ក្នុងធាតុបងប្អូន។ ប្រើ :first-child និង :last-child សម្រាប់គែមបញ្ជី :nth-child(even) សម្រាប់ជួរតារាងពណ៌ឆ្លាស់គ្នា និង :not() ដើម្បីដកករណីពិសេសចេញ។',
            'CSS ទំនើបក៏មាន :has()—ដែលគេហៅថា parent selector។ កូដ .task-row:has(input:checked) អាចប្តូរពណ៌ជួរមេទាំងមូលពេលប្រអប់ធីកខាងក្នុងត្រូវបានធីក ដោយមិនចាំបាច់សរសេរ JavaScript សូម្បីមួយបន្ទាត់។',
          ],
          points: [
            ':nth-child() រាប់ចាប់ពីលេខ 1 មិនមែនលេខ 0 ទេ។',
            ':has() អនុញ្ញាតឱ្យធាតុមេឆ្លើយតបនឹងស្ថានភាពធាតុកូន (:checked, :focus, :invalid) ដោយ CSS សុទ្ធ។',
            'ប្រើ :not(:last-child) ដើម្បីដាក់បន្ទាត់បំបែកចន្លោះធាតុបញ្ជីដោយគ្មានបន្ទាត់លើសនៅធាតុចុងក្រោយ។',
          ],
          table: {
            headers: ['Selector', 'ប្រភេទ', 'អ្វីដែលវាជ្រើសរើស'],
            rows: [
              [':focus-visible', 'Interactive pseudo-class', 'ធាតុដែលទទួល focus តាមក្តារចុច'],
              [':active', 'Interactive pseudo-class', 'ធាតុដែលកំពុងត្រូវបានចុច'],
              [':nth-child(even)', 'Structural pseudo-class', 'ធាតុលំដាប់គូ (ទី 2, 4, 6...)'],
              [':not(.disabled)', 'Negation pseudo-class', 'ធាតុដែលមិនត្រូវនឹង selector ខាងក្នុង'],
              [
                ':has(input:checked)',
                'Relational pseudo-class',
                'ធាតុផ្ទុកដែលមាន input ត្រូវបានធីក',
              ],
              ['::before / ::after', 'Pseudo-element', 'ធាតុនិម្មិតនៅដើម ឬចុងធាតុផ្ទុក'],
            ],
          },
          exampleTitle: 'បញ្ជីកិច្ចការគ្មាន JS ដោយប្រើ :has() និង :nth-child()',
          tip: ':has() ត្រូវបានគាំទ្រទូលំទូលាយក្នុងកម្មវិធីរុករកទំនើបទាំងអស់ (Chrome, Edge, Safari និង Firefox)។',
        },
        {
          id: 'pseudo-elements-before-after',
          heading: 'Pseudo-Elements៖ ::before, ::after, ::placeholder និង ::selection',
          body: [
            'ខុសពី pseudo-classes ដែលជ្រើសស្ថានភាពធាតុ Pseudo-elements ប្រើសញ្ញាចុចពីរពីរដង (::) ដើម្បីរចនាផ្នែកនិម្មិតនៃធាតុ។ ::before និង ::after បន្ថែមប្រអប់លម្អនៅខាងដើម ឬខាងចុងក្នុងធាតុ—ល្អសម្រាប់ចំណុចស្ថានភាពបៃតង ឬបន្ទាត់លម្អដោយមិនបន្ថែម HTML។',
            'ច្បាប់សំខាន់បំផុត៖ ::before និង ::after នឹងមិនបង្ហាញឡើយ បើអ្នកមិនសរសេរគុណលក្ខណៈ content—ទោះជាតម្លៃទទេ (content: "") ក៏ដោយ។ ម្យ៉ាងទៀត ធាតុទទេដូចជា <img> និង <input> មិនអាចផ្ទុក ::before ឬ ::after បានទេ។',
          ],
          points: [
            'តែងតែដាក់ content: "" សម្រាប់រូបរាងលម្អក្នុង ::before និង ::after។',
            'កុំដាក់ព័ត៌មានអត្ថបទសំខាន់ៗក្នុង CSS content ព្រោះ screen reader អានមិនសូវស្របគ្នាទេ។',
            'ប្រើ ::placeholder ដើម្បីប្តូរពណ៌អក្សរណែនាំក្នុងប្រអប់បញ្ចូល និង ::selection សម្រាប់ពណ៌ពេលគូសជ្រើសអក្សរ។',
          ],
          exampleTitle: 'ចំណុចស្ថានភាព ::before, ::placeholder និង ::selection',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ CSS ដើម្បី៖ (1) ដាក់ផ្ទៃ #f8fafc លើ .row គូដោយ :nth-child(even) (2) ប្តូរផ្ទៃ .row ជា #eff6ff ពេលមាន input ធីកដោយ :has(input:checked) (3) ដាក់ :active scale(0.97) លើ .chip-btn និង (4) បង្កើតចំណុចបៃតង 8px មុន .online-tag::before ដោយប្រើ content: ""។',
        hint: 'ប្រើសញ្ញាចុចពីរមួយ (:) សម្រាប់ pseudo-classes និងសញ្ញាចុចពីរពីរដង (::) សម្រាប់ ::before។',
      },
      quiz: [
        {
          question:
            'ហេតុអ្វីបានជាកូដ .badge::before ដែលមាន width, height និង background-color មិនបង្ហាញលើអេក្រង់?',
          options: [
            '::before ដំណើរការតែលើ <div> ប៉ុណ្ណោះ',
            'ភ្លេចសរសេរគុណលក្ខណៈ content (ដូចជា content: "")',
            '::before ត្រូវការ position: fixed ទើបឃើញ',
            'Pseudo-elements ត្រូវប្រើសញ្ញាចុចពីរតែមួយ',
          ],
          answer: 1,
          explanation:
            'កម្មវិធីរុករកមិនបង្កើតប្រអប់ ::before ឬ ::after ឡើយ លុះត្រាតែមានគុណលក្ខណៈ content ត្រូវបានកំណត់ (ឧ. content: "")។',
        },
        {
          question: 'តើ selector .card:has(input:checked) ជ្រើសរើសធាតុណា?',
          options: [
            'គ្រប់ <input> ដែលធីកនៅក្នុង .card',
            'ធាតុ .card ណាដែលមាន <input> ត្រូវបានធីកនៅខាងក្នុង',
            'ធាតុបន្ទាប់ភ្លាមពី <input> ដែលធីក',
            'ធាតុ .card ទាំងអស់ដែលគ្មាន input',
          ],
          answer: 1,
          explanation: ':has() ពិនិត្យលក្ខខណ្ឌលើធាតុកូន រួចអនុវត្តស្ទីលទៅលើធាតុមេ .card ផ្ទាល់។',
        },
      ],
    },
  },

  // =========================================================================
  // 6. TRANSITIONS, TRANSFORMS & @KEYFRAMES ANIMATIONS
  // =========================================================================
  {
    slug: 'css-transitions-and-keyframes',
    level: 'pro',
    insertAfter: 'css-pseudo-classes-elements',
    en: {
      title: 'Transitions, Transforms & @keyframes Animations',
      duration: '15 min',
      summary:
        'Animate smoothly at 60fps using GPU-composited transform and opacity properties, natural ease-out cubic-bezier curves, @keyframes sequences, and prefers-reduced-motion accessibility.',
      objectives: [
        'Write explicit GPU-composited transitions on transform and opacity without ever using transition: all.',
        'Compose 2D transforms with accurate transform-origin and responsive ease-out cubic-bezier curves under 300ms.',
        'Build multi-step @keyframes animations that respect @media (prefers-reduced-motion: reduce).',
      ],
      sections: [
        {
          id: 'gpu-composited-transitions',
          heading: 'Smooth Transitions & GPU-Composited Properties',
          body: [
            'A CSS transition interpolates smoothly whenever a property changes between two states (such as hover, focus, or toggling a class). To keep animations silky smooth at 60–120fps even on mid-range phones, animate only GPU-composited properties: transform and opacity. Animating layout properties like width, height, top, left, margin, or padding forces the browser to recalculate layout and repaint every single frame, producing stutter.',
            'Just as important: always name the exact properties you intend to transition—for example, transition: transform 180ms cubic-bezier(0.23, 1, 0.32, 1), opacity 180ms ease-out. Never write transition: all, which accidentally animates unrelated layout, border, or theme changes and causes sluggish transitions.',
          ],
          points: [
            'Animate transform and opacity exclusively for smooth, jank-free motion.',
            'Keep interactive UI transitions brisk (150ms–250ms) so the interface feels responsive rather than sluggish.',
            'Use ease-out curves for entering UI, dropdowns, and tooltips—fast start, calm landing—never ease-in.',
          ],
          table: {
            headers: ['Property', 'Rendering Stage', '60fps Safe?', 'Better Alternative'],
            rows: [
              ['transform', 'Composite (GPU)', 'Yes', 'Use translate(), scale(), rotate()'],
              ['opacity', 'Composite (GPU)', 'Yes', 'Combine with transform for crisp reveals'],
              [
                'width / height',
                'Layout + Paint',
                'No (janky)',
                'Use transform: scaleX() / scaleY()',
              ],
              [
                'top / left / margin',
                'Layout + Paint',
                'No (janky)',
                'Use transform: translate(x, y)',
              ],
              [
                'box-shadow / blur',
                'Paint (expensive)',
                'Use sparingly',
                'Keep animated blur() under 20px or fade pseudo-element opacity',
              ],
            ],
          },
          warning:
            'Never use transition: all in production CSS. Explicitly listing properties like transition: transform 200ms ease-out, opacity 200ms ease-out prevents accidental layout animations and keeps frame times predictable.',
        },
        {
          id: 'transforms-and-easing-curves',
          heading: 'Transforms, transform-origin & Natural cubic-bezier() Curves',
          body: [
            'The transform property lets you translate, scale, and rotate an element on the GPU without disturbing sibling layout. When animating popovers, dropdowns, or tooltips, set transform-origin to the trigger side (such as top left or top right) so the menu expands naturally from the button that opened it—while centered modals keep transform-origin: center.',
            'Great entering animations never start from scale(0), which feels cartoonish and travels too far. Instead, enter from opacity: 0; transform: scale(0.95) to opacity: 1; transform: scale(1) using an exponential ease-out curve like cubic-bezier(0.23, 1, 0.32, 1) under 250ms. Reserve will-change: transform strictly for elements exhibiting real subpixel shimmer—never sprinkle it onto every element.',
          ],
          points: [
            'Enter popovers and cards from scale(0.95) + opacity: 0 to scale(1) + opacity: 1—never scale(0).',
            'Match transform-origin to the trigger button on dropdowns and tooltips for spatial continuity.',
            'Strong ease-out curves (cubic-bezier(0.23, 1, 0.32, 1)) feel immediate because most movement happens in the first 100ms.',
          ],
          example: {
            title: 'Interactive Popover Reveal with Origin & Ease-Out Curve',
            language: 'css',
            code: `.menu-popover {
  transform-origin: top left;
  opacity: 0;
  transform: scale(0.95) translateY(-4px);
  pointer-events: none;
  transition:
    transform 200ms cubic-bezier(0.23, 1, 0.32, 1),
    opacity 160ms ease-out;
}

.menu-popover.is-open {
  opacity: 1;
  transform: scale(1) translateY(0);
  pointer-events: auto;
}`,
            playground: {
              html: `<div class="lab">
  <button id="menuBtn" class="trigger" aria-expanded="false">Open Actions ▾</button>
  <div id="menu" class="popover" role="menu">
    <button class="item">Duplicate Chapter</button>
    <button class="item">Copy Link</button>
    <button class="item danger">Archive Draft</button>
  </div>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 20px; margin: 0; color: #0f172a; min-height: 180px; }
.lab { position: relative; display: inline-block; }
.trigger { padding: 9px 14px; border-radius: 10px; border: 1px solid #cbd5e1; background: #fff; font-weight: 600; font-size: 14px; cursor: pointer; box-shadow: 0 1px 2px rgb(15 23 42 / 0.05); transition: transform 140ms ease-out, background-color 140ms ease-out; }
.trigger:hover { background: #f8fafc; }
.trigger:active { transform: scale(0.97); }
.popover {
  position: absolute; top: calc(100% + 8px); left: 0; width: 190px; padding: 6px; border-radius: 12px; background: #fff;
  box-shadow: 0 0 0 1px rgb(15 23 42 / 0.07), 0 14px 28px -6px rgb(15 23 42 / 0.16);
  transform-origin: top left;
  opacity: 0; transform: scale(0.95) translateY(-4px); pointer-events: none;
  transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1), opacity 160ms ease-out;
}
.popover.open { opacity: 1; transform: scale(1) translateY(0); pointer-events: auto; }
.item { display: block; width: 100%; text-align: left; padding: 8px 10px; border: none; background: transparent; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; transition: background-color 120ms ease-out; }
.item:hover { background: #f1f5f9; }
.danger { color: #dc2626; }
.danger:hover { background: #fef2f2; }`,
              js: `const btn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
btn.onclick = () => {
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(open));
};`,
            },
          },
          tip: 'When a user clicks quickly before an animation finishes, CSS transitions automatically reverse cleanly from the element’s current mid-flight position.',
        },
        {
          id: 'keyframes-and-reduced-motion',
          heading: '@keyframes Animations & prefers-reduced-motion Accessibility',
          body: [
            'Transitions require a state change from A to B. When you need multi-step choreography, entrance reveals on mount, or continuous indicators like a loading spinner, define an @keyframes rule and attach it with animation. Setting animation-fill-mode: both ensures the element holds its starting keyframe during any delay and retains its final state once finished.',
            'Motion can trigger dizziness or discomfort for people with vestibular sensitivities. Every production stylesheet with animations should include an @media (prefers-reduced-motion: reduce) query that pauses looping motion and replaces slides or scales with instant transitions or gentle opacity fades.',
          ],
          points: [
            'Use transform: rotate(360deg) with linear timing for crisp, constant-speed loading spinners.',
            'animation-fill-mode: both prevents a one-frame flash before delayed entrance animations begin.',
            'Always honor @media (prefers-reduced-motion: reduce) so motion-sensitive users get a calm, comfortable experience.',
          ],
          example: {
            title: 'GPU Spinner, Toast Entrance & prefers-reduced-motion Fallback',
            language: 'css',
            code: `@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.spinner {
  animation: spin 750ms linear infinite;
}

.toast {
  animation: toast-in 220ms cubic-bezier(0.23, 1, 0.32, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  .spinner,
  .toast {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
  }
}`,
            playground: {
              html: `<div class="anim-lab">
  <div class="top-row">
    <div class="status"><span class="spinner"></span> Syncing changes…</div>
    <button id="replay">Replay Toast</button>
  </div>
  <div id="toast" class="toast">✓ Saved lesson progress</div>
</div>`,
              css: `body { font-family: system-ui, sans-serif; padding: 18px; margin: 0; color: #0f172a; }
.top-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.status { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #334155; }
.spinner { width: 16px; height: 16px; border: 2px solid #cbd5e1; border-top-color: #2563eb; border-radius: 50%; flex-shrink: 0; animation: spin 750ms linear infinite; }
button { padding: 7px 12px; border-radius: 8px; border: none; background: #0f172a; color: #fff; font-weight: 600; font-size: 13px; cursor: pointer; transition: transform 140ms ease-out; }
button:active { transform: scale(0.97); }
.toast { padding: 12px 16px; border-radius: 12px; background: #0f172a; color: #f8fafc; font-size: 14px; font-weight: 500; box-shadow: 0 10px 24px -6px rgb(15 23 42 / 0.28); animation: toast-in 220ms cubic-bezier(0.23, 1, 0.32, 1) both; }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes toast-in {
  from { opacity: 0; transform: translateY(8px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .spinner, .toast { animation: none; }
}`,
              js: `const toast = document.getElementById('toast');
document.getElementById('replay').onclick = () => {
  toast.style.animation = 'none';
  void toast.offsetWidth;
  toast.style.animation = '';
};`,
            },
          },
        },
      ],
      challenge: {
        prompt:
          'Write CSS with: (1) a @keyframes card-enter animation from opacity: 0; transform: scale(0.95) translateY(6px) to opacity: 1; transform: scale(1) translateY(0), (2) a .card-animated class running it over 220ms with cubic-bezier(0.23, 1, 0.32, 1) both, (3) an explicit transition on .press-btn for transform (150ms ease-out) with :active { transform: scale(0.97); }, and (4) a @media (prefers-reduced-motion: reduce) fallback.',
        hint: 'Never use transition: all; list transform explicitly and disable or shorten animations inside the prefers-reduced-motion media query.',
        language: 'css',
        solutionCode: `@keyframes card-enter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(6px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.card-animated {
  animation: card-enter 220ms cubic-bezier(0.23, 1, 0.32, 1) both;
}

.press-btn {
  transition: transform 150ms ease-out;
}

.press-btn:active {
  transform: scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .card-animated {
    animation: none;
  }

  .press-btn {
    transition: none;
  }
}`,
      },
      quiz: [
        {
          question:
            'Which two CSS properties can be animated on the GPU compositor thread without triggering expensive layout recalculations?',
          options: [
            'width and height',
            'top and left',
            'transform and opacity',
            'margin and padding',
          ],
          answer: 2,
          explanation:
            'transform and opacity run on the compositor thread without triggering Layout or Paint, keeping animations smooth at 60–120fps.',
        },
        {
          question:
            'Which combination follows modern UI motion best practices for a dropdown menu entrance?',
          options: [
            'transition: all 600ms ease-in; starting from scale(0)',
            'Explicit transition on transform and opacity under 250ms with ease-out, starting from scale(0.95)',
            'Animating height from 0px to 300px with linear timing',
            'Adding will-change: all to every element on the page',
          ],
          answer: 1,
          explanation:
            'Explicit GPU-composited transitions on transform and opacity under 250ms with ease-out and a gentle scale(0.95) start feel fast, natural, and jank-free.',
        },
      ],
    },
    km: {
      title: 'Transitions, Transforms និងចលនា @keyframes',
      duration: '15 នាទី',
      summary:
        'បង្កើតចលនារលូន 60fps ដោយប្រើ transform និង opacity លើ GPU ខ្សែកោង ease-out cubic-bezier ចលនា @keyframes និងការគោរព prefers-reduced-motion។',
      objectives: [
        'សរសេរ transition ច្បាស់លាស់លើ transform និង opacity ដោយមិនប្រើ transition: all។',
        'ប្រើ 2D transforms ជាមួយ transform-origin ត្រឹមត្រូវ និងខ្សែកោង ease-out cubic-bezier ក្រោម 300ms។',
        'បង្កើតចលនាច្រើនជំហាន @keyframes ដែលគោរព @media (prefers-reduced-motion: reduce)។',
      ],
      sections: [
        {
          id: 'gpu-composited-transitions',
          heading: 'Transitions រលូន និងគុណលក្ខណៈដំណើរការលើ GPU',
          body: [
            'CSS transition បង្កើតចលនាផ្លាស់ប្តូរយ៉ាងរលូនរវាងស្ថានភាពពីរ (ដូចជា hover, focus ឬប្តូរ class)។ ដើម្បីឱ្យចលនារលូន 60–120fps សូម្បីលើទូរស័ព្ទមធ្យម សូមធ្វើចលនាតែលើគុណលក្ខណៈ GPU-composited គឺ transform និង opacity ប៉ុណ្ណោះ។ ការធ្វើចលនាលើ width, height, top, left ឬ margin បង្ខំឱ្យកម្មវិធីរុករកគណនា layout ឡើងវិញគ្រប់ហ្វ្រេម ធ្វើឱ្យរអាក់រអួល។',
            'សំខាន់ដូចគ្នា៖ តែងតែបញ្ជាក់ឈ្មោះគុណលក្ខណៈឱ្យច្បាស់ ដូចជា transition: transform 180ms cubic-bezier(0.23, 1, 0.32, 1), opacity 180ms ease-out។ កុំប្រើ transition: all ព្រោះវាធ្វើចលនាគុណលក្ខណៈមិនចាំបាច់ដោយអចេតនា និងបន្ថយល្បឿន។',
          ],
          points: [
            'ធ្វើចលនាតែលើ transform និង opacity ដើម្បីរលូនគ្មានការទាក់។',
            'រក្សារយៈពេលចលនា UI ឱ្យរហ័ស (150ms–250ms) កុំឱ្យអ្នកប្រើរង់ចាំយូរ។',
            'ប្រើខ្សែកោង ease-out សម្រាប់ម៉ឺនុយ និងធាតុបង្ហាញចូល—ចាប់ផ្តើមលឿន រួចឈប់ស្រទន់—កុំប្រើ ease-in។',
          ],
          table: {
            headers: ['គុណលក្ខណៈ', 'ដំណាក់កាល Render', 'រលូន 60fps?', 'ជម្រើសប្រសើរជាង'],
            rows: [
              ['transform', 'Composite (GPU)', 'បាទ/ចាស', 'ប្រើ translate(), scale(), rotate()'],
              [
                'opacity',
                'Composite (GPU)',
                'បាទ/ចាស',
                'ផ្គូផ្គងជាមួយ transform សម្រាប់ការបង្ហាញចូល',
              ],
              [
                'width / height',
                'Layout + Paint',
                'ទេ (ទាក់)',
                'ប្រើ transform: scaleX() / scaleY()',
              ],
              [
                'top / left / margin',
                'Layout + Paint',
                'ទេ (ទាក់)',
                'ប្រើ transform: translate(x, y)',
              ],
              [
                'box-shadow / blur',
                'Paint (ធ្ងន់)',
                'ប្រើតិចតួច',
                'រក្សា blur() ក្រោម 20px ឬ fade opacity វិញ',
              ],
            ],
          },
          warning:
            'កុំប្រើ transition: all ក្នុងគម្រោងជាក់ស្តែង។ ការបញ្ជាក់គុណលក្ខណៈច្បាស់ដូចជា transition: transform 200ms ease-out, opacity 200ms ease-out ការពារចលនា layout ដោយអចេតនា។',
        },
        {
          id: 'transforms-and-easing-curves',
          heading: 'Transforms, transform-origin និងខ្សែកោង cubic-bezier()',
          body: [
            'គុណលក្ខណៈ transform អនុញ្ញាតឱ្យរំកិល (translate) ពង្រីកបង្រួម (scale) និងបង្វិល (rotate) ធាតុលើ GPU ដោយមិនរំខានដល់ធាតុជុំវិញ។ សម្រាប់ popover ឬម៉ឺនុយធ្លាក់ចុះ សូមកំណត់ transform-origin នៅជ្រុងប៊ូតុងចុច (ដូចជា top left ឬ top right) ដើម្បីឱ្យម៉ឺនុយបើកចេញពីទីតាំងប៊ូតុងផ្ទាល់។',
            'ចលនាបង្ហាញចូលល្អមិនដែលចាប់ផ្តើមពី scale(0) ទេ។ ផ្ទុយទៅវិញ ចាប់ផ្តើមពី opacity: 0; transform: scale(0.95) ទៅ opacity: 1; transform: scale(1) ជាមួយខ្សែកោង ease-out ដូចជា cubic-bezier(0.23, 1, 0.32, 1) ក្រោម 250ms។ ប្រើ will-change: transform តែពេលចាំបាច់ប៉ុណ្ណោះ កុំដាក់លើគ្រប់ធាតុ។',
          ],
          points: [
            'បង្ហាញ popover និងកាតចូលពី scale(0.95) + opacity: 0 ទៅ scale(1) + opacity: 1—កុំចាប់ពី scale(0)។',
            'តម្រឹម transform-origin ទៅតាមប៊ូតុងចុចសម្រាប់ dropdown និង tooltip (modal នៅកណ្តាល)។',
            'ខ្សែកោង ease-out មុត (cubic-bezier(0.23, 1, 0.32, 1)) ធ្វើឱ្យ UI មានអារម្មណ៍ឆ្លើយតបលឿនភ្លាមៗ។',
          ],
          exampleTitle: 'ការបើក Popover ដោយប្រើ transform-origin និងខ្សែកោង Ease-Out',
          tip: 'ពេលអ្នកប្រើចុចបិទបើកលឿនមុនចលនាចប់ CSS transition នឹងត្រឡប់ថយក្រោយយ៉ាងរលូនពីទីតាំងកណ្តាលទីដោយស្វ័យប្រវត្តិ។',
        },
        {
          id: 'keyframes-and-reduced-motion',
          heading: 'ចលនា @keyframes និងការគោរព prefers-reduced-motion',
          body: [
            'Transitions ត្រូវការការផ្លាស់ប្តូរពីស្ថានភាព A ទៅ B។ ពេលអ្នកត្រូវការចលនាច្រើនជំហាន ការបង្ហាញចូលពេលផ្ទុកទំព័រ ឬសញ្ញាវិល loading spinner សូមបង្កើត @keyframes រួចភ្ជាប់ជាមួយ animation។ animation-fill-mode: both ធានាថាធាតុរក្សាស្ថានភាពដើម និងស្ថានភាពចុងក្រោយបានត្រឹមត្រូវ។',
            'ចលនាខ្លាំងអាចធ្វើឱ្យវិលមុខសម្រាប់អ្នកប្រើដែលងាយប្រតិកម្មនឹងចលនា។ គ្រប់គេហទំព័រដែលមានចលនាគួរដាក់ @media (prefers-reduced-motion: reduce) ដើម្បីបិទ ឬបន្ថយចលនាវិល និងរំកិលឱ្យមកជាការបង្ហាញស្ងប់ស្ងាត់។',
          ],
          points: [
            'ប្រើ transform: rotate(360deg) ជាមួយ linear timing សម្រាប់ loading spinner វិលស្មើល្បឿន។',
            'animation-fill-mode: both ការពារការលោតភ្លឹបមួយហ្វ្រេមមុនចលនាចាប់ផ្តើម។',
            'តែងតែបញ្ចូល @media (prefers-reduced-motion: reduce) ដើម្បីគោរពការកំណត់ accessibility របស់អ្នកប្រើ។',
          ],
          exampleTitle: 'Spinner លើ GPU, ចលនា Toast និង prefers-reduced-motion',
        },
      ],
      challenge: {
        prompt:
          'សរសេរ CSS ដែលមាន៖ (1) @keyframes card-enter ពី opacity: 0; transform: scale(0.95) translateY(6px) ទៅ opacity: 1; transform: scale(1) translateY(0) (2) class .card-animated ប្រើរយៈពេល 220ms ជាមួយ cubic-bezier(0.23, 1, 0.32, 1) both (3) transition ច្បាស់លាស់លើ transform សម្រាប់ .press-btn ជាមួយ :active scale(0.97) និង (4) @media (prefers-reduced-motion: reduce)។',
        hint: 'កុំប្រើ transition: all; សរសេរ transform ឱ្យច្បាស់ រួចបិទចលនាក្នុង prefers-reduced-motion។',
      },
      quiz: [
        {
          question:
            'តើគុណលក្ខណៈ CSS ពីរណាដែលដំណើរការលើ GPU compositor ដោយមិនបង្ខំឱ្យគណនា layout ឡើងវិញ?',
          options: [
            'width និង height',
            'top និង left',
            'transform និង opacity',
            'margin និង padding',
          ],
          answer: 2,
          explanation:
            'transform និង opacity ដំណើរការលើ compositor thread ដោយមិនប៉ះពាល់ Layout ឬ Paint ធ្វើឱ្យចលនារលូន 60–120fps។',
        },
        {
          question: 'តើវិធីមួយណាត្រឹមត្រូវតាមស្តង់ដាចលនា UI ទំនើបសម្រាប់ការបើក dropdown menu?',
          options: [
            'transition: all 600ms ease-in; ចាប់ផ្តើមពី scale(0)',
            'កំណត់ transition ច្បាស់លើ transform និង opacity ក្រោម 250ms ជាមួយ ease-out ចាប់ផ្តើមពី scale(0.95)',
            'ធ្វើចលនា height ពី 0px ទៅ 300px ដោយប្រើ linear',
            'ដាក់ will-change: all លើគ្រប់ធាតុក្នុងទំព័រ',
          ],
          answer: 1,
          explanation:
            'ការធ្វើចលនាលើ transform និង opacity ក្រោម 250ms ជាមួយ ease-out និងចាប់ផ្តើមពី scale(0.95) មើលទៅលឿន ធម្មជាតិ និងរលូន។',
        },
      ],
    },
  },
]
