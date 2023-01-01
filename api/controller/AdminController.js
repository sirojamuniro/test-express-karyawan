const Model = require("../../models");
const User = Model.users;
const Biodata = Model.biodata;
const Pelatihan = Model.riwayat_pelatihan;
const Pekerjaan = Model.riwayat_pekerjaan;
const Pendidikan = Model.riwayat_pendidikan;
const bcrypt = require('bcrypt');
const jwtConvert = require('../helpers/jwtConvert');
const { checkPagination, paginationMetaData } = require('../helpers/check-pagination');
class AdminController {
    static async register(req, res) {

        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(req.body.password, salt);
        try {
            let post = {
                name: req.body.name,
                email: req.body.email,
                userType: "admin",
                password: password,
            }

            const data = await User.create(post)

            res.status(200).json({
                message: 'Success Register'
            });

        } catch (error) {

            res.status(400).send({ status: "Error", errors: [{ message: error.message }] })
        }
    }

    static async login(req, res) {
        let data = await User.findOne({ where: { email: req.body.email, userType: "admin" } });
        try {

            if (!data) {
                throw ({
                    message: 'Admin not found'
                })

            }
            if (data) {

                let isValid = bcrypt.compareSync(req.body.password, data.password)

                if (isValid) {

                    //check valid

                    let token = jwtConvert.sign({
                        email: req.body.email,
                        userType: "admin",
                        created_at: data.created_at
                    });

                    res.status(200).send({
                        message: 'Success',
                        token: token
                    })

                } else {
                    res.status(400).send({
                        status: 'Error',
                        errors: [{
                            message: "Wrong Password or Email"
                        }]
                    })
                }
            }
        } catch (error) {
            res.status(400).send({
                status: "Error",
                errors: [{
                    message: error.message
                }]
            })
        }
    }

    static async getFormAllUser(req, res) {
        let { limit, page } = req.query
        const {
            limit: pLimit,
            offset
        } = checkPagination({ limit, page })
        const {
            count,
            rows: data
        } = await Biodata.findAndCountAll({
            distinct: true,
            include: [{
                    model: User,
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Pelatihan,
                    required: false
                },
                {
                    model: Pekerjaan,
                    required: false
                },
                {
                    model: Pendidikan,
                    required: false
                },
            ],
            limit: pLimit,
            offset,
        })


        try {
            const metaData = paginationMetaData({
                limit: pLimit,
                offset,
                page,
                count
            })
            console.log('ini metadata', metaData)
            console.log('ini data', data)

            res.status(200).send({
                message: 'Success',
                pagination: metaData,
                data: data,

            });

        } catch (error) {

            res.status(400).send({ status: "Error", errors: [{ message: error.message }] })
        }
    }

}

module.exports = AdminController