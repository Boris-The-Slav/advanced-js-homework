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

///adding a function to edit users in the prototype
Person.prototype.editPerson = function (
  firstName,
  lastName,
  age,
  city,
  country,
  spouse,
  ...pets
) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = `${firstName} ${lastName}`;
  this.age = age;
  this.city = city;
  this.country = country;
  this.spouse = spouse;
  this.isMarried = !!this.spouse;
  this.userId = Math.floor(Math.random() * 899) + 100;
  this.pets = pets;
};

//creating the array of users
let users = [
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
// with destructuring but i decided not to like this const usersCopy = [...users]

//[dom selectors]

//dom selections for search section
const searchInput = document.querySelector("#search-input");
const deleteInput = document.querySelector("#delete-input");
const searchButton = document.querySelector("#search-button");
const deleteButton = document.querySelector("#delete-button");
const resetButton = document.querySelector("#reset-button");
const searchErrorMsg = document.querySelector("#error-msg");
const userTableBody = document.querySelector("#users-table");

//dom selections for creating user
const createUserBtn = document.querySelector("#create-user-btn");
const createErrorMsg = document.querySelector("#create-error-msg");
const createHeader = document.querySelector("h2");

//mandatory inputs
const firstNameInput = document.querySelector("#first-name-input");
const lastNameInput = document.querySelector("#last-name-input");
const ageInput = document.querySelector("#age-input");
const cityInput = document.querySelector("#city-input");
const countryInput = document.querySelector("#country-input");

//all mandatory inputs
const createInputsMandatory = [
  ...document.querySelectorAll(".user-create-inputs-mandatory"),
];

//optional inputs
const spouseInput = document.querySelector("#spouse-input");
const petInput = document.querySelector("#pet-type-input");

//all optional inputs
const createInputsOptional = [
  ...document.querySelectorAll(".user-create-inputs-optional"),
];

const links = document.querySelectorAll(".nav-links");

//selectors for the articles to show/hide them
const createUserContainer = document.querySelector("#create-user-container");
const searchUsersContainer = document.querySelector("#search-users-container");

//[global variables]
let isEditing = false;
let rowUserId;

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
  [...inputs].every((el) => !!el.value) ? true : false;

//function for cleaning input fields
const cleanInputs = (inputs) => {
  inputs.forEach((el) => (el.value = ""));
};

//function for creating a new user
const createUser = (allInputs) => new Person(...allInputs);

//repopulate inputs
const repopulateInputs = (user) => {
  firstNameInput.value = user.firstName;
  lastNameInput.value = user.lastName;
  ageInput.value = user.age;
  cityInput.value = user.city;
  countryInput.value = user.country;
  spouseInput.value = user.spouse;
  user.pets.forEach((pet) => {
    [...petInput.options].forEach((option) => {
      if (option.value === pet) {
        option.selected = true;
      }
    });
  });
};

//function for changing create user header and button text
function changeFormText(headerText, buttonText) {
  createHeader.innerText = headerText;
  createUserBtn.innerText = buttonText;
}

//function for editing user logic
const editUserDisplay = (arr, rowUserId) => {
  changeFormText("Edit User", "Finish Editing");
  changePage(createUserContainer, searchUsersContainer);
  repopulateInputs(arr.find((user) => user.userId === rowUserId));
};

//prints only one user
const printOneUser = (user) => {
  searchErrorMsg.innerText = "";
  userTableBody.innerHTML += `<tr class="user-row">
    <td>${user.userId}</td>
    <td>${user.fullName}</td>
    <td>${user.age}</td>
    <td>${user.isMarried ? `Yes, with ${user.spouse}` : `No`}</td>
    <td>${user.city}</td>
    <td>${user.country}</td>
    <td>${user.pets.length > 0 ? user.pets.join(", ") : "none"}</td>
    <td>
      <button type = "button" class="table-edit-buttons">EDIT</button>
      <button type = "button" class="table-delete-buttons">❌</button>
    </td>`;
};

//function that refreshes the dom
const printAllUsers = (arr) => {
  userTableBody.innerHTML = "";
  arr.forEach((user) => printOneUser(user));
};
//calling the function at start
printAllUsers(users);

//funciton for adding listeners to the buttons
//event delegation is magical what else to say
const createTableBodyListener = (arr) => {
  userTableBody.addEventListener("click", (e) => {
    //delete buttons
    if (e.target.classList.contains("table-delete-buttons")) {
      const index = arr.findIndex(
        (el) =>
          el.userId === Number(e.target.closest(".user-row").cells[0].innerText)
      );
      arr.splice(index, 1);
      e.target.closest(".user-row").remove();
    }
    //edit buttons
    if (e.target.classList.contains("table-edit-buttons")) {
      rowUserId = Number(e.target.closest(".user-row").cells[0].innerText);
      editUserDisplay(users, rowUserId);
      isEditing = true;
    }
  });
};
createTableBodyListener(users);

//deleting users by id from the input field
const deleteUserFromInput = (arr, searchInput) => {
  arr = arr.filter((el) => el.userId !== Number(searchInput.value));
  searchInput.value = "";
  printAllUsers(arr);
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
  searchInput.value = "";
  printAllUsers(users);
});
//handlers for deleting users
deleteButton.addEventListener("click", () => {
  deleteUserFromInput(users, deleteInput);
});

//handlers for creating user section

createUserBtn.addEventListener("click", () => {
  if (validateCreateInputs(createInputsMandatory)) {
    const inputValues = [
      ...createInputsMandatory,
      ...createInputsOptional,
      ...[...petInput.selectedOptions],
    ].map((el) => (el = el.value));
    if (isEditing) {
      users
        .find((user) => user.userId === rowUserId)
        .editPerson(...inputValues);
      changeFormText("Create a new User", "Create User");
      isEditing = false;
    } else {
      users.push(createUser(inputValues));
    }
    createErrorMsg.innerText = "";
    printAllUsers(users);
    changePage(searchUsersContainer, createUserContainer);
    cleanInputs([...createInputsMandatory, ...createInputsOptional, petInput]);
  } else {
    createErrorMsg.innerText = "Please fill all fields that are not optional";
  }
});

//handlers for changing the page
links[0].addEventListener("click", () => {
  changePage(createUserContainer, searchUsersContainer);
});
links[1].addEventListener("click", () => {
  changePage(searchUsersContainer, createUserContainer);
});

//responsive searching event listener
searchInput.addEventListener("input", (e) => {
  printAllUsers(
    users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        String(user.userId).includes(e.target.value)
    )
  );
});
