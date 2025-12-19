// static/js/force-reload.js
(function() {
    // Принудительно обновляем стили при каждой загрузке
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
        const url = new URL(link.href);
        url.searchParams.set('v', Date.now());
        link.href = url.toString();
    });
    
    // Принудительно обновляем скрипты
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
        const url = new URL(script.src);
        url.searchParams.set('v', Date.now());
        script.src = url.toString();
    });
    
    console.log('Force reload applied');
})();