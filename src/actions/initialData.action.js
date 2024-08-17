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

      const totalRevenue = orders.orders.reduce((accumulator, order) => {
        return accumulator + order.totalAmount;
    }, 0);    
      const initialdata ={
        'products' : products.products,
        'users' : users.users,
        'orders' : orders.orders,
        'totalRevenue' :totalRevenue
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
  
  