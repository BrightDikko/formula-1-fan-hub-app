# Formula 1 - Fan Hub, w/ Flashback F1 Challenge

Relive the drama, rewrite the history, race your memory! 🏁

## Getting Started

### Prerequisites

- Node 18+
- npm / yarn / pnpm

### 1. Clone & Install

```bash
git clone https://github.com/your-org/flashback-f1.git
cd flashback-f1
npm install    # or yarn / pnpm
```

### 2. Environment Variables

Create `.env.local` in the project root:

```env
# .env.local
REACT_APP_PARSE_APP_ID=YOUR_APP_ID
REACT_APP_PARSE_JS_KEY=YOUR_JS_KEY
REACT_APP_PARSE_URL=https://parseapi.back4app.com
```

### 3. Run Locally

```bash
npm start        # CRA dev server
```

Open [http://localhost:3000](http://localhost:3000).

---

## Tech Stack

| Layer         | Tech                                                                 |
|---------------|----------------------------------------------------------------------|
| **Front-end** | React 18, React Router 6, Context API, Plain CSS (no CSS-in-JS)      |
| **Animation** | Canvas-Confetti, CSS key-frames, React Portals for modals            |
| **BaaS**      | Parse JS SDK & Back4App (`_User`, `GameScore`)                       |
| **Build**     | Create React App 5 (CRA) ← migrated code still uses `process.env.*`  |
| **Lint/Format** | ESLint (+ react-hooks), Prettier                                   |

---

---

## Features

| Category         | What’s implemented                                                                 |
|------------------|-----------------------------------------------------------------------------------|
| **Time-Warp Drop** | Random Grand Prix picked from 70+ seasons.                                       |
| **Question Types** | • Podium prediction (modal picker)<br>• Pole position<br>• Fastest lap<br>• Yes/No (safety car)<br>• Driver-vs-Driver · Team-vs-Team<br>• DNF multi-select<br>• Surprise Top-5 |
| **Gameplay**     | 30s timer / question, gorgeous progress stepper, confetti on reveal.              |
| **Scoring**      | Exact podium order = double points; see detailed breakdown page.                   |
| **Persistence**  | Scores saved to **`GameScore`** class on Back4App.<br>Profile fetches last 5 unique rounds + personal best. |
| **Auth**         | Email / password via `Parse.User`.                                                |
| **Profile**      | Accordion cards: Personal Info, Fan-Hub Stats (high score, last 5 scores, favourites). |
| **UX**           | Smooth route fade-in, keyboard friendly, responsive down to 320px.                |

---

## Demo

![f1-fan-hub-demo-1.png](public%2Fdemo%2Ff1-fan-hub-demo-1.png)

---

![f1-fan-hub-demo-2.png](public%2Fdemo%2Ff1-fan-hub-demo-2.png)

---

![f1-fan-hub-demo-3.png](public%2Fdemo%2Ff1-fan-hub-demo-3.png)

---

![f1-fan-hub-demo-4.png](public%2Fdemo%2Ff1-fan-hub-demo-4.png)

---

![f1-fan-hub-demo-5.png](public%2Fdemo%2Ff1-fan-hub-demo-5.png)

---

![f1-fan-hub-demo-6.png](public%2Fdemo%2Ff1-fan-hub-demo-6.png)

---

---

## Environment Variables

| Key                    | Description                |
|------------------------|---------------------------|
| REACT_APP_PARSE_APP_ID | Back4App App ID           |
| REACT_APP_PARSE_JS_KEY | Back4App JS Key           |
| REACT_APP_PARSE_URL    | Parse Server URL (default Back4App cloud) |

---

## Scoring Algorithm

- Implemented in [`src/utils/flashbackData.js`](src/utils/flashbackData.js).
- Each question type has a dedicated matcher.
- Podium prediction awards double points for exact 1-2-3 order.

---

## Acknowledgements

- FIA official results & historical data.
- Driver images © Formula One Group (fair-use for fan project).
- Confetti courtesy of canvas-confetti.
- Icons from Heroicons & Simple Icons.
