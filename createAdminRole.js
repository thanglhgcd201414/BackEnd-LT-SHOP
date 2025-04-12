const db = require('./src/models');

const createAdminRole = async () => {
    try {
        // Kiểm tra role R1 đã tồn tại chưa
        const existingRole = await db.Allcode.findOne({
            where: {
                type: 'ROLE',
                code: 'R1'
            }
        });

        if (!existingRole) {
            // Tạo role R1 nếu chưa tồn tại
            await db.Allcode.create({
                type: 'ROLE',
                code: 'R1',
                value: 'Admin'
            });
            console.log('Created Admin Role successfully');
        }

        // Tạo tài khoản admin
        const bcrypt = require('bcryptjs');
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync('Admin@123', salt);

        const adminUser = await db.User.create({
            email: 'admin@ptitshop.com',
            password: hashPassword,
            firstName: 'Admin',
            lastName: 'PTIT',
            address: 'Ha Noi',
            roleId: 'R1',
            genderId: 'G1',
            phonenumber: '0123456789',
            dob: '1990-01-01',
            isActiveEmail: 1,
            statusId: 'S1',
            usertoken: '',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        console.log('Created Admin account successfully');
        console.log('Email: admin@ptitshop.com');
        console.log('Password: Admin@123');

    } catch (error) {
        console.error('Error creating admin:', error);
    }
};

createAdminRole();