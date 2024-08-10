import { orderApi, productApi, userApi } from "../config";

export async function getServerSideProps() {
    try {
      const response = await fetch(productApi);
      const products = await response.json();
  
      const res = await fetch(userApi);
      const users = await res.json();

      const resp = await fetch(orderApi);
      const orders = await resp.json();
      console.log(orders);
    
      const initialdata ={
        'products' : products.products,
        'users' : users.users,
        'orders' : orders.orders
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
  
  