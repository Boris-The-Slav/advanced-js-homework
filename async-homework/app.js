//class
class Animal {
  constructor(name, age, colors, tail) {
    this.name = name;
    this.age = age;
    this.colors = colors;
    this.tail = tail;
  }
}
//array of animals

const animalsArr = [
  new Animal("Bucky", 5, ["white", "brown"], true),
  new Animal("Rex", "3", ["black", "brown", "yellow"], true),
  new Animal("Tommy", 5, ["black", "white"], false),
  new Animal("Sheila", 6, ["orange"], true),
];

//functions

const checkAnimals = animals => {
  return new Promise((resolve, reject) => {
    if (!animals.length || !Array.isArray(animals))
      reject("No Animals Found or Invalid Input");
    resolve(animals);
  });
};

const getWhiteAnimals = animals => {
  return animals.filter(animal =>
    animal.colors.find(color => color === "white")
  );
};

const printAnimalsPromises = () => {
  checkAnimals(animalsArr)
    .then(animals => {
      console.log(getWhiteAnimals(animals));
    })
    .catch(error => console.log(error));
};

const printAnimalsAsync = async () => {
  try {
    const animals = await checkAnimals(animalsArr);
    console.log(getWhiteAnimals(animals));
  } catch (error) {
    console.log(error);
  }
};

printAnimalsPromises();

printAnimalsAsync();
