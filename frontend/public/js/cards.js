

// SELECTING ALL VALID WORKSPACE THAT HAS A PROPERTY_ID KEY
const cardContainer = document.getElementById('cardContainer');

const createCard = (data) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'col';
    cardElement.setAttribute('data-bs-toggle', 'modal');
    cardElement.setAttribute('data-bs-target', `#${data.Workspace.id}modal`);

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

    <div>
    <button class="btn btn-primary btn-sm float-end editWorkspace" data-bs-toggle="modal" data-bs-target="#editWorkspace">Edit</button>
    </div>
    <div>
    <button class="btn btn-primary btn-sm float-end deleteWorkspace" data-bs-toggle="modal" data-bs-target="#deleteWorkspace">Delete</button>
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


//SELECTING ALL VALID WORKSPACE FOR MODEL

const propertyModal = document.getElementById('property-modals');

const createModal = (data) => {
    const modalElement = document.createElement('div');
    modalElement.className = "container";

    const modalContent = `
<div class="modal fade" id="${data.Workspace.id}modal">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1>${workspace_data.name}</h1>
                    <button class="btn-close" data-bs-dismiss="modal" data-bs-target="#${workspace_data.id}modal"></button>
                </div>
                <div class="modal-body">
                    <img src="${workspace_data.photos !== null ? '/img/coworking.jpg': `${workspace_data.photos}`}" alt="Image" style="display: block; margin: 0 auto;"">
                    <hr>

                    <span>${workspace_data.Property.address === undefined ? 'No Address Provided': `${workspace_data.Property.address}`}</span>
                    <div class="card-text">Capacity: ${workspace_data.capacity} </div>
                    <div>
                        ${workspace_data.description === undefined ? 'No Description Provided': `${workspace_data.description}`}  
                    </div>
                    <div class="card-text">Squarefoot: ${workspace_data.Property.squarefoot} <br>Parking: ${parseBool(workspace_data.Property.parking)} <br> Smoking:${parseBool(workspace_data.Property.smoking)} <br> Public Transportation Accessible: ${parseBool(workspace_data.Property.transportation)} 
                    </div>
                    <div class="card-text">Price: ${workspace_data.Leases.price} <br>Lease Term: ${parseBool(workspace_data.Leases.lease_term)}
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
                    <button class="btn btn-primary book-workspace" book-workspace-id=${workspace_data.id}" data-property-id="${workspace_data.property_id}">Book</button>
                </div>
            </div>
        </div>
    </div>`;

    modalElement.innerHTML = modalContent;
    propertyModal.appendChild(modalElement);
    updateAvailabilityColor();
}

// fetch("http://143.198.237.154/api/allworkspace/", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

// Fetch data from the API server
fetch("http://143.198.237.154/api/allworkspace/")
    .then(response => response.json())
    .then(workspacedata1 => {
            // Loop through the data and create cards
            workspacedata1.forEach(workspaceItem1 => {
                    createModal(workspaceItem1);
                })
            })   
        .catch(error => console.error('Error fetching data', error));

const parseBool = (a) => {
    return a ? "Yes" : "No";
}


// Function to change availability text color
function updateAvailabilityColor() {
    // Get all elements with the availability class
    var availabilityElements = document.querySelectorAll('.availability');

    // Loop through each element
    availabilityElements.forEach(function (element) {
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