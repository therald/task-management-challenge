.NET and React Developer Role
========
This react application is the frontend of a fullstack application that needs to use a .NET backend. You'll need to create a simple C# Web API that replaces the http calls made from the React app.  Rather than a database for this exercise, you can simply use local, in-memory data for storage. Complete means that both the React and Web API can be running locally and talking to each other (the React app making http requests to the Web API).

### Part 1: Create Web API and modify Reach App to send http requests to the Web API endpoints.
Currently this React App is fetching and creating data using its own Next.js API routes and sqlite storage with Prisma as the ORM.  You can now dispense with Prisma and swap out the Next.js API routes with your new .NET Web API routes.
- Refer to the `schema.prisma` file for an idea of what the data model looks like
- Initialize your in-memory list of Tasks with some dummy data

### Part 2: Handle Error Cases in the Web API
The Web API should handle the following error cases:
- If a task is not valid (e.g., missing required fields), return a 400 status code
- If an internal server error occurs, return a 500 status code


### Part 3: For the GET endpoint order by `dueDate`
The Web API should return tasks ordered by `dueDate` in ascending order. If a task does not have a `dueDate`, it should appear at the end of the list.

## Requirements

- Write clean, maintainable code
- Follow SOLID principles where applicable
- Adhere to RESTful principles
- Make meaningful git commits
- Document your changes

## Bonus Points

* Add suitable tests
* Add pagination support for the GET endpoint

## Evaluation Criteria

We'll be looking at:
- Code quality and organization
- Problem-solving approach
- Git commit history
- Test coverage
- Documentation
- Performance considerations

## Submission
**For updates to the React code:**
1. Push your changes to your forked repository
2. Create a Pull Request to the original repository
3. Include a description of your changes and any decisions you made

**For the new .NET repo:**
1. Create your own Github repo 
2. Make it public so we are able access it

Good luck!