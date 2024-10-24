# Task Management Coding Challenge

Welcome to our coding challenge! This is a Task Management application built with Next.js, TypeScript, and Tailwind CSS. The application allows users to create, view, and manage tasks with priorities and due dates.

## Getting Started

1. Fork this repository
2. Clone your forked repository
3. Install dependencies:
```bash
npm install
```
4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```
5. Run the development server:
```bash
npm run dev
```

## The Challenge

This application has a few issues and missing features that we'd like you to address:

### Part 1: Bug Fix
There's a bug in the task creation process: When creating a task with a due date, the date is not being stored correctly, causing tasks to appear in the wrong order on the dashboard. Find and fix this issue.

### Part 2: New Feature
Add the ability to categorize tasks with labels/tags. This should include:
- Creating and managing labels
- Assigning labels to tasks
- Filtering tasks by labels
- Displaying labels on task cards

## Requirements

- Write clean, maintainable code
- Follow SOLID principles where applicable
- Include tests for your new features
- Use TypeScript effectively
- Make meaningful git commits
- Document your changes

## Bonus Points

- Add additional features that you think would be valuable
- Improve the UI/UX
- Add comprehensive test coverage
- Implement performance optimizations
- Add proper error handling
- Implement proper form validation

## Evaluation Criteria

We'll be looking at:
- Code quality and organization
- Problem-solving approach
- Git commit history
- Test coverage
- Documentation
- UI/UX considerations
- Performance considerations

## Submission

1. Push your changes to your forked repository
2. Create a Pull Request to the original repository
3. Include a description of your changes and any decisions you made

Good luck!