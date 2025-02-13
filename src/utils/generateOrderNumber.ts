export const generateOrderNumber = (prefix: string = 'SO') => {
     // 取得當前日期
     const date = new Date();
     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, '0');
     const day = String(date.getDate()).padStart(2, '0');
     
     // 生成 6 位數的隨機數字
     const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
     
     // 組合訂單號碼：前綴-年月日-隨機數字
     const orderNumber = `${prefix}-${year}${month}${day}-${randomNum}`;
     
     return orderNumber;
}