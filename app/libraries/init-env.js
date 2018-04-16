module.exports = (data) => {
  Object.assign(process.env, data);
  global.ENV = process.env;
};

