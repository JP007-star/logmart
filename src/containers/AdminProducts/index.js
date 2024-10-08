import React, { useEffect, useState } from "react";
import { ThemeProvider } from "../../components/ThemeContext";
import * as Unicons from "@iconscout/react-unicons";
import SideBar from "../../components/SideBar";
import AdminHeader from "../../components/AdminHeader";
import { getServerSideProps } from "../../actions/initialData.action";
import { SideBarMobile } from "../../components/SideBarMobile";
import './style.css'; // Import the CSS file
import ProductList from "../../components/ProductList";
import AddProduct from "../../components/AddProduct";
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import { userDNS } from "../../config";


const AdminProducts = ({ users: initialUsers }) => {
  const [isAddProductVisible, setAddProductVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const initial = await getServerSideProps();
        setProducts(initial.initialData.products || []);
      } catch (error) {
        console.error('Error fetching initial data:', error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProductClick = () => {
    setAddProductVisible(true);
  };

  const handleFormSubmit = (newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
    setAddProductVisible(false);
    toast.success("Product added successfully!");
  };

  const handleExports = async () => {
    try {
      const response = await fetch(userDNS+'api/v1/generate-pdf', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'products.pdf';
        link.click();
        URL.revokeObjectURL(url); // Clean up
      } else {
        console.error('Failed to generate PDF');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <ThemeProvider>
      <AdminHeader />
      <div className="d-flex admin-products-container">
        <div className={`sidebar-container ${isSidebarMinimized ? 'minimized' : ''}`}>
          <SideBar activeNavLink="products" onLogoClick={toggleSidebar} />
        </div>
        <div className={`main-content ${isSidebarMinimized ? 'expanded' : ''}`}>
          <div className="card shadow-sm rounded mt-3">
            <div className="card-body">
              {isAddProductVisible ? (
                <AddProduct
                  onCancel={() => setAddProductVisible(false)}
                  onSubmit={handleFormSubmit}
                />
              ) : (
                
                <div className="product-list-section">
                  <div className="d-flex justify-content-between mb-3">
                    {/* <FontAwesomeIcon onClick={handleExports} className="float-end" icon={faSignOut}  />                */}
                    <h2 onClick={handleExports} >Products</h2>
                    <button
                      id="add-product"
                      className="w-25 btn btn-primary"
                      type="button"
                      onClick={handleAddProductClick}
                    >
                      <Unicons.UilPlus /> Add Product
                    </button>
                  </div>
                  <div className="product-card-div">
                   
                    {products.length > 0 ? (
                      <ProductList products={products} />
                    ) : (
                      <p>No products available.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
           
          </div>
        </div>
      </div>
      <SideBarMobile isSidebarMinimized={isSidebarMinimized} toggleSidebar={toggleSidebar} />
      <div className="fixed-bottom text-center d-none bg-light  d-md-block">
            <p className="text-center text-muted">
              © 2024 Copyright: JP made with Love
              <img src="/images/heart.svg" height="20px" width="20px" alt="" />
            </p>
          </div>
      <ToastContainer /> {/* Include ToastContainer */}
    </ThemeProvider>
  );
};

export default AdminProducts;
