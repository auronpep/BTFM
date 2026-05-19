# Lessons

## 2026-05-19: Project-Specific AM Bypass

Pattern: I attempted AM status check-ins because the global project instructions mention AM, but the user later clarified that AM can be bypassed for this project.

Rule: For `C:\CDX`, do not run AM check-in commands unless the user explicitly asks for AM status tracking again.

Reinforcement: Review this file before running project automation in `C:\CDX`; if a local lesson conflicts with a global workflow habit, follow the local lesson and do not run the bypassed command.

Correction on 2026-05-19: I repeated the pattern by attempting an AM check-in at the start of Worker 9 despite this lesson. Before any future `C:\CDX` automation command, explicitly check whether it is an AM command; if yes, skip it unless the user asks for AM tracking in the current turn.
