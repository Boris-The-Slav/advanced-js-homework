console.log("functional");

//object constructor
function Person(firstName, lastName, age, city, country, spouse, ...pets) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = `${firstName} ${lastName}`;
  this.age = age;
  this.city = city;
  this.country = country;
  this.spouse = spouse;
  this.isMarried = !!this.spouse;
  this.userId = Math.floor(Math.random() * 899) + 100;
  this.pets = pets.flat();
}

//creating the array of users
const users = [
  new Person("John", "Marston", 33, "Dallas", "USA", "Mary Marston", []),
  new Person("Mark", "Miller", 29, "Chichago", "USA", "", []),
  new Person("Kole", "Andonov", 36, "Skopje", "Macedonia", "Ana Andonova", [
    "dog",
  ]),
  new Person("Boris", "Slavski", 28, "Moskow", "Russia", "", [
    "parrot",
    "snake",
  ]),
  new Person("Janice", "Roosevelt", 30, "Boston", "USA", "Andrew Roosevelt", [
    "dog",
    "cat",
  ]),
  new Person("John", "Marston", 23, "San Antonio", "USA", "", "dog"),
  new Person(
    "Tony",
    "Velleti",
    35,
    "New Jersey",
    "USA",
    "Anna Velleti",
    "snake",
    "lizard"
  ),
  new Person("John", "Marston", 67, "Dallas", "USA", "Janice Marston", "other"),
];

//i'm running all the logic on the original array, i could've just made a shallow copy
// with destructuring but i decided not to

//[dom selectors]

//dom selections for search section
const searchInput = document.querySelector("#search-input");
const deleteInput = document.querySelector("#delete-input");
const searchButton = document.querySelector("#search-button");
const deleteButton = document.querySelector("#delete-button");
const resetButton = document.querySelector("#reset-button");
const searchErrorMsg = document.querySelector("#error-msg");
const userTableBody = document.querySelector("#users-table");
const petInput = document.querySelector("#pet-type-input");

//dom selections for creating user
const createUserBtn = document.querySelector("#create-user-btn");
const createErrorMsg = document.querySelector("#create-error-msg");
//i decided to fix the problem with hardcoding numbers in the validation
//by creating two seperate selections and keeping them seperate
const createInputsMandatory = document.querySelectorAll(
  ".user-create-inputs-mandatory"
);
const createInputsOptional = document.querySelectorAll(
  ".user-create-inputs-optional"
);
const petTypeInput = document.querySelector("#pet-type-input");
const links = document.querySelectorAll(".nav-links");

//selectors for the articles to show/hide them
const createUserContainer = document.querySelector("#create-user-container");
const searchUsersContainer = document.querySelector("#search-users-container");

//[functions]

//function for displaying different elements
const changePage = (show, hide) => {
  show.style.display = "block";
  hide.style.display = "none";
};

//calling the function to start with the user table
changePage(searchUsersContainer, createUserContainer);

//function for validating inputs
const validateCreateInputs = (inputs) =>
  Array.from(inputs).every((el) => !!el.value) ? true : false;

//function for cleaning input fields
const cleanInputs = (inputs) => {
  inputs.forEach((el) => (el.value = ""));
};

//function for creating a new user
const createUser = (allInputs) => new Person(...allInputs);

//prints only one user
const printOneUser = (user) => {
  searchInput.value = "";
  searchErrorMsg.innerText = "";
  userTableBody.innerHTML += `<tr class="user-row">
    <td>${user.userId}</td>
    <td>${user.fullName}</td>
    <td>${user.age}</td>
    <td>${user.isMarried ? `Yes, with ${user.spouse}` : `No`}</td>
    <td>${user.city}</td>
    <td>${user.country}</td>
    <td>${user.pets.length > 0 ? user.pets.join(", ") : "none"}</td>
    <td><button type = "button" class="table-delete-buttons">❌</button></button>`;
};

const printAllUsers = (arr) => {
  userTableBody.innerHTML = "";
  arr.forEach((user) => printOneUser(user));
};
//calling the function at start
printAllUsers(users);

//funciton for adding listeners to the buttons
//event delegation is magical what else to say
const createTableBodyListener = () => {
  userTableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("table-delete-buttons")) {
      const index = users.findIndex(
        (el) =>
          el.userId ===
          Number(e.target.parentElement.parentElement.cells[0].innerText)
      );
      users.splice(index, 1);
      e.target.parentElement.parentElement.remove();
    }
  });
};
createTableBodyListener();

//deleting users by id from the input field
const deleteUserFromInput = (arr, searchInput) => {
  userTableBody.innerHTML = "";
  const filteredArr = arr.filter(
    (el) => el.userId === Number(searchInput.value)
  );
  if (filteredArr.length === 1) {
    //Unused filter method that only changes the display
    // printAllUsers(
    //   users.filter((el) => el.userId !== filteredArr[0].usedId)
    // );

    //This modifies the original array
    arr.splice(arr.indexOf(filteredArr[0]), 1);
    searchInput.value = "";
    printAllUsers(users);
  } else {
    searchErrorMsg.innerText = "User Not Found";
  }
};

//handles the searching
const displaySearch = () => {
  userTableBody.innerHTML = "";
  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase() === searchInput.value.toLowerCase() ||
      user.userId === Number(searchInput.value)
  );
  filteredUsers.length !== 0
    ? printAllUsers(filteredUsers, users)
    : (searchErrorMsg.innerText = "User Not Found");
};

//[event handlers]

//handles for search section
searchButton.addEventListener("click", displaySearch);
resetButton.addEventListener("click", () => {
  printAllUsers(users);
});
//handlers for deleting users
deleteButton.addEventListener("click", () => {
  deleteUserFromInput(users, deleteInput);
});

//handlers for creating user section

createUserBtn.addEventListener("click", () => {
  if (validateCreateInputs(createInputsMandatory)) {
    const inputValues = Array.from([
      ...createInputsMandatory,
      ...createInputsOptional,
      ...Array.from(petInput.selectedOptions),
    ]).map((el) => (el = el.value));
    users.push(createUser(inputValues));
    createErrorMsg.innerText = "";
    printAllUsers(users);
  } else {
    createErrorMsg.innerText = "Please fill all fields that are not optional";
  }
  cleanInputs([...createInputsMandatory, ...createInputsOptional, petInput]);
});

//handlers for changing the page
links[0].addEventListener("click", () => {
  changePage(createUserContainer, searchUsersContainer);
});
links[1].addEventListener("click", () => {
  changePage(searchUsersContainer, createUserContainer);
});
