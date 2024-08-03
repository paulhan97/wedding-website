document.addEventListener('DOMContentLoaded', () => {
    bannerButtons();
    window.addEventListener('resize', bannerButtons);
});

function bannerButtons() {
    if (window.matchMedia('(max-width: 990px)').matches) {
        let dayMarkers = document.querySelectorAll('.day-marker');

        let markerOne = dayMarkers[0],
            markerTwo = dayMarkers[1],
            markerThree = dayMarkers[2];
        
        let dayBlocks = document.querySelectorAll('.day-block');

        let dayOne = dayBlocks[0],
            dayTwo = dayBlocks[1],
            dayThree = dayBlocks[2];

        markerOne.addEventListener('click', () => {
            dayOne.scrollIntoView(true);
        });
        markerTwo.addEventListener('click', () => {
            dayTwo.scrollIntoView(true);
        });
        markerThree.addEventListener('click', () => {
            dayThree.scrollIntoView(true);
        });
    }
}