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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ2aWV3cy9zY3JpcHRzL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbldlbGNvbWUgdG8gdGhlIDYwZnBzIHByb2plY3QhIFlvdXIgZ29hbCBpcyB0byBtYWtlIENhbSdzIFBpenplcmlhIHdlYnNpdGUgcnVuXG5qYW5rLWZyZWUgYXQgNjAgZnJhbWVzIHBlciBzZWNvbmQuXG5cblRoZXJlIGFyZSB0d28gbWFqb3IgaXNzdWVzIGluIHRoaXMgY29kZSB0aGF0IGxlYWQgdG8gc3ViLTYwZnBzIHBlcmZvcm1hbmNlLiBDYW5cbnlvdSBzcG90IGFuZCBmaXggYm90aD9cblxuXG5CdWlsdCBpbnRvIHRoZSBjb2RlLCB5b3UnbGwgZmluZCBhIGZldyBpbnN0YW5jZXMgb2YgdGhlIFVzZXIgVGltaW5nIEFQSVxuKHdpbmRvdy5wZXJmb3JtYW5jZSksIHdoaWNoIHdpbGwgYmUgY29uc29sZS5sb2coKWluZyBmcmFtZSByYXRlIGRhdGEgaW50byB0aGVcbmJyb3dzZXIgY29uc29sZS4gVG8gbGVhcm4gbW9yZSBhYm91dCBVc2VyIFRpbWluZyBBUEksIGNoZWNrIG91dDpcbmh0dHA6Ly93d3cuaHRtbDVyb2Nrcy5jb20vZW4vdHV0b3JpYWxzL3dlYnBlcmZvcm1hbmNlL3VzZXJ0aW1pbmcvXG5cbkNyZWF0b3I6XG5DYW1lcm9uIFBpdHRtYW4sIFVkYWNpdHkgQ291cnNlIERldmVsb3BlclxuY2FtZXJvbiAqYXQqIHVkYWNpdHkgKmRvdCogY29tXG4qL1xuXG4vLyBBcyB5b3UgbWF5IGhhdmUgcmVhbGl6ZWQsIHRoaXMgd2Vic2l0ZSByYW5kb21seSBnZW5lcmF0ZXMgcGl6emFzLlxuLy8gSGVyZSBhcmUgYXJyYXlzIG9mIGFsbCBwb3NzaWJsZSBwaXp6YSBpbmdyZWRpZW50cy5cbnZhciBwaXp6YUluZ3JlZGllbnRzID0ge307XG5waXp6YUluZ3JlZGllbnRzLm1lYXRzID0gW1xuICBcIlBlcHBlcm9uaVwiLFxuICBcIlNhdXNhZ2VcIixcbiAgXCJGZW5uZWwgU2F1c2FnZVwiLFxuICBcIlNwaWN5IFNhdXNhZ2VcIixcbiAgXCJDaGlja2VuXCIsXG4gIFwiQkJRIENoaWNrZW5cIixcbiAgXCJDaG9yaXpvXCIsXG4gIFwiQ2hpY2tlbiBBbmRvdWlsbGVcIixcbiAgXCJTYWxhbWlcIixcbiAgXCJUb2Z1XCIsXG4gIFwiQmFjb25cIixcbiAgXCJDYW5hZGlhbiBCYWNvblwiLFxuICBcIlByb3NjdWl0dG9cIixcbiAgXCJJdGFsaWFuIFNhdXNhZ2VcIixcbiAgXCJHcm91bmQgQmVlZlwiLFxuICBcIkFuY2hvdmllc1wiLFxuICBcIlR1cmtleVwiLFxuICBcIkhhbVwiLFxuICBcIlZlbmlzb25cIixcbiAgXCJMYW1iXCIsXG4gIFwiRHVja1wiLFxuICBcIlNveWxlbnQgR3JlZW5cIixcbiAgXCJDYXJuZSBBc2FkYVwiLFxuICBcIlNvcHByZXNzYXRhIFBpY2FudGVcIixcbiAgXCJDb3BwYVwiLFxuICBcIlBhbmNldHRhXCIsXG4gIFwiQnJlc29sYVwiLFxuICBcIkxveFwiLFxuICBcIkd1YW5jaWFsZVwiLFxuICBcIkNoaWxpXCIsXG4gIFwiQmVlZiBKZXJreVwiLFxuICBcIlBhc3RyYW1pXCIsXG4gIFwiS2llbGJhc2FcIixcbiAgXCJTY2FsbG9wc1wiLFxuICBcIkZpbGV0IE1pZ25vblwiXG5dO1xucGl6emFJbmdyZWRpZW50cy5ub25NZWF0cyA9IFtcbiAgXCJXaGl0ZSBPbmlvbnNcIixcbiAgXCJSZWQgT25pb25zXCIsXG4gIFwiU2F1dGVlZCBPbmlvbnNcIixcbiAgXCJHcmVlbiBQZXBwZXJzXCIsXG4gIFwiUmVkIFBlcHBlcnNcIixcbiAgXCJCYW5hbmEgUGVwcGVyc1wiLFxuICBcIkdob3N0IFBlcHBlcnNcIixcbiAgXCJIYWJhbmVybyBQZXBwZXJzXCIsXG4gIFwiSmFsYXBlbm8gUGVwcGVyc1wiLFxuICBcIlN0dWZmZWQgUGVwcGVyc1wiLFxuICBcIlNwaW5hY2hcIixcbiAgXCJUb21hdG9lc1wiLFxuICBcIlBpbmVhcHBsZVwiLFxuICBcIlBlYXIgU2xpY2VzXCIsXG4gIFwiQXBwbGUgU2xpY2VzXCIsXG4gIFwiTXVzaHJvb21zXCIsXG4gIFwiQXJ1Z3VsYVwiLFxuICBcIkJhc2lsXCIsXG4gIFwiRmVubmVsXCIsXG4gIFwiUm9zZW1hcnlcIixcbiAgXCJDaWxhbnRyb1wiLFxuICBcIkF2b2NhZG9cIixcbiAgXCJHdWFjYW1vbGVcIixcbiAgXCJTYWxzYVwiLFxuICBcIlN3aXNzIENoYXJkXCIsXG4gIFwiS2FsZVwiLFxuICBcIlN1biBEcmllZCBUb21hdG9lc1wiLFxuICBcIldhbG51dHNcIixcbiAgXCJBcnRpY2hva2VcIixcbiAgXCJBc3BhcmFndXNcIixcbiAgXCJDYXJhbWVsaXplZCBPbmlvbnNcIixcbiAgXCJNYW5nb1wiLFxuICBcIkdhcmxpY1wiLFxuICBcIk9saXZlc1wiLFxuICBcIkNhdWxpZmxvd2VyXCIsXG4gIFwiUG9sZW50YVwiLFxuICBcIkZyaWVkIEVnZ1wiLFxuICBcIlp1Y2NoaW5pXCIsXG4gIFwiSHVtbXVzXCJcbl07XG5waXp6YUluZ3JlZGllbnRzLmNoZWVzZXMgPSBbXG4gIFwiQW1lcmljYW4gQ2hlZXNlXCIsXG4gIFwiU3dpc3MgQ2hlZXNlXCIsXG4gIFwiR29hdCBDaGVlc2VcIixcbiAgXCJNb3p6YXJlbGxhIENoZWVzZVwiLFxuICBcIlBhcm1lc2VhbiBDaGVlc2VcIixcbiAgXCJWZWx2ZWV0YSBDaGVlc2VcIixcbiAgXCJHb3VkYSBDaGVlc2VcIixcbiAgXCJNdWVuc3RlciBDaGVlc2VcIixcbiAgXCJBcHBsZXdvb2QgQ2hlZXNlXCIsXG4gIFwiQXNpYWdvIENoZWVzZVwiLFxuICBcIkJsZXUgQ2hlZXNlXCIsXG4gIFwiQm91cnNpbiBDaGVlc2VcIixcbiAgXCJCcmllIENoZWVzZVwiLFxuICBcIkNoZWRkYXIgQ2hlZXNlXCIsXG4gIFwiQ2hldnJlIENoZWVzZVwiLFxuICBcIkhhdmFydGkgQ2hlZXNlXCIsXG4gIFwiSmFjayBDaGVlc2VcIixcbiAgXCJQZXBwZXIgSmFjayBDaGVlc2VcIixcbiAgXCJHcnV5ZXJlIENoZWVzZVwiLFxuICBcIkxpbWJlcmdlciBDaGVlc2VcIixcbiAgXCJNYW5jaGVnbyBDaGVlc2VcIixcbiAgXCJNYXJzY2Fwb25lIENoZWVzZVwiLFxuICBcIlBlY29yaW5vIENoZWVzZVwiLFxuICBcIlByb3ZvbG9uZSBDaGVlc2VcIixcbiAgXCJRdWVzbyBDaGVlc2VcIixcbiAgXCJSb3F1ZWZvcnQgQ2hlZXNlXCIsXG4gIFwiUm9tYW5vIENoZWVzZVwiLFxuICBcIlJpY290dGEgQ2hlZXNlXCIsXG4gIFwiU21va2VkIEdvdWRhXCJcbl07XG5waXp6YUluZ3JlZGllbnRzLnNhdWNlcyA9IFtcbiAgXCJSZWQgU2F1Y2VcIixcbiAgXCJNYXJpbmFyYVwiLFxuICBcIkJCUSBTYXVjZVwiLFxuICBcIk5vIFNhdWNlXCIsXG4gIFwiSG90IFNhdWNlXCJcbl07XG5waXp6YUluZ3JlZGllbnRzLmNydXN0cyA9IFtcbiAgXCJXaGl0ZSBDcnVzdFwiLFxuICBcIldob2xlIFdoZWF0IENydXN0XCIsXG4gIFwiRmxhdGJyZWFkIENydXN0XCIsXG4gIFwiU3R1ZmZlZCBDcnVzdFwiXG5dO1xuXG4vLyBOYW1lIGdlbmVyYXRvciBwdWxsZWQgZnJvbSBodHRwOi8vc2F0dXJkYXlraWQuY29tL3VzZXJuYW1lcy9nZW5lcmF0b3IuaHRtbFxuLy8gQ2FwaXRhbGl6ZXMgZmlyc3QgbGV0dGVyIG9mIGVhY2ggd29yZFxuU3RyaW5nLnByb3RvdHlwZS5jYXBpdGFsaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5zbGljZSgxKTtcbn07XG5cbi8vIFB1bGxzIGFkamVjdGl2ZSBvdXQgb2YgYXJyYXkgdXNpbmcgcmFuZG9tIG51bWJlciBzZW50IGZyb20gZ2VuZXJhdG9yXG5mdW5jdGlvbiBnZXRBZGooeCl7XG4gIHN3aXRjaCh4KSB7XG4gICAgY2FzZSBcImRhcmtcIjpcbiAgICAgIHZhciBkYXJrID0gW1wiZGFya1wiLFwibW9yYmlkXCIsIFwic2NhcnlcIiwgXCJzcG9va3lcIiwgXCJnb3RoaWNcIiwgXCJkZXZpYW50XCIsIFwiY3JlZXB5XCIsIFwic2FkaXN0aWNcIiwgXCJibGFja1wiLCBcImRhbmdlcm91c1wiLCBcImRlamVjdGVkXCIsIFwiaGF1bnRlZFwiLFxuICAgICAgXCJtb3Jvc2VcIiwgXCJ0cmFnaWNcIiwgXCJzaGF0dGVyZWRcIiwgXCJicm9rZW5cIiwgXCJzYWRcIiwgXCJtZWxhbmNob2x5XCIsIFwic29tYmVyXCIsIFwiZGFya1wiLCBcImdsb29teVwiLCBcImhvbWljaWRhbFwiLCBcIm11cmRlcm91c1wiLCBcInNoYWR5XCIsIFwibWlzdHlcIixcbiAgICAgIFwiZHVza3lcIiwgXCJnaG9zdGx5XCIsIFwic2hhZG93eVwiLCBcImRlbWVudGVkXCIsIFwiY3Vyc2VkXCIsIFwiaW5zYW5lXCIsIFwicG9zc2Vzc2VkXCIsIFwiZ3JvdGVzcXVlXCIsIFwib2JzZXNzZWRcIl07XG4gICAgICByZXR1cm4gZGFyaztcbiAgICBjYXNlIFwiY29sb3JcIjpcbiAgICAgIHZhciBjb2xvcnMgPSBbXCJibHVlXCIsIFwiZ3JlZW5cIiwgXCJwdXJwbGVcIiwgXCJncmV5XCIsIFwic2NhcmxldFwiLCBcIk5lb25HcmVlblwiLCBcIk5lb25CbHVlXCIsIFwiTmVvblBpbmtcIiwgXCJIb3RQaW5rXCIsIFwicGlua1wiLCBcImJsYWNrXCIsIFwicmVkXCIsXG4gICAgICBcIm1hcm9vblwiLCBcInNpbHZlclwiLCBcImdvbGRlblwiLCBcInllbGxvd1wiLCBcIm9yYW5nZVwiLCBcIm11c3RhcmRcIiwgXCJwbHVtXCIsIFwidmlvbGV0XCIsIFwiY2VydWxlYW5cIiwgXCJicm93blwiLCBcImxhdmVuZGVyXCIsIFwidmlvbGV0XCIsIFwibWFnZW50YVwiLFxuICAgICAgXCJjaGVzdG51dFwiLCBcInJvc3lcIiwgXCJjb3BwZXJcIiwgXCJjcmltc29uXCIsIFwidGVhbFwiLCBcImluZGlnb1wiLCBcIm5hdnlcIiwgXCJhenVyZVwiLCBcInBlcml3aW5rbGVcIiwgXCJicmFzc3lcIiwgXCJ2ZXJkaWdyaXNcIiwgXCJ2ZXJpZGlhblwiLCBcInRhblwiLFxuICAgICAgXCJyYXNwYmVycnlcIiwgXCJiZWlnZVwiLCBcInNhbmR5XCIsIFwiRWxlY3RyaWNCbHVlXCIsIFwid2hpdGVcIiwgXCJjaGFtcGFnbmVcIiwgXCJjb3JhbFwiLCBcImN5YW5cIl07XG4gICAgICByZXR1cm4gY29sb3JzO1xuICAgIGNhc2UgXCJ3aGltc2ljYWxcIjpcbiAgICAgIHZhciB3aGltc3kgPSBbXCJ3aGltc2ljYWxcIiwgXCJzaWxseVwiLCBcImRydW5rZW5cIiwgXCJnb29meVwiLCBcImZ1bm55XCIsIFwid2VpcmRcIiwgXCJzdHJhbmdlXCIsIFwib2RkXCIsIFwicGxheWZ1bFwiLCBcImNsZXZlclwiLCBcImJvYXN0ZnVsXCIsIFwiYnJlYWtkYW5jaW5nXCIsXG4gICAgICBcImhpbGFyaW91c1wiLCBcImNvbmNlaXRlZFwiLCBcImhhcHB5XCIsIFwiY29taWNhbFwiLCBcImN1cmlvdXNcIiwgXCJwZWN1bGlhclwiLCBcInF1YWludFwiLCBcInF1aXJreVwiLCBcImZhbmN5XCIsIFwid2F5d2FyZFwiLCBcImZpY2tsZVwiLCBcInlhd25pbmdcIiwgXCJzbGVlcHlcIixcbiAgICAgIFwiY29ja2V5ZWRcIiwgXCJkaXp6eVwiLCBcImRhbmNpbmdcIiwgXCJhYnN1cmRcIiwgXCJsYXVnaGluZ1wiLCBcImhhaXJ5XCIsIFwic21pbGluZ1wiLCBcInBlcnBsZXhlZFwiLCBcImJhZmZsZWRcIiwgXCJjb2NrYW1hbWllXCIsIFwidnVsZ2FyXCIsIFwiaG9vZHdpbmtlZFwiLFxuICAgICAgXCJicmFpbndhc2hlZFwiXTtcbiAgICAgIHJldHVybiB3aGltc3k7XG4gICAgY2FzZSBcInNoaW55XCI6XG4gICAgICB2YXIgc2hpbnkgPSBbXCJzYXBwaGlyZVwiLCBcIm9wYWxcIiwgXCJzaWx2ZXJcIiwgXCJnb2xkXCIsIFwicGxhdGludW1cIiwgXCJydWJ5XCIsIFwiZW1lcmFsZFwiLCBcInRvcGF6XCIsIFwiZGlhbW9uZFwiLCBcImFtZXRoeXN0XCIsIFwidHVycXVvaXNlXCIsXG4gICAgICBcInN0YXJsaXRcIiwgXCJtb29ubGl0XCIsIFwiYnJvbnplXCIsIFwibWV0YWxcIiwgXCJqYWRlXCIsIFwiYW1iZXJcIiwgXCJnYXJuZXRcIiwgXCJvYnNpZGlhblwiLCBcIm9ueXhcIiwgXCJwZWFybFwiLCBcImNvcHBlclwiLCBcInN1bmxpdFwiLCBcImJyYXNzXCIsIFwiYnJhc3N5XCIsXG4gICAgICBcIm1ldGFsbGljXCJdO1xuICAgICAgcmV0dXJuIHNoaW55O1xuICAgIGNhc2UgXCJub2lzeVwiOlxuICAgICAgdmFyIG5vaXN5ID0gW1widW50dW5lZFwiLCBcImxvdWRcIiwgXCJzb2Z0XCIsIFwic2hyaWVraW5nXCIsIFwibWVsb2Rpb3VzXCIsIFwibXVzaWNhbFwiLCBcIm9wZXJhdGljXCIsIFwic3ltcGhvbmljXCIsIFwiZGFuY2luZ1wiLCBcImx5cmljYWxcIiwgXCJoYXJtb25pY1wiLFxuICAgICAgXCJvcmNoZXN0cmFsXCIsIFwibm9pc3lcIiwgXCJkaXNzb25hbnRcIiwgXCJyaHl0aG1pY1wiLCBcImhpc3NpbmdcIiwgXCJzaW5naW5nXCIsIFwiY3Jvb25pbmdcIiwgXCJzaG91dGluZ1wiLCBcInNjcmVhbWluZ1wiLCBcIndhaWxpbmdcIiwgXCJjcnlpbmdcIiwgXCJob3dsaW5nXCIsXG4gICAgICBcInllbGxpbmdcIiwgXCJob2xsZXJpbmdcIiwgXCJjYXRlcndhdWxpbmdcIiwgXCJiYXdsaW5nXCIsIFwiYmVsbG93aW5nXCIsIFwicm9hcmluZ1wiLCBcInNxdWVhbGluZ1wiLCBcImJlZXBpbmdcIiwgXCJrbm9ja2luZ1wiLCBcInRhcHBpbmdcIiwgXCJyYXBwaW5nXCIsXG4gICAgICBcImh1bW1pbmdcIiwgXCJzY2F0dGluZ1wiLCBcIndoaXNwZXJlZFwiLCBcIndoaXNwZXJpbmdcIiwgXCJyYXNwaW5nXCIsIFwiYnV6emluZ1wiLCBcIndoaXJyaW5nXCIsIFwid2hpc3RsaW5nXCIsIFwid2hpc3RsZWRcIl07XG4gICAgICByZXR1cm4gbm9pc3k7XG4gICAgY2FzZSBcImFwb2NhbHlwdGljXCI6XG4gICAgICB2YXIgYXBvY2FseXB0aWMgPSBbXCJudWNsZWFyXCIsIFwiYXBvY2FseXB0aWNcIiwgXCJkZXNvbGF0ZVwiLCBcImF0b21pY1wiLCBcInpvbWJpZVwiLCBcImNvbGxhcHNlZFwiLCBcImdyaW1cIiwgXCJmYWxsZW5cIiwgXCJjb2xsYXBzZWRcIiwgXCJjYW5uaWJhbGlzdGljXCIsXG4gICAgICBcInJhZGlvYWN0aXZlXCIsIFwidG94aWNcIiwgXCJwb2lzb25vdXNcIiwgXCJ2ZW5vbW91c1wiLCBcImRpc2FzdHJvdXNcIiwgXCJncmlteVwiLCBcImRpcnR5XCIsIFwidW5kZWFkXCIsIFwiYmxvb2RzaG90XCIsIFwicnVzdHlcIiwgXCJnbG93aW5nXCIsIFwiZGVjYXlpbmdcIixcbiAgICAgIFwicm90dGVuXCIsIFwiZGVhZGx5XCIsIFwicGxhZ3VlZFwiLCBcImRlY2ltYXRlZFwiLCBcInJvdHRpbmdcIiwgXCJwdXRyaWRcIiwgXCJkZWNheWVkXCIsIFwiZGVzZXJ0ZWRcIiwgXCJhY2lkaWNcIl07XG4gICAgICByZXR1cm4gYXBvY2FseXB0aWM7XG4gICAgY2FzZSBcImluc3VsdGluZ1wiOlxuICAgICAgdmFyIGluc3VsdGluZyA9IFtcInN0dXBpZFwiLCBcImlkaW90aWNcIiwgXCJmYXRcIiwgXCJ1Z2x5XCIsIFwiaGlkZW91c1wiLCBcImdyb3Rlc3F1ZVwiLCBcImR1bGxcIiwgXCJkdW1iXCIsIFwibGF6eVwiLCBcInNsdWdnaXNoXCIsIFwiYnJhaW5sZXNzXCIsIFwic2xvd1wiLFxuICAgICAgXCJndWxsaWJsZVwiLCBcIm9idHVzZVwiLCBcImRlbnNlXCIsIFwiZGltXCIsIFwiZGF6ZWRcIiwgXCJyaWRpY3Vsb3VzXCIsIFwid2l0bGVzc1wiLCBcImRhZnRcIiwgXCJjcmF6eVwiLCBcInZhcGlkXCIsIFwiaW5hbmVcIiwgXCJtdW5kYW5lXCIsIFwiaG9sbG93XCIsIFwidmFjdW91c1wiLFxuICAgICAgXCJib3JpbmdcIiwgXCJpbnNpcGlkXCIsIFwidGVkaW91c1wiLCBcIm1vbm90b25vdXNcIiwgXCJ3ZWlyZFwiLCBcImJpemFycmVcIiwgXCJiYWNrd2FyZFwiLCBcIm1vcm9uaWNcIiwgXCJpZ25vcmFudFwiLCBcInNjYXR0ZXJicmFpbmVkXCIsIFwiZm9yZ2V0ZnVsXCIsIFwiY2FyZWxlc3NcIixcbiAgICAgIFwibGV0aGFyZ2ljXCIsIFwiaW5zb2xlbnRcIiwgXCJpbmRvbGVudFwiLCBcImxvaXRlcmluZ1wiLCBcImdyb3NzXCIsIFwiZGlzZ3VzdGluZ1wiLCBcImJsYW5kXCIsIFwiaG9ycmlkXCIsIFwidW5zZWVtbHlcIiwgXCJyZXZvbHRpbmdcIiwgXCJob21lbHlcIiwgXCJkZWZvcm1lZFwiLFxuICAgICAgXCJkaXNmaWd1cmVkXCIsIFwib2ZmZW5zaXZlXCIsIFwiY293YXJkbHlcIiwgXCJ3ZWFrXCIsIFwidmlsbGFpbm91c1wiLCBcImZlYXJmdWxcIiwgXCJtb25zdHJvdXNcIiwgXCJ1bmF0dHJhY3RpdmVcIiwgXCJ1bnBsZWFzYW50XCIsIFwibmFzdHlcIiwgXCJiZWFzdGx5XCIsIFwic25pZGVcIixcbiAgICAgIFwiaG9ycmlibGVcIiwgXCJzeW5jb3BoYW50aWNcIiwgXCJ1bmhlbHBmdWxcIiwgXCJib290bGlja2luZ1wiXTtcbiAgICAgIHJldHVybiBpbnN1bHRpbmc7XG4gICAgY2FzZSBcInByYWlzZVwiOlxuICAgICAgdmFyIHByYWlzZSA9IFtcImJlYXV0aWZ1bFwiLCBcImludGVsbGlnZW50XCIsIFwic21hcnRcIiwgXCJnZW5pdXNcIiwgXCJpbmdlbmlvdXNcIiwgXCJnb3JnZW91c1wiLCBcInByZXR0eVwiLCBcIndpdHR5XCIsIFwiYW5nZWxpY1wiLCBcImhhbmRzb21lXCIsIFwiZ3JhY2VmdWxcIixcbiAgICAgIFwidGFsZW50ZWRcIiwgXCJleHF1aXNpdGVcIiwgXCJlbmNoYW50aW5nXCIsIFwiZmFzY2luYXRpbmdcIiwgXCJpbnRlcmVzdGluZ1wiLCBcImRpdmluZVwiLCBcImFsbHVyaW5nXCIsIFwicmF2aXNoaW5nXCIsIFwid29uZGVyZnVsXCIsIFwibWFnbmlmaWNpZW50XCIsIFwibWFydmVsb3VzXCIsXG4gICAgICBcImRhenpsaW5nXCIsIFwiY3V0ZVwiLCBcImNoYXJtaW5nXCIsIFwiYXR0cmFjdGl2ZVwiLCBcIm5pZnR5XCIsIFwiZGVsaWdodGZ1bFwiLCBcInN1cGVyaW9yXCIsIFwiYW1pYWJsZVwiLCBcImdlbnRsZVwiLCBcImhlcm9pY1wiLCBcImNvdXJhZ2VvdXNcIiwgXCJ2YWxpYW50XCIsIFwiYnJhdmVcIixcbiAgICAgIFwibm9ibGVcIiwgXCJkYXJpbmdcIiwgXCJmZWFybGVzc1wiLCBcImdhbGxhbnRcIiwgXCJhZHZlbnR1cm91c1wiLCBcImNvb2xcIiwgXCJlbnRodXNpYXN0aWNcIiwgXCJmaWVyY2VcIiwgXCJhd2Vzb21lXCIsIFwicmFkaWNhbFwiLCBcInR1YnVsYXJcIiwgXCJmZWFyc29tZVwiLFxuICAgICAgXCJtYWplc3RpY1wiLCBcImdyYW5kXCIsIFwic3R1bm5pbmdcIl07XG4gICAgICByZXR1cm4gcHJhaXNlO1xuICAgIGNhc2UgXCJzY2llbnRpZmljXCI6XG4gICAgICB2YXIgc2NpZW50aWZpYyA9IFtcInNjaWVudGlmaWNcIiwgXCJ0ZWNobmljYWxcIiwgXCJkaWdpdGFsXCIsIFwicHJvZ3JhbW1pbmdcIiwgXCJjYWxjdWxhdGluZ1wiLCBcImZvcm11bGF0aW5nXCIsIFwiY3liZXJwdW5rXCIsIFwibWVjaGFuaWNhbFwiLCBcInRlY2hub2xvZ2ljYWxcIixcbiAgICAgIFwiaW5ub3ZhdGl2ZVwiLCBcImJyYWlueVwiLCBcImNoZW1pY2FsXCIsIFwicXVhbnR1bVwiLCBcImFzdHJvXCIsIFwic3BhY2VcIiwgXCJ0aGVvcmV0aWNhbFwiLCBcImF0b21pY1wiLCBcImVsZWN0cm9uaWNcIiwgXCJnYXNlb3VzXCIsIFwiaW52ZXN0aWdhdGl2ZVwiLCBcInNvbGFyXCIsXG4gICAgICBcImV4dGluY3RcIiwgXCJnYWxhY3RpY1wiXTtcbiAgICAgIHJldHVybiBzY2llbnRpZmljO1xuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgc2NpZW50aWZpY19kZWZhdWx0ID0gW1wic2NpZW50aWZpY1wiLCBcInRlY2huaWNhbFwiLCBcImRpZ2l0YWxcIiwgXCJwcm9ncmFtbWluZ1wiLCBcImNhbGN1bGF0aW5nXCIsIFwiZm9ybXVsYXRpbmdcIiwgXCJjeWJlcnB1bmtcIiwgXCJtZWNoYW5pY2FsXCIsIFwidGVjaG5vbG9naWNhbFwiLFxuICAgICAgXCJpbm5vdmF0aXZlXCIsIFwiYnJhaW55XCIsIFwiY2hlbWljYWxcIiwgXCJxdWFudHVtXCIsIFwiYXN0cm9cIiwgXCJzcGFjZVwiLCBcInRoZW9yZXRpY2FsXCIsIFwiYXRvbWljXCIsIFwiZWxlY3Ryb25pY1wiLCBcImdhc2VvdXNcIiwgXCJpbnZlc3RpZ2F0aXZlXCIsIFwic29sYXJcIixcbiAgICAgIFwiZXh0aW5jdFwiLCBcImdhbGFjdGljXCJdO1xuICAgICAgcmV0dXJuIHNjaWVudGlmaWNfZGVmYXVsdDtcbiAgfVxufVxuXG4vLyBQdWxscyBub3VuIG91dCBvZiBhcnJheSB1c2luZyByYW5kb20gbnVtYmVyIHNlbnQgZnJvbSBnZW5lcmF0b3JcbmZ1bmN0aW9uIGdldE5vdW4oeSkge1xuICBzd2l0Y2goeSkge1xuICAgIGNhc2UgXCJhbmltYWxzXCI6XG4gICAgICB2YXIgYW5pbWFscyA9IFtcImZsYW1pbmdvXCIsIFwiaGVkZ2Vob2dcIiwgXCJvd2xcIiwgXCJlbGVwaGFudFwiLCBcInB1c3N5Y2F0XCIsIFwiYWxsaWdhdG9yXCIsIFwiZGFjaHN1bmRcIiwgXCJwb29kbGVcIiwgXCJiZWFnbGVcIiwgXCJjcm9jb2RpbGVcIiwgXCJrYW5nYXJvb1wiLFxuICAgICAgXCJ3YWxsYWJ5XCIsIFwid29vZHBlY2tlclwiLCBcImVhZ2xlXCIsIFwiZmFsY29uXCIsIFwiY2FuYXJ5XCIsIFwicGFycm90XCIsIFwicGFyYWtlZXRcIiwgXCJoYW1zdGVyXCIsIFwiZ2VyYmlsXCIsIFwic3F1aXJyZWxcIiwgXCJyYXRcIiwgXCJkb3ZlXCIsIFwidG91Y2FuXCIsXG4gICAgICBcInJhY2Nvb25cIiwgXCJ2dWx0dXJlXCIsIFwicGVhY29ja1wiLCBcImdvbGRmaXNoXCIsIFwicm9va1wiLCBcImtvYWxhXCIsIFwic2t1bmtcIiwgXCJnb2F0XCIsIFwicm9vc3RlclwiLCBcImZveFwiLCBcInBvcmN1cGluZVwiLCBcImxsYW1hXCIsIFwiZ3Jhc3Nob3BwZXJcIixcbiAgICAgIFwiZ29yaWxsYVwiLCBcIm1vbmtleVwiLCBcInNlYWhvcnNlXCIsIFwid29tYmF0XCIsIFwid29sZlwiLCBcImdpcmFmZmVcIiwgXCJiYWRnZXJcIiwgXCJsaW9uXCIsIFwibW91c2VcIiwgXCJiZWV0bGVcIiwgXCJjcmlja2V0XCIsIFwibmlnaHRpbmdhbGVcIixcbiAgICAgIFwiaGF3a1wiLCBcInRyb3V0XCIsIFwic3F1aWRcIiwgXCJvY3RvcHVzXCIsIFwic2xvdGhcIiwgXCJzbmFpbFwiLCBcImxvY3VzdFwiLCBcImJhYm9vblwiLCBcImxlbXVyXCIsIFwibWVlcmthdFwiLCBcIm95c3RlclwiLCBcImZyb2dcIiwgXCJ0b2FkXCIsIFwiamVsbHlmaXNoXCIsXG4gICAgICBcImJ1dHRlcmZseVwiLCBcImNhdGVycGlsbGFyXCIsIFwidGlnZXJcIiwgXCJoeWVuYVwiLCBcInplYnJhXCIsIFwic25haWxcIiwgXCJwaWdcIiwgXCJ3ZWFzZWxcIiwgXCJkb25rZXlcIiwgXCJwZW5ndWluXCIsIFwiY3JhbmVcIiwgXCJidXp6YXJkXCIsIFwidnVsdHVyZVwiLFxuICAgICAgXCJyaGlub1wiLCBcImhpcHBvcG90YW11c1wiLCBcImRvbHBoaW5cIiwgXCJzcGFycm93XCIsIFwiYmVhdmVyXCIsIFwibW9vc2VcIiwgXCJtaW5ub3dcIiwgXCJvdHRlclwiLCBcImJhdFwiLCBcIm1vbmdvb3NlXCIsIFwic3dhblwiLCBcImZpcmVmbHlcIiwgXCJwbGF0eXB1c1wiXTtcbiAgICAgIHJldHVybiBhbmltYWxzO1xuICAgIGNhc2UgXCJwcm9mZXNzaW9uXCI6XG4gICAgICB2YXIgcHJvZmVzc2lvbnMgPSBbXCJkb2N0b3JcIiwgXCJsYXd5ZXJcIiwgXCJuaW5qYVwiLCBcIndyaXRlclwiLCBcInNhbXVyYWlcIiwgXCJzdXJnZW9uXCIsIFwiY2xlcmtcIiwgXCJhcnRpc3RcIiwgXCJhY3RvclwiLCBcImVuZ2luZWVyXCIsIFwibWVjaGFuaWNcIixcbiAgICAgIFwiY29tZWRpYW5cIiwgXCJmaXJlbWFuXCIsIFwibnVyc2VcIiwgXCJSb2NrU3RhclwiLCBcIm11c2ljaWFuXCIsIFwiY2FycGVudGVyXCIsIFwicGx1bWJlclwiLCBcImNhc2hpZXJcIiwgXCJlbGVjdHJpY2lhblwiLCBcIndhaXRlclwiLCBcInByZXNpZGVudFwiLCBcImdvdmVybm9yXCIsXG4gICAgICBcInNlbmF0b3JcIiwgXCJzY2llbnRpc3RcIiwgXCJwcm9ncmFtbWVyXCIsIFwic2luZ2VyXCIsIFwiZGFuY2VyXCIsIFwiZGlyZWN0b3JcIiwgXCJtYXlvclwiLCBcIm1lcmNoYW50XCIsIFwiZGV0ZWN0aXZlXCIsIFwiaW52ZXN0aWdhdG9yXCIsIFwibmF2aWdhdG9yXCIsIFwicGlsb3RcIixcbiAgICAgIFwicHJpZXN0XCIsIFwiY293Ym95XCIsIFwic3RhZ2VoYW5kXCIsIFwic29sZGllclwiLCBcImFtYmFzc2Fkb3JcIiwgXCJwaXJhdGVcIiwgXCJtaW5lclwiLCBcInBvbGljZVwiXTtcbiAgICAgIHJldHVybiBwcm9mZXNzaW9ucztcbiAgICBjYXNlIFwiZmFudGFzeVwiOlxuICAgICAgdmFyIGZhbnRhc3kgPSBbXCJjZW50YXVyXCIsIFwid2l6YXJkXCIsIFwiZ25vbWVcIiwgXCJvcmNcIiwgXCJ0cm9sbFwiLCBcInN3b3JkXCIsIFwiZmFpcnlcIiwgXCJwZWdhc3VzXCIsIFwiaGFsZmxpbmdcIiwgXCJlbGZcIiwgXCJjaGFuZ2VsaW5nXCIsIFwiZ2hvc3RcIixcbiAgICAgIFwia25pZ2h0XCIsIFwic3F1aXJlXCIsIFwibWFnaWNpYW5cIiwgXCJ3aXRjaFwiLCBcIndhcmxvY2tcIiwgXCJ1bmljb3JuXCIsIFwiZHJhZ29uXCIsIFwid3l2ZXJuXCIsIFwicHJpbmNlc3NcIiwgXCJwcmluY2VcIiwgXCJraW5nXCIsIFwicXVlZW5cIiwgXCJqZXN0ZXJcIixcbiAgICAgIFwidG93ZXJcIiwgXCJjYXN0bGVcIiwgXCJrcmFrZW5cIiwgXCJzZWFtb25zdGVyXCIsIFwibWVybWFpZFwiLCBcInBzeWNoaWNcIiwgXCJzZWVyXCIsIFwib3JhY2xlXCJdO1xuICAgICAgcmV0dXJuIGZhbnRhc3k7XG4gICAgY2FzZSBcIm11c2ljXCI6XG4gICAgICB2YXIgbXVzaWMgPSBbXCJ2aW9saW5cIiwgXCJmbHV0ZVwiLCBcImJhZ3BpcGVcIiwgXCJndWl0YXJcIiwgXCJzeW1waG9ueVwiLCBcIm9yY2hlc3RyYVwiLCBcInBpYW5vXCIsIFwidHJvbWJvbmVcIiwgXCJ0dWJhXCIsIFwib3BlcmFcIiwgXCJkcnVtc1wiLFxuICAgICAgXCJoYXJwc2ljaG9yZFwiLCBcImhhcnBcIiwgXCJoYXJtb25pY2FcIiwgXCJhY2NvcmRpb25cIiwgXCJ0ZW5vclwiLCBcInNvcHJhbm9cIiwgXCJiYXJpdG9uZVwiLCBcImNlbGxvXCIsIFwidmlvbGFcIiwgXCJwaWNjb2xvXCIsIFwidWtlbGVsZVwiLCBcIndvb2R3aW5kXCIsIFwic2F4b3Bob25lXCIsXG4gICAgICBcImJ1Z2xlXCIsIFwidHJ1bXBldFwiLCBcInNvdXNhcGhvbmVcIiwgXCJjb3JuZXRcIiwgXCJzdHJhZGl2YXJpdXNcIiwgXCJtYXJpbWJhc1wiLCBcImJlbGxzXCIsIFwidGltcGFuaVwiLCBcImJvbmdvc1wiLCBcImNsYXJpbmV0XCIsIFwicmVjb3JkZXJcIiwgXCJvYm9lXCIsIFwiY29uZHVjdG9yXCIsXG4gICAgICBcInNpbmdlclwiXTtcbiAgICAgIHJldHVybiBtdXNpYztcbiAgICBjYXNlIFwiaG9ycm9yXCI6XG4gICAgICB2YXIgaG9ycm9yID0gW1wibXVyZGVyZXJcIiwgXCJjaGFpbnNhd1wiLCBcImtuaWZlXCIsIFwic3dvcmRcIiwgXCJtdXJkZXJcIiwgXCJkZXZpbFwiLCBcImtpbGxlclwiLCBcInBzeWNob1wiLCBcImdob3N0XCIsIFwibW9uc3RlclwiLCBcImdvZHppbGxhXCIsIFwid2VyZXdvbGZcIixcbiAgICAgIFwidmFtcGlyZVwiLCBcImRlbW9uXCIsIFwiZ3JhdmV5YXJkXCIsIFwiem9tYmllXCIsIFwibXVtbXlcIiwgXCJjdXJzZVwiLCBcImRlYXRoXCIsIFwiZ3JhdmVcIiwgXCJ0b21iXCIsIFwiYmVhc3RcIiwgXCJuaWdodG1hcmVcIiwgXCJmcmFua2Vuc3RlaW5cIiwgXCJzcGVjdGVyXCIsXG4gICAgICBcInBvbHRlcmdlaXN0XCIsIFwid3JhaXRoXCIsIFwiY29ycHNlXCIsIFwic2NyZWFtXCIsIFwibWFzc2FjcmVcIiwgXCJjYW5uaWJhbFwiLCBcInNrdWxsXCIsIFwiYm9uZXNcIiwgXCJ1bmRlcnRha2VyXCIsIFwiem9tYmllXCIsIFwiY3JlYXR1cmVcIiwgXCJtYXNrXCIsIFwicHN5Y2hvcGF0aFwiLFxuICAgICAgXCJmaWVuZFwiLCBcInNhdGFuaXN0XCIsIFwibW9vblwiLCBcImZ1bGxNb29uXCJdO1xuICAgICAgcmV0dXJuIGhvcnJvcjtcbiAgICBjYXNlIFwiZ3Jvc3NcIjpcbiAgICAgIHZhciBncm9zcyA9IFtcInNsaW1lXCIsIFwiYnVnXCIsIFwicm9hY2hcIiwgXCJmbHVpZFwiLCBcInB1c1wiLCBcImJvb2dlclwiLCBcInNwaXRcIiwgXCJib2lsXCIsIFwiYmxpc3RlclwiLCBcIm9yaWZpY2VcIiwgXCJzZWNyZXRpb25cIiwgXCJtdWN1c1wiLCBcInBobGVnbVwiLFxuICAgICAgXCJjZW50aXBlZGVcIiwgXCJiZWV0bGVcIiwgXCJmYXJ0XCIsIFwic25vdFwiLCBcImNyZXZpY2VcIiwgXCJmbGF0dWxlbmNlXCIsIFwianVpY2VcIiwgXCJtb2xkXCIsIFwibWlsZGV3XCIsIFwiZ2VybXNcIiwgXCJkaXNjaGFyZ2VcIiwgXCJ0b2lsZXRcIiwgXCJ1ZGRlclwiLCBcIm9kb3JcIiwgXCJzdWJzdGFuY2VcIixcbiAgICAgIFwiZmx1aWRcIiwgXCJtb2lzdHVyZVwiLCBcImdhcmJhZ2VcIiwgXCJ0cmFzaFwiLCBcImJ1Z1wiXTtcbiAgICAgIHJldHVybiBncm9zcztcbiAgICBjYXNlIFwiZXZlcnlkYXlcIjpcbiAgICAgIHZhciBldmVyeWRheSA9IFtcIm1pcnJvclwiLCBcImtuaWZlXCIsIFwiZm9ya1wiLCBcInNwb3JrXCIsIFwic3Bvb25cIiwgXCJ0dXBwZXJ3YXJlXCIsIFwibWluaXZhblwiLCBcInN1YnVyYlwiLCBcImxhbXBcIiwgXCJkZXNrXCIsIFwic3RlcmVvXCIsIFwidGVsZXZpc2lvblwiLCBcIlRWXCIsXG4gICAgICBcImJvb2tcIiwgXCJjYXJcIiwgXCJ0cnVja1wiLCBcInNvZGFcIiwgXCJkb29yXCIsIFwidmlkZW9cIiwgXCJnYW1lXCIsIFwiY29tcHV0ZXJcIiwgXCJjYWxlbmRlclwiLCBcInRyZWVcIiwgXCJwbGFudFwiLCBcImZsb3dlclwiLCBcImNoaW1uZXlcIiwgXCJhdHRpY1wiLCBcImtpdGNoZW5cIixcbiAgICAgIFwiZ2FyZGVuXCIsIFwic2Nob29sXCIsIFwid2FsbGV0XCIsIFwiYm90dGxlXCJdO1xuICAgICAgcmV0dXJuIGV2ZXJ5ZGF5O1xuICAgIGNhc2UgXCJqZXdlbHJ5XCI6XG4gICAgICB2YXIgamV3ZWxyeSA9IFtcImVhcnJpbmdzXCIsIFwicmluZ1wiLCBcIm5lY2tsYWNlXCIsIFwicGVuZGFudFwiLCBcImNob2tlclwiLCBcImJyb29jaFwiLCBcImJyYWNlbGV0XCIsIFwiY2FtZW9cIiwgXCJjaGFybVwiLCBcImJhdWJsZVwiLCBcInRyaW5rZXRcIiwgXCJqZXdlbHJ5XCIsXG4gICAgICBcImFua2xldFwiLCBcImJhbmdsZVwiLCBcImxvY2tldFwiLCBcImZpbmVyeVwiLCBcImNyb3duXCIsIFwidGlhcmFcIiwgXCJibGluZ0JsaW5nXCIsIFwiY2hhaW5cIiwgXCJyb3NhcnlcIiwgXCJqZXdlbFwiLCBcImdlbXN0b25lXCIsIFwiYmVhZHNcIiwgXCJhcm1iYW5kXCIsIFwicGluXCIsXG4gICAgICBcImNvc3R1bWVcIiwgXCJvcm5hbWVudFwiLCBcInRyZWFzdXJlXCJdO1xuICAgICAgcmV0dXJuIGpld2Vscnk7XG4gICAgY2FzZSBcInBsYWNlc1wiOlxuICAgICAgdmFyIHBsYWNlcyA9IFtcInN3YW1wXCIsIFwiZ3JhdmV5YXJkXCIsIFwiY2VtZXRlcnlcIiwgXCJwYXJrXCIsIFwiYnVpbGRpbmdcIiwgXCJob3VzZVwiLCBcInJpdmVyXCIsIFwib2NlYW5cIiwgXCJzZWFcIiwgXCJmaWVsZFwiLCBcImZvcmVzdFwiLCBcIndvb2RzXCIsIFwibmVpZ2hib3Job29kXCIsXG4gICAgICBcImNpdHlcIiwgXCJ0b3duXCIsIFwic3VidXJiXCIsIFwiY291bnRyeVwiLCBcIm1lYWRvd1wiLCBcImNsaWZmc1wiLCBcImxha2VcIiwgXCJzdHJlYW1cIiwgXCJjcmVla1wiLCBcInNjaG9vbFwiLCBcImNvbGxlZ2VcIiwgXCJ1bml2ZXJzaXR5XCIsIFwibGlicmFyeVwiLCBcImJha2VyeVwiLFxuICAgICAgXCJzaG9wXCIsIFwic3RvcmVcIiwgXCJ0aGVhdGVyXCIsIFwiZ2FyZGVuXCIsIFwiY2FueW9uXCIsIFwiaGlnaHdheVwiLCBcInJlc3RhdXJhbnRcIiwgXCJjYWZlXCIsIFwiZGluZXJcIiwgXCJzdHJlZXRcIiwgXCJyb2FkXCIsIFwiZnJlZXdheVwiLCBcImFsbGV5XCJdO1xuICAgICAgcmV0dXJuIHBsYWNlcztcbiAgICBjYXNlIFwic2NpZmlcIjpcbiAgICAgIHZhciBzY2lmaSA9IFtcInJvYm90XCIsIFwiYWxpZW5cIiwgXCJyYXlndW5cIiwgXCJzcGFjZXNoaXBcIiwgXCJVRk9cIiwgXCJyb2NrZXRcIiwgXCJwaGFzZXJcIiwgXCJhc3Ryb25hdXRcIiwgXCJzcGFjZW1hblwiLCBcInBsYW5ldFwiLCBcInN0YXJcIiwgXCJnYWxheHlcIixcbiAgICAgIFwiY29tcHV0ZXJcIiwgXCJmdXR1cmVcIiwgXCJ0aW1lTWFjaGluZVwiLCBcIndvcm1Ib2xlXCIsIFwidGltZVRyYXZlbGVyXCIsIFwic2NpZW50aXN0XCIsIFwiaW52ZW50aW9uXCIsIFwibWFydGlhblwiLCBcInBsdXRvXCIsIFwianVwaXRlclwiLCBcInNhdHVyblwiLCBcIm1hcnNcIixcbiAgICAgIFwicXVhc2FyXCIsIFwiYmxhY2tIb2xlXCIsIFwid2FycERyaXZlXCIsIFwibGFzZXJcIiwgXCJvcmJpdFwiLCBcImdlYXJzXCIsIFwibW9sZWN1bGVcIiwgXCJlbGVjdHJvblwiLCBcIm5ldXRyaW5vXCIsIFwicHJvdG9uXCIsIFwiZXhwZXJpbWVudFwiLCBcInBob3RvblwiLCBcImFwcGFyYXR1c1wiLFxuICAgICAgXCJ1bml2ZXJzZVwiLCBcImdyYXZpdHlcIiwgXCJkYXJrTWF0dGVyXCIsIFwiY29uc3RlbGxhdGlvblwiLCBcImNpcmN1aXRcIiwgXCJhc3Rlcm9pZFwiXTtcbiAgICAgIHJldHVybiBzY2lmaTtcbiAgICBkZWZhdWx0OlxuICAgICAgdmFyIHNjaWZpX2RlZmF1bHQgPSBbXCJyb2JvdFwiLCBcImFsaWVuXCIsIFwicmF5Z3VuXCIsIFwic3BhY2VzaGlwXCIsIFwiVUZPXCIsIFwicm9ja2V0XCIsIFwicGhhc2VyXCIsIFwiYXN0cm9uYXV0XCIsIFwic3BhY2VtYW5cIiwgXCJwbGFuZXRcIiwgXCJzdGFyXCIsIFwiZ2FsYXh5XCIsXG4gICAgICBcImNvbXB1dGVyXCIsIFwiZnV0dXJlXCIsIFwidGltZU1hY2hpbmVcIiwgXCJ3b3JtSG9sZVwiLCBcInRpbWVUcmF2ZWxlclwiLCBcInNjaWVudGlzdFwiLCBcImludmVudGlvblwiLCBcIm1hcnRpYW5cIiwgXCJwbHV0b1wiLCBcImp1cGl0ZXJcIiwgXCJzYXR1cm5cIiwgXCJtYXJzXCIsXG4gICAgICBcInF1YXNhclwiLCBcImJsYWNrSG9sZVwiLCBcIndhcnBEcml2ZVwiLCBcImxhc2VyXCIsIFwib3JiaXRcIiwgXCJnZWFyc1wiLCBcIm1vbGVjdWxlXCIsIFwiZWxlY3Ryb25cIiwgXCJuZXV0cmlub1wiLCBcInByb3RvblwiLCBcImV4cGVyaW1lbnRcIiwgXCJwaG90b25cIiwgXCJhcHBhcmF0dXNcIixcbiAgICAgIFwidW5pdmVyc2VcIiwgXCJncmF2aXR5XCIsIFwiZGFya01hdHRlclwiLCBcImNvbnN0ZWxsYXRpb25cIiwgXCJjaXJjdWl0XCIsIFwiYXN0ZXJvaWRcIl07XG4gICAgICByZXR1cm4gc2NpZmlfZGVmYXVsdDtcbiAgfVxufVxuXG52YXIgYWRqZWN0aXZlcyA9IFtcImRhcmtcIiwgXCJjb2xvclwiLCBcIndoaW1zaWNhbFwiLCBcInNoaW55XCIsIFwibm9pc2VcIiwgXCJhcG9jYWx5cHRpY1wiLCBcImluc3VsdGluZ1wiLCBcInByYWlzZVwiLCBcInNjaWVudGlmaWNcIl07ICAvLyB0eXBlcyBvZiBhZGplY3RpdmVzIGZvciBwaXp6YSB0aXRsZXNcbnZhciBub3VucyA9IFtcImFuaW1hbHNcIiwgXCJldmVyeWRheVwiLCBcImZhbnRhc3lcIiwgXCJncm9zc1wiLCBcImhvcnJvclwiLCBcImpld2VscnlcIiwgXCJwbGFjZXNcIiwgXCJzY2lmaVwiXTsgICAgICAgICAgICAgICAgICAgICAgICAvLyB0eXBlcyBvZiBub3VucyBmb3IgcGl6emEgdGl0bGVzXG5cbi8vIEdlbmVyYXRlcyByYW5kb20gbnVtYmVycyBmb3IgZ2V0QWRqIGFuZCBnZXROb3VuIGZ1bmN0aW9ucyBhbmQgcmV0dXJucyBhIG5ldyBwaXp6YSBuYW1lXG5mdW5jdGlvbiBnZW5lcmF0b3IoYWRqLCBub3VuKSB7XG4gIHZhciBhZGplY3RpdmVzID0gZ2V0QWRqKGFkaik7XG4gIHZhciBub3VucyA9IGdldE5vdW4obm91bik7XG4gIHZhciByYW5kb21BZGplY3RpdmUgPSBwYXJzZUludChNYXRoLnJhbmRvbSgpICogYWRqZWN0aXZlcy5sZW5ndGgpO1xuICB2YXIgcmFuZG9tTm91biA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiBub3Vucy5sZW5ndGgpO1xuICB2YXIgbmFtZSA9IFwiVGhlIFwiICsgYWRqZWN0aXZlc1tyYW5kb21BZGplY3RpdmVdLmNhcGl0YWxpemUoKSArIFwiIFwiICsgbm91bnNbcmFuZG9tTm91bl0uY2FwaXRhbGl6ZSgpO1xuICByZXR1cm4gbmFtZTtcbn1cblxuLy8gQ2hvb3NlcyByYW5kb20gYWRqZWN0aXZlIGFuZCByYW5kb20gbm91blxuZnVuY3Rpb24gcmFuZG9tTmFtZSgpIHtcbiAgdmFyIHJhbmRvbU51bWJlckFkaiA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiBhZGplY3RpdmVzLmxlbmd0aCk7XG4gIHZhciByYW5kb21OdW1iZXJOb3VuID0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIG5vdW5zLmxlbmd0aCk7XG4gIHJldHVybiBnZW5lcmF0b3IoYWRqZWN0aXZlc1tyYW5kb21OdW1iZXJBZGpdLCBub3Vuc1tyYW5kb21OdW1iZXJOb3VuXSk7XG59XG5cbi8vIFRoZXNlIGZ1bmN0aW9ucyByZXR1cm4gYSBzdHJpbmcgb2YgYSByYW5kb20gaW5ncmVkaWVudCBmcm9tIGVhY2ggcmVzcGVjdGl2ZSBjYXRlZ29yeSBvZiBpbmdyZWRpZW50cy5cbnZhciBzZWxlY3RSYW5kb21NZWF0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciByYW5kb21NZWF0ID0gcGl6emFJbmdyZWRpZW50cy5tZWF0c1tNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogcGl6emFJbmdyZWRpZW50cy5tZWF0cy5sZW5ndGgpKV07XG4gIHJldHVybiByYW5kb21NZWF0O1xufTtcblxudmFyIHNlbGVjdFJhbmRvbU5vbk1lYXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJhbmRvbU5vbk1lYXQgPSBwaXp6YUluZ3JlZGllbnRzLm5vbk1lYXRzW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiBwaXp6YUluZ3JlZGllbnRzLm5vbk1lYXRzLmxlbmd0aCkpXTtcbiAgcmV0dXJuIHJhbmRvbU5vbk1lYXQ7XG59O1xuXG52YXIgc2VsZWN0UmFuZG9tQ2hlZXNlID0gZnVuY3Rpb24oKSB7XG4gIHZhciByYW5kb21DaGVlc2UgPSBwaXp6YUluZ3JlZGllbnRzLmNoZWVzZXNbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIHBpenphSW5ncmVkaWVudHMuY2hlZXNlcy5sZW5ndGgpKV07XG4gIHJldHVybiByYW5kb21DaGVlc2U7XG59O1xuXG52YXIgc2VsZWN0UmFuZG9tU2F1Y2UgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJhbmRvbVNhdWNlID0gcGl6emFJbmdyZWRpZW50cy5zYXVjZXNbTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIHBpenphSW5ncmVkaWVudHMuc2F1Y2VzLmxlbmd0aCkpXTtcbiAgcmV0dXJuIHJhbmRvbVNhdWNlO1xufTtcblxudmFyIHNlbGVjdFJhbmRvbUNydXN0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciByYW5kb21DcnVzdCA9IHBpenphSW5ncmVkaWVudHMuY3J1c3RzW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiBwaXp6YUluZ3JlZGllbnRzLmNydXN0cy5sZW5ndGgpKV07XG4gIHJldHVybiByYW5kb21DcnVzdDtcbn07XG5cbnZhciBpbmdyZWRpZW50SXRlbWl6ZXIgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgcmV0dXJuIFwiPGxpPlwiICsgc3RyaW5nICsgXCI8L2xpPlwiO1xufTtcblxuLy8gUmV0dXJucyBhIHN0cmluZyB3aXRoIHJhbmRvbSBwaXp6YSBpbmdyZWRpZW50cyBuZXN0ZWQgaW5zaWRlIDxsaT4gdGFnc1xudmFyIG1ha2VSYW5kb21QaXp6YSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcGl6emEgPSBcIlwiO1xuXG4gIHZhciBudW1iZXJPZk1lYXRzID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDQpKTtcbiAgdmFyIG51bWJlck9mTm9uTWVhdHMgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMykpO1xuICB2YXIgbnVtYmVyT2ZDaGVlc2VzID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDIpKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlck9mTWVhdHM7IGkrKykge1xuICAgIHBpenphID0gcGl6emEgKyBpbmdyZWRpZW50SXRlbWl6ZXIoc2VsZWN0UmFuZG9tTWVhdCgpKTtcbiAgfVxuXG4gIGZvciAodmFyIGogPSAwOyBqIDwgbnVtYmVyT2ZOb25NZWF0czsgaisrKSB7XG4gICAgcGl6emEgPSBwaXp6YSArIGluZ3JlZGllbnRJdGVtaXplcihzZWxlY3RSYW5kb21Ob25NZWF0KCkpO1xuICB9XG5cbiAgZm9yICh2YXIgayA9IDA7IGsgPCBudW1iZXJPZkNoZWVzZXM7IGsrKykge1xuICAgIHBpenphID0gcGl6emEgKyBpbmdyZWRpZW50SXRlbWl6ZXIoc2VsZWN0UmFuZG9tQ2hlZXNlKCkpO1xuICB9XG5cbiAgcGl6emEgPSBwaXp6YSArIGluZ3JlZGllbnRJdGVtaXplcihzZWxlY3RSYW5kb21TYXVjZSgpKTtcbiAgcGl6emEgPSBwaXp6YSArIGluZ3JlZGllbnRJdGVtaXplcihzZWxlY3RSYW5kb21DcnVzdCgpKTtcblxuICByZXR1cm4gcGl6emE7XG59O1xuXG4vLyByZXR1cm5zIGEgRE9NIGVsZW1lbnQgZm9yIGVhY2ggcGl6emFcbnZhciBwaXp6YUVsZW1lbnRHZW5lcmF0b3IgPSBmdW5jdGlvbihpKSB7XG4gIHZhciBwaXp6YUNvbnRhaW5lciwgICAgICAgICAgICAgLy8gY29udGFpbnMgcGl6emEgdGl0bGUsIGltYWdlIGFuZCBsaXN0IG9mIGluZ3JlZGllbnRzXG4gICAgICBwaXp6YUltYWdlQ29udGFpbmVyLCAgICAgICAgLy8gY29udGFpbnMgdGhlIHBpenphIGltYWdlXG4gICAgICBwaXp6YUltYWdlLCAgICAgICAgICAgICAgICAgLy8gdGhlIHBpenphIGltYWdlIGl0c2VsZlxuICAgICAgcGl6emFEZXNjcmlwdGlvbkNvbnRhaW5lciwgIC8vIGNvbnRhaW5zIHRoZSBwaXp6YSB0aXRsZSBhbmQgbGlzdCBvZiBpbmdyZWRpZW50c1xuICAgICAgcGl6emFOYW1lLCAgICAgICAgICAgICAgICAgIC8vIHRoZSBwaXp6YSBuYW1lIGl0c2VsZlxuICAgICAgdWw7ICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBsaXN0IG9mIGluZ3JlZGllbnRzXG5cbiAgcGl6emFDb250YWluZXIgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcGl6emFJbWFnZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHBpenphSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICBwaXp6YURlc2NyaXB0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICBwaXp6YUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicmFuZG9tUGl6emFDb250YWluZXJcIik7XG4gIHBpenphQ29udGFpbmVyLnN0eWxlLndpZHRoID0gXCIzMy4zMyVcIjtcbiAgcGl6emFDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gXCIzMjVweFwiO1xuICBwaXp6YUNvbnRhaW5lci5pZCA9IFwicGl6emFcIiArIGk7ICAgICAgICAgICAgICAgIC8vIGdpdmVzIGVhY2ggcGl6emEgZWxlbWVudCBhIHVuaXF1ZSBpZFxuICBwaXp6YUltYWdlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb2wtbWQtNlwiKTtcblxuICBwaXp6YUltYWdlLnNyYyA9IFwiaW1hZ2VzL3BpenphLnBuZ1wiO1xuICBwaXp6YUltYWdlLmNsYXNzTGlzdC5hZGQoXCJpbWctcmVzcG9uc2l2ZVwiKTtcbiAgcGl6emFJbWFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwaXp6YUltYWdlKTtcbiAgcGl6emFDb250YWluZXIuYXBwZW5kQ2hpbGQocGl6emFJbWFnZUNvbnRhaW5lcik7XG5cblxuICBwaXp6YURlc2NyaXB0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb2wtbWQtNlwiKTtcblxuICBwaXp6YU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDRcIik7XG4gIHBpenphTmFtZS5pbm5lckhUTUwgPSByYW5kb21OYW1lKCk7XG4gIHBpenphRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQocGl6emFOYW1lKTtcblxuICB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgdWwuaW5uZXJIVE1MID0gbWFrZVJhbmRvbVBpenphKCk7XG4gIHBpenphRGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQodWwpO1xuICBwaXp6YUNvbnRhaW5lci5hcHBlbmRDaGlsZChwaXp6YURlc2NyaXB0aW9uQ29udGFpbmVyKTtcblxuICByZXR1cm4gcGl6emFDb250YWluZXI7XG59O1xuXG4vLyByZXNpemVQaXp6YXMoc2l6ZSkgaXMgY2FsbGVkIHdoZW4gdGhlIHNsaWRlciBpbiB0aGUgXCJPdXIgUGl6emFzXCIgc2VjdGlvbiBvZiB0aGUgd2Vic2l0ZSBtb3Zlcy5cbnZhciByZXNpemVQaXp6YXMgPSBmdW5jdGlvbihzaXplKSB7XG4gIHdpbmRvdy5wZXJmb3JtYW5jZS5tYXJrKFwibWFya19zdGFydF9yZXNpemVcIik7ICAgLy8gVXNlciBUaW1pbmcgQVBJIGZ1bmN0aW9uXG5cbiAgLy8gQ2hhbmdlcyB0aGUgdmFsdWUgZm9yIHRoZSBzaXplIG9mIHRoZSBwaXp6YSBhYm92ZSB0aGUgc2xpZGVyXG4gIGZ1bmN0aW9uIGNoYW5nZVNsaWRlckxhYmVsKHNpemUpIHtcbiAgICBzd2l0Y2goc2l6ZSkge1xuICAgICAgY2FzZSBcIjFcIjpcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwaXp6YVNpemVcIikuaW5uZXJIVE1MID0gXCJTbWFsbFwiO1xuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIFwiMlwiOlxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BpenphU2l6ZVwiKS5pbm5lckhUTUwgPSBcIk1lZGl1bVwiO1xuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIFwiM1wiOlxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BpenphU2l6ZVwiKS5pbm5lckhUTUwgPSBcIkxhcmdlXCI7XG4gICAgICAgIHJldHVybjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYnVnIGluIGNoYW5nZVNsaWRlckxhYmVsXCIpO1xuICAgIH1cbiAgfVxuXG4gIGNoYW5nZVNsaWRlckxhYmVsKHNpemUpO1xuXG4gIC8vIFJldHVybnMgdGhlIHNpemUgZGlmZmVyZW5jZSB0byBjaGFuZ2UgYSBwaXp6YSBlbGVtZW50IGZyb20gb25lIHNpemUgdG8gYW5vdGhlci4gQ2FsbGVkIGJ5IGNoYW5nZVBpenphU2xpY2VzKHNpemUpLlxuICBmdW5jdGlvbiBkZXRlcm1pbmVEeCAoZWxlbSwgc2l6ZSkge1xuICAgIHZhciBvbGR3aWR0aCA9IGVsZW0ub2Zmc2V0V2lkdGg7XG4gICAgdmFyIHdpbmRvd3dpZHRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyYW5kb21QaXp6YXNcIikub2Zmc2V0V2lkdGg7XG4gICAgdmFyIG9sZHNpemUgPSBvbGR3aWR0aCAvIHdpbmRvd3dpZHRoO1xuXG4gICAgLy8gVE9ETzogY2hhbmdlIHRvIDMgc2l6ZXM/IG5vIG1vcmUgeGw/XG4gICAgLy8gQ2hhbmdlcyB0aGUgc2xpZGVyIHZhbHVlIHRvIGEgcGVyY2VudCB3aWR0aFxuICAgIGZ1bmN0aW9uIHNpemVTd2l0Y2hlciAoc2l6ZSkge1xuICAgICAgc3dpdGNoKHNpemUpIHtcbiAgICAgICAgY2FzZSBcIjFcIjpcbiAgICAgICAgICByZXR1cm4gMC4yNTtcbiAgICAgICAgY2FzZSBcIjJcIjpcbiAgICAgICAgICByZXR1cm4gMC4zMzMzO1xuICAgICAgICBjYXNlIFwiM1wiOlxuICAgICAgICAgIHJldHVybiAwLjU7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS5sb2coXCJidWcgaW4gc2l6ZVN3aXRjaGVyXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBuZXdzaXplID0gc2l6ZVN3aXRjaGVyKHNpemUpO1xuICAgIHZhciBkeCA9IChuZXdzaXplIC0gb2xkc2l6ZSkgKiB3aW5kb3d3aWR0aDtcblxuICAgIHJldHVybiBkeDtcbiAgfVxuXG4gIC8vIEl0ZXJhdGVzIHRocm91Z2ggcGl6emEgZWxlbWVudHMgb24gdGhlIHBhZ2UgYW5kIGNoYW5nZXMgdGhlaXIgd2lkdGhzXG4gIGZ1bmN0aW9uIGNoYW5nZVBpenphU2l6ZXMoc2l6ZSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yYW5kb21QaXp6YUNvbnRhaW5lclwiKS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGR4ID0gZGV0ZXJtaW5lRHgoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yYW5kb21QaXp6YUNvbnRhaW5lclwiKVtpXSwgc2l6ZSk7XG4gICAgICB2YXIgbmV3d2lkdGggPSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yYW5kb21QaXp6YUNvbnRhaW5lclwiKVtpXS5vZmZzZXRXaWR0aCArIGR4KSArICdweCc7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJhbmRvbVBpenphQ29udGFpbmVyXCIpW2ldLnN0eWxlLndpZHRoID0gbmV3d2lkdGg7XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlUGl6emFTaXplcyhzaXplKTtcblxuICAvLyBVc2VyIFRpbWluZyBBUEkgaXMgYXdlc29tZVxuICB3aW5kb3cucGVyZm9ybWFuY2UubWFyayhcIm1hcmtfZW5kX3Jlc2l6ZVwiKTtcbiAgd2luZG93LnBlcmZvcm1hbmNlLm1lYXN1cmUoXCJtZWFzdXJlX3BpenphX3Jlc2l6ZVwiLCBcIm1hcmtfc3RhcnRfcmVzaXplXCIsIFwibWFya19lbmRfcmVzaXplXCIpO1xuICB2YXIgdGltZVRvUmVzaXplID0gd2luZG93LnBlcmZvcm1hbmNlLmdldEVudHJpZXNCeU5hbWUoXCJtZWFzdXJlX3BpenphX3Jlc2l6ZVwiKTtcbiAgY29uc29sZS5sb2coXCJUaW1lIHRvIHJlc2l6ZSBwaXp6YXM6IFwiICsgdGltZVRvUmVzaXplWzBdLmR1cmF0aW9uICsgXCJtc1wiKTtcbn07XG5cbndpbmRvdy5wZXJmb3JtYW5jZS5tYXJrKFwibWFya19zdGFydF9nZW5lcmF0aW5nXCIpOyAvLyBjb2xsZWN0IHRpbWluZyBkYXRhXG5cbi8vIFRoaXMgZm9yLWxvb3AgYWN0dWFsbHkgY3JlYXRlcyBhbmQgYXBwZW5kcyBhbGwgb2YgdGhlIHBpenphcyB3aGVuIHRoZSBwYWdlIGxvYWRzXG5mb3IgKHZhciBpID0gMjsgaSA8IDEwMDsgaSsrKSB7XG4gIHZhciBwaXp6YXNEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhbmRvbVBpenphc1wiKTtcbiAgcGl6emFzRGl2LmFwcGVuZENoaWxkKHBpenphRWxlbWVudEdlbmVyYXRvcihpKSk7XG59XG5cbi8vIFVzZXIgVGltaW5nIEFQSSBhZ2Fpbi4gVGhlc2UgbWVhc3VyZW1lbnRzIHRlbGwgeW91IGhvdyBsb25nIGl0IHRvb2sgdG8gZ2VuZXJhdGUgdGhlIGluaXRpYWwgcGl6emFzXG53aW5kb3cucGVyZm9ybWFuY2UubWFyayhcIm1hcmtfZW5kX2dlbmVyYXRpbmdcIik7XG53aW5kb3cucGVyZm9ybWFuY2UubWVhc3VyZShcIm1lYXN1cmVfcGl6emFfZ2VuZXJhdGlvblwiLCBcIm1hcmtfc3RhcnRfZ2VuZXJhdGluZ1wiLCBcIm1hcmtfZW5kX2dlbmVyYXRpbmdcIik7XG52YXIgdGltZVRvR2VuZXJhdGUgPSB3aW5kb3cucGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5TmFtZShcIm1lYXN1cmVfcGl6emFfZ2VuZXJhdGlvblwiKTtcbmNvbnNvbGUubG9nKFwiVGltZSB0byBnZW5lcmF0ZSBwaXp6YXMgb24gbG9hZDogXCIgKyB0aW1lVG9HZW5lcmF0ZVswXS5kdXJhdGlvbiArIFwibXNcIik7XG5cbi8vIEl0ZXJhdG9yIGZvciBudW1iZXIgb2YgdGltZXMgdGhlIHBpenphcyBpbiB0aGUgYmFja2dyb3VuZCBoYXZlIHNjcm9sbGVkLlxuLy8gVXNlZCBieSB1cGRhdGVQb3NpdGlvbnMoKSB0byBkZWNpZGUgd2hlbiB0byBsb2cgdGhlIGF2ZXJhZ2UgdGltZSBwZXIgZnJhbWVcbnZhciBmcmFtZSA9IDA7XG5cbi8vIExvZ3MgdGhlIGF2ZXJhZ2UgYW1vdW50IG9mIHRpbWUgcGVyIDEwIGZyYW1lcyBuZWVkZWQgdG8gbW92ZSB0aGUgc2xpZGluZyBiYWNrZ3JvdW5kIHBpenphcyBvbiBzY3JvbGwuXG5mdW5jdGlvbiBsb2dBdmVyYWdlRnJhbWUodGltZXMpIHsgICAvLyB0aW1lcyBpcyB0aGUgYXJyYXkgb2YgVXNlciBUaW1pbmcgbWVhc3VyZW1lbnRzIGZyb20gdXBkYXRlUG9zaXRpb25zKClcbiAgdmFyIG51bWJlck9mRW50cmllcyA9IHRpbWVzLmxlbmd0aDtcbiAgdmFyIHN1bSA9IDA7XG4gIGZvciAodmFyIGkgPSBudW1iZXJPZkVudHJpZXMgLSAxOyBpID4gbnVtYmVyT2ZFbnRyaWVzIC0gMTE7IGktLSkge1xuICAgIHN1bSA9IHN1bSArIHRpbWVzW2ldLmR1cmF0aW9uO1xuICB9XG4gIGNvbnNvbGUubG9nKFwiQXZlcmFnZSB0aW1lIHRvIGdlbmVyYXRlIGxhc3QgMTAgZnJhbWVzOiBcIiArIHN1bSAvIDEwICsgXCJtc1wiKTtcbn1cblxuLy8gVGhlIGZvbGxvd2luZyBjb2RlIGZvciBzbGlkaW5nIGJhY2tncm91bmQgcGl6emFzIHdhcyBwdWxsZWQgZnJvbSBJbHlhJ3MgZGVtbyBmb3VuZCBhdDpcbi8vIGh0dHBzOi8vd3d3Lmlndml0YS5jb20vc2xpZGVzLzIwMTIvZGV2dG9vbHMtdGlwcy1hbmQtdHJpY2tzL2phbmstZGVtby5odG1sXG5cbi8vIE1vdmVzIHRoZSBzbGlkaW5nIGJhY2tncm91bmQgcGl6emFzIGJhc2VkIG9uIHNjcm9sbCBwb3NpdGlvblxuZnVuY3Rpb24gdXBkYXRlUG9zaXRpb25zKCkge1xuICBmcmFtZSsrO1xuICB3aW5kb3cucGVyZm9ybWFuY2UubWFyayhcIm1hcmtfc3RhcnRfZnJhbWVcIik7XG5cbiAgdmFyIGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1vdmVyJyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcGhhc2UgPSBNYXRoLnNpbigoZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgLyAxMjUwKSArIChpICUgNSkpO1xuICAgIGl0ZW1zW2ldLnN0eWxlLmxlZnQgPSBpdGVtc1tpXS5iYXNpY0xlZnQgKyAxMDAgKiBwaGFzZSArICdweCc7XG4gIH1cblxuICAvLyBVc2VyIFRpbWluZyBBUEkgdG8gdGhlIHJlc2N1ZSBhZ2Fpbi4gU2VyaW91c2x5LCBpdCdzIHdvcnRoIGxlYXJuaW5nLlxuICAvLyBTdXBlciBlYXN5IHRvIGNyZWF0ZSBjdXN0b20gbWV0cmljcy5cbiAgd2luZG93LnBlcmZvcm1hbmNlLm1hcmsoXCJtYXJrX2VuZF9mcmFtZVwiKTtcbiAgd2luZG93LnBlcmZvcm1hbmNlLm1lYXN1cmUoXCJtZWFzdXJlX2ZyYW1lX2R1cmF0aW9uXCIsIFwibWFya19zdGFydF9mcmFtZVwiLCBcIm1hcmtfZW5kX2ZyYW1lXCIpO1xuICBpZiAoZnJhbWUgJSAxMCA9PT0gMCkge1xuICAgIHZhciB0aW1lc1RvVXBkYXRlUG9zaXRpb24gPSB3aW5kb3cucGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5TmFtZShcIm1lYXN1cmVfZnJhbWVfZHVyYXRpb25cIik7XG4gICAgbG9nQXZlcmFnZUZyYW1lKHRpbWVzVG9VcGRhdGVQb3NpdGlvbik7XG4gIH1cbn1cblxuLy8gcnVucyB1cGRhdGVQb3NpdGlvbnMgb24gc2Nyb2xsXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdXBkYXRlUG9zaXRpb25zKTtcblxuLy8gR2VuZXJhdGVzIHRoZSBzbGlkaW5nIHBpenphcyB3aGVuIHRoZSBwYWdlIGxvYWRzLlxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICB2YXIgY29scyA9IDg7XG4gIHZhciBzID0gMjU2O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDIwMDsgaSsrKSB7XG4gICAgdmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBlbGVtLmNsYXNzTmFtZSA9ICdtb3Zlcic7XG4gICAgZWxlbS5zcmMgPSBcImltYWdlcy9waXp6YS5wbmdcIjtcbiAgICBlbGVtLnN0eWxlLmhlaWdodCA9IFwiMTAwcHhcIjtcbiAgICBlbGVtLnN0eWxlLndpZHRoID0gXCI3My4zMzNweFwiO1xuICAgIGVsZW0uYmFzaWNMZWZ0ID0gKGkgJSBjb2xzKSAqIHM7XG4gICAgZWxlbS5zdHlsZS50b3AgPSAoTWF0aC5mbG9vcihpIC8gY29scykgKiBzKSArICdweCc7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb3ZpbmdQaXp6YXMxXCIpLmFwcGVuZENoaWxkKGVsZW0pO1xuICB9XG4gIHVwZGF0ZVBvc2l0aW9ucygpO1xufSk7XG4iXSwiZmlsZSI6InZpZXdzL3NjcmlwdHMvbWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9