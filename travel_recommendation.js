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




//In this task, you will write JavaScript to accept these keywords and variations the user will enter in the search field in your navigation bar on the home page.

//    For example, if the user enters "beach," or "beaches," "Beach" or "BEACH," then you need to write JavaScript code so that it accepts all variations of this keyword.

//    For uppercase letters in the keyword, you can convert them to lowercase in your JavaScript using the string manipulation toLowerCase() method.

//    Similarly, you need to create logic to match keywords entered for temples and countries.

//    The website should display results only after the user clicks the Search button.
