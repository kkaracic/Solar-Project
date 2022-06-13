const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const ProjectModel = new Schema({
    Project_name: string,
    Investor: string,
    Location: string,
    Location_coordinates: string,
    Annual_consumption: Number,
    Inverter_type: string,
    Number_of_inverters: Number,
    Maximum_output_power: Number,
    Solar_panel_type: string,
    Number_of_strings: Number,
    Annual_production: Number,
})
