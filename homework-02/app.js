console.log("functional");

//object constructor
function Person(
  firstName,
  lastName,
  age,
  city,
  country,
  spouse,
  petType,
  petName
) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = `${firstName} ${lastName}`;
  this.age = age;
  this.city = city;
  this.country = country;
  this.spouse = spouse;
  this.petType = petType;
  this.petName = petName;
  this.checkMarriage = function () {
    this.spouse ? (this.isMarried = true) : (this.isMarried = false);
  };
  this.checkMarriage();
}

//creating the array of users
const users = [
  new Person(
    "John",
    "Marston",
    33,
    "Dallas",
    "USA",
    "Mary Marston",
    "",
    "Bucky"
  ),
  new Person("Mark", "Morris", 29, "Chichago", "USA", "", "snake", "Valdemort"),
  new Person(
    "Kole",
    "Andonov",
    36,
    "Skopje",
    "Macedonia",
    "Ana Andonova",
    "parrot",
    "Jack"
  ),
  new Person("Boris", "Slavski", 28, "Moskow", "Russia", "", "horse", ""),
  new Person(
    "Janice",
    "Roosevelt",
    30,
    "Boston",
    "USA",
    "Andrew Rooesevelt",
    "fish",
    "Moby Dick"
  ),
];

//[dom selectors]

//dom selections for search section
const searchInput = document.querySelector("#search--input");
const searchButton = document.querySelector("#search--button");
const resetButton = document.querySelector("#reset--button");
const searchErrorMsg = document.querySelector("#error--msg");
const userTable = document.querySelector("#users--table");

//dom selections for creating user
const createUserBtn = document.querySelector("#create-user-btn");
const createErrorMsg = document.querySelector("#create-error-msg");
const createInputs = document.querySelectorAll(".user-create-inputs");
const links = document.querySelectorAll(".nav-links");

//selectors for the articles to show/hide them
const createUserContainer = document.querySelector("#create-user-container");
const searchUsersContainer = document.querySelector("#search-users-container");

//table head html
const tableHead = `<tr>
<th>Full Name</th>
<th>Age</th>
<th>Marriage Status</th>
<th>City</th>
<th>Country</th>
<th>Pet</th>
</tr>`;

//[functions]

//function for displaying different elements
const changePage = (element1, element2) => {
  element1.style.display = "block";
  element2.style.display = "none";
};
//calling the function to start with the user table
changePage(searchUsersContainer, createUserContainer);

//function for validating inputs
const validateCreateInputs = (inputs) => {
  return inputs.filter((_, i) => i < 5).every((el) => !!el) ? true : false;
};

const cleanInputs = (inputs) => {
  inputs.forEach((el) => {
    el.value = "";
  });
};

//function for creating a new user
const createUser = (values) => {
  return new Person(...values);
};
//prints only one user
const printOneUser = (user) => {
  searchInput.value = "";
  searchErrorMsg.innerText = "";
  userTable.innerHTML += `<tr>
    <td>${user.fullName}</td>
    <td>${user.age}</td>
    <td>${user.isMarried ? `Yes, with ${user.spouse}` : `No`}</td>
    <td>${user.city}</td>
    <td>${user.country}</td>
    <td>${
      user.petType
        ? `Yes, a ${user.petType} ${user.petName && `named ${user.petName}`}`
        : "No"
    }`;
};
//function to print all users and refresh the dom
const printAllUsers = () => {
  userTable.innerHTML = tableHead;
  users.forEach((user) => printOneUser(user));
};
//calling the function to print all users on start
printAllUsers();

//handles the searching
const displaySearch = () => {
  userTable.innerHTML = tableHead;
  for (let user of users) {
    if (user.fullName.toLowerCase() === searchInput.value.toLowerCase()) {
      printOneUser(user);
      break;
    } else {
      searchErrorMsg.innerText = "User Does Not Exist";
    }
  }
};

//[event handlers]

//handles for search section
searchButton.addEventListener("click", displaySearch);
resetButton.addEventListener("click", printAllUsers);

//handlers for creating user section
createUserBtn.addEventListener("click", () => {
  const inputValues = Array.from(createInputs).map((el) => (el = el.value));
  if (validateCreateInputs(inputValues)) {
    users.push(createUser(inputValues));
    createErrorMsg.innerText = "";
    printAllUsers();
  } else {
    createErrorMsg.innerText = "Please fill all fields that are not optional";
  }
  cleanInputs(createInputs);
});

//handlers for changing the page
links[0].addEventListener("click", () => {
  changePage(createUserContainer, searchUsersContainer);
});
links[1].addEventListener("click", () => {
  changePage(searchUsersContainer, createUserContainer);
});
