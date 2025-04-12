const { exec } = require('child_process');

console.log('Bắt đầu chạy migrations...');

// Danh sách các migration theo thứ tự
const migrations = [
  'migration-drop-unnecessary-tables.js',
  'migration-drop-product-detail-tables.js',
  'migration-create-category.js',
  'migration-update-product-simple.js'
];

// Chạy từng migration một
async function runMigrations() {
  for (const migration of migrations) {
    console.log(`Đang chạy migration: ${migration}`);
    
    try {
      await new Promise((resolve, reject) => {
        exec(`npx sequelize-cli db:migrate --name ${migration}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Lỗi khi chạy migration ${migration}:`, error);
            reject(error);
            return;
          }
          
          console.log(stdout);
          resolve();
        });
      });
      
      console.log(`Migration ${migration} đã chạy thành công!`);
    } catch (error) {
      console.error(`Không thể chạy migration ${migration}. Tiếp tục với migration tiếp theo...`);
    }
  }
  
  console.log('Đã hoàn thành tất cả migrations!');
}

runMigrations();
