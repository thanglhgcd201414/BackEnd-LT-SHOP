# BackEnd-LT-SHOP (Phiên bản tối ưu)

Backend API cho ứng dụng LT-SHOP, được xây dựng bằng Node.js, Express và Sequelize. Phiên bản này đã được tối ưu hóa để tập trung vào các chức năng cơ bản.

## Tính năng

- Quản lý người dùng và xác thực
- Quản lý danh mục sản phẩm (tên, mã)
- Quản lý sản phẩm (tên, giá, mô tả, danh mục, hình ảnh)

## Cấu trúc cơ sở dữ liệu

### Bảng Category
- id: Khóa chính, tự tăng
- name: Tên danh mục
- code: Mã danh mục

### Bảng Product
- id: Khóa chính, tự tăng
- name: Tên sản phẩm
- price: Giá sản phẩm
- description: Mô tả sản phẩm
- categoryId: Khóa ngoại tham chiếu đến bảng Category
- image: Hình ảnh sản phẩm

## Lưu ý về cấu trúc dữ liệu

Trong phiên bản trước, ứng dụng sử dụng cấu trúc phức tạp hơn với các bảng:
- Product: Chứa thông tin cơ bản về sản phẩm
- ProductDetail: Chứa thông tin chi tiết về các biến thể sản phẩm
- ProductImage: Chứa hình ảnh cho các biến thể sản phẩm
- ProductDetailSize: Chứa thông tin về kích cỡ của các biến thể sản phẩm

Trong phiên bản tối ưu này, chúng tôi đã đơn giản hóa cấu trúc bằng cách:
1. Gộp thông tin từ ProductDetail vào Product
2. Loại bỏ các bảng không cần thiết
3. Đơn giản hóa các mối quan hệ giữa các bảng

Cấu trúc mới này phù hợp hơn cho các ứng dụng CRUD cơ bản và dễ dàng mở rộng trong tương lai nếu cần.

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

API được triển khai trên endpoint: `http://localhost:8004`

### API Category

1. **Tạo danh mục mới**
   - URL: `/api/create-new-category`
   - Method: POST
   - Headers: Authorization (JWT token của admin)
   - Body: `{ "name": "Tên danh mục", "code": "ma-danh-muc" }`

2. **Lấy tất cả danh mục**
   - URL: `/api/get-all-categories`
   - Method: GET

3. **Lấy chi tiết danh mục theo ID**
   - URL: `/api/get-detail-category-by-id?id=1`
   - Method: GET

4. **Cập nhật danh mục**
   - URL: `/api/update-category`
   - Method: PUT
   - Headers: Authorization (JWT token của admin)
   - Body: `{ "id": 1, "name": "Tên danh mục mới", "code": "ma-danh-muc-moi" }`

5. **Xóa danh mục**
   - URL: `/api/delete-category`
   - Method: DELETE
   - Headers: Authorization (JWT token của admin)
   - Body: `{ "id": 1 }`

### API Product

1. **Tạo sản phẩm mới**
   - URL: `/api/create-new-product`
   - Method: POST
   - Headers: Authorization (JWT token của admin)
   - Body: `{ "name": "Tên sản phẩm", "price": 100000, "description": "Mô tả sản phẩm", "categoryId": 1, "image": "base64_encoded_image" }`

2. **Lấy tất cả sản phẩm**
   - URL: `/api/get-all-products`
   - Method: GET

3. **Lấy chi tiết sản phẩm theo ID**
   - URL: `/api/get-detail-product-by-id?id=1`
   - Method: GET

4. **Lấy sản phẩm theo danh mục**
   - URL: `/api/get-products-by-category?categoryId=1`
   - Method: GET

5. **Cập nhật sản phẩm**
   - URL: `/api/update-product`
   - Method: PUT
   - Headers: Authorization (JWT token của admin)
   - Body: `{ "id": 1, "name": "Tên sản phẩm mới", "price": 150000, "description": "Mô tả mới", "categoryId": 2, "image": "base64_encoded_image" }`

6. **Xóa sản phẩm**
   - URL: `/api/delete-product`
   - Method: DELETE
   - Headers: Authorization (JWT token của admin)
   - Body: `{ "id": 1 }`

## Kiểm tra API với Postman

Dự án này bao gồm một Postman Collection để giúp bạn kiểm tra các API:

1. Sử dụng file `LT-SHOP-API-Collection.postman_collection.json` để import vào Postman
2. Đọc hướng dẫn sử dụng trong file `POSTMAN-GUIDE.md`

Collection này bao gồm các API test cho:
- Đăng nhập và xác thực
- CRUD cho danh mục sản phẩm
- CRUD cho sản phẩm

## Đóng góp

Mọi đóng góp đều được hoan nghênh. Vui lòng tạo issue hoặc pull request để đóng góp.
