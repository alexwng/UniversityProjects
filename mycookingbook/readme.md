# Tehnici Web (An 1 Sem 2) - Proiect Laborator - My Cooking Book

### Cerinte

#### Frontend

##### HTML si CSS

-   [x] Fisiere separate pentru HTML si CSS
-   [x] In interiorul documentelor HTML, sa se foloseasca minim 4 [taguri semantice](https://www.w3schools.com/html/html5_semantic_elements.asp)

```html
<!-- ./frontend/src/index.html -->
<footer>
    <main><mark>...</mark><time>...</time></main>
    <details>...</details>
</footer>
```

-   [x] Stilurile CSS sa fie definite folosind clase direct pe elementele care trebuie stilizate (minim 80% din selectori)

-   [x] Layout-ul sa fie impartit in minim 2 coloane si sa fie realizat cu [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) si/sau [CSS grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

```css
/* ./frontend/src/style.css */
.gridSR {
    display: grid;
    grid-template-columns: 1fr 4fr;
}
```

-   [x] Site-ul sa fie [responsive](https://www.w3schools.com/html/html_responsive.asp), respectand rezolutiile urmatoarelor dispozitive folosind [media queries](https://www.uxpin.com/studio/blog/media-queries-responsive-web-design/):
    -   telefon mobil - latime mai mica 768px
    -   tableta - latime intre 768px si 1280px
    -   desktop - latime mai mare de 1280px

```css
/* ./frontend/src/style.css */
@media screen and (max-width: 768px);
@media screen and (min-width: 767px) and (max-width: 1280px);
@media screen and (min-width: 1281px);
```

##### Javascript

-   [x] Fisier separat JavaScript
-   [x] Manipularea DOM-ului (crearea, editarea si stergerea elementelor/nodurilor HTML)

```javascript
// ./frontend/src/script.js
const li = this.createElement("li", "sectionLi");
li.id = recipe.id;
this.app.removeChild(this.app.firstChild);
```

-   [x] Folosirea evenimentelor JavaScript declansate de mouse/tastatura

```javascript
// ./frontend/src/script.js
this.recipesList.addEventListener("click", event => {
    if (event.target.tagName !== "UL") handle(event.target.id);
});
```

-   [x] Utilizarea [AJAX](https://www.w3schools.com/xml/ajax_intro.asp) ([GET, POST, PUT, DELETE](http://www.restapitutorial.com/lessons/httpmethods.html))

```javascript
// ./frontend/src/script.js
fetch("http://" + this.ip + "/recipes");
fetch("http://" + this.ip + "/add-recipe", {
    method: "POST",
    ...});
fetch("http://" + this.ip + "/edit-recipe", {
    method: "PATCH",
    ...});
fetch("http://" + this.ip + "/delete-recipe", {
    method: "DELETE",
    ...});
```

-   [x] Folosirea localStorage

```javascript
// ./frontend/src/script.js
this.noteSpec.value = localStorage.getItem(this.recipe.id) || "";
```

#### Backend API

-   [x] Creare server Backend
-   [x] CRUD API (Create, Read, Update si Delete) pentru a servi Frontend-ului

```javascript
// ./backend/app.js
app.get("/recipes");
app.post("/add-recipe");
app.patch("/edit-recipe");
app.delete("/delete-recipe");
```

**Criterii de acceptanta:**

-   [x] aplicatia sa fie [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application)
-   [x] codul sursa (nearhivat) al proiectului trebuie sa fie salvat pe [GitHub](https://github.com/)
-   [x] nu puteti folosi librarii, framework-uri [CSS](https://en.wikipedia.org/wiki/CSS_framework) sau [JavaScript](https://en.wikipedia.org/wiki/JavaScript_framework) (cum ar fi jQuery, Bootstrap, Angular, React, etc) pentru realizarea frontend-ului
