# React Networking Lab

In this lab, you will build a simple page that will show all of the employees at a local veterinarian hospital by accessing an external API. Then, you will make it so that, by clicking a button, the pets each doctor sees at the hospital appear.

![Example of a completed application.](./assets/example.png)

---

## Lab Setup

### Getting started

1. Fork and clone this repository.

1. Navigate to the cloned repository's directory on your command line. Then, run the following command:

   ```
   npm install
   ```

   This will install the libraries needed to run the tests.

1. Open up the repository in VSCode. Follow the instructions below to complete the Lab.

### Tests

To run the tests, you can run the following command from the command line. You will need to be in the root directory of your local directory.

```
npm test
```

This will open the Cypress testing window, where you can click to run an individual suite of tests or all of the tests at once.

#### Testing Tips

Keep the following in mind for this lab as you run the tests.

1. While running your tests, you must have a server up and running in another terminal. This means you will have _both_ a terminal window running the actual React application _and_ a terminal window running the tests.

1. When creating a component, make sure to create and import it with the same name as the file name. For example, the component created and exported inside of the `NavBar.js` file should be `NavBar`. The tests look for these specific names.

1. While the `cypress-watch-and-reload` package has been installed in this project, sometimes the React application will take longer to reload than the tests. If you feel as though a test should be passing that isn't, try pressing the re-run button in the Cypress tests before asking for help.

## Instructions

Making use of the existing code, add the following features to the React application. Details about the API you will be accessing are included below.

- [ ] Instead of showing a hardcoded staff member, dynamically build a list of staff members by accessing the external API.
  - [ ] If the staff member has a `prefix`, like `"Dr."`, include it at the beginning of the name. (E.g. "Dr. Leah Ayers")
  - [ ] If the staff members has a `postfix`, like `"CVPM"`, include it at the end of the name with a comma. (E.g. "Susan Gallegos, CVPM")
- [ ] Upon clicking the "Show Pets" button, the name of the pets the staff members sees should be shown below the button.
  - You only need to include the names of the pets as a comma-separated list.

There are multiple ways to accomplish the above goals. The tests should be resilient enough to account for a few different ways.

You _should not_ change the overall component hierarchy in this application.

### Using the API

Your instructor will give you the URL for the API you will be accessing. There will be two endpoints you will need to hit.

#### `/api/employees`

Making a GET request to this path will return an array of employees. The response will look similar to the one below.

```js
[
  {
    id: "z7GIN_i",
    firstName: "Leah",
    lastName: "Ayers",
    prefix: "Dr.",
    postfix: "",
    title: "Medical Director",
  },
  // ...
];
```

#### `/api/pets`

Making a GET request to this path will return an array of pets. The response will look similar to the one below.

```js
[
  {
    id: "dGXf5O9",
    name: "Lady",
    kind: "Dog",
    breed: "Doberman Pinscher",
    employeeId: "z7GIN_i",
  },
  // ...
];
```

Each pet has an `employeeId` key which has an ID that matches an employee. This represents which staff member is overseeing the pet.

Additionally, you can specifically look for pets with an ID that matches an employee. For example, take a look at the following path and response.

**Request Path:**

- `/api/pets?employeeId=vlJtFOU`

**Response Body:**

```js
[
  {
    id: "fiQ_EZE",
    name: "Alanis",
    kind: "Dog",
    breed: "Retriever, Labrador",
    employeeId: "vlJtFOU",
  },
  // ...
];
```

In the example above, the employee ID of `vlJtFOU` was included as part of the path. Only those pets with an `employeeId` that is equal to that ID are then returned.
