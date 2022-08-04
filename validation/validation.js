// validation
const Joi = require("@hapi/joi");
const registerValidation = (data) => {
  console.log(data);
  const schema = {
    isActive: Joi.boolean().allow(null),
    name: Joi.string().required().min(2),
    email: Joi.string().required().min(4).email(),
    password: Joi.string().required().min(4),
    age: Joi.number().required(),
    gender: Joi.string().required(),
    role: Joi.string().allow(null),
    avatar: Joi.string().allow(null),
  };
  return Joi.validate(data, schema);
};
const loginValidation = (data) => {
  const schema = {
    email: Joi.string().required().min(4).email(),
    password: Joi.string().required().min(4),
  };
  return Joi.validate(data, schema);
};


const pageValidation = (data) => {
  const schema = {
    name: Joi.string().required(),
    slug: Joi.string().required(),
    newPageAutoAdd: Joi.boolean().required(),
    sceneData: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          userId: Joi.string().required(),
          storeId: Joi.string().required(),
          storeName: Joi.string().required(),
          image: Joi.string().required(),
          sceneName: Joi.string().required(),
          pitch: Joi.number().required(),
          yaw: Joi.number().required(),
          hfov: Joi.number().required(),
          hotSpots: Joi.array().items().allow(null),
        })
      )
      .required(),
  };
  return Joi.validate(data, schema);
};

const storeValidation = (data) => {
  const schema = {
    userId: Joi.string().required(),
    storeName: Joi.string().required(),
    storeAddress: Joi.string().allow(null, ""),
    logo: Joi.string().allow(null),
    category: Joi.array().items().allow(null),
    branches: Joi.array().items().allow(null),
  };
  return Joi.validate(data, schema);
};

const messageValidation = (data) => {
  const schema = {
    emoji: Joi.array().allow(null),
    message: Joi.string().required(),
    messageType: Joi.string().required(),
    chatRoomID: Joi.string().required(),
    createdAt: Joi.string().required(),
    sender: Joi.object({
      _id: Joi.string().required(),
      role: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().required(),
      iat: Joi.number(),
      exp: Joi.number(),
    }),
    receiver: Joi.object({
      _id: Joi.string().required(),
      role: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().required(),
      iat: Joi.number(),
      exp: Joi.number(),
    }),
    senderId: Joi.string().required(),
    receiverId: Joi.string().required(),
    replayMessage: Joi.object().allow(null),
  };
  return Joi.validate(data, schema);
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.pageValidation = pageValidation;
module.exports.storeValidation = storeValidation;
module.exports.messageValidation = messageValidation;
