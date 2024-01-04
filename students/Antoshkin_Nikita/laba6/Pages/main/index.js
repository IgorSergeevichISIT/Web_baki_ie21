import {ProductCardComponent} from "../../Components/product-card/index.js";
import {ajax} from "../../modules/ajax.js";
import {urls} from "../../modules/urls.js";
import {peerId1, peerId2} from "../../modules/consts.js";
import {ProductPage} from "../products/index.js";



export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentPeerId = peerId1;
        
    }
    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }
    renderData(items) {
        // Очищаем контейнер перед отображением новых карточек
        if (this.productCardsContainer) {
            this.productCardsContainer.innerHTML = '';
        } else {
            this.productCardsContainer = document.createElement('div');
            this.productCardsContainer.id = 'product-cards-container';
            this.productCardsContainer.classList.add('d-flex', 'flex-wrap');
            this.pageRoot.appendChild(this.productCardsContainer);
            productCard.cardElement.classList.add('mr-3');
        }

        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.productCardsContainer);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
    updateDataWithPeerId(peerId) {
        ajax.post(urls.getConversationMembers2(peerId), (data) => {
            this.renderData(data.response.profiles);
        });
    }
    togglePeerId() {
        ajax.get(urls.GetUpdatePeer())
        this.updateDataWithPeerId(this.currentPeerId);
    }
    ePeerId() {
        this.updateDataWithPeerId(this.currentPeerId);
    }
    getData() {
        ajax.post(urls.getConversationMembers2(), (data) => {
            console.log(urls.getConversationMembers2())
            this.renderData(data.response.profiles)
        })
    }
    clickCard(e) {
        const cardId = e.target.dataset.id
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }
    
    render() {
        
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // Добавляем кнопку для переключения между peerId
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Переключить ID';
        toggleButton.classList.add('toggle-button');
        toggleButton.addEventListener('click', () => {
            this.togglePeerId();
        });
        const refresh = document.createElement('button');
        refresh.textContent = 'Востановить';
        refresh.classList.add('refresh-button');
        refresh.addEventListener('click', () => {
            this.ePeerId();
        });
        this.parent.appendChild(refresh);
        this.parent.appendChild(toggleButton);
        this.getData();
    }
    
}