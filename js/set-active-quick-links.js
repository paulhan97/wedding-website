document.addEventListener('DOMContentLoaded', () => {
    let faqBlocks = document.querySelectorAll('.faq-block'),
        quickLinks = document.querySelectorAll('.quick-link');

    let options = {
        rootMargin: "0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
    }, makeActive = (entries, observer) => {
        entries.forEach((entry) => {
            let faqBlock = entry.target,
                index = Array.from(faqBlocks).indexOf(faqBlock);

            if (entry.intersectionRatio == 1) {
                quickLinks[index].classList.add('active');
            } else {
                quickLinks[index].classList.remove('active');
            }
        });
    }, observer = new IntersectionObserver(makeActive, options);

    faqBlocks.forEach((faqBlock) => {
        observer.observe(faqBlock);
    });

    document.querySelectorAll('.quick-link').forEach((quickLink) => {
        quickLink.addEventListener('click', (event) => {
            let target = event.target,
                quickLinks = document.querySelectorAll('.quick-link'),
                index = Array.from(quickLinks).indexOf(target),
                faqBlocks = document.querySelectorAll('.faq-block');
        
            faqBlocks[index].scrollIntoView(true);
        });
    });
});
