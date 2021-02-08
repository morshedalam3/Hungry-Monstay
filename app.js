const data_container = document.getElementById('foods');
const searchBtn = document.getElementById('searchWrapper');
const recommend = document.getElementById('recommend');

searchBtn.addEventListener('click', function () {
    const searchWord = document.getElementById('searchBar').value;
    data_container.innerHTML = '';
    if (searchWord === '') {
        recommend.style.display = 'block';
    } else {
        getFood(searchWord);
        recommend.style.display = 'none';
    }
});

const displayDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showFoodInfo(data.meals[0]);
        });
};

const showFoodInfo = food => {
    const foodDetailsDiv = document.getElementById('food-Details');
    foodDetailsDiv.innerHTML = `
    <img class="img-fluid rounded mb-4" src="${food.strMealThumb}" alt="">
    <h4>${food.strMeal}</h4> 
    <ul class="list-unStyled mb-0">
        <li><i class="icon-check icons"></i>${food.strMeasure1}, ${food.strIngredient1}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure2}, ${food.strIngredient2}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure3}, ${food.strIngredient3}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure4}, ${food.strIngredient4}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure5}, ${food.strIngredient5}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure6}, ${food.strIngredient6}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure7}, ${food.strIngredient7}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure8}, ${food.strIngredient8}</li>
       
    </ul>
`;
};

function getFood(mealId) {
    const urlTwo = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`;

    fetch(urlTwo)
        .then(res => res.json())
        .then(data => {
            displayFoods(data.meals);
        });

    const displayFoods = foods => {
        const foodsDiv = document.getElementById('foods');
        if (foods != null) {
            foods.map(food => {
                const foodDiv = document.createElement('div');
                foodDiv.className = 'col-md-3';
                const foodInfo = `
                        <div onclick="displayDetails('${food.idMeal}')" class="border rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img class="img-fluid rounded-top" src="${food.strMealThumb}" alt="">
                        <h4 class="h5 py-4 px-2 mb-0">${food.strMeal}</h4>
                        </div>
                    `;
                foodDiv.innerHTML = foodInfo;
                foodsDiv.appendChild(foodDiv);
            });
        } else {
            recommend.style.display = 'block';
        }
    }
}
