module.exports = [
  async (ctx) => {
    ctx.throw(404, { data: { errors } });
  },
];
