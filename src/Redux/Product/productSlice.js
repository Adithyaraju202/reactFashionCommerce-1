
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
      sortByName: (state, action) => {
      let sortByNameData = [...action.payload.products];
      sortByNameData.sort((a, b) => a.product_name.localeCompare(b.product_name));
      state.products = sortByNameData;
   },

   sortByNameAsc: (state, action) => {
      let sortByNameAscData = [...action.payload.products];
      sortByNameAscData.sort((a, b) => (a.product_name - b.product_name));
      state.products = sortByNameAscData;
    },

    sortByNameDsc: (state, action) => {
      let sortByNameDscData = [...action.payload.products];
      sortByNameDscData.sort((a, b) => (b.product_name - a.product_name));
      state.products = sortByNameDscData;
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

export const {filterProducts,filterByPrice, sortByName, sortByNameAsc, sortByNameDsc}= productSlice.actions;
export default productSlice.reducer;
