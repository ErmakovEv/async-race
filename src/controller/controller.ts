import Model from '../model/model';
import Car from '../tipes/car';


export default class Controller {
    private model: Model;

    constructor() {
        this.model = new Model();
    }

    public async setCar(model: string, color: string): Promise<Car> {
        const car = await this.model.createCar(model, color);
        return car;
    }

    public async updCar(id: number, model: string, color: string): Promise<Car> {
        const car = await this.model.updateCar(id, model, color);
        return car;
    }

    public async delCar(id: number): Promise<Car> {
        const car = await this.model.deleteCar(id);
        return car;
    }

    public async handlerEngine(id: string, status: string) {
        return await this.model.control(id, status);
    }
    
    public async getCurrentContent(page: number) {
        const a = await this.model.getLen(page);
        return a;
    }

    public async getWinners(page?: number, limit?: number, sort?: string, order?: string) {
        const obj = await this.model.updWinners(page, limit, sort, order);
        return obj;
    }

    public createWinner(id: number, time: number) {
        const flag = this.model.winners.find(item => item.id === id);
        if(flag) {
            this.model.winners.forEach(item => {
                if(item.id === id) item.wins++;
                if(item.time > time) item.time = time;
            })
        }
        else {
            this.model.winners.push({
                id: id,
                wins: 1,
                time: time
            })
        }
        console.log(this.model.winners)
    }

    public getContentWinners() {
        return this.model.winners;
    }

}