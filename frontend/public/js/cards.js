
//SELECTING ALL VALID WORKSPACE THAT HAS A PROPERTY_ID KEY
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
        <h2 class="card-title">${data.Workspace.name}</h2>
        <span class="card-subtitle">${data.Property.address === undefined ? 'No Address Provided' : `${data.Property.address}`}</span>
        <div class="card-text card-text-star" style="position: absolute; bottom: 20px; right: 20px; padding: 3px 20px 3px 3px">
            <span class="fa fa-star checked" style="color: orange;"></span>
            <p style="position: absolute; top: 2.5px; right: 3px;" class="star-rating">${data.Workspace.ratings}</p>
        </div>
        <div class="card-text">
            ${data.Workspace.description === undefined ? 'No Description Provided' : `${data.Workspace.description}`}
        </div>
        <div class="card-text" style= "padding-top: 5px">
            <p class="availability">${data.Workspace.availability ? 'Available' : 'Not Available'}</p>
        </div>
        <div class=""card-text>
            This is my Property ID: ${data.Workspace.property_id} <br>
            This is the User ID: ${data.Workspace.user_id} <br>
            This is the Workspace ID: ${data.Workspace.id}
        </div>
    </div>

    <div>
    <button class="btn btn-primary btn-sm float-end editWorkspace" data-bs-toggle="modal" data-bs-target="#editWorkspace" edit-WorkspaceL-ID="${data.id}"  edit-WorkspaceP-ID="${data.Workspace.property_id}" edit-Workspace-ID="${data.Workspace.id}" edit-WorkspaceA-ID="${data.Workspace.availability}"  style="position: absolute; top: 60px; right: 10px;">Edit</button>
    </div>
    <div>
    <button class="btn btn-primary btn-sm float-end deleteWorkspace" data-bs-toggle="modal" data-bs-target="#deleteWorkspace" delete-Workspace-ID="${data.Workspace.id}" style="position: absolute; top: 20px; right: 10px;">Delete</button>
    <div style="display:none" id="refreshdiv">
</div>
</div>`;
    console.log(`The Availability is ${data.Workspace.availability}`);
    cardElement.innerHTML = cardContent;
    cardContainer.appendChild(cardElement);
    updateAvailabilityColor();
};

const userId = localStorage.getItem('userID');

// Fetch data from the API server
fetch("http://143.198.237.154/api/allworkspace/")
    .then(response => response.json())
    .then(workspacedata => {
        // Loop through the data and create cards
        workspacedata.forEach(workspaceItem => {
            const path = window.location.pathname;
            const role = localStorage.getItem('role');
            if (path == '/workspace' && role == 'owner') {
                if (userId == workspaceItem.Workspace.user_id) {
                    createCard(workspaceItem);
                } 
            } else {
                createCard(workspaceItem);
            }

        });
    })
    .catch(error => console.error('Error fetching data', error));
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
                    <h1>${data.Workspace.name}</h1>
                    <button class="btn-close" data-bs-dismiss="modal" data-bs-target="#${data.Workspace.id}modal"></button>
                </div>
                <div class="modal-body">
                    <img src="${data.Workspace.photos !== null ? '/img/coworking.jpg' : `${data.Workspace.photos}`}" alt="Image" style="display: block; margin: 0 auto;"">
                    <hr>

                    <span>${data.Property.address === undefined ? 'No Address Provided' : `${data.Property.address}`}</span>
                    <div class="card-text">Capacity: ${data.Workspace.capacity} </div>
                    <div>
                        ${data.Workspace.description === undefined ? '143.198.237.154cription Provided' : `${data.Workspace.description}`}
                    </div>
                    <div class="card-text">Squarefoot: ${data.Property.squarefoot} <br>Parking: ${parseBool(data.Property.parking)} <br> Smoking:${parseBool(data.Property.smoking)} <br> Public Transportation Accessible: ${parseBool(data.Property.transportation)} 
                    </div>
                    <div class="card-text">Price: ${data.price} <br>Lease Term: ${data.lease_term}
                    <br> Lease Id : ${data.id}
                    </div>
                    <div style="padding-top: 5px">
                        <p class="availability">${data.Workspace.availability ? 'Available' : 'Not Available'}</p>
                    </div>
                    <div class="card-text-star" style="position: absolute; bottom: 20px; right: 20px; padding: 3px 20px 3px 3px">
                        <span class="fa fa-star checked" style="color: orange;"></span>
                        <p style="position: absolute; top: 2.5px; right: 3px;" class="star-rating">${data.Workspace.ratings}</p>
                    </div>

                    <div style="display:none" id="refreshdiv">
                        
                    </div>
                    
                </div>
                <div class="modal-footer">
                ${data.Workspace.availability ? `<button class="btn btn-primary book-workspace" data-workspace-id="${parseInt(data.Workspace.id)}" data-property-id="${parseInt(data.Workspace.property_id)}">Book</button> ` : `<button class="btn btn-danger">Rented</button>`}
                    
                </div>
            </div>
        </div>
    </div>`;

    modalElement.innerHTML = modalContent;
    propertyModal.appendChild(modalElement);
    updateAvailabilityColor();
};

// fetch("http://143.198.237.154/api/allworkspace/", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

// Fetch data from the API server
fetch("http://143.198.237.154/api/allworkspace/")
    .then(response => response.json())
    .then(workspacedata1 => {
        // Loop through the data and create card
        workspacedata1.forEach(workspaceItem1 => {
            // const lease = JSON.parse(workspaceItem1.Leases[0])
            // console.log(lease.price)
            // console.log(workspaceItem1.Leases[0])
            createModal(workspaceItem1);
        });
    })
    .catch(error => console.error('Error fetching data', error));

const parseBool = (a) => {
    return a ? "Yes" : "No";
};


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
