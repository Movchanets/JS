class GameOfThrones
{
    constructor(number = 10)
    {   this.URL = "https://thronesapi.com/api/v2/Characters"
    this.div = document.querySelector(".forTable");
    this.character = document.querySelector(".Character");
        this.number =number;
        this.page =1;
        this.chosen =1;
        this.find =false;
    }
    LoadAllToLC()
    {
    if(localStorage.getItem("Characters") == null){
      fetch(this.URL)
        .then((result) => {
          return result.json();
        }).then(data=>{
console.log(data);   
localStorage.setItem("Characters",JSON.stringify(data));
});
    
}}
BuildTable()
{   while (this.div.firstChild) {
    this.div.removeChild(this.div.lastChild);
  }
    let table = document.createElement("table");
    table.className = "card pe-5 ps-5 pt-2 ps-2 w-100 ";
 let Thead =   table.createTHead();
 Thead.appendChild(document.createElement("th"));
 Thead.appendChild(document.createElement("th"));
 Thead.appendChild(document.createElement("th"));
Thead.children[0].textContent="Id";
Thead.children[1].textContent="Name";
Thead.children[2].textContent="Image";
Thead.className="table-header";

Thead.children[0].className = "header__item";
Thead.children[1].className = "header__item";
Thead.children[2].className = "header__item";
if(this.find ==false){
for(var i=0;i<this.number;i++)
  { let index = this.number*(this.page-1) +i ;
    if(index>52){console.log("alarm"); break;}
    let element = JSON.parse(localStorage.getItem("Characters"))[index];
    
    let row = table.insertRow();
  let id =  row.insertCell();
  let fullname=  row.insertCell();
  
   let image= row.insertCell();
   id.textContent= element.id;
   fullname.textContent= element.fullName;
  let img = document.createElement("img"); img.src=element.imageUrl
   image.appendChild(img);
   row.className = "table-row"
   table.className = "table"
 
   
   row.children[0].className = "table-data";
   row.children[1].className = "table-data";
   row.children[2].className = "table-data";
   row.addEventListener("click",()=>{
   this.chosen = index;
   this.BuildChosen();
   
   });
  }}
  else
{
    let element = JSON.parse(localStorage.getItem("Characters"))[this.chosen];
    
    let row = table.insertRow();
  let id =  row.insertCell();
  let fullname=  row.insertCell();
  
   let image= row.insertCell();
   id.textContent= element.id;
   fullname.textContent= element.fullName;
  let img = document.createElement("img"); img.src=element.imageUrl
   image.appendChild(img);
   row.className = "table-row"
   table.className = "table"
 
   
   row.children[0].className = "table-data";
   row.children[1].className = "table-data";
   row.children[2].className = "table-data";
   row.addEventListener("click",
   ()=>
   {
   
   this.BuildChosen();
  });
  this.find=false;
}
   this.div.appendChild(table);
}
BuildChosen()
{
    while (this.character.firstChild) {
        this.character.removeChild(this.character.lastChild);
      }
let element =JSON.parse(localStorage.getItem("Characters"))[this.chosen];
let header = document.createElement("h2");
header.textContent = element.fullName
let img = document.createElement("img");
img.src = element.imageUrl;
img.className="col-6"
let minitable = document.createElement("table");
let IdRow = minitable.insertRow();
(IdRow.insertCell()).textContent = "ID";
(IdRow.insertCell()).textContent = element.id;
let NameRow = minitable.insertRow();
(NameRow.insertCell()).textContent = "Name";
(NameRow.insertCell()).textContent = element.firstName;
let SurnameRow = minitable.insertRow();
(SurnameRow.insertCell()).textContent = "Surname";
(SurnameRow.insertCell()).textContent = element.lastName;
let FullNameRow = minitable.insertRow();
(FullNameRow.insertCell()).textContent = "FullName";
(FullNameRow.insertCell()).textContent = element.fullName;
let TitleRow = minitable.insertRow();
(TitleRow.insertCell()).textContent = "Title";
(TitleRow.insertCell()).textContent = element.title;
let FamilyRow = minitable.insertRow();
(FamilyRow.insertCell()).textContent = "Family";
(FamilyRow.insertCell()).textContent = element.family;
let ImageRow = minitable.insertRow();
(ImageRow.insertCell()).textContent = "Image";
(ImageRow.insertCell()).textContent = element.image;
let ImageUrlRow = minitable.insertRow();
(ImageUrlRow.insertCell()).textContent = "ImageUrl";
(ImageUrlRow.insertCell()).textContent = element.imageUrl;
this.character.appendChild(header);
this.character.appendChild(img);
this.character.appendChild(minitable);
}
Search(name)
{
    let arr =JSON.parse(localStorage.getItem("Characters")); 
    let index = arr.find((element)=> element.fullName == name)?.id;
  
    if(index>=0&&index<53){
        this.chosen= index;
        this.find=true;
        this.BuildTable();
  
    }
}
}
const GOT = new GameOfThrones();
GOT.LoadAllToLC();
GOT.BuildTable();
GOT.BuildChosen();
const Select = document.querySelector(".form-select");
Select.addEventListener('change',event =>{
    GOT.number = Number(event.target.value);
    GOT.page=1;
    Next.disabled = false;
    GOT.BuildTable();
});
const Prev = document.querySelector(".prev");
Prev.addEventListener("click",function(){
   if(GOT.page>1){ GOT.page--;
    GOT.BuildTable();
    Next.disabled= false;
    }
    else{
        Prev.disabled = true;
    }
});
const Next = document.querySelector(".next");
Next.addEventListener("click",function(){
   
   if(GOT.page<Math.ceil(53/GOT.number)){ GOT.page++;
    GOT.BuildTable();
    Prev.disabled= false;
    console.log(GOT.page);
    }
    else{
        Next.disabled = true;
    }
});
const SearchBtn = document.querySelector(".Search");
SearchBtn.addEventListener("click",()=>{
    GOT.Search(document.getElementById("searchTxt").value);
})