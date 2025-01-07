function fetchAllBreeds() {
    fetch('/api/breeds')
      .then(response => response.json())
      .then(data => {
        populateBreedList(data);
      })
      .catch(error => console.error('Error fetching breeds:', error));
  }
  
  function populateBreedList(breeds) {
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', function () {
      const query = this.value.toLowerCase();
      const filteredBreeds = breeds.filter(breed =>
        breed.name.toLowerCase().includes(query)
      );
      displaySuggestions(filteredBreeds);
    });
  }
  
  function displaySuggestions(results) {
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = results
      .map(breed => `<div class="suggestion-item">${breed.name}</div>`)
      .join('');
  
    document.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', function () {
        displayBreedDetails(results.find(b => b.name === this.textContent));
      });
    });
  }
  
  function displayBreedDetails(breed) {
    const results = document.getElementById('results');
    results.innerHTML = `
      <div class="result-card">
        <h2>${breed.name}</h2>
        <img src="${breed.image?.url || ''}" alt="${breed.name}">
        <p><strong>Temperament:</strong> ${breed.temperament}</p>
        <p><strong>Life Span:</strong> ${breed.life_span}</p>
        <p><strong>Weight:</strong> ${breed.weight.metric} kg</p>
        <p><strong>Height:</strong> ${breed.height.metric} cm</p>
      </div>
    `;
  }
  
  fetchAllBreeds();
  