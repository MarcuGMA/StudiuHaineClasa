const ELEMENTS_KEY = "elements";
const ELEMENTS_KEY_CART = "elementsCart";

const getItemsFromStorage = () => {
    return JSON.parse(localStorage.getItem(ELEMENTS_KEY)) || [];
}

let items = getItemsFromStorage();

// const getItemsFromStorageCart = () => {
//   return JSON.parse(localStorage.getItem(ELEMENTS_KEY_CART)) || [];
// }

// let itemsCart = getItemsFromStorageCart();

// afiseaza pe pagina elementele din local storage
const renderElements = (elements = items) => {
    //gaseste containerul unde vor fi afisate elementele
    const container = document.querySelector(".containerElement");
    container.innerHTML = "";

    // pentru fiecare element din local storage creeaza un div cu informatiile despre element
    elements.map((item) => {
        const {name, imageURL, price, color, gender} = item;
        let element = document.createElement("div");
        element.classList.add("element");
        element.innerHTML = `
        <div class="image">
            <img src="${imageURL}" alt="">
        </div>
        <div class="info">
            <h3>${name}</h3>
            <div class="inf">
                <p>Pret: ${price} lei</p>
                <p>Culoare: ${color}</p>
                <p>Gen: ${gender}</p>
            </div>
        </div>
        <div class="buttons">
            <button class="purchaseButton">Cumpara</button>
            <div class="delete">
                <i class="fas fa-light fa-trash"></i>            
            </div>    
            <div class="add">
                <i class="fas fa-solid fa-plus"></i>
            </div>
        </div>
        `;

        return element;     
    }).forEach(element => {
        // adauga fiecare element in container
        container.appendChild(element);
    });
}

// daca nu exista elemente in local storage, salveaza un element de exemplu
// care se va afisa pe pagina la prima incarcare
const saveSampleElementInStorage = () => {
    localStorage.setItem(ELEMENTS_KEY, JSON.stringify([
        {
            name: "tricou",
            price: 100,
            color: "alb",
            size: "M",
            gender: "femei",
            imageURL: "https://pumamoldova.md/images/products/jpg/52325601875x875.jpg?v10.78"
        },
    ]));
}

// daca la prima incarcare a paginii nu exista elemente in local storage,
//salveaza si afiseaza un element de exemplu
if (!items.length) {
    saveSampleElementInStorage();
    items = getItemsFromStorage();
}

renderElements(items);

let addPanel = document.getElementById("add");
addPanel.addEventListener("click", function(){
    document.querySelector(".container").style.display = "flex";
    document.querySelector(".containerElement").style.display = "none";

});
let close = document.querySelector(".close");
close.addEventListener("click", function(){
    document.querySelector(".container").style.display = "none";
    document.querySelector(".containerElement").style.display = "flex";
});


function addElement(){
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let color = document.getElementById("color").value;
    // let size = document.getElementById("size").value;
    let gen = document.getElementById("gen").value;
    let img = document.getElementById("inputFile").value;

    // salveaza elementul in local storage
    saveElement({name, price, color, gender: gen, imageURL: img});
 
    document.querySelector(".container").style.display = "none";
    document.querySelector(".containerElement").style.display = "flex";

    items = getItemsFromStorage();
    renderElements();
}

let checkButton = document.querySelector(".checkButton");
checkButton.addEventListener("click", function(el){
    el.preventDefault();
    addElement();
});


function saveElement(element){
    console.log(element);
    const elements = getItemsFromStorage();
    elements.push(element);
    localStorage.setItem(ELEMENTS_KEY, JSON.stringify(elements));
}

//sterge element

const deleteButtons = document.querySelectorAll('.delete');

deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    const element = button.parentElement.parentElement;
    element.remove();
    const elements = getItemsFromStorage();
    const index = elements.indexOf(element);
    elements.splice(index, 1);
    localStorage.setItem(ELEMENTS_KEY, JSON.stringify(elements));
  });
});

//adauga element

const addButtons = document.querySelectorAll('.add');

addButtons.forEach(button => {
    button.addEventListener('click', () => {
        let cart = document.querySelector(".icons");
    });
    }
);

//panelCart toggle 

const cartIcon = document.getElementById('cart');
const cartContainer = document.querySelector('.cartElementsContainer');

cartIcon.addEventListener('click', function(event) {
  event.stopPropagation(); 
  cartContainer.classList.toggle('active');
  renderElementsCart();
});

document.addEventListener('click', function(event) {
  if (!cartContainer.contains(event.target)) {
    cartContainer.classList.remove('active');
  }
});

//adauga elemente din  cart in local storage

const addToCart = (element) => {
    const cartElements = JSON.parse(localStorage.getItem('cartElements')) || [];
  
    cartElements.push(element);
    localStorage.setItem('cartElements', JSON.stringify(cartElements));
  }
  

addButtons.forEach(button => {
    button.addEventListener('click', () => {
      const element = button.parentElement.parentElement;
      const name = element.querySelector('.info h3').textContent;
      const price = parseFloat(element.querySelector('.inf p:first-of-type').textContent.split(':')[1].trim());
      const color = element.querySelector('.inf p:nth-of-type(2)').textContent.split(':')[1].trim();
      const gender = element.querySelector('.inf p:last-of-type').textContent.split(':')[1].trim();
      const imageURL = element.querySelector('.image img').src;
  
      const cartElement = { name, price, color, gender, imageURL };

        if (cartElement) {
            const cartElements = JSON.parse(localStorage.getItem('cartElements')) || [];
            const cartElementIndex = cartElements.findIndex((el) => el.name === cartElement.name);
            if (cartElementIndex !== 1) {
                cartElements[cartElementIndex].quantity += 1;
            } else {
                cartElements.push({ ...cartElement, quantity: 1 });
            }
            localStorage.setItem('cartElements', JSON.stringify(cartElements));
        }

        addToCart(cartElement);
        
        //gaseste containerul unde vor fi afisate elementele din cart
            const container = document.querySelector(".cartElements");
            container.innerHTML = "";

            
    });

  });

//afiseaza elementele din cart


const renderElementsCart = (elements = items) => {
  //gaseste containerul unde vor fi afisate elementele din cart
  const container = document.querySelector(".cartElements");
  container.innerHTML = "";

  // pentru fiecare element din local storage creeaza un div
  // cu informatiile despre element in cart
  elements.map((item) => {
      const { name, price, color, gender, imageURL } = item;
      let element = document.createElement("div");
      element.classList.add("cartElement");
      element.innerHTML = `
      <div class="cartElImg">
      <img class="cartImg" src="${imageURL}" alt="">
  </div>
  <div class="cartElInfo">
      <div class="top">
          <div class="infoEl">${name}-${color}</div>
          <div class="deleteElCart">
             X
          </div>
      </div>
      <div class="bottom">
      <div class="priceElCart">${price}</div>
          <div class="add-dellElement">
              <button class="dellEl">-</button>
              <div class="elementCount">2</div>
              <button class="addEl">+</button>
          </div>
      </div>
  </div>
      `;

      return element;     
  }).forEach(element => {
      // adauga fiecare element in container in cart
      container.appendChild(element);
  });
  
  //verificam daca exista elemente in local storage pentru
//bula ce arata daca sunt elemente in cart
  if(!container.innerHTML==""){
    cartContainer.classList.add('active');
  }
}


//sterge elemente din cart

const deleteButtonsCart = document.querySelectorAll('.deleteElCart');

deleteButtonsCart.forEach(button => {
    button.addEventListener('click', () => {
      const element = button.parentElement.parentElement.parentElement;
      element.remove();
      const elements = getItemsFromStorage();
      const index = elements.indexOf(element);
      elements.splice(index, 1);
      localStorage.setItem(ELEMENTS_KEY, JSON.stringify(elements));
    });
  });

  
//make a function when click on el with class addEl , el with class elementCount will be +1.and when dellEl will be -1

const addEl = document.querySelectorAll('.addEl');
const dellEl = document.querySelectorAll('.dellEl');
const elementCount = document.querySelectorAll('.elementCount');

addEl.forEach(button => {
    button.addEventListener('click', () => {
        elementCount.forEach(el => {
            // el.textContent = parseInt(el.textContent) + 1;
            console.log(1);
        });
    });
    console.log(elementCount);
}
);

dellEl.forEach(button => {
    button.addEventListener('click', () => {
        elementCount.forEach(el => {
            el.textContent = parseInt(el.textContent) - 1;
        });
    });
}
);
