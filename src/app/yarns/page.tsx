import type { Metadata } from "next";
import YarnsClient from "./YarnsClient";

export const metadata: Metadata = {
  title: "Sợi len tuyển chọn | Len Ấm",
  description:
    "Các dòng len tự nhiên từ sợi lông cừu Merino, tơ Alpaca cao cấp kết hợp lụa tơ tằm. Dành cho những dự án đan tay chứa đựng tình yêu.",
};

export default function YarnsPage() {
  return <YarnsClient />;
}
