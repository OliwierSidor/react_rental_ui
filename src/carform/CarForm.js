import React, {useState} from 'react';
import classes from "./CarForm.module.css";
import Card from "../card/Card";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Send} from "@mui/icons-material";
import connection from "../axios/axios";
import Notification from "../notification/Notification";
import {useNavigate} from 'react-router-dom';

const DEFAULT_CAR_FROM_VALUES = {
    name: "",
    brand: "",
    productionDate: "2000-01-01",
    carBody: "SUV",
    seats: "1",
    gearbox: "AUTO",
    capacityEngine: 2.0

}

const CarForm = () => {
    const [car, setCar] = useState({...DEFAULT_CAR_FROM_VALUES});
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    const updateCarValue = (event, fieldName) => {
        car[fieldName] = event.target.value;

        const carCopy = {...car}

        setCar(carCopy)

    }

    const clearForm = () => {
        const carCopy = {...DEFAULT_CAR_FROM_VALUES}
        setCar(carCopy)
    }

    const submitForm = () => {
        connection.post("/api/car/add", car)
            .then((response) => {
               if(response.status === 201 ){
                navigate("/cars")
               }
            })
            .catch((errorResponse) => {
                setNotification("Error adding car: " + errorResponse)
            })
        if (notification != null) {
            setTimeout(() => {
                console.log("Timer zakończył prace")
                setNotification(null);
            }, 5000)
        }
    }
    return (
        <div className={classes.CarForm}>
            <Card cardTitle={"Add Car From"}>
                <Grid container>
                    <Grid item xs={12} className={classes.FormItem}>
                        <TextField onChange={(event) => {
                            updateCarValue(event, "name")
                        }} value={car.name} label={"Name:"}
                                   variant={"filled"}></TextField>
                    </Grid>
                    <Grid item xs={12} className={classes.FormItem}>
                        <TextField onChange={(event) => {
                            updateCarValue(event, "brand")
                        }} value={car.make} label={"Brand:"} variant={"filled"}></TextField>
                    </Grid>
                    <Grid item xs={12} className={classes.FormItem}>
                        <TextField onChange={(event) => {
                            updateCarValue(event, "productionDate")
                        }} value={car.productionDate} type={"date"} label={"Production date:"}
                                   variant={"filled"}></TextField>
                    </Grid>
                    <Grid item xs={12} className={classes.FormItem}>
                        <FormControl>
                            <InputLabel variant={"filled"}>Body type:</InputLabel>
                            <Select onChange={(event) => {
                                updateCarValue(event, "carBody")
                            }} value={car.carBody} label={"Body type"} variant={"filled"}>
                                <MenuItem value={"SUV"}>SUV</MenuItem>
                                <MenuItem value={"CABRIO"}>Cabrio</MenuItem>
                                <MenuItem value={"SEDAN"}>Sedan</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.FormItem}>
                        <FormControl fullWidth>
                            <InputLabel id={"gearbox"} variant={"filled"}>Gearbox:</InputLabel>
                            <Select onChange={(event) => {
                                updateCarValue(event, "gearbox")
                            }} value={car.gearbox} labelId={"gearbox"} label={"Gearbox:"} variant={"filled"}>
                                <MenuItem value={"AUTO"}>Automatic</MenuItem>
                                <MenuItem value={"MANUAL"}>Manual</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.FormItem}>
                        <TextField onChange={(event) => {
                            updateCarValue(event, "seats")
                        }} value={car.seats} type={"number"} inputProps={{min: "1"}} label={"Seats:"}
                                   variant={"filled"}></TextField>
                    </Grid>
                    <Grid item xs={12} className={classes.FormItem}>
                        <TextField onChange={(event) => {
                            updateCarValue(event, "capacityEngine")
                        }} value={car.capacityEngine} type={"number"} inputProps={{step: "0.01", min: "0.1"}}
                                   label={"Engine capacity:"}
                                   variant={"filled"}></TextField>
                    </Grid>
                    <Grid container className={classes.FormButtonPanel}>
                        <Grid xs={2}>
                            <Button className={classes.FormButtonClear} variant={"contained"} onClick={clearForm}>
                                Clear
                            </Button>
                        </Grid>
                        <Grid xs={8}></Grid>
                        <Grid xs={2}>
                            <Button className={classes.FormButtonSubmit} variant={"contained"} onClick={submitForm}
                                    endIcon={<Send/>}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
            <Notification>{notification}</Notification>
        </div>
    );
};

export default CarForm;
