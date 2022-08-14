import qrRequest from "../utils/qr";

// 用于获取二维码的接口
export function getQrCode() {
  return qrRequest.get("/index.php?type=getQrCode")
}

// 登录接口
export function login() {
  return qrRequest.get("")
}

// 自动登录接口
export function autoLogin() {
  return qrRequest.get("")
}