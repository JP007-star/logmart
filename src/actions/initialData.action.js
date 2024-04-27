import { productApi, userApi } from "../config";

export async function getServerSideProps() {
    // Fetch initial products data
    try {
      const response = await fetch(productApi);
      const products = await response.json();
  
      const res = await fetch(userApi);
      const users = await res.json();
  
      const initialdata ={
        'products' : products,
        'users' : users.users
       }
      return {
       
          initialData: initialdata || [],
        
      };
    } catch (error) {
      console.error('Error fetching initial products:', error.message);
      return {
        props: {
          initialData: [],
        },
      };
    }
  }
  
  