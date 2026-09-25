# Orient — a smart developer onboarding assistant

**Built with IBM Bob 2.0 · lablab.ai hackathon · Team minahiru**

> Point Orient at an unfamiliar codebase and it produces a verified
> onboarding pack — the real setup steps, a map of the code, and a list of
> everywhere the documentation lies — so a new developer is productive in
> minutes instead of days.

## The problem

A developer inheriting an unfamiliar service loses days before their first
useful change — not to hard problems, but to archaeology:

- The README's setup steps don't work; required config is undocumented.
- The docs describe the system as designed, not as it is now.
- It's unclear which code is live and which is dead.
- Nobody has assembled what a newcomer actually needs to know.

None of this is intellectually hard. It's just slow, and it repeats for
every new hire.

## The solution

Orient uses IBM Bob to run a small pipeline of focused agents over a repo:

1. **Env archaeologist** — finds every environment variable the code
   actually reads, produces a complete `.env.example` and real `SETUP.md`.
2. **Doc reconciler** — compares the README against the code and lists every
   contradiction, with file:line evidence.
3. *(optional)* **Architecture mapper** — a Mermaid map of modules, the
   request flow, and dead code.

It then **proves the result**: a fresh Bob agent, with no prior context,
uses only the generated pack to set the app up and complete a starter task.

## This repository

```
sample-app/       A deliberately messy Node.js + Express service (the input)
.bob/skills/      The Bob skill definitions that drive Orient
onboarding-pack/  What Bob PRODUCES (empty until you run the tasks)
bob_sessions/     Required screenshots of Bob task summaries (evidence)
MANUAL-BASELINE.md  The "before" measurement
```

## How to run it

See `docs/Bob-Hackathon-Playbook.pdf` for the full walkthrough. In short:
open `sample-app/` in Bob IDE (hackathon account), load a skill from
`.bob/skills/`, and run the task prompts. Bob writes results into
`onboarding-pack/`.

## Impact

| Metric | Manual | With Orient |
| --- | --- | --- |
| Minutes to a running app | _fill in_ | _fill in_ |
| Wrong README claims caught | — | _fill in_ |
| Missing env vars found | — | _fill in_ |

*(Measured once, single developer. See `MANUAL-BASELINE.md`.)*

## Limitations

- Demonstrated on a small single-language sample; a large monorepo would
  need the pipeline run per package.
- The pack is only as current as the code at run time; it is a snapshot.
- Quality depends on the code being readable — an obfuscated codebase would
  degrade results.

## Built with

IBM Bob 2.0 (Agent mode, skills, subagents, document understanding). Bob task
session summaries are in `bob_sessions/`.
