# BackEnd-LT-SHOP

Backend API cho ứng dụng LT-SHOP, được xây dựng bằng Node.js, Express và Sequelize.

## Tính năng

- Quản lý người dùng và xác thực
- Quản lý sản phẩm
- Quản lý đơn hàng
- Quản lý giỏ hàng
- Quản lý bình luận và đánh giá
- Thống kê doanh thu và sản phẩm

## Công nghệ sử dụng

- Node.js
- Express
- Sequelize ORM
- MySQL
- JWT Authentication

## Cài đặt

1. Clone repository:
   ```
   git clone https://github.com/thanglhgcd201414/BackEnd-LT-SHOP.git
   cd BackEnd-LT-SHOP
   ```

2. Cài đặt các dependencies:
   ```
   npm install
   ```

3. Tạo file .env từ file .env.example:
   ```
   cp .env.example .env
   ```
   Sau đó cập nhật các thông tin cấu hình trong file .env

4. Chạy migrations để tạo cơ sở dữ liệu:
   ```
   npx sequelize-cli db:migrate
   ```

5. Khởi động server:
   ```
   npm start
   ```

## API Documentation

API được triển khai trên endpoint: `http://localhost:8003`

## Đóng góp

Mọi đóng góp đều được hoan nghênh. Vui lòng tạo issue hoặc pull request để đóng góp.
