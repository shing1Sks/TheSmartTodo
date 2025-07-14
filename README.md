# 💻 Smart Tasks Frontend (React + Tailwind)

Frontend for the **Smart Tasks** AI-powered task manager. It lets users enter tasks via voice or text and shows a dynamic list of structured tasks.

---

## ⚙️ Tech Stack

- React + Vite
- Tailwind CSS
- Lucide Icons
- Web Speech API (for voice input)
- REST API to backend

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-repo/smart-tasks-frontend.git
cd smart-tasks-frontend
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

Runs on: `http://localhost:5173`

Make sure the backend is running at any other port or `http://localhost:5000` spicify in the env as VITE_API_URL=http://localhost:5000 or your backend url.

---

## 🧠 Features

- ✅ Natural language input
- ✅ AI-powered command parser
- ✅ Voice-to-text input (mic)
- ✅ Task list with heading, description, subtasks, reminders
- ✅ Works in Chrome (Web Speech API support)

---

## 🧩 Folder Structure

```
src/
├── App.tsx
├── components/
│   ├── TaskInput.tsx
│   └── TaskList.tsx
```

---

## 🧪 Example Prompts

- "Remind me to water the plants every Sunday at 6am"
- "Delete grocery shopping"
- "Update project planning to include code freeze on 25th"

---

## 🗣️ Voice Input

- Click the 🎤 icon to speak
- Input auto-fills when done
- You can submit the spoken prompt directly

---

## 📝 To-do Next

- [ ] Task status (complete/incomplete)
- [ ] Drag-and-drop reordering
- [ ] Reminder notifications
