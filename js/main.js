/* =========================================================
   INSIGHTBRIDGE ANALYTICS — MAIN JAVASCRIPT
   ========================================================= */


/* ---------------------------------------------------------
   Mobile navigation toggle
   --------------------------------------------------------- */

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const primaryNavigation = document.querySelector('#primary-navigation');

if (mobileMenuToggle && primaryNavigation) {

    mobileMenuToggle.addEventListener('click', () => {

        const isOpen = primaryNavigation.classList.toggle('is-open');

        mobileMenuToggle.setAttribute(
            'aria-expanded',
            isOpen ? 'true' : 'false'
        );

        mobileMenuToggle.setAttribute(
            'aria-label',
            isOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
        );
    });


    /* -----------------------------------------------------
       Close menu after selecting a navigation link
       ----------------------------------------------------- */

    const navigationLinks =
        primaryNavigation.querySelectorAll('a');

    navigationLinks.forEach((link) => {

        link.addEventListener('click', () => {

            primaryNavigation.classList.remove('is-open');

            mobileMenuToggle.setAttribute(
                'aria-expanded',
                'false'
            );

            mobileMenuToggle.setAttribute(
                'aria-label',
                'Open navigation menu'
            );
        });
    });
}

/* =========================================================
   CURRENT SECTION HIGHLIGHTING
   ========================================================= */


/* ---------------------------------------------------------
   Navigation links and target sections
   --------------------------------------------------------- */

const sectionNavigationLinks = document.querySelectorAll(
    '.site-navigation a[href^="#"]'
);

const pageSections = document.querySelectorAll(
    'main > section[id]'
);


/* ---------------------------------------------------------
   Apply active navigation state
   --------------------------------------------------------- */

function setActiveNavigation(sectionId) {

    sectionNavigationLinks.forEach((link) => {

        const targetId = link.getAttribute('href');

        if (targetId === `#${sectionId}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}


/* ---------------------------------------------------------
   Determine current section
   --------------------------------------------------------- */

function updateCurrentSection() {

    if (pageSections.length === 0) {
        return;
    }

    const header = document.querySelector('#site-header');

    const headerHeight = header
        ? header.offsetHeight
        : 0;

    /*
       Detection point:
       just below the sticky header plus part of the viewport.
    */

    const detectionPoint =
        window.scrollY +
        headerHeight +
        (window.innerHeight * 0.20);

    let currentSectionId = pageSections[0].id;

    pageSections.forEach((section) => {

        if (section.offsetTop <= detectionPoint) {
            currentSectionId = section.id;
        }
    });


    /*
       When the visitor reaches the bottom of the page,
       ensure the final section becomes active.
    */

    const nearPageBottom =
        window.innerHeight + window.scrollY
        >= document.documentElement.scrollHeight - 2;

    if (nearPageBottom) {
        currentSectionId =
            pageSections[pageSections.length - 1].id;
    }

    setActiveNavigation(currentSectionId);
}


/* ---------------------------------------------------------
   Update on load, scroll and resize
   --------------------------------------------------------- */

if (pageSections.length > 0 && sectionNavigationLinks.length > 0) {

    updateCurrentSection();

    window.addEventListener(
        'scroll',
        updateCurrentSection,
        { passive: true }
    );

    window.addEventListener(
        'resize',
        updateCurrentSection
    );
}