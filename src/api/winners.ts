import Winner from "../tipes/winner";
import { Api } from "./api";

class WinnersApi extends Api {

  public create(id: number, wins: number, time: number) {
    return this.request<Winner>('/winners', {
      method: 'POST',
      data: {
        id,
        wins,
        time,
      },
    });
  }

  public getWinners(page?: number, limit?: number, sort?: string, order?: string) {
    const path = '/winners';
    const query = this.createQuery(page, limit, sort, order);
    const data = this.request<Winner[]>(path, {method: 'GET'}, query);
    return data;
  }

  public getWinner(id: number) {
    const path = `/winners/${id}`;
    return this.request<Winner[]>(path, {method: 'GET'});
  }

  public updateWinner(id:number, name: string, color: string) {
    return this.request<Winner>(`/winners/${id}`, {
      method: 'PUT',
      data: {
        name,
        color,
      },
    });
  }

  public deleteWinner(id:number) {
    return this.request<Winner>(`/winners/${id}`, {
      method: 'DELETE'
    });
  }

  private createQuery(_page?: number, _limit?: number, _sort?: string, _order?: string){
    const search = new URLSearchParams();
    if(_page) {
      search.set('_page', _page.toString());
    }
    if(_limit) {
      search.set('_limit', _limit.toString());
    }
    if(_sort) {
      search.set('_sort', _sort);
    }
    if(_order) {
      search.set('_order', _order);
    }

    return search.toString()
  }

}

export default new WinnersApi();


