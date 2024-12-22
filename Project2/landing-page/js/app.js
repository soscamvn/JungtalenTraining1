
const mainContainer  = document.querySelector('main');  
const navbarList = document.getElementById('navbar__list');
const navbar = document.querySelector('.navbar__menu');

//add class active to section 2,3.
const section2 = document.querySelector('#section2')
const section3 = document.querySelector('#section3')
section2.classList.add('your-active-class');
section3.classList.add('your-active-class');

function addNewsection(id,navName,headerText, contentText1,contentText2){
    const newSection = document.createElement('section');
    newSection.id = id;
    newSection.setAttribute('data-nav',navName);
    newSection.classList.add('your-active-class')
    newSection.innerHTML = `
    <div class="landing__container">
        <h2>${headerText}</h2>
        <p>${contentText1}</p>
        <p>${contentText2}</p>
    </div>
    `;
    mainContainer.appendChild(newSection);

};

//Add section 4
addNewsection(
    'section4',
    'Section 4',
    'Section 4',
    'Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story.',
    'No matter which of these challenges is undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing.'
);
//Add section 5
addNewsection(
    'section5',
    'Section 5',
    'Section 5',
    'If you\'re looking for random paragraphs, you\'ve come to the right place. When a random word or a random sentence isn\'t quite enough, the next logical step is to find a random paragraph. We created the Random Paragraph Generator with you in mind. The process is quite simple. Choose the number of random paragraphs you\'d like to see and click the button. Your chosen number of paragraphs will instantly appear.',
    'While it may not be obvious to everyone, there are a number of reasons creating random paragraphs can be useful.'
);


// Build the navbar
const sectionsList = document.querySelectorAll('section');
function updateNavbar() {
    navbarList.innerHTML = ''; 
    sectionsList.forEach(section => {
      const sectionName = section.getAttribute('data-nav');
      const sectionId = section.getAttribute('id');
      const navItem = document.createElement('li');
      navItem.innerHTML = `<a href="#${sectionId}" class="menu__link">${sectionName}</a>`;
      navbarList.appendChild(navItem);
    });
    // handling Scroll
    document.querySelectorAll('.menu__link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetSectionId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetSectionId);
        targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest' 
        });
      });
    });
}
updateNavbar();
// Hiding navbar when Scroll stop 3s, Target navbar whenever user scroll down to section
function hideNavbar() {
    navbarList.classList.remove('navbar__list--visible');
    navbarList.classList.add('navbar__list--hidden');
}

function showNavbar() {
    navbarList.classList.remove('navbar__list--hidden');
    navbarList.classList.add('navbar__list--visible');
}
let scrollTimeout;
window.addEventListener('scroll', function() {
    const width = window.innerWidth;
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    if (width < 560) {
        return;
    }
    showNavbar();
    scrollTimeout = setTimeout(hideNavbar, 3000);
});


// Add class 'active' to section when near top of viewport
const observerOptions = {
    root: null,
    threshold: 0.65 
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        const link = document.querySelector(`a[href="#${entry.target.id}"]`);
        if (entry.isIntersecting) {

            entry.target.classList.add('active');
            link.classList.add('active');
        } else {
            entry.target.classList.remove('active');
            link.classList.remove('active');
        }
    });
};

const scanner = new IntersectionObserver(observerCallback, observerOptions);
sectionsList.forEach(section => {
    scanner.observe(section); 
});
//Scroll to top button
const ToTopButton = document.createElement('button');
ToTopButton.id = 'ToTopButton';
ToTopButton.innerHTML = '<p class = "up-text">Up!<\p>';
ToTopButton.classList.add('back-to-top');
document.body.appendChild(ToTopButton);
window.addEventListener('scroll', () => {
    if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
        ToTopButton.style.display = 'block';
    } else {
        ToTopButton.style.display = 'none';
    }
});
ToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// Build menu responsive

// Menu button
const MenuButton = document.createElement('button');
MenuButton.classList.add('menuList');
MenuButton.innerHTML = '&#9776;';
document.body.appendChild(MenuButton);

//Menu list when click on menu button
const dropdownMenu = document.createElement('div');
dropdownMenu.classList.add('dropdownMenu');
document.body.appendChild(dropdownMenu);
const originalParent = navbarList.parentNode;
const placeholder = document.createComment('Navbar Placeholder');
let timeout;

//set listioner for Menu Button
MenuButton.addEventListener('click', () => {
    dropdownMenu.classList.toggle('active');
    if (dropdownMenu.classList.contains('active')) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            dropdownMenu.classList.remove('active');
        }, 2000); 
    } else {
        clearTimeout(timeout);
    }
});
// Checking condition size screen for responsive changes
function checkScreenSize() {
    const width = window.innerWidth;
    if (width < 560) {
        if (!dropdownMenu.contains(navbarList)) {
            originalParent.replaceChild(placeholder, navbarList);
            dropdownMenu.appendChild(navbarList);
        }
        

        MenuButton.style.display = 'block';
        navbarList.style.removeProperty('display');
        ToTopButton.style.bottom = '20px';
        ToTopButton.style.right = '20px';
    }else {
        if (!originalParent.contains(navbarList)) {
            dropdownMenu.removeChild(navbarList);
            originalParent.replaceChild(navbarList, placeholder);
        }
        MenuButton.style.display = 'none';
        dropdownMenu.classList.remove('active'); 
        navbarList.style.display = 'block'; 
    }
}
checkScreenSize();
window.addEventListener('resize', checkScreenSize);
