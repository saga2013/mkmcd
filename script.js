import movies from "./movies.js";
const filmscontainer = document.getElementById('films')
const searchInput = document.getElementById('searchInput')
const type = document.getElementById('type')
const sort = document.getElementById('sort')
const searchButton = document.getElementById('searchButton')
function generator(movie){
    filmscontainer.innerHTML='';
    movie.forEach(movie =>{
        const card =document.createElement('div')
        card.classList.add('card')
        card.innerHTML=`
            <img src="https://resizing.flixster.com/nZBENmEu16vTjWe3czwKICqtYwA=/206x305/v2/https://resizing.flixster.com/QZb6NO1GECV8zRbHNi12AUs75CI=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2E2MmQyYzQxLWZhMTgtNGU0NC04MTI5LTY1ZmU0ZjBiYWNkZC5qcGc=" alt="">
            <h3>${movie.Title}</h3>
            <p>${movie.movie_year}</p>
             <p> ${movie.Categories}</p>
            <button>More info</button>
        `;
        filmscontainer.appendChild(card)
    })
}
const move= movies.slice(1,41)
function filter(){
    let filteredfilms = move;
    if(sort.value==='AA'){
        filteredfilms.sort((a,b) => String(a.Title).toLowerCase().trim().localeCompare(String(b.Title).toLowerCase().trim()));
    }  else if(sort.value==='Z-A'){
        filteredfilms.sort((a,b) => String(b.Title).toLowerCase().trim().localeCompare(String(a.Title).toLowerCase().trim()));
    } else if(sort.value==='Max'){
        filteredfilms.sort((a,b) => b.movie_year- a.movie_year);
    } else if(sort.value==='Min'){
        filteredfilms.sort((a,b) => a.movie_year-b.movie_year);
    }
    generator(filteredfilms)
}
function filterByType(){
     const selectType= type.value.toLowerCase();
     let filteredfilms;
     if(selectType==="all"){
        filteredfilms= move;
     }else{
        filteredfilms=move.filter(movie => movie.Categories.toLowerCase().split('|').map(cat => cat.trim()).includes(selectType))
     }
     generator(filteredfilms)
}
function search(){
    const searchValue = searchInput.value.toLowerCase().trim();
    let filteredfil= move.filter(movi => {
        const m = String(movi.Title).trim().toLowerCase();
        return m.includes(searchValue)
    });
    if (filteredfil.length > 0) {
        generator(filteredfil);
    }
}
generator(move)
searchInput.addEventListener('input', search); 
sort.addEventListener('change', filter)
searchButton.addEventListener('click', search)
type.addEventListener('change', filterByType)