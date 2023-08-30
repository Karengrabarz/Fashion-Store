import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api.js"

const ProductsContext = createContext({})

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState({})
    const [filteredProducts, setFilteredProducts] = useState([])
    const [productsListToCard, setProductsListToCard] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const productsList = async () => {
        try {
            const { data }  = await api.get("/products")
            setProducts(data)
        } catch (error) {
            console.log(error);            
        }
    }

    useEffect(() => {
        productsList()
    }, [])

    const handleSelectedProduct = (id) => {
        window.scrollTo(0, 0)
        const selectedItem = products.find(item => item.id === Number(id))
        const filtered = products.filter(item => item.id !== Number(id))
        
        setSelectedProduct(selectedItem)
        setFilteredProducts(filtered)
    }

    return(
        <ProductsContext.Provider
            value={{
                products,
                handleSelectedProduct,
                selectedProduct,
                filteredProducts,
                productsListToCard,
                setProductsListToCard,
                setModalVisible,
                modalVisible,
            }}
        >
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsProvider

export const useProductsContext = () => useContext(ProductsContext)