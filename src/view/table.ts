import Page from "../templates/page";
import Controller from "../controller/controller";

export default class WinnersView extends Page {
    private totalTitle: HTMLElement;
    private table: HTMLElement;
    private thead: HTMLElement;
    private tbody: HTMLElement;
    private controller: Controller;

    constructor(containerName: string, controller: Controller) {
        super(containerName)
        this.controller = controller;

        this.totalTitle = document.createElement('h1');

        this.table = document.createElement('table');
        this.thead = document.createElement('thead');
        this.tbody = document.createElement('tbody');

        this.table.append(this.thead, this.tbody)

        const row_1 = document.createElement('tr');

        const heading_1 = document.createElement('th');
        heading_1.innerHTML = "No.";
        const heading_2 = document.createElement('th');
        heading_2.innerHTML = "Name";
        const heading_3 = document.createElement('th');
        heading_3.innerHTML = "Wins";
        const heading_4 = document.createElement('th');
        heading_4.innerHTML = "Best time";


        row_1.append(heading_1, heading_2, heading_3, heading_4);
        this.thead.append(row_1);

        this.container.append(this.totalTitle, this.table)


        // // Creating and adding data to second row of the table
        // const row_2 = document.createElement('tr');
        // const row_2_data_1 = document.createElement('td');
        // row_2_data_1.innerHTML = "1.";
        // const row_2_data_2 = document.createElement('td');
        // row_2_data_2.innerHTML = "James Clerk";
        // const row_2_data_3 = document.createElement('td');
        // row_2_data_3.innerHTML = "Netflix";

        // row_2.appendChild(row_2_data_1);
        // row_2.appendChild(row_2_data_2);
        // row_2.appendChild(row_2_data_3);
        // tbody.appendChild(row_2);


        // // Creating and adding data to third row of the table
        // let row_3 = document.createElement('tr');
        // let row_3_data_1 = document.createElement('td');
        // row_3_data_1.innerHTML = "2.";
        // let row_3_data_2 = document.createElement('td');
        // row_3_data_2.innerHTML = "Adam White";
        // let row_3_data_3 = document.createElement('td');
        // row_3_data_3.innerHTML = "Microsoft";

        // row_3.appendChild(row_3_data_1);
        // row_3.appendChild(row_3_data_2);
        // row_3.appendChild(row_3_data_3);
        // tbody.appendChild(row_3);

    }

    public async render() {
        const arr = this.controller.getContentWinners();
        const content = await this.controller.getCurrentContent(-1);
        this.tbody.innerHTML = ''

        arr.forEach((item, index) => {
            let name: string;
            content.cars.forEach(car => {
                if(car.id === item.id) {
                    name = car.name;
                }
            })

            const row_2 = document.createElement('tr');
            const row_2_data_1 = document.createElement('td');
            row_2_data_1.innerHTML = `${index + 1}`;
            const row_2_data_2 = document.createElement('td');
            row_2_data_2.innerHTML = name;
            const row_2_data_3 = document.createElement('td');
            row_2_data_3.innerHTML = `${item.wins}`;
            const row_2_data_4 = document.createElement('td');
            row_2_data_4.innerHTML = `${item.time}`;

            row_2.append(row_2_data_1, row_2_data_2, row_2_data_3, row_2_data_4);
            this.tbody.append(row_2);
        })

        return this.container;
    }

}