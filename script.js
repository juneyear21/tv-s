// Function to search for TV series and display results
function searchSeries() {
    const seriesInput = document.getElementById("seriesInput").value;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ACCESS_TOKEN
        }
    };

    fetch(`${THEMEDB_API_BASE_URL}/search/tv?query=${seriesInput}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`, options)
        .then(response => response.json())
        .then(data => {
            // Clear previous search results
            const searchResultsContainer = document.getElementById("searchResults");
            searchResultsContainer.innerHTML = "";

            // Display series results
            data.results.forEach(series => {
                const seriesCard = document.createElement("div");
                seriesCard.classList.add("series-card");

                const title = document.createElement("h3");
                title.textContent = series.name;

                const watchNowButton = document.createElement("button");
                watchNowButton.textContent = "Watch Now";
                watchNowButton.addEventListener("click", () => {
                    // Clear search results
                    searchResultsContainer.innerHTML = "";
                    // Display series player
                    displaySeriesPlayer(series.id);
                });

                seriesCard.appendChild(title);
                seriesCard.appendChild(watchNowButton);

                searchResultsContainer.appendChild(seriesCard);
            });
        })
        .catch(err => console.error(err));
}

// Function to display series player with the provided series ID
function displaySeriesPlayer(seriesId) {
    const seasonInput = document.getElementById("seasonInput").value;
    const episodeInput = document.getElementById("episodeInput").value;

    const playerContainer = document.getElementById("playerContainer");
    const iframe = document.createElement("iframe");
    iframe.setAttribute("src", `${VIDSRC_API_BASE_URL}${seriesId}/${seasonInput}/${episodeInput}`);
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "500px");
    iframe.setAttribute("frameborder", "0");
    playerContainer.innerHTML = ""; // Clear previous player
    playerContainer.appendChild(iframe);
}
