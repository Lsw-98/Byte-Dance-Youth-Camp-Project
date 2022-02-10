function _id2id(object) {
  object.id = object._id;
}

function getClassSettedKey(object) {
  const result = {};
  for (key in object) {
    if (object[key]!==null) result[key] = object[key];
  }
  return result;
}

function str2bool(s) {
  if (s==='true') return true;
  else return false;
}

function str2number(s) {
  return Number(s);
}

module.exports = {
  _id2id,
  getClassSettedKey,
  str2bool,
  str2number
};