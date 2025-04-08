const formatDate = (date) => {
    return new Date(date).toLocaleString('es-PY', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
module.exports = {
    formatDate
};
  