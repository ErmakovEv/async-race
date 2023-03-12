
export default abstract class Page {
    protected container: HTMLElement;
    protected header: HTMLElement;
    protected footer: HTMLElement;

    constructor(containerName = 'container',
                headerName?: string,
                footerName?: string
    ) {

        this.container = this.createContainer([containerName]);
        if(headerName) this.header = this.createHeader([headerName]);
        if(footerName) this.footer = this.createFooter([footerName]);
    }

    private createHeader(classNames: string[]) {
        const header = document.createElement('div');
        header.classList.add(...classNames)
        return header;
    }

    private createContainer(classNames: string[]) {
        const container = document.createElement('div');
        container.classList.add(...classNames);
        return container;
    }

    private createFooter(classNames: string[]) {
        const footer = document.createElement('div');
        footer.classList.add(...classNames)
        return footer;
    }

    public offVisibility() {
        this.container.style.display = 'none';
    }

    public onVisibility() {
        this.container.style.display = 'block';
    }

}