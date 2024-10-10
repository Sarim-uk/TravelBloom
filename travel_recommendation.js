document.getElementById('search-button').addEventListener('click', performSearch);
document.getElementById('clear-button').addEventListener('click', clearSearch);

function performSearch() {
    const input = document.getElementById('search-input').value;
    const normalizedInput = normalizeInput(input);
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            displayRecommendations(filterData(data, normalizedInput));
        })
        .catch(error => {
            console.error('Error fetching travel data:', error);
            alert('Failed to load travel data. Please try again later.');
        });
}

function normalizeInput(input) {
    return input.trim().toLowerCase();
}

function filterData(data, normalizedInput) {
    const results = {countries: [], temples: [], beaches: []};
    const keywords = {
        beaches: ["beach", "beaches"],
        temples: ["temple", "temples"],
        countries: ["country", "countries"]
    };

    if (keywords.beaches.some(keyword => normalizedInput.includes(keyword))) {
        results.beaches = data.beaches;
    }
    if (keywords.temples.some(keyword => normalizedInput.includes(keyword))) {
        results.temples = data.temples;
    }
    if (keywords.countries.some(keyword => normalizedInput.includes(keyword))) {
        results.countries = data.countries;
    }
    return results;
}

function displayRecommendations(data) {
    const container = document.getElementById('recommendations-container');
    container.innerHTML = '';
    Object.keys(data).forEach(category => {
        data[category].forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('recommendation');
            itemElement.innerHTML = `
                <h3>${item.name}</h3>
                <img src="${item.imageUrl}" alt="Image of ${item.name}" style="width: 100%; height: auto;">
                <p>${item.description}</p>
            `;
            container.appendChild(itemElement);
        });
    });

    if (container.innerHTML === '') {
        container.innerHTML = '<p>No results found. Please try different keywords.</p>';
    }
}

function clearSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('recommendations-container').innerHTML = '';
}
