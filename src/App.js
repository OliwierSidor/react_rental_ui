import classes from "./App.module.css";
import AppHeader from "./components/header/AppHeader";
import AppFooter from "./components/footer/AppFooter";
import CarList from "./components/carlist/CarList";
import AppBody from "./body/AppBody";

function App() {
    return (
        <div className={classes.App}>
            <AppHeader/>
            <AppBody/>
            <AppFooter/>
        </div>
    );
}

export default App;
