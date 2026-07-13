import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* ================= CORE ================= */
import AppShell from "./core/AppShell";
import GlobalDataProvider from "./core/GlobalDataProvider";

/* ================= REDUX ================= */
import { Provider } from "react-redux";
import store from "./redux/store";

/* ================= PAGES ================= */
import Home from "./pages/Home";
import Login from "./components/auth/LoginPage";
import Register from "./components/auth/Register";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";
import NotificationCenter from "./pages/NotificationCenter";
import Invoice from "./pages/Invoice";

/* ================= PRODUCT SYSTEM ================= */
import ProductGrid from "./product/ProductGrid";
import ProductCard from "./product/ProductCard";
import ProductCarousel from "./product/ProductCarousel";
import SmartProductFeed from "./product/SmartProductFeed";
import CategorySidebar from "./product/CategorySidebar";
import CategoryRow from "./product/CategoryRow";
import ProductDetails from "./product/ProductsDetails";
import ProductFilter from "./product/ProductsFilter";
import ProductUpload from "./seller/ProductsUpload";
import ProductPage from "./Products/ProductPage";

/* ================= CART ================= */
import CartDrawer from "./cart/CartDrawer";
import CartSummary from "./cart/CartSummary";
import Cart from "./components/Cart";
import CartPage from "./pages/CartPage";

/* ================= ORDER ================= */
import OrderTracking from "./orders/OrderTracking";
import OrderList from "./orders/OrderList";
import LiveOrderTracker from "./admin/LiveOrderTracker";

/* ================= PAYMENT ================= */
import CheckoutButton from "./payment/CheckoutButton";
import PaymentStatus from "./payment/PaymentStatus";
import PaymentSuccess from "./payment/PaymentSuccess";
import PaymentFailed from "./payment/PaymentFailed";

/* ================= ADMIN ================= */
import AdminPanel from "./pages/AdminPanel";
import AdminDashboard from "./admin/AdminDashboard";
import ProductModeration from "./admin/ProductModeration";
import UserManagement from "./admin/UserManagement";

/* ================= SELLER ================= */
import SellerDashboard from "./seller/SellerDashboard";
import SellerAnalytics from "./seller/SellerAnalytics";
import SellerProductList from "./seller/SellerProductList";
import SellerStats from "./seller/SellerStats";

/* ================= SOCIAL ================= */
import Wishlist from "./social/Wishlist";
import Review from "./social/Review";
import Rating from "./social/Rating";

/* ================= AUTH ================= */
import AuthLogin from "./components/auth/AuthLogin";
import RegisterPage from "./components/auth/Register";

/* ================= SEARCH ================= */
import SearchBar from "./search/SearchBar";
import VoiceSearch from "./search/VoiceSearch";
import AdvancedSearch from "./search/AdvancedSearch";
import NavBar from "./search/NavBar";
import LocationBar from "./search/LocationBar";
import SmartFilter from "./search/smartfilter";
import RedisSearchSuggestionCache from "./search/RedisSearchSuggestionsCache";

/* ================= UI ================= */
import PromoBanner from "./ui/PromoBanner";
import DealOfDay from "./ui/DealOfDay";
import Footer from "./ui/Footer";
import Header from "./ui/Header";
import Loader from "./ui/Loader";
import Error from "./ui/Error";
import Pagination from "./ui/Pagination";

/* ================= AI ENGINE ================= */
import AiChat from "./ai/AiChat";
import SupportChat from "./support/SupportChat";
import RecommendationEngine from "./ai/RecommendationEngine";
import AIProductFeedEngine from "./ai/AI_PRODUCT_FEED_ENGINE";

/* ================= FAANG SYSTEMS ================= */
import AIRecommendationRanker from "./ai/AIRecommendationRanker";
import FraudDetectionSystem from "./security/FraudDetectionSystem";
import RealTimeAnalyticsDashboard from "./analytics/RealTimeAnalyticsDashboard";

/* ================= API LAYER (ENTERPRISE) ================= */
import FrontendAPILayer from "./api/FRONTED_API_LAYER";
import PromiseAPILayer from "./api/PROMISE_API_LAYER";
import SharedAPILayer from "./api/SHARED_API_LAYER";
import UniversalAPIClient from "./api/UNIVERSAL_API_CLIENT";


/* ================= HOME COMPOSITE ================= */
const HomePage = () => {
  return (
    <>
      {/* MARKETING */}
      <PromoBanner />
      <DealOfDay />

      {/* SEARCH + CACHE LAYER */}
      <NavBar />
      <SearchBar />
      <VoiceSearch />
      <LocationBar />
      <AdvancedSearch />
      <SmartFilter />
      <RedisSearchSuggestionCache />

      {/* PRODUCT SYSTEM */}
      <CategorySidebar />
      <CategoryRow />

      <SmartProductFeed />
      <ProductGrid />
      <ProductCarousel />

      {/* PRODUCT AI FEED ENGINE */}
      <AIProductFeedEngine />

      {/* AI RECOMMENDATION SYSTEM */}
      <AIRecommendationRanker />
      <RecommendationEngine />

      {/* SECURITY */}
      <FraudDetectionSystem />

      {/* ENGAGEMENT */}
      <AiChat />
      <SupportChat />

      {/* CART */}
      <CartDrawer />
    </>
  );
};


/* ================= MAIN APP ================= */
const App = () => {
  return (
    <Provider store={store}>
      <GlobalDataProvider>

        <UniversalAPIClient>
          <SharedAPILayer>
            <PromiseAPILayer>
              <FrontendAPILayer>

                <Router>

                  <AppShell>

                    {/* GLOBAL UI */}
                    <Header />
                    <Footer />

                    <Routes>

                      {/* ================= HOME ================= */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/home" element={<Home />} />

                      {/* ================= PRODUCT ================= */}
                      <Route path="/products" element={<ProductGrid />} />
                      <Route path="/product/:id" element={<ProductCard />} />
                      <Route path="/product/details/:id" element={<ProductDetails />} />
                      <Route path="/carousel" element={<ProductCarousel />} />
                      <Route path="/feed" element={<SmartProductFeed />} />
                      <Route path="/filter" element={<ProductFilter />} />
                      <Route path="/upload-product" element={<ProductUpload />} />
                      <Route path="/Products" element={<ProductPage />} />

                      {/* ================= CART ================= */}
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/cart-page" element={<CartPage />} />
                      <Route path="/cart-summary" element={<CartSummary />} />

                      {/* ================= AUTH ================= */}
                      <Route path="/login" element={<AuthLogin />} />
                      <Route path="/register" element={<Register />} />

                      {/* ================= ORDER ================= */}
                      <Route path="/orders" element={<OrderList />} />
                      <Route path="/order/:id" element={<OrderTracking />} />
                      <Route path="/history" element={<OrderHistory />} />
                      <Route path="/live-orders" element={<LiveOrderTracker />} />

                      {/* ================= PROFILE ================= */}
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/notifications" element={<NotificationCenter />} />
                      <Route path="/invoice/:id" element={<Invoice />} />

                      {/* ================= PAYMENT ================= */}
                      <Route path="/checkout" element={<CheckoutButton />} />
                      <Route path="/payment" element={<PaymentStatus />} />
                      <Route path="/payment/success" element={<PaymentSuccess />} />
                      <Route path="/payment/failed" element={<PaymentFailed />} />

                      {/* ================= ADMIN ================= */}
                      <Route path="/admin" element={<AdminPanel />} />
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                      <Route path="/admin/products" element={<ProductModeration />} />
                      <Route path="/admin/users" element={<UserManagement />} />

                      {/* ================= SELLER ================= */}
                      <Route path="/seller" element={<SellerDashboard />} />
                      <Route path="/seller/analytics" element={<SellerAnalytics />} />
                      <Route path="/seller/products" element={<SellerProductList />} />
                      <Route path="/seller/upload" element={<ProductUpload />} />
                      <Route path="/seller/stats" element={<SellerStats />} />

                      {/* ================= SOCIAL ================= */}
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/review" element={<Review />} />
                      <Route path="/rating" element={<Rating />} />

                      {/* ================= SEARCH ================= */}
                      <Route path="/search" element={<SearchBar />} />
                      <Route path="/voice-search" element={<VoiceSearch />} />
                      <Route path="/advanced-search" element={<AdvancedSearch />} />

                      {/* ================= ANALYTICS ================= */}
                      <Route path="/analytics" element={<RealTimeAnalyticsDashboard />} />

                      {/* ================= SECURITY ================= */}
                      <Route path="/fraud-detection" element={<FraudDetectionSystem />} />

                      {/* ================= UTILITY ================= */}
                      <Route path="/loader" element={<Loader />} />
                      <Route path="/error" element={<Error />} />
                      <Route path="/pagination" element={<Pagination />} />

                    </Routes>

                  </AppShell>

                </Router>

              </FrontendAPILayer>
            </PromiseAPILayer>
          </SharedAPILayer>
        </UniversalAPIClient>

      </GlobalDataProvider>
    </Provider>
  );
};

export default App; 