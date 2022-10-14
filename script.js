function setup() {
    const episodes = getAllEpisodes();
    makePageForEpisodes(episodes);
    document.getElementById("searchInput").addEventListener("input", makePageForMatchingEpisodes);
}
function makePageForEpisodes(episodeList) {

    const container = document.getElementById("episodes");
    episodeList.forEach((episode) => {
        const card = document.createElement("div");
        card.className = "card";
        const title = document.createElement("h1");
        title.className = "title";
        title.innerText = `${episode.name} - S${episode.season
            .toString()
            .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
        card.appendChild(title);
        const image = document.createElement("img");
        image.className = "image";
        image.src = episode.image.medium;
        card.appendChild(image);
        const summary = document.createElement("p");
        summary.className = "summary";
        summary.innerHTML = episode.summary;
        card.appendChild(summary);
        container.appendChild(card);
    });
    const count = document.getElementById("countDisplay");
    count.innerText = `Displaying ${episodeList.length}/${getAllEpisodes().length} episodes`;
    select(episodeList);
}
function makePageForMatchingEpisodes() {
    const searchInput = document.getElementById("searchInput").value;
    const episodes = getAllEpisodes();
    const matchingEpisodes = episodes.filter((episode) => {
        return (
            episode.name.toLowerCase().includes(searchInput.toLowerCase())||
            episode.summary.toLowerCase().includes(searchInput.toLowerCase())
        );
    });
    const container = document.getElementById("episodes");
    container.innerHTML = "";
    makePageForEpisodes(matchingEpisodes);
}
function select(episodes) {
    const select = document.getElementById("selectShow");
    episodes.forEach((episode) => {
        const option = document.createElement("option");
        option.innerText = `${episode.name} - S${episode.season
            .toString()
            .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
        select.appendChild(option);
    });
    select.addEventListener("change", (event) => {
        const selectedEpisode = event.target.value;
        const episodes = getAllEpisodes();
        const episode = episodes.find((episode) => {
            return (
                episode.name === selectedEpisode.split(" - ")[0]
            );
        });
        const container = document.getElementById("episodes");
        container.innerHTML = "";
        makePageForEpisodes([episode]);
    });
}


window.onload = setup;