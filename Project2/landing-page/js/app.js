/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
 * 
*/
const mainContainer  = document.querySelector('main');  
const navbarList = document.getElementById('navbar__list');
const navbar = document.querySelector('.navbar__menu');
const section2 = document.querySelector('#section2')
const section3 = document.querySelector('#section3')
section2.classList.add('your-active-class');
section3.classList.add('your-active-class');


//Add section 4

const newSection = document.createElement('section');
newSection.id = 'section4';
newSection.setAttribute('data-nav', 'Section 4');
newSection.classList.add('your-active-class');
newSection.innerHTML = `
  <div class="landing__container">
    <h2>Section 4</h2>
    <p>Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges. The writer can use the paragraph as the first one of a short story and build upon it. A second option is to use the random paragraph somewhere in a short story they create. The third option is to have the random paragraph be the ending paragraph in a short story. </p>
    <p>No matter which of these challenges is undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing.</p>
    </div>
`;
mainContainer.appendChild(newSection);
//Add section 5
const newSection2 = document.createElement('section');
newSection2.id = 'section5';
newSection2.setAttribute('data-nav', 'Section 5');
newSection2.classList.add('your-active-class');
newSection2.innerHTML = `
  <div class="landing__container">
    <h2>Section 5</h2>
    <p>If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough, the next logical step is to find a random paragraph. We created the Random Paragraph Generator with you in mind. The process is quite simple. Choose the number of random paragraphs you'd like to see and click the button. Your chosen number of paragraphs will instantly appear.</p>
    <p>While it may not be obvious to everyone, there are a number of reasons creating random paragraphs can be useful. A few examples of how some people use this generator are listed in the following paragraphs.</p>
    </div>
`;
mainContainer.appendChild(newSection2);


/**
 * CSS 
*/
Object.assign(navbarList.style,{
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '0',
});


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const sections_list = document.querySelectorAll('section');
function updateNavbar() {
    navbarList.innerHTML = ''; 
    const sections_list = document.querySelectorAll('section');
    sections_list.forEach(section => {
      const sectionName = section.getAttribute('data-nav');
      const sectionId = section.getAttribute('id');
      const navItem = document.createElement('li');
      navItem.innerHTML = `<a href="#${sectionId}" class="menu__link">${sectionName}</a>`;
      navbarList.appendChild(navItem);
    });

    document.querySelectorAll('.menu__link').forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const sectionId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(sectionId);
        targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest' 
        });
      });
    });
}
updateNavbar();
// Hiding navbar, Target navbar
function hideNavbar(){
    Object.assign(navbarList.style,{
        transform:'translateY(-100%)',
        opacity: '0',
        height: '0',
        transition: 'transition: transform 0.3s ease, opacity 0.3s ease'
    });
}
function showNavbar() {
    Object.assign(navbarList.style,{
        transform:'translateY(0)',
        opacity: '1',
        height: 'auto',
        transition: 'transition: transform 0.3s ease, opacity 0.3s ease'
    });
}
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
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
            link.style.backgroundColor = 'black';
            link.style.color = 'white'; 
        } else {
            entry.target.classList.remove('active');
            link.classList.remove('active');
            link.style.backgroundColor = ''; 
            link.style.color = ''; 
        }
    });
};

const scanner = new IntersectionObserver(observerCallback, observerOptions);
sections_list.forEach(section => {
    scanner.observe(section); 
});
//Scroll to top button
const ToTopButton = document.createElement('button');
ToTopButton.id = 'ToTopButton';
ToTopButton.innerHTML = '<p class = "up-text">Up!<\p>';
ToTopButton.classList.add('back-to-top');
document.body.appendChild(ToTopButton);
const style = document.createElement('style');
style.innerHTML = `
    .back-to-top {
        position: fixed;
        bottom: 40px;
        right: 40px;
        background-color: white;
        color: white;
        border: none;
        border-radius: 50%; 
        font-size: 15px;
        cursor: pointer;
        display: none;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
        padding: 20px; 
        width: 60px; 
        height: 60px;
        line-height: 20px; 
    }

    .up-text {
        color: black;
        font-weight: bold;
        margin: 0;
        font-size: 16px; 
    }
`;
document.head.appendChild(style);
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
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu responsive

function checkScreenSize() {
    const width = window.innerWidth;
    if (width < 560) {
        const MenuButton = document.createElement('button');
        MenuButton.classList.add('menuList');
        MenuButton.innerHTML = '&#9776;';
        document.body.appendChild(MenuButton);

        const dropdownMenu = document.createElement('div');
        dropdownMenu.classList.add('dropdownMenu');
        dropdownMenu.appendChild(navbarList);
        document.body.appendChild(dropdownMenu);
        const style1 = document.createElement('style');
        style1.innerHTML = `
            .menuList {
                position: fixed;
                top: 100px;
                right: 20px;
                background-color: white;
                color: black;
                border: none;
                display: block;
                border-radius: 50%; 
                font-size: 25px;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                text-align: center;
                padding: 20px; 
                width: 60px; 
                height: 60px;
                line-height: 20px; 
            }
            .menuList.active {
                display: block; 
            }
            .dropdownMenu {
                position: fixed;
                top: 160px;
                right: 20px;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                padding: 10px;
                z-index: 1000;
                display: none; 
            }
            .dropdownMenu.active {
                display: block;
            }
            .dropdownMenu ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .dropdownMenu li {
                margin: 5px 0;
            }
            .dropdownMenu a {
                text-decoration: none;
                color: black;
                font-size: 14px;
            }
        `;
        document.head.appendChild(style1);
        MenuButton.addEventListener('click', () => {
            dropdownMenu.classList.toggle('active');
        });

        MenuButton.style.display = 'block';
        navbarList.style.removeProperty('display');
        ToTopButton.style.bottom = '20px';
        ToTopButton.style.right = '20px';
    }else {
        MenuButton.style.display = 'none';
        dropdownMenu.classList.remove('active'); 
        navbarList.style.display = 'block'; 
    }
}
window.addEventListener('resize', checkScreenSize);
// Scroll to section on link click

// Set sections as active