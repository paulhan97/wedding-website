document.addEventListener('DOMContentLoaded', () => {
    let dayBlocks = document.querySelectorAll('.day-block');

    let dayOne = dayBlocks[0],
        dayTwo = dayBlocks[1],
        dayThree = dayBlocks[2];

    let options = {
        rootMargin: "0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
    }, makeActive = (entries, observer) => {
        entries.forEach((entry) => {
            let dayBlock = entry.target;

            if (entry.intersectionRatio >= 0.75) {
                dayBlock.classList.add('active');
            } else {
                dayBlock.classList.remove('active');
            }
        });
    }, observer = new IntersectionObserver(makeActive, options);

    observer.observe(dayOne);
    observer.observe(dayTwo);
    observer.observe(dayThree);
});