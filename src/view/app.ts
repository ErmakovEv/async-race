import Page from "../templates/page";
import GarageView from "./garage";
import WinnersView from "./table";
import Controller from "../controller/controller";

export default class App extends Page {
    private garagePage: GarageView;
    private winnersPage: WinnersView;
    private controller: Controller;
    constructor(containerName: string, headerName: string, footerName: string ) {
        super(containerName, headerName, footerName)
        this.controller = new Controller();
        this.garagePage = new GarageView('garage-container', this.controller);
        this.winnersPage = new WinnersView('winners-container', this.controller);
        this.extendHeader();
    }

    private extendHeader() {
        const btnGarage = document.createElement('button');
        btnGarage.classList.add('button-garage');
        btnGarage.textContent = 'Garage';
        btnGarage.addEventListener('click', () => {
            console.log('button-garage');
            this.garagePage.onVisibility()
            this.winnersPage.offVisibility();
        })
        const btnWinners = document.createElement('button');
        btnWinners.classList.add('button-winners');
        btnWinners.textContent = 'Winners';
        btnWinners.addEventListener('click', () => {
            void this.winnersPage.render();
            this.winnersPage.onVisibility();
            this.garagePage.offVisibility()
        })
        this.header.append(btnGarage, btnWinners);
    }

    public async render() {
        this.container.append(this.garagePage.render(), await this.winnersPage.render());
        this.winnersPage.offVisibility();
        document.body.append(this.header, this.container);
    } 
}