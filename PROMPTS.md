# PROMPTS.md - TICK
**Student:** Alan Asman Adanan· **Course:** MGMT 6110 · **Problem Set 1**

**User sentence:** A postgraduate student opens this screen to see the most urgent academic task for the week, and knows it worked when the top-prioritised task shows its deadline, estimated effort, task type, and a clear next action.

**Live link:** https://mgmt-6110-problem-set-1.vercel.app/ 

---

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
