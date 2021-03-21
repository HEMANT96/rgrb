"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let UserService = class UserService {
    constructor(UserModel, AdminModel) {
        this.UserModel = UserModel;
        this.AdminModel = AdminModel;
    }
    async findAll() {
        return await this.UserModel.find();
    }
    async findOne(id) {
        return await this.UserModel.findOne({ _id: id });
    }
    async register(user) {
        let isExist = await this.UserModel.findOne({
            PhoneNumber: user.PhoneNumber,
        });
        if (isExist) {
            isExist = false;
            return isExist;
        }
        else {
            const newUser = new this.UserModel(user);
            return await newUser.save();
        }
    }
    async adminAdd(admin) {
        let isExist = await this.AdminModel.findOne({
            Email: admin.Email,
        });
        if (isExist) {
            isExist = false;
            return isExist;
        }
        else {
            const newAdmin = new this.AdminModel(admin);
            return await newAdmin.save();
        }
    }
    async adminLogin(admin) {
        var query = { Password: admin.Password, Email: admin.Email };
        let isExist = await this.AdminModel.findOne(query);
        if (isExist) {
            if (admin.Password == isExist.Password && admin.Email == isExist.Email) {
                return { isExist: true, user: isExist };
            }
            else {
                return { isExist: false, msg: "Wrong UserName && Password" };
            }
        }
        else {
            return { isExist: false, msg: "Wrong User Id" };
        }
    }
    async login(user) {
        var query = { Password: user.Password, PhoneNumber: user.PhoneNumber };
        let isExist = await this.UserModel.findOne(query);
        if (isExist) {
            if (user.Password == isExist.Password && user.PhoneNumber == isExist.PhoneNumber) {
                return { isExist: true, user: isExist };
            }
            else {
                return { isExist: false, msg: "Wrong UserName && Password" };
            }
        }
        else {
            return { isExist: false, msg: "Wrong User Id" };
        }
    }
    sendSMS(randomNumber, PhoneNumber) {
        const accountSid = 'ACcf4efb1372b42f24b51fea296d534d7f';
        const authToken = '8eaf6b1225927e87a813a5d5f6cc5bcb';
        const client = require('twilio')(accountSid, authToken);
        const country_code = "+1";
        const to_send = country_code + PhoneNumber;
        client.messages
            .create({
            body: 'Your 4 digit code for regrub app is - ' + randomNumber,
            from: '+17744625692',
            to: to_send
        })
            .then(message => console.log(message.sid));
    }
    async GenerateOTP(id, data) {
        console.log(data);
        let isExist = await this.UserModel.findOne({
            PhoneNumber: data.PhoneNumber,
        });
        if (isExist) {
            let Otp = Math.floor(100000 + Math.random() * 900000);
            let result = await this.UserModel.updateOne({
                PhoneNumber: data.PhoneNumber,
            }, {
                $set: {
                    Otp: Otp,
                    PhoneNumber: data.PhoneNumber,
                },
            }, {
                new: true,
            });
            this.sendSMS(Otp, data.PhoneNumber);
            return result;
        }
        else {
            isExist = false;
            return isExist;
        }
    }
    async verifyOtp(user) {
        let query = {};
        if (isNaN(user._id)) {
            query._id = user._id;
        }
        let isExist = await this.UserModel.findOne(query);
        if (isExist) {
            if (user.Otp == isExist.Otp) {
                return { isExist: true, user: isExist };
            }
            else {
                return { isExist: false, msg: "Wrong otp" };
            }
        }
        else {
            return { isExist: false, msg: "Wrong otp " };
        }
    }
    async updateProfile(id, user) {
        let result = await this.UserModel.updateOne({
            _id: id,
        }, {
            $set: {
                Image: user.ImagePath,
                FirstName: user.FirstName,
                LastName: user.LastName,
            },
        }, {
            new: true,
        });
        return this.findOne(id);
    }
    async addAddress(id, address) {
        let result = await this.UserModel.updateOne({
            _id: id,
        }, {
            $push: {
                Addresses: {
                    Nick: address.Nick,
                    Address: address.Address,
                    IsDefault: address.IsDefault
                }
            }
        }, {
            new: true,
        });
        return this.findOne(id);
    }
    async updateAddress(id, user) {
        let isExist = await this.UserModel.findOne({
            _id: id,
        });
        if (isExist) {
            let result = await this.UserModel.updateOne({
                _id: id,
            }, {
                $set: {
                    Address: user.Address,
                },
                $push: {
                    Addresses: {
                        Nick: 'Default',
                        Address: user.Address,
                        IsDefault: true
                    }
                }
            }, {
                new: true,
            });
            return result;
        }
        else {
            return isExist;
        }
    }
    async updateNames(id, user) {
        let isExist = await this.UserModel.findOne({
            _id: id,
        });
        if (isExist) {
            let result = await this.UserModel.updateOne({
                _id: id,
            }, {
                $set: {
                    FirstName: user.FirstName,
                    LastName: user.LastName,
                    Image: user.Image
                },
            }, {
                new: true,
            });
            return result;
        }
        else {
            return isExist;
        }
    }
    async updatePass(id, user) {
        let isExist = await this.UserModel.findOne({
            _id: id,
        });
        if (isExist) {
            let result = await this.UserModel.updateOne({
                _id: id,
            }, {
                $set: {
                    Password: user.Password,
                },
            }, {
                new: true,
            });
            return result;
        }
        else {
            return isExist;
        }
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel("User")),
    __param(1, mongoose_2.InjectModel("Admin")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map