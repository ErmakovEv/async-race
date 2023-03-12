// import c from './cars';
// c.create('tesla', 'fff').catch(err => console.log(err));
// c.getCars().catch(err => console.log(err));
import App from "./view/app";
import "./style.css"

const app = new App('main-container', 'main-header', 'main-footer');
app.render();