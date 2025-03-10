document.addEventListener('DOMContentLoaded', async () => {
    // Year and Date
    const currentYearSpan = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;

    const lastModifiedElement = document.getElementById('lastModified');
    lastModifiedElement.textContent = "Last Modified: " + document.lastModified;

    // Members Directory
    const members = await getMembers();
    let isGrid = true;

    displayMembers(members, isGrid);

    const toggleButton = document.getElementById('view-toggle');
    toggleButton.addEventListener('click', () => {
        isGrid = !isGrid;
        displayMembers(members, isGrid);
        toggleButton.textContent = isGrid ? "List View" : "Grid View";
    });

});

async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();
        return members;
    } catch (error) {
        console.error("Error fetching members:", error);
        const memberGrid = document.getElementById('member-grid');
        memberGrid.innerHTML = "<p>Error loading member data. Please try again later.</p>";
        return [];
    }
}

function displayMembers(members, isGrid) {
    const memberGrid = document.getElementById('member-grid');
    const memberList = document.getElementById('member-list');

    memberGrid.innerHTML = '';
    memberList.innerHTML = '';

    if (isGrid) {
        memberGrid.style.display = 'grid';
        memberList.style.display = 'none';

        const fragment = document.createDocumentFragment();

        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('member-card');
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} Logo" onerror="this.src='placeholder.png'">
                <div class="card-content">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>Phone: ${member.phone}</p>
                    <a href="${member.website}" target="_blank">Website</a>
                    <p>Membership: ${member.membershipLevel}</p>
                    ${member.otherInfo ? `<p>${member.otherInfo}</p>` : ''}
                </div>
            `;
            fragment.appendChild(card);
        });

        memberGrid.appendChild(fragment);
    } else {
        memberGrid.style.display = 'none';
        memberList.style.display = 'block';

        const fragment = document.createDocumentFragment();

        members.forEach(member => {
            const listItem = document.createElement('div');
            listItem.classList.add('member-list-item');
            listItem.innerHTML = `
                <img src="${member.image}" alt="${member.name} Logo" onerror="this.src='placeholder.png'">
                <h3>${member.name}</h3>
                <p>${member.address} | ${member.phone} | <a href="${member.website}" target="_blank">Website</a> | Membership: ${member.membershipLevel} ${member.otherInfo ? `| ${member.otherInfo}` : ''}</p>
            `;
            fragment.appendChild(listItem);
        });

        memberList.appendChild(fragment);
    }
}

