// start: Popper
const popperInstance = {}
document.querySelectorAll('.dropdown').forEach(function (item, i) {
    const id = 'popper-' + i
    const toggle = item.querySelector('.dropdown-toggle')
    const menu = item.querySelector('.dropdown-menu')
    if (toggle && menu) {
        item.dataset.popperId = id
        popperInstance[id] = Popper.createPopper(toggle, menu, {
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                    },
                },
                {
                    name: 'preventOverflow',
                    options: {
                        padding: 16,
                    },
                },
            ],
            placement: 'bottom-end'
        })
    }
})
document.addEventListener('click', function (e) {
    const toggle = e.target.closest('.dropdown-toggle')
    const menu = e.target.closest('.dropdown-menu')
    if (toggle) {
        const dropdown = toggle.closest('.dropdown')
        if (dropdown) {
            const id = dropdown.dataset.popperId
            if (id) {
                if (dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active')
                    hidePopper(popperInstance[id])
                } else {
                    hideDropdown()
                    dropdown.classList.add('active')
                    showPopper(popperInstance[id])
                }
            }
        }
    } else if (!menu) {
        hideDropdown()
    }
})

function hideDropdown() {
    document.querySelectorAll('.dropdown.active').forEach(function (item) {
        const id = item.dataset.popperId
        if (id) {
            item.classList.remove('active')
            hidePopper(popperInstance[id])
        }
    })
}
function showPopper(popper) {
    popper.setOptions(function (options) {
        return {
            ...options,
            modifiers: [
                ...options.modifiers,
                {
                    name: 'eventListeners',
                    enabled: true
                }
            ]
        }
    })
    popper.update()
}
function hidePopper(popper) {
    popper.setOptions(function (options) {
        return {
            ...options,
            modifiers: [
                ...options.modifiers,
                {
                    name: 'eventListeners',
                    enabled: false
                }
            ]
        }
    })
}
// end: Popper



// start: Swiper
const swiper = new Swiper('.swiper', {
    slidesPerView: 'auto',
    spaceBetween: 12
});
// end: Swiper



// start: Sidebar
const sidebarToggle = document.querySelector('.sidebar-toggle')
const sidebar = document.querySelector('.sidebar')
const sidebarOverlay = document.querySelector('.sidebar-overlay')
sidebarToggle.addEventListener('click', function(e) {
    e.preventDefault()
    sidebar.classList.add('active')
    sidebarOverlay.classList.add('active')
    document.body.classList.add('overflow-hidden')
})
sidebarOverlay.addEventListener('click', function(e) {
    e.preventDefault()
    sidebar.classList.remove('active')
    sidebarOverlay.classList.remove('active')
    document.body.classList.remove('overflow-hidden')
})
// end: Sidebar