
import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./actions";

const initialState= {
 products:[],
 status:"idle",
 error:""
}


const productSlice= createSlice({
  name:"Products",
  initialState:initialState,
  reducers: {
   filterProducts: (state,action)=>{

  const filteredData= action.payload.products.filter((eachProduct)=>
  { 
  return eachProduct.category_id===action.payload.selectedCategory.id
   })

  state.products=filteredData;
  },

  filterByPrice:(state,action) =>
  {
   let minPrice= action.payload.minPrice;
   let maxPrice = action.payload.maxPrice;
   const filteredData= action.payload.products.filter((eachProduct)=>{

       
      return eachProduct.price >= minPrice && eachProduct.price <= maxPrice;
   })

   state.products=filteredData;

  },
      sortByASC: (state, action) => {
      let sortByASCData = [...action.payload.products];
      sortByASCData.sort((a, b) => a.product_name.localeCompare(b.product_name));
      state.products = sortByASCData;
   },


      sortByDSC: (state, action) => {
      let sortByDSCData = [...action.payload.products];
      sortByDSCData.sort((a, b) => b.product_name.localeCompare(a.product_name));
      state.products = sortByDSCData;
      },

},

  extraReducers:{
   [getProducts.pending]: (state,action)=>{
      state.status="Loading...";
   },
   [getProducts.fulfilled]: (state,action)=>{
      state.status="Success";
      state.products=action.payload;
   },
   [getProducts.rejected]: (state,action)=>{
      state.status="Failed";
      state.error=action.error.message;
   }   
 }



});

export const {filterProducts,filterByPrice, sortByASC,sortByDSC}= productSlice.actions;
export default productSlice.reducer;
