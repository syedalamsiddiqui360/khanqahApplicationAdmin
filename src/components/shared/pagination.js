
import React, { useState, useEffect } from 'react';
import { Table , Button, Pagination } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Paginate(props) {
    const{isUpdate , setIsUpdate , handleData ,offset , setOffset, count , limit} = props;

    useEffect(() => {
    }, [isUpdate])
    
    const handleFirst = () => {
        setOffset(0);
        setIsUpdate(!isUpdate);
    }

    const handleLast = () => {
        setOffset(Math.floor(count/limit) * limit);
        setIsUpdate(!isUpdate);
    }

    const handleCurrent = (index) => {
        setOffset(limit*index)
        setIsUpdate(!isUpdate);
    }

    const handlePrev = () => {
        setOffset(offset-limit);
        setIsUpdate(!isUpdate);
    }

    const handleNext = () => {
        setOffset(offset+limit);
        setIsUpdate(!isUpdate);
    }

    return (
        <div >
            <Pagination>
                <Pagination.First disabled = {offset - limit < 0 ? true : false}  onClick={handleFirst} />
                <Pagination.Prev disabled = {offset - limit < 0 ? true : false} onClick={handlePrev} />
                 {
                     new Array(Math.ceil(count/limit)).fill("").map((value , index)=>{
                         return (<Pagination.Item active={Math.ceil(offset/limit) == index ? true : false} onClick={()=>handleCurrent(index)} >{index+1}</Pagination.Item>)
                     })
                 }
                {/* {Math.ceil(count/limit) > 2 && (
                    <Pagination.Ellipsis />
                )} */}
                <Pagination.Next disabled = {offset + limit < count ? false : true} onClick={handleNext}/>
                <Pagination.Last disabled = {offset + limit >= count ? true : false} onClick={handleLast} />
            </Pagination>
        </div>
    );
}

export default Paginate;
