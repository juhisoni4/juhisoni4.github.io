const navigationLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll(".content-section");

function showSection(target) {

    const targetLink =
        document.querySelector(
            `.nav-link[data-section="${target}"]`
        );

    const targetSection =
        document.getElementById(target);

    if (!targetLink || !targetSection) {
        return;
    }

    navigationLinks.forEach(link => {
        link.classList.remove("active");
    });

    sections.forEach(section => {
        section.classList.remove("active-section");
    });

    targetLink.classList.add("active");
    targetSection.classList.add("active-section");

}

navigationLinks.forEach(link => {

    link.addEventListener("click", () => {

        const target =
            link.getAttribute("data-section");

        showSection(target);

        /*
         * Update browser URL
         */

        history.pushState(
            null,
            "",
            "#" + target
        );

    });

});

document.querySelector(".identity").addEventListener("click", event => {
    event.preventDefault();
    showSection("about");
    history.pushState(null, "", "#about");
});


/*
 * Open correct section when URL contains
 * #about, #projects, #publication or #cv
 */

function openSectionFromURL() {

    const hash =
        window.location.hash.substring(1);


    if (!hash) {
        return;
    }


    const targetLink =
        document.querySelector(
            `.nav-link[data-section="${hash}"]`
        );


    const targetSection =
        document.getElementById(hash);


    if (
        targetLink &&
        targetSection
    ) {

        showSection(hash);

    }

}

/* =====================================================
   PROJECT CATEGORY TABS
===================================================== */

const projectTabs =
    document.querySelectorAll(".project-tab");

const projectCategories =
    document.querySelectorAll(
        ".project-category-content"
    );


/*
 * Turn each project into a tile that reveals its details on demand.
 */

document.querySelectorAll(".project").forEach(project => {

    const projectInfo = project.querySelector(".project-info");
    const projectNumber = project.querySelector(".project-number");
    const projectTitle = projectInfo.querySelector("h3");
    const projectCategory = projectInfo.querySelector(".project-category");

    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "project-tile";
    tile.setAttribute("aria-expanded", "false");

    const tileNumber = document.createElement("span");
    tileNumber.className = "project-number";
    tileNumber.textContent = projectNumber.textContent.trim();

    const tileInfo = document.createElement("span");
    tileInfo.className = "project-tile-info";
    tileInfo.appendChild(projectTitle.cloneNode(true));

    if (projectCategory) {
        tileInfo.appendChild(projectCategory.cloneNode(true));
    }

    const tileAction = document.createElement("span");
    tileAction.className = "project-tile-action";
    tileAction.textContent = "View details";

    tile.append(tileNumber, tileInfo, tileAction);

    const details = document.createElement("div");
    details.className = "project-details";
    details.hidden = true;
    details.appendChild(projectInfo);

    project.replaceChildren(tile, details);
    project.classList.add("project-item");

    tile.addEventListener("click", () => {

        const isOpen = tile.getAttribute("aria-expanded") === "true";

        document.querySelectorAll(".project-tile").forEach(otherTile => {
            otherTile.setAttribute("aria-expanded", "false");
        });

        document.querySelectorAll(".project-details").forEach(otherDetails => {
            otherDetails.hidden = true;
        });

        tile.setAttribute("aria-expanded", String(!isOpen));
        details.hidden = isOpen;

    });

});


projectTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const target =
            tab.getAttribute("data-project");


        /*
         * Remove active state from all tabs
         */

        projectTabs.forEach(item => {

            item.classList.remove("active");

        });


        /*
         * Activate selected tab
         */

        tab.classList.add("active");


        /*
         * Hide all project categories
         */

        projectCategories.forEach(category => {

            category.classList.remove(
                "active-project"
            );

        });


        /*
         * Show selected category
         */

        const targetCategory =
            document.getElementById(target);


        targetCategory.classList.add(
            "active-project"
        );

    });

});


openSectionFromURL();