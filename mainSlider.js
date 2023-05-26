let images = [
    {
        url: "./img/image-home.jpg",
        alt: "ROSTOV-ON-DON, ADMIRAL"
    },
    {
        url: "./img/image-projects.jpg",
        alt: "SOCHI THIEVES"
    },
    {
        url: "./img/image_2023-05-09_12-59-04.png",
        alt: "ROSTOV-ON-DON PATRIOTIC"
    }
];
function initSlider(options = null) {

    options = options || {
        tabs: true,
        laps: true,
        autoplay: true,
        autoplayInterval: 10000
    };

    let sliderImages = document.querySelector(".sliderImages")
    let sliderLaps = document.querySelector(".sliderLaps")
    let sliderArrows = document.querySelector(".sliderArrows")
    let sliderTabs = document.querySelector(".sliderTabs")

    function initImages() {
        images.forEach(function (image, index) {
            let img = `<img alt="${image.alt}" src="${image.url}" class=" slider_image hidden ${index === 0 ? 'active' : ''}" data-index="${index}">`

            sliderImages.innerHTML += img
        })
    }

    function initLaps() {
        images.forEach(function (image, index) {
            let lap = `<div class="lap gray ${index === 0 ? 'white' : ''}" data-index="${index}"></div>`

            sliderLaps.innerHTML += lap
        })


        sliderLaps.querySelectorAll('.lap').forEach(function (lap) {
            lap.addEventListener("click", function () {
                moveSlider(this.dataset.index)
            })
        })
    }

    function initTabs() {
        images.forEach(function (image, index) {
            let tab = `<div class="tab tabsGray ${index === 0 ? 'tabsBeige' : ''}" data-index="${index}">${image.alt}</div>`

            sliderTabs.innerHTML += tab
        })

        sliderTabs.querySelectorAll('.tab').forEach(function (tab) {
            tab.addEventListener("click", function () {
                moveSlider(this.dataset.index)
            })
        })
    }

    function initArrows() {
        sliderArrows.querySelectorAll('button').forEach(function (arrow) {
            arrow.addEventListener("click", function () {
                if (arrow.classList.contains("left")) {
                    prevSlider()
                } else {
                    nextSlider()
                }
            });
        });
    }

    initImages()
    initLaps()
    initArrows()
    initTabs()
    if (options.autoplay) {
        initAutoplay();
    }

    function prevSlider() {
        let curNumber = +sliderImages.querySelector('.active').dataset.index;
        let nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;

        moveSlider(nextNumber)
    }

    function nextSlider() {
        let curNumber = +sliderImages.querySelector('.active').dataset.index;
        let nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;

        moveSlider(nextNumber)
    }

    function moveSlider(nextNumber) {
        sliderImages.querySelector('.active').classList.remove("active");
        sliderImages.querySelector(`[data-index="${nextNumber}"]`).classList.add("active");
        if (options.laps) {
            sliderLaps.querySelector('.white').classList.remove("white");
            sliderLaps.querySelector(`[data-index="${nextNumber}"]`).classList.add("white");
        }
        if (options.tabs) {
            sliderTabs.querySelector('.tabsBeige').classList.remove("tabsBeige");
            sliderTabs.querySelector(`[data-index="${nextNumber}"]`).classList.add("tabsBeige");
        }
    }

    function initAutoplay() {
        setInterval(() => {
            nextSlider();
        }, options.autoplayInterval);
    }
}

const options = {
    tabs: true,
    laps: true,
    autoplay: true,
    autoplayInterval: 10000
}

initSlider(options)