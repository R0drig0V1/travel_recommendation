function recommendation(event) {
    
    const keywords = document.getElementById('search').value;
    console.log("keywords: " + keywords)

    fetch("./travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
      const articlesDiv = document.querySelector('.right');
      articlesDiv.innerHTML = "";

      for (let category in data) {
        const items = data[category];

        if (category.includes(keywords.toLowerCase())) {

          items.forEach(item => {

            if ("cities" in item){
              (item.cities).forEach(city => {
                articlesDiv.appendChild(build_article(city));
              });
            }

            else {
              articlesDiv.appendChild(build_article(item));
            }
          });
        }

        if (category == "countries"){

          items.forEach(item => {
            if (item.name.toLowerCase().includes(keywords.toLowerCase())){
              (item.cities).forEach(city => {
              articlesDiv.appendChild(build_article(city));
              });
            }
          });
        }
      }
    })
    .catch(error => {
        console.error('Error fetching:', error);
      });

}

function build_article(data) {
  console.log("data: ", data)
  var articleDiv = document.createElement('div');
  articleDiv.classList.add('article');

  var img = document.createElement("img");
  img.src = data["imageUrl"];
  img.alt = data["name"];
  articleDiv.appendChild(img);

  var title = document.createElement('h3');
  title.textContent = data["name"];
  articleDiv.appendChild(title);

  var description = document.createElement("p");
  description.textContent = data["description"];
  articleDiv.appendChild(description);

  return articleDiv
}

function clean() {
    document.getElementById('search').value = search = "";
    document.querySelector('.right').innerHTML = "";
}


document.getElementById('search_button').addEventListener('click', recommendation);
document.getElementById('delete_button').addEventListener('click', clean);
