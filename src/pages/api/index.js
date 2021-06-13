import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { API_HOST } from "../../constants/serverEev";

function getProxyOptions() {
  return {
    changeOrigin: true,
    target: API_HOST,
    pathRewrite: {
      '^/api': '/',
    },
  }
}
const router = express.Router();

router.use('/', createProxyMiddleware(getProxyOptions()));

export default router;