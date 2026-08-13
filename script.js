// Array inicial de datos con Pokémon de ejemplo
let pokemons = [
  {
    id: 1,
    name: "Pikachu",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    type: "Eléctrico",
    hp: 35,
    attack: 55,
    defense: 40
  },
  {
    id: 2,
    name: "Charizard",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    type: "Fuego / Volador",
    hp: 78,
    attack: 84,
    defense: 78
  }
];

// Selección de elementos del DOM
const pokemonForm = document.getElementById('pokemon-form');
const pokemonList = document.getElementById('pokemon-list');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');

const pokemonIdInput = document.getElementById('pokemon-id');
const nameInput = document.getElementById('name');
const imageInput = document.getElementById('image');
const typeInput = document.getElementById('type');
const hpInput = document.getElementById('hp');
const attackInput = document.getElementById('attack');
const defenseInput = document.getElementById('defense');
// Renderizar la lista de Pokémon en la interfaz
function renderPokemons() {
  pokemonList.innerHTML = '';

  pokemons.forEach(pokemon => {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    card.innerHTML = `
      <img src="${pokemon.image}" alt="${pokemon.name}">
      <h3>${pokemon.name}</h3>
      <span class="badge-type">${pokemon.type}</span>
      <div class="stats-container">
        <div class="stat-item">
          <span class="stat-value">${pokemon.hp}</span>
          <span class="stat-label">HP</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">${pokemon.attack}</span>
          <span class="stat-label">ATK</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">${pokemon.defense}</span>
          <span class="stat-label">DEF</span>
        </div>
      </div>
      <div class="card-actions">
        <button class="btn btn-secondary" onclick="editPokemon(${pokemon.id})">Editar</button>
        <button class="btn btn-danger" onclick="deletePokemon(${pokemon.id})">Eliminar</button>
      </div>
    `;

    pokemonList.appendChild(card);
  });
}

// Escuchador de eventos para agregar o actualizar
pokemonForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = pokemonIdInput.value;
  const pokemonData = {
    name: nameInput.value.trim(),
    image: imageInput.value.trim(),
    type: typeInput.value.trim(),
    hp: Number(hpInput.value),
    attack: Number(attackInput.value),
    defense: Number(defenseInput.value)
  };

  if (id) {
    pokemons = pokemons.map(p => p.id === Number(id) ? { ...pokemonData, id: Number(id) } : p);
  } else {
    const newPokemon = {
      ...pokemonData,
      id: Date.now()
    };
    pokemons.push(newPokemon);
  }

  resetForm();
  renderPokemons();
});
// Cargar datos en el formulario para modificar
function editPokemon(id) {
  const pokemon = pokemons.find(p => p.id === id);
  if (!pokemon) return;

  pokemonIdInput.value = pokemon.id;
  nameInput.value = pokemon.name;
  imageInput.value = pokemon.image;
  typeInput.value = pokemon.type;
  hpInput.value = pokemon.hp;
  attackInput.value = pokemon.attack;
  defenseInput.value = pokemon.defense;

  formTitle.textContent = "Editar Pokémon";
  submitBtn.textContent = "Actualizar Pokémon";
  cancelBtn.classList.remove('hidden');
}

// Eliminar un Pokémon por ID
function deletePokemon(id) {
  pokemons = pokemons.filter(p => p.id !== id);
  renderPokemons();
}

// Limpiar inputs del formulario
function resetForm() {
  pokemonForm.reset();
  pokemonIdInput.value = '';
  formTitle.textContent = "Agregar Nuevo Pokémon";
  submitBtn.textContent = "Guardar Pokémon";
  cancelBtn.classList.add('hidden');
}

cancelBtn.addEventListener('click', resetForm);

// Carga inicial
renderPokemons();