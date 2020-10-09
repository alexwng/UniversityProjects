const express = require("express");
const app = express();
var cors = require("cors");
const port = 3000;

var recipes = [
  {
    id: "biscutitisadajdada",
    name: "Salam de biscuiti",
    img:
      "https://jamilacuisine.ro/wp-content/uploads/2013/03/Salam-de-biscuiti-de-casa.jpg",
    time: 40,
    ingredients: [
      { name: "biscuiti populari", quantity: 500, UM: "g" },
      { name: "lapte", quantity: 200, UM: "ml" },
      { name: "unt", quantity: 150, UM: "g" },
      { name: "stafide", quantity: 100, UM: "g" },
      { name: "zahar", quantity: 100, UM: "g" },
      { name: "nuca de cocos", quantity: 3, UM: "linguri" },
      { name: "cacao", quantity: 2, UM: "linguri" },
      { name: "rom", quantity: 1, UM: "esenta" }
    ],
    steps: [
      {
        detail:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus velit est, sodales eget feugiat eu, rutrum ut neque. Vivamus cursus imperdiet massa, a euismod arcu iaculis eu. In ultricies sem id mollis maximus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent orci nunc, venenatis id efficitur in, fringilla quis urna. Vestibulum vestibulum, leo ullamcorper rutrum tristique, dolor ante gravida tortor, quis egestas tortor nulla a dolor. Nam dapibus et enim eget vehicula."
      },
      {
        detail:
          "Vivamus venenatis sem vel leo maximus, vel ullamcorper nibh cursus. Curabitur non nulla consectetur, commodo enim eu, egestas tortor. Quisque in malesuada tellus, non congue nisi. Vestibulum lobortis, massa eget elementum vehicula, elit urna aliquet velit, vel elementum neque felis at ligula. Curabitur ut ligula ante. Curabitur sed lacus at ligula imperdiet aliquet non vitae tortor. Morbi semper urna ante, eget egestas nisi tempus eget. Aenean libero tortor, blandit vitae vulputate a, viverra id nulla. Maecenas imperdiet convallis velit, quis commodo odio tempor ac. Pellentesque non facilisis dui, id volutpat justo. Donec sagittis ipsum in ornare maximus. Cras nibh est, lacinia ut quam at, pretium fringilla sapien. In eu dignissim odio. Phasellus commodo lorem erat, eget interdum diam aliquet quis."
      },
      {
        detail:
          "Mauris quis tempus ipsum. Sed lobortis sit amet ipsum ac interdum. Sed egestas velit et nisi aliquam, at consectetur dolor aliquet. Duis in sem et erat aliquet venenatis eget quis sapien. Sed iaculis turpis vel odio accumsan, ut dictum enim lobortis. Cras neque turpis, faucibus et sapien eget, luctus sagittis mauris. Suspendisse lectus tortor, varius vel laoreet ultrices, tincidunt non ipsum. Morbi turpis tellus, vulputate ut nibh et, hendrerit varius metus. Suspendisse sit amet pellentesque ligula. Donec laoreet ullamcorper vestibulum. Phasellus porttitor sapien erat."
      },
      {
        detail:
          "Vestibulum eleifend pulvinar lorem at congue. Morbi at viverra sapien. Vivamus in ullamcorper dolor. Nullam ultrices ipsum vitae lacinia iaculis. Nullam massa eros, malesuada sed vehicula vel, sodales nec risus. Sed suscipit enim a mattis elementum. Ut ornare consectetur odio, non accumsan leo finibus non. Aliquam erat volutpat. Donec vehicula mollis nisi, ut scelerisque orci eleifend ut. Duis dolor enim, feugiat faucibus sapien vel, facilisis tempus neque."
      },
      {
        detail:
          "Etiam egestas erat id dolor convallis faucibus. Integer ac nulla lorem. Nulla ultricies facilisis turpis, vitae efficitur ex interdum sed. Mauris sit amet nibh sit amet nulla pellentesque auctor eget ac nisl. In posuere, nisi at tincidunt vulputate, erat dui convallis felis, et vulputate sem justo id elit. Vivamus id rhoncus ligula, vitae blandit nibh. Donec vitae euismod tortor. Aenean sed blandit turpis."
      }
    ]
  },
  {
    id: "ciorsabbsab",
    name: "Ciorba de vacuta",
    img:
      "https://savoriurbane.com/wp-content/uploads/2015/10/Ciorba-de-vacuta-reteta-pas-cu-pas-savori-urbane.jpg",
    time: 210,
    ingredients: [
      { name: "carne de vita", quantity: 700, UM: "g" },
      { name: "morcovi", quantity: 3, UM: "buc" },
      { name: "radacini de patrunjel", quantity: 2, UM: "buc" },
      { name: "radacina de pastarnac", quantity: 1, UM: "buc" },
      { name: "telina mica", quantity: 1, UM: "buc" },
      { name: "ceapa medie", quantity: 1, UM: "buc" },
      { name: "cartofi medii", quantity: 3, UM: "buc" },
      { name: "mazare boabe", quantity: 150, UM: "g" },
      { name: "pastai de fasole verde", quantity: 150, UM: "g" },
      { name: "suc de rosii", quantity: 300, UM: "ml" },
      { name: "ulei", quantity: 1, UM: "lingura" },
      { name: "crenguta de cimbru uscat", quantity: 1, UM: "buc" }
    ],
    steps: [
      {
        detail:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus velit est, sodales eget feugiat eu, rutrum ut neque. Vivamus cursus imperdiet massa, a euismod arcu iaculis eu. In ultricies sem id mollis maximus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent orci nunc, venenatis id efficitur in, fringilla quis urna. Vestibulum vestibulum, leo ullamcorper rutrum tristique, dolor ante gravida tortor, quis egestas tortor nulla a dolor. Nam dapibus et enim eget vehicula."
      },
      {
        detail:
          "Vivamus venenatis sem vel leo maximus, vel ullamcorper nibh cursus. Curabitur non nulla consectetur, commodo enim eu, egestas tortor. Quisque in malesuada tellus, non congue nisi. Vestibulum lobortis, massa eget elementum vehicula, elit urna aliquet velit, vel elementum neque felis at ligula. Curabitur ut ligula ante. Curabitur sed lacus at ligula imperdiet aliquet non vitae tortor. Morbi semper urna ante, eget egestas nisi tempus eget. Aenean libero tortor, blandit vitae vulputate a, viverra id nulla. Maecenas imperdiet convallis velit, quis commodo odio tempor ac. Pellentesque non facilisis dui, id volutpat justo. Donec sagittis ipsum in ornare maximus. Cras nibh est, lacinia ut quam at, pretium fringilla sapien. In eu dignissim odio. Phasellus commodo lorem erat, eget interdum diam aliquet quis."
      },
      {
        detail:
          "Mauris quis tempus ipsum. Sed lobortis sit amet ipsum ac interdum. Sed egestas velit et nisi aliquam, at consectetur dolor aliquet. Duis in sem et erat aliquet venenatis eget quis sapien. Sed iaculis turpis vel odio accumsan, ut dictum enim lobortis. Cras neque turpis, faucibus et sapien eget, luctus sagittis mauris. Suspendisse lectus tortor, varius vel laoreet ultrices, tincidunt non ipsum. Morbi turpis tellus, vulputate ut nibh et, hendrerit varius metus. Suspendisse sit amet pellentesque ligula. Donec laoreet ullamcorper vestibulum. Phasellus porttitor sapien erat."
      },
      {
        detail:
          "Vestibulum eleifend pulvinar lorem at congue. Morbi at viverra sapien. Vivamus in ullamcorper dolor. Nullam ultrices ipsum vitae lacinia iaculis. Nullam massa eros, malesuada sed vehicula vel, sodales nec risus. Sed suscipit enim a mattis elementum. Ut ornare consectetur odio, non accumsan leo finibus non. Aliquam erat volutpat. Donec vehicula mollis nisi, ut scelerisque orci eleifend ut. Duis dolor enim, feugiat faucibus sapien vel, facilisis tempus neque."
      },
      {
        detail:
          "Etiam egestas erat id dolor convallis faucibus. Integer ac nulla lorem. Nulla ultricies facilisis turpis, vitae efficitur ex interdum sed. Mauris sit amet nibh sit amet nulla pellentesque auctor eget ac nisl. In posuere, nisi at tincidunt vulputate, erat dui convallis felis, et vulputate sem justo id elit. Vivamus id rhoncus ligula, vitae blandit nibh. Donec vitae euismod tortor. Aenean sed blandit turpis."
      }
    ]
  },
  {
    id: "tortjfjdsifjs",
    name: "Tort de ciocolata",
    img:
      "https://media.kaufland.com/images/PPIM/AP_Content_1010/std.lang.all/93/54/Asset_1019354.jpg",
    time: 60,
    ingredients: [
      { name: "ciocolată neagră", quantity: 300, UM: "g" },
      { name: "smântână dulce", quantity: 450, UM: "g" },
      { name: "alune de pădure prăjite", quantity: 500, UM: "g" },
      { name: "zahăr farin", quantity: 200, UM: "g" },
      { name: "ciocolată cu lapte", quantity: 200, UM: "g" },
      { name: "ouă separate", quantity: 6, UM: "buc" },
      { name: "pachet unt", quantity: 1, UM: "buc" },
      { name: "praf de copt", quantity: 1.5, UM: "buc" }
    ],
    steps: [
      {
        detail:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus velit est, sodales eget feugiat eu, rutrum ut neque. Vivamus cursus imperdiet massa, a euismod arcu iaculis eu. In ultricies sem id mollis maximus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent orci nunc, venenatis id efficitur in, fringilla quis urna. Vestibulum vestibulum, leo ullamcorper rutrum tristique, dolor ante gravida tortor, quis egestas tortor nulla a dolor. Nam dapibus et enim eget vehicula."
      },
      {
        detail:
          "Vivamus venenatis sem vel leo maximus, vel ullamcorper nibh cursus. Curabitur non nulla consectetur, commodo enim eu, egestas tortor. Quisque in malesuada tellus, non congue nisi. Vestibulum lobortis, massa eget elementum vehicula, elit urna aliquet velit, vel elementum neque felis at ligula. Curabitur ut ligula ante. Curabitur sed lacus at ligula imperdiet aliquet non vitae tortor. Morbi semper urna ante, eget egestas nisi tempus eget. Aenean libero tortor, blandit vitae vulputate a, viverra id nulla. Maecenas imperdiet convallis velit, quis commodo odio tempor ac. Pellentesque non facilisis dui, id volutpat justo. Donec sagittis ipsum in ornare maximus. Cras nibh est, lacinia ut quam at, pretium fringilla sapien. In eu dignissim odio. Phasellus commodo lorem erat, eget interdum diam aliquet quis."
      },
      {
        detail:
          "Mauris quis tempus ipsum. Sed lobortis sit amet ipsum ac interdum. Sed egestas velit et nisi aliquam, at consectetur dolor aliquet. Duis in sem et erat aliquet venenatis eget quis sapien. Sed iaculis turpis vel odio accumsan, ut dictum enim lobortis. Cras neque turpis, faucibus et sapien eget, luctus sagittis mauris. Suspendisse lectus tortor, varius vel laoreet ultrices, tincidunt non ipsum. Morbi turpis tellus, vulputate ut nibh et, hendrerit varius metus. Suspendisse sit amet pellentesque ligula. Donec laoreet ullamcorper vestibulum. Phasellus porttitor sapien erat."
      },
      {
        detail:
          "Vestibulum eleifend pulvinar lorem at congue. Morbi at viverra sapien. Vivamus in ullamcorper dolor. Nullam ultrices ipsum vitae lacinia iaculis. Nullam massa eros, malesuada sed vehicula vel, sodales nec risus. Sed suscipit enim a mattis elementum. Ut ornare consectetur odio, non accumsan leo finibus non. Aliquam erat volutpat. Donec vehicula mollis nisi, ut scelerisque orci eleifend ut. Duis dolor enim, feugiat faucibus sapien vel, facilisis tempus neque."
      },
      {
        detail:
          "Etiam egestas erat id dolor convallis faucibus. Integer ac nulla lorem. Nulla ultricies facilisis turpis, vitae efficitur ex interdum sed. Mauris sit amet nibh sit amet nulla pellentesque auctor eget ac nisl. In posuere, nisi at tincidunt vulputate, erat dui convallis felis, et vulputate sem justo id elit. Vivamus id rhoncus ligula, vitae blandit nibh. Donec vitae euismod tortor. Aenean sed blandit turpis."
      }
    ]
  },
  {
    id: "cedsadpaiene",
    name: "Painici pufoase cu ciocolata, fara zahar",
    img:
      "https://www.bucataras.ro/uploads/modules/news/92449/656x440_painici-pufoase-cu-ciocolata-fara-zahar-588405.jpg",
    time: 60,
    ingredients: [
      { name: "ciocolată neagră", quantity: 300, UM: "g" },
      { name: "smântână dulce", quantity: 450, UM: "g" },
      { name: "alune de pădure prăjite", quantity: 500, UM: "g" },
      { name: "zahăr farin", quantity: 200, UM: "g" },
      { name: "ciocolată cu lapte", quantity: 200, UM: "g" },
      { name: "ouă separate", quantity: 6, UM: "buc" },
      { name: "pachet unt", quantity: 1, UM: "buc" },
      { name: "praf de copt", quantity: 1.5, UM: "buc" }
    ],
    steps: [
      {
        detail:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus velit est, sodales eget feugiat eu, rutrum ut neque. Vivamus cursus imperdiet massa, a euismod arcu iaculis eu. In ultricies sem id mollis maximus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent orci nunc, venenatis id efficitur in, fringilla quis urna. Vestibulum vestibulum, leo ullamcorper rutrum tristique, dolor ante gravida tortor, quis egestas tortor nulla a dolor. Nam dapibus et enim eget vehicula."
      },
      {
        detail:
          "Vivamus venenatis sem vel leo maximus, vel ullamcorper nibh cursus. Curabitur non nulla consectetur, commodo enim eu, egestas tortor. Quisque in malesuada tellus, non congue nisi. Vestibulum lobortis, massa eget elementum vehicula, elit urna aliquet velit, vel elementum neque felis at ligula. Curabitur ut ligula ante. Curabitur sed lacus at ligula imperdiet aliquet non vitae tortor. Morbi semper urna ante, eget egestas nisi tempus eget. Aenean libero tortor, blandit vitae vulputate a, viverra id nulla. Maecenas imperdiet convallis velit, quis commodo odio tempor ac. Pellentesque non facilisis dui, id volutpat justo. Donec sagittis ipsum in ornare maximus. Cras nibh est, lacinia ut quam at, pretium fringilla sapien. In eu dignissim odio. Phasellus commodo lorem erat, eget interdum diam aliquet quis."
      },
      {
        detail:
          "Mauris quis tempus ipsum. Sed lobortis sit amet ipsum ac interdum. Sed egestas velit et nisi aliquam, at consectetur dolor aliquet. Duis in sem et erat aliquet venenatis eget quis sapien. Sed iaculis turpis vel odio accumsan, ut dictum enim lobortis. Cras neque turpis, faucibus et sapien eget, luctus sagittis mauris. Suspendisse lectus tortor, varius vel laoreet ultrices, tincidunt non ipsum. Morbi turpis tellus, vulputate ut nibh et, hendrerit varius metus. Suspendisse sit amet pellentesque ligula. Donec laoreet ullamcorper vestibulum. Phasellus porttitor sapien erat."
      },
      {
        detail:
          "Vestibulum eleifend pulvinar lorem at congue. Morbi at viverra sapien. Vivamus in ullamcorper dolor. Nullam ultrices ipsum vitae lacinia iaculis. Nullam massa eros, malesuada sed vehicula vel, sodales nec risus. Sed suscipit enim a mattis elementum. Ut ornare consectetur odio, non accumsan leo finibus non. Aliquam erat volutpat. Donec vehicula mollis nisi, ut scelerisque orci eleifend ut. Duis dolor enim, feugiat faucibus sapien vel, facilisis tempus neque."
      },
      {
        detail:
          "Etiam egestas erat id dolor convallis faucibus. Integer ac nulla lorem. Nulla ultricies facilisis turpis, vitae efficitur ex interdum sed. Mauris sit amet nibh sit amet nulla pellentesque auctor eget ac nisl. In posuere, nisi at tincidunt vulputate, erat dui convallis felis, et vulputate sem justo id elit. Vivamus id rhoncus ligula, vitae blandit nibh. Donec vitae euismod tortor. Aenean sed blandit turpis."
      }
    ]
  }
];

app.use(cors());
app.use(express.json());

app.get("/recipes", (req, res) => res.json(recipes));

app.post("/add-recipe", (req, res) => {
  recipes.push(req.body);
  console.log(recipes);
  res.json(recipes);
});

app.patch("/edit-recipe", (req, res) => {
  recipes = recipes.map(recipe =>
    recipe.id === req.body.id ? req.body : recipe
  );

  console.log(recipes);

  res.json(recipes);
});

app.delete("/delete-recipe", (req, res) => {
  recipes = recipes.filter(recipe => recipe.id !== req.body.id);
  console.log(recipes);
  res.json(recipes);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
