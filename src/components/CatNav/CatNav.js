import "./_cat-nav.scss"
import {useDispatch,  useSelector} from "react-redux";
import categorySlice from "../../Redux/Category/categorySlice";
import { getCategories } from "../../Redux/Category/actions";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const CatNav= function()
{

  let  categories= useSelector(state=>state.categoryReducer.categories);
console.log(categories);

 const dispatch= useDispatch();
 
 useEffect(()=>{

    dispatch(getCategories());

 },[]);

    return(
  
        <div className="cat-nav-container container ">
  <ul>
  <button className="list-items">
   <Link to="/"><FontAwesomeIcon icon="fa fa-home" style={{paddingRight:'6px'}}/>Home</Link>
   </button>
  
</ul>
        </div>




    )


}

export default CatNav
