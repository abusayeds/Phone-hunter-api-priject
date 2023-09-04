const phonehunterload = (search,dataLimit) =>{
        const url =`https://openapi.programming-hero.com/api/phones?search=${search}`
        fetch(url)
        .then( res => res.json())
        .then (data => phoneapi(data.data,dataLimit))
}

const phoneapi = (phones,dataLimit) => {
   const phoneContainer = document.getElementById('phone-container')
     phoneContainer.innerHTML ='';

    //  display 10 phone onli
    
    const showall =document.getElementById("show-all")
    if(  dataLimit && phones.length >10){
        phones =phones.slice(0 ,10);
        showall.classList.remove("d-none")
    }
    else{
      showall.classList.add("d-none")
    }

    // display phone found
     const noPhone = document.getElementById("found-phone")

     if(phones.length ===0){
        noPhone.classList.remove('d-none')
     }
     else{
        noPhone.classList.add("d-none")
     }

   phones.forEach(phone => {
      //  console.log(phone)
      const phonediv =document.createElement('div')
      phonediv.classList.add('col')
      phonediv.innerHTML=`
      <div class="card p-4">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name }</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModel">Show-Detils</button>
        </div>

      
      `;
      phoneContainer.appendChild(phonediv);
   });
//    stop spinner
toggel(false)
}
const processSearch = (dataLimit) =>{
    toggel(true)
    const inputField =document.getElementById("input-field")
    const inputText = inputField.value ;
    phonehunterload(inputText ,dataLimit);
}

document.getElementById("btn-field").addEventListener( 'click', function() {
    // start spinner
     processSearch(10)
})

document.getElementById("input-field").addEventListener('keypress', function(e){
  if(e.key === 'Enter'){
    processSearch(10)
  }
})


 const toggel = spinerisloding =>{
   const loaderSection= document.getElementById('spiner')
   if( spinerisloding){
    loaderSection.classList.remove('d-none')
   }
   else{
    loaderSection.classList.add("d-none")
   }
 }
 document.getElementById("show-all").addEventListener('click',function(){
  processSearch()
 })
  // loadPhoneDetails
   
  const loadPhoneDetails = id =>{
    const url =` https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then( res => res.json())
    .then( data => phoneDetailsmodel(data.data))
  }

   const phoneDetailsmodel = phone =>{
    console.log(phone)
    const phoneTitle = document.getElementById("phoneDetailsModelLabel")
     phoneTitle.innerText =phone.name
    const phoneimg =document.getElementById("img")
    phoneimg.innerHTML =''
    const imgDiv =document.createElement('div')
    imgDiv.innerHTML=`
    <img src="${phone.image}" alt="" srcset="">
    <p class="p-2">ReleaseDate: ${phone.releaseDate ? phone.releaseDate:" No inpormation found !"}</p>
    <p class="p-2">MainFeatures: ${phone.mainFeatures.displaySize}</p>
    <p class="p-2">Mamory: ${phone.mainFeatures.memory}</p>
    

    `
    phoneimg.appendChild(imgDiv);
   }


phonehunterload("a")