console.log("functional");

let users = [
  {
    name: "John",
    gender: "m",
    title: "",
    hasCar: true,
    age: 30,
    eyeColor: "green",
    hairColor: "black",
    address: "Skopje, MK",
    job: "developer",
  },
  {
    name: "Jack",
    gender: "m",
    title: "",
    hasCar: false,
    age: 19,
    eyeColor: "brown",
    hairColor: "brown",
    address: "Tetovo, MK",
    job: "realtor",
  },
  {
    name: "Elisabeth",
    gender: "f",
    title: "",
    hasCar: true,
    age: 45,
    eyeColor: "blue",
    hairColor: "black",
    address: "Bitola, MK",
    job: "project manager",
  },
  {
    name: "Ana",
    gender: "f",
    title: "",
    hasCar: true,
    age: 98,
    eyeColor: "brown",
    hairColor: "blonde",
    address: "Shtip, MK",
    job: "designer",
  },
  {
    name: "Carroll",
    gender: "f",
    title: "",
    hasCar: false,
    age: 17,
    eyeColor: "green",
    hairColor: "blonde",
    address: "Kumanovo, MK",
    job: "bushiness analyst",
  },
  {
    name: "Michael",
    gender: "m",
    title: "",
    hasCar: true,
    age: 40,
    eyeColor: "blue",
    hairColor: null,
    address: "Sofija, BG",
    job: "developer",
  },
  {
    name: "Beth",
    gender: "f",
    title: "",
    hasCar: false,
    age: 35,
    eyeColor: "brown",
    hairColor: "blonde",
    address: "Atina, GR",
    job: "database engineer",
  },
  {
    name: "Clara",
    gender: "f",
    title: "",
    hasCar: true,
    age: 67,
    eyeColor: "blue",
    hairColor: "brown",
    address: "Tirana, AL",
    job: "designer",
  },
  {
    name: "Jay",
    gender: "m",
    title: "",
    hasCar: true,
    age: 39,
    eyeColor: "green",
    hairColor: null,
    address: "Dojran, MK",
    job: "manager",
  },
];

users.forEach((user) =>
  user.gender === "m" ? (user.title = "Mr.") : (user.title = "Ms.")
);

const maleUsers = users.filter((user) => user.gender === "m");

const notMacedonianUsers = users.filter((user) => !user.address.includes("MK"));

const ownCarUsers = users
  .filter((user) => user.hasCar)
  .map((user) => {
    user.carColor = "white";
    return user;
  });

const hairMsg = users
  .filter((user) => user.hairColor)
  .forEach((user) => {
    console.log(
      `${user.name} which is ${user.age} years old, lives in ${
        user.address
      } is working as a ${user.job} and ${
        user.hasCar ? `drives a car` : `doesn't drive a car`
      }`
    );
  });

const haveHair = users.every((user) => user.hairColor);

const areManagers = users.some((user) => user.job.includes("manager"));

const above28old = users.filter((user) => user.age > 28);

const findDojran = users.findIndex((user) => user.address.includes("Dojran"));

const clara = users.find((user) => user.name === "Clara");

const titleMsg = users.forEach((user) => {
  console.log(`${user.title} ${user.name}`);
});

console.log(users);
