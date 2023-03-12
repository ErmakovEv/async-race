import carApi from '../api/cars';
import winnerApi from '../api/winners'
import Car from '../tipes/car';
import Winner from '../tipes/winner';

export default class Model {
  private garage: Car[];
  public winners: Winner[] = [];
  private len = 0;
  private carApi = carApi;
  private winnerApi = winnerApi;

  constructor() {
    this.updGarage().catch(err => console.log(err));
    this.updWinners().catch(err => console.log(err));
  }

  public async updWinners(page?: number, limit?: number, sort?: string, order?: string) {
    try {
      const data = await this.winnerApi.getWinners(page, limit, sort, order);
      // this.winners = data;
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  }

  public async createWinner(id: number, wins: number, time: number) {
    const car = await this.winnerApi.create(id, wins, time);
    await this.updWinners();
    return car;
  }

  public async updateWinner(id:number, name: string, color: string) {
    const winner = await this.winnerApi.updateWinner(id, name, color);
    await this.updWinners();
    return winner;
  }

  public async deleteWinner(id: number) {
    const winner = await this.winnerApi.deleteWinner(id);
    await this.updWinners();
    return winner;
  }


  private async updGarage() {
    try {
      const data = await this.carApi.getCars();
      this.garage = data;
      this.len = this.garage.length;
    } catch (error) {
      console.error(error);
    }
  }

  public async createCar(model: string, color: string) {
    const car = await this.carApi.create(model, color);
    await this.updGarage();
    return car;
  }

  public async updateCar(id: number, model: string, color: string) {
    const car = await this.carApi.update(id, model, color);
    await this.updGarage();
    return car;
  }

  public async deleteCar(id: number) {
    const car = await this.carApi.delete(id);
    await this.updGarage();
    return car;
  }

  public async control(id: string, status: string) {
    return await this.carApi.controlCar(id, status);
  }

  public async getLen(page: number) {
    await this.updGarage();
    let currCars: Car[];
    if((page + 1) * 5 > this.len - 1) {
      currCars = this.garage.slice(page * 5)
    } else if(page === -1)
    {
      currCars = this.garage;
    } else {
      currCars = this.garage.slice(page* 5, (page + 1) * 5);
    }
    return {"len": this.len, "cars": currCars};
  }

}