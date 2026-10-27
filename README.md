# Ziki Cockpit — Human-Agent Interaction Prototype

> **HNG 15 Stage 2 Task 1: Human-Agent Interaction Prototype**  
> **Author:** Abuchi Collins Nwajagu (`cmvbh8e7h00lumg5p2lrxvw70` / GitHub: [@Collinsthegreat](https://github.com/Collinsthegreat))  
> **Live Prototype:** [https://collinsthegreat.github.io/ziki-cockpit/](https://collinsthegreat.github.io/ziki-cockpit/)

---

## 1. Executive Summary

This prototype provides an interactive, side-by-side comparison between **Today's Ziki Dashboard** and a **New Operator-First Interaction Flow**:

- **Today's Ziki (`#before`):** Faithful reproduction of the live Ziki interface based on verified screenshots. Treats the human as a manual ticket worker through 4 stat cards, a 7-column issue list, agents relegated below the fold, and decisions buried across 4 separate Inbox tabs (`Need your input: 0`, `Design feedback needed: 0`, `New ideas: 2`, `Drafted ideas: 46`).
- **New Operator Flow (`#after` / `/`):** Evaluated by the **2-Second Decision Speed Test**. Answers *"does anything need me right now?"* instantly by surfacing **ONE decision card at a time** (<8-word headline, asking agent, consequence if ignored, verification diff, and 2 distinct action buttons). Lower-priority ideas are pre-ranked by agents into the queue (`+45 ranked by agents`). All decisions include an immediate **10-second undo window**. When cleared, the operator is greeted by a calm empty state: *"Nothing needs you."*

---

## 2. Design Tokens & Visual Fidelity

The implementation strictly honors Ziki's authentic light UI extracted directly from production CSS bundles:

| Token | CSS Variable | Hex / Value | Purpose |
| :--- | :--- | :--- | :--- |
| **Page Background** | `--zk-bg` | `#f5f7fc` | Pale blue-grey neutral page background |
| **Surface Card** | `--zk-surface` | `#ffffff` | High-contrast white card tiles |
| **Text Primary** | `--zk-text` | `#15121f` | Main high-density text |
| **Text Secondary** | `--zk-text2` | `#3e4a63` | Subtitles, table secondary data |
| **Text Muted** | `--zk-muted` | `#5f6577` | Timestamps, metadata, hints |
| **Primary Blue** | `--zk-accent` | `#1f5fd9` | Primary action buttons, brand icon |
| **Electric Blue** | `--zk-electric-blue` | `#3978f6` | Points card active border, focus rings, notification badge |
| **Card Glow** | `--shadow-points-glow` | `0 0 14px rgba(57,120,246,0.18)` | Active Points card glow |
| **Warning Chip** | `--zk-warn-bg` | `#fdf3d7` / `#7a4e00` | Medium priority & warning pill |
| **Success Chip** | `--zk-ok-bg` | `#e3f6ec` / `#146c43` | Resolved, pass, and idle green dot |
| **Danger Chip** | `--zk-bad-bg` | `#fde8e4` / `#a3261a` | High priority & rollback alerts |
| **Info Chip** | `--zk-info-bg` | `#e7f0ff` / `#1d4fb8` | In Progress pill |

---

## 3. Human-Agent Boundary Matrix

| Boundary Level | Agent Alone | Human Operator Decides | Escalates to Human |
| :--- | :--- | :--- | :--- |
| **Triage & Classification** | Auto-triages issues, duplicates, and verifies repro steps | Selects product priorities and approves new feature ideas | Ambiguous bug reports or conflicting requirements |
| **Implementation** | Writes tests, implements code changes on dev branches | Reviews architecture changes and approves PR merges to staging/prod | CI failures, merge conflicts, or regressions |
| **Deployment & Rollback** | Auto-merges low-risk routine changes (Auto-Merge) | Sets auto-merge rules and budgetary approval thresholds | Production/Staging build failure with 1-click rollback card |

---

## 4. Keyboard Shortcuts

- **`1`**: Switch to Today's Ziki (`#before`)
- **`2`**: Switch to New Operator Flow (`#after`)
- **`Enter` or `A`**: Approve / Merge current decision card
- **`Esc` or `D`**: Decline / Defer current decision card
- **`U` or `Z`**: Undo previous decision within 10-second window

---

## 5. Development & Deployment

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Compile production bundle
npm run build
```
