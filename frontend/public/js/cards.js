// ********OLD CODE******
// const cardContainer = document.getElementById('cardContainer');

// const createCard = (data) => {
//     const cardElement = document.createElement('div');
//     cardElement.className = 'col';
//     cardElement.setAttribute('data-bs-toggle', 'modal');
//     cardElement.setAttribute('data-bs-target', `#${data.id}modal`);

//     const cardContent =
//         `<div class="card">
//     <img src="/img/coworking.jpg" alt="Property image" class="card-img-top">
//     <div class="card-body">
//         <h2 class="card-title">${data.name}</h2>
//         <span class="card-subtitle">${data.address === undefined ? 'No Address Provided': `${data.address}`}</span>
//         <div class="card-text card-text-star" style="position: absolute; bottom: 20px; right: 20px; padding: 3px 20px 3px 3px">
//             <span class="fa fa-star checked" style="color: orange;"></span>
//             <p style="position: absolute; top: 2.5px; right: 3px;" class="star-rating">${data.ratings}</p>
//         </div>
//         <div class="card-text">
//             ${data.description === undefined ? 'No Description Provided': `${data.description}`}  
//         </div>
//         <div class="card-text" style= "padding-top: 5px">
//             <p class="availability">${data.availability ? 'Available' : 'Not Available'}</p>
//         </div>
//         <div class="card-text">
//             This is my Property ID: ${data.property_id} <br>
//             This is the User ID: ${data.user_id} <br>
//             This is the Workspace ID: ${data.id}
//         </div>
//     </div>
// </div>`;

//     cardElement.innerHTML = cardContent;
//     cardContainer.appendChild(cardElement);
//     updateAvailabilityColor();
// };

// // Fetch data from the API server
// fetch('http://143.198.237.154/api/workspace/')
//     .then(response => response.json())
//     .then(data => {
//         // Loop through the data and create cards
//         data.forEach(item => {
//             createCard(item);
//         });
//     })
//     .catch(error => console.error('Error fetching data:', error));




// ******MODIFIED CODE********* SELECTING ALL VALID WORKSPACE THAT HAS A PROPERTY_ID KEY
const cardContainer = document.getElementById('cardContainer');

const createCard = (workspace_data, property_data) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'col';
    cardElement.setAttribute('data-bs-toggle', 'modal');
    cardElement.setAttribute('data-bs-target', `#${workspace_data.id}modal`);

    const cardContent =
        `<div class="card">
    <img src="/img/coworking.jpg" alt="Property image" class="card-img-top" id="workspaceImage"">
    <div class="card-body">
        <h2 class="card-title">${workspace_data.name}</h2>
        <span class="card-subtitle">${property_data.address === undefined ? 'No Address Provided': `${property_data.address}`}</span>
        <div class="card-text card-text-star" style="position: absolute; bottom: 20px; right: 20px; padding: 3px 20px 3px 3px">
            <span class="fa fa-star checked" style="color: orange;"></span>
            <p style="position: absolute; top: 2.5px; right: 3px;" class="star-rating">${workspace_data.ratings}</p>
        </div>
        <div class="card-text">
            ${workspace_data.description === undefined ? 'No Description Provided': `${workspace_data.description}`}  
        </div>
        <div class="card-text" style= "padding-top: 5px">
            <p class="availability">${workspace_data.availability ? 'Available' : 'Not Available'}</p>
        </div>
        <div class=""card-text>
            This is my Property ID: ${workspace_data.property_id} <br>
            This is the User ID: ${workspace_data.user_id} <br>
            This is the Workspace ID: ${workspace_data.id}
        </div>
    </div>
</div>`;

    cardElement.innerHTML = cardContent;
    cardContainer.appendChild(cardElement);
    updateAvailabilityColor();
};

const userId = localStorage.getItem('userID');

// Fetch data from the API server
fetch('http://143.198.237.154/api/workspace/')
    .then(response => response.json())
    .then(workspacedata => {
        fetch('http://143.198.237.154/api/property/')
            .then(response => response.json())
            .then(propertydata => {
                // Loop through the data and create cards
                workspacedata.forEach(workspaceItem => {
                    propertydata.forEach(propertyItem => {
                        if(workspaceItem.property_id === propertyItem.id){
                        createCard(workspaceItem,propertyItem);
                    }
                    })
                })
                  
            })
            .catch(error => console.error('Error fetching data', error));
        })
    .catch(error => console.error('Error fetching data:', error));







//////*******OLD CODE */////////////////


// const propertyModal = document.getElementById('property-modals');

// const createModal = (data) => {
//     const modalElement = document.createElement('div');
//     modalElement.className = "container";

//     const modalContent = `
// <div class="modal fade" id="${data.id}modal">
//         <div class="modal-dialog modal-dialog-centered modal-xl">
//             <div class="modal-content">
//                 <div class="modal-header">
//                     <h1>${data.name}</h1>
//                     <button class="btn-close" data-bs-dismiss="modal" data-bs-target="#${data.id}modal"></button>
//                 </div>
//                 <div class="modal-body">
//                     <img src="${data.photos === null ? '/img/coworking.jpg': `${data.photos}`}" alt="Image" style="display: block; margin: 0 auto;"">
//                     <hr>

//                     <span>${data.address === undefined ? 'No Address Provided (Please Check on hot to accces the Property table Address)': `${data.address}`}</span>
//                     <div class="card-text-star" style="position: absolute; bottom: 20px; left: 20px; padding: 3px 20px 3px 3px">
//                         <span class="fa fa-star checked" style="color: orange;"></span>
//                         <p style="position: absolute; top: 2.5px; right: 3px;" class="star-rating">${data.ratings}</p>
//                     </div>
//                     <div>
//                         ${data.description === undefined ? 'No Description Provided': `${data.description}`}  
//                     </div>
//                     <div style="padding-top: 5px">
//                         <p class="availability">${data.availability ? 'Available' : 'Not Available'}</p>
//                     </div>
//                     <div>
//                         Display all the properties description (Smoking, Transpo, Parking)
//                     <div>
//                 </div>
//                 <div class="modal-footer">
//                     <button class="btn btn-primary">Book</button>
//                 </div>
//             </div>
//         </div>
//     </div>`;

//     modalElement.innerHTML = modalContent;
//     propertyModal.appendChild(modalElement);
//     updateAvailabilityColor();
// }

// // Fetch data from the API server
// fetch('http://143.198.237.154/api/workspace/')
//     .then(response => response.json())
//     .then(data => {
//         // Loop through the data and create cards
//         data.forEach(item => {
//             createModal(item);
//         });
//     })
//     .catch(error => console.error('Error fetching data:', error));


//  // Function to change availability text color
//  function updateAvailabilityColor() {
//     // Get all elements with the availability class
//     var availabilityElements = document.querySelectorAll('.availability');

//     // Loop through each element
//     availabilityElements.forEach(function(element) {
//         // Check if availability is "Available"
//         if (element.textContent.trim() === 'Available') {
//             // Set font color to green
//             element.style.color = 'green';
//         } else {
//             // Set font color to red
//             element.style.color = 'red';
//         }
//     });
// }






// ******MODIFIED CODE********* SELECTING ALL VALID WORKSPACE THAT HAS A PROPERTY_ID KEY

const propertyModal = document.getElementById('property-modals');

const createModal = (workspace_data, property_data) => {
    const modalElement = document.createElement('div');
    modalElement.className = "container";

    const modalContent = `
<div class="modal fade" id="${workspace_data.id}modal">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1>${workspace_data.name}</h1>
                    <button class="btn-close" data-bs-dismiss="modal" data-bs-target="#${workspace_data.id}modal"></button>
                </div>
                <div class="modal-body">
                    <img src="${workspace_data.photos !== null ? '/img/coworking.jpg': `${workspace_data.photos}`}" alt="Image" style="display: block; margin: 0 auto;"">
                    <hr>

                    <span>${property_data.address === undefined ? 'No Address Provided': `${property_data.address}`}</span>
                    <div class="card-text">Capacity: ${workspace_data.capacity} </div>
                    <div>
                        ${workspace_data.description === undefined ? 'No Description Provided': `${workspace_data.description}`}  
                    </div>
                    <div class="card-text">Squarefoot: ${property_data.squarefoot} <br>Parking: ${parseBool(property_data.parking)} <br> Smoking:${parseBool(property_data.smoking)} <br> Public Transportation Accessible: ${parseBool(property_data.transportation)} 
                    </div>
                    <div style="padding-top: 5px">
                        <p class="availability">${workspace_data.availability ? 'Available' : 'Not Available'}</p>
                    </div>
                    <div class="card-text-star" style="position: absolute; bottom: 20px; right: 20px; padding: 3px 20px 3px 3px">
                        <span class="fa fa-star checked" style="color: orange;"></span>
                        <p style="position: absolute; top: 2.5px; right: 3px;" class="star-rating">${workspace_data.ratings}</p>
                    </div>
                    
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary book-workspace-id=${workspace_data.id}" data-property-id="${workspace_data.property_id}">Book</button>
                </div>
            </div>
        </div>
    </div>`;

    modalElement.innerHTML = modalContent;
    propertyModal.appendChild(modalElement);
    updateAvailabilityColor();
}

// Fetch data from the API server
fetch('http://143.198.237.154/api/workspace/')
    .then(response => response.json())
    .then(workspacedata1 => {
        fetch('http://143.198.237.154/api/property/')
            .then(response => response.json())
            .then(propertydata1 => {
                // Loop through the data and create cards
                workspacedata1.forEach(workspaceItem1 => {
                    propertydata1.forEach(propertyItem1 => {
                        if(workspaceItem1.property_id == propertyItem1.id){
                            createModal(workspaceItem1,propertyItem1);
                        }
                    })
                })   
            })
            .catch(error => console.error('Error fetching data', error));
        })
    .catch(error => console.error('Error fetching data:', error));

    const parseBool = (a) => {
        return a ? "Yes" : "No";
    }


// Function to change availability text color
function updateAvailabilityColor() {
// Get all elements with the availability class
var availabilityElements = document.querySelectorAll('.availability');

// Loop through each element
availabilityElements.forEach(function(element) {
    // Check if availability is "Available"
    if (element.textContent.trim() === 'Available') {
        // Set font color to green
        element.style.color = 'green';
    } else {
        // Set font color to red
        element.style.color = 'red';
    }
});
}

