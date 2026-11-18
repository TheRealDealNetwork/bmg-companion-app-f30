# Business Machine Companion App - Builder Handoff (2026-10-01)

## Contents
1. **01-Build-Plan-v2.0.docx** - The spec. Player mobile web app, GM/host control room,
   shared room display, automated recognition and guided debrief show. v2.0 (Oct 1, 2026);
   Addenda 1 and 2 are folded in and superseded.
2. **02-PP-Cards-320-with-codes.json** - P&P card dataset: 8 decks x 40 cards.
2b. **02b-Complete-Card-Dataset-392.json** - THE FULL VERSION. All 392 cards in one structured file:
    320 P&P (with codes, scenarios, answer values, Principle Voice) + 40 department
    (with department, type, copy count) + 14 event + 9 customer + 9 house.
    Newest revision text throughout (9/30 re-audit, 10/01 corrections). This is the
    import source for every deck.
   Every card carries its full printed card_code (BE-MK, BE-AC, BE-SA, BE-PR, BE-ACC,
   BE-RE, BE-OW, BE-GM + 01-40), scenario, options with values, correct answer, and
   Principle Voice (host_note). NOTE: the plan text names this file `v2_pp_cards.json`;
   this coded file is content-identical plus the codes, and is the file to import.
   Per plan: version the dataset on import; never expose the answer key as a
   downloadable client bundle; the older v1 file is reference-only.
3. **03-Full-Deck-Inventory.xlsx** - All other card text: 140 department cards
   (5 departments x 28), 14 event cards, 9 customer cards, 9 house cards.
   No JSON exists for these; export from the workbook if the app needs them.
4. **04-logo-trades-leadership.png** - Full TLP logo lockup for app chrome.
5. **05-test-app-prototype.html** - Working single-file prototype (Oct 1, 2026 play test, v2):
   setup, GM console, room scoreboard, ALL FIVE card decks in newest revision text
   (320 P&P by card-code digits, 40 department with filter/search, 14 event +
   9 customer + 9 house with shuffle draw), player pre/post Q&A, timers, valuation math.
   Reference for scoring logic and lookup/draw UX only;
   not production code (no backend, no realtime sync, answer key embedded client-side
   for test purposes only).

## Brand palette
- Orange #f26522 | Navy #1b3a5c | Gold #f2c027 | Cream #f7f4ee

## Locked game rules (mirror the plan)
- 8 rounds. Valuation = Net Profit x 3. Qualifier: net profit margin above 20%.
- Win at $100,000 valuation. Market Leader at $250,000.
- Money effects apply to revenue, never profit. No token conversions.
