//jaja salu2
const modelData = (formData) => {
    const formDataValues = formData.map(item => {
      return {
        path: item.path,
        body: item.body,
        requestType: item.requestType
      };
    });

    let model = `const mongoose = require('mongoose')\nconst dataSchema = new mongoose.Schema({\n`;

    formDataValues.forEach(data => {
        const match = data.body.match(/"([^"]+)":/);
        const keyExtraida = match ? match[1] : null;
        console.log(keyExtraida);
        model+=`${keyExtraida}: {required: true,\ntype: value\n},\n`;
    });

    model+= `}\n})\nmodule.exports = mongoose.model('Data', dataSchema)`;
    return model;
  };
  
  export default modelData;