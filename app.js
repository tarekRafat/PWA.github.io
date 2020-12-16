window.addEventListener("load", async function () {
  if (navigator.serviceWorker) {
    console.log("Service wordker is working");

    let dropdownList = document.querySelector(".dropdown_list");
    let dropdownContainer = document.querySelector("#dropdown_container");

    //add Eventlistener
    dropdownList.addEventListener("change", await loadContent);

    //function

    async function loadContent(event) {
      let targetPost = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${event.target.value}`
      );
      let bodyContentJson = await targetPost.json();
      dropdownContainer.innerHTML = `
        <h2 class="header">${bodyContentJson.title}</h2>
        <p class="parg">${bodyContentJson.body}</p>
      `;
    }

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(dropdownContent => {
        dropdownList.innerHTML = dropdownContent.map(selection => {
          return `<option value="${selection.id}">${selection.title}</option>`;
        });
      });

    try {
      await navigator.serviceWorker.register("./sw.js");
      console.log("Sw registered");
    } catch (error) {
      console.log("Sw is not registered ", error);
    }
  } else {
    console.log("Service wordker is not working");
  }
});
