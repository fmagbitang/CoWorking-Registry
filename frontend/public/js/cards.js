
//SELECTING ALL VALID WORKSPACE THAT HAS A PROPERTY_ID KEY
const cardContainer = document.getElementById('cardContainer');

const createCard = (data, search) => {
    var wpName, wpDescription, wpAvailability, wpUserID, wpRatings, wpID, wpPropertyID, pAddress , wpPhotos;

    if (search == 1) {
        wpName = data.Workspace.name;
        wpRatings = data.Workspace.ratings;
        wpDescription = data.Workspace.description;
        wpAvailability = data.Workspace.availability;
        wpPropertyID = data.Workspace.property_id;
        wpUserID = data.Workspace.user_id;
        wpID = data.Workspace.id;
        pAddress = data.Property.address;
        wpPhotos = data.Workspace.photos;
    } else {

        wpName = data.name;
        wpRatings = data.ratings;
        wpDescription = data.description;
        wpAvailability = data.availability;
        wpPropertyID = data.property_id;
        wpUserID = data.user_id;
        wpID = data.id;
        pAddress = data.Property.address; 
        wpPhotos = data.photos;
    }
    const cardElement = document.createElement('div');
    cardElement.className = 'col';
    cardElement.setAttribute('data-bs-toggle', 'modal');
    cardElement.setAttribute('data-bs-target', `#${wpID}modal`);
    const role = localStorage.getItem('role');
    const editButtonHtml = role === "owner"
        ? `<button class="btn btn-primary btn-sm float-end editWorkspace" data-bs-toggle="modal" data-bs-target="#editWorkspace" edit-WorkspaceL-ID="${wpID}"  edit-WorkspaceP-ID="${wpPropertyID}" edit-Workspace-ID="${wpID}" edit-WorkspaceA-ID="${wpAvailability}"  style="position: absolute; top: 60px; right: 10px;">Edit</button>`
        : '';

    const deleteButtonHtml = role === "owner"
        ? `<button class="btn btn-primary btn-sm float-end deleteWorkspace" data-bs-toggle="modal" data-bs-target="#deleteWorkspace" delete-Workspace-ID="${wpID}" style="position: absolute; top: 20px; right: 10px;">Delete</button>`
        : '';
    const cardContent =
        `
    <div class="card">
    <img src="${wpPhotos == "/img/" || wpPhotos == "" ? `/img/coworking.jpg` : wpPhotos}" alt="Property image" class="card-img-top" id="workspaceImage"">
    <div class="card-body">
        <h2 class="card-title">${wpName}</h2>
        <span class="card-subtitle">${pAddress === undefined ? 'No Address Provided' : `${pAddress}`}</span>
        <div class="card-text card-text-star" style="position: absolute; bottom: 20px; right: 20px; padding: 3px 20px 3px 3px">
            <span class="fa fa-star checked" style="color: orange;"></span>
            <p style="position: absolute; top: 2.5px; right: 3px;" class="star-rating">${wpRatings}</p>
        </div>
        <div class="card-text">
            ${wpDescription === undefined ? 'No Description Provided' : `${wpDescription}`}
        </div>
        <div class="card-text">
            Price: $ ${data.price} <br>
            Lease Term: ${data.lease_term === null ? 'No Term Chosen' : `${data.lease_term}`}
        </div>
        <div class="card-text" style= "padding-top: 5px">
            <p class="availability">${wpAvailability ? 'Available' : 'Not Available'}</p>
        </div>
    </div>
    <div>
        ${editButtonHtml}
    </div>
    <div>
        ${deleteButtonHtml}
    </div>
    <div style="display:none" id="refreshdiv">
        `;
    console.log(`The Availability is ${wpAvailability}`);
    cardElement.innerHTML = cardContent;
    cardContainer.appendChild(cardElement);
    updateAvailabilityColor();
};

const userId = localStorage.getItem('userID');


// search button script
searchButton.addEventListener('click', async () => {
    const searchTerm = document.getElementById('searchInput').value;
    console.log(searchTerm);
    fetch(`http://localhost:3000/api/search/workspace/${searchTerm}`)
        .then(response => response.json())
        .then(workspacedata => {
            // Clear existing cards
            cardContainer.innerHTML = '';
            workspacedata.forEach(workspaceItem => {
                console.log(workspaceItem);
                createCard(workspaceItem, 0);
            });
        });
});

// Fetch data from the API server
fetch("http://localhost:3000/api/allworkspace/")
    .then(response => response.json())
    .then(workspacedata => {
        // console.log(workspacedata.Workspace.photos);
        console.log(workspacedata);
        //  sort data
        const sortAndDisplayCards = (sortBy) => {
            // Sort the cardData array based on the selected sorting option
            if (sortBy === 'nameAsc') {
                workspacedata.sort((a, b) => a.id - b.id);
            } else if (sortBy === 'nameDesc') {
                workspacedata.sort((a, b) => b.id - a.id);
            }

            // Clear the existing card container
            cardContainer.innerHTML = '';
            // Re-create and display cards in the updated order
            workspacedata.forEach((card) => {
                createCard(card, 1); // Use the search value 1 since it's sorted data
            });
        };
        const sortSelect = document.getElementById('sortSelect');
        sortSelect.addEventListener('change', () => {
            const sortBy = sortSelect.value;
            sortAndDisplayCards(sortBy);
        });
        //  End of sort
        // Loop through the data and create cards
        workspacedata.forEach(workspaceItem => {
            const path = window.location.pathname;
            const role = localStorage.getItem('role');
            if (path == '/workspace' && role == 'owner') {
                if (userId == workspaceItem.Workspace.user_id) {
                    createCard(workspaceItem, 1);
                }
            } else if (path == '/myBookings' && role == 'coworker' || role == 'user') {
                if (userId == workspaceItem.user_id) {
                    createCard(workspaceItem);
                }
            } else {
                createCard(workspaceItem, 1);
            }
        });
    })
    .catch(error => console.error('Error fetching data', error));
//SELECTING ALL VALID WORKSPACE FOR MODEL

const propertyModal = document.getElementById('property-modals');

const createModal = (data) => {
    const modalElement = document.createElement('div');
    modalElement.className = "container";
    const role = localStorage.getItem('role');

    const modalContent = `
<div class="modal fade" id="${data.Workspace.id}modal">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1>${data.Workspace.name}</h1>
                    <button class="btn-close" data-bs-dismiss="modal" data-bs-target="#${data.Workspace.id}modal"></button>
                </div>
                <div class="modal-body">
                <img src="${data.Workspace.photos == "/img/" || data.Workspace.photos == "" ? `/img/coworking.jpg` : data.Workspace.photos}" alt="Image" style="display: block; margin: 0 auto;">

                    <hr>

                    <span>${data.Property.address === undefined ? 'No Address Provided' : `${data.Property.address}`}</span>
                    <div class="card-text">Capacity: ${data.Workspace.capacity} </div>
                    <div>
                        ${data.Workspace.description === undefined ? 'No description Provided' : `${data.Workspace.description}`}
                    </div>
                    <div class="card-text">Squarefoot: ${data.Property.squarefoot} <br>Parking: ${parseBool(data.Property.parking)} <br> Smoking:${parseBool(data.Property.smoking)} <br> Public Transportation Accessible: ${parseBool(data.Property.transportation)} 
                    </div>
                    <div class="card-text">Price: $ ${data.price} <br>Lease Term: ${data.lease_term}
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
                ${role === 'owner' ? '' :
            data.Workspace.availability ?
                `<button class="btn btn-primary book-workspace" data-workspace-id="${data.Workspace.id}" data-property-id="${parseInt(data.Workspace.property_id)}">Book</button>` :
                `<button class="btn btn-danger">Rented</button>`}
                </div>
            </div>
        </div>
    </div>`;

    modalElement.innerHTML = modalContent;
    propertyModal.appendChild(modalElement);
    updateAvailabilityColor();
};

fetch("http://localhost:3000/api/allworkspace/")
    .then(response => response.json())
    .then(workspacedata1 => {
        // Loop through the data and create card
        // console.log(workspacedata1.Workspace.photos);
        workspacedata1.forEach(workspaceItem1 => {
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
