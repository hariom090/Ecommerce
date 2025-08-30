import React from "react";
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import './style.css';
import Button from "@mui/material/Button";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
function valuetext(value) {
  return `${value}`;
}


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Sidebar =()=>{
      const [value, setValue] = React.useState([200, 600]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return (
        <div className="sidebar">
      <div className="card border-0 shadow">
        <h3>Category</h3>
        <div className="catList">
            <div className="catItem d-flex align-items-center">
                <h4 className="mb-0 ml-3 mr-3">Earings</h4>
                <span className="d-flex align-items-center justify-content-center rounded-circle ml-auto">30</span>
            </div>
            <div className="catItem d-flex align-items-center">
                <h4 className="mb-0 ml-3 mr-3">Earings</h4>
                <span className="d-flex align-items-center justify-content-center rounded-circle ml-auto">30</span>
            </div>
            <div className="catItem d-flex align-items-center">
                <h4 className="mb-0 ml-3 mr-3">Earings</h4>
                <span className="d-flex align-items-center justify-content-center rounded-circle ml-auto">30</span>
            </div>
            <div className="catItem d-flex align-items-center">
                <h4 className="mb-0 ml-3 mr-3">Earings</h4>
                <span className="d-flex align-items-center justify-content-center rounded-circle ml-auto">30</span>
            </div>
            <div className="catItem d-flex align-items-center">
                <h4 className="mb-0 ml-3 mr-3">Earings</h4>
                <span className="d-flex align-items-center justify-content-center rounded-circle ml-auto">30</span>
            </div>
        </div>
      </div>

   <div className="card border-0 shadow">
    <h3>Fill by price</h3>
     <Slider
     min={100}
     step={1}
     max={2000}
        getAriaLabel={() => 'Price range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        color="success"
      />

      <div className="d-flex pt-2 pb-2 priceRange">
        <span >From: <strong className="text-success">Rs.{value[0]}</strong></span>
        <span className="ml-auto" >From: <strong className="text-success">Rs.{value[1]}</strong></span>
      </div>

      <div className="filters">
        <h5>Colors</h5>
        <ul>
            <li><Checkbox {...label} color="success" defaultChecked />Red</li>
            <li><Checkbox {...label} defaultChecked color="success"/>Blue</li>
            <li><Checkbox {...label}color="success" defaultChecked />Green</li>
            <li><Checkbox {...label}color="success" defaultChecked />Red</li>
            <li><Checkbox {...label}color="success" defaultChecked />Blue</li>
            <li><Checkbox {...label}color="success" defaultChecked />Green</li>
            <li><Checkbox {...label}color="success" defaultChecked />Red</li>
            <li><Checkbox {...label}color="success" defaultChecked />Blue</li>
            <li><Checkbox {...label}color="success" defaultChecked />Green</li>
        </ul>
      </div>

         <div className="filters">
        <h5>Item condition</h5>
        <ul>
            <li><Checkbox {...label} color="success" defaultChecked />New</li>
            <li><Checkbox {...label} defaultChecked color="success"/>Old</li>
            <li><Checkbox {...label}color="success" defaultChecked />Refurbish</li>
        </ul>
      </div>

      <div className="btn "> <Button className="bg-g"><FilterAltIcon/>Filter</Button></div>
     
   </div>

   
        </div>
    )
}

export default Sidebar;