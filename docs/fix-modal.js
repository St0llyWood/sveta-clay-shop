// fix-modal.js - финальное решение для модального окна
document.addEventListener('DOMContentLoaded', function() {
    console.log('Начинаем настройку модального окна...');
    
    // 1. Сначала удаляем все старые обработчики
    const oldModal = document.getElementById('order-modal');
    if (oldModal) {
        oldModal.parentNode.removeChild(oldModal);
    }
    
    // 2. Создаём новое чистое модальное окно
    const modalHTML = `
    <div id="fixed-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 99999;">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 30px; border-radius: 15px; max-width: 450px; width: 90%;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="color: #E9967A; margin: 0;" id="modal-title">Заказать изделие</h3>
                <button id="modal-close" style="background: none; border: none; font-size: 28px; cursor: pointer; color: #E9967A; line-height: 1;">×</button>
            </div>
            
            <p style="margin-bottom: 20px; color: #666;">Выберите способ связи:</p>
            
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <a href="mailto:matvey.s1307@gmail.com" 
                   style="background: #FFF5EE; padding: 12px; border-radius: 8px; text-decoration: none; color: #8B4513; text-align: center; font-weight: 500;">
                    📧 Написать на email
                </a>
                
                <a href="https://wa.me/79201350041" 
                   style="background: #25D366; color: white; padding: 12px; border-radius: 8px; text-decoration: none; text-align: center; font-weight: 500;">
                    💬 Написать в WhatsApp
                </a>
                
                <a href="tel:+79201350041" 
                   style="background: #FFB6C1; color: white; padding: 12px; border-radius: 8px; text-decoration: none; text-align: center; font-weight: 500;">
                    📞 Позвонить сейчас
                </a>
            </div>
            
            <p style="margin-top: 20px; font-size: 14px; color: #888; text-align: center;">
                Отвечаю в течение часа (10:00-20:00)
            </p>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('fixed-modal');
    const closeBtn = document.getElementById('modal-close');
    
    // 3. Простые функции открытия/закрытия
    function openModal(productName) {
        console.log('Открываем модальное окно для:', productName);
        
        if (productName && productName !== 'изделие') {
            document.getElementById('modal-title').textContent = `Заказать "${productName}"`;
        } else {
            document.getElementById('modal-title').textContent = 'Заказать изделие';
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        console.log('Закрываем модальное окно');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // 4. Вешаем ОДИН обработчик закрытия
    closeBtn.onclick = function(e) {
        console.log('Клик по крестику');
        e.stopPropagation();
        closeModal();
    };
    
    // Закрытие по клику на фон
    modal.onclick = function(e) {
        console.log('Клик по фону, target:', e.target);
        if (e.target === modal) {
            closeModal();
        }
    };
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // 5. Вешаем обработчики на кнопки "Заказать"
    console.log('Ищем кнопки "Заказать"...');
    
    // Способ 1: Прямое назначение
    document.querySelectorAll('.order-product-btn').forEach(btn => {
        // Удаляем все старые обработчики
        btn.replaceWith(btn.cloneNode(true));
    });
    
    // Назначаем новые обработчики
    document.querySelectorAll('.order-product-btn').forEach(btn => {
        btn.onclick = function(e) {
            console.log('Клик по кнопке товара');
            e.preventDefault();
            e.stopPropagation();
            const productName = this.getAttribute('data-product') || 'изделие';
            openModal(productName);
            return false;
        };
    });
    
    // Кнопка в хедере
    const headerBtn = document.querySelector('a.order-button');
    if (headerBtn) {
        headerBtn.onclick = function(e) {
            console.log('Клик по кнопке в хедере');
            e.preventDefault();
            e.stopPropagation();
            openModal('изделие');
            return false;
        };
    }
    
    console.log('Настройка завершена. Найдено кнопок:', document.querySelectorAll('.order-product-btn').length);
});