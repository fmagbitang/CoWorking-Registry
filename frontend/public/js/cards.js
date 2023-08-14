
        const cardContainer = document.getElementById('cardContainer');

        const createCard = (data) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'col';
            cardElement.setAttribute('data-bs-toggle', 'modal');
            cardElement.setAttribute('data-bs-target', `#${data.id}modal`);

            const cardContent =
                `<div class="card">
            <img src="/img/coworking.jpg" alt="Property image" class="card-img-top">
            <div class="card-body">
                <h2 class="card-title">${data.name}</h2>
                <span class="card-subtitle">${data.address}</span>
                <div class="card-text">
                    <p>Availability: ${data.availability ? 'Available' : 'Not Available'}</p>
                    <div class="card-text card-text-star" style="position: absolute; bottom: 20px; right: 20px; padding: 3px 20px 3px 3px">
                    <span class="fa fa-star checked" style="color: orange;"></span>
                    <p style="position: absolute; top: 2.5px; right: 3px;" class="star-rating">${data.ratings}</p>
                    </div>
                </div>
            </div>
        </div>`;

            cardElement.innerHTML = cardContent;
            cardContainer.appendChild(cardElement);
        };

        // Fetch data from the API server
        fetch('http://143.198.237.154/api/workspace/')
            .then(response => response.json())
            .then(data => {
                // Loop through the data and create cards
                data.forEach(item => {
                    createCard(item);
                });
            })
            .catch(error => console.error('Error fetching data:', error));

        
        // modal for workspace
        const propertyModal = document.getElementById('property-modals');

        const createModal = (data) => {
            const modalElement = document.createElement('div');
            modalElement.className = "container";

            const modalContent = `
        <div class="modal fade" id="${data.id}modal">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1>${data.name}</h1>
                            <button class="btn-close" data-bs-dismiss="modal" data-bs-target="#${data.id}modal"></button>
                        </div>
                        <div class="modal-body">
                            <img src="${data.image}" alt="Image">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quibusdam, doloremque, obcaecati debitis voluptatum vel eaque iusto autem blanditiis esse magnam eveniet totam earum dolores libero eos accusamus eius quidem?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quibusdam, doloremque, obcaecati debitis voluptatum vel eaque iusto autem blanditiis esse magnam eveniet totam earum dolores libero eos accusamus eius quidem?
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quibusdam, doloremque, obcaecati debitis voluptatum vel eaque iusto autem blanditiis esse magnam eveniet totam earum dolores libero eos accusamus eius quidem?
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-primary">Book</button>
                        </div>
                    </div>
                </div>
            </div>`;

            modalElement.innerHTML = modalContent;
            propertyModal.appendChild(modalElement);

            // Fetch data from the API server
            fetch('http://143.198.237.154/api/workspace/')
                .then(response => response.json())
                .then(data => {
                    // Loop through the data and create cards
                    data.forEach(item => {
                        createModal(item);
                    });
                })
                .catch(error => console.error('Error fetching data:', error));
        }