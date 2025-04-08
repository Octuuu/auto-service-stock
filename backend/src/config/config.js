module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'secreto_super_seguro',
    jwtExpire: '1h',
};
  