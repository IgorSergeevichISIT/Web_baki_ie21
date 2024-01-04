const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const accessToken = 'vk1.a.43IcdjSQz912CqOxHTbXmnhSq9Hk2sVZ2bU4zO51Trull8M8f5SUOKt2OyTH0GjgALhtqj_QPNPIvW02V8L3djDQrg4gtQvfvSOKJDdLG1QnTWoojJaIB0L_RBV4yib9xHUfXL5209whbqOji7OL37C4oppOCps65rZb6C64tn7TMpgD_VBDxOl1lRwXata9DAjm1Ev4xSyibdIlu4bOzw';
let peerID = 2000000001
let conversationMembers = null;

async function fetchData(peerId) {
    if (!peerId || isNaN(peerId)) {
        throw new Error('Некорректный peerId');
    }

    try {
        const response = await axios.get('https://api.vk.com/method/messages.getConversationMembers', {
            params: {
                peer_id: peerID,
                fields: 'photo_400_orig',
                access_token: accessToken,
                v: '5.131'
            }
        });
        conversationMembers = response.data;
    } catch (error) {
        throw new Error('Ошибка при получении данных: ' + error.message);
    }
}

app.post('/get-members', async (req, res) => {
    try {
        await fetchData(peerID);
        res.json(conversationMembers || {});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/update-members', async (req, res) => {
    try {
        const peerId = parseInt(req.query.peerId);
        await fetchData(peerId);
        res.send('Данные обновлены для peerId: ' + peerId);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/delete-user/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);

    // Проверяем, существует ли пользователь
    const userIndex = conversationMembers.findIndex(member => member.id === userId);

    if (userIndex !== -1) {
        // Удаляем пользователя из массива
        conversationMembers.splice(userIndex, 1);
        res.send(`Пользователь с ID ${userId} успешно удален.`);
    } else {
        res.status(404).send('Пользователь не найден');
    }
});

app.get('/update-peer', (req, res) => {
    peerID = (peerID === 2000000001) ? 2000000002 : 2000000001;
    res.send('Peer ID обновлён на: ' + peerID);
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
