# assessment.md — TICK
**Student:** Alan Asman Adanan · **Course:** MGMT 6110 · **Problem Set 2**
**Live product:** https://mgmt-6110-problem-set-1.vercel.app/
**Health endpoint:** https://mgmt-6110-problem-set-1.vercel.app/api/health
**Repository:** https://github.com/Priest-MBAI/MGMT6110_Problem_Set_1

---

## Criteria for a good front end — panel 6

### F1 — The prioritised task is the one the ranking rule actually selects
**Why it matters to my user:** The main function of my app is to tell the user the most urgent task at hand. That is the most important thing they need to do that day. If the main function is not accurate, it could cost them their marks, or in a bad case their standing in the programme.

**In TICK:** The rule has to be stated so it can be checked — soonest deadline first, ties broken by higher weightage, then by larger estimated effort. Anyone can read the ten tasks in the queue, apply that rule by hand, and see whether the task shown at the top is the one it selects.

**How anybody can test it:** Open the product, read the queue, apply the stated rule, compare against the task displayed. No knowledge of my data or my code required.

---

### F2 — Every claim on screen says whether it is sourced or sample
**Why it matters to my user:** The reliability of the information matters because when someone opens this app, they trust that what is there is what they need at that moment. If the information is inaccurate, or false, that trust is gone — and I lose that person as a user of anything I build afterwards.

**In TICK:** Three kinds of claim sit on the same screen with the same authority. The bus arrivals are live from LTA. The deadlines, weightages and submission guidelines are sample data, because SMU publishes none of them. The prioritisation is a rule I own. A student cannot currently tell these apart, and the fix is to label them rather than to pretend.

**How anybody can test it:** Point at any number on the screen. A stranger should be able to say, without asking me, whether it came from a real source or is sample data.

---

### F3 — A first-time user can name their next action and its deadline without instruction
**Why it matters to my user:** The user has to be able to see what they need: where to go, what to do, and by when. Time is what matters most to a postgraduate student. If the app does not have the right functions, there is no point in having the app.

**In TICK:** The whole value is removing the ranking step, not adding a screen to learn. If a student has to work out how the app is organised before it helps them, they will go back to their own calendar and notes.

**How anybody can test it:** Hand your phone to a classmate who has never seen it. Four seconds, no explanation. Ask what they would have to do next and by when. If they can answer, it is met.

*(I have deliberately left "the look" out of this criterion. Whether a screen looks good is not something anyone can fail, so it is an opinion rather than a criterion. What remains is the half that can be tested.)*

---

### F4 — Every supporting element on the screen earns its place against the task
**Why it matters to my user:** Accessibility to related information matters because the user may want to know more than the task itself, and sometimes they do not know something is useful until they see it. But if that information is not related to the task, people read it as an advertisement or as clutter.

**In TICK:** The next class details, the travel strip and the three-step checklist are all supporting elements. Each one has to help the student either complete the task or reach the class on time. Anything that does neither is noise on a screen someone opens under deadline pressure.

**How anybody can test it:** Point at each element and say in one sentence what it helps the student do. If an element has no such sentence, it fails.

---

### F5 — An accidental action can be undone
**Why it matters to my user:** People make accidental taps. If a mistake cannot be undone, the user feels regret and frustration out of proportion to what happened, because they did not mean to do it and nothing was really at stake.

**In TICK:** "Tick Complete" is one tap on a phone and it removes the task from the queue. There is currently no way to bring a single task back — the only route is the reset button on the all-completed screen, which restores all ten.

**How anybody can test it:** Tick a task complete on purpose, then try to get that one task back.

---

## Criteria for a good back end — panel 6

### B1 — Someone who is not me can tell whether the service is up
**Why it matters to my user:** If a file or function in the back end cannot say what it is for, or whether it is doing its job, that breaks trust — and the same is true for the service itself. A user needs to be able to tell whether the app is working, and so do I.

**In TICK:** `/api/health` reports three things: whether the credential is configured, whether LTA answered, and the HTTP status it returned. It proved its worth on submission day — it reported `keyConfigured: true` with `upstreamStatus: 401`, which told me immediately that the credential was present and being refused rather than missing, and ruled out an entire class of explanation before I touched anything.

**How anybody can test it:** Open `/api/health`. It answers, it says whether the credential is configured, and it reveals nothing else about the credential — not its length, not its first characters.

---

### B2 — The back end contains only what the product needs
**Why it matters to my user:** If the back end has too many files and dependencies, it says something about the care taken over it. It also makes it harder for me to change anything, because there is more to refer to before I can touch one thing.

**In TICK:** Problem Set 1 shipped `@google/genai`, `express`, and a `metadata.json` declaring a server-side Gemini capability — none of which I asked for and none of which the app used. That declaration had caused a Gemini credential to be provisioned against my account in two separate places: AI Studio's Secrets panel and Vercel's environment variables. Nothing consumed either of them, but the SDK was sitting in `package.json`, so any future prompt producing code that used it would have run on my quota without anyone asking me. All three are now removed.

**How anybody can test it:** Read `package.json` and `metadata.json` — thirty seconds, no code required — and check every entry against what the app actually imports. `grep -rn "@google/genai\|express" src api` returns nothing.

---

### B3 — Someone who is not me can run this
**Why it matters to my user:** When I look at someone else's repository, the first thing I look for is whether I can understand it. If it is a wall of text and nothing is structured, I lose interest — because if the documentation was not worth care, I do not expect the back end or the front end to have had any either.

**In TICK:** A classmate cloning this repository should be able to see what credential it needs without asking me. `.env.example` is the file that does that job.

**How anybody can test it:** Read `.env.example`. It should name `LTA_ACCOUNT_KEY` and contain no real value.

---

### B4 — A failure produces a sentence the student can act on
**Why it matters to my user:** If there is a mistake or an error and the app gives no sign that it knows, it looks like nobody is paying attention — and a user becomes sceptical about whether it will ever be trustworthy. Saying plainly that something is wrong, or that a figure is sample data, is what keeps the product honest when it cannot do its job.

**In TICK:** There are four different situations and four different sentences, decided before I prompted rather than accepted from the agent. Loading: "Checking arrivals at Stamford Road bus stop." Empty: "No buses to LKCSB at this hour — first service is around 05:45." Refused: "We're unable to reach LTA's arrivals right now. Class details are unaffected." Unreachable: "Check your connection as we can't reach the arrivals service. Your class details below are still accurate." A spinner would have told the student nothing about which of the four they were in, and three of the four are situations they can act on.

**How anybody can test it:** Break the credential and the refused sentence appears. Open the product after midnight, when Singapore bus services stop, and the empty sentence appears. Throttle the connection and the loading sentence appears.

---

## Marking myself against them — panel 6

*Met, partly met or not met, with the evidence in a sentence.*

| Criterion | Verdict | Evidence |
|---|---|---|
| **F1** — prioritised task matches the rule | **Not met** | `App.tsx` selects `incompleteTasks[0]` — the first row of the data file. There is no sort by deadline, weightage or effort. I found this while writing my Problem Set 1 reflection and carried it into Problem Set 2 unfixed. |
| **F2** — claims say sourced or sample | Partly met | The bus strip is genuinely sourced and credited to LTA in the footer. The deadlines, weightages and submission guidelines are still displayed without any marking that they are sample data. |
| **F3** — next action readable without instruction | Met | Opened on my own phone in portrait: the prioritised task, its deadline and the next action are all visible without scrolling or instruction. |
| **F4** — every element earns its place | Met | Each element on the card has a stated job: the checklist breaks down the task, the next class details say where to be, and the travel strip says whether the student will get there. |
| **F5** — accidental action can be undone | **Not met** | `handleTickComplete` sets a task to Complete with no per-task reversal. The only route back is the reset button on the all-completed screen, which restores all ten tasks at once. |
| **B1** — someone else can tell if the service is up | Met | `/api/health` returned `{"keyConfigured":true,"upstreamAnswered":true,"upstreamStatus":401}` when the credential was wrong and `…"upstreamStatus":200}` once it was fixed. It reveals nothing about the credential itself. |
| **B2** — only what the product needs | Partly met | `@google/genai`, `express`, `@types/express` and the Gemini capability declaration are removed. `dotenv` and `import 'dotenv/config'` remain, doing nothing on Vercel where environment variables are injected directly. I identified this and chose not to change `package.json` again an hour before submission. |
| **B3** — someone else can run this | **Not met** | `.env.example` still documents `GEMINI_API_KEY` and `APP_URL` and never mentions `LTA_ACCOUNT_KEY`. Anyone cloning the repository has no way to know what credential the app needs. |
| **B4** — failure produces an actionable sentence | Met | Four distinct sentences implemented and used verbatim. I observed the refused case in production (health endpoint reporting 401) and the empty case live at 00:56 SGT on 15 September, when LTA returned `{"BusStopCode":"04151","Services":[]}`. |

### Supporting evidence

**A third party fetched my live endpoint and received correct, sorted, minimal data.** From `https://mgmt-6110-problem-set-1.vercel.app/api/arrivals`, 15 September 2026:

```json
[{"serviceNumber":"197","nextBusMinutes":2,"followingBusMinutes":13},
 {"serviceNumber":"960e","nextBusMinutes":3,"followingBusMinutes":null},
 {"serviceNumber":"133","nextBusMinutes":3,"followingBusMinutes":15},
 {"serviceNumber":"851","nextBusMinutes":6,"followingBusMinutes":19},
 {"serviceNumber":"960","nextBusMinutes":6,"followingBusMinutes":18},
 {"serviceNumber":"130","nextBusMinutes":8,"followingBusMinutes":22},
 {"serviceNumber":"145","nextBusMinutes":9,"followingBusMinutes":15}]
```

Sorted by arrival, not by service number — the upstream returns them ordered by service number, and rendering `Services[0]` would have shown a bus nine minutes later than the real next one. Three fields only: no coordinates, no upstream metadata. `960e` returns `null` for its following bus, which is the empty `EstimatedArrival` handled as *no bus* rather than as zero or an invalid date, and also demonstrates that a non-numeric service number survives the pipeline.

**The credential is absent from the repository**, including its history, and no variable name begins `VITE_`. Verifiable by anyone: `grep -rn "VITE_" . --exclude-dir=node_modules` returns nothing.

---

## Peer review — panel 7

Both my live URL and repository URL are posted to the Week 3 thread on eLearn. I have not yet commented on classmates' products — I ran out of time before the deadline — and will do so over the next few days, running the checks this panel describes: opening each product on a phone first, saying what I thought it was for before reading anything, opening `/api/health` before the front end, and coming back at midnight to see whether the screen says something sensible when the feeds go empty.

---

## Assessing the collaboration — panel 8 (the six questions)

>
> "The first party is you, and what you contributed was command. You decided what the product is for and whose problem it solves. You decided which service to trust with the claim your screen makes, what that screen should say at one in the morning when there is no bus running, how long an answer stays fresh before it is worth fetching again, and, every time something came back from the agent, whether it was good enough to keep."
>
> "The second party is the agent, and what it contributed was production. It wrote the codebase… It did that out of the loop, in the plain sense that you did not type those lines yourself and in most cases did not read every one of them before they went live."
>
> **"The boundary moves on its own, and that is the thing to watch for."** — "Nobody in this class decided to hand a product decision to an agent. What happens instead is that a decision arrives already made, dressed as a technical detail, and you accept it because it looks like code rather than like a choice… If you asked for a working screen and the agent gave you a spinner, then the agent decided what your user sees when the provider is down, and that is a decision about your product instead of about your code."
>
> **Format:** full sentences, specific moments from your own weekend, a page and a half is plenty.

---

### Q1 — Where did the agent make you faster, and by how much?

> Name a specific task from this weekend where the agent did in minutes something that would have taken you an hour or a day, and say what you did with the time you got back. Then be precise about what kind of task it was, because the pattern matters more than the instance: was it writing something you could have written but slowly, or something you could not have written at all?
>
> If the answer for some part of the build is that it was faster to do it yourself, say that too.

The agent wrote the whole of the back end in a couple of minutes — two serverless functions, the parsing, the sorting, the caching header, and the wiring into a screen I had not touched since Problem Set 1. This was not something I could have written slowly; I have never written a serverless function and could not have written these at all.

What I did with the time was not rest. I went through the generated files line by line, read the LTA API user guide properly, checked that no credential appeared anywhere in the code, and worked through whether each function actually did what I had asked. The agent moved the work from writing to checking, and the checking took far longer than the writing would have looked like it should.

---

### Q2 — Where did it cost you time, and whose fault was that?

> Every one of you lost time somewhere this weekend. Find the worst instance and take it apart. Did the agent misunderstand you, or did you ask for something you had not decided yet? Was the information it used out of date, or did it invent a field name you never checked? Distinguish between the agent being wrong and your instruction being unfinished, because those two have different remedies and only one of them is about the tool.
>
> The most common answer here, and the most useful one, is a prompt you sent before you had decided what you wanted.

The worst loss was not the agent. It was me, at a terminal, trying to get a valid response out of LTA. Four separate failures across two days: a 401 because I had removed the trailing `==` from the AccountKey, a 403 because I had dropped `?BusStopCode=` from the URL, a 404 because a paste had duplicated `v3/BusArrival` in the path, and a second 401 in production because the wrong value had been sitting in Vercel since before I understood the padding.

None of those were the agent misunderstanding me and none were its information being out of date. They were my own mechanical errors — spacing, a bad paste, a value I had entered before I knew what was wrong with it. The remedy for that is not a better prompt; it is reading the status line before forming a theory, which is what the `-i` flag and the health endpoint were for.

---

### Q3 — Did it ever hand you something that looked right and was not?

> This is the failure the lecture prepared you for. A model rewarded for producing answers people liked will produce answers you like, and liking an answer is not the same as checking it. Find the moment in your own log where you accepted something because it read well, and say how you eventually found out. If you never found out and only discovered it while writing this, say that, because it is the most valuable observation in the whole submission.
>
> Look particularly at field names, at numbers, and at anything the agent told you about a service instead of about your code.

I want to say I checked everything, and I did check a lot. But the honest answer is that I accepted two things because of where they came from rather than because I had tested them.

The first was the trailing `==` on the AccountKey. I was told it was not needed, it sounded reasonable, and I removed it. That produced an empty-bodied 401 that cost me Sunday night, and then cost me a second time a day later because the stripped value was still sitting in Vercel. I only resolved it by running the same call twice, once with the padding and once without, instead of continuing to reason about it.

The second is older and worse. In Problem Set 1 my product's headline claim — "this is your most urgent task" — was resolved by `incompleteTasks[0]`, the first row of the data file, with no sort by deadline, weightage or effort. It looked correct because the model happened to put the right task first. I did not find that while building. I found it while writing the Problem Set 1 reflection, after the product had been live and shown to people. It is still not fixed, and I have marked it not met.

I also nearly made a third mistake of the same kind this week, by inferring that string latitude and longitude meant the positions were hard-coded rather than live. I asked instead of acting, and they turned out to be live — the strings are an inheritance from the API's XML origins. The type tells you how old a field is, not how fresh the data is.

---

### Q4 — What did you have to know in order to supervise it?

> You could not have caught the mistake in Q3 without knowing something. Name what that something was. Then turn the question around and ask what you would have had to know in order to catch the mistake you did not catch. This is the practical version of the question the whole course is built on, and your answer is a description of the judgement that stays yours.
>
> Be concrete. "I knew a bus arrival time cannot be a negative number" is an answer. "Domain expertise remains important" is not.

What let me catch the production 401 in three seconds was knowing that `keyConfigured: true` and an `upstreamStatus: 401` can only co-occur one way. If the variable had been missing or scoped to the wrong environment, `process.env.LTA_ACCOUNT_KEY` would have been undefined and `keyConfigured` would have read false. It read true, which meant a value was present and being refused — so the fault was in the value, not in the plumbing. My own health endpoint narrowed its own diagnosis before I touched anything.

The other pieces were similarly specific. That `==` is base64 padding, so a 22-character key plus two padding characters is a 16-byte value and stripping them sends a different key. That `"0.0"` is a non-empty string and therefore truthy, so an obvious presence check passes for a bus with no position. That "most urgent" has to mean something, and a line of code containing no comparison cannot be computing it.

The habit underneath all of them was checking claims against the primary source rather than against a summary. I did that with the LTA user guide when I was told the service did not publish live train arrivals — it does, §2.33, but only during disruptions. I did it again when a scaffold written for this very file turned out to have silently dropped half of the brief's guidance. Both times the derived version read as complete, which is exactly what makes it dangerous.

What would I have needed to know to catch what I missed? Enough to read a configuration file critically. Forty lines of Vite dev middleware were added to `vite.config.ts` that I did not ask for; I found them by reading a diff after the fact, not at the time.

---

### Q5 — Which decisions did you keep, and should you have kept more or fewer?

> Go through your log and mark every decision that was actually yours: what the product is for, which service to call, what the screen says when the data is empty, how long to cache, what to do about the claim you could not source. That list is your side of the boundary, written out in the order it happened. Then ask the harder question. Is there a decision on that list you should have handed over, because it was production work you were slowing down by holding on to it, and is there one that never reached the list at all because the agent settled it before you knew there was anything to settle?
>
> The four sentences from step 4, for loading, empty, refused and unreachable, are a good test case. Did you decide those, or did you accept what appeared?

The decisions that were mine, in the order they happened: which claims to source, which to label as sample, and which to drop; buses over weather, because weather needs no credential and my health endpoint would have had nothing to report on; buses over trains, because LTA's train feed only populates during disruptions and arrives as a Protocol Buffer behind an expiring link; one bus stop out of seven near the school, which is also an assumption about which direction my cohort travels from; a cache of 20 seconds, matching LTA's documented update frequency; the four sentences a student reads when the data is loading, empty, refused or unreachable; returning the upstream status in my own JSON rather than a bare 500; the guardrail naming `tasks.ts` and `App.tsx` explicitly; and deploying before cleaning up, so that a failed build could not cost me a working product.

The four sentences are the test case, and I did decide them. I wrote them before prompting and instructed the agent to use them verbatim. My first drafts were labels — "Tracking", "No Estimation Available" — and I rewrote them as sentences that tell a student what to do, because a label is only a quieter spinner.

But the boundary moved in places I did not notice. The agent added forty lines of dev middleware to `vite.config.ts` — I had told it to confirm there was no server entry file rather than invent one, and it did confirm, and then solved the same problem a different way I had not authorised. It decided that services with no upcoming bus sort to the end. It decided that a bus already past is shown as "0 min" rather than "due". And in its summary it described bus stop 04151 as "Stamford Road / LKCSB" — a location it inferred from the wording of my own loading sentence, not from any source. That last one is the clearest example: I wrote a piece of interface copy and the agent turned it into a claim about where a bus stop is.

Should I have handed more over? Probably the choice of which of the seven stops to use could have been settled faster with a lookup than with my own reading of a map. Should I have kept more? Yes — the arrival display. "0 min" is a product decision about what a student reads when a bus has just gone, and I never made it.

---

### Q6 — Now scale it up: what does this mean for a team of thirty?

> You have run this collaboration alone, on something small, with nothing much at stake beyond a grade. Take what you learned and say what would change if thirty people were working this way on a product your organisation depended on, each of them holding a boundary of their own and none of them able to see anybody else's. Where would you put a review step, and at which point in the week? What would you refuse to let an agent settle, and how would anybody know if it had been settled anyway? What would you have to be able to check that nobody in your organisation currently checks?
>
> Answer as somebody who might have to write that policy, because within a few years several of you will. One paragraph, and make it something you would actually sign your name to.

The review step I would put in is the one I designed after Problem Set 1 and only tested this week: before anything deploys, one person reads the dependency and capability files, not the code. My PS1 build shipped `@google/genai`, `express`, and a `metadata.json` declaring a server-side Gemini capability, none of which I had asked for. When I removed that declaration this week I found what it had caused — a Gemini credential provisioned against my account in two separate platforms, AI Studio and Vercel, neither of them ever used and neither ever approved. Nothing consumed them, but the SDK was sitting in `package.json`, so the distance between provisioned and used was a single import statement. Across thirty people that is thirty manifests nobody is reading, and the check takes half a minute and no programming knowledge, because `package.json` and `metadata.json` are lists of claims about what a product can do. I would put that check at the point of deployment rather than at the end of the week, because a weekly review finds it after it has shipped. What I would refuse to let an agent settle is what a user sees when the product cannot do its job — that costs nothing while the service is up and is the whole of the product on the morning it is not. And the thing I would most want to be able to check is whether anyone can say why something started working. I produced the canonical bad status report myself tonight — I changed four things and the failure went away — and I only turned it into knowledge by removing one of them and confirming the product still worked. Thirty people each holding a boundary nobody else can see will generate that report constantly, and an organisation that cannot tell a fix from a coincidence is not actually in control of its own product.
