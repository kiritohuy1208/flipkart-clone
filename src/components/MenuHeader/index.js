import React, { useEffect } from 'react'
import './style.css'
import {useSelector,useDispatch} from 'react-redux'
import { getAllCategory } from '../../actions'
import { Link } from 'react-router-dom'
/**
* @author
* @function MenuHeader
**/

const MenuHeader = (props) => {

  const dispatch = useDispatch()
  const category = useSelector(state => state.category)

  useEffect(()=>{
    dispatch(getAllCategory())
  },[])

  const renderCategories = (categoryList) => {
    let categories = [];
    for (let category of categoryList) {
      // can push jxs in array
      categories.push(
        <li key={category.name}>
          {
            category.parentId ? 
            <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>{category.name}</a> 
            : <span>{category.name}</span>
          }
         
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return categories;
  };

  return(
    <div className="menuHeader" style={{position: "fixed", top:"56px", zIndex:"1"}}>
      <ul>
        { category.categories.length > 0 ? renderCategories(category.categories): null}
      </ul>

    </div>
   )

 }

export default MenuHeader