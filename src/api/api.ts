interface RequestParams {
  method: string;
  data?: unknown;
}

export class Api {
  private url = 'http://127.0.0.1:3000';

  protected async request<T>(path: string, params: RequestParams, query?: string) : Promise<T> {
      query = query ? '?' + query : '';
      const res = await fetch(this.url + path + query, {
        method: params.method,
        body: params.data ? this.stringify(params.data) : null,
        headers: {
          'Content-type': 'application/json',
        },
      });
      try {
        const json = await res.json() as T;
        return json;
      } catch (error) {
        console.log('Err!!!', error);
        return Promise.reject(error);
      }
  }
  
  private stringify(data: unknown): string {
    return JSON.stringify(data);
  }
}

