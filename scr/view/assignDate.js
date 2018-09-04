assignDate = () => {
    const dateEl = document.getElementById('today');
    const today = new Date();
    dateEl.textContent = today.toLocaleDateString();
    dateEl.setAttribute('datetime', today.toISOString());
}
