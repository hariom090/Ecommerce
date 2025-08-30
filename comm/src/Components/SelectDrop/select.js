import React, { useState } from "react";
import '../SelectDrop/select.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClickAwayListener from '@mui/material/ClickAwayListener';


const Select = ({data,placeholder}) => {

const [isOpenSearch,setisOpenSearch] = useState(false);
const [isCloseIndex,setisCloseIndex] = useState(0);
const [selectedItem,setselectedItem] = useState(placeholder);
const [originalData] = useState(data);
const [listData,setListData] = useState(data);


const openSelect=()=>{
    setisOpenSearch(!isOpenSearch);
    setListData(originalData);
}

const closeIndex=(index,item)=>{
    setselectedItem(item);
    setisCloseIndex(index);
    setisOpenSearch(false);
}
const filterList = (e) => {
    const keyword = e.target.value.toLowerCase();
    // console.log(keyword);
      if (!keyword.trim()) {
        setListData(originalData); // Reset if input is empty
        return;
    }

    const list = originalData.filter((item) => {
        return item.toLowerCase().includes(keyword);
    })
    console.log(list);
    setListData(list);
} 

    return (
        <><ClickAwayListener onClickAway={()=>setisOpenSearch(false)}>
            <div className="selectDrop cursor position-relative">
                <span className="openSelect" onClick={openSelect}>{selectedItem.length>14 ? selectedItem.substr(0,14) + '...':selectedItem}<ExpandMoreIcon className="arrow"/></span>
                
              {  
                isOpenSearch === true  &&
                <div className="selectDroop">
                    <div className="searchfield">
                        <input type="text" placeholder="Search here..." onChange={filterList}/>
                    </div>
                    <ul className="searchResult">
                        {/* <li key={0} onClick={()=>closeIndex(0,'All Categories')} className={`${isCloseIndex === 0 ? 'active' : ''}`}>All Categories</li> */}
                        {
                        listData.map((item,index) => {
                            return(
                                <li key={index} onClick={()=>closeIndex(index,item)} className={`${isCloseIndex === index ? 'active' : ''}`}>{item}</li>
                            )
                        })
                        }


                    </ul>
                </div>}
            </div>
</ClickAwayListener>

        </>
    )
}

export default Select