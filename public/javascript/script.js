document.addEventListener("DOMContentLoaded", () => {
    const rows = document.querySelectorAll("tr[data-href]");
    const pages = document.getElementsByClassName("resultsPage");
    const buttons = document.getElementsByClassName("pageButton");

    rows.forEach(row => {
        row.addEventListener("click", () => {
            window.location.href = row.dataset.href;
        });
    });


    for(let i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    pages[0].style.display = "block";

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", () => {
            for(let i = 0; i < pages.length; i++) {
                pages[i].style.display = "none";
            }
            pages[i].style.display = "block";
        });
    }

});
