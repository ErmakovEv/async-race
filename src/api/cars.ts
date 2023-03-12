import Car from "../tipes/car";
import { Api } from "./api";

class CarsApi extends Api {
  public path: "/garage";

  public create(name: string, color: string) {
    return this.request<Car>("/garage", {
      method: "POST",
      data: {
        name,
        color,
      },
    });
  }

  public update(id: number, name: string, color: string) {
    return this.request<Car>(`/garage/${id}`, {
      method: "PUT",
      data: {
        name,
        color,
      },
    });
  }

  public delete(id: number) {
    return this.request<Car>(`/garage/${id}`, {
      method: "DELETE",
    });
  }

  public getCars() {
    return this.request<Car[]>("/garage", { method: "GET" });
  }

  public getCar(id: number) {
    const path = `/garage/${id}`;
    return this.request<Car[]>(path, { method: "GET" });
  }

  public controlCar(id: string, status: string) {
    const path = "/engine";
    const query = this.createQuery(id, status);
    const data = this.request<Record<string, number>>(
      path,
      { method: "PATCH" },
      query
    );
    return data;
  }

  private createQuery(id: string, status: string) {
    const search = new URLSearchParams();
    search.set("id", id);
    search.set("status", status);
    return search.toString();
  }
}

export default new CarsApi();
