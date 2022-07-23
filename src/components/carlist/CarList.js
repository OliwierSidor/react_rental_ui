import React, {useEffect, useState} from 'react';
import classes from './CarList.module.css';
import {Button, Grid, IconButton} from "@mui/material";
import connection from "../../axios/axios";
import Card from "../../card/Card";
import Notification from "../../notification/Notification";
import {Link} from "react-router-dom";
import {ControlPoint} from "@mui/icons-material";

const CarList = () => {

    const [carList, setCarList] = useState([]);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        connection.get("/api/car/list")
            .then((response) => {
                console.log("OK! ")
                console.log(response)
                setCarList(response.data)
            }).catch((errorResponse) => {
            console.log("Error:" + errorResponse)
        });
    }, []);

    const functionClickDelete = (paramId) => {
        connection.delete("/api/car/delete/" + paramId)
            .then((response) => {
                setNotification("Car has been deleted!")

                console.log("Usunięto! ")
                for (var i = 0; i < carList.length; i++) {
                    if (carList[i] === paramId) {
                        carList.splice(i, 1)
                    }
                }
                const carListCopy = [...carList];
                setCarList(carListCopy)
            })
            .catch((errorResponse) => {
                setNotification("Unable to remove car")
            })
        console.log("Wywołano usuń - parametr id: " + paramId)
    }
    if (notification != null) {
        setTimeout(() => {
            console.log("Timer zakończył prace")
            setNotification(null);
        }, 5000)
    }

    return (
        <div className={classes.CarList}>
            <div className={classes.PlusButtonAlignedRight}>
            <Link to={"/cars/form"}>
                <IconButton className={classes.PlusButtonCollor}>
                    <ControlPoint/>
                </IconButton>
            </Link>
            </div>
            <Card cardTitle={"Cars for rent"}>
                <Grid container direction={"row"}>
                    <Grid container className={classes.TableHeader}>
                        <Grid item xs={2}>Id</Grid>
                        <Grid item xs={2}>Name</Grid>
                        <Grid item xs={2}>Make</Grid>
                        <Grid item xs={2}>Body Type</Grid>
                        <Grid item xs={2}>Gearbox</Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                    {
                        carList.map((elementListy) => {
                            return (<Grid key={elementListy.carId} container className={classes.TableRow}>
                                <Grid item xs={2}>{elementListy.carId}</Grid>
                                <Grid item xs={2}>{elementListy.name}</Grid>
                                <Grid item xs={2}>{elementListy.make}</Grid>
                                <Grid item xs={2}>{elementListy.bodyType}</Grid>
                                <Grid item xs={2}>{elementListy.carGearBox}</Grid>
                                <Grid item xs={2}>
                                    <Button variant="contained" color="inherit" onClick={() => {
                                        functionClickDelete(elementListy.carId)
                                    }}>
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>)
                        })
                    }
                </Grid>
            </Card>
            <Notification>{notification}</Notification>
        </div>
    );
};

export default CarList;
