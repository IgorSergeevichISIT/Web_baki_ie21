export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
        
    }
    getHTML(data) {
    return (
        `
            <div class="card" id="Card-id-${data.id}" style="width: 300px;">
            <button class="btn btn-primary" id="click-cards-${data.id}">X</button>
                <img class="card-img-top" src="${data.photo_400_orig}" alt="картинка">
                <div class="card-body">
                    <h5 class="card-title">${data.first_name} ${data.last_name}</h5>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Нажми на меня</button>
                </div>
            </div>
        `
    )
}
    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }
    addListeners1(data, listener) {
        const cardId = `Card-id-${data.id}`;
    const buttonId = `click-cards-${data.id}`;
    const cardElement = document.getElementById(cardId);
    const deleteButton = document.getElementById(buttonId);

    if (cardElement && deleteButton) {
        deleteButton.addEventListener("click", () => {
            cardElement.remove();
            // Добавьте здесь код для выполнения других действий после удаления карточки, если необходимо
        });
    }
    }
    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
        this.addListeners1(data, listener)
    }
}