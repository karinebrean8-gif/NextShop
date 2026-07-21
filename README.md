# React + Vite+Django repository map
NextShop/
│
├── Nextshop/
│   │
│   ├── Nextshop/
│   │   ├── __pycache__/
│   │   ├── DockerFile
│   │   ├── _init_.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── cart/
│   │   ├── __pycache__/
│   │   ├── migrations/
│   │   ├── _init_.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── cartitem/
│   │   ├── __pycache__/
│   │   ├── migrations/
│   │   ├── _init_.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── category/
│   │   ├── __pycache__/
│   │   ├── migrations/
│   │   ├── _init_.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── order/
│   │   ├── __pycache__/
│   │   ├── migrations/
│   │   ├── _init_.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── orderitem/
│   │   ├── __pycache__/
│   │   ├── migrations/
│   │   ├── _init_.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── payment/
│   │   ├── __pycache__/
│   │   ├── migrations/
│   │   ├── _init_.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── constants.py
│   │   ├── models.py
│   │   ├── registry.py
│   │   ├── serializers.py
│   │   ├── strategies.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── products/
│   │   ├── __pycache__/
│   │   ├── migrations/
│   │   ├── DockerF
│   │   ├── _init_.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers api.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── seller/
│   │   ├── __pycache__/
│   │   ├── migrations/
│   │   ├── _init_.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── user/
│   │   ├── __pycache__/
│   │   ├── migrations/
│   │   ├── _init_.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   │
│   ├── db.sqlite3
│   └── manage.py
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   │
│   ├── .devcontainer/
│   │   └── .devcontainer.json
│   │
│   ├── Auth api/
│   │   ├── AI PRODUCT FEED ENGINE.js
│   │   ├── FRONTEND API LAYER.js
│   │   ├── PROMISE API LAYER.js
│   │   ├── SHARED API LAYER.js
│   │   └── UNIVERSAL API CLIENT.js
│   │
│   ├── REDUX_TOOLKIT/
│   │   ├── REDUX
│   │   ├── cartSlice.js
│   │   └── store.js
│   │
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   │
│   │   ├── Products/
│   │   │   ├── DockerFile
│   │   │   ├── ProductList.jsx
│   │   │   └── ProductPage.jsx
│   │   │
│   │   ├── User/
│   │   │   ├── profile/
│   │   │   │   ├── ProfileAvatar.jsx
│   │   │   │   ├── ProfileEditForm.jsx
│   │   │   │   └── ProfileInfo.jsx
│   │   │   │
│   │   │   ├── AuthLogin.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── NotificationCenter.jsx
│   │   │   ├── OrderHistory.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── cart/
│   │   │   ├── Cart.jsx
│   │   │   ├── CartDrawer.jsx
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   └── cartSlice.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── AboutUs.jsx
│   │   │   ├── AiChat.jsx
│   │   │   ├── AppShell.jsx
│   │   │   ├── DealOfDay.jsx
│   │   │   ├── Error.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Invoice.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── PromoBanner.jsx
│   │   │   ├── RecommendationEngine.jsx
│   │   │   ├── SmartFilter.jsx
│   │   │   └── SupportChat.jsx
│   │   │
│   │   ├── search tech/
│   │   │   ├── AdvancedSearch.jsx
│   │   │   ├── LocationBar.jsx
│   │   │   ├── NavBar.jsx
│   │   │   ├── Redis Search Suggestion Cache.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── Voice Search.jsx
│   │   │
│   │   ├── CategoryRow.jsx
│   │   ├── CategorySidebar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductCarousel.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── ProductFilter.jsx
│   │   ├── ProductGrid.jsx
│   │   └── SmartProductFeed.jsx
│   │
│   ├── pages/
│   │   │
│   │   ├── Payment/
│   │   │   ├── CheckoutButton.jsx
│   │   │   ├── PaymentFailed.jsx
│   │   │   ├── PaymentStatus.jsx
│   │   │   └── PaymentSuccess.jsx
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── GlobalDataProvider.jsx
│   │   │   ├── LiveOrderTracker.jsx
│   │   │   ├── ProductModeration.jsx
│   │   │   └── UserManagement.jsx
│   │   │
│   │   ├── order/
│   │   │   ├── OrderList.jsx
│   │   │   ├── OrderTracking.jsx
│   │   │   ├── Rating.jsx
│   │   │   ├── Review.jsx
│   │   │   └── Wishlist.jsx
│   │   │
│   │   └── Home.jsx
│   │
│   ├── selller/
│   │   ├── ProductUpload.jsx
│   │   ├── SellerAnalytics.jsx
│   │   ├── SellerDashboard.jsx
│   │   ├── SellerProductList.jsx
│   │   └── SellerStats.jsx
│   │
│   ├── services/
│   │   ├── api Layer.js
│   │   └── api.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js 

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
