(() => {
    let cardsArr = [];
    let firstCard = null;
    let secondCard = null;
    let timer = false;
    let end = 0;
    let timerId;
    let counter;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

            // поменять элементы местами
            // мы используем для этого синтаксис "деструктурирующее присваивание"
            // подробнее о нём - в следующих главах
            // то же самое можно записать как:
            // let t = array[i]; array[i] = array[j]; array[j] = t
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('start').addEventListener('click', () => {
            cardsArr = [];
            let num = document.getElementById('cardCount').value;
            if (isNaN(num) || num < 2 || num > 10) {
                num = 4;

            };

            const wid = (800 / num) - (10 * num);

            counter = 1;
            /*Инициация массива */
            for (let i = 0; i < num * 2; i++) {


                cardsArr.push(counter);
                if ((i - 1) % 2 === 0) {
                    counter++;

                }
            }
            /*перемешивание массива */
            shuffle(cardsArr);

            const ul = document.querySelector('.cards__list');
            for (let i = 0; i < num * 2; i++) {


                let li = document.createElement('li');
                let button = document.createElement('button');
                button.classList.add('cards__item-shirt');
                ul.appendChild(li);
                li.appendChild(button);

                button.style.width = wid + 'px';
                button.style.height = wid + 'px';
                li.classList.add('cards__content');

                button.setAttribute('data-num', `${cardsArr[i]}`);
                button.innerText = button.dataset.num;
                button.classList.remove('cards__item-shirt');
                button.classList.add('cards__item-face');


                button.addEventListener('click', () => {
                    if (!button.classList.contains('disabled') && !timer) {
                        button.innerText = button.dataset.num;
                        button.classList.remove('cards__item-shirt');
                        button.classList.add('cards__item-face');

                        if (!firstCard) {
                            firstCard = button;

                        } else {
                            if (firstCard.dataset.num === button.dataset.num) {
                                firstCard.classList.add('disabled');
                                button.classList.add('disabled');
                                firstCard = null;
                                end++;
                                if (end == (num * num / 2)) {
                                    console.log(button.dataset.num);
                                    button.innerText = button.dataset.num;
                                    button.classList.remove('cards__item-shirt');
                                    button.classList.add('cards__item-face');
                                    document.querySelector('.gameEnd').classList.remove('hide');


                                    end = 0;
                                }
                            } else {
                                button.innerText = button.dataset.num;
                                button.classList.remove('cards__item-shirt');
                                button.classList.add('cards__item-face');
                                secondCard = button;
                                timer = true;
                                setTimeout(clearCard, 1000);

                            }
                        }

                    }
                });
            }

            const cards = document.querySelector('.cards');
            cards.classList.remove('hide');
            const timeBlock = document.querySelector('.downCounter');
            timeBlock.classList.remove('hide');
            console.log(timeBlock.classList);
            document.getElementById('form').classList.add('hide');
            /*оставить карточки на 10 секунд и скрыть
             */
            let interval = 5;

            function whatsTime() {
                document.getElementById('sek').innerText = interval;

                if (interval === 0) {
                    clearInterval(timerId);
                    /*перевернем карточки рубашками вверх */
                    document.querySelectorAll('.cards__item-face').forEach((el) => {
                        el.classList.remove('cards__item-face');
                        el.classList.add('cards__item-shirt');
                        el.innerText = '';
                    });
                    timeBlock.classList.add('hide');

                }
                interval--;
            }
            timerId = setInterval(whatsTime, 1000);
        });
        /*ф-ия начать заново */
        document.querySelector('.card__btn').addEventListener('click', () => {
            endGame();
            clearInterval(timerId);
            const timeBlock = document.querySelector('.downCounter');
            timeBlock.classList.add('hide');
            counter = 1;
        });

        /*ф-ия начать заново */
        document.querySelector('.card__btn2').addEventListener('click', () => {
            endGame();
            clearInterval(timerId);
            const timeBlock = document.querySelector('.downCounter');
            timeBlock.classList.add('hide');
            counter = 1;
        })

    });

    function clearCard() {
        if (firstCard) {
            firstCard.textContent = "";
            firstCard.classList.add('cards__item-shirt');
            firstCard.classList.remove('cards__item-face');
            firstCard = null;
        };
        if (secondCard) {
            secondCard.textContent = "";
            secondCard.classList.add('cards__item-shirt');
            secondCard.classList.remove('cards__item-face');
            secondCard = null;
        }
        timer = false;

    }

    function endGame() {
        clearCard();
        document.querySelector('.cards').classList.add('hide');
        document.getElementById('form').classList.remove('hide');
        const parent = document.querySelector(".cards__list");
        while (parent.firstChild) {
            parent.firstChild.remove();
        };
        document.querySelector('.gameEnd').classList.add('hide');

    }

})();