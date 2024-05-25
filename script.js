// Referências ao banco de dados
const database = firebase.database();
const boyVotesRef = database.ref('votes/boy');
const girlVotesRef = database.ref('votes/girl');
const participantsRef = database.ref('participants');

// Elementos DOM
const boyButton = document.getElementById('boyButton');
const girlButton = document.getElementById('girlButton');
const boyVotesSpan = document.getElementById('boyVotes');
const girlVotesSpan = document.getElementById('girlVotes');
const participantsList = document.getElementById('participants');
const participantNameInput = document.getElementById('participantName');

// Atualiza votos em tempo real
boyVotesRef.on('value', (snapshot) => {
    boyVotesSpan.textContent = snapshot.val() || 0;
});

girlVotesRef.on('value', (snapshot) => {
    girlVotesSpan.textContent = snapshot.val() || 0;
});

// Adiciona votações
boyButton.addEventListener('click', () => {
    const participantName = participantNameInput.value.trim();
    if (participantName) {
        boyVotesRef.transaction((currentVotes) => (currentVotes || 0) + 1);
        participantsRef.push({ name: participantName, vote: 'Menino' });
    }
});

girlButton.addEventListener('click', () => {
    const participantName = participantNameInput.value.trim();
    if (participantName) {
        girlVotesRef.transaction((currentVotes) => (currentVotes || 0) + 1);
        participantsRef.push({ name: participantName, vote: 'Menina' });
    }
});

// Atualiza lista de participantes em tempo real
participantsRef.on('child_added', (snapshot) => {
    const participant = snapshot.val();
    const li = document.createElement('li');
    li.textContent = `${participant.name} votou em ${participant.vote}`;
    participantsList.appendChild(li);
});
