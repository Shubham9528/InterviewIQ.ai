# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Explanation:

### Technical End-to-End Architecture and Flow
Covering all APIs, database actions, browser APIs, and state changes:

### Step 1: Interview Setup & Configuration

#### A. Optional Resume Parsing
* **User action:** Selects a PDF resume file and clicks "Analyze Resume".
* **API Call:** `POST /api/interview/resume` (sent as `multipart/form-data`).
* **Backend & Database:**
  * JWT authentication middleware (`isAuth`) verifies the session cookie.
  * `Multer` middleware receives and buffers the PDF.
  * Backend extracts text from the PDF and sends it to the LLM (AI prompt).
  * LLM parses out: candidate role, experience level, extracted skills, and key projects.
* **Response:** JSON with `{ role, experience, projects, skills, resumeText }`.
* **Frontend State:** Form fields auto-populate with the extracted data.

#### B. Generating Questions & Starting Session
* **User action:** Clicks "Start Interview".
* **API Call:** `POST /api/interview/generate-questions`
* **Payload:** `{ role, experience, mode, resumeText, projects, skills }`
* **Backend & Database:**
  * Checks the user in MongoDB. Verifies they have at least 50 credits, then deducts 50 credits.
  * Prompts the LLM to generate 5 customized questions (progressing: Easy → Easy → Medium → Medium → Hard).
  * Creates a new `Interview` document in MongoDB containing the 5 questions with default empty scores, difficulties, and time limits (60s to 120s).
* **Response:** JSON with `{ interviewId, questions, creditsLeft, userName }`.
* **State Transition:**
  * Redux store updates user credits balance.
  * Parent component changes state from `step = 1` to `step = 2`.
  * The setup screen unmounts and the live interview screen mounts.

---

### Step 2: The Live AI Interview

#### A. Browser APIs Initialization
* **Web Speech Synthesis API:** Detects system voices (`speechSynthesis.getVoices()`) to determine whether a male or female AI avatar voice will be used, and sets the corresponding video avatar (`male-ai.mp4` / `female-ai.mp4`).
* **Web Speech Recognition API:** Initializes `webkitSpeechRecognition` to transcribe microphone audio into text continuously.

#### B. The Speech & Avatar Loop
* **AI Speaks:**
  * `speechSynthesis.speak()` is triggered.
  * Avatar video starts playing (`videoRef.play()`).
  * Microphone is muted so the AI doesn't transcribe its own voice.
  * Subtitle text appears below the avatar.
* **AI Finishes Speaking:**
  * Video pauses and resets to frame 0.
  * Microphone automatically turns on.
  * Question timer begins counting down (`setInterval` every 1 second).

#### C. Answering & Transcription
* As the candidate speaks, the browser's speech recognition emits transcript events that append words in real-time to the answer text box (candidate can also type or edit).

#### D. Submitting Answer
* **Trigger:** Candidate clicks "Submit Answer" OR the timer hits 0.
* **API Call:** `POST /api/interview/submit-answer`
* **Payload:** `{ interviewId, questionIndex, answer, timeTaken }`
* **Backend & Database:**
  * Fetches the `Interview` document from MongoDB by `interviewId`.
  * Sends the question and the candidate's answer to the LLM.
  * LLM returns scores for Confidence, Communication, Correctness, a question finalScore (each 0–10), plus short feedback.
  * Updates that specific question index inside MongoDB and saves the document.
* **Response:** JSON with `{ feedback }`.
* **Frontend Reaction:** The AI speaks the feedback out loud, and a "Next Question" button appears.

#### E. Completing the Interview
* When the 5th (last) question is completed, the frontend triggers the finish routine.
* **API Call:** `POST /api/interview/finish`
* **Payload:** `{ interviewId }`
* **Backend & Database:**
  * Retrieves the interview document from MongoDB.
  * Calculates mathematical averages for overall score, confidence, communication, and correctness across all 5 questions.
  * Sets interview status to "completed" in MongoDB.
* **Response:** JSON containing the overall final score, skill averages, and question-by-question breakdown.
* **State Transition:** Parent component changes state from `step = 2` to `step = 3`.

---

### Step 3: Analytics & Reporting

#### A. Viewing the Report
* **Immediate view:** Rendered directly using the finished data received from the finish API call.
* **Historical view (from History page):** Navigating to `/report/:id` triggers `GET /api/interview/report/:id`.
  * The backend verifies the user, fetches the interview from MongoDB, computes the averages, and returns the report JSON.

#### B. Dashboard Visuals & PDF
* **Visual Display:**
  * Circular score meter displays the overall score out of 10.
  * Progress bars show Confidence, Communication, and Correctness.
  * `Recharts` `AreaChart` renders the question-by-question performance trend line.
  * Breakdown cards show each question with its score and AI feedback.
* **PDF Generation:**
  * Handled purely client-side using `jsPDF` and `jspdf-autotable`.
  * Draws the score boxes, advice, and tabular breakdown directly into an A4 PDF for immediate download.

