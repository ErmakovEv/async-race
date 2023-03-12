import Page from "../templates/page";
import createImgCar from "../templates/carHTML";
import createImgRoad from "../templates/roadHTML";
import createViewElem from "../templates/createrHTML";
import Car from "../tipes/car";
import Controller from "../controller/controller";

export default class GarageView extends Page {
    private carsHTMLcontainer: HTMLElement;
    private inputName: HTMLInputElement;
    private inputColor: HTMLInputElement;
    private totalTitle: HTMLHeadingElement;
    private pageNumberTitle: HTMLHeadingElement;
    private currPage = 0;
    private btnCreateCar: HTMLButtonElement;
    private btnRace: HTMLButtonElement;
    private btnReset: HTMLButtonElement;
    private btnPrev: HTMLButtonElement;
    private btnNext: HTMLButtonElement;
    private popUp: HTMLElement;
    private controller: Controller;
    

    private content: { len: number, cars: Car[] }

    constructor(containerName: string, controller: Controller) {
        super(containerName)
        this.controller = controller;
        this.popUp = document.createElement('div');
        this.popUp.classList.add('wrap');
        this.extendContainer();
    }

    private extendContainer() {
        this.carsHTMLcontainer = document.createElement('div');
        this.carsHTMLcontainer.classList.add('cars-html-container');

        this.inputName = document.createElement('input');
        this.inputName.classList.add('input-name');

        this.inputColor = document.createElement('input');
        this.inputColor.classList.add('input-color');
        this.inputColor.setAttribute('type', 'color');

        this.totalTitle = document.createElement('h2');
        this.totalTitle.classList.add('total-title');

        this.pageNumberTitle = document.createElement('h2');
        this.pageNumberTitle.classList.add('page-number');

        this.btnCreateCar = createViewElem(
            'button',
            ['button-create'],
            '',
            "Create new car",
            ['click', async () => {
                const car = await this.controller.setCar(this.inputName.value, this.inputColor.value);
                const ans = await this.controller.getCurrentContent(this.currPage);
                this.inputName.value = '';
                this.inputColor.value = '#000000';
                this.totalTitle.textContent = `Cars in garage: ${ans.len}`;
                if (this.carsHTMLcontainer.childNodes.length < 5) {
                    this.createHTMLCar(car);
                    await this.updCurrentContent();
                }
            }]
        )

        this.btnRace = createViewElem(
            'button',
            ['button-race'],
            '',
            'Race'
        )

        this.btnReset = createViewElem(
            'button',
            ['button-reset'],
            '',
            'Reset'
        );

        this.btnPrev = createViewElem(
            'button',
            ['button-prev'],
            '',
            'Prev',
            ['click', async () => {
                this.pageNumberTitle.textContent = (--this.currPage).toString();
                await this.updCurrentContent();
            }]
        );

        this.btnNext = createViewElem(
            'button',
            ['button-next'],
            '',
            'Next',
            ['click', async () => {
                this.pageNumberTitle.textContent = (++this.currPage).toString();
                await this.updCurrentContent();
            }]
        );

        this.updCurrentContent().catch(err => console.log(err));
        this.container.append(
            this.btnRace, this.btnReset,
            this.btnCreateCar,
            this.inputName,
            this.inputColor,
            this.totalTitle,
            this.pageNumberTitle,
            this.carsHTMLcontainer,
            this.btnPrev,
            this.btnNext
        );

    }

    private async test(cars: Car[]) {
        const res = cars.map(car => this.preparationDrive(car));
        return await Promise.all(res);
    }

    private async updCurrentContent() {
        this.content = await this.controller.getCurrentContent(this.currPage);
        this.pageNumberTitle.textContent = `Page: ${this.currPage + 1}`;
        this.totalTitle.textContent = `Cars in garage: ${this.content.len}`;
        const len = this.carsHTMLcontainer.childNodes.length;
        for (let i = 0; i < len; i++) {
            this.carsHTMLcontainer.removeChild(this.carsHTMLcontainer.childNodes[0]);
        }

        this.content.cars.forEach(car => { this.createHTMLCar(car) });
        this.btnRace.onclick = async () => {
            const arr = this.carsHTMLcontainer.querySelectorAll('.car-container');
            let winnerFlag = true;
            const arrData: Record<string, number>[] = await this.test(this.content.cars);
            arr.forEach(async (item, index) => {
                const btnA = item.querySelector('.button-A');
                const btnB = item.querySelector('.button-B');
                const carsHTML = item.querySelector('.car');
                const ans = await this.animationCar(carsHTML as HTMLElement, this.content.cars[index], arrData[index], btnA as HTMLButtonElement, btnB as HTMLButtonElement);
                if(winnerFlag && ans.status === 'ok') {
                    const modal = document.createElement('h1');
                    modal.classList.add('modal');
                    modal.textContent = `WINNER ${ans.name} with time ${(ans.time/1000).toFixed(2)} sec!!!`
                    this.popUp.append(modal);
                    document.body.append(this.popUp)
                    setTimeout(() => {
                        this.popUp.innerHTML = '';
                        this.popUp.remove()}, 3000);
                    winnerFlag = false;
                    this.controller.createWinner(ans.id, ans.time);     
                }
                console.log('ans', ans);
            })
        }

        if (this.currPage === 0) {
            this.btnPrev.disabled = true;
        } else {
            this.btnPrev.disabled = false;
        }
        // console.log(this.content.len)
        // if (this.content.len < 6) {
        //     this.btnNext.disabled = true;
        // } else {
        //     this.btnNext.disabled = false;
        // }
    }

    private createHTMLCar(car: Car) {
        const carHTMLcontainer = document.createElement('div');
        carHTMLcontainer.classList.add('car-container');
        carHTMLcontainer.id = 'car-container' + car.id.toString();
        carHTMLcontainer.innerHTML = `<h2 class="title-car-container">${car.name}</h2>`;

        const selectName = document.createElement('input');
        selectName.classList.add('select-name');

        const selectColor = document.createElement('input');
        selectColor.classList.add('select-color');
        selectColor.setAttribute('type', 'color');
        const btnUpdCar = createViewElem(
            'button',
            ['button-update'],
            '',
            "Update car",
            ['click', async () => {
                await this.controller.updCar(car.id, selectName.value, selectColor.value);
                this.inputName.value = '';
                this.inputColor.value = '#000000';
                await this.updCurrentContent();
            }]
        )
        const btnDelCar = createViewElem(
            'button',
            ['button-delete'],
            '',
            "Delete car",
            ['click', async () => {
                await this.controller.delCar(car.id);
                await this.updCurrentContent();
            }]
        )
        const carHTML = createImgCar(car.color);
        carHTML.id = car.id.toString();
        const road = createImgRoad();
        this.carsHTMLcontainer.append(carHTMLcontainer);
        const controlContainer = document.createElement('div');
        const btnA = createViewElem(
            'button',
            ['button', 'button-A'],
            `btn-A-${car.id}`,
            'A',
            ['click', async () => {
                const data = await this.preparationDrive(car);
                await this.animationCar(carHTML, car, data, btnA, btnB);
            }],
        );
        const btnB = createViewElem(
            'button',
            ['button', 'button-B'],
            `btn-B-${car.id}`,
            'B'
        );
        controlContainer.append(btnA, btnB,)
        carHTMLcontainer.append(btnUpdCar, selectName, selectColor, btnDelCar, controlContainer, carHTML, road);
        btnB.setAttribute('disabled', 'true');
    }

    private async preparationDrive(car: Car) {
        const data =  await this.controller.handlerEngine(car.id.toString(), 'started');
        return data;
    }

    private async animationCar(carHTML: HTMLElement, car: Car, data: Record<string, number>, btnA: HTMLButtonElement, btnB: HTMLButtonElement) {
        let ans: { id: number, name: string, time: number, status: string };
        btnB.disabled = false;
        btnA.disabled = true;
        // const data = await this.controller.handlerEngine(car.id.toString(), 'started');
        const delta = 150;
        const frame = (document.documentElement.clientWidth - 195) / delta;
        const time = data.distance / data.velocity;
        const interval = time / delta;
        let curX = 0;

        const intervalID = setInterval(() => {
            curX += frame;
            if (curX >= document.documentElement.clientWidth - 200) {
                clearInterval(intervalID);
            }
            carHTML.style.transform = `translateX(${curX}px)`
        }, interval);

        btnB.addEventListener('click', () => {
            clearInterval(intervalID)
            carHTML.style.transform = `translateX(0px)`;
            btnB.disabled = true;
            btnA.disabled = false;
        });

        this.btnReset.addEventListener('click', () => {
            clearInterval(intervalID)
            carHTML.style.transform = `translateX(0px)`;
            btnB.disabled = true;
            btnA.disabled = false;
        });

        // this.controller.handlerEngine(car.id.toString(), 'drive')
        //     .then((data) => {
        //         ans = {id: car.id, time: time, status: 'ok'}
        //     })
        //     .catch(() => {
        //         clearInterval(intervalID);
        //         ans = {id: car.id, time: 0, status: 'fail'}
        //     });
        try {
            await this.controller.handlerEngine(car.id.toString(), 'drive');
            ans = {id: car.id, name: car.name, time: time, status: 'ok'}
            return ans
        } catch (error) {
            clearInterval(intervalID);
            ans = { id: car.id, name: car.name, time: 0, status: 'fail' }
            return ans
        }
        return ans;
    }

    public render() {
        return this.container;
    }
}