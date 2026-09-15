# prompts.md: TICK
**Student:** Alan Asman Adanan · **Course:** MGMT 6110 · **Problem Sets 1 & 2**
**User sentence:** A postgraduate student opens this screen to see the most urgent academic task for the week, and knows it worked when the top-prioritised task shows its deadline, estimated effort, task type, and a clear next action.
**Live product:** https://mgmt-6110-problem-set-1.vercel.app/
**Health endpoint:** https://mgmt-6110-problem-set-1.vercel.app/api/health
**Repository:** https://github.com/Priest-MBAI/MGMT6110_Problem_Set_1

---

# PROBLEM SET 2: putting a real back end behind it

## P2.0 · Naming what the product could not do

Before prompting, I wrote the panel-1 sentence three times and classified each claim.

| # | Claim on screen | Currently | Would have to come from | Type |
|---|---|---|---|---|
| 1 | "This is your most urgent task" | `incompleteTasks[0]` (the first row of `tasks.ts`, no sort) | A ranking rule I define and own | **B** (calculation) |
| 2 | Deadline, weightage, submission guidelines, classroom | Invented at my request | SMU's LMS and timetabling systems | **A**, but unsourceable |
| 3 | Student name, number, programme | A placeholder I asked for | An authenticated student account | **C** (out of scope) |
| New | Whether the student will reach their next class in time | None | LTA DataMall BusArrival | **A** (sourceable) |

My first draft of claim 3 said the classroom location would come from LTA's API. It would not: LTA knows buses, not seminar rooms. Both the classroom and the deadline belong to the school, and neither is published. The claim I could actually source was a new one: not *where* the next class is, but *whether I will get there*.

---

## P2.1 · Getting a real response before writing any code

The step the brief said not to skip, and the one that took longest. Five attempts, four distinct failures.

### Attempt 1: HTTP 401, empty body
```
HTTP/2 401
content-type: text/plain
content-length: 0
```
**Cause:** I had removed the trailing `==` from the AccountKey, on the understanding that it was not needed. It is base64 padding and part of the value. The key is 22 characters; 22 + `==` = 24, which is exactly a 16-byte base64 string.

**How I found out:** I ran the same call twice, once with the padding and once without, instead of arguing about it. The arithmetic confirmed it afterwards.

**Note kept for later:** a 401 with an empty body is indistinguishable from an unset variable, because JavaScript sends a missing value as the string `undefined`. That's why `keyConfigured` is a deliverable, and it mattered again eighteen hours later.

### Attempt 2: HTTP 403, HTML body
```
HTTP/2 403
content-type: text/html
<H1>Access Denied</H1> … errors.edgesuite.net …
```
**Cause:** I had dropped `?BusStopCode=` from the URL. The refusal came from Akamai, the CDN in front of DataMall. The request never reached LTA's service.

**What I took from it:** the body was HTML, not JSON. Had my function made this call and run `.json()` on it, it would have thrown and returned my own 500, hiding the real cause. This is why `response.ok` is checked before the body is read.

### Attempt 3: HTTP 200, empty `Services` (Tue 15 Sep, 00:56 SGT)
```json
{"odata.metadata":"…","BusStopCode":"04151","Services":[]}
```
**Cause:** none. Buses were not running. This is the overnight empty case, observed live rather than contrived, because I happened to be debugging at one in the morning.

**Documentation disagreement:** the LTA API User Guide v6.9, page 14, states that outside operating hours *"there will be no response returned on the API (not even the attribute tags)."* The actual response contained the attribute tags and an empty array. The guide and the service disagree.

**Consequence for my code:** had I coded defensively against the documented behaviour (treating an absent response as empty), my empty state would never have fired, because the response is not absent. The function has to treat `Services: []` as empty. That instruction went into the prompt.

### Attempt 4: HTTP 404
```
URL: …/ltaodataservice/v3/BusArrival/v3/BusArrival?BusStopCode=04151
```
**Cause:** `v3/BusArrival` appeared twice. A paste had landed inside the existing line instead of replacing it. Nothing reached LTA; my credential was never considered.

### Attempt 5: HTTP 200, populated (Tue 15 Sep, 12:21 SGT)
`content-length: 4434`, five services returned. Field names matched the guide exactly.

**Validation step:** piped through `python3 -m json.tool` before use. An earlier terminal copy had silently truncated mid-string and I had not noticed; `json.tool` parses as well as prettifies, so malformed input fails loudly instead of becoming a broken CONTEXT block.

---

## P2.2 · What the real responses taught me that the documentation did not

**`Services` is not sorted by arrival time.** In the 12:21 response:

| Position in array | Service | Next arrival |
|---|---|---|
| 1 | 130 | 12:35:00 |
| 2 | 133 | 12:29:57 |
| 3 | 145 | 12:32:22 |
| 4 | 197 | 12:33:52 |
| 5 | **851** | **12:26:18** ← actually next |

Ordered by service number. Rendering `Services[0]` would have told a student the next bus was nine minutes later than it was, and late in the direction that makes them miss the class.

This is the same shape as the bug I documented in my PS1 reflection: `incompleteTasks[0]`, a headline claim resolved by array position rather than by a rule. I caught it this time because I had been caught by it before, and because I read the response instead of the summary.

**Types are inconsistent, and the inconsistency means something other than what it looks like.** `Monitored` is a number; `Latitude`, `Longitude`, `EstimatedArrival` and everything else are strings. I initially wondered whether the string coordinates meant the positions were hard-coded rather than live. They are not: service 145 returned three different positions for three different buses along the route. The API descends from OData/XML, where every value is text; `Monitored` is newer (added in v3, August 2024) and shipped as a proper number. **The type tells you the field's age, not the data's freshness.**

**`Monitored` is the actual freshness signal.** `1` = the arrival time is estimated from the bus's real position; `0` = it comes from the schedule, with `Latitude: "0.0"` as the sentinel. Both states appeared in a single response.

**A trap I noted and avoided:** `"0.0"` is a non-empty string and therefore truthy in JavaScript, so `if (bus.Latitude)` passes even when there is no position. The simplest defence was to not return coordinates from `api/arrivals.js` at all.

**Non-numeric service numbers.** The 19:2x response contained `851e` and `960e`, express variants. Anything parsing `ServiceNo` as a number would break on them. I put this in the prompt as a note, because the single sample response I pasted did not contain one.

---

## P2.3 · The master prompt

R·G·O·G·C, with a much longer Guardrails block than Problem Set 1. Sent once, with a real 200 response in the CONTEXT block.

```
ROLE: You are a senior full-stack developer working in my existing project. Do not
rewrite what is already there; add to it.

GOAL: My Next Class Details card currently shows only hard-coded classroom and
lesson information. Do NOT change or replace that information — the school owns it
and I have no source for it. ADD a new live travel strip beneath it, showing the
next buses arriving at bus stop 04151, so the student can tell whether they will
make their next class.
 1) api/arrivals.js — calls
    https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=04151
    with a header named AccountKey, and returns ONLY: service number, minutes until
    the next bus, and minutes until the one after. Nothing else.
    Sort services by EstimatedArrival ascending before returning them. The upstream
    orders by service number, not by soonest arrival — do not rely on array order.
    Convert EstimatedArrival from its timestamp string into whole minutes from now
    at the moment the data arrives. Treat an empty EstimatedArrival as "no bus",
    not as zero and not as an invalid date.
 2) api/health.js — reports keyConfigured (whether the environment variable
    LTA_ACCOUNT_KEY is present and non-empty) and whether the upstream answered,
    including the HTTP status it returned. It must never print the credential or
    any part of it, including its length or first characters.
 3) On the screen, render the live value and use these four sentences exactly as
    written, one per case:
      loading:     "Checking arrivals at Stamford Road bus stop"
      empty:       "No buses to LKCSB at this hour — first service is around 05:45"
      refused:     "We're unable to reach LTA's arrivals right now. Class details are unaffected."
      unreachable: "Check your connection as we can't reach the arrivals service. Your class details below are still accurate."
    Four different sentences, not one spinner. Do not write your own wording.

OUTPUT: Both functions at api/ in the PROJECT ROOT, siblings of package.json, never
 inside src/. This project has no server entry file — confirm that back to me rather
 than inventing one.
 package.json already contains "type": "module"; leave it alone.
 BEFORE the fetch, if LTA_ACCOUNT_KEY is missing or empty, return 503 with a message
 naming the variable, and do not call the upstream at all. A missing variable is sent
 as the word "undefined" and looks exactly like a wrong credential, so stop it early.
 AFTER the fetch, check response.ok before reading the body. A refusal often has an
 empty body, so calling .json() on it throws and my function dies with a 500 instead
 of telling me what happened. On a non-2xx reply, return the upstream status and a
 one-line reason in your own JSON — never a bare 500.
 If the upstream answers 200 but the Services array is empty, that is the EMPTY case,
 not an error. Distinguish it from a failure in what you return.
 Cache with Cache-Control: s-maxage=20, stale-while-revalidate=40.
 In the footer, display this attribution verbatim:
 "Contains information from LTA DataMall accessed on 15 September 2026 from
  https://datamall.lta.gov.sg, which is made available under the terms of the
  Singapore Open Data Licence version 1.0"

GUARDRAILS: Never write the credential into any file, comment or README. Never create
 a variable whose name starts with VITE_. Never call the upstream from browser code;
 every call happens inside api/. Never print the credential, or any part of it, in a
 response or a log. No new npm packages. No database, no login.
 Leave every screen I already have working exactly as it is.
 Do not modify src/data/tasks.ts, App.tsx's task ordering, or any screen other than
 the Next Class Details card.

CONTEXT: React + Vite + Tailwind, deployed on Vercel from GitHub. The credential lives
 only in a Vercel environment variable named LTA_ACCOUNT_KEY, type Secret.
 A real response from the endpoint, called by hand just now, looks like this:

{
    "odata.metadata": "https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival",
    "BusStopCode": "04151",
    "Services": [
        {
            "ServiceNo": "130",
            "Operator": "SBST",
            "NextBus": {
                "OriginCode": "03239",
                "DestinationCode": "54009",
                "EstimatedArrival": "2026-09-15T19:34:52+08:00",
                "Monitored": 1,
                "Latitude": "1.2780648333333333",
                "Longitude": "103.84829983333333",
                "VisitNumber": "1",
                "Load": "SEA",
                "Feature": "WAB",
                "Type": "SD"
            },
            "NextBus2": {
                "OriginCode": "03239",
                "DestinationCode": "54009",
                "EstimatedArrival": "2026-09-15T19:47:29+08:00",
                "Monitored": 0,
                "Latitude": "0.0",
                "Longitude": "0.0",
                "VisitNumber": "1",
                "Load": "SEA",
                "Feature": "WAB",
                "Type": "DD"
            },
            "NextBus3": {
                "OriginCode": "03239",
                "DestinationCode": "54009",
                "EstimatedArrival": "2026-09-15T20:02:29+08:00",
                "Monitored": 0,
                "Latitude": "0.0",
                "Longitude": "0.0",
                "VisitNumber": "1",
                "Load": "SEA",
                "Feature": "WAB",
                "Type": "SD"
            }
        }
    ]
}

Note on this response: ServiceNo is not always numeric (express variants appear as
"851e", "960e") — do not parse it as a number. Monitored is a number (1 = arrival
time estimated from the bus's actual position, 0 = taken from the schedule);
every other field is a string. When Monitored is 0 the coordinates are the string
"0.0", which is truthy in JavaScript — do not use them as a presence check.
```

**What came back:** two serverless functions at `api/` in the project root, a travel strip added beneath the Next Class Details card, the four state sentences used verbatim, the footer attribution, and a confirmation that the project has no server entry file rather than an invented one.


### Guardrails I added that were not in the template, and why

| Guardrail | Where it came from |
|---|---|
| `Do not modify src/data/tasks.ts, App.tsx's task ordering, or any screen other than the Next Class Details card` | PS1 shipped dependencies and a capability I never asked for. A general "leave everything working" instruction can be satisfied by an agent that refactors freely. Naming files removes the room. |
| `Sort services by EstimatedArrival ascending — do not rely on array order` | The 12:21 response, where the soonest bus sat fifth. |
| `Treat an empty EstimatedArrival as "no bus", not as zero and not as an invalid date` | The `851e` / `960e` entries with empty-string fields. |
| `If the upstream answers 200 but Services is empty, that is the EMPTY case, not an error` | The 00:56 response, and the guide's contradiction of it. |
| `Return the upstream status and a one-line reason in your own JSON — never a bare 500` | The 403's HTML body: parsing a non-JSON error would have thrown and hidden the real status. |
| Notes on `ServiceNo` not being numeric, `Monitored` being the only number, and `"0.0"` being truthy | Observed across responses the agent would never see, since only one sample was pasted. |

---

## P2.4 · Where I stopped prompting and did it by hand

Three places.

**Setting the Vercel environment variable.** Done in the dashboard. Learned in PS1 that conversation is slower than the settings page for this.

**Removing the PS1 leftovers.** `@google/genai`, `express` and `@types/express` from `package.json`; `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` from `metadata.json`. Three lines and a JSON array; a prompt would have been slower and less precise. AI Studio logged it as *"I made some changes."*

**Fixing the trailing comma.** Removing `@types/express` left a dangling comma before the closing brace, which is invalid JSON. `npm install` would have failed with `EJSONPARSE` and the Vercel build would have died before it started. Caught by reading the diff, not by deploying and reading logs.

---

## P2.5 · Deployment, and the 401 that took forty minutes

Push succeeded. `/api/health` on the live URL returned:

```json
{"keyConfigured":true,"upstreamAnswered":true,"upstreamStatus":401}
```

Meanwhile the identical key returned `HTTP/2 200` from my terminal.

**What the health endpoint ruled out on its own.** `keyConfigured: true` means a non-empty value was reaching the function: the variable was not missing, and the environment scope was not the problem. If scope had been wrong, `process.env.LTA_ACCOUNT_KEY` would have been undefined and `keyConfigured` would have read `false`. A value was present and LTA was refusing it. That narrowed the search to the value itself before I touched anything.

**The cause.** The same cause as Sunday night: the `==` padding had been stripped. I had entered the key into Vercel before I understood that, and the wrong value sat there for a day while my terminal used the right one.

**What I got wrong in the middle.** I changed four things before it worked: re-entered the key, redeployed, redeployed without build cache, and deleted and re-added a secret in AI Studio. Then I had a working product and no idea which change had fixed it. I then deleted the AI Studio secret again and confirmed the deployment still returned 200, which proves AI Studio's secrets play no part in the Vercel runtime. Combined with the `keyConfigured: true` reading, the remaining explanation is the key value.

**Final state:**
```json
{"keyConfigured":true,"upstreamAnswered":true,"upstreamStatus":200}
```

---

## P2.6 · Things I was told that turned out to be wrong

More than one source was wrong this week, and none of them were wrong in a way that announced itself.

| Source | What it said | What was true | How I found out |
|---|---|---|---|
| LTA API User Guide v6.9, p14 | No response at all outside operating hours | Attribute tags present, `Services` empty | Called the endpoint at 00:56 |
| Advice I accepted | The trailing `==` was not needed | It is base64 padding and part of the key | Ran the call twice, with and without |
| Claude | LTA does not publish live train arrivals | It does (GTFS Realtime Trip Updates, §2.33), but only during disruptions, as protobuf, behind a 15-minute expiring link | Read the user guide instead of accepting the claim |
| My own inference | String latitude/longitude meant the positions were hard-coded | They are live; the strings are an OData/XML inheritance | Asked instead of acting; compared three buses on one route |
| The agent's summary | "Bus stop 04151 (Stamford Road / LKCSB)" | It inferred the road name from my own loading sentence, not from any source | Read the summary against what I had actually supplied |

---

## P2.7 · Sourcing decisions made and rejected

**Rejected: LTA train data.** LTA does publish real-time train arrival predictions (GTFS Realtime Train Trip Updates, §2.33 of the user guide), but only *during service disruptions*, delivered as a Protocol Buffer behind a link that expires in 15 minutes, at an "ad hoc" update frequency. Reading it would have meant a new dependency and a second failure surface, for a strip that says nothing on a normal day. The plain-JSON Train Service Alerts API (§2.11) is the saner version and still disruption-only.

**Chosen: one bus stop of seven.**

**Cache length: `s-maxage=20, stale-while-revalidate=40`.** LTA's documented Bus Arrival update frequency is 20 seconds (§2.1). A longer cache would serve data the source has already replaced. Worth noting that what is cached is not raw data but a *computed relative time*: "3 min" is calculated at fetch time and does not tick down while cached. At 20 seconds that is invisible; at 300 it would be actively wrong.

---

## P2.8 · Credential handling

- Variable named `LTA_ACCOUNT_KEY`, never `VITE_`-prefixed. A `VITE_`-prefixed variable is compiled into the bundle every visitor downloads. Verified with `grep -rn "VITE_" . --exclude-dir=node_modules`.
- Stored in Vercel as type Secret; redeployed after saving, because a saved variable does not reach a build that already happened.
- `.gitignore` contains `.env*`. Repository history searched for the key; not present in any commit.
- The call happens only inside `api/`. The page talks to my own address and nowhere else.

**A lapse, on the record.** While debugging I pasted the full AccountKey into a chat transcript twice. It is the one mistake with consequences outside the classroom and it is worth stating rather than omitting.

---

## P2.9 · What was provisioned without my asking, in two places

PS1's `metadata.json` declared `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`, which I never requested and only found while writing the PS1 reflection. Removing it this week, I found what it had caused:

- **AI Studio**, Secrets panel: a `GEMINI_API_KEY` provisioned against my account, value "AI Studio Free Tier".
- **Vercel**, Environment Variables: `GEMINI_API_KEY` and `APP_URL`, added 8 September when I first connected the project.

Nothing consumed either of them. No code in the project ever imported `@google/genai`. But the SDK was in `package.json`, so any future prompt producing code that used it would have run on my quota with no moment where anyone asked me. The gap between provisioned and used is one `import` statement.

The same unrequested capability propagated credentials into two separate platforms. My PS1 reflection had recommended *"before anything deploys, one person reads the dependency and capability files, not the code."* I wrote that as a recommendation a week ago; this week I ran it on my own repository and it found exactly what it was written to find.

---

---

---
---

# PROBLEM SET 1 (preserved)

*The Problem Set 1 prompt log follows below, unchanged, so that both problem sets sit in one history.*

## Prompt 1 - The master prompt
```
ROLE: You are a senior front-end developer building a React web app.

GOAL: Build the front end of TICK, a web product for Postgraduate students studying in a local university,
      with over 900+ students in a specialised school. Their job on this product is to complete the
      academic task that appears on the screen.
      Screens:
      1) Show the prioritised task clearly labelled at the top with deadline, estimated work needed,
      course code, classroom location and the type of task (eg.assignment, group project, exam, etc)
      the student needs to complete.
      2) A concise action steps of the task with a bit more detail. Include next action, such as
      “Submit financial 10-K report of company of choice,” plus a short three-step checklist and
      an estimated time it needs. Include a working “Tick complete” button. When pressed, update
      its status to Complete and return or refresh the screen view so that another incomplete task
      will be the next one to appear on the screen.  

OUTPUT: A running app. Keep every invented value in ONE data file of its own, with at least [N] rows,
        so the screen looks real. One component per screen or section. Move between screens without
        reloading the page. Readable on a phone at arm's length. When you are done, list the files
        you created and what each one holds.

GUARDRAILS: Screens and invented data only. Do NOT call the Gemini API or any other model.
            Do NOT call any outside service or fetch from any URL. No database,no login, no user accounts,
            no analytics. No features I did not list. No real company's name, logo, or trademark. 
            Invented names and numbers only, nothing confidential.

CONTEXT:  Individual Problem Set 1 for MGMT 6110 Human-AI Collaboration at SMU. Built in Google AI Studio,
          shared as a link, and opened on a phone by classmates in Week 3. I am not a programmer: when you
          make a choice I did not specify, say so in one line rather than burying it.
```
**What came back:** A running app, 9 files, preview loaded a clickable two-screen prototype that showed 
                    a prioritised academic task and a checklist-based action screen. But the first screen 
                    included redundant and duplicated course-code, submission time  and classroom-location sections.   

**What I changed next and why:** I input the changes using the annotate tool to the affected sections with task-completion tips and next-class details, 
                                because those give the student more useful context for completing the task.

---

## Prompt 2 - Initial annotation attempt
```
Apply the edits shown in the screenshot.
	- Replaced Course Code Box with Tips instead
	- Replaced the plain classroom location box with "Next Class Details" instead
```
**What came back:** AI Studio returned an unexpected error and did not create or update the application.

**What I changed next and why:** Nothing. I retried by annotating the same request as before on the preview panel again.

---

## Prompt 3 - First successful content update
```
Apply the edits shown in the screenshot.
	- Replaced Course Code Box with Tips instead
	- Replaced the plain classroom location box with "Next Class Details" instead
```
**What came back:** The tips and next-class-details sections were applied, and the deadline section now includes submission details 
                    including the time, which is quite prominent on the task header.

**What I changed next and why:** I next improved the header identity and replaced repeated deadline information because the screen 
                                needed a student identity and more useful task-completion context.
                                
---

## Prompt 4 - Fix mobile header overlap
```
Apply the edits shown in the screenshot.  
	- Increased the size of the TICK logo badge with a distinctive
	- Added the student's name, student number, and Master's programme directly into the top header section:
	- Replaced Repeated Deadline with Submission Guidelines & Score Weightage
```
**What came back:** The task was cancelled accidentally before AI Studio produced an updated interface.

**What I changed next and why:** I resubmitted the annotations on the header and content section because there was no completed result 
                                to evaluate.

---

## Prompt 5 - Cancelled annotation attempt
```
Apply the edits shown in the screenshot.   
	- Increased the size of the TICK logo badge with a distinctive
	- Added the student's name, student number, and Master's programme directly into the top header section
	- Replaced Repeated Deadline with Submission Guidelines & Score Weightage
```
**What came back:** The TICK logo became larger and more distinctive, fictional student details were added to the header, and the repeated 
                    deadline section was replaced with submission guidelines and score weightage.

**What I changed next and why:** I refined the formatting of student and next-class information because these details needed to be clearer, 
                                easier for users to scan, and less abbreviated on a phone.

---

## Prompt 6 - Refine app look
```
Apply the edits shown in the screenshot 
	- Format information displayed cleanly 
	- Comprehensive Next Lesson & Class Details instead of abbreviations 
	- Harmonize the disjointed clash of bright yellow, purple, and indigo boxes
```
**What came back:** Student details were separated into labelled lines, next-class information was expanded with the full lesson, date, time, 
                    and location, and the cards were restyled in a consistent slate-and-emerald palette. I also tested the buttons and
                    found that the task can be completed without ticking all the checklist.

**What I changed next and why:** I revised the colours and task-completion feedback because the palette felt too gloomy for an academic tool 
                                  and the checklist needed a valid completion flow.

---

## Prompt 7 - Improve clarity
```
Rework the color palette to be look "fresh" and brighter color suitable for an educational/academic use.
Unless it's on dark mode / accessibility features, the Slate & Emerald look too depressing. 
	- Icons, Tick/Check marks, warning/error messages can use their distinct color,
    (eg. lightbulb yellow, Tick (check) is in green instead of black) 
	- can animate "tick" mark (eg. turn from yellow to green enlarged pop out) once the 3-step checklist
    are ticked. This will signal the user to click on the button to mark the task complete.
	- all the checklist box have to be ticked/mark to be able to click on the task complete button.
    Earlier i was able to complete the task without checking off any.
```
**What came back:** The app adopted a brighter academic palette, added semantic icon colours, animated the tick when all checklist items 
                    were done, and disabled “Tick Complete” until all three steps were checked.

**What I changed next and why:** I clarified the “PG Queue” label and strengthened the TICK logo because an unexplained abbreviation could 
                                confuse first-time users and the app name needed greater prominence.

---

## Prompt 8 - Clarify branding
```
What does PG Queue means or represents? Can the App name be more prominent and avoid black.
Make it look like it's part of the app or combine it with the "Tick" to make it an app logo. 

```
**What came back:** “PG Queue” was expanded to “Postgraduate Task Queue,” and the TICK name and checkmark were combined into a more 
                    prominent emerald-to-teal logo lockup.

**What I changed next and why:** I tested the interface in mobile portrait view and fixed the long-text wrapping and badge visibility because 
                                  critical information must remain readable on narrow phone screens.
                                  
---

## Prompt 9 - Mobile polish
```
All looks good EXCEPT the mobile version on portrait view:
    - Pending task section on top is cut off
    - Core module name is cut off off due to length.
Other than ensure all the elements are within view, perhaps add some gradient layering or something to make
the app look more dynamic and not so flat.
```
**What came back:** The mobile header was restructured to keep the pending-task visible, long course and programme names could wrap without clipping, 
                    and subtle gradient layers added visual depth to all platform views.

**What I changed next and why:** Nothing further; I completed a final check that the prioritised task, completion guidance, next-class details, 
                                and action-checklist path remained clear and mobile-readable.

---
