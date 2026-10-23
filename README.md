# THE IMAGE OF THE ARTIST
An interactive, editorial-style website made with plain HTML, CSS and JavaScript. No npm or build system is required.

## 1. Add your photographs

Unzip this folder and copy your existing 26 files into the nested `artist/` folder:

```
artist-website/
  index.html
  styles.css
  script.js
  supabase-config.js
  supabase-setup.sql
  artist/
    emoji.png
    artist1.png
    artist2.png
    ...
    artist25.png
```

**The images are not included in this ZIP** because the original PNGs were not uploaded to this chat. If a picture is missing, the site shows a neutral placeholder labeled with its file number. No work is silently replaced with a different artist's image.

The script also tries `emoji.png`, `artist1.png`, etc. directly next to `index.html` if all your images are already in a single `artist` folder and you prefer keeping that structure.

The numbered works in the archive exactly follow your previous 25-work research list. Update title, dates, categories, source links, and image order in the `artworks` array near the top of `script.js` if necessary.

## 2. Preview the website

For a quick preview you can open `index.html` in a browser. For consistent results, use a small local web server:

```
cd artist-website
python3 -m http.server 8000
```

Then open `http://localhost:8000` in Chrome or Safari. Alternatively, use the VS Code Live Server extension.

All screens work immediately: landing impression, repeat-viewable two-step survey, interactive archive with single-select filters and artwork details, two survey result charts, About overlay, and ending reflection.

### What the website does

- White and black editorial interface, with small blue and yellow accents.
- Opening emoji fades in, and **the website title does not appear on the opening screen**. The About button can reveal it voluntarily.
- `What do you see?` free-text first impression, followed by two multiple-select questions shown one at a time. **The survey stays accessible after submission**: use Survey in the top navigation or Review questions again. The original selections are prefilled when available. Revisiting is a **review/preview only**; it never records a second vote and does not alter the submitted response.
- Top navigation lets visitors jump directly to the archive or survey results. No fixed Previous buttons are shown; visitors can use the top navigation or browser Back.
- 25 archive works in chronological order, with a **single-select** category filter, subtle image hover zoom, split image/details modal (images fit without cropping), and a sticky Continue button aligned to the right of the filters.
- Two side-by-side aggregate multiple-choice charts (blue for activities and yellow for visual cues), followed by the emoji, a final open-ended question, and a Home button.
- A clean unboxed About navigation link opens an explanatory overlay with a short privacy note.
- **Separate, navigable views** for the landing, survey, archive, results, and reflection (no scroll-driven section transitions). Only the archive is intended as a long scrolling page; some small-screen views may scroll as needed. The URL hash identifies the current view, and browser Back/Forward work.
- Mobile-responsive design and reduced-motion support.

## 3. IMPORTANT — connecting results from different visitors

**Without configuration, results are saved in `localStorage` in the current browser only. They do not synchronize across visitors or computers.** The results page labels this mode clearly and starts at zero, with no invented results.

To enable a shared real-time-ish result page on a deployed site:

1. Create a free or paid project at https://supabase.com .
2. Open **SQL Editor**, paste and run the contents of `supabase-setup.sql`.
3. Open **Project Settings → API** or **Connect** (the current Supabase interface may differ). Copy the **Project URL** and **publishable / anon public key**.
4. Edit `supabase-config.js`:

```js
window.SURVEY_CONFIG = {
  supabaseUrl: 'https://YOUR-PROJECT.supabase.co',
  anonKey: 'YOUR-PUBLIC-ANON-OR-PUBLISHABLE-KEY'
};
```

5. Reload the site and complete a survey. Results will pull **anonymous aggregate counts from Supabase**, refresh when the results page is opened, and update about every **15 seconds** while it is visible. There is also a manual `Refresh` button.

**Never put the Supabase `service_role` or secret key in client-side JavaScript.** The SQL enables row-level security: anonymous users can insert validated choices, but cannot fetch raw individual rows. A security-definer function returns only aggregate counts. Since this project accepts anonymous submissions, it is not bot-proof; for a larger public site, add a server-side rate limit/CAPTCHA and review Supabase usage.

Only the broad, auto-classified category of the first free-text answer is sent to Supabase; the visitor's exact typed wording stays in their browser. The initial categories are approximate, especially for multilingual responses. The first impression is not displayed in collective results. The two multiple-choice questions are recorded in full, anonymously. Browser-local storage also discourages repeat submissions from the same browser, but does not prevent deliberately repeated votes across browsers.

If Supabase cannot be reached, the page falls back to browser-only data **and says so**. It does not claim that local figures are shared.

## 4. Publish

This is a plain static site compatible with GitHub Pages, Netlify, Vercel, or any static hosting. Upload the HTML/CSS/JS files together with `artist/` and the 26 images. If you want your Parsons site to be restricted to course viewers, pick hosting that supports **real access control/password protection**, not just an unlisted URL.

## 5. Content and image notes

- `artist4.png` (*The Artist in His Studio*) is **a studio scene**, not a confirmed self-portrait.
- `artist16.png` (Nam June Paik), `artist19.png` (Bruce Nauman), and `artist22.png` (Janine Antoni) represent performances/actions or their documentation.
- `artist20.png` (Cindy Sherman) is a **staged identity, not a literal self-portrait**.
- `artist21.png` is titled *Self* (1991), the **first** version of Marc Quinn's ongoing series. Make sure your selected image is the 1991 version if you label it that way; a museum may show a later cast instead.
- Confirm that each image is the exact work described and that you have the needed usage rights for your publishing context. Museum source links are not all direct download/rights links. Sources, dates, and categories may be edited in `script.js`.

## 6. Changing the visual design

- Color palette near top of `styles.css`: `--ink`, `--paper`, `--blue`, `--yellow`.
- Font sizes and layout are all in `styles.css`.
- Text and page structure are in `index.html`.
- The `ACTIVITIES` and `VISUALS` arrays in `script.js` set survey options. **If you change their exact wording after launching with Supabase, update the allowed values in `supabase-setup.sql` and keep previous response compatibility in mind.**
- The `artworks` array in `script.js` controls descriptions, tags and source links.
- Initial responses are categorized by `categorizeImpression` in `script.js`. It is a basic heuristic, not AI classification.

Made for a student research prototype, not a commercial survey platform.

## 7. Reopening the survey after submitting (V3 fix)

- Navigate to **Survey** at any time, even if you already submitted it in Chrome.
- The two original questions remain visible and selectable. For returning visitors, a small **Review mode** note explains that these selections are preview-only.
- Click **Next** and **Finish review**, or use **Review questions again** on the confirmation view.
- Your previous contribution is preserved and **not double counted**. If V2's saved multiple-choice response is present, the interface restores those selections.
- Review-mode changes are not saved and do not affect the charts (this is intentionally not an edit-my-submission feature).
- To test a fresh first-time submission, use a separate Chrome Incognito window or a separate browser profile. Remember that a successful test submission may count in a connected shared database.
- Your existing Chrome data is not erased or reset when updating these files.
