# State-machine-lab 

A **visual, interactive DFA (Deterministic Finite Automaton) simulator** built with **React + TypeScript + SVG**.
<img width="905" height="537" alt="image" src="https://github.com/user-attachments/assets/1dbdb87c-481b-4698-aaf7-9129bb05436b" />


designed to:
- help beginners **understand Automata Theory visually**
- bridge the gap between **theory and implementation**
- simulate DFA execution **step by step**

> Built as a learning-first project for Automata Theory (TOC / FLAT).

---

## ✨ Features

- 📍 **Visual States** (circles)
- ➡️ **Directed Transitions** with arrowheads
- 🔁 **Curved arrows** for opposite-direction transitions
- 🎯 **Start state indicator**
- ✅ **Final (accepting) states** shown with double circles
- ☠️ **Dead / Trap state** handling
- 🟠 **Current state highlighting**
- 🔥 **Active transition highlighting** during execution
- ⌨️ **Step-by-step input processing**
- ❌ Automatic rejection via dead state

---

## 🧩 Automata Concepts Implemented

- Deterministic Finite Automaton (DFA)
- Start State
- Final (Accepting) State
- Dead / Trap State
- Transition Function δ(q, a)
- String Acceptance & Rejection
- One-symbol-at-a-time processing

---

## 🖼️ How It Works (High Level)

1. **States** are defined as data
2. **Transitions** are defined as rules (`from`, `to`, `label`)
3. The UI renders everything using `.map()` (data → visuals)
4. Input is processed **one character per step**
5. DFA moves state based on matching transition
6. If no transition exists → DFA enters **dead state**
7. Acceptance depends on final state at the end

---

##  Getting Started

### Clone the repo

```bash
git clone https://github.com/Sran012/state-machine-lab.git
cd state-machine-lab
```
### Install dependencies 
```bash
pnpm install
```

### Run 
```bash
pnpm run dev
```


**Built with 💖 by Sujal Rana**
