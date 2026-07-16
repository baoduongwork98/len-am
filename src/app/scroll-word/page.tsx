import type { Metadata } from "next";
import WorkshopClient from "./WorkshopClient";

export const metadata: Metadata = {
  title: "Workshop Đan Len | Len Ấm",
  description:
    "Ghé thăm Len Ấm qua một chuyến bay xuyên cửa hàng — từ mặt tiền, kệ len gradient, góc workshop cuối tuần, đến góc dụng cụ và những thành phẩm của học viên. Đăng ký lớp học đan len ngay.",
};

export default function WorkshopPage() {
  return <WorkshopClient />;
}
