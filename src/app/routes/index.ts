import express from "express";
import { UserRoutes } from "../modules/User/user.route";
import { CategoryRoutes } from "../modules/Category/category.route";
import { ProductRoutes } from "../modules/Product/product.route";
import { BrandRoutes } from "../modules/Brand/brand.route";
import { StoreRoutes } from "../modules/Store/store.route";
import { StockRoutes } from "../modules/Stock/stock.route";
import { AuthRoutes } from "../modules/Auth/auth.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/brands",
    route: BrandRoutes,
  },
  {
    path: "/stores",
    route: StoreRoutes,
  },
  {
    path: "/stock",
    route: StockRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
