import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:3000/api'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [checkoutMessage, setCheckoutMessage] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`)
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item)
      }
      return [...prev, {...product, quantity: 1}]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    if (cart.length === 0) return
    setCheckoutMessage('Processing...')
    
    try {
      const orderRes = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: 'customer-1',
          items: cart.map(item => ({ productId: item.id, quantity: item.quantity }))
        })
      })
      
      if (!orderRes.ok) throw new Error('Order failed')
      const orderData = await orderRes.json()
      
      const paymentRes = await fetch(`${API_URL}/orders/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData.order.id,
          paymentMethod: 'upi',
          paymentDetails: { upiId: 'user@upi' }
        })
      })
      
      if (!paymentRes.ok) throw new Error('Payment failed')
      
      setCheckoutMessage('✅ Checkout successful!')
      setCart([])
      fetchProducts()
      setTimeout(() => setCheckoutMessage(''), 3000)
    } catch (err) {
      setCheckoutMessage('❌ Checkout failed')
      setTimeout(() => setCheckoutMessage(''), 3000)
    }
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="app">
      <header>
        <h1>🛒 ShopCore</h1>
        <div className="cart-summary">
          Cart: {cart.reduce((sum, i) => sum + i.quantity, 0)} items | ${totalAmount.toFixed(2)}
        </div>
      </header>

      <main className="main-content">
        <section className="products">
          <h2>Products</h2>
          <div className="product-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-details">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <span className="stock">Stock: {product.stock}</span>
                </div>
                <button 
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        <aside className="cart-sidebar">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p className="empty-cart">Cart is empty</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div>
                      <div className="item-name">{item.name}</div>
                      <div className="item-qty">Qty: {item.quantity} × ${item.price.toFixed(2)}</div>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>×</button>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                Total: <strong>${totalAmount.toFixed(2)}</strong>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
              {checkoutMessage && <p className="checkout-msg">{checkoutMessage}</p>}
            </>
          )}
        </aside>
      </main>
    </div>
  )
}

export default App
