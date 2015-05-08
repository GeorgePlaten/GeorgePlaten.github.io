/*
Welcome to the 60fps project! Your goal is to make Cam's Pizzeria website run
jank-free at 60 frames per second.

There are two major issues in this code that lead to sub-60fps performance. Can
you spot and fix both?


Built into the code, you'll find a few instances of the User Timing API
(window.performance), which will be console.log()ing frame rate data into the
browser console. To learn more about User Timing API, check out:
http://www.html5rocks.com/en/tutorials/webperformance/usertiming/

Creator:
Cameron Pittman, Udacity Course Developer
cameron *at* udacity *dot* com
*/

// As you may have realized, this website randomly generates pizzas.
// Here are arrays of all possible pizza ingredients.
console.log('hi there');
var pizzaIngredients = {};
pizzaIngredients.meats = [
  "Pepperoni",
  "Sausage",
  "Fennel Sausage",
  "Spicy Sausage",
  "Chicken",
  "BBQ Chicken",
  "Chorizo",
  "Chicken Andouille",
  "Salami",
  "Tofu",
  "Bacon",
  "Canadian Bacon",
  "Proscuitto",
  "Italian Sausage",
  "Ground Beef",
  "Anchovies",
  "Turkey",
  "Ham",
  "Venison",
  "Lamb",
  "Duck",
  "Soylent Green",
  "Carne Asada",
  "Soppressata Picante",
  "Coppa",
  "Pancetta",
  "Bresola",
  "Lox",
  "Guanciale",
  "Chili",
  "Beef Jerky",
  "Pastrami",
  "Kielbasa",
  "Scallops",
  "Filet Mignon"
];
pizzaIngredients.nonMeats = [
  "White Onions",
  "Red Onions",
  "Sauteed Onions",
  "Green Peppers",
  "Red Peppers",
  "Banana Peppers",
  "Ghost Peppers",
  "Habanero Peppers",
  "Jalapeno Peppers",
  "Stuffed Peppers",
  "Spinach",
  "Tomatoes",
  "Pineapple",
  "Pear Slices",
  "Apple Slices",
  "Mushrooms",
  "Arugula",
  "Basil",
  "Fennel",
  "Rosemary",
  "Cilantro",
  "Avocado",
  "Guacamole",
  "Salsa",
  "Swiss Chard",
  "Kale",
  "Sun Dried Tomatoes",
  "Walnuts",
  "Artichoke",
  "Asparagus",
  "Caramelized Onions",
  "Mango",
  "Garlic",
  "Olives",
  "Cauliflower",
  "Polenta",
  "Fried Egg",
  "Zucchini",
  "Hummus"
];
pizzaIngredients.cheeses = [
  "American Cheese",
  "Swiss Cheese",
  "Goat Cheese",
  "Mozzarella Cheese",
  "Parmesean Cheese",
  "Velveeta Cheese",
  "Gouda Cheese",
  "Muenster Cheese",
  "Applewood Cheese",
  "Asiago Cheese",
  "Bleu Cheese",
  "Boursin Cheese",
  "Brie Cheese",
  "Cheddar Cheese",
  "Chevre Cheese",
  "Havarti Cheese",
  "Jack Cheese",
  "Pepper Jack Cheese",
  "Gruyere Cheese",
  "Limberger Cheese",
  "Manchego Cheese",
  "Marscapone Cheese",
  "Pecorino Cheese",
  "Provolone Cheese",
  "Queso Cheese",
  "Roquefort Cheese",
  "Romano Cheese",
  "Ricotta Cheese",
  "Smoked Gouda"
];
pizzaIngredients.sauces = [
  "Red Sauce",
  "Marinara",
  "BBQ Sauce",
  "No Sauce",
  "Hot Sauce"
];
pizzaIngredients.crusts = [
  "White Crust",
  "Whole Wheat Crust",
  "Flatbread Crust",
  "Stuffed Crust"
];

// Name generator pulled from http://saturdaykid.com/usernames/generator.html
// Capitalizes first letter of each word
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// Pulls adjective out of array using random number sent from generator
function getAdj(x){
  switch(x) {
    case "dark":
      var dark = ["dark","morbid", "scary", "spooky", "gothic", "deviant", "creepy", "sadistic", "black", "dangerous", "dejected", "haunted",
      "morose", "tragic", "shattered", "broken", "sad", "melancholy", "somber", "dark", "gloomy", "homicidal", "murderous", "shady", "misty",
      "dusky", "ghostly", "shadowy", "demented", "cursed", "insane", "possessed", "grotesque", "obsessed"];
      return dark;
    case "color":
      var colors = ["blue", "green", "purple", "grey", "scarlet", "NeonGreen", "NeonBlue", "NeonPink", "HotPink", "pink", "black", "red",
      "maroon", "silver", "golden", "yellow", "orange", "mustard", "plum", "violet", "cerulean", "brown", "lavender", "violet", "magenta",
      "chestnut", "rosy", "copper", "crimson", "teal", "indigo", "navy", "azure", "periwinkle", "brassy", "verdigris", "veridian", "tan",
      "raspberry", "beige", "sandy", "ElectricBlue", "white", "champagne", "coral", "cyan"];
      return colors;
    case "whimsical":
      var whimsy = ["whimsical", "silly", "drunken", "goofy", "funny", "weird", "strange", "odd", "playful", "clever", "boastful", "breakdancing",
      "hilarious", "conceited", "happy", "comical", "curious", "peculiar", "quaint", "quirky", "fancy", "wayward", "fickle", "yawning", "sleepy",
      "cockeyed", "dizzy", "dancing", "absurd", "laughing", "hairy", "smiling", "perplexed", "baffled", "cockamamie", "vulgar", "hoodwinked",
      "brainwashed"];
      return whimsy;
    case "shiny":
      var shiny = ["sapphire", "opal", "silver", "gold", "platinum", "ruby", "emerald", "topaz", "diamond", "amethyst", "turquoise",
      "starlit", "moonlit", "bronze", "metal", "jade", "amber", "garnet", "obsidian", "onyx", "pearl", "copper", "sunlit", "brass", "brassy",
      "metallic"];
      return shiny;
    case "noisy":
      var noisy = ["untuned", "loud", "soft", "shrieking", "melodious", "musical", "operatic", "symphonic", "dancing", "lyrical", "harmonic",
      "orchestral", "noisy", "dissonant", "rhythmic", "hissing", "singing", "crooning", "shouting", "screaming", "wailing", "crying", "howling",
      "yelling", "hollering", "caterwauling", "bawling", "bellowing", "roaring", "squealing", "beeping", "knocking", "tapping", "rapping",
      "humming", "scatting", "whispered", "whispering", "rasping", "buzzing", "whirring", "whistling", "whistled"];
      return noisy;
    case "apocalyptic":
      var apocalyptic = ["nuclear", "apocalyptic", "desolate", "atomic", "zombie", "collapsed", "grim", "fallen", "collapsed", "cannibalistic",
      "radioactive", "toxic", "poisonous", "venomous", "disastrous", "grimy", "dirty", "undead", "bloodshot", "rusty", "glowing", "decaying",
      "rotten", "deadly", "plagued", "decimated", "rotting", "putrid", "decayed", "deserted", "acidic"];
      return apocalyptic;
    case "insulting":
      var insulting = ["stupid", "idiotic", "fat", "ugly", "hideous", "grotesque", "dull", "dumb", "lazy", "sluggish", "brainless", "slow",
      "gullible", "obtuse", "dense", "dim", "dazed", "ridiculous", "witless", "daft", "crazy", "vapid", "inane", "mundane", "hollow", "vacuous",
      "boring", "insipid", "tedious", "monotonous", "weird", "bizarre", "backward", "moronic", "ignorant", "scatterbrained", "forgetful", "careless",
      "lethargic", "insolent", "indolent", "loitering", "gross", "disgusting", "bland", "horrid", "unseemly", "revolting", "homely", "deformed",
      "disfigured", "offensive", "cowardly", "weak", "villainous", "fearful", "monstrous", "unattractive", "unpleasant", "nasty", "beastly", "snide",
      "horrible", "syncophantic", "unhelpful", "bootlicking"];
      return insulting;
    case "praise":
      var praise = ["beautiful", "intelligent", "smart", "genius", "ingenious", "gorgeous", "pretty", "witty", "angelic", "handsome", "graceful",
      "talented", "exquisite", "enchanting", "fascinating", "interesting", "divine", "alluring", "ravishing", "wonderful", "magnificient", "marvelous",
      "dazzling", "cute", "charming", "attractive", "nifty", "delightful", "superior", "amiable", "gentle", "heroic", "courageous", "valiant", "brave",
      "noble", "daring", "fearless", "gallant", "adventurous", "cool", "enthusiastic", "fierce", "awesome", "radical", "tubular", "fearsome",
      "majestic", "grand", "stunning"];
      return praise;
    case "scientific":
      var scientific = ["scientific", "technical", "digital", "programming", "calculating", "formulating", "cyberpunk", "mechanical", "technological",
      "innovative", "brainy", "chemical", "quantum", "astro", "space", "theoretical", "atomic", "electronic", "gaseous", "investigative", "solar",
      "extinct", "galactic"];
      return scientific;
    default:
      var scientific_default = ["scientific", "technical", "digital", "programming", "calculating", "formulating", "cyberpunk", "mechanical", "technological",
      "innovative", "brainy", "chemical", "quantum", "astro", "space", "theoretical", "atomic", "electronic", "gaseous", "investigative", "solar",
      "extinct", "galactic"];
      return scientific_default;
  }
}

// Pulls noun out of array using random number sent from generator
function getNoun(y) {
  switch(y) {
    case "animals":
      var animals = ["flamingo", "hedgehog", "owl", "elephant", "pussycat", "alligator", "dachsund", "poodle", "beagle", "crocodile", "kangaroo",
      "wallaby", "woodpecker", "eagle", "falcon", "canary", "parrot", "parakeet", "hamster", "gerbil", "squirrel", "rat", "dove", "toucan",
      "raccoon", "vulture", "peacock", "goldfish", "rook", "koala", "skunk", "goat", "rooster", "fox", "porcupine", "llama", "grasshopper",
      "gorilla", "monkey", "seahorse", "wombat", "wolf", "giraffe", "badger", "lion", "mouse", "beetle", "cricket", "nightingale",
      "hawk", "trout", "squid", "octopus", "sloth", "snail", "locust", "baboon", "lemur", "meerkat", "oyster", "frog", "toad", "jellyfish",
      "butterfly", "caterpillar", "tiger", "hyena", "zebra", "snail", "pig", "weasel", "donkey", "penguin", "crane", "buzzard", "vulture",
      "rhino", "hippopotamus", "dolphin", "sparrow", "beaver", "moose", "minnow", "otter", "bat", "mongoose", "swan", "firefly", "platypus"];
      return animals;
    case "profession":
      var professions = ["doctor", "lawyer", "ninja", "writer", "samurai", "surgeon", "clerk", "artist", "actor", "engineer", "mechanic",
      "comedian", "fireman", "nurse", "RockStar", "musician", "carpenter", "plumber", "cashier", "electrician", "waiter", "president", "governor",
      "senator", "scientist", "programmer", "singer", "dancer", "director", "mayor", "merchant", "detective", "investigator", "navigator", "pilot",
      "priest", "cowboy", "stagehand", "soldier", "ambassador", "pirate", "miner", "police"];
      return professions;
    case "fantasy":
      var fantasy = ["centaur", "wizard", "gnome", "orc", "troll", "sword", "fairy", "pegasus", "halfling", "elf", "changeling", "ghost",
      "knight", "squire", "magician", "witch", "warlock", "unicorn", "dragon", "wyvern", "princess", "prince", "king", "queen", "jester",
      "tower", "castle", "kraken", "seamonster", "mermaid", "psychic", "seer", "oracle"];
      return fantasy;
    case "music":
      var music = ["violin", "flute", "bagpipe", "guitar", "symphony", "orchestra", "piano", "trombone", "tuba", "opera", "drums",
      "harpsichord", "harp", "harmonica", "accordion", "tenor", "soprano", "baritone", "cello", "viola", "piccolo", "ukelele", "woodwind", "saxophone",
      "bugle", "trumpet", "sousaphone", "cornet", "stradivarius", "marimbas", "bells", "timpani", "bongos", "clarinet", "recorder", "oboe", "conductor",
      "singer"];
      return music;
    case "horror":
      var horror = ["murderer", "chainsaw", "knife", "sword", "murder", "devil", "killer", "psycho", "ghost", "monster", "godzilla", "werewolf",
      "vampire", "demon", "graveyard", "zombie", "mummy", "curse", "death", "grave", "tomb", "beast", "nightmare", "frankenstein", "specter",
      "poltergeist", "wraith", "corpse", "scream", "massacre", "cannibal", "skull", "bones", "undertaker", "zombie", "creature", "mask", "psychopath",
      "fiend", "satanist", "moon", "fullMoon"];
      return horror;
    case "gross":
      var gross = ["slime", "bug", "roach", "fluid", "pus", "booger", "spit", "boil", "blister", "orifice", "secretion", "mucus", "phlegm",
      "centipede", "beetle", "fart", "snot", "crevice", "flatulence", "juice", "mold", "mildew", "germs", "discharge", "toilet", "udder", "odor", "substance",
      "fluid", "moisture", "garbage", "trash", "bug"];
      return gross;
    case "everyday":
      var everyday = ["mirror", "knife", "fork", "spork", "spoon", "tupperware", "minivan", "suburb", "lamp", "desk", "stereo", "television", "TV",
      "book", "car", "truck", "soda", "door", "video", "game", "computer", "calender", "tree", "plant", "flower", "chimney", "attic", "kitchen",
      "garden", "school", "wallet", "bottle"];
      return everyday;
    case "jewelry":
      var jewelry = ["earrings", "ring", "necklace", "pendant", "choker", "brooch", "bracelet", "cameo", "charm", "bauble", "trinket", "jewelry",
      "anklet", "bangle", "locket", "finery", "crown", "tiara", "blingBling", "chain", "rosary", "jewel", "gemstone", "beads", "armband", "pin",
      "costume", "ornament", "treasure"];
      return jewelry;
    case "places":
      var places = ["swamp", "graveyard", "cemetery", "park", "building", "house", "river", "ocean", "sea", "field", "forest", "woods", "neighborhood",
      "city", "town", "suburb", "country", "meadow", "cliffs", "lake", "stream", "creek", "school", "college", "university", "library", "bakery",
      "shop", "store", "theater", "garden", "canyon", "highway", "restaurant", "cafe", "diner", "street", "road", "freeway", "alley"];
      return places;
    case "scifi":
      var scifi = ["robot", "alien", "raygun", "spaceship", "UFO", "rocket", "phaser", "astronaut", "spaceman", "planet", "star", "galaxy",
      "computer", "future", "timeMachine", "wormHole", "timeTraveler", "scientist", "invention", "martian", "pluto", "jupiter", "saturn", "mars",
      "quasar", "blackHole", "warpDrive", "laser", "orbit", "gears", "molecule", "electron", "neutrino", "proton", "experiment", "photon", "apparatus",
      "universe", "gravity", "darkMatter", "constellation", "circuit", "asteroid"];
      return scifi;
    default:
      var scifi_default = ["robot", "alien", "raygun", "spaceship", "UFO", "rocket", "phaser", "astronaut", "spaceman", "planet", "star", "galaxy",
      "computer", "future", "timeMachine", "wormHole", "timeTraveler", "scientist", "invention", "martian", "pluto", "jupiter", "saturn", "mars",
      "quasar", "blackHole", "warpDrive", "laser", "orbit", "gears", "molecule", "electron", "neutrino", "proton", "experiment", "photon", "apparatus",
      "universe", "gravity", "darkMatter", "constellation", "circuit", "asteroid"];
      return scifi_default;
  }
}

var adjectives = ["dark", "color", "whimsical", "shiny", "noise", "apocalyptic", "insulting", "praise", "scientific"];  // types of adjectives for pizza titles
var nouns = ["animals", "everyday", "fantasy", "gross", "horror", "jewelry", "places", "scifi"];                        // types of nouns for pizza titles

// Generates random numbers for getAdj and getNoun functions and returns a new pizza name
function generator(adj, noun) {
  var adjectives = getAdj(adj);
  var nouns = getNoun(noun);
  var randomAdjective = parseInt(Math.random() * adjectives.length);
  var randomNoun = parseInt(Math.random() * nouns.length);
  var name = "The " + adjectives[randomAdjective].capitalize() + " " + nouns[randomNoun].capitalize();
  return name;
}

// Chooses random adjective and random noun
function randomName() {
  var randomNumberAdj = parseInt(Math.random() * adjectives.length);
  var randomNumberNoun = parseInt(Math.random() * nouns.length);
  return generator(adjectives[randomNumberAdj], nouns[randomNumberNoun]);
}

// These functions return a string of a random ingredient from each respective category of ingredients.
var selectRandomMeat = function() {
  var randomMeat = pizzaIngredients.meats[Math.floor((Math.random() * pizzaIngredients.meats.length))];
  return randomMeat;
};

var selectRandomNonMeat = function() {
  var randomNonMeat = pizzaIngredients.nonMeats[Math.floor((Math.random() * pizzaIngredients.nonMeats.length))];
  return randomNonMeat;
};

var selectRandomCheese = function() {
  var randomCheese = pizzaIngredients.cheeses[Math.floor((Math.random() * pizzaIngredients.cheeses.length))];
  return randomCheese;
};

var selectRandomSauce = function() {
  var randomSauce = pizzaIngredients.sauces[Math.floor((Math.random() * pizzaIngredients.sauces.length))];
  return randomSauce;
};

var selectRandomCrust = function() {
  var randomCrust = pizzaIngredients.crusts[Math.floor((Math.random() * pizzaIngredients.crusts.length))];
  return randomCrust;
};

var ingredientItemizer = function(string) {
  return "<li>" + string + "</li>";
};

// Returns a string with random pizza ingredients nested inside <li> tags
var makeRandomPizza = function() {
  var pizza = "";

  var numberOfMeats = Math.floor((Math.random() * 4));
  var numberOfNonMeats = Math.floor((Math.random() * 3));
  var numberOfCheeses = Math.floor((Math.random() * 2));

  for (var i = 0; i < numberOfMeats; i++) {
    pizza = pizza + ingredientItemizer(selectRandomMeat());
  }

  for (var j = 0; j < numberOfNonMeats; j++) {
    pizza = pizza + ingredientItemizer(selectRandomNonMeat());
  }

  for (var k = 0; k < numberOfCheeses; k++) {
    pizza = pizza + ingredientItemizer(selectRandomCheese());
  }

  pizza = pizza + ingredientItemizer(selectRandomSauce());
  pizza = pizza + ingredientItemizer(selectRandomCrust());

  return pizza;
};

// returns a DOM element for each pizza
var pizzaElementGenerator = function(i) {
  var pizzaContainer,             // contains pizza title, image and list of ingredients
      pizzaImageContainer,        // contains the pizza image
      pizzaImage,                 // the pizza image itself
      pizzaDescriptionContainer,  // contains the pizza title and list of ingredients
      pizzaName,                  // the pizza name itself
      ul;                         // the list of ingredients

  pizzaContainer  = document.createElement("div");
  pizzaImageContainer = document.createElement("div");
  pizzaImage = document.createElement("img");
  pizzaDescriptionContainer = document.createElement("div");

  pizzaContainer.classList.add("randomPizzaContainer");
  pizzaContainer.style.width = "33.33%";
  pizzaContainer.style.height = "325px";
  pizzaContainer.id = "pizza" + i;                // gives each pizza element a unique id
  pizzaImageContainer.classList.add("col-md-6");

  pizzaImage.src = "images/pizza.png";
  pizzaImage.classList.add("img-responsive");
  pizzaImageContainer.appendChild(pizzaImage);
  pizzaContainer.appendChild(pizzaImageContainer);


  pizzaDescriptionContainer.classList.add("col-md-6");

  pizzaName = document.createElement("h4");
  pizzaName.innerHTML = randomName();
  pizzaDescriptionContainer.appendChild(pizzaName);

  ul = document.createElement("ul");
  ul.innerHTML = makeRandomPizza();
  pizzaDescriptionContainer.appendChild(ul);
  pizzaContainer.appendChild(pizzaDescriptionContainer);

  return pizzaContainer;
};

// resizePizzas(size) is called when the slider in the "Our Pizzas" section of the website moves.
var resizePizzas = function(size) {
  window.performance.mark("mark_start_resize");   // User Timing API function

  // Changes the value for the size of the pizza above the slider
  function changeSliderLabel(size) {
    switch(size) {
      case "1":
        document.querySelector("#pizzaSize").innerHTML = "Small";
        return;
      case "2":
        document.querySelector("#pizzaSize").innerHTML = "Medium";
        return;
      case "3":
        document.querySelector("#pizzaSize").innerHTML = "Large";
        return;
      default:
        console.log("bug in changeSliderLabel");
    }
  }

  changeSliderLabel(size);

  // Returns the size difference to change a pizza element from one size to another. Called by changePizzaSlices(size).
  function determineDx (elem, size) {
    var oldwidth = elem.offsetWidth;
    var windowwidth = document.querySelector("#randomPizzas").offsetWidth;
    var oldsize = oldwidth / windowwidth;

    // TODO: change to 3 sizes? no more xl?
    // Changes the slider value to a percent width
    function sizeSwitcher (size) {
      switch(size) {
        case "1":
          return 0.25;
        case "2":
          return 0.3333;
        case "3":
          return 0.5;
        default:
          console.log("bug in sizeSwitcher");
      }
    }

    var newsize = sizeSwitcher(size);
    var dx = (newsize - oldsize) * windowwidth;

    return dx;
  }

  // Iterates through pizza elements on the page and changes their widths
  function changePizzaSizes(size) {
    for (var i = 0; i < document.querySelectorAll(".randomPizzaContainer").length; i++) {
      var dx = determineDx(document.querySelectorAll(".randomPizzaContainer")[i], size);
      var newwidth = (document.querySelectorAll(".randomPizzaContainer")[i].offsetWidth + dx) + 'px';
      document.querySelectorAll(".randomPizzaContainer")[i].style.width = newwidth;
    }
  }

  changePizzaSizes(size);

  // User Timing API is awesome
  window.performance.mark("mark_end_resize");
  window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
  var timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
  console.log("Time to resize pizzas: " + timeToResize[0].duration + "ms");
};

window.performance.mark("mark_start_generating"); // collect timing data

// This for-loop actually creates and appends all of the pizzas when the page loads
for (var i = 2; i < 100; i++) {
  var pizzasDiv = document.getElementById("randomPizzas");
  pizzasDiv.appendChild(pizzaElementGenerator(i));
}

// User Timing API again. These measurements tell you how long it took to generate the initial pizzas
window.performance.mark("mark_end_generating");
window.performance.measure("measure_pizza_generation", "mark_start_generating", "mark_end_generating");
var timeToGenerate = window.performance.getEntriesByName("measure_pizza_generation");
console.log("Time to generate pizzas on load: " + timeToGenerate[0].duration + "ms");

// Iterator for number of times the pizzas in the background have scrolled.
// Used by updatePositions() to decide when to log the average time per frame
var frame = 0;

// Logs the average amount of time per 10 frames needed to move the sliding background pizzas on scroll.
function logAverageFrame(times) {   // times is the array of User Timing measurements from updatePositions()
  var numberOfEntries = times.length;
  var sum = 0;
  for (var i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
    sum = sum + times[i].duration;
  }
  console.log("Average time to generate last 10 frames: " + sum / 10 + "ms");
}

// The following code for sliding background pizzas was pulled from Ilya's demo found at:
// https://www.igvita.com/slides/2012/devtools-tips-and-tricks/jank-demo.html

// Moves the sliding background pizzas based on scroll position
function updatePositions() {
  frame++;
  window.performance.mark("mark_start_frame");

  var items = document.querySelectorAll('.mover');
  for (var i = 0; i < items.length; i++) {
    var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }

  // User Timing API to the rescue again. Seriously, it's worth learning.
  // Super easy to create custom metrics.
  window.performance.mark("mark_end_frame");
  window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
  if (frame % 10 === 0) {
    var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
    logAverageFrame(timesToUpdatePosition);
  }
}

// runs updatePositions on scroll
window.addEventListener('scroll', updatePositions);

// Generates the sliding pizzas when the page loads.
document.addEventListener('DOMContentLoaded', function() {
  var cols = 8;
  var s = 256;
  for (var i = 0; i < 200; i++) {
    var elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = "images/pizza.png";
    elem.style.height = "100px";
    elem.style.width = "73.333px";
    elem.basicLeft = (i % cols) * s;
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    document.querySelector("#movingPizzas1").appendChild(elem);
  }
  updatePositions();
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ2aWV3cy9zY3JpcHRzL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbldlbGNvbWUgdG8gdGhlIDYwZnBzIHByb2plY3QhIFlvdXIgZ29hbCBpcyB0byBtYWtlIENhbSdzIFBpenplcmlhIHdlYnNpdGUgcnVuXG5qYW5rLWZyZWUgYXQgNjAgZnJhbWVzIHBlciBzZWNvbmQuXG5cblRoZXJlIGFyZSB0d28gbWFqb3IgaXNzdWVzIGluIHRoaXMgY29kZSB0aGF0IGxlYWQgdG8gc3ViLTYwZnBzIHBlcmZvcm1hbmNlLiBDYW5cbnlvdSBzcG90IGFuZCBmaXggYm90aD9cblxuXG5CdWlsdCBpbnRvIHRoZSBjb2RlLCB5b3UnbGwgZmluZCBhIGZldyBpbnN0YW5jZXMgb2YgdGhlIFVzZXIgVGltaW5nIEFQSVxuKHdpbmRvdy5wZXJmb3JtYW5jZSksIHdoaWNoIHdpbGwgYmUgY29uc29sZS5sb2coKWluZyBmcmFtZSByYXRlIGRhdGEgaW50byB0aGVcbmJyb3dzZXIgY29uc29sZS4gVG8gbGVhcm4gbW9yZSBhYm91dCBVc2VyIFRpbWluZyBBUEksIGNoZWNrIG91dDpcbmh0dHA6Ly93d3cuaHRtbDVyb2Nrcy5jb20vZW4vdHV0b3JpYWxzL3dlYnBlcmZvcm1hbmNlL3VzZXJ0aW1pbmcvXG5cbkNyZWF0b3I6XG5DYW1lcm9uIFBpdHRtYW4sIFVkYWNpdHkgQ291cnNlIERldmVsb3BlclxuY2FtZXJvbiAqYXQqIHVkYWNpdHkgKmRvdCogY29tXG4qL1xuXG4vLyBBcyB5b3UgbWF5IGhhdmUgcmVhbGl6ZWQsIHRoaXMgd2Vic2l0ZSByYW5kb21seSBnZW5lcmF0ZXMgcGl6emFzLlxuLy8gSGVyZSBhcmUgYXJyYXlzIG9mIGFsbCBwb3NzaWJsZSBwaXp6YSBpbmdyZWRpZW50cy5cbmNvbnNvbGUubG9nKCdoaSB0aGVyZScpO1xudmFyIHBpenphSW5ncmVkaWVudHMgPSB7fTtcbnBpenphSW5ncmVkaWVudHMubWVhdHMgPSBbXG4gIFwiUGVwcGVyb25pXCIsXG4gIFwiU2F1c2FnZVwiLFxuICBcIkZlbm5lbCBTYXVzYWdlXCIsXG4gIFwiU3BpY3kgU2F1c2FnZVwiLFxuICBcIkNoaWNrZW5cIixcbiAgXCJCQlEgQ2hpY2tlblwiLFxuICBcIkNob3Jpem9cIixcbiAgXCJDaGlja2VuIEFuZG91aWxsZVwiLFxuICBcIlNhbGFtaVwiLFxuICBcIlRvZnVcIixcbiAgXCJCYWNvblwiLFxuICBcIkNhbmFkaWFuIEJhY29uXCIsXG4gIFwiUHJvc2N1aXR0b1wiLFxuICBcIkl0YWxpYW4gU2F1c2FnZVwiLFxuICBcIkdyb3VuZCBCZWVmXCIsXG4gIFwiQW5jaG92aWVzXCIsXG4gIFwiVHVya2V5XCIsXG4gIFwiSGFtXCIsXG4gIFwiVmVuaXNvblwiLFxuICBcIkxhbWJcIixcbiAgXCJEdWNrXCIsXG4gIFwiU295bGVudCBHcmVlblwiLFxuICBcIkNhcm5lIEFzYWRhXCIsXG4gIFwiU29wcHJlc3NhdGEgUGljYW50ZVwiLFxuICBcIkNvcHBhXCIsXG4gIFwiUGFuY2V0dGFcIixcbiAgXCJCcmVzb2xhXCIsXG4gIFwiTG94XCIsXG4gIFwiR3VhbmNpYWxlXCIsXG4gIFwiQ2hpbGlcIixcbiAgXCJCZWVmIEplcmt5XCIsXG4gIFwiUGFzdHJhbWlcIixcbiAgXCJLaWVsYmFzYVwiLFxuICBcIlNjYWxsb3BzXCIsXG4gIFwiRmlsZXQgTWlnbm9uXCJcbl07XG5waXp6YUluZ3JlZGllbnRzLm5vbk1lYXRzID0gW1xuICBcIldoaXRlIE9uaW9uc1wiLFxuICBcIlJlZCBPbmlvbnNcIixcbiAgXCJTYXV0ZWVkIE9uaW9uc1wiLFxuICBcIkdyZWVuIFBlcHBlcnNcIixcbiAgXCJSZWQgUGVwcGVyc1wiLFxuICBcIkJhbmFuYSBQZXBwZXJzXCIsXG4gIFwiR2hvc3QgUGVwcGVyc1wiLFxuICBcIkhhYmFuZXJvIFBlcHBlcnNcIixcbiAgXCJKYWxhcGVubyBQZXBwZXJzXCIsXG4gIFwiU3R1ZmZlZCBQZXBwZXJzXCIsXG4gIFwiU3BpbmFjaFwiLFxuICBcIlRvbWF0b2VzXCIsXG4gIFwiUGluZWFwcGxlXCIsXG4gIFwiUGVhciBTbGljZXNcIixcbiAgXCJBcHBsZSBTbGljZXNcIixcbiAgXCJNdXNocm9vbXNcIixcbiAgXCJBcnVndWxhXCIsXG4gIFwiQmFzaWxcIixcbiAgXCJGZW5uZWxcIixcbiAgXCJSb3NlbWFyeVwiLFxuICBcIkNpbGFudHJvXCIsXG4gIFwiQXZvY2Fkb1wiLFxuICBcIkd1YWNhbW9sZVwiLFxuICBcIlNhbHNhXCIsXG4gIFwiU3dpc3MgQ2hhcmRcIixcbiAgXCJLYWxlXCIsXG4gIFwiU3VuIERyaWVkIFRvbWF0b2VzXCIsXG4gIFwiV2FsbnV0c1wiLFxuICBcIkFydGljaG9rZVwiLFxuICBcIkFzcGFyYWd1c1wiLFxuICBcIkNhcmFtZWxpemVkIE9uaW9uc1wiLFxuICBcIk1hbmdvXCIsXG4gIFwiR2FybGljXCIsXG4gIFwiT2xpdmVzXCIsXG4gIFwiQ2F1bGlmbG93ZXJcIixcbiAgXCJQb2xlbnRhXCIsXG4gIFwiRnJpZWQgRWdnXCIsXG4gIFwiWnVjY2hpbmlcIixcbiAgXCJIdW1tdXNcIlxuXTtcbnBpenphSW5ncmVkaWVudHMuY2hlZXNlcyA9IFtcbiAgXCJBbWVyaWNhbiBDaGVlc2VcIixcbiAgXCJTd2lzcyBDaGVlc2VcIixcbiAgXCJHb2F0IENoZWVzZVwiLFxuICBcIk1venphcmVsbGEgQ2hlZXNlXCIsXG4gIFwiUGFybWVzZWFuIENoZWVzZVwiLFxuICBcIlZlbHZlZXRhIENoZWVzZVwiLFxuICBcIkdvdWRhIENoZWVzZVwiLFxuICBcIk11ZW5zdGVyIENoZWVzZVwiLFxuICBcIkFwcGxld29vZCBDaGVlc2VcIixcbiAgXCJBc2lhZ28gQ2hlZXNlXCIsXG4gIFwiQmxldSBDaGVlc2VcIixcbiAgXCJCb3Vyc2luIENoZWVzZVwiLFxuICBcIkJyaWUgQ2hlZXNlXCIsXG4gIFwiQ2hlZGRhciBDaGVlc2VcIixcbiAgXCJDaGV2cmUgQ2hlZXNlXCIsXG4gIFwiSGF2YXJ0aSBDaGVlc2VcIixcbiAgXCJKYWNrIENoZWVzZVwiLFxuICBcIlBlcHBlciBKYWNrIENoZWVzZVwiLFxuICBcIkdydXllcmUgQ2hlZXNlXCIsXG4gIFwiTGltYmVyZ2VyIENoZWVzZVwiLFxuICBcIk1hbmNoZWdvIENoZWVzZVwiLFxuICBcIk1hcnNjYXBvbmUgQ2hlZXNlXCIsXG4gIFwiUGVjb3Jpbm8gQ2hlZXNlXCIsXG4gIFwiUHJvdm9sb25lIENoZWVzZVwiLFxuICBcIlF1ZXNvIENoZWVzZVwiLFxuICBcIlJvcXVlZm9ydCBDaGVlc2VcIixcbiAgXCJSb21hbm8gQ2hlZXNlXCIsXG4gIFwiUmljb3R0YSBDaGVlc2VcIixcbiAgXCJTbW9rZWQgR291ZGFcIlxuXTtcbnBpenphSW5ncmVkaWVudHMuc2F1Y2VzID0gW1xuICBcIlJlZCBTYXVjZVwiLFxuICBcIk1hcmluYXJhXCIsXG4gIFwiQkJRIFNhdWNlXCIsXG4gIFwiTm8gU2F1Y2VcIixcbiAgXCJIb3QgU2F1Y2VcIlxuXTtcbnBpenphSW5ncmVkaWVudHMuY3J1c3RzID0gW1xuICBcIldoaXRlIENydXN0XCIsXG4gIFwiV2hvbGUgV2hlYXQgQ3J1c3RcIixcbiAgXCJGbGF0YnJlYWQgQ3J1c3RcIixcbiAgXCJTdHVmZmVkIENydXN0XCJcbl07XG5cbi8vIE5hbWUgZ2VuZXJhdG9yIHB1bGxlZCBmcm9tIGh0dHA6Ly9zYXR1cmRheWtpZC5jb20vdXNlcm5hbWVzL2dlbmVyYXRvci5odG1sXG4vLyBDYXBpdGFsaXplcyBmaXJzdCBsZXR0ZXIgb2YgZWFjaCB3b3JkXG5TdHJpbmcucHJvdG90eXBlLmNhcGl0YWxpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0aGlzLnNsaWNlKDEpO1xufTtcblxuLy8gUHVsbHMgYWRqZWN0aXZlIG91dCBvZiBhcnJheSB1c2luZyByYW5kb20gbnVtYmVyIHNlbnQgZnJvbSBnZW5lcmF0b3JcbmZ1bmN0aW9uIGdldEFkaih4KXtcbiAgc3dpdGNoKHgpIHtcbiAgICBjYXNlIFwiZGFya1wiOlxuICAgICAgdmFyIGRhcmsgPSBbXCJkYXJrXCIsXCJtb3JiaWRcIiwgXCJzY2FyeVwiLCBcInNwb29reVwiLCBcImdvdGhpY1wiLCBcImRldmlhbnRcIiwgXCJjcmVlcHlcIiwgXCJzYWRpc3RpY1wiLCBcImJsYWNrXCIsIFwiZGFuZ2Vyb3VzXCIsIFwiZGVqZWN0ZWRcIiwgXCJoYXVudGVkXCIsXG4gICAgICBcIm1vcm9zZVwiLCBcInRyYWdpY1wiLCBcInNoYXR0ZXJlZFwiLCBcImJyb2tlblwiLCBcInNhZFwiLCBcIm1lbGFuY2hvbHlcIiwgXCJzb21iZXJcIiwgXCJkYXJrXCIsIFwiZ2xvb215XCIsIFwiaG9taWNpZGFsXCIsIFwibXVyZGVyb3VzXCIsIFwic2hhZHlcIiwgXCJtaXN0eVwiLFxuICAgICAgXCJkdXNreVwiLCBcImdob3N0bHlcIiwgXCJzaGFkb3d5XCIsIFwiZGVtZW50ZWRcIiwgXCJjdXJzZWRcIiwgXCJpbnNhbmVcIiwgXCJwb3NzZXNzZWRcIiwgXCJncm90ZXNxdWVcIiwgXCJvYnNlc3NlZFwiXTtcbiAgICAgIHJldHVybiBkYXJrO1xuICAgIGNhc2UgXCJjb2xvclwiOlxuICAgICAgdmFyIGNvbG9ycyA9IFtcImJsdWVcIiwgXCJncmVlblwiLCBcInB1cnBsZVwiLCBcImdyZXlcIiwgXCJzY2FybGV0XCIsIFwiTmVvbkdyZWVuXCIsIFwiTmVvbkJsdWVcIiwgXCJOZW9uUGlua1wiLCBcIkhvdFBpbmtcIiwgXCJwaW5rXCIsIFwiYmxhY2tcIiwgXCJyZWRcIixcbiAgICAgIFwibWFyb29uXCIsIFwic2lsdmVyXCIsIFwiZ29sZGVuXCIsIFwieWVsbG93XCIsIFwib3JhbmdlXCIsIFwibXVzdGFyZFwiLCBcInBsdW1cIiwgXCJ2aW9sZXRcIiwgXCJjZXJ1bGVhblwiLCBcImJyb3duXCIsIFwibGF2ZW5kZXJcIiwgXCJ2aW9sZXRcIiwgXCJtYWdlbnRhXCIsXG4gICAgICBcImNoZXN0bnV0XCIsIFwicm9zeVwiLCBcImNvcHBlclwiLCBcImNyaW1zb25cIiwgXCJ0ZWFsXCIsIFwiaW5kaWdvXCIsIFwibmF2eVwiLCBcImF6dXJlXCIsIFwicGVyaXdpbmtsZVwiLCBcImJyYXNzeVwiLCBcInZlcmRpZ3Jpc1wiLCBcInZlcmlkaWFuXCIsIFwidGFuXCIsXG4gICAgICBcInJhc3BiZXJyeVwiLCBcImJlaWdlXCIsIFwic2FuZHlcIiwgXCJFbGVjdHJpY0JsdWVcIiwgXCJ3aGl0ZVwiLCBcImNoYW1wYWduZVwiLCBcImNvcmFsXCIsIFwiY3lhblwiXTtcbiAgICAgIHJldHVybiBjb2xvcnM7XG4gICAgY2FzZSBcIndoaW1zaWNhbFwiOlxuICAgICAgdmFyIHdoaW1zeSA9IFtcIndoaW1zaWNhbFwiLCBcInNpbGx5XCIsIFwiZHJ1bmtlblwiLCBcImdvb2Z5XCIsIFwiZnVubnlcIiwgXCJ3ZWlyZFwiLCBcInN0cmFuZ2VcIiwgXCJvZGRcIiwgXCJwbGF5ZnVsXCIsIFwiY2xldmVyXCIsIFwiYm9hc3RmdWxcIiwgXCJicmVha2RhbmNpbmdcIixcbiAgICAgIFwiaGlsYXJpb3VzXCIsIFwiY29uY2VpdGVkXCIsIFwiaGFwcHlcIiwgXCJjb21pY2FsXCIsIFwiY3VyaW91c1wiLCBcInBlY3VsaWFyXCIsIFwicXVhaW50XCIsIFwicXVpcmt5XCIsIFwiZmFuY3lcIiwgXCJ3YXl3YXJkXCIsIFwiZmlja2xlXCIsIFwieWF3bmluZ1wiLCBcInNsZWVweVwiLFxuICAgICAgXCJjb2NrZXllZFwiLCBcImRpenp5XCIsIFwiZGFuY2luZ1wiLCBcImFic3VyZFwiLCBcImxhdWdoaW5nXCIsIFwiaGFpcnlcIiwgXCJzbWlsaW5nXCIsIFwicGVycGxleGVkXCIsIFwiYmFmZmxlZFwiLCBcImNvY2thbWFtaWVcIiwgXCJ2dWxnYXJcIiwgXCJob29kd2lua2VkXCIsXG4gICAgICBcImJyYWlud2FzaGVkXCJdO1xuICAgICAgcmV0dXJuIHdoaW1zeTtcbiAgICBjYXNlIFwic2hpbnlcIjpcbiAgICAgIHZhciBzaGlueSA9IFtcInNhcHBoaXJlXCIsIFwib3BhbFwiLCBcInNpbHZlclwiLCBcImdvbGRcIiwgXCJwbGF0aW51bVwiLCBcInJ1YnlcIiwgXCJlbWVyYWxkXCIsIFwidG9wYXpcIiwgXCJkaWFtb25kXCIsIFwiYW1ldGh5c3RcIiwgXCJ0dXJxdW9pc2VcIixcbiAgICAgIFwic3RhcmxpdFwiLCBcIm1vb25saXRcIiwgXCJicm9uemVcIiwgXCJtZXRhbFwiLCBcImphZGVcIiwgXCJhbWJlclwiLCBcImdhcm5ldFwiLCBcIm9ic2lkaWFuXCIsIFwib255eFwiLCBcInBlYXJsXCIsIFwiY29wcGVyXCIsIFwic3VubGl0XCIsIFwiYnJhc3NcIiwgXCJicmFzc3lcIixcbiAgICAgIFwibWV0YWxsaWNcIl07XG4gICAgICByZXR1cm4gc2hpbnk7XG4gICAgY2FzZSBcIm5vaXN5XCI6XG4gICAgICB2YXIgbm9pc3kgPSBbXCJ1bnR1bmVkXCIsIFwibG91ZFwiLCBcInNvZnRcIiwgXCJzaHJpZWtpbmdcIiwgXCJtZWxvZGlvdXNcIiwgXCJtdXNpY2FsXCIsIFwib3BlcmF0aWNcIiwgXCJzeW1waG9uaWNcIiwgXCJkYW5jaW5nXCIsIFwibHlyaWNhbFwiLCBcImhhcm1vbmljXCIsXG4gICAgICBcIm9yY2hlc3RyYWxcIiwgXCJub2lzeVwiLCBcImRpc3NvbmFudFwiLCBcInJoeXRobWljXCIsIFwiaGlzc2luZ1wiLCBcInNpbmdpbmdcIiwgXCJjcm9vbmluZ1wiLCBcInNob3V0aW5nXCIsIFwic2NyZWFtaW5nXCIsIFwid2FpbGluZ1wiLCBcImNyeWluZ1wiLCBcImhvd2xpbmdcIixcbiAgICAgIFwieWVsbGluZ1wiLCBcImhvbGxlcmluZ1wiLCBcImNhdGVyd2F1bGluZ1wiLCBcImJhd2xpbmdcIiwgXCJiZWxsb3dpbmdcIiwgXCJyb2FyaW5nXCIsIFwic3F1ZWFsaW5nXCIsIFwiYmVlcGluZ1wiLCBcImtub2NraW5nXCIsIFwidGFwcGluZ1wiLCBcInJhcHBpbmdcIixcbiAgICAgIFwiaHVtbWluZ1wiLCBcInNjYXR0aW5nXCIsIFwid2hpc3BlcmVkXCIsIFwid2hpc3BlcmluZ1wiLCBcInJhc3BpbmdcIiwgXCJidXp6aW5nXCIsIFwid2hpcnJpbmdcIiwgXCJ3aGlzdGxpbmdcIiwgXCJ3aGlzdGxlZFwiXTtcbiAgICAgIHJldHVybiBub2lzeTtcbiAgICBjYXNlIFwiYXBvY2FseXB0aWNcIjpcbiAgICAgIHZhciBhcG9jYWx5cHRpYyA9IFtcIm51Y2xlYXJcIiwgXCJhcG9jYWx5cHRpY1wiLCBcImRlc29sYXRlXCIsIFwiYXRvbWljXCIsIFwiem9tYmllXCIsIFwiY29sbGFwc2VkXCIsIFwiZ3JpbVwiLCBcImZhbGxlblwiLCBcImNvbGxhcHNlZFwiLCBcImNhbm5pYmFsaXN0aWNcIixcbiAgICAgIFwicmFkaW9hY3RpdmVcIiwgXCJ0b3hpY1wiLCBcInBvaXNvbm91c1wiLCBcInZlbm9tb3VzXCIsIFwiZGlzYXN0cm91c1wiLCBcImdyaW15XCIsIFwiZGlydHlcIiwgXCJ1bmRlYWRcIiwgXCJibG9vZHNob3RcIiwgXCJydXN0eVwiLCBcImdsb3dpbmdcIiwgXCJkZWNheWluZ1wiLFxuICAgICAgXCJyb3R0ZW5cIiwgXCJkZWFkbHlcIiwgXCJwbGFndWVkXCIsIFwiZGVjaW1hdGVkXCIsIFwicm90dGluZ1wiLCBcInB1dHJpZFwiLCBcImRlY2F5ZWRcIiwgXCJkZXNlcnRlZFwiLCBcImFjaWRpY1wiXTtcbiAgICAgIHJldHVybiBhcG9jYWx5cHRpYztcbiAgICBjYXNlIFwiaW5zdWx0aW5nXCI6XG4gICAgICB2YXIgaW5zdWx0aW5nID0gW1wic3R1cGlkXCIsIFwiaWRpb3RpY1wiLCBcImZhdFwiLCBcInVnbHlcIiwgXCJoaWRlb3VzXCIsIFwiZ3JvdGVzcXVlXCIsIFwiZHVsbFwiLCBcImR1bWJcIiwgXCJsYXp5XCIsIFwic2x1Z2dpc2hcIiwgXCJicmFpbmxlc3NcIiwgXCJzbG93XCIsXG4gICAgICBcImd1bGxpYmxlXCIsIFwib2J0dXNlXCIsIFwiZGVuc2VcIiwgXCJkaW1cIiwgXCJkYXplZFwiLCBcInJpZGljdWxvdXNcIiwgXCJ3aXRsZXNzXCIsIFwiZGFmdFwiLCBcImNyYXp5XCIsIFwidmFwaWRcIiwgXCJpbmFuZVwiLCBcIm11bmRhbmVcIiwgXCJob2xsb3dcIiwgXCJ2YWN1b3VzXCIsXG4gICAgICBcImJvcmluZ1wiLCBcImluc2lwaWRcIiwgXCJ0ZWRpb3VzXCIsIFwibW9ub3Rvbm91c1wiLCBcIndlaXJkXCIsIFwiYml6YXJyZVwiLCBcImJhY2t3YXJkXCIsIFwibW9yb25pY1wiLCBcImlnbm9yYW50XCIsIFwic2NhdHRlcmJyYWluZWRcIiwgXCJmb3JnZXRmdWxcIiwgXCJjYXJlbGVzc1wiLFxuICAgICAgXCJsZXRoYXJnaWNcIiwgXCJpbnNvbGVudFwiLCBcImluZG9sZW50XCIsIFwibG9pdGVyaW5nXCIsIFwiZ3Jvc3NcIiwgXCJkaXNndXN0aW5nXCIsIFwiYmxhbmRcIiwgXCJob3JyaWRcIiwgXCJ1bnNlZW1seVwiLCBcInJldm9sdGluZ1wiLCBcImhvbWVseVwiLCBcImRlZm9ybWVkXCIsXG4gICAgICBcImRpc2ZpZ3VyZWRcIiwgXCJvZmZlbnNpdmVcIiwgXCJjb3dhcmRseVwiLCBcIndlYWtcIiwgXCJ2aWxsYWlub3VzXCIsIFwiZmVhcmZ1bFwiLCBcIm1vbnN0cm91c1wiLCBcInVuYXR0cmFjdGl2ZVwiLCBcInVucGxlYXNhbnRcIiwgXCJuYXN0eVwiLCBcImJlYXN0bHlcIiwgXCJzbmlkZVwiLFxuICAgICAgXCJob3JyaWJsZVwiLCBcInN5bmNvcGhhbnRpY1wiLCBcInVuaGVscGZ1bFwiLCBcImJvb3RsaWNraW5nXCJdO1xuICAgICAgcmV0dXJuIGluc3VsdGluZztcbiAgICBjYXNlIFwicHJhaXNlXCI6XG4gICAgICB2YXIgcHJhaXNlID0gW1wiYmVhdXRpZnVsXCIsIFwiaW50ZWxsaWdlbnRcIiwgXCJzbWFydFwiLCBcImdlbml1c1wiLCBcImluZ2VuaW91c1wiLCBcImdvcmdlb3VzXCIsIFwicHJldHR5XCIsIFwid2l0dHlcIiwgXCJhbmdlbGljXCIsIFwiaGFuZHNvbWVcIiwgXCJncmFjZWZ1bFwiLFxuICAgICAgXCJ0YWxlbnRlZFwiLCBcImV4cXVpc2l0ZVwiLCBcImVuY2hhbnRpbmdcIiwgXCJmYXNjaW5hdGluZ1wiLCBcImludGVyZXN0aW5nXCIsIFwiZGl2aW5lXCIsIFwiYWxsdXJpbmdcIiwgXCJyYXZpc2hpbmdcIiwgXCJ3b25kZXJmdWxcIiwgXCJtYWduaWZpY2llbnRcIiwgXCJtYXJ2ZWxvdXNcIixcbiAgICAgIFwiZGF6emxpbmdcIiwgXCJjdXRlXCIsIFwiY2hhcm1pbmdcIiwgXCJhdHRyYWN0aXZlXCIsIFwibmlmdHlcIiwgXCJkZWxpZ2h0ZnVsXCIsIFwic3VwZXJpb3JcIiwgXCJhbWlhYmxlXCIsIFwiZ2VudGxlXCIsIFwiaGVyb2ljXCIsIFwiY291cmFnZW91c1wiLCBcInZhbGlhbnRcIiwgXCJicmF2ZVwiLFxuICAgICAgXCJub2JsZVwiLCBcImRhcmluZ1wiLCBcImZlYXJsZXNzXCIsIFwiZ2FsbGFudFwiLCBcImFkdmVudHVyb3VzXCIsIFwiY29vbFwiLCBcImVudGh1c2lhc3RpY1wiLCBcImZpZXJjZVwiLCBcImF3ZXNvbWVcIiwgXCJyYWRpY2FsXCIsIFwidHVidWxhclwiLCBcImZlYXJzb21lXCIsXG4gICAgICBcIm1hamVzdGljXCIsIFwiZ3JhbmRcIiwgXCJzdHVubmluZ1wiXTtcbiAgICAgIHJldHVybiBwcmFpc2U7XG4gICAgY2FzZSBcInNjaWVudGlmaWNcIjpcbiAgICAgIHZhciBzY2llbnRpZmljID0gW1wic2NpZW50aWZpY1wiLCBcInRlY2huaWNhbFwiLCBcImRpZ2l0YWxcIiwgXCJwcm9ncmFtbWluZ1wiLCBcImNhbGN1bGF0aW5nXCIsIFwiZm9ybXVsYXRpbmdcIiwgXCJjeWJlcnB1bmtcIiwgXCJtZWNoYW5pY2FsXCIsIFwidGVjaG5vbG9naWNhbFwiLFxuICAgICAgXCJpbm5vdmF0aXZlXCIsIFwiYnJhaW55XCIsIFwiY2hlbWljYWxcIiwgXCJxdWFudHVtXCIsIFwiYXN0cm9cIiwgXCJzcGFjZVwiLCBcInRoZW9yZXRpY2FsXCIsIFwiYXRvbWljXCIsIFwiZWxlY3Ryb25pY1wiLCBcImdhc2VvdXNcIiwgXCJpbnZlc3RpZ2F0aXZlXCIsIFwic29sYXJcIixcbiAgICAgIFwiZXh0aW5jdFwiLCBcImdhbGFjdGljXCJdO1xuICAgICAgcmV0dXJuIHNjaWVudGlmaWM7XG4gICAgZGVmYXVsdDpcbiAgICAgIHZhciBzY2llbnRpZmljX2RlZmF1bHQgPSBbXCJzY2llbnRpZmljXCIsIFwidGVjaG5pY2FsXCIsIFwiZGlnaXRhbFwiLCBcInByb2dyYW1taW5nXCIsIFwiY2FsY3VsYXRpbmdcIiwgXCJmb3JtdWxhdGluZ1wiLCBcImN5YmVycHVua1wiLCBcIm1lY2hhbmljYWxcIiwgXCJ0ZWNobm9sb2dpY2FsXCIsXG4gICAgICBcImlubm92YXRpdmVcIiwgXCJicmFpbnlcIiwgXCJjaGVtaWNhbFwiLCBcInF1YW50dW1cIiwgXCJhc3Ryb1wiLCBcInNwYWNlXCIsIFwidGhlb3JldGljYWxcIiwgXCJhdG9taWNcIiwgXCJlbGVjdHJvbmljXCIsIFwiZ2FzZW91c1wiLCBcImludmVzdGlnYXRpdmVcIiwgXCJzb2xhclwiLFxuICAgICAgXCJleHRpbmN0XCIsIFwiZ2FsYWN0aWNcIl07XG4gICAgICByZXR1cm4gc2NpZW50aWZpY19kZWZhdWx0O1xuICB9XG59XG5cbi8vIFB1bGxzIG5vdW4gb3V0IG9mIGFycmF5IHVzaW5nIHJhbmRvbSBudW1iZXIgc2VudCBmcm9tIGdlbmVyYXRvclxuZnVuY3Rpb24gZ2V0Tm91bih5KSB7XG4gIHN3aXRjaCh5KSB7XG4gICAgY2FzZSBcImFuaW1hbHNcIjpcbiAgICAgIHZhciBhbmltYWxzID0gW1wiZmxhbWluZ29cIiwgXCJoZWRnZWhvZ1wiLCBcIm93bFwiLCBcImVsZXBoYW50XCIsIFwicHVzc3ljYXRcIiwgXCJhbGxpZ2F0b3JcIiwgXCJkYWNoc3VuZFwiLCBcInBvb2RsZVwiLCBcImJlYWdsZVwiLCBcImNyb2NvZGlsZVwiLCBcImthbmdhcm9vXCIsXG4gICAgICBcIndhbGxhYnlcIiwgXCJ3b29kcGVja2VyXCIsIFwiZWFnbGVcIiwgXCJmYWxjb25cIiwgXCJjYW5hcnlcIiwgXCJwYXJyb3RcIiwgXCJwYXJha2VldFwiLCBcImhhbXN0ZXJcIiwgXCJnZXJiaWxcIiwgXCJzcXVpcnJlbFwiLCBcInJhdFwiLCBcImRvdmVcIiwgXCJ0b3VjYW5cIixcbiAgICAgIFwicmFjY29vblwiLCBcInZ1bHR1cmVcIiwgXCJwZWFjb2NrXCIsIFwiZ29sZGZpc2hcIiwgXCJyb29rXCIsIFwia29hbGFcIiwgXCJza3Vua1wiLCBcImdvYXRcIiwgXCJyb29zdGVyXCIsIFwiZm94XCIsIFwicG9yY3VwaW5lXCIsIFwibGxhbWFcIiwgXCJncmFzc2hvcHBlclwiLFxuICAgICAgXCJnb3JpbGxhXCIsIFwibW9ua2V5XCIsIFwic2VhaG9yc2VcIiwgXCJ3b21iYXRcIiwgXCJ3b2xmXCIsIFwiZ2lyYWZmZVwiLCBcImJhZGdlclwiLCBcImxpb25cIiwgXCJtb3VzZVwiLCBcImJlZXRsZVwiLCBcImNyaWNrZXRcIiwgXCJuaWdodGluZ2FsZVwiLFxuICAgICAgXCJoYXdrXCIsIFwidHJvdXRcIiwgXCJzcXVpZFwiLCBcIm9jdG9wdXNcIiwgXCJzbG90aFwiLCBcInNuYWlsXCIsIFwibG9jdXN0XCIsIFwiYmFib29uXCIsIFwibGVtdXJcIiwgXCJtZWVya2F0XCIsIFwib3lzdGVyXCIsIFwiZnJvZ1wiLCBcInRvYWRcIiwgXCJqZWxseWZpc2hcIixcbiAgICAgIFwiYnV0dGVyZmx5XCIsIFwiY2F0ZXJwaWxsYXJcIiwgXCJ0aWdlclwiLCBcImh5ZW5hXCIsIFwiemVicmFcIiwgXCJzbmFpbFwiLCBcInBpZ1wiLCBcIndlYXNlbFwiLCBcImRvbmtleVwiLCBcInBlbmd1aW5cIiwgXCJjcmFuZVwiLCBcImJ1enphcmRcIiwgXCJ2dWx0dXJlXCIsXG4gICAgICBcInJoaW5vXCIsIFwiaGlwcG9wb3RhbXVzXCIsIFwiZG9scGhpblwiLCBcInNwYXJyb3dcIiwgXCJiZWF2ZXJcIiwgXCJtb29zZVwiLCBcIm1pbm5vd1wiLCBcIm90dGVyXCIsIFwiYmF0XCIsIFwibW9uZ29vc2VcIiwgXCJzd2FuXCIsIFwiZmlyZWZseVwiLCBcInBsYXR5cHVzXCJdO1xuICAgICAgcmV0dXJuIGFuaW1hbHM7XG4gICAgY2FzZSBcInByb2Zlc3Npb25cIjpcbiAgICAgIHZhciBwcm9mZXNzaW9ucyA9IFtcImRvY3RvclwiLCBcImxhd3llclwiLCBcIm5pbmphXCIsIFwid3JpdGVyXCIsIFwic2FtdXJhaVwiLCBcInN1cmdlb25cIiwgXCJjbGVya1wiLCBcImFydGlzdFwiLCBcImFjdG9yXCIsIFwiZW5naW5lZXJcIiwgXCJtZWNoYW5pY1wiLFxuICAgICAgXCJjb21lZGlhblwiLCBcImZpcmVtYW5cIiwgXCJudXJzZVwiLCBcIlJvY2tTdGFyXCIsIFwibXVzaWNpYW5cIiwgXCJjYXJwZW50ZXJcIiwgXCJwbHVtYmVyXCIsIFwiY2FzaGllclwiLCBcImVsZWN0cmljaWFuXCIsIFwid2FpdGVyXCIsIFwicHJlc2lkZW50XCIsIFwiZ292ZXJub3JcIixcbiAgICAgIFwic2VuYXRvclwiLCBcInNjaWVudGlzdFwiLCBcInByb2dyYW1tZXJcIiwgXCJzaW5nZXJcIiwgXCJkYW5jZXJcIiwgXCJkaXJlY3RvclwiLCBcIm1heW9yXCIsIFwibWVyY2hhbnRcIiwgXCJkZXRlY3RpdmVcIiwgXCJpbnZlc3RpZ2F0b3JcIiwgXCJuYXZpZ2F0b3JcIiwgXCJwaWxvdFwiLFxuICAgICAgXCJwcmllc3RcIiwgXCJjb3dib3lcIiwgXCJzdGFnZWhhbmRcIiwgXCJzb2xkaWVyXCIsIFwiYW1iYXNzYWRvclwiLCBcInBpcmF0ZVwiLCBcIm1pbmVyXCIsIFwicG9saWNlXCJdO1xuICAgICAgcmV0dXJuIHByb2Zlc3Npb25zO1xuICAgIGNhc2UgXCJmYW50YXN5XCI6XG4gICAgICB2YXIgZmFudGFzeSA9IFtcImNlbnRhdXJcIiwgXCJ3aXphcmRcIiwgXCJnbm9tZVwiLCBcIm9yY1wiLCBcInRyb2xsXCIsIFwic3dvcmRcIiwgXCJmYWlyeVwiLCBcInBlZ2FzdXNcIiwgXCJoYWxmbGluZ1wiLCBcImVsZlwiLCBcImNoYW5nZWxpbmdcIiwgXCJnaG9zdFwiLFxuICAgICAgXCJrbmlnaHRcIiwgXCJzcXVpcmVcIiwgXCJtYWdpY2lhblwiLCBcIndpdGNoXCIsIFwid2FybG9ja1wiLCBcInVuaWNvcm5cIiwgXCJkcmFnb25cIiwgXCJ3eXZlcm5cIiwgXCJwcmluY2Vzc1wiLCBcInByaW5jZVwiLCBcImtpbmdcIiwgXCJxdWVlblwiLCBcImplc3RlclwiLFxuICAgICAgXCJ0b3dlclwiLCBcImNhc3RsZVwiLCBcImtyYWtlblwiLCBcInNlYW1vbnN0ZXJcIiwgXCJtZXJtYWlkXCIsIFwicHN5Y2hpY1wiLCBcInNlZXJcIiwgXCJvcmFjbGVcIl07XG4gICAgICByZXR1cm4gZmFudGFzeTtcbiAgICBjYXNlIFwibXVzaWNcIjpcbiAgICAgIHZhciBtdXNpYyA9IFtcInZpb2xpblwiLCBcImZsdXRlXCIsIFwiYmFncGlwZVwiLCBcImd1aXRhclwiLCBcInN5bXBob255XCIsIFwib3JjaGVzdHJhXCIsIFwicGlhbm9cIiwgXCJ0cm9tYm9uZVwiLCBcInR1YmFcIiwgXCJvcGVyYVwiLCBcImRydW1zXCIsXG4gICAgICBcImhhcnBzaWNob3JkXCIsIFwiaGFycFwiLCBcImhhcm1vbmljYVwiLCBcImFjY29yZGlvblwiLCBcInRlbm9yXCIsIFwic29wcmFub1wiLCBcImJhcml0b25lXCIsIFwiY2VsbG9cIiwgXCJ2aW9sYVwiLCBcInBpY2NvbG9cIiwgXCJ1a2VsZWxlXCIsIFwid29vZHdpbmRcIiwgXCJzYXhvcGhvbmVcIixcbiAgICAgIFwiYnVnbGVcIiwgXCJ0cnVtcGV0XCIsIFwic291c2FwaG9uZVwiLCBcImNvcm5ldFwiLCBcInN0cmFkaXZhcml1c1wiLCBcIm1hcmltYmFzXCIsIFwiYmVsbHNcIiwgXCJ0aW1wYW5pXCIsIFwiYm9uZ29zXCIsIFwiY2xhcmluZXRcIiwgXCJyZWNvcmRlclwiLCBcIm9ib2VcIiwgXCJjb25kdWN0b3JcIixcbiAgICAgIFwic2luZ2VyXCJdO1xuICAgICAgcmV0dXJuIG11c2ljO1xuICAgIGNhc2UgXCJob3Jyb3JcIjpcbiAgICAgIHZhciBob3Jyb3IgPSBbXCJtdXJkZXJlclwiLCBcImNoYWluc2F3XCIsIFwia25pZmVcIiwgXCJzd29yZFwiLCBcIm11cmRlclwiLCBcImRldmlsXCIsIFwia2lsbGVyXCIsIFwicHN5Y2hvXCIsIFwiZ2hvc3RcIiwgXCJtb25zdGVyXCIsIFwiZ29kemlsbGFcIiwgXCJ3ZXJld29sZlwiLFxuICAgICAgXCJ2YW1waXJlXCIsIFwiZGVtb25cIiwgXCJncmF2ZXlhcmRcIiwgXCJ6b21iaWVcIiwgXCJtdW1teVwiLCBcImN1cnNlXCIsIFwiZGVhdGhcIiwgXCJncmF2ZVwiLCBcInRvbWJcIiwgXCJiZWFzdFwiLCBcIm5pZ2h0bWFyZVwiLCBcImZyYW5rZW5zdGVpblwiLCBcInNwZWN0ZXJcIixcbiAgICAgIFwicG9sdGVyZ2Vpc3RcIiwgXCJ3cmFpdGhcIiwgXCJjb3Jwc2VcIiwgXCJzY3JlYW1cIiwgXCJtYXNzYWNyZVwiLCBcImNhbm5pYmFsXCIsIFwic2t1bGxcIiwgXCJib25lc1wiLCBcInVuZGVydGFrZXJcIiwgXCJ6b21iaWVcIiwgXCJjcmVhdHVyZVwiLCBcIm1hc2tcIiwgXCJwc3ljaG9wYXRoXCIsXG4gICAgICBcImZpZW5kXCIsIFwic2F0YW5pc3RcIiwgXCJtb29uXCIsIFwiZnVsbE1vb25cIl07XG4gICAgICByZXR1cm4gaG9ycm9yO1xuICAgIGNhc2UgXCJncm9zc1wiOlxuICAgICAgdmFyIGdyb3NzID0gW1wic2xpbWVcIiwgXCJidWdcIiwgXCJyb2FjaFwiLCBcImZsdWlkXCIsIFwicHVzXCIsIFwiYm9vZ2VyXCIsIFwic3BpdFwiLCBcImJvaWxcIiwgXCJibGlzdGVyXCIsIFwib3JpZmljZVwiLCBcInNlY3JldGlvblwiLCBcIm11Y3VzXCIsIFwicGhsZWdtXCIsXG4gICAgICBcImNlbnRpcGVkZVwiLCBcImJlZXRsZVwiLCBcImZhcnRcIiwgXCJzbm90XCIsIFwiY3JldmljZVwiLCBcImZsYXR1bGVuY2VcIiwgXCJqdWljZVwiLCBcIm1vbGRcIiwgXCJtaWxkZXdcIiwgXCJnZXJtc1wiLCBcImRpc2NoYXJnZVwiLCBcInRvaWxldFwiLCBcInVkZGVyXCIsIFwib2RvclwiLCBcInN1YnN0YW5jZVwiLFxuICAgICAgXCJmbHVpZFwiLCBcIm1vaXN0dXJlXCIsIFwiZ2FyYmFnZVwiLCBcInRyYXNoXCIsIFwiYnVnXCJdO1xuICAgICAgcmV0dXJuIGdyb3NzO1xuICAgIGNhc2UgXCJldmVyeWRheVwiOlxuICAgICAgdmFyIGV2ZXJ5ZGF5ID0gW1wibWlycm9yXCIsIFwia25pZmVcIiwgXCJmb3JrXCIsIFwic3BvcmtcIiwgXCJzcG9vblwiLCBcInR1cHBlcndhcmVcIiwgXCJtaW5pdmFuXCIsIFwic3VidXJiXCIsIFwibGFtcFwiLCBcImRlc2tcIiwgXCJzdGVyZW9cIiwgXCJ0ZWxldmlzaW9uXCIsIFwiVFZcIixcbiAgICAgIFwiYm9va1wiLCBcImNhclwiLCBcInRydWNrXCIsIFwic29kYVwiLCBcImRvb3JcIiwgXCJ2aWRlb1wiLCBcImdhbWVcIiwgXCJjb21wdXRlclwiLCBcImNhbGVuZGVyXCIsIFwidHJlZVwiLCBcInBsYW50XCIsIFwiZmxvd2VyXCIsIFwiY2hpbW5leVwiLCBcImF0dGljXCIsIFwia2l0Y2hlblwiLFxuICAgICAgXCJnYXJkZW5cIiwgXCJzY2hvb2xcIiwgXCJ3YWxsZXRcIiwgXCJib3R0bGVcIl07XG4gICAgICByZXR1cm4gZXZlcnlkYXk7XG4gICAgY2FzZSBcImpld2VscnlcIjpcbiAgICAgIHZhciBqZXdlbHJ5ID0gW1wiZWFycmluZ3NcIiwgXCJyaW5nXCIsIFwibmVja2xhY2VcIiwgXCJwZW5kYW50XCIsIFwiY2hva2VyXCIsIFwiYnJvb2NoXCIsIFwiYnJhY2VsZXRcIiwgXCJjYW1lb1wiLCBcImNoYXJtXCIsIFwiYmF1YmxlXCIsIFwidHJpbmtldFwiLCBcImpld2VscnlcIixcbiAgICAgIFwiYW5rbGV0XCIsIFwiYmFuZ2xlXCIsIFwibG9ja2V0XCIsIFwiZmluZXJ5XCIsIFwiY3Jvd25cIiwgXCJ0aWFyYVwiLCBcImJsaW5nQmxpbmdcIiwgXCJjaGFpblwiLCBcInJvc2FyeVwiLCBcImpld2VsXCIsIFwiZ2Vtc3RvbmVcIiwgXCJiZWFkc1wiLCBcImFybWJhbmRcIiwgXCJwaW5cIixcbiAgICAgIFwiY29zdHVtZVwiLCBcIm9ybmFtZW50XCIsIFwidHJlYXN1cmVcIl07XG4gICAgICByZXR1cm4gamV3ZWxyeTtcbiAgICBjYXNlIFwicGxhY2VzXCI6XG4gICAgICB2YXIgcGxhY2VzID0gW1wic3dhbXBcIiwgXCJncmF2ZXlhcmRcIiwgXCJjZW1ldGVyeVwiLCBcInBhcmtcIiwgXCJidWlsZGluZ1wiLCBcImhvdXNlXCIsIFwicml2ZXJcIiwgXCJvY2VhblwiLCBcInNlYVwiLCBcImZpZWxkXCIsIFwiZm9yZXN0XCIsIFwid29vZHNcIiwgXCJuZWlnaGJvcmhvb2RcIixcbiAgICAgIFwiY2l0eVwiLCBcInRvd25cIiwgXCJzdWJ1cmJcIiwgXCJjb3VudHJ5XCIsIFwibWVhZG93XCIsIFwiY2xpZmZzXCIsIFwibGFrZVwiLCBcInN0cmVhbVwiLCBcImNyZWVrXCIsIFwic2Nob29sXCIsIFwiY29sbGVnZVwiLCBcInVuaXZlcnNpdHlcIiwgXCJsaWJyYXJ5XCIsIFwiYmFrZXJ5XCIsXG4gICAgICBcInNob3BcIiwgXCJzdG9yZVwiLCBcInRoZWF0ZXJcIiwgXCJnYXJkZW5cIiwgXCJjYW55b25cIiwgXCJoaWdod2F5XCIsIFwicmVzdGF1cmFudFwiLCBcImNhZmVcIiwgXCJkaW5lclwiLCBcInN0cmVldFwiLCBcInJvYWRcIiwgXCJmcmVld2F5XCIsIFwiYWxsZXlcIl07XG4gICAgICByZXR1cm4gcGxhY2VzO1xuICAgIGNhc2UgXCJzY2lmaVwiOlxuICAgICAgdmFyIHNjaWZpID0gW1wicm9ib3RcIiwgXCJhbGllblwiLCBcInJheWd1blwiLCBcInNwYWNlc2hpcFwiLCBcIlVGT1wiLCBcInJvY2tldFwiLCBcInBoYXNlclwiLCBcImFzdHJvbmF1dFwiLCBcInNwYWNlbWFuXCIsIFwicGxhbmV0XCIsIFwic3RhclwiLCBcImdhbGF4eVwiLFxuICAgICAgXCJjb21wdXRlclwiLCBcImZ1dHVyZVwiLCBcInRpbWVNYWNoaW5lXCIsIFwid29ybUhvbGVcIiwgXCJ0aW1lVHJhdmVsZXJcIiwgXCJzY2llbnRpc3RcIiwgXCJpbnZlbnRpb25cIiwgXCJtYXJ0aWFuXCIsIFwicGx1dG9cIiwgXCJqdXBpdGVyXCIsIFwic2F0dXJuXCIsIFwibWFyc1wiLFxuICAgICAgXCJxdWFzYXJcIiwgXCJibGFja0hvbGVcIiwgXCJ3YXJwRHJpdmVcIiwgXCJsYXNlclwiLCBcIm9yYml0XCIsIFwiZ2VhcnNcIiwgXCJtb2xlY3VsZVwiLCBcImVsZWN0cm9uXCIsIFwibmV1dHJpbm9cIiwgXCJwcm90b25cIiwgXCJleHBlcmltZW50XCIsIFwicGhvdG9uXCIsIFwiYXBwYXJhdHVzXCIsXG4gICAgICBcInVuaXZlcnNlXCIsIFwiZ3Jhdml0eVwiLCBcImRhcmtNYXR0ZXJcIiwgXCJjb25zdGVsbGF0aW9uXCIsIFwiY2lyY3VpdFwiLCBcImFzdGVyb2lkXCJdO1xuICAgICAgcmV0dXJuIHNjaWZpO1xuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgc2NpZmlfZGVmYXVsdCA9IFtcInJvYm90XCIsIFwiYWxpZW5cIiwgXCJyYXlndW5cIiwgXCJzcGFjZXNoaXBcIiwgXCJVRk9cIiwgXCJyb2NrZXRcIiwgXCJwaGFzZXJcIiwgXCJhc3Ryb25hdXRcIiwgXCJzcGFjZW1hblwiLCBcInBsYW5ldFwiLCBcInN0YXJcIiwgXCJnYWxheHlcIixcbiAgICAgIFwiY29tcHV0ZXJcIiwgXCJmdXR1cmVcIiwgXCJ0aW1lTWFjaGluZVwiLCBcIndvcm1Ib2xlXCIsIFwidGltZVRyYXZlbGVyXCIsIFwic2NpZW50aXN0XCIsIFwiaW52ZW50aW9uXCIsIFwibWFydGlhblwiLCBcInBsdXRvXCIsIFwianVwaXRlclwiLCBcInNhdHVyblwiLCBcIm1hcnNcIixcbiAgICAgIFwicXVhc2FyXCIsIFwiYmxhY2tIb2xlXCIsIFwid2FycERyaXZlXCIsIFwibGFzZXJcIiwgXCJvcmJpdFwiLCBcImdlYXJzXCIsIFwibW9sZWN1bGVcIiwgXCJlbGVjdHJvblwiLCBcIm5ldXRyaW5vXCIsIFwicHJvdG9uXCIsIFwiZXhwZXJpbWVudFwiLCBcInBob3RvblwiLCBcImFwcGFyYXR1c1wiLFxuICAgICAgXCJ1bml2ZXJzZVwiLCBcImdyYXZpdHlcIiwgXCJkYXJrTWF0dGVyXCIsIFwiY29uc3RlbGxhdGlvblwiLCBcImNpcmN1aXRcIiwgXCJhc3Rlcm9pZFwiXTtcbiAgICAgIHJldHVybiBzY2lmaV9kZWZhdWx0O1xuICB9XG59XG5cbnZhciBhZGplY3RpdmVzID0gW1wiZGFya1wiLCBcImNvbG9yXCIsIFwid2hpbXNpY2FsXCIsIFwic2hpbnlcIiwgXCJub2lzZVwiLCBcImFwb2NhbHlwdGljXCIsIFwiaW5zdWx0aW5nXCIsIFwicHJhaXNlXCIsIFwic2NpZW50aWZpY1wiXTsgIC8vIHR5cGVzIG9mIGFkamVjdGl2ZXMgZm9yIHBpenphIHRpdGxlc1xudmFyIG5vdW5zID0gW1wiYW5pbWFsc1wiLCBcImV2ZXJ5ZGF5XCIsIFwiZmFudGFzeVwiLCBcImdyb3NzXCIsIFwiaG9ycm9yXCIsIFwiamV3ZWxyeVwiLCBcInBsYWNlc1wiLCBcInNjaWZpXCJdOyAgICAgICAgICAgICAgICAgICAgICAgIC8vIHR5cGVzIG9mIG5vdW5zIGZvciBwaXp6YSB0aXRsZXNcblxuLy8gR2VuZXJhdGVzIHJhbmRvbSBudW1iZXJzIGZvciBnZXRBZGogYW5kIGdldE5vdW4gZnVuY3Rpb25zIGFuZCByZXR1cm5zIGEgbmV3IHBpenphIG5hbWVcbmZ1bmN0aW9uIGdlbmVyYXRvcihhZGosIG5vdW4pIHtcbiAgdmFyIGFkamVjdGl2ZXMgPSBnZXRBZGooYWRqKTtcbiAgdmFyIG5vdW5zID0gZ2V0Tm91bihub3VuKTtcbiAgdmFyIHJhbmRvbUFkamVjdGl2ZSA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiBhZGplY3RpdmVzLmxlbmd0aCk7XG4gIHZhciByYW5kb21Ob3VuID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIG5vdW5zLmxlbmd0aCk7XG4gIHZhciBuYW1lID0gXCJUaGUgXCIgKyBhZGplY3RpdmVzW3JhbmRvbUFkamVjdGl2ZV0uY2FwaXRhbGl6ZSgpICsgXCIgXCIgKyBub3Vuc1tyYW5kb21Ob3VuXS5jYXBpdGFsaXplKCk7XG4gIHJldHVybiBuYW1lO1xufVxuXG4vLyBDaG9vc2VzIHJhbmRvbSBhZGplY3RpdmUgYW5kIHJhbmRvbSBub3VuXG5mdW5jdGlvbiByYW5kb21OYW1lKCkge1xuICB2YXIgcmFuZG9tTnVtYmVyQWRqID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIGFkamVjdGl2ZXMubGVuZ3RoKTtcbiAgdmFyIHJhbmRvbU51bWJlck5vdW4gPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogbm91bnMubGVuZ3RoKTtcbiAgcmV0dXJuIGdlbmVyYXRvcihhZGplY3RpdmVzW3JhbmRvbU51bWJlckFkal0sIG5vdW5zW3JhbmRvbU51bWJlck5vdW5dKTtcbn1cblxuLy8gVGhlc2UgZnVuY3Rpb25zIHJldHVybiBhIHN0cmluZyBvZiBhIHJhbmRvbSBpbmdyZWRpZW50IGZyb20gZWFjaCByZXNwZWN0aXZlIGNhdGVnb3J5IG9mIGluZ3JlZGllbnRzLlxudmFyIHNlbGVjdFJhbmRvbU1lYXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJhbmRvbU1lYXQgPSBwaXp6YUluZ3JlZGllbnRzLm1lYXRzW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiBwaXp6YUluZ3JlZGllbnRzLm1lYXRzLmxlbmd0aCkpXTtcbiAgcmV0dXJuIHJhbmRvbU1lYXQ7XG59O1xuXG52YXIgc2VsZWN0UmFuZG9tTm9uTWVhdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmFuZG9tTm9uTWVhdCA9IHBpenphSW5ncmVkaWVudHMubm9uTWVhdHNbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIHBpenphSW5ncmVkaWVudHMubm9uTWVhdHMubGVuZ3RoKSldO1xuICByZXR1cm4gcmFuZG9tTm9uTWVhdDtcbn07XG5cbnZhciBzZWxlY3RSYW5kb21DaGVlc2UgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJhbmRvbUNoZWVzZSA9IHBpenphSW5ncmVkaWVudHMuY2hlZXNlc1tNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogcGl6emFJbmdyZWRpZW50cy5jaGVlc2VzLmxlbmd0aCkpXTtcbiAgcmV0dXJuIHJhbmRvbUNoZWVzZTtcbn07XG5cbnZhciBzZWxlY3RSYW5kb21TYXVjZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmFuZG9tU2F1Y2UgPSBwaXp6YUluZ3JlZGllbnRzLnNhdWNlc1tNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogcGl6emFJbmdyZWRpZW50cy5zYXVjZXMubGVuZ3RoKSldO1xuICByZXR1cm4gcmFuZG9tU2F1Y2U7XG59O1xuXG52YXIgc2VsZWN0UmFuZG9tQ3J1c3QgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJhbmRvbUNydXN0ID0gcGl6emFJbmdyZWRpZW50cy5jcnVzdHNbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIHBpenphSW5ncmVkaWVudHMuY3J1c3RzLmxlbmd0aCkpXTtcbiAgcmV0dXJuIHJhbmRvbUNydXN0O1xufTtcblxudmFyIGluZ3JlZGllbnRJdGVtaXplciA9IGZ1bmN0aW9uKHN0cmluZykge1xuICByZXR1cm4gXCI8bGk+XCIgKyBzdHJpbmcgKyBcIjwvbGk+XCI7XG59O1xuXG4vLyBSZXR1cm5zIGEgc3RyaW5nIHdpdGggcmFuZG9tIHBpenphIGluZ3JlZGllbnRzIG5lc3RlZCBpbnNpZGUgPGxpPiB0YWdzXG52YXIgbWFrZVJhbmRvbVBpenphID0gZnVuY3Rpb24oKSB7XG4gIHZhciBwaXp6YSA9IFwiXCI7XG5cbiAgdmFyIG51bWJlck9mTWVhdHMgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogNCkpO1xuICB2YXIgbnVtYmVyT2ZOb25NZWF0cyA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAzKSk7XG4gIHZhciBudW1iZXJPZkNoZWVzZXMgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMikpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZNZWF0czsgaSsrKSB7XG4gICAgcGl6emEgPSBwaXp6YSArIGluZ3JlZGllbnRJdGVtaXplcihzZWxlY3RSYW5kb21NZWF0KCkpO1xuICB9XG5cbiAgZm9yICh2YXIgaiA9IDA7IGogPCBudW1iZXJPZk5vbk1lYXRzOyBqKyspIHtcbiAgICBwaXp6YSA9IHBpenphICsgaW5ncmVkaWVudEl0ZW1pemVyKHNlbGVjdFJhbmRvbU5vbk1lYXQoKSk7XG4gIH1cblxuICBmb3IgKHZhciBrID0gMDsgayA8IG51bWJlck9mQ2hlZXNlczsgaysrKSB7XG4gICAgcGl6emEgPSBwaXp6YSArIGluZ3JlZGllbnRJdGVtaXplcihzZWxlY3RSYW5kb21DaGVlc2UoKSk7XG4gIH1cblxuICBwaXp6YSA9IHBpenphICsgaW5ncmVkaWVudEl0ZW1pemVyKHNlbGVjdFJhbmRvbVNhdWNlKCkpO1xuICBwaXp6YSA9IHBpenphICsgaW5ncmVkaWVudEl0ZW1pemVyKHNlbGVjdFJhbmRvbUNydXN0KCkpO1xuXG4gIHJldHVybiBwaXp6YTtcbn07XG5cbi8vIHJldHVybnMgYSBET00gZWxlbWVudCBmb3IgZWFjaCBwaXp6YVxudmFyIHBpenphRWxlbWVudEdlbmVyYXRvciA9IGZ1bmN0aW9uKGkpIHtcbiAgdmFyIHBpenphQ29udGFpbmVyLCAgICAgICAgICAgICAvLyBjb250YWlucyBwaXp6YSB0aXRsZSwgaW1hZ2UgYW5kIGxpc3Qgb2YgaW5ncmVkaWVudHNcbiAgICAgIHBpenphSW1hZ2VDb250YWluZXIsICAgICAgICAvLyBjb250YWlucyB0aGUgcGl6emEgaW1hZ2VcbiAgICAgIHBpenphSW1hZ2UsICAgICAgICAgICAgICAgICAvLyB0aGUgcGl6emEgaW1hZ2UgaXRzZWxmXG4gICAgICBwaXp6YURlc2NyaXB0aW9uQ29udGFpbmVyLCAgLy8gY29udGFpbnMgdGhlIHBpenphIHRpdGxlIGFuZCBsaXN0IG9mIGluZ3JlZGllbnRzXG4gICAgICBwaXp6YU5hbWUsICAgICAgICAgICAgICAgICAgLy8gdGhlIHBpenphIG5hbWUgaXRzZWxmXG4gICAgICB1bDsgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGxpc3Qgb2YgaW5ncmVkaWVudHNcblxuICBwaXp6YUNvbnRhaW5lciAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwaXp6YUltYWdlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcGl6emFJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gIHBpenphRGVzY3JpcHRpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gIHBpenphQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJyYW5kb21QaXp6YUNvbnRhaW5lclwiKTtcbiAgcGl6emFDb250YWluZXIuc3R5bGUud2lkdGggPSBcIjMzLjMzJVwiO1xuICBwaXp6YUNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBcIjMyNXB4XCI7XG4gIHBpenphQ29udGFpbmVyLmlkID0gXCJwaXp6YVwiICsgaTsgICAgICAgICAgICAgICAgLy8gZ2l2ZXMgZWFjaCBwaXp6YSBlbGVtZW50IGEgdW5pcXVlIGlkXG4gIHBpenphSW1hZ2VDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbC1tZC02XCIpO1xuXG4gIHBpenphSW1hZ2Uuc3JjID0gXCJpbWFnZXMvcGl6emEucG5nXCI7XG4gIHBpenphSW1hZ2UuY2xhc3NMaXN0LmFkZChcImltZy1yZXNwb25zaXZlXCIpO1xuICBwaXp6YUltYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKHBpenphSW1hZ2UpO1xuICBwaXp6YUNvbnRhaW5lci5hcHBlbmRDaGlsZChwaXp6YUltYWdlQ29udGFpbmVyKTtcblxuXG4gIHBpenphRGVzY3JpcHRpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbC1tZC02XCIpO1xuXG4gIHBpenphTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKTtcbiAgcGl6emFOYW1lLmlubmVySFRNTCA9IHJhbmRvbU5hbWUoKTtcbiAgcGl6emFEZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChwaXp6YU5hbWUpO1xuXG4gIHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICB1bC5pbm5lckhUTUwgPSBtYWtlUmFuZG9tUGl6emEoKTtcbiAgcGl6emFEZXNjcmlwdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh1bCk7XG4gIHBpenphQ29udGFpbmVyLmFwcGVuZENoaWxkKHBpenphRGVzY3JpcHRpb25Db250YWluZXIpO1xuXG4gIHJldHVybiBwaXp6YUNvbnRhaW5lcjtcbn07XG5cbi8vIHJlc2l6ZVBpenphcyhzaXplKSBpcyBjYWxsZWQgd2hlbiB0aGUgc2xpZGVyIGluIHRoZSBcIk91ciBQaXp6YXNcIiBzZWN0aW9uIG9mIHRoZSB3ZWJzaXRlIG1vdmVzLlxudmFyIHJlc2l6ZVBpenphcyA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgd2luZG93LnBlcmZvcm1hbmNlLm1hcmsoXCJtYXJrX3N0YXJ0X3Jlc2l6ZVwiKTsgICAvLyBVc2VyIFRpbWluZyBBUEkgZnVuY3Rpb25cblxuICAvLyBDaGFuZ2VzIHRoZSB2YWx1ZSBmb3IgdGhlIHNpemUgb2YgdGhlIHBpenphIGFib3ZlIHRoZSBzbGlkZXJcbiAgZnVuY3Rpb24gY2hhbmdlU2xpZGVyTGFiZWwoc2l6ZSkge1xuICAgIHN3aXRjaChzaXplKSB7XG4gICAgICBjYXNlIFwiMVwiOlxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BpenphU2l6ZVwiKS5pbm5lckhUTUwgPSBcIlNtYWxsXCI7XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgXCIyXCI6XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGl6emFTaXplXCIpLmlubmVySFRNTCA9IFwiTWVkaXVtXCI7XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgXCIzXCI6XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGl6emFTaXplXCIpLmlubmVySFRNTCA9IFwiTGFyZ2VcIjtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coXCJidWcgaW4gY2hhbmdlU2xpZGVyTGFiZWxcIik7XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlU2xpZGVyTGFiZWwoc2l6ZSk7XG5cbiAgLy8gUmV0dXJucyB0aGUgc2l6ZSBkaWZmZXJlbmNlIHRvIGNoYW5nZSBhIHBpenphIGVsZW1lbnQgZnJvbSBvbmUgc2l6ZSB0byBhbm90aGVyLiBDYWxsZWQgYnkgY2hhbmdlUGl6emFTbGljZXMoc2l6ZSkuXG4gIGZ1bmN0aW9uIGRldGVybWluZUR4IChlbGVtLCBzaXplKSB7XG4gICAgdmFyIG9sZHdpZHRoID0gZWxlbS5vZmZzZXRXaWR0aDtcbiAgICB2YXIgd2luZG93d2lkdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JhbmRvbVBpenphc1wiKS5vZmZzZXRXaWR0aDtcbiAgICB2YXIgb2xkc2l6ZSA9IG9sZHdpZHRoIC8gd2luZG93d2lkdGg7XG5cbiAgICAvLyBUT0RPOiBjaGFuZ2UgdG8gMyBzaXplcz8gbm8gbW9yZSB4bD9cbiAgICAvLyBDaGFuZ2VzIHRoZSBzbGlkZXIgdmFsdWUgdG8gYSBwZXJjZW50IHdpZHRoXG4gICAgZnVuY3Rpb24gc2l6ZVN3aXRjaGVyIChzaXplKSB7XG4gICAgICBzd2l0Y2goc2l6ZSkge1xuICAgICAgICBjYXNlIFwiMVwiOlxuICAgICAgICAgIHJldHVybiAwLjI1O1xuICAgICAgICBjYXNlIFwiMlwiOlxuICAgICAgICAgIHJldHVybiAwLjMzMzM7XG4gICAgICAgIGNhc2UgXCIzXCI6XG4gICAgICAgICAgcmV0dXJuIDAuNTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImJ1ZyBpbiBzaXplU3dpdGNoZXJcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIG5ld3NpemUgPSBzaXplU3dpdGNoZXIoc2l6ZSk7XG4gICAgdmFyIGR4ID0gKG5ld3NpemUgLSBvbGRzaXplKSAqIHdpbmRvd3dpZHRoO1xuXG4gICAgcmV0dXJuIGR4O1xuICB9XG5cbiAgLy8gSXRlcmF0ZXMgdGhyb3VnaCBwaXp6YSBlbGVtZW50cyBvbiB0aGUgcGFnZSBhbmQgY2hhbmdlcyB0aGVpciB3aWR0aHNcbiAgZnVuY3Rpb24gY2hhbmdlUGl6emFTaXplcyhzaXplKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJhbmRvbVBpenphQ29udGFpbmVyXCIpLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZHggPSBkZXRlcm1pbmVEeChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJhbmRvbVBpenphQ29udGFpbmVyXCIpW2ldLCBzaXplKTtcbiAgICAgIHZhciBuZXd3aWR0aCA9IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJhbmRvbVBpenphQ29udGFpbmVyXCIpW2ldLm9mZnNldFdpZHRoICsgZHgpICsgJ3B4JztcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmFuZG9tUGl6emFDb250YWluZXJcIilbaV0uc3R5bGUud2lkdGggPSBuZXd3aWR0aDtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VQaXp6YVNpemVzKHNpemUpO1xuXG4gIC8vIFVzZXIgVGltaW5nIEFQSSBpcyBhd2Vzb21lXG4gIHdpbmRvdy5wZXJmb3JtYW5jZS5tYXJrKFwibWFya19lbmRfcmVzaXplXCIpO1xuICB3aW5kb3cucGVyZm9ybWFuY2UubWVhc3VyZShcIm1lYXN1cmVfcGl6emFfcmVzaXplXCIsIFwibWFya19zdGFydF9yZXNpemVcIiwgXCJtYXJrX2VuZF9yZXNpemVcIik7XG4gIHZhciB0aW1lVG9SZXNpemUgPSB3aW5kb3cucGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5TmFtZShcIm1lYXN1cmVfcGl6emFfcmVzaXplXCIpO1xuICBjb25zb2xlLmxvZyhcIlRpbWUgdG8gcmVzaXplIHBpenphczogXCIgKyB0aW1lVG9SZXNpemVbMF0uZHVyYXRpb24gKyBcIm1zXCIpO1xufTtcblxud2luZG93LnBlcmZvcm1hbmNlLm1hcmsoXCJtYXJrX3N0YXJ0X2dlbmVyYXRpbmdcIik7IC8vIGNvbGxlY3QgdGltaW5nIGRhdGFcblxuLy8gVGhpcyBmb3ItbG9vcCBhY3R1YWxseSBjcmVhdGVzIGFuZCBhcHBlbmRzIGFsbCBvZiB0aGUgcGl6emFzIHdoZW4gdGhlIHBhZ2UgbG9hZHNcbmZvciAodmFyIGkgPSAyOyBpIDwgMTAwOyBpKyspIHtcbiAgdmFyIHBpenphc0RpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFuZG9tUGl6emFzXCIpO1xuICBwaXp6YXNEaXYuYXBwZW5kQ2hpbGQocGl6emFFbGVtZW50R2VuZXJhdG9yKGkpKTtcbn1cblxuLy8gVXNlciBUaW1pbmcgQVBJIGFnYWluLiBUaGVzZSBtZWFzdXJlbWVudHMgdGVsbCB5b3UgaG93IGxvbmcgaXQgdG9vayB0byBnZW5lcmF0ZSB0aGUgaW5pdGlhbCBwaXp6YXNcbndpbmRvdy5wZXJmb3JtYW5jZS5tYXJrKFwibWFya19lbmRfZ2VuZXJhdGluZ1wiKTtcbndpbmRvdy5wZXJmb3JtYW5jZS5tZWFzdXJlKFwibWVhc3VyZV9waXp6YV9nZW5lcmF0aW9uXCIsIFwibWFya19zdGFydF9nZW5lcmF0aW5nXCIsIFwibWFya19lbmRfZ2VuZXJhdGluZ1wiKTtcbnZhciB0aW1lVG9HZW5lcmF0ZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlOYW1lKFwibWVhc3VyZV9waXp6YV9nZW5lcmF0aW9uXCIpO1xuY29uc29sZS5sb2coXCJUaW1lIHRvIGdlbmVyYXRlIHBpenphcyBvbiBsb2FkOiBcIiArIHRpbWVUb0dlbmVyYXRlWzBdLmR1cmF0aW9uICsgXCJtc1wiKTtcblxuLy8gSXRlcmF0b3IgZm9yIG51bWJlciBvZiB0aW1lcyB0aGUgcGl6emFzIGluIHRoZSBiYWNrZ3JvdW5kIGhhdmUgc2Nyb2xsZWQuXG4vLyBVc2VkIGJ5IHVwZGF0ZVBvc2l0aW9ucygpIHRvIGRlY2lkZSB3aGVuIHRvIGxvZyB0aGUgYXZlcmFnZSB0aW1lIHBlciBmcmFtZVxudmFyIGZyYW1lID0gMDtcblxuLy8gTG9ncyB0aGUgYXZlcmFnZSBhbW91bnQgb2YgdGltZSBwZXIgMTAgZnJhbWVzIG5lZWRlZCB0byBtb3ZlIHRoZSBzbGlkaW5nIGJhY2tncm91bmQgcGl6emFzIG9uIHNjcm9sbC5cbmZ1bmN0aW9uIGxvZ0F2ZXJhZ2VGcmFtZSh0aW1lcykgeyAgIC8vIHRpbWVzIGlzIHRoZSBhcnJheSBvZiBVc2VyIFRpbWluZyBtZWFzdXJlbWVudHMgZnJvbSB1cGRhdGVQb3NpdGlvbnMoKVxuICB2YXIgbnVtYmVyT2ZFbnRyaWVzID0gdGltZXMubGVuZ3RoO1xuICB2YXIgc3VtID0gMDtcbiAgZm9yICh2YXIgaSA9IG51bWJlck9mRW50cmllcyAtIDE7IGkgPiBudW1iZXJPZkVudHJpZXMgLSAxMTsgaS0tKSB7XG4gICAgc3VtID0gc3VtICsgdGltZXNbaV0uZHVyYXRpb247XG4gIH1cbiAgY29uc29sZS5sb2coXCJBdmVyYWdlIHRpbWUgdG8gZ2VuZXJhdGUgbGFzdCAxMCBmcmFtZXM6IFwiICsgc3VtIC8gMTAgKyBcIm1zXCIpO1xufVxuXG4vLyBUaGUgZm9sbG93aW5nIGNvZGUgZm9yIHNsaWRpbmcgYmFja2dyb3VuZCBwaXp6YXMgd2FzIHB1bGxlZCBmcm9tIElseWEncyBkZW1vIGZvdW5kIGF0OlxuLy8gaHR0cHM6Ly93d3cuaWd2aXRhLmNvbS9zbGlkZXMvMjAxMi9kZXZ0b29scy10aXBzLWFuZC10cmlja3MvamFuay1kZW1vLmh0bWxcblxuLy8gTW92ZXMgdGhlIHNsaWRpbmcgYmFja2dyb3VuZCBwaXp6YXMgYmFzZWQgb24gc2Nyb2xsIHBvc2l0aW9uXG5mdW5jdGlvbiB1cGRhdGVQb3NpdGlvbnMoKSB7XG4gIGZyYW1lKys7XG4gIHdpbmRvdy5wZXJmb3JtYW5jZS5tYXJrKFwibWFya19zdGFydF9mcmFtZVwiKTtcblxuICB2YXIgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW92ZXInKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwaGFzZSA9IE1hdGguc2luKChkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCAvIDEyNTApICsgKGkgJSA1KSk7XG4gICAgaXRlbXNbaV0uc3R5bGUubGVmdCA9IGl0ZW1zW2ldLmJhc2ljTGVmdCArIDEwMCAqIHBoYXNlICsgJ3B4JztcbiAgfVxuXG4gIC8vIFVzZXIgVGltaW5nIEFQSSB0byB0aGUgcmVzY3VlIGFnYWluLiBTZXJpb3VzbHksIGl0J3Mgd29ydGggbGVhcm5pbmcuXG4gIC8vIFN1cGVyIGVhc3kgdG8gY3JlYXRlIGN1c3RvbSBtZXRyaWNzLlxuICB3aW5kb3cucGVyZm9ybWFuY2UubWFyayhcIm1hcmtfZW5kX2ZyYW1lXCIpO1xuICB3aW5kb3cucGVyZm9ybWFuY2UubWVhc3VyZShcIm1lYXN1cmVfZnJhbWVfZHVyYXRpb25cIiwgXCJtYXJrX3N0YXJ0X2ZyYW1lXCIsIFwibWFya19lbmRfZnJhbWVcIik7XG4gIGlmIChmcmFtZSAlIDEwID09PSAwKSB7XG4gICAgdmFyIHRpbWVzVG9VcGRhdGVQb3NpdGlvbiA9IHdpbmRvdy5wZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlOYW1lKFwibWVhc3VyZV9mcmFtZV9kdXJhdGlvblwiKTtcbiAgICBsb2dBdmVyYWdlRnJhbWUodGltZXNUb1VwZGF0ZVBvc2l0aW9uKTtcbiAgfVxufVxuXG4vLyBydW5zIHVwZGF0ZVBvc2l0aW9ucyBvbiBzY3JvbGxcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB1cGRhdGVQb3NpdGlvbnMpO1xuXG4vLyBHZW5lcmF0ZXMgdGhlIHNsaWRpbmcgcGl6emFzIHdoZW4gdGhlIHBhZ2UgbG9hZHMuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gIHZhciBjb2xzID0gODtcbiAgdmFyIHMgPSAyNTY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMjAwOyBpKyspIHtcbiAgICB2YXIgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGVsZW0uY2xhc3NOYW1lID0gJ21vdmVyJztcbiAgICBlbGVtLnNyYyA9IFwiaW1hZ2VzL3BpenphLnBuZ1wiO1xuICAgIGVsZW0uc3R5bGUuaGVpZ2h0ID0gXCIxMDBweFwiO1xuICAgIGVsZW0uc3R5bGUud2lkdGggPSBcIjczLjMzM3B4XCI7XG4gICAgZWxlbS5iYXNpY0xlZnQgPSAoaSAlIGNvbHMpICogcztcbiAgICBlbGVtLnN0eWxlLnRvcCA9IChNYXRoLmZsb29yKGkgLyBjb2xzKSAqIHMpICsgJ3B4JztcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vdmluZ1BpenphczFcIikuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gIH1cbiAgdXBkYXRlUG9zaXRpb25zKCk7XG59KTtcbiJdLCJmaWxlIjoidmlld3Mvc2NyaXB0cy9tYWluLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=