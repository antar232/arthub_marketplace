🎨 ArtHub – Online Art Marketplace

ArtHub is a digital platform designed to bridge the gap between art enthusiasts, collectors, and talented independent artists. It provides a secure, interactive, and seamless experience for discovering, publishing, and purchasing original artworks.

🌟 Live Demo & Admin Credentials

Live Web Application: ArtHub Live Link

Admin Email: admin@arthub.com

Admin Password: Admin@123

🎯 Purpose & Why Build ArtHub?

Traditional art sales are often limited to physical galleries or exhibitions, making it difficult for emerging artists to reach a global audience. ArtHub democratizes the art purchasing process by:

Giving artists a global platform to showcase and monetize their work.

Providing buyers with a curated, safe space to buy original pieces and interact with creators.

Implementing modern MERN stack practices including role-based authentication, Stripe payment integrations, dynamic subscription tiers, interactive buyer comments, and analytical dashboards.

🔑 Key Features

👤 Role-Based Access Control (RBAC)

User (Buyer): Browse artworks, purchase items using Stripe, comment on purchased pieces, track purchase history, and manage subscription tiers.

Artist: Create, edit, delete, and manage artwork listings, upload images via imgBB, and track personal sales history.

Admin: Manage users (change roles), manage or delete all listed artworks, monitor platform transactions, and analyze total system revenue with interactive charts.

💳 Stripe Payment & Subscription Tiers

Artwork Purchases: Integrated Stripe Checkout for seamless, secure transactions.

Subscription Tiers for Buyers:

Free Tier: Up to 3 artwork purchases ($0).

Pro Tier: Up to 9 artwork purchases ($9.99/month).

Premium Tier: Unlimited artwork purchases ($19.99/month).

🔍 Search, Filter, & Pagination

Publicly accessible Browse Artworks page with real-time search by title or artist.

Filter by art categories (Painting, Digital, Sculpture, etc.) and price range.

Sorting options (Newest, Price: Low to High, Price: High to Low) with dynamic pagination.

💬 Verified Buyer Comment System

Only users who have purchased a specific artwork can leave comments and feedback on its details page.

Users can edit or delete their own comments.

🌙 Extra Features & Enhancements

Dark Mode Toggle: Global theme switcher with local storage persistence using next-themes.

Wishlist System: Save favorite artworks to view or buy later.

Sold Status & Auto-Unpublish: Artworks feature a "Sold" badge and automatically prevent duplicate purchases once bought.

Image Uploads: Powered by imgBB API.

Responsive & Modern UI: Eye-pleasing design built with Tailwind CSS, supporting skeleton loaders, custom 404 pages, and error boundaries.

🛠️ Tech Stack & Packages Used

🖥️ Frontend (Client)

Framework: Next.js / React

Styling: Tailwind CSS, Framer Motion (for smooth animations), Lucide React (icons)

Authentication: BetterAuth / NextAuth / JWT

Payments: @stripe/stripe-js, @stripe/react-stripe-js

State & Data Fetching: Axios / TanStack Query (React Query)

Theme: next-themes

Toast Notifications: React Hot Toast / Sonner

⚙️ Backend (Server)

Runtime & Framework: Node.js, Express.js

Database: MongoDB with Native Driver or Mongoose

Security: JSON Web Tokens (jsonwebtoken), cors, dotenv

Payment Processing: stripe SDK
