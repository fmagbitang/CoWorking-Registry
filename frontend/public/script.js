
let propertiesData = [{ title: '', price: '', location: '', sqf:'', neighborhood: '', parking: '', transpo:'' }];
// Function to generate property listings
function generatePropertyListings() {
const propertiesSection = document.getElementById('properties');

propertiesData.forEach(property => {
    const propertyElement = document.createElement('div');
    propertyElement.classList.add('property');
    propertyElement.innerHTML = `
        <h3>${property.title}</h3>
        <p><strong>Price:</strong> ${property.price}</p>
        <p><strong>Location:</strong> ${property.location}</p>
        <p><strong>Square Feet:</strong> ${property. sqf}</p>
        <p><strong>Nearest Landmark:</strong> ${property. neighborhood}</p>
        <p><strong>Parking Garage:</strong> ${property. parking}</p>
        <p><strong>Public Transportation:</strong> ${property. transpo}</p>
       
    `;
    propertiesSection.appendChild(propertyElement);
});
}
// Function to add a property
function addProperty(title, price, location,sqf,neighborhood,parking,transpo) {
propertiesData.push({ title, price, location,sqf,neighborhood,parking,transpo });
generatePropertyListings();
}
// Handle form submission
const propertyForm = document.getElementById('property-form');
propertyForm.addEventListener('submit', function (event) {
event.preventDefault();

const titleInput = document.getElementById('title');
const priceInput = document.getElementById('price');
const locationInput = document.getElementById('location');
const sqfInput = document.getElementById('sqf');
const neighborhoodInput = document.getElementById('neighborhood'); 
const parkingInput = document.getElementById('parking');
const transpoInput = document.getElementById('transpo');


const title = titleInput.value;
const price = priceInput.value;
const location = locationInput.value;
const sqf= sqfInput.value;
const neighborhood= neighborhoodInput.value;
const parking = parkingInput.value;
const transpo = transpoInput.value;


addProperty( title, price, location,sqf,neighborhood,parking,transpo);

// Clear the form
titleInput.value = '';
priceInput.value = '';
locationInput.value = '';
sqfInput.value = '';
neighborhoodInput.value = '';
parkingInput.value = '';
transpoInput.value ='';
});

// Call the function to generate property listings
generatePropertyListings();

// Handle modal functionality
const openModalButton = document.getElementById('open-modal');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementsByClassName('close')[0];

openModalButton.addEventListener('click', function () {
modal.style.display = 'block';
});

closeModalButton.addEventListener('click', function () {
modal.style.display = 'none';
});

window.addEventListener('click', function (event) {
if (event.target == modal) {
    modal.style.display = 'none';
}
});

