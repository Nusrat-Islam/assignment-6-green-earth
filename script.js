
const treeItemsContainer = document.getElementById("tree-items")
const treeNewsContainer = document.getElementById("tree-news-container")
const cartContainer = document.getElementById("add-cart-container")

let addContainer = [];



const loadTreeItems = () => {
  fetch("https://openapi.programming-hero.com/api/categories")

    .then((res) => res.json())
    .then((data) => displayloadTreeItems(data.categories))
}


const displayloadTreeItems = (items) => {
  //console.log(items)

  items.forEach((item) => {
    treeItemsContainer.innerHTML += `
                                    <div id="all-btn-news">
                           <button id="${item.id}"
                                class="btn btn-sm pr-25 text-[#1F2937] text-sm  hover:bg-green-800 hover:text-white  bg-[#F0FDF4] border-none">${item.category_name}
                            </button> 
                       </div>
    `
  })

  //Event delegation for category click
  treeItemsContainer.addEventListener('click', (e) => {

    const allButton = document.querySelectorAll('button')

    allButton.forEach(btn => {
      btn.classList.remove("bg-green-800")
    })
    if (e.target.localName === "button") {
      // console.log(e.target)
      e.target.classList.add("bg-green-800");
      loadTreeNews(e.target.id)
     //loadNewsById(e.target.id)
    }


  })

}







//MOdal Functionalities

const loadNewsDetail = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)

  .then(res => res.json())
  .then(data => {
    displayloadNewsDetail(data.plants)

  } )
  

}

const displayloadNewsDetail = (plant) => {
  console.log(plant)
  const detailModal = document.getElementById("details-container")
  detailModal.innerHTML = `      <h3 class="text-lg font-bold">${plant.name}</h3>
     <img src="${plant.image}" alt="" class="w-full h-75 mx-auto rounded-xl mt-2">
     <h4 class="mt-2" ><span class="text-lg font-semibold">Category:</span> ${plant.category}</h4>
     <h2><span class="text-lg font-semibold">Price:</span>${plant.price}</h2>
    <p class="py-4"><span class="text-lg font-semibold">Description:</span>${plant.description}</p>
    `
  document.getElementById("my_modal_5").showModal();
}

// const showNewsAll = (plants) => {
//    console.log(plants)

//   treeNewsContainer.innerHTML = "";

//   plants.forEach((plant) => {
//     treeNewsContainer.innerHTML += `   <div id="${plant.id}" class="card bg-base-100  shadow-sm w-75 ">
//   <figure >
//     <img  src="${plant.image}"
//       class="  w-full h-80 p-4 rounded-xl" />
// </figure>
//   <div  class="card-body p-4">
//    <h2 onclick='loadNewsDetail(${plant.id})' class="card-title font-semibold text-[#1F2937] ">
//    ${plant.name}
      
//     </h2>
//     <p class="text-[#1F2937] text-[14px] "> ${plant.description}</p>
//     <div class="card-actions flex justify-between mt-2">
//        <div>
//          <button class=" text-[#15803D] bg-green-300 rounded-4xl p-1 text-sm">Fruit Tree</button>
//        </div>
//        <div>
//          <p class="font-semibold">৳${plant.price}</p>
//        </div>
//     </div>
//     <div class="flex flex-col justify-center mt-2">
//         <button class="bg-green-800 rounded-2xl text-white py-2"> Add to Card</button>
//     </div>
//   </div>
// </div>
     
//      `

//   })

// }




//All TRees
const loadTreeNews = (id) => {
  fetch(id?`https://openapi.programming-hero.com/api/category/${id}`:"https://openapi.programming-hero.com/api/plants")

    .then((res) => res.json())
    .then((news) => {
      console.log(news)
      displayTreeNews (news.plants)
    })
    showLoading()
}

const displayTreeNews = (plantsNews) => {
   //console.log(plantsNews)
  treeNewsContainer.innerHTML = ""

  plantsNews.forEach((plantNews) => {
    treeNewsContainer.innerHTML += `
                                         <div id="${plantNews.id}" class="card bg-base-100  shadow-sm w-75 p-4 ">
 
    <img  src="${plantNews.image}"
      class=" w-full h-80 rounded-xl />

  <div class="card-body">
    <h2 onclick='loadNewsDetail(${plantNews.id})'  class="card-title font-semibold text-[#1F2937]">
   ${plantNews.name}
      
    </h2>
    <p class="text-[#1F2937] text-[14px] "> ${plantNews.description}</p>
    <div class="card-actions flex justify-between mt-2">
       <div>
         <button class=" text-[#15803D] bg-green-300 rounded-4xl p-1 text-sm">Fruit Tree</button>
       </div>
       <div>
         <p class="font-semibold">৳${plantNews.price}</p>
       </div>
    </div>
    <div class="flex flex-col justify-center mt-2">
        <button class="bg-green-800 rounded-2xl text-white py-2"> Add to Card</button>
    </div>
  </div>
</div>
         `
  })
}

//event delegation for modal and add to cart
treeNewsContainer.addEventListener('click', (e) => {

   const card= e.target.closest(".card")
   //console.log(card)
   //h2 card click
   

   //Add to cart click

  if (e.target.innerText === 'Add to Card') {
    //console.log("booked")
    
  

    const tittle = card.querySelector("h2").innerText
    const price = card.querySelector(".card-actions p").innerText

    const id= card.id
  
    //const id = card.id
    //console.log(id)
    

    addContainer.push({
      tittle: tittle,
      price: price,
      id:id
    })
    displayAddContainer(addContainer)
  }
})

//Display Add to cart

const displayAddContainer = (carts) => {
 
  cartContainer.innerHTML = "";
  carts.forEach((cart) => {
    cartContainer.innerHTML += `
     <div class="flex justify-between mt-2 bg-white mb-2">
            <div class="flex flex-col ">
                <div><h2 class="text-lg font-semibold">   ${cart.tittle} </h2>  </div>
                <div> <p class="text-lg font-semibold">${cart.price}</p></div> 
                         
            </div>
            <i onclick="deleteCart(${cart.id})" class="fa-solid fa-xmark text-red-600"></i>
     </div>
   `
  })
}

//Delete cart
const deleteCart = (cartId)=>{
  console.log(cartId)
 const filterCart= addContainer.filter(cart => cart.id !== String(cartId))
 console.log(filterCart)
 
 addContainer = filterCart
 displayAddContainer(addContainer)
}

//LOoading function

const showLoading=()=>{
  treeNewsContainer.innerHTML = `
     <div ><span class="loading loading-spinner text-primary"></span>
<span class="loading loading-spinner text-secondary"></span>
<span class="loading loading-spinner text-accent"></span>
<span class="loading loading-spinner text-neutral"></span>
<span class="loading loading-spinner text-info"></span>
<span class="loading loading-spinner text-success"></span>
<span class="loading loading-spinner text-warning"></span>
<span class="loading loading-spinner text-error"></span></div>
  `
}


loadTreeItems()
loadTreeNews()
