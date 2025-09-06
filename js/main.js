const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*menu show*/
/*validate if constant exists*/
if(navToggle){
  navToggle.addEventListener('click', () =>{
    navMenu.classList.add('show-menu')
  })
}

/*menu hidden*/
/*validate if constant exists*/
if(navClose){
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

/*remove menu mobile*/
const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
  const navMenu = document.getElementById('nav-menu')
  //when click on each nav_link, it removes the show-menu class
  navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction))

/*ACCORDION SKILLS*/
const skillsContent = document.getElementsByClassName('skills_content'),
      skillsHeader = document.querySelectorAll('.skills_header')

function toggleSkills() {
  const clickedSkill = this.parentNode;

  // If the clicked skill is already open, close it
  if (clickedSkill.classList.contains('skills_open')) {
    clickedSkill.classList.remove('skills_open');
    clickedSkill.classList.add('skills_close');
    return;
  }

  // Close other open skills
  for (let i = 0; i < skillsContent.length; i++) {
    const skill = skillsContent[i].parentNode;
    
    if (skill !== clickedSkill && skill.classList.contains('skills_open')) {
      skill.classList.remove('skills_open');
      skill.classList.add('skills_close');
    }
  }

  // Open the clicked skill
  clickedSkill.classList.remove('skills_close');
  clickedSkill.classList.add('skills_open');
}

skillsHeader.forEach((el) => {
  el.addEventListener('click', toggleSkills)
});

/*Qualification Tabs*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
  tab.addEventListener('click', () =>{
    const target = document.querySelector(tab.dataset.target)

    tabContents.forEach(tabContent =>{
      tabContent.classList.remove('qualification_active')
    })
    target.classList.add('qualification_active')

    tabs.forEach(tab =>{
      tab.classList.remove('qualification_active')
    })
    tab.classList.add('qualification_active')

  })
})

/*Social Section Active Link*/
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id]');

  function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute('id');

      const link = document.querySelector(`.nav_menu a[href*=${sectionId}]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    });
  }

  window.addEventListener('scroll', scrollActive);
});

/*Change background header*/
function scrollHeader(){
  const nav = document.getElementById('header')

  // when the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
  if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}

window.addEventListener('scroll', scrollHeader)

/*Scroll Up*/
function scrollUp(){
  const scrollUp = document.getElementById('scroll-up');
  if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}

window.addEventListener('scroll', scrollUp)

/*Dark theme Color*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

if(selectedTheme){
  document.body.classList[selectedTheme == 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon == 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () =>{
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)

  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icom', getCurrentIcon())
})

// Remove the message from URL when the page loads
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href.split('?')[0]);
}

function removeMessage() {
  var messageElement = document.getElementById('message-status');
  if (messageElement) {
      messageElement.remove();
  }
}

/** Theme Color and Scroll**/
const colorSwitcher = document.querySelector(".color-switcher");
const aboutSection = document.getElementById("about");

const setThemeColor = () => document.documentElement.style.setProperty('--hue-color', localStorage.getItem('themeColor') || '340');
const checkScroll = () => colorSwitcher.classList.toggle('hidden', window.scrollY >= aboutSection.offsetTop);

setThemeColor();
checkScroll(); // Initial check

window.addEventListener("scroll", checkScroll);

document.querySelector('.switcher-btn').onclick = () => colorSwitcher.classList.toggle('active');

document.querySelectorAll('.theme-buttons').forEach(color => color.addEventListener('click', () => {
  const dataColor = color.getAttribute('data-color');
  document.documentElement.style.setProperty('--hue-color', dataColor);
  localStorage.setItem('themeColor', dataColor);
}));

/** Load More **/
let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 3;

loadMoreBtn.onclick = () => {
  let boxes = [...document.querySelectorAll('.certifications_content')];
  for (var i = currentItem; i < Math.min(currentItem + 3, boxes.length); i++) {
    boxes[i].style.display = 'inline';
  }
  currentItem += 3;

  if (currentItem >= boxes.length) {
    loadMoreBtn.style.display = 'none';
  }
}

/*Home Name Text Animation*/
var words = ['Roma', 'a Developer'],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 70;
var wordflick = function () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    }
    else {
      if (offset == 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      }
      else {
        offset--;
      }
    }
    $('.word').text(part);
  },speed);
};

$(document).ready(function () {
  wordflick();
});