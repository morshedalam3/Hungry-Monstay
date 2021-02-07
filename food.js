// 'use strict';
const data_container = document.getElementById('foods');
const searchBtn = document.getElementById('searchBar');
const warning = document.getElementById('warning');

searchBtn.addEventListener('click', function () {
    const searchWord = document.getElementById('search-word').value;
    data_container.innerHTML = '';
    if (searchWord === '') {
        warning.style.display = 'block';
    } else {
        getFood(searchWord);
        warning.style.display = 'none';
    }
});

const displayDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showFoodInfo(data.meals[0]);
            console.log(data.meals[0]);
        });
};

const showFoodInfo = food => {
    const foodDetailsDiv = document.getElementById('food-Details');
    foodDetailsDiv.innerHTML = `
    <img class="img-fluid rounded mb-4" src="${food.strMealThumb}" alt="">
    <h4>${food.strMeal}</h4> 
    <h5 class="pt-3 pb-2"><i class="icon-fire icons"></i> Ingredients</h5>
    <ul class="list-unStyled mb-0">
        <li><i class="icon-check icons"></i>${food.strMeasure1}, ${food.strIngredient1}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure2}, ${food.strIngredient2}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure3}, ${food.strIngredient3}</li>
        <li><i class="icon-check icons"></i>${food.strMeasure4}, ${food.strIngredient4}</li>
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
            warning.style.display = 'block';
        }
    };
}
