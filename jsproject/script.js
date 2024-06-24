
const searchInput = document.getElementById('searchInput');
const experimentInfo = document.getElementById('experimentInfo');

searchInput.addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const experimentRows = experimentInfo.getElementsByClassName('experiment-row');
    
    for (let row of experimentRows) {
        const buttonText = row.querySelector('button').innerText.toLowerCase();
        if (buttonText.includes(searchValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
});
