import baseApi from "./baseApi";

interface CategoriesResponse {
    categories: string[];
    message: string;
    success: boolean;
  }

interface create_categories{
  title:string,
  description:string
}

const categoriesApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllCategories:builder.query<CategoriesResponse,void>({
            query:()=>({
              url:"/get-all-categories",
              method:"GET"
            }),
        transformResponse:(response:CategoriesResponse)=>response,
        providesTags:['Categories']
        }),
        createCategories:builder.mutation<any,create_categories>({
          query:(data)=>({
            url:"/create-category",
            method:"POST",
            body:data

          }),
          invalidatesTags:['Categories']
        })
    })
})

export const {useGetAllCategoriesQuery,useCreateCategoriesMutation}=categoriesApi