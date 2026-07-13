/* ============================================================
   People for Animals - site-wide search
   One shared index across the landing page, the store and the
   patron journey. Self-injects its trigger, overlay and styles,
   so every page only needs: <script src="pfa-search.js" defer>
   ============================================================ */
(function () {
  'use strict';

  var LANDING = 'People_for_Animals_Landing.html';
  var STORE   = 'People_for_Animals_Store.html';
  var PATRON  = 'People_for_Animals_Membership.html';
  var GETINVOLVED = 'People_for_Animals_GetInvolved.html';
  var STORIES_PAGE = 'People_for_Animals_Stories.html';
  var FOUNDER = 'People_for_Animals_Founder.html';
  var WLDM = 'People_for_Animals_WatchListenDoMeet.html';

  /* ---------- the index ----------
     k = keywords the searcher might actually type, including
     the wrong words, the plurals and the shorthand.            */
  var INDEX = [
    // ---- landing: the movement
    { t:'People for Animals', p:'Home', u:LANDING+'#top', s:'India\'s largest animal welfare organisation, since 1992. Rescue, medicine, law, knowledge, care.',
      k:'pfa home about who we are maneka gandhi 1992 movement india largest animal welfare organisation' },
    { t:'What PFA Gives', p:'Home', u:LANDING+'#next', s:'Knowledge, infrastructure, community and products. In the works.',
      k:'gives free knowledge courses learn law first aid hospitals clinics shelters community' },
    { t:'Learn the law of the land', p:'Home', u:LANDING+'#next', s:'Courses, legal guides and the law. Coming, free, for everyone.',
      k:'law legal courses learn education guide abc rules first aid knowledge know your law study' },
    { t:'PFA Certified', p:'Home', u:LANDING+'#next', s:'A public standard for animal-friendly premises. In the works.',
      k:'certified certification mark standard animal friendly restaurants hotels builders apartments schools pet stores corporates cafes audit powered by pfa badge' },
    { t:'Your Brand x PFA', p:'Home', u:LANDING+'#next', s:'One limited edition. One campaign. One cause. In the works.',
      k:'brand partnership collaboration cobrand co-brand campaign limited edition corporate csr sponsor partner' },
    { t:'The Animal-Friendly Network', p:'Home', u:LANDING+'#next', s:'Every certified business, listed and searchable. In the works.',
      k:'network directory listing find search businesses restaurants hotels vets doctors builders schools cafes pet shops offices get listed' },
    { t:'The Animal-Friendly Index', p:'Home', u:LANDING+'#next', s:'Annual rankings, city to corporate. In the works.',
      k:'index rankings ranking city apartment school corporate college award annual most animal friendly' },
    { t:'The PFA App', p:'Home', u:LANDING+'#next', s:'Adoption, SOS, lost and found, ABC tracking. In the works.',
      k:'app mobile sos emergency rescue lost found pet blood bank abc tracking volunteer discovery events certificates community report cruelty operating system download' },
    { t:'Report cruelty', p:'Home', u:LANDING+'#next', s:'Reporting arrives with the PFA app. In the works.',
      k:'report cruelty abuse complaint fir police case violence beating harm rescue emergency help' },
    { t:'Adopt a life', p:'Home', u:LANDING+'#door', s:'Adopt when you are ready. The door is always open.',
      k:'adopt adoption dog cat puppy kitten rescue rehome take home animal foster' },
    { t:'Give to the work', p:'Home', u:LANDING+'#door', s:'Give when it means something. Every rupee funds rescue, medicine and care.',
      k:'give giving donate donation contribute fund support money charity 80g tax help pay' },
    { t:'Volunteer', p:'Home', u:GETINVOLVED+'?path=volunteer', s:'Rescue runs, adoption drives, shelter days. Give your time.',
      k:'volunteer volunteering help join work rescue runs shelter drives legal tech support time' },
    { t:'Colony Animal Caretaker Card', p:'Home', u:GETINVOLVED+'?path=catc', s:'Standing to feed and protect community animals. Verified, issued in your name.',
      k:'catc colony animal caretaker card feeder feeding street dogs community dogs identification id neighbourhood' },

    // ---- founder
    { t:'The First Hand', p:'Founders\u2019 Corner', u:FOUNDER, s:'Maneka Gandhi opened the first hand in 1992. The founder, the year, and the hands that followed.',
      k:'founder maneka gandhi who founded pfa history 1992 first hand founders corner about beginning' },

    // ---- watch listen do meet
    { t:'Watch. Listen. Do. Meet.', p:'Four rooms', u:WLDM, s:'The films to watch. The podcast to listen to. The assignments to do. The room where you meet Maneka Gandhi.',
      k:'watch listen do meet films podcast assignments meet maneka four rooms chambers program the first hand' },
    { t:'The First Hand \u2022 The Podcast', p:'Listen', u:WLDM+'#listen', s:'Long-form conversations. Weekly on Sundays.',
      k:'podcast the first hand listen episode maneka gandhi audio spotify apple podcasts sunday weekly' },
    { t:'This month \u2022 File the FIR', p:'Do', u:WLDM+'#do', s:'Learn to walk into a police station and file an FIR for animal cruelty. Three steps, twenty minutes.',
      k:'assignment do file fir police station animal cruelty pca act learn legal literacy' },
    { t:'An hour with Maneka', p:'Meet', u:WLDM+'#meet', s:'One Sunday a month on Zoom, patrons only. The card is your ticket.',
      k:'meet maneka gandhi zoom patrons monthly call meeting ticketed live' },

    // ---- stories
    { t:'Stories', p:'Stories', u:STORIES_PAGE, s:'Rescue films, field stories and the moments that carry the movement. Watch, and submit your own.',
      k:'stories video films watch rescue footage content wall community feed submit share upload' },
    { t:'Submit a story', p:'Stories', u:STORIES_PAGE+'#submit', s:'Send in a rescue, a recovery, a caretaker moment. PFA reviews it and it joins the wall.',
      k:'submit story share upload post video contribute my footage rescue caretaker' },

    // ---- get involved
    { t:'Become a Volunteer', p:'Get Involved', u:GETINVOLVED+'?path=volunteer', s:'Rescue runs, adoption drives, shelter days, medical transport, legal and tech support.',
      k:'volunteer volunteering help join sign up give time rescue foster drive shelter support field work' },
    { t:'Colony Animal Caretaker Card', p:'Get Involved', u:GETINVOLVED+'?path=catc', s:'Official identification for people who feed community animals. Verified against Aadhaar, issued in your name.',
      k:'catc colony animal caretaker card feeder feeding street dogs community dogs id identification standing abc rules apply legal protection' },
    { t:'Get Involved', p:'Get Involved', u:GETINVOLVED, s:'Give your time as a volunteer, or earn the standing of a caretaker card.',
      k:'get involved volunteer caretaker join help participate contribute time' },

    // ---- patron journey
    { t:'The Patron Card', p:'Patron', u:PATRON, s:'One rupee a day. Your name, your number, your years, in matte black.',
      k:'patron card membership member join become black card apply rupee day 365 year subscribe premium status identity' },
    { t:'One rupee a day', p:'Patron', u:PATRON, s:'Rs 365 a year, billed once. Renews yearly, cancel anytime.',
      k:'price cost fee 1 one rupee day 365 year cheap payment renewal cancel how much' },
    { t:'Payment: UPI, card, netbanking', p:'Patron', u:PATRON, s:'Pay Rs 365 by UPI, debit or credit card, or netbanking.',
      k:'payment pay upi gpay phonepe paytm card credit debit netbanking bank checkout secure receipt' },
    { t:'Aadhaar and identity', p:'Patron', u:PATRON, s:'Upload Aadhaar. The name is checked against the name on the card, in your browser.',
      k:'aadhaar aadhar identity kyc verification proof name match upload document masked last four privacy' },
    { t:'Photograph on the card', p:'Patron', u:PATRON, s:'Optional. Set in black and white, the way the card is printed.',
      k:'photo photograph picture portrait image black white optional face' },

    // ---- store: the shop itself
    { t:'The PFA Store', p:'Store', u:STORE+'#shop', s:'Caps, tees, jackets, bags and everything for the animal at home. Every margin funds the work.',
      k:'store shop buy merchandise merch products goods shopping cart order gifts every purchase saves' },
    { t:'Patron pricing', p:'Store', u:STORE+'#shop', s:'The second price is the patron price. One rupee a day.',
      k:'discount patron price member price cheaper offer deal savings' },

    // ---- store: products
    { t:'The Standard Cap', p:'Store', u:STORE+'#p-cap1', s:'Cotton twill. Embroidered emblem. Rs 799, patrons Rs 699.',
      k:'cap caps hat hats headwear cotton twill embroidered 799 standard' },
    { t:'The Field Cap', p:'Store', u:STORE+'#p-cap2', s:'Five-panel. Quick-dry for the rains. Rs 849, patrons Rs 749.',
      k:'cap caps hat five panel quick dry monsoon rain field 849' },
    { t:'The Emblem Tee', p:'Store', u:STORE+'#p-tee1', s:'220 GSM cotton. Emblem at the chest. Rs 899, patrons Rs 799.',
      k:'tee tees tshirt t-shirt shirt apparel clothing cotton gsm emblem chest 899' },
    { t:'The Wordmark Tee', p:'Store', u:STORE+'#p-tee2', s:'People for Animals, across the back. Rs 899, patrons Rs 799.',
      k:'tee tshirt t-shirt shirt apparel wordmark back print clothing 899' },
    { t:'The Heavyweight Hoodie', p:'Store', u:STORE+'#p-hood1', s:'400 GSM fleece. Kangaroo pocket. Rs 1,999, patrons Rs 1,799.',
      k:'hoodie hoody sweatshirt fleece hooded winter warm apparel clothing 1999' },
    { t:'The Coach Jacket', p:'Store', u:STORE+'#p-jkt1', s:'Water-resistant shell. Emblem in blue, back. Edition of 500. Rs 3,499, patrons Rs 2,999.',
      k:'jacket coach windcheater shell water resistant outerwear apparel limited edition drop 3499' },
    { t:'The Canvas Tote', p:'Store', u:STORE+'#p-tote1', s:'Fits a rescue kit. Or the groceries. Rs 599, patrons Rs 499.',
      k:'tote bag bags canvas shopper grocery carry 599' },
    { t:'The Field Backpack', p:'Store', u:STORE+'#p-pack1', s:'20 litres. Vet-run ready. Rs 2,499, patrons Rs 2,199.',
      k:'backpack bag bags rucksack knapsack 20 litre vet run field 2499' },
    { t:'Notebooks, Set of 3', p:'Store', u:STORE+'#p-note1', s:'Dot grid. Lies flat. Rs 499, patrons Rs 449.',
      k:'notebook notebooks diary journal paper stationery dot grid 499' },
    { t:'Wall Calendar 2027', p:'Store', u:STORE+'#p-cal1', s:'Twelve rescues, twelve months. Rs 699, patrons Rs 629.',
      k:'calendar wall 2027 paper stationery months rescues 699' },
    { t:'The Rope Leash', p:'Store', u:STORE+'#p-leash1', s:'Cotton rope. Solid brass clip. Rs 649, patrons Rs 579.',
      k:'leash lead rope dog walk brass clip pet pets accessories 649' },
    { t:'The Everyday Collar', p:'Store', u:STORE+'#p-collar1', s:'Soft webbing. Emblem tag included. Rs 549, patrons Rs 489.',
      k:'collar dog cat neck webbing tag pet pets accessories 549' },
    { t:'Vegetarian Treats', p:'Store', u:STORE+'#p-treat1', s:'Baked, vegetarian, vet-checked. Rs 349, patrons Rs 299.',
      k:'treats food snacks vegetarian vegan baked dog pet pets nutrition 349' },
    { t:'The Enamel Pin', p:'Store', u:STORE+'#p-pin1', s:'Hard enamel. The emblem, exact. Rs 299, patrons Rs 259.',
      k:'pin pins badge enamel lapel accessories 299' },
    { t:'The Sticker Sheet', p:'Store', u:STORE+'#p-stk1', s:'Weatherproof vinyl. Nine marks. Rs 149, patrons Rs 129.',
      k:'sticker stickers sheet vinyl decal 149' },
    { t:'The Steel Bottle', p:'Store', u:STORE+'#p-bot1', s:'750 ml. Twelve-hour cold. Rs 999, patrons Rs 899.',
      k:'bottle flask steel water 750 ml home drink 999' },
    { t:'The Ceramic Mug', p:'Store', u:STORE+'#p-mug1', s:'350 ml. The emblem in blue. Rs 549, patrons Rs 489.',
      k:'mug cup ceramic coffee tea home 549' },
    { t:'PFA Coffee, 250g', p:'Store', u:STORE+'#p-cof1', s:'Single origin, medium roast. Rs 649, patrons Rs 579.',
      k:'coffee beans ground roast single origin 250g home drink 649' },

    // ---- store: categories
    { t:'Caps', p:'Store', u:STORE+'#cat-caps', s:'Every cap in the store.', k:'caps hats headwear category' },
    { t:'Apparel', p:'Store', u:STORE+'#cat-apparel', s:'Tees, hoodies and jackets.', k:'apparel clothing clothes tshirt tee hoodie jacket wear category' },
    { t:'Bags', p:'Store', u:STORE+'#cat-bags', s:'Totes and backpacks.', k:'bags bag tote backpack category' },
    { t:'Pets', p:'Store', u:STORE+'#cat-pets', s:'Leashes, collars and vegetarian treats.', k:'pets pet dog cat leash collar treats food category' },
    { t:'Paper', p:'Store', u:STORE+'#cat-paper', s:'Notebooks and calendars.', k:'paper stationery notebook calendar category' },
    { t:'Pins', p:'Store', u:STORE+'#cat-pins', s:'Enamel pins and stickers.', k:'pins pin sticker badge category' },
    { t:'Home', p:'Store', u:STORE+'#cat-home', s:'Bottles, mugs and coffee.', k:'home bottle mug coffee kitchen category' }
  ];

  /* ---------- text tools ---------- */
  function norm(s){
    return (s || '').toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  function tokens(s){ return norm(s).split(' ').filter(Boolean); }

  function lev(a, b){
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    var prev = [], cur = [], i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++){
      cur = [i];
      for (j = 1; j <= b.length; j++){
        cur[j] = Math.min(prev[j] + 1, cur[j-1] + 1, prev[j-1] + (a[i-1] === b[j-1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[b.length];
  }
  // typo tolerance grows with word length: "membrship" still finds "membership"
  function fuzzyHit(q, word){
    if (word.indexOf(q) === 0) return 1;        // prefix
    if (word.indexOf(q) > -1) return 0.8;       // contains
    if (q.length < 4) return 0;
    var tol = q.length >= 8 ? 2 : 1;
    return lev(q, word) <= tol ? 0.6 : 0;
  }

  /* ---------- ranking ---------- */
  function score(entry, qTokens, rawQuery){
    var title = norm(entry.t), keys = norm(entry.k), body = norm(entry.s);
    var total = 0, matched = 0;

    if (rawQuery.length > 2 && title.indexOf(rawQuery) > -1) total += 60;
    if (rawQuery.length > 2 && keys.indexOf(rawQuery) > -1) total += 20;

    var titleWords = title.split(' '), keyWords = keys.split(' '), bodyWords = body.split(' ');

    qTokens.forEach(function(q){
      var best = 0, k;
      for (k = 0; k < titleWords.length; k++) best = Math.max(best, fuzzyHit(q, titleWords[k]) * 30);
      for (k = 0; k < keyWords.length; k++)   best = Math.max(best, fuzzyHit(q, keyWords[k]) * 18);
      for (k = 0; k < bodyWords.length; k++)  best = Math.max(best, fuzzyHit(q, bodyWords[k]) * 8);
      if (best > 0) matched++;
      total += best;
    });

    if (!matched) return 0;
    // every word of the query landing somewhere is worth a lot
    if (matched === qTokens.length && qTokens.length > 1) total *= 1.5;
    return total;
  }

  function search(query){
    var raw = norm(query);
    if (raw.length < 2) return [];
    var qTokens = tokens(query);
    var hits = [];
    INDEX.forEach(function(e){
      var sc = score(e, qTokens, raw);
      if (sc > 0) hits.push({ e: e, sc: sc });
    });
    hits.sort(function(a, b){ return b.sc - a.sc; });
    return hits.slice(0, 8).map(function(h){ return h.e; });
  }

  /* ---------- highlight ---------- */
  function esc(s){
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function highlight(text, qTokens){
    var out = esc(text);
    qTokens.forEach(function(q){
      if (q.length < 2) return;
      out = out.replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + ')', 'ig'), '<mark>$1</mark>');
    });
    return out;
  }

  /* ---------- styles ---------- */
  var CSS = ''
  + '.pfa-strig{display:inline-flex;align-items:center;gap:10px;background:transparent;'
  + 'border:1px solid rgba(14,17,22,0.14);color:#55606A;cursor:pointer;font-family:inherit;'
  + 'font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;'
  + 'padding:12px 16px;min-height:44px;border-radius:0;transition:border-color .25s ease,color .25s ease;}'
  + '.pfa-strig:hover{border-color:#006DB3;color:#006DB3;}'
  + '.pfa-strig .pfa-mag{flex:none;display:block;}'
  + '.pfa-strig kbd{font-family:inherit;font-size:10px;letter-spacing:.1em;color:#7A848D;'
  + 'border:1px solid rgba(14,17,22,0.14);padding:2px 6px;}'
  + '@media (max-width:820px){.pfa-strig .pfa-lbl,.pfa-strig kbd{display:none;}.pfa-strig{padding:12px;}}'
  + '.pfa-navright{display:flex;align-items:center;gap:14px;}'

  + '.pfa-scrim{position:fixed;inset:0;background:rgba(14,17,22,.55);z-index:400;opacity:0;'
  + 'pointer-events:none;transition:opacity .28s ease;backdrop-filter:blur(2px);}'
  + '.pfa-scrim.on{opacity:1;pointer-events:auto;}'

  + '.pfa-panel{position:fixed;top:0;left:50%;transform:translate(-50%,-14px);width:min(760px,100%);'
  + 'z-index:401;background:#FFFFFF;border:1px solid #0E1116;border-top:none;'
  + 'opacity:0;pointer-events:none;transition:opacity .28s ease,transform .28s cubic-bezier(.2,.85,.25,1);'
  + 'max-height:100vh;max-height:100svh;display:flex;flex-direction:column;}'
  + '.pfa-panel.on{opacity:1;pointer-events:auto;transform:translate(-50%,0);}'
  + '.pfa-sbar{display:flex;align-items:center;gap:14px;padding:20px 22px;border-bottom:1px solid rgba(14,17,22,0.14);}'
  + '.pfa-sbar .pfa-sq{width:11px;height:11px;background:#00A4FF;flex:none;}'
  + '.pfa-sbar input{flex:1;border:none;outline:none;background:transparent;min-width:0;'
  + 'font-family:inherit;font-size:18px;color:#0E1116;padding:6px 0;}'
  + '.pfa-sbar input::placeholder{color:#A9B1B8;}'
  + '.pfa-esc{background:none;border:1px solid rgba(14,17,22,0.14);color:#7A848D;cursor:pointer;'
  + 'font-family:inherit;font-size:10px;letter-spacing:.2em;text-transform:uppercase;'
  + 'padding:12px 14px;min-height:42px;flex:none;}'
  + '.pfa-esc:hover{color:#0E1116;border-color:#0E1116;}'

  + '.pfa-results{overflow-y:auto;-webkit-overflow-scrolling:touch;}'
  + '.pfa-res{display:block;padding:16px 22px;border-bottom:1px solid rgba(14,17,22,0.08);'
  + 'text-decoration:none;color:inherit;cursor:pointer;transition:background .18s ease;}'
  + '.pfa-res:last-child{border-bottom:none;}'
  + '.pfa-res:hover,.pfa-res.sel{background:#F4F6F7;}'
  + '.pfa-res.sel{box-shadow:inset 3px 0 0 #00A4FF;}'
  + '.pfa-rtop{display:flex;align-items:baseline;justify-content:space-between;gap:14px;}'
  + '.pfa-rt{font-weight:700;font-size:1rem;color:#0E1116;}'
  + '.pfa-rp{font-family:inherit;font-size:10px;letter-spacing:.22em;text-transform:uppercase;'
  + 'color:#7A848D;border:1px solid rgba(14,17,22,0.14);padding:5px 9px;flex:none;}'
  + '.pfa-rs{font-size:.9rem;color:#55606A;margin-top:6px;}'
  + '.pfa-res mark{background:#BFE7FF;color:#0E1116;padding:0 2px;}'

  + '.pfa-empty{padding:44px 22px;text-align:center;color:#55606A;}'
  + '.pfa-empty b{display:block;color:#0E1116;font-size:1.05rem;margin-bottom:8px;}'
  + '.pfa-hintrow{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:20px;}'
  + '.pfa-hint{border:1px solid rgba(14,17,22,0.14);padding:12px 16px;min-height:42px;font-size:11px;'
  + 'letter-spacing:.16em;text-transform:uppercase;color:#55606A;cursor:pointer;background:#fff;font-family:inherit;}'
  + '.pfa-hint:hover{border-color:#006DB3;color:#006DB3;}'
  + '.pfa-sect{display:flex;align-items:center;justify-content:space-between;gap:14px;'
  + 'font-family:inherit;font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:#7A848D;'
  + 'text-align:left;margin-bottom:12px;}'
  + '.pfa-clear{background:none;border:none;cursor:pointer;font-family:inherit;'
  + 'font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#7A848D;padding:8px 0 8px 12px;}'
  + '.pfa-clear:hover{color:#0E1116;}'
  + '.pfa-hintrow.left{justify-content:flex-start;margin-bottom:30px;}'
  + '.pfa-dym{display:block;margin:14px auto 0;background:none;border:1px solid #006DB3;'
  + 'color:#006DB3;cursor:pointer;font-family:inherit;font-size:13px;letter-spacing:.04em;'
  + 'padding:12px 18px;min-height:42px;}'
  + '.pfa-dym b{font-weight:700;}'
  + '.pfa-dym:hover{background:#F4F6F7;}'
  + '.pfa-foot{display:flex;gap:18px;padding:12px 22px;border-top:1px solid rgba(14,17,22,0.14);'
  + 'font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#7A848D;flex-wrap:wrap;}'
  + '@media (max-width:600px){.pfa-panel{width:100%;}.pfa-foot{display:none;}.pfa-sbar input{font-size:16px;}}'
  + '@media (max-height:480px){.pfa-sbar{padding:12px 18px;}.pfa-res{padding:12px 18px;}.pfa-foot{display:none;}}'
  + '@media (prefers-reduced-motion:reduce){.pfa-scrim,.pfa-panel{transition:none;}}'

  + '.pfa-flash{animation:pfaFlash 1.8s ease;}'
  + '@keyframes pfaFlash{0%,100%{background:transparent;}18%{background:#DFF0FF;}}';

  CSS += '.pfa-strig .pfa-mag{flex:none;display:block;}'
    + '.pfa-prog{position:fixed;top:0;left:0;height:2px;background:#00A4FF;width:0;z-index:60;pointer-events:none;}'
    + '@media (min-height:561px){'
    +   'header.nav .nav-inner{transition:height .28s cubic-bezier(.2,.85,.25,1);}'
    +   'header.nav.pfa-navc .nav-inner{height:58px;}'
    + '}'
    + '@media (prefers-reduced-motion:reduce){header.nav .nav-inner{transition:none;}}';

  /* ---------- recent searches (this browser only, degrade silently) ---------- */
  var RKEY = 'pfa.recent';
  function loadRecents(){
    try { return JSON.parse(localStorage.getItem(RKEY) || '[]').slice(0, 5); }
    catch (e){ return []; }
  }
  function saveRecent(q){
    q = (q || '').trim();
    if (q.length < 2) return;
    try {
      var r = loadRecents().filter(function(x){ return x.toLowerCase() !== q.toLowerCase(); });
      r.unshift(q);
      localStorage.setItem(RKEY, JSON.stringify(r.slice(0, 5)));
    } catch (e){ /* storage blocked: recents simply do not persist */ }
  }
  function clearRecents(){
    try { localStorage.removeItem(RKEY); } catch (e){}
  }

  /* ---------- did you mean: nearest word in the index vocabulary ---------- */
  var VOCAB = null;
  function vocab(){
    if (VOCAB) return VOCAB;
    var set = {};
    INDEX.forEach(function(e){
      tokens(e.t + ' ' + e.k).forEach(function(w){ if (w.length >= 4) set[w] = 1; });
    });
    VOCAB = Object.keys(set);
    return VOCAB;
  }
  function didYouMean(query){
    var qT = tokens(query);
    var best = null;
    qT.forEach(function(q){
      if (q.length < 3) return;
      vocab().forEach(function(w){
        var d = lev(q, w);
        if (d > 0 && d <= 2 && d < q.length && (!best || d < best.d)){
          best = { d: d, from: q, to: w };
        }
      });
    });
    if (!best) return null;
    return qT.map(function(t){ return t === best.from ? best.to : t; }).join(' ');
  }

  /* ---------- build the UI ---------- */
  var panel, input, results, scrim, sel = -1, current = [];

  function build(){
    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    scrim = document.createElement('div');
    scrim.className = 'pfa-scrim';

    panel = document.createElement('div');
    panel.className = 'pfa-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Search People for Animals');
    panel.innerHTML =
        '<div class="pfa-sbar">'
      +   '<span class="pfa-sq"></span>'
      +   '<input type="text" id="pfa-sinput" autocomplete="off" spellcheck="false" '
      +     'placeholder="Search anything - adopt, hoodie, aadhaar, report cruelty" aria-label="Search">'
      +   '<button class="pfa-esc" id="pfa-sesc">Esc</button>'
      + '</div>'
      + '<div class="pfa-results" id="pfa-sresults" role="listbox"></div>'
      + '<div class="pfa-foot"><span>Enter to open</span><span>Up and down to move</span><span>Esc to close</span></div>';

    document.body.appendChild(scrim);
    document.body.appendChild(panel);

    input = panel.querySelector('#pfa-sinput');
    results = panel.querySelector('#pfa-sresults');

    results.addEventListener('click', function(e){
      if (e.target.closest('.pfa-res')) saveRecent(input.value);
    });
    scrim.addEventListener('click', close);
    panel.querySelector('#pfa-sesc').addEventListener('click', close);
    input.addEventListener('input', function(){ render(input.value); });
    input.addEventListener('keydown', onKeys);

    // Trigger, dropped into whatever nav this page has.
    // It must never land inside a container the page hides on mobile
    // (the landing page hides .nav-links below 820px).
    var nav = document.querySelector('.nav-inner');
    if (nav){
      var trig = document.createElement('button');
      trig.className = 'pfa-strig';
      trig.setAttribute('aria-label', 'Search this site');
      trig.innerHTML = '<svg class="pfa-mag" width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" focusable="false">'
        + '<circle cx="6.2" cy="6.2" r="4.6" stroke="currentColor" stroke-width="1.6"/>'
        + '<path d="M9.7 9.7 L14 14" stroke="currentColor" stroke-width="1.6"/></svg>'
        + '<span class="pfa-lbl">Search</span><kbd>/</kbd>';
      trig.addEventListener('click', open);

      var right  = nav.querySelector('.nav-right');
      var burger = nav.querySelector('.burger');
      var tag    = nav.querySelector('.nav-tag');

      if (right){
        right.insertBefore(trig, right.firstChild);        // store
      } else if (burger){
        nav.insertBefore(trig, burger);                    // landing: always visible
      } else if (tag){
        var slot = document.createElement('div');          // patron journey
        slot.className = 'pfa-navright';
        nav.insertBefore(slot, tag);
        slot.appendChild(tag);
        slot.appendChild(trig);
      } else {
        nav.appendChild(trig);
      }
    }

    document.addEventListener('keydown', function(e){
      // Escape closes the panel no matter where focus sits.
      if (e.key === 'Escape' && panel.classList.contains('on')){
        e.preventDefault(); close(); return;
      }
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
      if ((e.key === '/' && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')){
        e.preventDefault(); open();
      }
    });
  }

  var _scrollY = 0;
  function lockScroll(){
    _scrollY = window.scrollY || window.pageYOffset;
    var b = document.body;
    b.style.position = 'fixed'; b.style.top = (-_scrollY) + 'px';
    b.style.left = '0'; b.style.right = '0'; b.style.width = '100%';
    b.style.overflow = 'hidden';
  }
  function unlockScroll(){
    var b = document.body;
    b.style.position = ''; b.style.top = ''; b.style.left = '';
    b.style.right = ''; b.style.width = ''; b.style.overflow = '';
    void b.offsetHeight;
    var root = document.documentElement;
    var prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, _scrollY);
    root.style.scrollBehavior = prev;
  }
  function open(){
    scrim.classList.add('on');
    panel.classList.add('on');
    lockScroll();
    render('');
    setTimeout(function(){ input.focus(); }, 60);
  }
  function close(){
    scrim.classList.remove('on');
    panel.classList.remove('on');
    unlockScroll();
    input.value = '';
    sel = -1;
  }

  var PAGE = (window.location.pathname.split('/').pop() || '').toLowerCase();
  var SUGGESTIONS =
      PAGE.indexOf('store') > -1       ? ['hoodie', 'cap', 'tote', 'patron price', 'treats', 'coffee']
    : PAGE.indexOf('membership') > -1  ? ['aadhaar', 'payment', 'one rupee', 'photo', 'volunteer', 'adopt']
    : PAGE.indexOf('getinvolved') > -1 ? ['volunteer', 'caretaker', 'catc', 'adopt', 'donate', 'hoodie']
    : ['adopt', 'hoodie', 'donate', 'aadhaar', 'report cruelty', 'volunteer'];

  function render(q){
    var qTokens = tokens(q);
    current = search(q);
    sel = -1;

    if (!q.trim()){
      var rec = loadRecents();
      var recHtml = rec.length
        ? '<p class="pfa-sect">Recent <button class="pfa-clear" type="button">Clear</button></p>'
          + '<div class="pfa-hintrow left">'
          + rec.map(function(s){ return '<button class="pfa-hint" data-q="' + esc(s) + '">' + esc(s) + '</button>'; }).join('')
          + '</div>'
        : '';
      results.innerHTML =
          '<div class="pfa-empty">'
        + recHtml
        + '<b>Search everything</b>'
        + 'The store, the patron card, the law, the app.'
        + '<div class="pfa-hintrow">'
        + SUGGESTIONS.map(function(s){ return '<button class="pfa-hint" data-q="' + s + '">' + s + '</button>'; }).join('')
        + '</div></div>';
      bindHints();
      var cl = results.querySelector('.pfa-clear');
      if (cl) cl.addEventListener('click', function(){ clearRecents(); render(''); });
      return;
    }
    if (!current.length){
      var dym = didYouMean(q);
      results.innerHTML =
          '<div class="pfa-empty"><b>Nothing for &ldquo;' + esc(q) + '&rdquo;</b>'
        + (dym ? '<button class="pfa-dym" type="button" data-q="' + esc(dym) + '">Did you mean <b>' + esc(dym) + '</b>?</button>' : 'Try a different word.')
        + '<div class="pfa-hintrow">'
        + SUGGESTIONS.map(function(s){ return '<button class="pfa-hint" data-q="' + s + '">' + s + '</button>'; }).join('')
        + '</div></div>';
      bindHints();
      var dy = results.querySelector('.pfa-dym');
      if (dy) dy.addEventListener('click', function(){
        input.value = dy.getAttribute('data-q');
        render(input.value);
        input.focus();
      });
      return;
    }
    results.innerHTML = current.map(function(e, i){
      return '<a class="pfa-res" href="' + e.u + '" data-i="' + i + '" role="option">'
        + '<span class="pfa-rtop"><span class="pfa-rt">' + highlight(e.t, qTokens) + '</span>'
        + '<span class="pfa-rp">' + e.p + '</span></span>'
        + '<span class="pfa-rs">' + highlight(e.s, qTokens) + '</span></a>';
    }).join('');
    Array.prototype.forEach.call(results.querySelectorAll('.pfa-res'), function(node){
      node.addEventListener('mouseenter', function(){
        sel = parseInt(node.getAttribute('data-i'), 10);
        paint();
      });
    });
  }
  function bindHints(){
    Array.prototype.forEach.call(results.querySelectorAll('.pfa-hint'), function(btn){
      btn.addEventListener('click', function(){
        input.value = btn.getAttribute('data-q');
        render(input.value);
        input.focus();
      });
    });
  }
  function paint(){
    Array.prototype.forEach.call(results.querySelectorAll('.pfa-res'), function(n, i){
      n.classList.toggle('sel', i === sel);
      if (i === sel) n.scrollIntoView({ block: 'nearest' });
    });
  }
  function onKeys(e){
    if (e.key === 'Escape'){ e.preventDefault(); close(); return; }
    if (!current.length) return;
    if (e.key === 'ArrowDown'){ e.preventDefault(); sel = (sel + 1) % current.length; paint(); }
    else if (e.key === 'ArrowUp'){ e.preventDefault(); sel = (sel - 1 + current.length) % current.length; paint(); }
    else if (e.key === 'Enter'){
      e.preventDefault();
      var pick = current[sel < 0 ? 0 : sel];
      if (pick){ saveRecent(input.value); window.location.href = pick.u; }
    }
  }

  /* ---------- arriving from a search result ---------- */
  // #p-tee1 scrolls to that product and flashes it.
  // #cat-apparel applies that category filter.
  function landOnHash(){
    var h = decodeURIComponent(window.location.hash || '');
    if (!h) return;

    if (h.indexOf('#cat-') === 0){
      var cat = h.slice(5);
      var chip = document.querySelector('.fchip[data-f="' + cat + '"]');
      if (chip){
        chip.click();
        var shop = document.getElementById('shop');
        if (shop) shop.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    if (h.indexOf('#p-') === 0){
      var card = document.querySelector('.pcard[data-id="' + h.slice(3) + '"]');
      if (card){
        setTimeout(function(){
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.classList.add('pfa-flash');
          setTimeout(function(){ card.classList.remove('pfa-flash'); }, 1900);
        }, 220);
      }
    }
  }

  // ---------- quiet chrome: reading progress, condensing nav, card tilt ----------
  function initChrome(){
    var prog = document.createElement('div');
    prog.className = 'pfa-prog';
    prog.setAttribute('aria-hidden', 'true');
    document.body.appendChild(prog);
    var nav = document.querySelector('header.nav');
    var ticking = false;
    function onScroll(){
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function(){
        var d = document.documentElement;
        var max = d.scrollHeight - window.innerHeight;
        prog.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
        if (nav) nav.classList.toggle('pfa-navc', window.scrollY > 12);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    // The card leans toward the pointer. Desktop only, and never under reduced motion.
    var card = document.querySelector('#mcardBtn, #cardFlipBtn');
    if (card
        && window.matchMedia('(pointer:fine)').matches
        && !window.matchMedia('(prefers-reduced-motion:reduce)').matches){
      var raf = null;
      card.addEventListener('pointerenter', function(){ card.style.transition = 'none'; });
      card.addEventListener('pointermove', function(e){
        var r = card.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
        var ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function(){
          card.style.transform = 'perspective(1200px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
        });
      });
      card.addEventListener('pointerleave', function(){
        if (raf) cancelAnimationFrame(raf);
        card.style.transition = 'transform .35s ease';
        card.style.transform = '';
      });
    }
  }

  function init(){
    try {
      build();
      landOnHash();
      window.addEventListener('hashchange', landOnHash);
      initChrome();
    } catch (err){
      if (window.console) console.error('PFA search failed to start:', err);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
