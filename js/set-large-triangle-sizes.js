document.addEventListener('DOMContentLoaded', () => {
    sizeLargeArrows();
    window.addEventListener('resize', sizeLargeArrows);
});

function sizeLargeArrows() {
    let largeArrowFacingTopLeft = document.querySelector('#large-arrow-facing-top-left'),
        largeArrowFacingBottomRight = document.querySelector('#large-arrow-facing-bottom-right'),
        largeArrowFacingTopRight = document.querySelector('#large-arrow-facing-top-right');

    if (window.matchMedia('(min-width: 990px)').matches) {
        let banner = document.querySelector('.day-banner'),
            bannerHeight = banner.offsetHeight;

        largeArrowFacingTopLeft.style.borderLeft = bannerHeight + 'px solid #fff';
        largeArrowFacingTopLeft.style.borderRight = bannerHeight + 'px solid transparent';
        largeArrowFacingTopLeft.style.borderBottom = bannerHeight + 'px solid transparent';

        largeArrowFacingBottomRight.style.borderRight = bannerHeight + 'px solid #000';
        largeArrowFacingBottomRight.style.borderLeft = bannerHeight + 'px solid transparent';
        largeArrowFacingBottomRight.style.borderTop = bannerHeight + 'px solid transparent';

        largeArrowFacingTopRight.style.borderRight = bannerHeight + 'px solid #fff';
        largeArrowFacingTopRight.style.borderLeft = bannerHeight + 'px solid transparent';
        largeArrowFacingTopRight.style.borderBottom = bannerHeight + 'px solid transparent';
    } else {
        largeArrowFacingTopLeft.attributeStyleMap.clear();
        largeArrowFacingBottomRight.attributeStyleMap.clear();
        largeArrowFacingTopRight.attributeStyleMap.clear();
    }
}