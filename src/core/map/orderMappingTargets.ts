import type { ColumnMappingTarget } from "./mapTableColumns";

export const defaultOrderMappingTargets: ColumnMappingTarget[] = [
  { key: "order_id", label: "주문번호", aliases: ["order id", "order_id", "주문 번호"], required: true },
  { key: "customer_name", label: "고객명", aliases: ["customer", "buyer", "name", "고객"], required: true },
  { key: "product_name", label: "상품명", aliases: ["product", "item", "상품", "품목"], required: true },
  { key: "amount", label: "금액", aliases: ["amount", "price", "total", "total price", "합계"], required: true },
  { key: "status", label: "주문상태", aliases: ["status", "state", "상태"] },
  { key: "channel", label: "판매채널", aliases: ["channel", "store", "platform", "채널"], defaultValue: "온라인" },
];
