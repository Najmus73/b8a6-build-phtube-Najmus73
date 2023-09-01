const allCategory = async () => {
    const categoryContainer = document.getElementById('category-container');
    const allItems = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await allItems.json();
    const categories = data.data
    categories.forEach(element => {
            const div = document.createElement('div');
            div.innerHTML = `
            <button onclick = "handleLoadItem('${element.category_id}')" class="btn">${element.category}</button>
            `;
            categoryContainer.appendChild(div);
    });
}

const handleLoadItem = async (id) => {
    const cardContainer = document.getElementById('card-container');
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();

    cardContainer.innerHTML = '';
    const items = data.data; 
    
    const noData =document.getElementById('no-data')
    if(items.length === 0){
          noData.classList.remove('hidden')
    }else{
          noData.classList.add('hidden')
    }


    items.forEach(element => {
    const div = document.createElement('div')
          div.innerHTML = `
          <div class="flex justify-center">
          <div class="card w-96 h-96">
          <figure class="px-1 pt-1">
             <img class="w-96 h-52 rounded-lg" src="${element.thumbnail}" alt="Shoes" />
          </figure>
          
          <div class="flex gap-3 pt-5 pl-2">
          <div><img class="w-10 h-10 rounded-full" src="${element.authors[0].profile_picture}"></div>

          <div><h2 class="card-title">${element.title}</h2>   
          <p>${element.authors[0].profile_name}</p>
          <h1>${element.others.views} views</h1>
          <h1>${element.others.posted_date} views</h1></div>
          </div>

         </div>
        </div>
        </div>
           `;
           cardContainer.appendChild(div);
    });
    
    
}

allCategory();
handleLoadItem(1000);    

