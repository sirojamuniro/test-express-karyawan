const Model = require("../../models");
const User = Model.users;
const Biodata = Model.biodata;
const Pelatihan = Model.riwayat_pelatihan;
const Pekerjaan = Model.riwayat_pekerjaan;
const Pendidikan = Model.riwayat_pendidikan;
const bcrypt = require('bcrypt');
const jwtConvert = require('../helpers/jwtConvert');


class UserController {
    static async register(req, res) {

        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(req.body.password, salt);
        try {
            let post = {
                name: req.body.name,
                email: req.body.email,
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
        let data = await User.findOne({ where: { email: req.body.email, userType: "user" } });
        try {

            if (!data) {
                throw ({
                    message: 'User not found'
                })

            }
            if (data) {

                let isValid = bcrypt.compareSync(req.body.password, data.password)

                if (isValid) {

                    //check valid

                    let token = jwtConvert.sign({
                        email: req.body.email,
                        userType: "user",
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

    static async registerBiodata(req, res) {
        let riwayatPend = req.body.riwayatPendidikan
        let riwayatPek = req.body.riwayatPekerjaan
        let riwayatPelatihan = req.body.riwayatPelatihan
        const checkUser = await User.findOne({ where: { email: req.user.email } })
        try {
            let postBiodata = {
                user_id: checkUser.id,
                name: req.body.name,
                ktp: req.body.ktp,
                pob: req.body.pob,
                gender: req.body.gender,
                blood: req.body.blood,
                religion: req.body.religion,
                email: req.body.email,
                telephone: req.body.telephone,
                person: req.body.person,
                status: req.body.status,
                position: req.body.position,
                address_ktp: req.body.address_ktp,
                address: req.body.address,
                skill: req.body.skill,
                place_work: req.body.place_work,
                income: req.body.income,
            }
            const data = await Biodata.create(postBiodata)

            for (let pend of riwayatPend) {
                let postPendidikan = {
                    biodata_id: data.id,
                    level_education: pend.level_education,
                    institute: pend.institute,
                    major: pend.major,
                    year: pend.year,
                }
                const savePendidikan = await Pendidikan.create(postPendidikan)
            }
            for (let pek of riwayatPek) {
                let postPekerjaan = {
                    biodata_id: data.id,
                    company: pek.company,
                    position: pek.position,
                    income: pek.income,
                    year: pek.year,
                }
                const savePekerjaan = await Pekerjaan.create(postPekerjaan)
            }
            for (let pel of riwayatPelatihan) {
                let postPelatihan = {
                    biodata_id: data.id,
                    course: pel.course,
                    certificate: pel.certificate,
                    year: pel.year,
                }
                const savePelatihan = await Pelatihan.create(postPelatihan)
            }

            res.status(200).json({
                message: 'Success',
                data: data
            });

        } catch (error) {

            res.status(400).send({ status: "Error", errors: [{ message: error.message }] })
        }
    }

    static async getMyBiodata(req, res) {

        let checkUser = await User.findOne({

            include: [{
                model: Biodata,
                as: 'biodata',
                required: false,
                include: [{
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

                    }
                ],
            }],
            where: { email: req.user.email },
            attributes: ['id', 'name', 'email']
        })
        try {
            if (!checkUser) {
                throw ({
                    message: 'User not found'
                })
            }


            res.status(200).json({
                message: 'Success',
                data: checkUser
            });

        } catch (error) {

            res.status(400).send({ status: "Error", errors: [{ message: error.message }] })
        }
    }

}

module.exports = UserController