console.log("functional");

//working on the basic funcitonality first

//object constructor
function Person(firstName, lastName, age, city, country, spouse, pets) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = `${firstName} ${lastName}`;
  this.age = age;
  this.city = city;
  this.country = country;
  this.spouse = spouse;
  this.pets = pets;
  this.checkMarriage = function () {
    this.spouse ? (this.isMarried = true) : (this.isMarried = false);
  };
  this.checkMarriage();
}

//creating the array of users
const users = [
  new Person("John", "Marston", 33, "Dallas", "USA", "Mary Marston", [
    "Washington",
    "Max",
    "Winston",
  ]),
  new Person("Mark", "Morris", 29, "Chichago", "USA", "", ["Rex", "Shrek"]),
  new Person("Kole", "Andonov", 36, "Skopje", "Macedonia", "Ana Andonova", [
    "Djeki",
    "Boni",
  ]),
  new Person("Boris", "Slavski", 28, "Moskow", "Russia", "", [
    "Stalin",
    "Lennin",
  ]),
  new Person("Janice", "Roosevelt", 30, "Boston", "USA", "Andrew Rooesevelt", [
    "Kayle",
    "Annie",
    "Tobby",
  ]),
];

//basic function to search user by full name(case insensiive)
function searchUser(searchTerm) {
  for (let user of users) {
    if (searchTerm.toLowerCase() === user.fullName.toLowerCase()) {
      return user;
    }
  }
  return "User Not Found";
}

console.log(searchUser("janice roosevelt"));

//advanced segment

//dom selections
const searchInput = document.querySelector("#search--input");
const searchButton = document.querySelector("#search--button");
const resetButton = document.querySelector("#reset--button");
const errorMsg = document.querySelector("#error--msg");
const userTable = document.querySelector("#users--table");

//table head html
const tableHead = `<tr>
<th>Full Name</th>
<th>Age</th>
<th>Marriage Status</th>
<th>City</th>
<th>Country</th>
<th>Pets</th>
</tr>`;

//functions
function printAllUsers() {
  userTable.innerHTML = tableHead;
  for (let user of users) {
    printOneUser(user);
  }
}
//calling the function to print all users on start
printAllUsers();

//prints only one user
function printOneUser(user) {
  searchInput.value = "";
  errorMsg.innerText = "";
  userTable.innerHTML += `<tr>
    <td>${user.fullName}</td>
    <td>${user.age}</td>
    <td>${user.isMarried ? `Yes, with ${user.spouse}` : `No`}</td>
    <td>${user.city}</td>
    <td>${user.country}</td>
    <td>${user.pets.join(", ")}`;
}

//handles the searching
function displaySearch() {
  userTable.innerHTML = tableHead;
  for (let user of users) {
    if (user.fullName.toLowerCase() === searchInput.value.toLowerCase()) {
      printOneUser(user);
      break;
    } else {
      errorMsg.innerText = "User Does Not Exist";
    }
  }
}

//event handlers
searchButton.addEventListener("click", displaySearch);
resetButton.addEventListener("click", printAllUsers);
document.addEventListener("keydown", (e) => {
  e.key === "Enter" ? displaySearch() : "";
});
