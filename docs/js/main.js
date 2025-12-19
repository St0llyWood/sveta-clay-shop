// Модальное окно для заказа
function openOrderModal(productName) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
    `;
    
    const productTitle = productName || 'изделие';
    
    modal.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 15px; max-width: 500px; width: 90%; position: relative;">
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #E9967A;">
                ×
            </button>
            
            <h3 style="color: #E9967A; margin-bottom: 1rem;">Заказать "${productTitle}"</h3>
            <p style="margin-bottom: 2rem; color: #666;">
                Чтобы заказать, свяжитесь удобным способом:
            </p>
            
            <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
                <a href="mailto:matvey.s1307@gmail.com?subject=Заказ с сайта Цветик" 
                   style="background: #FFF5EE; padding: 1rem; border-radius: 10px; text-decoration: none; color: #8B4513; display: flex; align-items: center; gap: 10px;">
                    📧 Написать на email
                </a>
                
                <a href="https://wa.me/79201350041?text=Здравствуйте! Хочу заказать изделие с сайта Цветик" 
                   style="background: #25D366; color: white; padding: 1rem; border-radius: 10px; text-decoration: none; display: flex; align-items: center; gap: 10px;">
                    💬 Написать в WhatsApp
                </a>
                
                <a href="tel:+79201350041" 
                   style="background: #FFB6C1; color: white; padding: 1rem; border-radius: 10px; text-decoration: none; display: flex; align-items: center; gap: 10px;">
                    📞 Позвонить сейчас
                </a>
            </div>
            
            <p style="font-size: 0.9rem; color: #888; text-align: center;">
                Отвечаю в течение часа с 10:00 до 20:00
            </p>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Добавляем обработчики для всех кнопок "Заказать"
document.addEventListener('DOMContentLoaded', function() {
    // Кнопка в хедере
    document.querySelector('.order-button').addEventListener('click', function(e) {
        e.preventDefault();
        openOrderModal();
    });
    
    // Кнопки на товарах
    document.querySelectorAll('.product-button').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.href.includes('/products/')) return; // Это ссылка на страницу товара
            
            e.preventDefault();
            const productName = this.closest('.product-card, .product-item')?.querySelector('.product-title, .product-name')?.textContent || 'изделие';
            openOrderModal(productName);
        });
    });
});