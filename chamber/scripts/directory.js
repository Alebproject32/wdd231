const memberListDiv = document.getElementById('memberList');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
const url = 'data/members.json';
let allMembers = [];
async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            allMembers = data;
            displayMembers(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching members:", error);
        memberListDiv.innerHTML = '<p class="error">Error loading member data.</p>';
    }
}
function displayMembers(members) {
    memberListDiv.innerHTML = '';
    memberListDiv.classList.remove('directory-list-view');
    memberListDiv.classList.add('directory-grid');
    members.forEach(member => {
        let card = document.createElement('div');
        card.classList.add('member-card');
        let name = document.createElement('h3');
        name.textContent = member.name;
        let image = document.createElement('img');
        image.src = `images/${member.image}`;
        image.alt = `Logo of ${member.name}`;
        image.loading = 'lazy';
        image.width = 150;
        image.height = 100;
        let address = document.createElement('p');
        address.textContent = member.address;
        let phone = document.createElement('p');
        phone.textContent = `Phone: ${member.phone}`;
        let website = document.createElement('p');
        let websiteLink = document.createElement('a');
        websiteLink.href = member.website;
        websiteLink.textContent = member.website;
        websiteLink.target = '_blank';
        website.appendChild(websiteLink);
        let membership = document.createElement('p');
        let membershipText = '';
        switch (member.membershipLevel) {
            case 1:
                membershipText = 'Membership: Member';
                break;
            case 2:
                membershipText = 'Membership: Silver';
                break;
            case 3:
                membershipText = 'Membership: Gold';
                break;
            default:
                membershipText = 'Membership: Unknown';
        }
        membership.textContent = membershipText;
        let description = document.createElement('p');
        description.textContent = member.description;
        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);
        card.appendChild(description);
        memberListDiv.appendChild(card);
    });
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
}
function displayList(members) {
    memberListDiv.innerHTML = '';
    memberListDiv.classList.remove('directory-grid');
    memberListDiv.classList.add('directory-list-view');
    members.forEach(member => {
        let listItem = document.createElement('div');
        listItem.classList.add('member-list-item');
        let name = document.createElement('h3');
        name.textContent = member.name;
        let image = document.createElement('img');
        image.src = `images/${member.image}`;
        image.alt = `Logo of ${member.name}`;
        image.loading = 'lazy';
        image.width = 80;
        image.height = 50;
        let details = document.createElement('div');
        details.classList.add('member-details');
        let address = document.createElement('p');
        address.textContent = `Address: ${member.address}`;
        let phone = document.createElement('p');
        phone.textContent = `Phone: ${member.phone}`;
        let website = document.createElement('p');
        let websiteLink = document.createElement('a');
        websiteLink.href = member.website;
        websiteLink.textContent = member.website;
        websiteLink.target = '_blank';
        website.appendChild(websiteLink);
        let membership = document.createElement('p');
        let membershipText = '';
        switch (member.membershipLevel) {
            case 1:
                membershipText = 'Membership: Member';
                break;
            case 2:
                membershipText = 'Membership: Silver';
                break;
            case 3:
                membershipText = 'Membership: Gold';
                break;
            default:
                membershipText = 'Membership: Unknown';
        }
        membership.textContent = membershipText;
        listItem.appendChild(image);
        details.appendChild(name);
        details.appendChild(address);
        details.appendChild(phone);
        details.appendChild(website);
        details.appendChild(membership);
        listItem.appendChild(details);
        memberListDiv.appendChild(listItem);
    });
    gridBtn.classList.remove('active');
    listBtn.classList.add('active');
}
gridBtn.addEventListener('click', () => {
    displayMembers(allMembers);
});
listBtn.addEventListener('click', () => {
    displayList(allMembers);
});
getMembers();