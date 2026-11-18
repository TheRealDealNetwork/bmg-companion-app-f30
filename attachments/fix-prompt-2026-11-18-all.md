# Grok fix prompt: Game 11 fixes, build 0214-f30 (all sections)

Base: f29z.8 (git e3f0597, "f29z.8 grok as pushed"). The reference implementation is on the local branch `f30-wave1` (commit 86b39bb). The full patch is in `all.diff` (18 files, +1319/−710, src only). `npx tsc --noEmit` and `npm run build` both pass. An engine smoke test passes 28 of 28 checks (`local-f30-evidence/smoke-output.txt`).

**Rules for this build:**
- Change only what is listed here.
- Keep the Spanish toggle working, and give every new string an `es` version.
- Set the build stamp to **`build 0214-f30`**, at the bottom of the play page.
- Do the sections in order: **A, then B, then C**.
  - Section A stands alone.
  - A and B share one turn engine (section 0). If you ship A, ship section 0 with it.
  - Section C is optional polish and does not change the flow.

How to read each item:
- **Root cause** is what f29z.8 does wrong: the file, the function and the defect.
- **Required** is the exact behavior to build.
- **Check** is the acceptance test. All checks assume a fresh game on preview.

---

## 0. Shared foundations (required by A and B)

**0.1 Card names.** Houses and customers are stored as slug ids, for example `1970s-bi-level-dated-everything`.
- Rules that regex on the display name never matched.
- Add `canonicalCardName(value)` in `board.ts`. It maps a slug or a name to the printed card name.
- Every house or customer rule (slots, bonuses, customer cash, labels) must run on `canonicalCardName(...)`.

**0.2 Slot model, one source of truth: `filledSlots(project, plays)` in `board.ts`.**
- **need[dept]** = 1 + house extra + customer extra + slot cards played on the project (only cards whose PLAY adds a slot) + GM plus_ones.
- **filled[dept]** comes only from token effects:
  - token cards (Basic Lead, etc.)
  - split/move/remove effects (the *other* project counts via `other_project_id`)
  - the Kim star
  - GM token events: Warm Lead, Rush Callback, Crew Efficiency, Buyer's Remorse
  - "Token" plays from the token step
- Cards with no PLAY line (for example Crew Swap) are kind `"none"`. **They fill nothing.** f29z.8 counted them as "+1 token", which is how Crew Swap filled the Bi-Level's extra hammer.
- The function returns `need`, `filled`, `outstanding`, `totalNeed`, `totalFilled`, `ready` (all outstanding = 0), and `reasons` (for example "+1 hammer from 1970s Bi-Level").

**House and customer extras (printed Nov 4 cards are canonical, not dataset.json):**

| Card | Extra slot | Cash |
|---|---|---|
| Bi-Level | +1 hammer | +$3,000 |
| Colonial | +1 hammer | |
| Rowhome | +1 hammer | |
| Ranch | +1 star | |
| Split-Level | +1 $ (Sales) | |
| Craftsman's Bungalow | +1 phone | |
| Lake House | +1 calculator | |
| McMansion | +1 of any type (`extra_slot`) | +$2,000 |
| Victorian | | +$2,000 |
| Patel | +1 slot of choice (`extra_slot`) | +$2,000 |

**Customer rules:**
- **Kim (printed):** when this project gets its star, place 1 star on another unfinished project. **No cash.** Remove the dataset's $3,000.
- **Lee:** $1,000 per token placed, max $5,000, paid as tokens land. f29z.8 paid only on completion.
- **Garcia:** +$2,000 per project finished after Garcia's, max $8,000 (4 projects). f29z.8 had no cap.
- **O'Brien:** +$4,000 if last finished.
- **Rivera:** +$5,000 with 2 or more SPECIAL cards, counted by card *type*. f29z.8 regexed the card text, which never contains "SPECIAL".
- **Stanley:** −$5,000 if not done by the **end** of round 6, so the check is `round >= 7`. f29z.8 used `>= 6`.
- **Thompson:** −$5,000 if 4th or later.

**0.3 Pipeline:** `pipelineBlock(project, plays, dept, lang)` in `board.ts`.
- A department is locked on a project while any earlier department in Marketing → Appointment Center → Sales → Production → Accounting has `outstanding > 0`. That includes its +1 extras.
- The lock text names the real blocker, for example "Locked: Marketing still owes 1 lead star (+1 from Ranch)".

**0.4 Turn engine** (server.ts, appended helpers).
- **New columns** (idempotent DDL in `db.server.ts`):
  - `draws.placed jsonb default '[]'`
  - `draws.negation jsonb default '{}'`
  - `draws.tokens_done boolean default false`
  - `answers.purpose text default 'table'`
- **`turnState(gameId, dept, round)`** returns the stage, one of `scenario → deal → negative → cards → tokens → done`. It also returns the head, the designated answerer, the draw and the rules (`playable`, `must`, `unresolved`, `maxPlays = min(playable, 2 + drawn)`, `left`, `cardsLeft`) and `tokenTargets`.
- **`advanceIfDone`** runs after every play or token. When the stage is `done`, the turn passes to the next department. After Accounting, the round ends with `endRound`. An alert is raised each time.
- **`finishTurn`** (new server function):
  - The GM can force the turn on at any stage.
  - The head can end the turn only at the `tokens` or `done` stage.
- **`placeToken`** (new server function):
  - Head only, stage `tokens` only.
  - It inserts a play `card_name 'Token'` with `card_text 'PLAY 1 [TOKEN] ON A PROJECT.'`.
  - One token per focus project per round. The project must have `outstanding[dept] > 0` and must not be pipeline-locked.
  - When no targets remain, `tokens_done` is set automatically.
- **`companyBoard`** now also returns:
  - `isHead`, `myHeadName`, `turn` (turnState for `turn_dept`)
  - `projectSlots` (need, filled, outstanding, reasons and a per-department lock text for every project)
  - `closeReady` (GM only: `projectId`, `n`, `totalCents`, `lines`)
  - `joinPath` (all seats)
  - `scenarioPurpose`, `scenarioNegative`, `gameNumber`
  - `pendingPlays`, now = **all plays**, with project_id, other_project_id, round_n, card_text and player_id.
- **UI components** live in `src/components/game/f30-panels.tsx`:
  - `useToast`, `HeadBadge`, `ScenarioPanel`, `CardCarousel`, `FocusPicker`, `TurnPanel`, `GmProjectTile`
  - `TokenSlots` in `slots.tsx` takes `projectId` + all plays and shows "X of Y" plus "Still needs: Production 1 (+1 from 1970s Bi-Level)".

---

## A. Blockers and money (Game 11 triage A1–A12): DO FIRST

### A1. Non-heads keep answering during the GM meeting, and those answers count (#120)
**Root cause:**
- `play.tsx` CompanyPanel only rendered the scenario step inside the meeting modal chain, gated by `myTurn && !board.answeredThisRound` behind `meetingDue`. Non-heads got no control.
- The PlaySeat card/feedback block was dead code (`card` was never set).
- `lockScenario` feedback was thrown away (`setStepCard(null)`).

**Required:**
- `ScenarioPanel` shows on **every non-GM seat at all times**, before, during and after the meeting.
- `lockScenario` stores every answer and counts it in payroll.
- The server decides `purpose` with `scenarioRole()`:
  - `turn`: the designated answerer on that department's turn, before the right answer is earned.
  - `negate`: the head with an unresolved negative in their hand.
  - `table`: everything else, which still counts for payroll.
- It returns `purpose` and `negation`.

**Check:**
- After the GM calls the meeting, a non-head Marketing player enters a scenario number and answers.
- The answer appears in the log and payroll moves.
- Spanish shows the same flow.

### A2. Links never sign out; one GM identity (#29 #61 #65 #67)
**Root cause:**
- `session.ts readSeat()` with no id returns null for the GM.
- `scoreboard.tsx`, `financials.tsx` and `log.tsx` called `readSeat()` with no `?seat=`, and links on play, numbers, scoreboard and financials omitted `search={{ seat }}`.
- So the GM landed on `/soebld/join` ("Use your game link").
- The join form offered "General Manager", and `registerSeat` allowed a second GM.

**Required:**
- Add `readLastSeat()`, which includes the GM, and `readPageSeat()`, which reads `?seat=` and then falls back to the last saved seat.
- Numbers, projects, financials, scoreboard, log and insights use `readPageSeat()`.
- Every `<Link>` to numbers, projects, financials, scoreboard, log and play carries `search={{ seat: seat.id }}`.
- `/soebld/play` with no `?seat=` uses `readLastSeat()`.
- `/soebld` and `/soebld/join` show "Back to your seat (dept) · Volver a tu asiento" when a seat is saved.
- `registerSeat` refuses a second GM with: "This game already has a GM. Open your GM link (or the host desk) to get back into the same GM seat."
- The join form hides the GM option once the game has a GM (`gameJoinStatus.hasGm`).

**Check:**
- Signed in as the GM, open Numbers, Value Scoreboard, Business Financials and the Answer log, then go back. The GM stays signed in as the same identity every time.
- A second "General Manager" registration is refused.

### A3. Card plays are instant; GM fixes are inline and non-blocking (#40 #54 #64 #66 #68 #84 #95 #99 #115)
**Root cause:**
- `server.ts placeCard` inserted `status 'pending'`, so the GM had to run `confirmPlay`.
- The pipeline counted only confirmed plays, which deadlocked Appointment Center (#66).
- `confirmPlay` decremented stored `plus_ones`, mixing two models.
- The GM board had Pending and Confirmed lists plus an "Undo an action" list. The feed and the alerts weren't refreshed after a removal (#84).

**Required:**
- `placeCard` inserts `'confirmed'` right away. It enforces:
  - the department's turn, a draw, resolved negatives, and the card in the playable hand and not yet placed;
  - must-play negatives first;
  - focus (ignored for negatives) and the pipeline;
  - an `otherProjectId` for move cards (optional for splits).
- It runs the Kim star and then `advanceIfDone`.
- `confirmPlay` becomes a legacy no-op.
- Remove the GM Pending and Confirmed lists and the "Undo an action" list.
- Each `GmProjectTile` shows this round's plays (with a "show all" toggle). Each play has one-tap chips:
  - **Undo**: `undoAction` deletes the play and puts the card back in that department's hand (removes it from `draws.placed` and resets `tokens_done`).
  - **Move**: to another open project.
  - **Remove**.
- Each chip action shows an 8-second toast. Undo also appears in the toast after a player's play.

**Check:**
- Marketing plays Basic Lead. P1 shows the star at once with no GM step.
- The GM taps Undo on the tile. The card is back in Marketing's hand and the tile count drops.
- Appointment Center is never stuck waiting on a confirm.

### A4. Meeting modal: heads only, once per meeting, Close returns to the flow (#21 #27 #41 #56 #87 #96 #122)
**Root cause:**
- `meetingDue = board.meeting && board.meetingAck < board.currentRound` applied to every seat.
- `modalDismissed` was local state, so the modal came back on reload.
- Close only dismissed the modal, which stranded the player.

**Required:**
- The modal shows only when `!isGm && board.meeting && board.isHead && board.meetingAck < board.currentRound`.
- Both "Got it" and Close call `ackMeeting`, which saves the acknowledgment server-side.
- No popup chain before scenarios.

**Check:**
- Only the round's heads see the modal.
- After a reload it does not come back.
- After closing it, the player sees their normal board.

### A5. Close a full project in one tap with a payout summary (#102 #108 #110 #111)
**Root cause:**
- The only close path was "Mark project finished" in More tools, driven by a dropdown.
- The GM's "ready to close" check counted confirmed plays ≥ 5.
- `finishProject` didn't set `finish_order`.

**Required:**
- `companyBoard.closeReady` lists every open project where `filledSlots(...).ready` is true.
- Each entry comes from `closePreview()`, which simulates completion with `computeNumbers`. Its lines are:
  - `Base (P#) $X`
  - `House … +$X`
  - `Customer … +$X` (always shown, even at $0)
  - optional `Garcia referral +$X`
  - optional `Cards ±$X`
- The tile shows a green button "Close P# ($total)" (Spanish "Cerrar P#") with the lines underneath.
- `finishProject`:
  - checks `outstanding`;
  - sets `finish_order` = the number of completed projects + 1;
  - returns the payout.
- The old dropdown stays in More tools as "Force-finish project (override)".

**Check:**
- Fill the Bi-Level (6 slots). The tile shows "Close P1 ($13,000)" with Base $10,000, House +$3,000 and Customer +$0.
- After one tap, Numbers shows $13,000 revenue for P1.

### A6. House and customer extra slots and bonuses match the printed cards (#116 #117)
**Root cause:**
- Slug storage broke every regex in `board.ts plusOnes/houseBonus/customerCash`. Only Craftsman, Split-Level and slug-safe customers fired.
- `filledSlots` counted every play, including negatives and Crew Swap, as a filled token.
- `slotNeed` was hard-coded to 1 each, and the total to 5.
- Garcia had no cap. Rivera never matched. Kim's star existed only in the GM `playAction` path, and the $3k rule was applied too. Lee paid only on completion. Stanley fired one round early.

**Required:** sections 0.1 and 0.2, everywhere: the tiles, `TokenSlots`, the projects page `effectLine`, the pipeline, close-ready and Numbers. The Kim star is placed by `kimStar()` when the Kim project receives its star, whatever path the star came from.

**Check:**
- Bi-Level needs 6 (Production 2) and pays +$3,000.
- Ranch needs 6 (Marketing 2).
- Crew Swap does not fill a slot.
- Garcia: a later finish adds +$2,000 on that later project.
- Kim pays $0 cash.

### A7. Action cards only after the head's department gets a right answer (#8 #23)
**Root cause:**
- `dealCards` checked only that the player was a head. There was no right-answer check.
- A hard-coded test line forced the same Accounting hand every round.
- The board-level Deal button showed whenever `atMeeting && !draw`.

**Required:**
- `dealCards` requires the head, the department's turn (`turn_dept`), and an earned right `turn` answer this round.
- It is idempotent, deals randomly (the hack is removed), and writes a ledger entry.
- The Deal button shows only inside `TurnPanel` at stage `deal`.

**Check:**
- Before the meeting, the deal is refused.
- After a wrong turn answer, the deal is refused.
- After a right one, 3 random cards are dealt.

### A8. Strict pipeline with real blocker text (#82 #86 #92)
**Root cause:** `placeCard` and `focusFor` only required the previous department to have ≥ 1 confirmed play, and the lock text "Locked until {prior} plays on it" never named a +1.

**Required:** section 0.3, applied in `placeCard`, `placeToken`, `focusFor`, `tokenTargets` and the UI lock text.

**Check:** on the Ranch (Marketing needs 2), after 1 star, Appointment Center shows "Locked: Marketing still owes 1 lead star (+1 from Ranch…)".

### A9. One sign rule and labeled cost lines on Numbers (#71 #105 #109 #112 #113)
**Root cause:**
- `numbers.ts departments.cents` was the raw sum of payroll_cents (positive = saved), rendered as `money(cents)` and highlighted as "added X this round".
- Profit = revenue − payroll − fixed − other, but the main card showed only Revenue, Payroll and Profit.
- `otherCents` (negative GM event cash such as Material Spike or Warranty Claim) appeared only as unlabeled "Variable Costs". The $2,000 in Game 11 was a GM event.

**Required:**
- `computeNumbers` returns:
  - `departmentLines` ({dept, savedCents, costCents, netCents, right, wrong});
  - `costLines` ({label like "Material Spike (GM event, round 2)", cents, round}).
- The Numbers main card is a ledger:
  - Revenue (green);
  - − Payroll, − Fixed cost (n depts × $2,000 a round from round 3), and − each cost line, all in red;
  - = Profit;
  - the equation in small print.
- Department rows show "saved $X" in green and "cost $X" in red, labeled "this game".
- Financials and the Value Scoreboard use the same `SignedLine` rule. The scoreboard's Company Net profit = `profitCents` and lists the fixed cost and the cost lines.
- `loadNumbers` counts all plays (there are no pending plays anymore).

**Check:** play a Material Spike in round 2. Numbers shows "− Material Spike (GM event, round 2) −$2,000", and Revenue − all the lines = Profit exactly.

### A10. Finished or ready projects drop out of focus (#107)
**Root cause:** the focus modal listed every `status === "open"` project, and the server's `setFocus` didn't validate.

**Required:**
- `setFocus` (GM or that department's head) rejects completed or close-ready projects.
- It requires min(2, number of eligible open projects).
- `FocusPicker` lists only eligible projects.

**Check:** after closing P1, P1 is not offered for focus, and the server refuses it.

### A11. "Department Head this round" badge, and the head answers first (#119)
**Root cause:** there was no head label, only the `board.atMeeting` text.

**Required:**
- `HeadBadge` on each seat:
  - for the head: "Department Head this round";
  - for everyone else: "Head this round: {name}".
- The round-robin designated answerer starts with the head (`turnState.designatedName`).

**Check:** in round 1, the first-registered player in each department sees the badge.

### A12. The Deal button no longer bypasses the scenario (#121)
**Root cause:** the board Deal button skipped the scenario, and `answeredThisRound` counted any answer.

**Required:** covered by A7 and section 0.4. Only a right `turn` answer earns the deal.

**Check:** the same as A7.

---

## B. Flow rebuild (Game 11 triage B): after A passes

### B1. Scenario number entry; Principle first; readable feedback (#24 #32 #93 #124 #125 #126)
- `ScenarioPanel` takes a 2-digit number and calls `findScenario`. A digital "draw" fallback is kept.
- The pop-up order, top to bottom:
  1. the **Principle of Excellence** box;
  2. code + title;
  3. scenario text;
  4. A/B/C buttons;
  5. Lock.
- The feedback (right/wrong, payroll effect and the explanation) **stays until "Done"**.
- The text matches the purpose, for example "Right: your department earned its 3 action cards" or "Right: the negative is cancelled".
- A wrong or repeated number gives a clear message.

**Check:** enter 01. The Principle appears above the scenario. After locking, the feedback stays on screen until Done.

### B2. Tokens are their own step after cards (#77 #83 #90)
- Stage `tokens` comes after cards (section 0.4).
- A department whose hand is all negated or all negative still reaches the token step and plays its eligible tokens.
- The head taps "Place token on P#" for each target, then "Done with tokens". It finishes automatically when no targets remain.

**Check:** with only negatives in hand, the head still places a token on each eligible focus project.

### B3. Negative-card rule; negatives in red (#49 #57 #85)
- After the deal, every negative is unresolved, so the stage is `negative`. The head answers another scenario (`purpose = negate`).
  - **Wrong:** the negative is marked `must`. It plays first, ignores focus and obeys the pipeline.
  - **Right:** the negative is `negated` and a replacement card is dealt. If the replacement is negative, it is `void` and does not play.
- Negatives have a red border and a "Negative" label in the hand and the carousel.

**Check:** a deal with Bad Review: a right answer cancels it and deals a new card; a wrong answer forces it to be played.

### B4. Three-card carousel (#37 #43 #123)
- Tapping the hand opens `CardCarousel`:
  - one card at a time, enlarged, with readable text (the image alt is the name + the card text);
  - tap a card to pick it, with an "n of 2 picked" count;
  - tap outside to close.
- Must-play and already-placed cards are locked.

**Check:** the carousel opens, picks are capped at `left`, and a tap outside closes it.

### B5. Per-department focus with a GM override; the modal no longer closes on department pick (#48 #48b #51)
- Each department head sets its own 2 focus projects in `TurnPanel` (`FocusPicker`).
- The GM's "Focus projects" modal has department chips plus `FocusPicker`, with no dropdown that closes the modal. It shows the focus of all departments.
- **Ruling needed:** a single GM "company priority" is not built. The GM override is per department.

**Check:** the GM picks Sales, chooses 2 projects and saves. The modal stays open, and the summary updates.

### B6. Turns auto-advance; "Start AC turn" removed; no stale headers (#100 #101)
- `advanceIfDone` passes the turn automatically.
- The GM's "Force: move on from {dept}" button calls `finishTurn` as the GM.
- "Go back to {previous}" stays in More GM tools.
- The static "Start {next} turn" button is removed.
- The headers read the live `turnDept` and `turn.stage`, plus "Waiting on: {name} to …".

**Check:** Marketing finishes and the turn moves to Appointment Center with no GM tap. After Accounting, the round number goes up.

### B7. GM copy-join-link and join page fixes (#1 #2 #3 #31 #53)
- "Copy join link" (origin + `joinPath`) on the GM board and in every seat's More tab, with a toast.
- The join page:
  - shows "Loading the game…" (not "Game closed") while loading;
  - shows "Game {n} · {event name}";
  - the seat select defaults to "Choose your seat", and the server requires a real seat.

**Check:** tapping Copy join link puts a URL on the clipboard. Opening it shows "Game N · …" with no "Game closed" flash.

### B8. Company name in the header only (#9 #63 #72 #103)
- `PlaySeat` shows the company name under the department/round line.
- The "Our company" card and the `CompanyBanner` are removed from the board.
- The Numbers page drops the duplicate banner.
- The name suggestion/vote cards show only until a name is set.

**Check:** once the name is set, it appears exactly once, in the header.

---

## C. Safe polish (no flow change)

- **C1** (#5, #59): the duplicate bottom link row on the play page is removed. The bottom nav and the More tab hold the links.
- **C2** (#11): the join seat default is "Choose your seat" (covered in B7).
- **C3** (#106): the payroll list reads "Round payroll N: base $16,000 …", with Spanish "Nómina de la ronda".
- **C4** (#69, #73): the sticky GM pending bar is gone (removed with A3). The GM board order is:
  1. round/turn line;
  2. Call meeting / Force;
  3. Focus;
  4. Copy link;
  5. focus summary;
  6. project tiles;
  7. More GM tools.
- **C5** (#97): card images carry name + text alt text.

**Not done (needs Johnny or is out of scope):**
- accounts with passwords (#30)
- a focus vote for all players (#14)
- speed (#22)
- the full visual refresh

---

## Acceptance run (fresh game on preview; never the live game)
1. Join: no "Game closed" flash; "Game N · event"; seat placeholder; a second GM is refused.
2. GM: copy the join link; open Numbers, Scoreboard and Financials and come back still signed in.
3. Round 1: a non-head answers before and during the meeting, and both count. Only heads see the meeting modal, once.
4. Marketing turn:
   - a wrong head answer moves the turn to the next player (round-robin);
   - a right answer → Deal (3 random cards);
   - a negative → an extra scenario;
   - carousel → play 2 → tokens step → auto-advance.
5. The GM taps Undo on a tile, and the card returns to the hand. Move/Remove work, with a toast.
6. Bi-Level shows 6 slots, Production 2. Fill it, see "Close P1 ($13,000)", tap it, and Numbers matches.
7. A later finish gives Garcia +$2,000. Kim gives $0 cash plus one star on another project.
8. A GM Material Spike shows as its own red line, and Revenue − the lines = Profit.
9. A finished project is gone from focus. Each department sets its own focus, and the GM overrides.
10. After Accounting, the round ends. Spanish works on every new screen. The stamp reads `build 0214-f30`.
