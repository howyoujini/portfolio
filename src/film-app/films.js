// Catalog of openly licensed (CC) indie short films.
// Video/poster URLs point to public sample CDNs; the Player and Poster
// components degrade gracefully if a source is unavailable.

const CDN = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample";

const films = [
  {
    id: "big-buck-bunny",
    title: "Big Buck Bunny",
    director: "Sacha Goedegebure",
    year: 2008,
    runtime: "10 min",
    genre: "Comedy",
    description:
      "A gentle giant of a rabbit wakes to a perfect spring morning — until a trio of bullying rodents squash his butterfly friends. Trading kindness for slapstick vengeance, Bunny engineers an elaborate, cartoon-logic payback. The Blender Institute's beloved open movie remains a landmark of community-made animation.",
    video: `${CDN}/BigBuckBunny.mp4`,
    poster: `${CDN}/images/BigBuckBunny.jpg`,
    accent: ["#7fb069", "#2d4a22"],
    featured: true,
  },
  {
    id: "sintel",
    title: "Sintel",
    director: "Colin Levy",
    year: 2010,
    runtime: "15 min",
    genre: "Fantasy",
    description:
      "A lone wanderer named Sintel crosses ice fields and burning cities in search of Scales, the baby dragon she once nursed back to health. A wrenching fantasy about devotion and the cost of a long obsession, made entirely with open-source tools by the Blender Foundation.",
    video: `${CDN}/Sintel.mp4`,
    poster: `${CDN}/images/Sintel.jpg`,
    accent: ["#c98a4b", "#3d2317"],
  },
  {
    id: "tears-of-steel",
    title: "Tears of Steel",
    director: "Ian Hubert",
    year: 2012,
    runtime: "12 min",
    genre: "Sci-Fi",
    description:
      "Forty years after a heartbreak on a Rotterdam bridge, a group of scientists stages a desperate reenactment to rewrite the memory of the machine intelligence destroying their world. A live-action/CG hybrid short about regret, robots, and second chances.",
    video: `${CDN}/TearsOfSteel.mp4`,
    poster: `${CDN}/images/TearsOfSteel.jpg`,
    accent: ["#4a7a96", "#1b2a35"],
  },
  {
    id: "elephants-dream",
    title: "Elephants Dream",
    director: "Bassam Kurdali",
    year: 2006,
    runtime: "11 min",
    genre: "Surreal",
    description:
      "Proog and Emo inhabit a vast, humming machine of infinite corridors and switchboards. Proog adores it; Emo doubts it exists at all. The first open movie ever made — a strange, melancholy parable about the worlds we build inside our heads and force others to live in.",
    video: `${CDN}/ElephantsDream.mp4`,
    poster: `${CDN}/images/ElephantsDream.jpg`,
    accent: ["#8b6caf", "#251b35"],
  },
  {
    id: "caminandes-llama-drama",
    title: "Caminandes: Llama Drama",
    director: "Pablo Vazquez",
    year: 2013,
    runtime: "3 min",
    genre: "Comedy",
    description:
      "In windswept Patagonia, a hungry llama discovers that the lushest grass always grows on the wrong side of the fence — and of an oncoming truck. A tiny, perfectly timed slapstick gem from the Blender community.",
    video:
      "https://archive.org/download/Caminandes-LlamaDrama/Caminandes-%20Llama%20Drama.mp4",
    poster: null,
    accent: ["#d9a441", "#4a2e10"],
  },
  {
    id: "caminandes-gran-dillama",
    title: "Caminandes: Gran Dillama",
    director: "Pablo Vazquez",
    year: 2013,
    runtime: "2 min",
    genre: "Comedy",
    description:
      "Koro the llama returns, lured by a forbidden field of delicious grass behind an electric fence. Each scheme to get past it ends more catastrophically than the last. Short, sharp, and endlessly rewatchable.",
    video:
      "https://archive.org/download/CaminandesGranDillama/Caminandes-%20Gran%20Dillama.mp4",
    poster: null,
    accent: ["#e0b84f", "#3a3110"],
  },
  {
    id: "glass-half",
    title: "Glass Half",
    director: "Beorn Leonard",
    year: 2015,
    runtime: "3 min",
    genre: "Comedy",
    description:
      "Two art lovers meet in a gallery and disagree about absolutely everything — loudly, wordlessly, and in fluent gibberish. A cartoony experiment in pantomime comedy about taste, pretension, and finding someone who argues at your level.",
    video: "https://archive.org/download/glass-half/Glass%20Half.mp4",
    poster: null,
    accent: ["#c75146", "#2e1410"],
  },
  {
    id: "cosmos-laundromat",
    title: "Cosmos Laundromat",
    director: "Mathieu Auvray",
    year: 2015,
    runtime: "12 min",
    genre: "Drama",
    description:
      "On a bleak island, a suicidal sheep named Franck meets a mysterious salesman who offers him any life he wants — for a price. The first chapter of an unfinished open-movie epic: funny, sad, and visually astonishing.",
    video:
      "https://archive.org/download/CosmosLaundromatFirstCycle/Cosmos%20Laundromat-%20First%20Cycle.mp4",
    poster: null,
    accent: ["#5a8f7b", "#14241e"],
  },
];

export const featuredFilm = films.find((f) => f.featured) || films[0];

export const getFilmById = (id) => films.find((f) => f.id === id) || null;

export const searchFilms = (query) => {
  const q = query.trim().toLowerCase();
  if (!q) return films;
  return films.filter(
    (f) =>
      f.title.toLowerCase().includes(q) ||
      f.director.toLowerCase().includes(q) ||
      f.genre.toLowerCase().includes(q)
  );
};

export default films;
