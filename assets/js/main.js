const menuFix = document.querySelector('.site-nav__menu');
if(menuFix){
    menuFix.querySelector('.site-nav__menu--burger').addEventListener('click', () => {
        menuFix.querySelector('.menu').classList.toggle('open');
    })
}

