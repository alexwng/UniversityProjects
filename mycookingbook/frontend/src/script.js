class Model {
  constructor() {
    this.ip = "http://localhost:3000";
    this.recipes = [];

    this.getRecipesNow();
  }

  getRecipesNow() {
    fetch(this.ip + "/recipes")
      .then(resp => resp.json())
      .then(data => {
        this.recipes = data;
        this.onRecipesListChanged(this.recipes);
      });
  }

  bindRecipesListChanged(callback) {
    this.onRecipesListChanged = callback;
  }

  getById(id) {
    let a;
    this.recipes.forEach(recipe => {
      if (recipe.id === id) {
        a = recipe;
      }
    });
    return a;
  }

  addRecipe(recipe) {
    fetch(this.ip + "/add-recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: recipe
    })
      .then(resp => resp.json())
      .then(data => {
        this.recipes = data;
        this.onRecipesListChanged(this.recipes);
      });
  }

  editRecipe(recipe) {
    fetch(this.ip + "/edit-recipe", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: recipe
    })
      .then(resp => resp.json())
      .then(data => {
        this.recipes = data;
        this.onRecipesListChanged(this.recipes);
      });
  }

  deleteRecipe(recipe) {
    fetch(this.ip + "/delete-recipe", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: recipe
    })
      .then(resp => resp.json())
      .then(data => {
        this.recipes = data;
        this.onRecipesListChanged(this.recipes);
      });
  }
}

class View {
  constructor() {
    this.app = this.getElement("#root");

    this.action = "";
    this.recipe = "";

    this.title = this.createElement("a", "navA");
    this.title.textContent = "My Cooking Book";
    this.title.href = "#";

    this.addRecipe = this.createElement("a", "navA");
    this.addRecipe.textContent = "Add Recipe";
    this.addRecipe.href = "nothing";

    this.editRecipe = this.createElement("a", "navA");
    this.editRecipe.textContent = "Edit Recipe";
    this.editRecipe.href = "nothing";

    this.deleteRecipe = this.createElement("a", "navA");
    this.deleteRecipe.textContent = "Delete Recipe";
    this.deleteRecipe.href = "nothing";

    this.textarea = this.createElement("textarea", "textareaClass");
    this.submitButton = this.createElement("button", "buttonClass");
    this.submitButton.textContent = "Submit";

    this.recipesList = this.createElement("ul", "recipeListUl");

    this.formCrud = this.createElement("form", "formStyle");
    this.divIngrediente = this.createElement("div", "ingredienteCurd");
    this.divSteps = this.createElement("div", "stepsCurd");
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  buildMainPage() {
    const nav = this.createElement("nav");
    const ul = this.createElement("ul", "navUl");
    const li1 = this.createElement("li", "navUlLi");
    const li2 = this.createElement("li", "navUlLi");
    li1.append(this.title);
    li2.append(this.addRecipe);
    ul.append(li1, li2);
    nav.append(ul);

    const section = this.createElement("section");
    section.append(this.recipesList);

    this.app.append(nav, section);
  }

  cleanPage() {
    while (this.app.firstChild) {
      this.app.removeChild(this.app.firstChild);
    }
  }

  displayRecipes(recipes) {
    while (this.recipesList.firstChild) {
      this.recipesList.removeChild(this.recipesList.firstChild);
    }

    if (recipes.length === 0) {
      const p = this.createElement("p");
      p.textContent = "No recipes";
      this.recipesList.append(p);
    } else {
      recipes.forEach(recipe => {
        const li = this.createElement("li", "sectionLi");
        li.id = recipe.id;

        const h3 = this.createElement("h3");
        h3.textContent = recipe.name;
        h3.id = recipe.id;

        const pTime = this.createElement("p");
        pTime.textContent = recipe.time + " min";
        pTime.id = recipe.id;

        const img = this.createElement("img", "imgClass");
        img.src = recipe.img;
        img.id = recipe.id;

        li.append(img, h3, pTime);
        this.recipesList.append(li);
      });
    }
  }

  bindViewRecipe(handle) {
    this.recipesList.addEventListener("click", event => {
      if (event.target.tagName !== "UL") handle(event.target.id);
    });
  }

  bindAddButton(handle) {
    this.addRecipe.addEventListener("click", event => {
      event.preventDefault();

      this.action = "add";
      handle();
    });
  }

  displaySpecificRecipe(recipe) {
    this.recipe = recipe;

    this.titluMancare = this.createElement("h1");
    this.titluMancare.textContent = recipe.name;

    this.timp = this.createElement("p");
    this.timp.textContent = recipe.time + " min";

    this.titluIngrediente = this.createElement("h2");
    this.titluIngrediente.textContent = "Ingredients List";

    this.ingredientsList = this.createElement("ol");
    this.displayIngredients(recipe);

    this._testingIngredientRatio();

    this.titluSteps = this.createElement("h2");
    this.titluSteps.textContent = "Steps";

    this.stepsList = this.createElement("ol");
    this.displaySteps(recipe);

    const img = this.createElement("img", "imgClass");
    img.src = recipe.img;

    const nav = this.createElement("nav");
    const ul = this.createElement("ul", "navUl");
    const li1 = this.createElement("li", "navUlLi");
    const li2 = this.createElement("li", "navUlLi");
    const li3 = this.createElement("li", "navUlLi");
    li1.append(this.title);
    li2.append(this.editRecipe);
    li3.append(this.deleteRecipe);
    ul.append(li1, li2, li3);
    nav.append(ul);

    const aside = this.createElement("aside", "padding5");
    aside.append(
      this.titluMancare,
      this.timp,
      this.titluIngrediente,
      this.ingredientsList
    );

    const article = this.createElement("article", "padding5");
    article.append(img, this.titluSteps, this.stepsList);

    const h2Note = this.createElement("h2");
    h2Note.textContent = "Notes";
    this.noteSpec = this.createElement("textarea", "textareaClass");

    this.noteSpec.value = localStorage.getItem(this.recipe.id) || "";

    article.append(h2Note, this.noteSpec);
    this._testingNoteLocalStorage();

    const divGridSR = this.createElement("div", "gridSR");
    divGridSR.append(aside, article);

    this.app.append(nav, divGridSR);
  }

  displayIngredients(recipe) {
    while (this.ingredientsList.firstChild) {
      this.ingredientsList.removeChild(this.ingredientsList.firstChild);
    }

    let i = 0;
    recipe.ingredients.forEach(ingredient => {
      const pIng = this.createElement("p", "inline");
      pIng.textContent = ingredient.name;

      const pUM = this.createElement("p", "inline");
      pUM.textContent = ingredient.UM;

      const span = this.createElement("span", "inline");
      span.textContent = ingredient.quantity;
      span.contentEditable = true;

      const li = this.createElement("li");
      li.id = i;
      i++;
      li.append(pIng, span, pUM);
      this.ingredientsList.append(li);
    });
  }

  _testingNoteLocalStorage() {
    this.noteSpec.addEventListener("focusout", event => {
      localStorage.setItem(this.recipe.id, event.target.value);
    });
  }

  _testingIngredientRatio() {
    this.ingredientsList.addEventListener("focusout", event => {
      let ratio =
        event.target.innerHTML /
        this.recipe.ingredients[parseInt(event.target.parentElement.id)]
          .quantity;

      let i = 0;
      for (i = 0; i < this.recipe.ingredients.length; i++) {
        if (i === parseInt(event.target.parentElement.id)) {
          this.recipe.ingredients[i].quantity = parseFloat(
            event.target.innerHTML
          );
        } else {
          this.recipe.ingredients[i].quantity =
            this.recipe.ingredients[i].quantity * ratio;
        }
      }

      this.displayIngredients(this.recipe);
    });
  }

  displaySteps(recipe) {
    recipe.steps.forEach(step => {
      const li = this.createElement("li");
      li.textContent = step.detail;
      this.stepsList.append(li);
    });
  }

  bindEditRecipe(handle) {
    this.editRecipe.addEventListener("click", event => {
      event.preventDefault();
      this.action = "edit";
      handle(this.recipe);
    });
  }

  bindDeleteRecipe(handle) {
    this.deleteRecipe.addEventListener("click", event => {
      event.preventDefault();
      this.action = "delete";
      handle(this.recipe);
    });
  }

  displayCrudAdd() {
    window.location.hash = "crudaction";

    while (this.formCrud.firstChild) {
      this.formCrud.removeChild(this.formCrud.firstChild);
    }

    while (this.divIngrediente.firstChild) {
      this.divIngrediente.removeChild(this.divIngrediente.firstChild);
    }

    while (this.divSteps.firstChild) {
      this.divSteps.removeChild(this.divSteps.firstChild);
    }

    let lableName = this.createElement("lable");
    lableName.textContent = "Name";
    let inputName = this.createElement("input", "inputStyle");
    inputName.name = "name";

    let lableImg = this.createElement("lable");
    lableImg.textContent = "Img";
    let inputImg = this.createElement("input", "inputStyle");
    inputImg.name = "img";

    let lableTime = this.createElement("lable");
    lableTime.textContent = "Time";
    let inputTime = this.createElement("input", "inputStyle");
    inputTime.name = "time";

    let lableIngredients = this.createElement("lable");
    lableIngredients.textContent = "Ingredients";

    let lableSteps = this.createElement("lable");
    lableSteps.textContent = "Steps";
    let inputSteps = this.createElement("input", "inputStyle");
    inputSteps.name = "steps";

    let inputId = this.createElement("input");
    inputId.type = "hidden";
    inputId.value = Math.floor(Math.random() * 1000000) + 1;
    inputId.name = "id";

    let inputSubmit = this.createElement("input", "buttonClass");
    inputSubmit.type = "submit";
    inputSubmit.value = this.action.toUpperCase();

    this.divSteps.append(inputSteps);

    let divIngredientsItem = this.createElement("div", "ingredients-item");

    let inputIngredientName = this.createElement("input", "inputStyle");
    inputIngredientName.name = "ingredient-name";
    inputIngredientName.classList.add("inputIngredientName");
    let inputIngredientQty = this.createElement("input", "inputStyle");
    inputIngredientQty.name = "ingredient-qty";
    let inputIngredientUM = this.createElement("input", "inputStyle");
    inputIngredientUM.name = "ingredient-um";

    inputIngredientName.placeholder = "Ingredient name";
    inputIngredientQty.placeholder = "Quantity";
    inputIngredientUM.placeholder = "UM";

    divIngredientsItem.append(
      inputIngredientName,
      inputIngredientQty,
      inputIngredientUM
    );
    this.divIngrediente.append(divIngredientsItem);

    this.formCrud.append(
      inputId,
      lableName,
      this.createElement("br"),
      inputName,
      this.createElement("br"),
      lableImg,
      this.createElement("br"),
      inputImg,
      this.createElement("br"),
      lableTime,
      this.createElement("br"),
      inputTime,
      this.createElement("br"),
      lableIngredients,
      this.createElement("br"),
      this.divIngrediente,
      this.createElement("br"),
      lableSteps,
      this.createElement("br"),
      this.divSteps,
      this.createElement("br"),
      this.createElement("br"),
      inputSubmit
    );

    this.textarea.value = `{
      "id":"",
      "name":"",
      "img":"",
      "time":0,
      "ingredients":[
         {
            "name":"",
            "quantity":0,
            "UM":""
         }
      ],
      "steps":[
         {
            "detail":""
         }
      ]
    }`;

    if (this.action === "edit" || this.action === "delete") {
      this.textarea.value = JSON.stringify(this.recipe);
      inputId.value = this.recipe.id;
      inputName.value = this.recipe.name;
      inputImg.value = this.recipe.img;
      inputTime.value = this.recipe.time;

      this.divSteps.removeChild(this.divSteps.firstChild);
      this.recipe.steps.forEach(element => {
        // inputSteps.value += element["detail"] + "*";
        let foo2 = this.createElement("input", "inputStyle");
        foo2.name = "steps";
        foo2.value = element["detail"];
        this.divSteps.append(foo2);
      });
      if (this.action === "edit") {
        this.divSteps.append(inputSteps);
      }
      // inputSteps.value = inputSteps.value.substring(
      //   0,
      //   inputSteps.value.length - 1
      // );

      this.divIngrediente.removeChild(this.divIngrediente.firstChild);
      this.recipe.ingredients.forEach(ingredient => {
        // inputIngredients.value +=
        //   ingredient["name"] +
        //   "#" +
        //   ingredient["quantity"] +
        //   "#" +
        //   ingredient["UM"] +
        //   "*";
        let divIngredientsItem2 = this.createElement("div", "ingredients-item");

        let inputIngredientName2 = this.createElement("input", "inputStyle");
        inputIngredientName2.name = "ingredient-name";
        inputIngredientName2.value = ingredient["name"];
        let inputIngredientQty2 = this.createElement("input", "inputStyle");
        inputIngredientQty2.name = "ingredient-qty";
        inputIngredientQty2.value = ingredient["quantity"];
        let inputIngredientUM2 = this.createElement("input", "inputStyle");
        inputIngredientUM2.name = "ingredient-um";
        inputIngredientUM2.value = ingredient["UM"];

        inputIngredientName2.classList.add("inputIngredientName");
        inputIngredientName2.placeholder = "Ingredient name";
        inputIngredientQty2.placeholder = "Quantity";
        inputIngredientUM2.placeholder = "UM";

        divIngredientsItem2.append(
          inputIngredientName2,
          inputIngredientQty2,
          inputIngredientUM2
        );

        this.divIngrediente.append(divIngredientsItem2);
      });
      // inputIngredients.value = inputIngredients.value.substring(
      //   0,
      //   inputIngredients.value.length - 1
      // );
      if (this.action === "edit") {
        this.divIngrediente.append(divIngredientsItem);
      }

      if (this.action === "delete") {
        for (
          let i = 1;
          i < this.formCrud.querySelectorAll("input").length;
          i++
        ) {
          this.formCrud.querySelectorAll("input")[i].readOnly = true;
        }
      }
    }

    const nav = this.createElement("nav");
    const ul = this.createElement("ul", "navUl");
    const li = this.createElement("li", "navUlLi");
    li.append(this.title);
    ul.append(li);
    nav.append(ul);

    // this.app.append(nav, this.formCrud, this.textarea, this.submitButton);
    this.app.append(nav, this.formCrud);
  }

  bindCrudAdd(handle) {
    this.formCrud.addEventListener("submit", event => {
      event.preventDefault();

      let data = {};
      data.id = this.formCrud.elements["id"].value;
      data["name"] = this.formCrud.elements["name"].value;
      data["img"] = this.formCrud.elements["img"].value;
      data["time"] = parseInt(this.formCrud.elements["time"].value);
      data.steps = [];
      data.ingredients = [];

      // this.formCrud.elements["steps"].forEach(element => {
      // if (element.value != "") {
      //   let bar2 = {};
      //   bar2["detail"] = element.value;
      //   data.steps.push(bar2);
      // }
      // });

      for (let i = 0; i < this.divSteps.childElementCount; i++) {
        let element = this.divSteps.children[i];
        if (element.value != "") {
          let bar2 = {};
          bar2["detail"] = element.value;
          data.steps.push(bar2);
        }
      }

      for (let i = 0; i < this.divIngrediente.childElementCount; i++) {
        let ingredient = this.divIngrediente.children[i];
        if (
          this.verifyTriNull(ingredient) == false ||
          (this.verifyTriNull(ingredient) == true &&
            this.divIngrediente.childElementCount == 1)
        ) {
          let bar = {};
          bar["name"] = ingredient.children[0].value;
          bar["quantity"] = parseInt(ingredient.children[1].value);
          bar["UM"] = ingredient.children[2].value;
          data.ingredients.push(bar);
        }
      }

      window.location.hash = "";
      handle(JSON.stringify(data), this.action);
      this.action = "";

      console.log(data);
    });

    this.divSteps.addEventListener("input", event => {
      if (this.divSteps.lastChild.value != "") {
        let inputSteps = this.createElement("input", "inputStyle");
        inputSteps.name = "steps";
        this.divSteps.append(inputSteps);
      } else {
        while (
          2 <= this.divSteps.childElementCount &&
          this.divSteps.lastChild.previousElementSibling.value == ""
        ) {
          this.divSteps.removeChild(this.divSteps.lastChild);
        }
      }
    });

    this.divIngrediente.addEventListener("input", event => {
      if (this.verifyTriNull(this.divIngrediente.lastChild) == false) {
        let divIngredientsItem = this.createElement("div", "ingredients-item");

        let inputIngredientName = this.createElement("input", "inputStyle");
        inputIngredientName.name = "ingredient-name";
        inputIngredientName.classList.add("inputIngredientName");
        inputIngredientName.placeholder = "Ingredient name";
        let inputIngredientQty = this.createElement("input", "inputStyle");
        inputIngredientQty.name = "ingredient-qty";
        inputIngredientQty.placeholder = "Quantity";
        let inputIngredientUM = this.createElement("input", "inputStyle");
        inputIngredientUM.name = "ingredient-um";
        inputIngredientUM.placeholder = "UM";

        divIngredientsItem.append(
          inputIngredientName,
          inputIngredientQty,
          inputIngredientUM
        );
        this.divIngrediente.append(divIngredientsItem);
      } else {
        while (
          2 <= this.divIngrediente.childElementCount &&
          this.verifyTriNull(
            this.divIngrediente.lastChild.previousElementSibling
          ) == true
        ) {
          this.divIngrediente.removeChild(this.divIngrediente.lastChild);
        }
      }
      // console.log(
      //   this.verifyTriNull(this.divIngrediente.lastChild.previousElementSibling)
      // );
    });

    // this.submitButton.addEventListener("click", event => {
    // window.location.hash = "";
    // handle(this.textarea.value, this.action);
    // this.action = "";
    // });
  }

  verifyTriNull(element) {
    return (
      element.firstChild.value == "" &&
      element.lastChild.value == "" &&
      element.lastChild.previousElementSibling.value == ""
    );
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    window.addEventListener("hashchange", event => {
      if (window.location.hash === "") {
        this.view.cleanPage();
        this.view.buildMainPage();
        this.view.displayRecipes(this.model.recipes);
        this.view.bindViewRecipe(this.handleViewRecipe);

        this.model.getRecipesNow();
      }
    });

    this.model.bindRecipesListChanged(this.onRecipesListChanged);
    this.view.buildMainPage();
    this.view.bindViewRecipe(this.handleViewRecipe);
    this.view.bindAddButton(this.handleAddButton);

    this.view.bindCrudAdd(this.handleCrudAdd);

    this.onRecipesListChanged(this.model.recipes);
  }

  onRecipesListChanged = recipes => {
    this.view.displayRecipes(recipes);
  };

  handleViewRecipe = id => {
    window.location.hash = id;
    const recipe = this.model.getById(id);
    this.view.cleanPage();
    this.view.displaySpecificRecipe(recipe);
    this.view.bindEditRecipe(this.handleEditButton);
    this.view.bindDeleteRecipe(this.handleDeleteButton);
  };

  handleAddButton = () => {
    this.view.cleanPage();
    this.view.displayCrudAdd();
  };

  handleEditButton = recipe => {
    this.view.cleanPage();
    this.view.displayCrudAdd();
  };

  handleDeleteButton = recipe => {
    this.view.cleanPage();
    this.view.displayCrudAdd();
  };

  handleCrudAdd = (recipe, action) => {
    console.log(recipe, action);
    if (action === "add") {
      this.model.addRecipe(recipe);
    } else if (action === "edit") {
      this.model.editRecipe(recipe);
    } else if (action === "delete") {
      this.model.deleteRecipe(recipe);
    }
  };
}

const app = new Controller(new Model(), new View());
