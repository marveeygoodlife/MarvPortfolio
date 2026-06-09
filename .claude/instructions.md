---
name: Project Agent Instructions
description: Use when: working on code for MarvPortfolio - concise commits, thorough reviews, tested code
type: agent-instructions
---

# Code Review & Quality Standards

## Commit Messages
- Write **concise, focused** commits following existing repo style
- Match the style of recent commits (see git log for pattern)
- One clear idea per commit, brief message
- No unnecessary "noise" commits

## Code Review Process
Before marking work complete:
- **Comprehensive review**: Check for quality issues, edge cases, potential bugs
- **Testing**: Don't rely solely on type checking — verify the feature actually works
- **Test UI changes**: For frontend work, start dev server and test in browser (golden path + edge cases)
- **Avoid assumptions**: Type-correct code can still be functionally broken

## Testing
- **Functional verification required**: If you can test it, test it
- **Don't skip manual testing** for UI/feature work
- **Type checking ≠ correctness**: Types pass but logic may be wrong
